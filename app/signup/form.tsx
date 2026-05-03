"use client";

import Button from "@/Components/layout/Button";
import { useActionState, useEffect } from "react";
import { signup } from "../actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, null);
  const { loginContext } = useAuth();
  const router = useRouter();

  useEffect(() => {
    switch (state?.status) {
      case "error":
        toast.error(state.message);
        break;
      case "success":
        toast.success(state.message);
        loginContext(state.info);
        state.redirect && router.push(state.redirect);
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
      <label htmlFor="email">ایمیل</label>
      <input type="email" name="email" id="email" className="auth__input" />
      <label htmlFor="password">رمز عبور</label>
      <input
        type="password"
        name="password"
        id="password"
        className="auth__input"
      />
      <label htmlFor="checkPassword">تکرار رمز عبور</label>
      <input
        type="password"
        name="checkPassword"
        id="checkPassword"
        className="auth__input"
      />
      <Button
        text="ثبت نام"
        style="btn btn__submit mt-3"
        type="submit"
        pending={pending}
      />
    </form>
  );
}
