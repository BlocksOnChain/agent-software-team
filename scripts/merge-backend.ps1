# Merge backend repository into this repo as a subtree, preserving history
# Usage: run from repository root in PowerShell: .\scripts\merge-backend.ps1

# Exit on error
$ErrorActionPreference = 'Stop'

Write-Host "Checking for uncommitted changes"
if (-not (git status --porcelain) -eq $false) {
    Write-Host "Please commit or stash changes before running this script." -ForegroundColor Yellow
    exit 1
}

Write-Host "Adding backend repo as remote 'backend-repo' (if not exists)"
$remoteExists = git remote | Select-String -Pattern "^backend-repo$"
if (-not $remoteExists) {
    git remote add backend-repo backend
} else {
    Write-Host "Remote 'backend-repo' already exists. Skipping add." -ForegroundColor Cyan
}

Write-Host "Fetching backend remote"
git fetch backend-repo

Write-Host "Creating merge commit that preserves both histories and places backend under 'backend/'"
# Make an empty merge commit that records the merge without changing files
git merge -s ours --allow-unrelated-histories --no-commit backend-repo/master

# Read tree of backend into prefix
git read-tree --prefix=backend/ -u backend-repo/master

# Commit the merge
git commit -m "Merge backend repository as subtree at backend/"

Write-Host "Removing nested backend/.git to avoid nested repo issues"
if (Test-Path -Path "backend/.git") {
    Remove-Item -Recurse -Force "backend/.git"
    Write-Host "Removed backend/.git"
} else {
    Write-Host "No nested backend/.git found."
}

Write-Host "Done. Verify the repository state, run tests, and push to remotes as needed." -ForegroundColor Green

Write-Host "Suggested next steps:"
Write-Host "1) Inspect the tree: git log --oneline --decorate --graph --all | more"
Write-Host "2) Run tests/build"
Write-Host "3) Push to your origin: git push origin master"
