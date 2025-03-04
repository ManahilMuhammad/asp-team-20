import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { HomeIcon } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const RecipePage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    return <>
        <Outlet />
        <div className="absolute bottom-[1em] left-1/2 -translate-x-1/2 z-[1000]">
            <Button
                className="rounded-full w-[3em] h-[3em] p-[0.4em] bg-[#FFAF01] hover:bg-[#c98a02] dark:hover:bg-[#ffd06b] shadow-xl"
                onClick={() => {
                    navigate(
                        isAuthenticated() ? 
                            '/profile' :
                            '/'
                        );
                }}
                asChild
            >
                <HomeIcon strokeWidth={1} size={48} className="text-[#424242]" />
            </Button>
        </div>
    </>;
};

export default RecipePage;
