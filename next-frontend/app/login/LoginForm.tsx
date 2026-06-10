"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <form action={action} className="space-y-3">
      {state.error && (
        <p className="rounded bg-red-100 p-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}