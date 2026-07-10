import SwiftUI

struct RecuperarIDView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var email = ""
    @State private var idRecuperado: String?
    @State private var mensajeError = ""

    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("🔍 Recuperar ID mágico")
                    .font(.title2)
                    .bold()

                TextField("Ingresá tu email mágico", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .autocapitalization(.none)

                Button("Buscar ID") {
                    let emailFormateado = email.lowercased()
                    FirebaseService.buscarIDPorEmail(emailFormateado) { id in
                        DispatchQueue.main.async {
                            if let id = id {
                                self.idRecuperado = id
                                self.mensajeError = ""
                            } else {
                                self.mensajeError = "No se encontró ninguna brujita con ese email."
                            }
                        }
                    }
                }

                if let id = idRecuperado {
                    Text("✨ Tu ID mágico es: **\(id)**")
                        .foregroundColor(.green)
                        .multilineTextAlignment(.center)
                        .padding(.top)
                } else if !mensajeError.isEmpty {
                    Text("🧙‍♀️ \(mensajeError)")
                        .foregroundColor(.red)
                        .multilineTextAlignment(.center)
                        .padding(.top)
                }

                Spacer()
            }
            .padding()
            .navigationBarTitle("Recuperar ID", displayMode: .inline)
            .navigationBarItems(leading:
                Button("< Atrás") {
                    presentationMode.wrappedValue.dismiss()
                }
            )
        }
    }
}
