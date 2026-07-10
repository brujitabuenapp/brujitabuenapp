import SwiftUI

struct LoginView: View {
    @Environment(\.dismiss) var dismiss
    @State private var idIngresado = ""
    @State private var brujitaEncontrada: Brujita?
    @State private var mostrarInfo = false
    @State private var mostrarPerfil = false
    @State private var mostrarRecuperar = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("🔐 Iniciar sesión como brujita")
                    .font(.title)
                    .bold()
                    .padding(.top)

                TextField("Tu ID de brujita", text: $idIngresado)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .autocapitalization(.none)
                    .onChange(of: idIngresado) { nuevoValor in
                        if !nuevoValor.hasPrefix("brujita_") {
                            idIngresado = "brujita_\(nuevoValor)"
                        }
                    }
                    .padding(.horizontal)

                Button("Buscar mi cuenta") {
                    let idFormateado = idIngresado.lowercased()
                    print("Buscando brujita con ID: \(idFormateado)")

                    FirebaseService.obtenerBrujitaPorID(idFormateado) { brujita in
                        DispatchQueue.main.async {
                            self.brujitaEncontrada = brujita
                            self.mostrarInfo = true
                            if brujita != nil {
                                self.mostrarPerfil = true
                            }
                        }
                    }
                }

                if mostrarInfo && brujitaEncontrada == nil {
                    Text("🧙‍♀️ No se encontró ninguna brujita con ese ID.")
                        .foregroundColor(.red)
                        .padding(.top)
                }

                Button("¿Olvidaste tu ID mágico?") {
                    mostrarRecuperar = true
                }
                .font(.footnote)
                .sheet(isPresented: $mostrarRecuperar) {
                    RecuperarIDView()
                }

                Spacer()
            }
            .padding()
            .navigationDestination(isPresented: $mostrarPerfil) {
                if let brujita = brujitaEncontrada {
                    PerfilBrujitaView(
                        brujita: Binding(
                            get: { brujita },
                            set: { nuevoValor in
                                self.brujitaEncontrada = nuevoValor
                            }
                        )
                    )
                }
            }
        }
    }
}
