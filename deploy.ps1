$env:PATH = 'C:\Program Files\nodejs\;' + $env:PATH
git add .
git commit -m "update"
git push
npx wrangler pages deploy . --project-name=holcim-html --commit-dirty=true
Write-Host 'Done: https://holcim-html.pages.dev'
