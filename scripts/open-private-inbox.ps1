# Run locally as the Windows account that created the encrypted key. Never paste the key into chat.
$ErrorActionPreference = 'Stop'
$slickkKeyPath = Join-Path $PSScriptRoot '..\.wrangler\v4-admin-token.clixml'
if (-not (Test-Path -LiteralPath $slickkKeyPath)) { throw 'Encrypted inbox key missing. Configure a new Cloudflare LEADS_ADMIN_TOKEN through the owner account.' }
$slickkSecure = Import-Clixml -LiteralPath $slickkKeyPath
$slickkPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($slickkSecure)
try {
    Set-Clipboard -Value ([Runtime.InteropServices.Marshal]::PtrToStringBSTR($slickkPointer))
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($slickkPointer)
}
Write-Output 'Inbox key copied to your clipboard. Paste it into the private inbox, then clear the clipboard and session when finished.'
Start-Process 'https://slickk.online/internal-leads/'
