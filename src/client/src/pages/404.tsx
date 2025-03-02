import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-8 mt-16">
            <h3 className="text-5xl text-nutrifit-tertiary">Oops!</h3>
            <div className="flex flex-row items-center gap-8">
                <img src="/nutrifit-logo.svg" className="rounded-[25%]" alt="Nutrifit Logo" />
                <h1 className="text-8xl text-primary">404</h1>
            </div>

            <Card className="max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw]">
                <CardHeader>
                    <CardTitle>Page Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        The page you are looking for does not exist. It might have been moved or deleted.
                    </p>
                </CardContent>
            </Card>

            <Button onClick={() => navigate('/')} className="mt-4">
                Go back to Home
            </Button>
        </div>
    );
};

export default NotFoundPage;
