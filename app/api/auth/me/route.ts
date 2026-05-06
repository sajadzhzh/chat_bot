import { verifyToken } from "@/app/lib/Security/Token";
import { NextResponse } from "next/server";

export async function GET(request : Request) {
  const bearerToken =await request.headers.get("authorization")
  const split = bearerToken?.split(" ") || ""
  const token = split[1] || ""
  
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

  try{
    const validateToken = await verifyToken(token.toString())

    if(validateToken.status === "error"){
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

    return NextResponse.json(
      {
        status: "success",
        payload: validateToken,
      },
      {
        status: 200,
      },
    );
  }catch(e:any){
    return NextResponse.json(
      {
        status: "error",
        message: `Something happend: ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
