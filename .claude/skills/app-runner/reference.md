# App Runner Reference

## Platform.Bible Process Architecture

Platform.Bible runs as a multi-process Electron application:

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process (Electron)               │
│  • Window management & app lifecycle                     │
│  • Spawns and manages child processes                    │
│  • Port 5858 for Node.js debugging                       │
└────────────────┬────────────────────────────────────────┘
                 │ JSON-RPC over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
│            │ │            │ │                 │
│ localhost  │ │ • Loads    │ │ • Project data  │
│ :1212      │ │   extensions│ │ • Paratext     │
│            │ │ • PAPI     │ │   integration   │
└────────────┘ └────────────┘ └─────────────────┘
```

## npm Scripts Deep Dive

### `npm start`

The main development command. Orchestrates multiple processes:

1. **Webpack Dev Server** starts on port 1212
2. **Preload script** builds and watches
3. **Extensions** build and watch
4. **Main process** builds, watches, and launches Electron via `electronmon`

**Configuration**: `.erb/configs/webpack.config.renderer.dev.ts`

### `npm run start:renderer`

Starts only the webpack dev server for the renderer. Useful when:
- You're only changing React/TypeScript UI code
- You want faster startup
- You don't need the Electron shell (testing in browser)

**Note**: Some features require the full app (PAPI access, native dialogs, etc.)

### `npm run start:main`

Starts the main Electron process with webpack watch. Use when:
- Debugging main process code
- Testing IPC communication
- Working on window management

### `npm run start:data`

Starts the .NET data provider with `dotnet watch`. Use when:
- Working on C# backend code
- Testing ParatextData integration
- Debugging data provider issues

**Tip**: Run in a separate terminal since it has its own output stream.

## Ports Used

| Port | Process | Purpose |
|------|---------|---------|
| 1212 | Webpack Dev Server | React app hot reload |
| 8876 | Main Process | JSON-RPC WebSocket server |
| 5858 | Main Process | Node.js inspector (debugging) |
| 9223 | Renderer | Chrome DevTools Protocol |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | 1212 | Webpack dev server port |
| `MAIN_ARGS` | - | Extra args for Electron main |
| `IN_VSCODE` | - | Set when debugging from VS Code |
| `DEV_NOISY` | false | Enable verbose dev logging |
| `DEBUG_PROD` | false | Debug packaged builds |

## Debugging with VS Code

The `.vscode/launch.json` provides debug configurations:

1. **Debug Platform** - Compound config for full debugging
2. **Debug Platform Backend** - Main + extension host
3. **Attach to Renderer** - Chrome DevTools for renderer
4. **Debug .NET Core** - C# data provider

To debug:
1. Open VS Code
2. Select "Debug Platform" from Run and Debug
3. Press F5

## Process Lifecycle

### Startup Sequence

1. npm start triggers webpack dev server
2. Webpack spawns preload, extensions, and main builders
3. electronmon waits for webpack completion
4. Electron launches with hot reload support
5. Main process starts WebSocket server on 8876
6. Renderer loads from localhost:1212
7. Extension host initializes
8. .NET data provider connects (if running)

### Shutdown Sequence

1. Close Electron window
2. Main process sends shutdown signals
3. Child processes receive SIGTERM
4. WebSocket connections close
5. Webpack dev server stops

## Common Issues

### "EADDRINUSE" Error

Port 1212 is already in use:

```bash
# Find the process
lsof -i :1212

# Kill it
kill -9 $(lsof -ti:1212)
```

### Electron Won't Start

1. Check for running instances
2. Verify webpack built successfully
3. Check main process logs
4. Try rebuilding: `./refresh.sh`

### Hot Reload Not Working

1. Check webpack dev server is running
2. Verify file is in watched path
3. Check for TypeScript errors
4. Restart webpack: run `./refresh.sh`
