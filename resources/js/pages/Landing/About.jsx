import React from 'react';
import {
    Layers,
    CheckCircle,
    ShieldCheck,
} from 'lucide-react';

export default function About() {

    const benefits = [
        {
            title: 'Centralized Information',
            description:
                'Keep all critical inventory data in a single accessible destination.',
        },
        {
            title: 'Better Organization',
            description:
                'Structure products and inventory information cleanly and consistently.',
        },
        {
            title: 'Faster Monitoring',
            description:
                'Identify stock changes and inventory requirements quickly.',
        },
        {
            title: 'Clearer Visibility',
            description:
                'Understand your current inventory situation at a glance.',
        },
        {
            title: 'Easier Management',
            description:
                'Reduce unnecessary complexity with a clean and intuitive interface.',
        },
    ];

    return (
        <section
            id="about"
            className="py-24 bg-slate-50/60 border-t border-slate-200/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">

                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        About InventoryPro
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        A Clearer Way to Manage Inventory
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        InventoryPro is a modern inventory management system
                        designed to help users organize products, monitor stock
                        levels, and manage inventory efficiently from one
                        centralized platform.
                    </p>

                </div>

                {/* Problem / Solution */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Problem */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <Layers className="w-6 h-6 text-slate-900" />
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-slate-900">
                            The Problem
                        </h3>

                        <p className="mt-4 text-slate-600 leading-relaxed">
                            Inventory information can become difficult to
                            manage when it is scattered across spreadsheets,
                            physical documents, or disconnected tools. This
                            can lead to stock discrepancies, wasted time, and
                            limited visibility.
                        </p>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <p className="text-sm font-medium text-slate-500">
                                Disorganized information makes inventory
                                management harder than it needs to be.
                            </p>
                        </div>

                    </div>

                    {/* Solution */}
                    <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">

                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="mt-6 text-xl font-bold text-white">
                            The InventoryPro Approach
                        </h3>

                        <p className="mt-4 text-slate-300 leading-relaxed">
                            InventoryPro brings your inventory information
                            together into one organized workspace, helping
                            you understand what you have, what is running low,
                            and where your attention is needed.
                        </p>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-sm font-medium text-slate-400">
                                One workspace. Clear information. Better
                                inventory visibility.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Benefits */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">

                    <div className="text-center max-w-2xl mx-auto mb-10">

                        <h3 className="text-2xl font-bold text-slate-900">
                            Why Choose InventoryPro?
                        </h3>

                        <p className="text-slate-600 mt-2">
                            Built for users who value organization, clarity,
                            and efficient inventory management.
                        </p>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100"
                            >
                                <CheckCircle className="w-5 h-5 text-slate-900 mt-0.5 shrink-0" />

                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">
                                        {benefit.title}
                                    </h4>

                                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
}