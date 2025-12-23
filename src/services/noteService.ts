import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${apiKey}`,
  },
});

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number
): Promise<fetchNotesProps> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
  } = {
    page,
    perPage,
  };

  if (search.trim() !== "") {
    params.search = search;
  }

  const response = await instance.get<fetchNotesProps>("/notes", {
    params,
  });
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await instance.post("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
}
