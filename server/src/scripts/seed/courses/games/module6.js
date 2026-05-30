module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

    // --- MODULE 6. Bienestar digital y acompañamiento parental — 30 min ---
    const mod6 = await getOrCreateModule(courseGames._id, {
        title: 'Módulo 6: Bienestar digital y acompañamiento parental',
        description: 'Salud mental y relación familiar en el juego.',
        duration: '21 min'
    });
    await Quiz.deleteMany({ refId: mod6._id, scope: 'module' });

    const l6_1 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Artículo 1: Tiempo de juego, sueño, escuela y señales de uso problemático',
        content: `# Tiempo de juego, sueño, escuela y señales de uso problemático

> **Perspectiva Estratégica**: La pregunta no es solo "¿cuánto juega?", sino "¿qué está dejando de hacer por jugar?".

Este artículo deja una idea muy clara: el problema no siempre es jugar mucho, sino jugar de una forma que desplaza lo importante. Algunos diseños digitales compiten por la atención y pueden desplazar sueño, juego libre, ejercicio y tiempo en familia; por eso conviene hablar temprano sobre cómo encajan los dispositivos en la rutina.

---

![No todo se resume a cuántas horas juega: el foco real está en qué está dejando de hacer el menor por jugar.](/article-images/videojuegos/M6A1.webp)

---

## El sueño es una de las primeras señales que conviene revisar

Para revisar el sueño, estas referencias de edad sirven como punto de partida:

| Edad | Horas de sueño recomendadas | Qué revisar si juega mucho |
| --- | --- | --- |
| **6 a 12 años** | 9 a 12 horas por día. | Si el juego recorta hora de dormir, despertar o energía escolar. |
| **13 a 18 años** | 8 a 10 horas por día. | Si el juego retrasa sueño, concentración o estado de ánimo. |

Dormir poco puede asociarse con problemas de atención y conducta, peor rendimiento escolar, dificultad para concentrarse y mayor riesgo de problemas de salud. Para evitar interrupciones del descanso, conviene mantener las pantallas fuera del dormitorio y apagarlas al menos una hora antes de dormir.

> **Idea clave**: Dormir bien sigue siendo una de las maneras más concretas de notar si el juego está en equilibrio o no.

---

![Jugar de noche cambia más cosas de las que parece: pantallas antes de dormir pueden afectar descanso, convivencia y aprendizaje.](/article-images/videojuegos/M6A1.1.webp)

---

## Cuando el sueño cae, la escuela suele resentirse

El sueño suficiente ayuda a mantenerse enfocado, mejorar la concentración y sostener mejor el rendimiento académico. En cambio, el uso digital problemático suele aparecer junto con sueño menos saludable, peor desempeño escolar, menor control de la atención y menos tiempo con familia y amistades.

Por eso, una familia no debería revisar solo si el menor "se porta bien", sino si últimamente está más cansado, distraído, irritable, desconectado de su rutina o cumpliendo peor con tareas y responsabilidades.

---

## ¿Cuáles son señales de uso problemático?

Estas señales pueden ayudar a una familia a revisar si el juego ya está ocupando demasiado espacio:

| Área afectada | Señales posibles |
| --- | --- |
| **Estado de ánimo** | Enojo intenso cuando no puede jugar, irritabilidad o discusiones constantes por tecnología. |
| **Escuela y rutina** | Calificaciones afectadas, tareas incompletas o sueño alterado de forma repetida. |
| **Convivencia** | Menos participación familiar, retiro de amistades o abandono de hobbies. |
| **Salud física** | Menos ejercicio, alimentación descuidada o cansancio frecuente. |
| **Intereses** | El videojuego se vuelve su único tema o actividad preferida. |

> **Regla práctica**: Si el juego empieza a quitar espacio a varias áreas importantes al mismo tiempo, ya no hablamos solo de entretenimiento.

---

## Uso problemático no significa automáticamente “adicción”

Aquí conviene ser muy cuidadosos. La **OMS** define el **gaming disorder** como un patrón de conducta con falta de control sobre el juego, prioridad creciente del juego sobre otras actividades y continuidad o incremento del juego pese a consecuencias negativas.

Pero también aclara que esto afecta solo a una pequeña proporción de quienes juegan y que, para un diagnóstico, el deterioro debe ser significativo y normalmente mantenerse durante al menos 12 meses.

En otras palabras: no todo menor entusiasmado con un videojuego tiene un trastorno.

---

## Entonces, ¿qué sí debería preocupar a una familia?

Lo que más debe llamar la atención no es el entusiasmo por un juego, sino el **desplazamiento**: cuando el juego le gana al sueño, al desempeño escolar, al ejercicio, al tiempo en familia, a la estabilidad del humor o al interés por otras actividades.

La idea central es práctica: no todo uso intenso es un problema, pero sí conviene actuar cuando el juego desplaza de forma sostenida áreas necesarias para estar bien.

> **Lo que un padre debe notar**: No todo uso intenso es un trastorno, pero sí conviene actuar cuando el juego empieza a ocupar el lugar de lo que el menor necesita para estar bien.

---

## El equilibrio del bienestar digital

Una forma útil de mirar la rutina es revisar si el juego convive con las necesidades principales del día:

| Bloque de bienestar | Señal de equilibrio | Señal de alerta |
| --- | --- | --- |
| **Sueño** | Duerme lo suficiente y se levanta con energía razonable. | Juega hasta tarde, duerme menos o se despierta cansado. |
| **Escuela** | Cumple tareas y mantiene atención. | Bajan notas, olvida deberes o se distrae por seguir jugando. |
| **Actividad física** | Conserva movimiento, juego libre o deporte. | Prefiere pantalla siempre y abandona movimiento. |
| **Familia** | Puede convivir sin conflicto constante por el juego. | Discute todos los días por límites o interrupciones. |
| **Otros intereses** | Mantiene hobbies y amistades fuera del juego. | El videojuego se vuelve su único tema o actividad. |

El objetivo no es sacar el juego de la rutina, sino comprobar que no se esté comiendo a los otros cuatro bloques.

Cuando el juego cabe dentro del día sin desplazar estas áreas, hablamos de un uso más saludable. Cuando las recorta de forma consistente, ya aparece una señal de alerta.

---

## Semáforo de señales para una familia

Este semáforo no es una clasificación clínica oficial. Es una síntesis pedagógica para ayudar a observar mejor.

| Nivel | Cómo se ve | Qué hacer |
| --- | --- | --- |
| **Verde** | Juega, duerme bien, cumple con escuela y conserva otros intereses. | Mantener acuerdos y observación. |
| **Amarillo** | Duerme menos, discute por límites o abandona actividades. | Ajustar horarios y recuperar rutina. |
| **Rojo** | El juego afecta notas, sueño, convivencia y sigue dominando el día. | Intervenir con reglas claras y apoyo si hace falta. |

> **Regla de Oro**: Si el juego desplaza sueño, escuela, ejercicio o convivencia de forma repetida, ya merece intervención, aunque el menor siga diciendo que "todo está bien".

---

## ¿Qué puede hacer una familia desde la prevención?

Desde la prevención, conviene preguntar al menor qué le gusta de sus juegos, qué no le gusta, cuánto los usa, qué siente que le está funcionando y si la tecnología está interfiriendo con otras actividades. En la práctica, esto se traduce en fijar horarios razonables, proteger la rutina de sueño, dejar tiempos sin pantalla antes de dormir, mantener momentos familiares sin dispositivos y revisar si el juego sigue conviviendo con escuela, ejercicio y hobbies.

---

![Checklist rápido: preguntas para distinguir uso saludable y uso problemático en sueño, escuela, actividad física, intereses y control emocional.](/article-images/videojuegos/M6A1.2.webp)

---

## Caja de conceptos clave

**Bienestar digital**: forma de usar la tecnología sin desplazar necesidades importantes del día a día.

**Rutina**: organización básica de sueño, escuela, juego, comida, actividad física y convivencia.

**Uso problemático**: uso digital que empieza a interferir con el bienestar general del menor.

**Gaming disorder**: patrón clínico definido por la OMS, distinto de una afición intensa.

**Family Media Plan**: herramienta familiar para convertir reglas, horarios y espacios de uso digital en acuerdos visibles.

---

## Microactividad de 1 minuto

Piensa en tu hijo o hija: ¿está durmiendo lo que necesita?, ¿el juego afecta tareas o calificaciones?, ¿puede dejar de jugar sin una discusión fuerte?, ¿todavía disfruta otras actividades?

Si dos o más respuestas te preocupan, ya hay razones para revisar hábitos y reglas en casa.

---

## Cierre

El bienestar digital no consiste en eliminar los videojuegos, sino en comprobar que siguen ocupando un lugar saludable dentro de la vida del menor. Cuando el sueño, la escuela, la actividad física, la convivencia y el estado de ánimo siguen en equilibrio, el juego puede formar parte de una rutina sana.

> **Recuerda**: El problema no siempre es jugar mucho; el problema aparece cuando jugar empieza a desplazar lo que el menor necesita para estar bien.`,
        type: 'article',
        duration: 9,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Salud Mental y Física'],
        teaches: ['sueño suficiente', 'uso problemático', 'escuela', 'ejercicio', 'gaming disorder', 'family media plan', 'rutina']
    });

    const l6_2 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Video 1: Cómo poner reglas claras sin pelear con el menor',
        content: `# Cómo poner reglas claras sin pelear con el menor

Este video traduce el módulo en ejemplos de conversación y estructura familiar para que los límites no dependan solo del enojo del momento.

## Qué conviene observar
* Cómo anticipar horarios y cierres sin entrar en discusión constante.
* Qué frases ayudan más que los castigos improvisados.
* Qué señales muestran que el juego ya está desplazando sueño, escuela o ejercicio.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=ccnnm-V9ulM',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Salud Mental y Física'],
        teaches: ['reglas claras', 'preguntas abiertas', 'uso problemático', 'rutina', 'acompañamiento parental']
    });

    const l6_3 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Artículo 2: Cómo acompañar, conversar y jugar junto al hijo',
        content: `# Cómo acompañar, conversar y jugar junto al hijo

