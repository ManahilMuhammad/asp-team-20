import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchRecipes = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<{id: number; name: string; color?: string; icon?: string;}[]>([]);

    const handleSearch = async () => {
        console.log('Handle Search pressed current laoding state:', loading, "searching for:", searchValue);
        setLoading(!loading);
        setResults([
            { id: 1, name: "Chicken Parmesan", color: undefined, icon: undefined }
        ]);

        /* 
        
            To Do:
            - implement fetch method to get recipes from bakcend

        */
    }

    return (
        <div className="px-8 pt-12">
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

            <div className="mt-[2em]">{/* Search Results */}
                {
                    results.map(({ id, icon = "https://placehold.co/50", name, color = "#9494d8" }, i) => (
                        <Button
                            key={i}
                            className={`rounded-full flex items-center px-4 py-2 space-x-2`}
                            style={{ backgroundColor: color }}
                            onClick={() => navigate(`/recipes/view/${id}`)}
                        >
                            <img src={icon} className="w-8 h-8 rounded-full" alt="result icon" />
                            <p className="flex-grow text-center">{name} - {color}</p>
                            <ArrowRight className="text-white w-5 h-5" />
                        </Button>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchRecipes;
