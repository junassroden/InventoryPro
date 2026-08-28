<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | LIST PRODUCTS
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $search = trim((string) $request->input('search'));
        $categoryId = $request->integer('category_id');
        $status = (string) $request->input('status');

        $products = Product::with('category:id,name')
            ->when($search !== '', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($categoryId > 0, fn ($query) => $query->where('category_id', $categoryId))
            ->when($status === 'out', fn ($query) => $query->where('stock', 0))
            ->when($status === 'low', fn ($query) => $query->where('stock', '>', 0)->whereColumn('stock', '<=', 'min_stock'))
            ->when($status === 'in', fn ($query) => $query->whereColumn('stock', '>', 'min_stock'))
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'category' => $product->category->name ?? 'Uncategorized',
                'category_id' => $product->category_id,
                'min_stock' => $product->min_stock,
                'image_url' => $product->image_path ? Storage::url($product->image_path) : null,
                'status' => $product->stock === 0 ? 'Out of Stock' : ($product->stock <= $product->min_stock ? 'Low Stock' : 'In Stock'),
            ]);

        return Inertia::render('Inventory/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId ?: '',
                'status' => $status,
            ],
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT FORM
    |--------------------------------------------------------------------------
    */

    public function create()
    {
        return Inertia::render('Inventory/AddProduct', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category:id,name');

        return Inertia::render('Inventory/ProductDetails', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'stock' => $product->stock,
                'min_stock' => $product->min_stock,
                'category' => $product->category->name ?? 'Uncategorized',
                'image_url' => $product->image_path ? Storage::url($product->image_path) : null,
                'status' => $product->stock === 0 ? 'Out of Stock' : ($product->stock <= $product->min_stock ? 'Low Stock' : 'In Stock'),
            ],
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
            'min_stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('products', 'public');
        }
        unset($validated['image']);

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
        return Inertia::render('Inventory/EditProduct', [
            'product' => array_merge($product->only(['id', 'name', 'category_id', 'stock', 'min_stock']), [
                'image_url' => $product->image_path ? Storage::url($product->image_path) : null,
            ]),
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
            'min_stock' => ['required', 'integer', 'min:0'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('products', 'public');
        }
        unset($validated['image']);

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
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return redirect()
            ->route('inventory.index')
            ->with('success', 'Product deleted successfully.');
    }
}