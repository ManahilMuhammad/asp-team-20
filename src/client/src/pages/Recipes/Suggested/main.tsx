import RecipeCard, { RecipeData } from "@/components/recipe-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const placeholderRecipes: RecipeData[] = [
    {
        name: "Chicken Parmesan",
        icon: "https://www.mamaknowsglutenfree.com/wp-content/uploads/2023/06/gluten-free-chicken-parmesan-rc-1.jpg",
        tags: [
            { label: "Nut Free", color: "red" },
            { label: "Keto", color: "blue" },
        ],
    },
    {
        name: "Avocado Toast",
        icon: "https://veganhuggs.com/wp-content/uploads/2023/02/white-bean-avocado-toast.jpg",
        tags: [
            { label: "Vegan", color: "green" },
            { label: "Gluten-Free", color: "purple" },
        ],
    },
    {
        name: "Salmon Teriyaki",
        icon: "https://rasamalaysia.com/wp-content/uploads/2016/03/salmon-teriyaki-thumb.jpg",
        tags: [
            { label: "High Protein", color: "orange" },
            { label: "Omega-3", color: "blue" },
        ],
    },
    {
        name: "Quinoa Salad",
        icon: "https://www.crowdedkitchen.com/wp-content/uploads/2022/10/Pumpkin-Quinoa-Salad-11.jpg",
        tags: [
            { label: "Vegan", color: "green" },
            { label: "Gluten-Free", color: "purple" },
            { label: "Low Carb", color: "yellow" },
        ],
    },
];

const SuggestedRecipes = () => {

    const [recipes, setSuggestedRecipes] = useState<RecipeData[]>(placeholderRecipes);

    return <div className="px-4 pt-16">
        <h1 className="text-2xl font-medium text-nutrifit-tertiary text-center">Suggested Recipes</h1>
        <h5 className="text-sm font-medium text-nutrifit-tertiary text-center">The following Recipes are suggested based on the ingredients you have available and your dieteray restrictions.</h5>
    
        <ScrollArea className="w-full mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4 max-w-[90vw] mx-auto">

                {
                    recipes.length > 0 && recipes.map((recipe, i) => (
                        <RecipeCard
                            key={i}
                            name={recipe.name}
                            icon={recipe.icon}
                            tags={recipe.tags}
                        />
                    ))
                }

            </div>
        </ScrollArea>
    </div>;
};

export default SuggestedRecipes;
