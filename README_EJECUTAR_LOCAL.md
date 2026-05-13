# Ejecutar TechAware/Kuxipilli en otra PC Windows

Esta app tiene dos partes:

- `server`: API Node/Express en `http://localhost:5000`
- `client`: React/Vite en `http://localhost:5173`

Tambien necesita MongoDB para guardar usuarios, cursos, progreso, reportes, etc.

## Opcion recomendada: instalacion asistida

En la otra PC:

1. Instala Git si aun no lo tienes.
2. Abre PowerShell.
3. Clona el repo:

```powershell
git clone https://github.com/Tiboryeah/techaware-academy.git
cd techaware-academy
```

4. Ejecuta el instalador local:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup-local-windows.ps1
```

El script intenta instalar lo necesario con `winget` si falta:

- Git
- Node.js LTS
- MongoDB Community Server

Tambien instala dependencias con `npm ci`, crea `client/.env` y `server/.env`, y carga el contenido inicial con `npm run seed`.
Si esos `.env` ya existen, los deja intactos. Para regenerarlos desde cero usa:

```powershell
.\setup-local-windows.ps1 -ForceEnv
```

5. Para abrir la app despues:

```powershell
.\start-local-windows.ps1
```

O doble clic en:

```text
start-local-windows.bat
```

Luego abre:

```text
http://localhost:5173
```

## Requisitos manuales, si prefieres instalarlos tu

Instala:

- Node.js LTS, preferentemente Node 22 o superior
- Git
- MongoDB Community Server

Despues, desde la carpeta del proyecto:

```powershell
cd server
npm ci
cd ..\client
npm ci
```

Crea `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/techaware_academy
USE_IN_MEMORY_DB=false
JWT_SECRET=cambia_esto_por_un_texto_largo
ADMIN_SEED_EMAIL=admin@kuxipilli.local
ADMIN_SEED_PASSWORD=Admin123!Local
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
USE_MOCK_AI=true
USE_MOCK_EMAIL=true
```

Crea `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Carga los cursos:

```powershell
cd server
npm run seed
```

Arranca el backend:

```powershell
cd server
npm run dev
```

En otra terminal arranca el frontend:

```powershell
cd client
npm run dev
```

## Credenciales iniciales

Si usas el script tal cual:

- Usuario admin: `admin@kuxipilli.local`
- Password admin: `Admin123!Local`

Puedes cambiarlo en `server/.env` y volver a ejecutar:

```powershell
cd server
npm run seed
```

## Modo demo sin MongoDB

Existe un modo temporal:

```powershell
.\setup-local-windows.ps1 -UseInMemoryDb
```

Ese modo sirve solo para probar que la app arranca. La base de datos se borra al cerrar el servidor, asi que no es recomendable para uso real.

## Notas importantes

- Si Windows bloquea scripts, usa:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

- Si MongoDB no arranca automaticamente, abre PowerShell como administrador y ejecuta:

```powershell
Start-Service MongoDB
```

- Si el puerto `5000` o `5173` esta ocupado, cierra la app que lo usa o cambia `PORT` en `server/.env`.
- Las funciones de correo e IA quedan apagadas por defecto con `USE_MOCK_EMAIL=true` y `USE_MOCK_AI=true`.
