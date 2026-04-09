<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->text('description')->nullable();
            
            // Pricing: e.g., 99,999,999.99
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            
            // Inventory
            $table->integer('stock_quantity')->default(0);
            
            // Category info
            $table->string('category'); // e.g., "Refrigeration"
            $table->string('subcategory_slug')->nullable(); // Required for your Model logic!
            $table->unsignedBigInteger('category_id')->nullable(); // Linking to a categories table
            
            // Media
            $table->longText('image_url')->nullable();
            
            $table->timestamps();
            
            // Indexing for faster searching
            $table->index(['name', 'category', 'subcategory_slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};