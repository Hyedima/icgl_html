$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.Drawing

$docsPath = $PSScriptRoot
$rootPath = Split-Path -Parent $docsPath
$packagePath = Join-Path $docsPath '_word-report-package'
$outputPath = Join-Path $docsPath 'ICGL-Website-Stakeholder-Report.docx'
$script:body = New-Object System.Text.StringBuilder
$script:relationships = New-Object System.Text.StringBuilder
$script:media = New-Object System.Collections.Generic.List[string]
$script:imageIndex = 0
$script:paragraphIndex = 0

function ConvertTo-XmlText([string]$Text) {
  return [System.Security.SecurityElement]::Escape($Text)
}

function Add-Paragraph([string]$Text, [string]$Style = 'Normal', [switch]$Center, [switch]$PageBreak) {
  $safeText = ConvertTo-XmlText $Text
  $styleXml = switch ($Style) {
    'Title' { '<w:pStyle w:val="Title"/>' }
    'Subtitle' { '<w:pStyle w:val="Subtitle"/>' }
    'Heading1' { '<w:pStyle w:val="Heading1"/>' }
    'Heading2' { '<w:pStyle w:val="Heading2"/>' }
    'Heading3' { '<w:pStyle w:val="Heading3"/>' }
    'Code' { '<w:pStyle w:val="Code"/>' }
    default { '<w:pStyle w:val="Normal"/>' }
  }
  $alignXml = if ($Center) { '<w:jc w:val="center"/>' } else { '' }
  $breakXml = if ($PageBreak) { '<w:pageBreakBefore/>' } else { '' }
  [void]$script:body.Append("<w:p><w:pPr>$styleXml$alignXml$breakXml</w:pPr><w:r><w:t xml:space=`"preserve`">$safeText</w:t></w:r></w:p>")
}

function Add-Image([string]$ImagePath, [string]$Caption) {
  if (-not (Test-Path $ImagePath)) {
    Add-Paragraph "Screenshot unavailable: $Caption" 'Normal'
    return
  }

  $script:imageIndex += 1
  $fileName = "image$($script:imageIndex)$([IO.Path]::GetExtension($ImagePath))"
  $mediaPath = Join-Path $packagePath "word\media\$fileName"
  Copy-Item -LiteralPath $ImagePath -Destination $mediaPath
  $script:media.Add([IO.Path]::GetExtension($ImagePath).TrimStart('.').ToLowerInvariant())
  $relationshipId = "rId$($script:imageIndex)"
  [void]$script:relationships.Append("<Relationship Id=`"$relationshipId`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/image`" Target=`"media/$fileName`"/>")

  $image = [System.Drawing.Image]::FromFile($ImagePath)
  $cx = 5486400
  $cy = [long]($cx * $image.Height / $image.Width)
  $image.Dispose()
  $script:paragraphIndex += 1
  $drawing = @"
<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="$cx" cy="$cy"/><wp:docPr id="$($script:paragraphIndex)" name="Screenshot $($script:imageIndex)"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="$($script:paragraphIndex)" name="$fileName"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="$relationshipId"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="$cx" cy="$cy"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>
"@
  [void]$script:body.Append($drawing)
  Add-Paragraph $Caption 'Caption' -Center
}

function Convert-InlineText([string]$Text) {
  $value = $Text -replace '`([^`]*)`', '$1'
  $value = $value -replace '\*\*([^*]+)\*\*', '$1'
  $value = $value -replace '\*([^*]+)\*', '$1'
  $value = $value -replace '\[([^\]]+)\]\(([^)]+)\)', '$1'
  return $value
}

