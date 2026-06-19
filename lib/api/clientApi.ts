import { nextServer } from './api';
import type { User } from '@/types/user';
import type { Note, FetchNotesParams } from '@/types/note';

export interface RegisterRequest {
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface UpdateUserRequest {
  username?: string;
  avatar?: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
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
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  data: Pick<Note, 'title' | 'content' | 'tag'>,
): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await nextServer.delete(`/notes/${id}`);
};
