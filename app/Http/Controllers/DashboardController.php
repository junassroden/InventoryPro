<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private const LOW_STOCK_THRESHOLD = 10;

    public function index()
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalStock = (int) Product::sum('stock');

        $lowStockCount = Product::where('stock', '>', 0)
            ->where('stock', '<=', self::LOW_STOCK_THRESHOLD)
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
            ->where('stock', '<=', self::LOW_STOCK_THRESHOLD)
            ->orderBy('stock')
            ->limit(5)
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category->name ?? 'Uncategorized',
                'stock' => $product->stock,
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
            'lowStockThreshold' => self::LOW_STOCK_THRESHOLD,
        ]);
    }
}