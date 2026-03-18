---
name: visual-verification
description: "[paranext-core ONLY] Visual verification and UI interaction for Platform.Bible using Playwright over CDP. REQUIRED for Component Builder agent. Use to take screenshots, click buttons, fill inputs, inspect DOM, navigate menus, and verify UI. Requires app started with remote debugging enabled. NOT for use in PT9/legacy Paratext codebases."
---

# Visual Verification Skill

Visual verification and **full UI interaction** for Platform.Bible using Playwright connected via CDP (Chrome DevTools Protocol) to the Electron renderer.

## Architecture Overview

This skill provides three levels of access:

1. **Playwright Interaction Server (`pw-server.mjs`)** — Full UI interaction: click, fill, type, press, scroll, screenshot, eval, frame switching. Connects via CDP port 9223 using Playwright's `connectOverCDP`. **Preferred for all interaction.**
2. **CDP Helper (`cdp-helper.sh`)** — Lightweight screenshots and JS eval via raw CDP/websocat. No Playwright dependency. **Fallback for quick screenshots.**
3. **PAPI WebSocket (port 8876)** — Send commands via `papi-client` skill. **For triggering app-level actions (open dialogs, settings, etc.).**

## Prerequisites

### Remote Debugging Enabled

**REQUIRED**: Platform.Bible must be started with remote debugging enabled:

```bash
./refresh.sh
```

This script stops, builds, and starts Platform.Bible with CDP enabled on port 9223.

## Pre-Flight Check (MANDATORY)

**Before ANY visual verification work, run this check:**

```bash
# Check if Platform.Bible is running with debugging enabled
RENDERER=$(curl -s -m 2 http://localhost:1212 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
CDP=$(curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1 && echo "UP" || echo "DOWN")
WEBSOCKET=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")

echo "Renderer (1212): $RENDERER"
echo "CDP Debug (9223): $CDP"
echo "WebSocket (8876): $WEBSOCKET"

if [ "$RENDERER" = "UP" ] && [ "$CDP" = "UP" ] && [ "$WEBSOCKET" = "UP" ]; then
  echo "Platform.Bible is running with debugging - ready for visual verification"
elif [ "$RENDERER" = "UP" ] && [ "$CDP" = "DOWN" ]; then
  echo "Platform.Bible is running but debugging NOT enabled"
  echo "Restart with: ./refresh.sh"
else
  echo "Platform.Bible is NOT running - cannot proceed"
fi
```

### If App is NOT Running or CDP is DOWN

**Use the `app-runner` skill to start the app autonomously.** Claude has full authority over app lifecycle — no user intervention is required.

```bash
# Use app-runner skill to start Platform.Bible with CDP enabled
# The app-runner skill automatically passes MAIN_ARGS="--remote-debugging-port=9223"
# and waits for all three ports (1212, 8876, 9223) to be ready
```

After `app-runner` completes, verify CDP is available:

```bash
# Verify app is ready with debugging
if curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1; then
  echo "Verified: Platform.Bible is ready for visual verification"
else
  echo "FATAL: CDP still unavailable after app-runner. BLOCKED."
  echo "This is a stop condition — cannot proceed without CDP."
fi
```

**If CDP is still unavailable after `app-runner`**: This is a **BLOCKING** condition. Do NOT skip visual verification. Set status to BLOCKED and escalate.

## Quick Reference

| Action | Method |
|--------|--------|
| **Click a button** | `pw-interact.sh '{"cmd":"click","role":"button","name":"Save"}'` |
| **Fill an input** | `pw-interact.sh '{"cmd":"fill","selector":"input","text":"Genesis"}'` |
| **Take screenshot** | `pw-interact.sh '{"cmd":"screenshot","output":"/tmp/ss.png"}'` |
| **Check visibility** | `pw-interact.sh '{"cmd":"visible","role":"dialog"}'` |
| **Quick verify** | `quick-verify.sh "[selector]" <output-dir> [filename]` |
| Screenshot (lightweight) | `cdp-helper.sh screenshot /tmp/output.png` |
| Execute JavaScript | `pw-interact.sh '{"cmd":"eval","code":"document.title"}'` |
| Send PAPI command | Use `papi-client` skill |
| Read app logs | Use `log-inspector` skill |

All scripts are in `.claude/skills/visual-verification/scripts/`.

