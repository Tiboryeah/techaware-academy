const reviewedAt = '2026-06-03';

const chatbotKnowledge = [
    {
        id: 'grooming',
        terms: ['grooming', 'acoso sexual digital', 'acoso sexual en linea', 'adulto desconocido'],
        answer: 'El grooming es una forma de abuso en la que una persona adulta contacta y manipula a una nina, nino o adolescente en espacios digitales para ganar confianza, pedir secreto, aislarlo o avanzar hacia solicitudes sexuales, imagenes, amenazas o encuentros. No es una etapa previa: ya es una situacion de abuso y debe tomarse en serio.',
        safetyNote: 'Si hay mensajes, presion, amenazas, solicitud de fotos o invitacion a verse en persona, corta el contacto, guarda evidencia, reporta la cuenta y busca apoyo adulto o institucional.',
        sources: [
            {
                label: 'UNICEF Argentina',
                url: 'https://www.unicef.org/argentina/el-grooming-es-un-delito',
            },
        ],
        reviewedAt,
    },
    {
        id: 'ciberacoso',
        terms: ['ciberacoso', 'cyberbullying', 'bullying digital', 'acoso en linea', 'acoso digital'],
        answer: 'El ciberacoso es acoso realizado mediante medios digitales, como redes sociales, chats, juegos o mensajeria. Puede incluir insultos, humillacion, amenazas, difusion de rumores, exclusion, suplantacion o publicacion de contenido para danar a una persona.',
        safetyNote: 'Conviene guardar evidencia, no responder a provocaciones, bloquear o restringir al agresor, reportar en la plataforma y avisar a un adulto o escuela si afecta a un menor.',
        sources: [
            {
                label: 'UNICEF',
                url: 'https://www.unicef.org/end-violence/how-to-stop-cyberbullying',
            },
        ],
        reviewedAt,
    },
    {
        id: 'sextorsion',
        terms: ['sextorsion', 'sextorsion digital', 'extorsion sexual', 'amenaza con fotos', 'amenazan con publicar fotos'],
        answer: 'La sextorsion ocurre cuando alguien amenaza con publicar, enviar o usar imagenes intimas para obligar a la victima a mandar mas contenido, pagar dinero o hacer algo contra su voluntad. En menores, es una emergencia de proteccion, no un problema de verguenza.',
        safetyNote: 'No pagues ni envies mas contenido. Guarda capturas, usuario, enlaces y horarios; bloquea despues de conservar evidencia y reporta a la plataforma o autoridades.',
        sources: [
            {
                label: 'FBI',
                url: 'https://www.fbi.gov/how-we-can-help-you/safety-resources/scams-and-safety/common-scams-and-crimes/sextortion',
            },
        ],
        reviewedAt,
    },
    {
        id: 'phishing',
        terms: ['phishing', 'pesca de informacion', 'link falso', 'enlace falso', 'robo de cuenta', 'pagina falsa'],
        answer: 'El phishing es una estafa digital que intenta enganar a una persona para que entregue contrasenas, codigos, datos bancarios o acceso a una cuenta mediante correos, mensajes, enlaces o paginas que parecen confiables.',
        safetyNote: 'No abras enlaces sospechosos ni ingreses credenciales fuera del sitio oficial. Si ya paso, cambia la contrasena, cierra sesiones activas, activa verificacion en dos pasos y revisa movimientos o compras.',
        sources: [
            {
                label: 'FTC',
                url: 'https://consumidor.ftc.gov/articulos/s0003-phishing',
            },
        ],
        reviewedAt,
    },
    {
        id: 'roblox',
        terms: ['roblox', 'robux', 'experiencias roblox'],
        answer: 'Roblox es una plataforma de experiencias y juegos creados por usuarios. Para familias, los puntos clave son privacidad, chat, madurez de contenido, conexiones, compras y reportes dentro de la cuenta del menor.',
        safetyNote: 'Revisa controles parentales, limites de comunicacion, madurez de contenido, conexiones, compras y opciones de bloquear o reportar desde el panel familiar.',
        sources: [
            {
                label: 'Roblox Support',
                url: 'https://en.help.roblox.com/hc/en-us/articles/30428310121620',
            },
            {
                label: 'Roblox Safety Features',
                url: 'https://en.help.roblox.com/hc/en-us/articles/203313120-Safety-Features-Chat-Privacy-Filtering',
            },
        ],
        reviewedAt,
    },
    {
        id: 'discord',
        terms: ['discord', 'servidor de discord', 'family center discord'],
        answer: 'Discord es una plataforma de comunicacion por texto, voz y video, muy usada alrededor de comunidades de juego. Para familias, los riesgos suelen aparecer en servidores, solicitudes de amistad, mensajes directos y contenido compartido.',
        safetyNote: 'Family Center ayuda a padres o tutores a estar informados sobre la actividad del adolescente respetando cierta privacidad. Tambien conviene revisar mensajes directos, privacidad y servidores.',
        sources: [
            {
                label: 'Discord Family Center',
                url: 'https://support.discord.com/hc/en-us/articles/14155039712407-What-is-Family-Center',
            },
            {
                label: 'Discord Safety Center',
                url: 'https://discord.com/safety',
            },
        ],
        reviewedAt,
    },
    {
        id: 'tiktok',
        terms: ['tiktok', 'tik tok', 'sincronizacion familiar', 'family pairing'],
        answer: 'TikTok es una plataforma de videos cortos donde los riesgos para menores pueden incluir tiempo de pantalla excesivo, retos virales, contacto no deseado, contenido sensible, comparacion social y recomendaciones algoritmicas.',
        safetyNote: 'Family Pairing permite vincular la cuenta del adolescente con la de un padre o tutor para ajustar opciones como tiempo de pantalla, contenidos y seguridad.',
        sources: [
            {
                label: 'TikTok Guardian Guide',
                url: 'https://www.tiktok.com/safety/guardians-guide/',
            },
            {
                label: 'TikTok Family Pairing',
                url: 'https://support.tiktok.com/en/safety-hc/account-and-user-safety/family-pairing',
            },
        ],
        reviewedAt,
    },
    {
        id: 'youtube',
        terms: ['youtube', 'youtube kids', 'cuenta supervisada', 'cuentas supervisadas'],
        answer: 'YouTube puede usarse con experiencias supervisadas para menores o adolescentes, segun la edad y decision familiar. El objetivo es ajustar el nivel de contenido, revisar habitos y acompanar el consumo de videos y recomendaciones.',
        safetyNote: 'Una cuenta supervisada no reemplaza la conversacion familiar: revisa historial, recomendaciones, canales, shorts y senales de consumo compulsivo o contenido sensible.',
        sources: [
            {
                label: 'YouTube Help',
                url: 'https://support.google.com/youtube/answer/10314074',
            },
            {
                label: 'YouTube For Families Help',
                url: 'https://support.google.com/youtubekids/answer/15253498',
            },
        ],
        reviewedAt,
    },
];

module.exports = chatbotKnowledge;
