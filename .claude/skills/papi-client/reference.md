# PAPI Client Reference

## Protocol Overview

Platform.Bible uses JSON-RPC 2.0 over WebSocket for inter-process communication between the Main process, Renderer, Extension Host, and .NET Data Provider.

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process (Electron)               │
│  • WebSocket server on port 8876                         │
│  • Routes messages between processes                     │
└────────────────┬────────────────────────────────────────┘
                 │ JSON-RPC over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
└────────────┘ └────────────┘ └─────────────────┘
```

### Connection Details

| Property | Value |
|----------|-------|
| Protocol | WebSocket |
| Host | localhost |
| Port | 8876 |
| URL | `ws://localhost:8876` |
| Authentication | None (localhost trust model) |

## Message Formats

### Request Message

```json
{
  "jsonrpc": "2.0",
  "id": <number | string>,
  "method": "<category>:<directive>",
  "params": [...]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `jsonrpc` | string | Always `"2.0"` |
| `id` | number/string | Unique request identifier |
| `method` | string | Method name in `category:directive` format |
| `params` | array | Method parameters (always an array) |

### Success Response

```json
{
  "jsonrpc": "2.0",
  "id": <matching request id>,
  "result": <any>
}
```

### Error Response

```json
{
  "jsonrpc": "2.0",
  "id": <matching request id>,
  "error": {
    "code": <number>,
    "message": "<string>",
    "data": <optional any>
  }
}
```

### Notification (Event)

Notifications are one-way messages without an `id` field:

```json
{
  "jsonrpc": "2.0",
  "method": "<eventType>",
  "params": [<eventData>]
}
```

## Method Categories

Methods follow the `category:directive` naming pattern:

| Category | Prefix | Purpose | Example |
|----------|--------|---------|---------|
| Command | `command:` | Execute platform/extension commands | `command:platform.quit` |
| Network Object | `object:` | Call methods on registered objects | `object:ProjectLookupService.getMetadataForAllProjects` |
| Dialog | `dialog:` | Show dialogs | `dialog:showDialog` |
| WebView | `webView:` | Manage web views | `webView:getWebView` |
| Extension Service | `extensionService:` | Extension services | Extension-specific |
| Extension Asset | `extensionAsset:` | Get extension assets | `extensionAsset:getExtensionAsset` |
| Scroll Group | `scrollGroup:` | Scroll synchronization | Scroll coordination |

### Special Methods

These methods don't follow the `category:directive` pattern:

| Method | Purpose |
|--------|---------|
| `rpc.discover` | Get OpenRPC schema with all registered methods |
| `network:registerMethod` | Register a new method handler |
| `network:unregisterMethod` | Unregister a method handler |

## Platform Commands Reference

### Safe (Read-Only)

| Method | Description | Returns |
|--------|-------------|---------|
| `command:platform.getOSPlatform` | Get operating system | `"win32"`, `"darwin"`, or `"linux"` |
| `command:platform.getLogFileContent` | Get current log content | string |
| `command:platform.isFullScreen` | Check full screen mode | boolean |

### UI Modification

| Method | Description |
|--------|-------------|
| `command:platform.zoomIn` | Increase zoom by 10% |
| `command:platform.zoomOut` | Decrease zoom by 10% |

### Destructive

| Method | Description | Warning |
|--------|-------------|---------|
| `command:platform.quit` | Close the application | Terminates all processes |
| `command:platform.restart` | Restart the application | All state is lost |
| `command:platform.restartExtensionHost` | Restart extension host | Extensions reload |

### Utility

| Method | Description |
|--------|-------------|
| `command:platform.openDeveloperDocumentationUrl` | Open OpenRPC docs in browser |
| `command:platform.openWindow` | Open URL in default browser |

## Network Object Services

### ProjectLookupService

| Method | Parameters | Description |
|--------|------------|-------------|
| `getMetadataForAllProjects` | `[{}]` | Get all project metadata |
| `getMetadataForProject` | `["<projectId>"]` | Get specific project metadata |
| `areProjectIdsEqual` | `["<id1>", "<id2>"]` | Compare project IDs |
| `filterProjectsMetadata` | `[<options>]` | Filter projects by criteria |

## Error Codes

Standard JSON-RPC 2.0 error codes:

| Code | Name | Description |
|------|------|-------------|
| -32700 | ParseError | Invalid JSON received |
| -32600 | InvalidRequest | Missing required fields |
| -32601 | MethodNotFound | Method not registered |
| -32602 | InvalidParams | Wrong parameter types/count |
| -32603 | InternalError | Server-side exception |

### Retry Behavior

When receiving `MethodNotFound` (-32601), the platform automatically retries up to 10 times with 1-second delays. This handles race conditions during startup when methods are still being registered.

## Service Discovery (OpenRPC)

The `rpc.discover` method returns an OpenRPC 1.2.6 schema:

```json
{
  "openrpc": "1.2.6",
  "info": {
    "title": "Live PAPI documentation",
    "version": "<app version>",
    "description": "..."
  },
  "servers": [...],
  "methods": [
    {
      "name": "methodName",
      "summary": "...",
      "params": [...],
      "result": {...}
    }
  ],
  "components": {...}
}
```

### Extracting Method Information

```bash
# Get method count
... | jq '.result.methods | length'

