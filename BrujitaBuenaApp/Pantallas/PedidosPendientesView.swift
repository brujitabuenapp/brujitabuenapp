import SwiftUI

struct PedidosPendientesView: View {
    @State private var pedidos: [Pedido] = [
        Pedido(id: UUID().uuidString, mal: "Empacho", mensaje: "Me duele la panza hace días."),
        Pedido(id: UUID().uuidString, mal: "Mal de ojo", mensaje: "Desde ayer estoy mareada."),
        Pedido(id: UUID().uuidString, mal: "Tristeza", mensaje: "Necesito una energía más positiva.")
    ]
    
    @State private var mensajesPersonalizados: [String: String] = [:]
    @State private var pedidosCurados: [String: Bool] = [:]

    var body: some View {
        NavigationView {
            List {
                ForEach(pedidos) { pedido in
                    Section(header: Text(pedido.mal).font(.headline)) {
                        Text("📝 Pedido: \(pedido.mensaje)")
                            .padding(.bottom, 5)

                        Toggle("✅ Marcar como curado", isOn: Binding(
                            get: { pedidosCurados[pedido.id] ?? false },
                            set: { nuevoValor in
                                pedidosCurados[pedido.id] = nuevoValor
                            }
                        ))

                        if pedidosCurados[pedido.id] == true {
                            TextField("🧙‍♀️ Nota mágica para el paciente...", text: Binding(
                                get: { mensajesPersonalizados[pedido.id] ?? "" },
                                set: { mensajesPersonalizados[pedido.id] = $0 }
                            ))
                            .textFieldStyle(RoundedBorderTextFieldStyle())

                            Button("✨ Enviar notificación") {
                                let mensaje = mensajesPersonalizados[pedido.id] ?? "Has sido curado 🌟"
                                print("Notificación enviada: \(mensaje)")
                                print("¿Querés invitar a la brujita con una poción mágica? ☕")
                            }
                            .font(.subheadline)
                            .foregroundColor(.blue)
                        }
                    }
                }
            }
            .navigationTitle("Pedidos pendientes")
        }
    }
}

struct Pedido: Identifiable {
    var id: String
    var mal: String
    var mensaje: String
}

#Preview {
    PedidosPendientesView()
}
