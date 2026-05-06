"use server";

import { cookies } from "next/headers";
import { getFetch, postFetch } from "../lib/utils/Fetch";

export async function newQuestion(state: any, formData: FormData) {
  const userInput = formData.get("userInput");
  const token = (await cookies()).get("token");

  if (!userInput) {
    return {
      status: "error",
      message: "سوالی وارد نشده است.",
    };
  }

  if (!token) {
    return {
      status: "error",
      message: "لطفا وارد حساب خود شويد.",
    };
  }

  try {
    const res = await postFetch(
      "chat/new",
      { userInput },
      {
        Authorization: `Bearer ${token.value}`,
      },
    );

    if (res.status === "success") {
      return {
        status: "success",
        response: res.response,
        conversation_id: res.conversation_id,
      };
    } else {
      return {
        status: "error",
        message: res.message,
      };
    }
  } catch (e: any) {
    return { status: "error", message: `مشکلی پیش آمد : ${e.message}` };
  }
}

export async function oldQuestion(state: any, formData: FormData) {
  const userInput = formData.get("userInput");
  const chatID = formData.get("chatID");
  const token = (await cookies()).get("token");

  if (!userInput) {
    return {
      status: "error",
      message: "سوالی وارد نشده است.",
    };
  }
  if (!chatID) {
    return {
      status: "error",
      message: "مکالمه یافت نشد.",
    };
  }

  if (!token) {
    return {
      status: "error",
      message: "لطفا وارد حساب خود شويد.",
    };
  }

  try {
    const res = await postFetch(
      "chat/old",
      { userInput, chatID },
      {
        Authorization: `Bearer ${token.value}`,
      },
    );

    if (res.status === "success") {
      return {
        status: "success",
        response: res.response,
      };
    } else {
      return {
        status: "error",
        message: res.message,
      };
    }
  } catch (e: any) {
    return { status: "error", message: `مشکلی پیش آمد : ${e.message}` };
  }
}

export async function GetChats() {
  const token = (await cookies()).get("token");

  if (!token) {
    return {
      status: "error",
      message: "لطفا وارد حساب خود شويد.",
    };
  }

  try {
    const res = await getFetch("chat/titles", {
      Authorization: `Bearer ${token.value}`,
    });

    if (res.status === "success") {
      return {
        status: "success",
        chat: res.chat,
      };
    } else {
      return {
        status: "error",
        message: res.message,
      };
    }
  } catch (e: any) {
    return { status: "error", message: `مشکلی پیش آمد : ${e.message}` };
  }
}

export async function GetChat(chatID: string) {
  const token = (await cookies()).get("token");

  if (!token) {
    return {
      status: "error",
      message: "لطفا وارد حساب خود شويد.",
    };
  }

  if (!chatID) {
    return {
      status: "error",
      message: "مکالمه ایی مشخص نشده است.",
    };
  }

  try {
    const res = await postFetch(
      "chat",
      { chatID },
      {
        Authorization: `Bearer ${token.value}`,
      },
    );

    if (res.status === "success") {
      return {
        status: "success",
        chat: res.chat,
      };
    } else {
      return {
        status: "error",
        message: res.message,
      };
    }
  } catch (e: any) {
    return { status: "error", message: `مشکلی پیش آمد : ${e.message}` };
  }
}
