## Objects

Tab group
Tab
_ tab header
_ tab content

## States

"front"
means the tab that's selected in a tab group. In rc-dock, this is `dock-tab-active`
= "active" in rc-dock means the tab that is selected in a tab group.

"back"
means any tab that's not "front" in a tab group.
= "inactive" in rc-dock means any tab that is not "active" in a tab

"focus-within" means the tab that has CSS `:focus-within`, i.e. the tab with a cursor or keyboard focus within it. A tab with focus-within is always a "front" tab. Probably don't depend on `:focus-within` unless you specifically want that different behavior.
= "platform-dock-tab-window-focus" means the tab that has a window focus, i.e. the tab that is not "floating" and has a cursor or keyboard focus within it. Note that this include focus on the tab header—not only the content.

"blur" means the tab that does not have focus, i.e. the tab that is not "focus-within".

"highlight" means that a tab was recently made or has has a significant change. This is a temporary state that lasts a few seconds after the tab is activated or its content changes.

- 'platform-dock-tab-active-highlight'
- 'platform-dock-tabpane-active-highlight';

# Spacing

- There is intentional spacing around the whole tab group (and ideally the whole layout).
- The content pane uses a border radius for a softer appearance.
- Tab separators and gaps have been adjusted so tabs do not visually run into each other.
- The grab area of a tab has been expanded to match the visual tab, improving usability.
- The right-click area of the tab has been expanded to match the visual tab.
- Tab close button contrast has been improved for accessibility.
- The "More Tabs" icon has been redesigned for clarity.
- The tab header row uses more consistent spacing and alignment.
- Overflow shadows have been removed for a cleaner look.
- Overflow (more) menu items have improved styling.

# Overflow

- Overflowing tab headers are visually indicated, and the overflow (more) menu is styled to match the rest of the UI.

# Cleanup

- Unused styles in `_vars.scss` should be removed (pending).
- Regions should only include appropriate rules (pending).

- Overlapping opacity artifacts in concave corners have been fixed.
- Clipping on tab header focus rings has been fixed.
- The divider between tab headers becomes transparent when focused, improving focus visibility.

# Known Issues

- Overflow of tabs cannot be fully fixed without JavaScript; this is tracked as a separate work item.
- Padding to tab headers list does not work due to a JavaScript issue with the transform-x amount on `.dock-nav-list`.
- Focus classes are slow to apply due to JavaScript; CSS `:focus-within` may help in the future.
- There is a transition mismatch when keyboard focusing a front tab; this has been improved but is not fully resolved.
  ✅ Fix clipping on tab header focus rings

- ~~move focusable element down one layer~~(currently .dock-tab-btn) not needed
- ~~remove gap between tab headers~~ not needed
- ~~add padding to tab headers on the inline-end so divider~~ ✅ make divider transparent when focused
  ⏳ bug: - ~~add padding to tab headers list~~ doesn't work — it's a JS problem setting the wrong transform-x amount on .dock-nav-list

🚫 Focus classes are slow to apply — Javascript problem, but CSS `:focus-within` might hold a solution

TODO bug: transition mismatch when keyboard focusing a front tab [improved but not done]
