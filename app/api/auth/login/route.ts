import { db } from "@/app/lib/DataBase/db";
import { users } from "@/app/lib/DataBase/schemas/users";
import { VerifyPass } from "@/app/lib/Security/Hash";
import { generateToken } from "@/app/lib/Security/Token";
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userName = body.userName;
  const password = body.password;

  const passPattern = /^.{8,50}$/;

  if (!userName || !password) {
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

  try {
    const check = await db
      .select({
        id: users.id,
        userName: users.userName,
        password: users.password,
      })
      .from(users)
      .where(or(eq(users.userName, userName)));

    if (check.length === 1) {
      const savedPass = check[0].password?.toString() || "";
      const validatePass = await VerifyPass(savedPass, password);
      if (!validatePass) {
        return NextResponse.json(
          {
            status: "error",
            message: "Password is incorrect.",
          },
          { status: 401 },
        );
      }
      const token = await generateToken({ id: check[0].id, userName });

      return NextResponse.json(
        {
          status: "success",
          message: "Wellcome",
          info: token.info,
          token: token.token,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "UserName not found.",
      },
      { status: 404 },
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
