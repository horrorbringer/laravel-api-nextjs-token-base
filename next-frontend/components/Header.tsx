import { logoutAction } from "@/app/actions/auth"
import Image from "next/image"
import { cookies } from "next/headers"
import Link from "next/link";

async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return (
    <header className="flex justify-between text-xl py-5">
    <Link href="/">
        <Image src="next.svg" alt="logo" width={100} height={70}></Image>
    </Link>
      <div className="space-x-5">
        <Link href="/products">Products</Link>

{token ? <Link href="#" onClick={logoutAction}>Logout</Link>:<Link href="/login">Login</Link> }
        
        
      </div>
    </header>
  )
}

export default Header