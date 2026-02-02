"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Cek jika token sudah expired (jika ada field exp)
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          logout(); // Logout jika expired
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("accessToken", token);
      setUser(decodedToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed (invalid token):", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk mempermudah penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