## UI Interaction via Playwright (`pw-server.mjs`)

The Playwright interaction server connects to the running app via CDP and provides full UI interaction — clicking, typing, scrolling, waiting for elements, and screenshotting.

### Single Command

```bash
# Single command (connects, runs, disconnects)
.claude/skills/visual-verification/scripts/pw-interact.sh '{"cmd":"click","role":"menuitem","name":"Help"}'
```

### Multi-Command Sequence (Recommended)

For sequences of actions, pipe multiple commands to `pw-server.mjs`. This uses a **single connection** and is much faster.

```bash
echo '{"cmd":"click","role":"menuitem","name":"Help"}
{"cmd":"wait-ms","ms":500}
{"cmd":"click","role":"menuitem","name":"About Platform.Bible"}
{"cmd":"wait","selector":".dock-tab","hasText":"About","timeout":10000}
{"cmd":"screenshot","output":"/tmp/about-dialog.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

Each command produces one JSON line on stdout. Stderr has server log messages.

### Command Reference

#### Navigation and Clicks

| Command | Description | Example |
|---------|-------------|---------|
| `click` | Click by role/selector/text | `{"cmd":"click","role":"button","name":"Save"}` |
| `dblclick` | Double-click | `{"cmd":"dblclick","selector":".item"}` |
| `hover` | Hover over element | `{"cmd":"hover","role":"menuitem","name":"File"}` |

#### Text Input

| Command | Description | Example |
|---------|-------------|---------|
| `fill` | Set input value (clears first) | `{"cmd":"fill","selector":"input","text":"Gen"}` |
| `type` | Type char-by-char (triggers events) | `{"cmd":"type","selector":"input","text":"Gen","delay":50}` |
| `press` | Press keyboard key | `{"cmd":"press","key":"Enter"}` |

#### Waiting

| Command | Description | Example |
|---------|-------------|---------|
| `wait` | Wait for element state | `{"cmd":"wait","role":"dialog","timeout":10000}` |
| `wait-ms` | Wait fixed time | `{"cmd":"wait-ms","ms":1000}` |

#### Reading State

| Command | Description | Example |
|---------|-------------|---------|
| `text` | Get element textContent | `{"cmd":"text","selector":".title"}` |
| `inner-text` | Get element innerText | `{"cmd":"inner-text","selector":".content"}` |
| `value` | Get input value | `{"cmd":"value","selector":"input"}` |
| `visible` | Check if visible | `{"cmd":"visible","role":"button","name":"Save"}` |
| `count` | Count matching elements | `{"cmd":"count","selector":".dock-tab"}` |
| `attribute` | Get attribute value | `{"cmd":"attribute","selector":"#theme-styles","attr":"data-theme-id"}` |
| `locators` | List matching elements (debug) | `{"cmd":"locators","role":"button","limit":10}` |

#### Screenshots, Eval, and Accessibility

| Command | Description | Example |
|---------|-------------|---------|
| `screenshot` | Capture screenshot | `{"cmd":"screenshot","output":"/tmp/ss.png"}` |
| `eval` | Execute JS in renderer | `{"cmd":"eval","code":"document.title"}` |
| `snapshot` | AX tree with interactive element refs | `{"cmd":"snapshot"}` |
| `annotated-screenshot` | Screenshot with numbered badges | `{"cmd":"annotated-screenshot","output":"/tmp/ann.png"}` |
| `click-ref` | Click element by ref from last snapshot | `{"cmd":"click-ref","ref":"@ref3"}` |

#### Scrolling

| Command | Description | Example |
|---------|-------------|---------|
| `scroll` | Scroll element | `{"cmd":"scroll","selector":".content","down":500}` |

#### Frame Switching

| Command | Description | Example |
|---------|-------------|---------|
| `frame` | Switch to iframe | `{"cmd":"frame","selector":"iframe","url":"extension"}` |
| `frame-by-title` | Switch to iframe by title | `{"cmd":"frame-by-title","title":"Home"}` |
| `frame-reset` | Return to main page | `{"cmd":"frame-reset"}` |
| `frames` | List all frames (with titles) | `{"cmd":"frames"}` |

#### Accessibility Snapshot & Annotated Screenshots

These commands let agents discover and target UI elements without knowing selectors in advance.

**`snapshot`** — Returns the accessibility tree filtered to interactive elements, each assigned an ephemeral `@refN` label.

| Parameter | Default | Description |
|-----------|---------|-------------|
| `roles` | all interactive | Array of ARIA roles to include (e.g. `["button","textbox"]`) |
| `limit` | 100 | Max elements to return |

```bash
echo '{"cmd":"snapshot"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
# → {"cmd":"snapshot","count":12,"elements":[{"ref":"@ref1","role":"button","name":"Save",...},...]
```

**`annotated-screenshot`** — Takes a screenshot with red numbered badges and outlines on interactive elements, plus a JSON mapping.

| Parameter | Default | Description |
|-----------|---------|-------------|
| `output` | `/tmp/pw-annotated.png` | Screenshot path |
| `roles` | all interactive | Array of ARIA roles to include |
| `limit` | 50 | Max elements to annotate |

```bash
echo '{"cmd":"annotated-screenshot","output":"/tmp/annotated.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
# → {"cmd":"annotated-screenshot","path":"/tmp/annotated.png","count":12,"annotations":[...]}
```

**`click-ref`** — Click an element by its `@refN` from the last `snapshot` or `annotated-screenshot`.

```bash
echo '{"cmd":"snapshot"}
{"cmd":"click-ref","ref":"@ref3"}
{"cmd":"screenshot","output":"/tmp/after-click.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Typical workflow** — Discover elements, view annotated screenshot, then click:

```bash
echo '{"cmd":"annotated-screenshot","output":"/tmp/annotated.png"}
{"cmd":"click-ref","ref":"@ref1"}
{"cmd":"wait-ms","ms":500}
{"cmd":"screenshot","output":"/tmp/after-click.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Notes:**
- Refs are ephemeral — they reset on each `snapshot` or `annotated-screenshot` call
- Works in sub-frames: badge positions account for iframe offset
- CDP session is created per-command (not long-lived) to avoid stale sessions
- Hidden or zero-size elements are automatically skipped

#### Other

| Command | Description | Example |
|---------|-------------|---------|
| `select` | Select dropdown option | `{"cmd":"select","selector":"select","option":"English"}` |
| `check` | Check checkbox | `{"cmd":"check","selector":"input[type=checkbox]"}` |
| `uncheck` | Uncheck checkbox | `{"cmd":"uncheck","selector":"input[type=checkbox]"}` |
| `status` | Server connection info | `{"cmd":"status"}` |
| `quit` | Disconnect and exit | `{"cmd":"quit"}` |

### Locator Resolution

Commands accept these locator parameters (in priority order):

1. **`selector`** — CSS selector: `{"selector": ".dock-tab"}`. Can combine with `hasText` for filtering.
2. **`role`** + optional **`name`** — ARIA role locator: `{"role": "button", "name": "Save"}`. Names are case-insensitive regex.
3. **`text`** — Text content locator: `{"text": "About"}`. Case-insensitive regex.

### Common Interaction Patterns

```bash
# Open Help → About dialog
echo '{"cmd":"click","role":"menuitem","name":"Help"}
{"cmd":"wait-ms","ms":300}
{"cmd":"click","role":"menuitem","name":"About Platform.Bible"}
{"cmd":"wait","selector":".dock-tab","hasText":"About"}
{"cmd":"screenshot","output":"/tmp/about.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null

# Search for a book in the book/chapter selector
echo '{"cmd":"click","selector":"[aria-label=book-chapter-trigger]"}
{"cmd":"wait-ms","ms":300}
{"cmd":"fill","selector":"[data-radix-popper-content-wrapper] input","text":"Genesis"}
{"cmd":"wait-ms","ms":500}
{"cmd":"screenshot","output":"/tmp/book-search.png"}
{"cmd":"press","key":"Escape"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null

# Close the active tab (return to Home)
echo '{"cmd":"click","selector":".dock-tab.dock-tab-active .dock-tab-close-btn"}
{"cmd":"wait-ms","ms":500}
{"cmd":"screenshot","output":"/tmp/after-close.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null

# Check theme and toggle it
echo '{"cmd":"attribute","selector":"#theme-styles","attr":"data-theme-id"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

### Working with WebView Iframes

All Platform.Bible web views render inside `about:srcdoc` iframes with unique `title` attributes (e.g., "Home", "wgPIDGIN (Editable)", "RH2 (Editable)", "Checks"). Since they all share the same URL (`about:srcdoc`), URL-based frame matching does not work.

**Use `frame-by-title` to enter specific web view frames:**

```bash
echo '{"cmd":"frame-by-title","title":"Home"}
{"cmd":"visible","selector":".title-bar"}
{"cmd":"screenshot","output":"/tmp/home-webview.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Important notes:**
- `pw-interact.sh` creates a fresh connection per call, so **frame context is lost between calls**. Use `pw-server.mjs` pipelines for multi-step iframe interaction.
- The first line of `pw-server.mjs` output is always `{"cmd":"connected",...}` — responses to your commands start at line 2.
- Use `{"cmd":"frames"}` to discover available frames and their titles.

#### Disambiguation

- **Multiple matching elements**: Use `nth=N` (zero-indexed) in selector or `:has-text('text')` filter
- **Multiple iframes**: Use `frame-by-title` (not `frame` with URL, since all webviews are `about:srcdoc`)

#### Platform.Bible UI Layout

Understanding which elements live in the **main frame** vs inside **webview iframes** is critical — selectors targeting the wrong frame will never match.

**Main frame** (no frame switching needed):
- **Tabs**: `.dock-tab:has-text("Home")`, `.dock-tab:has-text("Checks")`
- **BookChapter triggers**: `button[aria-label="book-chapter-trigger"]` — one on the main toolbar plus one per open webview. Use `>> nth=0` for toolbar, `>> nth=1` for the second editor's, etc.
- **Webview hamburger menus**: `button[aria-label="Project"]` — one per open webview, same `nth=N` indexing.
- **Top-level menu bar**: Platform, Help menu items
- **BookChapter popover**: `[data-radix-popper-content-wrapper]` (search input and results)
- **Tab close buttons**: `.dock-tab-close-btn` div inside each `.dock-tab`. Close active tab: `.dock-tab.dock-tab-active .dock-tab-close-btn`. Close all non-Home tabs: `.dock-tab` filtered by `hasNotText: 'Home'`, then `.dock-tab-close-btn` inside.

**Inside webview iframes** (must `frame-by-title` first):
- **Editor content**: contenteditable div, verse markers (`span.verse[data-number="5"]`)
- **Home project list**: target rows with `tr:has-text("ProjectName") button:has-text("Open")`
- **Checks panel controls**: check type dropdown, results list
- **Extension-specific UI elements**

#### Contenteditable Editors

`fill` and `type` commands do NOT work on contenteditable editors (they are not `<input>` elements). Use this approach instead:

1. Switch to the editor iframe with `frame-by-title`
2. Click a verse marker (`span.verse[data-number="N"]`) to focus nearby
3. Use `eval` with the Selection API to place the cursor precisely:
   ```json
   {"cmd":"eval","code":"const v = document.querySelector('span.verse[data-number=\"5\"]'); const t = v.nextSibling; const r = document.createRange(); r.setStart(t, 1); r.collapse(true); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);"}
   ```
4. Use individual `press` commands for each character:
   ```json
   {"cmd":"press","key":"H"}
   {"cmd":"press","key":"e"}
   {"cmd":"press","key":"l"}
   {"cmd":"press","key":"l"}
   {"cmd":"press","key":"o"}
   ```

#### WebView Interaction Example

```bash
# Navigate BookChapter to Genesis 3, then screenshot
echo '{"cmd":"click","selector":"button[aria-label=\"book-chapter-trigger\"]"}
{"cmd":"wait-ms","ms":300}
{"cmd":"fill","selector":"[data-radix-popper-content-wrapper] input","text":"Genesis"}
{"cmd":"wait-ms","ms":500}
{"cmd":"click","selector":"[data-radix-popper-content-wrapper] >> text=/^3$/"}
{"cmd":"wait-ms","ms":500}
{"cmd":"screenshot","output":"/tmp/genesis-3.png"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Note**: BookChapter triggers and the popover are in the **main frame** — do NOT switch into a webview iframe first.

## Quick Verify Command

Run all visual verification checks in one command:

```bash
# Default filename (verify-YYYYMMDD-HHMMSS.png):
.claude/skills/visual-verification/scripts/quick-verify.sh '[data-testid="my-component"]' \
  .context/features/{feature}/proofs/component-evidence/

# Custom filename (for iteration-planner compatibility):
.claude/skills/visual-verification/scripts/quick-verify.sh '[data-testid="my-component"]' \
  .context/features/{feature}/proofs/component-evidence/ \
  UI-PKG-001-render-verification.png
```

**IMPORTANT**: The output directory argument is required. Optional third argument specifies the screenshot filename (defaults to `verify-YYYYMMDD-HHMMSS.png`).

### Output

- CDP status check
- DOM element existence
- Console error check
- Screenshot capture

### Exit Codes

- `0` = PASS (all checks passed)
- `1` = FAIL (one or more checks failed)

## CDP Helper Script

The CDP helper script provides direct access to the Electron renderer:

```bash
# Location
.claude/skills/visual-verification/scripts/cdp-helper.sh

# Take screenshot
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/screenshot.png

# Execute JavaScript in renderer context
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.title"
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "window.location.href"
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.my-element').textContent"

# Get page info
.claude/skills/visual-verification/scripts/cdp-helper.sh info

# List all available debug targets
.claude/skills/visual-verification/scripts/cdp-helper.sh list
```

## Workflow: Visual Verification

### 1. Pre-Flight Check (FIRST!)

**Always check before starting:**

```bash
curl -s -m 2 http://localhost:9223/json > /dev/null && echo "Ready" || echo "Not running with debugging - use app-runner skill"
```

If not running with debugging, use the `app-runner` skill to start the app.

### 2. Interact with UI

Use `pw-server.mjs` to interact with the app directly — click buttons, navigate menus, fill forms:

```bash
# Open a dialog via menu click
echo '{"cmd":"click","role":"menuitem","name":"Help"}
{"cmd":"click","role":"menuitem","name":"About Platform.Bible"}
{"cmd":"wait","selector":".dock-tab","hasText":"About"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null

# Or trigger via PAPI (using papi-client skill) for commands with no UI element
```

### 3. Take Screenshot

```bash
# Via interaction server (preferred — can combine with other commands)
.claude/skills/visual-verification/scripts/pw-interact.sh '{"cmd":"screenshot","output":"/tmp/screenshot.png"}'

# Via CDP helper (lightweight fallback)
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/screenshot.png
```

### 4. Compare to Golden Master

Visual comparison checklist:

- [ ] Layout matches PT9 golden master
- [ ] Colors and styling correct
- [ ] Text content matches
- [ ] Icons and images present
- [ ] Spacing and alignment correct

Golden masters are in:
`.context/features/{feature}/golden-masters/`

### 5. Document Differences

If there are intentional differences from PT9, document them:

```markdown
## Visual Differences from PT9

1. **Button styling**: Using Platform.Bible design system colors
2. **Font**: Using system font instead of PT9 custom font
3. **Icons**: Using Lucide icons instead of PT9 custom icons
```

## DOM Inspection

### Query Elements via JavaScript

Use the CDP helper to query DOM elements:

```bash
# Check if element exists
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('[data-testid=\"save-button\"]') !== null"

# Get element text
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.title').textContent"

# Get element count
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelectorAll('.list-item').length"

# Check element visibility
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "getComputedStyle(document.querySelector('.modal')).display"
```

### Common Selectors

Platform.Bible uses consistent patterns:

```css
/* Test IDs */
[data-testid="component-name"]

/* Component classes */
.papi-button
.papi-input
.papi-select

/* Layout sections */
#main-content
#sidebar
#toolbar
```

## Console Log Inspection

For console logs and errors, use the `log-inspector` skill which reads from the app's log files.

Alternatively, check console via CDP:

```bash
# This requires additional CDP setup for console message capture
# Prefer using log-inspector skill instead
```

## Integration with Component Builder

### Required Workflow for Component Builder Agent

1. **Pre-flight check**: Verify app is running with debugging (see above)
   - If not running: Use `app-runner` skill (Claude has full authority)

2. **Interact with UI and verify state** using `pw-server.mjs`:
   ```bash
   echo '{"cmd":"screenshot","output":"/tmp/initial-state.png"}
   {"cmd":"click","role":"button","name":"Open Project"}
   {"cmd":"wait","role":"dialog","timeout":10000}
   {"cmd":"screenshot","output":"/tmp/dialog-open.png"}
   {"cmd":"fill","selector":"input","text":"Test Project"}
   {"cmd":"screenshot","output":"/tmp/form-filled.png"}
   {"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
   ```

3. **Milestone screenshots**:
   - Initial render
   - Loading state
   - Populated state
   - After interactions (clicks, form fills)
   - Error state (if applicable)

4. **Check logs for errors** (using log-inspector skill)

5. **Compare to golden masters**

6. **Document visual verification results**

## Golden Master Comparison

### Location

Golden masters are stored in:

```
.context/features/{feature}/golden-masters/
├── scenario-001/
│   ├── screenshot.png      # PT9 screenshot
│   ├── input.json          # Test data
│   └── metadata.json       # Scenario description
└── scenario-002/
    └── ...
```

### Comparison Process

1. Load PT9 golden master screenshot
2. Take screenshot of PT10 implementation via CDP
3. Compare visually:
   - Same layout structure?
   - Same visual hierarchy?
   - Same content?
4. Document any intentional differences

### Acceptable Differences

Some differences are expected between PT9 and PT10:

| Category | PT9 | PT10 | Acceptable? |
|----------|-----|------|-------------|
| Design system | WinForms | React + Tailwind | Yes |
| Icons | Custom | Lucide/shadcn | Yes |
| Fonts | MS fonts | System fonts | Yes |
| Behavior | Identical | Identical | Required |
| Data | Identical | Identical | Required |

## No Graceful Degradation — Visual Verification is MANDATORY

**VIS-SKIP is deprecated and MUST NOT be used.** Visual verification is a blocking requirement for all UI work packages.

If CDP is not available:

1. **Use `app-runner` skill** to start Platform.Bible with CDP enabled (Claude has full authority)
2. **If `app-runner` fails after 3 attempts**: Set status to **BLOCKED** and escalate
3. **NEVER skip visual verification** — a UI component that hasn't been verified rendering is not complete

Any verdict containing `VIS-SKIP` or visual verification listed under `non_blocking_issues` is **invalid** and must be rejected.

## Troubleshooting

### CDP Not Available

Error: "Cannot connect to CDP on port 9223"

Solution: Restart Platform.Bible with remote debugging:
```bash
./refresh.sh
```

### No Platform.Bible Renderer Found

Error: "No Platform.Bible renderer found. Is the app running?"

1. **Check if app is fully started**:
   ```bash
   .claude/skills/visual-verification/scripts/cdp-helper.sh list
   ```
   This shows all available debug targets.

2. **If no targets, app not running**:
   ```bash
   ps aux | grep -E "(electron|webpack)" | grep -v grep
   ```

3. **If processes exist but CDP fails**, app may still be starting. Wait for "Compiled successfully".

### Screenshot Fails or Shows Blank Screen

**First action: Restart the app.** Blank screenshots almost always mean the app needs a full rebuild:

```bash
./refresh.sh
```

After restart:
1. Re-open the web view via PAPI command
2. Wait 2 seconds for UI to render
3. Re-capture the screenshot

If still blank after restart:
1. Check that the renderer target is available:
   ```bash
   .claude/skills/visual-verification/scripts/cdp-helper.sh info
   ```
2. Use `log-inspector` skill to check for extension loading errors
3. Verify the web view provider is registered correctly in manifest.json

### websocat or jq Not Found

Install the required tools:

```bash
# macOS
brew install websocat jq

# Linux
cargo install websocat
apt install jq
```

## Benefits of CDP Approach

- **Screenshots show actual app state** (not a separate browser instance)
- **No service registration conflicts** (WebViewService, DialogService work correctly)
- **PAPI commands affect the visible UI** (commands via papi-client reflect in screenshots)
- **Simpler architecture** (no Chrome browser needed, no `claude --chrome` flag required)
- **Works with existing skills** (papi-client for commands, log-inspector for logs)

## See Also

- [reference.md](reference.md) - CDP command details
- [visual-verification.md](visual-verification.md) - Detailed verification workflow
- [papi-client skill](../papi-client/SKILL.md) - Send PAPI commands
- [app-runner skill](../app-runner/SKILL.md) - Check app status and guide user
- [log-inspector skill](../log-inspector/SKILL.md) - Debug issues via logs
