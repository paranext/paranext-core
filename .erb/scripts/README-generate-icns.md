# Icon Generator Script for Electron Apps

This script (`generate-icns.sh`) automatically converts high-resolution PNG icon exports into `.icns` files suitable for Electron applications on macOS.

## Features

- **Auto-detects naming patterns**: Works with both `paratext-studio-*` and `platform-bible-*` naming conventions
- **Multiple theme support**: Processes all available themes (Default, Dark, Light, ClearDark, ClearLight, TintedDark, TintedLight)
- **Complete icon generation**: Creates all required sizes from 16x16 to 1024x1024 pixels
- **macOS-native tools**: Expects exports from [Apple Icon Composer](https://developer.apple.com/icon-composer/) and uses `sips` and `iconutil` for optimal quality

## Usage

Run the script from the paranext-core repository root:

```bash
# Basic usage with default paths (looks for ./icon-exports, outputs to ./assets)
./.erb/scripts/generate-icns.sh

# Specify custom source and target directories
./.erb/scripts/generate-icns.sh /path/to/icon-exports ./assets

# Examples
./.erb/scripts/generate-icns.sh ./icon-exports ./assets
./.erb/scripts/generate-icns.sh /Users/merc/tmp/platform-bible-icon-composer-exports ./assets
```

## Supported Input Patterns

The script automatically detects and processes these naming patterns from [Icon Composer.app](https://developer.apple.com/icon-composer/) > **Export All Variants**:

### macOS Icons (preferred)

- `paratext-studio-v0-macOS-Default-1024x1024@2x.png`
- `platform-bible-macOS-Default-1024x1024@2x.png`
- Generic `*-macOS-*.png` patterns

### iOS Icons (fallback)

- `paratext-studio-v0-iOS-Default-1024x1024@2x.png`
- `platform-bible-iOS-Default-1024x1024@2x.png`
- Generic `*-iOS-*.png` patterns

## Output

For each theme found, the script generates:

- `icon-default.icns`
- `icon-dark.icns`
- `icon-clearlight.icns`
- `icon-cleardark.icns`
- `icon-tintedlight.icns`
- `icon-tinteddark.icns`

## Using in Electron

### Option 1: Rename the desired theme

```bash
# Use the default theme
mv ./assets/icon-default.icns ./assets/icon.icns
```

### Option 2: Configure electron-builder

Update your `electron-builder.json5` or `package.json`:

```json5
{
  mac: {
    icon: 'assets/icon-default.icns',
  },
}
```

## Requirements

- macOS (for `sips` and `iconutil` commands)
- Bash shell
- Source PNG files at 1024x1024@2x (2048x2048 actual pixels) or higher
- Run from the paranext-core repository root directory

## Icon Sizes Generated

The script creates the following icon sizes as required by macOS:

- 16x16 (`icon_16x16.png`)
- 32x32 (`icon_16x16@2x.png`, `icon_32x32.png`)
- 64x64 (`icon_32x32@2x.png`)
- 128x128 (`icon_128x128.png`)
- 256x256 (`icon_128x128@2x.png`, `icon_256x256.png`)
- 512x512 (`icon_256x256@2x.png`, `icon_512x512.png`)
- 1024x1024 (`icon_512x512@2x.png`)

## Troubleshooting

### "No suitable icon files found"

Ensure your PNG files follow one of the supported naming patterns and are in the specified source directory.

### "Command not found: sips" or "Command not found: iconutil"

These are macOS-specific tools. This script only works on macOS.

### Poor icon quality at small sizes

Ensure your source PNG files are high-resolution (at least 1024x1024, preferably 2048x2048 for @2x files).
