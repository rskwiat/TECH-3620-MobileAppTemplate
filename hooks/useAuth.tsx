import { useSegments, useRouter, useNavigationContainerRef } from 'expo-router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPb } from '@/utils/pocketbase';

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
};

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
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/(tabs)');
    }
  }, [user, segments, isNavigationReady, isInitialized]);
}

export default function AuthProvider({ children }) {
  const pb = getPb();
  const [isInitialized, setIsInitialized] = useState<any>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  const [user, setUser] = useState<any>(null);

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
  }, [pb]);

  const appSignIn = async (email: string, password: string) => {
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

  const createAccount = async ({ email, password, passwordConfirm, name }) => {
    if (!pb) return { error: 'PocketBase not initialized' };

    try {
      const resp = await pb.collection('users').create({
        email,
        password,
        passwordConfirm,
        name: name ?? '',
      });

      return { user: resp };
    } catch (e) {
      return { error: e.response };
    }
  };

  useProtectedRoute(user, isInitialized);

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => appSignIn(email, password),
        signOut: () => appSignOut(),
        createAccount: ({ email, password, passwordConfirm, name }) =>
          createAccount({ email, password, passwordConfirm, name }),
        isLoggedIn,
        isInitialized,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};
