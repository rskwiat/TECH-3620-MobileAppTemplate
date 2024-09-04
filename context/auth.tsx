// @ts-nocheck
import { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationContainerRef, useRouter, useSegments } from 'expo-router';
import pb from '@/lib/pocketbase';

type Auth = {
  appSignIn: (email, password) => void;
  appSignOut: () => void;
  createAccount: (data) => void;
  user: any,
  isLoggedIn: boolean,
  isInitialized: boolean;
};

const AuthContext = createContext<Auth>({});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user, isInitialized) {
  const router = useRouter();
  const segments = useSegments();

  // Check that navigation is all good
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavRef = useNavigationContainerRef();

  // Set ups a listener to check and see if the navigator is ready.
  useEffect(() => {
    const unsubscribe = rootNavRef?.addListener('state', (event) => {
      setIsNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavRef.current]);

  useEffect(() => {
    // Navigation isn't set up. Do nothing.
    if (!isNavigationReady) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!isInitialized) return;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/(tabs)');
    }
  }, [user, segments, isNavigationReady, isInitialized]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (pb) {
        const isLoggedIn = pb.authStore.isValid;
        setIsLoggedIn(isLoggedIn);
        setUser(isLoggedIn ? pb.authStore.model : null);
        setIsInitialized(true);
      }
    };

    checkAuthStatus();
  }, []);

  const appSignIn = async (email, password) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb
        ?.collection('users')
        .authWithPassword(email, password);
      setUser(pb?.authStore.isValid ? pb.authStore.model : null);
      setIsLoggedIn(pb?.authStore.isValid ?? false);
      return { user: resp?.record };
    } catch (e) {
      return { error: e };
    }
  };

  const appSignOut = async () => {
    if (!pb) return { error: 'PocketBase not initialized' };
    try {
      await pb?.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);
      return { user: null };
    } catch (e) {
      return { error: e };
    }
  };

  const createAccount = async (data) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb?.collection('users').create(data);
      setUser(pb?.authStore.isValid ? pb.authStore.model : null);
      setIsLoggedIn(pb?.authStore.isValid ?? false);
      return { user: resp?.record };
    } catch (e) {
      return { error: e };
    }
  }

  useProtectedRoute(user, isInitialized);

  return (
    <AuthContext.Provider
      value={{
        appSignIn,
        appSignOut,
        createAccount,
        user,
        isLoggedIn,
        isInitialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
