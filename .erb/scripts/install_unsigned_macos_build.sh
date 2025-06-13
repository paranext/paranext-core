#!/bin/bash

# Script to install arm64 app from app-macos*.zip file
# Extract, install, codesign, and run the application
# Supports both Paratext 10 Studio and Platform.Bible apps
#
# Usage:
#   ./install_unsigned_macos_build.sh                    # Use ~/Downloads (default)
#   ./install_unsigned_macos_build.sh /path/to/folder    # Search for app-macos*.zip in folder
#   ./install_unsigned_macos_build.sh /path/to/file.zip  # Use specific zip file

set -e  # Exit on any error

# Show usage if help is requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "Usage: $0 [path]"
    echo "  path: Optional path to directory or zip file"
    echo "        If directory: searches for most recent app-macos*.zip"
    echo "        If file: uses that specific zip file"
    echo "        If not specified: defaults to ~/Downloads"
    exit 0
fi

echo "Starting app installation process..."

# Define variables
TEMP_DIR="/tmp/app_install_$$"
DMG_PATTERN="*arm64*.dmg"

# Find the zip file based on provided path or default
SEARCH_PATH="${1:-$HOME/Downloads}"  # Use first argument or default to ~/Downloads

# Determine if the path is a file or directory and find the zip file
if [ -f "$SEARCH_PATH" ]; then
    # Path is a file - use it directly
    if [[ "$SEARCH_PATH" == *.zip ]]; then
        ZIP_FILE="$SEARCH_PATH"
        echo "Using specified zip file: $(basename "$ZIP_FILE")"
    else
        echo "Error: Specified file '$SEARCH_PATH' is not a zip file!"
        exit 1
    fi
elif [ -d "$SEARCH_PATH" ]; then
    # Path is a directory - search for app-macos*.zip files
    echo "Looking for app-macos*.zip files in $SEARCH_PATH..."
    ZIP_FILE=$(ls -t "$SEARCH_PATH/app-macos"*.zip 2>/dev/null | head -1)

    if [ -z "$ZIP_FILE" ]; then
        echo "Error: No app-macos*.zip file found in $SEARCH_PATH!"
        echo "Available zip files in $SEARCH_PATH:"
        ls -la "$SEARCH_PATH/"*.zip 2>/dev/null || echo "No zip files found"
        exit 1
    fi
else
    echo "Error: Path '$SEARCH_PATH' does not exist!"
    exit 1
fi

echo "Found most recent file: $(basename "$ZIP_FILE")"

# Create temporary directory
mkdir -p "$TEMP_DIR"
echo "Created temporary directory: $TEMP_DIR"

# Extract zip file
echo "Extracting zip file..."
unzip -q "$ZIP_FILE" -d "$TEMP_DIR"

# Detect system architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
  echo "Detected Apple Silicon (arm64). Looking for arm64 DMG..."
  DMG_FILE=$(find "$TEMP_DIR" -name "*arm64*.dmg" -type f | head -1)
  if [ -z "$DMG_FILE" ]; then
    echo "Error: No arm64 DMG file found in the zip!"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
else
  echo "Detected Intel (x86_64). Looking for non-arm64 DMG..."
  DMG_FILE=$(find "$TEMP_DIR" -name "*.dmg" ! -name "*arm64*.dmg" -type f | head -1)
  if [ -z "$DMG_FILE" ]; then
    echo "Error: No non-arm64 DMG file found in the zip!"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
fi

echo "Found arm64 DMG: $(basename "$DMG_FILE")"

# Mount the DMG
echo "Mounting DMG..."
MOUNT_OUTPUT=$(hdiutil attach "$DMG_FILE" -nobrowse)
MOUNT_POINT=$(echo "$MOUNT_OUTPUT" | grep '/Volumes/' | sed 's/.*\t//')
if [ -z "$MOUNT_POINT" ]; then
    echo "Error: Failed to mount DMG file"
    echo "hdiutil output: $MOUNT_OUTPUT"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "Mounted at: $MOUNT_POINT"

# Find the .app in the mounted volume
APP_PATH=$(find "$MOUNT_POINT" -name "*.app" -type d | head -1)
if [ -z "$APP_PATH" ]; then
    echo "Error: No .app found in the mounted DMG"
    hdiutil detach "$MOUNT_POINT" -quiet
    rm -rf "$TEMP_DIR"
    exit 1
fi

APP_NAME=$(basename "$APP_PATH")
echo "Found app: $APP_NAME"

# Remove existing app if it exists
if [ -d "/Applications/$APP_NAME" ]; then
    echo "Removing existing app..."
    rm -rf "/Applications/$APP_NAME"
fi

# Copy app to Applications
echo "Installing app to /Applications..."
cp -R "$APP_PATH" "/Applications/"

# Unmount the DMG
echo "Unmounting DMG..."
hdiutil detach "$MOUNT_POINT" -quiet

# Clean up temporary directory
rm -rf "$TEMP_DIR"

# Remove quarantine attribute to avoid Gatekeeper issues
echo "Removing quarantine attribute..."
xattr -dr com.apple.quarantine "/Applications/$APP_NAME" 2>/dev/null || true

# Codesign the app
echo "Code signing the application..."
codesign --deep --force --sign - "/Applications/$APP_NAME"

if [ $? -eq 0 ]; then
    echo "✅ Code signing successful!"
else
    echo "❌ Code signing failed!"
    exit 1
fi

# Add to Gatekeeper approval (this will prompt for admin password if needed)
echo "Adding app to Gatekeeper approval..."
spctl --add "/Applications/$APP_NAME" 2>/dev/null || echo "Note: Could not add to spctl (may require admin privileges)"

# Verify the app is properly installed
if [ -d "/Applications/$APP_NAME" ]; then
    echo "✅ App successfully installed at /Applications/$APP_NAME"
else
    echo "❌ App installation failed!"
    exit 1
fi

# Run the application
echo "Launching the application..."
open "/Applications/$APP_NAME"

if [ $? -eq 0 ]; then
    echo "✅ Application launched successfully!"
else
    echo "❌ Failed to launch application!"
    exit 1
fi

echo "🎉 Installation and launch completed successfully!"