> **Perspectiva Estratégica**: A veces, la mejor forma de entender un videojuego no es leer sobre él, sino sentarte al lado de tu hijo y pedirle: "enséñame cómo funciona".

Este artículo transmite una idea central: acompañar no es solo controlar. En bienestar digital, acompañar significa interesarse por lo que el menor juega, preguntarle qué le gusta, entender con quién juega y crear momentos compartidos que permitan conversar sin convertir todo en regaño.

---

![Acompañar empieza por interesarse de verdad: preguntar con curiosidad real ayuda a orientar mejor.](/article-images/videojuegos/M6A2.webp)

---

## Conversar funciona mejor que dar sermones

Las preguntas abiertas ayudan más que los discursos largos porque invitan a conversar y tomar decisiones compartidas. Ese enfoque es especialmente útil en videojuegos porque el menor suele colaborar más cuando siente que su experiencia está siendo escuchada y no solo evaluada.

En la práctica, esto ayuda a pasar de frases como "¿otra vez estás jugando?", "eso te quita el tiempo" o "ya te dije que no me gusta ese juego", a preguntas más útiles que abren conversación.

---

## Jugar junto al hijo cambia la calidad de la supervisión

Jugar con el menor o verlo jugar ayuda a entender mejor sus intereses, su lenguaje y su experiencia dentro del juego. Esto mejora la supervisión porque el adulto ya no habla desde fuera: empieza a ver retos, comunicación con otros jugadores, compras visibles, momentos de frustración o entusiasmo y reglas que tendría sentido acordar.

