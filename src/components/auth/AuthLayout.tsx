import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  heroContent: ReactNode;
  heroPosition?: "left" | "right";
}

export default function AuthLayout({
  children,
  heroContent,
  heroPosition = "left",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#7F5AF0] to-[#9F7AEA] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-white font-semibold text-lg">PortoFlow</span>
      </div>

      {/* Hero Section */}
      <div
        className={`
          flex-1 p-12 lg:p-16 flex items-center justify-center
          ${heroPosition === "right" ? "lg:order-2" : ""}
        `}
      >
        <div className="max-w-lg">{heroContent}</div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
