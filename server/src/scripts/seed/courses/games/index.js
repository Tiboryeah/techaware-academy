const seedModule1 = require('./module1');
const seedModule2 = require('./module2');
const seedModule3 = require('./module3');
const seedModule4 = require('./module4');
const seedModule5 = require('./module5');
const seedModule6 = require('./module6');
const seedFinalQuiz = require('./finalQuiz');

module.exports = async function seedModule(context) {
    const { getOrCreateCourse, models } = context;
    const { Lesson, Module, Quiz } = models;

    const courseGames = await getOrCreateCourse({
        title: 'Videojuegos en Línea: Roblox y Minecraft',
        description: 'Curso práctico para acompañar el uso de Roblox y Minecraft, revisando cuentas, chat, compras y bienestar digital.',
        category: 'Videojuegos',
        platforms: ['Roblox', 'Minecraft'],
        riskAreas: ['Seguridad de Cuenta', 'Privacidad Avanzada', 'Gasto Controlado', 'Salud Mental y Física'],
        status: 'published',
        duration: '3 horas',
    });

    await Lesson.deleteMany({ courseId: courseGames._id });
    await Module.deleteMany({ courseId: courseGames._id });
    await Quiz.deleteMany({ refId: courseGames._id, scope: 'course' });
    console.log('  (-) Old lessons, modules and Course Quiz for Course 1 wiped for clean expansion.');

    const gamesContext = {
        ...context,
        courseGames,
    };

    await seedModule1(gamesContext);
    await seedModule2(gamesContext);
    await seedModule3(gamesContext);
    await seedModule4(gamesContext);
    await seedModule5(gamesContext);
    await seedModule6(gamesContext);
    await seedFinalQuiz(gamesContext);
};
