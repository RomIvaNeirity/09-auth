import nextServer from "./api";
import { cookies } from "next/headers";

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag: string | undefined
) => {
  const cookieStore = cookies();
  const response = await nextServer.get("/notes", {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = cookies();
  const response = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSession = async () => {
  const cookieStore = cookies();
  const data = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

/* export const getMe = async () => {
  const cookieStore = cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}; */

export async function getMe() {
  const cookieStore = await cookies(); // 🔑 ВАЖЛИВО
  const session = cookieStore.get("session");

  if (!session) {
    return null; // або redirect("/signin")
  }

  const res = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log("COOKIE HEADER:", cookieStore.toString());
  return res.data;
}
