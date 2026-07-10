// BrujitaBuenaApp.swift
import SwiftUI

@main
struct BrujitaBuenaAppApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate

    var body: some Scene {
        WindowGroup {
            NavigationStack {
                ContentView(
                    todosLosMales: [
                        "Mal de ojo", "Empacho", "Tristeza",
                        "Insomnio", "Bloqueo", "Energía baja",
                        "Dolor de panza", "Ansiedad", "Ataque psíquico",
                        "Envidia", "Nervios", "Desamor", "Ojeras mágicas"
                    ],
                    onSeleccionarMal: { mal in
                        print("Mal seleccionado: \(mal)")
                    }
                )
            }
        }
    }
}
