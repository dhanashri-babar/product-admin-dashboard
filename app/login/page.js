"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../lib/productApi";
import { isLoggedIn } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (isLoggedIn()) router.replace("/products"); }, [router]);

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.accessToken || data.token || "");
      localStorage.setItem("user", JSON.stringify(data));
      router.replace("/products");
    } catch {
      setError("Invalid username or password.");
    } finally { setBusy(false); }
  }

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">Product Admin Login</h1>
        <p className="mb-6 text-sm text-slate-500">Use emilys / emilyspass</p>
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</div>}
        <div className="grid gap-4">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="rounded-lg border px-3 py-2" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="rounded-lg border px-3 py-2" />
          <button disabled={busy} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50">
            {busy ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
}