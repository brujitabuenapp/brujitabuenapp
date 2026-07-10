import SwiftUI
import FirebaseFirestore

struct RealWitchesView: View {
    @State private var brujitas: [Brujita] = []
    var mal: String?

    var body: some View {
        VStack {
            Text("🔮 Brujitas Reales")
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding(.top)

            if filteredBrujitas.isEmpty {
                Text("Aún no hay brujitas reales para este mal. ¡Postulate vos 😌!")
                    .multilineTextAlignment(.center)
                    .padding()
            } else {
                List(filteredBrujitas.sorted { ($0.reputacion ?? 0.0) > ($1.reputacion ?? 0.0) }) { brujita in
                    VStack(alignment: .leading, spacing: 8) {
                        Text("🌙 \(brujita.nombre)")
                            .font(.headline)

                        Text("💬 \(brujita.conocimientos?.joined(separator: ", ") ?? "")")
                            .font(.subheadline)

                        if let reputacion = brujita.reputacion, reputacion > 0 {
                            Text("⭐️ Reputación: \(String(format: "%.1f", reputacion))")
                                .font(.footnote)
                        } else {
                            Text("✨ Aún sin reputación. ¡Tu ayuda puede ser la primera!")
                                .font(.footnote)
                                .foregroundColor(.gray)
                        }
                    }
                }
            }
        }
        .onAppear {
            fetchBrujitas()
        }
    }

    var filteredBrujitas: [Brujita] {
        guard let mal = mal?.lowercased() else { return brujitas }
        return brujitas.filter { $0.conocimientos?.map { $0.lowercased() }.contains(mal) ?? false }
    }

    func fetchBrujitas() {
        let db = Firestore.firestore()
        db.collection("brujitas").getDocuments { snapshot, error in
            if let error = error {
                print("Error al obtener brujitas: \(error.localizedDescription)")
                return
            }

            if let documents = snapshot?.documents {
                brujitas = documents.compactMap { doc in
                    let data = doc.data()
                    return Brujita(
                        id: doc.documentID,
                        nombre: data["nombre"] as? String ?? "",
                        conocimientos: data["conocimientos"] as? [String] ?? [],
                        reputacion: data["reputacion"] as? Double ?? 0.0,
                        email: data["email"] as? String,
                        celular: data["celular"] as? String,
                        cafecito: data["cafecito"] as? String
                    )
                }
            }
        }
    }
}
