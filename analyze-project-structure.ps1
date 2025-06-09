$projectRoot = "C:\Users\Bobi\Desktop\solar-review-brasil\solar-review-brasil"
$outputFile = Join-Path $projectRoot "project-structure.md"

# Initialize the markdown file
@"
# Solar Review Brasil - Project Structure
Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm")

## Project Overview

This document provides a detailed overview of the project structure and contents.

"@ | Set-Content $outputFile

# Function to get relative path
function Get-RelativePath {
    param($path)
    return $path.Replace($projectRoot, '').TrimStart('\')
}

# Function to analyze TypeScript/JavaScript file
function Analyze-CodeFile {
    param($filePath)
    
    $content = Get-Content $filePath -Raw
    $analysis = @{
        imports = @()
        exports = @()
        isClientComponent = $false
        hasRouter = $false
        hasAPI = $false
    }
    
    # Check for 'use client'
    if ($content -match "'use client'|`"use client`"") {
        $analysis.isClientComponent = $true
    }
    
    # Find imports
    $imports = [regex]::Matches($content, "import\s+(?:{[^}]*}|\w+)\s+from\s+['`"]([^'`"]*)['`"]")
    $analysis.imports = $imports | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    
    # Find exports
    $exports = [regex]::Matches($content, "export\s+(?:default\s+)?(?:function|const|class|interface|type)\s+(\w+)")
    $analysis.exports = $exports | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
    
    # Check for router usage
    if ($content -match "useRouter|next/router|next/navigation") {
        $analysis.hasRouter = $true
    }
    
    # Check for API calls
    if ($content -match "fetch\(|axios\.|api\.") {
        $analysis.hasAPI = $true
    }
    
    return $analysis
}

# Function to process directory
function Process-Directory {
    param(
        $dir,
        $level = 0
    )
    
    $indent = "  " * $level
    $relativePath = Get-RelativePath $dir.FullName
    
    # Add directory to markdown
    if ($level -eq 0) {
        Add-Content $outputFile "`n## Directory Structure`n"
    }
    
    Add-Content $outputFile "$indent- 📂 $($dir.Name)"
    
    # Process all files in the directory
    Get-ChildItem $dir.FullName -File | Where-Object {
        $_.Name -notmatch "(^\.|package-lock\.json|yarn\.lock)$"
    } | ForEach-Object {
        $fileRelativePath = Get-RelativePath $_.FullName
        $fileIcon = switch ($_.Extension) {
            ".tsx" { "⚛️" }
            ".ts" { "📜" }
            ".js" { "📜" }
            ".json" { "🔧" }
            ".md" { "📝" }
            ".css" { "🎨" }
            ".scss" { "🎨" }
            default { "📄" }
        }
        
        Add-Content $outputFile "$indent  - $fileIcon $($_.Name)"
        
        # Analyze code files
        if ($_.Extension -in ".tsx", ".ts", ".js") {
            $analysis = Analyze-CodeFile $_.FullName
            
            # Add file analysis to documentation
            if ($analysis.isClientComponent -or 
                $analysis.hasRouter -or 
                $analysis.hasAPI -or 
                $analysis.exports.Count -gt 0) {
                
                Add-Content $outputFile "$indent    <details>"
                Add-Content $outputFile "$indent    <summary>Details</summary>`n"
                
                if ($analysis.isClientComponent) {
                    Add-Content $outputFile "$indent    - 🔵 Client Component"
                }
                
                if ($analysis.exports.Count -gt 0) {
                    Add-Content $outputFile "$indent    - Exports:"
                    $analysis.exports | ForEach-Object {
                        Add-Content $outputFile "$indent      - $_"
                    }
                }
                
                if ($analysis.hasRouter) {
                    Add-Content $outputFile "$indent    - 🔄 Uses Router"
                }
                
                if ($analysis.hasAPI) {
                    Add-Content $outputFile "$indent    - 🔌 Contains API calls"
                }
                
                if ($analysis.imports.Count -gt 0) {
                    Add-Content $outputFile "$indent    - Dependencies:"
                    $analysis.imports | ForEach-Object {
                        Add-Content $outputFile "$indent      - $_"
                    }
                }
                
                Add-Content $outputFile "$indent    </details>`n"
            }
        }
    }
    
    # Process subdirectories
    Get-ChildItem $dir.FullName -Directory | Where-Object {
        $_.Name -notmatch "(^\.|\bnode_modules\b|\b\.next\b|\bcoverage\b|\bdist\b|\bbuild\b)$"
    } | ForEach-Object {
        Process-Directory $_ ($level + 1)
    }
}

# Process package.json
$packageJsonPath = Join-Path $projectRoot "package.json"
if (Test-Path $packageJsonPath) {
    $packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
    
    @"

## Dependencies

### Production Dependencies
| Package | Version |
|---------|---------|
"@ | Add-Content $outputFile
    
    $packageJson.dependencies.PSObject.Properties | ForEach-Object {
        "| $($_.Name) | $($_.Value) |" | Add-Content $outputFile
    }
    
    @"

### Development Dependencies
| Package | Version |
|---------|---------|
"@ | Add-Content $outputFile
    
    $packageJson.devDependencies.PSObject.Properties | ForEach-Object {
        "| $($_.Name) | $($_.Value) |" | Add-Content $outputFile
    }
}

# Start processing from root
$rootDir = Get-Item $projectRoot
Process-Directory $rootDir

# Add project statistics
@"

## Project Statistics

"@ | Add-Content $outputFile

$stats = @{
    TotalFiles = 0
    Components = 0
    Pages = 0
    ApiRoutes = 0
    ClientComponents = 0
    ServerComponents = 0
}

Get-ChildItem $projectRoot -Recurse -File | Where-Object {
    $_.FullName -notmatch "(^\.|\bnode_modules\b|\b\.next\b|\bcoverage\b|\bdist\b|\bbuild\b)"
} | ForEach-Object {
    $stats.TotalFiles++
    
    if ($_.Extension -in ".tsx", ".ts", ".js") {
        $analysis = Analyze-CodeFile $_.FullName
        
        if ($_.FullName -match "\\pages\\") {
            $stats.Pages++
        } elseif ($_.FullName -match "\\components\\") {
            $stats.Components++
        } elseif ($_.FullName -match "\\api\\") {
            $stats.ApiRoutes++
        }
        
        if ($analysis.isClientComponent) {
            $stats.ClientComponents++
        } else {
            $stats.ServerComponents++
        }
    }
}

@"
- Total Files: $($stats.TotalFiles)
- Components: $($stats.Components)
- Pages: $($stats.Pages)
- API Routes: $($stats.ApiRoutes)
- Client Components: $($stats.ClientComponents)
- Server Components: $($stats.ServerComponents)
"@ | Add-Content $outputFile

Write-Host "Project structure analysis complete. See $outputFile for results."