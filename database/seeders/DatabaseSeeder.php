<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
        ]);

        for ($i = 1; $i <= 100; $i++) {
            Product::create([
                'NamaBarang' => 'Laptop ' . $i,
                'HargaBeli' => 10000000,
                'HargaJual' => 13000000,
                'Stok' => 5,
            ]);
        }
    }
}
