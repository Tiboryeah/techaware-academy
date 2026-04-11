module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

    // --- MODULE 6. Bienestar digital y acompañamiento parental — 30 min ---
    const mod6 = await getOrCreateModule(courseGames._id, {
        title: 'Módulo 6: Bienestar digital y acompañamiento parental',
        description: 'Salud mental y relación familiar en el juego.',
        duration: '30 min'
    });
    await Quiz.deleteMany({ refId: mod6._id, scope: 'module' });

    const l6_1 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Artículo 1: Tiempo de juego, sueño, escuela y señales de uso problemático',
        content: `# Tiempo de juego, sueño, escuela y señales de uso problemático

> **Perspectiva Estratégica**: La pregunta no es solo "¿cuánto juega?", sino "¿qué está dejando de hacer por jugar?".

Este artículo deja una idea muy clara: el problema no siempre es jugar mucho, sino jugar de una forma que desplaza lo importante. La **Academia Americana de Pediatría (AAP)** explica que ciertos diseños digitales compiten por la atención y pueden desplazar sueño, juego libre, ejercicio y tiempo en familia. **UNICEF**, por su parte, recomienda hablar temprano y con frecuencia sobre cómo encajan los dispositivos en la vida familiar y si están interfiriendo con otras actividades.

---

## No todo se resume a “cuántas horas juega”

Medir solo el número de horas puede ser insuficiente. La **AAP** señala que el mundo digital actual es más complejo que el simple "screen time" y que algunas plataformas están diseñadas para mantener a los usuarios enganchados mediante funciones como autoplay, alertas, recompensas y otros estímulos constantes.

Por eso, para una familia importa tanto el tiempo como una pregunta más útil: **¿qué está dejando de hacer el menor por jugar?**

> **Lectura pedagógica**: El tiempo importa, pero el verdadero foco está en el equilibrio. Un juego puede ocupar varias horas sin generar daño si no está desplazando sueño, escuela, convivencia, actividad física u otras necesidades básicas.

---

## El sueño es una de las primeras señales que conviene revisar

El **CDC** indica que:

1. niñas y niños de 6 a 12 años deberían dormir entre **9 y 12 horas** por día,
2. adolescentes de 13 a 18 años deberían dormir entre **8 y 10 horas** por día.

También advierte que dormir poco se asocia con:

1. más problemas de atención y conducta,
2. peor rendimiento escolar,
3. más dificultad para concentrarse,
4. mayor riesgo de problemas de salud.

**HealthyChildren** añade que, para evitar interrupciones del sueño, conviene mantener las pantallas fuera del dormitorio y apagarlas al menos una hora antes de dormir.

> **Idea clave**: Dormir bien sigue siendo una de las maneras más concretas de notar si el juego está en equilibrio o no.

---

## Jugar de noche cambia más cosas de las que parece

**HealthyChildren** explica que usar pantallas antes de dormir dificulta relajarse, puede retrasar la hora de acostarse y hacer más difícil quedarse dormido. También recomienda apagar dispositivos entre 30 y 60 minutos antes de dormir y, de ser posible, dejarlos fuera del cuarto.

La **AAP** también recomienda crear tiempos y espacios sin pantallas, especialmente en:

1. comidas,
2. deberes,
3. momentos familiares,
4. la rutina previa al sueño.

Esto protege no solo el descanso, sino también la convivencia y la capacidad de aprender al día siguiente.

---

## Cuando el sueño cae, la escuela suele resentirse

El **CDC** señala que el sueño suficiente ayuda a mantenerse enfocado, mejorar la concentración y favorecer el rendimiento académico. En esa misma línea, la **AAP** relaciona el uso digital problemático en edad escolar con:

1. sueño menos saludable,
2. peor desempeño escolar,
3. menor control de la atención,
4. menos tiempo con familia y amistades.

Por eso, una familia no debería revisar solo si el menor "se porta bien", sino si últimamente está:

1. más cansado,
2. distraído,
3. irritable,
4. desconectado de su rutina,
5. cumpliendo peor con tareas o responsabilidades.

---

## ¿Cuáles son señales de uso problemático?

**HealthyChildren** ofrece una lista muy útil para familias. Entre las señales de posible uso problemático están:

1. que el menor se enoje o irrite mucho cuando no puede usar medios,
2. que el uso afecte sus calificaciones,
3. que se reduzca su participación en actividades familiares,
4. que interfiera con sueño o ejercicio,
5. que se convierta en su único tema de conversación o actividad preferida.

La **AAP** añade otras señales, como:

1. retirarse de amistades y hobbies,
2. discutir constantemente por tecnología,
3. dejar que el juego interfiera con actividad física,
4. descuidar alimentación saludable,
5. alterar de forma repetida la hora de dormir.

> **Regla práctica**: Si el juego empieza a quitar espacio a varias áreas importantes al mismo tiempo, ya no hablamos solo de entretenimiento.

---

## Uso problemático no significa automáticamente “adicción”

Aquí conviene ser muy cuidadosos. La **OMS** define el **gaming disorder** como un patrón de conducta con:

1. falta de control sobre el juego,
2. prioridad creciente del juego sobre otras actividades,
3. continuidad o incremento del juego pese a consecuencias negativas.

Pero también aclara que esto afecta solo a una pequeña proporción de quienes juegan y que, para un diagnóstico, el deterioro debe ser significativo y normalmente mantenerse durante al menos 12 meses.

En otras palabras: no todo menor entusiasmado con un videojuego tiene un trastorno.

---

## Entonces, ¿qué sí debería preocupar a una familia?

Lo que más debe llamar la atención no es el entusiasmo por un juego, sino el **desplazamiento**. Es decir, cuando el juego le gana al:

1. sueño,
2. desempeño escolar,
3. ejercicio,
4. tiempo en familia,
5. estabilidad del humor,
6. interés por otras actividades.

Esta idea está alineada tanto con la definición de la **OMS** como con las señales de uso problemático recogidas por **HealthyChildren**.

> **Lo que un padre debe notar**: No todo uso intenso es un trastorno, pero sí conviene actuar cuando el juego empieza a ocupar el lugar de lo que el menor necesita para estar bien.

---

## El equilibrio del bienestar digital

Una forma útil de mirar la rutina es pensar en cinco bloques que necesitan convivir:

1. sueño,
2. escuela,
3. juego,
4. actividad física,
5. familia.

El objetivo no es sacar el juego de la rutina, sino comprobar que no se esté comiendo a los otros cuatro bloques.

Cuando el juego cabe dentro del día sin desplazar estas áreas, hablamos de un uso más saludable. Cuando las recorta de forma consistente, ya aparece una señal de alerta.

---

## Semáforo de señales para una familia

Este semáforo no es una clasificación clínica oficial. Es una síntesis pedagógica para ayudar a observar mejor.

### Verde: uso saludable

Juega, pero duerme bien, cumple con escuela, conserva otros intereses y puede dejar el juego sin gran conflicto.

### Amarillo: empieza a desacomodarse la rutina

Empieza a dormir menos, a discutir por límites o a abandonar otras actividades.

### Rojo: el juego domina su rutina

El juego afecta notas, sueño, convivencia y sigue ocupando el centro del día incluso cuando ya hay consecuencias claras.

> **Regla de Oro**: Si el juego desplaza sueño, escuela, ejercicio o convivencia de forma repetida, ya merece intervención, aunque el menor siga diciendo que "todo está bien".

---

## ¿Qué puede hacer una familia desde la prevención?

**UNICEF** recomienda preguntar al menor:

1. qué le gusta de sus dispositivos,
2. qué no le gusta,
3. cuánto los usa,
4. qué siente que le está funcionando,
5. si la tecnología está interfiriendo con otras actividades.

La **AAP** recomienda construir un **Family Media Plan**, establecer tiempos y lugares sin pantallas, apagar lo que no se está usando y revisar actividades en línea que puedan estar volviéndose problemáticas.

Traducido a la práctica para este curso, conviene:

1. fijar horarios razonables para jugar,
2. proteger la rutina de sueño,
3. dejar tiempos sin pantalla antes de dormir,
4. mantener momentos familiares sin dispositivos,
5. revisar si el juego sigue conviviendo con escuela, ejercicio y hobbies.

---

## Checklist rápido: ¿uso saludable o uso problemático?

Antes de alarmarse o minimizar, conviene revisar cinco preguntas:

1. **¿Duerme lo suficiente para su edad?**
2. **¿Cumple con escuela y tareas?**
3. **¿Sigue moviéndose y haciendo actividad física?**
4. **¿Convive con otros y mantiene intereses fuera del juego?**
5. **¿Puede parar sin explotar o entrar en una discusión fuerte?**

Este checklist convierte una preocupación abstracta en observaciones concretas para la vida diaria.

---

## Caja de conceptos clave

**Bienestar digital**: forma de usar la tecnología sin desplazar necesidades importantes del día a día.

**Rutina**: organización básica de sueño, escuela, juego, comida, actividad física y convivencia.

**Uso problemático**: uso digital que empieza a interferir con el bienestar general del menor.

**Gaming disorder**: patrón clínico definido por la OMS, distinto de una afición intensa.

**Family Media Plan**: plan familiar para acordar reglas, horarios y espacios de uso digital.

---

## Microactividad de 1 minuto

Piensa en tu hijo o hija y responde mentalmente:

1. ¿Está durmiendo lo que necesita para su edad?
2. ¿El juego está afectando tareas o calificaciones?
3. ¿Puede dejar de jugar sin una discusión fuerte?
4. ¿Todavía disfruta otras actividades?

Si dos o más respuestas te preocupan, ya hay razones para revisar hábitos y reglas en casa.

---

## Cierre

El bienestar digital no consiste en eliminar los videojuegos, sino en comprobar que siguen ocupando un lugar saludable dentro de la vida del menor. Cuando el sueño, la escuela, la actividad física, la convivencia y el estado de ánimo siguen en equilibrio, el juego puede formar parte de una rutina sana.

> **Recuerda**: El problema no siempre es jugar mucho; el problema aparece cuando jugar empieza a desplazar lo que el menor necesita para estar bien.`,
        type: 'article', duration: 5
    });

    const l6_2 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Video 1: Cómo poner reglas claras sin pelear con el menor',
        content: 'Estrategias de comunicación para límites saludables.',
        type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder11', duration: 6
    });

    const l6_3 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Artículo 2: Cómo acompañar, conversar y jugar junto al hijo',
        content: `# Cómo acompañar, conversar y jugar junto al hijo

> **Perspectiva Estratégica**: A veces, la mejor forma de entender un videojuego no es leer sobre él, sino sentarte al lado de tu hijo y pedirle: "enséñame cómo funciona".

Este artículo transmite una idea central: acompañar no es solo controlar. En bienestar digital, acompañar significa interesarse por lo que el menor juega, preguntarle qué le gusta, entender con quién juega y crear momentos compartidos que permitan conversar sin convertir todo en regaño. **HealthyChildren** señala que involucrarse y mantener abierta la comunicación es una de las formas más importantes de ayudar a que niñas, niños y adolescentes estén más seguros en los juegos en línea.

---

## Acompañar empieza por interesarse de verdad

**UNICEF** recomienda hablar temprano y con frecuencia sobre el papel que la tecnología tiene en la vida familiar, y sugiere preguntar al menor:

1. qué le gusta de sus dispositivos,
2. qué no le gusta,
3. con qué frecuencia los usa,
4. qué siente que le está funcionando,
5. qué cosas le incomodan o le cuestan.

Eso también aplica a los videojuegos. Antes de corregir, conviene comprender. Cuando un padre pregunta con curiosidad real, deja de mirar el juego como una "caja negra" y empieza a entender por qué es importante para su hijo.

> **Idea clave**: Interesarse no significa aprobar todo lo que pasa en el juego; significa conocerlo lo suficiente para orientar mejor.

---

## Conversar funciona mejor que dar sermones

**HealthyChildren** propone usar preguntas y prompts para hablar con niños, preadolescentes y adolescentes sobre tecnología, redes y videojuegos, buscando conversaciones y decisiones compartidas en lugar de discursos unilaterales.

Ese enfoque es especialmente útil en videojuegos porque el menor suele colaborar más cuando siente que su experiencia está siendo escuchada y no solo evaluada.

En la práctica, esto ayuda a pasar de frases como:

1. "¿Otra vez estás jugando?",
2. "Eso te quita el tiempo",
3. "Ya te dije que no me gusta ese juego"

a preguntas más útiles que abren conversación.

---

## Jugar junto al hijo cambia la calidad de la supervisión

**UNICEF** dice de forma explícita que una de las mejores maneras en que los padres pueden involucrarse es jugar videojuegos con sus hijos, sentarse con ellos y dejar que les enseñen cómo se juega. Añade que, cuando eso ocurre, el punto de vista de los padres cambia y se abre un diálogo mucho más fluido sobre el juego.

**HealthyChildren** coincide: jugar con el menor o verlo jugar ayuda a entender mejor sus intereses, su lenguaje y su experiencia dentro del juego.

Esto mejora la supervisión porque el adulto ya no habla desde fuera. Empieza a ver:

1. qué tipo de retos hay,
2. cómo se comunican otros jugadores,
3. qué compras aparecen,
4. qué partes del juego frustran o entusiasman más,
5. qué tipo de reglas tendría sentido acordar.

---

## No hace falta saber jugar bien

Para acompañar no es necesario ser experto. **HealthyChildren** recomienda pedir al menor que muestre su juego favorito, lo que construyó, lo que vio o cómo aprendió a jugar. También explica que compartir medios juntos abre conversaciones que quizá no habrían surgido de otra forma y ayuda a fortalecer el vínculo.

En la práctica, eso significa que un padre puede acompañar aunque apenas esté aprendiendo. Basta con:

1. estar presente,
2. observar,
3. hacer preguntas simples,
4. dejar que el menor explique con sus propias palabras.

> **Regla práctica**: No hace falta dominar el juego para acompañar mejor; hace falta estar cerca, mirar con atención y preguntar bien.

---

## Jugar juntos también ayuda a hablar de seguridad

**HealthyChildren** recomienda revisar con frecuencia con quién juega el menor y si ha tenido contacto con personas desconocidas. Cuando el adulto ve una partida, escucha el tipo de interacción o conoce el funcionamiento del juego, le resulta más fácil hablar de:

1. chat,
2. reglas de convivencia,
3. compras,
4. frustración,
5. lenguaje ofensivo,
6. contactos no deseados.

Esta es una ventaja concreta del acompañamiento: permite que la prevención salga de situaciones reales, no solo de advertencias abstractas.

---

## Acompañar también implica poner límites visibles y razonables

Acompañar no significa dejar todo libre. **HealthyChildren** recomienda tener un **Family Media Plan**, pensar qué actividades podría estar desplazando el juego y mantener el gaming en áreas comunes de la casa cuando sea posible.

**UNICEF** también sugiere establecer reglas de "sí" y "no": qué comportamientos digitales espera la familia y qué cosas no están permitidas, como:

1. dar información personal,
2. acosar a otros,
3. comprar sin permiso,
4. seguir jugando cuando ya es hora de dormir.

Cuando las reglas son visibles, razonables y consistentes, dejan de sentirse como ocurrencias del momento y empiezan a dar estructura.

---

## ¿Qué tipo de preguntas ayudan más?

Para este curso, las preguntas más útiles no son "¿otra vez estás jugando?", sino otras como estas:

1. **¿Qué te gusta de este juego?**
2. **¿Con quién juegas normalmente?**
3. **¿Qué haces cuando alguien te molesta?**
4. **¿Hay algo del juego que te estrese o te incomode?**
5. **¿Quieres enseñarme cómo funciona?**

Estas preguntas son una adaptación pedagógica basada en la orientación de **UNICEF** de preguntar por gustos, hábitos y experiencias, y en la recomendación de **HealthyChildren** de usar preguntas que abran conversación y de pedir al menor que enseñe su juego.

---

## Del control al acompañamiento

Una forma útil de leer el cambio de enfoque es esta:

### Supervisión distante

1. solo prohibir,
2. solo regañar,
3. no conocer el juego,
4. reaccionar tarde cuando ya hubo un problema.

### Acompañamiento activo

1. preguntar,
2. mirar o jugar juntos,
3. conocer con quién juega,
4. acordar reglas,
5. conversar antes de que aparezca el conflicto.

> **Lo que un padre debe notar**: La cercanía no elimina la necesidad de reglas; hace que las reglas tengan más sentido y más posibilidades de cumplirse.

---

## Jugar junto al hijo también puede ser una experiencia positiva

**HealthyChildren** señala que los videojuegos multijugador pueden ofrecer experiencias de cooperación, trabajo en equipo y socialización, y que incluso pueden disfrutarse juntos en familia. **UNICEF** también destaca que los videojuegos pueden ofrecer aprendizaje, creatividad y conexión.

Esto importa porque el acompañamiento parental no debe construirse solo desde el miedo, sino también desde la posibilidad de compartir algo que al menor le importa.

Cuando eso pasa, el adulto no solo supervisa mejor: también entiende mejor por qué ese espacio es significativo para su hijo.

---

## Checklist rápido: ya estoy acompañando si…

Una familia puede usar esta autoevaluación sencilla:

1. sé qué juego usa mi hijo,
2. me ha enseñado al menos una vez cómo funciona,
3. sé con quién juega,
4. tenemos reglas básicas,
5. puedo hablar del tema sin pelea inmediata.

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

Piensa en esto:

1. ¿Tu hijo ya te enseñó alguna vez su juego favorito?
2. ¿Sabes con quién juega?
3. ¿Podrías nombrar una regla clara que ya tienen en casa sobre videojuegos?

Si alguna respuesta es "no", ese puede ser tu siguiente paso para acompañar mejor.

---

## Cierre

Acompañar a un hijo en los videojuegos no consiste en volverse experto ni en vigilar cada segundo. Consiste en interesarse, conversar, mirar de cerca, jugar a veces y usar esa cercanía para orientar mejor. Cuando una familia logra eso, las reglas dejan de sentirse como castigo y empiezan a tener más sentido para todos.

> **Recuerda**: Acompañar mejor no empieza con saberlo todo sobre videojuegos; empieza con estar presente y abrir una conversación real.`,
        type: 'article', duration: 5
    });

    const l6_4 = await getOrCreateLesson(mod6._id, courseGames._id, {
        title: 'Video 2: Cómo crear un acuerdo familiar de juego',
        content: 'Crea un contrato de convivencia digital en familia.',
        type: 'video', videoUrl: 'https://www.youtube.com/watch?v=placeholder12', duration: 6
    });

    mod6.lessonOrder = [l6_1._id, l6_2._id, l6_3._id, l6_4._id];
    await mod6.save();

    const q6 = await getOrCreateQuiz({
        title: 'Mini examen / plan familiar breve — Módulo 6: Bienestar digital y acompañamiento parental',
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
                sentence: 'Si el juego interfiere con el [blank1], ya existe una señal importante de alerta. Si baja el rendimiento en la [blank2], conviene revisar hábitos digitales. Acompañar mejor empieza muchas veces por una buena [blank3] con el menor. Un acuerdo familiar funciona mejor cuando incluye [blank4] claras. HealthyChildren advierte que el uso problemático también puede desplazar el [blank5].',
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
                { text: 'El juego afecta sueño o ejercicio', isCorrect: true },
                { text: 'Habla del juego, pero también sigue con otras actividades', isCorrect: false },
                { text: 'Bajan sus calificaciones o evita tareas', isCorrect: true },
                { text: 'Dejó de interesarse por familia, hobbies o deporte', isCorrect: true },
                { text: 'Duerme lo suficiente para su edad', isCorrect: false },
                { text: 'El juego se vuelve su único tema de conversación', isCorrect: true },
                { text: 'Juega a veces con un adulto y conversa sobre ello', isCorrect: false }
            ],
            explanation: 'Tip: Irritabilidad, desplazamiento del sueño, malas notas, abandono de intereses y obsesión temática son señales que conviene revisar.',
            points: 15
        },
        {
            text: 'Completa correctamente cada frase.',
            type: 'drop_down',
            metadata: {
                sentence: 'Entre 6 y 12 años, lo recomendado es dormir entre [blank1] horas al día. Entre 13 y 18 años, lo recomendado es dormir entre [blank2] horas al día. Una forma útil de acompañar es pedir al menor que te [blank3] cómo funciona su juego. La herramienta de la AAP para acordar límites familiares se llama [blank4].',
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
