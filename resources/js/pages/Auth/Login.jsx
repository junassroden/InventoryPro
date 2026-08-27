import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';

import inventoryImage from '../../../images/inventory.png';

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

            onSuccess: () => {
                // Do not show a success toast here.
                // Laravel will redirect to /dashboard.
            },

            onFinish: () => {
                reset('password');
            },
        });
    };

    return (
        <div className="min-h-[100dvh] lg:h-[100dvh] flex bg-white font-sans">

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {/* =========================================================
                LEFT SIDE
            ========================================================= */}

            <div className="w-full lg:w-1/2 min-h-[100dvh] lg:h-[100dvh] flex items-start lg:items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-16 lg:py-10 xl:px-24 bg-white overflow-y-auto">

                <div className="w-full max-w-xl py-2 sm:py-4 lg:py-6">

                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <div className="mb-8 lg:mb-10 text-center lg:text-left flex flex-col items-center lg:items-start">

                        <div className="flex items-center gap-3 mb-4 lg:mb-6">

                            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">

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

                            <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                Inventory
                                <span className="text-blue-500">
                                    .
                                </span>
                            </span>

                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-base text-gray-500">
                            Please enter your details to access your account.
                        </p>

                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={submit}
                        className="space-y-5 lg:space-y-6"
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
                                } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
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
                                    } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword
                                        ? 'Hide'
                                        : 'Show'}
                                </button>

                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.password}
                                </p>
                            )}

                        </div>

                        {/* REMEMBER */}

                        <div className="flex items-center justify-between">

                            <label className="flex items-center cursor-pointer">

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
                                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                />

                                <span className="ml-2.5 text-sm font-medium text-gray-600">
                                    Remember me
                                </span>

                            </label>

                            <button
                                type="button"
                                className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                onClick={() =>
                                    toast('Password reset is not configured yet.')
                                }
                            >
                                Forgot password?
                            </button>

                        </div>

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/20 shadow-lg shadow-gray-900/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {processing
                                ? 'Signing in...'
                                : 'Sign in to account'}
                        </button>

                        {/* DIVIDER */}

                        <div className="relative my-6">

                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>

                            <div className="relative flex justify-center text-sm">

                                <span className="px-4 bg-white text-gray-500 font-medium">
                                    Or continue with
                                </span>

                            </div>

                        </div>

                        {/* GOOGLE */}

                        <button
                            type="button"
                            className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm"
                        >

                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />

                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                />

                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                />

                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                            </svg>

                            Continue with Google

                        </button>

                        {/* REGISTER */}

                        <p className="text-center text-sm text-gray-600 pt-2">

                            Don't have an account yet?{' '}

                            <Link
                                href="/register"
                                className="font-semibold text-gray-900 hover:text-blue-600 hover:underline transition-colors"
                            >
                                Sign up for free
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

            {/* =========================================================
                RIGHT SIDE IMAGE
            ========================================================= */}

            <div className="hidden lg:flex lg:w-1/2 bg-white">

                <img
                    src={inventoryImage}
                    alt="Inventory"
                    className="w-full h-full object-cover"
                />

            </div>

        </div>
    );
}