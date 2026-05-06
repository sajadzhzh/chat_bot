import { db } from "@/app/lib/DataBase/db";
import { conversations } from "@/app/lib/DataBase/schemas/conversations";
import { messages } from "@/app/lib/DataBase/schemas/messages";
import { verifyToken } from "@/app/lib/Security/Token";
import { eq } from "drizzle-orm";
import { JWTPayload } from "jose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const bearerToken = await request.headers.get("authorization");
  const split = bearerToken?.split(" ") || "";
  const token = split[1] || "";

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
        id: conversations.id,
        title: conversations.title,
      })
      .from(conversations)
      .where(eq(conversations.user_id, Number(payload.id)));

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
