import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';

import {
    LayoutDashboard,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
    Boxes,
    UserCircle,
} from 'lucide-react';

export default function DashboardLayout({
    children,
    title = 'Dashboard',
}) {

    const { auth, flash } = usePage().props;
    const currentUrl = usePage().url; // e.g. "/inventory"

    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    /*
    |--------------------------------------------------------------------------
    | AUTO-TOAST FLASH MESSAGES FROM THE SERVER
    |--------------------------------------------------------------------------
    */

    React.useEffect(() => {
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
        <div className="min-h-screen bg-slate-50 font-sans">

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {/* =========================================================
                MOBILE OVERLAY
            ========================================================= */}

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* =========================================================
                SIDEBAR
            ========================================================= */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    w-64
                    bg-white
                    border-r
                    border-slate-200
                    transform
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }
                `}
            >

                {/* LOGO */}

                <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">

                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                    >

                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-sm">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                />
                            </svg>

                        </div>

                        <span className="text-xl font-bold text-slate-900">
                            Inventory
                            <span className="text-blue-500">
                                .
                            </span>
                        </span>

                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-slate-500 hover:text-slate-900"
                    >
                        <X className="w-5 h-5" />
                    </button>

                </div>

                {/* NAVIGATION */}

                <nav className="p-4 space-y-1">

                    <SidebarLink
                        href="/dashboard"
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Dashboard"
                        active={currentUrl === '/dashboard'}
                    />

                    <SidebarLink
                        href="/inventory"
                        icon={<Package className="w-5 h-5" />}
                        label="Inventory"
                        active={currentUrl.startsWith('/inventory')}
                    />


                    <SidebarLink
                        href="/categories"
                        icon={<Boxes className="w-5 h-5" />}
                        label="Categories"
                        active={currentUrl.startsWith('/categories')}
                    />

                    <SidebarLink
                        href="#settings"
                        icon={<Settings className="w-5 h-5" />}
                        label="Settings"
                        active={currentUrl.startsWith('/settings')}
                    />

                </nav>

                {/* USER */}

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">

                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">

                            <UserCircle className="w-6 h-6" />

                        </div>

                        <div className="flex-1 min-w-0">

                            <p className="text-sm font-semibold text-slate-900 truncate">
                                {auth?.user?.name || 'User'}
                            </p>

                            <p className="text-xs text-slate-500 truncate">
                                {auth?.user?.email || ''}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={logout}
                        className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >

                        <LogOut className="w-4 h-4" />

                        Sign out

                    </button>

                </div>

            </aside>

            {/* =========================================================
                MAIN AREA
            ========================================================= */}

            <div className="lg:pl-64 min-h-screen">

                {/* TOP BAR */}

                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        >
                            <Menu className="w-6 h-6 text-slate-700" />
                        </button>

                        <div>

                            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                                {title}
                            </h1>

                            <p className="text-xs text-slate-500 hidden sm:block">
                                InventoryPro Management System
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="hidden sm:block text-right">

                            <p className="text-sm font-semibold text-slate-900">
                                {auth?.user?.name || 'User'}
                            </p>

                            <p className="text-xs text-slate-500">
                                Administrator
                            </p>

                        </div>

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                            <UserCircle className="w-6 h-6" />

                        </div>

                    </div>

                </header>

                {/* CONTENT */}

                <main className="p-4 sm:p-6 lg:p-8">

                    <div className="max-w-7xl mx-auto space-y-6">

                        {children}

                    </div>

                </main>

            </div>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| SIDEBAR LINK
|--------------------------------------------------------------------------
*/

function SidebarLink({
    href,
    icon,
    label,
    active,
}) {

    return (
        <Link
            href={href}
            className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-medium
                transition-all
                ${
                    active
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
            `}
        >

            {icon}

            {label}

        </Link>
    );  
}