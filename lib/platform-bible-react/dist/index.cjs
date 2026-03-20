"use strict";var ls=Object.defineProperty;var cs=(t,e,r)=>e in t?ls(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var dt=(t,e,r)=>cs(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),de=require("cmdk"),N=require("lucide-react"),ws=require("clsx"),ds=require("tailwind-merge"),us=require("@radix-ui/react-dialog"),tt=require("@sillsdev/scripture"),y=require("platform-bible-utils"),c=require("react"),ye=require("@radix-ui/react-slot"),Jt=require("class-variance-authority"),ps=require("@radix-ui/react-popover"),ms=require("@radix-ui/react-label"),fs=require("@radix-ui/react-radio-group"),x=require("lexical"),jr=require("@radix-ui/react-tooltip"),vn=require("@lexical/rich-text"),tr=require("react-dom"),hs=require("@lexical/table"),gs=require("@radix-ui/react-toggle-group");require("@radix-ui/react-toggle");const kr=require("@lexical/headless"),xs=require("@radix-ui/react-separator"),bs=require("@radix-ui/react-avatar"),_r=require("@radix-ui/react-dropdown-menu"),pt=require("@tanstack/react-table"),vs=require("@radix-ui/react-select"),ys=require("markdown-to-jsx"),yt=require("@eten-tech-foundation/platform-editor"),js=require("@radix-ui/react-checkbox"),ks=require("@radix-ui/react-tabs"),_s=require("@radix-ui/react-menubar"),Ns=require("react-hotkeys-hook"),Cs=require("@radix-ui/react-context-menu"),Zt=require("vaul"),Es=require("@radix-ui/react-progress"),Ss=require("react-resizable-panels"),Nr=require("sonner"),Ts=require("@radix-ui/react-slider"),Rs=require("@radix-ui/react-switch");function st(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const ge=st(us),Re=st(ps),Ms=st(ms),yn=st(fs),Qe=st(jr),Cr=st(gs),Ds=st(xs),Tn=st(bs),it=st(_r),mt=st(vs),er=st(js),Rt=st(ks),Ot=st(_s),lt=st(Cs),nr=st(Es),Rn=st(Ss),Fe=st(Ts),rr=st(Rs),Is=ds.extendTailwindMerge({prefix:"tw-"});function f(...t){return Is(ws.clsx(t))}const Os="layoutDirection";function at(){const t=localStorage.getItem(Os);return t==="rtl"?t:"ltr"}const As=ge.Root,Ps=ge.Portal;function Ls({className:t,ref:e,...r}){return n.jsx(ge.Overlay,{ref:e,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...r})}function $s({className:t,children:e,ref:r,...o}){const s=at();return n.jsxs(Ps,{children:[n.jsx(Ls,{}),n.jsxs(ge.Content,{ref:r,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...o,dir:s,children:[e,n.jsxs(ge.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(N.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})}function Er({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Er.displayName="DialogHeader";function Fs({className:t,ref:e,...r}){return n.jsx(ge.Title,{ref:e,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...r})}function Kt({className:t,ref:e,...r}){return n.jsx(de.Command,{ref:e,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...r})}function je({className:t,ref:e,...r}){const o=at();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(N.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(de.Command.Input,{ref:e,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...r})]})}function qt({className:t,ref:e,...r}){return n.jsx(de.Command.List,{ref:e,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...r})}function Oe({ref:t,...e}){return n.jsx(de.Command.Empty,{ref:t,className:"tw-py-6 tw-text-center tw-text-sm",...e})}function Bt({className:t,ref:e,...r}){return n.jsx(de.Command.Group,{ref:e,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...r})}function Vs({className:t,ref:e,...r}){return n.jsx(de.Command.Separator,{ref:e,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...r})}function At({className:t,ref:e,...r}){return n.jsx(de.Command.Item,{ref:e,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...r})}function Sr({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Sr.displayName="CommandShortcut";const Tr=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},zs=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function he(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??tt.Canon.bookIdToEnglishName(t)}function Mn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Rr=tt.Canon.allBookIds.filter(t=>!tt.Canon.isObsolete(tt.Canon.bookIdToNumber(t))),se=Object.fromEntries(Rr.map(t=>[t,tt.Canon.bookIdToEnglishName(t)]));function Dn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=tt.Canon.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(i?y.includes(i.localizedName.toLowerCase(),o)||y.includes(i.localizedId.toLowerCase(),o):!1))}const Mr=c.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:i,showCheck:a=!1,localizedBookNames:l,commandValue:d},w)=>{const u=c.useRef(!1),p=()=>{u.current||r==null||r(t),setTimeout(()=>{u.current=!1},100)},h=v=>{u.current=!0,o?o(v):r==null||r(t)},m=c.useMemo(()=>he(t,l),[t,l]),g=c.useMemo(()=>Mn(t,l),[t,l]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(At,{ref:w,value:d||`${t} ${tt.Canon.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${tt.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[a&&n.jsx(N.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),In=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}});function G({className:t,variant:e,size:r,asChild:o=!1,ref:s,...i}){const a=o?ye.Slot:"button";return n.jsx(a,{className:f(In({variant:e,size:r,className:t})),ref:s,...i})}const Pt=Re.Root,Ut=Re.Trigger,Dr=Re.Anchor;function Lt({className:t,align:e="center",sideOffset:r=4,ref:o,...s}){const i=at();return n.jsx(Re.Portal,{children:n.jsx(Re.Content,{ref:o,align:e,sideOffset:r,className:f("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...s,dir:i})})}function jn(t,e,r){return`${t} ${se[t]}${e?` ${Mn(t,e)} ${he(t,e)}`:""}${r?` ${r}`:""}`}function Ir({recentSearches:t,onSearchItemSelect:e,renderItem:r=d=>String(d),getItemKey:o=d=>String(d),ariaLabel:s="Show recent searches",groupHeading:i="Recent",id:a,classNameForItems:l}){const[d,w]=c.useState(!1);if(t.length===0)return;const u=p=>{e(p),w(!1)};return n.jsxs(Pt,{open:d,onOpenChange:w,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(G,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(N.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Lt,{id:a,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Kt,{children:n.jsx(qt,{children:n.jsx(Bt,{heading:i,children:t.map(p=>n.jsxs(At,{onSelect:()=>u(p),className:f("tw-flex tw-items-center",l),children:[n.jsx(N.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function Gs(t,e,r=(s,i)=>s===i,o=15){return s=>{const i=t.filter(l=>!r(l,s)),a=[s,...i.slice(0,o-1)];e(a)}}const an={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Bs=[an.BOOK_ONLY,an.BOOK_CHAPTER,an.BOOK_CHAPTER_VERSE];function or(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function It(t){return y.getChaptersForBook(tt.Canon.bookIdToNumber(t))}function Ks(t,e,r){if(!t.trim()||e.length===0)return;const o=Bs.reduce((s,i)=>{if(s)return s;const a=i.exec(t.trim());if(a){const[l,d=void 0,w=void 0]=a.slice(1);let u;const p=e.filter(h=>Dn(h,l,r));if(p.length===1&&([u]=p),!u&&d){if(tt.Canon.isBookIdValid(l)){const h=l.toUpperCase();e.includes(h)&&(u=h)}if(!u&&r){const h=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===l.toLowerCase());h&&e.includes(h[0])&&([u]=h)}}if(!u&&d){const m=(g=>Object.keys(se).find(v=>se[v].toLowerCase()===g.toLowerCase()))(l);if(m&&e.includes(m)&&(u=m),!u&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===l.toLowerCase());g&&e.includes(g[0])&&([u]=g)}}if(u){let h=d?parseInt(d,10):void 0;h&&h>It(u)&&(h=Math.max(It(u),1));const m=w?parseInt(w,10):void 0;return{book:u,chapterNum:h,verseNum:m}}}},void 0);if(o)return o}function qs(t,e,r,o){const s=c.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const d=e.indexOf(t.book);if(d>0){const w=e[d-1],u=Math.max(It(w),1);o({book:w,chapterNum:u,verseNum:1})}}},[t,e,o]),i=c.useCallback(()=>{const d=It(t.book);if(t.chapterNum<d)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const w=e.indexOf(t.book);if(w<e.length-1){const u=e[w+1];o({book:u,chapterNum:1,verseNum:1})}}},[t,e,o]),a=c.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=c.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return c.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?N.ChevronsLeft:N.ChevronsRight},{onClick:a,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?N.ChevronLeft:N.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?N.ChevronRight:N.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===It(t.book)||It(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?N.ChevronsRight:N.ChevronsLeft}],[t,e,r,s,a,l,i])}function sr({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:i}){if(t)return n.jsx(Bt,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:It(t)},(a,l)=>l+1).map(a=>n.jsx(At,{value:`${t} ${se[t]||""} ${a}`,onSelect:()=>r(a),ref:o(a),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&a===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(a))??!1}),children:a},a))})})}function Us({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:i,recentSearches:a,onAddRecentSearch:l,id:d}){const w=at(),[u,p]=c.useState(!1),[h,m]=c.useState(""),[g,v]=c.useState(""),[b,j]=c.useState("books"),[k,C]=c.useState(void 0),[_,z]=c.useState(!1),$=c.useRef(void 0),T=c.useRef(void 0),L=c.useRef(void 0),E=c.useRef(void 0),R=c.useRef({}),F=c.useCallback(S=>{e(S),l&&l(S)},[e,l]),V=c.useMemo(()=>o?o():Rr,[o]),O=c.useMemo(()=>({[y.Section.OT]:V.filter(q=>tt.Canon.isBookOT(q)),[y.Section.NT]:V.filter(q=>tt.Canon.isBookNT(q)),[y.Section.DC]:V.filter(q=>tt.Canon.isBookDC(q)),[y.Section.Extra]:V.filter(q=>tt.Canon.extraBooks().includes(q))}),[V]),A=c.useMemo(()=>Object.values(O).flat(),[O]),K=c.useMemo(()=>{if(!g.trim())return O;const S={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach(J=>{S[J]=O[J].filter(Z=>Dn(Z,g,s))}),S},[O,g,s]),D=c.useMemo(()=>Ks(g,A,s),[g,A,s]),U=c.useCallback(()=>{D&&(F({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),p(!1),v(""),m(""))},[F,D]),xt=c.useCallback(S=>{if(It(S)<=1){F({book:S,chapterNum:1,verseNum:1}),p(!1),v("");return}C(S),j("chapters")},[F]),Nt=c.useCallback(S=>{const q=b==="chapters"?k:D==null?void 0:D.book;q&&(F({book:q,chapterNum:S,verseNum:1}),p(!1),j("books"),C(void 0),v(""))},[F,b,k,D]),Ct=c.useCallback(S=>{F(S),p(!1),v("")},[F]),et=qs(t,A,w,e),P=c.useCallback(()=>{j("books"),C(void 0),setTimeout(()=>{T.current&&T.current.focus()},0)},[]),M=c.useCallback(S=>{if(!S&&b==="chapters"){P();return}p(S),S&&(j("books"),C(void 0),v(""))},[b,P]),{otLong:B,ntLong:Y,dcLong:X,extraLong:Q}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},ft=c.useCallback(S=>Tr(S,B,Y,X,Q),[B,Y,X,Q]),nt=c.useCallback(S=>D?!!D.chapterNum&&!S.toString().includes(D.chapterNum.toString()):!1,[D]),ht=c.useMemo(()=>y.formatScrRef(t,s?he(t.book,s):"English"),[t,s]),Et=c.useCallback(S=>q=>{R.current[S]=q},[]),ct=c.useCallback(S=>{(S.key==="Home"||S.key==="End")&&S.stopPropagation()},[]),wt=c.useCallback(S=>{if(S.ctrlKey)return;const{isLetter:q,isDigit:J}=or(S.key);if(b==="chapters"){if(S.key==="Backspace"){S.preventDefault(),S.stopPropagation(),P();return}if(q||J){if(S.preventDefault(),S.stopPropagation(),j("books"),C(void 0),J&&k){const Z=se[k];v(`${Z} ${S.key}`)}else v(S.key);setTimeout(()=>{T.current&&T.current.focus()},0);return}}if((b==="chapters"||b==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(S.key)){const Z=b==="chapters"?k:D==null?void 0:D.book;if(!Z)return;const rt=(()=>{if(!h)return 1;const ee=h.match(/(\d+)$/);return ee?parseInt(ee[1],10):0})(),Vt=It(Z);if(!Vt)return;let gt=rt;const $e=6;switch(S.key){case"ArrowLeft":rt!==0&&(gt=rt>1?rt-1:Vt);break;case"ArrowRight":rt!==0&&(gt=rt<Vt?rt+1:1);break;case"ArrowUp":gt=rt===0?Vt:Math.max(1,rt-$e);break;case"ArrowDown":gt=rt===0?1:Math.min(Vt,rt+$e);break;default:return}gt!==rt&&(S.preventDefault(),S.stopPropagation(),m(jn(Z,s,gt)),setTimeout(()=>{const ee=R.current[gt];ee&&ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,D,P,k,h,s]),Ft=c.useCallback(S=>{if(S.shiftKey||S.key==="Tab"||S.key===" ")return;const{isLetter:q,isDigit:J}=or(S.key);(q||J)&&(S.preventDefault(),v(Z=>Z+S.key),T.current.focus(),z(!1))},[]);return c.useLayoutEffect(()=>{const S=setTimeout(()=>{if(u&&b==="books"&&L.current&&E.current){const q=L.current,J=E.current,Z=J.offsetTop,rt=q.clientHeight,Vt=J.clientHeight,gt=Z-rt/2+Vt/2;q.scrollTo({top:Math.max(0,gt),behavior:"smooth"}),m(jn(t.book))}},0);return()=>{clearTimeout(S)}},[u,b,g,D,t.book]),c.useLayoutEffect(()=>{if(b==="chapters"&&k){const S=k===t.book;setTimeout(()=>{if(L.current)if(S){const q=R.current[t.chapterNum];q&&q.scrollIntoView({block:"center",behavior:"smooth"})}else L.current.scrollTo({top:0});$.current&&$.current.focus()},0)}},[b,k,D,t.book,t.chapterNum]),n.jsxs(Pt,{open:u,onOpenChange:M,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(G,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":u,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:ht})})}),n.jsx(Lt,{id:d,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Kt,{ref:$,onKeyDown:wt,loop:!0,value:h,onValueChange:m,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(je,{ref:T,value:g,onValueChange:v,onKeyDown:ct,onFocus:()=>z(!1),className:a&&a.length>0?"!tw-pr-10":""}),a&&a.length>0&&n.jsx(Ir,{recentSearches:a,onSearchItemSelect:Ct,renderItem:S=>y.formatScrRef(S,"English"),getItemKey:S=>`${S.book}-${S.chapterNum}-${S.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:et.map(({onClick:S,disabled:q,title:J,icon:Z})=>n.jsx(G,{variant:"ghost",size:"sm",onClick:()=>{z(!0),S()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:J,onKeyDown:Ft,children:n.jsx(Z,{})},J))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:P,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:w==="ltr"?n.jsx(N.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(N.ArrowRight,{className:"tw-h-4 tw-w-4"})}),k&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:he(k,s)})]}),!_&&n.jsxs(qt,{ref:L,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(K).map(([S,q])=>{if(q.length!==0)return n.jsx(Bt,{heading:ft(S),children:q.map(J=>n.jsx(Mr,{bookId:J,onSelect:Z=>xt(Z),section:y.getSectionForBook(J),commandValue:`${J} ${se[J]}`,ref:J===t.book?E:void 0,localizedBookNames:s},J))},S)}),D&&n.jsx(Bt,{children:n.jsx(At,{value:`${D.book} ${se[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:U,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?Mn(D.book,s):void 0)},"top-match")}),D&&It(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:he(D.book,s)}),n.jsx(sr,{bookId:D.book,scrRef:t,onChapterSelect:Nt,setChapterRef:Et,isChapterDimmed:nt,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&k&&n.jsx(sr,{bookId:k,scrRef:t,onChapterSelect:Nt,setChapterRef:Et,className:"tw-p-4"})]})]})})]})}const Hs=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),Ys=Jt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70");function ot({className:t,ref:e,...r}){return n.jsx(Ms.Root,{ref:e,className:f("pr-twp",Ys(),t),...r})}function On({className:t,ref:e,...r}){const o=at();return n.jsx(yn.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...r,ref:e,dir:o})}function qe({className:t,ref:e,...r}){return n.jsx(yn.Item,{ref:e,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...r,children:n.jsx(yn.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(N.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})})}function Xs(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function Ue({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:i,onChange:a=()=>{},getOptionLabel:l=Xs,getButtonLabel:d,icon:w=void 0,buttonPlaceholder:u="",textPlaceholder:p="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:b,...j}){const[k,C]=c.useState(!1),_=d??l,z=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],$=(T,L)=>{const E=l(T),R=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,F=`${L??""}${E}${R??""}`;return n.jsxs(At,{value:E,onSelect:()=>{a(T),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(N.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||l(i)!==E})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,R&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",R]})]})]},F)};return n.jsxs(Pt,{open:k,onOpenChange:C,...j,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(G,{variant:m,role:"combobox","aria-expanded":k,"aria-label":b,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[w&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:w}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?_(i):u})]}),n.jsx(N.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:g,className:f("tw-w-[200px] tw-p-0",s),children:n.jsxs(Kt,{children:[n.jsx(je,{placeholder:p,className:"tw-text-inherit"}),n.jsx(Oe,{children:h}),n.jsx(qt,{children:z(e)?e.map(T=>n.jsx(Bt,{heading:T.groupHeading,children:T.options.map(L=>$(L,T.groupHeading))},T.groupHeading)):e.map(T=>$(T))})]})})]})}function Or({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:i}){const a=c.useMemo(()=>Array.from({length:i},(w,u)=>u+1),[i]),l=w=>{r(w),w>e&&o(w)},d=w=>{o(w),w<t&&r(w)};return n.jsxs(n.Fragment,{children:[n.jsx(ot,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(Ue,{isDisabled:s,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:t},"start chapter"),n.jsx(ot,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(Ue,{isDisabled:s,onChange:d,buttonClassName:"tw-ms-2 tw-w-20",options:a,getOptionLabel:w=>w.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const Ws=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),ln=(t,e)=>t[e]??e;function Js({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:i,handleSelectEndChapter:a,startChapter:l,handleSelectStartChapter:d,localizedStrings:w}){const u=ln(w,"%webView_bookSelector_currentBook%"),p=ln(w,"%webView_bookSelector_choose%"),h=ln(w,"%webView_bookSelector_chooseBooks%"),[m,g]=c.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(On,{className:"pr-twp tw-flex",value:m,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{value:"current book"}),n.jsx(ot,{className:"tw-ms-1",children:u})]}),n.jsx(ot,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(Or,{isDisabled:m==="choose books",handleSelectStartChapter:d,handleSelectEndChapter:a,chapterCount:s,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{value:"choose books"}),n.jsx(ot,{className:"tw-ms-1",children:h})]}),n.jsx(ot,{className:"tw-flex tw-items-center",children:o.map(b=>tt.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx(G,{disabled:m==="current book",onClick:()=>r(),children:p})]})]})})}const Ar=c.createContext(null);function Zs(t,e){return{getTheme:function(){return e??null}}}function $t(){const t=c.useContext(Ar);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const i of r)s.append("v",i);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Pr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Qs=Pr?c.useLayoutEffect:c.useEffect,Ve={tag:x.HISTORY_MERGE_TAG};function ta({initialConfig:t,children:e}){const r=c.useMemo(()=>{const{theme:o,namespace:s,nodes:i,onError:a,editorState:l,html:d}=t,w=Zs(null,o),u=x.createEditor({editable:t.editable,html:d,namespace:s,nodes:i,onError:p=>a(p,u),theme:o});return function(p,h){if(h!==null){if(h===void 0)p.update(()=>{const m=x.$getRoot();if(m.isEmpty()){const g=x.$createParagraphNode();m.append(g);const v=Pr?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===p.getRootElement())&&g.select()}},Ve);else if(h!==null)switch(typeof h){case"string":{const m=p.parseEditorState(h);p.setEditorState(m,Ve);break}case"object":p.setEditorState(h,Ve);break;case"function":p.update(()=>{x.$getRoot().isEmpty()&&h(p)},Ve)}}}(u,l),[u,w]},[]);return Qs(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(Ar.Provider,{value:r,children:e})}const ea=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function na({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=$t();return ea(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:i,dirtyLeaves:a,prevEditorState:l,tags:d})=>{e&&i.size===0&&a.size===0||t&&d.has(x.HISTORY_MERGE_TAG)||l.isEmpty()||r(s,o,d)})},[o,t,e,r]),null}const An={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},bt=Qe.Provider,kt=Qe.Root;function Tt({className:t,variant:e,ref:r,...o}){return n.jsx(Qe.Trigger,{ref:r,className:e?f(In({variant:e}),t):t,...o})}function _t({className:t,sideOffset:e=4,ref:r,...o}){return n.jsx(Qe.Content,{ref:r,sideOffset:e,className:f("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}const Pn=[vn.HeadingNode,x.ParagraphNode,x.TextNode,vn.QuoteNode],ra=c.createContext(null),cn={didCatch:!1,error:null};class oa extends c.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=cn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,i=new Array(s),a=0;a<s;a++)i[a]=arguments[a];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:i,reason:"imperative-api"}),this.setState(cn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&sa(e.resetKeys,s)){var i,a;(i=(a=this.props).onReset)===null||i===void 0||i.call(a,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(cn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:i,error:a}=this.state;let l=e;if(i){const d={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")l=r(d);else if(o)l=c.createElement(o,d);else if(s!==void 0)l=s;else throw a}return c.createElement(ra.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},l)}}function sa(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function aa({children:t,onError:e}){return n.jsx(oa,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const ia=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function la(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function ca(){return function(t){const[e]=$t(),r=c.useMemo(()=>t(e),[e,t]),[o,s]=c.useState(()=>r.initialValueFn()),i=c.useRef(o);return ia(()=>{const{initialValueFn:a,subscribe:l}=r,d=a();return i.current!==d&&(i.current=d,s(d)),l(w=>{i.current=w,s(w)})},[r,t]),o}(la)}function wa(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,i]=o,a=t.isBackward(),l=s.getNode(),d=i.getNode(),w=e.is(l),u=e.is(d);if(w||u){const[p,h]=x.$getCharacterOffsets(t),m=l.is(d),g=e.is(a?d:l),v=e.is(a?l:d);let b,j=0;m?(j=p>h?h:p,b=p>h?p:h):g?(j=a?h:p,b=void 0):v&&(j=0,b=a?p:h);const k=e.__text.slice(j,b);k!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=k)}}return e}function da(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Lr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ua=Lr&&"documentMode"in document?document.documentMode:null;!(!Lr||!("InputEvent"in window)||ua)&&"getTargetRanges"in new window.InputEvent("input");function pa(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||da(4,t.__key),e}function ma(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const i=o[s],a=i.getKey();if(r.has(a))continue;const l=x.$findMatchingParent(i,w=>x.$isElementNode(w)&&!w.isInline());if(l===null)continue;const d=l.getKey();l.canIndent()&&!r.has(d)&&(r.add(d),t(l))}return r.size>0}const fa=Symbol.for("preact-signals");function tn(){if(Xt>1)return void Xt--;let t,e=!1;for(;Ee!==void 0;){let r=Ee;for(Ee=void 0,kn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&$r(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(kn=0,Xt--,e)throw t}function ha(t){if(Xt>0)return t();Xt++;try{return t()}finally{tn()}}let H,Ee;function ar(t){const e=H;H=void 0;try{return t()}finally{H=e}}let Xt=0,kn=0,Be=0;function ir(t){if(H===void 0)return;let e=t.n;return e===void 0||e.t!==H?(e={i:0,S:t,p:H.s,n:void 0,t:H,e:void 0,x:void 0,r:e},H.s!==void 0&&(H.s.n=e),H.s=e,t.n=e,32&H.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=H.s,e.n=void 0,H.s.n=e,H.s=e),e):void 0}function ut(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Me(t,e){return new ut(t,e)}function $r(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function lr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Fr(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function re(t,e){ut.call(this,void 0),this.x=t,this.s=void 0,this.g=Be-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function ga(t,e){return new re(t,e)}function Vr(t){const e=t.u;if(t.u=void 0,typeof e=="function"){Xt++;const r=H;H=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,Ln(t),o}finally{H=r,tn()}}}function Ln(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Vr(t)}function xa(t){if(H!==this)throw new Error("Out-of-order effect");Fr(this),H=t,this.f&=-2,8&this.f&&Ln(this),tn()}function fe(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function Wt(t,e){const r=new fe(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function en(t,e={}){const r={};for(const o in t){const s=e[o],i=Me(s===void 0?t[o]:s);r[o]=i}return r}ut.prototype.brand=fa,ut.prototype.h=function(){return!0},ut.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:ar(()=>{var r;(r=this.W)==null||r.call(this)}))},ut.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&ar(()=>{var o;(o=this.Z)==null||o.call(this)}))}},ut.prototype.subscribe=function(t){return Wt(()=>{const e=this.value,r=H;H=void 0;try{t(e)}finally{H=r}},{name:"sub"})},ut.prototype.valueOf=function(){return this.value},ut.prototype.toString=function(){return this.value+""},ut.prototype.toJSON=function(){return this.value},ut.prototype.peek=function(){const t=H;H=void 0;try{return this.value}finally{H=t}},Object.defineProperty(ut.prototype,"value",{get(){const t=ir(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(kn>100)throw new Error("Cycle detected");this.v=t,this.i++,Be++,Xt++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{tn()}}}}),re.prototype=new ut,re.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Be))return!0;if(this.g=Be,this.f|=1,this.i>0&&!$r(this))return this.f&=-2,!0;const t=H;try{lr(this),H=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return H=t,Fr(this),this.f&=-2,!0},re.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}ut.prototype.S.call(this,t)},re.prototype.U=function(t){if(this.t!==void 0&&(ut.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},re.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(re.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=ir(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),fe.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},fe.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Vr(this),lr(this),Xt++;const t=H;return H=this,xa.bind(this,t)},fe.prototype.N=function(){2&this.f||(this.f|=2,this.o=Ee,Ee=this)},fe.prototype.d=function(){this.f|=8,1&this.f||Ln(this)},fe.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>en(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Wt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const i=document.activeElement;s===null||i!==null&&s.contains(i)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function zr(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function Gr(t,e=zr){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>en(e),config:x.safeCast({$onClear:zr}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Wt(()=>Gr(t,o.value))}});function ba(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const wn=x.createState("format",{parse:t=>typeof t=="number"?t:0});class Br extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:wn}]})}getFormat(){return x.$getState(this,wn)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,wn,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function va(t){return t instanceof Br}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Br],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const i of s.getNodes())va(i)&&i.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function Kr(t,e){let r;return Me(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const _n=x.defineExtension({build:t=>Kr(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function qr(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=qr(r[s],o[s]);return t}return e}const $n=0,Nn=1,Ur=2,dn=3,ze=4,me=5,un=6,Ne=7;function pn(t){return t.id===$n}function Hr(t){return t.id===Ur}function ya(t){return function(e){return e.id===Nn}(t)||W(305,String(t.id),String(Nn)),Object.assign(t,{id:Ur})}const ja=new Set;class ka{constructor(e,r){dt(this,"builder");dt(this,"configs");dt(this,"_dependency");dt(this,"_peerNameSet");dt(this,"extension");dt(this,"state");dt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:$n}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Hr(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(l,d,w){return Object.assign(l,{config:d,id:dn,registerState:w})}(r,this.mergeConfigs(),o);let a;this.state=i,this.extension.init&&(a=this.extension.init(e,i.config,o)),this.state=function(l,d,w){return Object.assign(l,{id:ze,initResult:d,registerState:w})}(i,a,s)}build(e){const r=this.state;let o;r.id!==ze&&W(307,String(r.id),String(me)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(i,a,l){return Object.assign(i,{id:me,output:a,registerState:l})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==me&&W(308,String(o.id),String(me));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(i){return Object.assign(i,{id:un})}(o),()=>{const i=this.state;i.id!==Ne&&W(309,String(o.id),String(Ne)),this.state=function(a){return Object.assign(a,{id:me})}(i),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==un&&W(310,String(r.id),String(un)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ne})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=ze}(e)||W(313,String(e.id),String(ze)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=dn}(e)||W(314,String(e.id),String(dn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ne}(e)||W(316,String(e.id),String(Ne)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||ja}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=me})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const cr={tag:x.HISTORY_MERGE_TAG};function _a(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Na=x.defineExtension({config:x.safeCast({setOptions:cr,updateOptions:cr}),init:({$initialEditorState:t=_a})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:i}=s;if(x.$isEditorState(i))t.setEditorState(i,r);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const a=t.parseEditorState(i);t.setEditorState(a,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),wr=Symbol.for("@lexical/extension/LexicalBuilder");function dr(){}function Ca(t){throw t}function Ge(t){return Array.isArray(t)?t:[t]}const mn="0.41.0+prod.esm";class Se{constructor(e){dt(this,"roots");dt(this,"extensionNameMap");dt(this,"outgoingConfigEdges");dt(this,"incomingEdges");dt(this,"conflicts");dt(this,"_sortedExtensionReps");dt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=mn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Ge(Na)];for(const o of e)r.push(Ge(o));return new Se(r)}static maybeFromEditor(e){const r=e[wr];return r&&(r.PACKAGE_VERSION!==mn&&W(292,r.PACKAGE_VERSION,mn),r instanceof Se||W(293)),r}static fromEditor(e){const r=Se.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:i=>{r(i,s)}}:{}}),{[wr]:this});for(const i of this.sortedExtensionReps())i.build(s);return s}buildEditor(){let e=dr;function r(){try{e()}finally{e=dr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const i=this.incomingEdges.get(r);i?i.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=Ge(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new ka(this,o),this.extensionNameMap.set(o.name,s);const i=this.conflicts.get(o.name);typeof i=="string"&&W(299,o.name,i);for(const a of o.conflictsWith||[])this.extensionNameMap.has(a)&&W(299,o.name,a),this.conflicts.set(a,o.name);for(const a of o.dependencies||[]){const l=Ge(a);this.addEdge(o.name,l[0].name,l.slice(1)),this.addExtension(l)}for(const[a,l]of o.peerDependencies||[])this.addEdge(o.name,a,l?[l]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let i=o.state;if(Hr(i))return;const a=o.extension.name;var l;pn(i)||W(300,a,s||"[unknown]"),pn(l=i)||W(304,String(l.id),String($n)),i=Object.assign(l,{id:Nn}),o.state=i;const d=this.outgoingConfigEdges.get(a);if(d)for(const w of d.keys()){const u=this.extensionNameMap.get(w);u&&r(u,a)}i=ya(i),o.state=i,e.push(o)};for(const o of this.extensionNameMap.values())pn(o.state)&&r(o);for(const o of e)for(const[s,i]of this.outgoingConfigEdges.get(o.extension.name)||[])if(i.length>0){const a=this.extensionNameMap.get(s);if(a)for(const l of i)a.configs.add(l)}for(const[o,...s]of this.roots)if(s.length>0){const i=this.extensionNameMap.get(o.name);i===void 0&&W(301,o.name);for(const a of s)i.configs.add(a)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],i=o.signal;for(const a of r){const l=a.register(e,i);l&&s.push(l)}for(const a of r){const l=a.afterRegistration(e);l&&s.push(l)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,i={},a={},l=this.sortedExtensionReps();for(const u of l){const{extension:p}=u;if(p.onError!==void 0&&(e.onError=p.onError),p.disableEvents!==void 0&&(e.disableEvents=p.disableEvents),p.parentEditor!==void 0&&(e.parentEditor=p.parentEditor),p.editable!==void 0&&(e.editable=p.editable),p.namespace!==void 0&&(e.namespace=p.namespace),p.$initialEditorState!==void 0&&(e.$initialEditorState=p.$initialEditorState),p.nodes)for(const h of ba(p)){if(typeof h!="function"){const m=o.get(h.replace);m&&W(302,p.name,h.replace.name,m.extension.name),o.set(h.replace,u)}r.add(h)}if(p.html){if(p.html.export)for(const[h,m]of p.html.export.entries())s.set(h,m);p.html.import&&Object.assign(i,p.html.import)}p.theme&&qr(a,p.theme)}Object.keys(a).length>0&&(e.theme=a),r.size&&(e.nodes=[...r]);const d=Object.keys(i).length>0,w=s.size>0;(d||w)&&(e.html={},d&&(e.html.import=i),w&&(e.html.export=s));for(const u of l)u.init(e);return e.onError||(e.onError=Ca),e}}const Ea=new Set,ur=x.defineExtension({build(t,e,r){const o=r.getDependency(_n).output,s=Me({watchedNodeKeys:new Map}),i=Kr(()=>{},()=>Wt(()=>{const a=i.peek(),{watchedNodeKeys:l}=s.value;let d,w=!1;o.value.read(()=>{if(x.$getSelection())for(const[u,p]of l.entries()){if(p.size===0){l.delete(u);continue}const h=x.$getNodeByKey(u),m=h&&h.isSelected()||!1;w=w||m!==(!!a&&a.has(u)),m&&(d=d||new Set,d.add(u))}}),!w&&d&&a&&d.size===a.size||(i.value=d)}));return{watchNodeKey:function(a){const l=ga(()=>(i.value||Ea).has(a)),{watchedNodeKeys:d}=s.peek();let w=d.get(a);const u=w!==void 0;return w=w||new Set,w.add(l),u||(d.set(a,w),s.value={watchedNodeKeys:d}),l}}},dependencies:[_n],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class xe extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new xe(e.__key)}static importJSON(e){return Yr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Sa,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Sa(){return{node:Yr()}}function Yr(){return x.$create(xe)}function Ta(t){return t instanceof xe}x.defineExtension({dependencies:[_n,ur],name:"@lexical/extension/HorizontalRule",nodes:()=>[xe],register(t,e,r){const{watchNodeKey:o}=r.getDependency(ur).output,s=Me({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,a=>{if(x.isDOMNode(a.target)){const l=x.$getNodeFromDOMNode(a.target);if(Ta(l))return function(d,w=!1){const u=x.$getSelection(),p=d.isSelected(),h=d.getKey();let m;w&&x.$isNodeSelection(u)?m=u:(m=x.$createNodeSelection(),x.$setSelection(m)),p?m.delete(h):m.add(h)}(l,a.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(xe,(a,l)=>{ha(()=>{let d=!1;const{nodeSelections:w}=s.peek();for(const[u,p]of a.entries())if(p==="destroyed")w.delete(u),d=!0;else{const h=w.get(u),m=t.getElementByKey(u);h?h.domNode.value=m:(d=!0,w.set(u,{domNode:Me(m),selectedSignal:o(u)}))}d&&(s.value={nodeSelections:w})})}),Wt(()=>{const a=[];for(const{domNode:l,selectedSignal:d}of s.value.nodeSelections.values())a.push(Wt(()=>{const w=l.value;w&&(d.value?x.addClassNamesToElement(w,i):x.removeClassNamesFromElement(w,i))}));return x.mergeRegister(...a)}))}});function Xr(t){return t.canBeEmpty()}function Ra(t,e,r=Xr){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const i=function(a){if(a.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const l=a.anchor,d=a.focus,w=d.isBefore(l)?d:l,u=w.getNode(),p=pa(u);if(p.canIndent()){const h=p.getKey();let m=x.$createRangeSelection();if(m.anchor.set(h,0,"element"),m.focus.set(h,0,"element"),m=x.$normalizeSelection__EXPERIMENTAL(m),m.anchor.is(w))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(i,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const i=typeof r=="function"?r:r.peek();return ma(a=>{if(i(a)){const l=a.getIndent()+1;(!o||l<o)&&a.setIndent(l)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>en(e),config:x.safeCast({$canIndent:Xr,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:i}=r.getOutput();return Wt(()=>{if(!o.value)return Ra(t,s,i)})}});const Ma=x.defineExtension({name:"@lexical/react/ReactProvider"});function Da(){return x.$getRoot().getTextContent()}function Ia(t,e=!0){if(t)return!1;let r=Da();return e&&(r=r.trim()),r===""}function Oa(t){if(!Ia(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const i=s.getChildren(),a=i.length;for(let l=0;l<a;l++){const d=i[o];if(!x.$isTextNode(d))return!1}}}return!0}function Wr(t){return()=>Oa(t)}function Jr(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const i=o.data;if(typeof i=="string"){let a;try{a=JSON.parse(i)}catch{return}if(a&&a.protocol==="nuanria_messaging"&&a.type==="request"){const l=a.payload;if(l&&l.functionId==="makeChanges"){const d=l.args;if(d){const[w,u,p,h,m]=d;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),j=0,k=0;if(x.$isTextNode(b)&&w>=0&&u>=0&&(j=w,k=w+u,g.setTextNodeRange(b,j,b,k)),j===k&&p===""||(g.insertRawText(p),b=v.getNode()),x.$isTextNode(b)){j=h,k=h+m;const C=b.getTextContentSize();j=j>C?C:j,k=k>C?C:k,g.setTextNodeRange(b,j,b,k)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>en(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Wt(()=>r.getOutput().disabled.value?void 0:Jr(t))});function Aa(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Fn=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Pa({editor:t,ErrorBoundary:e}){return function(r,o){const[s,i]=c.useState(()=>r.getDecorators());return Fn(()=>r.registerDecoratorListener(a=>{tr.flushSync(()=>{i(a)})}),[r]),c.useEffect(()=>{i(r.getDecorators())},[r]),c.useMemo(()=>{const a=[],l=Object.keys(s);for(let d=0;d<l.length;d++){const w=l[d],u=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(c.Suspense,{fallback:null,children:s[w]})}),p=r.getElementByKey(w);p!==null&&a.push(tr.createPortal(u,p,w))}return a},[o,s,r])}(t,e)}function La({editor:t,ErrorBoundary:e}){return function(r){const o=Se.maybeFromEditor(r);if(o&&o.hasExtensionByName(Ma.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Aa(320,s);return!0}return!1}(t)?null:n.jsx(Pa,{editor:t,ErrorBoundary:e})}function pr(t){return t.getEditorState().read(Wr(t.isComposing()))}function $a({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=$t();return function(s){Fn(()=>x.mergeRegister(vn.registerRichText(s),Jr(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Fa,{content:e}),n.jsx(La,{editor:o,ErrorBoundary:r})]})}function Fa({content:t}){const[e]=$t(),r=function(s){const[i,a]=c.useState(()=>pr(s));return Fn(()=>{function l(){const d=pr(s);a(d)}return l(),x.mergeRegister(s.registerUpdateListener(()=>{l()}),s.registerEditableListener(()=>{l()}))},[s]),i}(e),o=ca();return r?typeof t=="function"?t(o):t:null}function Va({defaultSelection:t}){const[e]=$t();return c.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const za=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Ga({onClear:t}){const[e]=$t();return za(()=>Gr(e,t),[e,t]),null}const Zr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?c.useLayoutEffect:c.useEffect;function Ba({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:i,ariaExpanded:a,ariaInvalid:l,ariaLabel:d,ariaLabelledBy:w,ariaMultiline:u,ariaOwns:p,ariaRequired:h,autoCapitalize:m,className:g,id:v,role:b="textbox",spellCheck:j=!0,style:k,tabIndex:C,"data-testid":_,...z},$){const[T,L]=c.useState(t.isEditable()),E=c.useCallback(F=>{F&&F.ownerDocument&&F.ownerDocument.defaultView?t.setRootElement(F):t.setRootElement(null)},[t]),R=c.useMemo(()=>function(...F){return V=>{for(const O of F)typeof O=="function"?O(V):O!=null&&(O.current=V)}}($,E),[E,$]);return Zr(()=>(L(t.isEditable()),t.registerEditableListener(F=>{L(F)})),[t]),n.jsx("div",{"aria-activedescendant":T?e:void 0,"aria-autocomplete":T?r:"none","aria-controls":T?o:void 0,"aria-describedby":s,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":T&&b==="combobox"?!!a:void 0,...l!=null?{"aria-invalid":l}:{},"aria-label":d,"aria-labelledby":w,"aria-multiline":u,"aria-owns":T?p:void 0,"aria-readonly":!T||void 0,"aria-required":h,autoCapitalize:m,className:g,contentEditable:T,"data-testid":_,id:v,ref:R,role:b,spellCheck:j,style:k,tabIndex:C,...z})}const Ka=c.forwardRef(Ba);function mr(t){return t.getEditorState().read(Wr(t.isComposing()))}const qa=c.forwardRef(Ua);function Ua(t,e){const{placeholder:r,...o}=t,[s]=$t();return n.jsxs(n.Fragment,{children:[n.jsx(Ka,{editor:s,...o,ref:e}),r!=null&&n.jsx(Ha,{editor:s,content:r})]})}function Ha({content:t,editor:e}){const r=function(a){const[l,d]=c.useState(()=>mr(a));return Zr(()=>{function w(){const u=mr(a);d(u)}return w(),x.mergeRegister(a.registerUpdateListener(()=>{w()}),a.registerEditableListener(()=>{w()}))},[a]),l}(e),[o,s]=c.useState(e.isEditable());if(c.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(a=>{s(a)})),[e]),!r)return null;let i=null;return typeof t=="function"?i=t(o):t!==null&&(i=t),i===null?null:n.jsx("div",{"aria-hidden":!0,children:i})}function Ya({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(qa,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Qr=c.createContext(void 0);function Xa({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:i}){const a=c.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Qr.Provider,{value:a,children:i})}function to(){const t=c.useContext(Qr);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Wa(){const[t,e]=c.useState(void 0),r=c.useCallback(()=>{e(void 0)},[]),o=c.useMemo(()=>{if(t===void 0)return;const{title:i,content:a}=t;return n.jsx(As,{open:!0,onOpenChange:r,children:n.jsxs($s,{children:[n.jsx(Er,{children:n.jsx(Fs,{children:i})}),a]})})},[t,r]),s=c.useCallback((i,a,l=!1)=>{e({closeOnClickOutside:l,content:a(r),title:i})},[r]);return[o,s]}function Ja({children:t}){const[e]=$t(),[r,o]=c.useState(e),[s,i]=c.useState("paragraph"),[a,l]=Wa(),d=()=>{};return c.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(w,u)=>(o(u),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Xa,{activeEditor:r,$updateToolbar:d,blockType:s,setBlockType:i,showModal:l,children:[a,t({blockType:s})]})}function Za(t){const[e]=$t(),{activeEditor:r}=to();c.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),c.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Qa=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),eo=c.createContext({size:"default",variant:"default"});function Vn({className:t,variant:e,size:r,children:o,ref:s,...i}){const a=at();return n.jsx(Cr.Root,{ref:s,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...i,dir:a,children:n.jsx(eo.Provider,{value:{variant:e,size:r},children:o})})}function Te({className:t,children:e,variant:r,size:o,ref:s,...i}){const a=c.useContext(eo);return n.jsx(Cr.Item,{ref:s,className:f(Qa({variant:a.variant||r,size:a.size||o}),t),...i,children:e})}const fr=[{format:"bold",icon:N.BoldIcon,label:"Bold"},{format:"italic",icon:N.ItalicIcon,label:"Italic"}];function ti(){const{activeEditor:t}=to(),[e,r]=c.useState([]),o=c.useCallback(s=>{if(x.$isRangeSelection(s)||hs.$isTableSelection(s)){const i=[];fr.forEach(({format:a})=>{s.hasFormat(a)&&i.push(a)}),r(a=>a.length!==i.length||!i.every(l=>a.includes(l))?i:a)}},[]);return Za(o),n.jsx(Vn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:fr.map(({format:s,icon:i,label:a})=>n.jsx(Te,{value:s,"aria-label":a,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(i,{className:"tw-h-4 tw-w-4"})},s))})}function ei({onClear:t}){const[e]=$t();c.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function ni({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=c.useState(void 0),s=i=>{i!==void 0&&o(i)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Ja,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(ti,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx($a,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Ya,{placeholder:t})}),ErrorBoundary:aa}),e&&n.jsx(Va,{defaultSelection:"rootEnd"}),n.jsx(ei,{onClear:r}),n.jsx(Ga,{})]})]})}const ri={namespace:"commentEditor",theme:An,nodes:Pn,onError:t=>{console.error(t)}};function He({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:i=!1,onClear:a,className:l}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",l),children:n.jsx(ta,{initialConfig:{...ri,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(bt,{children:[n.jsx(ni,{placeholder:s,autoFocus:i,onClear:a}),n.jsx(na,{ignoreSelectionChange:!0,onChange:d=>{r==null||r(d),o==null||o(d.toJSON())}})]})})})}function oi(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const i of r)if(!ro.has(i.nodeName)){const a=oo(i,t,s,!1);a!==null&&(o=o.concat(a))}return function(i){for(const a of i)a.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&a.insertAfter(x.$createLineBreakNode());for(const a of i){const l=a.getChildren();for(const d of l)a.insertBefore(d);a.remove()}}(s),o}function si(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)no(t,o[s],r,e);return r.innerHTML}function no(t,e,r,o=null){let s=o===null||e.isSelected(o);const i=x.$isElementNode(e)&&e.excludeFromCopy("html");let a=e;o!==null&&x.$isTextNode(e)&&(a=wa(o,e,"clone"));const l=x.$isElementNode(a)?a.getChildren():[],d=x.getRegisteredNode(t,a.getType());let w;w=d&&d.exportDOM!==void 0?d.exportDOM(t,a):a.exportDOM(t);const{element:u,after:p}=w;if(!u)return!1;const h=document.createDocumentFragment();for(let m=0;m<l.length;m++){const g=l[m],v=no(t,g,h,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!i){if((x.isHTMLElement(u)||x.isDocumentFragment(u))&&u.append(h),r.append(u),p){const m=p.call(a,u);m&&(x.isDocumentFragment(u)?u.replaceChildren(m):u.replaceWith(m))}}else r.append(h);return s}const ro=new Set(["STYLE","SCRIPT"]);function oo(t,e,r,o,s=new Map,i){let a=[];if(ro.has(t.nodeName))return a;let l=null;const d=function(g,v){const{nodeName:b}=g,j=v._htmlConversions.get(b.toLowerCase());let k=null;if(j!==void 0)for(const C of j){const _=C(g);_!==null&&(k===null||(k.priority||0)<=(_.priority||0))&&(k=_)}return k!==null?k.conversion:null}(t,e),w=d?d(t):null;let u=null;if(w!==null){u=w.after;const g=w.node;if(l=Array.isArray(g)?g[g.length-1]:g,l!==null){for(const[,v]of s)if(l=v(l,i),!l)break;l&&a.push(...Array.isArray(g)?g:[l])}w.forChild!=null&&s.set(t.nodeName,w.forChild)}const p=t.childNodes;let h=[];const m=(l==null||!x.$isRootOrShadowRoot(l))&&(l!=null&&x.$isBlockElementNode(l)||o);for(let g=0;g<p.length;g++)h.push(...oo(p[g],e,r,m,new Map(s),l));return u!=null&&(h=u(h)),x.isBlockDomNode(t)&&(h=ai(t,h,m?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),l==null?h.length>0?a=a.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(a=a.concat(x.$createLineBreakNode())):x.$isElementNode(l)&&l.append(...h),a}function ai(t,e,r){const o=t.style.textAlign,s=[];let i=[];for(let a=0;a<e.length;a++){const l=e[a];if(x.$isBlockElementNode(l))o&&!l.getFormat()&&l.setFormat(o),s.push(l);else if(i.push(l),a===e.length-1||a<e.length-1&&x.$isBlockElementNode(e[a+1])){const d=r();d.setFormat(o),d.append(...i),s.push(d),i=[]}}return s}function so(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function ao(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:ao(e.children)):!1}function St(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?ao(t.root.children):!1}function ii(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=kr.createHeadlessEditor({namespace:"EditorUtils",theme:An,nodes:Pn,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),i=oi(e,s);x.$getRoot().clear(),x.$insertNodes(i)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function Ye(t){const e=kr.createHeadlessEditor({namespace:"EditorUtils",theme:An,nodes:Pn,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=si(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function zn(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function Ke(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function Gn(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const li={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function fn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function ci({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,i]=c.useState(li),[a,l]=c.useState(void 0),[d,w]=c.useState(!1),u=c.useRef(void 0),p=c.useRef(null);c.useEffect(()=>{let j=!0;const k=p.current;if(!k)return;const C=setTimeout(()=>{j&&so(k)},300);return()=>{j=!1,clearTimeout(C)}},[]);const h=c.useCallback(()=>{if(!St(s))return;const j=Ye(s);e(j,a)},[s,e,a]),m=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(G,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(N.X,{})})}),n.jsx(_t,{children:n.jsx("p",{children:v})})]})}),n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(G,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!St(s),children:n.jsx(N.Check,{})})}),n.jsx(_t,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Pt,{open:d,onOpenChange:w,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(G,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(N.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:fn(a!==void 0?a:"",o)})]})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),w(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:t.map(j=>n.jsx(At,{onSelect:()=>{l(j===""?void 0:j),w(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:fn(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:p,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):Gn(j)&&(j.preventDefault(),j.stopPropagation(),St(s)&&h())},onKeyDown:j=>{zn(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(He,{editorSerializedState:s,onSerializedChange:j=>i(j),placeholder:m,onClear:j=>{u.current=j}})})]})}const wi=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),di=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],ui=["input","select","textarea","button"],pi=["button","textbox"],io=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=c.useRef(null),[i,a]=c.useState(void 0),[l,d]=c.useState(void 0),w=c.useCallback(m=>{a(m);const g=t.find(b=>b.id===m);g&&(e==null||e(g));const v=document.getElementById(m);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",m)},[e,t]),u=c.useCallback(m=>{const g=t.find(v=>v.id===m);g&&(d(v=>v===m?void 0:m),r==null||r(g))},[r,t]),p=m=>{if(!m)return!1;const g=m.tagName.toLowerCase();if(m.isContentEditable||ui.includes(g))return!0;const v=m.getAttribute("role");if(v&&pi.includes(v))return!0;const b=m.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=c.useCallback(m=>{var T;const g=m.target,v=L=>L?document.getElementById(L):void 0,b=v(l),j=v(i);if(!!(b&&g&&b.contains(g)&&g!==b)&&p(g)){if(m.key==="Escape"||m.key==="ArrowLeft"&&!g.isContentEditable){if(l){m.preventDefault(),m.stopPropagation();const L=t.find(E=>E.id===l);L&&w(L.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!b)return;const L=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(L.length===0)return;const E=L.findIndex(F=>F===g);if(E===-1)return;let R;m.key==="ArrowDown"?R=Math.min(E+1,L.length-1):R=Math.max(E-1,0),R!==E&&(m.preventDefault(),m.stopPropagation(),(T=L[R])==null||T.focus());return}return}const _=t.findIndex(L=>L.id===i);let z=_;switch(m.key){case"ArrowDown":z=Math.min(_+1,t.length-1),m.preventDefault();break;case"ArrowUp":z=Math.max(_-1,0),m.preventDefault();break;case"Home":z=0,m.preventDefault();break;case"End":z=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&u(i),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const L=j;if(L){const E=L.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),R=L.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),F=E??R;if(F){m.preventDefault(),F.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(p(g)||(o==null||o(m.key),m.preventDefault()));return}const $=t[z];$&&w($.id)},[t,w,i,l,u,o]);return{listboxRef:s,activeId:i,selectedId:l,handleKeyDown:h,focusOption:w}},lo=Jt.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}});function be({className:t,variant:e,ref:r,...o}){return n.jsx("div",{ref:r,className:f("pr-twp",lo({variant:e}),t),...o})}function co({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...r})}function mi({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...r})}function fi({className:t,ref:e,...r}){return n.jsx("h3",{ref:e,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...r,children:r.children})}function hi({className:t,ref:e,...r}){return n.jsx("p",{ref:e,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...r})}function wo({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:f("pr-twp tw-p-6 tw-pt-0",t),...r})}function gi({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...r})}function ve({className:t,orientation:e="horizontal",decorative:r=!0,ref:o,...s}){return n.jsx(Ds.Root,{ref:o,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...s})}function uo({className:t,ref:e,...r}){return n.jsx(Tn.Root,{ref:e,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...r})}function xi({className:t,ref:e,...r}){return n.jsx(Tn.Image,{ref:e,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...r})}function po({className:t,ref:e,...r}){return n.jsx(Tn.Fallback,{ref:e,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...r})}const Bn=c.createContext(void 0);function Ht(){const t=c.useContext(Bn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ue=Jt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),pe=it.Trigger,Kn=it.Group,mo=it.Portal,fo=it.Sub,ho=it.RadioGroup;function Qt({variant:t="default",...e}){const r=c.useMemo(()=>({variant:t}),[t]);return n.jsx(Bn.Provider,{value:r,children:n.jsx(it.Root,{...e})})}function go({className:t,inset:e,children:r,ref:o,...s}){const i=Ht();return n.jsxs(it.SubTrigger,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ue({variant:i.variant})),...s,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function xo({className:t,ref:e,...r}){return n.jsx(it.SubContent,{ref:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}function te({className:t,sideOffset:e=4,children:r,ref:o,...s}){const i=at();return n.jsx(it.Portal,{children:n.jsx(it.Content,{ref:o,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...s,children:n.jsx("div",{dir:i,children:r})})})}function Xe({className:t,inset:e,ref:r,...o}){const s=at(),i=Ht();return n.jsx(it.Item,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ue({variant:i.variant})),...o,dir:s})}function Gt({className:t,children:e,checked:r,ref:o,...s}){const i=Ht();return n.jsxs(it.CheckboxItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ue({variant:i.variant})),checked:r,...s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(it.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e]})}function bo({className:t,children:e,ref:r,...o}){const s=Ht();return n.jsxs(it.RadioItem,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ue({variant:s.variant})),...o,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(it.ItemIndicator,{children:n.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})}function Ae({className:t,inset:e,ref:r,...o}){return n.jsx(it.Label,{ref:r,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...o})}function ke({className:t,ref:e,...r}){return n.jsx(it.Separator,{ref:e,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}function vo({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}vo.displayName="DropdownMenuShortcut";function hr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:i,onEditingChange:a,canEditOrDelete:l=!1}){const[d,w]=c.useState(!1),[u,p]=c.useState(),h=c.useRef(null);c.useEffect(()=>{if(!d)return;let _=!0;const z=h.current;if(!z)return;const $=setTimeout(()=>{_&&so(z)},300);return()=>{_=!1,clearTimeout($)}},[d]);const m=c.useCallback(_=>{_&&_.stopPropagation(),w(!1),p(void 0),a==null||a(!1)},[a]),g=c.useCallback(async _=>{if(_&&_.stopPropagation(),!u||!s)return;await s(t.id,Ye(u))&&(w(!1),p(void 0),a==null||a(!1))},[u,s,t.id,a]),v=c.useMemo(()=>{const _=new Date(t.date),z=y.formatRelativeDate(_,r["%comment_date_today%"],r["%comment_date_yesterday%"]),$=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:z,time:$})},[t.date,r]),b=c.useMemo(()=>t.user,[t.user]),j=c.useMemo(()=>t.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[t.user]),k=c.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),C=c.useMemo(()=>{if(o&&l)return n.jsxs(n.Fragment,{children:[n.jsxs(Xe,{onClick:_=>{_.stopPropagation(),w(!0),p(ii(t.contents)),a==null||a(!0)},children:[n.jsx(N.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Xe,{onClick:async _=>{_.stopPropagation(),i&&await i(t.id)},children:[n.jsx(N.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[l,o,r,t.contents,t.id,i,a]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(uo,{className:"tw-h-8 tw-w-8",children:n.jsx(po,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(be,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",Ke(t.assignedUser,r)]})]}),d&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),m()):Gn(_)&&(_.preventDefault(),_.stopPropagation(),St(u)&&g())},onKeyDown:_=>{zn(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},onClick:_=>{_.stopPropagation()},children:[n.jsx(He,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:u,onSerializedChange:_=>p(_)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(G,{size:"icon",onClick:m,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(N.X,{})}),n.jsx(G,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!St(u),children:n.jsx(N.ArrowUp,{})})]})]}),!d&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:k}})]})]}),C&&n.jsxs(Qt,{children:[n.jsx(pe,{asChild:!0,children:n.jsx(G,{variant:"ghost",size:"icon",children:n.jsx(N.MoreHorizontal,{})})}),n.jsx(te,{align:"end",children:C})]})]})}const gr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function bi({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:i,currentUser:a,handleSelectThread:l,threadId:d,thread:w,threadStatus:u,handleAddCommentToThread:p,handleUpdateComment:h,handleDeleteComment:m,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:j,canUserResolveThreadCallback:k,canUserEditOrDeleteCommentCallback:C,isRead:_=!1,autoReadDelay:z=5,onVerseRefClick:$}){const[T,L]=c.useState(gr),[E,R]=c.useState(void 0),F=o,[V,O]=c.useState(!1),[A,K]=c.useState(!1),[D,U]=c.useState(!1),[xt,Nt]=c.useState(!1),[Ct,et]=c.useState(!1),[P,M]=c.useState(_),[B,Y]=c.useState(!1),X=c.useRef(void 0),[Q,ft]=c.useState(new Map);c.useEffect(()=>{let I=!0;return(async()=>{const vt=k?await k(d):!1;I&&et(vt)})(),()=>{I=!1}},[d,k]),c.useEffect(()=>{let I=!0;if(!o){Nt(!1),ft(new Map);return}return(async()=>{const vt=j?await j(d):!1;I&&Nt(vt)})(),()=>{I=!1}},[o,d,j]);const nt=c.useMemo(()=>e.filter(I=>!I.deleted),[e]);c.useEffect(()=>{let I=!0;if(!o||!C){ft(new Map);return}return(async()=>{const vt=new Map;await Promise.all(nt.map(async Qn=>{const is=await C(Qn.id);I&&vt.set(Qn.id,is)})),I&&ft(vt)})(),()=>{I=!1}},[o,nt,C]);const ht=c.useMemo(()=>nt[0],[nt]),Et=c.useRef(null),ct=c.useRef(void 0),wt=c.useCallback(()=>{var I;(I=ct.current)==null||I.call(ct),L(gr)},[]),Ft=c.useCallback(()=>{const I=!P;M(I),Y(!I),g==null||g(d,I)},[P,g,d]);c.useEffect(()=>{O(!1)},[o]),c.useEffect(()=>{if(o&&!P&&!B){const I=setTimeout(()=>{M(!0),g==null||g(d,!0)},z*1e3);return X.current=I,()=>clearTimeout(I)}X.current&&(clearTimeout(X.current),X.current=void 0)},[o,P,B,z,d,g]);const S=c.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),q=c.useMemo(()=>{if(i===void 0)return;if(i==="")return r["%comment_assign_unassigned%"]??"Unassigned";const I=Ke(i,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:I})},[i,r]),J=c.useMemo(()=>nt.slice(1),[nt]),Z=c.useMemo(()=>J.length??0,[J.length]),rt=c.useMemo(()=>Z>0,[Z]),Vt=c.useMemo(()=>V||Z<=2?J:J.slice(-2),[J,Z,V]),gt=c.useMemo(()=>V||Z<=2?0:Z-2,[Z,V]),$e=c.useMemo(()=>Z===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:Z}),[Z,S]),ee=c.useMemo(()=>gt===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:gt}),[gt,S]);c.useEffect(()=>{!o&&A&&rt&&K(!1)},[o,A,rt]);const Jn=c.useCallback(async I=>{I&&I.stopPropagation();const Mt=St(T)?Ye(T):void 0;if(E!==void 0){await p({threadId:d,contents:Mt,assignedUser:E})&&(R(void 0),Mt&&wt());return}Mt&&await p({threadId:d,contents:Mt})&&wt()},[wt,T,p,E,d]),Zn=c.useCallback(async I=>{const Mt=St(T)?Ye(T):void 0,vt=await p({...I,contents:Mt,assignedUser:E??I.assignedUser});return vt&&Mt&&wt(),vt&&E!==void 0&&R(void 0),vt},[wt,T,p,E]);return n.jsx(co,{role:"option","aria-selected":o,id:d,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&u!=="Resolved"&&P,"tw-bg-background":o&&u!=="Resolved"&&P,"tw-bg-muted":u==="Resolved","tw-bg-accent":!P&&!o&&u!=="Resolved"}),onClick:()=>{l(d)},tabIndex:-1,children:n.jsxs(wo,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[q&&n.jsx(be,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:q}),n.jsx(G,{variant:"ghost",size:"icon",onClick:I=>{I.stopPropagation(),Ft()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":P?"Mark as unread":"Mark as read",children:P?n.jsx(N.MailOpen,{}):n.jsx(N.Mail,{})}),Ct&&u!=="Resolved"&&n.jsx(G,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:I=>{I.stopPropagation(),Zn({threadId:d,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Et,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":F},{"tw-whitespace-nowrap":!F}),children:[s&&$?n.jsx(G,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:I=>{I.stopPropagation(),$(w)},children:s}):s,n.jsxs("span",{className:t,children:[ht.contextBefore,n.jsx("span",{className:"tw-font-bold",children:ht.selectedText}),ht.contextAfter]})]})}),n.jsx(hr,{comment:ht,localizedStrings:r,isThreadExpanded:o,threadStatus:u,handleAddCommentToThread:Zn,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:K,canEditOrDelete:(!A&&Q.get(ht.id))??!1,canUserResolveThread:Ct})]}),n.jsxs(n.Fragment,{children:[rt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ve,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:$e})]}),!o&&St(T)&&n.jsx(He,{editorSerializedState:T,onSerializedChange:I=>L(I),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[gt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:I=>{I.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),I.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ve,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:ee}),V?n.jsx(N.ChevronUp,{}):n.jsx(N.ChevronDown,{})]})]}),Vt.map(I=>n.jsx("div",{children:n.jsx(hr,{comment:I,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:K,canEditOrDelete:(!A&&Q.get(I.id))??!1})},I.id)),b!==!1&&(!A||St(T))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:I=>I.stopPropagation(),onKeyDownCapture:I=>{Gn(I)&&(I.preventDefault(),I.stopPropagation(),(St(T)||E!==void 0)&&Jn())},onKeyDown:I=>{zn(I),(I.key==="Enter"||I.key===" ")&&I.stopPropagation()},children:[n.jsx(He,{editorSerializedState:T,onSerializedChange:I=>L(I),placeholder:u==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:I=>{ct.current=I}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[E!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:Ke(E,r)})}),n.jsxs(Pt,{open:D,onOpenChange:U,children:[n.jsx(Ut,{asChild:!0,children:n.jsx(G,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!xt||!v||v.length===0||!v.includes(a),"aria-label":"Assign user",children:n.jsx(N.AtSign,{})})}),n.jsx(Lt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:I=>{I.key==="Escape"&&(I.stopPropagation(),U(!1))},children:n.jsx(Kt,{children:n.jsx(qt,{children:v==null?void 0:v.map(I=>n.jsx(At,{onSelect:()=>{R(I!==i?I:void 0),U(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Ke(I,r)})},I||"unassigned"))})})})]}),n.jsx(G,{size:"icon",onClick:Jn,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!St(T)&&E===void 0,"aria-label":"Submit comment",children:n.jsx(N.ArrowUp,{})})]})]})]})]})]})})}function vi({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:l,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:u,canUserAssignThreadCallback:p,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[j,k]=c.useState(new Set),[C,_]=c.useState();c.useEffect(()=>{g&&(k(O=>new Set(O).add(g)),_(g))},[g]);const z=r.filter(O=>O.comments.some(A=>!A.deleted)),$=z.map(O=>({id:O.id})),T=c.useCallback(O=>{k(A=>new Set(A).add(O.id)),_(O.id),v==null||v(O.id)},[v]),L=c.useCallback(O=>{const A=j.has(O);k(K=>{const D=new Set(K);return D.has(O)?D.delete(O):D.add(O),D}),_(O),v==null||v(A?void 0:O)},[j,v]),{listboxRef:E,activeId:R,handleKeyDown:F}=io({options:$,onOptionSelect:T}),V=c.useCallback(O=>{O.key==="Escape"?(C&&j.has(C)&&(k(A=>{const K=new Set(A);return K.delete(C),K}),_(void 0),v==null||v(void 0)),O.preventDefault(),O.stopPropagation()):F(O)},[C,j,F,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":R??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:V,children:z.map(O=>n.jsx("div",{id:O.id,className:f({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(bi,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:L,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:i,handleUpdateComment:a,handleDeleteComment:l,handleReadStatusChange:d,assignableUsers:w,canUserAddCommentToThread:u,canUserAssignThreadCallback:p,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,onVerseRefClick:b})},O.id))})}function yi({table:t}){return n.jsxs(Qt,{children:[n.jsx(_r.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(G,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(N.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(te,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ae,{children:"Toggle columns"}),n.jsx(ke,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Gt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const ie=mt.Root,yo=mt.Group,le=mt.Value,jo=Jt.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}});function ce({className:t,children:e,size:r,ref:o,...s}){const i=at();return n.jsxs(mt.Trigger,{className:f(jo({size:r,className:t})),ref:o,...s,dir:i,children:[e,n.jsx(mt.Icon,{asChild:!0,children:n.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})}function ko({className:t,ref:e,...r}){return n.jsx(mt.ScrollUpButton,{ref:e,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...r,children:n.jsx(N.ChevronUp,{className:"tw-h-4 tw-w-4"})})}function _o({className:t,ref:e,...r}){return n.jsx(mt.ScrollDownButton,{ref:e,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...r,children:n.jsx(N.ChevronDown,{className:"tw-h-4 tw-w-4"})})}function we({className:t,children:e,position:r="popper",ref:o,...s}){const i=at();return n.jsx(mt.Portal,{children:n.jsxs(mt.Content,{ref:o,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...s,children:[n.jsx(ko,{}),n.jsx(mt.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:i,children:e})}),n.jsx(_o,{})]})})}function ji({className:t,ref:e,...r}){return n.jsx(mt.Label,{ref:e,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...r})}function jt({className:t,children:e,ref:r,...o}){return n.jsxs(mt.Item,{ref:r,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...o,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(mt.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(mt.ItemText,{children:e})]})}function ki({className:t,ref:e,...r}){return n.jsx(mt.Separator,{ref:e,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}function _i({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(ie,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(ce,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(le,{placeholder:t.getState().pagination.pageSize})}),n.jsx(we,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(jt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(N.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(N.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(N.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(G,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(N.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const xr=`
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
`;function Ni(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function De(t,e){const r=e?`${xr}, ${e}`:xr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Ni(o))}function nn({className:t,stickyHeader:e,ref:r,...o}){const s=c.useRef(null);c.useEffect(()=>{typeof r=="function"?r(s.current):r&&"current"in r&&(r.current=s.current)},[r]),c.useEffect(()=>{const a=s.current;if(!a)return;const l=()=>{requestAnimationFrame(()=>{De(a,'[tabindex]:not([tabindex="-1"])').forEach(u=>{u.setAttribute("tabindex","-1")})})};l();const d=new MutationObserver(()=>{l()});return d.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{d.disconnect()}},[]);const i=a=>{const{current:l}=s;if(l){if(a.key==="ArrowDown"){a.preventDefault(),De(l)[0].focus();return}a.key===" "&&document.activeElement===l&&a.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...o})})}function rn({className:t,stickyHeader:e,ref:r,...o}){return n.jsx("thead",{ref:r,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...o})}function on({className:t,ref:e,...r}){return n.jsx("tbody",{ref:e,className:f("[&_tr:last-child]:tw-border-0",t),...r})}function Ci({className:t,ref:e,...r}){return n.jsx("tfoot",{ref:e,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...r})}function Ei(t){c.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?De(t.current):[],i=s.indexOf(document.activeElement),a=o.key==="ArrowRight"?i+1:i-1;a>=0&&a<s.length&&s[a].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Si(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Ti(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function zt({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,ref:s,...i}){const a=c.useRef(null);c.useEffect(()=>{typeof s=="function"?s(a.current):s&&"current"in s&&(s.current=a.current)},[s]),Ei(a);const l=c.useMemo(()=>a.current?De(a.current):[],[a]),d=c.useCallback(u=>{const{current:p}=a;if(!p||!p.parentElement)return;const h=p.closest("table"),m=h?De(h).filter(b=>b.tagName==="TR"):[],g=m.indexOf(p),v=l.indexOf(document.activeElement);if(u.key==="ArrowDown"||u.key==="ArrowUp")u.preventDefault(),Ti(m,g,u.key);else if(u.key==="ArrowLeft"||u.key==="ArrowRight")u.preventDefault(),Si(l,v,u.key);else if(u.key==="Escape"){u.preventDefault();const b=p.closest("table");b&&b.focus()}e==null||e(u)},[a,l,e]),w=c.useCallback(u=>{o&&(r==null||r(u))},[o,r]);return n.jsx("tr",{ref:a,tabIndex:-1,onKeyDown:d,onFocus:w,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...i})}function Ie({className:t,ref:e,...r}){return n.jsx("th",{ref:e,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...r})}function ae({className:t,ref:e,...r}){return n.jsx("td",{ref:e,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...r})}function Ri({className:t,ref:e,...r}){return n.jsx("caption",{ref:e,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...r})}function We({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function No({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:i=!1,onRowClickHandler:a=()=>{},id:l,isLoading:d=!1,noResultsMessage:w}){var $;const[u,p]=c.useState([]),[h,m]=c.useState([]),[g,v]=c.useState({}),[b,j]=c.useState({}),k=c.useMemo(()=>e??[],[e]),C=pt.useReactTable({data:k,columns:t,getCoreRowModel:pt.getCoreRowModel(),...r&&{getPaginationRowModel:pt.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:pt.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:pt.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:j,state:{sorting:u,columnFilters:h,columnVisibility:g,rowSelection:b}}),_=C.getVisibleFlatColumns();let z;return d?z=Array.from({length:10}).map((E,R)=>`skeleton-row-${R}`).map(E=>n.jsx(zt,{className:"hover:tw-bg-transparent",children:n.jsx(ae,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(We,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):(($=C.getRowModel().rows)==null?void 0:$.length)>0?z=C.getRowModel().rows.map(T=>n.jsx(zt,{onClick:()=>a(T,C),"data-state":T.getIsSelected()&&"selected",children:T.getVisibleCells().map(L=>n.jsx(ae,{children:pt.flexRender(L.column.columnDef.cell,L.getContext())},L.id))},T.id)):z=n.jsx(zt,{children:n.jsx(ae,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:w})}),n.jsxs("div",{className:"pr-twp",id:l,children:[s&&n.jsx(yi,{table:C}),n.jsxs(nn,{stickyHeader:i,children:[n.jsx(rn,{stickyHeader:i,children:C.getHeaderGroups().map(T=>n.jsx(zt,{children:T.headers.map(L=>n.jsx(Ie,{className:"tw-p-0",children:L.isPlaceholder?void 0:pt.flexRender(L.column.columnDef.header,L.getContext())},L.id))},T.id))}),n.jsx(on,{children:z})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(G,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx(G,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(_i,{table:C})]})}function Mi({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const i=c.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(ys,{options:i,children:e})})}const Co=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),br=(t,e)=>t[e]??e;function Eo({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=br(r,"%webView_error_dump_header%"),i=br(r,"%webView_error_dump_info_message%");function a(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(G,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>a(),children:n.jsx(N.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Di=Object.freeze([...Co,"%webView_error_dump_copied_message%"]);function Ii({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:i}){const[a,l]=c.useState(!1),d=()=>{l(!0),e&&e()},w=u=>{u||l(!1)};return n.jsxs(Pt,{onOpenChange:w,children:[n.jsx(Ut,{asChild:!0,children:o}),n.jsxs(Lt,{id:i,className:f("tw-min-w-80 tw-max-w-96",s),children:[a&&r["%webView_error_dump_copied_message%"]&&n.jsx(ot,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(Eo,{errorDetails:t,handleCopyNotify:d,localizedStrings:r})]})]})}var So=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(So||{});function Oi({id:t,label:e,groups:r}){const[o,s]=c.useState(Object.fromEntries(r.map((w,u)=>w.itemType===0?[u,[]]:void 0).filter(w=>!!w))),[i,a]=c.useState({}),l=(w,u)=>{const p=!o[w][u];s(m=>(m[w][u]=p,{...m}));const h=r[w].items[u];h.onUpdate(h.id,p)},d=(w,u)=>{a(h=>(h[w]=u,{...h}));const p=r[w].items.find(h=>h.id===u);p?p.onUpdate(u):console.error(`Could not find dropdown radio item with id '${u}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Qt,{children:[n.jsx(pe,{asChild:!0,children:n.jsxs(G,{variant:"default",children:[n.jsx(N.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(N.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(te,{children:r.map((w,u)=>n.jsxs("div",{children:[n.jsx(Ae,{children:w.label}),n.jsx(Kn,{children:w.itemType===0?n.jsx(n.Fragment,{children:w.items.map((p,h)=>n.jsx("div",{children:n.jsx(Gt,{checked:o[u][h],onCheckedChange:()=>l(u,h),children:p.label})},p.id))}):n.jsx(ho,{value:i[u],onValueChange:p=>d(u,p),children:w.items.map(p=>n.jsx("div",{children:n.jsx(bo,{value:p.id,children:p.label})},p.id))})}),n.jsx(ke,{})]},w.label))})]})})}function Ai({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:i,supportUrl:a,handleSupportLinkClick:l}){const d=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((u,p)=>u+p,0)),w=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(N.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(u=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u.toUpperCase()},u))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>w(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||a)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(N.Link,{className:"tw-h-4 tw-w-4"})]})}),a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(G,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(N.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Pi({id:t,versionHistory:e}){const[r,o]=c.useState(!1),s=new Date;function i(l){const d=new Date(l),w=new Date(s.getTime()-d.getTime()),u=w.getUTCFullYear()-1970,p=w.getUTCMonth(),h=w.getUTCDate()-1;let m="";return u>0?m=`${u.toString()} year${u===1?"":"s"} ago`:p>0?m=`${p.toString()} month${p===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const a=Object.entries(e).sort((l,d)=>d[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?a:a.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),a.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Li({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:i}){const a=c.useMemo(()=>y.formatBytes(r),[r]),d=(w=>{const u=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return w.map(p=>u.of(p))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Pi,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:a})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:d.join(", ")})]})})]})]})]})})}function To({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:i="Select All",clearAllText:a="Clear All",commandEmptyMessage:l="No entries found",customSelectedText:d,isOpen:w=void 0,onOpenChange:u=void 0,isDisabled:p=!1,sortSelected:h=!1,icon:m=void 0,className:g=void 0,variant:v="ghost",id:b}){const[j,k]=c.useState(!1),C=c.useCallback(R=>{var V;const F=(V=t.find(O=>O.label===R))==null?void 0:V.value;F&&r(e.includes(F)?e.filter(O=>O!==F):[...e,F])},[t,e,r]),_=()=>d||o,z=c.useMemo(()=>{if(!h)return t;const R=t.filter(V=>V.starred).sort((V,O)=>V.label.localeCompare(O.label)),F=t.filter(V=>!V.starred).sort((V,O)=>{const A=e.includes(V.value),K=e.includes(O.value);return A&&!K?-1:!A&&K?1:V.label.localeCompare(O.label)});return[...R,...F]},[t,e,h]),$=()=>{r(t.map(R=>R.value))},T=()=>{r([])},L=w??j,E=u??k;return n.jsx("div",{id:b,className:g,children:n.jsxs(Pt,{open:L,onOpenChange:E,children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(G,{variant:v,role:"combobox","aria-expanded":L,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[m&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),n.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Kt,{children:[n.jsx(je,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:$,children:i}),n.jsx(G,{variant:"ghost",size:"sm",onClick:T,children:a})]}),n.jsxs(qt,{children:[n.jsx(Oe,{children:l}),n.jsx(Bt,{children:z.map(R=>n.jsxs(At,{value:R.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(N.Check,{className:f("tw-h-4 tw-w-4",e.includes(R.value)?"tw-opacity-100":"tw-opacity-0")})}),R.starred&&n.jsx(N.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:R.label}),R.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:R.secondaryLabel})]},R.label))})]})]})})]})})}function $i({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:l,icon:d,className:w,badgesPlaceholder:u,id:p}){return n.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(To,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:i,isDisabled:a,sortSelected:l,icon:d,className:w}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var m;return n.jsxs(be,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(G,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(N.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(g=>g.value===h))==null?void 0:m.label]},h)})}):n.jsx(ot,{children:u})]})}function Ro({children:t,editorRef:e}){const r=c.useRef(null);return c.useEffect(()=>{var a;const o=/Macintosh/i.test(navigator.userAgent),s=((a=r.current)==null?void 0:a.querySelector(".editor-input"))??void 0,i=l=>{var d,w;s&&document.activeElement===s&&(o?l.metaKey:l.ctrlKey)&&(l.shiftKey&&l.key.toLowerCase()==="z"||l.key.toLowerCase()==="y"?(l.preventDefault(),(d=e.current)==null||d.redo()):l.key.toLowerCase()==="z"&&(l.preventDefault(),(w=e.current)==null||w.undo()))};return s==null||s.addEventListener("keydown",i),()=>{s==null||s.removeEventListener("keydown",i)}},[e]),n.jsx("div",{ref:r,children:t})}function _e({className:t,type:e,ref:r,...o}){return n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...o})}const Fi=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Vi({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const i=c.useRef(null),a=c.useRef(null),l=c.useRef(!1),[d,w]=c.useState(t),[u,p]=c.useState(r),[h,m]=c.useState(!1);c.useEffect(()=>{w(t)},[t]),c.useEffect(()=>{u!==r&&p(r)},[r]);const g=b=>{l.current=!1,m(b),b||(d!=="custom"||u?(e(d),o(u)):(w(t),p(r)))},v=b=>{var j,k,C,_;b.stopPropagation(),document.activeElement===a.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((j=i.current)==null||j.focus(),l.current=!0):document.activeElement===i.current&&b.key==="ArrowUp"?((k=a.current)==null||k.focus(),l.current=!1):document.activeElement===i.current&&b.key==="ArrowLeft"&&((C=i.current)==null?void 0:C.selectionStart)===0&&((_=a.current)==null||_.focus(),l.current=!1),d==="custom"&&b.key==="Enter"&&(document.activeElement===a.current||document.activeElement===i.current)&&g(!1)};return n.jsxs(Qt,{open:h,onOpenChange:g,children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(pe,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:Fi(t,s,r)})})}),n.jsx(_t,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(te,{className:"tw-z-[300]",onClick:()=>{l.current&&(l.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;l.current&&((b=i.current)==null||b.focus())},children:[n.jsx(Ae,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(ke,{}),n.jsx(Gt,{checked:d==="generated",onCheckedChange:()=>w("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.GENERATOR_NOTE_CALLER})]})}),n.jsx(Gt,{checked:d==="hidden",onCheckedChange:()=>w("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:yt.HIDDEN_NOTE_CALLER})]})}),n.jsx(Gt,{ref:a,checked:d==="custom",onCheckedChange:()=>w("custom"),onClick:b=>{var j;b.stopPropagation(),l.current=!0,(j=i.current)==null||j.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(_e,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),w("custom"),l.current=!0},ref:i,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:u,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>p(b.target.value)})]})})]})]})}const zi=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(N.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(N.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(N.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),Gi=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Bi({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Qt,{children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(jr.TooltipTrigger,{asChild:!0,children:n.jsx(pe,{asChild:!0,children:n.jsx(G,{variant:"outline",className:"tw-h-6",children:zi(t,r)})})}),n.jsx(_t,{children:n.jsx("p",{children:Gi(t,r)})})]})}),n.jsxs(te,{className:"tw-z-[300]",children:[n.jsx(Ae,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(ke,{}),n.jsxs(Gt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(N.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(N.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Gt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(N.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const Mo=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Ki({icon:t,className:e}){const r=t??N.Ban;return n.jsx(r,{className:e,size:16})}function Do({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=c.useState(""),i=c.useMemo(()=>{const a=o.trim().toLowerCase();return a?e.filter(l=>{var d;return((d=l.marker)==null?void 0:d.toLowerCase().includes(a))||l.title.toLowerCase().includes(a)}):e},[o,e]);return n.jsxs(Kt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(je,{className:"marker-menu-search",ref:r,value:o,onValueChange:a=>s(a),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(qt,{children:[n.jsx(Oe,{children:t["%markerMenu_noResults%"]}),n.jsx(Bt,{children:i.map(a=>{var l;return n.jsxs(At,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:a.isDisallowed||a.isDeprecated,onSelect:a.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:a.marker?n.jsx("span",{className:"tw-text-xs",children:a.marker}):n.jsx("div",{children:n.jsx(Ki,{icon:a.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:a.title}),a.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:a.subtitle})]}),(a.isDisallowed||a.isDeprecated)&&n.jsx(Sr,{className:"tw-font-sans",children:a.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${a.marker??((l=a.icon)==null?void 0:l.displayName)}-${a.title.replaceAll(" ","")}`)})})]})]})}function qi(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const i=[];return Object.entries(s.children).forEach(([,a])=>{i.push(...a.map(l=>({marker:l,title:r[y.usfmMarkers[l].description]??y.usfmMarkers[l].description,action:()=>{var d;(d=t.current)==null||d.insertMarker(l),e()}})))}),i.sort((a,l)=>(a.marker??a.title).localeCompare(l.marker??l.title))}function Ui(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Hi(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Yi={type:"USJ",version:"3.1",content:[{type:"para"}]};function Xi({classNameForEditor:t,noteOps:e,onSave:r,onClose:o,scrRef:s,noteKey:i,editorOptions:a,defaultMarkerMenuTrigger:l,localizedStrings:d}){const w=c.useRef(null),u=c.useRef(null),p=c.useRef(null),[h,m]=c.useState("generated"),[g,v]=c.useState("*"),[b,j]=c.useState("f"),[k,C]=c.useState(!1),[_,z]=c.useState(!1),[$,T]=c.useState(),[L,E]=c.useState(),[R,F]=c.useState(),[V,O]=c.useState(),A=c.useRef(null),K=c.useMemo(()=>({...a,markerMenuTrigger:l,hasExternalUI:!0,view:{...a.view??yt.getDefaultViewOptions(),noteMode:"expanded"}}),[a,l]),D=c.useMemo(()=>qi(w,()=>z(!1),d,V),[d,V]);c.useEffect(()=>{var P;_||(P=w.current)==null||P.focus()},[b,_]),c.useEffect(()=>{var B,Y;let P;const M=e==null?void 0:e.at(0);if(M&&yt.isInsertEmbedOpOfType("note",M)){const X=(B=M.insert.note)==null?void 0:B.caller;let Q="custom";X===yt.GENERATOR_NOTE_CALLER?Q="generated":X===yt.HIDDEN_NOTE_CALLER?Q="hidden":X&&v(X),m(Q),j(((Y=M.insert.note)==null?void 0:Y.style)??"f"),P=setTimeout(()=>{var ft;(ft=w.current)==null||ft.applyUpdate([M])},0)}return()=>{P&&clearTimeout(P)}},[e,i]);const U=c.useCallback(()=>{var M,B;const P=(B=(M=w.current)==null?void 0:M.getNoteOps(0))==null?void 0:B.at(0);P&&yt.isInsertEmbedOpOfType("note",P)&&(P.insert.note&&(h==="custom"?P.insert.note.caller=g:P.insert.note.caller=h==="generated"?yt.GENERATOR_NOTE_CALLER:yt.HIDDEN_NOTE_CALLER),r([P]))},[h,g,r]),xt=()=>{var M;const P=(M=u.current)==null?void 0:M.getElementsByClassName("editor-input")[0];P!=null&&P.textContent&&navigator.clipboard.writeText(P.textContent)},Nt=P=>{var B,Y,X,Q,ft;j(P);const M=(Y=(B=w.current)==null?void 0:B.getNoteOps(0))==null?void 0:Y.at(0);if(M&&yt.isInsertEmbedOpOfType("note",M)){M.insert.note&&(M.insert.note.style=P);const nt=(Q=(X=M.insert.note)==null?void 0:X.contents)==null?void 0:Q.ops;b!=="x"&&P==="x"?nt==null||nt.forEach(ht=>Ui(ht)):b==="x"&&P!=="x"&&(nt==null||nt.forEach(ht=>Hi(ht))),(ft=w.current)==null||ft.applyUpdate([M,{delete:1}])}},Ct=P=>{var B,Y,X,Q,ft,nt;(B=w.current)==null||B.focus();const M=(X=(Y=w.current)==null?void 0:Y.getNoteOps(0))==null?void 0:X.at(0);if(M&&yt.isInsertEmbedOpOfType("note",M)){P.content.length>1&&setTimeout(()=>{var ct;(ct=w.current)==null||ct.applyUpdate([{retain:2},{delete:1}])},0);const ht=(Q=M.insert.note)==null?void 0:Q.style,Et=(nt=(ft=M.insert.note)==null?void 0:ft.contents)==null?void 0:nt.ops;ht||C(!1),C(ht==="x"?!!(Et!=null&&Et.every(ct=>{var Ft,S;if(!((Ft=ct.attributes)!=null&&Ft.char))return!0;const wt=((S=ct.attributes)==null?void 0:S.char).style;return wt==="xt"||wt==="xo"||wt==="xq"})):!!(Et!=null&&Et.every(ct=>{var Ft,S;if(!((Ft=ct.attributes)!=null&&Ft.char))return!0;const wt=((S=ct.attributes)==null?void 0:S.char).style;return wt==="ft"||wt==="fr"||wt==="fq"})))}else C(!1)},et=c.useCallback(()=>{const P=window.getSelection();if(p.current&&D.length&&P&&P.rangeCount>0){const M=P.getRangeAt(0).getBoundingClientRect(),B=p.current.getBoundingClientRect();T(M.left-B.left),E(M.top-B.top),F(M.height),z(!0)}},[D,p]);return c.useEffect(()=>{const P=()=>{_&&z(!1)};return window.addEventListener("click",P),()=>{window.removeEventListener("click",P)}},[_]),c.useEffect(()=>{var P;_&&((P=A.current)==null||P.focus())},[_]),c.useEffect(()=>{var B;const P=((B=u.current)==null?void 0:B.querySelector(".editor-input"))??void 0,M=Y=>{!_&&P&&document.activeElement===P&&Y.key===l?(Y.preventDefault(),et()):_&&Y.key==="Escape"&&(Y.preventDefault(),z(!1))};return document.addEventListener("keydown",M),()=>{document.removeEventListener("keydown",M)}},[_,et,l]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Bi,{isTypeSwitchable:k,noteType:b,handleNoteTypeChange:Nt,localizedStrings:d}),n.jsx(Vi,{callerType:h,updateCallerType:m,customCaller:g,updateCustomCaller:v,localizedStrings:d})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(G,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(N.X,{})})}),n.jsx(_t,{children:n.jsx("p",{children:d["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(G,{onClick:U,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(N.Check,{})})}),n.jsx(_t,{children:d["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:u,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(Ro,{editorRef:w,children:n.jsx(yt.Editorial,{options:K,onStateChange:P=>O(P.contextMarker),onUsjChange:Ct,defaultUsj:Yi,onScrRefChange:()=>{},scrRef:s,ref:w})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(G,{onClick:xt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(N.Copy,{})})}),n.jsx(_t,{children:n.jsx("p",{children:d["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:p,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Pt,{open:_,children:[n.jsx(Dr,{className:"tw-absolute",style:{top:L,left:$,height:R,width:0,pointerEvents:"none"}}),n.jsx(Lt,{className:"tw-w-[500px] tw-p-0",onClick:P=>{P.preventDefault(),P.stopPropagation()},children:n.jsx(Do,{markerMenuItems:D,localizedStrings:d,searchRef:A})})]})]})}const Wi=Object.freeze([...Mo,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function Io(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function Ji(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],i=[];let a=[];return e.forEach(l=>{typeof l!="string"&&l.marker==="fp"?(a.length>0&&i.push(a),a=[l]):a.push(l)}),a.length>0&&i.push(a),i.map((l,d)=>{const w=d===i.length-1;return n.jsxs("p",{children:[qn(t,l,r,!0,s),w&&o]},Io(t,l))})}function qn(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const a=`${t}-text-${i.slice(0,10)}`;if(o){const l=f(`usfm_${t}`);return n.jsx("span",{className:l,children:i},a)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(N.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(N.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},a)}return Zi(i,Io(`${t}\\${i.marker}`,[i]),r,[...s,t??"unknown"])})}function Zi(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(N.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),qn(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Oo({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,i=s!==t.caller;let a,l=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([a,...l]=t.content);const d=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,w=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,u=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:i}),children:[s," "]}),p=a&&n.jsxs(n.Fragment,{children:[qn(t.marker,[a],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",m=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=f(h,m);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[d,u]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:p}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:l&&l.length>0&&n.jsx(n.Fragment,{children:Ji(t.marker,l,o,w)})})]})}function Qi({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:a=!0,suppressFormatting:l=!1,formatCaller:d,onFootnoteSelected:w}){const u=d??y.getFormatCallerFunction(r,void 0),p=(k,C)=>{w==null||w(k,C,s)},h=i?r.findIndex(k=>k===i):-1,[m,g]=c.useState(h),v=(k,C,_)=>{if(r.length)switch(k.key){case"Enter":case" ":k.preventDefault(),w==null||w(C,_,s);break}},b=k=>{if(r.length)switch(k.key){case"ArrowDown":k.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":k.preventDefault(),g(C=>Math.max(C-1,0));break}},j=c.useRef([]);return c.useEffect(()=>{var k;m>=0&&m<j.current.length&&((k=j.current[m])==null||k.focus())},[m]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:m<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!l&&"formatted-font"),children:r.map((k,C)=>{const _=k===i,z=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:$=>{j.current[C]=$},role:"option","aria-selected":_,"data-marker":k.marker,"data-state":_?"selected":void 0,tabIndex:C===m?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",w&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>p(k,C),onKeyDown:$=>v($,k,C),children:n.jsx(Oo,{footnote:k,layout:o,formatCaller:()=>u(k.caller,C),showMarkers:a})},z),C<r.length-1&&o==="vertical"&&n.jsx(ve,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function tl(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function el({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],i=r["%webView_inventory_occurrences_table_header_occurrence%"],a=c.useMemo(()=>{const l=[],d=new Set;return t.forEach(w=>{const u=`${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;d.has(u)||(d.add(u),l.push(w))}),l},[t]);return n.jsxs(nn,{stickyHeader:!0,children:[n.jsx(rn,{stickyHeader:!0,children:n.jsxs(zt,{children:[n.jsx(Ie,{children:s}),n.jsx(Ie,{children:i})]})}),n.jsx(on,{children:a.length>0&&a.map(l=>n.jsxs(zt,{onClick:()=>{e(l.reference)},children:[n.jsx(ae,{children:y.formatScrRef(l.reference,"English")}),n.jsx(ae,{className:o,children:tl(l.text)})]},`${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`))})]})}function Un({className:t,ref:e,...r}){return n.jsx(er.Root,{ref:e,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...r,children:n.jsx(er.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})})}const nl=t=>{if(t==="asc")return n.jsx(N.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(N.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Pe=(t,e,r)=>n.jsx(bt,{children:n.jsxs(kt,{children:[n.jsxs(Tt,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),nl(t.getIsSorted())]}),n.jsx(_t,{side:"bottom",children:e})]})}),rl=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Pe(e,t)}),ol=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Pe(r,t)}),sl=t=>({accessorKey:"count",header:({column:e})=>Pe(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),hn=(t,e,r,o,s,i)=>{let a=[...r];t.forEach(d=>{e==="approved"?a.includes(d)||a.push(d):a=a.filter(w=>w!==d)}),o(a);let l=[...s];t.forEach(d=>{e==="unapproved"?l.includes(d)||l.push(d):l=l.filter(w=>w!==d)}),i(l)},al=(t,e,r,o,s)=>({accessorKey:"status",header:({column:i})=>Pe(i,t,"tw-justify-center"),cell:({row:i})=>{const a=i.getValue("status"),l=i.getValue("item");return n.jsxs(Vn,{value:a,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(Te,{onClick:d=>{d.stopPropagation(),hn([l],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(N.CircleCheckIcon,{})}),n.jsx(Te,{onClick:d=>{d.stopPropagation(),hn([l],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(N.CircleXIcon,{})}),n.jsx(Te,{onClick:d=>{d.stopPropagation(),hn([l],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(N.CircleHelpIcon,{})})]})}}),il=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),ll=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},cl=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Ao=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",wl=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),dl=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},ul=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Ao(s,e,r),occurrences:o.occurrences||[]}}),Dt=(t,e)=>t[e]??e;function pl({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:i,scope:a,onScopeChange:l,columns:d,id:w,areInventoryItemsLoading:u=!1,classNameForVerseText:p,onItemSelected:h}){const m=Dt(r,"%webView_inventory_all%"),g=Dt(r,"%webView_inventory_approved%"),v=Dt(r,"%webView_inventory_unapproved%"),b=Dt(r,"%webView_inventory_unknown%"),j=Dt(r,"%webView_inventory_scope_currentBook%"),k=Dt(r,"%webView_inventory_scope_chapter%"),C=Dt(r,"%webView_inventory_scope_verse%"),_=Dt(r,"%webView_inventory_filter_text%"),z=Dt(r,"%webView_inventory_show_additional_items%"),$=Dt(r,"%webView_inventory_no_results%"),[T,L]=c.useState(!1),[E,R]=c.useState("all"),[F,V]=c.useState(""),[O,A]=c.useState([]),K=c.useMemo(()=>{const M=t??[];return M.length===0?[]:ul(M,s,i)},[t,s,i]),D=c.useMemo(()=>{if(T)return K;const M=[];return K.forEach(B=>{const Y=B.items[0],X=M.find(Q=>Q.items[0]===Y);X?(X.count+=B.count,X.occurrences=X.occurrences.concat(B.occurrences)):M.push({items:[Y],count:B.count,occurrences:B.occurrences,status:B.status})}),M},[T,K]),U=c.useMemo(()=>D.length===0?[]:dl(D,E,F),[D,E,F]),xt=c.useMemo(()=>{var Y,X;if(!T)return d;const M=(Y=o==null?void 0:o.tableHeaders)==null?void 0:Y.length;if(!M)return d;const B=[];for(let Q=0;Q<M;Q++)B.push(ol(((X=o==null?void 0:o.tableHeaders)==null?void 0:X[Q])||"Additional Item",Q+1));return[...B,...d]},[o==null?void 0:o.tableHeaders,d,T]);c.useEffect(()=>{U.length===0?A([]):U.length===1&&A(U[0].items)},[U]);const Nt=(M,B)=>{B.setRowSelection(()=>{const X={};return X[M.index]=!0,X});const Y=M.original.items;A(Y),h&&Y.length>0&&h(Y[0])},Ct=M=>{if(M==="book"||M==="chapter"||M==="verse")l(M);else throw new Error(`Invalid scope value: ${M}`)},et=M=>{if(M==="all"||M==="approved"||M==="unapproved"||M==="unknown")R(M);else throw new Error(`Invalid status filter value: ${M}`)},P=c.useMemo(()=>{if(D.length===0||O.length===0)return[];const M=D.filter(B=>y.deepEqual(T?B.items:[B.items[0]],O));if(M.length>1)throw new Error("Selected item is not unique");return M.length===0?[]:M[0].occurrences},[O,T,D]);return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(ie,{onValueChange:M=>et(M),defaultValue:E,children:[n.jsx(ce,{className:"tw-m-1",children:n.jsx(le,{placeholder:"Select filter"})}),n.jsxs(we,{children:[n.jsx(jt,{value:"all",children:m}),n.jsx(jt,{value:"approved",children:g}),n.jsx(jt,{value:"unapproved",children:v}),n.jsx(jt,{value:"unknown",children:b})]})]}),n.jsxs(ie,{onValueChange:M=>Ct(M),defaultValue:a,children:[n.jsx(ce,{className:"tw-m-1",children:n.jsx(le,{placeholder:"Select scope"})}),n.jsxs(we,{children:[n.jsx(jt,{value:"book",children:j}),n.jsx(jt,{value:"chapter",children:k}),n.jsx(jt,{value:"verse",children:C})]})]}),n.jsx(_e,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:F,onChange:M=>{V(M.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(Un,{className:"tw-m-1",checked:T,onCheckedChange:M=>{L(M)}}),n.jsx(ot,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??z})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(No,{columns:xt,data:U,onRowClickHandler:Nt,stickyHeader:!0,isLoading:u,noResultsMessage:$})}),P.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(el,{classNameForText:p,occurrenceData:P,setScriptureReference:e,localizedStrings:r})})]})}const ml="16rem",fl="3rem",Po=c.createContext(void 0);function Le(){const t=c.useContext(Po);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}function Lo({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:i,side:a="primary",ref:l,...d}){const[w,u]=c.useState(t),p=e??w,h=c.useCallback(C=>{const _=typeof C=="function"?C(p):C;r?r(_):u(_)},[r,p]),m=c.useCallback(()=>h(C=>!C),[h]),g=p?"expanded":"collapsed",j=at()==="ltr"?a:a==="primary"?"secondary":"primary",k=c.useMemo(()=>({state:g,open:p,setOpen:h,toggleSidebar:m,side:j}),[g,p,h,m,j]);return n.jsx(Po.Provider,{value:k,children:n.jsx(bt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":ml,"--sidebar-width-icon":fl,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:l,...d,children:i})})})}function $o({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,ref:s,...i}){const a=Le();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:s,...i,children:o}):n.jsxs("div",{ref:s,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":a.state,"data-collapsible":a.state==="collapsed"?e:"","data-variant":t,"data-side":a.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",a.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...i,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})}function hl({className:t,onClick:e,ref:r,...o}){const s=Le();return n.jsxs(G,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),s.toggleSidebar()},...o,children:[s.side==="primary"?n.jsx(N.PanelLeft,{}):n.jsx(N.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})}function gl({className:t,ref:e,...r}){const{toggleSidebar:o}=Le();return n.jsx("button",{type:"button",ref:e,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...r})}function Fo({className:t,ref:e,...r}){return n.jsx("main",{ref:e,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...r})}function xl({className:t,ref:e,...r}){return n.jsx(_e,{ref:e,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...r})}function bl({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...r})}function vl({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...r})}function yl({className:t,ref:e,...r}){return n.jsx(ve,{ref:e,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...r})}function Vo({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...r})}function Cn({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...r})}function En({className:t,asChild:e=!1,ref:r,...o}){const s=e?ye.Slot:"div";return n.jsx(s,{ref:r,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...o})}function jl({className:t,asChild:e=!1,ref:r,...o}){const s=e?ye.Slot:"button";return n.jsx(s,{ref:r,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...o})}function Sn({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...r})}function zo({className:t,ref:e,...r}){return n.jsx("ul",{ref:e,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...r})}function Go({className:t,ref:e,...r}){return n.jsx("li",{ref:e,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...r})}const kl=Jt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}});function Bo({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:i,ref:a,...l}){const d=t?ye.Slot:"button",{state:w}=Le(),u=n.jsx(d,{ref:a,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(kl({variant:r,size:o}),i),...l});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:u}),n.jsx(_t,{side:"right",align:"center",hidden:w!=="collapsed",...s})]})):u}function _l({className:t,asChild:e=!1,showOnHover:r=!1,ref:o,...s}){const i=e?ye.Slot:"button";return n.jsx(i,{ref:o,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...s})}function Nl({className:t,ref:e,...r}){return n.jsx("div",{ref:e,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...r})}function Cl({className:t,showIcon:e=!1,ref:r,...o}){const s=c.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...o,children:[e&&n.jsx(We,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(We,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})}function El({className:t,ref:e,...r}){return n.jsx("ul",{ref:e,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...r})}function Sl({ref:t,...e}){return n.jsx("li",{ref:t,...e})}function Tl({asChild:t=!1,size:e="md",isActive:r,className:o,ref:s,...i}){const a=t?ye.Slot:"a";return n.jsx(a,{ref:s,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...i})}function Ko({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:a,buttonPlaceholderText:l,className:d}){const w=c.useCallback((h,m)=>{o(h,m)},[o]),u=c.useCallback(h=>{const m=r.find(g=>g.projectId===h);return m?m.projectName:h},[r]),p=c.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx($o,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",d),children:n.jsxs(Vo,{children:[n.jsxs(Cn,{children:[n.jsx(En,{className:"tw-text-sm",children:i}),n.jsx(Sn,{children:n.jsx(zo,{children:Object.entries(e).map(([h,m])=>n.jsx(Go,{children:n.jsx(Bo,{onClick:()=>w(h),isActive:p(h),children:n.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),n.jsxs(Cn,{children:[n.jsx(En,{className:"tw-text-sm",children:a}),n.jsx(Sn,{className:"tw-pl-3",children:n.jsx(Ue,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:u,buttonPlaceholder:l,onChange:h=>{const m=u(h);w(m,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(N.ScrollText,{})})})]})]})})}const sn=c.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:i=!1,id:a},l)=>{const d=at();return n.jsxs("div",{id:a,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(N.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":d==="rtl"},{"tw-left-3":d==="ltr"})}),n.jsx(_e,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:w=>e(w.target.value),disabled:i}),t&&n.jsxs(G,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":d==="rtl"},{"tw-right-0":d==="ltr"}),onClick:()=>{e("")},children:[n.jsx(N.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});sn.displayName="SearchBar";function Rl({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:i,searchValue:a,onSearch:l,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:u}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(sn,{className:"tw-w-9/12",value:a,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(Lo,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ko,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:i,extensionsSidebarGroupLabel:d,projectsSidebarGroupLabel:w,buttonPlaceholderText:u}),n.jsx(Fo,{className:"tw-min-w-[215px]",children:o})]})]})}const Yt="scrBook",Ml="scrRef",oe="source",Dl="details",Il="Scripture Reference",Ol="Scripture Book",qo="Type",Al="Details";function Pl(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:Yt,header:(t==null?void 0:t.scriptureReferenceColumnName)??Il,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?tt.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===Yt?y.formatScrRef(s.start):void 0},getGroupingValue:o=>tt.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:Ml,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:oe,header:r?(t==null?void 0:t.typeColumnName)??qo:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Dl,header:(t==null?void 0:t.detailsColumnName)??Al,cell:o=>o.getValue(),enableGrouping:!1}]}const Ll=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},vr=t=>`${Ll({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function $l({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:i,detailsColumnName:a,onRowSelected:l,id:d}){const[w,u]=c.useState([]),[p,h]=c.useState([{id:Yt,desc:!1}]),[m,g]=c.useState({}),v=c.useMemo(()=>t.flatMap(E=>E.data.map(R=>({...R,source:E.source}))),[t]),b=c.useMemo(()=>Pl({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:a},r),[o,i,a,r]);c.useEffect(()=>{w.includes(oe)?h([{id:oe,desc:!1},{id:Yt,desc:!1}]):h([{id:Yt,desc:!1}])},[w]);const j=pt.useReactTable({data:v,columns:b,state:{grouping:w,sorting:p,rowSelection:m},onGroupingChange:u,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:pt.getExpandedRowModel(),getGroupedRowModel:pt.getGroupedRowModel(),getCoreRowModel:pt.getCoreRowModel(),getSortedRowModel:pt.getSortedRowModel(),getRowId:vr,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});c.useEffect(()=>{if(l){const E=j.getSelectedRowModel().rowsById,R=Object.keys(E);if(R.length===1){const F=v.find(V=>vr(V)===R[0])||void 0;F&&l(F)}}},[m,v,l,j]);const k=s??Ol,C=i??qo,_=[{label:"No Grouping",value:[]},{label:`Group by ${k}`,value:[Yt]},{label:`Group by ${C}`,value:[oe]},{label:`Group by ${k} and ${C}`,value:[Yt,oe]},{label:`Group by ${C} and ${k}`,value:[oe,Yt]}],z=E=>{u(JSON.parse(E))},$=(E,R)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(R)},T=(E,R)=>E.getIsGrouped()?"":f("banded-row",R%2===0?"even":"odd"),L=(E,R,F)=>{if(!((E==null?void 0:E.length)===0||R.depth<F.column.getGroupedIndex())){if(R.getIsGrouped())switch(R.depth){case 1:return"tw-ps-4";default:return}switch(R.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(ie,{value:JSON.stringify(w),onValueChange:E=>{z(E)},children:[n.jsx(ce,{className:"tw-mb-1 tw-mt-2",children:n.jsx(le,{})}),n.jsx(we,{position:"item-aligned",children:n.jsx(yo,{children:_.map(E=>n.jsx(jt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(nn,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(rn,{children:j.getHeaderGroups().map(E=>n.jsx(zt,{children:E.headers.filter(R=>R.column.columnDef.header).map(R=>n.jsx(Ie,{colSpan:R.colSpan,className:"top-0 tw-sticky",children:R.isPlaceholder?void 0:n.jsxs("div",{children:[R.column.getCanGroup()?n.jsx(G,{variant:"ghost",title:`Toggle grouping by ${R.column.columnDef.header}`,onClick:R.column.getToggleGroupingHandler(),type:"button",children:R.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",pt.flexRender(R.column.columnDef.header,R.getContext())]})},R.id))},E.id))}),n.jsx(on,{children:j.getRowModel().rows.map((E,R)=>{const F=at();return n.jsx(zt,{"data-state":E.getIsSelected()?"selected":"",className:f(T(E,R)),onClick:V=>$(E,V),children:E.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==oe||!r)))return n.jsx(ae,{className:f(V.column.columnDef.id,"tw-p-[1px]",L(w,E,V)),children:V.getIsGrouped()?n.jsxs(G,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(N.ChevronDown,{}),!E.getIsExpanded()&&(F==="ltr"?n.jsx(N.ChevronRight,{}):n.jsx(N.ChevronLeft,{}))," ",pt.flexRender(V.column.columnDef.cell,V.getContext())," (",E.subRows.length,")"]}):pt.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},E.id)})})]})]})}const Hn=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),Uo=(t,e,r)=>Hn(t,e).every(o=>r.includes(o));function Fl({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const i=Hn(e,t).length===0,a=s["%scripture_section_ot_short%"],l=s["%scripture_section_nt_short%"],d=s["%scripture_section_dc_short%"],w=s["%scripture_section_extra_short%"];return n.jsx(G,{variant:"outline",size:"sm",onClick:()=>o(t),className:f(Uo(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:zs(t,a,l,d,w)})}const yr=5,gn=6;function Vl({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const i=o["%webView_book_selector_books_selected%"],a=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],d=o["%webView_book_selector_select_all%"],w=o["%webView_book_selector_clear_all%"],u=o["%webView_book_selector_no_book_found%"],p=o["%webView_book_selector_more%"],{otLong:h,ntLong:m,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,j]=c.useState(!1),[k,C]=c.useState(""),_=c.useRef(void 0),z=c.useRef(!1);if(t.length!==tt.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const $=c.useMemo(()=>tt.Canon.allBookIds.filter((A,K)=>t[K]==="1"&&!tt.Canon.isObsolete(tt.Canon.bookIdToNumber(A))),[t]),T=c.useMemo(()=>{if(!k.trim()){const D={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return $.forEach(U=>{const xt=y.getSectionForBook(U);D[xt].push(U)}),D}const A=$.filter(D=>Dn(D,k,s)),K={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return A.forEach(D=>{const U=y.getSectionForBook(D);K[U].push(D)}),K},[$,k,s]),L=c.useCallback((A,K=!1)=>{if(!K||!_.current){r(e.includes(A)?e.filter(et=>et!==A):[...e,A]),_.current=A;return}const D=$.findIndex(et=>et===_.current),U=$.findIndex(et=>et===A);if(D===-1||U===-1)return;const[xt,Nt]=[Math.min(D,U),Math.max(D,U)],Ct=$.slice(xt,Nt+1).map(et=>et);r(e.includes(A)?e.filter(et=>!Ct.includes(et)):[...new Set([...e,...Ct])])},[e,r,$]),E=A=>{L(A,z.current),z.current=!1},R=(A,K)=>{A.preventDefault(),L(K,A.shiftKey)},F=c.useCallback(A=>{const K=Hn($,A).map(D=>D);r(Uo($,A,e)?e.filter(D=>!K.includes(D)):[...new Set([...e,...K])])},[e,r,$]),V=()=>{r($.map(A=>A))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(A=>n.jsx(Fl,{section:A,availableBookIds:$,selectedBookIds:e,onToggle:F,localizedStrings:o},A))}),n.jsxs(Pt,{open:b,onOpenChange:A=>{j(A),A||C("")},children:[n.jsx(Ut,{asChild:!0,children:n.jsxs(G,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:a,n.jsx(N.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Lt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Kt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(z.current=A.shiftKey)},children:[n.jsx(je,{placeholder:l,value:k,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(G,{variant:"ghost",size:"sm",onClick:V,children:d}),n.jsx(G,{variant:"ghost",size:"sm",onClick:O,children:w})]}),n.jsxs(qt,{children:[n.jsx(Oe,{children:u}),Object.values(y.Section).map((A,K)=>{const D=T[A];if(D.length!==0)return n.jsxs(c.Fragment,{children:[n.jsx(Bt,{heading:Tr(A,h,m,g,v),children:D.map(U=>n.jsx(Mr,{bookId:U,isSelected:e.includes(U),onSelect:()=>E(U),onMouseDown:xt=>R(xt,U),section:y.getSectionForBook(U),showCheck:!0,localizedBookNames:s,commandValue:jn(U,s),className:"tw-flex tw-items-center"},U))}),K<Object.values(y.Section).length-1&&n.jsx(Vs,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===gn?gn:yr).map(A=>n.jsx(be,{className:"hover:tw-bg-secondary",variant:"secondary",children:he(A,s)},A)),e.length>gn&&n.jsx(be,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-yr} ${p}`})]})]})}const zl=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),ne=(t,e)=>t[e]??e;function Gl({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:i,localizedStrings:a,localizedBookNames:l,id:d}){const w=ne(a,"%webView_scope_selector_selected_text%"),u=ne(a,"%webView_scope_selector_current_verse%"),p=ne(a,"%webView_scope_selector_current_chapter%"),h=ne(a,"%webView_scope_selector_current_book%"),m=ne(a,"%webView_scope_selector_choose_books%"),g=ne(a,"%webView_scope_selector_scope%"),v=ne(a,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:w,id:"scope-selected-text"},{value:"verse",label:u,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],j=e?b.filter(k=>e.includes(k.value)):b;return n.jsxs("div",{id:d,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ot,{children:g}),n.jsx(On,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:k,label:C,id:_})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(qe,{className:"tw-me-2",value:k,id:_}),n.jsx(ot,{htmlFor:_,children:C})]},_))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(ot,{children:v}),n.jsx(Vl,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:i,localizedStrings:a,localizedBookNames:l})]})]})}const xn={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Bl({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:i,id:a}){const l={...xn,...Object.fromEntries(Object.entries(o).map(([w,u])=>[w,w===u&&w in xn?xn[w]:u]))},d=at();return n.jsxs(ie,{value:`${e}`,onValueChange:w=>r(w==="undefined"?void 0:parseInt(w,10)),children:[n.jsx(ce,{size:s,className:f("pr-twp tw-w-auto",i),children:n.jsx(le,{placeholder:l[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(we,{id:a,align:d==="rtl"?"end":"start",style:{zIndex:250},children:t.map(w=>n.jsx(jt,{value:`${w}`,children:l[y.getLocalizeKeyForScrollGroupId(w)]},`${w}`))})]})}function Kl({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function ql({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function Ul({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ve,{}):""]})}function Ho(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function Je({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Yo=(t,e,r,o)=>r?Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,d)=>l.order-d.order).map(l=>n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:"command"in l?n.jsxs(Xe,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(Je,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(Je,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(fo,{children:[n.jsx(go,{children:l.label}),n.jsx(mo,{children:n.jsx(xo,{children:Yo(t,e,Ho(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(_t,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function Ze({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:i,buttonVariant:a="ghost",id:l}){return n.jsxs(Qt,{variant:i,children:[n.jsx(pe,{"aria-label":r,className:s,asChild:!0,id:l,children:n.jsx(G,{variant:a,size:"icon",children:o??n.jsx(N.MenuIcon,{})})}),n.jsx(te,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,w])=>typeof d=="boolean"||typeof w=="boolean"?0:d.order-w.order).map(([d],w,u)=>n.jsxs(c.Fragment,{children:[n.jsx(Kn,{children:n.jsx(bt,{children:Yo(e.groups,e.items,d,t)})}),w<u.length-1&&n.jsx(ke,{})]},d))})]})}const Xo=c.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function Hl({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:i,startAreaChildren:a,centerAreaChildren:l,endAreaChildren:d,menuButtonIcon:w}){return n.jsxs(Xo,{className:`tw-w-full tw-border ${i}`,id:s,children:[r&&n.jsx(Ze,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:w??n.jsx(N.Menu,{}),buttonVariant:"ghost"}),a&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:a}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(Ze,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(N.EllipsisVertical,{}),className:"tw-h-full"}),d]})]})}function Yl({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(Xo,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(Ze,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Yn=c.forwardRef(({className:t,...e},r)=>{const o=at();return n.jsx(Rt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Yn.displayName=Rt.List.displayName;const Xn=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Xn.displayName=Rt.List.displayName;const Wo=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Wn=c.forwardRef(({className:t,...e},r)=>n.jsx(Rt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Wn.displayName=Rt.Content.displayName;function Xl({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:a}){return n.jsxs("div",{id:a,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(sn,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Yn,{children:[n.jsx(Xn,{children:t.map(l=>n.jsx(Wo,{value:l.value,children:l.value},l.key))}),t.map(l=>n.jsx(Wn,{value:l.value,children:l.content},l.key))]})]})}function Wl({...t}){return n.jsx(Ot.Menu,{...t})}function Jl({...t}){return n.jsx(Ot.Sub,{"data-slot":"menubar-sub",...t})}function Zl({className:t,variant:e="default",ref:r,...o}){const s=c.useMemo(()=>({variant:e}),[e]);return n.jsx(Bn.Provider,{value:s,children:n.jsx(Ot.Root,{ref:r,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...o})})}function Ql({className:t,ref:e,...r}){const o=Ht();return n.jsx(Ot.Trigger,{ref:e,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ue({variant:o.variant,className:t})),...r})}function tc({className:t,inset:e,children:r,ref:o,...s}){const i=Ht();return n.jsxs(Ot.SubTrigger,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ue({variant:i.variant,className:t}),t),...s,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function ec({className:t,ref:e,...r}){const o=Ht();return n.jsx(Ot.SubContent,{ref:e,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...r})}function nc({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,ref:s,...i}){const a=Ht();return n.jsx(Ot.Portal,{children:n.jsx(Ot.Content,{ref:s,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":a.variant==="muted"},t),...i})})}function rc({className:t,inset:e,ref:r,...o}){const s=Ht();return n.jsx(Ot.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ue({variant:s.variant,className:t}),t),...o})}function oc({className:t,ref:e,...r}){return n.jsx(Ot.Separator,{ref:e,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...r})}const Ce=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Jo=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([i,a])=>"column"in a&&a.column===r||i===r).sort(([,i],[,a])=>i.order-a.order);return s.flatMap(([i],a)=>{const l=e.filter(w=>w.group===i).sort((w,u)=>w.order-u.order).map(w=>n.jsxs(kt,{children:[n.jsx(Tt,{asChild:!0,children:"command"in w?n.jsxs(rc,{onClick:()=>{o(w)},children:[w.iconPathBefore&&n.jsx(Je,{icon:w.iconPathBefore,menuLabel:w.label,leading:!0}),w.label,w.iconPathAfter&&n.jsx(Je,{icon:w.iconPathAfter,menuLabel:w.label})]},`menubar-item-${w.label}-${w.command}`):n.jsxs(Jl,{children:[n.jsx(tc,{children:w.label}),n.jsx(ec,{children:Jo(t,e,Ho(t,w.id),o)})]},`menubar-sub-${w.label}-${w.id}`)}),w.tooltip&&n.jsx(_t,{children:w.tooltip})]},`tooltip-${w.label}-${"command"in w?w.command:w.id}`)),d=[...l];return l.length>0&&a<s.length-1&&d.push(n.jsx(oc,{},`separator-${i}`)),d})};function sc({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=c.useRef(void 0),i=c.useRef(void 0),a=c.useRef(void 0),l=c.useRef(void 0),d=c.useRef(void 0),w=u=>{switch(u){case"platform.app":return i;case"platform.window":return a;case"platform.layout":return l;case"platform.help":return d;default:return}};if(Ns.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(u,p)=>{var g,v,b,j;u.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":Ce(i,[h]);break;case"alt+p":(g=i.current)==null||g.focus(),Ce(i,[h,m]);break;case"alt+l":(v=a.current)==null||v.focus(),Ce(a,[h,m]);break;case"alt+n":(b=l.current)==null||b.focus(),Ce(l,[h,m]);break;case"alt+h":(j=d.current)==null||j.focus(),Ce(d,[h,m]);break}}),c.useEffect(()=>{if(!r||!s.current)return;const u=new MutationObserver(m=>{m.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(m=>{u.observe(m,{attributes:!0})}),()=>u.disconnect()},[r]),!!t)return n.jsx(Zl,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,p])=>typeof u=="boolean"||typeof p=="boolean"?0:u.order-p.order).map(([u,p])=>n.jsxs(Wl,{children:[n.jsx(Ql,{ref:w(u),children:typeof p=="object"&&"label"in p&&p.label}),n.jsx(nc,{className:"tw-z-[250]",children:n.jsx(bt,{children:Jo(t.groups,t.items,u,e)})})]},u))})}function ac(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ic({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:i,appMenuAreaChildren:a,configAreaChildren:l,shouldUseAsAppDragArea:d,menubarVariant:w="default"}){const u=c.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:u,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:d?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:[a,t&&n.jsx(sc,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:w})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:d?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const lc=(t,e)=>t[e]??e;function cc({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:i,localizedStrings:a,className:l,id:d}){const w=lc(a,"%settings_uiLanguageSelector_fallbackLanguages%"),[u,p]=c.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),i&&r.find(v=>v===g)&&i([...r.filter(v=>v!==g)]),p(!1)},m=(g,v)=>{var j,k,C,_,z,$;const b=v!==g?((k=(j=t[g])==null?void 0:j.uiNames)==null?void 0:k[v])??((_=(C=t[g])==null?void 0:C.uiNames)==null?void 0:_.en):void 0;return b?`${(z=t[g])==null?void 0:z.autonym} (${b})`:($=t[g])==null?void 0:$.autonym};return n.jsxs("div",{id:d,className:f("pr-twp tw-max-w-sm",l),children:[n.jsxs(ie,{name:"uiLanguage",value:e,onValueChange:h,open:u,onOpenChange:g=>p(g),children:[n.jsx(ce,{children:n.jsx(le,{})}),n.jsx(we,{className:"tw-z-[250]",children:Object.keys(t).map(g=>n.jsx(jt,{value:g,children:m(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(ot,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(w,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>m(g,e)).join(", "):t.en.autonym})})})]})}function wc({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(ot,{children:e(t)}):r?n.jsx(ot,{children:r(t)}):n.jsx(ot,{children:t})}function dc({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Un,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:d=>s(l,d)}),n.jsx(wc,{item:l,createLabel:i,createComplexLabel:a})]},l))})}function uc({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:i,children:a,dropdownContent:l,additionalSelectedContent:d,accentColor:w}){const u=p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:a}),e&&l&&n.jsxs(Qt,{children:[n.jsx(pe,{className:f(w&&"tw-me-1"),asChild:!0,children:n.jsx(G,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(N.MoreHorizontal,{})})}),n.jsx(te,{align:"end",children:l})]})]}),e&&d&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:d})]}),w&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`})]},t)}const Zo=c.forwardRef(({className:t,...e},r)=>n.jsx(N.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Zo.displayName="Spinner";function pc({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:i,placeholder:a,isRequired:l=!1,className:d,defaultValue:w,value:u,onChange:p,onFocus:h,onBlur:m}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(ot,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(_e,{id:t,disabled:e,placeholder:a,required:l,className:f(d,{"tw-border-red-600":r}),defaultValue:w,value:u,onChange:p,onFocus:h,onBlur:m}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const mc=Jt.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}});function fc({className:t,variant:e,ref:r,...o}){return n.jsx("div",{ref:r,role:"alert",className:f("pr-twp",mc({variant:e}),t),...o})}function hc({className:t,ref:e,...r}){return n.jsxs("h5",{ref:e,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...r,children:[r.children," "]})}function gc({className:t,ref:e,...r}){return n.jsx("div",{ref:e,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...r})}const xc=lt.Root,bc=lt.Trigger,vc=lt.Group,yc=lt.Portal,jc=lt.Sub,kc=lt.RadioGroup;function _c({className:t,inset:e,children:r,ref:o,...s}){return n.jsxs(lt.SubTrigger,{ref:o,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...s,children:[r,n.jsx(N.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})}function Nc({className:t,ref:e,...r}){return n.jsx(lt.SubContent,{ref:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}function Cc({className:t,ref:e,...r}){return n.jsx(lt.Portal,{children:n.jsx(lt.Content,{ref:e,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})})}function Ec({className:t,inset:e,ref:r,...o}){return n.jsx(lt.Item,{ref:r,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...o})}function Sc({className:t,children:e,checked:r,ref:o,...s}){return n.jsxs(lt.CheckboxItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...s,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(lt.ItemIndicator,{children:n.jsx(N.Check,{className:"tw-h-4 tw-w-4"})})}),e]})}function Tc({className:t,children:e,ref:r,...o}){return n.jsxs(lt.RadioItem,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(lt.ItemIndicator,{children:n.jsx(N.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})}function Rc({className:t,inset:e,ref:r,...o}){return n.jsx(lt.Label,{ref:r,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...o})}function Mc({className:t,ref:e,...r}){return n.jsx(lt.Separator,{ref:e,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...r})}function Qo({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Qo.displayName="ContextMenuShortcut";const ts=c.createContext({direction:"bottom"});function es({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=c.useMemo(()=>({direction:e}),[e]);return n.jsx(ts.Provider,{value:o,children:n.jsx(Zt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}es.displayName="Drawer";const Dc=Zt.Drawer.Trigger,ns=Zt.Drawer.Portal,Ic=Zt.Drawer.Close;function rs({className:t,ref:e,...r}){return n.jsx(Zt.Drawer.Overlay,{ref:e,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...r})}function Oc({className:t,children:e,hideDrawerHandle:r=!1,ref:o,...s}){const{direction:i="bottom"}=c.useContext(ts),a={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(ns,{children:[n.jsx(rs,{}),n.jsxs(Zt.Drawer.Content,{ref:o,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",a[i],t),...s,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})}function os({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}os.displayName="DrawerHeader";function ss({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}ss.displayName="DrawerFooter";function Ac({className:t,ref:e,...r}){return n.jsx(Zt.Drawer.Title,{ref:e,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...r})}function Pc({className:t,ref:e,...r}){return n.jsx(Zt.Drawer.Description,{ref:e,className:f("tw-text-sm tw-text-muted-foreground",t),...r})}function Lc({className:t,value:e,ref:r,...o}){return n.jsx(nr.Root,{ref:r,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...o,children:n.jsx(nr.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})})}function $c({className:t,...e}){return n.jsx(Rn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Fc=Rn.Panel;function Vc({withHandle:t,className:e,...r}){return n.jsx(Rn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(N.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function zc({...t}){return n.jsx(Nr.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}function Gc({className:t,ref:e,...r}){const o=at();return n.jsxs(Fe.Root,{ref:e,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...r,dir:o,children:[n.jsx(Fe.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Fe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Fe.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})}function Bc({className:t,ref:e,...r}){const o=at();return n.jsx(rr.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...r,ref:e,children:n.jsx(rr.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})}const Kc=Rt.Root;function qc({className:t,ref:e,...r}){const o=at();return n.jsx(Rt.List,{ref:e,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...r,dir:o})}function Uc({className:t,ref:e,...r}){return n.jsx(Rt.Trigger,{ref:e,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...r})}function Hc({className:t,ref:e,...r}){return n.jsx(Rt.Content,{ref:e,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...r})}function Yc({className:t,ref:e,...r}){return n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:e,...r})}const Xc=(t,e)=>{c.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Wc(t){return{preserveValue:!0,...t}}const as=(t,e,r={})=>{const o=c.useRef(e);o.current=e;const s=c.useRef(r);s.current=Wc(s.current);const[i,a]=c.useState(()=>o.current),[l,d]=c.useState(!0);return c.useEffect(()=>{let w=!0;return d(!!t),(async()=>{if(t){const u=await t();w&&(a(()=>u),d(!1))}})(),()=>{w=!1,s.current.preserveValue||a(()=>o.current)}},[t]),[i,l]},bn=()=>!1,Jc=(t,e)=>{const[r]=as(c.useCallback(async()=>{if(!t)return bn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),bn,{preserveValue:!1});c.useEffect(()=>()=>{r!==bn&&r()},[r])};function Zc(t){c.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>Nr.toast});exports.Alert=fc;exports.AlertDescription=gc;exports.AlertTitle=hc;exports.Avatar=uo;exports.AvatarFallback=po;exports.AvatarImage=xi;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Hs;exports.BOOK_SELECTOR_STRING_KEYS=Ws;exports.Badge=be;exports.BookChapterControl=Us;exports.BookSelector=Js;exports.Button=G;exports.COMMENT_EDITOR_STRING_KEYS=wi;exports.COMMENT_LIST_STRING_KEYS=di;exports.Card=co;exports.CardContent=wo;exports.CardDescription=hi;exports.CardFooter=gi;exports.CardHeader=mi;exports.CardTitle=fi;exports.ChapterRangeSelector=Or;exports.Checkbox=Un;exports.Checklist=dc;exports.ComboBox=Ue;exports.Command=Kt;exports.CommandEmpty=Oe;exports.CommandGroup=Bt;exports.CommandInput=je;exports.CommandItem=At;exports.CommandList=qt;exports.CommentEditor=ci;exports.CommentList=vi;exports.ContextMenu=xc;exports.ContextMenuCheckboxItem=Sc;exports.ContextMenuContent=Cc;exports.ContextMenuGroup=vc;exports.ContextMenuItem=Ec;exports.ContextMenuLabel=Rc;exports.ContextMenuPortal=yc;exports.ContextMenuRadioGroup=kc;exports.ContextMenuRadioItem=Tc;exports.ContextMenuSeparator=Mc;exports.ContextMenuShortcut=Qo;exports.ContextMenuSub=jc;exports.ContextMenuSubContent=Nc;exports.ContextMenuSubTrigger=_c;exports.ContextMenuTrigger=bc;exports.DataTable=No;exports.Drawer=es;exports.DrawerClose=Ic;exports.DrawerContent=Oc;exports.DrawerDescription=Pc;exports.DrawerFooter=ss;exports.DrawerHeader=os;exports.DrawerOverlay=rs;exports.DrawerPortal=ns;exports.DrawerTitle=Ac;exports.DrawerTrigger=Dc;exports.DropdownMenu=Qt;exports.DropdownMenuCheckboxItem=Gt;exports.DropdownMenuContent=te;exports.DropdownMenuGroup=Kn;exports.DropdownMenuItem=Xe;exports.DropdownMenuItemType=So;exports.DropdownMenuLabel=Ae;exports.DropdownMenuPortal=mo;exports.DropdownMenuRadioGroup=ho;exports.DropdownMenuRadioItem=bo;exports.DropdownMenuSeparator=ke;exports.DropdownMenuShortcut=vo;exports.DropdownMenuSub=fo;exports.DropdownMenuSubContent=xo;exports.DropdownMenuSubTrigger=go;exports.DropdownMenuTrigger=pe;exports.ERROR_DUMP_STRING_KEYS=Co;exports.ERROR_POPOVER_STRING_KEYS=Di;exports.EditorKeyboardShortcuts=Ro;exports.ErrorDump=Eo;exports.ErrorPopover=Ii;exports.FOOTNOTE_EDITOR_STRING_KEYS=Wi;exports.Filter=$i;exports.FilterDropdown=Oi;exports.Footer=Li;exports.FootnoteEditor=Xi;exports.FootnoteItem=Oo;exports.FootnoteList=Qi;exports.INVENTORY_STRING_KEYS=wl;exports.Input=_e;exports.Inventory=pl;exports.Label=ot;exports.MARKER_MENU_STRING_KEYS=Mo;exports.MarkdownRenderer=Mi;exports.MarkerMenu=Do;exports.MoreInfo=Ai;exports.MultiSelectComboBox=To;exports.NavigationContentSearch=Xl;exports.Popover=Pt;exports.PopoverAnchor=Dr;exports.PopoverContent=Lt;exports.PopoverTrigger=Ut;exports.Progress=Lc;exports.RadioGroup=On;exports.RadioGroupItem=qe;exports.RecentSearches=Ir;exports.ResizableHandle=Vc;exports.ResizablePanel=Fc;exports.ResizablePanelGroup=$c;exports.ResultsCard=uc;exports.SCOPE_SELECTOR_STRING_KEYS=zl;exports.ScopeSelector=Gl;exports.ScriptureResultsViewer=$l;exports.ScrollGroupSelector=Bl;exports.SearchBar=sn;exports.Select=ie;exports.SelectContent=we;exports.SelectGroup=yo;exports.SelectItem=jt;exports.SelectLabel=ji;exports.SelectScrollDownButton=_o;exports.SelectScrollUpButton=ko;exports.SelectSeparator=ki;exports.SelectTrigger=ce;exports.SelectValue=le;exports.Separator=ve;exports.SettingsList=Kl;exports.SettingsListHeader=Ul;exports.SettingsListItem=ql;exports.SettingsSidebar=Ko;exports.SettingsSidebarContentSearch=Rl;exports.Sidebar=$o;exports.SidebarContent=Vo;exports.SidebarFooter=vl;exports.SidebarGroup=Cn;exports.SidebarGroupAction=jl;exports.SidebarGroupContent=Sn;exports.SidebarGroupLabel=En;exports.SidebarHeader=bl;exports.SidebarInput=xl;exports.SidebarInset=Fo;exports.SidebarMenu=zo;exports.SidebarMenuAction=_l;exports.SidebarMenuBadge=Nl;exports.SidebarMenuButton=Bo;exports.SidebarMenuItem=Go;exports.SidebarMenuSkeleton=Cl;exports.SidebarMenuSub=El;exports.SidebarMenuSubButton=Tl;exports.SidebarMenuSubItem=Sl;exports.SidebarProvider=Lo;exports.SidebarRail=gl;exports.SidebarSeparator=yl;exports.SidebarTrigger=hl;exports.Skeleton=We;exports.Slider=Gc;exports.Sonner=zc;exports.Spinner=Zo;exports.Switch=Bc;exports.TabDropdownMenu=Ze;exports.TabFloatingMenu=Yl;exports.TabToolbar=Hl;exports.Table=nn;exports.TableBody=on;exports.TableCaption=Ri;exports.TableCell=ae;exports.TableFooter=Ci;exports.TableHead=Ie;exports.TableHeader=rn;exports.TableRow=zt;exports.Tabs=Kc;exports.TabsContent=Hc;exports.TabsList=qc;exports.TabsTrigger=Uc;exports.TextField=pc;exports.Textarea=Yc;exports.ToggleGroup=Vn;exports.ToggleGroupItem=Te;exports.Toolbar=ic;exports.Tooltip=kt;exports.TooltipContent=_t;exports.TooltipProvider=bt;exports.TooltipTrigger=Tt;exports.UiLanguageSelector=cc;exports.VerticalTabs=Yn;exports.VerticalTabsContent=Wn;exports.VerticalTabsList=Xn;exports.VerticalTabsTrigger=Wo;exports.badgeVariants=lo;exports.buttonVariants=In;exports.cn=f;exports.getBookIdFromUSFM=cl;exports.getInventoryHeader=Pe;exports.getLinesFromUSFM=il;exports.getNumberFromUSFM=ll;exports.getStatusForItem=Ao;exports.getToolbarOSReservedSpaceClassName=ac;exports.inventoryCountColumn=sl;exports.inventoryItemColumn=rl;exports.inventoryStatusColumn=al;exports.selectTriggerVariants=jo;exports.useEvent=Xc;exports.useEventAsync=Jc;exports.useListbox=io;exports.usePromise=as;exports.useRecentSearches=Gs;exports.useSidebar=Le;exports.useStylesheet=Zc;function Qc(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Qc(`*, ::before, ::after {
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
