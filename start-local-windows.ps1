$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$ServerDir = Join-Path $Root "server"
$ClientDir = Join-Path $Root "client"

if (-not (Test-Path (Join-Path $ServerDir ".env"))) {
    throw "Falta server/.env. Ejecuta primero .\setup-local-windows.ps1"
}

if (-not (Test-Path (Join-Path $ClientDir ".env"))) {
    throw "Falta client/.env. Ejecuta primero .\setup-local-windows.ps1"
}

if (-not (Test-Path (Join-Path $ServerDir "node_modules"))) {
    throw "Faltan dependencias del backend. Ejecuta primero .\setup-local-windows.ps1"
}

if (-not (Test-Path (Join-Path $ClientDir "node_modules"))) {
    throw "Faltan dependencias del frontend. Ejecuta primero .\setup-local-windows.ps1"
}

$serverCommand = "cd /d `"$ServerDir`" && npm run dev"
$clientCommand = "cd /d `"$ClientDir`" && npm run dev -- --host 127.0.0.1"

Start-Process -FilePath "cmd.exe" -ArgumentList "/k", $serverCommand -WorkingDirectory $ServerDir
Start-Sleep -Seconds 3
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", $clientCommand -WorkingDirectory $ClientDir
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"

Write-Host "Servidor: http://localhost:5000"
Write-Host "App:      http://localhost:5173"
Write-Host "Cierra las dos ventanas de terminal para detener la app."
