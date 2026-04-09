<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminManagementController extends Controller
{
    /**
     * List all administrators
     */
    public function index() 
    {
        $admins = Admin::all();
        return view('admin.admins.index', compact('admins'));
    }

    /**
     * Show the form for creating a new administrator
     */
    public function create() 
    {
        return view('admin.admins.create');
    }

    /**
     * Store a newly created administrator in storage
     */
    public function store(Request $request) 
    {
        // Validation - redirects back automatically with errors if it fails
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:8|confirmed',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'Admin', // Default role
        ]);

        return redirect()->route('admin.manage.index')->with('success', 'New Admin added successfully!');
    }

    /**
     * Remove the specified administrator from storage
     */
    public function destroy($id)
    {
        // Find the admin or fail with a 404
        $admin = Admin::findOrFail($id);

        // Security check: Prevent the currently logged-in admin from deleting themselves
        if (Auth::guard('admin')->id() == $admin->id) {
            return back()->with('error', 'You cannot delete your own account while logged in.');
        }

        // Perform the deletion
        $admin->delete();

        return redirect()->route('admin.manage.index')->with('success', 'Administrator removed successfully.');
    }
}