---

## No hace falta saber jugar bien

Para acompañar no es necesario ser experto. Basta con pedir al menor que muestre su juego favorito, lo que construyó, lo que vio o cómo aprendió a jugar. Compartir ese momento abre conversaciones que quizá no habrían surgido de otra forma y ayuda a fortalecer el vínculo.

En la práctica, eso significa que un padre puede acompañar aunque apenas esté aprendiendo: basta con estar presente, observar, hacer preguntas simples y dejar que el menor explique con sus propias palabras.

> **Regla práctica**: No hace falta dominar el juego para acompañar mejor; hace falta estar cerca, mirar con atención y preguntar bien.

---

## Jugar juntos también ayuda a hablar de seguridad

Cuando el adulto ve una partida, escucha el tipo de interacción o conoce el funcionamiento del juego, le resulta más fácil hablar de chat, reglas de convivencia, compras, frustración, lenguaje ofensivo y contactos no deseados.

Esta es una ventaja concreta del acompañamiento: permite que la prevención salga de situaciones reales, no solo de advertencias abstractas.

---

## Acompañar también implica poner límites visibles y razonables

Acompañar no significa dejar todo libre. También implica pensar qué actividades podría estar desplazando el juego, mantenerlo en áreas comunes cuando sea posible y establecer reglas de "sí" y "no": qué comportamientos digitales espera la familia y qué cosas no están permitidas, como dar información personal, acosar a otros, comprar sin permiso o seguir jugando cuando ya es hora de dormir. Cuando las reglas son visibles, razonables y consistentes, dejan de sentirse como ocurrencias del momento y empiezan a dar estructura.

