function Test-ProjectSetup {
    Write-Host "`n🔍 VERIFICACIÓN FINAL DEL PROYECTO" -ForegroundColor Cyan
    Write-Host "══════════════════════════════════" -ForegroundColor Cyan
    
    $checks = @(
        @{ Name = "✅ package.json existe"; Test = { Test-Path "package.json" } },
        @{ Name = "✅ src/App.jsx existe"; Test = { Test-Path "src/App.jsx" } },
        @{ Name = "✅ src/app/routes.jsx existe"; Test = { Test-Path "src/app/routes.jsx" } },
        @{ Name = "✅ Estructura de componentes"; Test = { Test-Path "src/components/ecommerce" -and Test-Path "src/components/admin" } },
        @{ Name = "✅ Firebase configurado"; Test = { Test-Path "src/services/firebase" } },
        @{ Name = "✅ Contextos creados"; Test = { Test-Path "src/contexts" -and (Get-ChildItem "src/contexts" -Recurse -Filter "*.jsx" | Measure-Object).Count -gt 0 } },
        @{ Name = "✅ i18n configurado"; Test = { Test-Path "src/i18n" } }
    )
    
    $passed = 0
    $failed = 0
    
    foreach ($check in $checks) {
        if (& $check.Test) {
            Write-Host $check.Name -ForegroundColor Green
            $passed++
        } else {
            Write-Host "❌ $($check.Name.Replace('✅ ', ''))" -ForegroundColor Red
            $failed++
        }
    }
    
    Write-Host "`n📊 RESULTADO:" -ForegroundColor Cyan
    Write-Host "   Pruebas pasadas: $passed" -ForegroundColor Green
    Write-Host "   Pruebas falladas: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
    
    if ($failed -eq 0) {
        Write-Host "`n🎉 ¡PROYECTO LISTO PARA DESARROLLO!" -ForegroundColor Green
        Write-Host "`n🚀 Puedes ejecutar:" -ForegroundColor Yellow
        Write-Host "   npm start          # Iniciar servidor desarrollo"
        Write-Host "   npm run build      # Crear build de producción"
        Write-Host "`n📁 Estructura organizada para:" -ForegroundColor Cyan
        Write-Host "   • E-commerce profesional"
        Write-Host "   • Panel admin completo"
        Write-Host "   • Multiidioma escalable"
        Write-Host "   • Servicios turísticos"
    } else {
        Write-Host "`n⚠️  Hay problemas por resolver antes de continuar" -ForegroundColor Yellow
    }
}

Test-ProjectSetup
