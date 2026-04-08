@extends('layouts.admin')

@section('content')
<div class="container-fluid">
    <h2 class="mb-4 fw-bold">Dashboard Overview</h2>

    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card p-3 shadow-sm border-0 bg-white text-center">
                <p class="text-muted mb-1">Total Products</p>
                <h3 class="fw-bold" style="color: #1E90FF;">{{ $totalProducts }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm border-0 bg-white text-center">
                <p class="text-muted mb-1">Total Orders</p>
                <h3 class="fw-bold" style="color: #1E90FF;">{{ $totalOrders }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm border-0 bg-white text-center">
                <p class="text-muted mb-1">Total Customers</p>
                <h3 class="fw-bold" style="color: #1E90FF;">{{ $totalCustomers }}</h3>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card p-3 shadow-sm border-0 bg-white text-center">
                <p class="text-muted mb-1">Total Revenue</p>
                <h3 class="fw-bold" style="color: #1E90FF;">${{ number_format($totalRevenue, 2) }}</h3>
            </div>
        </div>
    </div>

    <div class="card shadow-sm border-0">
        <div class="card-body">
            <h5 class="fw-bold mb-3">Recent Orders</h5>
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($recentOrders as $order)
                    <tr>
                        <td>#{{ $order->id }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>${{ number_format($order->total_price, 2) }}</td>
                        <td><span class="badge bg-info">{{ $order->status }}</span></td>
                        <td>{{ $order->created_at->format('M d, Y') }}</td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="text-center text-muted">No orders found.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection