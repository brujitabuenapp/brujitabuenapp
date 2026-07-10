import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { guide, prompt } = await request.json();

    const systemPrompt =
      guide === "Sabrina"
        ? "Responde como una bruja cálida y maternal. Usa un tono tierno y empático."
        : "Responde como un guía divertido y sabio. Usa un tono alegre y claro.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI request failed");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "La brujita no respondió.";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "La brujita no pudo responder en este momento. Añade la key de OpenAI en el entorno para habilitar el chat real." },
      { status: 500 }
    );
  }
}
