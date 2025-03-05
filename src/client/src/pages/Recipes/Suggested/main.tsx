import RecipeCard, { RecipeRecapData } from "@/components/recipe-card";
import { ScrollArea } from "@/components/ui/scroll-area";
// import useFetchApi from "@/hooks/use-fetch-api";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const placeholderRecipes: RecipeRecapData[] = [
    {
        id: 1,
        name: "Chicken Parmesan",
        icon: "https://www.mamaknowsglutenfree.com/wp-content/uploads/2023/06/gluten-free-chicken-parmesan-rc-1.jpg",
        tags: ["Keto", "Nut free"],
    },
    {
        id: 2,
        name: "Avocado Toast",
        icon: "https://veganhuggs.com/wp-content/uploads/2023/02/white-bean-avocado-toast.jpg",
        tags: ["Vegan", "Low cal"],
    },
    {
        id: 3,
        name: "Salmon Teriyaki",
        icon: "https://rasamalaysia.com/wp-content/uploads/2016/03/salmon-teriyaki-thumb.jpg",
        tags: ["Pescatarian"],
    },
    {
        id: 4,
        name: "Quinoa Salad",
        icon: "https://www.crowdedkitchen.com/wp-content/uploads/2022/10/Pumpkin-Quinoa-Salad-11.jpg",
        tags: ["Vegan"],
    },
];

const SuggestedRecipes = () => {

    const [recipes, setSuggestedRecipes] = useState<RecipeRecapData[]>([]);

    // const { data, loading, error } = useFetchApi<RecipeRecapData[]>("/api/recipes");
    // const { data, loading, error } = { data: null, loading: false, error: 'No current API endpoint to suggest recipes\nManually set recipe suggestions in ./src/pages/Recipes/Suggested/main.tsx to test the component.' };//useFetchApi<RecipeRecapData[]>("/api/recipes");
    const { data, loading, error } = { data: placeholderRecipes, loading: false, error: false };

    useEffect(() => {
        if (data && !loading && !error) setSuggestedRecipes(data);
    }, [data, loading, error]);

    return <div className="px-4 pt-10">
        <h1 className="text-2xl font-medium text-nutrifit-tertiary text-center">Suggested Recipes</h1>
        <h5 className="text-sm font-medium text-nutrifit-tertiary text-center">The following Recipes are suggested based on the ingredients you have available and your dieteray restrictions.</h5>
    
        <ScrollArea className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[90vw] mx-auto mb-[2em]">

                {
                    loading && !error && <div className="mx-auto flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Loading Recipes
                    </div>
                }

                {
                    error && <div className="mx-auto">
                        <div className="flex flex-row items-center mb-2 gap-2">
                            <TriangleAlert className="mr-1 text-red-500" size={'2em'}/>
                            <p>An error occured while obtaining the suggested recipes:</p>
                        </div>
                        <p className="text-red-500 text-center">{error}</p>
                    </div>
                }

                {
                    recipes.length > 0 && recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
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
