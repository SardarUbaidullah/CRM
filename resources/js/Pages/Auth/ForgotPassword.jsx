import { Head, useForm, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/Components/reusable/Logo'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('password.email'))
    }

    return (
        <>
            <Head title="Forgot Password" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Header Section */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Forgot Password
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                            No problem! Just enter your email address and we’ll send you
                            a link to reset your password.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    {/* Forgot Password Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={processing}
                            className="w-full rounded-full hover:cursor-pointer"
                        >
                            {processing ? 'Sending...' : 'Send Reset Link'}
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
