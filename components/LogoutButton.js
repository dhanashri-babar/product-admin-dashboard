"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        logout();
        router.replace("/login");
      }}
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
    >
      Logout
    </button>
  );
}