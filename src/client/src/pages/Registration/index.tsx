import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const swipeVariants = {
    enter:  { x: 1000,  opacity: 0 },
    center: { x: 0,     opacity: 1 },
    exit:   { x: -1000, opacity: 0 }
};

const RegistrationPage = () => {
    const [index, setIndex] = useState(0);

    const nextPage = (): void => {
        setIndex((prev) => (Math.min(prev + 1, 3)));
    };

    const displayPage = (index: number) =>{
        return <div className="flex flex-col gap-2">
            <p>Showing page: {index}</p>
            <Button onClick={nextPage}>Next Page</Button>
        </div>
    }

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
                    className="absolute w-full h-full flex items-center justify-center bg-gray-200 rounded-lg shadow-lg"
                >
                    {displayPage(index)}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RegistrationPage;
