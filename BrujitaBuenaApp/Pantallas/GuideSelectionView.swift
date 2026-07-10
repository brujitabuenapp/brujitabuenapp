import SwiftUI

struct GuideSelectionView: View {
    var malSeleccionado: String

    var body: some View {
        VStack(spacing: 20) {
            Text("¿Quién querés que te ayude?")
                .font(.title)
                .multilineTextAlignment(.center)

            HStack(spacing: 20) {
                NavigationLink(destination: HealingView(guide: "Sabrina")) {
                    VStack {
                        Image(systemName: "wand.and.stars")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 60, height: 60)
                        Text("Sabrina")
                            .font(.headline)
                    }
                    .frame(width: 120, height: 120)
                    .background(Color.purple.opacity(0.2))
                    .cornerRadius(20)
                }

                NavigationLink(destination: HealingView(guide: "Dumbly")) {
                    VStack {
                        Image(systemName: "wand.and.stars.inverse")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 60, height: 60)
                        Text("Dumbly")
                            .font(.headline)
                    }
                    .frame(width: 120, height: 120)
                    .background(Color.blue.opacity(0.2))
                    .cornerRadius(20)
                }
            }

            // Pasa correctamente el malSeleccionado a RealWitchesView
            NavigationLink(destination: RealWitchesView(mal: malSeleccionado)) {
                Text("✨ Quiero una Brujita Real ✨")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.yellow.opacity(0.5))
                    .cornerRadius(12)
                    .font(.headline)
                    .foregroundColor(.blue)
            }
            .padding(.horizontal, 20)

            Spacer()
        }
        .padding()
    }
}
