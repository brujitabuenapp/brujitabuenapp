# Biblia de Brujita Buena

## 1. Visión del proyecto

Brujita Buena es una experiencia de cuidado emocional y espiritual para personas que buscan apoyo, claridad y una guía cálida en momentos difíciles. La propuesta combina una estética cuidada, un tono humano y una sensación de magia íntima.

No es solo una app de chat. Es una experiencia emocional que debe sentirse:
- cercana,
- segura,
- intuitiva,
- femenina y cálida,
- moderna, pero con alma.

## 2. Filosofía

### Qué busca transmitir
- Calidez.
- Empatía.
- Protección.
- Magia simple y real.
- Ayuda sin juicio.

### Qué no debe ser
- Fría.
- Muy corporativa.
- Aburrida.
- Excesivamente técnica.
- Muy agresiva visualmente.

## 3. Identidad de marca

### Tonalidad
- Nombre: Brujita Buena.
- Personalidad: maternal, sabia, luminosa, acogedora, discreta.
- Lenguaje: cercano, tierno, claro, con un toque mágico.

### Principios visuales
- Fondo claro y suave.
- Paleta de lavanda, rosa, fucsia, azul cielo y crema.
- Bordes redondeados.
- Sombras suaves.
- Elementos que recuerden a una app de iOS: tarjetas, espaciado limpio, jerarquía visual clara.

## 4. Diseño visual

### Paleta base
- Fucsia: #d946ef
- Púrpura: #9333ea
- Azul cielo: #38bdf8
- Verde menta: #34d399
- Crema: #fff7ed
- Texto principal: #0f172a
- Texto secundario: #475569

### Tipografía
- Usar tipografías modernas y legibles.
- Títulos con peso fuerte y un toque premium.
- Textos secundarios con menor contraste y mayor aire.

### Componentes
- Tarjetas con bordes redondeados.
- Botones con estado hover y estado activo.
- Espaciado generoso.
- Inputs limpios y suaves.
- Secciones separadas visualmente como en una app iOS.

## 5. Experiencia de usuario

### Flujo principal
1. El usuario elige un mal o tema que lo preocupa.
2. Ve opciones de guía: Sabrina o Dumbly.
3. Puede pedir una curación o ayuda emocional.
4. El sistema responde con una experiencia amable y relevante.
5. Opcionalmente, se puede guardar un perfil personal o entrar a una experiencia más profunda.

### Reglas UX
- Siempre ayudar primero.
- Nunca saturar al usuario con demasiadas opciones de golpe.
- Guiar con claridad.
- Acompañar con lenguaje cálido.
- Hacer que cada pantalla se sienta simple y elegante.

## 6. Pantallas clave

### Inicio / Home
- Bienvenida cálida.
- Pregunta principal: “¿Qué te anda molestando hoy?”
- Tarjetas de temas.

### Perfil
- Mostrar el perfil activo.
- Permitir crear y guardar perfiles personales con especialidades.
- Tener una vista limpia, tipo card, con estado activo.

### Males
- Listado visual de problemas posibles.
- Cada mal debe tener un icono, una etiqueta y una descripción breve.
- La selección debe sentirse clara y casi táctil.

### Guía
- Mostrar opciones de Sabrina y Dumbly.
- El usuario elige quién le acompaña.

### Curación
- Mostrar un campo de texto para escribir la consulta.
- Mostrar una respuesta del sistema o de la IA.
- Mantener el tono amable y emocional.

### Brujitas reales
- Vista para explorar perfiles reales de brujitas.
- Mostrar especialidades, reputación y contacto.

### Login / Perfil de brujita
- Ingreso con ID.
- Visualización del perfil.
- Edición de datos.

## 7. Modelo de datos sugerido

### Colección de perfiles
- id
- nombre
- especialidades
- email
- celular
- reputacion
- cafecito

### Colección de solicitudes
- id
- usuario
- mal
- guía
- mensaje
- estado
- fecha

### Colección de brujitas reales
- id
- nombre
- especialidades
- reputación
- contacto

## 8. Integración con IA

### OpenAI
- Se usará para generar respuestas cálidas y contextuales.
- Debe hacerse desde un endpoint seguro del backend.
- No se deben exponer claves en el cliente.

### Comportamiento esperado
- Sabrina: tono maternal, emocional, intuitivo.
- Dumbly: tono más juguetón y claro.

## 9. Roadmap

### Fase 1 — MVP web
- Perfil personal.
- Selección de males.
- Guía Sabrina/Dumbly.
- Curación por texto.
- Diseño tipo iOS.

### Fase 2 — Comunidad
- Brujitas reales.
- Login y edición de perfil.
- Pedidos pendientes.
- Notificaciones de estado.

### Fase 3 — Producto completo
- Firebase real.
- Autenticación.
- Persistencia de usuarios.
- Mejoras de diseño y animaciones.

## 10. Instrucciones de implementación

- Mantener el diseño limpio y visualmente premium.
- Construir primero la experiencia de usuario.
- Repetir sobre componentes reutilizables.
- Avanzar feature por feature.
- Priorizar la estética y la claridad por sobre la complejidad técnica.
