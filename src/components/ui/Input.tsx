"use client";

import { InputHTMLAttributes, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showCounter?: boolean;
  maxCount?: number;
  currentCount?: number;
  error?: string;
}

export default function Input({
  label,
  showCounter = false,
  maxCount = 16,
  currentCount = 0,
  error,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm text-white font-medium">{label}</label>
          {showCounter && (
            <span className="text-xs text-white/40">
              {currentCount}/{maxCount}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <input
          type={inputType}
          className={`
            w-full px-4 py-3.5 rounded-xl
            bg-transparent border-2 border-[#5B4FC7]
            text-white placeholder:text-white/30
            focus:outline-none focus:border-[#7F5AF0] focus:shadow-[0_0_20px_rgba(127,90,240,0.3)]
            transition-all duration-200
            ${isPassword ? "pr-12" : ""}
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
