import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { AD_UNIT_IDS } from '@/constants/ads';

const unitId = __DEV__ ? TestIds.REWARDED : AD_UNIT_IDS.rewarded;

export function useRewardedAd(onEarnedReward?: () => void) {
  const adRef = useRef<RewardedAd | null>(null);
  const callbackRef = useRef(onEarnedReward);
  callbackRef.current = onEarnedReward;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      const ad = RewardedAd.createForAdRequest(unitId, {
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
    return () => {
      cancelled = true;
    };
  }, []);

  const show = useCallback(() => {
    if (isLoaded) adRef.current?.show();
  }, [isLoaded]);

  return { isLoaded, show };
}
