import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Package,
    Boxes,
    Layers,
    AlertTriangle,
    ArrowRight,
} from 'lucide-react';

import DashboardLayout from '../../components/DashboardLayout';

export default function Dashboard({
    stats,
    recentProducts,
    lowStockProducts,
    lowStockThreshold,
}) {
    return (
        <DashboardLayout title="Dashboard">

            {/* WELCOME + QUICK ACTION */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Here's what's happening in your inventory
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        A quick snapshot of your stock, right now.
                    </p>
                </div>

                <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm shrink-0"
                >
                    View Inventory
                    <ArrowRight className="w-4 h-4" />
                </Link>

            </div>

            {/* STAT CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <StatCard
                    icon={<Package className="w-5 h-5" />}
                    label="Total Products"
                    value={stats.totalProducts}
                    accent="bg-slate-900 text-white"
                />

                <StatCard
                    icon={<Boxes className="w-5 h-5" />}
                    label="Categories"
                    value={stats.totalCategories}
                    accent="bg-slate-700 text-white"
                />

                <StatCard
                    icon={<Layers className="w-5 h-5" />}
                    label="Available Stock"
                    value={stats.totalStock.toLocaleString()}
                    accent="bg-green-500 text-white"
                />

                <StatCard
                    icon={<AlertTriangle className="w-5 h-5" />}
                    label={`Low Stock (≤ ${lowStockThreshold})`}
                    value={stats.lowStockCount}
                    accent="bg-amber-500 text-white"
                />

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* RECENT PRODUCTS */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-bold text-slate-900">Recently Added</h2>
                        <Link
                            href="/inventory"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                        >
                            View all
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {recentProducts.length === 0 ? (
                        <EmptyState
                            message="No products yet."
                            actionLabel="Add your first product"
                            actionHref="/inventory/create"
                        />
                    ) : (
                        <ul className="space-y-3">
                            {recentProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            {product.category} · {product.created_at}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 shrink-0 ml-3">
                                        {product.stock}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                {/* LOW STOCK ALERTS */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-bold text-slate-900">Low Stock Alerts</h2>
                        <Link
                            href="/analytics"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                        >
                            Full analytics
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {lowStockProducts.length === 0 ? (
                        <EmptyState message="Everything is well stocked." />
                    ) : (
                        <ul className="space-y-3">
                            {lowStockProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-amber-50"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            {product.category}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-3 ${
                                            product.stock === 0
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-amber-100 text-amber-600'
                                        }`}
                                    >
                                        {product.stock} left
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}

function StatCard({ icon, label, value, accent }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accent}`}>
                {icon}
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">{label}</p>
        </div>
    );
}

function EmptyState({ message, actionLabel, actionHref }) {
    return (
        <div className="py-8 text-center">
            <p className="text-sm text-slate-400">{message}</p>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-block mt-3 text-sm font-semibold text-blue-600 hover:underline"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}