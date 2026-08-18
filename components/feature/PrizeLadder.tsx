import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, PrizeValues } from '@/constants/theme';

interface PrizeLadderProps {
  currentLevel: number;
}

export function PrizeLadder({ currentLevel }: PrizeLadderProps) {
  const reversed = [...PrizeValues].reverse();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {reversed.map((prize) => {
          const isCurrent = prize.level === currentLevel;
          const isPast = prize.level < currentLevel;
          const isMillion = prize.level === 15;

          return (
            <View
              key={prize.level}
              style={[
                styles.row,
                isCurrent && styles.rowCurrent,
                isPast && styles.rowPast,
                prize.isSafety && styles.rowSafety,
                isMillion && styles.rowMillion,
              ]}
            >
              {isCurrent ? (
                <MaterialIcons name="chevron-right" size={12} color={Colors.gold} />
              ) : (
                <View style={{ width: 12 }} />
              )}
              <Text style={[styles.levelNum, isCurrent && styles.levelNumCurrent, isPast && styles.levelNumPast]}>
                {prize.level}
              </Text>
              <Text style={[styles.coins, isCurrent && styles.coinsCurrent, isPast && styles.coinsPast, isMillion && styles.coinsMillion]}>
                🪙 {prize.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: Colors.backgroundDeep,
    borderLeftWidth: 1,
    borderLeftColor: Colors.surfaceLight,
  },
  scroll: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  rowCurrent: {
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderBottomColor: Colors.goldDark,
  },
  rowPast: {
    opacity: 0.6,
  },
  rowSafety: {
    borderTopWidth: 1.5,
    borderTopColor: Colors.goldDark,
  },
  rowMillion: {
    backgroundColor: 'rgba(255,215,0,0.08)',
  },
  levelNum: {
    fontSize: 10,
    color: Colors.textMuted,
    width: 16,
    textAlign: 'center',
    marginRight: 2,
  },
  levelNumCurrent: {
    color: Colors.gold,
    fontWeight: '700',
  },
  levelNumPast: {
    color: Colors.success,
  },
  coins: {
    fontSize: 10,
    color: Colors.textSecondary,
    flex: 1,
  },
  coinsCurrent: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 11,
  },
  coinsPast: {
    color: Colors.success,
  },
  coinsMillion: {
    color: Colors.gold,
    fontWeight: '800',
  },
});
