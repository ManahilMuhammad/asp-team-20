import RecipeCard, { RecipeData } from "@/components/recipe-card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import useFetchWithAuth from "@/hooks/use-fetch-api";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

// const placeholderRecipes: RecipeData[] = [
//     {
//         name: "Chicken Parmesan",
//         icon: "https://www.mamaknowsglutenfree.com/wp-content/uploads/2023/06/gluten-free-chicken-parmesan-rc-1.jpg",
//         tags: [
//             { label: "Nut Free", color: "red" },
//             { label: "Keto", color: "blue" },
//         ],
//     },
//     {
//         name: "Avocado Toast",
//         icon: "https://veganhuggs.com/wp-content/uploads/2023/02/white-bean-avocado-toast.jpg",
//         tags: [
//             { label: "Vegan", color: "green" },
//             { label: "Gluten-Free", color: "purple" },
//         ],
//     },
//     {
//         name: "Salmon Teriyaki",
//         icon: "https://rasamalaysia.com/wp-content/uploads/2016/03/salmon-teriyaki-thumb.jpg",
//         tags: [
//             { label: "High Protein", color: "orange" },
//             { label: "Omega-3", color: "blue" },
//         ],
//     },
//     {
//         name: "Quinoa Salad",
//         icon: "https://www.crowdedkitchen.com/wp-content/uploads/2022/10/Pumpkin-Quinoa-Salad-11.jpg",
//         tags: [
//             { label: "Vegan", color: "green" },
//             { label: "Gluten-Free", color: "purple" },
//             { label: "Low Carb", color: "yellow" },
//         ],
//     },
// ];

const SuggestedRecipes = () => {

    const [recipes, setSuggestedRecipes] = useState<RecipeData[]>([]);

    const { data, loading, error } = { data: null, loading: false, error: 'No current API endpoint to suggest recipes\nManually set recipe suggestions in ./src/pages/Recipes/Suggested/main.tsx to test the component.' };//useFetchWithAuth<RecipeData[]>("/api/recipes");

    useEffect(() => {
        if (data && !loading && !error) setSuggestedRecipes(data);
    }, [data, loading, error]);

    return <div className="px-4 pt-16">
        <h1 className="text-2xl font-medium text-nutrifit-tertiary text-center">Suggested Recipes</h1>
        <h5 className="text-sm font-medium text-nutrifit-tertiary text-center">The following Recipes are suggested based on the ingredients you have available and your dieteray restrictions.</h5>
    
        <ScrollArea className="w-full mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-4 max-w-[90vw] mx-auto">

                {
                    loading && !error && <div className="mx-auto flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Loading Recipes
                    </div>
                }

                {
                    error && <div className="mx-auto text-center">
                        <p className="flex items-center mb-2">
                            <TriangleAlert className="mr-2 text-red-500"/> An error occured while obtaining the suggested recipes:
                        </p>
                        <span className="text-red-500">{error}</span>
                    </div>
                }

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
