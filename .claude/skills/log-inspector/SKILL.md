---
name: log-inspector
description: "[paranext-core ONLY] Read and analyze Platform.Bible application logs including Electron (main, renderer, extension-host) and C# data provider logs. Use when debugging test failures, runtime errors, or unexpected behavior. Works whether app is running or stopped. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read, Grep
---

# Log Inspector Skill

Read and analyze Platform.Bible application logs for debugging and troubleshooting.

## App Status Awareness

**This skill works in BOTH states - app running or stopped.**

| App State | Log Analysis Mode | Use Case |
|-----------|-------------------|----------|
| **Running** | Live monitoring (`tail -f`) | Debug issues as they happen |
| **Stopped** | Historical analysis (`grep`, `cat`) | Investigate past crashes/errors |

**Note**: You do NOT need to ask the user to start the app for log inspection. Log files persist between sessions.

### When to Check App Status

If you need to debug a *live* issue (reproduce and watch):

```bash
# Optional: Check if app is currently running
RUNNING=$(pgrep -f "electron.*paranext" > /dev/null && echo "yes" || echo "no")
echo "App currently running: $RUNNING"
```

If live debugging is needed and app is not running, you may ask the user to start it. But for historical log analysis, this is not necessary.

## Quick Reference

| Action | Command |
|--------|---------|
| Recent errors | `grep -i "error\|exception" "$LOG_PATH" \| tail -20` |
| Watch live | `tail -f "$LOG_PATH"` |
| Filter by process | `grep "\[main\]" "$LOG_PATH"` |
| Last 50 lines | `tail -50 "$LOG_PATH"` |

## Log Locations

### Electron Logs (main, renderer, extension-host)

```bash
# macOS (development - uses "Electron" as app name)
LOG_PATH=~/Library/Logs/Electron/main.log
# macOS (packaged/production app)
# LOG_PATH=~/Library/Logs/platform-bible/main.log

# Windows (PowerShell, development)
$LOG_PATH="$env:APPDATA\Electron\logs\main.log"
# Windows (packaged/production app)
# $LOG_PATH="$env:APPDATA\platform-bible\logs\main.log"

# Linux (development)
LOG_PATH=~/.config/Electron/logs/main.log
# Linux (packaged/production app)
# LOG_PATH=~/.config/platform-bible/logs/main.log
```

**Note**: During development on **all** platforms, `electron-log` uses the default Electron app name `Electron` for the log directory. In packaged releases, logs use the packaged app name `platform-bible` (from `release/app/package.json` `name`). The logic is `setAppName(globalThis.isPackaged ? APP_NAME : 'Electron')` in `src/shared/services/logger.service.ts`.

### C# Data Provider Logs

The .NET data provider has **no separate file-log directory**. It writes to its own
stdout/stderr (via `Console.WriteLine`), and the Electron main process captures that output
and forwards it into the unified `electron-log` `main.log` file tagged `[.net]` (see
`dotnet.stdout.on('data', ...)` in `src/main/services/dotnet-data-provider.service.ts`).

```bash
# Find the C# (.net) provider lines in the unified main.log (dev path shown)
grep "\.net" ~/.config/Electron/logs/main.log   # adjust path per platform
```

## Viewing Logs

### Recent Errors

Find the most recent errors across all processes:

```bash
# macOS example (development)
grep -iE "error|exception|fail" ~/Library/Logs/Electron/main.log | tail -30
```

### Watch Live Logs

Monitor logs in real-time while testing:

```bash
# macOS (development)
tail -f ~/Library/Logs/Electron/main.log

# With highlighting (if `ccze` installed)
tail -f ~/Library/Logs/Electron/main.log | ccze -A
```

### Filter by Process Type

Platform.Bible logs include process tags:

| Tag | Process |
|-----|---------|
| `[main]` | Main Electron process |
| `[rend]` | Renderer process |
| `[exth]` | Extension host |
| `[unkn]` | Unknown/other |

```bash
# Only main process logs
grep "\[main\]" ~/Library/Logs/Electron/main.log

# Only renderer logs
grep "\[rend\]" ~/Library/Logs/Electron/main.log

# Only extension host
grep "\[exth\]" ~/Library/Logs/Electron/main.log
```

### Filter by Log Level

Log levels: `error`, `warn`, `info`, `verbose`, `debug`

```bash
# Only errors and warnings
grep -E "\[(error|warn)\]" ~/Library/Logs/Electron/main.log

# Debug messages (verbose)
grep "\[debug\]" ~/Library/Logs/Electron/main.log
```

### Search for Specific Patterns

```bash
# Find stack traces
grep -A 10 "Error:" ~/Library/Logs/Electron/main.log

# Find specific function/class
grep "DataProvider" ~/Library/Logs/Electron/main.log

# Find by timestamp (logs format: [YYYY-MM-DD HH:MM:SS.mmm])
grep "2025-12-31 14:" ~/Library/Logs/Electron/main.log
```

## Log Format

Platform.Bible uses `electron-log` with this format:

```
[YYYY-MM-DD HH:MM:SS.mmm] [level] [process] message [at function file.ts:line:col]
```

Example:
```
[2025-12-31 14:30:15.123] [error] [main] Failed to connect [at connect network.ts:45:8]
```

## Log Rotation

- **Max file size**: 3 MB before archiving
- **Archive count**: 5 total log files (the current `main.log` plus up to 4 archived)
- **Archive naming**: `main.old-1.log`, `main.old-2.log`, ... `main.old-4.log` (the archiver inserts `.old-{n}` BEFORE the extension; template `{name}.old-{n}{ext}` in `src/node/utils/log-archiver.util.ts`)

To view older logs:
```bash
# List all log files (development)
ls -la ~/Library/Logs/Electron/

# View previous log
cat ~/Library/Logs/Electron/main.old-1.log
```

## Debugging Workflows

### Test Failure Investigation

1. **Clear logs** (optional):
   ```bash
   echo "" > ~/Library/Logs/Electron/main.log
   ```

2. **Run the failing test**

3. **Check for errors**:
   ```bash
   grep -iE "error|exception" ~/Library/Logs/Electron/main.log
   ```

4. **Look for stack traces**:
   ```bash
   grep -A 20 "Error:" ~/Library/Logs/Electron/main.log
   ```

### Runtime Issue Investigation

1. **Start watching logs**:
   ```bash
   tail -f ~/Library/Logs/Electron/main.log
   ```

2. **Reproduce the issue in the app**

3. **Look for errors in the output**

4. **Search for specific component**:
   ```bash
   grep "ComponentName" ~/Library/Logs/Electron/main.log
   ```

### C# Data Provider Issues

When debugging .NET backend:

1. **Run data provider in foreground**:
   ```bash
   npm run start:data
   # Watch console output for errors
   ```

2. **Check for .NET exceptions**:
   ```bash
   # In the console output, look for:
   # - System.Exception
   # - Unhandled exception
   # - Stack trace lines starting with "at"
   ```

## Command-Line Log Level Override

When starting the app, override log verbosity:

```bash
# More verbose
npm start -- --logLevel=debug

# Less verbose (production-like)
npm start -- --logLevel=warn
```

## See Also

- [log-locations.md](log-locations.md) - Platform-specific paths
- [reference.md](reference.md) - Log format details
- [app-runner skill](../app-runner/SKILL.md) - Start/stop the app
