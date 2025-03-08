import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegistrationIntroduction from "./pages/1-introduction";
import RegistrationGoalSelection from "./pages/2-goal-selection";
import { RegistrationDetails } from "./types";
import { useAuth } from "@/hooks/use-auth";
import RegistrationPersonalDetails from "./pages/3-details";

const swipeVariants = {
    enter:  { x: 1000,  opacity: 0 },
    center: { x: 0,     opacity: 1 },
    exit:   { x: -1000, opacity: 0 }
};

const RegistrationPage = () => {
    const { user } = useAuth();

    const [index, setIndex] = useState(0);
    const [details, setDetails] = useState<Partial<RegistrationDetails>>();

    const nextPage = (): void => {
        setIndex((prev) => (Math.min(prev + 1, 3)));
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
