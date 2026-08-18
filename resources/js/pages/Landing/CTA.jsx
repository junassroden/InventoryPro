import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section
            id="get-started"
            className="py-24 bg-slate-50 border-t border-slate-200/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="relative overflow-hidden bg-slate-900 rounded-3xl px-8 py-16 sm:px-16 text-center shadow-2xl">

                    {/* Background Decorations */}
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                    <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                    <div className="relative max-w-2xl mx-auto">

                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                            Get Started
                        </p>

                        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Ready to Take Control of Your Inventory?
                        </h2>

                        <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                            Create your InventoryPro account and start
                            organizing your inventory from one centralized
                            workspace.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                            <Link
                                href="/register"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition-all hover:-translate-y-0.5"
                            >
                                Create Your Account
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/login"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-sm transition-all"
                            >
                                Sign In
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}