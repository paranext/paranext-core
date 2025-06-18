#!/bin/bash

# Script to generate .icns files from icon exports for Electron app
# 
# MODES:
# 1. FULL PADDING MODE (requires Python PIL): Creates proper transparent padding (85% icon + 15% padding)
#    - Prevents "too large" appearance in macOS Dock
#    - Matches native macOS app icon appearance
#    - Install with: pip3 install Pillow
#
# 2. SIMPLE RESIZE MODE (fallback): Creates icons at exact dimensions without padding
#    - Icons may appear larger than native apps in Dock
#    - No external dependencies required
#    - Uses only built-in macOS tools
#
# This script automatically detects and processes icon files from different naming patterns:
# - paratext-studio-v0-macOS-*.png (original pattern)
# - platform-bible-macOS-*.png (new pattern) 
# - Generic *-macOS-*.png patterns
# - Falls back to iOS patterns if no macOS icons found
#
# Usage: ./.erb/scripts/generate-icns.sh [source_dir] [target_dir]
# Example: ./.erb/scripts/generate-icns.sh ./icon-exports ./assets
# Example: ./.erb/scripts/generate-icns.sh /path/to/platform-bible-icon-composer-exports ./assets
#
# Supported themes: Default, Dark, Light, ClearDark, ClearLight, TintedDark, TintedLight

set -e  # Exit on any error

# Get the repository root directory (two levels up from this script)
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Default directories (relative to repo root)
SOURCE_DIR="${1:-$REPO_ROOT/icon-exports}"
TARGET_DIR="${2:-$REPO_ROOT/assets}"

# Expand tilde in target directory
TARGET_DIR="${TARGET_DIR/#\~/$HOME}"

# Detect which mode we're running in
if python3 -c "from PIL import Image" 2>/dev/null; then
    MODE="FULL PADDING MODE"
    MODE_DESC="Using Python PIL for transparent padding (85% icon + 15% padding)"
else
    MODE="SIMPLE RESIZE MODE"
    MODE_DESC="Using sips-only fallback (full-size icons, may appear large in Dock)"
fi

