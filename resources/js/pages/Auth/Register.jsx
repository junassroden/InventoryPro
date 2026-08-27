import React, { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import inventoryImage from '../../../images/inventory.png';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const [countdown, setCountdown] = useState(0);
    const [isSending, setIsSending] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        email: '',
        otp: '',
        password: '',
        password_confirmation: '',
    });

    /*
    |--------------------------------------------------------------------------
    | OTP COUNTDOWN
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (countdown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setCountdown((previous) => {
                if (previous <= 1) {
                    clearInterval(timer);
                    setIsSending(false);
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    /*
    |--------------------------------------------------------------------------
    | FORMAT COUNTDOWN
    |--------------------------------------------------------------------------
    */

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    /*
    |--------------------------------------------------------------------------
    | PASSWORD STRENGTH
    |--------------------------------------------------------------------------
    */

    const passwordChecks = {
        length: data.password.length >= 8,
        uppercase: /[A-Z]/.test(data.password),
        lowercase: /[a-z]/.test(data.password),
        number: /[0-9]/.test(data.password),
        symbol: /[^A-Za-z0-9]/.test(data.password),
    };

    const passwordScore = Object.values(passwordChecks).filter(Boolean).length;

    let passwordStrength = '';

    if (data.password.length === 0) {
        passwordStrength = '';
    } else if (passwordScore <= 2) {
        passwordStrength = 'Weak';
    } else if (passwordScore === 3 || passwordScore === 4) {
        passwordStrength = 'Fair';
    } else {
        passwordStrength = 'Strong';
    }

    /*
    |--------------------------------------------------------------------------
    | SEND OTP
    |--------------------------------------------------------------------------
    */

    const handleSendOTP = async () => {
        const email = data.email.trim().toLowerCase();

        if (!email) {
            toast.error('Please enter your email first.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (isSending || countdown > 0) {
            return;
        }

        setIsSending(true);

        try {
            const response = await axios.post(
                '/send-otp',
                {
                    email: email,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                }
            );

            if (response.status >= 200 && response.status < 300) {
                toast.success(
                    response.data?.message ||
                    `OTP sent successfully to ${email}`
                );

                setCountdown(180);
                return;
            }

            toast.error(
                response.data?.message ||
                'Unable to send OTP.'
            );

            setIsSending(false);

        } catch (error) {
            console.error('OTP ERROR:', error);
            console.error('SERVER RESPONSE:', error.response?.data);

            if (error.response?.status === 422) {
                toast.error(
                    error.response?.data?.message ||
                    'This email cannot be used.'
                );

                setIsSending(false);
                return;
            }

            if (error.response?.status === 429) {
                toast.error(
                    'Too many OTP requests. Please wait before trying again.'
                );

                setIsSending(false);
                return;
            }

            if (error.response?.status >= 500) {
                toast.error(
                    error.response?.data?.message ||
                    'The server encountered an error while sending the OTP.'
                );

                setIsSending(false);
                return;
            }

            toast.error('Unable to connect to the server.');
            setIsSending(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | REGISTER
    |--------------------------------------------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        if (!data.name.trim()) {
            toast.error('Please enter your full name.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email.trim())) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (!data.otp) {
            toast.error('Please enter the verification code.');
            return;
        }

        if (data.otp.length !== 6) {
            toast.error('The verification code must contain 6 digits.');
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | PASSWORD VALIDATION
        |--------------------------------------------------------------------------
        */

        if (!data.password) {
            toast.error('Please enter a password.');
            return;
        }

        if (!passwordChecks.length) {
            toast.error('Password must contain at least 8 characters.');
            return;
        }

        if (!passwordChecks.uppercase) {
            toast.error('Password must contain at least one uppercase letter.');
            return;
        }

        if (!passwordChecks.lowercase) {
            toast.error('Password must contain at least one lowercase letter.');
            return;
        }

        if (!passwordChecks.number) {
            toast.error('Password must contain at least one number.');
            return;
        }

        if (!passwordChecks.symbol) {
            toast.error('Password must contain at least one symbol.');
            return;
        }

        if (!data.password_confirmation) {
            toast.error('Please confirm your password.');
            return;
        }

        if (data.password !== data.password_confirmation) {
            toast.error('Passwords do not match.');
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | SUBMIT
        |--------------------------------------------------------------------------
        */

        post('/register', {

            preserveScroll: true,

            onStart: () => {
                console.log('Registration started...');
            },

            /*
            |--------------------------------------------------------------------------
            | ONLY SHOW SUCCESS IF REGISTRATION REALLY SUCCEEDED
            |--------------------------------------------------------------------------
            */

            onSuccess: (page) => {

                console.log('Registration SUCCESS:', page);

                /*
                 * RegisterController redirects to /dashboard
                 * ONLY after User::create() succeeds.
                 */

                if (
                    page?.url?.includes('/dashboard')
                ) {
                    toast.success(
                        'Account created successfully!'
                    );
                }
            },

            /*
            |--------------------------------------------------------------------------
            | VALIDATION ERRORS
            |--------------------------------------------------------------------------
            */

            onError: (formErrors) => {

                console.error(
                    'Registration errors:',
                    formErrors
                );

                if (formErrors.name) {
                    toast.error(formErrors.name);
                    return;
                }

                if (formErrors.email) {
                    toast.error(formErrors.email);
                    return;
                }

                if (formErrors.otp) {
                    toast.error(formErrors.otp);
                    return;
                }

                if (formErrors.password) {
                    toast.error(formErrors.password);
                    return;
                }

                if (formErrors.password_confirmation) {
                    toast.error(
                        formErrors.password_confirmation
                    );
                    return;
                }

                toast.error(
                    'There was an error creating your account.'
                );
            },

            onFinish: () => {
                reset(
                    'password',
                    'password_confirmation'
                );
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

                    {/* LOGO */}

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
                            Create an account
                        </h2>

                        <p className="mt-2 text-base text-gray-500">
                            Join InventoryPro to start managing your assets.
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={submit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
                    >

                        {/* NAME */}

                        <div className="md:col-span-2">

                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                autoComplete="name"
                                autoFocus
                                placeholder="John Doe"
                                className={`w-full px-5 py-3.5 rounded-xl border bg-gray-50 ${
                                    errors.name
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200'
                                } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                            />

                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.name}
                                </p>
                            )}

                        </div>

                        {/* EMAIL */}

                        <div className="flex flex-col">

                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email Address
                            </label>

                            <div className="relative">

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
                                    placeholder="name@company.com"
                                    className={`w-full px-5 py-3.5 pr-24 rounded-xl border bg-gray-50 ${
                                        errors.email
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200'
                                    } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                                />

                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    disabled={
                                        isSending ||
                                        countdown > 0
                                    }
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1.5 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors shadow-sm ${
                                        isSending ||
                                        countdown > 0
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''
                                    }`}
                                >
                                    {countdown > 0
                                        ? formatTime(countdown)
                                        : isSending
                                            ? 'Sending...'
                                            : 'Send Code'}
                                </button>

                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.email}
                                </p>
                            )}

                        </div>

                        {/* OTP */}

                        <div className="flex flex-col">

                            <label
                                htmlFor="otp"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Verification Code
                            </label>

                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={data.otp}
                                onChange={(e) => {
                                    const value =
                                        e.target.value.replace(
                                            /\D/g,
                                            ''
                                        );

                                    setData('otp', value);
                                }}
                                placeholder="000000"
                                className={`w-full px-5 py-3.5 text-center tracking-[0.5em] text-lg font-mono font-bold rounded-xl border bg-gray-50 ${
                                    errors.otp
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-200'
                                } text-gray-900 placeholder-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                            />

                            {errors.otp && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.otp}
                                </p>
                            )}

                        </div>

                        {/* PASSWORD */}

                        <div className="flex flex-col">

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
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    className={`w-full px-5 py-3.5 pr-16 rounded-xl border bg-gray-50 ${
                                        errors.password
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200'
                                    } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword
                                        ? 'Hide'
                                        : 'Show'}
                                </button>

                            </div>

                            {/* PASSWORD STRENGTH */}

                            {data.password && (
                                <div className="mt-3">

                                    <div className="flex gap-1.5 mb-2">

                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                                    level <= passwordScore
                                                        ? passwordScore <= 2
                                                            ? 'bg-red-500'
                                                            : passwordScore <= 4
                                                                ? 'bg-yellow-500'
                                                                : 'bg-green-500'
                                                        : 'bg-gray-200'
                                                }`}
                                            />
                                        ))}

                                    </div>

                                    <div className="flex justify-between items-center">

                                        <span
                                            className={`text-xs font-semibold ${
                                                passwordScore <= 2
                                                    ? 'text-red-600'
                                                    : passwordScore <= 4
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                            }`}
                                        >
                                            {passwordStrength}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {passwordScore}/5 requirements
                                        </span>

                                    </div>

                                    <div className="mt-3 space-y-1">

                                        <PasswordRequirement
                                            valid={passwordChecks.length}
                                            text="At least 8 characters"
                                        />

                                        <PasswordRequirement
                                            valid={passwordChecks.uppercase}
                                            text="One uppercase letter"
                                        />

                                        <PasswordRequirement
                                            valid={passwordChecks.lowercase}
                                            text="One lowercase letter"
                                        />

                                        <PasswordRequirement
                                            valid={passwordChecks.number}
                                            text="One number"
                                        />

                                        <PasswordRequirement
                                            valid={passwordChecks.symbol}
                                            text="One symbol"
                                        />

                                    </div>

                                </div>
                            )}

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.password}
                                </p>
                            )}

                        </div>

                        {/* CONFIRM PASSWORD */}

                        <div className="flex flex-col">

                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <input
                                    id="password_confirmation"
                                    type={
                                        showPasswordConfirmation
                                            ? 'text'
                                            : 'password'
                                    }
                                    value={
                                        data.password_confirmation
                                    }
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                    className={`w-full px-5 py-3.5 pr-16 rounded-xl border bg-gray-50 ${
                                        errors.password_confirmation
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-200'
                                    } text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPasswordConfirmation(
                                            !showPasswordConfirmation
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {showPasswordConfirmation
                                        ? 'Hide'
                                        : 'Show'}
                                </button>

                            </div>

                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-600 font-medium">
                                    {errors.password_confirmation}
                                </p>
                            )}

                        </div>

                        {/* REGISTER BUTTON */}

                        <div className="md:col-span-2 mt-2">

                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    passwordScore !== 5
                                }
                                className="w-full py-3.5 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-900/20 shadow-lg shadow-gray-900/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {processing
                                    ? 'Creating account...'
                                    : 'Create account'}
                            </button>

                        </div>

                        {/* DIVIDER */}

                        <div className="md:col-span-2 relative my-2">

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

                        <div className="md:col-span-2">

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

                                Sign up with Google

                            </button>

                        </div>

                        {/* LOGIN */}

                        <div className="md:col-span-2 text-center mt-2">

                            <p className="text-sm text-gray-600">

                                Already have an account?{' '}

                                <Link
                                    href="/login"
                                    className="font-semibold text-gray-900 hover:text-blue-600 hover:underline transition-colors"
                                >
                                    Sign in
                                </Link>

                            </p>

                        </div>

                    </form>

                </div>

            </div>

            {/* RIGHT IMAGE */}

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

/*
|--------------------------------------------------------------------------
| PASSWORD REQUIREMENT COMPONENT
|--------------------------------------------------------------------------
*/

function PasswordRequirement({ valid, text }) {
    return (
        <div className="flex items-center gap-2">

            <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    valid
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                }`}
            >
                {valid ? '✓' : '•'}
            </div>

            <span
                className={`text-xs ${
                    valid
                        ? 'text-green-600'
                        : 'text-gray-500'
                }`}
            >
                {text}
            </span>

        </div>
    );
}