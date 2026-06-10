import { apiFetch } from "@/lib/api";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const AuthService = {
  me() {
    return apiFetch<User>("/me");
  },

  logout() {
    return apiFetch<{ message: string }>("/logout", {
      method: "POST",
    });
  },
};