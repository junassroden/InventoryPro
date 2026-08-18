import React from 'react';
import {
    Package,
    BarChart3,
    LayoutDashboard,
    ChartNoAxesCombined,
} from 'lucide-react';

export default function Features() {

    const features = [
        {
            title: 'Product Management',
            description:
                'Keep product information organized and accessible from one centralized location.',
            icon: Package,
        },
        {
            title: 'Stock Monitoring',
            description:
                'Monitor available stock and quickly identify products that may require attention.',
            icon: BarChart3,
        },
        {
            title: 'Centralized Management',
            description:
                'Manage your inventory information through a single, organized workspace.',
            icon: LayoutDashboard,
        },
        {
            title: 'Inventory Overview',
            description:
                'Get a clear overview of your inventory and understand your current stock situation.',
            icon: ChartNoAxesCombined,
        },
    ];

    return (
        <section
            id="features"
            className="py-24 bg-white border-t border-slate-200/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">

                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Core Features
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Everything You Need to Manage Inventory
                    </h2>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        Designed with simplicity and efficiency in mind,
                        InventoryPro gives you the core tools needed to manage
                        your inventory effectively.
                    </p>

                </div>

                {/* Feature Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group p-7 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                            >

                                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="mt-6 text-lg font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>

                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}