# List all method names
... | jq -r '.result.methods[].name'

# Filter by category
... | jq -r '.result.methods[].name | select(startswith("command:"))'

# Get method details
... | jq '.result.methods[] | select(.name == "command:platform.quit")'
```

## Security Model

### Localhost Trust

- WebSocket server only accepts connections from localhost
- No authentication tokens required for process-to-process communication
- Assumes all local connections are trusted (controlled by Electron)

### Extension Isolation

- Extensions use execution tokens for isolated storage
- Tokens are SHA256 hashed with type, name, and nonce
- Not relevant for external clients connecting via WebSocket

### Method Ownership

- Only the connection that registered a method can unregister it
- Methods are automatically cleaned up when connections close
- Prevents hijacking of method handlers

## Serialization Notes

- Uses custom serialization from `platform-bible-utils`
- `null` values from network are converted to `undefined` internally
- Exception: `null` in `result` field is preserved per JSON-RPC spec
- Arrays and objects should be JSON-formatted

## Timeout Configuration

- Default request timeout: 30 seconds
- Configurable per request type via settings
- Maximum retry attempts: 10 with 1-second intervals

## Source Files

Key implementation files in the codebase:

| File | Purpose |
|------|---------|
| `src/shared/data/rpc.model.ts` | Constants, message creation, serialization |
| `src/main/main.ts` | Platform command registrations |
| `src/main/services/rpc-websocket-listener.ts` | WebSocket server, OpenRPC schema |
| `src/client/services/rpc-client.ts` | Client implementation |
| `src/shared/models/openrpc.model.ts` | OpenRPC schema types |

## Common Patterns

This section documents multi-step PAPI patterns that are non-obvious but commonly needed.

### Get Project Name (Two-Step Lookup)

Project names are stored in project settings, not in the project metadata. Getting a human-readable name requires:

1. Get the Project Data Provider (PDP) ID from the project ID
2. Query the `platform.name` setting from that PDP

```bash
# Step 1: Get PDP ID for a project
PROJECT_ID="32664DC3288A28DF2E2BB75DED887FC8F17A15FB"
PDP_ID=$((echo "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"object:platform.Paratext-pdpf.getProjectDataProviderId\",\"params\":[\"$PROJECT_ID\"]}"; sleep 2) | websocat ws://localhost:8876 | jq -r '.result')

# Step 2: Query project name setting
(echo "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"object:${PDP_ID}.getSetting\",\"params\":[\"platform.name\"]}"; sleep 2) | websocat ws://localhost:8876
# Returns: {"jsonrpc":"2.0","id":1,"result":"WEB"}
```

### List All Projects with Names

Combine project discovery with name resolution:

```bash
# Get all project IDs, then resolve names
for PROJECT_ID in $((echo '{"jsonrpc":"2.0","id":1,"method":"object:ProjectLookupService.getMetadataForAllProjects","params":[{}]}'; sleep 2) | websocat ws://localhost:8876 | jq -r '.result[].id'); do
  # Skip lexical resources (SDBG, SDBH) - they don't have Paratext PDPs
  if [[ "$PROJECT_ID" == "SDBG" || "$PROJECT_ID" == "SDBH" ]]; then
    echo "$PROJECT_ID (Lexical Resource)"
    continue
  fi
  PDP_ID=$((echo "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"object:platform.Paratext-pdpf.getProjectDataProviderId\",\"params\":[\"$PROJECT_ID\"]}"; sleep 2) | websocat ws://localhost:8876 | jq -r '.result')
  NAME=$((echo "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"object:${PDP_ID}.getSetting\",\"params\":[\"platform.name\"]}"; sleep 2) | websocat ws://localhost:8876 | jq -r '.result')
  echo "$NAME ($PROJECT_ID)"
done
```

### Common Project Settings

Use `object:{pdpId}.getSetting` with these keys for Paratext projects:

| Setting Key | Description | Example Value |
|-------------|-------------|---------------|
| `platform.name` | Human-readable project name | `"WEB"` |
| `platformScripture.booksPresent` | Which books exist in the project | `"GEN,EXO,..."` |
| `platformScripture.versification` | Versification scheme | `"English"` |

## Agent Convention: Adding New Patterns

Agents using this skill may discover new useful patterns during their work. When this happens, consider adding them to this section.

### When to Document a Pattern

**DO document if:**
- It requires multiple PAPI calls to achieve a common goal
- The method parameters are non-obvious (like `[{}]` for empty options)
- It solves a task that agents will commonly need
- The discovery process took trial and error

**DON'T document if:**
- It's a one-off edge case unlikely to be reused
- The method is obvious from its name and takes standard parameters
- It's already covered by existing documentation

### How to Add a Pattern

1. Add a new subsection under "Common Patterns"
2. Include a brief description of what it achieves
3. Provide a working bash example with comments
4. Note any prerequisites (e.g., "requires Paratext project, not lexical resources")
5. Use the sleep pattern for reliable responses
