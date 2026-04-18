$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)
npx tsx scripts/discover-local.ts; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx tsx scripts/discover-sports-local.ts; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx tsx scripts/match-new-local.ts; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx tsx scripts/sync-active-local.ts; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
npx tsx scripts/cleanup-markets.ts; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "daily-routine OK"
