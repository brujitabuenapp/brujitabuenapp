"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Profile = {
  id: string;
  name: string;
  specialities: string[];
  isBrujita: boolean;
  cureSpecialities: string[];
};

const problems = [
  { name: "Amor", icon: "💗" },
  { name: "Trabajo", icon: "💼" },
  { name: "Salud", icon: "🌿" },
  { name: "Dinero", icon: "💸" },
  { name: "Ansiedad", icon: "🕯️" },
  { name: "Dormir", icon: "🌙" },
  { name: "Mala energía", icon: "✨" },
  { name: "Confusión", icon: "🪄" },
];

const STORAGE_KEY = "brujita-buena-profiles";

export default function PerfilPage() {
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
        const parsed = JSON.parse(saved) as Profile[];
        setProfiles(parsed);
        setActiveProfileId(parsed[0]?.id ?? null);
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

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,_#f7f7fb_0%,_#fff8f2_45%,_#fef3f2_100%)] px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-600">Mi perfil</p>
              <h1 className="text-3xl font-black sm:text-4xl">Tu espacio personal, aparte del inicio.</h1>
            </div>
            <Link href="/" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Volver al inicio
            </Link>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-fuchsia-600">Perfil activo</p>
                <h2 className="text-2xl font-bold">{activeProfile ? activeProfile.name : "Sin perfil todavía"}</h2>
              </div>
              <div className="rounded-full bg-fuchsia-100 px-3 py-1 text-sm font-semibold text-fuchsia-700">
                {activeProfile?.isBrujita ? "Brujita/o" : "Usuario/a"}
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-fuchsia-100 bg-fuchsia-50/70 p-4">
              {activeProfile ? (
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Especialidades: {activeProfile.specialities.join(", ")}</p>
                  {activeProfile.isBrujita && activeProfile.cureSpecialities.length > 0 ? (
                    <p className="text-sm text-slate-600">Sabe curar: {activeProfile.cureSpecialities.join(", ")}</p>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-slate-600">Creá un perfil para que la experiencia sea más personal y cálida.</p>
              )}
            </div>

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
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            <h2 className="text-2xl font-bold">Crear nuevo perfil</h2>
            <input
              value={newProfileName}
              onChange={(event) => setNewProfileName(event.target.value)}
              placeholder="Nombre del perfil"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-100"
            />
            <label className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <span>¿Sos brujita/o?</span>
              <input
                type="checkbox"
                checked={newProfileIsBrujita}
                onChange={(event) => setNewProfileIsBrujita(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
              />
            </label>
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
            {newProfileIsBrujita ? (
              <>
                <p className="mt-4 text-sm text-slate-600">¿Qué males sabés curar?</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {problems.map((problem) => (
                    <button
                      key={`${problem.name}-cure`}
                      type="button"
                      onClick={() => toggleCureSpeciality(problem.name)}
                      className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${newProfileCureSpecialities.includes(problem.name) ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-200 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50"}`}
                    >
                      <span className="mr-2">{problem.icon}</span>
                      {problem.name}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <button
              type="button"
              onClick={handleAddProfile}
              className="mt-5 w-full rounded-2xl bg-fuchsia-600 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-700"
            >
              Guardar perfil
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
