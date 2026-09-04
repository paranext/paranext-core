## Stacking Order Comes From the Scale, Never From a Number

Every layer that stacks above the page belongs to a named tier in
`lib/platform-bible-react/src/components/z-index.ts` (with an SCSS twin in
`src/renderer/styles/_vars.scss`, kept in agreement by a test). The scale is defined by its
ORDER, not by its numbers:

backdrop < modal < overlay content (`Z_INDEX_ABOVE_DOCK`) < content portalled out of a popover
(`Z_INDEX_ABOVE_POPOVER`) < tooltip < first-run gate

`Z_INDEX_OVERLAY` (400) sits BELOW the modal tier. It is not "the overlay tier for shadcn
components" — despite the name, no shadcn overlay uses it.

### The rules

1. **An overlay component sets its own tier.** Popover, select, dropdown menu, context menu,
   menubar, tooltip and dialog each set the constant for their tier inside
   `components/shadcn-ui/`. Adding a new overlay primitive means adding that `style={{ zIndex: … }}`
   there — not leaving stacking to whoever renders it.
2. **A consumer does not override an overlay's z-index.** The one failure this keeps recurring as:
   pinning a menu or tooltip to `Z_INDEX_OVERLAY` while it renders inside a `PopoverContent`, which
   sits two tiers higher — so the thing you opened paints behind the thing you opened it from. If
   you believe a call site genuinely needs an override, say why in a comment naming the surfaces it
   was verified against.
3. **Never do arithmetic on a scale constant.** `Z_INDEX_MODAL + 10` lands an element between named
   tiers, where nothing orders it and no test can pin it. Use a tier, or add one.
4. **Never hard-code `tw:z-50` (or any raw z-class) on a portalled surface.** It is far below every
   tier in this scale, so the element renders under the dock and under any popover.
5. **Pin new tiers by ORDER.** `z-index.test.tsx` asserts relationships
   (`expect(Z_INDEX_TOOLTIP).toBeGreaterThan(Z_INDEX_ABOVE_POPOVER)`), never specific values, plus
   rendered-stacking cases that assert the inline `style.zIndex` an overlay actually emits. Compare
   declared strings, not `Number(el.style.zIndex)` alone — `Number('')` is `0`, so a bare
   greater-than keeps passing against an element that declares nothing at all.

Rationale and history: `adr-z-index-ordering-invariants` in
[`Architecture-Decisions.md`](../../../.context/standards/Architecture-Decisions.md).
