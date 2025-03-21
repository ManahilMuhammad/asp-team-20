import { User } from "@/components/auth/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatProfileImgUrl } from "@/lib/utils";
import { ChevronRight, Circle, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfilePageNames } from "../types";

const ProfilePageIndex: React.FC<{ user: User, setPage: (page: ProfilePageNames) => void }> = ({ user, setPage }) => {

    const navigate = useNavigate();
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

            <div className="mb-[10vh]">
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
                                className="text-white flex items-center justify-center rounded-full inset-shadow-sm inset-shadow-indigo-500"
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

            <div className="mx-auto w-[75vw] md:w-[55vw] lg:w-[35vw] flex flex-col gap-4 justify-start h-screen">
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#FD8E17] py-6"
                    onClick={() => navigate('/recipes/saved')}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Saved Recipes</span>
                    </div>
                    <ChevronRight />
                </Button>
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#129B94] py-6"
                    onClick={() => navigate('/recipes/suggestions')}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Suggested Recipes</span>
                    </div>
                    <ChevronRight />
                </Button>
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#DF3434] py-6"
                    onClick={() => navigate('/planner')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Meal Planner</span>
                    </div>
                    <ChevronRight />
                </Button>
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#7BAE20] py-6"
                    onClick={() => navigate('/recipes/search')}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Recipe Search</span>
                    </div>
                    <ChevronRight />
                </Button>
            </div>

            <div className="fixed bottom-[1em] left-1/2 -translate-x-1/2 z-[2000]">
                <Button
                    className="rounded-full w-[4em] h-[4em] p-[0.4em] bg-[#FFAF01] hover:bg-[#c98a02] dark:hover:bg-[#ffd06b] shadow-xl border-4 border-background"
                    onClick={() => {
                        setPage('settings');
                    }}
                    asChild
                >
                    <Settings strokeWidth={1} size={48} color="#424242" />
                </Button>
            </div>
        </div>
    )
}

export default ProfilePageIndex;