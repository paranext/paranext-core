# Platform.Bible App State Detection

Shared reference for detecting Platform.Bible application state across all skills.

## Quick One-Liner Check

```bash
# Comprehensive status check
echo "Renderer: $(curl -s -m 2 http://localhost:1212 > /dev/null && echo UP || echo DOWN), WebSocket: $(curl -s -m 2 http://localhost:8876 > /dev/null && echo UP || echo DOWN), Electron: $(pgrep -f 'electron.*paranext' > /dev/null && echo RUNNING || echo STOPPED)"
```

## Port Reference

| Port | Service | Purpose | Check Command |
|------|---------|---------|---------------|
| 1212 | Webpack Dev Server | React renderer, hot reload | `curl -s http://localhost:1212` |
| 8876 | WebSocket Server | PAPI (JSON-RPC) | `curl -s http://localhost:8876` |
| 5858 | Node.js Inspector | Main process debugging | - |
| 9223 | Chrome DevTools | Renderer debugging (VS Code) | - |

## State Matrix

| Renderer (1212) | WebSocket (8876) | Electron Process | State | Description |
|-----------------|------------------|------------------|-------|-------------|
| DOWN | DOWN | STOPPED | **not_running** | App not started |
| UP | DOWN | STOPPED | **webpack_only** | User ran `npm run start:renderer` only |
| UP | DOWN | RUNNING | **starting** | App initializing (wait 10-30s) |
| UP | UP | RUNNING | **full_app** | Fully operational |
| DOWN | UP | RUNNING | **rare** | Renderer crashed |

## Skill Compatibility by State

| Skill | not_running | webpack_only | starting | full_app |
|-------|-------------|--------------|----------|----------|
| **app-runner** | Can guide user | Can detect | Wait | Can stop |
| **papi-client** | BLOCKED | BLOCKED | Wait | WORKS |
| **log-inspector** | Historical only | Historical | Both | Both |
| **visual-verification** | BLOCKED | Limited | Wait | WORKS* |

*visual-verification requires visible window AND Chrome MCP enabled (`claude --chrome`)

## Detection Script

```bash
#!/bin/bash
# Full status detection

RENDERER=$(curl -s -m 2 http://localhost:1212 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
WEBSOCKET=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
ELECTRON=$(pgrep -f "electron.*paranext" > /dev/null 2>&1 && echo "RUNNING" || echo "STOPPED")
DOTNET=$(pgrep -f "ParanextDataProvider" > /dev/null 2>&1 && echo "RUNNING" || echo "STOPPED")

echo "=== Platform.Bible Status ==="
echo "Renderer (1212):    $RENDERER"
echo "WebSocket (8876):   $WEBSOCKET"
echo "Electron process:   $ELECTRON"
echo ".NET Data Provider: $DOTNET"

# Determine overall state
if [ "$RENDERER" = "UP" ] && [ "$WEBSOCKET" = "UP" ]; then
  echo ""
  echo "State: FULL_APP - Ready for all operations"
elif [ "$RENDERER" = "UP" ] && [ "$ELECTRON" = "RUNNING" ]; then
  echo ""
  echo "State: STARTING - Wait for WebSocket server"
elif [ "$RENDERER" = "UP" ]; then
  echo ""
  echo "State: WEBPACK_ONLY - Run './.erb/scripts/refresh.sh' for full app"
else
  echo ""
  echo "State: NOT_RUNNING - User must start app"
fi
```

## Claude Background Process Limitation

When Claude Code runs `./.erb/scripts/refresh.sh` in a background process:
- Webpack dev server starts (port 1212 works)
- Electron main process may start
- **GUI window may NOT be visible** to the user

This happens because background processes lack access to the display environment.

### Implications

| Scenario | What Works | What Doesn't |
|----------|------------|--------------|
| Claude starts app | WebSocket API (PAPI) | Visual verification (no visible window) |
| User starts app | Everything | N/A |

### Recommended Approach

1. **Always check** if app is already running before any action
2. **For visual verification**: Ask user to start app manually
3. **For PAPI-only work**: Can attempt background start, but user won't see window
4. **Document** when visual verification is skipped due to this limitation

## Standard User Prompt

When the app needs to be running and isn't:

```
================================================================================
ACTION REQUIRED: Start Platform.Bible
================================================================================

Please run this command in your terminal:

    npm start

Wait for:
1. The Platform.Bible window to appear (30-60 seconds)
2. Terminal shows "Compiled successfully"

Let me know when it's ready.
================================================================================
```

## Wait-for-Ready Pattern

When user has started the app and you need to wait:

```bash
# Wait up to 2 minutes
for i in {1..24}; do
  R=$(curl -s -m 2 http://localhost:1212 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
  W=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")

  if [ "$R" = "UP" ] && [ "$W" = "UP" ]; then
    echo "Platform.Bible is ready!"
    break
  fi

  echo "Waiting... Renderer: $R, WebSocket: $W ($i/24)"
  sleep 5
done
```

## See Also

- [SKILL.md](SKILL.md) - Main app-runner skill documentation
- [reference.md](reference.md) - Process architecture details
- [../visual-verification/SKILL.md](../visual-verification/SKILL.md) - Visual verification skill
- [../papi-client/SKILL.md](../papi-client/SKILL.md) - WebSocket API skill
- [../../scripts/preflight-check.sh](../../scripts/preflight-check.sh) - Pre-flight check script
