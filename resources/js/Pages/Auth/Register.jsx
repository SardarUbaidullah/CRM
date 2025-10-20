import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/Components/reusable/Logo'
import { regiterFields } from '@/constants/auth.constants'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <>
            <Head title="Register" />

            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md space-y-6 rounded-2xl bg-transparent p-8 shadow-md border border-primary/25">

                    {/* Form Header */}
                    <div className="flex flex-col items-center space-y-2">
                        <Logo />
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
                            Create an Account
                        </h1>
                        <p className="text-sm text-gray-600">
                            Fill in the details below to register.
                        </p>
                    </div>

                    {/* Register Form */}

                    <form onSubmit={submit} className="space-y-4">

                        {
                            regiterFields.map(({
                                id,
                                label,
                                placeholder,
                                type
                            }) => (
                                <div key={id} className='space-y-1.5'>
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

                            ))
                        }

                        <Button
                            type="submit"
                            size={"lg"}
                            disabled={processing}
                            className='rounded-full w-full hover:cursor-pointer'
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </Button>
                        <div className="text-sm mx-auto w-fit text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href={route('login')}
                                className="text-primary underline hover:text-primary/80 font-medium"
                            >
                                Login from here
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
