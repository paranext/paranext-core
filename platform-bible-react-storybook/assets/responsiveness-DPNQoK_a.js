import{j as e}from"./jsx-runtime-CvGToidP.js";import{useMDXComponents as o}from"./index-CNm5GXnS.js";import{M as s}from"./blocks-bGJDhVXO.js";import"./iframe-FHgAwj54.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";function t(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Guidelines/Responsiveness"}),`
`,e.jsx(i.h1,{id:"responsiveness",children:"Responsiveness"}),`
`,e.jsx(i.p,{children:"Platform.Bible allows users to open multiple tab groups inside of the application, which means that individual tabs can get very small. Given this fact, users still need to be able to work well with those smaller parts of the user interface."}),`
`,e.jsx(i.h2,{id:"design-principle",children:"Design principle"}),`
`,e.jsx(i.p,{children:"Prefer the need for vertical scrolling over the need for horizontal scrolling."}),`
`,e.jsxs(i.p,{children:['Design narrow-first, wide later. For tabs (technically "webviews") design for a ',e.jsx(i.code,{children:"min-width"})," of ",e.jsx(i.code,{children:"300px"}),`, at which the ui works without horizontal srcollbars.
Is this narrow view, parts of the ui may not be visible, truncated or wrapped.`]}),`
`,e.jsx(i.p,{children:"Things that get hidden need to be accessible in another way. Examples"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["When controls are hidden from a ",e.jsx(i.a,{href:"#toolbar",children:"toolbar"}),", they are still accessible from e.g. a menu"]}),`
`,e.jsxs(i.li,{children:["When text is truncated or table columns are hidden, there is either a ",e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-tooltip--docs",rel:"nofollow",children:"Tooltip"})," or any details view, that shows the full information"]}),`
`]}),`
`,e.jsx(i.p,{children:"When width is small, there should be maximum one horizontal scrollbar. When height is small, there should be maximum two vertical scrollbars (if content includes a list or table, otherwise one)"}),`
`,e.jsx(i.h2,{id:"components",children:"Components"}),`
`,e.jsx(i.h3,{id:"buttons",children:"Buttons"}),`
`,e.jsxs(i.p,{children:[`In narrow widths use icon-only buttons; when width allows for, use icon and text. Use container querys to determine available width.
Always use `,e.jsx(i.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-tooltip--docs",rel:"nofollow",children:"Tooltips"}),"."]}),`
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
`,e.jsx(i.p,{children:"Toolbars shrink and finally hide items in smaller widths. It is imporant to always keep the menu button visible. As mentioned above, hidden items need to be accessible elsewhere."}),`
`,e.jsxs(i.p,{children:["Toolbars do ",e.jsx(i.strong,{children:"not"})," automatically or partially overflow into overflow menus. Instead duplicate functionality may always exists in there."]}),`
`,e.jsx(i.p,{children:"Lightweight filter toolbars, may wrap into two, maximum three rows instead of hiding elements."}),`
`,e.jsx(i.h3,{id:"tabs",children:"Tabs"}),`
`,e.jsxs(i.p,{children:["Tab Headsers overflow into an overflow menu. Also see ",e.jsx(i.a,{href:"./guidelines/application-interactions.mdx#tab-navigation",children:"Interactions/Tab Navigation"})]})]})}function p(n={}){const{wrapper:i}={...o(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{p as default};
