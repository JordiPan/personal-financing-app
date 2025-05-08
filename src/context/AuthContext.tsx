import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null; //access token
  role: string | null;
  setLoginInfo: (role: string | null, token: string | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setLoginInfo = (role: string | null, token: string | null) => {
    setRole(role);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ role, token, setLoginInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Bad");
  }
  return context;
};
