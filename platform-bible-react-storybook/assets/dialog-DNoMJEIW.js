import{j as t,b as w}from"./iframe-jej3GgDz.js";import{a as g,b as h}from"./z-index-DiGYIwoM.js";import{c as n}from"./utils-BPbySc-g.js";import{B as s}from"./button-Cn6oprfD.js";import{c as f}from"./createReactComponent-CjRxFD4r.js";import{R as x,T as D,D as y,C as v,a as d,b as I,P as k,O as b}from"./index-CIBVOEuU.js";/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]],_=f("outline","x","X",N);function C({...e}){return t.jsx(x,{"data-slot":"dialog",...e})}function U({...e}){return t.jsx(I,{"data-slot":"dialog-trigger",...e})}function l({...e}){return t.jsx(k,{"data-slot":"dialog-portal",...e})}function r({className:e,style:o,...a}){return t.jsx(b,{"data-slot":"dialog-overlay",className:n("tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",e),style:{zIndex:h,...o},...a})}function S({className:e,children:o,showCloseButton:a=!0,overlayClassName:i,overlayStyle:c,style:m,...p}){const u=w();return t.jsxs(l,{children:[t.jsx(r,{className:i,style:c}),t.jsxs(v,{"data-slot":"dialog-content",className:n("pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",e),style:{zIndex:g,...m},dir:u,...p,children:[o,a&&t.jsx(d,{"data-slot":"dialog-close",asChild:!0,children:t.jsxs(s,{variant:"ghost",className:"tw:absolute tw:top-2 tw:end-2",size:"icon-sm",children:[t.jsx(_,{}),t.jsx("span",{className:"tw:sr-only",children:"Close"})]})})]})]})}function j({className:e,...o}){return t.jsx("div",{"data-slot":"dialog-header",className:n("pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",e),...o})}function R({className:e,showCloseButton:o=!1,children:a,...i}){return t.jsxs("div",{"data-slot":"dialog-footer",className:n("pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",e),...i,children:[a,o&&t.jsx(d,{asChild:!0,children:t.jsx(s,{variant:"outline",children:"Close"})})]})}function T({className:e,...o}){return t.jsx(D,{"data-slot":"dialog-title",className:n("pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",e),...o})}function O({className:e,...o}){return t.jsx(y,{"data-slot":"dialog-description",className:n("pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",e),...o})}C.__docgenInfo={description:`The Dialog component displays a modal dialog window. Built on Radix UI's Dialog primitive and
styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"Dialog"};S.__docgenInfo={description:`Main container for dialog content. Renders inside a portal with an overlay backdrop, centered on
screen. Includes an optional close button in the top corner.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogContent",props:{overlayClassName:{required:!1,tsType:{name:"string"},description:"Additional CSS classes for the backdrop (`DialogOverlay`). Use when one dialog needs different\noverlay styling than the default."},overlayStyle:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Inline styles for the backdrop (`DialogOverlay`). Needed for anything the overlay sets inline —\nnotably `zIndex`, which an `overlayClassName` cannot override."},showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};O.__docgenInfo={description:`Renders the dialog's description text in a muted style. Used inside DialogHeader.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogDescription"};R.__docgenInfo={description:`Container for the dialog's footer area. Lays out action buttons in a row on larger screens.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogFooter",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};j.__docgenInfo={description:`Container for the dialog's header area. Stacks title and description vertically.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogHeader"};r.__docgenInfo={description:`Semi-transparent backdrop rendered behind the dialog content. Animates on open/close.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogOverlay"};l.__docgenInfo={description:`Portals the dialog content into \`document.body\` to avoid z-index and overflow issues.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogPortal"};T.__docgenInfo={description:`Renders the dialog's title as a styled heading. Used inside DialogHeader.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogTitle"};U.__docgenInfo={description:`Button or element that opens the dialog when clicked.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogTrigger"};export{C as D,U as a,S as b,j as c,T as d,O as e,R as f};
