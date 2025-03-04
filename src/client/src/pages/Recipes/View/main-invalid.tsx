import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvalidRecipeView = () => {
    const navigate = useNavigate();

    const [recipeId, setRecipeID] = useState<string>();

    const navigateToRecipe = () => {
        if (!recipeId?.trim()) return;
        navigate(`/recipes/view/${recipeId}`);
    }

    return (
        <div className="flex flex-col items-center gap-8 mt-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                <img src="/nutrifit-logo.svg" className="rounded-[25%]" alt="Nutrifit Logo" />
                <h1 className="text-4xl md:text-6xl text-primary">Invalid</h1>
            </div>

            <Card className="max-w-[90vw] md:max-w-[60vw] lg:max-w-[45vw] p-2">
                <CardHeader>
                    <CardTitle>Recipe Viewing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        This page is not valid, it requires a recipe ID to be specified in the path.
                    </p>
                    <Separator />
                    <p>
                        If you know the recipe ID, please enter it below and we'll redirect you:
                    </p>
                    <div className="flex items-end justify-center gap-3">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="recipe-id" className="text-muted-foreground">Recipe ID:</Label>
                            <Input id="recipe-id" placeholder="Enter ID" type="number" className="w-[20em]" value={recipeId} onChange={(e) => setRecipeID(e.target.value)}/>
                        </div>
                        <Button className="self-end" onClick={navigateToRecipe}>Navigate</Button>
                    </div>
                    <Separator />
                    <p>
                        If you don't know the ID and are willing to search for a recipe, you can return to the Search page:
                    </p>
                    <div className="flex justify-center">
                        <Button onClick={() => navigate(`/recipes/search`)}>
                            <Search /> Go to Search Engine
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
};

export default InvalidRecipeView;