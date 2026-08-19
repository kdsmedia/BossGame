import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, Animated, ScrollView,
  StatusBar, Platform, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, PrizeValues } from '@/constants/theme';
import { Fonts } from '@/constants/fonts';
import { useGame } from '@/hooks/useGame';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { coins, adsWatched, gamesPlayed, perfectGames, addAdsWatched } = useGame();

  const glowAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(titleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(subtitleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(buttonAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(shimmerAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1500, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const handleWatchAd = () => {
    addAdsWatched(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDeep} />

      {/* Hero Background */}
      <Image
        source={require('@/assets/images/hero_bg.jpg')}
        style={styles.heroBg}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['rgba(2,7,16,0.2)', 'rgba(2,7,16,0.65)', Colors.backgroundDeep]}
        style={StyleSheet.absoluteFill}
        locations={[0, 0.5, 1]}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Coin Bar */}
        <View style={styles.coinBar}>
          <Image source={require('@/assets/images/gold_coin.png')} style={styles.coinIcon} contentFit="contain" />
          <Text style={styles.coinValue}>{coins.toLocaleString('id-ID')}</Text>
          <Text style={styles.coinLabel}>Koin</Text>
          <View style={styles.adsBadge}>
            <MaterialIcons name="ondemand-video" size={16} color={Colors.gold} />
          </View>
        </View>

        {/* Title */}
        <Animated.View style={[styles.titleContainer, { opacity: titleAnim, transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }) }] }]}>
          <Animated.View style={[styles.titleWrapper, {
            shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }),
            shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 40] }),
          }]}>
            <Text style={styles.gameTitle}>BOSS</Text>
            <Animated.Text style={[styles.gameTitleGold, { transform: [{ scale: pulseAnim }] }]}>GAME</Animated.Text>
          </Animated.View>
          <View style={styles.titleDivider} />
          <Text style={styles.tagline}>Siapa Ingin Jadi Jutawan?</Text>
        </Animated.View>

        {/* Prize Display */}
        <Animated.View style={[styles.prizePreview, { opacity: subtitleAnim }]}>
          <LinearGradient
            colors={[Colors.surface, Colors.surfaceLight, Colors.surface]}
            style={styles.prizeGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.prizeLabel}>Hadiah Utama</Text>
            <Text style={styles.prizeAmount}>🪙 1.000.000 Koin</Text>
            <Text style={styles.prizeEquiv}>≈ Rp 10.000.000</Text>
          </LinearGradient>
        </Animated.View>

        {/* Play Button */}
        <Animated.View style={[{ opacity: buttonAnim, transform: [{ scale: buttonAnim }] }]}>
          <Pressable
            style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
            onPress={() => router.push('/(tabs)/game')}
          >
            <LinearGradient
              colors={[Colors.goldLight, Colors.gold, Colors.goldDark]}
              style={styles.playGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <MaterialIcons name="play-circle-filled" size={32} color={Colors.backgroundDeep} />
              <Text style={styles.playText}>MULAI BERMAIN</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{gamesPlayed}</Text>
            <Text style={styles.statLabel}>Game Dimainkan</Text>
          </View>
          <View style={[styles.statCard, styles.statCardMiddle]}>
            <Text style={styles.statNum}>{perfectGames}</Text>
            <Text style={styles.statLabel}>Sempurna</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{adsWatched}</Text>
            <Text style={styles.statLabel}>Ads Ditonton</Text>
          </View>
        </View>

        {/* Ad Reward Banner */}
        <Pressable style={styles.adBanner} onPress={handleWatchAd}>
          <LinearGradient
            colors={['#1A2050', '#0D1B3E']}
            style={styles.adGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <MaterialIcons name="ondemand-video" size={32} color={Colors.gold} />
            <View style={styles.adTextContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(100, (adsWatched / 350) * 100)}%` }]} />
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.gold} />
          </LinearGradient>
        </Pressable>

        {/* How To Play */}
        <View style={styles.howToSection}>
          <Text style={styles.howToTitle}>Cara Bermain</Text>
          {[
            { icon: 'quiz', text: '15 pertanyaan dari mudah ke sulit' },
            { icon: 'stars', text: 'Jawab benar = koin semakin besar' },
            { icon: 'safety-divider', text: '2 jaring pengaman di level 5 & 10' },
            { icon: 'people', text: '3 bantuan: 50:50, Penonton, Telepon' },
            { icon: 'account-balance-wallet', text: 'Tukarkan koin ke DANA/OVO' },
          ].map((item, i) => (
            <View key={i} style={styles.howToItem}>
              <MaterialIcons name={item.icon as any} size={20} color={Colors.gold} />
              <Text style={styles.howToText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDeep },
  heroBg: { position: 'absolute', width: '100%', height: '60%', top: 0 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
  coinBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,27,62,0.8)',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.goldDark,
    alignSelf: 'center',
    gap: 6,
  },
  coinIcon: { width: 24, height: 24 },
  coinValue: { fontFamily: Fonts.number, fontSize: 18, fontWeight: '800', color: Colors.gold },
  coinLabel: { fontFamily: Fonts.text, fontSize: 13, color: Colors.textSecondary },
  adsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundDeep,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },

  titleContainer: { alignItems: 'center', marginBottom: 24 },
  titleWrapper: {
    alignItems: 'center',
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 20,
  },
  gameTitle: {
    fontFamily: Fonts.title,
    fontSize: 54,
    fontWeight: '900',
    color: '#FFF8DC',
    letterSpacing: 12,
    textShadowColor: Colors.gold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  gameTitleGold: {
    fontSize: 62,
    fontWeight: '900',
    color: Colors.gold,
    letterSpacing: 14,
    textShadowColor: '#FFE55C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 28,
    marginTop: -6,
  },
  titleDivider: { width: 80, height: 2, backgroundColor: Colors.gold, marginVertical: 12 },
  tagline: { fontFamily: Fonts.text, fontSize: 16, color: Colors.textSecondary, letterSpacing: 2, fontStyle: 'italic' },
  prizePreview: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.goldDark,
  },
  prizeGradient: { padding: 20, alignItems: 'center' },
  prizeLabel: { fontFamily: Fonts.text, fontSize: 13, color: Colors.textSecondary, letterSpacing: 2, marginBottom: 4 },
  prizeAmount: { fontFamily: Fonts.number, fontSize: 28, fontWeight: '900', color: Colors.gold, letterSpacing: 1 },
  prizeEquiv: { fontFamily: Fonts.number, fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  playButton: { borderRadius: 50, overflow: 'hidden', marginBottom: 24, elevation: 10, shadowColor: Colors.gold, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 16 },
  playButtonPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  playGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, gap: 12 },
  playText: { fontFamily: Fonts.button, fontSize: 22, fontWeight: '900', color: Colors.backgroundDeep, letterSpacing: 3 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: Colors.surface,
    borderRadius: 12, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  statCardMiddle: { borderColor: Colors.goldDark },
  statNum: { fontFamily: Fonts.number, fontSize: 22, fontWeight: '800', color: Colors.gold },
  statLabel: { fontFamily: Fonts.text, fontSize: 11, color: Colors.textSecondary, marginTop: 2, textAlign: 'center' },
  adBanner: { borderRadius: 14, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: Colors.goldDark },
  adGradient: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  adTextContainer: { flex: 1 },
  adTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  adSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, marginBottom: 8 },
  progressBar: { height: 4, backgroundColor: Colors.surfaceLight, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 2 },
  howToSection: { backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.surfaceLight },
  howToTitle: { fontFamily: Fonts.title, fontSize: 16, fontWeight: '700', color: Colors.gold, marginBottom: 12, letterSpacing: 1 },
  howToItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  howToText: { fontFamily: Fonts.text, fontSize: 14, color: Colors.textSecondary, flex: 1 },
});
