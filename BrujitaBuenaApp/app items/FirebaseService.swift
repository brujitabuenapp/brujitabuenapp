import Foundation
import FirebaseFirestore

struct FirebaseService {
    static let db = Firestore.firestore()

    // 🔍 Obtener brujita por ID (login)
    static func obtenerBrujitaPorID(_ id: String, completion: @escaping (Brujita?) -> Void) {
        let idFormateado = id.lowercased()
        db.collection("brujitas").document(idFormateado).getDocument { document, error in
            if let document = document, document.exists {
                let data = document.data() ?? [:]
                let brujita = Brujita(
                    id: idFormateado,
                    nombre: data["nombre"] as? String ?? "",
                    conocimientos: data["conocimientos"] as? [String] ?? [],
                    reputacion: data["reputacion"] as? Double ?? 0.0,
                    email: data["email"] as? String,
                    celular: data["celular"] as? String,
                    cafecito: data["cafecito"] as? String
                )
                completion(brujita)
            } else {
                completion(nil)
            }
        }
    }

    // ✅ Registrar nueva brujita
    static func guardarBrujita(_ brujita: Brujita, completion: @escaping (Bool) -> Void) {
        let idFormateado = brujita.id.lowercased()
        db.collection("brujitas").document(idFormateado).setData([
            "nombre": brujita.nombre,
            "conocimientos": brujita.conocimientos ?? [],
            "reputacion": brujita.reputacion ?? 0.0,
            "email": brujita.email?.lowercased() ?? "",
            "celular": brujita.celular ?? "",
            "cafecito": brujita.cafecito ?? ""
        ]) { error in
            completion(error == nil)
        }
    }

    // 🔁 Actualizar datos de la brujita (editar perfil)
    static func actualizarBrujita(_ brujita: Brujita, completion: @escaping (Bool) -> Void) {
        guard let id = brujita.id.lowercased() as String? else {
            completion(false)
            return
        }

        db.collection("brujitas").document(id).updateData([
            "nombre": brujita.nombre,
            "conocimientos": brujita.conocimientos ?? [],
            "reputacion": brujita.reputacion ?? 0.0,
            "email": brujita.email?.lowercased() ?? "",
            "celular": brujita.celular ?? "",
            "cafecito": brujita.cafecito ?? ""
        ]) { error in
            completion(error == nil)
        }
    }

    // 📬 Buscar ID mágico a partir del email
    static func buscarIDPorEmail(_ email: String, completion: @escaping (String?) -> Void) {
        db.collection("brujitas")
            .whereField("email", isEqualTo: email.lowercased())
            .getDocuments { snapshot, error in
                if let error = error {
                    print("Error buscando por email: \(error.localizedDescription)")
                    completion(nil)
                    return
                }

                if let document = snapshot?.documents.first {
                    completion(document.documentID)
                } else {
                    completion(nil)
                }
            }
    }
}

