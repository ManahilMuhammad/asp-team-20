import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {

    const { user } = useAuth();

    const getInitials = (name: string): string => {
        if (!name) return "NF";
      
        const words = name.trim().split(/\s+/);
        const initials = words
          .slice(0, 2)
          .map(word => word[0]?.toUpperCase())
          .join("");
      
        return initials;
      };

    if (!user) return <Card>
        <CardHeader>
            <CardTitle>Loading Data</CardTitle>
            <Loader2 className="animate-spin marginx-auto" size={48} />
        </CardHeader>
    </Card>;

    console.log(user);

    return (
        <Card className="w-[80vw] md:w-[60vw] lg:w-[50vw] mx-auto mt-[20vh]">
            <CardHeader className="flex flex-col items-center">
                <Avatar>
                    <AvatarImage src={user.avatar === "default" ? "/nutrifit-logo.svg" : user.avatar} />
                    <AvatarFallback>
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <CardDescription>Logged in as:</CardDescription>
                <CardTitle>{user.name}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default ProfilePage;