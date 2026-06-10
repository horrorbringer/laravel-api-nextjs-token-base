import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { AuthService } from "@/services/auth-service";
import { redirect } from "next/navigation";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

     let user;

  try {
    user = await AuthService.me();
  } catch {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div>
          <Link href="/products" className="text-xl font-bold"> Product Admin
          </Link>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

          <LogoutButton />
        </div>
      </header>

      <section className="mx-auto max-w-6xl p-6">
        {children}
      </section>
    </main>
  );
}