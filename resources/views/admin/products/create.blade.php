@extends('layouts.admin')

@section('content')
<div class="container" style="max-width: 900px;">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Add New Product</h2>
        <a href="{{ route('admin.products.index') }}" class="btn btn-outline-secondary btn-sm">View Inventory</a>
    </div>
    
    <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
            <form action="{{ route('admin.products.store') }}" method="POST">
                @csrf
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Product Name</label>
                        <input type="text" name="name" class="form-control" placeholder="e.g. 2-Door Display Chiller" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Brand</label>
                        <input type="text" name="brand" class="form-control" placeholder="e.g. Ramtons">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Main Category</label>
                        <select id="main-category" name="category" class="form-select" required onchange="updateSubcategories()">
                            <option value="" selected disabled>Select Main Category</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Refrigeration">Refrigeration</option>
                            <option value="Food Prep">Food Prep</option>
                            <option value="Stainless Steel">Stainless Steel</option>
                            <option value="Medical & Institutional">Medical & Institutional</option>
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Sub Category</label>
                        <select id="sub-category" name="subcategory_slug" class="form-select" required>
                            <option value="" selected disabled>Select Main First</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Selling Price (KES)</label>
                        <input type="number" step="0.01" name="price" class="form-control" placeholder="0.00" required>
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Original Price (Strike-through)</label>
                        <input type="number" step="0.01" name="original_price" class="form-control" placeholder="0.00">
                    </div>

                    <div class="col-md-4">
                        <label class="form-label fw-semibold">Stock Quantity</label>
                        <input type="number" name="stock_quantity" class="form-control" value="1" required>
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-semibold">Product Image URL</label>
                        <input type="url" name="image_url" class="form-control" placeholder="https://example.com/image.jpg">
                        <small class="text-muted">Paste the direct link to an image from the web.</small>
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" class="form-control" rows="3" placeholder="Enter product details..."></textarea>
                    </div>

                    <div class="col-12 mt-4">
                        <button type="submit" class="btn btn-primary w-100 py-3 fw-bold">🚀 Save Product</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    // These match your navCategories list exactly
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
        
        // Reset subcategory dropdown
        subCatSelect.innerHTML = '<option value="" selected disabled>Select Subcategory</option>';

        if (subcats[mainCat]) {
            subcats[mainCat].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub; // This saves the readable name to 'subcategory_slug'
                option.textContent = sub;
                subCatSelect.appendChild(option);
            });
        }
    }
</script>
@endsection