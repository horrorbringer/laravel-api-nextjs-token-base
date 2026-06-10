<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
          return Product::query()
        ->when(
            $request->search,
            fn ($q) => $q->where(
                'name',
                'like',
                '%' . $request->search . '%'
            )
        )
        ->latest()
        ->paginate(10);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable'],
        ]);

        return Product::create($data);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable'],
        ]);

        $product->update($data);

        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'message' => 'Product deleted',
        ]);
    }
}
