import { Head, useForm, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/Components/reusable/Logo'

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <>
            <Head title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Header */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Reset Your Password
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                            Enter your new password below to regain access to your account.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                placeholder="Re-enter new password"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={processing}
                            className="w-full rounded-full hover:cursor-pointer"
                        >
                            {processing ? 'Resetting...' : 'Reset Password'}
                        </Button>

                        {/* Back to Login Link */}
                        <div className="text-sm mx-auto w-fit text-muted-foreground">
                            Remembered your password?{' '}
                            <Link
                                href={route('login')}
                                className="text-primary underline hover:text-primary/80 font-medium"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
