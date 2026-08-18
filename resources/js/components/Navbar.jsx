// resources/js/components/Navbar.jsx
import React, { useState } from 'react';
import { Package, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                            <Package className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Inventory<span className="text-blue-600">Pro</span>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#home" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Home
                        </a>
                        <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            About
                        </a>
                        <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            How It Works
                        </a>
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#get-started"
                            className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2 transition-colors"
                        >
                            Login
                        </a>
                        <a
                            href="#get-started"
                            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/20 transition-all hover:shadow-md hover:shadow-blue-500/30"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-700 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <a
                        href="#home"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        Home
                    </a>
                    <a
                        href="#about"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        About
                    </a>
                    <a
                        href="#features"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        Features
                    </a>
                    <a
                        href="#how-it-works"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                        How It Works
                    </a>
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <a
                            href="#get-started"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Login
                        </a>
                        <a
                            href="#get-started"
                            onClick={() => setIsOpen(false)}
                            className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl shadow-sm"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}