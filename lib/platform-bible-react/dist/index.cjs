"use strict";var da=Object.defineProperty;var wa=(t,e,r)=>e in t?da(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ut=(t,e,r)=>wa(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),vt=require("cmdk"),k=require("lucide-react"),pa=require("clsx"),ua=require("tailwind-merge"),ma=require("@radix-ui/react-dialog"),it=require("@sillsdev/scripture"),N=require("platform-bible-utils"),Ce=require("@radix-ui/react-slot"),ee=require("class-variance-authority"),fa=require("@radix-ui/react-popover"),ha=require("@radix-ui/react-label"),ga=require("@radix-ui/react-radio-group"),x=require("lexical"),zr=require("@radix-ui/react-tooltip"),En=require("@lexical/rich-text"),vr=require("react-dom"),xa=require("@lexical/table"),ba=require("@radix-ui/react-toggle-group"),va=require("@radix-ui/react-toggle"),Gr=require("@lexical/headless"),ya=require("@radix-ui/react-separator"),ja=require("@radix-ui/react-avatar"),Br=require("@radix-ui/react-dropdown-menu"),ft=require("@tanstack/react-table"),Na=require("@radix-ui/react-select"),ka=require("markdown-to-jsx"),Et=require("@eten-tech-foundation/platform-editor"),_a=require("@radix-ui/react-checkbox"),Ca=require("@radix-ui/react-tabs"),Sa=require("@radix-ui/react-menubar"),Ea=require("react-hotkeys-hook"),Ra=require("@radix-ui/react-context-menu"),Mt=require("vaul"),Ta=require("@radix-ui/react-progress"),Ma=require("react-resizable-panels"),Kr=require("sonner"),Da=require("@radix-ui/react-slider"),Ia=require("@radix-ui/react-switch");function dt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Tt=dt(ma),Ne=dt(fa),qr=dt(ha),Ae=dt(ga),ce=dt(zr),ln=dt(ba),Ur=dt(va),Hr=dt(ya),Se=dt(ja),nt=dt(Br),st=dt(Na),Rn=dt(_a),yt=dt(Ca),rt=dt(Sa),ot=dt(Ra),Tn=dt(Ta),Pn=dt(Ma),De=dt(Da),Mn=dt(Ia),Oa=ua.extendTailwindMerge({prefix:"tw-"});function m(...t){return Oa(pa.clsx(t))}const Aa="layoutDirection";function pt(){const t=localStorage.getItem(Aa);return t==="rtl"?t:"ltr"}const Pa=Tt.Root,La=Tt.Portal,Yr=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Yr.displayName=Tt.Overlay.displayName;const Xr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=pt();return n.jsxs(La,{children:[n.jsx(Yr,{}),n.jsxs(Tt.Content,{ref:o,className:m("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(Tt.Close,{className:m("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Xr.displayName=Tt.Content.displayName;function Wr({className:t,...e}){return n.jsx("div",{className:m("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Wr.displayName="DialogHeader";const Jr=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Jr.displayName=Tt.Title.displayName;const $a=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));$a.displayName=Tt.Description.displayName;const Ft=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command,{ref:r,className:m("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Ft.displayName=vt.Command.displayName;const me=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(vt.Command.Input,{ref:r,className:m("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});me.displayName=vt.Command.Input.displayName;const zt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.List,{ref:r,className:m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));zt.displayName=vt.Command.List.displayName;const Ee=l.forwardRef((t,e)=>n.jsx(vt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));Ee.displayName=vt.Command.Empty.displayName;const Vt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Group,{ref:r,className:m("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Vt.displayName=vt.Command.Group.displayName;const Zr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Separator,{ref:r,className:m("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Zr.displayName=vt.Command.Separator.displayName;const Dt=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Command.Item,{ref:r,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Dt.displayName=vt.Command.Item.displayName;function Qr({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Qr.displayName="CommandShortcut";const to=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"Old Testament";case N.Section.NT:return r??"New Testament";case N.Section.DC:return o??"Deuterocanon";case N.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Va=(t,e,r,o,s)=>{switch(t){case N.Section.OT:return e??"OT";case N.Section.NT:return r??"NT";case N.Section.DC:return o??"DC";case N.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ye(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??it.Canon.bookIdToEnglishName(t)}function Ln(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const eo=it.Canon.allBookIds.filter(t=>!it.Canon.isObsolete(it.Canon.bookIdToNumber(t))),le=Object.fromEntries(eo.map(t=>[t,it.Canon.bookIdToEnglishName(t)]));function $n(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=it.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(N.includes(s.toLowerCase(),o)||N.includes(t.toLowerCase(),o)||(i?N.includes(i.localizedName.toLowerCase(),o)||N.includes(i.localizedId.toLowerCase(),o):!1))}const no=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),u=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(t)},f=l.useMemo(()=>ye(t,c),[t,c]),g=l.useMemo(()=>Ln(t,c),[t,c]);return n.jsx("div",{className:m("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===N.Section.OT,"tw-border-s-purple-200":s===N.Section.NT,"tw-border-s-indigo-200":s===N.Section.DC,"tw-border-s-amber-200":s===N.Section.Extra}),children:n.jsxs(Dt,{ref:d,value:w||`${t} ${it.Canon.bookIdToEnglishName(t)}`,onSelect:u,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${it.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:f}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Vn=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),F=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},i)=>{const a=o?Ce.Slot:"button";return n.jsx(a,{className:m(Vn({variant:e,size:r,className:t})),ref:i,...s})});F.displayName="Button";const qt=Ne.Root,Ut=Ne.Trigger,Fa=Ne.Anchor,Gt=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},s)=>{const i=pt();return n.jsx(Ne.Portal,{children:n.jsx(Ne.Content,{ref:s,align:e,sideOffset:r,className:m("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Gt.displayName=Ne.Content.displayName;function Dn(t,e,r){return`${t} ${le[t]}${e?` ${Ln(t,e)} ${ye(t,e)}`:""}${r?` ${r}`:""}`}function ro({recentSearches:t,onSearchItemSelect:e,renderItem:r=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:c}){const[w,d]=l.useState(!1);if(t.length===0)return;const p=u=>{e(u),d(!1)};return n.jsxs(qt,{open:w,onOpenChange:d,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(F,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Gt,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Ft,{children:n.jsx(zt,{children:n.jsx(Vt,{heading:i,children:t.map(u=>n.jsxs(Dt,{onSelect:()=>p(u),className:m("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function za(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(c=>!r(c,s)),a=[s,...i.slice(0,o-1)];e(a)}}const hn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ga=[hn.BOOK_ONLY,hn.BOOK_CHAPTER,hn.BOOK_CHAPTER_VERSE];function yr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Pt(t){return N.getChaptersForBook(it.Canon.bookIdToNumber(t))}function Ba(t,e,r){if(!t.trim()||e.length===0)return;const o=Ga.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[c,w=void 0,d=void 0]=a.slice(1);let p;const u=e.filter(h=>$n(h,c,r));if(u.length===1&&([p]=u),!p&&w){if(it.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,f])=>f.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&w){const f=(g=>Object.keys(le).find(v=>le[v].toLowerCase()===g.toLowerCase()))(c);if(f&&e.includes(f)&&(p=f),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>Pt(p)&&(h=Math.max(Pt(p),1));const f=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:f}}}},void 0);if(o)return o}function Ka(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(Pt(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{const w=Pt(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===Pt(t.book)||Pt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,a,c,i])}function jr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Vt,{children:n.jsx("div",{className:m("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:Pt(t)},(a,c)=>c+1).map(a=>n.jsx(Dt,{value:`${t} ${le[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:m("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function qa({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:c,id:w}){const d=pt(),[p,u]=l.useState(!1),[h,f]=l.useState(""),[g,v]=l.useState(""),[b,y]=l.useState("books"),[j,C]=l.useState(void 0),[_,z]=l.useState(!1),V=l.useRef(void 0),R=l.useRef(void 0),A=l.useRef(void 0),S=l.useRef(void 0),E=l.useRef({}),L=l.useCallback(T=>{e(T),c&&c(T)},[e,c]),$=l.useMemo(()=>o?o():eo,[o]),I=l.useMemo(()=>({[N.Section.OT]:$.filter(H=>it.Canon.isBookOT(H)),[N.Section.NT]:$.filter(H=>it.Canon.isBookNT(H)),[N.Section.DC]:$.filter(H=>it.Canon.isBookDC(H)),[N.Section.Extra]:$.filter(H=>it.Canon.extraBooks().includes(H))}),[$]),O=l.useMemo(()=>Object.values(I).flat(),[I]),K=l.useMemo(()=>{if(!g.trim())return I;const T={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return[N.Section.OT,N.Section.NT,N.Section.DC,N.Section.Extra].forEach(tt=>{T[tt]=I[tt].filter(et=>$n(et,g,s))}),T},[I,g,s]),D=l.useMemo(()=>Ba(g,O,s),[g,O,s]),X=l.useCallback(()=>{D&&(L({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),u(!1),v(""),f(""))},[L,D]),G=l.useCallback(T=>{if(Pt(T)<=1){L({book:T,chapterNum:1,verseNum:1}),u(!1),v("");return}C(T),y("chapters")},[L]),B=l.useCallback(T=>{const H=b==="chapters"?j:D==null?void 0:D.book;H&&(L({book:H,chapterNum:T,verseNum:1}),u(!1),y("books"),C(void 0),v(""))},[L,b,j,D]),lt=l.useCallback(T=>{L(T),u(!1),v("")},[L]),Y=Ka(t,O,d,e),q=l.useCallback(()=>{y("books"),C(void 0),setTimeout(()=>{R.current&&R.current.focus()},0)},[]),P=l.useCallback(T=>{if(!T&&b==="chapters"){q();return}u(T),T&&(y("books"),C(void 0),v(""))},[b,q]),{otLong:U,ntLong:W,dcLong:Z,extraLong:at}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},jt=l.useCallback(T=>to(T,U,W,Z,at),[U,W,Z,at]),ht=l.useCallback(T=>D?!!D.chapterNum&&!T.toString().includes(D.chapterNum.toString()):!1,[D]),Nt=l.useMemo(()=>N.formatScrRef(t,s?ye(t.book,s):"English"),[t,s]),qe=l.useCallback(T=>H=>{E.current[T]=H},[]),xe=l.useCallback(T=>{(T.key==="Home"||T.key==="End")&&T.stopPropagation()},[]),re=l.useCallback(T=>{if(T.ctrlKey)return;const{isLetter:H,isDigit:tt}=yr(T.key);if(b==="chapters"){if(T.key==="Backspace"){T.preventDefault(),T.stopPropagation(),q();return}if(H||tt){if(T.preventDefault(),T.stopPropagation(),y("books"),C(void 0),tt&&j){const et=le[j];v(`${et} ${T.key}`)}else v(T.key);setTimeout(()=>{R.current&&R.current.focus()},0);return}}if((b==="chapters"||b==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(T.key)){const et=b==="chapters"?j:D==null?void 0:D.book;if(!et)return;const wt=(()=>{if(!h)return 1;const oe=h.match(/(\d+)$/);return oe?parseInt(oe[1],10):0})(),Kt=Pt(et);if(!Kt)return;let gt=wt;const Ue=6;switch(T.key){case"ArrowLeft":wt!==0&&(gt=wt>1?wt-1:Kt);break;case"ArrowRight":wt!==0&&(gt=wt<Kt?wt+1:1);break;case"ArrowUp":gt=wt===0?Kt:Math.max(1,wt-Ue);break;case"ArrowDown":gt=wt===0?1:Math.min(Kt,wt+Ue);break;default:return}gt!==wt&&(T.preventDefault(),T.stopPropagation(),f(Dn(et,s,gt)),setTimeout(()=>{const oe=E.current[gt];oe&&oe.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,D,q,j,h,s]),fn=l.useCallback(T=>{if(T.shiftKey||T.key==="Tab"||T.key===" ")return;const{isLetter:H,isDigit:tt}=yr(T.key);(H||tt)&&(T.preventDefault(),v(et=>et+T.key),R.current.focus(),z(!1))},[]);return l.useLayoutEffect(()=>{const T=setTimeout(()=>{if(p&&b==="books"&&A.current&&S.current){const H=A.current,tt=S.current,et=tt.offsetTop,wt=H.clientHeight,Kt=tt.clientHeight,gt=et-wt/2+Kt/2;H.scrollTo({top:Math.max(0,gt),behavior:"smooth"}),f(Dn(t.book))}},0);return()=>{clearTimeout(T)}},[p,b,g,D,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&j){const T=j===t.book;setTimeout(()=>{if(A.current)if(T){const H=E.current[t.chapterNum];H&&H.scrollIntoView({block:"center",behavior:"smooth"})}else A.current.scrollTo({top:0});V.current&&V.current.focus()},0)}},[b,j,D,t.book,t.chapterNum]),n.jsxs(qt,{open:p,onOpenChange:P,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(F,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:m("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Nt})})}),n.jsx(Gt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Ft,{ref:V,onKeyDown:re,loop:!0,value:h,onValueChange:f,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(me,{ref:R,value:g,onValueChange:v,onKeyDown:xe,onFocus:()=>z(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(ro,{recentSearches:a,onSearchItemSelect:lt,renderItem:T=>N.formatScrRef(T,"English"),getItemKey:T=>`${T.book}-${T.chapterNum}-${T.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:Y.map(({onClick:T,disabled:H,title:tt,icon:et})=>n.jsx(F,{variant:"ghost",size:"sm",onClick:()=>{z(!0),T()},disabled:H,className:"tw-h-10 tw-w-4 tw-p-0",title:tt,onKeyDown:fn,children:n.jsx(et,{})},tt))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:q,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),j&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ye(j,s)})]}),!_&&n.jsxs(zt,{ref:A,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(K).map(([T,H])=>{if(H.length!==0)return n.jsx(Vt,{heading:jt(T),children:H.map(tt=>n.jsx(no,{bookId:tt,onSelect:et=>G(et),section:N.getSectionForBook(tt),commandValue:`${tt} ${le[tt]}`,ref:tt===t.book?S:void 0,localizedBookNames:s},tt))},T)}),D&&n.jsx(Vt,{children:n.jsx(Dt,{value:`${D.book} ${le[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:X,className:"tw-font-semibold tw-text-primary",children:N.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?Ln(D.book,s):void 0)},"top-match")}),D&&Pt(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ye(D.book,s)}),n.jsx(jr,{bookId:D.book,scrRef:t,onChapterSelect:B,setChapterRef:qe,isChapterDimmed:ht,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&j&&n.jsx(jr,{bookId:j,scrRef:t,onChapterSelect:B,setChapterRef:qe,className:"tw-p-4"})]})]})})]})}const Ua=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ha=ee.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ct=l.forwardRef(({className:t,...e},r)=>n.jsx(qr.Root,{ref:r,className:m("pr-twp",Ha(),t),...e}));ct.displayName=qr.Root.displayName;const cn=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(Ae.Root,{className:m("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});cn.displayName=Ae.Root.displayName;const Pe=l.forwardRef(({className:t,...e},r)=>n.jsx(Ae.Item,{ref:r,className:m("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ae.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Pe.displayName=Ae.Item.displayName;function Ya(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Ze({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:a=()=>{},getOptionLabel:c=Ya,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:f="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:b,...y}){const[j,C]=l.useState(!1),_=w??c,z=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],V=(R,A)=>{const S=c(R),E=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,L=`${A??""}${S}${E??""}`;return n.jsxs(Dt,{value:S,onSelect:()=>{a(R),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||c(i)!==S})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[S,E&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",E]})]})]},L)};return n.jsxs(qt,{open:j,onOpenChange:C,...y,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(F,{variant:f,role:"combobox","aria-expanded":j,"aria-label":b,id:t,className:m("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?_(i):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Gt,{align:g,className:m("tw-w-[200px] tw-p-0",s),children:n.jsxs(Ft,{children:[n.jsx(me,{placeholder:u,className:"tw-text-inherit"}),n.jsx(Ee,{children:h}),n.jsx(zt,{children:z(e)?e.map(R=>n.jsx(Vt,{heading:R.groupHeading,children:R.options.map(A=>V(A,R.groupHeading))},R.groupHeading)):e.map(R=>V(R))})]})})]})}function oo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=l.useMemo(()=>Array.from({length:i},(d,p)=>p+1),[i]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(ct,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Ze,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(ct,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Ze,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var so=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(so||{});const Xa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),gn=(t,e)=>t[e]??e;function Wa({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=gn(d,"%webView_bookSelector_currentBook%"),u=gn(d,"%webView_bookSelector_choose%"),h=gn(d,"%webView_bookSelector_chooseBooks%"),[f,g]=l.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(cn,{className:"pr-twp tw-flex",value:f,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"current book"}),n.jsx(ct,{className:"tw-ms-1",children:p})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(oo,{isDisabled:f==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:a,chapterCount:s,startChapter:c,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{value:"choose books"}),n.jsx(ct,{className:"tw-ms-1",children:h})]}),n.jsx(ct,{className:"tw-flex tw-items-center",children:o.map(b=>it.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(F,{disabled:f==="current book",onClick:()=>r(),children:u})]})]})})}const ao=l.createContext(null);function Ja(t,e){return{getTheme:function(){return e??null}}}function Bt(){const t=l.useContext(ao);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const io=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Za=io?l.useLayoutEffect:l.useEffect,He={tag:x.HISTORY_MERGE_TAG};function Qa({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:c,html:w}=t,d=Ja(null,o),p=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:i,onError:u=>a(u,p),theme:o});return function(u,h){if(h!==null){if(h===void 0)u.update(()=>{const f=x.$getRoot();if(f.isEmpty()){const g=x.$createParagraphNode();f.append(g);const v=io?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===u.getRootElement())&&g.select()}},He);else if(h!==null)switch(typeof h){case"string":{const f=u.parseEditorState(h);u.setEditorState(f,He);break}case"object":u.setEditorState(h,He);break;case"function":u.update(()=>{x.$getRoot().isEmpty()&&h(u)},He)}}}(p,c),[p,d]},[]);return Za(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(ao.Provider,{value:r,children:e})}const ti=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ei({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Bt();return ti(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:c,tags:w})=>{e&&i.size===0&&a.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const Fn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},xt=ce.Provider,_t=ce.Root,Ct=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(ce.Trigger,{ref:o,className:e?m(Vn({variant:e}),t):t,...r}));Ct.displayName=ce.Trigger.displayName;const bt=l.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(ce.Portal,{children:n.jsx(ce.Content,{ref:o,sideOffset:e,className:m("pr-twp tw-z-[250] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}));bt.displayName=ce.Content.displayName;const zn=[En.HeadingNode,x.ParagraphNode,x.TextNode,En.QuoteNode],ni=l.createContext(null),xn={didCatch:!1,error:null};class ri extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=xn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(xn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&oi(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(xn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let c=e;if(i){const w={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw a}return l.createElement(ni.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},c)}}function oi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function si({children:t,onError:e}){return n.jsx(ri,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ai=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function ii(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function li(){return function(t){const[e]=Bt(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),i=l.useRef(o);return ai(()=>{const{initialValueFn:a,subscribe:c}=r,w=a();return i.current!==w&&(i.current=w,s(w)),c(d=>{i.current=d,s(d)})},[r,t]),o}(ii)}function ci(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),c=s.getNode(),w=i.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[u,h]=x.$getCharacterOffsets(t),f=c.is(w),g=e.is(a?w:c),v=e.is(a?c:w);let b,y=0;f?(y=u>h?h:u,b=u>h?u:h):g?(y=a?h:u,b=void 0):v&&(y=0,b=a?u:h);const j=e.__text.slice(y,b);j!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=j)}}return e}function di(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const lo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,wi=lo&&"documentMode"in document?document.documentMode:null;!(!lo||!("InputEvent"in window)||wi)&&"getTargetRanges"in new window.InputEvent("input");function Nr(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||di(4,t.__key),e}const pi=Symbol.for("preact-signals");function dn(){if(Wt>1)return void Wt--;let t,e=!1;for(;Ie!==void 0;){let r=Ie;for(Ie=void 0,In++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&co(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(In=0,Wt--,e)throw t}function ui(t){if(Wt>0)return t();Wt++;try{return t()}finally{dn()}}let J,Ie;function kr(t){const e=J;J=void 0;try{return t()}finally{J=e}}let Wt=0,In=0,We=0;function _r(t){if(J===void 0)return;let e=t.n;return e===void 0||e.t!==J?(e={i:0,S:t,p:J.s,n:void 0,t:J,e:void 0,x:void 0,r:e},J.s!==void 0&&(J.s.n=e),J.s=e,t.n=e,32&J.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=J.s,e.n=void 0,J.s.n=e,J.s=e),e):void 0}function mt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Le(t,e){return new mt(t,e)}function co(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Cr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function wo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ae(t,e){mt.call(this,void 0),this.x=t,this.s=void 0,this.g=We-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function mi(t,e){return new ae(t,e)}function po(t){const e=t.u;if(t.u=void 0,typeof e=="function"){Wt++;const r=J;J=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Gn(t),o}finally{J=r,dn()}}}function Gn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,po(t)}function fi(t){if(J!==this)throw new Error("Out-of-order effect");wo(this),J=t,this.f&=-2,8&this.f&&Gn(this),dn()}function ve(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function Zt(t,e){const r=new ve(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function wn(t,e={}){const r={};for(const o in t){const s=e[o],i=Le(s===void 0?t[o]:s);r[o]=i}return r}mt.prototype.brand=pi,mt.prototype.h=function(){return!0},mt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:kr(()=>{var r;(r=this.W)==null||r.call(this)}))},mt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&kr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},mt.prototype.subscribe=function(t){return Zt(()=>{const e=this.value,r=J;J=void 0;try{t(e)}finally{J=r}},{name:"sub"})},mt.prototype.valueOf=function(){return this.value},mt.prototype.toString=function(){return this.value+""},mt.prototype.toJSON=function(){return this.value},mt.prototype.peek=function(){const t=J;J=void 0;try{return this.value}finally{J=t}},Object.defineProperty(mt.prototype,"value",{get(){const t=_r(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(In>100)throw new Error("Cycle detected");this.v=t,this.i++,We++,Wt++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{dn()}}}}),ae.prototype=new mt,ae.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===We))return!0;if(this.g=We,this.f|=1,this.i>0&&!co(this))return this.f&=-2,!0;const t=J;try{Cr(this),J=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return J=t,wo(this),this.f&=-2,!0},ae.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}mt.prototype.S.call(this,t)},ae.prototype.U=function(t){if(this.t!==void 0&&(mt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ae.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=_r(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),ve.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},ve.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,po(this),Cr(this),Wt++;const t=J;return J=this,fi.bind(this,t)},ve.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ie,Ie=this)},ve.prototype.d=function(){this.f|=8,1&this.f||Gn(this)},ve.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>wn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Zt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function uo(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function mo(t,e=uo){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>wn(e),config:x.safeCast({$onClear:uo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Zt(()=>mo(t,o.value))}});function hi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}function fo(t,e){let r;return Le(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const On=x.defineExtension({build:t=>fo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function Q(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function ho(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=ho(r[s],o[s]);return t}return e}const Bn=0,An=1,go=2,bn=3,Ye=4,be=5,vn=6,Te=7;function yn(t){return t.id===Bn}function xo(t){return t.id===go}function gi(t){return function(e){return e.id===An}(t)||Q(305,String(t.id),String(An)),Object.assign(t,{id:go})}const xi=new Set;class bi{constructor(e,r){ut(this,"builder");ut(this,"configs");ut(this,"_dependency");ut(this,"_peerNameSet");ut(this,"extension");ut(this,"state");ut(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Bn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;xo(r)||Q(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(c,w,d){return Object.assign(c,{config:w,id:bn,registerState:d})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Ye,initResult:w,registerState:d})}(i,a,s)}build(e){const r=this.state;let o;r.id!==Ye&&Q(307,String(r.id),String(be)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,c){return Object.assign(i,{id:be,output:a,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==be&&Q(308,String(o.id),String(be));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:vn})}(o),()=>{const i=this.state;i.id!==Te&&Q(309,String(o.id),String(Te)),this.state=function(a){return Object.assign(a,{id:be})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==vn&&Q(310,String(r.id),String(vn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Te})}(r),o}getSignal(){return this._signal===void 0&&Q(311),this._signal}getInitResult(){this.extension.init===void 0&&Q(312,this.extension.name);const e=this.state;return function(r){return r.id>=Ye}(e)||Q(313,String(e.id),String(Ye)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=bn}(e)||Q(314,String(e.id),String(bn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Q(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Q(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Te}(e)||Q(316,String(e.id),String(Te)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||xi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=be})(e)||Q(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Sr={tag:x.HISTORY_MERGE_TAG};function vi(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const yi=x.defineExtension({config:x.safeCast({setOptions:Sr,updateOptions:Sr}),init:({$initialEditorState:t=vi})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Er=Symbol.for("@lexical/extension/LexicalBuilder");function Rr(){}function ji(t){throw t}function Xe(t){return Array.isArray(t)?t:[t]}const jn="0.40.0+prod.esm";class Oe{constructor(e){ut(this,"roots");ut(this,"extensionNameMap");ut(this,"outgoingConfigEdges");ut(this,"incomingEdges");ut(this,"conflicts");ut(this,"_sortedExtensionReps");ut(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=jn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Xe(yi)];for(const o of e)r.push(Xe(o));return new Oe(r)}static maybeFromEditor(e){const r=e[Er];return r&&(r.PACKAGE_VERSION!==jn&&Q(292,r.PACKAGE_VERSION,jn),r instanceof Oe||Q(293)),r}static fromEditor(e){const r=Oe.maybeFromEditor(e);return r===void 0&&Q(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[Er]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=Rr;function r(){try{e()}finally{e=Rr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&Q(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&Q(296);const r=Xe(e),[o]=r;typeof o.name!="string"&&Q(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&Q(298,o.name),!s){s=new bi(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&Q(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&Q(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const c=Xe(a);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[a,c]of o.peerDependencies||[])this.addEdge(o.name,a,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(xo(i))return;const a=o.extension.name;var c;yn(i)||Q(300,a,s||"[unknown]"),yn(c=i)||Q(304,String(c.id),String(Bn)),i=Object.assign(c,{id:An}),o.state=i;const w=this.outgoingConfigEdges.get(a);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,a)}i=gi(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())yn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const c of i)a.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&Q(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const c=a.register(e,i);c&&s.push(c)}for(const a of r){const c=a.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},c=this.sortedExtensionReps();for(const p of c){const{extension:u}=p;if(u.onError!==void 0&&(e.onError=u.onError),u.disableEvents!==void 0&&(e.disableEvents=u.disableEvents),u.parentEditor!==void 0&&(e.parentEditor=u.parentEditor),u.editable!==void 0&&(e.editable=u.editable),u.namespace!==void 0&&(e.namespace=u.namespace),u.$initialEditorState!==void 0&&(e.$initialEditorState=u.$initialEditorState),u.nodes)for(const h of hi(u)){if(typeof h!="function"){const f=o.get(h.replace);f&&Q(302,u.name,h.replace.name,f.extension.name),o.set(h.replace,p)}r.add(h)}if(u.html){if(u.html.export)for(const[h,f]of u.html.export.entries())s.set(h,f);u.html.import&&Object.assign(i,u.html.import)}u.theme&&ho(a,u.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const w=Object.keys(i).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=ji),e}}const Ni=new Set,Tr=x.defineExtension({build(t,e,r){const o=r.getDependency(On).output,s=Le({watchedNodeKeys:new Map}),i=fo(()=>{},()=>Zt(()=>{const a=i.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,u]of c.entries()){if(u.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),f=h&&h.isSelected()||!1;d=d||f!==(!!a&&a.has(p)),f&&(w=w||new Set,w.add(p))}}),!d&&w&&a&&w.size===a.size||(i.value=w)}));return{watchNodeKey:function(a){const c=mi(()=>(i.value||Ni).has(a)),{watchedNodeKeys:w}=s.peek();let d=w.get(a);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(a,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[On],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class ke extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new ke(e.__key)}static importJSON(e){return bo().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:ki,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function ki(){return{node:bo()}}function bo(){return x.$create(ke)}function _i(t){return t instanceof ke}x.defineExtension({dependencies:[On,Tr],name:"@lexical/extension/HorizontalRule",nodes:()=>[ke],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Tr).output,s=Le({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const c=x.$getNodeFromDOMNode(a.target);if(_i(c))return function(w,d=!1){const p=x.$getSelection(),u=w.isSelected(),h=w.getKey();let f;d&&x.$isNodeSelection(p)?f=p:(f=x.$createNodeSelection(),x.$setSelection(f)),u?f.delete(h):f.add(h)}(c,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(ke,(a,c)=>{ui(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,u]of a.entries())if(u==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),f=t.getElementByKey(p);h?h.domNode.value=f:(w=!0,d.set(p,{domNode:Le(f),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),Zt(()=>{const a=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())a.push(Zt(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,i):x.removeClassNamesFromElement(d,i))}));return x.mergeRegister(...a)}))}});function Ci(t,e){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,r=>{const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;r.preventDefault();const s=function(i){if(i.getNodes().filter(u=>x.$isBlockElementNode(u)&&u.canIndent()).length>0)return!0;const a=i.anchor,c=i.focus,w=c.isBefore(a)?c:a,d=w.getNode(),p=Nr(d);if(p.canIndent()){const u=p.getKey();let h=x.$createRangeSelection();if(h.anchor.set(u,0,"element"),h.focus.set(u,0,"element"),h=x.$normalizeSelection__EXPERIMENTAL(h),h.anchor.is(w))return!0}return!1}(o)?r.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(s,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const r=typeof e=="number"?e:e?e.peek():null;if(r==null)return!1;const o=x.$getSelection();if(!x.$isRangeSelection(o))return!1;const s=o.getNodes().map(i=>Nr(i).getIndent());return Math.max(...s)+1>=r},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>wn(e),config:x.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s}=r.getOutput();return Zt(()=>{if(!o.value)return Ci(t,s)})}});const Si=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ei(){return x.$getRoot().getTextContent()}function Ri(t,e=!0){if(t)return!1;let r=Ei();return e&&(r=r.trim()),r===""}function Ti(t){if(!Ri(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let c=0;c<a;c++){const w=i[o];if(!x.$isTextNode(w))return!1}}}return!0}function vo(t){return()=>Ti(t)}function yo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const c=a.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,u,h,f]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),y=0,j=0;if(x.$isTextNode(b)&&d>=0&&p>=0&&(y=d,j=d+p,g.setTextNodeRange(b,y,b,j)),y===j&&u===""||(g.insertRawText(u),b=v.getNode()),x.$isTextNode(b)){y=h,j=h+f;const C=b.getTextContentSize();y=y>C?C:y,j=j>C?C:j,g.setTextNodeRange(b,y,b,j)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>wn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Zt(()=>r.getOutput().disabled.value?void 0:yo(t))});function Mi(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Kn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Di({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=l.useState(()=>r.getDecorators());return Kn(()=>r.registerDecoratorListener(a=>{vr.flushSync(()=>{i(a)})}),[r]),l.useEffect(()=>{i(r.getDecorators())},[r]),l.useMemo(()=>{const a=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),u=r.getElementByKey(d);u!==null&&a.push(vr.createPortal(p,u,d))}return a},[o,s,r])}(t,e)}function Ii({editor:t,ErrorBoundary:e}){return function(r){const o=Oe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Si.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Mi(320,s);return!0}return!1}(t)?null:n.jsx(Di,{editor:t,ErrorBoundary:e})}function Mr(t){return t.getEditorState().read(vo(t.isComposing()))}function Oi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Bt();return function(s){Kn(()=>x.mergeRegister(En.registerRichText(s),yo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Ai,{content:e}),n.jsx(Ii,{editor:o,ErrorBoundary:r})]})}function Ai({content:t}){const[e]=Bt(),r=function(s){const[i,a]=l.useState(()=>Mr(s));return Kn(()=>{function c(){const w=Mr(s);a(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),i}(e),o=li();return r?typeof t=="function"?t(o):t:null}function Pi({defaultSelection:t}){const[e]=Bt();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Li=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function $i({onClear:t}){const[e]=Bt();return Li(()=>mo(e,t),[e,t]),null}const jo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Vi({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:u,ariaRequired:h,autoCapitalize:f,className:g,id:v,role:b="textbox",spellCheck:y=!0,style:j,tabIndex:C,"data-testid":_,...z},V){const[R,A]=l.useState(t.isEditable()),S=l.useCallback(L=>{L&&L.ownerDocument&&L.ownerDocument.defaultView?t.setRootElement(L):t.setRootElement(null)},[t]),E=l.useMemo(()=>function(...L){return $=>{for(const I of L)typeof I=="function"?I($):I!=null&&(I.current=$)}}(V,S),[S,V]);return jo(()=>(A(t.isEditable()),t.registerEditableListener(L=>{A(L)})),[t]),n.jsx("div",{"aria-activedescendant":R?e:void 0,"aria-autocomplete":R?r:"none","aria-controls":R?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":R&&b==="combobox"?!!a:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":R?u:void 0,"aria-readonly":!R||void 0,"aria-required":h,autoCapitalize:f,className:g,contentEditable:R,"data-testid":_,id:v,ref:E,role:b,spellCheck:y,style:j,tabIndex:C,...z})}const Fi=l.forwardRef(Vi);function Dr(t){return t.getEditorState().read(vo(t.isComposing()))}const zi=l.forwardRef(Gi);function Gi(t,e){const{placeholder:r,...o}=t,[s]=Bt();return n.jsxs(n.Fragment,{children:[n.jsx(Fi,{editor:s,...o,ref:e}),r!=null&&n.jsx(Bi,{editor:s,content:r})]})}function Bi({content:t,editor:e}){const r=function(a){const[c,w]=l.useState(()=>Dr(a));return jo(()=>{function d(){const p=Dr(a);w(p)}return d(),x.mergeRegister(a.registerUpdateListener(()=>{d()}),a.registerEditableListener(()=>{d()}))},[a]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function Ki({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(zi,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const No=l.createContext(void 0);function qi({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(No.Provider,{value:a,children:i})}function ko(){const t=l.useContext(No);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Ui(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(Pa,{open:!0,onOpenChange:r,children:n.jsxs(Xr,{children:[n.jsx(Wr,{children:n.jsx(Jr,{children:i})}),a]})})},[t,r]),s=l.useCallback((i,a,c=!1)=>{e({closeOnClickOutside:c,content:a(r),title:i})},[r]);return[o,s]}function Hi({children:t}){const[e]=Bt(),[r,o]=l.useState(e),[s,i]=l.useState("paragraph"),[a,c]=Ui(),w=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(qi,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:i,showModal:c,children:[a,t({blockType:s})]})}function Yi(t){const[e]=Bt(),{activeEditor:r}=ko();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const _o=ee.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Xi=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(Ur.Root,{ref:s,className:m(_o({variant:e,size:r,className:t})),...o}));Xi.displayName=Ur.Root.displayName;const Co=l.createContext({size:"default",variant:"default"}),pn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},i)=>{const a=pt();return n.jsx(ln.Root,{ref:i,className:m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:a,children:n.jsx(Co.Provider,{value:{variant:e,size:r},children:o})})});pn.displayName=ln.Root.displayName;const je=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},i)=>{const a=l.useContext(Co);return n.jsx(ln.Item,{ref:i,className:m(_o({variant:a.variant||r,size:a.size||o}),t),...s,children:e})});je.displayName=ln.Item.displayName;const Ir=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function Wi(){const{activeEditor:t}=ko(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||xa.$isTableSelection(s)){const i=[];Ir.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(c=>a.includes(c))?i:a)}},[]);return Yi(o),n.jsx(pn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Ir.map(({format:s,icon:i,label:a})=>n.jsx(je,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function Ji({onClear:t}){const[e]=Bt();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Zi({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Hi,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Wi,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Oi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Ki,{placeholder:t})}),ErrorBoundary:si}),e&&n.jsx(Pi,{defaultSelection:"rootEnd"}),n.jsx(Ji,{onClear:r}),n.jsx($i,{})]})]})}const Qi={namespace:"commentEditor",theme:Fn,nodes:zn,onError:t=>{console.error(t)}};function Qe({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:c}){return n.jsx("div",{className:m("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Qa,{initialConfig:{...Qi,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(xt,{children:[n.jsx(Zi,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(ei,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function tl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!Eo.has(i.nodeName)){const a=Ro(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const c=a.getChildren();for(const w of c)a.insertBefore(w);a.remove()}}(s),o}function el(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)So(t,o[s],r,e);return r.innerHTML}function So(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=ci(o,e,"clone"));const c=x.$isElementNode(a)?a.getChildren():[],w=x.getRegisteredNode(t,a.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,a):a.exportDOM(t);const{element:p,after:u}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let f=0;f<c.length;f++){const g=c[f],v=So(t,g,h,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),u){const f=u.call(a,p);f&&(x.isDocumentFragment(p)?p.replaceChildren(f):p.replaceWith(f))}}else r.append(h);return s}const Eo=new Set(["STYLE","SCRIPT"]);function Ro(t,e,r,o,s=new Map,i){let a=[];if(Eo.has(t.nodeName))return a;let c=null;const w=function(g,v){const{nodeName:b}=g,y=v._htmlConversions.get(b.toLowerCase());let j=null;if(y!==void 0)for(const C of y){const _=C(g);_!==null&&(j===null||(j.priority||0)<=(_.priority||0))&&(j=_)}return j!==null?j.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,i),!c)break;c&&a.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const u=t.childNodes;let h=[];const f=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<u.length;g++)h.push(...Ro(u[g],e,r,f,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=nl(t,h,f?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?a=a.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),a}function nl(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const c=e[a];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(i.push(c),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const w=r();w.setFormat(o),w.append(...i),s.push(w),i=[]}}return s}function To(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Mo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Mo(e.children)):!1}function Rt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Mo(t.root.children):!1}function rl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Gr.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=tl(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function tn(t){const e=Gr.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:zn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=el(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function qn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function Je(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Un(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const ol={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Nn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function sl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=l.useState(ol),[a,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),u=l.useRef(null);l.useEffect(()=>{let y=!0;const j=u.current;if(!j)return;const C=setTimeout(()=>{y&&To(j)},300);return()=>{y=!1,clearTimeout(C)}},[]);const h=l.useCallback(()=>{if(!Rt(s))return;const y=tn(s);e(y,a)},[s,e,a]),f=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:v})})]})}),n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Rt(s),children:n.jsx(k.Check,{})})}),n.jsx(bt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(qt,{open:w,onOpenChange:d,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(F,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Nn(a!==void 0?a:"",o)})]})}),n.jsx(Gt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:y=>{y.key==="Escape"&&(y.stopPropagation(),d(!1))},children:n.jsx(Ft,{children:n.jsx(zt,{children:t.map(y=>n.jsx(Dt,{onSelect:()=>{c(y===""?void 0:y),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Nn(y,o)})},y||"unassigned"))})})})]})}),n.jsx("div",{ref:u,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:y=>{y.key==="Escape"?(y.preventDefault(),y.stopPropagation(),r()):Un(y)&&(y.preventDefault(),y.stopPropagation(),Rt(s)&&h())},onKeyDown:y=>{qn(y),(y.key==="Enter"||y.key===" ")&&y.stopPropagation()},children:n.jsx(Qe,{editorSerializedState:s,onSerializedChange:y=>i(y),placeholder:f,onClear:y=>{p.current=y}})})]})}const al=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),il=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],ll=["input","select","textarea","button"],cl=["button","textbox"],Do=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[i,a]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(f=>{a(f);const g=t.find(b=>b.id===f);g&&(e==null||e(g));const v=document.getElementById(f);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",f)},[e,t]),p=l.useCallback(f=>{const g=t.find(v=>v.id===f);g&&(w(v=>v===f?void 0:f),r==null||r(g))},[r,t]),u=f=>{if(!f)return!1;const g=f.tagName.toLowerCase();if(f.isContentEditable||ll.includes(g))return!0;const v=f.getAttribute("role");if(v&&cl.includes(v))return!0;const b=f.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=l.useCallback(f=>{var R;const g=f.target,v=A=>A?document.getElementById(A):void 0,b=v(c),y=v(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&u(g)){if(f.key==="Escape"||f.key==="ArrowLeft"&&!g.isContentEditable){if(c){f.preventDefault(),f.stopPropagation();const A=t.find(S=>S.id===c);A&&d(A.id)}return}if(f.key==="ArrowDown"||f.key==="ArrowUp"){if(!b)return;const A=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(A.length===0)return;const S=A.findIndex(L=>L===g);if(S===-1)return;let E;f.key==="ArrowDown"?E=Math.min(S+1,A.length-1):E=Math.max(S-1,0),E!==S&&(f.preventDefault(),f.stopPropagation(),(R=A[E])==null||R.focus());return}return}const _=t.findIndex(A=>A.id===i);let z=_;switch(f.key){case"ArrowDown":z=Math.min(_+1,t.length-1),f.preventDefault();break;case"ArrowUp":z=Math.max(_-1,0),f.preventDefault();break;case"Home":z=0,f.preventDefault();break;case"End":z=t.length-1,f.preventDefault();break;case" ":case"Enter":i&&p(i),f.preventDefault(),f.stopPropagation();return;case"ArrowRight":{const A=y;if(A){const S=A.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),E=A.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),L=S??E;if(L){f.preventDefault(),L.focus();return}}break}default:f.key.length===1&&!f.metaKey&&!f.ctrlKey&&!f.altKey&&(u(g)||(o==null||o(f.key),f.preventDefault()));return}const V=t[z];V&&d(V.id)},[t,d,i,c,p,o]);return{listboxRef:s,activeId:i,selectedId:c,handleKeyDown:h,focusOption:d}},Io=ee.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),de=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:m("pr-twp",Io({variant:e}),t),...r}));de.displayName="Badge";const Hn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Hn.displayName="Card";const Oo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Oo.displayName="CardHeader";const Ao=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:m("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Ao.displayName="CardTitle";const Po=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:m("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Po.displayName="CardDescription";const Yn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-p-6 tw-pt-0",t),...e}));Yn.displayName="CardContent";const Lo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Lo.displayName="CardFooter";const we=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(Hr.Root,{ref:s,decorative:r,orientation:e,className:m("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));we.displayName=Hr.Root.displayName;const Xn=l.forwardRef(({className:t,...e},r)=>n.jsx(Se.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));Xn.displayName=Se.Root.displayName;const $o=l.forwardRef(({className:t,...e},r)=>n.jsx(Se.Image,{ref:r,className:m("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));$o.displayName=Se.Image.displayName;const Wn=l.forwardRef(({className:t,...e},r)=>n.jsx(Se.Fallback,{ref:r,className:m("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));Wn.displayName=Se.Fallback.displayName;const Jn=l.createContext(void 0);function It(){const t=l.useContext(Jn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Ht=ee.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),fe=nt.Trigger,Zn=nt.Group,Vo=nt.Portal,Fo=nt.Sub,zo=nt.RadioGroup;function ne({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(Jn.Provider,{value:r,children:n.jsx(nt.Root,{...e})})}const Qn=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=It();return n.jsxs(nt.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Ht({variant:i.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Qn.displayName=nt.SubTrigger.displayName;const tr=l.forwardRef(({className:t,...e},r)=>n.jsx(nt.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));tr.displayName=nt.SubContent.displayName;const Yt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const i=pt();return n.jsx(nt.Portal,{children:n.jsx(nt.Content,{ref:s,sideOffset:e,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:i,children:r})})})});Yt.displayName=nt.Content.displayName;const $e=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=pt(),i=It();return n.jsx(nt.Item,{ref:o,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Ht({variant:i.variant})),...r,dir:s})});$e.displayName=nt.Item.displayName;const $t=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=It();return n.jsxs(nt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Ht({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(nt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});$t.displayName=nt.CheckboxItem.displayName;const er=l.forwardRef(({className:t,children:e,...r},o)=>{const s=It();return n.jsxs(nt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Ht({variant:s.variant})),...r,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(nt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});er.displayName=nt.RadioItem.displayName;const Re=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(nt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Re.displayName=nt.Label.displayName;const he=l.forwardRef(({className:t,...e},r)=>n.jsx(nt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));he.displayName=nt.Separator.displayName;function Go({className:t,...e}){return n.jsx("span",{className:m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}Go.displayName="DropdownMenuShortcut";function Or({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[p,u]=l.useState(),h=l.useRef(null);l.useEffect(()=>{if(!w)return;let _=!0;const z=h.current;if(!z)return;const V=setTimeout(()=>{_&&To(z)},300);return()=>{_=!1,clearTimeout(V)}},[w]);const f=l.useCallback(_=>{_&&_.stopPropagation(),d(!1),u(void 0),a==null||a(!1)},[a]),g=l.useCallback(async _=>{if(_&&_.stopPropagation(),!p||!s)return;await s(t.id,tn(p))&&(d(!1),u(void 0),a==null||a(!1))},[p,s,t.id,a]),v=l.useMemo(()=>{const _=new Date(t.date),z=N.formatRelativeDate(_,r["%comment_date_today%"],r["%comment_date_yesterday%"]),V=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return N.formatReplacementString(r["%comment_dateAtTime%"],{date:z,time:V})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),y=l.useMemo(()=>t.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[t.user]),j=l.useMemo(()=>N.sanitizeHtml(t.contents),[t.contents]),C=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs($e,{onClick:_=>{_.stopPropagation(),d(!0),u(rl(t.contents)),a==null||a(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs($e,{onClick:async _=>{_.stopPropagation(),i&&await i(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(Xn,{className:"tw-h-8 tw-w-8",children:n.jsx(Wn,{className:"tw-text-xs tw-font-medium",children:y})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(de,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Je(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),f()):Un(_)&&(_.preventDefault(),_.stopPropagation(),Rt(p)&&g())},onKeyDown:_=>{qn(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},onClick:_=>{_.stopPropagation()},children:[n.jsx(Qe,{className:m('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:_=>u(_)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(F,{size:"icon",onClick:f,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(F,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Rt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:m("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:j}})]})]}),C&&n.jsxs(ne,{children:[n.jsx(fe,{asChild:!0,children:n.jsx(F,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:C})]})]})}const Ar={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function dl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:u,handleUpdateComment:h,handleDeleteComment:f,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:y,canUserResolveThreadCallback:j,canUserEditOrDeleteCommentCallback:C,isRead:_=!1,autoReadDelay:z=5,onVerseRefClick:V}){const[R,A]=l.useState(Ar),[S,E]=l.useState(void 0),L=o,[$,I]=l.useState(!1),[O,K]=l.useState(!1),[D,X]=l.useState(!1),[G,B]=l.useState(!1),[lt,Y]=l.useState(!1),[q,P]=l.useState(_),[U,W]=l.useState(!1),Z=l.useRef(void 0),[at,jt]=l.useState(new Map);l.useEffect(()=>{let M=!0;return(async()=>{const St=j?await j(w):!1;M&&Y(St)})(),()=>{M=!1}},[w,j]),l.useEffect(()=>{let M=!0;if(!o){B(!1),jt(new Map);return}return(async()=>{const St=y?await y(w):!1;M&&B(St)})(),()=>{M=!1}},[o,w,y]);const ht=l.useMemo(()=>e.filter(M=>!M.deleted),[e]);l.useEffect(()=>{let M=!0;if(!o||!C){jt(new Map);return}return(async()=>{const St=new Map;await Promise.all(ht.map(async br=>{const ca=await C(br.id);M&&St.set(br.id,ca)})),M&&jt(St)})(),()=>{M=!1}},[o,ht,C]);const Nt=l.useMemo(()=>ht[0],[ht]),qe=l.useRef(null),xe=l.useRef(void 0),re=l.useCallback(()=>{var M;(M=xe.current)==null||M.call(xe),A(Ar)},[]),fn=l.useCallback(()=>{const M=!q;P(M),W(!M),g==null||g(w,M)},[q,g,w]);l.useEffect(()=>{I(!1)},[o]),l.useEffect(()=>{if(o&&!q&&!U){const M=setTimeout(()=>{P(!0),g==null||g(w,!0)},z*1e3);return Z.current=M,()=>clearTimeout(M)}Z.current&&(clearTimeout(Z.current),Z.current=void 0)},[o,q,U,z,w,g]);const T=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),H=l.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const M=Je(i,r);return N.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:M})},[i,r]),tt=l.useMemo(()=>ht.slice(1),[ht]),et=l.useMemo(()=>tt.length??0,[tt.length]),wt=l.useMemo(()=>et>0,[et]),Kt=l.useMemo(()=>$||et<=2?tt:tt.slice(-2),[tt,et,$]),gt=l.useMemo(()=>$||et<=2?0:et-2,[et,$]),Ue=l.useMemo(()=>et===1?T.singleReply:N.formatReplacementString(T.multipleReplies,{count:et}),[et,T]),oe=l.useMemo(()=>gt===1?T.singleReply:N.formatReplacementString(T.multipleReplies,{count:gt}),[gt,T]);l.useEffect(()=>{!o&&O&&wt&&K(!1)},[o,O,wt]);const gr=l.useCallback(async M=>{M&&M.stopPropagation();const Ot=Rt(R)?tn(R):void 0;if(S!==void 0){await u({threadId:w,contents:Ot,assignedUser:S})&&(E(void 0),Ot&&re());return}Ot&&await u({threadId:w,contents:Ot})&&re()},[re,R,u,S,w]),xr=l.useCallback(async M=>{const Ot=Rt(R)?tn(R):void 0,St=await u({...M,contents:Ot,assignedUser:S??M.assignedUser});return St&&Ot&&re(),St&&S!==void 0&&E(void 0),St},[re,R,u,S]);return n.jsx(Hn,{role:"option","aria-selected":o,id:w,className:m("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&q,"tw-bg-background":o&&p!=="Resolved"&&q,"tw-bg-muted":p==="Resolved","tw-bg-blue-50":!q&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(Yn,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[H&&n.jsx(de,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:H}),n.jsx(F,{variant:"ghost",size:"icon",onClick:M=>{M.stopPropagation(),fn()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":q?"Mark as unread":"Mark as read",children:q?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),lt&&p!=="Resolved"&&n.jsx(F,{variant:"ghost",size:"icon",className:m("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:M=>{M.stopPropagation(),xr({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:qe,className:m("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":L},{"tw-whitespace-nowrap":!L}),children:[s&&V?n.jsx(F,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:M=>{M.stopPropagation(),V(d)},children:s}):s,n.jsxs("span",{className:t,children:[Nt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Nt.selectedText}),Nt.contextAfter]})]})}),n.jsx(Or,{comment:Nt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:xr,handleUpdateComment:h,handleDeleteComment:f,onEditingChange:K,canEditOrDelete:(!O&&at.get(Nt.id))??!1,canUserResolveThread:lt})]}),n.jsxs(n.Fragment,{children:[wt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:Ue})]}),!o&&Rt(R)&&n.jsx(Qe,{editorSerializedState:R,onSerializedChange:M=>A(M),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[gt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:M=>{M.stopPropagation(),I(!0)},role:"button",tabIndex:0,onKeyDown:M=>{(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),M.stopPropagation(),I(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(we,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:oe}),$?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),Kt.map(M=>n.jsx("div",{children:n.jsx(Or,{comment:M,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:f,onEditingChange:K,canEditOrDelete:(!O&&at.get(M.id))??!1})},M.id)),b!==!1&&(!O||Rt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:M=>M.stopPropagation(),onKeyDownCapture:M=>{Un(M)&&(M.preventDefault(),M.stopPropagation(),(Rt(R)||S!==void 0)&&gr())},onKeyDown:M=>{qn(M),(M.key==="Enter"||M.key===" ")&&M.stopPropagation()},children:[n.jsx(Qe,{editorSerializedState:R,onSerializedChange:M=>A(M),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:M=>{xe.current=M}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:N.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Je(S,r)})}),n.jsxs(qt,{open:D,onOpenChange:X,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(F,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!G||!v||v.length===0||!v.includes(a),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Gt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:M=>{M.key==="Escape"&&(M.stopPropagation(),X(!1))},children:n.jsx(Ft,{children:n.jsx(zt,{children:v==null?void 0:v.map(M=>n.jsx(Dt,{onSelect:()=>{E(M!==i?M:void 0),X(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Je(M,r)})},M||"unassigned"))})})})]}),n.jsx(F,{size:"icon",onClick:gr,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Rt(R)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function wl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:f,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[y,j]=l.useState(new Set),[C,_]=l.useState();l.useEffect(()=>{g&&(j(I=>new Set(I).add(g)),_(g))},[g]);const z=r.filter(I=>I.comments.some(O=>!O.deleted)),V=z.map(I=>({id:I.id})),R=l.useCallback(I=>{j(O=>new Set(O).add(I.id)),_(I.id),v==null||v(I.id)},[v]),A=l.useCallback(I=>{const O=y.has(I);j(K=>{const D=new Set(K);return D.has(I)?D.delete(I):D.add(I),D}),_(I),v==null||v(O?void 0:I)},[y,v]),{listboxRef:S,activeId:E,handleKeyDown:L}=Do({options:V,onOptionSelect:R}),$=l.useCallback(I=>{I.key==="Escape"?(C&&y.has(C)&&(j(O=>{const K=new Set(O);return K.delete(C),K}),_(void 0),v==null||v(void 0)),I.preventDefault(),I.stopPropagation()):L(I)},[C,y,L,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":E??void 0,"aria-label":"Comments",className:m("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:$,children:z.map(I=>n.jsx("div",{id:I.id,className:m({"tw-opacity-60":I.status==="Resolved"}),children:n.jsx(dl,{classNameForVerseText:e,comments:I.comments,localizedStrings:s,verseRef:I.verseRef,handleSelectThread:A,threadId:I.id,thread:I,isRead:I.isRead,isSelected:y.has(I.id),currentUser:o,assignedUser:I.assignedUser,threadStatus:I.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:f,onVerseRefClick:b})},I.id))})}function pl({table:t}){return n.jsxs(ne,{children:[n.jsx(Br.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(F,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Yt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Re,{children:"Toggle columns"}),n.jsx(he,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx($t,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const pe=st.Root,Bo=st.Group,ue=st.Value,Ko=ee.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Qt=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const i=pt();return n.jsxs(st.Trigger,{className:m(Ko({size:r,className:t})),ref:s,...o,dir:i,children:[e,n.jsx(st.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Qt.displayName=st.Trigger.displayName;const nr=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollUpButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));nr.displayName=st.ScrollUpButton.displayName;const rr=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollDownButton,{ref:r,className:m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));rr.displayName=st.ScrollDownButton.displayName;const te=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const i=pt();return n.jsx(st.Portal,{children:n.jsxs(st.Content,{ref:s,className:m("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(nr,{}),n.jsx(st.Viewport,{className:m("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(rr,{})]})})});te.displayName=st.Content.displayName;const qo=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Label,{ref:r,className:m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));qo.displayName=st.Label.displayName;const kt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(st.Item,{ref:o,className:m("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(st.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(st.ItemText,{children:e})]}));kt.displayName=st.Item.displayName;const Uo=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Uo.displayName=st.Separator.displayName;function ul({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(pe,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(Qt,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(ue,{placeholder:t.getState().pagination.pageSize})}),n.jsx(te,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(kt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(F,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Pr=`
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
`;function ml(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ve(t,e){const r=e?`${Pr}, ${e}`:Pr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&ml(o))}const Fe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const a=s.current;if(!a)return;const c=()=>{requestAnimationFrame(()=>{Ve(a,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const i=a=>{const{current:c}=s;if(c){if(a.key==="ArrowDown"){a.preventDefault(),Ve(c)[0].focus();return}a.key===" "&&document.activeElement===c&&a.preventDefault()}};return n.jsx("div",{className:m("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:m("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Fe.displayName="Table";const ze=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:m({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));ze.displayName="TableHeader";const Ge=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:m("[&_tr:last-child]:tw-border-0",t),...e}));Ge.displayName="TableBody";const Ho=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));Ho.displayName="TableFooter";function fl(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ve(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function hl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function gl(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Lt=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},i)=>{const a=l.useRef(null);l.useEffect(()=>{typeof i=="function"?i(a.current):i&&"current"in i&&(i.current=a.current)},[i]),fl(a);const c=l.useMemo(()=>a.current?Ve(a.current):[],[a]),w=l.useCallback(p=>{const{current:u}=a;if(!u||!u.parentElement)return;const h=u.closest("table"),f=h?Ve(h).filter(b=>b.tagName==="TR"):[],g=f.indexOf(u),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),gl(f,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),hl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const b=u.closest("table");b&&b.focus()}e==null||e(p)},[a,c,e]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:w,onFocus:d,className:m("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Lt.displayName="TableRow";const _e=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:m("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));_e.displayName="TableHead";const Jt=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Jt.displayName="TableCell";const Yo=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:m("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));Yo.displayName="TableCaption";function en({className:t,...e}){return n.jsx("div",{className:m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Xo({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var V;const[p,u]=l.useState([]),[h,f]=l.useState([]),[g,v]=l.useState({}),[b,y]=l.useState({}),j=l.useMemo(()=>e??[],[e]),C=ft.useReactTable({data:j,columns:t,getCoreRowModel:ft.getCoreRowModel(),...r&&{getPaginationRowModel:ft.getPaginationRowModel()},onSortingChange:u,getSortedRowModel:ft.getSortedRowModel(),onColumnFiltersChange:f,getFilteredRowModel:ft.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:y,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),_=C.getVisibleFlatColumns();let z;return w?z=Array.from({length:10}).map((S,E)=>`skeleton-row-${E}`).map(S=>n.jsx(Lt,{className:"hover:tw-bg-transparent",children:n.jsx(Jt,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(en,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},S)):((V=C.getRowModel().rows)==null?void 0:V.length)>0?z=C.getRowModel().rows.map(R=>n.jsx(Lt,{onClick:()=>a(R,C),"data-state":R.getIsSelected()&&"selected",children:R.getVisibleCells().map(A=>n.jsx(Jt,{children:ft.flexRender(A.column.columnDef.cell,A.getContext())},A.id))},R.id)):z=n.jsx(Lt,{children:n.jsx(Jt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(pl,{table:C}),n.jsxs(Fe,{stickyHeader:i,children:[n.jsx(ze,{stickyHeader:i,children:C.getHeaderGroups().map(R=>n.jsx(Lt,{children:R.headers.map(A=>n.jsx(_e,{className:"tw-p-0",children:A.isPlaceholder?void 0:ft.flexRender(A.column.columnDef.header,A.getContext())},A.id))},R.id))}),n.jsx(Ge,{children:z})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(F,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(F,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(ul,{table:C})]})}function xl({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:m("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(ka,{options:i,children:e})})}const Wo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Lr=(t,e)=>t[e]??e;function Jo({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Lr(r,"%webView_error_dump_header%"),i=Lr(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(F,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const bl=Object.freeze([...Wo,"%webView_error_dump_copied_message%"]);function vl({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,c]=l.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(qt,{onOpenChange:d,children:[n.jsx(Ut,{asChild:!0,children:o}),n.jsxs(Gt,{id:i,className:m("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(ct,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Jo,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var Zo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Zo||{});function yl({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[i,a]=l.useState({}),c=(d,p)=>{const u=!o[d][p];s(f=>(f[d][p]=u,{...f}));const h=r[d].items[p];h.onUpdate(h.id,u)},w=(d,p)=>{a(h=>(h[d]=p,{...h}));const u=r[d].items.find(h=>h.id===p);u?u.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(ne,{children:[n.jsx(fe,{asChild:!0,children:n.jsxs(F,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Yt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Re,{children:d.label}),n.jsx(Zn,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((u,h)=>n.jsx("div",{children:n.jsx($t,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:u.label})},u.id))}):n.jsx(zo,{value:i[p],onValueChange:u=>w(p,u),children:d.items.map(u=>n.jsx("div",{children:n.jsx(er,{value:u.id,children:u.label})},u.id))})}),n.jsx(he,{})]},d.label))})]})})}function jl({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:c}){const w=new N.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,u)=>p+u,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(F,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Nl({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function i(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,u=d.getUTCMonth(),h=d.getUTCDate()-1;let f="";return p>0?f=`${p.toString()} year${p===1?"":"s"} ago`:u>0?f=`${u.toString()} month${u===1?"":"s"} ago`:h===0?f="today":f=`${h.toString()} day${h===1?"":"s"} ago`,f}const a=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:i(c[1].date)})]})]},c[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function kl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=l.useMemo(()=>N.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(N.getCurrentLocale(),{type:"language"});return d.map(u=>p.of(u))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Nl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function Qo({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:u=!1,sortSelected:h=!1,icon:f=void 0,className:g=void 0,variant:v="ghost",id:b}){const[y,j]=l.useState(!1),C=l.useCallback(E=>{var $;const L=($=t.find(I=>I.label===E))==null?void 0:$.value;L&&r(e.includes(L)?e.filter(I=>I!==L):[...e,L])},[t,e,r]),_=()=>w||o,z=l.useMemo(()=>{if(!h)return t;const E=t.filter($=>$.starred).sort(($,I)=>$.label.localeCompare(I.label)),L=t.filter($=>!$.starred).sort(($,I)=>{const O=e.includes($.value),K=e.includes(I.value);return O&&!K?-1:!O&&K?1:$.label.localeCompare(I.label)});return[...E,...L]},[t,e,h]),V=()=>{r(t.map(E=>E.value))},R=()=>{r([])},A=d??y,S=p??j;return n.jsx("div",{id:b,className:g,children:n.jsxs(qt,{open:A,onOpenChange:S,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(F,{variant:v,role:"combobox","aria-expanded":A,className:"tw-group tw-w-full tw-justify-between",disabled:u,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[f&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:f})}),n.jsx("span",{className:m("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Gt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Ft,{children:[n.jsx(me,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:V,children:i}),n.jsx(F,{variant:"ghost",size:"sm",onClick:R,children:a})]}),n.jsxs(zt,{children:[n.jsx(Ee,{children:c}),n.jsx(Vt,{children:z.map(E=>n.jsxs(Dt,{value:E.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:m("tw-h-4 tw-w-4",e.includes(E.value)?"tw-opacity-100":"tw-opacity-0")})}),E.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:E.label}),E.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:E.secondaryLabel})]},E.label))})]})]})})]})})}function _l({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:u}){return n.jsxs("div",{id:u,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Qo,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var f;return n.jsxs(de,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(F,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(f=t.find(g=>g.value===h))==null?void 0:f.label]},h)})}):n.jsx(ct,{children:p})]})}const ts=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),$r=(t,e)=>t[e]??e;function es({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={}}){return n.jsxs(n.Fragment,{children:[n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{"aria-label":"Undo",onClick:t,disabled:!r,size:"icon",variant:"ghost",children:n.jsx(k.Undo,{})})}),n.jsx(bt,{children:n.jsx("p",{children:$r(s,"%undoButton_tooltip%")})})]})}),e&&n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{"aria-label":"Redo",onClick:e,disabled:!o,size:"icon",variant:"ghost",children:n.jsx(k.Redo,{})})}),n.jsx(bt,{children:n.jsx("p",{children:$r(s,"%redoButton_tooltip%")})})]})})]})}const ge=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:m("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ge.displayName="Input";const Cl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Sl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=l.useRef(null),a=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(t),[p,u]=l.useState(r),[h,f]=l.useState(!1);l.useEffect(()=>{d(t)},[t]),l.useEffect(()=>{p!==r&&u(r)},[r]);const g=b=>{c.current=!1,f(b),b||(w!=="custom"||p?(e(w),o(p)):(d(t),u(r)))},v=b=>{var y,j,C,_;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((y=i.current)==null||y.focus(),c.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((j=a.current)==null||j.focus(),c.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((C=i.current)==null?void 0:C.selectionStart)===0&&((_=a.current)==null||_.focus(),c.current=!1),w==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(ne,{open:h,onOpenChange:g,children:[n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(fe,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:Cl(t,s,r)})})}),n.jsx(bt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Yt,{className:"tw-z-[300]",onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Re,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(he,{}),n.jsx($t,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Et.GENERATOR_NOTE_CALLER})]})}),n.jsx($t,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Et.HIDDEN_NOTE_CALLER})]})}),n.jsx($t,{ref:a,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:b=>{var y;b.stopPropagation(),c.current=!0,(y=i.current)==null||y.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ge,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),d("custom"),c.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>u(b.target.value)})]})})]})]})}const El=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Rl=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),N.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Tl({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(ne,{children:[n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(zr.TooltipTrigger,{asChild:!0,children:n.jsx(fe,{asChild:!0,children:n.jsx(F,{variant:"outline",className:"tw-h-6",children:El(t,r)})})}),n.jsx(bt,{children:n.jsx("p",{children:Rl(t,r)})})]})}),n.jsxs(Yt,{className:"tw-z-[300]",children:[n.jsx(Re,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(he,{}),n.jsxs($t,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs($t,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs($t,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}function Ml(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Dl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Il={type:"USJ",version:"3.1",content:[{type:"para"}]};function Ol({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,localizedStrings:c,parentEditorRef:w}){const d=l.useRef(null),p=l.createRef(),[u,h]=l.useState("generated"),[f,g]=l.useState("*"),[v,b]=l.useState("f"),[y,j]=l.useState(!1),[C,_]=l.useState(!0),[z,V]=l.useState(!1),R=l.useRef(!1),A=l.useRef(""),S=l.useMemo(()=>({...a,markerMenuTrigger:a.markerMenuTrigger??"\\",hasExternalUI:!0,view:{...a.view??Et.getDefaultViewOptions(),noteMode:"expanded"}}),[a]);l.useEffect(()=>{var G;(G=d.current)==null||G.focus()}),l.useEffect(()=>{var lt,Y;let G;R.current=!1,_(!0);const B=e==null?void 0:e.at(0);if(B&&Et.isInsertEmbedOpOfType("note",B)){const q=(lt=B.insert.note)==null?void 0:lt.caller;let P="custom";q===Et.GENERATOR_NOTE_CALLER?P="generated":q===Et.HIDDEN_NOTE_CALLER?P="hidden":q&&g(q),h(P),b(((Y=B.insert.note)==null?void 0:Y.style)??"f"),G=setTimeout(()=>{var U;(U=d.current)==null||U.applyUpdate([B])},0)}return()=>{G&&clearTimeout(G)}},[e,i]);const E=l.useCallback((G,B,lt=!1)=>{var q,P,U;const Y=(P=(q=d.current)==null?void 0:q.getNoteOps(0))==null?void 0:P.at(0);if(Y&&Et.isInsertEmbedOpOfType("note",Y)){if(Y.insert.note){let W;G==="custom"?W=B:G==="generated"?W=Et.GENERATOR_NOTE_CALLER:W=Et.HIDDEN_NOTE_CALLER,Y.insert.note.caller=W}r==null||r([Y]),lt&&w&&i&&((U=w.current)==null||U.replaceEmbedUpdate(i,[Y]))}},[i,r,w]),L=l.useCallback(()=>{E(u,f,!0),o()},[u,f,o,E]),$=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useEffect(()=>{($.current.book!==s.book||$.current.chapterNum!==s.chapterNum)&&($.current={book:s.book,chapterNum:s.chapterNum},L())},[L,s.book,s.chapterNum]);const I=()=>{var B;const G=(B=p.current)==null?void 0:B.getElementsByClassName("editor-input")[0];G!=null&&G.textContent&&navigator.clipboard.writeText(G.textContent)},O=l.useCallback(G=>{h(G),E(G,f)},[f,E]),K=l.useCallback(G=>{g(G),E(u,G)},[u,E]),D=G=>{var lt,Y,q,P,U;b(G);const B=(Y=(lt=d.current)==null?void 0:lt.getNoteOps(0))==null?void 0:Y.at(0);if(B&&Et.isInsertEmbedOpOfType("note",B)){B.insert.note&&(B.insert.note.style=G);const W=(P=(q=B.insert.note)==null?void 0:q.contents)==null?void 0:P.ops;v!=="x"&&G==="x"?W==null||W.forEach(Z=>Ml(Z)):v==="x"&&G!=="x"&&(W==null||W.forEach(Z=>Dl(Z))),(U=d.current)==null||U.applyUpdate([B,{delete:1}])}},X=G=>{var lt,Y,q,P,U;const B=(Y=(lt=d.current)==null?void 0:lt.getNoteOps(0))==null?void 0:Y.at(0);if(B&&Et.isInsertEmbedOpOfType("note",B)){G.content.length>1&&setTimeout(()=>{var at;(at=d.current)==null||at.applyUpdate([{retain:2},{delete:1}])},0);const W=(q=B.insert.note)==null?void 0:q.style,Z=(U=(P=B.insert.note)==null?void 0:P.contents)==null?void 0:U.ops;if(W||j(!1),j(W==="x"?!!(Z!=null&&Z.every(at=>{var ht,Nt;if(!((ht=at.attributes)!=null&&ht.char))return!0;const jt=((Nt=at.attributes)==null?void 0:Nt.char).style;return jt==="xt"||jt==="xo"||jt==="xq"})):!!(Z!=null&&Z.every(at=>{var ht,Nt;if(!((ht=at.attributes)!=null&&ht.char))return!0;const jt=((Nt=at.attributes)==null?void 0:Nt.char).style;return jt==="ft"||jt==="fr"||jt==="fq"}))),!R.current){R.current=!0,A.current=JSON.stringify(B),_(!0);return}_(JSON.stringify(B)===A.current),E(u,f)}else j(!1),_(!0)};return n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Tl,{isTypeSwitchable:y,noteType:v,handleNoteTypeChange:D,localizedStrings:c}),n.jsx(Sl,{callerType:u,updateCallerType:O,customCaller:f,updateCustomCaller:K,localizedStrings:c})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(es,{onUndoClick:()=>{var G;return(G=d.current)==null?void 0:G.undo()},onRedoClick:()=>{var G;return(G=d.current)==null?void 0:G.redo()},canUndo:!C,canRedo:z,localizedStrings:c}),n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:L,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(bt,{children:n.jsx("p",{children:c["%footnoteEditor_closeButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:p,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(Et.Editorial,{options:S,onUsjChange:X,onStateChange:G=>V(G.canRedo),defaultUsj:Il,onScrRefChange:()=>{},scrRef:s,ref:d})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:n.jsx(F,{onClick:I,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(bt,{children:n.jsx("p",{children:c["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]})}const Al=Object.freeze(["%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_closeButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%",...ts]);function ns(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Pl(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(a.length>0&&i.push(a),a=[c]):a.push(c)}),a.length>0&&i.push(a),i.map((c,w)=>{const d=w===i.length-1;return n.jsxs("p",{children:[or(t,c,r,!0,s),d&&o]},ns(t,c))})}function or(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const c=m(`usfm_${t}`);return n.jsx("span",{className:c,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return Ll(i,ns(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function Ll(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),or(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function rs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:m("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),u=a&&n.jsxs(n.Fragment,{children:[or(t.marker,[a],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",f=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=m(h,f);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[w,p]}),n.jsx("div",{className:m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:u}),n.jsx("div",{className:m("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:Pl(t.marker,c,o,d)})})]})}function $l({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??N.getFormatCallerFunction(r,void 0),u=(j,C)=>{d==null||d(j,C,s)},h=i?r.findIndex(j=>j===i):-1,[f,g]=l.useState(h),v=(j,C,_)=>{if(r.length)switch(j.key){case"Enter":case" ":j.preventDefault(),d==null||d(C,_,s);break}},b=j=>{if(r.length)switch(j.key){case"ArrowDown":j.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":j.preventDefault(),g(C=>Math.max(C-1,0));break}},y=l.useRef([]);return l.useEffect(()=>{var j;f>=0&&f<y.current.length&&((j=y.current[f])==null||j.focus())},[f]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:f<0?0:-1,className:m("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:m("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((j,C)=>{const _=j===i,z=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:V=>{y.current[C]=V},role:"option","aria-selected":_,"data-marker":j.marker,"data-state":_?"selected":void 0,tabIndex:C===f?0:-1,className:m("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>u(j,C),onKeyDown:V=>v(V,j,C),children:n.jsx(rs,{footnote:j,layout:o,formatCaller:()=>p(j.caller,C),showMarkers:a})},z),C<r.length-1&&o==="vertical"&&n.jsx(we,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Vl(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Fl({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=l.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(Fe,{stickyHeader:!0,children:[n.jsx(ze,{stickyHeader:!0,children:n.jsxs(Lt,{children:[n.jsx(_e,{children:s}),n.jsx(_e,{children:i})]})}),n.jsx(Ge,{children:a.length>0&&a.map(c=>n.jsxs(Lt,{onClick:()=>{e(c.reference)},children:[n.jsx(Jt,{children:N.formatScrRef(c.reference,"English")}),n.jsx(Jt,{className:o,children:Vl(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const un=l.forwardRef(({className:t,...e},r)=>n.jsx(Rn.Root,{ref:r,className:m("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Rn.Indicator,{className:m("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));un.displayName=Rn.Root.displayName;const zl=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Be=(t,e,r)=>n.jsx(xt,{children:n.jsxs(_t,{children:[n.jsxs(Ct,{className:m("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),zl(t.getIsSorted())]}),n.jsx(bt,{side:"bottom",children:e})]})}),Gl=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Be(e,t)}),Bl=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Be(r,t)}),Kl=t=>({accessorKey:"count",header:({column:e})=>Be(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),kn=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(w=>{e==="approved"?a.includes(w)||a.push(w):a=a.filter(d=>d!==w)}),o(a);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),i(c)},ql=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Be(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),c=i.getValue("item");return n.jsxs(pn,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(je,{onClick:w=>{w.stopPropagation(),kn([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(je,{onClick:w=>{w.stopPropagation(),kn([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(je,{onClick:w=>{w.stopPropagation(),kn([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),Ul=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Hl=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Yl=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},os=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Xl=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Wl=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Jl=(t,e,r)=>t.map(o=>{const s=N.isString(o.key)?o.key:o.key[0];return{items:N.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||os(s,e,r),occurrences:o.occurrences||[]}}),At=(t,e)=>t[e]??e;function Zl({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:u,onItemSelected:h}){const f=At(r,"%webView_inventory_all%"),g=At(r,"%webView_inventory_approved%"),v=At(r,"%webView_inventory_unapproved%"),b=At(r,"%webView_inventory_unknown%"),y=At(r,"%webView_inventory_scope_currentBook%"),j=At(r,"%webView_inventory_scope_chapter%"),C=At(r,"%webView_inventory_scope_verse%"),_=At(r,"%webView_inventory_filter_text%"),z=At(r,"%webView_inventory_show_additional_items%"),V=At(r,"%webView_inventory_no_results%"),[R,A]=l.useState(!1),[S,E]=l.useState("all"),[L,$]=l.useState(""),[I,O]=l.useState([]),K=l.useMemo(()=>{const P=t??[];return P.length===0?[]:Jl(P,s,i)},[t,s,i]),D=l.useMemo(()=>{if(R)return K;const P=[];return K.forEach(U=>{const W=U.items[0],Z=P.find(at=>at.items[0]===W);Z?(Z.count+=U.count,Z.occurrences=Z.occurrences.concat(U.occurrences)):P.push({items:[W],count:U.count,occurrences:U.occurrences,status:U.status})}),P},[R,K]),X=l.useMemo(()=>D.length===0?[]:Wl(D,S,L),[D,S,L]),G=l.useMemo(()=>{var W,Z;if(!R)return w;const P=(W=o==null?void 0:o.tableHeaders)==null?void 0:W.length;if(!P)return w;const U=[];for(let at=0;at<P;at++)U.push(Bl(((Z=o==null?void 0:o.tableHeaders)==null?void 0:Z[at])||"Additional Item",at+1));return[...U,...w]},[o==null?void 0:o.tableHeaders,w,R]);l.useEffect(()=>{X.length===0?O([]):X.length===1&&O(X[0].items)},[X]);const B=(P,U)=>{U.setRowSelection(()=>{const Z={};return Z[P.index]=!0,Z});const W=P.original.items;O(W),h&&W.length>0&&h(W[0])},lt=P=>{if(P==="book"||P==="chapter"||P==="verse")c(P);else throw new Error(`Invalid scope value: ${P}`)},Y=P=>{if(P==="all"||P==="approved"||P==="unapproved"||P==="unknown")E(P);else throw new Error(`Invalid status filter value: ${P}`)},q=l.useMemo(()=>{if(D.length===0||I.length===0)return[];const P=D.filter(U=>N.deepEqual(R?U.items:[U.items[0]],I));if(P.length>1)throw new Error("Selected item is not unique");return P.length===0?[]:P[0].occurrences},[I,R,D]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(pe,{onValueChange:P=>Y(P),defaultValue:S,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(ue,{placeholder:"Select filter"})}),n.jsxs(te,{children:[n.jsx(kt,{value:"all",children:f}),n.jsx(kt,{value:"approved",children:g}),n.jsx(kt,{value:"unapproved",children:v}),n.jsx(kt,{value:"unknown",children:b})]})]}),n.jsxs(pe,{onValueChange:P=>lt(P),defaultValue:a,children:[n.jsx(Qt,{className:"tw-m-1",children:n.jsx(ue,{placeholder:"Select scope"})}),n.jsxs(te,{children:[n.jsx(kt,{value:"book",children:y}),n.jsx(kt,{value:"chapter",children:j}),n.jsx(kt,{value:"verse",children:C})]})]}),n.jsx(ge,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:L,onChange:P=>{$(P.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(un,{className:"tw-m-1",checked:R,onCheckedChange:P=>{A(P)}}),n.jsx(ct,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??z})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Xo,{columns:G,data:X,onRowClickHandler:B,stickyHeader:!0,isLoading:p,noResultsMessage:V})}),q.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Fl,{classNameForText:u,occurrenceData:q,setScriptureReference:e,localizedStrings:r})})]})}const Ql=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function tc({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function ec({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),i=l.useMemo(()=>{const a=o.trim().toLowerCase();return a?e.filter(c=>{var w;return c.marker&&((w=c.marker)==null?void 0:w.toLowerCase().includes(a))||!c.marker&&c.title.toLowerCase().includes(a)}):e},[o,e]);return n.jsxs(Ft,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(me,{className:"marker-menu-search",ref:r,value:o,onValueChange:a=>s(a),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(zt,{children:[n.jsx(Ee,{children:t["%markerMenu_noResults%"]}),n.jsx(Vt,{children:i.map(a=>{var c;return n.jsxs(Dt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:n.jsx(tc,{icon:a.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Qr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.marker??((c=a.icon)==null?void 0:c.displayName)}-${a.title.replaceAll(" ","")}`)})})]})]})}const nc="16rem",rc="3rem",ss=l.createContext(void 0);function Ke(){const t=l.useContext(ss);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const sr=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",...c},w)=>{const[d,p]=l.useState(t),u=e??d,h=l.useCallback(C=>{const _=typeof C=="function"?C(u):C;r?r(_):p(_)},[r,u]),f=l.useCallback(()=>h(C=>!C),[h]),g=u?"expanded":"collapsed",y=pt()==="ltr"?a:a==="primary"?"secondary":"primary",j=l.useMemo(()=>({state:g,open:u,setOpen:h,toggleSidebar:f,side:y}),[g,u,h,f,y]);return n.jsx(ss.Provider,{value:j,children:n.jsx(xt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":nc,"--sidebar-width-icon":rc,...s},className:m("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:i})})})});sr.displayName="SidebarProvider";const ar=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},i)=>{const a=Ke();return e==="none"?n.jsx("div",{className:m("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...s,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:m("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:m("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});ar.displayName="Sidebar";const as=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Ke();return n.jsxs(F,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:m("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});as.displayName="SidebarTrigger";const is=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Ke();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:m("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});is.displayName="SidebarRail";const ir=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:m("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));ir.displayName="SidebarInset";const ls=l.forwardRef(({className:t,...e},r)=>n.jsx(ge,{ref:r,"data-sidebar":"input",className:m("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));ls.displayName="SidebarInput";const cs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));cs.displayName="SidebarHeader";const ds=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:m("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ds.displayName="SidebarFooter";const ws=l.forwardRef(({className:t,...e},r)=>n.jsx(we,{ref:r,"data-sidebar":"separator",className:m("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));ws.displayName="SidebarSeparator";const lr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:m("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));lr.displayName="SidebarContent";const nn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));nn.displayName="SidebarGroup";const rn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ce.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:m("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});rn.displayName="SidebarGroupLabel";const ps=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Ce.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:m("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});ps.displayName="SidebarGroupAction";const on=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:m("tw-w-full tw-text-sm",t),...e}));on.displayName="SidebarGroupContent";const cr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));cr.displayName="SidebarMenu";const dr=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:m("tw-group/menu-item tw-relative",t),...e}));dr.displayName="SidebarMenuItem";const oc=ee.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),wr=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,...a},c)=>{const w=t?Ce.Slot:"button",{state:d}=Ke(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:m(oc({variant:r,size:o}),i),...a});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:p}),n.jsx(bt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});wr.displayName="SidebarMenuButton";const us=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const i=e?Ce.Slot:"button";return n.jsx(i,{ref:s,"data-sidebar":"menu-action",className:m("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});us.displayName="SidebarMenuAction";const ms=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:m("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));ms.displayName="SidebarMenuBadge";const fs=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(en,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(en,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});fs.displayName="SidebarMenuSkeleton";const hs=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:m("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));hs.displayName="SidebarMenuSub";const gs=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));gs.displayName="SidebarMenuSubItem";const xs=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},i)=>{const a=t?Ce.Slot:"a";return n.jsx(a,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:m("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});xs.displayName="SidebarMenuSubButton";function bs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:c,className:w}){const d=l.useCallback((h,f)=>{o(h,f)},[o]),p=l.useCallback(h=>{const f=r.find(g=>g.projectId===h);return f?f.projectName:h},[r]),u=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(ar,{id:t,collapsible:"none",variant:"inset",className:m("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(lr,{children:[n.jsxs(nn,{children:[n.jsx(rn,{className:"tw-text-sm",children:i}),n.jsx(on,{children:n.jsx(cr,{children:Object.entries(e).map(([h,f])=>n.jsx(dr,{children:n.jsx(wr,{onClick:()=>d(h),isActive:u(h),children:n.jsx("span",{className:"tw-pl-3",children:f})})},h))})})]}),n.jsxs(nn,{children:[n.jsx(rn,{className:"tw-text-sm",children:a}),n.jsx(on,{className:"tw-pl-3",children:n.jsx(Ze,{buttonVariant:"ghost",buttonClassName:m("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const f=p(h);d(f,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const mn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},c)=>{const w=pt();return n.jsxs("div",{id:a,className:m("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:m("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(ge,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(F,{variant:"ghost",size:"icon",className:m("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});mn.displayName="SearchBar";function sc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(mn,{className:"tw-w-9/12",value:a,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(sr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(bs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(ir,{className:"tw-min-w-[215px]",children:o})]})]})}const Xt="scrBook",ac="scrRef",ie="source",ic="details",lc="Scripture Reference",cc="Scripture Book",vs="Type",dc="Details";function wc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Xt,header:(t==null?void 0:t.scriptureReferenceColumnName)??lc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?it.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Xt?N.formatScrRef(s.start):void 0},getGroupingValue:o=>it.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>N.formatScrRef(o.start),id:ac,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:N.formatScrRef(s.start)},sortingFn:(o,s)=>N.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ie,header:r?(t==null?void 0:t.typeColumnName)??vs:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:ic,header:(t==null?void 0:t.detailsColumnName)??dc,cell:o=>o.getValue(),enableGrouping:!1}]}const pc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||N.compareScrRefs(t.start,t.end)===0?`${N.scrRefToBBBCCCVVV(t.start)}+${e}`:`${N.scrRefToBBBCCCVVV(t.start)}+${e}-${N.scrRefToBBBCCCVVV(t.end)}+${r}`},Vr=t=>`${pc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function uc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[u,h]=l.useState([{id:Xt,desc:!1}]),[f,g]=l.useState({}),v=l.useMemo(()=>t.flatMap(S=>S.data.map(E=>({...E,source:S.source}))),[t]),b=l.useMemo(()=>wc({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);l.useEffect(()=>{d.includes(ie)?h([{id:ie,desc:!1},{id:Xt,desc:!1}]):h([{id:Xt,desc:!1}])},[d]);const y=ft.useReactTable({data:v,columns:b,state:{grouping:d,sorting:u,rowSelection:f},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ft.getExpandedRowModel(),getGroupedRowModel:ft.getGroupedRowModel(),getCoreRowModel:ft.getCoreRowModel(),getSortedRowModel:ft.getSortedRowModel(),getRowId:Vr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const S=y.getSelectedRowModel().rowsById,E=Object.keys(S);if(E.length===1){const L=v.find($=>Vr($)===E[0])||void 0;L&&c(L)}}},[f,v,c,y]);const j=s??cc,C=i??vs,_=[{label:"No Grouping",value:[]},{label:`Group by ${j}`,value:[Xt]},{label:`Group by ${C}`,value:[ie]},{label:`Group by ${j} and ${C}`,value:[Xt,ie]},{label:`Group by ${C} and ${j}`,value:[ie,Xt]}],z=S=>{p(JSON.parse(S))},V=(S,E)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(E)},R=(S,E)=>S.getIsGrouped()?"":m("banded-row",E%2===0?"even":"odd"),A=(S,E,L)=>{if(!((S==null?void 0:S.length)===0||E.depth<L.column.getGroupedIndex())){if(E.getIsGrouped())switch(E.depth){case 1:return"tw-ps-4";default:return}switch(E.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(pe,{value:JSON.stringify(d),onValueChange:S=>{z(S)},children:[n.jsx(Qt,{className:"tw-mb-1 tw-mt-2",children:n.jsx(ue,{})}),n.jsx(te,{position:"item-aligned",children:n.jsx(Bo,{children:_.map(S=>n.jsx(kt,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),n.jsxs(Fe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(ze,{children:y.getHeaderGroups().map(S=>n.jsx(Lt,{children:S.headers.filter(E=>E.column.columnDef.header).map(E=>n.jsx(_e,{colSpan:E.colSpan,className:"top-0 tw-sticky",children:E.isPlaceholder?void 0:n.jsxs("div",{children:[E.column.getCanGroup()?n.jsx(F,{variant:"ghost",title:`Toggle grouping by ${E.column.columnDef.header}`,onClick:E.column.getToggleGroupingHandler(),type:"button",children:E.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ft.flexRender(E.column.columnDef.header,E.getContext())]})},E.id))},S.id))}),n.jsx(Ge,{children:y.getRowModel().rows.map((S,E)=>{const L=pt();return n.jsx(Lt,{"data-state":S.getIsSelected()?"selected":"",className:m(R(S,E)),onClick:$=>V(S,$),children:S.getVisibleCells().map($=>{if(!($.getIsPlaceholder()||$.column.columnDef.enableGrouping&&!$.getIsGrouped()&&($.column.columnDef.id!==ie||!r)))return n.jsx(Jt,{className:m($.column.columnDef.id,"tw-p-[1px]",A(d,S,$)),children:$.getIsGrouped()?n.jsxs(F,{variant:"link",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!S.getIsExpanded()&&(L==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",ft.flexRender($.column.columnDef.cell,$.getContext())," (",S.subRows.length,")"]}):ft.flexRender($.column.columnDef.cell,$.getContext())},$.id)})},S.id)})})]})]})}const pr=(t,e)=>t.filter(r=>{try{return N.getSectionForBook(r)===e}catch{return!1}}),ys=(t,e,r)=>pr(t,e).every(o=>r.includes(o));function mc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=pr(e,t).length===0,a=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(F,{variant:"outline",size:"sm",onClick:()=>o(t),className:m(ys(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Va(t,a,c,w,d)})}const Fr=5,_n=6;function fc({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],u=o["%webView_book_selector_more%"],{otLong:h,ntLong:f,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,y]=l.useState(!1),[j,C]=l.useState(""),_=l.useRef(void 0),z=l.useRef(!1);if(t.length!==it.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const V=l.useMemo(()=>it.Canon.allBookIds.filter((O,K)=>t[K]==="1"&&!it.Canon.isObsolete(it.Canon.bookIdToNumber(O))),[t]),R=l.useMemo(()=>{if(!j.trim()){const D={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return V.forEach(X=>{const G=N.getSectionForBook(X);D[G].push(X)}),D}const O=V.filter(D=>$n(D,j,s)),K={[N.Section.OT]:[],[N.Section.NT]:[],[N.Section.DC]:[],[N.Section.Extra]:[]};return O.forEach(D=>{const X=N.getSectionForBook(D);K[X].push(D)}),K},[V,j,s]),A=l.useCallback((O,K=!1)=>{if(!K||!_.current){r(e.includes(O)?e.filter(Y=>Y!==O):[...e,O]),_.current=O;return}const D=V.findIndex(Y=>Y===_.current),X=V.findIndex(Y=>Y===O);if(D===-1||X===-1)return;const[G,B]=[Math.min(D,X),Math.max(D,X)],lt=V.slice(G,B+1).map(Y=>Y);r(e.includes(O)?e.filter(Y=>!lt.includes(Y)):[...new Set([...e,...lt])])},[e,r,V]),S=O=>{A(O,z.current),z.current=!1},E=(O,K)=>{O.preventDefault(),A(K,O.shiftKey)},L=l.useCallback(O=>{const K=pr(V,O).map(D=>D);r(ys(V,O,e)?e.filter(D=>!K.includes(D)):[...new Set([...e,...K])])},[e,r,V]),$=()=>{r(V.map(O=>O))},I=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(N.Section).map(O=>n.jsx(mc,{section:O,availableBookIds:V,selectedBookIds:e,onToggle:L,localizedStrings:o},O))}),n.jsxs(qt,{open:b,onOpenChange:O=>{y(O),O||C("")},children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(F,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Gt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Ft,{shouldFilter:!1,onKeyDown:O=>{O.key==="Enter"&&(z.current=O.shiftKey)},children:[n.jsx(me,{placeholder:c,value:j,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(F,{variant:"ghost",size:"sm",onClick:$,children:w}),n.jsx(F,{variant:"ghost",size:"sm",onClick:I,children:d})]}),n.jsxs(zt,{children:[n.jsx(Ee,{children:p}),Object.values(N.Section).map((O,K)=>{const D=R[O];if(D.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Vt,{heading:to(O,h,f,g,v),children:D.map(X=>n.jsx(no,{bookId:X,isSelected:e.includes(X),onSelect:()=>S(X),onMouseDown:G=>E(G,X),section:N.getSectionForBook(X),showCheck:!0,localizedBookNames:s,commandValue:Dn(X,s),className:"tw-flex tw-items-center"},X))}),K<Object.values(N.Section).length-1&&n.jsx(Zr,{})]},O)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===_n?_n:Fr).map(O=>n.jsx(de,{className:"hover:tw-bg-secondary",variant:"secondary",children:ye(O,s)},O)),e.length>_n&&n.jsx(de,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Fr} ${u}`})]})]})}const hc=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),se=(t,e)=>t[e]??e;function gc({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:c,id:w}){const d=se(a,"%webView_scope_selector_selected_text%"),p=se(a,"%webView_scope_selector_current_verse%"),u=se(a,"%webView_scope_selector_current_chapter%"),h=se(a,"%webView_scope_selector_current_book%"),f=se(a,"%webView_scope_selector_choose_books%"),g=se(a,"%webView_scope_selector_scope%"),v=se(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:f,id:"scope-selected"}],y=e?b.filter(j=>e.includes(j.value)):b;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:g}),n.jsx(cn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:y.map(({value:j,label:C,id:_})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Pe,{className:"tw-me-2",value:j,id:_}),n.jsx(ct,{htmlFor:_,children:C})]},_))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ct,{children:v}),n.jsx(fc,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:c})]})]})}const Cn={[N.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[N.getLocalizeKeyForScrollGroupId(0)]:"A",[N.getLocalizeKeyForScrollGroupId(1)]:"B",[N.getLocalizeKeyForScrollGroupId(2)]:"C",[N.getLocalizeKeyForScrollGroupId(3)]:"D",[N.getLocalizeKeyForScrollGroupId(4)]:"E",[N.getLocalizeKeyForScrollGroupId(5)]:"F",[N.getLocalizeKeyForScrollGroupId(6)]:"G",[N.getLocalizeKeyForScrollGroupId(7)]:"H",[N.getLocalizeKeyForScrollGroupId(8)]:"I",[N.getLocalizeKeyForScrollGroupId(9)]:"J",[N.getLocalizeKeyForScrollGroupId(10)]:"K",[N.getLocalizeKeyForScrollGroupId(11)]:"L",[N.getLocalizeKeyForScrollGroupId(12)]:"M",[N.getLocalizeKeyForScrollGroupId(13)]:"N",[N.getLocalizeKeyForScrollGroupId(14)]:"O",[N.getLocalizeKeyForScrollGroupId(15)]:"P",[N.getLocalizeKeyForScrollGroupId(16)]:"Q",[N.getLocalizeKeyForScrollGroupId(17)]:"R",[N.getLocalizeKeyForScrollGroupId(18)]:"S",[N.getLocalizeKeyForScrollGroupId(19)]:"T",[N.getLocalizeKeyForScrollGroupId(20)]:"U",[N.getLocalizeKeyForScrollGroupId(21)]:"V",[N.getLocalizeKeyForScrollGroupId(22)]:"W",[N.getLocalizeKeyForScrollGroupId(23)]:"X",[N.getLocalizeKeyForScrollGroupId(24)]:"Y",[N.getLocalizeKeyForScrollGroupId(25)]:"Z"};function xc({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const c={...Cn,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in Cn?Cn[d]:p]))},w=pt();return n.jsxs(pe,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(Qt,{size:s,className:m("pr-twp tw-w-auto",i),children:n.jsx(ue,{placeholder:c[N.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(te,{id:a,align:w==="rtl"?"end":"start",style:{zIndex:250},children:t.map(d=>n.jsx(kt,{value:`${d}`,children:c[N.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function bc({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function vc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function yc({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(we,{}):""]})}function js(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function sn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:m("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Ns=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(c=>c.group===i).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:"command"in c?n.jsxs($e,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(sn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(sn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(Fo,{children:[n.jsx(Qn,{children:c.label}),n.jsx(Vo,{children:n.jsx(tr,{children:Ns(t,e,js(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(bt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function an({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:c}){return n.jsxs(ne,{variant:i,children:[n.jsx(fe,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(F,{variant:a,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Yt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(Zn,{children:n.jsx(xt,{children:Ns(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(he,{})]},w))})]})}const ks=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function jc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(ks,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(an,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:a}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(an,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function Nc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(ks,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(an,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const ur=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(yt.Root,{orientation:"vertical",ref:r,className:m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});ur.displayName=yt.List.displayName;const mr=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.List,{ref:r,className:m("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));mr.displayName=yt.List.displayName;const _s=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Trigger,{ref:r,...e,className:m("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),fr=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Content,{ref:r,className:m("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));fr.displayName=yt.Content.displayName;function kc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(mn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(ur,{children:[n.jsx(mr,{children:t.map(c=>n.jsx(_s,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(fr,{value:c.value,children:c.content},c.key))]})]})}function _c({...t}){return n.jsx(rt.Menu,{...t})}function Cc({...t}){return n.jsx(rt.Sub,{"data-slot":"menubar-sub",...t})}const Cs=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(Jn.Provider,{value:s,children:n.jsx(rt.Root,{ref:o,className:m("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Cs.displayName=rt.Root.displayName;const Ss=l.forwardRef(({className:t,...e},r)=>{const o=It();return n.jsx(rt.Trigger,{ref:r,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Ht({variant:o.variant,className:t})),...e})});Ss.displayName=rt.Trigger.displayName;const Es=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const i=It();return n.jsxs(rt.SubTrigger,{ref:s,className:m("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Ht({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Es.displayName=rt.SubTrigger.displayName;const Rs=l.forwardRef(({className:t,...e},r)=>{const o=It();return n.jsx(rt.SubContent,{ref:r,className:m("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Rs.displayName=rt.SubContent.displayName;const Ts=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},i)=>{const a=It();return n.jsx(rt.Portal,{children:n.jsx(rt.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:m("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...s})})});Ts.displayName=rt.Content.displayName;const Ms=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=It();return n.jsx(rt.Item,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Ht({variant:s.variant,className:t}),t),...r})});Ms.displayName=rt.Item.displayName;const Sc=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const i=It();return n.jsxs(rt.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ht({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Sc.displayName=rt.CheckboxItem.displayName;const Ec=l.forwardRef(({className:t,children:e,...r},o)=>{const s=It();return n.jsxs(rt.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ht({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});Ec.displayName=rt.RadioItem.displayName;const Rc=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(rt.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Rc.displayName=rt.Label.displayName;const Ds=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ds.displayName=rt.Separator.displayName;const Me=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Is=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const c=e.filter(d=>d.group===i).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(_t,{children:[n.jsx(Ct,{asChild:!0,children:"command"in d?n.jsxs(Ms,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(sn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(sn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(Cc,{children:[n.jsx(Es,{children:d.label}),n.jsx(Rs,{children:Is(t,e,js(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(bt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&a<s.length-1&&w.push(n.jsx(Ds,{},`separator-${i}`)),w})};function Tc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),i=l.useRef(void 0),a=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return c;case"platform.help":return w;default:return}};if(Ea.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,u)=>{var g,v,b,y;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},f={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(u.hotkey){case"alt":Me(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),Me(i,[h,f]);break;case"alt+l":(v=a.current)==null||v.focus(),Me(a,[h,f]);break;case"alt+n":(b=c.current)==null||b.focus(),Me(c,[h,f]);break;case"alt+h":(y=w.current)==null||y.focus(),Me(w,[h,f]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(f=>{f.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(f=>{p.observe(f,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Cs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,u])=>typeof p=="boolean"||typeof u=="boolean"?0:p.order-u.order).map(([p,u])=>n.jsxs(_c,{children:[n.jsx(Ss,{ref:d(p),children:typeof u=="object"&&"label"in u&&u.label}),n.jsx(Ts,{className:"tw-z-[250]",children:n.jsx(xt,{children:Is(t.groups,t.items,p,e)})})]},p))})}function Mc(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function Dc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:m("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(Tc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const Ic=(t,e)=>t[e]??e;function Oc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:c,id:w}){const d=Ic(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,u]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),i&&r.find(v=>v===g)&&i([...r.filter(v=>v!==g)]),u(!1)},f=(g,v)=>{var y,j,C,_,z,V;const b=v!==g?((j=(y=t[g])==null?void 0:y.uiNames)==null?void 0:j[v])??((_=(C=t[g])==null?void 0:C.uiNames)==null?void 0:_.en):void 0;return b?`${(z=t[g])==null?void 0:z.autonym} (${b})`:(V=t[g])==null?void 0:V.autonym};return n.jsxs("div",{id:w,className:m("pr-twp tw-max-w-sm",c),children:[n.jsxs(pe,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>u(g),children:[n.jsx(Qt,{children:n.jsx(ue,{})}),n.jsx(te,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(kt,{value:g,children:f(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(ct,{className:"tw-font-normal tw-text-muted-foreground",children:N.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>f(g,e)).join(", "):t.en.autonym})})})]})}function Ac({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(ct,{children:e(t)}):r?n.jsx(ct,{children:r(t)}):n.jsx(ct,{children:t})}function Pc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(un,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(Ac,{item:c,createLabel:i,createComplexLabel:a})]},c))})}function Lc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,dropdownContent:c,additionalSelectedContent:w,accentColor:d}){const p=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:m("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&c&&n.jsxs(ne,{children:[n.jsx(fe,{className:m(d&&"tw-me-1"),asChild:!0,children:n.jsx(F,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:c})]})]}),e&&w&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:w})]}),d&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},t)}const Os=l.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:m("tw-animate-spin",t),...e,ref:r}));Os.displayName="Spinner";function $c({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:u,onFocus:h,onBlur:f}){return n.jsxs("div",{className:m("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(ct,{htmlFor:t,className:m({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${c?"*":""}`}),n.jsx(ge,{id:t,disabled:e,placeholder:a,required:c,className:m(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:u,onFocus:h,onBlur:f}),n.jsx("p",{className:m({"tw-hidden":!s}),children:s})]})}const Vc=ee.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),As=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:m("pr-twp",Vc({variant:e}),t),...r}));As.displayName="Alert";const Ps=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Ps.displayName="AlertTitle";const Ls=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:m("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Ls.displayName="AlertDescription";const Fc=ot.Root,zc=ot.Trigger,Gc=ot.Group,Bc=ot.Portal,Kc=ot.Sub,qc=ot.RadioGroup,$s=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(ot.SubTrigger,{ref:s,className:m("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));$s.displayName=ot.SubTrigger.displayName;const Vs=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.SubContent,{ref:r,className:m("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Vs.displayName=ot.SubContent.displayName;const Fs=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.Portal,{children:n.jsx(ot.Content,{ref:r,className:m("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));Fs.displayName=ot.Content.displayName;const zs=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ot.Item,{ref:o,className:m("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));zs.displayName=ot.Item.displayName;const Gs=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(ot.CheckboxItem,{ref:s,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ot.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Gs.displayName=ot.CheckboxItem.displayName;const Bs=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(ot.RadioItem,{ref:o,className:m("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(ot.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Bs.displayName=ot.RadioItem.displayName;const Ks=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(ot.Label,{ref:o,className:m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));Ks.displayName=ot.Label.displayName;const qs=l.forwardRef(({className:t,...e},r)=>n.jsx(ot.Separator,{ref:r,className:m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));qs.displayName=ot.Separator.displayName;function Us({className:t,...e}){return n.jsx("span",{className:m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Us.displayName="ContextMenuShortcut";const Hs=l.createContext({direction:"bottom"});function Ys({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(Hs.Provider,{value:o,children:n.jsx(Mt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}Ys.displayName="Drawer";const Uc=Mt.Drawer.Trigger,Xs=Mt.Drawer.Portal,Hc=Mt.Drawer.Close,hr=l.forwardRef(({className:t,...e},r)=>n.jsx(Mt.Drawer.Overlay,{ref:r,className:m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));hr.displayName=Mt.Drawer.Overlay.displayName;const Ws=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:i="bottom"}=l.useContext(Hs),a={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Xs,{children:[n.jsx(hr,{}),n.jsxs(Mt.Drawer.Content,{ref:s,className:m("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",a[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:c[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:c[i]})]})]})});Ws.displayName="DrawerContent";function Js({className:t,...e}){return n.jsx("div",{className:m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Js.displayName="DrawerHeader";function Zs({className:t,...e}){return n.jsx("div",{className:m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Zs.displayName="DrawerFooter";const Qs=l.forwardRef(({className:t,...e},r)=>n.jsx(Mt.Drawer.Title,{ref:r,className:m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Qs.displayName=Mt.Drawer.Title.displayName;const ta=l.forwardRef(({className:t,...e},r)=>n.jsx(Mt.Drawer.Description,{ref:r,className:m("tw-text-sm tw-text-muted-foreground",t),...e}));ta.displayName=Mt.Drawer.Description.displayName;const ea=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Tn.Root,{ref:o,className:m("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Tn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));ea.displayName=Tn.Root.displayName;function Yc({className:t,...e}){return n.jsx(Pn.PanelGroup,{className:m("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Xc=Pn.Panel;function Wc({withHandle:t,className:e,...r}){return n.jsx(Pn.PanelResizeHandle,{className:m("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Jc({...t}){return n.jsx(Kr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const na=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsxs(De.Root,{ref:r,className:m("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(De.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(De.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(De.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});na.displayName=De.Root.displayName;const ra=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(Mn.Root,{className:m("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Mn.Thumb,{className:m("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});ra.displayName=Mn.Root.displayName;const Zc=yt.Root,oa=l.forwardRef(({className:t,...e},r)=>{const o=pt();return n.jsx(yt.List,{ref:r,className:m("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});oa.displayName=yt.List.displayName;const sa=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Trigger,{ref:r,className:m("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));sa.displayName=yt.Trigger.displayName;const aa=l.forwardRef(({className:t,...e},r)=>n.jsx(yt.Content,{ref:r,className:m("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));aa.displayName=yt.Content.displayName;const ia=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:m("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ia.displayName="Textarea";const Qc=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function td(t){return{preserveValue:!0,...t}}const la=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=td(s.current);const[i,a]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(a(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,c]},Sn=()=>!1,ed=(t,e)=>{const[r]=la(l.useCallback(async()=>{if(!t)return Sn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Sn,{preserveValue:!1});l.useEffect(()=>()=>{r!==Sn&&r()},[r])};function nd(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Kr.toast});exports.Alert=As;exports.AlertDescription=Ls;exports.AlertTitle=Ps;exports.Avatar=Xn;exports.AvatarFallback=Wn;exports.AvatarImage=$o;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Ua;exports.BOOK_SELECTOR_STRING_KEYS=Xa;exports.Badge=de;exports.BookChapterControl=qa;exports.BookSelectionMode=so;exports.BookSelector=Wa;exports.Button=F;exports.COMMENT_EDITOR_STRING_KEYS=al;exports.COMMENT_LIST_STRING_KEYS=il;exports.Card=Hn;exports.CardContent=Yn;exports.CardDescription=Po;exports.CardFooter=Lo;exports.CardHeader=Oo;exports.CardTitle=Ao;exports.ChapterRangeSelector=oo;exports.Checkbox=un;exports.Checklist=Pc;exports.ComboBox=Ze;exports.Command=Ft;exports.CommandEmpty=Ee;exports.CommandGroup=Vt;exports.CommandInput=me;exports.CommandItem=Dt;exports.CommandList=zt;exports.CommentEditor=sl;exports.CommentList=wl;exports.ContextMenu=Fc;exports.ContextMenuCheckboxItem=Gs;exports.ContextMenuContent=Fs;exports.ContextMenuGroup=Gc;exports.ContextMenuItem=zs;exports.ContextMenuLabel=Ks;exports.ContextMenuPortal=Bc;exports.ContextMenuRadioGroup=qc;exports.ContextMenuRadioItem=Bs;exports.ContextMenuSeparator=qs;exports.ContextMenuShortcut=Us;exports.ContextMenuSub=Kc;exports.ContextMenuSubContent=Vs;exports.ContextMenuSubTrigger=$s;exports.ContextMenuTrigger=zc;exports.DataTable=Xo;exports.Drawer=Ys;exports.DrawerClose=Hc;exports.DrawerContent=Ws;exports.DrawerDescription=ta;exports.DrawerFooter=Zs;exports.DrawerHeader=Js;exports.DrawerOverlay=hr;exports.DrawerPortal=Xs;exports.DrawerTitle=Qs;exports.DrawerTrigger=Uc;exports.DropdownMenu=ne;exports.DropdownMenuCheckboxItem=$t;exports.DropdownMenuContent=Yt;exports.DropdownMenuGroup=Zn;exports.DropdownMenuItem=$e;exports.DropdownMenuItemType=Zo;exports.DropdownMenuLabel=Re;exports.DropdownMenuPortal=Vo;exports.DropdownMenuRadioGroup=zo;exports.DropdownMenuRadioItem=er;exports.DropdownMenuSeparator=he;exports.DropdownMenuShortcut=Go;exports.DropdownMenuSub=Fo;exports.DropdownMenuSubContent=tr;exports.DropdownMenuSubTrigger=Qn;exports.DropdownMenuTrigger=fe;exports.ERROR_DUMP_STRING_KEYS=Wo;exports.ERROR_POPOVER_STRING_KEYS=bl;exports.ErrorDump=Jo;exports.ErrorPopover=vl;exports.FOOTNOTE_EDITOR_STRING_KEYS=Al;exports.Filter=_l;exports.FilterDropdown=yl;exports.Footer=kl;exports.FootnoteEditor=Ol;exports.FootnoteItem=rs;exports.FootnoteList=$l;exports.INVENTORY_STRING_KEYS=Xl;exports.Input=ge;exports.Inventory=Zl;exports.Label=ct;exports.MARKER_MENU_STRING_KEYS=Ql;exports.MarkdownRenderer=xl;exports.MarkerMenu=ec;exports.MoreInfo=jl;exports.MultiSelectComboBox=Qo;exports.NavigationContentSearch=kc;exports.Popover=qt;exports.PopoverAnchor=Fa;exports.PopoverContent=Gt;exports.PopoverTrigger=Ut;exports.Progress=ea;exports.RadioGroup=cn;exports.RadioGroupItem=Pe;exports.RecentSearches=ro;exports.ResizableHandle=Wc;exports.ResizablePanel=Xc;exports.ResizablePanelGroup=Yc;exports.ResultsCard=Lc;exports.SCOPE_SELECTOR_STRING_KEYS=hc;exports.ScopeSelector=gc;exports.ScriptureResultsViewer=uc;exports.ScrollGroupSelector=xc;exports.SearchBar=mn;exports.Select=pe;exports.SelectContent=te;exports.SelectGroup=Bo;exports.SelectItem=kt;exports.SelectLabel=qo;exports.SelectScrollDownButton=rr;exports.SelectScrollUpButton=nr;exports.SelectSeparator=Uo;exports.SelectTrigger=Qt;exports.SelectValue=ue;exports.Separator=we;exports.SettingsList=bc;exports.SettingsListHeader=yc;exports.SettingsListItem=vc;exports.SettingsSidebar=bs;exports.SettingsSidebarContentSearch=sc;exports.Sidebar=ar;exports.SidebarContent=lr;exports.SidebarFooter=ds;exports.SidebarGroup=nn;exports.SidebarGroupAction=ps;exports.SidebarGroupContent=on;exports.SidebarGroupLabel=rn;exports.SidebarHeader=cs;exports.SidebarInput=ls;exports.SidebarInset=ir;exports.SidebarMenu=cr;exports.SidebarMenuAction=us;exports.SidebarMenuBadge=ms;exports.SidebarMenuButton=wr;exports.SidebarMenuItem=dr;exports.SidebarMenuSkeleton=fs;exports.SidebarMenuSub=hs;exports.SidebarMenuSubButton=xs;exports.SidebarMenuSubItem=gs;exports.SidebarProvider=sr;exports.SidebarRail=is;exports.SidebarSeparator=ws;exports.SidebarTrigger=as;exports.Skeleton=en;exports.Slider=na;exports.Sonner=Jc;exports.Spinner=Os;exports.Switch=ra;exports.TabDropdownMenu=an;exports.TabFloatingMenu=Nc;exports.TabToolbar=jc;exports.Table=Fe;exports.TableBody=Ge;exports.TableCaption=Yo;exports.TableCell=Jt;exports.TableFooter=Ho;exports.TableHead=_e;exports.TableHeader=ze;exports.TableRow=Lt;exports.Tabs=Zc;exports.TabsContent=aa;exports.TabsList=oa;exports.TabsTrigger=sa;exports.TextField=$c;exports.Textarea=ia;exports.ToggleGroup=pn;exports.ToggleGroupItem=je;exports.Toolbar=Dc;exports.Tooltip=_t;exports.TooltipContent=bt;exports.TooltipProvider=xt;exports.TooltipTrigger=Ct;exports.UNDO_REDO_BUTTONS_STRING_KEYS=ts;exports.UiLanguageSelector=Oc;exports.UndoRedoButtons=es;exports.VerticalTabs=ur;exports.VerticalTabsContent=fr;exports.VerticalTabsList=mr;exports.VerticalTabsTrigger=_s;exports.badgeVariants=Io;exports.buttonVariants=Vn;exports.cn=m;exports.getBookIdFromUSFM=Yl;exports.getInventoryHeader=Be;exports.getLinesFromUSFM=Ul;exports.getNumberFromUSFM=Hl;exports.getStatusForItem=os;exports.getToolbarOSReservedSpaceClassName=Mc;exports.inventoryCountColumn=Kl;exports.inventoryItemColumn=Gl;exports.inventoryStatusColumn=ql;exports.selectTriggerVariants=Ko;exports.useEvent=Qc;exports.useEventAsync=ed;exports.useListbox=Do;exports.usePromise=la;exports.useRecentSearches=za;exports.useSidebar=Ke;exports.useStylesheet=nd;function rd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}rd(`*, ::before, ::after {
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
