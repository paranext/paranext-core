# Power mode "Preview" badge — design

> **Frozen record** — design for PT-4833, agreed 2026-10-15 on branch `worktree-pt-4833`. It records
> the decisions as made; follow the current files, not this document.

## Problem

Power mode ships in the November release with features still missing. Users who switch to it should
know it is a preview, so they read gaps as "not built yet" rather than as bugs. Product chose the
word **"Preview"** (Ian, over "Incomplete") and placed it as a badge in the Simple / Power mode
switcher (Sebastian). Related: PT-4803 (organize menus for Power), which is out of scope here.

Conditions for approval (from the ticket):

- The Simple / Power switcher shows a "Preview" badge on the Power option.
- The label is localized.

## Decisions

| # | Decision | Why |
| - | -------- | --- |
| D1 | The badge sits **inline after the "Power mode" label**, on the label's line. | Chosen over a top-right corner placement: the two cards are narrow (`w-80` popover split in two), so an inline badge that can wrap handles long translations better. |
| D2 | **`Badge` `variant="outline"`** from `platform-bible-react`, unmodified. | The app's existing badge, so no shadcn edit. Outline is neutral in both themes and stays readable on the selected card's `bg-accent`; a filled `secondary` pill would blend into it. |
| D3 | **Shrink the badge** to sit with the 11px label: `user-profile-popover-text-3xs` (10px) and `tw:h-4 tw:px-1.5`. | Badge's built-in `text-xs`/`h-5` would be bigger than the label it annotates. Renderer code gets no Tailwind processing (see the comment at the top of `user-profile-popover.component.css`), so the overrides use only classes this popover already renders (`tw:h-4`, `tw:px-1.5`) plus its existing raw CSS size class. `cn` merges with the `tw` prefix, so `tw:h-4` replaces Badge's `tw:h-5`. |
| D4 | Wrap the label and the badge in a **`tw:flex tw:flex-wrap tw:gap-1.5`** row, **baseline-aligned** through a new raw CSS class `user-profile-popover-baseline-row` (`align-items: baseline`). | `flex-wrap` lets the badge drop under the label when a translation is too long for the card (Spanish "Modo avanzado" + "Preliminar" doesn't fit), instead of overflowing. Baseline rather than center alignment: the 16px badge is taller than the label's line, so centering the boxes left "Preview" visibly off the "Power mode" text line (seen in the HTML mockup); baseline puts both texts on one line. The alignment is a raw class, like the file's existing font sizes, because `tw:items-baseline` is not used anywhere in this popover and so isn't known to be in the shipped stylesheet. The three `tw:` classes are already used in this file. |
| D5 | One **new localize key** `%userProfile_interfaceMode_power_previewBadge%`: en "Preview", es "Preliminar". No existing key changes. | "Preliminar" reads as an early-version status, where "Vista previa" in software usually means a document or print preview; it is also shorter for the narrow card. The Localization Guide forbids editing existing strings. The key follows the existing `userProfile_interfaceMode_power_*` prefix convention. |
| D6 | The badge shows **whichever mode is selected**, and it is plain text with no tooltip. | The ticket asks for it "in both Simple and Power". The badge text joins the toggle's accessible name ("Power mode Preview Full Paratext interface…"), so screen-reader users hear it with no extra ARIA. |

## Components

All changes are in `src/renderer/components/user-profile-popover/` and `assets/localization/`.

### `user-profile-popover.component.tsx`

- Import `Badge` from `platform-bible-react`, alphabetically in the existing import list.
- Add `'%userProfile_interfaceMode_power_previewBadge%'` to `LOCALIZED_STRING_KEYS`, after
  `'%userProfile_interfaceMode_power_description%'`.
- In the Power `ToggleGroupItem`, replace the label `<span>` with:

```tsx
<span className="user-profile-popover-baseline-row tw:flex tw:flex-wrap tw:gap-1.5">
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

The Simple item and the description `<span>` are unchanged.

### `user-profile-popover.component.css`

Add after the `.user-profile-popover-text-3xs` rule:

```css
/* Lines a row's children up on their text baseline, so a badge taller than the label beside it
   still reads on the label's line. A raw class for the same reason as the font sizes above. */
.user-profile-popover-baseline-row {
  align-items: baseline;
}
```

### `assets/localization/en.json` / `es.json`

Add the key next to the other `userProfile_interfaceMode_power_*` entries, keeping the files'
alphabetical order (`power_description` < `power_label` < `power_previewBadge`):

- en: `"%userProfile_interfaceMode_power_previewBadge%": "Preview"`
- es: `"%userProfile_interfaceMode_power_previewBadge%": "Preliminar"`

### `user-profile-popover.test.tsx`

- Add the new key to the localized-strings mock (e.g. `'Preview badge'`).
- Two tests in `describe('UserProfilePopover interface mode')`:
  1. In Simple mode, the badge is inside the Power option (`within(power).getByTestId(...)`) and
     shows the localized text.
  2. In Power mode (`setMockSetting('interfaceMode', 'power')`), the badge is still there.

## Hidden case

Not applicable: this is a static label in a popover, not cross-view sync.

## Testing

- Unit: the two tests above, plus the existing popover suite, all green.
- Visual (app run, `visual-verification` skill): open the profile popover and screenshot it in
  {Simple, Power} × {light, dark} in English, plus one Spanish screenshot to check wrapping. Check
  that the badge's border, text and size render, which also confirms that D3's classes exist in the
  shipped stylesheet.

## Out of scope

- Any "Preview" marker elsewhere (toolbar, menus, About, settings), and PT-4803's menu work.
- Tooltip or explanatory copy for the badge.
- Changes to the shared `Badge` component or its variants.
- Translations beyond en/es (others fall back to English via the localization chain).
