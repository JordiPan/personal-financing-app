import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null; //access token
  setToken: (token: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthContext.Provider value={{token, setToken, isLoading, setIsLoading }}>
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
