"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Profile = {
  id: string;
  name: string;
  specialities: string[];
  isBrujita: boolean;
  cureSpecialities: string[];
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
  const [newProfileIsBrujita, setNewProfileIsBrujita] = useState(false);
  const [newProfileCureSpecialities, setNewProfileCureSpecialities] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<Profile>[];
        const normalizedProfiles = parsed.map((profile) => ({
          id: profile.id || `profile-${Date.now()}`,
          name: profile.name || "Mi perfil",
          specialities: profile.specialities || [],
          isBrujita: Boolean(profile.isBrujita),
          cureSpecialities: profile.cureSpecialities || [],
        }));

        if (normalizedProfiles.length > 0) {
          setProfiles(normalizedProfiles);
          setActiveProfileId(normalizedProfiles[0].id);
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

  const libraryCards = useMemo(() => {
    if (!selectedProblem) return [];

    return [
      {
        title: `Curación con Sabrina`,
        description: `Una guía cálida para ${selectedProblem.toLowerCase()} con preguntas suaves y rituales simbólicos.`,
        tag: "IA",
        kind: "ia" as const,
        actionLabel: "Hablar con Sabrina",
      },
      {
        title: `Ritual de luz`,
        description: `Te guiamos con una práctica breve y simbólica para bajar la carga emocional y volver a sentirte más liviano.`,
        tag: "Ritual",
        kind: "ritual" as const,
        actionLabel: "Probar ritual",
      },
      {
        title: `Brujo/a real`,
        description: `También podés elegir una guía humana para acompañarte con ${selectedProblem.toLowerCase()} y seguir adelante.`,
        tag: "Real",
        kind: "real" as const,
        actionLabel: "Ver brujos reales",
      },
    ];
  }, [selectedProblem]);

  const recommendedResources = useMemo(() => {
    if (!selectedProblem) return [];

    const normalized = selectedProblem.toLowerCase();

    if (normalized.includes("empacho") || normalized.includes("panza") || normalized.includes("vientre") || normalized.includes("estómago")) {
      return [
        {
          type: "Curación",
          title: "Empacho: una curación sencilla",
          description: "Te guiamos con una propuesta suave, simbólica y acompañada para bajar la sensación de pesadez.",
        },
        {
          type: "Documento",
          title: "Guía de cuidados digestivos",
          description: "Un mini documento con hábitos, respiración y calma para el cuerpo.",
        },
        {
          type: "Blog",
          title: "Qué hacer cuando te duele la panza",
          description: "Un relato breve con recomendaciones suaves y esperanzadoras.",
        },
        {
          type: "Video",
          title: "Ritual de alivio y descanso",
          description: "Un video breve para detenerte, respirar y sentirte más liviano.",
        },
      ];
    }

    return [
      {
        type: "Documento",
        title: `Guía para ${selectedProblem.toLowerCase()}`,
        description: "Un mini recurso para acompañarte en esta etapa con calma y claridad.",
      },
      {
        type: "Blog",
        title: `Qué suele ayudar con ${selectedProblem.toLowerCase()}`,
        description: "Ideas cortas, suaves y fáciles de llevar a la práctica.",
      },
      {
        type: "Video",
        title: `Ritual breve para ${selectedProblem.toLowerCase()}`,
        description: "Una pequeña guía visual para bajar la carga y seguir adelante.",
      },
    ];
  }, [selectedProblem]);

  const toggleSpeciality = (problem: string) => {
    setNewProfileSpecialities((current) =>
      current.includes(problem) ? current.filter((value) => value !== problem) : [...current, problem]
    );
  };

  const toggleCureSpeciality = (problem: string) => {
    setNewProfileCureSpecialities((current) =>
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
      isBrujita: newProfileIsBrujita,
      cureSpecialities: newProfileIsBrujita
        ? newProfileCureSpecialities.length > 0
          ? newProfileCureSpecialities
          : ["Ansiedad", "Mala energía"]
        : [],
    };

    const updated = [newProfile, ...profiles];
    setProfiles(updated);
    setActiveProfileId(newProfile.id);
    setNewProfileName("");
    setNewProfileSpecialities([]);
    setNewProfileIsBrujita(false);
    setNewProfileCureSpecialities([]);
  };

  const handleLibrarySelection = (kind: "ia" | "ritual" | "real") => {
    if (kind === "real") {
      setGuide("Dumbly");
      setResponse(`Perfecto, vamos a mirar una guía humana para ${selectedProblem ?? "tu tema"}.`);
      return;
    }

    setGuide("Sabrina");
    setResponse(
      kind === "ritual"
        ? `Sabrina te prepara un ritual simbólico para ${selectedProblem ?? "tu tema"}.`
        : `Sabrina está lista para acompañarte con ${selectedProblem ?? "tu tema"}.`
    );
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
              <Link href="/" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900">
                Inicio
              </Link>
              <Link href="/perfil" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900">
                Mi perfil
              </Link>
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

        <>
          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-sky-600">Tema</p>
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
                  <p className="text-sm font-semibold text-fuchsia-600">Tu perfil</p>
                  <h2 className="text-2xl font-bold">Tu espacio personal</h2>
                </div>
                <Link href="/perfil" className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-700">
                  Abrir perfil
                </Link>
              </div>
              <div className="mt-4 rounded-[24px] border border-fuchsia-100 bg-fuchsia-50/70 p-4">
                {activeProfile ? (
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-fuchsia-700">{activeProfile.name}</p>
                    <p className="text-sm text-slate-600">{activeProfile.isBrujita ? "Brujita/o" : "Usuario/a"}</p>
                    <p className="text-sm text-slate-600">Especialidades: {activeProfile.specialities.join(", ")}</p>
                    {activeProfile.isBrujita && activeProfile.cureSpecialities.length > 0 ? (
                      <p className="text-sm text-slate-600">Sabe curar: {activeProfile.cureSpecialities.join(", ")}</p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">Creá un perfil para que la experiencia sea más personal y cálida.</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-fuchsia-600">Biblioteca de curaciones</p>
                <h2 className="text-2xl font-bold">Elegí cómo seguir cuando ya sabes qué te pasa</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">{selectedProblem ? "Listo para acompañarte" : "Elegí un tema"}</div>
            </div>

            {!selectedProblem ? (
              <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                Elegí un tema en la parte de arriba para abrir la biblioteca de curaciones, brujos reales y rituales simbólicos.
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {libraryCards.map((item) => (
                    <div key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-700">{item.tag}</span>
                        <span className="text-xs font-medium text-slate-500">{selectedProblem}</span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-slate-800">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      <button
                        type="button"
                        onClick={() => handleLibrarySelection(item.kind)}
                        className="mt-4 w-full rounded-2xl bg-fuchsia-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-fuchsia-700"
                      >
                        {item.actionLabel}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-fuchsia-100 bg-fuchsia-50/70 p-4">
                  <p className="text-sm font-semibold text-fuchsia-700">Recursos para seguir</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {recommendedResources.map((resource) => (
                      <div key={`${resource.type}-${resource.title}`} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{resource.type}</p>
                        <h4 className="mt-2 text-base font-semibold text-slate-800">{resource.title}</h4>
                        <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>

          <section id="curacion" className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
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
