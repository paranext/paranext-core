# Visual Verification Reference

## CDP (Chrome DevTools Protocol) Overview

This skill uses CDP to directly communicate with the Electron renderer process for visual verification. This provides accurate screenshots and DOM inspection of the actual Platform.Bible app state.

## Prerequisites

### 1. websocat + jq Required

```bash
# Check if available
which websocat jq || echo "Missing tools - please install"

# macOS
brew install websocat jq

# Linux
cargo install websocat  # or apt install websocat
apt install jq
```

### 2. Remote Debugging Enabled

Platform.Bible must be running with CDP (Chrome DevTools Protocol) enabled on port 9223.

**Recommended**: Use the `app-runner` skill which automatically enables CDP when starting the app.

**Manual alternative**:
```bash
./refresh.sh
```

## CDP Helper Script

Location: `.claude/skills/visual-verification/scripts/cdp-helper.sh`

### Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `screenshot` | Capture visible area as PNG | `cdp-helper.sh screenshot /tmp/output.png` |
| `exec` | Execute JavaScript in renderer | `cdp-helper.sh exec "document.title"` |
| `info` | Get page info (URL, title) | `cdp-helper.sh info` |
| `list` | List all debug targets | `cdp-helper.sh list` |

### Screenshot Command

```bash
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot <output-path>
```

Takes a screenshot of the current renderer viewport and saves as PNG.

**Options:**
- Output path must be specified
- Parent directories are created automatically
- Returns file path and size

**Example:**
```bash
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/screenshot.png
# Output: Screenshot saved to: /tmp/screenshot.png
```

### Execute JavaScript Command

```bash
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "<javascript-code>"
```

Executes JavaScript in the Electron renderer context and returns the result.

**Examples:**
```bash
# Get page title
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.title"

# Get current URL
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "window.location.href"

# Check if element exists
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.my-button') !== null"

# Get element text
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.title').textContent"

# Get element count
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelectorAll('.list-item').length"

# Check computed style
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "getComputedStyle(document.querySelector('.modal')).display"

# Get input value
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('input[name=search]').value"

# Check checkbox state
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('input[type=checkbox]').checked"
```

### Info Command

```bash
.claude/skills/visual-verification/scripts/cdp-helper.sh info
```

Returns information about the Platform.Bible renderer:
- Page title
- Current URL
- Target type

**Example output:**
```json
{
  "title": "Platform.Bible",
  "url": "http://localhost:1212/",
  "type": "page"
}
```

### List Command

```bash
.claude/skills/visual-verification/scripts/cdp-helper.sh list
```

Lists all available CDP debug targets. Useful for debugging when the renderer isn't found.

**Example output:**
```json
{
  "type": "page",
  "title": "Platform.Bible",
  "url": "http://localhost:1212/"
}
{
  "type": "service_worker",
  "title": "Extension Service Worker",
  "url": "chrome-extension://xyz/background.js"
}
```

## Common DOM Queries

### Check Element Existence

```bash
# By test ID
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('[data-testid=\"save-button\"]') !== null"

# By class
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.project-list') !== null"

# By ID
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.getElementById('main-content') !== null"
```

### Get Element Content

```bash
# Text content
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.header-title').textContent"

# Inner HTML
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.content').innerHTML.substring(0, 200)"

# Attribute value
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('a.link').getAttribute('href')"
```

### Count Elements

```bash
# Count list items
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelectorAll('.list-item').length"

# Count buttons
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelectorAll('button').length"
```

### Check Visibility

```bash
# Check display style
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "getComputedStyle(document.querySelector('.modal')).display !== 'none'"

# Check visibility style
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "getComputedStyle(document.querySelector('.panel')).visibility === 'visible'"

# Check if in viewport (simplified)
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.element').getBoundingClientRect().top < window.innerHeight"
```

## Platform.Bible Specific Usage

### Target URLs

Platform.Bible runs at:
- Development: `http://localhost:1212`
- Webpack Dev Server: `http://localhost:1212`
- WebSocket PAPI: `ws://localhost:8876`
- CDP Debug: `http://localhost:9223`

### Common Selectors

```css
/* Test IDs (preferred) */
[data-testid="component-name"]

/* Platform components */
.papi-button
.papi-input
.papi-select

/* Layout sections */
#main-content
#sidebar
#toolbar

/* Dialogs */
[role="dialog"]
.dialog-content
.dialog-footer
```

## Visual Verification Workflow

### Standard Process

```bash
# 1. Verify CDP is available
curl -s http://localhost:9223/json > /dev/null && echo "CDP Ready"

# 2. Use papi-client skill to trigger UI state
# (see papi-client skill documentation)

# 3. Take screenshot
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/state-1.png

# 4. Check for errors (use log-inspector skill)
# (see log-inspector skill documentation)

# 5. Compare to golden master
# (manual visual comparison)
```

### Multiple States

Capture different component states:

| State | How to Trigger | Screenshot |
|-------|----------------|------------|
| Default | Initial load | `default.png` |
| Loading | Before data loads | `loading.png` |
| Populated | After data loads | `populated.png` |
| Error | Trigger error condition | `error.png` |
| Empty | No data available | `empty.png` |
| Selected | Click to select | `selected.png` |

