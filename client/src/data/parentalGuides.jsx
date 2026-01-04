import React from 'react';
import { Gamepad2, Users, Video, MessageCircle, Instagram, Youtube, Tv } from 'lucide-react';

export const parentalGuides = [
    {
        id: 1,
        platform: "Roblox",
        title: "Control en el Metaverso",
        description: "Protección integral para la plataforma de juegos más popular.",
        icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
        color: "red",
        steps: [
            "Activa el PIN de Seguridad",
            "Restricciones de Cuenta",
            "Filtros de Chat Inteligentes",
            "Visibilidad de Inventario Privada"
        ],
        details: {
            fullContent: "Roblox es una plataforma expansiva donde los riesgos principales son el contacto con desconocidos a través de mensajes directos y la exposición a experiencias (juegos) con contenido no apto. El PIN parental es la barrera más importante, ya que sin él, un menor puede simplemente revertir cualquier cambio de privacidad que hayas configurado.",
            setupPath: "Configuración > Seguridad > PIN de la cuenta / Privacidad.",
            expertTip: "No te limites a activar los filtros; revisa periódicamente las 'Experiencias Recientes' en la página de inicio para ver a qué está jugando realmente tu hijo.",
            riskAnalysis: "Reduce en un 95% la posibilidad de Grooming y fraudes por intercambio de objetos virtuales (Trading Scam).",
            officialLink: "https://en.help.roblox.com/hc/es/articles/30428310121620-Resumen-de-los-controles-parentales"
        }
    },
    {
        id: 2,
        platform: "Minecraft",
        title: "Mundo Creativo Seguro",
        description: "Gestiona servidores y multijugador desde Xbox Family Settings.",
        icon: <Gamepad2 className="w-6 h-6 text-green-600" />,
        color: "green",
        steps: [
            "Usa la App Xbox Family Settings",
            "Bloquea el Juego Multijugador",
            "Filtro de Solicitudes de Amistad",
            "Privacidad de Perfil en Xbox"
        ],
        details: {
            fullContent: "Aunque Minecraft parece inofensivo, el modo multijugador en servidores públicos expone a los niños a chats sin moderar. La clave está en la cuenta de Microsoft vinculada. Si configuras la cuenta como 'Cuenta Infantil', Microsoft aplicará restricciones automáticas que tú puedes gestionar desde tu propio teléfono móvil.",
            setupPath: "App Xbox Family Settings (Android/iOS) > Configuración de cuenta del menor.",
            expertTip: "Si tu hijo quiere jugar con amigos reales, enséñale a crear un 'Realm' (servidor privado por suscripción) en lugar de unirse a servidores públicos masivos.",
            riskAnalysis: "Previene la exposición a lenguaje abusivo en servidores 'GRIEF' y contactos no deseados a través de Xbox Live.",
            officialLink: "https://www.minecraft.net/es-es/article/parental-controls"
        }
    },
    {
        id: 3,
        platform: "TikTok",
        title: "Sincronización Familiar",
        description: "Controla el algoritmo y el tiempo de exposición.",
        icon: <Video className="w-6 h-6 text-pink-500" />,
        color: "pink",
        steps: [
            "Vinculación por Código QR",
            "Modo Restringido por IA",
            "Gestión de Búsqueda Segura",
            "Límite de Tiempo de Pantalla"
        ],
        details: {
            fullContent: "TikTok utiliza una 'Sincronización Familiar' que vincula directamente tu cuenta con la de tu hijo. Esto te permite gestionar desde tu teléfono quién puede enviarle mensajes, quién puede comentar sus videos y si su cuenta es pública o privada, todo sin quitarle el acceso a la plataforma.",
            setupPath: "Perfil > Ajustes y Privacidad > Sincronización Familiar.",
            expertTip: "Activa el filtrado de 'Palabras Clave'. Puedes añadir palabras específicas (nombres, direcciones o insultos locales) para que los videos que las contengan no aparezcan nunca en su feed.",
            riskAnalysis: "Mitiga el riesgo de retos peligrosos (challenges), adicción al scroll infinito y exposición a contenido hipersexualizado.",
            officialLink: "https://www.tiktok.com/safety/es/guardians-guide/"
        }
    },
    {
        id: 4,
        platform: "Discord",
        title: "Family Center y Privacidad",
        description: "Protección en comunidades de chat y servidores.",
        icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
        color: "indigo",
        steps: [
            "Activa el Centro Familiar",
            "Escaneo de Imágenes Seguras",
            "Desactivación de MD de Desconocidos",
            "Configuración de Visibilidad de Perfil"
        ],
        details: {
            fullContent: "Discord es la herramienta preferida para los gamers, pero también es propensa a servidores de comunidades radicales o estafas. El 'Centro Familiar' te da visibilidad sobre con quién habla tu hijo y a qué servidores se ha unido, sin violar su privacidad leyendo el contenido exacto de los mensajes (a menos que haya un reporte).",
            setupPath: "Ajustes de Usuario > Centro Familiar / Privacidad y Seguridad.",
            expertTip: "Lo más importante es desactivar 'Permitir mensajes directos de los miembros del servidor'. Esto obliga a que cualquier persona deba ser su 'Amigo' aceptado antes de poder escribirle.",
            riskAnalysis: "Blindaje contra RAIDING de servidores, distribución de contenido explícito (NSFW) y estafas de 'Free Nitro'.",
            officialLink: "https://support.discord.com/hc/es/articles/14155043715735-Centro-Familiar-para-Padres-Madres-y-Tutores"
        }
    },
    {
        id: 5,
        platform: "Instagram",
        title: "Supervisión de Perfil",
        description: "Privacidad y salud mental en redes visuales.",
        icon: <Instagram className="w-6 h-6 text-purple-600" />,
        color: "purple",
        steps: [
            "Configura la Supervisión de Meta",
            "Cuenta Privada por Defecto",
            "Filtro de Palabras Ocultas",
            "Restricción de Etiquetas"
        ],
        details: {
            fullContent: "Instagram para adolescentes incluye protecciones automáticas, pero la 'Supervisión' permite a los padres establecer límites de tiempo diarios y ver a quién sigue o quién sigue a su hijo. Las cuentas privadas son obligatorias para menores de 16 años en muchas regiones actuales.",
            setupPath: "Configuración > Supervisión / Privacidad de la cuenta.",
            expertTip: "Anima a tu hijo a usar el modo 'Mejores Amigos' para sus Stories. Esto crea un círculo más íntimo y reduce la presión social de publicar para una audiencia desconocida.",
            riskAnalysis: "Protección contra 'Sextorsión' inicial, comparación social tóxica y acoso persistente a través de comentarios.",
            officialLink: "https://about.instagram.com/es-la/community/parents"
        }
    },
    {
        id: 6,
        platform: "YouTube",
        title: "Cuentas Supervisadas",
        description: "Navegación segura por el mayor catálogo de video.",
        icon: <Youtube className="w-6 h-6 text-red-600" />,
        color: "red",
        steps: [
            "Selección de Nivel de Contenido",
            "Pausa del Historial de Búsqueda",
            "Bloqueo Manual de Canales (Family Link)",
            "Desactivación de Funciones Sociales"
        ],
        details: {
            fullContent: "YouTube Kids es genial para niños pequeños, pero para pre-adolescents, la 'Experiencia Supervisada' en la app principal es mejor. Te permite elegir entre tres filtros de contenido basados en la madurez y desactiva automáticamente funciones como comentarios, compras y transmisiones en vivo.",
            setupPath: "App Family Link > YouTube o Configuración de cuenta de Google.",
            expertTip: "Configura un 'Recordatorio de descanso' cada 15 o 20 minutos. Esto ayuda a romper el ciclo de visualización compulsiva de 'Shorts'.",
            riskAnalysis: "Reducción de exposición a desinformación, contenido violento y publicidad inapropiada.",
            officialLink: "https://www.youtube.com/intl/es/myfamily/"
        }
    },
    {
        id: 7,
        platform: "Twitch",
        title: "Seguridad de Stream",
        description: "Prevención en las transmisiones en vivo y chats directos.",
        icon: <Tv className="w-6 h-6 text-purple-700" />,
        color: "purple",
        steps: [
            "Bloqueo Global de Susurros",
            "Filtros de Chat de Moderación Automática",
            "Autenticación en Dos Pasos (2FA)",
            "Gestión de Regalos de Sub"
        ],
        details: {
            fullContent: "En Twitch, el riesgo es la interacción en vivo y las donaciones monetarias. El modo de 'Chat Seguro' y el bloqueo de 'Susurros' (mensajes privados) de extraños son esenciales. Si el menor realiza streaming, la seguridad de la ubicación e identidad debe ser la prioridad absoluta.",
            setupPath: "Configuración > Seguridad y Privacidad.",
            expertTip: "Si tu hijo es espectador, asegúrate de que use el 'Chat Filtrado' para ocultar automáticamente insultos. Si hace streams, enséñale a nunca revelar su escuela, ciudad o mostrar su ventana por cámara.",
            riskAnalysis: "Prevención de 'Doxxing' (revelación de datos privados), acoso en tiempo real y gastos no autorizados en donaciones.",
            officialLink: "https://safety.twitch.tv/s/article/Guide-Parents-Educators?language=es"
        }
    }
];
