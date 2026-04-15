const buildStreamingCatalog = () => {
    const desiredCourseTitle = 'Plataformas de Streaming: YouTube y Twitch';
    const legacyCourseTitles = [
        'Plataformas de Streaming — YouTube y Twitch',
        'Curso 2: Plataformas de Streaming — YouTube y Twitch',
        'Plataformas de Streaming: YouTube y Twitch',
        'Streaming: YouTube y Twitch',
    ];
    const placeholderVideoUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';

    const buildArticleContent = ({ moduleTitle, objective, lessonTitle }) => `# ${lessonTitle.replace(/^Artículo \d+: /, '')}

Este artículo forma parte de **${moduleTitle}** y presenta el tema con un lenguaje claro, práctico y fácil de seguir para madres, padres y cuidadores.

## Qué vas a encontrar aquí
* Una explicación breve del tema central de la lección.
* Ejemplos cotidianos relacionados con el uso infantil de YouTube y Twitch.
* Ideas clave para entender mejor el objetivo del módulo.

> ${objective}`;

    const buildVideoContent = ({ moduleTitle, objective, lessonTitle }) => `# ${lessonTitle.replace(/^Video \d+: /, '')}

Este video acompaña visualmente el módulo **${moduleTitle}** y resume sus ideas principales de forma sencilla.

## Qué vas a observar
* Ejemplos rápidos para ubicar el tema.
* Situaciones que suelen vivir niños, adolescentes y familias.
* Pistas prácticas para conectar el contenido con la vida diaria.

> ${objective}

Nota: Este video usa un enlace temporal mientras se integra el material audiovisual definitivo del curso.`;

    const module1Article1Content = `# ¿Qué son YouTube y Twitch y cómo funcionan?

En la actualidad, plataformas como YouTube y Twitch forman parte del día a día de muchos niños. Son espacios de entretenimiento, aprendizaje e interacción, pero también representan un entorno que los padres deben comprender para poder acompañar adecuadamente a sus hijos.

## ¿Qué es el streaming?

El streaming es una forma de consumir contenido, como videos, música o transmisiones, a través de internet sin necesidad de descargarlo.

Esto permite que los niños puedan:
* Ver videos al instante.
* Cambiar rápidamente de contenido.
* Pasar horas consumiendo sin interrupciones.

En otras palabras, todo está disponible casi todo el tiempo.

## ¿Qué es YouTube?

YouTube es una plataforma donde los usuarios pueden ver, subir y compartir videos.

### Características principales
* Videos grabados, como tutoriales, juegos, entretenimiento o contenido educativo.
* Sistema de recomendaciones automático.
* Reproducción continua.
* Contenido para muchas edades e intereses.

### ¿Por qué lo usan los niños?
* Pueden ver lo que les gusta cuando quieren.
* Encuentran contenido de videojuegos, juguetes, retos o creadores favoritos.
* Los videos suelen ser fáciles de consumir y están siempre disponibles.

## ¿Qué es Twitch?

Twitch es una plataforma enfocada principalmente en transmisiones en vivo.

### Características principales
* Contenido en tiempo real.
* Interacción mediante chat en vivo.
* Creadores que juegan, hablan, reaccionan o conviven con su audiencia.

### ¿Por qué atrae a los niños?
* Pueden ver a otras personas jugar videojuegos en directo.
* Se sienten parte de una comunidad.
* Pueden interactuar, aunque eso también implica riesgos.

## Diferencias clave entre YouTube y Twitch

| Característica | YouTube | Twitch |
| --- | --- | --- |
| Tipo de contenido | Videos grabados | Transmisiones en vivo |
| Interacción | Limitada, por ejemplo en comentarios | Alta, por ejemplo en chat en vivo |
| Control del contenido | Mayor control previo | Menor control en tiempo real |
| Riesgo principal | Contenido inapropiado | Interacción con desconocidos |

## ¿Cómo funcionan los algoritmos?

Ambas plataformas utilizan algoritmos, es decir, sistemas automáticos que deciden qué contenido mostrar.

### ¿Qué hacen?
* Analizan lo que el niño ve.
* Detectan sus intereses.
* Recomiendan contenido similar.

### ¿Por qué es importante?

Esto puede provocar que:
* El niño vea contenido cada vez más extremo o llamativo.
* Pase más tiempo del esperado en la plataforma.
* Acceda a contenido no adecuado sin buscarlo directamente.

> Ejemplo: un niño ve videos de videojuegos, luego el sistema le recomienda más contenido parecido, después retos y más adelante materiales que ya no son apropiados para su edad.

## ¿Por qué los niños pueden pasar tanto tiempo viendo streaming?

Estas plataformas están diseñadas para mantener la atención mediante:
* Reproducción automática.
* Contenido constante.
* Recompensa inmediata a través de entretenimiento rápido.

Eso favorece el efecto de "solo un video más", que fácilmente puede convertirse en mucho más tiempo del planeado.

## Primeros riesgos que deben conocer los padres

Aunque en este artículo estamos revisando lo básico, conviene identificar desde ahora algunos riesgos iniciales:
* Exposición a contenido inapropiado.
* Consumo excesivo de tiempo.
* Influencia de creadores desconocidos.
* Dificultad para distinguir entre realidad y entretenimiento.

## Rol de los padres: comprender antes de controlar

Antes de establecer reglas, es fundamental entender el entorno digital de los hijos.

### Preguntas clave para iniciar
1. ¿Qué videos te gusta ver?
2. ¿Quién es tu creador favorito?
3. ¿Por qué te gusta ese contenido?

Esto permite:
* Generar confianza.
* Detectar riesgos sin conflicto.
* Acompañar en lugar de solo prohibir.

## Conclusión

YouTube y Twitch no son peligrosos por sí mismos, pero sí son entornos complejos donde los niños pueden enfrentarse a múltiples riesgos si no hay supervisión.

Comprender cómo funcionan es el primer paso para:
* Proteger a los hijos.
* Guiarlos en el uso responsable.
* Aprovechar lo positivo del contenido digital.

## Idea clave del módulo

No se trata de prohibir el streaming, sino de entenderlo para poder acompañar a los hijos de forma segura y consciente.`;

    const module1Article2Content = `# ¿Por qué el streaming es tan atractivo para niños y adolescentes?

Después de entender qué son plataformas como YouTube y Twitch, surge una pregunta clave para los padres: ¿por qué los niños pueden pasar tanto tiempo viendo contenido sin aburrirse?

La respuesta no es casualidad. Estas plataformas están diseñadas para ser altamente atractivas, especialmente para el cerebro infantil.

## 1. Recompensa inmediata: entretenimiento sin esfuerzo

El streaming ofrece placer instantáneo:
* Videos que comienzan en segundos.
* Contenido divertido, emocionante o sorprendente.
* Muy poco esfuerzo para obtener entretenimiento.

Esto activa el sistema de recompensa del cerebro, asociado con la dopamina, y hace que el niño quiera seguir viendo más.

Es parecido a comer dulces: es rápido, fácil y cuesta más trabajo detenerse.

## 2. Contenido infinito: parece que nunca se acaba

A diferencia de la televisión tradicional, aquí no hay un final claro.

¿Qué pasa en la práctica?
* Termina un video y empieza otro automáticamente.
* Siempre hay algo nuevo para mirar.
* No existe una pausa natural que invite a detenerse.

Esto hace que muchos niños pierdan la noción del tiempo.

Por eso es tan común escuchar: "solo iba a ver un video", y después notar que pasó mucho más tiempo.

## 3. Personalización: parece hecho para ellos

Los algoritmos detectan lo que le gusta al niño y le muestran contenido similar.

### Ejemplo
* Ve un video de Minecraft.
* Después aparecen más videos de Minecraft.
* Luego surgen retos, bromas o contenido cada vez más llamativo.

Así, el contenido se vuelve cada vez más atractivo y también más difícil de dejar.

## 4. Conexión emocional con creadores

Muchos niños desarrollan una relación emocional con los creadores de contenido.

Esto ocurre porque:
* Los sienten cercanos.
* Hablan como si fueran amigos.
* Los siguen con frecuencia y se acostumbran a su estilo.

En Twitch, además, el streamer puede responder mensajes, saludar usuarios e interactuar en tiempo real.

Eso puede generar en el niño la sensación de "me está hablando a mí", aunque se trate de una comunicación dirigida a muchas personas al mismo tiempo.

## 5. Interacción y participación

Especialmente en el contenido en vivo, los niños pueden:
* Comentar.
* Reaccionar en chats.
* Participar en dinámicas o actividades.

Esto transforma la experiencia de solo ver algo en sentir que se forma parte de algo.

## 6. Contenido diseñado para enganchar

Muchos videos están construidos para captar atención desde el primer momento:
* Títulos llamativos.
* Edición rápida.
* Sonidos, colores y cambios constantes.

Eso hace que el cerebro infantil:
* Se aburra menos.
* Busque más estímulos.
* Quiera seguir consumiendo contenido parecido.

## 7. Falta de límites naturales

Antes, la televisión tenía horarios, programación y un final más claro.

Hoy, el streaming:
* Está disponible a cualquier hora.
* No tiene pausas naturales.
* Se adapta al usuario para mantenerlo mirando.

Eso significa que el límite ya no lo pone la plataforma. En la mayoría de los casos, debe ponerlo el adulto.

## ¿Cuándo se convierte en un problema?

El atractivo del streaming se vuelve riesgoso cuando:
* El niño no quiere dejar de ver videos.
* Se irrita cuando se le quita el dispositivo.
* Descuidan tareas, sueño o convivencia.
* Solo encuentra diversión en las pantallas.

## ¿Qué pueden hacer los padres?

No se trata de eliminar el streaming, sino de entender por qué engancha para poder actuar mejor.

### Estrategias iniciales
* Establecer horarios claros.
* Evitar el uso antes de dormir.
* Ver contenido juntos de vez en cuando.
* Hablar sobre lo que ven y por qué les gusta.

## Clave importante

El problema no es solamente que el niño vea videos. El problema aparece cuando la plataforma termina decidiendo por él cuánto ver, qué ver y por qué seguir viendo.

## Conclusión

El éxito de plataformas como YouTube y Twitch no es casual. Combinan tecnología, psicología y entretenimiento para mantener la atención.

Por eso, muchos niños:
* Se sienten muy atraídos.
* Se involucran emocionalmente.
* Tienen dificultad para desconectarse.

Comprender esto permite a los padres:
* Anticipar problemas.
* Establecer límites adecuados.
* Acompañar de forma más inteligente.

## Idea clave del módulo

El streaming está diseñado para enganchar. Los niños no son débiles: están expuestos a un sistema altamente atractivo.`;

    const module2Article1Content = `# Tipos de contenido en YouTube y Twitch

YouTube y Twitch no muestran un solo tipo de contenido. Un niño puede pasar de ver un tutorial útil a un video de bromas pesadas o a una transmisión en vivo con chat abierto. Por eso, para los padres no basta con saber cuánto tiempo pasan frente a la pantalla: también es importante entender qué tipo de contenido consumen.

## Lo más importante

No todo el contenido entretiene de la misma forma ni tiene el mismo impacto. Algunos videos pueden enseñar, otros solo buscan mantener la atención, y otros pueden exponer al menor a conductas, lenguaje o dinámicas que no son adecuadas para su edad.

## Tipos de contenido más comunes

| Tipo de contenido | Qué es | Qué atrae a los niños | Riesgo principal |
| --- | --- | --- | --- |
| Gameplays | Videos o directos de videojuegos | Aprenden trucos, ven juegos que les gustan, siguen a creadores | Lenguaje agresivo, juegos no aptos, normalización de conductas tóxicas |
| Retos y bromas | Videos diseñados para sorprender, hacer reír o llamar la atención | Son rápidos, llamativos y fáciles de compartir | Conductas peligrosas, humillación, imitación |
| Reacciones | Creadores comentan o responden a otros videos | Resultan entretenidos y exagerados | Desinformación, burlas, exageración emocional |
| Vlogs | Videos sobre la vida, compras u opiniones de creadores | Generan cercanía y curiosidad | Comparación, influencia excesiva, consumismo |
| Tutoriales y educativos | Explicaciones, manualidades, ciencia, dibujo o aprendizaje | Son útiles y pueden despertar intereses positivos | No todo lo que parece educativo realmente lo es |
| Directos en vivo | Transmisiones en tiempo real, sobre todo en Twitch | Sensación de cercanía, participación y novedad | Chat con desconocidos, contenido sin filtro, presión por seguir viendo |

## 1. Gameplays y transmisiones de videojuegos

Es uno de los formatos más populares entre niños. En YouTube suelen ser videos grabados; en Twitch, transmisiones en vivo. A muchos menores les gusta porque sienten que aprenden, descubren juegos nuevos y forman parte de una comunidad.

El problema aparece cuando el contenido incluye insultos, burlas, frustración exagerada o juegos pensados para mayores. Aunque el niño no esté jugando, también está aprendiendo formas de hablar, reaccionar y relacionarse.

## 2. Retos, bromas y contenido exagerado

Este contenido busca captar atención muy rápido. Muchas veces funciona con gritos, sustos, bromas humillantes o situaciones extremas. El niño puede verlo como algo divertido sin notar que detrás hay agresión, ridiculización o riesgo físico.

Cuando este tipo de videos se consume con frecuencia, puede hacer que ciertas conductas parezcan normales o aceptables.

## 3. Reacciones y comentarios

Las reacciones muestran a una persona viendo otro video y opinando al mismo tiempo. Suelen ser dinámicas y entretenidas, pero no siempre aportan información real. En muchos casos, el creador exagera su respuesta para generar más vistas.

Eso puede enseñar al menor a reaccionar antes de pensar, burlarse antes de comprender o repetir opiniones sin analizarlas.

## 4. Vlogs y vida personal de creadores

Muchos niños siguen a creadores que muestran su rutina, compras, gustos o estilo de vida. Esto genera una sensación de cercanía y confianza. El menor empieza a sentir que conoce a esa persona y puede tomarla como referencia.

El riesgo no siempre está en algo claramente dañino. A veces aparece en la comparación constante, en el deseo de tener lo mismo o en la influencia que ese creador empieza a ejercer sobre decisiones y gustos.

## 5. Tutoriales y contenido educativo

También hay contenido valioso. Tutoriales, manualidades, experimentos, dibujo, música o explicaciones sencillas pueden ser positivos. Este tipo de videos puede ayudar a aprender y desarrollar intereses sanos.

La clave está en no asumir que todo contenido calmado o bien editado es automáticamente confiable. Conviene revisar quién lo crea, cómo lo explica y si realmente aporta algo.

## 6. Directos en vivo: la categoría que más cuidado requiere

El contenido en vivo merece atención especial. En una transmisión no solo importa lo que hace o dice el creador. También cuentan el chat, las reacciones en tiempo real, las bromas improvisadas y la posibilidad de contacto con desconocidos.

A diferencia de un video grabado, aquí no hay revisión previa. Por eso, los directos suelen requerir más supervisión que el contenido editado.

## Señal de alerta

Un contenido puede parecer infantil por su portada, colores o tema, y aun así incluir lenguaje agresivo, bromas pesadas, publicidad oculta o dinámicas poco sanas.

## Qué pueden hacer los padres

| Acción | Para qué sirve |
| --- | --- |
| Preguntar qué ve y quién lo crea | Ayuda a conocer su entorno digital |
| Revisar un video o canal de vez en cuando | Permite detectar riesgos antes de que se normalicen |
| Distinguir si el contenido enseña, entretiene o solo engancha | Mejora la supervisión |
| Poner más atención al contenido en vivo | Reduce exposición a interacciones sin filtro |
| Hablar sin regañar de entrada | Favorece que el menor cuente lo que realmente ve |

## Preguntas útiles para conversar en casa

1. ¿Qué tipo de videos te gustan más?
2. ¿Qué te gusta de ese creador?
3. ¿Ese video te enseñó algo o solo te entretuvo?
4. ¿Te gustaría verlo conmigo?
5. ¿Alguna vez has visto algo que te incomodó o te confundió?

## Idea clave

Supervisar bien no significa revisar todo el tiempo, sino entender qué tipo de contenido entra en la vida del niño y qué efecto puede tener en su forma de pensar, hablar y actuar.

## Cierre

YouTube y Twitch reúnen formatos muy distintos. Algunos pueden aportar aprendizaje y entretenimiento; otros solo buscan atrapar la atención o exponer al menor a dinámicas poco saludables. Cuando los padres identifican qué consume su hijo, les resulta mucho más fácil acompañarlo con criterio y poner límites que realmente funcionen.`;

    const module2Article2Content = `# Influencia del contenido en emociones, conducta y desarrollo

Lo que un niño ve en YouTube o Twitch no se queda solo en la pantalla. El contenido puede influir en cómo se siente, cómo habla, qué normaliza y qué lugar le da a otras actividades como dormir, jugar, convivir o estudiar. La evidencia actual muestra que los medios digitales pueden aportar aprendizaje y conexión, pero también pueden exponer a contenido violento, peligroso, inexacto o idealizado, y desplazar actividades esenciales para el bienestar.

## Lo más importante

No todo contenido afecta igual. Un tutorial, un directo con chat abierto y un video de bromas pesadas no tienen el mismo efecto. Por eso, para acompañar bien a un hijo, importa tanto qué ve como cómo lo ve, con qué frecuencia y en qué momento del día.

## Cómo puede influir el contenido

| Área | Qué puede pasar | Qué conviene observar |
| --- | --- | --- |
| Emociones | El contenido puede divertir, enseñar o acompañar, pero también generar ansiedad, miedo, enojo o comparación | Si el niño termina más tranquilo, más alterado o más sensible después de ver ciertos videos |
| Conducta | Puede imitar lenguaje, bromas, reacciones o formas de tratar a otros | Si repite insultos, desafíos, humillaciones o respuestas impulsivas |
| Autoimagen | Los contenidos idealizados pueden afectar autoestima o imagen corporal | Si se compara mucho con creadores o expresa descontento con su apariencia o vida |
| Rutina diaria | El uso excesivo puede desplazar sueño, juego, convivencia y otras actividades | Si le cuesta dejar el dispositivo o si descuida tareas y horarios |

La AAP advierte que el uso digital puede empujar fuera del día a día actividades importantes como el sueño y la convivencia, y también exponer a contenido violento, peligroso o idealizado.

## 1. El contenido puede influir en el estado de ánimo

No toda experiencia digital es negativa. La Academia Americana de Pediatría reconoce que los entornos digitales también pueden favorecer conexión social y aprendizaje. Pero el impacto depende mucho del tipo de uso. Cuando el contenido es excesivo, agresivo o emocionalmente intenso, puede dejar al niño más irritable, más ansioso o más alterado.

## 2. Los niños aprenden también por imitación

Cuando un menor ve con frecuencia a creadores que gritan, humillan, reaccionan con agresividad o se burlan para entretener, puede empezar a ver esas conductas como normales. La AAP recuerda que los mensajes mediáticos no solo entretienen: también influyen en el comportamiento.

## 3. La comparación también cuenta

Muchos contenidos muestran vidas editadas, cuerpos idealizados, éxito constante o compras como parte de la normalidad. HealthyChildren advierte que estas imágenes idealizadas pueden afectar la autoestima y la imagen corporal en algunos jóvenes. Aunque el efecto no es igual en todos, sí es una señal a vigilar cuando el niño empieza a compararse demasiado o a sentir que su vida no alcanza.

## 4. El problema no es solo el contenido, sino lo que desplaza

El contenido puede parecer inofensivo, pero aun así convertirse en un problema si ocupa el lugar del sueño, el juego libre, la actividad física o la convivencia familiar. La AAP señala que diseños como autoplay, desplazamiento infinito y anuncios dirigidos están hechos para mantener la atención y pueden desplazar sueño, juego y tiempo en familia.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Se irrita cuando deja de ver videos | Dificultad para regular el uso |
| Repite frases, bromas o insultos de creadores | Imitación de modelos poco saludables |
| Se compara mucho con influencers o streamers | Impacto en autoestima o expectativas |
| Pierde sueño o cambia su rutina | El consumo está desplazando necesidades básicas |
| Ya no quiere otras actividades | Uso excesivo o demasiado absorbente |

El Cirujano General de Estados Unidos advirtió que los niños y adolescentes expuestos a ciertos tipos de contenido y uso intensivo pueden enfrentar riesgos reales para su salud mental. Además, señaló que hoy no puede concluirse que estas plataformas sean suficientemente seguras para menores.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Ver ocasionalmente el contenido con el hijo | Permite entender qué siente, qué aprende y qué normaliza |
| Preguntar cómo se sintió después de ver algo | Ayuda a detectar impacto emocional |
| Priorizar calidad sobre cantidad | Mejora la supervisión sin convertirla en vigilancia constante |
| Crear horarios y zonas sin pantallas | Protege sueño, convivencia y descanso |
| Hablar de lo que es real, editado o exagerado | Fortalece pensamiento crítico |

La AAP recomienda construir hábitos digitales sanos con reglas familiares, horarios sin pantallas, conversación abierta y elección de contenido de calidad. UNICEF también insiste en crear un entorno digital saludable en casa y apoyar al menor cuando tenga una experiencia negativa en línea.

## Preguntas útiles para conversar en casa

1. ¿Ese video te dejó tranquilo o te puso nervioso?
2. ¿Qué fue lo que más te gustó de ese creador?
3. ¿Crees que eso que viste es real o está exagerado?
4. ¿Has visto algo que te incomodó?
5. ¿Te gustaría que viéramos juntos ese canal?

Ver contenido junto al hijo puede abrir conversaciones que de otro modo no surgirían. HealthyChildren señala que el co-viewing ayuda a conectar y a hablar de temas que quizás el adulto no habría sabido cómo introducir.

## Idea clave

El contenido no solo entretiene: también enseña, modela y desplaza. Por eso, una buena supervisión no se limita a contar minutos, sino a observar qué efecto tiene lo que el niño ve en su ánimo, conducta y rutina.

## Cierre

En plataformas como YouTube y Twitch, el impacto no depende únicamente de la pantalla, sino del tipo de contenido, de la intensidad con que se consume y del acompañamiento adulto. Cuando los padres observan señales, conversan sin juzgar y ponen límites claros, pueden reducir riesgos y aprovechar mejor lo positivo del entorno digital.`;

    const module3Article1Content = `# Exposición a contenido inapropiado y algoritmos sin control

Uno de los principales riesgos de YouTube y Twitch es que un niño puede llegar a contenido no adecuado para su edad sin buscarlo directamente. A veces ocurre por recomendaciones automáticas; otras, porque el contenido en vivo cambia muy rápido y no siempre puede filtrarse antes. UNICEF distingue este problema como un daño por contenido: cuando el menor recibe material sexual, violento o dañino como espectador.

## Lo más importante

El riesgo no siempre empieza con una búsqueda peligrosa. Muchas veces comienza con un video aparentemente normal y sigue con sugerencias cada vez más llamativas, más intensas o menos apropiadas para la edad del niño. La AAP advierte que funciones como algoritmos, desplazamiento infinito y recompensas digitales están diseñadas para mantener a los menores conectados por más tiempo.

## Cómo aparece este riesgo

| Situación | Qué puede pasar | Por qué importa |
| --- | --- | --- |
| Recomendaciones automáticas | El sistema muestra contenido parecido o más llamativo | El menor puede terminar viendo videos que no buscó |
| Autoplay activado | Un video comienza tras otro sin pausa | Reduce el control del niño y del adulto sobre lo que sigue |
| Contenido en vivo | Lo que ocurre no siempre puede revisarse antes | Puede aparecer lenguaje, bromas o temas no aptos en tiempo real |
| Plataformas más abiertas | Hay más variedad de contenido, pero también más margen de error | Aumenta la posibilidad de exposición accidental |

YouTube explica que las experiencias supervisadas ofrecen acceso a una gran cantidad de videos y que sus sistemas trabajan para evitar contenido inapropiado, pero pueden cometer errores. También indica que YouTube Kids ofrece una experiencia más limitada y simple para menores.

## 1. Qué entendemos por contenido inapropiado

No solo se trata de contenido sexual. También puede incluir violencia, lenguaje ofensivo, retos peligrosos, bromas humillantes, temas adultos, desinformación o mensajes que un niño aún no tiene madurez para procesar. UNICEF advierte que la exposición a contenido dañino puede afectar la seguridad y el bienestar de niños y adolescentes.

## 2. El algoritmo no cuida: recomienda

El algoritmo busca mantener la atención del usuario. No piensa como un padre ni entiende el contexto emocional del niño. La AAP recomienda, especialmente en edades tempranas, desactivar autoplay para que el algoritmo no decida automáticamente qué verá después el menor. También señala que muchos entornos digitales están diseñados para captar atención con contenido corto, recompensas y desplazamiento continuo.

## 3. YouTube puede ser más seguro, pero no infalible

YouTube ofrece herramientas como YouTube Kids y cuentas supervisadas, pero la propia plataforma aclara que ningún sistema es perfecto. Incluso en entornos pensados para menores pueden aparecer videos inadecuados que no fueron detectados a tiempo. Por eso, las herramientas ayudan, pero no sustituyen la supervisión adulta.

## 4. Twitch requiere atención especial

Twitch está centrado en transmisiones en vivo, lo que reduce la posibilidad de revisar todo antes de que aparezca. Twitch indica que los menores de 13 años no pueden usar la plataforma y que los streamers deben aplicar etiquetas de clasificación cuando hay temas maduros. Aun así, el formato en vivo exige más supervisión porque el contenido puede cambiar en segundos.

## Señal de alerta

Que un video tenga colores llamativos, personajes conocidos o una temática popular entre niños no significa que sea adecuado. La portada puede parecer infantil y aun así conducir a lenguaje agresivo, humor humillante, sustos intensos o recomendaciones problemáticas. YouTube reconoce que algunos videos pueden ser inadecuados incluso dentro de experiencias supervisadas.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Desactivar autoplay | Evita que el algoritmo elija automáticamente el siguiente video |
| Preferir entornos más limitados para niños pequeños | Reduce el volumen de contenido y los errores de exposición |
| Revisar historial y recomendaciones | Permite detectar patrones antes de que se repitan |
| Evitar que el menor navegue solo por contenido en vivo | Disminuye el riesgo de exposición sin filtro |
| Hablar sobre qué hacer si aparece algo incómodo | Le da al niño una respuesta clara y práctica |

Estas medidas coinciden con las recomendaciones de la AAP sobre calidad del contenido y control del autoplay, y con el enfoque de YouTube de usar herramientas parentales y experiencias más limitadas cuando el menor aún no está listo para la plataforma principal.

## Preguntas útiles para conversar en casa

1. ¿Alguna vez te apareció un video que no querías ver?
2. ¿Qué haces si algo te asusta o te incomoda?
3. ¿Sabes cómo detener un video o salir de una transmisión?
4. ¿Te gustaría que revisáramos juntos qué te recomienda la plataforma?

La conversación abierta y frecuente sigue siendo una de las medidas más importantes. La AAP insiste en que la supervisión útil no se basa solo en bloquear, sino también en hablar sobre lo que el menor ve y cómo le afecta.

## Idea clave

El problema no es solo que exista contenido inapropiado, sino que los sistemas de recomendación y el contenido en vivo pueden acercar a los niños a ese material con muy poca fricción. Las herramientas parentales ayudan, pero no reemplazan la supervisión y la conversación.

## Cierre

En YouTube y Twitch, el riesgo de exposición no siempre viene de una decisión consciente del menor. A veces aparece porque la plataforma recomienda, reproduce o muestra contenido demasiado rápido. Cuando los padres entienden cómo funciona ese recorrido, pueden intervenir mejor: limitar, acompañar y enseñar al niño a detenerse cuando algo no es apropiado.`;

    const module3Article2Content = `# Interacción con desconocidos y riesgos en transmisiones en vivo

Las transmisiones en vivo tienen un rasgo que las hace especialmente delicadas para niños y preadolescentes: no solo se mira contenido, también puede haber chat, comentarios, mensajes y sensación de cercanía con personas desconocidas. En ese entorno, el riesgo no siempre aparece como algo claramente peligroso desde el inicio; a veces empieza con una conversación aparentemente inocente. UNICEF recomienda mantener una comunicación abierta sobre con quién interactúan los menores y recordarles que el contacto ofensivo, discriminatorio o inapropiado nunca es aceptable.

## Lo más importante

El problema no es solo hablar con extraños. El verdadero riesgo aparece cuando un niño no distingue bien las intenciones de otra persona, se siente presionado a seguir interactuando o guarda en secreto lo que ocurre en una transmisión, chat o mensaje. NCMEC explica que la captación sexual en línea puede incluir conversaciones sexuales, grooming, sextorsión o intentos de llevar el contacto a algo más grave.

## Dónde puede aparecer el riesgo

| Situación | Qué puede pasar | Por qué importa |
| --- | --- | --- |
| Chat en vivo | El menor lee o responde mensajes de desconocidos | Puede normalizar contacto directo con personas que no conoce |
| Comentarios y comunidad | Aparecen bromas, presión social o lenguaje agresivo | El niño puede buscar aprobación o sentirse obligado a seguir participando |
| Relación con creadores | El streamer parece cercano o de confianza | El menor puede bajar su nivel de alerta |
| Mensajes fuera de la plataforma | La interacción puede moverse a espacios menos supervisados | Aumenta el riesgo de secreto, manipulación o grooming |

Esta síntesis recoge riesgos descritos por UNICEF, NCMEC y las propias plataformas, que distinguen entre contenido visto y contacto o interacción con otras personas en línea.

## 1. En un directo, todo pasa más rápido

A diferencia de un video grabado, en una transmisión en vivo no siempre hay revisión previa. Twitch está centrado en transmisiones en vivo, y su guía para familias recuerda que los menores de 13 años no pueden usar la plataforma; quienes tienen 13 años o más pero aún son menores de edad solo pueden usarla bajo la supervisión de un padre o tutor. En YouTube, los entornos supervisados para preadolescentes ofrecen opciones de contenido más limitadas; por ejemplo, la configuración Explorar no incluye transmisiones en vivo, salvo algunos estrenos programados.

## 2. La cercanía digital puede confundir

Un streamer puede saludar, responder nombres de usuario o leer mensajes en tiempo real. Para un adulto eso puede parecer una interacción superficial, pero para un niño puede sentirse como una relación cercana. Ese sentimiento de confianza puede hacer más difícil identificar límites, intenciones inadecuadas o intentos de manipulación. UNICEF insiste en que los niños necesitan reglas claras sobre cómo, cuándo y con quién interactúan en línea.

## 3. El grooming no siempre parece una amenaza al principio

NCMEC explica que la captación sexual en línea abarca conductas como el grooming y la sextorsión. En la práctica, esto puede empezar con mensajes amables, halagos, promesas, regalos simbólicos o peticiones pequeñas que luego escalan. El peligro está en que el menor no siempre reconoce el cambio a tiempo, especialmente si siente que por fin alguien lo entiende o le presta atención.

## 4. El secreto es una señal importante

UNICEF recomienda estar atentos si un hijo se muestra molesto, alterado o reservado con sus actividades en línea. El secretismo no prueba por sí solo que exista un riesgo grave, pero sí es una señal para acercarse, preguntar y acompañar. En temas de seguridad digital, muchas veces el cambio de comportamiento aparece antes que la explicación verbal.

## Señal de alerta

No siempre habrá un mensaje claramente ofensivo. A veces la señal es otra: el niño cierra rápido la pantalla, evita contar con quién habla, insiste en estar solo durante los directos o cambia de humor después de conectarse. UNICEF recomienda prestar atención cuando los menores se muestran alterados o secretivos con su actividad digital.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Hablar de forma regular sobre con quién interactúan | Reduce el secreto y facilita pedir ayuda |
| Explicar que no deben pasar datos personales | Disminuye riesgo de contacto y manipulación |
| Evitar que niños pequeños usen plataformas de transmisiones en vivo solos | Reduce exposición a interacción sin filtro |
| Preferir experiencias supervisadas o más limitadas | Da más control sobre comentarios, directos y contenido |
| Acordar una regla clara: si algo incomoda, se sale y se avisa | Le da al menor una respuesta práctica y fácil de recordar |

Estas medidas están alineadas con UNICEF, que recomienda comunicación abierta, reglas familiares y uso de herramientas de protección, y con YouTube y Twitch, que ofrecen experiencias supervisadas o restricciones de edad para reducir riesgos.

## Preguntas útiles para conversar en casa

1. ¿Alguna vez alguien te escribió en un chat y te incomodó?
2. ¿Qué harías si una persona te pide hablar por otro medio?
3. ¿Sabes qué datos no debes compartir nunca?
4. ¿Te sentirías cómodo contándome si alguien te hace sentir raro o presionado?
5. ¿Quieres que revisemos juntos cómo dejar de seguir un chat o salir de un directo?

UNICEF recomienda precisamente abrir este tipo de conversación y reforzar que el menor puede acudir a un adulto de confianza si algo le parece raro, agresivo o inapropiado.

## Idea clave

En los directos, el riesgo no siempre está solo en lo que se ve, sino en con quién se interactúa y cómo evoluciona esa interacción. La mejor protección combina herramientas, supervisión y una conversación en la que el niño sepa que puede pedir ayuda sin miedo.

## Cierre

Las transmisiones en vivo pueden resultar muy atractivas porque generan cercanía, comunidad e inmediatez. Justamente por eso necesitan más acompañamiento. Cuando los padres entienden que el riesgo puede empezar con una simple conversación y no con una amenaza evidente, les resulta más fácil intervenir a tiempo y enseñar a sus hijos a reconocer límites seguros.`;

    const module4Article1Content = `# Donaciones, suscripciones y gastos dentro de YouTube y Twitch

En YouTube y Twitch, ver contenido no siempre es solo mirar. Muchas funciones están diseñadas para que la audiencia también pueda pagar para destacar, apoyar o participar. Para un adulto esto puede parecer una decisión simple; para un niño, en cambio, ese gasto puede sentirse como parte del juego, del chat o de la relación con su creador favorito. Las plataformas convierten esa cercanía en opciones de pago muy visibles durante videos y transmisiones.

## Lo más importante

El riesgo no siempre está en una gran compra. A veces empieza con una acción pequeña: pagar para que un mensaje resalte, mandar una animación, regalar una suscripción o usar moneda digital dentro del chat. Como ese gasto no se siente igual que entregar efectivo, puede pasar desapercibido más fácilmente, sobre todo si ya hay una tarjeta vinculada al dispositivo o a la cuenta. La FTC recomienda activar restricciones de compra, exigir contraseña o aprobación, y revisar métodos de pago vinculados para limitar cargos no deseados.

## Formas comunes de gasto

| Función | Plataforma | Cómo funciona | Riesgo para familias |
| --- | --- | --- | --- |
| Super Chat / Super Stickers | YouTube | El espectador paga para resaltar un mensaje o enviar una imagen animada en el chat en vivo | El menor puede pagar para llamar la atención del creador |
| Membresías del canal | YouTube | Pago mensual recurrente a cambio de beneficios o contenido especial | Puede convertirse en un gasto repetido |
| Suscripciones | Twitch | Pago para apoyar a un canal y obtener beneficios dentro de la comunidad | El menor puede sentir presión por pertenecer |
| Gift subs | Twitch | Un usuario paga suscripciones para otras personas o para un grupo del chat | Incentiva gasto impulsivo durante un directo |
| Bits / Cheers | Twitch | Moneda digital de Twitch usada en mensajes del chat | El dinero se vuelve menos tangible y más fácil de gastar |

Estos mecanismos están descritos por las propias plataformas: YouTube explica que Super Chat y Super Stickers permiten pagar para destacar mensajes o animaciones en chats en vivo, y que las membresías son pagos mensuales por beneficios; Twitch describe Bits como contenido digital que se compra en Twitch y usa en Cheers, y las gift subs como suscripciones que pueden regalarse a usuarios o grupos en el chat.

## 1. Pagar para ser visto

En YouTube, el Super Chat y los Super Stickers permiten que un mensaje destaque dentro del chat de una transmisión o estreno; en Twitch, los Bits cumplen una lógica parecida al convertir apoyo económico en visibilidad dentro del chat. Esto puede resultar especialmente atractivo para niños y preadolescentes, porque transforma el dinero en una forma de conseguir atención inmediata del creador o de la comunidad.

## 2. Los pagos recurrentes son fáciles de olvidar

No todo gasto ocurre una sola vez. YouTube indica que las membresías del canal implican pagos mensuales recurrentes a cambio de beneficios; Twitch funciona de forma similar con suscripciones al canal. Cuando el menor solo percibe beneficios, emblemas o acceso especial, puede no dimensionar que se trata de un gasto que se repite.

## 3. La moneda digital hace menos visible el gasto

Los Bits en Twitch son una forma de moneda digital comprada dentro de la plataforma. Este tipo de diseño puede volver el gasto menos evidente, porque el usuario ya no ve directamente dinero, sino iconos, cantidades o recompensas dentro del chat. La FTC advierte, en términos generales, que cuando hay una tarjeta vinculada y compras digitales disponibles, conviene activar restricciones o límites para evitar cargos no deseados.

## 4. El problema aumenta cuando el pago está a un clic

Google permite a los padres exigir aprobación para compras hechas mediante el sistema de facturación de Google Play, incluyendo la opción de aprobar todo, solo contenido pagado o solo compras dentro de aplicaciones. También ofrece controles parentales en Google Play para filtrar o restringir acceso. Si estas opciones no están configuradas, una compra puede resultar mucho más fácil de completar desde el dispositivo.

## Señal de alerta

Conviene prestar atención si el menor empieza a hablar de apoyar a un streamer, mandar un mensaje para que lo lean, comprar Bits, regalar subs o hacerse miembro sin comprender bien que eso implica dinero real. Las plataformas presentan estas funciones como apoyo, beneficios o participación, lo que puede hacer que el gasto se sienta pequeño o normalizado.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Revisar si hay una tarjeta vinculada al dispositivo o cuenta | Reduce compras impulsivas |
| Activar aprobación de compras en Google Play o Family Link | Añade una barrera antes del pago |
| Explicar que Bits, membresías y subs cuestan dinero real | Hace visible el valor económico |
| Evitar que niños pequeños usen directos con pagos activos sin supervisión | Reduce presión del momento |
| Revisar recibos o movimientos periódicamente | Permite detectar cargos no deseados |

Estas medidas coinciden con la orientación de Google sobre aprobación de compras y controles parentales, y con la recomendación de la FTC de restringir o bloquear compras digitales cuando hay un método de pago vinculado. YouTube también ofrece un proceso para reportar cargos no autorizados en compras digitales dentro de un plazo determinado.

## Preguntas útiles para conversar en casa

1. ¿Sabes qué cosas cuestan dinero dentro de un directo?
2. ¿Qué significa hacerte miembro o mandar Bits?
3. ¿Crees que pagar hace que un creador sea más tu amigo?
4. ¿Qué harías si una plataforma te pide pagar para participar más?
5. ¿Te gustaría que revisáramos juntos qué opciones de compra están activas?

Estas preguntas ayudan a que el menor relacione las funciones de la plataforma con dinero real y no solo con premios, beneficios o apoyo. Las propias plataformas muestran que estas herramientas están integradas al chat, la membresía y la interacción con creadores.

## Idea clave

En streaming, el gasto no siempre parece una compra tradicional. Muchas veces se presenta como apoyo, participación o cercanía con el creador. Por eso, la mejor protección no es solo bloquear pagos, sino enseñar que detrás de cada Bit, Super Chat o suscripción hay dinero real.

## Cierre

YouTube y Twitch convierten la atención y la comunidad en oportunidades de pago. Cuando un padre entiende cómo funcionan estas opciones, le resulta más fácil detectar riesgos, configurar controles y enseñar a su hijo a diferenciar entre entretenerse y gastar. Esa diferencia es clave para evitar compras impulsivas y formar hábitos digitales más sanos.`;

    const module4Article2Content = `# Publicidad engañosa, influencers y contenido patrocinado

En YouTube y Twitch, la publicidad no siempre aparece como un anuncio tradicional. Muchas veces llega integrada al contenido: un creador recomienda un producto, lo usa en cámara, lo etiqueta en el video o lo menciona durante un directo. Cuando esa promoción se mezcla con entretenimiento, cercanía y confianza, a un niño le puede costar mucho identificar que también le están vendiendo algo.

## Lo más importante

El riesgo no está solo en que haya publicidad, sino en que a veces parece una opinión personal, una recomendación amistosa o parte natural del video. La FTC señala que las conexiones materiales entre una marca y un influencer deben divulgarse de forma clara, porque si no, el contenido puede resultar engañoso.

## Formas en que aparece la publicidad

La publicidad en streaming puede tomar varias formas. YouTube permite a creadores incluir promociones pagadas y etiquetar productos en videos, Shorts y transmisiones en vivo; además, cuando el creador declara una promoción pagada, la plataforma muestra un aviso al inicio del contenido. Twitch, por su parte, considera como contenido de marca elementos como colocación de producto, respaldos, gameplay patrocinado, unboxings pagados y patrocinios de canal, y exige usar su herramienta de divulgación.

| Forma de publicidad | Cómo se ve | Riesgo para niños |
| --- | --- | --- |
| Recomendación de un influencer | El creador habla bien de un producto o servicio | Puede parecer una opinión totalmente espontánea |
| Promoción pagada | El video o directo incluye un acuerdo comercial | El menor puede no notar o no entender el aviso |
| Productos etiquetados | Se pueden tocar o abrir enlaces para comprar mientras se ve el contenido | Facilita pasar del entretenimiento a la compra |
| Gameplay o unboxing patrocinado | El creador usa o abre un producto como parte del show | Puede presentar consumo como algo emocionante y normal |
| Afiliados o enlaces de compra | El creador gana dinero si la audiencia compra | El incentivo económico no siempre es evidente para el niño |

## 1. Un influencer puede sentirse más cercano que un anuncio

La fuerza de este tipo de publicidad está en la confianza. Un niño puede sentir que conoce al creador, que comparte sus gustos o que le recomienda algo porque sí. Pero si hay un pago, regalo, patrocinio o beneficio económico, la FTC considera que esa relación debe explicarse claramente para no engañar al público.

## 2. Aunque exista un aviso, un niño puede no comprenderlo

YouTube muestra una divulgación cuando el creador declara una promoción pagada. Sin embargo, que exista un aviso no significa que un niño lo vea, lo lea o entienda qué implica. La FTC ha señalado precisamente que la publicidad digital puede desdibujar la línea entre anuncio y entretenimiento, y que eso afecta especialmente a niños y adolescentes.

## 3. Comprar mientras se mira reduce la distancia entre ver y gastar

YouTube Shopping permite a creadores elegibles etiquetar productos de su propia tienda o de otras marcas en videos, Shorts y directos, de modo que la audiencia pueda revisar o comprar productos mientras consume el contenido. Esto hace que la transición entre ver y comprar sea mucho más rápida, algo especialmente delicado para menores que todavía no distinguen bien entre deseo, recomendación y publicidad.

## 4. En Twitch, la promoción puede mezclarse con la comunidad

Twitch reconoce como contenido de marca prácticas como gameplay patrocinado, unboxings pagados, colocación de producto y patrocinios de canal. Como todo eso puede ocurrir dentro de un directo, la promoción se vive al mismo tiempo que el chat, la emoción del momento y la cercanía con el streamer. Eso puede hacer que el mensaje comercial parezca más natural y menos identificable para un niño.

## Señal de alerta

Conviene prestar atención si el menor empieza a repetir marcas, pedir productos porque los usa su streamer favorito, hablar de códigos, enlaces, productos etiquetados o promociones como si fueran parte normal del entretenimiento. La FTC ha advertido que el marketing dirigido a niños en entornos digitales puede ser manipulador cuando mezcla contenido y publicidad de formas difíciles de distinguir.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Explicar que no toda recomendación es espontánea | Ayuda a diferenciar opinión de publicidad |
| Preguntar si el creador gana algo por mostrar ese producto | Desarrolla pensamiento crítico |
| Revisar si el video tiene promoción pagada o productos etiquetados | Hace visible la intención comercial |
| Hablar sobre enlaces, códigos y compras durante videos o directos | Reduce decisiones impulsivas |
| Reforzar que gustar no obliga a comprar | Disminuye presión por imitación |

Estas medidas encajan con el enfoque de la FTC: cuando hay una relación comercial, debe quedar clara, y el público debe poder entenderla. En el caso de los niños, además, la conversación familiar ayuda a traducir algo que una simple etiqueta en pantalla no siempre logra explicar.

## Preguntas útiles para conversar en casa

1. ¿Crees que ese creador realmente usa ese producto o se lo pagaron?
2. ¿Viste algún aviso que dijera que era promoción?
3. ¿Te dieron ganas de comprar algo después de ver ese video?
4. ¿Qué diferencia hay entre recomendar algo y anunciarlo?
5. ¿Te gustaría que revisáramos juntos cómo saber si un contenido está patrocinado?

Estas preguntas ayudan a que el menor no reciba la publicidad de forma pasiva. La FTC insiste en que las divulgaciones deben ser claras precisamente porque la audiencia necesita entender cuándo hay una relación con una marca.

## Idea clave

En streaming, la publicidad más efectiva no siempre parece publicidad. Por eso, más que prohibir todo contenido patrocinado, conviene enseñar a los hijos a reconocer cuándo una marca está presente, qué gana el creador y por qué eso puede influir en lo que dice.

## Cierre

YouTube y Twitch convierten la promoción comercial en parte del entretenimiento, y eso puede ser difícil de detectar para un niño. Cuando los padres aprenden a identificar promociones pagadas, productos etiquetados y mensajes de influencers con interés económico, pueden acompañar mejor a sus hijos y ayudarles a consumir contenido con más criterio.`;

    const module5Article1Content = `# Cómo el streaming puede generar adicción y dependencia

Ver videos o directos no es lo mismo que desarrollar una adicción clínica, pero sí puede volverse un uso problemático: una rutina difícil de interrumpir, que genera irritabilidad al detenerse y que empieza a ocupar el lugar de otras actividades importantes. En plataformas como YouTube y Twitch, esto puede verse favorecido por funciones pensadas para mantener a la persona conectada durante más tiempo.

## Lo más importante

El problema no siempre es cuántas horas ve, sino si el contenido y el diseño de la plataforma están desplazando sueño, ejercicio, juego, escuela o convivencia familiar. La AAP recomienda mirar la calidad del contenido, el contexto y la conversación familiar, no solo contar minutos.

## Por qué cuesta tanto dejar de ver

| Factor | Qué hace | Qué puede provocar |
| --- | --- | --- |
| Autoplay | Reproduce otro video sin que el niño lo elija | Reduce pausas naturales |
| Scroll o recomendaciones infinitas | Siempre ofrece algo nuevo | Hace difícil terminar |
| Alertas y actividad nocturna | Invita a volver a entrar | Retrasa la hora de dormir |
| Contenido corto o muy estimulante | Da recompensa rápida | Favorece consumo impulsivo |

La AAP explica que funciones como autoplay, desplazamiento infinito y alertas tardías están diseñadas para sostener la atención y pueden empujar la hora de dormir más tarde o dificultar que los niños se desconecten.

## 1. El streaming ofrece recompensas rápidas

Cuando un niño termina un video y de inmediato aparece otro que también le interesa, la plataforma elimina el momento de pausa en el que podría decidir parar. Ese diseño facilita que pase de voy a ver un momento a una sesión mucho más larga de lo planeado.

## 2. La noche es un momento especialmente delicado

HealthyChildren advierte que el uso de pantallas antes de dormir puede dificultar que los niños se relajen y retrasar el sueño, especialmente cuando hay autoplay, desplazamiento infinito o alertas nocturnas. También recomienda mantener los dispositivos fuera del dormitorio y apagarlos entre 30 y 60 minutos antes de dormir.

## 3. El uso problemático tiene señales visibles

La guía de HealthyChildren sobre límites saludables y uso problemático de medios menciona varias señales de alerta: irritabilidad cuando no hay acceso a pantallas, interferencia con el sueño o el ejercicio, afectación de la participación familiar o escolar, y que el uso digital se convierta en la única actividad que el niño disfruta o de la que habla.

## Señales de alerta

| Señal | Qué conviene observar |
| --- | --- |
| Se enoja mucho al dejar el dispositivo | Puede haber dificultad para autorregularse |
| Pierde sueño por ver videos o directos | El consumo está desplazando descanso |
| Solo quiere hablar de streamers o canales | El contenido está ocupando demasiado espacio en su día |
| Se aleja de juegos, ejercicio o convivencia | Hay desequilibrio en su rutina |
| Le cuesta dejar de ver solo uno más | La plataforma está marcando el ritmo |

Estas señales no significan automáticamente una adicción, pero sí merecen atención y conversación temprana.

## 4. El impacto también depende de lo que desplaza

Cuando el streaming reduce horas de sueño, actividad física o convivencia, el problema ya no está solo en la pantalla, sino en el equilibrio general del día. La AAP insiste en que los hábitos digitales deben proteger actividades clave para el desarrollo y el bienestar.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Desactivar autoplay | Devuelve pausas y decisiones al usuario |
| Evitar pantallas antes de dormir | Protege el sueño |
| Mantener dispositivos fuera del cuarto | Reduce consumo nocturno |
| Crear horarios claros para ver contenido | Da estructura y previsibilidad |
| Observar cambios de humor y rutina | Permite actuar antes de que el problema crezca |

Estas recomendaciones coinciden con la AAP y HealthyChildren, que sugieren planes familiares de medios, reglas claras, ejemplo adulto y horarios sin pantallas, especialmente en la noche. UNICEF también recomienda establecer reglas claras y pasar tiempo con los hijos en su entorno digital para modelar hábitos sanos.

## Preguntas útiles para conversar en casa

1. ¿Te cuesta dejar de ver videos cuando ya ibas a parar?
2. ¿Qué sientes cuando te pido apagar la pantalla?
3. ¿Te has dormido más tarde por seguir viendo contenido?
4. ¿Qué otra actividad te gusta además de ver videos o directos?
5. ¿Te gustaría que juntos armáramos un horario para usar estas plataformas?

Hacer preguntas abiertas ayuda más que empezar con regaños, porque permite entender si el contenido está funcionando como entretenimiento, hábito o forma de escapar del aburrimiento o del malestar. UNICEF sugiere observar si hay algo más detrás del uso excesivo y construir reglas familiares claras.

## Idea clave

El streaming puede volverse difícil de soltar no solo por gusto, sino porque muchas plataformas están diseñadas para mantener la atención. La mejor prevención no es prohibir de golpe, sino crear límites consistentes antes de que el uso empiece a afectar sueño, ánimo y rutina.

## Cierre

Cuando un padre detecta a tiempo irritabilidad, desvelo o pérdida de interés por otras actividades, puede intervenir antes de que el consumo se vuelva más difícil de manejar. Entender cómo la plataforma atrapa la atención ayuda a poner límites más realistas y a acompañar al hijo sin convertir cada apagado de pantalla en una pelea.`;

    const module5Article2Content = `# Estrategias para establecer límites sin conflicto

Poner límites no tiene que convertirse en una pelea diaria. Cuando las reglas son claras, consistentes y se explican con calma, los niños entienden mejor qué se espera de ellos. La AAP recomienda que las familias construyan acuerdos concretos sobre el uso de pantallas, en lugar de depender solo de regaños o decisiones improvisadas.

## Lo más importante

El objetivo no es ganarle al niño ni quitarle todo de golpe. Lo que mejor funciona es crear una rutina predecible, con reglas sencillas y realistas, donde el adulto también dé ejemplo. UNICEF señala que los límites funcionan mejor cuando tienen sentido para la familia y combinan reglas sobre tiempo, contenido y comportamiento en línea.

## Qué suele reducir el conflicto

| Estrategia | Cómo ayuda |
| --- | --- |
| Reglas claras y anticipadas | Evita discusiones improvisadas |
| Horarios fijos | Hace que el límite se sienta predecible |
| Zonas sin pantallas | Protege momentos importantes como comida, tarea y sueño |
| Apagar autoplay y notificaciones | Reduce la presión de seguir viendo |
| Acompañar en lugar de solo prohibir | Favorece cooperación y confianza |

Estas acciones están alineadas con el plan familiar de medios de HealthyChildren, que recomienda crear zonas sin pantallas, limitar distracciones con la regla de una pantalla a la vez y desactivar funciones que alargan el uso.

## 1. Avisar antes funciona mejor que interrumpir de golpe

Muchos conflictos aparecen cuando el niño siente que el límite llegó de repente. Una estrategia útil es avisar con anticipación: primero recordar cuánto tiempo queda y luego acompañar el cierre de la actividad. HealthyChildren recomienda planear el uso digital y no esperar a que el problema aparezca para poner una regla.

## 2. Es mejor crear rutinas que castigos constantes

Los límites suelen funcionar mejor cuando forman parte del día: por ejemplo, después de la tarea, nunca durante la comida y fuera del cuarto antes de dormir. La AAP sugiere establecer momentos y lugares sin pantallas, especialmente durante la cena, la tarea y antes de acostarse, porque eso fortalece la convivencia y protege el sueño.

## 3. El adulto también tiene que dar ejemplo

Es difícil pedir autocontrol si los adultos usan el teléfono en la mesa, durante conversaciones o antes de dormir. UNICEF recomienda modelar hábitos digitales saludables, porque los niños aprenden observando tanto como escuchando reglas.

## 4. No todo debe ser no: también ayudan las reglas de sí

UNICEF propone combinar reglas de no con reglas de sí. No solo se trata de prohibir ciertas conductas, sino también de enseñar qué sí se espera: avisar si algo incomoda, apagar la pantalla a una hora acordada o elegir contenido adecuado. Este enfoque reduce el tono de castigo y hace la norma más comprensible.

## Señales de que el límite está mal planteado

| Señal | Qué puede significar |
| --- | --- |
| La regla cambia todos los días | El niño no sabe qué esperar |
| Solo se pone límite cuando hay enojo | El uso digital se maneja desde el conflicto |
| El adulto rompe la misma regla | La norma pierde fuerza |
| No hay alternativas fuera de pantalla | Apagar se siente como quitar todo |

HealthyChildren explica que recortar pantallas sin plan no siempre resuelve los berrinches; por eso recomienda un enfoque más estructurado, con hábitos familiares claros.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Crear un plan familiar de pantallas | Da estructura y reduce improvisación |
| Definir zonas y momentos sin dispositivos | Protege sueño, tarea y convivencia |
| Avisar antes del final del tiempo | Reduce frustración |
| Ofrecer otra actividad al terminar | Facilita la transición |
| Mantener la regla con calma y consistencia | Da seguridad y baja la negociación constante |

Estas medidas coinciden con las recomendaciones de HealthyChildren y UNICEF sobre planes familiares, rutinas previsibles, espacios sin pantallas y acompañamiento activo.

## Preguntas útiles para conversar en casa

1. ¿Qué horario te parece justo para ver videos o directos?
2. ¿En qué momentos crees que no deberían usarse pantallas?
3. ¿Qué te ayudaría a apagar sin enojarte tanto?
4. ¿Qué otra actividad te gustaría hacer cuando termine el tiempo?
5. ¿Qué regla crees que también deberíamos cumplir los adultos?

HealthyChildren recomienda hablar de límites como acuerdos familiares y no solo como imposiciones. Además, la disciplina positiva de la AAP insiste en usar palabras y acciones calmadas, con límites claros y consistentes.

## Idea clave

Los límites generan menos conflicto cuando se explican antes, se aplican siempre y no dependen del humor del día. La meta no es controlar cada minuto, sino ayudar al niño a desarrollar hábitos digitales más sanos con apoyo y constancia.

## Cierre

Establecer límites sin conflicto no significa que nunca habrá molestia, sino que la familia tendrá una estructura clara para manejarla. Cuando los padres anticipan, acompañan y sostienen las reglas con calma, las pantallas dejan de ser una lucha permanente y pasan a ocupar un lugar más equilibrado en la rutina.`;

    const module6Article1Content = `# Controles parentales en YouTube y Twitch

Los controles parentales no eliminan todos los riesgos, pero sí ayudan a reducir exposición, poner límites y acompañar mejor. La clave es verlos como una ayuda práctica, no como una solución total. YouTube reconoce que sus sistemas intentan evitar contenido inapropiado, pero no son perfectos; por eso ofrece opciones más limitadas como YouTube Kids y experiencias supervisadas para preadolescentes.

## Lo más importante

No todas las plataformas ofrecen el mismo nivel de control. YouTube cuenta con herramientas parentales más completas para niños y preadolescentes; Twitch requiere más cautela en edades de primaria, porque su edad mínima global es de 13 años y su guía para familias está pensada para ayudar a adultos a acompañar a adolescentes en la plataforma.

## Resumen rápido de herramientas útiles

Las opciones oficiales más prácticas para familias se resumen así:

| Plataforma | Herramienta | Para qué sirve |
| --- | --- | --- |
| YouTube | YouTube Kids | Ofrece una experiencia más simple y limitada para niños |
| YouTube | Cuenta supervisada | Permite elegir nivel de contenido para preadolescentes |
| YouTube | Family Link / Family Center | Permite cambiar ajustes, revisar restricciones y administrar experiencia |
| YouTube | Aprobación de compras en Google Play | Añade una barrera para descargas o compras |
| Twitch | Bloqueo de Whispers de desconocidos | Reduce mensajes privados de personas que no sigue |
| Twitch | Bloquear y reportar usuarios | Ayuda a cortar contacto e informar conductas problemáticas |

Este resumen está basado en las herramientas descritas por YouTube, Family Link, Google Play y Twitch en su documentación oficial.

## 1. YouTube: la opción más configurable para familias

YouTube ofrece dos caminos principales: YouTube Kids y la experiencia supervisada de YouTube. YouTube Kids tiene una biblioteca más pequeña y herramientas parentales como límites de tiempo, bloqueo de videos y otros controles. La experiencia supervisada para preadolescentes usa la app principal de YouTube, pero con ajustes de contenido y protecciones de bienestar digital administradas por el padre o madre.

## 2. En YouTube Kids puedes limitar mucho más

Dentro de YouTube Kids, el adulto puede cambiar el nivel de contenido y también usar la opción "Approved content only". En ese modo, el niño solo puede ver videos, canales y colecciones seleccionados manualmente por el adulto, y además no puede usar la búsqueda. Esta es una de las opciones más útiles para niños más pequeños.

## 3. Family Link ayuda a reunir controles en un solo lugar

Google indica que con Family Link los padres pueden administrar apps, cambiar algunos ajustes de la cuenta del menor, fijar límites diarios de tiempo, poner una hora de dormir para el dispositivo y revisar cuánto tiempo pasa el niño en ciertas apps. Además, desde Family Link se puede entrar a las restricciones de YouTube para cambiar la experiencia supervisada o el nivel de contenido de YouTube Kids.

## 4. También conviene proteger las compras

Si el dispositivo del menor usa Google Play, los padres pueden activar aprobación de compras, de modo que ciertas descargas o pagos necesiten permiso antes de completarse. Google aclara que esta aprobación aplica a compras hechas a través del sistema de facturación de Google Play, y que el administrador familiar recibe el recibo por correo cuando una compra se completa.

## 5. Twitch necesita un enfoque más preventivo

Twitch no debe verse igual que YouTube Kids. Su edad mínima global es de 13 años y su guía oficial para padres y educadores está pensada para ayudar a adultos a acompañar el uso adolescente de la plataforma. Para familias con niños de primaria, esto significa que Twitch requiere mucha más supervisión y, en muchos casos, simplemente no es una plataforma adecuada para usarse de forma autónoma.

## 6. En Twitch, los controles más útiles son de contacto y seguridad

Entre las herramientas oficiales destacadas por Twitch están la opción de bloquear Whispers de personas que no sigues, el bloqueo de usuarios para dejar de ver sus mensajes en chat y Whispers, y el sistema de reportes para denunciar mensajes de chat o Whispers problemáticos. En Twitch, estas funciones son especialmente importantes porque gran parte del riesgo aparece en la interacción en vivo.

## Señal de alerta

Un control parental bien activado no significa que ya no haga falta supervisión. YouTube advierte que sus sistemas no son perfectos y que incluso dentro de experiencias supervisadas pueden aparecer videos inadecuados; por eso recomienda considerar YouTube Kids cuando se busca una experiencia más limitada.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Elegir YouTube Kids o experiencia supervisada según edad | Ajusta mejor el contenido al nivel del menor |
| Usar Family Link para límites de tiempo y apps | Da estructura al uso del dispositivo |
| Activar aprobación de compras | Reduce pagos impulsivos |
| Preferir configuración "Approved content only" en niños pequeños | Aumenta mucho el control sobre lo que ven |
| En Twitch, bloquear mensajes de desconocidos y reportar conductas | Reduce interacción de riesgo |
| Revisar ajustes cada cierto tiempo | Los intereses del menor cambian y la configuración debe actualizarse |

Estas acciones recogen el uso recomendado de Family Link, YouTube Kids, cuentas supervisadas y herramientas de seguridad de Twitch.

## Preguntas útiles para conversar en casa

1. ¿Sabes qué hacer si te aparece un video que no querías ver?
2. ¿Sabes cómo salir de un directo o bloquear a alguien?
3. ¿Te gustaría que juntos elijamos qué tipo de contenido puedes ver?
4. ¿Sabes que algunas funciones requieren dinero real?
5. ¿Qué harías si alguien te escribe y te incomoda?

Estas preguntas complementan los controles técnicos, porque las propias plataformas y guías familiares parten de la idea de que la seguridad no depende solo de filtros, sino también de acompañamiento adulto y decisiones compartidas.

## Idea clave

Los controles parentales sirven para poner barreras y ordenar el uso, pero funcionan mucho mejor cuando van acompañados de conversación, supervisión y ajustes según la edad del menor. En YouTube hay más herramientas específicas para infancia; en Twitch, el foco debe estar en restringir interacción y extremar el acompañamiento.

## Cierre

Una buena configuración no busca vigilar todo, sino crear un entorno más seguro y predecible. Cuando los padres conocen las herramientas reales de YouTube, Family Link y Twitch, pueden pasar de reaccionar tarde a prevenir mejor: limitar contenido, frenar compras, reducir contacto de riesgo y acompañar con más criterio.`;

    const module6Article2Content = `# Supervisión activa: cómo acompañar sin invadir

Supervisar no significa revisar cada movimiento del niño ni convertir internet en un espacio de desconfianza. Supervisar bien significa estar presente, interesarse por lo que ve, conversar con naturalidad y crear reglas que le den seguridad. La AAP recomienda pasar de una visión centrada solo en tiempo de pantalla a otra que también valore la calidad del contenido, el contexto y la comunicación familiar.

## Lo más importante

Cuando un padre acompaña sin invadir, el niño tiene más probabilidades de contar lo que ve, pedir ayuda si algo lo incomoda y aceptar mejor los límites. UNICEF recomienda pasar tiempo con los hijos en su entorno digital y modelar hábitos sanos, mientras que HealthyChildren destaca el co-viewing como una forma de abrir conversaciones y fortalecer la confianza.

## Qué es supervisar de forma activa

| Supervisión activa | Vigilancia invasiva |
| --- | --- |
| Preguntar qué ve y por qué le gusta | Revisar a escondidas sin hablarlo |
| Ver a veces contenido juntos | Interrumpir solo para regañar |
| Explicar reglas y motivos | Imponer reglas sin contexto |
| Enseñar qué hacer si algo incomoda | Esperar a que el problema estalle |
| Ajustar límites según edad y madurez | Aplicar el mismo control a todo y siempre |

Esta comparación resume el enfoque de UNICEF y HealthyChildren: acompañar, conversar y enseñar habilidades digitales, en lugar de depender solo del control técnico o del castigo.

## 1. Interesarse funciona mejor que interrogar

Una pregunta simple como ¿qué canal te gusta? suele abrir más puertas que ¿qué estás viendo ahora?. HealthyChildren explica que ver contenido junto al niño ayuda a conocer sus intereses, iniciar conversaciones y fortalecer la relación, mientras que UNICEF recomienda crear oportunidades para interacciones digitales seguras y positivas dentro de la familia.

## 2. Acompañar no es estar encima todo el tiempo

La supervisión activa no exige sentarse a ver cada video. Lo importante es mantener una presencia regular: conocer las plataformas que usa, revisar de vez en cuando configuraciones y hablar sobre experiencias buenas o incómodas. UNICEF recomienda revisar periódicamente ajustes de privacidad y combinar controles con alfabetización digital, no sustituir una cosa por la otra.

## 3. El ejemplo del adulto pesa mucho

Los niños aprenden también observando. UNICEF aconseja modelar hábitos saludables y cuidar lo que los adultos comparten o hacen en línea, y HealthyChildren recomienda incluir los hábitos de los propios padres en las conversaciones familiares sobre medios digitales.

## 4. La confianza no elimina los límites

Acompañar no significa dejar todo abierto. La AAP recomienda planes familiares de uso de medios, horarios claros, zonas sin pantallas y funciones como apagar autoplay y notificaciones para reducir el enganche. Esa estructura ayuda a que la supervisión no dependa solo de discusiones o castigos del momento.

## Señales de que hace falta más acompañamiento

| Señal | Qué conviene revisar |
| --- | --- |
| El niño evita contar qué ve | Puede faltar confianza para hablar |
| Se altera mucho después de conectarse | Puede haber contenido o interacción que lo afecta |
| Cambia rápido de pantalla cuando un adulto se acerca | Puede sentirse a la defensiva o estar ocultando algo incómodo |
| Solo recibe límites cuando hay enojo | La supervisión está ocurriendo demasiado tarde |
| Los adultos no conocen las plataformas que usa | Hay poca presencia en su entorno digital |

HealthyChildren recomienda observar si las actividades digitales empiezan a afectar el ánimo, la convivencia o la rutina, y UNICEF aconseja estar atentos si el menor se muestra reservado o alterado por lo que ocurre en línea.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Pedir que muestre sus canales o creadores favoritos | Permite conocer su entorno digital sin invadir |
| Ver contenido juntos de vez en cuando | Abre conversaciones naturales |
| Crear reglas claras sobre horarios, chats y privacidad | Da seguridad y estructura |
| Revisar ajustes de privacidad cada cierto tiempo | Reduce exposición innecesaria |
| Explicar que siempre puede pedir ayuda sin miedo | Favorece la confianza |

Estas medidas coinciden con UNICEF, que propone reglas claras, tiempo compartido en línea y revisión de privacidad, y con HealthyChildren, que recomienda co-viewing, planes familiares y hábitos digitales consistentes.

## Preguntas útiles para conversar en casa

1. ¿Qué te gusta de ese canal o streamer?
2. ¿Alguna vez viste algo que te incomodó o confundió?
3. ¿Qué harías si alguien te escribe o te pide algo raro?
4. ¿Te gustaría que veamos juntos ese contenido alguna vez?
5. ¿Qué regla crees que nos ayudaría a usar mejor estas plataformas?

HealthyChildren señala que compartir la experiencia digital ayuda a iniciar conversaciones que quizá no surgirían de otra forma, y UNICEF recomienda hablar de manera abierta sobre contenido, contactos y privacidad.

## Idea clave

La supervisión más efectiva no es la que espía más, sino la que combina presencia, conversación, ejemplo y reglas claras. Cuando el niño siente que el adulto quiere entender antes que castigar, es más fácil que cuente lo que vive en internet y pida ayuda a tiempo.

## Cierre

Acompañar sin invadir es una habilidad parental clave en el entorno digital. No se trata de controlar cada clic, sino de construir una relación en la que el menor sepa que hay límites, pero también apoyo. Ese equilibrio entre confianza y estructura es una de las mejores formas de protegerlo mientras aprende a usar plataformas como YouTube y Twitch con más criterio.`;

    const module7Article1Content = `# Cómo usar YouTube y Twitch para aprender y no solo entretenerse

YouTube y Twitch no tienen que usarse solo para pasar el tiempo. Bien acompañadas, estas plataformas también pueden servir para aprender, despertar intereses y reforzar habilidades. La diferencia suele estar en qué contenido se elige, cómo se consume y qué papel toma el adulto. YouTube ofrece opciones familiares como YouTube Kids y experiencias supervisadas; Twitch, en cambio, está pensado para personas de 13 años o más y requiere más cautela en menores.

## Lo más importante

Para niños de 6 a 12 años, YouTube suele ser la opción más útil para aprendizaje guiado, porque permite buscar tutoriales, explicaciones y contenido educativo con más control parental. Twitch puede aportar en temas creativos o en vivo, pero no es una plataforma pensada para que niños pequeños la usen de forma autónoma.

## Qué puede aportar cada plataforma

| Plataforma | Qué puede aportar | Qué conviene cuidar |
| --- | --- | --- |
| YouTube | Tutoriales, ciencia, dibujo, música, manualidades, explicaciones paso a paso | Elegir canales confiables y usar controles parentales |
| YouTube Kids | Experiencia más simple y limitada para niños | Aun así conviene revisar y acompañar |
| Twitch | Contenido en vivo de arte, música, trabajo compartido, ciencia y tecnología, desarrollo de software | Edad mínima de 13 años y necesidad de supervisión más estrecha |

YouTube describe YouTube Kids como una experiencia más simple para niños y ofrece experiencias supervisadas para preadolescentes. Twitch se define como un servicio interactivo de transmisiones en vivo para gaming, entretenimiento, deportes, música y más; además, sus categorías creativas incluyen arte, música, trabajo compartido y desarrollo de software.

## 1. Aprender también puede ser parte de la rutina digital

No todo aprendizaje tiene que sentirse como clase. Un niño puede aprender a dibujar, seguir una receta sencilla, entender un experimento, practicar música o descubrir cómo funciona algo a través de videos bien elegidos. UNICEF recomienda introducir a los hijos a fuentes confiables de información y crear oportunidades de interacción digital positiva.

## 2. Ver juntos mejora más que dejar contenido educativo solo

La AAP subraya que ver contenido juntos ayuda a que los niños hagan conexiones, desarrollen perspectiva y hablen de lo que ven. No basta con poner un video bueno: lo que realmente enriquece es comentar, preguntar y relacionarlo con la vida diaria.

## 3. YouTube suele funcionar mejor para aprendizaje guiado

Para primaria, YouTube y YouTube Kids ofrecen una experiencia más práctica porque permiten contenido bajo demanda y herramientas parentales. YouTube explica que los padres pueden elegir entre YouTube Kids, cuentas supervisadas y distintos niveles de contenido según la edad y madurez del menor.

## 4. Twitch puede servir, pero no como plataforma libre para niños pequeños

Twitch también tiene usos positivos: hay contenido en vivo de arte, música, estudio compartido y tecnología. Sin embargo, su propia guía indica que los menores de 13 años no pueden usar la plataforma, por lo que en niños de primaria no debería verse como una herramienta autónoma de aprendizaje, sino como algo puntual, acompañado y muy supervisado, si acaso se usa.

## Señal de alerta

Un contenido educativo no siempre lo es de verdad. Conviene revisar si enseña algo con claridad, si usa lenguaje apropiado, si evita presión comercial innecesaria y si deja al niño con una idea más clara, no solo más estimulado. La AAP recomienda ayudar a los niños a desarrollar pensamiento crítico frente a los medios, no consumir de forma pasiva.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Elegir canales o temas concretos antes de abrir la plataforma | Reduce que el algoritmo decida todo |
| Ver algunos videos junto al hijo | Permite conversar y reforzar el aprendizaje |
| Relacionar el video con una actividad fuera de pantalla | Convierte el contenido en experiencia real |
| Preferir YouTube Kids o experiencias supervisadas en menores | Aumenta el control sobre el contenido |
| Usar Twitch solo con supervisión y en casos puntuales | Reduce riesgos de interacción y exposición |

Estas acciones están alineadas con la AAP y UNICEF: priorizar contenido de calidad, acompañar, conversar y construir hábitos digitales sanos en familia.

## Ejemplos de uso positivo

| Objetivo | Ejemplo práctico |
| --- | --- |
| Aprender una habilidad | Ver un tutorial de dibujo y luego practicar en papel |
| Despertar curiosidad | Ver un video corto de ciencia y comentarlo juntos |
| Fomentar creatividad | Seguir una manualidad o actividad musical |
| Desarrollar criterio | Preguntar qué aprendió y si la información parece confiable |

HealthyChildren recomienda actividades familiares para fortalecer alfabetización mediática y pensamiento crítico desde edades tempranas.

## Preguntas útiles para conversar en casa

1. ¿Qué aprendiste con ese video?
2. ¿Te gustaría intentar eso fuera de la pantalla?
3. ¿Quién hizo ese contenido y por qué te pareció confiable?
4. ¿Crees que este video quería enseñar algo o solo entretener?
5. ¿Te gustaría que armemos una lista de canales útiles juntos?

Estas preguntas ayudan a pasar de un consumo pasivo a uno más reflexivo, algo que la AAP recomienda para fortalecer pensamiento crítico y una relación saludable con los medios.

## Idea clave

La mejor forma de aprovechar YouTube y, en casos muy puntuales, Twitch, no es dejar al niño solo frente a la plataforma, sino usar el contenido como punto de partida para aprender, conversar y crear algo más allá de la pantalla.

## Cierre

Cuando los padres eligen mejor el contenido, acompañan de vez en cuando y conectan lo visto con actividades reales, las plataformas dejan de ser solo un espacio de consumo. Se convierten en una herramienta para aprender, explorar intereses y desarrollar criterio. En niños de 6 a 12 años, YouTube suele ser la opción más útil para esto; Twitch, por su formato y edad mínima, requiere mucha más cautela.`;

    const module7Article2Content = `# Cómo enseñar a los hijos a cuestionar lo que ven en plataformas digitales

En YouTube, Twitch y otras plataformas, no todo lo que parece real, útil o espontáneo lo es. Un video puede mezclar opinión, entretenimiento, publicidad, exageración o información incorrecta. Por eso, una de las habilidades más valiosas para un niño no es solo saber usar la plataforma, sino aprender a preguntarse qué está viendo, quién lo dice y con qué intención. UNICEF advierte que en internet las afirmaciones falsas pueden disfrazarse de hechos, y la AAP recomienda enseñar a los niños a pensar críticamente sobre lo que consumen.

## Lo más importante

El objetivo no es que el niño desconfíe de todo, sino que aprenda a no creer automáticamente todo lo que ve. HealthyChildren señala que las conversaciones abiertas y regulares sobre medios ayudan a construir pensamiento crítico, y UNICEF recomienda acompañar las actividades digitales de los niños para fortalecer su capacidad de evaluar información.

## Preguntas que ayudan a pensar mejor

| Pregunta | Para qué sirve |
| --- | --- |
| ¿Quién hizo este video? | Ayuda a identificar la fuente |
| ¿Quiere informar, entretener o vender algo? | Permite detectar intención |
| ¿Esto parece real o exagerado? | Frena la reacción impulsiva |
| ¿Cómo sabemos que es cierto? | Invita a buscar evidencia |
| ¿Te hace sentir miedo, enojo o urgencia? | Ayuda a detectar manipulación |

Estas preguntas están alineadas con las recomendaciones de la AAP de hablar sobre publicidad, privacidad y medios de manera abierta, y con la guía de UNICEF para revisar información con más cuidado y no tomarla como verdad solo por aparecer en pantalla.

## 1. Enseñar a mirar quién está hablando

Un buen primer paso es enseñar a los hijos a fijarse en la fuente. HealthyChildren sugiere preguntar de dónde viene la información y si la persona, empresa o grupo que la comparte tiene algún objetivo. Esa simple pregunta ayuda a que el niño empiece a diferenciar entre alguien que busca explicar algo y alguien que quiere llamar la atención, convencer o vender.

## 2. Ayudarles a detectar intención

Mucho contenido digital no está hecho solo para informar. Puede buscar entretener, emocionar, generar clics o impulsar una compra. La AAP recuerda que en edad escolar los niños ya empiezan a entender mejor ideas como publicidad, privacidad y lo que está bien o mal, y que hablar de eso de manera frecuente fortalece su criterio.

## 3. Mostrar que parecer verdad no es lo mismo que ser verdad

UNICEF explica que en redes y plataformas digitales la información falsa suele presentarse como si fuera un hecho. Por eso conviene enseñar a los niños a detenerse y revisar antes de compartir, repetir o creer algo. No se trata de volverlos expertos en verificación, sino de acostumbrarlos a hacer una pausa mental antes de aceptar un contenido como cierto.

## 4. Conversar vale más que dar sermones

HealthyChildren recomienda conversaciones abiertas y no solo lecciones largas. UNICEF también señala que las respuestas no culpabilizantes facilitan que los niños busquen guía de sus padres y hablen con más libertad sobre lo que viven en línea. Cuando el adulto pregunta con interés en vez de empezar juzgando, el niño suele contar más.

## Señal de alerta

Conviene prestar atención si el niño repite todo lo que dice un creador como si fuera cierto, comparte información sin pensar, se deja llevar por títulos alarmistas o confunde claramente entretenimiento con realidad. UNICEF advierte que la desinformación puede influir en cómo los niños entienden el mundo, por lo que desarrollar habilidades de lectura crítica es una protección importante.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Ver un video juntos de vez en cuando | Permite comentar en el momento |
| Preguntar ¿cómo sabes que eso es verdad? | Desarrolla pensamiento crítico |
| Hablar de publicidad, edición y exageración | Ayuda a leer mejor el contenido |
| Invitar a comparar dos fuentes | Enseña a no quedarse con una sola versión |
| Reaccionar con calma cuando el niño se equivoca | Favorece que siga preguntando |

La AAP propone actividades familiares de alfabetización mediática y conversaciones abiertas sobre medios. UNICEF recomienda acompañar las actividades digitales y apoyar habilidades de información y verificación.

## Preguntas útiles para conversar en casa

1. ¿Quién crees que hizo este video y por qué?
2. ¿Te parece que quiere enseñar algo, entretener o vender?
3. ¿Qué parte te hizo pensar que era verdad?
4. ¿Cómo podríamos comprobarlo?
5. ¿Te ha pasado que un video parecía real y luego no lo era?

HealthyChildren recomienda precisamente usar preguntas y actividades para promover pensamiento crítico, y UNICEF sugiere conversaciones abiertas sobre la vida digital y la veracidad de la información.

## Idea clave

Pensar críticamente no significa desconfiar de todo, sino aprender a hacerse buenas preguntas antes de creer, repetir o compartir algo. Esa habilidad protege al niño no solo frente a la desinformación, sino también frente a manipulación, publicidad y presión social en plataformas digitales.

## Cierre

Enseñar a cuestionar lo que se ve en internet es una de las formas más útiles de acompañar a un hijo en YouTube, Twitch y cualquier otra plataforma. Cuando los padres modelan curiosidad, hacen preguntas y conversan sin ridiculizar, ayudan a que el menor construya criterio propio y use la tecnología con más seguridad y autonomía.`;

    const module1QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Streaming', value: 'Forma de ver videos o transmisiones por internet sin descargarlos' },
                    { key: 'YouTube', value: 'Plataforma centrada sobre todo en videos grabados que pueden verse cuando el usuario quiere' },
                    { key: 'Twitch', value: 'Plataforma centrada principalmente en transmisiones en vivo con interacción por chat' },
                    { key: 'Algoritmo', value: 'Sistema automático que analiza intereses y recomienda contenido similar' },
                    { key: 'Reproducción automática', value: 'Función que inicia otro video sin que el usuario lo elija manualmente' },
                ],
                correctAnswer: {
                    Streaming: 'Forma de ver videos o transmisiones por internet sin descargarlos',
                    YouTube: 'Plataforma centrada sobre todo en videos grabados que pueden verse cuando el usuario quiere',
                    Twitch: 'Plataforma centrada principalmente en transmisiones en vivo con interacción por chat',
                    Algoritmo: 'Sistema automático que analiza intereses y recomienda contenido similar',
                    'Reproducción automática': 'Función que inicia otro video sin que el usuario lo elija manualmente',
                },
            },
            explanation: 'Tip: Streaming es la forma de consumo; YouTube y Twitch son plataformas; el algoritmo recomienda y la reproducción automática evita pausas naturales.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En YouTube predominan los [blank1]. En Twitch predominan las [blank2]. En ambas plataformas, un [blank3] analiza lo que ve el menor y puede recomendar contenido [blank4]. Cuando eso ocurre sin pausas claras, el niño puede pasar más [blank5] del planeado.',
                bank: ['videos grabados', 'transmisiones en vivo', 'algoritmo', 'similar', 'tiempo'],
                correctAnswer: {
                    blank1: 'videos grabados',
                    blank2: 'transmisiones en vivo',
                    blank3: 'algoritmo',
                    blank4: 'similar',
                    blank5: 'tiempo',
                },
            },
            explanation: 'Tip: La diferencia base entre YouTube y Twitch es el tipo de contenido, y en ambas el algoritmo influye en cuánto sigue mirando el menor.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada característica según la plataforma (YouTube o Twitch) que mejor la describa.',
            type: 'match_columns',
            metadata: {
                left: ['YouTube', 'Twitch'],
                right: [
                    'Videos grabados disponibles a demanda',
                    'Chat en vivo con alta interacción',
                    'Mayor control previo del contenido',
                    'Menor control en tiempo real',
                    'Suele atraer por transmisiones en directo',
                    'Suele atraer por videos fáciles de consumir cuando el niño quiere',
                ],
                correctAnswer: {
                    YouTube: [
                        'Videos grabados disponibles a demanda',
                        'Mayor control previo del contenido',
                        'Suele atraer por videos fáciles de consumir cuando el niño quiere',
                    ],
                    Twitch: [
                        'Chat en vivo con alta interacción',
                        'Menor control en tiempo real',
                        'Suele atraer por transmisiones en directo',
                    ],
                },
            },
            explanation: 'Tip: YouTube se entiende mejor desde el video grabado; Twitch, desde el directo y la interacción en tiempo real.',
            points: 12,
        },
        {
            text: 'Ordena la cadena básica con la que una plataforma puede mantener la atención de un niño.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'El niño ve un video o transmisión que le interesa.',
                    'La plataforma detecta ese interés.',
                    'El algoritmo recomienda contenido parecido.',
                    'La reproducción automática o el siguiente contenido aparece sin pausa clara.',
                    'El niño permanece más tiempo del planeado.',
                ],
                correctAnswer: [
                    'El niño ve un video o transmisión que le interesa.',
                    'La plataforma detecta ese interés.',
                    'El algoritmo recomienda contenido parecido.',
                    'La reproducción automática o el siguiente contenido aparece sin pausa clara.',
                    'El niño permanece más tiempo del planeado.',
                ],
            },
            explanation: 'Tip: La secuencia clave del módulo es interés, detección, recomendación, continuidad y más tiempo de consumo.',
            points: 8,
        },
        {
            text: 'Selecciona todas las características del streaming que pueden hacerlo especialmente atractivo para niños y adolescentes.',
            type: 'multiple_selection',
            options: [
                { text: 'Recompensa inmediata', isCorrect: true },
                { text: 'Contenido infinito', isCorrect: true },
                { text: 'Personalización del contenido', isCorrect: true },
                { text: 'Interacción o sensación de cercanía con creadores', isCorrect: true },
                { text: 'Edición rápida, títulos llamativos y muchos estímulos', isCorrect: true },
                { text: 'Disponibilidad casi todo el tiempo', isCorrect: true },
                { text: 'Pausas obligatorias después de cada video', isCorrect: false },
                { text: 'Horarios fijos como en la televisión tradicional', isCorrect: false },
                { text: 'Necesidad de descargar cada video antes de verlo', isCorrect: false },
            ],
            explanation: 'Tip: Lo que engancha aquí no es una sola cosa: se combinan recompensa rápida, personalización, continuidad e interacción.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'YouTube se relaciona más con [blank1], mientras Twitch se relaciona más con [blank2]. En Twitch, un riesgo inicial importante es la interacción con [blank3]. En YouTube, un riesgo importante es la exposición a contenido [blank4] recomendado por el sistema.',
                options: {
                    blank1: ['videos grabados', 'chat privado', 'transmisiones escolares'],
                    blank2: ['transmisiones en vivo', 'videos descargados', 'foros escritos'],
                    blank3: ['desconocidos', 'solo familiares', 'docentes'],
                    blank4: ['inapropiado', 'siempre educativo', 'sin imagen'],
                },
                correctAnswer: {
                    blank1: 'videos grabados',
                    blank2: 'transmisiones en vivo',
                    blank3: 'desconocidos',
                    blank4: 'inapropiado',
                },
            },
            explanation: 'Tip: El módulo diferencia bien dos riesgos iniciales: en YouTube pesa más lo que aparece; en Twitch, con quién se interactúa.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Reproducción automática',
                    'Contenido infinito',
                    'Conexión emocional con creadores',
                    'Exposición a contenido inapropiado',
                    'Interacción con desconocidos',
                    'Consumo excesivo de tiempo',
                    'Preguntar qué videos le gustan',
                    'Identificar al creador favorito',
                    'Hablar sobre por qué le gusta ese contenido',
                ],
                categories: ['Diseño que engancha', 'Riesgo inicial', 'Acción parental'],
                correctAnswer: {
                    'Diseño que engancha': [
                        'Reproducción automática',
                        'Contenido infinito',
                        'Conexión emocional con creadores',
                    ],
                    'Riesgo inicial': [
                        'Exposición a contenido inapropiado',
                        'Interacción con desconocidos',
                        'Consumo excesivo de tiempo',
                    ],
                    'Acción parental': [
                        'Preguntar qué videos le gustan',
                        'Identificar al creador favorito',
                        'Hablar sobre por qué le gusta ese contenido',
                    ],
                },
            },
            explanation: 'Tip: El módulo separa tres cosas distintas: qué engancha, qué riesgo aparece y cómo puede acompañar mejor la familia.',
            points: 15,
        },
        {
            text: 'Caso: Un niño entra a YouTube para ver videojuegos. Después de bastante tiempo sigue viendo retos y se molesta cuando le piden dejar el dispositivo. El padre quiere prohibir todo de inmediato. ¿Cuál es la respuesta más alineada con lo enseñado en el módulo 1?',
            type: 'case_study',
            options: [
                { text: 'Primero comprender qué vio, preguntar qué le gustó, reconocer que el algoritmo y la reproducción automática pueden estar influyendo, y luego poner límites claros.', isCorrect: true },
                { text: 'Dejarlo seguir porque solo está viendo videos y no está hablando con nadie.', isCorrect: false },
                { text: 'Revisar solo si el creador tiene muchos seguidores, porque eso vuelve el contenido automáticamente seguro.', isCorrect: false },
                { text: 'Centrarse únicamente en contar minutos, sin revisar qué contenido apareció ni por qué la plataforma se lo siguió mostrando.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta combina comprensión del entorno, conversación y límites. El módulo 1 insiste en entender primero cómo funciona la plataforma para acompañar mejor, no en prohibir sin contexto.',
            points: 15,
        },
    ];

    const module2QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada tipo de contenido con el riesgo principal que se explicó en el módulo.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Gameplays', value: 'Puede normalizar lenguaje agresivo o exponer a juegos no aptos' },
                    { key: 'Retos y bromas', value: 'Puede impulsar humillación, imitación o conductas peligrosas' },
                    { key: 'Reacciones', value: 'Puede favorecer burlas, exageración emocional o desinformación' },
                    { key: 'Vlogs', value: 'Puede fomentar comparación, influencia excesiva o consumismo' },
                    { key: 'Tutoriales y educativos', value: 'Puede parecer confiable aunque no todo lo que parece educativo realmente lo sea' },
                    { key: 'Directos en vivo', value: 'Puede exponer a chat con desconocidos y contenido sin filtro' },
                ],
                correctAnswer: {
                    Gameplays: 'Puede normalizar lenguaje agresivo o exponer a juegos no aptos',
                    'Retos y bromas': 'Puede impulsar humillación, imitación o conductas peligrosas',
                    Reacciones: 'Puede favorecer burlas, exageración emocional o desinformación',
                    Vlogs: 'Puede fomentar comparación, influencia excesiva o consumismo',
                    'Tutoriales y educativos': 'Puede parecer confiable aunque no todo lo que parece educativo realmente lo sea',
                    'Directos en vivo': 'Puede exponer a chat con desconocidos y contenido sin filtro',
                },
            },
            explanation: 'Tip: El módulo 2 no trata todo el contenido como igual. Cada formato atrae por algo distinto y también tiene riesgos diferentes.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Si el niño termina más alterado después de ver ciertos videos, conviene observar el área de [blank1]. Si repite insultos o bromas, hay impacto en la [blank2]. Si se compara demasiado con creadores, conviene revisar la [blank3]. Si pierde sueño o descuida tareas, se está afectando la [blank4].',
                bank: ['emociones', 'conducta', 'autoimagen', 'rutina diaria'],
                correctAnswer: {
                    blank1: 'emociones',
                    blank2: 'conducta',
                    blank3: 'autoimagen',
                    blank4: 'rutina diaria',
                },
            },
            explanation: 'Tip: El módulo distingue cuatro áreas de impacto: emociones, conducta, autoimagen y rutina diaria.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada observación según el área de impacto que mejor la describa.',
            type: 'match_columns',
            metadata: {
                left: ['Emociones', 'Conducta', 'Autoimagen', 'Rutina diaria'],
                right: [
                    'Termina más ansioso o sensible después de ver ciertos videos',
                    'Repite insultos, humillaciones o respuestas impulsivas',
                    'Se compara demasiado con streamers o influencers',
                    'Le cuesta dejar el dispositivo y descuida horarios',
                    'Queda más alterado que tranquilo tras cierto contenido',
                    'Imita bromas o lenguaje de creadores',
                    'Expresa descontento con su apariencia o su vida',
                    'Pierde sueño o desplaza convivencia y otras actividades',
                ],
                correctAnswer: {
                    Emociones: [
                        'Termina más ansioso o sensible después de ver ciertos videos',
                        'Queda más alterado que tranquilo tras cierto contenido',
                    ],
                    Conducta: [
                        'Repite insultos, humillaciones o respuestas impulsivas',
                        'Imita bromas o lenguaje de creadores',
                    ],
                    Autoimagen: [
                        'Se compara demasiado con streamers o influencers',
                        'Expresa descontento con su apariencia o su vida',
                    ],
                    'Rutina diaria': [
                        'Le cuesta dejar el dispositivo y descuida horarios',
                        'Pierde sueño o desplaza convivencia y otras actividades',
                    ],
                },
            },
            explanation: 'Tip: Observar bien ayuda a no mezclar señales. Algunas apuntan al ánimo, otras a la conducta, otras a la autoestima y otras a la rutina.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia útil de supervisión según lo enseñado en el módulo 2.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Identificar qué tipo de contenido está viendo el menor.',
                    'Observar cómo termina: tranquilo, alterado, sensible o ansioso.',
                    'Detectar si imita conductas, se compara o desplaza sueño y tareas.',
                    'Hablar sin regañar de entrada sobre lo que vio y cómo se sintió.',
                    'Ajustar límites, horarios o acompañamiento según lo observado.',
                ],
                correctAnswer: [
                    'Identificar qué tipo de contenido está viendo el menor.',
                    'Observar cómo termina: tranquilo, alterado, sensible o ansioso.',
                    'Detectar si imita conductas, se compara o desplaza sueño y tareas.',
                    'Hablar sin regañar de entrada sobre lo que vio y cómo se sintió.',
                    'Ajustar límites, horarios o acompañamiento según lo observado.',
                ],
            },
            explanation: 'Tip: En este módulo primero se entiende el contenido, luego su efecto y después se conversa para intervenir mejor.',
            points: 8,
        },
        {
            text: 'Selecciona todas las acciones que el módulo 2 propone para acompañar mejor el consumo de contenido.',
            type: 'multiple_selection',
            options: [
                { text: 'Preguntar qué ve y quién lo crea', isCorrect: true },
                { text: 'Revisar un video o canal de vez en cuando', isCorrect: true },
                { text: 'Preguntar cómo se sintió después de ver algo', isCorrect: true },
                { text: 'Ver ocasionalmente el contenido con el hijo', isCorrect: true },
                { text: 'Crear horarios y zonas sin pantallas', isCorrect: true },
                { text: 'Hablar de lo que es real, editado o exagerado', isCorrect: true },
                { text: 'Asumir que todo tutorial calmado es confiable', isCorrect: false },
                { text: 'Revisar solo cuántos minutos estuvo conectado', isCorrect: false },
                { text: 'Prohibir primero y preguntar después', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 2 prioriza calidad, observación y conversación, no solo contar minutos ni reaccionar con castigo inmediato.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'Los [blank1] pueden normalizar insultos o frustración exagerada. Los [blank2] pueden impulsar imitación de conductas humillantes o peligrosas. Los [blank3] pueden favorecer comparación y consumismo. Los [blank4] requieren más supervisión porque no hay revisión previa del contenido.',
                options: {
                    blank1: ['gameplays', 'tutoriales', 'vlogs'],
                    blank2: ['retos y bromas', 'tutoriales', 'comentarios escolares'],
                    blank3: ['vlogs', 'gameplays', 'manualidades'],
                    blank4: ['directos en vivo', 'videos grabados', 'resúmenes'],
                },
                correctAnswer: {
                    blank1: 'gameplays',
                    blank2: 'retos y bromas',
                    blank3: 'vlogs',
                    blank4: 'directos en vivo',
                },
            },
            explanation: 'Tip: El módulo explica que cada formato tiene su propia lógica de atracción y su propio riesgo principal.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Reacciones',
                    'Tutoriales y educativos',
                    'Se irrita después de ver ciertos videos',
                    'Pierde sueño o desplaza convivencia',
                    'Preguntar qué le gustó del creador',
                    'Ver el contenido junto al hijo de vez en cuando',
                    'Se compara demasiado con influencers',
                    'Gameplays',
                    'Hablar de lo que es real o exagerado',
                ],
                categories: ['Tipo de contenido', 'Señal de impacto', 'Acción parental'],
                correctAnswer: {
                    'Tipo de contenido': [
                        'Reacciones',
                        'Tutoriales y educativos',
                        'Gameplays',
                    ],
                    'Señal de impacto': [
                        'Se irrita después de ver ciertos videos',
                        'Pierde sueño o desplaza convivencia',
                        'Se compara demasiado con influencers',
                    ],
                    'Acción parental': [
                        'Preguntar qué le gustó del creador',
                        'Ver el contenido junto al hijo de vez en cuando',
                        'Hablar de lo que es real o exagerado',
                    ],
                },
            },
            explanation: 'Tip: El módulo 2 separa bien tres niveles: qué contenido entra, qué efecto deja y qué puede hacer la familia.',
            points: 15,
        },
        {
            text: 'Caso: Un niño empezó viendo bromas y reacciones. Ahora repite insultos de creadores, duerme más tarde y dice que su vida es aburrida comparada con la de ciertos streamers. El adulto solo quiere reducir minutos sin revisar el contenido. ¿Cuál es la respuesta más alineada con el módulo 2?',
            type: 'case_study',
            options: [
                { text: 'Revisar qué tipos de contenido está consumiendo, observar su efecto en conducta, autoimagen y rutina, conversar sin regañar y ajustar límites con más criterio.', isCorrect: true },
                { text: 'Concentrarse únicamente en poner un temporizador, porque la cantidad de tiempo explica por sí sola todo el problema.', isCorrect: false },
                { text: 'Asumir que el problema desaparecerá si cambia de creador, aunque siga viendo formatos similares sin acompañamiento.', isCorrect: false },
                { text: 'Permitir el contenido mientras no haya violencia explícita, porque la comparación y la imitación no afectan realmente al menor.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une las dos ideas centrales del módulo: no basta con medir tiempo, también hay que entender qué contenido consume el menor y cómo impacta en su ánimo, conducta, autoimagen y rutina.',
            points: 15,
        },
    ];

    const module3QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada situación de riesgo con su consecuencia principal según el módulo 3.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Recomendaciones automáticas', value: 'Pueden llevar al menor a videos que no buscó' },
                    { key: 'Autoplay activado', value: 'Reduce el control sobre lo que aparece después' },
                    { key: 'Contenido en vivo', value: 'Puede mostrar lenguaje o temas no aptos en tiempo real' },
                    { key: 'Chat en vivo', value: 'Puede normalizar el contacto directo con desconocidos' },
                    { key: 'Mensajes fuera de la plataforma', value: 'Aumentan el riesgo de secreto, manipulación o grooming' },
                ],
                correctAnswer: {
                    'Recomendaciones automáticas': 'Pueden llevar al menor a videos que no buscó',
                    'Autoplay activado': 'Reduce el control sobre lo que aparece después',
                    'Contenido en vivo': 'Puede mostrar lenguaje o temas no aptos en tiempo real',
                    'Chat en vivo': 'Puede normalizar el contacto directo con desconocidos',
                    'Mensajes fuera de la plataforma': 'Aumentan el riesgo de secreto, manipulación o grooming',
                },
            },
            explanation: 'Tip: El módulo 3 distingue riesgos de exposición y riesgos de interacción. Ambos pueden aparecer sin una búsqueda peligrosa previa.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'El algoritmo no [blank1]; solo [blank2]. Desactivar [blank3] ayuda a recuperar control sobre el siguiente video. En Twitch, los menores de [blank4] años no pueden usar la plataforma. Cuando una interacción pide guardar [blank5], aumenta la alerta.',
                bank: ['cuida', 'recomienda', 'autoplay', '13', 'secreto'],
                correctAnswer: {
                    blank1: 'cuida',
                    blank2: 'recomienda',
                    blank3: 'autoplay',
                    blank4: '13',
                    blank5: 'secreto',
                },
            },
            explanation: 'Tip: En este módulo se repiten tres ideas clave: el algoritmo recomienda, autoplay encadena contenido y el secreto es una señal seria de atención.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada situación según el tipo de riesgo que mejor la describa.',
            type: 'match_columns',
            metadata: {
                left: ['Exposición a contenido', 'Interacción con personas'],
                right: [
                    'El sistema recomienda un video más intenso que el anterior',
                    'Una persona escribe en el chat para seguir hablando',
                    'Aparece lenguaje agresivo o un tema adulto en un directo',
                    'Alguien pide mover la conversación a otro medio',
                    'El siguiente video empieza sin pausa clara',
                    'El menor siente confianza especial con un streamer y baja la alerta',
                ],
                correctAnswer: {
                    'Exposición a contenido': [
                        'El sistema recomienda un video más intenso que el anterior',
                        'Aparece lenguaje agresivo o un tema adulto en un directo',
                        'El siguiente video empieza sin pausa clara',
                    ],
                    'Interacción con personas': [
                        'Una persona escribe en el chat para seguir hablando',
                        'Alguien pide mover la conversación a otro medio',
                        'El menor siente confianza especial con un streamer y baja la alerta',
                    ],
                },
            },
            explanation: 'Tip: Ver algo inadecuado y hablar con alguien riesgoso no son lo mismo, aunque ambos pueden mezclarse en un directo.',
            points: 12,
        },
        {
            text: 'Ordena una posible escalada de interacción riesgosa tal como se explicó en el módulo.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Empieza con un mensaje amable o un halago.',
                    'La persona intenta generar confianza o cercanía.',
                    'Aparecen peticiones pequeñas o mensajes más personales.',
                    'Se propone mover la conversación fuera de la plataforma.',
                    'Se busca que el menor guarde secreto o se sienta presionado.',
                ],
                correctAnswer: [
                    'Empieza con un mensaje amable o un halago.',
                    'La persona intenta generar confianza o cercanía.',
                    'Aparecen peticiones pequeñas o mensajes más personales.',
                    'Se propone mover la conversación fuera de la plataforma.',
                    'Se busca que el menor guarde secreto o se sienta presionado.',
                ],
            },
            explanation: 'Tip: El módulo 3 insiste en que el grooming o la manipulación rara vez comienzan con una amenaza evidente; suelen escalar poco a poco.',
            points: 8,
        },
        {
            text: 'Selecciona todas las medidas de protección que sí se recomendaron en el módulo 3.',
            type: 'multiple_selection',
            options: [
                { text: 'Desactivar autoplay', isCorrect: true },
                { text: 'Preferir experiencias supervisadas o más limitadas', isCorrect: true },
                { text: 'Revisar historial y recomendaciones', isCorrect: true },
                { text: 'Explicar que no deben compartir datos personales', isCorrect: true },
                { text: 'Evitar que niños pequeños naveguen solos por directos', isCorrect: true },
                { text: 'Acordar que si algo incomoda, se sale y se avisa', isCorrect: true },
                { text: 'Confiar en que una portada infantil garantiza seguridad', isCorrect: false },
                { text: 'Suponer que una etiqueta de contenido maduro elimina todo riesgo', isCorrect: false },
                { text: 'Permitir chats privados mientras el menor no lo comente en casa', isCorrect: false },
            ],
            explanation: 'Tip: La respuesta del módulo combina herramientas técnicas, límites de uso y conversación clara sobre qué hacer ante algo incómodo.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'En [blank1], el formato en vivo requiere atención especial porque el contenido puede cambiar en segundos. En [blank2], existen experiencias más limitadas para menores como YouTube Kids y cuentas supervisadas. Ningún sistema es [blank3], por eso las herramientas no sustituyen la [blank4].',
                options: {
                    blank1: ['Twitch', 'televisión abierta', 'podcast'],
                    blank2: ['YouTube', 'mensajería escolar', 'foro local'],
                    blank3: ['perfecto', 'invisible', 'manual'],
                    blank4: ['supervisión adulta', 'publicidad', 'popularidad'],
                },
                correctAnswer: {
                    blank1: 'Twitch',
                    blank2: 'YouTube',
                    blank3: 'perfecto',
                    blank4: 'supervisión adulta',
                },
            },
            explanation: 'Tip: El módulo 3 compara dos realidades: YouTube ofrece herramientas para acotar, pero no garantiza perfección; Twitch exige más atención por el vivo.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Recomendaciones automáticas',
                    'Autoplay',
                    'Chat en vivo con desconocidos',
                    'Mensajes fuera de la plataforma',
                    'Desactivar autoplay',
                    'Revisar historial y recomendaciones',
                    'Acordar salir y avisar si algo incomoda',
                    'Contenido en vivo sin revisión previa',
                    'Secretismo después de conectarse',
                ],
                categories: ['Riesgo de exposición', 'Riesgo de interacción', 'Respuesta protectora'],
                correctAnswer: {
                    'Riesgo de exposición': [
                        'Recomendaciones automáticas',
                        'Autoplay',
                        'Contenido en vivo sin revisión previa',
                    ],
                    'Riesgo de interacción': [
                        'Chat en vivo con desconocidos',
                        'Mensajes fuera de la plataforma',
                        'Secretismo después de conectarse',
                    ],
                    'Respuesta protectora': [
                        'Desactivar autoplay',
                        'Revisar historial y recomendaciones',
                        'Acordar salir y avisar si algo incomoda',
                    ],
                },
            },
            explanation: 'Tip: El módulo 3 separa bien tres cosas: cómo aparece el riesgo por contenido, cómo aparece por contacto y cómo puede responder la familia.',
            points: 15,
        },
        {
            text: 'Caso: Un menor está viendo un directo. El streamer le parece cercano, alguien en el chat le pide seguir hablando por otra aplicación y después el niño cierra rápido la pantalla cuando un adulto se acerca. ¿Cuál es la respuesta más alineada con el módulo 3?',
            type: 'case_study',
            options: [
                { text: 'Acercarse sin acusar, preguntar qué pasó, cortar la interacción fuera de la plataforma, reforzar que no comparta datos y recordar la regla de salir y avisar si algo incomoda.', isCorrect: true },
                { text: 'Mantener el directo abierto para revisar si el streamer vuelve a saludarlo y así confirmar si la relación era importante para el menor.', isCorrect: false },
                { text: 'Ignorar el episodio mientras no haya un mensaje sexual explícito, porque el problema solo existe cuando la amenaza ya es evidente.', isCorrect: false },
                { text: 'Permitir que siga usando el chat si promete no contar lo ocurrido a nadie más para evitarle vergüenza.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta reconoce varias señales del módulo 3 al mismo tiempo: cercanía digital, intento de sacar la conversación de la plataforma, secretismo y necesidad de una salida clara con apoyo adulto.',
            points: 15,
        },
    ];

    const module4QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada función o formato con su descripción correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Super Chat / Super Stickers', value: 'Pago para resaltar mensajes o animaciones dentro del chat en vivo de YouTube' },
                    { key: 'Membresías del canal', value: 'Pago mensual recurrente a cambio de beneficios o contenido especial' },
                    { key: 'Bits / Cheers', value: 'Moneda digital de Twitch usada para destacar apoyo dentro del chat' },
                    { key: 'Gift subs', value: 'Suscripciones que un usuario paga para otras personas o para parte de la comunidad' },
                    { key: 'Promoción pagada', value: 'Contenido donde existe un acuerdo comercial entre la marca y el creador' },
                    { key: 'Productos etiquetados', value: 'Elementos que acortan la distancia entre mirar contenido y comprar' },
                ],
                correctAnswer: {
                    'Super Chat / Super Stickers': 'Pago para resaltar mensajes o animaciones dentro del chat en vivo de YouTube',
                    'Membresías del canal': 'Pago mensual recurrente a cambio de beneficios o contenido especial',
                    'Bits / Cheers': 'Moneda digital de Twitch usada para destacar apoyo dentro del chat',
                    'Gift subs': 'Suscripciones que un usuario paga para otras personas o para parte de la comunidad',
                    'Promoción pagada': 'Contenido donde existe un acuerdo comercial entre la marca y el creador',
                    'Productos etiquetados': 'Elementos que acortan la distancia entre mirar contenido y comprar',
                },
            },
            explanation: 'Tip: El módulo 4 une dos ideas: formas de gasto directo y formas de promoción comercial integradas al contenido.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Cuando un menor paga para que lean su mensaje en un chat, busca [blank1]. Los Bits funcionan como [blank2], lo que puede volver el gasto menos visible. Las membresías y algunas suscripciones pueden ser pagos [blank3]. Si ya existe una [blank4] vinculada, la compra puede resultar más fácil. Cuando hay una relación con una marca, la divulgación debe ser [blank5].',
                bank: ['atención inmediata', 'moneda digital', 'recurrentes', 'tarjeta', 'clara'],
                correctAnswer: {
                    blank1: 'atención inmediata',
                    blank2: 'moneda digital',
                    blank3: 'recurrentes',
                    blank4: 'tarjeta',
                    blank5: 'clara',
                },
            },
            explanation: 'Tip: El módulo remarca que el gasto puede parecer pequeño o simbólico, pero sigue siendo dinero real, sobre todo cuando el pago está a un clic.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada elemento según si describe mejor una forma de gasto directo o una forma de publicidad integrada.',
            type: 'match_columns',
            metadata: {
                left: ['Gasto directo', 'Publicidad integrada'],
                right: [
                    'Super Chat para destacar un mensaje',
                    'Bits o Cheers dentro del chat',
                    'Membresía o suscripción mensual',
                    'Producto etiquetado en video, Short o directo',
                    'Gameplay patrocinado',
                    'Enlace afiliado o código de compra',
                ],
                correctAnswer: {
                    'Gasto directo': [
                        'Super Chat para destacar un mensaje',
                        'Bits o Cheers dentro del chat',
                        'Membresía o suscripción mensual',
                    ],
                    'Publicidad integrada': [
                        'Producto etiquetado en video, Short o directo',
                        'Gameplay patrocinado',
                        'Enlace afiliado o código de compra',
                    ],
                },
            },
            explanation: 'Tip: Unas funciones sirven para pagar dentro de la comunidad; otras convierten el contenido en una vía de promoción y compra.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia de riesgo de gasto impulsivo según lo explicado en el módulo 4.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'El menor ve un directo o video de un creador que le gusta.',
                    'La plataforma muestra una opción para destacar, apoyar o comprar.',
                    'El pago se siente pequeño o menos real por la emoción, la cercanía o la moneda digital.',
                    'Existe una tarjeta vinculada o falta una barrera de aprobación.',
                    'La compra se completa con mucha facilidad.',
                ],
                correctAnswer: [
                    'El menor ve un directo o video de un creador que le gusta.',
                    'La plataforma muestra una opción para destacar, apoyar o comprar.',
                    'El pago se siente pequeño o menos real por la emoción, la cercanía o la moneda digital.',
                    'Existe una tarjeta vinculada o falta una barrera de aprobación.',
                    'La compra se completa con mucha facilidad.',
                ],
            },
            explanation: 'Tip: La combinación de emoción, cercanía, botón de pago y método vinculado es lo que vuelve tan fácil el gasto impulsivo.',
            points: 8,
        },
        {
            text: 'Selecciona todas las medidas de protección que sí se recomendaron en el módulo 4.',
            type: 'multiple_selection',
            options: [
                { text: 'Revisar si hay una tarjeta vinculada al dispositivo o a la cuenta', isCorrect: true },
                { text: 'Activar aprobación de compras en Google Play o Family Link', isCorrect: true },
                { text: 'Explicar que Bits, membresías y subs cuestan dinero real', isCorrect: true },
                { text: 'Revisar si el video tiene promoción pagada o productos etiquetados', isCorrect: true },
                { text: 'Hablar sobre enlaces, códigos y compras durante videos o directos', isCorrect: true },
                { text: 'Reforzar que gustar un producto no obliga a comprarlo', isCorrect: true },
                { text: 'Asumir que una moneda digital no representa dinero real', isCorrect: false },
                { text: 'Confiar en que todo aviso comercial será entendido automáticamente por un niño', isCorrect: false },
                { text: 'Permitir pagos impulsivos mientras luego se explique el gasto', isCorrect: false },
            ],
            explanation: 'Tip: La protección aquí mezcla controles técnicos con conversación clara sobre dinero real, intención comercial y decisiones impulsivas.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'En YouTube, [blank1] permite resaltar mensajes o animaciones dentro del chat. En Twitch, [blank2] funciona como moneda digital en la conversación. Un [blank3] es un pago mensual recurrente. Cuando un creador muestra un producto porque existe un acuerdo con una marca, hablamos de [blank4].',
                options: {
                    blank1: ['Super Chat o Super Stickers', 'gift subs', 'scroll infinito'],
                    blank2: ['Bits o Cheers', 'YouTube Kids', 'Shorts'],
                    blank3: ['membresía o suscripción', 'algoritmo', 'comentario fijado'],
                    blank4: ['promoción pagada', 'amistad espontánea', 'recomendación neutral'],
                },
                correctAnswer: {
                    blank1: 'Super Chat o Super Stickers',
                    blank2: 'Bits o Cheers',
                    blank3: 'membresía o suscripción',
                    blank4: 'promoción pagada',
                },
            },
            explanation: 'Tip: El módulo 4 enseña a nombrar bien cada cosa: función de pago, moneda digital, pago recurrente y promoción comercial.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Gift subs',
                    'Bits',
                    'Promoción pagada',
                    'Producto etiquetado',
                    'Habla de mandar un mensaje para que el creador lo lea',
                    'Pide algo porque lo usa su streamer favorito',
                    'Activar aprobación de compras',
                    'Revisar recibos o movimientos periódicamente',
                    'Preguntar si el creador gana algo por mostrar ese producto',
                ],
                categories: ['Función o formato comercial', 'Señal de alerta', 'Acción parental'],
                correctAnswer: {
                    'Función o formato comercial': [
                        'Gift subs',
                        'Bits',
                        'Promoción pagada',
                        'Producto etiquetado',
                    ],
                    'Señal de alerta': [
                        'Habla de mandar un mensaje para que el creador lo lea',
                        'Pide algo porque lo usa su streamer favorito',
                    ],
                    'Acción parental': [
                        'Activar aprobación de compras',
                        'Revisar recibos o movimientos periódicamente',
                        'Preguntar si el creador gana algo por mostrar ese producto',
                    ],
                },
            },
            explanation: 'Tip: El módulo 4 separa la herramienta comercial, la señal que conviene observar y la respuesta protectora de la familia.',
            points: 15,
        },
        {
            text: 'Caso: Un niño quiere comprar Bits para que el streamer lo note y además pide un producto que vio en un video donde el creador lo recomendaba y tenía enlace para comprar. ¿Cuál es la respuesta más alineada con el módulo 4?',
            type: 'case_study',
            options: [
                { text: 'Explicar que Bits, subs y productos etiquetados implican dinero real, revisar si hay tarjeta vinculada, activar aprobación de compras y conversar sobre si la recomendación era espontánea o parte de una promoción.', isCorrect: true },
                { text: 'Permitir la compra si el creador parece simpático, porque eso reduce el riesgo de gasto impulsivo y de publicidad engañosa.', isCorrect: false },
                { text: 'Concentrarse solo en si el producto parece útil, sin revisar pagos integrados, enlaces comerciales ni motivación para llamar la atención del creador.', isCorrect: false },
                { text: 'Decir que no hay problema mientras el pago sea pequeño, porque los cargos bajos no afectan realmente a la familia ni enseñan hábitos de gasto.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une las dos mitades del módulo 4: gasto digital y promoción comercial. No basta con bloquear o permitir; también hay que volver visible el dinero real y la intención de venta.',
            points: 15,
        },
    ];

    const module5QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada factor o estrategia con su efecto principal según el módulo 5.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Autoplay', value: 'Reduce las pausas naturales y facilita seguir viendo sin decidir' },
                    { key: 'Scroll o recomendaciones infinitas', value: 'Hace difícil sentir que el contenido ya terminó' },
                    { key: 'Alertas y actividad nocturna', value: 'Puede retrasar la hora de dormir' },
                    { key: 'Dispositivos fuera del cuarto', value: 'Ayuda a reducir el consumo nocturno' },
                    { key: 'Avisar antes del final del tiempo', value: 'Reduce la frustración cuando toca apagar' },
                    { key: 'Horarios fijos', value: 'Vuelven el límite más predecible y menos improvisado' },
                ],
                correctAnswer: {
                    Autoplay: 'Reduce las pausas naturales y facilita seguir viendo sin decidir',
                    'Scroll o recomendaciones infinitas': 'Hace difícil sentir que el contenido ya terminó',
                    'Alertas y actividad nocturna': 'Puede retrasar la hora de dormir',
                    'Dispositivos fuera del cuarto': 'Ayuda a reducir el consumo nocturno',
                    'Avisar antes del final del tiempo': 'Reduce la frustración cuando toca apagar',
                    'Horarios fijos': 'Vuelven el límite más predecible y menos improvisado',
                },
            },
            explanation: 'Tip: El módulo 5 junta dos bloques: qué hace más difícil desconectarse y qué estrategias ayudan a bajar el conflicto y proteger la rutina.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'El problema no siempre es solo cuántas horas ve, sino si el streaming está desplazando [blank1], ejercicio, juego, escuela o convivencia. Una señal de alerta común es la [blank2] cuando se apaga la pantalla. Para la noche, se recomienda evitar pantallas antes de dormir y dejar los dispositivos fuera del [blank3]. Los límites suelen funcionar mejor cuando hay [blank4] claras y un plan familiar en vez de decisiones desde el [blank5].',
                bank: ['sueño', 'irritabilidad', 'cuarto', 'rutinas', 'enojo'],
                correctAnswer: {
                    blank1: 'sueño',
                    blank2: 'irritabilidad',
                    blank3: 'cuarto',
                    blank4: 'rutinas',
                    blank5: 'enojo',
                },
            },
            explanation: 'Tip: El módulo 5 insiste en mirar el equilibrio del día, las señales visibles y la necesidad de reglas consistentes en vez de improvisadas.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada observación según si describe mejor una señal de uso problemático o una estrategia saludable.',
            type: 'match_columns',
            metadata: {
                left: ['Señal de uso problemático', 'Estrategia saludable'],
                right: [
                    'Se enoja mucho al dejar el dispositivo',
                    'Pierde sueño por seguir viendo videos o directos',
                    'Solo quiere hablar de streamers o canales',
                    'Crear horarios claros para ver contenido',
                    'Mantener dispositivos fuera del cuarto',
                    'Ofrecer otra actividad al terminar el tiempo',
                ],
                correctAnswer: {
                    'Señal de uso problemático': [
                        'Se enoja mucho al dejar el dispositivo',
                        'Pierde sueño por seguir viendo videos o directos',
                        'Solo quiere hablar de streamers o canales',
                    ],
                    'Estrategia saludable': [
                        'Crear horarios claros para ver contenido',
                        'Mantener dispositivos fuera del cuarto',
                        'Ofrecer otra actividad al terminar el tiempo',
                    ],
                },
            },
            explanation: 'Tip: Algunas cosas muestran que el problema está creciendo; otras son herramientas concretas para intervenir antes de que empeore.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia útil para poner límites sin conflicto según el módulo 5.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Definir una regla clara y un horario predecible.',
                    'Avisar con anticipación que el tiempo está por terminar.',
                    'Acompañar el cierre de la actividad con calma.',
                    'Ofrecer una alternativa fuera de pantalla.',
                    'Mantener la regla con consistencia en lugar de cambiarla según el humor.',
                ],
                correctAnswer: [
                    'Definir una regla clara y un horario predecible.',
                    'Avisar con anticipación que el tiempo está por terminar.',
                    'Acompañar el cierre de la actividad con calma.',
                    'Ofrecer una alternativa fuera de pantalla.',
                    'Mantener la regla con consistencia en lugar de cambiarla según el humor.',
                ],
            },
            explanation: 'Tip: Este módulo propone anticipar, acompañar y sostener la regla, no aparecer de golpe solo cuando ya hay conflicto.',
            points: 8,
        },
        {
            text: 'Selecciona todas las medidas que sí se recomendaron en el módulo 5.',
            type: 'multiple_selection',
            options: [
                { text: 'Desactivar autoplay', isCorrect: true },
                { text: 'Evitar pantallas antes de dormir', isCorrect: true },
                { text: 'Mantener dispositivos fuera del cuarto', isCorrect: true },
                { text: 'Crear horarios claros para ver contenido', isCorrect: true },
                { text: 'Definir zonas y momentos sin pantallas', isCorrect: true },
                { text: 'Avisar antes del final del tiempo', isCorrect: true },
                { text: 'Esperar a que aparezca una pelea para recién poner reglas', isCorrect: false },
                { text: 'Cambiar las reglas todos los días según el ánimo del adulto', isCorrect: false },
                { text: 'Quitar todas las pantallas de golpe sin plan ni transición', isCorrect: false },
            ],
            explanation: 'Tip: La prevención en este módulo se apoya en estructura, sueño, anticipación y ejemplo adulto, no en castigos repentinos.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'Cuando el streaming desplaza sueño, ejercicio o convivencia, el problema ya no está solo en la [blank1], sino en el equilibrio general del [blank2]. Los límites funcionan mejor cuando hay reglas [blank3] y anticipadas. Además, no solo ayudan las reglas de no, también las reglas de [blank4].',
                options: {
                    blank1: ['pantalla', 'escuela', 'amistad'],
                    blank2: ['día', 'chat', 'canal'],
                    blank3: ['claras', 'ocultas', 'improvisadas'],
                    blank4: ['sí', 'miedo', 'castigo'],
                },
                correctAnswer: {
                    blank1: 'pantalla',
                    blank2: 'día',
                    blank3: 'claras',
                    blank4: 'sí',
                },
            },
            explanation: 'Tip: El módulo 5 no se queda en contar horas; se centra en equilibrio diario, rutinas claras y reglas comprensibles para el niño.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Autoplay',
                    'Alertas nocturnas',
                    'Irritabilidad al apagar',
                    'Pérdida de sueño',
                    'Plan familiar de pantallas',
                    'Avisar antes del final',
                    'Ejemplo adulto',
                    'Zonas sin pantallas',
                    'No hay alternativas fuera de pantalla',
                ],
                categories: ['Factor que engancha o complica', 'Señal de alerta', 'Respuesta protectora'],
                correctAnswer: {
                    'Factor que engancha o complica': [
                        'Autoplay',
                        'Alertas nocturnas',
                        'No hay alternativas fuera de pantalla',
                    ],
                    'Señal de alerta': [
                        'Irritabilidad al apagar',
                        'Pérdida de sueño',
                    ],
                    'Respuesta protectora': [
                        'Plan familiar de pantallas',
                        'Avisar antes del final',
                        'Ejemplo adulto',
                        'Zonas sin pantallas',
                    ],
                },
            },
            explanation: 'Tip: El módulo 5 separa lo que empuja a seguir conectado, lo que ya muestra desequilibrio y lo que la familia puede hacer para proteger la rutina.',
            points: 15,
        },
        {
            text: 'Caso: Un niño empieza a dormirse más tarde por seguir viendo directos, se enoja mucho cuando le piden apagar y la familia solo intenta poner límites cuando ya hay discusión. ¿Cuál es la respuesta más alineada con el módulo 5?',
            type: 'case_study',
            options: [
                { text: 'Desactivar autoplay, sacar el dispositivo del cuarto por la noche, crear horarios claros, avisar antes de terminar y sostener la regla con calma y consistencia.', isCorrect: true },
                { text: 'Esperar unas semanas para ver si se regula solo, porque la irritabilidad al apagar no es una señal útil para intervenir.', isCorrect: false },
                { text: 'Cambiar la hora límite todos los días según la conducta del niño, para que aprenda que el acceso depende del humor familiar.', isCorrect: false },
                { text: 'Enfocarse solo en contar cuántos minutos ve, sin revisar sueño, rutinas, alternativas fuera de pantalla ni forma de aplicar el límite.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une las dos partes del módulo 5: detectar señales de desequilibrio y aplicar límites predecibles que protejan sueño, rutina y convivencia sin depender de la pelea del momento.',
            points: 15,
        },
    ];

    const module6QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada herramienta o enfoque con su función principal según el módulo 6.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'YouTube Kids', value: 'Ofrece una experiencia más simple y limitada para niños' },
                    { key: 'Cuenta supervisada', value: 'Permite usar YouTube con nivel de contenido ajustado para preadolescentes' },
                    { key: 'Approved content only', value: 'Deja ver solo videos, canales y colecciones elegidos por el adulto' },
                    { key: 'Family Link', value: 'Ayuda a administrar ajustes, límites y restricciones desde un solo lugar' },
                    { key: 'Aprobación de compras', value: 'Añade una barrera antes de completar descargas o pagos' },
                    { key: 'Supervisión activa', value: 'Combina presencia, conversación y reglas claras sin invadir' },
                ],
                correctAnswer: {
                    'YouTube Kids': 'Ofrece una experiencia más simple y limitada para niños',
                    'Cuenta supervisada': 'Permite usar YouTube con nivel de contenido ajustado para preadolescentes',
                    'Approved content only': 'Deja ver solo videos, canales y colecciones elegidos por el adulto',
                    'Family Link': 'Ayuda a administrar ajustes, límites y restricciones desde un solo lugar',
                    'Aprobación de compras': 'Añade una barrera antes de completar descargas o pagos',
                    'Supervisión activa': 'Combina presencia, conversación y reglas claras sin invadir',
                },
            },
            explanation: 'Tip: El módulo 6 diferencia herramientas técnicas de YouTube y Google de la forma en que el adulto acompaña el uso digital en casa.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En niños pequeños, [blank1] ofrece una experiencia más limitada. En YouTube, la opción [blank2] permite que el adulto seleccione manualmente qué puede ver el menor. En Twitch, la edad mínima global es de [blank3] años. Acompañar sin invadir implica hacer [blank4] abiertas y explicar las [blank5] con claridad.',
                bank: ['YouTube Kids', 'Approved content only', '13', 'preguntas', 'reglas'],
                correctAnswer: {
                    blank1: 'YouTube Kids',
                    blank2: 'Approved content only',
                    blank3: '13',
                    blank4: 'preguntas',
                    blank5: 'reglas',
                },
            },
            explanation: 'Tip: El módulo 6 junta decisiones de configuración con una forma de acompañar basada en conversación y estructura.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada práctica según si describe mejor una herramienta de control o una forma de acompañamiento activo.',
            type: 'match_columns',
            metadata: {
                left: ['Herramienta de control', 'Acompañamiento activo'],
                right: [
                    'Usar Family Link para límites y ajustes',
                    'Activar aprobación de compras',
                    'Bloquear Whispers de desconocidos',
                    'Ver contenido juntos de vez en cuando',
                    'Preguntar qué canal le gusta y por qué',
                    'Explicar que puede pedir ayuda sin miedo',
                ],
                correctAnswer: {
                    'Herramienta de control': [
                        'Usar Family Link para límites y ajustes',
                        'Activar aprobación de compras',
                        'Bloquear Whispers de desconocidos',
                    ],
                    'Acompañamiento activo': [
                        'Ver contenido juntos de vez en cuando',
                        'Preguntar qué canal le gusta y por qué',
                        'Explicar que puede pedir ayuda sin miedo',
                    ],
                },
            },
            explanation: 'Tip: El módulo 6 insiste en que configurar y acompañar no compiten; se complementan.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia razonable para acompañar mejor a un menor en plataformas de streaming según el módulo 6.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Elegir el entorno adecuado según edad y madurez.',
                    'Revisar y ajustar herramientas como YouTube Kids, cuenta supervisada o Family Link.',
                    'Explicar reglas, horarios y límites con claridad.',
                    'Acompañar con presencia regular y conversaciones naturales.',
                    'Revisar de vez en cuando privacidad, ajustes y experiencias incómodas.',
                ],
                correctAnswer: [
                    'Elegir el entorno adecuado según edad y madurez.',
                    'Revisar y ajustar herramientas como YouTube Kids, cuenta supervisada o Family Link.',
                    'Explicar reglas, horarios y límites con claridad.',
                    'Acompañar con presencia regular y conversaciones naturales.',
                    'Revisar de vez en cuando privacidad, ajustes y experiencias incómodas.',
                ],
            },
            explanation: 'Tip: El módulo 6 propone empezar por una base técnica y luego sostenerla con conversación, presencia y revisiones periódicas.',
            points: 8,
        },
        {
            text: 'Selecciona todas las afirmaciones que sí están alineadas con lo enseñado en el módulo 6.',
            type: 'multiple_selection',
            options: [
                { text: 'YouTube ofrece herramientas más configurables para familias que Twitch', isCorrect: true },
                { text: 'En Twitch, bloquear Whispers de desconocidos puede reducir contacto de riesgo', isCorrect: true },
                { text: 'Family Link ayuda a administrar límites y algunos ajustes del menor', isCorrect: true },
                { text: 'Ver contenido juntos de vez en cuando puede abrir conversaciones útiles', isCorrect: true },
                { text: 'La supervisión activa incluye reglas claras, confianza y presencia regular', isCorrect: true },
                { text: 'Los controles parentales ayudan, pero no reemplazan la supervisión adulta', isCorrect: true },
                { text: 'Twitch funciona como un equivalente infantil de YouTube Kids', isCorrect: false },
                { text: 'Supervisar bien significa revisar a escondidas sin hablarlo', isCorrect: false },
                { text: 'Si un control parental está activado, ya no hace falta conversar con el menor', isCorrect: false },
            ],
            explanation: 'Tip: La idea central del módulo es combinar barreras técnicas con acompañamiento real, no elegir solo una de las dos cosas.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'En [blank1], la opción más limitada para niños es YouTube Kids. En [blank2], el foco está más en seguridad y supervisión porque no existe un modo infantil comparable. Cuando un adulto conversa, observa y comparte momentos digitales, está haciendo [blank3]. Si el menor siente que puede contar algo incómodo sin miedo, hay más [blank4].',
                options: {
                    blank1: ['YouTube', 'Twitch', 'televisión tradicional'],
                    blank2: ['Twitch', 'YouTube Kids', 'radio'],
                    blank3: ['supervisión activa', 'publicidad integrada', 'monetización'],
                    blank4: ['confianza', 'secreto', 'impulso de compra'],
                },
                correctAnswer: {
                    blank1: 'YouTube',
                    blank2: 'Twitch',
                    blank3: 'supervisión activa',
                    blank4: 'confianza',
                },
            },
            explanation: 'Tip: El módulo 6 contrasta herramientas de plataforma con la relación que el adulto construye con el menor.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'YouTube Kids',
                    'Cuenta supervisada',
                    'Approved content only',
                    'Bloquear Whispers de desconocidos',
                    'Preguntar qué ve y por qué le gusta',
                    'Ver contenido juntos de vez en cuando',
                    'Revisar privacidad periódicamente',
                    'Revisar a escondidas sin hablarlo',
                    'Explicar que puede pedir ayuda sin miedo',
                ],
                categories: ['Herramienta o ajuste', 'Supervisión activa saludable', 'Vigilancia invasiva'],
                correctAnswer: {
                    'Herramienta o ajuste': [
                        'YouTube Kids',
                        'Cuenta supervisada',
                        'Approved content only',
                        'Bloquear Whispers de desconocidos',
                    ],
                    'Supervisión activa saludable': [
                        'Preguntar qué ve y por qué le gusta',
                        'Ver contenido juntos de vez en cuando',
                        'Revisar privacidad periódicamente',
                        'Explicar que puede pedir ayuda sin miedo',
                    ],
                    'Vigilancia invasiva': [
                        'Revisar a escondidas sin hablarlo',
                    ],
                },
            },
            explanation: 'Tip: El módulo 6 separa bien tres planos: la configuración técnica, el acompañamiento sano y la vigilancia que rompe confianza.',
            points: 15,
        },
        {
            text: 'Caso: Un niño de primaria usa YouTube desde una cuenta sin ajustar. A veces entra a directos, no tiene límites claros y cuando un adulto se acerca cambia rápido de pantalla. Además, quiere abrir Twitch porque dice que ahí están sus streamers favoritos. ¿Cuál es la respuesta más alineada con el módulo 6?',
            type: 'case_study',
            options: [
                { text: 'Elegir un entorno más adecuado como YouTube Kids o una experiencia supervisada, revisar Family Link y compras, hablar con calma sobre lo que ve, acordar reglas claras y evitar que use Twitch de forma autónoma.', isCorrect: true },
                { text: 'Permitir que siga igual mientras el adulto revise a escondidas el historial, porque eso da más información que conversar o ajustar la cuenta.', isCorrect: false },
                { text: 'Abrir Twitch sin cambios porque lo importante es confiar en que el niño sabrá autorregularse si se le deja explorar solo.', isCorrect: false },
                { text: 'Concentrarse solo en poner una contraseña para compras, sin revisar entorno, chats, reglas ni formas de acompañamiento.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une lo técnico y lo relacional: elegir el entorno correcto, activar controles útiles, poner estructura y acompañar sin depender solo de vigilancia o confianza ciega.',
            points: 15,
        },
    ];

    const module7QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo 7 con su definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Aprendizaje guiado en YouTube', value: 'Uso de tutoriales y explicaciones elegidas con más control parental' },
                    { key: 'YouTube Kids', value: 'Experiencia más simple y limitada para niños' },
                    { key: 'Twitch en uso educativo', value: 'Puede aportar en temas creativos o en vivo, pero no es una plataforma autónoma para niños pequeños' },
                    { key: 'Fuente', value: 'Persona, canal, empresa o grupo que hizo el contenido' },
                    { key: 'Intención', value: 'Lo que el contenido busca hacer, como informar, entretener o vender' },
                    { key: 'Evidencia', value: 'Información o señales que ayudan a comprobar si algo parece cierto' },
                ],
                correctAnswer: {
                    'Aprendizaje guiado en YouTube': 'Uso de tutoriales y explicaciones elegidas con más control parental',
                    'YouTube Kids': 'Experiencia más simple y limitada para niños',
                    'Twitch en uso educativo': 'Puede aportar en temas creativos o en vivo, pero no es una plataforma autónoma para niños pequeños',
                    Fuente: 'Persona, canal, empresa o grupo que hizo el contenido',
                    Intención: 'Lo que el contenido busca hacer, como informar, entretener o vender',
                    Evidencia: 'Información o señales que ayudan a comprobar si algo parece cierto',
                },
            },
            explanation: 'Tip: El módulo 7 une dos ideas: usar plataformas para aprender y enseñar a los hijos a pensar críticamente sobre lo que ven.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Para niños de 6 a 12 años, [blank1] suele ser la opción más útil para aprendizaje guiado. Ver contenido [blank2] ayuda a comentar y reforzar lo aprendido. Relacionar el video con una actividad fuera de [blank3] convierte el contenido en experiencia real. Para pensar críticamente, conviene revisar la [blank4] y la [blank5] del contenido.',
                bank: ['YouTube', 'juntos', 'pantalla', 'fuente', 'intención'],
                correctAnswer: {
                    blank1: 'YouTube',
                    blank2: 'juntos',
                    blank3: 'pantalla',
                    blank4: 'fuente',
                    blank5: 'intención',
                },
            },
            explanation: 'Tip: El módulo 7 propone elegir mejor el contenido, acompañar el consumo y enseñar preguntas simples para evaluarlo mejor.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada práctica según si describe mejor un uso positivo del contenido o una pregunta de pensamiento crítico.',
            type: 'match_columns',
            metadata: {
                left: ['Uso positivo del contenido', 'Pregunta de pensamiento crítico'],
                right: [
                    'Elegir canales o temas concretos antes de abrir la plataforma',
                    'Ver algunos videos junto al hijo',
                    'Relacionar lo visto con una actividad fuera de pantalla',
                    '¿Quién hizo este video?',
                    '¿Quiere informar, entretener o vender algo?',
                    '¿Cómo sabemos que es cierto?',
                ],
                correctAnswer: {
                    'Uso positivo del contenido': [
                        'Elegir canales o temas concretos antes de abrir la plataforma',
                        'Ver algunos videos junto al hijo',
                        'Relacionar lo visto con una actividad fuera de pantalla',
                    ],
                    'Pregunta de pensamiento crítico': [
                        '¿Quién hizo este video?',
                        '¿Quiere informar, entretener o vender algo?',
                        '¿Cómo sabemos que es cierto?',
                    ],
                },
            },
            explanation: 'Tip: Este módulo enseña que aprovechar mejor una plataforma no depende solo del contenido, sino también de las preguntas que hacemos sobre él.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia útil para aprovechar una plataforma como herramienta de aprendizaje según el módulo 7.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Elegir un canal o tema concreto antes de abrir la plataforma.',
                    'Ver el contenido con algo de acompañamiento adulto.',
                    'Preguntar qué aprendió o qué le llamó la atención.',
                    'Relacionar lo visto con una actividad fuera de pantalla o una conversación.',
                    'Invitar a pensar si el contenido parecía confiable o exagerado.',
                ],
                correctAnswer: [
                    'Elegir un canal o tema concreto antes de abrir la plataforma.',
                    'Ver el contenido con algo de acompañamiento adulto.',
                    'Preguntar qué aprendió o qué le llamó la atención.',
                    'Relacionar lo visto con una actividad fuera de pantalla o una conversación.',
                    'Invitar a pensar si el contenido parecía confiable o exagerado.',
                ],
            },
            explanation: 'Tip: El módulo 7 propone pasar de abrir la plataforma sin rumbo a usarla con intención, conversación y seguimiento fuera de la pantalla.',
            points: 8,
        },
        {
            text: 'Selecciona todas las afirmaciones que sí están alineadas con lo enseñado en el módulo 7.',
            type: 'multiple_selection',
            options: [
                { text: 'YouTube suele ser más útil para aprendizaje guiado en niños de 6 a 12 años', isCorrect: true },
                { text: 'Ver contenido juntos puede fortalecer aprendizaje y criterio', isCorrect: true },
                { text: 'Conviene elegir canales o temas concretos antes de abrir la plataforma', isCorrect: true },
                { text: 'Comparar fuentes ayuda a no quedarse con una sola versión', isCorrect: true },
                { text: 'Preguntar quién hizo el video y con qué intención ayuda a pensar críticamente', isCorrect: true },
                { text: 'Twitch puede tener usos creativos, pero requiere mucha más cautela en menores', isCorrect: true },
                { text: 'Todo contenido que parezca educativo ya puede considerarse confiable', isCorrect: false },
                { text: 'Pensar críticamente significa desconfiar automáticamente de todo', isCorrect: false },
                { text: 'En niños pequeños, Twitch debería usarse como plataforma autónoma de aprendizaje', isCorrect: false },
            ],
            explanation: 'Tip: La idea del módulo no es prohibir todo ni creer todo, sino aprender a elegir mejor, acompañar y hacer preguntas útiles.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'En niños de primaria, [blank1] suele ser más práctico para aprendizaje guiado. [blank2] puede aportar en arte, música o tecnología en vivo, pero exige más cautela por su formato y edad mínima. Para ayudar al niño a no creer todo automáticamente, conviene revisar la [blank3] y buscar [blank4].',
                options: {
                    blank1: ['YouTube', 'Twitch', 'chat privado'],
                    blank2: ['Twitch', 'YouTube Kids', 'televisión abierta'],
                    blank3: ['fuente', 'popularidad', 'duración'],
                    blank4: ['evidencia', 'urgencia', 'más anuncios'],
                },
                correctAnswer: {
                    blank1: 'YouTube',
                    blank2: 'Twitch',
                    blank3: 'fuente',
                    blank4: 'evidencia',
                },
            },
            explanation: 'Tip: El módulo 7 diferencia la utilidad de cada plataforma y enseña preguntas simples para revisar mejor la información.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Ver un tutorial y luego practicar fuera de pantalla',
                    'Elegir un canal confiable antes de abrir la plataforma',
                    'Usar Twitch solo con supervisión y de forma puntual',
                    '¿Quién hizo este video?',
                    '¿Quiere enseñar, entretener o vender?',
                    '¿Cómo podríamos comprobarlo?',
                    'Repetir todo lo que dice un creador como si fuera cierto',
                    'Dejarse llevar por un título alarmista',
                    'Confundir entretenimiento con realidad',
                ],
                categories: ['Uso positivo', 'Pregunta crítica', 'Señal de alerta'],
                correctAnswer: {
                    'Uso positivo': [
                        'Ver un tutorial y luego practicar fuera de pantalla',
                        'Elegir un canal confiable antes de abrir la plataforma',
                        'Usar Twitch solo con supervisión y de forma puntual',
                    ],
                    'Pregunta crítica': [
                        '¿Quién hizo este video?',
                        '¿Quiere enseñar, entretener o vender?',
                        '¿Cómo podríamos comprobarlo?',
                    ],
                    'Señal de alerta': [
                        'Repetir todo lo que dice un creador como si fuera cierto',
                        'Dejarse llevar por un título alarmista',
                        'Confundir entretenimiento con realidad',
                    ],
                },
            },
            explanation: 'Tip: El módulo 7 separa tres planos: cómo usar mejor la plataforma, qué preguntas hacer y qué señales indican que falta más criterio.',
            points: 15,
        },
        {
            text: 'Caso: Una niña de 9 años ve videos de ciencia y manualidades en YouTube. Después empieza a repetir como verdad absoluta lo que dice un creador muy llamativo y quiere entrar sola a Twitch porque vio que ahí también hay contenido creativo. ¿Cuál es la respuesta más alineada con el módulo 7?',
            type: 'case_study',
            options: [
                { text: 'Mantener YouTube como espacio más guiado, elegir canales concretos, ver algunos contenidos juntos, preguntarle quién hizo el video y cómo podría comprobarlo, y dejar Twitch solo para usos puntuales con supervisión estrecha.', isCorrect: true },
                { text: 'Permitir que entre sola a Twitch para que desarrolle autonomía digital, porque el pensamiento crítico aparece mejor cuando el adulto no interviene.', isCorrect: false },
                { text: 'Asumir que si el contenido parece educativo no hace falta revisar fuente, intención ni exageración.', isCorrect: false },
                { text: 'Corregirla con regaños cada vez que repita algo incorrecto, sin hacer preguntas ni conversar sobre cómo distinguir información confiable.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta combina las dos partes del módulo 7: aprovechar YouTube de forma guiada para aprender y enseñar pensamiento crítico sin dejar a la niña sola frente a un entorno más abierto como Twitch.',
            points: 15,
        },
    ];

    const finalQuizQuestions = [
        {
            text: 'Módulo 1. Relaciona cada concepto base con su definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Streaming', value: 'Forma de ver videos o transmisiones por internet sin descargarlos' },
                    { key: 'YouTube', value: 'Plataforma centrada sobre todo en videos grabados y consumo a demanda' },
                    { key: 'Twitch', value: 'Plataforma centrada principalmente en transmisiones en vivo con chat' },
                    { key: 'Algoritmo', value: 'Sistema que detecta intereses y recomienda contenido parecido' },
                    { key: 'Reproducción automática', value: 'Función que reproduce otro contenido sin pausa clara' },
                ],
                correctAnswer: {
                    Streaming: 'Forma de ver videos o transmisiones por internet sin descargarlos',
                    YouTube: 'Plataforma centrada sobre todo en videos grabados y consumo a demanda',
                    Twitch: 'Plataforma centrada principalmente en transmisiones en vivo con chat',
                    Algoritmo: 'Sistema que detecta intereses y recomienda contenido parecido',
                    'Reproducción automática': 'Función que reproduce otro contenido sin pausa clara',
                },
            },
            explanation: 'Este reactivo retoma la base del curso: qué es streaming, en qué se parecen y diferencian YouTube y Twitch, y cómo el diseño de la plataforma sostiene el consumo.',
            points: 10,
        },
        {
            text: 'Módulo 2. Clasifica cada tipo de contenido según el impacto o riesgo que se explicó en el curso.',
            type: 'match_columns',
            metadata: {
                left: ['Gameplays', 'Retos y bromas', 'Vlogs'],
                right: [
                    'Pueden normalizar lenguaje agresivo o juegos no aptos',
                    'Pueden presentar humillación o conductas peligrosas',
                    'Pueden favorecer comparación y consumismo',
                ],
                correctAnswer: {
                    Gameplays: ['Pueden normalizar lenguaje agresivo o juegos no aptos'],
                    'Retos y bromas': ['Pueden presentar humillación o conductas peligrosas'],
                    Vlogs: ['Pueden favorecer comparación y consumismo'],
                },
            },
            explanation: 'Este reactivo sale del módulo 2: no todo formato impacta igual, y cada uno puede influir de forma distinta en conducta, emociones y autoimagen.',
            points: 10,
        },
        {
            text: 'Módulo 3. Selecciona todas las medidas de protección que sí se recomendaron frente a riesgos en YouTube y Twitch.',
            type: 'multiple_selection',
            options: [
                { text: 'Desactivar autoplay', isCorrect: true },
                { text: 'Revisar historial y recomendaciones', isCorrect: true },
                { text: 'Evitar que niños pequeños naveguen solos por directos', isCorrect: true },
                { text: 'Explicar que no deben compartir datos personales', isCorrect: true },
                { text: 'Acordar que si algo incomoda, se sale y se avisa', isCorrect: true },
                { text: 'Confiar en que una portada infantil siempre garantiza seguridad', isCorrect: false },
                { text: 'Permitir chats con desconocidos mientras el menor no se queje', isCorrect: false },
                { text: 'Suponer que una etiqueta de contenido maduro elimina todo riesgo', isCorrect: false },
            ],
            explanation: 'Este reactivo retoma el módulo 3: los riesgos aparecen por exposición y por interacción, así que la protección combina herramientas, límites y conversación clara.',
            points: 10,
        },
        {
            text: 'Módulo 4. Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En Twitch, los [blank1] funcionan como moneda digital dentro del chat. En YouTube, el [blank2] sirve para resaltar mensajes en vivo. Las membresías y algunas suscripciones pueden ser pagos [blank3]. Cuando un creador muestra un producto por un acuerdo comercial, hablamos de [blank4]. Si hay una [blank5] vinculada, la compra puede resultar mucho más fácil.',
                bank: ['Bits', 'Super Chat', 'recurrentes', 'promoción pagada', 'tarjeta'],
                correctAnswer: {
                    blank1: 'Bits',
                    blank2: 'Super Chat',
                    blank3: 'recurrentes',
                    blank4: 'promoción pagada',
                    blank5: 'tarjeta',
                },
            },
            explanation: 'Este reactivo resume el módulo 4: gasto digital, dinero real, pagos recurrentes y publicidad integrada al contenido.',
            points: 10,
        },
        {
            text: 'Módulo 5. Ordena una secuencia útil para establecer límites sin conflicto.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Definir una regla clara y un horario predecible.',
                    'Avisar con anticipación que el tiempo está por terminar.',
                    'Acompañar el cierre con calma.',
                    'Ofrecer una alternativa fuera de pantalla.',
                    'Mantener la regla con consistencia.',
                ],
                correctAnswer: [
                    'Definir una regla clara y un horario predecible.',
                    'Avisar con anticipación que el tiempo está por terminar.',
                    'Acompañar el cierre con calma.',
                    'Ofrecer una alternativa fuera de pantalla.',
                    'Mantener la regla con consistencia.',
                ],
            },
            explanation: 'Este reactivo recoge la lógica del módulo 5: anticipar, sostener y acompañar funciona mejor que improvisar límites desde el enojo.',
            points: 10,
        },
        {
            text: 'Módulo 6. Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'YouTube Kids',
                    'Family Link',
                    'Aprobación de compras',
                    'Bloquear Whispers de desconocidos',
                    'Ver contenido juntos de vez en cuando',
                    'Preguntar qué ve y por qué le gusta',
                    'Explicar que puede pedir ayuda sin miedo',
                    'Revisar a escondidas sin hablarlo',
                ],
                categories: ['Herramienta o ajuste', 'Supervisión activa saludable', 'Vigilancia invasiva'],
                correctAnswer: {
                    'Herramienta o ajuste': [
                        'YouTube Kids',
                        'Family Link',
                        'Aprobación de compras',
                        'Bloquear Whispers de desconocidos',
                    ],
                    'Supervisión activa saludable': [
                        'Ver contenido juntos de vez en cuando',
                        'Preguntar qué ve y por qué le gusta',
                        'Explicar que puede pedir ayuda sin miedo',
                    ],
                    'Vigilancia invasiva': [
                        'Revisar a escondidas sin hablarlo',
                    ],
                },
            },
            explanation: 'Este reactivo retoma el módulo 6: una familia protege mejor cuando combina herramientas concretas con presencia y conversación, no con espionaje.',
            points: 10,
        },
        {
            text: 'Módulo 7. Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'En niños de 6 a 12 años, [blank1] suele ser la opción más útil para aprendizaje guiado. [blank2] puede aportar en temas creativos, pero requiere mucha más cautela por su formato y edad mínima. Para no creer automáticamente lo que se ve, conviene revisar la [blank3] y buscar [blank4].',
                options: {
                    blank1: ['YouTube', 'Twitch', 'chat privado'],
                    blank2: ['Twitch', 'YouTube Kids', 'televisión abierta'],
                    blank3: ['fuente', 'duración', 'popularidad'],
                    blank4: ['evidencia', 'urgencia', 'repetición'],
                },
                correctAnswer: {
                    blank1: 'YouTube',
                    blank2: 'Twitch',
                    blank3: 'fuente',
                    blank4: 'evidencia',
                },
            },
            explanation: 'Este reactivo recoge dos ideas del módulo 7: uso positivo con criterio y pensamiento crítico frente a lo que parece real o confiable.',
            points: 10,
        },
        {
            text: 'Curso completo. Selecciona todas las ideas que sí quedaron enseñadas a lo largo del curso.',
            type: 'multiple_selection',
            options: [
                { text: 'Los algoritmos pueden llevar al niño a contenido que no buscó directamente', isCorrect: true },
                { text: 'No todo contenido entretiene o influye de la misma forma', isCorrect: true },
                { text: 'Las compras digitales pueden sentirse menos reales cuando usan moneda virtual', isCorrect: true },
                { text: 'Los límites funcionan mejor cuando son claros, anticipados y consistentes', isCorrect: true },
                { text: 'Los controles parentales ayudan, pero no sustituyen la supervisión adulta', isCorrect: true },
                { text: 'Pensar críticamente implica revisar fuente, intención y evidencia', isCorrect: true },
                { text: 'Todo lo que parece educativo puede considerarse confiable sin revisión', isCorrect: false },
                { text: 'Si el niño no pide ayuda, no hace falta revisar su entorno digital nunca', isCorrect: false },
                { text: 'Una etiqueta comercial garantiza que un niño comprenderá la intención de venta por sí solo', isCorrect: false },
            ],
            explanation: 'Este reactivo integra el curso: diseño de plataforma, impacto del contenido, compras, límites, acompañamiento y pensamiento crítico.',
            points: 10,
        },
        {
            text: 'Curso completo. Clasifica cada elemento según si describe mejor un uso positivo o un riesgo / señal de alerta.',
            type: 'match_columns',
            metadata: {
                left: ['Uso positivo o protector', 'Riesgo o señal de alerta'],
                right: [
                    'Ver un tutorial y luego practicar fuera de pantalla',
                    'Comparar dos fuentes antes de creer algo',
                    'Elegir canales concretos antes de abrir la plataforma',
                    'Repetir todo lo que dice un creador como si fuera cierto',
                    'Dejarse llevar por títulos alarmistas',
                    'Querer pagar para que el streamer lo note',
                ],
                correctAnswer: {
                    'Uso positivo o protector': [
                        'Ver un tutorial y luego practicar fuera de pantalla',
                        'Comparar dos fuentes antes de creer algo',
                        'Elegir canales concretos antes de abrir la plataforma',
                    ],
                    'Riesgo o señal de alerta': [
                        'Repetir todo lo que dice un creador como si fuera cierto',
                        'Dejarse llevar por títulos alarmistas',
                        'Querer pagar para que el streamer lo note',
                    ],
                },
            },
            explanation: 'Este reactivo cruza módulos distintos: uso positivo, pensamiento crítico y señales que piden más acompañamiento o supervisión.',
            points: 10,
        },
        {
            text: 'Curso completo. Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Supervisar bien no es solo contar [blank1]. También importa qué tipo de contenido ve el niño, cómo lo afecta y qué lugar ocupa en su [blank2]. Si aparece un producto dentro del contenido, conviene revisar si hay intención [blank3]. Si algo parece dudoso, es útil hacer una pausa, mirar la [blank4] y buscar más [blank5].',
                bank: ['minutos', 'rutina', 'comercial', 'fuente', 'evidencia'],
                correctAnswer: {
                    blank1: 'minutos',
                    blank2: 'rutina',
                    blank3: 'comercial',
                    blank4: 'fuente',
                    blank5: 'evidencia',
                },
            },
            explanation: 'Este reactivo integra módulos sobre tiempo de pantalla, impacto del contenido, publicidad y pensamiento crítico.',
            points: 10,
        },
        {
            text: 'Caso integrador 1. Un niño de 10 años entra a Twitch para ver a su streamer favorito, quiere mandar Bits para que lo lea, se enoja mucho cuando le piden apagar y además se interesa por hablar en el chat. ¿Cuál es la respuesta más alineada con lo enseñado en el curso?',
            type: 'case_study',
            options: [
                { text: 'Explicar que los Bits cuestan dinero real, evitar que use Twitch de forma autónoma, reforzar reglas claras de horario, cortar la interacción de riesgo y acompañar con una alternativa más guiada y segura.', isCorrect: true },
                { text: 'Permitir todo mientras el gasto sea pequeño, porque lo importante es que el niño se sienta cerca del creador y aprenda a manejarlo solo.', isCorrect: false },
                { text: 'Concentrarse solo en desactivar compras, sin revisar chat, edad, rutina ni acompañamiento adulto.', isCorrect: false },
                { text: 'Quitar toda pantalla de golpe sin conversación ni plan, para que el niño entienda que Twitch siempre es malo.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une varios módulos: monetización, interacción con desconocidos, uso problemático, control parental y acompañamiento según la edad.',
            points: 10,
        },
        {
            text: 'Caso integrador 2. Una niña de primaria ve videos de ciencia y manualidades en YouTube, pero empieza a creer todo lo que dice un creador muy llamativo y comparte datos sin revisar si lo que vio era exagerado. ¿Cuál es la respuesta más alineada con el curso?',
            type: 'case_study',
            options: [
                { text: 'Mantener YouTube como espacio guiado, elegir canales más confiables, ver algunos contenidos juntos, preguntar quién hizo el video, qué intención tenía y cómo podrían comprobar la información antes de compartirla.', isCorrect: true },
                { text: 'Asumir que si el contenido parece educativo ya no hace falta revisar fuente, intención ni evidencia.', isCorrect: false },
                { text: 'Corregirla solo con regaños para que aprenda a no equivocarse, sin conversar sobre pensamiento crítico.', isCorrect: false },
                { text: 'Pasarla a Twitch para que aprenda a distinguir mejor la información por su cuenta en un entorno más abierto.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma el uso positivo del módulo 7 y la idea transversal del curso: acompañar, elegir mejor el contenido y enseñar al niño a pensar antes de creer o compartir.',
            points: 10,
        },
    ];

    const courseDefinitions = [
        {
            title: 'Introducción al streaming y consumo infantil',
            description: 'Objetivo: Que los padres entiendan qué son las plataformas y por qué los niños las usan tanto.',
            duration: '20 min',
            riskAreas: ['Consumo infantil', 'Algoritmos y recomendaciones'],
            quiz: {
                title: 'Examen del Módulo 1: Introducción al streaming y consumo infantil',
                description: 'Demuestra que comprendes los conceptos base de YouTube, Twitch y el atractivo del streaming antes de avanzar.',
                minPassing: 80,
                questions: module1QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: ¿Qué son YouTube y Twitch y cómo funcionan?',
                    type: 'article',
                    duration: 6,
                    content: module1Article1Content,
                    teaches: ['youtube', 'twitch', 'streaming', 'algoritmo', 'reproducción automática', 'chat en vivo', 'contenido inapropiado', 'consumo excesivo', 'rol de los padres'],
                },
                {
                    title: 'Video 1: Explicación visual de YouTube vs Twitch (cómo consumen contenido los niños)',
                    type: 'video',
                    duration: 4,
                    teaches: ['youtube', 'twitch', 'consumo infantil', 'videos', 'directos'],
                },
                {
                    title: 'Artículo 2: ¿Por qué el streaming es tan atractivo para niños y adolescentes?',
                    type: 'article',
                    duration: 6,
                    content: module1Article2Content,
                    teaches: ['recompensa inmediata', 'dopamina', 'contenido infinito', 'algoritmo', 'personalización', 'creadores', 'chat en vivo', 'límites', 'uso problemático'],
                },
                {
                    title: 'Video 2: Cómo los algoritmos mantienen a los niños viendo contenido',
                    type: 'video',
                    duration: 5,
                    teaches: ['algoritmo', 'recomendaciones', 'autoplay', 'atención'],
                },
            ],
        },
        {
            title: 'Tipos de contenido y su impacto en los niños',
            description: 'Objetivo: Identificar qué ven los niños y cómo influye en su comportamiento.',
            duration: '22 min',
            riskAreas: ['Impacto del contenido', 'Conducta y emociones'],
            quiz: {
                title: 'Examen del Módulo 2: Tipos de contenido y su impacto en los niños',
                description: 'Demuestra que puedes identificar tipos de contenido, riesgos e impacto en emociones, conducta y rutina antes de avanzar.',
                minPassing: 80,
                questions: module2QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Tipos de contenido en YouTube y Twitch (gameplays, retos, reacciones, vlogs)',
                    type: 'article',
                    duration: 6,
                    content: module2Article1Content,
                    teaches: ['gameplays', 'retos y bromas', 'reacciones', 'vlogs', 'tutoriales', 'directos en vivo', 'lenguaje agresivo', 'imitación', 'comparación', 'consumismo', 'contenido educativo', 'supervisión del contenido'],
                },
                {
                    title: 'Video 1: Ejemplos visuales de contenido popular entre niños',
                    type: 'video',
                    duration: 4,
                    teaches: ['contenido popular', 'niños', 'youtube', 'twitch'],
                },
                {
                    title: 'Artículo 2: Influencia del contenido en emociones, conducta y desarrollo',
                    type: 'article',
                    duration: 6,
                    content: module2Article2Content,
                    teaches: ['emociones', 'conducta', 'autoimagen', 'rutina diaria', 'imitación', 'comparación', 'autoestima', 'sueño', 'convivencia', 'calidad del contenido', 'señales de alerta', 'acompañamiento adulto'],
                },
                {
                    title: 'Video 2: Cómo el contenido afecta el comportamiento infantil',
                    type: 'video',
                    duration: 5,
                    teaches: ['comportamiento infantil', 'influencia', 'emociones'],
                },
            ],
        },
        {
            title: 'Riesgos en plataformas de streaming',
            description: 'Objetivo: Detectar los principales peligros digitales.',
            duration: '22 min',
            riskAreas: ['Riesgos en streaming', 'Interacción con desconocidos'],
            quiz: {
                title: 'Examen del Módulo 3: Riesgos en plataformas de streaming',
                description: 'Comprueba que puedes reconocer riesgos de exposición, interacción y señales de alerta en YouTube y Twitch.',
                minPassing: 80,
                questions: module3QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Exposición a contenido inapropiado y algoritmos sin control',
                    type: 'article',
                    duration: 6,
                    content: module3Article1Content,
                    teaches: ['contenido inapropiado', 'recomendaciones automáticas', 'autoplay', 'contenido en vivo', 'exposición accidental', 'violencia', 'lenguaje ofensivo', 'retos peligrosos', 'desinformación', 'youtube kids', 'cuentas supervisadas', 'supervisión adulta'],
                },
                {
                    title: 'Video 1: Cómo un video lleva a otro (efecto cadena del algoritmo)',
                    type: 'video',
                    duration: 4,
                    teaches: ['efecto cadena', 'algoritmo', 'recomendaciones'],
                },
                {
                    title: 'Artículo 2: Interacción con desconocidos y riesgos en transmisiones en vivo',
                    type: 'article',
                    duration: 6,
                    content: module3Article2Content,
                    teaches: ['desconocidos', 'chat en vivo', 'comentarios', 'mensajes fuera de la plataforma', 'cercanía digital', 'grooming', 'sextorsión', 'datos personales', 'secretismo', 'supervisión en directos', 'pedir ayuda', 'límites seguros'],
                },
                {
                    title: 'Video 2: Casos reales de riesgos en chats y streaming',
                    type: 'video',
                    duration: 5,
                    teaches: ['chat', 'streaming', 'riesgos reales'],
                },
            ],
        },
        {
            title: 'Monetización, publicidad y engaños',
            description: 'Objetivo: Comprender cómo las plataformas generan dinero y los riesgos asociados.',
            duration: '20 min',
            riskAreas: ['Monetización', 'Publicidad engañosa'],
            quiz: {
                title: 'Examen del Módulo 4: Monetización, publicidad y engaños',
                description: 'Comprueba que puedes reconocer funciones de pago, riesgos de gasto y publicidad integrada en YouTube y Twitch.',
                minPassing: 80,
                questions: module4QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Donaciones, suscripciones y gastos dentro de YouTube y Twitch',
                    type: 'article',
                    duration: 6,
                    content: module4Article1Content,
                    teaches: ['super chat', 'super stickers', 'membresías', 'suscripciones', 'gift subs', 'bits', 'pagos recurrentes', 'moneda digital', 'tarjeta vinculada', 'aprobación de compras', 'compras impulsivas', 'dinero real'],
                },
                {
                    title: 'Video 1: Cómo funcionan los pagos en streaming (Superchat, Bits, suscripciones)',
                    type: 'video',
                    duration: 4,
                    teaches: ['superchat', 'bits', 'suscripciones', 'pagos'],
                },
                {
                    title: 'Artículo 2: Publicidad engañosa, influencers y contenido patrocinado',
                    type: 'article',
                    duration: 6,
                    content: module4Article2Content,
                    teaches: ['publicidad integrada', 'influencers', 'promoción pagada', 'productos etiquetados', 'gameplay patrocinado', 'unboxing patrocinado', 'enlaces afiliados', 'contenido de marca', 'divulgación clara', 'intención comercial', 'pensamiento crítico', 'compra impulsiva'],
                },
                {
                    title: 'Video 2: Cómo identificar publicidad oculta en videos',
                    type: 'video',
                    duration: 5,
                    teaches: ['publicidad oculta', 'videos', 'patrocinio'],
                },
            ],
        },
        {
            title: 'Tiempo de pantalla y uso problemático',
            description: 'Objetivo: Detectar adicción digital y establecer límites saludables.',
            duration: '20 min',
            riskAreas: ['Tiempo de pantalla', 'Uso problemático'],
            quiz: {
                title: 'Examen del Módulo 5: Tiempo de pantalla y uso problemático',
                description: 'Comprueba que puedes reconocer señales de uso problemático y aplicar límites saludables sin conflicto.',
                minPassing: 80,
                questions: module5QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Cómo el streaming puede generar adicción y dependencia',
                    type: 'article',
                    duration: 6,
                    content: module5Article1Content,
                    teaches: ['uso problemático', 'autoplay', 'scroll infinito', 'alertas nocturnas', 'recompensa rápida', 'sueño', 'irritabilidad', 'autorregulación', 'desplazamiento de actividades', 'dispositivos fuera del cuarto', 'horarios claros', 'rutina'],
                },
                {
                    title: 'Video 1: Señales de alerta de uso excesivo en niños',
                    type: 'video',
                    duration: 4,
                    teaches: ['uso excesivo', 'señales de alerta', 'niños'],
                },
                {
                    title: 'Artículo 2: Estrategias para establecer límites sin conflicto',
                    type: 'article',
                    duration: 6,
                    content: module5Article2Content,
                    teaches: ['reglas claras', 'horarios fijos', 'zonas sin pantallas', 'autoplay', 'notificaciones', 'avisar antes', 'rutinas', 'ejemplo adulto', 'reglas de sí', 'plan familiar de pantallas', 'alternativas fuera de pantalla', 'consistencia'],
                },
                {
                    title: 'Video 2: Cómo crear reglas familiares de uso digital',
                    type: 'video',
                    duration: 5,
                    teaches: ['reglas familiares', 'uso digital', 'límites'],
                },
            ],
        },
        {
            title: 'Control parental y acompañamiento',
            description: 'Objetivo: Dar herramientas prácticas para supervisión efectiva.',
            duration: '22 min',
            riskAreas: ['Control parental', 'Acompañamiento familiar'],
            quiz: {
                title: 'Examen del Módulo 6: Control parental y acompañamiento',
                description: 'Comprueba que puedes usar herramientas parentales y aplicar supervisión activa sin invadir.',
                minPassing: 80,
                questions: module6QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Controles parentales en YouTube y Twitch (configuración y uso)',
                    type: 'article',
                    duration: 6,
                    content: module6Article1Content,
                    teaches: [
                        'controles parentales',
                        'youtube kids',
                        'cuenta supervisada',
                        'family link',
                        'family center',
                        'approved content only',
                        'aprobación de compras',
                        'google play',
                        'twitch',
                        'whispers',
                        'bloquear usuarios',
                        'reportar usuarios',
                        'edad mínima',
                        'supervisión adulta',
                    ],
                },
                {
                    title: 'Video 1: Paso a paso para activar controles parentales',
                    type: 'video',
                    duration: 4,
                    teaches: ['activar controles parentales', 'configuración', 'familia'],
                },
                {
                    title: 'Artículo 2: Supervisión activa: cómo acompañar sin invadir',
                    type: 'article',
                    duration: 6,
                    content: module6Article2Content,
                    teaches: [
                        'supervisión activa',
                        'co-viewing',
                        'confianza',
                        'preguntas abiertas',
                        'reglas claras',
                        'privacidad',
                        'ejemplo adulto',
                        'planes familiares',
                        'horarios claros',
                        'zonas sin pantallas',
                        'pedir ayuda',
                        'acompañamiento digital',
                    ],
                },
                {
                    title: 'Video 2: Cómo hablar con tus hijos sobre lo que ven en internet',
                    type: 'video',
                    duration: 5,
                    teaches: ['conversación familiar', 'internet', 'acompañamiento'],
                },
            ],
        },
        {
            title: 'Uso positivo y educación digital',
            description: 'Objetivo: Transformar el streaming en una herramienta educativa.',
            duration: '20 min',
            riskAreas: ['Uso positivo', 'Educación digital'],
            quiz: {
                title: 'Examen del Módulo 7: Uso positivo y educación digital',
                description: 'Comprueba que puedes aprovechar plataformas para aprender y enseñar pensamiento crítico frente al contenido digital.',
                minPassing: 80,
                questions: module7QuizQuestions,
            },
            lessons: [
                {
                    title: 'Artículo 1: Cómo usar YouTube y Twitch para aprender (contenido educativo)',
                    type: 'article',
                    duration: 6,
                    content: module7Article1Content,
                    teaches: [
                        'aprendizaje guiado',
                        'contenido educativo',
                        'youtube',
                        'youtube kids',
                        'experiencias supervisadas',
                        'twitch',
                        'edad mínima',
                        'tutoriales',
                        'canales confiables',
                        'ver juntos',
                        'actividad fuera de pantalla',
                        'pensamiento crítico',
                        'uso positivo',
                        'supervisión puntual',
                    ],
                },
                {
                    title: 'Video 1: Ejemplos de canales educativos recomendados',
                    type: 'video',
                    duration: 4,
                    teaches: ['canales educativos', 'aprendizaje', 'recomendaciones'],
                },
                {
                    title: 'Artículo 2: Fomentar pensamiento crítico en niños frente al contenido digital',
                    type: 'article',
                    duration: 6,
                    content: module7Article2Content,
                    teaches: [
                        'pensamiento crítico',
                        'fuente',
                        'intención',
                        'evidencia',
                        'exageración',
                        'manipulación',
                        'desinformación',
                        'publicidad',
                        'edición',
                        'comparar fuentes',
                        'conversaciones abiertas',
                        'verificación',
                        'criterio propio',
                    ],
                },
                {
                    title: 'Video 2: Cómo enseñar a los niños a cuestionar lo que ven',
                    type: 'video',
                    duration: 5,
                    teaches: ['preguntar', 'cuestionar contenido', 'educación digital'],
                },
            ],
        },
    ];

    const finalQuizDefinition = {
        title: 'Examen Final Integrador: Plataformas de Streaming â€” YouTube y Twitch',
        description: 'EvaluaciÃ³n final del curso con 12 reactivos mixtos y cobertura transversal de los 7 mÃ³dulos.',
        minPassing: 80,
        questions: finalQuizQuestions,
    };

    return {
        desiredCourseTitle,
        legacyCourseTitles,
        placeholderVideoUrl,
        buildArticleContent,
        buildVideoContent,
        courseDefinitions,
        finalQuizDefinition,
    };
};

