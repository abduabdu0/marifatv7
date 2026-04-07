$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$imgDir = Join-Path $root "img"
$listFile = Join-Path $root "photos-list.json"
$listJsFile = Join-Path $root "photos-list.js"

if (-not (Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir | Out-Null
}

$imageExt = @(".jpg", ".jpeg", ".png", ".webp", ".gif" ,".mp4")

$photos = Get-ChildItem -Path $imgDir -File |
    Where-Object { $imageExt -contains $_.Extension.ToLower() } |
    Sort-Object Name |
    ForEach-Object {
        [PSCustomObject]@{
            title = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
            src   = "img/$($_.Name)"
            srcVideo = "img/$($_.Name)"
        }
    }

$json = $photos | ConvertTo-Json -Depth 3
if (-not $json) {
    $json = "[]"
}

$json | Out-File -FilePath $listFile -Encoding utf8
$js = "window.PHOTOS_DATA = " + $json + ";"
$js | Out-File -FilePath $listJsFile -Encoding utf8
Write-Host "Generated $listFile and $listJsFile with $($photos.Count) photo(s)."
