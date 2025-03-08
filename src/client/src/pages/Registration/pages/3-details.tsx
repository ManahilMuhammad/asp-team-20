import { Button } from "@/components/ui/button";
import { RegistrationSubPageProps } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RegistrationPersonalDetails: React.FC<RegistrationSubPageProps> = ({ nextPage, details, updateDetails }) => {

    const handleChange = (key: string, value: number) => {

        if(!updateDetails) return;
        updateDetails({ [key]: value });
    }

    return <div className="text-center">
        <p
            className="text-nutrifit-tertiary mb-8"
        >
            Please enter the following<br />
            <span className="font-bold text-xl">
                details about yourself
            </span>
        </p>

        <div className="text-left mb-4 flex flex-col gap-4">
            
            <div className="grid gap-2">
                <Label htmlFor="age" className="text-nutrifit-tertiary font-bold">Age</Label>
                <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.age}
                    onChange={(e) => handleChange("age", Math.max(13, Number(e.target.value)))}
                />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="height" className="text-nutrifit-tertiary font-bold">Height <span className="font-medium">(in centimeters)</span></Label>
                <Input
                    id="height"
                    type="number"
                    min={40}
                    placeholder="165"
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.height}
                    onChange={(e) => handleChange("height", Math.max(40, Number(e.target.value)))}
                />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="weight" className="text-nutrifit-tertiary font-bold">Weight <span className="font-medium">(in kilograms)</span></Label>
                <Input
                    id="weight"
                    type="number"
                    placeholder="75"
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.weight}
                    onChange={(e) => handleChange("weight", Math.max(20, Number(e.target.value)))}
                />
            </div>
        </div>
        
        <Button
            onClick={nextPage}
            className="text-nutrifit-tertiary text-lg font-normal bg-transparent hover:bg-transparent hover:underline"
        >
            Continue
        </Button>
    </div>
};

export default RegistrationPersonalDetails;