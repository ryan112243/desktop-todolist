Param(
  [string]$AppDir = $PSScriptRoot,
  [string]$DesktopShortcutName = "桌面待辦清單.lnk",
  [string]$FolderShortcutName = "桌面待辦清單（資料夾）.lnk",
  [string]$IconPath = (Join-Path $PSScriptRoot 'shortcut-icon.ico'),
  [switch]$Startup = $true,
  [switch]$StartApp = $true
)

Write-Host "一鍵安裝開始..." -ForegroundColor Cyan

# 檢查 Node / npm
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Error "未找到 node，請安裝 Node.js"; exit 1 }
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) { Write-Error "未找到 npm.cmd，請確保 npm 在 PATH"; exit 1 }

# 首次安裝依賴
if (-not (Test-Path (Join-Path $AppDir 'node_modules'))) {
  Write-Host "安裝相依套件..." -ForegroundColor Yellow
  Push-Location $AppDir
  & (Get-Command npm.cmd).Source install
  Pop-Location
}

$startCmd = Join-Path $AppDir 'start_app.cmd'
if (-not (Test-Path $startCmd)) { Write-Error "找不到 start_app.cmd"; exit 1 }

# 建立桌面捷徑
$desktopDir = [Environment]::GetFolderPath('Desktop')
$desktopLnk = Join-Path $desktopDir $DesktopShortcutName
$w = New-Object -ComObject WScript.Shell
$sc = $w.CreateShortcut($desktopLnk)
$sc.TargetPath = "$AppDir\start_app.cmd"
$sc.WorkingDirectory = $AppDir
$sc.WindowStyle = 1
$sc.Description = "桌面待辦清單"
if (Test-Path $IconPath) { $sc.IconLocation = (Resolve-Path $IconPath).Path + ',0' }
$sc.Save()
Write-Host "Desktop shortcut created: $desktopLnk"

# 建立資料夾捷徑（若不存在）
$folderLnk = Join-Path $AppDir $FolderShortcutName
if (-not (Test-Path $folderLnk)) {
  $sc2 = $w.CreateShortcut($folderLnk)
  $sc2.TargetPath = "$AppDir\start_app.cmd"
  $sc2.WorkingDirectory = $AppDir
  $sc2.WindowStyle = 1
  $sc2.Description = "桌面待辦清單（資料夾）"
  if (Test-Path $IconPath) { $sc2.IconLocation = (Resolve-Path $IconPath).Path + ',0' }
  $sc2.Save()
  Write-Host "Folder shortcut created: $folderLnk"
} else {
  Write-Host "資料夾捷徑已存在，略過建立：$folderLnk" -ForegroundColor Yellow
}

# 安裝開機啟動
$startupScript = Join-Path $AppDir 'install_startup.ps1'
if (Test-Path $startupScript) {
  Write-Host "安裝開機自動執行捷徑..." -ForegroundColor Cyan
  powershell -ExecutionPolicy Bypass -File $startupScript -AppDir $AppDir -ShortcutName $DesktopShortcutName -IconPath $IconPath | Out-Null
}

Write-Host "一鍵安裝完成。" -ForegroundColor Green

if ($StartApp) {
  Write-Host "啟動應用程式..." -ForegroundColor Cyan
  Start-Process -FilePath $startCmd -WorkingDirectory $AppDir
}