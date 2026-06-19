'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { login, LoginRequest } from '@/lib/api/clientApi';
import css from './SignInPage.module.css';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore(state => state.setUser);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: login,
    onSuccess: res => {
      if (res) {
        setUser(res);
        router.push('/profile');
      }
    },
    onError: (err: unknown) => {
      const errorWithData = err as {
        response?: { data?: { message?: string } };
      };
      setError(
        errorWithData.response?.data?.message ||
          'Invalid email or password. Try again.',
      );
    },
  });

  const handleSubmit = async (formData: FormData) => {
    setError('');

    const formValues = Object.fromEntries(formData) as unknown as LoginRequest;

    handleLogin(formValues);
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            disabled={isPending}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            disabled={isPending}
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
