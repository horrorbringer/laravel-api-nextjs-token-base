import { updateProductAction } from "@/app/actions/products";

export default function EditProductForm({
  product,
}: {
  product: any;
}) {
  const action = updateProductAction.bind(
    null,
    product.id
  );

  return (
    <form action={action}>
      <input
        name="name"
        defaultValue={product.name}
      />

      <input
        name="price"
        defaultValue={product.price}
      />

      <textarea
        name="description"
        defaultValue={product.description}
      />

      <button type="submit">
        Save
      </button>
    </form>
  );
}