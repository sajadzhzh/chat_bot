import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY!);

export async function generateToken(payload: { id: number; userName: string }) {
  if (!payload) {
    return {
      status: "error",
      message: "Id and UserName are required",
    };
  }

  try {
    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60 * 1000);

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    return {
      status: "success",
      info: {
        sub: payload.id,
        name: payload.userName,
        iat: now,
        exp: expires,
      },
      token: token,
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message,
    };
  }
}

export async function verifyToken(token: string) {
  try{
    const { payload } = await jwtVerify(token, secret);
  return payload;
  } catch (err: any){
    return {
      status: "error",
      message: err.message,
    };
  }
}
