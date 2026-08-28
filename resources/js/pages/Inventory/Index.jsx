// resources/js/pages/Inventory/Index.jsx
import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardLayout from '../../components/DashboardLayout';
import { Plus, Search, ArrowRight } from 'lucide-react';

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

            {/* INVENTORY PANELS */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {products.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm text-slate-400">
                            {search ? `No products match "${search}".` : 'No products yet.'}
                        </p>
                    </div>
                ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 sm:p-6">
                                {products.data.map((product) => (
                                    <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        {product.image_url ? <img src={product.image_url} alt={product.name} className="h-44 w-full object-cover" /> : <div className="h-44 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">No image</div>}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0"><h2 className="font-bold text-slate-900 truncate">{product.name}</h2><p className="mt-1 text-sm text-slate-500 truncate">{product.category}</p></div>
                                                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${product.status === 'Out of Stock' ? 'bg-red-100 text-red-600' : product.status === 'Low Stock' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>{product.status}</span>
                                            </div>
                                            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-slate-400">On hand</dt><dd className="font-semibold text-slate-900">{product.stock}</dd></div><div><dt className="text-slate-400">Restock at</dt><dd className="font-semibold text-slate-900">{product.min_stock}</dd></div></dl>
                                            <div className="mt-5 border-t border-slate-100 pt-4"><Link href={`/inventory/${product.id}`} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600">View item <ArrowRight className="w-4 h-4" /></Link></div>
                                        </div>
                                    </article>
                                ))}
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