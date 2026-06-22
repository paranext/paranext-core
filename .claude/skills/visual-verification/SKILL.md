---
name: visual-verification
description: "[paranext-core ONLY] Visual verification and UI interaction for Platform.Bible using Playwright over CDP. Use to take screenshots, click buttons, fill inputs, inspect DOM, navigate menus, and verify UI. Requires app started with remote debugging enabled. NOT for use in PT9/legacy Paratext codebases."
---

# Visual Verification Skill

Visual verification and **full UI interaction** for Platform.Bible using Playwright connected via CDP (Chrome DevTools Protocol) to the Electron renderer.

## Architecture Overview

This skill provides two levels of access:

1. **Playwright Interaction Server (`pw-server.mjs`)** — Full UI interaction: click, fill, type, press, scroll, screenshot, eval, frame switching. Connects via CDP port 9223 using Playwright's `connectOverCDP`. **Preferred for all interaction.**
2. **PAPI WebSocket (port 8876)** — Send commands via `papi-client` skill. **For triggering app-level actions (open dialogs, settings, etc.).**

## Prerequisites

### Remote Debugging Enabled

**REQUIRED**: Platform.Bible must be started with remote debugging enabled:

```bash
./.erb/scripts/refresh.sh
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
  echo "Restart with: ./.erb/scripts/refresh.sh"
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

### Common Command and Parameter Pitfalls

A few parameter names have intuitive-but-wrong alternatives:

| Command | Param to use | Common wrong guess |
|---------|--------------|--------------------|
| `screenshot` | `output` | ~~`path`~~ |
| `eval` | `code` | ~~`expression`~~ |

**Don't confuse `wait` with `wait-ms`** — these are two different commands, not a parameter variant:

- `wait` waits for an **element state** (takes a locator + optional `timeout`, `hasText`, etc.). Use it to block until an element appears, becomes visible, etc.
- `wait-ms` is a **fixed-duration sleep** (takes `ms`). Use it as a deliberate pause.

Writing `{"cmd":"wait","ms":500}` does not produce a 500 ms delay — the `ms` field is ignored and the command will fail or hang waiting for a locator that wasn't supplied.

If a command silently no-ops or rejects with a generic error, double-check the command and parameter spelling against the tables above.

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
- **Tabs**: `.dock-tab:has-text("Home")`, `.dock-tab:has-text("Checks")`. New web-view tabs always appear here regardless of which iframe triggered them.
- **BookChapter triggers**: `button[aria-label="book-chapter-trigger"]` — one on the main toolbar plus one per open webview. Use `>> nth=0` for toolbar, `>> nth=1` for the second editor's, etc.
- **Dock-tab project menus**: `button[aria-label="Project"]` — small (~2 items: "Open Project Settings", "Settings"), one per open webview's tab. **NOT the editor's full hamburger** — see "Scripture Editor Hamburger Menu" below for that.
- **Top-level menu bar**: Platform, Help menu items
- **BookChapter popover**: `[data-radix-popper-content-wrapper]` (search input and results)
- **Tab close buttons**: `.dock-tab-close-btn` div inside each `.dock-tab`. Close active tab: `.dock-tab.dock-tab-active .dock-tab-close-btn`. Close all non-Home tabs: `.dock-tab` filtered by `hasNotText: 'Home'`, then `.dock-tab-close-btn` inside.

**Inside webview iframes** (must `frame-by-title` first):
- **Editor content**: contenteditable div, verse markers (`span.verse[data-number="5"]`)
- **Home project list**: target rows with `tr:has-text("ProjectName") button:has-text("Open")` — must `frame-by-title` `"Home"` first.
- **Scripture editor hamburger menu**: `button[aria-label="Project"]` — the full editor hamburger (~15+ items: tools, navigation). See "Scripture Editor Hamburger Menu" below.
- **Checks panel controls**: check type dropdown, results list
- **Extension-specific UI elements**

#### Scripture Editor Hamburger Menu

PT10 tools that need a project context (markers-checklist, markers-inventory, checks-side-panel, etc.) are exposed from the **scripture editor's own hamburger menu**, not from the main app menu. The main app menu only carries project-agnostic items like "Open...", "Settings", "Exit".

**Why**: when a command is fired from a web-view's topMenu, the platform passes the web-view's `webViewId` to the command handler, which reads the active `projectId` from the web-view definition. Main-menu commands get no web-view context.

**Two distinct buttons named "Project"** — they look identical via the CDP accessibility tree:

| Where it lives | What it opens | Use it for |
|---|---|---|
| Main frame (per dock-tab) | Small ~2-item dock-tab menu ("Open Project Settings", "Settings") | NOT for tool launching |
| Inside the editor's iframe | Full topMenu hamburger (~15+ items: tools, navigation, etc.) | Tool launching, project actions |

Always enter the editor's iframe first when you want the full hamburger.

**Iframe titles**: a project opened in Edit mode has iframe title `"{PROJECT_NAME} (Editable)"`; Read-only is `"{PROJECT_NAME} (Read-only)"`. Use a broad `title*="${projectName}" i` plus `title*="Editable" i` (or relax to just the project name if you don't care which mode).

**Menu items render inside the iframe.** Radix's `DropdownMenu` portals to `document.body`, which inside an iframe context means *the iframe's own body* — not the main page. So selectors after the click must also target the iframe.

**Navigation pattern** (open project from Home → click hamburger → click menu item):

```bash
# Assumes the project is already open as a tab. If not, open it from Home first
# (frame-by-title "Home" → click "Open" on the project row).
echo '{"cmd":"frame-by-title","title":"wgPIDGIN (Editable)"}
{"cmd":"click","selector":"button[aria-label=\"Project\"]"}
{"cmd":"wait-ms","ms":300}
{"cmd":"click","role":"menuitem","name":"Markers Checklist"}
{"cmd":"frame-reset"}
{"cmd":"wait","selector":".dock-tab","hasText":"Markers Checklist","timeout":10000}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Debugging**: list the buttons or menu items inside the editor frame:

