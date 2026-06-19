'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error('Failed to fetch user session:', error);
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
