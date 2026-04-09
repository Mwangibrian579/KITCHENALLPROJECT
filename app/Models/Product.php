<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

protected $fillable = [
    'name', 
    'brand', 
    'description', 
    'price', 
    'original_price', 
    'stock_quantity', 
    'category', 
    'subcategory_slug', // <--- Add this line here
    'image_url'
];

    /**
     * Boot the model to handle automatic subcategory generation.
     */
    protected static function booted()
    {
        static::saving(function ($product) {
            // Auto-generate subcategory if it's currently empty
            if (empty($product->subcategory_slug)) {
                $product->subcategory_slug = self::generateSubCategorySlug($product);
            }
        });
    }

    /**
     * Maps product details to the specific subcategories used in the Next.js frontend.
     */
    private static function generateSubCategorySlug($product)
    {
        // Search across name, category, and description for keywords
        $search = strtolower($product->name . ' ' . $product->category . ' ' . $product->description);

        return match (true) {
            // 1. COOKING
            str_contains($search, 'bakery') => 'Bakery Appliances',
            str_contains($search, 'burner') || str_contains($search, 'jiko') || str_contains($search, 'stove') => 'Burners/Jikos/Stoves',
            str_contains($search, 'oven') || str_contains($search, 'cooking') => 'Cooking Appliances',
            str_contains($search, 'small') || str_contains($search, 'egg') => 'Small Appliances',

            // 2. REFRIGERATION
            str_contains($search, 'fridge') || str_contains($search, 'chiller') || str_contains($search, 'freezer') || str_contains($search, 'large') => 'Large Appliances',
            str_contains($search, 'hotel') && $product->category === 'Refrigeration' => 'Hotel Appliances',
            str_contains($search, 'office') => 'Office Kitchen',

            // 3. FOOD PREP
            str_contains($search, 'butchery') || str_contains($search, 'meat') => 'Butchery Equipment',
            str_contains($search, 'processor') || str_contains($search, 'blender') || str_contains($search, 'mixer') => 'Food Processors',
            str_contains($search, 'scale') || str_contains($search, 'measure') => 'Measuring Tools/Scales',
            str_contains($search, 'home') => 'Home Kitchen',

            // 4. STAINLESS STEEL
            str_contains($search, 'juakali') || str_contains($search, 'fabrication') => 'Juakali Fabrications',
            str_contains($search, 'hotel') && $product->category === 'Stainless Steel' => 'Hotel Appliances',

            // 5. MEDICAL & INSTITUTIONAL
            str_contains($search, 'mortuary') || str_contains($search, 'body') => 'Mortuary Equipment',
            str_contains($search, 'hospital') || str_contains($search, 'clinic') || str_contains($search, 'medical') => 'Hospital Utility',
            str_contains($search, 'clean') || str_contains($search, 'sanitize') || str_contains($search, 'soap') => 'Cleaning & Sanitation',

            // DEFAULT: Fallback to the Main Category name if no sub-keyword matches
            default => $product->category ?: 'General Equipment',
        };
    }

    /**
     * Relationship: Link back to orders
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}