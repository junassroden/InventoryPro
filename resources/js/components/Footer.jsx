// resources/js/components/Footer.jsx
import React from 'react';
import { Package } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Brand Info */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <Package className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                Inventory<span className="text-blue-600">Pro</span>
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">
                            Modern inventory management made simple.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600">
                        <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
                        <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs text-slate-400">
                        © 2026 InventoryPro. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
}