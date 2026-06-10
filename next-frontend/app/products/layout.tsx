import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/products" className="text-xl font-bold">
            Product Admin
          </Link>

          <LogoutButton />
        </div>
      </header>

      <section className="mx-auto max-w-6xl p-6">
        {children}
      </section>
    </main>
  );
}