import{j as e,M as o}from"./iframe-BWm4m7Zg.js";import{useMDXComponents as s}from"./index-DkRbZLv3.js";import"./preload-helper-CTOgD26E.js";function t(n){const i={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Guidelines/Responsiveness"}),`
`,e.jsx(i.h1,{id:"responsiveness",children:"Responsiveness"}),`
`,e.jsx(i.p,{children:"Platform.Bible allows users to open multiple tab groups inside of the application, which means that individual tabs can get very small. Given this fact, users still need to be able to work well with those smaller parts of the user interface."}),`
`,e.jsx(i.h2,{id:"design-principle",children:"Design principle"}),`
`,e.jsx(i.p,{children:"Prefer the need for vertical scrolling over the need for horizontal scrolling."}),`
`,e.jsxs(i.p,{children:['Design narrow-first, wide later. For tabs (technically "webviews") design for a ',e.jsx(i.code,{children:"min-width"})," of ",e.jsx(i.code,{children:"300px"}),`, at which the ui works without horizontal srcollbars.
Is this narrow view, parts of the ui may not be visible, truncated or wrapped.`]}),`
`,e.jsx(i.p,{children:"Things that get hidden need to be accessible in another way. Examples"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["When text is truncated or table columns are hidden, there is either a ",e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-tooltip--docs",rel:"nofollow",children:"Tooltip"})," or any details view, that shows the full information"]}),`
`]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.a,{href:"#toolbar",children:"Toolbars"})," are the exception: they do not hide items at all. Their items shrink and truncate instead."]}),`
`,e.jsx(i.p,{children:"When width is small, there should be maximum one horizontal scrollbar. When height is small, there should be maximum two vertical scrollbars (if content includes a list or table, otherwise one)"}),`
`,e.jsx(i.h2,{id:"components",children:"Components"}),`
`,e.jsx(i.h3,{id:"buttons",children:"Buttons"}),`
`,e.jsxs(i.p,{children:[`In narrow widths use icon-only buttons; when width allows for, use icon and text.
Always use `,e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-tooltip--docs",rel:"nofollow",children:"Tooltips"}),"."]}),`
`,e.jsxs(i.p,{children:["Buttons carrying ",e.jsx(i.strong,{children:"user-generated text"})," — a project name, a scripture reference — are the exception: shorten the text rather than falling back to an icon. A user recognises ",e.jsx(i.code,{children:"TP1"})," far faster than a generic glyph."]}),`
`,e.jsxs(i.p,{children:["Determine available width with the ",e.jsx(i.code,{children:"useShrinkStep"})," hook rather than a CSS container query. Tailwind's container-query ",e.jsx(i.em,{children:"variants"})," have repeatedly failed to be emitted into extension web view bundles, and they fail silently — the class is simply absent and the element keeps its base style at every width."]}),`
`,e.jsx(i.h3,{id:"lists",children:"Lists"}),`
`,e.jsx(i.p,{children:"List or table bodys define a minimum height of 1-3 item heights (depending on the indivudal context), to remain scrollable."}),`
`,e.jsx(i.p,{children:"Show lists that have a list part and a details part according to the available width (use container / media query)"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["narrow: show details using a Drawer (opening from the ",e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-direction--docs",rel:"nofollow",children:"end side"}),")"]}),`
`,e.jsx(i.li,{children:"wide: show list and details side by side"}),`
`]}),`
`,e.jsx(i.p,{children:"Show lists with 2 nested levels of details also according to the available width (use container / media query)"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["narrow: show first-level details using a Drawer (opening from the ",e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-direction--docs",rel:"nofollow",children:"end side"}),"), show second-level details on the drawer, below the first-level details"]}),`
`,e.jsx(i.li,{children:"medium: decide individually"}),`
`,e.jsx(i.li,{children:"wide: show all 3 parts side by side"}),`
`]}),`
`,e.jsxs(i.p,{children:["When the second-level details have the most important information or most interaction, think about reducing the first or second level into a space-saving selection, e.g. a combobox, toggle group or filter above, or sidebar on the ",e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-direction--docs",rel:"nofollow",children:"start side"}),"."]}),`
`,e.jsx(i.h3,{id:"table",children:"Table"}),`
`,e.jsxs(i.p,{children:[`Decide by importance of each column's content.
Prefer reducing column width or hiding less important columns over vertical scrolling.
Prefer wrapping content inside a cell wherever the full content is important to be visible. Use a `,e.jsx(i.code,{children:"max-height"})," for wrapped text.  Have a reasonable ",e.jsx(i.code,{children:"min-width"})," for each column that is visible. Otherwise truncate with Ellipsis."]}),`
`,e.jsx(i.h3,{id:"popover",children:"Popover"}),`
`,e.jsx(i.p,{children:"For the time being Platform.Bible does not offer webviews a way to launch popovers that can span across multiple tabs/webviews, which means that"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"popovers can only appear inside of a webview"}),`
`,e.jsx(i.li,{children:"when something outside is needed, a separate webview can be created and launched via the docking framework"}),`
`]}),`
`,e.jsx(i.h4,{id:"individual-popvers",children:"Individual popvers"}),`
`,e.jsxs(i.p,{children:["For very individual popovers - e.g. item editors, rich tooltips, ... - design them in a responsive way, so that they are usable at the defined ",e.jsx(i.code,{children:"min-width"})," of ",e.jsx(i.code,{children:"300px"})," and bigger"]}),`
`,e.jsx(i.h4,{id:"menu-like-popovers-for-selecting-a-single-or-multi-options",children:"Menu-like popovers for selecting a single or multi options"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Menu entries should not wrap, but be truncated in small width."}),`
`,e.jsxs(i.li,{children:["There are currently no implementation for a responsive popover menu solution. A solution might be to ",e.jsx(i.a,{href:"https://ui.shadcn.com/docs/components/combobox#responsive",rel:"nofollow",children:"use a Drawer"})," (opening location/direction to be defined). Once this is decided, we should likely add code to the menu-like popover implementations and document it here."]}),`
`]}),`
`,e.jsx(i.p,{children:"Which component to use for single and multi select popoverse, see"}),`
`,e.jsx("iframe",{src:"https://embed.figma.com/design/hJirMCWP9O9riw39Gd5zyl/Design-System-Figma?node-id=0-1&embed-host=paratext-design-system",width:"100%",height:"400",style:{border:"none"},children:e.jsx(i.p,{children:"Your browser does not support iframes."})}),`
`,e.jsx(i.h3,{id:"toolbar",children:"Toolbar"}),`
`,e.jsx(i.p,{children:"Toolbar items shrink and truncate. They are never hidden, never moved into an overflow menu, and never clipped away — at any width the app supports, every item is still there. The menu button is always visible."}),`
`,e.jsxs(i.p,{children:["Toolbars do ",e.jsx(i.strong,{children:"not"})," automatically or partially overflow into overflow menus. Instead duplicate functionality may always exists in there."]}),`
`,e.jsx(i.h4,{id:"absorbing-and-rigid-regions",children:"Absorbing and rigid regions"}),`
`,e.jsx(i.p,{children:"Mark each region of a toolbar as one of two kinds:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Absorbing"})," — may shrink. Give it ",e.jsx(i.code,{children:"tw:min-w-0"}),", which is what allows a flex item to go below its content width. Without it, ",e.jsx(i.code,{children:"min-width: auto"})," pins the region at its content's minimum and the space is taken out of its siblings instead — which is how items end up clipped away."]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Rigid"})," — must not shrink. Give it ",e.jsx(i.code,{children:"tw:shrink-0"}),". Icon-only buttons and menu triggers belong here: they have no shorter form to fall back to."]}),`
`]}),`
`,e.jsx(i.h4,{id:"stepped-shrinking",children:"Stepped shrinking"}),`
`,e.jsxs(i.p,{children:["Items carrying two fields shrink in steps, and the ",e.jsx(i.strong,{children:"second field is always the truncation target"}),":"]}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:["Full label — ",e.jsx(i.code,{children:"Genesis 1:1"})]}),`
`,e.jsxs(i.li,{children:["Abbreviated primary field — ",e.jsx(i.code,{children:"GEN 1:1"})]}),`
`,e.jsxs(i.li,{children:["Second field clipped with an ellipsis — ",e.jsx(i.code,{children:"GEN 1:…"})]}),`
`,e.jsxs(i.li,{children:["Second field dropped — ",e.jsx(i.code,{children:"GEN"})]}),`
`]}),`
`,e.jsxs(i.p,{children:["Use ",e.jsx(i.code,{children:"ToolbarCompoundLabel"})," for this; it takes the two fields and handles the ellipsis, the drop, and the tooltip. Steps 1, 2 and 4 come from the toolbar's ",e.jsx(i.code,{children:"useShrinkStep"})," value; step 3 is plain CSS."]}),`
`,e.jsxs(i.p,{children:["Reserve a ",e.jsx(i.strong,{children:"fixed slot"})," for anything whose content varies in length, so switching projects or references cannot shift the items beside it."]}),`
`,e.jsx(i.p,{children:"Lightweight filter toolbars, may wrap into two, maximum three rows instead of hiding elements."}),`
`,e.jsx(i.h3,{id:"tabs",children:"Tabs"}),`
`,e.jsxs(i.p,{children:["Tab Headers overflow into an overflow menu. Also see ",e.jsx(i.a,{href:"?path=/docs/guidelines-interactions--docs#tab-navigation",children:"Interactions/Tab Navigation"})]})]})}function d(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{d as default};
