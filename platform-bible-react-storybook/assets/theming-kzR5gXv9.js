import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{useMDXComponents as o}from"./index-8prWpO55.js";import{M as i}from"./blocks-g34YC4BD.js";import{B as n}from"./button-NR4ZY1Ke.js";import"./iframe-JTaHGDwD.js";import"./preload-helper-CTOgD26E.js";import"./index-D-f78eDb.js";import"./index-DhPw_HYM.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-D-SQ8URB.js";const d=[{id:"shadcn-light",label:"Shadcn Neutral (light)",themeShell:"theme-shadcn-neutral"},{id:"shadcn-dark",label:"Shadcn Neutral (dark)",themeShell:"dark theme-shadcn-neutral"},{id:"platform-light",label:"Platform light",themeShell:"light"},{id:"platform-dark",label:"Platform dark",themeShell:"dark"},{id:"paratext-light",label:"Paratext light",themeShell:"paratext-light"},{id:"paratext-dark",label:"Paratext dark",themeShell:"paratext-dark"}];function a(){return e.jsxs("div",{className:"tw:not-prose tw:min-h-[200px] tw:max-w-6xl tw:space-y-4 tw:bg-slate-50 tw:p-6 tw:text-slate-900",children:[e.jsxs("p",{className:"tw:text-sm tw:text-slate-500",children:["Each panel uses the same components with theme variables applied on a local wrapper. Compare with the global toolbar themes on other stories. For a larger token table, see"," ",e.jsx("a",{className:"tw:text-blue-600 tw:hover:underline",href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/guides-theme-colors--docs",children:"Guides / Theme Colors"}),"."]}),e.jsx("div",{className:"tw:grid tw:grid-flow-row tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2 tw:xl:auto-cols-fr tw:xl:grid-flow-col tw:xl:grid-cols-none tw:xl:grid-rows-2",children:d.map(({id:s,label:t,themeShell:l})=>e.jsx("div",{className:l,children:e.jsxs("div",{className:"pr-twp tw:flex tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-background tw:p-4 tw:text-foreground",children:[e.jsx("p",{className:"tw:mb-2 tw:font-semibold tw:!text-foreground",children:t}),e.jsx(n,{type:"button",variant:"default",className:"tw:mb-2",children:"Primary"}),e.jsx(n,{type:"button",variant:"secondary",children:"Secondary"})]})},s))})]})}a.__docgenInfo={description:"Side-by-side preview: each column applies a local theme shell class from `MATRIX_THEMES` so\ntokens are scoped to that wrapper (stories that follow the toolbar get classes on `html` via\nlocalStorage and the preview channel instead). The matrix does not read toolbar storage; it is\nfor visual comparison only.",methods:[],displayName:"ThemeMatrixDemo"};function r(s){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Guidelines/Theming"}),`
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
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.strong,{children:"Color scheme"})," (light, dark, or system) and ",e.jsx(t.strong,{children:"Theme"}),` (Shadcn Neutral, Platform, or
Paratext) controls in the Storybook toolbar to switch palettes. Selection is stored as
`,e.jsx(t.code,{children:"{ family, colorScheme }"})," (when ",e.jsx(t.strong,{children:"system"}),` is chosen, light vs dark follows
`,e.jsx(t.code,{children:"prefers-color-scheme"}),"). Classes on ",e.jsx(t.code,{children:"document.documentElement"}),` come from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),`.
The effective row is always one of the six legacy composite ids below (also used for
`,e.jsx(t.code,{children:"parameters.themes.themeOverride"})," strings):"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"shadcn-light"})," / ",e.jsx(t.strong,{children:"shadcn-dark"}),` — Stock Shadcn Neutral (HSL, from the docs OKLCH scaffold)
in `,e.jsx(t.code,{children:".theme-shadcn-neutral"}),"; Storybook preview only (not in ",e.jsx(t.code,{children:"themes.data.json"}),")."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"platform-light"})," / ",e.jsx(t.strong,{children:"platform-dark"}),` — Platform.Bible default (Slate-based) light and dark;
matches the running app.`]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"paratext-light"})," / ",e.jsx(t.strong,{children:"paratext-dark"})," — Paratext palettes."]}),`
`]}),`
`,e.jsx(t.h2,{id:"platform-vs-shadcn-neutral-vs-paratext",children:"Platform vs Shadcn Neutral vs Paratext"}),`
`,e.jsxs(t.p,{children:[`CSS variables live in
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),`:
Platform light is `,e.jsx(t.code,{children:":root"})," / ",e.jsx(t.code,{children:".light"}),"; Platform dark is ",e.jsx(t.code,{children:".dark"}),`; stock Shadcn
Neutral is `,e.jsx(t.code,{children:".theme-shadcn-neutral"})," (and ",e.jsx(t.code,{children:".dark.theme-shadcn-neutral"}),`); Paratext is
`,e.jsx(t.code,{children:".paratext-light"})," / ",e.jsx(t.code,{children:".paratext-dark"}),`. The running app loads Platform and Paratext HSLs from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json",rel:"nofollow",children:"themes.data.json"}),`
(default Platform family key and `,e.jsx(t.code,{children:"paratext"}),"); Shadcn Neutral is Storybook-only."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Platform"})," default (",e.jsx(t.code,{children:":root"})," / ",e.jsx(t.code,{children:".dark"}),") is ",e.jsx(t.strong,{children:"Slate-based"})," (blue-gray neutrals) but ",e.jsx(t.strong,{children:`not
identical`})," to the stock Shadcn Neutral preset under ",e.jsx(t.code,{children:".theme-shadcn-neutral"})," in ",e.jsx(t.code,{children:"storybook-themes.css"}),`.
Use the toolbar's `,e.jsx(t.strong,{children:"Shadcn Neutral"}),` options when you need the closest match to
`,e.jsx(t.a,{href:"https://ui.shadcn.com/docs/theming#neutral",rel:"nofollow",children:"shadcn/ui docs"}),` for development, UX review, or
debugging. Pick `,e.jsx(t.strong,{children:"Shadcn Neutral"})," under Theme and set Color scheme to light or dark (or system)."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Light:"})," Platform differs from stock Neutral on ",e.jsx(t.strong,{children:"popover"}),` (tinted vs pure white),
`,e.jsx(t.strong,{children:"secondary / muted / accent"})," neutrals (Platform ",e.jsx(t.code,{children:"210 50% 95%"})," vs Neutral ",e.jsx(t.code,{children:"0 0% 96.1%"}),`), and
the full `,e.jsx(t.strong,{children:"sidebar-*"}),` token block (Platform stays Slate-aligned; Neutral follows the docs
scaffold).`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Dark:"})," Platform uses solid ",e.jsx(t.strong,{children:"border"})," / ",e.jsx(t.strong,{children:"input"}),` grays; stock Neutral uses semi-transparent
white on dark. Sidebar styling also differs (including Neutral's violet `,e.jsx(t.strong,{children:"sidebar-primary"}),` in
the docs preset).`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Paratext"}),` is a separate palette (Caffeine-inspired in tweakcn), not vanilla Shadcn; it is not
"mostly Slate."`]}),`
`,e.jsx(t.h2,{id:"try-it-change-theme",children:"Try it: change theme"}),`
`,e.jsxs(t.p,{children:[`Shadcn-style theming is driven by CSS variables in
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css",rel:"nofollow",children:"index.css"}),`.
In this Storybook, use the `,e.jsx(t.strong,{children:"Color scheme"})," and ",e.jsx(t.strong,{children:"Theme"}),` toolbar controls (not a separate
preview-app toggle) to switch palettes and confirm your story respects tokens—foreground,
background, borders, and components that use the same variables should track the selection.`]}),`
`,e.jsx(t.h2,{id:"in-the-running-application",children:"In the running application"}),`
`,e.jsxs(t.p,{children:[`The Paranext renderer loads built-in theme definitions from
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/shared/data/themes.data.json",rel:"nofollow",children:"themes.data.json"}),`
(Platform and Paratext families) and applies the same HSL tokens as `,e.jsx(t.code,{children:"index.css"}),` for those (see
`,e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/blob/main/src/renderer/services/theme.service-host.ts",rel:"nofollow",children:"theme.service-host.ts"}),`).
Keep `,e.jsx(t.code,{children:"index.css"})," and ",e.jsx(t.code,{children:"themes.data.json"}),` in sync when you change theme colors. End-user theme
selection is handled by the platform theme service, not Storybook.`]}),`
`,e.jsx(t.h2,{id:"bad-example",children:"Bad example"}),`
`,e.jsx(t.p,{children:"Manual colors on primitives do not follow the active theme."}),`
`,e.jsx("table",{children:e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(t.p,{children:["Bad example",e.jsx("div",{className:"tw:text-xs",children:"manual styles, unable to be themed"})]})}),e.jsx("td",{children:e.jsx("input",{value:"this has manual colors","aria-label":"Bad example input with manual colors",readOnly:!0,className:"tw:full tw:file:border-0 tw:col-span-2 tw:flex tw:h-8 tw:rounded-md tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:ring-offset-white tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:placeholder:text-slate-400 tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2 tw:disabled:cursor-not-allowed tw:disabled:opacity-50"})})]})})}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<input
  value="this has manual colors"
  aria-label="Bad example input with manual colors"
  readOnly
  className="tw:full tw:file:border-0 tw:col-span-2 tw:flex tw:h-8 tw:rounded-md tw:border
    tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900
    tw:ring-offset-white tw:file:bg-transparent tw:file:text-sm tw:file:font-medium
    tw:placeholder:text-slate-400 tw:focus-visible:outline-none tw:focus-visible:ring-2
    tw:focus-visible:ring-slate-400 tw:focus-visible:ring-offset-2
    tw:disabled:cursor-not-allowed tw:disabled:opacity-50"
/>
`})}),`
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
composite id`})," such as ",e.jsx(t.code,{children:"parameters: { themes: { themeOverride: 'paratext-dark' } }"}),` on the story
or meta. You can also pass `,e.jsx(t.code,{children:"themeOverride: { family: 'paratext', colorScheme: 'system' }"}),` for
system light/dark. The preview decorator reads this in `,e.jsx(t.code,{children:".storybook/theme-decorator.ts"}),` (toolbar
changes use `,e.jsx(t.code,{children:"localStorage"})," and a channel event instead of ",e.jsx(t.code,{children:"globals.theme"}),")."]}),`
`,e.jsx(t.h2,{id:"adding-a-new-theme",children:"Adding a new theme"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["Add a CSS class in ",e.jsx(t.code,{children:"index.css"})," with ",e.jsx(t.code,{children:"--background"}),", ",e.jsx(t.code,{children:"--foreground"}),`, and the other variables
(see existing blocks).`]}),`
`,e.jsxs(t.li,{children:["Update ",e.jsx(t.code,{children:"themes.data.json"})," in paranext-core if the app should expose the theme."]}),`
`,e.jsxs(t.li,{children:["Register the composite id in ",e.jsx(t.code,{children:".storybook/theme-constants.ts"})," (",e.jsx(t.code,{children:"STORYBOOK_THEME_IDS"}),` and
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
`,e.jsx(a,{})]})}function y(s={}){const{wrapper:t}={...o(),...s.components};return t?e.jsx(t,{...s,children:e.jsx(r,{...s})}):r(s)}export{y as default};
