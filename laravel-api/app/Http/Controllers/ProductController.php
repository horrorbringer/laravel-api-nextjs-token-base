<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ){}

    public function index(Request $request)
    {
         return ProductResource::collection(
            $this->productService->getPaginatedProducts(
                $request->query('search')
            )
        );
    }

    public function store(StoreProductRequest $request)
    {
        return new ProductResource(
            $this->productService->createProduct($request->validated())
        );
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
          return new ProductResource(
            $this->productService->updateProduct(
                $product,
                $request->validated()
            )
        );
    }

    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
