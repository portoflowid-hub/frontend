"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password minimal 8 karakter";
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return "Kombinasi huruf besar, huruf kecil, dan angka";
    }
    if (!/\d/.test(password)) {
      return "Password harus mengandung angka";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Kombinasikan karakter @&$!";
    }
    if (password !== confirmPassword) {
      return "Password tidak cocok";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/setup/profile");
    } catch (err) {
      setError("Gagal menyimpan password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCard
      title="Masukkan Password anda"
      subtitle="Jangan gunakan password yang mudah ditebak."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <Input
          label="Konfirmasi Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Konfirmasi Password"
          error={error}
          required
        />

        <div className="space-y-2 text-sm text-white/60">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
            Gunakan minimal 8 karakter.
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
            Kombinasi huruf besar, huruf kecil, dan angka.
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
            Kombinasikan karakter @&$!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={loading}
          >
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Lanjutkan"}
          </Button>
        </div>
      </form>
    </ModalCard>
  );
}
