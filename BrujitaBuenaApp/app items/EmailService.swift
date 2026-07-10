import Foundation

struct EmailService {
    static func enviarInfoDeCuenta(brujita: Brujita) {
        let id = brujita.id
        let email = brujita.email ?? "no especificado"
        let conocimientos = brujita.conocimientos?.joined(separator: ", ") ?? "no especificados"
        let celular = brujita.celular ?? "no especificado"
        let cafecito = brujita.cafecito ?? "no especificado"

        let contenido = """
        🧙‍♀️ ¡Hola, \(brujita.nombre)!

        Te damos la bienvenida a Brujita Buena App ✨

        📛 ID mágico: \(id)
        🧠 Saberes: \(conocimientos)
        📧 Email mágico: \(email)
        📱 Celular: \(celular)
        ☕ Link de Cafecito: \(cafecito)

        ¡Guardá esta info para futuras sesiones y para recibir pedidos de curación!
        """

        print("✉️ Enviando correo a \(email):\n\(contenido)")
    }
}
