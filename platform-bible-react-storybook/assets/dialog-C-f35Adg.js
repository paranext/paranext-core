import{j as e,b as u}from"./iframe-Co0esBWG.js";import{b as w,c as g}from"./z-index-BATlIu8s.js";import{c as n}from"./utils-BPbySc-g.js";import{B as s}from"./button-ETRJLBBa.js";import{c as h}from"./createReactComponent-DXO_B0eA.js";import{R as f,T as x,a as D,C as y,b as d,D as I,P as v,O as k}from"./index-CF0IDChK.js";/**
 * @license @tabler/icons-react v3.41.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M18 6l-12 12",key:"svg-0"}],["path",{d:"M6 6l12 12",key:"svg-1"}]],_=h("outline","x","X",b);function N({...t}){return e.jsx(f,{"data-slot":"dialog",...t})}function U({...t}){return e.jsx(D,{"data-slot":"dialog-trigger",...t})}function l({...t}){return e.jsx(v,{"data-slot":"dialog-portal",...t})}function r({className:t,style:o,...a}){return e.jsx(k,{"data-slot":"dialog-overlay",className:n("tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",t),style:{zIndex:g,...o},...a})}function j({className:t,children:o,showCloseButton:a=!0,overlayClassName:i,style:c,...m}){const p=u();return e.jsxs(l,{children:[e.jsx(r,{className:i}),e.jsxs(y,{"data-slot":"dialog-content",className:n("pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",t),style:{zIndex:w,...c},dir:p,...m,children:[o,a&&e.jsx(d,{"data-slot":"dialog-close",asChild:!0,children:e.jsxs(s,{variant:"ghost",className:"tw:absolute tw:top-2 tw:end-2",size:"icon-sm",children:[e.jsx(_,{}),e.jsx("span",{className:"tw:sr-only",children:"Close"})]})})]})]})}function C({className:t,...o}){return e.jsx("div",{"data-slot":"dialog-header",className:n("pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",t),...o})}function R({className:t,showCloseButton:o=!1,children:a,...i}){return e.jsxs("div",{"data-slot":"dialog-footer",className:n("pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",t),...i,children:[a,o&&e.jsx(d,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Close"})})]})}function S({className:t,...o}){return e.jsx(x,{"data-slot":"dialog-title",className:n("pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",t),...o})}function T({className:t,...o}){return e.jsx(I,{"data-slot":"dialog-description",className:n("pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",t),...o})}N.__docgenInfo={description:`The Dialog component displays a modal dialog window. Built on Radix UI's Dialog primitive and
styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"Dialog"};j.__docgenInfo={description:`Main container for dialog content. Renders inside a portal with an overlay backdrop, centered on
screen. Includes an optional close button in the top corner.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogContent",props:{overlayClassName:{required:!1,tsType:{name:"string"},description:"Additional CSS classes for the backdrop (`DialogOverlay`). Use when one dialog needs different\noverlay styling than the default."},showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};T.__docgenInfo={description:`Renders the dialog's description text in a muted style. Used inside DialogHeader.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogDescription"};R.__docgenInfo={description:`Container for the dialog's footer area. Lays out action buttons in a row on larger screens.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogFooter",props:{showCloseButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};C.__docgenInfo={description:`Container for the dialog's header area. Stacks title and description vertically.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogHeader"};r.__docgenInfo={description:`Semi-transparent backdrop rendered behind the dialog content. Animates on open/close.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogOverlay"};l.__docgenInfo={description:`Portals the dialog content into \`document.body\` to avoid z-index and overflow issues.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogPortal"};S.__docgenInfo={description:`Renders the dialog's title as a styled heading. Used inside DialogHeader.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogTitle"};U.__docgenInfo={description:`Button or element that opens the dialog when clicked.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/dialog}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/dialog}`,methods:[],displayName:"DialogTrigger"};export{N as D,U as a,j as b,C as c,S as d,T as e,R as f};
