@extends('layouts.admin')

@section('content')
<style>
    /* Your Premium Aesthetics */
    .admin-container {
        max-width: 1200px;
        margin: 20px auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e5e5e5;
        overflow: hidden;
    }
    
    /* Top Navbar Style */
    .top-nav {
        background: white;
        padding: 16px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
    }

    .nav-breadcrumb {
        font-size: 13px;
        color: #666;
        display: flex;
        gap: 8px;
    }

    .nav-breadcrumb a {
        color: #1E90FF;
        text-decoration: none;
        font-weight: 600;
    }

    .header-section {
        padding: 24px 32px;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .header-section h2 {
        font-size: 20px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 4px;
    }
    
    .header-section p {
        font-size: 14px;
        color: #666;
    }
    
    /* Table Styling */
    .custom-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .custom-table th {
        text-align: left;
        padding: 14px 24px;
        background: #fafafa;
        font-size: 11px;
        font-weight: 700;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .custom-table td {
        padding: 18px 24px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
        color: #333;
    }
    
    .custom-table tr:hover {
        background: #f9fafb;
    }
    
    /* Elements */
    .user-avatar {
        width: 38px;
        height: 38px;
        background: #eef2ff;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        color: #4338ca;
        margin-right: 12px;
        border: 1px solid #e0e7ff;
    }
    
    .role-badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .role-admin { background: #f3e8ff; color: #6b21a5; }
    .role-user { background: #e0e7ff; color: #1e40af; }
    
    .action-btns {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
    
    .btn-action {
        padding: 7px 15px;
        font-size: 12px;
        font-weight: 600;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s;
        text-decoration: none;
    }

    .btn-outline {
        border: 1px solid #d1d5db;
        background: white;
        color: #374151;
    }

    .btn-outline:hover { background: #f9fafb; border-color: #9ca3af; }

    .btn-danger-outline {
        border: 1px solid #fecaca;
        background: white;
        color: #dc2626;
    }

    .btn-danger-outline:hover { background: #fef2f2; border-color: #f87171; }
</style>

<nav class="top-nav">
    <div class="nav-breadcrumb">
        <a href="{{ route('admin.dashboard') }}">Dashboard</a> 
        <span>/</span> 
        <span>Customers</span>
    </div>
    <div class="user-profile">
        <span style="font-size: 12px; font-weight: 700; color: #666;">ADMIN PANEL V1.0</span>
    </div>
</nav>

<div class="admin-container">
    <div class="header-section">
        <h2>Customer Directory</h2>
        <p>Manage access levels and profiles for {{ $customers->total() }} members</p>
    </div>
    
    <table class="custom-table">
        <thead>
            <tr>
                <th>Customer</th>
                <th>Access Level</th>
                <th>Email Address</th>
                <th>Registration</th>
                <th style="text-align: right;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($customers as $customer)
            <tr>
                <td>
                    <div style="display: flex; align-items: center;">
                        <div class="user-avatar">{{ strtoupper(substr($customer->name, 0, 2)) }}</div>
                        <span style="font-weight: 600; color: #1a1a1a;">{{ $customer->name }}</span>
                    </div>
                </td>
                <td>
                    <span class="role-badge {{ $customer->role === 'admin' ? 'role-admin' : 'role-user' }}">
                        {{ $customer->role ?? 'user' }}
                    </span>
                </td>
                <td style="color: #666;">{{ $customer->email }}</td>
                <td style="color: #999; font-size: 13px;">{{ $customer->created_at->format('M d, Y') }}</td>
                <td>
                    <div class="action-btns">
                        <form action="{{ route('admin.customers.updateRole', $customer->id) }}" method="POST">
                            @csrf @method('PATCH')
                            <input type="hidden" name="role" value="{{ $customer->role === 'admin' ? 'user' : 'admin' }}">
                            <button type="submit" class="btn-action btn-outline">Toggle Role</button>
                        </form>
                        
                        <form action="{{ route('admin.customers.delete', $customer->id) }}" method="POST" onsubmit="return confirm('Delete this user permanently?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn-action btn-danger-outline">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <div style="padding: 20px; border-top: 1px solid #e5e5e5; background: #fafafa;">
        {{ $customers->links() }}
    </div>
</div>
@endsection