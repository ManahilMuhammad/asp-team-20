/* Attention to the parent folder, calling it "Search" somehow breaks it */

import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { RecipeTags, RecipeRecap } from "../types";

const baseTag: RecipeTags = { label: "All", colour: "#7bae20" };

const SavedRecipes = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [tags, setTags] = useState<RecipeTags[]>([baseTag])

    const [selectedTag, setSelectedTag] = useState<string>('All');
    const [savedRecipes, setSavedRecipes] = useState<RecipeRecap[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeRecap[]>([]);

    useEffect(() => {
        const retrieveSavedRecipes = async () => {
            setLoading(true);
    
            try {
                const token = localStorage.getItem("nutrifit-token");
                const response = await fetch(`/api/recipes/saved`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (!response.ok) return setSavedRecipes([]);
    
                const data = await response.json() as RecipeRecap[];
    
                if (data) setSavedRecipes(data);

                setTags([
                    baseTag,
                    ...data.flatMap(recipe => recipe.tags)
                ]);
    
                setLoading(false);
            } catch (err: any) { // eslint-disable-line
                console.error('Unable to retrieve saved recipes:', err);
            }
        }
        retrieveSavedRecipes();
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
                    tags.map(({label, colour}, index) => (
                        <Button
                            key={index}
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
                        {
                            loading ? 
                            <p>No saved Recipes</p> :
                            <p>Retrieving saved Recipes</p>
                        }
                    </div>
                }
                
            </div>
        </div>
    )
};

export default SavedRecipes;
