import Link from "next/link";

export default function Pagination({
  currentPage,
  lastPage,
  search,
}: {
  currentPage: number;
  lastPage: number;
  search?: string;
}) {
  function makeUrl(page: number) {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    params.set("page", String(page));

    return `/products?${params.toString()}`;
  }

  return (
    <div className="flex items-center gap-3">
      {currentPage > 1 && (
        <Link href={makeUrl(currentPage - 1)}>Previous</Link>
      )}

      <span>
        Page {currentPage} of {lastPage}
      </span>

      {currentPage < lastPage && (
        <Link href={makeUrl(currentPage + 1)}>Next</Link>
      )}
    </div>
  );
}