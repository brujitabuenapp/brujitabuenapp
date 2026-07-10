import SwiftUI

struct PerfilBrujitaView: View {
    @Binding var brujita: Brujita
    @State private var mostrarEditarPerfil = false
    @State private var mostrarPedidos = false
    @State private var pedidosSimulados = ["Curación de empacho", "Limpieza energética"]

    var body: some View {
        VStack(spacing: 16) {
            Text("🌟 ¡Bienvenida, \(brujita.nombre)!")
                .font(.title2)
                .bold()

            if let conocimientos = brujita.conocimientos {
                Text("🧪 Saberes: \(conocimientos.joined(separator: ", "))")
            }

            if let email = brujita.email {
                Text("📧 Email: \(email)")
            }

            if let celular = brujita.celular {
                Text("📱 Celular: \(celular)")
            }

            if let cafecito = brujita.cafecito {
                Text("☕ Cafecito: \(cafecito)")
            }

            Button("Editar mi perfil") {
                mostrarEditarPerfil = true
            }

            Button("Pedidos pendientes x \(pedidosSimulados.count)") {
                mostrarPedidos = true
            }
            .padding(.top)

            Spacer()
        }
        .padding()
        .navigationTitle("Perfil")
        .sheet(isPresented: $mostrarEditarPerfil, onDismiss: {
            FirebaseService.obtenerBrujitaPorID(brujita.id) { nueva in
                if let nueva = nueva {
                    self.brujita = nueva
                }
            }
        }) {
            EditarPerfilView(brujita: $brujita)
        }
        .sheet(isPresented: $mostrarPedidos) {
            PedidosPendientesView()
        }
    }
}
