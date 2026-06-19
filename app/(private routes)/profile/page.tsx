import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'My Profile | NoteHub',
  description: 'View and manage your personal NoteHub profile details.',
  robots: 'noindex, nofollow',
};

export default async function ProfilePage() {
  const user = await getMe();

  const defaultAvatar = 'https://ac.goit.global/images/avatar-placeholder.png';
  const avatarSrc =
    user?.avatar && user.avatar.trim() !== '' ? user.avatar : defaultAvatar;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link
            href="/profile/edit"
            prefetch={false}
            className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username ?? 'Not specified'}</p>
          <p>Email: {user?.email ?? 'your_email@example.com'}</p>
        </div>
      </div>
    </main>
  );
}
