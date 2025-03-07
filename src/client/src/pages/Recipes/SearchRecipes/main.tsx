import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeRecap } from "../types";

const recipeBackgroundColors: string[] = [
    "#FD8E17",
    "#129B94",
    "#DF3434",
    "#FD8E17",
];

const SearchRecipes = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<RecipeRecap[]>([]);

    /* 
        To Do:
        - too short query text
        - error display when searching
        - no results message
    */

    const handleSearch = async () => {
        console.log('Handle Search pressed current laoding state:', loading, "searching for:", searchValue);
        setLoading(!loading);

        try {
            const response = await fetch(`/api/recipes/search/${encodeURI(searchValue)}`);

            if (!response.ok) return setResults([]);

            const data = await response.json() as RecipeRecap[];

            if (data) setResults(data);

            setLoading(false);
        } catch (err: any) { // eslint-disable-line
            console.error('Unable to search for recipe:', searchValue, err);
        }
    }

    return (
        <div className="px-8 pt-12 md:px-[10vw] lg:px-[18vw]">
            <div>
                <h1 className="text-3xl font-medium text-nutrifit-tertiary text-left">Recipe Search</h1>
                <div className="relative  items-center h-[3em] mt-2">
                    <Input
                        className="w-full border-nutrifit-tertiary border-2 rounded-full flex rounded-full h-[3.3em] pr-[3.5em] p-none"
                        placeholder="Recipe Name"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[3.2em] h-[3em] rounded-full bg-[#05514D80] border-0 focus:bg-[#05514D80]"
                        onClick={handleSearch}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin text-nutrifit-tertiary dark:text-white" />
                        ) : (
                            <Search className="text-nutrifit-tertiary dark:text-white" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="mt-[2em] flex flex-row gap-2 lg:gap-6 flex-wrap">{/* Search Results */}
                {
                    results.map(({ id, image = "https://placehold.co/50", title }, i) => (
                        <Button
                            key={i}
                            className={
                                `rounded-full flex items-center px-4 py-2 space-x-2 sm:mx-auto w-full md:w-[80%] lg:w-[45%]`
                            }
                            style={{ backgroundColor: recipeBackgroundColors[i % recipeBackgroundColors.length] }}
                            onClick={() => navigate(`/recipes/view/${id}`)}
                        >
                            <img src={image} className="w-8 h-8 rounded-full" alt="result icon" />
                            <p className="flex-grow text-center">{title}</p>
                            <ArrowRight className="text-white w-5 h-5" />
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchRecipes;