```bash
# Buttons inside the editor iframe
echo '{"cmd":"frame-by-title","title":"wgPIDGIN (Editable)"}
{"cmd":"eval","code":"Array.from(document.querySelectorAll(\"button\")).map(b => b.getAttribute(\"aria-label\") || b.textContent?.trim()?.slice(0,30))"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null

# Menu items after opening the hamburger
echo '{"cmd":"frame-by-title","title":"wgPIDGIN (Editable)"}
{"cmd":"click","selector":"button[aria-label=\"Project\"]"}
{"cmd":"wait-ms","ms":500}
{"cmd":"eval","code":"Array.from(document.querySelectorAll(\"[role=menuitem]\")).map(e => e.textContent?.trim())"}
{"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
```

**Note**: the newly opened tool's dock-tab is at the **main-page level** (not in any iframe). After clicking the menu item, `frame-reset` and target `.dock-tab` from the main page.

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
  /tmp/component-evidence/

# Custom filename:
.claude/skills/visual-verification/scripts/quick-verify.sh '[data-testid="my-component"]' \
  /tmp/component-evidence/ \
  render-verification.png
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
# Via interaction server (can combine with other commands in a pipeline)
.claude/skills/visual-verification/scripts/pw-interact.sh '{"cmd":"screenshot","output":"/tmp/screenshot.png"}'
```

### 4. Review the Screenshot

Visual review checklist:

- [ ] Layout renders as expected
- [ ] Colors and styling correct
- [ ] Text content correct
- [ ] Icons and images present
- [ ] Spacing and alignment correct

## DOM Inspection

### Query Elements via Playwright

Use `pw-interact.sh` (or `pw-server.mjs` pipelines) to query DOM elements:

```bash
# Check if element exists
pw-interact.sh '{"cmd":"visible","selector":"[data-testid=\"save-button\"]"}'

# Get element text
pw-interact.sh '{"cmd":"text","selector":".title"}'

# Get element count
pw-interact.sh '{"cmd":"count","selector":".list-item"}'

# Check element via JavaScript eval
pw-interact.sh '{"cmd":"eval","code":"getComputedStyle(document.querySelector(\".modal\")).display"}'
```

All commands above use the short form via `pw-interact.sh`. For the full path:
`.claude/skills/visual-verification/scripts/pw-interact.sh`

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

## Verifying a UI Component

A typical verification flow for a UI component:

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

5. **Review the screenshots** against expected appearance and behavior

## If CDP Is Not Available

If CDP is not available:

1. **Use `app-runner` skill** to start Platform.Bible with CDP enabled (Claude has full authority)
2. **If `app-runner` fails after several attempts**: Set status to **BLOCKED** and escalate
3. A UI component that hasn't been verified rendering is not complete

### Reporting language

State exactly what you did and observed — "opened the dialog, typed `p`, confirmed the inline error renders and OK disables" — not a bare "Verified". Never present a passing typecheck/lint/build as visual verification of a runtime-behavior change; those check that code compiles, not that it behaves. If a reviewer asks "did you actually verify anything you built?", treat it as a signal the prior claim was insufficient: tighten it and re-verify.

## Troubleshooting

### CDP Not Available

Error: "Cannot connect to CDP on port 9223"

Solution: Restart Platform.Bible with remote debugging:
```bash
./.erb/scripts/refresh.sh
```

### No Platform.Bible Renderer Found

Error: "No Platform.Bible renderer found. Is the app running?"

1. **List all CDP debug targets** (diagnostic):
   ```bash
   curl -s http://localhost:9223/json | jq .
   ```

2. **If no targets, app not running**:
   ```bash
   ps aux | grep -E "(electron|webpack)" | grep -v grep
   ```

3. **If processes exist but CDP fails**, app may still be starting. Wait for "Compiled successfully".

### Screenshot Fails or Shows Blank Screen

**First action: Restart the app.** Blank screenshots almost always mean the app needs a full rebuild:

```bash
./.erb/scripts/refresh.sh
```

After restart:
1. Re-open the web view via PAPI command
2. Wait 2 seconds for UI to render
3. Re-capture the screenshot

If still blank after restart:
1. Check that the renderer target is available:
   ```bash
   .claude/skills/visual-verification/scripts/pw-interact.sh '{"cmd":"status"}'
   ```
2. Use `log-inspector` skill to check for extension loading errors
3. Verify the web view provider is registered correctly in manifest.json

## Benefits of CDP Approach

- **Screenshots show actual app state** (not a separate browser instance)
- **No service registration conflicts** (WebViewService, DialogService work correctly)
- **PAPI commands affect the visible UI** (commands via papi-client reflect in screenshots)
- **Simpler architecture** (no Chrome browser needed, no `claude --chrome` flag required)
- **Works with existing skills** (papi-client for commands, log-inspector for logs)

## See Also

- [papi-client skill](../papi-client/SKILL.md) - Send PAPI commands
- [app-runner skill](../app-runner/SKILL.md) - Check app status and guide user
- [log-inspector skill](../log-inspector/SKILL.md) - Debug issues via logs