---

## ¿Qué tipo de preguntas ayudan más?

Para este curso, las preguntas más útiles no son "¿otra vez estás jugando?", sino preguntas que abren conversación y revelan contexto:

| Pregunta abierta | Qué permite descubrir | Por qué ayuda |
| --- | --- | --- |
| **¿Qué te gusta de este juego?** | Motivación, intereses y tipo de experiencia. | Abre conversación sin empezar desde el regaño. |
| **¿Con quién juegas normalmente?** | Amigos, desconocidos, servidores o grupos. | Ayuda a revisar privacidad y contacto social. |
| **¿Qué haces cuando alguien te molesta?** | Estrategias de bloqueo, reporte o evasión. | Permite enseñar respuesta segura antes de un incidente. |
| **¿Hay algo que te estrese?** | Frustración, presión social o dinámicas incómodas. | Detecta señales emocionales que no siempre se ven desde fuera. |
| **¿Me enseñas cómo funciona?** | Menús, chat, compras y reglas reales del juego. | Convierte la supervisión en aprendizaje compartido. |

Estas preguntas convierten la supervisión en una conversación concreta sobre gustos, hábitos, experiencias y reglas reales del juego.

---

![Del control al acompañamiento: control distante, acompañamiento activo, reglas visibles y conversación frecuente.](/article-images/videojuegos/M6A2.1.webp)

---

## Jugar junto al hijo también puede ser una experiencia positiva

Los videojuegos multijugador también pueden ofrecer cooperación, trabajo en equipo, socialización, aprendizaje, creatividad y conexión. Esto importa porque el acompañamiento parental no debe construirse solo desde el miedo, sino también desde la posibilidad de compartir algo que al menor le importa.

Cuando eso pasa, el adulto no solo supervisa mejor: también entiende mejor por qué ese espacio es significativo para su hijo.

---

## Checklist rápido: ya estoy acompañando si…

Una familia puede usar esta autoevaluación sencilla:

| Ya estoy acompañando si... | Qué demuestra |
| --- | --- |
| Sé qué juego usa mi hijo y me lo ha enseñado al menos una vez. | Hay interés real, no solo vigilancia. |
| Sé con quién juega. | Existe supervisión social básica. |
| Tenemos reglas básicas. | Los límites no dependen solo del enojo del momento. |
| Puedo hablar del tema sin pelea inmediata. | Hay una puerta abierta para pedir ayuda. |

