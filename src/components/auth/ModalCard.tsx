import { ReactNode } from "react";

interface ModalCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function ModalCard({
  children,
  title,
  subtitle,
  showLogo = true,
}: ModalCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative w-full max-w-md p-10 bg-[rgba(20,15,45,0.8)] border-2 border-[#5B4FC7] rounded-3xl backdrop-blur-xl shadow-[0_0_60px_rgba(127,90,240,0.3)]">
        {showLogo && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#7F5AF0] to-[#A78BFA] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
        )}

        {title && (
          <div className="text-center mb-8 mt-2">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
