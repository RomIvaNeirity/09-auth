import nextServer from "./api";
import { cookies } from "next/headers";

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag: string | undefined
) => {
  const response = await nextServer.get("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag,
    },
  });
  return response.data;
};

const getCookieHeader = async () => {
  const cookieStore = await cookies(); // ← КЛЮЧОВЕ
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const fetchNoteById = async (id: string) => {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();

  return nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const getMe = async () => {
  const cookieHeader = await getCookieHeader();

  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};
