// import useFetchApi from "@/hooks/use-fetch-api";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface CompleteRecipe {
    id: number;
    userId: number;
    title: string;
    ingredients: string;
    instructions: string;
    createdAt: number;
    updatedAt: number;
}

const RecipeView = () => {
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<CompleteRecipe|null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/recipes/${id}`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    // For some reason it breaks, as the options param is always regenerated
    // const { data, loading, error } = useFetchApi<CompleteRecipe>(`/api/recipes/${id}`, {method: 'GET'}, false);

    return <>

        {
            loading && !error && <div className="mx-auto flex items-center gap-2">
                <Loader2 className="animate-spin" /> Loading Recipe
            </div>
        }

        {
            error && <div className="mx-auto">
                <div className="flex flex-row items-center mb-2 gap-2">
                    <TriangleAlert className="mr-1 text-red-500" size={'2em'}/>
                    <p>An error occured while obtaining the recipe:</p>
                </div>
                <p className="text-red-500 text-center">{error}</p>
            </div>
        }

        {
            data && !loading && <div className="py-12 px-8 flex flex-col gap-6">
                <img
                    src={/* data.icon || */ "https://placehold.co/400"}
                    alt={`An image of ${data.title}`}
                    className="w-[300px] rounded-2xl mx-auto shadow-lg shadow-gray-500"
                />

                <h1 className="text-2xl font-medium text-nutrifit-tertiary text-center">{data.title}</h1>
                {/* <h5 className="text-sm font-medium text-nutrifit-tertiary text-center">{data.description}</h5> */}

                <div className="flex flex-row justify-around">
                    {[
                        { label: "361 cal", color: "yellow" }, 
                        { label: "nut free", color: "red" }
                    ].map(({ color, label }, i) => (
                        <div className="flex flex-col items-center" key={i}>
                            <div 
                                className="w-10 h-10 rounded-full shadow-md" 
                                style={{ backgroundColor: color }} 
                            />
                            <p className="mt-2 text-center">{label}</p>
                        </div>
                    ))}
                </div>


                <div>
                    <h1 className="text-xl font-medium text-nutrifit-tertiary text-left">Ingredients</h1>
                    <p>{ data.ingredients }</p>
                </div>

                <div>
                    <h1 className="text-xl font-medium text-nutrifit-tertiary text-left">Recipe</h1>
                    <p>{ data.instructions }</p>
                </div>
            </div>
        }
    
    </>;
};

export default RecipeView;