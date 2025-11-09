Param(
  [string]$AppDir = $PSScriptRoot
)

Write-Host "Starting Desktop Todo app..." -ForegroundColor Cyan
$ErrorActionPreference = 'Stop'
$Log = Join-Path $AppDir 'start_app.log'
function Write-Log($msg) { try { Add-Content -Path $Log -Value "[$([DateTime]::Now.ToString('u'))] $msg" } catch {} }
Write-Log 'Start script'

$npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npm) { Write-Log 'npm not found'; Write-Error "npm not found. Install Node.js (includes npm)."; exit 1 }

Push-Location $AppDir
  if (-not (Test-Path (Join-Path $AppDir 'package.json'))) { Write-Log 'package.json missing'; Write-Error "package.json not found. Check working directory."; exit 1 }

  if (-not (Test-Path (Join-Path $AppDir 'node_modules'))) {
    Write-Host "First launch: installing dependencies..." -ForegroundColor Yellow
    Write-Log 'Installing dependencies'
    & $npm.Path install
    Write-Log 'Dependencies installed'
  }

  # Ensure desktop shortcut exists (auto create on first run)
  try {
    $desk = [Environment]::GetFolderPath('Desktop')
    $lnk = Join-Path $desk 'Desktop Todo List.lnk'
    if (-not (Test-Path $lnk)) {
      Write-Host "Creating desktop shortcut..." -ForegroundColor Yellow
      Write-Log 'Creating desktop shortcut'
      $create = Join-Path $AppDir 'create_shortcut.ps1'
      if (Test-Path $create) {
        powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File $create -AppDir $AppDir -ShortcutName 'Desktop Todo List.lnk' -IconPath (Join-Path $AppDir 'shortcut-icon.ico') -Description 'Desktop Todo List' -OutputDir $desk | Out-Null
        Write-Log 'Desktop shortcut created'
      } else {
        Write-Log 'create_shortcut.ps1 missing'
      }
    }
  } catch { Write-Log "Shortcut creation failed: $($_.Exception.Message)" }

  $localElectron = Join-Path $AppDir 'node_modules\.bin\electron.cmd'
  if (Test-Path $localElectron) { Write-Log 'Using local electron'; & $localElectron $AppDir; $ec=$LASTEXITCODE; if ($ec -ne 0) { Write-Log "local electron exit code=$ec" } }
  else {
    $npx = Get-Command npx.cmd -ErrorAction SilentlyContinue
    if ($npx) { Write-Log 'Using npx electron'; & $npx.Path electron $AppDir; $ec=$LASTEXITCODE; if ($ec -ne 0) { Write-Log "npx electron exit code=$ec" } }
    else { Write-Log 'Using npm run start'; & $npm.Path run start; $ec=$LASTEXITCODE; if ($ec -ne 0) { Write-Log "npm run start exit code=$ec" } }
  }
  Write-Log 'Launch command executed'
Pop-Location