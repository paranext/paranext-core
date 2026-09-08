import{j as n}from"./iframe-Cp-z13My.js";import{c as a}from"./index-BnuTq2W6.js";import{c as o}from"./utils-BPbySc-g.js";function i({className:e,...t}){return n.jsx("div",{"data-slot":"empty",className:o("pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",e),...t})}function d({className:e,...t}){return n.jsx("div",{"data-slot":"empty-header",className:o("pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",e),...t})}const r=a("tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",{variants:{variant:{default:"tw:bg-transparent",icon:"tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4"}},defaultVariants:{variant:"default"}});function c({className:e,variant:t="default",...s}){return n.jsx("div",{"data-slot":"empty-icon","data-variant":t,className:o("pr-twp",r({variant:t}),e),...s})}function m({className:e,...t}){return n.jsx("div",{"data-slot":"empty-title",className:o("pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",e),...t})}function p({className:e,...t}){return n.jsx("div",{"data-slot":"empty-description",className:o("pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",e),...t})}function l({className:e,...t}){return n.jsx("div",{"data-slot":"empty-content",className:o("pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",e),...t})}i.__docgenInfo={description:`The Empty component displays a centered zero-state message — typically a title, description, and
an optional action — for when there is no content to show. The component is built and styled by
Shadcn UI.

Use this composition when the zero-state needs media, a heading, or an action. For a plain
one-line "nothing to show" message inside a list, grid, or panel, use {@link EmptyState} instead —
it takes a single localized \`message\` and renders it in a \`role="status"\` region. These
primitives set no ARIA role, so pass \`role="status"\` yourself before the zero-state appears.

Two things the caller controls: the root sets \`border-dashed\` but no border width —
Platform.Bible's scoped Tailwind Preflight zeroes borders, so pass \`className="tw:border"\` to
draw the dashed outline — and {@link EmptyTitle} renders a \`<div>\`, not a heading, so nest your
own heading element inside it when the zero-state is a region's entire content.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"Empty"};d.__docgenInfo={description:`Container for the Empty component's icon/media, title, and description. The component is built
and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyHeader"};m.__docgenInfo={description:`The Empty component's title text. The component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyTitle"};p.__docgenInfo={description:`The Empty component's description text. The component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyDescription"};l.__docgenInfo={description:`Container for the Empty component's main content, typically actions such as buttons. The
component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyContent"};c.__docgenInfo={description:`Container for the Empty component's icon or other media, e.g. an illustration or avatar. The
component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyMedia",props:{variant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};export{i as E,d as a,c as b,m as c,p as d,l as e};
