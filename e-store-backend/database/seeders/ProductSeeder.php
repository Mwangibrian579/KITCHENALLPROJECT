<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run(): void
{
    $cat = \App\Models\Category::create(['name' => 'Electronics']);

    \App\Models\Product::create([
        'category_id' => $cat->id,
        'name' => 'Sample Smartphone',
        'description' => 'A high-quality mobile device.',
        'price' => 25000.00,
        'stock_quantity' => 10
    ]);
}
}
