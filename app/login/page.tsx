import Link from "next/link";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="auth">
      <div className="Container__auth">
        <LoginForm />
        <p className="text-sm mx-auto mt-3">
          حساب کاربری ندارید؟{" "}
          <Link href="/auth/signup" className="hover:text-cyan-600 underline">
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}
