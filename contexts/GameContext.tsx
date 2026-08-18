import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyQuestionSet, getTodaySeed, Question } from '@/constants/questions';
import { PrizeValues } from '@/constants/theme';

export type LifelineType = 'fifty_fifty' | 'phone_friend' | 'ask_audience';
export type GameStatus = 'idle' | 'playing' | 'answering' | 'correct' | 'wrong' | 'won' | 'quit';
export type AnswerState = 'default' | 'selected' | 'correct' | 'wrong' | 'eliminated';

export interface GameState {
  status: GameStatus;
  currentLevel: number; // 1-15
  questions: Question[];
  coins: number;
  totalCoins: number;
  adsWatched: number;
  lastWithdrawalDate: string | null;
  lifelines: Record<LifelineType, boolean>; // true = available
  eliminatedOptions: number[];
  audienceVotes: number[];
  selectedAnswer: number | null;
  answerStates: AnswerState[];
  gamesPlayed: number;
  perfectGames: number;
}

export interface GameContextType extends GameState {
  startGame: () => void;
  selectAnswer: (index: number) => void;
  confirmAnswer: () => void;
  useLifeline: (type: LifelineType) => void;
  walkAway: () => void;
  resetGame: () => void;
  addAdsWatched: (count?: number) => void;
  canWithdraw: () => boolean;
  setLastWithdrawalDate: (date: string) => void;
}

