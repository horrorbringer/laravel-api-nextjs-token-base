export default function SearchForm({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  return (
    <form action="/products" className="flex gap-2">
      <input
        name="search"
        defaultValue={defaultValue}
        placeholder="Search products..."
        className="rounded border px-3 py-2"
      />

      <button className="rounded bg-black px-4 py-2 text-white">
        Search
      </button>
    </form>
  );
}