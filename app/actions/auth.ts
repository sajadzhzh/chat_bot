"use server";

import { cookies } from "next/headers";
import { getFetch, postFetch } from "../lib/utils/Fetch";

export async function login(state: any, formData: FormData) {
  const userName = formData.get("userName");
  const password = formData.get("password");

  if (!userName || !password) {
    return {
      status: "error",
      message: "نام کاربری و رمز عبور نباید خالی باشد.",
    };
  }

  if (password.toString().length < 8 || password.toString().length > 50) {
    return {
      status: "error",
      message:
        "حداقل تعداد کاراکتر رمز عبور 8 کاراکتر و حداکثر 50 کاراکتر می باشد.",
    };
  }

  try {
    const res = await postFetch("auth/login", { userName, password });

    if (res.status === "success") {
      (await cookies()).set("token", res.token, {
        httpOnly: true,
        sameSite: "lax",
      });
      return {
        status: "success",
        message: "خوش آمدید",
        redirect: "/",
        user: res.info,
      };
    } else {
      return {
        status: "error",
        message: `ورود ناموفق : ${res.message}`,
      };
    }
  } catch (e: any) {
    return {
      status: "error",
      message: `مشکلی پیش آمد : ${e.message}`,
    };
  }
}

export async function signup(state: any, formData: FormData) {
  const userName = formData.get("userName");
  const password = formData.get("password");
  const checkPassword = formData.get("checkPassword");
  const email = formData.get("email");

  if (!userName || !password || !checkPassword || !email) {
    return {
      status: "error",
      message: "تمام مقادیر اجباری هستند.",
    };
  }

  if (password.toString().length < 8 || password.toString().length > 50) {
    return {
      status: "error",
      message:
        "حداقل تعداد کاراکتر رمز عبور 8 کاراکتر و حداکثر 50 کاراکتر می باشد.",
    };
  }

  if (password !== checkPassword) {
    return {
      status: "error",
      message: "رمز های وارد شده مطابقت ندارند.",
    };
  }

  try {
    const res = await postFetch("auth/signup", { userName, password, email });

    if (res.status === "success") {
      (await cookies()).set("token", res.token, {
        httpOnly: true,
        sameSite: "lax",
      });
      return {
        status: "success",
        message: "خوش آمدید",
        redirect: "/",
        info: res.info,
      };
    } else {
      return {
        status: "error",
        message: `ثبت نام ناموفق : ${res.message}`,
      };
    }
  } catch (e: any) {
    return {
      status: "error",
      message: `مشکلی پیش آمد : ${e.message}`,
    };
  }
}

export async function me() {
  const token = (await cookies()).get("token");

  if (!token) {
    return {
      status: "error",
      message: "توکن پیدا نشد.",
    };
  }

  try {
    const req = await getFetch("auth/me", {
      Authorization: `Bearar ${token.value}`,
    });

    if (req.status === "success") {
      return {
        status: "success",
        payload: req.payload,
      };
    } else {
      return {
        status: "error",
        message: req.message,
      };
    }
  } catch (e: any) {
    return {
      status: "error",
      message: `مشکلی پیش آمد : ${e.message}`,
    };
  }
}
