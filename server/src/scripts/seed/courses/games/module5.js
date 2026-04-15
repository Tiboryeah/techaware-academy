module.exports = async function seedGameModule(context) {
    const { getOrCreateModule, getOrCreateLesson, getOrCreateQuiz, models, courseGames } = context;
    const { Quiz } = models;

    // --- MODULE 5. Compras digitales, estafas y descargas — 30 min ---
    const mod5 = await getOrCreateModule(courseGames._id, {
        title: 'Módulo 5: Compras digitales, estafas y descargas',
        description: 'Gestión económica y prevención de malware.',
        duration: '28 min'
    });
    await Quiz.deleteMany({ refId: mod5._id, scope: 'module' });

    const l5_1 = await getOrCreateLesson(mod5._id, courseGames._id, {
        title: 'Artículo 1: Robux, Minecoins y microtransacciones: cómo funcionan',
        content: `# Robux, Minecoins y microtransacciones: cómo funcionan

> **Perspectiva Estratégica**: En muchos juegos, el gasto no aparece como "pagar dinero", sino como usar una moneda del juego. Y justo por eso puede pasar desapercibido para niños y adultos.

Este artículo ayuda a entender una idea clave: que un juego sea popular, entretenido o incluso gratuito no significa que todo lo que ocurre dentro de él sea gratis. En videojuegos como **Roblox** y **Minecraft Bedrock**, gran parte del gasto ocurre a través de monedas virtuales y compras pequeñas que, si no se supervisan, pueden convertirse en gasto frecuente.

La **ESRB** define **In-Game Purchases** como ofertas dentro del juego para comprar bienes o servicios digitales con dinero real, incluyendo monedas virtuales, skins, suscripciones, niveles extra y mejoras. Esa definición es importante porque confirma algo que a veces se pierde de vista: aunque el objeto sea digital, la compra sigue siendo real.

---

## ¿Qué son las microtransacciones?

Las microtransacciones son compras pequeñas o medianas que ocurren dentro de un juego o plataforma digital. Pueden parecer menores una por una, pero se vuelven relevantes cuando forman parte del uso cotidiano.

La **ESRB** incluye dentro de **In-Game Purchases** ejemplos como:

1. monedas virtuales,
2. skins o artículos cosméticos,
3. suscripciones,
4. mejoras o accesos extra,
5. contenido adicional.

> **Lectura pedagógica**: Antes, muchas familias pagaban una sola vez por un juego. Hoy, parte del gasto puede aparecer después, dentro del propio entorno de juego, en forma de compras repetidas y poco visibles.

---

## ¿Qué es Robux?

**Roblox** describe **Robux** como la moneda oficial de sus servicios. Según sus términos, Robux puede usarse para adquirir contenido virtual como artículos del avatar, acceso a ciertas experiences, objetos dentro de experiencias y otras funciones permitidas por la plataforma.

Roblox también aclara tres cosas importantes:

1. Robux no es un sustituto del dinero real.
2. No genera intereses.
3. No tiene un valor equivalente directo al dinero real, aunque se adquiere con dinero real.

Además, Roblox explica que Robux puede obtenerse por compra directa, por ciertos beneficios de **Premium** y, en algunos casos, dentro del ecosistema permitido por la plataforma. También advierte que usar, vender o distribuir Robux fuera de canales autorizados viola sus términos.

---

## ¿Para qué se usa Robux?

En la práctica, Robux sirve para conseguir contenido virtual dentro de Roblox. Dependiendo de cada experience o servicio, puede usarse para:

1. artículos del avatar,
2. objetos o ventajas dentro de experiencias,
3. acceso a ciertas experiencias,
4. servidores privados,
5. contenido virtual ofrecido dentro del ecosistema de Roblox.

Roblox también indica que, cuando se gasta Robux en contenido virtual dentro del Marketplace o dentro de una experiencia, esa transferencia suele ser final y, salvo políticas específicas, no es reversible.

> **Idea clave para familias**: Roblox no funciona solo como "entrar a jugar". También es un entorno con múltiples oportunidades de gasto digital relativamente pequeñas, distribuidas dentro de la experiencia de juego.

---

## ¿Qué son Minecoins?

**Minecraft** describe **Minecoins** como una moneda digital usada en el **Minecraft Marketplace** para comprar contenido en la cuenta del usuario. La página oficial de compra de Minecoins indica además que se trata de moneda virtual para **Minecraft: Bedrock Edition**.

La guía oficial para padres de Minecraft explica que, en **Bedrock Edition**, existe un Marketplace donde pueden adquirirse mapas, skins, minijuegos y otros contenidos usando Minecoins. También señala que ese entorno está curado para calidad y seguridad, lo cual ayuda a distinguirlo de descargas externas o no oficiales.

Esto es importante porque muchas familias escuchan "Minecraft" como si fuera una sola experiencia, pero el ecosistema y las compras cambian según la edición y el entorno donde se está jugando.

---

## ¿Para qué se usan las Minecoins?

Las **Minecoins** se usan para comprar contenido del Marketplace en Bedrock Edition, como:

1. skin packs,
2. texture packs,
3. worlds,
4. mash-up packs,
5. aventuras y contenido adicional.

La información oficial de Minecraft también presenta las Minecoins como una forma de personalizar personajes, transformar mundos y acceder a nuevas experiencias. Su sección de ayuda añade que las compras de Minecoins son finales y no reembolsables, salvo casos de compra no autorizada que deban atenderse con soporte de Microsoft.

> **Lectura práctica**: Minecoins no sirven para todo Minecraft ni para cualquier versión. Están ligadas al Marketplace de Bedrock y a la cuenta del usuario dentro de ese entorno.

---

## Robux y Minecoins no funcionan exactamente igual

Aunque ambas son monedas virtuales, no se usan en el mismo ecosistema ni para lo mismo.

### Robux

1. Es la moneda oficial de Roblox.
2. Se usa dentro del ecosistema de Roblox.
3. Sirve para contenido virtual, experiencias y otras funciones dentro de la plataforma.
4. Puede estar vinculada a límites mensuales de gasto parentales.

### Minecoins

1. Es una moneda digital de Minecraft Bedrock.
2. Se usa en el Marketplace de Bedrock Edition.
3. Sirve para comprar contenido asociado a esa cuenta.
4. Opera dentro de un entorno oficial curado.

La diferencia importa porque ayuda a explicar que no toda moneda virtual sirve para lo mismo ni aparece en las mismas versiones del juego.

---

## Del dinero real al objeto digital

Una forma sencilla de entender estas compras es ver la secuencia completa:

1. dinero real,
2. moneda virtual,
3. compra dentro del juego,
4. objeto, acceso o contenido digital.

Este flujo parece simple, pero muchas veces oculta el gasto real. Cuando un menor compra con Robux o Minecoins, puede sentir que solo está "usando saldo del juego", no gastando dinero. Ahí aparece una de las confusiones más comunes para las familias.

> **Regla práctica**: Si una compra pasa primero por una moneda virtual, no deja de ser gasto real; solo se volvió menos visible.

---

## ¿Dónde aparece el riesgo para las familias?

El riesgo no está en que exista una compra digital por sí misma. El problema aparece cuando el menor no percibe con claridad que esa moneda virtual representa dinero real, o cuando el gasto se vuelve frecuente sin supervisión.

**Roblox** permite a las familias fijar límites mensuales de gasto en la cuenta del menor, incluyendo Robux y suscripciones a experiencias. También aclara que ese límite no afecta el canje de gift cards y que se reinicia al final de cada mes calendario. La existencia misma de esta herramienta muestra que la plataforma reconoce la importancia de supervisar compras recurrentes.

Desde una perspectiva pedagógica, las microtransacciones pueden sentirse pequeñas una por una, pero acumularse con facilidad. Por eso conviene revisar no solo si el menor compró algo, sino también:

1. qué compró,
2. con qué frecuencia,
3. con qué permiso,
4. en qué contexto tomó la decisión.

---

## Semáforo de supervisión para una familia

Una forma útil de leer el nivel de supervisión es pensar en un semáforo:

### Verde: gasto comprendido y supervisado

El menor pregunta antes de comprar, sabe qué está adquiriendo y existe un límite o revisión activa.

### Amarillo: compra ocasional sin mucha revisión

Las compras son esporádicas, pero la familia no siempre revisa frecuencia, valor real o tipo de contenido adquirido.

### Rojo: gasto digital sin comprensión clara

Hay compras repetidas, moneda virtual sin supervisión, confusión sobre el costo real o impulsos de compra frecuentes.

> **Lo que un padre debe notar**: El problema no siempre es una compra grande. A veces el desgaste económico aparece por muchas compras pequeñas que pasaron desapercibidas.

---

## Qué debería revisar una familia antes de permitir compras

Como regla práctica para este curso, conviene revisar al menos cinco puntos:

1. **Qué moneda usa el juego**: Robux o Minecoins.
2. **Qué se puede comprar con esa moneda**: artículos, experiencias, mapas, skins o contenido adicional.
3. **Si el gasto está limitado o supervisado**: Roblox, por ejemplo, permite límites mensuales de gasto.
4. **Si el contenido está dentro del entorno oficial del juego**: en Bedrock, el Marketplace está curado para calidad y seguridad.
5. **Si el menor entiende que moneda virtual no significa dinero de mentira**.

Este último punto es especialmente importante porque la moneda virtual puede hacer que el gasto se sienta menos real, aunque se esté pagando con dinero verdadero.

---

## Qué sí cuenta como microtransacción

A veces conviene aterrizar el concepto a ejemplos concretos. Dentro del entorno de este módulo, una microtransacción puede ser:

1. una skin,
2. un mapa,
3. un mundo,
4. moneda virtual,
5. una suscripción,
6. una mejora o acceso extra.

Todo esto encaja con la definición amplia de **In-Game Purchases** de la ESRB y con los ejemplos oficiales presentados por Roblox y Minecraft.

---

## Caja de conceptos clave

**Microtransacción**: compra digital pequeña o mediana realizada dentro del juego.

**In-Game Purchases**: etiqueta de la ESRB para compras dentro del juego.

**Robux**: moneda oficial de Roblox para adquirir contenido virtual dentro de su ecosistema.

**Minecoins**: moneda digital de Minecraft Bedrock usada en el Marketplace.

**Marketplace**: entorno oficial donde se ofrece contenido digital para compra.

**Límite de gasto**: herramienta de supervisión para controlar compras recurrentes.

---

## Microactividad de 1 minuto

Piensa en el juego que usa tu hijo o hija:

1. ¿Usa Robux o Minecoins?
2. ¿Sabes qué puede comprar con esa moneda?
3. ¿Hay un límite activado?
4. ¿Tu hijo entiende que esa moneda representa gasto real?

Si alguna respuesta es "no", ahí está el siguiente punto que conviene revisar en familia.

---

## Cierre

Entender cómo funcionan **Robux**, **Minecoins** y las **microtransacciones** ayuda a que una familia deje de ver el gasto digital como algo invisible. Cuando el padre, madre o tutor sabe qué moneda usa el juego, qué se compra con ella y qué controles existen, puede acompañar mejor al menor y prevenir compras impulsivas o mal entendidas.

> **Recuerda**: Supervisar compras no es prohibir; es ayudar a que el menor entienda qué está comprando y cuánto cuesta realmente.

Este conocimiento prepara el terreno para el siguiente contenido del módulo, centrado en fraudes, phishing y enlaces falsos relacionados con supuestas recompensas "gratis".`,
        type: 'article',
        duration: 12,
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
        videoUrl: 'https://www.youtube.com/watch?v=placeholder9',
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

En **Minecraft: Bedrock Edition**, lo más claramente oficial para una familia es el **Marketplace**. Mojang explica que allí se venden mapas, skins, minijuegos y otros contenidos usando **Minecoins**, y que ese catálogo está curado para asegurar calidad y seguridad.

Además, la información oficial sobre add-ons indica que los add-ons de Marketplace son creados por **trusted Minecraft partners** y probados por la propia empresa. Eso convierte al Marketplace en la referencia más sencilla para identificar contenido respaldado dentro del entorno oficial.

> **Idea clave**: Oficial no significa solo "popular". En Minecraft, oficial significa que el contenido viene de un canal respaldado por Mojang dentro del ecosistema del juego.

---

## ¿Qué es un add-on?

Minecraft define los **add-ons** como contenido que cambia la forma en que el juego se ve y se comporta. Pueden añadir:

1. bloques,
2. objetos,
3. mobs,
4. recetas,
5. mecánicas nuevas dentro del mundo.

Mojang también explica que estos add-ons están disponibles en **Minecraft Marketplace** para **Bedrock Edition**, que pueden ser gratuitos o de pago, y que incluso pueden combinarse entre sí.

Esto importa mucho para familias porque un add-on oficial de Bedrock no es simplemente "un archivo raro de internet". Puede formar parte del ecosistema oficial del juego y estar pensado para funcionar dentro de su entorno normal.

Además, Mojang señala que los add-ons funcionan en cualquier plataforma que ejecute Bedrock Edition y que también pueden funcionar en **multiplayer** y en **Realms**. Es decir, no solo afectan una partida individual.

---

## Entonces, ¿qué es un mod?

En **Minecraft: Java Edition**, la palabra más común es **mod**. Mojang reconoce la existencia de mods para Java, pero su centro de ayuda deja claro que el modding no está oficialmente soportado y que Minecraft Support no puede ayudar con problemas derivados del uso de mods.

Esa diferencia es clave: un mod puede ser muy conocido dentro de la comunidad, pero no por eso pasa a ser contenido oficial de Minecraft.

> **Lectura pedagógica**: En Java, "muy usado por la comunidad" no es lo mismo que "respaldado por Mojang".

---

## Bedrock y Java no se supervisan igual

Para una familia, la diferencia práctica puede resumirse así:

### Bedrock Edition

1. tiene **Marketplace**,
2. usa **Minecoins**,
3. ofrece add-ons dentro de un entorno oficial,
4. el contenido oficial es más fácil de reconocer,
5. la ruta de adquisición es más curada y controlada.

### Java Edition

1. tiene una cultura más abierta de modificaciones,
2. los mods suelen venir de terceros,
3. el soporte oficial no cubre problemas derivados del modding,
4. suele requerir más revisión por parte de la familia.

Mojang dice explícitamente que la forma más fácil y segura de conseguir add-ons para Bedrock es hacerlo por canales oficiales como Marketplace y, en ese entorno, incluso los identifica con un ícono de martillo. En cambio, en Java, entrar al mundo de los mods suele implicar archivos y procesos externos al soporte oficial.

---

## ¿Qué cuenta como "no oficial"?

Para este curso, conviene enseñar una regla muy clara: si el contenido no viene del **Marketplace de Bedrock**, del flujo oficial del juego o de un canal claramente respaldado por Minecraft para ese entorno, entonces ya no estamos hablando de una ruta oficial de Mojang para ese contenido.

Eso no significa que todo lo externo sea automáticamente malicioso. Pero sí significa que la familia sale del entorno curado y del soporte oficial.

En términos prácticos, lo no oficial suele incluir:

1. mods de Java de terceros,
2. descargas externas desde páginas de comunidad,
3. launchers alternativos,
4. instaladores o packs ofrecidos fuera del flujo normal del juego,
5. archivos descargados desde sitios no respaldados por Mojang.

---

## ¿Por qué importa tanto la fuente de descarga?

Porque la fuente cambia el nivel de confianza. **Microsoft** recomienda descargar software solo desde sitios oficiales de socios de Microsoft o desde la Microsoft Store, y advierte que los sitios de terceros pueden haber modificado software para incluir malware u otras amenazas.

Aplicado a este módulo, eso significa que cuando una familia descarga launchers, instaladores, mods o archivos "gratis" desde páginas desconocidas, el problema ya no es solo el contenido del juego. También entra en juego la seguridad del dispositivo.

> **Regla práctica**: Cuando la descarga sale del ecosistema oficial, también aumenta la responsabilidad de revisar seguridad, permisos e instalación.

---

## Una forma simple de explicárselo a madres y padres

Pedagógicamente, la forma más clara de distinguirlo puede ser esta:

### Marketplace oficial

1. contenido dentro del ecosistema Bedrock,
2. curado,
3. vendido o distribuido con la lógica oficial del juego,
4. respaldado por el entorno de Minecraft.

### Add-ons oficiales de Bedrock

1. contenido que modifica el juego,
2. disponible dentro de Marketplace,
3. puede ser gratis o de pago,
4. forma parte del ecosistema oficial de Bedrock.

### Mods de Java

1. modificaciones de terceros,
2. asociadas a la comunidad,
3. fuera del soporte oficial de Minecraft,
4. requieren más revisión técnica y de seguridad.

---

## Semáforo pedagógico para revisar una descarga

Una familia puede pensar en este semáforo antes de autorizar contenido nuevo:

### Verde: ruta oficial y reconocible

Viene de Marketplace o del flujo oficial de Bedrock, no obliga a salir a páginas raras y está claramente integrado en el ecosistema del juego.

### Amarillo: contenido de comunidad que exige revisar más

No parece malicioso a simple vista, pero requiere verificar qué instala, de dónde viene y qué edición del juego usa el menor.

### Rojo: señales de alto riesgo

La página pide instalar archivos extra, launchers desconocidos, packs "gratis" sospechosos o software fuera del flujo normal del juego.

> **Lo que un padre debe notar**: No siempre el riesgo está en el contenido en sí; a veces está en el instalador, en la página de descarga o en el software adicional que pide.

---

## ¿Qué debería revisar una familia antes de descargar o comprar algo?

Antes de autorizar una compra o descarga, conviene revisar al menos esto:

1. **Si el menor usa Java o Bedrock**.
2. **Si el contenido proviene de Marketplace o de un canal oficial**.
3. **Si el archivo exige instalar algo extra fuera del flujo normal del juego**.
4. **Si ese contenido afectará solo una partida local o también Realms, multiplayer o mundos compartidos**.

Las primeras tres partes se apoyan directamente en la documentación oficial de Minecraft y Microsoft. La última es una conclusión pedagógica importante porque los add-ons pueden funcionar también en multiplayer y Realms, no solo en una partida aislada.

---

## Mapa rápido de contenido en Minecraft

Una forma útil de ordenar este tema es pensar en tres bloques:

### Oficial

1. Marketplace,
2. add-ons de Marketplace,
3. contenido de socios confiables probados por Minecraft.

### Comunidad o no oficial

1. mods de Java,
2. descargas externas,
3. launchers o archivos de terceros.

### Preguntas clave

1. ¿de dónde viene?,
2. ¿quién lo respalda?,
3. ¿qué instala?,
4. ¿en qué edición del juego se va a usar?

---

## Caja de conceptos clave

**Marketplace**: tienda oficial de contenido para Bedrock.

**Add-on**: contenido que cambia cómo se ve o se comporta el juego dentro del ecosistema Bedrock.

**Mod**: modificación de comunidad, sobre todo asociada a Java, sin soporte oficial de Minecraft.

**Bedrock Edition**: edición con Marketplace y entorno más curado para contenido oficial.

**Java Edition**: edición más abierta a mods de terceros.

**Descarga de terceros**: archivo o software obtenido fuera del canal oficial del juego.

---

## Microactividad de 1 minuto

Piensa en el contenido que usa tu hijo o hija:

1. ¿Sale de Marketplace?
2. ¿Es Bedrock o Java?
3. ¿Te pidió instalar algo aparte?
4. ¿Sabes si ese archivo viene de un canal oficial o de una página externa?

Si alguna respuesta es "no sé", ahí está el siguiente punto que conviene revisar en familia.

---

## Cierre

Cuando madres, padres y tutores distinguen entre **Marketplace oficial**, **add-ons de Bedrock** y **mods de Java sin soporte oficial**, pueden tomar decisiones más seguras y evitar compras o descargas que compliquen la experiencia del menor o del dispositivo.

> **Recuerda**: En Minecraft, "oficial" no significa solo que algo sea conocido; significa que viene de un canal respaldado por Mojang.`,
        type: 'article',
        duration: 12,
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
        videoUrl: 'https://www.youtube.com/watch?v=placeholder10',
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
                { text: 'Una página promete “Robux gratis”', isCorrect: true },
                { text: 'El enlace pide contraseña o datos personales', isCorrect: true },
                { text: 'El contenido viene de Marketplace en Bedrock', isCorrect: false },
                { text: 'Pide instalar un archivo o programa externo poco claro', isCorrect: true },
                { text: 'Ofrece Minecoins o premios si haces clic en un enlace', isCorrect: true },
                { text: 'El contenido aparece dentro del flujo oficial del juego', isCorrect: false },
                { text: 'Es un mod de Java descargado desde una página desconocida', isCorrect: true },
                { text: 'El niño pregunta primero antes de comprar', isCorrect: false }
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
                    'Web que ofrece “Robux gratis”',
                    'Página que pide la contraseña de Roblox',
                    'Mod de Java de terceros',
                    'Archivo externo que pide instalar software raro',
                    'Minecoins compradas por el canal oficial',
                    'Límite mensual de gasto en Roblox'
                ],
                categories: ['Oficial', 'Sospechoso', 'Requiere más revisión'],
                correctAnswer: {
                    'Oficial': [
                        'Marketplace de Minecraft Bedrock',
                        'Add-on obtenido dentro de Marketplace',
                        'Minecoins compradas por el canal oficial',
                        'Límite mensual de gasto en Roblox'
                    ],
                    'Sospechoso': [
                        'Web que ofrece “Robux gratis”',
                        'Página que pide la contraseña de Roblox',
                        'Archivo externo que pide instalar software raro'
                    ],
                    'Requiere más revisión': [
                        'Mod de Java de terceros'
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
