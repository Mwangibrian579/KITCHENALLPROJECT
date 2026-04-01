<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController; // Required to use the controller

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Existing route for authenticated user data (used for Admin Dashboard login later)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- YOUR NEW E-COMMERCE ROUTES ---

/**
 * Fetch all products with their categories
 * This is used to display the Product Pages on the frontend.
 * Targeted Contract Milestone: Essential Pages (KSH 4,000)
 */
Route::get('/products', [ProductController::class, 'index']);

/**
 * Fetch a single product by its ID
 * Useful for the detailed product view page.
 */
Route::get('/products/{id}', [ProductController::class, 'show']);