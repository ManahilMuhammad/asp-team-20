/* Attention to the parent folder, calling it "Search" somehow breaks it */

import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { RecipeTags, RecipeRecap } from "../types";

// Debug placeholders
const placeholderTags: RecipeTags[] = [
    { label: "All", colour: "#7bae20" },
    { label: "Keto", colour: "#d13434" },
    { label: "Vegan", colour: "#1f9391" },
    { label: "Pescatarian", colour: "#fd8e17" },
];

// Debug placeholder recipes
// const placeholderRecipes: RecipeRecap[] = [
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
    const [savedRecipes, setSavedRecipes] = useState<RecipeRecap[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeRecap[]>([]);

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
                (recipe) => selectedTag === "All" || (recipe.tags && recipe.tags.map((e => e.label)).includes(selectedTag))
            )
        );
    }, [savedRecipes, selectedTag]);

    return (
        <div className="px-8 pt-12 md:px-[10vw] lg:px-[18vw]">
            <h1 className="text-3xl font-medium text-nutrifit-tertiary text-left">Saved Recipes</h1>

            <div className="border-b-[1.5px] border-teal-600 flex flex-row gap-4 justify-center mt-1">
                {
                    placeholderTags.map(({label, colour}) => (
                        <Button
                            className={`rounded-t-md rounded-b-none p-2 ${selectedTag === label ? "h-8 mt-0" : "h-6 mt-2"} transition-discrete`}
                            style={{ backgroundColor: (colour || "#7bae20") }}
                            onClick={() => setSelectedTag(selectedTag === label ? 'All' : label)}
                        >
                            { label }
                        </Button>
                    ))
                }
            </div>

            {/* 
            
            Todo:
            - Reduce the height of the image
            - Add a delete icon
            
            */}
            <div className="mt-2">
                {
                    filteredRecipes.length > 0 ?
                    <ScrollArea className="max-h-[84vh] overflow-auto scrollbar-thin">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-4 max-w-[90vw] pb-[2em]">{
                            filteredRecipes.map(({ id, title, image }) => (
                                <RecipeCard key={id} id={id} title={title} image={image} tags={[]} />
                            )) 
                        }</div>
                    </ScrollArea> :

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
