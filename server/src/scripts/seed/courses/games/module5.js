module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

    // --- MODULE 5. Compras digitales, estafas y descargas — 30 min ---
    const mod5 = await getOrCreateModule(courseGames._id, {
        title: 'Módulo 5: Compras digitales, estafas y descargas',
        description: 'Gestión económica y prevención de malware.',
        duration: '22 min'
    });
    await Quiz.deleteMany({ refId: mod5._id, scope: 'module' });

    const l5_1 = await getOrCreateLesson(mod5._id, courseGames._id, {
        title: 'Artículo 1: Robux, Minecoins y microtransacciones: cómo funcionan',
        content: `# Robux, Minecoins y microtransacciones: cómo funcionan

> **Perspectiva Estratégica**: En muchos juegos, el gasto no aparece como "pagar dinero", sino como usar una moneda del juego. Y justo por eso puede pasar desapercibido para niños y adultos.

Este artículo ayuda a entender una idea clave: que un juego sea popular, entretenido o incluso gratuito no significa que todo lo que ocurre dentro de él sea gratis. En videojuegos como **Roblox** y **Minecraft Bedrock**, gran parte del gasto ocurre a través de monedas virtuales y compras pequeñas que, si no se supervisan, pueden convertirse en gasto frecuente.

Las **In-Game Purchases** son ofertas dentro del juego para comprar bienes o servicios digitales con dinero real, incluyendo monedas virtuales, skins, suscripciones, niveles extra y mejoras. La idea importante es sencilla: aunque el objeto sea digital, la compra sigue siendo real.

---

![Qué son las microtransacciones: compras pequeñas o medianas dentro de un juego y ejemplos de In-Game Purchases como moneda virtual, contenido visual y accesos.](/article-images/videojuegos/M5A1.png)

---

![Qué es Robux: moneda oficial de Roblox para adquirir contenido virtual dentro de sus servicios.](/article-images/videojuegos/M5A1.1.png)

---

## ¿Para qué se usa Robux?

En la práctica, Robux sirve para conseguir contenido virtual dentro de Roblox: artículos del avatar, objetos o ventajas dentro de experiencias, acceso a ciertas experiences, servidores privados y otros contenidos ofrecidos dentro del ecosistema de Roblox.

Cuando se gasta Robux en contenido virtual dentro del Marketplace o dentro de una experiencia, esa transferencia suele ser final y, salvo políticas específicas, no es reversible.

> **Idea clave para familias**: Roblox no funciona solo como "entrar a jugar". También es un entorno con múltiples oportunidades de gasto digital relativamente pequeñas, distribuidas dentro de la experiencia de juego.

---

![Qué son Minecoins: moneda digital usada en Minecraft Marketplace para comprar contenido en Minecraft Bedrock Edition.](/article-images/videojuegos/M5A1.2.png)

---

## ¿Para qué se usan las Minecoins?

Las **Minecoins** se usan para comprar contenido del Marketplace en Bedrock Edition, como skin packs, texture packs, worlds, mash-up packs, aventuras y contenido adicional.

La información oficial de Minecraft también presenta las Minecoins como una forma de personalizar personajes, transformar mundos y acceder a nuevas experiencias. Su sección de ayuda añade que las compras de Minecoins son finales y no reembolsables, salvo casos de compra no autorizada que deban atenderse con soporte de Microsoft.

> **Lectura práctica**: Minecoins no sirven para todo Minecraft ni para cualquier versión. Están ligadas al Marketplace de Bedrock y a la cuenta del usuario dentro de ese entorno.

---

## Robux y Minecoins no funcionan exactamente igual

Aunque ambas son monedas virtuales, no se usan en el mismo ecosistema ni para lo mismo.

| Aspecto | Robux | Minecoins |
| --- | --- | --- |
| **Plataforma** | Roblox. | Minecraft: Bedrock Edition. |
| **Uso principal** | Contenido virtual, avatar, experiencias, accesos o ventajas según la experiencia. | Contenido de Minecraft Marketplace como mundos, skins, texture packs o mash-up packs. |
| **Entorno de compra** | Ecosistema Roblox y compras dentro de experiencias. | Marketplace oficial de Bedrock. |
| **Supervisión familiar** | Límite mensual de gasto y controles parentales de Roblox. | Revisión de Marketplace, cuenta Microsoft y método de pago del dispositivo. |
| **Confusión común** | Pensar que Robux "no cuenta" como dinero real. | Pensar que Minecoins sirven igual en Java y Bedrock. |

La diferencia importa porque ayuda a explicar que no toda moneda virtual sirve para lo mismo ni aparece en las mismas versiones del juego.

---

## Del dinero real al objeto digital

Una forma sencilla de entender estas compras es ver la secuencia completa: **dinero real → moneda virtual → compra dentro del juego → objeto, acceso o contenido digital**.

Este flujo parece simple, pero muchas veces oculta el gasto real. Cuando un menor compra con Robux o Minecoins, puede sentir que solo está "usando saldo del juego", no gastando dinero. Ahí aparece una de las confusiones más comunes para las familias.

> **Regla práctica**: Si una compra pasa primero por una moneda virtual, no deja de ser gasto real; solo se volvió menos visible.

---

## ¿Dónde aparece el riesgo para las familias?

El riesgo no está en que exista una compra digital por sí misma. El problema aparece cuando el menor no percibe con claridad que esa moneda virtual representa dinero real, o cuando el gasto se vuelve frecuente sin supervisión.

**Roblox** permite a las familias fijar límites mensuales de gasto en la cuenta del menor, incluyendo Robux y suscripciones a experiencias. También aclara que ese límite no afecta el canje de gift cards y que se reinicia al final de cada mes calendario. La existencia misma de esta herramienta muestra que la plataforma reconoce la importancia de supervisar compras recurrentes.

Desde una perspectiva pedagógica, las microtransacciones pueden sentirse pequeñas una por una, pero acumularse con facilidad. Por eso conviene revisar qué compró, con qué frecuencia, con qué permiso y en qué contexto tomó la decisión.

| Situación de compra | Riesgo posible | Medida preventiva |
| --- | --- | --- |
| **Compra única con permiso** | Bajo, si el menor entiende costo y contenido. | Conversar qué comprará y por qué lo quiere. |
| **Compras pequeñas repetidas** | Acumulación de gasto difícil de notar. | Revisar historial y establecer límite mensual. |
| **Moneda virtual guardada** | El gasto se siente menos real para el menor. | Explicar equivalencia con dinero real y acordar reglas. |
| **Método de pago guardado** | Compra impulsiva o accidental. | Proteger con contraseña, PIN o autorización adulta. |
| **Promesa de moneda gratis** | Phishing, robo de cuenta o malware. | No abrir enlaces externos y reportar ofertas sospechosas. |

---

## Semáforo de supervisión para una familia

Una forma útil de leer el nivel de supervisión es pensar en un semáforo:

| Nivel | Cómo se ve | Respuesta familiar |
| --- | --- | --- |
| **Verde** | El menor pregunta antes de comprar, sabe qué adquiere y hay límite o revisión activa. | Mantener conversación y seguimiento. |
| **Amarillo** | Compra ocasional sin revisar frecuencia, valor real o tipo de contenido. | Revisar historial y aclarar reglas. |
| **Rojo** | Compras repetidas, moneda virtual sin supervisión o confusión sobre el costo real. | Activar límites, retirar pagos guardados y acompañar decisiones. |

> **Lo que un padre debe notar**: El problema no siempre es una compra grande. A veces el desgaste económico aparece por muchas compras pequeñas que pasaron desapercibidas.

---

## Qué debería revisar una familia antes de permitir compras

Como regla práctica para este curso, conviene revisar al menos cinco puntos:

| Punto de revisión | Pregunta concreta |
| --- | --- |
| **Moneda** | ¿Usa Robux, Minecoins u otro saldo? |
| **Contenido** | ¿Compra artículos, experiencias, mapas, skins o contenido adicional? |
| **Supervisión** | ¿Hay límite, autorización adulta o revisión de historial? |
| **Canal** | ¿El contenido está dentro del entorno oficial del juego? |
| **Comprensión** | ¿El menor entiende que moneda virtual no significa dinero de mentira? |

Este último punto es especialmente importante porque la moneda virtual puede hacer que el gasto se sienta menos real, aunque se esté pagando con dinero verdadero.

---

## Qué sí cuenta como microtransacción

A veces conviene aterrizar el concepto a ejemplos concretos. Dentro del entorno de este módulo, una microtransacción puede ser una skin, un mapa, un mundo, moneda virtual, una suscripción, una mejora o un acceso extra.

Todo esto encaja con la idea amplia de **compras dentro del juego** y con los ejemplos habituales de Roblox y Minecraft.

---

## Caja de conceptos clave

**Microtransacción**: compra digital pequeña o mediana realizada dentro del juego.

**In-Game Purchases**: compras dentro del juego realizadas con dinero real o moneda virtual.

**Robux**: moneda oficial de Roblox para adquirir contenido virtual dentro de su ecosistema.

**Minecoins**: moneda digital de Minecraft Bedrock usada en el Marketplace.

**Marketplace**: entorno oficial donde se ofrece contenido digital para compra.

**Límite de gasto**: herramienta de supervisión para controlar compras recurrentes.

**Skin**: apariencia visual de un personaje o avatar; cambia cómo se ve, no necesariamente cómo juega.

**Avatar**: representación del jugador dentro del juego o plataforma.

**Phishing**: engaño que usa enlaces, páginas o mensajes falsos para robar contraseñas, cuentas o datos de pago.

---

## Microactividad de 1 minuto

Piensa en el juego que usa tu hijo o hija: ¿usa Robux o Minecoins?, ¿sabes qué puede comprar con esa moneda?, ¿hay un límite activado?, ¿tu hijo entiende que esa moneda representa gasto real?

Si alguna respuesta es "no", ahí está el siguiente punto que conviene revisar en familia.

---

## Cierre

Entender cómo funcionan **Robux**, **Minecoins** y las **microtransacciones** ayuda a que una familia deje de ver el gasto digital como algo invisible. Cuando el padre, madre o tutor sabe qué moneda usa el juego, qué se compra con ella y qué controles existen, puede acompañar mejor al menor y prevenir compras impulsivas o mal entendidas.

> **Recuerda**: Supervisar compras no es prohibir; es ayudar a que el menor entienda qué está comprando y cuánto cuesta realmente.

Este conocimiento prepara el terreno para el siguiente contenido del módulo, centrado en fraudes, phishing y enlaces falsos relacionados con supuestas recompensas "gratis".`,
        type: 'article',
        duration: 10,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Gasto Controlado'],
        teaches: ['robux', 'minecoins', 'microtransacción', 'in-game purchases', 'marketplace', 'límite de gasto', 'moneda virtual']
    });

    const l5_2 = await getOrCreateLesson(mod5._id, courseGames._id, {
        title: 'Video 1: Cómo detectar phishing, "Robux gratis" y enlaces falsos',
        content: `# Cómo detectar phishing, "Robux gratis" y enlaces falsos

Este video muestra cómo se ve una promesa falsa antes de que termine en robo de cuenta, descarga peligrosa o pérdida de dinero.

## Qué conviene observar
* Qué señales suelen repetirse en páginas y mensajes fraudulentos.
* Por qué las promesas de moneda gratis suelen buscar credenciales o pagos.
* Qué respuesta rápida debe seguir una familia ante un enlace dudoso.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=navOCcm5w7A',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Gasto Controlado'],
        teaches: ['phishing', 'robux gratis', 'enlace falso', 'cuenta', 'descarga de terceros']
    });

    const l5_3 = await getOrCreateLesson(mod5._id, courseGames._id, {
        title: 'Artículo 2: Mods, add-ons y Marketplace: qué es oficial y qué no',
        content: `# Mods, add-ons y Marketplace: qué es oficial y qué no

> **Perspectiva Estratégica**: No todo lo que cambia Minecraft es "igual". Unas cosas vienen del ecosistema oficial del juego y otras salen de fuera. Esa diferencia importa.

Este artículo resuelve una confusión muy común: muchas familias oyen palabras como **mod**, **add-on**, **skin pack** o **Marketplace** y las meten en la misma categoría. Pero no son lo mismo. En **Bedrock Edition**, Minecraft ofrece contenido oficial dentro de su ecosistema. En **Java Edition**, existe un mundo amplio de modificaciones de terceros, y el propio soporte de Minecraft aclara que el modding de Java no está oficialmente soportado.

La pregunta más útil para una familia no es solo "¿esto se ve divertido?", sino "¿de dónde viene y quién lo respalda?".

---

## Primero: ¿qué sí cuenta como contenido oficial?

En **Minecraft: Bedrock Edition**, lo más claramente oficial para una familia es el **Marketplace**. Allí se venden mapas, skins, minijuegos y otros contenidos usando **Minecoins**, dentro de un catálogo curado.

Además, los add-ons de Marketplace suelen venir de **trusted Minecraft partners** y pasan por revisión antes de publicarse. Eso convierte al Marketplace en la referencia más sencilla para identificar contenido respaldado dentro del entorno oficial.

> **Idea clave**: Oficial no significa solo "popular". En Minecraft, oficial significa que el contenido viene de un canal respaldado por Mojang dentro del ecosistema del juego.

---

![Qué es un add-on: contenido de Minecraft que cambia cómo se ve o se comporta el juego dentro de Bedrock Edition.](/article-images/videojuegos/M5A2.png)

---

## Entonces, ¿qué es un mod?

En **Minecraft: Java Edition**, la palabra más común es **mod**. Mojang reconoce la existencia de mods para Java, pero su centro de ayuda deja claro que el modding no está oficialmente soportado y que Minecraft Support no puede ayudar con problemas derivados del uso de mods.

Esa diferencia es clave: un mod puede ser muy conocido dentro de la comunidad, pero no por eso pasa a ser contenido oficial de Minecraft.

> **Lectura pedagógica**: En Java, "muy usado por la comunidad" no es lo mismo que "respaldado por Mojang".

---

## Bedrock y Java no se supervisan igual

Para una familia, la diferencia práctica está en la ruta de confianza: Bedrock permite reconocer contenido oficial dentro de Marketplace, mientras que Java exige más revisión porque los mods suelen circular por canales de comunidad o terceros.

---

## ¿Qué cuenta como "no oficial"?

Para este curso, conviene enseñar una regla muy clara: si el contenido no viene del **Marketplace de Bedrock**, del flujo oficial del juego o de un canal claramente respaldado por Minecraft para ese entorno, entonces ya no estamos hablando de una ruta oficial de Mojang para ese contenido.

Eso no significa que todo lo externo sea automáticamente malicioso. Pero sí significa que la familia sale del entorno curado y del soporte oficial.

| Tipo de contenido | Canal habitual | Nivel de confianza familiar |
| --- | --- | --- |
| **Marketplace de Bedrock** | Tienda oficial dentro del ecosistema Minecraft Bedrock. | Más controlable, porque el contenido está curado y asociado a la cuenta. |
| **Add-ons de Marketplace** | Contenido de socios confiables probado para Bedrock. | Revisable desde el flujo oficial del juego. |
| **Mods de Java** | Sitios, comunidades o launchers externos. | Requiere mayor verificación; no está cubierto por soporte oficial de Minecraft. |
| **Descargas de terceros** | Páginas externas o enlaces compartidos. | Riesgo más alto si piden instalar archivos, permisos o software adicional. |

En términos prácticos, lo no oficial suele incluir mods de Java de terceros, descargas externas desde páginas de comunidad, launchers alternativos, instaladores, packs ofrecidos fuera del flujo normal del juego o archivos descargados desde sitios no respaldados por Mojang.

---

![Por qué importa tanto la fuente de descarga: al salir del ecosistema oficial aumenta la responsabilidad de revisar seguridad, permisos e instalación.](/article-images/videojuegos/M5A2.1.png)

---

## Semáforo pedagógico para revisar una descarga

Una familia puede pensar en este semáforo antes de autorizar contenido nuevo:

| Nivel | Señal | Respuesta familiar |
| --- | --- | --- |
| **Verde** | Viene de Marketplace o del flujo oficial de Bedrock. | Revisar contenido y permitir si coincide con reglas familiares. |
| **Amarillo** | Es contenido de comunidad que exige verificar fuente, edición e instalación. | Revisar antes de autorizar y evitar prisas. |
| **Rojo** | Pide archivos extra, launchers desconocidos, packs "gratis" o software externo. | No instalar, cerrar enlace y buscar una fuente oficial. |

> **Lo que un padre debe notar**: No siempre el riesgo está en el contenido en sí; a veces está en el instalador, en la página de descarga o en el software adicional que pide.

---

## ¿Qué debería revisar una familia antes de descargar o comprar algo?

Antes de autorizar una compra o descarga, conviene convertir la duda en preguntas concretas:

| Pregunta antes de descargar | Respuesta segura | Señal de alerta |
| --- | --- | --- |
| **¿De dónde viene?** | Marketplace, Microsoft Store o canal oficial reconocible. | Enlace acortado, sitio desconocido o mensaje de "gratis" urgente. |
| **¿Qué instala?** | Contenido visible dentro del juego sin instaladores raros. | Ejecutables, launchers o permisos que la familia no entiende. |
| **¿Para qué edición es?** | Bedrock o Java identificado claramente. | El menor no sabe si sirve para su versión. |
| **¿Afecta multijugador o Realms?** | La familia sabe si se usará con otras personas. | Cambia mundos compartidos sin revisar a quién afecta. |
| **¿Quién lo respalda?** | Mojang, Microsoft, Marketplace o socio confiable. | Solo lo recomienda un video, chat o página de terceros. |

Las primeras tres partes se apoyan directamente en la documentación oficial de Minecraft y Microsoft. La última es una conclusión pedagógica importante porque los add-ons pueden funcionar también en multiplayer y Realms, no solo en una partida aislada.

---

## Mapa rápido de contenido en Minecraft

Una forma útil de ordenar este tema es pensar en tres bloques:

| Bloque | Incluye | Pregunta clave |
| --- | --- | --- |
| **Oficial** | Marketplace, add-ons de Marketplace y socios confiables probados por Minecraft. | ¿Viene del flujo oficial? |
| **Comunidad o no oficial** | Mods de Java, descargas externas, launchers o archivos de terceros. | ¿Qué instala y quién lo respalda? |
| **Revisión familiar** | Fuente, edición, permisos y uso en multijugador o Realms. | ¿En qué versión se usará y a quién afecta? |

---

![Caja de conceptos clave: Marketplace, add-on, mod, Bedrock Edition, Java Edition, descarga de terceros, skin pack, texture pack, world y mash-up pack.](/article-images/videojuegos/M5A2.2.png)

---

## Microactividad de 1 minuto

Piensa en el contenido que usa tu hijo o hija: ¿sale de Marketplace?, ¿es Bedrock o Java?, ¿te pidió instalar algo aparte?, ¿sabes si ese archivo viene de un canal oficial o de una página externa?

Si alguna respuesta es "no sé", ahí está el siguiente punto que conviene revisar en familia.

---

## Cierre

Cuando madres, padres y tutores distinguen entre **Marketplace oficial**, **add-ons de Bedrock** y **mods de Java sin soporte oficial**, pueden tomar decisiones más seguras y evitar compras o descargas que compliquen la experiencia del menor o del dispositivo.

> **Recuerda**: En Minecraft, "oficial" no significa solo que algo sea conocido; significa que viene de un canal respaldado por Mojang.`,
        type: 'article',
        duration: 8,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Gasto Controlado', 'Seguridad de Cuenta'],
        teaches: ['add-on', 'marketplace', 'mod de java', 'descarga de terceros', 'phishing', 'robux gratis', 'oficial', 'no oficial']
    });

    const l5_4 = await getOrCreateLesson(mod5._id, courseGames._id, {
        title: 'Video 2: Checklist antes de comprar o descargar algo',
        content: `# Checklist antes de comprar o descargar algo

Este video convierte el módulo en una revisión corta antes de gastar, instalar o aceptar contenido nuevo dentro del juego.

## Qué conviene observar
* Cómo distinguir una ruta oficial de una descarga de terceros.
* Qué preguntas hacer antes de pagar con moneda virtual.
* Qué señales indican que una instalación o compra no es segura.`,
        type: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=0O2oLZ6pk_I',
        duration: 2,
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Gasto Controlado'],
        teaches: ['marketplace', 'mod de java', 'oficial', 'no oficial', 'transacción segura']
    });

    mod5.lessonOrder = [l5_1._id, l5_2._id, l5_3._id, l5_4._id];
    await mod5.save();

    const q5 = await getOrCreateQuiz({
        title: 'Examen del Módulo 5: Compras digitales, estafas y descargas',
        description: 'Evalúa si puedes distinguir compras oficiales, señales de estafa y descargas que requieren más revisión antes de autorizar algo.',
        scope: 'module',
        refId: mod5._id,
        scopeModel: 'Module',
        minPassing: 80
    }, [
        {
            text: 'Instrucción: Arrastra cada concepto a la definición correcta.',
            type: 'drag_drop',
            metadata: {
                pairs: [
                    { key: 'Robux', value: 'Moneda oficial de Roblox para contenido virtual o acceso a experiencias' },
                    { key: 'Minecoins', value: 'Moneda virtual de Minecraft: Bedrock Edition' },
                    { key: 'Microtransacción', value: 'Compra dentro del juego de bienes o servicios digitales' },
                    { key: 'Marketplace', value: 'Tienda oficial de contenido para Minecraft Bedrock' },
                    { key: 'Mod de Java', value: 'Modificación de comunidad sin soporte oficial de Minecraft' }
                ],
                correctAnswer: {
                    'Robux': 'Moneda oficial de Roblox para contenido virtual o acceso a experiencias',
                    'Minecoins': 'Moneda virtual de Minecraft: Bedrock Edition',
                    'Microtransacción': 'Compra dentro del juego de bienes o servicios digitales',
                    'Marketplace': 'Tienda oficial de contenido para Minecraft Bedrock',
                    'Mod de Java': 'Modificación de comunidad sin soporte oficial de Minecraft'
                }
            },
            explanation: 'Tip: Robux y Minecoins son monedas virtuales, Marketplace es una ruta oficial de Bedrock, y un mod de Java no cuenta con soporte oficial de Minecraft.',
            points: 15
        },
        {
            text: 'Completa las frases con la palabra correcta.',
            type: 'fill_blanks',
            metadata: {
                sentence: 'En Roblox, la moneda virtual oficial se llama [blank1]. En Minecraft Bedrock, la moneda usada para comprar contenido oficial es [blank2]. La tienda oficial de contenido de Minecraft Bedrock se llama [blank3]. Un enlace falso que busca robar contraseñas o datos forma parte de un [blank4]. Roblox permite a madres y padres fijar límites mensuales de [blank5].',
                bank: ['Robux', 'Minecoins', 'Marketplace', 'phishing', 'gasto'],
                correctAnswer: {
                    blank1: 'Robux',
                    blank2: 'Minecoins',
                    blank3: 'Marketplace',
                    blank4: 'phishing',
                    blank5: 'gasto'
                }
            },
            explanation: 'Tip: Robux y Minecoins no son lo mismo, y el phishing suele disfrazarse de recompensa o enlace atractivo para robar datos.',
            points: 10
        },
        {
            text: 'Instrucción: Relaciona cada elemento con la opción que mejor le corresponde.',
            type: 'match_columns',
            metadata: {
                left: [
                    'Robux',
                    'Minecoins',
                    'Marketplace',
                    'Add-ons de Bedrock en Marketplace',
                    '“Robux gratis”',
                    'Mod de Java descargado fuera del ecosistema oficial'
                ],
                right: [
                    'Señal típica de estafa',
                    'Moneda virtual de Minecraft Bedrock',
                    'Moneda oficial de Roblox',
                    'Canal oficial más claro para obtener contenido en Bedrock',
                    'Contenido que Mojang presenta como disponible dentro de su ecosistema oficial',
                    'Requiere más revisión porque no tiene soporte oficial de Minecraft'
                ],
                correctAnswer: {
                    'Robux': 'Moneda oficial de Roblox',
                    'Minecoins': 'Moneda virtual de Minecraft Bedrock',
                    'Marketplace': 'Canal oficial más claro para obtener contenido en Bedrock',
                    'Add-ons de Bedrock en Marketplace': 'Contenido que Mojang presenta como disponible dentro de su ecosistema oficial',
                    '“Robux gratis”': 'Señal típica de estafa',
                    'Mod de Java descargado fuera del ecosistema oficial': 'Requiere más revisión porque no tiene soporte oficial de Minecraft'
                }
            },
            explanation: 'Tip: Oficial no es solo lo que se ve popular; oficial es lo que viene por una ruta respaldada por la plataforma o por Mojang.',
            points: 15
        },
        {
            text: 'Ordena la secuencia más segura antes de autorizar una compra o descarga relacionada con Roblox o Minecraft.',
            type: 'order_sequence',
            metadata: {
                items: [
                    'Revisar si la fuente es oficial',
                    'Identificar si es Roblox o Minecraft, y qué moneda o contenido usa',
                    'Ver si pide salir a un enlace externo o instalar algo raro',
                    'Confirmar con el adulto antes de comprar o descargar',
                    'Autorizar o rechazar la acción'
                ],
                correctAnswer: [
                    'Identificar si es Roblox o Minecraft, y qué moneda o contenido usa',
                    'Revisar si la fuente es oficial',
                    'Ver si pide salir a un enlace externo o instalar algo raro',
                    'Confirmar con el adulto antes de comprar o descargar',
                    'Autorizar o rechazar la acción'
                ]
            },
            explanation: 'Tip: Primero identificas el entorno y la fuente, luego revisas señales de riesgo, y solo al final decides si se autoriza.',
            points: 10
        },
        {
            text: 'Selecciona todas las opciones que deberían activar alerta en una familia antes de comprar o descargar algo.',
            type: 'multiple_selection',
            options: [
                { text: 'Una página promete "Robux gratis" a cambio de datos', isCorrect: true },
                { text: 'El enlace pide la contraseña de la cuenta', isCorrect: true },
                { text: 'Es un mod de Java descargado desde una página desconocida', isCorrect: true },
                { text: 'El contenido viene del Marketplace oficial de Bedrock', isCorrect: false },
                { text: 'El menor pregunta al adulto antes de comprar', isCorrect: false },
                { text: 'La tienda muestra los precios en Minecoins dentro del juego', isCorrect: false }
            ],
            explanation: 'Tip: Promesas de monedas gratis, petición de contraseña, programas externos y mods de páginas desconocidas son señales claras de alerta.',
            points: 15
        },
        {
            text: 'Completa correctamente cada frase.',
            type: 'drop_down',
            metadata: {
                sentence: 'La etiqueta de ESRB que avisa sobre compras dentro del juego es [blank1]. Los add-ons de Bedrock se consideran más confiables cuando vienen de [blank2]. Si una web promete monedas gratis a cambio de tu contraseña, lo más probable es que sea [blank3]. En Roblox, un límite mensual puede ayudar a controlar el [blank4].',
                options: {
                    blank1: ['In-Game Purchases', 'Premium Currency', 'External Mods'],
                    blank2: ['Marketplace', 'un foro cualquiera', 'un enlace de chat'],
                    blank3: ['una estafa', 'una recompensa oficial', 'un regalo seguro'],
                    blank4: ['gasto', 'avatar', 'chat']
                },
                correctAnswer: {
                    blank1: 'In-Game Purchases',
                    blank2: 'Marketplace',
                    blank3: 'una estafa',
                    blank4: 'gasto'
                }
            },
            explanation: 'Tip: La clave aquí es unir tres ideas: compras dentro del juego, rutas oficiales y control del gasto real.',
            points: 10
        },
        {
            text: 'Instrucción: Arrastra cada elemento a la categoría correcta.',
            type: 'categorize',
            metadata: {
                items: [
                        'Marketplace de Minecraft Bedrock',
                        'Add-on obtenido dentro de Marketplace',
                        'Minecoins compradas por el canal oficial',
                        'Web que ofrece "Robux gratis"',
                        'Página que pide la contraseña de Roblox',
                        'Archivo externo que pide instalar software raro',
                        'Mod de Java de terceros',
                        'Launcher alternativo de terceros',
                        'Pack descargado desde un foro de fans sin verificar'
                    ],
                categories: ['Oficial', 'Sospechoso', 'Requiere más revisión'],
                correctAnswer: {
                        'Oficial': [
                            'Marketplace de Minecraft Bedrock',
                            'Add-on obtenido dentro de Marketplace',
                            'Minecoins compradas por el canal oficial'
                        ],
                        'Sospechoso': [
                            'Web que ofrece "Robux gratis"',
                            'Página que pide la contraseña de Roblox',
                            'Archivo externo que pide instalar software raro'
                        ],
                        'Requiere más revisión': [
                            'Mod de Java de terceros',
                            'Launcher alternativo de terceros',
                            'Pack descargado desde un foro de fans sin verificar'
                        ]
                    }
            },
            explanation: 'Tip: Oficial significa respaldado por el ecosistema del juego; sospechoso pide datos o software raro; y los mods de terceros requieren evaluación extra.',
            points: 10
        },
        {
            text: 'Caso práctico: Tu hijo te dice que encontró una página donde puede conseguir “Robux gratis” y también un “mod increíble” para Minecraft si descarga un programa. La web le pide iniciar sesión con su cuenta y promete una recompensa inmediata. ¿Cuál es la mejor respuesta?',
            type: 'case_study',
            points: 15,
            options: [
                { text: 'Dejarlo probar, porque si parece popular seguramente es confiable.', isCorrect: false },
                { text: 'Aceptar solo la parte de Roblox, pero no la de Minecraft.', isCorrect: false },
                { text: 'Explicarle que eso reúne varias señales de estafa, no dar contraseña, no descargar nada, revisar canales oficiales y usar solo Marketplace o compras oficiales cuando corresponda.', isCorrect: true },
                { text: 'Decirle que cierre la página, pero sin explicarle por qué.', isCorrect: false }
            ],
            explanation: 'La mejor respuesta reconoce dos riesgos al mismo tiempo: ofertas de “Robux gratis” diseñadas para robar datos y descargas externas que pueden comprometer la cuenta o el dispositivo. La salida más segura es no iniciar sesión, no instalar nada y volver a canales oficiales.'
        }
    ]);
    mod5.quizId = q5._id;
    await mod5.save();
};
