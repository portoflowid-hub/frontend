"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import Button from "@/components/ui/Button";

const PACKAGES = [
  {
    name: "Paket 1 Kelas",
    price: "Rp 15.000,00",
    features: ["Video", "Modul PDF", "Sertifikat"],
  },
  {
    name: "Paket 3 kelas",
    price: "Rp 35.000,00",
    features: ["Video", "Modul PDF", "Sertifikat"],
    popular: true,
  },
  {
    name: "Paket 6 Kelas",
    price: "Rp 65.000,00",
    features: ["Video", "Modul PDF", "Sertifikat"],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const handleSubscribe = async () => {
    if (selectedPackage === null) return;

    setLoading(true);
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCard
      title="Pilih Paket Berlangganan"
      subtitle="Dapatkan pengalaman terbaik dengan berlangganan."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {PACKAGES.map((pkg, index) => (
            <button
              key={index}
              onClick={() => setSelectedPackage(index)}
              className={`
                relative p-4 rounded-xl border-2 transition-all
                ${
                  selectedPackage === index
                    ? "border-[#7F5AF0] bg-[#7F5AF0]/10"
                    : "border-white/20 hover:border-white/40"
                }
              `}
            >
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#7F5AF0] to-[#9F7AEA] rounded-full text-xs font-semibold text-white">
                  Terpopuler Sekarang
                </div>
              )}

              <div className="text-center space-y-2">
                <h3 className="font-bold text-white text-sm">{pkg.name}</h3>
                <p className="text-lg font-bold text-white">{pkg.price}</p>

                <div className="space-y-1 text-xs text-white/70">
                  {pkg.features.map((feature, i) => (
                    <p
                      key={i}
                      className="flex items-center justify-center gap-1"
                    >
                      <svg
                        className="w-3 h-3 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </p>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleSubscribe}
          disabled={selectedPackage === null || loading}
        >
          {loading ? "Memproses..." : "Skip"}
        </Button>
      </div>
    </ModalCard>
  );
}
