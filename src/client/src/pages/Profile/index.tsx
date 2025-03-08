import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { formatProfileImgUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {

    const { user } = useAuth();
    const day = new Date();

    const getInitials = (name: string): string => {
        if (!name) return "NF";
      
        const words = name.trim().split(/\s+/);
        const initials = words
          .slice(0, 2)
          .map(word => word[0]?.toUpperCase())
          .join("");
      
        return initials;
      };

    if (!user) return <Card className="w-[80vw] md:w-[60vw] lg:w-[50vw] mx-auto mt-[20vh]">
        <CardHeader className="text-center">
            <CardTitle>Loading Data</CardTitle>
            <Loader2 className="animate-spin mx-auto" size={48} />
        </CardHeader>
    </Card>;

    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="flex justify-between items-center mx-6 mt-8 max-h-[8vh]">
                <div>
                    <span className="text-2xl font-normal text-nutrifit-tertiary">Nutri</span>
                    <span className="text-2xl font-normal text-primary">Fit</span>
                </div>

                <div>
                    <Avatar className="h-[8vh] w-[8vh]">
                        <AvatarImage src={formatProfileImgUrl(user.avatar)} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div>
                <p className="text-nutrifit-tertiary text-center text-lg">Today</p>

                <div className="flex justify-center items-center gap-2 mt-4">
                    {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
                        day.setDate(day.getDate() + offset);
                        
                        const bgColor = offset < 0 ? "#CF4238" : offset > 0 ? "#7BAE20" : "#EC800B";
                        const brightness = 1 + Math.abs(offset) * 0.08;
                        const size = `${40 - Math.abs(offset) * 4}px`;
                        const fontSize = `${18 - Math.abs(offset) * 2}px`;

                        return (
                            <div
                                key={offset}
                                className="text-white flex items-center justify-center rounded-full"
                                style={{
                                    backgroundColor: bgColor,
                                    filter: `brightness(${brightness})`,
                                    width: size,
                                    height: size,
                                    fontSize
                                }}
                            >
                                {String(day.getDate()).padStart(2, '0')}
                            </div>
                        );
                    })}
                </div>
                <p className="text-nutrifit-tertiary text-center text-sm mt-1">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
            </div>
        </div>
    )
}

export default ProfilePage;