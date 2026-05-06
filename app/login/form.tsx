"use client";

import Button from "@/Components/layout/Button";
import { useActionState, useEffect } from "react";
import { login } from "../actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);
  const router = useRouter();
  const { loginContext } = useAuth();

  useEffect(() => {
    switch (state?.status) {
      case "error":
        toast.error(state.message);
        break;
      case "success":
        toast.success(state.message);
        loginContext(state.user);
        state.redirect && router.push(state.redirect + "?new_chat=true");
        break;
    }
  }, [state]);
  return (
    <form className="auth__form" action={formAction}>
      <label htmlFor="userName">نام کاربری</label>
      <input
        type="text"
        name="userName"
        id="userName"
        className="auth__input"
      />
      <label htmlFor="password">رمز عبور</label>
      <input
        type="password"
        name="password"
        id="password"
        className="auth__input"
      />
      <Button
        text="ورود"
        style="btn btn__submit mt-3"
        type="submit"
        pending={pending}
      />
    </form>
  );
}
