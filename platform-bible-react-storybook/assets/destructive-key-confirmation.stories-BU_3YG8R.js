import{j as o,r as c}from"./iframe-Db0yrjdZ.js";import"./index-BKT-qVtu.js";import{c as v}from"./utils-BPbySc-g.js";import{a as F}from"./kbd-C5X0vbm2.js";import{T as W,a as G,b as V,c as U}from"./tooltip-CjPCnDtI.js";import{t as D}from"./scripture-util-BNsEPlLA-BT_1BsIP.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./index-wk9rVj3k.js";import"./button-CRMK9Nqo.js";import"./index-BnuTq2W6.js";import"./index-xLgDz77E.js";import"./z-index-CoNkaVR8.js";import"./index-_nZ8VTuX.js";import"./index--w3j8_cI.js";import"./index-JjLkhp_p.js";import"./index-C-sYFee8.js";import"./index-CkQXDgc8.js";import"./index-HMAF8pjF.js";import"./index-BPY64oKT.js";import"./index-CeCw3txk.js";import"./index-B4oXjowB.js";import"./index-YAvdY1RD.js";import"./index-DTnr8bKi.js";function Y(e,t){const[n,r]=c.useState(e),[i,l]=c.useState(t);return e!==n&&(r(e),e&&l(t)),e?t:i}function A({open:e,anchorRect:t,message:n,confirmingKeyLabel:r,side:i="bottom",align:l="start",showArrow:s=!0}){const k=e?D(n,{key:r}).join(""):"",{anchorRect:p,message:m,confirmingKeyLabel:u,showArrow:w}=Y(e,{anchorRect:t,message:n,confirmingKeyLabel:r,showArrow:s});return o.jsxs(W,{children:[o.jsx("span",{role:"status",className:"tw:sr-only",children:k}),o.jsxs(G,{open:e,onOpenChange:()=>{},children:[o.jsx(V,{"aria-hidden":"true",tabIndex:-1,className:v("tw:absolute tw:opacity-0 tw:pointer-events-none","tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0"),style:{top:p.top,left:p.left,width:p.width,height:p.height}}),o.jsx(U,{side:i,align:l,showArrow:w,arrowPadding:8,className:v("tw:p-0 tw:has-data-[slot=kbd]:pe-0 tw:bg-background tw:text-destructive tw:border tw:border-destructive"),arrowClassName:"tw:bg-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:fill-[color-mix(in_oklab,var(--destructive)_10%,var(--background))] tw:border tw:border-destructive",children:o.jsx("div",{className:"tw:w-full tw:h-full tw:rounded-md tw:bg-destructive/10 tw:px-3 tw:py-1.5",children:D(m,{key:o.jsx(F,{className:v("tw:border tw:border-destructive tw:in-data-[slot=tooltip-content]:text-destructive","tw:align-middle"),children:u})}).map((x,T)=>o.jsx(c.Fragment,{children:x},`key-${T}`))})})]})]})}A.__docgenInfo={description:`A destructive-styled "press again to confirm" hint, anchored to an arbitrary point (\`anchorRect\`)
rather than a rendered trigger element. Built for two-step destructive actions (e.g. deleting a
verse marker on a second Backspace/Delete) where the caller owns detecting the "armed" state and
this component only renders the hint.`,methods:[],displayName:"DestructiveKeyConfirmation",props:{open:{required:!0,tsType:{name:"boolean"},description:"Whether the confirmation hint is currently showing."},anchorRect:{required:!0,tsType:{name:"signature",type:"object",raw:"{ top: number; left: number; width: number; height: number }",signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:"Position and size of the invisible anchor, in the coordinates of the nearest `position:\nrelative` ancestor. Typically the bounding rect of the element the hint should point at (e.g. a\nverse marker), recomputed by the caller as it moves/scrolls."},message:{required:!0,tsType:{name:"string"},description:"Localized message to display. Include a `{key}` placeholder where the confirming key belongs."},confirmingKeyLabel:{required:!0,tsType:{name:"string"},description:`Localized/display label for the key that confirms the action on a second press (e.g.
"Backspace").`},side:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:"Tooltip placement side. Defaults to `'bottom'`.\n\nOnly `'top'`/`'bottom'` are supported — the bordered arrow this component renders relies on\nclip-path/translate math in `tooltip.tsx` that has only been worked out for those two sides;\nthe equivalent math for `'left'`/`'right'` was tried and found visibly broken (see\ntooltip.tsx), so those two values are omitted from this component's public API rather than\nsilently degrading to a borderless arrow.",defaultValue:{value:"'bottom'",computed:!1}},align:{required:!1,tsType:{name:"union",raw:"'start' | 'center' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'center'"},{name:"literal",value:"'end'"}]},description:"Tooltip placement alignment. Defaults to `'start'`.",defaultValue:{value:"'start'",computed:!1}},showArrow:{required:!1,tsType:{name:"boolean"},description:"Whether to render the pointer arrow. Defaults to `true`.",defaultValue:{value:"true",computed:!1}}}};const{expect:a,waitFor:$,within:J}=__STORYBOOK_MODULE_TEST__,h="In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep.",Q={"Press {key} again to remove verse marker":"Presione {key} de nuevo para borrar este número de versículo","Press {key} again to delete this selection":"Presione {key} de nuevo para eliminar este texto"},X={Backspace:"Retroceso",Delete:"Supr"};function Z({locale:e,message:t,confirmingKeyLabel:n,anchorPreview:r,selectionStart:i,selectionEnd:l,anchorRect:s,open:k,...p}){const m=c.useRef(null),u=c.useRef(null),[w,x]=c.useState();c.useLayoutEffect(()=>{const S=m.current,R=u.current;if(!S||!R)return;const C=S.getBoundingClientRect(),g=R.getBoundingClientRect();x({top:g.top-C.top,left:g.left-C.left,width:g.width,height:g.height})},[i,l,r]);const T=r==="selection"?w??s:s,z=r!=="selection"||w!==void 0;return o.jsxs("div",{ref:m,className:v("tw:relative tw:w-72 tw:rounded tw:border tw:border-dashed tw:border-muted-foreground/40 tw:p-4",r==="selection"?"tw:h-64":"tw:h-40"),children:[r==="selection"?o.jsxs("p",{className:"tw:text-sm tw:leading-6 tw:text-foreground",children:[h.slice(0,i),o.jsx("mark",{ref:u,className:"tw:rounded-xs tw:bg-primary/30 tw:px-0.5 tw:text-foreground",children:h.slice(i,l)}),h.slice(l)]}):o.jsx("span",{className:"tw:absolute tw:inline-flex tw:items-center tw:justify-center tw:rounded tw:bg-muted tw:font-mono tw:text-xs tw:text-muted-foreground",style:{top:s.top,left:s.left,width:s.width,height:s.height},children:"\\v 5"}),o.jsx(A,{...p,open:k&&z,anchorRect:T,message:e==="es"?Q[t]??t:t,confirmingKeyLabel:e==="es"?X[n]??n:n})]})}const Se={title:"Basics/DestructiveKeyConfirmation",component:A,tags:["autodocs","test"],parameters:{docs:{description:{component:'\nA destructive-styled "press again to confirm" hint for two-step destructive actions (e.g. deleting a\nverse marker on a second Backspace/Delete). Renders as a Tooltip anchored to `anchorRect` rather than\na real hovered trigger — the caller owns detecting the "armed" state and computing where to point.\n\nInclude a `{key}` placeholder in `message`; it\'s replaced with a `Kbd` showing `confirmingKeyLabel`.\n\nUse the **locale** control to preview the real Spanish translation of `message`/`confirmingKeyLabel`\nin place of whatever English text the other controls are set to (there\'s no Storybook-wide locale\nswitcher yet, so this is simulated per-story).\n        '}}},argTypes:{open:{control:"boolean"},message:{control:"text"},confirmingKeyLabel:{control:"text"},side:{options:["top","bottom"],control:{type:"inline-radio"}},align:{options:["start","center","end"],control:{type:"inline-radio"}},showArrow:{control:"boolean"},anchorRect:{control:"object"},locale:{options:["en","es"],control:{type:"inline-radio"}},anchorPreview:{options:["marker","selection"],control:{type:"inline-radio"}},selectionStart:{control:{type:"number",min:0,max:h.length},if:{arg:"anchorPreview",eq:"selection"}},selectionEnd:{control:{type:"number",min:0,max:h.length},if:{arg:"anchorPreview",eq:"selection"}}},args:{locale:"en",anchorPreview:"marker",selectionStart:73,selectionEnd:95},render:e=>o.jsx(Z,{...e})};async function I(){return $(()=>{const e=document.querySelector('[data-slot="tooltip-content"]');if(!e)throw new Error("Tooltip content not found");return e})}const d={args:{open:!0,anchorRect:{top:40,left:40,width:32,height:20},message:"Press {key} again to remove verse marker",confirmingKeyLabel:"Backspace",side:"bottom",align:"start",showArrow:!0},play:async({step:e})=>{const t=await I();await e("Substitutes {key} with a Kbd showing the confirming key label",async()=>{a(t.getAttribute("data-state")).toMatch(/open/);const n=t.querySelector("kbd");a(n).not.toBeNull(),a(n).toHaveTextContent("Backspace"),a(t).toHaveTextContent("Press"),a(t).toHaveTextContent("again to remove verse marker")}),await e("Renders the pointer arrow by default",async()=>{a(t.querySelectorAll("svg")).toHaveLength(1)})}},f={args:{...d.args,anchorRect:{top:24,left:8,width:175,height:20},anchorPreview:"selection",message:"Press {key} again to delete this selection",confirmingKeyLabel:"Delete"},parameters:{docs:{description:{story:"The other real-world message this hint is used for — confirming deletion of a selection, rather than a single marker. Adjust `selectionStart`/`selectionEnd` to move the highlighted range; the hint follows it automatically."}}}},y={args:{...d.args,showArrow:!1},play:async({step:e})=>{const t=await I();await e("showArrow={false} removes the arrow element from the DOM",async()=>{a(t.querySelectorAll("svg")).toHaveLength(0)})}},b={args:{...d.args,open:!1},parameters:{docs:{description:{story:"The disarmed state — `open={false}` hides the hint entirely."}}},play:async({canvasElement:e,step:t})=>{await t("open={false} keeps the tooltip content out of the DOM entirely",async()=>{a(document.querySelector('[data-slot="tooltip-content"]')).not.toBeInTheDocument()}),await t("The screen-reader live region stays empty while closed",async()=>{a(J(e).getByRole("status")).toHaveTextContent("")})}};var q,j,B;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    open: true,
    anchorRect: {
      top: 40,
      left: 40,
      width: 32,
      height: 20
    },
    message: 'Press {key} again to remove verse marker',
    confirmingKeyLabel: 'Backspace',
    side: 'bottom',
    align: 'start',
    showArrow: true
  },
  play: async ({
    step
  }) => {
    const tooltip = await findTooltipContent();
    await step('Substitutes {key} with a Kbd showing the confirming key label', async () => {
      expect(tooltip.getAttribute('data-state')).toMatch(/open/);
      const kbd = tooltip.querySelector('kbd');
      expect(kbd).not.toBeNull();
      expect(kbd).toHaveTextContent('Backspace');
      expect(tooltip).toHaveTextContent('Press');
      expect(tooltip).toHaveTextContent('again to remove verse marker');
    });
    await step('Renders the pointer arrow by default', async () => {
      expect(tooltip.querySelectorAll('svg')).toHaveLength(1);
    });
  }
}`,...(B=(j=d.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var L,N,E;f.parameters={...f.parameters,docs:{...(L=f.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    anchorRect: {
      top: 24,
      left: 8,
      width: 175,
      height: 20
    },
    anchorPreview: 'selection',
    message: 'Press {key} again to delete this selection',
    confirmingKeyLabel: 'Delete'
  },
  parameters: {
    docs: {
      description: {
        story: 'The other real-world message this hint is used for — confirming deletion of a selection, rather than a single marker. Adjust \`selectionStart\`/\`selectionEnd\` to move the highlighted range; the hint follows it automatically.'
      }
    }
  }
}`,...(E=(N=f.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var P,K,_;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showArrow: false
  },
  play: async ({
    step
  }) => {
    const tooltip = await findTooltipContent();
    await step('showArrow={false} removes the arrow element from the DOM', async () => {
      expect(tooltip.querySelectorAll('svg')).toHaveLength(0);
    });
  }
}`,...(_=(K=y.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var O,H,M;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    open: false
  },
  parameters: {
    docs: {
      description: {
        story: 'The disarmed state — \`open={false}\` hides the hint entirely.'
      }
    }
  },
  play: async ({
    canvasElement,
    step
  }) => {
    await step('open={false} keeps the tooltip content out of the DOM entirely', async () => {
      expect(document.querySelector('[data-slot="tooltip-content"]')).not.toBeInTheDocument();
    });
    await step('The screen-reader live region stays empty while closed', async () => {
      // The status span isn't portalled (unlike the tooltip content above), so it's queried via
      // canvasElement/within rather than the global \`screen\`.
      expect(within(canvasElement).getByRole('status')).toHaveTextContent('');
    });
  }
}`,...(M=(H=b.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};const Re=["Default","SelectionDeletion","NoArrow","Closed"];export{b as Closed,d as Default,y as NoArrow,f as SelectionDeletion,Re as __namedExportsOrder,Se as default};
