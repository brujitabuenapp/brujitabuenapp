import SwiftUI

struct ContentView: View {
    let todosLosMales: [String]
    let onSeleccionarMal: (String) -> Void

    let columns = [
        GridItem(.flexible(), spacing: 20),
        GridItem(.flexible(), spacing: 20)
    ]

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("🧙‍♀️ Brujita Buena 🧙‍♂️")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("¿Qué te anda molestando hoy?")
                    .font(.title2)
                    .multilineTextAlignment(.center)

                // ⬇️ Scroll SOLO para los males
                ScrollView(.vertical) {
                    LazyVGrid(columns: columns, spacing: 20) {
                        ForEach(todosLosMales, id: \.self) { mal in
                            NavigationLink(destination: GuideSelectionView(malSeleccionado: mal)) {
                                Text(mal)
                                    .frame(maxWidth: .infinity, minHeight: 100)
                                    .background(Color.purple.opacity(0.2))
                                    .cornerRadius(20)
                                    .font(.headline)
                            }
                        }
                    }
                    .padding()
                }
                .frame(height: 370)
                // 👇 Botón para postularse
                NavigationLink(destination: PostularseView()) {
                    Text("🧙‍♀️ Ya soy una bruja")
                        .font(.footnote)
                        .foregroundColor(.purple)
                        .padding(.top, 20)
                }

                Spacer()
            }
            .padding()
        }
    }
}
