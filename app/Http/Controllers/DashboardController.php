<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalStock = (int) Product::sum('stock');

        $lowStockCount = Product::whereColumn('stock', '<=', 'min_stock')
            ->where('stock', '>', 0)
            ->count();

        $outOfStockCount = Product::where('stock', 0)->count();

        /*
        |--------------------------------------------------------------------------
        | RECENTLY ADDED PRODUCTS
        |--------------------------------------------------------------------------
        */

        $recentProducts = Product::with('category:id,name')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category->name ?? 'Uncategorized',
                'stock' => $product->stock,
                'created_at' => $product->created_at?->diffForHumans(),
            ]);

        /*
        |--------------------------------------------------------------------------
        | LOW STOCK ALERTS
        |--------------------------------------------------------------------------
        */

        $lowStockProducts = Product::with('category:id,name')
            ->whereColumn('stock', '<=', 'min_stock')
            ->orderBy('stock')
            ->limit(5)
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category->name ?? 'Uncategorized',
                'stock' => $product->stock,
                'status' => $product->stock === 0 ? 'Out of Stock' : ($product->stock <= $product->min_stock ? 'Low Stock' : 'In Stock'),
            ]);

        return Inertia::render('Dashboard/Dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
                'outOfStockCount' => $outOfStockCount,
            ],
            'recentProducts' => $recentProducts,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}