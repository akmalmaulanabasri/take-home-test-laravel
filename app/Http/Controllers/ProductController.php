<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Product/Index', [
            'products' => Product::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'NamaBarang' => 'required|unique:products,NamaBarang',
            'HargaBeli' => 'required|integer',
            'HargaJual' => 'required|integer',
            'Stok' => 'required|integer',
            'FotoBarang' => 'required|image|mimes:png,jpg|max:100',
        ], [
            'NamaBarang.unique' => 'Nama Barang sudah ada',
            'NamaBarang.required' => 'Nama Barang tidak boleh kosong',
            'HargaBeli.required' => 'Harga Beli tidak boleh kosong',
            'HargaJual.required' => 'Harga Jual tidak boleh kosong',
            'FotoBarang.required' => 'Foto Barang tidak boleh kosong',
            'FotoBarang.image' => 'Foto Barang harus berupa gambar',
            'FotoBarang.mimes' => 'Foto Barang harus berupa gambar dengan format png atau jpg',
            'FotoBarang.max' => 'Foto Barang maksimal 100kb',
            'HargaBeli.integer' => 'Harga Beli harus berupa angka',
            'HargaJual.integer' => 'Harga Jual harus berupa angka',
            'Stok.integer' => 'Stok harus berupa angka',
            'Stok.required' => 'Stok tidak boleh kosong',
        ]);

        $fotoBarang = $request->file('FotoBarang');
        $fotoBarang->storeAs('public/products', $fotoBarang->hashName());

        Product::create([
            'NamaBarang' => $request->NamaBarang,
            'HargaBeli' => $request->HargaBeli,
            'HargaJual' => $request->HargaJual,
            'Stok' => $request->Stok,
            'FotoBarang' => $fotoBarang->hashName(),
        ]);

        return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $request->validate([
            'NamaBarang' => 'required',
            'HargaBeli' => 'required|integer',
            'HargaJual' => 'required|integer',
            'Stok' => 'required|integer',
            'FotoBarang' => 'nullable|image|mimes:png,jpg|max:100',
        ], [
            'NamaBarang.required' => 'Nama Barang tidak boleh kosong',
            'HargaBeli.required' => 'Harga Beli tidak boleh kosong',
            'HargaJual.required' => 'Harga Jual tidak boleh kosong',
            'Stok.required' => 'Stok tidak boleh kosong',
            'HargaBeli.integer' => 'Harga Beli harus berupa angka',
            'HargaJual.integer' => 'Harga Jual harus berupa angka',
            'Stok.integer' => 'Stok harus berupa angka',
            'FotoBarang.image' => 'Foto Barang harus berupa gambar',
            'FotoBarang.mimes' => 'Foto Barang harus berupa gambar dengan format png atau jpg',
            'FotoBarang.max' => 'Foto Barang maksimal 100kb',
        ]);

        if ($request->hasFile('FotoBarang')) {
            $fotoBarang = $request->file('FotoBarang');
            $fotoBarang->storeAs('public/products', $fotoBarang->hashName());
            $product->update([
                'NamaBarang' => $request->NamaBarang,
                'HargaBeli' => $request->HargaBeli,
                'HargaJual' => $request->HargaJual,
                'Stok' => $request->Stok,
                'FotoBarang' => $fotoBarang->hashName(),
            ]);
        } else {
            $fotoBarang = $product->FotoBarang;
            $product->update([
                'NamaBarang' => $request->NamaBarang,
                'HargaBeli' => $request->HargaBeli,
                'HargaJual' => $request->HargaJual,
                'Stok' => $request->Stok,
            ]);
        }


        return redirect()->route('products.index')->with('success', 'Produk berhasil diupdate');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();

        return redirect()->back();
    }
}
