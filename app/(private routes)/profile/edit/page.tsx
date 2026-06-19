'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [username, setUsername] = useState(user?.username || '');

  const defaultAvatar =
    'https://ac.goit.global/fullstack/react/default-avatar.jpg';
  const avatarUrl = user?.avatar || defaultAvatar;

  const { mutate: handleUpdateProfile, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: updatedUser => {
      if (updatedUser) {
        setUser(updatedUser);
        router.push('/profile');
      }
    },
    onError: (err: unknown) => {
      const errorWithData = err as {
        response?: { data?: { message?: string } };
      };
      setError(
        errorWithData.response?.data?.message ||
          'Failed to update profile. Try again.',
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    handleUpdateProfile({ username });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={avatarUrl}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <p>Email: {user?.email || 'user_email@example.com'}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
              disabled={isPending}>
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
