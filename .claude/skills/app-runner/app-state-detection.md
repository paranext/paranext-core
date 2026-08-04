# Platform.Bible App State Detection

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

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

*visual-verification works headless via Playwright-over-CDP (port 9223) — no visible window or `claude --chrome` required; see the visual-verification skill.

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

## Claude-Started Apps (headless CDP)

Claude may start the app itself with `./.erb/scripts/refresh.sh` — it runs the app
under `xvfb-run` with `--remote-debugging-port=9223`, so there is no visible window
by design, and that is fine:

| Scenario | What Works |
|----------|------------|
| Claude starts app (refresh.sh) | WebSocket API (PAPI) **and** visual verification via CDP screenshots |
| User starts app (`npm start`) | Everything, with a visible window |

### Recommended Approach

1. **Always check** if app is already running before any action
2. **For visual verification**: use the visual-verification skill over CDP (port 9223) — works against Claude-started headless apps
3. Ask the user to start the app manually only when they need to see or drive the window themselves

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
