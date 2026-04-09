<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'status'
    ];

    /**
     * Relationship: Link to the customer who made the order.
     * Usage: $order->user->name
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: An order contains many items.
     * Usage: $order->items
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}