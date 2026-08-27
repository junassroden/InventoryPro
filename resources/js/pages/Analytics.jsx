// resources/js/pages/Analytics.jsx
import React from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import {
    Package,
    Boxes,
    Layers,
    AlertTriangle,
    XCircle,
} from 'lucide-react';

import DashboardLayout from '../components/DashboardLayout';

const BAR_COLORS = [
    '#2563eb', // blue-600
    '#0f172a', // slate-900
    '#22c55e', // green-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
];

export default function Analytics({
    stats,
    stockByCategory,
    topProducts,
    lowStockProducts,
    recentInventory,
    inventoryGrowth,
}) {
    return (
        <DashboardLayout title="Analytics">

            {/* STAT CARDS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                <StatCard
                    icon={<span className="text-sm font-bold">$</span>}
                    label="Inventory Value"
                    value={`$${Number(stats.totalValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    accent="bg-slate-900 text-white"
                />

                <StatCard
                    icon={<Package className="w-5 h-5" />}
                    label="Total Products"
                    value={stats.totalProducts}
                    accent="bg-slate-700 text-white"
                />

                <StatCard
                    icon={<Boxes className="w-5 h-5" />}
                    label="Categories"
                    value={stats.totalCategories}
                    accent="bg-slate-600 text-white"
                />

                <StatCard
                    icon={<Layers className="w-5 h-5" />}
                    label="Total Stock Units"
                    value={stats.totalStock.toLocaleString()}
                    accent="bg-green-500 text-white"
                />

                <StatCard
                    icon={<AlertTriangle className="w-5 h-5" />}
                    label="Low Stock Items"
                    value={stats.lowStockCount}
                    accent="bg-amber-500 text-white"
                />

                <StatCard
                    icon={<XCircle className="w-5 h-5" />}
                    label="Out of Stock"
                    value={stats.outOfStockCount}
                    accent="bg-red-500 text-white"
                />

            </div>

            {/* STOCK BY CATEGORY CHART */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Stock by Category</h2>
                    <p className="text-sm text-slate-500">
                        Total units currently held per category
                    </p>
                </div>

                {stockByCategory.length === 0 ? (
                    <EmptyState message="No categories yet." />
                ) : (
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stockByCategory}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        borderRadius: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.85rem',
                                    }}
                                    formatter={(value, name) => [
                                        value,
                                        name === 'total_stock' ? 'Total Stock' : 'Products',
                                    ]}
                                />
                                <Bar dataKey="total_stock" radius={[8, 8, 0, 0]} maxBarSize={56}>
                                    {stockByCategory.map((entry, index) => (
                                        <Cell key={entry.name} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {stockByCategory.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {stockByCategory.slice(0, 6).map((category) => (
                            <div key={category.name} className="flex items-center justify-between text-sm">
                                <span className="text-slate-600 truncate">{category.name}</span>
                                <span className="font-semibold text-slate-900">${Number(category.inventory_value || 0).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* TOP PRODUCTS + LOW STOCK */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* TOP PRODUCTS */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <h2 className="text-lg font-bold text-slate-900 mb-1">Top Products by Stock</h2>
                    <p className="text-sm text-slate-500 mb-5">Your best-stocked items right now</p>

                    {topProducts.length === 0 ? (
                        <EmptyState message="No products yet." />
                    ) : (
                        <ul className="space-y-3">
                            {topProducts.map((product, index) => (
                                <li
                                    key={`${product.name}-${index}`}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-slate-500 truncate">
                                                {product.category}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 shrink-0 ml-3">
                                        {product.stock.toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                {/* LOW STOCK TABLE */}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <h2 className="text-lg font-bold text-slate-900 mb-1">Needs Restocking</h2>
                    <p className="text-sm text-slate-500 mb-5">
                        Items at or below their minimum stock level
                    </p>

                    {lowStockProducts.length === 0 ? (
                        <EmptyState message="Everything is well stocked." />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100">
                                        <th className="pb-3 pr-3">Product</th>
                                        <th className="pb-3 pr-3">Category</th>
                                        <th className="pb-3 text-right">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-slate-50 last:border-0">
                                            <td className="py-3 pr-3 font-medium text-slate-900">
                                                {product.name}
                                            </td>
                                            <td className="py-3 pr-3 text-slate-500">
                                                {product.category}
                                            </td>
                                            <td className="py-3 text-right">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        product.stock === 0
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-amber-100 text-amber-600'
                                                    }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Inventory Growth</h2>
                        <p className="text-sm text-slate-500">Items and stock added over time</p>
                    </div>
                    {inventoryGrowth.length === 0 ? <EmptyState message="No growth data yet." /> : (
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={inventoryGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
                                    <Line type="monotone" dataKey="items" stroke="#0f172a" strokeWidth={2} dot={{ fill: '#0f172a', r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recently Added Inventory</h2>
                        <p className="text-sm text-slate-500">The latest items in your catalog</p>
                    </div>
                    {recentInventory.length === 0 ? <EmptyState message="No inventory yet." /> : (
                        <ul className="space-y-3">
                            {recentInventory.map((product) => (
                                <li key={`${product.name}-${product.created_at}`} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{product.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{product.category} · {product.created_at}</p>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">${product.value.toFixed(2)}</span>
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

function EmptyState({ message }) {
    return (
        <div className="py-10 text-center text-sm text-slate-400">
            {message}
        </div>
    );
}