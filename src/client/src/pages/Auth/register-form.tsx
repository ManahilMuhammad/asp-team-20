import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormProps extends React.ComponentProps<"div"> {
    changeForm: () => void;
}

/* Credit: ShadCN's demo website - https://ui.shadcn.com/blocks#login-04 */
const RegisterForm = ({ changeForm, className, ...props }: FormProps) => {
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
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h2 className="text-2xl font-normal text-secondary">Welcome to</h2>
                                <h1 className="text-4xl font-semibold text-primary">NutrifFit</h1>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-primary">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="John Doe"
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-primary">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@nutrifit.com"
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-primary">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="border-[1.5px] border-solid rounded-3xl"
                                />
                            </div>
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