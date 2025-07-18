#!/bin/bash

# Script to install and run Apple Silicon (arm64) or Intel (x86_64) app from app-macos*.zip file
# Extract, install, codesign, and run the application
# Supports both Paratext 10 Studio and Platform.Bible apps
#
# Usage:
#   ./run-unsigned-build.macos.sh                    # Use ~/Downloads (default)
#   ./run-unsigned-build.macos.sh /path/to/folder    # Search for app-macos*.zip in folder
#   ./run-unsigned-build.macos.sh /path/to/file.zip  # Use specific zip file
#
# Expected pathnames:
# - For Apple Silicon (arm64) architecture: DMG files should include "arm64" in their names (e.g., app-arm64.dmg).
# - For Intel (x86_64) architecture: DMG files should exclude "arm64" in their names (e.g., app.dmg).

set -e  # Exit on any error

# Show usage if help is requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "Usage: $0 [path]"
    echo "  path: Optional path to directory or zip file"
    echo "        If directory: searches for most recent app-macos*.zip"
    echo "        If file: uses that specific zip file"
    echo "        If not specified: defaults to ~/Downloads"
    echo ""
    echo "Expected pathnames:"
    echo "  - For Apple Silicon (arm64) architecture: DMG files should include 'arm64' in their names (e.g., app-arm64.dmg)."
    echo "  - For Intel (x86_64) architecture: DMG files should exclude 'arm64' in their names (e.g., app.dmg)."
    echo ""
    echo "Optional environment variables (set to 0 to disable, default is 1):"
    echo "  SHOW_LOGS_IN_FINDER   Show logs in Finder after install (default: 1)"
    echo "  RUN_APP               Launch the application after install (default: 1)"
    echo "  CLEAR_LOGS            Clear logs before install/run (default: 1)"
    echo ""
    echo "Examples:"
    echo "  SHOW_LOGS_IN_FINDER=0 $0"
    echo "  RUN_APP=0 $0 /path/to/file.zip"
    echo "  CLEAR_LOGS=0 SHOW_LOGS_IN_FINDER=0 $0 /path/to/folder"
    exit 0
fi

echo "Starting app installation process..."

# Define variables
TEMP_DIR="/tmp/app_install_$$"

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
  echo "Detected Intel (x86_64). Looking for Intel (non-arm64) DMG..."
  DMG_FILE=$(find "$TEMP_DIR" -name "*.dmg" ! -name "*arm64*.dmg" -type f | head -1)
  if [ -z "$DMG_FILE" ]; then
    echo "Error: No Intel (non-arm64 DMG) file found in the zip!"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
fi

echo "Found DMG: $(basename "$DMG_FILE")"

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

# Option flags (set to 0 to disable)
SHOW_LOGS_IN_FINDER=${SHOW_LOGS_IN_FINDER:-1}
RUN_APP=${RUN_APP:-1}
CLEAR_LOGS=${CLEAR_LOGS:-1}

# Clear logs before installing/running the app
if [[ "$CLEAR_LOGS" == "1" ]]; then
    if [[ "$APP_NAME" == "Paratext 10 Studio.app" ]]; then
        LOG_DIR="$HOME/Library/Logs/paratext-10-studio"
        echo "Clearing logs in $LOG_DIR..."
        mkdir -p "$LOG_DIR"
        rm -rf "$LOG_DIR"/*
        ls -l "$LOG_DIR"
    elif [[ "$APP_NAME" == "Platform.Bible.app" ]]; then
        LOG_DIR="$HOME/Library/Logs/platform-bible"
        echo "Listing logs in $LOG_DIR..."
        mkdir -p "$LOG_DIR"
        ls -l "$LOG_DIR"
    fi
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

# Always re-sign the app to ensure all components have a matching signature
echo "Code signing the application (force, deep)..."
codesign --deep --force --sign - "/Applications/$APP_NAME"
if [ $? -eq 0 ]; then
    echo "✅ Code signing successful!"
else
    echo "❌ Code signing failed!"
    exit 1
fi

# Explicitly sign all .dylib and .so files in dotnet (sometimes --deep misses these)
DOTNET_DIR="/Applications/$APP_NAME/Contents/Resources/dotnet"
if [ -d "$DOTNET_DIR" ]; then
    echo "Explicitly signing all binaries in $DOTNET_DIR..."
    find "$DOTNET_DIR" -type f \( -name "*.dylib" -o -name "*.so" -o -perm +111 \) | while read BIN; do
        echo "Signing $BIN"
        if ! codesign --force --sign - "$BIN" 2>/dev/null; then
            echo "Warning: Failed to sign $BIN (may already be properly signed)"
        fi
    done
fi

# Verify critical dotnet binaries are properly signed
echo "Verifying critical dotnet binaries..."
CRITICAL_LIBS=("libhostfxr.dylib" "libcoreclr.dylib" "libhostpolicy.dylib")
for lib in "${CRITICAL_LIBS[@]}"; do
    LIB_PATH="$DOTNET_DIR/$lib"
    if [ -f "$LIB_PATH" ]; then
        if codesign -v "$LIB_PATH" 2>/dev/null; then
            echo "✅ $lib is properly signed"
        else
            echo "❌ Warning: $lib signature verification failed"
        fi
    fi
done


# Add to Gatekeeper approval (this will prompt for admin password if needed)
echo "Adding app to Gatekeeper approval..."
spctl --add "/Applications/$APP_NAME" 2>/dev/null || echo "Note: Could not add to spctl (may require admin privileges)"

# Verify the app is properly installed and signed
if [ -d "/Applications/$APP_NAME" ]; then
    echo "✅ App successfully installed at /Applications/$APP_NAME"

    # Verify main app signature
    if codesign -v "/Applications/$APP_NAME" 2>/dev/null; then
        echo "✅ Main app signature is valid"
    else
        echo "❌ Warning: Main app signature verification failed"
    fi
else
    echo "❌ App installation failed!"
    exit 1
fi

# Run the application
if [[ "$RUN_APP" == "1" ]]; then
    echo "Launching the application..."
    open "/Applications/$APP_NAME"

    if [ $? -eq 0 ]; then
        echo "✅ Application launched successfully!"
    else
        echo "❌ Failed to launch application!"
        exit 1
    fi
else
    echo "Skipping application launch (RUN_APP=$RUN_APP)"
fi

echo "🎉 Installation and launch completed successfully!"

# Show relevant logs in Finder
if [[ "$SHOW_LOGS_IN_FINDER" == "1" ]]; then
    if [[ "$APP_NAME" == "Paratext 10 Studio.app" ]]; then
        LOG_DIR="$HOME/Library/Logs/paratext-10-studio"
        echo "Opening $LOG_DIR in Finder..."
        open "$LOG_DIR"
    elif [[ "$APP_NAME" == "Platform.Bible.app" ]]; then
        LOG_DIR="$HOME/Library/Logs/platform-bible"
        echo "Opening $LOG_DIR in Finder..."
        open "$LOG_DIR"
    fi
else
    echo "Skipping opening logs in Finder (SHOW_LOGS_IN_FINDER=$SHOW_LOGS_IN_FINDER)"
fi
