<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product; 

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index()
    {
        return response()->json(Product::orderBy('created_at', 'desc')->get());
    }
    
    /**
     * Store a new product.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'             => 'required|string|max:255',
            'price'            => 'required|numeric',
            'original_price'   => 'nullable|numeric', 
            'subcategory_slug' => 'required|string', 
            'category'         => 'nullable|string',
            'description'      => 'nullable|string',
            'image_url'        => 'nullable|string',
            'stock_quantity'   => 'nullable|integer'
        ]);

        $product = Product::create($validatedData);

        return response()->json([
            'message' => 'Product successfully added!',
            'product' => $product
        ], 201);
    }

    /**
     * THE MISSING METHOD: Update an existing product.
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // We use 'sometimes' so you only have to send the fields you want to change
        $validatedData = $request->validate([
            'name'             => 'sometimes|required|string|max:255',
            'price'            => 'sometimes|required|numeric',
            'original_price'   => 'nullable|numeric', 
            'subcategory_slug' => 'sometimes|required|string', 
            'category'         => 'nullable|string',
            'description'      => 'nullable|string',
            'image_url'        => 'nullable|string',
            'stock_quantity'   => 'nullable|integer'
        ]);

        $product->update($validatedData);

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product
        ], 200);
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}