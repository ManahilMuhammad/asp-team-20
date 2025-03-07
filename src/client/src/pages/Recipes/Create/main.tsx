import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, Construction, Drill } from "lucide-react";

const CreateRecipe = () => {
    return (
        <div className="flex flex-col items-center gap-8 mt-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                <img src="/nutrifit-logo.svg" className="rounded-[25%]" alt="Nutrifit Logo" />
                <h1 className="text-4xl md:text-6xl text-nutrifit-tertiary">Under Construction</h1>
            </div>

            <Card className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] border-nutrifit-tertiary">
                <CardHeader>
                    <CardTitle>Recipe Creation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        This section is still under development, please follow our social media to obtain more information on it's progress and release date.
                    </p>
                    <div className="flex flex-row items-center justify-center gap-4 mt-8">
                        <Construction size={48} />
                        <Cog size={48} className="animate-spin" />
                        <Drill size={48} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateRecipe;
