import { db } from "@/app/lib/DataBase/db";
import { messages } from "@/app/lib/DataBase/schemas/messages";
import { verifyToken } from "@/app/lib/Security/Token";
import { and, eq } from "drizzle-orm";
import { JWTPayload } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const bearerToken = await request.headers.get("authorization");
  const split = bearerToken?.split(" ") || "";
  const token = split[1] || "";

  const body = await request.json();
  const chatID = body.chatID;

  if (!token) {
    return NextResponse.json(
      {
        status: "error",
        message: "No Token provided!",
      },
      {
        status: 404,
      },
    );
  }
  if (!chatID) {
    return NextResponse.json(
      {
        status: "error",
        message: "No chat ID provided!",
      },
      {
        status: 404,
      },
    );
  }

  try {
    const validateToken = await verifyToken(token);

    if (validateToken.status === "error") {
      return NextResponse.json(
        {
          status: "error",
          message: validateToken.message,
        },
        {
          status: 401,
        },
      );
    }
    const payload = validateToken as JWTPayload;

    const chat = await db
      .select({
        id: messages.id,
        message: messages.message,
        type: messages.type,
      })
      .from(messages)
      .where(
        and(
          eq(messages.user_id, Number(payload.id)),
          eq(messages.conversation_id, Number(chatID)),
        ),
      );

    if (chat.length > 0) {
      return NextResponse.json(
        {
          status: "success",
          chat,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Chat couldnt be found!",
      },
      { status: 404 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        status: "error",
        message: `Somthing happend: ${e.message}`,
      },
      { status: 500 },
    );
  }
}
