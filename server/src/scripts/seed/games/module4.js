module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 4. Interacción social y señales de alerta — 29–30 min ---
        const mod4 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 4: Interacción social y señales de alerta',
            description: 'Identificación de riesgos en la comunicación con otros.',
            duration: '30 min'
        });
        await Quiz.deleteMany({ refId: mod4._id, scope: 'module' });

        const l4_1 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 1: Ciberacoso, grooming y datos personales: señales básicas',
            content: `# Ciberacoso, grooming y datos personales: señales básicas

> **Perspectiva Estratégica**: No todo riesgo dentro de un videojuego empieza con algo claramente grave. A veces comienza con una burla repetida, una pregunta demasiado personal o una persona que pide guardar un secreto.

Este artículo no busca generar pánico, sino ayudar a madres, padres y tutores a reconocer tres riesgos que a veces aparecen mezclados dentro del juego: **ciberacoso**, **grooming** y **compartición de datos personales**.

**UNICEF** recomienda hablar con niñas, niños y adolescentes sobre con quién se comunican, qué comparten y qué hacer si algo les incomoda. También recuerda que lo que se publica o se comparte en línea deja una huella que puede afectar la privacidad y la seguridad.

---

## Tres conceptos que conviene distinguir

Antes de intervenir, conviene entender que no todos los riesgos son iguales.

### Ciberacoso

**StopBullying.gov** define el ciberacoso como una forma de acoso que ocurre en dispositivos digitales y que puede aparecer en redes sociales, foros, mensajería y también en entornos de gaming. Puede incluir contenido hiriente, falso, humillante o la difusión de información privada.

En un videojuego, el ciberacoso no siempre se presenta como algo obvio. A veces se disfraza de "broma", rivalidad o "parte del ambiente", pero sigue siendo agresión cuando es repetido, humillante o busca dañar.

Puede verse como:

1. insultos constantes en chat o voz,
2. apodos ofensivos o burlas por perder,
3. exclusión intencional de partidas o grupos,
4. rumores o humillaciones frente a otros jugadores,
5. difusión de información personal para avergonzar o intimidar.

> **Lectura pedagógica**: Muchos menores normalizan estas conductas porque ocurren "dentro del juego". Sin embargo, si una interacción lastima, aísla o humilla de forma repetida, ya no es solo juego.

---

## ¿Qué es grooming?

**NCMEC** describe la online enticement como una forma de explotación en la que una persona se comunica con alguien que cree que es menor de edad con intención sexual o de abuso. Esta categoría incluye grooming y sextorsión. También advierte que quienes dañan a menores pueden usar identidades falsas, construir confianza poco a poco y mover la conversación desde una app, red o juego hacia un espacio más privado.

Para una familia, una forma sencilla de entenderlo es esta: el grooming casi nunca empieza con una amenaza directa. Suele comenzar con una relación aparentemente amable.

La otra persona puede:

1. mostrarse demasiado comprensiva o interesada,
2. dar atención excesiva y acelerar la confianza,
3. pedir secretos,
4. insistir en hablar fuera del juego,
5. intentar aislar al menor de sus padres o cuidadores.

**HealthyChildren** advierte que depredadores y estafadores pueden usar identidades falsas para hacerse pasar por amistades en sitios de gaming, apps o redes, con el fin de ganar la confianza del menor.

---

## Datos personales: lo que nunca debería compartirse

**UNICEF** recomienda enseñar a niñas, niños y adolescentes a proteger su identidad y a no compartir datos personales con otras personas en línea.

En términos prácticos, una familia debería tratar como información sensible:

1. nombre completo,
2. dirección,
3. escuela,
4. teléfono,
5. contraseñas,
6. ubicación,
7. rutinas diarias,
8. fotos personales,
9. cualquier dato que permita identificar al menor fuera del juego.

Esto importa porque el daño no siempre aparece de inmediato. A veces todo empieza con frases como: "solo dime tu nombre", "mándame una foto para saber que eres real" o "pásame tu Instagram para hablar mejor".

> **Idea clave**: El problema no es solo la privacidad en abstracto. Compartir datos puede abrir la puerta a humillación, extorsión, contacto fuera del juego o manipulación emocional.

---

## Señales básicas que deberían encender alerta

Una familia debería prestar atención si el menor:

1. recibe mensajes repetidos de alguien que no conoce en la vida real,
2. empieza a ocultar chats o cambia de pantalla cuando pasa un adulto,
3. dice que "solo esa persona lo entiende",
4. menciona que alguien le pidió guardar un secreto,
5. es presionado para mandar fotos, audios, videos o datos personales,
6. es invitado a seguir la conversación por otra app, red social o servicio de mensajería.

Estas señales son coherentes con los patrones de manipulación y acercamiento descritos por **NCMEC** y **HealthyChildren**.

---

## Cómo distinguir una interacción incómoda de una interacción de riesgo

No toda incomodidad es grooming. No toda discusión entre jugadores es ciberacoso. Pero sí conviene enseñar a detectar cuándo una conversación deja de ser apropiada.

Una interacción pasa a nivel de riesgo cuando incluye:

1. manipulación o presión,
2. aislamiento,
3. secretos,
4. peticiones de material personal,
5. lenguaje sexual,
6. intentos de mover la conversación a otro espacio menos supervisado.

**HealthyChildren** y **NCMEC** coinciden en que las identidades falsas y la generación rápida de confianza son tácticas frecuentes en este tipo de casos.

---

## Semáforo práctico para una familia

Una forma útil de leer el riesgo es pensar en un semáforo de señales:

### Verde: interacción apropiada

La conversación gira sobre el juego, no pide datos personales, no hay presión y el tono es normal.

### Amarillo: algo empieza a incomodar

Hay insistencia, bromas hirientes, presión para seguir hablando o una amistad demasiado intensa en poco tiempo.

### Rojo: hace falta intervenir

Pide secretos, datos, fotos, contacto fuera del juego, lenguaje sexual o intenta separar al menor de la supervisión adulta.

> **Regla práctica**: Si una conversación pasa de hablar del juego a pedir privacidad, secretos o información personal, la familia ya tiene motivos suficientes para revisar.

---

## Ciberacoso y grooming no son lo mismo, pero pueden mezclarse

A veces ambos riesgos aparecen juntos, por eso conviene diferenciarlos:

### Ciberacoso

1. humilla,
2. excluye,
3. difunde rumores,
4. expone para dañar.

### Grooming

1. halaga,
2. genera confianza acelerada,
3. pide secreto,
4. intenta aislar,
5. escala hacia una petición personal o íntima.

La diferencia importa porque la respuesta también cambia. El ciberacoso suele requerir bloqueo, reporte y contención emocional. El grooming requiere una lectura más urgente porque implica manipulación con potencial de explotación.

---

## Qué puede hacer una familia desde la prevención

**UNICEF** recomienda establecer reglas claras, revisar ajustes de privacidad y mantener una cultura de conversación abierta sobre seguridad digital.

Traducido a la práctica para este curso:

1. acordar qué datos nunca se comparten,
2. dejar claro que no se guardan secretos con personas del juego,
3. explicar que pedir ayuda no trae castigo,
4. revisar de vez en cuando con quién juega el menor y qué tipo de mensajes recibe,
5. reforzar que toda interacción que incomoda se puede mostrar a un adulto.

> **Lo que un padre debe recordar**: El riesgo no siempre empieza con algo extremo; muchas veces empieza con confianza mal colocada.

---

## Checklist de revisión prioritaria

Antes de dar por segura una interacción, conviene validar cuatro preguntas rápidas:

1. **¿La conversación sigue centrada en el juego?** Si pasa de la partida a la vida personal, el riesgo sube.
2. **¿Hay presión o secretos?** Si alguien pide ocultar algo a la familia, ya es señal de alerta.
3. **¿Se solicitaron datos, fotos o contacto externo?** Ese cambio exige revisión inmediata.
4. **¿El menor se siente incómodo pero no sabe explicarlo?** La incomodidad sostenida también cuenta como señal útil.

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

Piensa en el juego que usa tu hijo o hija:

1. ¿Sabría reconocer una broma hiriente?
2. ¿Sabe que no debe guardar secretos con personas del juego?
3. ¿Tiene claro qué datos nunca comparte?

Si alguna respuesta es "no", ahí está el siguiente aprendizaje que conviene reforzar.

---

## Cierre

El primer paso para proteger a un menor en un entorno de juego no es saberlo todo sobre tecnología, sino reconocer señales básicas a tiempo. Si una familia detecta ciberacoso, presión para compartir datos, secretos sospechosos o intentos de mover la conversación fuera del juego, ya tiene razones suficientes para intervenir.

> **Recuerda**: En seguridad digital infantil, identificar una señal a tiempo vale más que reaccionar tarde.

El siguiente contenido del módulo mostrará qué hacer cuando la interacción de riesgo ya ocurrió y cómo responder de forma útil, calmada y segura.`,
            type: 'article', duration: 5
        });

        const l4_2 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 1: Casos comunes de riesgo en chat y partidas',
            content: 'Ejemplos reales de interacciones problemáticas.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder7', duration: 5
        });

        const l4_3 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Artículo 2: Qué hacer si ya hubo una interacción de riesgo',
            content: `# Qué hacer si ya hubo una interacción de riesgo

> **Perspectiva Estratégica**: Cuando algo grave ocurre en un juego o chat, el menor no necesita primero un castigo; necesita un adulto que lo escuche, le dé seguridad y actúe con claridad.

Este artículo enseña algo muy concreto: cuando el riesgo ya ocurrió, la primera respuesta del adulto puede reducir el daño o empeorarlo. **UNICEF** advierte que, si el menor se siente castigado o no escuchado, puede dejar de contar lo que le pasa en el futuro. Por eso, el primer paso no es reaccionar con enojo, sino generar seguridad y actuar con orden.

---

## Lo primero: mantener la calma y escuchar

Cuando un hijo o hija cuenta que alguien lo insultó, lo acosó, le pidió datos personales, le mandó contenido sexual o trató de mover la conversación fuera del juego, la reacción del adulto importa mucho.

**UNICEF** recomienda:

1. mantenerse en calma,
2. escuchar con atención,
3. hacer preguntas abiertas,
4. dejar claro que el menor no está en problemas,
5. reconocer que hizo bien en contarlo.

También advierte que quitar de inmediato el dispositivo o el acceso a internet puede hacer que el menor se sienta castigado y sea menos probable que vuelva a pedir ayuda después.

> **Idea central**: En este momento, lo más importante no es controlar el dispositivo, sino proteger la confianza.

---

## Entender qué pasó antes de decidir

No toda interacción de riesgo es igual. Puede tratarse de:

1. ciberacoso,
2. presión para compartir datos,
3. manipulación emocional,
4. solicitudes de imágenes,
5. amenazas,
6. intentos de concretar un encuentro.

**UNICEF** recomienda preguntar con calma:

1. qué pasó,
2. dónde ocurrió,
3. quién participó,
4. cuánto tiempo lleva ocurriendo,
5. cómo se sintió el menor.

Cuando el adulto no entiende una app, un juego o una expresión, también conviene pedir que se la muestre. Comprender mejor la plataforma ayuda a intervenir mejor.

---

## Cortar la interacción sin escalar el conflicto

Si el problema es ciberacoso o contacto no deseado, **StopBullying.gov** recomienda no responder ni reenviar los mensajes agresivos, conservar evidencia y bloquear a la persona.

En términos prácticos, esto significa que intervenir no es discutir con el agresor, sino usar las herramientas de seguridad de la plataforma.

Las acciones más útiles suelen ser:

1. mutear,
2. bloquear,
3. reportar,
4. salir del chat o servidor si hace falta.

> **Regla de Oro**: Responder con enojo al agresor suele complicar el problema; bloquear y documentar suele ayudar más.

---

## Guardar evidencia antes de borrar

Una reacción muy común es querer borrar todo de inmediato. Sin embargo, **UNICEF** y **StopBullying.gov** coinciden en que, si se piensa reportar el caso, conviene guardar evidencia antes de eliminar nada.

Lo más útil es conservar:

1. capturas de pantalla,
2. mensajes,
3. nombre de usuario o perfil,
4. fecha y hora,
5. descripción breve de lo ocurrido.

Esta evidencia puede servir para denunciar dentro de la plataforma, hablar con la escuela o escalar a autoridades si el caso lo requiere.

---

## Cuándo reportar dentro de la plataforma

**UNICEF** recuerda que la mayoría de apps, redes y juegos incluyen funciones para reportar, mutear o bloquear usuarios y contenido.

Reportar es apropiado cuando hay:

1. humillación o insultos reiterados,
2. amenazas,
3. difusión de contenido o información privada,
4. solicitudes de datos personales,
5. conducta que viola claramente las reglas del servicio.

Si una empresa no responde o la situación no se resuelve, el reporte puede escalarse por otras vías.

---

## Cuándo hablar con la escuela

Si el incidente involucra a compañeros de escuela o afecta la vida escolar del menor, **UNICEF** indica que puede ser necesario hablar con la escuela y compartir la evidencia recopilada.

Esto es especialmente importante cuando:

1. el acoso sigue fuera de internet,
2. el menor evita ir a clases,
3. hay humillación entre compañeros,
4. el problema impacta el recreo, el salón o la convivencia diaria.

> **Lectura práctica**: El daño digital muchas veces no se queda en internet. Si afecta la vida escolar, la escuela también forma parte de la respuesta.

---

## Cuándo escalar a autoridades o servicios de protección

Hay situaciones que no deben manejarse solo como "un problema de chat".

**UNICEF** señala que, si existe preocupación por la seguridad del menor, debe contactarse a la policía, a las autoridades o a una organización local de protección infantil. **NCMEC** explica que la online enticement incluye contacto con intención sexual, solicitudes de imágenes explícitas, sextorsión, conversación sexual y, en algunos casos, intentos de encuentro presencial.

Se debe considerar escalamiento urgente si hay:

1. petición de fotos íntimas,
2. amenazas o chantaje,
3. sextorsión,
4. propuesta de encuentro,
5. miedo real por la seguridad física del menor.

En Estados Unidos, **NCMEC CyberTipline** es el sistema centralizado para reportar sospechas de explotación sexual infantil en línea.

---

## Si hubo imágenes íntimas o amenazas con imágenes

Cuando la interacción incluyó presión para enviar imágenes, difusión no consentida o amenazas con material sensible, el foco ya no debe ser regañar al menor, sino reducir el daño cuanto antes.

**UNICEF** incluye entre sus recursos **Take It Down**, una herramienta orientada a apoyar la retirada de imágenes íntimas.

En estos casos, conviene:

1. cortar el contacto,
2. no negociar con quien amenaza,
3. guardar evidencia,
4. activar apoyo especializado,
5. escalar el caso si hay explotación o chantaje.

---

## Después del incidente también hay que acompañar

La respuesta no termina cuando se bloquea o se reporta.

**UNICEF** recomienda seguir hablando con el menor, observar cómo se siente y apoyarlo con actividades positivas fuera de la pantalla. Si los cambios en ánimo o conducta duran un tiempo, conviene buscar apoyo profesional.

Algunas señales de alarma posteriores son:

1. tristeza persistente,
2. ansiedad,
3. irritabilidad,
4. alteraciones del sueño,
5. evitación social,
6. miedo a conectarse.

---

## Qué no conviene hacer

Hay errores que suelen empeorar el problema:

1. culpar al menor,
2. responder impulsivamente al agresor,
3. borrar todo antes de guardar pruebas,
4. minimizar lo ocurrido,
5. convertir la revelación en castigo inmediato.

**UNICEF** insiste en no criticar ni culpar, mientras que **StopBullying.gov** recomienda no responder ni reenviar mensajes agresivos.

---

## Semáforo de decisión

Este semáforo no es una clasificación oficial, sino una síntesis didáctica para ayudar a decidir mejor:

### Amarillo

Insultos, burlas, humillación o presión social.

### Naranja

Solicitud de datos personales, paso a otra app o petición de secretos.

### Rojo

Petición de fotos íntimas, amenazas, chantaje, propuesta de encuentro o miedo por la seguridad.

> **Regla práctica**: Si el caso ya está en naranja o rojo, no basta con “esperar a ver si se calma”. Hace falta intervenir y documentar.

---

## Ruta de respuesta ante una interacción de riesgo

Una forma simple de recordar la secuencia correcta es esta:

1. escuchar y calmar,
2. entender qué ocurrió,
3. no responder al agresor,
4. guardar evidencia,
5. bloquear o reportar,
6. escalar si la seguridad está comprometida.

---

## Qué sí / qué no

### Sí

1. escuchar,
2. creerle,
3. guardar pruebas,
4. usar bloqueo y reporte,
5. pedir apoyo si hace falta.

### No

1. culpar,
2. regañar primero,
3. responder al agresor,
4. borrar todo sin revisar,
5. minimizar lo ocurrido.

---

## Caja de conceptos clave

**Bloquear**: impedir que una persona vuelva a contactar o ver al menor desde la plataforma.

**Reportar**: avisar a la plataforma que una conducta viola sus reglas o pone en riesgo a alguien.

**Evidencia**: capturas, mensajes, perfiles, fechas y otros datos que ayudan a demostrar lo ocurrido.

**Sextorsión**: chantaje usando imágenes o contenido íntimo.

**Escalamiento**: pasar del manejo familiar al apoyo de escuela, plataforma o autoridades según la gravedad.

---

## Microactividad de 1 minuto

Imagina que tu hijo te enseña un chat incómodo.

1. ¿Lo primero que harías sería regañarlo?
2. ¿Responderías al agresor?
3. ¿O le pedirías que te muestre qué pasó para entenderlo bien?

La respuesta más protectora empieza por escuchar, entender y luego actuar.

---

## Cierre

Cuando ya hubo una interacción de riesgo, la meta no es reaccionar con miedo, sino proteger, documentar y acompañar. Un menor necesita sentir que contar lo sucedido sirve para recibir ayuda, no para perder la confianza del adulto.

> **Recuerda**: Escuchar sin culpar, guardar evidencia y escalar cuando la seguridad está en juego suele proteger más que cualquier reacción impulsiva.

Por eso, la respuesta más útil combina calma, escucha, bloqueo o reporte cuando corresponde, y escalamiento a la escuela o a autoridades si la seguridad del menor está comprometida.`,
            type: 'article', duration: 5
        });

        const l4_4 = await getOrCreateLesson(mod4._id, courseGames._id, {
            title: 'Video 2: Cómo conservar evidencia y cuándo reportar',
            content: 'Guía sobre capturas de pantalla y denuncias legales.',
            type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder8', duration: 6
        });

        mod4.lessonOrder = [l4_1._id, l4_2._id, l4_3._id, l4_4._id];
        await mod4.save();

        const q4 = await getOrCreateQuiz({
            title: 'Mini examen / escenario — Módulo 4: Interacción social y señales de alerta',
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
                    { text: 'Alguien insiste en hablar fuera del juego', isCorrect: true },
                    { text: 'Le piden al menor guardar un secreto', isCorrect: true },
                    { text: 'Hay burlas o humillación repetida en chat', isCorrect: true },
                    { text: 'Le preguntan por su escuela o dirección', isCorrect: true },
                    { text: 'Cambió el color del avatar', isCorrect: false },
                    { text: 'Le piden una foto “para saber que es real”', isCorrect: true },
                    { text: 'Quiere probar un mapa nuevo', isCorrect: false },
                    { text: 'Alguien amenaza con publicar algo si no obedece', isCorrect: true }
                ],
                explanation: 'Tip: Paso a otra app, secretos, humillación, datos, fotos y amenazas son señales de revisión inmediata.',
                points: 15
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

