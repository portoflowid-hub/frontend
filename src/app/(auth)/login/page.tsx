"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const response = await fetch(`${API_BASE}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.accessToken);
      } else {
        setError(
          data.message ||
            "Login gagal. Periksa kembali email dan password Anda.",
        );
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Pastikan server backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  const heroContent = (
    <div className="text-white">
      <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
        Arahkan Kariermu, Pelajari Skillnya, Raih Kesempatan Baru
      </h1>
      <p className="text-white/60 text-base leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut.
      </p>
    </div>
  );

  return (
    <AuthLayout heroContent={heroContent} heroPosition="left">
      <div className="bg-[rgba(20,15,45,0.8)] border-2 border-[#5B4FC7] rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(127,90,240,0.3)]">
        <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
        <p className="text-white/50 text-sm mb-8">Masuk untuk melanjutkan</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            showCounter
            maxCount={16}
            currentCount={email.length}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 text-white/60 cursor-pointer hover:text-white/80 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#5B4FC7] bg-transparent text-[#7F5AF0] focus:ring-[#7F5AF0] focus:ring-offset-0"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-[#7F5AF0] hover:text-[#A78BFA] transition-colors"
            >
              Forget Password?
            </Link>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[rgba(20,15,45,0.8)] text-white/40 text-sm">
                ATAU
              </span>
            </div>
          </div>

          <Button type="button" variant="google" fullWidth>
            Lanjutkan dengan Google
          </Button>

          <p className="text-center text-white/50 text-sm pt-4">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[#7F5AF0] hover:text-[#A78BFA] font-semibold transition-colors"
            >
              Daftar disini
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
