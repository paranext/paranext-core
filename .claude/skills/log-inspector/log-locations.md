# Log Locations by Platform

## Electron Logs (Platform.Bible)

### macOS

**Development** (when running `npm start`):

```bash
# Main log file (development uses "Electron" as app name)
~/Library/Logs/Electron/main.log

# Archived logs
~/Library/Logs/Electron/main.old-1.log
~/Library/Logs/Electron/main.old-2.log

# Full path expansion
/Users/$USER/Library/Logs/Electron/
```

**Production** (packaged app):

```bash
# Main log file
~/Library/Logs/platform-bible/main.log

# Archived logs
~/Library/Logs/platform-bible/main.old-1.log
~/Library/Logs/platform-bible/main.old-2.log

# Full path expansion
/Users/$USER/Library/Logs/platform-bible/
```

**Note**: During development, `electron-log` uses the default Electron app name (`Electron`). In packaged releases, logs use the packaged app name (`platform-bible`, from `release/app/package.json` `name`). See `setAppName(globalThis.isPackaged ? APP_NAME : 'Electron')` in `src/shared/services/logger.service.ts`.

### Windows

**Development** (when running `npm start`):

```powershell
# Main log file (development uses "Electron" as app name)
%APPDATA%\Electron\logs\main.log

# Full path (typical)
C:\Users\<username>\AppData\Roaming\Electron\logs\main.log

# PowerShell variable
$env:APPDATA + "\Electron\logs\main.log"
```

**Production** (packaged app):

```powershell
# Main log file
%APPDATA%\platform-bible\logs\main.log

# Full path (typical)
C:\Users\<username>\AppData\Roaming\platform-bible\logs\main.log

# PowerShell variable
$env:APPDATA + "\platform-bible\logs\main.log"
```

### Linux

**Development** (when running `npm start`):

```bash
# Main log file (development uses "Electron" as app name)
~/.config/Electron/logs/main.log

# Full path expansion
/home/$USER/.config/Electron/logs/main.log

# XDG compliant location
$XDG_CONFIG_HOME/Electron/logs/main.log
```

**Production** (packaged app):

```bash
# Main log file
~/.config/platform-bible/logs/main.log

# Full path expansion
/home/$USER/.config/platform-bible/logs/main.log

# XDG compliant location
$XDG_CONFIG_HOME/platform-bible/logs/main.log
```

## C# Data Provider Logs

The .NET data provider has **no separate file-log directory**. It writes to its own
stdout/stderr (via `Console.WriteLine`), and the Electron main process captures that
output and forwards it into the unified `electron-log` `main.log` file tagged `[.net]`
(see `dotnet.stdout.on('data', ...)` in `src/main/services/dotnet-data-provider.service.ts`).

### Development Mode

When running via `npm run start:data` standalone, logs go to stdout/stderr (console).
When the app launches it, those same logs appear in the unified `main.log` (look for `[.net]`).

### Finding C# logs in the unified file

```bash
# Filter the C# (.net) provider lines out of the unified main.log
grep "\.net" ~/.config/Electron/logs/main.log   # Linux (dev); adjust path per platform
```

## Crash Reports

### macOS

```bash
# Apple Crash Reports (packaged app)
~/Library/Logs/DiagnosticReports/platform-bible*

# Electron crash dumps (packaged app; dev uses "Electron")
~/Library/Application Support/platform-bible/Crashpad/
```

### Windows

```powershell
# Windows Error Reporting
%LOCALAPPDATA%\CrashDumps\

# Electron crash dumps (packaged app; dev uses "Electron")
%APPDATA%\platform-bible\Crashpad\
```

### Linux

```bash
# Core dumps (if enabled)
/var/crash/

# Electron crash dumps (packaged app; dev uses "Electron")
~/.config/platform-bible/Crashpad/
```

## Quick Access Commands

### macOS

```bash
# Open log file in default editor (development)
open ~/Library/Logs/Electron/main.log

# Open log directory in Finder (development)
open ~/Library/Logs/Electron/

# Tail logs (development)
tail -f ~/Library/Logs/Electron/main.log
```

### Windows (PowerShell)

```powershell
# Open log file (development; use platform-bible for packaged app)
notepad "$env:APPDATA\Electron\logs\main.log"

# Open log directory
explorer "$env:APPDATA\Electron\logs"

# Tail logs (PowerShell 7+)
Get-Content "$env:APPDATA\Electron\logs\main.log" -Wait
```

### Linux

```bash
# Open with default editor (development; use platform-bible for packaged app)
xdg-open ~/.config/Electron/logs/main.log

# Open directory in file manager
xdg-open ~/.config/Electron/logs/

# Tail logs
tail -f ~/.config/Electron/logs/main.log
```

## Environment Variable Helpers

Add to your shell profile for quick access:

### Bash/Zsh (macOS/Linux)

```bash
# Add to ~/.bashrc or ~/.zshrc
export PBIBLE_LOGS=~/Library/Logs/Electron/main.log  # macOS (development)
# export PBIBLE_LOGS=~/Library/Logs/platform-bible/main.log  # macOS (production)
# export PBIBLE_LOGS=~/.config/Electron/logs/main.log  # Linux (development)
# export PBIBLE_LOGS=~/.config/platform-bible/logs/main.log  # Linux (production)

alias pblogs="tail -f $PBIBLE_LOGS"
alias pberrors="grep -i error $PBIBLE_LOGS | tail -20"
```

### PowerShell (Windows)

```powershell
# Add to $PROFILE (development; use platform-bible for packaged app)
$env:PBIBLE_LOGS = "$env:APPDATA\Electron\logs\main.log"

function pblogs { Get-Content $env:PBIBLE_LOGS -Wait }
function pberrors { Select-String -Path $env:PBIBLE_LOGS -Pattern "error" | Select-Object -Last 20 }
```
