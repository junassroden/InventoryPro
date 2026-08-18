import React from 'react';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome to InventoryPro.
                    </p>

                </div>

            </div>
        </>
    );
}