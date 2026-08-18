import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { LifelineType } from '@/contexts/GameContext';

interface LifelineButtonProps {
  type: LifelineType;
  available: boolean;
  onPress: () => void;
}

const LIFELINE_CONFIG = {
  fifty_fifty: { icon: '50' as any, label: '50:50', iconName: 'exposure' as any },
  phone_friend: { icon: 'phone' as any, label: 'Telepon', iconName: 'phone' as any },
  ask_audience: { icon: 'people' as any, label: 'Penonton', iconName: 'people' as any },
};

export function LifelineButton({ type, available, onPress }: LifelineButtonProps) {
  const config = LIFELINE_CONFIG[type];

  return (
    <Pressable
      onPress={onPress}
      disabled={!available}
      style={({ pressed }) => [
        styles.button,
        !available && styles.used,
        pressed && available && styles.pressed,
      ]}
    >
      <View style={[styles.iconCircle, !available && styles.iconUsed]}>
        <MaterialIcons
          name={config.iconName}
          size={22}
          color={available ? Colors.gold : Colors.textMuted}
        />
      </View>
      <Text style={[styles.label, !available && styles.labelUsed]}>{config.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  used: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.7,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lifeline,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  iconUsed: {
    borderColor: Colors.textMuted,
    backgroundColor: Colors.backgroundDeep,
    shadowOpacity: 0,
  },
  label: {
    fontSize: 11,
    color: Colors.textGold,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  labelUsed: {
    color: Colors.textMuted,
  },
});
