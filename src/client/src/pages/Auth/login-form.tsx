import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

interface LoginFormProps extends React.ComponentProps<"div"> {
    changeForm: () => void;
}

/* Credit: ShadCN's demo website - https://ui.shadcn.com/blocks#login-04 */
const LoginForm = ({ changeForm, className, ...props }: LoginFormProps) => {
    const { login } = useAuth()
    const [error, setError] = useState<null|string>(null);
    const [formData, setFormData] = useState({
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

        const { email, password } = formData;

        login(email, password)
        .then(r => {
            console.log('Logged in', r);
        })
        .catch((err: Error) => {
            setError(err?.message || 'Unable to login'); // eslint-disable-line
            console.error('Unable to log in:', err.message);
        })
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden border-transparent md:border-primary">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col items-center text-center mb-12">
                                <h2 className="text-3xl font-normal text-secondary">Welcome back to</h2>
                                <h1 className="text-5xl font-semibold text-primary">NutrifFit</h1>
                            </div>
                            <div className="grid gap-2 mb-4">
                                <Label htmlFor="email" className="text-primary">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@nutrifit.com"
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2 mb-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-primary">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                    onChange={handleChange}
                                />
                            </div>
                            <p className="text-red-600 text-center italic mb-2 min-h-4">{error}</p>
                            <Button type="submit" className="w-fit px-[2em] rounded-3xl mx-auto mb-4">
                                Login
                            </Button>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a className="underline underline-offset-4 cursor-pointer hover:underline-offset-2 hover:text-primary" onClick={changeForm}>
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="https://placehold.co/400"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground hover:[&_a]:text-secondary hover:[&_a]:underline">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default LoginForm;