# Resizes and re-encodes documentation screenshots mirrored from the reference
# site. Called in batches by tools/import-docs.mjs (see IMPLEMENTATION_PLAN.md
# decision D1: the reference ships ≈ 15 000 screenshots totalling ≈ 2 GB, so the
# mirror stores them downscaled and re-encoded instead).
#
# Usage (from the importer, one process per batch):
#   powershell -File tools/resize-images.ps1 -Manifest <manifest.json>
#
# The manifest is JSON: { maxWidth, quality, results, marker, jobs: [ { id, in, out } ] }
# and the script writes:
#   - one JPEG per job at `out`
#   - "<id>|<width>|<height>" (or "<id>|error|<message>") per job to `results`
#   - `marker` last, so the importer knows the batch finished
#
# The marker exists because a PowerShell process holding a GDI+ bitmap can take
# a long time to tear down; the importer waits for the marker instead of waiting
# for process exit, then terminates the process itself.

param(
    [Parameter(Mandatory = $true)]
    [string]$Manifest
)

$ErrorActionPreference = 'Continue'
Add-Type -AssemblyName System.Drawing

$data = Get-Content -LiteralPath $Manifest -Raw | ConvertFrom-Json
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$lines = New-Object System.Collections.Generic.List[string]

foreach ($job in $data.jobs) {
    try {
        $img = [System.Drawing.Image]::FromFile($job.in)
        try {
            $target = [Math]::Min([int]$data.maxWidth, $img.Width)
            $scale = $target / $img.Width
            $width = [int]$target
            $height = [int][Math]::Round($img.Height * $scale)

            $bmp = New-Object System.Drawing.Bitmap $width, $height
            try {
                $graphics = [System.Drawing.Graphics]::FromImage($bmp)
                try {
                    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                    $graphics.DrawImage($img, 0, 0, $width, $height)
                } finally { $graphics.Dispose() }

                $params = New-Object System.Drawing.Imaging.EncoderParameters 1
                $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$data.quality)
                $bmp.Save($job.out, $codec, $params)
            } finally { $bmp.Dispose() }

            $lines.Add("$($job.id)|$width|$height")
        } finally { $img.Dispose() }
    } catch {
        $lines.Add("$($job.id)|error|$($_.Exception.Message -replace '\r?\n', ' ')")
    }
}

$lines | Set-Content -LiteralPath $data.results -Encoding utf8
Set-Content -LiteralPath $data.marker -Value 'done' -Encoding ascii
