const buildSocialCatalog = () => {
    const placeholderVideoUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';

    const lessonOverrides = {
        module1Article1: {
            content: `# ¿Qué son TikTok, Discord e Instagram y cómo funcionan?

Muchos padres escuchan que sus hijos usan TikTok, Discord o Instagram y piensan que todas funcionan igual. No es así. Aunque las tres forman parte del entorno digital social, cada una tiene una lógica distinta: una está centrada en videos breves, otra en comunidades y conversación, y otra en perfiles, publicaciones y mensajería.

Entender esa diferencia es el primer paso para acompañar mejor a los menores.

## Lo más importante

TikTok, Discord e Instagram no solo entretienen. También organizan cómo los menores descubren contenido, hablan con otras personas, comparten información y construyen identidad en línea.

Por eso, para supervisarlas bien, no basta con saber sus nombres. Hay que entender qué hacen, cómo atrapan la atención y qué tipo de interacción permiten.

## Comparación rápida

| Plataforma | En qué se centra | Qué suele hacer el menor | Qué debe entender un padre |
| --- | --- | --- | --- |
| TikTok | Videos cortos recomendados por algoritmo | Ver, deslizar, repetir tendencias y comentar | El algoritmo decide gran parte de lo que aparece |
| Discord | Chats, servidores, voz, video y comunidades | Hablar, jugar, entrar a grupos y mandar mensajes | La interacción con otras personas es el centro |
| Instagram | Perfil, fotos, videos, historias y mensajes | Publicar, mirar cuentas, reaccionar y chatear | Mezcla imagen, privacidad, comparación social y mensajería |

## 1. TikTok: videos breves y contenido constante

TikTok funciona principalmente como un flujo continuo de videos cortos. El menor ve uno, desliza, aparece otro y así sucesivamente.

Lo que más conviene entender aquí es que la experiencia depende mucho del algoritmo. La plataforma aprende rápido qué llama la atención y muestra más de eso.

### Qué debe notar un padre
* El contenido aparece de forma muy rápida y continua.
* El algoritmo influye mucho en lo que el menor termina viendo.
* La plataforma ofrece herramientas como Sincronización familiar, límites de tiempo y horarios de descanso.

## 2. Discord: comunidades, servidores y conversación

Discord se parece menos a una red para "mirar" y más a una plataforma para hablar y convivir con otras personas. Aquí lo importante suelen ser los servidores, canales, mensajes directos, llamadas de voz y comunidades.

Por eso, en Discord la supervisión no gira tanto alrededor de publicaciones, sino de interacción.

### Qué debe notar un padre
* El menor puede entrar a grupos o comunidades muy distintas entre sí.
* La conversación y el contacto con otras personas son una parte central.
* Family Center ayuda a acompañar la actividad, pero no permite leer mensajes privados.

## 3. Instagram: imagen, publicaciones y vida social digital

Instagram combina publicaciones, historias, videos, mensajes y seguimiento de cuentas. No es solo una app para subir fotos: también funciona como un espacio de interacción social, exposición de imagen personal y búsqueda de aprobación.

Para muchos menores, Instagram se vuelve un lugar donde comparan su vida con la de otros, siguen tendencias y observan cómo se presentan otras personas en línea.

### Qué debe notar un padre
* La privacidad del perfil importa mucho.
* La imagen personal y la comparación social pesan bastante.
* Las Teen Accounts ayudan a activar configuraciones más protectoras para adolescentes.

## 4. No todas se supervisan igual

Aunque las tres son redes sociales, no requieren exactamente la misma atención:

* En TikTok conviene mirar mucho el algoritmo y el tiempo de uso.
* En Discord conviene mirar con quién habla el menor y en qué comunidades participa.
* En Instagram conviene mirar privacidad, exposición de imagen e interacción social.

Supervisar bien no significa aplicar la misma regla a todo, sino entender el tipo de experiencia que ofrece cada plataforma.

## Señal de alerta

Un error común es pensar que "si solo está viendo cosas" no hay riesgo. En una misma tarde, un menor puede pasar de consumir videos en TikTok a hablar con personas en Discord y luego compararse con otros perfiles en Instagram.

Cada plataforma abre riesgos distintos, aunque desde fuera parezcan parte del mismo tiempo de pantalla.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Identificar qué plataforma usa más el menor | Permite supervisar con más precisión |
| Entender primero la función principal de cada app | Evita reglas genéricas que no sirven |
| Revisar las herramientas parentales oficiales | Ayuda a configurar límites reales |
| Distinguir entre ver, publicar e interactuar | Mejora la conversación con el hijo |
| Acompañar antes de prohibir | Favorece confianza y cooperación |

## Preguntas útiles para conversar en casa

1. ¿Cuál de estas apps usas más y para qué?
2. ¿La usas más para ver cosas, hablar con gente o subir contenido?
3. ¿Qué te gusta más de esa plataforma?
4. ¿Conoces sus opciones de privacidad o seguridad?
5. ¿Te gustaría que la revisáramos juntos?

## Idea clave

TikTok, Discord e Instagram no hacen lo mismo. Una se centra en videos recomendados por algoritmo, otra en comunidades y conversación, y otra en imagen, publicaciones y mensajería.

Cuando un padre entiende esa diferencia, deja de supervisar "pantallas" en general y empieza a acompañar con más criterio cada entorno digital.

## Cierre

Antes de hablar de riesgos como ciberacoso, grooming o presión social, conviene entender el terreno. TikTok, Discord e Instagram tienen lógicas distintas, herramientas distintas y formas distintas de influir en la experiencia de un menor.

Comprender cómo funcionan no resuelve todo, pero sí ayuda a hacer mejores preguntas, poner reglas más inteligentes y prevenir antes de reaccionar tarde.`,
            teaches: [
                'tiktok',
                'discord',
                'instagram',
                'algoritmo',
                'videos cortos',
                'servidores',
                'mensajeria',
                'teen accounts',
                'family center',
                'sincronizacion familiar',
                'privacidad',
                'supervision por plataforma',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Algoritmos', 'Comunidades', 'Privacidad', 'Interacción social'],
        },
        module1Article2: {
            content: `# ¿Por qué estas plataformas atraen tanto a niños y adolescentes?

TikTok, Discord e Instagram no resultan atractivas por una sola razón. Cada una conecta con necesidades muy reales en niños y adolescentes: curiosidad, entretenimiento, pertenencia, reconocimiento, comunicación y exploración de identidad.

Por eso, para entender su impacto, no basta con mirar cuánto tiempo usan una app. También conviene entender qué necesidad les está cubriendo.

## Lo más importante

Estas plataformas no solo muestran contenido. También organizan la experiencia para que el usuario quiera volver.

* TikTok personaliza el contenido con recomendaciones.
* Instagram mezcla perfiles, historias, Reels, mensajes y reacciones.
* Discord gira alrededor de servidores, canales y conversación.

Aunque funcionan distinto, las tres logran algo parecido: hacer que el menor sienta que siempre hay algo interesante, alguien con quien interactuar o una respuesta que esperar.

## Qué las hace tan atractivas

| Factor | Cómo se ve en la práctica | Por qué engancha |
| --- | --- | --- |
| Recompensa rápida | Videos cortos, respuestas inmediatas y contenido nuevo constante | El usuario siente novedad sin esperar mucho |
| Pertenencia | Chats, servidores, seguidores, historias y comentarios | El menor siente que forma parte de un grupo |
| Reconocimiento | Likes, vistas, respuestas, seguidores y menciones | Refuerza la necesidad de aprobación |
| Personalización | El contenido parece cada vez más hecho para él o ella | Hace más difícil detenerse |
| Expresión personal | Publicar, comentar, compartir gustos y personalizar perfil | Permite explorar identidad y estilo propio |

## 1. TikTok atrae por velocidad y personalización

TikTok hace que todo ocurra rápido: un video termina, aparece otro y la experiencia sigue casi sin pausa.

Además, el contenido se ajusta según lo que el usuario mira, repite o marca con interacciones. Eso hace que el menor sienta que siempre aparece algo interesante sin tener que buscar demasiado.

### Qué debe notar un padre
* La app premia el consumo rápido y continuo.
* El algoritmo vuelve el contenido cada vez más personalizado.
* Eso puede hacer más difícil detenerse a tiempo.

## 2. Discord atrae por la sensación de comunidad

Discord suele ser atractivo porque permite estar con otros. No gira tanto alrededor de publicar para todos, sino de conversar, jugar, coordinar y compartir con personas o grupos.

Para muchos menores, eso cubre una necesidad fuerte de pertenencia.

### Qué debe notar un padre
* La plataforma se siente como un espacio de convivencia.
* Los servidores y chats pueden volverse parte importante de la rutina social.
* El atractivo viene mucho de la gente que está ahí, no solo de la aplicación en sí.

## 3. Instagram atrae por imagen, interacción y aprobación social

Instagram combina imagen, mensajes, historias, publicaciones y reacciones. Para muchos menores, eso la convierte en un espacio donde observan a otros, comparten partes de su vida y esperan respuesta de su entorno.

Aquí el atractivo no está solo en ver contenido, sino en ser visto.

### Qué debe notar un padre
* Los likes, vistas y respuestas pueden sentirse muy importantes.
* La comparación con otros perfiles puede influir en cómo se sienten.
* La imagen personal tiene mucho peso dentro de la experiencia.

## 4. Las tres comparten algo: hacen sentir al menor que alguien lo ve

Aunque funcionan de manera distinta, TikTok, Discord e Instagram comparten una idea: el menor puede sentir que alguien lo escucha, lo sigue, le responde o lo toma en cuenta.

* En TikTok, eso puede venir del algoritmo y de las reacciones.
* En Instagram, de likes, respuestas o visualizaciones.
* En Discord, de la conversación directa con otras personas.

Esa sensación de visibilidad puede ser positiva, pero también hace más fuerte el deseo de volver una y otra vez.

## 5. También atraen porque ayudan a explorar identidad

En esta etapa del desarrollo, muchos menores quieren probar gustos, estilos, humor, formas de hablar e intereses. Las redes facilitan eso:

* seguir cuentas,
* entrar a comunidades,
* compartir contenido,
* reaccionar,
* personalizar perfiles.

Eso puede ser parte natural del crecimiento. El problema aparece cuando esa exploración se mezcla con presión social, comparación constante, exceso de exposición o entornos poco seguros.

## Señal de alerta

Una red puede empezar siendo atractiva por motivos sanos, como expresarse, aprender o convivir, pero conviene prestar atención si:

* el menor depende demasiado de la aprobación,
* se altera cuando no recibe respuesta,
* le cuesta detenerse,
* o deja de lado sueño, escuela o convivencia por seguir conectado.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Preguntar qué le gusta de cada app | Permite entender la necesidad que cubre |
| Distinguir si busca entretenerse, hablar o publicar | Ayuda a poner reglas más precisas |
| Revisar herramientas familiares oficiales | Facilita acompañar sin improvisar |
| Hablar de likes, seguidores y presión social | Reduce idealización de la aprobación digital |
| Observar si la app desplaza sueño, escuela o convivencia | Permite detectar uso problemático temprano |

## Preguntas útiles para conversar en casa

1. ¿Qué te gusta más de esa app: ver cosas, hablar o publicar?
2. ¿Qué sientes cuando alguien responde o te da like?
3. ¿Te gusta más por el contenido o por la gente que está ahí?
4. ¿Hay algo de esa plataforma que te haga sentir presión?
5. ¿Crees que podrías dejarla fácil o te cuesta parar?

## Idea clave

TikTok, Discord e Instagram atraen tanto porque combinan entretenimiento, pertenencia, reconocimiento y personalización.

No enganchan solo por la tecnología. También conectan con necesidades emocionales y sociales muy importantes en esta etapa del desarrollo.

## Cierre

Cuando un padre entiende por qué una plataforma resulta tan atractiva, deja de verla solo como una app más y empieza a verla como un espacio que influye en emociones, vínculos y hábitos.

Ese cambio de mirada ayuda a acompañar mejor, hacer preguntas más útiles y poner límites más realistas.`,
            teaches: [
                'recompensa rápida',
                'pertenencia',
                'reconocimiento',
                'personalización',
                'expresión personal',
                'algoritmo',
                'comunidad',
                'aprobación social',
                'identidad digital',
                'uso problemático',
                'presión social',
                'visibilidad en línea',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Algoritmos', 'Presión social', 'Uso problemático', 'Identidad digital'],
        },
        module2Article1: {
            content: `# Qué datos comparten los niños sin darse cuenta en redes sociales

Cuando un menor usa TikTok, Discord o Instagram, no solo comparte lo que publica de forma intencional. También puede dejar visible información sobre quién es, con quién se relaciona, qué le gusta, desde dónde se conecta o cómo se mueve dentro de la plataforma.

Por eso, hablar de privacidad no es solo hablar de "qué subes", sino también de "qué revelas sin darte cuenta".

## Lo más importante

Muchos niños creen que solo comparten datos cuando escriben su nombre, su edad o su dirección. En realidad, también comparten información cuando:

* eligen una foto de perfil,
* siguen cuentas,
* hablan por mensajes,
* activan ubicación,
* aceptan permisos del teléfono,
* o dejan visibles sus contactos y actividad.

La privacidad no depende solo de una publicación. También depende de pequeños datos que, juntos, dicen mucho.

## Qué tipo de datos pueden quedar expuestos

| Tipo de dato | Cómo se comparte | Por qué importa |
| --- | --- | --- |
| Datos de perfil | Foto, nombre de usuario, apodo, biografía | Ayudan a identificar al menor o a perfilarlo |
| Red de contactos | Amigos, seguidores, cuentas seguidas, personas con las que habla | Muestran con quién se relaciona |
| Contenido publicado | Fotos, videos, historias, comentarios y likes | Puede revelar gustos, rutinas o nivel de exposición |
| Ubicación y contexto | Permisos de ubicación, información del dispositivo o funciones de mapa | Puede mostrar dónde está o con quién se mueve |
| Actividad dentro de la app | Tiempo de uso, llamadas, mensajes, interacciones | Construye un retrato de hábitos y vínculos |
| Permisos del dispositivo | Cámara, micrófono, contactos, fotos y ubicación | Da acceso a información que va más allá de una publicación |

## 1. El perfil ya dice mucho

Aunque el menor no publique demasiado, su perfil puede revelar información importante.

* una foto puede mostrar edad aproximada, uniforme, escuela o entorno,
* un nombre de usuario puede incluir nombre real o fecha,
* una biografía puede dar pistas sobre gustos, rutina o ciudad.

Por eso, revisar el perfil también es revisar privacidad.

## 2. No solo importa quién ve el contenido, también quién puede contactar

En redes como Instagram o TikTok, la cuenta puede ser pública o privada. Eso cambia mucho, pero no lo cambia todo.

También importa:

* quién puede enviar mensajes,
* quién puede comentar,
* quién puede ver seguidores o seguidos,
* y quién puede encontrar la cuenta.

Una cuenta privada ayuda, pero no resuelve toda la exposición.

## 3. La ubicación es un dato especialmente sensible

La ubicación puede compartirse de forma directa o indirecta.

Por ejemplo:

* activando permisos de ubicación,
* usando funciones de mapa,
* publicando una historia en un lugar reconocible,
* o mostrando rutinas repetidas en fotos y videos.

Ese tipo de información puede parecer pequeña, pero ayuda a reconstruir dónde está o cómo se mueve el menor.

## 4. En Discord también se comparte información a través de la actividad social

Discord no gira tanto alrededor de publicaciones abiertas, sino de interacción.

Ahí también se comparte información cuando el menor:

* entra a servidores,
* agrega amigos,
* participa en llamadas,
* manda mensajes,
* o pasa mucho tiempo en ciertas comunidades.

Esa actividad ya dice bastante sobre sus relaciones, hábitos e intereses.

## 5. Los permisos del teléfono revelan más de lo que parece

Una app puede tener acceso a:

* cámara,
* micrófono,
* fotos,
* contactos,
* ubicación.

Eso significa que el menor no solo comparte lo que publica, sino también parte de la información que el dispositivo deja disponible.

Por eso conviene revisar permisos con calma y dejar activos solo los necesarios.

## 6. La privacidad real tiene varias capas

Para proteger mejor al menor no basta con preguntarse si la cuenta es pública o privada.

También conviene revisar:

* perfil,
* permisos,
* mensajes,
* contactos,
* ubicación,
* actividad dentro de la app,
* y hábitos de uso.

La privacidad real es la suma de esas capas.

## Señal de alerta

Un menor puede decir "yo no comparto nada personal" y aun así tener visibles:

* su foto,
* su nombre de usuario,
* parte de su red de contactos,
* permisos activos,
* su ubicación,
* o información sobre con quién habla y cuánto tiempo pasa dentro de la app.

La exposición muchas veces no viene de una sola publicación, sino de la suma de varios detalles pequeños.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Revisar junto al menor su perfil y configuración de privacidad | Permite detectar qué datos están visibles |
| Limitar permisos de cámara, micrófono, contactos, fotos y ubicación | Reduce exposición innecesaria |
| Confirmar si la cuenta es pública o privada | Define quién puede ver el contenido |
| Revisar quién puede enviar mensajes o solicitudes | Disminuye contacto no deseado |
| Hablar de huella digital y rastro de información | Ayuda al menor a pensar antes de compartir |

## Preguntas útiles para conversar en casa

1. ¿Sabes qué parte de tu perfil puede ver cualquier persona?
2. ¿Tienes activada la ubicación o permisos que no necesitas?
3. ¿Quién puede enviarte mensajes en esta app?
4. ¿Tu cuenta es pública o privada, y sabes qué cambia con eso?
5. ¿Qué información tuya crees que la app conoce aunque no la hayas escrito?

## Idea clave

Los menores no solo comparten datos cuando publican algo importante. También lo hacen a través de su perfil, sus permisos, sus mensajes, sus contactos y sus hábitos dentro de la plataforma.

Enseñarles a reconocer eso es uno de los pasos más valiosos para proteger su privacidad.

## Cierre

Hablar de privacidad con un hijo no significa asustarlo, sino ayudarle a entender que en redes sociales la información se comparte de muchas maneras, no solo con una foto o un comentario.

Cuando los padres entienden cómo funciona esa exposición en TikTok, Discord e Instagram, pueden acompañar mejor, revisar configuraciones con más sentido y enseñar al menor a cuidar su información antes de que aparezca un problema.`,
            teaches: [
                'datos de perfil',
                'red de contactos',
                'contenido publicado',
                'ubicación',
                'actividad dentro de la app',
                'permisos del dispositivo',
                'cuenta pública',
                'cuenta privada',
                'mensajes',
                'huella digital',
                'privacidad por capas',
                'exposición accidental',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Privacidad', 'Datos personales', 'Huella digital', 'Exposición de información'],
        },
        module2Article2: {
            content: `# Huella digital: lo que se publica hoy puede traer consecuencias mañana

Cuando un niño o adolescente publica una foto, comenta, comparte un video, reacciona a una historia o participa en un servidor, no solo está usando una app. También está dejando un rastro de información sobre quién es, qué le gusta, con quién se relaciona y cómo se comporta en línea.

A eso se le llama huella digital.

## Lo más importante

La huella digital no se forma solo con publicaciones grandes o claramente importantes. También se construye con:

* fotos de perfil,
* historias,
* comentarios,
* listas de seguidores,
* mensajes,
* likes,
* servidores a los que entra,
* y hábitos de uso.

Por eso conviene enseñar a pensar antes de publicar, reaccionar o compartir.

## Cómo se construye la huella digital

| Acción | Qué deja detrás | Posible consecuencia |
| --- | --- | --- |
| Subir fotos o videos | Imagen personal, entorno, gustos y rutinas | Puede circular fuera del control del menor |
| Comentar o reaccionar | Opiniones, emociones o impulsos | Puede ser visto fuera de contexto más adelante |
| Seguir cuentas o unirse a grupos | Intereses y vínculos | Ayuda a perfilar hábitos y preferencias |
| Compartir ubicación o contexto | Lugar, horarios y movimientos | Aumenta exposición y reduce privacidad |
| Mantener perfiles muy abiertos | Más visibilidad del contenido y contactos | Hace más fácil que terceros lo vean o lo compartan |

## 1. Lo que se publica puede durar más de lo que parece

Una vez que algo se publica en internet, puede ser difícil retirarlo por completo.

Aunque el menor borre una foto, un comentario o una historia, todavía puede pasar que:

* otra persona haya hecho una captura,
* lo haya reenviado,
* lo haya guardado,
* o lo haya compartido fuera de la plataforma.

Por eso vale la pena pensar antes de publicar y no solo reaccionar después.

## 2. Una cuenta privada ayuda, pero no elimina la huella

Tener una cuenta privada es una protección útil, pero no hace desaparecer el rastro digital.

Incluso con una cuenta más cerrada, siguen existiendo:

* actividad,
* contactos,
* comentarios,
* mensajes,
* y contenidos que otras personas pueden guardar o volver a compartir.

La privacidad ayuda a reducir exposición, pero no elimina por completo la huella digital.

## 3. La actividad también habla, no solo las publicaciones

La huella digital no depende únicamente de lo que se sube.

También habla de un menor:

* con quién interactúa,
* a qué grupos entra,
* cuánto tiempo pasa en ciertos espacios,
* y qué tipo de actividad repite.

En plataformas como Discord esto se nota con claridad, porque la participación en servidores, amistades y llamadas también dice mucho sobre hábitos y vínculos.

## 4. Otras personas también pueden construir la huella del menor

La huella digital no se crea solo con lo que el propio niño publica.

También influye:

* lo que otros suben sobre él,
* las etiquetas o menciones,
* las fotos que comparten amigos,
* las capturas,
* o incluso lo que publica la propia familia.

Eso significa que proteger la huella digital también implica hablar de respeto, consentimiento y cuidado mutuo.

## Señal de alerta

Una señal importante es cuando el menor cree que, si borra algo, ya desapareció para siempre, o piensa que solo cuenta lo que publica en su perfil principal.

En realidad, la huella digital suele ser más amplia e incluye:

* publicaciones pasadas,
* reacciones,
* actividad,
* contactos,
* y contenidos que otros guardaron o difundieron.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Hablar con el menor antes de publicar, no solo después | Previene decisiones impulsivas |
| Revisar juntos privacidad y visibilidad de la cuenta | Reduce exposición innecesaria |
| Explicar que una captura o reenvío puede multiplicar el alcance | Hace visible que publicar no siempre queda encerrado |
| Preguntar si estaría cómodo viendo ese contenido en un año | Introduce perspectiva de futuro |
| Cuidar también lo que los adultos publican sobre él | Protege su privacidad y enseña respeto |

## Preguntas útiles para conversar en casa

1. ¿Te sentirías cómodo si ese video o comentario lo viera tu escuela?
2. ¿Crees que esa publicación dice algo sobre ti aunque no pongas tu nombre completo?
3. ¿Qué podría pasar si otra persona guarda o reenvía eso?
4. ¿Quién más podría ver ese contenido además de tus amigos?
5. ¿Qué cosas preferirías que no quedaran asociadas a ti en internet?

## Idea clave

La huella digital no es solo lo que un menor decide mostrar hoy. Es el conjunto de señales que deja con sus publicaciones, reacciones, contactos y hábitos.

Entender eso ayuda a pasar de subir algo porque sí a pensar qué imagen, datos o consecuencias puede dejar mañana.

## Cierre

Hablar de huella digital no busca asustar, sino enseñar previsión.

Cuando los padres ayudan a sus hijos a pensar antes de publicar, revisar la privacidad y valorar cómo el contenido puede circular y permanecer, les están dando una herramienta muy útil para cuidarse hoy y también en el futuro.`,
            teaches: [
                'huella digital',
                'rastro digital',
                'publicaciones',
                'comentarios',
                'reacciones',
                'seguidores',
                'mensajes',
                'servidores',
                'capturas',
                'reenvío',
                'visibilidad de la cuenta',
                'consecuencias futuras',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Huella digital', 'Privacidad', 'Exposición de contenido', 'Consecuencias futuras'],
        },
    };

    const module1QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'TikTok', value: 'Plataforma centrada en videos breves recomendados en gran parte por algoritmo' },
                    { key: 'Discord', value: 'Plataforma centrada en comunidades, servidores, chat, voz y video' },
                    { key: 'Instagram', value: 'Plataforma que combina perfil, imagen, historias, publicaciones y mensajes' },
                    { key: 'Personalización', value: 'Sensación de que el contenido parece cada vez más hecho para el usuario' },
                    { key: 'Reconocimiento', value: 'Búsqueda de respuesta mediante likes, vistas, menciones o interacciones' },
                ],
                correctAnswer: {
                    TikTok: 'Plataforma centrada en videos breves recomendados en gran parte por algoritmo',
                    Discord: 'Plataforma centrada en comunidades, servidores, chat, voz y video',
                    Instagram: 'Plataforma que combina perfil, imagen, historias, publicaciones y mensajes',
                    Personalización: 'Sensación de que el contenido parece cada vez más hecho para el usuario',
                    Reconocimiento: 'Búsqueda de respuesta mediante likes, vistas, menciones o interacciones',
                },
            },
            explanation: 'Tip: El módulo 1 diferencia la función principal de cada plataforma y también explica por qué conceptos como personalización y reconocimiento aumentan su atractivo.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok pesa mucho el [blank1]. En Discord el centro está en la [blank2] con otras personas. En Instagram importan mucho la [blank3] personal y las reacciones. Cuando una app ofrece novedad, respuesta y contenido que parece hecho para mí, aumenta la [blank4] de volver. Por eso conviene supervisar cada plataforma según su [blank5] principal.',
                bank: ['algoritmo', 'interacción', 'imagen', 'atracción', 'lógica'],
                correctAnswer: {
                    blank1: 'algoritmo',
                    blank2: 'interacción',
                    blank3: 'imagen',
                    blank4: 'atracción',
                    blank5: 'lógica',
                },
            },
            explanation: 'Tip: El módulo insiste en que TikTok, Discord e Instagram no se acompañan igual porque no funcionan igual.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada característica según la plataforma que mejor la describa.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Discord', 'Instagram'],
                right: [
                    'Videos cortos que aparecen uno tras otro',
                    'Servidores y comunidades como parte central de la experiencia',
                    'Historias, publicaciones y mensajes dentro del mismo entorno',
                    'El algoritmo influye mucho en el contenido que aparece',
                    'La conversación con otras personas pesa más que la publicación abierta',
                    'La imagen personal y la aprobación social tienen mucho peso',
                ],
                correctAnswer: {
                    TikTok: [
                        'Videos cortos que aparecen uno tras otro',
                        'El algoritmo influye mucho en el contenido que aparece',
                    ],
                    Discord: [
                        'Servidores y comunidades como parte central de la experiencia',
                        'La conversación con otras personas pesa más que la publicación abierta',
                    ],
                    Instagram: [
                        'Historias, publicaciones y mensajes dentro del mismo entorno',
                        'La imagen personal y la aprobación social tienen mucho peso',
                    ],
                },
            },
            explanation: 'Tip: TikTok se entiende mejor desde el contenido recomendado, Discord desde la convivencia y Instagram desde la mezcla entre imagen, interacción y perfil.',
            points: 12,
        },
        {
            text: 'Ordena la secuencia básica con la que una red social puede aumentar el deseo de volver.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'El menor entra a la app para ver, hablar o publicar.',
                    'Recibe contenido, respuesta o interacción que le resulta atractiva.',
                    'La plataforma detecta ese interés o refuerza esa experiencia.',
                    'Aparece más contenido o más oportunidades de interacción parecidas.',
                    'Le cuesta más detenerse o dejar la aplicación.',
                ],
                correctAnswer: [
                    'El menor entra a la app para ver, hablar o publicar.',
                    'Recibe contenido, respuesta o interacción que le resulta atractiva.',
                    'La plataforma detecta ese interés o refuerza esa experiencia.',
                    'Aparece más contenido o más oportunidades de interacción parecidas.',
                    'Le cuesta más detenerse o dejar la aplicación.',
                ],
            },
            explanation: 'Tip: El módulo 1 explica que el atractivo no está solo en entrar a la app, sino en cómo la experiencia se refuerza para invitar a volver.',
            points: 8,
        },
        {
            text: 'Selecciona todos los factores que el módulo identifica como razones por las que estas plataformas resultan tan atractivas para niños y adolescentes.',
            type: 'multiple_selection',
            options: [
                { text: 'Recompensa rápida', isCorrect: true },
                { text: 'Pertenencia', isCorrect: true },
                { text: 'Reconocimiento', isCorrect: true },
                { text: 'Personalización', isCorrect: true },
                { text: 'Expresión personal', isCorrect: true },
                { text: 'Exploración de identidad', isCorrect: true },
                { text: 'Pausas obligatorias y largas entre contenidos', isCorrect: false },
                { text: 'Ausencia total de interacción social', isCorrect: false },
                { text: 'Desinterés por la aprobación de otros', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 1 muestra que el atractivo combina entretenimiento, visibilidad, pertenencia y exploración de identidad.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'TikTok se asocia más con [blank1]. Discord se asocia más con [blank2]. Instagram combina publicaciones con [blank3]. En Discord conviene fijarse mucho en [blank4] y en qué comunidades entra el menor. En TikTok conviene mirar especialmente [blank5] y el tiempo de uso.',
                options: {
                    blank1: ['videos breves recomendados', 'fotografías impresas', 'llamadas familiares'],
                    blank2: ['servidores y conversación', 'solo filtros de imagen', 'videos descargados'],
                    blank3: ['mensajes e imagen personal', 'mapas escolares', 'tareas sin conexión'],
                    blank4: ['con quién habla', 'el color del fondo', 'la marca del teléfono'],
                    blank5: ['el algoritmo', 'el teclado', 'el brillo de pantalla'],
                },
                correctAnswer: {
                    blank1: 'videos breves recomendados',
                    blank2: 'servidores y conversación',
                    blank3: 'mensajes e imagen personal',
                    blank4: 'con quién habla',
                    blank5: 'el algoritmo',
                },
            },
            explanation: 'Tip: La idea central del módulo es que cada plataforma pide una mirada distinta de supervisión.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Videos cortos uno tras otro',
                    'Servidores',
                    'Historias',
                    'Likes y vistas',
                    'Sensación de comunidad',
                    'Comparación social',
                    'Mirar el algoritmo y el tiempo de uso',
                    'Mirar con quién habla el menor',
                    'Mirar privacidad e imagen personal',
                ],
                categories: ['TikTok', 'Discord', 'Instagram'],
                correctAnswer: {
                    TikTok: [
                        'Videos cortos uno tras otro',
                        'Mirar el algoritmo y el tiempo de uso',
                    ],
                    Discord: [
                        'Servidores',
                        'Sensación de comunidad',
                        'Mirar con quién habla el menor',
                    ],
                    Instagram: [
                        'Historias',
                        'Likes y vistas',
                        'Comparación social',
                        'Mirar privacidad e imagen personal',
                    ],
                },
            },
            explanation: 'Tip: El módulo 1 organiza la supervisión según la lógica principal de cada red social.',
            points: 15,
        },
        {
            text: 'Caso: Una preadolescente pasa parte de la tarde viendo videos en TikTok, luego entra a Discord para hablar con personas de un servidor y después revisa Instagram para ver quién reaccionó a sus historias. Su madre dice: "Todo eso es lo mismo, solo son pantallas". ¿Cuál es la respuesta más alineada con el módulo 1?',
            type: 'case_study',
            options: [
                { text: 'Distinguir qué necesidad cubre cada app, revisar TikTok desde el algoritmo y el tiempo, Discord desde la interacción y las comunidades, e Instagram desde la privacidad, la imagen y la aprobación social.', isCorrect: true },
                { text: 'Poner exactamente las mismas reglas a las tres aplicaciones porque todas funcionan igual y tienen los mismos riesgos.', isCorrect: false },
                { text: 'Centrarse solo en cuánto tiempo pasó frente a la pantalla, sin revisar para qué usa cada plataforma.', isCorrect: false },
                { text: 'Asumir que si una app es popular entre adolescentes ya no hace falta entender cómo funciona.', isCorrect: false },
            ],
            explanation: 'La respuesta correcta retoma la idea central del módulo: no basta con hablar de pantallas en general; conviene entender la lógica específica de cada plataforma para acompañar mejor.',
            points: 15,
        },
    ];

    const courseConfig = {
        title: 'Redes Sociales: TikTok, Discord e Instagram',
        description: 'Curso práctico para entender cómo usan TikTok, Discord e Instagram los menores, reconocer riesgos reales y acompañarlos con más criterio, seguridad y confianza.',
        category: 'Redes Sociales',
        platforms: ['TikTok', 'Discord', 'Instagram'],
        riskAreas: [
            'Privacidad y huella digital',
            'Ciberacoso y presión social',
            'Grooming y manipulación',
            'Contenido viral y consumo',
        ],
        duration: '2 h 20 min',
        status: 'published',
    };

    const buildArticleContent = ({ moduleTitle, objective, lessonTitle }) => `# ${lessonTitle.replace(/^Artículo \d+: /, '')}

Este artículo forma parte del módulo **${moduleTitle}** y sirve como base para que madres, padres y cuidadores entiendan el tema con ejemplos claros y lenguaje práctico.

## Qué vas a encontrar aquí
* Una explicación sencilla del tema central.
* Situaciones comunes que viven niños y preadolescentes en redes sociales.
* Ideas clave para acompañar mejor su uso digital.

> ${objective}

Nota: este contenido es una base inicial del módulo y se enriquecerá en la siguiente etapa del curso.`;

    const buildVideoContent = ({ moduleTitle, objective, lessonTitle }) => `# ${lessonTitle.replace(/^Video \d+: /, '')}

Este video acompaña visualmente el módulo **${moduleTitle}** y ayuda a ubicar rápidamente qué debe reconocer una familia en TikTok, Discord e Instagram.

## Qué vas a observar
* Ejemplos sencillos para ubicar la función o riesgo principal.
* Escenas cotidianas de uso infantil y preadolescente.
* Pistas prácticas para conectar el tema con conversaciones en casa.

> ${objective}

Nota: este video usa un enlace temporal mientras se integra el material audiovisual definitivo del curso.`;

    const createLesson = (title, type, moduleTitle, objective, duration, overrideKey) => {
        const override = (overrideKey && lessonOverrides[overrideKey]) || lessonOverrides[title] || {};

        return {
            title,
            type,
            duration,
            content: override.content || (
                type === 'video'
                    ? buildVideoContent({ moduleTitle, objective, lessonTitle: title })
                    : buildArticleContent({ moduleTitle, objective, lessonTitle: title })
            ),
            teaches: override.teaches || [],
            platforms: override.platforms || [],
            riskAreas: override.riskAreas || [],
            ...(type === 'video' ? { videoUrl: placeholderVideoUrl } : {}),
        };
    };

    const moduleBlueprints = [
        {
            title: 'Entender las redes sociales que usan los menores',
            objective: 'Que los padres comprendan qué son TikTok, Discord e Instagram, cómo funcionan y por qué resultan tan atractivas para niños y preadolescentes.',
            quiz: {
                title: 'Examen del Módulo 1: Entender las redes sociales que usan los menores',
                description: 'Demuestra que comprendes cómo funcionan TikTok, Discord e Instagram y por qué resultan tan atractivas para niños y adolescentes.',
                minPassing: 80,
                questions: module1QuizQuestions,
            },
            lessons: [
                ['Artículo 1: ¿Qué son TikTok, Discord e Instagram y cómo funcionan?', 'article', 6, 'module1Article1'],
                ['Video 1: Recorrido visual por TikTok, Discord e Instagram: lo que un padre debe reconocer', 'video', 4],
                ['Artículo 2: ¿Por qué estas plataformas atraen tanto a niños y adolescentes?', 'article', 6, 'module1Article2'],
                ['Video 2: Cómo el algoritmo, los likes y la interacción mantienen la atención', 'video', 4],
            ],
        },
        {
            title: 'Privacidad, datos personales y huella digital',
            objective: 'Que los padres identifiquen qué información comparten los menores y por qué eso puede convertirse en un riesgo.',
            lessons: [
                ['Artículo 1: Qué datos comparten los niños sin darse cuenta en redes sociales', 'article', 6, 'module2Article1'],
                ['Video 1: Ejemplos visuales de exposición de datos en perfiles, historias, chats y publicaciones', 'video', 4],
                ['Artículo 2: Huella digital: lo que se publica hoy puede traer consecuencias mañana', 'article', 6, 'module2Article2'],
                ['Video 2: Cómo enseñar a los hijos a cuidar su privacidad en línea', 'video', 4],
            ],
        },
        {
            title: 'Ciberacoso, presión social y daño emocional',
            objective: 'Ayudar a los padres a detectar dinámicas de acoso, humillación y presión social dentro de redes y comunidades digitales.',
            lessons: [
                ['Artículo 1: Ciberacoso en TikTok, Discord e Instagram: cómo aparece y cómo detectarlo', 'article', 6],
                ['Video 1: Señales de alerta de ciberacoso y cambios de conducta en los menores', 'video', 4],
                ['Artículo 2: Likes, comparaciones y presión social: cómo afectan la autoestima', 'article', 6],
                ['Video 2: Qué pueden hacer los padres cuando una red social afecta el bienestar emocional', 'video', 4],
            ],
        },
        {
            title: 'Contacto con desconocidos, grooming y manipulación',
            objective: 'Mostrar cómo la interacción en mensajes, chats, servidores y comentarios puede exponer a los menores a personas con malas intenciones.',
            lessons: [
                ['Artículo 1: Riesgos de hablar con desconocidos en mensajes, comentarios y servidores', 'article', 6],
                ['Video 1: Cómo se dan las interacciones de riesgo en Discord, Instagram y TikTok', 'video', 4],
                ['Artículo 2: Grooming y manipulación emocional: señales que los padres deben conocer', 'article', 6],
                ['Video 2: Cómo actuar si un menor está siendo presionado o manipulado en línea', 'video', 4],
            ],
        },
        {
            title: 'Contenido inapropiado, retos virales y desinformación',
            objective: 'Enseñar a los padres a reconocer el impacto de algoritmos, tendencias virales y contenido problemático.',
            lessons: [
                ['Artículo 1: Contenido inapropiado y exposición accidental en redes sociales', 'article', 6],
                ['Video 1: Cómo un menor puede terminar viendo contenido dañino sin buscarlo', 'video', 4],
                ['Artículo 2: Retos virales, rumores y desinformación: por qué los niños los creen y comparten', 'article', 6],
                ['Video 2: Cómo enseñar pensamiento crítico frente al contenido viral', 'video', 4],
            ],
        },
        {
            title: 'Compras, publicidad e influencia de creadores',
            objective: 'Que los padres comprendan cómo las redes sociales también impulsan consumo, presión comercial e influencia sobre decisiones de los menores.',
            lessons: [
                ['Artículo 1: Publicidad disfrazada, influencers y contenido patrocinado en TikTok e Instagram', 'article', 6],
                ['Video 1: Cómo reconocer promociones ocultas y recomendaciones pagadas', 'video', 4],
                ['Artículo 2: Regalos, suscripciones, monedas y compras impulsivas en redes y comunidades', 'article', 6],
                ['Video 2: Cómo prevenir gastos no supervisados y consumo por presión social', 'video', 4],
            ],
        },
        {
            title: 'Bienestar digital, control parental y acompañamiento',
            objective: 'Cerrar el curso con estrategias prácticas para supervisar, dialogar y acompañar sin invadir.',
            lessons: [
                ['Artículo 1: Controles parentales y configuraciones de seguridad en TikTok, Discord e Instagram', 'article', 6],
                ['Video 1: Guía visual para activar ajustes de seguridad y privacidad', 'video', 4],
                ['Artículo 2: Cómo acompañar a un hijo en redes sociales sin caer en vigilancia excesiva', 'article', 6],
                ['Video 2: Conversaciones clave para construir confianza y uso responsable', 'video', 4],
            ],
        },
    ];

    const moduleDefinitions = moduleBlueprints.map((module) => ({
        title: module.title,
        description: `Objetivo: ${module.objective}`,
        duration: '20 min',
        quiz: module.quiz,
        lessons: module.lessons.map(([title, type, duration, overrideKey]) => createLesson(title, type, module.title, module.objective, duration, overrideKey)),
    }));

    return {
        courseConfig,
        moduleDefinitions,
        finalQuizDefinition: null,
    };
};

