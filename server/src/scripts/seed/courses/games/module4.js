module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 4. Interacción social y señales de alerta — 29–30 min ---
        const mod4 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 4: Interacción social y señales de alerta',
            description: 'Identificación de riesgos en la comunicación con otros.',
            duration: '28 min'
        });
        await Quiz.deleteMany({ refId: mod4._id, scope: 'module' });

        const l4_1 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 1: Ciberacoso, grooming y datos personales: señales básicas',
            content: `# Ciberacoso, grooming y datos personales: señales básicas

> **Perspectiva Estratégica**: No todo riesgo dentro de un videojuego empieza con algo claramente grave. A veces comienza con una burla repetida, una pregunta demasiado personal o una persona que pide guardar un secreto.

Este artículo no busca generar pánico, sino ayudar a madres, padres y tutores a reconocer tres riesgos que a veces aparecen mezclados dentro del juego: **ciberacoso**, **grooming** y **compartición de datos personales**. La clave es hablar con el menor sobre con quién se comunica, qué comparte y qué puede hacer si algo le incomoda.

---

![Lo primero: mantener la calma y escuchar cuando un menor cuenta una interacción de riesgo.](/article-images/videojuegos/M4A1.webp)

---

## Tres conceptos que conviene distinguir

Estos tres riesgos pueden aparecer mezclados dentro de una partida, chat o servidor, pero no significan lo mismo. Separarlos ayuda a decidir mejor qué revisar y cómo actuar.

| Concepto | Qué significa | Cómo puede aparecer en videojuegos | Qué revisar primero |
| --- | --- | --- | --- |
| **Ciberacoso** | Agresión digital repetida que humilla, amenaza, excluye o expone. | Insultos constantes, burlas por perder, exclusión de partidas, rumores o difusión de información privada. | Si la conducta se repite, si hay humillación pública y si el menor evita jugar o cambia de ánimo. |
| **Grooming / online enticement** | Acercamiento manipulador para ganar confianza, aislar al menor o presionarlo. | Halagos excesivos, amistad muy intensa, secretos, regalos, insistencia para hablar fuera del juego o peticiones personales. | Si pide privacidad, contacto externo, fotos, datos o que no lo cuente a la familia. |
| **Datos personales** | Información que identifica, ubica o expone al menor. | Preguntas sobre nombre real, escuela, teléfono, ubicación, rutinas, fotos o redes sociales. | Qué información se pidió, a quién se entregó y si puede usarse para contactar al menor fuera del juego. |

> **Idea clave**: El ciberacoso daña mediante agresión; el grooming manipula mediante confianza; la exposición de datos abre la puerta a contacto, presión o humillación fuera del juego.

---

## Mini glosario para padres

**Online enticement**: término usado por NCMEC para describir intentos de atraer o manipular a un menor por internet con intención abusiva.

**Grooming**: proceso gradual de manipulación para ganar confianza, pedir secretos, aislar o presionar al menor.

**Sextorsión**: amenaza o chantaje usando imágenes íntimas, conversaciones o información personal.

**Identidad falsa**: perfil donde alguien finge otra edad, identidad o intención para acercarse al menor.

**Huella digital**: rastro que dejan mensajes, fotos, publicaciones, datos compartidos o capturas.

## Cómo suele escalar una interacción de riesgo

No siempre empieza con una amenaza. Puede avanzar así:

**conversación normal → bromas hirientes o atención excesiva → preguntas personales → secreto o contacto por otra app → solicitud de fotos, datos, ubicación o encuentro.**

En videojuegos, apps o redes, algunas personas pueden usar identidades falsas para parecer amistades, ganar confianza y mover la conversación a un terreno menos supervisado.

---

## Datos personales: lo que nunca debería compartirse

Conviene enseñar al menor que proteger su identidad también significa no compartir datos personales con personas que conoce solo en línea.

En términos prácticos, conviene agrupar la información sensible en tres categorías:

| Tipo de dato | Ejemplos | Por qué importa |
| --- | --- | --- |
| **Identidad** | Nombre completo, fotos personales, usuario de redes o cualquier dato que permita reconocer al menor. | Puede usarse para buscarlo, exponerlo o presionarlo fuera del juego. |
| **Contacto y acceso** | Teléfono, correo, contraseñas, enlaces de invitación o cuentas vinculadas. | Abre la puerta a mensajes directos, robo de cuenta o contacto no supervisado. |
| **Ubicación y rutina** | Dirección, escuela, ciudad, horarios, lugares que frecuenta o ubicación en tiempo real. | Permite ubicar al menor o anticipar dónde estará. |

Esto importa porque el daño no siempre aparece de inmediato. A veces todo empieza con frases como: "solo dime tu nombre", "mándame una foto para saber que eres real" o "pásame tu Instagram para hablar mejor".

> **Idea clave**: El problema no es solo la privacidad en abstracto. Compartir datos puede abrir la puerta a humillación, extorsión, contacto fuera del juego o manipulación emocional.

---

## Señales básicas que deberían encender alerta

Estas señales ayudan a reconocer cuándo una interacción empieza a salirse de una conversación normal de juego:

---

| Señal observable | Posible lectura | Respuesta familiar inicial |
| --- | --- | --- |
| **Recibe muchos mensajes de alguien que no conoce** | Puede haber insistencia, presión o acercamiento acelerado. | Revisar quién es la cuenta y cómo empezó la conversación. |
| **Oculta chats o cambia de pantalla** | Puede haber vergüenza, presión o miedo a perder acceso. | Preguntar con calma y pedir que muestre el contexto. |
| **Alguien pide secretos** | La conversación dejó de ser transparente. | Reforzar que no hay secretos con personas del juego. |
| **Quiere pasar a otra app** | Puede buscar un espacio menos supervisado. | Revisar quién lo pide y bloquear si hay presión. |
| **Pide fotos, datos o ubicación** | Ya existe exposición personal. | Guardar evidencia, cortar contacto y reportar. |
| **Cambios de ánimo tras jugar** | Puede haber acoso, presión o conflicto social. | Conversar, observar repetición y revisar interacciones. |

## Cómo distinguir una interacción incómoda de una interacción de riesgo

No toda incomodidad es grooming. No toda discusión entre jugadores es ciberacoso. Pero sí conviene enseñar a detectar cuándo una conversación deja de ser apropiada.

Una interacción pasa a nivel de riesgo cuando incluye manipulación, presión, aislamiento, secretos, peticiones de material personal, lenguaje sexual o intentos de mover la conversación a otro espacio menos supervisado.

Las identidades falsas y la generación rápida de confianza son tácticas frecuentes en este tipo de casos.

---

## Qué cambia cuando la interacción es por voz

El chat de voz puede hacer que una partida se sienta más cercana, intensa y difícil de revisar después. A diferencia del texto, muchas frases no quedan visibles para que la familia las lea con calma. Por eso, cuando una experiencia permite voz, el menor necesita saber cómo desconectarse, silenciar, bloquear y reportar sin discutir con la otra persona.

| Situación por voz | Por qué aumenta el riesgo | Respuesta familiar útil |
| --- | --- | --- |
| **Insultos o burlas en tiempo real** | Pueden sentirse más agresivos que un mensaje escrito. | Salir de la voz, silenciar al usuario y reportar si continúa. |
| **Presión para responder rápido** | El menor puede aceptar algo sin pensarlo. | Enseñar que puede pausar, cortar la voz y pedir ayuda. |
| **Preguntas personales habladas** | Puede parecer una conversación casual, pero exponer datos. | Reforzar datos que nunca se comparten, incluso si la voz parece amistosa. |
| **Invitación a otra app o llamada externa** | Saca la conversación de los controles de Roblox. | No aceptar y avisar a un adulto. |
| **Lenguaje sexual, amenazas o chantaje** | Ya no es solo una mala experiencia de juego. | Cortar contacto, guardar lo que sí exista como evidencia y escalar si hay peligro. |

En voz, puede no haber una captura clara del mensaje exacto. Aun así, la familia puede documentar fecha, hora, experiencia, nombre de usuario, testimonio del menor y cualquier pantalla relacionada antes de bloquear o reportar.

> **Regla práctica**: Si una conversación por voz pide secretos, datos, contacto externo o hace sentir miedo, no se negocia dentro del chat; se corta la comunicación y se pide ayuda.

---

## Semáforo práctico para una familia

Una forma útil de leer el riesgo es pensar en un semáforo de señales:

| Nivel | Señal principal | Lectura familiar |
| --- | --- | --- |
| **Verde** | La conversación gira sobre el juego, sin datos personales ni presión. | Interacción apropiada. |
| **Amarillo** | Hay insistencia, bromas hirientes, presión por voz o amistad demasiado intensa en poco tiempo. | Algo empieza a incomodar y conviene revisar. |
| **Rojo** | Pide secretos, datos, fotos, contacto externo, lenguaje sexual, aislamiento o continuar por llamada privada. | Hace falta intervenir. |

> **Regla práctica**: Si una conversación pasa de hablar del juego a pedir privacidad, secretos o información personal, la familia ya tiene motivos suficientes para revisar.

---

![Cortar la interacción sin escalar el conflicto. Acciones útiles: mutear, bloquear, reportar y salir del chat o servidor si hace falta.](/article-images/videojuegos/M4A1.1.webp)

---

## Ciberacoso y grooming no son lo mismo, pero pueden mezclarse

La diferencia importa porque la respuesta cambia. El ciberacoso suele requerir bloqueo, reporte y contención emocional; el grooming exige intervención más urgente porque combina confianza, secreto y posible explotación.

Si una misma conversación mezcla humillación, presión, contacto externo, secretos o petición de datos personales, la familia debe tratarla como una señal de riesgo alto y revisar el contexto completo antes de permitir que continúe.

---

## Qué puede hacer una familia desde la prevención

La prevención funciona mejor cuando hay reglas claras, ajustes de privacidad revisados y una conversación abierta sobre seguridad digital:

| Acción preventiva | Propósito |
| --- | --- |
| Acordar qué datos nunca se comparten. | Evitar exposición de identidad, ubicación o contacto. |
| Dejar claro que no se guardan secretos con personas del juego. | Cortar manipulación antes de que escale. |
| Explicar que pedir ayuda no trae castigo. | Mantener abierta la confianza. |
| Revisar con quién juega y qué mensajes recibe. | Detectar señales antes de que se normalicen. |
| Reforzar que toda interacción incómoda se puede mostrar a un adulto. | Convertir la incomodidad en una señal útil de protección. |

> **Lo que un padre debe recordar**: El riesgo no siempre empieza con algo extremo; muchas veces empieza con confianza mal colocada.

---

## Checklist de revisión prioritaria

Antes de dar por segura una interacción, conviene validar cuatro preguntas rápidas:

| Pregunta | Por qué importa |
| --- | --- |
| **¿La conversación sigue centrada en el juego?** | Si pasa de la partida a la vida personal, el riesgo sube. |
| **¿Hay presión o secretos?** | Si alguien pide ocultar algo a la familia, ya es señal de alerta. |
| **¿Se solicitaron datos, fotos, voz privada o contacto externo?** | Ese cambio exige revisión inmediata. |
| **¿El menor se siente incómodo pero no sabe explicarlo?** | La incomodidad sostenida también cuenta como señal útil. |

> **Regla de Oro**: Si una interacción mezcla insistencia, privacidad y secretos, no hace falta esperar a que ocurra algo peor para intervenir.

---

## Caja de conceptos clave

**Ciberacoso**: agresión digital repetida que humilla, excluye o expone.

**Grooming**: acercamiento manipulador para ganar confianza y explotar al menor.

**Enticement**: captación o atracción en línea con intención abusiva.

**Dato personal**: información que puede identificar, ubicar o exponer a una persona.

**Huella digital**: rastro que dejan los mensajes, fotos, publicaciones o datos compartidos en línea.

---

## Microactividad de 1 minuto

Piensa en el juego que usa tu hijo o hija: ¿sabría reconocer una broma hiriente?, ¿sabe que no debe guardar secretos con personas del juego?, ¿tiene claro qué datos nunca comparte?

Si alguna respuesta es "no", ahí está el siguiente aprendizaje que conviene reforzar.

---

## Cierre

El primer paso para proteger a un menor en un entorno de juego no es saberlo todo sobre tecnología, sino reconocer señales básicas a tiempo. Si una familia detecta ciberacoso, presión para compartir datos, secretos sospechosos o intentos de mover la conversación fuera del juego, ya tiene razones suficientes para intervenir.

> **Recuerda**: En seguridad digital infantil, identificar una señal a tiempo vale más que reaccionar tarde.

El siguiente contenido del módulo mostrará qué hacer cuando la interacción de riesgo ya ocurrió y cómo responder de forma útil, calmada y segura.`,
            type: 'article',
            duration: 13,
            platforms: ['Roblox', 'Minecraft'],
            riskAreas: ['Privacidad Avanzada'],
            teaches: ['ciberacoso', 'grooming', 'enticement', 'dato personal', 'huella digital', 'secretos', 'datos personales', 'fotos personales', 'chat de voz', 'voice chat']
        });

        const l4_2 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 1: Casos comunes de riesgo en chat y partidas',
            content: `# Casos comunes de riesgo en chat y partidas

Este video aterriza el módulo en escenas típicas de chat y juego para que la familia aprenda a distinguir bromas de señales reales de ciberacoso, grooming o exposición de datos.

## Qué conviene observar
* Cómo aparecen secretos, presión o peticiones de datos personales.
* Qué cambia cuando una interacción pasa de normal a invasiva.
* Qué hacer si el problema ocurre por chat de voz y no queda una conversación escrita.
* Qué señales deberían activar una conversación inmediata con el menor.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=sgiMbuJpRqc',
            duration: 2,
            platforms: ['Roblox', 'Minecraft'],
            riskAreas: ['Privacidad Avanzada'],
            teaches: ['ciberacoso', 'grooming', 'datos personales', 'secretos', 'pasar a otra app', 'chat de voz', 'voice chat']
        });

        const l4_3 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 2: Qué hacer si ya hubo una interacción de riesgo',
            content: `# Qué hacer si ya hubo una interacción de riesgo

