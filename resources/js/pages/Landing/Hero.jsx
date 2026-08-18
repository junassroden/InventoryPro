import React from 'react';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Sparkles,
    Box,
    Layers,
    BarChart3,
    ShieldCheck,
} from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-28">

            {/* Background Grid */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_65%,transparent_100%)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-12 gap-14 items-center">

                    {/* Hero Content */}
                    <div className="lg:col-span-7">

                        <div className="space-y-8">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium tracking-wide shadow-sm">
                                <Sparkles className="w-3.5 h-3.5 text-slate-300" />
                                Modern Inventory Management
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                                Inventory control,
                                <br />

                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">
                                    simplified.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                InventoryPro helps you organize products, monitor stock levels,
                                and manage your inventory from one centralized workspace.
                            </p>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">

                                <Link
                                    href="/register"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5"
                                >
                                    Create Your Account
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </Link>

                                <a
                                    href="#features"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm transition-all"
                                >
                                    Explore Features
                                </a>

                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/70 max-w-lg">

                                <div>
                                    <p className="text-2xl font-black text-slate-900">
                                        1
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 mt-1">
                                        Centralized Workspace
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black text-slate-900">
                                        24/7
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 mt-1">
                                        Inventory Visibility
                                    </p>
                                </div>

                                <div>
                                    <p className="text-2xl font-black text-slate-900">
                                        Fast
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 mt-1">
                                        Stock Monitoring
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="lg:col-span-5 relative">

                        <div className="absolute -inset-4 bg-slate-200/50 rounded-[3rem] blur-3xl" />

                        <div className="relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-2xl">

                            {/* Card Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">

                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                                    <BarChart3 className="w-4 h-4 text-slate-700" />
                                    Inventory Overview
                                </div>

                                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                                    Active
                                </div>

                            </div>

                            {/* Inventory Blocks */}
                            <div className="grid grid-cols-2 gap-3 mt-5">

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        <Layers className="w-4 h-4 text-slate-900" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-900">
                                            Categories
                                        </p>

                                        <p className="text-[11px] text-slate-500 mt-1">
                                            Organized groups
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        <Box className="w-4 h-4 text-slate-900" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-900">
                                            Products
                                        </p>

                                        <p className="text-[11px] text-slate-500 mt-1">
                                            Item tracking
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Alert */}
                            <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">

                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                                        Stock Monitor
                                    </p>

                                    <p className="text-xs font-bold mt-1">
                                        Low Stock Alert
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-xs font-bold">
                                    ≤ 5 units
                                </span>

                            </div>

                            {/* Footer */}
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">

                                <span className="flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                                    Protected Data
                                </span>

                                <span className="font-semibold text-slate-900">
                                    Ready
                                </span>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}