# Turns a page of a reference site (Elementor/WordPress HTML) into flat,

# readable text with headings, list items, buttons and image URLs kept in
# document order.
#
# Why: the OneGPS site is a clone of the live onegps.africa WordPress site.
# The browser text-only view flattens accordions and skips headings, so the
# copy for a new page has to come from the page source. This script is the
# reproducible way to read that source.
#
# Usage:
#   powershell -File tools/extract-page-content.ps1 -Path https://onegps.africa/faq/ -Out $env:TEMP\faq.txt
#   powershell -File tools/extract-page-content.ps1 -Path $env:TEMP\onegps\faq.html
#
# Notes:
#   - Pass a URL or a local .html file. Local files are what the cached
#     downloads in $env:TEMP\onegps are for (see agents.md).
#   - Output is reference material only: rewrite the copy for OneGPS, do not
#     paste "Hitrace" into the Vue views.

param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [string]$Out
)

if ($Path -match '^https?://') {
    $html = (Invoke-WebRequest -Uri $Path -UseBasicParsing -TimeoutSec 60).Content
} else {
    $html = Get-Content $Path -Raw
}

# Drop everything that never renders.
$html = [regex]::Replace($html, '(?s)<script.*?</script>', '', 'Singleline')
$html = [regex]::Replace($html, '(?s)<style.*?</style>', '', 'Singleline')
$html = [regex]::Replace($html, '(?s)<noscript.*?</noscript>', '', 'Singleline')
$html = [regex]::Replace($html, '(?s)<head.*?</head>', '', 'Singleline')
$html = [regex]::Replace($html, '(?s)<!--.*?-->', '', 'Singleline')

# Block elements become their own lines, in the order they appear.
$blocks = @(
    @('<h1[^>]*>(.*?)</h1>', "`n`n# `$1`n"),
    @('<h2[^>]*>(.*?)</h2>', "`n`n## `$1`n"),
    @('<h3[^>]*>(.*?)</h3>', "`n`n### `$1`n"),
    @('<h4[^>]*>(.*?)</h4>', "`n`n#### `$1`n"),
    @('<h5[^>]*>(.*?)</h5>', "`n`n##### `$1`n"),
    @('<h6[^>]*>(.*?)</h6>', "`n`n###### `$1`n"),
    @('<li[^>]*>(.*?)</li>', "`n- `$1"),
    @('<button[^>]*>(.*?)</button>', "`n[button: `$1]"),
    @('<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>', "`n[image: `$1 (`$2)]"),
    @('<img[^>]*src="([^"]+)"[^>]*>', "`n[image: `$1]"),
    @('<img[^>]*alt="([^"]*)"[^>]*>', "`n[image: `$1]"),
    @('<p[^>]*>(.*?)</p>', "`n`$1`n"),
    @('<br\s*/?>', "`n")
)

foreach ($block in $blocks) {
    $html = [regex]::Replace($html, $block[0], $block[1], 'Singleline')
}

# Strip what is left of the markup and normalise whitespace.
$text = [regex]::Replace($html, '<[^>]+>', ' ')
$text = [System.Net.WebUtility]::HtmlDecode($text)
$text = [regex]::Replace($text, '[ \t\u00a0]+', ' ')
$text = [regex]::Replace($text, ' *(\r?\n) *', '$1')
$text = [regex]::Replace($text, '(\r?\n){3,}', "`n`n")
$text = $text.Trim()

if ($Out) {
    $text | Out-File -Encoding utf8 $Out
    "Wrote $Out ($($text.Length) chars)"
} else {
    $text
}
