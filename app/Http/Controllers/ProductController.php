<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private const LOW_STOCK_THRESHOLD = 10;

    /*
    |--------------------------------------------------------------------------
    | LIST PRODUCTS
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $search = trim((string) $request->input('search'));

        $products = Product::with('category:id,name')
            ->when($search !== '', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'category' => $product->category->name ?? 'Uncategorized',
                'category_id' => $product->category_id,
                'low_stock' => $product->stock <= self::LOW_STOCK_THRESHOLD,
            ]);

        return Inertia::render('Inventory/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
            ],
            'lowStockThreshold' => self::LOW_STOCK_THRESHOLD,
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT FORM
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return Inertia::render('Inventory/Create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | STORE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'category_id' => ['required', 'exists:categories,id'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        Product::create($validated);

        return redirect()
            ->route('inventory.index')
            ->with('success', 'Product added successfully.');
    }

    /*
    |--------------------------------------------------------------------------
    | EDIT PRODUCT FORM
    |--------------------------------------------------------------------------
    */

    public function edit(Product $product)
    {
        return Inertia::render('Inventory/Edit', [
            'product' => $product->only(['id', 'name', 'category_id', 'stock']),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'category_id' => ['required', 'exists:categories,id'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $product->update($validated);

        return redirect()
            ->route('inventory.index')
            ->with('success', 'Product updated successfully.');
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()
            ->route('inventory.index')
            ->with('success', 'Product deleted successfully.');
    }
}