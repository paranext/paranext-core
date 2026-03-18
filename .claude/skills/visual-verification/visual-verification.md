# Visual Verification Workflow

Detailed workflow for comparing PT10 implementation against PT9 golden masters using CDP (Chrome DevTools Protocol).

## Pre-Verification Checklist

Before starting visual verification:

- [ ] Platform.Bible running with CDP enabled (use `app-runner` skill - it enables CDP automatically)
- [ ] CDP responding on port 9223 (`curl -s http://localhost:9223/json`)
- [ ] PAPI WebSocket responding on port 8876
- [ ] websocat and jq installed (`which websocat jq`)
- [ ] Golden masters available in `.context/features/{feature}/golden-masters/`
- [ ] Feature implementation complete
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] Tests passing (`npm test`)

**Note**: The `app-runner` skill now automatically starts Platform.Bible with `--remote-debugging-port=9223`, so you don't need to manually specify this flag.

## Step-by-Step Verification

### Step 1: Verify CDP Connection

```bash
# Check CDP is available
curl -s -m 2 http://localhost:9223/json > /dev/null && echo "CDP Ready" || echo "CDP Not Available"

# List available targets
.claude/skills/visual-verification/scripts/cdp-helper.sh list

# Get renderer info
.claude/skills/visual-verification/scripts/cdp-helper.sh info
```

If CDP is not available, use the `app-runner` skill to start or restart the app. It automatically enables CDP on port 9223.

### Step 2: Load Golden Master Reference

1. Open the golden master directory:
   ```
   .context/features/{feature}/golden-masters/
   ```

2. Review each scenario:
   ```
   scenario-001/
   ├── screenshot.png      # PT9 visual reference
   ├── input.json          # Test data to reproduce
   └── metadata.json       # Scenario description
   ```

3. Note key visual elements to verify:
   - Layout structure
   - Component placement
   - Visual styling
   - Text content
   - Interactive elements

### Step 3: Prepare Test Data

If the golden master includes `input.json`:

1. Load the test data into the app (via PAPI commands using papi-client skill)
2. Or use the same data generation approach

Example `input.json`:
```json
{
  "projectId": "test-project-001",
  "books": ["GEN", "EXO"],
  "settings": {
    "showNotes": true,
    "fontSize": 14
  }
}
```

### Step 4: Trigger UI State

Use papi-client skill to send commands that set up the desired UI state:

```bash
# Example: Use papi-client skill to:
# - Open a specific dialog
# - Navigate to a view
# - Load test data
```

Wait for the UI to update before capturing.

### Step 5: Capture Screenshot

```bash
# Take screenshot of current state
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/verification/scenario-001.png
```

Compare against `screenshot.png` from golden master.

### Step 6: Systematic Comparison

#### Layout Comparison

| Aspect | PT9 (Golden Master) | PT10 (Current) | Match? |
|--------|---------------------|----------------|--------|
| Header position | | | |
| Sidebar width | | | |
| Content area | | | |
| Footer | | | |

#### Component Comparison

| Component | PT9 | PT10 | Match? | Notes |
|-----------|-----|------|--------|-------|
| Buttons | | | | |
| Inputs | | | | |
| Lists | | | | |
| Tables | | | | |

#### Visual Style Comparison

| Style | PT9 | PT10 | Match? | Notes |
|-------|-----|------|--------|-------|
| Colors | | | | |
| Typography | | | | |
| Spacing | | | | |
| Borders | | | | |
| Icons | | | | |

### Step 7: DOM Verification

Use CDP to verify DOM structure matches expectations:

```bash
# Verify key elements exist
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('[data-testid=\"main-content\"]') !== null"

# Check element counts
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelectorAll('.list-item').length"

# Verify text content
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.querySelector('.header-title').textContent"
```

### Step 8: Test Interactions (via PAPI)

For each interactive element in the golden master:

1. **Identify the interaction** from behavior catalog
2. **Trigger the action** using papi-client skill:
   ```bash
   # Use papi-client to send appropriate command
   ```
3. **Wait for UI update**:
   ```bash
   sleep 1
   ```
4. **Capture result**:
   ```bash
   .claude/skills/visual-verification/scripts/cdp-helper.sh screenshot /tmp/verification/after-action.png
   ```
