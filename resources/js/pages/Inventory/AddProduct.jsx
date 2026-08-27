// resources/js/pages/Inventory/AddProduct.jsx
import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import DashboardLayout from '../../components/DashboardLayout';

export default function AddProduct({ categories }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        stock: 0,
        min_stock: 10,
        price: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/inventory');
    };

    return (
        <DashboardLayout title="Add Product">

            <Link
                href="/inventory"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Inventory
            </Link>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-xl">

                <h2 className="text-lg font-bold text-slate-900 mb-6">New Product</h2>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                            placeholder="e.g. Wireless Mouse"
                            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${
                                errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            } text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="min_stock" className="block text-sm font-semibold text-slate-700 mb-2">
                                Minimum Stock Level
                            </label>
                            <input
                                id="min_stock"
                                type="number"
                                min="0"
                                value={data.min_stock}
                                onChange={(e) => setData('min_stock', e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${errors.min_stock ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all`}
                            />
                            {errors.min_stock && <p className="mt-2 text-sm text-red-600 font-medium">{errors.min_stock}</p>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                                Unit Price
                            </label>
                            <input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${errors.price ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all`}
                            />
                            {errors.price && <p className="mt-2 text-sm text-red-600 font-medium">{errors.price}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="category_id" className="block text-sm font-semibold text-slate-700 mb-2">
                            Category
                        </label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${
                                errors.category_id ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            } text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {categories.length === 0 && (
                            <p className="mt-2 text-sm text-slate-500">
                                No categories yet.{' '}
                                <Link href="/categories" className="font-semibold text-blue-600 hover:underline">
                                    Create one first
                                </Link>
                            </p>
                        )}
                        {errors.category_id && (
                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.category_id}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="stock" className="block text-sm font-semibold text-slate-700 mb-2">
                            Stock Quantity
                        </label>
                        <input
                            id="stock"
                            type="number"
                            min="0"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${
                                errors.stock ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            } text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        />
                        {errors.stock && (
                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.stock}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Save Product'}
                        </button>
                        <Link
                            href="/inventory"
                            className="px-5 py-3 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>

                </form>

            </div>

        </DashboardLayout>
    );
}