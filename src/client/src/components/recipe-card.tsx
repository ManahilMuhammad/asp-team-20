import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { RecipeRecap } from "@/pages/Recipes/types";
import { Minus } from "lucide-react";
import { toast } from "sonner";

interface RecipeCardProps extends RecipeRecap {
    isSaved?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, title, image = null, tags = [], isSaved = false, }) => {
    const navigate = useNavigate();

    const handleRemoveSaved = async () => {
        if (!isSaved) return;

        try {
            const token = localStorage.getItem("nutrifit-token");
            const response = await fetch('/api/recipes/handlesaved',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ recipeId: id, action: 'remove' })
                }
            );

            const data: { message: string; error?: string; } = await response.json()

            if (!response.ok) {
                console.error('Unable to fullfill remove action', data);
                toast.error(data.message, {
                    description: data.error,
                    dismissible: true,
                    closeButton: true,
                })
                return;
            }

            toast.info('Recipe was removed from your saved list', {
                description: 'Refresh page to update',
                dismissible: true,
                duration: 5000,
            });
        } catch (err: any) { // eslint-disable-line
            toast.error('An error occured when removing from saved', {
                description: err.message,
                dismissible: true,
                duration: 10000,
            })
        }
    }
    
    return <div className="mx-auto flex flex-col items-center">
        
        <div className="w-[265px] flex justify-evenly">
            {tags.map(({ label /* , colour  */}, index) => (
            <span
                key={index}
                className="text-white px-3 py-1 rounded-t-lg text-sm font-medium"
                // style={{ backgroundColor: tag.color }}
            >
                {label}
            </span>
            ))}
        </div>

        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="w-[285px] bg-[#7BAE20] hover:bg-[#5d9200] rounded-t-xl rounded-b-none text-white text-center text-xl font-light hover:underline pt-2 mx-auto"
                    onClick={() => navigate(`/recipes/view/${id}`)}
                >
                    { title }
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={-100}>
                <p>Click to view the recipe</p>
            </TooltipContent>
        </Tooltip>
        
        <img
            src={image || "https://placehold.co/400"}
            alt={`An image of ${title}`}
            className="w-[300px] rounded-2xl mx-auto shadow-lg shadow-gray-500"
        />

        {
            isSaved && (
                <Button
                    className="bg-[#DF3434] hover:bg-[#951515] [&_svg]:size-8 h-[3em] w-[4.5em] px-[1.5em] py-[0.5em] rounded-[1em] -translate-y-1/2 shadow-md shadow-slate-800"
                    onClick={handleRemoveSaved}
                >
                    <Minus strokeWidth={3} />
                </Button>
            )
        }
    </div>;
};

export default RecipeCard;