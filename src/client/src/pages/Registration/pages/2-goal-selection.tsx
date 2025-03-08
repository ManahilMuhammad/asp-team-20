import { Button } from "@/components/ui/button";
import { RegistrationSubPageProps } from "../types";
import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const goals: { goal: string; colour: string; }[] = [
    { goal: "Weight loss",  colour: "#FD8E17" },
    { goal: "Weight gain",  colour: "#129B94" },
    { goal: "Fitness",      colour: "#DF3434" },
    { goal: "Muscle gain",  colour: "#7BAE20" },
]

const RegistrationGoalSelection: React.FC<RegistrationSubPageProps> = ({ nextPage, details, updateDetails }) => {
    const [selected, setSelection] = useState<string|null>(null);

    const handleGoalSelection = (goal: string) => {

        setSelection(goal);

        if(!updateDetails) return;
        updateDetails({ goal });
    }

    return <div className="text-center">
        <p
            className="text-nutrifit-tertiary mb-6"
        >
            {
                details?.name &&
                <>{details?.name.split(" ")[0]},<br /></>
            }
            <span className="text-xl">
                what is your <span className="font-bold ">goal</span>?
            </span>
        </p>
        
        <div className="flex flex-col gap-2">
        {
            goals.map(({ goal, colour }, index) => (
                <Button
                    key={index}
                    className="rounded-full shadow-lg shadow-slate-400 dark:shadow-slate-800 text-white hover:brightness-90 w-[70vw] md:w-[40vw]"
                    style={{ backgroundColor: colour }}
                    onClick={() => {handleGoalSelection(goal)}}
                >
                    {selected === goal && <ArrowBigRight />}
                    { goal }
                    {selected === goal && <ArrowBigLeft />}
                </Button>
            ))
        }
        </div>
        
        <Button
            onClick={nextPage}
            className={
                `text-lg font-normal hover:underline `+
                `${selected === null ? "text-muted-foreground" : "text-nutrifit-tertiary"} `+
                `bg-transparent hover:bg-transparent mt-6`
            }
            disabled={selected === null}
        >
            Continue
        </Button>
    </div>
};

export default RegistrationGoalSelection;