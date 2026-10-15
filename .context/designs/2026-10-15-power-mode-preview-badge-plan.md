# Power Mode "Preview" Badge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a localized "Preview" badge on the Power option of the Simple / Power switcher in the profile popover (PT-4833).

**Architecture:** One renderer component change (`UserProfilePopover`), one new localize key in `en.json` and `es.json`, and two unit tests. The existing `Badge` from `platform-bible-react` is reused unmodified. No new files, services or settings.

**Tech Stack:** React 19, TypeScript, `platform-bible-react` (`Badge`), Vitest + Testing Library.

**Spec:** [`2026-10-15-power-mode-preview-badge-design.md`](./2026-10-15-power-mode-preview-badge-design.md)

## Global Constraints

- Localize key: `%userProfile_interfaceMode_power_previewBadge%`. en: `"Preview"`, es: `"Preliminar"`.
- Never edit an existing localize key or value (Localization Guide).
- `Badge` `variant="outline"`, `className="user-profile-popover-text-3xs tw:h-4 tw:px-1.5"`, `data-testid="user-profile-interface-mode-power-preview-badge"`.
- Wrapper row classes: `tw:flex tw:flex-wrap tw:items-center tw:gap-1.5`.
- Renderer code gets no Tailwind processing: use only `tw:` classes already rendered in `user-profile-popover.component.tsx` (every class above qualifies).
- No edits under `lib/platform-bible-react/src/components/shadcn-ui/`.
- Verification commands: `npm run lint` and `npm test`. Skip `npm run typecheck` (too slow; lint + build are enough).

## Review Focus

1. **A long translation in a narrow card.** Spanish "Modo avanzado" + "Preliminar" nearly fills the card. Expect the badge to wrap below the label, not overflow or get clipped. Covered by the Spanish screenshot in Task 2.
2. **The selected Power card.** It has a `bg-accent` background and a 2px primary border. Expect the outline badge to stay readable on it in both themes. Covered by the Power × light/dark screenshots in Task 2.
3. **Screen readers.** The badge text joins the Power toggle's accessible name. Expect "Preview" to be announced with the Power option. Covered by the accessible-name assertion in Task 1.
4. **Wrong option.** Expect the badge on Power only, never on Simple. Covered by the "Simple has no badge" assertion in Task 1, which is the reject side of the placement test.
5. **A locale with no translation** (any locale except en/es). Expect the English "Preview" through the fallback chain, not the raw `%…%` key. This needs no extra test: it holds as long as the en entry exists, which Task 1's JSON step adds.

---

### Task 1: Preview badge on the Power option

**Files:**
- Modify: `assets/localization/en.json` (after `%userProfile_interfaceMode_power_label%`)
- Modify: `assets/localization/es.json` (after `%userProfile_interfaceMode_power_label%`)
- Modify: `src/renderer/components/user-profile-popover/user-profile-popover.component.tsx` (imports, `LOCALIZED_STRING_KEYS`, the Power `ToggleGroupItem`)
- Test: `src/renderer/components/user-profile-popover/user-profile-popover.test.tsx`

**Interfaces:**
- Consumes: `Badge` from `platform-bible-react` (`variant`, `className`, `data-testid`, children).
- Produces: DOM test id `user-profile-interface-mode-power-preview-badge`, rendered inside `user-profile-interface-mode-power`. Task 2 uses it to find the badge.

- [ ] **Step 1: Add the key to the test's localized-strings mock**

In `user-profile-popover.test.tsx`, inside the `useLocalizedStrings` mock object, add after the `'%userProfile_interfaceMode_power_description%': 'All panels',` line:

```ts
      '%userProfile_interfaceMode_power_previewBadge%': 'Preview badge',
```

The value is a sentinel that differs from the English "Preview", following the mock's comment, so a hard-coded label would fail the test.

- [ ] **Step 2: Write the failing tests**

Add `within` to the Testing Library import on line 1:

```ts
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
```

Append inside `describe('UserProfilePopover interface mode', () => { … })`, after the last test:

```tsx
  test('marks the Power option, and only the Power option, with the localized Preview badge', () => {
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));

    const powerOption = screen.getByTestId('user-profile-interface-mode-power');
    expect(
      within(powerOption).getByTestId('user-profile-interface-mode-power-preview-badge'),
    ).toHaveTextContent('Preview badge');
    // Screen-reader users get the preview status with the option itself, not as a separate stop.
    expect(powerOption).toHaveAccessibleName(/Preview badge/);
    expect(
      within(screen.getByTestId('user-profile-interface-mode-simple')).queryByText('Preview badge'),
    ).not.toBeInTheDocument();
  });

  test('keeps the Preview badge on the Power option while Power mode is selected', () => {
    setMockSetting('interfaceMode', 'power');
    render(<UserProfilePopover />);
    fireEvent.click(screen.getByTestId('user-profile-popover-trigger'));

    expect(
      within(screen.getByTestId('user-profile-interface-mode-power')).getByTestId(
        'user-profile-interface-mode-power-preview-badge',
      ),
    ).toHaveTextContent('Preview badge');
  });
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/renderer/components/user-profile-popover/user-profile-popover.test.tsx`
Expected: the two new tests FAIL with `Unable to find an element by: [data-testid="user-profile-interface-mode-power-preview-badge"]`. Every existing test still PASSES.

