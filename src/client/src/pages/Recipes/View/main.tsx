// import useFetchApi from "@/hooks/use-fetch-api";
import { Separator } from "@/components/ui/separator";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompleteRecipe } from "../types";

const RecipeView = () => {
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CompleteRecipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) return;

            if (data) return; // Avoid multiple calls if recipe is already loaded

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
    }, [id, data]);

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
                    src={ data.image || "/nutrifit-logo.svg"}
                    alt={`An image of ${data.title}`}
                    className="w-[300px] rounded-2xl mx-auto shadow-lg shadow-gray-500"
                />

                <h1 className="text-2xl font-medium text-nutrifit-tertiary text-center">{data.title}</h1>
                <h5 className="text-sm font-medium text-nutrifit-tertiary text-center">{data.description}</h5>

                <p className="text-primary text-center">{data.introduction}</p>

                <div className="flex flex-row justify-around">
                    {data.tags.map(({ colour, label }, i) => (
                        <div className="flex flex-col items-center" key={i}>
                            <div 
                                className="w-10 h-10 rounded-full shadow-md" 
                                style={{ backgroundColor: colour }} 
                            />
                            <p className="mt-2 text-center">{label}</p>
                        </div>
                    ))}
                </div>

                <h1 className="text-3xl font-medium text-nutrifit-tertiary">Recipe</h1>

                <div>
                    <h1 className="text-xl font-medium text-nutrifit-tertiary text-left mb-2">Ingredients</h1>
                    <Separator className="mb-4" />
                    <div className="flex flex-row flex-wrap justify-center">
                        {data.ingredients.map(({ name, type, quantity, notes }, i) => (
                        <div key={i} className="flex flex-col p-2 w-full md:w-[50%] lg:w-[30%]">
                            <span className="font-semibold text-lg text-primary">{name}</span>
                            <span className="text-sm text-muted-foreground">Type: {type}</span>
                            <span className="text-sm">Quantity: {quantity.amount} {quantity.measurement}</span>
                            {notes && <span className="text-xs text-gray-500 italic">{notes}</span>}
                        </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-medium text-nutrifit-tertiary text-left mb-2">Recipe</h1>
                    <Separator className="mb-4" />
                    <ol className="space-y-4 list-decimal list-outside pl-6">
                        {data.instructions.map(({ text, image }, i) => (
                        <li key={i} className="p-2">
                            {text && <p className="text-base text-muted-foreground">{text}</p>}
                            {image && <img src={image} alt={`Step ${i + 1}`} className="mt-2 rounded-lg w-full md:w-[60%] lg:w-[45%] mx-auto" />}
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        }
    
    </>;
};

export default RecipeView;