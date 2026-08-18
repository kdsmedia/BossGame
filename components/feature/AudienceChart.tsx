import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/theme';

interface AudienceChartProps {
  votes: number[];
}

const LABELS = ['A', 'B', 'C', 'D'];

export function AudienceChart({ votes }: AudienceChartProps) {
  const anims = useRef(votes.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: votes[i],
        duration: 1000 + i * 200,
        useNativeDriver: false,
      })
    );
    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Jawaban Penonton</Text>
      <View style={styles.chart}>
        {votes.map((vote, i) => (
          <View key={i} style={styles.barGroup}>
            <Text style={styles.percent}>{vote}%</Text>
            <View style={styles.barContainer}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    height: anims[i].interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: vote > 50 ? Colors.gold : Colors.surfaceLight,
                  },
                ]}
              />
            </View>
            <Text style={styles.label}>{LABELS[i]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.goldDark,
  },
  title: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
  },
  barGroup: {
    alignItems: 'center',
    width: 48,
  },
  percent: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  barContainer: {
    width: 32,
    height: 70,
    backgroundColor: Colors.backgroundDeep,
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  label: {
    color: Colors.gold,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
});
