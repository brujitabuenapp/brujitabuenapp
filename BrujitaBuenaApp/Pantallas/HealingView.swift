import SwiftUI

struct HealingView: View {
    var guide: String
    @State private var userInput = ""
    @State private var responseText = "Esperando tu consulta..."
    @State private var isLoading = false

    var body: some View {
        VStack(spacing: 20) {
            Text("✨ Curación con \(guide) ✨")
                .font(.title)
                .multilineTextAlignment(.center)

            Image(systemName: guide == "Sabrina" ? "wand.and.stars" : "wand.and.stars.inverse")
                .resizable()
                .scaledToFit()
                .frame(width: 100, height: 100)
                .padding()

            TextField("Contame qué te pasa...", text: $userInput)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)

            Button("Pedir Curación") {
                isLoading = true
                responseText = "Consultando a \(guide)..."
                let prompt = "\(guide): Curá este problema con un toque mágico. Usuario: \(userInput)"
                GPTService.shared.sendMessage(guide: guide, userMessage: prompt) { response in
                    responseText = response
                    isLoading = false
                }
            }
            .padding()
            .disabled(userInput.isEmpty || isLoading)
            .buttonStyle(.borderedProminent)

            ScrollView {
                Text(responseText)
                    .padding()
            }

            // BOTÓN DE DONACIÓN
            Link(destination: URL(string: "https://cafecito.app/brujitabuenaapp")!) {
                Text("🧪 Agradecele a \(guide == "Sabrina" ? "Sabri" : guide) invitándole una poción mágica")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.green.opacity(0.2))
                    .cornerRadius(12)
            }
            .padding(.top, 10)

            // BOTÓN A BRUJITA REAL
            NavigationLink(destination: RealWitchesView()) {
                Text("🧙‍♀️ Quiero obtener más ayuda con una brujita real")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.purple.opacity(0.2))
                    .cornerRadius(12)
            }

            Spacer()
        }
        .padding()
    }
}

#Preview {
    HealingView(guide: "Sabrina")
}
