---
name: app-runner
description: "[paranext-core ONLY] Manage Platform.Bible application lifecycle autonomously - start, stop, restart, and recover. Claude has full authority over app lifecycle. No user intervention required for starting the app. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read
---

# App Runner Skill

Manage Platform.Bible application lifecycle autonomously. Claude has **full authority** to start, stop, and restart the application.

## Repository Path

This skill runs from the paranext-core repository root:

```bash
PARANEXT_CORE_REPO=$(git rev-parse --show-toplevel 2>/dev/null)
# Fail explicitly if path could not be resolved
: "${PARANEXT_CORE_REPO:?Error: Could not determine paranext-core path}"
```

All commands below assume you are in `$PARANEXT_CORE_REPO`.

## Primary Command: `./refresh.sh`

For all start/restart operations, use the refresh script:

```bash
cd "$PARANEXT_CORE_REPO"
./refresh.sh
```

This script:
- Stops any running instance
- Rebuilds the project
- Starts with CDP enabled on port 9223 (headless via `xvfb-run` on Linux; visible window on macOS)
- Waits for all three ports (1212, 8876, 9223) to be ready
- Takes ~30-120 seconds depending on what needs rebuilding

**Use `./refresh.sh` for**: Starting app, restarting after code changes, recovering from crashes, preparing for visual verification.

## Stop Application

```bash
cd "$PARANEXT_CORE_REPO"
npm stop
```

## Responsibility Matrix

| Task | Claude Action |
|------|---------------|
| Start app | `./refresh.sh` |
| Restart app | `./refresh.sh` |
| Stop app | `npm stop` |
| Visual verification | `./refresh.sh` if not running, then verify |
| PAPI queries | `./refresh.sh` if not running, then query |
| Log inspection | Read log files directly (no app needed) |
| Running tests | `npm test` / `dotnet test` |

## Quick Status Check

Always check if the app is already running before any action:

```bash
RENDERER=$(curl -s -m 2 http://localhost:1212 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
WEBSOCKET=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
CDP=$(curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1 && echo "UP" || echo "DOWN")

echo "Renderer (1212): $RENDERER"
echo "WebSocket (8876): $WEBSOCKET"
echo "CDP Debug (9223): $CDP"
```

### Interpreting Status

| Renderer | WebSocket | CDP | State | Action |
|----------|-----------|-----|-------|--------|
| DOWN | DOWN | DOWN | Not running | Run `./refresh.sh` |
| UP | DOWN | DOWN | Starting | Wait 10-30s, or run `./refresh.sh` |
| UP | UP | DOWN | No CDP | Run `./refresh.sh` to enable CDP |
| UP | UP | UP | **Ready** | All operations available |

## Auto-Start Pattern

If detection shows the app is not running, start it:

```bash
cd "$PARANEXT_CORE_REPO"

WEBSOCKET=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
CDP=$(curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1 && echo "UP" || echo "DOWN")

if [ "$WEBSOCKET" = "DOWN" ] || [ "$CDP" = "DOWN" ]; then
  echo "App not ready. Starting..."
  ./refresh.sh
fi
```

## PAPI Recovery

When PAPI commands fail, restart and retry:

```bash
cd "$PARANEXT_CORE_REPO"
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  # Try PAPI command
  RESULT=$( (echo '{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}'; sleep 3) | websocat ws://localhost:8876 2>&1 )

  if echo "$RESULT" | grep -q '"result"'; then
    echo "PAPI command succeeded"
    break
  fi

  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "PAPI failed (attempt $RETRY_COUNT/$MAX_RETRIES). Restarting..."
  ./refresh.sh
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
  echo "ERROR: PAPI unresponsive after $MAX_RETRIES restart attempts"
fi
```

## Individual Processes (Debugging Only)

For specific debugging scenarios only:

| Process | Command | Port | Use Case |
|---------|---------|------|----------|
| Full app | `./refresh.sh` | 1212, 8876, 9223 | Normal development, visual verification |
| Renderer only | `npm run start:renderer` | 1212 | Fast UI iteration (no PAPI) |
| Main only | `npm run start:main` | - | Main process debugging |
| Data provider | `npm run start:data` | - | C# backend debugging |

## Ports Reference

| Port | Service | Required For |
|------|---------|--------------|
| 1212 | Webpack Dev Server | Hot-reload, development builds |
| 8876 | WebSocket (PAPI) | papi-client skill, API queries |
| 9223 | Chrome DevTools Protocol (CDP) | visual-verification skill, screenshots |
| 5858 | Node.js Inspector | Debugging main process |

## Troubleshooting

### Port Already in Use

```bash
lsof -i :1212
lsof -i :8876
lsof -ti:1212 | xargs kill -9
```

### Zombie Processes

```bash
pkill -f electron; pkill -f webpack
./refresh.sh
```

### App Started But Not Responding

1. Check logs with `log-inspector` skill
2. Run `./refresh.sh` to restart cleanly

## See Also

- [reference.md](reference.md) - Detailed process architecture
- [app-state-detection.md](app-state-detection.md) - Shared detection patterns
- [log-inspector skill](../log-inspector/SKILL.md) - Debug app issues via logs
- [visual-verification skill](../visual-verification/SKILL.md) - Visual verification
- [papi-client skill](../papi-client/SKILL.md) - API queries