function Add-Table([System.Collections.ArrayList]$Rows) {
  if ($Rows.Count -lt 2) { return }
  $columnCount = $Rows[0].Count
  [void]$script:body.Append('<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/><w:tblLayout w:type="autofit"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="A9D046"/><w:left w:val="single" w:sz="4" w:color="B9C3B0"/><w:bottom w:val="single" w:sz="4" w:color="B9C3B0"/><w:right w:val="single" w:sz="4" w:color="B9C3B0"/><w:insideH w:val="single" w:sz="4" w:color="B9C3B0"/><w:insideV w:val="single" w:sz="4" w:color="B9C3B0"/></w:tblBorders></w:tblPr><w:tblGrid>')
  for ($column = 0; $column -lt $columnCount; $column++) {
    [void]$script:body.Append('<w:gridCol w:w="2200"/>')
  }
  [void]$script:body.Append('</w:tblGrid>')

  for ($rowIndex = 0; $rowIndex -lt $Rows.Count; $rowIndex++) {
    [void]$script:body.Append('<w:tr>')
    for ($column = 0; $column -lt $columnCount; $column++) {
      $cellText = if ($column -lt $Rows[$rowIndex].Count) { Convert-InlineText $Rows[$rowIndex][$column] } else { '' }
      $safeText = ConvertTo-XmlText $cellText
      $shade = if ($rowIndex -eq 0) { '<w:shd w:fill="E3EED2"/>' } else { '' }
      $bold = if ($rowIndex -eq 0) { '<w:b/>' } else { '' }
      [void]$script:body.Append("<w:tc><w:tcPr>$shade<w:tcMar><w:top w:w=`"60`" w:type=`"dxa`"/><w:bottom w:w=`"60`" w:type=`"dxa`"/><w:start w:w=`"75`" w:type=`"dxa`"/><w:end w:w=`"75`" w:type=`"dxa`"/></w:tcMar></w:tcPr><w:p><w:pPr><w:pStyle w:val=`"TableText`"/></w:pPr><w:r><w:rPr>$bold</w:rPr><w:t xml:space=`"preserve`">$safeText</w:t></w:r></w:p></w:tc>")
    }
    [void]$script:body.Append('</w:tr>')
  }
  [void]$script:body.Append('</w:tbl>')
}

function Add-MarkdownDocument([string]$FileName) {
  $lines = [IO.File]::ReadAllLines((Join-Path $docsPath $FileName))
  $paragraph = New-Object System.Collections.Generic.List[string]
  $tableRows = New-Object System.Collections.ArrayList
  $inCode = $false
  $skipDiagram = $false

  foreach ($line in $lines) {
    if ($line -match '^```') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      if (-not $inCode) {
        $inCode = $true
        $skipDiagram = $line -match '^```mermaid'
        if ($skipDiagram) {
          Add-Paragraph 'System interaction flow' 'Heading3'
          Add-Paragraph 'Visitor -> Browser -> Static host -> React SPA -> Shared layout/router -> Route page' 'Normal'
          Add-Paragraph 'Connected services: bundled content/assets; browser storage for preferences; Google Maps; visitor email application; external organisation/social links.' 'Normal'
        } else {
          Add-Paragraph 'Code / configuration excerpt:' 'Normal'
        }
      } else {
        $inCode = $false
        $skipDiagram = $false
      }
      continue
    }
    if ($inCode) {
      if (-not $skipDiagram) { Add-Paragraph $line 'Code' }
      continue
    }

    if ($line -match '^\s*\|') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      $value = $line.Trim().Trim('|')
      $cells = @($value.Split('|') | ForEach-Object { $_.Trim() })
      $separator = $true
      foreach ($cell in $cells) {
        if ($cell -notmatch '^:?-{3,}:?$') { $separator = $false }
      }
      if (-not $separator) { [void]$tableRows.Add($cells) }
      continue
    } elseif ($tableRows.Count -gt 0) {
      Add-Table $tableRows
      $tableRows.Clear()
    }

    if ($line -match '^!\[([^\]]*)\]\(([^)]+)\)\s*$') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      $relativeImage = $Matches[2] -replace '^\./', ''
      Add-Image (Join-Path $docsPath $relativeImage) $Matches[1]
      continue
    }

    if ([string]::IsNullOrWhiteSpace($line)) {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      continue
    }

    if ($line -match '^(#{1,4})\s+(.*)$') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      $level = $Matches[1].Length
      $heading = Convert-InlineText $Matches[2]
      if ($level -eq 1) { Add-Paragraph $heading 'Heading1' }
      elseif ($level -eq 2) { Add-Paragraph $heading 'Heading2' }
      else { Add-Paragraph $heading 'Heading3' }
      continue
    }

    if ($line -match '^\s*[-*+]\s+') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      Add-Paragraph ('•  ' + (Convert-InlineText ($line -replace '^\s*[-*+]\s+', '')))
      continue
    }
    if ($line -match '^\s*\d+\.\s+') {
      if ($paragraph.Count -gt 0) {
        Add-Paragraph (Convert-InlineText ($paragraph -join ' '))
        $paragraph.Clear()
      }
      Add-Paragraph (Convert-InlineText $line)
      continue
    }
    $paragraph.Add($line.Trim())
  }

  if ($paragraph.Count -gt 0) { Add-Paragraph (Convert-InlineText ($paragraph -join ' ')) }
  if ($tableRows.Count -gt 0) { Add-Table $tableRows }
}

