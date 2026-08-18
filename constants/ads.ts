import { Platform } from 'react-native';

export const ADMOB_APP_ID = 'ca-app-pub-6881903056221433~3185092145';

// Jeda minimal antar penayangan iklan rewarded agar tombol tidak di-spam
export const REWARDED_AD_COOLDOWN_MS = 60 * 1000;

// TODO: ganti nilai ios dengan Ad Unit ID iOS jika aplikasi dirilis untuk iOS
export const AD_UNIT_IDS = {
  banner: Platform.select({
    android: 'ca-app-pub-6881903056221433/1872010478',
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    default: 'ca-app-pub-6881903056221433/1872010478',
  })!,
  rewarded: Platform.select({
    android: 'ca-app-pub-6881903056221433/5452057637',
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    default: 'ca-app-pub-6881903056221433/5452057637',
  })!,
};