- [ ] **Step 4: Add the localize key to both locale files**

`assets/localization/en.json`, directly after the `"%userProfile_interfaceMode_power_label%": "Power mode",` line:

```json
  "%userProfile_interfaceMode_power_previewBadge%": "Preview",
```

`assets/localization/es.json`, directly after the `"%userProfile_interfaceMode_power_label%": "Modo avanzado",` line:

```json
  "%userProfile_interfaceMode_power_previewBadge%": "Preliminar",
```

- [ ] **Step 5: Render the badge**

In `user-profile-popover.component.tsx`:

1. Add `Badge,` to the `platform-bible-react` import list, before `Button,`.
2. In `LOCALIZED_STRING_KEYS`, add after `'%userProfile_interfaceMode_power_description%',`:

```ts
  '%userProfile_interfaceMode_power_previewBadge%',
```

3. In the Power `ToggleGroupItem` (`value="power"`), replace the label `<span>` (the one rendering `%userProfile_interfaceMode_power_label%`) with:

```tsx
            <span className="tw:flex tw:flex-wrap tw:items-center tw:gap-1.5">
              <span
                className={cn(
                  'user-profile-popover-text-2xs tw:leading-tight tw:font-semibold',
                  safeInterfaceMode === 'power' && 'tw:text-accent-foreground',
                )}
              >
                {localizedStrings['%userProfile_interfaceMode_power_label%']}
              </span>
              <Badge
                variant="outline"
                data-testid="user-profile-interface-mode-power-preview-badge"
                className="user-profile-popover-text-3xs tw:h-4 tw:px-1.5"
              >
                {localizedStrings['%userProfile_interfaceMode_power_previewBadge%']}
              </Badge>
            </span>
```

Leave the description `<span>` and the whole Simple item unchanged.

4. Extend the component's TSDoc so the next reader knows why the badge is there. After the sentence ending "…Paratext-registration buttons in the toolbar.", add:

```tsx
 *
 * The Power option carries a "Preview" badge: Power mode is shipped as a preview, so users should
 * expect missing features rather than read the gaps as bugs.
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- src/renderer/components/user-profile-popover/user-profile-popover.test.tsx`
Expected: all tests PASS, including the two new ones.

- [ ] **Step 7: Revert check**

Temporarily delete the `<Badge …>…</Badge>` element and rerun the Step 6 command. Expected: both new tests FAIL. Restore the element and rerun. Expected: all PASS.

- [ ] **Step 8: Lint**

Run: `npm run lint`
Expected: exit 0, no errors.

- [ ] **Step 9: Commit**

```bash
git add assets/localization/en.json assets/localization/es.json \
  src/renderer/components/user-profile-popover/user-profile-popover.component.tsx \
  src/renderer/components/user-profile-popover/user-profile-popover.test.tsx
git commit -m "feat: mark Power mode as a Preview in the mode switcher (PT-4833)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Visual verification in the running app

There's no code to write; this gates the merge. It confirms the badge's classes exist in the shipped stylesheet and that Review Focus items 1–2 hold.

**Files:** none (screenshots go to the scratchpad and are attached to the PR).

**Interfaces:**
- Consumes: test ids `user-profile-popover-trigger`, `user-profile-interface-mode-power` and `user-profile-interface-mode-power-preview-badge` from Task 1.

- [ ] **Step 1: Start the app with CDP enabled**

Use the `app-runner` skill (headless with CDP: `./.erb/scripts/refresh.sh`). If Electron exits immediately with code 7, `unset ELECTRON_RUN_AS_NODE` first.

- [ ] **Step 2: Screenshot the four theme × mode combinations in English**

Use the `visual-verification` skill. For each of {Simple, Power} × {light, dark}: set the mode and theme through the popover's own controls, open the popover (`user-profile-popover-trigger`), and screenshot it.
Expected in all four: an outlined pill reading "Preview" sits right after "Power mode" on the same line. It has a visible border, its text is no larger than "Power mode", and its height is not taller than the label line. It is readable on the selected Power card's accent background.

- [ ] **Step 3: Screenshot Spanish**

Switch the interface language to Español from the popover's language pills (accept the restart prompt), open the popover in Power mode, and screenshot it.
Expected: "Preliminar" either fits after "Modo avanzado" or wraps onto its own line under it. It must not overflow the card or get clipped. Switch the language back to English afterwards.

- [ ] **Step 4: If the badge renders unstyled**

If there's no border, the default 12px text or the 20px height, a class is missing from the stylesheet. Check the computed style of `user-profile-interface-mode-power-preview-badge` over CDP and compare it with the classes in Task 1 Step 5. Fix the class (or add a raw rule beside `.user-profile-popover-text-3xs` in `user-profile-popover.component.css`, as that file already does for font sizes), rerun Task 1 Steps 6–8, and amend Task 1's commit.

- [ ] **Step 5: Record the result**

Save the five screenshots under the scratchpad and list them in the PR description. Also note under "Hidden case" in the PR description that it doesn't apply, since this is a static label.
