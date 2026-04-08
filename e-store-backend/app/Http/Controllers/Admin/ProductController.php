<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        // Paginate to handle large lists efficiently
        $products = Product::latest()->paginate(10);
        return view('admin.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return view('admin.products.create');
    }

    /**
     * Store a newly created product in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'brand'            => 'nullable|string',
            'price'            => 'required|numeric',
            'original_price'   => 'nullable|numeric',
            'category'         => 'required|string',
            // Changed to nullable so the Model's booted() method can auto-generate it
            'subcategory_slug' => 'nullable|string', 
            'stock_quantity'   => 'required|integer',
            'description'      => 'nullable|string',
            // Changed from 'url' to 'string' to allow long Base64 image data
            'image_url'        => 'nullable|string', 
        ]);

        Product::create($validated);

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product added successfully!');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('admin.products.edit', compact('product'));
    }

    /**
     * Update the specified product in the database.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'brand'            => 'nullable|string',
            'price'            => 'required|numeric',
            'original_price'   => 'nullable|numeric',
            'category'         => 'required|string',
            'subcategory_slug' => 'nullable|string', 
            'stock_quantity'   => 'required|integer',
            'description'      => 'nullable|string',
            'image_url'        => 'nullable|string', 
        ]);

        $product->update($validated);

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product from the database.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('admin.products.index')
                         ->with('success', 'Product deleted successfully!');
    }
}