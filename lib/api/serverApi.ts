import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { User } from '@/types/user';
import type { FetchNotesParams, Note } from '@/types/note';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<User>('/users/me', headers);
  return data;
};

export const checkSession = async () => {
  const headers = await getAuthHeaders();
  const res = await nextServer.get('/auth/session', headers);
  return res;
};

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = 12,
  tag,
}: FetchNotesParams) => {
  const { data } = await nextServer.get<{ notes: Note[]; totalPages: number }>(
    '/notes',
    {
      params: {
        search,
        page,
        perPage,
        tag: tag === 'all' ? undefined : tag,
      },
    },
  );
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, headers);
  return data;
};
