@extends('layouts.admin')

@section('content')
<style>
    /* Reusing your Premium Aesthetics */
    .admin-container {
        max-width: 1200px;
        margin: 20px auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: 1px solid #e5e5e5;
        overflow: hidden;
    }
    
    .top-nav {
        background: white;
        padding: 16px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
    }

    .nav-breadcrumb { font-size: 13px; color: #666; display: flex; gap: 8px; }
    .nav-breadcrumb a { color: #1E90FF; text-decoration: none; font-weight: 600; }

    .header-section { padding: 24px 32px; border-bottom: 1px solid #e5e5e5; }
    .header-section h2 { font-size: 18px; font-weight: 600; color: #1a1a1a; }
    
    .custom-table { width: 100%; border-collapse: collapse; }
    .custom-table th {
        text-align: left;
        padding: 12px 24px;
        background: #fafafa;
        font-size: 11px;
        font-weight: 700;
        color: #666;
        text-transform: uppercase;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .custom-table td { padding: 16px 24px; border-bottom: 1px solid #f0f0f0; font-size: 14px; }

    /* Order specific styles */
    .status-badge {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
    }
    .status-pending { background: #fff7ed; color: #9a3412; }
    .status-paid { background: #f0fdf4; color: #166534; }
    .status-shipped { background: #eff6ff; color: #1e40af; }

    .item-list { font-size: 12px; color: #666; margin-top: 4px; }
</style>

<nav class="top-nav">
    <div class="nav-breadcrumb">
        <a href="{{ route('admin.dashboard') }}">Dashboard</a> 
        <span>/</span> 
        <span>Orders</span>
    </div>
    <span style="font-size: 12px; font-weight: 700; color: #666;">SALES LOG</span>
</nav>

<div class="admin-container">
    <div class="header-section">
        <h2>Order Management</h2>
        <p>Monitor customer purchases and update fulfillment status</p>
    </div>
    
    <table class="custom-table">
        <thead>
            <tr>
                <th>Order ID & Customer</th>
                <th>Products Ordered</th>
                <th>Total Price</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>
                    <div style="font-weight: 600; color: #1a1a1a;">#{{ $order->id }}</div>
                    <div style="font-size: 13px; color: #666;">{{ $order->user->name }}</div>
                </td>
                <td>
                    @foreach($order->items as $item)
                        <div class="item-list">
                            • {{ $item->product->name ?? 'Deleted Product' }} 
                            <span style="font-weight: 700;">(x{{ $item->quantity }})</span>
                        </div>
                    @endforeach
                </td>
                <td style="font-weight: 700; color: #1a1a1a;">
                    KES {{ number_format($order->total_price) }}
                </td>
                <td>
                    <span class="status-badge status-{{ strtolower($order->status) }}">
                        {{ $order->status }}
                    </span>
                </td>
                <td style="text-align: right;">
                    <form action="{{ route('admin.orders.updateStatus', $order->id) }}" method="POST" style="display: inline-flex; gap: 5px;">
                        @csrf @method('PATCH')
                        <select name="status" onchange="this.form.submit()" style="padding: 5px; font-size: 12px; border-radius: 6px; border: 1px solid #d1d5db;">
                            <option value="Pending" {{ $order->status == 'Pending' ? 'selected' : '' }}>Pending</option>
                            <option value="Paid" {{ $order->status == 'Paid' ? 'selected' : '' }}>Paid</option>
                            <option value="Shipped" {{ $order->status == 'Shipped' ? 'selected' : '' }}>Shipped</option>
                            <option value="Delivered" {{ $order->status == 'Delivered' ? 'selected' : '' }}>Delivered</option>
                        </select>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    
    <div style="padding: 20px; border-top: 1px solid #e5e5e5; background: #fafafa;">
        {{ $orders->links() }}
    </div>
</div>
@endsection