import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, Animated, ScrollView,
  Modal, StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors, PrizeValues } from '@/constants/theme';
import { useGame } from '@/hooks/useGame';
import { AnswerButton } from '@/components/ui/AnswerButton';
import { LifelineButton } from '@/components/ui/LifelineButton';
import { PrizeLadder } from '@/components/feature/PrizeLadder';
import { AudienceChart } from '@/components/feature/AudienceChart';
import { useAlert } from '@/template';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const {
    status, currentLevel, questions, lifelines, eliminatedOptions,
    audienceVotes, selectedAnswer, answerStates,
    startGame, selectAnswer, confirmAnswer, useLifeline, walkAway, resetGame,
    addAdsWatched, coins,
  } = useGame();

  const [showLadder, setShowLadder] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const questionAnim = useRef(new Animated.Value(0)).current;
  const lightAnim = useRef(new Animated.Value(0)).current;
  const resultScaleAnim = useRef(new Animated.Value(0)).current;

  const currentQuestion = questions[currentLevel - 1];
  const currentPrize = currentLevel > 0 ? PrizeValues[currentLevel - 1] : null;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lightAnim, { toValue: 1, duration: 2500, useNativeDriver: false }),
        Animated.timing(lightAnim, { toValue: 0, duration: 2500, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (status === 'playing' || status === 'answering') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(questionAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]).start();
    }
    if (status === 'wrong' || status === 'won' || status === 'quit') {
      Animated.spring(resultScaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
    } else {
      resultScaleAnim.setValue(0);
    }
    if (status === 'correct') {
      fadeAnim.setValue(0);
      questionAnim.setValue(0);
    }
  }, [status, currentLevel]);

  const handleLifeline = (type: 'fifty_fifty' | 'phone_friend' | 'ask_audience') => {
    if (!lifelines[type]) return;
    if (type === 'phone_friend') {
      const q = questions[currentLevel - 1];
      const friendAnswer = q?.options[q?.correctIndex] || '';
      showAlert('Telepon Teman 📞', `Temanmu bilang: "Menurut saya jawabannya adalah... ${friendAnswer}!"`);
    }
    useLifeline(type);
    addAdsWatched(0); // could reward here
  };

  const handleWalkAway = () => {
    showAlert(
      'Ambil Uang? 💰',
      `Anda akan membawa pulang ${currentLevel > 1 ? PrizeValues[currentLevel - 2].label : '0'} koin. Lanjutkan atau berhenti?`,
      [
        { text: 'Lanjutkan', style: 'cancel' },
        { text: 'Ambil Uang', style: 'destructive', onPress: walkAway },
      ]
    );
  };

  const handleRewardAd = () => {
    addAdsWatched(1);
    showAlert('Iklan Selesai! 🎉', 'Kamu mendapatkan 1 poin iklan. Terus tonton untuk membuka penarikan!');
  };

  // Idle / Start screen
  if (status === 'idle') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" />
        <Image source={require('@/assets/images/hero_bg.jpg')} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={['rgba(2,7,16,0.7)', Colors.backgroundDeep]} style={StyleSheet.absoluteFill} />
        <View style={styles.idleContent}>
          <Text style={styles.idleTitle}>BOSSGAME</Text>
          <Text style={styles.idleSubtitle}>Siapa Ingin Jadi Jutawan?</Text>
          <View style={styles.idleDivider} />
          <Text style={styles.idleDesc}>15 pertanyaan · 3 bantuan · Koin emas menanti</Text>
          <Pressable style={styles.startButton} onPress={startGame}>
            <LinearGradient colors={[Colors.goldLight, Colors.gold, Colors.goldDark]} style={styles.startGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <MaterialIcons name="play-circle-filled" size={30} color={Colors.backgroundDeep} />
              <Text style={styles.startText}>MULAI GAME</Text>
            </LinearGradient>
          </Pressable>
          <Pressable style={styles.adRewardButton} onPress={handleRewardAd}>
            <MaterialIcons name="ondemand-video" size={26} color={Colors.gold} />
          </Pressable>
        </View>
      </View>
    );
  }

  // Result screens
  if (status === 'wrong' || status === 'won' || status === 'quit') {
    const isWon = status === 'won';
    const isQuit = status === 'quit';
    const finalPrize = isWon ? PrizeValues[14] : (currentLevel > 1 ? PrizeValues[currentLevel - 2] : null);

    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" />
        <Image source={require('@/assets/images/hero_bg.jpg')} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={isWon ? ['rgba(200,160,0,0.3)', Colors.backgroundDeep] : ['rgba(60,10,10,0.5)', Colors.backgroundDeep]} style={StyleSheet.absoluteFill} />
        <Animated.View style={[styles.resultContainer, { transform: [{ scale: resultScaleAnim }] }]}>
          <LinearGradient colors={isWon ? [Colors.surfaceLight, Colors.surface] : [Colors.surface, Colors.backgroundDeep]} style={styles.resultCard}>
            <Text style={styles.resultEmoji}>{isWon ? '🏆' : isQuit ? '💰' : '😔'}</Text>
            <Text style={[styles.resultTitle, isWon && styles.resultTitleGold]}>
              {isWon ? 'SELAMAT!' : isQuit ? 'Ambil Uang' : 'Salah!'}
            </Text>
            <Text style={styles.resultSubtitle}>
              {isWon ? 'Kamu Menang Jackpot!' : isQuit ? 'Keputusan Bijak!' : `Kamu terjatuh di Level ${currentLevel}`}
            </Text>
            {finalPrize ? (
              <View style={styles.resultPrize}>
                <Image source={require('@/assets/images/gold_coin.png')} style={{ width: 48, height: 48 }} contentFit="contain" />
                <Text style={styles.resultCoins}>{finalPrize.label}</Text>
                <Text style={styles.resultCoinsLabel}>Koin Ditambahkan</Text>
              </View>
            ) : (
              <Text style={styles.resultNoWin}>Tidak ada koin kali ini</Text>
            )}
            <Text style={styles.resultTotal}>Total Koin: {coins.toLocaleString('id-ID')}</Text>
            <Pressable style={styles.playAgainButton} onPress={resetGame}>
              <LinearGradient colors={[Colors.gold, Colors.goldDark]} style={styles.playAgainGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.playAgainText}>MAIN LAGI</Text>
              </LinearGradient>
            </Pressable>
            <Pressable style={styles.watchAdButton} onPress={handleRewardAd}>
              <MaterialIcons name="ondemand-video" size={24} color={Colors.gold} />
            </Pressable>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }

  // Main game
  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" />

      {/* Animated bg glow */}
      <Animated.View style={[styles.bgGlow, {
        opacity: lightAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] }),
        transform: [{ scale: lightAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }],
      }]} />

      <View style={[styles.gameLayout]}>
        {/* Main game area */}
        <View style={[styles.mainArea, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 }]}>

          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleWalkAway} style={styles.walkAwayBtn}>
              <MaterialIcons name="exit-to-app" size={20} color={Colors.textSecondary} />
              <Text style={styles.walkAwayText}>Berhenti</Text>
            </Pressable>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {currentLevel}/15</Text>
            </View>
            <Pressable onPress={() => setShowLadder(true)} style={styles.ladderBtn}>
              <MaterialIcons name="format-list-numbered" size={20} color={Colors.gold} />
            </Pressable>
          </View>

          {/* Current Prize */}
          <View style={styles.currentPrize}>
            <Text style={styles.currentPrizeLabel}>Pertanyaan untuk</Text>
            <Text style={styles.currentPrizeValue}>🪙 {currentPrize?.label || '0'} Koin</Text>
          </View>

          {/* Lifelines */}
          <View style={styles.lifelines}>
            <LifelineButton type="fifty_fifty" available={lifelines.fifty_fifty} onPress={() => handleLifeline('fifty_fifty')} />
            <LifelineButton type="phone_friend" available={lifelines.phone_friend} onPress={() => handleLifeline('phone_friend')} />
            <LifelineButton type="ask_audience" available={lifelines.ask_audience} onPress={() => handleLifeline('ask_audience')} />
            <Pressable style={styles.adLifeline} onPress={handleRewardAd}>
              <View style={styles.adLifelineCircle}>
                <MaterialIcons name="ondemand-video" size={20} color={Colors.gold} />
              </View>
    
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* Question */}
            {currentQuestion ? (
              <Animated.View style={[styles.questionCard, {
                opacity: fadeAnim,
                transform: [{ translateY: questionAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
              }]}>
                <LinearGradient colors={[Colors.surfaceLight, Colors.surface]} style={styles.questionGradient}>
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionCategory}>{currentQuestion.category.toUpperCase()}</Text>
                    <View style={styles.questionDot} />
                  </View>
                  <Text style={styles.questionText}>{currentQuestion.question}</Text>
                </LinearGradient>
              </Animated.View>
            ) : null}

            {/* Audience votes */}
            {audienceVotes.length > 0 && <AudienceChart votes={audienceVotes} />}

            {/* Answer Options */}
            <View style={styles.answersContainer}>
              {currentQuestion?.options.map((option, index) => (
                <AnswerButton
                  key={index}
                  label={['A', 'B', 'C', 'D'][index]}
                  text={option}
                  state={answerStates[index]}
                  onPress={() => selectAnswer(index)}
                  disabled={status === 'answering' || status === 'correct'}
                />
              ))}
            </View>

            {/* Confirm Button */}
            {status === 'answering' && selectedAnswer !== null && (
              <Pressable style={styles.confirmButton} onPress={confirmAnswer}>
                <LinearGradient colors={[Colors.goldLight, Colors.gold, Colors.goldDark]} style={styles.confirmGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.confirmText}>KUNCI JAWABAN</Text>
                  <MaterialIcons name="lock" size={20} color={Colors.backgroundDeep} />
                </LinearGradient>
              </Pressable>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Prize Ladder Modal */}
      <Modal visible={showLadder} transparent animationType="slide" onRequestClose={() => setShowLadder(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>💰 Tangga Hadiah</Text>
              <Pressable onPress={() => setShowLadder(false)}>
                <MaterialIcons name="close" size={24} color={Colors.textPrimary} />
              </Pressable>
            </View>
            <PrizeLadder currentLevel={currentLevel} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDeep },
  bgGlow: {
    position: 'absolute', width: 300, height: 300,
    borderRadius: 150, backgroundColor: Colors.goldGlow,
    top: '20%', alignSelf: 'center',
  },
  gameLayout: { flex: 1 },
  mainArea: { flex: 1, paddingHorizontal: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  walkAwayBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingRight: 8 },
  walkAwayText: { fontSize: 12, color: Colors.textSecondary },
  levelBadge: {
    backgroundColor: Colors.surface, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6,
    borderWidth: 1, borderColor: Colors.goldDark,
  },
  levelText: { fontSize: 13, color: Colors.gold, fontWeight: '700' },
  ladderBtn: { paddingVertical: 8, paddingLeft: 8 },
  currentPrize: {
    alignItems: 'center', marginBottom: 10,
    paddingVertical: 8,
    borderTopWidth: 1, borderBottomWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  currentPrizeLabel: { fontSize: 11, color: Colors.textMuted, letterSpacing: 1 },
  currentPrizeValue: { fontSize: 20, fontWeight: '900', color: Colors.gold, letterSpacing: 1 },
  lifelines: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginBottom: 10 },
  adLifeline: { alignItems: 'center', paddingVertical: 8, paddingHorizontal: 10 },
  adLifelineCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.lifeline, borderWidth: 2, borderColor: Colors.surfaceLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },

  questionCard: { borderRadius: 18, overflow: 'hidden', marginBottom: 16, borderWidth: 1.5, borderColor: Colors.goldDark },
  questionGradient: { padding: 18 },
  questionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  questionCategory: { fontSize: 10, color: Colors.gold, fontWeight: '700', letterSpacing: 2 },
  questionDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.gold, marginLeft: 8 },
  questionText: { fontSize: 17, color: Colors.textPrimary, fontWeight: '600', lineHeight: 26, textAlign: 'center' },
  answersContainer: { gap: 8, marginBottom: 12 },
  confirmButton: { borderRadius: 50, overflow: 'hidden', marginBottom: 12, elevation: 8, shadowColor: Colors.gold, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 8 },
  confirmGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
  confirmText: { fontSize: 16, fontWeight: '900', color: Colors.backgroundDeep, letterSpacing: 2 },
  // Idle
  idleContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  idleTitle: { fontSize: 56, fontWeight: '900', color: Colors.gold, letterSpacing: 8, textShadowColor: Colors.goldGlow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 },
  idleSubtitle: { fontSize: 16, color: Colors.textSecondary, letterSpacing: 2, marginTop: 4 },
  idleDivider: { width: 60, height: 2, backgroundColor: Colors.gold, marginVertical: 20 },
  idleDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  startButton: { width: '100%', borderRadius: 50, overflow: 'hidden', marginBottom: 16, elevation: 10, shadowColor: Colors.gold, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.7, shadowRadius: 16 },
  startGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  startText: { fontSize: 20, fontWeight: '900', color: Colors.backgroundDeep, letterSpacing: 3 },
  adRewardButton: { alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30, borderWidth: 1.5, borderColor: Colors.goldDark, backgroundColor: Colors.surface },
  // Result
  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  resultCard: { width: '100%', borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: Colors.goldDark },
  resultEmoji: { fontSize: 64, marginBottom: 12 },
  resultTitle: { fontSize: 36, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 4 },
  resultTitleGold: { color: Colors.gold },
  resultSubtitle: { fontSize: 16, color: Colors.textSecondary, marginTop: 6, marginBottom: 20 },
  resultPrize: { alignItems: 'center', marginBottom: 16 },
  resultCoins: { fontSize: 32, fontWeight: '900', color: Colors.gold, marginTop: 8 },
  resultCoinsLabel: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  resultNoWin: { fontSize: 16, color: Colors.textMuted, marginBottom: 16 },
  resultTotal: { fontSize: 14, color: Colors.textSecondary, marginBottom: 24 },
  playAgainButton: { width: '100%', borderRadius: 50, overflow: 'hidden', marginBottom: 12 },
  playAgainGradient: { paddingVertical: 16, alignItems: 'center' },
  playAgainText: { fontSize: 18, fontWeight: '900', color: Colors.backgroundDeep, letterSpacing: 2 },
  watchAdButton: { alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 26, borderWidth: 1, borderColor: Colors.goldDark },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: Colors.overlay, justifyContent: 'flex-end' },
  modalContainer: { backgroundColor: Colors.backgroundDeep, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%', borderWidth: 1, borderColor: Colors.surfaceLight },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.surfaceLight },
  modalTitle: { fontSize: 18, fontWeight: '700', color: Colors.gold },
});
