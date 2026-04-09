@extends('layouts.admin')

@section('content')
<div class="container" style="max-width: 900px;">
    <h2 class="fw-bold mb-4">Edit Product: {{ $product->name }}</h2>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <form action="{{ route('admin.products.update', $product->id) }}" method="POST">
                @csrf
                @method('PUT') <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Product Name</label>
                        <input type="text" name="name" class="form-control" value="{{ $product->name }}" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Brand</label>
                        <input type="text" name="brand" class="form-control" value="{{ $product->brand }}">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Main Category</label>
                        <select id="main-category" name="category" class="form-select" required onchange="updateSubcategories()">
                            <option value="Cooking" {{ $product->category == 'Cooking' ? 'selected' : '' }}>Cooking</option>
                            <option value="Refrigeration" {{ $product->category == 'Refrigeration' ? 'selected' : '' }}>Refrigeration</option>
                            <option value="Food Prep" {{ $product->category == 'Food Prep' ? 'selected' : '' }}>Food Prep</option>
                            <option value="Stainless Steel" {{ $product->category == 'Stainless Steel' ? 'selected' : '' }}>Stainless Steel</option>
                            <option value="Medical & Institutional" {{ $product->category == 'Medical & Institutional' ? 'selected' : '' }}>Medical & Institutional</option>
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Sub Category</label>
                        <select id="sub-category" name="subcategory_slug" class="form-select" required>
                            <option value="{{ $product->subcategory_slug }}" selected>{{ $product->subcategory_slug }}</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Selling Price (KES)</label>
                        <input type="number" step="0.01" name="price" class="form-control" value="{{ $product->price }}" required>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Original Price</label>
                        <input type="number" step="0.01" name="original_price" class="form-control" value="{{ $product->original_price }}">
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Stock Quantity</label>
                        <input type="number" name="stock_quantity" class="form-control" value="{{ $product->stock_quantity }}" required>
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-semibold">Product Image URL</label>
                        <input type="url" name="image_url" class="form-control" value="{{ $product->image_url }}">
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" class="form-control" rows="3">{{ $product->description }}</textarea>
                    </div>

                    <div class="col-12 mt-4">
                        <button type="submit" class="btn btn-success w-100 py-3 fw-bold">Update Product</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    const subcats = {
        "Cooking": ["Bakery Appliances", "Burners/Jikos/Stoves", "Cooking Appliances", "Small Appliances"],
        "Refrigeration": ["Large Appliances", "Hotel Appliances", "Office Kitchen"],
        "Food Prep": ["Butchery Equipment", "Food Processors", "Measuring Tools/Scales", "Home Kitchen"],
        "Stainless Steel": ["Juakali Fabrications", "Hotel Appliances"],
        "Medical & Institutional": ["Mortuary Equipment", "Hospital Utility", "Cleaning & Sanitation"]
    };

    function updateSubcategories() {
        const mainCat = document.getElementById('main-category').value;
        const subCatSelect = document.getElementById('sub-category');
        subCatSelect.innerHTML = '<option value="" selected disabled>Select Subcategory</option>';

        if (subcats[mainCat]) {
            subcats[mainCat].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                subCatSelect.appendChild(option);
            });
        }
    }
</script>
@endsection