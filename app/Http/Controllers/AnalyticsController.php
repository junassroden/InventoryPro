<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class AnalyticsController extends Controller
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

        $categoryValues = Product::selectRaw('category_id, COALESCE(SUM(stock * price), 0) as inventory_value')
            ->groupBy('category_id')
            ->pluck('inventory_value', 'category_id');

        $stockByCategory = Category::withCount('products')
            ->withSum('products', 'stock')
            ->get()
            ->map(fn ($category) => [
                'name' => $category->name,
                'product_count' => $category->products_count,
                'total_stock' => (int) ($category->products_sum_stock ?? 0),
                'inventory_value' => (float) ($categoryValues[$category->id] ?? 0),
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
            ->whereColumn('stock', '<=', 'min_stock')
            ->orderBy('stock')
            ->limit(10)
            ->get()
            ->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'category' => $product->category->name ?? 'Uncategorized',
            ]);

        $recentInventory = Product::with('category:id,name')->latest()->limit(6)->get()->map(fn ($product) => [
            'name' => $product->name,
            'category' => $product->category->name ?? 'Uncategorized',
            'stock' => $product->stock,
            'value' => round($product->stock * (float) $product->price, 2),
            'created_at' => $product->created_at?->diffForHumans(),
        ]);

        $inventoryGrowth = Product::query()->get(['created_at', 'stock'])
            ->groupBy(fn ($product) => $product->created_at?->format('Y-m'))
            ->map(fn ($products, $month) => [
                'month' => $month,
                'items' => $products->count(),
                'stock' => (int) $products->sum('stock'),
            ])->values();

        return Inertia::render('Analytics', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalStock' => $totalStock,
                'lowStockCount' => $lowStockCount,
                'outOfStockCount' => $outOfStockCount,
                'totalValue' => round((float) Product::selectRaw('COALESCE(SUM(stock * price), 0) as total')->value('total'), 2),
            ],
            'stockByCategory' => $stockByCategory,
            'topProducts' => $topProducts,
            'lowStockProducts' => $lowStockProducts,
            'recentInventory' => $recentInventory,
            'inventoryGrowth' => $inventoryGrowth,
        ]);
    }
}