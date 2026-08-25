<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class AnalyticsController extends Controller
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

        $stockByCategory = Category::withCount('products')
            ->withSum('products', 'stock')
            ->get()
            ->map(fn ($category) => [
                'name' => $category->name,
                'product_count' => $category->products_count,
                'total_stock' => (int) ($category->products_sum_stock ?? 0),
            ])
            ->sortByDesc('total_stock')
            ->values();
        
        $topProducts = Product::with('category:id,name')
            ->orderByDesc('stock')
            ->limit(5)
            ->get()
            ->map(fn ($product) => [
                'name' => $product->name,
                'stock' => $product->stock,
                'category' => $product->category->name ?? 'Uncategorized',
            ]);

        $lowStockProducts = Product::with('category:id,name')
            ->where('stock', '<=', self::LOW_STOCK_THRESHOLD)
            ->orderBy('stock')
            ->limit(10)
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'category' => $product->category->name ?? 'Uncategorized',
            ]);

        return Inertia::render('Analytics', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
                'outOfStockCount' => $outOfStockCount,
            ],
            'stockByCategory' => $stockByCategory,
            'topProducts' => $topProducts,
            'lowStockProducts' => $lowStockProducts,
            'lowStockThreshold' => self::LOW_STOCK_THRESHOLD,
        ]);
    }
}