<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // READ: Display all customers
    public function index()
    {
        $customers = User::orderBy('id', 'asc')->paginate(10);
        return view('admin.customers.index', compact('customers'));
    }

    // DELETE: Remove a customer
    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'Customer account removed successfully.');
    }

    // UPDATE: Toggle User Role (e.g., User to Admin)
    public function updateRole(Request $request, User $user)
    {
        $user->update(['role' => $request->role]);
        return back()->with('success', 'User role updated.');
    }
}