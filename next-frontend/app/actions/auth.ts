"use server";

import { apiFetch } from "@/lib/api";
import { AuthService } from "@/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(
  prevState: { error?: string },
  formData: FormData
) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      error: data.message || "Invalid login",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("token", data.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  redirect("/products");
}

export async function logoutAction() {
  try {
    await AuthService.logout();
  } catch {}

  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}