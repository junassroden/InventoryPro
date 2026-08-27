// resources/js/pages/Inventory/Index.jsx
import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

export default function Index({ products, filters, categories }) {

    const [search, setSearch] = useState(filters?.search || '');
    const [categoryId, setCategoryId] = useState(filters?.category_id || '');
    const [status, setStatus] = useState(filters?.status || '');

    /*
    |--------------------------------------------------------------------------
    | SEARCH (DEBOUNCED)
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                '/inventory',
                {
                    ...(search ? { search } : {}),
                    ...(categoryId ? { category_id: categoryId } : {}),
                    ...(status ? { status } : {}),
                },
                { preserveState: true, replace: true }
            );
        }, 400);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, categoryId, status]);

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const handleDelete = (product) => {
        if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
            return;
        }

        router.delete(`/inventory/${product.id}`, { preserveScroll: true });
    };

    return (
        <DashboardLayout title="Inventory">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                    </div>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    >
                        <option value="">All statuses</option>
                        <option value="in">In Stock</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                    </select>
                </div>

                <Link
                    href="/inventory/create"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </Link>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {products.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm text-slate-400">
                            {search ? `No products match "${search}".` : 'No products yet.'}
                        </p>
                    </div>
                ) : (
                            <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100 bg-slate-50">
                                    <th className="px-6 py-3.5">Product</th>
                                    <th className="px-6 py-3.5">Category</th>
                                    <th className="px-6 py-3.5">Stock</th>
                                    <th className="px-6 py-3.5">Value</th>
                                    <th className="px-6 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${product.status === 'Out of Stock' ? 'bg-red-100 text-red-600' : product.status === 'Low Stock' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                                {product.status} ({product.stock})
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">${(product.stock * product.price).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/inventory/${product.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* PAGINATION */}

                {products.data.length > 0 && products.links.length > 3 && (
                    <div className="flex items-center justify-center gap-1 px-6 py-4 border-t border-slate-100">
                        {products.links.map((link, index) => (
                            <PaginationLink key={index} link={link} />
                        ))}
                    </div>
                )}

            </div>

        </DashboardLayout>
    );
}

function PaginationLink({ link }) {
    if (!link.url) {
        return (
            <span
                className="px-3 py-1.5 text-sm text-slate-300 rounded-lg"
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        );
    }

    return (
        <Link
            href={link.url}
            preserveScroll
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                link.active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
        />
    );
}