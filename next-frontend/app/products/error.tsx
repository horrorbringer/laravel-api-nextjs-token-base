"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="rounded border p-6">
      <h2 className="text-lg font-bold">Something went wrong</h2>
      <p className="text-sm text-red-500">{error.message}</p>

      <button
        onClick={reset}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}