echo "🎨 Generating .icns files from icon exports"
echo "📁 Source directory: $SOURCE_DIR"
echo "📁 Target directory: $TARGET_DIR"
echo "🔧 Mode: $MODE"
echo "📝 $MODE_DESC"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory '$SOURCE_DIR' does not exist"
    exit 1
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Function to create properly sized icons (use padding for larger sizes, full size for very small)
create_icon() {
    local source_file="$1"
    local target_size="$2"
    local output_file="$3"
    
    # For very small sizes (32 and below), use full size to maintain crisp appearance
    # For larger sizes, use 85% to provide visual padding (closer to native macOS icons)
    if [ $target_size -le 32 ]; then
        local icon_size=$target_size
    else
        local icon_size=$((target_size * 85 / 100))
    fi
    
    # Use Python PIL for best results with transparent padding, fallback to simple resize
    if python3 -c "from PIL import Image" 2>/dev/null; then
        # Python PIL is available - create proper transparent padding
        python3 -c "
import sys
from PIL import Image

# Open source image and resize
source = Image.open('$source_file').convert('RGBA')
resized = source.resize(($icon_size, $icon_size), Image.Resampling.LANCZOS)

if $icon_size == $target_size:
    # Full size - just resize
    resized.save('$output_file')
else:
    # Add padding - create transparent canvas and center the icon
    canvas = Image.new('RGBA', ($target_size, $target_size), (0, 0, 0, 0))
    offset = (($target_size - $icon_size) // 2, ($target_size - $icon_size) // 2)
    canvas.paste(resized, offset, resized)
    canvas.save('$output_file')
"
    else
        # Fallback: simple resize mode - always creates full-size icons (no actual padding)
        sips -z $target_size $target_size "$source_file" --out "$output_file" > /dev/null 2>&1
    fi
}

# Function to create iconset and convert to icns
create_icns() {
    local source_file="$1"
    local output_name="$2"
    local iconset_dir="${output_name}.iconset"
    
    echo "  📐 Creating iconset for $output_name with proper macOS padding..."
    
    # Create iconset directory
    mkdir -p "$iconset_dir"
    
    # Generate all required icon sizes with appropriate sizing for macOS
    echo "    🔹 Generating 16x16..."
    create_icon "$source_file" 16 "$iconset_dir/icon_16x16.png"
    
    echo "    🔹 Generating 32x32 (16x16@2x)..."
    create_icon "$source_file" 32 "$iconset_dir/icon_16x16@2x.png"
    
    echo "    🔹 Generating 32x32..."
    create_icon "$source_file" 32 "$iconset_dir/icon_32x32.png"
    
    echo "    🔹 Generating 64x64 (32x32@2x)..."
    create_icon "$source_file" 64 "$iconset_dir/icon_32x32@2x.png"
    
    echo "    🔹 Generating 128x128..."
    create_icon "$source_file" 128 "$iconset_dir/icon_128x128.png"
    
    echo "    🔹 Generating 256x256 (128x128@2x)..."
    create_icon "$source_file" 256 "$iconset_dir/icon_128x128@2x.png"
    
    echo "    🔹 Generating 256x256..."
    create_icon "$source_file" 256 "$iconset_dir/icon_256x256.png"
    
    echo "    🔹 Generating 512x512 (256x256@2x)..."
    create_icon "$source_file" 512 "$iconset_dir/icon_256x256@2x.png"
    
    echo "    🔹 Generating 512x512..."
    create_icon "$source_file" 512 "$iconset_dir/icon_512x512.png"
    
    echo "    🔹 Generating 1024x1024 (512x512@2x)..."
    create_icon "$source_file" 1024 "$iconset_dir/icon_512x512@2x.png"
    
    # Convert iconset to icns
    echo "    ⚡ Converting to .icns..."
    if iconutil -c icns "$iconset_dir"; then
        # Move to target directory
        mv "${output_name}.icns" "$TARGET_DIR/"
        # Clean up iconset directory
        rm -rf "$iconset_dir"
    else
        echo "    ❌ Failed to create .icns file from $iconset_dir"
        echo "    🔍 Checking iconset contents:"
        ls -la "$iconset_dir/"
        return 1
    fi
    
    echo "    ✅ Created $TARGET_DIR/${output_name}.icns"
}

# Find all PNG files in the source directory
echo "🔍 Scanning for icon files..."
echo ""

# Function to process icons with given pattern
process_icons() {
    local platform="$1"
    local pattern="$2"
    local found_files=false
    
    for file in "$SOURCE_DIR"/$pattern; do
        if [ -f "$file" ]; then
            found_files=true
            # Extract theme name from filename
            basename_file=$(basename "$file")
            theme=$(echo "$basename_file" | sed -E "s/.*-${platform}-([^-]+)-.*/\1/")
            
            # Create output filename
            output_name="icon-$(echo "$theme" | tr '[:upper:]' '[:lower:]')"  # Convert to lowercase
            
            echo "🎨 Processing theme: $theme"
            create_icns "$file" "$output_name"
            echo ""
        fi
    done
    
    return $([ "$found_files" = "true" ] && echo 0 || echo 1)
}

# Process macOS icons (preferred for Electron)
echo "🖥️  Processing macOS icons:"

# Try different naming patterns for macOS icons
macOS_found=false

# Pattern 1: paratext-studio-*-macOS-*.png
echo "  Checking paratext-studio pattern..."
if process_icons "macOS" "paratext-studio-*-macOS-*.png"; then
    macOS_found=true
fi

# Pattern 2: platform-bible-macOS-*.png
echo "  Checking platform-bible pattern..."
if process_icons "macOS" "platform-bible-macOS-*.png"; then
    macOS_found=true
fi

# Pattern 3: Generic *-macOS-*.png (for any other naming patterns that weren't caught above)
if [ "$macOS_found" = "false" ]; then
    echo "  Checking generic macOS pattern..."
    if process_icons "macOS" "*-macOS-*.png"; then
        macOS_found=true
    fi
fi

# If no macOS icons found, try iOS icons
if [ "$macOS_found" = "false" ]; then
    echo "📱 No macOS icons found, processing iOS icons:"
    
    iOS_found=false
    
    # Pattern 1: paratext-studio-*-iOS-*.png
    echo "  Checking paratext-studio iOS pattern..."
    if process_icons "iOS" "paratext-studio-*-iOS-*.png"; then
        iOS_found=true
    fi
    
    # Pattern 2: platform-bible-iOS-*.png
    echo "  Checking platform-bible iOS pattern..."
    if process_icons "iOS" "platform-bible-iOS-*.png"; then
        iOS_found=true
    fi
    
    # Pattern 3: Generic *-iOS-*.png (for any other naming patterns that weren't caught above)
    if [ "$iOS_found" = "false" ]; then
        echo "  Checking generic iOS pattern..."
        if process_icons "iOS" "*-iOS-*.png"; then
            iOS_found=true
        fi
    fi
    
    if [ "$iOS_found" = "false" ]; then
        echo "❌ No suitable icon files found in $SOURCE_DIR"
        echo "💡 Expected patterns:"
        echo "   - paratext-studio-*-macOS-*.png"
        echo "   - platform-bible-macOS-*.png"
        echo "   - *-macOS-*.png (generic)"
        echo "   - paratext-studio-*-iOS-*.png"
        echo "   - platform-bible-iOS-*.png"
        echo "   - *-iOS-*.png (generic)"
        exit 1
    fi
fi

echo "🎉 Icon generation complete!"
echo "📂 Generated .icns files in: $TARGET_DIR"
echo "🔧 Used: $MODE"
if [[ "$MODE" == "SIMPLE RESIZE MODE" ]]; then
    echo "💡 Note: Icons may appear large in Dock. Install 'pip3 install Pillow' for proper padding."
else
    echo "✅ Icons include proper padding and should appear correctly sized in Dock."
fi
echo ""
echo "💡 Available themes:"
ls -1 "$TARGET_DIR"/icon-*.icns 2>/dev/null | sed 's|.*/||' | sed 's/\.icns$//' || echo "   No .icns files found"
echo ""
echo "🔧 To use a specific theme in your Electron app:"
echo "   1. Rename the desired .icns file to 'icon.icns'"
echo "   2. Or update your electron-builder config to specify the icon file"
echo "   3. Example: mv '$TARGET_DIR/icon-default.icns' '$TARGET_DIR/icon.icns'"

