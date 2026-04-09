@extends('layouts.admin')

@section('content')
<style>
    .form-container {
        max-width: 600px;
        margin: 40px auto;
        background: white;
        padding: 40px;
        border-radius: 12px;
        border: 1px solid #e5e5e5;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .form-group { margin-bottom: 20px; }
    .form-group label { 
        display: block; 
        font-size: 12px; 
        font-weight: 700; 
        text-transform: uppercase; 
        color: #666; 
        margin-bottom: 8px;
    }
    .form-control {
        width: 100%;
        padding: 12px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 14px;
    }
    .btn-save {
        background: #1E90FF;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        width: 100%;
        transition: 0.2s;
    }
    .btn-save:hover { background: #1C86EE; }
</style>

<nav class="top-nav" style="background: white; padding: 16px 40px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between;">
    <div class="nav-breadcrumb" style="font-size: 13px;">
        <a href="{{ route('admin.dashboard') }}" style="color: #1E90FF; font-weight: 600; text-decoration: none;">Dashboard</a> 
        <span style="color: #666;"> / </span>
        <a href="{{ route('admin.manage.index') }}" style="color: #1E90FF; font-weight: 600; text-decoration: none;">Admins</a>
        <span style="color: #666;"> / Create</span>
    </div>
</nav>

<div class="form-container">
    <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #1a1a1a;">Add New Administrator</h2>
    
    <form action="{{ route('admin.manage.store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label>Full Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Stanley Kaguru" required>
        </div>

        <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" class="form-control" placeholder="admin@kitchenall.com" required>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control" required>
        </div>

        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="password_confirmation" class="form-control" required>
        </div>

        <button type="submit" class="btn-save">Authorize New Admin</button>
    </form>
</div>
@endsection