// components/AuthProvider/AuthProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null); // ✅ тепер дозволено
          return;
        }

        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
