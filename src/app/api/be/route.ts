import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const apikey = request.headers.get("Api-Key");
  const salt = apikey ? Math.round(Math.random() * apikey.length) : 10;
  console.log(apikey);
  console.log(salt);

  const dbbd = [
    { name: "CD", secret: await bcrypt.hash("CD", salt) },
    { name: "VF", secret: await bcrypt.hash("VF", salt) }
  ];

  return NextResponse.json({ dbbd });
}
