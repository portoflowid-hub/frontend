"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function UsernamePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (username.length < 3) {
      setError("Username minimal 3 karakter");
      return;
    }

    if (username.length > 16) {
      setError("Username maksimal 16 karakter");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username hanya boleh huruf, angka, dan underscore");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/setup/password");
    } catch (err) {
      setError("Gagal menyimpan username");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCard
      title="Masukkan Username anda"
      subtitle="Username akan ditampilkan secara publik."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          showCounter
          maxCount={16}
          currentCount={username.length}
          error={error}
          required
        />

        <div className="space-y-2 text-sm text-white/60">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
            Gunakan huruf kecil tanpa spasi
          </p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
            Maksimal 16 karakter
          </p>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? "Menyimpan..." : "Lanjutkan"}
        </Button>
      </form>
    </ModalCard>
  );
}
