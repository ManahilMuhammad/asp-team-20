import { Button } from "@/components/ui/button";
import { RegistrationDetails, RegistrationSubPageProps } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const RegistrationPersonalDetails: React.FC<RegistrationSubPageProps> = ({ nextPage, details, updateDetails }) => {
    const [errors, setErrors] = useState<Partial<RegistrationDetails>>({});
    const [showErrors, setShowErrors] = useState<boolean>(false);

    const handleChange = (key: string, value: number) => {
        if(!updateDetails) return;

        let errorMessage = "";
        switch (key) {
            case "age":
                if (value < 13) errorMessage = "The age requirement is 13";
                break;
            case "height":
                if (value < 20 || isNaN(value)) errorMessage = "Height is invalid";
                break;
            case "weight":
                if (value < 20 || isNaN(value)) errorMessage = "Weight is invalid";
                break;
        }

        setErrors((prev) => ({ ...prev, [key]: errorMessage }));
        updateDetails({ [key]: value });
    }

    const handleSubmitClick = () => {
        // Check if any error inputs contain truthy values (i.e. error messages & not empty strings)
        const hasErrors = Object.values(errors).some(Boolean);
        if (!hasErrors) {
            nextPage();
        } else {
            setShowErrors(true);
        }
    };
    

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
            
            <div className="grid gap-1">
                <Label htmlFor="age" className="text-nutrifit-tertiary font-bold">Age</Label>
                <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min={13}
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.age || ""}
                    onChange={(e) => handleChange("age", Number(e.target.value))}
                />
                <p
                    className="text-red-500 text-sm"
                    style={{
                        opacity: showErrors && errors.age ? 1 : 0,
                        transform: showErrors && errors.age ? "translateY(0)" : "translateY(-10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >{errors.age}</p>
            </div>
            
            <div className="grid gap-1">
                <Label htmlFor="height" className="text-nutrifit-tertiary font-bold">Height <span className="font-medium">(in centimeters)</span></Label>
                <Input
                    id="height"
                    type="number"
                    min={40}
                    placeholder="165"
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.height || ""}
                    onChange={(e) => handleChange("height", Number(e.target.value))}
                />
                <p
                    className="text-red-500 text-sm"
                    style={{
                        opacity: showErrors && errors.height ? 1 : 0,
                        transform: showErrors && errors.height ? "translateY(0)" : "translateY(-10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >{errors.height}</p>
            </div>
            
            <div className="grid gap-1">
                <Label htmlFor="weight" className="text-nutrifit-tertiary font-bold">Weight <span className="font-medium">(in kilograms)</span></Label>
                <Input
                    id="weight"
                    type="number"
                    placeholder="75"
                    required
                    className="border-[1.5px] border-solid border-nutrifit-tertiary rounded-3xl"
                    value={details?.weight || ""}
                    onChange={(e) => handleChange("weight", Number(e.target.value))}
                />
                <p
                    className="text-red-500 text-sm"
                    style={{
                        opacity: showErrors && errors.weight ? 1 : 0,
                        transform: showErrors && errors.weight ? "translateY(0)" : "translateY(-10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >{errors.weight}</p>
            </div>
        </div>
        
        <Button
            onClick={handleSubmitClick}
            className="text-nutrifit-tertiary text-lg font-normal bg-transparent hover:bg-transparent hover:underline"
        >
            Continue
        </Button>
    </div>
};

export default RegistrationPersonalDetails;