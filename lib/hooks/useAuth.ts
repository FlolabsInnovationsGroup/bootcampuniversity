import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { LoginCredentials, RegisterCredentials } from '@/lib/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Log the user in after successful registration
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return {
    session,
    status,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    login,
    register,
    logout,
  };
} 