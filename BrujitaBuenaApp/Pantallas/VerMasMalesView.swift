import SwiftUI

struct VerMasMalesView: View {
    let todosLosMales: [String]
    let onSeleccionarMal: (String) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationView {
            List(todosLosMales, id: \.self) { mal in
                Button(action: {
                    onSeleccionarMal(mal)
                    dismiss()
                }) {
                    Text(mal)
                        .padding()
                }
            }
            .navigationTitle("Ver más males")
        }
    }
}