## Error Messages

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "No Platform.Bible renderer found" | App not running or wrong target | Run `list` command to see available targets |
| "Error: No Platform.Bible renderer found" | App not started with debugging | Use `app-runner` skill to restart (enables CDP automatically) |
| Connection refused | CDP not available | Use `app-runner` skill to start app with CDP |

### Debugging Tips

```bash
# 1. List all targets to see what's available
.claude/skills/visual-verification/scripts/cdp-helper.sh list

# 2. Get info about the renderer
.claude/skills/visual-verification/scripts/cdp-helper.sh info

# 3. Test with simple command
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "1+1"

# 4. Check if page is loaded
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.readyState"
```

## Integration with Other Skills

### With papi-client

Use papi-client to trigger UI changes, then capture with CDP:

```bash
# 1. Send PAPI command (via papi-client skill)
# Example: Open new project dialog

# 2. Wait for UI to update
sleep 1

# 3. Take screenshot
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/dialog.png
```

### With log-inspector

After capturing screenshots, check for errors:

```bash
# 1. Take screenshot
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/current.png

# 2. Use log-inspector skill to check for errors
# (see log-inspector skill documentation)
```

## Accessibility Snapshot & Annotated Screenshots (pw-server.mjs)

These commands use CDP's `Accessibility.getFullAXTree` to discover interactive elements and assign ephemeral `@refN` labels. No external image libraries required — annotated screenshots inject HTML/CSS overlays into the page.

### `snapshot` Command

Returns the accessibility tree filtered to interactive elements.

**Input:**
```json
{"cmd":"snapshot"}
{"cmd":"snapshot","roles":["button","textbox"],"limit":50}
```

**Output:**
```json
{
  "cmd": "snapshot",
  "count": 12,
  "elements": [
    {"ref":"@ref1","role":"button","name":"Save","focused":false},
    {"ref":"@ref2","role":"textbox","name":"Search","value":"Genesis"}
  ]
}
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `roles` | `string[]` | all interactive roles | Filter to specific ARIA roles |
| `limit` | `number` | 100 | Maximum elements to return |

**Default interactive roles:** button, link, textbox, checkbox, radio, combobox, listbox, menuitem, menuitemcheckbox, menuitemradio, option, searchbox, slider, spinbutton, switch, tab, treeitem

**Element properties returned:** `ref`, `role`, `name`, plus state flags (`focused`, `disabled`, `checked`, `expanded`, `pressed`, `selected`) and `value` when present.

### `annotated-screenshot` Command

Takes a screenshot with red numbered badges and outlines on interactive elements.

**Input:**
```json
{"cmd":"annotated-screenshot","output":"/tmp/annotated.png"}
{"cmd":"annotated-screenshot","output":"/tmp/annotated.png","roles":["button"],"limit":30}
```

**Output:**
```json
{
  "cmd": "annotated-screenshot",
  "path": "/tmp/annotated.png",
  "count": 12,
  "annotations": [
    {"ref":"@ref1","label":1,"role":"button","name":"Save","x":150,"y":200,"width":80,"height":30}
  ]
}
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `output` | `string` | `/tmp/pw-annotated.png` | Screenshot output path |
| `roles` | `string[]` | all interactive roles | Filter to specific ARIA roles |
| `limit` | `number` | 50 | Maximum elements to annotate |

**Overlay styling:** 20px red circles with white numbers, 2px red border outlines. Overlay is injected into the main frame and removed after screenshotting (via `try/finally`).

**Sub-frame support:** When `currentFrame` is a sub-frame, badge positions are offset by the iframe's bounding box coordinates so they appear in the correct position on the full-page screenshot.

### `click-ref` Command

Click an element by its `@refN` from the last `snapshot` or `annotated-screenshot`.

**Input:**
```json
{"cmd":"click-ref","ref":"@ref3"}
```

**Output:**
```json
{"cmd":"click-ref","ref":"@ref3","clicked":true,"x":190,"y":215}
```

**Error (stale or unknown ref):**
```json
{"cmd":"click-ref","error":"Unknown ref \"@ref99\". Run snapshot or annotated-screenshot first."}
```

**Notes:**
- Refs are ephemeral — they reset on each `snapshot` or `annotated-screenshot` call
- Uses CDP `DOM.getBoxModel` to find the element's center coordinates, then `page.mouse.click()`
- Accounts for iframe offset when `currentFrame` is a sub-frame

## Technical Notes

### Dependencies

The CDP helper script requires:
- `websocat` - WebSocket CLI client
- `jq` - JSON processor
- `curl` - HTTP client (usually pre-installed)
- `base64` - Base64 decoder (usually pre-installed)

### Screenshot Format

- Format: PNG
- Quality: 100%
- Captures: Visible viewport only (not scrolled content)
- Source: `Page.captureScreenshot` CDP command

### JavaScript Execution

- Context: Electron renderer process
- Timeout: ~1 second (via sleep in websocat pipe)
- Returns: JSON value or description

## Best Practices

### Screenshot Naming

Use descriptive names:
```
{component}-{state}-{timestamp}.png
settings-panel-populated-20240115.png
project-list-empty-20240115.png
dialog-new-project-open-20240115.png
```

### Wait for Stability

Before screenshots:
```bash
# Wait for document to be ready
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.readyState === 'complete'"

# Wait for specific element
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.loaded-indicator') !== null"
```

### Document Everything

Record in verification report:
- Screenshots taken (with paths)
- DOM queries performed
- Differences noted
- Timestamps
