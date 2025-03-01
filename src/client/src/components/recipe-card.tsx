import React from "react";

export interface RecipeData {
    name: string;
    icon?: string;
    tags: { label: string; color: string; }[];
}

const RecipeCard: React.FC<RecipeData> = ({ name, icon = null, tags }) => {
    return <div className="mx-auto flex flex-col items-center">
        
        <div className="w-[265px] flex justify-evenly">
            {tags.map((tag, index) => (
            <span
                key={index}
                className="text-white px-3 py-1 rounded-t-lg text-sm font-medium"
                style={{ backgroundColor: tag.color }}
            >
                {tag.label}
            </span>
            ))}
        </div>

        <div className="w-[285px] bg-[#7BAE20] rounded-t-xl text-white text-center text-xl font-light pt-2 mx-auto">
            {name}
        </div>
        
        <img
            src={icon || "https://placehold.co/400"}
            alt={`An image of ${name}`}
            className="w-[300px] rounded-2xl mx-auto shadow-lg shadow-gray-500"
        />
    </div>;
};

export default RecipeCard;