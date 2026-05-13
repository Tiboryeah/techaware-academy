module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

        // --- MODULE 3. Minecraft: cuentas familiares, multijugador y Realms — 30 min ---
        const mod3 = await getOrCreateModule(courseGames._id, {
            title: 'Módulo 3: Minecraft: cuentas familiares, multijugador y Realms',
            description: 'Navegando de forma segura en mundos compartidos y privados.',
            duration: '14 min'
        });
        await Quiz.deleteMany({ refId: mod3._id, scope: 'module' });

        const l3_1 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Artículo 1: Java vs Bedrock, servidores, Realms y niveles de riesgo',
            content: `# Java vs Bedrock: Entendiendo las versiones de Minecraft

En Minecraft, la primera duda fundamental para una familia es: "¿qué edición está usando mi hijo?". Esto no es un detalle estético; define qué controles parentales están disponibles y con quién puede interactuar el menor.

Minecraft se divide en dos grandes "familias": **Java Edition** y **Bedrock Edition**.

| Edición | Dónde se usa más | Qué permite | Qué debería revisar la familia |
| --- | --- | --- | --- |
| **Java Edition** | Computadoras Windows, macOS y Linux. | Servidores externos, mods y comunidades más abiertas. | A qué servidores entra el menor, qué mods instala y qué comunidad frecuenta. |
| **Bedrock Edition** | Consolas, celulares, tablets y Windows. | Cross-play, Marketplace y controles vinculados a Microsoft/Xbox Family. | Privacidad, permisos de multijugador, Realms, amistades y compras. |

![Mini glosario para padres sobre Minecraft: Java Edition, Bedrock Edition, cross-play, Marketplace y servidor público.](/article-images/videojuegos/M3A1.png)

### Edición Java (Java Edition)
Es la versión original para computadoras (Windows, macOS, Linux). 
* **Perfil de usuario**: Jugadores que suelen buscar "mods" (modificaciones), servidores personalizados y una experiencia de juego más abierta.
* **Supervisión**: Se gestiona principalmente desde la cuenta de Microsoft, pero al permitir servidores externos muy variados, requiere una auditoría directa de a qué comunidades se une el menor.

### Edición Bedrock (Bedrock Edition)
Es la versión multiplataforma que funciona en consolas (Xbox, PlayStation, Nintendo Switch), dispositivos móviles y Windows 10/11.
* **Perfil de usuario**: Jugadores que quieren "cross-play" (jugar con amigos en consolas distintas) y acceso a la tienda oficial (**Marketplace**).
* **Supervisión**: Está profundamente integrada con **Microsoft Family Safety** y el panel de privacidad de Xbox, lo que la hace, técnicamente, más fácil de blindar para un tutor.

---

## ¿Qué opciones tiene un menor para jugar en línea?

A grandes rasgos, Minecraft permite varias formas de juego: jugar solo, jugar en multijugador con otras personas, unirse a un Realm o entrar a un servidor.

| Forma de juego | Con quién interactúa el menor | Nivel de supervisión recomendado |
| --- | --- | --- |
| **Juego individual** | Nadie más dentro del mundo. | Revisar tiempo de uso y contenido instalado. |
| **Multijugador local** | Personas cercanas en la misma red o dispositivo. | Confirmar quién participa y cuánto tiempo juegan. |
| **Realm privado** | Invitados aprobados por el dueño del Realm. | Revisar lista de invitados, permisos y chat. |
| **Servidor público** | Usuarios desconocidos o comunidades amplias. | Revisar reglas, moderación, chat, reportes y privacidad antes de permitirlo. |

### Entonces, ¿qué es exactamente un Realm?

Minecraft describe los **Realms** como servidores privados alojados en la nube para jugar con amistades. El dueño del Realm controla quién entra mediante invitaciones, el mundo está siempre en línea y los amigos invitados pueden jugar incluso cuando el propietario no está conectado.

| Elemento del Realm | Qué significa | Por qué importa para una familia |
| --- | --- | --- |
| **Dueño del Realm** | Persona que administra el mundo privado. | Decide quién puede entrar y puede retirar invitaciones. |
| **Invitaciones** | Acceso otorgado a jugadores específicos. | Reduce la exposición frente a desconocidos si la lista se mantiene controlada. |
| **Mundo siempre activo** | El Realm puede estar disponible aunque el dueño no esté conectado. | La familia debe revisar reglas, horarios y actividad aunque el adulto no esté viendo la partida. |
| **Grupo cerrado** | Entorno pensado para amistades o personas conocidas. | Es más controlable que un servidor público masivo. |

Es la opción intermedia: más social que el juego solitario, pero mucho más segura que un servidor público masivo, ya que el entorno es cerrado y administrado por alguien conocido.

---

## Semáforo de Riesgo en Minecraft

No todas las formas de juego conllevan el mismo nivel de exposición. Podemos clasificar el riesgo según el nivel de interacción social:

![Semáforo de riesgo en Minecraft: verde para juego individual o multijugador local, amarillo para Realms o servidores privados con amistades conocidas y rojo para servidores públicos masivos.](/article-images/videojuegos/M3A1.1.png)

> **Regla de Oro**: Antes de permitir el multijugador, asegúrese de conocer si su hijo está en un mundo compartido solo con amigos o en un servidor abierto a todo el mundo.`,
            type: 'article',
            duration: 5,
            platforms: ['Minecraft'],
            riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada'],
            teaches: ['java edition', 'bedrock edition', 'realm', 'servidor público', 'microsoft family safety', 'multijugador local', 'riesgo bajo', 'riesgo moderado', 'riesgo alto']
        });

        const l3_2 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Video 1: Cómo configurar Microsoft Family Safety para Minecraft',
            content: `# Cómo configurar Microsoft Family Safety para Minecraft

Este video muestra la ruta visual para revisar los permisos familiares que más cambian la seguridad del multijugador en Minecraft.

## Qué conviene observar
* Cómo entra la familia al panel correcto de Microsoft.
* Qué ajustes afectan Join Multiplayer Games y Can join Realms.
* Por qué la cuenta infantil debe estar dentro del grupo familiar.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=eKyZTXUakDU',
            duration: 2,
            platforms: ['Minecraft'],
            riskAreas: ['Seguridad de Cuenta'],
            teaches: ['microsoft family safety', 'join multiplayer games', 'can join realms', 'cuenta infantil', 'xbox family settings']
        });

        const l3_3 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Artículo 2: Permisos de privacidad, amigos, chat y multijugador',
            content: `# Privacidad y Multijugador: Más allá de los menús del juego

