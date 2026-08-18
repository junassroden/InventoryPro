// resources/js/components/DashboardLayout.jsx
import React, { useState } from 'react';
import { 
    Package, 
    LayoutDashboard, 
    BarChart3, 
    Settings, 
    LogOut, 
    Menu, 
    X, 
    Bell, 
    Search,
    ChevronDown,
    Boxes
} from 'lucide-react';

export default function DashboardLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50/50 flex">
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
                    <a href="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                            <Package className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            Inventory<span className="text-blue-600">Pro</span>
                        </span>
                    </a>
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
                    <a
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-blue-50 text-blue-600 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a
                        href="#inventory"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <Boxes className="w-5 h-5" />
                        Inventory
                    </a>
                    <a
                        href="#analytics"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <BarChart3 className="w-5 h-5" />
                        Analytics
                    </a>
                    <a
                        href="#settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </a>
                </nav>

                {/* Sidebar Footer Profile Preview */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                                JD
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-900">John Doe</p>
                                <p className="text-[10px] text-slate-500">Administrator</p>
                            </div>
                        </div>
                        <a 
                            href="/login" 
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </a>
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
                        <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Search className="w-4 h-4" />
                            </span>
                            <input 
                                type="text"
                                placeholder="Search inventory..."
                                className="pl-9 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                        </div>

                        <button 
                            className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600"></span>
                        </button>
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