@extends('layouts.admin')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold">Inventory</h2>
    <a href="{{ route('admin.products.create') }}" class="btn btn-primary">+ Add New Product</a>
</div>

@if(session('success'))
    <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endif

<div class="card border-0 shadow-sm">
    <div class="card-body p-0"> <table class="table align-middle mb-0">
            <thead class="bg-light">
                <tr>
                    <th class="ps-4">Product</th>
                    <th>Category & Sub</th>
                    <th>Pricing (KES)</th>
                    <th>Stock</th>
                    <th class="text-end pe-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($products as $product)
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center">
                            @if($product->image_url)
                                <img src="{{ $product->image_url }}" alt="Product" class="rounded me-3" style="width: 45px; height: 45px; object-fit: cover; border: 1px solid #eee;">
                            @else
                                <div class="bg-light rounded me-3 d-flex align-items-center justify-content-center text-muted" style="width: 45px; height: 45px; font-size: 10px;">No Img</div>
                            @endif
                            <div>
                                <h6 class="mb-0 fw-bold">{{ $product->name }}</h6>
                                <small class="text-muted">{{ $product->brand ?? 'Generic' }}</small>
                            </div>
                        </div>
                    </td>

                    <td>
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle">{{ $product->category }}</span><br>
                        <small class="text-info" style="font-size: 0.75rem;">{{ $product->subcategory_slug }}</small>
                    </td>

                    <td>
                        <span class="fw-bold text-dark">{{ number_format($product->price) }}</span>
                        @if($product->original_price)
                            <br>
                            <small class="text-decoration-line-through text-muted" style="font-size: 0.8rem;">
                                {{ number_format($product->original_price) }}
                            </small>
                        @endif
                    </td>

                    <td>
                        @if($product->stock_quantity <= 0)
                            <span class="text-danger fw-bold">Out of stock</span>
                        @elseif($product->stock_quantity < 5)
                            <span class="text-warning fw-bold">{{ $product->stock_quantity }} Left</span>
                        @else
                            <span class="text-success">{{ $product->stock_quantity }}</span>
                        @endif
                    </td>

                    <td class="text-end pe-4">
                        <div class="d-flex justify-content-end gap-2">
                            <a href="{{ route('admin.products.edit', $product->id) }}" class="btn btn-sm btn-outline-primary">
                                <i class="bi bi-pencil"></i> Edit
                            </a>
                            
                            <form action="{{ route('admin.products.destroy', $product->id) }}" method="POST" onsubmit="return confirm('Delete this product permanently?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-outline-danger">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

<div class="mt-4">
    {{ $products->links() }}
</div>
@endsection