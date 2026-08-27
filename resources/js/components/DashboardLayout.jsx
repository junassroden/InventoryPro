// resources/js/components/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import {
    Package,
    LayoutDashboard,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Boxes,
    Database,
} from 'lucide-react';

export default function DashboardLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { auth, flash } = usePage().props;
    const currentUrl = usePage().url;

    /*
    |--------------------------------------------------------------------------
    | AUTO-TOAST FLASH MESSAGES FROM THE SERVER
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const logout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans antialiased flex">

            <Toaster position="top-right" reverseOrder={false} />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo Area */}
                <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                            <Database className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            Inventory<span className="text-slate-400 font-light">Pro</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    <SidebarLink
                        href="/dashboard"
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Dashboard"
                        active={currentUrl === '/dashboard'}
                    />
                    <SidebarLink
                        href="/inventory"
                        icon={<Boxes className="w-5 h-5" />}
                        label="Inventory"
                        active={currentUrl.startsWith('/inventory')}
                    />
                    <SidebarLink
                        href="/analytics"
                        icon={<BarChart3 className="w-5 h-5" />}
                        label="Analytics"
                        active={currentUrl.startsWith('/analytics')}
                    />
                    <SidebarLink
                        href="/categories"
                        icon={<Settings className="w-5 h-5" />}
                        label="Categories"
                        active={currentUrl.startsWith('/categories')}
                    />
                </nav>

                {/* Sidebar Footer Profile Preview */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs shrink-0">
                                {(auth?.user?.name || 'U').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-900 truncate">
                                    {auth?.user?.name || 'User'}
                                </p>
                                <p className="text-[10px] text-slate-500 truncate">
                                    {auth?.user?.email || ''}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors shrink-0"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col lg:pl-64">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            aria-label="Open sidebar"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
                            <p className="text-xs text-slate-500 hidden sm:block">Inventory management workspace</p>
                        </div>
                    </div>
                </header>

                {/* Page Content Body */}
                <main className="flex-1 p-4 sm:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
            {icon}
            {label}
        </Link>
    );
}