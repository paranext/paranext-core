"use strict";var aa=Object.defineProperty;var ia=(t,e,r)=>e in t?aa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var dt=(t,e,r)=>ia(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),i=require("react"),ft=require("cmdk"),k=require("lucide-react"),la=require("clsx"),ca=require("tailwind-merge"),wa=require("@radix-ui/react-dialog"),Q=require("@sillsdev/scripture"),N=require("platform-bible-utils"),ke=require("@radix-ui/react-slot"),Zt=require("class-variance-authority"),da=require("@radix-ui/react-popover"),pa=require("@radix-ui/react-label"),ua=require("@radix-ui/react-radio-group"),x=require("lexical"),Vr=require("@radix-ui/react-tooltip"),Sn=require("@lexical/rich-text"),br=require("react-dom"),ma=require("@lexical/table"),fa=require("@radix-ui/react-toggle-group"),ha=require("@radix-ui/react-toggle"),Fr=require("@lexical/headless"),ga=require("@radix-ui/react-separator"),xa=require("@radix-ui/react-avatar"),zr=require("@radix-ui/react-dropdown-menu"),ut=require("@tanstack/react-table"),ba=require("@radix-ui/react-select"),va=require("markdown-to-jsx"),yt=require("@eten-tech-foundation/platform-editor"),ya=require("@radix-ui/react-checkbox"),ja=require("@radix-ui/react-tabs"),Na=require("@radix-ui/react-menubar"),ka=require("react-hotkeys-hook"),_a=require("@radix-ui/react-context-menu"),Ct=require("vaul"),Ca=require("@radix-ui/react-progress"),Ea=require("react-resizable-panels"),Gr=require("sonner"),Sa=require("@radix-ui/react-slider"),Ra=require("@radix-ui/react-switch");function nt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const _t=nt(wa),ye=nt(da),Br=nt(pa),Ae=nt(ua),_e=nt(Vr),ln=nt(fa),Kr=nt(ha),qr=nt(ga),Ce=nt(xa),X=nt(zr),Z=nt(ba),Rn=nt(ya),ht=nt(ja),W=nt(Na),J=nt(_a),Tn=nt(Ca),Pn=nt(Ea),De=nt(Sa),Mn=nt(Ra),Ta=ca.extendTailwindMerge({prefix:"tw-"});function m(...t){return Ta(la.clsx(t))}const Ma="layoutDirection";function st(){const t=localStorage.getItem(Ma);return t==="rtl"?t:"ltr"}const Da=_t.Root,Ia=_t.Portal,Ur=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Ur.displayName=_t.Overlay.displayName;const Hr=i.forwardRef(({className:t,children:e,...r},o)=>{const s=st();return n.jsxs(Ia,{children:[n.jsx(Ur,{}),n.jsxs(_t.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(_t.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Hr.displayName=_t.Content.displayName;function Yr({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Yr.displayName="DialogHeader";const Xr=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Xr.displayName=_t.Title.displayName;const Oa=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Oa.displayName=_t.Description.displayName;const At=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command,{ref:r,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));At.displayName=ft.Command.displayName;const pe=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(ft.Command.Input,{ref:r,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});pe.displayName=ft.Command.Input.displayName;const Pt=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.List,{ref:r,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Pt.displayName=ft.Command.List.displayName;const Ee=i.forwardRef((t,e)=>n.jsx(ft.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ee.displayName=ft.Command.Empty.displayName;const Ot=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Group,{ref:r,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Ot.displayName=ft.Command.Group.displayName;const Wr=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Separator,{ref:r,className:m("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Wr.displayName=ft.Command.Separator.displayName;const Et=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Item,{ref:r,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Et.displayName=ft.Command.Item.displayName;function Jr({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Jr.displayName="CommandShortcut";const Zr=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Aa=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function be(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??Q.Canon.bookIdToEnglishName(t)}function Ln(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Qr=Q.Canon.allBookIds.filter(t=>!Q.Canon.isObsolete(Q.Canon.bookIdToNumber(t))),ie=Object.fromEntries(Qr.map(t=>[t,Q.Canon.bookIdToEnglishName(t)]));function $n(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=Q.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(N.includes(s.toLowerCase(),o)||N.includes(t.toLowerCase(),o)||(a?N.includes(a.localizedName.toLowerCase(),o)||N.includes(a.localizedId.toLowerCase(),o):!1))}const to=i.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:l=!1,localizedBookNames:c,commandValue:d},w)=>{const p=i.useRef(!1),u=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(t)},f=i.useMemo(()=>be(t,c),[t,c]),g=i.useMemo(()=>Ln(t,c),[t,c]);return n.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(Et,{ref:w,value:d||`${t} ${Q.Canon.bookIdToEnglishName(t)}`,onSelect:u,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${Q.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[l&&n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:f}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Vn=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=i.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const l=o?ke.Slot:"button";return n.jsx(l,{className:m(Vn({variant:e,size:r,className:t})),ref:a,...s})});V.displayName="Button";const zt=ye.Root,Gt=ye.Trigger,Pa=ye.Anchor,Lt=i.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const a=st();return n.jsx(ye.Portal,{children:n.jsx(ye.Content,{ref:s,align:e,sideOffset:r,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:a})})});Lt.displayName=ye.Content.displayName;function Dn(t,e,r){return`${t} ${ie[t]}${e?` ${Ln(t,e)} ${be(t,e)}`:""}${r?` ${r}`:""}`}function eo({recentSearches:t,onSearchItemSelect:e,renderItem:r=d=>String(d),getItemKey:o=d=>String(d),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:l,classNameForItems:c}){const[d,w]=i.useState(!1);if(t.length===0)return;const p=u=>{e(u),w(!1)};return n.jsxs(zt,{open:d,onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Lt,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(At,{children:n.jsx(Pt,{children:n.jsx(Ot,{heading:a,children:t.map(u=>n.jsxs(Et,{onSelect:()=>p(u),className:m("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function La(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),l=[s,...a.slice(0,o-1)];e(l)}}const hn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},$a=[hn.BOOK_ONLY,hn.BOOK_CHAPTER,hn.BOOK_CHAPTER_VERSE];function vr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Mt(t){return N.getChaptersForBook(Q.Canon.bookIdToNumber(t))}function Va(t,e,r){if(!t.trim()||e.length===0)return;const o=$a.reduce((s,a)=>{if(s)return s;const l=a.exec(t.trim());if(l){const[c,d=void 0,w=void 0]=l.slice(1);let p;const u=e.filter(h=>$n(h,c,r));if(u.length===1&&([p]=u),!p&&d){if(Q.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,f])=>f.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&d){const f=(g=>Object.keys(ie).find(v=>ie[v].toLowerCase()===g.toLowerCase()))(c);if(f&&e.includes(f)&&(p=f),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>Mt(p)&&(h=Math.max(Mt(p),1));const f=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:f}}}},void 0);if(o)return o}function Fa(t,e,r,o){const s=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(Mt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),a=i.useCallback(()=>{const d=Mt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===Mt(t.book)||Mt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,l,c,a])}function yr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(Ot,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:Mt(t)},(l,c)=>c+1).map(l=>n.jsx(Et,{value:`${t} ${ie[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&l===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(l))??!1}),children:l},l))})})}function za({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:l,onAddRecentSearch:c,id:d}){const w=st(),[p,u]=i.useState(!1),[h,f]=i.useState(""),[g,v]=i.useState(""),[b,y]=i.useState("books"),[j,C]=i.useState(void 0),[M,F]=i.useState(!1),$=i.useRef(void 0),_=i.useRef(void 0),T=i.useRef(void 0),E=i.useRef(void 0),R=i.useRef({}),P=i.useCallback(O=>{e(O),c&&c(O)},[e,c]),L=i.useMemo(()=>o?o():Qr,[o]),I=i.useMemo(()=>({[N.Section.OT]:L.filter(K=>Q.Canon.isBookOT(K)),[N.Section.NT]:L.filter(K=>Q.Canon.isBookNT(K)),[N.Section.DC]:L.filter(K=>Q.Canon.isBookDC(K)),[N.Section.Extra]:L.filter(K=>Q.Canon.extraBooks().includes(K))}),[L]),A=i.useMemo(()=>Object.values(I).flat(),[I]),z=i.useMemo(()=>{if(!g.trim())return I;const O={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(H=>{O[H]=I[H].filter(Y=>$n(Y,g,s))}),O},[I,g,s]),S=i.useMemo(()=>Va(g,A,s),[g,A,s]),B=i.useCallback(()=>{S&&(P({book:S.book,chapterNum:S.chapterNum??1,verseNum:S.verseNum??1}),u(!1),v(""),f(""))},[P,S]),at=i.useCallback(O=>{if(Mt(O)<=1){P({book:O,chapterNum:1,verseNum:1}),u(!1),v("");return}C(O),y("chapters")},[P]),lt=i.useCallback(O=>{const K=b==="chapters"?j:S==null?void 0:S.book;K&&(P({book:K,chapterNum:O,verseNum:1}),u(!1),y("books"),C(void 0),v(""))},[P,b,j,S]),Vt=i.useCallback(O=>{P(O),u(!1),v("")},[P]),ct=Fa(t,A,w,e),rt=i.useCallback(()=>{y("books"),C(void 0),setTimeout(()=>{_.current&&_.current.focus()},0)},[]),G=i.useCallback(O=>{if(!O&&b==="chapters"){rt();return}u(O),O&&(y("books"),C(void 0),v(""))},[b,rt]),{otLong:tt,ntLong:wt,dcLong:ot,extraLong:vt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},Re=i.useCallback(O=>Zr(O,tt,wt,ot,vt),[tt,wt,ot,vt]),qt=i.useCallback(O=>S?!!S.chapterNum&&!O.toString().includes(S.chapterNum.toString()):!1,[S]),te=i.useMemo(()=>N.formatScrRef(t,s?be(t.book,s):"English"),[t,s]),qe=i.useCallback(O=>K=>{R.current[O]=K},[]),he=i.useCallback(O=>{(O.key==="Home"||O.key==="End")&&O.stopPropagation()},[]),ee=i.useCallback(O=>{if(O.ctrlKey)return;const{isLetter:K,isDigit:H}=vr(O.key);if(b==="chapters"){if(O.key==="Backspace"){O.preventDefault(),O.stopPropagation(),rt();return}if(K||H){if(O.preventDefault(),O.stopPropagation(),y("books"),C(void 0),H&&j){const Y=ie[j];v(`${Y} ${O.key}`)}else v(O.key);setTimeout(()=>{_.current&&_.current.focus()},0);return}}if((b==="chapters"||b==="books"&&S)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(O.key)){const Y=b==="chapters"?j:S==null?void 0:S.book;if(!Y)return;const it=(()=>{if(!h)return 1;const ne=h.match(/(\d+)$/);return ne?parseInt(ne[1],10):0})(),Ft=Mt(Y);if(!Ft)return;let mt=it;const Ue=6;switch(O.key){case"ArrowLeft":it!==0&&(mt=it>1?it-1:Ft);break;case"ArrowRight":it!==0&&(mt=it<Ft?it+1:1);break;case"ArrowUp":mt=it===0?Ft:Math.max(1,it-Ue);break;case"ArrowDown":mt=it===0?1:Math.min(Ft,it+Ue);break;default:return}mt!==it&&(O.preventDefault(),O.stopPropagation(),f(Dn(Y,s,mt)),setTimeout(()=>{const ne=R.current[mt];ne&&ne.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,S,rt,j,h,s]),fn=i.useCallback(O=>{if(O.shiftKey||O.key==="Tab"||O.key===" ")return;const{isLetter:K,isDigit:H}=vr(O.key);(K||H)&&(O.preventDefault(),v(Y=>Y+O.key),_.current.focus(),F(!1))},[]);return i.useLayoutEffect(()=>{const O=setTimeout(()=>{if(p&&b==="books"&&T.current&&E.current){const K=T.current,H=E.current,Y=H.offsetTop,it=K.clientHeight,Ft=H.clientHeight,mt=Y-it/2+Ft/2;K.scrollTo({top:Math.max(0,mt),behavior:"smooth"}),f(Dn(t.book))}},0);return()=>{clearTimeout(O)}},[p,b,g,S,t.book]),i.useLayoutEffect(()=>{if(b==="chapters"&&j){const O=j===t.book;setTimeout(()=>{if(T.current)if(O){const K=R.current[t.chapterNum];K&&K.scrollIntoView({block:"center",behavior:"smooth"})}else T.current.scrollTo({top:0});$.current&&$.current.focus()},0)}},[b,j,S,t.book,t.chapterNum]),n.jsxs(zt,{open:p,onOpenChange:G,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:te})})}),n.jsx(Lt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(At,{ref:$,onKeyDown:ee,loop:!0,value:h,onValueChange:f,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(pe,{ref:_,value:g,onValueChange:v,onKeyDown:he,onFocus:()=>F(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(eo,{recentSearches:l,onSearchItemSelect:Vt,renderItem:O=>N.formatScrRef(O,"English"),getItemKey:O=>`${O.book}-${O.chapterNum}-${O.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:ct.map(({onClick:O,disabled:K,title:H,icon:Y})=>n.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{F(!0),O()},disabled:K,className:"tw-h-10 tw-w-4 tw-p-0",title:H,onKeyDown:fn,children:n.jsx(Y,{})},H))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:rt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:be(j,s)})]}),!M&&n.jsxs(Pt,{ref:T,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!S&&Object.entries(z).map(([O,K])=>{if(K.length!==0)return n.jsx(Ot,{heading:Re(O),children:K.map(H=>n.jsx(to,{bookId:H,onSelect:Y=>at(Y),section:N.getSectionForBook(H),commandValue:`${H} ${ie[H]}`,ref:H===t.book?E:void 0,localizedBookNames:s},H))},O)}),S&&n.jsx(Ot,{children:n.jsx(Et,{value:`${S.book} ${ie[S.book]} ${S.chapterNum||""}:${S.verseNum||""})}`,onSelect:B,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:S.book,chapterNum:S.chapterNum??1,verseNum:S.verseNum??1},s?Ln(S.book,s):void 0)},"top-match")}),S&&Mt(S.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:be(S.book,s)}),n.jsx(yr,{bookId:S.book,scrRef:t,onChapterSelect:lt,setChapterRef:qe,isChapterDimmed:qt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&j&&n.jsx(yr,{bookId:j,scrRef:t,onChapterSelect:lt,setChapterRef:qe,className:"tw-p-4"})]})]})})]})}const Ga=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ba=Zt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),et=i.forwardRef(({className:t,...e},r)=>n.jsx(Br.Root,{ref:r,className:m("pr-twp",Ba(),t),...e}));et.displayName=Br.Root.displayName;const cn=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(Ae.Root,{className:m("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});cn.displayName=Ae.Root.displayName;const Pe=i.forwardRef(({className:t,...e},r)=>n.jsx(Ae.Item,{ref:r,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ae.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Pe.displayName=Ae.Item.displayName;function Ka(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Ze({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:a,onChange:l=()=>{},getOptionLabel:c=Ka,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:f="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:b,...y}){const[j,C]=i.useState(!1),M=d??c,F=_=>_.length>0&&typeof _[0]=="object"&&"options"in _[0],$=(_,T)=>{const E=c(_),R=typeof _=="object"&&"secondaryLabel"in _?_.secondaryLabel:void 0,P=`${T??""}${E}${R??""}`;return n.jsxs(Et,{value:E,onSelect:()=>{l(_),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==E})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,R&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",R]})]})]},P)};return n.jsxs(zt,{open:j,onOpenChange:C,...y,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:f,role:"combobox","aria-expanded":j,"aria-label":b,id:t,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?M(a):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:n.jsxs(At,{children:[n.jsx(pe,{placeholder:u,className:"tw-text-inherit"}),n.jsx(Ee,{children:h}),n.jsx(Pt,{children:F(e)?e.map(_=>n.jsx(Ot,{heading:_.groupHeading,children:_.options.map(T=>$(T,_.groupHeading))},_.groupHeading)):e.map(_=>$(_))})]})})]})}function no({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const l=i.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(et,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Ze,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(et,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Ze,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}var ro=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(ro||{});const qa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),gn=(t,e)=>t[e]??e;function Ua({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=gn(w,"%webView_bookSelector_currentBook%"),u=gn(w,"%webView_bookSelector_choose%"),h=gn(w,"%webView_bookSelector_chooseBooks%"),[f,g]=i.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(cn,{className:"pr-twp tw-flex",value:f,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"current book"}),n.jsx(et,{className:"tw-ms-1",children:p})]}),n.jsx(et,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(no,{isDisabled:f==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"choose books"}),n.jsx(et,{className:"tw-ms-1",children:h})]}),n.jsx(et,{className:"tw-flex tw-items-center",children:o.map(b=>Q.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(V,{disabled:f==="current book",onClick:()=>r(),children:u})]})]})})}const oo=i.createContext(null);function Ha(t,e){return{getTheme:function(){return e??null}}}function $t(){const t=i.useContext(oo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const so=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Ya=so?i.useLayoutEffect:i.useEffect,He={tag:x.HISTORY_MERGE_TAG};function Xa({initialConfig:t,children:e}){const r=i.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:l,editorState:c,html:d}=t,w=Ha(null,o),p=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:a,onError:u=>l(u,p),theme:o});return function(u,h){if(h!==null){if(h===void 0)u.update(()=>{const f=x.$getRoot();if(f.isEmpty()){const g=x.$createParagraphNode();f.append(g);const v=so?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===u.getRootElement())&&g.select()}},He);else if(h!==null)switch(typeof h){case"string":{const f=u.parseEditorState(h);u.setEditorState(f,He);break}case"object":u.setEditorState(h,He);break;case"function":u.update(()=>{x.$getRoot().isEmpty()&&h(u)},He)}}}(p,c),[p,w]},[]);return Ya(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(oo.Provider,{value:r,children:e})}const Wa=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ja({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=$t();return Wa(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:l,prevEditorState:c,tags:d})=>{e&&a.size===0&&l.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const Fn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},xt=_e.Provider,jt=_e.Root,Nt=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(_e.Trigger,{ref:o,className:e?m(Vn({variant:e}),t):t,...r}));Nt.displayName=_e.Trigger.displayName;const bt=i.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(_e.Content,{ref:o,sideOffset:e,className:m("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));bt.displayName=_e.Content.displayName;const zn=[Sn.HeadingNode,x.ParagraphNode,x.TextNode,Sn.QuoteNode],Za=i.createContext(null),xn={didCatch:!1,error:null};class Qa extends i.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=xn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),l=0;l<s;l++)a[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(xn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&ti(e.resetKeys,s)){var a,l;(a=(l=this.props).onReset)===null||a===void 0||a.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(xn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:l}=this.state;let c=e;if(a){const d={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=i.createElement(o,d);else if(s!==void 0)c=s;else throw l}return i.createElement(Za.Provider,{value:{didCatch:a,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function ti(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function ei({children:t,onError:e}){return n.jsx(Qa,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ni=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function ri(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function oi(){return function(t){const[e]=$t(),r=i.useMemo(()=>t(e),[e,t]),[o,s]=i.useState(()=>r.initialValueFn()),a=i.useRef(o);return ni(()=>{const{initialValueFn:l,subscribe:c}=r,d=l();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[r,t]),o}(ri)}function si(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,l=t.isBackward(),c=s.getNode(),d=a.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[u,h]=x.$getCharacterOffsets(t),f=c.is(d),g=e.is(l?d:c),v=e.is(l?c:d);let b,y=0;f?(y=u>h?h:u,b=u>h?u:h):g?(y=l?h:u,b=void 0):v&&(y=0,b=l?u:h);const j=e.__text.slice(y,b);j!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=j)}}return e}function ai(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const ao=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ii=ao&&"documentMode"in document?document.documentMode:null;!(!ao||!("InputEvent"in window)||ii)&&"getTargetRanges"in new window.InputEvent("input");function jr(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||ai(4,t.__key),e}const li=Symbol.for("preact-signals");function wn(){if(Ht>1)return void Ht--;let t,e=!1;for(;Ie!==void 0;){let r=Ie;for(Ie=void 0,In++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&io(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(In=0,Ht--,e)throw t}function ci(t){if(Ht>0)return t();Ht++;try{return t()}finally{wn()}}let q,Ie;function Nr(t){const e=q;q=void 0;try{return t()}finally{q=e}}let Ht=0,In=0,We=0;function kr(t){if(q===void 0)return;let e=t.n;return e===void 0||e.t!==q?(e={i:0,S:t,p:q.s,n:void 0,t:q,e:void 0,x:void 0,r:e},q.s!==void 0&&(q.s.n=e),q.s=e,t.n=e,32&q.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=q.s,e.n=void 0,q.s.n=e,q.s=e),e):void 0}function pt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Le(t,e){return new pt(t,e)}function io(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function _r(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function lo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function se(t,e){pt.call(this,void 0),this.x=t,this.s=void 0,this.g=We-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function wi(t,e){return new se(t,e)}function co(t){const e=t.u;if(t.u=void 0,typeof e=="function"){Ht++;const r=q;q=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Gn(t),o}finally{q=r,wn()}}}function Gn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,co(t)}function di(t){if(q!==this)throw new Error("Out-of-order effect");lo(this),q=t,this.f&=-2,8&this.f&&Gn(this),wn()}function xe(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function Xt(t,e){const r=new xe(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function dn(t,e={}){const r={};for(const o in t){const s=e[o],a=Le(s===void 0?t[o]:s);r[o]=a}return r}pt.prototype.brand=li,pt.prototype.h=function(){return!0},pt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Nr(()=>{var r;(r=this.W)==null||r.call(this)}))},pt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Nr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},pt.prototype.subscribe=function(t){return Xt(()=>{const e=this.value,r=q;q=void 0;try{t(e)}finally{q=r}},{name:"sub"})},pt.prototype.valueOf=function(){return this.value},pt.prototype.toString=function(){return this.value+""},pt.prototype.toJSON=function(){return this.value},pt.prototype.peek=function(){const t=q;q=void 0;try{return this.value}finally{q=t}},Object.defineProperty(pt.prototype,"value",{get(){const t=kr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(In>100)throw new Error("Cycle detected");this.v=t,this.i++,We++,Ht++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{wn()}}}}),se.prototype=new pt,se.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===We))return!0;if(this.g=We,this.f|=1,this.i>0&&!io(this))return this.f&=-2,!0;const t=q;try{_r(this),q=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return q=t,lo(this),this.f&=-2,!0},se.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}pt.prototype.S.call(this,t)},se.prototype.U=function(t){if(this.t!==void 0&&(pt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},se.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(se.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=kr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),xe.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},xe.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,co(this),_r(this),Ht++;const t=q;return q=this,di.bind(this,t)},xe.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ie,Ie=this)},xe.prototype.d=function(){this.f|=8,1&this.f||Gn(this)},xe.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Xt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function wo(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function po(t,e=wo){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({$onClear:wo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Xt(()=>po(t,o.value))}});function pi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}function uo(t,e){let r;return Le(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const On=x.defineExtension({build:t=>uo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function U(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function mo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=mo(r[s],o[s]);return t}return e}const Bn=0,An=1,fo=2,bn=3,Ye=4,ge=5,vn=6,Te=7;function yn(t){return t.id===Bn}function ho(t){return t.id===fo}function ui(t){return function(e){return e.id===An}(t)||U(305,String(t.id),String(An)),Object.assign(t,{id:fo})}const mi=new Set;class fi{constructor(e,r){dt(this,"builder");dt(this,"configs");dt(this,"_dependency");dt(this,"_peerNameSet");dt(this,"extension");dt(this,"state");dt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Bn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;ho(r)||U(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:bn,registerState:w})}(r,this.mergeConfigs(),o);let l;this.state=a,this.extension.init&&(l=this.extension.init(e,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:Ye,initResult:d,registerState:w})}(a,l,s)}build(e){const r=this.state;let o;r.id!==Ye&&U(307,String(r.id),String(ge)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,l,c){return Object.assign(a,{id:ge,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==ge&&U(308,String(o.id),String(ge));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:vn})}(o),()=>{const a=this.state;a.id!==Te&&U(309,String(o.id),String(Te)),this.state=function(l){return Object.assign(l,{id:ge})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==vn&&U(310,String(r.id),String(vn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Te})}(r),o}getSignal(){return this._signal===void 0&&U(311),this._signal}getInitResult(){this.extension.init===void 0&&U(312,this.extension.name);const e=this.state;return function(r){return r.id>=Ye}(e)||U(313,String(e.id),String(Ye)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=bn}(e)||U(314,String(e.id),String(bn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&U(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&U(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Te}(e)||U(316,String(e.id),String(Te)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||mi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=ge})(e)||U(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Cr={tag:x.HISTORY_MERGE_TAG};function hi(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const gi=x.defineExtension({config:x.safeCast({setOptions:Cr,updateOptions:Cr}),init:({$initialEditorState:t=hi})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(x.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const l=t.parseEditorState(a);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Er=Symbol.for("@lexical/extension/LexicalBuilder");function Sr(){}function xi(t){throw t}function Xe(t){return Array.isArray(t)?t:[t]}const jn="0.40.0+prod.esm";class Oe{constructor(e){dt(this,"roots");dt(this,"extensionNameMap");dt(this,"outgoingConfigEdges");dt(this,"incomingEdges");dt(this,"conflicts");dt(this,"_sortedExtensionReps");dt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=jn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Xe(gi)];for(const o of e)r.push(Xe(o));return new Oe(r)}static maybeFromEditor(e){const r=e[Er];return r&&(r.PACKAGE_VERSION!==jn&&U(292,r.PACKAGE_VERSION,jn),r instanceof Oe||U(293)),r}static fromEditor(e){const r=Oe.maybeFromEditor(e);return r===void 0&&U(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Er]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Sr;function r(){try{e()}finally{e=Sr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&U(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&U(296);const r=Xe(e),[o]=r;typeof o.name!="string"&&U(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&U(298,o.name),!s){s=new fi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&U(299,o.name,a);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&U(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Xe(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(ho(a))return;const l=o.extension.name;var c;yn(a)||U(300,l,s||"[unknown]"),yn(c=a)||U(304,String(c.id),String(Bn)),a=Object.assign(c,{id:An}),o.state=a;const d=this.outgoingConfigEdges.get(l);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,l)}a=ui(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())yn(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of a)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&U(301,o.name);for(const l of s)a.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const l of r){const c=l.register(e,a);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:u}=p;if(u.onError!==void 0&&(e.onError=u.onError),u.disableEvents!==void 0&&(e.disableEvents=u.disableEvents),u.parentEditor!==void 0&&(e.parentEditor=u.parentEditor),u.editable!==void 0&&(e.editable=u.editable),u.namespace!==void 0&&(e.namespace=u.namespace),u.$initialEditorState!==void 0&&(e.$initialEditorState=u.$initialEditorState),u.nodes)for(const h of pi(u)){if(typeof h!="function"){const f=o.get(h.replace);f&&U(302,u.name,h.replace.name,f.extension.name),o.set(h.replace,p)}r.add(h)}if(u.html){if(u.html.export)for(const[h,f]of u.html.export.entries())s.set(h,f);u.html.import&&Object.assign(a,u.html.import)}u.theme&&mo(l,u.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=a),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=xi),e}}const bi=new Set,Rr=x.defineExtension({build(t,e,r){const o=r.getDependency(On).output,s=Le({watchedNodeKeys:new Map}),a=uo(()=>{},()=>Xt(()=>{const l=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,u]of c.entries()){if(u.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),f=h&&h.isSelected()||!1;w=w||f!==(!!l&&l.has(p)),f&&(d=d||new Set,d.add(p))}}),!w&&d&&l&&d.size===l.size||(a.value=d)}));return{watchNodeKey:function(l){const c=wi(()=>(a.value||bi).has(l)),{watchedNodeKeys:d}=s.peek();let w=d.get(l);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(l,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[On],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class je extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new je(e.__key)}static importJSON(e){return go().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:vi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function vi(){return{node:go()}}function go(){return x.$create(je)}function yi(t){return t instanceof je}x.defineExtension({dependencies:[On,Rr],name:"@lexical/extension/HorizontalRule",nodes:()=>[je],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Rr).output,s=Le({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,l=>{if(x.isDOMNode(l.target)){const c=x.$getNodeFromDOMNode(l.target);if(yi(c))return function(d,w=!1){const p=x.$getSelection(),u=d.isSelected(),h=d.getKey();let f;w&&x.$isNodeSelection(p)?f=p:(f=x.$createNodeSelection(),x.$setSelection(f)),u?f.delete(h):f.add(h)}(c,l.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(je,(l,c)=>{ci(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,u]of l.entries())if(u==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),f=t.getElementByKey(p);h?h.domNode.value=f:(d=!0,w.set(p,{domNode:Le(f),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),Xt(()=>{const l=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())l.push(Xt(()=>{const w=c.value;w&&(d.value?x.addClassNamesToElement(w,a):x.removeClassNamesFromElement(w,a))}));return x.mergeRegister(...l)}))}});function ji(t,e){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,r=>{const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;r.preventDefault();const s=function(a){if(a.getNodes().filter(u=>x.$isBlockElementNode(u)&&u.canIndent()).length>0)return!0;const l=a.anchor,c=a.focus,d=c.isBefore(l)?c:l,w=d.getNode(),p=jr(w);if(p.canIndent()){const u=p.getKey();let h=x.$createRangeSelection();if(h.anchor.set(u,0,"element"),h.focus.set(u,0,"element"),h=x.$normalizeSelection__EXPERIMENTAL(h),h.anchor.is(d))return!0}return!1}(o)?r.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(s,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const r=typeof e=="number"?e:e?e.peek():null;if(r==null)return!1;const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>jr(a).getIndent());return Math.max(...s)+1>=r},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s}=r.getOutput();return Xt(()=>{if(!o.value)return ji(t,s)})}});const Ni=x.defineExtension({name:"@lexical/react/ReactProvider"});function ki(){return x.$getRoot().getTextContent()}function _i(t,e=!0){if(t)return!1;let r=ki();return e&&(r=r.trim()),r===""}function Ci(t){if(!_i(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),l=a.length;for(let c=0;c<l;c++){const d=a[o];if(!x.$isTextNode(d))return!1}}}return!0}function xo(t){return()=>Ci(t)}function bo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let l;try{l=JSON.parse(a)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,u,h,f]=d;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),y=0,j=0;if(x.$isTextNode(b)&&w>=0&&p>=0&&(y=w,j=w+p,g.setTextNodeRange(b,y,b,j)),y===j&&u===""||(g.insertRawText(u),b=v.getNode()),x.$isTextNode(b)){y=h,j=h+f;const C=b.getTextContentSize();y=y>C?C:y,j=j>C?C:j,g.setTextNodeRange(b,y,b,j)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>dn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Xt(()=>r.getOutput().disabled.value?void 0:bo(t))});function Ei(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Kn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Si({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=i.useState(()=>r.getDecorators());return Kn(()=>r.registerDecoratorListener(l=>{br.flushSync(()=>{a(l)})}),[r]),i.useEffect(()=>{a(r.getDecorators())},[r]),i.useMemo(()=>{const l=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(i.Suspense,{fallback:null,children:s[w]})}),u=r.getElementByKey(w);u!==null&&l.push(br.createPortal(p,u,w))}return l},[o,s,r])}(t,e)}function Ri({editor:t,ErrorBoundary:e}){return function(r){const o=Oe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Ni.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Ei(320,s);return!0}return!1}(t)?null:n.jsx(Si,{editor:t,ErrorBoundary:e})}function Tr(t){return t.getEditorState().read(xo(t.isComposing()))}function Ti({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=$t();return function(s){Kn(()=>x.mergeRegister(Sn.registerRichText(s),bo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Mi,{content:e}),n.jsx(Ri,{editor:o,ErrorBoundary:r})]})}function Mi({content:t}){const[e]=$t(),r=function(s){const[a,l]=i.useState(()=>Tr(s));return Kn(()=>{function c(){const d=Tr(s);l(d)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=oi();return r?typeof t=="function"?t(o):t:null}function Di({defaultSelection:t}){const[e]=$t();return i.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Ii=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Oi({onClear:t}){const[e]=$t();return Ii(()=>po(e,t),[e,t]),null}const vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Ai({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:l,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:u,ariaRequired:h,autoCapitalize:f,className:g,id:v,role:b="textbox",spellCheck:y=!0,style:j,tabIndex:C,"data-testid":M,...F},$){const[_,T]=i.useState(t.isEditable()),E=i.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),R=i.useMemo(()=>function(...P){return L=>{for(const I of P)typeof I=="function"?I(L):I!=null&&(I.current=L)}}($,E),[E,$]);return vo(()=>(T(t.isEditable()),t.registerEditableListener(P=>{T(P)})),[t]),n.jsx("div",{"aria-activedescendant":_?e:void 0,"aria-autocomplete":_?r:"none","aria-controls":_?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":_&&b==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":_?u:void 0,"aria-readonly":!_||void 0,"aria-required":h,autoCapitalize:f,className:g,contentEditable:_,"data-testid":M,id:v,ref:R,role:b,spellCheck:y,style:j,tabIndex:C,...F})}const Pi=i.forwardRef(Ai);function Mr(t){return t.getEditorState().read(xo(t.isComposing()))}const Li=i.forwardRef($i);function $i(t,e){const{placeholder:r,...o}=t,[s]=$t();return n.jsxs(n.Fragment,{children:[n.jsx(Pi,{editor:s,...o,ref:e}),r!=null&&n.jsx(Vi,{editor:s,content:r})]})}function Vi({content:t,editor:e}){const r=function(l){const[c,d]=i.useState(()=>Mr(l));return vo(()=>{function w(){const p=Mr(l);d(p)}return w(),x.mergeRegister(l.registerUpdateListener(()=>{w()}),l.registerEditableListener(()=>{w()}))},[l]),c}(e),[o,s]=i.useState(e.isEditable());if(i.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function Fi({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Li,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const yo=i.createContext(void 0);function zi({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(yo.Provider,{value:l,children:a})}function jo(){const t=i.useContext(yo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Gi(){const[t,e]=i.useState(void 0),r=i.useCallback(()=>{e(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:a,content:l}=t;return n.jsx(Da,{open:!0,onOpenChange:r,children:n.jsxs(Hr,{children:[n.jsx(Yr,{children:n.jsx(Xr,{children:a})}),l]})})},[t,r]),s=i.useCallback((a,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:a})},[r]);return[o,s]}function Bi({children:t}){const[e]=$t(),[r,o]=i.useState(e),[s,a]=i.useState("paragraph"),[l,c]=Gi(),d=()=>{};return i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(zi,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[l,t({blockType:s})]})}function Ki(t){const[e]=$t(),{activeEditor:r}=jo();i.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const No=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),qi=i.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Kr.Root,{ref:s,className:m(No({variant:e,size:r,className:t})),...o}));qi.displayName=Kr.Root.displayName;const ko=i.createContext({size:"default",variant:"default"}),pn=i.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const l=st();return n.jsx(ln.Root,{ref:a,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(ko.Provider,{value:{variant:e,size:r},children:o})})});pn.displayName=ln.Root.displayName;const ve=i.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const l=i.useContext(ko);return n.jsx(ln.Item,{ref:a,className:m(No({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});ve.displayName=ln.Item.displayName;const Dr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function Ui(){const{activeEditor:t}=jo(),[e,r]=i.useState([]),o=i.useCallback(s=>{if(x.$isRangeSelection(s)||ma.$isTableSelection(s)){const a=[];Dr.forEach(({format:l})=>{s.hasFormat(l)&&a.push(l)}),r(l=>l.length!==a.length||!a.every(c=>l.includes(c))?a:l)}},[]);return Ki(o),n.jsx(pn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Dr.map(({format:s,icon:a,label:l})=>n.jsx(ve,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Hi({onClear:t}){const[e]=$t();i.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Yi({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=i.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Bi,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Ui,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ti,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Fi,{placeholder:t})}),ErrorBoundary:ei}),e&&n.jsx(Di,{defaultSelection:"rootEnd"}),n.jsx(Hi,{onClear:r}),n.jsx(Oi,{})]})]})}const Xi={namespace:"commentEditor",theme:Fn,nodes:zn,onError:t=>{console.error(t)}};function Qe({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:l,className:c}){return n.jsx("div",{className:m("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Xa,{initialConfig:{...Xi,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(xt,{children:[n.jsx(Yi,{placeholder:s,autoFocus:a,onClear:l}),n.jsx(Ja,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function Wi(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Co.has(a.nodeName)){const l=Eo(a,t,s,!1);l!==null&&(o=o.concat(l))}return function(a){for(const l of a)l.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&l.insertAfter(x.$createLineBreakNode());for(const l of a){const c=l.getChildren();for(const d of c)l.insertBefore(d);l.remove()}}(s),o}function Ji(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)_o(t,o[s],r,e);return r.innerHTML}function _o(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=x.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&x.$isTextNode(e)&&(l=si(o,e,"clone"));const c=x.$isElementNode(l)?l.getChildren():[],d=x.getRegisteredNode(t,l.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,l):l.exportDOM(t);const{element:p,after:u}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let f=0;f<c.length;f++){const g=c[f],v=_o(t,g,h,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),u){const f=u.call(l,p);f&&(x.isDocumentFragment(p)?p.replaceChildren(f):p.replaceWith(f))}}else r.append(h);return s}const Co=new Set(["STYLE","SCRIPT"]);function Eo(t,e,r,o,s=new Map,a){let l=[];if(Co.has(t.nodeName))return l;let c=null;const d=function(g,v){const{nodeName:b}=g,y=v._htmlConversions.get(b.toLowerCase());let j=null;if(y!==void 0)for(const C of y){const M=C(g);M!==null&&(j===null||(j.priority||0)<=(M.priority||0))&&(j=M)}return j!==null?j.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,a),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const u=t.childNodes;let h=[];const f=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<u.length;g++)h.push(...Eo(u[g],e,r,f,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=Zi(t,h,f?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?l=l.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),l}function Zi(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let l=0;l<e.length;l++){const c=e[l];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),l===e.length-1||l<e.length-1&&x.$isBlockElementNode(e[l+1])){const d=r();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function So(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Ro(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Ro(e.children)):!1}function kt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Ro(t.root.children):!1}function Qi(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Fr.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=Wi(e,s);x.$getRoot().clear(),x.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function tn(t){const e=Fr.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=Ji(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function qn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const tl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Nn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function el({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=i.useState(tl),[l,c]=i.useState(void 0),[d,w]=i.useState(!1),p=i.useRef(void 0),u=i.useRef(null);i.useEffect(()=>{let y=!0;const j=u.current;if(!j)return;const C=setTimeout(()=>{y&&So(j)},300);return()=>{y=!1,clearTimeout(C)}},[]);const h=i.useCallback(()=>{if(!kt(s))return;const y=tn(s);e(y,l)},[s,e,l]),f=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(V,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:v})})]})}),n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(V,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!kt(s),children:n.jsx(k.Check,{})})}),n.jsx(bt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(zt,{open:d,onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Nn(l!==void 0?l:"",o)})]})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:y=>{y.key==="Escape"&&(y.stopPropagation(),w(!1))},children:n.jsx(At,{children:n.jsx(Pt,{children:t.map(y=>n.jsx(Et,{onSelect:()=>{c(y===""?void 0:y),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Nn(y,o)})},y||"unassigned"))})})})]})}),n.jsx("div",{ref:u,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),r();else if(y.key==="Enter"){const j=/Macintosh/i.test(navigator.userAgent);(j&&y.metaKey||!j&&y.ctrlKey)&&(y.preventDefault(),y.stopPropagation(),kt(s)&&h())}},onKeyDown:y=>{qn(y),(y.key==="Enter"||y.key===" ")&&y.stopPropagation()},children:n.jsx(Qe,{editorSerializedState:s,onSerializedChange:y=>a(y),placeholder:f,onClear:y=>{p.current=y}})})]})}const nl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),rl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],ol=["input","select","textarea","button"],sl=["button","textbox"],To=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=i.useRef(null),[a,l]=i.useState(void 0),[c,d]=i.useState(void 0),w=i.useCallback(f=>{l(f);const g=t.find(b=>b.id===f);g&&(e==null||e(g));const v=document.getElementById(f);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",f)},[e,t]),p=i.useCallback(f=>{const g=t.find(v=>v.id===f);g&&(d(v=>v===f?void 0:f),r==null||r(g))},[r,t]),u=f=>{if(!f)return!1;const g=f.tagName.toLowerCase();if(f.isContentEditable||ol.includes(g))return!0;const v=f.getAttribute("role");if(v&&sl.includes(v))return!0;const b=f.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=i.useCallback(f=>{var _;const g=f.target,v=T=>T?document.getElementById(T):void 0,b=v(c),y=v(a);if(!!(b&&g&&b.contains(g)&&g!==b)&&u(g)){if(f.key==="Escape"||f.key==="ArrowLeft"&&!g.isContentEditable){if(c){f.preventDefault(),f.stopPropagation();const T=t.find(E=>E.id===c);T&&w(T.id)}return}if(f.key==="ArrowDown"||f.key==="ArrowUp"){if(!b)return;const T=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(T.length===0)return;const E=T.findIndex(P=>P===g);if(E===-1)return;let R;f.key==="ArrowDown"?R=Math.min(E+1,T.length-1):R=Math.max(E-1,0),R!==E&&(f.preventDefault(),f.stopPropagation(),(_=T[R])==null||_.focus());return}return}const M=t.findIndex(T=>T.id===a);let F=M;switch(f.key){case"ArrowDown":F=Math.min(M+1,t.length-1),f.preventDefault();break;case"ArrowUp":F=Math.max(M-1,0),f.preventDefault();break;case"Home":F=0,f.preventDefault();break;case"End":F=t.length-1,f.preventDefault();break;case" ":case"Enter":a&&p(a),f.preventDefault(),f.stopPropagation();return;case"ArrowRight":{const T=y;if(T){const E=T.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=T.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=E??R;if(P){f.preventDefault(),P.focus();return}}break}default:f.key.length===1&&!f.metaKey&&!f.ctrlKey&&!f.altKey&&(u(g)||(o==null||o(f.key),f.preventDefault()));return}const $=t[F];$&&w($.id)},[t,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:w}},Mo=Zt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),le=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:m("pr-twp",Mo({variant:e}),t),...r}));le.displayName="Badge";const Un=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Un.displayName="Card";const Do=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Do.displayName="CardHeader";const Io=i.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Io.displayName="CardTitle";const Oo=i.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:m("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Oo.displayName="CardDescription";const Hn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-p-6 tw-pt-0",t),...e}));Hn.displayName="CardContent";const Ao=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Ao.displayName="CardFooter";const ce=i.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(qr.Root,{ref:s,decorative:r,orientation:e,className:m("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ce.displayName=qr.Root.displayName;const Yn=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Yn.displayName=Ce.Root.displayName;const Po=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Image,{ref:r,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Po.displayName=Ce.Image.displayName;const Xn=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Fallback,{ref:r,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Xn.displayName=Ce.Fallback.displayName;const Wn=i.createContext(void 0);function St(){const t=i.useContext(Wn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Bt=Zt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ue=X.Trigger,Jn=X.Group,Lo=X.Portal,$o=X.Sub,Vo=X.RadioGroup;function Qt({variant:t="default",...e}){const r=i.useMemo(()=>({variant:t}),[t]);return n.jsx(Wn.Provider,{value:r,children:n.jsx(X.Root,{...e})})}const Zn=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=St();return n.jsxs(X.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Bt({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Zn.displayName=X.SubTrigger.displayName;const Qn=i.forwardRef(({className:t,...e},r)=>n.jsx(X.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Qn.displayName=X.SubContent.displayName;const Kt=i.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=st();return n.jsx(X.Portal,{children:n.jsx(X.Content,{ref:s,sideOffset:e,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Kt.displayName=X.Content.displayName;const $e=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=st(),a=St();return n.jsx(X.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Bt({variant:a.variant})),...r,dir:s})});$e.displayName=X.Item.displayName;const It=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=St();return n.jsxs(X.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Bt({variant:a.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(X.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});It.displayName=X.CheckboxItem.displayName;const tr=i.forwardRef(({className:t,children:e,...r},o)=>{const s=St();return n.jsxs(X.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Bt({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(X.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});tr.displayName=X.RadioItem.displayName;const Se=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Se.displayName=X.Label.displayName;const me=i.forwardRef(({className:t,...e},r)=>n.jsx(X.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));me.displayName=X.Separator.displayName;function Fo({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Fo.displayName="DropdownMenuShortcut";function Je(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Ir({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:l,canEditOrDelete:c=!1}){const[d,w]=i.useState(!1),[p,u]=i.useState(),h=i.useRef(null);i.useEffect(()=>{if(!d)return;let M=!0;const F=h.current;if(!F)return;const $=setTimeout(()=>{M&&So(F)},300);return()=>{M=!1,clearTimeout($)}},[d]);const f=i.useCallback(()=>{w(!1),u(void 0),l==null||l(!1)},[l]),g=i.useCallback(async()=>{if(!p||!s)return;await s(t.id,tn(p))&&(w(!1),u(void 0),l==null||l(!1))},[p,s,t.id,l]),v=i.useMemo(()=>{const M=new Date(t.date),F=N.formatRelativeDate(M,r["%comment_date_today%"],r["%comment_date_yesterday%"]),$=M.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:F,time:$})},[t.date,r]),b=i.useMemo(()=>t.user,[t.user]),y=i.useMemo(()=>t.user.split(" ").map(M=>M[0]).join("").toUpperCase().slice(0,2),[t.user]),j=i.useMemo(()=>N.sanitizeHtml(t.contents),[t.contents]),C=i.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs($e,{onClick:()=>{w(!0),u(Qi(t.contents)),l==null||l(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs($e,{onClick:async()=>{a&&await a(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,l]);return n.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Yn,{className:"tw-h-8 tw-w-8",children:n.jsx(Xn,{className:"tw-text-xs tw-font-medium",children:y})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(le,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Je(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:M=>{M.key==="Escape"?(M.preventDefault(),M.stopPropagation(),f()):M.key==="Enter"&&M.shiftKey&&(M.preventDefault(),M.stopPropagation(),kt(p)&&g())},onKeyDown:M=>{qn(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(Qe,{className:m('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:M=>u(M)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(V,{size:"icon",onClick:f,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(V,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!kt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:j}})]})]}),C&&n.jsxs(Qt,{children:[n.jsx(ue,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:C})]})]})}const Or={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function al({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:l,handleSelectThread:c,threadId:d,thread:w,threadStatus:p,handleAddCommentToThread:u,handleUpdateComment:h,handleDeleteComment:f,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:y,canUserResolveThreadCallback:j,canUserEditOrDeleteCommentCallback:C,isRead:M=!1,autoReadDelay:F=5,onVerseRefClick:$}){const[_,T]=i.useState(Or),E=o,[R,P]=i.useState(!1),[L,I]=i.useState(!1),[A,z]=i.useState(!1),[S,B]=i.useState(void 0),[at,lt]=i.useState(!1),[Vt,ct]=i.useState(!1),[rt,G]=i.useState(M),[tt,wt]=i.useState(!1),ot=i.useRef(void 0),[vt,Re]=i.useState(new Map);i.useEffect(()=>{let D=!0;return(async()=>{const Rt=j?await j(d):!1;D&&ct(Rt)})(),()=>{D=!1}},[d,j]),i.useEffect(()=>{let D=!0;if(!o){lt(!1),Re(new Map);return}return(async()=>{const Rt=y?await y(d):!1;D&&lt(Rt)})(),()=>{D=!1}},[o,d,y]);const qt=i.useMemo(()=>e.filter(D=>!D.deleted),[e]);i.useEffect(()=>{let D=!0;if(!o||!C){Re(new Map);return}return(async()=>{const Rt=new Map;await Promise.all(qt.map(async xr=>{const sa=await C(xr.id);D&&Rt.set(xr.id,sa)})),D&&Re(Rt)})(),()=>{D=!1}},[o,qt,C]);const te=i.useMemo(()=>qt[0],[qt]),qe=i.useRef(null),he=i.useRef(void 0),ee=i.useCallback(()=>{var D;(D=he.current)==null||D.call(he),T(Or)},[]),fn=i.useCallback(()=>{const D=!rt;G(D),wt(!D),g==null||g(d,D)},[rt,g,d]);i.useEffect(()=>{P(!1)},[o]),i.useEffect(()=>{if(o&&!rt&&!tt){const D=setTimeout(()=>{G(!0),g==null||g(d,!0)},F*1e3);return ot.current=D,()=>clearTimeout(D)}ot.current&&(clearTimeout(ot.current),ot.current=void 0)},[o,rt,tt,F,d,g]);const O=i.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),K=i.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const D=Je(a,r);return N.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:D})},[a,r]),H=i.useMemo(()=>qt.slice(1),[qt]),Y=i.useMemo(()=>H.length??0,[H.length]),it=i.useMemo(()=>Y>0,[Y]),Ft=i.useMemo(()=>R||Y<=2?H:H.slice(-2),[H,Y,R]),mt=i.useMemo(()=>R||Y<=2?0:Y-2,[Y,R]),Ue=i.useMemo(()=>Y===1?O.singleReply:N.formatReplacementString(O.multipleReplies,{count:Y}),[Y,O]),ne=i.useMemo(()=>mt===1?O.singleReply:N.formatReplacementString(O.multipleReplies,{count:mt}),[mt,O]),hr=i.useCallback(async()=>{const D=kt(_)?tn(_):void 0;if(S!==void 0){await u({threadId:d,contents:D,assignedUser:S})&&(B(void 0),D&&ee());return}D&&await u({threadId:d,contents:D})&&ee()},[ee,_,u,S,d]),gr=i.useCallback(async D=>{const re=kt(_)?tn(_):void 0,Rt=await u({...D,contents:re,assignedUser:S??D.assignedUser});return Rt&&re&&ee(),Rt&&S!==void 0&&B(void 0),Rt},[ee,_,u,S]);return n.jsx(Un,{role:"option","aria-selected":o,id:d,className:m("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&rt,"tw-bg-background":o&&p!=="Resolved"&&rt,"tw-bg-muted":p==="Resolved","tw-bg-blue-50":!rt&&!o&&p!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(Hn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[K&&n.jsx(le,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:K}),n.jsx(V,{variant:"ghost",size:"icon",onClick:D=>{D.stopPropagation(),fn()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":rt?"Mark as unread":"Mark as read",children:rt?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),Vt&&p!=="Resolved"&&n.jsx(V,{variant:"ghost",size:"icon",className:m("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:D=>{D.stopPropagation(),gr({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:qe,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":E},{"tw-whitespace-nowrap":!E}),children:[s&&$?n.jsx(V,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:D=>{D.stopPropagation(),$(w)},children:s}):s,n.jsxs("span",{className:t,children:[te.contextBefore,n.jsx("span",{className:"tw-font-bold",children:te.selectedText}),te.contextAfter]})]})}),n.jsx(Ir,{comment:te,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:gr,handleUpdateComment:h,handleDeleteComment:f,onEditingChange:I,canEditOrDelete:vt.get(te.id)??!1,canUserResolveThread:Vt})]}),n.jsxs(n.Fragment,{children:[it&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ce,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ue})]}),!o&&kt(_)&&n.jsx(Qe,{editorSerializedState:_,onSerializedChange:D=>T(D),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[mt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:D=>{D.stopPropagation(),P(!0)},role:"button",tabIndex:0,onKeyDown:D=>{(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),D.stopPropagation(),P(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ce,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ne}),R?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),Ft.map(D=>n.jsx("div",{children:n.jsx(Ir,{comment:D,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:f,onEditingChange:I,canEditOrDelete:vt.get(D.id)??!1})},D.id)),b!==!1&&(!L||kt(_))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:D=>D.stopPropagation(),onKeyDownCapture:D=>{D.key==="Enter"&&D.shiftKey&&(D.preventDefault(),D.stopPropagation(),(kt(_)||S!==void 0)&&hr())},onKeyDown:D=>{qn(D),(D.key==="Enter"||D.key===" ")&&D.stopPropagation()},children:[n.jsx(Qe,{editorSerializedState:_,onSerializedChange:D=>T(D),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:D=>{he.current=D}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Je(S,r)})}),n.jsxs(zt,{open:A,onOpenChange:z,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!at||!v||v.length===0||!v.includes(l),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:D=>{D.key==="Escape"&&(D.stopPropagation(),z(!1))},children:n.jsx(At,{children:n.jsx(Pt,{children:v==null?void 0:v.map(D=>n.jsx(Et,{onSelect:()=>{B(D!==a?D:void 0),z(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Je(D,r)})},D||"unassigned"))})})})]}),n.jsx(V,{size:"icon",onClick:hr,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!kt(_)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function il({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:f,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[y,j]=i.useState(new Set),[C,M]=i.useState();i.useEffect(()=>{g&&(j(I=>new Set(I).add(g)),M(g))},[g]);const F=r.filter(I=>I.comments.some(A=>!A.deleted)),$=F.map(I=>({id:I.id})),_=i.useCallback(I=>{j(A=>new Set(A).add(I.id)),M(I.id),v==null||v(I.id)},[v]),T=i.useCallback(I=>{const A=y.has(I);j(z=>{const S=new Set(z);return S.has(I)?S.delete(I):S.add(I),S}),M(I),v==null||v(A?void 0:I)},[y,v]),{listboxRef:E,activeId:R,handleKeyDown:P}=To({options:$,onOptionSelect:_}),L=i.useCallback(I=>{I.key==="Escape"?(C&&y.has(C)&&(j(A=>{const z=new Set(A);return z.delete(C),z}),M(void 0),v==null||v(void 0)),I.preventDefault(),I.stopPropagation()):P(I)},[C,y,P,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":R??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:L,children:F.map(I=>n.jsx("div",{id:I.id,className:m({"tw-opacity-60":I.status==="Resolved"}),children:n.jsx(al,{classNameForVerseText:e,comments:I.comments,localizedStrings:s,verseRef:I.verseRef,handleSelectThread:T,threadId:I.id,thread:I,isRead:I.isRead,isSelected:y.has(I.id),currentUser:o,assignedUser:I.assignedUser,threadStatus:I.status,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:f,onVerseRefClick:b})},I.id))})}function ll({table:t}){return n.jsxs(Qt,{children:[n.jsx(zr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Kt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Se,{children:"Toggle columns"}),n.jsx(me,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(It,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const we=Z.Root,zo=Z.Group,de=Z.Value,Go=Zt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Wt=i.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=st();return n.jsxs(Z.Trigger,{className:m(Go({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(Z.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Wt.displayName=Z.Trigger.displayName;const er=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.ScrollUpButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));er.displayName=Z.ScrollUpButton.displayName;const nr=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.ScrollDownButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));nr.displayName=Z.ScrollDownButton.displayName;const Jt=i.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=st();return n.jsx(Z.Portal,{children:n.jsxs(Z.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(er,{}),n.jsx(Z.Viewport,{className:m("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(nr,{})]})})});Jt.displayName=Z.Content.displayName;const Bo=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.Label,{ref:r,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Bo.displayName=Z.Label.displayName;const gt=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(Z.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Z.ItemText,{children:e})]}));gt.displayName=Z.Item.displayName;const Ko=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ko.displayName=Z.Separator.displayName;function cl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(we,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Wt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(de,{placeholder:t.getState().pagination.pageSize})}),n.jsx(Jt,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(gt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Ar=`
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
`;function wl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ve(t,e){const r=e?`${Ar}, ${e}`:Ar;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&wl(o))}const Fe=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),i.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{Ve(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),Ve(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Fe.displayName="Table";const ze=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));ze.displayName="TableHeader";const Ge=i.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:m("[&_tr:last-child]:tw-border-0",t),...e}));Ge.displayName="TableBody";const qo=i.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));qo.displayName="TableFooter";function dl(t){i.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ve(t.current):[],a=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?a+1:a-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function pl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function ul(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Dt=i.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const l=i.useRef(null);i.useEffect(()=>{typeof a=="function"?a(l.current):a&&"current"in a&&(a.current=l.current)},[a]),dl(l);const c=i.useMemo(()=>l.current?Ve(l.current):[],[l]),d=i.useCallback(p=>{const{current:u}=l;if(!u||!u.parentElement)return;const h=u.closest("table"),f=h?Ve(h).filter(b=>b.tagName==="TR"):[],g=f.indexOf(u),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),ul(f,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),pl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const b=u.closest("table");b&&b.focus()}e==null||e(p)},[l,c,e]),w=i.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:w,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Dt.displayName="TableRow";const Ne=i.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ne.displayName="TableHead";const Yt=i.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Yt.displayName="TableCell";const Uo=i.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Uo.displayName="TableCaption";function en({className:t,...e}){return n.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Ho({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:l=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var $;const[p,u]=i.useState([]),[h,f]=i.useState([]),[g,v]=i.useState({}),[b,y]=i.useState({}),j=i.useMemo(()=>e??[],[e]),C=ut.useReactTable({data:j,columns:t,getCoreRowModel:ut.getCoreRowModel(),...r&&{getPaginationRowModel:ut.getPaginationRowModel()},onSortingChange:u,getSortedRowModel:ut.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:ut.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:y,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),M=C.getVisibleFlatColumns();let F;return d?F=Array.from({length:10}).map((E,R)=>`skeleton-row-${R}`).map(E=>n.jsx(Dt,{className:"hover:tw-bg-transparent",children:n.jsx(Yt,{colSpan:M.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(en,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):(($=C.getRowModel().rows)==null?void 0:$.length)>0?F=C.getRowModel().rows.map(_=>n.jsx(Dt,{onClick:()=>l(_,C),"data-state":_.getIsSelected()&&"selected",children:_.getVisibleCells().map(T=>n.jsx(Yt,{children:ut.flexRender(T.column.columnDef.cell,T.getContext())},T.id))},_.id)):F=n.jsx(Dt,{children:n.jsx(Yt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(ll,{table:C}),n.jsxs(Fe,{stickyHeader:a,children:[n.jsx(ze,{stickyHeader:a,children:C.getHeaderGroups().map(_=>n.jsx(Dt,{children:_.headers.map(T=>n.jsx(Ne,{className:"tw-p-0",children:T.isPlaceholder?void 0:ut.flexRender(T.column.columnDef.header,T.getContext())},T.id))},_.id))}),n.jsx(Ge,{children:F})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(V,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(V,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(cl,{table:C})]})}function ml({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(va,{options:a,children:e})})}const Yo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Pr=(t,e)=>t[e]??e;function Xo({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Pr(r,"%webView_error_dump_header%"),a=Pr(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const fl=Object.freeze([...Yo,"%webView_error_dump_copied_message%"]);function hl({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[l,c]=i.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(zt,{onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:o}),n.jsxs(Lt,{id:a,className:m("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(et,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Xo,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var Wo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Wo||{});function gl({id:t,label:e,groups:r}){const[o,s]=i.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,l]=i.useState({}),c=(w,p)=>{const u=!o[w][p];s(f=>(f[w][p]=u,{...f}));const h=r[w].items[p];h.onUpdate(h.id,u)},d=(w,p)=>{l(h=>(h[w]=p,{...h}));const u=r[w].items.find(h=>h.id===p);u?u.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Qt,{children:[n.jsx(ue,{asChild:!0,children:n.jsxs(V,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Kt,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Se,{children:w.label}),n.jsx(Jn,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((u,h)=>n.jsx("div",{children:n.jsx(It,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:u.label})},u.id))}):n.jsx(Vo,{value:a[p],onValueChange:u=>d(p,u),children:w.items.map(u=>n.jsx("div",{children:n.jsx(tr,{value:u.id,children:u.label})},u.id))})}),n.jsx(me,{})]},w.label))})]})})}function xl({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:l,handleSupportLinkClick:c}){const d=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,u)=>p+u,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function bl({id:t,versionHistory:e}){const[r,o]=i.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,u=w.getUTCMonth(),h=w.getUTCDate()-1;let f="";return p>0?f=`${p.toString()} year${p===1?"":"s"} ago`:u>0?f=`${u.toString()} month${u===1?"":"s"} ago`:h===0?f="today":f=`${h.toString()} day${h===1?"":"s"} ago`,f}const l=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function vl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const l=i.useMemo(()=>N.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return w.map(u=>p.of(u))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(bl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function Jo({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:u=!1,sortSelected:h=!1,icon:f=void 0,className:g=void 0,variant:v="ghost",id:b}){const[y,j]=i.useState(!1),C=i.useCallback(R=>{var L;const P=(L=t.find(I=>I.label===R))==null?void 0:L.value;P&&r(e.includes(P)?e.filter(I=>I!==P):[...e,P])},[t,e,r]),M=()=>d||o,F=i.useMemo(()=>{if(!h)return t;const R=t.filter(L=>L.starred).sort((L,I)=>L.label.localeCompare(I.label)),P=t.filter(L=>!L.starred).sort((L,I)=>{const A=e.includes(L.value),z=e.includes(I.value);return A&&!z?-1:!A&&z?1:L.label.localeCompare(I.label)});return[...R,...P]},[t,e,h]),$=()=>{r(t.map(R=>R.value))},_=()=>{r([])},T=w??y,E=p??j;return n.jsx("div",{id:b,className:g,children:n.jsxs(zt,{open:T,onOpenChange:E,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:v,role:"combobox","aria-expanded":T,className:"tw-group tw-w-full tw-justify-between",disabled:u,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[f&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:f})}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:M()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(At,{children:[n.jsx(pe,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:$,children:a}),n.jsx(V,{variant:"ghost",size:"sm",onClick:_,children:l})]}),n.jsxs(Pt,{children:[n.jsx(Ee,{children:c}),n.jsx(Ot,{children:F.map(R=>n.jsxs(Et,{value:R.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:m("tw-h-4 tw-w-4",e.includes(R.value)?"tw-opacity-100":"tw-opacity-0")})}),R.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:R.label}),R.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:R.secondaryLabel})]},R.label))})]})]})})]})})}function yl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:u}){return n.jsxs("div",{id:u,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Jo,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var f;return n.jsxs(le,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(f=t.find(g=>g.value===h))==null?void 0:f.label]},h)})}):n.jsx(et,{children:p})]})}const fe=i.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));fe.displayName="Input";const jl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Nl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),[d,w]=i.useState(t),[p,u]=i.useState(r),[h,f]=i.useState(!1);i.useEffect(()=>{w(t)},[t]),i.useEffect(()=>{p!==r&&u(r)},[r]);const g=b=>{c.current=!1,f(b),b||(d!=="custom"||p?(e(d),o(p)):(w(t),u(r)))},v=b=>{var y,j,C,M;b.stopPropagation(),document.activeElement===l.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((y=a.current)==null||y.focus(),c.current=!0):document.activeElement===a.current&&b.key==="ArrowUp"?((j=l.current)==null||j.focus(),c.current=!1):document.activeElement===a.current&&b.key==="ArrowLeft"&&((C=a.current)==null?void 0:C.selectionStart)===0&&((M=l.current)==null||M.focus(),c.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===l.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(Qt,{open:h,onOpenChange:g,children:[n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(ue,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6",children:jl(t,s,r)})})}),n.jsx(bt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Kt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=a.current)==null||b.focus())},children:[n.jsx(Se,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(me,{}),n.jsx(It,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.GENERATOR_NOTE_CALLER})]})}),n.jsx(It,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.HIDDEN_NOTE_CALLER})]})}),n.jsx(It,{ref:l,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var y;b.stopPropagation(),c.current=!0,(y=a.current)==null||y.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(fe,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>u(b.target.value)})]})})]})]})}const kl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),_l=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Cl({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Qt,{children:[n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Vr.TooltipTrigger,{asChild:!0,children:n.jsx(ue,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6",children:kl(t,r)})})}),n.jsx(bt,{children:n.jsx("p",{children:_l(t,r)})})]})}),n.jsxs(Kt,{className:"tw-z-[300]",children:[n.jsx(Se,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(me,{}),n.jsxs(It,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(It,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(It,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function El(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Sl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Rl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Tl({classNameForEditor:t,noteOps:e,onSave:r,onClose:o,scrRef:s,noteKey:a,editorOptions:l,localizedStrings:c}){const d=i.useRef(null),w=i.createRef(),[p,u]=i.useState("generated"),[h,f]=i.useState("*"),[g,v]=i.useState("f"),[b,y]=i.useState(!1),j=i.useMemo(()=>({...l,markerMenuTrigger:l.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...l.view??yt.getDefaultViewOptions(),noteMode:"expanded"}}),[l]);i.useEffect(()=>{var _;(_=d.current)==null||_.focus()}),i.useEffect(()=>{var E,R;let _;const T=e==null?void 0:e.at(0);if(T&&yt.isInsertEmbedOpOfType("note",T)){const P=(E=T.insert.note)==null?void 0:E.caller;let L="custom";P===yt.GENERATOR_NOTE_CALLER?L="generated":P===yt.HIDDEN_NOTE_CALLER?L="hidden":P&&f(P),u(L),v(((R=T.insert.note)==null?void 0:R.style)??"f"),_=setTimeout(()=>{var I;(I=d.current)==null||I.applyUpdate([T])},0)}return()=>{_&&clearTimeout(_)}},[e,a]);const C=i.useCallback(()=>{var T,E;const _=(E=(T=d.current)==null?void 0:T.getNoteOps(0))==null?void 0:E.at(0);_&&yt.isInsertEmbedOpOfType("note",_)&&(_.insert.note&&(p==="custom"?_.insert.note.caller=h:_.insert.note.caller=p==="generated"?yt.GENERATOR_NOTE_CALLER:yt.HIDDEN_NOTE_CALLER),r([_]))},[p,h,r]),M=()=>{var T;const _=(T=w.current)==null?void 0:T.getElementsByClassName("editor-input")[0];_!=null&&_.textContent&&navigator.clipboard.writeText(_.textContent)},F=_=>{var E,R,P,L,I;v(_);const T=(R=(E=d.current)==null?void 0:E.getNoteOps(0))==null?void 0:R.at(0);if(T&&yt.isInsertEmbedOpOfType("note",T)){T.insert.note&&(T.insert.note.style=_);const A=(L=(P=T.insert.note)==null?void 0:P.contents)==null?void 0:L.ops;g!=="x"&&_==="x"?A==null||A.forEach(z=>El(z)):g==="x"&&_!=="x"&&(A==null||A.forEach(z=>Sl(z))),(I=d.current)==null||I.applyUpdate([T,{delete:1}])}},$=_=>{var E,R,P,L,I;const T=(R=(E=d.current)==null?void 0:E.getNoteOps(0))==null?void 0:R.at(0);if(T&&yt.isInsertEmbedOpOfType("note",T)){_.content.length>1&&setTimeout(()=>{var S;(S=d.current)==null||S.applyUpdate([{retain:2},{delete:1}])},0);const A=(P=T.insert.note)==null?void 0:P.style,z=(I=(L=T.insert.note)==null?void 0:L.contents)==null?void 0:I.ops;A||y(!1),y(A==="x"?!!(z!=null&&z.every(S=>{var at,lt;if(!((at=S.attributes)!=null&&at.char))return!0;const B=((lt=S.attributes)==null?void 0:lt.char).style;return B==="xt"||B==="xo"||B==="xq"})):!!(z!=null&&z.every(S=>{var at,lt;if(!((at=S.attributes)!=null&&at.char))return!0;const B=((lt=S.attributes)==null?void 0:lt.char).style;return B==="ft"||B==="fr"||B==="fq"})))}else y(!1)};return n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Cl,{isTypeSwitchable:b,noteType:g,handleNoteTypeChange:F,localizedStrings:c}),n.jsx(Nl,{callerType:p,updateCallerType:u,customCaller:h,updateCustomCaller:f,localizedStrings:c})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(V,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:c["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(V,{onClick:C,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(k.Check,{})})}),n.jsx(bt,{children:c["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:w,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(yt.Editorial,{options:j,onUsjChange:$,defaultUsj:Rl,onScrRefChange:()=>{},scrRef:s,ref:d})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:n.jsx(V,{onClick:M,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(bt,{children:n.jsx("p",{children:c["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Ml=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function Zo(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Dl(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&a.push(l),l=[c]):l.push(c)}),l.length>0&&a.push(l),a.map((c,d)=>{const w=d===a.length-1;return n.jsxs("p",{children:[rr(t,c,r,!0,s),w&&o]},Zo(t,c))})}function rr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const l=`${t}-text-${a.slice(0,10)}`;if(o){const c=m(`usfm_${t}`);return n.jsx("span",{className:c,children:a},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Il(a,Zo(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function Il(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),rr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Qo({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),u=l&&n.jsxs(n.Fragment,{children:[rr(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",f=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=m(h,f);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[d,p]}),n.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:u}),n.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Dl(t.marker,c,o,w)})})]})}function Ol({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??N.getFormatCallerFunction(r,void 0),u=(j,C)=>{w==null||w(j,C,s)},h=a?r.findIndex(j=>j===a):-1,[f,g]=i.useState(h),v=(j,C,M)=>{if(r.length)switch(j.key){case"Enter":case" ":j.preventDefault(),w==null||w(C,M,s);break}},b=j=>{if(r.length)switch(j.key){case"ArrowDown":j.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":j.preventDefault(),g(C=>Math.max(C-1,0));break}},y=i.useRef([]);return i.useEffect(()=>{var j;f>=0&&f<y.current.length&&((j=y.current[f])==null||j.focus())},[f]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:f<0?0:-1,className:m("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((j,C)=>{const M=j===a,F=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:$=>{y.current[C]=$},role:"option","aria-selected":M,"data-marker":j.marker,"data-state":M?"selected":void 0,tabIndex:C===f?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>u(j,C),onKeyDown:$=>v($,j,C),children:n.jsx(Qo,{footnote:j,layout:o,formatCaller:()=>p(j.caller,C),showMarkers:l})},F),C<r.length-1&&o==="vertical"&&n.jsx(ce,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Al(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Pl({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(Fe,{stickyHeader:!0,children:[n.jsx(ze,{stickyHeader:!0,children:n.jsxs(Dt,{children:[n.jsx(Ne,{children:s}),n.jsx(Ne,{children:a})]})}),n.jsx(Ge,{children:l.length>0&&l.map(c=>n.jsxs(Dt,{onClick:()=>{e(c.reference)},children:[n.jsx(Yt,{children:N.formatScrRef(c.reference,"English")}),n.jsx(Yt,{className:o,children:Al(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const un=i.forwardRef(({className:t,...e},r)=>n.jsx(Rn.Root,{ref:r,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Rn.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));un.displayName=Rn.Root.displayName;const Ll=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Be=(t,e,r)=>n.jsx(xt,{children:n.jsxs(jt,{children:[n.jsxs(Nt,{className:m("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Ll(t.getIsSorted())]}),n.jsx(bt,{side:"bottom",children:e})]})}),$l=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Be(e,t)}),Vl=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Be(r,t)}),Fl=t=>({accessorKey:"count",header:({column:e})=>Be(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),kn=(t,e,r,o,s,a)=>{let l=[...r];t.forEach(d=>{e==="approved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),o(l);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},zl=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>Be(a,t,"tw-justify-center"),cell:({row:a})=>{const l=a.getValue("status"),c=a.getValue("item");return n.jsxs(pn,{value:l,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(ve,{onClick:d=>{d.stopPropagation(),kn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(ve,{onClick:d=>{d.stopPropagation(),kn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(ve,{onClick:d=>{d.stopPropagation(),kn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),Gl=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Bl=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Kl=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ts=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",ql=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Ul=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Hl=(t,e,r)=>t.map(o=>{const s=N.isString(o.key)?o.key:o.key[0];return{items:N.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||ts(s,e,r),occurrences:o.occurrences||[]}}),Tt=(t,e)=>t[e]??e;function Yl({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:l,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:u,onItemSelected:h}){const f=Tt(r,"%webView_inventory_all%"),g=Tt(r,"%webView_inventory_approved%"),v=Tt(r,"%webView_inventory_unapproved%"),b=Tt(r,"%webView_inventory_unknown%"),y=Tt(r,"%webView_inventory_scope_currentBook%"),j=Tt(r,"%webView_inventory_scope_chapter%"),C=Tt(r,"%webView_inventory_scope_verse%"),M=Tt(r,"%webView_inventory_filter_text%"),F=Tt(r,"%webView_inventory_show_additional_items%"),$=Tt(r,"%webView_inventory_no_results%"),[_,T]=i.useState(!1),[E,R]=i.useState("all"),[P,L]=i.useState(""),[I,A]=i.useState([]),z=i.useMemo(()=>{const G=t??[];return G.length===0?[]:Hl(G,s,a)},[t,s,a]),S=i.useMemo(()=>{if(_)return z;const G=[];return z.forEach(tt=>{const wt=tt.items[0],ot=G.find(vt=>vt.items[0]===wt);ot?(ot.count+=tt.count,ot.occurrences=ot.occurrences.concat(tt.occurrences)):G.push({items:[wt],count:tt.count,occurrences:tt.occurrences,status:tt.status})}),G},[_,z]),B=i.useMemo(()=>S.length===0?[]:Ul(S,E,P),[S,E,P]),at=i.useMemo(()=>{var wt,ot;if(!_)return d;const G=(wt=o==null?void 0:o.tableHeaders)==null?void 0:wt.length;if(!G)return d;const tt=[];for(let vt=0;vt<G;vt++)tt.push(Vl(((ot=o==null?void 0:o.tableHeaders)==null?void 0:ot[vt])||"Additional Item",vt+1));return[...tt,...d]},[o==null?void 0:o.tableHeaders,d,_]);i.useEffect(()=>{B.length===0?A([]):B.length===1&&A(B[0].items)},[B]);const lt=(G,tt)=>{tt.setRowSelection(()=>{const ot={};return ot[G.index]=!0,ot});const wt=G.original.items;A(wt),h&&wt.length>0&&h(wt[0])},Vt=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},ct=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")R(G);else throw new Error(`Invalid status filter value: ${G}`)},rt=i.useMemo(()=>{if(S.length===0||I.length===0)return[];const G=S.filter(tt=>N.deepEqual(_?tt.items:[tt.items[0]],I));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[I,_,S]);return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(we,{onValueChange:G=>ct(G),defaultValue:E,children:[n.jsx(Wt,{className:"tw-m-1",children:n.jsx(de,{placeholder:"Select filter"})}),n.jsxs(Jt,{children:[n.jsx(gt,{value:"all",children:f}),n.jsx(gt,{value:"approved",children:g}),n.jsx(gt,{value:"unapproved",children:v}),n.jsx(gt,{value:"unknown",children:b})]})]}),n.jsxs(we,{onValueChange:G=>Vt(G),defaultValue:l,children:[n.jsx(Wt,{className:"tw-m-1",children:n.jsx(de,{placeholder:"Select scope"})}),n.jsxs(Jt,{children:[n.jsx(gt,{value:"book",children:y}),n.jsx(gt,{value:"chapter",children:j}),n.jsx(gt,{value:"verse",children:C})]})]}),n.jsx(fe,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:M,value:P,onChange:G=>{L(G.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(un,{className:"tw-m-1",checked:_,onCheckedChange:G=>{T(G)}}),n.jsx(et,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??F})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Ho,{columns:at,data:B,onRowClickHandler:lt,stickyHeader:!0,isLoading:p,noResultsMessage:$})}),rt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Pl,{classNameForText:u,occurrenceData:rt,setScriptureReference:e,localizedStrings:r})})]})}const Xl=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Wl({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function Jl({localizedStrings:t,markerMenuItems:e}){const[r,o]=i.useState(""),s=i.useMemo(()=>{const a=r.trim().toLowerCase();return a?e.filter(l=>{var c;return((c=l.marker)==null?void 0:c.toLowerCase().includes(a))||l.title.toLowerCase().includes(a)}):e},[r,e]);return n.jsxs(At,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(pe,{value:r,onValueChange:a=>o(a),placeholder:t["%markerMenu_searchPlaceholder%"],autoFocus:!1}),n.jsxs(Pt,{children:[n.jsx(Ee,{children:t["%markerMenu_noResults%"]}),n.jsx(Ot,{children:s.map(a=>{var l;return n.jsxs(Et,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-6",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:n.jsx(Wl,{icon:a.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Jr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.marker??((l=a.icon)==null?void 0:l.displayName)}-${a.title.replaceAll(" ","")}`)})})]})]})}const Zl="16rem",Ql="3rem",es=i.createContext(void 0);function Ke(){const t=i.useContext(es);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const or=i.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:l="primary",...c},d)=>{const[w,p]=i.useState(t),u=e??w,h=i.useCallback(C=>{const M=typeof C=="function"?C(u):C;r?r(M):p(M)},[r,u]),f=i.useCallback(()=>h(C=>!C),[h]),g=u?"expanded":"collapsed",y=st()==="ltr"?l:l==="primary"?"secondary":"primary",j=i.useMemo(()=>({state:g,open:u,setOpen:h,toggleSidebar:f,side:y}),[g,u,h,f,y]);return n.jsx(es.Provider,{value:j,children:n.jsx(xt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Zl,"--sidebar-width-icon":Ql,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});or.displayName="SidebarProvider";const sr=i.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const l=Ke();return e==="none"?n.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});sr.displayName="Sidebar";const ns=i.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Ke();return n.jsxs(V,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ns.displayName="SidebarTrigger";const rs=i.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Ke();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});rs.displayName="SidebarRail";const ar=i.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));ar.displayName="SidebarInset";const os=i.forwardRef(({className:t,...e},r)=>n.jsx(fe,{ref:r,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));os.displayName="SidebarInput";const ss=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ss.displayName="SidebarHeader";const as=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));as.displayName="SidebarFooter";const is=i.forwardRef(({className:t,...e},r)=>n.jsx(ce,{ref:r,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));is.displayName="SidebarSeparator";const ir=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));ir.displayName="SidebarContent";const nn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));nn.displayName="SidebarGroup";const rn=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?ke.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});rn.displayName="SidebarGroupLabel";const ls=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?ke.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});ls.displayName="SidebarGroupAction";const on=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",t),...e}));on.displayName="SidebarGroupContent";const lr=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));lr.displayName="SidebarMenu";const cr=i.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",t),...e}));cr.displayName="SidebarMenuItem";const tc=Zt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),wr=i.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...l},c)=>{const d=t?ke.Slot:"button",{state:w}=Ke(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:m(tc({variant:r,size:o}),a),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:p}),n.jsx(bt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});wr.displayName="SidebarMenuButton";const cs=i.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?ke.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});cs.displayName="SidebarMenuAction";const ws=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ws.displayName="SidebarMenuBadge";const ds=i.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(en,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(en,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});ds.displayName="SidebarMenuSkeleton";const ps=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ps.displayName="SidebarMenuSub";const us=i.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));us.displayName="SidebarMenuSubItem";const ms=i.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const l=t?ke.Slot:"a";return n.jsx(l,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});ms.displayName="SidebarMenuSubButton";function fs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:d}){const w=i.useCallback((h,f)=>{o(h,f)},[o]),p=i.useCallback(h=>{const f=r.find(g=>g.projectId===h);return f?f.projectName:h},[r]),u=i.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(sr,{id:t,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(ir,{children:[n.jsxs(nn,{children:[n.jsx(rn,{className:"tw-text-sm",children:a}),n.jsx(on,{children:n.jsx(lr,{children:Object.entries(e).map(([h,f])=>n.jsx(cr,{children:n.jsx(wr,{onClick:()=>w(h),isActive:u(h),children:n.jsx("span",{className:"tw-pl-3",children:f})})},h))})})]}),n.jsxs(nn,{children:[n.jsx(rn,{className:"tw-text-sm",children:l}),n.jsx(on,{className:"tw-pl-3",children:n.jsx(Ze,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const f=p(h);w(f,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const mn=i.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:l},c)=>{const d=st();return n.jsxs("div",{id:l,className:m("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(fe,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:a}),t&&n.jsxs(V,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});mn.displayName="SearchBar";function ec({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(mn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(or,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(fs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(ar,{className:"tw-min-w-[215px]",children:o})]})]})}const Ut="scrBook",nc="scrRef",ae="source",rc="details",oc="Scripture Reference",sc="Scripture Book",hs="Type",ac="Details";function ic(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Ut,header:(t==null?void 0:t.scriptureReferenceColumnName)??oc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?Q.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Ut?N.formatScrRef(s.start):void 0},getGroupingValue:o=>Q.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:nc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ae,header:r?(t==null?void 0:t.typeColumnName)??hs:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:rc,header:(t==null?void 0:t.detailsColumnName)??ac,cell:o=>o.getValue(),enableGrouping:!1}]}const lc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||N.compareScrRefs(t.start,t.end)===0?`${N.scrRefToBBBCCCVVV(t.start)}+${e}`:`${N.scrRefToBBBCCCVVV(t.start)}+${e}-${N.scrRefToBBBCCCVVV(t.end)}+${r}`},Lr=t=>`${lc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function cc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:l,onRowSelected:c,id:d}){const[w,p]=i.useState([]),[u,h]=i.useState([{id:Ut,desc:!1}]),[f,g]=i.useState({}),v=i.useMemo(()=>t.flatMap(E=>E.data.map(R=>({...R,source:E.source}))),[t]),b=i.useMemo(()=>ic({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:l},r),[o,a,l,r]);i.useEffect(()=>{w.includes(ae)?h([{id:ae,desc:!1},{id:Ut,desc:!1}]):h([{id:Ut,desc:!1}])},[w]);const y=ut.useReactTable({data:v,columns:b,state:{grouping:w,sorting:u,rowSelection:f},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ut.getExpandedRowModel(),getGroupedRowModel:ut.getGroupedRowModel(),getCoreRowModel:ut.getCoreRowModel(),getSortedRowModel:ut.getSortedRowModel(),getRowId:Lr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(c){const E=y.getSelectedRowModel().rowsById,R=Object.keys(E);if(R.length===1){const P=v.find(L=>Lr(L)===R[0])||void 0;P&&c(P)}}},[f,v,c,y]);const j=s??sc,C=a??hs,M=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[Ut]},{label:`Group by ${C}`,value:[ae]},{label:`Group by ${j} and ${C}`,value:[Ut,ae]},{label:`Group by ${C} and ${j}`,value:[ae,Ut]}],F=E=>{p(JSON.parse(E))},$=(E,R)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(R)},_=(E,R)=>E.getIsGrouped()?"":m("banded-row",R%2===0?"even":"odd"),T=(E,R,P)=>{if(!((E==null?void 0:E.length)===0||R.depth<P.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(we,{value:JSON.stringify(w),onValueChange:E=>{F(E)},children:[n.jsx(Wt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(de,{})}),n.jsx(Jt,{position:"item-aligned",children:n.jsx(zo,{children:M.map(E=>n.jsx(gt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(Fe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(ze,{children:y.getHeaderGroups().map(E=>n.jsx(Dt,{children:E.headers.filter(R=>R.column.columnDef.header).map(R=>n.jsx(Ne,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:n.jsxs("div",{children:[R.column.getCanGroup()?n.jsx(V,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ut.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},E.id))}),n.jsx(Ge,{children:y.getRowModel().rows.map((E,R)=>{const P=st();return n.jsx(Dt,{"data-state":E.getIsSelected()?"selected":"",className:m(_(E,R)),onClick:L=>$(E,L),children:E.getVisibleCells().map(L=>{if(!(L.getIsPlaceholder()||L.column.columnDef.enableGrouping&&!L.getIsGrouped()&&(L.column.columnDef.id!==ae||!r)))return n.jsx(Yt,{className:m(L.column.columnDef.id,"tw-p-[1px]",T(w,E,L)),children:L.getIsGrouped()?n.jsxs(V,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!E.getIsExpanded()&&(P==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",ut.flexRender(L.column.columnDef.cell,L.getContext())," (",E.subRows.length,")"]}):ut.flexRender(L.column.columnDef.cell,L.getContext())},L.id)})},E.id)})})]})]})}const dr=(t,e)=>t.filter(r=>{try{return N.getSectionForBook(r)===e}catch{return!1}}),gs=(t,e,r)=>dr(t,e).every(o=>r.includes(o));function wc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=dr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(V,{variant:"outline",size:"sm",onClick:()=>o(t),className:m(gs(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:Aa(t,l,c,d,w)})}const $r=5,_n=6;function dc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],u=o["%webView_book_selector_more%"],{otLong:h,ntLong:f,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,y]=i.useState(!1),[j,C]=i.useState(""),M=i.useRef(void 0),F=i.useRef(!1);if(t.length!==Q.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const $=i.useMemo(()=>Q.Canon.allBookIds.filter((A,z)=>t[z]==="1"&&!Q.Canon.isObsolete(Q.Canon.bookIdToNumber(A))),[t]),_=i.useMemo(()=>{if(!j.trim()){const S={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return $.forEach(B=>{const at=N.getSectionForBook(B);S[at].push(B)}),S}const A=$.filter(S=>$n(S,j,s)),z={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return A.forEach(S=>{const B=N.getSectionForBook(S);z[B].push(S)}),z},[$,j,s]),T=i.useCallback((A,z=!1)=>{if(!z||!M.current){r(e.includes(A)?e.filter(ct=>ct!==A):[...e,A]),M.current=A;return}const S=$.findIndex(ct=>ct===M.current),B=$.findIndex(ct=>ct===A);if(S===-1||B===-1)return;const[at,lt]=[Math.min(S,B),Math.max(S,B)],Vt=$.slice(at,lt+1).map(ct=>ct);r(e.includes(A)?e.filter(ct=>!Vt.includes(ct)):[...new Set([...e,...Vt])])},[e,r,$]),E=A=>{T(A,F.current),F.current=!1},R=(A,z)=>{A.preventDefault(),T(z,A.shiftKey)},P=i.useCallback(A=>{const z=dr($,A).map(S=>S);r(gs($,A,e)?e.filter(S=>!z.includes(S)):[...new Set([...e,...z])])},[e,r,$]),L=()=>{r($.map(A=>A))},I=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(A=>n.jsx(wc,{section:A,availableBookIds:$,selectedBookIds:e,onToggle:P,localizedStrings:o},A))}),n.jsxs(zt,{open:b,onOpenChange:A=>{y(A),A||C("")},children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:l,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(At,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(F.current=A.shiftKey)},children:[n.jsx(pe,{placeholder:c,value:j,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:L,children:d}),n.jsx(V,{variant:"ghost",size:"sm",onClick:I,children:w})]}),n.jsxs(Pt,{children:[n.jsx(Ee,{children:p}),Object.values(N.Section).map((A,z)=>{const S=_[A];if(S.length!==0)return n.jsxs(i.Fragment,{children:[n.jsx(Ot,{heading:Zr(A,h,f,g,v),children:S.map(B=>n.jsx(to,{bookId:B,isSelected:e.includes(B),onSelect:()=>E(B),onMouseDown:at=>R(at,B),section:N.getSectionForBook(B),showCheck:!0,localizedBookNames:s,commandValue:Dn(B,s),className:"tw-flex tw-items-center"},B))}),z<Object.values(N.Section).length-1&&n.jsx(Wr,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===_n?_n:$r).map(A=>n.jsx(le,{className:"hover:tw-bg-secondary",variant:"secondary",children:be(A,s)},A)),e.length>_n&&n.jsx(le,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-$r} ${u}`})]})]})}const pc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),oe=(t,e)=>t[e]??e;function uc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:l,localizedBookNames:c,id:d}){const w=oe(l,"%webView_scope_selector_selected_text%"),p=oe(l,"%webView_scope_selector_current_verse%"),u=oe(l,"%webView_scope_selector_current_chapter%"),h=oe(l,"%webView_scope_selector_current_book%"),f=oe(l,"%webView_scope_selector_choose_books%"),g=oe(l,"%webView_scope_selector_scope%"),v=oe(l,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:f,id:"scope-selected"}],y=e?b.filter(j=>e.includes(j.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(et,{children:g}),n.jsx(cn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:y.map(({value:j,label:C,id:M})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{className:"tw-me-2",value:j,id:M}),n.jsx(et,{htmlFor:M,children:C})]},M))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(et,{children:v}),n.jsx(dc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:l,localizedBookNames:c})]})]})}const Cn={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function mc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:l}){const c={...Cn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Cn?Cn[w]:p]))},d=st();return n.jsxs(we,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(Wt,{size:s,className:m("pr-twp tw-w-auto",a),children:n.jsx(de,{placeholder:c[N.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(Jt,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:250},children:t.map(w=>n.jsx(gt,{value:`${w}`,children:c[N.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function fc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function hc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function gc({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ce,{}):""]})}function xs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function sn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const bs=(t,e,r,o)=>r?Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:"command"in c?n.jsxs($e,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(sn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(sn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs($o,{children:[n.jsx(Zn,{children:c.label}),n.jsx(Lo,{children:n.jsx(Qn,{children:bs(t,e,xs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(bt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function an({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:l="ghost",id:c}){return n.jsxs(Qt,{variant:a,children:[n.jsx(ue,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(V,{variant:l,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Kt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(i.Fragment,{children:[n.jsx(Jn,{children:n.jsx(xt,{children:bs(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(me,{})]},d))})]})}const vs=i.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function xc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(vs,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(an,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(an,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function bc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(vs,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(an,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const pr=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(ht.Root,{orientation:"vertical",ref:r,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});pr.displayName=ht.List.displayName;const ur=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.List,{ref:r,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));ur.displayName=ht.List.displayName;const ys=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Trigger,{ref:r,...e,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),mr=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Content,{ref:r,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));mr.displayName=ht.Content.displayName;function vc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(mn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(pr,{children:[n.jsx(ur,{children:t.map(c=>n.jsx(ys,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(mr,{value:c.value,children:c.content},c.key))]})]})}function yc({...t}){return n.jsx(W.Menu,{...t})}function jc({...t}){return n.jsx(W.Sub,{"data-slot":"menubar-sub",...t})}const js=i.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=i.useMemo(()=>({variant:e}),[e]);return n.jsx(Wn.Provider,{value:s,children:n.jsx(W.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});js.displayName=W.Root.displayName;const Ns=i.forwardRef(({className:t,...e},r)=>{const o=St();return n.jsx(W.Trigger,{ref:r,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Bt({variant:o.variant,className:t})),...e})});Ns.displayName=W.Trigger.displayName;const ks=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=St();return n.jsxs(W.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Bt({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});ks.displayName=W.SubTrigger.displayName;const _s=i.forwardRef(({className:t,...e},r)=>{const o=St();return n.jsx(W.SubContent,{ref:r,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});_s.displayName=W.SubContent.displayName;const Cs=i.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const l=St();return n.jsx(W.Portal,{children:n.jsx(W.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Cs.displayName=W.Content.displayName;const Es=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=St();return n.jsx(W.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Bt({variant:s.variant,className:t}),t),...r})});Es.displayName=W.Item.displayName;const Nc=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=St();return n.jsxs(W.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Bt({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(W.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Nc.displayName=W.CheckboxItem.displayName;const kc=i.forwardRef(({className:t,children:e,...r},o)=>{const s=St();return n.jsxs(W.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Bt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(W.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});kc.displayName=W.RadioItem.displayName;const _c=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(W.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));_c.displayName=W.Label.displayName;const Ss=i.forwardRef(({className:t,...e},r)=>n.jsx(W.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ss.displayName=W.Separator.displayName;const Me=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Rs=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order);return s.flatMap(([a],l)=>{const c=e.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(jt,{children:[n.jsx(Nt,{asChild:!0,children:"command"in w?n.jsxs(Es,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(sn,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(sn,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(jc,{children:[n.jsx(ks,{children:w.label}),n.jsx(_s,{children:Rs(t,e,xs(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(bt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&l<s.length-1&&d.push(n.jsx(Ss,{},`separator-${a}`)),d})};function Cc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=i.useRef(void 0),a=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),d=i.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return d;default:return}};if(ka.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,u)=>{var g,v,b,y;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(u.hotkey){case"alt":Me(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Me(a,[h,f]);break;case"alt+l":(v=l.current)==null||v.focus(),Me(l,[h,f]);break;case"alt+n":(b=c.current)==null||b.focus(),Me(c,[h,f]);break;case"alt+h":(y=d.current)==null||y.focus(),Me(d,[h,f]);break}}),i.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(f=>{f.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(f=>{p.observe(f,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(js,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,u])=>typeof p=="boolean"||typeof u=="boolean"?0:p.order-u.order).map(([p,u])=>n.jsxs(yc,{children:[n.jsx(Ns,{ref:w(p),children:typeof u=="object"&&"label"in u&&u.label}),n.jsx(Cs,{className:"tw-z-[250]",children:n.jsx(xt,{children:Rs(t.groups,t.items,p,e)})})]},p))})}function Ec(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Sc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=i.useRef(void 0);return n.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(Cc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Rc=(t,e)=>t[e]??e;function Tc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:l,className:c,id:d}){const w=Rc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,u]=i.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),a&&r.find(v=>v===g)&&a([...r.filter(v=>v!==g)]),u(!1)},f=(g,v)=>{var y,j,C,M,F,$;const b=v!==g?((j=(y=t[g])==null?void 0:y.uiNames)==null?void 0:j[v])??((M=(C=t[g])==null?void 0:C.uiNames)==null?void 0:M.en):void 0;return b?`${(F=t[g])==null?void 0:F.autonym} (${b})`:($=t[g])==null?void 0:$.autonym};return n.jsxs("div",{id:d,className:m("pr-twp tw-max-w-sm",c),children:[n.jsxs(we,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>u(g),children:[n.jsx(Wt,{children:n.jsx(de,{})}),n.jsx(Jt,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(gt,{value:g,children:f(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(et,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>f(g,e)).join(", "):t.en.autonym})})})]})}function Mc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(et,{children:e(t)}):r?n.jsx(et,{children:r(t)}):n.jsx(et,{children:t})}function Dc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(un,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Mc,{item:c,createLabel:a,createComplexLabel:l})]},c))})}function Ic({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:l,dropdownContent:c,additionalSelectedContent:d,accentColor:w}){const p=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:m("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c&&n.jsxs(Qt,{children:[n.jsx(ue,{className:m(w&&"tw-me-1"),asChild:!0,children:n.jsx(V,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:c})]})]}),e&&d&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),w&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},t)}const Ts=i.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:m("tw-animate-spin",t),...e,ref:r}));Ts.displayName="Spinner";function Oc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:u,onFocus:h,onBlur:f}){return n.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(et,{htmlFor:t,className:m({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(fe,{id:t,disabled:e,placeholder:l,required:c,className:m(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:u,onFocus:h,onBlur:f}),n.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Ac=Zt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ms=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Ac({variant:e}),t),...r}));Ms.displayName="Alert";const Ds=i.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ds.displayName="AlertTitle";const Is=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Is.displayName="AlertDescription";const Pc=J.Root,Lc=J.Trigger,$c=J.Group,Vc=J.Portal,Fc=J.Sub,zc=J.RadioGroup,Os=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(J.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Os.displayName=J.SubTrigger.displayName;const As=i.forwardRef(({className:t,...e},r)=>n.jsx(J.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));As.displayName=J.SubContent.displayName;const Ps=i.forwardRef(({className:t,...e},r)=>n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:r,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Ps.displayName=J.Content.displayName;const Ls=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));Ls.displayName=J.Item.displayName;const $s=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(J.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));$s.displayName=J.CheckboxItem.displayName;const Vs=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(J.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Vs.displayName=J.RadioItem.displayName;const Fs=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));Fs.displayName=J.Label.displayName;const zs=i.forwardRef(({className:t,...e},r)=>n.jsx(J.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));zs.displayName=J.Separator.displayName;function Gs({className:t,...e}){return n.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Gs.displayName="ContextMenuShortcut";const Bs=i.createContext({direction:"bottom"});function Ks({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=i.useMemo(()=>({direction:e}),[e]);return n.jsx(Bs.Provider,{value:o,children:n.jsx(Ct.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}Ks.displayName="Drawer";const Gc=Ct.Drawer.Trigger,qs=Ct.Drawer.Portal,Bc=Ct.Drawer.Close,fr=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));fr.displayName=Ct.Drawer.Overlay.displayName;const Us=i.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=i.useContext(Bs),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(qs,{children:[n.jsx(fr,{}),n.jsxs(Ct.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",l[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});Us.displayName="DrawerContent";function Hs({className:t,...e}){return n.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Hs.displayName="DrawerHeader";function Ys({className:t,...e}){return n.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Ys.displayName="DrawerFooter";const Xs=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Xs.displayName=Ct.Drawer.Title.displayName;const Ws=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Ws.displayName=Ct.Drawer.Description.displayName;const Js=i.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Tn.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Tn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Js.displayName=Tn.Root.displayName;function Kc({className:t,...e}){return n.jsx(Pn.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const qc=Pn.Panel;function Uc({withHandle:t,className:e,...r}){return n.jsx(Pn.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Hc({...t}){return n.jsx(Gr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Zs=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsxs(De.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(De.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(De.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(De.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Zs.displayName=De.Root.displayName;const Qs=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(Mn.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Mn.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Qs.displayName=Mn.Root.displayName;const Yc=ht.Root,ta=i.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(ht.List,{ref:r,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ta.displayName=ht.List.displayName;const ea=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Trigger,{ref:r,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ea.displayName=ht.Trigger.displayName;const na=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Content,{ref:r,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));na.displayName=ht.Content.displayName;const ra=i.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ra.displayName="Textarea";const Xc=(t,e)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Wc(t){return{preserveValue:!0,...t}}const oa=(t,e,r={})=>{const o=i.useRef(e);o.current=e;const s=i.useRef(r);s.current=Wc(s.current);const[a,l]=i.useState(()=>o.current),[c,d]=i.useState(!0);return i.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(l(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[a,c]},En=()=>!1,Jc=(t,e)=>{const[r]=oa(i.useCallback(async()=>{if(!t)return En;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),En,{preserveValue:!1});i.useEffect(()=>()=>{r!==En&&r()},[r])};function Zc(t){i.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Gr.toast});exports.Alert=Ms;exports.AlertDescription=Is;exports.AlertTitle=Ds;exports.Avatar=Yn;exports.AvatarFallback=Xn;exports.AvatarImage=Po;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ga;exports.BOOK_SELECTOR_STRING_KEYS=qa;exports.Badge=le;exports.BookChapterControl=za;exports.BookSelectionMode=ro;exports.BookSelector=Ua;exports.Button=V;exports.COMMENT_EDITOR_STRING_KEYS=nl;exports.COMMENT_LIST_STRING_KEYS=rl;exports.Card=Un;exports.CardContent=Hn;exports.CardDescription=Oo;exports.CardFooter=Ao;exports.CardHeader=Do;exports.CardTitle=Io;exports.ChapterRangeSelector=no;exports.Checkbox=un;exports.Checklist=Dc;exports.ComboBox=Ze;exports.Command=At;exports.CommandEmpty=Ee;exports.CommandGroup=Ot;exports.CommandInput=pe;exports.CommandItem=Et;exports.CommandList=Pt;exports.CommentEditor=el;exports.CommentList=il;exports.ContextMenu=Pc;exports.ContextMenuCheckboxItem=$s;exports.ContextMenuContent=Ps;exports.ContextMenuGroup=$c;exports.ContextMenuItem=Ls;exports.ContextMenuLabel=Fs;exports.ContextMenuPortal=Vc;exports.ContextMenuRadioGroup=zc;exports.ContextMenuRadioItem=Vs;exports.ContextMenuSeparator=zs;exports.ContextMenuShortcut=Gs;exports.ContextMenuSub=Fc;exports.ContextMenuSubContent=As;exports.ContextMenuSubTrigger=Os;exports.ContextMenuTrigger=Lc;exports.DataTable=Ho;exports.Drawer=Ks;exports.DrawerClose=Bc;exports.DrawerContent=Us;exports.DrawerDescription=Ws;exports.DrawerFooter=Ys;exports.DrawerHeader=Hs;exports.DrawerOverlay=fr;exports.DrawerPortal=qs;exports.DrawerTitle=Xs;exports.DrawerTrigger=Gc;exports.DropdownMenu=Qt;exports.DropdownMenuCheckboxItem=It;exports.DropdownMenuContent=Kt;exports.DropdownMenuGroup=Jn;exports.DropdownMenuItem=$e;exports.DropdownMenuItemType=Wo;exports.DropdownMenuLabel=Se;exports.DropdownMenuPortal=Lo;exports.DropdownMenuRadioGroup=Vo;exports.DropdownMenuRadioItem=tr;exports.DropdownMenuSeparator=me;exports.DropdownMenuShortcut=Fo;exports.DropdownMenuSub=$o;exports.DropdownMenuSubContent=Qn;exports.DropdownMenuSubTrigger=Zn;exports.DropdownMenuTrigger=ue;exports.ERROR_DUMP_STRING_KEYS=Yo;exports.ERROR_POPOVER_STRING_KEYS=fl;exports.ErrorDump=Xo;exports.ErrorPopover=hl;exports.FOOTNOTE_EDITOR_STRING_KEYS=Ml;exports.Filter=yl;exports.FilterDropdown=gl;exports.Footer=vl;exports.FootnoteEditor=Tl;exports.FootnoteItem=Qo;exports.FootnoteList=Ol;exports.INVENTORY_STRING_KEYS=ql;exports.Input=fe;exports.Inventory=Yl;exports.Label=et;exports.MARKER_MENU_STRING_KEYS=Xl;exports.MarkdownRenderer=ml;exports.MarkerMenu=Jl;exports.MoreInfo=xl;exports.MultiSelectComboBox=Jo;exports.NavigationContentSearch=vc;exports.Popover=zt;exports.PopoverAnchor=Pa;exports.PopoverContent=Lt;exports.PopoverTrigger=Gt;exports.Progress=Js;exports.RadioGroup=cn;exports.RadioGroupItem=Pe;exports.RecentSearches=eo;exports.ResizableHandle=Uc;exports.ResizablePanel=qc;exports.ResizablePanelGroup=Kc;exports.ResultsCard=Ic;exports.SCOPE_SELECTOR_STRING_KEYS=pc;exports.ScopeSelector=uc;exports.ScriptureResultsViewer=cc;exports.ScrollGroupSelector=mc;exports.SearchBar=mn;exports.Select=we;exports.SelectContent=Jt;exports.SelectGroup=zo;exports.SelectItem=gt;exports.SelectLabel=Bo;exports.SelectScrollDownButton=nr;exports.SelectScrollUpButton=er;exports.SelectSeparator=Ko;exports.SelectTrigger=Wt;exports.SelectValue=de;exports.Separator=ce;exports.SettingsList=fc;exports.SettingsListHeader=gc;exports.SettingsListItem=hc;exports.SettingsSidebar=fs;exports.SettingsSidebarContentSearch=ec;exports.Sidebar=sr;exports.SidebarContent=ir;exports.SidebarFooter=as;exports.SidebarGroup=nn;exports.SidebarGroupAction=ls;exports.SidebarGroupContent=on;exports.SidebarGroupLabel=rn;exports.SidebarHeader=ss;exports.SidebarInput=os;exports.SidebarInset=ar;exports.SidebarMenu=lr;exports.SidebarMenuAction=cs;exports.SidebarMenuBadge=ws;exports.SidebarMenuButton=wr;exports.SidebarMenuItem=cr;exports.SidebarMenuSkeleton=ds;exports.SidebarMenuSub=ps;exports.SidebarMenuSubButton=ms;exports.SidebarMenuSubItem=us;exports.SidebarProvider=or;exports.SidebarRail=rs;exports.SidebarSeparator=is;exports.SidebarTrigger=ns;exports.Skeleton=en;exports.Slider=Zs;exports.Sonner=Hc;exports.Spinner=Ts;exports.Switch=Qs;exports.TabDropdownMenu=an;exports.TabFloatingMenu=bc;exports.TabToolbar=xc;exports.Table=Fe;exports.TableBody=Ge;exports.TableCaption=Uo;exports.TableCell=Yt;exports.TableFooter=qo;exports.TableHead=Ne;exports.TableHeader=ze;exports.TableRow=Dt;exports.Tabs=Yc;exports.TabsContent=na;exports.TabsList=ta;exports.TabsTrigger=ea;exports.TextField=Oc;exports.Textarea=ra;exports.ToggleGroup=pn;exports.ToggleGroupItem=ve;exports.Toolbar=Sc;exports.Tooltip=jt;exports.TooltipContent=bt;exports.TooltipProvider=xt;exports.TooltipTrigger=Nt;exports.UiLanguageSelector=Tc;exports.VerticalTabs=pr;exports.VerticalTabsContent=mr;exports.VerticalTabsList=ur;exports.VerticalTabsTrigger=ys;exports.badgeVariants=Mo;exports.buttonVariants=Vn;exports.cn=m;exports.getBookIdFromUSFM=Kl;exports.getInventoryHeader=Be;exports.getLinesFromUSFM=Gl;exports.getNumberFromUSFM=Bl;exports.getStatusForItem=ts;exports.getToolbarOSReservedSpaceClassName=Ec;exports.inventoryCountColumn=Fl;exports.inventoryItemColumn=$l;exports.inventoryStatusColumn=zl;exports.selectTriggerVariants=Go;exports.useEvent=Xc;exports.useEventAsync=Jc;exports.useListbox=To;exports.usePromise=oa;exports.useRecentSearches=La;exports.useSidebar=Ke;exports.useStylesheet=Zc;function Qc(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Qc(`*, ::before, ::after {
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
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-z-\\[300\\] {
  z-index: 300;
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
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
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
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
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

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

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
