import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

const AuthPage = () => {
    const [displayForm, setDisplayForm] = useState<"login" | "register">("login");

    return (
        <div className="flex items-center justify-center min-h-screen w-full p-4">
            <div className="w-full max-w-sm md:max-w-3xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {displayForm === "login" && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LoginForm changeForm={() => setDisplayForm("register")} />
                        </motion.div>
                    )}

                    {displayForm === "register" && (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <RegisterForm changeForm={() => setDisplayForm("login")} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AuthPage;
