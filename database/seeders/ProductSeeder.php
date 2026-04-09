<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // To avoid duplicates if you run this multiple times
        // Product::truncate(); 

        $inventory = [
            // 1. COOKING
            'Cooking' => [
                'Bakery Appliances' => [
                    ['name' => 'Industrial Deck Oven', 'old' => 210000, 'new' => 185000, 'img' => 'https://images.unsplash.com/photo-1581339399838-2a120c18bba3?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Rotary Oven (Large)', 'old' => 450000, 'new' => 395000, 'img' => 'https://images.unsplash.com/photo-1595435934249-5df760a0c842?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Stone Pizza Oven', 'old' => 120000, 'new' => 95000, 'img' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Planetary Dough Mixer', 'old' => 95000, 'new' => 78000, 'img' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Dough Sheeter / Divider', 'old' => 280000, 'new' => 245000, 'img' => 'https://images.pexels.com/photos/4553127/pexels-photo-4553127.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Professional Bread Prover', 'old' => 85000, 'new' => 72000, 'img' => 'https://images.pexels.com/photos/2062427/pexels-photo-2062427.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Electric Bread Slicer', 'old' => 65000, 'new' => 55000, 'img' => 'https://images.pexels.com/photos/4110250/pexels-photo-4110250.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Burners / Jikos / Stoves' => [
                    ['name' => 'Commercial Gas Burner', 'old' => 25000, 'new' => 19500, 'img' => 'https://images.unsplash.com/photo-1522338140262-f46f591261c2?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Single Stock Pot Stove', 'old' => 32000, 'new' => 28000, 'img' => 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Industrial Charcoal Grill', 'old' => 45000, 'new' => 38500, 'img' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Heavy Duty 4-Range Cooker', 'old' => 165000, 'new' => 145000, 'img' => 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Induction Cooker (Pro)', 'old' => 18000, 'new' => 14500, 'img' => 'https://images.pexels.com/photos/3994751/pexels-photo-3994751.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Cooking Appliances' => [
                    ['name' => 'Double Tank Chips Fryer', 'old' => 35000, 'new' => 29500, 'img' => 'https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Pressure Fryer', 'old' => 185000, 'new' => 165000, 'img' => 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Countertop Griddle', 'old' => 42000, 'new' => 35000, 'img' => 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Salamander Grill', 'old' => 48000, 'new' => 41000, 'img' => 'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Rotisserie Shawarma Machine', 'old' => 110000, 'new' => 95000, 'img' => 'https://images.pexels.com/photos/5953561/pexels-photo-5953561.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Industrial Bain Marie', 'old' => 45000, 'new' => 39000, 'img' => 'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Industrial Rice Cooker', 'old' => 22000, 'new' => 18500, 'img' => 'https://images.pexels.com/photos/4057692/pexels-photo-4057692.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Pasta Boiler', 'old' => 65000, 'new' => 55000, 'img' => 'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Small Appliances' => [
                    ['name' => 'Commercial Blender', 'old' => 15000, 'new' => 12500, 'img' => 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Industrial Microwave', 'old' => 38000, 'new' => 32000, 'img' => 'https://images.unsplash.com/photo-1574706191524-1b4171b87d3e?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Commercial Waffle Maker', 'old' => 12000, 'new' => 9500, 'img' => 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Espresso Coffee Machine', 'old' => 250000, 'new' => 220000, 'img' => 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Ice Cream Machine', 'old' => 185000, 'new' => 165000, 'img' => 'https://images.unsplash.com/photo-1560008447-739f74a13745?auto=format&fit=crop&q=80&w=800'],
                ],
            ],

            // 2. REFRIGERATION
            'Refrigeration' => [
                'Large Appliances' => [
                    ['name' => 'Upright Fridge / Freezer', 'old' => 245000, 'new' => 220000, 'img' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Island Chest Freezer', 'old' => 95000, 'new' => 88000, 'img' => 'https://images.pexels.com/photos/3784424/pexels-photo-3784424.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Walk-in Cold Room', 'old' => 850000, 'new' => 750000, 'img' => 'https://images.pexels.com/photos/163826/storage-warehouse-logistics-stock-163826.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Industrial Blast Chiller', 'old' => 420000, 'new' => 380000, 'img' => 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Hotel Appliances' => [
                    ['name' => 'Curved Glass Cake Display', 'old' => 185000, 'new' => 165000, 'img' => 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Butchery Meat Display', 'old' => 310000, 'new' => 285000, 'img' => 'https://images.pexels.com/photos/6157038/pexels-photo-6157038.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Double Door Beverage Cooler', 'old' => 145000, 'new' => 125000, 'img' => 'https://images.unsplash.com/photo-1583243265516-778847849929?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Pizza Prep Fridge', 'old' => 195000, 'new' => 175000, 'img' => 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Saladette Unit', 'old' => 125000, 'new' => 110000, 'img' => 'https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Bullet Ice Machine', 'old' => 110000, 'new' => 95000, 'img' => 'https://images.pexels.com/photos/233667/pexels-photo-233667.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Insulated Ice Storage Bin', 'old' => 45000, 'new' => 38000, 'img' => 'https://images.pexels.com/photos/4033324/pexels-photo-4033324.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Office Kitchen' => [
                    ['name' => 'Hot & Cold Water Dispenser', 'old' => 24000, 'new' => 19500, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Mini Bar Fridge', 'old' => 18000, 'new' => 15500, 'img' => 'https://images.unsplash.com/photo-1597148564172-1f48600f9a2d?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Wine Chiller Cabinet', 'old' => 85000, 'new' => 72000, 'img' => 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Milk Cooling Tank (500L)', 'old' => 380000, 'new' => 345000, 'img' => 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Milk Storage Tank', 'old' => 120000, 'new' => 95000, 'img' => 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
            ],

            // 3. FOOD PREP
            'Food Prep' => [
                'Butchery Equipment' => [
                    ['name' => 'Heavy Duty Meat Mincer', 'old' => 65000, 'new' => 52000, 'img' => 'https://images.pexels.com/photos/65172/pexels-photo-65172.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Stainless Steel Bone Saw', 'old' => 135000, 'new' => 115000, 'img' => 'https://images.pexels.com/photos/1353366/pexels-photo-1353366.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Gravity Feed Meat Slicer', 'old' => 75000, 'new' => 62000, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Hydraulic Sausage Filler', 'old' => 95000, 'new' => 82000, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Industrial Meat Mixer', 'old' => 145000, 'new' => 125000, 'img' => 'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Food Processors' => [
                    ['name' => 'Potato Peeler Machine', 'old' => 85000, 'new' => 75000, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Vegetable Cutter / Slicer', 'old' => 68000, 'new' => 58000, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Cold Press Juicer', 'old' => 45000, 'new' => 38000, 'img' => 'https://images.unsplash.com/photo-1610970881699-44a558dc170a?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Industrial Spice Grinder', 'old' => 28000, 'new' => 22500, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Chamber Vacuum Sealer', 'old' => 95000, 'new' => 84000, 'img' => 'https://images.pexels.com/photos/4100660/pexels-photo-4100660.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Measuring Tools / Scales' => [
                    ['name' => 'Digital 30kg Scale', 'old' => 12000, 'new' => 8500, 'img' => 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Infrared Thermometer', 'old' => 6500, 'new' => 4500, 'img' => 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Digital Kitchen Timer', 'old' => 2500, 'new' => 1500, 'img' => 'https://images.unsplash.com/photo-1518976650012-32039207085c?auto=format&fit=crop&q=80&w=800'],
                ],
                'Home Kitchen' => [
                    ['name' => 'XL Air Fryer', 'old' => 22000, 'new' => 18500, 'img' => 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800'],
                    ['name' => '8L Stand Mixer', 'old' => 35000, 'new' => 28000, 'img' => 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=800'],
                    ['name' => 'Toaster Oven', 'old' => 15000, 'new' => 12500, 'img' => 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'],
                ],
            ],

            // 4. STAINLESS STEEL
            'Stainless Steel' => [
                'Juakali Fabrications' => [
                    ['name' => 'Extractor Hood (2 Meters)', 'old' => 75000, 'new' => 65000, 'img' => 'https://images.pexels.com/photos/221537/pexels-photo-221537.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Prep Table with Undershelf', 'old' => 22000, 'new' => 18500, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Closed Storage Cabinet', 'old' => 55000, 'new' => 48000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Wall Shelving Unit', 'old' => 18000, 'new' => 15000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Grease Trap', 'old' => 25000, 'new' => 19500, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Adjustable Storage Rack', 'old' => 35000, 'new' => 29500, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Hotel Appliances' => [
                    ['name' => 'Double Bowl Wash Sink', 'old' => 45000, 'new' => 38000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Hand Wash Station', 'old' => 32000, 'new' => 28000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => '4-Pot Bain Marie Counter', 'old' => 125000, 'new' => 110000, 'img' => 'https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => '3-Tier Service Trolley', 'old' => 24000, 'new' => 19500, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
            ],

            // 5. MEDICAL & INSTITUTIONAL
            'Medical & Institutional' => [
                'Mortuary Equipment' => [
                    ['name' => '3-Body Mortuary Fridge', 'old' => 950000, 'new' => 850000, 'img' => 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Hydraulic Mortuary Trolley', 'old' => 125000, 'new' => 110000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Body Storage Rack', 'old' => 280000, 'new' => 245000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Hospital Utility' => [
                    ['name' => 'Emergency Patient Trolley', 'old' => 85000, 'new' => 72000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Adjustable Overbed Table', 'old' => 18000, 'new' => 14500, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
                'Cleaning & Sanitation' => [
                    ['name' => 'Medical Scrub Sink', 'old' => 110000, 'new' => 95000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Hospital Sluice Sink', 'old' => 85000, 'new' => 75000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                    ['name' => 'Bedpan Washer Machine', 'old' => 350000, 'new' => 315000, 'img' => 'https://images.pexels.com/photos/159832/production-technology-quality-control-159832.jpeg?auto=compress&cs=tinysrgb&w=800'],
                ],
            ],
        ];

        foreach ($inventory as $categoryName => $subcategories) {
            foreach ($subcategories as $subName => $products) {
                foreach ($products as $p) {
                    // Generate dynamic descriptions based on Category
                    $description = match ($categoryName) {
                        'Cooking' => "Professional-grade " . strtolower($p['name']) . " built for high-output Kenyan kitchens.",
                        'Refrigeration' => "Advanced " . strtolower($p['name']) . " with energy-efficient cooling technology.",
                        'Food Prep' => "Heavy-duty " . strtolower($p['name']) . " designed to streamline kitchen workflow.",
                        'Stainless Steel' => "Custom-finished stainless steel " . strtolower($p['name']) . " for maximum durability.",
                        'Medical & Institutional' => "Specialized " . strtolower($p['name']) . " meeting strict hospital sanitation standards.",
                        default => "High-quality " . strtolower($p['name']) . " from KitchenAll Pro."
                    };

                    Product::create([
                        'name'             => $p['name'],
                        'brand'            => 'KitchenAll Pro',
                        'description'      => $description,
                        'price'            => $p['new'],
                        'original_price'   => $p['old'],
                        'stock_quantity'   => rand(5, 25), 
                        'category'         => $categoryName,
                        'subcategory_slug' => Str::slug($subName), // Standardized slugging
                        'image_url'        => $p['img'],
                    ]);
                }
            }
        }
    }
}