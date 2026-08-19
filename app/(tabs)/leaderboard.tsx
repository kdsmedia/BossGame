import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors } from '@/constants/theme';
import { Fonts } from '@/constants/fonts';
import { useGame } from '@/hooks/useGame';

const MOCK_LEADERBOARD = [
  { rank: 1,  name: 'BossQueen_Rina',   coins: 892500, games: 45, badge: '👑' },
  { rank: 2,  name: 'GeniusBro123',     coins: 756000, games: 38, badge: '🥈' },
  { rank: 3,  name: 'Mastermind_Dio',   coins: 625000, games: 31, badge: '🥉' },
  { rank: 4,  name: 'QuizKing_Ardi',    coins: 512000, games: 28, badge: '🏅' },
  { rank: 5,  name: 'SmartGurl_Nisa',   coins: 445000, games: 25, badge: '🏅' },
  { rank: 6,  name: 'BrainBlast_Heru',  coins: 389000, games: 22, badge: '🌟' },
  { rank: 7,  name: 'GoldHunter_Tono',  coins: 312000, games: 19, badge: '🌟' },
  { rank: 8,  name: 'QuizWizard_Sari',  coins: 287000, games: 17, badge: '⭐' },
  { rank: 9,  name: 'Millionaire_Budi', coins: 245000, games: 15, badge: '⭐' },
  { rank: 10, name: 'TopPlayer_Dewi',   coins: 198000, games: 13, badge: '⭐' },
];

