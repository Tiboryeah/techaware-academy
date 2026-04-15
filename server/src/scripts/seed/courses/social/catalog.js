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
        module3Article1: {
            content: `# Ciberacoso en TikTok, Discord e Instagram: cómo aparece y cómo detectarlo

El ciberacoso no siempre se ve como una gran pelea en internet. A veces empieza con burlas pequeñas, exclusión, rumores, apodos humillantes o mensajes insistentes que hacen sentir mal al menor.

Lo importante para los padres es entender que no se trata solo de insultos directos. También puede aparecer como humillación pública, presión de grupo, difusión de información privada o ataques repetidos en distintos espacios digitales.

## Lo más importante

En TikTok, Discord e Instagram el ciberacoso puede tomar formas distintas porque cada plataforma funciona diferente.

* En TikTok suele verse más en comentarios, directos y exposición pública.
* En Discord suele aparecer en chats, mensajes, servidores o acoso coordinado.
* En Instagram suele mezclarse con comentarios, historias, mensajes, cuentas falsas y presión social.

Por eso no basta con preguntar si alguien lo molestó. Conviene entender dónde pasó, cómo pasó y con quién ocurrió.

## Cómo puede aparecer en cada plataforma

| Plataforma | Cómo suele aparecer | Qué debe vigilar un padre |
| --- | --- | --- |
| TikTok | Comentarios hirientes, ataques en videos, acoso en directos o mensajes no deseados | Si el menor borra videos, evita publicar o se altera por comentarios |
| Discord | Burlas en servidores, hostigamiento en mensajes, exclusión en grupos o acoso coordinado | Si deja servidores de golpe, oculta chats o evita conectarse |
| Instagram | Comentarios ofensivos, burlas en historias, mensajes hirientes o cuentas falsas | Si cambia su actividad, se angustia con mensajes o revisa compulsivamente reacciones |

## 1. En TikTok, el daño suele ser más visible

TikTok puede amplificar el daño porque los comentarios, videos o directos pueden exponer al menor frente a muchas personas al mismo tiempo.

Eso hace que la humillación se sienta más pública y, en algunos casos, más difícil de controlar.

### Qué debe notar un padre
* si el menor borra publicaciones después de recibir reacciones negativas,
* si deja de grabar o publicar por miedo,
* o si cambia mucho de ánimo después de revisar comentarios.

## 2. En Discord, el problema suele centrarse en la interacción

Discord está hecho para conversar. Por eso, el ciberacoso aquí suele sentirse más como hostigamiento dentro de comunidades, chats o mensajes repetidos.

También puede aparecer como exclusión, burlas constantes o ataques organizados dentro de un servidor.

### Qué debe notar un padre
* si el menor abandona grupos de golpe,
* si evita conectarse con personas con las que antes hablaba,
* o si esconde con nerviosismo ciertos chats o servidores.

## 3. En Instagram, el acoso suele mezclarse con imagen y vida social

En Instagram el daño puede sentirse muy personal porque muchas veces se mezcla con la imagen, las historias, las respuestas y la reacción de otras personas.

El menor puede sentirse expuesto no solo por lo que le dicen, sino también por cómo queda frente a otros.

### Qué debe notar un padre
* si se obsesiona con revisar quién vio o reaccionó,
* si se angustia con mensajes o comentarios,
* o si cambia su forma de usar la cuenta por vergüenza o miedo.

## 4. El ciberacoso no siempre se ve de inmediato

Muchos menores no cuentan lo que les pasa de inmediato. A veces sienten:

* vergüenza,
* miedo a que empeore,
* temor a que les quiten el dispositivo,
* o dudas sobre si “realmente cuenta” como acoso.

Por eso conviene fijarse también en cambios de conducta y no esperar solo una confesión directa.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Se pone triste, irritable o ansioso después de usar la app | Puede estar recibiendo mensajes o viendo contenido hiriente |
| Evita abrir cierta red o abandona un grupo de golpe | Puede estar intentando escapar de una situación de acoso |
| Borra publicaciones o cambia su forma de usar la cuenta | Puede sentirse avergonzado o expuesto |
| Esconde la pantalla o no quiere hablar de lo que pasa en línea | Puede temer ser juzgado o castigado |
| Duerme peor, baja su ánimo o cambia su rutina | El problema ya está afectando su bienestar |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Escuchar sin culpar ni amenazar con quitarle el dispositivo | Aumenta la probabilidad de que el menor cuente lo que pasa |
| Guardar capturas o evidencia | Facilita reportar a la plataforma o a la escuela |
| Enseñar a bloquear y reportar | Da herramientas prácticas al menor |
| Revisar configuraciones de comentarios, mensajes y privacidad | Reduce nuevas agresiones |
| Pedir apoyo a la escuela o a un profesional si el daño continúa | Protege el bienestar emocional del menor |

## Preguntas útiles para conversar en casa

1. ¿Alguien te ha escrito o comentado algo que te hizo sentir mal?
2. ¿Hay alguna app, grupo o cuenta que te ponga nervioso abrir?
3. ¿Has visto que traten mal a otra persona en línea?
4. ¿Sabes cómo bloquear, reportar o guardar evidencia?
5. ¿Te sentirías cómodo contándome si algo así te pasa?

## Idea clave

El ciberacoso no siempre llega como una amenaza clara. Muchas veces aparece como repetición, humillación, exclusión o presión en comentarios, mensajes y grupos.

Detectarlo a tiempo depende menos de espiar y más de conocer cómo funciona cada plataforma, observar cambios y mantener una conversación abierta con el menor.

## Cierre

TikTok, Discord e Instagram no generan el mismo tipo de ciberacoso, pero en las tres plataformas puede haber daño real.

Cuando los padres entienden dónde aparece, cómo se ve y qué señales observar, pueden intervenir antes, apoyar mejor y usar con más criterio las herramientas de bloqueo, reporte y privacidad.`,
            teaches: [
                'ciberacoso',
                'humillación pública',
                'exclusión',
                'rumores',
                'hostigamiento',
                'comentarios hirientes',
                'mensajes ofensivos',
                'acoso coordinado',
                'cuentas falsas',
                'señales de alerta',
                'bloquear y reportar',
                'guardar evidencia',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Ciberacoso', 'Presión social', 'Daño emocional', 'Interacción digital'],
        },
        module3Article2: {
            content: `# Likes, comparaciones y presión social: cómo afectan la autoestima

En redes sociales, muchos menores no solo miran contenido. También pueden empezar a medir su valor a través de reacciones, respuestas, seguidores, vistas o aceptación dentro de un grupo.

Ese tipo de presión no siempre se nota rápido, pero sí puede influir en cómo se perciben a sí mismos, cuánto dependen de la aprobación externa y qué tan satisfechos se sienten con su vida, su imagen o sus relaciones.

## Lo más importante

El problema no está solo en los likes como botón, sino en todo lo que representan: aprobación, visibilidad y pertenencia.

En la práctica, la presión puede aparecer cuando el menor:

* se compara con otros perfiles,
* borra contenido porque no tuvo respuesta,
* siente que debe encajar,
* o empieza a depender demasiado de la reacción de los demás.

## Cómo se vive la presión social en cada plataforma

| Plataforma | Cómo suele sentirse la presión | Qué debe observar un padre |
| --- | --- | --- |
| TikTok | Vistas, likes, viralidad y comparación con creadores o tendencias | Si borra contenido por no recibir respuesta o se obsesiona con el rendimiento |
| Instagram | Imagen personal, seguidores, historias y comparación física o social | Si se compara mucho, cambia su forma de verse o busca validación constante |
| Discord | Pertenencia a grupos, necesidad de responder y miedo a quedarse fuera | Si se angustia por estar siempre conectado o por no perder conversaciones |

## 1. Compararse se vuelve muy fácil

En redes, el menor suele ver imágenes, videos o estilos de vida muy seleccionados, editados o exagerados.

Eso puede hacer que sienta que:

* su apariencia no alcanza,
* su rutina es menos interesante,
* o su vida vale menos que la de otros.

La comparación es fácil porque las redes muestran versiones muy cuidadas de la realidad, no la realidad completa.

## 2. La aprobación digital puede pesar demasiado

Cuando un menor empieza a dar demasiada importancia a likes, vistas o respuestas, su autoestima puede volverse más dependiente de lo que otros le devuelven en línea.

Eso puede verse cuando:

* revisa una y otra vez si alguien reaccionó,
* se frustra demasiado si una publicación no funciona,
* o siente que solo vale si otros lo validan.

## 3. No toda la presión es pública

En TikTok e Instagram la presión puede sentirse más visible porque hay métricas, exposición y mucha imagen.

En Discord, en cambio, la presión suele sentirse más dentro del grupo:

* responder rápido,
* no perderse conversaciones,
* estar disponible,
* o actuar de cierta forma para seguir perteneciendo.

Eso también puede afectar el bienestar, aunque no siempre se note como un problema de imagen.

## 4. El efecto depende también del contexto

No todos los menores viven las redes igual. Lo importante es observar:

* qué contenido consumen,
* cómo usan la plataforma,
* qué emociones deja esa experiencia,
* y qué actividades está desplazando.

Cuando la comparación o la presión social afectan el sueño, la convivencia, el ánimo o la seguridad personal, ya no se trata solo de entretenimiento.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Se compara constantemente con otras personas | La red está afectando su autopercepción |
| Se pone muy mal si una publicación no recibe reacción | Su autoestima puede estar muy ligada a la validación digital |
| Habla demasiado de seguidores, vistas o popularidad | Está midiendo su valor en términos de respuesta externa |
| Cambia su imagen o conducta para encajar | Puede haber presión social fuerte |
| Se siente peor después de usar la app | El uso está afectando su bienestar emocional |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Hablar sobre edición, filtros e imágenes irreales | Reduce comparaciones injustas |
| Preguntar cómo se siente después de usar una app | Ayuda a detectar malestar temprano |
| No reforzar solo apariencia o popularidad | Protege la autoestima fuera de la lógica de redes |
| Priorizar actividades fuera de pantalla | Devuelve equilibrio y experiencias reales |
| Modelar una relación más sana con redes y validación | Enseña con el ejemplo |

## Preguntas útiles para conversar en casa

1. ¿Alguna vez una red te ha hecho sentir menos seguro de ti?
2. ¿Te importa mucho cuántos likes o vistas tiene algo que subes?
3. ¿Sientes que en esa app tienes que verte o actuar de cierta manera?
4. ¿Hay cuentas que te hacen sentir mal contigo mismo?
5. ¿Cómo te sientes después de usar TikTok, Instagram o Discord?

## Idea clave

La presión social en redes no siempre llega como insulto o acoso. A veces aparece como comparación constante, necesidad de aprobación o miedo a no encajar.

Cuando eso ocurre, la autoestima del menor puede empezar a depender demasiado de una pantalla.

## Cierre

TikTok, Discord e Instagram pueden ofrecer conexión y entretenimiento, pero también pueden convertir la aprobación de otros en una medida de valor personal.

Cuando los padres entienden esa dinámica, les resulta más fácil detectar señales, hablar sin juzgar y ayudar a sus hijos a construir una autoestima menos dependiente de likes, vistas o aceptación digital.`,
            teaches: [
                'likes',
                'comparación social',
                'presión social',
                'autoestima',
                'validación digital',
                'aprobación externa',
                'imagen personal',
                'viralidad',
                'miedo a no encajar',
                'bienestar emocional',
                'filtros e imágenes irreales',
                'actividades fuera de pantalla',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Presión social', 'Autoestima', 'Daño emocional', 'Comparación digital'],
        },
        module4Article1: {
            content: `# Riesgos de hablar con desconocidos en mensajes, comentarios y servidores

En redes sociales, el contacto con desconocidos no siempre empieza como algo claramente peligroso. A veces aparece como un comentario amable, una invitación a seguir una cuenta, un mensaje privado, una conversación en un servidor o una reacción constante a las publicaciones del menor.

El riesgo está en que niños y preadolescentes no siempre distinguen bien entre una interacción casual, una amistad real y una relación que puede volverse invasiva o manipuladora.

## Lo más importante

No todas las plataformas exponen al menor al mismo tipo de contacto.

* En TikTok, el riesgo puede llegar por comentarios, seguidores o mensajes.
* En Instagram, por solicitudes de mensaje, cuentas que intentan acercarse o interacción en historias.
* En Discord, por servidores, chats, mensajes directos y llamadas.

Por eso no basta con decir “no hables con extraños”. Conviene enseñar qué tipo de contacto debe llamar la atención, qué datos no se comparten y cuándo hay que salir de la conversación.

## Cómo puede aparecer el riesgo

| Plataforma | Cómo suele empezar | Qué debe vigilar un padre |
| --- | --- | --- |
| TikTok | Comentarios repetidos, seguidores insistentes o intento de mover la charla a mensajes | Si alguien busca contacto constante o intenta sacar la conversación de la app |
| Instagram | Solicitudes de mensaje, respuestas a historias o cuentas que intentan generar confianza rápido | Si el menor recibe mensajes de personas que no conoce o adultos que se acercan sin contexto |
| Discord | Invitaciones a servidores, mensajes directos, voz o video en comunidades | Si el menor entra a servidores abiertos, acepta mensajes de desconocidos o habla con personas fuera de su círculo real |

## 1. En TikTok, el contacto puede empezar desde la visibilidad del contenido

TikTok limita varias funciones de mensajería según la edad, pero eso no elimina todo el riesgo. El acercamiento puede empezar antes por comentarios, seguimiento insistente o interacción repetida en publicaciones.

### Qué debe notar un padre
* si alguien comenta con demasiada frecuencia,
* si insiste en mover la conversación a mensajes,
* o si el menor empieza a hablar con personas que solo conoce por la app.

## 2. En Instagram, la protección ayuda, pero no resuelve todo

Instagram tiene protecciones más fuertes para adolescentes, especialmente en mensajes. Aun así, pueden aparecer solicitudes, cuentas falsas o intentos de generar confianza a través de interacciones repetidas.

### Qué debe notar un padre
* si llegan mensajes de personas desconocidas,
* si una cuenta intenta acercarse demasiado rápido,
* o si el menor siente presión por responder o seguir una conversación que no pidió.

## 3. En Discord, el riesgo se concentra más en la conversación y la comunidad

Discord gira alrededor de servidores, chats, mensajes directos y llamadas. Por eso aquí el riesgo no depende tanto de una publicación pública, sino de entrar a espacios donde otras personas pueden conversar de forma más directa y sostenida.

### Qué debe notar un padre
* si el menor entra a servidores abiertos sin saber bien quién está ahí,
* si acepta mensajes directos de miembros que no conoce,
* o si empieza a hablar fuera de sus amistades reales.

## 4. El problema no es solo hablar con desconocidos, sino cómo evoluciona ese contacto

Una interacción de riesgo no siempre empieza con una amenaza evidente. Puede comenzar con:

* simpatía,
* interés excesivo,
* halagos,
* peticiones pequeñas,
* presión para pasar a otra app,
* o invitaciones a mantener secretos.

Por eso conviene enseñar a reconocer patrones de manipulación, no solo a desconfiar de una persona que “se ve rara”.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Recibe muchos mensajes de alguien que no conoce | Puede haber búsqueda de contacto insistente |
| Le piden pasar a otra app o mantener la conversación en secreto | Hay riesgo de manipulación o aislamiento |
| Cambia de humor después de usar cierta app o servidor | Algo en la interacción puede estar afectándolo |
| Esconde chats, borra mensajes o evita contar con quién habla | Puede sentir presión, vergüenza o miedo |
| Comparte información personal “porque la otra persona también lo hizo” | No está midiendo bien el riesgo del intercambio |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Revisar quién puede enviar mensajes o solicitudes | Reduce contacto no deseado |
| Explicar qué datos no se comparten nunca | Previene exposición innecesaria |
| Limitar o cerrar mensajes de desconocidos en Discord y TikTok | Baja el riesgo de acercamiento directo |
| Hablar sobre secretos en línea y presión para pasar a otra app | Ayuda a reconocer manipulación |
| Decir con claridad: “si algo te incomoda, sales y me avisas” | Le da al menor una respuesta simple y útil |

## Preguntas útiles para conversar en casa

1. ¿Sabes quién puede enviarte mensajes en esta app?
2. ¿Qué harías si alguien que no conoces te escribe mucho?
3. ¿Qué datos tuyos no deberían compartirse nunca?
4. ¿Te ha pasado que alguien te pida hablar por otro medio?
5. ¿Te sentirías cómodo contándome si una conversación te hace sentir raro o presionado?

## Idea clave

El riesgo no aparece solo cuando un desconocido parece peligroso. Muchas veces empieza con cercanía rápida, insistencia o presión emocional.

Cuando los padres enseñan a sus hijos a reconocer esos patrones y configuran bien mensajes, privacidad y contacto, el menor gana una protección mucho más real que una simple advertencia general.

## Cierre

TikTok, Instagram y Discord ofrecen experiencias muy distintas, pero en las tres puede existir contacto con personas que el menor no conoce bien.

Comprender cómo aparece ese contacto, qué herramientas de protección existen y qué señales deben activar una conversación permite a los padres intervenir antes y acompañar con más criterio.`,
            teaches: [
                'desconocidos en línea',
                'mensajes directos',
                'comentarios insistentes',
                'servidores abiertos',
                'solicitudes de mensaje',
                'datos personales',
                'pasar a otra app',
                'secretos en línea',
                'contacto insistente',
                'bloqueo de mensajes',
                'manipulación inicial',
                'pedir ayuda',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Contacto con desconocidos', 'Grooming', 'Manipulación', 'Privacidad'],
        },
        module4Article2: {
            content: `# Grooming y manipulación emocional: señales que los padres deben conocer

El grooming no suele empezar con una amenaza evidente. Muchas veces comienza con atención, halagos, interés constante o una sensación de cercanía que hace que el menor baje la guardia.

Por eso, para los padres, una de las claves no es solo advertir “no hables con extraños”, sino aprender a reconocer cómo se construye esa relación y cuándo una conversación deja de ser normal para volverse manipuladora.

## Lo más importante

El grooming funciona porque mezcla confianza y presión. La persona busca que el menor se sienta especial, entendido o acompañado, y después introduce peticiones, secretos o situaciones incómodas.

En la práctica, conviene prestar atención cuando una relación en línea:

* avanza demasiado rápido,
* se vuelve muy intensa,
* pide privacidad excesiva,
* o empieza a presionar al menor para demostrar confianza.

## Cómo puede empezar en cada plataforma

| Plataforma | Cómo puede comenzar | Qué debe vigilar un padre |
| --- | --- | --- |
| TikTok | Comentarios insistentes, seguimiento constante o intento de pasar a mensajes y luego a otra app | Si alguien busca contacto repetido o quiere mover la conversación a un espacio más privado |
| Instagram | Respuestas a historias, mensajes privados o cuentas que generan confianza rápido | Si el menor recibe atención intensa de alguien que no forma parte de su círculo real |
| Discord | Mensajes directos, conversación en servidores, voz o video en comunidades | Si una persona intenta hablar a solas, aislar al menor del grupo o mantener charlas muy frecuentes |

## 1. No empieza con contenido sexual de inmediato

Uno de los errores más comunes es imaginar que el grooming empieza con mensajes claramente sexuales. En realidad puede comenzar con:

* preguntas personales,
* bromas,
* apoyo emocional,
* interés excesivo,
* o una actitud de “solo quiero ayudarte”.

Ese primer acercamiento busca bajar la guardia del menor y hacer que vea la relación como algo normal.

## 2. La manipulación emocional es parte central del riesgo

La persona puede hacer sentir al menor que:

* tiene una conexión especial,
* por fin alguien lo entiende,
* o que esa relación es distinta a las demás.

Después puede aparecer la presión para compartir fotos, guardar secretos o demostrar confianza. El problema no es solo lo que pide, sino cómo va empujando al menor a ceder.

## 3. El secreto casi siempre es una mala señal

Cuando una persona dice:

* “no le digas a nadie”,
* “esto es solo entre nosotros”,
* o intenta separar al menor de sus adultos de confianza,

la interacción ya no es sana. Aunque el secreto por sí solo no pruebe un delito, sí es una señal muy importante de manipulación.

## 4. Las barreras técnicas ayudan, pero no lo resuelven todo

Las plataformas han añadido protecciones, pero ninguna sustituye la conversación y el acompañamiento.

* TikTok limita la mensajería directa en menores de 16 años.
* Instagram refuerza la protección en mensajes para cuentas adolescentes.
* Discord permite limitar mensajes directos, bloquear usuarios y reducir contacto no deseado.

Aun así, si el menor acepta el contacto o no reconoce la manipulación, el riesgo puede seguir existiendo.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Habla mucho con alguien que no conocen en casa | Puede haber una relación digital más cercana de lo esperado |
| Le piden guardar secretos sobre sus chats | Hay riesgo de manipulación |
| Se pone nervioso si un adulto ve ciertos mensajes | Puede sentirse presionado o confundido |
| Le insisten en mandar fotos, videos o pruebas de confianza | Es una señal grave |
| Cambia de app para hablar con la misma persona | Puede estar moviendo la conversación a un espacio más privado |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Decir claramente que ningún adulto o desconocido debe pedir secretos, fotos íntimas o pruebas de confianza | Le da al menor una regla simple y memorable |
| Revisar quién puede enviar mensajes y solicitudes | Reduce el contacto no deseado |
| Enseñar a bloquear y reportar desde la app | Da una salida práctica inmediata |
| Repetir que, si algo incomoda, no se castiga por contarlo | Favorece que el menor pida ayuda |
| Guardar capturas si hubo presión o manipulación | Permite reportar mejor y buscar apoyo |

## Preguntas útiles para conversar en casa

1. ¿Alguna vez alguien te ha hecho sentir especial demasiado rápido en una app?
2. ¿Sabes qué harías si te piden guardar una conversación en secreto?
3. ¿Qué harías si alguien te pide una foto que te incomoda?
4. ¿Te sentirías tranquilo contándome algo así, aunque te dé pena?
5. ¿Sabes cómo bloquear o reportar a alguien en la app que usas más?

## Idea clave

El grooming no siempre parece peligroso al principio. Suele disfrazarse de atención, apoyo o cercanía.

Por eso es tan importante enseñar a los hijos que el problema no empieza solo cuando alguien amenaza, sino también cuando alguien presiona, aísla o pide secretos.

## Cierre

En TikTok, Instagram y Discord, el riesgo no está solo en hablar con desconocidos, sino en no reconocer cuándo una interacción se vuelve manipuladora.

Cuando los padres conocen las señales, configuran bien mensajes y privacidad, y dejan claro que el menor puede pedir ayuda sin miedo, aumentan mucho la posibilidad de detectar el problema antes de que escale.`,
            teaches: [
                'grooming',
                'manipulación emocional',
                'cercanía rápida',
                'halagos',
                'secretos en línea',
                'pruebas de confianza',
                'presión para enviar fotos',
                'mover la conversación',
                'aislamiento del menor',
                'bloquear y reportar',
                'pedir ayuda sin miedo',
                'señales de alerta',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Grooming', 'Manipulación emocional', 'Contacto con desconocidos', 'Privacidad'],
        },
        module5Article1: {
            content: `# Contenido inapropiado y exposición accidental en redes sociales

Muchos padres imaginan que un menor solo ve contenido problemático si lo busca. En la práctica, no siempre ocurre así. En redes sociales, la exposición puede ser accidental: aparece por recomendaciones, por contenido compartido por otros, por comentarios, por mensajes o por entrar a comunidades donde circula material que no era el objetivo inicial.

## Lo más importante

El problema no es solo que exista contenido inapropiado, sino que los menores pueden encontrarlo con muy poca fricción.

A veces llega sin que lo busquen:

* por recomendaciones,
* por autoplay o cadenas de contenido,
* por material compartido por otros,
* por mensajes directos,
* o por comunidades donde circulan imágenes, videos o lenguaje no adecuados.

Por eso, la mejor prevención combina configuración, supervisión y conversación.

## Cómo puede aparecer en cada plataforma

| Plataforma | Cómo puede llegar el contenido inapropiado | Qué debe vigilar un padre |
| --- | --- | --- |
| TikTok | Recomendaciones del feed, directos, comentarios, búsquedas y hashtags | Si el menor entra en una cadena de videos cada vez más intensos o perturbadores |
| Instagram | Reels, explorar, perfiles sugeridos, mensajes, comentarios y contenido sensible | Si empieza a ver contenido violento, sexualizado o perturbador aunque no lo siga directamente |
| Discord | Mensajes directos, servidores, canales, archivos compartidos e imágenes sensibles | Si entra a comunidades abiertas o recibe mensajes de personas fuera de su círculo real |

## 1. En TikTok, el riesgo suele venir del flujo continuo

TikTok puede llevar al menor de un video aparentemente normal a otro más intenso sin que lo haya buscado de forma directa.

### Qué debe notar un padre
* si el contenido se vuelve cada vez más raro, fuerte o perturbador,
* si el menor se queda atrapado en una cadena de videos,
* o si ciertos temas empiezan a aparecer una y otra vez.

## 2. En Instagram, el contenido sensible no desaparece por completo

Instagram ofrece configuraciones más protectoras para adolescentes, pero eso no significa que el contenido sensible desaparezca por completo. La exposición puede venir por explorar, Reels, perfiles sugeridos, mensajes o comentarios.

### Qué debe notar un padre
* si aparecen temas violentos, sexualizados o perturbadores,
* si el menor encuentra contenido que no seguía,
* o si ciertas recomendaciones empiezan a cambiar el tono de lo que ve.

## 3. En Discord, el problema suele entrar por la interacción

Discord no se mueve por un feed continuo como TikTok o Instagram. Aquí la exposición muchas veces llega por comunidades, mensajes y archivos compartidos.

### Qué debe notar un padre
* si el menor entra a servidores abiertos,
* si recibe archivos o imágenes de personas que no conoce,
* o si ciertos canales empiezan a circular contenido demasiado adulto o perturbador.

## 4. La exposición accidental también puede venir por lo que otros comparten

Un menor no necesita seguir una cuenta problemática para terminar viendo algo dañino. A veces basta con que otra persona:

* comparta un video,
* responda una historia,
* reenvíe una imagen,
* o lo invite a una comunidad donde circula contenido sensible.

Por eso conviene hablar no solo de lo que el menor busca, sino también de lo que puede aparecerle por la actividad de otros.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Cambia rápido de pantalla al usar una app | Puede haber visto algo que le incomoda o sabe que no debería estar viendo |
| Se altera o se pone ansioso después de usar cierta red | El contenido puede estar afectando su bienestar |
| Empieza a repetir temas, imágenes o lenguaje muy adulto | Puede haber exposición a material no adecuado para su edad |
| Borra historial, deja grupos o evita hablar de lo que ve | Puede estar intentando ocultar una experiencia incómoda |
| Tiene pesadillas, miedo o curiosidad intensa por temas perturbadores | El contenido puede haberlo impactado más de lo que parece |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Activar modos restringidos o filtros disponibles | Reduce parte del contenido no deseado |
| Mantener las configuraciones sensibles más protectoras | Baja la exposición en áreas de exploración o descubrimiento |
| Ajustar filtros de contenido y mensajes en comunidades | Reduce imágenes y contacto no deseado |
| Revisar historial, recomendaciones y comunidades de vez en cuando | Permite detectar patrones antes de que crezcan |
| Hablar con claridad sobre qué hacer si aparece algo incómodo | Le da al menor una respuesta práctica e inmediata |

## Preguntas útiles para conversar en casa

1. ¿Alguna vez te ha aparecido algo que no querías ver?
2. ¿Sabes cómo salir, bloquear o reportar si pasa?
3. ¿Qué harías si alguien te manda una imagen o video incómodo?
4. ¿Hay alguna app o grupo donde sientas que aparece contenido raro o fuerte?
5. ¿Te gustaría que revisáramos juntos qué filtros están activados?

## Idea clave

La exposición accidental es uno de los riesgos más comunes en redes sociales. No siempre ocurre porque el menor busque algo malo, sino porque el diseño de la plataforma, el contenido compartido por otros o la interacción en comunidades puede acercarlo a material que no estaba preparado para ver.

## Cierre

TikTok, Instagram y Discord han añadido herramientas para reducir la exposición a contenido sensible, pero ninguna sustituye la presencia adulta.

Cuando los padres entienden cómo llega ese contenido, configuran mejor las plataformas y mantienen una conversación clara con sus hijos, aumentan mucho la posibilidad de prevenir una experiencia negativa o de detectarla a tiempo.`,
            teaches: [
                'contenido inapropiado',
                'exposición accidental',
                'recomendaciones',
                'autoplay',
                'contenido sensible',
                'mensajes directos',
                'servidores abiertos',
                'archivos compartidos',
                'cadenas de videos',
                'filtros de contenido',
                'señales de alerta',
                'salir bloquear reportar',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Contenido inapropiado', 'Exposición accidental', 'Desinformación', 'Bienestar emocional'],
        },
        module5Article2: {
            content: `# Retos virales, rumores y desinformación: por qué los niños los creen y comparten

No todo lo que un menor comparte en redes lo hace porque sea ingenuo o porque quiera hacer algo malo. Muchas veces lo comparte porque le pareció divertido, urgente, sorprendente o porque sintió que todo el mundo lo estaba viendo.

## Lo más importante

Los retos virales, rumores y contenidos falsos se comparten con facilidad porque apelan a emociones rápidas:

* miedo,
* risa,
* sorpresa,
* indignación,
* o curiosidad.

Además, muchas plataformas facilitan descubrir, comentar, reenviar o repetir contenido sin detenerse demasiado a verificarlo.

## Por qué estos contenidos se propagan tan rápido

Las tres plataformas del curso tienen mecánicas distintas, pero comparten algo: facilitan que una idea o un reto se repita rápido.

| Plataforma | Qué hace que algo se vuelva viral o se repita |
| --- | --- |
| TikTok | El algoritmo puede reforzar contenido parecido según lo que el usuario mira e interactúa |
| Instagram | La combinación de perfiles, comentarios, mensajes y contenido recomendado facilita repetir tendencias y rumores |
| Discord | Los servidores y chats hacen que la información circule rápido dentro de grupos y comunidades |

## 1. Los menores no siempre buscan informarse; muchas veces buscan pertenecer

Un niño o adolescente puede compartir algo falso no porque lo haya analizado y aceptado como cierto, sino porque quiere:

* participar en una conversación,
* no quedarse fuera,
* sentirse parte del grupo,
* o ganar visibilidad.

Por eso conviene entender que compartir no siempre nace de mala intención, sino de presión social, emoción o deseo de pertenecer.

## 2. Lo impactante se siente más verdadero de lo que es

Los rumores, retos virales o supuestas noticias suelen usar frases o formatos que empujan a reaccionar rápido:

* “haz esto ya”,
* “todos lo están haciendo”,
* “mira lo que pasó”,
* “no te lo vas a creer”.

Cuando algo provoca miedo, urgencia o morbo, baja la probabilidad de que el menor haga una pausa para verificarlo.

## 3. El algoritmo y la repetición pueden dar una falsa sensación de verdad

Si un menor ve, repite o interactúa con cierto tipo de contenido, puede recibir más piezas parecidas. Cuando una misma idea aparece muchas veces, puede sentirse más creíble, aunque no esté verificada.

El problema no es solo el contenido original, sino el efecto de repetición.

## 4. Ver algo en muchos lugares no significa que sea cierto

Una misma idea puede circular como:

* video corto,
* historia,
* comentario,
* mensaje,
* o conversación dentro de un servidor.

Ver algo repetido en varios espacios puede hacer que el menor piense que ya fue confirmado, cuando en realidad solo fue muy compartido.

## 5. Los retos virales añaden presión para actuar

En los retos, el contenido no solo invita a mirar: invita a imitar. El menor puede sentir que, si no participa, se queda fuera.

Aquí el problema no es solo creer algo falso, sino sentir presión para:

* hacer algo,
* grabarlo,
* compartirlo,
* o reaccionar rápido sin pensar si es seguro o verdadero.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Comparte contenido sin leerlo bien | Está reaccionando más por impulso que por criterio |
| Repite rumores como si fueran hechos | No está diferenciando entre repetición y verdad |
| Se deja llevar por títulos alarmistas o urgentes | El contenido está manipulando emociones rápidas |
| Siente mucha urgencia por hacer lo que todos hacen | Hay presión social o miedo a quedarse fuera |
| No puede responder quién hizo el contenido o por qué | No está revisando fuente ni intención |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Preguntar quién hizo ese contenido | Ayuda a pensar en la fuente |
| Preguntar si quiere informar, entretener o provocar | Ayuda a detectar intención |
| Hablar de emociones rápidas como miedo o urgencia | Reduce el impulso de compartir sin pensar |
| Revisar juntos un reto o rumor antes de juzgar | Convierte el error en aprendizaje |
| Recordar que popular no significa verdadero | Fortalece pensamiento crítico |

## Preguntas útiles para conversar en casa

1. ¿Quién publicó esto primero?
2. ¿Cómo sabes que es verdad?
3. ¿Te hizo sentir miedo, enojo o mucha urgencia?
4. ¿Lo compartiste porque lo verificaste o porque te impactó?
5. ¿Crees que ese reto es seguro o solo parece divertido?

## Idea clave

Los menores no creen y comparten rumores solo por falta de información. Muchas veces lo hacen porque el contenido está diseñado para impactar, porque se repite mucho o porque participar les da sensación de pertenencia.

Enseñarles a hacer una pausa y a hacerse buenas preguntas vale más que solo decirles que no crean todo lo que ven.

## Cierre

Este tema no repite el artículo anterior: allí el foco era la exposición accidental a contenido no adecuado; aquí el foco es cómo funciona la credibilidad y la presión para compartir.

Cuando los padres entienden esa diferencia, pueden acompañar mejor: no solo proteger de lo que aparece, sino también enseñar a pensar antes de creer, repetir o imitar.`,
            teaches: [
                'retos virales',
                'rumores',
                'desinformación',
                'viralidad',
                'presión social',
                'pertenencia',
                'repetición',
                'fuente',
                'intención del contenido',
                'emociones rápidas',
                'pensamiento crítico',
                'popular no significa verdadero',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Desinformación', 'Retos virales', 'Presión social', 'Pensamiento crítico'],
        },
        module6Article1: {
            content: `# Publicidad disfrazada, influencers y contenido patrocinado en TikTok e Instagram

En TikTok e Instagram, la publicidad no siempre aparece como un anuncio tradicional. Muchas veces llega integrada al video, al reel, a la historia o a la recomendación de un creador que el menor ya sigue y en quien confía.

Ahí está el problema: cuando la promoción parece una opinión espontánea, una sugerencia amistosa o parte natural del entretenimiento, resulta mucho más difícil reconocer que también hay un interés comercial detrás.

## Lo más importante

A muchos menores no les cuesta identificar qué producto aparece, sino darse cuenta de que les están vendiendo algo.

La clave para los padres no es prohibir toda recomendación de influencers, sino enseñar a distinguir entre:

* una opinión personal,
* una promoción,
* y un contenido influido por una marca.

## Cómo suele verse en cada plataforma

| Plataforma | Cómo se mezcla la publicidad con el contenido | Qué debe notar un padre |
| --- | --- | --- |
| TikTok | Un creador habla de una marca, usa un producto o hace un video promocional como si fuera parte normal de su contenido | Puede parecer una recomendación auténtica aunque exista un acuerdo comercial |
| Instagram | Un reel, historia o publicación muestra una marca, etiqueta un negocio o usa la marca de paid partnership | El contenido puede sentirse personal aunque esté influido por una empresa |

## 1. Cuando la publicidad se parece a una recomendación

El mayor riesgo no siempre es la publicidad abierta, sino la que parece consejo o gusto personal.

Si un creador dice que algo:

* le encanta,
* le funciona,
* o lo usa siempre,

un menor puede pensar que es una opinión neutral, cuando en realidad puede haber una relación comercial detrás.

## 2. En TikTok, parte del contenido comercial debe marcarse

TikTok obliga a revelar cierto contenido comercial mediante herramientas de divulgación. Eso ayuda, pero no resuelve todo, porque un menor puede no fijarse en la etiqueta o no entender lo que significa.

### Qué debe notar un padre
* si el video muestra una marca de forma muy destacada,
* si parece una recomendación demasiado alineada con una venta,
* o si hay señales de promotional content o paid partnership.

## 3. En Instagram, el contenido patrocinado puede sentirse muy natural

Instagram permite que una historia, reel o publicación use una etiqueta de paid partnership. Aun así, el contenido puede verse muy parecido al resto de lo que publica el creador.

### Qué debe notar un padre
* si el contenido muestra productos como parte de la rutina del influencer,
* si una marca aparece etiquetada,
* o si la publicación parece personal pero también empuja a admirar o desear algo.

## 4. Que exista una etiqueta no significa que el menor la entienda

Aquí el reto no es solo ver la marca, sino comprender la intención comercial.

Un menor puede notar un producto y aun así no entender:

* que alguien recibió pago,
* que existe un acuerdo,
* o que la forma de presentar el producto está influida por ese beneficio.

Por eso la educación crítica sigue siendo más importante que depender solo de la etiqueta.

## 5. El problema no es solo vender; también es influir

Un menor puede no comprar nada hoy y aun así quedar influido por lo que ve:

* qué marcas dan estatus,
* qué productos parecen necesarios,
* qué apariencia se vuelve deseable,
* o qué hábitos se presentan como normales.

La influencia comercial también moldea gustos, admiración y presión por consumir.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Repite marcas o frases de creadores como si fueran gustos propios | Puede estar recibiendo promoción como si fuera recomendación neutral |
| No distingue cuándo una publicación tiene etiqueta comercial | Le cuesta reconocer intención de venta |
| Cree que un influencer recomienda porque sí todo lo que muestra | Está idealizando la cercanía del creador |
| Empieza a desear productos solo por verlos en creadores favoritos | La influencia comercial ya está afectando su criterio |
| Asocia popularidad con sinceridad o necesidad | Está mezclando admiración con confianza automática |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Enseñar a buscar etiquetas como Paid partnership o Promotional content | Ayuda a reconocer cuándo hay una relación comercial |
| Preguntar si lo muestra porque le gusta o porque le pagan | Desarrolla pensamiento crítico |
| Explicar que un influencer también puede estar vendiendo aunque parezca cercano | Reduce la idealización |
| Ver juntos algunas publicaciones y detectar señales de promoción | Convierte el aprendizaje en algo práctico |
| Recordar que popular no significa sincero ni necesario | Reduce presión comercial |

## Preguntas útiles para conversar en casa

1. ¿Cómo sabes si un creador realmente recomienda algo o si está haciendo publicidad?
2. ¿Viste alguna etiqueta que indique que hay una marca involucrada?
3. ¿Qué te hace confiar en ese influencer?
4. ¿Crees que mostrar un producto cambia si le pagaron por hacerlo?
5. ¿Cómo te darías cuenta de que un video quiere venderte algo?

## Idea clave

La publicidad más efectiva para menores no siempre parece publicidad.

Por eso, una parte importante del acompañamiento parental no es solo bloquear compras, sino enseñar a los hijos a detectar cuándo una marca está presente, qué gana el creador y cómo esa relación puede influir en lo que dice.

## Cierre

Este tema no repite lo ya visto sobre compras directas: aquí el centro está en la influencia comercial antes de la compra.

TikTok e Instagram permiten que la promoción se mezcle con contenido atractivo y cercano. Cuando los padres aprenden a identificar etiquetas, alianzas y señales de patrocinio, pueden ayudar a sus hijos a consumir con más criterio y menos ingenuidad.`,
            teaches: [
                'publicidad disfrazada',
                'influencers',
                'contenido patrocinado',
                'paid partnership',
                'promotional content',
                'intención comercial',
                'recomendación aparente',
                'marca etiquetada',
                'influencia comercial',
                'pensamiento crítico',
                'popular no significa sincero',
                'señales de promoción',
            ],
            platforms: ['TikTok', 'Instagram'],
            riskAreas: ['Publicidad', 'Consumo', 'Influencia comercial', 'Pensamiento crítico'],
        },
        module6Article2: {
            content: `# Regalos, suscripciones, monedas y compras impulsivas en redes y comunidades

En redes sociales y comunidades digitales, gastar no siempre se siente como comprar. A veces aparece como enviar un regalo a un creador, recargar monedas, apoyar a alguien en un directo o regalar una suscripción a un amigo.

Ese diseño hace que el dinero se perciba menos como gasto y más como participación, cercanía o pertenencia.

## Lo más importante

El riesgo no siempre está en una compra grande. Muchas veces empieza con una acción pequeña y emocional:

* “solo quiero que me lea”,
* “solo quiero apoyar”,
* “solo quiero entrar al grupo”,
* o “solo quiero regalarle algo a un amigo”.

Como estas funciones están integradas al contenido y a la conversación, pueden sentirse más impulsivas que una compra tradicional.

## Cómo aparece el gasto en cada plataforma

| Plataforma | Mecanismo de gasto | Qué debe notar un padre |
| --- | --- | --- |
| TikTok | Coins y Gifts en videos o directos | El gasto se convierte en una forma de reaccionar o llamar la atención |
| Instagram | Stars y Gifts en Reels; también gifting de ciertas suscripciones | El apoyo económico se integra al consumo de contenido |
| Discord | Nitro, Nitro Basic y regalos de suscripción | El gasto puede mezclarse con amistad, estatus o pertenencia en la comunidad |

## 1. En TikTok, el dinero entra como monedas y regalos

TikTok convierte parte de la reacción del usuario en una ruta directa de gasto. Lo que parece una forma de participar o hacerse notar puede implicar dinero real.

### Qué debe notar un padre
* si el menor habla de recargar monedas,
* si quiere mandar regalos para llamar la atención,
* o si ve el gasto como parte normal de ver contenido.

## 2. En Instagram, el gasto entra como Stars, Gifts y algunas suscripciones regaladas

En Instagram el gasto puede sentirse menos como compra de un objeto y más como una forma de apoyar o estar cerca del creador.

### Qué debe notar un padre
* si el menor habla de mandar gifts o comprar stars,
* si entiende ese apoyo como algo pequeño o emocional,
* o si no conecta ese gesto con dinero real.

## 3. En Discord, el gasto puede sentirse más social que comercial

Discord mezcla el gasto con comunidad, amistad e identidad. Regalar Nitro o suscripciones puede verse como una forma de pertenecer, destacar o hacer un gesto dentro del grupo.

### Qué debe notar un padre
* si el menor habla de regalar Nitro,
* si siente presión por tener ciertos beneficios para encajar,
* o si el gasto aparece ligado a amistad, estatus o pertenencia.

## 4. El problema aumenta cuando ya hay un método de pago configurado

Cuando una cuenta o dispositivo ya tiene una tarjeta o método de pago guardado, la barrera para comprar baja mucho.

Por eso conviene revisar no solo la plataforma, sino también:

* App Store,
* Google Play,
* Family Link,
* o las restricciones del dispositivo.

## 5. Las reglas de edad ayudan, pero no sustituyen la supervisión

Algunas funciones tienen límites por edad, pero eso no significa que el problema desaparezca solo por la regla.

El gasto puede seguir entrando por:

* pagos ya configurados,
* cuentas del adulto,
* regalos de suscripción,
* o funciones sociales que el menor ve como normales.

## Señales de alerta

| Señal | Qué puede indicar |
| --- | --- |
| Habla de recargar, mandar regalos o comprar stars sin pensar en dinero real | Está viendo el gasto como una reacción social, no como una compra |
| Pide acceso a métodos de pago “solo por un momento” | Puede haber riesgo de compra impulsiva |
| Ve Coins, Stars o regalos como algo pequeño por ser digital | No está conectando moneda virtual con costo real |
| Quiere gastar para apoyar, pertenecer o ser tomado en cuenta | El gasto puede estar ligado a presión emocional o social |
| No sabe si hay una tarjeta guardada en el dispositivo | Hay riesgo de compra sin comprender bien la barrera real |

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Revisar si hay tarjetas o métodos de pago guardados | Reduce compras impulsivas |
| Activar aprobación de compras o restricciones del dispositivo | Añade una barrera antes del pago |
| Explicar que Coins, Stars y Nitro equivalen a dinero real | Hace visible el costo |
| No dejar cuentas de menores con pagos configurados sin supervisión | Baja el riesgo de gasto accidental |
| Hablar de apoyar sin gastar | Reduce la presión emocional de comprar |

## Preguntas útiles para conversar en casa

1. ¿Sabes cuánto dinero real hay detrás de una moneda, una star o un regalo digital?
2. ¿Crees que mandar un regalo hace que un creador o un grupo te valore más?
3. ¿Qué harías si una app te pide recargar para participar mejor?
4. ¿Sabes si en tu teléfono hay una tarjeta guardada para compras?
5. ¿Te gustaría que revisáramos juntos qué pagos o permisos están activos?

## Idea clave

Este tema no repite el artículo anterior. Allí el centro fue cómo la promoción comercial influye en lo que el menor desea. Aquí el centro es cómo la plataforma facilita el gasto directo mediante regalos, monedas, stars y suscripciones.

Entender esa diferencia ayuda a prevenir no solo manipulación comercial, sino también compras impulsivas dentro del entorno digital.

## Cierre

En TikTok, Instagram y Discord, gastar puede sentirse menos como una compra y más como una reacción social. Justamente por eso requiere atención.

Cuando los padres revisan métodos de pago, activan barreras de compra y explican que detrás de cada Coin, Star o regalo hay dinero real, ayudan a que el menor participe con más criterio y menos impulsividad.`,
            teaches: [
                'coins',
                'gifts',
                'stars',
                'nitro',
                'suscripciones regaladas',
                'método de pago guardado',
                'dinero real',
                'compras impulsivas',
                'presión social para gastar',
                'aprobación de compras',
                'regalos digitales',
                'apoyar sin gastar',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Compras impulsivas', 'Consumo', 'Presión social', 'Métodos de pago'],
        },
        module7Article1: {
            content: `# Controles parentales y configuraciones de seguridad en TikTok, Discord e Instagram

Configurar una red social no elimina todos los riesgos, pero sí puede reducir mucho la exposición innecesaria, el contacto no deseado y el uso impulsivo. El objetivo no es vigilar cada clic, sino crear un entorno más seguro y predecible según la edad y madurez del menor.

## Lo más importante

No todas las plataformas se supervisan igual.

* En TikTok, los controles se concentran mucho en tiempo de uso, contenido e interacciones.
* En Instagram, el eje está en las Teen Accounts, la privacidad, los mensajes y el contenido sensible.
* En Discord, el foco está más en actividad social, mensajes, solicitudes y filtros de contenido.

Por eso, la mejor decisión no es aplicar la misma regla a todas, sino usar las herramientas propias de cada app.

## Resumen rápido de controles útiles

| Plataforma | Ajustes más útiles para familias | Para qué sirven |
| --- | --- | --- |
| TikTok | Family Pairing, límite diario, horario sin uso, filtros por palabras, Restricted Mode, control de mensajes y comentarios | Reducir tiempo, filtrar contenido y limitar interacción |
| Instagram | Teen Accounts, cuenta privada, límites en mensajes, control de contenido sensible, supervisión y límites de tiempo | Proteger privacidad, mensajes y exposición a contenido sensible |
| Discord | Family Center, solicitudes de mensaje, DMs de miembros de servidor, filtros de contenido sensible, solicitudes de amistad | Reducir contacto no deseado y mejorar visibilidad del uso |

## 1. TikTok: muchos controles parentales en una sola plataforma

TikTok permite vincular la cuenta del adulto con la del adolescente mediante Family Pairing. Desde ahí se pueden gestionar ajustes sobre:

* tiempo diario,
* panel de uso,
* horarios sin acceso,
* silenciamiento de notificaciones,
* filtros por palabras,
* Restricted Mode,
* mensajes directos,
* comentarios,
* y visibilidad de la cuenta.

### Qué debe notar un padre
* TikTok ayuda mucho a ordenar tiempo, contenido e interacción.
* Algunas restricciones ya vienen reforzadas por edad.
* El control técnico sirve más cuando el menor también entiende por qué existe.

## 2. Instagram: protección centrada en privacidad, mensajes y contenido sensible

Instagram concentra buena parte de su protección en las Teen Accounts. La lógica aquí gira más alrededor de:

* cuenta privada,
* mensajes limitados,
* contenido sensible en modo más restrictivo,
* supervisión parental,
* y límites de tiempo.

### Qué debe notar un padre
* la privacidad y la mensajería son piezas centrales,
* la protección ayuda bastante, pero no sustituye acompañamiento,
* y la supervisión permite revisar ajustes sin convertir todo en vigilancia invasiva.

## 3. Discord: más enfocado en actividad social, solicitudes y mensajes

Discord funciona distinto a TikTok o Instagram. Aquí los riesgos y controles giran más alrededor de:

* servidores,
* mensajes directos,
* solicitudes de amistad,
* filtros de contenido sensible,
* y actividad social.

Family Center permite acompañar sin leer mensajes privados, lo que puede ser útil para equilibrar seguridad y autonomía.

### Qué debe notar un padre
* Discord requiere mirar más con quién habla el menor que qué contenido “consume”.
* Los filtros y ajustes de mensajes son especialmente importantes.
* Conviene revisar bien qué contactos, solicitudes y DMs están permitidos.

## 4. El control técnico ayuda, pero no reemplaza la conversación

Una cuenta bien configurada reduce riesgos, pero no enseña por sí sola:

* qué hacer si llega un mensaje raro,
* cómo pedir ayuda,
* o por qué cierta regla existe.

Por eso, los controles funcionan mejor cuando forman parte de una conversación familiar continua sobre:

* hábitos,
* contactos,
* tiempo,
* contenido,
* y seguridad.

## Señal de alerta

Una señal de alerta es pensar que ya está protegido solo porque la plataforma tiene controles activados.

Si el menor no entiende:

* por qué existe una regla,
* qué hacer si algo lo incomoda,
* o cómo pedir ayuda,

la protección queda incompleta aunque la configuración sea correcta.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Activar Family Pairing, Teen Accounts o Family Center según la app | Aprovecha los controles oficiales de cada plataforma |
| Revisar juntos mensajes, privacidad y tiempo de uso | Evita que la configuración se quede olvidada |
| Mantener filtros y mensajes en la opción más protectora al inicio | Reduce exposición innecesaria |
| Explicar al menor para qué sirve cada límite | Favorece cooperación en vez de resistencia |
| Ajustar reglas conforme cambia la edad y madurez | Evita controles demasiado laxos o demasiado rígidos |

## Preguntas útiles para conversar en casa

1. ¿Sabes quién puede enviarte mensajes en esta aplicación?
2. ¿Te gustaría revisar juntos qué filtros o límites están activados?
3. ¿Qué ajuste te parece más útil: tiempo, privacidad o mensajes?
4. ¿Sabes qué hacer si te aparece algo incómodo o alguien te escribe raro?
5. ¿Qué regla te ayudaría a sentirte más seguro sin sentirte vigilado?

## Idea clave

Los controles parentales funcionan mejor cuando se ven como una base de seguridad, no como una solución mágica.

TikTok ayuda más con tiempo, contenido e interacción; Instagram con privacidad, mensajes y contenido sensible; y Discord con actividad social, solicitudes y filtros. Cuando los padres entienden esa diferencia, configuran mejor y acompañan con más criterio.

## Cierre

Este artículo no repite lo anterior porque aquí el foco no está en el riesgo, sino en la herramienta concreta. Saber dónde tocar, qué activar y qué revisar en cada plataforma permite pasar de la preocupación general a una prevención más útil.

Y cuando esos ajustes se combinan con conversación y reglas claras, la protección del menor se vuelve mucho más sólida.`,
            teaches: [
                'family pairing',
                'teen accounts',
                'family center',
                'restricted mode',
                'filtros de palabras',
                'límites de tiempo',
                'mensajes directos',
                'contenido sensible',
                'solicitudes de amistad',
                'privacidad de la cuenta',
                'controles parentales',
                'conversación familiar',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Control parental', 'Privacidad', 'Mensajes', 'Contenido sensible'],
        },
        module7Article2: {
            content: `# Cómo acompañar a un hijo en redes sociales sin caer en vigilancia excesiva

Acompañar a un hijo en redes sociales no significa revisar todo lo que hace ni convertir el celular en un campo de batalla. Significa estar presente, entender qué plataformas usa, conocer sus funciones básicas y crear un ambiente donde el menor sepa que puede pedir ayuda sin miedo.

## Lo más importante

La supervisión útil no busca enterarse de cada detalle, sino reducir riesgos y fortalecer criterio.

Cuando un padre solo aparece para castigar o revisar a escondidas, el menor aprende a ocultar. Cuando el adulto conversa, explica reglas y mantiene presencia constante, el menor tiene más probabilidades de contar lo que le pasa.

## Acompañar no es lo mismo que vigilar

| Acompañar | Vigilar en exceso |
| --- | --- |
| Preguntar qué le gusta de una aplicación | Revisar todo sin avisar |
| Ver juntos contenido de vez en cuando | Intervenir solo cuando hay problema |
| Explicar reglas y motivos | Imponer reglas sin contexto |
| Revisar configuraciones con el menor | Cambiar ajustes sin hablarlo |
| Ajustar límites según edad y madurez | Aplicar el mismo control siempre |

## 1. Interesarse funciona mejor que interrogar

Una conversación suele abrir más puertas que una revisión sorpresa.

Preguntas como:

* qué te gusta de esa cuenta,
* por qué te gusta ese servidor,
* o qué te gusta de esa red,

ayudan más que empezar desde la desconfianza.

## 2. Los controles sirven, pero no sustituyen la relación

TikTok, Instagram y Discord ofrecen herramientas útiles, pero ninguna enseña por sí sola:

* qué hacer si llega un mensaje raro,
* cómo pedir ayuda,
* o cómo responder si una regla le genera presión con otras personas.

Los controles funcionan mejor cuando están dentro de una relación donde el menor entiende para qué sirven.

## 3. La estructura de confianza necesita límites

Acompañar no significa dejar todo abierto. También hace falta estructura:

* horarios,
* momentos sin pantallas,
* acuerdos sobre comunidades nuevas,
* revisión conjunta de configuraciones,
* y reglas claras para mensajes, tiempo o privacidad.

El límite funciona mejor cuando no depende del enojo del día, sino de una rutina comprensible.

## 4. El ejemplo del adulto pesa mucho

Es difícil pedir equilibrio, privacidad y calma si los adultos no modelan nada de eso.

Un menor nota rápido si:

* se le exige desconectarse mientras los adultos viven pegados al teléfono,
* se habla de privacidad, pero se publica todo sin pensar,
* o se habla de confianza, pero solo aparece el control cuando hay crisis.

## Señales de que hace falta más acompañamiento

Conviene poner atención si el menor:

* evita hablar de una aplicación concreta,
* cambia rápido de pantalla cuando alguien se acerca,
* se altera mucho después de conectarse,
* parece depender demasiado de la aprobación digital,
* o empieza a sentir que pedir ayuda traerá castigo seguro.

También conviene revisar si las reglas quedaron desactualizadas para la edad o el momento que vive.

## Qué pueden hacer los padres

| Acción | Para qué ayuda |
| --- | --- |
| Pedir que muestre sus cuentas, canales o servidores favoritos | Permite conocer su entorno digital real |
| Revisar juntos privacidad, mensajes y tiempo de uso | Convierte la configuración en aprendizaje |
| Acordar momentos para hablar de lo que pasa en línea | Evita que la conversación solo aparezca en crisis |
| Usar controles parentales como apoyo, no como única estrategia | Combina seguridad con confianza |
| Dejar claro que pedir ayuda no traerá castigo automático | Facilita que el menor tenga un lugar seguro para contar |

## Preguntas útiles para conversar en casa

1. ¿Qué te gusta de esa red o comunidad?
2. ¿Hay algo que te incomode de esa aplicación?
3. ¿Qué harías si alguien te escribe algo raro?
4. ¿Qué regla te parece justa para usar esta plataforma?
5. ¿Quieres que revisemos juntos privacidad, mensajes o tiempo de uso?

## Idea clave

Supervisar bien no es saberlo todo. Es crear una relación en la que el menor tenga límites claros, herramientas de seguridad activadas y suficiente confianza como para contar lo que le pasa.

Las plataformas ya están diseñando funciones familiares bajo ese principio: más apoyo y visibilidad general, menos vigilancia total.

## Cierre

Este artículo no trata de qué botón activar, sino de cómo sostener una relación sana alrededor de TikTok, Instagram y Discord.

Cuando el adulto entiende la aplicación, conversa con frecuencia, ajusta reglas con sentido y usa los controles como apoyo, la supervisión deja de sentirse como persecución y empieza a funcionar como acompañamiento real.`,
            teaches: [
                'acompañamiento digital',
                'vigilancia excesiva',
                'preguntas abiertas',
                'revisión conjunta',
                'reglas con contexto',
                'límites claros',
                'rutinas digitales',
                'ejemplo adulto',
                'confianza',
                'pedir ayuda sin castigo',
                'controles como apoyo',
                'acompañar sin invadir',
            ],
            platforms: ['TikTok', 'Discord', 'Instagram'],
            riskAreas: ['Acompañamiento familiar', 'Bienestar digital', 'Confianza', 'Supervisión'],
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

    const module2QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Datos de perfil', value: 'Información como foto, nombre de usuario, apodo o biografía que puede identificar o perfilar al menor' },
                    { key: 'Red de contactos', value: 'Personas que sigue, lo siguen o con las que se relaciona dentro de la plataforma' },
                    { key: 'Permisos del dispositivo', value: 'Accesos a cámara, micrófono, fotos, contactos o ubicación que amplían la información disponible' },
                    { key: 'Huella digital', value: 'Rastro que dejan publicaciones, reacciones, actividad, contactos y hábitos dentro de internet' },
                    { key: 'Cuenta privada', value: 'Configuración que reduce visibilidad, pero no elimina por completo el rastro digital' },
                ],
                correctAnswer: {
                    'Datos de perfil': 'Información como foto, nombre de usuario, apodo o biografía que puede identificar o perfilar al menor',
                    'Red de contactos': 'Personas que sigue, lo siguen o con las que se relaciona dentro de la plataforma',
                    'Permisos del dispositivo': 'Accesos a cámara, micrófono, fotos, contactos o ubicación que amplían la información disponible',
                    'Huella digital': 'Rastro que dejan publicaciones, reacciones, actividad, contactos y hábitos dentro de internet',
                    'Cuenta privada': 'Configuración que reduce visibilidad, pero no elimina por completo el rastro digital',
                },
            },
            explanation: 'Tip: El módulo 2 separa con claridad qué datos quedan visibles, qué accesos da el dispositivo y por qué todo eso construye la huella digital del menor.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Un menor no comparte información solo cuando publica fotos. También deja datos a través de su [blank1], su red de [blank2], sus [blank3] del dispositivo y su [blank4] dentro de la app. Aunque una cuenta sea [blank5], la huella digital no desaparece por completo.',
                bank: ['perfil', 'contactos', 'permisos', 'actividad', 'privada'],
                correctAnswer: {
                    blank1: 'perfil',
                    blank2: 'contactos',
                    blank3: 'permisos',
                    blank4: 'actividad',
                    blank5: 'privada',
                },
            },
            explanation: 'Tip: La idea central del módulo es que la exposición no depende solo de publicar algo grande; también cuenta el perfil, la actividad, los permisos y la red social del menor.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada elemento según el tipo de dato que deja más expuesto.',
            type: 'match_columns',
            metadata: {
                left: ['Datos de perfil', 'Actividad dentro de la app', 'Ubicación y contexto'],
                right: [
                    'Foto de perfil y nombre de usuario',
                    'Servidores o espacios donde participa',
                    'Rutinas visibles en fotos o historias',
                    'Tiempo de uso e interacciones repetidas',
                    'Información sobre dónde está o cómo se mueve',
                    'Biografía y apodo visibles',
                ],
                correctAnswer: {
                    'Datos de perfil': [
                        'Foto de perfil y nombre de usuario',
                        'Biografía y apodo visibles',
                    ],
                    'Actividad dentro de la app': [
                        'Servidores o espacios donde participa',
                        'Tiempo de uso e interacciones repetidas',
                    ],
                    'Ubicación y contexto': [
                        'Rutinas visibles en fotos o historias',
                        'Información sobre dónde está o cómo se mueve',
                    ],
                },
            },
            explanation: 'Tip: Perfil, actividad y ubicación revelan cosas distintas, y el módulo 2 insiste en que todas cuentan para entender la exposición real del menor.',
            points: 12,
        },
        {
            text: 'Ordena la cadena básica con la que una publicación puede convertirse en parte de la huella digital.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'El menor publica, comenta o reacciona a algo.',
                    'La información queda visible para otras personas o para la plataforma.',
                    'Alguien puede verla, guardarla o interpretarla.',
                    'Ese contenido empieza a decir algo sobre gustos, hábitos o vínculos.',
                    'La huella digital crece y puede tener consecuencias más adelante.',
                ],
                correctAnswer: [
                    'El menor publica, comenta o reacciona a algo.',
                    'La información queda visible para otras personas o para la plataforma.',
                    'Alguien puede verla, guardarla o interpretarla.',
                    'Ese contenido empieza a decir algo sobre gustos, hábitos o vínculos.',
                    'La huella digital crece y puede tener consecuencias más adelante.',
                ],
            },
            explanation: 'Tip: La huella digital se forma cuando pequeñas acciones se convierten en información acumulada sobre la persona.',
            points: 8,
        },
        {
            text: 'Selecciona todas las acciones que el módulo identifica como parte de la construcción de la huella digital.',
            type: 'multiple_selection',
            options: [
                { text: 'Subir fotos o videos', isCorrect: true },
                { text: 'Comentar o reaccionar', isCorrect: true },
                { text: 'Seguir cuentas o unirse a grupos', isCorrect: true },
                { text: 'Compartir ubicación o contexto', isCorrect: true },
                { text: 'Mantener perfiles muy abiertos', isCorrect: true },
                { text: 'Participar en servidores o espacios sociales', isCorrect: true },
                { text: 'Cerrar una app durante un minuto', isCorrect: false },
                { text: 'Cambiar el fondo del teléfono sin usar redes', isCorrect: false },
                { text: 'Apagar el wifi por un momento', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 2 enseña que la huella digital se construye con publicaciones, actividad, relaciones y señales de contexto, no con acciones aisladas sin relación con la app.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea comparativa.',
            type: 'drop_down',
            metadata: {
                sentence: 'Una cuenta [blank1] reduce parte de la exposición, pero no elimina la [blank2]. Los permisos de [blank3], fotos o contactos pueden ampliar la información disponible. La ubicación es un dato especialmente [blank4]. Además, una captura o un [blank5] pueden hacer que un contenido circule más allá de su publicación original.',
                options: {
                    blank1: ['privada', 'vacía', 'falsa'],
                    blank2: ['huella digital', 'pantalla', 'contraseña'],
                    blank3: ['cámara', 'teclado', 'cargador'],
                    blank4: ['sensible', 'invisible', 'irrelevante'],
                    blank5: ['reenvío', 'apagado', 'borrador'],
                },
                correctAnswer: {
                    blank1: 'privada',
                    blank2: 'huella digital',
                    blank3: 'cámara',
                    blank4: 'sensible',
                    blank5: 'reenvío',
                },
            },
            explanation: 'Tip: El módulo 2 repite tres ideas clave: una cuenta privada ayuda, los permisos importan y un contenido puede seguir circulando aunque el menor crea que ya quedó atrás.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Foto de perfil',
                    'Nombre de usuario',
                    'Comentarios y reacciones',
                    'Mensajes y llamadas',
                    'Capturas de pantalla',
                    'Reenvíos',
                    'Hablar antes de publicar',
                    'Revisar permisos del teléfono',
                    'Revisar visibilidad de la cuenta',
                ],
                categories: ['Huella del menor', 'Circulación fuera de control', 'Acción preventiva'],
                correctAnswer: {
                    'Huella del menor': [
                        'Foto de perfil',
                        'Nombre de usuario',
                        'Comentarios y reacciones',
                        'Mensajes y llamadas',
                    ],
                    'Circulación fuera de control': [
                        'Capturas de pantalla',
                        'Reenvíos',
                    ],
                    'Acción preventiva': [
                        'Hablar antes de publicar',
                        'Revisar permisos del teléfono',
                        'Revisar visibilidad de la cuenta',
                    ],
                },
            },
            explanation: 'Tip: El módulo 2 separa bien tres planos: lo que el menor deja, cómo eso puede circular y qué puede hacer la familia para prevenir.',
            points: 15,
        },
        {
            text: 'Caso: Un adolescente dice que su cuenta es privada y por eso no hay problema en subir historias desde la escuela, aceptar todos los permisos de la app y comentar impulsivamente porque “si algo sale mal, lo borro”. ¿Cuál es la respuesta más alineada con el módulo 2?',
            type: 'case_study',
            options: [
                { text: 'Explicar que una cuenta privada ayuda pero no elimina la huella digital, revisar permisos, hablar de ubicación y recordar que comentarios, capturas y reenvíos también dejan consecuencias.', isCorrect: true },
                { text: 'Decirle que mientras no ponga su dirección completa no existe ningún riesgo real de exposición.', isCorrect: false },
                { text: 'Asumir que borrar una historia o comentario hace desaparecer por completo cualquier rastro o consecuencia futura.', isCorrect: false },
                { text: 'Centrarse solo en prohibir publicar fotos, sin revisar perfil, actividad, contactos ni permisos del dispositivo.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta recoge la idea central del módulo: la privacidad no depende solo de si la cuenta es pública o privada, sino de varias capas como perfil, permisos, actividad, visibilidad y circulación del contenido.',
            points: 15,
        },
    ];

    const module3QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su significado correcto.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Ciberacoso', value: 'Daño repetido en línea que puede aparecer como humillación, exclusión, rumores o mensajes hirientes' },
                    { key: 'Humillación pública', value: 'Exposición o ataque visible ante otras personas dentro de la plataforma' },
                    { key: 'Comparación social', value: 'Medirse constantemente frente a otros perfiles, cuerpos, vidas o niveles de popularidad' },
                    { key: 'Validación digital', value: 'Dar demasiado valor a likes, vistas, respuestas o aceptación en línea' },
                    { key: 'Guardar evidencia', value: 'Conservar capturas o pruebas para poder bloquear, reportar o pedir ayuda' },
                ],
                correctAnswer: {
                    'Ciberacoso': 'Daño repetido en línea que puede aparecer como humillación, exclusión, rumores o mensajes hirientes',
                    'Humillación pública': 'Exposición o ataque visible ante otras personas dentro de la plataforma',
                    'Comparación social': 'Medirse constantemente frente a otros perfiles, cuerpos, vidas o niveles de popularidad',
                    'Validación digital': 'Dar demasiado valor a likes, vistas, respuestas o aceptación en línea',
                    'Guardar evidencia': 'Conservar capturas o pruebas para poder bloquear, reportar o pedir ayuda',
                },
            },
            explanation: 'Tip: El módulo 3 distingue entre el daño directo del ciberacoso y la presión más silenciosa de la comparación, los likes y la necesidad de encajar.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok el ciberacoso puede sentirse muy [blank1] por comentarios o exposición en videos. En Discord suele aparecer más en la [blank2] dentro de chats o servidores. En Instagram la presión suele mezclarse con la [blank3] personal y la reacción de otros. Si un menor depende demasiado de likes o vistas, su [blank4] puede quedar muy ligada a la respuesta externa. Ante una situación de acoso conviene guardar [blank5] y apoyar sin culpar.',
                bank: ['visible', 'interacción', 'imagen', 'autoestima', 'evidencia'],
                correctAnswer: {
                    blank1: 'visible',
                    blank2: 'interacción',
                    blank3: 'imagen',
                    blank4: 'autoestima',
                    blank5: 'evidencia',
                },
            },
            explanation: 'Tip: Los dos artículos del módulo 3 explican que el daño puede verse distinto según la plataforma, pero siempre conviene observar impacto emocional y respuesta práctica.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada característica según la plataforma donde el módulo la destacó más.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Discord', 'Instagram'],
                right: [
                    'Ataques en comentarios o videos con mucha visibilidad',
                    'Presión por responder y no quedarse fuera de conversaciones',
                    'Comparación física o social a partir de perfiles e historias',
                    'Acoso coordinado o burlas dentro de servidores',
                    'Obsesión por el rendimiento de una publicación',
                    'Mensajes o comentarios que se sienten muy personales',
                ],
                correctAnswer: {
                    TikTok: [
                        'Ataques en comentarios o videos con mucha visibilidad',
                        'Obsesión por el rendimiento de una publicación',
                    ],
                    Discord: [
                        'Presión por responder y no quedarse fuera de conversaciones',
                        'Acoso coordinado o burlas dentro de servidores',
                    ],
                    Instagram: [
                        'Comparación física o social a partir de perfiles e historias',
                        'Mensajes o comentarios que se sienten muy personales',
                    ],
                },
            },
            explanation: 'Tip: TikTok se relaciona más con visibilidad y viralidad, Discord con comunidad e interacción constante, e Instagram con imagen, comentarios y validación social.',
            points: 12,
        },
        {
            text: 'Ordena una respuesta inicial alineada con el módulo cuando un menor cuenta que lo están tratando mal en línea.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Escucharlo con calma y sin culparlo.',
                    'Guardar capturas o pruebas de lo que ocurrió.',
                    'Bloquear o reportar según la plataforma.',
                    'Revisar privacidad, comentarios o mensajes para frenar nuevas agresiones.',
                    'Buscar apoyo adicional si el daño continúa o afecta su bienestar.',
                ],
                correctAnswer: [
                    'Escucharlo con calma y sin culparlo.',
                    'Guardar capturas o pruebas de lo que ocurrió.',
                    'Bloquear o reportar según la plataforma.',
                    'Revisar privacidad, comentarios o mensajes para frenar nuevas agresiones.',
                    'Buscar apoyo adicional si el daño continúa o afecta su bienestar.',
                ],
            },
            explanation: 'Tip: El módulo 3 insiste en no empezar castigando o quitando el dispositivo, sino apoyando, documentando y usando herramientas de protección.',
            points: 8,
        },
        {
            text: 'Selecciona todas las señales de alerta que el módulo 3 asocia con ciberacoso, presión social o daño emocional en redes.',
            type: 'multiple_selection',
            options: [
                { text: 'Se pone triste, ansioso o irritable después de usar una app', isCorrect: true },
                { text: 'Abandona un grupo o evita abrir cierta red de golpe', isCorrect: true },
                { text: 'Borra publicaciones por vergüenza o por falta de reacción', isCorrect: true },
                { text: 'Habla obsesivamente de seguidores, vistas o popularidad', isCorrect: true },
                { text: 'Cambia su imagen o conducta para encajar', isCorrect: true },
                { text: 'Se siente peor después de usar la plataforma', isCorrect: true },
                { text: 'Prefiere leer un libro en silencio una tarde', isCorrect: false },
                { text: 'Apaga la pantalla cuando termina una tarea escolar', isCorrect: false },
                { text: 'Usa audífonos para ver un video sin molestar a otros', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 3 pone mucha atención a cambios de ánimo, evitación, validación excesiva y comparación constante como señales de que algo no va bien.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea del módulo.',
            type: 'drop_down',
            metadata: {
                sentence: 'La presión social no siempre llega como [blank1]; a veces aparece como comparación constante o miedo a no [blank2]. En Discord la presión puede sentirse por estar siempre [blank3]. En Instagram y TikTok pesan mucho las métricas y la [blank4] con otros perfiles. Cuando la experiencia digital desplaza sueño, ánimo o convivencia, ya afecta el [blank5] del menor.',
                options: {
                    blank1: ['insulto directo', 'tarea escolar', 'tutorial'],
                    blank2: ['encajar', 'dibujar', 'desconectarse del wifi'],
                    blank3: ['disponible', 'disfrazado', 'en vacaciones'],
                    blank4: ['comparación', 'ortografía', 'distancia física'],
                    blank5: ['bienestar', 'teclado', 'volumen'],
                },
                correctAnswer: {
                    blank1: 'insulto directo',
                    blank2: 'encajar',
                    blank3: 'disponible',
                    blank4: 'comparación',
                    blank5: 'bienestar',
                },
            },
            explanation: 'Tip: El módulo 3 muestra que el daño emocional en redes no siempre es abierto; a veces se cuela como comparación, presión de grupo o dependencia de aprobación.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Comentarios hirientes',
                    'Acoso coordinado en servidores',
                    'Likes y vistas como medida de valor',
                    'Compararse con perfiles muy editados',
                    'Guardar capturas',
                    'Bloquear y reportar',
                    'Preguntar cómo se siente después de usar la app',
                    'Priorizar actividades fuera de pantalla',
                    'Escuchar sin culpar',
                ],
                categories: ['Ciberacoso', 'Presión social y autoestima', 'Respuesta protectora'],
                correctAnswer: {
                    'Ciberacoso': [
                        'Comentarios hirientes',
                        'Acoso coordinado en servidores',
                    ],
                    'Presión social y autoestima': [
                        'Likes y vistas como medida de valor',
                        'Compararse con perfiles muy editados',
                    ],
                    'Respuesta protectora': [
                        'Guardar capturas',
                        'Bloquear y reportar',
                        'Preguntar cómo se siente después de usar la app',
                        'Priorizar actividades fuera de pantalla',
                        'Escuchar sin culpar',
                    ],
                },
            },
            explanation: 'Tip: El módulo 3 combina tres planos: formas de daño, efectos sobre autoestima y acciones concretas para acompañar mejor.',
            points: 15,
        },
        {
            text: 'Caso: Una adolescente borra videos de TikTok cuando no reciben respuesta, se compara mucho con otras cuentas de Instagram y además se angustia si tarda en contestar mensajes de un grupo de Discord. Su padre piensa que solo está exagerando. ¿Cuál es la respuesta más alineada con el módulo 3?',
            type: 'case_study',
            options: [
                { text: 'Reconocer que puede haber presión social y daño emocional aunque no exista un insulto directo, hablar con ella sin juzgar, observar cómo le afectan las apps y ajustar apoyo, límites y herramientas de protección.', isCorrect: true },
                { text: 'Decirle que ignore todo, porque mientras no haya amenazas explícitas no existe un problema real.', isCorrect: false },
                { text: 'Quitarle el teléfono de inmediato sin escuchar qué está viviendo ni revisar qué ocurre en cada plataforma.', isCorrect: false },
                { text: 'Asumir que si usa Discord, TikTok e Instagram al mismo tiempo su malestar se debe solo a aburrimiento y no a presión social.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma la idea central del módulo: la presión social y el daño emocional pueden aparecer como comparación, necesidad de aprobación o miedo a quedar fuera, y conviene abordarlos con observación, conversación y apoyo práctico.',
            points: 15,
        },
    ];

    const module4QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su significado correcto.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Contacto insistente', value: 'Acercamiento repetido de una persona que busca mantener conversación o atención del menor' },
                    { key: 'Secreto en línea', value: 'Petición de no contar una conversación o relación a adultos de confianza' },
                    { key: 'Grooming', value: 'Proceso en el que una persona gana confianza y luego introduce presión o manipulación' },
                    { key: 'Mover la conversación', value: 'Intento de llevar el contacto a una app o espacio más privado' },
                    { key: 'Prueba de confianza', value: 'Petición para demostrar cercanía, obediencia o lealtad con algo incómodo o privado' },
                ],
                correctAnswer: {
                    'Contacto insistente': 'Acercamiento repetido de una persona que busca mantener conversación o atención del menor',
                    'Secreto en línea': 'Petición de no contar una conversación o relación a adultos de confianza',
                    Grooming: 'Proceso en el que una persona gana confianza y luego introduce presión o manipulación',
                    'Mover la conversación': 'Intento de llevar el contacto a una app o espacio más privado',
                    'Prueba de confianza': 'Petición para demostrar cercanía, obediencia o lealtad con algo incómodo o privado',
                },
            },
            explanation: 'Tip: El módulo 4 distingue entre el contacto inicial, la manipulación emocional y las peticiones que vuelven la interacción más privada o riesgosa.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok el acercamiento puede empezar por [blank1] o seguimiento insistente. En Instagram puede aparecer por solicitudes de [blank2] o respuestas a historias. En Discord el riesgo se concentra más en [blank3], mensajes directos y comunidades. El grooming no empieza siempre con amenazas; muchas veces empieza con [blank4] y cercanía rápida. Una señal importante es que alguien pida guardar [blank5].',
                bank: ['comentarios', 'mensaje', 'servidores', 'halagos', 'secretos'],
                correctAnswer: {
                    blank1: 'comentarios',
                    blank2: 'mensaje',
                    blank3: 'servidores',
                    blank4: 'halagos',
                    blank5: 'secretos',
                },
            },
            explanation: 'Tip: Los dos artículos del módulo 4 muestran que el riesgo cambia según la plataforma, pero suele avanzar desde el contacto hacia la confianza y luego hacia la presión.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada situación según la plataforma donde el módulo la destacó más.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Discord', 'Instagram'],
                right: [
                    'Seguidores o comentarios insistentes que buscan cercanía',
                    'Mensajes, voz o video dentro de comunidades y servidores',
                    'Respuestas a historias y solicitudes privadas para generar confianza',
                    'Intento de sacar la charla de una publicación a un espacio más privado',
                    'Riesgo centrado en conversaciones sostenidas dentro de grupos',
                    'Atención intensa de cuentas que no pertenecen al círculo real del menor',
                ],
                correctAnswer: {
                    TikTok: [
                        'Seguidores o comentarios insistentes que buscan cercanía',
                        'Intento de sacar la charla de una publicación a un espacio más privado',
                    ],
                    Discord: [
                        'Mensajes, voz o video dentro de comunidades y servidores',
                        'Riesgo centrado en conversaciones sostenidas dentro de grupos',
                    ],
                    Instagram: [
                        'Respuestas a historias y solicitudes privadas para generar confianza',
                        'Atención intensa de cuentas que no pertenecen al círculo real del menor',
                    ],
                },
            },
            explanation: 'Tip: El módulo 4 explica que TikTok expone más desde visibilidad e interacción pública, Instagram desde mensajes y cuentas, y Discord desde conversación comunitaria más directa.',
            points: 12,
        },
        {
            text: 'Ordena la evolución típica de una interacción que se vuelve manipuladora según el módulo 4.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Una persona inicia contacto de forma amable o insistente.',
                    'Busca generar confianza con atención, halagos o cercanía rápida.',
                    'Intenta llevar la conversación a un espacio más privado o fuera de la app.',
                    'Empieza a pedir secretos, pruebas de confianza o algo incómodo.',
                    'El menor puede sentirse presionado, confundido o aislado.',
                ],
                correctAnswer: [
                    'Una persona inicia contacto de forma amable o insistente.',
                    'Busca generar confianza con atención, halagos o cercanía rápida.',
                    'Intenta llevar la conversación a un espacio más privado o fuera de la app.',
                    'Empieza a pedir secretos, pruebas de confianza o algo incómodo.',
                    'El menor puede sentirse presionado, confundido o aislado.',
                ],
            },
            explanation: 'Tip: El módulo 4 insiste en que el problema no empieza solo cuando aparece una amenaza, sino desde que la relación empieza a empujar al menor a ceder o aislarse.',
            points: 8,
        },
        {
            text: 'Selecciona todas las señales de alerta que el módulo 4 relaciona con contacto riesgoso, grooming o manipulación.',
            type: 'multiple_selection',
            options: [
                { text: 'Recibe muchos mensajes de alguien que no conoce', isCorrect: true },
                { text: 'Le piden pasar a otra app o mantener el chat en secreto', isCorrect: true },
                { text: 'Se pone nervioso si un adulto ve ciertos mensajes', isCorrect: true },
                { text: 'Le insisten en mandar fotos, videos o pruebas de confianza', isCorrect: true },
                { text: 'Cambia de app para seguir hablando con la misma persona', isCorrect: true },
                { text: 'Esconde chats o evita contar con quién habla', isCorrect: true },
                { text: 'Prefiere usar una contraseña larga en su cuenta', isCorrect: false },
                { text: 'Ve un video educativo con sus padres', isCorrect: false },
                { text: 'Apaga notificaciones para concentrarse en la escuela', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 4 pone mucha atención a insistencia, secretos, cambio de plataforma y presión para compartir algo privado como señales de alarma.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea del módulo.',
            type: 'drop_down',
            metadata: {
                sentence: 'El grooming no suele empezar con contenido [blank1], sino con confianza y atención. Una señal muy importante es que alguien pida guardar [blank2]. Si la persona insiste en pasar la charla a otra [blank3], el riesgo sube. Las barreras técnicas ayudan, pero no sustituyen la [blank4] con adultos de confianza. Ante una interacción incómoda, el menor necesita una regla simple: salir, [blank5] y pedir ayuda.',
                options: {
                    blank1: ['sexual', 'escolar', 'deportivo'],
                    blank2: ['secretos', 'tareas', 'contraseñas de wifi'],
                    blank3: ['app', 'mesa', 'clase'],
                    blank4: ['conversación', 'decoración', 'velocidad'],
                    blank5: ['bloquear', 'dibujar', 'reiniciar el teléfono'],
                },
                correctAnswer: {
                    blank1: 'sexual',
                    blank2: 'secretos',
                    blank3: 'app',
                    blank4: 'conversación',
                    blank5: 'bloquear',
                },
            },
            explanation: 'Tip: El módulo 4 combina herramientas técnicas con conversación, reglas claras y permiso explícito para pedir ayuda sin miedo.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Halagos excesivos',
                    'Pedir pasar a otra app',
                    'Guardar capturas',
                    'Enseñar qué datos no se comparten',
                    'Pedir secretos',
                    'Bloquear y reportar',
                    'Mensajes de desconocidos',
                    'Pruebas de confianza',
                    'Decir “si algo te incomoda, sales y me avisas”',
                ],
                categories: ['Señales de manipulación', 'Respuesta protectora', 'Contacto de riesgo'],
                correctAnswer: {
                    'Señales de manipulación': [
                        'Halagos excesivos',
                        'Pedir secretos',
                        'Pruebas de confianza',
                    ],
                    'Respuesta protectora': [
                        'Guardar capturas',
                        'Enseñar qué datos no se comparten',
                        'Bloquear y reportar',
                        'Decir “si algo te incomoda, sales y me avisas”',
                    ],
                    'Contacto de riesgo': [
                        'Pedir pasar a otra app',
                        'Mensajes de desconocidos',
                    ],
                },
            },
            explanation: 'Tip: El módulo 4 diferencia bien entre cómo empieza el riesgo, cómo se vuelve manipulador y qué respuestas prácticas puede enseñar la familia.',
            points: 15,
        },
        {
            text: 'Caso: Un preadolescente cuenta que alguien en Discord le cae muy bien porque siempre está disponible, le pide hablar a solas, le dice que no le cuente a nadie y luego le propone seguir la charla por otra app. ¿Cuál es la respuesta más alineada con el módulo 4?',
            type: 'case_study',
            options: [
                { text: 'Tomarlo en serio, explicarle que esas son señales de manipulación, guardar evidencia, bloquear o reportar y reforzar que hizo bien en contarlo.', isCorrect: true },
                { text: 'Decirle que mientras la otra persona no lo haya insultado todavía, no existe un riesgo real y puede seguir hablando.', isCorrect: false },
                { text: 'Quitarle el dispositivo sin escuchar más ni revisar qué tipo de presión estaba ocurriendo.', isCorrect: false },
                { text: 'Asumir que si la conversación parecía amable entonces no puede tratarse de grooming o manipulación.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma la idea central del módulo: el grooming y la manipulación suelen disfrazarse de cercanía, y conviene intervenir cuando aparecen secretos, aislamiento, presión o cambio a espacios más privados.',
            points: 15,
        },
    ];

    const module5QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su significado correcto.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Exposición accidental', value: 'Encuentro con contenido no buscado por recomendaciones, mensajes o contenido compartido por otros' },
                    { key: 'Contenido sensible', value: 'Material violento, sexualizado, perturbador o no adecuado para la edad del menor' },
                    { key: 'Reto viral', value: 'Contenido que invita a imitar, grabar o repetir una conducta para participar o pertenecer' },
                    { key: 'Desinformación', value: 'Contenido falso o engañoso que se comparte sin verificar o buscando impacto' },
                    { key: 'Fuente', value: 'Persona, cuenta o lugar original desde donde sale un contenido o afirmación' },
                ],
                correctAnswer: {
                    'Exposición accidental': 'Encuentro con contenido no buscado por recomendaciones, mensajes o contenido compartido por otros',
                    'Contenido sensible': 'Material violento, sexualizado, perturbador o no adecuado para la edad del menor',
                    'Reto viral': 'Contenido que invita a imitar, grabar o repetir una conducta para participar o pertenecer',
                    Desinformación: 'Contenido falso o engañoso que se comparte sin verificar o buscando impacto',
                    Fuente: 'Persona, cuenta o lugar original desde donde sale un contenido o afirmación',
                },
            },
            explanation: 'Tip: El módulo 5 diferencia entre encontrarse contenido sin buscarlo y decidir creer, repetir o compartir algo porque impacta o porque se volvió viral.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok el contenido problemático puede aparecer por [blank1] y cadenas de videos. En Instagram puede llegar por reels, explorar o contenido [blank2]. En Discord suele entrar por mensajes, archivos y [blank3]. Los rumores y retos virales se propagan rápido porque despiertan emociones [blank4] y porque muchas veces el menor quiere [blank5] al grupo.',
                bank: ['recomendaciones', 'sensible', 'servidores', 'rápidas', 'pertenecer'],
                correctAnswer: {
                    blank1: 'recomendaciones',
                    blank2: 'sensible',
                    blank3: 'servidores',
                    blank4: 'rápidas',
                    blank5: 'pertenecer',
                },
            },
            explanation: 'Tip: El módulo 5 conecta dos ideas: el contenido puede aparecer sin buscarlo y también puede circular muy rápido cuando provoca impacto emocional o presión de grupo.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada situación según la plataforma donde el módulo la destacó más.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Discord', 'Instagram'],
                right: [
                    'Cadena de videos que se vuelve cada vez más intensa o perturbadora',
                    'Circulación rápida de imágenes o archivos dentro de comunidades',
                    'Contenido sensible que aparece en explorar, perfiles sugeridos o reels',
                    'Repetición reforzada por lo que el usuario mira o con lo que interactúa',
                    'Mensajes y canales donde otras personas comparten material problemático',
                    'Exposición a recomendaciones que no seguía directamente',
                ],
                correctAnswer: {
                    TikTok: [
                        'Cadena de videos que se vuelve cada vez más intensa o perturbadora',
                        'Repetición reforzada por lo que el usuario mira o con lo que interactúa',
                    ],
                    Discord: [
                        'Circulación rápida de imágenes o archivos dentro de comunidades',
                        'Mensajes y canales donde otras personas comparten material problemático',
                    ],
                    Instagram: [
                        'Contenido sensible que aparece en explorar, perfiles sugeridos o reels',
                        'Exposición a recomendaciones que no seguía directamente',
                    ],
                },
            },
            explanation: 'Tip: En el módulo 5 TikTok se asocia más con flujo y repetición, Instagram con descubrimiento y contenido sensible, y Discord con comunidades, archivos y mensajes.',
            points: 12,
        },
        {
            text: 'Ordena la secuencia típica con la que un rumor o reto viral puede extenderse según el módulo 5.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Aparece un contenido llamativo, urgente o sorprendente.',
                    'El menor lo mira o reacciona emocionalmente muy rápido.',
                    'Lo ve repetido o lo encuentra en más de un espacio.',
                    'Siente ganas de compartirlo, repetirlo o participar para no quedarse fuera.',
                    'El contenido sigue circulando aunque no sea verdadero o seguro.',
                ],
                correctAnswer: [
                    'Aparece un contenido llamativo, urgente o sorprendente.',
                    'El menor lo mira o reacciona emocionalmente muy rápido.',
                    'Lo ve repetido o lo encuentra en más de un espacio.',
                    'Siente ganas de compartirlo, repetirlo o participar para no quedarse fuera.',
                    'El contenido sigue circulando aunque no sea verdadero o seguro.',
                ],
            },
            explanation: 'Tip: El módulo 5 explica que lo viral no se mueve solo por ser cierto, sino por ser impactante, repetible y fácil de compartir.',
            points: 8,
        },
        {
            text: 'Selecciona todas las señales de alerta que el módulo 5 relaciona con contenido inapropiado, rumores o retos virales.',
            type: 'multiple_selection',
            options: [
                { text: 'Cambia rápido de pantalla al usar una app', isCorrect: true },
                { text: 'Se altera o se pone ansioso después de usar cierta red', isCorrect: true },
                { text: 'Empieza a repetir lenguaje o temas muy adultos', isCorrect: true },
                { text: 'Comparte contenido sin leerlo bien', isCorrect: true },
                { text: 'Repite rumores como si fueran hechos', isCorrect: true },
                { text: 'Siente mucha urgencia por hacer lo que todos hacen', isCorrect: true },
                { text: 'Ordena mejor sus útiles escolares', isCorrect: false },
                { text: 'Prefiere ver una película en familia un fin de semana', isCorrect: false },
                { text: 'Baja el brillo del teléfono en la noche', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 5 presta atención tanto a señales de impacto emocional como a señales de pensamiento impulsivo, presión social y falta de verificación.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea del módulo.',
            type: 'drop_down',
            metadata: {
                sentence: 'Ver algo en muchos lugares no significa que sea [blank1]. Un reto viral puede empujar al menor no solo a mirar, sino a [blank2]. Cuando un contenido provoca miedo, sorpresa o mucha urgencia, conviene hacer una [blank3] antes de compartir. Además, que algo sea muy [blank4] no significa que sea confiable. Para acompañar mejor, los padres pueden preguntar por la [blank5] y la intención del contenido.',
                options: {
                    blank1: ['verdadero', 'divertido', 'obligatorio'],
                    blank2: ['imitarlo', 'olvidarlo', 'cerrar internet'],
                    blank3: ['pausa', 'captura obligatoria', 'llamada escolar'],
                    blank4: ['popular', 'lento', 'aburrido'],
                    blank5: ['fuente', 'contraseña', 'batería'],
                },
                correctAnswer: {
                    blank1: 'verdadero',
                    blank2: 'imitarlo',
                    blank3: 'pausa',
                    blank4: 'popular',
                    blank5: 'fuente',
                },
            },
            explanation: 'Tip: El módulo 5 insiste en tres ideas: repetición no es verdad, popularidad no es veracidad y la pausa ayuda a pensar antes de creer o compartir.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Restricted Mode o filtros',
                    'Explorar o reels con contenido sensible',
                    'Retos que invitan a imitar',
                    'Preguntar quién publicó eso',
                    'Mensajes o archivos compartidos en comunidades',
                    'Recordar que popular no significa verdadero',
                    'Reacciones por miedo o urgencia',
                    'Revisar juntos un rumor antes de juzgar',
                    'Cadenas de videos cada vez más intensos',
                ],
                categories: ['Exposición accidental', 'Viralidad y desinformación', 'Respuesta protectora'],
                correctAnswer: {
                    'Exposición accidental': [
                        'Explorar o reels con contenido sensible',
                        'Mensajes o archivos compartidos en comunidades',
                        'Cadenas de videos cada vez más intensos',
                    ],
                    'Viralidad y desinformación': [
                        'Retos que invitan a imitar',
                        'Reacciones por miedo o urgencia',
                    ],
                    'Respuesta protectora': [
                        'Restricted Mode o filtros',
                        'Preguntar quién publicó eso',
                        'Recordar que popular no significa verdadero',
                        'Revisar juntos un rumor antes de juzgar',
                    ],
                },
            },
            explanation: 'Tip: El módulo 5 separa bien cómo llega el contenido, por qué se comparte y qué puede hacer la familia para responder con más criterio.',
            points: 15,
        },
        {
            text: 'Caso: Un adolescente empieza a ver en TikTok videos cada vez más extraños sobre un supuesto reto, luego lo comenta por Instagram porque todos hablan de eso y finalmente en Discord le mandan capturas diciendo que es real. Él quiere hacerlo porque siente que, si no participa, se queda fuera. ¿Cuál es la respuesta más alineada con el módulo 5?',
            type: 'case_study',
            options: [
                { text: 'Ayudarle a hacer una pausa, revisar la fuente y la intención del contenido, hablar del efecto de repetición y valorar si el reto es seguro antes de creerlo o imitarlo.', isCorrect: true },
                { text: 'Decirle que si mucha gente lo comparte en varias apps, entonces seguramente sí es verdadero y puede hacerlo.', isCorrect: false },
                { text: 'Asumir que el problema es solo el tiempo de pantalla, sin revisar qué emoción, presión o desinformación hay detrás del contenido.', isCorrect: false },
                { text: 'Quitarle todas las redes sin explicarle por qué el rumor o el reto se volvió tan convincente para él.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma la idea central del módulo: el riesgo no está solo en ver algo, sino en creerlo o repetirlo por impacto, repetición o presión para pertenecer.',
            points: 15,
        },
    ];

    const module6QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su significado correcto.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Publicidad disfrazada', value: 'Promoción que se mezcla con entretenimiento o parece una recomendación espontánea' },
                    { key: 'Paid partnership', value: 'Etiqueta que indica una relación comercial entre creador y marca' },
                    { key: 'Coins o Stars', value: 'Monedas o saldos virtuales que representan dinero real dentro de la plataforma' },
                    { key: 'Regalo digital', value: 'Forma de apoyar, reaccionar o participar gastando dentro de la app' },
                    { key: 'Compra impulsiva', value: 'Gasto rápido y emocional que no se piensa como una compra tradicional' },
                ],
                correctAnswer: {
                    'Publicidad disfrazada': 'Promoción que se mezcla con entretenimiento o parece una recomendación espontánea',
                    'Paid partnership': 'Etiqueta que indica una relación comercial entre creador y marca',
                    'Coins o Stars': 'Monedas o saldos virtuales que representan dinero real dentro de la plataforma',
                    'Regalo digital': 'Forma de apoyar, reaccionar o participar gastando dentro de la app',
                    'Compra impulsiva': 'Gasto rápido y emocional que no se piensa como una compra tradicional',
                },
            },
            explanation: 'Tip: El módulo 6 separa dos ideas: primero cómo influye la publicidad mezclada con contenido, y luego cómo las propias plataformas facilitan gastos emocionales y poco visibles.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok la promoción puede parecer una recomendación de un [blank1]. En Instagram parte del contenido comercial puede marcarse con [blank2]. En las compras dentro de plataformas, Coins, Gifts o Stars representan [blank3] real. En Discord el gasto puede sentirse más ligado a [blank4] y pertenencia. Para evitar problemas, conviene revisar si hay un [blank5] de pago guardado en el dispositivo.',
                bank: ['creador', 'Paid partnership', 'dinero', 'amistad', 'método'],
                correctAnswer: {
                    blank1: 'creador',
                    blank2: 'Paid partnership',
                    blank3: 'dinero',
                    blank4: 'amistad',
                    blank5: 'método',
                },
            },
            explanation: 'Tip: El módulo 6 muestra que la influencia comercial y el gasto impulsivo no siempre se ven como venta abierta, sino como cercanía, apoyo o pertenencia.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada situación según la plataforma donde el módulo la destacó más.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Instagram', 'Discord'],
                right: [
                    'Coins y Gifts para reaccionar o llamar la atención',
                    'Stories o reels que muestran una marca como parte de la rutina del creador',
                    'Nitro o suscripciones regaladas dentro de mensajes y comunidades',
                    'Promotional content integrado al video del influencer',
                    'Stars y gifts que se sienten como apoyo al creador',
                    'Gasto ligado a estatus, amistad o pertenencia dentro del grupo',
                ],
                correctAnswer: {
                    TikTok: [
                        'Coins y Gifts para reaccionar o llamar la atención',
                        'Promotional content integrado al video del influencer',
                    ],
                    Instagram: [
                        'Stories o reels que muestran una marca como parte de la rutina del creador',
                        'Stars y gifts que se sienten como apoyo al creador',
                    ],
                    Discord: [
                        'Nitro o suscripciones regaladas dentro de mensajes y comunidades',
                        'Gasto ligado a estatus, amistad o pertenencia dentro del grupo',
                    ],
                },
            },
            explanation: 'Tip: El módulo 6 distingue entre promoción comercial en TikTok e Instagram y gasto social o de pertenencia, especialmente visible en Discord.',
            points: 12,
        },
        {
            text: 'Ordena la secuencia típica con la que el módulo describe un gasto impulsivo dentro de una plataforma.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'El menor ve una función que promete apoyar, reaccionar o participar más.',
                    'La plataforma presenta el gasto como Coins, Stars, Gifts o suscripciones.',
                    'La acción se siente social o emocional, no como compra tradicional.',
                    'Si ya hay un método de pago guardado, la barrera para gastar baja mucho.',
                    'El gasto ocurre sin dimensionar bien que detrás hay dinero real.',
                ],
                correctAnswer: [
                    'El menor ve una función que promete apoyar, reaccionar o participar más.',
                    'La plataforma presenta el gasto como Coins, Stars, Gifts o suscripciones.',
                    'La acción se siente social o emocional, no como compra tradicional.',
                    'Si ya hay un método de pago guardado, la barrera para gastar baja mucho.',
                    'El gasto ocurre sin dimensionar bien que detrás hay dinero real.',
                ],
            },
            explanation: 'Tip: El módulo 6 insiste en que el diseño del gasto lo vuelve menos visible y más emocional, sobre todo cuando ya existe un método de pago configurado.',
            points: 8,
        },
        {
            text: 'Selecciona todas las señales de alerta que el módulo 6 relaciona con influencia comercial o compras impulsivas.',
            type: 'multiple_selection',
            options: [
                { text: 'Repite marcas o frases de creadores como si fueran gustos propios', isCorrect: true },
                { text: 'No distingue cuándo una publicación tiene etiqueta comercial', isCorrect: true },
                { text: 'Quiere recargar, mandar regalos o comprar stars sin pensar en dinero real', isCorrect: true },
                { text: 'Pide acceso a un método de pago solo por un momento', isCorrect: true },
                { text: 'Asocia popularidad con sinceridad o necesidad', isCorrect: true },
                { text: 'Quiere gastar para pertenecer o ser tomado en cuenta', isCorrect: true },
                { text: 'Usa un fondo de pantalla nuevo en su teléfono', isCorrect: false },
                { text: 'Apaga una app después de terminar una tarea', isCorrect: false },
                { text: 'Escucha música mientras estudia', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 6 pide mirar tanto la dificultad para reconocer publicidad como la dificultad para ver el gasto digital como dinero real.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea del módulo.',
            type: 'drop_down',
            metadata: {
                sentence: 'Que un creador parezca cercano no significa que su recomendación sea [blank1]. Una etiqueta como [blank2] ayuda a ver que hay una relación comercial. En el gasto digital, Coins, Stars o Nitro no dejan de ser [blank3] real. Si ya hay una tarjeta o método de pago [blank4], el riesgo de compra impulsiva aumenta. Recordar que popular no significa [blank5] ayuda a reducir la influencia comercial.',
                options: {
                    blank1: ['neutral', 'escolar', 'obligatoria'],
                    blank2: ['Paid partnership', 'Modo avión', 'Screen Time'],
                    blank3: ['dinero', 'tiempo', 'batería'],
                    blank4: ['guardado', 'apagado', 'vacío'],
                    blank5: ['sincero', 'lento', 'bonito'],
                },
                correctAnswer: {
                    blank1: 'neutral',
                    blank2: 'Paid partnership',
                    blank3: 'dinero',
                    blank4: 'guardado',
                    blank5: 'sincero',
                },
            },
            explanation: 'Tip: El módulo 6 conecta intención comercial, etiquetado, dinero real y barreras de compra como cuatro ideas clave para acompañar mejor.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Paid partnership',
                    'Promotional content',
                    'Coins o Stars',
                    'Nitro regalado',
                    'Método de pago guardado',
                    'Preguntar si lo muestra porque le gusta o porque le pagan',
                    'Explicar que lo digital también cuesta dinero real',
                    'Popular no significa sincero',
                    'Ver regalos como una forma de pertenecer',
                ],
                categories: ['Señales de promoción', 'Señales de gasto', 'Respuesta protectora'],
                correctAnswer: {
                    'Señales de promoción': [
                        'Paid partnership',
                        'Promotional content',
                    ],
                    'Señales de gasto': [
                        'Coins o Stars',
                        'Nitro regalado',
                        'Método de pago guardado',
                        'Ver regalos como una forma de pertenecer',
                    ],
                    'Respuesta protectora': [
                        'Preguntar si lo muestra porque le gusta o porque le pagan',
                        'Explicar que lo digital también cuesta dinero real',
                        'Popular no significa sincero',
                    ],
                },
            },
            explanation: 'Tip: El módulo 6 separa bien tres planos: cómo se ve la publicidad, cómo se oculta el gasto y qué puede hacer la familia para acompañar con criterio.',
            points: 15,
        },
        {
            text: 'Caso: Un adolescente quiere comprar Stars para apoyar a un creador de Instagram, dice que un influencer de TikTok recomienda una marca porque “de verdad le gusta” y además quiere regalar Nitro a un amigo para no quedarse fuera del grupo. ¿Cuál es la respuesta más alineada con el módulo 6?',
            type: 'case_study',
            options: [
                { text: 'Hablar de intención comercial, revisar si hay etiquetas como Paid partnership, explicar que Coins, Stars y Nitro equivalen a dinero real y revisar barreras de compra antes de permitir cualquier gasto.', isCorrect: true },
                { text: 'Asumir que si el creador parece cercano y el gasto es digital, entonces no hay presión comercial ni compra real de la que preocuparse.', isCorrect: false },
                { text: 'Quitarle el acceso a todas las redes sin explicarle cómo operan la publicidad disfrazada y las compras impulsivas dentro de la plataforma.', isCorrect: false },
                { text: 'Permitir el gasto mientras sea pequeño, porque las monedas, estrellas o regalos no cuentan igual que una compra tradicional.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma la idea central del módulo: hace falta enseñar a distinguir promoción de recomendación y participación social de gasto real, usando conversación y barreras concretas de compra.',
            points: 15,
        },
    ];

    const module7QuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada concepto del módulo con su significado correcto.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Family Pairing', value: 'Herramienta de TikTok para vincular la cuenta del adulto con la del adolescente y gestionar límites y seguridad' },
                    { key: 'Teen Accounts', value: 'Configuración más protectora de Instagram centrada en privacidad, mensajes y contenido sensible' },
                    { key: 'Family Center', value: 'Herramienta de Discord para acompañar actividad general sin leer mensajes privados' },
                    { key: 'Acompañar', value: 'Estar presente, conversar y ajustar reglas con contexto y confianza' },
                    { key: 'Vigilar en exceso', value: 'Revisar todo sin avisar o intervenir solo desde el castigo y la desconfianza' },
                ],
                correctAnswer: {
                    'Family Pairing': 'Herramienta de TikTok para vincular la cuenta del adulto con la del adolescente y gestionar límites y seguridad',
                    'Teen Accounts': 'Configuración más protectora de Instagram centrada en privacidad, mensajes y contenido sensible',
                    'Family Center': 'Herramienta de Discord para acompañar actividad general sin leer mensajes privados',
                    Acompañar: 'Estar presente, conversar y ajustar reglas con contexto y confianza',
                    'Vigilar en exceso': 'Revisar todo sin avisar o intervenir solo desde el castigo y la desconfianza',
                },
            },
            explanation: 'Tip: El módulo 7 diferencia muy bien entre control técnico útil y presencia adulta sana; no son lo mismo ni cumplen la misma función.',
            points: 12,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En TikTok conviene mirar mucho el [blank1] de uso, contenido e interacciones. En Instagram el foco está más en [blank2], privacidad y mensajes. En Discord el acompañamiento gira más alrededor de actividad social, solicitudes y [blank3]. Supervisar bien no es enterarse de todo, sino crear [blank4] para que el menor pueda pedir ayuda. Los controles funcionan mejor cuando forman parte de una [blank5] familiar continua.',
                bank: ['control', 'Teen Accounts', 'mensajes', 'confianza', 'conversación'],
                correctAnswer: {
                    blank1: 'control',
                    blank2: 'Teen Accounts',
                    blank3: 'mensajes',
                    blank4: 'confianza',
                    blank5: 'conversación',
                },
            },
            explanation: 'Tip: El módulo 7 insiste en que cada plataforma se acompaña distinto y que el valor de la configuración crece cuando va de la mano con diálogo frecuente.',
            points: 12,
        },
        {
            text: 'Instrucción: Clasifica cada herramienta o enfoque según la plataforma o idea que mejor la representa.',
            type: 'match_columns',
            metadata: {
                left: ['TikTok', 'Instagram', 'Discord'],
                right: [
                    'Family Pairing con controles sobre tiempo y contenido',
                    'Teen Accounts con enfoque fuerte en privacidad y mensajería',
                    'Family Center con visibilidad general de actividad social',
                    'Restricted Mode y filtros por palabras',
                    'Cuenta privada y control de contenido sensible',
                    'Solicitudes de amistad y mensajes de miembros de servidor',
                ],
                correctAnswer: {
                    TikTok: [
                        'Family Pairing con controles sobre tiempo y contenido',
                        'Restricted Mode y filtros por palabras',
                    ],
                    Instagram: [
                        'Teen Accounts con enfoque fuerte en privacidad y mensajería',
                        'Cuenta privada y control de contenido sensible',
                    ],
                    Discord: [
                        'Family Center con visibilidad general de actividad social',
                        'Solicitudes de amistad y mensajes de miembros de servidor',
                    ],
                },
            },
            explanation: 'Tip: El módulo 7 organiza la supervisión por lógica de plataforma: TikTok para tiempo y contenido, Instagram para privacidad y mensajes, Discord para actividad social e interacción.',
            points: 12,
        },
        {
            text: 'Ordena una secuencia de acompañamiento sano según el módulo 7.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Conocer qué plataformas usa el menor y para qué las usa.',
                    'Activar o revisar juntos los ajustes de seguridad más útiles.',
                    'Explicar para qué sirven los límites y filtros activados.',
                    'Acordar reglas y rutinas digitales claras para la familia.',
                    'Mantener conversaciones frecuentes para ajustar lo necesario según edad y madurez.',
                ],
                correctAnswer: [
                    'Conocer qué plataformas usa el menor y para qué las usa.',
                    'Activar o revisar juntos los ajustes de seguridad más útiles.',
                    'Explicar para qué sirven los límites y filtros activados.',
                    'Acordar reglas y rutinas digitales claras para la familia.',
                    'Mantener conversaciones frecuentes para ajustar lo necesario según edad y madurez.',
                ],
            },
            explanation: 'Tip: El módulo 7 propone una supervisión que empieza con presencia y comprensión, no con castigo o revisión secreta.',
            points: 8,
        },
        {
            text: 'Selecciona todas las acciones que el módulo 7 presenta como formas útiles de acompañar sin invadir.',
            type: 'multiple_selection',
            options: [
                { text: 'Pedir que muestre sus cuentas, canales o servidores favoritos', isCorrect: true },
                { text: 'Revisar juntos privacidad, mensajes y tiempo de uso', isCorrect: true },
                { text: 'Acordar momentos para hablar de lo que pasa en línea', isCorrect: true },
                { text: 'Usar controles parentales como apoyo, no como única estrategia', isCorrect: true },
                { text: 'Explicar al menor para qué sirve cada límite', isCorrect: true },
                { text: 'Ajustar reglas conforme cambia la edad y madurez', isCorrect: true },
                { text: 'Revisar todo a escondidas para evitar que se entere', isCorrect: false },
                { text: 'Cambiar ajustes sin hablarlo nunca con el menor', isCorrect: false },
                { text: 'Aparecer solo cuando hay un problema para castigar', isCorrect: false },
            ],
            explanation: 'Tip: El módulo 7 insiste en que acompañar bien combina presencia, claridad y ajustes compartidos, no solo control silencioso o reacción tardía.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea del módulo.',
            type: 'drop_down',
            metadata: {
                sentence: 'Supervisar bien no es saberlo [blank1]. Cuando el adulto conversa y explica reglas, el menor tiene más probabilidades de [blank2]. Los controles parentales sirven como [blank3], pero no sustituyen la relación. Revisar todo sin avisar se parece más a [blank4] que a acompañar. El ejemplo del adulto también importa porque las reglas digitales se aprenden con [blank5] y con práctica cotidiana.',
                options: {
                    blank1: ['todo', 'menos', 'siempre tarde'],
                    blank2: ['contar lo que le pasa', 'borrar todas sus apps', 'usar más pantallas'],
                    blank3: ['apoyo', 'castigo', 'pantalla extra'],
                    blank4: ['vigilar en exceso', 'aprender jugando', 'organizar horarios'],
                    blank5: ['ejemplo', 'silencio', 'contraseñas'],
                },
                correctAnswer: {
                    blank1: 'todo',
                    blank2: 'contar lo que le pasa',
                    blank3: 'apoyo',
                    blank4: 'vigilar en exceso',
                    blank5: 'ejemplo',
                },
            },
            explanation: 'Tip: El módulo 7 repite una idea central: controles y límites ayudan, pero la confianza, el ejemplo y la conversación hacen que realmente funcionen.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Preguntar qué le gusta de una app',
                    'Revisar todo sin avisar',
                    'Ver contenido juntos de vez en cuando',
                    'Imponer reglas sin contexto',
                    'Revisar configuraciones con el menor',
                    'Aplicar el mismo control siempre',
                    'Ajustar límites según edad y madurez',
                    'Intervenir solo cuando hay problema',
                    'Explicar reglas y motivos',
                ],
                categories: ['Acompañar', 'Vigilar en exceso'],
                correctAnswer: {
                    Acompañar: [
                        'Preguntar qué le gusta de una app',
                        'Ver contenido juntos de vez en cuando',
                        'Revisar configuraciones con el menor',
                        'Ajustar límites según edad y madurez',
                        'Explicar reglas y motivos',
                    ],
                    'Vigilar en exceso': [
                        'Revisar todo sin avisar',
                        'Imponer reglas sin contexto',
                        'Aplicar el mismo control siempre',
                        'Intervenir solo cuando hay problema',
                    ],
                },
            },
            explanation: 'Tip: El contraste entre acompañar y vigilar es una de las ideas más importantes del módulo 7, porque cambia por completo la relación con el menor.',
            points: 15,
        },
        {
            text: 'Caso: Una madre activó controles en TikTok, Instagram y Discord, pero nunca explicó para qué sirven. Cuando su hijo se molesta con una regla, ella revisa el celular a escondidas. El menor ya no quiere contarle nada de lo que le pasa en línea. ¿Cuál es la respuesta más alineada con el módulo 7?',
            type: 'case_study',
            options: [
                { text: 'Usar los controles como apoyo, pero volver a la conversación, explicar reglas, revisar ajustes juntos y dejar claro que pedir ayuda no traerá castigo automático.', isCorrect: true },
                { text: 'Mantener la revisión secreta porque lo importante es enterarse de todo aunque el menor deje de confiar.', isCorrect: false },
                { text: 'Quitar todos los límites y dejar que el menor decida solo, para no parecer invasiva.', isCorrect: false },
                { text: 'Aplicar exactamente las mismas reglas sin cambios, aunque la edad, la madurez o la plataforma sean distintas.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta retoma la idea central del módulo: supervisar no es espiar, sino crear una estructura clara y una relación de confianza donde los controles técnicos apoyen, pero no reemplacen, el acompañamiento real.',
            points: 15,
        },
    ];

    const finalQuizQuestions = [
        {
            text: 'Instrucción: Relaciona cada plataforma con la descripción que mejor resume su lógica principal dentro del curso.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'TikTok', value: 'Feed de videos breves donde pesan mucho el algoritmo, la repetición y la reacción rápida' },
                    { key: 'Discord', value: 'Espacio de comunidades, servidores y conversación donde importa mucho con quién se interactúa' },
                    { key: 'Instagram', value: 'Red centrada en perfil, imagen, historias, mensajes y comparación social' },
                    { key: 'Huella digital', value: 'Rastro que dejan publicaciones, reacciones, contactos y actividad dentro de las plataformas' },
                    { key: 'Acompañamiento', value: 'Supervisión con conversación, reglas claras y presencia adulta, sin caer en vigilancia excesiva' },
                ],
                correctAnswer: {
                    TikTok: 'Feed de videos breves donde pesan mucho el algoritmo, la repetición y la reacción rápida',
                    Discord: 'Espacio de comunidades, servidores y conversación donde importa mucho con quién se interactúa',
                    Instagram: 'Red centrada en perfil, imagen, historias, mensajes y comparación social',
                    'Huella digital': 'Rastro que dejan publicaciones, reacciones, contactos y actividad dentro de las plataformas',
                    Acompañamiento: 'Supervisión con conversación, reglas claras y presencia adulta, sin caer en vigilancia excesiva',
                },
            },
            explanation: 'Tip: El examen final parte de una idea base del curso: TikTok, Discord e Instagram no se supervisan igual porque no funcionan igual.',
            points: 10,
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'Un menor puede sentirse atraído por una red por [blank1], pertenencia y reconocimiento. También puede dejar rastro a través de su [blank2] y su actividad. Si una interacción pide [blank3] o cambiar de app, hay que prestar atención. Cuando algo parece muy impactante y se repite mucho, conviene revisar la [blank4]. Y si una función usa Coins, Stars o regalos, sigue siendo [blank5] real.',
                bank: ['personalización', 'perfil', 'secretos', 'fuente', 'dinero'],
                correctAnswer: {
                    blank1: 'personalización',
                    blank2: 'perfil',
                    blank3: 'secretos',
                    blank4: 'fuente',
                    blank5: 'dinero',
                },
            },
            explanation: 'Tip: Esta pregunta cruza atracción, privacidad, manipulación, desinformación y gasto digital, todos temas realmente enseñados en el curso.',
            points: 10,
        },
        {
            text: 'Instrucción: Clasifica cada situación según el módulo al que pertenece más claramente.',
            type: 'match_columns',
            metadata: {
                left: [
                    'Privacidad y huella digital',
                    'Ciberacoso, presión social y daño emocional',
                    'Contenido inapropiado, retos virales y desinformación',
                ],
                right: [
                    'Cuenta privada que no elimina por completo el rastro digital',
                    'Compararse con perfiles muy editados o depender de los likes',
                    'Ver algo repetido muchas veces y sentir que por eso debe ser verdad',
                    'Permisos del dispositivo, perfil y red de contactos',
                    'Humillación, exclusión o daño emocional en mensajes y comentarios',
                    'Retos que presionan a imitar o compartir sin pensar',
                ],
                correctAnswer: {
                    'Privacidad y huella digital': [
                        'Cuenta privada que no elimina por completo el rastro digital',
                        'Permisos del dispositivo, perfil y red de contactos',
                    ],
                    'Ciberacoso, presión social y daño emocional': [
                        'Compararse con perfiles muy editados o depender de los likes',
                        'Humillación, exclusión o daño emocional en mensajes y comentarios',
                    ],
                    'Contenido inapropiado, retos virales y desinformación': [
                        'Ver algo repetido muchas veces y sentir que por eso debe ser verdad',
                        'Retos que presionan a imitar o compartir sin pensar',
                    ],
                },
            },
            explanation: 'Tip: El examen final no repite preguntas al azar; integra módulos distintos y te pide reconocer a cuál pertenece cada riesgo o dinámica.',
            points: 10,
        },
        {
            text: 'Ordena una ruta de acompañamiento responsable cuando un menor vive una experiencia digital incómoda.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Escuchar con calma y sin culpar.',
                    'Entender qué plataforma usaba y qué pasó exactamente.',
                    'Guardar evidencia o revisar con el menor lo necesario.',
                    'Bloquear, reportar o ajustar configuración según el caso.',
                    'Hablar de la regla o aprendizaje para prevenir que se repita.',
                ],
                correctAnswer: [
                    'Escuchar con calma y sin culpar.',
                    'Entender qué plataforma usaba y qué pasó exactamente.',
                    'Guardar evidencia o revisar con el menor lo necesario.',
                    'Bloquear, reportar o ajustar configuración según el caso.',
                    'Hablar de la regla o aprendizaje para prevenir que se repita.',
                ],
            },
            explanation: 'Tip: A lo largo del curso se repite la misma lógica: primero apoyo y comprensión, luego herramientas, y al final aprendizaje compartido.',
            points: 8,
        },
        {
            text: 'Selecciona todas las ideas que el curso presenta como señales de pensamiento crítico y acompañamiento saludable.',
            type: 'multiple_selection',
            options: [
                { text: 'Preguntar quién hizo el contenido', isCorrect: true },
                { text: 'Preguntar si quiere informar, entretener o vender', isCorrect: true },
                { text: 'Explicar para qué sirven los límites o filtros', isCorrect: true },
                { text: 'Revisar juntos privacidad, mensajes o tiempo de uso', isCorrect: true },
                { text: 'Recordar que popular no significa verdadero ni sincero', isCorrect: true },
                { text: 'Usar controles parentales como apoyo, no como única estrategia', isCorrect: true },
                { text: 'Revisar todo a escondidas para enterarse de más', isCorrect: false },
                { text: 'Asumir que si una cuenta es privada ya no existe ningún riesgo', isCorrect: false },
                { text: 'Pensar que una etiqueta comercial siempre basta para que un menor entienda la promoción', isCorrect: false },
            ],
            explanation: 'Tip: El curso insiste en dos ejes: desarrollar criterio y mantener una relación de confianza, no solo reaccionar desde el miedo.',
            points: 10,
        },
        {
            text: 'Completa correctamente cada idea integradora.',
            type: 'drop_down',
            metadata: {
                sentence: 'En TikTok pesa mucho el [blank1]; en Discord importa mucho con quién se [blank2]; en Instagram pesan la imagen, los mensajes y la [blank3]. Cuando una publicación parece una recomendación, pero también vende, conviene buscar señales como [blank4]. Si una plataforma convierte el gasto en Coins, Stars o regalos, detrás sigue habiendo [blank5] real.',
                options: {
                    blank1: ['algoritmo', 'modo avión', 'teclado'],
                    blank2: ['interactúa', 'duerme', 'estudia'],
                    blank3: ['comparación social', 'batería', 'ubicación escolar'],
                    blank4: ['Paid partnership', 'captura borrada', 'filtro nocturno'],
                    blank5: ['dinero', 'tiempo', 'espacio'],
                },
                correctAnswer: {
                    blank1: 'algoritmo',
                    blank2: 'interactúa',
                    blank3: 'comparación social',
                    blank4: 'Paid partnership',
                    blank5: 'dinero',
                },
            },
            explanation: 'Tip: Esta pregunta une comprensión de plataforma, influencia comercial y compras impulsivas sin salirnos de lo enseñado.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                    'Family Pairing',
                    'Teen Accounts',
                    'Family Center',
                    'Pedir guardar secretos',
                    'Coins o Stars',
                    'Paid partnership',
                    'Cuenta privada',
                    'Rumor repetido en varias apps',
                    'Compararse con perfiles muy editados',
                ],
                categories: ['Herramienta de protección', 'Señal de riesgo o influencia', 'Privacidad y huella'],
                correctAnswer: {
                    'Herramienta de protección': [
                        'Family Pairing',
                        'Teen Accounts',
                        'Family Center',
                    ],
                    'Señal de riesgo o influencia': [
                        'Pedir guardar secretos',
                        'Coins o Stars',
                        'Paid partnership',
                        'Rumor repetido en varias apps',
                        'Compararse con perfiles muy editados',
                    ],
                    'Privacidad y huella': [
                        'Cuenta privada',
                    ],
                },
            },
            explanation: 'Tip: El curso te pide distinguir entre herramientas de protección, señales de riesgo y elementos de privacidad que no deben confundirse entre sí.',
            points: 10,
        },
        {
            text: 'Caso: Un adolescente dice que su cuenta es privada, por eso no le preocupan sus comentarios, acepta mensajes de alguien que “solo quiere hablar”, comparte un rumor porque lo vio en varios lados y además manda un regalo digital porque quiere que un creador lo note. ¿Cuál es la respuesta más completa según el curso?',
            type: 'case_study',
            options: [
                { text: 'Explicar que la cuenta privada no elimina la huella digital, revisar mensajes y señales de manipulación, cuestionar la fuente del rumor y dejar claro que los regalos digitales también son dinero real.', isCorrect: true },
                { text: 'Decirle que el único problema es el tiempo de pantalla, porque lo demás son decisiones normales de la edad.', isCorrect: false },
                { text: 'Asumir que si el contenido fue compartido muchas veces y la cuenta es privada, entonces ya no hay nada que revisar.', isCorrect: false },
                { text: 'Centrarse solo en prohibir el regalo digital sin hablar de privacidad, rumores o contacto con desconocidos.', isCorrect: false },
            ],
            explanation: 'La respuesta correcta integra cuatro módulos distintos: privacidad, contacto riesgoso, desinformación y compras impulsivas.',
            points: 12,
        },
        {
            text: 'Selecciona todas las señales que pueden indicar que una experiencia digital ya está afectando el bienestar del menor.',
            type: 'multiple_selection',
            options: [
                { text: 'Se altera o se pone ansioso después de usar una app', isCorrect: true },
                { text: 'Evita hablar de una red o cambia rápido de pantalla', isCorrect: true },
                { text: 'Depende demasiado de likes, vistas o aprobación externa', isCorrect: true },
                { text: 'Habla de secretos, regalos o mensajes que no quiere mostrar', isCorrect: true },
                { text: 'Tiene urgencia por repetir retos o compartir rumores sin verificar', isCorrect: true },
                { text: 'No conecta el gasto digital con dinero real', isCorrect: true },
                { text: 'Le gusta personalizar el fondo de su perfil', isCorrect: false },
                { text: 'A veces mira videos educativos', isCorrect: false },
                { text: 'Prefiere usar audífonos por la noche', isCorrect: false },
            ],
            explanation: 'Tip: El examen final recoge las señales emocionales, sociales y económicas que el curso fue enseñando módulo por módulo.',
            points: 10,
        },
        {
            text: 'Instrucción: Asigna cada ejemplo al bloque del curso donde encaja mejor.',
            type: 'categorize',
            metadata: {
                items: [
                    'Compararse con cuerpos o vidas idealizadas',
                    'Pedir pasar la conversación a otra app',
                    'Preguntar quién publicó un rumor',
                    'Activar Restricted Mode o filtros de contenido',
                    'Explicar que un influencer también puede estar vendiendo',
                    'Revisar si hay métodos de pago guardados',
                    'Hablar de qué datos no conviene compartir',
                    'Guardar evidencia cuando hay hostigamiento',
                    'Usar controles como apoyo y no como única estrategia',
                ],
                categories: ['Emociones y presión social', 'Seguridad y protección', 'Consumo y pensamiento crítico'],
                correctAnswer: {
                    'Emociones y presión social': [
                        'Compararse con cuerpos o vidas idealizadas',
                    ],
                    'Seguridad y protección': [
                        'Pedir pasar la conversación a otra app',
                        'Activar Restricted Mode o filtros de contenido',
                        'Hablar de qué datos no conviene compartir',
                        'Guardar evidencia cuando hay hostigamiento',
                        'Usar controles como apoyo y no como única estrategia',
                    ],
                    'Consumo y pensamiento crítico': [
                        'Preguntar quién publicó un rumor',
                        'Explicar que un influencer también puede estar vendiendo',
                        'Revisar si hay métodos de pago guardados',
                    ],
                },
            },
            explanation: 'Tip: Aunque el curso separa módulos, en la práctica muchas decisiones de acompañamiento conectan emoción, seguridad y criterio de consumo al mismo tiempo.',
            points: 10,
        },
        {
            text: 'Caso: Una familia quiere mejorar la seguridad digital de su hija de 14 años. Usa TikTok para ver videos, Instagram para hablar con amigas y Discord para entrar a servidores. A veces se compara con otras cuentas, una vez compartió un rumor sin verificar, recibió mensajes raros en un servidor y pidió dinero para mandar gifts a un creador. ¿Qué respuesta refleja mejor el enfoque integral del curso?',
            type: 'case_study',
            options: [
                { text: 'Configurar controles según cada plataforma, revisar privacidad y mensajes, hablar de comparación y aprobación digital, enseñar a verificar rumores y dejar claro que gifts y monedas también son dinero real dentro de un plan familiar de acompañamiento.', isCorrect: true },
                { text: 'Quitarle todas las aplicaciones, porque usar varias redes al mismo tiempo significa que ya no puede acompañarse con reglas parciales o conversaciones.', isCorrect: false },
                { text: 'Centrarse solo en el tiempo de uso, porque si pasa menos tiempo conectada todos los demás problemas desaparecerán por sí solos.', isCorrect: false },
                { text: 'Dejar que lo resuelva sola, ya que las plataformas ya tienen suficientes controles automáticos y eso vuelve innecesario el acompañamiento familiar.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta recoge el espíritu del curso completo: entender la lógica de cada app, combinar controles con conversación y atender privacidad, bienestar, desinformación, contacto riesgoso y gasto digital sin tratarlos como problemas aislados.',
            points: 18,
        },
        {
            text: 'Caso: Un padre nota que su hijo se pone mal por los likes, guarda en secreto algunos chats, cree fácilmente en contenido viral y no entiende por qué no debería comprar objetos digitales pequeños. Quiere ayudar sin volverse invasivo. ¿Cuál es la respuesta más alineada con el cierre del curso?',
            type: 'case_study',
            options: [
                { text: 'Abrir conversación frecuente, revisar juntos seguridad y privacidad, reforzar que puede pedir ayuda sin castigo, trabajar pensamiento crítico sobre lo que ve y explicar que el gasto digital también cuenta como dinero real.', isCorrect: true },
                { text: 'Leer todos sus mensajes a escondidas y esperar a encontrar una prueba clara antes de hablar del tema.', isCorrect: false },
                { text: 'Asumir que todo se resolverá solo si desactiva una única aplicación y deja intacto el resto de sus hábitos digitales.', isCorrect: false },
                { text: 'Hablar solo de compras y dejar para después el tema emocional, porque la autoestima y la presión social no forman parte del uso de redes.', isCorrect: false },
            ],
            explanation: 'La mejor respuesta une confianza, supervisión con contexto, pensamiento crítico y claridad sobre dinero real, justo como cierra el curso en su último módulo.',
            points: 18,
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
        duration: '3 horas',
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

Este recurso visual se centra en **${lessonTitle.replace(/^Video \d+: /, '')}** dentro de **${moduleTitle}** para que madres, padres y cuidadores reconozcan mejor lo que ocurre en pantalla.

## Qué conviene mirar
* Dónde aparece el riesgo, ajuste o dinámica principal dentro de la app.
* Qué señales debería reconocer una familia en una situación real.
* Qué conversación o decisión práctica conviene tener después de verlo.

## Para conectar el video con el módulo
> ${objective}

## Sugerencia de acompañamiento
Después de verlo, conviene revisar con el menor esa misma función, riesgo o configuración dentro de la plataforma que más usa.

Nota: este video usa un enlace temporal mientras se integra el material audiovisual definitivo del curso.`;

    const defaultPlatforms = ['TikTok', 'Discord', 'Instagram'];

    const moduleRiskAreas = {
        'Entender las redes sociales que usan los menores': ['Algoritmos', 'Interacción social', 'Uso digital'],
        'Privacidad, datos personales y huella digital': ['Privacidad', 'Huella digital', 'Exposición de datos'],
        'Ciberacoso, presión social y daño emocional': ['Ciberacoso', 'Bienestar emocional', 'Presión social'],
        'Contacto con desconocidos, grooming y manipulación': ['Contacto no deseado', 'Grooming', 'Manipulación'],
        'Contenido inapropiado, retos virales y desinformación': ['Contenido sensible', 'Desinformación', 'Presión viral'],
        'Compras, publicidad e influencia de creadores': ['Publicidad', 'Gasto digital', 'Influencia comercial'],
        'Bienestar digital, control parental y acompañamiento': ['Control parental', 'Acompañamiento', 'Bienestar digital'],
    };

    const inferVideoTeaches = (lessonTitle) => {
        const normalizedTitle = lessonTitle
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

        if (normalizedTitle.includes('recorrido visual por tiktok, discord e instagram')) {
            return ['tiktok', 'discord', 'instagram', 'algoritmo', 'servidores', 'perfiles', 'mensajeria'];
        }

        if (normalizedTitle.includes('algoritmo, los likes y la interaccion')) {
            return ['algoritmo', 'likes', 'interaccion', 'atencion', 'pertenencia', 'recompensa rapida'];
        }

        if (normalizedTitle.includes('exposicion de datos en perfiles')) {
            return ['perfil', 'historias', 'chats', 'publicaciones', 'datos visibles', 'permisos'];
        }

        if (normalizedTitle.includes('cuidar su privacidad en linea')) {
            return ['privacidad', 'cuenta privada', 'ubicacion', 'mensajes', 'huella digital', 'permisos'];
        }

        if (normalizedTitle.includes('senales de alerta de ciberacoso')) {
            return ['ciberacoso', 'humillacion', 'exclusion', 'senales de alerta', 'cambios de conducta', 'bloquear y reportar'];
        }

        if (normalizedTitle.includes('una red social afecta el bienestar emocional')) {
            return ['presion social', 'comparacion', 'autoestima', 'validacion digital', 'bienestar emocional', 'apoyo parental'];
        }

        if (normalizedTitle.includes('interacciones de riesgo en discord, instagram y tiktok')) {
            return ['desconocidos', 'mensajes directos', 'solicitudes', 'servidores', 'contacto insistente', 'datos personales'];
        }

        if (normalizedTitle.includes('presionado o manipulado en linea')) {
            return ['grooming', 'manipulacion emocional', 'secretos', 'pruebas de confianza', 'bloquear y reportar', 'pedir ayuda'];
        }

        if (normalizedTitle.includes('contenido danino sin buscarlo')) {
            return ['contenido inapropiado', 'exposicion accidental', 'recomendaciones', 'contenido sensible', 'mensajes', 'servidores'];
        }

        if (normalizedTitle.includes('pensamiento critico frente al contenido viral')) {
            return ['retos virales', 'rumores', 'desinformacion', 'fuente', 'emociones rapidas', 'pensamiento critico'];
        }

        if (normalizedTitle.includes('promociones ocultas y recomendaciones pagadas')) {
            return ['influencers', 'contenido patrocinado', 'paid partnership', 'promotional content', 'intencion comercial', 'pensamiento critico'];
        }

        if (normalizedTitle.includes('gastos no supervisados y consumo por presion social')) {
            return ['coins', 'stars', 'nitro', 'metodo de pago', 'compras impulsivas', 'presion social para gastar'];
        }

        if (normalizedTitle.includes('activar ajustes de seguridad y privacidad')) {
            return ['family pairing', 'teen accounts', 'family center', 'mensajes', 'contenido sensible', 'privacidad'];
        }

        if (normalizedTitle.includes('conversaciones clave para construir confianza y uso responsable')) {
            return ['acompanamiento digital', 'preguntas abiertas', 'reglas claras', 'confianza', 'pedir ayuda sin castigo', 'rutinas digitales'];
        }

        return [];
    };

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
            teaches: override.teaches || (type === 'video' ? inferVideoTeaches(title) : []),
            platforms: override.platforms || defaultPlatforms,
            riskAreas: override.riskAreas || moduleRiskAreas[moduleTitle] || [],
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
                ['Artículo 1: ¿Qué son TikTok, Discord e Instagram y cómo funcionan?', 'article', 11, 'module1Article1'],
                ['Video 1: Recorrido visual por TikTok, Discord e Instagram: lo que un padre debe reconocer', 'video', 2],
                ['Artículo 2: ¿Por qué estas plataformas atraen tanto a niños y adolescentes?', 'article', 11, 'module1Article2'],
                ['Video 2: Cómo el algoritmo, los likes y la interacción mantienen la atención', 'video', 2],
            ],
        },
        {
            title: 'Privacidad, datos personales y huella digital',
            objective: 'Que los padres identifiquen qué información comparten los menores y por qué eso puede convertirse en un riesgo.',
            quiz: {
                title: 'Examen del Módulo 2: Privacidad, datos personales y huella digital',
                description: 'Demuestra que comprendes qué información pueden compartir los menores sin notarlo y cómo se construye su huella digital.',
                minPassing: 80,
                questions: module2QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Qué datos comparten los niños sin darse cuenta en redes sociales', 'article', 11, 'module2Article1'],
                ['Video 1: Ejemplos visuales de exposición de datos en perfiles, historias, chats y publicaciones', 'video', 2],
                ['Artículo 2: Huella digital: lo que se publica hoy puede traer consecuencias mañana', 'article', 11, 'module2Article2'],
                ['Video 2: Cómo enseñar a los hijos a cuidar su privacidad en línea', 'video', 2],
            ],
        },
        {
            title: 'Ciberacoso, presión social y daño emocional',
            objective: 'Ayudar a los padres a detectar dinámicas de acoso, humillación y presión social dentro de redes y comunidades digitales.',
            quiz: {
                title: 'Examen del Módulo 3: Ciberacoso, presión social y daño emocional',
                description: 'Demuestra que comprendes cómo aparece el ciberacoso y cómo la comparación, los likes y la presión social pueden afectar la autoestima y el bienestar emocional.',
                minPassing: 80,
                questions: module3QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Ciberacoso en TikTok, Discord e Instagram: cómo aparece y cómo detectarlo', 'article', 11, 'module3Article1'],
                ['Video 1: Señales de alerta de ciberacoso y cambios de conducta en los menores', 'video', 2],
                ['Artículo 2: Likes, comparaciones y presión social: cómo afectan la autoestima', 'article', 11, 'module3Article2'],
                ['Video 2: Qué pueden hacer los padres cuando una red social afecta el bienestar emocional', 'video', 2],
            ],
        },
        {
            title: 'Contacto con desconocidos, grooming y manipulación',
            objective: 'Mostrar cómo la interacción en mensajes, chats, servidores y comentarios puede exponer a los menores a personas con malas intenciones.',
            quiz: {
                title: 'Examen del Módulo 4: Contacto con desconocidos, grooming y manipulación',
                description: 'Demuestra que comprendes cómo empieza el contacto riesgoso, cómo se construye la manipulación y qué señales y respuestas deben conocer las familias.',
                minPassing: 80,
                questions: module4QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Riesgos de hablar con desconocidos en mensajes, comentarios y servidores', 'article', 11, 'module4Article1'],
                ['Video 1: Cómo se dan las interacciones de riesgo en Discord, Instagram y TikTok', 'video', 2],
                ['Artículo 2: Grooming y manipulación emocional: señales que los padres deben conocer', 'article', 11, 'module4Article2'],
                ['Video 2: Cómo actuar si un menor está siendo presionado o manipulado en línea', 'video', 2],
            ],
        },
        {
            title: 'Contenido inapropiado, retos virales y desinformación',
            objective: 'Enseñar a los padres a reconocer el impacto de algoritmos, tendencias virales y contenido problemático.',
            quiz: {
                title: 'Examen del Módulo 5: Contenido inapropiado, retos virales y desinformación',
                description: 'Demuestra que comprendes cómo puede aparecer contenido no adecuado, por qué los retos y rumores se propagan tan rápido y cómo acompañar mejor a los menores frente a estos riesgos.',
                minPassing: 80,
                questions: module5QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Contenido inapropiado y exposición accidental en redes sociales', 'article', 11, 'module5Article1'],
                ['Video 1: Cómo un menor puede terminar viendo contenido dañino sin buscarlo', 'video', 2],
                ['Artículo 2: Retos virales, rumores y desinformación: por qué los niños los creen y comparten', 'article', 11, 'module5Article2'],
                ['Video 2: Cómo enseñar pensamiento crítico frente al contenido viral', 'video', 2],
            ],
        },
        {
            title: 'Compras, publicidad e influencia de creadores',
            objective: 'Que los padres comprendan cómo las redes sociales también impulsan consumo, presión comercial e influencia sobre decisiones de los menores.',
            quiz: {
                title: 'Examen del Módulo 6: Compras, publicidad e influencia de creadores',
                description: 'Demuestra que comprendes cómo se mezcla la promoción con el contenido y cómo las plataformas convierten apoyo, cercanía o pertenencia en oportunidades de gasto.',
                minPassing: 80,
                questions: module6QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Publicidad disfrazada, influencers y contenido patrocinado en TikTok e Instagram', 'article', 11, 'module6Article1'],
                ['Video 1: Cómo reconocer promociones ocultas y recomendaciones pagadas', 'video', 2],
                ['Artículo 2: Regalos, suscripciones, monedas y compras impulsivas en redes y comunidades', 'article', 11, 'module6Article2'],
                ['Video 2: Cómo prevenir gastos no supervisados y consumo por presión social', 'video', 2],
            ],
        },
        {
            title: 'Bienestar digital, control parental y acompañamiento',
            objective: 'Cerrar el curso con estrategias prácticas para supervisar, dialogar y acompañar sin invadir.',
            quiz: {
                title: 'Examen del Módulo 7: Bienestar digital, control parental y acompañamiento',
                description: 'Demuestra que comprendes cómo usar controles parentales con sentido y cómo acompañar a un menor con más confianza, diálogo y estructura, sin caer en vigilancia excesiva.',
                minPassing: 80,
                questions: module7QuizQuestions,
            },
            lessons: [
                ['Artículo 1: Controles parentales y configuraciones de seguridad en TikTok, Discord e Instagram', 'article', 10, 'module7Article1'],
                ['Video 1: Guía visual para activar ajustes de seguridad y privacidad', 'video', 2],
                ['Artículo 2: Cómo acompañar a un hijo en redes sociales sin caer en vigilancia excesiva', 'article', 10, 'module7Article2'],
                ['Video 2: Conversaciones clave para construir confianza y uso responsable', 'video', 2],
            ],
        },
    ];

    const moduleDefinitions = moduleBlueprints.map((module, idx) => ({
        title: module.title,
        description: `Objetivo: ${module.objective}`,
        duration: idx < 6 ? '26 min' : '24 min',
        quiz: module.quiz,
        lessons: module.lessons.map(([title, type, duration, overrideKey]) => createLesson(title, type, module.title, module.objective, duration, overrideKey)),
    }));

    const finalQuizDefinition = {
        title: 'Examen Final Integrador: Redes Sociales: TikTok, Discord e Instagram',
        description: 'Evaluación final del curso con 12 reactivos mixtos y cobertura transversal de los 7 módulos.',
        minPassing: 80,
        questions: finalQuizQuestions,
    };

    return {
        courseConfig,
        moduleDefinitions,
        finalQuizDefinition,
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
            minPassing: finalQuizDefinition.minPassing,
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
