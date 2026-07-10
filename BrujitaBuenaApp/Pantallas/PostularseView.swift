import SwiftUI

struct PostularseView: View {
    @Environment(\.dismiss) var dismiss
    @State private var nombre = ""
    @State private var conocimientos: [String] = []
    @State private var habilidadesDisponibles = ["Empacho", "Mal de ojo", "Tarot", "Feng Shui", "Limpieza energética"]
    @State private var nuevaHabilidad = ""
    @State private var email = ""
    @State private var celular = ""
    @State private var linkCafecito = ""
    @State private var mostrandoAlerta = false
    @State private var mensajeAlerta = ""

    var body: some View {
        VStack {
            Form {
                Section(header: Text("🌟 Tu nombre mágico")) {
                    TextField("Ej: Brujita Luz", text: $nombre)
                }

                Section(header: Text("💫 ¿Qué sabés curar?")) {
                    ForEach(habilidadesDisponibles, id: \.self) { habilidad in
                        Toggle(habilidad, isOn: Binding(
                            get: { conocimientos.contains(habilidad) },
                            set: { isOn in
                                if isOn {
                                    conocimientos.append(habilidad)
                                } else {
                                    conocimientos.removeAll { $0 == habilidad }
                                }
                            }
                        ))
                    }

                    HStack {
                        TextField("Otra habilidad...", text: $nuevaHabilidad)
                        Button("Agregar") {
                            let nueva = nuevaHabilidad.trimmingCharacters(in: .whitespaces)
                            guard !nueva.isEmpty && !habilidadesDisponibles.contains(nueva) else { return }
                            habilidadesDisponibles.append(nueva)
                            conocimientos.append(nueva)
                            nuevaHabilidad = ""
                        }
                    }
                }

                Section(header: Text("📬 Información mágica de contacto")) {
                    TextField("Email mágico", text: $email)
                        .keyboardType(.emailAddress)
                    TextField("Celular", text: $celular)
                        .keyboardType(.phonePad)
                    TextField("Link de Cafecito", text: $linkCafecito)
                        .keyboardType(.URL)
                }

                Section {
                    Button("✨ Convertirme en brujita real") {
                        registrarBrujita()
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
        }
        .padding(.top, 10) // 👈 padding agregado para bajar un poco todo
        .navigationTitle("Postularse como brujita")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: LoginView()) {
                    Text("Ya soy una bruja")
                        .font(.footnote)
                }
            }
        }
        .alert(isPresented: $mostrandoAlerta) {
            Alert(title: Text("🔮 Listo"), message: Text(mensajeAlerta), dismissButton: .default(Text("Aceptar")) {
                dismiss()
            })
        }
    }

    func registrarBrujita() {
        let id = "brujita_\(nombre.lowercased().replacingOccurrences(of: " ", with: "_"))"

        let nueva = Brujita(
            id: id,
            nombre: nombre,
            conocimientos: conocimientos,
            reputacion: 0.0,
            email: email,
            celular: celular,
            cafecito: linkCafecito
        )

        FirebaseService.guardarBrujita(nueva) { exito in
            if exito {
                EmailService.enviarInfoDeCuenta(brujita: nueva)
                mensajeAlerta = "Tu cuenta fue creada con éxito. Revisa tu correo mágico 🧙‍♀️"
                mostrandoAlerta = true
            } else {
                mensajeAlerta = "Hubo un problema al guardar tu cuenta. Intentá de nuevo 🫣"
                mostrandoAlerta = true
            }
        }
    }
}
