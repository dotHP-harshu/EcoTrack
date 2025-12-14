import { createContext, useState, useEffect, useContext } from "react";
import { loginApi, meApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data, error } = await meApi();

      if (data?.data?.user) {
        setUser(data.data.user);
      } else {
        setUser(null);
      }
      setChecking(false);
    };
    check();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checking, setChecking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
