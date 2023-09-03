import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
type RegisterDataType = {
  name: string;
  email: string;
  password: string;
  time: string;
};
export async function POST(req: Request, res: Response) {
  const body: RegisterDataType = await req.json();
  const { name, email, password, time } = body;

  const apikey = req.headers.get("Api-Key");

  if (apikey === process.env.APY_KEY) {
  } else {
    return NextResponse.json({ errr: "sdd" });
  }

  let salt = apikey ? Math.round(Math.random() * apikey.length) : 10;

  if (salt < 10) {
    salt = 10;
  }

  const dbbd = [
    { name: "CD", secret: await bcrypt.hash("CD", salt) },
    { name: "VF", secret: await bcrypt.hash("VF", salt) }
  ];

  return NextResponse.json({ dbbd });
}
