<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // These fields must match your migration exactly
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price'
    ];

    /**
     * Relationship: Get the product associated with this item.
     * Usage: $orderItem->product->name
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Relationship: Link back to the main order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}