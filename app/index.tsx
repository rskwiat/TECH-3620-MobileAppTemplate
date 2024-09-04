import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/context/auth';
import { useEffect } from 'react';

export default function Index() {
  const { isInitialized, isLoggedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (!isLoggedIn && !inAuthGroup) {
      router.replace('/(auth)');
    } else {
      router.replace('/(tabs)');
    }
  }, [segments, isInitialized, navigationState?.key]);

  return (
    <View>
      <ActivityIndicator animating size="large" />
    </View>
  );
}
