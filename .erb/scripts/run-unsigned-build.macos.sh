#!/bin/bash

# Script to install and run universal app from app-macos*.zip file
# Extract, install, codesign, and run the application
# Supports both Paratext 10 Studio and Platform.Bible apps
#
# Usage:
#   ./run-unsigned-build.macos.sh                    # Use ~/Downloads (default)
#   ./run-unsigned-build.macos.sh /path/to/folder    # Search for app-macos*.zip in folder
#   ./run-unsigned-build.macos.sh /path/to/file.zip  # Use specific zip file
#

set -e  # Exit on any error

# Show usage if help is requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "Usage: $0 [path]"
    echo "  path: Optional path to directory or zip file"
    echo "        If directory: searches for most recent app-macos*.zip"
    echo "        If file: uses that specific zip file"
    echo "        If not specified: defaults to ~/Downloads"
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

# Determine if the path is a file or directory and find the app file (zip or dmg)
if [ -f "$SEARCH_PATH" ]; then
    # Path is a file - use it directly
    if [[ "$SEARCH_PATH" == *.zip ]]; then
        APP_ARCHIVE="$SEARCH_PATH"
        echo "Using specified zip file: $(basename "$APP_ARCHIVE")"
    elif [[ "$SEARCH_PATH" == *.dmg ]]; then
        DMG_FILE="$SEARCH_PATH"
        echo "Using specified DMG file: $(basename "$DMG_FILE")"
    else
        echo "Error: Specified file '$SEARCH_PATH' is not a zip or dmg file!"
        exit 1
    fi