> **Perspectiva Estratégica**: En Minecraft, muchas funciones sociales no se configuran dentro de los menús de la aplicación, sino en la **cuenta Microsoft/Xbox Family** asociada al menor. 

Entender esto ahorra horas de frustración intentando arreglar "errores" que, en realidad, son restricciones parentales activas. La privacidad en Minecraft se construye en capas, desde quién puede ser amigo hasta quién puede enviar mensajes de voz.

| Capa de permiso | Qué controla | Qué debería revisar la familia |
| --- | --- | --- |
| **Grupo familiar Microsoft** | Si la cuenta infantil está bajo supervisión adulta. | Que el menor use una cuenta vinculada al adulto responsable. |
| **Multijugador** | Si puede entrar a mundos, servidores o partidas de otras personas. | Permisos como Join Multiplayer Games y Can join Realms. |
| **Amistades** | Si puede agregar o recibir contactos mediante Gamertag. | Quién está en su lista y si son personas conocidas. |
| **Comunicación** | Chat de texto, voz y mensajes asociados al juego. | Si está permitido, limitado a amistades o desactivado. |

## ¿Por qué mi hijo no puede jugar con amigos?

Esta es la pregunta más frecuente en soporte técnico. Si el menor ya tiene el juego pero no puede unirse a un mundo compartido, suele deberse a que la cuenta infantil no tiene los permisos necesarios en la configuración de familia de Microsoft.

![Diagnóstico para Minecraft: revisar grupo familiar, permiso Join Multiplayer Games, permiso Can join Realms y configuración de amigos o Gamertags.](/article-images/videojuegos/M3A2.png)

