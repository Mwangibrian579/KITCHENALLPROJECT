<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'description', 'price', 'stock_quantity', 'image_url'];

    /**
     * Get the category that owns the product.
     * This fulfills the 'Product Categories' requirement of your contract.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}