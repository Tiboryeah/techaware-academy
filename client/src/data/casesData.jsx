import React from 'react';
import { UserX, AlertTriangle, ShieldCheck } from 'lucide-react';

export const casesData = [
    {
        id: 1,
        title: "El caso de 'Amanda'",
        category: "Ciberacoso",
        summary: "Cómo una broma escolar escaló a acoso sistemático en redes sociales.",
        content: "Amanda, de 14 años, compartió una foto personal que fue editada y difundida en grupos de WhatsApp. Sus padres intervinieron contactando a la escuela y usando herramientas de reporte en la plataforma...",
        fullContent: "Lo que comenzó como un 'meme' interno en un grupo de 9° grado, rápidamente se convirtió en una pesadilla. La imagen de Amanda fue alterada mediante Inteligencia Artificial para crear una situación comprometedora falsa. En menos de 24 horas, la imagen había llegado a estudiantes de otros grados y padres de familia.",
        lessons: "La rapidez de la intervención es clave. Los padres de Amanda no solo hablaron con ella, sino que recolectaron evidencia digital (links y capturas) antes de que el contenido fuera borrado, lo que permitió a la policía cibernética rastrear el origen.",
        riskLevel: "Crítico",
        timeline: [
            { time: "Día 1", event: "Se crea el grupo 'Meme Central' y se sube la foto editada." },
            { time: "Día 2", event: "La foto se vuelve viral en la escuela. Amanda recibe los primeros insultos." },
            { time: "Día 3", event: "Los padres notan que Amanda no quiere ir a la escuela y revisan su teléfono." },
            { time: "Día 4", event: "Denuncia ante la dirección escolar y reporte masivo en plataformas." }
        ],
        icon: <UserX className="w-5 h-5" />,
        color: "red",
        tips: [
            "Guarda evidencia (capturas de pantalla).",
            "No respondas a las agresiones.",
            "Reporta el contenido inmediatamente.",
            "Contacta a las autoridades escolares."
        ]
    },
    {
        id: 2,
        title: "Estafa en Roblox",
        category: "Fraudes",
        summary: "Robo de cuenta mediante promesa de 'Robux gratis'.",
        content: "Julián (10 años) ingresó sus datos en una página externa que prometía monedas del juego. Perdió acceso a su cuenta y se realizaron cargos a la tarjeta de sus padres.",
        fullContent: "Julián vio un video en YouTube donde un 'influencer' regalaba Robux. El link lo llevó a una página que se veía idéntica a la oficial de Roblox. Al poner su usuario y contraseña, un script robó su sesión. Al tener la tarjeta vinculada para una compra anterior, los estafadores compraron ítems por un valor de $2,500 MXN en cuestión de minutos.",
        lessons: "Nunca se deben guardar los datos de pago permanentemente en dispositivos de menores. La educación sobre 'Phishing' es necesaria desde que empiezan a jugar en línea.",
        riskLevel: "Alto",
        timeline: [
            { time: "14:00", event: "Julián entra al sitio de 'Free Robux'." },
            { time: "14:05", event: "Ingresa sus credenciales. La cuenta es hackeada al instante." },
            { time: "14:15", event: "Primera transacción bancaria detectada por el banco de los padres." },
            { time: "14:30", event: "Los padres bloquean la tarjeta y reportan el fraude." }
        ],
        icon: <AlertTriangle className="w-5 h-5" />,
        color: "yellow",
        tips: [
            "Nunca ingreses contraseñas fuera de la web oficial.",
            "Activa la verificación en dos pasos (2FA).",
            "Configura alertas de gastos bancarios.",
            "Desvincula tarjetas de crédito de cuentas de menores."
        ]
    },
    {
        id: 3,
        title: "El 'Amigo' de Discord",
        category: "Grooming",
        summary: "Un adulto ganándose la confianza de un menor a través de un juego.",
        content: "Un usuario que decía tener 15 años contactó a Mateo (12) para jugar Fortnite. Poco a poco pidió fotos y datos personales. Los padres notaron cambios de humor en Mateo y revisaron sus chats.",
        fullContent: "El acosador pasó 3 meses 'jugando' con Mateo. Le regalaba 'skins' y pases de batalla para ganarse su lealtad. Eventualmente, la conversación se movió a Discord, donde el acosador empezó a pedirle que encendiera la cámara en horarios donde los padres no estaban presentes.",
        lessons: "El 'regalo' es una de las tácticas más comunes. Si alguien que no conoces en la vida real empieza a darte cosas de valor, es una alerta roja inmediata. El diálogo abierto con los hijos salvó a Mateo de una situación física.",
        riskLevel: "Muy Alto",
        timeline: [
            { time: "Mes 1", event: "Primer contacto en el lobby de Fortnite. Comienzan a jugar diario." },
            { time: "Mes 2", event: "Mueven la charla a Discord. El acosador da los primeros regalos." },
            { time: "Mes 3", event: "Petición de fotos y videollamadas privadas. Mateo se siente incómodo." },
            { time: "Semana Final", event: "Los padres confrontan a Mateo y reportan el perfil a las autoridades." }
        ],
        icon: <ShieldCheck className="w-5 h-5" />,
        color: "indigo",
        tips: [
            "Supervisa con quién juegan tus hijos.",
            "Revisa el historial de chats periódicamente.",
            "Enseña a no compartir datos personales.",
            "Desconfía de regalos o atención excesiva."
        ]
    }
];
