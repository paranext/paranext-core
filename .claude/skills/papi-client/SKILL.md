---
name: papi-client
description: "[paranext-core ONLY] Send JSON-RPC requests to the Platform.Bible WebSocket API (PAPI). Use for service discovery, executing commands, querying project data, and debugging. Requires app to be running (GUI visibility not required). NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read
---

# PAPI Client Skill

Send JSON-RPC requests to the Platform.Bible WebSocket API for debugging, testing, and automation.

## Prerequisites

### 1. websocat Required

This skill requires `websocat` for WebSocket communication:

```bash
# Check if available
which websocat || echo "websocat not found - please install"

# macOS
brew install websocat

# Linux (via cargo)
cargo install websocat
```

If `websocat` is not available, ask the user to install it before proceeding.

### 2. Platform.Bible Must Be Running

**REQUIRED**: The WebSocket server runs on port 8876 as part of Platform.Bible.

The user must start Platform.Bible in their terminal. Claude CANNOT reliably start GUI applications.

## Connection Check (Do This First!)

**Before ANY PAPI requests, verify the WebSocket server is available:**

```bash
# Quick check
if curl -s -m 2 http://localhost:8876 > /dev/null 2>&1; then
  echo "PAPI WebSocket server is available"
else
  echo "PAPI WebSocket server is NOT available"
fi
```

### If WebSocket Server is NOT Available

**Provide this message to the user:**

```
================================================================================
PAPI CLIENT REQUIRES PLATFORM.BIBLE

The WebSocket server at localhost:8876 is not responding.
Please start Platform.Bible in your terminal:

    ./.erb/scripts/refresh.sh

Wait for the script to complete (shows "Platform.Bible is ready").

Let me know when it's ready, and I'll retry the PAPI command.
================================================================================
```

**WAIT for user confirmation, then verify:**

```bash
# Verify after user says ready
curl -s -m 2 http://localhost:8876 > /dev/null && echo "Verified: PAPI available" || echo "Still not responding"
```

## Headless Operation Note

PAPI client can work even if the GUI window is not visible, as long as the WebSocket server is running on port 8876. However, the app must still be started.

## Connection Timing (IMPORTANT)

The PAPI WebSocket server requires the connection to stay open while processing requests. Simple piping (`echo | websocat`) closes the connection too quickly, resulting in empty responses.

**Pattern for reliable requests:**

```bash
# WRONG - connection closes before response arrives
echo '{"jsonrpc":"2.0","id":1,"method":"...","params":[]}' | websocat ws://localhost:8876

# CORRECT - sleep keeps connection open for response
(echo '{"jsonrpc":"2.0","id":1,"method":"...","params":[]}'; sleep 1) | websocat ws://localhost:8876
```

**Sleep duration guidelines:**
- Simple commands: `sleep 1`
- Data queries: `sleep 2`
- Large responses (rpc.discover): `sleep 3` + save to file

## Quick Reference

| Action | Command |
|--------|---------|
| Check if app running | `curl -s http://localhost:8876 > /dev/null && echo "Running" \|\| echo "Stopped"` |
| Get OS platform | `(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.getOSPlatform","params":[]}'; sleep 1) \| websocat ws://localhost:8876` |
| Get all projects | `(echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForAllProjects","params":[{}]}'; sleep 2) \| websocat ws://localhost:8876` |
| **Discover all methods** | See "Working with Large Responses" section below |

## Working with Large Responses

The `rpc.discover` response is ~80KB+ (OpenRPC schema with 300+ methods). It requires special handling:

1. **Save to a file** (too large for inline processing)
2. **Use grep or Python for parsing** (the schema contains embedded newlines that can break `jq`)

### Save and Query Schema

```bash
# Step 1: Save the full schema to a temporary file
(echo '{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}'; sleep 3) \
  | websocat ws://localhost:8876 > /tmp/papi-schema.json

# Step 2: Extract method names using grep (most reliable)
grep -o '"name":"[^"]*"' /tmp/papi-schema.json | sed 's/"name":"//g' | sed 's/"//g' | grep '^command:' | head -20
grep -o '"name":"[^"]*"' /tmp/papi-schema.json | sed 's/"name":"//g' | sed 's/"//g' | grep '^object:' | head -20

# Count methods by type
echo "Commands: $(grep -o '"name":"command:[^"]*"' /tmp/papi-schema.json | wc -l)"
echo "Objects: $(grep -o '"name":"object:[^"]*"' /tmp/papi-schema.json | wc -l)"
```

### Parse with Python (for detailed queries)

If you need to parse the full schema structure, use Python (handles embedded newlines):

```bash
python3 << 'PYEOF'
import json, re
with open('/tmp/papi-schema.json', 'r') as f:
    content = f.read().strip()
# Fix embedded newlines in JSON strings
fixed = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"',
               lambda m: m.group(0).replace('\n', '\\n'), content, flags=re.DOTALL)
data = json.loads(fixed)
# List command methods
for m in data['result']['methods']:
    if m['name'].startswith('command:'):
        print(m['name'])
PYEOF
```

**Tip**: For common operations, call methods directly rather than parsing the full schema. See "Platform Commands" section below.

## Method Discovery (OpenRPC)

**IMPORTANT**: PAPI methods are dynamic - they change as extensions load/unload. The `rpc.discover` method returns an OpenRPC 1.2.6 schema.

### Open Interactive API Docs

The easiest way to explore methods is via the OpenRPC playground:

```bash
# Opens OpenRPC playground in your browser
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.openDeveloperDocumentationUrl","params":[]}'; sleep 1) | websocat ws://localhost:8876
```

### Method Categories

Methods follow the `category:directive` naming pattern:

