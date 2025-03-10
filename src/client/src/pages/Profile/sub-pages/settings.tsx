import { User } from "@/components/auth/auth-context";
import { ProfilePageNames } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatProfileImgUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Circle, Trash2, HomeIcon, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const ProfilePageSettings: React.FC<{ user: User, setPage: (page: ProfilePageNames) => void }> = ({ user, setPage }) => {

    const navigate = useNavigate();
    const { logout } = useAuth();

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
        <div className="w-screen h-screen overflow-hidden space-y-6">
            <div className="space-y-2">
                <Avatar className="mt-6 mx-auto h-[12vh] w-[12vh]">
                    <AvatarImage src={formatProfileImgUrl(user.avatar)} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <p className="text-center">{user.name}</p>
            </div>

            <div className="mx-auto w-[75vw] flex flex-col gap-4 justify-start h-screen">
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#FD8E17] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Saved Recipes</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#129B94] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Linked Apps</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#DF3434] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Dietary Restrictions</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#7BAE20] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>App Permissions</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#FD8E17] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Security</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#129B94] py-6"
                    onClick={() => navigate('/profile')}
                    disabled
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Circle />
                        <span>Privacy Policy</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#DF3434] py-6"
                    onClick={() => logout()}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <LogOut />
                        <span>Log Out</span>
                    </div>
                    <ChevronRight />
                </Button>
                
                <Button
                    className="w-full rounded-full flex flex-row justify-between shadow-lg shadow-slate-400 bg-[#7BAE20] py-6"
                    onClick={() => alert('This action is irreversible !')}
                >
                    <div className="flex items-center gap-2 text-lg">
                        <Trash2 />
                        <span>Delete Account</span>
                    </div>
                    <ChevronRight />
                </Button>
            </div>

            <div className="fixed bottom-[1em] left-1/2 -translate-x-1/2 z-[2000]">
                <Button
                    className="rounded-full w-[4em] h-[4em] p-[0.4em] bg-[#FFAF01] hover:bg-[#c98a02] dark:hover:bg-[#ffd06b] shadow-xl border-4 border-background"
                    onClick={() => {
                        setPage('index');
                    }}
                    asChild
                >
                    <HomeIcon strokeWidth={1} size={48} color="#424242" />
                </Button>
            </div>
        </div>
    )
};

export default ProfilePageSettings;