> **Perspectiva Estratégica**: Cuando algo grave ocurre en un juego o chat, el menor no necesita primero un castigo; necesita un adulto que lo escuche, le dé seguridad y actúe con claridad.

Este artículo enseña algo muy concreto: cuando el riesgo ya ocurrió, la primera respuesta del adulto puede reducir el daño o empeorarlo. Si el menor se siente castigado o no escuchado, puede dejar de contar lo que le pasa en el futuro. Por eso, el primer paso no es reaccionar con enojo, sino generar seguridad y actuar con orden.

---

![Lo primero: mantener la calma y escuchar cuando un menor cuenta una interacción de riesgo.](/article-images/videojuegos/M4A2.webp)

---

## Entender qué pasó antes de decidir

No toda interacción de riesgo es igual. Puede tratarse de ciberacoso, presión para compartir datos, manipulación emocional, solicitudes de imágenes, amenazas o intentos de concretar un encuentro.

Para entender el incidente, conviene preguntar con calma:

| Pregunta | Para qué sirve |
| --- | --- |
| **¿Qué pasó y dónde ocurrió?** | Ubica la plataforma, chat, servidor o partida. |
| **¿Quién participó?** | Distingue amistades, desconocidos, compañeros o cuentas sospechosas. |
| **¿Desde cuándo pasa?** | Ayuda a saber si fue un incidente aislado o repetido. |
| **¿Cómo te sentiste?** | Permite valorar impacto emocional y necesidad de apoyo. |

