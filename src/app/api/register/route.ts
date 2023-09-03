import { NextResponse, NextRequest } from "next/server";
import { type } from "os";

type RegisterDataType = {
  name: string;
  email: string;
  password: string;
};
export async function POST(req: Request) {
  const body: RegisterDataType = await req.json();
  const { name, email, password } = body;
  // console.log("req \n\n\n\n", req);
  const res = await fetch(`${process.env.BACK_END_URL}/api/be/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: process.env.APY_KEY as string
    },
    body: JSON.stringify({
      time: new Date().toISOString(),
      name,
      email,
      password
    })
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
