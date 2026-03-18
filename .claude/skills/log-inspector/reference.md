# Log Inspector Reference

## Logging Architecture

Platform.Bible uses `electron-log` for unified cross-process logging.

### Source Files

| File | Purpose |
|------|---------|
| `src/shared/services/logger.service.ts` | Logger configuration |
| `src/shared/utils/logger.utils.ts` | Format and parsing utilities |
| `src/node/utils/log-archiver.util.ts` | Log rotation logic |

### Log Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Renderer   │    │  Ext Host    │    │    Main      │
│   Process    │    │   Process    │    │   Process    │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       │   IPC transport   │                   │
       └──────────────────►│◄──────────────────┘
                           │
                    ┌──────▼───────┐
                    │  Log File    │
                    │  (main.log)  │
                    └──────────────┘
```

All processes send logs to the main process, which writes to disk.

## Log Format Specification

### Standard Format

```
[{date}] [{level}] [{process}] {message} [at {function} {file}:{line}:{col}]
```

### Components

| Component | Example | Description |
|-----------|---------|-------------|
| `{date}` | `2025-12-31 14:30:15.123` | ISO timestamp with milliseconds |
| `{level}` | `info`, `warn`, `error` | Log severity |
| `{process}` | `main`, `rend`, `exth` | Source process abbreviation |
| `{message}` | Any text | Log message content |
| `{function}` | `handleClick` | Function name (when available) |
| `{file}` | `button.ts` | Source file name |
| `{line}:{col}` | `42:8` | Line and column number |

### Process Abbreviations

| Abbreviation | Full Name | Description |
|--------------|-----------|-------------|
| `main` | Main | Electron main process |
| `rend` | Renderer | Browser window (React UI) |
| `exth` | Extension Host | Extension runtime |
| `unkn` | Unknown | Unidentified source |

### Log Levels

In order of severity (most to least):

| Level | When Used | Color (Console) |
|-------|-----------|-----------------|
| `error` | Exceptions, failures | Red |
| `warn` | Potential issues | Yellow |
| `info` | General information | Default |
| `verbose` | Detailed info | Dim |
| `debug` | Development details | Gray |
| `silly` | Extremely verbose | Gray |

## Log Archiving

### Configuration

From `src/node/utils/log-archiver.util.ts`:

- **Max file size**: 3 MB (3 * 1024 * 1024 bytes)
- **Max archive count**: 5 files
- **Archive naming**: `{filename}.old-{n}` where n = 1-4

### Rotation Logic

When `main.log` exceeds 3 MB:

1. `main.log.old-4` is deleted (if exists)
2. `main.log.old-3` → `main.log.old-4`
3. `main.log.old-2` → `main.log.old-3`
4. `main.log.old-1` → `main.log.old-2`
5. `main.log` → `main.log.old-1`
6. New empty `main.log` created

## Log Parsing

### Extract Timestamp

```bash
# Parse the date portion
grep -oE "^\[[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}\]" main.log
```

### Extract Errors with Context

```bash
# Get 5 lines before and 10 lines after each error
grep -B5 -A10 "\[error\]" main.log
```

### Count by Level

```bash
# Count occurrences of each log level
grep -oE "\[(error|warn|info|debug)\]" main.log | sort | uniq -c
```

### Timeline Analysis

```bash
# Errors in the last hour (approximate)
grep "$(date +%Y-%m-%d' '%H:)" main.log | grep "\[error\]"
```

## C# Data Provider Logging

The .NET data provider uses a separate logging mechanism.

### Console Output

When running `npm run start:data`, logs appear in stdout/stderr:

```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:...
info: ParanextDataProvider[0]
      Connected to WebSocket server
```

### Log Levels (C#)

```
Trace → Debug → Information → Warning → Error → Critical
```

### Common .NET Log Patterns

```bash
# Filter .NET exceptions from console
npm run start:data 2>&1 | grep -E "(Exception|Error|at .*\()"
```

## Useful Grep Patterns

### Find Unhandled Exceptions

```bash
grep -E "(UnhandledException|unhandledRejection|uncaughtException)" main.log
```

### Find Network Errors

```bash
grep -iE "(network|connection|socket|timeout|ECONNREFUSED)" main.log
```

### Find Extension Issues

```bash
grep "\[exth\]" main.log | grep -iE "(error|fail|exception)"
```

### Find Slow Operations

```bash
# Look for timing logs
grep -E "[0-9]+ms" main.log | grep -E "[0-9]{4,}ms"  # Operations over 1 second
```

## Integration with Other Tools

### VS Code Debug Console

When debugging via VS Code, logs also appear in the Debug Console.

### Chrome DevTools

Renderer logs can be viewed in Chrome DevTools console:
- Press F12 in the app window
- Or use `claude --chrome` and read console via MCP

### JSON-RPC Message Logging

To enable message logging in `src/main/services/rpc-server.ts`, uncomment lines 65-72:

```typescript
// Uncomment to log every message sent
const originalSend = this.ws.send;
this.ws.send = (data) => {
  logger.warn(`Sending message on ${this.name}: ${data}`);
  originalSend.call(this.ws, data);
};
```
