import { Button } from "@/components/ui/button";
import { RegistrationSubPageProps } from "../types";

const RegistrationIntroduction: React.FC<RegistrationSubPageProps> = ({ nextPage }) => {
    return <div className="text-center">
        <p
            className="text-nutrifit-tertiary"
        >
            We will now ask you some<br />
            questions in order to<br />
            <span className="font-bold text-xl">
                customize<br />
                your experience
            </span>
        </p>
        
        <Button
            onClick={nextPage}
            className="text-nutrifit-tertiary text-lg font-normal bg-transparent hover:bg-transparent hover:underline mt-6"
        >
            Okay
        </Button>
    </div>
};

export default RegistrationIntroduction;