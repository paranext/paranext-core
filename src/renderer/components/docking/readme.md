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
