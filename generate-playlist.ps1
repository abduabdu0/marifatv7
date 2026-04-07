$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$songDir = Join-Path $root "song"
$playlistFile = Join-Path $songDir "playlist.json"
$playlistJsFile = Join-Path $songDir "playlist.js"

if (-not (Test-Path $songDir)) {
    New-Item -ItemType Directory -Path $songDir | Out-Null
}

$audioExt = @(".mp3", ".wav", ".ogg", ".m4a")

$tracks = Get-ChildItem -Path $songDir -File |
    Where-Object { $audioExt -contains $_.Extension.ToLower() } |
    Sort-Object Name |
    ForEach-Object {
        [PSCustomObject]@{
            title  = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
            artist = "Unknown Artist"
            src    = "song/$($_.Name)"
        }
    }

$json = $tracks | ConvertTo-Json -Depth 3
if (-not $json) {
    $json = "[]"
}

$json | Out-File -FilePath $playlistFile -Encoding utf8
$playlistJs = "window.PLAYLIST_DATA = " + $json + ";"
$playlistJs | Out-File -FilePath $playlistJsFile -Encoding utf8

Write-Host "Generated $playlistFile and $playlistJsFile with $($tracks.Count) track(s)."
