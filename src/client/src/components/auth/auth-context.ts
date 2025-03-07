import { createContext } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: User | false | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: () => boolean | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
