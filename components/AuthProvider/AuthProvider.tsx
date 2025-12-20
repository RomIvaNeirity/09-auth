// components/AuthProvider/AuthProvider.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuthStore();

  console.log("[AuthProvider] render"); //

  useEffect(() => {
    console.log("[AuthProvider] useEffect start"); //

    const initAuth = async () => {
      try {
        console.log("[AuthProvider] calling getMe()"); //
        const user = await getMe();
        console.log("[AuthProvider] getMe SUCCESS:", user); //
        setUser(user);
      } catch (error) {
        console.log(
          "[AuthProvider] getMe ERROR:",

          error
        ); //
        if (error) {
          setUser(null);
        }
      } finally {
        console.log("[AuthProvider] auth init finished"); //
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser]);
  console.log("[AuthProvider] loading..."); //
  if (loading) return null;

  console.log("[AuthProvider] render children"); //
  return <>{children}</>;
}
