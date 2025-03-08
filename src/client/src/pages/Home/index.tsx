import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    return <>
        <div className="flex flex-col items-center gap-8 mt-16">
            <h3 className="text-3xl md:text-5xl text-nutrifit-tertiary">Welcome to</h3>
            <div className="flex flex-row items-center gap-8">
                <img src="/nutrifit-logo.svg" className="rounded-[25%]" />
                <h1 className="text-6xl md:text-8xl text-primary">Nutrifit</h1>
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

            {
                /* If null then the background checks haven't checked if auth'ed or not, show loading button */
                isAuthenticated() === null ? 
                <Button onClick={() => {}} disabled>
                    <Loader2 className="animate-spin"/>
                </Button> :

                /* If authenticated show navigate to profile page */
                isAuthenticated() ?
                <Button onClick={() => {navigate('/profile')}}>
                    Go to your Profile
                </Button> :
                
                /* If NOT authenticated show navigate to login/register page */
                <Button onClick={() => {navigate('/auth')}} disabled={isAuthenticated() === null}>
                    Log In / Register
                </Button>
            }
        </div>
    </>
}

export default HomePage;