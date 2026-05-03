import { db } from "@/app/lib/DataBase/db";
import { users } from "@/app/lib/DataBase/schemas/users";
import { Hash } from "@/app/lib/Security/Hash";
import { generateToken } from "@/app/lib/Security/Token";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userName = body.userName;
  const password = body.password;
  const email = body.email;

  const passPattern = /^.{8,50}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!userName || !email || !password) {
    return NextResponse.json(
      {
        status: "error",
        message: "All parts required.",
      },
      { status: 401 },
    );
  }

  if (!passPattern.test(password)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Password must be at least 8 and at most 50 chars.",
      },
      { status: 401 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Email is not valid.",
      },
      { status: 401 },
    );
  }

  try {
    const check = await db
      .select({ userName: users.userName, email: users.email })
      .from(users)
      .where(or(eq(users.userName, userName), eq(users.email, email)));

    if (check.length !== 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "UserName or Email is already in use.",
        },
        { status: 409 },
      );
    }

    const hashed = await Hash(password);

    const insert = await db
      .insert(users)
      .values({ userName: userName, password: hashed, email: email });

    const token = await generateToken({ id: insert[0].insertId, userName });

    return NextResponse.json(
      {
        status: "success",
        message: "Wellcome",
        info: token.info,
        token: token.token,
      },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        status: "error",
        message: `Something happend: ${e.message}`,
      },
      { status: 500 },
    );
  }
}
