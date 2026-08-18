import React from 'react';
import { Link } from '@inertiajs/react';
import { Database, ArrowUpRight } from 'lucide-react';

import Hero from './Hero';
import Features from './Features';
import About from './About';
import HowItWorks from './HowItWorks';
import CTA from './CTA';

export default function Index() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">

            {/* Navigation */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                                <Database className="w-5 h-5" />
                            </div>

                            <div>
                                <span className="text-lg font-bold tracking-tight text-slate-900">
                                    Inventory
                                    <span className="text-slate-400 font-light">
                                        Pro
                                    </span>
                                </span>

                                <p className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-400">
                                    Inventory Management
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200/70">
                            <a
                                href="#features"
                                className="px-5 py-2 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
                            >
                                Features
                            </a>

                            <a
                                href="#about"
                                className="px-5 py-2 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
                            >
                                About
                            </a>

                            <a
                                href="#how-it-works"
                                className="px-5 py-2 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
                            >
                                How It Works
                            </a>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-xl shadow-sm transition-all"
                            >
                                Get Started
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Landing Page */}
            <main>
                <Hero />
                <Features />
                <About />
                <HowItWorks />
                <CTA />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                                <Database className="w-4 h-4 text-slate-900" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Inventory
                                    <span className="font-light text-slate-400">
                                        Pro
                                    </span>
                                </p>

                                <p className="text-xs text-slate-500">
                                    Inventory management made simple.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-xs text-slate-500">
                            <Link
                                href="/login"
                                className="hover:text-slate-900 transition-colors"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/register"
                                className="hover:text-slate-900 transition-colors"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">
                            © 2026 InventoryPro. All rights reserved.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
}