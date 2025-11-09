Param(
  [string]$AppDir = $PSScriptRoot,
  [string]$ShortcutName = "桌面待辦清單.lnk",
  [string]$IconPath = (Join-Path $PSScriptRoot 'shortcut-icon.ico')
)

$startupDir = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Startup'
if (!(Test-Path $startupDir)) {
  New-Item -ItemType Directory -Path $startupDir -Force | Out-Null
}
$shortcutPath = Join-Path $startupDir $ShortcutName

$w = New-Object -ComObject WScript.Shell
$sc = $w.CreateShortcut($shortcutPath)
$ps1 = Join-Path $AppDir 'start_app.ps1'
if (Test-Path $ps1) {
  $sc.TargetPath = (Get-Command powershell).Source
  $sc.Arguments = "-ExecutionPolicy Bypass -File `"$ps1`""
} else {
  $sc.TargetPath = (Join-Path $AppDir 'start_app.cmd')
}
$sc.WorkingDirectory = $AppDir
if (Test-Path $IconPath) { $sc.IconLocation = (Resolve-Path $IconPath).Path + ',0' }
$sc.WindowStyle = 1
$sc.Description = '桌面待辦清單 - 開機自動啟動'
$sc.Save()

Write-Host "Startup shortcut installed at: $shortcutPath"