if (Test-Path $packagePath) {
  throw "Generated package folder already exists; inspect and remove it before retrying: $packagePath"
}
New-Item -ItemType Directory -Path (Join-Path $packagePath 'word\_rels') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $packagePath 'word\media') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $packagePath '_rels') -Force | Out-Null

Add-Paragraph 'IMPACT CREDIT GUARANTEE LIMITED' 'Subtitle' -Center
Add-Paragraph 'ICGL Website' 'Title' -Center
Add-Paragraph 'System Architecture, Quality Assurance & User Acceptance Report' 'Subtitle' -Center
Add-Paragraph 'Prepared for stakeholder review' 'Heading2' -Center
Add-Paragraph 'Documentation baseline: 28 September 2026' 'Normal' -Center
Add-Paragraph 'System: Impact Credit Guarantee Limited public website' 'Normal' -Center
Add-Paragraph 'STATUS: IMPLEMENTATION AND LOCAL TEST EVIDENCE' 'Heading2' -Center
Add-Paragraph 'This report describes the repository implementation and local checks. It is not production certification, completed business UAT, or an accessibility conformance statement.' 'Normal' -Center
Add-Paragraph 'Contents' 'Heading1' -PageBreak
Add-Paragraph '1. Executive summary'
Add-Paragraph '2. System architecture'
Add-Paragraph '3. Software quality assurance'
Add-Paragraph '4. User acceptance testing plan'
Add-Paragraph '5. Test evidence and screenshots'
Add-Paragraph '6. Operations and release guide'
Add-Paragraph '7. Open decisions and production readiness'
Add-Paragraph '8. Source documentation register'

Add-Paragraph '1. Executive summary' 'Heading1' -PageBreak
Add-Paragraph 'The ICGL website is a client-rendered React single-page application (SPA) built with Vite, Tailwind CSS and React Router. It provides public information across 15 primary routes, including organisation and service information, impact reporting, eligibility, careers, contact and resource pages. Most content is source-controlled local data and static assets; the repository contains no application API, database, authentication or server-side form handler.'
Add-Paragraph 'The local production build passed and browser smoke checks rendered all 15 sampled routes. The News keyword sample returned three stories for MSME; the Publications sample returned one 2025 Annual Report. Formal business UAT, complete accessibility/cross-browser testing and production deployment checks remain pending.'
Add-Paragraph 'Stakeholder attention is required for form submission semantics, publication download targets, policy document mapping, consent-script gating, and bundle-size optimization.'

Add-MarkdownDocument 'architecture.md'
Add-MarkdownDocument 'quality-assurance.md'
Add-MarkdownDocument 'uat.md'
Add-MarkdownDocument 'test-evidence.md'
Add-MarkdownDocument 'operations.md'

Add-Paragraph '7. Open decisions and production readiness' 'Heading1' -PageBreak
Add-Paragraph 'Resolve or formally accept these implementation boundaries before production reliance:'
Add-Paragraph 'Contact form: local success state only; no server-side delivery is configured.'
Add-Paragraph 'Complaints form: mailto handoff; the visitor must send email and the site receives no delivery acknowledgement.'
Add-Paragraph 'Publications: Download affordances currently have no wired publication target.'
Add-Paragraph 'Whistleblowing policy: currently uses the Anti-Bribery & Corruption PDF; obtain policy-owner confirmation or supply the approved Whistleblowing document.'
Add-Paragraph 'Cookie preferences: localStorage stores choices; optional categories do not gate tracking scripts in this repository.'
Add-Paragraph 'Quality automation: no unit, integration, lint, type-check or end-to-end test runner is configured.'
Add-Paragraph 'Performance: build succeeds with a Vite advisory for a minified JavaScript chunk over 500 kB.'
Add-Paragraph 'Acceptance recommendation: complete P0 QA/UAT, approve content and policy mapping, confirm form/download behavior, and sign off responsive/accessibility testing before declaring release acceptance.'
Add-Paragraph '8. Source documentation register' 'Heading1' -PageBreak
foreach ($file in @('README.md', 'architecture.md', 'quality-assurance.md', 'uat.md', 'test-evidence.md', 'operations.md')) {
  Add-Paragraph "docs/$file"
}

