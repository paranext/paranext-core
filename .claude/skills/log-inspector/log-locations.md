# Log Locations by Platform

## Electron Logs (Platform.Bible)

### macOS

**Development** (when running `npm start`):

```bash
# Main log file (development uses "Electron" as app name)
~/Library/Logs/Electron/main.log

# Archived logs
~/Library/Logs/Electron/main.log.old-1
~/Library/Logs/Electron/main.log.old-2

# Full path expansion
/Users/$USER/Library/Logs/Electron/
```

**Production** (packaged app):

```bash
# Main log file
~/Library/Logs/Platform.Bible/main.log

# Archived logs
~/Library/Logs/Platform.Bible/main.log.old-1
~/Library/Logs/Platform.Bible/main.log.old-2

# Full path expansion
/Users/$USER/Library/Logs/Platform.Bible/
```

**Note**: During development, `electron-log` uses the default Electron app name. In packaged releases, logs will be in `Platform.Bible`.

### Windows

```powershell
# Main log file
%APPDATA%\Platform.Bible\logs\main.log

# Full path (typical)
C:\Users\<username>\AppData\Roaming\Platform.Bible\logs\main.log

# PowerShell variable
$env:APPDATA + "\Platform.Bible\logs\main.log"
```

### Linux

```bash
# Main log file
~/.config/Platform.Bible/logs/main.log

# Full path expansion
/home/$USER/.config/Platform.Bible/logs/main.log

# XDG compliant location
$XDG_CONFIG_HOME/Platform.Bible/logs/main.log
```

## C# Data Provider Logs

### Development Mode

When running via `npm run start:data`, logs go to stdout/stderr (console).

### Production Mode

```bash
# Check for log directory in project
ls -la c-sharp/ParanextDataProvider/logs/

# Or near the built executable
ls -la c-sharp/bin/Release/net8.0/logs/
```

## Crash Reports

### macOS

```bash
# Apple Crash Reports
~/Library/Logs/DiagnosticReports/Platform.Bible*

# Electron crash dumps
~/Library/Application Support/Platform.Bible/Crashpad/
```

### Windows

```powershell
# Windows Error Reporting
%LOCALAPPDATA%\CrashDumps\

# Electron crash dumps
%APPDATA%\Platform.Bible\Crashpad\
```

### Linux

```bash
# Core dumps (if enabled)
/var/crash/

# Electron crash dumps
~/.config/Platform.Bible/Crashpad/
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
# Open log file
notepad "$env:APPDATA\Platform.Bible\logs\main.log"

# Open log directory
explorer "$env:APPDATA\Platform.Bible\logs"

# Tail logs (PowerShell 7+)
Get-Content "$env:APPDATA\Platform.Bible\logs\main.log" -Wait
```

### Linux

```bash
# Open with default editor
xdg-open ~/.config/Platform.Bible/logs/main.log

# Open directory in file manager
xdg-open ~/.config/Platform.Bible/logs/

# Tail logs
tail -f ~/.config/Platform.Bible/logs/main.log
```

## Environment Variable Helpers

Add to your shell profile for quick access:

### Bash/Zsh (macOS/Linux)

```bash
# Add to ~/.bashrc or ~/.zshrc
export PBIBLE_LOGS=~/Library/Logs/Electron/main.log  # macOS (development)
# export PBIBLE_LOGS=~/Library/Logs/Platform.Bible/main.log  # macOS (production)
# export PBIBLE_LOGS=~/.config/Platform.Bible/logs/main.log  # Linux

alias pblogs="tail -f $PBIBLE_LOGS"
alias pberrors="grep -i error $PBIBLE_LOGS | tail -20"
```

### PowerShell (Windows)

```powershell
# Add to $PROFILE
$env:PBIBLE_LOGS = "$env:APPDATA\Platform.Bible\logs\main.log"

function pblogs { Get-Content $env:PBIBLE_LOGS -Wait }
function pberrors { Select-String -Path $env:PBIBLE_LOGS -Pattern "error" | Select-Object -Last 20 }
```
