// resources/js/pages/Inventory/AddProduct.jsx
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import DashboardLayout from '../../components/DashboardLayout';

export default function AddProduct({ categories }) {
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        stock: 0,
        min_stock: 10,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/inventory', { forceFormData: true });
    };

    return (
        <DashboardLayout title="Add Product">

            <Link
                href="/inventory"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
            </Link>

            <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">

                <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Inventory item</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Add a product</h2>
                    <p className="mt-2 text-sm text-slate-500">Record what is on hand and set the level that should trigger a restock.</p>
                </div>

                <form onSubmit={submit} className="space-y-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <section className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6 min-h-56">
                            <h3 className="text-base font-bold text-slate-900">Product details</h3>
                            <p className="mt-1 text-sm text-slate-500">Use a clear name your team will recognize.</p>
                            <div className="mt-6">
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Product name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoFocus
                                    placeholder="e.g. Wireless Mouse"
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-white ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>}
                            </div>
                        </section>

                        <section className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6 min-h-56">
                            <h3 className="text-base font-bold text-slate-900">Stock controls</h3>
                            <p className="mt-1 text-sm text-slate-500">Set the quantity on hand and restock threshold.</p>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="stock" className="block text-sm font-semibold text-slate-700 mb-2">Stock quantity</label>
                                    <input id="stock" type="number" min="0" value={data.stock} onChange={(e) => setData('stock', e.target.value)} className={`w-full px-4 py-3.5 rounded-xl border bg-white ${errors.stock ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`} />
                                    {errors.stock && <p className="mt-2 text-sm text-red-600 font-medium">{errors.stock}</p>}
                                </div>
                                <div>
                                    <label htmlFor="min_stock" className="block text-sm font-semibold text-slate-700 mb-2">Restock at</label>
                                    <input id="min_stock" type="number" min="0" value={data.min_stock} onChange={(e) => setData('min_stock', e.target.value)} className={`w-full px-4 py-3.5 rounded-xl border bg-white ${errors.min_stock ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`} />
                                    {errors.min_stock && <p className="mt-2 text-sm text-red-600 font-medium">{errors.min_stock}</p>}
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6">
                        <h3 className="text-base font-bold text-slate-900">Product image</h3>
                        <p className="mt-1 text-sm text-slate-500">Add a visual reference for faster identification.</p>
                        <div className="mt-5">
                            <label htmlFor="image" className="block text-sm font-semibold text-slate-700 mb-2">Upload image</label>
                            <input id="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const file = e.target.files?.[0] || null; setData('image', file); setImagePreview(file ? URL.createObjectURL(file) : null); }} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-white file:rounded-lg file:font-semibold" />
                            {imagePreview && <img src={imagePreview} alt="Product preview" className="mt-4 h-40 w-40 rounded-xl object-cover border border-slate-200" />}
                            {errors.image && <p className="mt-2 text-sm text-red-600 font-medium">{errors.image}</p>}
                        </div>
                    </section>

                    <section className="rounded-2xl bg-slate-50 border border-slate-100 p-5 sm:p-6">
                        <h3 className="text-base font-bold text-slate-900">Category</h3>
                        <p className="mt-1 text-sm text-slate-500">Group this product so it stays easy to find.</p>
                        <div className="mt-5">
                            <label htmlFor="category_id" className="block text-sm font-semibold text-slate-700 mb-2">Product category</label>
                            <select id="category_id" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={`w-full px-4 py-3.5 rounded-xl border bg-white ${errors.category_id ? 'border-red-500 bg-red-50' : 'border-slate-200'} text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}>
                                <option value="">Select a category</option>
                                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                            {categories.length === 0 && <p className="mt-2 text-sm text-slate-500">No categories yet.{' '}<Link href="/categories" className="font-semibold text-blue-600 hover:underline">Create one first</Link></p>}
                            {errors.category_id && <p className="mt-2 text-sm text-red-600 font-medium">{errors.category_id}</p>}
                        </div>
                    </section>

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
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