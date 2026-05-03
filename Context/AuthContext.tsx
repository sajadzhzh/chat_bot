"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: number;
  userName: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loginContext: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loginContext: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const loginContext = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loginContext }}>
      {children}
    </AuthContext.Provider>
  );
}