Cuando el adulto no entiende una app, un juego o una expresión, también conviene pedir que se la muestre. Comprender mejor la plataforma ayuda a intervenir mejor.

---

![Cortar la interacción sin escalar el conflicto. Acciones útiles: mutear, bloquear, reportar y salir del chat o servidor si hace falta.](/article-images/videojuegos/M4A2.1.webp)

---

## Si el incidente ocurrió por chat de voz

Cuando el problema ocurrió por voz, puede que no exista un texto para capturar. Eso no significa que la familia no pueda actuar. Conviene pedir al menor que describa qué escuchó, quién habló, en qué experiencia ocurrió, cuánto duró y si hubo otros jugadores presentes.

| Qué documentar | Por qué sirve |
| --- | --- |
| **Nombre de usuario o perfil** | Permite bloquear, reportar o identificar a la cuenta involucrada. |
| **Experiencia o servidor** | Ubica el contexto donde ocurrió la interacción. |
| **Fecha y hora aproximadas** | Ayuda a ordenar el reporte y recordar detalles. |
| **Qué se dijo o pidió** | Permite distinguir broma, acoso, presión, grooming o amenaza. |
| **Cómo reaccionó el menor** | Muestra impacto emocional y necesidad de apoyo. |

También conviene revisar si la cuenta tiene Voice Chat activo, si la experiencia permite voz y si el menor sabe usar las opciones de silenciar, desconectarse, bloquear y reportar.

