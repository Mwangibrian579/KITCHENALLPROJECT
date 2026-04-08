<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Models\Admin;
use App\Models\User;
use App\Models\Product;

/*
|--------------------------------------------------------------------------
| Public Routes (For Next.js Frontend)
|--------------------------------------------------------------------------
*/

// Fetch products with optional category filtering
Route::get('/products', function (Request $request) {
    $query = Product::query();

    // Filter by category if provided in URL: /api/products?category=Cooking
    if ($request->has('category')) {
        $query->where('category', $request->category);
    }

    // Filter by subcategory if provided: /api/products?subcategory=Bakery
    if ($request->has('subcategory')) {
        $query->where('subcategory_slug', $request->subcategory);
    }

    // Return JSON directly to Next.js
    return response()->json($query->latest()->get());
});

// Fetch a single product detail
Route::get('/products/{id}', function ($id) {
    $product = Product::find($id);
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }
    return response()->json($product);
});

// Auth Routes
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);


/*
|--------------------------------------------------------------------------
| Protected Routes (Sanctum Required)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    
    // 1. DASHBOARD OVERVIEW
    Route::get('/admin/stats', function() {
        return response()->json([
            'products' => Product::count(),
            'users'    => User::count(),
            'admins'   => Admin::count(),
            'low_stock'=> Product::where('stock_quantity', '<', 5)->count(),
        ]);
    });

    // 2. ADMIN MANAGEMENT
    Route::prefix('admin')->group(function () {
        Route::get('/list', function() {
            return Admin::orderBy('id', 'desc')->get();
        });

        Route::post('/register', function(Request $request) {
            $data = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:admins',
                'password' => 'required|min:6',
                'role' => 'required|string'
            ]);

            return Admin::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => $data['role'],
            ]);
        });

        Route::delete('/{id}', function($id) {
            Admin::findOrFail($id)->delete();
            return response()->json(['message' => 'Admin deleted successfully']);
        });
    });

    // 3. USER MANAGEMENT
    Route::prefix('users')->group(function () {
        Route::get('/', function() {
            return User::orderBy('id', 'desc')->get();
        });
        Route::delete('/{id}', function($id) {
            User::findOrFail($id)->delete();
            return response()->json(['message' => 'User deleted successfully']);
        });
    });

    // 4. PRODUCT MANAGEMENT (For API-based Warehouse Apps)
    Route::prefix('manage-products')->group(function () {
        // We use closure here to ensure it always returns JSON, 
        // unlike the ProductController@index which returns a View.
        Route::get('/', function() {
            return Product::latest()->get();
        });
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
});

// --------------------------------------
// 5. ENQUIRY ROUTE (Public API for Next.js)
// --------------------------------------
use App\Http\Controllers\EnquiryController;

Route::post('/enquiry', [EnquiryController::class, 'store']);