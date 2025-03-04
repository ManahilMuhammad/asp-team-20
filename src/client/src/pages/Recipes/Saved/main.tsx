/* Attention to the parent folder, calling it "Search" somehow breaks it */

import RecipeCard, { RecipeRecapData } from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

// Debug placeholders
const placeholderTags: {name: string; color?: string;}[] = [
    { name: "All", color: "#7bae20" },
    { name: "Keto", color: "#d13434" },
    { name: "Vegan", color: "#1f9391" },
    { name: "Pescatarian", color: "#fd8e17" },
];

// Debug placeholder recipes
// const placeholderRecipes: RecipeRecapData[] = [
//     {
//         id: 1,
//         name: "Chicken Parmesan",
//         icon: "https://www.mamaknowsglutenfree.com/wp-content/uploads/2023/06/gluten-free-chicken-parmesan-rc-1.jpg",
//         tags: ["Keto", "Nut free"],
//     },
//     {
//         id: 2,
//         name: "Avocado Toast",
//         icon: "https://veganhuggs.com/wp-content/uploads/2023/02/white-bean-avocado-toast.jpg",
//         tags: ["Vegan", "Low cal"],
//     },
//     {
//         id: 3,
//         name: "Salmon Teriyaki",
//         icon: "https://rasamalaysia.com/wp-content/uploads/2016/03/salmon-teriyaki-thumb.jpg",
//         tags: ["Pescatarian"],
//     },
//     {
//         id: 4,
//         name: "Quinoa Salad",
//         icon: "https://www.crowdedkitchen.com/wp-content/uploads/2022/10/Pumpkin-Quinoa-Salad-11.jpg",
//         tags: ["Vegan"],
//     },
// ];

const SavedRecipes = () => {

    const [selectedTag, setSelectedTag] = useState<string>('All');
    const [savedRecipes, setSavedRecipes] = useState<RecipeRecapData[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeRecapData[]>([]);

    /* 
    
        ToDo:
        - Create a fetch request to obtain the users saved recipes from the server 

    */

    useEffect(() => {
        setSavedRecipes([]);
    }, []);

    useEffect(() => {
        setFilteredRecipes(
            savedRecipes.filter(
                (recipe) => selectedTag === "All" || recipe.tags.includes(selectedTag)
            )
        );
    }, [savedRecipes, selectedTag]);

    return (
        <div className="px-8 pt-12 md:px-[10vw] lg:px-[18vw]">
            <h1 className="text-3xl font-medium text-nutrifit-tertiary text-left">Saved Recipes</h1>

            <div className="border-b-[1.5px] border-teal-600 flex flex-row gap-4 justify-center mt-1">
                {
                    placeholderTags.map(({name, color}) => (
                        <Button
                            className={`rounded-t-md rounded-b-none p-2 ${selectedTag === name ? "h-8 mt-0" : "h-6 mt-2"} transition-discrete`}
                            style={{ backgroundColor: (color || "#7bae20") }}
                            onClick={() => setSelectedTag(selectedTag === name ? 'All' : name)}
                        >
                            { name }
                        </Button>
                    ))
                }
            </div>

            {/* 
            
            Todo:
            - Reduce the height of the image
            - Add a delete icon
            
            */}
            <div className="mt-8 max-h-[80vh]">
                {
                    filteredRecipes.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4 max-w-[90vw] mx-">{
                        filteredRecipes.map(({ id, name, icon }) => (
                            <RecipeCard key={id} id={id} name={name} icon={icon} tags={[]} />
                        )) 
                    }</div> :

                    <div className="flex items-center justify-center gap-2 py-2">
                        <Info className=" animate-bounce" />
                        <p>No saved Recipes</p>
                    </div>
                }
                
            </div>
        </div>
    )
};

export default SavedRecipes;
