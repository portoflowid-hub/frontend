"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import Button from "@/components/ui/Button";

const PRESET_AVATARS = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
  "/avatars/avatar-5.png",
  "/avatars/avatar-6.png",
  "/avatars/avatar-7.png",
  "/avatars/avatar-8.png",
  "/avatars/avatar-9.png",
  "/avatars/avatar-10.png",
];

export default function ProfilePage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedAvatar) return;

    setLoading(true);
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/setup/birthday");
    } catch (err) {
      console.error("Failed to save avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCard
      title="Pilih Foto Profilmu"
      subtitle="Gunakan foto terbaik agar akunmu mudah dikenali."
    >
      <div className="space-y-6">
        {/* Upload Button */}
        <div className="flex justify-center">
          <button className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 hover:border-[#7F5AF0] transition-colors flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <button className="w-full text-sm text-[#7F5AF0] hover:text-[#9F7AEA]">
          Upload Gambar
        </button>

        <p className="text-center text-white/60 text-sm">
          Kamu bisa unggah sendiri atau gunakan foto rekomendasi dari kami.
        </p>

        {/* Preset Avatars Grid */}
        <div className="grid grid-cols-5 gap-3">
          {PRESET_AVATARS.map((avatar, index) => (
            <button
              key={index}
              onClick={() => setSelectedAvatar(avatar)}
              className={`
                aspect-square rounded-full overflow-hidden
                border-2 transition-all
                ${
                  selectedAvatar === avatar
                    ? "border-[#7F5AF0] scale-110"
                    : "border-white/20 hover:border-white/40"
                }
              `}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedAvatar || loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </ModalCard>
  );
}
