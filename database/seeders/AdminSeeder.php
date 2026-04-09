<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::updateOrCreate(
            ['email' => 'brayo571@gmail.com'], 
            [
                'name' => 'Brian Mwangi',
                'password' => Hash::make('C0nn4cT140'),
                'role' => 'Superadmin'
            ]
        );
    }
}