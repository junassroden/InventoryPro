// resources/js/pages/Inventory/Index.jsx
import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
    Package, 
    Plus, 
    Search, 
    Filter, 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Edit, 
    Trash2, 
    X,
    Save
} from 'lucide-react';

export default function InventoryIndex() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Mock inventory list for the UI view
    const [inventoryItems, setInventoryItems] = useState([
        { id: 1, name: "Ergonomic Office Chair", category: "Furniture", stock: 42, status: "In Stock", price: "$249.00" },
        { id: 2, name: "Wireless Mechanical Keyboard", category: "Electronics", stock: 4, status: "Low Stock", price: "$129.00" },
        { id: 3, name: "Ultra-Wide 4K Monitor", category: "Electronics", stock: 18, status: "In Stock", price: "$599.00" },
        { id: 4, name: "Adjustable Standing Desk", category: "Furniture", stock: 0, status: "Out of Stock", price: "$499.00" },
        { id: 5, name: "Noise-Cancelling Headphones", category: "Electronics", stock: 12, status: "In Stock", price: "$199.00" },
        { id: 6, name: "Aluminum Laptop Stand", category: "Accessories", stock: 25, status: "In Stock", price: "$45.00" },
    ]);

    const handleAddProductSubmit = (e) => {
        e.preventDefault();
        // Visual mockup action
        alert('Visual mock action: New product added successfully!');
        setIsAddModalOpen(false);
    };

    return (
        <DashboardLayout title="Inventory Management">
            
            {/* Header / Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Product Catalog</h2>
                    <p className="text-sm text-slate-600 mt-0.5">Manage stock records, update product details, and monitor inventory items.</p>
                </div>
                <div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                    </span>
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products by name..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Filter className="w-3.5 h-3.5" /> Category:
                    </span>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="All">All Categories</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Product Name</th>
                                <th className="py-3.5 px-6">Category</th>
                                <th className="py-3.5 px-6">Stock Status</th>
                                <th className="py-3.5 px-6">Units Available</th>
                                <th className="py-3.5 px-6">Unit Price</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {inventoryItems.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        {item.name}
                                    </td>
                                    <td className="py-4 px-6 text-slate-600">{item.category}</td>
                                    <td className="py-4 px-6">
                                        {item.status === 'In Stock' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                <CheckCircle2 className="w-3 h-3" /> In Stock
                                            </span>
                                        )}
                                        {item.status === 'Low Stock' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                                <AlertTriangle className="w-3 h-3" /> Low Stock
                                            </span>
                                        )}
                                        {item.status === 'Out of Stock' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                                                <XCircle className="w-3 h-3" /> Out of Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 font-mono text-slate-700">{item.stock} units</td>
                                    <td className="py-4 px-6 font-mono font-medium text-slate-900">{item.price}</td>
                                    <td className="py-4 px-6 text-right space-x-2">
                                        <button 
                                            onClick={() => alert(`Edit mock for: ${item.name}`)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Item"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => alert(`Delete mock for: ${item.name}`)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete Item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer Pagination Info */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Showing 6 of 128 products</span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium">Next</button>
                    </div>
                </div>
            </div>

            {/* Add Product Modal Mockup */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">Add New Product</h3>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProductSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Product Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="e.g. Wireless Mouse"
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Category</label>
                                <select className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                                    <option>Furniture</option>
                                    <option>Electronics</option>
                                    <option>Accessories</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Initial Stock</label>
                                    <input 
                                        type="number" 
                                        required 
                                        placeholder="0"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Price ($)</label>
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="0.00"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}