---

## Guardar evidencia antes de borrar

Una reacción muy común es querer borrar todo de inmediato. Sin embargo, si se piensa reportar el caso, conviene guardar evidencia antes de eliminar nada.

| Evidencia | Qué debe mostrar |
| --- | --- |
| **Capturas y mensajes** | Conversación, tono, solicitudes, amenazas o insultos. |
| **Usuario o perfil** | Nombre visible, identificador, servidor, experiencia o cuenta involucrada. |
| **Fecha y hora** | Momento aproximado del incidente y duración del problema. |
| **Descripción breve** | Qué pasó, cómo empezó y qué hizo sentir al menor. |

Esta evidencia puede servir para denunciar dentro de la plataforma, hablar con la escuela o escalar a autoridades si el caso lo requiere.

---

## Cuándo reportar dentro de la plataforma

La mayoría de apps, redes y juegos incluyen funciones para reportar, mutear o bloquear usuarios y contenido. Reportar es apropiado cuando hay humillación reiterada, amenazas, difusión de contenido o información privada, solicitudes de datos personales o una conducta que viola claramente las reglas del servicio.

Si una empresa no responde o la situación no se resuelve, el reporte puede escalarse por otras vías.

---

## Cuándo hablar con la escuela

Si el incidente involucra a compañeros de escuela o afecta la vida escolar del menor, puede ser necesario hablar con la escuela y compartir la evidencia recopilada.

