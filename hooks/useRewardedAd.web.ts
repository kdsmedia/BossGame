// Fallback untuk web — iklan AdMob hanya tersedia di build native
export function useRewardedAd(_onEarnedReward?: () => void) {
  return {
    isLoaded: false,
    isCoolingDown: false,
    cooldownSecondsLeft: 0,
    show: () => {},
  };
}
