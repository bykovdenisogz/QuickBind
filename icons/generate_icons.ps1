# Generate PNG icons for QuickBind extension
# Blue circle with white lightning bolt
# Run this script in PowerShell to create icon16.png, icon48.png, icon128.png

Add-Type -AssemblyName System.Drawing

function Generate-Icon {
    param(
        [int]$Size,
        [string]$OutputPath
    )
    
    $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Set quality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    # Clear with transparency
    $graphics.Clear([System.Drawing.Color]::Transparent)
    
    # Blue circle background (#2196F3 - Material Blue)
    $circleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(33, 150, 243))
    $margin = [math]::Max(1, [int]($Size * 0.02))
    $graphics.FillEllipse($circleBrush, $margin, $margin, $Size - ($margin * 2), $Size - ($margin * 2))
    
    # White lightning bolt
    $boltBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    
    # Calculate lightning bolt points relative to size
    $cx = $Size / 2.0
    $cy = $Size / 2.0
    $s = $Size / 128.0
    
    # Create points one by one
    $p1 = New-Object System.Drawing.PointF([float]($cx - 2 * $s), [float]($cy - 40 * $s))
    $p2 = New-Object System.Drawing.PointF([float]($cx + 22 * $s), [float]($cy - 40 * $s))
    $p3 = New-Object System.Drawing.PointF([float]($cx + 4 * $s), [float]($cy - 6 * $s))
    $p4 = New-Object System.Drawing.PointF([float]($cx + 20 * $s), [float]($cy - 6 * $s))
    $p5 = New-Object System.Drawing.PointF([float]($cx - 6 * $s), [float]($cy + 40 * $s))
    $p6 = New-Object System.Drawing.PointF([float]($cx + 2 * $s), [float]($cy + 8 * $s))
    $p7 = New-Object System.Drawing.PointF([float]($cx - 16 * $s), [float]($cy + 8 * $s))
    
    $points = @($p1, $p2, $p3, $p4, $p5, $p6, $p7)
    
    $graphics.FillPolygon($boltBrush, $points)
    
    # Save
    $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    $circleBrush.Dispose()
    $boltBrush.Dispose()
    
    Write-Host "Generated: $OutputPath ($Size x $Size)"
}

$iconsDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Generate-Icon -Size 16 -OutputPath (Join-Path $iconsDir "icon16.png")
Generate-Icon -Size 48 -OutputPath (Join-Path $iconsDir "icon48.png")
Generate-Icon -Size 128 -OutputPath (Join-Path $iconsDir "icon128.png")

Write-Host "All icons generated successfully!"