Minecraft y Xbox separan las acciones básicas en permisos granulares: unirse a partidas multijugador, entrar a Realms y agregar amistades mediante Gamertag.

## Mini glosario para padres

**Join Multiplayer Games**: permiso de Microsoft/Xbox que permite al menor entrar a partidas o mundos con otras personas.

**Can join Realms**: permiso que permite entrar a Realms, es decir, mundos privados alojados por Microsoft.

**Gamertag**: nombre público del jugador dentro de Xbox/Microsoft.

**Realms Stories**: espacio social de Realms para compartir historias o capturas con el grupo invitado.

**Xbox Family Settings app**: aplicación para que el adulto revise y ajuste permisos familiares de Xbox y Minecraft.

---

## Jugar no es lo mismo que Comunicarse

Una distinción crucial para las familias es que **poder jugar con alguien no significa necesariamente poder hablar con ellos**. Un tutor puede permitir que el menor entre a un servidor de amigos, pero bloquear completamente el chat de texto o de voz.

| Permiso | Qué permite | Riesgo principal | Revisión recomendada |
| --- | --- | --- | --- |
| **Jugar con otras personas** | Entrar a mundos, servidores o Realms. | Contacto con jugadores no previstos o entornos poco moderados. | Confirmar si son amigos, Realm privado o servidor público. |
| **Comunicarse con otras personas** | Usar chat de texto, voz o mensajes. | Compartir datos personales, recibir presión o mantener conversaciones incómodas. | Limitar comunicación a amistades, usar filtros y revisar señales de alerta. |

### Capas de comunicación

| Capa | Qué conviene revisar |
| --- | --- |
| **Chat de voz y texto** | Si el menor escucha o lee a otros jugadores. |
| **Comunicación fuera de Xbox** | Riesgo especial en servidores de terceros con moderación variable. |
| **Visibilidad del perfil** | Quién puede ver qué está jugando o su información básica. |

---

## Realms Stories y el historial social

En versiones recientes (especialmente Bedrock), Minecraft ha incluido **Realms Stories**, un espacio para compartir capturas e historias con el grupo de amigos. Para que una cuenta infantil acceda a esto, Microsoft Family exige que todos los permisos sociales estén en **"Allow"**. No es suficiente con tener la suscripción pagada; sin el permiso de privacidad, el contenido social no cargará.

---

![Checklist de revisión prioritaria para Minecraft: gestión familiar, permisos de juego, filtros sociales y lista de amigos.](/article-images/videojuegos/M3A2.1.png)

> **Recuerda**: Supervisar Minecraft no es solo elegir mundos; es configurar la llave maestra de la cuenta Microsoft que abre las puertas de la interacción social.`,
            type: 'article',
            duration: 5,
            platforms: ['Minecraft'],
            riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada'],
            teaches: ['join multiplayer games', 'can join realms', 'agregar amistades', 'chat de voz', 'chat de texto', 'realms stories', 'xbox family settings', 'microsoft family group']
        });

        const l3_4 = await getOrCreateLesson(mod3._id, courseGames._id, {
            title: 'Video 2: Cómo revisar seguridad en Realms y juego en línea',
            content: `# Cómo revisar seguridad en Realms y juego en línea

Este video ayuda a distinguir un Realm privado, un servidor público y otros entornos multijugador para que la familia mida mejor el nivel de riesgo.

