import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/Components/reusable/Logo'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <>
            <Head title="Confirm Password" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Header */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Confirm Your Password
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                            This is a secure area of the application. Please confirm your
                            password before continuing.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Password */}
                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                required
                                autoFocus
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={processing}
                            className="w-full rounded-full hover:cursor-pointer"
                        >
                            {processing ? 'Confirming...' : 'Confirm'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
