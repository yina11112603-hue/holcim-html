$env:PATH = 'C:\Program Files\nodejs\;' + $env:PATH
Set-Location 'E:\工作\De-AirTech\Company Info\上海艾霆介绍\2026 改版\Holcim-HTML'
git add .
git commit -m "update"
git push
npx wrangler pages deploy . --project-name=holcim-html --commit-dirty=true
Write-Host 'Done: https://holcim-html.pages.dev'