| Category | Prefix | Example |
|----------|--------|---------|
| Command | `command:` | `command:platform.quit` |
| Network Object | `object:` | `object:ProjectLookupService.getMetadataForAllProjects` |
| Dialog | `dialog:` | `dialog:showDialog` |
| WebView | `webView:` | `webView:getWebView` |

See [reference.md](reference.md) for full protocol documentation.

## Checking Connection

Always verify the app is running before sending requests:

```bash
# Quick check - WebSocket server available
curl -s http://localhost:8876 > /dev/null && echo "App running" || echo "Start app first with: ./.erb/scripts/refresh.sh"

# Check if port is in use
lsof -i :8876
```


## Platform Commands

### Safe (Read-Only)

```bash
# Get OS platform ("win32", "darwin", "linux")
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.getOSPlatform","params":[]}'; sleep 1) | websocat ws://localhost:8876

# Get current log file content
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.getLogFileContent","params":[]}'; sleep 2) | websocat ws://localhost:8876

# Check if in full screen mode
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.isFullScreen","params":[]}'; sleep 1) | websocat ws://localhost:8876
```

### UI Modification

```bash
# Increase zoom by 10%
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.zoomIn","params":[]}'; sleep 1) | websocat ws://localhost:8876

# Decrease zoom by 10%
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.zoomOut","params":[]}'; sleep 1) | websocat ws://localhost:8876
```

### Destructive Commands

**Use with caution - these affect the running application:**

```bash
# Restart extension host (extensions will reload)
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.restartExtensionHost","params":[]}'; sleep 1) | websocat ws://localhost:8876

# Restart the entire application
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.restart","params":[]}'; sleep 1) | websocat ws://localhost:8876

# Close the application
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.quit","params":[]}'; sleep 1) | websocat ws://localhost:8876
```

## Network Object Queries

Query data from registered network objects:

```bash
# Get metadata for all projects
(echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForAllProjects","params":[{}]}'; sleep 2) | websocat ws://localhost:8876

# Pretty print project list
(echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForAllProjects","params":[{}]}'; sleep 2) | websocat ws://localhost:8876 | jq '.result'

# Get metadata for a specific project (replace <projectId>)
(echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForProject","params":["<projectId>"]}'; sleep 2) | websocat ws://localhost:8876
```

## Response Handling

### Success Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": <data>
}
```

Extract the result with `jq`:
```bash
(echo '...'; sleep 1) | websocat ws://localhost:8876 | jq '.result'
```

### Error Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Method not found"
  }
}
```

Check for errors:
```bash
(echo '...'; sleep 1) | websocat ws://localhost:8876 | jq 'if .error then "Error: " + .error.message else .result end'
```

## Common Workflows

### Debug Project Discovery

```bash
# 1. Verify app is running
curl -s http://localhost:8876 > /dev/null && echo "App running" || exit 1

# 2. Check how many methods are registered (save schema to file first)
(echo '{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}'; sleep 3) | websocat ws://localhost:8876 > /tmp/papi-schema.json
echo "Commands: $(grep -o '"name":"command:[^"]*"' /tmp/papi-schema.json | wc -l)"
echo "Objects: $(grep -o '"name":"object:[^"]*"' /tmp/papi-schema.json | wc -l)"

# 3. List all projects
(echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForAllProjects","params":[{}]}'; sleep 2) | websocat ws://localhost:8876 | jq '.result'
```

### Check Application State

```bash
# Get platform info
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.getOSPlatform","params":[]}'; sleep 1) | websocat ws://localhost:8876

# Get recent logs
(echo '{"jsonrpc":"2.0","id":1,"method":"command:platform.getLogFileContent","params":[]}'; sleep 2) | websocat ws://localhost:8876 | jq -r '.result' | tail -50
```

## Troubleshooting

### Empty Response / No Output

The WebSocket connection closes before receiving the response. **Use the sleep pattern:**

```bash
# WRONG - closes too quickly
echo '{"jsonrpc":"2.0",...}' | websocat ws://localhost:8876

# CORRECT - sleep keeps connection open
(echo '{"jsonrpc":"2.0",...}'; sleep 1) | websocat ws://localhost:8876
```

### Response Truncated / jq Parse Error

For large responses (like `rpc.discover`), the output may be cut off or contain embedded newlines that break `jq`. **Save to file and use grep:**

```bash
# Save to file
(echo '{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}'; sleep 3) \
  | websocat ws://localhost:8876 > /tmp/response.json

# Use grep to extract method names (more reliable than jq for this schema)
grep -o '"name":"[^"]*"' /tmp/response.json | sed 's/"name":"//g' | sed 's/"//g'
```

See "Working with Large Responses" section for full parsing with Python.

### Connection Refused

```bash
# Check if app is running
ps aux | grep -E "(electron|ParanextDataProvider)" | grep -v grep

# Check if port 8876 is in use
lsof -i :8876
```

**If not running, ask the user to start the app:**

```
Platform.Bible is not running. Please start it in your terminal:
    ./.erb/scripts/refresh.sh
Let me know when it's ready.
```

### Method Not Found (-32601)

1. Save the schema: `(echo '{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}'; sleep 3) | websocat ws://localhost:8876 > /tmp/schema.json`
2. Search for the method: `grep -o '"name":"[^"]*"' /tmp/schema.json | grep "yourmethod"`
3. Check method name format: `category:directive`
4. Commands need `command:` prefix, network objects need `object:` prefix

### websocat Not Found

Install websocat:
```bash
# macOS
brew install websocat

# Linux (requires Rust/cargo)
cargo install websocat

# Or download binary from: https://github.com/vi/websocat/releases
```

## See Also

- [reference.md](reference.md) - Protocol details and method catalog
- [app-runner skill](../app-runner/SKILL.md) - Start/stop the application
- [log-inspector skill](../log-inspector/SKILL.md) - Analyze application logs