Este checklist ayuda a traducir el acompañamiento a señales visibles y concretas.

---

## Caja de conceptos clave

**Acompañamiento parental**: presencia activa e interesada del adulto en la vida digital del menor.

**Co-viewing**: mirar o compartir medios junto al menor para entender mejor lo que consume o juega.

**Family Media Plan**: plan familiar para acordar reglas, horarios y espacios de uso digital.

**Preguntas abiertas**: preguntas que invitan a explicar, no solo a responder sí o no.

**Juego compartido**: momento en que adulto y menor juegan o miran juntos una partida.

---

## Microactividad de 1 minuto

Piensa en esto: ¿tu hijo ya te enseñó alguna vez su juego favorito?, ¿sabes con quién juega?, ¿podrías nombrar una regla clara que ya tienen en casa sobre videojuegos?

Si alguna respuesta es "no", ese puede ser tu siguiente paso para acompañar mejor.

---

## Cierre

Acompañar a un hijo en los videojuegos no consiste en volverse experto ni en vigilar cada segundo. Consiste en interesarse, conversar, mirar de cerca, jugar a veces y usar esa cercanía para orientar mejor. Cuando una familia logra eso, las reglas dejan de sentirse como castigo y empiezan a tener más sentido para todos.

> **Recuerda**: Acompañar mejor no empieza con saberlo todo sobre videojuegos; empieza con estar presente y abrir una conversación real.`,
        type: 'article',
        duration: 8,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Salud Mental y Física'],
        teaches: ['acompañamiento parental', 'conversación', 'preguntas abiertas', 'juego compartido', 'co-viewing', 'family media plan', 'reglas']
    });

    const l6_4 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Video 2: Cómo crear un acuerdo familiar de juego',
        content: `# Cómo crear un acuerdo familiar de juego

Este video muestra cómo convertir las reglas del módulo en un acuerdo visible, simple y realista para toda la familia.

