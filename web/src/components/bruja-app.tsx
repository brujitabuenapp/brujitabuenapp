"use client";

import Link from "next/link";
import { useState } from "react";

const problems = [
  "Amor",
  "Trabajo",
  "Salud",
  "Dinero",
  "Ansiedad",
  "Dormir",
  "Mala energía",
  "Confusión",
];

const guides = [
  { name: "Sabrina", tone: "misteriosa y maternal", accent: "from-fuchsia-600 to-purple-700" },
  { name: "Dumbly", tone: "divertida y sabia", accent: "from-sky-600 to-blue-700" },
];

export function BrujaApp() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [guide, setGuide] = useState("Sabrina");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("Esperando tu consulta...");
  const [loading, setLoading] = useState(false);

  const handleHealing = async () => {
    setLoading(true);
    setResponse("Consultando a la brujita...");

    const prompt = `${guide}: Curá este problema con un toque mágico. Usuario: ${input}`;

    try {
      const res = await fetch("/api/bruja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guide, prompt }),
      });

      if (!res.ok) {
        throw new Error("No fue posible obtener la respuesta");
      }

      const data = await res.json();
      setResponse(data.reply || "La brujita no respondió en este momento.");
    } catch (error) {
      setResponse("La brujita no pudo responder ahora, pero estamos trabajando en ello.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.16),_transparent_40%),linear-gradient(135deg,_#fff7ed,_#fdf2f8)] px-4 py-10 text-slate-800">
      <main className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-600">Brujita Buena</p>
              <h1 className="text-4xl font-black sm:text-5xl">Tu espacio mágico para sanar, pedir guía y sentir apoyo.</h1>
              <p className="text-lg text-slate-600">
                Recréamos la experiencia de la app original para la web con una interfaz cálida, rápida y pensada para móviles y escritorio.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-6 py-4 text-sm text-white shadow-lg">
              <p className="font-semibold">¿Qué te anda molestando hoy?</p>
              <p className="mt-2 text-slate-300">Elegí un tema y empezá a conectar con la guía que más te represente.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-fuchsia-100 bg-white/90 p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Elige el tema</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {problems.map((problem) => (
                <button
                  key={problem}
                  onClick={() => setSelectedProblem(problem)}
                  className={`rounded-2xl border px-4 py-4 text-left text-lg font-semibold transition ${selectedProblem === problem ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-200 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50"}`}
                >
                  {problem}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              {selectedProblem ? `Tema seleccionado: ${selectedProblem}` : "Seleccioná un tema para continuar."}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg">
            <h2 className="text-2xl font-bold">¿Quién querés que te ayude?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {guides.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setGuide(item.name)}
                  className={`rounded-2xl border p-4 text-left transition ${guide === item.name ? "border-fuchsia-500 bg-fuchsia-50" : "border-slate-200 hover:border-fuchsia-200"}`}
                >
                  <div className={`rounded-xl bg-gradient-to-br ${item.accent} p-3 text-white`}>
                    <p className="text-lg font-bold">{item.name}</p>
                    <p className="text-sm opacity-90">{item.tone}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-fuchsia-100 bg-fuchsia-50 p-4">
              <h3 className="font-semibold text-fuchsia-700">Curación con {guide}</h3>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Contame qué te pasa y qué necesitas recibir..."
                className="mt-3 min-h-28 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none ring-0"
              />
              <button
                onClick={handleHealing}
                disabled={loading || !input.trim() || !selectedProblem}
                className="mt-4 w-full rounded-2xl bg-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? "Consultando..." : "Pedir curación"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Respuesta mágica</h2>
              <p className="mt-2 text-slate-600">Esta respuesta simula el flujo de la app original y se puede conectar luego con Firebase, GPT y email.</p>
            </div>
            <Link href="https://cafecito.app/brujitabuenaapp" className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600">
              Invitar una poción mágica
            </Link>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            {response}
          </div>
        </section>
      </main>
    </div>
  );
}
