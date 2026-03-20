"use strict";var gs=Object.defineProperty;var xs=(t,e,r)=>e in t?gs(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ft=(t,e,r)=>xs(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),me=require("cmdk"),_=require("lucide-react"),bs=require("clsx"),vs=require("tailwind-merge"),ys=require("@radix-ui/react-dialog"),rt=require("@sillsdev/scripture"),y=require("platform-bible-utils"),c=require("react"),_e=require("@radix-ui/react-slot"),re=require("class-variance-authority"),js=require("@radix-ui/react-popover"),ks=require("@radix-ui/react-label"),_s=require("@radix-ui/react-radio-group"),x=require("lexical"),Cr=require("@radix-ui/react-tooltip"),kn=require("@lexical/rich-text"),nr=require("react-dom"),Ns=require("@lexical/table"),Cs=require("@radix-ui/react-toggle-group");require("@radix-ui/react-toggle");const Er=require("@lexical/headless"),Es=require("@radix-ui/react-separator"),Ss=require("@radix-ui/react-avatar"),Sr=require("@radix-ui/react-dropdown-menu"),gt=require("@tanstack/react-table"),Ts=require("@radix-ui/react-select"),Rs=require("markdown-to-jsx"),Nt=require("@eten-tech-foundation/platform-editor"),Ms=require("@radix-ui/react-checkbox"),Ds=require("@radix-ui/react-tabs"),Os=require("@radix-ui/react-menubar"),Is=require("react-hotkeys-hook"),As=require("@radix-ui/react-context-menu"),oe=require("vaul"),Ps=require("@radix-ui/react-progress"),Ls=require("react-resizable-panels"),Tr=require("sonner"),$s=require("@radix-ui/react-slider"),Fs=require("@radix-ui/react-switch");function it(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const qt=it(ys),Ie=it(js),Vs=it(ks),_n=it(_s),Ae=it(Cr),Rr=it(Cs),zs=it(Es),Dn=it(Ss),ct=it(Sr),xt=it(Ts),rr=it(Ms),Rt=it(Ds),It=it(Os),wt=it(As),or=it(Ps),On=it(Ls),Ge=it($s),sr=it(Fs),Bs=vs.extendTailwindMerge({prefix:"tw-"});function h(...t){return Bs(bs.clsx(t))}const fe=250,In=300,Mr=400,Dr=450,Or=500,Gs="layoutDirection";function ot(){const t=localStorage.getItem(Gs);return t==="rtl"?t:"ltr"}const Ir=qt.Root,Ks=qt.Trigger,Ar=qt.Portal,qs=qt.Close;function Pr({className:t,style:e,ref:r,...o}){return n.jsx(qt.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:Dr,...e},...o})}function Lr({className:t,children:e,overlayClassName:r,style:o,ref:s,...i}){const a=ot();return n.jsxs(Ar,{children:[n.jsx(Pr,{className:r}),n.jsxs(qt.Content,{ref:s,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:Or,...o},...i,dir:a,children:[e,n.jsxs(qt.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})}function $r({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}function Us({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}function Fr({className:t,ref:e,...r}){return n.jsx(qt.Title,{ref:e,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...r})}function Hs({className:t,ref:e,...r}){return n.jsx(qt.Description,{ref:e,className:h("tw-text-sm tw-text-muted-foreground",t),...r})}function Yt({className:t,ref:e,...r}){return n.jsx(me.Command,{ref:e,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...r})}function Ne({className:t,ref:e,...r}){const o=ot();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(_.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(me.Command.Input,{ref:e,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...r})]})}function Xt({className:t,ref:e,...r}){return n.jsx(me.Command.List,{ref:e,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...r})}function Fe({ref:t,...e}){return n.jsx(me.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e})}function At({className:t,ref:e,...r}){return n.jsx(me.Command.Group,{ref:e,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...r})}function Vr({className:t,ref:e,...r}){return n.jsx(me.Command.Separator,{ref:e,className:h("tw--mx-1 tw-h-px tw-bg-border",t),...r})}function Pt({className:t,ref:e,...r}){return n.jsx(me.Command.Item,{ref:e,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...r})}function Ys({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}const zr=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Xs=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ve(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??rt.Canon.bookIdToEnglishName(t)}function An(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Br=rt.Canon.allBookIds.filter(t=>!rt.Canon.isObsolete(rt.Canon.bookIdToNumber(t))),le=Object.fromEntries(Br.map(t=>[t,rt.Canon.bookIdToEnglishName(t)]));function Pn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=rt.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(i?y.includes(i.localizedName.toLowerCase(),o)||y.includes(i.localizedId.toLowerCase(),o):!1))}const Gr=c.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:l,commandValue:w},d)=>{const u=c.useRef(!1),m=()=>{u.current||r==null||r(t),setTimeout(()=>{u.current=!1},100)},f=v=>{u.current=!0,o?o(v):r==null||r(t)},p=c.useMemo(()=>ve(t,l),[t,l]),g=c.useMemo(()=>An(t,l),[t,l]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(Pt,{ref:d,value:w||`${t} ${rt.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${rt.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(_.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:p}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Ln=re.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}});function B({className:t,variant:e,size:r,asChild:o=!1,ref:s,...i}){const a=o?_e.Slot:"button";return n.jsx(a,{className:h(Ln({variant:e,size:r,className:t})),ref:s,...i})}const Lt=Ie.Root,Wt=Ie.Trigger,Kr=Ie.Anchor;function $t({className:t,align:e="center",sideOffset:r=4,style:o,ref:s,...i}){const a=ot();return n.jsx(Ie.Portal,{children:n.jsx(Ie.Content,{ref:s,align:e,sideOffset:r,className:h("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:fe,...o},...i,dir:a})})}function Nn(t,e,r){return`${t} ${le[t]}${e?` ${An(t,e)} ${ve(t,e)}`:""}${r?` ${r}`:""}`}function qr({recentSearches:t,onSearchItemSelect:e,renderItem:r=u=>String(u),getItemKey:o=u=>String(u),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:l,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[u,m]=c.useState(!1);if(t.length===0)return;const f=p=>{e(p),m(!1)};return n.jsxs(Lt,{open:u,onOpenChange:m,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(B,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(_.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx($t,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Yt,{children:n.jsx(Xt,{children:n.jsx(At,{heading:i,children:t.map(p=>n.jsxs(Pt,{onSelect:()=>f(p),className:h("tw-flex tw-items-center",l),children:[n.jsx(_.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function Ws(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(l=>!r(l,s)),a=[s,...i.slice(0,o-1)];e(a)}}const wn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Zs=[wn.BOOK_ONLY,wn.BOOK_CHAPTER,wn.BOOK_CHAPTER_VERSE];function ar(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Ot(t){return y.getChaptersForBook(rt.Canon.bookIdToNumber(t))}function Js(t,e,r){if(!t.trim()||e.length===0)return;const o=Zs.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[l,w=void 0,d=void 0]=a.slice(1);let u;const m=e.filter(f=>Pn(f,l,r));if(m.length===1&&([u]=m),!u&&w){if(rt.Canon.isBookIdValid(l)){const f=l.toUpperCase();e.includes(f)&&(u=f)}if(!u&&r){const f=Array.from(r.entries()).find(([,p])=>p.localizedId.toLowerCase()===l.toLowerCase());f&&e.includes(f[0])&&([u]=f)}}if(!u&&w){const p=(g=>Object.keys(le).find(v=>le[v].toLowerCase()===g.toLowerCase()))(l);if(p&&e.includes(p)&&(u=p),!u&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===l.toLowerCase());g&&e.includes(g[0])&&([u]=g)}}if(u){let f=w?parseInt(w,10):void 0;f&&f>Ot(u)&&(f=Math.max(Ot(u),1));const p=d?parseInt(d,10):void 0;return{book:u,chapterNum:f,verseNum:p}}}},void 0);if(o)return o}function Qs(t,e,r,o){const s=c.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],u=Math.max(Ot(d),1);o({book:d,chapterNum:u,verseNum:1})}}},[t,e,o]),i=c.useCallback(()=>{const w=Ot(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const u=e[d+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),a=c.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=c.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return c.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?_.ChevronsLeft:_.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?_.ChevronLeft:_.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?_.ChevronRight:_.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===Ot(t.book)||Ot(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?_.ChevronsRight:_.ChevronsLeft}],[t,e,r,s,a,l,i])}function ir({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(At,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:Ot(t)},(a,l)=>l+1).map(a=>n.jsx(Pt,{value:`${t} ${le[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function ta({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:l,id:w}){const d=ot(),[u,m]=c.useState(!1),[f,p]=c.useState(""),[g,v]=c.useState(""),[b,j]=c.useState("books"),[k,N]=c.useState(void 0),[E,V]=c.useState(!1),z=c.useRef(void 0),A=c.useRef(void 0),D=c.useRef(void 0),S=c.useRef(void 0),R=c.useRef({}),F=c.useCallback(M=>{e(M),l&&l(M)},[e,l]),L=c.useMemo(()=>o?o():Br,[o]),I=c.useMemo(()=>({[y.Section.OT]:L.filter(C=>rt.Canon.isBookOT(C)),[y.Section.NT]:L.filter(C=>rt.Canon.isBookNT(C)),[y.Section.DC]:L.filter(C=>rt.Canon.isBookDC(C)),[y.Section.Extra]:L.filter(C=>rt.Canon.extraBooks().includes(C))}),[L]),P=c.useMemo(()=>Object.values(I).flat(),[I]),U=c.useMemo(()=>{if(!g.trim())return I;const M={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach($=>{M[$]=I[$].filter(K=>Pn(K,g,s))}),M},[I,g,s]),O=c.useMemo(()=>Js(g,P,s),[g,P,s]),H=c.useCallback(()=>{O&&(F({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1}),m(!1),v(""),p(""))},[F,O]),jt=c.useCallback(M=>{if(Ot(M)<=1){F({book:M,chapterNum:1,verseNum:1}),m(!1),v("");return}N(M),j("chapters")},[F]),Et=c.useCallback(M=>{const C=b==="chapters"?k:O==null?void 0:O.book;C&&(F({book:C,chapterNum:M,verseNum:1}),m(!1),j("books"),N(void 0),v(""))},[F,b,k,O]),_t=c.useCallback(M=>{F(M),m(!1),v("")},[F]),lt=Qs(t,P,d,e),nt=c.useCallback(()=>{j("books"),N(void 0),setTimeout(()=>{A.current&&A.current.focus()},0)},[]),G=c.useCallback(M=>{if(!M&&b==="chapters"){nt();return}m(M),M&&(j("books"),N(void 0),v(""))},[b,nt]),{otLong:Z,ntLong:J,dcLong:tt,extraLong:mt}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},Vt=c.useCallback(M=>zr(M,Z,J,tt,mt),[Z,J,tt,mt]),Mt=c.useCallback(M=>O?!!O.chapterNum&&!M.toString().includes(O.chapterNum.toString()):!1,[O]),zt=c.useMemo(()=>y.formatScrRef(t,s?ve(t.book,s):"English"),[t,s]),ge=c.useCallback(M=>C=>{R.current[M]=C},[]),Jt=c.useCallback(M=>{(M.key==="Home"||M.key==="End")&&M.stopPropagation()},[]),Bt=c.useCallback(M=>{if(M.ctrlKey)return;const{isLetter:C,isDigit:$}=ar(M.key);if(b==="chapters"){if(M.key==="Backspace"){M.preventDefault(),M.stopPropagation(),nt();return}if(C||$){if(M.preventDefault(),M.stopPropagation(),j("books"),N(void 0),$&&k){const K=le[k];v(`${K} ${M.key}`)}else v(M.key);setTimeout(()=>{A.current&&A.current.focus()},0);return}}if((b==="chapters"||b==="books"&&O)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(M.key)){const K=b==="chapters"?k:O==null?void 0:O.book;if(!K)return;const q=(()=>{if(!f)return 1;const et=f.match(/(\d+)$/);return et?parseInt(et[1],10):0})(),Q=Ot(K);if(!Q)return;let X=q;const dt=6;switch(M.key){case"ArrowLeft":q!==0&&(X=q>1?q-1:Q);break;case"ArrowRight":q!==0&&(X=q<Q?q+1:1);break;case"ArrowUp":X=q===0?Q:Math.max(1,q-dt);break;case"ArrowDown":X=q===0?1:Math.min(Q,q+dt);break;default:return}X!==q&&(M.preventDefault(),M.stopPropagation(),p(Nn(K,s,X)),setTimeout(()=>{const et=R.current[X];et&&et.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,O,nt,k,f,s]),Se=c.useCallback(M=>{if(M.shiftKey||M.key==="Tab"||M.key===" ")return;const{isLetter:C,isDigit:$}=ar(M.key);(C||$)&&(M.preventDefault(),v(K=>K+M.key),A.current.focus(),V(!1))},[]);return c.useLayoutEffect(()=>{const M=setTimeout(()=>{if(u&&b==="books"&&D.current&&S.current){const C=D.current,$=S.current,K=$.offsetTop,q=C.clientHeight,Q=$.clientHeight,X=K-q/2+Q/2;C.scrollTo({top:Math.max(0,X),behavior:"smooth"}),p(Nn(t.book))}},0);return()=>{clearTimeout(M)}},[u,b,g,O,t.book]),c.useLayoutEffect(()=>{if(b==="chapters"&&k){const M=k===t.book;setTimeout(()=>{if(D.current)if(M){const C=R.current[t.chapterNum];C&&C.scrollIntoView({block:"center",behavior:"smooth"})}else D.current.scrollTo({top:0});z.current&&z.current.focus()},0)}},[b,k,O,t.book,t.chapterNum]),n.jsxs(Lt,{open:u,onOpenChange:G,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(B,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":u,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:zt})})}),n.jsx($t,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Yt,{ref:z,onKeyDown:Bt,loop:!0,value:f,onValueChange:p,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Ne,{ref:A,value:g,onValueChange:v,onKeyDown:Jt,onFocus:()=>V(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(qr,{recentSearches:a,onSearchItemSelect:_t,renderItem:M=>y.formatScrRef(M,"English"),getItemKey:M=>`${M.book}-${M.chapterNum}-${M.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:lt.map(({onClick:M,disabled:C,title:$,icon:K})=>n.jsx(B,{variant:"ghost",size:"sm",onClick:()=>{V(!0),M()},disabled:C,className:"tw-h-10 tw-w-4 tw-p-0",title:$,onKeyDown:Se,children:n.jsx(K,{})},$))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:nt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(_.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(_.ArrowRight,{className:"tw-h-4 tw-w-4"})}),k&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ve(k,s)})]}),!E&&n.jsxs(Xt,{ref:D,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!O&&Object.entries(U).map(([M,C])=>{if(C.length!==0)return n.jsx(At,{heading:Vt(M),children:C.map($=>n.jsx(Gr,{bookId:$,onSelect:K=>jt(K),section:y.getSectionForBook($),commandValue:`${$} ${le[$]}`,ref:$===t.book?S:void 0,localizedBookNames:s},$))},M)}),O&&n.jsx(At,{children:n.jsx(Pt,{value:`${O.book} ${le[O.book]} ${O.chapterNum||""}:${O.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:O.book,chapterNum:O.chapterNum??1,verseNum:O.verseNum??1},s?An(O.book,s):void 0)},"top-match")}),O&&Ot(O.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ve(O.book,s)}),n.jsx(ir,{bookId:O.book,scrRef:t,onChapterSelect:Et,setChapterRef:ge,isChapterDimmed:Mt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&k&&n.jsx(ir,{bookId:k,scrRef:t,onChapterSelect:Et,setChapterRef:ge,className:"tw-p-4"})]})]})})]})}const ea=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),na=re.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70");function at({className:t,ref:e,...r}){return n.jsx(Vs.Root,{ref:e,className:h("pr-twp",na(),t),...r})}function $n({className:t,ref:e,...r}){const o=ot();return n.jsx(_n.Root,{className:h("pr-twp tw-grid tw-gap-2",t),...r,ref:e,dir:o})}function Xe({className:t,ref:e,...r}){return n.jsx(_n.Item,{ref:e,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...r,children:n.jsx(_n.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})})}function ra(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function We({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:i,value:a,onChange:l=()=>{},getOptionLabel:w=ra,getButtonLabel:d,icon:u=void 0,buttonPlaceholder:m="",textPlaceholder:f="",commandEmptyMessage:p="No option found",buttonVariant:g="outline",alignDropDown:v="start",isDisabled:b=!1,ariaLabel:j,...k}){const[N,E]=c.useState(!1),V=d??w,z=D=>D.length>0&&typeof D[0]=="object"&&"options"in D[0],A=(D,S)=>{const R=w(D),F=typeof D=="object"&&"secondaryLabel"in D?D.secondaryLabel:void 0,L=`${S??""}${R}${F??""}`;return n.jsxs(Pt,{value:R,onSelect:()=>{l(D),E(!1)},className:"tw-flex tw-items-center",children:[n.jsx(_.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||w(a)!==R})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[R,F&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",F]})]})]},L)};return n.jsxs(Lt,{open:N,onOpenChange:E,...k,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(B,{variant:g,role:"combobox","aria-expanded":N,"aria-label":j,id:t,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:u}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?V(a):m})]}),n.jsx(_.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:v,className:h("tw-w-[200px] tw-p-0",s),style:i,children:n.jsxs(Yt,{children:[n.jsx(Ne,{placeholder:f,className:"tw-text-inherit"}),n.jsx(Fe,{children:p}),n.jsx(Xt,{children:z(e)?e.map(D=>n.jsx(At,{heading:D.groupHeading,children:D.options.map(S=>A(S,D.groupHeading))},D.groupHeading)):e.map(D=>A(D))})]})})]})}function Ur({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=c.useMemo(()=>Array.from({length:i},(d,u)=>u+1),[i]),l=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(at,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(We,{isDisabled:s,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(at,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(We,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const oa=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),dn=(t,e)=>t[e]??e;function sa({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:l,handleSelectStartChapter:w,localizedStrings:d}){const u=dn(d,"%webView_bookSelector_currentBook%"),m=dn(d,"%webView_bookSelector_choose%"),f=dn(d,"%webView_bookSelector_chooseBooks%"),[p,g]=c.useState("current book"),v=b=>{g(b),t(b)};return n.jsx($n,{className:"pr-twp tw-flex",value:p,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{value:"current book"}),n.jsx(at,{className:"tw-ms-1",children:u})]}),n.jsx(at,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Ur,{isDisabled:p==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:a,chapterCount:s,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{value:"choose books"}),n.jsx(at,{className:"tw-ms-1",children:f})]}),n.jsx(at,{className:"tw-flex tw-items-center",children:o.map(b=>rt.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(B,{disabled:p==="current book",onClick:()=>r(),children:m})]})]})})}const Hr=c.createContext(null);function aa(t,e){return{getTheme:function(){return e??null}}}function Ft(){const t=c.useContext(Hr);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Yr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ia=Yr?c.useLayoutEffect:c.useEffect,Ke={tag:x.HISTORY_MERGE_TAG};function la({initialConfig:t,children:e}){const r=c.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:l,html:w}=t,d=aa(null,o),u=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:i,onError:m=>a(m,u),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const p=x.$getRoot();if(p.isEmpty()){const g=x.$createParagraphNode();p.append(g);const v=Yr?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===m.getRootElement())&&g.select()}},Ke);else if(f!==null)switch(typeof f){case"string":{const p=m.parseEditorState(f);m.setEditorState(p,Ke);break}case"object":m.setEditorState(f,Ke);break;case"function":m.update(()=>{x.$getRoot().isEmpty()&&f(m)},Ke)}}}(u,l),[u,d]},[]);return ia(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(Hr.Provider,{value:r,children:e})}const ca=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function wa({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Ft();return ca(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:l,tags:w})=>{e&&i.size===0&&a.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||l.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const Fn={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},pt=Ae.Provider,bt=Ae.Root;function yt({className:t,variant:e,ref:r,...o}){return n.jsx(Ae.Trigger,{ref:r,className:e?h(Ln({variant:e}),t):t,...o})}function vt({className:t,sideOffset:e=4,style:r,ref:o,...s}){return n.jsx(Ae.Portal,{children:n.jsx(Ae.Content,{ref:o,sideOffset:e,style:{zIndex:fe,...r},className:h("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...s})})}const Vn=[kn.HeadingNode,x.ParagraphNode,x.TextNode,kn.QuoteNode],da=c.createContext(null),un={didCatch:!1,error:null};class ua extends c.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=un}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(un)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&pa(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(un)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let l=e;if(i){const w={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")l=r(w);else if(o)l=c.createElement(o,w);else if(s!==void 0)l=s;else throw a}return c.createElement(da.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},l)}}function pa(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function ma({children:t,onError:e}){return n.jsx(ua,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const fa=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function ha(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function ga(){return function(t){const[e]=Ft(),r=c.useMemo(()=>t(e),[e,t]),[o,s]=c.useState(()=>r.initialValueFn()),i=c.useRef(o);return fa(()=>{const{initialValueFn:a,subscribe:l}=r,w=a();return i.current!==w&&(i.current=w,s(w)),l(d=>{i.current=d,s(d)})},[r,t]),o}(ha)}function xa(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),l=s.getNode(),w=i.getNode(),d=e.is(l),u=e.is(w);if(d||u){const[m,f]=x.$getCharacterOffsets(t),p=l.is(w),g=e.is(a?w:l),v=e.is(a?l:w);let b,j=0;p?(j=m>f?f:m,b=m>f?m:f):g?(j=a?f:m,b=void 0):v&&(j=0,b=a?m:f);const k=e.__text.slice(j,b);k!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=k)}}return e}function ba(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Xr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,va=Xr&&"documentMode"in document?document.documentMode:null;!(!Xr||!("InputEvent"in window)||va)&&"getTargetRanges"in new window.InputEvent("input");function ya(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||ba(4,t.__key),e}function ja(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],a=i.getKey();if(r.has(a))continue;const l=x.$findMatchingParent(i,d=>x.$isElementNode(d)&&!d.isInline());if(l===null)continue;const w=l.getKey();l.canIndent()&&!r.has(w)&&(r.add(w),t(l))}return r.size>0}const ka=Symbol.for("preact-signals");function rn(){if(te>1)return void te--;let t,e=!1;for(;Me!==void 0;){let r=Me;for(Me=void 0,Cn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&Wr(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Cn=0,te--,e)throw t}function _a(t){if(te>0)return t();te++;try{return t()}finally{rn()}}let Y,Me;function lr(t){const e=Y;Y=void 0;try{return t()}finally{Y=e}}let te=0,Cn=0,He=0;function cr(t){if(Y===void 0)return;let e=t.n;return e===void 0||e.t!==Y?(e={i:0,S:t,p:Y.s,n:void 0,t:Y,e:void 0,x:void 0,r:e},Y.s!==void 0&&(Y.s.n=e),Y.s=e,t.n=e,32&Y.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Y.s,e.n=void 0,Y.s.n=e,Y.s=e),e):void 0}function ht(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Pe(t,e){return new ht(t,e)}function Wr(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function wr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Zr(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ae(t,e){ht.call(this,void 0),this.x=t,this.s=void 0,this.g=He-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Na(t,e){return new ae(t,e)}function Jr(t){const e=t.u;if(t.u=void 0,typeof e=="function"){te++;const r=Y;Y=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,zn(t),o}finally{Y=r,rn()}}}function zn(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Jr(t)}function Ca(t){if(Y!==this)throw new Error("Out-of-order effect");Zr(this),Y=t,this.f&=-2,8&this.f&&zn(this),rn()}function be(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function ee(t,e){const r=new be(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function on(t,e={}){const r={};for(const o in t){const s=e[o],i=Pe(s===void 0?t[o]:s);r[o]=i}return r}ht.prototype.brand=ka,ht.prototype.h=function(){return!0},ht.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:lr(()=>{var r;(r=this.W)==null||r.call(this)}))},ht.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&lr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},ht.prototype.subscribe=function(t){return ee(()=>{const e=this.value,r=Y;Y=void 0;try{t(e)}finally{Y=r}},{name:"sub"})},ht.prototype.valueOf=function(){return this.value},ht.prototype.toString=function(){return this.value+""},ht.prototype.toJSON=function(){return this.value},ht.prototype.peek=function(){const t=Y;Y=void 0;try{return this.value}finally{Y=t}},Object.defineProperty(ht.prototype,"value",{get(){const t=cr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Cn>100)throw new Error("Cycle detected");this.v=t,this.i++,He++,te++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{rn()}}}}),ae.prototype=new ht,ae.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===He))return!0;if(this.g=He,this.f|=1,this.i>0&&!Wr(this))return this.f&=-2,!0;const t=Y;try{wr(this),Y=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Y=t,Zr(this),this.f&=-2,!0},ae.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}ht.prototype.S.call(this,t)},ae.prototype.U=function(t){if(this.t!==void 0&&(ht.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ae.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ae.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=cr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),be.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},be.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Jr(this),wr(this),te++;const t=Y;return Y=this,Ca.bind(this,t)},be.prototype.N=function(){2&this.f||(this.f|=2,this.o=Me,Me=this)},be.prototype.d=function(){this.f|=8,1&this.f||zn(this)},be.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>on(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return ee(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Qr(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function to(t,e=Qr){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>on(e),config:x.safeCast({$onClear:Qr}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return ee(()=>to(t,o.value))}});function Ea(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const pn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class eo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:pn}]})}getFormat(){return x.$getState(this,pn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,pn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Sa(t){return t instanceof eo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[eo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())Sa(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function no(t,e){let r;return Pe(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const En=x.defineExtension({build:t=>no(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function ro(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=ro(r[s],o[s]);return t}return e}const Bn=0,Sn=1,oo=2,mn=3,qe=4,xe=5,fn=6,Te=7;function hn(t){return t.id===Bn}function so(t){return t.id===oo}function Ta(t){return function(e){return e.id===Sn}(t)||W(305,String(t.id),String(Sn)),Object.assign(t,{id:oo})}const Ra=new Set;class Ma{constructor(e,r){ft(this,"builder");ft(this,"configs");ft(this,"_dependency");ft(this,"_peerNameSet");ft(this,"extension");ft(this,"state");ft(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:Bn}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;so(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(l,w,d){return Object.assign(l,{config:w,id:mn,registerState:d})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(l,w,d){return Object.assign(l,{id:qe,initResult:w,registerState:d})}(i,a,s)}build(e){const r=this.state;let o;r.id!==qe&&W(307,String(r.id),String(xe)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,l){return Object.assign(i,{id:xe,output:a,registerState:l})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==xe&&W(308,String(o.id),String(xe));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:fn})}(o),()=>{const i=this.state;i.id!==Te&&W(309,String(o.id),String(Te)),this.state=function(a){return Object.assign(a,{id:xe})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==fn&&W(310,String(r.id),String(fn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Te})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=qe}(e)||W(313,String(e.id),String(qe)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=mn}(e)||W(314,String(e.id),String(mn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Te}(e)||W(316,String(e.id),String(Te)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Ra}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=xe})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const dr={tag:x.HISTORY_MERGE_TAG};function Da(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Oa=x.defineExtension({config:x.safeCast({setOptions:dr,updateOptions:dr}),init:({$initialEditorState:t=Da})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),ur=Symbol.for("@lexical/extension/LexicalBuilder");function pr(){}function Ia(t){throw t}function Ue(t){return Array.isArray(t)?t:[t]}const gn="0.41.0+prod.esm";class De{constructor(e){ft(this,"roots");ft(this,"extensionNameMap");ft(this,"outgoingConfigEdges");ft(this,"incomingEdges");ft(this,"conflicts");ft(this,"_sortedExtensionReps");ft(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=gn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Ue(Oa)];for(const o of e)r.push(Ue(o));return new De(r)}static maybeFromEditor(e){const r=e[ur];return r&&(r.PACKAGE_VERSION!==gn&&W(292,r.PACKAGE_VERSION,gn),r instanceof De||W(293)),r}static fromEditor(e){const r=De.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[ur]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=pr;function r(){try{e()}finally{e=pr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=Ue(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new Ma(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&W(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const l=Ue(a);this.addEdge(o.name,l[0].name,l.slice(1)),this.addExtension(l)}for(const[a,l]of o.peerDependencies||[])this.addEdge(o.name,a,l?[l]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(so(i))return;const a=o.extension.name;var l;hn(i)||W(300,a,s||"[unknown]"),hn(l=i)||W(304,String(l.id),String(Bn)),i=Object.assign(l,{id:Sn}),o.state=i;const w=this.outgoingConfigEdges.get(a);if(w)for(const d of w.keys()){const u=this.extensionNameMap.get(d);u&&r(u,a)}i=Ta(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())hn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const l of i)a.configs.add(l)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const l=a.register(e,i);l&&s.push(l)}for(const a of r){const l=a.afterRegistration(e);l&&s.push(l)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},l=this.sortedExtensionReps();for(const u of l){const{extension:m}=u;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of Ea(m)){if(typeof f!="function"){const p=o.get(f.replace);p&&W(302,m.name,f.replace.name,p.extension.name),o.set(f.replace,u)}r.add(f)}if(m.html){if(m.html.export)for(const[f,p]of m.html.export.entries())s.set(f,p);m.html.import&&Object.assign(i,m.html.import)}m.theme&&ro(a,m.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const w=Object.keys(i).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=i),d&&(e.html.export=s));for(const u of l)u.init(e);return e.onError||(e.onError=Ia),e}}const Aa=new Set,mr=x.defineExtension({build(t,e,r){const o=r.getDependency(En).output,s=Pe({watchedNodeKeys:new Map}),i=no(()=>{},()=>ee(()=>{const a=i.peek(),{watchedNodeKeys:l}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[u,m]of l.entries()){if(m.size===0){l.delete(u);continue}const f=x.$getNodeByKey(u),p=f&&f.isSelected()||!1;d=d||p!==(!!a&&a.has(u)),p&&(w=w||new Set,w.add(u))}}),!d&&w&&a&&w.size===a.size||(i.value=w)}));return{watchNodeKey:function(a){const l=Na(()=>(i.value||Aa).has(a)),{watchedNodeKeys:w}=s.peek();let d=w.get(a);const u=d!==void 0;return d=d||new Set,d.add(l),u||(w.set(a,d),s.value={watchedNodeKeys:w}),l}}},dependencies:[En],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class ye extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new ye(e.__key)}static importJSON(e){return ao().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Pa,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Pa(){return{node:ao()}}function ao(){return x.$create(ye)}function La(t){return t instanceof ye}x.defineExtension({dependencies:[En,mr],name:"@lexical/extension/HorizontalRule",nodes:()=>[ye],register(t,e,r){const{watchNodeKey:o}=r.getDependency(mr).output,s=Pe({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const l=x.$getNodeFromDOMNode(a.target);if(La(l))return function(w,d=!1){const u=x.$getSelection(),m=w.isSelected(),f=w.getKey();let p;d&&x.$isNodeSelection(u)?p=u:(p=x.$createNodeSelection(),x.$setSelection(p)),m?p.delete(f):p.add(f)}(l,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(ye,(a,l)=>{_a(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[u,m]of a.entries())if(m==="destroyed")d.delete(u),w=!0;else{const f=d.get(u),p=t.getElementByKey(u);f?f.domNode.value=p:(w=!0,d.set(u,{domNode:Pe(p),selectedSignal:o(u)}))}w&&(s.value={nodeSelections:d})})}),ee(()=>{const a=[];for(const{domNode:l,selectedSignal:w}of s.value.nodeSelections.values())a.push(ee(()=>{const d=l.value;d&&(w.value?x.addClassNamesToElement(d,i):x.removeClassNamesFromElement(d,i))}));return x.mergeRegister(...a)}))}});function io(t){return t.canBeEmpty()}function $a(t,e,r=io){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(a){if(a.getNodes().filter(f=>x.$isBlockElementNode(f)&&f.canIndent()).length>0)return!0;const l=a.anchor,w=a.focus,d=w.isBefore(l)?w:l,u=d.getNode(),m=ya(u);if(m.canIndent()){const f=m.getKey();let p=x.$createRangeSelection();if(p.anchor.set(f,0,"element"),p.focus.set(f,0,"element"),p=x.$normalizeSelection__EXPERIMENTAL(p),p.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return ja(a=>{if(i(a)){const l=a.getIndent()+1;(!o||l<o)&&a.setIndent(l)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>on(e),config:x.safeCast({$canIndent:io,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return ee(()=>{if(!o.value)return $a(t,s,i)})}});const Fa=x.defineExtension({name:"@lexical/react/ReactProvider"});function Va(){return x.$getRoot().getTextContent()}function za(t,e=!0){if(t)return!1;let r=Va();return e&&(r=r.trim()),r===""}function Ba(t){if(!za(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let l=0;l<a;l++){const w=i[o];if(!x.$isTextNode(w))return!1}}}return!0}function lo(t){return()=>Ba(t)}function co(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const l=a.payload;if(l&&l.functionId==="makeChanges"){const w=l.args;if(w){const[d,u,m,f,p]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),j=0,k=0;if(x.$isTextNode(b)&&d>=0&&u>=0&&(j=d,k=d+u,g.setTextNodeRange(b,j,b,k)),j===k&&m===""||(g.insertRawText(m),b=v.getNode()),x.$isTextNode(b)){j=f,k=f+p;const N=b.getTextContentSize();j=j>N?N:j,k=k>N?N:k,g.setTextNodeRange(b,j,b,k)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>on(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>ee(()=>r.getOutput().disabled.value?void 0:co(t))});function Ga(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Gn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Ka({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=c.useState(()=>r.getDecorators());return Gn(()=>r.registerDecoratorListener(a=>{nr.flushSync(()=>{i(a)})}),[r]),c.useEffect(()=>{i(r.getDecorators())},[r]),c.useMemo(()=>{const a=[],l=Object.keys(s);for(let w=0;w<l.length;w++){const d=l[w],u=n.jsx(o,{onError:f=>r._onError(f),children:n.jsx(c.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&a.push(nr.createPortal(u,m,d))}return a},[o,s,r])}(t,e)}function qa({editor:t,ErrorBoundary:e}){return function(r){const o=De.maybeFromEditor(r);if(o&&o.hasExtensionByName(Fa.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Ga(320,s);return!0}return!1}(t)?null:n.jsx(Ka,{editor:t,ErrorBoundary:e})}function fr(t){return t.getEditorState().read(lo(t.isComposing()))}function Ua({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Ft();return function(s){Gn(()=>x.mergeRegister(kn.registerRichText(s),co(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Ha,{content:e}),n.jsx(qa,{editor:o,ErrorBoundary:r})]})}function Ha({content:t}){const[e]=Ft(),r=function(s){const[i,a]=c.useState(()=>fr(s));return Gn(()=>{function l(){const w=fr(s);a(w)}return l(),x.mergeRegister(s.registerUpdateListener(()=>{l()}),s.registerEditableListener(()=>{l()}))},[s]),i}(e),o=ga();return r?typeof t=="function"?t(o):t:null}function Ya({defaultSelection:t}){const[e]=Ft();return c.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Xa=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Wa({onClear:t}){const[e]=Ft();return Xa(()=>to(e,t),[e,t]),null}const wo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Za({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:l,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:u,ariaOwns:m,ariaRequired:f,autoCapitalize:p,className:g,id:v,role:b="textbox",spellCheck:j=!0,style:k,tabIndex:N,"data-testid":E,...V},z){const[A,D]=c.useState(t.isEditable()),S=c.useCallback(F=>{F&&F.ownerDocument&&F.ownerDocument.defaultView?t.setRootElement(F):t.setRootElement(null)},[t]),R=c.useMemo(()=>function(...F){return L=>{for(const I of F)typeof I=="function"?I(L):I!=null&&(I.current=L)}}(z,S),[S,z]);return wo(()=>(D(t.isEditable()),t.registerEditableListener(F=>{D(F)})),[t]),n.jsx("div",{"aria-activedescendant":A?e:void 0,"aria-autocomplete":A?r:"none","aria-controls":A?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":A&&b==="combobox"?!!a:void 0,...l!=null?{"aria-invalid":l}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":u,"aria-owns":A?m:void 0,"aria-readonly":!A||void 0,"aria-required":f,autoCapitalize:p,className:g,contentEditable:A,"data-testid":E,id:v,ref:R,role:b,spellCheck:j,style:k,tabIndex:N,...V})}const Ja=c.forwardRef(Za);function hr(t){return t.getEditorState().read(lo(t.isComposing()))}const Qa=c.forwardRef(ti);function ti(t,e){const{placeholder:r,...o}=t,[s]=Ft();return n.jsxs(n.Fragment,{children:[n.jsx(Ja,{editor:s,...o,ref:e}),r!=null&&n.jsx(ei,{editor:s,content:r})]})}function ei({content:t,editor:e}){const r=function(a){const[l,w]=c.useState(()=>hr(a));return wo(()=>{function d(){const u=hr(a);w(u)}return d(),x.mergeRegister(a.registerUpdateListener(()=>{d()}),a.registerEditableListener(()=>{d()}))},[a]),l}(e),[o,s]=c.useState(e.isEditable());if(c.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function ni({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Qa,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const uo=c.createContext(void 0);function ri({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=c.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(uo.Provider,{value:a,children:i})}function po(){const t=c.useContext(uo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function oi(){const[t,e]=c.useState(void 0),r=c.useCallback(()=>{e(void 0)},[]),o=c.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(Ir,{open:!0,onOpenChange:r,children:n.jsxs(Lr,{children:[n.jsx($r,{children:n.jsx(Fr,{children:i})}),a]})})},[t,r]),s=c.useCallback((i,a,l=!1)=>{e({closeOnClickOutside:l,content:a(r),title:i})},[r]);return[o,s]}function si({children:t}){const[e]=Ft(),[r,o]=c.useState(e),[s,i]=c.useState("paragraph"),[a,l]=oi(),w=()=>{};return c.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,u)=>(o(u),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(ri,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:i,showModal:l,children:[a,t({blockType:s})]})}function ai(t){const[e]=Ft(),{activeEditor:r}=po();c.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),c.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const ii=re.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),mo=c.createContext({size:"default",variant:"default"});function Kn({className:t,variant:e,size:r,children:o,ref:s,...i}){const a=ot();return n.jsx(Rr.Root,{ref:s,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...i,dir:a,children:n.jsx(mo.Provider,{value:{variant:e,size:r},children:o})})}function Oe({className:t,children:e,variant:r,size:o,ref:s,...i}){const a=c.useContext(mo);return n.jsx(Rr.Item,{ref:s,className:h(ii({variant:a.variant||r,size:a.size||o}),t),...i,children:e})}const gr=[{format:"bold",icon:_.BoldIcon,label:"Bold"},{format:"italic",icon:_.ItalicIcon,label:"Italic"}];function li(){const{activeEditor:t}=po(),[e,r]=c.useState([]),o=c.useCallback(s=>{if(x.$isRangeSelection(s)||Ns.$isTableSelection(s)){const i=[];gr.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(l=>a.includes(l))?i:a)}},[]);return ai(o),n.jsx(Kn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:gr.map(({format:s,icon:i,label:a})=>n.jsx(Oe,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function ci({onClear:t}){const[e]=Ft();c.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function wi({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=c.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(si,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(li,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ua,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(ni,{placeholder:t})}),ErrorBoundary:ma}),e&&n.jsx(Ya,{defaultSelection:"rootEnd"}),n.jsx(ci,{onClear:r}),n.jsx(Wa,{})]})]})}const di={namespace:"commentEditor",theme:Fn,nodes:Vn,onError:t=>{console.error(t)}};function Ze({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:l}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",l),children:n.jsx(la,{initialConfig:{...di,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(pt,{children:[n.jsx(wi,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(wa,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function ui(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!ho.has(i.nodeName)){const a=go(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const l=a.getChildren();for(const w of l)a.insertBefore(w);a.remove()}}(s),o}function pi(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)fo(t,o[s],r,e);return r.innerHTML}function fo(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=xa(o,e,"clone"));const l=x.$isElementNode(a)?a.getChildren():[],w=x.getRegisteredNode(t,a.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,a):a.exportDOM(t);const{element:u,after:m}=d;if(!u)return!1;const f=document.createDocumentFragment();for(let p=0;p<l.length;p++){const g=l[p],v=fo(t,g,f,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(u)||x.isDocumentFragment(u))&&u.append(f),r.append(u),m){const p=m.call(a,u);p&&(x.isDocumentFragment(u)?u.replaceChildren(p):u.replaceWith(p))}}else r.append(f);return s}const ho=new Set(["STYLE","SCRIPT"]);function go(t,e,r,o,s=new Map,i){let a=[];if(ho.has(t.nodeName))return a;let l=null;const w=function(g,v){const{nodeName:b}=g,j=v._htmlConversions.get(b.toLowerCase());let k=null;if(j!==void 0)for(const N of j){const E=N(g);E!==null&&(k===null||(k.priority||0)<=(E.priority||0))&&(k=E)}return k!==null?k.conversion:null}(t,e),d=w?w(t):null;let u=null;if(d!==null){u=d.after;const g=d.node;if(l=Array.isArray(g)?g[g.length-1]:g,l!==null){for(const[,v]of s)if(l=v(l,i),!l)break;l&&a.push(...Array.isArray(g)?g:[l])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const m=t.childNodes;let f=[];const p=(l==null||!x.$isRootOrShadowRoot(l))&&(l!=null&&x.$isBlockElementNode(l)||o);for(let g=0;g<m.length;g++)f.push(...go(m[g],e,r,p,new Map(s),l));return u!=null&&(f=u(f)),x.isBlockDomNode(t)&&(f=mi(t,f,p?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),l==null?f.length>0?a=a.concat(f):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(l)&&l.append(...f),a}function mi(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const l=e[a];if(x.$isBlockElementNode(l))o&&!l.getFormat()&&l.setFormat(o),s.push(l);else if(i.push(l),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const w=r();w.setFormat(o),w.append(...i),s.push(w),i=[]}}return s}function xo(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function bo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:bo(e.children)):!1}function Tt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?bo(t.root.children):!1}function fi(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=Er.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:Vn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=ui(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function Je(t){const e=Er.createHeadlessEditor({namespace:"EditorUtils",theme:Fn,nodes:Vn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=pi(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function qn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function Ye(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Un(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const hi={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function xn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function gi({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=c.useState(hi),[a,l]=c.useState(void 0),[w,d]=c.useState(!1),u=c.useRef(void 0),m=c.useRef(null);c.useEffect(()=>{let j=!0;const k=m.current;if(!k)return;const N=setTimeout(()=>{j&&xo(k)},300);return()=>{j=!1,clearTimeout(N)}},[]);const f=c.useCallback(()=>{if(!Tt(s))return;const j=Je(s);e(j,a)},[s,e,a]),p=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(_.X,{})})}),n.jsx(vt,{children:n.jsx("p",{children:v})})]})}),n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{onClick:f,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Tt(s),children:n.jsx(_.Check,{})})}),n.jsx(vt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Lt,{open:w,onOpenChange:d,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(B,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(_.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:xn(a!==void 0?a:"",o)})]})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),d(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:t.map(j=>n.jsx(Pt,{onSelect:()=>{l(j===""?void 0:j),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:xn(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Un(j)&&(j.preventDefault(),j.stopPropagation(),Tt(s)&&f())},onKeyDown:j=>{qn(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(Ze,{editorSerializedState:s,onSerializedChange:j=>i(j),placeholder:p,onClear:j=>{u.current=j}})})]})}const xi=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),bi=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],vi=["input","select","textarea","button"],yi=["button","textbox"],vo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=c.useRef(null),[i,a]=c.useState(void 0),[l,w]=c.useState(void 0),d=c.useCallback(p=>{a(p);const g=t.find(b=>b.id===p);g&&(e==null||e(g));const v=document.getElementById(p);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",p)},[e,t]),u=c.useCallback(p=>{const g=t.find(v=>v.id===p);g&&(w(v=>v===p?void 0:p),r==null||r(g))},[r,t]),m=p=>{if(!p)return!1;const g=p.tagName.toLowerCase();if(p.isContentEditable||vi.includes(g))return!0;const v=p.getAttribute("role");if(v&&yi.includes(v))return!0;const b=p.getAttribute("tabindex");return b!==void 0&&b!=="-1"},f=c.useCallback(p=>{var A;const g=p.target,v=D=>D?document.getElementById(D):void 0,b=v(l),j=v(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&m(g)){if(p.key==="Escape"||p.key==="ArrowLeft"&&!g.isContentEditable){if(l){p.preventDefault(),p.stopPropagation();const D=t.find(S=>S.id===l);D&&d(D.id)}return}if(p.key==="ArrowDown"||p.key==="ArrowUp"){if(!b)return;const D=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(D.length===0)return;const S=D.findIndex(F=>F===g);if(S===-1)return;let R;p.key==="ArrowDown"?R=Math.min(S+1,D.length-1):R=Math.max(S-1,0),R!==S&&(p.preventDefault(),p.stopPropagation(),(A=D[R])==null||A.focus());return}return}const E=t.findIndex(D=>D.id===i);let V=E;switch(p.key){case"ArrowDown":V=Math.min(E+1,t.length-1),p.preventDefault();break;case"ArrowUp":V=Math.max(E-1,0),p.preventDefault();break;case"Home":V=0,p.preventDefault();break;case"End":V=t.length-1,p.preventDefault();break;case" ":case"Enter":i&&u(i),p.preventDefault(),p.stopPropagation();return;case"ArrowRight":{const D=j;if(D){const S=D.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=D.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),F=S??R;if(F){p.preventDefault(),F.focus();return}}break}default:p.key.length===1&&!p.metaKey&&!p.ctrlKey&&!p.altKey&&(m(g)||(o==null||o(p.key),p.preventDefault()));return}const z=t[V];z&&d(z.id)},[t,d,i,l,u,o]);return{listboxRef:s,activeId:i,selectedId:l,handleKeyDown:f,focusOption:d}},yo=re.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}});function je({className:t,variant:e,ref:r,...o}){return n.jsx("div",{ref:r,className:h("pr-twp",yo({variant:e}),t),...o})}function jo({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...r})}function ji({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...r})}function ki({className:t,ref:e,...r}){return n.jsx("h3",{ref:e,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...r,children:r.children})}function _i({className:t,ref:e,...r}){return n.jsx("p",{ref:e,className:h("pr-twp tw-text-sm tw-text-muted-foreground",t),...r})}function ko({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:h("pr-twp tw-p-6 tw-pt-0",t),...r})}function Ni({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...r})}function ke({className:t,orientation:e="horizontal",decorative:r=!0,ref:o,...s}){return n.jsx(zs.Root,{ref:o,decorative:r,orientation:e,className:h("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...s})}function _o({className:t,ref:e,...r}){return n.jsx(Dn.Root,{ref:e,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...r})}function Ci({className:t,ref:e,...r}){return n.jsx(Dn.Image,{ref:e,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...r})}function No({className:t,ref:e,...r}){return n.jsx(Dn.Fallback,{ref:e,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...r})}const Hn=c.createContext(void 0);function Zt(){const t=c.useContext(Hn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const he=re.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ne=ct.Trigger,Yn=ct.Group,Co=ct.Portal,Eo=ct.Sub,So=ct.RadioGroup;function Ut({variant:t="default",...e}){const r=c.useMemo(()=>({variant:t}),[t]);return n.jsx(Hn.Provider,{value:r,children:n.jsx(ct.Root,{...e})})}function To({className:t,inset:e,children:r,ref:o,...s}){const i=Zt();return n.jsxs(ct.SubTrigger,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,he({variant:i.variant})),...s,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function Ro({className:t,children:e,ref:r,...o}){const s=ot();return n.jsx(ct.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:s,children:e})})}function Ht({className:t,sideOffset:e=4,children:r,ref:o,...s}){const i=ot();return n.jsx(ct.Portal,{children:n.jsx(ct.Content,{ref:o,sideOffset:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...s,children:n.jsx("div",{dir:i,children:r})})})}function Qe({className:t,inset:e,ref:r,...o}){const s=ot(),i=Zt();return n.jsx(ct.Item,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,he({variant:i.variant})),...o,dir:s})}function Kt({className:t,children:e,checked:r,ref:o,...s}){const i=ot(),a=Zt();return n.jsxs(ct.CheckboxItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,he({variant:a.variant})),checked:r,...s,dir:i,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(ct.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})}function Mo({className:t,children:e,ref:r,...o}){const s=ot(),i=Zt();return n.jsxs(ct.RadioItem,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,he({variant:i.variant})),...o,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(ct.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})}function Ve({className:t,inset:e,ref:r,...o}){return n.jsx(ct.Label,{ref:r,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...o})}function Ce({className:t,ref:e,...r}){return n.jsx(ct.Separator,{ref:e,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}function Ei({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}function xr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:l=!1}){const[w,d]=c.useState(!1),[u,m]=c.useState(),f=c.useRef(null);c.useEffect(()=>{if(!w)return;let E=!0;const V=f.current;if(!V)return;const z=setTimeout(()=>{E&&xo(V)},300);return()=>{E=!1,clearTimeout(z)}},[w]);const p=c.useCallback(E=>{E&&E.stopPropagation(),d(!1),m(void 0),a==null||a(!1)},[a]),g=c.useCallback(async E=>{if(E&&E.stopPropagation(),!u||!s)return;await s(t.id,Je(u))&&(d(!1),m(void 0),a==null||a(!1))},[u,s,t.id,a]),v=c.useMemo(()=>{const E=new Date(t.date),V=y.formatRelativeDate(E,r["%comment_date_today%"],r["%comment_date_yesterday%"]),z=E.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:V,time:z})},[t.date,r]),b=c.useMemo(()=>t.user,[t.user]),j=c.useMemo(()=>t.user.split(" ").map(E=>E[0]).join("").toUpperCase().slice(0,2),[t.user]),k=c.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),N=c.useMemo(()=>{if(o&&l)return n.jsxs(n.Fragment,{children:[n.jsxs(Qe,{onClick:E=>{E.stopPropagation(),d(!0),m(fi(t.contents)),a==null||a(!0)},children:[n.jsx(_.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Qe,{onClick:async E=>{E.stopPropagation(),i&&await i(t.id)},children:[n.jsx(_.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[l,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(_o,{className:"tw-h-8 tw-w-8",children:n.jsx(No,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(je,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Ye(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:f,onKeyDownCapture:E=>{E.key==="Escape"?(E.preventDefault(),E.stopPropagation(),p()):Un(E)&&(E.preventDefault(),E.stopPropagation(),Tt(u)&&g())},onKeyDown:E=>{qn(E),(E.key==="Enter"||E.key===" ")&&E.stopPropagation()},onClick:E=>{E.stopPropagation()},children:[n.jsx(Ze,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:u,onSerializedChange:E=>m(E)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(B,{size:"icon",onClick:p,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(_.X,{})}),n.jsx(B,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Tt(u),children:n.jsx(_.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:k}})]})]}),N&&n.jsxs(Ut,{children:[n.jsx(ne,{asChild:!0,children:n.jsx(B,{variant:"ghost",size:"icon",children:n.jsx(_.MoreHorizontal,{})})}),n.jsx(Ht,{align:"end",children:N})]})]})}const br={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Si({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:l,threadId:w,thread:d,threadStatus:u,handleAddCommentToThread:m,handleUpdateComment:f,handleDeleteComment:p,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:j,canUserResolveThreadCallback:k,canUserEditOrDeleteCommentCallback:N,isRead:E=!1,autoReadDelay:V=5,onVerseRefClick:z}){const[A,D]=c.useState(br),[S,R]=c.useState(void 0),F=o,[L,I]=c.useState(!1),[P,U]=c.useState(!1),[O,H]=c.useState(!1),[jt,Et]=c.useState(!1),[_t,lt]=c.useState(!1),[nt,G]=c.useState(E),[Z,J]=c.useState(!1),tt=c.useRef(void 0),[mt,Vt]=c.useState(new Map);c.useEffect(()=>{let T=!0;return(async()=>{const st=k?await k(w):!1;T&&lt(st)})(),()=>{T=!1}},[w,k]),c.useEffect(()=>{let T=!0;if(!o){Et(!1),Vt(new Map);return}return(async()=>{const st=j?await j(w):!1;T&&Et(st)})(),()=>{T=!1}},[o,w,j]);const Mt=c.useMemo(()=>e.filter(T=>!T.deleted),[e]);c.useEffect(()=>{let T=!0;if(!o||!N){Vt(new Map);return}return(async()=>{const st=new Map;await Promise.all(Mt.map(async er=>{const hs=await N(er.id);T&&st.set(er.id,hs)})),T&&Vt(st)})(),()=>{T=!1}},[o,Mt,N]);const zt=c.useMemo(()=>Mt[0],[Mt]),ge=c.useRef(null),Jt=c.useRef(void 0),Bt=c.useCallback(()=>{var T;(T=Jt.current)==null||T.call(Jt),D(br)},[]),Se=c.useCallback(()=>{const T=!nt;G(T),J(!T),g==null||g(w,T)},[nt,g,w]);c.useEffect(()=>{I(!1)},[o]),c.useEffect(()=>{if(o&&!nt&&!Z){const T=setTimeout(()=>{G(!0),g==null||g(w,!0)},V*1e3);return tt.current=T,()=>clearTimeout(T)}tt.current&&(clearTimeout(tt.current),tt.current=void 0)},[o,nt,Z,V,w,g]);const M=c.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),C=c.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const T=Ye(i,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:T})},[i,r]),$=c.useMemo(()=>Mt.slice(1),[Mt]),K=c.useMemo(()=>$.length??0,[$.length]),q=c.useMemo(()=>K>0,[K]),Q=c.useMemo(()=>L||K<=2?$:$.slice(-2),[$,K,L]),X=c.useMemo(()=>L||K<=2?0:K-2,[K,L]),dt=c.useMemo(()=>K===1?M.singleReply:y.formatReplacementString(M.multipleReplies,{count:K}),[K,M]),et=c.useMemo(()=>X===1?M.singleReply:y.formatReplacementString(M.multipleReplies,{count:X}),[X,M]);c.useEffect(()=>{!o&&P&&q&&U(!1)},[o,P,q]);const kt=c.useCallback(async T=>{T&&T.stopPropagation();const ut=Tt(A)?Je(A):void 0;if(S!==void 0){await m({threadId:w,contents:ut,assignedUser:S})&&(R(void 0),ut&&Bt());return}ut&&await m({threadId:w,contents:ut})&&Bt()},[Bt,A,m,S,w]),St=c.useCallback(async T=>{const ut=Tt(A)?Je(A):void 0,st=await m({...T,contents:ut,assignedUser:S??T.assignedUser});return st&&ut&&Bt(),st&&S!==void 0&&R(void 0),st},[Bt,A,m,S]);return n.jsx(jo,{role:"option","aria-selected":o,id:w,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&u!=="Resolved"&&nt,"tw-bg-background":o&&u!=="Resolved"&&nt,"tw-bg-muted":u==="Resolved","tw-bg-accent":!nt&&!o&&u!=="Resolved"}),onClick:()=>{l(w)},tabIndex:-1,children:n.jsxs(ko,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[C&&n.jsx(je,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:C}),n.jsx(B,{variant:"ghost",size:"icon",onClick:T=>{T.stopPropagation(),Se()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":nt?"Mark as unread":"Mark as read",children:nt?n.jsx(_.MailOpen,{}):n.jsx(_.Mail,{})}),_t&&u!=="Resolved"&&n.jsx(B,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:T=>{T.stopPropagation(),St({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:ge,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":F},{"tw-whitespace-nowrap":!F}),children:[s&&z?n.jsx(B,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:T=>{T.stopPropagation(),z(d)},children:s}):s,n.jsxs("span",{className:t,children:[zt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:zt.selectedText}),zt.contextAfter]})]})}),n.jsx(xr,{comment:zt,localizedStrings:r,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:St,handleUpdateComment:f,handleDeleteComment:p,onEditingChange:U,canEditOrDelete:(!P&&mt.get(zt.id))??!1,canUserResolveThread:_t})]}),n.jsxs(n.Fragment,{children:[q&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ke,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:dt})]}),!o&&Tt(A)&&n.jsx(Ze,{editorSerializedState:A,onSerializedChange:T=>D(T),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[X>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:T=>{T.stopPropagation(),I(!0)},role:"button",tabIndex:0,onKeyDown:T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),T.stopPropagation(),I(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ke,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:et}),L?n.jsx(_.ChevronUp,{}):n.jsx(_.ChevronDown,{})]})]}),Q.map(T=>n.jsx("div",{children:n.jsx(xr,{comment:T,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:p,onEditingChange:U,canEditOrDelete:(!P&&mt.get(T.id))??!1})},T.id)),b!==!1&&(!P||Tt(A))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:T=>T.stopPropagation(),onKeyDownCapture:T=>{Un(T)&&(T.preventDefault(),T.stopPropagation(),(Tt(A)||S!==void 0)&&kt())},onKeyDown:T=>{qn(T),(T.key==="Enter"||T.key===" ")&&T.stopPropagation()},children:[n.jsx(Ze,{editorSerializedState:A,onSerializedChange:T=>D(T),placeholder:u==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:T=>{Jt.current=T}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[S!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Ye(S,r)})}),n.jsxs(Lt,{open:O,onOpenChange:H,children:[n.jsx(Wt,{asChild:!0,children:n.jsx(B,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!jt||!v||v.length===0||!v.includes(a),"aria-label":"Assign user",children:n.jsx(_.AtSign,{})})}),n.jsx($t,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:T=>{T.key==="Escape"&&(T.stopPropagation(),H(!1))},children:n.jsx(Yt,{children:n.jsx(Xt,{children:v==null?void 0:v.map(T=>n.jsx(Pt,{onSelect:()=>{R(T!==i?T:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Ye(T,r)})},T||"unassigned"))})})})]}),n.jsx(B,{size:"icon",onClick:kt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Tt(A)&&S===void 0,"aria-label":"Submit comment",children:n.jsx(_.ArrowUp,{})})]})]})]})]})]})})}function Ti({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:l,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:p,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[j,k]=c.useState(new Set),[N,E]=c.useState();c.useEffect(()=>{g&&(k(I=>new Set(I).add(g)),E(g))},[g]);const V=r.filter(I=>I.comments.some(P=>!P.deleted)),z=V.map(I=>({id:I.id})),A=c.useCallback(I=>{k(P=>new Set(P).add(I.id)),E(I.id),v==null||v(I.id)},[v]),D=c.useCallback(I=>{const P=j.has(I);k(U=>{const O=new Set(U);return O.has(I)?O.delete(I):O.add(I),O}),E(I),v==null||v(P?void 0:I)},[j,v]),{listboxRef:S,activeId:R,handleKeyDown:F}=vo({options:z,onOptionSelect:A}),L=c.useCallback(I=>{I.key==="Escape"?(N&&j.has(N)&&(k(P=>{const U=new Set(P);return U.delete(N),U}),E(void 0),v==null||v(void 0)),I.preventDefault(),I.stopPropagation()):F(I)},[N,j,F,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:S,"aria-activedescendant":R??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:L,children:V.map(I=>n.jsx("div",{id:I.id,className:h({"tw-opacity-60":I.status==="Resolved"}),children:n.jsx(Si,{classNameForVerseText:e,comments:I.comments,localizedStrings:s,verseRef:I.verseRef,handleSelectThread:D,threadId:I.id,thread:I,isRead:I.isRead,isSelected:j.has(I.id),currentUser:o,assignedUser:I.assignedUser,threadStatus:I.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:l,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:u,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:p,onVerseRefClick:b})},I.id))})}function Ri({table:t}){return n.jsxs(Ut,{children:[n.jsx(Sr.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(B,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(_.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Ht,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ve,{children:"Toggle columns"}),n.jsx(Ce,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Kt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const we=xt.Root,Do=xt.Group,de=xt.Value,Oo=re.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}});function ue({className:t,children:e,size:r,ref:o,...s}){const i=ot();return n.jsxs(xt.Trigger,{className:h(Oo({size:r,className:t})),ref:o,...s,dir:i,children:[e,n.jsx(xt.Icon,{asChild:!0,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})}function Io({className:t,ref:e,...r}){return n.jsx(xt.ScrollUpButton,{ref:e,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...r,children:n.jsx(_.ChevronUp,{className:"tw-h-4 tw-w-4"})})}function Ao({className:t,ref:e,...r}){return n.jsx(xt.ScrollDownButton,{ref:e,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...r,children:n.jsx(_.ChevronDown,{className:"tw-h-4 tw-w-4"})})}function pe({className:t,children:e,position:r="popper",ref:o,...s}){const i=ot();return n.jsx(xt.Portal,{children:n.jsxs(xt.Content,{ref:o,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...s,children:[n.jsx(Io,{}),n.jsx(xt.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(Ao,{})]})})}function Mi({className:t,ref:e,...r}){return n.jsx(xt.Label,{ref:e,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...r})}function Ct({className:t,children:e,ref:r,...o}){return n.jsxs(xt.Item,{ref:r,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...o,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(xt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(xt.ItemText,{children:e})]})}function Di({className:t,ref:e,...r}){return n.jsx(xt.Separator,{ref:e,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}function Oi({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(we,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(ue,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(de,{placeholder:t.getState().pagination.pageSize})}),n.jsx(pe,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Ct,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(_.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(_.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(_.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(B,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(_.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const vr=`
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
`;function Ii(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Le(t,e){const r=e?`${vr}, ${e}`:vr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ii(o))}function sn({className:t,stickyHeader:e,ref:r,...o}){const s=c.useRef(null);c.useEffect(()=>{typeof r=="function"?r(s.current):r&&"current"in r&&(r.current=s.current)},[r]),c.useEffect(()=>{const a=s.current;if(!a)return;const l=()=>{requestAnimationFrame(()=>{Le(a,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const w=new MutationObserver(()=>{l()});return w.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const i=a=>{const{current:l}=s;if(l){if(a.key==="ArrowDown"){a.preventDefault(),Le(l)[0].focus();return}a.key===" "&&document.activeElement===l&&a.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...o})})}function an({className:t,stickyHeader:e,ref:r,...o}){return n.jsx("thead",{ref:r,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...o})}function ln({className:t,ref:e,...r}){return n.jsx("tbody",{ref:e,className:h("[&_tr:last-child]:tw-border-0",t),...r})}function Ai({className:t,ref:e,...r}){return n.jsx("tfoot",{ref:e,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...r})}function Pi(t){c.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Le(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Li(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function $i(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Gt({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,ref:s,...i}){const a=c.useRef(null);c.useEffect(()=>{typeof s=="function"?s(a.current):s&&"current"in s&&(s.current=a.current)},[s]),Pi(a);const l=c.useMemo(()=>a.current?Le(a.current):[],[a]),w=c.useCallback(u=>{const{current:m}=a;if(!m||!m.parentElement)return;const f=m.closest("table"),p=f?Le(f).filter(b=>b.tagName==="TR"):[],g=p.indexOf(m),v=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),$i(p,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Li(l,v,u.key);else if(u.key==="Escape"){u.preventDefault();const b=m.closest("table");b&&b.focus()}e==null||e(u)},[a,l,e]),d=c.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:w,onFocus:d,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...i})}function $e({className:t,ref:e,...r}){return n.jsx("th",{ref:e,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...r})}function ce({className:t,ref:e,...r}){return n.jsx("td",{ref:e,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...r})}function Fi({className:t,ref:e,...r}){return n.jsx("caption",{ref:e,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...r})}function tn({className:t,...e}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function Po({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:l,isLoading:w=!1,noResultsMessage:d}){var z;const[u,m]=c.useState([]),[f,p]=c.useState([]),[g,v]=c.useState({}),[b,j]=c.useState({}),k=c.useMemo(()=>e??[],[e]),N=gt.useReactTable({data:k,columns:t,getCoreRowModel:gt.getCoreRowModel(),...r&&{getPaginationRowModel:gt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:gt.getSortedRowModel(),onColumnFiltersChange:p,getFilteredRowModel:gt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:j,state:{sorting:u,columnFilters:f,columnVisibility:g,rowSelection:b}}),E=N.getVisibleFlatColumns();let V;return w?V=Array.from({length:10}).map((S,R)=>`skeleton-row-${R}`).map(S=>n.jsx(Gt,{className:"hover:tw-bg-transparent",children:n.jsx(ce,{colSpan:E.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(tn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},S)):((z=N.getRowModel().rows)==null?void 0:z.length)>0?V=N.getRowModel().rows.map(A=>n.jsx(Gt,{onClick:()=>a(A,N),"data-state":A.getIsSelected()&&"selected",children:A.getVisibleCells().map(D=>n.jsx(ce,{children:gt.flexRender(D.column.columnDef.cell,D.getContext())},D.id))},A.id)):V=n.jsx(Gt,{children:n.jsx(ce,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:l,children:[s&&n.jsx(Ri,{table:N}),n.jsxs(sn,{stickyHeader:i,children:[n.jsx(an,{stickyHeader:i,children:N.getHeaderGroups().map(A=>n.jsx(Gt,{children:A.headers.map(D=>n.jsx($e,{className:"tw-p-0",children:D.isPlaceholder?void 0:gt.flexRender(D.column.columnDef.header,D.getContext())},D.id))},A.id))}),n.jsx(ln,{children:V})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(B,{variant:"outline",size:"sm",onClick:()=>N.previousPage(),disabled:!N.getCanPreviousPage(),children:"Previous"}),n.jsx(B,{variant:"outline",size:"sm",onClick:()=>N.nextPage(),disabled:!N.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Oi,{table:N})]})}function Vi({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=c.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Rs,{options:i,children:e})})}const Lo=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),yr=(t,e)=>t[e]??e;function $o({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=yr(r,"%webView_error_dump_header%"),i=yr(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(B,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(_.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const zi=Object.freeze([...Lo,"%webView_error_dump_copied_message%"]);function Bi({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,l]=c.useState(!1),w=()=>{l(!0),e&&e()},d=u=>{u||l(!1)};return n.jsxs(Lt,{onOpenChange:d,children:[n.jsx(Wt,{asChild:!0,children:o}),n.jsxs($t,{id:i,className:h("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(at,{children:r["%webView_error_dump_copied_message%"]}),n.jsx($o,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var Fo=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(Fo||{});function Gi({id:t,label:e,groups:r}){const[o,s]=c.useState(Object.fromEntries(r.map((d,u)=>d.itemType===0?[u,[]]:void 0).filter(d=>!!d))),[i,a]=c.useState({}),l=(d,u)=>{const m=!o[d][u];s(p=>(p[d][u]=m,{...p}));const f=r[d].items[u];f.onUpdate(f.id,m)},w=(d,u)=>{a(f=>(f[d]=u,{...f}));const m=r[d].items.find(f=>f.id===u);m?m.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Ut,{children:[n.jsx(ne,{asChild:!0,children:n.jsxs(B,{variant:"default",children:[n.jsx(_.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(_.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Ht,{children:r.map((d,u)=>n.jsxs("div",{children:[n.jsx(Ve,{children:d.label}),n.jsx(Yn,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,f)=>n.jsx("div",{children:n.jsx(Kt,{checked:o[u][f],onCheckedChange:()=>l(u,f),children:m.label})},m.id))}):n.jsx(So,{value:i[u],onValueChange:m=>w(u,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(Mo,{value:m.id,children:m.label})},m.id))})}),n.jsx(Ce,{})]},d.label))})]})})}function Ki({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:l}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,m)=>u+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(_.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(_.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(B,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(_.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function qi({id:t,versionHistory:e}){const[r,o]=c.useState(!1),s=new Date;function i(l){const w=new Date(l),d=new Date(s.getTime()-w.getTime()),u=d.getUTCFullYear()-1970,m=d.getUTCMonth(),f=d.getUTCDate()-1;let p="";return u>0?p=`${u.toString()} year${u===1?"":"s"} ago`:m>0?p=`${m.toString()} month${m===1?"":"s"} ago`:f===0?p="today":p=`${f.toString()} day${f===1?"":"s"} ago`,p}const a=Object.entries(e).sort((l,w)=>w[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Ui({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=c.useMemo(()=>y.formatBytes(r),[r]),w=(d=>{const u=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return d.map(m=>u.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(qi,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function Vo({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:l="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:u=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:p=void 0,className:g=void 0,variant:v="ghost",id:b}){const[j,k]=c.useState(!1),N=c.useCallback(R=>{var L;const F=(L=t.find(I=>I.label===R))==null?void 0:L.value;F&&r(e.includes(F)?e.filter(I=>I!==F):[...e,F])},[t,e,r]),E=()=>w||o,V=c.useMemo(()=>{if(!f)return t;const R=t.filter(L=>L.starred).sort((L,I)=>L.label.localeCompare(I.label)),F=t.filter(L=>!L.starred).sort((L,I)=>{const P=e.includes(L.value),U=e.includes(I.value);return P&&!U?-1:!P&&U?1:L.label.localeCompare(I.label)});return[...R,...F]},[t,e,f]),z=()=>{r(t.map(R=>R.value))},A=()=>{r([])},D=d??j,S=u??k;return n.jsx("div",{id:b,className:g,children:n.jsxs(Lt,{open:D,onOpenChange:S,children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(B,{variant:v,role:"combobox","aria-expanded":D,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[p&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:E()})]}),n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Yt,{children:[n.jsx(Ne,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:z,children:i}),n.jsx(B,{variant:"ghost",size:"sm",onClick:A,children:a})]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:l}),n.jsx(At,{children:V.map(R=>n.jsxs(Pt,{value:R.label,onSelect:N,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(_.Check,{className:h("tw-h-4 tw-w-4",e.includes(R.value)?"tw-opacity-100":"tw-opacity-0")})}),R.starred&&n.jsx(_.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:R.label}),R.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:R.secondaryLabel})]},R.label))})]})]})})]})})}function Hi({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:l,icon:w,className:d,badgesPlaceholder:u,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Vo,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:l,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var p;return n.jsxs(je,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(B,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==f)),children:n.jsx(_.X,{className:"tw-h-3 tw-w-3"})}),(p=t.find(g=>g.value===f))==null?void 0:p.label]},f)})}):n.jsx(at,{children:u})]})}const zo=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),jr=(t,e)=>t[e]??e;function Bo({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:i=!0,className:a="tw-h-6 tw-w-6",variant:l="ghost"}){const w=c.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]);return n.jsxs(n.Fragment,{children:[n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{"aria-label":"Undo",className:a,size:"icon",onClick:t,disabled:!r,variant:l,children:n.jsx(_.Undo,{})})}),n.jsx(vt,{children:n.jsxs("p",{children:[jr(s,"%undoButton_tooltip%"),i&&` (${w?"⌘Z":"Ctrl+Z"})`]})})]})}),e&&n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{"aria-label":"Redo",className:a,size:"icon",onClick:e,disabled:!o,variant:l,children:n.jsx(_.Redo,{})})}),n.jsx(vt,{children:n.jsxs("p",{children:[jr(s,"%redoButton_tooltip%"),i&&` (${w?"⌘⇧Z":"Ctrl+Y"})`]})})]})})]})}function Go({children:t,editorRef:e}){const r=c.useRef(null);return c.useEffect(()=>{var a;const o=/Macintosh/i.test(navigator.userAgent),s=((a=r.current)==null?void 0:a.querySelector(".editor-input"))??void 0,i=l=>{var d,u,m,f;if(!s||document.activeElement!==s)return;const w=l.key.toLowerCase();if(o){if(!l.metaKey)return;!l.shiftKey&&w==="z"?(l.preventDefault(),(d=e.current)==null||d.undo()):l.shiftKey&&w==="z"&&(l.preventDefault(),(u=e.current)==null||u.redo())}else{if(!l.ctrlKey)return;!l.shiftKey&&w==="z"?(l.preventDefault(),(m=e.current)==null||m.undo()):(w==="y"||l.shiftKey&&w==="z")&&(l.preventDefault(),(f=e.current)==null||f.redo())}};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[e]),n.jsx("div",{ref:r,children:t})}function Ee({className:t,type:e,ref:r,...o}){return n.jsx("input",{type:e,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...o})}const Yi=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Xi({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=c.useRef(null),a=c.useRef(null),l=c.useRef(!1),[w,d]=c.useState(t),[u,m]=c.useState(r),[f,p]=c.useState(!1);c.useEffect(()=>{d(t)},[t]),c.useEffect(()=>{u!==r&&m(r)},[r]);const g=b=>{l.current=!1,p(b),b||(w!=="custom"||u?(e(w),o(u)):(d(t),m(r)))},v=b=>{var j,k,N,E;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((j=i.current)==null||j.focus(),l.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((k=a.current)==null||k.focus(),l.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((N=i.current)==null?void 0:N.selectionStart)===0&&((E=a.current)==null||E.focus(),l.current=!1),w==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(Ut,{open:f,onOpenChange:g,children:[n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(ne,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Yi(t,s,r)})})}),n.jsx(vt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Ht,{style:{zIndex:In},onClick:()=>{l.current&&(l.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;l.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Ve,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(Ce,{}),n.jsx(Kt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Nt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Kt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Nt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Kt,{ref:a,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:b=>{var j;b.stopPropagation(),l.current=!0,(j=i.current)==null||j.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ee,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),d("custom"),l.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>m(b.target.value)})]})})]})]})}const Wi=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(_.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(_.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(_.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Zi=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Ji({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Ut,{children:[n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(Cr.TooltipTrigger,{asChild:!0,children:n.jsx(ne,{asChild:!0,children:n.jsx(B,{variant:"outline",className:"tw-h-6",children:Wi(t,r)})})}),n.jsx(vt,{children:n.jsx("p",{children:Zi(t,r)})})]})}),n.jsxs(Ht,{style:{zIndex:In},children:[n.jsx(Ve,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(Ce,{}),n.jsxs(Kt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(_.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Kt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(_.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Kt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(_.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const Ko=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Qi({icon:t,className:e}){const r=t??_.Ban;return n.jsx(r,{className:e,size:16})}function kr({item:t,localizedStrings:e}){return n.jsxs(Pt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(Qi,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(Ys,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function qo({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=c.useState(""),[i,a]=c.useMemo(()=>{const l=o.trim().toLowerCase();if(!l)return[e,[]];const w=e.filter(u=>{var m;return(m=u.marker)==null?void 0:m.toLowerCase().includes(l)}),d=e.filter(u=>u.title.toLowerCase().includes(l)&&!w.includes(u));return[w,d]},[o,e]);return n.jsxs(Yt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(Ne,{className:"marker-menu-search",ref:r,value:o,onValueChange:l=>s(l),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:t["%markerMenu_noResults%"]}),n.jsx(At,{children:i.map(l=>{var w;return n.jsx(kr,{item:l,localizedStrings:t},`item-${l.marker??((w=l.icon)==null?void 0:w.displayName)}-${l.title.replaceAll(" ","")}`)})}),a.length>0&&n.jsxs(n.Fragment,{children:[i.length>0&&n.jsx(Vr,{alwaysRender:!0}),n.jsx(At,{children:a.map(l=>{var w;return n.jsx(kr,{item:l,localizedStrings:t},`item-${l.marker??((w=l.icon)==null?void 0:w.displayName)}-${l.title.replaceAll(" ","")}`)})})]})]})]})}function tl(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,a])=>{i.push(...a.map(l=>({marker:l,title:r[y.usfmMarkers[l].description]??y.usfmMarkers[l].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(l),e()}})))}),i.sort((a,l)=>(a.marker??a.title).localeCompare(l.marker??l.title))}function el(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function nl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const rl={type:"USJ",version:"3.1",content:[{type:"para"}]};function ol({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,defaultMarkerMenuTrigger:l,localizedStrings:w,parentEditorRef:d}){const u=c.useRef(null),m=c.useRef(null),f=c.useRef(null),p=c.useRef(null);c.useLayoutEffect(()=>{if(!p.current)return;const{width:C}=p.current.getBoundingClientRect();C>0&&(p.current.style.width=`${C}px`)},[]);const[g,v]=c.useState("generated"),[b,j]=c.useState("*"),[k,N]=c.useState("f"),[E,V]=c.useState(!1),[z,A]=c.useState(!0),[D,S]=c.useState(!1),R=c.useRef(!1),F=c.useRef(""),[L,I]=c.useState(!1),[P,U]=c.useState(),[O,H]=c.useState(),[jt,Et]=c.useState(),[_t,lt]=c.useState(),nt=c.useRef(null),G=c.useMemo(()=>({...a,markerMenuTrigger:l,hasExternalUI:!0,view:{...a.view??Nt.getDefaultViewOptions(),noteMode:"expanded"}}),[a,l]),Z=c.useMemo(()=>tl(u,()=>I(!1),w,_t),[w,_t]);c.useEffect(()=>{var C;L||(C=u.current)==null||C.focus()},[k,L]),c.useEffect(()=>{var K,q;let C;R.current=!1,A(!0);const $=e==null?void 0:e.at(0);if($&&Nt.isInsertEmbedOpOfType("note",$)){const Q=(K=$.insert.note)==null?void 0:K.caller;let X="custom";Q===Nt.GENERATOR_NOTE_CALLER?X="generated":Q===Nt.HIDDEN_NOTE_CALLER?X="hidden":Q&&j(Q),v(X),N(((q=$.insert.note)==null?void 0:q.style)??"f"),C=setTimeout(()=>{var dt;(dt=u.current)==null||dt.applyUpdate([$])},0)}return()=>{C&&clearTimeout(C)}},[e,i]);const J=c.useCallback((C,$,K=!1)=>{var Q,X,dt;const q=(X=(Q=u.current)==null?void 0:Q.getNoteOps(0))==null?void 0:X.at(0);if(q&&Nt.isInsertEmbedOpOfType("note",q)){if(q.insert.note){let et;C==="custom"?et=$:C==="generated"?et=Nt.GENERATOR_NOTE_CALLER:et=Nt.HIDDEN_NOTE_CALLER,q.insert.note.caller=et}r==null||r([q]),K&&d&&i&&((dt=d.current)==null||dt.replaceEmbedUpdate(i,[q]))}},[i,r,d]),tt=c.useCallback(()=>{J(g,b,!0),o()},[g,b,o,J]),mt=c.useRef(tt);c.useLayoutEffect(()=>{mt.current=tt});const Vt=c.useRef({book:s.book,chapterNum:s.chapterNum});c.useLayoutEffect(()=>{(Vt.current.book!==s.book||Vt.current.chapterNum!==s.chapterNum)&&(Vt.current={book:s.book,chapterNum:s.chapterNum},mt.current())},[s.book,s.chapterNum]);const Mt=()=>{var $;const C=($=m.current)==null?void 0:$.getElementsByClassName("editor-input")[0];C!=null&&C.textContent&&navigator.clipboard.writeText(C.textContent)},zt=c.useCallback(C=>{v(C),J(C,b)},[b,J]),ge=c.useCallback(C=>{j(C),J(g,C)},[g,J]),Jt=C=>{var K,q,Q,X,dt;N(C);const $=(q=(K=u.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Nt.isInsertEmbedOpOfType("note",$)){$.insert.note&&($.insert.note.style=C);const et=(X=(Q=$.insert.note)==null?void 0:Q.contents)==null?void 0:X.ops;k!=="x"&&C==="x"?et==null||et.forEach(kt=>el(kt)):k==="x"&&C!=="x"&&(et==null||et.forEach(kt=>nl(kt))),(dt=u.current)==null||dt.applyUpdate([$,{delete:1}])}},Bt=C=>{lt(C.contextMarker),S(C.canRedo)},Se=c.useCallback(C=>{var K,q,Q,X,dt;const $=(q=(K=u.current)==null?void 0:K.getNoteOps(0))==null?void 0:q.at(0);if($&&Nt.isInsertEmbedOpOfType("note",$)){C.content.length>1&&setTimeout(()=>{var St;(St=u.current)==null||St.applyUpdate([{retain:2},{delete:1}])},0);const et=(Q=$.insert.note)==null?void 0:Q.style,kt=(dt=(X=$.insert.note)==null?void 0:X.contents)==null?void 0:dt.ops;if(et||V(!1),V(et==="x"?!!(kt!=null&&kt.every(St=>{var ut,st;if(!((ut=St.attributes)!=null&&ut.char))return!0;const T=((st=St.attributes)==null?void 0:st.char).style;return T==="xt"||T==="xo"||T==="xq"})):!!(kt!=null&&kt.every(St=>{var ut,st;if(!((ut=St.attributes)!=null&&ut.char))return!0;const T=((st=St.attributes)==null?void 0:st.char).style;return T==="ft"||T==="fr"||T==="fq"}))),!R.current){R.current=!0,F.current=JSON.stringify($),A(!0);return}A(JSON.stringify($)===F.current),J(g,b)}else V(!1),A(!0)},[g,b,J]),M=c.useCallback(()=>{const C=window.getSelection();if(f.current&&Z.length&&C&&C.rangeCount>0){const $=C.getRangeAt(0).getBoundingClientRect(),K=f.current.getBoundingClientRect();U($.left-K.left),H($.top-K.top),Et($.height),I(!0)}},[Z,f]);return c.useEffect(()=>{const C=()=>{L&&I(!1)};return window.addEventListener("click",C),()=>{window.removeEventListener("click",C)}},[L]),c.useEffect(()=>{var C;L&&((C=nt.current)==null||C.focus())},[L]),c.useEffect(()=>{var K;const C=((K=m.current)==null?void 0:K.querySelector(".editor-input"))??void 0,$=q=>{!L&&C&&document.activeElement===C&&q.key===l?(q.preventDefault(),M()):L&&q.key==="Escape"&&(q.preventDefault(),I(!1))};return document.addEventListener("keydown",$),()=>{document.removeEventListener("keydown",$)}},[L,M,l]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:p,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Ji,{isTypeSwitchable:E,noteType:k,handleNoteTypeChange:Jt,localizedStrings:w}),n.jsx(Xi,{callerType:g,updateCallerType:zt,customCaller:b,updateCustomCaller:ge,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Bo,{onUndoClick:()=>{var C;return(C=u.current)==null?void 0:C.undo()},onRedoClick:()=>{var C;return(C=u.current)==null?void 0:C.redo()},canUndo:!z,canRedo:D,localizedStrings:w}),n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{onClick:tt,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.Check,{})})}),n.jsx(vt,{children:n.jsx("p",{children:w["%footnoteEditor_saveButton_tooltip%"]})})]})}),n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"ghost",children:n.jsx(_.X,{})})}),n.jsx(vt,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(Go,{editorRef:u,children:n.jsx(Nt.Editorial,{options:G,onStateChange:Bt,onUsjChange:Se,defaultUsj:rl,onScrRefChange:()=>{},scrRef:s,ref:u})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsx(B,{onClick:Mt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.Copy,{})})}),n.jsx(vt,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Lt,{open:L,children:[n.jsx(Kr,{className:"tw-absolute",style:{top:O,left:P,height:jt,width:0,pointerEvents:"none"}}),n.jsx($t,{className:"tw-w-[500px] tw-p-0",onClick:C=>{C.preventDefault(),C.stopPropagation()},children:n.jsx(qo,{markerMenuItems:Z,localizedStrings:w,searchRef:nt})})]})]})}const sl=Object.freeze([...Ko,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...zo]);function Uo(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function al(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(l=>{typeof l!="string"&&l.marker==="fp"?(a.length>0&&i.push(a),a=[l]):a.push(l)}),a.length>0&&i.push(a),i.map((l,w)=>{const d=w===i.length-1;return n.jsxs("p",{children:[Xn(t,l,r,!0,s),d&&o]},Uo(t,l))})}function Xn(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const l=h(`usfm_${t}`);return n.jsx("span",{className:l,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(_.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return il(i,Uo(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function il(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(_.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Xn(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Ho({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,l=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...l]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),m=a&&n.jsxs(n.Fragment,{children:[Xn(t.marker,[a],o,!1)," "]}),f=e==="horizontal"?"horizontal":"vertical",p=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=h(f,p);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[w,u]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:m}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:l&&l.length>0&&n.jsx(n.Fragment,{children:al(t.marker,l,o,d)})})]})}function ll({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:l=!1,formatCaller:w,onFootnoteSelected:d}){const u=w??y.getFormatCallerFunction(r,void 0),m=(k,N)=>{d==null||d(k,N,s)},f=i?r.findIndex(k=>k===i):-1,[p,g]=c.useState(f),v=(k,N,E)=>{if(r.length)switch(k.key){case"Enter":case" ":k.preventDefault(),d==null||d(N,E,s);break}},b=k=>{if(r.length)switch(k.key){case"ArrowDown":k.preventDefault(),g(N=>Math.min(N+1,r.length-1));break;case"ArrowUp":k.preventDefault(),g(N=>Math.max(N-1,0));break}},j=c.useRef([]);return c.useEffect(()=>{var k;p>=0&&p<j.current.length&&((k=j.current[p])==null||k.focus())},[p]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:p<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!l&&"formatted-font"),children:r.map((k,N)=>{const E=k===i,V=`${s}-${N}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:z=>{j.current[N]=z},role:"option","aria-selected":E,"data-marker":k.marker,"data-state":E?"selected":void 0,tabIndex:N===p?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(k,N),onKeyDown:z=>v(z,k,N),children:n.jsx(Ho,{footnote:k,layout:o,formatCaller:()=>u(k.caller,N),showMarkers:a})},V),N<r.length-1&&o==="vertical"&&n.jsx(ke,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function cl(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function wl({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=c.useMemo(()=>{const l=[],w=new Set;return t.forEach(d=>{const u=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(u)||(w.add(u),l.push(d))}),l},[t]);return n.jsxs(sn,{stickyHeader:!0,children:[n.jsx(an,{stickyHeader:!0,children:n.jsxs(Gt,{children:[n.jsx($e,{children:s}),n.jsx($e,{children:i})]})}),n.jsx(ln,{children:a.length>0&&a.map(l=>n.jsxs(Gt,{onClick:()=>{e(l.reference)},children:[n.jsx(ce,{children:y.formatScrRef(l.reference,"English")}),n.jsx(ce,{className:o,children:cl(l.text)})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}function Wn({className:t,ref:e,...r}){return n.jsx(rr.Root,{ref:e,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...r,children:n.jsx(rr.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})})}const dl=t=>{if(t==="asc")return n.jsx(_.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(_.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},ze=(t,e,r)=>n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsxs(yt,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),dl(t.getIsSorted())]}),n.jsx(vt,{side:"bottom",children:e})]})}),ul=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>ze(e,t)}),pl=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>ze(r,t)}),ml=t=>({accessorKey:"count",header:({column:e})=>ze(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),bn=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(w=>{e==="approved"?a.includes(w)||a.push(w):a=a.filter(d=>d!==w)}),o(a);let l=[...s];t.forEach(w=>{e==="unapproved"?l.includes(w)||l.push(w):l=l.filter(d=>d!==w)}),i(l)},fl=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>ze(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),l=i.getValue("item");return n.jsxs(Kn,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Oe,{onClick:w=>{w.stopPropagation(),bn([l],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(_.CircleCheckIcon,{})}),n.jsx(Oe,{onClick:w=>{w.stopPropagation(),bn([l],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(_.CircleXIcon,{})}),n.jsx(Oe,{onClick:w=>{w.stopPropagation(),bn([l],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(_.CircleHelpIcon,{})})]})}}),hl=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),gl=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},xl=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Yo=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",bl=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),vl=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},yl=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Yo(s,e,r),occurrences:o.occurrences||[]}}),Dt=(t,e)=>t[e]??e;function jl({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:l,columns:w,id:d,areInventoryItemsLoading:u=!1,classNameForVerseText:m,onItemSelected:f}){const p=Dt(r,"%webView_inventory_all%"),g=Dt(r,"%webView_inventory_approved%"),v=Dt(r,"%webView_inventory_unapproved%"),b=Dt(r,"%webView_inventory_unknown%"),j=Dt(r,"%webView_inventory_scope_currentBook%"),k=Dt(r,"%webView_inventory_scope_chapter%"),N=Dt(r,"%webView_inventory_scope_verse%"),E=Dt(r,"%webView_inventory_filter_text%"),V=Dt(r,"%webView_inventory_show_additional_items%"),z=Dt(r,"%webView_inventory_no_results%"),[A,D]=c.useState(!1),[S,R]=c.useState("all"),[F,L]=c.useState(""),[I,P]=c.useState([]),U=c.useMemo(()=>{const G=t??[];return G.length===0?[]:yl(G,s,i)},[t,s,i]),O=c.useMemo(()=>{if(A)return U;const G=[];return U.forEach(Z=>{const J=Z.items[0],tt=G.find(mt=>mt.items[0]===J);tt?(tt.count+=Z.count,tt.occurrences=tt.occurrences.concat(Z.occurrences)):G.push({items:[J],count:Z.count,occurrences:Z.occurrences,status:Z.status})}),G},[A,U]),H=c.useMemo(()=>O.length===0?[]:vl(O,S,F),[O,S,F]),jt=c.useMemo(()=>{var J,tt;if(!A)return w;const G=(J=o==null?void 0:o.tableHeaders)==null?void 0:J.length;if(!G)return w;const Z=[];for(let mt=0;mt<G;mt++)Z.push(pl(((tt=o==null?void 0:o.tableHeaders)==null?void 0:tt[mt])||"Additional Item",mt+1));return[...Z,...w]},[o==null?void 0:o.tableHeaders,w,A]);c.useEffect(()=>{H.length===0?P([]):H.length===1&&P(H[0].items)},[H]);const Et=(G,Z)=>{Z.setRowSelection(()=>{const tt={};return tt[G.index]=!0,tt});const J=G.original.items;P(J),f&&J.length>0&&f(J[0])},_t=G=>{if(G==="book"||G==="chapter"||G==="verse")l(G);else throw new Error(`Invalid scope value: ${G}`)},lt=G=>{if(G==="all"||G==="approved"||G==="unapproved"||G==="unknown")R(G);else throw new Error(`Invalid status filter value: ${G}`)},nt=c.useMemo(()=>{if(O.length===0||I.length===0)return[];const G=O.filter(Z=>y.deepEqual(A?Z.items:[Z.items[0]],I));if(G.length>1)throw new Error("Selected item is not unique");return G.length===0?[]:G[0].occurrences},[I,A,O]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(we,{onValueChange:G=>lt(G),defaultValue:S,children:[n.jsx(ue,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(de,{placeholder:"Select filter"})}),n.jsxs(pe,{children:[n.jsx(Ct,{value:"all",children:p}),n.jsx(Ct,{value:"approved",children:g}),n.jsx(Ct,{value:"unapproved",children:v}),n.jsx(Ct,{value:"unknown",children:b})]})]}),n.jsxs(we,{onValueChange:G=>_t(G),defaultValue:a,children:[n.jsx(ue,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(de,{placeholder:"Select scope"})}),n.jsxs(pe,{children:[n.jsx(Ct,{value:"book",children:j}),n.jsx(Ct,{value:"chapter",children:k}),n.jsx(Ct,{value:"verse",children:N})]})]}),n.jsx(Ee,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:E,value:F,onChange:G=>{L(G.target.value)}}),o&&n.jsx(pt,{children:n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(Wn,{className:"tw-m-1 tw-flex-shrink-0",checked:A,onCheckedChange:G=>{D(G)}}),n.jsx(at,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??V})]})}),n.jsx(vt,{children:(o==null?void 0:o.checkboxText)??V})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Po,{columns:jt,data:H,onRowClickHandler:Et,stickyHeader:!0,isLoading:u,noResultsMessage:z})}),nt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(wl,{classNameForText:m,occurrenceData:nt,setScriptureReference:e,localizedStrings:r})})]})})}const kl="16rem",_l="3rem",Xo=c.createContext(void 0);function Be(){const t=c.useContext(Xo);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}function Wo({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",ref:l,...w}){const[d,u]=c.useState(t),m=e??d,f=c.useCallback(N=>{const E=typeof N=="function"?N(m):N;r?r(E):u(E)},[r,m]),p=c.useCallback(()=>f(N=>!N),[f]),g=m?"expanded":"collapsed",j=ot()==="ltr"?a:a==="primary"?"secondary":"primary",k=c.useMemo(()=>({state:g,open:m,setOpen:f,toggleSidebar:p,side:j}),[g,m,f,p,j]);return n.jsx(Xo.Provider,{value:k,children:n.jsx(pt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":kl,"--sidebar-width-icon":_l,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:l,...w,children:i})})})}function Zo({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,ref:s,...i}){const a=Be();return e==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:s,...i,children:o}):n.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...i,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})}function Nl({className:t,onClick:e,ref:r,...o}){const s=Be();return n.jsxs(B,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...o,children:[s.side==="primary"?n.jsx(_.PanelLeft,{}):n.jsx(_.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})}function Cl({className:t,ref:e,...r}){const{toggleSidebar:o}=Be();return n.jsx("button",{type:"button",ref:e,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...r})}function Jo({className:t,ref:e,...r}){return n.jsx("main",{ref:e,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...r})}function El({className:t,ref:e,...r}){return n.jsx(Ee,{ref:e,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...r})}function Sl({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...r})}function Tl({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...r})}function Rl({className:t,ref:e,...r}){return n.jsx(ke,{ref:e,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...r})}function Qo({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...r})}function Tn({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...r})}function Rn({className:t,asChild:e=!1,ref:r,...o}){const s=e?_e.Slot:"div";return n.jsx(s,{ref:r,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...o})}function Ml({className:t,asChild:e=!1,ref:r,...o}){const s=e?_e.Slot:"button";return n.jsx(s,{ref:r,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...o})}function Mn({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",t),...r})}function ts({className:t,ref:e,...r}){return n.jsx("ul",{ref:e,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...r})}function es({className:t,ref:e,...r}){return n.jsx("li",{ref:e,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",t),...r})}const Dl=re.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}});function ns({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,ref:a,...l}){const w=t?_e.Slot:"button",{state:d}=Be(),u=n.jsx(w,{ref:a,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:h(Dl({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:u}),n.jsx(vt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):u}function Ol({className:t,asChild:e=!1,showOnHover:r=!1,ref:o,...s}){const i=e?_e.Slot:"button";return n.jsx(i,{ref:o,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...s})}function Il({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...r})}function Al({className:t,showIcon:e=!1,ref:r,...o}){const s=c.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...o,children:[e&&n.jsx(tn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(tn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})}function Pl({className:t,ref:e,...r}){return n.jsx("ul",{ref:e,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...r})}function Ll({ref:t,...e}){return n.jsx("li",{ref:t,...e})}function $l({asChild:t=!1,size:e="md",isActive:r,className:o,ref:s,...i}){const a=t?_e.Slot:"a";return n.jsx(a,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...i})}function rs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:l,className:w}){const d=c.useCallback((f,p)=>{o(f,p)},[o]),u=c.useCallback(f=>{const p=r.find(g=>g.projectId===f);return p?p.projectName:f},[r]),m=c.useCallback(f=>!s.projectId&&f===s.label,[s]);return n.jsx(Zo,{id:t,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(Qo,{children:[n.jsxs(Tn,{children:[n.jsx(Rn,{className:"tw-text-sm",children:i}),n.jsx(Mn,{children:n.jsx(ts,{children:Object.entries(e).map(([f,p])=>n.jsx(es,{children:n.jsx(ns,{onClick:()=>d(f),isActive:m(f),children:n.jsx("span",{className:"tw-pl-3",children:p})})},f))})})]}),n.jsxs(Tn,{children:[n.jsx(Rn,{className:"tw-text-sm",children:a}),n.jsx(Mn,{className:"tw-pl-3",children:n.jsx(We,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:Mr},options:r.flatMap(f=>f.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:f=>{const p=u(f);d(p,f)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(_.ScrollText,{})})})]})]})})}const cn=c.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},l)=>{const w=ot();return n.jsxs("div",{id:a,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(_.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(Ee,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(B,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(_.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});cn.displayName="SearchBar";function Fl({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:l,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(cn,{className:"tw-w-9/12",value:a,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(Wo,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(rs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:u}),n.jsx(Jo,{className:"tw-min-w-[215px]",children:o})]})]})}const Qt="scrBook",Vl="scrRef",ie="source",zl="details",Bl="Scripture Reference",Gl="Scripture Book",os="Type",Kl="Details";function ql(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Qt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Bl,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?rt.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Qt?y.formatScrRef(s.start):void 0},getGroupingValue:o=>rt.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:Vl,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:ie,header:r?(t==null?void 0:t.typeColumnName)??os:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:zl,header:(t==null?void 0:t.detailsColumnName)??Kl,cell:o=>o.getValue(),enableGrouping:!1}]}const Ul=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},_r=t=>`${Ul({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Hl({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:l,id:w}){const[d,u]=c.useState([]),[m,f]=c.useState([{id:Qt,desc:!1}]),[p,g]=c.useState({}),v=c.useMemo(()=>t.flatMap(S=>S.data.map(R=>({...R,source:S.source}))),[t]),b=c.useMemo(()=>ql({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);c.useEffect(()=>{d.includes(ie)?f([{id:ie,desc:!1},{id:Qt,desc:!1}]):f([{id:Qt,desc:!1}])},[d]);const j=gt.useReactTable({data:v,columns:b,state:{grouping:d,sorting:m,rowSelection:p},onGroupingChange:u,onSortingChange:f,onRowSelectionChange:g,getExpandedRowModel:gt.getExpandedRowModel(),getGroupedRowModel:gt.getGroupedRowModel(),getCoreRowModel:gt.getCoreRowModel(),getSortedRowModel:gt.getSortedRowModel(),getRowId:_r,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});c.useEffect(()=>{if(l){const S=j.getSelectedRowModel().rowsById,R=Object.keys(S);if(R.length===1){const F=v.find(L=>_r(L)===R[0])||void 0;F&&l(F)}}},[p,v,l,j]);const k=s??Gl,N=i??os,E=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[Qt]},{label:`Group by ${N}`,value:[ie]},{label:`Group by ${k} and ${N}`,value:[Qt,ie]},{label:`Group by ${N} and ${k}`,value:[ie,Qt]}],V=S=>{u(JSON.parse(S))},z=(S,R)=>{!S.getIsGrouped()&&!S.getIsSelected()&&S.getToggleSelectedHandler()(R)},A=(S,R)=>S.getIsGrouped()?"":h("banded-row",R%2===0?"even":"odd"),D=(S,R,F)=>{if(!((S==null?void 0:S.length)===0||R.depth<F.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(we,{value:JSON.stringify(d),onValueChange:S=>{V(S)},children:[n.jsx(ue,{className:"tw-mb-1 tw-mt-2",children:n.jsx(de,{})}),n.jsx(pe,{position:"item-aligned",children:n.jsx(Do,{children:E.map(S=>n.jsx(Ct,{value:JSON.stringify(S.value),children:S.label},S.label))})})]}),n.jsxs(sn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(an,{children:j.getHeaderGroups().map(S=>n.jsx(Gt,{children:S.headers.filter(R=>R.column.columnDef.header).map(R=>n.jsx($e,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:n.jsxs("div",{children:[R.column.getCanGroup()?n.jsx(B,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",gt.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},S.id))}),n.jsx(ln,{children:j.getRowModel().rows.map((S,R)=>{const F=ot();return n.jsx(Gt,{"data-state":S.getIsSelected()?"selected":"",className:h(A(S,R)),onClick:L=>z(S,L),children:S.getVisibleCells().map(L=>{if(!(L.getIsPlaceholder()||L.column.columnDef.enableGrouping&&!L.getIsGrouped()&&(L.column.columnDef.id!==ie||!r)))return n.jsx(ce,{className:h(L.column.columnDef.id,"tw-p-[1px]",D(d,S,L)),children:L.getIsGrouped()?n.jsxs(B,{variant:"link",onClick:S.getToggleExpandedHandler(),type:"button",children:[S.getIsExpanded()&&n.jsx(_.ChevronDown,{}),!S.getIsExpanded()&&(F==="ltr"?n.jsx(_.ChevronRight,{}):n.jsx(_.ChevronLeft,{}))," ",gt.flexRender(L.column.columnDef.cell,L.getContext())," (",S.subRows.length,")"]}):gt.flexRender(L.column.columnDef.cell,L.getContext())},L.id)})},S.id)})})]})]})}const Zn=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),ss=(t,e,r)=>Zn(t,e).every(o=>r.includes(o));function Yl({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=Zn(e,t).length===0,a=s["%scripture_section_ot_short%"],l=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(B,{variant:"outline",size:"sm",onClick:()=>o(t),className:h(ss(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Xs(t,a,l,w,d)})}const Nr=5,vn=6;function Xl({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:p,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,j]=c.useState(!1),[k,N]=c.useState(""),E=c.useRef(void 0),V=c.useRef(!1);if(t.length!==rt.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const z=c.useMemo(()=>rt.Canon.allBookIds.filter((P,U)=>t[U]==="1"&&!rt.Canon.isObsolete(rt.Canon.bookIdToNumber(P))),[t]),A=c.useMemo(()=>{if(!k.trim()){const O={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return z.forEach(H=>{const jt=y.getSectionForBook(H);O[jt].push(H)}),O}const P=z.filter(O=>Pn(O,k,s)),U={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return P.forEach(O=>{const H=y.getSectionForBook(O);U[H].push(O)}),U},[z,k,s]),D=c.useCallback((P,U=!1)=>{if(!U||!E.current){r(e.includes(P)?e.filter(lt=>lt!==P):[...e,P]),E.current=P;return}const O=z.findIndex(lt=>lt===E.current),H=z.findIndex(lt=>lt===P);if(O===-1||H===-1)return;const[jt,Et]=[Math.min(O,H),Math.max(O,H)],_t=z.slice(jt,Et+1).map(lt=>lt);r(e.includes(P)?e.filter(lt=>!_t.includes(lt)):[...new Set([...e,..._t])])},[e,r,z]),S=P=>{D(P,V.current),V.current=!1},R=(P,U)=>{P.preventDefault(),D(U,P.shiftKey)},F=c.useCallback(P=>{const U=Zn(z,P).map(O=>O);r(ss(z,P,e)?e.filter(O=>!U.includes(O)):[...new Set([...e,...U])])},[e,r,z]),L=()=>{r(z.map(P=>P))},I=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(P=>n.jsx(Yl,{section:P,availableBookIds:z,selectedBookIds:e,onToggle:F,localizedStrings:o},P))}),n.jsxs(Lt,{open:b,onOpenChange:P=>{j(P),P||N("")},children:[n.jsx(Wt,{asChild:!0,children:n.jsxs(B,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(_.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx($t,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Yt,{shouldFilter:!1,onKeyDown:P=>{P.key==="Enter"&&(V.current=P.shiftKey)},children:[n.jsx(Ne,{placeholder:l,value:k,onValueChange:N}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(B,{variant:"ghost",size:"sm",onClick:L,children:w}),n.jsx(B,{variant:"ghost",size:"sm",onClick:I,children:d})]}),n.jsxs(Xt,{children:[n.jsx(Fe,{children:u}),Object.values(y.Section).map((P,U)=>{const O=A[P];if(O.length!==0)return n.jsxs(c.Fragment,{children:[n.jsx(At,{heading:zr(P,f,p,g,v),children:O.map(H=>n.jsx(Gr,{bookId:H,isSelected:e.includes(H),onSelect:()=>S(H),onMouseDown:jt=>R(jt,H),section:y.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:Nn(H,s),className:"tw-flex tw-items-center"},H))}),U<Object.values(y.Section).length-1&&n.jsx(Vr,{})]},P)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===vn?vn:Nr).map(P=>n.jsx(je,{className:"hover:tw-bg-secondary",variant:"secondary",children:ve(P,s)},P)),e.length>vn&&n.jsx(je,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Nr} ${m}`})]})]})}const Wl=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),se=(t,e)=>t[e]??e;function Zl({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:l,id:w}){const d=se(a,"%webView_scope_selector_selected_text%"),u=se(a,"%webView_scope_selector_current_verse%"),m=se(a,"%webView_scope_selector_current_chapter%"),f=se(a,"%webView_scope_selector_current_book%"),p=se(a,"%webView_scope_selector_choose_books%"),g=se(a,"%webView_scope_selector_scope%"),v=se(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:u,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:p,id:"scope-selected"}],j=e?b.filter(k=>e.includes(k.value)):b;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(at,{children:g}),n.jsx($n,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:k,label:N,id:E})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{className:"tw-me-2",value:k,id:E}),n.jsx(at,{htmlFor:E,children:N})]},E))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(at,{children:v}),n.jsx(Xl,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:l})]})]})}const yn={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Jl({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const l={...yn,...Object.fromEntries(Object.entries(o).map(([d,u])=>[d,d===u&&d in yn?yn[d]:u]))},w=ot();return n.jsxs(we,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(ue,{size:s,className:h("pr-twp tw-w-auto",i),children:n.jsx(de,{placeholder:l[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(pe,{id:a,align:w==="rtl"?"end":"start",style:{zIndex:fe},children:t.map(d=>n.jsx(Ct,{value:`${d}`,children:l[y.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function Ql({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function tc({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function ec({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ke,{}):""]})}function as(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function en({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const is=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,w)=>l.order-w.order).map(l=>n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:"command"in l?n.jsxs(Qe,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(en,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(en,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(Eo,{children:[n.jsx(To,{children:l.label}),n.jsx(Co,{children:n.jsx(Ro,{children:is(t,e,as(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(vt,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function nn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:l}){return n.jsxs(Ut,{variant:i,children:[n.jsx(ne,{"aria-label":r,className:s,asChild:!0,id:l,children:n.jsx(B,{variant:a,size:"icon",children:o??n.jsx(_.MenuIcon,{})})}),n.jsx(Ht,{align:"start",style:{zIndex:fe},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,u)=>n.jsxs(c.Fragment,{children:[n.jsx(Yn,{children:n.jsx(pt,{children:is(e.groups,e.items,w,t)})}),d<u.length-1&&n.jsx(Ce,{})]},w))})]})}const ls=c.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function nc({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:l,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(ls,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(nn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(_.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:a}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(nn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(_.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function rc({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(ls,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(nn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Jn=c.forwardRef(({className:t,...e},r)=>{const o=ot();return n.jsx(Rt.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Jn.displayName=Rt.List.displayName;const Qn=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Qn.displayName=Rt.List.displayName;const cs=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.Trigger,{ref:r,...e,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),tr=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));tr.displayName=Rt.Content.displayName;function oc({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(cn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Jn,{children:[n.jsx(Qn,{children:t.map(l=>n.jsx(cs,{value:l.value,children:l.value},l.key))}),t.map(l=>n.jsx(tr,{value:l.value,children:l.content},l.key))]})]})}function sc({...t}){return n.jsx(It.Menu,{...t})}function ac({...t}){return n.jsx(It.Sub,{"data-slot":"menubar-sub",...t})}function ic({className:t,variant:e="default",ref:r,...o}){const s=c.useMemo(()=>({variant:e}),[e]);return n.jsx(Hn.Provider,{value:s,children:n.jsx(It.Root,{ref:r,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...o})})}function lc({className:t,ref:e,...r}){const o=Zt();return n.jsx(It.Trigger,{ref:e,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",he({variant:o.variant,className:t})),...r})}function cc({className:t,inset:e,children:r,ref:o,...s}){const i=Zt();return n.jsxs(It.SubTrigger,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",he({variant:i.variant,className:t}),t),...s,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function wc({className:t,ref:e,...r}){const o=Zt();return n.jsx(It.SubContent,{ref:e,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...r})}function dc({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,ref:s,...i}){const a=Zt();return n.jsx(It.Portal,{children:n.jsx(It.Content,{ref:s,align:e,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...i})})}function uc({className:t,inset:e,ref:r,...o}){const s=Zt();return n.jsx(It.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",he({variant:s.variant,className:t}),t),...o})}function pc({className:t,ref:e,...r}){return n.jsx(It.Separator,{ref:e,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}const Re=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},ws=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const l=e.filter(d=>d.group===i).sort((d,u)=>d.order-u.order).map(d=>n.jsxs(bt,{children:[n.jsx(yt,{asChild:!0,children:"command"in d?n.jsxs(uc,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(en,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(en,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(ac,{children:[n.jsx(cc,{children:d.label}),n.jsx(wc,{children:ws(t,e,as(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(vt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...l];return l.length>0&&a<s.length-1&&w.push(n.jsx(pc,{},`separator-${i}`)),w})};function mc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=c.useRef(void 0),i=c.useRef(void 0),a=c.useRef(void 0),l=c.useRef(void 0),w=c.useRef(void 0),d=u=>{switch(u){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return l;case"platform.help":return w;default:return}};if(Is.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,m)=>{var g,v,b,j;u.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},p={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":Re(i,[f]);break;case"alt+p":(g=i.current)==null||g.focus(),Re(i,[f,p]);break;case"alt+l":(v=a.current)==null||v.focus(),Re(a,[f,p]);break;case"alt+n":(b=l.current)==null||b.focus(),Re(l,[f,p]);break;case"alt+h":(j=w.current)==null||j.focus(),Re(w,[f,p]);break}}),c.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(p=>{p.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(p=>{u.observe(p,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(ic,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,m])=>typeof u=="boolean"||typeof m=="boolean"?0:u.order-m.order).map(([u,m])=>n.jsxs(sc,{children:[n.jsx(lc,{ref:d(u),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(dc,{style:{zIndex:fe},children:n.jsx(pt,{children:ws(t.groups,t.items,u,e)})})]},u))})}function fc(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function hc({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:l,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const u=c.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(mc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const gc=(t,e)=>t[e]??e;function xc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:l,id:w}){const d=gc(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,m]=c.useState(!1),f=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),i&&r.find(v=>v===g)&&i([...r.filter(v=>v!==g)]),m(!1)},p=(g,v)=>{var j,k,N,E,V,z;const b=v!==g?((k=(j=t[g])==null?void 0:j.uiNames)==null?void 0:k[v])??((E=(N=t[g])==null?void 0:N.uiNames)==null?void 0:E.en):void 0;return b?`${(V=t[g])==null?void 0:V.autonym} (${b})`:(z=t[g])==null?void 0:z.autonym};return n.jsxs("div",{id:w,className:h("pr-twp tw-max-w-sm",l),children:[n.jsxs(we,{name:"uiLanguage",value:e,onValueChange:f,open:u,onOpenChange:g=>m(g),children:[n.jsx(ue,{children:n.jsx(de,{})}),n.jsx(pe,{style:{zIndex:fe},children:Object.keys(t).map(g=>n.jsx(Ct,{value:g,children:p(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(at,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>p(g,e)).join(", "):t.en.autonym})})})]})}function bc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(at,{children:e(t)}):r?n.jsx(at,{children:r(t)}):n.jsx(at,{children:t})}function vc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Wn,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:w=>s(l,w)}),n.jsx(bc,{item:l,createLabel:i,createComplexLabel:a})]},l))})}function yc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,selectedButtons:l,hoverButtons:w,dropdownContent:d,additionalContent:u,accentColor:m,showDropdownOnHover:f=!1}){const p=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&l,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&f&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(Ut,{children:[n.jsx(ne,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:d})]})}),e&&d&&n.jsxs(Ut,{children:[n.jsx(ne,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(B,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(_.MoreVertical,{})})}),n.jsx(Ht,{align:"end",children:d})]})]}),u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const ds=c.forwardRef(({className:t,...e},r)=>n.jsx(_.LoaderCircle,{size:35,className:h("tw-animate-spin",t),...e,ref:r}));ds.displayName="Spinner";function jc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:l=!1,className:w,defaultValue:d,value:u,onChange:m,onFocus:f,onBlur:p}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(at,{htmlFor:t,className:h({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(Ee,{id:t,disabled:e,placeholder:a,required:l,className:h(w,{"tw-border-red-600":r}),defaultValue:d,value:u,onChange:m,onFocus:f,onBlur:p}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const kc=re.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}});function _c({className:t,variant:e,ref:r,...o}){return n.jsx("div",{ref:r,role:"alert",className:h("pr-twp",kc({variant:e}),t),...o})}function Nc({className:t,ref:e,...r}){return n.jsxs("h5",{ref:e,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...r,children:[r.children," "]})}function Cc({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:h("tw-text-sm [&_p]:tw-leading-relaxed",t),...r})}const Ec=wt.Root,Sc=wt.Trigger,Tc=wt.Group,Rc=wt.Portal,Mc=wt.Sub,Dc=wt.RadioGroup;function Oc({className:t,inset:e,children:r,ref:o,...s}){return n.jsxs(wt.SubTrigger,{ref:o,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...s,children:[r,n.jsx(_.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function Ic({className:t,ref:e,...r}){return n.jsx(wt.SubContent,{ref:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}function Ac({className:t,ref:e,...r}){return n.jsx(wt.Portal,{children:n.jsx(wt.Content,{ref:e,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})})}function Pc({className:t,inset:e,ref:r,...o}){return n.jsx(wt.Item,{ref:r,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...o})}function Lc({className:t,children:e,checked:r,ref:o,...s}){return n.jsxs(wt.CheckboxItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...s,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(_.Check,{className:"tw-h-4 tw-w-4"})})}),e]})}function $c({className:t,children:e,ref:r,...o}){return n.jsxs(wt.RadioItem,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(wt.ItemIndicator,{children:n.jsx(_.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})}function Fc({className:t,inset:e,ref:r,...o}){return n.jsx(wt.Label,{ref:r,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...o})}function Vc({className:t,ref:e,...r}){return n.jsx(wt.Separator,{ref:e,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...r})}function zc({className:t,...e}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}const us=c.createContext({direction:"bottom"});function Bc({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=c.useMemo(()=>({direction:e}),[e]);return n.jsx(us.Provider,{value:o,children:n.jsx(oe.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}const Gc=oe.Drawer.Trigger,ps=oe.Drawer.Portal,Kc=oe.Drawer.Close;function ms({className:t,ref:e,...r}){return n.jsx(oe.Drawer.Overlay,{ref:e,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...r})}function qc({className:t,children:e,hideDrawerHandle:r=!1,ref:o,...s}){const{direction:i="bottom"}=c.useContext(us),a={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ps,{children:[n.jsx(ms,{}),n.jsxs(oe.Drawer.Content,{ref:o,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",a[i],t),...s,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})}function Uc({className:t,...e}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}function Hc({className:t,...e}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}function Yc({className:t,ref:e,...r}){return n.jsx(oe.Drawer.Title,{ref:e,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...r})}function Xc({className:t,ref:e,...r}){return n.jsx(oe.Drawer.Description,{ref:e,className:h("tw-text-sm tw-text-muted-foreground",t),...r})}function Wc({className:t,value:e,ref:r,...o}){return n.jsx(or.Root,{ref:r,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...o,children:n.jsx(or.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})})}function Zc({className:t,...e}){return n.jsx(On.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Jc=On.Panel;function Qc({withHandle:t,className:e,...r}){return n.jsx(On.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(_.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function tw({...t}){return n.jsx(Tr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}function ew({className:t,ref:e,...r}){const o=ot();return n.jsxs(Ge.Root,{ref:e,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...r,dir:o,children:[n.jsx(Ge.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Ge.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Ge.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})}function nw({className:t,ref:e,...r}){const o=ot();return n.jsx(sr.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...r,ref:e,children:n.jsx(sr.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})}const rw=Rt.Root;function ow({className:t,ref:e,...r}){const o=ot();return n.jsx(Rt.List,{ref:e,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...r,dir:o})}function sw({className:t,ref:e,...r}){return n.jsx(Rt.Trigger,{ref:e,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...r})}function aw({className:t,ref:e,...r}){return n.jsx(Rt.Content,{ref:e,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...r})}function iw({className:t,ref:e,...r}){return n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:e,...r})}const lw=(t,e)=>{c.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function cw(t){return{preserveValue:!0,...t}}const fs=(t,e,r={})=>{const o=c.useRef(e);o.current=e;const s=c.useRef(r);s.current=cw(s.current);const[i,a]=c.useState(()=>o.current),[l,w]=c.useState(!0);return c.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const u=await t();d&&(a(()=>u),w(!1))}})(),()=>{d=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,l]},jn=()=>!1,ww=(t,e)=>{const[r]=fs(c.useCallback(async()=>{if(!t)return jn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),jn,{preserveValue:!1});c.useEffect(()=>()=>{r!==jn&&r()},[r])};function dw(t){c.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Tr.toast});exports.Alert=_c;exports.AlertDescription=Cc;exports.AlertTitle=Nc;exports.Avatar=_o;exports.AvatarFallback=No;exports.AvatarImage=Ci;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=ea;exports.BOOK_SELECTOR_STRING_KEYS=oa;exports.Badge=je;exports.BookChapterControl=ta;exports.BookSelector=sa;exports.Button=B;exports.COMMENT_EDITOR_STRING_KEYS=xi;exports.COMMENT_LIST_STRING_KEYS=bi;exports.Card=jo;exports.CardContent=ko;exports.CardDescription=_i;exports.CardFooter=Ni;exports.CardHeader=ji;exports.CardTitle=ki;exports.ChapterRangeSelector=Ur;exports.Checkbox=Wn;exports.Checklist=vc;exports.ComboBox=We;exports.Command=Yt;exports.CommandEmpty=Fe;exports.CommandGroup=At;exports.CommandInput=Ne;exports.CommandItem=Pt;exports.CommandList=Xt;exports.CommentEditor=gi;exports.CommentList=Ti;exports.ContextMenu=Ec;exports.ContextMenuCheckboxItem=Lc;exports.ContextMenuContent=Ac;exports.ContextMenuGroup=Tc;exports.ContextMenuItem=Pc;exports.ContextMenuLabel=Fc;exports.ContextMenuPortal=Rc;exports.ContextMenuRadioGroup=Dc;exports.ContextMenuRadioItem=$c;exports.ContextMenuSeparator=Vc;exports.ContextMenuShortcut=zc;exports.ContextMenuSub=Mc;exports.ContextMenuSubContent=Ic;exports.ContextMenuSubTrigger=Oc;exports.ContextMenuTrigger=Sc;exports.DataTable=Po;exports.Dialog=Ir;exports.DialogClose=qs;exports.DialogContent=Lr;exports.DialogDescription=Hs;exports.DialogFooter=Us;exports.DialogHeader=$r;exports.DialogOverlay=Pr;exports.DialogPortal=Ar;exports.DialogTitle=Fr;exports.DialogTrigger=Ks;exports.Drawer=Bc;exports.DrawerClose=Kc;exports.DrawerContent=qc;exports.DrawerDescription=Xc;exports.DrawerFooter=Hc;exports.DrawerHeader=Uc;exports.DrawerOverlay=ms;exports.DrawerPortal=ps;exports.DrawerTitle=Yc;exports.DrawerTrigger=Gc;exports.DropdownMenu=Ut;exports.DropdownMenuCheckboxItem=Kt;exports.DropdownMenuContent=Ht;exports.DropdownMenuGroup=Yn;exports.DropdownMenuItem=Qe;exports.DropdownMenuItemType=Fo;exports.DropdownMenuLabel=Ve;exports.DropdownMenuPortal=Co;exports.DropdownMenuRadioGroup=So;exports.DropdownMenuRadioItem=Mo;exports.DropdownMenuSeparator=Ce;exports.DropdownMenuShortcut=Ei;exports.DropdownMenuSub=Eo;exports.DropdownMenuSubContent=Ro;exports.DropdownMenuSubTrigger=To;exports.DropdownMenuTrigger=ne;exports.ERROR_DUMP_STRING_KEYS=Lo;exports.ERROR_POPOVER_STRING_KEYS=zi;exports.EditorKeyboardShortcuts=Go;exports.ErrorDump=$o;exports.ErrorPopover=Bi;exports.FOOTNOTE_EDITOR_STRING_KEYS=sl;exports.Filter=Hi;exports.FilterDropdown=Gi;exports.Footer=Ui;exports.FootnoteEditor=ol;exports.FootnoteItem=Ho;exports.FootnoteList=ll;exports.INVENTORY_STRING_KEYS=bl;exports.Input=Ee;exports.Inventory=jl;exports.Label=at;exports.MARKER_MENU_STRING_KEYS=Ko;exports.MarkdownRenderer=Vi;exports.MarkerMenu=qo;exports.MoreInfo=Ki;exports.MultiSelectComboBox=Vo;exports.NavigationContentSearch=oc;exports.Popover=Lt;exports.PopoverAnchor=Kr;exports.PopoverContent=$t;exports.PopoverTrigger=Wt;exports.Progress=Wc;exports.RadioGroup=$n;exports.RadioGroupItem=Xe;exports.RecentSearches=qr;exports.ResizableHandle=Qc;exports.ResizablePanel=Jc;exports.ResizablePanelGroup=Zc;exports.ResultsCard=yc;exports.SCOPE_SELECTOR_STRING_KEYS=Wl;exports.ScopeSelector=Zl;exports.ScriptureResultsViewer=Hl;exports.ScrollGroupSelector=Jl;exports.SearchBar=cn;exports.Select=we;exports.SelectContent=pe;exports.SelectGroup=Do;exports.SelectItem=Ct;exports.SelectLabel=Mi;exports.SelectScrollDownButton=Ao;exports.SelectScrollUpButton=Io;exports.SelectSeparator=Di;exports.SelectTrigger=ue;exports.SelectValue=de;exports.Separator=ke;exports.SettingsList=Ql;exports.SettingsListHeader=ec;exports.SettingsListItem=tc;exports.SettingsSidebar=rs;exports.SettingsSidebarContentSearch=Fl;exports.Sidebar=Zo;exports.SidebarContent=Qo;exports.SidebarFooter=Tl;exports.SidebarGroup=Tn;exports.SidebarGroupAction=Ml;exports.SidebarGroupContent=Mn;exports.SidebarGroupLabel=Rn;exports.SidebarHeader=Sl;exports.SidebarInput=El;exports.SidebarInset=Jo;exports.SidebarMenu=ts;exports.SidebarMenuAction=Ol;exports.SidebarMenuBadge=Il;exports.SidebarMenuButton=ns;exports.SidebarMenuItem=es;exports.SidebarMenuSkeleton=Al;exports.SidebarMenuSub=Pl;exports.SidebarMenuSubButton=$l;exports.SidebarMenuSubItem=Ll;exports.SidebarProvider=Wo;exports.SidebarRail=Cl;exports.SidebarSeparator=Rl;exports.SidebarTrigger=Nl;exports.Skeleton=tn;exports.Slider=ew;exports.Sonner=tw;exports.Spinner=ds;exports.Switch=nw;exports.TabDropdownMenu=nn;exports.TabFloatingMenu=rc;exports.TabToolbar=nc;exports.Table=sn;exports.TableBody=ln;exports.TableCaption=Fi;exports.TableCell=ce;exports.TableFooter=Ai;exports.TableHead=$e;exports.TableHeader=an;exports.TableRow=Gt;exports.Tabs=rw;exports.TabsContent=aw;exports.TabsList=ow;exports.TabsTrigger=sw;exports.TextField=jc;exports.Textarea=iw;exports.ToggleGroup=Kn;exports.ToggleGroupItem=Oe;exports.Toolbar=hc;exports.Tooltip=bt;exports.TooltipContent=vt;exports.TooltipProvider=pt;exports.TooltipTrigger=yt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=zo;exports.UiLanguageSelector=xc;exports.UndoRedoButtons=Bo;exports.VerticalTabs=Jn;exports.VerticalTabsContent=tr;exports.VerticalTabsList=Qn;exports.VerticalTabsTrigger=cs;exports.Z_INDEX_ABOVE_DOCK=fe;exports.Z_INDEX_FOOTNOTE_EDITOR=In;exports.Z_INDEX_MODAL=Or;exports.Z_INDEX_MODAL_BACKDROP=Dr;exports.Z_INDEX_OVERLAY=Mr;exports.badgeVariants=yo;exports.buttonVariants=Ln;exports.cn=h;exports.getBookIdFromUSFM=xl;exports.getInventoryHeader=ze;exports.getLinesFromUSFM=hl;exports.getNumberFromUSFM=gl;exports.getStatusForItem=Yo;exports.getToolbarOSReservedSpaceClassName=fc;exports.inventoryCountColumn=ml;exports.inventoryItemColumn=ul;exports.inventoryStatusColumn=fl;exports.selectTriggerVariants=Oo;exports.useEvent=lw;exports.useEventAsync=ww;exports.useListbox=vo;exports.usePromise=fs;exports.useRecentSearches=Ws;exports.useSidebar=Be;exports.useStylesheet=dw;function uw(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}uw(`*, ::before, ::after {
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
.tw-max-w-\\[200px\\] {
  max-width: 200px;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
