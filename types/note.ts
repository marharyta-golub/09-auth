export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export type NoteTag = 'Work' | 'Personal' | 'Todo' | 'Shopping' | 'Meeting';

export interface NewNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag | 'all';
}
