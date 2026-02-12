# Verificador rápido de imports
Get-ChildItem -Path "src" -Recurse -Filter "*.jsx" | ForEach-Object {
    $firstLine = Get-Content $_ -First 1
    if ($firstLine -match "^mport") {
        Write-Host "❌ $($_.Name) tiene 'mport'" -ForegroundColor Red
    }
}
