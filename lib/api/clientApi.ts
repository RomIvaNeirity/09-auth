//clientApi

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

  console.log("clientApi payload:", email, password);
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
