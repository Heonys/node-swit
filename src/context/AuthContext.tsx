import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

type Props = {
  children: React.ReactElement;
};
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(undefined);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
