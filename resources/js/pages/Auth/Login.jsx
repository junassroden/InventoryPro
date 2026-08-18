import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login', {
            preserveScroll: true,

            onError: (errors) => {
                if (errors.email) {
                    toast.error(errors.email);
                } else if (errors.password) {
                    toast.error(errors.password);
                } else {
                    toast.error(
                        'The email or password is incorrect.'
                    );
                }
            },

            onFinish: () => {
                reset('password');
            },
        });
    };

    return (
        <div className="min-h-screen flex bg-white font-sans">

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 bg-white">

                <div className="w-full max-w-md">

                    {/* LOGO */}

                    <div className="mb-10 text-center lg:text-left">

                        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">

                            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                    />
                                </svg>

                            </div>

                            <span className="text-2xl font-bold text-gray-900">
                                Inventory<span className="text-blue-500">.</span>
                            </span>

                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-base text-gray-500">
                            Please enter your details to access your account.
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={submit}
                        className="space-y-6"
                    >

                        {/* EMAIL */}

                        <div>

                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData(
                                        'email',
                                        e.target.value
                                    )
                                }
                                autoComplete="email"
                                autoFocus
                                placeholder="name@company.com"
                                className={`w-full px-5 py-3.5 rounded-xl border bg-gray-50 ${
                                    errors.email
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200'
                                } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={data.password}
                                    onChange={(e) =>
                                        setData(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className={`w-full px-5 py-3.5 pr-16 rounded-xl border bg-gray-50 ${
                                        errors.password
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200'
                                    } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-gray-900"
                                >
                                    {showPassword
                                        ? 'Hide'
                                        : 'Show'}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}

                        </div>

                        {/* REMEMBER ME */}

                        <div className="flex items-center">

                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        'remember',
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300"
                            />

                            <label
                                htmlFor="remember"
                                className="ml-2.5 text-sm font-medium text-gray-600"
                            >
                                Remember me
                            </label>

                        </div>

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/20 shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing
                                ? 'Signing in...'
                                : 'Sign in to account'}
                        </button>

                        {/* REGISTER */}

                        <p className="text-center text-sm text-gray-600">

                            Don't have an account yet?{' '}

                            <Link
                                href="/register"
                                className="font-semibold text-gray-900 hover:text-blue-600 hover:underline"
                            >
                                Sign up for free
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>
    );
}