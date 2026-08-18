import { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import { AD_UNIT_IDS } from '@/constants/ads';
import { Colors } from '@/constants/theme';

// react-native-google-mobile-ads adalah modul native yang tidak tersedia di
// Expo Go — require di dalam try/catch agar preview Expo Go tidak crash.
type BannerAdProps = {
  unitId: string;
  size: string;
  requestOptions?: { requestNonPersonalizedAdsOnly?: boolean };
};
let BannerAd: ComponentType<BannerAdProps> | null = null;
let adaptiveSize: string | undefined;
let unitId = AD_UNIT_IDS.banner;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ads = require('react-native-google-mobile-ads');
  BannerAd = ads.BannerAd;
  adaptiveSize = ads.BannerAdSize.ANCHORED_ADAPTIVE_BANNER;
  unitId = __DEV__ ? ads.TestIds.BANNER : AD_UNIT_IDS.banner;
} catch {
  // Expo Go — banner tidak dirender
}

export function AdBanner() {
  if (!BannerAd || !adaptiveSize) return null;
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={unitId}
        size={adaptiveSize}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.tabBarBorder,
  },
});