async function seedSocialCourse(context) {
    const { getOrCreateCourse, getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models } = context;
    const { Lesson, Module, Quiz, Question } = models;
    const { courseConfig, moduleDefinitions, finalQuizDefinition } = buildSocialCatalog();

    const courseSocial = await getOrCreateCourse(courseConfig);

    const existingModules = await Module.find({ courseId: courseSocial._id }).select('_id');
    const existingModuleIds = existingModules.map((module) => module._id);
    const quizzesToRemove = await Quiz.find({
        $or: [
            { refId: courseSocial._id, scope: 'course' },
            { refId: { $in: existingModuleIds }, scope: 'module' },
        ],
    }).select('_id');
    const quizIdsToRemove = quizzesToRemove.map((quiz) => quiz._id);

    if (quizIdsToRemove.length > 0) {
        await Question.deleteMany({ quizId: { $in: quizIdsToRemove } });
        await Quiz.deleteMany({ _id: { $in: quizIdsToRemove } });
    }

    await Lesson.deleteMany({ courseId: courseSocial._id });
    await Module.deleteMany({ courseId: courseSocial._id });
    console.log('  (-) Old lessons, modules and quizzes for the social course were removed.');

    for (const moduleDefinition of moduleDefinitions) {
        const moduleRecord = await getOrCreateModule(courseSocial._id, {
            title: moduleDefinition.title,
            description: moduleDefinition.description,
            duration: moduleDefinition.duration,
        });

        const lessonIds = [];
        for (const lessonDefinition of moduleDefinition.lessons) {
            const lessonRecord = await getOrCreateLesson(moduleRecord._id, courseSocial._id, lessonDefinition);
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
            moduleRecord.quizId = null;
        }

        await moduleRecord.save();
    }

    if (finalQuizDefinition) {
        const { getOrCreateQuiz } = context;
        const finalSocialQuiz = await getOrCreateQuiz({
            title: finalQuizDefinition.title,
            description: finalQuizDefinition.description,
            scope: 'course',
            refId: courseSocial._id,
            scopeModel: 'Course',
        }, finalQuizDefinition.questions);

        courseSocial.finalQuizId = finalSocialQuiz._id;
    } else {
        courseSocial.finalQuizId = null;
    }

    await courseSocial.save();

    console.log('Course 2 Social Structure Synced!');
}

seedSocialCourse.buildCatalog = buildSocialCatalog;

module.exports = seedSocialCourse;
