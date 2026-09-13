# ==============================================================================
# Nagarmitra / CivicSync - Automatic Git Push Watcher
# Automatically commits and pushes all workspace changes to GitHub in real-time
# ==============================================================================

Write-Host "`n🚀 CivicSync Auto-Push Watcher Started" -ForegroundColor Green
Write-Host "Monitoring workspace for changes every 5 seconds..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop.`n" -ForegroundColor Yellow

$checkInterval = 5
$debounceInterval = 3

while ($true) {
    try {
        # Check if remote 'origin' is configured
        $remotes = git remote
        if (-not ($remotes -contains "origin")) {
            Write-Host "[!] Remote 'origin' is not configured yet." -ForegroundColor Yellow
            Write-Host "    Run: git remote add origin https://github.com/<username>/<repo>.git" -ForegroundColor DarkGray
            Start-Sleep -Seconds 10
            continue
        }

        # Check for modified, added, or deleted files
        $status = git status --porcelain
        if ($status) {
            Write-Host "`n[+] Detected changes in repository:" -ForegroundColor Cyan
            $status | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkCyan }
            
            Write-Host "    Waiting $($debounceInterval)s for pending file writes to settle..." -ForegroundColor DarkGray
            Start-Sleep -Seconds $debounceInterval

            # Stage all changes
            git add -A

            # Create timestamped commit
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $commitMessage = "Auto-sync: update ($timestamp)"
            
            Write-Host "    Committing changes ($timestamp)..." -ForegroundColor Magenta
            git commit -m "$commitMessage"

            # Push to GitHub
            Write-Host "    Pushing to GitHub (origin main)..." -ForegroundColor Green
            $pushOutput = git push origin main 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✔ Successfully pushed to GitHub at $timestamp" -ForegroundColor Green
            } else {
                Write-Host "✖ Push failed: $pushOutput" -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Host "Error in watcher loop: $_" -ForegroundColor Red
    }

    Start-Sleep -Seconds $checkInterval
}
