# run-backlog.ps1
# Corre el match-backlog endpoint en loop hasta procesar todos los markets
# Uso: .\scripts\run-backlog.ps1
# Uso con start offset: .\scripts\run-backlog.ps1 -StartOffset 500

param(
    [int]$StartOffset = 0,
    [int]$BatchSize = 20,
    [string]$BaseUrl = "http://localhost:3000"
)

$offset = $StartOffset
$totalProcessed = 0
$totalMatches = 0
$totalPairs = 0
$batchNum = 0
$startTime = Get-Date

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MarketEdge - Match Backlog Runner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Start offset : $StartOffset"
Write-Host "Batch size   : $BatchSize"
Write-Host "Target URL   : $BaseUrl"
Write-Host "Started at   : $startTime"
Write-Host ""

while ($true) {
    $batchNum++
    $elapsed = (Get-Date) - $startTime
    $elapsedStr = "{0:hh\:mm\:ss}" -f $elapsed

    Write-Host "[$elapsedStr] Batch $batchNum - offset $offset..." -ForegroundColor Yellow

    $body = @{
        offset    = $offset
        batchSize = $BatchSize
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod `
            -Uri "$BaseUrl/api/admin/match-backlog" `
            -Method POST `
            -ContentType "application/json" `
            -Body $body `
            -TimeoutSec 360

        $totalProcessed += $response.processed
        $totalMatches   += $response.newMatches
        $totalPairs     += $response.pairsEvaluated

        Write-Host "  processed=$($response.processed)  pairs=$($response.pairsEvaluated)  matches=$($response.newMatches)  remaining=$($response.remaining)" -ForegroundColor Green

        if ($response.done -eq $true) {
            Write-Host ""
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "  BACKLOG COMPLETO" -ForegroundColor Green
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "Total processed : $totalProcessed"
            Write-Host "Total pairs     : $totalPairs"
            Write-Host "Total matches   : $totalMatches"
            Write-Host "Duration        : $elapsedStr"
            break
        }

        $offset = $response.offset_next

        # Pausa entre batches para no saturar la DB ni el servidor
        Start-Sleep -Seconds 2

    } catch {
        Write-Host "  ERROR en batch $batchNum : $_" -ForegroundColor Red
        Write-Host "  Reintentando en 15 segundos..." -ForegroundColor Yellow
        Start-Sleep -Seconds 15
        # No avanzar el offset — reintentar el mismo batch
    }
}