import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { RecipeRecap } from "@/pages/Recipes/types";

const RecipeCard: React.FC<RecipeRecap> = ({ id, title, image = null, tags = [] }) => {
    const navigate = useNavigate();
    
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
    </div>;
};

export default RecipeCard;