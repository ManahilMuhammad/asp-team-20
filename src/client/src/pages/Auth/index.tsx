import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const AuthPage = () => {
    const [displayForm, setDisplayForm] = useState<"login" | "register">("login");

    return (
        <div className="flex items-center justify-center min-h-screen w-full p-4">
            <div className="w-full max-w-sm md:max-w-3xl">
                {displayForm === "login" && (
                    <LoginForm changeForm={() => setDisplayForm("register")} />
                )}
                {displayForm === "register" && (
                    <RegisterForm changeForm={() => setDisplayForm("login")} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
