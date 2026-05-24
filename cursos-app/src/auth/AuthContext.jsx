import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setIsAuthenticated(false);
  };

  return (

    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export default AuthProvider;