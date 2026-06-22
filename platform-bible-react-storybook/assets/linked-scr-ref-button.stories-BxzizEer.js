import{j as e}from"./iframe-CvSXZbDO.js";import{c as T}from"./utils-BPbySc-g.js";import{B as C}from"./button-Cp0hcnRJ.js";import{T as w,a as R,b as N,c as O}from"./tooltip-C4i2SHZt.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-jZma1rOr.js";import"./z-index-CoNkaVR8.js";import"./index-2pHAkJVK.js";import"./index-sG_NXLXo.js";import"./index-Cy205FYd.js";import"./index-BQeWt8Kg.js";import"./index-DLAOPWUY.js";import"./index-DUK7f6Bu.js";import"./index-BcZtYP4t.js";import"./index-8ivjfz8v.js";import"./index-CYTS5ohe.js";import"./index-Bk52InRC.js";import"./index-Bs1iIkQL.js";function y({scrRef:t,onClick:i,tooltipContent:s,ariaLabel:v,className:x,testId:k="linked-scr-ref-button"}){if(t==="")return;const a=e.jsx(C,{type:"button",variant:"link",onClick:i,disabled:!i,"aria-label":v,className:T("tw:h-auto tw:p-0 tw:text-start tw:font-mono tw:text-sm",x),"data-testid":k,children:t});return s?e.jsx(w,{delayDuration:0,children:e.jsxs(R,{children:[e.jsx(N,{asChild:!0,children:a}),e.jsx(O,{children:s})]})}):a}y.__docgenInfo={description:`Renders a scripture reference as a clickable shadcn link-button with a hover tooltip. Designed
for table cells / row affordances where the reference string itself is the navigation target —
e.g. the first column of the markers-checklist data table, where clicking \`GEN 1:1\` navigates the
active scripture editor to that verse.

The button uses \`variant="link"\` styling, so it inherits the foreground color and
underline-on-hover treatment without the chrome of a standard button. Wrap in a parent that
controls layout (the button itself is \`inline-flex\`).

If no \`onClick\` is provided, the button is disabled and the tooltip still surfaces (useful for
read-only contexts where the reference should not be navigable but should still be readable).`,methods:[],displayName:"LinkedScrRefButton",props:{scrRef:{required:!0,tsType:{name:"string"},description:`The scripture reference (or any short label) to render as link text. Already-formatted — no
internal formatting is applied. Pass an empty string to render nothing.`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLButtonElement"}],raw:"MouseEventHandler<HTMLButtonElement>"},description:"Click handler. Receives the standard mouse event."},tooltipContent:{required:!1,tsType:{name:"ReactNode"},description:'Tooltip content displayed on hover. Typical usage: a localized "Go to {scrRef}" string built by\nthe consumer. Pass a `ReactNode` to surface complex content if needed.'},ariaLabel:{required:!1,tsType:{name:"string"},description:`Optional accessible name override. When omitted, the button's text content (the scripture ref)
provides the accessible name.`},className:{required:!1,tsType:{name:"string"},description:"Optional class name appended to the button's class list."},testId:{required:!1,tsType:{name:"string"},description:"Optional `data-testid` for the button. The default `'linked-scr-ref-button'` is rarely unique\nenough — pass a feature-scoped value when the button appears in tested flows.",defaultValue:{value:"'linked-scr-ref-button'",computed:!1}}}};const{fn:g}=__STORYBOOK_MODULE_TEST__,K={title:"Basics/LinkedScrRefButton",component:y,tags:["autodocs","test"],parameters:{docs:{description:{component:`
A small primitive that renders a scripture reference (or any short label) as a shadcn link-style button, optionally wrapped in a tooltip.

**Features:**
- Click the reference text to navigate (consumer-supplied \`onClick\`)
- Optional hover tooltip via \`tooltipContent\`
- Disabled automatically when no \`onClick\` is provided (read-only mode)
- Tight, inline styling — designed for table cells / row affordances
        `}}},argTypes:{scrRef:{control:"text",description:"Already-formatted reference text. Pass an empty string to render nothing."},onClick:{action:"clicked",description:"Click handler. Omit to render the button in disabled / read-only mode."},tooltipContent:{control:"text",description:"Optional tooltip content shown on hover."},ariaLabel:{control:"text",description:"Optional accessible name override."},className:{control:"text",description:"Optional class name appended to the button."},testId:{control:"text",description:"Optional data-testid for the button."}},decorators:[t=>e.jsx("div",{className:"tw:p-4",children:e.jsx(t,{})})]},o={args:{scrRef:"JHN 3:16",onClick:g(),tooltipContent:"Go to JHN 3:16"}},n={args:{scrRef:"GEN 1:1",onClick:g()},parameters:{docs:{description:{story:"When `tooltipContent` is omitted the button is rendered without the tooltip wrapper."}}}},r={args:{scrRef:"PSA 23:1",tooltipContent:"Read-only context — no navigation"},parameters:{docs:{description:{story:"When `onClick` is omitted the button is automatically disabled. Useful in read-only contexts where the reference should still be readable."}}}};var l,d,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    scrRef: 'JHN 3:16',
    onClick: fn(),
    tooltipContent: 'Go to JHN 3:16'
  }
}`,...(c=(d=o.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,u,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    scrRef: 'GEN 1:1',
    onClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'When \`tooltipContent\` is omitted the button is rendered without the tooltip wrapper.'
      }
    }
  }
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var h,f,b;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    scrRef: 'PSA 23:1',
    tooltipContent: 'Read-only context — no navigation'
  },
  parameters: {
    docs: {
      description: {
        story: 'When \`onClick\` is omitted the button is automatically disabled. Useful in read-only contexts where the reference should still be readable.'
      }
    }
  }
}`,...(b=(f=r.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};const V=["Default","WithoutTooltip","Disabled"];export{o as Default,r as Disabled,n as WithoutTooltip,V as __namedExportsOrder,K as default};
