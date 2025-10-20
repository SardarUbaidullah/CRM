import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Logo from '@/Components/reusable/Logo'
import { loginFields } from '@/constants/auth.constants'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }


    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Form Header */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-600">
                            Enter your credentials to access your account.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-4">

                        {loginFields.map(({ id, label, type, placeholder }) => (
                            <div key={id} className="space-y-1.5">
                                <Label htmlFor={id}>{label}</Label>
                                <Input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={data[id]}
                                    onChange={(e) => setData(id, e.target.value)}
                                    placeholder={placeholder}
                                    required
                                />
                                {errors[id] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
                                )}
                            </div>
                        ))}

                        {/* Remember Me + Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData('remember', checked)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-gray-600 select-none"
                                >
                                    Remember me
                                </Label>
                            </div>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-primary underline hover:text-primary/80 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={processing}
                            className="w-full rounded-full hover:cursor-pointer"
                        >
                            {processing ? 'Logging in...' : 'Log in'}
                        </Button>

                        {/* Register Link */}
                        <div className="text-sm mx-auto w-fit text-muted-foreground">
                            Don’t have an account?{' '}
                            <Link
                                href={route('register')}
                                className="text-primary underline hover:text-primary/80 font-medium"
                            >
                                Register from here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
