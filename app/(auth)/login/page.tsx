'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useAuth } from '@/components/Provider/AuthProvider'
import { useRouter } from 'next/navigation';

type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
    const { signIn } = useAuth()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        const res = await signIn(data.email, data.password)
        console.log(res.user)
        if (res.user) {
            router.push('/dashboard')
        }
    }


    return (
        <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen ">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                {...register('email', {
                                    required: 'Email is required', pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Entered value does not match email format',
                                    }
                                })}
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                {...register('password', {
                                    required: 'Password is required', minLength: {
                                        value: 8,
                                        message: 'Password must have at least 8 characters',
                                    }
                                })}
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"

                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

