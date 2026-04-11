import { useState, useEffect } from "react";

export type User = {
  name: string;
  email: string;
  phone: string;
  age: number;
  role: string;
  depressionLevel: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem("currentUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("registered"); // Optional: clear registration state if needed
    window.dispatchEvent(new Event("auth-change"));
  };

  return { user, logout };
}
