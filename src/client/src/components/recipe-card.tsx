import React from "react";

interface RecipeCardProps {
    name: string;
    icon?: string;
    tags: { label: string; color: string; }[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, icon = null, tags }) => {
    return <div className="w-[65vw] mx-auto flex flex-col items-center">
        
        <div className="w-full flex justify-evenly">
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

        <div className="w-[55vw] bg-[#7BAE20] rounded-t-xl text-white text-center text-xl font-light pt-2 mx-auto">
            {name}
        </div>
        
        <img
            src={icon || "https://placehold.co/400"}
            alt={`An image of ${name}`}
            className="w-[65vw] rounded-2xl mx-auto shadow-lg shadow-gray-500"
        />
    </div>;
};

export default RecipeCard;