Param(
  [string]$AppDir = "c:\Users\ryan\Desktop\桌面todolist",
  [string]$ShortcutName = "桌面待辦清單.lnk",
  [string]$IconPath = "",
  [string]$Description = "桌面待辦清單",
  [string]$OutputDir = ""
)

if (-not $OutputDir -or $OutputDir.Trim() -eq "") {
  $OutputDir = [Environment]::GetFolderPath('Desktop')
}
if (!(Test-Path $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}
$shortcutPath = Join-Path $OutputDir $ShortcutName
$w = New-Object -ComObject WScript.Shell
$sc = $w.CreateShortcut($shortcutPath)
$ps1 = Join-Path $AppDir 'start_app.ps1'
if (Test-Path $ps1) {
  $sc.TargetPath = (Get-Command powershell).Source
  $sc.Arguments = "-NoLogo -NoProfile -ExecutionPolicy Bypass -File `"$ps1`""
} else {
  $sc.TargetPath = (Join-Path $AppDir 'start_app.cmd')
  $sc.Arguments = ''
}
$sc.WorkingDirectory = $AppDir
$sc.WindowStyle = 1
if ($Description) { $sc.Description = $Description }
function Convert-PngToIco {
  param([string]$PngPath, [string]$IcoPath)
  try {
    Add-Type -AssemblyName System.Drawing -ErrorAction Stop
    $bmp = [System.Drawing.Bitmap]::FromFile($PngPath)
    $icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon())
    $fs = [System.IO.File]::Open((Resolve-Path $IcoPath).Path, [System.IO.FileMode]::Create)
    $icon.Save($fs)
    $fs.Close()
    $icon.Dispose()
    $bmp.Dispose()
  } catch {
    Write-Warning "PNG 轉 ICO 失敗：$($_.Exception.Message)"
  }
}

if ($IconPath) {
  if (Test-Path $IconPath) {
    if ($IconPath.ToLower().EndsWith('.png')) {
      $icoOut = Join-Path $AppDir 'shortcut-icon.ico'
      Convert-PngToIco -PngPath $IconPath -IcoPath $icoOut
      if (Test-Path $icoOut) { $sc.IconLocation = (Resolve-Path $icoOut).Path + ',0' }
    } else {
      $sc.IconLocation = (Resolve-Path $IconPath).Path + ',0'
    }
  } elseif ($IconPath -match '\\.dll,\d+$') {
    $sc.IconLocation = $IconPath
  }
}
$sc.Save()
Write-Host "Shortcut created at: $shortcutPath"