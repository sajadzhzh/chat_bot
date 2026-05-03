"use client";

import { me } from "@/app/actions/auth";
import { getTheme, toggleTheme } from "@/app/lib/utils/Events";
import Button from "@/Components/layout/Button";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ButtonContainer() {
  const [dark, setDark] = useState(false);
  const { user, loginContext } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const updateTheme = () => setDark(getTheme());

    updateTheme();

    window.addEventListener("themeChanged", updateTheme);

    return () => window.removeEventListener("themeChanged", updateTheme);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const req = await me();

      if (req.status === "error") {
        toast.error(req.message);
        router.push("/auth");
      } else {
        loginContext(req.payload);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="mt-auto w-full flex gap-1">
      <Button
        text={user ? user.userName : "ورود"}
        style="btn btn__login"
        href={user ? "" : "/auth"}
      />
      <Button
        text={dark ? "روز" : "شب"}
        style="btn btn__login"
        onClick={() => toggleTheme()}
      />
    </div>
  );
}
