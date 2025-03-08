import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RegistrationDetails } from "./types";
import { useAuth } from "@/hooks/use-auth";

import RegistrationIntroduction from "./pages/1-introduction";
import RegistrationGoalSelection from "./pages/2-goal-selection";
import RegistrationPersonalDetails from "./pages/3-details";
import RegistrationAvatarSelection from "./pages/4-avatar-selection";

const swipeVariants = {
    enter:  { x: 1000,  opacity: 0 },
    center: { x: 0,     opacity: 1 },
    exit:   { x: -1000, opacity: 0 }
};

/* 

    To Do:
    - Display potential errors

*/

const RegistrationPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [details, setDetails] = useState<Partial<RegistrationDetails>>();

    const submitRegistrationDetails = async (): Promise<void> => {

        try {
            const token = localStorage.getItem("nutrifit-token");
            const response = await fetch('/api/users/setup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(details)
            });

            if (!response.ok) {
                const data = await response.json();
                return console.error('Setup request failed', data.error);
            }

            if (user && details?.avatar) user.avatar = details?.avatar;
            navigate('/profile');

        } catch (err: any) { // eslint-disable-line
            console.error('Unable to submit setup details:', err.message);
        }
    }

    const nextPage = (): void => {
        if (index < 3) return setIndex((prev) => (Math.min(prev + 1, 3)));
        submitRegistrationDetails();
    };

    const updateDetails = (data: Partial<RegistrationDetails>) => {
        setDetails((prev) => ({ ...prev, ...data }));
    }

    const displayPage = (index: number) =>{
        switch (index) {
            case 0:
                return <RegistrationIntroduction nextPage={nextPage} />;
            case 1:
                return <RegistrationGoalSelection nextPage={nextPage} details={details} updateDetails={updateDetails} />;
            case 2:
                return <RegistrationPersonalDetails nextPage={nextPage} details={details} updateDetails={updateDetails} />;
            case 3:
                return <RegistrationAvatarSelection nextPage={nextPage} details={details} updateDetails={updateDetails} />;
        }
    }

    useEffect(() => {
        if (user) updateDetails(user);
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center my-auto h-screen w-full overflow-none">
            <AnimatePresence initial={false}>
                <motion.div
                    key={index}
                    variants={swipeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute w-full h-full flex items-center justify-center rounded-lg shadow-lg"
                >
                    {displayPage(index)}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RegistrationPage;
