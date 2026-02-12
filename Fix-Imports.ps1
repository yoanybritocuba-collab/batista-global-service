function Fix-ProjectImports {
    param([string]$Path = ".")

    Write-Host "`n🔧 CORRECTOR DE IMPORTS AUTOMÁTICO" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════" -ForegroundColor Cyan

    # Mapeo de correcciones comunes
    $correctionMap = @{
        # Importaciones de componentes
        "from '../../components/Header/Header'" = "from '@/components/layout/Header'"
        "from '../../components/Footer/Footer'" = "from '@/components/layout/Footer'"
        "from '../../components/Layout/Header'" = "from '@/components/layout/Header'"
        "from '../../components/Layout/Footer'" = "from '@/components/layout/Footer'"
        
        # Importaciones de admin
        "from '../../components/Admin/AdminProductManager'" = "from '@/components/admin/AdminProductManager'"
        "from '../../components/Admin/AdminServicesManager'" = "from '@/components/admin/AdminServicesManager'"
        
        # Importaciones de ecommerce
        "from '../../components/Tienda/ProductCard'" = "from '@/components/ecommerce/ProductCard'"
        "from '../../components/Tienda/ProductGrid'" = "from '@/components/ecommerce/ProductGrid'"
        "from '../../components/Carrito/CartIcon'" = "from '@/components/ecommerce/CartIcon'"
        
        # Importaciones de contextos
        "from '../../context/CartContext'" = "from '@/contexts/cart/CartContext'"
        "from '../../context/AuthContext'" = "from '@/contexts/auth/AuthContext'"
        
        # Importaciones de firebase
        "from '../../firebase/firestore'" = "from '@/services/firebase/firestore'"
        "from '../../firebase/auth'" = "from '@/services/firebase/auth'"
        
        # Importaciones de hooks
        "from '../../hooks/useProducts'" = "from '@/hooks/ecommerce/useProducts'"
        "from '../../hooks/useSearch'" = "from '@/hooks/ecommerce/useSearch'"
        
        # Importaciones de i18n
        "from '../../i18n'" = "from '@/i18n/config'"
        
        # Importaciones relativas a absolutas
        "from '../../../" = "from '@/"
        "from '../../" = "from '@/"
    }

    $fixedCount = 0
    $jsxFiles = Get-ChildItem -Path $Path -Recurse -Filter "*.jsx" -ErrorAction SilentlyContinue
    $jsFiles = Get-ChildItem -Path $Path -Recurse -Filter "*.js" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch 'node_modules' }

    $allFiles = $jsxFiles + $jsFiles

    foreach ($file in $allFiles) {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content
        $hasChanges = $false

        foreach ($correction in $correctionMap.GetEnumerator()) {
            if ($content -match $correction.Key) {
                $content = $content -replace $correction.Key, $correction.Value
                $hasChanges = $true
            }
        }

        if ($hasChanges) {
            $content | Out-File -FilePath $file.FullName -Encoding UTF8
            $fixedCount++
            Write-Host "✅ Corregido: $($file.Name)" -ForegroundColor Green
        }
    }

    Write-Host "`n📊 RESUMEN:" -ForegroundColor Cyan
    Write-Host "   Archivos corregidos: $fixedCount" -ForegroundColor Green
    Write-Host "`n🎯 PRÓXIMO: Actualizar App.jsx principal" -ForegroundColor Yellow
}

Fix-ProjectImports
