import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("http://localhost:3000/api/bd", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.APY_KEY as string
    }
    // body: JSON.stringify({ time: new Date().toISOString() })
  });

  const data = await res.json();

  return NextResponse.json(data);
}
