import SwiftUI

struct EditarPerfilView: View {
    @Environment(\.dismiss) var dismiss
    @Binding var brujita: Brujita
    @State private var conocimientosDisponibles = [
        "Empacho", "Mal de ojo", "Tristeza", "Insomnio", "Bloqueo",
        "Energía baja", "Dolor de cabeza", "Envidia", "Ansiedad", "Falta de amor"
    ]
    @State private var nuevoMal = ""

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Nombre mágico")) {
                    Text(brujita.nombre)
                }

                Section(header: Text("Email mágico")) {
                    TextField("ejemplo@magia.com", text: Binding(
                        get: { brujita.email ?? "" },
                        set: { brujita.email = $0 }
                    ))
                }

                Section(header: Text("Celular")) {
                    TextField("Tu número", text: Binding(
                        get: { brujita.celular ?? "" },
                        set: { brujita.celular = $0 }
                    ))
                }

                Section(header: Text("Link de Cafecito")) {
                    TextField("https://cafecito.app/...", text: Binding(
                        get: { brujita.cafecito ?? "" },
                        set: { brujita.cafecito = $0 }
                    ))
                }

                Section(header: Text("¿Qué sabés curar?")) {
                    ForEach(conocimientosDisponibles, id: \.self) { mal in
                        Toggle(mal, isOn: Binding(
                            get: { brujita.conocimientos?.contains(mal) ?? false },
                            set: { isOn in
                                if isOn {
                                    if brujita.conocimientos == nil {
                                        brujita.conocimientos = []
                                    }
                                    brujita.conocimientos?.append(mal)
                                } else {
                                    brujita.conocimientos?.removeAll { $0 == mal }
                                }
                            }
                        ))
                    }

                    HStack {
                        TextField("Otro mal...", text: $nuevoMal)
                        Button("Agregar") {
                            let malNuevo = nuevoMal.trimmingCharacters(in: .whitespaces)
                            if !malNuevo.isEmpty && !conocimientosDisponibles.contains(malNuevo) {
                                conocimientosDisponibles.append(malNuevo)
                                brujita.conocimientos?.append(malNuevo)
                                nuevoMal = ""
                            }
                        }
                    }
                }

                Section {
                    Button("✅ Guardar cambios") {
                        FirebaseService.actualizarBrujita(brujita) { exito in
                            if exito {
                                withAnimation {
                                    dismiss()
                                }
                            }
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .center)
                }
            }
            .navigationTitle("Editar perfil")
        }
    }
}
