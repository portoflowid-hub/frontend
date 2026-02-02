"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import OTPInput from "@/components/ui/OTPInput";
import Button from "@/components/ui/Button";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  const handleOTPComplete = async (otpValue: string) => {
    setError("");
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const response = await fetch(`${API_BASE}/api/users/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/setup/username");
      } else {
        setError(data.message || "Kode OTP tidak valid");
      }
    } catch (err) {
      setError("Gagal memverifikasi OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    console.log("Resend OTP to:", email);
  };

  return (
    <ModalCard
      title="Masukkan Kode Verifikasi"
      subtitle={`Kode verifikasi telah dikirim ke ${maskedEmail}.`}
    >
      <div className="space-y-8">
        <OTPInput length={6} onComplete={handleOTPComplete} onChange={setOtp} />

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <button onClick={handleResend} className="text-sm text-white/50">
            Tidak mendapat kode?{" "}
            <span className="text-[#7F5AF0] hover:text-[#A78BFA] font-semibold transition-colors">
              Resend code
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleOTPComplete(otp)}
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verifikasi"}
          </Button>
        </div>
      </div>
    </ModalCard>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
