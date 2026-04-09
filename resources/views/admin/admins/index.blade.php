@extends('layouts.admin')

@section('content')
<nav class="top-nav" style="background: white; padding: 16px 40px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center;">
    <div class="nav-breadcrumb" style="font-size: 13px;">
        <a href="{{ route('admin.dashboard') }}" style="color: #1E90FF; font-weight: 600; text-decoration: none;">Dashboard</a> 
        <span style="color: #666;"> / </span>
        <span style="color: #666;">Admin Management</span>
    </div>
    <a href="{{ route('admin.manage.create') }}" class="btn-action btn-outline" style="background: #1E90FF; color: white; border: none; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12px;">
        + Add New Admin
    </a>
</nav>

<div class="admin-container" style="max-width: 1200px; margin: 20px auto; background: white; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden;">
    <div class="header-section" style="padding: 24px 32px; border-bottom: 1px solid #e5e5e5;">
        <h2 style="font-size: 18px; font-weight: 700;">System Administrators</h2>
        <p style="color: #666; font-size: 14px;">Total active staff: {{ $admins->count() }}</p>
    </div>

    @if(session('success'))
        <div style="padding: 15px 32px; background: #dcfce7; color: #166534; font-size: 14px; font-weight: 600;">
            ✅ {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div style="padding: 15px 32px; background: #fef2f2; color: #991b1b; font-size: 14px; font-weight: 600;">
            ❌ {{ session('error') }}
        </div>
    @endif

    <table class="custom-table" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="background: #fafafa; border-bottom: 1px solid #e5e5e5;">
                <th style="text-align: left; padding: 12px 24px; font-size: 11px; color: #888; text-transform: uppercase;">Name</th>
                <th style="text-align: left; padding: 12px 24px; font-size: 11px; color: #888; text-transform: uppercase;">Email</th>
                <th style="text-align: left; padding: 12px 24px; font-size: 11px; color: #888; text-transform: uppercase;">Role</th>
                <th style="text-align: left; padding: 12px 24px; font-size: 11px; color: #888; text-transform: uppercase;">Account Created</th>
                <th style="text-align: right; padding: 12px 24px; font-size: 11px; color: #888; text-transform: uppercase;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($admins as $admin)
            <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px 24px;">
                    <div style="display: flex; align-items: center;">
                        <div class="user-avatar" style="width: 32px; height: 32px; background: #f3e8ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: #6b21a5; font-weight: 700; font-size: 12px;">
                            {{ strtoupper(substr($admin->name, 0, 2)) }}
                        </div>
                        <span style="font-weight: 600;">{{ $admin->name }}</span>
                    </div>
                </td>
                <td style="padding: 16px 24px; color: #666;">{{ $admin->email }}</td>
                <td style="padding: 16px 24px;">
                    <span class="role-badge role-admin" style="background: #f3e8ff; color: #6b21a5; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;">
                        {{ $admin->role }}
                    </span>
                </td>
                <td style="padding: 16px 24px; color: #999; font-size: 13px;">
                    {{ $admin->created_at ? $admin->created_at->format('M d, Y') : 'N/A' }}
                </td>
                <td style="padding: 16px 24px; text-align: right;">
                    @if(auth()->guard('admin')->id() !== $admin->id)
                    <form action="{{ route('admin.manage.destroy', $admin->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to remove this administrator? This action cannot be undone.');" style="display: inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" style="background: none; border: 1px solid #fecaca; color: #dc2626; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='none'">
                            DELETE
                        </button>
                    </form>
                    @else
                    <span style="font-size: 11px; color: #ccc; font-style: italic;">(Active Account)</span>
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection