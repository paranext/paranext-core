"use strict";var ia=Object.defineProperty;var la=(t,e,r)=>e in t?ia(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var dt=(t,e,r)=>la(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),i=require("react"),ft=require("cmdk"),k=require("lucide-react"),ca=require("clsx"),wa=require("tailwind-merge"),da=require("@radix-ui/react-dialog"),Q=require("@sillsdev/scripture"),j=require("platform-bible-utils"),_e=require("@radix-ui/react-slot"),ee=require("class-variance-authority"),pa=require("@radix-ui/react-popover"),ua=require("@radix-ui/react-label"),ma=require("@radix-ui/react-radio-group"),b=require("lexical"),Lr=require("@radix-ui/react-tooltip"),Rn=require("@lexical/rich-text"),gr=require("react-dom"),fa=require("@lexical/table"),ha=require("@radix-ui/react-toggle-group"),ga=require("@radix-ui/react-toggle"),$r=require("@lexical/headless"),xa=require("@radix-ui/react-separator"),ba=require("@radix-ui/react-avatar"),Vr=require("@radix-ui/react-dropdown-menu"),ut=require("@tanstack/react-table"),va=require("@radix-ui/react-select"),ya=require("markdown-to-jsx"),xt=require("@eten-tech-foundation/platform-editor"),ja=require("@radix-ui/react-checkbox"),Na=require("@radix-ui/react-tabs"),ka=require("@radix-ui/react-menubar"),_a=require("react-hotkeys-hook"),Ca=require("@radix-ui/react-context-menu"),Ct=require("vaul"),Sa=require("@radix-ui/react-progress"),Ea=require("react-resizable-panels"),Fr=require("sonner"),Ra=require("@radix-ui/react-slider"),Ta=require("@radix-ui/react-switch");function nt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const _t=nt(da),je=nt(pa),zr=nt(ua),Ae=nt(ma),Fe=nt(Lr),an=nt(ha),Gr=nt(ga),Br=nt(xa),Ce=nt(ba),H=nt(Vr),Z=nt(va),Tn=nt(ja),ht=nt(Na),Y=nt(ka),X=nt(Ca),Mn=nt(Sa),Ln=nt(Ea),De=nt(Ra),Dn=nt(Ta),Ma=wa.extendTailwindMerge({prefix:"tw-"});function m(...t){return Ma(ca.clsx(t))}const Da="layoutDirection";function ot(){const t=localStorage.getItem(Da);return t==="rtl"?t:"ltr"}const Ia=_t.Root,Oa=_t.Portal,Kr=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Kr.displayName=_t.Overlay.displayName;const qr=i.forwardRef(({className:t,children:e,...r},o)=>{const s=ot();return n.jsxs(Oa,{children:[n.jsx(Kr,{}),n.jsxs(_t.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(_t.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});qr.displayName=_t.Content.displayName;function Ur({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Ur.displayName="DialogHeader";const Hr=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Hr.displayName=_t.Title.displayName;const Aa=i.forwardRef(({className:t,...e},r)=>n.jsx(_t.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Aa.displayName=_t.Description.displayName;const Pt=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command,{ref:r,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Pt.displayName=ft.Command.displayName;const ue=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(ft.Command.Input,{ref:r,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});ue.displayName=ft.Command.Input.displayName;const Lt=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.List,{ref:r,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Lt.displayName=ft.Command.List.displayName;const Se=i.forwardRef((t,e)=>n.jsx(ft.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Se.displayName=ft.Command.Empty.displayName;const At=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Group,{ref:r,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));At.displayName=ft.Command.Group.displayName;const Yr=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Separator,{ref:r,className:m("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Yr.displayName=ft.Command.Separator.displayName;const St=i.forwardRef(({className:t,...e},r)=>n.jsx(ft.Command.Item,{ref:r,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));St.displayName=ft.Command.Item.displayName;function Xr({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Xr.displayName="CommandShortcut";const Wr=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"Old Testament";case j.Section.NT:return r??"New Testament";case j.Section.DC:return o??"Deuterocanon";case j.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Pa=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"OT";case j.Section.NT:return r??"NT";case j.Section.DC:return o??"DC";case j.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ve(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??Q.Canon.bookIdToEnglishName(t)}function $n(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Jr=Q.Canon.allBookIds.filter(t=>!Q.Canon.isObsolete(Q.Canon.bookIdToNumber(t))),le=Object.fromEntries(Jr.map(t=>[t,Q.Canon.bookIdToEnglishName(t)]));function Vn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=Q.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(j.includes(s.toLowerCase(),o)||j.includes(t.toLowerCase(),o)||(a?j.includes(a.localizedName.toLowerCase(),o)||j.includes(a.localizedId.toLowerCase(),o):!1))}const Zr=i.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:l=!1,localizedBookNames:c,commandValue:d},w)=>{const p=i.useRef(!1),f=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(t)},u=i.useMemo(()=>ve(t,c),[t,c]),g=i.useMemo(()=>$n(t,c),[t,c]);return n.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===j.Section.OT,"tw-border-s-purple-200":s===j.Section.NT,"tw-border-s-indigo-200":s===j.Section.DC,"tw-border-s-amber-200":s===j.Section.Extra}),children:n.jsxs(St,{ref:w,value:d||`${t} ${Q.Canon.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${Q.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[l&&n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Qr=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),V=i.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const l=o?_e.Slot:"button";return n.jsx(l,{className:m(Qr({variant:e,size:r,className:t})),ref:a,...s})});V.displayName="Button";const zt=je.Root,Gt=je.Trigger,La=je.Anchor,$t=i.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const a=ot();return n.jsx(je.Portal,{children:n.jsx(je.Content,{ref:s,align:e,sideOffset:r,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:a})})});$t.displayName=je.Content.displayName;function In(t,e,r){return`${t} ${le[t]}${e?` ${$n(t,e)} ${ve(t,e)}`:""}${r?` ${r}`:""}`}function to({recentSearches:t,onSearchItemSelect:e,renderItem:r=d=>String(d),getItemKey:o=d=>String(d),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:l,classNameForItems:c}){const[d,w]=i.useState(!1);if(t.length===0)return;const p=f=>{e(f),w(!1)};return n.jsxs(zt,{open:d,onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx($t,{id:l,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Pt,{children:n.jsx(Lt,{children:n.jsx(At,{heading:a,children:t.map(f=>n.jsxs(St,{onSelect:()=>p(f),className:m("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(f)})]},o(f)))})})})})]})}function $a(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),l=[s,...a.slice(0,o-1)];e(l)}}const gn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Va=[gn.BOOK_ONLY,gn.BOOK_CHAPTER,gn.BOOK_CHAPTER_VERSE];function xr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Mt(t){return j.getChaptersForBook(Q.Canon.bookIdToNumber(t))}function Fa(t,e,r){if(!t.trim()||e.length===0)return;const o=Va.reduce((s,a)=>{if(s)return s;const l=a.exec(t.trim());if(l){const[c,d=void 0,w=void 0]=l.slice(1);let p;const f=e.filter(h=>Vn(h,c,r));if(f.length===1&&([p]=f),!p&&d){if(Q.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&d){const u=(g=>Object.keys(le).find(v=>le[v].toLowerCase()===g.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=d?parseInt(d,10):void 0;h&&h>Mt(p)&&(h=Math.max(Mt(p),1));const u=w?parseInt(w,10):void 0;return{book:p,chapterNum:h,verseNum:u}}}},void 0);if(o)return o}function za(t,e,r,o){const s=i.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],p=Math.max(Mt(w),1);o({book:w,chapterNum:p,verseNum:1})}}},[t,e,o]),a=i.useCallback(()=>{const d=Mt(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const p=e[w+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),l=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=i.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return i.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:l,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===Mt(t.book)||Mt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,l,c,a])}function br({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(At,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:Mt(t)},(l,c)=>c+1).map(l=>n.jsx(St,{value:`${t} ${le[t]||""} ${l}`,onSelect:()=>r(l),ref:o(l),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&l===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(l))??!1}),children:l},l))})})}function Ga({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:l,onAddRecentSearch:c,id:d}){const w=ot(),[p,f]=i.useState(!1),[h,u]=i.useState(""),[g,v]=i.useState(""),[x,y]=i.useState("books"),[N,E]=i.useState(void 0),[M,L]=i.useState(!1),$=i.useRef(void 0),_=i.useRef(void 0),R=i.useRef(void 0),C=i.useRef(void 0),T=i.useRef({}),P=i.useCallback(A=>{e(A),c&&c(A)},[e,c]),S=i.useMemo(()=>o?o():Jr,[o]),F=i.useMemo(()=>({[j.Section.OT]:S.filter(B=>Q.Canon.isBookOT(B)),[j.Section.NT]:S.filter(B=>Q.Canon.isBookNT(B)),[j.Section.DC]:S.filter(B=>Q.Canon.isBookDC(B)),[j.Section.Extra]:S.filter(B=>Q.Canon.extraBooks().includes(B))}),[S]),D=i.useMemo(()=>Object.values(F).flat(),[F]),z=i.useMemo(()=>{if(!g.trim())return F;const A={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return[j.Section.OT,j.Section.NT,j.Section.DC,j.Section.Extra].forEach(J=>{A[J]=F[J].filter(at=>Vn(at,g,s))}),A},[F,g,s]),O=i.useMemo(()=>Fa(g,D,s),[g,D,s]),K=i.useCallback(()=>{O&&(P({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1}),f(!1),v(""),u(""))},[P,O]),rt=i.useCallback(A=>{if(Mt(A)<=1){P({book:A,chapterNum:1,verseNum:1}),f(!1),v("");return}E(A),y("chapters")},[P]),mt=i.useCallback(A=>{const B=x==="chapters"?N:O==null?void 0:O.book;B&&(P({book:B,chapterNum:A,verseNum:1}),f(!1),y("books"),E(void 0),v(""))},[P,x,N,O]),it=i.useCallback(A=>{P(A),f(!1),v("")},[P]),lt=za(t,D,w,e),yt=i.useCallback(()=>{y("books"),E(void 0),setTimeout(()=>{_.current&&_.current.focus()},0)},[]),G=i.useCallback(A=>{if(!A&&x==="chapters"){yt();return}f(A),A&&(y("books"),E(void 0),v(""))},[x,yt]),{otLong:W,ntLong:wt,dcLong:st,extraLong:ct}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},re=i.useCallback(A=>Wr(A,W,wt,st,ct),[W,wt,st,ct]),fn=i.useCallback(A=>O?!!O.chapterNum&&!A.toString().includes(O.chapterNum.toString()):!1,[O]),ge=i.useMemo(()=>j.formatScrRef(t,s?ve(t.book,s):"English"),[t,s]),qt=i.useCallback(A=>B=>{T.current[A]=B},[]),hn=i.useCallback(A=>{(A.key==="Home"||A.key==="End")&&A.stopPropagation()},[]),Ut=i.useCallback(A=>{if(A.ctrlKey)return;const{isLetter:B,isDigit:J}=xr(A.key);if(x==="chapters"){if(A.key==="Backspace"){A.preventDefault(),A.stopPropagation(),yt();return}if(B||J){if(A.preventDefault(),A.stopPropagation(),y("books"),E(void 0),J&&N){const at=le[N];v(`${at} ${A.key}`)}else v(A.key);setTimeout(()=>{_.current&&_.current.focus()},0);return}}if((x==="chapters"||x==="books"&&O)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(A.key)){const at=x==="chapters"?N:O==null?void 0:O.book;if(!at)return;const tt=(()=>{if(!h)return 1;const Ht=h.match(/(\d+)$/);return Ht?parseInt(Ht[1],10):0})(),Ft=Mt(at);if(!Ft)return;let jt=tt;const Re=6;switch(A.key){case"ArrowLeft":tt!==0&&(jt=tt>1?tt-1:Ft);break;case"ArrowRight":tt!==0&&(jt=tt<Ft?tt+1:1);break;case"ArrowUp":jt=tt===0?Ft:Math.max(1,tt-Re);break;case"ArrowDown":jt=tt===0?1:Math.min(Ft,tt+Re);break;default:return}jt!==tt&&(A.preventDefault(),A.stopPropagation(),u(In(at,s,jt)),setTimeout(()=>{const Ht=T.current[jt];Ht&&Ht.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[x,O,yt,N,h,s]),qe=i.useCallback(A=>{if(A.shiftKey||A.key==="Tab"||A.key===" ")return;const{isLetter:B,isDigit:J}=xr(A.key);(B||J)&&(A.preventDefault(),v(at=>at+A.key),_.current.focus(),L(!1))},[]);return i.useLayoutEffect(()=>{const A=setTimeout(()=>{if(p&&x==="books"&&R.current&&C.current){const B=R.current,J=C.current,at=J.offsetTop,tt=B.clientHeight,Ft=J.clientHeight,jt=at-tt/2+Ft/2;B.scrollTo({top:Math.max(0,jt),behavior:"smooth"}),u(In(t.book))}},0);return()=>{clearTimeout(A)}},[p,x,g,O,t.book]),i.useLayoutEffect(()=>{if(x==="chapters"&&N){const A=N===t.book;setTimeout(()=>{if(R.current)if(A){const B=T.current[t.chapterNum];B&&B.scrollIntoView({block:"center",behavior:"smooth"})}else R.current.scrollTo({top:0});$.current&&$.current.focus()},0)}},[x,N,O,t.book,t.chapterNum]),n.jsxs(zt,{open:p,onOpenChange:G,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:ge})})}),n.jsx($t,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Pt,{ref:$,onKeyDown:Ut,loop:!0,value:h,onValueChange:u,shouldFilter:!1,children:[x==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(ue,{ref:_,value:g,onValueChange:v,onKeyDown:hn,onFocus:()=>L(!1),className:l&&l.length>0?"!tw-pr-10":""}),l&&l.length>0&&n.jsx(to,{recentSearches:l,onSearchItemSelect:it,renderItem:A=>j.formatScrRef(A,"English"),getItemKey:A=>`${A.book}-${A.chapterNum}-${A.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:lt.map(({onClick:A,disabled:B,title:J,icon:at})=>n.jsx(V,{variant:"ghost",size:"sm",onClick:()=>{L(!0),A()},disabled:B,className:"tw-h-10 tw-w-4 tw-p-0",title:J,onKeyDown:qe,children:n.jsx(at,{})},J))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:yt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),N&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ve(N,s)})]}),!M&&n.jsxs(Lt,{ref:R,children:[x==="books"&&n.jsxs(n.Fragment,{children:[!O&&Object.entries(z).map(([A,B])=>{if(B.length!==0)return n.jsx(At,{heading:re(A),children:B.map(J=>n.jsx(Zr,{bookId:J,onSelect:at=>rt(at),section:j.getSectionForBook(J),commandValue:`${J} ${le[J]}`,ref:J===t.book?C:void 0,localizedBookNames:s},J))},A)}),O&&n.jsx(At,{children:n.jsx(St,{value:`${O.book} ${le[O.book]} ${O.chapterNum||""}:${O.verseNum||""})}`,onSelect:K,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1},s?$n(O.book,s):void 0)},"top-match")}),O&&Mt(O.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ve(O.book,s)}),n.jsx(br,{bookId:O.book,scrRef:t,onChapterSelect:mt,setChapterRef:qt,isChapterDimmed:fn,className:"tw-px-4 tw-pb-4"})]})]}),x==="chapters"&&N&&n.jsx(br,{bookId:N,scrRef:t,onChapterSelect:mt,setChapterRef:qt,className:"tw-p-4"})]})]})})]})}const Ba=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ka=ee.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),et=i.forwardRef(({className:t,...e},r)=>n.jsx(zr.Root,{ref:r,className:m("pr-twp",Ka(),t),...e}));et.displayName=zr.Root.displayName;const ln=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsx(Ae.Root,{className:m("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});ln.displayName=Ae.Root.displayName;const Pe=i.forwardRef(({className:t,...e},r)=>n.jsx(Ae.Item,{ref:r,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ae.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Pe.displayName=Ae.Item.displayName;function qa(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Je({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:a,onChange:l=()=>{},getOptionLabel:c=qa,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:p="",textPlaceholder:f="",commandEmptyMessage:h="No option found",buttonVariant:u="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:x,...y}){const[N,E]=i.useState(!1),M=d??c,L=_=>_.length>0&&typeof _[0]=="object"&&"options"in _[0],$=(_,R)=>{const C=c(_),T=typeof _=="object"&&"secondaryLabel"in _?_.secondaryLabel:void 0,P=`${R??""}${C}${T??""}`;return n.jsxs(St,{value:C,onSelect:()=>{l(_),E(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==C})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[C,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},P)};return n.jsxs(zt,{open:N,onOpenChange:E,...y,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:u,role:"combobox","aria-expanded":N,"aria-label":x,id:t,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?M(a):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:n.jsxs(Pt,{children:[n.jsx(ue,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Se,{children:h}),n.jsx(Lt,{children:L(e)?e.map(_=>n.jsx(At,{heading:_.groupHeading,children:_.options.map(R=>$(R,_.groupHeading))},_.groupHeading)):e.map(_=>$(_))})]})})]})}function eo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const l=i.useMemo(()=>Array.from({length:a},(w,p)=>p+1),[a]),c=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(et,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Je,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(et,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Je,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:l,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}var no=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(no||{});const Ua=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),xn=(t,e)=>t[e]??e;function Ha({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:l,startChapter:c,handleSelectStartChapter:d,localizedStrings:w}){const p=xn(w,"%webView_bookSelector_currentBook%"),f=xn(w,"%webView_bookSelector_choose%"),h=xn(w,"%webView_bookSelector_chooseBooks%"),[u,g]=i.useState("current book"),v=x=>{g(x),t(x)};return n.jsx(ln,{className:"pr-twp tw-flex",value:u,onValueChange:x=>v(x),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"current book"}),n.jsx(et,{className:"tw-ms-1",children:p})]}),n.jsx(et,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(eo,{isDisabled:u==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:l,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"choose books"}),n.jsx(et,{className:"tw-ms-1",children:h})]}),n.jsx(et,{className:"tw-flex tw-items-center",children:o.map(x=>Q.Canon.bookIdToEnglishName(x)).join(", ")}),n.jsx(V,{disabled:u==="current book",onClick:()=>r(),children:f})]})]})})}const ro=i.createContext(null);function Ya(t,e){return{getTheme:function(){return e??null}}}function Vt(){const t=i.useContext(ro);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const oo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Xa=oo?i.useLayoutEffect:i.useEffect,Ue={tag:b.HISTORY_MERGE_TAG};function Wa({initialConfig:t,children:e}){const r=i.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:l,editorState:c,html:d}=t,w=Ya(null,o),p=b.createEditor({editable:t.editable,html:d,namespace:s,nodes:a,onError:f=>l(f,p),theme:o});return function(f,h){if(h!==null){if(h===void 0)f.update(()=>{const u=b.$getRoot();if(u.isEmpty()){const g=b.$createParagraphNode();u.append(g);const v=oo?document.activeElement:null;(b.$getSelection()!==null||v!==null&&v===f.getRootElement())&&g.select()}},Ue);else if(h!==null)switch(typeof h){case"string":{const u=f.parseEditorState(h);f.setEditorState(u,Ue);break}case"object":f.setEditorState(h,Ue);break;case"function":f.update(()=>{b.$getRoot().isEmpty()&&h(f)},Ue)}}}(p,c),[p,w]},[]);return Xa(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(ro.Provider,{value:r,children:e})}const Ja=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Za({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Vt();return Ja(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:l,prevEditorState:c,tags:d})=>{e&&a.size===0&&l.size===0||t&&d.has(b.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const Fn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},bt=Fe.Provider,kt=Fe.Root,It=Fe.Trigger,vt=i.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(Fe.Content,{ref:o,sideOffset:e,className:m("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));vt.displayName=Fe.Content.displayName;const zn=[Rn.HeadingNode,b.ParagraphNode,b.TextNode,Rn.QuoteNode],Qa=i.createContext(null),bn={didCatch:!1,error:null};class ti extends i.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=bn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),l=0;l<s;l++)a[l]=arguments[l];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(bn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&ei(e.resetKeys,s)){var a,l;(a=(l=this.props).onReset)===null||a===void 0||a.call(l,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(bn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:l}=this.state;let c=e;if(a){const d={error:l,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(d);else if(o)c=i.createElement(o,d);else if(s!==void 0)c=s;else throw l}return i.createElement(Qa.Provider,{value:{didCatch:a,error:l,resetErrorBoundary:this.resetErrorBoundary}},c)}}function ei(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function ni({children:t,onError:e}){return n.jsx(ti,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ri=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function oi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function si(){return function(t){const[e]=Vt(),r=i.useMemo(()=>t(e),[e,t]),[o,s]=i.useState(()=>r.initialValueFn()),a=i.useRef(o);return ri(()=>{const{initialValueFn:l,subscribe:c}=r,d=l();return a.current!==d&&(a.current=d,s(d)),c(w=>{a.current=w,s(w)})},[r,t]),o}(oi)}function ai(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!b.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,l=t.isBackward(),c=s.getNode(),d=a.getNode(),w=e.is(c),p=e.is(d);if(w||p){const[f,h]=b.$getCharacterOffsets(t),u=c.is(d),g=e.is(l?d:c),v=e.is(l?c:d);let x,y=0;u?(y=f>h?h:f,x=f>h?f:h):g?(y=l?h:f,x=void 0):v&&(y=0,x=l?f:h);const N=e.__text.slice(y,x);N!==e.__text&&(r==="clone"&&(e=b.$cloneWithPropertiesEphemeral(e)),e.__text=N)}}return e}function ii(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const so=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,li=so&&"documentMode"in document?document.documentMode:null;!(!so||!("InputEvent"in window)||li)&&"getTargetRanges"in new window.InputEvent("input");function ao(...t){const e=[];for(const r of t)if(r&&typeof r=="string")for(const[o]of r.matchAll(/\S+/g))e.push(o);return e}function Jt(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}function io(t,...e){const r=ao(...e);r.length>0&&t.classList.add(...r)}function ci(t,...e){const r=ao(...e);r.length>0&&t.classList.remove(...r)}function vr(t){const e=b.$findMatchingParent(t,r=>b.$isElementNode(r)&&!r.isInline());return b.$isElementNode(e)||ii(4,t.__key),e}function wi(t,e){const r=[];for(let o=0;o<t.length;o++){const s=e(t[o]);s!==null&&r.push(s)}return r}const di=Symbol.for("preact-signals");function cn(){if(Xt>1)return void Xt--;let t,e=!1;for(;Ie!==void 0;){let r=Ie;for(Ie=void 0,On++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&lo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(On=0,Xt--,e)throw t}function pi(t){if(Xt>0)return t();Xt++;try{return t()}finally{cn()}}let q,Ie;function yr(t){const e=q;q=void 0;try{return t()}finally{q=e}}let Xt=0,On=0,Xe=0;function jr(t){if(q===void 0)return;let e=t.n;return e===void 0||e.t!==q?(e={i:0,S:t,p:q.s,n:void 0,t:q,e:void 0,x:void 0,r:e},q.s!==void 0&&(q.s.n=e),q.s=e,t.n=e,32&q.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=q.s,e.n=void 0,q.s.n=e,q.s=e),e):void 0}function pt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Le(t,e){return new pt(t,e)}function lo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Nr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function co(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ae(t,e){pt.call(this,void 0),this.x=t,this.s=void 0,this.g=Xe-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function ui(t,e){return new ae(t,e)}function wo(t){const e=t.u;if(t.u=void 0,typeof e=="function"){Xt++;const r=q;q=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Gn(t),o}finally{q=r,cn()}}}function Gn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,wo(t)}function mi(t){if(q!==this)throw new Error("Out-of-order effect");co(this),q=t,this.f&=-2,8&this.f&&Gn(this),cn()}function be(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function Zt(t,e){const r=new be(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function wn(t,e={}){const r={};for(const o in t){const s=e[o],a=Le(s===void 0?t[o]:s);r[o]=a}return r}pt.prototype.brand=di,pt.prototype.h=function(){return!0},pt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:yr(()=>{var r;(r=this.W)==null||r.call(this)}))},pt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&yr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},pt.prototype.subscribe=function(t){return Zt(()=>{const e=this.value,r=q;q=void 0;try{t(e)}finally{q=r}},{name:"sub"})},pt.prototype.valueOf=function(){return this.value},pt.prototype.toString=function(){return this.value+""},pt.prototype.toJSON=function(){return this.value},pt.prototype.peek=function(){const t=q;q=void 0;try{return this.value}finally{q=t}},Object.defineProperty(pt.prototype,"value",{get(){const t=jr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(On>100)throw new Error("Cycle detected");this.v=t,this.i++,Xe++,Xt++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{cn()}}}}),ae.prototype=new pt,ae.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Xe))return!0;if(this.g=Xe,this.f|=1,this.i>0&&!lo(this))return this.f&=-2,!0;const t=q;try{Nr(this),q=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return q=t,co(this),this.f&=-2,!0},ae.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}pt.prototype.S.call(this,t)},ae.prototype.U=function(t){if(this.t!==void 0&&(pt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ae.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=jr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),be.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},be.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,wo(this),Nr(this),Xt++;const t=q;return q=this,mi.bind(this,t)},be.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ie,Ie=this)},be.prototype.d=function(){this.f|=8,1&this.f||Gn(this)},be.prototype.dispose=function(){this.d()};b.defineExtension({build:(t,e,r)=>wn(e),config:b.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Zt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function po(){const t=b.$getRoot(),e=b.$getSelection(),r=b.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),b.$isRangeSelection(e)&&(e.format=0)}function uo(t,e=po){return t.registerCommand(b.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),b.COMMAND_PRIORITY_EDITOR)}b.defineExtension({build:(t,e,r)=>wn(e),config:b.safeCast({$onClear:po}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Zt(()=>uo(t,o.value))}});function fi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}function mo(t,e){let r;return Le(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const An=b.defineExtension({build:t=>mo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function U(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function fo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=fo(r[s],o[s]);return t}return e}const Bn=0,Pn=1,ho=2,vn=3,He=4,xe=5,yn=6,Te=7;function jn(t){return t.id===Bn}function go(t){return t.id===ho}function hi(t){return function(e){return e.id===Pn}(t)||U(305,String(t.id),String(Pn)),Object.assign(t,{id:ho})}const gi=new Set;class xi{constructor(e,r){dt(this,"builder");dt(this,"configs");dt(this,"_dependency");dt(this,"_peerNameSet");dt(this,"extension");dt(this,"state");dt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Bn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):b.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;go(r)||U(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,d,w){return Object.assign(c,{config:d,id:vn,registerState:w})}(r,this.mergeConfigs(),o);let l;this.state=a,this.extension.init&&(l=this.extension.init(e,a.config,o)),this.state=function(c,d,w){return Object.assign(c,{id:He,initResult:d,registerState:w})}(a,l,s)}build(e){const r=this.state;let o;r.id!==He&&U(307,String(r.id),String(xe)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,l,c){return Object.assign(a,{id:xe,output:l,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==xe&&U(308,String(o.id),String(xe));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:yn})}(o),()=>{const a=this.state;a.id!==Te&&U(309,String(o.id),String(Te)),this.state=function(l){return Object.assign(l,{id:xe})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==yn&&U(310,String(r.id),String(yn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Te})}(r),o}getSignal(){return this._signal===void 0&&U(311),this._signal}getInitResult(){this.extension.init===void 0&&U(312,this.extension.name);const e=this.state;return function(r){return r.id>=He}(e)||U(313,String(e.id),String(He)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=vn}(e)||U(314,String(e.id),String(vn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&U(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&U(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Te}(e)||U(316,String(e.id),String(Te)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||gi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=xe})(e)||U(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const kr={tag:b.HISTORY_MERGE_TAG};function bi(){const t=b.$getRoot();t.isEmpty()&&t.append(b.$createParagraphNode())}const vi=b.defineExtension({config:b.safeCast({setOptions:kr,updateOptions:kr}),init:({$initialEditorState:t=bi})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(b.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const l=t.parseEditorState(a);t.setEditorState(l,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[b.RootNode,b.TextNode,b.LineBreakNode,b.TabNode,b.ParagraphNode]}),_r=Symbol.for("@lexical/extension/LexicalBuilder");function Cr(){}function yi(t){throw t}function Ye(t){return Array.isArray(t)?t:[t]}const Nn="0.38.2+prod.esm";class Oe{constructor(e){dt(this,"roots");dt(this,"extensionNameMap");dt(this,"outgoingConfigEdges");dt(this,"incomingEdges");dt(this,"conflicts");dt(this,"_sortedExtensionReps");dt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Nn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Ye(vi)];for(const o of e)r.push(Ye(o));return new Oe(r)}static maybeFromEditor(e){const r=e[_r];return r&&(r.PACKAGE_VERSION!==Nn&&U(292,r.PACKAGE_VERSION,Nn),r instanceof Oe||U(293)),r}static fromEditor(e){const r=Oe.maybeFromEditor(e);return r===void 0&&U(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(b.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[_r]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Cr;function r(){try{e()}finally{e=Cr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=Jt(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&U(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&U(296);const r=Ye(e),[o]=r;typeof o.name!="string"&&U(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&U(298,o.name),!s){s=new xi(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&U(299,o.name,a);for(const l of o.conflictsWith||[])this.extensionNameMap.has(l)&&U(299,o.name,l),this.conflicts.set(l,o.name);for(const l of o.dependencies||[]){const c=Ye(l);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[l,c]of o.peerDependencies||[])this.addEdge(o.name,l,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(go(a))return;const l=o.extension.name;var c;jn(a)||U(300,l,s||"[unknown]"),jn(c=a)||U(304,String(c.id),String(Bn)),a=Object.assign(c,{id:Pn}),o.state=a;const d=this.outgoingConfigEdges.get(l);if(d)for(const w of d.keys()){const p=this.extensionNameMap.get(w);p&&r(p,l)}a=hi(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())jn(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const l=this.extensionNameMap.get(s);if(l)for(const c of a)l.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&U(301,o.name);for(const l of s)a.configs.add(l)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const l of r){const c=l.register(e,a);c&&s.push(c)}for(const l of r){const c=l.afterRegistration(e);c&&s.push(c)}return Jt(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},l={},c=this.sortedExtensionReps();for(const p of c){const{extension:f}=p;if(f.onError!==void 0&&(e.onError=f.onError),f.disableEvents!==void 0&&(e.disableEvents=f.disableEvents),f.parentEditor!==void 0&&(e.parentEditor=f.parentEditor),f.editable!==void 0&&(e.editable=f.editable),f.namespace!==void 0&&(e.namespace=f.namespace),f.$initialEditorState!==void 0&&(e.$initialEditorState=f.$initialEditorState),f.nodes)for(const h of fi(f)){if(typeof h!="function"){const u=o.get(h.replace);u&&U(302,f.name,h.replace.name,u.extension.name),o.set(h.replace,p)}r.add(h)}if(f.html){if(f.html.export)for(const[h,u]of f.html.export.entries())s.set(h,u);f.html.import&&Object.assign(a,f.html.import)}f.theme&&fo(l,f.theme)}Object.keys(l).length>0&&(e.theme=l),r.size&&(e.nodes=[...r]);const d=Object.keys(a).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=a),w&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=yi),e}}const ji=new Set,Sr=b.defineExtension({build(t,e,r){const o=r.getDependency(An).output,s=Le({watchedNodeKeys:new Map}),a=mo(()=>{},()=>Zt(()=>{const l=a.peek(),{watchedNodeKeys:c}=s.value;let d,w=!1;o.value.read(()=>{if(b.$getSelection())for(const[p,f]of c.entries()){if(f.size===0){c.delete(p);continue}const h=b.$getNodeByKey(p),u=h&&h.isSelected()||!1;w=w||u!==(!!l&&l.has(p)),u&&(d=d||new Set,d.add(p))}}),!w&&d&&l&&d.size===l.size||(a.value=d)}));return{watchNodeKey:function(l){const c=ui(()=>(a.value||ji).has(l)),{watchedNodeKeys:d}=s.peek();let w=d.get(l);const p=w!==void 0;return w=w||new Set,w.add(c),p||(d.set(l,w),s.value={watchedNodeKeys:d}),c}}},dependencies:[An],name:"@lexical/extension/NodeSelection"});b.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Ne extends b.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Ne(e.__key)}static importJSON(e){return xo().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Ni,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return io(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Ni(){return{node:xo()}}function xo(){return b.$create(Ne)}function ki(t){return t instanceof Ne}b.defineExtension({dependencies:[An,Sr],name:"@lexical/extension/HorizontalRule",nodes:[Ne],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Sr).output,s=Le({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return Jt(t.registerCommand(b.CLICK_COMMAND,l=>{if(b.isDOMNode(l.target)){const c=b.$getNodeFromDOMNode(l.target);if(ki(c))return function(d,w=!1){const p=b.$getSelection(),f=d.isSelected(),h=d.getKey();let u;w&&b.$isNodeSelection(p)?u=p:(u=b.$createNodeSelection(),b.$setSelection(u)),f?u.delete(h):u.add(h)}(c,l.shiftKey),!0}return!1},b.COMMAND_PRIORITY_LOW),t.registerMutationListener(Ne,(l,c)=>{pi(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[p,f]of l.entries())if(f==="destroyed")w.delete(p),d=!0;else{const h=w.get(p),u=t.getElementByKey(p);h?h.domNode.value=u:(d=!0,w.set(p,{domNode:Le(u),selectedSignal:o(p)}))}d&&(s.value={nodeSelections:w})})}),Zt(()=>{const l=[];for(const{domNode:c,selectedSignal:d}of s.value.nodeSelections.values())l.push(Zt(()=>{const w=c.value;w&&(d.value?io(w,a):ci(w,a))}));return Jt(...l)}))}});function _i(t,e){return Jt(t.registerCommand(b.KEY_TAB_COMMAND,r=>{const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;r.preventDefault();const s=function(a){const l=a.getNodes();if(wi(l,h=>b.$isBlockElementNode(h)&&h.canIndent()?h:null).length>0)return!0;const c=a.anchor,d=a.focus,w=d.isBefore(c)?d:c,p=w.getNode(),f=vr(p);if(f.canIndent()){const h=f.getKey();let u=b.$createRangeSelection();if(u.anchor.set(h,0,"element"),u.focus.set(h,0,"element"),u=b.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(w))return!0}return!1}(o)?r.shiftKey?b.OUTDENT_CONTENT_COMMAND:b.INDENT_CONTENT_COMMAND:b.INSERT_TAB_COMMAND;return t.dispatchCommand(s,void 0)},b.COMMAND_PRIORITY_EDITOR),t.registerCommand(b.INDENT_CONTENT_COMMAND,()=>{const r=typeof e=="number"?e:e?e.peek():null;if(r==null)return!1;const o=b.$getSelection();if(!b.$isRangeSelection(o))return!1;const s=o.getNodes().map(a=>vr(a).getIndent());return Math.max(...s)+1>=r},b.COMMAND_PRIORITY_CRITICAL))}b.defineExtension({build:(t,e,r)=>wn(e),config:b.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s}=r.getOutput();return Zt(()=>{if(!o.value)return _i(t,s)})}});const Ci=b.defineExtension({name:"@lexical/react/ReactProvider"});function Si(){return b.$getRoot().getTextContent()}function Ei(t,e=!0){if(t)return!1;let r=Si();return e&&(r=r.trim()),r===""}function Ri(t){if(!Ei(t,!1))return!1;const e=b.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(b.$isDecoratorNode(s))return!1;if(b.$isElementNode(s)){if(!b.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),l=a.length;for(let c=0;c<l;c++){const d=a[o];if(!b.$isTextNode(d))return!1}}}return!0}function bo(t){return()=>Ri(t)}function vo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let l;try{l=JSON.parse(a)}catch{return}if(l&&l.protocol==="nuanria_messaging"&&l.type==="request"){const c=l.payload;if(c&&c.functionId==="makeChanges"){const d=c.args;if(d){const[w,p,f,h,u]=d;t.update(()=>{const g=b.$getSelection();if(b.$isRangeSelection(g)){const v=g.anchor;let x=v.getNode(),y=0,N=0;if(b.$isTextNode(x)&&w>=0&&p>=0&&(y=w,N=w+p,g.setTextNodeRange(x,y,x,N)),y===N&&f===""||(g.insertRawText(f),x=v.getNode()),b.$isTextNode(x)){y=h,N=h+u;const E=x.getTextContentSize();y=y>E?E:y,N=N>E?E:N,g.setTextNodeRange(x,y,x,N)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}b.defineExtension({build:(t,e,r)=>wn(e),config:b.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Zt(()=>r.getOutput().disabled.value?void 0:vo(t))});function Ti(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Kn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Mi({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=i.useState(()=>r.getDecorators());return Kn(()=>r.registerDecoratorListener(l=>{gr.flushSync(()=>{a(l)})}),[r]),i.useEffect(()=>{a(r.getDecorators())},[r]),i.useMemo(()=>{const l=[],c=Object.keys(s);for(let d=0;d<c.length;d++){const w=c[d],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(i.Suspense,{fallback:null,children:s[w]})}),f=r.getElementByKey(w);f!==null&&l.push(gr.createPortal(p,f,w))}return l},[o,s,r])}(t,e)}function Di({editor:t,ErrorBoundary:e}){return function(r){const o=Oe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Ci.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Ti(320,s);return!0}return!1}(t)?null:n.jsx(Mi,{editor:t,ErrorBoundary:e})}function Er(t){return t.getEditorState().read(bo(t.isComposing()))}function Ii({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Vt();return function(s){Kn(()=>Jt(Rn.registerRichText(s),vo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Oi,{content:e}),n.jsx(Di,{editor:o,ErrorBoundary:r})]})}function Oi({content:t}){const[e]=Vt(),r=function(s){const[a,l]=i.useState(()=>Er(s));return Kn(()=>{function c(){const d=Er(s);l(d)}return c(),Jt(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=si();return r?typeof t=="function"?t(o):t:null}function Ai({defaultSelection:t}){const[e]=Vt();return i.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Pi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function Li({onClear:t}){const[e]=Vt();return Pi(()=>uo(e,t),[e,t]),null}const yo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?i.useLayoutEffect:i.useEffect;function $i({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:l,ariaInvalid:c,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:p,ariaOwns:f,ariaRequired:h,autoCapitalize:u,className:g,id:v,role:x="textbox",spellCheck:y=!0,style:N,tabIndex:E,"data-testid":M,...L},$){const[_,R]=i.useState(t.isEditable()),C=i.useCallback(P=>{P&&P.ownerDocument&&P.ownerDocument.defaultView?t.setRootElement(P):t.setRootElement(null)},[t]),T=i.useMemo(()=>function(...P){return S=>{for(const F of P)typeof F=="function"?F(S):F!=null&&(F.current=S)}}($,C),[C,$]);return yo(()=>(R(t.isEditable()),t.registerEditableListener(P=>{R(P)})),[t]),n.jsx("div",{"aria-activedescendant":_?e:void 0,"aria-autocomplete":_?r:"none","aria-controls":_?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":_&&x==="combobox"?!!l:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":p,"aria-owns":_?f:void 0,"aria-readonly":!_||void 0,"aria-required":h,autoCapitalize:u,className:g,contentEditable:_,"data-testid":M,id:v,ref:T,role:x,spellCheck:y,style:N,tabIndex:E,...L})}const Vi=i.forwardRef($i);function Rr(t){return t.getEditorState().read(bo(t.isComposing()))}const Fi=i.forwardRef(zi);function zi(t,e){const{placeholder:r,...o}=t,[s]=Vt();return n.jsxs(n.Fragment,{children:[n.jsx(Vi,{editor:s,...o,ref:e}),r!=null&&n.jsx(Gi,{editor:s,content:r})]})}function Gi({content:t,editor:e}){const r=function(l){const[c,d]=i.useState(()=>Rr(l));return yo(()=>{function w(){const p=Rr(l);d(p)}return w(),Jt(l.registerUpdateListener(()=>{w()}),l.registerEditableListener(()=>{w()}))},[l]),c}(e),[o,s]=i.useState(e.isEditable());if(i.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(l=>{s(l)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function Bi({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Fi,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const jo=i.createContext(void 0);function Ki({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const l=i.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(jo.Provider,{value:l,children:a})}function No(){const t=i.useContext(jo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function qi(){const[t,e]=i.useState(void 0),r=i.useCallback(()=>{e(void 0)},[]),o=i.useMemo(()=>{if(t===void 0)return;const{title:a,content:l}=t;return n.jsx(Ia,{open:!0,onOpenChange:r,children:n.jsxs(qr,{children:[n.jsx(Ur,{children:n.jsx(Hr,{children:a})}),l]})})},[t,r]),s=i.useCallback((a,l,c=!1)=>{e({closeOnClickOutside:c,content:l(r),title:a})},[r]);return[o,s]}function Ui({children:t}){const[e]=Vt(),[r,o]=i.useState(e),[s,a]=i.useState("paragraph"),[l,c]=qi(),d=()=>{};return i.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,(w,p)=>(o(p),!1),b.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Ki,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:a,showModal:c,children:[l,t({blockType:s})]})}function Hi(t){const[e]=Vt(),{activeEditor:r}=No();i.useEffect(()=>r.registerCommand(b.SELECTION_CHANGE_COMMAND,()=>{const o=b.$getSelection();return o&&t(o),!1},b.COMMAND_PRIORITY_CRITICAL),[e,t]),i.useEffect(()=>{r.getEditorState().read(()=>{const o=b.$getSelection();o&&t(o)})},[r,t])}const ko=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Yi=i.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Gr.Root,{ref:s,className:m(ko({variant:e,size:r,className:t})),...o}));Yi.displayName=Gr.Root.displayName;const _o=i.createContext({size:"default",variant:"default"}),dn=i.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const l=ot();return n.jsx(an.Root,{ref:a,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:l,children:n.jsx(_o.Provider,{value:{variant:e,size:r},children:o})})});dn.displayName=an.Root.displayName;const ye=i.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const l=i.useContext(_o);return n.jsx(an.Item,{ref:a,className:m(ko({variant:l.variant||r,size:l.size||o}),t),...s,children:e})});ye.displayName=an.Item.displayName;const Tr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"},{format:"underline",icon:k.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:k.StrikethroughIcon,label:"Strikethrough"}];function Xi(){const{activeEditor:t}=No(),[e,r]=i.useState([]),o=i.useCallback(s=>{if(b.$isRangeSelection(s)||fa.$isTableSelection(s)){const a=[];Tr.forEach(({format:l})=>{s.hasFormat(l)&&a.push(l)}),r(l=>l.length!==a.length||!a.every(c=>l.includes(c))?a:l)}},[]);return Hi(o),n.jsx(dn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Tr.map(({format:s,icon:a,label:l})=>n.jsx(ye,{value:s,"aria-label":l,onClick:()=>{t.dispatchCommand(b.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Wi({onClear:t}){const[e]=Vt();i.useEffect(()=>{t&&t(()=>{e.dispatchCommand(b.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Ji({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=i.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ui,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Xi,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ii,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Bi,{placeholder:t})}),ErrorBoundary:ni}),e&&n.jsx(Ai,{defaultSelection:"rootEnd"}),n.jsx(Wi,{onClear:r}),n.jsx(Li,{})]})]})}const Zi={namespace:"commentEditor",theme:Fn,nodes:zn,onError:t=>{console.error(t)}};function Ze({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:l,className:c}){return n.jsx("div",{className:m("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Wa,{initialConfig:{...Zi,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(bt,{children:[n.jsx(Ji,{placeholder:s,autoFocus:a,onClear:l}),n.jsx(Za,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function Qi(t,e){const r=b.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!So.has(a.nodeName)){const l=Eo(a,t,s,!1);l!==null&&(o=o.concat(l))}return function(a){for(const l of a)l.getNextSibling()instanceof b.ArtificialNode__DO_NOT_USE&&l.insertAfter(b.$createLineBreakNode());for(const l of a){const c=l.getChildren();for(const d of c)l.insertBefore(d);l.remove()}}(s),o}function tl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=b.$getRoot().getChildren();for(let s=0;s<o.length;s++)Co(t,o[s],r,e);return r.innerHTML}function Co(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=b.$isElementNode(e)&&e.excludeFromCopy("html");let l=e;o!==null&&b.$isTextNode(e)&&(l=ai(o,e,"clone"));const c=b.$isElementNode(l)?l.getChildren():[],d=b.getRegisteredNode(t,l.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,l):l.exportDOM(t);const{element:p,after:f}=w;if(!p)return!1;const h=document.createDocumentFragment();for(let u=0;u<c.length;u++){const g=c[u],v=Co(t,g,h,o);!s&&b.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((b.isHTMLElement(p)||b.isDocumentFragment(p))&&p.append(h),r.append(p),f){const u=f.call(l,p);u&&(b.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(h);return s}const So=new Set(["STYLE","SCRIPT"]);function Eo(t,e,r,o,s=new Map,a){let l=[];if(So.has(t.nodeName))return l;let c=null;const d=function(g,v){const{nodeName:x}=g,y=v._htmlConversions.get(x.toLowerCase());let N=null;if(y!==void 0)for(const E of y){const M=E(g);M!==null&&(N===null||(N.priority||0)<=(M.priority||0))&&(N=M)}return N!==null?N.conversion:null}(t,e),w=d?d(t):null;let p=null;if(w!==null){p=w.after;const g=w.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,a),!c)break;c&&l.push(...Array.isArray(g)?g:[c])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const f=t.childNodes;let h=[];const u=(c==null||!b.$isRootOrShadowRoot(c))&&(c!=null&&b.$isBlockElementNode(c)||o);for(let g=0;g<f.length;g++)h.push(...Eo(f[g],e,r,u,new Map(s),c));return p!=null&&(h=p(h)),b.isBlockDomNode(t)&&(h=el(t,h,u?()=>{const g=new b.ArtificialNode__DO_NOT_USE;return r.push(g),g}:b.$createParagraphNode)),c==null?h.length>0?l=l.concat(h):b.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:b.isInlineDomNode(g.nextSibling)&&b.isInlineDomNode(g.previousSibling)}(t)&&(l=l.concat(b.$createLineBreakNode())):b.$isElementNode(c)&&c.append(...h),l}function el(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let l=0;l<e.length;l++){const c=e[l];if(b.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),l===e.length-1||l<e.length-1&&b.$isBlockElementNode(e[l+1])){const d=r();d.setFormat(o),d.append(...a),s.push(d),a=[]}}return s}function Ro(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function To(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:To(e.children)):!1}function Nt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?To(t.root.children):!1}function nl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=$r.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=Qi(e,s);b.$getRoot().clear(),b.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function Qe(t){const e=$r.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=tl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function qn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const rl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function kn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function ol({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=i.useState(rl),[l,c]=i.useState(void 0),[d,w]=i.useState(!1),p=i.useRef(void 0),f=i.useRef(null);i.useEffect(()=>{let y=!0;const N=f.current;if(!N)return;const E=setTimeout(()=>{y&&Ro(N)},300);return()=>{y=!1,clearTimeout(E)}},[]);const h=i.useCallback(()=>{if(!Nt(s))return;const y=Qe(s);e(y,l)},[s,e,l]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",x=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:x}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(V,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(vt,{children:n.jsx("p",{children:v})})]})}),n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(V,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Nt(s),children:n.jsx(k.Check,{})})}),n.jsx(vt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(zt,{open:d,onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:kn(l!==void 0?l:"",o)})]})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:y=>{y.key==="Escape"&&(y.stopPropagation(),w(!1))},children:n.jsx(Pt,{children:n.jsx(Lt,{children:t.map(y=>n.jsx(St,{onSelect:()=>{c(y===""?void 0:y),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:kn(y,o)})},y||"unassigned"))})})})]})}),n.jsx("div",{ref:f,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),r()):y.key==="Enter"&&y.shiftKey&&(y.preventDefault(),y.stopPropagation(),Nt(s)&&h())},onKeyDown:y=>{qn(y),(y.key==="Enter"||y.key===" ")&&y.stopPropagation()},children:n.jsx(Ze,{editorSerializedState:s,onSerializedChange:y=>a(y),placeholder:u,onClear:y=>{p.current=y}})})]})}const sl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),al=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],il=["input","select","textarea","button"],ll=["button","textbox"],Mo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=i.useRef(null),[a,l]=i.useState(void 0),[c,d]=i.useState(void 0),w=i.useCallback(u=>{l(u);const g=t.find(x=>x.id===u);g&&(e==null||e(g));const v=document.getElementById(u);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=i.useCallback(u=>{const g=t.find(v=>v.id===u);g&&(d(v=>v===u?void 0:u),r==null||r(g))},[r,t]),f=u=>{if(!u)return!1;const g=u.tagName.toLowerCase();if(u.isContentEditable||il.includes(g))return!0;const v=u.getAttribute("role");if(v&&ll.includes(v))return!0;const x=u.getAttribute("tabindex");return x!==void 0&&x!=="-1"},h=i.useCallback(u=>{var _;const g=u.target,v=R=>R?document.getElementById(R):void 0,x=v(c),y=v(a);if(!!(x&&g&&x.contains(g)&&g!==x)&&f(g)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!g.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const R=t.find(C=>C.id===c);R&&w(R.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!x)return;const R=Array.from(x.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(R.length===0)return;const C=R.findIndex(P=>P===g);if(C===-1)return;let T;u.key==="ArrowDown"?T=Math.min(C+1,R.length-1):T=Math.max(C-1,0),T!==C&&(u.preventDefault(),u.stopPropagation(),(_=R[T])==null||_.focus());return}return}const M=t.findIndex(R=>R.id===a);let L=M;switch(u.key){case"ArrowDown":L=Math.min(M+1,t.length-1),u.preventDefault();break;case"ArrowUp":L=Math.max(M-1,0),u.preventDefault();break;case"Home":L=0,u.preventDefault();break;case"End":L=t.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const R=y;if(R){const C=R.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=R.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),P=C??T;if(P){u.preventDefault(),P.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(f(g)||(o==null||o(u.key),u.preventDefault()));return}const $=t[L];$&&w($.id)},[t,w,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:w}},Do=ee.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ce=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:m("pr-twp",Do({variant:e}),t),...r}));ce.displayName="Badge";const Un=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Un.displayName="Card";const Io=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Io.displayName="CardHeader";const Oo=i.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Oo.displayName="CardTitle";const Ao=i.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:m("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Ao.displayName="CardDescription";const Hn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-p-6 tw-pt-0",t),...e}));Hn.displayName="CardContent";const Po=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Po.displayName="CardFooter";const we=i.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Br.Root,{ref:s,decorative:r,orientation:e,className:m("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));we.displayName=Br.Root.displayName;const Yn=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Yn.displayName=Ce.Root.displayName;const Lo=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Image,{ref:r,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));Lo.displayName=Ce.Image.displayName;const Xn=i.forwardRef(({className:t,...e},r)=>n.jsx(Ce.Fallback,{ref:r,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Xn.displayName=Ce.Fallback.displayName;const Wn=i.createContext(void 0);function Et(){const t=i.useContext(Wn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Bt=ee.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),me=H.Trigger,Jn=H.Group,$o=H.Portal,Vo=H.Sub,Fo=H.RadioGroup;function ne({variant:t="default",...e}){const r=i.useMemo(()=>({variant:t}),[t]);return n.jsx(Wn.Provider,{value:r,children:n.jsx(H.Root,{...e})})}const Zn=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Et();return n.jsxs(H.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Bt({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Zn.displayName=H.SubTrigger.displayName;const Qn=i.forwardRef(({className:t,...e},r)=>n.jsx(H.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Qn.displayName=H.SubContent.displayName;const Kt=i.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=ot();return n.jsx(H.Portal,{children:n.jsx(H.Content,{ref:s,sideOffset:e,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Kt.displayName=H.Content.displayName;const $e=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=ot(),a=Et();return n.jsx(H.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Bt({variant:a.variant})),...r,dir:s})});$e.displayName=H.Item.displayName;const Ot=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=Et();return n.jsxs(H.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Bt({variant:a.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(H.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Ot.displayName=H.CheckboxItem.displayName;const tr=i.forwardRef(({className:t,children:e,...r},o)=>{const s=Et();return n.jsxs(H.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Bt({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(H.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});tr.displayName=H.RadioItem.displayName;const Ee=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(H.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ee.displayName=H.Label.displayName;const fe=i.forwardRef(({className:t,...e},r)=>n.jsx(H.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));fe.displayName=H.Separator.displayName;function zo({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}zo.displayName="DropdownMenuShortcut";function We(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Mr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:l,canEditOrDelete:c=!1}){const[d,w]=i.useState(!1),[p,f]=i.useState(),h=i.useRef(null);i.useEffect(()=>{if(!d)return;let M=!0;const L=h.current;if(!L)return;const $=setTimeout(()=>{M&&Ro(L)},300);return()=>{M=!1,clearTimeout($)}},[d]);const u=i.useCallback(()=>{w(!1),f(void 0),l==null||l(!1)},[l]),g=i.useCallback(async()=>{if(!p||!s)return;await s(t.id,Qe(p))&&(w(!1),f(void 0),l==null||l(!1))},[p,s,t.id,l]),v=i.useMemo(()=>{const M=new Date(t.date),L=j.formatRelativeDate(M,r["%comment_date_today%"],r["%comment_date_yesterday%"]),$=M.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return j.formatReplacementString(r["%comment_dateAtTime%"],{date:L,time:$})},[t.date,r]),x=i.useMemo(()=>t.user,[t.user]),y=i.useMemo(()=>t.user.split(" ").map(M=>M[0]).join("").toUpperCase().slice(0,2),[t.user]),N=i.useMemo(()=>j.sanitizeHtml(t.contents),[t.contents]),E=i.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs($e,{onClick:()=>{w(!0),f(nl(t.contents)),l==null||l(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs($e,{onClick:async()=>{a&&await a(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,l]);return n.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Yn,{className:"tw-h-8 tw-w-8",children:n.jsx(Xn,{className:"tw-text-xs tw-font-medium",children:y})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:x}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ce,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",We(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:M=>{M.key==="Escape"?(M.preventDefault(),M.stopPropagation(),u()):M.key==="Enter"&&M.shiftKey&&(M.preventDefault(),M.stopPropagation(),Nt(p)&&g())},onKeyDown:M=>{qn(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(Ze,{className:m('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:M=>f(M)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(V,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(V,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Nt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:N}})]})]}),E&&n.jsxs(ne,{children:[n.jsx(me,{asChild:!0,children:n.jsx(V,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:E})]})]})}const Dr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function cl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:l,handleSelectThread:c,threadId:d,threadStatus:w,handleAddCommentToThread:p,handleUpdateComment:f,handleDeleteComment:h,handleReadStatusChange:u,assignableUsers:g,canUserAddCommentToThread:v,canUserAssignThreadCallback:x,canUserResolveThreadCallback:y,canUserEditOrDeleteCommentCallback:N,isRead:E=!1,autoReadDelay:M=5}){const[L,$]=i.useState(Dr),_=o,[R,C]=i.useState(!1),[T,P]=i.useState(!1),[S,F]=i.useState(!1),[D,z]=i.useState(void 0),[O,K]=i.useState(!1),[rt,mt]=i.useState(!1),[it,lt]=i.useState(E),[yt,G]=i.useState(!1),W=i.useRef(void 0),[wt,st]=i.useState(new Map);i.useEffect(()=>{let I=!0;return(async()=>{const Rt=y?await y(d):!1;I&&mt(Rt)})(),()=>{I=!1}},[d,y]),i.useEffect(()=>{let I=!0;if(!o){K(!1),st(new Map);return}return(async()=>{const Rt=x?await x(d):!1;I&&K(Rt)})(),()=>{I=!1}},[o,d,x]);const ct=i.useMemo(()=>e.filter(I=>!I.deleted),[e]);i.useEffect(()=>{let I=!0;if(!o||!N){st(new Map);return}return(async()=>{const Rt=new Map;await Promise.all(ct.map(async hr=>{const aa=await N(hr.id);I&&Rt.set(hr.id,aa)})),I&&st(Rt)})(),()=>{I=!1}},[o,ct,N]);const re=i.useMemo(()=>ct[0],[ct]),fn=i.useRef(null),ge=i.useRef(void 0),qt=i.useCallback(()=>{var I;(I=ge.current)==null||I.call(ge),$(Dr)},[]),hn=i.useCallback(()=>{const I=!it;lt(I),G(!I),u==null||u(d,I)},[it,u,d]);i.useEffect(()=>{C(!1)},[o]),i.useEffect(()=>{if(o&&!it&&!yt){const I=setTimeout(()=>{lt(!0),u==null||u(d,!0)},M*1e3);return W.current=I,()=>clearTimeout(I)}W.current&&(clearTimeout(W.current),W.current=void 0)},[o,it,yt,M,d,u]);const Ut=i.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),qe=i.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const I=We(a,r);return j.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:I})},[a,r]),A=i.useMemo(()=>ct.slice(1),[ct]),B=i.useMemo(()=>A.length??0,[A.length]),J=i.useMemo(()=>B>0,[B]),at=i.useMemo(()=>R||B<=2?A:A.slice(-2),[A,B,R]),tt=i.useMemo(()=>R||B<=2?0:B-2,[B,R]),Ft=i.useMemo(()=>B===1?Ut.singleReply:j.formatReplacementString(Ut.multipleReplies,{count:B}),[B,Ut]),jt=i.useMemo(()=>tt===1?Ut.singleReply:j.formatReplacementString(Ut.multipleReplies,{count:tt}),[tt,Ut]),Re=i.useCallback(async()=>{const I=Nt(L)?Qe(L):void 0;if(D!==void 0){await p({threadId:d,contents:I,assignedUser:D})&&(z(void 0),I&&qt());return}I&&await p({threadId:d,contents:I})&&qt()},[qt,L,p,D,d]),Ht=i.useCallback(async I=>{const oe=Nt(L)?Qe(L):void 0,Rt=await p({...I,contents:oe,assignedUser:D??I.assignedUser});return Rt&&oe&&qt(),Rt&&D!==void 0&&z(void 0),Rt},[qt,L,p,D]);return n.jsx(Un,{role:"option","aria-selected":o,id:d,className:m("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&w!=="Resolved"&&it,"tw-bg-background":o&&w!=="Resolved"&&it,"tw-bg-muted":w==="Resolved","tw-bg-blue-50":!it&&!o&&w!=="Resolved"}),onClick:()=>{c(d)},tabIndex:-1,children:n.jsxs(Hn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[qe&&n.jsx(ce,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:qe}),n.jsx(V,{variant:"ghost",size:"icon",onClick:I=>{I.stopPropagation(),hn()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":it?"Mark as unread":"Mark as read",children:it?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),rt&&w!=="Resolved"&&n.jsx(V,{variant:"ghost",size:"icon",className:m("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:I=>{I.stopPropagation(),Ht({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:fn,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":_},{"tw-whitespace-nowrap":!_}),children:[s,n.jsxs("span",{className:t,children:[re.contextBefore,n.jsx("span",{className:"tw-font-bold",children:re.selectedText}),re.contextAfter]})]})}),n.jsx(Mr,{comment:re,localizedStrings:r,isThreadExpanded:o,threadStatus:w,handleAddCommentToThread:Ht,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:P,canEditOrDelete:wt.get(re.id)??!1,canUserResolveThread:rt})]}),n.jsxs(n.Fragment,{children:[J&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ft})]}),!o&&Nt(L)&&n.jsx(Ze,{editorSerializedState:L,onSerializedChange:I=>$(I),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[tt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:I=>{I.stopPropagation(),C(!0)},role:"button",tabIndex:0,onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),I.stopPropagation(),C(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:jt}),R?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),at.map(I=>n.jsx("div",{children:n.jsx(Mr,{comment:I,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:h,onEditingChange:P,canEditOrDelete:wt.get(I.id)??!1})},I.id)),v!==!1&&(!T||Nt(L))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:I=>I.stopPropagation(),onKeyDownCapture:I=>{I.key==="Enter"&&I.shiftKey&&(I.preventDefault(),I.stopPropagation(),(Nt(L)||D!==void 0)&&Re())},onKeyDown:I=>{qn(I),(I.key==="Enter"||I.key===" ")&&I.stopPropagation()},children:[n.jsx(Ze,{editorSerializedState:L,onSerializedChange:I=>$(I),placeholder:w==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:I=>{ge.current=I}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[D!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:j.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:We(D,r)})}),n.jsxs(zt,{open:S,onOpenChange:F,children:[n.jsx(Gt,{asChild:!0,children:n.jsx(V,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!O||!g||g.length===0||!g.includes(l),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:I=>{I.key==="Escape"&&(I.stopPropagation(),F(!1))},children:n.jsx(Pt,{children:n.jsx(Lt,{children:g==null?void 0:g.map(I=>n.jsx(St,{onSelect:()=>{z(I!==a?I:void 0),F(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:We(I,r)})},I||"unassigned"))})})})]}),n.jsx(V,{size:"icon",onClick:Re,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Nt(L)&&D===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function wl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u,selectedThreadId:g,onSelectedThreadChange:v}){const[x,y]=i.useState(new Set),[N,E]=i.useState();i.useEffect(()=>{g&&(y(S=>new Set(S).add(g)),E(g))},[g]);const M=r.filter(S=>S.comments.some(F=>!F.deleted)),L=M.map(S=>({id:S.id})),$=i.useCallback(S=>{y(F=>new Set(F).add(S.id)),E(S.id),v==null||v(S.id)},[v]),_=i.useCallback(S=>{const F=x.has(S);y(D=>{const z=new Set(D);return z.has(S)?z.delete(S):z.add(S),z}),E(S),v==null||v(F?void 0:S)},[x,v]),{listboxRef:R,activeId:C,handleKeyDown:T}=Mo({options:L,onOptionSelect:$}),P=i.useCallback(S=>{S.key==="Escape"?(N&&x.has(N)&&(y(F=>{const D=new Set(F);return D.delete(N),D}),E(void 0),v==null||v(void 0)),S.preventDefault(),S.stopPropagation()):T(S)},[N,x,T,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:R,"aria-activedescendant":C??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:P,children:M.map(S=>n.jsx("div",{id:S.id,className:m({"tw-opacity-60":S.status==="Resolved"}),children:n.jsx(cl,{classNameForVerseText:e,comments:S.comments,localizedStrings:s,verseRef:S.verseRef,handleSelectThread:_,threadId:S.id,isRead:S.isRead,isSelected:x.has(S.id),currentUser:o,assignedUser:S.assignedUser,threadStatus:S.status,handleAddCommentToThread:a,handleUpdateComment:l,handleDeleteComment:c,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:p,canUserAssignThreadCallback:f,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:u})},S.id))})}function dl({table:t}){return n.jsxs(ne,{children:[n.jsx(Vr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(V,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Kt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ee,{children:"Toggle columns"}),n.jsx(fe,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Ot,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const de=Z.Root,Go=Z.Group,pe=Z.Value,Bo=ee.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Qt=i.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=ot();return n.jsxs(Z.Trigger,{className:m(Bo({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(Z.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Qt.displayName=Z.Trigger.displayName;const er=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.ScrollUpButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));er.displayName=Z.ScrollUpButton.displayName;const nr=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.ScrollDownButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));nr.displayName=Z.ScrollDownButton.displayName;const te=i.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=ot();return n.jsx(Z.Portal,{children:n.jsxs(Z.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(er,{}),n.jsx(Z.Viewport,{className:m("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(nr,{})]})})});te.displayName=Z.Content.displayName;const Ko=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.Label,{ref:r,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));Ko.displayName=Z.Label.displayName;const gt=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(Z.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Z.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Z.ItemText,{children:e})]}));gt.displayName=Z.Item.displayName;const qo=i.forwardRef(({className:t,...e},r)=>n.jsx(Z.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));qo.displayName=Z.Separator.displayName;function pl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(de,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Qt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(pe,{placeholder:t.getState().pagination.pageSize})}),n.jsx(te,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(gt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(V,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Ir=`
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
`;function ul(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ve(t,e){const r=e?`${Ir}, ${e}`:Ir;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&ul(o))}const ze=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=i.useRef(null);i.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),i.useEffect(()=>{const l=s.current;if(!l)return;const c=()=>{requestAnimationFrame(()=>{Ve(l,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const d=new MutationObserver(()=>{c()});return d.observe(l,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const a=l=>{const{current:c}=s;if(c){if(l.key==="ArrowDown"){l.preventDefault(),Ve(c)[0].focus();return}l.key===" "&&document.activeElement===c&&l.preventDefault()}};return n.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});ze.displayName="Table";const Ge=i.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));Ge.displayName="TableHeader";const Be=i.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:m("[&_tr:last-child]:tw-border-0",t),...e}));Be.displayName="TableBody";const Uo=i.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Uo.displayName="TableFooter";function ml(t){i.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ve(t.current):[],a=s.indexOf(document.activeElement),l=o.key==="ArrowRight"?a+1:a-1;l>=0&&l<s.length&&s[l].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function fl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function hl(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Dt=i.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const l=i.useRef(null);i.useEffect(()=>{typeof a=="function"?a(l.current):a&&"current"in a&&(a.current=l.current)},[a]),ml(l);const c=i.useMemo(()=>l.current?Ve(l.current):[],[l]),d=i.useCallback(p=>{const{current:f}=l;if(!f||!f.parentElement)return;const h=f.closest("table"),u=h?Ve(h).filter(x=>x.tagName==="TR"):[],g=u.indexOf(f),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),hl(u,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),fl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const x=f.closest("table");x&&x.focus()}e==null||e(p)},[l,c,e]),w=i.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:l,tabIndex:-1,onKeyDown:d,onFocus:w,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Dt.displayName="TableRow";const ke=i.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));ke.displayName="TableHead";const Wt=i.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Wt.displayName="TableCell";const Ho=i.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Ho.displayName="TableCaption";function tn({className:t,...e}){return n.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Yo({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:l=()=>{},id:c,isLoading:d=!1,noResultsMessage:w}){var $;const[p,f]=i.useState([]),[h,u]=i.useState([]),[g,v]=i.useState({}),[x,y]=i.useState({}),N=i.useMemo(()=>e??[],[e]),E=ut.useReactTable({data:N,columns:t,getCoreRowModel:ut.getCoreRowModel(),...r&&{getPaginationRowModel:ut.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:ut.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:ut.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:y,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:x}}),M=E.getVisibleFlatColumns();let L;return d?L=Array.from({length:10}).map((C,T)=>`skeleton-row-${T}`).map(C=>n.jsx(Dt,{children:n.jsx(Wt,{colSpan:M.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(tn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},C)):(($=E.getRowModel().rows)==null?void 0:$.length)>0?L=E.getRowModel().rows.map(_=>n.jsx(Dt,{onClick:()=>l(_,E),"data-state":_.getIsSelected()&&"selected",children:_.getVisibleCells().map(R=>n.jsx(Wt,{children:ut.flexRender(R.column.columnDef.cell,R.getContext())},R.id))},_.id)):L=n.jsx(Dt,{children:n.jsx(Wt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(dl,{table:E}),n.jsxs(ze,{stickyHeader:a,children:[n.jsx(Ge,{stickyHeader:a,children:E.getHeaderGroups().map(_=>n.jsx(Dt,{children:_.headers.map(R=>n.jsx(ke,{children:R.isPlaceholder?void 0:ut.flexRender(R.column.columnDef.header,R.getContext())},R.id))},_.id))}),n.jsx(Be,{children:L})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(V,{variant:"outline",size:"sm",onClick:()=>E.previousPage(),disabled:!E.getCanPreviousPage(),children:"Previous"}),n.jsx(V,{variant:"outline",size:"sm",onClick:()=>E.nextPage(),disabled:!E.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(pl,{table:E})]})}function gl({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=i.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(ya,{options:a,children:e})})}const Xo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Or=(t,e)=>t[e]??e;function Wo({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Or(r,"%webView_error_dump_header%"),a=Or(r,"%webView_error_dump_info_message%");function l(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(V,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>l(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const xl=Object.freeze([...Xo,"%webView_error_dump_copied_message%"]);function bl({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[l,c]=i.useState(!1),d=()=>{c(!0),e&&e()},w=p=>{p||c(!1)};return n.jsxs(zt,{onOpenChange:w,children:[n.jsx(Gt,{asChild:!0,children:o}),n.jsxs($t,{id:a,className:m("tw-min-w-80 tw-max-w-96",s),children:[l&&r["%webView_error_dump_copied_message%"]&&n.jsx(et,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Wo,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var Jo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Jo||{});function vl({id:t,label:e,groups:r}){const[o,s]=i.useState(Object.fromEntries(r.map((w,p)=>w.itemType===0?[p,[]]:void 0).filter(w=>!!w))),[a,l]=i.useState({}),c=(w,p)=>{const f=!o[w][p];s(u=>(u[w][p]=f,{...u}));const h=r[w].items[p];h.onUpdate(h.id,f)},d=(w,p)=>{l(h=>(h[w]=p,{...h}));const f=r[w].items.find(h=>h.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ne,{children:[n.jsx(me,{asChild:!0,children:n.jsxs(V,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Kt,{children:r.map((w,p)=>n.jsxs("div",{children:[n.jsx(Ee,{children:w.label}),n.jsx(Jn,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((f,h)=>n.jsx("div",{children:n.jsx(Ot,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:f.label})},f.id))}):n.jsx(Fo,{value:a[p],onValueChange:f=>d(p,f),children:w.items.map(f=>n.jsx("div",{children:n.jsx(tr,{value:f.id,children:f.label})},f.id))})}),n.jsx(fe,{})]},w.label))})]})})}function yl({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:l,handleSupportLinkClick:c}){const d=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||l)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),l&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(V,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function jl({id:t,versionHistory:e}){const[r,o]=i.useState(!1),s=new Date;function a(c){const d=new Date(c),w=new Date(s.getTime()-d.getTime()),p=w.getUTCFullYear()-1970,f=w.getUTCMonth(),h=w.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:f>0?u=`${f.toString()} month${f===1?"":"s"} ago`:h===0?u="today":u=`${h.toString()} day${h===1?"":"s"} ago`,u}const l=Object.entries(e).sort((c,d)=>d[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?l:l.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),l.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Nl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const l=i.useMemo(()=>j.formatBytes(r),[r]),d=(w=>{const p=new Intl.DisplayNames(j.getCurrentLocale(),{type:"language"});return w.map(f=>p.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(jl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:l})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function Zo({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:l="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:h=!1,icon:u=void 0,className:g=void 0,variant:v="ghost",id:x}){const[y,N]=i.useState(!1),E=i.useCallback(T=>{var S;const P=(S=t.find(F=>F.label===T))==null?void 0:S.value;P&&r(e.includes(P)?e.filter(F=>F!==P):[...e,P])},[t,e,r]),M=()=>d||o,L=i.useMemo(()=>{if(!h)return t;const T=t.filter(S=>S.starred).sort((S,F)=>S.label.localeCompare(F.label)),P=t.filter(S=>!S.starred).sort((S,F)=>{const D=e.includes(S.value),z=e.includes(F.value);return D&&!z?-1:!D&&z?1:S.label.localeCompare(F.label)});return[...T,...P]},[t,e,h]),$=()=>{r(t.map(T=>T.value))},_=()=>{r([])},R=w??y,C=p??N;return n.jsx("div",{id:x,className:g,children:n.jsxs(zt,{open:R,onOpenChange:C,children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:v,role:"combobox","aria-expanded":R,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:M()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Pt,{children:[n.jsx(ue,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:$,children:a}),n.jsx(V,{variant:"ghost",size:"sm",onClick:_,children:l})]}),n.jsxs(Lt,{children:[n.jsx(Se,{children:c}),n.jsx(At,{children:L.map(T=>n.jsxs(St,{value:T.label,onSelect:E,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:m("tw-h-4 tw-w-4",e.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function kl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Zo,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:l,sortSelected:c,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var u;return n.jsxs(ce,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(V,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(g=>g.value===h))==null?void 0:u.label]},h)})}):n.jsx(et,{children:p})]})}const he=i.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));he.displayName="Input";const _l=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Cl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),[d,w]=i.useState(t),[p,f]=i.useState(r),[h,u]=i.useState(!1);i.useEffect(()=>{w(t)},[t]),i.useEffect(()=>{p!==r&&f(r)},[r]);const g=x=>{c.current=!1,u(x),x||(d!=="custom"||p?(e(d),o(p)):(w(t),f(r)))},v=x=>{var y,N,E,M;x.stopPropagation(),document.activeElement===l.current&&x.key==="ArrowDown"||x.key==="ArrowRight"?((y=a.current)==null||y.focus(),c.current=!0):document.activeElement===a.current&&x.key==="ArrowUp"?((N=l.current)==null||N.focus(),c.current=!1):document.activeElement===a.current&&x.key==="ArrowLeft"&&((E=a.current)==null?void 0:E.selectionStart)===0&&((M=l.current)==null||M.focus(),c.current=!1),d==="custom"&&x.key==="Enter"&&(document.activeElement===l.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(ne,{open:h,onOpenChange:g,children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(me,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6",children:_l(t,s,r)})})}),n.jsx(vt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Kt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var x;c.current&&((x=a.current)==null||x.focus())},children:[n.jsx(Ee,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(fe,{}),n.jsx(Ot,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:xt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Ot,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:xt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Ot,{ref:l,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:x=>{var y;x.stopPropagation(),c.current=!0,(y=a.current)==null||y.focus()},onSelect:x=>x.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(he,{tabIndex:0,onMouseDown:x=>{x.stopPropagation(),w("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:x=>{x.key==="Enter"||x.key==="ArrowUp"||x.key==="ArrowDown"||x.key==="ArrowLeft"||x.key==="ArrowRight"||x.stopPropagation()},maxLength:1,onChange:x=>f(x.target.value)})]})})]})]})}const Sl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),El=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),j.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Rl({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ne,{children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Lr.TooltipTrigger,{asChild:!0,children:n.jsx(me,{asChild:!0,children:n.jsx(V,{variant:"outline",className:"tw-h-6",children:Sl(t,r)})})}),n.jsx(vt,{children:n.jsx("p",{children:El(t,r)})})]})}),n.jsxs(Kt,{className:"tw-z-[300]",children:[n.jsx(Ee,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(fe,{}),n.jsxs(Ot,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Ot,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Ot,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Tl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Ml(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Dl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Il({classNameForEditor:t,noteOps:e,onSave:r,onClose:o,scrRef:s,noteKey:a,editorOptions:l,localizedStrings:c}){const d=i.useRef(null),w=i.createRef(),[p,f]=i.useState("generated"),[h,u]=i.useState("*"),[g,v]=i.useState("f"),[x,y]=i.useState(!1),N=i.useMemo(()=>({...l,markerMenuTrigger:l.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...l.view??xt.getDefaultViewOptions(),noteMode:"expanded"}}),[l]);i.useEffect(()=>{var _;(_=d.current)==null||_.focus()}),i.useEffect(()=>{var C,T;let _;const R=e==null?void 0:e.at(0);if(R&&xt.isInsertEmbedOpOfType("note",R)){const P=(C=R.insert.note)==null?void 0:C.caller;let S="custom";P===xt.GENERATOR_NOTE_CALLER?S="generated":P===xt.HIDDEN_NOTE_CALLER?S="hidden":P&&u(P),f(S),v(((T=R.insert.note)==null?void 0:T.style)??"f"),_=setTimeout(()=>{var F;(F=d.current)==null||F.applyUpdate([R])},0)}return()=>{_&&clearTimeout(_)}},[e,a]);const E=i.useCallback(()=>{var R,C;const _=(C=(R=d.current)==null?void 0:R.getNoteOps(0))==null?void 0:C.at(0);_&&xt.isInsertEmbedOpOfType("note",_)&&(_.insert.note&&(p==="custom"?_.insert.note.caller=h:_.insert.note.caller=p==="generated"?xt.GENERATOR_NOTE_CALLER:xt.HIDDEN_NOTE_CALLER),r([_]))},[p,h,r]),M=()=>{var R;const _=(R=w.current)==null?void 0:R.getElementsByClassName("editor-input")[0];_!=null&&_.textContent&&navigator.clipboard.writeText(_.textContent)},L=_=>{var C,T,P,S,F;v(_);const R=(T=(C=d.current)==null?void 0:C.getNoteOps(0))==null?void 0:T.at(0);if(R&&xt.isInsertEmbedOpOfType("note",R)){R.insert.note&&(R.insert.note.style=_);const D=(S=(P=R.insert.note)==null?void 0:P.contents)==null?void 0:S.ops;g!=="x"&&_==="x"?D==null||D.forEach(z=>Tl(z)):g==="x"&&_!=="x"&&(D==null||D.forEach(z=>Ml(z))),(F=d.current)==null||F.applyUpdate([R,{delete:1}])}},$=_=>{var C,T,P,S,F;const R=(T=(C=d.current)==null?void 0:C.getNoteOps(0))==null?void 0:T.at(0);if(R&&xt.isInsertEmbedOpOfType("note",R)){_.content.length>1&&setTimeout(()=>{var O;(O=d.current)==null||O.applyUpdate([{retain:2},{delete:1}])},0);const D=(P=R.insert.note)==null?void 0:P.style,z=(F=(S=R.insert.note)==null?void 0:S.contents)==null?void 0:F.ops;D||y(!1),y(D==="x"?!!(z!=null&&z.every(O=>{var rt,mt;if(!((rt=O.attributes)!=null&&rt.char))return!0;const K=((mt=O.attributes)==null?void 0:mt.char).style;return K==="xt"||K==="xo"||K==="xq"})):!!(z!=null&&z.every(O=>{var rt,mt;if(!((rt=O.attributes)!=null&&rt.char))return!0;const K=((mt=O.attributes)==null?void 0:mt.char).style;return K==="ft"||K==="fr"||K==="fq"})))}else y(!1)};return n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Rl,{isTypeSwitchable:x,noteType:g,handleNoteTypeChange:L,localizedStrings:c}),n.jsx(Cl,{callerType:p,updateCallerType:f,customCaller:h,updateCustomCaller:u,localizedStrings:c})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(V,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(vt,{children:n.jsx("p",{children:c["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(V,{onClick:E,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(k.Check,{})})}),n.jsx(vt,{children:c["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:w,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(xt.Editorial,{options:N,onUsjChange:$,defaultUsj:Dl,onScrRefChange:()=>{},scrRef:s,ref:d})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:n.jsx(V,{onClick:M,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(vt,{children:n.jsx("p",{children:c["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Ol=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function Qo(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Al(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let l=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(l.length>0&&a.push(l),l=[c]):l.push(c)}),l.length>0&&a.push(l),a.map((c,d)=>{const w=d===a.length-1;return n.jsxs("p",{children:[rr(t,c,r,!0,s),w&&o]},Qo(t,c))})}function rr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const l=`${t}-text-${a.slice(0,10)}`;if(o){const c=m(`usfm_${t}`);return n.jsx("span",{className:c,children:a},l)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},l)}return Pl(a,Qo(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function Pl(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),rr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function ts({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let l,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([l,...c]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),f=l&&n.jsxs(n.Fragment,{children:[rr(t.marker,[l],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=m(h,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[d,p]}),n.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:f}),n.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Al(t.marker,c,o,w)})})]})}function Ll({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:l=!0,suppressFormatting:c=!1,formatCaller:d,onFootnoteSelected:w}){const p=d??j.getFormatCallerFunction(r,void 0),f=(N,E)=>{w==null||w(N,E,s)},h=a?r.findIndex(N=>N===a):-1,[u,g]=i.useState(h),v=(N,E,M)=>{if(r.length)switch(N.key){case"Enter":case" ":N.preventDefault(),w==null||w(E,M,s);break}},x=N=>{if(r.length)switch(N.key){case"ArrowDown":N.preventDefault(),g(E=>Math.min(E+1,r.length-1));break;case"ArrowUp":N.preventDefault(),g(E=>Math.max(E-1,0));break}},y=i.useRef([]);return i.useEffect(()=>{var N;u>=0&&u<y.current.length&&((N=y.current[u])==null||N.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:m("tw-h-full tw-overflow-y-auto",t),onKeyDown:x,children:n.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((N,E)=>{const M=N===a,L=`${s}-${E}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:$=>{y.current[E]=$},role:"option","aria-selected":M,"data-marker":N.marker,"data-state":M?"selected":void 0,tabIndex:E===u?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>f(N,E),onKeyDown:$=>v($,N,E),children:n.jsx(ts,{footnote:N,layout:o,formatCaller:()=>p(N.caller,E),showMarkers:l})},L),E<r.length-1&&o==="vertical"&&n.jsx(we,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function $l(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Vl({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[],d=new Set;return t.forEach(w=>{const p=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(p)||(d.add(p),c.push(w))}),c},[t]);return n.jsxs(ze,{stickyHeader:!0,children:[n.jsx(Ge,{stickyHeader:!0,children:n.jsxs(Dt,{children:[n.jsx(ke,{children:s}),n.jsx(ke,{children:a})]})}),n.jsx(Be,{children:l.length>0&&l.map(c=>n.jsxs(Dt,{onClick:()=>{e(c.reference)},children:[n.jsx(Wt,{children:j.formatScrRef(c.reference,"English")}),n.jsx(Wt,{className:o,children:$l(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const pn=i.forwardRef(({className:t,...e},r)=>n.jsx(Tn.Root,{ref:r,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Tn.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));pn.displayName=Tn.Root.displayName;const un=t=>t==="asc"?n.jsx(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),Fl=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(V,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,un(e.getIsSorted())]})}),zl=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(V,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,un(r.getIsSorted())]})}),Gl=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(V,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,un(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),_n=(t,e,r,o,s,a)=>{let l=[...r];t.forEach(d=>{e==="approved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),o(l);let c=[...s];t.forEach(d=>{e==="unapproved"?c.includes(d)||c.push(d):c=c.filter(w=>w!==d)}),a(c)},Bl=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(V,{variant:"ghost",onClick:()=>a.toggleSorting(void 0),children:[t,un(a.getIsSorted())]})}),cell:({row:a})=>{const l=a.getValue("status"),c=a.getValue("item");return n.jsxs(dn,{value:l,variant:"outline",type:"single",children:[n.jsx(ye,{onClick:d=>{d.stopPropagation(),_n([c],"approved",e,r,o,s)},value:"approved",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(ye,{onClick:d=>{d.stopPropagation(),_n([c],"unapproved",e,r,o,s)},value:"unapproved",children:n.jsx(k.CircleXIcon,{})}),n.jsx(ye,{onClick:d=>{d.stopPropagation(),_n([c],"unknown",e,r,o,s)},value:"unknown",children:n.jsx(k.CircleHelpIcon,{})})]})}}),Kl=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ql=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Ul=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},es=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Hl=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Yl=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Xl=(t,e,r)=>t.map(o=>{const s=j.isString(o.key)?o.key:o.key[0];return{items:j.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||es(s,e,r),occurrences:o.occurrences||[]}}),Tt=(t,e)=>t[e]??e;function Wl({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:l,onScopeChange:c,columns:d,id:w,areInventoryItemsLoading:p=!1,classNameForVerseText:f,onItemSelected:h}){const u=Tt(r,"%webView_inventory_all%"),g=Tt(r,"%webView_inventory_approved%"),v=Tt(r,"%webView_inventory_unapproved%"),x=Tt(r,"%webView_inventory_unknown%"),y=Tt(r,"%webView_inventory_scope_currentBook%"),N=Tt(r,"%webView_inventory_scope_chapter%"),E=Tt(r,"%webView_inventory_scope_verse%"),M=Tt(r,"%webView_inventory_filter_text%"),L=Tt(r,"%webView_inventory_show_additional_items%"),$=Tt(r,"%webView_inventory_no_results%"),[_,R]=i.useState(!1),[C,T]=i.useState("all"),[P,S]=i.useState(""),[F,D]=i.useState([]),z=i.useMemo(()=>{const G=t??[];return G.length===0?[]:Xl(G,s,a)},[t,s,a]),O=i.useMemo(()=>{if(_)return z;const G=[];return z.forEach(W=>{const wt=W.items[0],st=G.find(ct=>ct.items[0]===wt);st?(st.count+=W.count,st.occurrences=st.occurrences.concat(W.occurrences)):G.push({items:[wt],count:W.count,occurrences:W.occurrences,status:W.status})}),G},[_,z]),K=i.useMemo(()=>O.length===0?[]:Yl(O,C,P),[O,C,P]),rt=i.useMemo(()=>{var wt,st;if(!_)return d;const G=(wt=o==null?void 0:o.tableHeaders)==null?void 0:wt.length;if(!G)return d;const W=[];for(let ct=0;ct<G;ct++)W.push(zl(((st=o==null?void 0:o.tableHeaders)==null?void 0:st[ct])||"Additional Item",ct+1));return[...W,...d]},[o==null?void 0:o.tableHeaders,d,_]);i.useEffect(()=>{K.length===0?D([]):K.length===1&&D(K[0].items)},[K]);const mt=(G,W)=>{W.setRowSelection(()=>{const st={};return st[G.index]=!0,st});const wt=G.original.items;D(wt),h&&wt.length>0&&h(wt[0])},it=G=>{if(G==="book"||G==="chapter"||G==="verse")c(G);else throw new Error(`Invalid scope value: ${G}`)},lt=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")T(G);else throw new Error(`Invalid status filter value: ${G}`)},yt=i.useMemo(()=>{if(O.length===0||F.length===0)return[];const G=O.filter(W=>j.deepEqual(_?W.items:[W.items[0]],F));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[F,_,O]);return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(de,{onValueChange:G=>lt(G),defaultValue:C,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(pe,{placeholder:"Select filter"})}),n.jsxs(te,{children:[n.jsx(gt,{value:"all",children:u}),n.jsx(gt,{value:"approved",children:g}),n.jsx(gt,{value:"unapproved",children:v}),n.jsx(gt,{value:"unknown",children:x})]})]}),n.jsxs(de,{onValueChange:G=>it(G),defaultValue:l,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(pe,{placeholder:"Select scope"})}),n.jsxs(te,{children:[n.jsx(gt,{value:"book",children:y}),n.jsx(gt,{value:"chapter",children:N}),n.jsx(gt,{value:"verse",children:E})]})]}),n.jsx(he,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:M,value:P,onChange:G=>{S(G.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(pn,{className:"tw-m-1",checked:_,onCheckedChange:G=>{R(G)}}),n.jsx(et,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??L})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Yo,{columns:rt,data:K,onRowClickHandler:mt,stickyHeader:!0,isLoading:p,noResultsMessage:$})}),yt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Vl,{classNameForText:f,occurrenceData:yt,setScriptureReference:e,localizedStrings:r})})]})}const Jl=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Zl({localizedStrings:t,markerMenuItems:e}){const[r,o]=i.useState(""),s=i.useMemo(()=>{const a=r.trim().toLowerCase();return a?e.filter(l=>{var c;return((c=l.marker)==null?void 0:c.toLowerCase().includes(a))||l.title.toLowerCase().includes(a)}):e},[r,e]);return n.jsxs(Pt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(ue,{value:r,onValueChange:a=>o(a),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Lt,{children:[n.jsx(Se,{children:t["%markerMenu_noResults%"]}),n.jsx(At,{children:s.map(a=>n.jsxs(St,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-6",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:a.icon})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Xr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.title}`))})]})]})}const Ql="16rem",tc="3rem",ns=i.createContext(void 0);function Ke(){const t=i.useContext(ns);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const or=i.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:l="primary",...c},d)=>{const[w,p]=i.useState(t),f=e??w,h=i.useCallback(E=>{const M=typeof E=="function"?E(f):E;r?r(M):p(M)},[r,f]),u=i.useCallback(()=>h(E=>!E),[h]),g=f?"expanded":"collapsed",y=ot()==="ltr"?l:l==="primary"?"secondary":"primary",N=i.useMemo(()=>({state:g,open:f,setOpen:h,toggleSidebar:u,side:y}),[g,f,h,u,y]);return n.jsx(ns.Provider,{value:N,children:n.jsx(bt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Ql,"--sidebar-width-icon":tc,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:d,...c,children:a})})})});or.displayName="SidebarProvider";const sr=i.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const l=Ke();return e==="none"?n.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":l.state,"data-collapsible":l.state==="collapsed"?e:"","data-variant":t,"data-side":l.side,children:[n.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",l.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});sr.displayName="Sidebar";const rs=i.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Ke();return n.jsxs(V,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});rs.displayName="SidebarTrigger";const os=i.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Ke();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});os.displayName="SidebarRail";const ar=i.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));ar.displayName="SidebarInset";const ss=i.forwardRef(({className:t,...e},r)=>n.jsx(he,{ref:r,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ss.displayName="SidebarInput";const as=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));as.displayName="SidebarHeader";const is=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));is.displayName="SidebarFooter";const ls=i.forwardRef(({className:t,...e},r)=>n.jsx(we,{ref:r,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));ls.displayName="SidebarSeparator";const ir=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));ir.displayName="SidebarContent";const en=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));en.displayName="SidebarGroup";const nn=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?_e.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});nn.displayName="SidebarGroupLabel";const cs=i.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?_e.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});cs.displayName="SidebarGroupAction";const rn=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",t),...e}));rn.displayName="SidebarGroupContent";const lr=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));lr.displayName="SidebarMenu";const cr=i.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",t),...e}));cr.displayName="SidebarMenuItem";const ec=ee.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),wr=i.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...l},c)=>{const d=t?_e.Slot:"button",{state:w}=Ke(),p=n.jsx(d,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:m(ec({variant:r,size:o}),a),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:p}),n.jsx(vt,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):p});wr.displayName="SidebarMenuButton";const ws=i.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?_e.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});ws.displayName="SidebarMenuAction";const ds=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ds.displayName="SidebarMenuBadge";const ps=i.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(tn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(tn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});ps.displayName="SidebarMenuSkeleton";const us=i.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));us.displayName="SidebarMenuSub";const ms=i.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));ms.displayName="SidebarMenuSubItem";const fs=i.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const l=t?_e.Slot:"a";return n.jsx(l,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});fs.displayName="SidebarMenuSubButton";function hs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:l,buttonPlaceholderText:c,className:d}){const w=i.useCallback((h,u)=>{o(h,u)},[o]),p=i.useCallback(h=>{const u=r.find(g=>g.projectId===h);return u?u.projectName:h},[r]),f=i.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(sr,{id:t,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(ir,{children:[n.jsxs(en,{children:[n.jsx(nn,{className:"tw-text-sm",children:a}),n.jsx(rn,{children:n.jsx(lr,{children:Object.entries(e).map(([h,u])=>n.jsx(cr,{children:n.jsx(wr,{onClick:()=>w(h),isActive:f(h),children:n.jsx("span",{className:"tw-pl-3",children:u})})},h))})})]}),n.jsxs(en,{children:[n.jsx(nn,{className:"tw-text-sm",children:l}),n.jsx(rn,{className:"tw-pl-3",children:n.jsx(Je,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const u=p(h);w(u,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const mn=i.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:l},c)=>{const d=ot();return n.jsxs("div",{id:l,className:m("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(he,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:a}),t&&n.jsxs(V,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});mn.displayName="SearchBar";function nc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:l,onSearch:c,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(mn,{className:"tw-w-9/12",value:l,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(or,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(hs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:p}),n.jsx(ar,{className:"tw-min-w-[215px]",children:o})]})]})}const Yt="scrBook",rc="scrRef",ie="source",oc="details",sc="Scripture Reference",ac="Scripture Book",gs="Type",ic="Details";function lc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Yt,header:(t==null?void 0:t.scriptureReferenceColumnName)??sc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?Q.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Yt?j.formatScrRef(s.start):void 0},getGroupingValue:o=>Q.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>j.formatScrRef(o.start),id:rc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:j.formatScrRef(s.start)},sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ie,header:r?(t==null?void 0:t.typeColumnName)??gs:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:oc,header:(t==null?void 0:t.detailsColumnName)??ic,cell:o=>o.getValue(),enableGrouping:!1}]}const cc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||j.compareScrRefs(t.start,t.end)===0?`${j.scrRefToBBBCCCVVV(t.start)}+${e}`:`${j.scrRefToBBBCCCVVV(t.start)}+${e}-${j.scrRefToBBBCCCVVV(t.end)}+${r}`},Ar=t=>`${cc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function wc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:l,onRowSelected:c,id:d}){const[w,p]=i.useState([]),[f,h]=i.useState([{id:Yt,desc:!1}]),[u,g]=i.useState({}),v=i.useMemo(()=>t.flatMap(C=>C.data.map(T=>({...T,source:C.source}))),[t]),x=i.useMemo(()=>lc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:l},r),[o,a,l,r]);i.useEffect(()=>{w.includes(ie)?h([{id:ie,desc:!1},{id:Yt,desc:!1}]):h([{id:Yt,desc:!1}])},[w]);const y=ut.useReactTable({data:v,columns:x,state:{grouping:w,sorting:f,rowSelection:u},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ut.getExpandedRowModel(),getGroupedRowModel:ut.getGroupedRowModel(),getCoreRowModel:ut.getCoreRowModel(),getSortedRowModel:ut.getSortedRowModel(),getRowId:Ar,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(c){const C=y.getSelectedRowModel().rowsById,T=Object.keys(C);if(T.length===1){const P=v.find(S=>Ar(S)===T[0])||void 0;P&&c(P)}}},[u,v,c,y]);const N=s??ac,E=a??gs,M=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[Yt]},{label:`Group by ${E}`,value:[ie]},{label:`Group by ${N} and ${E}`,value:[Yt,ie]},{label:`Group by ${E} and ${N}`,value:[ie,Yt]}],L=C=>{p(JSON.parse(C))},$=(C,T)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(T)},_=(C,T)=>C.getIsGrouped()?"":m("banded-row",T%2===0?"even":"odd"),R=(C,T,P)=>{if(!((C==null?void 0:C.length)===0||T.depth<P.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(de,{value:JSON.stringify(w),onValueChange:C=>{L(C)},children:[n.jsx(Qt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(pe,{})}),n.jsx(te,{position:"item-aligned",children:n.jsx(Go,{children:M.map(C=>n.jsx(gt,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),n.jsxs(ze,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(Ge,{children:y.getHeaderGroups().map(C=>n.jsx(Dt,{children:C.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(ke,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx(V,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ut.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},C.id))}),n.jsx(Be,{children:y.getRowModel().rows.map((C,T)=>{const P=ot();return n.jsx(Dt,{"data-state":C.getIsSelected()?"selected":"",className:m(_(C,T)),onClick:S=>$(C,S),children:C.getVisibleCells().map(S=>{if(!(S.getIsPlaceholder()||S.column.columnDef.enableGrouping&&!S.getIsGrouped()&&(S.column.columnDef.id!==ie||!r)))return n.jsx(Wt,{className:m(S.column.columnDef.id,"tw-p-[1px]",R(w,C,S)),children:S.getIsGrouped()?n.jsxs(V,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!C.getIsExpanded()&&(P==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",ut.flexRender(S.column.columnDef.cell,S.getContext())," (",C.subRows.length,")"]}):ut.flexRender(S.column.columnDef.cell,S.getContext())},S.id)})},C.id)})})]})]})}const dr=(t,e)=>t.filter(r=>{try{return j.getSectionForBook(r)===e}catch{return!1}}),xs=(t,e,r)=>dr(t,e).every(o=>r.includes(o));function dc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=dr(e,t).length===0,l=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(V,{variant:"outline",size:"sm",onClick:()=>o(t),className:m(xs(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:Pa(t,l,c,d,w)})}const Pr=5,Cn=6;function pc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],l=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:h,ntLong:u,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[x,y]=i.useState(!1),[N,E]=i.useState(""),M=i.useRef(void 0),L=i.useRef(!1);if(t.length!==Q.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const $=i.useMemo(()=>Q.Canon.allBookIds.filter((D,z)=>t[z]==="1"&&!Q.Canon.isObsolete(Q.Canon.bookIdToNumber(D))),[t]),_=i.useMemo(()=>{if(!N.trim()){const O={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return $.forEach(K=>{const rt=j.getSectionForBook(K);O[rt].push(K)}),O}const D=$.filter(O=>Vn(O,N,s)),z={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return D.forEach(O=>{const K=j.getSectionForBook(O);z[K].push(O)}),z},[$,N,s]),R=i.useCallback((D,z=!1)=>{if(!z||!M.current){r(e.includes(D)?e.filter(lt=>lt!==D):[...e,D]),M.current=D;return}const O=$.findIndex(lt=>lt===M.current),K=$.findIndex(lt=>lt===D);if(O===-1||K===-1)return;const[rt,mt]=[Math.min(O,K),Math.max(O,K)],it=$.slice(rt,mt+1).map(lt=>lt);r(e.includes(D)?e.filter(lt=>!it.includes(lt)):[...new Set([...e,...it])])},[e,r,$]),C=D=>{R(D,L.current),L.current=!1},T=(D,z)=>{D.preventDefault(),R(z,D.shiftKey)},P=i.useCallback(D=>{const z=dr($,D).map(O=>O);r(xs($,D,e)?e.filter(O=>!z.includes(O)):[...new Set([...e,...z])])},[e,r,$]),S=()=>{r($.map(D=>D))},F=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(j.Section).map(D=>n.jsx(dc,{section:D,availableBookIds:$,selectedBookIds:e,onToggle:P,localizedStrings:o},D))}),n.jsxs(zt,{open:x,onOpenChange:D=>{y(D),D||E("")},children:[n.jsx(Gt,{asChild:!0,children:n.jsxs(V,{variant:"outline",role:"combobox","aria-expanded":x,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:l,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Pt,{shouldFilter:!1,onKeyDown:D=>{D.key==="Enter"&&(L.current=D.shiftKey)},children:[n.jsx(ue,{placeholder:c,value:N,onValueChange:E}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(V,{variant:"ghost",size:"sm",onClick:S,children:d}),n.jsx(V,{variant:"ghost",size:"sm",onClick:F,children:w})]}),n.jsxs(Lt,{children:[n.jsx(Se,{children:p}),Object.values(j.Section).map((D,z)=>{const O=_[D];if(O.length!==0)return n.jsxs(i.Fragment,{children:[n.jsx(At,{heading:Wr(D,h,u,g,v),children:O.map(K=>n.jsx(Zr,{bookId:K,isSelected:e.includes(K),onSelect:()=>C(K),onMouseDown:rt=>T(rt,K),section:j.getSectionForBook(K),showCheck:!0,localizedBookNames:s,commandValue:In(K,s),className:"tw-flex tw-items-center"},K))}),z<Object.values(j.Section).length-1&&n.jsx(Yr,{})]},D)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Cn?Cn:Pr).map(D=>n.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:ve(D,s)},D)),e.length>Cn&&n.jsx(ce,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Pr} ${f}`})]})]})}const uc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),se=(t,e)=>t[e]??e;function mc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:l,localizedBookNames:c,id:d}){const w=se(l,"%webView_scope_selector_selected_text%"),p=se(l,"%webView_scope_selector_current_verse%"),f=se(l,"%webView_scope_selector_current_chapter%"),h=se(l,"%webView_scope_selector_current_book%"),u=se(l,"%webView_scope_selector_choose_books%"),g=se(l,"%webView_scope_selector_scope%"),v=se(l,"%webView_scope_selector_select_books%"),x=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],y=e?x.filter(N=>e.includes(N.value)):x;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(et,{children:g}),n.jsx(ln,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:y.map(({value:N,label:E,id:M})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{className:"tw-me-2",value:N,id:M}),n.jsx(et,{htmlFor:M,children:E})]},M))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(et,{children:v}),n.jsx(pc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:l,localizedBookNames:c})]})]})}const Sn={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function fc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:l}){const c={...Sn,...Object.fromEntries(Object.entries(o).map(([w,p])=>[w,w===p&&w in Sn?Sn[w]:p]))},d=ot();return n.jsxs(de,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(Qt,{size:s,className:m("pr-twp tw-w-auto",a),children:n.jsx(pe,{placeholder:c[j.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(te,{id:l,align:d==="rtl"?"end":"start",style:{zIndex:250},children:t.map(w=>n.jsx(gt,{value:`${w}`,children:c[j.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function hc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function gc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function xc({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(we,{}):""]})}function bs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function on({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const vs=(t,e,r,o)=>r?Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,d)=>c.order-d.order).map(c=>n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:"command"in c?n.jsxs($e,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(on,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(on,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Vo,{children:[n.jsx(Zn,{children:c.label}),n.jsx($o,{children:n.jsx(Qn,{children:vs(t,e,bs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(vt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function sn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:l="ghost",id:c}){return n.jsxs(ne,{variant:a,children:[n.jsx(me,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(V,{variant:l,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Kt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,p)=>n.jsxs(i.Fragment,{children:[n.jsx(Jn,{children:n.jsx(bt,{children:vs(e.groups,e.items,d,t)})}),w<p.length-1&&n.jsx(fe,{})]},d))})]})}const ys=i.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function bc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:l,centerAreaChildren:c,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(ys,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(sn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:l}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(sn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function vc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(ys,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(sn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const pr=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsx(ht.Root,{orientation:"vertical",ref:r,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});pr.displayName=ht.List.displayName;const ur=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.List,{ref:r,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));ur.displayName=ht.List.displayName;const js=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Trigger,{ref:r,...e,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),mr=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Content,{ref:r,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));mr.displayName=ht.Content.displayName;function yc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:l}){return n.jsxs("div",{id:l,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(mn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(pr,{children:[n.jsx(ur,{children:t.map(c=>n.jsx(js,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(mr,{value:c.value,children:c.content},c.key))]})]})}function jc({...t}){return n.jsx(Y.Menu,{...t})}function Nc({...t}){return n.jsx(Y.Sub,{"data-slot":"menubar-sub",...t})}const Ns=i.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=i.useMemo(()=>({variant:e}),[e]);return n.jsx(Wn.Provider,{value:s,children:n.jsx(Y.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Ns.displayName=Y.Root.displayName;const ks=i.forwardRef(({className:t,...e},r)=>{const o=Et();return n.jsx(Y.Trigger,{ref:r,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Bt({variant:o.variant,className:t})),...e})});ks.displayName=Y.Trigger.displayName;const _s=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Et();return n.jsxs(Y.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Bt({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});_s.displayName=Y.SubTrigger.displayName;const Cs=i.forwardRef(({className:t,...e},r)=>{const o=Et();return n.jsx(Y.SubContent,{ref:r,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Cs.displayName=Y.SubContent.displayName;const Ss=i.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const l=Et();return n.jsx(Y.Portal,{children:n.jsx(Y.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":l.variant==="muted"},t),...s})})});Ss.displayName=Y.Content.displayName;const Es=i.forwardRef(({className:t,inset:e,...r},o)=>{const s=Et();return n.jsx(Y.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Bt({variant:s.variant,className:t}),t),...r})});Es.displayName=Y.Item.displayName;const kc=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=Et();return n.jsxs(Y.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Bt({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Y.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});kc.displayName=Y.CheckboxItem.displayName;const _c=i.forwardRef(({className:t,children:e,...r},o)=>{const s=Et();return n.jsxs(Y.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Bt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Y.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});_c.displayName=Y.RadioItem.displayName;const Cc=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Y.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Cc.displayName=Y.Label.displayName;const Rs=i.forwardRef(({className:t,...e},r)=>n.jsx(Y.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Rs.displayName=Y.Separator.displayName;const Me=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ts=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,l])=>"column"in l&&l.column===r||a===r).sort(([,a],[,l])=>a.order-l.order);return s.flatMap(([a],l)=>{const c=e.filter(w=>w.group===a).sort((w,p)=>w.order-p.order).map(w=>n.jsxs(kt,{children:[n.jsx(It,{asChild:!0,children:"command"in w?n.jsxs(Es,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(on,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(on,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(Nc,{children:[n.jsx(_s,{children:w.label}),n.jsx(Cs,{children:Ts(t,e,bs(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(vt,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...c];return c.length>0&&l<s.length-1&&d.push(n.jsx(Rs,{},`separator-${a}`)),d})};function Sc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=i.useRef(void 0),a=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),d=i.useRef(void 0),w=p=>{switch(p){case"platform.app":return a;case"platform.window":return l;case"platform.layout":return c;case"platform.help":return d;default:return}};if(_a.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var g,v,x,y;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":Me(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Me(a,[h,u]);break;case"alt+l":(v=l.current)==null||v.focus(),Me(l,[h,u]);break;case"alt+n":(x=c.current)==null||x.focus(),Me(c,[h,u]);break;case"alt+h":(y=d.current)==null||y.focus(),Me(d,[h,u]);break}}),i.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Ns,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(jc,{children:[n.jsx(ks,{ref:w(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(Ss,{className:"tw-z-[250]",children:n.jsx(bt,{children:Ts(t.groups,t.items,p,e)})})]},p))})}function Ec(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Rc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:l,configAreaChildren:c,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const p=i.useRef(void 0);return n.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[l,t&&n.jsx(Sc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Tc=(t,e)=>t[e]??e;function Mc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:l,className:c,id:d}){const w=Tc(l,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=i.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),a&&r.find(v=>v===g)&&a([...r.filter(v=>v!==g)]),f(!1)},u=(g,v)=>{var y,N,E,M,L,$;const x=v!==g?((N=(y=t[g])==null?void 0:y.uiNames)==null?void 0:N[v])??((M=(E=t[g])==null?void 0:E.uiNames)==null?void 0:M.en):void 0;return x?`${(L=t[g])==null?void 0:L.autonym} (${x})`:($=t[g])==null?void 0:$.autonym};return n.jsxs("div",{id:d,className:m("pr-twp tw-max-w-sm",c),children:[n.jsxs(de,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>f(g),children:[n.jsx(Qt,{children:n.jsx(pe,{})}),n.jsx(te,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(gt,{value:g,children:u(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(et,{className:"tw-font-normal tw-text-muted-foreground",children:j.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>u(g,e)).join(", "):t.en.autonym})})})]})}function Dc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(et,{children:e(t)}):r?n.jsx(et,{children:r(t)}):n.jsx(et,{children:t})}function Ic({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:l}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(pn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:d=>s(c,d)}),n.jsx(Dc,{item:c,createLabel:a,createComplexLabel:l})]},c))})}function Oc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:l,dropdownContent:c,additionalSelectedContent:d,accentColor:w}){const p=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:m("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:l}),e&&c&&n.jsxs(ne,{children:[n.jsx(me,{className:m(w&&"tw-me-1"),asChild:!0,children:n.jsx(V,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Kt,{align:"end",children:c})]})]}),e&&d&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),w&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},t)}const Ms=i.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:m("tw-animate-spin",t),...e,ref:r}));Ms.displayName="Spinner";function Ac({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:l,isRequired:c=!1,className:d,defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}){return n.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(et,{htmlFor:t,className:m({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(he,{id:t,disabled:e,placeholder:l,required:c,className:m(d,{"tw-border-red-600":r}),defaultValue:w,value:p,onChange:f,onFocus:h,onBlur:u}),n.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Pc=ee.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Ds=i.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Pc({variant:e}),t),...r}));Ds.displayName="Alert";const Is=i.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Is.displayName="AlertTitle";const Os=i.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Os.displayName="AlertDescription";const Lc=X.Root,$c=X.Trigger,Vc=X.Group,Fc=X.Portal,zc=X.Sub,Gc=X.RadioGroup,As=i.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(X.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));As.displayName=X.SubTrigger.displayName;const Ps=i.forwardRef(({className:t,...e},r)=>n.jsx(X.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Ps.displayName=X.SubContent.displayName;const Ls=i.forwardRef(({className:t,...e},r)=>n.jsx(X.Portal,{children:n.jsx(X.Content,{ref:r,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Ls.displayName=X.Content.displayName;const $s=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));$s.displayName=X.Item.displayName;const Vs=i.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(X.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Vs.displayName=X.CheckboxItem.displayName;const Fs=i.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(X.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Fs.displayName=X.RadioItem.displayName;const zs=i.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));zs.displayName=X.Label.displayName;const Gs=i.forwardRef(({className:t,...e},r)=>n.jsx(X.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Gs.displayName=X.Separator.displayName;function Bs({className:t,...e}){return n.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Bs.displayName="ContextMenuShortcut";const Ks=i.createContext({direction:"bottom"});function qs({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=i.useMemo(()=>({direction:e}),[e]);return n.jsx(Ks.Provider,{value:o,children:n.jsx(Ct.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}qs.displayName="Drawer";const Bc=Ct.Drawer.Trigger,Us=Ct.Drawer.Portal,Kc=Ct.Drawer.Close,fr=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));fr.displayName=Ct.Drawer.Overlay.displayName;const Hs=i.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=i.useContext(Ks),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Us,{children:[n.jsx(fr,{}),n.jsxs(Ct.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",l[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});Hs.displayName="DrawerContent";function Ys({className:t,...e}){return n.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Ys.displayName="DrawerHeader";function Xs({className:t,...e}){return n.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Xs.displayName="DrawerFooter";const Ws=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ws.displayName=Ct.Drawer.Title.displayName;const Js=i.forwardRef(({className:t,...e},r)=>n.jsx(Ct.Drawer.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));Js.displayName=Ct.Drawer.Description.displayName;const Zs=i.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Mn.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Mn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Zs.displayName=Mn.Root.displayName;function qc({className:t,...e}){return n.jsx(Ln.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Uc=Ln.Panel;function Hc({withHandle:t,className:e,...r}){return n.jsx(Ln.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Yc({...t}){return n.jsx(Fr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Qs=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsxs(De.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(De.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(De.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(De.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Qs.displayName=De.Root.displayName;const ta=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsx(Dn.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Dn.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ta.displayName=Dn.Root.displayName;const Xc=ht.Root,ea=i.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsx(ht.List,{ref:r,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ea.displayName=ht.List.displayName;const na=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Trigger,{ref:r,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));na.displayName=ht.Trigger.displayName;const ra=i.forwardRef(({className:t,...e},r)=>n.jsx(ht.Content,{ref:r,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));ra.displayName=ht.Content.displayName;const oa=i.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));oa.displayName="Textarea";const Wc=(t,e)=>{i.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Jc(t){return{preserveValue:!0,...t}}const sa=(t,e,r={})=>{const o=i.useRef(e);o.current=e;const s=i.useRef(r);s.current=Jc(s.current);const[a,l]=i.useState(()=>o.current),[c,d]=i.useState(!0);return i.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const p=await t();w&&(l(()=>p),d(!1))}})(),()=>{w=!1,s.current.preserveValue||l(()=>o.current)}},[t]),[a,c]},En=()=>!1,Zc=(t,e)=>{const[r]=sa(i.useCallback(async()=>{if(!t)return En;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),En,{preserveValue:!1});i.useEffect(()=>()=>{r!==En&&r()},[r])};function Qc(t){i.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Fr.toast});exports.Alert=Ds;exports.AlertDescription=Os;exports.AlertTitle=Is;exports.Avatar=Yn;exports.AvatarFallback=Xn;exports.AvatarImage=Lo;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ba;exports.BOOK_SELECTOR_STRING_KEYS=Ua;exports.Badge=ce;exports.BookChapterControl=Ga;exports.BookSelectionMode=no;exports.BookSelector=Ha;exports.Button=V;exports.COMMENT_EDITOR_STRING_KEYS=sl;exports.COMMENT_LIST_STRING_KEYS=al;exports.Card=Un;exports.CardContent=Hn;exports.CardDescription=Ao;exports.CardFooter=Po;exports.CardHeader=Io;exports.CardTitle=Oo;exports.ChapterRangeSelector=eo;exports.Checkbox=pn;exports.Checklist=Ic;exports.ComboBox=Je;exports.Command=Pt;exports.CommandEmpty=Se;exports.CommandGroup=At;exports.CommandInput=ue;exports.CommandItem=St;exports.CommandList=Lt;exports.CommentEditor=ol;exports.CommentList=wl;exports.ContextMenu=Lc;exports.ContextMenuCheckboxItem=Vs;exports.ContextMenuContent=Ls;exports.ContextMenuGroup=Vc;exports.ContextMenuItem=$s;exports.ContextMenuLabel=zs;exports.ContextMenuPortal=Fc;exports.ContextMenuRadioGroup=Gc;exports.ContextMenuRadioItem=Fs;exports.ContextMenuSeparator=Gs;exports.ContextMenuShortcut=Bs;exports.ContextMenuSub=zc;exports.ContextMenuSubContent=Ps;exports.ContextMenuSubTrigger=As;exports.ContextMenuTrigger=$c;exports.DataTable=Yo;exports.Drawer=qs;exports.DrawerClose=Kc;exports.DrawerContent=Hs;exports.DrawerDescription=Js;exports.DrawerFooter=Xs;exports.DrawerHeader=Ys;exports.DrawerOverlay=fr;exports.DrawerPortal=Us;exports.DrawerTitle=Ws;exports.DrawerTrigger=Bc;exports.DropdownMenu=ne;exports.DropdownMenuCheckboxItem=Ot;exports.DropdownMenuContent=Kt;exports.DropdownMenuGroup=Jn;exports.DropdownMenuItem=$e;exports.DropdownMenuItemType=Jo;exports.DropdownMenuLabel=Ee;exports.DropdownMenuPortal=$o;exports.DropdownMenuRadioGroup=Fo;exports.DropdownMenuRadioItem=tr;exports.DropdownMenuSeparator=fe;exports.DropdownMenuShortcut=zo;exports.DropdownMenuSub=Vo;exports.DropdownMenuSubContent=Qn;exports.DropdownMenuSubTrigger=Zn;exports.DropdownMenuTrigger=me;exports.ERROR_DUMP_STRING_KEYS=Xo;exports.ERROR_POPOVER_STRING_KEYS=xl;exports.ErrorDump=Wo;exports.ErrorPopover=bl;exports.FOOTNOTE_EDITOR_STRING_KEYS=Ol;exports.Filter=kl;exports.FilterDropdown=vl;exports.Footer=Nl;exports.FootnoteEditor=Il;exports.FootnoteItem=ts;exports.FootnoteList=Ll;exports.INVENTORY_STRING_KEYS=Hl;exports.Input=he;exports.Inventory=Wl;exports.Label=et;exports.MARKER_MENU_STRING_KEYS=Jl;exports.MarkdownRenderer=gl;exports.MarkerMenu=Zl;exports.MoreInfo=yl;exports.MultiSelectComboBox=Zo;exports.NavigationContentSearch=yc;exports.Popover=zt;exports.PopoverAnchor=La;exports.PopoverContent=$t;exports.PopoverTrigger=Gt;exports.Progress=Zs;exports.RadioGroup=ln;exports.RadioGroupItem=Pe;exports.RecentSearches=to;exports.ResizableHandle=Hc;exports.ResizablePanel=Uc;exports.ResizablePanelGroup=qc;exports.ResultsCard=Oc;exports.SCOPE_SELECTOR_STRING_KEYS=uc;exports.ScopeSelector=mc;exports.ScriptureResultsViewer=wc;exports.ScrollGroupSelector=fc;exports.SearchBar=mn;exports.Select=de;exports.SelectContent=te;exports.SelectGroup=Go;exports.SelectItem=gt;exports.SelectLabel=Ko;exports.SelectScrollDownButton=nr;exports.SelectScrollUpButton=er;exports.SelectSeparator=qo;exports.SelectTrigger=Qt;exports.SelectValue=pe;exports.Separator=we;exports.SettingsList=hc;exports.SettingsListHeader=xc;exports.SettingsListItem=gc;exports.SettingsSidebar=hs;exports.SettingsSidebarContentSearch=nc;exports.Sidebar=sr;exports.SidebarContent=ir;exports.SidebarFooter=is;exports.SidebarGroup=en;exports.SidebarGroupAction=cs;exports.SidebarGroupContent=rn;exports.SidebarGroupLabel=nn;exports.SidebarHeader=as;exports.SidebarInput=ss;exports.SidebarInset=ar;exports.SidebarMenu=lr;exports.SidebarMenuAction=ws;exports.SidebarMenuBadge=ds;exports.SidebarMenuButton=wr;exports.SidebarMenuItem=cr;exports.SidebarMenuSkeleton=ps;exports.SidebarMenuSub=us;exports.SidebarMenuSubButton=fs;exports.SidebarMenuSubItem=ms;exports.SidebarProvider=or;exports.SidebarRail=os;exports.SidebarSeparator=ls;exports.SidebarTrigger=rs;exports.Skeleton=tn;exports.Slider=Qs;exports.Sonner=Yc;exports.Spinner=Ms;exports.Switch=ta;exports.TabDropdownMenu=sn;exports.TabFloatingMenu=vc;exports.TabToolbar=bc;exports.Table=ze;exports.TableBody=Be;exports.TableCaption=Ho;exports.TableCell=Wt;exports.TableFooter=Uo;exports.TableHead=ke;exports.TableHeader=Ge;exports.TableRow=Dt;exports.Tabs=Xc;exports.TabsContent=ra;exports.TabsList=ea;exports.TabsTrigger=na;exports.TextField=Ac;exports.Textarea=oa;exports.ToggleGroup=dn;exports.ToggleGroupItem=ye;exports.Toolbar=Rc;exports.Tooltip=kt;exports.TooltipContent=vt;exports.TooltipProvider=bt;exports.TooltipTrigger=It;exports.UiLanguageSelector=Mc;exports.VerticalTabs=pr;exports.VerticalTabsContent=mr;exports.VerticalTabsList=ur;exports.VerticalTabsTrigger=js;exports.badgeVariants=Do;exports.buttonVariants=Qr;exports.cn=m;exports.getBookIdFromUSFM=Ul;exports.getLinesFromUSFM=Kl;exports.getNumberFromUSFM=ql;exports.getStatusForItem=es;exports.getToolbarOSReservedSpaceClassName=Ec;exports.inventoryCountColumn=Gl;exports.inventoryItemColumn=Fl;exports.inventoryStatusColumn=Bl;exports.selectTriggerVariants=Bo;exports.useEvent=Wc;exports.useEventAsync=Zc;exports.useListbox=Mo;exports.usePromise=sa;exports.useRecentSearches=$a;exports.useSidebar=Ke;exports.useStylesheet=Qc;function tw(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}tw(`*, ::before, ::after {
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
