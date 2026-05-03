import Link from "next/link";
import SignupForm from "./form";

export default function SignUp() {
  return (
    <div className="auth">
      <div className="Container__auth">
          <SignupForm />
          <p className="text-sm mx-auto mt-3">
            حساب کاربری دارید؟ <Link href="/auth/login" className="hover:text-cyan-600 underline">وارد شوید</Link>
          </p>
      </div>
    </div>
  );
}
