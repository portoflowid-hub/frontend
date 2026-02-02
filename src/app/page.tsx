"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Simple redirect logic or just generic landing content
    // For now, let's just show a landing page placeholder
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to PortoFlow</h1>
      <p className="mb-4">Platform penjualan kelas coding dan segala hal IT.</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
        >
          Register
        </button>
      </div>
    </div>
  );
}
