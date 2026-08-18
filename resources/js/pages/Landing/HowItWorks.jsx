import React from 'react';

export default function HowItWorks() {

    const steps = [
        {
            number: '01',
            title: 'Create Your Account',
            description:
                'Create your InventoryPro account and securely access your inventory workspace.',
        },
        {
            number: '02',
            title: 'Add Your Products',
            description:
                'Organize your products and keep important inventory information in one place.',
        },
        {
            number: '03',
            title: 'Monitor Your Inventory',
            description:
                'Track stock levels and quickly identify products that may require attention.',
        },
    ];

    return (
        <section
            id="how-it-works"
            className="py-24 bg-white border-t border-slate-200/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">

                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Simple Workflow
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        How InventoryPro Works
                    </h2>

                    <p className="text-lg text-slate-600">
                        Get started with your inventory in three simple steps.
                    </p>

                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">

                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative"
                        >

                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">

                                <span className="text-5xl font-black text-slate-100">
                                    {step.number}
                                </span>

                                <h3 className="mt-5 text-xl font-bold text-slate-900">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>

                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-slate-300" />
                            )}

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}