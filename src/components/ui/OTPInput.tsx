"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChange?: (otp: string) => void;
}

export default function OTPInput({
  length = 6,
  onComplete,
  onChange,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange?.(otpString);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpString.length === length && !otpString.includes("")) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);

    const otpString = newOtp.join("");
    onChange?.(otpString);

    if (newOtp.length === length) {
      onComplete?.(otpString);
      inputRefs.current[length - 1]?.focus();
    } else {
      inputRefs.current[newOtp.length]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="
            w-14 h-16 text-center text-2xl font-bold
            bg-transparent border-2 border-[#5B4FC7] rounded-2xl
            text-white focus:outline-none focus:border-[#7F5AF0]
            focus:shadow-[0_0_20px_rgba(127,90,240,0.4)]
            transition-all duration-200
          "
        />
      ))}
    </div>
  );
}