async function seedStreamingCourse(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models } = context;
    const { Course, Lesson, Module, Quiz, Question } = models;
    const {
        desiredCourseTitle,
        legacyCourseTitles,
        placeholderVideoUrl,
        buildArticleContent,
        buildVideoContent,
        courseDefinitions,
        finalQuizDefinition,
    } = buildStreamingCatalog();

    const purgeQuizArtifacts = async ({ refId, scope }) => {
        const quizzes = await Quiz.find({ refId, scope }).select('_id');
        const quizIds = quizzes.map((quiz) => quiz._id);

        if (quizIds.length > 0) {
            await Question.deleteMany({ quizId: { $in: quizIds } });
            await Quiz.deleteMany({ _id: { $in: quizIds } });
        }
    };

    const purgeModuleArtifacts = async (moduleId) => {
        await Lesson.deleteMany({ moduleId });
        await purgeQuizArtifacts({ refId: moduleId, scope: 'module' });
    };

    const purgeCourseArtifacts = async (courseId) => {
        const modules = await Module.find({ courseId }).select('_id');

        for (const moduleRecord of modules) {
            await purgeModuleArtifacts(moduleRecord._id);
        }

        await Module.deleteMany({ courseId });
        await Lesson.deleteMany({ courseId });
        await purgeQuizArtifacts({ refId: courseId, scope: 'course' });
    };

    const matchingCourses = await Course.find({
        title: { $in: [desiredCourseTitle, ...legacyCourseTitles] },
    }).sort({ createdAt: 1 });

    let courseStreaming = matchingCourses[0];

    if (!courseStreaming) {
        courseStreaming = await Course.create({
            title: desiredCourseTitle,
            description: 'Curso práctico para entender YouTube y Twitch, revisar riesgos, acompañar el consumo infantil y convertir estas plataformas en herramientas más seguras y útiles.',
            category: 'Streaming',
            platforms: ['YouTube', 'Twitch'],
            riskAreas: [
                'Consumo infantil',
                'Impacto del contenido',
                'Riesgos en streaming',
                'Monetización y publicidad',
                'Tiempo de pantalla',
                'Control parental',
                'Educación digital',
            ],
            status: 'published',
            duration: '7 módulos',
        });
        console.log(`(+) Course Created: ${desiredCourseTitle}`);
    } else {
        courseStreaming.title = desiredCourseTitle;
        courseStreaming.description = 'Curso práctico para entender YouTube y Twitch, revisar riesgos, acompañar el consumo infantil y convertir estas plataformas en herramientas más seguras y útiles.';
        courseStreaming.category = 'Streaming';
        courseStreaming.platforms = ['YouTube', 'Twitch'];
        courseStreaming.riskAreas = [
            'Consumo infantil',
            'Impacto del contenido',
            'Riesgos en streaming',
            'Monetización y publicidad',
            'Tiempo de pantalla',
            'Control parental',
            'Educación digital',
        ];
        courseStreaming.status = 'published';
        courseStreaming.duration = '7 módulos';
        await courseStreaming.save();
        console.log(`(.) Course Updated: ${desiredCourseTitle}`);
    }

    if (matchingCourses.length > 1) {
        for (const duplicateCourse of matchingCourses.slice(1)) {
            await purgeCourseArtifacts(duplicateCourse._id);
            await Course.deleteOne({ _id: duplicateCourse._id });
            console.log(`  (-) Duplicate course removed: ${duplicateCourse.title}`);
        }
    }

    await purgeCourseArtifacts(courseStreaming._id);
    console.log('  (-) Old lessons, modules and quizzes for the streaming course were removed.');

    for (const moduleDefinition of courseDefinitions) {
        const moduleRecord = await getOrCreateModule(courseStreaming._id, {
            title: moduleDefinition.title,
            description: moduleDefinition.description,
            duration: moduleDefinition.duration,
        });

        const lessonIds = [];

        for (const lessonDefinition of moduleDefinition.lessons) {
            const isArticle = lessonDefinition.type === 'article';
            const lessonRecord = await getOrCreateLesson(moduleRecord._id, courseStreaming._id, {
                title: lessonDefinition.title,
                content: lessonDefinition.content || (
                    isArticle
                        ? buildArticleContent({
                            moduleTitle: moduleDefinition.title,
                            objective: moduleDefinition.description,
                            lessonTitle: lessonDefinition.title,
                        })
                        : buildVideoContent({
                            moduleTitle: moduleDefinition.title,
                            objective: moduleDefinition.description,
                            lessonTitle: lessonDefinition.title,
                        })
                ),
                type: lessonDefinition.type,
                duration: lessonDefinition.duration,
                videoUrl: lessonDefinition.type === 'video' ? placeholderVideoUrl : undefined,
                platforms: ['YouTube', 'Twitch'],
                riskAreas: moduleDefinition.riskAreas,
                teaches: lessonDefinition.teaches,
            });

            lessonIds.push(lessonRecord._id);
        }

        moduleRecord.lessonOrder = lessonIds;

        if (moduleDefinition.quiz) {
            const quizRecord = await getOrCreateQuiz({
                title: moduleDefinition.quiz.title,
                description: moduleDefinition.quiz.description,
                scope: 'module',
                refId: moduleRecord._id,
                scopeModel: 'Module',
                minPassing: moduleDefinition.quiz.minPassing,
            }, moduleDefinition.quiz.questions);

            moduleRecord.quizId = quizRecord._id;
        } else {
            moduleRecord.quizId = undefined;
        }

        await moduleRecord.save();
    }

    const finalQuiz = await getOrCreateQuiz({
        title: finalQuizDefinition.title,
        description: finalQuizDefinition.description,
        scope: 'course',
        refId: courseStreaming._id,
        scopeModel: 'Course',
        minPassing: finalQuizDefinition.minPassing,
    }, finalQuizDefinition.questions);

    courseStreaming.finalQuizId = finalQuiz._id;
    await courseStreaming.save();

    console.log('Curso 2 de streaming reestructurado con 7 módulos y 28 lecciones.');
}

seedStreamingCourse.buildCatalog = buildStreamingCatalog;

module.exports = seedStreamingCourse;