const defaultState: GameState = {
  status: 'idle',
  currentLevel: 0,
  questions: [],
  coins: 0,
  totalCoins: 0,
  adsWatched: 0,
  lastWithdrawalDate: null,
  lifelines: {
    fifty_fifty: true,
    phone_friend: true,
    ask_audience: true,
  },
  eliminatedOptions: [],
  audienceVotes: [],
  selectedAnswer: null,
  answerStates: ['default', 'default', 'default', 'default'],
  gamesPlayed: 0,
  perfectGames: 0,
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = '@bossgame_state';

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          coins: parsed.coins || 0,
          totalCoins: parsed.totalCoins || 0,
          adsWatched: parsed.adsWatched || 0,
          lastWithdrawalDate: parsed.lastWithdrawalDate || null,
          gamesPlayed: parsed.gamesPlayed || 0,
          perfectGames: parsed.perfectGames || 0,
        }));
      }
    } catch (e) {}
  };

  const saveState = async (newState: Partial<GameState>) => {
    try {
      const toSave = {
        coins: newState.coins,
        totalCoins: newState.totalCoins,
        adsWatched: newState.adsWatched,
        lastWithdrawalDate: newState.lastWithdrawalDate,
        gamesPlayed: newState.gamesPlayed,
        perfectGames: newState.perfectGames,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {}
  };

  const startGame = useCallback(() => {
    const seed = getTodaySeed();
    const questions = getDailyQuestionSet(seed);
    setState(prev => ({
      ...prev,
      status: 'playing',
      currentLevel: 1,
      questions,
      lifelines: { fifty_fifty: true, phone_friend: true, ask_audience: true },
      eliminatedOptions: [],
      audienceVotes: [],
      selectedAnswer: null,
      answerStates: ['default', 'default', 'default', 'default'],
    }));
  }, []);

  const selectAnswer = useCallback((index: number) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      const newStates: AnswerState[] = ['default', 'default', 'default', 'default'];
      newStates[index] = 'selected';
      // Keep eliminated options
      prev.eliminatedOptions.forEach(i => { newStates[i] = 'eliminated'; });
      return { ...prev, selectedAnswer: index, answerStates: newStates, status: 'answering' };
    });
  }, []);

  const confirmAnswer = useCallback(() => {
    setState(prev => {
      if (prev.status !== 'answering' || prev.selectedAnswer === null) return prev;
      const currentQ = prev.questions[prev.currentLevel - 1];
      if (!currentQ) return prev;
      
      const isCorrect = prev.selectedAnswer === currentQ.correctIndex;
      const newStates: AnswerState[] = ['default', 'default', 'default', 'default'];
      prev.eliminatedOptions.forEach(i => { newStates[i] = 'eliminated'; });
      
      if (isCorrect) {
        newStates[prev.selectedAnswer] = 'correct';
        const prize = PrizeValues[prev.currentLevel - 1];
        const newCoins = prev.coins + prize.coins;
        const newTotal = prev.totalCoins + prize.coins;
        const isLastLevel = prev.currentLevel === 15;
        const newGames = isLastLevel ? prev.gamesPlayed + 1 : prev.gamesPlayed;
        const newPerfect = isLastLevel ? prev.perfectGames + 1 : prev.perfectGames;
        const newState = {
          ...prev,
          status: (isLastLevel ? 'won' : 'correct') as GameStatus,
          answerStates: newStates,
          coins: newCoins,
          totalCoins: newTotal,
          gamesPlayed: newGames,
          perfectGames: newPerfect,
        };
        saveState(newState);
        return newState;
      } else {
        newStates[prev.selectedAnswer] = 'wrong';
        newStates[currentQ.correctIndex] = 'correct';
        // Find safety net
        let safetyCoins = 0;
        for (let i = prev.currentLevel - 1; i >= 0; i--) {
          if (PrizeValues[i].isSafety) {
            safetyCoins = PrizeValues[i].coins;
            break;
          }
        }
        const newGames = prev.gamesPlayed + 1;
        const newState = {
          ...prev,
          status: 'wrong' as GameStatus,
          answerStates: newStates,
          coins: prev.coins + safetyCoins,
          totalCoins: prev.totalCoins + safetyCoins,
          gamesPlayed: newGames,
        };
        saveState(newState);
        return newState;
      }
    });
  }, []);

  const useLifeline = useCallback((type: LifelineType) => {
    setState(prev => {
      if (!prev.lifelines[type]) return prev;
      const currentQ = prev.questions[prev.currentLevel - 1];
      if (!currentQ) return prev;
      
      const newLifelines = { ...prev.lifelines, [type]: false };
      
      if (type === 'fifty_fifty') {
        const correctIdx = currentQ.correctIndex;
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIdx);
        // Pick 2 random wrong to eliminate
        const shuffled = wrongIndices.sort(() => Math.random() - 0.5);
        const toEliminate = shuffled.slice(0, 2);
        const newStates: AnswerState[] = [...prev.answerStates];
        toEliminate.forEach(i => { newStates[i] = 'eliminated'; });
        return { ...prev, lifelines: newLifelines, eliminatedOptions: toEliminate, answerStates: newStates };
      }
      
      if (type === 'ask_audience') {
        const correctIdx = currentQ.correctIndex;
        const votes = [0, 0, 0, 0];
        votes[correctIdx] = Math.floor(Math.random() * 30) + 50; // 50-80%
        let remaining = 100 - votes[correctIdx];
        [0, 1, 2, 3].filter(i => i !== correctIdx).forEach((i, idx, arr) => {
          if (idx === arr.length - 1) votes[i] = remaining;
          else { const v = Math.floor(Math.random() * remaining); votes[i] = v; remaining -= v; }
        });
        return { ...prev, lifelines: newLifelines, audienceVotes: votes };
      }
      
      return { ...prev, lifelines: newLifelines };
    });
  }, []);

  const walkAway = useCallback(() => {
    setState(prev => {
      if (prev.currentLevel <= 1) {
        const newState = { ...prev, status: 'quit' as GameStatus, gamesPlayed: prev.gamesPlayed + 1 };
        saveState(newState);
        return newState;
      }
      const prize = PrizeValues[prev.currentLevel - 2]; // previous level's prize
      const newCoins = prev.coins + prize.coins;
      const newState = { ...prev, status: 'quit' as GameStatus, coins: newCoins, totalCoins: prev.totalCoins + prize.coins, gamesPlayed: prev.gamesPlayed + 1 };
      saveState(newState);
      return newState;
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'idle',
      currentLevel: 0,
      questions: [],
      lifelines: { fifty_fifty: true, phone_friend: true, ask_audience: true },
      eliminatedOptions: [],
      audienceVotes: [],
      selectedAnswer: null,
      answerStates: ['default', 'default', 'default', 'default'],
    }));
  }, []);

  const addAdsWatched = useCallback((count: number = 1) => {
    setState(prev => {
      const newState = { ...prev, adsWatched: prev.adsWatched + count };
      saveState(newState);
      return newState;
    });
  }, []);

  const canWithdraw = useCallback((): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (state.lastWithdrawalDate === today) return false;
    if (state.adsWatched < 350) return false;
    const minCoins = Math.floor(10000 / 10); // 1 coin = 10 rupiah assumption
    if (state.coins < minCoins) return false;
    return true;
  }, [state.adsWatched, state.lastWithdrawalDate, state.coins]);

  const setLastWithdrawalDate = useCallback((date: string) => {
    setState(prev => {
      const newState = { ...prev, lastWithdrawalDate: date };
      saveState(newState);
      return newState;
    });
  }, []);

  // Advance to next level after correct answer
  useEffect(() => {
    if (state.status === 'correct') {
      const timer = setTimeout(() => {
        setState(prev => ({
          ...prev,
          status: 'playing',
          currentLevel: prev.currentLevel + 1,
          selectedAnswer: null,
          eliminatedOptions: [],
          audienceVotes: [],
          answerStates: ['default', 'default', 'default', 'default'],
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  return (
    <GameContext.Provider value={{
      ...state,
      startGame,
      selectAnswer,
      confirmAnswer,
      useLifeline,
      walkAway,
      resetGame,
      addAdsWatched,
      canWithdraw,
      setLastWithdrawalDate,
    }}>
      {children}
    </GameContext.Provider>
  );
}
