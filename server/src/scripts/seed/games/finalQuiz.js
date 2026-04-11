module.exports = async function seedGamesFinalQuiz(context) {
    const { getOrCreateQuiz, courseGames } = context;

        // --- FINAL EXAM: COURSE 1 ---
        const finalQuizQuestions = [
            { text: 'Un jugador desconocido contacta a tu hijo por chat y le dice que ha ganado 5000 Robux, pero que para reclamarlos debe enviarle el archivo ".HAR" de su navegador o un enlace que le acaba de enviar. Esto es:', options: [{ text: 'Un ataque de "Session Hijacking" para robar la cuenta sin contraseña y evadir el 2FA.', isCorrect: true }, { text: 'Una promoción oficial de Roblox para usuarios frecuentes.', isCorrect: false }, { text: 'Un error del sistema que le permite ganar dinero gratis.', isCorrect: false }, { text: 'Un método seguro de transferencia de Robux.', isCorrect: false }] },
            { text: '¿Qué combinación de ajustes garantiza el entorno más seguro en Minecraft para un niño de 8 años?', options: [{ text: 'Uso exclusivo de Minecraft Realms con Whitelist activa y cuenta de Microsoft vinculada a Xbox Family App con chat restringido.', isCorrect: true }, { text: 'Jugar en servidores públicos verificados con el volumen del chat al 50%.', isCorrect: false }, { text: 'Usar la versión móvil del juego porque tiene menos virus.', isCorrect: false }, { text: 'Dejar que el niño cree su propio servidor en su PC personal.', isCorrect: false }] },
            { text: '¿Cuál es la diferencia crítica entre el "PIN de Cuenta" y la "Contraseña" en Roblox?', options: [{ text: 'La contraseña permite entrar al juego, pero el PIN es necesario para cambiar cualquier ajuste de privacidad o seguridad.', isCorrect: true }, { text: 'No hay diferencia, son el mismo número.', isCorrect: false }, { text: 'El PIN solo sirve para comprar Robux y la contraseña para todo lo demás.', isCorrect: false }, { text: 'El PIN se envía por correo cada vez que el niño juega.', isCorrect: false }] },
            { text: 'Has detectado que tu hijo ha gastado 200 euros en "skins" en un mes. Según la ley de protección al consumidor y las políticas de las tiendas, ¿por qué es difícil recuperar ese dinero?', options: [{ text: 'Porque gran parte del contenido digital se considera "consumido" inmediatamente tras la compra y las plataformas exigen PIN de compra para evitar devoluciones.', isCorrect: true }, { text: 'Porque el dinero virtual no es real ante la ley.', isCorrect: false }, { text: 'Porque los bancos prohíben cancelar pagos de videojuegos.', isCorrect: false }, { text: 'Porque el niño aceptó los términos y condiciones al nacer.', isCorrect: false }] },
            { text: '¿Qué síntoma físico indica que un niño necesita intervención inmediata en su ergonomía de juego?', options: [{ text: 'Dolor recurrente en las muñecas (túnel carpiano), hombros encorvados y parpadeo excesivo por fatiga visual.', isCorrect: true }, { text: 'Aprender a escribir más rápido en el teclado.', isCorrect: false }, { text: 'Tener las manos calientes después de jugar.', isCorrect: false }, { text: 'Querer una pantalla más pequeña.', isCorrect: false }] }
        ];
        const finalQuiz = await getOrCreateQuiz({
            title: 'Examen Final: Experto en Videojuegos (Curso 1)',
            description: 'Prueba final de certificación para padres expertos en seguridad de videojuegos.',
            scope: 'course',
            refId: courseGames._id,
            scopeModel: 'Course'
        }, finalQuizQuestions);
        courseGames.finalQuizId = finalQuiz._id;
        await courseGames.save();

        console.log('Course 1 Fully Expanded & Quizzes Refined!');
};

