import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RewardedAd } from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS, REWARDED_AD_COOLDOWN_MS } from '@/constants/ads';

// Modul native tidak tersedia di Expo Go — require di-guard agar tidak crash
let RewardedAdModule: typeof RewardedAd | null = null;
let AdEventType: any = {};
let RewardedAdEventType: any = {};
let unitId = AD_UNIT_IDS.rewarded;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ads = require('react-native-google-mobile-ads');
  RewardedAdModule = ads.RewardedAd;
  AdEventType = ads.AdEventType;
  RewardedAdEventType = ads.RewardedAdEventType;
  unitId = __DEV__ ? ads.TestIds.REWARDED : AD_UNIT_IDS.rewarded;
} catch {
  // Expo Go — iklan dinonaktifkan
}

const COOLDOWN_KEY = '@rewarded_ad_cooldown_until';

export function useRewardedAd(onEarnedReward?: () => void) {
  const adRef = useRef<RewardedAd | null>(null);
  const callbackRef = useRef(onEarnedReward);
  callbackRef.current = onEarnedReward;
  const cooldownUntilRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (!RewardedAdModule) return;
      const ad = RewardedAdModule.createForAdRequest(unitId, {
        requestNonPersonalizedAdsOnly: true,
      });
      adRef.current = ad;
      ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
        if (!cancelled) setIsLoaded(true);
      });
      ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        callbackRef.current?.();
      });
      // RewardedAd bersifat sekali pakai — buat dan muat instance baru setelah ditutup
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        if (cancelled) return;
        setIsLoaded(false);
        load();
      });
      ad.load();
    };

    load();

    // Pulihkan sisa cooldown dari sesi sebelumnya
    AsyncStorage.getItem(COOLDOWN_KEY).then((value) => {
      const until = value ? Number(value) : 0;
      if (!cancelled && until > Date.now()) {
        cooldownUntilRef.current = until;
        setCooldownSecondsLeft(Math.ceil((until - Date.now()) / 1000));
      }
    });

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((cooldownUntilRef.current - Date.now()) / 1000)
      );
      setCooldownSecondsLeft((prev) => (prev === remaining ? prev : remaining));
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const show = useCallback(() => {
    if (!isLoaded || cooldownSecondsLeft > 0) return;
    adRef.current?.show();
    const until = Date.now() + REWARDED_AD_COOLDOWN_MS;
    cooldownUntilRef.current = until;
    setCooldownSecondsLeft(Math.ceil(REWARDED_AD_COOLDOWN_MS / 1000));
    AsyncStorage.setItem(COOLDOWN_KEY, String(until));
  }, [isLoaded, cooldownSecondsLeft]);

  return {
    isLoaded,
    isCoolingDown: cooldownSecondsLeft > 0,
    cooldownSecondsLeft,
    show,
  };
}
