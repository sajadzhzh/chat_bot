import { db } from "@/app/lib/DataBase/db";
import { conversations } from "@/app/lib/DataBase/schemas/conversations";
import { messages } from "@/app/lib/DataBase/schemas/messages";
import { verifyToken } from "@/app/lib/Security/Token";
import { JWTPayload } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const userInput = body.userInput;

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

  if (!userInput) {
    return NextResponse.json(
      {
        status: "error",
        message: "No Question Provided!",
      },
      { status: 400 },
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

    // Request to AI Api
    const response = "سلام، چه كمكي از من ساخته است؟";

    const saveTitle = await db
      .insert(conversations)
      .values({ title: userInput, user_id: Number(payload.id) });

    const saveQuestion = await db.insert(messages).values({
      user_id: Number(payload.id),
      conversation_id: saveTitle[0].insertId,
      message: userInput,
      type: "question",
      created_at: new Date(),
    });

    const saveAnswer = await db.insert(messages).values({
      user_id: Number(payload.id),
      conversation_id: saveTitle[0].insertId,
      message: response,
      type: "answer",
      created_at: new Date(),
    });

    return NextResponse.json(
      {
        status: "success",
        response,
        conversation_id: saveTitle[0].insertId,
      },
      { status: 200 },
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
