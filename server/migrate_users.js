const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

dotenv.config();

const migrateUsers = async () => {
    try {
        await connectDB();
        console.log('--- Iniciando Migración de Usuarios ---');

        const users = await User.find({});
        console.log(`Encontrados ${users.length} usuarios para procesar.`);

        let updatedCount = 0;
        for (let user of users) {
            let changed = false;

            // 1. Manejar renombramiento de passwordHash a passHash directamente en el documento de MongoDB
            // Nota: Mongoose oculta los campos que no están en el esquema, así que usamos el objeto plano
            const userObj = user.toObject();

            if (userObj.passwordHash && !userObj.passHash) {
                console.log(`(+) Migrando contraseña para: ${user.email}`);
                // Usamos updateOne con $rename para ser eficientes y seguros a nivel BD
                await User.collection.updateOne(
                    { _id: user._id },
                    {
                        $rename: { "passwordHash": "passHash" },
                        $set: { "isVerified": true } // Los verificamos a todos para que no queden bloqueados
                    }
                );
                changed = true;
            }

            // 2. Corregir capitalización y mapeo de roles
            const currentUser = await User.findById(user._id);
            const oldRole = currentUser.role?.toLowerCase();

            if (oldRole === 'admin') {
                currentUser.role = 'Admin';
                changed = true;
            } else if (oldRole === 'parent' || oldRole === 'padre' || !oldRole) {
                currentUser.role = 'Parent';
                changed = true;
            }

            // Asegurar que estén verificados
            if (!currentUser.isVerified) {
                currentUser.isVerified = true;
                changed = true;
            }

            if (changed) {
                await currentUser.save();
                updatedCount++;
            }
        }

        console.log(`--- Migración Finalizada ---`);
        console.log(`Usuarios actualizados: ${updatedCount}`);
        process.exit(0);
    } catch (error) {
        console.error('Error en la migración:', error);
        process.exit(1);
    }
};

migrateUsers();
