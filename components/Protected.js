"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../lib/auth";

export default function Protected({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) router.replace("/login");
    else setReady(true);

    const onExpired = () => router.replace("/login");
    window.addEventListener("auth-expired", onExpired);
    return () => window.removeEventListener("auth-expired", onExpired);
  }, [router]);

  if (!ready) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  return children;
}