Esto es especialmente importante cuando el acoso sigue fuera de internet, el menor evita ir a clases, hay humillación entre compañeros o el problema impacta el recreo, el salón y la convivencia diaria.

> **Lectura práctica**: El daño digital muchas veces no se queda en internet. Si afecta la vida escolar, la escuela también forma parte de la respuesta.

---

## Cuándo escalar a autoridades o servicios de protección

Hay situaciones que no deben manejarse solo como "un problema de chat".

Si existe preocupación por la seguridad del menor, la familia no debe manejarlo sola: conviene contactar a autoridades o servicios de protección infantil. Cuando hay contacto con intención sexual, solicitudes de imágenes explícitas, sextorsión, conversación sexual o intentos de encuentro presencial, el caso exige una respuesta más formal.

| Señal grave | Por qué requiere escalar |
| --- | --- |
| **Petición de fotos íntimas o sextorsión** | Puede implicar explotación, chantaje o difusión de material sensible. |
| **Amenazas o chantaje** | Aumenta el riesgo emocional y puede requerir apoyo externo. |
| **Propuesta de encuentro** | Cambia de riesgo digital a posible riesgo físico. |
| **Miedo real por la seguridad** | La familia no debe manejarlo sola como un simple problema de chat. |

En Estados Unidos, **NCMEC CyberTipline** es el sistema centralizado para reportar sospechas de explotación sexual infantil en línea.

---

## Si hubo imágenes íntimas o amenazas con imágenes

Cuando la interacción incluyó presión para enviar imágenes, difusión no consentida o amenazas con material sensible, el foco ya no debe ser regañar al menor, sino reducir el daño cuanto antes.

En estos casos, conviene cortar el contacto, no negociar con quien amenaza, guardar evidencia, activar apoyo especializado y escalar el caso si hay explotación o chantaje. Herramientas como **Take It Down** pueden apoyar la retirada de imágenes íntimas.

---

## Después del incidente también hay que acompañar

La respuesta no termina cuando se bloquea o se reporta.

Después del incidente, conviene seguir hablando con el menor, observar cómo se siente y apoyarlo con actividades positivas fuera de la pantalla. Si los cambios en ánimo o conducta duran un tiempo, conviene buscar apoyo profesional.

| Señal posterior | Qué puede indicar |
| --- | --- |
| **Tristeza, ansiedad o irritabilidad persistente** | El incidente sigue afectando emocionalmente. |
| **Alteraciones del sueño** | Hay tensión, miedo o preocupación que no se resolvió. |
| **Evitación social o miedo a conectarse** | El menor puede sentirse expuesto o inseguro en línea. |

---

## Qué no conviene hacer

| Error frecuente | Por qué empeora el problema |
| --- | --- |
| **Culpar, regañar o castigar de inmediato.** | Puede hacer que el menor oculte futuros incidentes. |
| **Responder impulsivamente al agresor.** | Suele escalar el conflicto y puede borrar contexto útil. |
| **Borrar todo antes de guardar pruebas.** | Dificulta reportar o explicar lo ocurrido. |
| **Minimizar lo ocurrido.** | Deja al menor sin apoyo cuando sí necesitaba protección. |

En general, no conviene criticar ni culpar al menor, responder impulsivamente al agresor ni reenviar mensajes agresivos.

---

## Semáforo de decisión

Este semáforo no es una clasificación oficial, sino una síntesis didáctica para ayudar a decidir mejor:

| Nivel | Señales típicas | Acción recomendada |
| --- | --- | --- |
| **Amarillo** | Burlas, insultos, presión social o conflicto repetido. | Escuchar, documentar, bloquear si continúa y revisar reglas de convivencia. |
| **Naranja** | Petición de datos, secretos, contacto externo o aislamiento. | Cortar contacto, guardar evidencia, reportar y supervisar de cerca. |
| **Rojo** | Fotos íntimas, amenazas, chantaje, propuesta de encuentro o miedo físico. | No negociar, conservar evidencia y escalar a plataforma, escuela o autoridades según el caso. |

> **Regla práctica**: Si el caso ya está en naranja o rojo, no basta con “esperar a ver si se calma”. Hace falta intervenir y documentar.

---