## Qué conviene observar
* Qué señales indican si el entorno es privado o abierto.
* Dónde revisar permisos sociales, chat y amistades.
* Qué decisiones conviene tomar antes de permitir juego en línea.`,
            type: 'video',
            videoUrl: 'https://www.youtube.com/watch?v=OiaS3T1Y5cw',
            duration: 2,
            platforms: ['Minecraft'],
            riskAreas: ['Privacidad Avanzada'],
            teaches: ['realm', 'servidor público', 'chat de voz', 'chat de texto', 'xbox family settings']
        });

        mod3.lessonOrder = [l3_1._id, l3_2._id, l3_3._id, l3_4._id];
        await mod3.save();

        const q3 = await getOrCreateQuiz({
            title: 'Examen del Módulo 3: Minecraft: cuentas familiares y multijugador',
            description: 'Valida tu capacidad para configurar un entorno seguro en Minecraft.',
            scope: 'module',
            refId: mod3._id,
            scopeModel: 'Module',
            minPassing: 80
        }, [
            {
                text: 'Relaciona cada concepto técnico de Minecraft con su definición correcta.',
                type: 'match_columns',
                metadata: {
                    left: ['Java Edition', 'Bedrock Edition', 'Realm', 'Servidor Público', 'Cuenta Infantil'],
                    right: [
                        'Versión original para Windows, Mac y Linux.',
                        'Versión multiplataforma para consolas y móviles.',
                        'Mundo privado en la nube por invitación.',
                        'Entorno masivo con miles de usuarios desconocidos.',
                        'Cuenta gestionada por Microsoft Family Safety.'
                    ],
                    correctAnswer: {
                        'Java Edition': ['Versión original para Windows, Mac y Linux.'],
                        'Bedrock Edition': ['Versión multiplataforma para consolas y móviles.'],
                        'Realm': ['Mundo privado en la nube por invitación.'],
                        'Servidor Público': ['Entorno masivo con miles de usuarios desconocidos.'],
                        'Cuenta Infantil': ['Cuenta gestionada por Microsoft Family Safety.']
                    }
                },
                points: 15,
                explanation: 'Tip: Java es para PC clásica, Bedrock es multiplataforma, Realms son privados y más controlados, los servidores son masivos.'
            },
            {
                text: 'Completa el flujo de acceso para una cuenta infantil en Minecraft.',
                type: 'fill_blanks',
                metadata: {
                    sentence: 'Para jugar en la edición **Bedrock**, el menor necesita una cuenta de [blank1]. Para entrar a un mundo privado, requiere una [blank2] del anfitrión. El acceso social se controla activando el permiso de [blank3] y las opciones de [blank4] de voz y texto.',
                    bank: ['Microsoft', 'invitación', 'multijugador', 'chat'],
                    correctAnswer: {
                        blank1: 'Microsoft',
                        blank2: 'invitación',
                        blank3: 'multijugador',
                        blank4: 'chat'
                    }
                },
                points: 10,
                explanation: 'Tip: Todo nace de la cuenta Microsoft y se regula con los permisos de multijugador y comunicación.'
            },
            {
                text: 'Relaciona los componentes del ecosistema Minecraft con su función de seguridad.',
                type: 'match_columns',
                metadata: {
                    left: ['Xbox Family Settings', 'Lista de Amistades', 'Realms Stories', 'Servidor Abierto'],
                    right: [
                        'App para gestionar permisos desde el móvil.',
                        'Controla quién puede ver o invitar al menor.',
                        'Historial social que requiere permisos sociales en Allow.',
                        'Entorno que requiere mayor auditoría de adultos.'
                    ],
                    correctAnswer: {
                        'Xbox Family Settings': ['App para gestionar permisos desde el móvil.'],
                        'Lista de Amistades': ['Controla quién puede ver o invitar al menor.'],
                        'Realms Stories': ['Historial social que requiere permisos sociales en Allow.'],
                        'Servidor Abierto': ['Entorno que requiere mayor auditoría de adultos.']
                    }
                },
                points: 15,
                explanation: 'Tip: La app de Xbox es el mando a distancia del padre, la lista de amigos su primer filtro, y los servidores la zona de mayor atención.'
            },
            {
                text: 'Ordena los pasos lógicos para que un menor pueda jugar con un amigo de forma segura.',
                type: 'order_sequence',
                metadata: {
                    items: [
                        'Verificar que la cuenta infantil esté en el grupo familiar.',
                        'Habilitar el permiso "Join Multiplayer Games" en Xbox Privacy.',
                        'Agregar el Gamertag del amigo a la lista de amistades.',
                        'Entrar al mundo compartido o Realm tras recibir la invitación.'
                    ],
                    correctAnswer: [
                        'Verificar que la cuenta infantil esté en el grupo familiar.',
                        'Habilitar el permiso "Join Multiplayer Games" en Xbox Privacy.',
                        'Agregar el Gamertag del amigo a la lista de amistades.',
                        'Entrar al mundo compartido o Realm tras recibir la invitación.'
                    ]
                },
                points: 10,
                explanation: 'Tip: Primero aseguras el grupo familiar, luego abres el permiso técnico, define el amigo y finalmente entras al juego.'
            },
            {
                text: '¿Qué elementos debe revisar un tutor antes de permitir que un menor juegue Minecraft en línea?',
                type: 'multiple_selection',
                points: 15,
                options: [
                    { text: 'La edición que usa (Java vs Bedrock).', isCorrect: true },
                    { text: 'Si el permiso de multijugador está en "Allow".', isCorrect: true },
                    { text: 'El color de la skin del personaje.', isCorrect: false },
                    { text: 'Si la cuenta infantil tiene restringido el Chat de voz/texto.', isCorrect: true },
                    { text: 'Si el nombre del servidor es pegajoso.', isCorrect: false },
                    { text: 'Si el menor ya tiene agregada a la persona como amigo.', isCorrect: true }
                ],
                explanation: 'Tip: Los 4 pilares: Versión correcta, Permisos activos, Comunicación limitada y Círculo de confianza.'
            },
            {
                text: 'Completa la definición de los entornos de juego.',
                type: 'fill_blanks',
                metadata: {
                    sentence: 'Un [blank1] es un servidor privado y más controlado. Un [blank2] masivo es un entorno abierto. La edición [blank3] es la más común en consolas. La gestión de privacidad se hace desde la [blank4] familiar.',
                    bank: ['Realm', 'servidor', 'Bedrock', 'configuración'],
                    correctAnswer: {
                        blank1: 'Realm',
                        blank2: 'servidor',
                        blank3: 'Bedrock',
                        blank4: 'configuración'
                    }
                },
                points: 10,
                explanation: 'Tip: Realms son cerrados, servidores son abiertos, Bedrock es multiplataforma.'
            },
            {
                text: 'Clasifica los siguientes elementos según su categoría en el ecosistema Minecraft.',
                type: 'categorize',
                metadata: {
                    categories: ['Ediciones de Juego', 'Permisos de Cuenta', 'Entornos de Red'],
                    items: [
                        'Java Edition',
                        'Bedrock Edition',
                        'Multijugador habilitado',
                        'Comunicación de Voz/Texto',
                        'Lista de Amigos',
                        'Realms',
                        'Servidores de Terceros'
                    ],
                    correctAnswer: {
                        'Ediciones de Juego': ['Java Edition', 'Bedrock Edition'],
                        'Permisos de Cuenta': ['Multijugador habilitado', 'Comunicación de Voz/Texto', 'Lista de Amigos'],
                        'Entornos de Red': ['Realms', 'Servidores de Terceros']
                    }
                },
                points: 10,
                explanation: 'Tip: Distinguir entre el software (edición), la llave (permisos) y el lugar de juego (entorno) es fundamental.'
            },
            {
                text: 'CASO PRÁCTICO: Un padre reporta que su hijo juega en tablet (Bedrock), tiene suscripción a Realms, pero no puede ver las historias de sus amigos ni chatear.',
                type: 'case_study',
                points: 15,
                options: [
                    { text: 'Debe comprar una suscripción más cara de Bedrock Pro.', isCorrect: false },
                    { text: 'Debe revisar si los permisos de privacidad social están en "Allow" en la cuenta Microsoft Family.', isCorrect: true },
                    { text: 'Es un fallo común de los servidores que se arregla reiniciando la tablet.', isCorrect: false },
                    { text: 'Basta con que el amigo le envíe otra invitación.', isCorrect: false }
                ],
                explanation: 'Tip: Sin permisos sociales activos en Microsoft Family, funciones como Realms Stories o Chat se bloquean aunque el servicio esté pagado.'
            }
        ]);
        mod3.quizId = q3._id;
        await mod3.save();

};

