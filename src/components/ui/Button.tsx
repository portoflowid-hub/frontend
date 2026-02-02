"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "google" | "ghost";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

  const variants = {
    primary: `
      bg-[#A78BFA] text-white
      hover:bg-[#B794FF] hover:shadow-[0_0_30px_rgba(167,139,250,0.5)]
      active:scale-[0.98]
    `,
    secondary: `
      bg-transparent border-2 border-[#7F5AF0]
      text-[#7F5AF0] hover:bg-[#7F5AF0]/10
    `,
    google: `
      bg-white text-gray-800 border border-gray-300
      hover:bg-gray-50 flex items-center justify-center gap-3
    `,
    ghost: `
      bg-transparent border-2 border-white/20 text-white/90
      hover:bg-white/5 hover:border-white/30
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {variant === "google" && <FcGoogle size={20} />}
      {children}
    </button>
  );
}
