"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ViewMode = "home" | "profile";

type Profile = {
  id: string;
  name: string;
  specialities: string[];
};

const problems = [
  { name: "Amor", icon: "💗", description: "Corazones, vínculos y claridad emocional" },
  { name: "Trabajo", icon: "💼", description: "Oportunidades, enfoque y estabilidad" },
  { name: "Salud", icon: "🌿", description: "Cuerpo, energía y bienestar" },
  { name: "Dinero", icon: "💸", description: "Flujo, prosperidad y decisiones" },
  { name: "Ansiedad", icon: "🕯️", description: "Tranquilidad y paz interior" },
  { name: "Dormir", icon: "🌙", description: "Descanso y sueño reparador" },
  { name: "Mala energía", icon: "✨", description: "Limpieza y protección" },
  { name: "Confusión", icon: "🪄", description: "Orientación y claridad" },
];

const guides = [
  { name: "Sabrina", tone: "misteriosa y maternal", accent: "from-fuchsia-600 to-purple-700", rating: 4.9 },
  { name: "Dumbly", tone: "divertida y sabia", accent: "from-sky-600 to-blue-700", rating: 4.8 },
];

const STORAGE_KEY = "brujita-buena-profiles";

export function BrujaApp() {
  const [view, setView] = useState<ViewMode>("home");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [guide, setGuide] = useState("Sabrina");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("Esperando tu consulta...");
  const [loading, setLoading] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileSpecialities, setNewProfileSpecialities] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Profile[];
        if (parsed.length > 0) {
          setProfiles(parsed);
          setActiveProfileId(parsed[0].id);
        }
      } catch {
        setProfiles([]);
      }
    }
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }
  }, [profiles]);

  const activeProfile = profiles.find((profile) => profile.id === activeProfileId) ?? null;

  const filteredProblems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return problems;
    return problems.filter((problem) => problem.name.toLowerCase().includes(term) || problem.description.toLowerCase().includes(term));
  }, [searchTerm]);

  const toggleSpeciality = (problem: string) => {
    setNewProfileSpecialities((current) =>
      current.includes(problem) ? current.filter((value) => value !== problem) : [...current, problem]
    );
  };

  const handleAddProfile = () => {
    const name = newProfileName.trim();
    if (!name) return;

    const newProfile: Profile = {
      id: `profile-${Date.now()}`,
      name,
      specialities: newProfileSpecialities.length > 0 ? newProfileSpecialities : ["Amor", "Trabajo", "Salud"],
    };

    const updated = [newProfile, ...profiles];
    setProfiles(updated);
    setActiveProfileId(newProfile.id);
    setNewProfileName("");
    setNewProfileSpecialities([]);
    setView("profile");
  };

  const handleHealing = async () => {
    if (!activeProfile) {
      setResponse("Crea o selecciona un perfil personal antes de pedir ayuda.");
      return;
    }

    setLoading(true);
    setResponse("Consultando a la brujita...");

    const prompt = `Usuario: ${input.trim()}`;

    try {
      const res = await fetch("/api/bruja", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guide,
          prompt,
          selectedProblem,
          profile: activeProfile,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.reply || "No fue posible obtener la respuesta");
      }

      const data = await res.json();
      setResponse(data.reply || "La brujita no respondió en este momento.");
    } catch (error) {
      setResponse(
        error instanceof Error
          ? error.message
          : "La brujita no pudo responder ahora, pero estamos trabajando en ello."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f7f7fb_0%,_#fff8f2_45%,_#fef3f2_100%)] px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <main className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-700">Brujita Buena 1.0</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Curación íntima</span>
              </div>
              <h1 className="text-3xl font-black sm:text-4xl">Tu guía mágica para sanar, elegir y sentirse acompañada.</h1>
              <p className="text-base text-slate-600">
                Encontrá claridad para lo que te pasa, elegí una bruja o una guía IA y sentí la experiencia de Brujita Buena más cerca de lo que soñaste.
              </p>
            </div>
            <div className="flex gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
              <button onClick={() => setView("home")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === "home" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>
                Inicio
              </button>
              <button onClick={() => setView("profile")} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === "profile" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}>
                Mi perfil
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-fuchsia-600">Qué te anda pasando</p>
              <h2 className="text-2xl font-bold">Buscá lo que te pesa y encontrá una guía que te acompañe.</h2>
            </div>
            <div className="w-full max-w-xl rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Escribí algo como amor, ansiedad, trabajo o sueño..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">Sugerencias rápidas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {filteredProblems.slice(0, 6).map((problem) => (
                  <button
                    key={problem.name}
                    onClick={() => {
                      setSelectedProblem(problem.name);
                      setSearchTerm(problem.name);
                    }}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-fuchsia-300 hover:text-fuchsia-700"
                  >
                    {problem.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-fuchsia-100 bg-fuchsia-50/80 p-4">
              <p className="text-sm font-semibold text-fuchsia-700">Curadores recomendados</p>
              <div className="mt-3 space-y-3">
                {guides.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setGuide(item.name)}
                    className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.tone}</p>
                    </div>
                    <div className="text-sm font-semibold text-fuchsia-700">★ {item.rating}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {view === "home" ? (
          <>
            <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-sky-600">Males</p>
                    <h2 className="text-2xl font-bold">Elegí el tema que te acompaña</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{selectedProblem ?? "Sin elegir"}</div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {filteredProblems.map((problem) => (
                    <button
                      key={problem.name}
                      type="button"
                      onClick={() => setSelectedProblem(problem.name)}
                      className={`rounded-[22px] border p-4 text-left transition ${selectedProblem === problem.name ? "border-fuchsia-500 bg-fuchsia-50 shadow-sm" : "border-slate-200 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">{problem.name}</p>
                          <p className="mt-2 text-sm text-slate-600">{problem.description}</p>
                        </div>
                        <div className="text-2xl">{problem.icon}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-fuchsia-600">Guías</p>
                    <h2 className="text-2xl font-bold">¿Quién querés que te acompañe?</h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {guides.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setGuide(item.name)}
                      className={`rounded-[22px] border p-4 text-left transition ${guide === item.name ? "border-fuchsia-500 bg-fuchsia-50" : "border-slate-200 hover:border-fuchsia-200"}`}
                    >
                      <div className={`rounded-2xl bg-gradient-to-br ${item.accent} p-3 text-white`}>
                        <p className="text-lg font-semibold">{item.name}</p>
                        <p className="text-sm opacity-90">{item.tone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold">Curación con {guide}</h2>
              <div className="mt-3 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/70 p-4 text-sm text-slate-600">
                {activeProfile
                  ? `Perfil activo: ${activeProfile.name} · Tema: ${selectedProblem ?? "sin seleccionar"}`
                  : "Seleccioná o creá un perfil personal para que Sabrina te conozca mejor."}
              </div>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Contame qué te pasa y qué necesitas recibir..."
                className="mt-4 min-h-28 w-full rounded-[22px] border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
              />
              <button
                onClick={handleHealing}
                disabled={loading || !input.trim() || !selectedProblem || !activeProfile}
                className="mt-4 w-full rounded-2xl bg-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? "Consultando..." : "Pedir curación"}
              </button>
              <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {response}
              </div>
            </section>
          </>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-fuchsia-600">Perfil</p>
                  <h2 className="text-2xl font-bold">Tu espacio personal</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-xl text-white shadow-lg">✨</div>
              </div>

              <div className="mt-6 rounded-[24px] border border-fuchsia-100 bg-fuchsia-50/70 p-4">
                {activeProfile ? (
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-fuchsia-700">{activeProfile.name}</p>
                    <p className="text-sm text-slate-600">Especialidades: {activeProfile.specialities.join(", ")}</p>
                    <p className="text-sm text-slate-600">Listo para recibir apoyo, claridad y una guía mágica cuando la necesites.</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">Creá un perfil para que la experiencia sea más personal y cálida.</p>
                )}
              </div>

              {profiles.length > 0 ? (
                <div className="mt-6 space-y-3">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => setActiveProfileId(profile.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${activeProfileId === profile.id ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-200 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-base font-semibold">{profile.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{profile.specialities.join(", ")}</p>
                        </div>
                        {activeProfileId === profile.id ? <span className="rounded-full bg-fuchsia-600 px-3 py-1 text-xs font-semibold text-white">Activo</span> : null}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Todavía no hay perfiles guardados. Creá el primero para empezar.</div>
              )}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold">Crear nuevo perfil</h2>
              <input
                value={newProfileName}
                onChange={(event) => setNewProfileName(event.target.value)}
                placeholder="Nombre del perfil"
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
              />
              <p className="mt-4 text-sm text-slate-600">Elegí los temas que querés que acompañen este perfil.</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {problems.map((problem) => (
                  <button
                    key={problem.name}
                    type="button"
                    onClick={() => toggleSpeciality(problem.name)}
                    className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${newProfileSpecialities.includes(problem.name) ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-200 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50"}`}
                  >
                    <span className="mr-2">{problem.icon}</span>
                    {problem.name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddProfile}
                className="mt-5 w-full rounded-2xl bg-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-700"
              >
                Guardar perfil
              </button>
            </div>
          </section>
        )}

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">El siguiente paso</h2>
              <p className="mt-2 text-slate-600">Ahora vamos a pulir la navegación tipo app de iOS, sumar más detalle visual y luego conectar Firebase con perfiles reales.</p>
            </div>
            <Link href="https://cafecito.app/brujitabuenaapp" className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600">
              Invitar una poción mágica
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
