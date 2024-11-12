"use client";

import { authenticate } from "@/app/lib/user";
import { useActionState } from "react";

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  return (
    <form action={formAction}>
      <div className="mx-4 mt-2 grid grid-cols-1 gap-4">
        <label className="flex items-center">
          <span className="w-20 inline-block">Login ID</span>
          <input name="loginId" type="text" className="border-2 px-1 flex-auto" required />
        </label>
        <label className="flex items-center">
          <span className="w-20 inline-block">Password</span>
          <input name="password" type="password" className="border-2 px-1 flex-auto" required />
        </label>
        <button className="border-2">Sign In</button>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      </div>
    </form>
  );
}
