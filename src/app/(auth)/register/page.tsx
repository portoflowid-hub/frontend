"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const response = await fetch(`${API_BASE}/api/users/register/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(
          data.message || data.error || "Registrasi gagal. Silakan coba lagi.",
        );
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const heroContent = (
    <div className="text-white">
      <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
        Tentukan Jalur Karier & Ikuti Roadmap Belajarnya
      </h1>
      <p className="text-white/60 text-base leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut.
      </p>
    </div>
  );

  return (
    <AuthLayout heroContent={heroContent} heroPosition="right">
      <div className="bg-[rgba(20,15,45,0.8)] border-2 border-[#5B4FC7] rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(127,90,240,0.3)]">
        <h2 className="text-3xl font-bold text-white mb-1">
          Create an account
        </h2>
        <p className="text-white/50 text-sm mb-8">
          Pilih karirmu, jalani karirmu dengan roadmap yang telah kami
          dedikasikan
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Memproses..." : "Lanjutkan"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[rgba(20,15,45,0.8)] text-white/40 text-sm">
                Or continue with
              </span>
            </div>
          </div>

          <Button type="button" variant="google" fullWidth>
            Lanjutkan dengan Google
          </Button>

          <p className="text-center text-white/50 text-sm pt-4">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-[#7F5AF0] hover:text-[#A78BFA] font-semibold transition-colors"
            >
              Masuk disini!
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
