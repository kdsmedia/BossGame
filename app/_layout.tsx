import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import { Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Baloo2_400Regular } from '@expo-google-fonts/baloo-2';
import { AlertProvider } from '@/template';
import { GameProvider } from '@/contexts/GameContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
    Fredoka_700Bold,
    Baloo2_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <AlertProvider>
      <SafeAreaProvider>
        <GameProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </GameProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
