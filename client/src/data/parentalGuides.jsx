import React from 'react';
import { Gamepad2, Video, MessageCircle, Instagram, Youtube, Tv } from 'lucide-react';

export const parentalGuides = [
    {
        id: 1,
        platform: 'Roblox',
        title: 'Control en el metaverso',
        description: 'Protección integral para una de las plataformas de juego más usadas por menores.',
        icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
        color: 'red',
        steps: [
            'Activa el PIN de seguridad',
            'Revisa restricciones de cuenta',
            'Configura filtros de chat',
            'Mantén privado el inventario cuando aplique'
        ],
        details: {
            fullContent: 'Roblox es una plataforma expansiva donde los riesgos principales son el contacto con desconocidos a través de mensajes directos y la exposición a experiencias con contenido no apto. El PIN parental es una de las barreras más importantes, porque evita que un menor revierta fácilmente la configuración de seguridad.',
            setupPath: 'Configuración > Seguridad > PIN de la cuenta / Privacidad',
            expertTip: "No te limites a activar los filtros: revisa periódicamente las experiencias recientes para entender qué está jugando realmente tu hijo.",
            riskAnalysis: 'Reduce de forma importante el riesgo de grooming y fraudes por intercambio de objetos virtuales.',
            officialLink: 'https://en.help.roblox.com/hc/es/articles/30428310121620-Resumen-de-los-controles-parentales'
        }
    },
    {
        id: 2,
        platform: 'Minecraft',
        title: 'Mundo creativo seguro',
        description: 'Gestiona multijugador y privacidad desde Xbox Family Settings.',
        icon: <Gamepad2 className="w-6 h-6 text-green-600" />,
        color: 'green',
        steps: [
            'Usa la app Xbox Family Settings',
            'Bloquea o limita el juego multijugador',
            'Controla solicitudes de amistad',
            'Revisa la privacidad del perfil'
        ],
        details: {
            fullContent: 'Aunque Minecraft parece inofensivo, el modo multijugador en servidores públicos expone a los niños a chats sin moderar. La clave está en la cuenta de Microsoft vinculada y en configurar correctamente la cuenta infantil.',
            setupPath: 'App Xbox Family Settings > Configuración de cuenta del menor',
            expertTip: 'Si tu hijo quiere jugar con amigos reales, considera un Realm privado antes que un servidor público masivo.',
            riskAnalysis: 'Previene exposición a lenguaje abusivo y contactos no deseados a través de Xbox Live.',
            officialLink: 'https://www.minecraft.net/es-es/article/parental-controls'
        }
    },
    {
        id: 3,
        platform: 'TikTok',
        title: 'Sincronización familiar',
        description: 'Controla tiempo de exposición, privacidad y búsquedas.',
        icon: <Video className="w-6 h-6 text-pink-500" />,
        color: 'pink',
        steps: [
            'Vincula cuentas por código QR',
            'Activa el modo restringido',
            'Gestiona búsquedas seguras',
            'Establece límite de tiempo de pantalla'
        ],
        details: {
            fullContent: 'La sincronización familiar de TikTok permite gestionar desde tu cuenta quién puede enviar mensajes, comentar o ver ciertos contenidos del menor, sin quitarle por completo el acceso a la plataforma.',
            setupPath: 'Perfil > Ajustes y privacidad > Sincronización familiar',
            expertTip: 'Activa filtros de palabras clave para reducir la aparición de contenido no deseado en el feed.',
            riskAnalysis: 'Ayuda a mitigar exposición a retos peligrosos, uso compulsivo y contenido hipersexualizado.',
            officialLink: 'https://www.tiktok.com/safety/es/guardians-guide/'
        }
    },
    {
        id: 4,
        platform: 'Discord',
        title: 'Family Center y privacidad',
        description: 'Protección en comunidades de chat y servidores.',
        icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
        color: 'indigo',
        steps: [
            'Activa Family Center',
            'Revisa filtros de contenido e imágenes',
            'Desactiva mensajes directos de desconocidos',
            'Configura privacidad del perfil'
        ],
        details: {
            fullContent: 'Discord puede ser muy útil para comunidades de juego, pero también es un entorno con riesgo de estafas, grooming y servidores tóxicos. El Centro Familiar ayuda a supervisar mejor con quién interactúa el menor.',
            setupPath: 'Ajustes de usuario > Centro familiar / Privacidad y seguridad',
            expertTip: "Desactiva 'Permitir mensajes directos de los miembros del servidor' para que no puedan escribirle personas no aprobadas.",
            riskAnalysis: 'Reduce riesgo de estafas, contacto no deseado y exposición a contenido explícito.',
            officialLink: 'https://support.discord.com/hc/es/articles/14155043715735-Centro-Familiar-para-Padres-Madres-y-Tutores'
        }
    },
    {
        id: 5,
        platform: 'Instagram',
        title: 'Supervisión de perfil',
        description: 'Privacidad y bienestar en redes visuales.',
        icon: <Instagram className="w-6 h-6 text-purple-600" />,
        color: 'purple',
        steps: [
            'Activa la supervisión de Meta',
            'Mantén la cuenta privada',
            'Usa filtro de palabras ocultas',
            'Restringe etiquetas y menciones'
        ],
        details: {
            fullContent: 'Instagram para adolescentes incorpora protecciones automáticas, pero la supervisión parental permite además revisar hábitos, tiempos y conexiones de la cuenta.',
            setupPath: 'Configuración > Supervisión / Privacidad de la cuenta',
            expertTip: "Anima a usar 'Mejores amigos' para stories si quiere compartir con un círculo más seguro.",
            riskAnalysis: 'Ayuda a reducir riesgos de sextorsión inicial, comparación social tóxica y acoso.',
            officialLink: 'https://about.instagram.com/es-la/community/parents'
        }
    },
    {
        id: 6,
        platform: 'YouTube',
        title: 'Cuentas supervisadas',
        description: 'Navegación más segura por el catálogo de video.',
        icon: <Youtube className="w-6 h-6 text-red-600" />,
        color: 'red',
        steps: [
            'Selecciona nivel de contenido',
            'Pausa historial si hace falta',
            'Bloquea canales con Family Link',
            'Desactiva funciones sociales cuando convenga'
        ],
        details: {
            fullContent: 'Para preadolescentes, la experiencia supervisada en YouTube puede ser más útil que YouTube Kids, porque permite usar la app principal con filtros ajustados a la madurez del menor.',
            setupPath: 'App Family Link > YouTube o configuración de cuenta de Google',
            expertTip: 'Configura recordatorios de descanso para romper el ciclo de consumo compulsivo de shorts.',
            riskAnalysis: 'Reduce exposición a desinformación, violencia y publicidad inapropiada.',
            officialLink: 'https://www.youtube.com/intl/es/myfamily/'
        }
    },
    {
        id: 7,
        platform: 'Twitch',
        title: 'Seguridad de stream',
        description: 'Prevención en transmisiones en vivo y chats directos.',
        icon: <Tv className="w-6 h-6 text-purple-700" />,
        color: 'purple',
        steps: [
            'Bloquea susurros de desconocidos',
            'Activa filtros de moderación automática',
            'Usa autenticación en dos pasos',
            'Revisa regalos, suscripciones y donaciones'
        ],
        details: {
            fullContent: 'En Twitch, el riesgo está en la interacción en vivo, los mensajes privados y los gastos impulsivos. Si el menor hace streams, la protección de su identidad y ubicación es prioritaria.',
            setupPath: 'Configuración > Seguridad y privacidad',
            expertTip: 'Enséñale a no revelar escuela, ciudad ni detalles visuales de su entorno durante una transmisión.',
            riskAnalysis: 'Ayuda a prevenir doxxing, acoso en tiempo real y gastos no autorizados.',
            officialLink: 'https://safety.twitch.tv/s/article/Guide-Parents-Educators?language=es'
        }
    }
];
