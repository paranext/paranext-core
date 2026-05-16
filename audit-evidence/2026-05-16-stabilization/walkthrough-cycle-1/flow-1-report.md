# Walkthrough Cycle 1 - Flow 1 Report

**Date:** 2026-05-16
**Sub-agent dispatch:** D.flow-1 (first walkthrough dispatch of Block D)
**Flow ref:** `user-walkthrough-script.md` Flow 1
**App restart:** SUCCESS — clean restart via `./.erb/scripts/refresh.sh`; PAPI/CDP/Renderer ports all UP; PAPI ping returned `"linux"` immediately. FN-009 R2+R4 changes loaded.

## Test environment

- Project used: `OHEBGRK` ("Combined HEB and GRK", language `Ancient Greek`). No Hebrew-only OT project exists in the available project list. OHEBGRK has both Hebrew OT and Greek NT books, so it satisfies the "Hebrew project at GEN 1" intent (Hebrew text renders for Genesis). The Open Hebrew Living NT (`OHD`) - though tagged language `Hebrew` - is NT-only and returned "This book does not exist in this resource" for Genesis 1.
- Editor webViewId: `98d4e66f-9950-4900-f431-464d51a212c8`
- ER webViewId after open: `68e64489-5754-47cd-8ba2-5be09f7b14de`
- ER resourceId: `ESV16UK+`

## Flow 1 step-by-step

### Step 1: Open editor at GEN 1 on Hebrew project

- **Expect:** editor renders; BCV shows "Genesis 1".
- **Observed:** editor pane rendered Hebrew Genesis 1 text (right-to-left script, full chapter visible); BCV combobox displayed "Genesis 1:1". Tab labelled "OHEBGRK".
- **Verdict:** PASS.
- **Screenshot:** `flow-1-step-1-editor-only.png`.

### Step 2: Invoke `platformEnhancedResources.openEnhancedResource`

- **Expect:** ER pane opens beside editor; default tab Dictionary; default dictionary SDBH (Hebrew).
- **Observed:**
  - ER tab opened (as separate tab via `webView:onDidAddWebView` event; `layout.type:"tab"`).
  - Default tab = Dictionary (tab-panel `er-dictionary-tab-panel` had `aria-selected="true"`; ER showed the dictionary content area).
  - Default dictionary = "SDBH (HEBREW)" (confirmed via `data-testid="dictionary-tab"` text-content).
  - **Caveat / observation:** ER scripture pane defaulted to `resourceId: "ESV16UK+"` (English Standard Version), not to the Hebrew text of the source editor. The dictionary picked SDBH (Hebrew) but the visible scripture pane in ER is the English ESV. The walkthrough script's "Expect: same chapter content visible" (Step 3) is partially ambiguous: same chapter (Genesis 1) but a different translation. Sebastian PR-140 source-of-truth review will determine whether this is correct behavior; flagging as observation, NOT a defect.
  - Command response time: ~3s (sleep included; actual PAPI command latency ~ms).
  - Title in PAPI payload contained literal localization placeholder `"%platformEnhancedResources_title_enhancedResource%"` - but UI tab rendered as "Enhanced Resource" (localization applied at render). NOT a defect; the placeholder is the canonical title string at the metadata level.
- **Verdict:** PASS (default tab + default dictionary both as expected; scripture-pane translation behavior flagged as observation, not defect).
- **Screenshot:** `flow-1-step-2-er-open.png`.

### Step 3: Verify scripture pane mirrors editor reference

- **Expect:** same chapter content visible in ER scripture pane. DOM check: marble-word annotation count > 0.
- **Observed:**
  - ER scripture pane displayed Genesis 1 content (English ESV with the title "The Creation of the World"). Chapter = Genesis 1, same as editor reference. Translation differs (see Step 2 caveat).
  - DOM marble-word check: 454 elements matched `[class*=marble]`. Annotation count >> 0.
  - BCV combobox inside ER frame read "Genesis 1:1" - matching editor.
- **Verdict:** PASS.
- **Screenshot:** `flow-1-step-3-scripture-mirror.png`.

## Watch-list observations

### Console / main-process log errors

Discovered in `~/.config/Electron/logs/main.log` during the flow-1 window (18:48 - 18:50):

1. **50x `"Failed to find start or end node of the annotation."`** errors emitted from `[rend]` at `renderer.dev.js:22565:24` during ER pane open (clustered at 18:49:57.865 - 18:49:57.879, all within 50ms). Pre-existing errors from the same source also appeared at 18:48:48 - 18:48:49 during initial editor render. Looks like a renderer-side annotation lookup that fails for some marble annotations whose start/end DOM nodes haven't yet been mounted or don't exist.

2. **1x unhandled promise rejection** at 18:48:57 in extension-host:

   ```
   Unhandled promise rejection in extension host, reason: "Timeout reached when waiting for platformScriptureEditor.selection.6c304fd9-26dc-43cc-b87c-7bb0b3021621 to settle"
   ```

   Timed out waiting for selection-data-provider on the editor webview. Suggests a race between PT9-fidelity Selection settling and the ER open flow (or test instrumentation querying selection before it's ready).

3. **Iframe sandbox warnings** (`[rend] An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing`) - pre-existing platform-level warning when web-views mount. NOT a defect of this feature.

4. **USJ version mismatch warnings** - "USJ provided has version 3.1, but provided markers map has version 3.0.7". Pre-existing. Not a new walkthrough finding.

5. **Contenteditable + display:flex warning** - pre-existing. Not a defect.

### Performance / UX

- No flicker observed during ER open (screenshot at +1500ms post-command).
- No click-handler > 200ms violation logged.
- No layout shift observed (compared step-1 and step-2 screenshots side-by-side).
- Hover latency not measured (Flow 1 has no hover step).
- Popover positioning not exercised in Flow 1.

## D-NN entries produced

| ID    | Description                                                                                                                                                                                           | Layer                | Evidence                                      |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------- |
| D-008 | 50x renderer error "Failed to find start or end node of the annotation" at ER open (renderer.dev.js:22565) - annotation start/end DOM node lookup failing for marble annotations during initial mount | UI                   | flow-1-step-2-er-open.png + log excerpt above |
| D-009 | Unhandled promise rejection in extension-host: "Timeout reached when waiting for platformScriptureEditor.selection.<webViewId> to settle" during ER open flow                                         | UI (or infra/timing) | flow-1-step-2-er-open.png + log excerpt above |

## Files

- `flow-1-step-1-editor-only.png`
- `flow-1-step-2-er-open.png`
- `flow-1-step-3-scripture-mirror.png`
- `flow-1-report.md` (this file)