elif [ -d "$SEARCH_PATH" ]; then
    # Path is a directory - search for dmg or app-macos*.zip files
    echo "Looking for DMG or app-macos*.zip files in $SEARCH_PATH..."

    # First, look for Platform.Bible or Paratext-specific files (prioritize these)
    PLATFORM_DMG=$(ls -t "$SEARCH_PATH"/*Platform*.dmg "$SEARCH_PATH"/*Paratext*.dmg 2>/dev/null | head -1)
    PLATFORM_ZIP=$(ls -t "$SEARCH_PATH"/app-macos*.zip 2>/dev/null | head -1)

    # If we found Platform-specific files, choose the most recent one
    if [ -n "$PLATFORM_DMG" ] || [ -n "$PLATFORM_ZIP" ]; then
        # Compare timestamps of Platform-specific files
        if [ -n "$PLATFORM_DMG" ] && [ -n "$PLATFORM_ZIP" ]; then
            # Both exist, choose the newer one
            if [ "$PLATFORM_DMG" -nt "$PLATFORM_ZIP" ]; then
                DMG_FILE="$PLATFORM_DMG"
                echo "Found most recent Platform-specific DMG file: $(basename "$DMG_FILE")"
            else
                APP_ARCHIVE="$PLATFORM_ZIP"
                echo "Found most recent Platform-specific zip file: $(basename "$APP_ARCHIVE")"
            fi
        elif [ -n "$PLATFORM_DMG" ]; then
            DMG_FILE="$PLATFORM_DMG"
            echo "Found Platform-specific DMG file: $(basename "$DMG_FILE")"
        else
            APP_ARCHIVE="$PLATFORM_ZIP"
            echo "Found Platform-specific zip file: $(basename "$APP_ARCHIVE")"
        fi
    else
        # No Platform-specific files found, fall back to generic search
        echo "No Platform-specific files found, searching for any DMG or app-macos*.zip files..."

        # Get all matching files and find the most recent
        ALL_FILES=()
        while IFS= read -r -d '' file; do
            ALL_FILES+=("$file")
        done < <(find "$SEARCH_PATH" -maxdepth 1 \( -name "*.dmg" -o -name "app-macos*.zip" \) -print0 2>/dev/null | sort -z)

        if [ ${#ALL_FILES[@]} -eq 0 ]; then
            echo "Error: No app-macos*.zip or *.dmg file found in $SEARCH_PATH!"
            echo "Available files in $SEARCH_PATH:"
            ls -la "$SEARCH_PATH/"*.{zip,dmg} 2>/dev/null || echo "No zip or dmg files found"
            exit 1
        fi

        # Find the most recent file among all matches
        NEWEST_FILE=""
        for file in "${ALL_FILES[@]}"; do
            if [ -z "$NEWEST_FILE" ] || [ "$file" -nt "$NEWEST_FILE" ]; then
                NEWEST_FILE="$file"
            fi
        done

        if [[ "$NEWEST_FILE" == *.dmg ]]; then
            DMG_FILE="$NEWEST_FILE"
            echo "Found most recent DMG file: $(basename "$DMG_FILE")"
        else
            APP_ARCHIVE="$NEWEST_FILE"
            echo "Found most recent zip file: $(basename "$APP_ARCHIVE")"
        fi
    fi

    # Validate that we found a file
    if [ -z "$DMG_FILE" ] && [ -z "$APP_ARCHIVE" ]; then
        echo "Error: No suitable file found in $SEARCH_PATH!"
        exit 1
    fi
else
    echo "Error: Path '$SEARCH_PATH' does not exist!"
    exit 1
fi

# If we have a zip, extract to temporary directory and locate the DMG
if [ -n "$APP_ARCHIVE" ]; then
    echo "Created temporary directory: $TEMP_DIR"
    mkdir -p "$TEMP_DIR"
    echo "Extracting zip file..."
    unzip -q "$APP_ARCHIVE" -d "$TEMP_DIR"
    DMG_FILE=$(find "$TEMP_DIR" -name "*.dmg" -type f | head -1)
    if [ -z "$DMG_FILE" ]; then
        echo "Error: No DMG found inside zip archive"
        rm -rf "$TEMP_DIR"
        exit 1
    fi
fi

echo "Using DMG: $DMG_FILE"

# Mount DMG
MOUNT_OUTPUT=$(hdiutil attach "$DMG_FILE" -nobrowse)
MOUNT_POINT=$(echo "$MOUNT_OUTPUT" | grep '/Volumes/' | sed 's/.*\t//')
echo "Mounted at: $MOUNT_POINT"

APP_PATH=$(find "$MOUNT_POINT" -name "*.app" -type d | head -1)
if [ -z "$APP_PATH" ]; then
    echo "Error: No .app found in DMG"
    hdiutil detach "$MOUNT_POINT" -quiet
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

# Explicitly sign all .dylib and .so files in dotnet before signing the main app (sometimes --deep misses these)
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

# TODO: Remove this section when https://paratextstudio.atlassian.net/browse/PT-3623 is resolved
# Sign Python framework components if they exist
PYTHON_DIRS=("/Applications/$APP_NAME/Contents/Resources/hg-universal" "/Applications/$APP_NAME/Contents/Frameworks")
for PYTHON_DIR in "${PYTHON_DIRS[@]}"; do
    if [ -d "$PYTHON_DIR" ]; then
        echo "Signing Python components in $PYTHON_DIR..."
        # Sign Python framework binaries
        find "$PYTHON_DIR" -name "Python" -type f | while read PYTHON_BIN; do
            echo "Signing Python binary: $PYTHON_BIN"
            codesign --force --sign - "$PYTHON_BIN" 2>/dev/null || echo "Warning: Failed to sign $PYTHON_BIN"
        done
        # Sign Python .dylib and .so files
        find "$PYTHON_DIR" -type f \( -name "*.dylib" -o -name "*.so" -o -name "*.framework" \) | while read PYTHON_LIB; do
            echo "Signing Python library: $PYTHON_LIB"
            codesign --force --sign - "$PYTHON_LIB" 2>/dev/null || echo "Warning: Failed to sign $PYTHON_LIB"
        done
        # Sign any executables in the Python directory
        find "$PYTHON_DIR" -type f -perm +111 | while read PYTHON_EXEC; do
            # Skip if it's already been signed above
            if [[ "$PYTHON_EXEC" != *.dylib ]] && [[ "$PYTHON_EXEC" != *.so ]] && [[ "$PYTHON_EXEC" != *Python ]]; then
                echo "Signing Python executable: $PYTHON_EXEC"
                codesign --force --sign - "$PYTHON_EXEC" 2>/dev/null || echo "Warning: Failed to sign $PYTHON_EXEC"
            fi
        done
    fi
done

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

# Sign the main app bundle AFTER signing all internal components
echo "Code signing the main application bundle (force, deep)..."
codesign --deep --force --sign - "/Applications/$APP_NAME"
if [ $? -eq 0 ]; then
    echo "✅ Main app code signing successful!"
else
    echo "❌ Main app code signing failed!"
    exit 1
fi


# Add to Gatekeeper approval (this will prompt for admin password if needed)
echo "Adding app to Gatekeeper approval..."
if spctl --add "/Applications/$APP_NAME" 2>/dev/null; then
    echo "✅ Successfully added app to Gatekeeper approval"
else
    echo "⚠️  Could not add to spctl - trying alternative approach..."
    # Try to enable the app in Gatekeeper by assessing it first
    if spctl --assess --type execute "/Applications/$APP_NAME" 2>/dev/null; then
        echo "✅ App is already approved by Gatekeeper"
    else
        echo "ℹ️  App not in Gatekeeper database, but this is normal for unsigned apps"
        echo "ℹ️  The app should still launch successfully due to code signing"
    fi
fi

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
