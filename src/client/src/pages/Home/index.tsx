import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return <>
        <div className="flex flex-col items-center gap-8 mt-16">
            <h3 className="text-5xl text-nutrifit-tertiary">Welcome to</h3>
            <div className="flex flex-row items-center gap-8">
                <img src="/nutrifit-logo.svg" className="rounded-[25%]" />
                <h1 className="text-8xl text-primary">Nutrifit</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>What is Nutrift ?</CardTitle>
                </CardHeader>
                <CardContent className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
                    Nutrifit is a web based application to help you track you fitness and find the best meals suited for you.
                    Based on your nutritional needs, available ingredients and specific diet plans it'll suggest the most adapted meals for you while also allowing you to prepare and plan your future meals. 
                </CardContent>
            </Card>

            <Button onClick={() => {navigate('/auth')}}>
                Log In / Register
            </Button>
        </div>
    </>
}

export default HomePage;