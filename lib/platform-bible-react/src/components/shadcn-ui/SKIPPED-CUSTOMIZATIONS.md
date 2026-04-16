# Skipped Customizations

These customizations from `CUSTOMIZATIONS.md` were not re-applied during the shadcn upgrade because they no longer made sense in the new version. Review and delete this file once you have decided whether any of these need to be addressed differently.

### alert.tsx
- **Customization:** `AlertTitle` rendered as `<h5>` with explicit `{props.children}{' '}` for `jsx-a11y/heading-has-content`
  **Reason skipped:** The new shadcn baseline changed `AlertTitle` from an `<h5>` to a `<div>` (data-slot pattern). The `heading-has-content` accessibility rule does not apply to `<div>` elements, so this workaround is no longer needed.

### card.tsx
- **Customization:** `CardTitle` rendered as `<h3>` with explicit `{props.children}` for `jsx-a11y/heading-has-content`
  **Reason skipped:** The new shadcn baseline changed `CardTitle` from an `<h3>` to a `<div>` (data-slot pattern). The `heading-has-content` accessibility rule does not apply to `<div>` elements, so the explicit children workaround is no longer needed.

### dialog.tsx
- **Customization:** RTL-aware close button positioning using conditional classes `{ 'tw:right-4': dir === 'ltr' }` / `{ 'tw:left-4': dir === 'rtl' }`
  **Reason skipped:** The new shadcn baseline uses `tw:end-2` (a CSS logical property) for the close button position, which automatically mirrors in RTL without requiring JavaScript conditional classes.

### drawer.tsx
- **Customization:** `DrawerContext` + `directionStyles` map + `handleStyles` map + per-direction handle rendering (placing the handle before or after children based on direction for all 4 directions)
  **Reason skipped:** The new vaul baseline uses `data-[vaul-drawer-direction=*]` CSS selectors for all directional positioning and styling natively. The `hideDrawerHandle` prop (the core behavioral customization) was retained; only the direction-propagation mechanism was dropped in favor of the CSS-native approach.

### select.tsx
- **Customization:** RTL-aware `SelectContent` popper positioning via `ltr:` and `rtl:` prefixed Tailwind classes for `data-[side=left]` and `data-[side=right]` translate offsets
  **Reason skipped:** The new baseline already includes `rtl:tw:data-[side=left]:translate-x-1` and `rtl:tw:data-[side=right]:-translate-x-1` in the popper position class string, so RTL behavior is handled natively.

### switch.tsx
- **Customization:** RTL direction support via `readDirection()` — imported `readDirection`, called it inside the component, used conditional `translate-x` class objects based on `dir`
  **Reason skipped:** The new shadcn baseline already handles RTL natively on `SwitchPrimitive.Thumb` via `rtl:tw:` directional variant prefixes on all translate-x classes, achieving the same RTL behaviour without requiring a `readDirection()` call.
