param(
    [switch]$SkipPrereqs,
    [switch]$UseInMemoryDb,
    [switch]$ForceEnv
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Test-Command {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WithWinget {
    param(
        [string]$Id,
        [string]$Name
    )

    if ($SkipPrereqs) {
        Write-Host "Saltando instalacion de $Name por -SkipPrereqs."
        return
    }

    if (-not (Test-Command winget)) {
        Write-Warning "winget no esta disponible. Instala manualmente: $Name"
        return
    }

    Write-Host "Instalando $Name con winget..."
    winget install --id $Id -e --accept-package-agreements --accept-source-agreements
}

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServerDir = Join-Path $Root "server"
$ClientDir = Join-Path $Root "client"

if (-not (Test-Path $ServerDir) -or -not (Test-Path $ClientDir)) {
    throw "Ejecuta este script desde la raiz del proyecto, donde existen las carpetas server y client."
}

Write-Step "Revisando prerrequisitos"

if (-not (Test-Command git)) {
    Install-WithWinget -Id "Git.Git" -Name "Git"
}

if (-not (Test-Command node)) {
    Install-WithWinget -Id "OpenJS.NodeJS.LTS" -Name "Node.js LTS"
}

if (-not $UseInMemoryDb) {
    $mongoInstalled = (Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue) -or (Test-Command mongod)
    if (-not $mongoInstalled) {
        Install-WithWinget -Id "MongoDB.Server" -Name "MongoDB Community Server"
    }

    $mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
    if ($mongoService -and $mongoService.Status -ne "Running") {
        try {
            Write-Host "Iniciando servicio MongoDB..."
            Start-Service MongoDB
        } catch {
            Write-Warning "No pude iniciar MongoDB automaticamente. Abre PowerShell como administrador y ejecuta: Start-Service MongoDB"
        }
    }
}

if (-not (Test-Command node)) {
    throw "Node.js no esta disponible en PATH. Instala Node.js LTS y vuelve a ejecutar este script."
}

if (-not (Test-Command npm)) {
    throw "npm no esta disponible en PATH. Reinstala Node.js LTS y vuelve a ejecutar este script."
}

Write-Host "Node: $(node --version)"
Write-Host "npm:  $(npm --version)"

Write-Step "Creando archivos .env locales"

$JwtSecretBytes = New-Object byte[] 48
[System.Security.Cryptography.RandomNumberGenerator]::Fill($JwtSecretBytes)
$JwtSecret = [Convert]::ToBase64String($JwtSecretBytes)

if ($UseInMemoryDb) {
    $MongoUri = ""
    $UseMemory = "true"
} else {
    $MongoUri = "mongodb://127.0.0.1:27017/techaware_academy"
    $UseMemory = "false"
}

$ServerEnvPath = Join-Path $ServerDir ".env"
$ClientEnvPath = Join-Path $ClientDir ".env"

$ServerEnv = @"
PORT=5000
NODE_ENV=development
MONGO_URI=$MongoUri
USE_IN_MEMORY_DB=$UseMemory
JWT_SECRET=$JwtSecret
ADMIN_SEED_EMAIL=admin@kuxipilli.local
ADMIN_SEED_PASSWORD=Admin123!Local
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
USE_MOCK_AI=true
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
EMAIL_FROM=onboarding@resend.dev
ADMIN_EMAIL=admin@kuxipilli.local
RESEND_API_KEY=
EMAIL_USER=
EMAIL_PASS=
USE_MOCK_EMAIL=true
"@

$ClientEnv = @"
VITE_API_URL=http://localhost:5000
"@

if ((Test-Path $ServerEnvPath) -and -not $ForceEnv) {
    Write-Warning "server/.env ya existe. Lo dejo intacto. Usa -ForceEnv si quieres regenerarlo."
} else {
    Set-Content -Path $ServerEnvPath -Value $ServerEnv -Encoding UTF8
}

if ((Test-Path $ClientEnvPath) -and -not $ForceEnv) {
    Write-Warning "client/.env ya existe. Lo dejo intacto. Usa -ForceEnv si quieres regenerarlo."
} else {
    Set-Content -Path $ClientEnvPath -Value $ClientEnv -Encoding UTF8
}

Write-Step "Instalando dependencias del backend"
Push-Location $ServerDir
npm ci
Pop-Location

Write-Step "Instalando dependencias del frontend"
Push-Location $ClientDir
npm ci
Pop-Location

if (-not $UseInMemoryDb) {
    $envLines = Get-Content $ServerEnvPath -ErrorAction SilentlyContinue
    $configuredMongoUri = ($envLines | Where-Object { $_ -match '^MONGO_URI=' } | Select-Object -First 1) -replace '^MONGO_URI=', ''
    $isLocalMongo = $configuredMongoUri -match '^mongodb://(127\.0\.0\.1|localhost)(:\d+)?/'

    if ($isLocalMongo) {
        Write-Step "Cargando contenido inicial en MongoDB local"
        Push-Location $ServerDir
        npm run seed
        Pop-Location
    } else {
        Write-Warning "No ejecuto seed automatico porque MONGO_URI no parece local. Revisa server/.env y ejecuta manualmente: cd server; npm run seed"
    }
} else {
    Write-Warning "Modo en memoria activo: no se ejecuta seed porque los datos se perderian al cerrar el proceso."
}

Write-Step "Listo"
Write-Host "Para iniciar la app ejecuta:" -ForegroundColor Green
Write-Host ".\start-local-windows.ps1"
Write-Host ""
Write-Host "URL local: http://localhost:5173"
Write-Host "Admin local: admin@kuxipilli.local / Admin123!Local"
