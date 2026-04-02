"use strict";var Na=Object.defineProperty;var ka=(t,e,r)=>e in t?Na(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var xt=(t,e,r)=>ka(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),a=require("react"),Nt=require("cmdk"),k=require("lucide-react"),_a=require("clsx"),Ca=require("tailwind-merge"),Ea=require("@radix-ui/react-dialog"),it=require("@sillsdev/scripture"),N=require("platform-bible-utils"),Me=require("@radix-ui/react-slot"),ie=require("class-variance-authority"),Sa=require("@radix-ui/react-popover"),Ra=require("@radix-ui/react-label"),Ta=require("@radix-ui/react-radio-group"),x=require("lexical"),Xr=require("@radix-ui/react-tooltip"),Dn=require("@lexical/rich-text"),Sr=require("react-dom"),Ma=require("@lexical/table"),Da=require("@radix-ui/react-toggle-group"),Ia=require("@radix-ui/react-toggle"),Wr=require("@lexical/headless"),Oa=require("@radix-ui/react-separator"),Aa=require("@radix-ui/react-avatar"),Zr=require("@radix-ui/react-dropdown-menu"),vt=require("@tanstack/react-table"),Pa=require("@radix-ui/react-select"),La=require("markdown-to-jsx"),Tt=require("@eten-tech-foundation/platform-editor"),$a=require("@radix-ui/react-checkbox"),Fa=require("@radix-ui/react-tabs"),Va=require("@radix-ui/react-menubar"),za=require("react-hotkeys-hook"),Ba=require("@radix-ui/react-context-menu"),At=require("vaul"),Ga=require("@radix-ui/react-progress"),Ka=require("react-resizable-panels"),Jr=require("sonner"),qa=require("@radix-ui/react-slider"),Ua=require("@radix-ui/react-switch");function dt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const St=dt(Ea),Se=dt(Sa),Qr=dt(Ra),ze=dt(Ta),ue=dt(Xr),pn=dt(Da),to=dt(Ia),eo=dt(Oa),De=dt(Aa),Z=dt(Zr),st=dt(Pa),In=dt($a),kt=dt(Fa),J=dt(Va),Q=dt(Ba),On=dt(Ga),Vn=dt(Ka),$e=dt(qa),An=dt(Ua),Ha=Ca.extendTailwindMerge({prefix:"tw-"});function h(...t){return Ha(_a.clsx(t))}const Ya="layoutDirection";function lt(){const t=localStorage.getItem(Ya);return t==="rtl"?t:"ltr"}const no=St.Root,Xa=St.Trigger,ro=St.Portal,Wa=St.Close,zn=a.forwardRef(({className:t,...e},r)=>n.jsx(St.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));zn.displayName=St.Overlay.displayName;const Bn=a.forwardRef(({className:t,children:e,...r},o)=>{const s=lt();return n.jsxs(ro,{children:[n.jsx(zn,{}),n.jsxs(St.Content,{ref:o,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(St.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Bn.displayName=St.Content.displayName;function Gn({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Gn.displayName="DialogHeader";function oo({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}oo.displayName="DialogFooter";const Kn=a.forwardRef(({className:t,...e},r)=>n.jsx(St.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Kn.displayName=St.Title.displayName;const so=a.forwardRef(({className:t,...e},r)=>n.jsx(St.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));so.displayName=St.Description.displayName;const Kt=a.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Kt.displayName=Nt.Command.displayName;const xe=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Nt.Command.Input,{ref:r,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});xe.displayName=Nt.Command.Input.displayName;const qt=a.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));qt.displayName=Nt.Command.List.displayName;const Ie=a.forwardRef((t,e)=>n.jsx(Nt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ie.displayName=Nt.Command.Empty.displayName;const Ot=a.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Ot.displayName=Nt.Command.Group.displayName;const qn=a.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",t),...e}));qn.displayName=Nt.Command.Separator.displayName;const Pt=a.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Pt.displayName=Nt.Command.Item.displayName;function ao({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ao.displayName="CommandShortcut";const io=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Za=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ce(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??it.Canon.bookIdToEnglishName(t)}function Un(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const lo=it.Canon.allBookIds.filter(t=>!it.Canon.isObsolete(it.Canon.bookIdToNumber(t))),pe=Object.fromEntries(lo.map(t=>[t,it.Canon.bookIdToEnglishName(t)]));function Hn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=it.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(N.includes(s.toLowerCase(),o)||N.includes(t.toLowerCase(),o)||(i?N.includes(i.localizedName.toLowerCase(),o)||N.includes(i.localizedId.toLowerCase(),o):!1))}const co=a.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:l=!1,localizedBookNames:c,commandValue:d},w)=>{const p=a.useRef(!1),f=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},m=v=>{p.current=!0,o?o(v):r==null||r(t)},u=a.useMemo(()=>Ce(t,c),[t,c]),g=a.useMemo(()=>Un(t,c),[t,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(Pt,{ref:w,value:d||`${t} ${it.Canon.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${it.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[l&&n.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Yn=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline",subtle:"tw-text-muted-foreground hover:tw-text-foreground"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),B=a.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const l=o?Me.Slot:"button";return n.jsx(l,{className:h(Yn({variant:e,size:r,className:t})),ref:i,...s})});B.displayName="Button";const be=250,Xn=300,wo=400,Ja=450,Qa=500,Ut=Se.Root,Zt=Se.Trigger,po=Se.Anchor,Lt=a.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},i)=>{const l=lt();return n.jsx(Se.Portal,{children:n.jsx(Se.Content,{ref:i,align:e,sideOffset:r,className:h("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:be,...o},...s,dir:l})})});Lt.displayName=Se.Content.displayName;function Pn(t,e,r){return`${t} ${pe[t]}${e?` ${Un(t,e)} ${Ce(t,e)}`:""}${r?` ${r}`:""}`}function uo({recentSearches:t,onSearchItemSelect:e,renderItem:r=m=>String(m),getItemKey:o=m=>String(m),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:l,classNameForItems:c,buttonClassName:d="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:w="ghost",open:p,onOpenChange:f}){const[m,u]=a.useState(!1),g=p!==void 0,v=g?p:m,b=y=>{g||u(y),f==null||f(y)};if(t.length===0)return;const j=y=>{e(y),b(!1)};return n.jsxs(Ut,{open:v,onOpenChange:b,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(B,{variant:w,size:"icon",className:d,"aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Lt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Kt,{children:n.jsx(qt,{children:n.jsx(Ot,{heading:i,children:t.map(y=>n.jsxs(Pt,{onSelect:()=>j(y),className:h("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(y)})]},o(y)))})})})})]})}function ti(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),l=[s,...i.slice(0,o-1)];e(l)}}const bn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ei=[bn.BOOK_ONLY,bn.BOOK_CHAPTER,bn.BOOK_CHAPTER_VERSE];function Rr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function zt(t){return N.getChaptersForBook(it.Canon.bookIdToNumber(t))}function ni(t,e,r){if(!t.trim()||e.length===0)return;const o=ei.reduce((s,i)=>{if(s)return s;const l=i.exec(t.trim());if(l){const[c,d=void 0,w=void 0]=l.slice(1);let p;const f=e.filter(m=>Hn(m,c,r));if(f.length===1&&([p]=f),!p&&d){if(it.Canon.isBookIdValid(c)){const m=c.toUpperCase();e.includes(m)&&(p=m)}if(!p&&r){const m=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());m&&e.includes(m[0])&&([p]=m)}}if(!p&&d){const u=(g=>Object.keys(pe).find(v=>pe[v].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let m=d?parseInt(d,10):void 0;m&&m>zt(p)&&(m=Math.max(zt(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:m,verseNum:u}}}},void 0);if(o)return o}function ri(t,e,r,o){const s=a.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(zt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),i=a.useCallback(()=>{const d=zt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=a.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return a.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===zt(t.book)||zt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,l,c,i])}function Tr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Ot,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:zt(t)},(l,c)=>c+1).map(l=>n.jsx(Pt,{value:`${t} ${pe[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&l===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(l))??!1}),children:l},l))})})}function oi({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:l,onAddRecentSearch:c,id:d}){const w=lt(),[p,f]=a.useState(!1),[m,u]=a.useState(""),[g,v]=a.useState(""),[b,j]=a.useState("books"),[y,_]=a.useState(void 0),[E,V]=a.useState(!1),z=a.useRef(void 0),A=a.useRef(void 0),D=a.useRef(void 0),S=a.useRef(void 0),T=a.useRef({}),F=a.useCallback(M=>{e(M),c&&c(M)},[e,c]),L=a.useMemo(()=>o?o():lo,[o]),O=a.useMemo(()=>({[N.Section.OT]:L.filter(C=>it.Canon.isBookOT(C)),[N.Section.NT]:L.filter(C=>it.Canon.isBookNT(C)),[N.Section.DC]:L.filter(C=>it.Canon.isBookDC(C)),[N.Section.Extra]:L.filter(C=>it.Canon.extraBooks().includes(C))}),[L]),P=a.useMemo(()=>Object.values(O).flat(),[O]),U=a.useMemo(()=>{if(!g.trim())return O;const M={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach($=>{M[$]=O[$].filter(K=>Hn(K,g,s))}),M},[O,g,s]),I=a.useMemo(()=>ni(g,P,s),[g,P,s]),H=a.useCallback(()=>{I&&(F({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1}),f(!1),v(""),u(""))},[F,I]),_t=a.useCallback(M=>{if(zt(M)<=1){F({book:M,chapterNum:1,verseNum:1}),f(!1),v("");return}_(M),j("chapters")},[F]),Mt=a.useCallback(M=>{const C=b==="chapters"?y:I==null?void 0:I.book;C&&(F({book:C,chapterNum:M,verseNum:1}),f(!1),j("books"),_(void 0),v(""))},[F,b,y,I]),Rt=a.useCallback(M=>{F(M),f(!1),v("")},[F]),pt=ri(t,P,w,e),at=a.useCallback(()=>{j("books"),_(void 0),setTimeout(()=>{A.current&&A.current.focus()},0)},[]),G=a.useCallback(M=>{if(!M&&b==="chapters"){at();return}f(M),M&&(j("books"),_(void 0),v(""))},[b,at]),{otLong:tt,ntLong:et,dcLong:rt,extraLong:gt}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Yt=a.useCallback(M=>io(M,tt,et,rt,gt),[tt,et,rt,gt]),Ft=a.useCallback(M=>I?!!I.chapterNum&&!M.toString().includes(I.chapterNum.toString()):!1,[I]),Xt=a.useMemo(()=>N.formatScrRef(t,s?Ce(t.book,s):"English"),[t,s]),Ne=a.useCallback(M=>C=>{T.current[M]=C},[]),te=a.useCallback(M=>{(M.key==="Home"||M.key==="End")&&M.stopPropagation()},[]),Wt=a.useCallback(M=>{if(M.ctrlKey)return;const{isLetter:C,isDigit:$}=Rr(M.key);if(b==="chapters"){if(M.key==="Backspace"){M.preventDefault(),M.stopPropagation(),at();return}if(C||$){if(M.preventDefault(),M.stopPropagation(),j("books"),_(void 0),$&&y){const K=pe[y];v(`${K} ${M.key}`)}else v(M.key);setTimeout(()=>{A.current&&A.current.focus()},0);return}}if((b==="chapters"||b==="books"&&I)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(M.key)){const K=b==="chapters"?y:I==null?void 0:I.book;if(!K)return;const q=(()=>{if(!m)return 1;const ot=m.match(/(\d+)$/);return ot?parseInt(ot[1],10):0})(),nt=zt(K);if(!nt)return;let X=q;const ut=6;switch(M.key){case"ArrowLeft":q!==0&&(X=q>1?q-1:nt);break;case"ArrowRight":q!==0&&(X=q<nt?q+1:1);break;case"ArrowUp":X=q===0?nt:Math.max(1,q-ut);break;case"ArrowDown":X=q===0?1:Math.min(nt,q+ut);break;default:return}X!==q&&(M.preventDefault(),M.stopPropagation(),u(Pn(K,s,X)),setTimeout(()=>{const ot=T.current[X];ot&&ot.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,I,at,y,m,s]),Ae=a.useCallback(M=>{if(M.shiftKey||M.key==="Tab"||M.key===" ")return;const{isLetter:C,isDigit:$}=Rr(M.key);(C||$)&&(M.preventDefault(),v(K=>K+M.key),A.current.focus(),V(!1))},[]);return a.useLayoutEffect(()=>{const M=setTimeout(()=>{if(p&&b==="books"&&D.current&&S.current){const C=D.current,$=S.current,K=$.offsetTop,q=C.clientHeight,nt=$.clientHeight,X=K-q/2+nt/2;C.scrollTo({top:Math.max(0,X),behavior:"smooth"}),u(Pn(t.book))}},0);return()=>{clearTimeout(M)}},[p,b,g,I,t.book]),a.useLayoutEffect(()=>{if(b==="chapters"&&y){const M=y===t.book;setTimeout(()=>{if(D.current)if(M){const C=T.current[t.chapterNum];C&&C.scrollIntoView({block:"center",behavior:"smooth"})}else D.current.scrollTo({top:0});z.current&&z.current.focus()},0)}},[b,y,I,t.book,t.chapterNum]),n.jsxs(Ut,{open:p,onOpenChange:G,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(B,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Xt})})}),n.jsx(Lt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Kt,{ref:z,onKeyDown:Wt,loop:!0,value:m,onValueChange:u,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(xe,{ref:A,value:g,onValueChange:v,onKeyDown:te,onFocus:()=>V(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(uo,{recentSearches:l,onSearchItemSelect:Rt,renderItem:M=>N.formatScrRef(M,"English"),getItemKey:M=>`${M.book}-${M.chapterNum}-${M.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:pt.map(({onClick:M,disabled:C,title:$,icon:K})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{V(!0),M()},disabled:C,className:"tw-h-10 tw-w-4 tw-p-0",title:$,onKeyDown:Ae,children:n.jsx(K,{})},$))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:at,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),y&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ce(y,s)})]}),!E&&n.jsxs(qt,{ref:D,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!I&&Object.entries(U).map(([M,C])=>{if(C.length!==0)return n.jsx(Ot,{heading:Yt(M),children:C.map($=>n.jsx(co,{bookId:$,onSelect:K=>_t(K),section:N.getSectionForBook($),commandValue:`${$} ${pe[$]}`,ref:$===t.book?S:void 0,localizedBookNames:s},$))},M)}),I&&n.jsx(Ot,{children:n.jsx(Pt,{value:`${I.book} ${pe[I.book]} ${I.chapterNum||""}:${I.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:I.book,chapterNum:I.chapterNum??1,verseNum:I.verseNum??1},s?Un(I.book,s):void 0)},"top-match")}),I&&zt(I.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ce(I.book,s)}),n.jsx(Tr,{bookId:I.book,scrRef:t,onChapterSelect:Mt,setChapterRef:Ne,isChapterDimmed:Ft,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&y&&n.jsx(Tr,{bookId:y,scrRef:t,onChapterSelect:Mt,setChapterRef:Ne,className:"tw-p-4"})]})]})})]})}const si=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),ai=ie.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ct=a.forwardRef(({className:t,...e},r)=>n.jsx(Qr.Root,{ref:r,className:h("pr-twp",ai(),t),...e}));ct.displayName=Qr.Root.displayName;const un=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsx(ze.Root,{className:h("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});un.displayName=ze.Root.displayName;const Be=a.forwardRef(({className:t,...e},r)=>n.jsx(ze.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(ze.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Be.displayName=ze.Item.displayName;function ii(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function nn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:i,value:l,onChange:c=()=>{},getOptionLabel:d=ii,getButtonLabel:w,icon:p=void 0,buttonPlaceholder:f="",textPlaceholder:m="",commandEmptyMessage:u="No option found",buttonVariant:g="outline",alignDropDown:v="start",isDisabled:b=!1,ariaLabel:j,...y}){const[_,E]=a.useState(!1),V=w??d,z=D=>D.length>0&&typeof D[0]=="object"&&"options"in D[0],A=(D,S)=>{const T=d(D),F=typeof D=="object"&&"secondaryLabel"in D?D.secondaryLabel:void 0,L=`${S??""}${T}${F??""}`;return n.jsxs(Pt,{value:T,onSelect:()=>{c(D),E(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!l||d(l)!==T})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[T,F&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",F]})]})]},L)};return n.jsxs(Ut,{open:_,onOpenChange:E,...y,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(B,{variant:g,role:"combobox","aria-expanded":_,"aria-label":j,id:t,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:p}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:l?V(l):f})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:v,className:h("tw-w-[200px] tw-p-0",s),style:i,children:n.jsxs(Kt,{children:[n.jsx(xe,{placeholder:m,className:"tw-text-inherit"}),n.jsx(Ie,{children:u}),n.jsx(qt,{children:z(e)?e.map(D=>n.jsx(Ot,{heading:D.groupHeading,children:D.options.map(S=>A(S,D.groupHeading))},D.groupHeading)):e.map(D=>A(D))})]})})]})}function mo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const l=a.useMemo(()=>Array.from({length:i},(w,p)=>p+1),[i]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(ct,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(nn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(ct,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(nn,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const li=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),vn=(t,e)=>t[e]??e;function ci({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=vn(w,"%webView_bookSelector_currentBook%"),f=vn(w,"%webView_bookSelector_choose%"),m=vn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=a.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(un,{className:"pr-twp tw-flex",value:u,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{value:"current book"}),n.jsx(ct,{className:"tw-ms-1",children:p})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(mo,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{value:"choose books"}),n.jsx(ct,{className:"tw-ms-1",children:m})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:o.map(b=>it.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(B,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}const fo=a.createContext(null);function di(t,e){return{getTheme:function(){return e??null}}}function Ht(){const t=a.useContext(fo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const ho=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,wi=ho?a.useLayoutEffect:a.useEffect,Ze={tag:x.HISTORY_MERGE_TAG};function pi({initialConfig:t,children:e}){const r=a.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:l,editorState:c,html:d}=t,w=di(null,o),p=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:i,onError:f=>l(f,p),theme:o});return function(f,m){if(m!==null){if(m===void 0)f.update(()=>{const u=x.$getRoot();if(u.isEmpty()){const g=x.$createParagraphNode();u.append(g);const v=ho?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===f.getRootElement())&&g.select()}},Ze);else if(m!==null)switch(typeof m){case"string":{const u=f.parseEditorState(m);f.setEditorState(u,Ze);break}case"object":f.setEditorState(m,Ze);break;case"function":f.update(()=>{x.$getRoot().isEmpty()&&m(f)},Ze)}}}(p,c),[p,w]},[]);return wi(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(fo.Provider,{value:r,children:e})}const ui=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function mi({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Ht();return ui(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:l,prevEditorState:c,tags:d})=>{e&&i.size===0&&l.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const Wn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},ft=ue.Provider,yt=ue.Root,jt=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(ue.Trigger,{ref:o,className:e?h(Yn({variant:e}),t):t,...r}));jt.displayName=ue.Trigger.displayName;const ht=a.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(ue.Portal,{children:n.jsx(ue.Content,{ref:s,sideOffset:e,style:{zIndex:be,...r},className:h("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));ht.displayName=ue.Content.displayName;const Zn=[Dn.HeadingNode,x.ParagraphNode,x.TextNode,Dn.QuoteNode],fi=a.createContext(null),yn={didCatch:!1,error:null};class hi extends a.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=yn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),l=0;l<s;l++)i[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(yn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&gi(e.resetKeys,s)){var i,l;(i=(l=this.props).onReset)===null||i===void 0||i.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(yn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:l}=this.state;let c=e;if(i){const d={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=a.createElement(o,d);else if(s!==void 0)c=s;else throw l}return a.createElement(fi.Provider,{value:{didCatch:i,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function gi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function xi({children:t,onError:e}){return n.jsx(hi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const bi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function vi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function yi(){return function(t){const[e]=Ht(),r=a.useMemo(()=>t(e),[e,t]),[o,s]=a.useState(()=>r.initialValueFn()),i=a.useRef(o);return bi(()=>{const{initialValueFn:l,subscribe:c}=r,d=l();return i.current!==d&&(i.current=d,s(d)),c(w=>{i.current=w,s(w)})},[r,t]),o}(vi)}function ji(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,l=t.isBackward(),c=s.getNode(),d=i.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[f,m]=x.$getCharacterOffsets(t),u=c.is(d),g=e.is(l?d:c),v=e.is(l?c:d);let b,j=0;u?(j=f>m?m:f,b=f>m?f:m):g?(j=l?m:f,b=void 0):v&&(j=0,b=l?f:m);const y=e.__text.slice(j,b);y!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=y)}}return e}function Ni(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const go=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ki=go&&"documentMode"in document?document.documentMode:null;!(!go||!("InputEvent"in window)||ki)&&"getTargetRanges"in new window.InputEvent("input");function _i(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||Ni(4,t.__key),e}function Ci(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],l=i.getKey();if(r.has(l))continue;const c=x.$findMatchingParent(i,w=>x.$isElementNode(w)&&!w.isInline());if(c===null)continue;const d=c.getKey();c.canIndent()&&!r.has(d)&&(r.add(d),t(c))}return r.size>0}const Ei=Symbol.for("preact-signals");function mn(){if(ne>1)return void ne--;let t,e=!1;for(;Fe!==void 0;){let r=Fe;for(Fe=void 0,Ln++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&xo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Ln=0,ne--,e)throw t}function Si(t){if(ne>0)return t();ne++;try{return t()}finally{mn()}}let Y,Fe;function Mr(t){const e=Y;Y=void 0;try{return t()}finally{Y=e}}let ne=0,Ln=0,tn=0;function Dr(t){if(Y===void 0)return;let e=t.n;return e===void 0||e.t!==Y?(e={i:0,S:t,p:Y.s,n:void 0,t:Y,e:void 0,x:void 0,r:e},Y.s!==void 0&&(Y.s.n=e),Y.s=e,t.n=e,32&Y.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Y.s,e.n=void 0,Y.s.n=e,Y.s=e),e):void 0}function bt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Ge(t,e){return new bt(t,e)}function xo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Ir(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function bo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function de(t,e){bt.call(this,void 0),this.x=t,this.s=void 0,this.g=tn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Ri(t,e){return new de(t,e)}function vo(t){const e=t.u;if(t.u=void 0,typeof e=="function"){ne++;const r=Y;Y=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Jn(t),o}finally{Y=r,mn()}}}function Jn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,vo(t)}function Ti(t){if(Y!==this)throw new Error("Out-of-order effect");bo(this),Y=t,this.f&=-2,8&this.f&&Jn(this),mn()}function _e(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function oe(t,e){const r=new _e(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function fn(t,e={}){const r={};for(const o in t){const s=e[o],i=Ge(s===void 0?t[o]:s);r[o]=i}return r}bt.prototype.brand=Ei,bt.prototype.h=function(){return!0},bt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Mr(()=>{var r;(r=this.W)==null||r.call(this)}))},bt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Mr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},bt.prototype.subscribe=function(t){return oe(()=>{const e=this.value,r=Y;Y=void 0;try{t(e)}finally{Y=r}},{name:"sub"})},bt.prototype.valueOf=function(){return this.value},bt.prototype.toString=function(){return this.value+""},bt.prototype.toJSON=function(){return this.value},bt.prototype.peek=function(){const t=Y;Y=void 0;try{return this.value}finally{Y=t}},Object.defineProperty(bt.prototype,"value",{get(){const t=Dr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Ln>100)throw new Error("Cycle detected");this.v=t,this.i++,tn++,ne++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{mn()}}}}),de.prototype=new bt,de.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===tn))return!0;if(this.g=tn,this.f|=1,this.i>0&&!xo(this))return this.f&=-2,!0;const t=Y;try{Ir(this),Y=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Y=t,bo(this),this.f&=-2,!0},de.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}bt.prototype.S.call(this,t)},de.prototype.U=function(t){if(this.t!==void 0&&(bt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},de.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(de.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Dr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),_e.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},_e.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,vo(this),Ir(this),ne++;const t=Y;return Y=this,Ti.bind(this,t)},_e.prototype.N=function(){2&this.f||(this.f|=2,this.o=Fe,Fe=this)},_e.prototype.d=function(){this.f|=8,1&this.f||Jn(this)},_e.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return oe(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function yo(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function jo(t,e=yo){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({$onClear:yo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return oe(()=>jo(t,o.value))}});function Mi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const jn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class No extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:jn}]})}getFormat(){return x.$getState(this,jn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,jn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Di(t){return t instanceof No}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[No],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())Di(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function ko(t,e){let r;return Ge(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const $n=x.defineExtension({build:t=>ko(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function _o(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=_o(r[s],o[s]);return t}return e}const Qn=0,Fn=1,Co=2,Nn=3,Je=4,ke=5,kn=6,Pe=7;function _n(t){return t.id===Qn}function Eo(t){return t.id===Co}function Ii(t){return function(e){return e.id===Fn}(t)||W(305,String(t.id),String(Fn)),Object.assign(t,{id:Co})}const Oi=new Set;class Ai{constructor(e,r){xt(this,"builder");xt(this,"configs");xt(this,"_dependency");xt(this,"_peerNameSet");xt(this,"extension");xt(this,"state");xt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Qn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Eo(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,d,w){return Object.assign(c,{config:d,id:Nn,registerState:w})}(r,this.mergeConfigs(),o);let l;this.state=i,this.extension.init&&(l=this.extension.init(e,i.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Je,initResult:d,registerState:w})}(i,l,s)}build(e){const r=this.state;let o;r.id!==Je&&W(307,String(r.id),String(ke)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,l,c){return Object.assign(i,{id:ke,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==ke&&W(308,String(o.id),String(ke));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:kn})}(o),()=>{const i=this.state;i.id!==Pe&&W(309,String(o.id),String(Pe)),this.state=function(l){return Object.assign(l,{id:ke})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==kn&&W(310,String(r.id),String(kn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Pe})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=Je}(e)||W(313,String(e.id),String(Je)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=Nn}(e)||W(314,String(e.id),String(Nn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Pe}(e)||W(316,String(e.id),String(Pe)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Oi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=ke})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Or={tag:x.HISTORY_MERGE_TAG};function Pi(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Li=x.defineExtension({config:x.safeCast({setOptions:Or,updateOptions:Or}),init:({$initialEditorState:t=Pi})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const l=t.parseEditorState(i);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Ar=Symbol.for("@lexical/extension/LexicalBuilder");function Pr(){}function $i(t){throw t}function Qe(t){return Array.isArray(t)?t:[t]}const Cn="0.41.0+prod.esm";class Ve{constructor(e){xt(this,"roots");xt(this,"extensionNameMap");xt(this,"outgoingConfigEdges");xt(this,"incomingEdges");xt(this,"conflicts");xt(this,"_sortedExtensionReps");xt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Cn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Qe(Li)];for(const o of e)r.push(Qe(o));return new Ve(r)}static maybeFromEditor(e){const r=e[Ar];return r&&(r.PACKAGE_VERSION!==Cn&&W(292,r.PACKAGE_VERSION,Cn),r instanceof Ve||W(293)),r}static fromEditor(e){const r=Ve.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Ar]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Pr;function r(){try{e()}finally{e=Pr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=Qe(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new Ai(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&W(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Qe(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(Eo(i))return;const l=o.extension.name;var c;_n(i)||W(300,l,s||"[unknown]"),_n(c=i)||W(304,String(c.id),String(Qn)),i=Object.assign(c,{id:Fn}),o.state=i;const d=this.outgoingConfigEdges.get(l);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,l)}i=Ii(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())_n(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of i)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const l of s)i.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const l of r){const c=l.register(e,i);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(e.onError=f.onError),f.disableEvents!==void 0&&(e.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(e.parentEditor=f.parentEditor),f.editable!==void 0&&(e.editable=f.editable),f.namespace!==void 0&&(e.namespace=f.namespace),f.$initialEditorState!==void 0&&(e.$initialEditorState=f.$initialEditorState),f.nodes)for(const m of Mi(f)){if(typeof m!="function"){const u=o.get(m.replace);u&&W(302,f.name,m.replace.name,u.extension.name),o.set(m.replace,p)}r.add(m)}if(f.html){if(f.html.export)for(const[m,u]of f.html.export.entries())s.set(m,u);f.html.import&&Object.assign(i,f.html.import)}f.theme&&_o(l,f.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const d=Object.keys(i).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=i),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=$i),e}}const Fi=new Set,Lr=x.defineExtension({build(t,e,r){const o=r.getDependency($n).output,s=Ge({watchedNodeKeys:new Map}),i=ko(()=>{},()=>oe(()=>{const l=i.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const m=x.$getNodeByKey(p),u=m&&m.isSelected()||!1;w=w||u!==(!!l&&l.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&l&&d.size===l.size||(i.value=d)}));return{watchNodeKey:function(l){const c=Ri(()=>(i.value||Fi).has(l)),{watchedNodeKeys:d}=s.peek();let w=d.get(l);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(l,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[$n],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Re extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Re(e.__key)}static importJSON(e){return So().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Vi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Vi(){return{node:So()}}function So(){return x.$create(Re)}function zi(t){return t instanceof Re}x.defineExtension({dependencies:[$n,Lr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Re],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Lr).output,s=Ge({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(zi(c))return function(d,w=!1){const p=x.$getSelection(),f=d.isSelected(),m=d.getKey();let u;w&&x.$isNodeSelection(p)?u=p:(u=x.$createNodeSelection(),x.$setSelection(u)),f?u.delete(m):u.add(m)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Re,(l,c)=>{Si(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,f]of l.entries())if(f==="destroyed")w.delete(p),d=!0;else{const m=w.get(p),u=t.getElementByKey(p);m?m.domNode.value=u:(d=!0,w.set(p,{domNode:Ge(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),oe(()=>{const l=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())l.push(oe(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,i):x.removeClassNamesFromElement(w,i))}));return x.mergeRegister(...l)}))}});function Ro(t){return t.canBeEmpty()}function Bi(t,e,r=Ro){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(l){if(l.getNodes().filter(m=>x.$isBlockElementNode(m)&&m.canIndent()).length>0)return!0;const c=l.anchor,d=l.focus,w=d.isBefore(c)?d:c,p=w.getNode(),f=_i(p);if(f.canIndent()){const m=f.getKey();let u=x.$createRangeSelection();if(u.anchor.set(m,0,"element"),u.focus.set(m,0,"element"),u=x.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return Ci(l=>{if(i(l)){const c=l.getIndent()+1;(!o||c<o)&&l.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({$canIndent:Ro,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return oe(()=>{if(!o.value)return Bi(t,s,i)})}});const Gi=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ki(){return x.$getRoot().getTextContent()}function qi(t,e=!0){if(t)return!1;let r=Ki();return e&&(r=r.trim()),r===""}function Ui(t){if(!qi(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),l=i.length;for(let c=0;c<l;c++){const d=i[o];if(!x.$isTextNode(d))return!1}}}return!0}function To(t){return()=>Ui(t)}function Mo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let l;try{l=JSON.parse(i)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,f,m,u]=d;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),j=0,y=0;if(x.$isTextNode(b)&&w>=0&&p>=0&&(j=w,y=w+p,g.setTextNodeRange(b,j,b,y)),j===y&&f===""||(g.insertRawText(f),b=v.getNode()),x.$isTextNode(b)){j=m,y=m+u;const _=b.getTextContentSize();j=j>_?_:j,y=y>_?_:y,g.setTextNodeRange(b,j,b,y)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>fn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>oe(()=>r.getOutput().disabled.value?void 0:Mo(t))});function Hi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const tr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function Yi({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=a.useState(()=>r.getDecorators());return tr(()=>r.registerDecoratorListener(l=>{Sr.flushSync(()=>{i(l)})}),[r]),a.useEffect(()=>{i(r.getDecorators())},[r]),a.useMemo(()=>{const l=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:m=>r._onError(m),children:n.jsx(a.Suspense,{fallback:null,children:s[w]})}),f=r.getElementByKey(w);f!==null&&l.push(Sr.createPortal(p,f,w))}return l},[o,s,r])}(t,e)}function Xi({editor:t,ErrorBoundary:e}){return function(r){const o=Ve.maybeFromEditor(r);if(o&&o.hasExtensionByName(Gi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Hi(320,s);return!0}return!1}(t)?null:n.jsx(Yi,{editor:t,ErrorBoundary:e})}function $r(t){return t.getEditorState().read(To(t.isComposing()))}function Wi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Ht();return function(s){tr(()=>x.mergeRegister(Dn.registerRichText(s),Mo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Zi,{content:e}),n.jsx(Xi,{editor:o,ErrorBoundary:r})]})}function Zi({content:t}){const[e]=Ht(),r=function(s){const[i,l]=a.useState(()=>$r(s));return tr(()=>{function c(){const d=$r(s);l(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=yi();return r?typeof t=="function"?t(o):t:null}function Ji({defaultSelection:t}){const[e]=Ht();return a.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Qi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function tl({onClear:t}){const[e]=Ht();return Qi(()=>jo(e,t),[e,t]),null}const Do=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?a.useLayoutEffect:a.useEffect;function el({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:l,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:f,ariaRequired:m,autoCapitalize:u,className:g,id:v,role:b="textbox",spellCheck:j=!0,style:y,tabIndex:_,"data-testid":E,...V},z){const[A,D]=a.useState(t.isEditable()),S=a.useCallback(F=>{F&&F.ownerDocument&&F.ownerDocument.defaultView?t.setRootElement(F):t.setRootElement(null)},[t]),T=a.useMemo(()=>function(...F){return L=>{for(const O of F)typeof O=="function"?O(L):O!=null&&(O.current=L)}}(z,S),[S,z]);return Do(()=>(D(t.isEditable()),t.registerEditableListener(F=>{D(F)})),[t]),n.jsx("div",{"aria-activedescendant":A?e:void 0,"aria-autocomplete":A?r:"none","aria-controls":A?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":A&&b==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":A?f:void 0,"aria-readonly":!A||void 0,"aria-required":m,autoCapitalize:u,className:g,contentEditable:A,"data-testid":E,id:v,ref:T,role:b,spellCheck:j,style:y,tabIndex:_,...V})}const nl=a.forwardRef(el);function Fr(t){return t.getEditorState().read(To(t.isComposing()))}const rl=a.forwardRef(ol);function ol(t,e){const{placeholder:r,...o}=t,[s]=Ht();return n.jsxs(n.Fragment,{children:[n.jsx(nl,{editor:s,...o,ref:e}),r!=null&&n.jsx(sl,{editor:s,content:r})]})}function sl({content:t,editor:e}){const r=function(l){const[c,d]=a.useState(()=>Fr(l));return Do(()=>{function w(){const p=Fr(l);d(p)}return w(),x.mergeRegister(l.registerUpdateListener(()=>{w()}),l.registerEditableListener(()=>{w()}))},[l]),c}(e),[o,s]=a.useState(e.isEditable());if(a.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function al({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(rl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Io=a.createContext(void 0);function il({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const l=a.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Io.Provider,{value:l,children:i})}function Oo(){const t=a.useContext(Io);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function ll(){const[t,e]=a.useState(void 0),r=a.useCallback(()=>{e(void 0)},[]),o=a.useMemo(()=>{if(t===void 0)return;const{title:i,content:l}=t;return n.jsx(no,{open:!0,onOpenChange:r,children:n.jsxs(Bn,{children:[n.jsx(Gn,{children:n.jsx(Kn,{children:i})}),l]})})},[t,r]),s=a.useCallback((i,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:i})},[r]);return[o,s]}function cl({children:t}){const[e]=Ht(),[r,o]=a.useState(e),[s,i]=a.useState("paragraph"),[l,c]=ll(),d=()=>{};return a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(il,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:i,showModal:c,children:[l,t({blockType:s})]})}function dl(t){const[e]=Ht(),{activeEditor:r}=Oo();a.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),a.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Ao=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),wl=a.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(to.Root,{ref:s,className:h(Ao({variant:e,size:r,className:t})),...o}));wl.displayName=to.Root.displayName;const Po=a.createContext({size:"default",variant:"default"}),hn=a.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const l=lt();return n.jsx(pn.Root,{ref:i,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(Po.Provider,{value:{variant:e,size:r},children:o})})});hn.displayName=pn.Root.displayName;const Ee=a.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const l=a.useContext(Po);return n.jsx(pn.Item,{ref:i,className:h(Ao({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});Ee.displayName=pn.Item.displayName;const Vr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function pl(){const{activeEditor:t}=Oo(),[e,r]=a.useState([]),o=a.useCallback(s=>{if(x.$isRangeSelection(s)||Ma.$isTableSelection(s)){const i=[];Vr.forEach(({format:l})=>{s.hasFormat(l)&&i.push(l)}),r(l=>l.length!==i.length||!i.every(c=>l.includes(c))?i:l)}},[]);return dl(o),n.jsx(hn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Vr.map(({format:s,icon:i,label:l})=>n.jsx(Ee,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function ul({onClear:t}){const[e]=Ht();a.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function ml({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=a.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(cl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(pl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Wi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(al,{placeholder:t})}),ErrorBoundary:xi}),e&&n.jsx(Ji,{defaultSelection:"rootEnd"}),n.jsx(ul,{onClear:r}),n.jsx(tl,{})]})]})}const fl={namespace:"commentEditor",theme:Wn,nodes:Zn,onError:t=>{console.error(t)}};function rn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:l,className:c}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(pi,{initialConfig:{...fl,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(ft,{children:[n.jsx(ml,{placeholder:s,autoFocus:i,onClear:l}),n.jsx(mi,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function hl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!$o.has(i.nodeName)){const l=Fo(i,t,s,!1);l!==null&&(o=o.concat(l))}return function(i){for(const l of i)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of i){const c=l.getChildren();for(const d of c)l.insertBefore(d);l.remove()}}(s),o}function gl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)Lo(t,o[s],r,e);return r.innerHTML}function Lo(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=ji(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],d=x.getRegisteredNode(t,l.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,l):l.exportDOM(t);const{element:p,after:f}=w;if(!p)return!1;const m=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],v=Lo(t,g,m,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(m),r.append(p),f){const u=f.call(l,p);u&&(x.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(m);return s}const $o=new Set(["STYLE","SCRIPT"]);function Fo(t,e,r,o,s=new Map,i){let l=[];if($o.has(t.nodeName))return l;let c=null;const d=function(g,v){const{nodeName:b}=g,j=v._htmlConversions.get(b.toLowerCase());let y=null;if(j!==void 0)for(const _ of j){const E=_(g);E!==null&&(y===null||(y.priority||0)<=(E.priority||0))&&(y=E)}return y!==null?y.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,i),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const f=t.childNodes;let m=[];const u=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)m.push(...Fo(f[g],e,r,u,new Map(s),c));return p!=null&&(m=p(m)),x.isBlockDomNode(t)&&(m=xl(t,m,u?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?m.length>0?l=l.concat(m):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...m),l}function xl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const d=r();d.setFormat(o),d.append(...i),s.push(d),i=[]}}return s}function Vo(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function zo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:zo(e.children)):!1}function It(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?zo(t.root.children):!1}function bl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Wr.createHeadlessEditor({namespace:"EditorUtils",theme:Wn,nodes:Zn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=hl(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function on(t){const e=Wr.createHeadlessEditor({namespace:"EditorUtils",theme:Wn,nodes:Zn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=gl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function er(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function en(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function nr(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const vl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function En(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function yl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=a.useState(vl),[l,c]=a.useState(void 0),[d,w]=a.useState(!1),p=a.useRef(void 0),f=a.useRef(null);a.useEffect(()=>{let j=!0;const y=f.current;if(!y)return;const _=setTimeout(()=>{j&&Vo(y)},300);return()=>{j=!1,clearTimeout(_)}},[]);const m=a.useCallback(()=>{if(!It(s))return;const j=on(s);e(j,l)},[s,e,l]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(ht,{children:n.jsx("p",{children:v})})]})}),n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:m,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!It(s),children:n.jsx(k.Check,{})})}),n.jsx(ht,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Ut,{open:d,onOpenChange:w,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:En(l!==void 0?l:"",o)})]})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),w(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:t.map(j=>n.jsx(Pt,{onSelect:()=>{c(j===""?void 0:j),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:En(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):nr(j)&&(j.preventDefault(),j.stopPropagation(),It(s)&&m())},onKeyDown:j=>{er(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(rn,{editorSerializedState:s,onSerializedChange:j=>i(j),placeholder:u,onClear:j=>{p.current=j}})})]})}const jl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Nl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],kl=["input","select","textarea","button"],_l=["button","textbox"],Bo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=a.useRef(null),[i,l]=a.useState(void 0),[c,d]=a.useState(void 0),w=a.useCallback(u=>{l(u);const g=t.find(b=>b.id===u);g&&(e==null||e(g));const v=document.getElementById(u);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=a.useCallback(u=>{const g=t.find(v=>v.id===u);g&&(d(v=>v===u?void 0:u),r==null||r(g))},[r,t]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||kl.includes(g))return!0;const v=u.getAttribute("role");if(v&&_l.includes(v))return!0;const b=u.getAttribute("tabindex");return b!==void 0&&b!=="-1"},m=a.useCallback(u=>{var A;const g=u.target,v=D=>D?document.getElementById(D):void 0,b=v(c),j=v(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const D=t.find(S=>S.id===c);D&&w(D.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!b)return;const D=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(D.length===0)return;const S=D.findIndex(F=>F===g);if(S===-1)return;let T;u.key==="ArrowDown"?T=Math.min(S+1,D.length-1):T=Math.max(S-1,0),T!==S&&(u.preventDefault(),u.stopPropagation(),(A=D[T])==null||A.focus());return}return}const E=t.findIndex(D=>D.id===i);let V=E;switch(u.key){case"ArrowDown":V=Math.min(E+1,t.length-1),u.preventDefault();break;case"ArrowUp":V=Math.max(E-1,0),u.preventDefault();break;case"Home":V=0,u.preventDefault();break;case"End":V=t.length-1,u.preventDefault();break;case" ":case"Enter":i&&p(i),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const D=j;if(D){const S=D.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=D.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),F=S??T;if(F){u.preventDefault(),F.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const z=t[V];z&&w(z.id)},[t,w,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:m,focusOption:w}},Go=ie.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),me=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",Go({variant:e}),t),...r}));me.displayName="Badge";const rr=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));rr.displayName="Card";const Ko=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Ko.displayName="CardHeader";const qo=a.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));qo.displayName="CardTitle";const Uo=a.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Uo.displayName="CardDescription";const or=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",t),...e}));or.displayName="CardContent";const Ho=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Ho.displayName="CardFooter";const fe=a.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(eo.Root,{ref:s,decorative:r,orientation:e,className:h("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));fe.displayName=eo.Root.displayName;const sr=a.forwardRef(({className:t,...e},r)=>n.jsx(De.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));sr.displayName=De.Root.displayName;const Yo=a.forwardRef(({className:t,...e},r)=>n.jsx(De.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Yo.displayName=De.Image.displayName;const ar=a.forwardRef(({className:t,...e},r)=>n.jsx(De.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));ar.displayName=De.Fallback.displayName;const ir=a.createContext(void 0);function $t(){const t=a.useContext(ir);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Jt=ie.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ve=Z.Trigger,lr=Z.Group,Xo=Z.Portal,Wo=Z.Sub,Zo=Z.RadioGroup;function le({variant:t="default",...e}){const r=a.useMemo(()=>({variant:t}),[t]);return n.jsx(ir.Provider,{value:r,children:n.jsx(Z.Root,{...e})})}const cr=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=$t();return n.jsxs(Z.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Jt({variant:i.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});cr.displayName=Z.SubTrigger.displayName;const dr=a.forwardRef(({className:t,children:e,...r},o)=>{const s=lt();return n.jsx(Z.SubContent,{ref:o,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});dr.displayName=Z.SubContent.displayName;const Qt=a.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=lt();return n.jsx(Z.Portal,{children:n.jsx(Z.Content,{ref:s,sideOffset:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Qt.displayName=Z.Content.displayName;const Ke=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=lt(),i=$t();return n.jsx(Z.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Jt({variant:i.variant})),...r,dir:s})});Ke.displayName=Z.Item.displayName;const Gt=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=lt(),l=$t();return n.jsxs(Z.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:l.variant})),checked:r,...o,dir:i,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Gt.displayName=Z.CheckboxItem.displayName;const wr=a.forwardRef(({className:t,children:e,...r},o)=>{const s=lt(),i=$t();return n.jsxs(Z.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:i.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});wr.displayName=Z.RadioItem.displayName;const Oe=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Z.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Oe.displayName=Z.Label.displayName;const ye=a.forwardRef(({className:t,...e},r)=>n.jsx(Z.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ye.displayName=Z.Separator.displayName;function Jo({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Jo.displayName="DropdownMenuShortcut";function zr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:l,canEditOrDelete:c=!1}){const[d,w]=a.useState(!1),[p,f]=a.useState(),m=a.useRef(null);a.useEffect(()=>{if(!d)return;let E=!0;const V=m.current;if(!V)return;const z=setTimeout(()=>{E&&Vo(V)},300);return()=>{E=!1,clearTimeout(z)}},[d]);const u=a.useCallback(E=>{E&&E.stopPropagation(),w(!1),f(void 0),l==null||l(!1)},[l]),g=a.useCallback(async E=>{if(E&&E.stopPropagation(),!p||!s)return;await s(t.id,on(p))&&(w(!1),f(void 0),l==null||l(!1))},[p,s,t.id,l]),v=a.useMemo(()=>{const E=new Date(t.date),V=N.formatRelativeDate(E,r["%comment_date_today%"],r["%comment_date_yesterday%"]),z=E.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:V,time:z})},[t.date,r]),b=a.useMemo(()=>t.user,[t.user]),j=a.useMemo(()=>t.user.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2),[t.user]),y=a.useMemo(()=>N.sanitizeHtml(t.contents),[t.contents]),_=a.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ke,{onClick:E=>{E.stopPropagation(),w(!0),f(bl(t.contents)),l==null||l(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ke,{onClick:async E=>{E.stopPropagation(),i&&await i(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,l]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(sr,{className:"tw-h-8 tw-w-8",children:n.jsx(ar,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(me,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",en(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:m,onKeyDownCapture:E=>{E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),u()):nr(E)&&(E.preventDefault(),E.stopPropagation(),It(p)&&g())},onKeyDown:E=>{er(E),(E.key==="Enter"||E.key===" ")&&E.stopPropagation()},onClick:E=>{E.stopPropagation()},children:[n.jsx(rn,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:E=>f(E)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(B,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!It(p),children:n.jsx(k.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:y}})]})]}),_&&n.jsxs(le,{children:[n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Qt,{align:"end",children:_})]})]})}const Br={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Cl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:l,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:f,handleUpdateComment:m,handleDeleteComment:u,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:j,canUserResolveThreadCallback:y,canUserEditOrDeleteCommentCallback:_,isRead:E=!1,autoReadDelay:V=5,onVerseRefClick:z}){const[A,D]=a.useState(Br),[S,T]=a.useState(void 0),F=o,[L,O]=a.useState(!1),[P,U]=a.useState(!1),[I,H]=a.useState(!1),[_t,Mt]=a.useState(!1),[Rt,pt]=a.useState(!1),[at,G]=a.useState(E),[tt,et]=a.useState(!1),rt=a.useRef(void 0),[gt,Yt]=a.useState(new Map);a.useEffect(()=>{let R=!0;return(async()=>{const wt=y?await y(d):!1;R&&pt(wt)})(),()=>{R=!1}},[d,y]),a.useEffect(()=>{let R=!0;if(!o){Mt(!1),Yt(new Map);return}return(async()=>{const wt=j?await j(d):!1;R&&Mt(wt)})(),()=>{R=!1}},[o,d,j]);const Ft=a.useMemo(()=>e.filter(R=>!R.deleted),[e]);a.useEffect(()=>{let R=!0;if(!o||!_){Yt(new Map);return}return(async()=>{const wt=new Map;await Promise.all(Ft.map(async Er=>{const ja=await _(Er.id);R&&wt.set(Er.id,ja)})),R&&Yt(wt)})(),()=>{R=!1}},[o,Ft,_]);const Xt=a.useMemo(()=>Ft[0],[Ft]),Ne=a.useRef(null),te=a.useRef(void 0),Wt=a.useCallback(()=>{var R;(R=te.current)==null||R.call(te),D(Br)},[]),Ae=a.useCallback(()=>{const R=!at;G(R),et(!R),g==null||g(d,R)},[at,g,d]);a.useEffect(()=>{O(!1)},[o]),a.useEffect(()=>{if(o&&!at&&!tt){const R=setTimeout(()=>{G(!0),g==null||g(d,!0)},V*1e3);return rt.current=R,()=>clearTimeout(R)}rt.current&&(clearTimeout(rt.current),rt.current=void 0)},[o,at,tt,V,d,g]);const M=a.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),C=a.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const R=en(i,r);return N.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:R})},[i,r]),$=a.useMemo(()=>Ft.slice(1),[Ft]),K=a.useMemo(()=>$.length??0,[$.length]),q=a.useMemo(()=>K>0,[K]),nt=a.useMemo(()=>L||K<=2?$:$.slice(-2),[$,K,L]),X=a.useMemo(()=>L||K<=2?0:K-2,[K,L]),ut=a.useMemo(()=>K===1?M.singleReply:N.formatReplacementString(M.multipleReplies,{count:K}),[K,M]),ot=a.useMemo(()=>X===1?M.singleReply:N.formatReplacementString(M.multipleReplies,{count:X}),[X,M]);a.useEffect(()=>{!o&&P&&q&&U(!1)},[o,P,q]);const Ct=a.useCallback(async R=>{R&&R.stopPropagation();const mt=It(A)?on(A):void 0;if(S!==void 0){await f({threadId:d,contents:mt,assignedUser:S})&&(T(void 0),mt&&Wt());return}mt&&await f({threadId:d,contents:mt})&&Wt()},[Wt,A,f,S,d]),Dt=a.useCallback(async R=>{const mt=It(A)?on(A):void 0,wt=await f({...R,contents:mt,assignedUser:S??R.assignedUser});return wt&&mt&&Wt(),wt&&S!==void 0&&T(void 0),wt},[Wt,A,f,S]);return n.jsx(rr,{role:"option","aria-selected":o,id:d,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&at,"tw-bg-background":o&&p!=="Resolved"&&at,"tw-bg-muted":p==="Resolved","tw-bg-accent":!at&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(or,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[C&&n.jsx(me,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:C}),n.jsx(B,{variant:"ghost",size:"icon",onClick:R=>{R.stopPropagation(),Ae()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":at?"Mark as unread":"Mark as read",children:at?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),Rt&&p!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:R=>{R.stopPropagation(),Dt({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Ne,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":F},{"tw-whitespace-nowrap":!F}),children:[s&&z?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:R=>{R.stopPropagation(),z(w)},children:s}):s,n.jsxs("span",{className:t,children:[Xt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Xt.selectedText}),Xt.contextAfter]})]})}),n.jsx(zr,{comment:Xt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:Dt,handleUpdateComment:m,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!P&&gt.get(Xt.id))??!1,canUserResolveThread:Rt})]}),n.jsxs(n.Fragment,{children:[q&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(fe,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ut})]}),!o&&It(A)&&n.jsx(rn,{editorSerializedState:A,onSerializedChange:R=>D(R),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[X>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:R=>{R.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),R.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(fe,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ot}),L?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),nt.map(R=>n.jsx("div",{children:n.jsx(zr,{comment:R,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:m,handleDeleteComment:u,onEditingChange:U,canEditOrDelete:(!P&&gt.get(R.id))??!1})},R.id)),b!==!1&&(!P||It(A))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:R=>R.stopPropagation(),onKeyDownCapture:R=>{nr(R)&&(R.preventDefault(),R.stopPropagation(),(It(A)||S!==void 0)&&Ct())},onKeyDown:R=>{er(R),(R.key==="Enter"||R.key===" ")&&R.stopPropagation()},children:[n.jsx(rn,{editorSerializedState:A,onSerializedChange:R=>D(R),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:R=>{te.current=R}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:en(S,r)})}),n.jsxs(Ut,{open:I,onOpenChange:H,children:[n.jsx(Zt,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!_t||!v||v.length===0||!v.includes(l),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:R=>{R.key==="Escape"&&(R.stopPropagation(),H(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:v==null?void 0:v.map(R=>n.jsx(Pt,{onSelect:()=>{T(R!==i?R:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:en(R,r)})},R||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:Ct,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!It(A)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function El({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[j,y]=a.useState(new Set),[_,E]=a.useState();a.useEffect(()=>{g&&(y(O=>new Set(O).add(g)),E(g))},[g]);const V=r.filter(O=>O.comments.some(P=>!P.deleted)),z=V.map(O=>({id:O.id})),A=a.useCallback(O=>{y(P=>new Set(P).add(O.id)),E(O.id),v==null||v(O.id)},[v]),D=a.useCallback(O=>{const P=j.has(O);y(U=>{const I=new Set(U);return I.has(O)?I.delete(O):I.add(O),I}),E(O),v==null||v(P?void 0:O)},[j,v]),{listboxRef:S,activeId:T,handleKeyDown:F}=Bo({options:z,onOptionSelect:A}),L=a.useCallback(O=>{O.key==="Escape"?(_&&j.has(_)&&(y(P=>{const U=new Set(P);return U.delete(_),U}),E(void 0),v==null||v(void 0)),O.preventDefault(),O.stopPropagation()):F(O)},[_,j,F,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":T??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:L,children:V.map(O=>n.jsx("div",{id:O.id,className:h({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(Cl,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:D,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:i,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:m,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:b})},O.id))})}function Sl({table:t}){return n.jsxs(le,{children:[n.jsx(Zr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Qt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Oe,{children:"Toggle columns"}),n.jsx(ye,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Gt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const he=st.Root,Qo=st.Group,ge=st.Value,ts=ie.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),se=a.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=lt();return n.jsxs(st.Trigger,{className:h(ts({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(st.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});se.displayName=st.Trigger.displayName;const pr=a.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));pr.displayName=st.ScrollUpButton.displayName;const ur=a.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));ur.displayName=st.ScrollDownButton.displayName;const ae=a.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=lt();return n.jsx(st.Portal,{children:n.jsxs(st.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(pr,{}),n.jsx(st.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(ur,{})]})})});ae.displayName=st.Content.displayName;const es=a.forwardRef(({className:t,...e},r)=>n.jsx(st.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));es.displayName=st.Label.displayName;const Et=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(st.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(st.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(st.ItemText,{children:e})]}));Et.displayName=st.Item.displayName;const ns=a.forwardRef(({className:t,...e},r)=>n.jsx(st.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ns.displayName=st.Separator.displayName;function Rl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(he,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(se,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ge,{placeholder:t.getState().pagination.pageSize})}),n.jsx(ae,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Et,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Gr=`
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
`;function Tl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function qe(t,e){const r=e?`${Gr}, ${e}`:Gr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Tl(o))}const Ue=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=a.useRef(null);a.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),a.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{qe(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const i=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),qe(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ue.displayName="Table";const He=a.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));He.displayName="TableHeader";const Ye=a.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",t),...e}));Ye.displayName="TableBody";const rs=a.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));rs.displayName="TableFooter";function Ml(t){a.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?qe(t.current):[],i=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?i+1:i-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Dl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Il(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Bt=a.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const l=a.useRef(null);a.useEffect(()=>{typeof i=="function"?i(l.current):i&&"current"in i&&(i.current=l.current)},[i]),Ml(l);const c=a.useMemo(()=>l.current?qe(l.current):[],[l]),d=a.useCallback(p=>{const{current:f}=l;if(!f||!f.parentElement)return;const m=f.closest("table"),u=m?qe(m).filter(b=>b.tagName==="TR"):[],g=u.indexOf(f),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Il(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Dl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const b=f.closest("table");b&&b.focus()}e==null||e(p)},[l,c,e]),w=a.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:w,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Bt.displayName="TableRow";const Te=a.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Te.displayName="TableHead";const re=a.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));re.displayName="TableCell";const os=a.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));os.displayName="TableCaption";function sn({className:t,...e}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function ss({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:l=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var z;const[p,f]=a.useState([]),[m,u]=a.useState([]),[g,v]=a.useState({}),[b,j]=a.useState({}),y=a.useMemo(()=>e??[],[e]),_=vt.useReactTable({data:y,columns:t,getCoreRowModel:vt.getCoreRowModel(),...r&&{getPaginationRowModel:vt.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:vt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:vt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:j,state:{sorting:p,columnFilters:m,columnVisibility:g,rowSelection:b}}),E=_.getVisibleFlatColumns();let V;return d?V=Array.from({length:10}).map((S,T)=>`skeleton-row-${T}`).map(S=>n.jsx(Bt,{className:"hover:tw-bg-transparent",children:n.jsx(re,{colSpan:E.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(sn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},S)):((z=_.getRowModel().rows)==null?void 0:z.length)>0?V=_.getRowModel().rows.map(A=>n.jsx(Bt,{onClick:()=>l(A,_),"data-state":A.getIsSelected()&&"selected",children:A.getVisibleCells().map(D=>n.jsx(re,{children:vt.flexRender(D.column.columnDef.cell,D.getContext())},D.id))},A.id)):V=n.jsx(Bt,{children:n.jsx(re,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Sl,{table:_}),n.jsxs(Ue,{stickyHeader:i,children:[n.jsx(He,{stickyHeader:i,children:_.getHeaderGroups().map(A=>n.jsx(Bt,{children:A.headers.map(D=>n.jsx(Te,{className:"tw-p-0",children:D.isPlaceholder?void 0:vt.flexRender(D.column.columnDef.header,D.getContext())},D.id))},A.id))}),n.jsx(Ye,{children:V})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Rl,{table:_})]})}function Ol({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=a.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(La,{options:i,children:e})})}const as=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Kr=(t,e)=>t[e]??e;function is({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Kr(r,"%webView_error_dump_header%"),i=Kr(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Al=Object.freeze([...as,"%webView_error_dump_copied_message%"]);function Pl({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[l,c]=a.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(Ut,{onOpenChange:w,children:[n.jsx(Zt,{asChild:!0,children:o}),n.jsxs(Lt,{id:i,className:h("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(ct,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(is,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var ls=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(ls||{});function Ll({id:t,label:e,groups:r}){const[o,s]=a.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[i,l]=a.useState({}),c=(w,p)=>{const f=!o[w][p];s(u=>(u[w][p]=f,{...u}));const m=r[w].items[p];m.onUpdate(m.id,f)},d=(w,p)=>{l(m=>(m[w]=p,{...m}));const f=r[w].items.find(m=>m.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(le,{children:[n.jsx(ve,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Qt,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Oe,{children:w.label}),n.jsx(lr,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((f,m)=>n.jsx("div",{children:n.jsx(Gt,{checked:o[p][m],onCheckedChange:()=>c(p,m),children:f.label})},f.id))}):n.jsx(Zo,{value:i[p],onValueChange:f=>d(p,f),children:w.items.map(f=>n.jsx("div",{children:n.jsx(wr,{value:f.id,children:f.label})},f.id))})}),n.jsx(ye,{})]},w.label))})]})})}function $l({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:l,handleSupportLinkClick:c}){const d=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Fl({id:t,versionHistory:e}){const[r,o]=a.useState(!1),s=new Date;function i(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,f=w.getUTCMonth(),m=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:m===0?u="today":u=`${m.toString()} day${m===1?"":"s"} ago`,u}const l=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Vl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const l=a.useMemo(()=>N.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return w.map(f=>p.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Fl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function cs({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:m=!1,icon:u=void 0,className:g=void 0,variant:v="ghost",id:b}){const[j,y]=a.useState(!1),_=a.useCallback(T=>{var L;const F=(L=t.find(O=>O.label===T))==null?void 0:L.value;F&&r(e.includes(F)?e.filter(O=>O!==F):[...e,F])},[t,e,r]),E=()=>d||o,V=a.useMemo(()=>{if(!m)return t;const T=t.filter(L=>L.starred).sort((L,O)=>L.label.localeCompare(O.label)),F=t.filter(L=>!L.starred).sort((L,O)=>{const P=e.includes(L.value),U=e.includes(O.value);return P&&!U?-1:!P&&U?1:L.label.localeCompare(O.label)});return[...T,...F]},[t,e,m]),z=()=>{r(t.map(T=>T.value))},A=()=>{r([])},D=w??j,S=p??y;return n.jsx("div",{id:b,className:g,children:n.jsxs(Ut,{open:D,onOpenChange:S,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(B,{variant:v,role:"combobox","aria-expanded":D,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Kt,{children:[n.jsx(xe,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:z,children:i}),n.jsx(B,{variant:"ghost",size:"sm",onClick:A,children:l})]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:c}),n.jsx(Ot,{children:V.map(T=>n.jsxs(Pt,{value:T.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:h("tw-h-4 tw-w-4",e.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function zl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(cs,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:l,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(m=>{var u;return n.jsxs(me,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==m)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===m))==null?void 0:u.label]},m)})}):n.jsx(ct,{children:p})]})}const ds=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),qr=(t,e)=>t[e]??e;function ws({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:l="tw-h-6 tw-w-6",variant:c="ghost"}){const d=a.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:l,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(k.Undo,{})})}),n.jsx(ht,{children:n.jsxs("p",{children:[qr(s,"%undoButton_tooltip%"),i&&` (${d?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:l,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(k.Redo,{})})}),n.jsx(ht,{children:n.jsxs("p",{children:[qr(s,"%redoButton_tooltip%"),i&&` (${d?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function ps({children:t,editorRef:e}){const r=a.useRef(null);return a.useEffect(()=>{var l;const o=/Macintosh/i.test(navigator.userAgent),s=((l=r.current)==null?void 0:l.querySelector(".editor-input"))??void 0,i=c=>{var w,p,f,m;if(!s||document.activeElement!==s)return;const d=c.key.toLowerCase();if(o){if(!c.metaKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(w=e.current)==null||w.undo()):c.shiftKey&&d==="z"&&(c.preventDefault(),(p=e.current)==null||p.redo())}else{if(!c.ctrlKey)return;!c.shiftKey&&d==="z"?(c.preventDefault(),(f=e.current)==null||f.undo()):(d==="y"||c.shiftKey&&d==="z")&&(c.preventDefault(),(m=e.current)==null||m.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[e]),n.jsx("div",{ref:r,children:t})}const je=a.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));je.displayName="Input";const Bl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Gl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=a.useRef(null),l=a.useRef(null),c=a.useRef(!1),[d,w]=a.useState(t),[p,f]=a.useState(r),[m,u]=a.useState(!1);a.useEffect(()=>{w(t)},[t]),a.useEffect(()=>{p!==r&&f(r)},[r]);const g=b=>{c.current=!1,u(b),b||(d!=="custom"||p?(e(d),o(p)):(w(t),f(r)))},v=b=>{var j,y,_,E;b.stopPropagation(),document.activeElement===l.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((j=i.current)==null||j.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((y=l.current)==null||y.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((_=i.current)==null?void 0:_.selectionStart)===0&&((E=l.current)==null||E.focus(),c.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===l.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(le,{open:m,onOpenChange:g,children:[n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Bl(t,s,r)})})}),n.jsx(ht,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Qt,{style:{zIndex:Xn},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Oe,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ye,{}),n.jsx(Gt,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Tt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Gt,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Tt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Gt,{ref:l,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var j;b.stopPropagation(),c.current=!0,(j=i.current)==null||j.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(je,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>f(b.target.value)})]})})]})]})}const Kl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),ql=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Ul({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(le,{children:[n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(Xr.TooltipTrigger,{asChild:!0,children:n.jsx(ve,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Kl(t,r)})})}),n.jsx(ht,{children:n.jsx("p",{children:ql(t,r)})})]})}),n.jsxs(Qt,{style:{zIndex:Xn},children:[n.jsx(Oe,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ye,{}),n.jsxs(Gt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const us=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Hl({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function Ur({item:t,localizedStrings:e}){return n.jsxs(Pt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(Hl,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(ao,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function ms({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=a.useState(""),[i,l]=a.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const d=e.filter(p=>{var f;return(f=p.marker)==null?void 0:f.toLowerCase().includes(c)}),w=e.filter(p=>p.title.toLowerCase().includes(c)&&!d.includes(p));return[d,w]},[o,e]);return n.jsxs(Kt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(xe,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:t["%markerMenu_noResults%"]}),n.jsx(Ot,{children:i.map(c=>{var d;return n.jsx(Ur,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})}),l.length>0&&n.jsxs(n.Fragment,{children:[i.length>0&&n.jsx(qn,{alwaysRender:!0}),n.jsx(Ot,{children:l.map(c=>{var d;return n.jsx(Ur,{item:c,localizedStrings:t},`item-${c.marker??((d=c.icon)==null?void 0:d.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function Yl(t,e,r,o){if(!o||o==="p")return[];const s=N.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,l])=>{i.push(...l.map(c=>({marker:c,title:r[N.usfmMarkers[c].description]??N.usfmMarkers[c].description,action:()=>{var w;const d=t.current;(w=d==null?void 0:d.insertMarker)==null||w.call(d,c),e()}})))}),i.sort((l,c)=>(l.marker??l.title).localeCompare(c.marker??c.title))}function Xl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Wl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Zl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Jl({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:l,defaultMarkerMenuTrigger:c,localizedStrings:d,parentEditorRef:w}){const p=a.useRef(null),f=a.useRef(null),m=a.useRef(null),u=a.useRef(null);a.useLayoutEffect(()=>{if(!u.current)return;const{width:C}=u.current.getBoundingClientRect();C>0&&(u.current.style.width=`${C}px`)},[]);const[g,v]=a.useState("generated"),[b,j]=a.useState("*"),[y,_]=a.useState("f"),[E,V]=a.useState(!1),[z,A]=a.useState(!0),[D,S]=a.useState(!1),T=a.useRef(!1),F=a.useRef(""),[L,O]=a.useState(!1),[P,U]=a.useState(),[I,H]=a.useState(),[_t,Mt]=a.useState(),[Rt,pt]=a.useState(),at=a.useRef(null),G=a.useMemo(()=>({...l,markerMenuTrigger:c,hasExternalUI:!0,view:{...l.view??Tt.getDefaultViewOptions(),noteMode:"expanded"}}),[l,c]),tt=a.useMemo(()=>Yl(p,()=>O(!1),d,Rt),[d,Rt]);a.useEffect(()=>{var C;L||(C=p.current)==null||C.focus()},[y,L]),a.useEffect(()=>{var K,q;let C;T.current=!1,A(!0);const $=e==null?void 0:e.at(0);if($&&Tt.isInsertEmbedOpOfType("note",$)){const nt=(K=$.insert.note)==null?void 0:K.caller;let X="custom";nt===Tt.GENERATOR_NOTE_CALLER?X="generated":nt===Tt.HIDDEN_NOTE_CALLER?X="hidden":nt&&j(nt),v(X),_(((q=$.insert.note)==null?void 0:q.style)??"f"),C=setTimeout(()=>{var ut;(ut=p.current)==null||ut.applyUpdate([$])},0)}return()=>{C&&clearTimeout(C)}},[e,i]);const et=a.useCallback((C,$,K=!1)=>{var nt,X,ut;const q=(X=(nt=p.current)==null?void 0:nt.getNoteOps(0))==null?void 0:X.at(0);if(q&&Tt.isInsertEmbedOpOfType("note",q)){if(q.insert.note){let ot;C==="custom"?ot=$:C==="generated"?ot=Tt.GENERATOR_NOTE_CALLER:ot=Tt.HIDDEN_NOTE_CALLER,q.insert.note.caller=ot}r==null||r([q]),K&&w&&i&&((ut=w.current)==null||ut.replaceEmbedUpdate(i,[q]))}},[i,r,w]),rt=a.useCallback(()=>{et(g,b,!0),o()},[g,b,o,et]),gt=a.useRef(rt);a.useLayoutEffect(()=>{gt.current=rt});const Yt=a.useRef({book:s.book,chapterNum:s.chapterNum});a.useLayoutEffect(()=>{(Yt.current.book!==s.book||Yt.current.chapterNum!==s.chapterNum)&&(Yt.current={book:s.book,chapterNum:s.chapterNum},gt.current())},[s.book,s.chapterNum]);const Ft=()=>{var $;const C=($=f.current)==null?void 0:$.getElementsByClassName("editor-input")[0];C!=null&&C.textContent&&navigator.clipboard.writeText(C.textContent)},Xt=a.useCallback(C=>{v(C),et(C,b)},[b,et]),Ne=a.useCallback(C=>{j(C),et(g,C)},[g,et]),te=C=>{var K,q,nt,X,ut;_(C);const $=(q=(K=p.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Tt.isInsertEmbedOpOfType("note",$)){$.insert.note&&($.insert.note.style=C);const ot=(X=(nt=$.insert.note)==null?void 0:nt.contents)==null?void 0:X.ops;y!=="x"&&C==="x"?ot==null||ot.forEach(Ct=>Xl(Ct)):y==="x"&&C!=="x"&&(ot==null||ot.forEach(Ct=>Wl(Ct))),(ut=p.current)==null||ut.applyUpdate([$,{delete:1}])}},Wt=C=>{pt(C.contextMarker),S(C.canRedo)},Ae=a.useCallback(C=>{var K,q,nt,X,ut;const $=(q=(K=p.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Tt.isInsertEmbedOpOfType("note",$)){C.content.length>1&&setTimeout(()=>{var Dt;(Dt=p.current)==null||Dt.applyUpdate([{retain:2},{delete:1}])},0);const ot=(nt=$.insert.note)==null?void 0:nt.style,Ct=(ut=(X=$.insert.note)==null?void 0:X.contents)==null?void 0:ut.ops;if(ot||V(!1),V(ot==="x"?!!(Ct!=null&&Ct.every(Dt=>{var mt,wt;if(!((mt=Dt.attributes)!=null&&mt.char))return!0;const R=((wt=Dt.attributes)==null?void 0:wt.char).style;return R==="xt"||R==="xo"||R==="xq"})):!!(Ct!=null&&Ct.every(Dt=>{var mt,wt;if(!((mt=Dt.attributes)!=null&&mt.char))return!0;const R=((wt=Dt.attributes)==null?void 0:wt.char).style;return R==="ft"||R==="fr"||R==="fq"}))),!T.current){T.current=!0,F.current=JSON.stringify($),A(!0);return}A(JSON.stringify($)===F.current),et(g,b)}else V(!1),A(!0)},[g,b,et]),M=a.useCallback(()=>{const C=window.getSelection();if(m.current&&tt.length&&C&&C.rangeCount>0){const $=C.getRangeAt(0).getBoundingClientRect(),K=m.current.getBoundingClientRect();U($.left-K.left),H($.top-K.top),Mt($.height),O(!0)}},[tt,m]);return a.useEffect(()=>{const C=()=>{L&&O(!1)};return window.addEventListener("click",C),()=>{window.removeEventListener("click",C)}},[L]),a.useEffect(()=>{var C;L&&((C=at.current)==null||C.focus())},[L]),a.useEffect(()=>{var K;const C=((K=f.current)==null?void 0:K.querySelector(".editor-input"))??void 0,$=q=>{!L&&C&&document.activeElement===C&&q.key===c?(q.preventDefault(),M()):L&&q.key==="Escape"&&(q.preventDefault(),O(!1))};return document.addEventListener("keydown",$),()=>{document.removeEventListener("keydown",$)}},[L,M,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Ul,{isTypeSwitchable:E,noteType:y,handleNoteTypeChange:te,localizedStrings:d}),n.jsx(Gl,{callerType:g,updateCallerType:Xt,customCaller:b,updateCustomCaller:Ne,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(ws,{onUndoClick:()=>{var C;return(C=p.current)==null?void 0:C.undo()},onRedoClick:()=>{var C;return(C=p.current)==null?void 0:C.redo()},canUndo:!z,canRedo:D,localizedStrings:d}),n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:rt,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(k.Check,{})})}),n.jsx(ht,{children:n.jsx("p",{children:d["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(k.X,{})})}),n.jsx(ht,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:f,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ps,{editorRef:p,children:n.jsx(Tt.Editorial,{options:G,onStateChange:Wt,onUsjChange:Ae,defaultUsj:Zl,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsx(B,{onClick:Ft,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(ht,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:m,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Ut,{open:L,children:[n.jsx(po,{className:"tw-absolute",style:{top:I,left:P,height:_t,width:0,pointerEvents:"none"}}),n.jsx(Lt,{className:"tw-w-[500px] tw-p-0",onClick:C=>{C.preventDefault(),C.stopPropagation()},children:n.jsx(ms,{markerMenuItems:tt,localizedStrings:d,searchRef:at})})]})]})}const Ql=Object.freeze([...us,...Object.entries(N.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...ds]);function fs(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function tc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&i.push(l),l=[c]):l.push(c)}),l.length>0&&i.push(l),i.map((c,d)=>{const w=d===i.length-1;return n.jsxs("p",{children:[mr(t,c,r,!0,s),w&&o]},fs(t,c))})}function mr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const l=`${t}-text-${i.slice(0,10)}`;if(o){const c=h(`usfm_${t}`);return n.jsx("span",{className:c,children:i},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return ec(i,fs(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function ec(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),mr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function hs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),f=l&&n.jsxs(n.Fragment,{children:[mr(t.marker,[l],o,!1)," "]}),m=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=h(m,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[d,p]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:f}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:tc(t.marker,c,o,w)})})]})}function nc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??N.getFormatCallerFunction(r,void 0),f=(y,_)=>{w==null||w(y,_,s)},m=i?r.findIndex(y=>y===i):-1,[u,g]=a.useState(m),v=(y,_,E)=>{if(r.length)switch(y.key){case"Enter":case" ":y.preventDefault(),w==null||w(_,E,s);break}},b=y=>{if(r.length)switch(y.key){case"ArrowDown":y.preventDefault(),g(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":y.preventDefault(),g(_=>Math.max(_-1,0));break}},j=a.useRef([]);return a.useEffect(()=>{var y;u>=0&&u<j.current.length&&((y=j.current[u])==null||y.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((y,_)=>{const E=y===i,V=`${s}-${_}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:z=>{j.current[_]=z},role:"option","aria-selected":E,"data-marker":y.marker,"data-state":E?"selected":void 0,tabIndex:_===u?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>f(y,_),onKeyDown:z=>v(z,y,_),children:n.jsx(hs,{footnote:y,layout:o,formatCaller:()=>p(y.caller,_),showMarkers:l})},V),_<r.length-1&&o==="vertical"&&n.jsx(fe,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function rc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function oc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],l=a.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(Ue,{stickyHeader:!0,children:[n.jsx(He,{stickyHeader:!0,children:n.jsxs(Bt,{children:[n.jsx(Te,{children:s}),n.jsx(Te,{children:i})]})}),n.jsx(Ye,{children:l.length>0&&l.map(c=>n.jsxs(Bt,{onClick:()=>{e(c.reference)},children:[n.jsx(re,{children:N.formatScrRef(c.reference,"English")}),n.jsx(re,{className:o,children:rc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const gn=a.forwardRef(({className:t,...e},r)=>n.jsx(In.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(In.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));gn.displayName=In.Root.displayName;const sc=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Xe=(t,e,r)=>n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsxs(jt,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),sc(t.getIsSorted())]}),n.jsx(ht,{side:"bottom",children:e})]})}),ac=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Xe(e,t)}),ic=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Xe(r,t)}),lc=t=>({accessorKey:"count",header:({column:e})=>Xe(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),Sn=(t,e,r,o,s,i)=>{let l=[...r];t.forEach(d=>{e==="approved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),o(l);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),i(c)},cc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Xe(i,t,"tw-justify-center"),cell:({row:i})=>{const l=i.getValue("status"),c=i.getValue("item");return n.jsxs(hn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Ee,{onClick:d=>{d.stopPropagation(),Sn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(Ee,{onClick:d=>{d.stopPropagation(),Sn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(Ee,{onClick:d=>{d.stopPropagation(),Sn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),dc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),wc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},pc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},gs=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",uc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),mc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},fc=(t,e,r)=>t.map(o=>{const s=N.isString(o.key)?o.key:o.key[0];return{items:N.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||gs(s,e,r),occurrences:o.occurrences||[]}}),Vt=(t,e)=>t[e]??e;function hc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:l,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:f,onItemSelected:m}){const u=Vt(r,"%webView_inventory_all%"),g=Vt(r,"%webView_inventory_approved%"),v=Vt(r,"%webView_inventory_unapproved%"),b=Vt(r,"%webView_inventory_unknown%"),j=Vt(r,"%webView_inventory_scope_currentBook%"),y=Vt(r,"%webView_inventory_scope_chapter%"),_=Vt(r,"%webView_inventory_scope_verse%"),E=Vt(r,"%webView_inventory_filter_text%"),V=Vt(r,"%webView_inventory_show_additional_items%"),z=Vt(r,"%webView_inventory_no_results%"),[A,D]=a.useState(!1),[S,T]=a.useState("all"),[F,L]=a.useState(""),[O,P]=a.useState([]),U=a.useMemo(()=>{const G=t??[];return G.length===0?[]:fc(G,s,i)},[t,s,i]),I=a.useMemo(()=>{if(A)return U;const G=[];return U.forEach(tt=>{const et=tt.items[0],rt=G.find(gt=>gt.items[0]===et);rt?(rt.count+=tt.count,rt.occurrences=rt.occurrences.concat(tt.occurrences)):G.push({items:[et],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),G},[A,U]),H=a.useMemo(()=>I.length===0?[]:mc(I,S,F),[I,S,F]),_t=a.useMemo(()=>{var et,rt;if(!A)return d;const G=(et=o==null?void 0:o.tableHeaders)==null?void 0:et.length;if(!G)return d;const tt=[];for(let gt=0;gt<G;gt++)tt.push(ic(((rt=o==null?void 0:o.tableHeaders)==null?void 0:rt[gt])||"Additional Item",gt+1));return[...tt,...d]},[o==null?void 0:o.tableHeaders,d,A]);a.useEffect(()=>{H.length===0?P([]):H.length===1&&P(H[0].items)},[H]);const Mt=(G,tt)=>{tt.setRowSelection(()=>{const rt={};return rt[G.index]=!0,rt});const et=G.original.items;P(et),m&&et.length>0&&m(et[0])},Rt=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},pt=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")T(G);else throw new Error(`Invalid status filter value: ${G}`)},at=a.useMemo(()=>{if(I.length===0||O.length===0)return[];const G=I.filter(tt=>N.deepEqual(A?tt.items:[tt.items[0]],O));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[O,A,I]);return n.jsx("div",{id:w,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(he,{onValueChange:G=>pt(G),defaultValue:S,children:[n.jsx(se,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(ge,{placeholder:"Select filter"})}),n.jsxs(ae,{children:[n.jsx(Et,{value:"all",children:u}),n.jsx(Et,{value:"approved",children:g}),n.jsx(Et,{value:"unapproved",children:v}),n.jsx(Et,{value:"unknown",children:b})]})]}),n.jsxs(he,{onValueChange:G=>Rt(G),defaultValue:l,children:[n.jsx(se,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(ge,{placeholder:"Select scope"})}),n.jsxs(ae,{children:[n.jsx(Et,{value:"book",children:j}),n.jsx(Et,{value:"chapter",children:y}),n.jsx(Et,{value:"verse",children:_})]})]}),n.jsx(je,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:E,value:F,onChange:G=>{L(G.target.value)}}),o&&n.jsx(ft,{children:n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(gn,{className:"tw-m-1 tw-flex-shrink-0",checked:A,onCheckedChange:G=>{D(G)}}),n.jsx(ct,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??V})]})}),n.jsx(ht,{children:(o==null?void 0:o.checkboxText)??V})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(ss,{columns:_t,data:H,onRowClickHandler:Mt,stickyHeader:!0,isLoading:p,noResultsMessage:z})}),at.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(oc,{classNameForText:f,occurrenceData:at,setScriptureReference:e,localizedStrings:r})})]})})}const gc="16rem",xc="3rem",xs=a.createContext(void 0);function We(){const t=a.useContext(xs);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const fr=a.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:l="primary",...c},d)=>{const[w,p]=a.useState(t),f=e??w,m=a.useCallback(_=>{const E=typeof _=="function"?_(f):_;r?r(E):p(E)},[r,f]),u=a.useCallback(()=>m(_=>!_),[m]),g=f?"expanded":"collapsed",j=lt()==="ltr"?l:l==="primary"?"secondary":"primary",y=a.useMemo(()=>({state:g,open:f,setOpen:m,toggleSidebar:u,side:j}),[g,f,m,u,j]);return n.jsx(xs.Provider,{value:y,children:n.jsx(ft,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":gc,"--sidebar-width-icon":xc,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:i})})})});fr.displayName="SidebarProvider";const hr=a.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const l=We();return e==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});hr.displayName="Sidebar";const bs=a.forwardRef(({className:t,onClick:e,...r},o)=>{const s=We();return n.jsxs(B,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});bs.displayName="SidebarTrigger";const vs=a.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=We();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});vs.displayName="SidebarRail";const gr=a.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));gr.displayName="SidebarInset";const ys=a.forwardRef(({className:t,...e},r)=>n.jsx(je,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ys.displayName="SidebarInput";const js=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));js.displayName="SidebarHeader";const Ns=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Ns.displayName="SidebarFooter";const ks=a.forwardRef(({className:t,...e},r)=>n.jsx(fe,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));ks.displayName="SidebarSeparator";const xr=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));xr.displayName="SidebarContent";const an=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));an.displayName="SidebarGroup";const ln=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Me.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});ln.displayName="SidebarGroupLabel";const _s=a.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Me.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});_s.displayName="SidebarGroupAction";const cn=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",t),...e}));cn.displayName="SidebarGroupContent";const br=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));br.displayName="SidebarMenu";const vr=a.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",t),...e}));vr.displayName="SidebarMenuItem";const bc=ie.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),yr=a.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...l},c)=>{const d=t?Me.Slot:"button",{state:w}=We(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:h(bc({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:p}),n.jsx(ht,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});yr.displayName="SidebarMenuButton";const Cs=a.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Me.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Cs.displayName="SidebarMenuAction";const Es=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Es.displayName="SidebarMenuBadge";const Ss=a.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=a.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(sn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(sn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Ss.displayName="SidebarMenuSkeleton";const Rs=a.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Rs.displayName="SidebarMenuSub";const Ts=a.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Ts.displayName="SidebarMenuSubItem";const Ms=a.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const l=t?Me.Slot:"a";return n.jsx(l,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Ms.displayName="SidebarMenuSubButton";function Ds({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:d}){const w=a.useCallback((m,u)=>{o(m,u)},[o]),p=a.useCallback(m=>{const u=r.find(g=>g.projectId===m);return u?u.projectName:m},[r]),f=a.useCallback(m=>!s.projectId&&m===s.label,[s]);return n.jsx(hr,{id:t,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(xr,{children:[n.jsxs(an,{children:[n.jsx(ln,{className:"tw-text-sm",children:i}),n.jsx(cn,{children:n.jsx(br,{children:Object.entries(e).map(([m,u])=>n.jsx(vr,{children:n.jsx(yr,{onClick:()=>w(m),isActive:f(m),children:n.jsx("span",{className:"tw-pl-3",children:u})})},m))})})]}),n.jsxs(an,{children:[n.jsx(ln,{className:"tw-text-sm",children:l}),n.jsx(cn,{className:"tw-pl-3",children:n.jsx(nn,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:wo},options:r.flatMap(m=>m.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:m=>{const u=p(m);w(u,m)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const xn=a.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:l},c)=>{const d=lt();return n.jsxs("div",{id:l,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(je,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:i}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});xn.displayName="SearchBar";function vc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(xn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(fr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ds,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(gr,{className:"tw-min-w-[215px]",children:o})]})]})}const ee="scrBook",yc="scrRef",we="source",jc="details",Nc="Scripture Reference",kc="Scripture Book",Is="Type",_c="Details";function Cc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:ee,header:(t==null?void 0:t.scriptureReferenceColumnName)??Nc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?it.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===ee?N.formatScrRef(s.start):void 0},getGroupingValue:o=>it.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:yc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:we,header:r?(t==null?void 0:t.typeColumnName)??Is:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:jc,header:(t==null?void 0:t.detailsColumnName)??_c,cell:o=>o.getValue(),enableGrouping:!1}]}const Ec=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||N.compareScrRefs(t.start,t.end)===0?`${N.scrRefToBBBCCCVVV(t.start)}+${e}`:`${N.scrRefToBBBCCCVVV(t.start)}+${e}-${N.scrRefToBBBCCCVVV(t.end)}+${r}`},Hr=t=>`${Ec({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Sc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:l,onRowSelected:c,id:d}){const[w,p]=a.useState([]),[f,m]=a.useState([{id:ee,desc:!1}]),[u,g]=a.useState({}),v=a.useMemo(()=>t.flatMap(S=>S.data.map(T=>({...T,source:S.source}))),[t]),b=a.useMemo(()=>Cc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:l},r),[o,i,l,r]);a.useEffect(()=>{w.includes(we)?m([{id:we,desc:!1},{id:ee,desc:!1}]):m([{id:ee,desc:!1}])},[w]);const j=vt.useReactTable({data:v,columns:b,state:{grouping:w,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:m,onRowSelectionChange:g,getExpandedRowModel:vt.getExpandedRowModel(),getGroupedRowModel:vt.getGroupedRowModel(),getCoreRowModel:vt.getCoreRowModel(),getSortedRowModel:vt.getSortedRowModel(),getRowId:Hr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});a.useEffect(()=>{if(c){const S=j.getSelectedRowModel().rowsById,T=Object.keys(S);if(T.length===1){const F=v.find(L=>Hr(L)===T[0])||void 0;F&&c(F)}}},[u,v,c,j]);const y=s??kc,_=i??Is,E=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[ee]},{label:`Group by ${_}`,value:[we]},{label:`Group by ${y} and ${_}`,value:[ee,we]},{label:`Group by ${_} and ${y}`,value:[we,ee]}],V=S=>{p(JSON.parse(S))},z=(S,T)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(T)},A=(S,T)=>S.getIsGrouped()?"":h("banded-row",T%2===0?"even":"odd"),D=(S,T,F)=>{if(!((S==null?void 0:S.length)===0||T.depth<F.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(he,{value:JSON.stringify(w),onValueChange:S=>{V(S)},children:[n.jsx(se,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ge,{})}),n.jsx(ae,{position:"item-aligned",children:n.jsx(Qo,{children:E.map(S=>n.jsx(Et,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),n.jsxs(Ue,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(He,{children:j.getHeaderGroups().map(S=>n.jsx(Bt,{children:S.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(Te,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",vt.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},S.id))}),n.jsx(Ye,{children:j.getRowModel().rows.map((S,T)=>{const F=lt();return n.jsx(Bt,{"data-state":S.getIsSelected()?"selected":"",className:h(A(S,T)),onClick:L=>z(S,L),children:S.getVisibleCells().map(L=>{if(!(L.getIsPlaceholder()||L.column.columnDef.enableGrouping&&!L.getIsGrouped()&&(L.column.columnDef.id!==we||!r)))return n.jsx(re,{className:h(L.column.columnDef.id,"tw-p-[1px]",D(w,S,L)),children:L.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!S.getIsExpanded()&&(F==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",vt.flexRender(L.column.columnDef.cell,L.getContext())," (",S.subRows.length,")"]}):vt.flexRender(L.column.columnDef.cell,L.getContext())},L.id)})},S.id)})})]})]})}const jr=(t,e)=>t.filter(r=>{try{return N.getSectionForBook(r)===e}catch{return!1}}),Os=(t,e,r)=>jr(t,e).every(o=>r.includes(o));function Rc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=jr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:h(Os(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Za(t,l,c,d,w)})}const Yr=5,Rn=6;function Tc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:m,ntLong:u,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,j]=a.useState(!1),[y,_]=a.useState(""),E=a.useRef(void 0),V=a.useRef(!1);if(t.length!==it.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const z=a.useMemo(()=>it.Canon.allBookIds.filter((P,U)=>t[U]==="1"&&!it.Canon.isObsolete(it.Canon.bookIdToNumber(P))),[t]),A=a.useMemo(()=>{if(!y.trim()){const I={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return z.forEach(H=>{const _t=N.getSectionForBook(H);I[_t].push(H)}),I}const P=z.filter(I=>Hn(I,y,s)),U={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return P.forEach(I=>{const H=N.getSectionForBook(I);U[H].push(I)}),U},[z,y,s]),D=a.useCallback((P,U=!1)=>{if(!U||!E.current){r(e.includes(P)?e.filter(pt=>pt!==P):[...e,P]),E.current=P;return}const I=z.findIndex(pt=>pt===E.current),H=z.findIndex(pt=>pt===P);if(I===-1||H===-1)return;const[_t,Mt]=[Math.min(I,H),Math.max(I,H)],Rt=z.slice(_t,Mt+1).map(pt=>pt);r(e.includes(P)?e.filter(pt=>!Rt.includes(pt)):[...new Set([...e,...Rt])])},[e,r,z]),S=P=>{D(P,V.current),V.current=!1},T=(P,U)=>{P.preventDefault(),D(U,P.shiftKey)},F=a.useCallback(P=>{const U=jr(z,P).map(I=>I);r(Os(z,P,e)?e.filter(I=>!U.includes(I)):[...new Set([...e,...U])])},[e,r,z]),L=()=>{r(z.map(P=>P))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(P=>n.jsx(Rc,{section:P,availableBookIds:z,selectedBookIds:e,onToggle:F,localizedStrings:o},P))}),n.jsxs(Ut,{open:b,onOpenChange:P=>{j(P),P||_("")},children:[n.jsx(Zt,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:l,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Kt,{shouldFilter:!1,onKeyDown:P=>{P.key==="Enter"&&(V.current=P.shiftKey)},children:[n.jsx(xe,{placeholder:c,value:y,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:L,children:d}),n.jsx(B,{variant:"ghost",size:"sm",onClick:O,children:w})]}),n.jsxs(qt,{children:[n.jsx(Ie,{children:p}),Object.values(N.Section).map((P,U)=>{const I=A[P];if(I.length!==0)return n.jsxs(a.Fragment,{children:[n.jsx(Ot,{heading:io(P,m,u,g,v),children:I.map(H=>n.jsx(co,{bookId:H,isSelected:e.includes(H),onSelect:()=>S(H),onMouseDown:_t=>T(_t,H),section:N.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:Pn(H,s),className:"tw-flex tw-items-center"},H))}),U<Object.values(N.Section).length-1&&n.jsx(qn,{})]},P)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Rn?Rn:Yr).map(P=>n.jsx(me,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ce(P,s)},P)),e.length>Rn&&n.jsx(me,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Yr} ${f}`})]})]})}const Mc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),ce=(t,e)=>t[e]??e;function Dc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:l,localizedBookNames:c,id:d}){const w=ce(l,"%webView_scope_selector_selected_text%"),p=ce(l,"%webView_scope_selector_current_verse%"),f=ce(l,"%webView_scope_selector_current_chapter%"),m=ce(l,"%webView_scope_selector_current_book%"),u=ce(l,"%webView_scope_selector_choose_books%"),g=ce(l,"%webView_scope_selector_scope%"),v=ce(l,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],j=e?b.filter(y=>e.includes(y.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:g}),n.jsx(un,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:y,label:_,id:E})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Be,{className:"tw-me-2",value:y,id:E}),n.jsx(ct,{htmlFor:E,children:_})]},E))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:v}),n.jsx(Tc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:l,localizedBookNames:c})]})]})}const Tn={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Ic({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:l}){const c={...Tn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Tn?Tn[w]:p]))},d=lt();return n.jsxs(he,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(se,{size:s,className:h("pr-twp tw-w-auto",i),children:n.jsx(ge,{placeholder:c[N.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(ae,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:be},children:t.map(w=>n.jsx(Et,{value:`${w}`,children:c[N.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Oc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function Ac({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Pc({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(fe,{}):""]})}function As(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function dn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Ps=(t,e,r,o)=>r?Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:"command"in c?n.jsxs(Ke,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(dn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(dn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Wo,{children:[n.jsx(cr,{children:c.label}),n.jsx(Xo,{children:n.jsx(dr,{children:Ps(t,e,As(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(ht,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function wn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:l="ghost",id:c}){return n.jsxs(le,{variant:i,children:[n.jsx(ve,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(B,{variant:l,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Qt,{align:"start",style:{zIndex:be},children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(a.Fragment,{children:[n.jsx(lr,{children:n.jsx(ft,{children:Ps(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(ye,{})]},d))})]})}const Ls=a.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Lc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Ls,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(wn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(wn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function $c({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Ls,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(wn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Nr=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsx(kt.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Nr.displayName=kt.List.displayName;const kr=a.forwardRef(({className:t,...e},r)=>n.jsx(kt.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));kr.displayName=kt.List.displayName;const $s=a.forwardRef(({className:t,...e},r)=>n.jsx(kt.Trigger,{ref:r,...e,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),_r=a.forwardRef(({className:t,...e},r)=>n.jsx(kt.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));_r.displayName=kt.Content.displayName;function Fc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(xn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Nr,{children:[n.jsx(kr,{children:t.map(c=>n.jsx($s,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(_r,{value:c.value,children:c.content},c.key))]})]})}function Vc({...t}){return n.jsx(J.Menu,{...t})}function zc({...t}){return n.jsx(J.Sub,{"data-slot":"menubar-sub",...t})}const Fs=a.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=a.useMemo(()=>({variant:e}),[e]);return n.jsx(ir.Provider,{value:s,children:n.jsx(J.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Fs.displayName=J.Root.displayName;const Vs=a.forwardRef(({className:t,...e},r)=>{const o=$t();return n.jsx(J.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Jt({variant:o.variant,className:t})),...e})});Vs.displayName=J.Trigger.displayName;const zs=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=$t();return n.jsxs(J.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Jt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});zs.displayName=J.SubTrigger.displayName;const Bs=a.forwardRef(({className:t,...e},r)=>{const o=$t();return n.jsx(J.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Bs.displayName=J.SubContent.displayName;const Gs=a.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const l=$t();return n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Gs.displayName=J.Content.displayName;const Ks=a.forwardRef(({className:t,inset:e,...r},o)=>{const s=$t();return n.jsx(J.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Jt({variant:s.variant,className:t}),t),...r})});Ks.displayName=J.Item.displayName;const Bc=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=$t();return n.jsxs(J.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Bc.displayName=J.CheckboxItem.displayName;const Gc=a.forwardRef(({className:t,children:e,...r},o)=>{const s=$t();return n.jsxs(J.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Gc.displayName=J.RadioItem.displayName;const Kc=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Kc.displayName=J.Label.displayName;const qs=a.forwardRef(({className:t,...e},r)=>n.jsx(J.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));qs.displayName=J.Separator.displayName;const Le=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Us=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,l])=>"column"in l&&l.column===r||i===r).sort(([,i],[,l])=>i.order-l.order);return s.flatMap(([i],l)=>{const c=e.filter(w=>w.group===i).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(yt,{children:[n.jsx(jt,{asChild:!0,children:"command"in w?n.jsxs(Ks,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(dn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(dn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(zc,{children:[n.jsx(zs,{children:w.label}),n.jsx(Bs,{children:Us(t,e,As(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(ht,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&l<s.length-1&&d.push(n.jsx(qs,{},`separator-${i}`)),d})};function qc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=a.useRef(void 0),i=a.useRef(void 0),l=a.useRef(void 0),c=a.useRef(void 0),d=a.useRef(void 0),w=p=>{switch(p){case"platform.app":return i;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return d;default:return}};if(za.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,v,b,j;p.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Le(i,[m]);break;case"alt+p":(g=i.current)==null||g.focus(),Le(i,[m,u]);break;case"alt+l":(v=l.current)==null||v.focus(),Le(l,[m,u]);break;case"alt+n":(b=c.current)==null||b.focus(),Le(c,[m,u]);break;case"alt+h":(j=d.current)==null||j.focus(),Le(d,[m,u]);break}}),a.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Fs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(Vc,{children:[n.jsx(Vs,{ref:w(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(Gs,{style:{zIndex:be},children:n.jsx(ft,{children:Us(t.groups,t.items,p,e)})})]},p))})}function Uc(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Hc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=a.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(qc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Yc=(t,e)=>t[e]??e;function Xc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:l,className:c,id:d}){const w=Yc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=a.useState(!1),m=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),i&&r.find(v=>v===g)&&i([...r.filter(v=>v!==g)]),f(!1)},u=(g,v)=>{var j,y,_,E,V,z;const b=v!==g?((y=(j=t[g])==null?void 0:j.uiNames)==null?void 0:y[v])??((E=(_=t[g])==null?void 0:_.uiNames)==null?void 0:E.en):void 0;return b?`${(V=t[g])==null?void 0:V.autonym} (${b})`:(z=t[g])==null?void 0:z.autonym};return n.jsxs("div",{id:d,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(he,{name:"uiLanguage",value:e,onValueChange:m,open:p,onOpenChange:g=>f(g),children:[n.jsx(se,{children:n.jsx(ge,{})}),n.jsx(ae,{style:{zIndex:be},children:Object.keys(t).map(g=>n.jsx(Et,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(ct,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Wc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(ct,{children:e(t)}):r?n.jsx(ct,{children:r(t)}):n.jsx(ct,{children:t})}function Zc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(gn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Wc,{item:c,createLabel:i,createComplexLabel:l})]},c))})}function Jc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:l,selectedButtons:c,hoverButtons:d,dropdownContent:w,additionalContent:p,accentColor:f,showDropdownOnHover:m=!1}){const u=g=>{if(g.key==="Enter"||g.key===" "){if(g.target!==g.currentTarget)return;g.preventDefault(),r()}};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c,!e&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:d}),w&&(e||m)&&n.jsx("div",{className:h(!e&&m&&"tw-invisible group-hover:tw-visible"),children:n.jsxs(le,{children:[n.jsx(ve,{className:h(f&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",onClick:g=>g.stopPropagation(),onFocus:g=>g.stopPropagation(),children:n.jsx(k.MoreVertical,{})})}),n.jsx(Qt,{align:"end",children:w})]})})]}),p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),f&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${f}`})]},t)}const Hs=a.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:h("tw-animate-spin",t),...e,ref:r}));Hs.displayName="Spinner";function Qc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:l,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:f,onFocus:m,onBlur:u}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(ct,{htmlFor:t,className:h({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(je,{id:t,disabled:e,placeholder:l,required:c,className:h(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:f,onFocus:m,onBlur:u}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const td=ie.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ys=a.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",td({variant:e}),t),...r}));Ys.displayName="Alert";const Xs=a.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Xs.displayName="AlertTitle";const Ws=a.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Ws.displayName="AlertDescription";const ed=Q.Root,nd=Q.Trigger,rd=Q.Group,od=Q.Portal,sd=Q.Sub,ad=Q.RadioGroup,Zs=a.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(Q.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Zs.displayName=Q.SubTrigger.displayName;const Js=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Js.displayName=Q.SubContent.displayName;const Qs=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Qs.displayName=Q.Content.displayName;const ta=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));ta.displayName=Q.Item.displayName;const ea=a.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(Q.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));ea.displayName=Q.CheckboxItem.displayName;const na=a.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(Q.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));na.displayName=Q.RadioItem.displayName;const ra=a.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ra.displayName=Q.Label.displayName;const oa=a.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));oa.displayName=Q.Separator.displayName;function sa({className:t,...e}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}sa.displayName="ContextMenuShortcut";const aa=a.createContext({direction:"bottom"});function ia({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=a.useMemo(()=>({direction:e}),[e]);return n.jsx(aa.Provider,{value:o,children:n.jsx(At.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ia.displayName="Drawer";const id=At.Drawer.Trigger,la=At.Drawer.Portal,ld=At.Drawer.Close,Cr=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Cr.displayName=At.Drawer.Overlay.displayName;const ca=a.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=a.useContext(aa),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(la,{children:[n.jsx(Cr,{}),n.jsxs(At.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",l[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});ca.displayName="DrawerContent";function da({className:t,...e}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}da.displayName="DrawerHeader";function wa({className:t,...e}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}wa.displayName="DrawerFooter";const pa=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));pa.displayName=At.Drawer.Title.displayName;const ua=a.forwardRef(({className:t,...e},r)=>n.jsx(At.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));ua.displayName=At.Drawer.Description.displayName;const ma=a.forwardRef(({className:t,value:e,...r},o)=>n.jsx(On.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(On.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));ma.displayName=On.Root.displayName;function cd({className:t,...e}){return n.jsx(Vn.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const dd=Vn.Panel;function wd({withHandle:t,className:e,...r}){return n.jsx(Vn.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function pd({...t}){return n.jsx(Jr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const fa=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsxs($e.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx($e.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx($e.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx($e.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});fa.displayName=$e.Root.displayName;const ha=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsx(An.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(An.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ha.displayName=An.Root.displayName;const ud=kt.Root,ga=a.forwardRef(({className:t,...e},r)=>{const o=lt();return n.jsx(kt.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ga.displayName=kt.List.displayName;const xa=a.forwardRef(({className:t,...e},r)=>n.jsx(kt.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));xa.displayName=kt.Trigger.displayName;const ba=a.forwardRef(({className:t,...e},r)=>n.jsx(kt.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));ba.displayName=kt.Content.displayName;const va=a.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));va.displayName="Textarea";const md=(t,e)=>{a.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function fd(t){return{preserveValue:!0,...t}}const ya=(t,e,r={})=>{const o=a.useRef(e);o.current=e;const s=a.useRef(r);s.current=fd(s.current);const[i,l]=a.useState(()=>o.current),[c,d]=a.useState(!0);return a.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(l(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[i,c]},Mn=()=>!1,hd=(t,e)=>{const[r]=ya(a.useCallback(async()=>{if(!t)return Mn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Mn,{preserveValue:!1});a.useEffect(()=>()=>{r!==Mn&&r()},[r])};function gd(t){a.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Jr.toast});exports.Alert=Ys;exports.AlertDescription=Ws;exports.AlertTitle=Xs;exports.Avatar=sr;exports.AvatarFallback=ar;exports.AvatarImage=Yo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=si;exports.BOOK_SELECTOR_STRING_KEYS=li;exports.Badge=me;exports.BookChapterControl=oi;exports.BookSelector=ci;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=jl;exports.COMMENT_LIST_STRING_KEYS=Nl;exports.Card=rr;exports.CardContent=or;exports.CardDescription=Uo;exports.CardFooter=Ho;exports.CardHeader=Ko;exports.CardTitle=qo;exports.ChapterRangeSelector=mo;exports.Checkbox=gn;exports.Checklist=Zc;exports.ComboBox=nn;exports.Command=Kt;exports.CommandEmpty=Ie;exports.CommandGroup=Ot;exports.CommandInput=xe;exports.CommandItem=Pt;exports.CommandList=qt;exports.CommentEditor=yl;exports.CommentList=El;exports.ContextMenu=ed;exports.ContextMenuCheckboxItem=ea;exports.ContextMenuContent=Qs;exports.ContextMenuGroup=rd;exports.ContextMenuItem=ta;exports.ContextMenuLabel=ra;exports.ContextMenuPortal=od;exports.ContextMenuRadioGroup=ad;exports.ContextMenuRadioItem=na;exports.ContextMenuSeparator=oa;exports.ContextMenuShortcut=sa;exports.ContextMenuSub=sd;exports.ContextMenuSubContent=Js;exports.ContextMenuSubTrigger=Zs;exports.ContextMenuTrigger=nd;exports.DataTable=ss;exports.Dialog=no;exports.DialogClose=Wa;exports.DialogContent=Bn;exports.DialogDescription=so;exports.DialogFooter=oo;exports.DialogHeader=Gn;exports.DialogOverlay=zn;exports.DialogPortal=ro;exports.DialogTitle=Kn;exports.DialogTrigger=Xa;exports.Drawer=ia;exports.DrawerClose=ld;exports.DrawerContent=ca;exports.DrawerDescription=ua;exports.DrawerFooter=wa;exports.DrawerHeader=da;exports.DrawerOverlay=Cr;exports.DrawerPortal=la;exports.DrawerTitle=pa;exports.DrawerTrigger=id;exports.DropdownMenu=le;exports.DropdownMenuCheckboxItem=Gt;exports.DropdownMenuContent=Qt;exports.DropdownMenuGroup=lr;exports.DropdownMenuItem=Ke;exports.DropdownMenuItemType=ls;exports.DropdownMenuLabel=Oe;exports.DropdownMenuPortal=Xo;exports.DropdownMenuRadioGroup=Zo;exports.DropdownMenuRadioItem=wr;exports.DropdownMenuSeparator=ye;exports.DropdownMenuShortcut=Jo;exports.DropdownMenuSub=Wo;exports.DropdownMenuSubContent=dr;exports.DropdownMenuSubTrigger=cr;exports.DropdownMenuTrigger=ve;exports.ERROR_DUMP_STRING_KEYS=as;exports.ERROR_POPOVER_STRING_KEYS=Al;exports.EditorKeyboardShortcuts=ps;exports.ErrorDump=is;exports.ErrorPopover=Pl;exports.FOOTNOTE_EDITOR_STRING_KEYS=Ql;exports.Filter=zl;exports.FilterDropdown=Ll;exports.Footer=Vl;exports.FootnoteEditor=Jl;exports.FootnoteItem=hs;exports.FootnoteList=nc;exports.INVENTORY_STRING_KEYS=uc;exports.Input=je;exports.Inventory=hc;exports.Label=ct;exports.MARKER_MENU_STRING_KEYS=us;exports.MarkdownRenderer=Ol;exports.MarkerMenu=ms;exports.MoreInfo=$l;exports.MultiSelectComboBox=cs;exports.NavigationContentSearch=Fc;exports.Popover=Ut;exports.PopoverAnchor=po;exports.PopoverContent=Lt;exports.PopoverTrigger=Zt;exports.Progress=ma;exports.RadioGroup=un;exports.RadioGroupItem=Be;exports.RecentSearches=uo;exports.ResizableHandle=wd;exports.ResizablePanel=dd;exports.ResizablePanelGroup=cd;exports.ResultsCard=Jc;exports.SCOPE_SELECTOR_STRING_KEYS=Mc;exports.ScopeSelector=Dc;exports.ScriptureResultsViewer=Sc;exports.ScrollGroupSelector=Ic;exports.SearchBar=xn;exports.Select=he;exports.SelectContent=ae;exports.SelectGroup=Qo;exports.SelectItem=Et;exports.SelectLabel=es;exports.SelectScrollDownButton=ur;exports.SelectScrollUpButton=pr;exports.SelectSeparator=ns;exports.SelectTrigger=se;exports.SelectValue=ge;exports.Separator=fe;exports.SettingsList=Oc;exports.SettingsListHeader=Pc;exports.SettingsListItem=Ac;exports.SettingsSidebar=Ds;exports.SettingsSidebarContentSearch=vc;exports.Sidebar=hr;exports.SidebarContent=xr;exports.SidebarFooter=Ns;exports.SidebarGroup=an;exports.SidebarGroupAction=_s;exports.SidebarGroupContent=cn;exports.SidebarGroupLabel=ln;exports.SidebarHeader=js;exports.SidebarInput=ys;exports.SidebarInset=gr;exports.SidebarMenu=br;exports.SidebarMenuAction=Cs;exports.SidebarMenuBadge=Es;exports.SidebarMenuButton=yr;exports.SidebarMenuItem=vr;exports.SidebarMenuSkeleton=Ss;exports.SidebarMenuSub=Rs;exports.SidebarMenuSubButton=Ms;exports.SidebarMenuSubItem=Ts;exports.SidebarProvider=fr;exports.SidebarRail=vs;exports.SidebarSeparator=ks;exports.SidebarTrigger=bs;exports.Skeleton=sn;exports.Slider=fa;exports.Sonner=pd;exports.Spinner=Hs;exports.Switch=ha;exports.TabDropdownMenu=wn;exports.TabFloatingMenu=$c;exports.TabToolbar=Lc;exports.Table=Ue;exports.TableBody=Ye;exports.TableCaption=os;exports.TableCell=re;exports.TableFooter=rs;exports.TableHead=Te;exports.TableHeader=He;exports.TableRow=Bt;exports.Tabs=ud;exports.TabsContent=ba;exports.TabsList=ga;exports.TabsTrigger=xa;exports.TextField=Qc;exports.Textarea=va;exports.ToggleGroup=hn;exports.ToggleGroupItem=Ee;exports.Toolbar=Hc;exports.Tooltip=yt;exports.TooltipContent=ht;exports.TooltipProvider=ft;exports.TooltipTrigger=jt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=ds;exports.UiLanguageSelector=Xc;exports.UndoRedoButtons=ws;exports.VerticalTabs=Nr;exports.VerticalTabsContent=_r;exports.VerticalTabsList=kr;exports.VerticalTabsTrigger=$s;exports.Z_INDEX_ABOVE_DOCK=be;exports.Z_INDEX_FOOTNOTE_EDITOR=Xn;exports.Z_INDEX_MODAL=Qa;exports.Z_INDEX_MODAL_BACKDROP=Ja;exports.Z_INDEX_OVERLAY=wo;exports.badgeVariants=Go;exports.buttonVariants=Yn;exports.cn=h;exports.getBookIdFromUSFM=pc;exports.getInventoryHeader=Xe;exports.getLinesFromUSFM=dc;exports.getNumberFromUSFM=wc;exports.getStatusForItem=gs;exports.getToolbarOSReservedSpaceClassName=Uc;exports.inventoryCountColumn=lc;exports.inventoryItemColumn=ac;exports.inventoryStatusColumn=cc;exports.selectTriggerVariants=ts;exports.useEvent=md;exports.useEventAsync=hd;exports.useListbox=Bo;exports.usePromise=ya;exports.useRecentSearches=ti;exports.useSidebar=We;exports.useStylesheet=gd;function xd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}xd(`*, ::before, ::after {
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
.tw-w-\\[280px\\] {
  width: 280px;
}
.tw-w-\\[300px\\] {
  width: 300px;
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
.tw-max-w-\\[220px\\] {
  max-width: 220px;
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
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
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
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
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
`,"after-all");
//# sourceMappingURL=index.cjs.map
