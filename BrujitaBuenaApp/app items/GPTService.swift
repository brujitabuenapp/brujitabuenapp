import Foundation

class GPTService {
    static let shared = GPTService()

    private let apiKey: String = {
        guard let path = Bundle.main.path(forResource: "Config", ofType: "plist"),
              let dict = NSDictionary(contentsOfFile: path),
              let key = dict["OpenAIAPIKey"] as? String,
              !key.isEmpty else {
            fatalError("Config.plist no encontrado o OpenAIAPIKey faltante")
        }
        return key
    }()

    private let endpoint = "https://api.openai.com/v1/chat/completions"

    func sendMessage(guide: String, userMessage: String, completion: @escaping (String) -> Void) {
        guard let url = URL(string: endpoint) else { return }

        let headers = [
            "Content-Type": "application/json",
            "Authorization": "Bearer \(apiKey)"
        ]

        let systemPrompt = guide == "Sabrina" ?
        "Responde como una bruja cálida y maternal. Usa palabras como 'mi cielo', 'amor', y recomienda hierbas mágicas." :
        "Responde como un mago sabio y bromista. Usa palabras como 'tranqui', 'esto lo resolvemos fácil', 'cubierto de luz azul'."

        let body: [String: Any] = [
            "model": "gpt-3.5-turbo",
            "messages": [
                ["role": "system", "content": systemPrompt],
                ["role": "user", "content": userMessage]
            ],
            "temperature": 0.7
        ]

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.allHTTPHeaderFields = headers
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, _, _ in
            if let data = data,
               let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let choices = json["choices"] as? [[String: Any]],
               let message = choices.first?["message"] as? [String: Any],
               let content = message["content"] as? String {
                DispatchQueue.main.async {
                    completion(content.trimmingCharacters(in: .whitespacesAndNewlines))
                }
            } else {
                DispatchQueue.main.async {
                    completion("Error al obtener respuesta de la brujita 😞")
                }
            }
        }.resume()
    }
}