$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
 <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="20"/><w:color w:val="333A42"/></w:rPr><w:pPr><w:spacing w:after="120"/></w:pPr></w:style>
 <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="60"/><w:color w:val="333A42"/></w:rPr><w:pPr><w:spacing w:after="260"/></w:pPr></w:style>
 <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="30"/><w:color w:val="397A38"/></w:rPr><w:pPr><w:spacing w:after="180"/></w:pPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="140"/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="5" w:color="A9D046"/></w:pBdr></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="38"/><w:color w:val="333A42"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="200" w:after="100"/></w:pPr><w:rPr><w:rFonts w:ascii="Aptos Display" w:hAnsi="Aptos Display"/><w:b/><w:sz w:val="28"/><w:color w:val="397A38"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="140" w:after="80"/></w:pPr><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="333A42"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="caption"/><w:basedOn w:val="Normal"/><w:rPr><w:i/><w:sz w:val="18"/><w:color w:val="5B6973"/></w:rPr><w:pPr><w:jc w:val="center"/><w:spacing w:after="180"/></w:pPr></w:style>
 <w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="16"/></w:rPr></w:style>
 <w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table Text"/><w:basedOn w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="15"/></w:rPr><w:pPr><w:spacing w:after="0"/></w:pPr></w:style>
</w:styles>
'@
$document = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>$($script:body.ToString())<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="900" w:right="900" w:bottom="900" w:left="900" w:header="450" w:footer="450" w:gutter="0"/></w:sectPr></w:body></w:document>
"@
$documentRels = "<Relationships xmlns=`"http://schemas.openxmlformats.org/package/2006/relationships`"><Relationship Id=`"rIdStyles`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles`" Target=`"styles.xml`"/>$($script:relationships.ToString())</Relationships>"
$rootRels = '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
$contentTypes = New-Object System.Text.StringBuilder
[void]$contentTypes.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>')
foreach ($extension in ($script:media | Select-Object -Unique)) {
  $mime = if ($extension -eq 'jpg' -or $extension -eq 'jpeg') { 'image/jpeg' } else { 'image/png' }
  [void]$contentTypes.Append("<Default Extension=`"$extension`" ContentType=`"$mime`"/>")
}
[void]$contentTypes.Append('</Types>')

[IO.File]::WriteAllText((Join-Path $packagePath '[Content_Types].xml'), $contentTypes.ToString(), [Text.Encoding]::UTF8)
[IO.File]::WriteAllText((Join-Path $packagePath '_rels\.rels'), $rootRels, [Text.Encoding]::UTF8)
[IO.File]::WriteAllText((Join-Path $packagePath 'word\document.xml'), $document, [Text.Encoding]::UTF8)
[IO.File]::WriteAllText((Join-Path $packagePath 'word\styles.xml'), $styles, [Text.Encoding]::UTF8)
[IO.File]::WriteAllText((Join-Path $packagePath 'word\_rels\document.xml.rels'), $documentRels, [Text.Encoding]::UTF8)

if (Test-Path $outputPath) { Remove-Item -LiteralPath $outputPath -Force }
$fileStream = [IO.File]::Open($outputPath, [IO.FileMode]::CreateNew)
$zipArchive = New-Object System.IO.Compression.ZipArchive($fileStream, [IO.Compression.ZipArchiveMode]::Create)
try {
  Get-ChildItem -LiteralPath $packagePath -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($packagePath.Length).TrimStart('\').Replace('\', '/')
    $entry = $zipArchive.CreateEntry($relativePath, [IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    try {
      $sourceStream = [IO.File]::OpenRead($_.FullName)
      try { $sourceStream.CopyTo($entryStream) } finally { $sourceStream.Dispose() }
    } finally {
      $entryStream.Dispose()
    }
  }
} finally {
  $zipArchive.Dispose()
  $fileStream.Dispose()
}
Remove-Item -LiteralPath $packagePath -Recurse -Force

$archive = [IO.Compression.ZipFile]::OpenRead($outputPath)
try {
  $embeddedImages = @($archive.Entries | Where-Object { $_.FullName -like 'word/media/*' })
  if (-not $archive.GetEntry('word/document.xml') -or $embeddedImages.Count -lt 6) {
    throw "DOCX validation failed. Embedded images found: $($embeddedImages.Count)"
  }
  Write-Output "Created and validated $outputPath"
  Write-Output "Embedded screenshots: $($embeddedImages.Count)"
} finally {
  $archive.Dispose()
}

Get-Item $outputPath | Select-Object FullName, Length | Format-List
