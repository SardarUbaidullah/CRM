import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import Logo from '@/Components/reusable/Logo'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({})

    const submit = (e) => {
        e.preventDefault()
        post(route('verification.send'))
    }

    return (
        <>
            <Head title="Email Verification" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Header */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Verify Your Email
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                            Thanks for signing up! Before getting started, please verify
                            your email address by clicking the link we just sent you.
                            If you didn’t receive the email, you can request another below.
                        </p>
                    </div>

                    {/* Status Message */}
                    {status === 'verification-link-sent' && (
                        <div className="text-sm font-medium text-green-600 text-center">
                            A new verification link has been sent to your email address.
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Buttons */}
                        <div className="flex items-center justify-between">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={processing}
                                className="rounded-full hover:cursor-pointer"
                            >
                                {processing
                                    ? 'Sending...'
                                    : 'Resend Verification Email'}
                            </Button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline hover:text-gray-900 font-medium focus:outline-none"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
