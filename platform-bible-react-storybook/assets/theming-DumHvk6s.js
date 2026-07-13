import{j as e,M as i}from"./iframe-C2vJTx5z.js";import{useMDXComponents as o}from"./index-BwPNIifz.js";import{B as n}from"./button-c_yWPQYM.js";import{a as d}from"./example-block.component-BIrs1D3K.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-CYSv_4EU.js";import"./createLucideIcon-dzHOH1H8.js";import"./info-BrXvtMZZ.js";import"./chevron-down-KDEkoUdz.js";const h=[{id:"shadcn-light",label:"Shadcn Neutral (light)",themeShell:"theme-shadcn-neutral"},{id:"shadcn-dark",label:"Shadcn Neutral (dark)",themeShell:"dark theme-shadcn-neutral"},{id:"platform-light",label:"Platform light",themeShell:"light"},{id:"platform-dark",label:"Platform dark",themeShell:"dark"},{id:"paratext-light",label:"Paratext light",themeShell:"paratext-light"},{id:"paratext-dark",label:"Paratext dark",themeShell:"paratext-dark"}];function a(){return e.jsxs("div",{className:"light tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-muted tw:p-6",children:[e.jsxs("p",{className:"tw:text-sm tw:text-muted-foreground",children:["Each panel uses the same components with theme variables applied on a local wrapper. Compare with the global toolbar themes on other stories. For a larger token table, see"," ",e.jsx("a",{className:"tw:text-primary tw:hover:underline",href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs",children:"Guides / Theme Colors"}),"."]}),e.jsx("div",{className:"tw:grid tw:grid-flow-row tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:xl:auto-cols-fr tw:xl:grid-flow-col tw:xl:grid-cols-none tw:xl:grid-rows-2",children:h.map(({id:s,label:t,themeShell:l})=>e.jsx("div",{className:l,children:e.jsxs("div",{className:"pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4",children:[e.jsx("p",{className:"tw:mb-2 tw:font-semibold tw:text-foreground!",children:t}),e.jsx(n,{type:"button",variant:"default",className:"tw:mb-2",children:"Primary"}),e.jsx(n,{type:"button",variant:"secondary",children:"Secondary"})]})},s))})]})}a.__docgenInfo={description:"Side-by-side preview: each column applies a local theme shell class from `MATRIX_THEMES` so\ntokens are scoped to that wrapper (stories that follow the toolbar get classes on `html` via\nlocalStorage and the preview channel instead). The matrix does not read toolbar storage; it is\nfor visual comparison only.",methods:[],displayName:"ThemeMatrixDemo"};function r(s){const t={a:"a",code:"code",h1:"h1",h2:"h2",input:"input",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Guidelines/Theming"}),`
`,e.jsx(t.h1,{id:"theming",children:"Theming"}),`
`,e.jsx(t.p,{children:`Guidance for theming with the shadcn design system in this library: tokens, Storybook toolbar themes,
CSS variables, and how they line up with the Paranext app. Details below.`}),`
`,e.jsx(t.p,{children:`A comprehensive guide on theming components using the shadcn design system, including best
practices for color usage, theme switching, and CSS variable management.`}),`
`,e.jsx(t.p,{children:`By default we stick to the existing shadcn styles. Components we install from shadcn already
come with styles that expect design tokens—see which properties and class patterns they use
so they can set their own appearance and stay themeable.`}),`
`,e.jsxs(t.p,{children:[`Token values for Storybook and the app live in
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),`.
For a live table of variables for the toolbar-selected theme, see
`,e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs",rel:"nofollow",children:"Guides / Theme Colors"}),"."]}),`
`,e.jsx(t.p,{children:"This Storybook has two independent axes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Appearance"})," — light, dark, or system (when ",e.jsx(t.strong,{children:"system"}),` is chosen, light vs dark follows
`,e.jsx(t.code,{children:"prefers-color-scheme"}),")"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Theme"})," — Shadcn Neutral, Platform, or Paratext (the color palette)"]}),`
`]}),`
`,e.jsxs(t.p,{children:["Pick each from the Storybook toolbar. Selection is persisted under ",e.jsx(t.code,{children:"localStorage"}),` as
`,e.jsx(t.code,{children:"{ family, colorScheme }"}),". Classes on ",e.jsx(t.code,{children:"document.documentElement"}),` come from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),"."]}),`
`,e.jsxs(t.p,{children:["The effective row is one of six composite IDs (also used for ",e.jsx(t.code,{children:"parameters.themes.themeOverride"}),"):"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Theme"}),e.jsx(t.th,{children:"Light"}),e.jsx(t.th,{children:"Dark"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Shadcn Neutral"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"shadcn-light"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"shadcn-dark"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Platform"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"platform-light"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"platform-dark"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Paratext"}),e.jsx(t.td,{children:e.jsx(t.code,{children:"paratext-light"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"paratext-dark"})})]})]})]}),`
`,e.jsxs(t.p,{children:["Shadcn Neutral is Storybook-only (not in ",e.jsx(t.code,{children:"themes.data.json"}),`); Platform and Paratext match the
running app.`]}),`
`,e.jsx(t.h2,{id:"themes",children:"Themes"}),`
`,e.jsxs(t.p,{children:[`CSS variables live in
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),`
(Platform and Paratext) and
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/.storybook/storybook-themes.css",rel:"nofollow",children:".storybook/storybook-themes.css"}),`
(Shadcn Neutral, Storybook-only).`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Platform"})," — the product default (",e.jsx(t.code,{children:":root"})," / ",e.jsx(t.code,{children:".dark"}),`). Slate-based (blue-gray neutrals), close
to stock Shadcn Neutral but `,e.jsx(t.strong,{children:"not identical"}),": differs on ",e.jsx(t.strong,{children:"popover"}),", ",e.jsx(t.strong,{children:`secondary / muted /
accent`})," neutrals, and the full ",e.jsx(t.strong,{children:"sidebar-*"}),` block in both light and dark. The running app
loads these tokens from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json",rel:"nofollow",children:"themes.data.json"}),"."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Shadcn Neutral"})," — the stock shadcn preset (",e.jsx(t.code,{children:".theme-shadcn-neutral"})," / ",e.jsx(t.code,{children:".dark.theme-shadcn-neutral"}),`).
Storybook-only — pick it when you need the closest match to
`,e.jsx(t.a,{href:"https://ui.shadcn.com/docs/theming#neutral",rel:"nofollow",children:"shadcn/ui docs"}),` for development, UX review, or
debugging. In dark mode, `,e.jsx(t.strong,{children:"border"})," / ",e.jsx(t.strong,{children:"input"}),` use semi-transparent white (vs Platform's solid
grays).`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Paratext"})," — a separate palette (",e.jsx(t.a,{href:"https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74",rel:"nofollow",children:"Caffeine-inspired in tweakcn"}),`),
not vanilla Shadcn. Also loaded from `,e.jsx(t.code,{children:"themes.data.json"})," in the running app."]}),`
`,e.jsx(t.h2,{id:"try-it",children:"Try it"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.strong,{children:"Appearance"})," and ",e.jsx(t.strong,{children:"Theme"}),` toolbar controls (not a separate preview-app toggle) to
switch palettes and confirm your story respects tokens — foreground, background, borders, and
components that use the same variables should track the selection.`]}),`
`,e.jsx(t.h2,{id:"in-the-running-application",children:"In the running application"}),`
`,e.jsxs(t.p,{children:[`The Paranext renderer loads built-in theme definitions from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json",rel:"nofollow",children:"themes.data.json"}),`
(Platform and Paratext families) and applies the same HSL tokens as `,e.jsx(t.code,{children:"index.css"}),` for those (see
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/renderer/services/theme.service-host.ts",rel:"nofollow",children:"theme.service-host.ts"}),`).
Keep `,e.jsx(t.code,{children:"index.css"})," and ",e.jsx(t.code,{children:"themes.data.json"}),` in sync when you change theme colors. End-user theme
selection is handled by the platform theme service, not Storybook.`]}),`
`,e.jsx(t.h2,{id:"bad-example",children:"Bad example"}),`
`,e.jsx(t.p,{children:"Manual colors on primitives do not follow the active theme."}),`
`,e.jsx(d,{variant:"avoid",preview:e.jsx(t.input,{value:"this has manual colors","aria-label":"Bad example input with manual colors",readOnly:!0,className:"tw:file:border-0 tw:flex tw:h-8 tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:ring-offset-white tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:placeholder:text-slate-400 tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50"}),code:`<input
value="this has manual colors"
aria-label="Bad example input with manual colors"
readOnly
className="tw:file:border-0 tw:flex tw:h-8 tw:rounded-md tw:border
  tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900
  tw:ring-offset-white tw:file:bg-transparent tw:file:text-sm tw:file:font-medium
  tw:placeholder:text-slate-400 tw:focus-visible:outline-none tw:focus-visible:ring-2
  tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2
  tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
/>`,children:e.jsx(t.p,{children:"Manual styles, unable to be themed."})}),`
`,e.jsx(t.h2,{id:"overwriting-styles",children:"Overwriting styles"}),`
`,e.jsxs(t.p,{children:[`Try not to overwrite styles (colors). When you need to, use Tailwind classes that apply the same
color variables shadcn uses, in the same way shadcn does. You can see token names on
`,e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs",rel:"nofollow",children:"Guides / Theme Colors"}),`
and in the `,e.jsx(t.a,{href:"https://ui.shadcn.com/docs/theming",rel:"nofollow",children:"shadcn theming docs"}),"."]}),`
`,e.jsxs(t.p,{children:["For example, use ",e.jsx(t.code,{children:'className="tw:bg-muted"'}),` on a header-like surface and
`,e.jsx(t.code,{children:'className="tw:text-muted-foreground"'}),` for supporting text. You can use shades such as
`,e.jsx(t.code,{children:"tw:bg-muted/50"})," sparingly, in line with how shadcn applies them."]}),`
`,e.jsx(t.h2,{id:"per-story-theme-override",children:"Per-story theme override"}),`
`,e.jsxs(t.p,{children:["To lock a story to one palette (for example to show a dark-mode edge case), set a ",e.jsx(t.strong,{children:`legacy
composite ID`})," such as ",e.jsx(t.code,{children:"parameters: { themes: { themeOverride: 'paratext-dark' } }"}),` on the story
or meta. You can also pass `,e.jsx(t.code,{children:"themeOverride: { family: 'paratext', colorScheme: 'system' }"}),` for
system light/dark. The preview decorator reads this in `,e.jsx(t.code,{children:".storybook/theme-decorator.ts"}),` (toolbar
changes use `,e.jsx(t.code,{children:"localStorage"})," and a channel event instead of ",e.jsx(t.code,{children:"globals.theme"}),")."]}),`
`,e.jsx(t.h2,{id:"adding-a-new-theme",children:"Adding a new theme"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["Add a CSS class in ",e.jsx(t.code,{children:"index.css"})," with ",e.jsx(t.code,{children:"--background"}),", ",e.jsx(t.code,{children:"--foreground"}),`, and the other variables
(see existing blocks).`]}),`
`,e.jsxs(t.li,{children:["Update ",e.jsx(t.code,{children:"themes.data.json"})," in paranext-core if the app should expose the theme."]}),`
`,e.jsxs(t.li,{children:["Register the composite ID in ",e.jsx(t.code,{children:".storybook/theme-constants.ts"})," (",e.jsx(t.code,{children:"STORYBOOK_THEME_IDS"}),` and
`,e.jsx(t.code,{children:"STORYBOOK_THEME_LABELS"}),"), map classes in ",e.jsx(t.code,{children:".storybook/theme-apply.ts"})," (",e.jsx(t.code,{children:"CLASS_MAP"}),`,
`,e.jsx(t.code,{children:"compositeThemeIdFromFamilyAndEffective"}),", ",e.jsx(t.code,{children:"themeStateFromLegacyThemeId"}),`, and
`,e.jsx(t.code,{children:"ALL_THEME_CLASSES"}),`). Toolbar family and color-scheme options live in
`,e.jsx(t.code,{children:"STORYBOOK_THEME_FAMILIES"})," / ",e.jsx(t.code,{children:"STORYBOOK_COLOR_SCHEMES"}),` in the same file;
`,e.jsx(t.code,{children:".storybook/manager.tsx"})," reads those lists for the two toolbar tools."]}),`
`]}),`
`,e.jsxs(t.p,{children:[`Descriptions of which colors to use in which context are still being expanded. If you are
unsure, see how `,e.jsx(t.a,{href:"https://ui.shadcn.com/",rel:"nofollow",children:"shadcn"}),` handles a similar pattern or talk to the
`,e.jsx(t.a,{href:"https://discord.com/channels/1064938364597436416/1082713526780575845",rel:"nofollow",children:"Paratext UX team"}),"."]}),`
`,e.jsx(t.h2,{id:"theme-matrix",children:"Theme matrix"}),`
`,e.jsxs(t.p,{children:[`Compares Platform and Paratext palettes in one view using scoped wrappers. Useful for visual review
of theme tokens. For the live token table for the toolbar-selected theme, see `,e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs",rel:"nofollow",children:`Guides / Theme
Colors`}),"."]}),`
`,e.jsx(a,{})]})}function k(s={}){const{wrapper:t}={...o(),...s.components};return t?e.jsx(t,{...s,children:e.jsx(r,{...s})}):r(s)}export{k as default};
