import React, { useState, ReactNode, useEffect } from "react";
import { AuthContext, User } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | false | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { token } = await response.json();
      localStorage.setItem("nutrifit-token", token);

      const decodedUser = parseJwt(token);
      setUser(decodedUser);
      // console.log('Login successful, user:', decodedUser.id,);
      // console.log('token:', token);
      window.location.href = "/profile";
    } catch (error) {
      setUser(false);
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("nutrifit-token");
    window.location.href = "/";
  };

  const isTokenValid = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return user === null ? null : !!user;
  };

  useEffect(() => {
    const token = localStorage.getItem("nutrifit-token");
    if (token) {

      const verifyToken = async () => {
        try {
          const isValid = await isTokenValid(token);
          if (isValid) {
            const decodedUser = parseJwt(token);
            setUser(decodedUser);
          } else {
            // console.log('Invalid token, logging out:', isValid, token);
            logout();
          }
        } catch (err: any) { // eslint-disable-line
          console.error('unable to verify token', err);
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
