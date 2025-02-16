import React, { useState, ReactNode, useEffect } from "react";
import { AuthContext, User } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | false | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      const decodedUser = parseJwt(token);
      setUser(decodedUser);
    } catch (error) {
      setUser(false);
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isTokenValid = async (token: string): Promise<boolean> => {
    /* 
        Todo:
        - Server auth verification
    */
    // try {
    //   const response = await fetch(`/api/auth/verify`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.ok) {
    //     return true;
    //   }
    //   return false;
    // } catch (error) {
    //   console.error("Token validation failed:", error);
    //   return false;
    // }
    console.log(token);
    return true;
  };

  const isAuthenticated = () => {
    return user === null ? null : !!user;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const verifyToken = async () => {
        try {
          const isValid = await isTokenValid(token);
          if (isValid) {
            const decodedUser = parseJwt(token);
            setUser(decodedUser);
          } else {
            logout();
          }
        } catch {
          logout();
        }
      };

      verifyToken();
    } else {
      setTimeout(() => setUser(false), 500);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const parseJwt = (token: string): User => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join("")
  );

  return JSON.parse(jsonPayload) as User;
};
