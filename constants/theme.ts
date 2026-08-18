// BOSSGAME Theme - Who Wants To Be A Millionaire Style

export const Colors = {
  // Core palette
  background: '#050A1A',
  backgroundDeep: '#020710',
  surface: '#0D1B3E',
  surfaceLight: '#122356',
  
  // Gold accents
  gold: '#FFD700',
  goldLight: '#FFE55C',
  goldDark: '#C8A000',
  goldGlow: 'rgba(255,215,0,0.25)',
  
  // Answer button states
  answerDefault: '#0A1E4A',
  answerBorder: '#1E3A8A',
  answerHover: '#1A3A7A',
  answerCorrect: '#1A6A1A',
  answerCorrectBorder: '#22C55E',
  answerWrong: '#6A1A1A',
  answerWrongBorder: '#EF4444',
  answerHighlight: '#2A4A8A',
  answerHighlightBorder: '#FFD700',
  answerEliminated: '#080F20',
  answerEliminatedBorder: '#1A2A4A',
  answerEliminatedText: '#2A3A5A',
  
  // Prize ladder
  ladderSafetyNet: '#C8A000',
  ladderMillion: '#FFD700',
  ladderCurrent: '#FFD700',
  ladderPast: '#22C55E',
  ladderFuture: '#1E3A8A',
  
  // Lifeline
  lifeline: '#0D2060',
  lifelineActive: '#1A3A9A',
  lifelineUsed: '#0A1030',
  lifelineText: '#FFD700',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A0AEC0',
  textGold: '#FFD700',
  textMuted: '#4A6080',
  
  // UI
  danger: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Wallet
  walletGreen: '#16A34A',
  walletGold: '#D97706',
  
  // Overlays
  overlay: 'rgba(2,7,16,0.85)',
  overlayLight: 'rgba(5,10,26,0.6)',
  
  // Tab bar
  tabActive: '#FFD700',
  tabInactive: '#3A4A6A',
  tabBar: '#06102A',
  tabBarBorder: '#0D1B3E',
};

export const Fonts = {
  heading: 'System',
  body: 'System',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  full: 9999,
};

export const Shadow = {
  gold: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const PrizeValues = [
  { level: 1,  coins: 100,     label: '100',       isSafety: false },
  { level: 2,  coins: 200,     label: '200',       isSafety: false },
  { level: 3,  coins: 300,     label: '300',       isSafety: false },
  { level: 4,  coins: 500,     label: '500',       isSafety: false },
  { level: 5,  coins: 1000,    label: '1.000',     isSafety: true  },
  { level: 6,  coins: 2000,    label: '2.000',     isSafety: false },
  { level: 7,  coins: 4000,    label: '4.000',     isSafety: false },
  { level: 8,  coins: 8000,    label: '8.000',     isSafety: false },
  { level: 9,  coins: 16000,   label: '16.000',    isSafety: false },
  { level: 10, coins: 32000,   label: '32.000',    isSafety: true  },
  { level: 11, coins: 64000,   label: '64.000',    isSafety: false },
  { level: 12, coins: 125000,  label: '125.000',   isSafety: false },
  { level: 13, coins: 250000,  label: '250.000',   isSafety: false },
  { level: 14, coins: 500000,  label: '500.000',   isSafety: false },
  { level: 15, coins: 1000000, label: '1.000.000', isSafety: false },
];