type TabType = 'global' | 'weekly';

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const { coins, gamesPlayed } = useGame();
  const [activeTab, setActiveTab] = useState<TabType>('global');

  const myRank = MOCK_LEADERBOARD.findIndex(p => p.coins <= coins) + 1 || MOCK_LEADERBOARD.length + 1;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={[Colors.surface, Colors.backgroundDeep]} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>🏆 Papan Peringkat</Text>
        <Text style={styles.headerSub}>Bersaing dengan pemain terbaik!</Text>
      </LinearGradient>

      {/* My Rank Card */}
      <View style={styles.myRankCard}>
        <LinearGradient colors={[Colors.surfaceLight, Colors.surface]} style={styles.myRankGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View style={styles.myRankLeft}>
            <Text style={styles.myRankNum}>#{myRank > 10 ? '11+' : myRank}</Text>
            <View>
              <Text style={styles.myRankName}>Kamu</Text>
              <Text style={styles.myRankGames}>{gamesPlayed} game dimainkan</Text>
            </View>
          </View>
          <View style={styles.myRankRight}>
            <Image source={require('@/assets/images/gold_coin.png')} style={{ width: 28, height: 28 }} contentFit="contain" />
            <Text style={styles.myRankCoins}>{coins.toLocaleString('id-ID')}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['global', 'weekly'] as TabType[]).map((tab) => (
          <Pressable key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'global' ? '🌍 Global' : '📅 Mingguan'}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 100 }]}>
        {/* Top 3 podium */}
        <View style={styles.podium}>
          {[MOCK_LEADERBOARD[1], MOCK_LEADERBOARD[0], MOCK_LEADERBOARD[2]].map((player, i) => {
            const heights = [100, 130, 80];
            const podiumRank = [2, 1, 3][i];
            return (
              <View key={i} style={styles.podiumItem}>
                <Text style={styles.podiumBadge}>{player.badge}</Text>
                <Text style={styles.podiumName} numberOfLines={1}>{player.name.split('_')[0]}</Text>
                <Text style={styles.podiumCoins}>{(player.coins / 1000).toFixed(0)}K</Text>
                <LinearGradient
                  colors={podiumRank === 1 ? [Colors.gold, Colors.goldDark] : podiumRank === 2 ? ['#C0C0C0', '#A0A0A0'] : ['#CD7F32', '#A05020']}
                  style={[styles.podiumBar, { height: heights[i] }]}
                >
                  <Text style={styles.podiumRank}>#{podiumRank}</Text>
                </LinearGradient>
              </View>
            );
          })}
        </View>

        {/* Rest of leaderboard */}
        {MOCK_LEADERBOARD.slice(3).map((player) => (
          <View key={player.rank} style={styles.rankRow}>
            <Text style={styles.rankNum}>#{player.rank}</Text>
            <View style={styles.rankAvatar}>
              <Text style={{ fontSize: 20 }}>{player.badge}</Text>
            </View>
            <View style={styles.rankInfo}>
              <Text style={styles.rankName}>{player.name}</Text>
              <Text style={styles.rankGames}>{player.games} game</Text>
            </View>
            <View style={styles.rankCoinsContainer}>
              <Text style={styles.rankCoins}>{(player.coins / 1000).toFixed(0)}K</Text>
              <Text style={styles.rankCoinLabel}>koin</Text>
            </View>
          </View>
        ))}

        {/* Join CTA */}
        <View style={styles.joinCTA}>
          <Text style={styles.joinText}>Mainkan lebih banyak untuk naik peringkat! 🚀</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backgroundDeep },
  headerGradient: { paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { fontFamily: Fonts.title, fontSize: 24, fontWeight: '900', color: Colors.gold, letterSpacing: 1 },
  headerSub: { fontFamily: Fonts.text, fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  myRankCard: { marginHorizontal: 16, marginTop: 12, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: Colors.goldDark },
  myRankGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  myRankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  myRankNum: { fontFamily: Fonts.number, fontSize: 24, fontWeight: '900', color: Colors.gold, minWidth: 40 },
  myRankName: { fontFamily: Fonts.text, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  myRankGames: { fontFamily: Fonts.text, fontSize: 11, color: Colors.textSecondary },
  myRankRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  myRankCoins: { fontFamily: Fonts.number, fontSize: 18, fontWeight: '800', color: Colors.gold },
  tabRow: { flexDirection: 'row', margin: 16, backgroundColor: Colors.surface, borderRadius: 30, padding: 4, borderWidth: 1, borderColor: Colors.surfaceLight },
  tab: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 26 },
  tabActive: { backgroundColor: Colors.gold },
  tabText: { fontFamily: Fonts.button, fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.backgroundDeep, fontWeight: '800' },
  list: { paddingHorizontal: 16 },
  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 20, gap: 8, paddingHorizontal: 8 },
  podiumItem: { flex: 1, alignItems: 'center' },
  podiumBadge: { fontSize: 28, marginBottom: 4 },
  podiumName: { fontFamily: Fonts.text, fontSize: 11, color: Colors.textSecondary, fontWeight: '600', marginBottom: 2, textAlign: 'center' },
  podiumCoins: { fontFamily: Fonts.number, fontSize: 13, color: Colors.gold, fontWeight: '700', marginBottom: 4 },
  podiumBar: { width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 8 },
  podiumRank: { fontFamily: Fonts.number, fontSize: 16, fontWeight: '900', color: Colors.backgroundDeep },
  rankRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: Colors.surfaceLight, gap: 10 },
  rankNum: { fontFamily: Fonts.number, fontSize: 14, fontWeight: '700', color: Colors.textMuted, width: 28 },
  rankAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.backgroundDeep, alignItems: 'center', justifyContent: 'center' },
  rankInfo: { flex: 1 },
  rankName: { fontFamily: Fonts.text, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  rankGames: { fontFamily: Fonts.text, fontSize: 11, color: Colors.textMuted },
  rankCoinsContainer: { alignItems: 'flex-end' },
  rankCoins: { fontFamily: Fonts.number, fontSize: 16, fontWeight: '800', color: Colors.gold },
  rankCoinLabel: { fontFamily: Fonts.text, fontSize: 10, color: Colors.textMuted },
  joinCTA: { backgroundColor: Colors.surface, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: Colors.surfaceLight },
  joinText: { fontFamily: Fonts.text, fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
});
