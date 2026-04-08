<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\AdminManagementController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'login'])->name('admin.login.submit');
    Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
});

/*
|--------------------------------------------------------------------------
| Protected Admin Panel Routes (Requires Login)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:admin'])->prefix('admin')->group(function () {

    // 1. Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // 2. Products Management (CRUD)
    Route::get('/products', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('admin.products.destroy');

    // 3. Customer Management
    Route::get('/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
    Route::patch('/customers/{user}/role', [CustomerController::class, 'updateRole'])->name('admin.customers.updateRole');
    Route::delete('/customers/{user}', [CustomerController::class, 'destroy'])->name('admin.customers.delete');

    // 4. Order Management
    Route::get('/orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.updateStatus');

    // 5. Admin Staff Management
    Route::get('/manage-admins', [AdminManagementController::class, 'index'])->name('admin.manage.index');
    Route::get('/manage-admins/create', [AdminManagementController::class, 'create'])->name('admin.manage.create');
    Route::post('/manage-admins', [AdminManagementController::class, 'store'])->name('admin.manage.store');
    // ADDED: Delete Route
    Route::delete('/manage-admins/{admin}', [AdminManagementController::class, 'destroy'])->name('admin.manage.destroy');

});