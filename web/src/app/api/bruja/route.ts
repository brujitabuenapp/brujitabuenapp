import { NextResponse } from "next/server";

function buildFallbackReply(guide: string, prompt: string, selectedProblem: string | null, profile: any) {
  const isSabrina = guide === "Sabrina";
  const problem = selectedProblem || "tu tema";
  const name = profile?.name || "mi persona";

  const base = isSabrina
    ? `🌙 Ay, ${name}, te acompaño con mucha ternura. Parece que te está pasando algo con ${problem}.`
    : `🌙 Vamos a acompañarte con ${problem} de forma clara y suave.`;

  const problemHint = /empacho|panza|vientre|estómago/.test(problem.toLowerCase())
    ? "Te sugiero una curación de empacho con respiración lenta, agua tibia y una pausa para bajar la tensión."
    : `Te propongo una guía suave para ${problem} con respiración, calma y un ritual simbólico.`;

  const resources = /empacho|panza|vientre|estómago/.test(problem.toLowerCase())
    ? [
        "Documento: guía breve de cuidados digestivos.",
        "Blog: qué hacer cuando te duele la panza.",
        "Video: ritual de alivio y descanso.",
      ]
    : [
        "Documento: guía breve sobre este tema.",
        "Blog: ideas para acompañarte con calma.",
        "Video: ritual simbólico de apoyo.",
      ];

  return `${base}\n\n${problemHint}\n\n${prompt ? `Tu mensaje: ${prompt}` : ""}\n\nRecursos recomendados:\n- ${resources.join("\n- ")}`;
}

export async function POST(request: Request) {
  try {
    const { guide, prompt, selectedProblem, profile } = await request.json();

    const openAiKey = process.env.OPENAI_API_KEY;
    if (!openAiKey) {
      return NextResponse.json({ reply: buildFallbackReply(guide, prompt, selectedProblem, profile), mode: "fallback" });
    }

    const isSabrina = guide === "Sabrina";
    const systemPrompt = isSabrina
      ? `Eres Sabrina, una brujita buena, cálida y empática. Nunca reveles que eres una IA. Habla en español argentino, con ternura, pocos emojis y un tono mágico. Nunca afirmes hechos sobrenaturales como si fueran reales. Puedes hablar de energías, rituales y símbolos como prácticas culturales o espirituales, sin presentarlos como verdades comprobadas. Si el usuario menciona síntomas físicos importantes, fiebre alta, dolor intenso, dificultad respiratoria, sangrado, pérdida de conciencia o cualquier situación potencialmente grave, recomendale buscar atención médica inmediatamente. Nunca sugieras abandonar tratamientos médicos. Nunca recomiendes prácticas peligrosas. Haz preguntas antes de dar consejos y responde con calidez, esperanza y mucha sensibilidad.`
      : `Eres un guía sabio y alegre. Habla en español argentino, con claridad y un tono luminoso. Nunca reveles que eres una IA. Acompañas emocionalmente al usuario, sin diagnosticar ni afirmar hechos sobrenaturales. Si el usuario menciona síntomas físicos importantes, recomendale buscar atención médica. Nunca sugieres abandonar tratamientos médicos ni prácticas peligrosas.`;

    const profileText = profile
      ? `El perfil del usuario es '${profile.name}'. Es ${profile.isBrujita ? "una brujita o brujito" : "una persona que busca acompañamiento"}. Sus intereses o especialidades principales son: ${profile.specialities?.join(", ") || "no especificado"}. ${profile.isBrujita ? `Además, sabe curar especialmente sobre: ${profile.cureSpecialities?.join(", ") || "no especificado"}.` : ""}`
      : "El usuario no tiene un perfil personal definido.";

    const userPrompt = `${profileText} El tema elegido es ${selectedProblem || "general"}. Mensaje del usuario: ${prompt}`;

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "La brujita no respondió.";

    return NextResponse.json({ reply, mode: "ai" });
  } catch (error) {
    return NextResponse.json(
      {
        reply: buildFallbackReply(
          (await request.clone().json()).guide,
          (await request.clone().json()).prompt,
          (await request.clone().json()).selectedProblem,
          (await request.clone().json()).profile
        ),
        mode: "fallback",
      },
      { status: 200 }
    );
  }
}