## Ruta de respuesta ante una interacción de riesgo

Una forma simple de recordar la secuencia correcta es esta:

| Primero | Después | Si hay gravedad |
| --- | --- | --- |
| Escuchar, calmar y entender qué ocurrió. | No responder al agresor, guardar evidencia y bloquear o reportar. | Escalar si hay amenazas, explotación, imágenes íntimas o riesgo físico. |

---

## Qué sí / qué no

| Sí conviene | No conviene |
| --- | --- |
| Escuchar, creerle y guardar pruebas. | Culpar, regañar primero o minimizar lo ocurrido. |
| Usar bloqueo y reporte. | Responder al agresor o borrar todo sin revisar. |
| Pedir apoyo si hace falta. | Manejar solo una situación con amenazas, sextorsión o riesgo físico. |

---

![Caja de conceptos clave: bloquear, reportar, evidencia, sextorsión y escalamiento.](/article-images/videojuegos/M4A2.2.webp)

---

## Microactividad de 1 minuto

Imagina que tu hijo te enseña un chat incómodo. Antes de regañar o responder al agresor, pregúntate: **¿puedo pedirle que me muestre qué pasó para entenderlo bien?**

La respuesta más protectora empieza por escuchar, entender y luego actuar.

---

## Cierre

Cuando ya hubo una interacción de riesgo, la meta no es reaccionar con miedo, sino proteger, documentar y acompañar. Un menor necesita sentir que contar lo sucedido sirve para recibir ayuda, no para perder la confianza del adulto.

> **Recuerda**: Escuchar sin culpar, guardar evidencia y escalar cuando la seguridad está en juego suele proteger más que cualquier reacción impulsiva.

Por eso, la respuesta más útil combina calma, escucha, bloqueo o reporte cuando corresponde, y escalamiento a la escuela o a autoridades si la seguridad del menor está comprometida.`,
            type: 'article',
            duration: 11,
            platforms: ['Roblox', 'Minecraft'],
            riskAreas: ['Privacidad Avanzada'],
            teaches: ['evidencia', 'bloquear', 'reportar', 'escuela', 'autoridades', 'sextorsión', 'escalamiento', 'capturas de pantalla', 'chat de voz', 'voice chat']
        });

        const l4_4 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 2: Cómo conservar evidencia y cuándo reportar',
            content: `# Cómo conservar evidencia y cuándo reportar

Este video ordena la respuesta familiar después de una interacción de riesgo para no perder evidencia y saber cuándo escalar el caso.

