import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Package,
    Boxes,
    Layers,
    AlertTriangle,
    ArrowRight,
    Plus,
} from 'lucide-react';

import DashboardLayout from '../../layouts/DashboardLayout';

export default function Dashboard({
    stats = {
        totalProducts: 0,
        totalCategories: 0,
        totalStock: 0,
        lowStockCount: 0,
    },
    recentProducts = [],
    lowStockProducts = [],
    lowStockThreshold = 10,
}) {
    return (
        <DashboardLayout title="Dashboard">

            {/* =========================================================
                WELCOME + QUICK ACTION
            ========================================================= */}

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
                    href="/inventory/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors shadow-sm shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>

            </div>

            {/* =========================================================
                STAT CARDS
            ========================================================= */}

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
                    accent="bg-blue-500 text-white"
                />

                <StatCard
                    icon={<Layers className="w-5 h-5" />}
                    label="Available Stock"
                    value={Number(stats.totalStock || 0).toLocaleString()}
                    accent="bg-green-500 text-white"
                />

                <StatCard
                    icon={<AlertTriangle className="w-5 h-5" />}
                    label={`Low Stock (≤ ${lowStockThreshold})`}
                    value={stats.lowStockCount}
                    accent="bg-amber-500 text-white"
                />

            </div>

            {/* =========================================================
                PRODUCTS + LOW STOCK
            ========================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* =====================================================
                    RECENT PRODUCTS
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Recently Added
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Your latest inventory items
                            </p>
                        </div>

                        <Link
                            href="/inventory"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
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
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                                >

                                    <div className="flex items-center gap-3 min-w-0">

                                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                            <Package className="w-4 h-4 text-slate-600" />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-sm font-semibold text-slate-900 truncate">
                                                {product.name}
                                            </p>

                                            <p className="text-xs text-slate-500 truncate">
                                                {product.category || 'Uncategorized'}
                                                {product.created_at
                                                    ? ` · ${product.created_at}`
                                                    : ''
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-right shrink-0 ml-3">

                                        <p className="text-sm font-bold text-slate-900">
                                            {product.stock ?? 0}
                                        </p>

                                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                                            Stock
                                        </p>

                                    </div>

                                </li>

                            ))}

                        </ul>
                    )}

                </div>

                {/* =====================================================
                    LOW STOCK ALERTS
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Low Stock Alerts
                            </h2>

                            <p className="text-xs text-slate-500 mt-1">
                                Products that need attention
                            </p>
                        </div>

                        <Link
                            href="/analytics"
                            className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
                        >
                            Full analytics
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                    </div>

                    {lowStockProducts.length === 0 ? (

                        <EmptyState
                            message="Everything is well stocked."
                        />

                    ) : (

                        <ul className="space-y-3">

                            {lowStockProducts.map((product) => (

                                <li
                                    key={product.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100"
                                >

                                    <div className="flex items-center gap-3 min-w-0">

                                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-sm font-semibold text-slate-900 truncate">
                                                {product.name}
                                            </p>

                                            <p className="text-xs text-slate-500 truncate">
                                                {product.category || 'Uncategorized'}
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`
                                            text-xs
                                            font-bold
                                            px-2.5
                                            py-1
                                            rounded-full
                                            shrink-0
                                            ml-3
                                            ${
                                                Number(product.stock) === 0
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-amber-100 text-amber-600'
                                            }
                                        `}
                                    >
                                        {product.stock ?? 0} left
                                    </span>

                                </li>

                            ))}

                        </ul>

                    )}

                </div>

            </div>

            {/* =========================================================
                INVENTORY OVERVIEW
            ========================================================= */}

            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>

                        <div className="flex items-center gap-2 mb-2">

                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Package className="w-4 h-4" />
                            </div>

                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                                Inventory Overview
                            </span>

                        </div>

                        <h3 className="text-xl font-bold">
                            Keep your inventory under control
                        </h3>

                        <p className="text-sm text-slate-400 mt-1 max-w-xl">
                            Monitor your products, stock levels, and categories
                            from one centralized dashboard.
                        </p>

                    </div>

                    <Link
                        href="/inventory"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors shrink-0"
                    >
                        Manage Inventory
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                </div>

            </div>

        </DashboardLayout>
    );
}

/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function StatCard({
    icon,
    label,
    value,
    accent,
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">

            <div
                className={`
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    mb-4
                    ${accent}
                `}
            >
                {icon}
            </div>

            <p className="text-2xl font-extrabold text-slate-900">
                {value}
            </p>

            <p className="text-xs font-medium text-slate-500 mt-1">
                {label}
            </p>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyState({
    message,
    actionLabel,
    actionHref,
}) {
    return (
        <div className="py-10 text-center">

            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-slate-400" />
            </div>

            <p className="text-sm text-slate-400">
                {message}
            </p>

            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    {actionLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            )}

        </div>
    );
}