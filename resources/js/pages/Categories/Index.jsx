// resources/js/pages/Categories/Index.jsx
import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

import DashboardLayout from '../../components/DashboardLayout';

export default function Index({ categories }) {

    const [editingId, setEditingId] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | ADD CATEGORY FORM
    |--------------------------------------------------------------------------
    */

    const { data, setData, post, processing, errors, reset } = useForm({ name: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/categories', {
            preserveScroll: true,
            onSuccess: () => reset('name'),
        });
    };

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const handleDelete = (category) => {
        if (!window.confirm(`Delete "${category.name}"?`)) {
            return;
        }

        router.delete(`/categories/${category.id}`, { preserveScroll: true });
    };

    return (
        <DashboardLayout title="Categories">

            {/* ADD CATEGORY */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm">

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Organize inventory</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Add a category</h2>
                    </div>
                    <p className="text-sm text-slate-500">{categories.length} {categories.length === 1 ? 'category' : 'categories'}</p>
                </div>

                <form onSubmit={submit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                    <div className="flex-1 w-full">
                        <label htmlFor="category-name" className="sr-only">Category name</label>
                        <input
                            id="category-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Electronics"
                            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 ${
                                errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            } text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600 font-medium">{errors.name}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed shrink-0 w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>

                </form>

            </div>

            {/* CATEGORY LIST */}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {categories.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm text-slate-400">
                            No categories yet. Add one above to get started.
                        </p>
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {categories.map((category) => (
                            <CategoryRow
                                key={category.id}
                                category={category}
                                isEditing={editingId === category.id}
                                onStartEdit={() => setEditingId(category.id)}
                                onCancelEdit={() => setEditingId(null)}
                                onDelete={() => handleDelete(category)}
                            />
                        ))}
                    </ul>
                )}

            </div>

        </DashboardLayout>
    );
}

function CategoryRow({ category, isEditing, onStartEdit, onCancelEdit, onDelete }) {

    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/categories/${category.id}`, {
            preserveScroll: true,
            onSuccess: onCancelEdit,
        });
    };

    const cancel = () => {
        reset('name');
        onCancelEdit();
    };

    if (isEditing) {
        return (
            <li className="px-6 py-4">
                <form onSubmit={submit} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex-1 w-full">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                            className={`w-full px-3 py-2 rounded-lg border bg-slate-50 ${
                                errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'
                            } text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.name}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="submit"
                            disabled={processing}
                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-70"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className="flex items-center justify-between px-6 py-4">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{category.name}</p>
                <p className="text-xs text-slate-500">
                    {category.product_count} {category.product_count === 1 ? 'product' : 'products'}
                </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
                <button
                    onClick={onStartEdit}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={onDelete}
                    className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </li>
    );
}