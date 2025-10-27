import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Card className="w-full max-w-md mx-auto border border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Update Password</CardTitle>
                    <CardDescription>
                        Ensure your account is using a long, random password to stay secure.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={updatePassword}>
                    <CardContent className="space-y-5">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Label htmlFor="current_password">Current Password</Label>
                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                type="password"
                                value={data.current_password}
                                onChange={(e) => setData("current_password", e.target.value)}
                                autoComplete="current-password"
                                placeholder="Enter current password"
                            />
                            {errors.current_password && (
                                <Alert variant="destructive">
                                    <AlertDescription>{errors.current_password}</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                ref={passwordInput}
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                autoComplete="new-password"
                                placeholder="Enter new password"
                            />
                            {errors.password && (
                                <Alert variant="destructive">
                                    <AlertDescription>{errors.password}</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                                autoComplete="new-password"
                                placeholder="Re-enter new password"
                            />
                            {errors.password_confirmation && (
                                <Alert variant="destructive">
                                    <AlertDescription>{errors.password_confirmation}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col items-center gap-3">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full"
                        >
                            {processing ? "Saving..." : "Save Changes"}
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in-out duration-300"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <p className="text-sm text-green-600 font-medium">
                                Password updated successfully.
                            </p>
                        </Transition>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}
