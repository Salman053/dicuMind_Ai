import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      return NextResponse.json(
        { error: "Gemini API failed", status: geminiRes.status },
        { status: 500 }
      );
    }

    const data = await geminiRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
