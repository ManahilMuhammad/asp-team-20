import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

interface FormProps extends React.ComponentProps<"div"> {
    changeForm: () => void;
}

/* Credit: ShadCN's demo website - https://ui.shadcn.com/blocks#login-04 */
const RegisterForm = ({ changeForm, className, ...props }: FormProps) => {
    const { login } = useAuth()
    const [formError, setError] = useState<{global?: string, password?: string}>({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, password } = formData;

        if (password.length < 6) return setError({...formError, password: 'Password is not long enough'});

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                login(email, password, true);
                console.log("Registration successful");
            } else {
                // Handle registration error
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                setError({...formError, global: (errorData as any)?.error || 'Unkown error'}); // eslint-disable-line
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError({...formError, global: (error as any)?.message || 'Unkown error'}); // eslint-disable-line
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden border-transparent md:border-primary">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://placehold.co/400"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-center text-center mb-8">
                                <h2 className="text-3xl font-normal text-secondary">Welcome to</h2>
                                <h1 className="text-5xl font-semibold text-primary">NutrifFit</h1>
                            </div>
                            <div className="grid gap-2 mb-4">
                                <Label htmlFor="name" className="text-primary">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
                            <div className="grid gap-2 mb-4">
                                <Label htmlFor="email" className="text-primary">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@nutrifit.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-primary">Password</Label>
                                    <Label className="text-red-600 text-right italic text-sm">{formError?.password || null}</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
                            <p className="text-red-600 text-center italic min-h-4">{formError?.global || null}</p>
                            <Button type="submit" className="w-fit px-[2em] rounded-3xl mx-auto">
                                Sign Up
                            </Button>
                            <div className="text-center text-sm">
                                Have an account?{" "}
                                <a className="underline underline-offset-4 cursor-pointer hover:underline-offset-2 hover:text-primary" onClick={changeForm}>
                                    Login
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground hover:[&_a]:text-secondary hover:[&_a]:underline">
                By signing up you agree to our <a href="#">Terms of Service</a>{" "}
                and our <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default RegisterForm;