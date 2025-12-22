/* //clientApi

import nextServer from "./api";
import type { Note } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag?: string;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag: string | undefined
) => {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag,
    },
  });
  return response.data;
};
export const fetchNoteById = (id: string) => nextServer.get(`/notes/${id}`);
export const createNote = (data: Note) => nextServer.post("/notes", data);
export const deleteNote = (id: string) => nextServer.delete(`/notes/${id}`);

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await nextServer.post("/auth/register", {
    email,
    password,
  });

  return response.data;
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const response = await nextServer.post("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout", null, {
    withCredentials: true,
  });
}

export const checkSession = async () => {
  const user = await nextServer.get("/auth/session");
  return user;
};

export const getMe = async () => {
  const { data } = await nextServer.get("/users/me");
  return data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch("/users/me", data);
  return res.data;
};
 */

import nextServer from "./api";
import type { Note } from "@/types/note";

/* ================= NOTES ================= */

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  tag?: string;
}

export const fetchNotes = async (
  page = 1,
  search = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  data: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await nextServer.delete(`/notes/${id}`);
};

/* ================= AUTH ================= */

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await nextServer.post("/auth/register", {
    email,
    password,
  });
  return data;
}

interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const res = await nextServer.post("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export const checkSession = async () => {
  const { data } = await nextServer.get("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await nextServer.get("/users/me");
  return data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await nextServer.patch("/users/me", data);
  return res.data;
};
