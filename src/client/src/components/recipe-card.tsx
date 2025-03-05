import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export interface RecipeRecapData {
    id: number;
    name: string;
    icon?: string;
    tags: string[];
}

const RecipeCard: React.FC<RecipeRecapData> = ({ id, name, icon = null, tags }) => {
    const navigate = useNavigate();
    
    return <div className="mx-auto flex flex-col items-center">
        
        <div className="w-[265px] flex justify-evenly">
            {tags.map((tag, index) => (
            <span
                key={index}
                className="text-white px-3 py-1 rounded-t-lg text-sm font-medium"
                // style={{ backgroundColor: tag.color }}
            >
                {tag}
            </span>
            ))}
        </div>

        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="w-[285px] bg-[#7BAE20] hover:bg-[#5d9200] rounded-t-xl rounded-b-none text-white text-center text-xl font-light hover:underline pt-2 mx-auto"
                    onClick={() => navigate(`/recipes/view/${id}`)}
                >
                    { name }
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={-100}>
                <p>Click to view the recipe</p>
            </TooltipContent>
        </Tooltip>
        
        <img
            src={icon || "https://placehold.co/400"}
            alt={`An image of ${name}`}
            className="w-[300px] rounded-2xl mx-auto shadow-lg shadow-gray-500"
        />
    </div>;
};

export default RecipeCard;