## Qué conviene observar
* Qué capturas o datos vale la pena guardar antes de borrar o bloquear.
* Cómo documentar un incidente si ocurrió por voz y no por mensajes escritos.
* En qué momento reportar dentro de la plataforma no es suficiente.
* Cuándo conviene acudir a escuela, apoyo profesional o autoridades.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=g07zEPiMiro',
            duration: 2,
            platforms: ['Roblox', 'Minecraft'],
            riskAreas: ['Privacidad Avanzada'],
            teaches: ['evidencia', 'capturas de pantalla', 'bloquear', 'reportar', 'autoridades', 'chat de voz', 'voice chat']
        });

        mod4.lessonOrder = [l4_1._id, l4_2._id, l4_3._id, l4_4._id];
        await mod4.save();

        const q4 = await getOrCreateQuiz({
            title: 'Examen del Módulo 4: Interacción social y señales de alerta',
            description: 'Evalúa si puedes reconocer señales tempranas y responder con orden cuando ya ocurrió una interacción de riesgo.',
            scope: 'module',
            refId: mod4._id,
            scopeModel: 'Module',
            minPassing: 80
        }, [
            {
                text: 'Instrucción: Arrastra cada concepto a la definición correcta.',
                type: 'drag_drop',
                metadata: {
                    pairs: [
                        { key: 'Ciberacoso', value: 'Conducta digital de humillación, agresión o exposición repetida' },
                        { key: 'Grooming', value: 'Acercamiento manipulador para ganar confianza y explotar al menor' },
                        { key: 'Dato personal', value: 'Información que puede identificar o ubicar al menor' },
                        { key: 'Evidencia', value: 'Capturas, mensajes, fechas o registros que ayudan a documentar lo ocurrido' },
                        { key: 'Reporte', value: 'Acción de avisar a la plataforma, comunidad o autoridad correspondiente' }
                    ],
                    correctAnswer: {
                        'Ciberacoso': 'Conducta digital de humillación, agresión o exposición repetida',
                        'Grooming': 'Acercamiento manipulador para ganar confianza y explotar al menor',
                        'Dato personal': 'Información que puede identificar o ubicar al menor',
                        'Evidencia': 'Capturas, mensajes, fechas o registros que ayudan a documentar lo ocurrido',
                        'Reporte': 'Acción de avisar a la plataforma, comunidad o autoridad correspondiente'
                    }
                },
                explanation: 'Tip: Ciberacoso daña, grooming manipula, dato personal expone, evidencia documenta y reportar activa la respuesta formal.',
                points: 15
            },
            {
                text: 'Completa las frases con la palabra correcta.',
                type: 'fill_blanks',
                metadata: {
                    sentence: 'Si un menor cuenta una experiencia negativa en línea, el adulto debe actuar con [blank1]. Una mala práctica inicial es [blank2] al menor por lo que pasó. Antes de borrar mensajes, conviene guardar [blank3]. Pedir al menor que guarde [blank4] con alguien del juego es una señal de alerta. Nombre completo, dirección o escuela son ejemplos de [blank5] personales.',
                    bank: ['calma', 'culpar', 'evidencia', 'secretos', 'datos'],
                    correctAnswer: {
                        blank1: 'calma',
                        blank2: 'culpar',
                        blank3: 'evidencia',
                        blank4: 'secretos',
                        blank5: 'datos'
                    }
                },
                explanation: 'Tip: La respuesta protectora empieza con calma, no con culpa. Y antes de borrar, siempre conviene guardar evidencia.',
                points: 10
            },
            {
                text: 'Instrucción: Relaciona cada situación con el riesgo o respuesta principal que representa.',
                type: 'match_columns',
                metadata: {
                    left: [
                        'Insultos repetidos en chat o voz',
                        'Difusión de información privada',
                        '“No le digas a tus papás”',
                        'Petición de fotos personales',
                        'Bloquear y reportar dentro del juego',
                        'Hablar con la escuela'
                    ],
                    right: [
                        'Ciberacoso',
                        'Exposición de datos personales',
                        'Señal de grooming o manipulación',
                        'Señal de explotación o sextorsión',
                        'Respuesta dentro de la plataforma',
                        'Escalamiento cuando el caso afecta convivencia escolar'
                    ],
                    correctAnswer: {
                        'Insultos repetidos en chat o voz': 'Ciberacoso',
                        'Difusión de información privada': 'Exposición de datos personales',
                        '“No le digas a tus papás”': 'Señal de grooming o manipulación',
                        'Petición de fotos personales': 'Señal de explotación o sextorsión',
                        'Bloquear y reportar dentro del juego': 'Respuesta dentro de la plataforma',
                        'Hablar con la escuela': 'Escalamiento cuando el caso afecta convivencia escolar'
                    }
                },
                explanation: 'Tip: No todo se responde igual. Algunas señales apuntan a acoso, otras a manipulación y otras ya requieren escalamiento.',
                points: 15
            },
            {
                text: 'Ordena los pasos para responder mejor ante una interacción de riesgo ya ocurrida.',
                type: 'order_sequence',
                metadata: {
                    items: [
                        'Guardar capturas o registros',
                        'Escuchar al menor sin culpar',
                        'Bloquear o reportar si corresponde',
                        'Entender qué pasó con preguntas abiertas',
                        'Escalar a escuela o autoridades si hay peligro o explotación'
                    ],
                    correctAnswer: [
                        'Escuchar al menor sin culpar',
                        'Entender qué pasó con preguntas abiertas',
                        'Guardar capturas o registros',
                        'Bloquear o reportar si corresponde',
                        'Escalar a escuela o autoridades si hay peligro o explotación'
                    ]
                },
                explanation: 'Tip: La secuencia sana es escuchar, entender, documentar, actuar en plataforma y escalar según la gravedad.',
                points: 10
            },
            {
                text: 'Selecciona todas las señales que justifican una revisión inmediata por parte de un adulto.',
                type: 'multiple_selection',
                options: [
                    { text: 'Le piden al menor guardar un secreto con alguien del juego', isCorrect: true },
                    { text: 'Le preguntan por su escuela o dirección', isCorrect: true },
                    { text: 'Alguien amenaza con publicar algo si no obedece', isCorrect: true },
                    { text: 'Le piden seguir la conversación por voz, llamada privada u otra app', isCorrect: true },
                    { text: 'Cambió el color de su avatar', isCorrect: false },
                    { text: 'Le cuenta a sus padres con quién juega', isCorrect: false },
                    { text: 'Quiere desbloquear un logro nuevo en el juego', isCorrect: false }
                ],
                explanation: 'Tip: Secretos, petición de datos personales y amenazas son señales claras de manipulación o acoso que requieren revisión inmediata.',
                points: 15
            },
            {
                text: 'Caso: El menor cuenta que en una experiencia con chat de voz alguien lo insultó, le pidió su edad real y luego le dijo que siguieran hablando por otra app. No hay mensajes escritos. ¿Qué debería hacer la familia?',
                type: 'case_study',
                options: [
                    { text: 'No hacer nada porque sin captura de texto no hay forma de reportar.', isCorrect: false },
                    { text: 'Documentar usuario, experiencia, fecha, lo que se dijo, bloquear/reportar y revisar si Voice Chat debe quedar desactivado.', isCorrect: true },
                    { text: 'Pedir al menor que vuelva a entrar para grabar mejor la conversación.', isCorrect: false },
                    { text: 'Responder por voz al usuario para advertirle que ya fue descubierto.', isCorrect: false }
                ],
                explanation: 'En incidentes por voz, la evidencia puede ser contextual: usuario, experiencia, hora, relato del menor y acciones de bloqueo o reporte. No conviene reexponer al menor para conseguir más prueba.',
                points: 10
            },
            {
                text: 'Completa correctamente cada frase.',
                type: 'drop_down',
                metadata: {
                    sentence: 'Si hubo acoso o contacto no deseado, antes de borrar conviene guardar [blank1]. Si el caso involucra compañeros y afecta la convivencia escolar, puede ser necesario hablar con la [blank2]. Si hay solicitud de imágenes íntimas o explotación sexual, se debe escalar a [blank3] o servicios especializados. Responder con enojo al agresor suele ser menos útil que [blank4] y reportar.',
                    options: {
                        blank1: ['evidencia', 'avatar', 'castigo'],
                        blank2: ['escuela', 'tienda', 'consola'],
                        blank3: ['autoridades', 'amistades', 'streamers'],
                        blank4: ['bloquear', 'discutir', 'gritar']
                    },
                    correctAnswer: {
                        blank1: 'evidencia',
                        blank2: 'escuela',
                        blank3: 'autoridades',
                        blank4: 'bloquear'
                    }
                },
                explanation: 'Tip: Guardar evidencia, avisar a la escuela cuando corresponde, escalar a autoridades y bloquear es más útil que pelear.',
                points: 10
            },
            {
                text: 'Instrucción: Arrastra cada elemento a la categoría correcta.',
                type: 'categorize',
                metadata: {
                    items: [
                        '“No le digas a nadie”',
                        'Captura de pantalla',
                        'Bloquear usuario',
                        'Reportar dentro del juego',
                        'Petición de foto íntima',
                        'Hablar con la escuela',
                        'Contactar autoridades',
                        'Compartir dirección o escuela'
                    ],
                    categories: ['Señal', 'Acción inmediata', 'Escalamiento'],
                    correctAnswer: {
                        'Señal': [
                            '“No le digas a nadie”',
                            'Petición de foto íntima',
                            'Compartir dirección o escuela'
                        ],
                        'Acción inmediata': [
                            'Captura de pantalla',
                            'Bloquear usuario',
                            'Reportar dentro del juego'
                        ],
                        'Escalamiento': [
                            'Hablar con la escuela',
                            'Contactar autoridades'
                        ]
                    }
                },
                explanation: 'Tip: Primero detectas la señal, luego actúas en la plataforma y escalas si el caso sale del juego o implica peligro real.',
                points: 10
            },
            {
                text: 'Caso práctico: Tu hija te enseña un chat de un jugador que primero fue muy amable, luego le pidió que siguiera hablando por otra app, le dijo que no le contara a nadie y después le pidió una foto. Ella está nerviosa y te dice que no quería meterse en problemas. ¿Cuál es la mejor respuesta?',
                type: 'case_study',
                points: 15,
                options: [
                    { text: 'Decirle que fue su culpa por contestar y quitarle el dispositivo inmediatamente.', isCorrect: false },
                    { text: 'Responderle al agresor para confrontarlo y luego borrar el chat.', isCorrect: false },
                    { text: 'Escucharla sin culparla, guardar evidencia, bloquear/reportar y escalar porque hay señales de grooming o explotación.', isCorrect: true },
                    { text: 'Decirle que ignore el tema y esperar a ver si vuelve a pasar.', isCorrect: false }
                ],
                explanation: 'La mejor respuesta combina escucha, no culpabilización, conservación de evidencia, uso de herramientas de seguridad y escalamiento por tratarse de señales claras de grooming, enticement y posible explotación.'
            }
        ]);
        mod4.quizId = q4._id;
        await mod4.save();

};

