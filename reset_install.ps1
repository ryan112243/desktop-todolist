Param(
  [string]$AppDir = $PSScriptRoot,
  [string]$DesktopShortcutName = "Desktop Todo List.lnk",
  [string]$FolderShortcutName = "Desktop Todo List (Folder).lnk",
  [switch]$ReinstallStartup = $true,
  [switch]$Launch = $true
)

Write-Host "Reset & rebuild start..." -ForegroundColor Cyan
$ErrorActionPreference = 'Stop'

# 清除舊捷徑
$desktopDir = [Environment]::GetFolderPath('Desktop')
if (-not $desktopDir -or $desktopDir.Trim() -eq '') { $desktopDir = Join-Path $env:USERPROFILE 'Desktop' }
$desktopPath = Join-Path $desktopDir $DesktopShortcutName
if (Test-Path -LiteralPath $desktopPath) { Remove-Item -LiteralPath $desktopPath -Force }
$folderShortcut = Join-Path $AppDir $FolderShortcutName
if (Test-Path -LiteralPath $folderShortcut) { Remove-Item -LiteralPath $folderShortcut -Force }
$startupDir = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
$startupLnk = Join-Path $startupDir $DesktopShortcutName
if (Test-Path -LiteralPath $startupLnk) { Remove-Item -LiteralPath $startupLnk -Force }
Write-Host "Old shortcuts removed" -ForegroundColor Yellow

# 驗證 Node/npm
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Error "node not found, install Node.js"; exit 1 }
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) { Write-Error "npm.cmd not found, ensure npm in PATH"; exit 1 }

# 乾淨安裝依賴（若有 lock 則用 npm ci）
Push-Location $AppDir
if (-not (Test-Path (Join-Path $AppDir "package.json"))) { Write-Error "package.json not found"; Pop-Location; exit 1 }
if (Test-Path (Join-Path $AppDir "package-lock.json")) {
  Write-Host "Running npm ci..." -ForegroundColor Yellow
  & (Get-Command npm.cmd).Path ci
} else {
  Write-Host "Running npm install..." -ForegroundColor Yellow
  & (Get-Command npm.cmd).Path install
}
Pop-Location

# 重建桌面捷徑與資料夾捷徑
powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $AppDir "create_shortcut.ps1") -ShortcutName $DesktopShortcutName -IconPath (Join-Path $AppDir "shortcut-icon.ico") -Description "Desktop Todo List" -OutputDir ([Environment]::GetFolderPath('Desktop')) | Out-Null
powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $AppDir "create_shortcut.ps1") -ShortcutName $FolderShortcutName -IconPath (Join-Path $AppDir "shortcut-icon.ico") -Description "Desktop Todo List (Folder)" -OutputDir $AppDir | Out-Null
Write-Host "Shortcuts rebuilt" -ForegroundColor Green

# 重新安裝開機啟動
if ($ReinstallStartup) {
  Write-Host "Installing startup shortcut..." -ForegroundColor Cyan
  powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $AppDir "install_startup.ps1") -AppDir $AppDir -ShortcutName $DesktopShortcutName -IconPath (Join-Path $AppDir "shortcut-icon.ico") | Out-Null
}

Write-Host "Rebuild complete" -ForegroundColor Green

if ($Launch) {
  Write-Host "Launching app..." -ForegroundColor Cyan
  $startPs1 = Join-Path $AppDir 'start_app.ps1'
  powershell -NoProfile -ExecutionPolicy Bypass -File $startPs1
}