5. **Check logs** for errors (use log-inspector skill)
6. **Compare** to expected behavior

### Step 9: Test Edge Cases

Verify edge case handling matches PT9:

| Edge Case | Expected Behavior | Actual Behavior | Match? |
|-----------|-------------------|-----------------|--------|
| Empty data | | | |
| Single item | | | |
| Maximum items | | | |
| Invalid input | | | |
| Network error | | | |

### Step 10: Document Results

Create verification report:

```markdown
# Visual Verification Report: {Feature}

## Date: {date}
## Verifier: {agent/human}

## Summary
- Scenarios verified: {count}
- Matching: {count}
- Intentional differences: {count}
- Issues found: {count}

## Scenario Results

### Scenario 001: {Description}

**Golden Master**: scenario-001/screenshot.png
**PT10 Screenshot**: /tmp/verification/scenario-001.png

**Comparison**:
- Layout: ✅ Matches
- Styling: ⚠️ Different colors (intentional - using Platform.Bible design system)
- Content: ✅ Matches
- Interactions: ✅ All working

**DOM Verification**:
- Main content present: ✅
- List items count: ✅ (5 expected, 5 found)
- Header text: ✅

**Console Output**: No errors (checked via log-inspector)

---

### Scenario 002: {Description}
...

## Intentional Differences

| Difference | Reason | Approved By |
|------------|--------|-------------|
| Button colors | Platform.Bible design system | Design team |
| Icon set | Using Lucide icons | Consistency |

## Issues Found

| Issue | Severity | Description | Resolution |
|-------|----------|-------------|------------|
| None | - | - | - |

## Conclusion

✅ Visual verification PASSED
```

## Common Issues and Resolutions

### Layout Mismatch

**Symptom**: Components in different positions

**Check**:
1. CSS flexbox/grid settings
2. Component order in JSX
3. Responsive breakpoints

**Resolution**: Adjust CSS to match PT9 layout

### Styling Differences

**Symptom**: Colors, fonts, spacing differ

**Check**:
1. Are differences intentional (design system)?
2. Are base styles applied?
3. Are theme variables correct?

**Resolution**:
- Intentional: Document and get approval
- Unintentional: Fix styling

### Missing Content

**Symptom**: Text or elements missing

**Check**:
1. Is data loading correctly?
2. Are conditional renders working?
3. Use log-inspector to check for errors

**Resolution**: Debug data flow

### Interaction Failure

**Symptom**: PAPI command doesn't affect UI

**Check**:
1. Is the command correct?
2. Is the handler registered?
3. Check logs for errors

**Resolution**: Debug PAPI command handling

## Verification Approval

### Approval Criteria

For visual verification to pass:

1. **Layout**: Must match PT9 golden master structure
2. **Content**: Must display same data correctly
3. **Interactions**: Must behave identically to PT9
4. **Console**: No errors (warnings acceptable with justification)
5. **Differences**: All intentional differences documented and approved

### Approval Process

1. Complete verification report
2. Attach all screenshots
3. Document all differences
4. Get human approval for intentional differences
5. Report verification results to orchestrating command

### Rejection Criteria

Verification fails if:

- Layout fundamentally different without approval
- Content missing or incorrect
- Interactions broken
- Errors in logs
- Undocumented differences exist

## CDP Helper Commands Reference

```bash
# Screenshot
.claude/skills/visual-verification/scripts/cdp-helper.sh screenshot <output-path>

# Execute JavaScript
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "<code>"

# Get page info
.claude/skills/visual-verification/scripts/cdp-helper.sh info

# List targets
.claude/skills/visual-verification/scripts/cdp-helper.sh list
```

## Troubleshooting

### CDP Not Responding

```bash
# Check if app is running with debugging
curl -s http://localhost:9223/json

# If not responding, use app-runner skill to start/restart
# The app-runner skill automatically enables CDP on port 9223
```

### Screenshot Blank or Wrong

```bash
# Check which page is loaded
.claude/skills/visual-verification/scripts/cdp-helper.sh info

# Verify document is ready
.claude/skills/visual-verification/scripts/cdp-helper.sh exec "document.readyState"
```

### PAPI Commands Not Affecting UI

1. Use papi-client skill to verify command is received
2. Check log-inspector for errors
3. Verify the command handler is registered
