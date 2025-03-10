import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationDetails } from "../types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationConfirmation: React.FC<{ details: RegistrationDetails }> = ({ details }) => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/profile');
    }, 1500);

    return (
        <Card className="w-[80vw] md:w-[60vw] lg:w-[50vw] mx-auto">
            <CardHeader className="flex flex-col items-center">
                <Avatar>
                    <AvatarImage
                        src={
                            details?.avatar === "default" || !details?.avatar ? "/nutrifit-logo.svg" :
                            details.avatar.startsWith('http') ? details.avatar : `./base-avatars/${details.avatar}`
                        }
                    />
                    <AvatarFallback>
                        {getInitials(details.name)}
                    </AvatarFallback>
                </Avatar>
                <CardDescription>Welcome to Nutrifit !</CardDescription>
                <CardTitle>{details.name}</CardTitle>
            </CardHeader>
            <CardDescription className="p-4">
                <p className="flex flex-row gap-4 items-center justify-center">
                    <Loader className="animate-spin min-w-[26px]" size={24} />
                    We are loading your profile page, you'll be redirected in a moment.
                </p>
            </CardDescription>
        </Card>
    )
};

export default RegistrationConfirmation;