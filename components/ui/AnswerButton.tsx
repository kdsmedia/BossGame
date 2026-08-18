import React, { useEffect, useRef } from 'react';
import { Pressable, Text, StyleSheet, View, Animated } from 'react-native';
import { Colors, BorderRadius } from '@/constants/theme';
import { AnswerState } from '@/contexts/GameContext';

interface AnswerButtonProps {
  label: string;
  text: string;
  state: AnswerState;
  onPress: () => void;
  disabled?: boolean;
}

const LABELS = ['A', 'B', 'C', 'D'];

export function AnswerButton({ label, text, state, onPress, disabled }: AnswerButtonProps) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'selected') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 600, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0, duration: 600, useNativeDriver: false }),
        ])
      ).start();
    } else {
      glowAnim.stopAnimation();
      glowAnim.setValue(0);
    }

    if (state === 'correct') {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.06, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  const getBorderColor = () => {
    switch (state) {
      case 'selected': return Colors.gold;
      case 'correct': return Colors.answerCorrectBorder;
      case 'wrong': return Colors.answerWrongBorder;
      case 'eliminated': return Colors.answerEliminatedBorder;
      default: return Colors.answerBorder;
    }
  };

  const getBgColor = () => {
    switch (state) {
      case 'selected': return Colors.answerHighlight;
      case 'correct': return Colors.answerCorrect;
      case 'wrong': return Colors.answerWrong;
      case 'eliminated': return Colors.answerEliminated;
      default: return Colors.answerDefault;
    }
  };

  const getLabelBg = () => {
    switch (state) {
      case 'selected': return Colors.gold;
      case 'correct': return Colors.answerCorrectBorder;
      case 'wrong': return Colors.answerWrongBorder;
      default: return Colors.surfaceLight;
    }
  };

  const getTextColor = () => {
    if (state === 'eliminated') return Colors.answerEliminatedText;
    if (state === 'selected') return Colors.gold;
    if (state === 'correct') return '#FFFFFF';
    if (state === 'wrong') return '#FFFFFF';
    return Colors.textPrimary;
  };

  const borderColor = getBorderColor();
  const bgColor = getBgColor();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || state === 'eliminated'}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: bgColor, borderColor },
          pressed && state === 'default' && styles.pressed,
        ]}
      >
        {/* Left hexagon label */}
        <View style={[styles.labelContainer, { backgroundColor: getLabelBg() }]}>
          <Text style={[styles.labelText, state === 'selected' && { color: Colors.background }]}>{label}</Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* Answer text */}
        <View style={styles.textContainer}>
          <Text style={[styles.answerText, { color: getTextColor() }]} numberOfLines={2}>
            {text}
          </Text>
        </View>

        {/* Glow overlay for selected */}
        {state === 'selected' && (
          <Animated.View
            style={[
              styles.glowOverlay,
              {
                opacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.15],
                }),
              },
            ]}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: BorderRadius.full,
    minHeight: 54,
    overflow: 'hidden',
  },
  pressed: {
    backgroundColor: Colors.answerHover,
    opacity: 0.9,
  },
  labelContainer: {
    width: 48,
    height: '100%',
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textGold,
    letterSpacing: 0.5,
  },
  divider: {
    width: 2,
    height: '80%',
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  answerText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.gold,
  },
});
