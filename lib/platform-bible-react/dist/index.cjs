"use strict";var hi=Object.defineProperty;var fi=(t,e,a)=>e in t?hi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var Dt=(t,e,a)=>fi(t,typeof e!="symbol"?e+"":e,a);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("react/jsx-runtime"),l=require("react"),Ve=require("cmdk"),mi=require("clsx"),_o=require("tailwind-merge"),k=require("radix-ui"),ge=require("class-variance-authority"),ht=require("@tabler/icons-react"),st=require("@sillsdev/scripture"),D=require("platform-bible-utils"),$=require("lucide-react"),v=require("lexical"),ca=require("@lexical/rich-text"),Xa=require("react-dom"),vi=require("@lexical/table"),No=require("@lexical/headless"),Mt=require("@tanstack/react-table"),bi=require("markdown-to-jsx"),Xt=require("@eten-tech-foundation/platform-editor"),xi=require("react-hotkeys-hook"),Te=require("vaul"),yi=require("react-resizable-panels"),ki=require("next-themes"),Co=require("sonner");function ji(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const a in t)if(a!=="default"){const o=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(e,a,o.get?o:{enumerable:!0,get:()=>t[a]})}}return e.default=t,Object.freeze(e)}const ba=ji(yi),_i=_o.extendTailwindMerge({prefix:"tw"});function la(t){const e=[];let a="",o=0;for(let n=0;n<t.length;n++){const i=t[n];i==="["?o+=1:i==="]"&&(o-=1),i===":"&&o===0?(e.push(a),a=""):a+=i}return e.push(a),e}function Ni(t){if(t.startsWith("tw:"))return{normalized:t,original:t};const e=la(t),a=e.findIndex(i=>i.startsWith("-tw-"));if(a!==-1){const i=e[a].slice(4);return{normalized:`tw:${[...e.filter((w,d)=>d!==a),`-${i}`].join(":")}`,original:t}}const o=e.findIndex(i=>i.startsWith("!tw-"));if(o!==-1){const i=e[o].slice(4);return{normalized:`tw:${[...e.filter((w,d)=>d!==o),`!${i}`].join(":")}`,original:t}}const n=e[e.length-1];if(n.startsWith("tw-")){const i=n.slice(3);return{normalized:`tw:${[...e.slice(0,-1),i].join(":")}`,original:t}}return{normalized:t,original:t}}function Ci(t,e){if(e.startsWith("tw:"))return t;const a=la(t);if(a[0]!=="tw")return t;const o=a.slice(1,-1),n=a[a.length-1],i=la(e),s=i.some(w=>w.startsWith("-tw-")),c=i.some(w=>w.startsWith("!tw-"));if(s&&n.startsWith("-")){const w=n.slice(1);return[...o,`-tw-${w}`].join(":")}if(c&&n.startsWith("!")){const w=n.slice(1);return[...o,`!tw-${w}`].join(":")}return[...o,`tw-${n}`].join(":")}function h(...t){const e=mi.clsx(t);if(!e)return e;if(e.indexOf("tw-")===-1)return _i(e);const a=e.split(" ").filter(Boolean),o=new Map,n=[];return a.forEach(w=>{const d=Ni(w);o.set(d.normalized,d.original),n.push(d.normalized)}),_o.twMerge(n.join(" ")).split(" ").filter(Boolean).map(w=>{const d=o.get(w);return d?Ci(w,d):w}).join(" ")}const We=250,xa=300,Vr=400,So=450,Eo=500,To=550,ya=ge.cva("pr-twp tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:active:not-aria-[haspopup]:translate-y-px tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",{variants:{variant:{default:"tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",outline:"tw:border-border tw:bg-background tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:border-input tw:dark:bg-input/30 tw:dark:hover:bg-input/50",secondary:"tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:aria-expanded:bg-secondary tw:aria-expanded:text-secondary-foreground",ghost:"tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:hover:bg-muted/50",destructive:"tw:bg-destructive/10 tw:text-destructive tw:hover:bg-destructive/20 tw:focus-visible:border-destructive/40 tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:hover:bg-destructive/30 tw:dark:focus-visible:ring-destructive/40",link:"tw:text-primary tw:underline-offset-4 tw:hover:underline"},size:{default:"tw:h-8 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",xs:"tw:h-6 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),10px)] tw:px-2 tw:text-xs tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3",sm:"tw:h-7 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",lg:"tw:h-9 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",icon:"tw:size-8","icon-xs":"tw:size-6 tw:rounded-[min(var(--tw-radius-md),10px)] tw:in-data-[slot=button-group]:rounded-lg tw:[&_svg:not([class*=size-])]:size-3","icon-sm":"tw:size-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:in-data-[slot=button-group]:rounded-lg","icon-lg":"tw:size-9"}},defaultVariants:{variant:"default",size:"default"}});function F({className:t,variant:e="default",size:a="default",asChild:o=!1,...n}){const i=o?k.Slot.Root:"button";return r.jsx(i,{"data-slot":"button","data-variant":e,"data-size":a,className:h(ya({variant:e,size:a,className:t})),...n})}const Si="layoutDirection";function ft(){const t=localStorage.getItem(Si);return t==="rtl"?t:"ltr"}function Er({...t}){return r.jsx(k.Dialog.Root,{"data-slot":"dialog",...t})}function Ei({...t}){return r.jsx(k.Dialog.Trigger,{"data-slot":"dialog-trigger",...t})}function Ro({...t}){return r.jsx(k.Dialog.Portal,{"data-slot":"dialog-portal",...t})}function Ti({...t}){return r.jsx(k.Dialog.Close,{"data-slot":"dialog-close",...t})}function zo({className:t,style:e,...a}){return r.jsx(k.Dialog.Overlay,{"data-slot":"dialog-overlay",className:h("tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",t),style:{zIndex:So,...e},...a})}function Tr({className:t,children:e,showCloseButton:a=!0,overlayClassName:o,style:n,...i}){const s=ft();return r.jsxs(Ro,{children:[r.jsx(zo,{className:o}),r.jsxs(k.Dialog.Content,{"data-slot":"dialog-content",className:h("pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",t),style:{zIndex:Eo,...n},dir:s,...i,children:[e,a&&r.jsx(k.Dialog.Close,{"data-slot":"dialog-close",asChild:!0,children:r.jsxs(F,{variant:"ghost",className:"tw:absolute tw:top-2 tw:end-2",size:"icon-sm",children:[r.jsx(ht.IconX,{}),r.jsx("span",{className:"tw:sr-only",children:"Close"})]})})]})]})}function Rr({className:t,...e}){return r.jsx("div",{"data-slot":"dialog-header",className:h("pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",t),...e})}function da({className:t,showCloseButton:e=!1,children:a,...o}){return r.jsxs("div",{"data-slot":"dialog-footer",className:h("pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",t),...o,children:[a,e&&r.jsx(k.Dialog.Close,{asChild:!0,children:r.jsx(F,{variant:"outline",children:"Close"})})]})}function zr({className:t,...e}){return r.jsx(k.Dialog.Title,{"data-slot":"dialog-title",className:h("pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",t),...e})}function Ri({className:t,...e}){return r.jsx(k.Dialog.Description,{"data-slot":"dialog-description",className:h("pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",t),...e})}function Xe({className:t,type:e,...a}){return r.jsx("input",{type:e,"data-slot":"input",className:h("pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",t),...a})}function zi({className:t,...e}){return r.jsx("textarea",{"data-slot":"textarea",className:h("pr-twp tw:flex tw:field-sizing-content tw:min-h-16 tw:w-full tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-2 tw:text-base tw:transition-colors tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",t),...e})}function Di({className:t,...e}){return r.jsx("div",{"data-slot":"input-group",role:"group",className:h("pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",t),...e})}const Ii=ge.cva("tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-5px)] tw:[&>svg:not([class*=size-])]:size-4",{variants:{align:{"inline-start":"tw:order-first tw:ps-2 tw:has-[>button]:ms-[-0.3rem] tw:has-[>kbd]:ms-[-0.15rem]","inline-end":"tw:order-last tw:pe-2 tw:has-[>button]:me-[-0.3rem] tw:has-[>kbd]:me-[-0.15rem]","block-start":"tw:order-first tw:w-full tw:justify-start tw:px-2.5 tw:pt-2 tw:group-has-[>input]/input-group:pt-2 tw:[.border-b]:pb-2","block-end":"tw:order-last tw:w-full tw:justify-start tw:px-2.5 tw:pb-2 tw:group-has-[>input]/input-group:pb-2 tw:[.border-t]:pt-2"}},defaultVariants:{align:"inline-start"}});function Mi({className:t,align:e="inline-start",...a}){return r.jsx("div",{role:"group","data-slot":"input-group-addon","data-align":e,className:h(Ii({align:e}),t),onClick:o=>{var n,i;o.target instanceof HTMLElement&&o.target.closest("button")||(i=(n=o.currentTarget.parentElement)==null?void 0:n.querySelector("input"))==null||i.focus()},...a})}ge.cva("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none",{variants:{size:{xs:"tw:h-6 tw:gap-1 tw:rounded-[calc(var(--radius)-3px)] tw:px-1.5 tw:[&>svg:not([class*=size-])]:size-3.5",sm:"tw:","icon-xs":"tw:size-6 tw:rounded-[calc(var(--radius)-3px)] tw:p-0 tw:has-[>svg]:p-0","icon-sm":"tw:size-8 tw:p-0 tw:has-[>svg]:p-0"}},defaultVariants:{size:"xs"}});function he({className:t,...e}){return r.jsx(Ve.Command,{"data-slot":"command",className:h("pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",t),...e})}function Fe({className:t,onKeyDown:e,...a}){const o=ft(),n=l.useCallback(i=>{if(e==null||e(i),i.defaultPrevented||i.key!==" "||i.currentTarget.value!=="")return;const s=i.currentTarget.closest("[cmdk-root]"),c=s==null?void 0:s.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');c&&(i.preventDefault(),i.stopPropagation(),c.click())},[e]);return r.jsx("div",{"data-slot":"command-input-wrapper",className:"tw:p-1 tw:pb-0",dir:o,children:r.jsxs(Di,{className:"tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!",children:[r.jsx(Ve.Command.Input,{"data-slot":"command-input",className:h("tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",t),onKeyDown:n,...a}),r.jsx(Mi,{children:r.jsx(ht.IconSearch,{className:"tw:size-4 tw:shrink-0 tw:opacity-50"})})]})})}function fe({className:t,...e}){return r.jsx(Ve.Command.List,{"data-slot":"command-list",className:h("pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",t),...e})}function Ze({className:t,...e}){return r.jsx(Ve.Command.Empty,{"data-slot":"command-empty",className:h("pr-twp tw:py-6 tw:text-center tw:text-sm",t),...e})}function re({className:t,...e}){return r.jsx(Ve.Command.Group,{"data-slot":"command-group",className:h("pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",t),...e})}function ka({className:t,...e}){return r.jsx(Ve.Command.Separator,{"data-slot":"command-separator",className:h("pr-twp tw:-mx-1 tw:h-px tw:bg-border",t),...e})}function ie({className:t,children:e,...a}){return r.jsxs(Ve.Command.Item,{"data-slot":"command-item",className:h("pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",t),...a,children:[e,r.jsx(ht.IconCheck,{className:"tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100"})]})}function Oi({className:t,...e}){return r.jsx("span",{"data-slot":"command-shortcut",className:h("pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",t),...e})}const Do=(t,e,a,o,n)=>{switch(t){case D.Section.OT:return e??"Old Testament";case D.Section.NT:return a??"New Testament";case D.Section.DC:return o??"Deuterocanon";case D.Section.Extra:return n??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},$i=(t,e,a,o,n)=>{switch(t){case D.Section.OT:return e??"OT";case D.Section.NT:return a??"NT";case D.Section.DC:return o??"DC";case D.Section.Extra:return n??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ce(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??st.Canon.bookIdToEnglishName(t)}function ja(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Io=st.Canon.allBookIds.filter(t=>!st.Canon.isObsolete(st.Canon.bookIdToNumber(t))),te=Object.fromEntries(Io.map(t=>[t,st.Canon.bookIdToEnglishName(t)]));function _a(t,e,a){const o=e.trim().toLowerCase();if(!o)return!1;const n=st.Canon.bookIdToEnglishName(t),i=a==null?void 0:a.get(t);return!!(D.includes(n.toLowerCase(),o)||D.includes(t.toLowerCase(),o)||(i?D.includes(i.localizedName.toLowerCase(),o)||D.includes(i.localizedId.toLowerCase(),o):!1))}const Mo=l.forwardRef(({bookId:t,isSelected:e,onSelect:a,onMouseDown:o,section:n,className:i,showCheck:s=!1,localizedBookNames:c,commandValue:w,disabled:d=!1},u)=>{const g=l.useRef(!1),m=()=>{d||(g.current||a==null||a(t),setTimeout(()=>{g.current=!1},100))},p=b=>{if(d){b.preventDefault();return}g.current=!0,o?o(b):a==null||a(t)},f=l.useMemo(()=>Ce(t,c),[t,c]),y=l.useMemo(()=>ja(t,c),[t,c]);return r.jsx("div",{className:h("tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",{"tw:border-s-red-200":n===D.Section.OT,"tw:border-s-purple-200":n===D.Section.NT,"tw:border-s-indigo-200":n===D.Section.DC,"tw:border-s-amber-200":n===D.Section.Extra}),children:r.jsxs(ie,{ref:u,value:w||`${t} ${st.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:p,role:"option","aria-selected":e,"aria-disabled":d||void 0,"aria-label":`${st.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,disabled:d,className:h(i,d&&"tw-cursor-not-allowed tw-opacity-50"),children:[s&&r.jsx($.Check,{className:h("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",e?"tw:opacity-100":"tw:opacity-0")}),r.jsx("span",{className:"tw:min-w-0 tw:flex-1",children:f}),r.jsx("span",{className:"tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground",children:y})]})})});function se({...t}){return r.jsx(k.Popover.Root,{"data-slot":"popover",...t})}function me({...t}){return r.jsx(k.Popover.Trigger,{"data-slot":"popover-trigger",...t})}const Oo=l.createContext(null);function jr({container:t,children:e}){return r.jsx(Oo.Provider,{value:t,children:e})}function ce({className:t,align:e="center",sideOffset:a=4,style:o,...n}){const i=ft(),s=l.useContext(Oo);return r.jsx(k.Popover.Portal,{container:s??void 0,children:r.jsx(k.Popover.Content,{"data-slot":"popover-content",align:e,sideOffset:a,className:h("pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",t),style:{zIndex:We,...o},dir:i,...n})})}function $o({...t}){return r.jsx(k.Popover.Anchor,{"data-slot":"popover-anchor",...t})}function Ai({className:t,...e}){return r.jsx("div",{"data-slot":"popover-header",className:h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm",t),...e})}function Pi({className:t,...e}){return r.jsx("div",{"data-slot":"popover-title",className:h("pr-twp tw:font-medium",t),...e})}function Li({className:t,...e}){return r.jsx("p",{"data-slot":"popover-description",className:h("pr-twp tw:text-muted-foreground",t),...e})}function Ao(t,e,a){return`${t} ${te[t]}${e?` ${ja(t,e)} ${Ce(t,e)}`:""}`}function Po({recentSearches:t,onSearchItemSelect:e,renderItem:a=u=>String(u),getItemKey:o=u=>String(u),ariaLabel:n="Show recent searches",groupHeading:i="Recent",id:s,classNameForItems:c,buttonClassName:w="tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",buttonVariant:d="ghost"}){const[u,g]=l.useState(!1);if(t.length===0)return;const m=p=>{e(p),g(!1)};return r.jsxs(se,{open:u,onOpenChange:g,children:[r.jsx(me,{asChild:!0,children:r.jsx(F,{variant:d,size:"icon",className:w,"aria-label":n,children:r.jsx($.Clock,{className:"tw:h-4 tw:w-4"})})}),r.jsx(ce,{id:s,className:"tw:w-[300px] tw:p-0",align:"start",children:r.jsx(he,{children:r.jsx(fe,{children:r.jsx(re,{heading:i,children:t.map(p=>r.jsxs(ie,{onSelect:()=>m(p),className:h("tw:flex tw:items-center",c),children:[r.jsx($.Clock,{className:"tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50"}),r.jsx("span",{children:a(p)})]},o(p)))})})})})]})}function Bi(t,e,a=(n,i)=>n===i,o=15){return n=>{const i=t.filter(c=>!a(c,n)),s=[n,...i.slice(0,o-1)];e(s)}}const _r={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Vi=[_r.BOOK_ONLY,_r.BOOK_CHAPTER,_r.BOOK_CHAPTER_VERSE];function Fi(t){return _r.BOOK_CHAPTER_VERSE.test(t.trim())}function Za(t,e){return st.Canon.bookIdToNumber(t)<st.Canon.bookIdToNumber(e.book)}function Gi(t,e,a){const o=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(a.book);return o<0?!0:o>0?!1:e<a.chapterNum}function Yr(t,e,a,o){const n=st.Canon.bookIdToNumber(t)-st.Canon.bookIdToNumber(o.book);return n<0?!0:n>0?!1:e<o.chapterNum?!0:e>o.chapterNum?!1:a<o.verseNum}function Ja(t){const e=/^[a-zA-Z]$/.test(t),a=/^[0-9]$/.test(t);return{isLetter:e,isDigit:a}}function we(t){return D.getChaptersForBook(st.Canon.bookIdToNumber(t))}function Ui(t,e,a){if(!t.trim()||e.length===0)return;const o=Vi.reduce((n,i)=>{if(n)return n;const s=i.exec(t.trim());if(s){const[c,w=void 0,d=void 0]=s.slice(1);let u;const g=e.filter(m=>_a(m,c,a));if(g.length===1&&([u]=g),!u&&w){if(st.Canon.isBookIdValid(c)){const m=c.toUpperCase();e.includes(m)&&(u=m)}if(!u&&a){const m=Array.from(a.entries()).find(([,p])=>p.localizedId.toLowerCase()===c.toLowerCase());m&&e.includes(m[0])&&([u]=m)}}if(!u&&w){const p=(f=>Object.keys(te).find(y=>te[y].toLowerCase()===f.toLowerCase()))(c);if(p&&e.includes(p)&&(u=p),!u&&a){const f=Array.from(a.entries()).find(([,y])=>y.localizedName.toLowerCase()===c.toLowerCase());f&&e.includes(f[0])&&([u]=f)}}if(u){let m=w?parseInt(w,10):void 0;m&&m>we(u)&&(m=Math.max(we(u),1));const p=d?parseInt(d,10):void 0;return{book:u,chapterNum:m,verseNum:p}}}},void 0);if(o)return o}function qi(t,e,a,o){const n=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],u=Math.max(we(d),1);o({book:d,chapterNum:u,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{const w=we(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const u=e[d+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),s=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:n,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:a==="ltr"?$.ChevronsLeft:$.ChevronsRight},{onClick:s,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:a==="ltr"?$.ChevronLeft:$.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:a==="ltr"?$.ChevronRight:$.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===we(t.book)||we(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:a==="ltr"?$.ChevronsRight:$.ChevronsLeft}],[t,e,a,n,s,c,i])}function Lo({count:t,valueBuilder:e,onSelect:a,itemRef:o,isDisabled:n,isDimmed:i,isSelected:s,className:c}){if(!(t<=0))return r.jsx(re,{children:r.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",c),children:Array.from({length:t},(w,d)=>d+1).map(w=>{const d=(n==null?void 0:n(w))??!1;return r.jsx(ie,{value:e(w),onSelect:()=>{d||a(w)},ref:o(w),disabled:d,"aria-disabled":d||void 0,className:h("tw-h-8 tw-min-w-0 tw-cursor-pointer tw-justify-center tw-rounded-md tw-px-0 tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":(s==null?void 0:s(w))??!1},{"tw-bg-muted/50 tw-text-muted-foreground/50":((i==null?void 0:i(w))??!1)&&!d},d&&"tw-cursor-not-allowed tw-opacity-40"),children:w},w)})})})}function Qa({bookId:t,scrRef:e,onChapterSelect:a,setChapterRef:o,isChapterDimmed:n,isChapterDisabled:i,className:s}){if(t)return r.jsx(Lo,{count:we(t),valueBuilder:c=>`${t} ${te[t]||""} ${c}`,onSelect:a,itemRef:o,isDisabled:i,isDimmed:n,isSelected:c=>t===e.book&&c===e.chapterNum,className:s})}function to({bookId:t,chapterNum:e,endVerse:a,scrRef:o,onVerseSelect:n,setVerseRef:i,isVerseDimmed:s,isVerseDisabled:c,className:w}){if(!(!t||a<=0))return r.jsx(Lo,{count:a,valueBuilder:d=>`${t} ${te[t]||""} ${e}:${d}`,onSelect:n,itemRef:i,isDisabled:c,isDimmed:s,isSelected:d=>t===o.book&&e===o.chapterNum&&d===o.verseNum,className:w})}function Nr({scrRef:t,handleSubmit:e,className:a,getActiveBookIds:o,localizedBookNames:n,localizedStrings:i,recentSearches:s,onAddRecentSearch:c,id:w,getEndVerse:d,disableReferencesUpTo:u,submitKeys:g,triggerContent:m,triggerVariant:p="outline",onOpenChange:f,onCloseAutoFocus:y,modal:b=!1,align:I="center"}){const C=ft(),[T,S]=l.useState(!1),[N,E]=l.useState(""),[z,j]=l.useState(""),[x,R]=l.useState("books"),[P,G]=l.useState(void 0),[q,V]=l.useState(void 0),[K,M]=l.useState(void 0),[Y,lt]=l.useState(!1),kt=l.useRef(null),St=l.useRef(!1),J=l.useRef(void 0),Et=l.useRef(void 0),U=l.useRef(void 0),tt=l.useRef(void 0),rt=l.useRef({}),at=l.useRef({}),ot=l.useCallback(_=>{e(_),c&&c(_)},[e,c]),Lt=l.useMemo(()=>o?o():Io,[o]),gt=l.useMemo(()=>({[D.Section.OT]:Lt.filter(H=>st.Canon.isBookOT(H)),[D.Section.NT]:Lt.filter(H=>st.Canon.isBookNT(H)),[D.Section.DC]:Lt.filter(H=>st.Canon.isBookDC(H)),[D.Section.Extra]:Lt.filter(H=>st.Canon.extraBooks().includes(H))}),[Lt]),Ft=l.useMemo(()=>Object.values(gt).flat(),[gt]),Gt=l.useMemo(()=>{if(!z.trim())return gt;const _={[D.Section.OT]:[],[D.Section.NT]:[],[D.Section.DC]:[],[D.Section.Extra]:[]};return[D.Section.OT,D.Section.NT,D.Section.DC,D.Section.Extra].forEach(Z=>{_[Z]=gt[Z].filter(_t=>_a(_t,z,n))}),_},[gt,z,n]),A=l.useMemo(()=>Ui(z,Ft,n),[z,Ft,n]),Tt=l.useRef(!1);l.useEffect(()=>{if(!Tt.current){Tt.current=!0;return}f==null||f(T)},[T,f]);const Bt=l.useCallback(()=>{if(A){const _=A.chapterNum??1,H=A.verseNum??1;if(u&&Yr(A.book,_,H,u))return;ot({book:A.book,chapterNum:_,verseNum:H}),S(!1),j(""),E("")}},[ot,A,u]),Qt=l.useCallback(_=>{const H=q??(A==null?void 0:A.book),Z=K??(A==null?void 0:A.chapterNum);!H||!Z||(ot({book:H,chapterNum:Z,verseNum:_}),S(!1))},[ot,q,K,A]),Ut=l.useCallback(_=>{if(u&&Za(_,u))return;if(we(_)<=1){ot({book:_,chapterNum:1,verseNum:1}),S(!1),j("");return}G(_),R("chapters")},[ot,u]),Rt=l.useCallback(_=>{const H=x==="chapters"?P:A==null?void 0:A.book;if(H){if(d&&d(H,_)>1){V(H),M(_),R("verses"),E("");return}ot({book:H,chapterNum:_,verseNum:1}),S(!1)}},[ot,x,P,A,d]),je=l.useCallback(_=>{ot(_),S(!1),j("")},[ot]),qt=qi(t,Ft,C,e),Kt=l.useCallback(()=>{R("books"),G(void 0),V(void 0),M(void 0),setTimeout(()=>{Et.current&&Et.current.focus()},0)},[]),B=l.useCallback(()=>{const _=q;V(void 0),M(void 0),_?(G(_),R("chapters"),E("")):Kt()},[q,Kt]),W=l.useCallback(_=>{S(_),_&&(R("books"),G(void 0),V(void 0),M(void 0),j(""))},[]),{otLong:nt,ntLong:et,dcLong:wt,extraLong:mt}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},vt=l.useCallback(_=>Do(_,nt,et,wt,mt),[nt,et,wt,mt]),ut=l.useCallback(_=>A?!!A.chapterNum&&!_.toString().includes(A.chapterNum.toString()):!1,[A]),jt=l.useMemo(()=>D.formatScrRef(t,n?Ce(t.book,n):"English"),[t,n]),O=l.useCallback(_=>H=>{rt.current[_]=H},[]),ct=l.useCallback(_=>H=>{at.current[_]=H},[]),dt=l.useMemo(()=>Fi(z),[z]),bt=l.useMemo(()=>!d||!A||!A.chapterNum||!dt?!1:d(A.book,A.chapterNum)>0,[d,A,dt]),Re=l.useCallback(_=>u?Za(_,u):!1,[u]),_e=l.useCallback(_=>H=>u?Gi(_,H,u):!1,[u]),Qe=l.useCallback((_,H)=>Z=>u?Yr(_,H,Z,u):!1,[u]),ze=(i==null?void 0:i["%webView_bookChapterControl_selectChapter%"])??"Select Chapter",tr=(i==null?void 0:i["%webView_bookChapterControl_selectVerse%"])??"Select Verse",er=l.useCallback(_=>{(_.key==="Home"||_.key==="End")&&_.stopPropagation(),g&&g.includes(_.key)&&A&&A.chapterNum!==void 0&&A.verseNum!==void 0&&(_.preventDefault(),_.stopPropagation(),Bt())},[g,A,Bt]),gr=l.useCallback(_=>{var Wt,Ue,rr;if(_.ctrlKey)return;const{isLetter:H,isDigit:Z}=Ja(_.key);if((x==="chapters"||x==="verses")&&(_.key===" "||_.key==="Enter")){const zt=_.target instanceof HTMLElement?_.target:void 0;if(!!(zt!=null&&zt.closest('button, a, input, select, textarea, [role="button"]'))){_.stopPropagation();return}const Nt=(Wt=J.current)==null?void 0:Wt.querySelector('[cmdk-item][data-selected="true"]:not([data-disabled="true"])');if(Nt){_.preventDefault(),_.stopPropagation(),Nt.click();return}}if((x==="chapters"||x==="verses")&&(H||Z)){_.preventDefault(),_.stopPropagation();return}if(x==="chapters"&&_.key==="Backspace"){_.preventDefault(),_.stopPropagation(),Kt();return}if(x==="verses"&&_.key==="Backspace"){_.preventDefault(),_.stopPropagation(),B();return}const _t=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(_.key);if(x==="verses"&&_t){const zt=q,xt=K;if(!zt||!xt||!d)return;const Nt=d(zt,xt);if(!Nt)return;(Ue=J.current)==null||Ue.focus();const pt=(()=>{if(!N)return 1;const De=N.match(/:(\d+)$/);return De?parseInt(De[1],10):0})();let Ht=pt;const Yt=6;switch(_.key){case"ArrowLeft":pt!==0&&(Ht=pt>1?pt-1:Nt);break;case"ArrowRight":pt!==0&&(Ht=pt<Nt?pt+1:1);break;case"ArrowUp":Ht=pt===0?Nt:Math.max(1,pt-Yt);break;case"ArrowDown":Ht=pt===0?1:Math.min(Nt,pt+Yt);break;default:return}Ht!==pt&&(_.preventDefault(),_.stopPropagation(),E(`${zt} ${te[zt]||""} ${xt}:${Ht}`),setTimeout(()=>{const De=at.current[Ht];De&&De.scrollIntoView({block:"nearest",behavior:"smooth"})},0));return}if((x==="chapters"||x==="books"&&A)&&_t){const zt=x==="chapters"?P:A==null?void 0:A.book;if(!zt)return;x==="chapters"&&((rr=J.current)==null||rr.focus());const xt=(()=>{if(!N)return 1;const Yt=N.match(/(\d+)$/);return Yt?parseInt(Yt[1],10):0})(),Nt=we(zt);if(!Nt)return;let pt=xt;const Ht=6;switch(_.key){case"ArrowLeft":xt!==0&&(pt=xt>1?xt-1:Nt);break;case"ArrowRight":xt!==0&&(pt=xt<Nt?xt+1:1);break;case"ArrowUp":pt=xt===0?Nt:Math.max(1,xt-Ht);break;case"ArrowDown":pt=xt===0?1:Math.min(Nt,xt+Ht);break;default:return}pt!==xt&&(_.preventDefault(),_.stopPropagation(),E(`${zt} ${te[zt]||""} ${pt}`),setTimeout(()=>{const Yt=rt.current[pt];Yt&&Yt.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,A,Kt,B,P,q,K,d,N]),hr=l.useCallback(_=>{var _t;if(_.shiftKey||_.key==="Tab"||_.key===" ")return;if(_.key==="Enter"){_.stopPropagation();return}if(_.key==="ArrowUp"||_.key==="ArrowDown"){(_t=Et.current)==null||_t.focus();return}const{isLetter:H,isDigit:Z}=Ja(_.key);(H||Z)&&(_.preventDefault(),j(Wt=>Wt+_.key),Et.current.focus(),lt(!1))},[]);return l.useLayoutEffect(()=>{const _=setTimeout(()=>{if(T&&x==="books"&&U.current&&tt.current){const H=U.current,Z=tt.current,_t=Z.offsetTop,Wt=H.clientHeight,Ue=Z.clientHeight,rr=_t-Wt/2+Ue/2;H.scrollTo({top:Math.max(0,rr),behavior:"smooth"}),E(Ao(t.book))}},0);return()=>{clearTimeout(_)}},[T,x,z,A,t.book]),l.useLayoutEffect(()=>{if(x==="chapters"&&P){const _=P===t.book,H=_?t.chapterNum:1;E(`${P} ${te[P]||""} ${H}`),setTimeout(()=>{if(U.current)if(_){const Z=rt.current[t.chapterNum];Z&&Z.scrollIntoView({block:"center",behavior:"smooth"})}else U.current.scrollTo({top:0});J.current&&J.current.focus()},0)}},[x,P,A,t.book,t.chapterNum]),l.useLayoutEffect(()=>{if(x==="verses"&&q&&K!==void 0){const _=q===t.book&&K===t.chapterNum,H=_?t.verseNum:1;E(`${q} ${te[q]||""} ${K}:${H}`),setTimeout(()=>{if(U.current)if(_){const Z=at.current[t.verseNum];Z&&Z.scrollIntoView({block:"center",behavior:"smooth"})}else U.current.scrollTo({top:0});J.current&&J.current.focus()},0)}},[x,q,K,t.book,t.chapterNum,t.verseNum]),r.jsxs(se,{open:T,onOpenChange:W,modal:b,children:[r.jsx(me,{asChild:!0,children:r.jsx(F,{ref:kt,"aria-label":"book-chapter-trigger",variant:p,role:"combobox","aria-expanded":T,className:h("tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",a),onClick:_=>{St.current&&(St.current=!1,_.preventDefault())},children:m??r.jsx("span",{className:"tw:truncate",children:jt})})}),r.jsx(ce,{id:w,forceMount:!0,className:"tw:w-[var(--radix-popper-anchor-width,280px)] tw:min-w-[200px] tw:max-w-[280px] tw:p-0",align:I,onKeyDownCapture:gr,onKeyDown:_=>_.stopPropagation(),onPointerDownOutside:_=>{const{target:H}=_;T&&kt.current&&H instanceof Node&&kt.current.contains(H)&&(St.current=!0,W(!1))},onCloseAutoFocus:y,children:r.jsxs(he,{ref:J,loop:!0,value:N,onValueChange:E,shouldFilter:!1,children:[x==="books"?r.jsxs("div",{className:"tw:flex tw:items-end",children:[r.jsxs("div",{className:"tw:relative tw:flex-1",children:[r.jsx(Fe,{ref:Et,value:z,onValueChange:j,onKeyDown:er,onFocus:()=>lt(!1),className:s&&s.length>0?"tw:!pr-10":""}),s&&s.length>0&&r.jsx(Po,{recentSearches:s,onSearchItemSelect:je,renderItem:_=>D.formatScrRef(_,"English"),getItemKey:_=>`${_.book}-${_.chapterNum}-${_.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),r.jsx("div",{className:"tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2",children:qt.map(({onClick:_,disabled:H,title:Z,icon:_t})=>r.jsx(F,{variant:"ghost",size:"sm",onClick:()=>{lt(!0),_()},disabled:H,className:"tw:h-10 tw:w-4 tw:p-0",title:Z,onKeyDown:hr,children:r.jsx(_t,{})},Z))})]}):r.jsxs("div",{className:"tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2",children:[r.jsx(F,{variant:"ghost",size:"sm",onClick:x==="verses"?B:Kt,className:"tw:mr-2 tw:h-6 tw:w-6 tw:p-0",tabIndex:-1,children:C==="ltr"?r.jsx($.ArrowLeft,{className:"tw:h-4 tw:w-4"}):r.jsx($.ArrowRight,{className:"tw:h-4 tw:w-4"})}),x==="chapters"&&P&&r.jsx("span",{tabIndex:-1,className:"tw:text-sm tw:font-medium",children:Ce(P,n)}),x==="verses"&&q&&K!==void 0&&r.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:`${Ce(q,n)} ${K}`}),r.jsx("span",{tabIndex:-1,className:"tw-ms-auto tw-text-sm tw-font-medium tw-text-muted-foreground",children:x==="verses"?tr:ze})]}),!Y&&r.jsxs(fe,{ref:U,children:[x==="books"&&r.jsxs(r.Fragment,{children:[!A&&Object.entries(Gt).map(([_,H])=>{if(H.length!==0)return r.jsx(re,{heading:vt(_),children:H.map(Z=>r.jsx(Mo,{bookId:Z,onSelect:_t=>Ut(_t),section:D.getSectionForBook(Z),commandValue:`${Z} ${te[Z]}`,ref:Z===t.book?tt:void 0,localizedBookNames:n,disabled:Re(Z)},Z))},_)}),A&&r.jsx(re,{children:r.jsx(ie,{value:`${A.book} ${te[A.book]} ${A.chapterNum||""}:${A.verseNum||""})}`,onSelect:Bt,disabled:!!u&&Yr(A.book,A.chapterNum??1,A.verseNum??1,u),className:"tw:font-semibold tw:text-primary",children:D.formatScrRef({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1},n?ja(A.book,n):void 0)},"top-match")}),A&&bt&&A.chapterNum&&d&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground",children:[r.jsx("span",{children:`${Ce(A.book,n)} ${A.chapterNum}`}),r.jsx("span",{children:tr})]}),r.jsx(to,{bookId:A.book,chapterNum:A.chapterNum,endVerse:d(A.book,A.chapterNum),scrRef:t,onVerseSelect:Qt,setVerseRef:ct,isVerseDisabled:Qe(A.book,A.chapterNum),className:"tw:px-4 tw:pb-4"})]}),A&&!bt&&we(A.book)>1&&r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground",children:[r.jsx("span",{children:Ce(A.book,n)}),r.jsx("span",{children:ze})]}),r.jsx(Qa,{bookId:A.book,scrRef:t,onChapterSelect:Rt,setChapterRef:O,isChapterDimmed:ut,isChapterDisabled:_e(A.book),className:"tw:px-4 tw:pb-4"})]})]}),x==="chapters"&&P&&r.jsx(Qa,{bookId:P,scrRef:t,onChapterSelect:Rt,setChapterRef:O,isChapterDisabled:_e(P),className:"tw:p-4"}),x==="verses"&&q&&K!==void 0&&d&&r.jsx(to,{bookId:q,chapterNum:K,endVerse:d(q,K),scrRef:t,onVerseSelect:Qt,setVerseRef:ct,isVerseDisabled:Qe(q,K),className:"tw-p-4"})]})]})})]})}const Ki=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%","%webView_bookChapterControl_selectChapter%","%webView_bookChapterControl_selectVerse%"]);function yt({className:t,...e}){return r.jsx(k.Label.Root,{"data-slot":"label",className:h("pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",t),...e})}function Na({className:t,...e}){const a=ft();return r.jsx(k.RadioGroup.Root,{"data-slot":"radio-group",className:h("pr-twp tw:grid tw:w-full tw:gap-2",t),dir:a,...e})}function Dr({className:t,...e}){return r.jsx(k.RadioGroup.Item,{"data-slot":"radio-group-item",className:h("pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",t),...e,children:r.jsx(k.RadioGroup.Indicator,{"data-slot":"radio-group-indicator",className:"tw:flex tw:size-4 tw:items-center tw:justify-center",children:r.jsx("span",{className:"tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground"})})})}function Hi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function wa({id:t,options:e=[],className:a,buttonClassName:o,popoverContentClassName:n,popoverContentStyle:i,value:s,onChange:c=()=>{},getOptionLabel:w=Hi,getButtonLabel:d,icon:u=void 0,buttonPlaceholder:g="",textPlaceholder:m="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",alignDropDown:y="start",isDisabled:b=!1,ariaLabel:I,...C}){const[T,S]=l.useState(!1),N=d??w,E=j=>j.length>0&&typeof j[0]=="object"&&"options"in j[0],z=(j,x)=>{const R=w(j),P=typeof j=="object"&&"secondaryLabel"in j?j.secondaryLabel:void 0,G=`${x??""}${R}${P??""}`;return r.jsxs(ie,{value:R,onSelect:()=>{c(j),S(!1)},className:"tw:flex tw:items-center",children:[r.jsx($.Check,{className:h("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0",{"tw:opacity-0":!s||w(s)!==R})}),r.jsxs("span",{className:"tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap",children:[R,P&&r.jsxs("span",{className:"tw:text-muted-foreground",children:[" · ",P]})]})]},G)};return r.jsxs(se,{open:T,onOpenChange:S,...C,children:[r.jsx(me,{asChild:!0,children:r.jsxs(F,{variant:f,role:"combobox","aria-expanded":T,"aria-label":I,id:t,className:h("tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",o??a),disabled:b,children:[r.jsxs("div",{className:"tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden",children:[u&&r.jsx("div",{className:"tw:shrink-0 tw:pe-2",children:u}),r.jsx("span",{className:h("tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"),children:s?N(s):g})]}),r.jsx($.ChevronDown,{className:"tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50"})]})}),r.jsx(ce,{align:y,className:h("tw:w-[200px] tw:p-0",n),style:i,children:r.jsxs(he,{children:[r.jsx(Fe,{placeholder:m,className:"tw:text-inherit"}),r.jsx(Ze,{children:p}),r.jsx(fe,{children:E(e)?e.map(j=>r.jsx(re,{heading:j.groupHeading,children:j.options.map(x=>z(x,j.groupHeading))},j.groupHeading)):e.map(j=>z(j))})]})})]})}function Bo({startChapter:t,endChapter:e,handleSelectStartChapter:a,handleSelectEndChapter:o,isDisabled:n=!1,chapterCount:i}){const s=l.useMemo(()=>Array.from({length:i},(d,u)=>u+1),[i]),c=d=>{a(d),d>e&&o(d)},w=d=>{o(d),d<t&&a(d)};return r.jsxs(r.Fragment,{children:[r.jsx(yt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),r.jsx(wa,{isDisabled:n,onChange:c,buttonClassName:"tw:me-2 tw:ms-2 tw:w-20",options:s,getOptionLabel:d=>d.toString(),value:t},"start chapter"),r.jsx(yt,{htmlFor:"end-chapters-combobox",children:"to"}),r.jsx(wa,{isDisabled:n,onChange:w,buttonClassName:"tw:ms-2 tw:w-20",options:s,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const Yi=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Wr=(t,e)=>t[e]??e;function Wi({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:a,selectedBookIds:o,chapterCount:n,endChapter:i,handleSelectEndChapter:s,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const u=Wr(d,"%webView_bookSelector_currentBook%"),g=Wr(d,"%webView_bookSelector_choose%"),m=Wr(d,"%webView_bookSelector_chooseBooks%"),[p,f]=l.useState("current book"),y=b=>{f(b),t(b)};return r.jsx(Na,{className:"pr-twp tw:flex",value:p,onValueChange:b=>y(b),children:r.jsxs("div",{className:"tw:flex tw:w-full tw:flex-col tw:gap-4",children:[r.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_25%_50%]",children:[r.jsxs("div",{className:"tw:flex tw:items-center",children:[r.jsx(Dr,{value:"current book"}),r.jsx(yt,{className:"tw:ms-1",children:u})]}),r.jsx(yt,{className:"tw:flex tw:items-center",children:e}),r.jsx("div",{className:"tw:flex tw:items-center tw:justify-end",children:r.jsx(Bo,{isDisabled:p==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:s,chapterCount:n,startChapter:c,endChapter:i})})]}),r.jsxs("div",{className:"tw:grid tw:grid-cols-[25%_50%_25%]",children:[r.jsxs("div",{className:"tw:flex tw:items-center",children:[r.jsx(Dr,{value:"choose books"}),r.jsx(yt,{className:"tw:ms-1",children:m})]}),r.jsx(yt,{className:"tw:flex tw:items-center",children:o.map(b=>st.Canon.bookIdToEnglishName(b)).join(", ")}),r.jsx(F,{disabled:p==="current book",onClick:()=>a(),children:g})]})]})})}const Vo=l.createContext(null);function Xi(t,e){return{getTheme:function(){return e??null}}}function ve(){const t=l.useContext(Vo);return t==null&&function(e,...a){const o=new URL("https://lexical.dev/docs/error"),n=new URLSearchParams;n.append("code",e);for(const i of a)n.append("v",i);throw o.search=n.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Fo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Zi=Fo?l.useLayoutEffect:l.useEffect,br={tag:v.HISTORY_MERGE_TAG};function Ji({initialConfig:t,children:e}){const a=l.useMemo(()=>{const{theme:o,namespace:n,nodes:i,onError:s,editorState:c,html:w}=t,d=Xi(null,o),u=v.createEditor({editable:t.editable,html:w,namespace:n,nodes:i,onError:g=>s(g,u),theme:o});return function(g,m){if(m!==null){if(m===void 0)g.update(()=>{const p=v.$getRoot();if(p.isEmpty()){const f=v.$createParagraphNode();p.append(f);const y=Fo?document.activeElement:null;(v.$getSelection()!==null||y!==null&&y===g.getRootElement())&&f.select()}},br);else if(m!==null)switch(typeof m){case"string":{const p=g.parseEditorState(m);g.setEditorState(p,br);break}case"object":g.setEditorState(m,br);break;case"function":g.update(()=>{v.$getRoot().isEmpty()&&m(g)},br)}}}(u,c),[u,d]},[]);return Zi(()=>{const o=t.editable,[n]=a;n.setEditable(o===void 0||o)},[]),r.jsx(Vo.Provider,{value:a,children:e})}const Qi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ts({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:a}){const[o]=ve();return Qi(()=>{if(a)return o.registerUpdateListener(({editorState:n,dirtyElements:i,dirtyLeaves:s,prevEditorState:c,tags:w})=>{e&&i.size===0&&s.size===0||t&&w.has(v.HISTORY_MERGE_TAG)||c.isEmpty()||a(n,o,w)})},[o,t,e,a]),null}const Ca={ltr:"tw:text-left",rtl:"tw:text-right",heading:{h1:"tw:scroll-m-20 tw:text-4xl tw:font-extrabold tw:tracking-tight tw:lg:text-5xl",h2:"tw:scroll-m-20 tw:border-b tw:pb-2 tw:text-3xl tw:font-semibold tw:tracking-tight tw:first:mt-0",h3:"tw:scroll-m-20 tw:text-2xl tw:font-semibold tw:tracking-tight",h4:"tw:scroll-m-20 tw:text-xl tw:font-semibold tw:tracking-tight",h5:"tw:scroll-m-20 tw:text-lg tw:font-semibold tw:tracking-tight",h6:"tw:scroll-m-20 tw:text-base tw:font-semibold tw:tracking-tight"},paragraph:"tw:outline-hidden",quote:"tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic",link:"tw:text-blue-600 tw:hover:underline tw:hover:cursor-pointer",list:{checklist:"tw:relative",listitem:"tw:mx-8",listitemChecked:'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:line-through tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded tw:before:bg-primary tw:before:bg-no-repeat tw:after:content-[""] tw:after:cursor-pointer tw:after:border-white tw:after:border-solid tw:after:absolute tw:after:block tw:after:top-[6px] tw:after:w-[3px] tw:after:left-[7px] tw:after:right-[7px] tw:after:h-[6px] tw:after:rotate-45 tw:after:border-r-2 tw:after:border-b-2 tw:after:border-l-0 tw:after:border-t-0',listitemUnchecked:'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-hidden tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded',nested:{listitem:"tw:list-none tw:before:hidden tw:after:hidden"},ol:"tw:m-0 tw:p-0 tw:list-decimal tw:[&>li]:mt-2",olDepth:["tw:list-outside tw:!list-decimal","tw:list-outside tw:!list-[upper-roman]","tw:list-outside tw:!list-[lower-roman]","tw:list-outside tw:!list-[upper-alpha]","tw:list-outside tw:!list-[lower-alpha]"],ul:"tw:m-0 tw:p-0 tw:list-outside tw:[&>li]:mt-2",ulDepth:["tw:list-outside tw:!list-disc","tw:list-outside tw:!list-disc","tw:list-outside tw:!list-disc","tw:list-outside tw:!list-disc","tw:list-outside tw:!list-disc"]},hashtag:"tw:text-blue-600 tw:bg-blue-100 tw:rounded-md tw:px-1",text:{bold:"tw:font-bold",code:"tw:bg-gray-100 tw:p-1 tw:rounded-md",italic:"tw:italic",strikethrough:"tw:line-through",subscript:"tw:sub",superscript:"tw:sup",underline:"tw:underline",underlineStrikethrough:"tw:underline tw:line-through"},image:"tw:relative tw:inline-block tw:user-select-none tw:cursor-default editor-image",inlineImage:"tw:relative tw:inline-block tw:user-select-none tw:cursor-default inline-editor-image",keyword:"tw:text-purple-900 tw:font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"tw:!bg-destructive/50",table:"EditorTheme__table tw:w-fit tw:overflow-scroll tw:border-collapse",tableCell:"EditorTheme__tableCell tw:w-24 tw:relative tw:border tw:px-4 tw:py-2 tw:text-left tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw:bg-background tw:block tw:border-0 tw:rounded-2xl tw:w-5 tw:h-5 tw:text-foreground tw:cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw:block tw:right-1 tw:top-1.5 tw:absolute tw:z-10 tw:w-5 tw:h-5",tableCellEditing:"EditorTheme__tableCellEditing tw:rounded-sm tw:shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw:bg-muted tw:border tw:px-4 tw:py-2 tw:text-left tw:font-bold tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw:border tw:border-primary tw:border-solid tw:block tw:h-[calc(100%-2px)] tw:w-[calc(100%-2px)] tw:absolute tw:-left-[1px] tw:-top-[1px] tw:z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw:absolute tw:-right-1 tw:h-full tw:w-2 tw:cursor-ew-resize tw:z-10 tw:top-0",tableCellSelected:"EditorTheme__tableCellSelected tw:bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw:block tw:opacity-50 tw:absolute tw:bottom-0 tw:left-0 tw:w-full tw:h-1 tw:bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw:block tw:absolute tw:w-[1px] tw:h-full tw:bg-primary tw:top-0",tableRowStriping:"EditorTheme__tableRowStriping tw:m-0 tw:border-t tw:p-0 tw:even:bg-muted",tableSelected:"EditorTheme__tableSelected tw:ring-2 tw:ring-primary tw:ring-offset-2",tableSelection:"EditorTheme__tableSelection tw:bg-transparent",layoutItem:"tw:border tw:border-dashed tw:px-4 tw:py-2",layoutContainer:"tw:grid tw:gap-2.5 tw:my-2.5 tw:mx-0",autocomplete:"tw:text-muted-foreground",blockCursor:"",embedBlock:{base:"tw:user-select-none",focus:"tw:ring-2 tw:ring-primary tw:ring-offset-2"},hr:'tw:p-0.5 tw:border-none tw:my-1 tw:mx-0 tw:cursor-pointer tw:after:content-[""] tw:after:block tw:after:h-0.5 tw:after:bg-muted tw:selected:ring-2 tw:selected:ring-primary tw:selected:ring-offset-2 tw:selected:user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""};function Ot({delayDuration:t=0,...e}){return r.jsx(k.Tooltip.Provider,{"data-slot":"tooltip-provider",delayDuration:t,...e})}function $t({...t}){return r.jsx(k.Tooltip.Root,{"data-slot":"tooltip",...t})}function At({className:t,variant:e,...a}){return r.jsx(k.Tooltip.Trigger,{"data-slot":"tooltip-trigger",className:e?h(ya({variant:e}),t):t,...a})}function Pt({className:t,sideOffset:e=0,style:a,children:o,...n}){return r.jsx(k.Tooltip.Portal,{children:r.jsxs(k.Tooltip.Content,{"data-slot":"tooltip-content",sideOffset:e,style:{zIndex:To,...a},className:h("pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",t),...n,children:[o,r.jsx(k.Tooltip.Arrow,{className:"tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground"})]})})}const Sa=[ca.HeadingNode,v.ParagraphNode,v.TextNode,ca.QuoteNode],es=l.createContext(null),Xr={didCatch:!1,error:null};class rs extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Xr}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var a,o,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];(a=(o=this.props).onReset)===null||a===void 0||a.call(o,{args:i,reason:"imperative-api"}),this.setState(Xr)}}componentDidCatch(e,a){var o,n;(o=(n=this.props).onError)===null||o===void 0||o.call(n,e,a)}componentDidUpdate(e,a){const{didCatch:o}=this.state,{resetKeys:n}=this.props;if(o&&a.error!==null&&as(e.resetKeys,n)){var i,s;(i=(s=this.props).onReset)===null||i===void 0||i.call(s,{next:n,prev:e.resetKeys,reason:"keys"}),this.setState(Xr)}}render(){const{children:e,fallbackRender:a,FallbackComponent:o,fallback:n}=this.props,{didCatch:i,error:s}=this.state;let c=e;if(i){const w={error:s,resetErrorBoundary:this.resetErrorBoundary};if(typeof a=="function")c=a(w);else if(o)c=l.createElement(o,w);else if(n!==void 0)c=n;else throw s}return l.createElement(es.Provider,{value:{didCatch:i,error:s,resetErrorBoundary:this.resetErrorBoundary}},c)}}function as(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((a,o)=>!Object.is(a,e[o]))}function os({children:t,onError:e}){return r.jsx(rs,{fallback:r.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ns=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function is(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function ss(){return function(t){const[e]=ve(),a=l.useMemo(()=>t(e),[e,t]),[o,n]=l.useState(()=>a.initialValueFn()),i=l.useRef(o);return ns(()=>{const{initialValueFn:s,subscribe:c}=a,w=s();return i.current!==w&&(i.current=w,n(w)),c(d=>{i.current=d,n(d)})},[a,t]),o}(is)}function cs(t,e){const a=t.getRootElement();if(a===null)return[];const o=a.getBoundingClientRect(),n=getComputedStyle(a),i=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),s=Array.from(e.getClientRects());let c,w=s.length;s.sort((d,u)=>{const g=d.top-u.top;return Math.abs(g)<=3?d.left-u.left:g});for(let d=0;d<w;d++){const u=s[d],g=c&&c.top<=u.top&&c.top+c.height>u.top&&c.left+c.width>u.left,m=u.width+i===o.width;g||m?(s.splice(d--,1),w--):c=u}return s}function ls(t,e,a="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!v.$isTokenOrSegmented(e)&&o!==null){const[n,i]=o,s=t.isBackward(),c=n.getNode(),w=i.getNode(),d=e.is(c),u=e.is(w);if(d||u){const[g,m]=v.$getCharacterOffsets(t),p=c.is(w),f=e.is(s?w:c),y=e.is(s?c:w);let b,I=0;p?(I=g>m?m:g,b=g>m?g:m):f?(I=s?m:g,b=void 0):y&&(I=0,b=s?g:m);const C=e.__text.slice(I,b);C!==e.__text&&(a==="clone"&&(e=v.$cloneWithPropertiesEphemeral(e)),e.__text=C)}}return e}function Ir(t,...e){const a=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const n of e)o.append("v",n);throw a.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${a.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Go=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ds=Go&&"documentMode"in document?document.documentMode:null;!(!Go||!("InputEvent"in window)||ds)&&"getTargetRanges"in new window.InputEvent("input");function de(t){return`${t}px`}const ws={attributes:!0,characterData:!0,childList:!0,subtree:!0};function us(t,e,a){let o=null,n=null,i=null,s=[];const c=document.createElement("div");function w(){o===null&&Ir(182),n===null&&Ir(183);const{left:g,top:m}=n.getBoundingClientRect(),p=cs(t,e);var f,y;c.isConnected||(y=c,(f=n).insertBefore(y,f.firstChild));let b=!1;for(let I=0;I<p.length;I++){const C=p[I],T=s[I]||document.createElement("div"),S=T.style;S.position!=="absolute"&&(S.position="absolute",b=!0);const N=de(C.left-g);S.left!==N&&(S.left=N,b=!0);const E=de(C.top-m);S.top!==E&&(T.style.top=E,b=!0);const z=de(C.width);S.width!==z&&(T.style.width=z,b=!0);const j=de(C.height);S.height!==j&&(T.style.height=j,b=!0),T.parentNode!==c&&(c.append(T),b=!0),s[I]=T}for(;s.length>p.length;)s.pop();b&&a(s)}function d(){n=null,o=null,i!==null&&i.disconnect(),i=null,c.remove();for(const g of s)g.remove();s=[]}c.style.position="relative";const u=t.registerRootListener(function g(){const m=t.getRootElement();if(m===null)return d();const p=m.parentElement;if(!v.isHTMLElement(p))return d();d(),o=m,n=p,i=new MutationObserver(f=>{const y=t.getRootElement(),b=y&&y.parentElement;if(y!==o||b!==n)return g();for(const I of f)if(!c.contains(I.target))return w()}),i.observe(p,ws),w()});return()=>{u(),d()}}function eo(t,e,a){if(t.type!=="text"&&v.$isElementNode(e)){const o=e.getDOMSlot(a);return[o.element,o.getFirstChildOffset()+t.offset]}return[v.getDOMTextNode(a)||a,t.offset]}function ps(t){for(const e of t){const a=e.style;a.background!=="Highlight"&&(a.background="Highlight"),a.color!=="HighlightText"&&(a.color="HighlightText"),a.marginTop!==de(-1.5)&&(a.marginTop=de(-1.5)),a.paddingTop!==de(4)&&(a.paddingTop=de(4)),a.paddingBottom!==de(0)&&(a.paddingBottom=de(0))}}function gs(t,e=ps){let a=null,o=null,n=null,i=null,s=null,c=null,w=()=>{};function d(u){u.read(()=>{const g=v.$getSelection();if(!v.$isRangeSelection(g))return a=null,n=null,i=null,c=null,w(),void(w=()=>{});const[m,p]=function(j){const x=j.getStartEndPoints();return j.isBackward()?[x[1],x[0]]:x}(g),f=m.getNode(),y=f.getKey(),b=m.offset,I=p.getNode(),C=I.getKey(),T=p.offset,S=t.getElementByKey(y),N=t.getElementByKey(C),E=a===null||S!==o||b!==n||y!==a.getKey(),z=i===null||N!==s||T!==c||C!==i.getKey();if((E||z)&&S!==null&&N!==null){const j=function(x,R,P,G,q,V,K){const M=(x._window?x._window.document:document).createRange();return M.setStart(...eo(R,P,G)),M.setEnd(...eo(q,V,K)),M}(t,m,f,S,p,I,N);w(),w=us(t,j,e)}a=f,o=S,n=b,i=I,s=N,c=T})}return d(t.getEditorState()),v.mergeRegister(t.registerUpdateListener(({editorState:u})=>d(u)),()=>{w()})}function hs(t,e){let a=null;const o=()=>{const n=getSelection(),i=n&&n.anchorNode,s=t.getRootElement();i!==null&&s!==null&&s.contains(i)?a!==null&&(a(),a=null):a===null&&(a=gs(t,e))};return t.registerRootListener(n=>{if(n){const i=n.ownerDocument;return i.addEventListener("selectionchange",o),o(),()=>{a!==null&&a(),i.removeEventListener("selectionchange",o)}}})}function fs(t){const e=v.$findMatchingParent(t,a=>v.$isElementNode(a)&&!a.isInline());return v.$isElementNode(e)||Ir(4,t.__key),e}function ms(t){const e=v.$getSelection()||v.$getPreviousSelection();let a;if(v.$isRangeSelection(e))a=v.$caretFromPoint(e.focus,"next");else{if(e!=null){const s=e.getNodes(),c=s[s.length-1];c&&(a=v.$getSiblingCaret(c,"next"))}a=a||v.$getChildCaret(v.$getRoot(),"previous").getFlipped().insert(v.$createParagraphNode())}const o=vs(t,a),n=v.$getAdjacentChildCaret(o),i=v.$isChildCaret(n)?v.$normalizeCaret(n):o;return v.$setSelectionFromCaretRange(v.$getCollapsedCaretRange(i)),t.getLatest()}function vs(t,e,a){let o=v.$getCaretInDirection(e,"next");for(let n=o;n;n=v.$splitAtPointCaretNext(n,a))o=n;return v.$isTextPointCaret(o)&&Ir(283),o.insert(t.isInline()?v.$createParagraphNode().append(t):t),v.$getCaretInDirection(v.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function bs(t){const e=v.$getSelection();if(!v.$isRangeSelection(e))return!1;const a=new Set,o=e.getNodes();for(let n=0;n<o.length;n++){const i=o[n],s=i.getKey();if(a.has(s))continue;const c=v.$findMatchingParent(i,d=>v.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!a.has(w)&&(a.add(w),t(c))}return a.size>0}const xs=Symbol.for("preact-signals");function Fr(){if(xe>1)return void xe--;let t,e=!1;for(!function(){let a=Mr;for(Mr=void 0;a!==void 0;)a.S.v===a.v&&(a.S.i=a.i),a=a.o}();ir!==void 0;){let a=ir;for(ir=void 0,Or++;a!==void 0;){const o=a.u;if(a.u=void 0,a.f&=-3,!(8&a.f)&&Uo(a))try{a.c()}catch(n){e||(t=n,e=!0)}a=o}}if(Or=0,xe--,e)throw t}function ys(t){if(xe>0)return t();ua=++ks,xe++;try{return t()}finally{Fr()}}let Q,ir;function ro(t){const e=Q;Q=void 0;try{return t()}finally{Q=e}}let Mr,xe=0,Or=0,ks=0,ua=0,Cr=0;function ao(t){if(Q===void 0)return;let e=t.n;return e===void 0||e.t!==Q?(e={i:0,S:t,p:Q.s,n:void 0,t:Q,e:void 0,x:void 0,r:e},Q.s!==void 0&&(Q.s.n=e),Q.s=e,t.n=e,32&Q.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Q.s,e.n=void 0,Q.s.n=e,Q.s=e),e):void 0}function It(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function cr(t,e){return new It(t,e)}function Uo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function oo(t){for(let e=t.s;e!==void 0;e=e.n){const a=e.S.n;if(a!==void 0&&(e.r=a),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function qo(t){let e,a=t.s;for(;a!==void 0;){const o=a.p;a.i===-1?(a.S.U(a),o!==void 0&&(o.n=a.n),a.n!==void 0&&(a.n.p=o)):e=a,a.S.n=a.r,a.r!==void 0&&(a.r=void 0),a=o}t.s=e}function Ie(t,e){It.call(this,void 0),this.x=t,this.s=void 0,this.g=Cr-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function js(t,e){return new Ie(t,e)}function Ko(t){const e=t.m;if(t.m=void 0,typeof e=="function"){xe++;const a=Q;Q=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Ea(t),o}finally{Q=a,Fr()}}}function Ea(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Ko(t)}function _s(t){if(Q!==this)throw new Error("Out-of-order effect");qo(this),Q=t,this.f&=-2,8&this.f&&Ea(this),Fr()}function Ke(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function ue(t,e){const a=new Ke(t,e);try{a.c()}catch(n){throw a.d(),n}const o=a.d.bind(a);return o[Symbol.dispose]=o,o}function Je(t,e={}){const a={};for(const o in t){const n=e[o],i=cr(n===void 0?t[o]:n);a[o]=i}return a}It.prototype.brand=xs,It.prototype.h=function(){return!0},It.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:ro(()=>{var a;(a=this.W)==null||a.call(this)}))},It.prototype.U=function(t){if(this.t!==void 0){const e=t.e,a=t.x;e!==void 0&&(e.x=a,t.e=void 0),a!==void 0&&(a.e=e,t.x=void 0),t===this.t&&(this.t=a,a===void 0&&ro(()=>{var o;(o=this.Z)==null||o.call(this)}))}},It.prototype.subscribe=function(t){return ue(()=>{const e=this.value,a=Q;Q=void 0;try{t(e)}finally{Q=a}},{name:"sub"})},It.prototype.valueOf=function(){return this.value},It.prototype.toString=function(){return this.value+""},It.prototype.toJSON=function(){return this.value},It.prototype.peek=function(){const t=Q;Q=void 0;try{return this.value}finally{Q=t}},Object.defineProperty(It.prototype,"value",{get(){const t=ao(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Or>100)throw new Error("Cycle detected");(function(e){xe!==0&&Or===0&&e.l!==ua&&(e.l=ua,Mr={S:e,v:e.v,i:e.i,o:Mr})})(this),this.v=t,this.i++,Cr++,xe++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Fr()}}}}),Ie.prototype=new It,Ie.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Cr))return!0;if(this.g=Cr,this.f|=1,this.i>0&&!Uo(this))return this.f&=-2,!0;const t=Q;try{oo(this),Q=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Q=t,qo(this),this.f&=-2,!0},Ie.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}It.prototype.S.call(this,t)},Ie.prototype.U=function(t){if(this.t!==void 0&&(It.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},Ie.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(Ie.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=ao(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Ke.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Ke.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Ko(this),oo(this),xe++;const t=Q;return Q=this,_s.bind(this,t)},Ke.prototype.N=function(){2&this.f||(this.f|=2,this.u=ir,ir=this)},Ke.prototype.d=function(){this.f|=8,1&this.f||Ea(this)},Ke.prototype.dispose=function(){this.d()};v.defineExtension({build:(t,e,a)=>Je(e),config:v.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,a){const o=a.getOutput();return ue(()=>o.disabled.value?void 0:t.registerRootListener(n=>{t.focus(()=>{const i=document.activeElement;n===null||i!==null&&n.contains(i)||n.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Ho(){const t=v.$getRoot(),e=v.$getSelection(),a=v.$createParagraphNode();t.clear(),t.append(a),e!==null&&a.select(),v.$isRangeSelection(e)&&(e.format=0)}function Yo(t,e=Ho){return t.registerCommand(v.CLEAR_EDITOR_COMMAND,a=>(t.update(e),!0),v.COMMAND_PRIORITY_EDITOR)}v.defineExtension({build:(t,e,a)=>Je(e),config:v.safeCast({$onClear:Ho}),name:"@lexical/extension/ClearEditor",register(t,e,a){const{$onClear:o}=a.getOutput();return ue(()=>Yo(t,o.value))}});function Ns(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const Zr=v.createState("format",{parse:t=>typeof t=="number"?t:0});class Wo extends v.DecoratorNode{$config(){return this.config("decorator-text",{extends:v.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:Zr}]})}getFormat(){return v.$getState(this,Zr)}getFormatFlags(e,a){return v.toggleTextFormatType(this.getFormat(),e,a)}hasFormat(e){const a=v.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&a)!==0}setFormat(e){return v.$setState(this,Zr,e)}toggleFormat(e){const a=this.getFormat(),o=v.toggleTextFormatType(a,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Cs(t){return t instanceof Wo}v.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Wo],register:(t,e,a)=>t.registerCommand(v.FORMAT_TEXT_COMMAND,o=>{const n=v.$getSelection();if(v.$isNodeSelection(n)||v.$isRangeSelection(n))for(const i of n.getNodes())Cs(i)&&i.toggleFormat(o);return!1},v.COMMAND_PRIORITY_LOW)});function Xo(t,e){let a;return cr(t(),{unwatched(){a&&(a(),a=void 0)},watched(){this.value=t(),a=e(this)}})}const pa=v.defineExtension({build:t=>Xo(()=>t.getEditorState(),e=>t.registerUpdateListener(a=>{e.value=a.editorState})),name:"@lexical/extension/EditorState"});function it(t,...e){const a=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const n of e)o.append("v",n);throw a.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${a.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Zo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const a=t,o=e;for(const n in o)a[n]=Zo(a[n],o[n]);return t}return e}const Ta=0,ga=1,Jo=2,Jr=3,xr=4,qe=5,Qr=6,or=7;function ta(t){return t.id===Ta}function Qo(t){return t.id===Jo}function Ss(t){return function(e){return e.id===ga}(t)||it(305,String(t.id),String(ga)),Object.assign(t,{id:Jo})}const Es=new Set;class Ts{constructor(e,a){Dt(this,"builder");Dt(this,"configs");Dt(this,"_dependency");Dt(this,"_peerNameSet");Dt(this,"extension");Dt(this,"state");Dt(this,"_signal");this.builder=e,this.extension=a,this.configs=new Set,this.state={id:Ta}}mergeConfigs(){let e=this.extension.config||{};const a=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):v.shallowMergeConfig;for(const o of this.configs)e=a(e,o);return e}init(e){const a=this.state;Qo(a)||it(306,String(a.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},n={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,w,d){return Object.assign(c,{config:w,id:Jr,registerState:d})}(a,this.mergeConfigs(),o);let s;this.state=i,this.extension.init&&(s=this.extension.init(e,i.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:xr,initResult:w,registerState:d})}(i,s,n)}build(e){const a=this.state;let o;a.id!==xr&&it(307,String(a.id),String(qe)),this.extension.build&&(o=this.extension.build(e,a.config,a.registerState));const n={...a.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,s,c){return Object.assign(i,{id:qe,output:s,registerState:c})}(a,o,n)}register(e,a){this._signal=a;const o=this.state;o.id!==qe&&it(308,String(o.id),String(qe));const n=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:Qr})}(o),()=>{const i=this.state;i.id!==or&&it(309,String(o.id),String(or)),this.state=function(s){return Object.assign(s,{id:qe})}(i),n&&n()}}afterRegistration(e){const a=this.state;let o;return a.id!==Qr&&it(310,String(a.id),String(Qr)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,a.config,a.registerState)),this.state=function(n){return Object.assign(n,{id:or})}(a),o}getSignal(){return this._signal===void 0&&it(311),this._signal}getInitResult(){this.extension.init===void 0&&it(312,this.extension.name);const e=this.state;return function(a){return a.id>=xr}(e)||it(313,String(e.id),String(xr)),e.initResult}getInitPeer(e){const a=this.builder.extensionNameMap.get(e);return a?a.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(a){return a.id>=Jr}(e)||it(314,String(e.id),String(Jr)),{config:e.config}}getPeer(e){const a=this.builder.extensionNameMap.get(e);return a?a.getExtensionDependency():void 0}getInitDependency(e){const a=this.builder.getExtensionRep(e);return a===void 0&&it(315,this.extension.name,e.name),a.getExtensionInitDependency()}getDependency(e){const a=this.builder.getExtensionRep(e);return a===void 0&&it(315,this.extension.name,e.name),a.getExtensionDependency()}getState(){const e=this.state;return function(a){return a.id>=or}(e)||it(316,String(e.id),String(or)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Es}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([a])=>a)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(a){return a.id>=qe})(e)||it(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const no={tag:v.HISTORY_MERGE_TAG};function Rs(){const t=v.$getRoot();t.isEmpty()&&t.append(v.$createParagraphNode())}const zs=v.defineExtension({config:v.safeCast({setOptions:no,updateOptions:no}),init:({$initialEditorState:t=Rs})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:a},o){const n=o.getInitResult();if(!n.initialized){n.initialized=!0;const{$initialEditorState:i}=n;if(v.$isEditorState(i))t.setEditorState(i,a);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const s=t.parseEditorState(i);t.setEditorState(s,a)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[v.RootNode,v.TextNode,v.LineBreakNode,v.TabNode,v.ParagraphNode]}),io=Symbol.for("@lexical/extension/LexicalBuilder");function so(){}function Ds(t){throw t}function yr(t){return Array.isArray(t)?t:[t]}const ea="0.43.0+prod.esm";class He{constructor(e){Dt(this,"roots");Dt(this,"extensionNameMap");Dt(this,"outgoingConfigEdges");Dt(this,"incomingEdges");Dt(this,"conflicts");Dt(this,"_sortedExtensionReps");Dt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=ea,this.roots=e;for(const a of e)this.addExtension(a)}static fromExtensions(e){const a=[yr(zs)];for(const o of e)a.push(yr(o));return new He(a)}static maybeFromEditor(e){const a=e[io];return a&&(a.PACKAGE_VERSION!==ea&&it(292,a.PACKAGE_VERSION,ea),a instanceof He||it(293)),a}static fromEditor(e){const a=He.maybeFromEditor(e);return a===void 0&&it(294),a}constructEditor(){const{$initialEditorState:e,onError:a,...o}=this.buildCreateEditorArgs(),n=Object.assign(v.createEditor({...o,...a?{onError:i=>{a(i,n)}}:{}}),{[io]:this});for(const i of this.sortedExtensionReps())i.build(n);return n}buildEditor(){let e=so;function a(){try{e()}finally{e=so}}const o=Object.assign(this.constructEditor(),{dispose:a,[Symbol.dispose]:a});return e=v.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const a=this.extensionNameMap.get(e.name);if(a)return a.extension!==e&&it(295,e.name),a}addEdge(e,a,o){const n=this.outgoingConfigEdges.get(e);n?n.set(a,o):this.outgoingConfigEdges.set(e,new Map([[a,o]]));const i=this.incomingEdges.get(a);i?i.add(e):this.incomingEdges.set(a,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&it(296);const a=yr(e),[o]=a;typeof o.name!="string"&&it(297,typeof o.name);let n=this.extensionNameMap.get(o.name);if(n!==void 0&&n.extension!==o&&it(298,o.name),!n){n=new Ts(this,o),this.extensionNameMap.set(o.name,n);const i=this.conflicts.get(o.name);typeof i=="string"&&it(299,o.name,i);for(const s of o.conflictsWith||[])this.extensionNameMap.has(s)&&it(299,o.name,s),this.conflicts.set(s,o.name);for(const s of o.dependencies||[]){const c=yr(s);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[s,c]of o.peerDependencies||[])this.addEdge(o.name,s,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],a=(o,n)=>{let i=o.state;if(Qo(i))return;const s=o.extension.name;var c;ta(i)||it(300,s,n||"[unknown]"),ta(c=i)||it(304,String(c.id),String(Ta)),i=Object.assign(c,{id:ga}),o.state=i;const w=this.outgoingConfigEdges.get(s);if(w)for(const d of w.keys()){const u=this.extensionNameMap.get(d);u&&a(u,s)}i=Ss(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())ta(o.state)&&a(o);for(const o of e)for(const[n,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const s=this.extensionNameMap.get(n);if(s)for(const c of i)s.configs.add(c)}for(const[o,...n]of this.roots)if(n.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&it(301,o.name);for(const s of n)i.configs.add(s)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const a=this.sortedExtensionReps(),o=new AbortController,n=[()=>o.abort()],i=o.signal;for(const s of a){const c=s.register(e,i);c&&n.push(c)}for(const s of a){const c=s.afterRegistration(e);c&&n.push(c)}return v.mergeRegister(...n)}buildCreateEditorArgs(){const e={},a=new Set,o=new Map,n=new Map,i={},s={},c=this.sortedExtensionReps();for(const u of c){const{extension:g}=u;if(g.onError!==void 0&&(e.onError=g.onError),g.disableEvents!==void 0&&(e.disableEvents=g.disableEvents),g.parentEditor!==void 0&&(e.parentEditor=g.parentEditor),g.editable!==void 0&&(e.editable=g.editable),g.namespace!==void 0&&(e.namespace=g.namespace),g.$initialEditorState!==void 0&&(e.$initialEditorState=g.$initialEditorState),g.nodes)for(const m of Ns(g)){if(typeof m!="function"){const p=o.get(m.replace);p&&it(302,g.name,m.replace.name,p.extension.name),o.set(m.replace,u)}a.add(m)}if(g.html){if(g.html.export)for(const[m,p]of g.html.export.entries())n.set(m,p);g.html.import&&Object.assign(i,g.html.import)}g.theme&&Zo(s,g.theme)}Object.keys(s).length>0&&(e.theme=s),a.size&&(e.nodes=[...a]);const w=Object.keys(i).length>0,d=n.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=n));for(const u of c)u.init(e);return e.onError||(e.onError=Ds),e}}const Is=new Set,co=v.defineExtension({build(t,e,a){const o=a.getDependency(pa).output,n=cr({watchedNodeKeys:new Map}),i=Xo(()=>{},()=>ue(()=>{const s=i.peek(),{watchedNodeKeys:c}=n.value;let w,d=!1;o.value.read(()=>{if(v.$getSelection())for(const[u,g]of c.entries()){if(g.size===0){c.delete(u);continue}const m=v.$getNodeByKey(u),p=m&&m.isSelected()||!1;d=d||p!==(!!s&&s.has(u)),p&&(w=w||new Set,w.add(u))}}),!d&&w&&s&&w.size===s.size||(i.value=w)}));return{watchNodeKey:function(s){const c=js(()=>(i.value||Is).has(s)),{watchedNodeKeys:w}=n.peek();let d=w.get(s);const u=d!==void 0;return d=d||new Set,d.add(c),u||(w.set(s,d),n.value={watchedNodeKeys:w}),c}}},dependencies:[pa],name:"@lexical/extension/NodeSelection"}),Ms=v.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Ye extends v.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Ye(e.__key)}static importJSON(e){return Ra().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Os,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const a=document.createElement("hr");return v.addClassNamesToElement(a,e.theme.hr),a}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Os(){return{node:Ra()}}function Ra(){return v.$create(Ye)}function $s(t){return t instanceof Ye}v.defineExtension({dependencies:[pa,co],name:"@lexical/extension/HorizontalRule",nodes:()=>[Ye],register(t,e,a){const{watchNodeKey:o}=a.getDependency(co).output,n=cr({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return v.mergeRegister(t.registerCommand(Ms,s=>{const c=v.$getSelection();if(!v.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const w=Ra();ms(w)}return!0},v.COMMAND_PRIORITY_EDITOR),t.registerCommand(v.CLICK_COMMAND,s=>{if(v.isDOMNode(s.target)){const c=v.$getNodeFromDOMNode(s.target);if($s(c))return function(w,d=!1){const u=v.$getSelection(),g=w.isSelected(),m=w.getKey();let p;d&&v.$isNodeSelection(u)?p=u:(p=v.$createNodeSelection(),v.$setSelection(p)),g?p.delete(m):p.add(m)}(c,s.shiftKey),!0}return!1},v.COMMAND_PRIORITY_LOW),t.registerMutationListener(Ye,(s,c)=>{ys(()=>{let w=!1;const{nodeSelections:d}=n.peek();for(const[u,g]of s.entries())if(g==="destroyed")d.delete(u),w=!0;else{const m=d.get(u),p=t.getElementByKey(u);m?m.domNode.value=p:(w=!0,d.set(u,{domNode:cr(p),selectedSignal:o(u)}))}w&&(n.value={nodeSelections:d})})}),ue(()=>{const s=[];for(const{domNode:c,selectedSignal:w}of n.value.nodeSelections.values())s.push(ue(()=>{const d=c.value;d&&(w.value?v.addClassNamesToElement(d,i):v.removeClassNamesFromElement(d,i))}));return v.mergeRegister(...s)}))}});v.defineExtension({build:(t,e)=>Je({inheritEditableFromParent:e.inheritEditableFromParent}),config:v.safeCast({$getParentEditor:function(){const t=v.$getEditor();return He.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,a)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,a)=>ue(()=>{const o=t._parentEditor;if(o&&a.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});v.defineExtension({build:(t,e,a)=>Je(e),config:v.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,a)=>{const o=a.getOutput();return ue(()=>{if(!o.disabled.value)return hs(t,o.onReposition.value)})}});function tn(t){return t.canBeEmpty()}function As(t,e,a=tn){return v.mergeRegister(t.registerCommand(v.KEY_TAB_COMMAND,o=>{const n=v.$getSelection();if(!v.$isRangeSelection(n))return!1;o.preventDefault();const i=function(s){if(s.getNodes().filter(m=>v.$isBlockElementNode(m)&&m.canIndent()).length>0)return!0;const c=s.anchor,w=s.focus,d=w.isBefore(c)?w:c,u=d.getNode(),g=fs(u);if(g.canIndent()){const m=g.getKey();let p=v.$createRangeSelection();if(p.anchor.set(m,0,"element"),p.focus.set(m,0,"element"),p=v.$normalizeSelection__EXPERIMENTAL(p),p.anchor.is(d))return!0}return!1}(n)?o.shiftKey?v.OUTDENT_CONTENT_COMMAND:v.INDENT_CONTENT_COMMAND:v.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},v.COMMAND_PRIORITY_EDITOR),t.registerCommand(v.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,n=v.$getSelection();if(!v.$isRangeSelection(n))return!1;const i=typeof a=="function"?a:a.peek();return bs(s=>{if(i(s)){const c=s.getIndent()+1;(!o||c<o)&&s.setIndent(c)}})},v.COMMAND_PRIORITY_CRITICAL))}v.defineExtension({build:(t,e,a)=>Je(e),config:v.safeCast({$canIndent:tn,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,a){const{disabled:o,maxIndent:n,$canIndent:i}=a.getOutput();return ue(()=>{if(!o.value)return As(t,n,i)})}});const Ps=v.defineExtension({name:"@lexical/react/ReactProvider"});function Ls(){return v.$getRoot().getTextContent()}function Bs(t,e=!0){if(t)return!1;let a=Ls();return e&&(a=a.trim()),a===""}function Vs(t){if(!Bs(t,!1))return!1;const e=v.$getRoot().getChildren(),a=e.length;if(a>1)return!1;for(let o=0;o<a;o++){const n=e[o];if(v.$isDecoratorNode(n))return!1;if(v.$isElementNode(n)){if(!v.$isParagraphNode(n)||n.__indent!==0)return!1;const i=n.getChildren(),s=i.length;for(let c=0;c<s;c++){const w=i[o];if(!v.$isTextNode(w))return!1}}}return!0}function en(t){return()=>Vs(t)}function rn(t){const e=window.location.origin,a=o=>{if(o.origin!==e)return;const n=t.getRootElement();if(document.activeElement!==n)return;const i=o.data;if(typeof i=="string"){let s;try{s=JSON.parse(i)}catch{return}if(s&&s.protocol==="nuanria_messaging"&&s.type==="request"){const c=s.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,u,g,m,p]=w;t.update(()=>{const f=v.$getSelection();if(v.$isRangeSelection(f)){const y=f.anchor;let b=y.getNode(),I=0,C=0;if(v.$isTextNode(b)&&d>=0&&u>=0&&(I=d,C=d+u,f.setTextNodeRange(b,I,b,C)),I===C&&g===""||(f.insertRawText(g),b=y.getNode()),v.$isTextNode(b)){I=m,C=m+p;const T=b.getTextContentSize();I=I>T?T:I,C=C>T?T:C,f.setTextNodeRange(b,I,b,C)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",a,!0),()=>{window.removeEventListener("message",a,!0)}}v.defineExtension({build:(t,e,a)=>Je(e),config:v.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,a)=>ue(()=>a.getOutput().disabled.value?void 0:rn(t))});function Fs(t,...e){const a=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const n of e)o.append("v",n);throw a.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${a.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const za=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Gs({editor:t,ErrorBoundary:e}){return function(a,o){const[n,i]=l.useState(()=>a.getDecorators());return za(()=>a.registerDecoratorListener(s=>{Xa.flushSync(()=>{i(s)})}),[a]),l.useEffect(()=>{i(a.getDecorators())},[a]),l.useMemo(()=>{const s=[],c=Object.keys(n);for(let w=0;w<c.length;w++){const d=c[w],u=r.jsx(o,{onError:m=>a._onError(m),children:r.jsx(l.Suspense,{fallback:null,children:n[d]})}),g=a.getElementByKey(d);g!==null&&s.push(Xa.createPortal(u,g,d))}return s},[o,n,a])}(t,e)}function Us({editor:t,ErrorBoundary:e}){return function(a){const o=He.maybeFromEditor(a);if(o&&o.hasExtensionByName(Ps.name)){for(const n of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(n)&&Fs(320,n);return!0}return!1}(t)?null:r.jsx(Gs,{editor:t,ErrorBoundary:e})}function lo(t){return t.getEditorState().read(en(t.isComposing()))}function qs({contentEditable:t,placeholder:e=null,ErrorBoundary:a}){const[o]=ve();return function(n){za(()=>v.mergeRegister(ca.registerRichText(n),rn(n)),[n])}(o),r.jsxs(r.Fragment,{children:[t,r.jsx(Ks,{content:e}),r.jsx(Us,{editor:o,ErrorBoundary:a})]})}function Ks({content:t}){const[e]=ve(),a=function(n){const[i,s]=l.useState(()=>lo(n));return za(()=>{function c(){const w=lo(n);s(w)}return c(),v.mergeRegister(n.registerUpdateListener(()=>{c()}),n.registerEditableListener(()=>{c()}))},[n]),i}(e),o=ss();return a?typeof t=="function"?t(o):t:null}function Hs({defaultSelection:t}){const[e]=ve();return l.useEffect(()=>{e.focus(()=>{const a=document.activeElement,o=e.getRootElement();o===null||a!==null&&o.contains(a)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Ys=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Ws({onClear:t}){const[e]=ve();return Ys(()=>Yo(e,t),[e,t]),null}const an=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Xs({editor:t,ariaActiveDescendant:e,ariaAutoComplete:a,ariaControls:o,ariaDescribedBy:n,ariaErrorMessage:i,ariaExpanded:s,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:u,ariaOwns:g,ariaRequired:m,autoCapitalize:p,className:f,id:y,role:b="textbox",spellCheck:I=!0,style:C,tabIndex:T,"data-testid":S,...N},E){const[z,j]=l.useState(t.isEditable()),x=l.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),R=l.useMemo(()=>function(...P){return G=>{for(const q of P)typeof q=="function"?q(G):q!=null&&(q.current=G)}}(E,x),[x,E]);return an(()=>(j(t.isEditable()),t.registerEditableListener(P=>{j(P)})),[t]),r.jsx("div",{"aria-activedescendant":z?e:void 0,"aria-autocomplete":z?a:"none","aria-controls":z?o:void 0,"aria-describedby":n,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":z&&b==="combobox"?!!s:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":u,"aria-owns":z?g:void 0,"aria-readonly":!z||void 0,"aria-required":m,autoCapitalize:p,className:f,contentEditable:z,"data-testid":S,id:y,ref:R,role:b,spellCheck:I,style:C,tabIndex:T,...N})}const Zs=l.forwardRef(Xs);function wo(t){return t.getEditorState().read(en(t.isComposing()))}const Js=l.forwardRef(Qs);function Qs(t,e){const{placeholder:a,...o}=t,[n]=ve();return r.jsxs(r.Fragment,{children:[r.jsx(Zs,{editor:n,...o,ref:e}),a!=null&&r.jsx(tc,{editor:n,content:a})]})}function tc({content:t,editor:e}){const a=function(s){const[c,w]=l.useState(()=>wo(s));return an(()=>{function d(){const u=wo(s);w(u)}return d(),v.mergeRegister(s.registerUpdateListener(()=>{d()}),s.registerEditableListener(()=>{d()}))},[s]),c}(e),[o,n]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(n(e.isEditable()),e.registerEditableListener(s=>{n(s)})),[e]),!a)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:r.jsx("div",{"aria-hidden":!0,children:i})}function ec({placeholder:t,className:e,placeholderClassName:a}){return r.jsx(Js,{className:e??"ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-hidden","aria-placeholder":t,placeholder:r.jsx("div",{className:a??"tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",children:t})})}const on=l.createContext(void 0);function rc({activeEditor:t,$updateToolbar:e,blockType:a,setBlockType:o,showModal:n,children:i}){const s=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:a,setBlockType:o,showModal:n}),[t,e,a,o,n]);return r.jsx(on.Provider,{value:s,children:i})}function nn(){const t=l.useContext(on);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function ac(){const[t,e]=l.useState(void 0),a=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:i,content:s}=t;return r.jsx(Er,{open:!0,onOpenChange:a,children:r.jsxs(Tr,{children:[r.jsx(Rr,{children:r.jsx(zr,{children:i})}),s]})})},[t,a]),n=l.useCallback((i,s,c=!1)=>{e({closeOnClickOutside:c,content:s(a),title:i})},[a]);return[o,n]}function oc({children:t}){const[e]=ve(),[a,o]=l.useState(e),[n,i]=l.useState("paragraph"),[s,c]=ac(),w=()=>{};return l.useEffect(()=>a.registerCommand(v.SELECTION_CHANGE_COMMAND,(d,u)=>(o(u),!1),v.COMMAND_PRIORITY_CRITICAL),[a]),r.jsxs(rc,{activeEditor:a,$updateToolbar:w,blockType:n,setBlockType:i,showModal:c,children:[s,t({blockType:n})]})}function nc(t){const[e]=ve(),{activeEditor:a}=nn();l.useEffect(()=>a.registerCommand(v.SELECTION_CHANGE_COMMAND,()=>{const o=v.$getSelection();return o&&t(o),!1},v.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{a.getEditorState().read(()=>{const o=v.$getSelection();o&&t(o)})},[a,t])}const ic=ge.cva("pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",{variants:{variant:{default:"tw:bg-transparent",outline:"tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted"},size:{default:"tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",sm:"tw:h-7 tw:min-w-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",lg:"tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2"}},defaultVariants:{variant:"default",size:"default"}}),sn=l.createContext({size:"default",variant:"default",spacing:0,orientation:"horizontal"});function Da({className:t,variant:e,size:a,spacing:o=0,orientation:n="horizontal",children:i,...s}){const c=ft();return r.jsx(k.ToggleGroup.Root,{"data-slot":"toggle-group","data-variant":e,"data-size":a,"data-spacing":o,"data-orientation":n,style:{"--gap":o},className:h("pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",t),dir:c,...s,children:r.jsx(sn.Provider,{value:l.useMemo(()=>({variant:e,size:a,spacing:o,orientation:n}),[e,a,o,n]),children:i})})}function sr({className:t,children:e,variant:a="default",size:o="default",...n}){const i=l.useContext(sn);return r.jsx(k.ToggleGroup.Item,{"data-slot":"toggle-group-item","data-variant":i.variant||a,"data-size":i.size||o,"data-spacing":i.spacing,className:h("tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",ic({variant:i.variant||a,size:i.size||o}),t),...n,children:e})}const uo=[{format:"bold",icon:$.BoldIcon,label:"Bold"},{format:"italic",icon:$.ItalicIcon,label:"Italic"}];function sc(){const{activeEditor:t}=nn(),[e,a]=l.useState([]),o=l.useCallback(n=>{if(v.$isRangeSelection(n)||vi.$isTableSelection(n)){const i=[];uo.forEach(({format:s})=>{n.hasFormat(s)&&i.push(s)}),a(s=>s.length!==i.length||!i.every(c=>s.includes(c))?i:s)}},[]);return nc(o),r.jsx(Da,{type:"multiple",value:e,onValueChange:a,variant:"outline",size:"sm",children:uo.map(({format:n,icon:i,label:s})=>r.jsx(sr,{value:n,"aria-label":s,onClick:()=>{t.dispatchCommand(v.FORMAT_TEXT_COMMAND,n)},children:r.jsx(i,{className:"tw:h-4 tw:w-4"})},n))})}function cc({onClear:t}){const[e]=ve();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(v.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function lc({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:a}){const[,o]=l.useState(void 0),n=i=>{i!==void 0&&o(i)};return r.jsxs("div",{className:"tw:relative",children:[r.jsx(oc,{children:()=>r.jsx("div",{className:"tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1",children:r.jsx(sc,{})})}),r.jsxs("div",{className:"tw:relative",children:[r.jsx(qs,{contentEditable:r.jsx("div",{ref:n,children:r.jsx(ec,{placeholder:t})}),ErrorBoundary:os}),e&&r.jsx(Hs,{defaultSelection:"rootEnd"}),r.jsx(cc,{onClear:a}),r.jsx(Ws,{})]})]})}const dc={namespace:"commentEditor",theme:Ca,nodes:Sa,onError:t=>{console.error(t)}};function $r({editorState:t,editorSerializedState:e,onChange:a,onSerializedChange:o,placeholder:n="Start typing…",autoFocus:i=!1,onClear:s,className:c}){return r.jsx("div",{className:h("pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",c),children:r.jsx(Ji,{initialConfig:{...dc,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:r.jsxs(Ot,{children:[r.jsx(lc,{placeholder:n,autoFocus:i,onClear:s}),r.jsx(ts,{ignoreSelectionChange:!0,onChange:w=>{a==null||a(w),o==null||o(w.toJSON())}})]})})})}function wc(t,e){const a=v.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const n=[];for(const i of a)if(!ln.has(i.nodeName)){const s=dn(i,t,n,!1);s!==null&&(o=o.concat(s))}return function(i){for(const s of i)s.getNextSibling()instanceof v.ArtificialNode__DO_NOT_USE&&s.insertAfter(v.$createLineBreakNode());for(const s of i){const c=s.getChildren();for(const w of c)s.insertBefore(w);s.remove()}}(n),o}function uc(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const a=document.createElement("div"),o=v.$getRoot().getChildren();for(let n=0;n<o.length;n++)cn(t,o[n],a,e);return a.innerHTML}function cn(t,e,a,o=null){let n=o===null||e.isSelected(o);const i=v.$isElementNode(e)&&e.excludeFromCopy("html");let s=e;o!==null&&v.$isTextNode(e)&&(s=ls(o,e,"clone"));const c=v.$isElementNode(s)?s.getChildren():[],w=v.getRegisteredNode(t,s.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,s):s.exportDOM(t);const{element:u,after:g}=d;if(!u)return!1;const m=document.createDocumentFragment();for(let p=0;p<c.length;p++){const f=c[p],y=cn(t,f,m,o);!n&&v.$isElementNode(e)&&y&&e.extractWithChild(f,o,"html")&&(n=!0)}if(n&&!i){if((v.isHTMLElement(u)||v.isDocumentFragment(u))&&u.append(m),a.append(u),g){const p=g.call(s,u);p&&(v.isDocumentFragment(u)?u.replaceChildren(p):u.replaceWith(p))}}else a.append(m);return n}const ln=new Set(["STYLE","SCRIPT"]);function dn(t,e,a,o,n=new Map,i){let s=[];if(ln.has(t.nodeName))return s;let c=null;const w=function(f,y){const{nodeName:b}=f,I=y._htmlConversions.get(b.toLowerCase());let C=null;if(I!==void 0)for(const T of I){const S=T(f);S!==null&&(C===null||(C.priority||0)<=(S.priority||0))&&(C=S)}return C!==null?C.conversion:null}(t,e),d=w?w(t):null;let u=null;if(d!==null){u=d.after;const f=d.node;if(c=Array.isArray(f)?f[f.length-1]:f,c!==null){for(const[,y]of n)if(c=y(c,i),!c)break;c&&s.push(...Array.isArray(f)?f:[c])}d.forChild!=null&&n.set(t.nodeName,d.forChild)}const g=t.childNodes;let m=[];const p=(c==null||!v.$isRootOrShadowRoot(c))&&(c!=null&&v.$isBlockElementNode(c)||o);for(let f=0;f<g.length;f++)m.push(...dn(g[f],e,a,p,new Map(n),c));return u!=null&&(m=u(m)),v.isBlockDomNode(t)&&(m=pc(t,m,p?()=>{const f=new v.ArtificialNode__DO_NOT_USE;return a.push(f),f}:v.$createParagraphNode)),c==null?m.length>0?s=s.concat(m):v.isBlockDomNode(t)&&function(f){return f.nextSibling==null||f.previousSibling==null?!1:v.isInlineDomNode(f.nextSibling)&&v.isInlineDomNode(f.previousSibling)}(t)&&(s=s.concat(v.$createLineBreakNode())):v.$isElementNode(c)&&c.append(...m),s}function pc(t,e,a){const o=t.style.textAlign,n=[];let i=[];for(let s=0;s<e.length;s++){const c=e[s];if(v.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),n.push(c);else if(i.push(c),s===e.length-1||s<e.length-1&&v.$isBlockElementNode(e[s+1])){const w=a();w.setFormat(o),w.append(...i),n.push(w),i=[]}}return n}function wn(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const a=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),a==null||a.removeAllRanges(),a==null||a.addRange(o),!0}function un(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:un(e.children)):!1}function Zt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?un(t.root.children):!1}function gc(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=No.createHeadlessEditor({namespace:"EditorUtils",theme:Ca,nodes:Sa,onError:o=>{console.error(o)}});let a;if(e.update(()=>{const n=new DOMParser().parseFromString(t,"text/html"),i=wc(e,n);v.$getRoot().clear(),v.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{a=e.getEditorState().toJSON()}),!a)throw new Error("Failed to convert HTML to editor state");return a}function Ar(t){const e=No.createHeadlessEditor({namespace:"EditorUtils",theme:Ca,nodes:Sa,onError:n=>{console.error(n)}}),a=e.parseEditorState(JSON.stringify(t));e.setEditorState(a);let o="";return e.getEditorState().read(()=>{o=uc(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function Ia(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function $e({className:t,orientation:e="horizontal",decorative:a=!0,...o}){return r.jsx(k.Separator.Root,{"data-slot":"separator",decorative:a,orientation:e,className:h("pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",t),...o})}const pn=ge.cva("tw:group/button-group tw:flex tw:w-fit tw:items-stretch tw:*:focus-visible:relative tw:*:focus-visible:z-10 tw:has-[>[data-slot=button-group]]:gap-2 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1",{variants:{orientation:{horizontal:"tw:[&>*:not(:first-child)]:rounded-s-none tw:[&>*:not(:first-child)]:border-s-0 tw:[&>*:not(:last-child)]:rounded-e-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!",vertical:"tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!"}},defaultVariants:{orientation:"horizontal"}});function Gr({className:t,orientation:e,...a}){return r.jsx("div",{role:"group","data-slot":"button-group","data-orientation":e,className:h("pr-twp",pn({orientation:e}),t),...a})}function hc({className:t,asChild:e=!1,...a}){const o=e?k.Slot.Root:"div";return r.jsx(o,{className:h("pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",t),...a})}function Ma({className:t,orientation:e="vertical",...a}){return r.jsx($e,{"data-slot":"button-group-separator",orientation:e,className:h("pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",t),...a})}const Oa=Object.freeze(["%cancelButton_tooltip%","%acceptButton_tooltip%"]),po=(t,e)=>t[e]??e;function $a({onCancelClick:t,onAcceptClick:e,canAccept:a=!0,localizedStrings:o={},className:n="tw:h-6 tw:w-6",acceptLabel:i}){const s=po(o,"%cancelButton_tooltip%"),c=i??po(o,"%acceptButton_tooltip%");return r.jsxs(Gr,{children:[r.jsx(Ot,{children:r.jsxs($t,{children:[r.jsx(At,{asChild:!0,children:r.jsx(F,{"aria-label":s,className:n,size:"icon",onClick:t,variant:"secondary",children:r.jsx($.X,{})})}),r.jsx(Pt,{children:r.jsx("p",{children:s})})]})}),r.jsx(Ma,{}),r.jsx(Ot,{children:r.jsxs($t,{children:[r.jsx(At,{asChild:!0,children:r.jsx(F,{"aria-label":c,className:n,size:"icon",onClick:e,disabled:!a,children:r.jsx($.Check,{})})}),r.jsx(Pt,{children:r.jsx("p",{children:c})})]})})]})}function Sr(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Aa(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const fc={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function ra(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function mc({assignableUsers:t,onSave:e,onClose:a,localizedStrings:o,initialAssignedUser:n}){const[i,s]=l.useState(fc),[c,w]=l.useState(n),[d,u]=l.useState(!1),g=l.useRef(void 0),m=l.useRef(null);l.useEffect(()=>{let b=!0;const I=m.current;if(!I)return;const C=setTimeout(()=>{b&&wn(I)},300);return()=>{b=!1,clearTimeout(C)}},[]);const p=l.useCallback(()=>{if(!Zt(i))return;const b=Ar(i);e(b,c)},[i,e,c]),f=o["%commentEditor_placeholder%"]??"Type your comment here...",y=o["%commentEditor_assignTo_label%"]??"Assign to";return r.jsxs("div",{className:"pr-twp tw:grid tw:gap-3",children:[r.jsxs("div",{className:"tw:flex tw:items-center tw:justify-between",children:[r.jsx("span",{className:"tw:text-sm tw:font-medium",children:y}),r.jsx($a,{onCancelClick:a,onAcceptClick:p,canAccept:Zt(i),localizedStrings:o,acceptLabel:o["%commentEditor_saveButton_tooltip%"]})]}),r.jsx("div",{className:"tw:flex tw:items-center tw:gap-2",children:r.jsxs(se,{open:d,onOpenChange:u,children:[r.jsx(me,{asChild:!0,children:r.jsxs(F,{variant:"outline",className:"tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",disabled:t.length===0,children:[r.jsx($.AtSign,{className:"tw:h-4 tw:w-4"}),r.jsx("span",{children:ra(c!==void 0?c:"",o)})]})}),r.jsx(ce,{className:"tw:w-auto tw:p-0",align:"start",onKeyDown:b=>{b.key==="Escape"&&(b.stopPropagation(),u(!1))},children:r.jsx(he,{children:r.jsx(fe,{children:t.map(b=>r.jsx(ie,{onSelect:()=>{w(b||void 0),u(!1)},className:"tw:flex tw:items-center",children:r.jsx("span",{children:ra(b,o)})},b||"unassigned"))})})})]})}),r.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw:outline-hidden",onKeyDownCapture:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),a()):Aa(b)&&(b.preventDefault(),b.stopPropagation(),Zt(i)&&p())},onKeyDown:b=>{Ia(b),(b.key==="Enter"||b.key===" ")&&b.stopPropagation()},children:r.jsx($r,{editorSerializedState:i,onSerializedChange:b=>s(b),placeholder:f,onClear:b=>{g.current=b}})})]})}const vc=Object.freeze(["%commentEditor_placeholder%","%commentEditor_assignTo_label%","%commentEditor_saveButton_tooltip%","%commentEditor_unassigned%","%commentEditor_team%",...Oa]),bc=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%","%comment_aria_assign_user%","%comment_aria_submit_comment%","%comment_aria_mark_as_read%","%comment_aria_mark_as_unread%","%comment_aria_resolve_thread%"],xc=["input","select","textarea","button"],yc=["button","textbox"],gn=({options:t,onFocusChange:e,onOptionSelect:a,onCharacterPress:o})=>{const n=l.useRef(null),[i,s]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(p=>{s(p);const f=t.find(b=>b.id===p);f&&(e==null||e(f));const y=document.getElementById(p);y&&(y.scrollIntoView({block:"center"}),y.focus()),n.current&&n.current.setAttribute("aria-activedescendant",p)},[e,t]),u=l.useCallback(p=>{const f=t.find(y=>y.id===p);f&&(w(y=>y===p?void 0:p),a==null||a(f))},[a,t]),g=p=>{if(!p)return!1;const f=p.tagName.toLowerCase();if(p.isContentEditable||xc.includes(f))return!0;const y=p.getAttribute("role");if(y&&yc.includes(y))return!0;const b=p.getAttribute("tabindex");return b!==void 0&&b!=="-1"},m=l.useCallback(p=>{var z;const f=p.target,y=j=>j?document.getElementById(j):void 0,b=y(c),I=y(i);if(!!(b&&f&&b.contains(f)&&f!==b)&&g(f)){if(p.key==="Escape"||p.key==="ArrowLeft"&&!f.isContentEditable){if(c){p.preventDefault(),p.stopPropagation();const j=t.find(x=>x.id===c);j&&d(j.id)}return}if(p.key==="ArrowDown"||p.key==="ArrowUp"){if(!b)return;const j=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(j.length===0)return;const x=j.findIndex(P=>P===f);if(x===-1)return;let R;p.key==="ArrowDown"?R=Math.min(x+1,j.length-1):R=Math.max(x-1,0),R!==x&&(p.preventDefault(),p.stopPropagation(),(z=j[R])==null||z.focus());return}return}const S=t.findIndex(j=>j.id===i);let N=S;switch(p.key){case"ArrowDown":N=Math.min(S+1,t.length-1),p.preventDefault();break;case"ArrowUp":N=Math.max(S-1,0),p.preventDefault();break;case"Home":N=0,p.preventDefault();break;case"End":N=t.length-1,p.preventDefault();break;case" ":case"Enter":i&&u(i),p.preventDefault(),p.stopPropagation();return;case"ArrowRight":{const j=I;if(j){const x=j.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=j.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=x??R;if(P){p.preventDefault(),P.focus();return}}break}default:p.key.length===1&&!p.metaKey&&!p.ctrlKey&&!p.altKey&&(g(f)||(o==null||o(p.key),p.preventDefault()));return}const E=t[N];E&&d(E.id)},[t,d,i,c,u,o]);return{listboxRef:n,activeId:i,selectedId:c,handleKeyDown:m,focusOption:d}},hn=ge.cva("tw:group/badge tw:inline-flex tw:h-5 tw:w-fit tw:shrink-0 tw:items-center tw:justify-center tw:gap-1 tw:overflow-hidden tw:rounded-4xl tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-all tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:[&>svg]:pointer-events-none tw:[&>svg]:size-3!",{variants:{variant:{default:"tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",secondary:"tw:bg-secondary tw:text-secondary-foreground tw:[a]:hover:bg-secondary/80",destructive:"tw:bg-destructive/10 tw:text-destructive tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:[a]:hover:bg-destructive/20",outline:"tw:border-border tw:text-foreground tw:[a]:hover:bg-muted tw:[a]:hover:text-muted-foreground",ghost:"tw:hover:bg-muted tw:hover:text-muted-foreground tw:dark:hover:bg-muted/50",link:"tw:text-primary tw:underline-offset-4 tw:hover:underline",muted:"tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",blueIndicator:"tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",mutedIndicator:"tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0"}},defaultVariants:{variant:"default"}});function pe({className:t,variant:e="default",asChild:a=!1,...o}){const n=a?k.Slot.Root:"span";return r.jsx(n,{"data-slot":"badge","data-variant":e,className:h("pr-twp",hn({variant:e}),t),...o})}function fn({className:t,size:e="default",...a}){return r.jsx("div",{"data-slot":"card","data-size":e,className:h("pr-twp tw:group/card tw:flex tw:flex-col tw:gap-4 tw:overflow-hidden tw:rounded-xl tw:bg-card tw:py-4 tw:text-sm tw:text-card-foreground tw:ring-1 tw:ring-foreground/10 tw:has-data-[slot=card-footer]:pb-0 tw:has-[>img:first-child]:pt-0 tw:data-[size=sm]:gap-3 tw:data-[size=sm]:py-3 tw:data-[size=sm]:has-data-[slot=card-footer]:pb-0 tw:*:[img:first-child]:rounded-t-xl tw:*:[img:last-child]:rounded-b-xl",t),...a})}function kc({className:t,...e}){return r.jsx("div",{"data-slot":"card-header",className:h("pr-twp tw:group/card-header tw:@container/card-header tw:grid tw:auto-rows-min tw:items-start tw:gap-1 tw:rounded-t-xl tw:px-4 tw:group-data-[size=sm]/card:px-3 tw:has-data-[slot=card-action]:grid-cols-[1fr_auto] tw:has-data-[slot=card-description]:grid-rows-[auto_auto] tw:[.border-b]:pb-4 tw:group-data-[size=sm]/card:[.border-b]:pb-3",t),...e})}function jc({className:t,...e}){return r.jsx("div",{"data-slot":"card-title",className:h("pr-twp tw:font-heading tw:text-base tw:leading-snug tw:font-medium tw:group-data-[size=sm]/card:text-sm",t),...e})}function _c({className:t,...e}){return r.jsx("div",{"data-slot":"card-description",className:h("pr-twp tw:text-sm tw:text-muted-foreground",t),...e})}function mn({className:t,...e}){return r.jsx("div",{"data-slot":"card-content",className:h("pr-twp tw:px-4 tw:group-data-[size=sm]/card:px-3",t),...e})}function Nc({className:t,...e}){return r.jsx("div",{"data-slot":"card-footer",className:h("pr-twp tw:flex tw:items-center tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:group-data-[size=sm]/card:p-3",t),...e})}function vn({className:t,size:e="default",...a}){return r.jsx(k.Avatar.Root,{"data-slot":"avatar","data-size":e,className:h("pr-twp tw:group/avatar tw:relative tw:flex tw:size-8 tw:shrink-0 tw:rounded-full tw:select-none tw:after:absolute tw:after:inset-0 tw:after:rounded-full tw:after:border tw:after:border-border tw:after:mix-blend-darken tw:data-[size=lg]:size-10 tw:data-[size=sm]:size-6 tw:dark:after:mix-blend-lighten",t),...a})}function Cc({className:t,...e}){return r.jsx(k.Avatar.Image,{"data-slot":"avatar-image",className:h("pr-twp tw:aspect-square tw:size-full tw:rounded-full tw:object-cover",t),...e})}function bn({className:t,...e}){return r.jsx(k.Avatar.Fallback,{"data-slot":"avatar-fallback",className:h("pr-twp tw:flex tw:size-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-sm tw:text-muted-foreground tw:group-data-[size=sm]/avatar:text-xs",t),...e})}const Pa=l.createContext(void 0);function ke(){const t=l.useContext(Pa);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Ge=ge.cva("",{variants:{variant:{default:"",muted:"tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"}},defaultVariants:{variant:"default"}});function ae({variant:t="default",...e}){const a=ft(),o=l.useMemo(()=>({variant:t}),[t]);return r.jsx(Pa.Provider,{value:o,children:r.jsx(k.DropdownMenu.Root,{"data-slot":"dropdown-menu",dir:a,...e})})}function xn({...t}){return r.jsx(k.DropdownMenu.Portal,{"data-slot":"dropdown-menu-portal",...t})}function oe({...t}){return r.jsx(k.DropdownMenu.Trigger,{"data-slot":"dropdown-menu-trigger",...t})}function ne({className:t,align:e="start",sideOffset:a=4,children:o,...n}){const i=ft();return r.jsx(k.DropdownMenu.Portal,{children:r.jsx(k.DropdownMenu.Content,{"data-slot":"dropdown-menu-content",sideOffset:a,align:e,className:h("pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),...n,children:r.jsx("div",{dir:i,children:o})})})}function La({...t}){return r.jsx(k.DropdownMenu.Group,{"data-slot":"dropdown-menu-group",...t})}function Se({className:t,inset:e,variant:a="default",...o}){const n=ft(),i=ke();return r.jsx(k.DropdownMenu.Item,{"data-slot":"dropdown-menu-item","data-inset":e,"data-variant":a,className:h("tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",t,Ge({variant:i.variant})),dir:n,...o})}function ee({className:t,children:e,checked:a,inset:o,...n}){const i=ft(),s=ke();return r.jsxs(k.DropdownMenu.CheckboxItem,{"data-slot":"dropdown-menu-checkbox-item","data-inset":o,className:h("tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t,Ge({variant:s.variant})),checked:a,dir:i,...n,children:[r.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center","data-slot":"dropdown-menu-checkbox-item-indicator",children:r.jsx(k.DropdownMenu.ItemIndicator,{children:r.jsx(ht.IconCheck,{})})}),e]})}function yn({...t}){return r.jsx(k.DropdownMenu.RadioGroup,{"data-slot":"dropdown-menu-radio-group",...t})}function kn({className:t,children:e,inset:a,...o}){const n=ft(),i=ke();return r.jsxs(k.DropdownMenu.RadioItem,{"data-slot":"dropdown-menu-radio-item","data-inset":a,className:h("tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t,Ge({variant:i.variant})),dir:n,...o,children:[r.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center","data-slot":"dropdown-menu-radio-item-indicator",children:r.jsx(k.DropdownMenu.ItemIndicator,{children:r.jsx(ht.IconCheck,{})})}),e]})}function Ee({className:t,inset:e,...a}){return r.jsx(k.DropdownMenu.Label,{"data-slot":"dropdown-menu-label","data-inset":e,className:h("tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",t),...a})}function ye({className:t,...e}){return r.jsx(k.DropdownMenu.Separator,{"data-slot":"dropdown-menu-separator",className:h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",t),...e})}function Sc({className:t,...e}){return r.jsx("span",{"data-slot":"dropdown-menu-shortcut",className:h("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",t),...e})}function jn({...t}){return r.jsx(k.DropdownMenu.Sub,{"data-slot":"dropdown-menu-sub",...t})}function _n({className:t,inset:e,children:a,...o}){const n=ke();return r.jsxs(k.DropdownMenu.SubTrigger,{"data-slot":"dropdown-menu-sub-trigger","data-inset":e,className:h("tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t,Ge({variant:n.variant})),...o,children:[a,r.jsx(ht.IconChevronRight,{className:"tw:ms-auto"})]})}function Nn({className:t,children:e,...a}){const o=ft();return r.jsx(k.DropdownMenu.SubContent,{"data-slot":"dropdown-menu-sub-content",className:h("pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",t),...a,children:r.jsx("div",{dir:o,children:e})})}function go({comment:t,isReply:e=!1,localizedStrings:a,isThreadExpanded:o=!1,handleUpdateComment:n,handleDeleteComment:i,onEditingChange:s,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[u,g]=l.useState(),m=l.useRef(null);l.useEffect(()=>{if(!w)return;let S=!0;const N=m.current;if(!N)return;const E=setTimeout(()=>{S&&wn(N)},300);return()=>{S=!1,clearTimeout(E)}},[w]);const p=l.useCallback(S=>{S&&S.stopPropagation(),d(!1),g(void 0),s==null||s(!1)},[s]),f=l.useCallback(async S=>{if(S&&S.stopPropagation(),!u||!n)return;await n(t.id,Ar(u))&&(d(!1),g(void 0),s==null||s(!1))},[u,n,t.id,s]),y=l.useMemo(()=>{const S=new Date(t.date),N=D.formatRelativeDate(S,a["%comment_date_today%"],a["%comment_date_yesterday%"]),E=S.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return D.formatReplacementString(a["%comment_dateAtTime%"],{date:N,time:E})},[t.date,a]),b=l.useMemo(()=>t.user,[t.user]),I=l.useMemo(()=>t.user.split(" ").map(S=>S[0]).join("").toUpperCase().slice(0,2),[t.user]),C=l.useMemo(()=>D.sanitizeHtml(t.contents),[t.contents]),T=l.useMemo(()=>{if(o&&c)return r.jsxs(r.Fragment,{children:[r.jsxs(Se,{onClick:S=>{S.stopPropagation(),d(!0),g(gc(t.contents)),s==null||s(!0)},children:[r.jsx($.Pencil,{className:"tw:me-2 tw:h-4 tw:w-4"}),a["%comment_editComment%"]]}),r.jsxs(Se,{onClick:async S=>{S.stopPropagation(),i&&await i(t.id)},children:[r.jsx($.Trash2,{className:"tw:me-2 tw:h-4 tw:w-4"}),a["%comment_deleteComment%"]]})]})},[c,o,a,t.contents,t.id,i,s]);return r.jsxs("div",{className:h("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3",{"tw:text-sm":e}),children:[r.jsx(vn,{className:"tw:h-8 tw:w-8",children:r.jsx(bn,{className:"tw:text-xs tw:font-medium",children:I})}),r.jsxs("div",{className:"tw:flex tw:flex-1 tw:flex-col tw:gap-2",children:[r.jsxs("div",{className:"tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2",children:[r.jsx("p",{className:"tw:text-sm tw:font-medium",children:b}),r.jsx("p",{className:"tw:text-xs tw:font-normal tw:text-muted-foreground",children:y}),r.jsx("div",{className:"tw:flex-1"}),e&&t.assignedUser!==void 0&&r.jsxs(pe,{variant:"secondary",className:"tw:text-xs tw:font-normal",children:["→ ",Sr(t.assignedUser,a)]})]}),w&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw:flex tw:flex-col tw:gap-2",ref:m,onKeyDownCapture:S=>{S.key==="Escape"?(S.preventDefault(),S.stopPropagation(),p()):Aa(S)&&(S.preventDefault(),S.stopPropagation(),Zt(u)&&f())},onKeyDown:S=>{Ia(S),(S.key==="Enter"||S.key===" ")&&S.stopPropagation()},onClick:S=>{S.stopPropagation()},children:[r.jsx($r,{className:h('tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'),editorSerializedState:u,onSerializedChange:S=>g(S)}),r.jsxs("div",{className:"tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2",children:[r.jsx(F,{size:"icon",onClick:p,variant:"outline",className:"tw:flex tw:items-center tw:justify-center tw:rounded-md",children:r.jsx($.X,{})}),r.jsx(F,{size:"icon",onClick:f,className:"tw:flex tw:items-center tw:justify-center tw:rounded-md",disabled:!Zt(u),children:r.jsx($.ArrowUp,{})})]})]}),!w&&r.jsxs(r.Fragment,{children:[t.status==="Resolved"&&r.jsx("div",{className:"tw:text-sm tw:italic",children:a["%comment_status_resolved%"]}),t.status==="Todo"&&e&&r.jsx("div",{className:"tw:text-sm tw:italic",children:a["%comment_status_todo%"]}),r.jsx("div",{className:h("tw:prose tw:items-start tw:gap-2 tw:break-words tw:text-sm tw:font-normal tw:text-foreground","tw:max-w-none","tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground","tw:prose-quoteless",{"tw:line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:C}})]})]}),T&&r.jsxs(ae,{children:[r.jsx(oe,{asChild:!0,children:r.jsx(F,{variant:"ghost",size:"icon",children:r.jsx($.MoreHorizontal,{})})}),r.jsx(ne,{align:"end",children:T})]})]})}const ho={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Ec({classNameForVerseText:t,comments:e,localizedStrings:a,isSelected:o=!1,verseRef:n,assignedUser:i,currentUser:s,handleSelectThread:c,threadId:w,thread:d,threadStatus:u,handleAddCommentToThread:g,handleUpdateComment:m,handleDeleteComment:p,handleReadStatusChange:f,assignableUsers:y,canUserAddCommentToThread:b,canUserAssignThreadCallback:I,canUserResolveThreadCallback:C,canUserEditOrDeleteCommentCallback:T,isRead:S=!1,autoReadDelay:N=5,onVerseRefClick:E,initialAssignedUser:z}){const[j,x]=l.useState(ho),[R,P]=l.useState(),[G,q]=l.useState(),V=o,[K,M]=l.useState(!1),[Y,lt]=l.useState(!1),[kt,St]=l.useState(!1),[J,Et]=l.useState(!1),[U,tt]=l.useState(!1),[rt,at]=l.useState(S),[ot,Lt]=l.useState(!1),gt=l.useRef(void 0),[Ft,Gt]=l.useState(new Map);l.useEffect(()=>{let O=!0;return(async()=>{const dt=C?await C(w):!1;O&&tt(dt)})(),()=>{O=!1}},[w,C]),l.useEffect(()=>{let O=!0;if(!o){Et(!1),Gt(new Map);return}return(async()=>{const dt=I?await I(w):!1;O&&Et(dt)})(),()=>{O=!1}},[o,w,I]);const A=l.useRef("idle");l.useEffect(()=>{if(!o){A.current!=="idle"&&(P(void 0),q(void 0),A.current="idle");return}A.current==="idle"&&(A.current="pending"),J?A.current==="pending"&&z!==void 0&&z!==i&&(P(z),A.current="auto-populated"):A.current==="auto-populated"&&(P(void 0),A.current="pending")},[o,z,J,i]);const Tt=l.useMemo(()=>e.filter(O=>!O.deleted),[e]);l.useEffect(()=>{let O=!0;if(!o||!T){Gt(new Map);return}return(async()=>{const dt=new Map;await Promise.all(Tt.map(async bt=>{const Re=await T(bt.id);O&&dt.set(bt.id,Re)})),O&&Gt(dt)})(),()=>{O=!1}},[o,Tt,T]);const Bt=l.useMemo(()=>Tt[0],[Tt]),Qt=l.useRef(null),Ut=l.useRef(void 0),Rt=l.useCallback(()=>{var O;(O=Ut.current)==null||O.call(Ut),x(ho)},[]),je=l.useCallback(()=>{const O=!rt;at(O),Lt(!O),f==null||f(w,O)},[rt,f,w]);l.useEffect(()=>{M(!1)},[o]),l.useEffect(()=>{if(o&&!rt&&!ot){const O=setTimeout(()=>{at(!0),f==null||f(w,!0)},N*1e3);return gt.current=O,()=>clearTimeout(O)}gt.current&&(clearTimeout(gt.current),gt.current=void 0)},[o,rt,ot,N,w,f]);const qt=l.useMemo(()=>({singleReply:a["%comment_thread_single_reply%"],multipleReplies:a["%comment_thread_multiple_replies%"]}),[a]),Kt=l.useMemo(()=>{if(i===void 0)return;if(i==="")return a["%comment_assign_unassigned%"]??"Unassigned";const O=Sr(i,a);return D.formatReplacementString(a["%comment_assigned_to%"],{assignedUser:O})},[i,a]),B=l.useMemo(()=>Tt.slice(1),[Tt]),W=l.useMemo(()=>B.length??0,[B.length]),nt=l.useMemo(()=>W>0,[W]),et=l.useMemo(()=>K||W<=2?B:B.slice(-2),[B,W,K]),wt=l.useMemo(()=>K||W<=2?0:W-2,[W,K]),mt=l.useMemo(()=>W===1?qt.singleReply:D.formatReplacementString(qt.multipleReplies,{count:W}),[W,qt]),vt=l.useMemo(()=>wt===1?qt.singleReply:D.formatReplacementString(qt.multipleReplies,{count:wt}),[wt,qt]);l.useEffect(()=>{!o&&Y&&nt&&lt(!1)},[o,Y,nt]);const ut=l.useCallback(async O=>{O&&O.stopPropagation();const ct=Zt(j)?Ar(j):void 0;if(R!==void 0){await g({threadId:w,contents:ct,assignedUser:R})&&(q(R),ct&&Rt());return}ct&&await g({threadId:w,contents:ct})&&Rt()},[Rt,j,g,R,w]),jt=l.useCallback(async O=>{const ct=Zt(j)?Ar(j):void 0,dt=O.status?O.assignedUser:R??O.assignedUser,bt=await g({...O,contents:ct,assignedUser:dt});return bt&&(dt!==void 0&&q(dt),ct&&Rt()),bt},[Rt,j,g,R]);if(Tt.length!==0)return r.jsx(fn,{role:"option","aria-selected":o,id:w,className:h("tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-hidden tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",{"tw:cursor-pointer tw:hover:shadow-md":!o},{"tw:bg-primary-foreground":!o&&u!=="Resolved"&&rt,"tw:bg-background":o&&u!=="Resolved"&&rt,"tw:bg-muted":u==="Resolved","tw:bg-accent":!rt&&!o&&u!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:r.jsxs(mn,{className:"tw:flex tw:flex-col tw:gap-2 tw:p-0",children:[r.jsxs("div",{className:"tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4",children:[r.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[Kt&&r.jsx(pe,{className:"tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input",children:Kt}),r.jsx(F,{variant:"ghost",size:"icon",onClick:O=>{O.stopPropagation(),je()},className:"tw:text-muted-foreground tw:transition tw:hover:text-foreground","aria-label":rt?a["%comment_aria_mark_as_unread%"]??"Mark as unread":a["%comment_aria_mark_as_read%"]??"Mark as read",children:rt?r.jsx($.MailOpen,{}):r.jsx($.Mail,{})}),U&&u!=="Resolved"&&r.jsx(F,{variant:"ghost",size:"icon",className:h("tw:ms-auto","tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10","tw:opacity-0 tw:group-hover:opacity-100"),onClick:O=>{O.stopPropagation(),jt({threadId:w,status:"Resolved"})},"aria-label":a["%comment_aria_resolve_thread%"]??"Resolve thread",children:r.jsx($.Check,{className:"tw:h-4 tw:w-4"})})]}),r.jsx("div",{className:"tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2",children:r.jsxs("p",{ref:Qt,className:h("tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",{"tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words":V},{"tw:whitespace-nowrap":!V}),children:[n&&E?r.jsx(F,{variant:"ghost",size:"sm",className:"tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",onClick:O=>{O.stopPropagation(),E(d)},children:n}):n,r.jsxs("span",{className:t,children:[Bt.contextBefore,r.jsx("span",{className:"tw:font-bold",children:Bt.selectedText}),Bt.contextAfter]})]})}),r.jsx(go,{comment:Bt,localizedStrings:a,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:jt,handleUpdateComment:m,handleDeleteComment:p,onEditingChange:lt,canEditOrDelete:(!Y&&Ft.get(Bt.id))??!1,canUserResolveThread:U})]}),r.jsxs(r.Fragment,{children:[nt&&!o&&r.jsxs("div",{className:"tw:flex tw:items-center tw:gap-5",children:[r.jsx("div",{className:"tw:w-8",children:r.jsx($e,{})}),r.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:mt})]}),!o&&Zt(j)&&r.jsx($r,{editorSerializedState:j,onSerializedChange:O=>x(O),placeholder:a["%comment_replyOrAssign%"]}),o&&r.jsxs(r.Fragment,{children:[wt>0&&r.jsxs("div",{className:"tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",onClick:O=>{O.stopPropagation(),M(!0)},role:"button",tabIndex:0,onKeyDown:O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),O.stopPropagation(),M(!0))},children:[r.jsx("div",{className:"tw:w-8",children:r.jsx($e,{})}),r.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[r.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:vt}),K?r.jsx($.ChevronUp,{}):r.jsx($.ChevronDown,{})]})]}),et.map(O=>r.jsx("div",{children:r.jsx(go,{comment:O,localizedStrings:a,isReply:!0,isThreadExpanded:o,handleUpdateComment:m,handleDeleteComment:p,onEditingChange:lt,canEditOrDelete:(!Y&&Ft.get(O.id))??!1})},O.id)),b!==!1&&(!Y||Zt(j))&&r.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw:w-full tw:space-y-2",onClick:O=>O.stopPropagation(),onKeyDownCapture:O=>{Aa(O)&&(O.preventDefault(),O.stopPropagation(),(Zt(j)||R!==void 0&&R!==G)&&ut())},onKeyDown:O=>{Ia(O),(O.key==="Enter"||O.key===" ")&&O.stopPropagation()},children:[r.jsx($r,{editorSerializedState:j,onSerializedChange:O=>x(O),placeholder:u==="Resolved"?a["%comment_reopenResolved%"]:a["%comment_replyOrAssign%"],autoFocus:!0,onClear:O=>{Ut.current=O}}),r.jsxs("div",{className:"tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2",children:[R!==void 0&&(Zt(j)||R!==G)&&r.jsx("span",{className:"tw:flex-1 tw:text-sm tw:text-muted-foreground",children:D.formatReplacementString(a["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Sr(R,a)})}),r.jsxs(se,{open:kt,onOpenChange:St,children:[r.jsx(me,{asChild:!0,children:r.jsx(F,{size:"icon",variant:"outline",className:"tw:flex tw:items-center tw:justify-center tw:rounded-md",disabled:!J||!y||y.length===0||!y.includes(s),"aria-label":a["%comment_aria_assign_user%"]??"Assign user",children:r.jsx($.AtSign,{})})}),r.jsx(ce,{className:"tw:w-auto tw:p-0",align:"end",onKeyDown:O=>{O.key==="Escape"&&(O.stopPropagation(),St(!1))},children:r.jsx(he,{children:r.jsx(fe,{children:y==null?void 0:y.map(O=>r.jsx(ie,{onSelect:()=>{P(O!==i?O:void 0),A.current="user-selected",q(void 0),St(!1)},className:"tw:flex tw:items-center",children:r.jsx("span",{children:Sr(O,a)})},O||"unassigned"))})})})]}),r.jsx(F,{size:"icon",onClick:ut,className:"tw:flex tw:items-center tw:justify-center tw:rounded-md",disabled:!Zt(j)&&(R===void 0||R===G),"aria-label":a["%comment_aria_submit_comment%"]??"Submit comment",children:r.jsx($.ArrowUp,{})})]})]})]})]})]})})}function Tc({className:t="",classNameForVerseText:e,threads:a,currentUser:o,localizedStrings:n,handleAddCommentToThread:i,handleUpdateComment:s,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:g,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:p,selectedThreadId:f,onSelectedThreadChange:y,onVerseRefClick:b}){const[I,C]=l.useState(new Set),[T,S]=l.useState(),[N,E]=l.useState(),z=l.useCallback(async M=>{const Y=await i(M);return Y!==void 0&&M.assignedUser!==void 0&&M.assignedUser!==""&&E(M.assignedUser),Y},[i]);l.useEffect(()=>{f&&(C(M=>new Set(M).add(f)),S(f))},[f]);const j=a.filter(M=>M.comments.some(Y=>!Y.deleted)),x=j.map(M=>({id:M.id})),R=l.useCallback(M=>{C(Y=>new Set(Y).add(M.id)),S(M.id),y==null||y(M.id)},[y]),P=l.useCallback(M=>{const Y=I.has(M);C(lt=>{const kt=new Set(lt);return kt.has(M)?kt.delete(M):kt.add(M),kt}),S(M),y==null||y(Y?void 0:M)},[I,y]),{listboxRef:G,activeId:q,handleKeyDown:V}=gn({options:x,onOptionSelect:R}),K=l.useCallback(M=>{M.key==="Escape"?(T&&I.has(T)&&(C(Y=>{const lt=new Set(Y);return lt.delete(T),lt}),S(void 0),y==null||y(void 0)),M.preventDefault(),M.stopPropagation()):V(M)},[T,I,V,y]);return r.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:G,"aria-activedescendant":q??void 0,"aria-label":"Comments",className:h("tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",t),onKeyDown:K,children:j.map(M=>r.jsx("div",{className:h({"tw:opacity-60":M.status==="Resolved"}),children:r.jsx(Ec,{classNameForVerseText:e,comments:M.comments,localizedStrings:n,verseRef:M.verseRef,handleSelectThread:P,threadId:M.id,thread:M,isRead:M.isRead,isSelected:I.has(M.id),currentUser:o,assignedUser:M.assignedUser,threadStatus:M.status,handleAddCommentToThread:z,handleUpdateComment:s,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:g,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:p,onVerseRefClick:b,initialAssignedUser:N})},M.id))})}function Rc({table:t}){return r.jsxs(ae,{children:[r.jsx(oe,{asChild:!0,children:r.jsxs(F,{variant:"outline",size:"sm",className:"tw:ml-auto tw:hidden tw:h-8 tw:lg:flex",children:[r.jsx($.FilterIcon,{className:"tw:mr-2 tw:h-4 tw:w-4"}),"View"]})}),r.jsxs(ne,{align:"end",className:"tw:w-[150px]",children:[r.jsx(Ee,{children:"Toggle columns"}),r.jsx(ye,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>r.jsx(ee,{className:"tw:capitalize",checked:e.getIsVisible(),onCheckedChange:a=>e.toggleVisibility(!!a),children:e.id},e.id))]})]})}function Ae({...t}){return r.jsx(k.Select.Root,{"data-slot":"select",...t})}function Cn({className:t,...e}){return r.jsx(k.Select.Group,{"data-slot":"select-group",className:h("tw:scroll-my-1 tw:p-1",t),...e})}function Pe({...t}){return r.jsx(k.Select.Value,{"data-slot":"select-value",...t})}function Le({className:t,size:e="default",children:a,...o}){const n=ft();return r.jsxs(k.Select.Trigger,{"data-slot":"select-trigger","data-size":e,className:h("pr-twp tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:py-2 tw:pe-2 tw:ps-2.5 tw:text-sm tw:whitespace-nowrap tw:transition-colors tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:data-placeholder:text-muted-foreground tw:data-[size=default]:h-8 tw:data-[size=sm]:h-7 tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:*:data-[slot=select-value]:line-clamp-1 tw:*:data-[slot=select-value]:flex tw:*:data-[slot=select-value]:flex-1 tw:*:data-[slot=select-value]:items-center tw:*:data-[slot=select-value]:gap-1.5 tw:*:data-[slot=select-value]:text-start tw:dark:bg-input/30 tw:dark:hover:bg-input/50 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",t),dir:n,...o,children:[a,r.jsx(k.Select.Icon,{asChild:!0,children:r.jsx(ht.IconSelector,{className:"tw:pointer-events-none tw:size-4 tw:text-muted-foreground"})})]})}function Be({className:t,children:e,position:a="popper",align:o="center",...n}){const i=ft();return r.jsx(k.Select.Portal,{children:r.jsxs(k.Select.Content,{"data-slot":"select-content","data-align-trigger":a==="item-aligned",className:h("pr-twp tw:relative tw:z-50 tw:max-h-(--radix-select-content-available-height) tw:data-[align-trigger=true]:min-w-(--radix-select-trigger-width) tw:data-[align-trigger=false]:min-w-36 tw:origin-(--radix-select-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[align-trigger=true]:animate-none tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",a==="popper"&&"tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:rtl:data-[side=left]:translate-x-1 tw:data-[side=right]:translate-x-1 tw:rtl:data-[side=right]:-translate-x-1 tw:data-[side=top]:-translate-y-1",t),position:a,align:o,...n,children:[r.jsx(Sn,{}),r.jsx(k.Select.Viewport,{"data-position":a,className:h("tw:data-[position=popper]:h-(--radix-select-trigger-height) tw:data-[position=popper]:w-full tw:data-[position=popper]:min-w-(--radix-select-trigger-width)",a==="popper"&&"tw:"),children:r.jsx("div",{dir:i,children:e})}),r.jsx(En,{})]})})}function zc({className:t,...e}){return r.jsx(k.Select.Label,{"data-slot":"select-label",className:h("pr-twp tw:px-1.5 tw:py-1 tw:text-xs tw:text-muted-foreground",t),...e})}function Jt({className:t,children:e,...a}){return r.jsxs(k.Select.Item,{"data-slot":"select-item",className:h("pr-twp tw:relative tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:*:[span]:last:flex tw:*:[span]:last:items-center tw:*:[span]:last:gap-2",t),...a,children:[r.jsx("span",{className:"tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:size-4 tw:items-center tw:justify-center",children:r.jsx(k.Select.ItemIndicator,{children:r.jsx(ht.IconCheck,{className:"tw:pointer-events-none"})})}),r.jsx(k.Select.ItemText,{children:e})]})}function Dc({className:t,...e}){return r.jsx(k.Select.Separator,{"data-slot":"select-separator",className:h("pr-twp tw:pointer-events-none tw:-mx-1 tw:my-1 tw:h-px tw:bg-border",t),...e})}function Sn({className:t,...e}){return r.jsx(k.Select.ScrollUpButton,{"data-slot":"select-scroll-up-button",className:h("pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",t),...e,children:r.jsx(ht.IconChevronUp,{})})}function En({className:t,...e}){return r.jsx(k.Select.ScrollDownButton,{"data-slot":"select-scroll-down-button",className:h("pr-twp tw:z-10 tw:flex tw:cursor-default tw:items-center tw:justify-center tw:bg-popover tw:py-1 tw:[&_svg:not([class*=size-])]:size-4",t),...e,children:r.jsx(ht.IconChevronDown,{})})}function Ic({table:t}){return r.jsx("div",{className:"tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3",children:r.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8",children:[r.jsxs("div",{className:"tw:flex-1 tw:text-sm tw:text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),r.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[r.jsx("p",{className:"tw:text-nowrap tw:text-sm tw:font-medium",children:"Rows per page"}),r.jsxs(Ae,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[r.jsx(Le,{className:"tw:h-8 tw:w-[70px]",children:r.jsx(Pe,{placeholder:t.getState().pagination.pageSize})}),r.jsx(Be,{side:"top",children:[10,20,30,40,50].map(e=>r.jsx(Jt,{value:`${e}`,children:e},e))})]})]}),r.jsxs("div",{className:"tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),r.jsxs("div",{className:"tw:flex tw:items-center tw:space-x-2",children:[r.jsxs(F,{variant:"outline",size:"icon",className:"tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[r.jsx("span",{className:"tw:sr-only",children:"Go to first page"}),r.jsx($.ArrowLeftIcon,{className:"tw:h-4 tw:w-4"})]}),r.jsxs(F,{variant:"outline",size:"icon",className:"tw:h-8 tw:w-8 tw:p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[r.jsx("span",{className:"tw:sr-only",children:"Go to previous page"}),r.jsx($.ChevronLeftIcon,{className:"tw:h-4 tw:w-4"})]}),r.jsxs(F,{variant:"outline",size:"icon",className:"tw:h-8 tw:w-8 tw:p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[r.jsx("span",{className:"tw:sr-only",children:"Go to next page"}),r.jsx($.ChevronRightIcon,{className:"tw:h-4 tw:w-4"})]}),r.jsxs(F,{variant:"outline",size:"icon",className:"tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[r.jsx("span",{className:"tw:sr-only",children:"Go to last page"}),r.jsx($.ArrowRightIcon,{className:"tw:h-4 tw:w-4"})]})]})]})})}const fo=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;function Hc(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Cn(t,e){const r=e?`${Go}, ${e}`:Go;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Hc(o))}const En=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),i.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{Cn(l,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),Cn(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});En.displayName="Table";const Rn=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Rn.displayName="TableHeader";const Tn=i.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));Tn.displayName="TableBody";const sa=i.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));sa.displayName="TableFooter";function Uc(t){i.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Cn(t.current):[],a=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?a+1:a-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Yc(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Xc(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const xe=i.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const l=i.useRef(null);i.useEffect(()=>{typeof a=="function"?a(l.current):a&&"current"in a&&(a.current=l.current)},[a]),Uc(l);const c=i.useMemo(()=>l.current?Cn(l.current):[],[l]),w=i.useCallback(u=>{const{current:m}=l;if(!m||!m.parentElement)return;const h=m.closest("table"),p=h?Cn(h).filter(v=>v.tagName==="TR"):[],g=p.indexOf(m),y=c.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Xc(p,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Yc(c,y,u.key);else if(u.key==="Escape"){u.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(u)},[l,c,e]),d=i.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:w,onFocus:d,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});xe.displayName="TableRow";const on=i.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));on.displayName="TableHead";const Me=i.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Me.displayName="TableCell";const aa=i.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));aa.displayName="TableCaption";function Qn({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function ia({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:l=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var D;const[u,m]=i.useState([]),[h,p]=i.useState([]),[g,y]=i.useState({}),[v,j]=i.useState({}),R=i.useMemo(()=>e??[],[e]),S=Gt.useReactTable({data:R,columns:t,getCoreRowModel:Gt.getCoreRowModel(),...r&&{getPaginationRowModel:Gt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:Gt.getSortedRowModel(),onColumnFiltersChange:p,getFilteredRowModel:Gt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:j,state:{sorting:u,columnFilters:h,columnVisibility:g,rowSelection:v}}),C=S.getVisibleFlatColumns();let N;return w?N=Array.from({length:10}).map((b,M)=>`skeleton-row-${M}`).map(b=>n.jsx(xe,{className:"hover:tw-bg-transparent",children:n.jsx(Me,{colSpan:C.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(Qn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},b)):((D=S.getRowModel().rows)==null?void 0:D.length)>0?N=S.getRowModel().rows.map(T=>n.jsx(xe,{onClick:()=>l(T,S),"data-state":T.getIsSelected()&&"selected",children:T.getVisibleCells().map(E=>n.jsx(Me,{children:Gt.flexRender(E.column.columnDef.cell,E.getContext())},E.id))},T.id)):N=n.jsx(xe,{children:n.jsx(Me,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(qc,{table:S}),n.jsxs(En,{stickyHeader:a,children:[n.jsx(Rn,{stickyHeader:a,children:S.getHeaderGroups().map(T=>n.jsx(xe,{children:T.headers.map(E=>n.jsx(on,{className:"tw-p-0",children:E.isPlaceholder?void 0:Gt.flexRender(E.column.columnDef.header,E.getContext())},E.id))},T.id))}),n.jsx(Tn,{children:N})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(G,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"}),n.jsx(G,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Kc,{table:S})]})}function Wc(t){const e=new Map;return t.forEach(r=>{const o=e.get(r.projectId),s={scrollGroupId:r.scrollGroupId,scrollGroupScrRefLabel:r.scrollGroupScrRefLabel};o?o.some(a=>a.scrollGroupId===r.scrollGroupId)||o.push(s):e.set(r.projectId,[s])}),e.forEach(r=>r.sort((o,s)=>o.scrollGroupId-s.scrollGroupId)),e}function zo(t,e,r){return t.some(o=>o.projectId===e&&o.scrollGroupId===r)}function jr(t){const e=Wc(t.openTabs);if(t.mode==="project"){const s=t.selection.projectId;return t.projects.map(a=>{const l=e.get(a.id)??[];return{rowKey:a.id,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:l.map(c=>c.scrollGroupId),isSelected:s===a.id,isMuted:l.length===0,isBoundButClosed:!1,isDisabled:a.isDisabled===!0,disabledReason:a.disabledReason}})}let r=[];t.mode==="project-multi"?r=t.selection.pairs:t.selection.projectId!==void 0&&(r=[{projectId:t.selection.projectId,scrollGroupId:t.selection.scrollGroupId}]);const o=[];return t.projects.forEach(s=>{const a=e.get(s.id);if(!a||a.length===0){o.push({rowKey:`project:${s.id}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:void 0,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:zo(r,s.id,void 0),isMuted:!0,isBoundButClosed:!1,isDisabled:s.isDisabled===!0,disabledReason:s.disabledReason});return}a.forEach(l=>{o.push({rowKey:`tab:${s.id}:${l.scrollGroupId}`,projectId:s.id,shortName:s.shortName,fullName:s.fullName,language:s.language,languageCode:s.languageCode,scrollGroupId:l.scrollGroupId,scrollGroupScrRefLabel:l.scrollGroupScrRefLabel,openGroups:[],isSelected:zo(r,s.id,l.scrollGroupId),isMuted:!1,isBoundButClosed:!1,isDisabled:s.isDisabled===!0,disabledReason:s.disabledReason})})}),r.forEach(s=>{if(s.scrollGroupId===void 0||o.some(l=>l.projectId===s.projectId&&l.scrollGroupId===s.scrollGroupId))return;const a=t.projects.find(l=>l.id===s.projectId);a&&o.push({rowKey:`closed:${a.id}:${s.scrollGroupId}`,projectId:a.id,shortName:a.shortName,fullName:a.fullName,language:a.language,languageCode:a.languageCode,scrollGroupId:s.scrollGroupId,scrollGroupScrRefLabel:void 0,openGroups:[],isSelected:!0,isMuted:!1,isBoundButClosed:!0,isDisabled:a.isDisabled===!0,disabledReason:a.disabledReason})}),o}function qo(t){return t.isBoundButClosed?!1:t.scrollGroupId!==void 0?!0:t.openGroups.length>0}function Nr(t,e){if(t.isSelected!==e.isSelected)return t.isSelected?-1:1;const r=t.shortName.localeCompare(e.shortName,void 0,{sensitivity:"base"});if(r!==0)return r;const o=t.scrollGroupId??Number.POSITIVE_INFINITY,s=e.scrollGroupId??Number.POSITIVE_INFINITY;return o-s}function Zc(t,e){if(!e)return[{kind:"flat",rows:[...t].sort(Nr)}];const r=t.filter(qo).sort(Nr),o=t.filter(a=>!qo(a)).sort(Nr);if(r.length===0)return[{kind:"flat",rows:o}];const s=[{kind:"openTabs",rows:r}];return o.length>0&&s.push({kind:"other",rows:o}),s}const Jc={searchPlaceholder:"Search projects & resources",filterAriaLabel:"Filter",groupSectionLabel:"Group",filterSectionLabel:"Filter",filterGroupByOpenTabs:"By open tabs",filterShowSelectedOnly:"Show selected only",openTabsSectionHeading:"Opened project & resource tabs",otherProjectsSectionHeading:"Your projects & resources",boundButClosedTooltip:"Bound to {group} · not currently open",openButtonLabel:"Open",selectAll:"Select all",clearAll:"Clear all"};function Qc(t){return{...Jc,...t}}function Sn(t){return I.DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[I.getLocalizeKeyForScrollGroupId(t)]??String(t)}const td={backgroundImage:"linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"};function ed({scrollGroupId:t,isBoundButClosed:e}){const r=Sn(t);return e?n.jsx(ae,{variant:"outline",className:"tw-relative tw-text-muted-foreground",style:td,children:r}):n.jsx(ae,{variant:"secondary",children:r})}function nd({row:t,mode:e,strings:r,onClick:o,onOpen:s}){const[a,l]=i.useState(!1),c=i.useRef(null),w=!!(t.language||t.languageCode),d=w||!!t.scrollGroupScrRefLabel||t.isBoundButClosed||t.isDisabled&&!!t.disabledReason,u=i.useCallback(()=>{if(d){l(!0);return}const v=c.current;v&&v.scrollWidth>v.clientWidth&&l(!0)},[d]),m=n.jsx(_.Check,{className:f("tw-h-4 tw-w-4",t.isSelected?"tw-opacity-100":"tw-opacity-0")});let h;e==="project"?t.openGroups.length>0&&(h=n.jsx("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-gap-1",children:t.openGroups.map(v=>n.jsx(ae,{variant:"secondary",children:Sn(v)},v))})):t.scrollGroupId!==void 0&&(h=n.jsxs("span",{className:"tw-ms-auto tw-flex tw-shrink-0 tw-items-center tw-gap-2",children:[n.jsx(ed,{scrollGroupId:t.scrollGroupId,isBoundButClosed:t.isBoundButClosed}),t.isBoundButClosed&&s&&n.jsxs(G,{size:"sm",variant:"ghost",className:"tw-h-6 tw-gap-1 tw-px-2 tw-text-xs",onClick:v=>{v.stopPropagation(),s(t)},onMouseDown:v=>v.stopPropagation(),"aria-label":r.openButtonLabel,title:r.openButtonLabel,children:[n.jsx(_.ArrowRight,{className:"tw-h-3 tw-w-3"}),r.openButtonLabel]})]}));const p=n.jsxs(ne,{value:`${t.rowKey} ${t.shortName} ${t.fullName} ${t.language??""} ${t.languageCode??""}`,onSelect:()=>{t.isDisabled||o(t)},disabled:t.isDisabled,onPointerEnter:u,onPointerLeave:()=>l(!1),className:"tw-flex tw-items-center tw-gap-2 tw-pe-4","data-selected":t.isSelected,children:[n.jsx("span",{className:"tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center",children:m}),n.jsxs("span",{ref:c,className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:[n.jsx("span",{children:t.shortName}),n.jsxs("span",{className:"tw-text-muted-foreground",children:[" • ",t.fullName]})]}),h]}),g=t.scrollGroupId!==void 0?Sn(t.scrollGroupId):void 0,y=t.isBoundButClosed&&g?r.boundButClosedTooltip.replace("{group}",g):void 0;return n.jsxs(It,{open:a,delayDuration:400,children:[n.jsx(Mt,{asChild:!0,children:p}),n.jsxs(St,{side:"top",align:"center",sideOffset:8,collisionPadding:16,className:"tw-max-w-xs tw-text-center",style:{zIndex:ar},children:[n.jsx("div",{className:"tw-font-semibold",children:t.fullName}),w&&n.jsxs("div",{className:"tw-text-sm",children:[t.language,t.languageCode&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",t.languageCode,")"]})]}),!t.isBoundButClosed&&t.scrollGroupScrRefLabel&&g&&n.jsxs("div",{className:"tw-text-sm",children:[t.scrollGroupScrRefLabel,n.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",g,")"]})]}),y&&n.jsx("div",{className:"tw-text-sm tw-italic",children:y}),t.isDisabled&&t.disabledReason&&n.jsx("div",{className:"tw-text-sm tw-italic tw-text-muted-foreground",children:t.disabledReason})]})]})}function rd({groupByOpenTabs:t,onChangeGroupByOpenTabs:e,showSelectedOnly:r,onChangeShowSelectedOnly:o,strings:s}){const a=!!r;return n.jsxs(ie,{children:[n.jsx(ve,{asChild:!0,children:n.jsx(G,{variant:"ghost",size:"sm",className:f("tw-h-8 tw-w-8 tw-shrink-0 tw-p-0",a&&"tw-bg-accent tw-text-accent-foreground hover:tw-bg-accent/80 data-[state=open]:tw-bg-accent"),"aria-label":s.filterAriaLabel,"aria-pressed":a,title:s.filterAriaLabel,onMouseDown:l=>l.preventDefault(),children:n.jsx(_.Filter,{className:"tw-h-4 tw-w-4"})})}),n.jsxs(ee,{align:"end",className:"tw-w-56",style:{zIndex:ar},children:[n.jsx(Ce,{children:s.groupSectionLabel}),n.jsx(Qt,{checked:t,onCheckedChange:e,onSelect:l=>l.preventDefault(),children:s.filterGroupByOpenTabs}),o&&n.jsxs(n.Fragment,{children:[n.jsx(ye,{}),n.jsx(Ce,{children:s.filterSectionLabel}),n.jsx(Qt,{checked:!!r,onCheckedChange:o,onSelect:l=>l.preventDefault(),children:s.filterShowSelectedOnly})]})]})]})}function la(t){const[e,r]=i.useState(!1),[o,s]=i.useState(""),[a,l]=i.useState(t.defaultGroupByOpenTabs??!0),[c,w]=i.useState(!1),d=Qc(t.localizedStrings),u=i.useMemo(()=>t.mode==="project"?jr({mode:"project",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):t.mode==="project-multi"?jr({mode:"project-multi",projects:t.projects,openTabs:t.openTabs,selection:t.selection}):jr({mode:"projectScrollGroup",projects:t.projects,openTabs:t.openTabs,selection:t.selection}),[t.mode,t.projects,t.openTabs,t.selection]),m=i.useMemo(()=>{const N=o.trim().toLowerCase();let D=u;return N&&(D=D.filter(T=>T.shortName.toLowerCase().includes(N)||T.fullName.toLowerCase().includes(N)||(T.language??"").toLowerCase().includes(N)||(T.languageCode??"").toLowerCase().includes(N))),t.mode==="project-multi"&&c&&(D=D.filter(T=>T.isSelected)),D},[u,o,t.mode,c]),h=i.useMemo(()=>Zc(m,a),[m,a]),p=i.useMemo(()=>{if(t.mode!=="project-multi")return[];const N=[];return t.projects.forEach(D=>{const T=t.openTabs.filter(b=>b.projectId===D.id);if(T.length===0){N.push({projectId:D.id});return}const E=new Set;T.forEach(b=>{E.has(b.scrollGroupId)||(E.add(b.scrollGroupId),N.push({projectId:D.id,scrollGroupId:b.scrollGroupId}))})}),N},[t.mode,t.projects,t.openTabs]),g=N=>{if(N.scrollGroupId!==void 0){if(t.mode==="projectScrollGroup"){t.onOpenProjectInGroup(N.projectId,N.scrollGroupId);return}t.mode==="project-multi"&&t.onOpenProjectInGroup&&t.onOpenProjectInGroup(N.projectId,N.scrollGroupId)}},y=N=>{switch(t.mode){case"project":{t.onChangeSelection({projectId:N.projectId}),r(!1);return}case"project-multi":{const D=t.selection.pairs,T=b=>b.projectId===N.projectId&&b.scrollGroupId===N.scrollGroupId,E=D.some(T)?D.filter(b=>!T(b)):[...D,{projectId:N.projectId,scrollGroupId:N.scrollGroupId}];t.onChangeSelection({pairs:E}),E.length===0&&c&&w(!1);return}case"projectScrollGroup":{if(N.isBoundButClosed&&N.scrollGroupId!==void 0){t.onOpenProjectInGroup(N.projectId,N.scrollGroupId),r(!1);return}if(N.scrollGroupId!==void 0){t.onChangeSelection({projectId:N.projectId,scrollGroupId:N.scrollGroupId}),r(!1);return}const D=t.selection.scrollGroupId??0;t.onChangeSelection({projectId:N.projectId,scrollGroupId:D}),t.onOpenProjectInGroup(N.projectId,D),r(!1)}}},v=()=>{if(t.mode!=="project-multi")return;const N=t.selection.pairs,D=new Set(N.map(E=>`${E.projectId}:${E.scrollGroupId??""}`)),T=[...N];p.forEach(E=>{const b=`${E.projectId}:${E.scrollGroupId??""}`;D.has(b)||(D.add(b),T.push(E))}),t.onChangeSelection({pairs:T})},j=()=>{t.mode==="project-multi"&&(t.onChangeSelection({pairs:[]}),c&&w(!1))},R=i.useMemo(()=>{switch(t.mode){case"project":{const N=t.projects.find(T=>T.id===t.selection.projectId),D=N?N.shortName:t.buttonPlaceholder??"";return{node:D,title:D}}case"project-multi":{const{pairs:N}=t.selection;if(N.length===0){const b=t.buttonPlaceholder??"";return{node:b,title:b}}const D=[];if(N.forEach(b=>{const M=t.projects.find($=>$.id===b.projectId);M&&D.push({project:M,scrollGroupId:b.scrollGroupId})}),D.length===0){const b=t.buttonPlaceholder??"";return{node:b,title:b}}if(t.getSelectedText){const b=t.getSelectedText(D);return{node:b,title:b}}const T=D.map(({project:b,scrollGroupId:M})=>M===void 0?b.shortName:`${b.shortName} (${Sn(M)})`).join(", ");if(D.length===1)return{node:T,title:T};const E=D.length.toString();return{node:n.jsxs(n.Fragment,{children:[n.jsx(ae,{variant:"muted",className:"tw-shrink-0",children:E}),n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:T})]}),title:`${E} ${T}`}}case"projectScrollGroup":{const N=t.projects.find(E=>E.id===t.selection.projectId);if(!N){const E=t.buttonPlaceholder??"";return{node:E,title:E}}const D=t.selection.scrollGroupId;if(D===void 0)return{node:N.shortName,title:N.shortName};const T=`${N.shortName} · ${Sn(D)}`;return{node:T,title:T}}default:return{node:"",title:""}}},[t]),S=t.mode==="project-multi"?n.jsx(_.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}):n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),C=t.mode==="projectScrollGroup"||t.mode==="project-multi"&&t.onOpenProjectInGroup?g:void 0;return n.jsxs(we,{open:e,onOpenChange:r,children:[n.jsx(je,{asChild:!0,children:n.jsxs(G,{variant:t.buttonVariant??"outline",role:"combobox","aria-expanded":e,"aria-label":t.ariaLabel,disabled:t.isDisabled??!1,className:f("tw-flex tw-w-[180px] tw-items-center tw-justify-between tw-overflow-hidden",t.buttonClassName),children:[n.jsx("span",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-baseline tw-gap-2 tw-overflow-hidden tw-whitespace-nowrap tw-text-start",children:typeof R.node=="string"?n.jsx("span",{className:"tw-min-w-0 tw-truncate",children:R.node}):R.node}),S]})}),n.jsx(re,{align:t.alignDropDown??"start",collisionPadding:16,className:f("tw-w-80 tw-max-w-[calc(100vw-2rem)] tw-p-0",t.popoverContentClassName),style:t.popoverContentStyle,children:n.jsx(Ct,{delayDuration:400,children:n.jsxs(ce,{shouldFilter:!1,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-pe-2",children:[n.jsx("div",{className:"tw-flex-1",children:n.jsx($e,{value:o,onValueChange:s,placeholder:d.searchPlaceholder,className:"tw-border-0"})}),n.jsx(rd,{groupByOpenTabs:a,onChangeGroupByOpenTabs:l,showSelectedOnly:t.mode==="project-multi"?c:void 0,onChangeShowSelectedOnly:t.mode==="project-multi"?w:void 0,strings:d})]}),t.mode==="project-multi"&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-py-2 tw-pe-4 tw-ps-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:v,children:`${d.selectAll} (${p.length.toString()})`}),n.jsx(G,{variant:"ghost",size:"sm",onClick:j,children:`${d.clearAll} (${t.selection.pairs.length.toString()})`})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:t.commandEmptyMessage??"No projects found"}),h.map((N,D)=>n.jsxs(i.Fragment,{children:[n.jsx(te,{heading:od(N,d),children:N.rows.map(T=>n.jsx(nd,{row:T,mode:t.mode,strings:d,onClick:y,onOpen:C},T.rowKey))}),D<h.length-1&&n.jsx(ir,{})]},N.kind))]})]})})})]})}function od(t,e){switch(t.kind){case"openTabs":return e.openTabsSectionHeading;case"other":return e.otherProjectsSectionHeading;case"flat":default:return}}function sd({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Ki,{options:a,children:e})})}const ca=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Ko=(t,e)=>t[e]??e;function da({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Ko(r,"%webView_error_dump_header%"),a=Ko(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(G,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const ad=Object.freeze([...ca,"%webView_error_dump_copied_message%"]);function id({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[l,c]=i.useState(!1),w=()=>{c(!0),e&&e()},d=u=>{u||c(!1)};return n.jsxs(we,{onOpenChange:d,children:[n.jsx(je,{asChild:!0,children:o}),n.jsxs(re,{id:a,className:f("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(xt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(da,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var wa=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(wa||{});function ld({id:t,label:e,groups:r}){const[o,s]=i.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[a,l]=i.useState({}),c=(d,u)=>{const m=!o[d][u];s(p=>(p[d][u]=m,{...p}));const h=r[d].items[u];h.onUpdate(h.id,m)},w=(d,u)=>{l(h=>(h[d]=u,{...h}));const m=r[d].items.find(h=>h.id===u);m?m.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ie,{children:[n.jsx(ve,{asChild:!0,children:n.jsxs(G,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(ee,{children:r.map((d,u)=>n.jsxs("div",{children:[n.jsx(Ce,{children:d.label}),n.jsx(to,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,h)=>n.jsx("div",{children:n.jsx(Qt,{checked:o[u][h],onCheckedChange:()=>c(u,h),children:m.label})},m.id))}):n.jsx(Qs,{value:a[u],onValueChange:m=>w(u,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(ro,{value:m.id,children:m.label})},m.id))})}),n.jsx(ye,{})]},d.label))})]})})}function cd({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:l,handleSupportLinkClick:c}){const w=new I.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,m)=>u+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function dd({id:t,versionHistory:e}){const[r,o]=i.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),h=d.getUTCDate()-1;let p="";return u>0?p=`${u.toString()} year${u===1?"":"s"} ago`:m>0?p=`${m.toString()} month${m===1?"":"s"} ago`:h===0?p="today":p=`${h.toString()} day${h===1?"":"s"} ago`,p}const l=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function wd({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const l=i.useMemo(()=>I.formatBytes(r),[r]),w=(d=>{const u=new Intl.DisplayNames(I.getCurrentLocale(),{type:"language"});return d.map(m=>u.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(dd,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function ua({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:u=void 0,isDisabled:m=!1,sortSelected:h=!1,icon:p=void 0,className:g=void 0,variant:y="ghost",id:v}){const[j,R]=i.useState(!1),S=i.useCallback(M=>{var B;const $=(B=t.find(P=>P.label===M))==null?void 0:B.value;$&&r(e.includes($)?e.filter(P=>P!==$):[...e,$])},[t,e,r]),C=()=>w||o,N=i.useMemo(()=>{if(!h)return t;const M=t.filter(B=>B.starred).sort((B,P)=>B.label.localeCompare(P.label)),$=t.filter(B=>!B.starred).sort((B,P)=>{const L=e.includes(B.value),q=e.includes(P.value);return L&&!q?-1:!L&&q?1:B.label.localeCompare(P.label)});return[...M,...$]},[t,e,h]),D=()=>{r(t.map(M=>M.value))},T=()=>{r([])},E=d??j,b=u??R;return n.jsx("div",{id:v,className:g,children:n.jsxs(we,{open:E,onOpenChange:b,children:[n.jsx(je,{asChild:!0,children:n.jsxs(G,{variant:y,role:"combobox","aria-expanded":E,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[p&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:C()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(re,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(ce,{children:[n.jsx($e,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:D,children:a}),n.jsx(G,{variant:"ghost",size:"sm",onClick:T,children:l})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:c}),n.jsx(te,{children:N.map(M=>n.jsxs(ne,{value:M.label,onSelect:S,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:f("tw-h-4 tw-w-4",e.includes(M.value)?"tw-opacity-100":"tw-opacity-0")})}),M.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:M.label}),M.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:M.secondaryLabel})]},M.label))})]})]})})]})})}function ud({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:w,className:d,badgesPlaceholder:u,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(ua,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var p;return n.jsxs(ae,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(G,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(p=t.find(g=>g.value===h))==null?void 0:p.label]},h)})}):n.jsx(xt,{children:u})]})}const pa=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),Ho=(t,e)=>t[e]??e;function ma({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const w=i.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(G,{"aria-label":"Undo",className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(_.Undo,{})})}),n.jsx(St,{children:n.jsxs("p",{children:[Ho(s,"%undoButton_tooltip%"),a&&` (${w?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(G,{"aria-label":"Redo",className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(_.Redo,{})})}),n.jsx(St,{children:n.jsxs("p",{children:[Ho(s,"%redoButton_tooltip%"),a&&` (${w?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function fa({children:t,editorRef:e}){const r=i.useRef(null);return i.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,a=c=>{var d,u,m,h;if(!s||document.activeElement!==s)return;const w=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(d=e.current)==null||d.undo()):c.shiftKey&&w==="z"&&(c.preventDefault(),(u=e.current)==null||u.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&w==="z"?(c.preventDefault(),(m=e.current)==null||m.undo()):(w==="y"||c.shiftKey&&w==="z")&&(c.preventDefault(),(h=e.current)==null||h.redo())}};return document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a)},[e]),n.jsx("div",{ref:r,children:t})}const Xe=i.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Xe.displayName="Input";const pd=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function md({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),[w,d]=i.useState(t),[u,m]=i.useState(r),[h,p]=i.useState(!1);i.useEffect(()=>{d(t)},[t]),i.useEffect(()=>{u!==r&&m(r)},[r]);const g=v=>{c.current=!1,p(v),v||(w!=="custom"||u?(e(w),o(u)):(d(t),m(r)))},y=v=>{var j,R,S,C;v.stopPropagation(),document.activeElement===l.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((j=a.current)==null||j.focus(),c.current=!0):document.activeElement===a.current&&v.key==="ArrowUp"?((R=l.current)==null||R.focus(),c.current=!1):document.activeElement===a.current&&v.key==="ArrowLeft"&&((S=a.current)==null?void 0:S.selectionStart)===0&&((C=l.current)==null||C.focus(),c.current=!1),w==="custom"&&v.key==="Enter"&&(document.activeElement===l.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(ie,{open:h,onOpenChange:g,children:[n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:pd(t,s,r)})})}),n.jsx(St,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(ee,{style:{zIndex:Ar},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:y,onMouseMove:()=>{var v;c.current&&((v=a.current)==null||v.focus())},children:[n.jsx(Ce,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ye,{}),n.jsx(Qt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Jt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Qt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Jt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Qt,{ref:l,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:v=>{var j;v.stopPropagation(),c.current=!0,(j=a.current)==null||j.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Xe,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const fd=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),hd=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),I.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function gd({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ie,{children:[n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Wo.TooltipTrigger,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:fd(t,r)})})}),n.jsx(St,{children:n.jsx("p",{children:hd(t,r)})})]})}),n.jsxs(ee,{style:{zIndex:Ar},children:[n.jsx(Ce,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ye,{}),n.jsxs(Qt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Qt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const ha=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function xd({icon:t,className:e}){const r=t??_.Ban;return n.jsx(r,{className:e,size:16})}function Uo({item:t,localizedStrings:e}){return n.jsxs(ne,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(xd,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(ls,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function ga({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=i.useState(""),[a,l]=i.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(u=>{var m;return(m=u.marker)==null?void 0:m.toLowerCase().includes(c)}),d=e.filter(u=>u.title.toLowerCase().includes(c)&&!w.includes(u));return[w,d]},[o,e]);return n.jsxs(ce,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx($e,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(de,{children:[n.jsx(Ye,{children:t["%markerMenu_noResults%"]}),n.jsx(te,{children:a.map(c=>{var w;return n.jsx(Uo,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(ir,{alwaysRender:!0}),n.jsx(te,{children:l.map(c=>{var w;return n.jsx(Uo,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function bd(t,e,r,o){if(!o||o==="p")return[];const s=I.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,l])=>{a.push(...l.map(c=>({marker:c,title:r[I.usfmMarkers[c].description]??I.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),a.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function vd(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function yd(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const jd={type:"USJ",version:"3.1",content:[{type:"para"}]};function Nd({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const u=i.useRef(null),m=i.useRef(null),h=i.useRef(null),p=i.useRef(null);i.useLayoutEffect(()=>{if(!p.current)return;const{width:F}=p.current.getBoundingClientRect();F>0&&(p.current.style.width=`${F}px`)},[]);const[g,y]=i.useState("generated"),[v,j]=i.useState("*"),[R,S]=i.useState("f"),[C,N]=i.useState(!1),[D,T]=i.useState(!0),[E,b]=i.useState(!1),M=i.useRef(!1),$=i.useRef(""),[B,P]=i.useState(!1),[L,q]=i.useState(),[H,W]=i.useState(),[Nt,At]=i.useState(),[Ot,nt]=i.useState(),wt=i.useRef(null),z=i.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Jt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),J=i.useMemo(()=>bd(u,()=>P(!1),w,Ot),[w,Ot]);i.useEffect(()=>{var F;B||(F=u.current)==null||F.focus()},[R,B]),i.useEffect(()=>{var Z,ot;let F;M.current=!1,T(!0);const U=e==null?void 0:e.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){const mt=(Z=U.insert.note)==null?void 0:Z.caller;let ft="custom";mt===Jt.GENERATOR_NOTE_CALLER?ft="generated":mt===Jt.HIDDEN_NOTE_CALLER?ft="hidden":mt&&j(mt),y(ft),S(((ot=U.insert.note)==null?void 0:ot.style)??"f"),F=setTimeout(()=>{var kt;(kt=u.current)==null||kt.applyUpdate([U])},0)}return()=>{F&&clearTimeout(F)}},[e,a]);const rt=i.useCallback((F,U,Z=!1)=>{var mt,ft,kt;const ot=(ft=(mt=u.current)==null?void 0:mt.getNoteOps(0))==null?void 0:ft.at(0);if(ot&&Jt.isInsertEmbedOpOfType("note",ot)){if(ot.insert.note){let ut;F==="custom"?ut=U:F==="generated"?ut=Jt.GENERATOR_NOTE_CALLER:ut=Jt.HIDDEN_NOTE_CALLER,ot.insert.note.caller=ut}r==null||r([ot]),Z&&d&&a&&((kt=d.current)==null||kt.replaceEmbedUpdate(a,[ot]))}},[a,r,d]),Q=i.useCallback(()=>{rt(g,v,!0),o()},[g,v,o,rt]),et=i.useRef(Q);i.useLayoutEffect(()=>{et.current=Q});const $t=i.useRef({book:s.book,chapterNum:s.chapterNum});i.useLayoutEffect(()=>{($t.current.book!==s.book||$t.current.chapterNum!==s.chapterNum)&&($t.current={book:s.book,chapterNum:s.chapterNum},et.current())},[s.book,s.chapterNum]);const Et=()=>{var U;const F=(U=m.current)==null?void 0:U.getElementsByClassName("editor-input")[0];F!=null&&F.textContent&&navigator.clipboard.writeText(F.textContent)},Lt=i.useCallback(F=>{y(F),rt(F,v)},[v,rt]),pe=i.useCallback(F=>{j(F),rt(g,F)},[g,rt]),A=F=>{var Z,ot,mt,ft,kt;S(F);const U=(ot=(Z=u.current)==null?void 0:Z.getNoteOps(0))==null?void 0:ot.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){U.insert.note&&(U.insert.note.style=F);const ut=(ft=(mt=U.insert.note)==null?void 0:mt.contents)==null?void 0:ft.ops;R!=="x"&&F==="x"?ut==null||ut.forEach(vt=>vd(vt)):R==="x"&&F!=="x"&&(ut==null||ut.forEach(vt=>yd(vt))),(kt=u.current)==null||kt.applyUpdate([U,{delete:1}])}},Ht=F=>{nt(F.contextMarker),b(F.canRedo)},me=i.useCallback(F=>{var Z,ot,mt,ft,kt;const U=(ot=(Z=u.current)==null?void 0:Z.getNoteOps(0))==null?void 0:ot.at(0);if(U&&Jt.isInsertEmbedOpOfType("note",U)){F.content.length>1&&setTimeout(()=>{var Pt;(Pt=u.current)==null||Pt.applyUpdate([{retain:2},{delete:1}])},0);const ut=(mt=U.insert.note)==null?void 0:mt.style,vt=(kt=(ft=U.insert.note)==null?void 0:ft.contents)==null?void 0:kt.ops;if(ut||N(!1),N(ut==="x"?!!(vt!=null&&vt.every(Pt=>{var ht,it;if(!((ht=Pt.attributes)!=null&&ht.char))return!0;const O=((it=Pt.attributes)==null?void 0:it.char).style;return O==="xt"||O==="xo"||O==="xq"})):!!(vt!=null&&vt.every(Pt=>{var ht,it;if(!((ht=Pt.attributes)!=null&&ht.char))return!0;const O=((it=Pt.attributes)==null?void 0:it.char).style;return O==="ft"||O==="fr"||O==="fq"}))),!M.current){M.current=!0,$.current=JSON.stringify(U),T(!0);return}T(JSON.stringify(U)===$.current),rt(g,v)}else N(!1),T(!0)},[g,v,rt]),Rt=i.useCallback(()=>{const F=window.getSelection();if(h.current&&J.length&&F&&F.rangeCount>0){const U=F.getRangeAt(0).getBoundingClientRect(),Z=h.current.getBoundingClientRect();q(U.left-Z.left),W(U.top-Z.top),At(U.height),P(!0)}},[J,h]);return i.useEffect(()=>{const F=()=>{B&&P(!1)};return window.addEventListener("click",F),()=>{window.removeEventListener("click",F)}},[B]),i.useEffect(()=>{var F;B&&((F=wt.current)==null||F.focus())},[B]),i.useEffect(()=>{var Z;const F=((Z=m.current)==null?void 0:Z.querySelector(".editor-input"))??void 0,U=ot=>{!B&&F&&document.activeElement===F&&ot.key===c?(ot.preventDefault(),Rt()):B&&ot.key==="Escape"&&(ot.preventDefault(),P(!1))};return document.addEventListener("keydown",U),()=>{document.removeEventListener("keydown",U)}},[B,Rt,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:p,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(gd,{isTypeSwitchable:C,noteType:R,handleNoteTypeChange:A,localizedStrings:w}),n.jsx(md,{callerType:g,updateCallerType:Lt,customCaller:v,updateCustomCaller:pe,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ma,{onUndoClick:()=>{var F;return(F=u.current)==null?void 0:F.undo()},onRedoClick:()=>{var F;return(F=u.current)==null?void 0:F.redo()},canUndo:!D,canRedo:E,localizedStrings:w}),n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(G,{onClick:Q,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.Check,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(G,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(fa,{editorRef:u,children:n.jsx(Jt.Editorial,{options:z,onStateChange:Ht,onUsjChange:me,defaultUsj:jd,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsx(G,{onClick:Et,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(St,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:h,style:{top:0,left:0,height:0,width:0}}),n.jsxs(we,{open:B,children:[n.jsx(us,{className:"tw-absolute",style:{top:H,left:L,height:Nt,width:0,pointerEvents:"none"}}),n.jsx(re,{className:"tw-w-[500px] tw-p-0",onClick:F=>{F.preventDefault(),F.stopPropagation()},children:n.jsx(ga,{markerMenuItems:J,localizedStrings:w,searchRef:wt})})]})]})}const kd=Object.freeze([...ha,...Object.entries(I.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...pa]);function xa(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function _d(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&a.push(l),l=[c]):l.push(c)}),l.length>0&&a.push(l),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[ao(t,c,r,!0,s),d&&o]},xa(t,c))})}function ao(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const l=`${t}-text-${a.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:a},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Cd(a,xa(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function Cd(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),ao(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function ba({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=l&&n.jsxs(n.Fragment,{children:[ao(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",p=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",y=f(h,p);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:[w,u]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",y),children:m}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,y),children:c&&c.length>0&&n.jsx(n.Fragment,{children:_d(t.marker,c,o,d)})})]})}function Sd({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const u=w??I.getFormatCallerFunction(r,void 0),m=(R,S)=>{d==null||d(R,S,s)},h=a?r.findIndex(R=>R===a):-1,[p,g]=i.useState(h),y=(R,S,C)=>{if(r.length)switch(R.key){case"Enter":case" ":R.preventDefault(),d==null||d(S,C,s);break}},v=R=>{if(r.length)switch(R.key){case"ArrowDown":R.preventDefault(),g(S=>Math.min(S+1,r.length-1));break;case"ArrowUp":R.preventDefault(),g(S=>Math.max(S-1,0));break}},j=i.useRef([]);return i.useEffect(()=>{var R;p>=0&&p<j.current.length&&((R=j.current[p])==null||R.focus())},[p]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:p<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((R,S)=>{const C=R===a,N=`${s}-${S}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:D=>{j.current[S]=D},role:"option","aria-selected":C,"data-marker":R.marker,"data-state":C?"selected":void 0,tabIndex:S===p?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(R,S),onKeyDown:D=>y(D,R,S),children:n.jsx(ba,{footnote:R,layout:o,formatCaller:()=>u(R.caller,S),showMarkers:l})},N),S<r.length-1&&o==="vertical"&&n.jsx(Ke,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Ed(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Rd({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const u=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(u)||(w.add(u),c.push(d))}),c},[t]);return n.jsxs(En,{stickyHeader:!0,children:[n.jsx(Rn,{stickyHeader:!0,children:n.jsxs(xe,{children:[n.jsx(on,{children:s}),n.jsx(on,{children:a})]})}),n.jsx(Tn,{children:l.length>0&&l.map(c=>n.jsxs(xe,{onClick:()=>{e(c.reference)},children:[n.jsx(Me,{children:I.formatScrRef(c.reference,"English")}),n.jsx(Me,{className:o,children:Ed(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const wr=i.forwardRef(({className:t,...e},r)=>n.jsx(Er.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Er.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}));wr.displayName=Er.Root.displayName;const Td=t=>{if(t==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Dn=(t,e,r)=>n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsxs(Mt,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Td(t.getIsSorted())]}),n.jsx(St,{side:"bottom",children:e})]})}),Dd=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Dn(e,t)}),Id=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Dn(r,t)}),Md=t=>({accessorKey:"count",header:({column:e})=>Dn(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),kr=(t,e,r,o,s,a)=>{let l=[...r];t.forEach(w=>{e==="approved"?l.includes(w)||l.push(w):l=l.filter(d=>d!==w)}),o(l);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},Od=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>Dn(a,t,"tw-justify-center"),cell:({row:a})=>{const l=a.getValue("status"),c=a.getValue("item");return n.jsxs(dr,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(en,{onClick:w=>{w.stopPropagation(),kr([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),Pd=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ad=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},$d=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},va=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Ld=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Vd=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Bd=(t,e,r)=>t.map(o=>{const s=I.isString(o.key)?o.key:o.key[0];return{items:I.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||va(s,e,r),occurrences:o.occurrences||[]}}),fe=(t,e)=>t[e]??e;function Fd({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:l,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:u=!1,classNameForVerseText:m,onItemSelected:h}){const p=fe(r,"%webView_inventory_all%"),g=fe(r,"%webView_inventory_approved%"),y=fe(r,"%webView_inventory_unapproved%"),v=fe(r,"%webView_inventory_unknown%"),j=fe(r,"%webView_inventory_scope_currentBook%"),R=fe(r,"%webView_inventory_scope_chapter%"),S=fe(r,"%webView_inventory_scope_verse%"),C=fe(r,"%webView_inventory_filter_text%"),N=fe(r,"%webView_inventory_show_additional_items%"),D=fe(r,"%webView_inventory_no_results%"),[T,E]=i.useState(!1),[b,M]=i.useState("all"),[$,B]=i.useState(""),[P,L]=i.useState([]),q=i.useMemo(()=>{const z=t??[];return z.length===0?[]:Bd(z,s,a)},[t,s,a]),H=i.useMemo(()=>{if(T)return q;const z=[];return q.forEach(J=>{const rt=J.items[0],Q=z.find(et=>et.items[0]===rt);Q?(Q.count+=J.count,Q.occurrences=Q.occurrences.concat(J.occurrences)):z.push({items:[rt],count:J.count,occurrences:J.occurrences,status:J.status})}),z},[T,q]),W=i.useMemo(()=>H.length===0?[]:Vd(H,b,$),[H,b,$]),Nt=i.useMemo(()=>{var rt,Q;if(!T)return w;const z=(rt=o==null?void 0:o.tableHeaders)==null?void 0:rt.length;if(!z)return w;const J=[];for(let et=0;et<z;et++)J.push(Id(((Q=o==null?void 0:o.tableHeaders)==null?void 0:Q[et])||"Additional Item",et+1));return[...J,...w]},[o==null?void 0:o.tableHeaders,w,T]);i.useEffect(()=>{W.length===0?L([]):W.length===1&&L(W[0].items)},[W]);const At=(z,J)=>{J.setRowSelection(()=>{const Q={};return Q[z.index]=!0,Q});const rt=z.original.items;L(rt),h&&rt.length>0&&h(rt[0])},Ot=z=>{if(z==="book"||z==="chapter"||z==="verse")c(z);else throw new Error(`Invalid scope value: ${z}`)},nt=z=>{if(z==="all"||z==="approved"||z==="unapproved"||z==="unknown")M(z);else throw new Error(`Invalid status filter value: ${z}`)},wt=i.useMemo(()=>{if(H.length===0||P.length===0)return[];const z=H.filter(J=>I.deepEqual(T?J.items:[J.items[0]],P));if(z.length>1)throw new Error("Selected item is not unique");return z.length===0?[]:z[0].occurrences},[P,T,H]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(He,{onValueChange:z=>nt(z),defaultValue:b,children:[n.jsx(Oe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ue,{placeholder:"Select filter"})}),n.jsxs(Pe,{children:[n.jsx(Xt,{value:"all",children:p}),n.jsx(Xt,{value:"approved",children:g}),n.jsx(Xt,{value:"unapproved",children:y}),n.jsx(Xt,{value:"unknown",children:v})]})]}),n.jsxs(He,{onValueChange:z=>Ot(z),defaultValue:l,children:[n.jsx(Oe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ue,{placeholder:"Select scope"})}),n.jsxs(Pe,{children:[n.jsx(Xt,{value:"book",children:j}),n.jsx(Xt,{value:"chapter",children:R}),n.jsx(Xt,{value:"verse",children:S})]})]}),n.jsx(Xe,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:C,value:$,onChange:z=>{B(z.target.value)}}),o&&n.jsx(Ct,{children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(wr,{className:"tw-m-1 tw-flex-shrink-0",checked:T,onCheckedChange:z=>{E(z)}}),n.jsx(xt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??N})]})}),n.jsx(St,{children:(o==null?void 0:o.checkboxText)??N})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(ia,{columns:Nt,data:W,onRowClickHandler:At,stickyHeader:!0,isLoading:u,noResultsMessage:D})}),wt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Rd,{classNameForText:m,occurrenceData:wt,setScriptureReference:e,localizedStrings:r})})]})})}const Gd="16rem",zd="3rem",ya=i.createContext(void 0);function In(){const t=i.useContext(ya);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const io=i.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:l="primary",...c},w)=>{const[d,u]=i.useState(t),m=e??d,h=i.useCallback(S=>{const C=typeof S=="function"?S(m):S;r?r(C):u(C)},[r,m]),p=i.useCallback(()=>h(S=>!S),[h]),g=m?"expanded":"collapsed",j=bt()==="ltr"?l:l==="primary"?"secondary":"primary",R=i.useMemo(()=>({state:g,open:m,setOpen:h,toggleSidebar:p,side:j}),[g,m,h,p,j]);return n.jsx(ya.Provider,{value:R,children:n.jsx(Ct,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Gd,"--sidebar-width-icon":zd,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});io.displayName="SidebarProvider";const lo=i.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const l=In();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});lo.displayName="Sidebar";const ja=i.forwardRef(({className:t,onClick:e,...r},o)=>{const s=In();return n.jsxs(G,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ja.displayName="SidebarTrigger";const Na=i.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=In();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Na.displayName="SidebarRail";const co=i.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));co.displayName="SidebarInset";const ka=i.forwardRef(({className:t,...e},r)=>n.jsx(Xe,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ka.displayName="SidebarInput";const _a=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));_a.displayName="SidebarHeader";const Ca=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Ca.displayName="SidebarFooter";const Sa=i.forwardRef(({className:t,...e},r)=>n.jsx(Ke,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Sa.displayName="SidebarSeparator";const wo=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));wo.displayName="SidebarContent";const tr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));tr.displayName="SidebarGroup";const er=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?sn.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});er.displayName="SidebarGroupLabel";const Ea=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?sn.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ea.displayName="SidebarGroupAction";const nr=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));nr.displayName="SidebarGroupContent";const uo=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));uo.displayName="SidebarMenu";const po=i.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));po.displayName="SidebarMenuItem";const qd=Ae.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),mo=i.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...l},c)=>{const w=t?sn.Slot:"button",{state:d}=In(),u=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(qd({variant:r,size:o}),a),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:u}),n.jsx(St,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):u});mo.displayName="SidebarMenuButton";const Ra=i.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?sn.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Ra.displayName="SidebarMenuAction";const Ta=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ta.displayName="SidebarMenuBadge";const Da=i.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(Qn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(Qn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Da.displayName="SidebarMenuSkeleton";const Ia=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ia.displayName="SidebarMenuSub";const Ma=i.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Ma.displayName="SidebarMenuSubItem";const Oa=i.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const l=t?sn.Slot:"a";return n.jsx(l,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Oa.displayName="SidebarMenuSubButton";function Pa({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:w}){const d=i.useCallback((p,g)=>{o(p,g)},[o]),u=i.useCallback(p=>{const g=r.find(y=>y.projectId===p);return g?g.projectName:p},[r]),m=i.useMemo(()=>r.map(p=>({id:p.projectId,shortName:p.projectName,fullName:p.projectName})),[r]),h=i.useCallback(p=>!s.projectId&&p===s.label,[s]);return n.jsx(lo,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(wo,{children:[n.jsxs(tr,{children:[n.jsx(er,{className:"tw-text-sm",children:a}),n.jsx(nr,{children:n.jsx(uo,{children:Object.entries(e).map(([p,g])=>n.jsx(po,{children:n.jsx(mo,{onClick:()=>d(p),isActive:h(p),children:n.jsx("span",{className:"tw-pl-3",children:g})})},p))})})]}),n.jsxs(tr,{children:[n.jsx(er,{className:"tw-text-sm",children:l}),n.jsx(nr,{className:"tw-pl-3",children:n.jsxs("div",{className:f("tw-flex tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-px-2 tw-py-1",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),children:[n.jsx(_.ScrollText,{className:"tw-h-4 tw-w-4 tw-shrink-0"}),n.jsx(la,{mode:"project",projects:m,openTabs:[],selection:{projectId:(s==null?void 0:s.projectId)??""},onChangeSelection:({projectId:p})=>{if(!p)return;const g=u(p);d(g,p)},buttonVariant:"ghost",buttonClassName:"tw-h-8 tw-w-full tw-flex-1 tw-justify-start tw-font-normal",buttonPlaceholder:c,ariaLabel:l,popoverContentStyle:{zIndex:ar}})]})})]})]})})}const ur=i.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:l},c)=>{const w=bt();return n.jsxs("div",{id:l,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(Xe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:a}),t&&n.jsxs(G,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});ur.displayName="SearchBar";function Kd({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(ur,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(io,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Pa,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),n.jsx(co,{className:"tw-min-w-[215px]",children:o})]})]})}const De="scrBook",Hd="scrRef",ze="source",Ud="details",Yd="Scripture Reference",Xd="Scripture Book",Aa="Type",Wd="Details";function Zd(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:De,header:(t==null?void 0:t.scriptureReferenceColumnName)??Yd,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?at.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===De?I.formatScrRef(s.start):void 0},getGroupingValue:o=>at.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>I.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>I.formatScrRef(o.start),id:Hd,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:I.formatScrRef(s.start)},sortingFn:(o,s)=>I.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ze,header:r?(t==null?void 0:t.typeColumnName)??Aa:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Ud,header:(t==null?void 0:t.detailsColumnName)??Wd,cell:o=>o.getValue(),enableGrouping:!1}]}const Jd=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||I.compareScrRefs(t.start,t.end)===0?`${I.scrRefToBBBCCCVVV(t.start)}+${e}`:`${I.scrRefToBBBCCCVVV(t.start)}+${e}-${I.scrRefToBBBCCCVVV(t.end)}+${r}`},Yo=t=>`${Jd({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Qd({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:l,onRowSelected:c,id:w}){const[d,u]=i.useState([]),[m,h]=i.useState([{id:De,desc:!1}]),[p,g]=i.useState({}),y=i.useMemo(()=>t.flatMap(b=>b.data.map(M=>({...M,source:b.source}))),[t]),v=i.useMemo(()=>Zd({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:l},r),[o,a,l,r]);i.useEffect(()=>{d.includes(ze)?h([{id:ze,desc:!1},{id:De,desc:!1}]):h([{id:De,desc:!1}])},[d]);const j=Gt.useReactTable({data:y,columns:v,state:{grouping:d,sorting:m,rowSelection:p},onGroupingChange:u,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:Gt.getExpandedRowModel(),getGroupedRowModel:Gt.getGroupedRowModel(),getCoreRowModel:Gt.getCoreRowModel(),getSortedRowModel:Gt.getSortedRowModel(),getRowId:Yo,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(c){const b=j.getSelectedRowModel().rowsById,M=Object.keys(b);if(M.length===1){const $=y.find(B=>Yo(B)===M[0])||void 0;$&&c($)}}},[p,y,c,j]);const R=s??Xd,S=a??Aa,C=[{label:"No Grouping",value:[]},{label:`Group by ${R}`,value:[De]},{label:`Group by ${S}`,value:[ze]},{label:`Group by ${R} and ${S}`,value:[De,ze]},{label:`Group by ${S} and ${R}`,value:[ze,De]}],N=b=>{u(JSON.parse(b))},D=(b,M)=>{!b.getIsGrouped()&&!b.getIsSelected()&&b.getToggleSelectedHandler()(M)},T=(b,M)=>b.getIsGrouped()?"":f("banded-row",M%2===0?"even":"odd"),E=(b,M,$)=>{if(!((b==null?void 0:b.length)===0||M.depth<$.column.getGroupedIndex())){if(M.getIsGrouped())switch(M.depth){case 1:return"tw-ps-4";default:return}switch(M.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(He,{value:JSON.stringify(d),onValueChange:b=>{N(b)},children:[n.jsx(Oe,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Ue,{})}),n.jsx(Pe,{position:"item-aligned",children:n.jsx(ea,{children:C.map(b=>n.jsx(Xt,{value:JSON.stringify(b.value),children:b.label},b.label))})})]}),n.jsxs(En,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Rn,{children:j.getHeaderGroups().map(b=>n.jsx(xe,{children:b.headers.filter(M=>M.column.columnDef.header).map(M=>n.jsx(on,{colSpan:M.colSpan,className:"top-0 tw-sticky",children:M.isPlaceholder?void 0:n.jsxs("div",{children:[M.column.getCanGroup()?n.jsx(G,{variant:"ghost",title:`Toggle grouping by ${M.column.columnDef.header}`,onClick:M.column.getToggleGroupingHandler(),type:"button",children:M.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Gt.flexRender(M.column.columnDef.header,M.getContext())]})},M.id))},b.id))}),n.jsx(Tn,{children:j.getRowModel().rows.map((b,M)=>{const $=bt();return n.jsx(xe,{"data-state":b.getIsSelected()?"selected":"",className:f(T(b,M)),onClick:B=>D(b,B),children:b.getVisibleCells().map(B=>{if(!(B.getIsPlaceholder()||B.column.columnDef.enableGrouping&&!B.getIsGrouped()&&(B.column.columnDef.id!==ze||!r)))return n.jsx(Me,{className:f(B.column.columnDef.id,"tw-p-[1px]",E(d,b,B)),children:B.getIsGrouped()?n.jsxs(G,{variant:"link",onClick:b.getToggleExpandedHandler(),type:"button",children:[b.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!b.getIsExpanded()&&($==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",Gt.flexRender(B.column.columnDef.cell,B.getContext())," (",b.subRows.length,")"]}):Gt.flexRender(B.column.columnDef.cell,B.getContext())},B.id)})},b.id)})})]})]})}const fo=(t,e)=>t.filter(r=>{try{return I.getSectionForBook(r)===e}catch{return!1}}),$a=(t,e,r)=>fo(t,e).every(o=>r.includes(o));function tw({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=fo(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(G,{variant:"outline",size:"sm",onClick:()=>o(t),className:f($a(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:sl(t,l,c,w,d)})}const Xo=5,_r=6;function ew({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:h,ntLong:p,dcLong:g,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,j]=i.useState(!1),[R,S]=i.useState(""),C=i.useRef(void 0),N=i.useRef(!1);if(t.length!==at.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const D=i.useMemo(()=>at.Canon.allBookIds.filter((L,q)=>t[q]==="1"&&!at.Canon.isObsolete(at.Canon.bookIdToNumber(L))),[t]),T=i.useMemo(()=>{if(!R.trim()){const H={[I.Section.OT]:[],[I.Section.NT]:[],[I.Section.DC]:[],[I.Section.Extra]:[]};return D.forEach(W=>{const Nt=I.getSectionForBook(W);H[Nt].push(W)}),H}const L=D.filter(H=>Vr(H,R,s)),q={[I.Section.OT]:[],[I.Section.NT]:[],[I.Section.DC]:[],[I.Section.Extra]:[]};return L.forEach(H=>{const W=I.getSectionForBook(H);q[W].push(H)}),q},[D,R,s]),E=i.useCallback((L,q=!1)=>{if(!q||!C.current){r(e.includes(L)?e.filter(nt=>nt!==L):[...e,L]),C.current=L;return}const H=D.findIndex(nt=>nt===C.current),W=D.findIndex(nt=>nt===L);if(H===-1||W===-1)return;const[Nt,At]=[Math.min(H,W),Math.max(H,W)],Ot=D.slice(Nt,At+1).map(nt=>nt);r(e.includes(L)?e.filter(nt=>!Ot.includes(nt)):[...new Set([...e,...Ot])])},[e,r,D]),b=L=>{E(L,N.current),N.current=!1},M=(L,q)=>{L.preventDefault(),E(q,L.shiftKey)},$=i.useCallback(L=>{const q=fo(D,L).map(H=>H);r($a(D,L,e)?e.filter(H=>!q.includes(H)):[...new Set([...e,...q])])},[e,r,D]),B=()=>{r(D.map(L=>L))},P=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(I.Section).map(L=>n.jsx(tw,{section:L,availableBookIds:D,selectedBookIds:e,onToggle:$,localizedStrings:o},L))}),n.jsxs(we,{open:v,onOpenChange:L=>{j(L),L||S("")},children:[n.jsx(je,{asChild:!0,children:n.jsxs(G,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:l,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(re,{className:"tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0",align:"start",children:n.jsxs(ce,{shouldFilter:!1,onKeyDown:L=>{L.key==="Enter"&&(N.current=L.shiftKey)},children:[n.jsx($e,{placeholder:c,value:R,onValueChange:S}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:B,children:w}),n.jsx(G,{variant:"ghost",size:"sm",onClick:P,children:d})]}),n.jsxs(de,{children:[n.jsx(Ye,{children:u}),Object.values(I.Section).map((L,q)=>{const H=T[L];if(H.length!==0)return n.jsxs(i.Fragment,{children:[n.jsx(te,{heading:cs(L,h,p,g,y),children:H.map(W=>n.jsx(ws,{bookId:W,isSelected:e.includes(W),onSelect:()=>b(W),onMouseDown:Nt=>M(Nt,W),section:I.getSectionForBook(W),showCheck:!0,localizedBookNames:s,commandValue:ms(W,s),className:"tw-flex tw-items-center"},W))}),q<Object.values(I.Section).length-1&&n.jsx(ir,{})]},L)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===_r?_r:Xo).map(L=>n.jsx(ae,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ie(L,s)},L)),e.length>_r&&n.jsx(ae,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Xo} ${m}`})]})]})}const nw=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_verse%","%webView_scope_selector_chapter%","%webView_scope_selector_book%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_scope_selector_range%","%webView_scope_selector_select_range%","%webView_scope_selector_range_start%","%webView_scope_selector_range_end%","%webView_scope_selector_ok%","%webView_scope_selector_cancel%","%webView_scope_selector_navigate%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Dt=(t,e)=>t[e]??e,rw=Object.freeze([" ","-"]);function ow({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:l,localizedBookNames:c,id:w,variant:d="radio",rangeStart:u,rangeEnd:m,onRangeStartChange:h,onRangeEndChange:p,currentScrRef:g,onCurrentScrRefChange:y,bookChapterControlLocalizedStrings:v,getEndVerse:j,hideLabel:R=!1,buttonClassName:S}){const C=Dt(l,"%webView_scope_selector_selected_text%"),N=Dt(l,"%webView_scope_selector_verse%"),D=Dt(l,"%webView_scope_selector_chapter%"),T=Dt(l,"%webView_scope_selector_book%"),E=Dt(l,"%webView_scope_selector_current_verse%"),b=Dt(l,"%webView_scope_selector_current_chapter%"),M=Dt(l,"%webView_scope_selector_current_book%"),$=Dt(l,"%webView_scope_selector_choose_books%"),B=Dt(l,"%webView_scope_selector_scope%"),P=Dt(l,"%webView_scope_selector_select_books%"),L=Dt(l,"%webView_scope_selector_range%"),q=Dt(l,"%webView_scope_selector_select_range%"),H=Dt(l,"%webView_scope_selector_range_start%"),W=Dt(l,"%webView_scope_selector_range_end%"),Nt=Dt(l,"%webView_scope_selector_ok%"),At=Dt(l,"%webView_scope_selector_cancel%"),Ot=Dt(l,"%webView_scope_selector_navigate%"),nt=V=>{if(!g)return;const Y=g.book.toUpperCase();switch(V){case"verse":return I.formatScrRef(g,"id");case"chapter":return`${Y} ${g.chapterNum}`;case"book":return Y;default:return}},wt=[{value:"selectedText",label:C,id:"scope-selected-text"},{value:"verse",label:N,dropdownLabel:E,scrRefSuffix:nt("verse"),id:"scope-verse"},{value:"chapter",label:D,dropdownLabel:b,scrRefSuffix:nt("chapter"),id:"scope-chapter"},{value:"book",label:T,dropdownLabel:M,scrRefSuffix:nt("book"),id:"scope-book"},{value:"selectedBooks",label:$,id:"scope-selected"},{value:"range",label:L,id:"scope-range"}],z=(V,Y,zt=!1)=>n.jsxs(n.Fragment,{children:[V,Y&&!zt&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[": ",Y]})]}),J=e?wt.filter(V=>e.includes(V.value)):wt,rt=g??I.defaultScrRef,Q=u??rt,et=m??rt,$t=()=>{},Et=i.useRef(null),Lt=i.useRef(null),pe=i.useRef(!1),A=i.useRef(null),Ht=i.useRef(!1),[me,Rt]=i.useState(void 0),F=i.useRef(!1),U=i.useRef(!1),Z=i.useRef(null),ot=i.useCallback(V=>{if(V){Rt("start"),F.current=!1;return}Rt(Y=>Y==="start"?void 0:Y),F.current&&(F.current=!1,requestAnimationFrame(()=>{var zt;const Y=(zt=Et.current)==null?void 0:zt.querySelector("button");Y==null||Y.click()}))},[]),mt=i.useCallback(V=>{if(V){Rt("end"),U.current=!1;return}Rt(Y=>Y==="end"?void 0:Y)},[]),ft=i.useCallback(V=>{h==null||h(V),p==null||p(V),F.current=!0},[h,p]),kt=i.useCallback(V=>{p==null||p(V),U.current=!0},[p]),ut=i.useCallback(V=>{r(V),V==="selectedBooks"&&s.length===0&&(g!=null&&g.book)&&a([g.book])},[r,s,g,a]),vt=J.find(V=>V.value===t),Pt=()=>t==="selectedBooks"&&s.length>0?s.map(V=>V.toUpperCase()).join(", "):t==="range"?I.formatScrRefRange(Q,et,{optionOrLocalizedBookName:"id",endRefOptionOrLocalizedBookName:"id",repeatBookName:!0}):vt?z(vt.label,vt.scrRefSuffix):t,O=J.filter(V=>V.value!=="selectedBooks"&&V.value!=="range"),ht=J.find(V=>V.value==="selectedBooks"),it=J.find(V=>V.value==="range"),[Ee,Le]=i.useState(!1),[Ve,We]=i.useState(void 0),[Re,dn]=i.useState(void 0),[Te,wn]=i.useState(void 0),[Be,un]=i.useState(void 0),[pn,Mn]=i.useState([]),On=d==="dropdown"&&Ve==="selectedBooks",k=n.jsx(ew,{availableBookInfo:o,selectedBookIds:On?pn:s,onChangeSelectedBookIds:On?Mn:a,localizedStrings:l,localizedBookNames:c}),K=me==="end",X=me==="start",_t="tw-text-muted-foreground",Zt=d==="dropdown"&&Ve==="range",Ze=Zt?wn:ft,Vt=Zt?un:p?kt:$t,yt=n.jsxs("div",{className:"tw-flex tw-flex-wrap tw-items-end tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(xt,{htmlFor:"scope-range-start",className:f(K&&_t),children:H}),n.jsx(zn,{id:"scope-range-start",scrRef:Zt?Te??Q:Q,handleSubmit:Ze,localizedBookNames:c,localizedStrings:v,getEndVerse:j,submitKeys:rw,onOpenChange:ot,className:f(K&&_t),modal:!0})]}),n.jsxs("div",{ref:Et,className:"tw-grid tw-gap-2",children:[n.jsx(xt,{htmlFor:"scope-range-end",className:f(X&&_t),children:W}),n.jsx(zn,{id:"scope-range-end",scrRef:Zt?Be??et:et,handleSubmit:Vt,localizedBookNames:c,localizedStrings:v,getEndVerse:j,disableReferencesUpTo:Zt?Te??Q:Q,onOpenChange:mt,onCloseAutoFocus:V=>{var Y;U.current&&(U.current=!1,V.preventDefault(),(Y=Z.current)==null||Y.focus())},className:f(X&&_t),modal:!0,align:"start"})]})]}),Tt=i.useRef({}),pt=i.useCallback(V=>Y=>{Tt.current[V]=Y},[]),Ut=i.useRef(null);i.useEffect(()=>{if(!Ee)return;let V=0;const Y=requestAnimationFrame(()=>{V=requestAnimationFrame(()=>{var zt;(zt=Tt.current[t])==null||zt.focus()})});return()=>{cancelAnimationFrame(Y),V&&cancelAnimationFrame(V)}},[Ee,t]);const[Yt,Fe]=i.useState(null),[Pn,_i]=i.useState(null),[An,Ci]=i.useState(null),Si=200,[Ei,Ri]=i.useState(!1);i.useEffect(()=>{if(!An||typeof ResizeObserver>"u")return;const V=new ResizeObserver(([Y])=>{Ri(Y.contentRect.width<Si)});return V.observe(An),()=>V.disconnect()},[An]);const vo=i.useCallback(V=>{dn(V),wn(Q),un(et),Mn(s),Le(!1),We(V)},[Q,et,s]),yo=i.useCallback(()=>{Re!==void 0&&(Re==="range"?(Te&&(h==null||h(Te)),Be&&(p==null||p(Be))):Re==="selectedBooks"&&a(pn),ut(Re),We(void 0),dn(void 0))},[Re,Te,Be,pn,h,p,a,ut]),$n=i.useCallback(V=>{V||(We(void 0),dn(void 0))},[]),jo=i.useCallback(V=>{var Y;V.preventDefault(),(Y=Ut.current)==null||Y.focus()},[]),No=V=>t===V?n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})}):void 0;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[!R&&n.jsx(xt,{children:B}),d==="dropdown"?n.jsxs(ie,{open:Ee,onOpenChange:Le,children:[n.jsx(ve,{asChild:!0,children:n.jsxs(G,{ref:Ut,variant:"outline",role:"combobox",className:f("tw-w-full tw-justify-between tw-overflow-hidden tw-font-normal",S),children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:Pt()}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(ee,{ref:Ci,className:"tw-w-[var(--radix-dropdown-menu-trigger-width)] tw-min-w-[12rem]",align:"start",children:n.jsxs(Fn,{container:An,children:[O.map(({value:V,label:Y,dropdownLabel:zt,scrRefSuffix:fn,id:Ti})=>n.jsxs(ke,{ref:pt(V),className:"tw-relative tw-ps-8 data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground",onSelect:()=>ut(V),"data-selected":t===V?"true":void 0,children:[t===V&&n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})}),z(zt??Y,fn,Ei)]},Ti)),(ht||it)&&n.jsx(ye,{}),ht&&n.jsxs(ke,{ref:pt("selectedBooks"),className:f("tw-relative tw-ps-8","data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"),onSelect:()=>vo("selectedBooks"),"data-selected":t==="selectedBooks"?"true":void 0,children:[No("selectedBooks"),`${ht.label}…`]}),it&&n.jsxs(ke,{ref:pt("range"),className:f("tw-relative tw-ps-8","data-[highlighted]:tw-bg-accent data-[highlighted]:tw-text-accent-foreground"),onSelect:()=>vo("range"),"data-selected":t==="range"?"true":void 0,children:[No("range"),`${it.label}…`]}),y&&n.jsxs(n.Fragment,{children:[n.jsx(ye,{}),n.jsx(Ce,{className:"tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-text-muted-foreground",children:Ot}),n.jsx(ke,{ref:A,className:"tw-p-0",onSelect:V=>{var Y,zt;if(V.preventDefault(),pe.current){pe.current=!1;return}Ht.current||(zt=(Y=Lt.current)==null?void 0:Y.querySelector("button"))==null||zt.click()},children:n.jsx("div",{ref:Lt,className:"tw-w-full tw-px-1 tw-pb-1",onPointerDownCapture:V=>{const Y=V.target instanceof HTMLElement?V.target:void 0;Y!=null&&Y.closest("button")&&(pe.current=!0,requestAnimationFrame(()=>{pe.current=!1}))},children:n.jsx(zn,{id:"scope-navigate",scrRef:g??I.defaultScrRef,handleSubmit:y,localizedBookNames:c,localizedStrings:v,getEndVerse:j,triggerVariant:"ghost",onOpenChange:V=>{Ht.current=V},onCloseAutoFocus:V=>{var Y;V.preventDefault(),(Y=A.current)==null||Y.focus()},modal:!0,className:"tw-w-full tw-min-w-0 tw-max-w-none tw-justify-between tw-px-2 tw-font-normal",triggerContent:n.jsxs(n.Fragment,{children:[n.jsx("span",{className:"tw-min-w-0 tw-flex-1 tw-truncate tw-text-start",children:I.formatScrRef(g??I.defaultScrRef,"id")}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})})})})]})]})})]}):n.jsx(lr,{value:t,onValueChange:ut,className:"tw-flex tw-flex-col tw-space-y-1",children:J.map(({value:V,label:Y,scrRefSuffix:zt,id:fn})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(kn,{className:"tw-me-2",value:V,id:fn}),n.jsx(xt,{htmlFor:fn,children:z(Y,zt)})]},fn))})]}),d==="radio"&&t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(xt,{children:P}),k]}),d==="radio"&&t==="range"&&yt,d==="dropdown"&&ht&&n.jsx(Hn,{open:Ve==="selectedBooks",onOpenChange:$n,children:n.jsx(yn,{ref:_i,onCloseAutoFocus:jo,onEscapeKeyDown:V=>{Pn!=null&&Pn.querySelector('[data-state="open"]')&&V.preventDefault()},children:n.jsxs(Fn,{container:Pn,children:[n.jsx(jn,{className:"tw-pe-8",children:n.jsx(Nn,{children:$})}),k,n.jsxs(Un,{children:[n.jsx(G,{variant:"outline",onClick:()=>$n(!1),children:At}),n.jsx(G,{onClick:yo,children:Nt})]})]})})}),d==="dropdown"&&it&&n.jsx(Hn,{open:Ve==="range",onOpenChange:$n,children:n.jsx(yn,{ref:Fe,onCloseAutoFocus:jo,onEscapeKeyDown:V=>{Yt!=null&&Yt.querySelector('[data-state="open"]')&&V.preventDefault()},children:n.jsxs(Fn,{container:Yt,children:[n.jsx(jn,{className:"tw-pe-8",children:n.jsx(Nn,{children:q})}),yt,n.jsxs(Un,{children:[n.jsx(G,{variant:"outline",onClick:()=>$n(!1),children:At}),n.jsx(G,{ref:Z,onClick:yo,children:Nt})]})]})})})]})}function sw({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:l}){const c={...I.DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,...Object.fromEntries(Object.entries(o).map(([d,u])=>[d,d===u&&d in I.DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS?I.DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[d]:u]))},w=bt();return n.jsxs(He,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Oe,{size:s,className:f("pr-twp tw-w-auto",a),children:n.jsx(Ue,{placeholder:c[I.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Pe,{id:l,align:w==="rtl"?"end":"start",style:{zIndex:ln},children:t.map(d=>n.jsx(Xt,{value:`${d}`,children:c[I.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function aw({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function iw({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function lw({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Ke,{}):""]})}function La(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function rr({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Va=(t,e,r,o)=>r?Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:"command"in c?n.jsxs(ke,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(rr,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(rr,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Js,{children:[n.jsx(eo,{children:c.label}),n.jsx(Zs,{children:n.jsx(no,{children:Va(t,e,La(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(St,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function or({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:l="ghost",id:c}){return n.jsxs(ie,{variant:a,children:[n.jsx(ve,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(G,{variant:l,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(ee,{align:"start",style:{zIndex:ln},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,u)=>n.jsxs(i.Fragment,{children:[n.jsx(to,{children:n.jsx(Ct,{children:Va(e.groups,e.items,w,t)})}),d<u.length-1&&n.jsx(ye,{})]},w))})]})}const Ba=i.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function cw({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(Ba,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(or,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(or,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function dw({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ba,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(or,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const ho=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(Kt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});ho.displayName=Kt.List.displayName;const go=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));go.displayName=Kt.List.displayName;const Fa=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),xo=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));xo.displayName=Kt.Content.displayName;function ww({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(ur,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(ho,{children:[n.jsx(go,{children:t.map(c=>n.jsx(Fa,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(xo,{value:c.value,children:c.content},c.key))]})]})}function uw({...t}){return n.jsx(ct.Menu,{...t})}function pw({...t}){return n.jsx(ct.Sub,{"data-slot":"menubar-sub",...t})}const Ga=i.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=i.useMemo(()=>({variant:e}),[e]);return n.jsx(Qr.Provider,{value:s,children:n.jsx(ct.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Ga.displayName=ct.Root.displayName;const za=i.forwardRef(({className:t,...e},r)=>{const o=ue();return n.jsx(ct.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Se({variant:o.variant,className:t})),...e})});za.displayName=ct.Trigger.displayName;const qa=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=ue();return n.jsxs(ct.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Se({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});qa.displayName=ct.SubTrigger.displayName;const Ka=i.forwardRef(({className:t,...e},r)=>{const o=ue();return n.jsx(ct.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Ka.displayName=ct.SubContent.displayName;const Ha=i.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const l=ue();return n.jsx(ct.Portal,{children:n.jsx(ct.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Ha.displayName=ct.Content.displayName;const Ua=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=ue();return n.jsx(ct.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Se({variant:s.variant,className:t}),t),...r})});Ua.displayName=ct.Item.displayName;const mw=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=ue();return n.jsxs(ct.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Se({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ct.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});mw.displayName=ct.CheckboxItem.displayName;const fw=i.forwardRef(({className:t,children:e,...r},o)=>{const s=ue();return n.jsxs(ct.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Se({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ct.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});fw.displayName=ct.RadioItem.displayName;const hw=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ct.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));hw.displayName=ct.Label.displayName;const Ya=i.forwardRef(({className:t,...e},r)=>n.jsx(ct.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ya.displayName=ct.Separator.displayName;const gn=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Xa=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order);return s.flatMap(([a],l)=>{const c=e.filter(d=>d.group===a).sort((d,u)=>d.order-u.order).map(d=>n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:"command"in d?n.jsxs(Ua,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(rr,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(rr,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(pw,{children:[n.jsx(qa,{children:d.label}),n.jsx(Ka,{children:Xa(t,e,La(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(St,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&l<s.length-1&&w.push(n.jsx(Ya,{},`separator-${a}`)),w})};function gw({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=i.useRef(void 0),a=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),w=i.useRef(void 0),d=u=>{switch(u){case"platform.app":return a;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Xi.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,m)=>{var g,y,v,j;u.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},p={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":gn(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),gn(a,[h,p]);break;case"alt+l":(y=l.current)==null||y.focus(),gn(l,[h,p]);break;case"alt+n":(v=c.current)==null||v.focus(),gn(c,[h,p]);break;case"alt+h":(j=w.current)==null||j.focus(),gn(w,[h,p]);break}}),i.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(p=>{p.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const y=g.target.getAttribute("data-state");r(y==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(p=>{u.observe(p,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(Ga,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,m])=>typeof u=="boolean"||typeof m=="boolean"?0:u.order-m.order).map(([u,m])=>n.jsxs(uw,{children:[n.jsx(za,{ref:d(u),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(Ha,{style:{zIndex:ln},children:n.jsx(Ct,{children:Xa(t.groups,t.items,u,e)})})]},u))})}function xw(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function bw({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const u=i.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(gw,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const vw=(t,e)=>t[e]??e;function yw({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:l,className:c,id:w}){const d=vw(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,m]=i.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(y=>y!==g)]),a&&r.find(y=>y===g)&&a([...r.filter(y=>y!==g)]),m(!1)},p=(g,y)=>{var j,R,S,C,N,D;const v=y!==g?((R=(j=t[g])==null?void 0:j.uiNames)==null?void 0:R[y])??((C=(S=t[g])==null?void 0:S.uiNames)==null?void 0:C.en):void 0;return v?`${(N=t[g])==null?void 0:N.autonym} (${v})`:(D=t[g])==null?void 0:D.autonym};return n.jsxs("div",{id:w,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(He,{name:"uiLanguage",value:e,onValueChange:h,open:u,onOpenChange:g=>m(g),children:[n.jsx(Oe,{children:n.jsx(Ue,{})}),n.jsx(Pe,{style:{zIndex:ln},children:Object.keys(t).map(g=>n.jsx(Xt,{value:g,children:p(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(xt,{className:"tw-font-normal tw-text-muted-foreground",children:I.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>p(g,e)).join(", "):t.en.autonym})})})]})}function jw({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(xt,{children:e(t)}):r?n.jsx(xt,{children:r(t)}):n.jsx(xt,{children:t})}function Nw({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(wr,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(jw,{item:c,createLabel:a,createComplexLabel:l})]},c))})}function kw({scrRef:t,onClick:e,tooltipContent:r,ariaLabel:o,className:s,testId:a="linked-scr-ref-button"}){if(t==="")return;const l=n.jsx(G,{type:"button",variant:"link",onClick:e,disabled:!e,"aria-label":o,className:f("tw-h-auto tw-p-0 tw-text-start tw-font-mono tw-text-sm",s),"data-testid":a,children:t});return r?n.jsx(Ct,{delayDuration:0,children:n.jsxs(It,{children:[n.jsx(Mt,{asChild:!0,children:l}),n.jsx(St,{children:r})]})}):l}function _w({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:l,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalContent:u,accentColor:m,showDropdownOnHover:h=!1}){const p=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&h&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(ie,{children:[n.jsx(ve,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(ee,{align:"end",children:d})]})}),e&&d&&n.jsxs(ie,{children:[n.jsx(ve,{className:f(m&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(ee,{align:"end",children:d})]})]}),u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const Wa=i.forwardRef(({className:t,...e},r)=>n.jsx(_.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Wa.displayName="Spinner";function Cw({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:c=!1,className:w,defaultValue:d,value:u,onChange:m,onFocus:h,onBlur:p}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(xt,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(Xe,{id:t,disabled:e,placeholder:l,required:c,className:f(w,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:m,onFocus:h,onBlur:p}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const Sw=Ae.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Za=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",Sw({variant:e}),t),...r}));Za.displayName="Alert";const Ja=i.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ja.displayName="AlertTitle";const Qa=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Qa.displayName="AlertDescription";const Ew=dt.Root,Rw=dt.Trigger,Tw=dt.Group,Dw=dt.Portal,Iw=dt.Sub,Mw=dt.RadioGroup,ti=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(dt.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ti.displayName=dt.SubTrigger.displayName;const ei=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));ei.displayName=dt.SubContent.displayName;const ni=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.Portal,{children:n.jsx(dt.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));ni.displayName=dt.Content.displayName;const ri=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));ri.displayName=dt.Item.displayName;const oi=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(dt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(dt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));oi.displayName=dt.CheckboxItem.displayName;const si=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(dt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(dt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));si.displayName=dt.RadioItem.displayName;const ai=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(dt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ai.displayName=dt.Label.displayName;const ii=i.forwardRef(({className:t,...e},r)=>n.jsx(dt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));ii.displayName=dt.Separator.displayName;function li({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}li.displayName="ContextMenuShortcut";const ci=i.createContext({direction:"bottom"});function di({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=i.useMemo(()=>({direction:e}),[e]);return n.jsx(ci.Provider,{value:o,children:n.jsx(le.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}di.displayName="Drawer";const Ow=le.Drawer.Trigger,wi=le.Drawer.Portal,Pw=le.Drawer.Close,bo=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));bo.displayName=le.Drawer.Overlay.displayName;const ui=i.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=i.useContext(ci),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(wi,{children:[n.jsx(bo,{}),n.jsxs(le.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",l[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ui.displayName="DrawerContent";function pi({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}pi.displayName="DrawerHeader";function mi({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}mi.displayName="DrawerFooter";const fi=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));fi.displayName=le.Drawer.Title.displayName;const hi=i.forwardRef(({className:t,...e},r)=>n.jsx(le.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));hi.displayName=le.Drawer.Description.displayName;const gi=i.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Rr.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Rr.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));gi.displayName=Rr.Root.displayName;function Aw({className:t,...e}){return n.jsx(Pr.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const $w=Pr.Panel;function Lw({withHandle:t,className:e,...r}){return n.jsx(Pr.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Vw({...t}){return n.jsx(Qo.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const xi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsxs(xn.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(xn.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(xn.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(xn.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});xi.displayName=xn.Root.displayName;const bi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(Tr.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Tr.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});bi.displayName=Tr.Root.displayName;const Bw=Kt.Root,vi=i.forwardRef(({className:t,...e},r)=>{const o=bt();return n.jsx(Kt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});vi.displayName=Kt.List.displayName;const yi=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));yi.displayName=Kt.Trigger.displayName;const ji=i.forwardRef(({className:t,...e},r)=>n.jsx(Kt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));ji.displayName=Kt.Content.displayName;const Ni=i.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Ni.displayName="Textarea";const Fw=(t,e)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Gw(t){return{preserveValue:!0,...t}}const ki=(t,e,r={})=>{const o=i.useRef(e);o.current=e;const s=i.useRef(r);s.current=Gw(s.current);const[a,l]=i.useState(()=>o.current),[c,w]=i.useState(!0);return i.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const u=await t();d&&(l(()=>u),w(!1))}})(),()=>{d=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[a,c]},Cr=()=>!1,zw=(t,e)=>{const[r]=ki(i.useCallback(async()=>{if(!t)return Cr;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Cr,{preserveValue:!1});i.useEffect(()=>()=>{r!==Cr&&r()},[r])};function qw(t){i.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Qo.toast});exports.Alert=Za;exports.AlertDescription=Qa;exports.AlertTitle=Ja;exports.Avatar=Zr;exports.AvatarFallback=Jr;exports.AvatarImage=Ws;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ul;exports.BOOK_SELECTOR_STRING_KEYS=fl;exports.Badge=ae;exports.BookChapterControl=zn;exports.BookSelector=hl;exports.Button=G;exports.COMMENT_EDITOR_STRING_KEYS=Lc;exports.COMMENT_LIST_STRING_KEYS=Vc;exports.Card=Xr;exports.CardContent=Wr;exports.CardDescription=Ys;exports.CardFooter=Xs;exports.CardHeader=Hs;exports.CardTitle=Us;exports.ChapterRangeSelector=gs;exports.Checkbox=wr;exports.Checklist=Nw;exports.ComboBox=Dr;exports.Command=ce;exports.CommandEmpty=Ye;exports.CommandGroup=te;exports.CommandInput=$e;exports.CommandItem=ne;exports.CommandList=de;exports.CommentEditor=$c;exports.CommentList=zc;exports.ContextMenu=Ew;exports.ContextMenuCheckboxItem=oi;exports.ContextMenuContent=ni;exports.ContextMenuGroup=Tw;exports.ContextMenuItem=ri;exports.ContextMenuLabel=ai;exports.ContextMenuPortal=Dw;exports.ContextMenuRadioGroup=Mw;exports.ContextMenuRadioItem=si;exports.ContextMenuSeparator=ii;exports.ContextMenuShortcut=li;exports.ContextMenuSub=Iw;exports.ContextMenuSubContent=ei;exports.ContextMenuSubTrigger=ti;exports.ContextMenuTrigger=Rw;exports.DataTable=ia;exports.Dialog=Hn;exports.DialogClose=ol;exports.DialogContent=yn;exports.DialogDescription=is;exports.DialogFooter=Un;exports.DialogHeader=jn;exports.DialogOverlay=$r;exports.DialogPortal=as;exports.DialogTitle=Nn;exports.DialogTrigger=rl;exports.Drawer=di;exports.DrawerClose=Pw;exports.DrawerContent=ui;exports.DrawerDescription=hi;exports.DrawerFooter=mi;exports.DrawerHeader=pi;exports.DrawerOverlay=bo;exports.DrawerPortal=wi;exports.DrawerTitle=fi;exports.DrawerTrigger=Ow;exports.DropdownMenu=ie;exports.DropdownMenuCheckboxItem=Qt;exports.DropdownMenuContent=ee;exports.DropdownMenuGroup=to;exports.DropdownMenuItem=ke;exports.DropdownMenuItemType=wa;exports.DropdownMenuLabel=Ce;exports.DropdownMenuPortal=Zs;exports.DropdownMenuRadioGroup=Qs;exports.DropdownMenuRadioItem=ro;exports.DropdownMenuSeparator=ye;exports.DropdownMenuShortcut=ta;exports.DropdownMenuSub=Js;exports.DropdownMenuSubContent=no;exports.DropdownMenuSubTrigger=eo;exports.DropdownMenuTrigger=ve;exports.ERROR_DUMP_STRING_KEYS=ca;exports.ERROR_POPOVER_STRING_KEYS=ad;exports.EditorKeyboardShortcuts=fa;exports.ErrorDump=da;exports.ErrorPopover=id;exports.FOOTNOTE_EDITOR_STRING_KEYS=kd;exports.Filter=ud;exports.FilterDropdown=ld;exports.Footer=wd;exports.FootnoteEditor=Nd;exports.FootnoteItem=ba;exports.FootnoteList=Sd;exports.INVENTORY_STRING_KEYS=Ld;exports.Input=Xe;exports.Inventory=Fd;exports.Label=xt;exports.LinkedScrRefButton=kw;exports.MARKER_MENU_STRING_KEYS=ha;exports.MarkdownRenderer=sd;exports.MarkerMenu=ga;exports.MoreInfo=cd;exports.MultiSelectComboBox=ua;exports.NavigationContentSearch=ww;exports.Popover=we;exports.PopoverAnchor=us;exports.PopoverContent=re;exports.PopoverPortalContainerProvider=Fn;exports.PopoverTrigger=je;exports.Progress=gi;exports.ProjectSelector=la;exports.RadioGroup=lr;exports.RadioGroupItem=kn;exports.RecentSearches=fs;exports.ResizableHandle=Lw;exports.ResizablePanel=$w;exports.ResizablePanelGroup=Aw;exports.ResultsCard=_w;exports.SCOPE_SELECTOR_STRING_KEYS=nw;exports.ScopeSelector=ow;exports.ScriptureResultsViewer=Qd;exports.ScrollGroupSelector=sw;exports.SearchBar=ur;exports.Select=He;exports.SelectContent=Pe;exports.SelectGroup=ea;exports.SelectItem=Xt;exports.SelectLabel=ra;exports.SelectScrollDownButton=so;exports.SelectScrollUpButton=oo;exports.SelectSeparator=oa;exports.SelectTrigger=Oe;exports.SelectValue=Ue;exports.Separator=Ke;exports.SettingsList=aw;exports.SettingsListHeader=lw;exports.SettingsListItem=iw;exports.SettingsSidebar=Pa;exports.SettingsSidebarContentSearch=Kd;exports.Sidebar=lo;exports.SidebarContent=wo;exports.SidebarFooter=Ca;exports.SidebarGroup=tr;exports.SidebarGroupAction=Ea;exports.SidebarGroupContent=nr;exports.SidebarGroupLabel=er;exports.SidebarHeader=_a;exports.SidebarInput=ka;exports.SidebarInset=co;exports.SidebarMenu=uo;exports.SidebarMenuAction=Ra;exports.SidebarMenuBadge=Ta;exports.SidebarMenuButton=mo;exports.SidebarMenuItem=po;exports.SidebarMenuSkeleton=Da;exports.SidebarMenuSub=Ia;exports.SidebarMenuSubButton=Oa;exports.SidebarMenuSubItem=Ma;exports.SidebarProvider=io;exports.SidebarRail=Na;exports.SidebarSeparator=Sa;exports.SidebarTrigger=ja;exports.Skeleton=Qn;exports.Slider=xi;exports.Sonner=Vw;exports.Spinner=Wa;exports.Switch=bi;exports.TabDropdownMenu=or;exports.TabFloatingMenu=dw;exports.TabToolbar=cw;exports.Table=En;exports.TableBody=Tn;exports.TableCaption=aa;exports.TableCell=Me;exports.TableFooter=sa;exports.TableHead=on;exports.TableHeader=Rn;exports.TableRow=xe;exports.Tabs=Bw;exports.TabsContent=ji;exports.TabsList=vi;exports.TabsTrigger=yi;exports.TextField=Cw;exports.Textarea=Ni;exports.ToggleGroup=dr;exports.ToggleGroupItem=en;exports.Toolbar=bw;exports.Tooltip=It;exports.TooltipContent=St;exports.TooltipProvider=Ct;exports.TooltipTrigger=Mt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=pa;exports.UiLanguageSelector=yw;exports.UndoRedoButtons=ma;exports.VerticalTabs=ho;exports.VerticalTabsContent=xo;exports.VerticalTabsList=go;exports.VerticalTabsTrigger=Fa;exports.Z_INDEX_ABOVE_DOCK=ln;exports.Z_INDEX_FOOTNOTE_EDITOR=Ar;exports.Z_INDEX_MODAL=os;exports.Z_INDEX_MODAL_BACKDROP=rs;exports.Z_INDEX_OVERLAY=ar;exports.Z_INDEX_TOOLTIP=ss;exports.badgeVariants=Ks;exports.buttonVariants=Br;exports.cn=f;exports.getBookIdFromUSFM=$d;exports.getInventoryHeader=Dn;exports.getLinesFromUSFM=Pd;exports.getNumberFromUSFM=Ad;exports.getStatusForItem=va;exports.getToolbarOSReservedSpaceClassName=xw;exports.inventoryCountColumn=Md;exports.inventoryItemColumn=Dd;exports.inventoryStatusColumn=Od;exports.selectTriggerVariants=na;exports.useEvent=Fw;exports.useEventAsync=zw;exports.useListbox=qs;exports.usePromise=ki;exports.useRecentSearches=al;exports.useSidebar=In;exports.useStylesheet=qw;function Kw(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Kw(`*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
  }

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "“""”""‘""’";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-quoteless :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose-quoteless :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-pointer-events-auto {
  pointer-events: auto;
}
.tw-invisible {
  visibility: hidden;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-50 {
  z-index: 50;
}
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
}
.tw-m-0 {
  margin: 0px;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-3 {
  margin-bottom: 0.75rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-3 {
  margin-right: 0.75rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-6 {
  margin-top: 1.5rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1 {
  height: 0.25rem;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-64 {
  height: 16rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-10 {
  max-height: 2.5rem;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-11 {
  min-height: 2.75rem;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-1 {
  width: 0.25rem;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-24 {
  width: 6rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[320px\\] {
  width: 320px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
}
.tw-w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\] {
  width: var(--radix-dropdown-menu-trigger-width);
}
.tw-w-\\[var\\(--radix-popper-anchor-width\\,280px\\)\\] {
  width: var(--radix-popper-anchor-width,280px);
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-max {
  width: max-content;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-8 {
  min-width: 2rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[200px\\] {
  min-width: 200px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[26px\\] {
  min-width: 26px;
}
.tw-min-w-\\[500px\\] {
  min-width: 500px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-min-w-min {
  min-width: min-content;
}
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[200px\\] {
  max-width: 200px;
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-\\[280px\\] {
  max-width: 280px;
}
.tw-max-w-\\[calc\\(100vw-2rem\\)\\] {
  max-width: calc(100vw - 2rem);
}
.tw-max-w-fit {
  max-width: fit-content;
}
.tw-max-w-full {
  max-width: 100%;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-max-w-xs {
  max-width: 20rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[10\\] {
  flex-grow: 10;
}
.tw-grow-\\[1\\] {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-border-collapse {
  border-collapse: collapse;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-ew-resize {
  cursor: ew-resize;
}
.tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-flow-col {
  grid-auto-flow: column;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-content-center {
  align-content: center;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-baseline {
  align-items: baseline;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0 {
  gap: 0px;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-1 {
  column-gap: 0.25rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
}
.tw-gap-y-2 {
  row-gap: 0.5rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-text-clip {
  text-overflow: clip;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-e-none {
  border-start-end-radius: 0px;
  border-end-end-radius: 0px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-lg {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-s-none {
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-l-4 {
  border-left-width: 4px;
}
.tw-border-s-0 {
  border-inline-start-width: 0px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-none {
  border-style: none;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-border\\/50 {
  border-color: hsl(var(--border) / 0.5);
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-background\\/50 {
  background-color: hsl(var(--background) / 0.5);
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 63 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500\\/15 {
  background-color: rgb(244 63 94 / 0.15);
}
.tw-bg-rose-500\\/5 {
  background-color: rgb(244 63 94 / 0.05);
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-sky-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity, 1));
}
.tw-bg-sky-500\\/15 {
  background-color: rgb(14 165 233 / 0.15);
}
.tw-bg-sky-500\\/5 {
  background-color: rgb(14 165 233 / 0.05);
}
.tw-bg-teal-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(20 184 166 / var(--tw-bg-opacity, 1));
}
.tw-bg-teal-500\\/15 {
  background-color: rgb(20 184 166 / 0.15);
}
.tw-bg-teal-500\\/5 {
  background-color: rgb(20 184 166 / 0.05);
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-0\\.5 {
  padding: 0.125rem;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[10px\\] {
  padding: 10px;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
}
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-1 {
  padding-bottom: 0.25rem;
}
.tw-pb-16 {
  padding-bottom: 4rem;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-24 {
  padding-bottom: 6rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pb-8 {
  padding-bottom: 2rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-4 {
  padding-inline-end: 1rem;
}
.tw-pe-8 {
  padding-inline-end: 2rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-2 {
  padding-left: 0.5rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-6 {
  padding-left: 1.5rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-2 {
  padding-inline-start: 0.5rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-1 {
  padding-top: 0.25rem;
}
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-extrabold {
  font-weight: 800;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/30 {
  color: hsl(var(--foreground) / 0.3);
}
.tw-text-foreground\\/50 {
  color: hsl(var(--foreground) / 0.5);
}
.tw-text-foreground\\/70 {
  color: hsl(var(--foreground) / 0.7);
}
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.tw-text-rose-600 {
  --tw-text-opacity: 1;
  color: rgb(225 29 72 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-sky-600 {
  --tw-text-opacity: 1;
  color: rgb(2 132 199 / var(--tw-text-opacity, 1));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-teal-600 {
  --tw-text-opacity: 1;
  color: rgb(13 148 136 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-line-through {
  text-decoration-line: line-through;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-40 {
  opacity: 0.4;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
}
@keyframes enter {

  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit {

  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-accent\\/80:hover {
  background-color: hsl(var(--accent) / 0.8);
}
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/10:hover {
  background-color: hsl(var(--primary) / 0.1);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-group:hover .group-hover\\:tw-visible {
  visibility: visible;
}
.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[highlighted\\]\\:tw-bg-accent[data-highlighted] {
  background-color: hsl(var(--accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[highlighted\\]\\:tw-text-accent-foreground[data-highlighted] {
  color: hsl(var(--accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }

  .dark\\:tw-text-rose-400 {
    --tw-text-opacity: 1;
    color: rgb(251 113 133 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-sky-400 {
    --tw-text-opacity: 1;
    color: rgb(56 189 248 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-teal-400 {
    --tw-text-opacity: 1;
    color: rgb(45 212 191 / var(--tw-text-opacity, 1));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
}
.\\[\\&\\>blockquote\\]\\:tw-border-s-0>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-p-0>blockquote {
  padding: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-ps-0>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-font-normal>blockquote {
  font-weight: 400;
}
.\\[\\&\\>blockquote\\]\\:tw-not-italic>blockquote {
  font-style: normal;
}
.\\[\\&\\>blockquote\\]\\:tw-text-foreground>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>span\\]\\:tw-flex-1>span {
  flex: 1 1 0%;
}
.\\[\\&\\>span\\]\\:tw-text-start>span {
  text-align: start;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
}
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-mt-0 [data-lexical-editor="true"]>blockquote {
  margin-top: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-border-s-0 [data-lexical-editor="true"]>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-ps-0 [data-lexical-editor="true"]>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-font-normal [data-lexical-editor="true"]>blockquote {
  font-weight: 400;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-not-italic [data-lexical-editor="true"]>blockquote {
  font-style: normal;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-text-foreground [data-lexical-editor="true"]>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-sans:"IBM Plex Sans Variable", sans-serif;--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-spacing:calc(var(--spacing));--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-radius-xl:calc(var(--radius) * 1.4);--tw-radius-2xl:calc(var(--radius) * 1.8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-ease-in-out:cubic-bezier(.4, 0, .2, 1);--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-3\\.5{height:calc(calc(var(--spacing)) * 3.5)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\.5{width:calc(calc(var(--spacing)) * 3.5)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-\\[var\\(--radix-dropdown-menu-trigger-width\\)\\]{width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\[var\\(--radix-popper-anchor-width\\,280px\\)\\]{width:var(--radix-popper-anchor-width,280px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[280px\\]{max-width:280px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-\\[calc\\(100vw-2rem\\)\\]{max-width:calc(100vw - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[12rem\\]{min-width:12rem}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[200px\\]{min-width:200px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-accent-foreground{background-color:var(--accent-foreground)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-card-foreground{background-color:var(--card-foreground)}.tw\\:bg-destructive-foreground{background-color:var(--destructive-foreground)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted{background-color:var(--muted)}.tw\\:bg-muted-foreground{background-color:var(--muted-foreground)}.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-popover-foreground{background-color:var(--popover-foreground)}.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-secondary-foreground{background-color:var(--secondary-foreground)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent{color:var(--accent)}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card{color:var(--card)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted{color:var(--muted)}.tw\\:text-muted-foreground{color:var(--muted-foreground)}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover{color:var(--popover)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary{color:var(--secondary)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on],.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:left-2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){left:calc(calc(var(--spacing)) * 2)}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:right-2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){right:calc(calc(var(--spacing)) * 2)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
`,"after-all");
//# sourceMappingURL=index.cjs.map
