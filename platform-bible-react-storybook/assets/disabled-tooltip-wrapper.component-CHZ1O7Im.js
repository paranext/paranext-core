import{j as i}from"./iframe-CIH3uoLt.js";function s({children:t,isDisabled:e,disabledExplanation:o,...n}){return i.jsx("div",{...n,role:e?"group":void 0,tabIndex:e?0:void 0,"aria-label":e?o:void 0,children:t})}s.__docgenInfo={description:`Focusable wrapper that lets a DISABLED control still host a tooltip.

A disabled button is removed from the tab order and (in most browser/AT combinations) does not
fire the pointer and focus events Radix's \`Tooltip\` listens for — so the one moment the user most
needs the explanation ("why can't I use this?") is the one moment the button cannot deliver it.
Wrapping the control in a focusable, named element restores it: the wrapper takes the tooltip
trigger's place in the tab order and carries the explanation as its accessible name, so keyboard
and screen-reader users reach the same information pointer users get on hover. While the control
is ENABLED the wrapper is inert — no role, no tab stop, no name — leaving the button itself as
the single focusable, named thing.

Render it as the \`asChild\` child of a \`TooltipTrigger\`; it forwards the trigger's props and ref
onto its \`div\`. \`DisabledActionTooltip\` composes this with the rest of the \`Tooltip\` shell for
the common case of one tooltip message driving both the accessible name and the tooltip body.`,methods:[],displayName:"DisabledTooltipWrapper",props:{children:{required:!0,tsType:{name:"ReactNode"},description:"The control to wrap — typically a button that is `disabled` for the same reason."},isDisabled:{required:!0,tsType:{name:"boolean"},description:"`true` while the wrapped control is disabled. Drives the focusability and the accessible name."},disabledExplanation:{required:!1,tsType:{name:"string"},description:`The localized explanation of WHY the control is disabled. Becomes the wrapper's accessible name
while disabled, so it should be the same text the tooltip shows.`}}};export{s as D};
