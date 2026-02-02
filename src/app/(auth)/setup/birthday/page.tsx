"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ModalCard from "@/components/auth/ModalCard";
import Button from "@/components/ui/Button";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i,
);

export default function BirthdayPage() {
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!month || !day || !year) return;

    setLoading(true);
    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/setup/subscription");
    } catch (err) {
      console.error("Failed to save birthday");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalCard
      title="Tanggal Lahir Anda"
      subtitle="Tanggal lahir digunakan untuk verifikasi data."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {/* Month */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/30 border border-[#4A4A6A] text-white focus:outline-none focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]/20 transition-all"
            required
          >
            <option value="" disabled>
              Bulan
            </option>
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          {/* Day */}
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/30 border border-[#4A4A6A] text-white focus:outline-none focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]/20 transition-all"
            required
          >
            <option value="" disabled>
              Tanggal
            </option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/30 border border-[#4A4A6A] text-white focus:outline-none focus:border-[#7F5AF0] focus:ring-2 focus:ring-[#7F5AF0]/20 transition-all"
            required
          >
            <option value="" disabled>
              Tahun
            </option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!month || !day || !year || loading}
        >
          {loading ? "Menyimpan..." : "Lanjutkan"}
        </Button>
      </form>
    </ModalCard>
  );
}