## Qué conviene observar
* Qué puntos vale la pena dejar por escrito en casa.
* Cómo combinar tiempo, descanso, escuela y juego compartido.
* Por qué un acuerdo funciona mejor cuando también compromete a los adultos.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=RcBHQVFLwOE',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Salud Mental y Física'],
        teaches: ['family media plan', 'acuerdo familiar', 'juego compartido', 'rutinas', 'límites']
    });

    mod6.lessonOrder = [l6_1._id, l6_2._id, l6_3._id, l6_4._id];
    await mod6.save();

    const q6 = await getOrCreateQuiz({
        title: 'Examen del Módulo 6: Bienestar digital y acompañamiento parental',
        description: 'Evalúa si puedes reconocer señales de uso problemático y responder con acompañamiento, reglas claras y seguimiento.',
        scope: 'module',
        refId: mod6._id,
        scopeModel: 'Module',
        minPassing: 80
    }, [
        {
            text: 'Instrucción: Arrastra cada concepto a la definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Sueño suficiente', value: 'Tiempo de descanso adecuado para la edad del menor' },
                    { key: 'Uso problemático', value: 'Uso digital que empieza a afectar sueño, escuela, ejercicio o convivencia' },
                    { key: 'Acompañamiento parental', value: 'Participación activa del adulto mediante conversación, interés y supervisión cercana' },
                    { key: 'Family Media Plan', value: 'Acuerdo familiar con reglas y límites sobre medios y tecnología' },
                    { key: 'Juego compartido', value: 'Momento en que el adulto juega o mira jugar junto al menor' }
                ],
                correctAnswer: {
                    'Sueño suficiente': 'Tiempo de descanso adecuado para la edad del menor',
                    'Uso problemático': 'Uso digital que empieza a afectar sueño, escuela, ejercicio o convivencia',
                    'Acompañamiento parental': 'Participación activa del adulto mediante conversación, interés y supervisión cercana',
                    'Family Media Plan': 'Acuerdo familiar con reglas y límites sobre medios y tecnología',
                    'Juego compartido': 'Momento en que el adulto juega o mira jugar junto al menor'
                }
            },
            explanation: 'Tip: Dormir bien, acompañar de cerca, jugar juntos y acordar reglas son piezas distintas de un mismo equilibrio familiar.',
            points: 15
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Si el juego interfiere con el [blank1], ya existe una señal importante de alerta. Si baja el rendimiento en la [blank2], conviene revisar hábitos digitales. Acompañar mejor empieza muchas veces por una buena [blank3] con el menor. Un acuerdo familiar funciona mejor cuando incluye [blank4] claras. El uso problemático también puede desplazar el [blank5].',
                bank: ['sueño', 'escuela', 'conversación', 'reglas', 'ejercicio'],
                correctAnswer: {
                    blank1: 'sueño',
                    blank2: 'escuela',
                    blank3: 'conversación',
                    blank4: 'reglas',
                    blank5: 'ejercicio'
                }
            },
            explanation: 'Tip: Sueño, escuela y ejercicio son señales observables; la conversación y las reglas ayudan a intervenir antes de que el problema crezca.',
            points: 10
        },
        {
            text: 'Instrucción: Relaciona cada situación con el área que afecta principalmente.',
            type: 'match_columns',
            metadata: {
                left: [
                    'Dormirse tarde por jugar',
                    'Bajar calificaciones',
                    'Discutir siempre al apagar el juego',
                    'Dejar hobbies o deporte',
                    'Jugar junto al hijo',
                    'Hacer un Family Media Plan'
                ],
                right: [
                    'Sueño',
                    'Escuela',
                    'Señal de uso problemático',
                    'Actividad física o equilibrio diario',
                    'Acompañamiento activo',
                    'Prevención y organización familiar'
                ],
                correctAnswer: {
                    'Dormirse tarde por jugar': 'Sueño',
                    'Bajar calificaciones': 'Escuela',
                    'Discutir siempre al apagar el juego': 'Señal de uso problemático',
                    'Dejar hobbies o deporte': 'Actividad física o equilibrio diario',
                    'Jugar junto al hijo': 'Acompañamiento activo',
                    'Hacer un Family Media Plan': 'Prevención y organización familiar'
                }
            },
            explanation: 'Tip: Algunas señales muestran impacto; otras muestran respuesta. Saber distinguirlo ayuda a actuar mejor en casa.',
            points: 15
        },
        {
            text: 'Ordena los pasos para construir una respuesta familiar más sana ante el exceso de juego.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Acordar reglas claras',
                    'Observar si el juego afecta sueño, escuela o ánimo',
                    'Preguntar al menor qué le gusta del juego y cómo se siente',
                    'Revisar si el horario y el lugar de juego son adecuados',
                    'Dar seguimiento y ajustar si algo no funciona'
                ],
                correctAnswer: [
                    'Observar si el juego afecta sueño, escuela o ánimo',
                    'Preguntar al menor qué le gusta del juego y cómo se siente',
                    'Revisar si el horario y el lugar de juego son adecuados',
                    'Acordar reglas claras',
                    'Dar seguimiento y ajustar si algo no funciona'
                ]
            },
            explanation: 'Tip: La secuencia más sana suele ser observar, conversar, revisar el contexto, acordar y luego ajustar con el tiempo.',
            points: 10
        },
        {
            text: 'Selecciona todas las opciones que pueden ser señales de uso problemático del juego.',
            type: 'multiple_selection',
            options: [
                { text: 'Se irrita mucho cuando no puede jugar', isCorrect: true },
                { text: 'El juego afecta el sueño o el ejercicio del menor', isCorrect: true },
                { text: 'El juego se vuelve su único tema de conversación', isCorrect: true },
                { text: 'Cumple con las tareas escolares antes de jugar', isCorrect: false },
                { text: 'Participa en actividades familiares aunque también juega', isCorrect: false },
                { text: 'Duerme lo suficiente para su edad', isCorrect: false }
            ],
            explanation: 'Tip: Irritabilidad, desplazamiento del sueño, malas notas, abandono de intereses y obsesión temática son señales que conviene revisar.',
            points: 15
        },
        {
            text: 'Completa correctamente cada frase.',
            type: 'drop_down',
            metadata: {
                sentence: 'Entre 6 y 12 años, lo recomendado es dormir entre [blank1] horas al día. Entre 13 y 18 años, lo recomendado es dormir entre [blank2] horas al día. Una forma útil de acompañar es pedir al menor que te [blank3] cómo funciona su juego. Una herramienta útil para acordar límites familiares se llama [blank4].',
                options: {
                    blank1: ['9 y 12', '6 y 8', '10 y 14'],
                    blank2: ['8 y 10', '6 y 7', '11 y 13'],
                    blank3: ['enseñe', 'oculte', 'resuma'],
                    blank4: ['Family Media Plan', 'Gaming Disorder Test', 'Sleep Pass']
                },
                correctAnswer: {
                    blank1: '9 y 12',
                    blank2: '8 y 10',
                    blank3: 'enseñe',
                    blank4: 'Family Media Plan'
                }
            },
            explanation: 'Tip: El sueño recomendado cambia por edad, y el acompañamiento mejora cuando el menor puede enseñar cómo funciona su juego.',
            points: 10
        },
        {
            text: 'Instrucción: Arrastra cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Dormir menos por jugar',
                    'Jugar junto al hijo',
                    'Pantallas fuera del dormitorio',
                    'Preguntar con quién juega',
                    'Bajar calificaciones',
                    'Acordar horario de juego',
                    'Irritarse mucho al parar',
                    'Conversar sobre lo que le gusta del juego'
                ],
                categories: ['Señal de alerta', 'Acompañamiento', 'Regla familiar'],
                correctAnswer: {
                    'Señal de alerta': [
                        'Dormir menos por jugar',
                        'Bajar calificaciones',
                        'Irritarse mucho al parar'
                    ],
                    'Acompañamiento': [
                        'Jugar junto al hijo',
                        'Preguntar con quién juega',
                        'Conversar sobre lo que le gusta del juego'
                    ],
                    'Regla familiar': [
                        'Pantallas fuera del dormitorio',
                        'Acordar horario de juego'
                    ]
                }
            },
            explanation: 'Tip: Una cosa es detectar señales, otra acompañar de cerca y otra poner reglas que den estructura a la rutina.',
            points: 10
        },
        {
            text: 'Caso práctico: Tu hijo de 12 años juega casi todas las noches. En las últimas semanas se duerme tarde, amanece cansado, discute cuando le pides apagar el juego y ya no quiere ir a su entrenamiento. Tú no quieres empezar una pelea, pero sí te preocupa que esto siga creciendo. ¿Cuál es la mejor respuesta?',
            type: 'case_study',
            points: 15,
            options: [
                { text: 'Quitar el juego sin explicar nada y esperar que se acostumbre.', isCorrect: false },
                { text: 'Ignorarlo porque solo es una etapa y todos los niños juegan mucho.', isCorrect: false },
                { text: 'Hablar con él, revisar cómo el juego está afectando sueño y rutina, acordar reglas claras, mover el juego a un horario más sano y dar seguimiento.', isCorrect: true },
                { text: 'Decirle que siga jugando mientras sus notas no bajen más.', isCorrect: false }
            ],
            explanation: 'La mejor respuesta combina observación, conversación, reglas claras y seguimiento. El problema no es solo cuántas horas juega, sino que el juego ya está desplazando sueño y otras actividades importantes.'
        }
    ]);
    mod6.quizId = q6._id;
    await mod6.save();
};
