import React from 'react';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2, Package, Layers } from 'lucide-react';

import DashboardLayout from '../../components/DashboardLayout';

export default function ProductDetails({ product }) {
	const handleDelete = () => {
		if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
			return;
		}

		router.delete(`/inventory/${product.id}`);
	};

	const statusClass = product.status === 'Out of Stock'
		? 'bg-red-100 text-red-700'
		: product.status === 'Low Stock'
			? 'bg-amber-100 text-amber-700'
			: 'bg-green-100 text-green-700';

	return (
		<DashboardLayout title="Product Details">
			<Link href="/inventory" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900">
				<ArrowLeft className="h-4 w-4" />
				Back to Inventory
			</Link>

			<div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="grid grid-cols-1 lg:grid-cols-2">
					<div className="min-h-80 bg-slate-100">
						{product.image_url ? (
							<img src={product.image_url} alt={product.name} className="h-full min-h-80 w-full object-cover" />
						) : (
							<div className="flex h-full min-h-80 items-center justify-center text-sm font-medium text-slate-400">No product image</div>
						)}
					</div>

					<div className="p-6 sm:p-10">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs font-bold uppercase tracking-wider text-blue-600">Inventory item</p>
								<h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{product.name}</h2>
							</div>
							<span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${statusClass}`}>{product.status}</span>
						</div>

						<div className="mt-8 grid grid-cols-2 gap-3">
							<DetailStat icon={<Package className="h-5 w-5" />} label="On hand" value={product.stock} />
							<DetailStat icon={<Layers className="h-5 w-5" />} label="Restock at" value={product.min_stock} />
						</div>

						<div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
							<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Category</p>
							<p className="mt-1 text-base font-bold text-slate-900">{product.category}</p>
						</div>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<Link href={`/inventory/${product.id}/edit`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
								<Pencil className="h-4 w-4" />
								Edit item
							</Link>
							<button type="button" onClick={handleDelete} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
								<Trash2 className="h-4 w-4" />
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

function DetailStat({ icon, label, value }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4">
			<div className="flex items-center gap-2 text-blue-600">{icon}<span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span></div>
			<p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
		</div>
	);
}
