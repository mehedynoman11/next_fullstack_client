'use client'
import GoogleButton from "@/components/GoogleButton"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

const SignUpPage = () => {
    const router = useRouter();
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValue = new FormData(e.currentTarget);
        const user = Object.fromEntries(formValue.entries()) as {
            name: string
            image: string
            email: string
            password: string
        }
        const { data, error } = await authClient.signUp.email({
            ...user,
        })
        if (data) {
            toast.success("Sign in successful!");
            console.log(data)
            // router.push('/');
        }
        if (error) {
            toast.error("Sign in failed: " + error.message);
            console.log(error);
        }
    }

    return (
        // ✅ `dark` class activates dark tokens; bg-background = dark bg
        <div className="dark min-h-svh bg-background text-foreground">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Card className="border-border bg-card text-card-foreground shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl text-foreground">
                                Sign Up Form
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignUp}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            id="name"
                                            type="name"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </Field>
                                     <Field>
                                        <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            placeholder="https://example.com/profile.jpg"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="*********"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button type="submit" className="w-full">
                                            Sign Up
                                        </Button>
                                        <FieldDescription className="text-center">
                                            Already have an account?{' '}
                                            <a href="/signin" className="text-primary hover:underline">
                                                Sign in
                                            </a>
                                        </FieldDescription>
                                    </Field>
                                    <Field>
                                        <GoogleButton />
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                        and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage