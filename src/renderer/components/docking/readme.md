# Docking System Customizations and Behaviors

This document describes the customizations to rc-dock, expected behaviors, and known issues for the docking system used in this project. It covers the structure of tab groups, the states tabs can be in, intentional UI/UX improvements, and areas for future work.

---

## Objects

- **Tab group**
- **Tab**
  - Tab header
  - Tab content

---

## States

- **"front"**  
  The tab that's selected in a tab group.  
  In rc-dock, this is `dock-tab-active` (i.e., "active" means the tab that is selected in a tab group).

- **"back"**  
  Any tab that's not "front" in a tab group.  
  In rc-dock, this is "inactive" (i.e., any tab that is not "active" in a tab group).

- **"focus-within"**  
  The tab that has CSS `:focus-within` (i.e., the tab with a cursor or keyboard focus within it).  
  A tab with focus-within is always a "front" tab.  
  _Note: Avoid depending on `:focus-within` unless you specifically want this behavior._  
  In rc-dock, this is `platform-dock-tab-window-focus` (the tab that is not "floating" and has a window focus, including focus on the tab header).

- **"blur"**  
  The tab that does not have focus (i.e., not "focus-within").

- **"highlight"**  
  A tab that was recently made or has had a significant change.  
  This is a temporary state that lasts a few seconds after the tab is activated or its content changes.
  - `platform-dock-tab-active-highlight`
  - `platform-dock-tabpane-active-highlight`

---

## Spacing & Visual Customizations

- Intentional spacing around the whole tab group (and ideally the whole layout).
- Content pane uses a border radius for a softer appearance.
- Tab separators and gaps prevent tabs from visually running into each other.
- Grab and right-click areas of tabs match the visual tab for improved usability.
- Tab close button contrast is improved for accessibility.
- "More Tabs" icon redesigned for clarity.
- Tab header row uses consistent spacing and alignment.
- Overflow shadows removed for a cleaner look.
- Overflow (more) menu items have improved styling.
- Tab headers have spacing to prevent focus ring clipping.
- Tab header dividers become transparent when focused to avoid visual clashes.

---

## Overflow

- Overflow (more) menu is styled to match the rest of the UI.

---

## Cleanup

- Unused styles in `_vars.scss` should be removed (**pending**).
- Regions should only include appropriate rules (**pending**).
- Overlapping opacity artifacts in concave corners have been fixed.
- Clipping on tab header focus rings has been fixed.
- Divider between tab headers becomes transparent when focused, improving focus visibility.

---

## Known Issues

- Overflow of tabs cannot be fully fixed without JavaScript; this is tracked as a separate work item.  
  Adding padding to tab headers list does not fix this; likely a JavaScript issue with the transform-x amount on `.dock-nav-list`.
- Focus classes are slow to apply due to JavaScript; CSS `:focus-within` may help in the future.
- There is a transition mismatch when keyboard focusing a front tab; this has been improved but is not fully resolved.
