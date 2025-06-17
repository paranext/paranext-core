#!/bin/bash

# Script to generate .icns files from icon exports for Electron app
# 
# This script automatically detects and processes icon files from different naming patterns:
# - paratext-studio-v0-macOS-*.png (original pattern)
# - platform-bible-macOS-*.png (new pattern) 
# - Generic *-macOS-*.png patterns
# - Falls back to iOS patterns if no macOS icons found
#
# For each theme found, it creates:
# 1. An iconset folder with all required sizes (16x16 to 1024x1024)
# 2. Converts the iconset to a .icns file using iconutil
# 3. Places the .icns files in the target directory
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

echo "🎨 Generating .icns files from icon exports"
echo "📁 Source directory: $SOURCE_DIR"
echo "📁 Target directory: $TARGET_DIR"
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory '$SOURCE_DIR' does not exist"
    exit 1
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Function to create iconset and convert to icns
create_icns() {
    local source_file="$1"
    local output_name="$2"
    local iconset_dir="${output_name}.iconset"
    
    echo "  📐 Creating iconset for $output_name..."
    
    # Create iconset directory
    mkdir -p "$iconset_dir"
    
    # Generate all required icon sizes using sips
    echo "    🔹 Generating 16x16..."
    sips -z 16 16 "$source_file" --out "$iconset_dir/icon_16x16.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 32x32 (16x16@2x)..."
    sips -z 32 32 "$source_file" --out "$iconset_dir/icon_16x16@2x.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 32x32..."
    sips -z 32 32 "$source_file" --out "$iconset_dir/icon_32x32.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 64x64 (32x32@2x)..."
    sips -z 64 64 "$source_file" --out "$iconset_dir/icon_32x32@2x.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 128x128..."
    sips -z 128 128 "$source_file" --out "$iconset_dir/icon_128x128.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 256x256 (128x128@2x)..."
    sips -z 256 256 "$source_file" --out "$iconset_dir/icon_128x128@2x.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 256x256..."
    sips -z 256 256 "$source_file" --out "$iconset_dir/icon_256x256.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 512x512 (256x256@2x)..."
    sips -z 512 512 "$source_file" --out "$iconset_dir/icon_256x256@2x.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 512x512..."
    sips -z 512 512 "$source_file" --out "$iconset_dir/icon_512x512.png" > /dev/null 2>&1
    
    echo "    🔹 Generating 1024x1024 (512x512@2x)..."
    sips -z 1024 1024 "$source_file" --out "$iconset_dir/icon_512x512@2x.png" > /dev/null 2>&1
    
    # Convert iconset to icns
    echo "    ⚡ Converting to .icns..."
    iconutil -c icns "$iconset_dir"
    
    # Move to target directory
    mv "${output_name}.icns" "$TARGET_DIR/"
    
    # Clean up iconset directory
    rm -rf "$iconset_dir"
    
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
echo ""
echo "💡 Available themes:"
ls -1 "$TARGET_DIR"/icon-*.icns 2>/dev/null | sed 's|.*/||' | sed 's/\.icns$//' || echo "   No .icns files found"
echo ""
echo "🔧 To use a specific theme in your Electron app:"
echo "   1. Rename the desired .icns file to 'icon.icns'"
echo "   2. Or update your electron-builder config to specify the icon file"
echo "   3. Example: mv '$TARGET_DIR/icon-default.icns' '$TARGET_DIR/icon.icns'"

