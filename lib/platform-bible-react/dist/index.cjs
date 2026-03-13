"use strict";var Ea=Object.defineProperty;var Sa=(t,e,r)=>e in t?Ea(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var ut=(t,e,r)=>Sa(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),bt=require("cmdk"),k=require("lucide-react"),Ra=require("clsx"),Ta=require("tailwind-merge"),Ma=require("@radix-ui/react-dialog"),ot=require("@sillsdev/scripture"),y=require("platform-bible-utils"),Te=require("@radix-ui/react-slot"),ie=require("class-variance-authority"),Da=require("@radix-ui/react-popover"),Ia=require("@radix-ui/react-label"),Oa=require("@radix-ui/react-radio-group"),x=require("lexical"),no=require("@radix-ui/react-tooltip"),Pn=require("@lexical/rich-text"),Lr=require("react-dom"),Aa=require("@lexical/table"),La=require("@radix-ui/react-toggle-group"),Pa=require("@radix-ui/react-toggle"),ro=require("@lexical/headless"),$a=require("@radix-ui/react-separator"),Fa=require("@radix-ui/react-avatar"),oo=require("@radix-ui/react-dropdown-menu"),ft=require("@tanstack/react-table"),Va=require("@radix-ui/react-select"),za=require("markdown-to-jsx"),Et=require("@eten-tech-foundation/platform-editor"),Ba=require("@radix-ui/react-checkbox"),Ga=require("@radix-ui/react-tabs"),Ka=require("@radix-ui/react-menubar"),qa=require("react-hotkeys-hook"),Ha=require("@radix-ui/react-context-menu"),Ft=require("vaul"),Ua=require("@radix-ui/react-progress"),Ya=require("react-resizable-panels"),so=require("sonner"),Xa=require("@radix-ui/react-slider"),Wa=require("@radix-ui/react-switch");function it(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const Tt=it(Ma),re=it(Da),ao=it(Ia),Ve=it(Oa),Me=it(no),un=it(La),io=it(Pa),lo=it($a),De=it(Fa),Q=it(oo),rt=it(Va),$n=it(Ba),vt=it(Ga),tt=it(Ka),et=it(Ha),Fn=it(Ua),qn=it(Ya),Pe=it(Xa),Vn=it(Wa),Za=Ta.extendTailwindMerge({prefix:"tw-"});function f(...t){return Za(Ra.clsx(t))}const Ja="layoutDirection";function st(){const t=localStorage.getItem(Ja);return t==="rtl"?t:"ltr"}const co=Tt.Root,wo=Tt.Portal,Hn=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Hn.displayName=Tt.Overlay.displayName;const po=l.forwardRef(({className:t,children:e,...r},o)=>{const s=st();return n.jsxs(wo,{children:[n.jsx(Hn,{}),n.jsxs(Tt.Content,{ref:o,className:f("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:s,children:[e,n.jsxs(Tt.Close,{className:f("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":s==="ltr"},{"tw-left-4":s==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});po.displayName=Tt.Content.displayName;function Un({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}Un.displayName="DialogHeader";function Yn({className:t,...e}){return n.jsx("div",{className:f("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}Yn.displayName="DialogFooter";const Xn=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Xn.displayName=Tt.Title.displayName;const Wn=l.forwardRef(({className:t,...e},r)=>n.jsx(Tt.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));Wn.displayName=Tt.Description.displayName;const Vt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command,{ref:r,className:f("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Vt.displayName=bt.Command.displayName;const le=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(bt.Command.Input,{ref:r,className:f("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});le.displayName=bt.Command.Input.displayName;const zt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.List,{ref:r,className:f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));zt.displayName=bt.Command.List.displayName;const ve=l.forwardRef((t,e)=>n.jsx(bt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ve.displayName=bt.Command.Empty.displayName;const Mt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Group,{ref:r,className:f("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Mt.displayName=bt.Command.Group.displayName;const uo=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Separator,{ref:r,className:f("tw--mx-1 tw-h-px tw-bg-border",t),...e}));uo.displayName=bt.Command.Separator.displayName;const Dt=l.forwardRef(({className:t,...e},r)=>n.jsx(bt.Command.Item,{ref:r,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Dt.displayName=bt.Command.Item.displayName;function mo({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}mo.displayName="CommandShortcut";const fo=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"Old Testament";case y.Section.NT:return r??"New Testament";case y.Section.DC:return o??"Deuterocanon";case y.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Qa=(t,e,r,o,s)=>{switch(t){case y.Section.OT:return e??"OT";case y.Section.NT:return r??"NT";case y.Section.DC:return o??"DC";case y.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function ke(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??ot.Canon.bookIdToEnglishName(t)}function Zn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const ho=ot.Canon.allBookIds.filter(t=>!ot.Canon.isObsolete(ot.Canon.bookIdToNumber(t))),fe=Object.fromEntries(ho.map(t=>[t,ot.Canon.bookIdToEnglishName(t)]));function Jn(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=ot.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(y.includes(s.toLowerCase(),o)||y.includes(t.toLowerCase(),o)||(a?y.includes(a.localizedName.toLowerCase(),o)||y.includes(a.localizedId.toLowerCase(),o):!1))}const go=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),u=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},h=v=>{p.current=!0,o?o(v):r==null||r(t)},m=l.useMemo(()=>ke(t,c),[t,c]),g=l.useMemo(()=>Zn(t,c),[t,c]);return n.jsx("div",{className:f("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===y.Section.OT,"tw-border-s-purple-200":s===y.Section.NT,"tw-border-s-indigo-200":s===y.Section.DC,"tw-border-s-amber-200":s===y.Section.Extra}),children:n.jsxs(Dt,{ref:d,value:w||`${t} ${ot.Canon.bookIdToEnglishName(t)}`,onSelect:u,onMouseDown:h,role:"option","aria-selected":e,"aria-label":`${ot.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[i&&n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:m}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:g})]})})}),Qn=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),$=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const i=o?Te.Slot:"button";return n.jsx(i,{className:f(Qn({variant:e,size:r,className:t})),ref:a,...s})});$.displayName="Button";const Ie=250,tr=300,Ce=400,xo=450,bo=500,It=re.Root,Zt=re.Trigger,mn=re.Anchor,_t=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const i=st();return n.jsx(re.Portal,{children:n.jsx(re.Content,{ref:a,align:e,sideOffset:r,className:f("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:Ie,...o},...s,dir:i})})});_t.displayName=re.Content.displayName;function zn(t,e,r){return`${t} ${fe[t]}${e?` ${Zn(t,e)} ${ke(t,e)}`:""}${r?` ${r}`:""}`}function vo({recentSearches:t,onSearchItemSelect:e,renderItem:r=w=>String(w),getItemKey:o=w=>String(w),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c}){const[w,d]=l.useState(!1);if(t.length===0)return;const p=u=>{e(u),d(!1)};return n.jsxs(It,{open:w,onOpenChange:d,children:[n.jsx(Zt,{asChild:!0,children:n.jsx($,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(_t,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Vt,{children:n.jsx(zt,{children:n.jsx(Mt,{heading:a,children:t.map(u=>n.jsxs(Dt,{onSelect:()=>p(u),className:f("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function ti(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];e(i)}}const kn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},ei=[kn.BOOK_ONLY,kn.BOOK_CHAPTER,kn.BOOK_CHAPTER_VERSE];function Pr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function qt(t){return y.getChaptersForBook(ot.Canon.bookIdToNumber(t))}function ni(t,e,r){if(!t.trim()||e.length===0)return;const o=ei.reduce((s,a)=>{if(s)return s;const i=a.exec(t.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let p;const u=e.filter(h=>Jn(h,c,r));if(u.length===1&&([p]=u),!p&&w){if(ot.Canon.isBookIdValid(c)){const h=c.toUpperCase();e.includes(h)&&(p=h)}if(!p&&r){const h=Array.from(r.entries()).find(([,m])=>m.localizedId.toLowerCase()===c.toLowerCase());h&&e.includes(h[0])&&([p]=h)}}if(!p&&w){const m=(g=>Object.keys(fe).find(v=>fe[v].toLowerCase()===g.toLowerCase()))(c);if(m&&e.includes(m)&&(p=m),!p&&r){const g=Array.from(r.entries()).find(([,v])=>v.localizedName.toLowerCase()===c.toLowerCase());g&&e.includes(g[0])&&([p]=g)}}if(p){let h=w?parseInt(w,10):void 0;h&&h>qt(p)&&(h=Math.max(qt(p),1));const m=d?parseInt(d,10):void 0;return{book:p,chapterNum:h,verseNum:m}}}},void 0);if(o)return o}function ri(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(qt(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{const w=qt(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===qt(t.book)||qt(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,i,c,a])}function $r({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(Mt,{children:n.jsx("div",{className:f("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:qt(t)},(i,c)=>c+1).map(i=>n.jsx(Dt,{value:`${t} ${fe[t]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:f("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function oi({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w}){const d=st(),[p,u]=l.useState(!1),[h,m]=l.useState(""),[g,v]=l.useState(""),[b,j]=l.useState("books"),[N,C]=l.useState(void 0),[_,B]=l.useState(!1),F=l.useRef(void 0),R=l.useRef(void 0),P=l.useRef(void 0),E=l.useRef(void 0),T=l.useRef({}),V=l.useCallback(S=>{e(S),c&&c(S)},[e,c]),z=l.useMemo(()=>o?o():ho,[o]),O=l.useMemo(()=>({[y.Section.OT]:z.filter(q=>ot.Canon.isBookOT(q)),[y.Section.NT]:z.filter(q=>ot.Canon.isBookNT(q)),[y.Section.DC]:z.filter(q=>ot.Canon.isBookDC(q)),[y.Section.Extra]:z.filter(q=>ot.Canon.extraBooks().includes(q))}),[z]),A=l.useMemo(()=>Object.values(O).flat(),[O]),K=l.useMemo(()=>{if(!g.trim())return O;const S={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return[y.Section.OT,y.Section.NT,y.Section.DC,y.Section.Extra].forEach(Z=>{S[Z]=O[Z].filter(J=>Jn(J,g,s))}),S},[O,g,s]),D=l.useMemo(()=>ni(g,A,s),[g,A,s]),H=l.useCallback(()=>{D&&(V({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1}),u(!1),v(""),m(""))},[V,D]),yt=l.useCallback(S=>{if(qt(S)<=1){V({book:S,chapterNum:1,verseNum:1}),u(!1),v("");return}C(S),j("chapters")},[V]),Ot=l.useCallback(S=>{const q=b==="chapters"?N:D==null?void 0:D.book;q&&(V({book:q,chapterNum:S,verseNum:1}),u(!1),j("books"),C(void 0),v(""))},[V,b,N,D]),At=l.useCallback(S=>{V(S),u(!1),v("")},[V]),lt=ri(t,A,d,e),L=l.useCallback(()=>{j("books"),C(void 0),setTimeout(()=>{R.current&&R.current.focus()},0)},[]),M=l.useCallback(S=>{if(!S&&b==="chapters"){L();return}u(S),S&&(j("books"),C(void 0),v(""))},[b,L]),{otLong:G,ntLong:Y,dcLong:X,extraLong:nt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},ht=l.useCallback(S=>fo(S,G,Y,X,nt),[G,Y,X,nt]),ct=l.useCallback(S=>D?!!D.chapterNum&&!S.toString().includes(D.chapterNum.toString()):!1,[D]),gt=l.useMemo(()=>y.formatScrRef(t,s?ke(t.book,s):"English"),[t,s]),Lt=l.useCallback(S=>q=>{T.current[S]=q},[]),wt=l.useCallback(S=>{(S.key==="Home"||S.key==="End")&&S.stopPropagation()},[]),pt=l.useCallback(S=>{if(S.ctrlKey)return;const{isLetter:q,isDigit:Z}=Pr(S.key);if(b==="chapters"){if(S.key==="Backspace"){S.preventDefault(),S.stopPropagation(),L();return}if(q||Z){if(S.preventDefault(),S.stopPropagation(),j("books"),C(void 0),Z&&N){const J=fe[N];v(`${J} ${S.key}`)}else v(S.key);setTimeout(()=>{R.current&&R.current.focus()},0);return}}if((b==="chapters"||b==="books"&&D)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(S.key)){const J=b==="chapters"?N:D==null?void 0:D.book;if(!J)return;const dt=(()=>{if(!h)return 1;const we=h.match(/(\d+)$/);return we?parseInt(we[1],10):0})(),Wt=qt(J);if(!Wt)return;let xt=dt;const We=6;switch(S.key){case"ArrowLeft":dt!==0&&(xt=dt>1?dt-1:Wt);break;case"ArrowRight":dt!==0&&(xt=dt<Wt?dt+1:1);break;case"ArrowUp":xt=dt===0?Wt:Math.max(1,dt-We);break;case"ArrowDown":xt=dt===0?1:Math.min(Wt,dt+We);break;default:return}xt!==dt&&(S.preventDefault(),S.stopPropagation(),m(zn(J,s,xt)),setTimeout(()=>{const we=T.current[xt];we&&we.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[b,D,L,N,h,s]),Xt=l.useCallback(S=>{if(S.shiftKey||S.key==="Tab"||S.key===" ")return;const{isLetter:q,isDigit:Z}=Pr(S.key);(q||Z)&&(S.preventDefault(),v(J=>J+S.key),R.current.focus(),B(!1))},[]);return l.useLayoutEffect(()=>{const S=setTimeout(()=>{if(p&&b==="books"&&P.current&&E.current){const q=P.current,Z=E.current,J=Z.offsetTop,dt=q.clientHeight,Wt=Z.clientHeight,xt=J-dt/2+Wt/2;q.scrollTo({top:Math.max(0,xt),behavior:"smooth"}),m(zn(t.book))}},0);return()=>{clearTimeout(S)}},[p,b,g,D,t.book]),l.useLayoutEffect(()=>{if(b==="chapters"&&N){const S=N===t.book;setTimeout(()=>{if(P.current)if(S){const q=T.current[t.chapterNum];q&&q.scrollIntoView({block:"center",behavior:"smooth"})}else P.current.scrollTo({top:0});F.current&&F.current.focus()},0)}},[b,N,D,t.book,t.chapterNum]),n.jsxs(It,{open:p,onOpenChange:M,children:[n.jsx(Zt,{asChild:!0,children:n.jsx($,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:f("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:gt})})}),n.jsx(_t,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Vt,{ref:F,onKeyDown:pt,loop:!0,value:h,onValueChange:m,shouldFilter:!1,children:[b==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(le,{ref:R,value:g,onValueChange:v,onKeyDown:wt,onFocus:()=>B(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(vo,{recentSearches:i,onSearchItemSelect:At,renderItem:S=>y.formatScrRef(S,"English"),getItemKey:S=>`${S.book}-${S.chapterNum}-${S.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:lt.map(({onClick:S,disabled:q,title:Z,icon:J})=>n.jsx($,{variant:"ghost",size:"sm",onClick:()=>{B(!0),S()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:Z,onKeyDown:Xt,children:n.jsx(J,{})},Z))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx($,{variant:"ghost",size:"sm",onClick:L,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),N&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:ke(N,s)})]}),!_&&n.jsxs(zt,{ref:P,children:[b==="books"&&n.jsxs(n.Fragment,{children:[!D&&Object.entries(K).map(([S,q])=>{if(q.length!==0)return n.jsx(Mt,{heading:ht(S),children:q.map(Z=>n.jsx(go,{bookId:Z,onSelect:J=>yt(J),section:y.getSectionForBook(Z),commandValue:`${Z} ${fe[Z]}`,ref:Z===t.book?E:void 0,localizedBookNames:s},Z))},S)}),D&&n.jsx(Mt,{children:n.jsx(Dt,{value:`${D.book} ${fe[D.book]} ${D.chapterNum||""}:${D.verseNum||""})}`,onSelect:H,className:"tw-font-semibold tw-text-primary",children:y.formatScrRef({book:D.book,chapterNum:D.chapterNum??1,verseNum:D.verseNum??1},s?Zn(D.book,s):void 0)},"top-match")}),D&&qt(D.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:ke(D.book,s)}),n.jsx($r,{bookId:D.book,scrRef:t,onChapterSelect:Ot,setChapterRef:Lt,isChapterDimmed:ct,className:"tw-px-4 tw-pb-4"})]})]}),b==="chapters"&&N&&n.jsx($r,{bookId:N,scrRef:t,onChapterSelect:Ot,setChapterRef:Lt,className:"tw-p-4"})]})]})})]})}const si=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),ai=ie.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),at=l.forwardRef(({className:t,...e},r)=>n.jsx(ao.Root,{ref:r,className:f("pr-twp",ai(),t),...e}));at.displayName=ao.Root.displayName;const fn=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(Ve.Root,{className:f("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});fn.displayName=Ve.Root.displayName;const ze=l.forwardRef(({className:t,...e},r)=>n.jsx(Ve.Item,{ref:r,className:f("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ve.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));ze.displayName=Ve.Item.displayName;function ii(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function rn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,value:a,onChange:i=()=>{},getOptionLabel:c=ii,getButtonLabel:w,icon:d=void 0,buttonPlaceholder:p="",textPlaceholder:u="",commandEmptyMessage:h="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:v=!1,ariaLabel:b,...j}){const[N,C]=l.useState(!1),_=w??c,B=R=>R.length>0&&typeof R[0]=="object"&&"options"in R[0],F=(R,P)=>{const E=c(R),T=typeof R=="object"&&"secondaryLabel"in R?R.secondaryLabel:void 0,V=`${P??""}${E}${T??""}`;return n.jsxs(Dt,{value:E,onSelect:()=>{i(R),C(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!a||c(a)!==E})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[E,T&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",T]})]})]},V)};return n.jsxs(It,{open:N,onOpenChange:C,...j,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs($,{variant:m,role:"combobox","aria-expanded":N,"aria-label":b,id:t,className:f("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[d&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:d}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:a?_(a):p})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(_t,{align:g,className:f("tw-w-[200px] tw-p-0",s),children:n.jsxs(Vt,{children:[n.jsx(le,{placeholder:u,className:"tw-text-inherit"}),n.jsx(ve,{children:h}),n.jsx(zt,{children:B(e)?e.map(R=>n.jsx(Mt,{heading:R.groupHeading,children:R.options.map(P=>F(P,R.groupHeading))},R.groupHeading)):e.map(R=>F(R))})]})})]})}function yo({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,p)=>p+1),[a]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(at,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(rn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(at,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(rn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var jo=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(jo||{});const li=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),_n=(t,e)=>t[e]??e;function ci({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=_n(d,"%webView_bookSelector_currentBook%"),u=_n(d,"%webView_bookSelector_choose%"),h=_n(d,"%webView_bookSelector_chooseBooks%"),[m,g]=l.useState("current book"),v=b=>{g(b),t(b)};return n.jsx(fn,{className:"pr-twp tw-flex",value:m,onValueChange:b=>v(b),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"current book"}),n.jsx(at,{className:"tw-ms-1",children:p})]}),n.jsx(at,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(yo,{isDisabled:m==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{value:"choose books"}),n.jsx(at,{className:"tw-ms-1",children:h})]}),n.jsx(at,{className:"tw-flex tw-items-center",children:o.map(b=>ot.Canon.bookIdToEnglishName(b)).join(", ")}),n.jsx($,{disabled:m==="current book",onClick:()=>r(),children:u})]})]})})}const No=l.createContext(null);function di(t,e){return{getTheme:function(){return e??null}}}function Ut(){const t=l.useContext(No);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const ko=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,wi=ko?l.useLayoutEffect:l.useEffect,Ze={tag:x.HISTORY_MERGE_TAG};function pi({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=t,d=di(null,o),p=x.createEditor({editable:t.editable,html:w,namespace:s,nodes:a,onError:u=>i(u,p),theme:o});return function(u,h){if(h!==null){if(h===void 0)u.update(()=>{const m=x.$getRoot();if(m.isEmpty()){const g=x.$createParagraphNode();m.append(g);const v=ko?document.activeElement:null;(x.$getSelection()!==null||v!==null&&v===u.getRootElement())&&g.select()}},Ze);else if(h!==null)switch(typeof h){case"string":{const m=u.parseEditorState(h);u.setEditorState(m,Ze);break}case"object":u.setEditorState(h,Ze);break;case"function":u.update(()=>{x.$getRoot().isEmpty()&&h(u)},Ze)}}}(p,c),[p,d]},[]);return wi(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(No.Provider,{value:r,children:e})}const ui=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function mi({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=Ut();return ui(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{e&&a.size===0&&i.size===0||t&&w.has(x.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const er={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},Nt=Me.Provider,St=Me.Root,Rt=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(Me.Trigger,{ref:o,className:e?f(Qn({variant:e}),t):t,...r}));Rt.displayName=Me.Trigger.displayName;const kt=l.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(Me.Content,{ref:o,sideOffset:e,className:f("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r}));kt.displayName=Me.Content.displayName;const nr=[Pn.HeadingNode,x.ParagraphNode,x.TextNode,Pn.QuoteNode],fi=l.createContext(null),Cn={didCatch:!1,error:null};class hi extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Cn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(Cn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&gi(e.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(Cn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=e;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(fi.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function gi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function xi({children:t,onError:e}){return n.jsx(hi,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const bi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function vi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function yi(){return function(t){const[e]=Ut(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return bi(()=>{const{initialValueFn:i,subscribe:c}=r,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,t]),o}(vi)}function ji(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!x.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,i=t.isBackward(),c=s.getNode(),w=a.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[u,h]=x.$getCharacterOffsets(t),m=c.is(w),g=e.is(i?w:c),v=e.is(i?c:w);let b,j=0;m?(j=u>h?h:u,b=u>h?u:h):g?(j=i?h:u,b=void 0):v&&(j=0,b=i?u:h);const N=e.__text.slice(j,b);N!==e.__text&&(r==="clone"&&(e=x.$cloneWithPropertiesEphemeral(e)),e.__text=N)}}return e}function Ni(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const _o=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,ki=_o&&"documentMode"in document?document.documentMode:null;!(!_o||!("InputEvent"in window)||ki)&&"getTargetRanges"in new window.InputEvent("input");function _i(t){const e=x.$findMatchingParent(t,r=>x.$isElementNode(r)&&!r.isInline());return x.$isElementNode(e)||Ni(4,t.__key),e}function Ci(t){const e=x.$getSelection();if(!x.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],i=a.getKey();if(r.has(i))continue;const c=x.$findMatchingParent(a,d=>x.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const Ei=Symbol.for("preact-signals");function hn(){if(ee>1)return void ee--;let t,e=!1;for(;$e!==void 0;){let r=$e;for($e=void 0,Bn++;r!==void 0;){const o=r.o;if(r.o=void 0,r.f&=-3,!(8&r.f)&&Co(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(Bn=0,ee--,e)throw t}function Si(t){if(ee>0)return t();ee++;try{return t()}finally{hn()}}let U,$e;function Fr(t){const e=U;U=void 0;try{return t()}finally{U=e}}let ee=0,Bn=0,tn=0;function Vr(t){if(U===void 0)return;let e=t.n;return e===void 0||e.t!==U?(e={i:0,S:t,p:U.s,n:void 0,t:U,e:void 0,x:void 0,r:e},U.s!==void 0&&(U.s.n=e),U.s=e,t.n=e,32&U.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=U.s,e.n=void 0,U.s.n=e,U.s=e),e):void 0}function mt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Be(t,e){return new mt(t,e)}function Co(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function zr(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Eo(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ue(t,e){mt.call(this,void 0),this.x=t,this.s=void 0,this.g=tn-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Ri(t,e){return new ue(t,e)}function So(t){const e=t.u;if(t.u=void 0,typeof e=="function"){ee++;const r=U;U=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,rr(t),o}finally{U=r,hn()}}}function rr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,So(t)}function Ti(t){if(U!==this)throw new Error("Out-of-order effect");Eo(this),U=t,this.f&=-2,8&this.f&&rr(this),hn()}function Ne(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function oe(t,e){const r=new Ne(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function gn(t,e={}){const r={};for(const o in t){const s=e[o],a=Be(s===void 0?t[o]:s);r[o]=a}return r}mt.prototype.brand=Ei,mt.prototype.h=function(){return!0},mt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Fr(()=>{var r;(r=this.W)==null||r.call(this)}))},mt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Fr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},mt.prototype.subscribe=function(t){return oe(()=>{const e=this.value,r=U;U=void 0;try{t(e)}finally{U=r}},{name:"sub"})},mt.prototype.valueOf=function(){return this.value},mt.prototype.toString=function(){return this.value+""},mt.prototype.toJSON=function(){return this.value},mt.prototype.peek=function(){const t=U;U=void 0;try{return this.value}finally{U=t}},Object.defineProperty(mt.prototype,"value",{get(){const t=Vr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(Bn>100)throw new Error("Cycle detected");this.v=t,this.i++,tn++,ee++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{hn()}}}}),ue.prototype=new mt,ue.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===tn))return!0;if(this.g=tn,this.f|=1,this.i>0&&!Co(this))return this.f&=-2,!0;const t=U;try{zr(this),U=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return U=t,Eo(this),this.f&=-2,!0},ue.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}mt.prototype.S.call(this,t)},ue.prototype.U=function(t){if(this.t!==void 0&&(mt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ue.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ue.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Vr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Ne.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},Ne.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,So(this),zr(this),ee++;const t=U;return U=this,Ti.bind(this,t)},Ne.prototype.N=function(){2&this.f||(this.f|=2,this.o=$e,$e=this)},Ne.prototype.d=function(){this.f|=8,1&this.f||rr(this)},Ne.prototype.dispose=function(){this.d()};x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return oe(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Ro(){const t=x.$getRoot(),e=x.$getSelection(),r=x.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),x.$isRangeSelection(e)&&(e.format=0)}function To(t,e=Ro){return t.registerCommand(x.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),x.COMMAND_PRIORITY_EDITOR)}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({$onClear:Ro}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return oe(()=>To(t,o.value))}});function Mi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const En=x.createState("format",{parse:t=>typeof t=="number"?t:0});class Mo extends x.DecoratorNode{$config(){return this.config("decorator-text",{extends:x.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:En}]})}getFormat(){return x.$getState(this,En)}getFormatFlags(e,r){return x.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=x.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return x.$setState(this,En,e)}toggleFormat(e){const r=this.getFormat(),o=x.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function Di(t){return t instanceof Mo}x.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Mo],register:(t,e,r)=>t.registerCommand(x.FORMAT_TEXT_COMMAND,o=>{const s=x.$getSelection();if(x.$isNodeSelection(s)||x.$isRangeSelection(s))for(const a of s.getNodes())Di(a)&&a.toggleFormat(o);return!1},x.COMMAND_PRIORITY_LOW)});function Do(t,e){let r;return Be(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Gn=x.defineExtension({build:t=>Do(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function W(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function Io(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=Io(r[s],o[s]);return t}return e}const or=0,Kn=1,Oo=2,Sn=3,Je=4,je=5,Rn=6,Ae=7;function Tn(t){return t.id===or}function Ao(t){return t.id===Oo}function Ii(t){return function(e){return e.id===Kn}(t)||W(305,String(t.id),String(Kn)),Object.assign(t,{id:Oo})}const Oi=new Set;class Ai{constructor(e,r){ut(this,"builder");ut(this,"configs");ut(this,"_dependency");ut(this,"_peerNameSet");ut(this,"extension");ut(this,"state");ut(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:or}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):x.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Ao(r)||W(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:Sn,registerState:d})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(e,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:Je,initResult:w,registerState:d})}(a,i,s)}build(e){const r=this.state;let o;r.id!==Je&&W(307,String(r.id),String(je)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:je,output:i,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==je&&W(308,String(o.id),String(je));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:Rn})}(o),()=>{const a=this.state;a.id!==Ae&&W(309,String(o.id),String(Ae)),this.state=function(i){return Object.assign(i,{id:je})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==Rn&&W(310,String(r.id),String(Rn)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ae})}(r),o}getSignal(){return this._signal===void 0&&W(311),this._signal}getInitResult(){this.extension.init===void 0&&W(312,this.extension.name);const e=this.state;return function(r){return r.id>=Je}(e)||W(313,String(e.id),String(Je)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=Sn}(e)||W(314,String(e.id),String(Sn)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&W(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ae}(e)||W(316,String(e.id),String(Ae)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Oi}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=je})(e)||W(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Br={tag:x.HISTORY_MERGE_TAG};function Li(){const t=x.$getRoot();t.isEmpty()&&t.append(x.$createParagraphNode())}const Pi=x.defineExtension({config:x.safeCast({setOptions:Br,updateOptions:Br}),init:({$initialEditorState:t=Li})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(x.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const i=t.parseEditorState(a);t.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[x.RootNode,x.TextNode,x.LineBreakNode,x.TabNode,x.ParagraphNode]}),Gr=Symbol.for("@lexical/extension/LexicalBuilder");function Kr(){}function $i(t){throw t}function Qe(t){return Array.isArray(t)?t:[t]}const Mn="0.41.0+prod.esm";class Fe{constructor(e){ut(this,"roots");ut(this,"extensionNameMap");ut(this,"outgoingConfigEdges");ut(this,"incomingEdges");ut(this,"conflicts");ut(this,"_sortedExtensionReps");ut(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Mn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[Qe(Pi)];for(const o of e)r.push(Qe(o));return new Fe(r)}static maybeFromEditor(e){const r=e[Gr];return r&&(r.PACKAGE_VERSION!==Mn&&W(292,r.PACKAGE_VERSION,Mn),r instanceof Fe||W(293)),r}static fromEditor(e){const r=Fe.maybeFromEditor(e);return r===void 0&&W(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(x.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Gr]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Kr;function r(){try{e()}finally{e=Kr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=x.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&W(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&W(296);const r=Qe(e),[o]=r;typeof o.name!="string"&&W(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&W(298,o.name),!s){s=new Ai(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&W(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&W(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=Qe(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(Ao(a))return;const i=o.extension.name;var c;Tn(a)||W(300,i,s||"[unknown]"),Tn(c=a)||W(304,String(c.id),String(or)),a=Object.assign(c,{id:Kn}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,i)}a=Ii(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())Tn(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&W(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(e,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(e);c&&s.push(c)}return x.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:u}=p;if(u.onError!==void 0&&(e.onError=u.onError),u.disableEvents!==void 0&&(e.disableEvents=u.disableEvents),u.parentEditor!==void 0&&(e.parentEditor=u.parentEditor),u.editable!==void 0&&(e.editable=u.editable),u.namespace!==void 0&&(e.namespace=u.namespace),u.$initialEditorState!==void 0&&(e.$initialEditorState=u.$initialEditorState),u.nodes)for(const h of Mi(u)){if(typeof h!="function"){const m=o.get(h.replace);m&&W(302,u.name,h.replace.name,m.extension.name),o.set(h.replace,p)}r.add(h)}if(u.html){if(u.html.export)for(const[h,m]of u.html.export.entries())s.set(h,m);u.html.import&&Object.assign(a,u.html.import)}u.theme&&Io(i,u.theme)}Object.keys(i).length>0&&(e.theme=i),r.size&&(e.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=a),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=$i),e}}const Fi=new Set,qr=x.defineExtension({build(t,e,r){const o=r.getDependency(Gn).output,s=Be({watchedNodeKeys:new Map}),a=Do(()=>{},()=>oe(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(x.$getSelection())for(const[p,u]of c.entries()){if(u.size===0){c.delete(p);continue}const h=x.$getNodeByKey(p),m=h&&h.isSelected()||!1;d=d||m!==(!!i&&i.has(p)),m&&(w=w||new Set,w.add(p))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=Ri(()=>(a.value||Fi).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Gn],name:"@lexical/extension/NodeSelection"});x.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Ee extends x.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Ee(e.__key)}static importJSON(e){return Lo().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Vi,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return x.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function Vi(){return{node:Lo()}}function Lo(){return x.$create(Ee)}function zi(t){return t instanceof Ee}x.defineExtension({dependencies:[Gn,qr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Ee],register(t,e,r){const{watchNodeKey:o}=r.getDependency(qr).output,s=Be({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return x.mergeRegister(t.registerCommand(x.CLICK_COMMAND,i=>{if(x.isDOMNode(i.target)){const c=x.$getNodeFromDOMNode(i.target);if(zi(c))return function(w,d=!1){const p=x.$getSelection(),u=w.isSelected(),h=w.getKey();let m;d&&x.$isNodeSelection(p)?m=p:(m=x.$createNodeSelection(),x.$setSelection(m)),u?m.delete(h):m.add(h)}(c,i.shiftKey),!0}return!1},x.COMMAND_PRIORITY_LOW),t.registerMutationListener(Ee,(i,c)=>{Si(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,u]of i.entries())if(u==="destroyed")d.delete(p),w=!0;else{const h=d.get(p),m=t.getElementByKey(p);h?h.domNode.value=m:(w=!0,d.set(p,{domNode:Be(m),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),oe(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(oe(()=>{const d=c.value;d&&(w.value?x.addClassNamesToElement(d,a):x.removeClassNamesFromElement(d,a))}));return x.mergeRegister(...i)}))}});function Po(t){return t.canBeEmpty()}function Bi(t,e,r=Po){return x.mergeRegister(t.registerCommand(x.KEY_TAB_COMMAND,o=>{const s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;o.preventDefault();const a=function(i){if(i.getNodes().filter(h=>x.$isBlockElementNode(h)&&h.canIndent()).length>0)return!0;const c=i.anchor,w=i.focus,d=w.isBefore(c)?w:c,p=d.getNode(),u=_i(p);if(u.canIndent()){const h=u.getKey();let m=x.$createRangeSelection();if(m.anchor.set(h,0,"element"),m.focus.set(h,0,"element"),m=x.$normalizeSelection__EXPERIMENTAL(m),m.anchor.is(d))return!0}return!1}(s)?o.shiftKey?x.OUTDENT_CONTENT_COMMAND:x.INDENT_CONTENT_COMMAND:x.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},x.COMMAND_PRIORITY_EDITOR),t.registerCommand(x.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=x.$getSelection();if(!x.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return Ci(i=>{if(a(i)){const c=i.getIndent()+1;(!o||c<o)&&i.setIndent(c)}})},x.COMMAND_PRIORITY_CRITICAL))}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({$canIndent:Po,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return oe(()=>{if(!o.value)return Bi(t,s,a)})}});const Gi=x.defineExtension({name:"@lexical/react/ReactProvider"});function Ki(){return x.$getRoot().getTextContent()}function qi(t,e=!0){if(t)return!1;let r=Ki();return e&&(r=r.trim()),r===""}function Hi(t){if(!qi(t,!1))return!1;const e=x.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(x.$isDecoratorNode(s))return!1;if(x.$isElementNode(s)){if(!x.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!x.$isTextNode(w))return!1}}}return!0}function $o(t){return()=>Hi(t)}function Fo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,u,h,m]=w;t.update(()=>{const g=x.$getSelection();if(x.$isRangeSelection(g)){const v=g.anchor;let b=v.getNode(),j=0,N=0;if(x.$isTextNode(b)&&d>=0&&p>=0&&(j=d,N=d+p,g.setTextNodeRange(b,j,b,N)),j===N&&u===""||(g.insertRawText(u),b=v.getNode()),x.$isTextNode(b)){j=h,N=h+m;const C=b.getTextContentSize();j=j>C?C:j,N=N>C?C:N,g.setTextNodeRange(b,j,b,N)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}x.defineExtension({build:(t,e,r)=>gn(e),config:x.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>oe(()=>r.getOutput().disabled.value?void 0:Fo(t))});function Ui(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const sr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Yi({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return sr(()=>r.registerDecoratorListener(i=>{Lr.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:h=>r._onError(h),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),u=r.getElementByKey(d);u!==null&&i.push(Lr.createPortal(p,u,d))}return i},[o,s,r])}(t,e)}function Xi({editor:t,ErrorBoundary:e}){return function(r){const o=Fe.maybeFromEditor(r);if(o&&o.hasExtensionByName(Gi.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&Ui(320,s);return!0}return!1}(t)?null:n.jsx(Yi,{editor:t,ErrorBoundary:e})}function Hr(t){return t.getEditorState().read($o(t.isComposing()))}function Wi({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=Ut();return function(s){sr(()=>x.mergeRegister(Pn.registerRichText(s),Fo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(Zi,{content:e}),n.jsx(Xi,{editor:o,ErrorBoundary:r})]})}function Zi({content:t}){const[e]=Ut(),r=function(s){const[a,i]=l.useState(()=>Hr(s));return sr(()=>{function c(){const w=Hr(s);i(w)}return c(),x.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=yi();return r?typeof t=="function"?t(o):t:null}function Ji({defaultSelection:t}){const[e]=Ut();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Qi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function tl({onClear:t}){const[e]=Ut();return Qi(()=>To(e,t),[e,t]),null}const Vo=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function el({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:u,ariaRequired:h,autoCapitalize:m,className:g,id:v,role:b="textbox",spellCheck:j=!0,style:N,tabIndex:C,"data-testid":_,...B},F){const[R,P]=l.useState(t.isEditable()),E=l.useCallback(V=>{V&&V.ownerDocument&&V.ownerDocument.defaultView?t.setRootElement(V):t.setRootElement(null)},[t]),T=l.useMemo(()=>function(...V){return z=>{for(const O of V)typeof O=="function"?O(z):O!=null&&(O.current=z)}}(F,E),[E,F]);return Vo(()=>(P(t.isEditable()),t.registerEditableListener(V=>{P(V)})),[t]),n.jsx("div",{"aria-activedescendant":R?e:void 0,"aria-autocomplete":R?r:"none","aria-controls":R?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":R&&b==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":R?u:void 0,"aria-readonly":!R||void 0,"aria-required":h,autoCapitalize:m,className:g,contentEditable:R,"data-testid":_,id:v,ref:T,role:b,spellCheck:j,style:N,tabIndex:C,...B})}const nl=l.forwardRef(el);function Ur(t){return t.getEditorState().read($o(t.isComposing()))}const rl=l.forwardRef(ol);function ol(t,e){const{placeholder:r,...o}=t,[s]=Ut();return n.jsxs(n.Fragment,{children:[n.jsx(nl,{editor:s,...o,ref:e}),r!=null&&n.jsx(sl,{editor:s,content:r})]})}function sl({content:t,editor:e}){const r=function(i){const[c,w]=l.useState(()=>Ur(i));return Vo(()=>{function d(){const p=Ur(i);w(p)}return d(),x.mergeRegister(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(i=>{s(i)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function al({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(rl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const zo=l.createContext(void 0);function il({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(zo.Provider,{value:i,children:a})}function Bo(){const t=l.useContext(zo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function ll(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:a,content:i}=t;return n.jsx(co,{open:!0,onOpenChange:r,children:n.jsxs(po,{children:[n.jsx(Un,{children:n.jsx(Xn,{children:a})}),i]})})},[t,r]),s=l.useCallback((a,i,c=!1)=>{e({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function cl({children:t}){const[e]=Ut(),[r,o]=l.useState(e),[s,a]=l.useState("paragraph"),[i,c]=ll(),w=()=>{};return l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),x.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(il,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,t({blockType:s})]})}function dl(t){const[e]=Ut(),{activeEditor:r}=Bo();l.useEffect(()=>r.registerCommand(x.SELECTION_CHANGE_COMMAND,()=>{const o=x.$getSelection();return o&&t(o),!1},x.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=x.$getSelection();o&&t(o)})},[r,t])}const Go=ie.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),wl=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(io.Root,{ref:s,className:f(Go({variant:e,size:r,className:t})),...o}));wl.displayName=io.Root.displayName;const Ko=l.createContext({size:"default",variant:"default"}),xn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const i=st();return n.jsx(un.Root,{ref:a,className:f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:i,children:n.jsx(Ko.Provider,{value:{variant:e,size:r},children:o})})});xn.displayName=un.Root.displayName;const _e=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const i=l.useContext(Ko);return n.jsx(un.Item,{ref:a,className:f(Go({variant:i.variant||r,size:i.size||o}),t),...s,children:e})});_e.displayName=un.Item.displayName;const Yr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function pl(){const{activeEditor:t}=Bo(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(x.$isRangeSelection(s)||Aa.$isTableSelection(s)){const a=[];Yr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return dl(o),n.jsx(xn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Yr.map(({format:s,icon:a,label:i})=>n.jsx(_e,{value:s,"aria-label":i,onClick:()=>{t.dispatchCommand(x.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function ul({onClear:t}){const[e]=Ut();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(x.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function ml({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(cl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(pl,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(Wi,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(al,{placeholder:t})}),ErrorBoundary:xi}),e&&n.jsx(Ji,{defaultSelection:"rootEnd"}),n.jsx(ul,{onClear:r}),n.jsx(tl,{})]})]})}const fl={namespace:"commentEditor",theme:er,nodes:nr,onError:t=>{console.error(t)}};function on({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i,className:c}){return n.jsx("div",{className:f("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(pi,{initialConfig:{...fl,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(Nt,{children:[n.jsx(ml,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(mi,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function hl(t,e){const r=x.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Ho.has(a.nodeName)){const i=Uo(a,t,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof x.ArtificialNode__DO_NOT_USE&&i.insertAfter(x.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function gl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=x.$getRoot().getChildren();for(let s=0;s<o.length;s++)qo(t,o[s],r,e);return r.innerHTML}function qo(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=x.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;o!==null&&x.$isTextNode(e)&&(i=ji(o,e,"clone"));const c=x.$isElementNode(i)?i.getChildren():[],w=x.getRegisteredNode(t,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,i):i.exportDOM(t);const{element:p,after:u}=d;if(!p)return!1;const h=document.createDocumentFragment();for(let m=0;m<c.length;m++){const g=c[m],v=qo(t,g,h,o);!s&&x.$isElementNode(e)&&v&&e.extractWithChild(g,o,"html")&&(s=!0)}if(s&&!a){if((x.isHTMLElement(p)||x.isDocumentFragment(p))&&p.append(h),r.append(p),u){const m=u.call(i,p);m&&(x.isDocumentFragment(p)?p.replaceChildren(m):p.replaceWith(m))}}else r.append(h);return s}const Ho=new Set(["STYLE","SCRIPT"]);function Uo(t,e,r,o,s=new Map,a){let i=[];if(Ho.has(t.nodeName))return i;let c=null;const w=function(g,v){const{nodeName:b}=g,j=v._htmlConversions.get(b.toLowerCase());let N=null;if(j!==void 0)for(const C of j){const _=C(g);_!==null&&(N===null||(N.priority||0)<=(_.priority||0))&&(N=_)}return N!==null?N.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const g=d.node;if(c=Array.isArray(g)?g[g.length-1]:g,c!==null){for(const[,v]of s)if(c=v(c,a),!c)break;c&&i.push(...Array.isArray(g)?g:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const u=t.childNodes;let h=[];const m=(c==null||!x.$isRootOrShadowRoot(c))&&(c!=null&&x.$isBlockElementNode(c)||o);for(let g=0;g<u.length;g++)h.push(...Uo(u[g],e,r,m,new Map(s),c));return p!=null&&(h=p(h)),x.isBlockDomNode(t)&&(h=xl(t,h,m?()=>{const g=new x.ArtificialNode__DO_NOT_USE;return r.push(g),g}:x.$createParagraphNode)),c==null?h.length>0?i=i.concat(h):x.isBlockDomNode(t)&&function(g){return g.nextSibling==null||g.previousSibling==null?!1:x.isInlineDomNode(g.nextSibling)&&x.isInlineDomNode(g.previousSibling)}(t)&&(i=i.concat(x.$createLineBreakNode())):x.$isElementNode(c)&&c.append(...h),i}function xl(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let i=0;i<e.length;i++){const c=e[i];if(x.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===e.length-1||i<e.length-1&&x.$isBlockElementNode(e[i+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function Yo(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function Xo(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:Xo(e.children)):!1}function Pt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?Xo(t.root.children):!1}function bl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=ro.createHeadlessEditor({namespace:"EditorUtils",theme:er,nodes:nr,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=hl(e,s);x.$getRoot().clear(),x.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function sn(t){const e=ro.createHeadlessEditor({namespace:"EditorUtils",theme:er,nodes:nr,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=gl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function ar(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}function en(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function ir(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const vl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Dn(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function yl({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=l.useState(vl),[i,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),u=l.useRef(null);l.useEffect(()=>{let j=!0;const N=u.current;if(!N)return;const C=setTimeout(()=>{j&&Yo(N)},300);return()=>{j=!1,clearTimeout(C)}},[]);const h=l.useCallback(()=>{if(!Pt(s))return;const j=sn(s);e(j,i)},[s,e,i]),m=o["%commentEditor_placeholder%"]??"Type your comment here...",g=o["%commentEditor_saveButton_tooltip%"]??"Save comment",v=o["%commentEditor_cancelButton_tooltip%"]??"Cancel",b=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:b}),n.jsxs("div",{className:"tw-flex tw-gap-2",children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx($,{onClick:r,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(kt,{children:n.jsx("p",{children:v})})]})}),n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx($,{onClick:h,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",disabled:!Pt(s),children:n.jsx(k.Check,{})})}),n.jsx(kt,{children:n.jsx("p",{children:g})})]})})]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(It,{open:w,onOpenChange:d,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs($,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Dn(i!==void 0?i:"",o)})]})}),n.jsx(_t,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:j=>{j.key==="Escape"&&(j.stopPropagation(),d(!1))},children:n.jsx(Vt,{children:n.jsx(zt,{children:t.map(j=>n.jsx(Dt,{onSelect:()=>{c(j===""?void 0:j),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Dn(j,o)})},j||"unassigned"))})})})]})}),n.jsx("div",{ref:u,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:j=>{j.key==="Escape"?(j.preventDefault(),j.stopPropagation(),r()):ir(j)&&(j.preventDefault(),j.stopPropagation(),Pt(s)&&h())},onKeyDown:j=>{ar(j),(j.key==="Enter"||j.key===" ")&&j.stopPropagation()},children:n.jsx(on,{editorSerializedState:s,onSerializedChange:j=>a(j),placeholder:m,onClear:j=>{p.current=j}})})]})}const jl=Object.freeze(["%commentEditor_placeholder%","%commentEditor_saveButton_tooltip%","%commentEditor_cancelButton_tooltip%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%"]),Nl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],kl=["input","select","textarea","button"],_l=["button","textbox"],Wo=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(m=>{i(m);const g=t.find(b=>b.id===m);g&&(e==null||e(g));const v=document.getElementById(m);v&&(v.scrollIntoView({block:"center"}),v.focus()),s.current&&s.current.setAttribute("aria-activedescendant",m)},[e,t]),p=l.useCallback(m=>{const g=t.find(v=>v.id===m);g&&(w(v=>v===m?void 0:m),r==null||r(g))},[r,t]),u=m=>{if(!m)return!1;const g=m.tagName.toLowerCase();if(m.isContentEditable||kl.includes(g))return!0;const v=m.getAttribute("role");if(v&&_l.includes(v))return!0;const b=m.getAttribute("tabindex");return b!==void 0&&b!=="-1"},h=l.useCallback(m=>{var R;const g=m.target,v=P=>P?document.getElementById(P):void 0,b=v(c),j=v(a);if(!!(b&&g&&b.contains(g)&&g!==b)&&u(g)){if(m.key==="Escape"||m.key==="ArrowLeft"&&!g.isContentEditable){if(c){m.preventDefault(),m.stopPropagation();const P=t.find(E=>E.id===c);P&&d(P.id)}return}if(m.key==="ArrowDown"||m.key==="ArrowUp"){if(!b)return;const P=Array.from(b.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(P.length===0)return;const E=P.findIndex(V=>V===g);if(E===-1)return;let T;m.key==="ArrowDown"?T=Math.min(E+1,P.length-1):T=Math.max(E-1,0),T!==E&&(m.preventDefault(),m.stopPropagation(),(R=P[T])==null||R.focus());return}return}const _=t.findIndex(P=>P.id===a);let B=_;switch(m.key){case"ArrowDown":B=Math.min(_+1,t.length-1),m.preventDefault();break;case"ArrowUp":B=Math.max(_-1,0),m.preventDefault();break;case"Home":B=0,m.preventDefault();break;case"End":B=t.length-1,m.preventDefault();break;case" ":case"Enter":a&&p(a),m.preventDefault(),m.stopPropagation();return;case"ArrowRight":{const P=j;if(P){const E=P.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),T=P.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),V=E??T;if(V){m.preventDefault(),V.focus();return}}break}default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(u(g)||(o==null||o(m.key),m.preventDefault()));return}const F=t[B];F&&d(F.id)},[t,d,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:h,focusOption:d}},Zo=ie.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),he=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:f("pr-twp",Zo({variant:e}),t),...r}));he.displayName="Badge";const lr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));lr.displayName="Card";const Jo=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Jo.displayName="CardHeader";const Qo=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:f("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Qo.displayName="CardTitle";const ts=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:f("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));ts.displayName="CardDescription";const cr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-p-6 tw-pt-0",t),...e}));cr.displayName="CardContent";const es=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));es.displayName="CardFooter";const ge=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(lo.Root,{ref:s,decorative:r,orientation:e,className:f("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));ge.displayName=lo.Root.displayName;const dr=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));dr.displayName=De.Root.displayName;const ns=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Image,{ref:r,className:f("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));ns.displayName=De.Image.displayName;const wr=l.forwardRef(({className:t,...e},r)=>n.jsx(De.Fallback,{ref:r,className:f("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));wr.displayName=De.Fallback.displayName;const pr=l.createContext(void 0);function Bt(){const t=l.useContext(pr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Jt=ie.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),ce=Q.Trigger,ur=Q.Group,mr=Q.Portal,fr=Q.Sub,hr=Q.RadioGroup;function Qt({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(pr.Provider,{value:r,children:n.jsx(Q.Root,{...e})})}const bn=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Bt();return n.jsxs(Q.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,Jt({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});bn.displayName=Q.SubTrigger.displayName;const vn=l.forwardRef(({className:t,children:e,...r},o)=>{const s=st();return n.jsx(Q.SubContent,{ref:o,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});vn.displayName=Q.SubContent.displayName;const Yt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=st();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:s,sideOffset:e,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Yt.displayName=Q.Content.displayName;const Se=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=st(),a=Bt();return n.jsx(Q.Item,{ref:o,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,Jt({variant:a.variant})),...r,dir:s})});Se.displayName=Q.Item.displayName;const $t=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=st(),i=Bt();return n.jsxs(Q.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:i.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});$t.displayName=Q.CheckboxItem.displayName;const yn=l.forwardRef(({className:t,children:e,...r},o)=>{const s=st(),a=Bt();return n.jsxs(Q.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,Jt({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});yn.displayName=Q.RadioItem.displayName;const Oe=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Oe.displayName=Q.Label.displayName;const de=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));de.displayName=Q.Separator.displayName;function gr({className:t,...e}){return n.jsx("span",{className:f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}gr.displayName="DropdownMenuShortcut";function Xr({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:i,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[p,u]=l.useState(),h=l.useRef(null);l.useEffect(()=>{if(!w)return;let _=!0;const B=h.current;if(!B)return;const F=setTimeout(()=>{_&&Yo(B)},300);return()=>{_=!1,clearTimeout(F)}},[w]);const m=l.useCallback(_=>{_&&_.stopPropagation(),d(!1),u(void 0),i==null||i(!1)},[i]),g=l.useCallback(async _=>{if(_&&_.stopPropagation(),!p||!s)return;await s(t.id,sn(p))&&(d(!1),u(void 0),i==null||i(!1))},[p,s,t.id,i]),v=l.useMemo(()=>{const _=new Date(t.date),B=y.formatRelativeDate(_,r["%comment_date_today%"],r["%comment_date_yesterday%"]),F=_.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return y.formatReplacementString(r["%comment_dateAtTime%"],{date:B,time:F})},[t.date,r]),b=l.useMemo(()=>t.user,[t.user]),j=l.useMemo(()=>t.user.split(" ").map(_=>_[0]).join("").toUpperCase().slice(0,2),[t.user]),N=l.useMemo(()=>y.sanitizeHtml(t.contents),[t.contents]),C=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Se,{onClick:_=>{_.stopPropagation(),d(!0),u(bl(t.contents)),i==null||i(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Se,{onClick:async _=>{_.stopPropagation(),a&&await a(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,i]);return n.jsxs("div",{className:f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(dr,{className:"tw-h-8 tw-w-8",children:n.jsx(wr,{className:"tw-text-xs tw-font-medium",children:j})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:b}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:v}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(he,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",en(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:h,onKeyDownCapture:_=>{_.key==="Escape"?(_.preventDefault(),_.stopPropagation(),m()):ir(_)&&(_.preventDefault(),_.stopPropagation(),Pt(p)&&g())},onKeyDown:_=>{ar(_),(_.key==="Enter"||_.key===" ")&&_.stopPropagation()},onClick:_=>{_.stopPropagation()},children:[n.jsx(on,{className:f('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:_=>u(_)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx($,{size:"icon",onClick:m,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx($,{size:"icon",onClick:g,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:f("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:N}})]})]}),C&&n.jsxs(Qt,{children:[n.jsx(ce,{asChild:!0,children:n.jsx($,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:C})]})]})}const Wr={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Cl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:u,handleUpdateComment:h,handleDeleteComment:m,handleReadStatusChange:g,assignableUsers:v,canUserAddCommentToThread:b,canUserAssignThreadCallback:j,canUserResolveThreadCallback:N,canUserEditOrDeleteCommentCallback:C,isRead:_=!1,autoReadDelay:B=5,onVerseRefClick:F}){const[R,P]=l.useState(Wr),[E,T]=l.useState(void 0),V=o,[z,O]=l.useState(!1),[A,K]=l.useState(!1),[D,H]=l.useState(!1),[yt,Ot]=l.useState(!1),[At,lt]=l.useState(!1),[L,M]=l.useState(_),[G,Y]=l.useState(!1),X=l.useRef(void 0),[nt,ht]=l.useState(new Map);l.useEffect(()=>{let I=!0;return(async()=>{const Ct=N?await N(w):!1;I&&lt(Ct)})(),()=>{I=!1}},[w,N]),l.useEffect(()=>{let I=!0;if(!o){Ot(!1),ht(new Map);return}return(async()=>{const Ct=j?await j(w):!1;I&&Ot(Ct)})(),()=>{I=!1}},[o,w,j]);const ct=l.useMemo(()=>e.filter(I=>!I.deleted),[e]);l.useEffect(()=>{let I=!0;if(!o||!C){ht(new Map);return}return(async()=>{const Ct=new Map;await Promise.all(ct.map(async Ar=>{const Ca=await C(Ar.id);I&&Ct.set(Ar.id,Ca)})),I&&ht(Ct)})(),()=>{I=!1}},[o,ct,C]);const gt=l.useMemo(()=>ct[0],[ct]),Lt=l.useRef(null),wt=l.useRef(void 0),pt=l.useCallback(()=>{var I;(I=wt.current)==null||I.call(wt),P(Wr)},[]),Xt=l.useCallback(()=>{const I=!L;M(I),Y(!I),g==null||g(w,I)},[L,g,w]);l.useEffect(()=>{O(!1)},[o]),l.useEffect(()=>{if(o&&!L&&!G){const I=setTimeout(()=>{M(!0),g==null||g(w,!0)},B*1e3);return X.current=I,()=>clearTimeout(I)}X.current&&(clearTimeout(X.current),X.current=void 0)},[o,L,G,B,w,g]);const S=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),q=l.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const I=en(a,r);return y.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:I})},[a,r]),Z=l.useMemo(()=>ct.slice(1),[ct]),J=l.useMemo(()=>Z.length??0,[Z.length]),dt=l.useMemo(()=>J>0,[J]),Wt=l.useMemo(()=>z||J<=2?Z:Z.slice(-2),[Z,J,z]),xt=l.useMemo(()=>z||J<=2?0:J-2,[J,z]),We=l.useMemo(()=>J===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:J}),[J,S]),we=l.useMemo(()=>xt===1?S.singleReply:y.formatReplacementString(S.multipleReplies,{count:xt}),[xt,S]);l.useEffect(()=>{!o&&A&&dt&&K(!1)},[o,A,dt]);const Ir=l.useCallback(async I=>{I&&I.stopPropagation();const Gt=Pt(R)?sn(R):void 0;if(E!==void 0){await u({threadId:w,contents:Gt,assignedUser:E})&&(T(void 0),Gt&&pt());return}Gt&&await u({threadId:w,contents:Gt})&&pt()},[pt,R,u,E,w]),Or=l.useCallback(async I=>{const Gt=Pt(R)?sn(R):void 0,Ct=await u({...I,contents:Gt,assignedUser:E??I.assignedUser});return Ct&&Gt&&pt(),Ct&&E!==void 0&&T(void 0),Ct},[pt,R,u,E]);return n.jsx(lr,{role:"option","aria-selected":o,id:w,className:f("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&L,"tw-bg-background":o&&p!=="Resolved"&&L,"tw-bg-muted":p==="Resolved","tw-bg-blue-50":!L&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(cr,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[q&&n.jsx(he,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:q}),n.jsx($,{variant:"ghost",size:"icon",onClick:I=>{I.stopPropagation(),Xt()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":L?"Mark as unread":"Mark as read",children:L?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),At&&p!=="Resolved"&&n.jsx($,{variant:"ghost",size:"icon",className:f("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:I=>{I.stopPropagation(),Or({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:Lt,className:f("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":V},{"tw-whitespace-nowrap":!V}),children:[s&&F?n.jsx($,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:I=>{I.stopPropagation(),F(d)},children:s}):s,n.jsxs("span",{className:t,children:[gt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:gt.selectedText}),gt.contextAfter]})]})}),n.jsx(Xr,{comment:gt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:Or,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:K,canEditOrDelete:(!A&&nt.get(gt.id))??!1,canUserResolveThread:At})]}),n.jsxs(n.Fragment,{children:[dt&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ge,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:We})]}),!o&&Pt(R)&&n.jsx(on,{editorSerializedState:R,onSerializedChange:I=>P(I),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[xt>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:I=>{I.stopPropagation(),O(!0)},role:"button",tabIndex:0,onKeyDown:I=>{(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),I.stopPropagation(),O(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(ge,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:we}),z?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),Wt.map(I=>n.jsx("div",{children:n.jsx(Xr,{comment:I,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:h,handleDeleteComment:m,onEditingChange:K,canEditOrDelete:(!A&&nt.get(I.id))??!1})},I.id)),b!==!1&&(!A||Pt(R))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:I=>I.stopPropagation(),onKeyDownCapture:I=>{ir(I)&&(I.preventDefault(),I.stopPropagation(),(Pt(R)||E!==void 0)&&Ir())},onKeyDown:I=>{ar(I),(I.key==="Enter"||I.key===" ")&&I.stopPropagation()},children:[n.jsx(on,{editorSerializedState:R,onSerializedChange:I=>P(I),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:I=>{wt.current=I}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[E!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:y.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:en(E,r)})}),n.jsxs(It,{open:D,onOpenChange:H,children:[n.jsx(Zt,{asChild:!0,children:n.jsx($,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!yt||!v||v.length===0||!v.includes(i),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(_t,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:I=>{I.key==="Escape"&&(I.stopPropagation(),H(!1))},children:n.jsx(Vt,{children:n.jsx(zt,{children:v==null?void 0:v.map(I=>n.jsx(Dt,{onSelect:()=>{T(I!==a?I:void 0),H(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:en(I,r)})},I||"unassigned"))})})})]}),n.jsx($,{size:"icon",onClick:Ir,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(R)&&E===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function El({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,selectedThreadId:g,onSelectedThreadChange:v,onVerseRefClick:b}){const[j,N]=l.useState(new Set),[C,_]=l.useState();l.useEffect(()=>{g&&(N(O=>new Set(O).add(g)),_(g))},[g]);const B=r.filter(O=>O.comments.some(A=>!A.deleted)),F=B.map(O=>({id:O.id})),R=l.useCallback(O=>{N(A=>new Set(A).add(O.id)),_(O.id),v==null||v(O.id)},[v]),P=l.useCallback(O=>{const A=j.has(O);N(K=>{const D=new Set(K);return D.has(O)?D.delete(O):D.add(O),D}),_(O),v==null||v(A?void 0:O)},[j,v]),{listboxRef:E,activeId:T,handleKeyDown:V}=Wo({options:F,onOptionSelect:R}),z=l.useCallback(O=>{O.key==="Escape"?(C&&j.has(C)&&(N(A=>{const K=new Set(A);return K.delete(C),K}),_(void 0),v==null||v(void 0)),O.preventDefault(),O.stopPropagation()):V(O)},[C,j,V,v]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:E,"aria-activedescendant":T??void 0,"aria-label":"Comments",className:f("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:z,children:B.map(O=>n.jsx("div",{id:O.id,className:f({"tw-opacity-60":O.status==="Resolved"}),children:n.jsx(Cl,{classNameForVerseText:e,comments:O.comments,localizedStrings:s,verseRef:O.verseRef,handleSelectThread:P,threadId:O.id,thread:O,isRead:O.isRead,isSelected:j.has(O.id),currentUser:o,assignedUser:O.assignedUser,threadStatus:O.status,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:u,canUserResolveThreadCallback:h,canUserEditOrDeleteCommentCallback:m,onVerseRefClick:b})},O.id))})}function Sl({table:t}){return n.jsxs(Qt,{children:[n.jsx(oo.DropdownMenuTrigger,{asChild:!0,children:n.jsxs($,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Yt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Oe,{children:"Toggle columns"}),n.jsx(de,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx($t,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const xe=rt.Root,rs=rt.Group,be=rt.Value,os=ie.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),se=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=st();return n.jsxs(rt.Trigger,{className:f(os({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(rt.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});se.displayName=rt.Trigger.displayName;const xr=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.ScrollUpButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));xr.displayName=rt.ScrollUpButton.displayName;const br=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.ScrollDownButton,{ref:r,className:f("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));br.displayName=rt.ScrollDownButton.displayName;const ae=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=st();return n.jsx(rt.Portal,{children:n.jsxs(rt.Content,{ref:s,className:f("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(xr,{}),n.jsx(rt.Viewport,{className:f("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(br,{})]})})});ae.displayName=rt.Content.displayName;const ss=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Label,{ref:r,className:f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));ss.displayName=rt.Label.displayName;const jt=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(rt.Item,{ref:o,className:f("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(rt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(rt.ItemText,{children:e})]}));jt.displayName=rt.Item.displayName;const as=l.forwardRef(({className:t,...e},r)=>n.jsx(rt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));as.displayName=rt.Separator.displayName;function Rl({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(xe,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(se,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(be,{placeholder:t.getState().pagination.pageSize})}),n.jsx(ae,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(jt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs($,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs($,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs($,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs($,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Zr=`
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
`;function Tl(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Ge(t,e){const r=e?`${Zr}, ${e}`:Zr;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&Tl(o))}const Ke=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Ge(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Ge(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:f("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:f("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Ke.displayName="Table";const qe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:f({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));qe.displayName="TableHeader";const He=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:f("[&_tr:last-child]:tw-border-0",t),...e}));He.displayName="TableBody";const is=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:f("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));is.displayName="TableFooter";function Ml(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Ge(t.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function Dl(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function Il(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Ht=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),Ml(i);const c=l.useMemo(()=>i.current?Ge(i.current):[],[i]),w=l.useCallback(p=>{const{current:u}=i;if(!u||!u.parentElement)return;const h=u.closest("table"),m=h?Ge(h).filter(b=>b.tagName==="TR"):[],g=m.indexOf(u),v=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),Il(m,g,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),Dl(c,v,p.key);else if(p.key==="Escape"){p.preventDefault();const b=u.closest("table");b&&b.focus()}e==null||e(p)},[i,c,e]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:f("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Ht.displayName="TableRow";const Re=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:f("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Re.displayName="TableHead";const ne=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));ne.displayName="TableCell";const ls=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:f("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));ls.displayName="TableCaption";function an({className:t,...e}){return n.jsx("div",{className:f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function cs({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var F;const[p,u]=l.useState([]),[h,m]=l.useState([]),[g,v]=l.useState({}),[b,j]=l.useState({}),N=l.useMemo(()=>e??[],[e]),C=ft.useReactTable({data:N,columns:t,getCoreRowModel:ft.getCoreRowModel(),...r&&{getPaginationRowModel:ft.getPaginationRowModel()},onSortingChange:u,getSortedRowModel:ft.getSortedRowModel(),onColumnFiltersChange:m,getFilteredRowModel:ft.getFilteredRowModel(),onColumnVisibilityChange:v,onRowSelectionChange:j,state:{sorting:p,columnFilters:h,columnVisibility:g,rowSelection:b}}),_=C.getVisibleFlatColumns();let B;return w?B=Array.from({length:10}).map((E,T)=>`skeleton-row-${T}`).map(E=>n.jsx(Ht,{className:"hover:tw-bg-transparent",children:n.jsx(ne,{colSpan:_.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(an,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},E)):((F=C.getRowModel().rows)==null?void 0:F.length)>0?B=C.getRowModel().rows.map(R=>n.jsx(Ht,{onClick:()=>i(R,C),"data-state":R.getIsSelected()&&"selected",children:R.getVisibleCells().map(P=>n.jsx(ne,{children:ft.flexRender(P.column.columnDef.cell,P.getContext())},P.id))},R.id)):B=n.jsx(Ht,{children:n.jsx(ne,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Sl,{table:C}),n.jsxs(Ke,{stickyHeader:a,children:[n.jsx(qe,{stickyHeader:a,children:C.getHeaderGroups().map(R=>n.jsx(Ht,{children:R.headers.map(P=>n.jsx(Re,{className:"tw-p-0",children:P.isPlaceholder?void 0:ft.flexRender(P.column.columnDef.header,P.getContext())},P.id))},R.id))}),n.jsx(He,{children:B})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx($,{variant:"outline",size:"sm",onClick:()=>C.previousPage(),disabled:!C.getCanPreviousPage(),children:"Previous"}),n.jsx($,{variant:"outline",size:"sm",onClick:()=>C.nextPage(),disabled:!C.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Rl,{table:C})]})}function Ol({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:f("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(za,{options:a,children:e})})}const ds=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Jr=(t,e)=>t[e]??e;function ws({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=Jr(r,"%webView_error_dump_header%"),a=Jr(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx($,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Al=Object.freeze([...ds,"%webView_error_dump_copied_message%"]);function Ll({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(It,{onOpenChange:d,children:[n.jsx(Zt,{asChild:!0,children:o}),n.jsxs(_t,{id:a,className:f("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(at,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(ws,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var ps=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(ps||{});function Pl({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,p)=>{const u=!o[d][p];s(m=>(m[d][p]=u,{...m}));const h=r[d].items[p];h.onUpdate(h.id,u)},w=(d,p)=>{i(h=>(h[d]=p,{...h}));const u=r[d].items.find(h=>h.id===p);u?u.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(Qt,{children:[n.jsx(ce,{asChild:!0,children:n.jsxs($,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Yt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Oe,{children:d.label}),n.jsx(ur,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((u,h)=>n.jsx("div",{children:n.jsx($t,{checked:o[p][h],onCheckedChange:()=>c(p,h),children:u.label})},u.id))}):n.jsx(hr,{value:a[p],onValueChange:u=>w(p,u),children:d.items.map(u=>n.jsx("div",{children:n.jsx(yn,{value:u.id,children:u.label})},u.id))})}),n.jsx(de,{})]},d.label))})]})})}function $l({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new y.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,u)=>p+u,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs($,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs($,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function Fl({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,u=d.getUTCMonth(),h=d.getUTCDate()-1;let m="";return p>0?m=`${p.toString()} year${p===1?"":"s"} ago`:u>0?m=`${u.toString()} month${u===1?"":"s"} ago`:h===0?m="today":m=`${h.toString()} day${h===1?"":"s"} ago`,m}const i=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function Vl({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>y.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(y.getCurrentLocale(),{type:"language"});return d.map(u=>p.of(u))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(Fl,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function us({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:u=!1,sortSelected:h=!1,icon:m=void 0,className:g=void 0,variant:v="ghost",id:b}){const[j,N]=l.useState(!1),C=l.useCallback(T=>{var z;const V=(z=t.find(O=>O.label===T))==null?void 0:z.value;V&&r(e.includes(V)?e.filter(O=>O!==V):[...e,V])},[t,e,r]),_=()=>w||o,B=l.useMemo(()=>{if(!h)return t;const T=t.filter(z=>z.starred).sort((z,O)=>z.label.localeCompare(O.label)),V=t.filter(z=>!z.starred).sort((z,O)=>{const A=e.includes(z.value),K=e.includes(O.value);return A&&!K?-1:!A&&K?1:z.label.localeCompare(O.label)});return[...T,...V]},[t,e,h]),F=()=>{r(t.map(T=>T.value))},R=()=>{r([])},P=d??j,E=p??N;return n.jsx("div",{id:b,className:g,children:n.jsxs(It,{open:P,onOpenChange:E,children:[n.jsx(Zt,{asChild:!0,children:n.jsxs($,{variant:v,role:"combobox","aria-expanded":P,className:"tw-group tw-w-full tw-justify-between",disabled:u,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[m&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:m})}),n.jsx("span",{className:f("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:_()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(_t,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Vt,{children:[n.jsx(le,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx($,{variant:"ghost",size:"sm",onClick:F,children:a}),n.jsx($,{variant:"ghost",size:"sm",onClick:R,children:i})]}),n.jsxs(zt,{children:[n.jsx(ve,{children:c}),n.jsx(Mt,{children:B.map(T=>n.jsxs(Dt,{value:T.label,onSelect:C,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:f("tw-h-4 tw-w-4",e.includes(T.value)?"tw-opacity-100":"tw-opacity-0")})}),T.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:T.label}),T.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:T.secondaryLabel})]},T.label))})]})]})})]})})}function zl({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:u}){return n.jsxs("div",{id:u,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(us,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(h=>{var m;return n.jsxs(he,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx($,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(g=>g!==h)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(m=t.find(g=>g.value===h))==null?void 0:m.label]},h)})}):n.jsx(at,{children:p})]})}function ms({children:t,editorRef:e}){const r=l.useRef(null);return l.useEffect(()=>{var i;const o=/Macintosh/i.test(navigator.userAgent),s=((i=r.current)==null?void 0:i.querySelector(".editor-input"))??void 0,a=c=>{var w,d;s&&document.activeElement===s&&(o?c.metaKey:c.ctrlKey)&&(c.shiftKey&&c.key.toLowerCase()==="z"||c.key.toLowerCase()==="y"?(c.preventDefault(),(w=e.current)==null||w.redo()):c.key.toLowerCase()==="z"&&(c.preventDefault(),(d=e.current)==null||d.undo()))};return s==null||s.addEventListener("keydown",a),()=>{s==null||s.removeEventListener("keydown",a)}},[e]),n.jsx("div",{ref:r,children:t})}const ye=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:f("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));ye.displayName="Input";const Bl=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function Gl({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(t),[p,u]=l.useState(r),[h,m]=l.useState(!1);l.useEffect(()=>{d(t)},[t]),l.useEffect(()=>{p!==r&&u(r)},[r]);const g=b=>{c.current=!1,m(b),b||(w!=="custom"||p?(e(w),o(p)):(d(t),u(r)))},v=b=>{var j,N,C,_;b.stopPropagation(),document.activeElement===i.current&&b.key==="ArrowDown"||b.key==="ArrowRight"?((j=a.current)==null||j.focus(),c.current=!0):document.activeElement===a.current&&b.key==="ArrowUp"?((N=i.current)==null||N.focus(),c.current=!1):document.activeElement===a.current&&b.key==="ArrowLeft"&&((C=a.current)==null?void 0:C.selectionStart)===0&&((_=i.current)==null||_.focus(),c.current=!1),w==="custom"&&b.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&g(!1)};return n.jsxs(Qt,{open:h,onOpenChange:g,children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx(ce,{asChild:!0,children:n.jsx($,{variant:"outline",className:"tw-h-6",children:Bl(t,s,r)})})}),n.jsx(kt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Yt,{style:{zIndex:tr},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:v,onMouseMove:()=>{var b;c.current&&((b=a.current)==null||b.focus())},children:[n.jsx(Oe,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(de,{}),n.jsx($t,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Et.GENERATOR_NOTE_CALLER})]})}),n.jsx($t,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:Et.HIDDEN_NOTE_CALLER})]})}),n.jsx($t,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:b=>{var j;b.stopPropagation(),c.current=!0,(j=a.current)==null||j.focus()},onSelect:b=>b.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(ye,{tabIndex:0,onMouseDown:b=>{b.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:b=>{b.key==="Enter"||b.key==="ArrowUp"||b.key==="ArrowDown"||b.key==="ArrowLeft"||b.key==="ArrowRight"||b.stopPropagation()},maxLength:1,onChange:b=>u(b.target.value)})]})})]})]})}const Kl=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),ql=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),y.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function Hl({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(Qt,{children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(no.TooltipTrigger,{asChild:!0,children:n.jsx(ce,{asChild:!0,children:n.jsx($,{variant:"outline",className:"tw-h-6",children:Kl(t,r)})})}),n.jsx(kt,{children:n.jsx("p",{children:ql(t,r)})})]})}),n.jsxs(Yt,{style:{zIndex:tr},children:[n.jsx(Oe,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(de,{}),n.jsxs($t,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs($t,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs($t,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const fs=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function Ul({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function hs({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),a=l.useMemo(()=>{const i=o.trim().toLowerCase();return i?e.filter(c=>{var w;return c.marker&&((w=c.marker)==null?void 0:w.toLowerCase().includes(i))||!c.marker&&c.title.toLowerCase().includes(i)}):e},[o,e]);return n.jsxs(Vt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(le,{className:"marker-menu-search",ref:r,value:o,onValueChange:i=>s(i),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(zt,{children:[n.jsx(ve,{children:t["%markerMenu_noResults%"]}),n.jsx(Mt,{children:a.map(i=>{var c;return n.jsxs(Dt,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:i.isDisallowed||i.isDeprecated,onSelect:i.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:i.marker?n.jsx("span",{className:"tw-text-xs",children:i.marker}):n.jsx("div",{children:n.jsx(Ul,{icon:i.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:i.title}),i.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:i.subtitle})]}),(i.isDisallowed||i.isDeprecated)&&n.jsx(mo,{className:"tw-font-sans",children:i.isDisallowed?t["%markerMenu_disallowed_label%"]:t["%markerMenu_deprecated_label%"]})]},`item-${i.marker??((c=i.icon)==null?void 0:c.displayName)}-${i.title.replaceAll(" ","")}`)})})]})]})}function Yl(t,e,r,o){if(!o||o==="p")return[];const s=y.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,i])=>{a.push(...i.map(c=>({marker:c,title:r[y.usfmMarkers[c].description]??y.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),a.sort((i,c)=>(i.marker??i.title).localeCompare(c.marker??c.title))}function Xl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function Wl(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const Zl={type:"USJ",version:"3.1",content:[{type:"para"}]};function Jl({classNameForEditor:t,noteOps:e,onSave:r,onClose:o,scrRef:s,noteKey:a,editorOptions:i,defaultMarkerMenuTrigger:c,localizedStrings:w}){const d=l.useRef(null),p=l.useRef(null),u=l.useRef(null),[h,m]=l.useState("generated"),[g,v]=l.useState("*"),[b,j]=l.useState("f"),[N,C]=l.useState(!1),[_,B]=l.useState(!1),[F,R]=l.useState(),[P,E]=l.useState(),[T,V]=l.useState(),[z,O]=l.useState(),A=l.useRef(null),K=l.useMemo(()=>({...i,markerMenuTrigger:c,hasExternalUI:!0,view:{...i.view??Et.getDefaultViewOptions(),noteMode:"expanded"}}),[i,c]),D=l.useMemo(()=>Yl(d,()=>B(!1),w,z),[w,z]);l.useEffect(()=>{var L;_||(L=d.current)==null||L.focus()},[b,_]),l.useEffect(()=>{var G,Y;let L;const M=e==null?void 0:e.at(0);if(M&&Et.isInsertEmbedOpOfType("note",M)){const X=(G=M.insert.note)==null?void 0:G.caller;let nt="custom";X===Et.GENERATOR_NOTE_CALLER?nt="generated":X===Et.HIDDEN_NOTE_CALLER?nt="hidden":X&&v(X),m(nt),j(((Y=M.insert.note)==null?void 0:Y.style)??"f"),L=setTimeout(()=>{var ht;(ht=d.current)==null||ht.applyUpdate([M])},0)}return()=>{L&&clearTimeout(L)}},[e,a]);const H=l.useCallback(()=>{var M,G;const L=(G=(M=d.current)==null?void 0:M.getNoteOps(0))==null?void 0:G.at(0);L&&Et.isInsertEmbedOpOfType("note",L)&&(L.insert.note&&(h==="custom"?L.insert.note.caller=g:L.insert.note.caller=h==="generated"?Et.GENERATOR_NOTE_CALLER:Et.HIDDEN_NOTE_CALLER),r([L]))},[h,g,r]),yt=()=>{var M;const L=(M=p.current)==null?void 0:M.getElementsByClassName("editor-input")[0];L!=null&&L.textContent&&navigator.clipboard.writeText(L.textContent)},Ot=L=>{var G,Y,X,nt,ht;j(L);const M=(Y=(G=d.current)==null?void 0:G.getNoteOps(0))==null?void 0:Y.at(0);if(M&&Et.isInsertEmbedOpOfType("note",M)){M.insert.note&&(M.insert.note.style=L);const ct=(nt=(X=M.insert.note)==null?void 0:X.contents)==null?void 0:nt.ops;b!=="x"&&L==="x"?ct==null||ct.forEach(gt=>Xl(gt)):b==="x"&&L!=="x"&&(ct==null||ct.forEach(gt=>Wl(gt))),(ht=d.current)==null||ht.applyUpdate([M,{delete:1}])}},At=L=>{var G,Y,X,nt,ht,ct;(G=d.current)==null||G.focus();const M=(X=(Y=d.current)==null?void 0:Y.getNoteOps(0))==null?void 0:X.at(0);if(M&&Et.isInsertEmbedOpOfType("note",M)){L.content.length>1&&setTimeout(()=>{var wt;(wt=d.current)==null||wt.applyUpdate([{retain:2},{delete:1}])},0);const gt=(nt=M.insert.note)==null?void 0:nt.style,Lt=(ct=(ht=M.insert.note)==null?void 0:ht.contents)==null?void 0:ct.ops;gt||C(!1),C(gt==="x"?!!(Lt!=null&&Lt.every(wt=>{var Xt,S;if(!((Xt=wt.attributes)!=null&&Xt.char))return!0;const pt=((S=wt.attributes)==null?void 0:S.char).style;return pt==="xt"||pt==="xo"||pt==="xq"})):!!(Lt!=null&&Lt.every(wt=>{var Xt,S;if(!((Xt=wt.attributes)!=null&&Xt.char))return!0;const pt=((S=wt.attributes)==null?void 0:S.char).style;return pt==="ft"||pt==="fr"||pt==="fq"})))}else C(!1)},lt=l.useCallback(()=>{const L=window.getSelection();if(u.current&&D.length&&L&&L.rangeCount>0){const M=L.getRangeAt(0).getBoundingClientRect(),G=u.current.getBoundingClientRect();R(M.left-G.left),E(M.top-G.top),V(M.height),B(!0)}},[D,u]);return l.useEffect(()=>{const L=()=>{_&&B(!1)};return window.addEventListener("click",L),()=>{window.removeEventListener("click",L)}},[_]),l.useEffect(()=>{var L;_&&((L=A.current)==null||L.focus())},[_]),l.useEffect(()=>{var G;const L=((G=p.current)==null?void 0:G.querySelector(".editor-input"))??void 0,M=Y=>{!_&&L&&document.activeElement===L&&Y.key===c?(Y.preventDefault(),lt()):_&&Y.key==="Escape"&&(Y.preventDefault(),B(!1))};return document.addEventListener("keydown",M),()=>{document.removeEventListener("keydown",M)}},[_,lt,c]),n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(Hl,{isTypeSwitchable:N,noteType:b,handleNoteTypeChange:Ot,localizedStrings:w}),n.jsx(Gl,{callerType:h,updateCallerType:m,customCaller:g,updateCustomCaller:v,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx($,{onClick:o,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(kt,{children:n.jsx("p",{children:w["%footnoteEditor_cancelButton_tooltip%"]})})]})}),n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx($,{onClick:H,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:n.jsx(k.Check,{})})}),n.jsx(kt,{children:w["%footnoteEditor_saveButton_tooltip%"]})]})})]})]}),n.jsxs("div",{ref:p,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(ms,{editorRef:d,children:n.jsx(Et.Editorial,{options:K,onStateChange:L=>O(L.contextMarker),onUsjChange:At,defaultUsj:Zl,onScrRefChange:()=>{},scrRef:s,ref:d})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:n.jsx($,{onClick:yt,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(kt,{children:n.jsx("p",{children:w["%footnoteEditor_copyButton_tooltip%"]})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:u,style:{top:0,left:0,height:0,width:0}}),n.jsxs(It,{open:_,children:[n.jsx(mn,{className:"tw-absolute",style:{top:P,left:F,height:T,width:0,pointerEvents:"none"}}),n.jsx(_t,{className:"tw-w-[500px] tw-p-0",onClick:L=>{L.preventDefault(),L.stopPropagation()},children:n.jsx(hs,{markerMenuItems:D,localizedStrings:w,searchRef:A})})]})]})}const Ql=Object.freeze([...fs,...Object.entries(y.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%"]);function gs(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function tc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let i=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[vr(t,c,r,!0,s),d&&o]},gs(t,c))})}function vr(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const i=`${t}-text-${a.slice(0,10)}`;if(o){const c=f(`usfm_${t}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return ec(a,gs(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function ec(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),vr(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function xs({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let i,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:f("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),u=i&&n.jsxs(n.Fragment,{children:[vr(t.marker,[i],o,!1)," "]}),h=e==="horizontal"?"horizontal":"vertical",m=o?"marker-visible":"",g=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",v=f(h,m);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:[w,p]}),n.jsx("div",{className:f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",v),children:u}),n.jsx("div",{className:f("textual-note-body tw-flex tw-flex-col tw-gap-1",g,v),children:c&&c.length>0&&n.jsx(n.Fragment,{children:tc(t.marker,c,o,d)})})]})}function nc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??y.getFormatCallerFunction(r,void 0),u=(N,C)=>{d==null||d(N,C,s)},h=a?r.findIndex(N=>N===a):-1,[m,g]=l.useState(h),v=(N,C,_)=>{if(r.length)switch(N.key){case"Enter":case" ":N.preventDefault(),d==null||d(C,_,s);break}},b=N=>{if(r.length)switch(N.key){case"ArrowDown":N.preventDefault(),g(C=>Math.min(C+1,r.length-1));break;case"ArrowUp":N.preventDefault(),g(C=>Math.max(C-1,0));break}},j=l.useRef([]);return l.useEffect(()=>{var N;m>=0&&m<j.current.length&&((N=j.current[m])==null||N.focus())},[m]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:m<0?0:-1,className:f("tw-h-full tw-overflow-y-auto",t),onKeyDown:b,children:n.jsx("ul",{className:f("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((N,C)=>{const _=N===a,B=`${s}-${C}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:F=>{j.current[C]=F},role:"option","aria-selected":_,"data-marker":N.marker,"data-state":_?"selected":void 0,tabIndex:C===m?0:-1,className:f("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>u(N,C),onKeyDown:F=>v(F,N,C),children:n.jsx(xs,{footnote:N,layout:o,formatCaller:()=>p(N.caller,C),showMarkers:i})},B),C<r.length-1&&o==="vertical"&&n.jsx(ge,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function rc(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function oc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(Ke,{stickyHeader:!0,children:[n.jsx(qe,{stickyHeader:!0,children:n.jsxs(Ht,{children:[n.jsx(Re,{children:s}),n.jsx(Re,{children:a})]})}),n.jsx(He,{children:i.length>0&&i.map(c=>n.jsxs(Ht,{onClick:()=>{e(c.reference)},children:[n.jsx(ne,{children:y.formatScrRef(c.reference,"English")}),n.jsx(ne,{className:o,children:rc(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const jn=l.forwardRef(({className:t,...e},r)=>n.jsx($n.Root,{ref:r,className:f("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx($n.Indicator,{className:f("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));jn.displayName=$n.Root.displayName;const sc=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},Ue=(t,e,r)=>n.jsx(Nt,{children:n.jsxs(St,{children:[n.jsxs(Rt,{className:f("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),sc(t.getIsSorted())]}),n.jsx(kt,{side:"bottom",children:e})]})}),ac=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>Ue(e,t)}),ic=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>Ue(r,t)}),lc=t=>({accessorKey:"count",header:({column:e})=>Ue(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),In=(t,e,r,o,s,a)=>{let i=[...r];t.forEach(w=>{e==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},cc=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>Ue(a,t,"tw-justify-center"),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(xn,{value:i,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(_e,{onClick:w=>{w.stopPropagation(),In([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(_e,{onClick:w=>{w.stopPropagation(),In([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(_e,{onClick:w=>{w.stopPropagation(),In([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),dc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),wc=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},pc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},bs=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",uc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),mc=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},fc=(t,e,r)=>t.map(o=>{const s=y.isString(o.key)?o.key:o.key[0];return{items:y.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||bs(s,e,r),occurrences:o.occurrences||[]}}),Kt=(t,e)=>t[e]??e;function hc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:u,onItemSelected:h}){const m=Kt(r,"%webView_inventory_all%"),g=Kt(r,"%webView_inventory_approved%"),v=Kt(r,"%webView_inventory_unapproved%"),b=Kt(r,"%webView_inventory_unknown%"),j=Kt(r,"%webView_inventory_scope_currentBook%"),N=Kt(r,"%webView_inventory_scope_chapter%"),C=Kt(r,"%webView_inventory_scope_verse%"),_=Kt(r,"%webView_inventory_filter_text%"),B=Kt(r,"%webView_inventory_show_additional_items%"),F=Kt(r,"%webView_inventory_no_results%"),[R,P]=l.useState(!1),[E,T]=l.useState("all"),[V,z]=l.useState(""),[O,A]=l.useState([]),K=l.useMemo(()=>{const M=t??[];return M.length===0?[]:fc(M,s,a)},[t,s,a]),D=l.useMemo(()=>{if(R)return K;const M=[];return K.forEach(G=>{const Y=G.items[0],X=M.find(nt=>nt.items[0]===Y);X?(X.count+=G.count,X.occurrences=X.occurrences.concat(G.occurrences)):M.push({items:[Y],count:G.count,occurrences:G.occurrences,status:G.status})}),M},[R,K]),H=l.useMemo(()=>D.length===0?[]:mc(D,E,V),[D,E,V]),yt=l.useMemo(()=>{var Y,X;if(!R)return w;const M=(Y=o==null?void 0:o.tableHeaders)==null?void 0:Y.length;if(!M)return w;const G=[];for(let nt=0;nt<M;nt++)G.push(ic(((X=o==null?void 0:o.tableHeaders)==null?void 0:X[nt])||"Additional Item",nt+1));return[...G,...w]},[o==null?void 0:o.tableHeaders,w,R]);l.useEffect(()=>{H.length===0?A([]):H.length===1&&A(H[0].items)},[H]);const Ot=(M,G)=>{G.setRowSelection(()=>{const X={};return X[M.index]=!0,X});const Y=M.original.items;A(Y),h&&Y.length>0&&h(Y[0])},At=M=>{if(M==="book"||M==="chapter"||M==="verse")c(M);else throw new Error(`Invalid scope value: ${M}`)},lt=M=>{if(M==="all"||M==="approved"||M==="unapproved"||M==="unknown")T(M);else throw new Error(`Invalid status filter value: ${M}`)},L=l.useMemo(()=>{if(D.length===0||O.length===0)return[];const M=D.filter(G=>y.deepEqual(R?G.items:[G.items[0]],O));if(M.length>1)throw new Error("Selected item is not unique");return M.length===0?[]:M[0].occurrences},[O,R,D]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(xe,{onValueChange:M=>lt(M),defaultValue:E,children:[n.jsx(se,{className:"tw-m-1",children:n.jsx(be,{placeholder:"Select filter"})}),n.jsxs(ae,{children:[n.jsx(jt,{value:"all",children:m}),n.jsx(jt,{value:"approved",children:g}),n.jsx(jt,{value:"unapproved",children:v}),n.jsx(jt,{value:"unknown",children:b})]})]}),n.jsxs(xe,{onValueChange:M=>At(M),defaultValue:i,children:[n.jsx(se,{className:"tw-m-1",children:n.jsx(be,{placeholder:"Select scope"})}),n.jsxs(ae,{children:[n.jsx(jt,{value:"book",children:j}),n.jsx(jt,{value:"chapter",children:N}),n.jsx(jt,{value:"verse",children:C})]})]}),n.jsx(ye,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:V,onChange:M=>{z(M.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(jn,{className:"tw-m-1",checked:R,onCheckedChange:M=>{P(M)}}),n.jsx(at,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??B})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(cs,{columns:yt,data:H,onRowClickHandler:Ot,stickyHeader:!0,isLoading:p,noResultsMessage:F})}),L.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(oc,{classNameForText:u,occurrenceData:L,setScriptureReference:e,localizedStrings:r})})]})}const nn="hover:tw-bg-accent hover:tw-text-accent-foreground [transition-duration:0ms]",gc=150,xc=100;function bc({label:t,items:e,onSelect:r}){const[o,s]=l.useState(!1),a=l.useRef(),i=l.useRef(),c=l.useCallback(()=>{clearTimeout(i.current),a.current=setTimeout(()=>s(!0),gc)},[]),w=l.useCallback(()=>{clearTimeout(a.current),i.current=setTimeout(()=>s(!1),xc)},[]),d=l.useCallback(()=>{clearTimeout(i.current)},[]);return l.useEffect(()=>()=>{clearTimeout(a.current),clearTimeout(i.current)},[]),n.jsxs(fr,{open:o,onOpenChange:s,children:[n.jsx(bn,{className:nn,onPointerEnter:c,onPointerLeave:w,children:t}),n.jsx(mr,{children:n.jsx(vn,{className:"overlay-context-menu-content",style:{zIndex:Ce},onPointerEnter:d,onPointerLeave:w,children:vs(e,r)})})]})}function vs(t,e){var s;const r=[];let o=0;for(;o<t.length;){const a=t[o];if(a.type==="separator")r.push(n.jsx(de,{},`sep-${o}`)),o+=1;else if(a.type==="item")r.push(n.jsxs(Se,{disabled:a.disabled,className:f(nn,a.destructive&&"tw-text-destructive"),onSelect:()=>e({itemId:a.id}),children:[a.label,a.shortcut&&n.jsx(gr,{children:a.shortcut})]},a.id)),o+=1;else if(a.type==="checkbox")r.push(n.jsx($t,{className:nn,checked:a.checked,onCheckedChange:i=>e({itemId:a.id,checked:i}),children:a.label},a.id)),o+=1;else if(a.type==="radio"){const{group:i}=a,c=[];for(;o<t.length&&t[o].type==="radio";){const d=t[o];if(d.type==="radio"&&d.group===i)c.push(d),o+=1;else break}const w=((s=c.find(d=>d.checked))==null?void 0:s.value)??"";r.push(n.jsx(hr,{value:w,onValueChange:d=>{const p=c.find(u=>u.value===d);p&&e({itemId:p.id,checked:!0})},children:c.map(d=>n.jsx(yn,{className:nn,value:d.value,children:d.label},d.id))},`radio-group-${i}`))}else a.type==="submenu"&&r.push(n.jsx(bc,{label:typeof a.label=="string"?a.label:String(a.label),items:a.items,onSelect:e},`submenu-${a.label}`)),o+=1}return r}function vc({items:t,position:e,onSelect:r,onDismiss:o}){const s=l.useRef(null);return n.jsxs(Qt,{open:!0,modal:!1,onOpenChange:a=>{a||o()},children:[n.jsx(ce,{asChild:!0,children:n.jsx("button",{ref:s,type:"button","data-overlay-context-menu":!0,style:{position:"fixed",left:e.x,top:e.y,width:0,height:0,padding:0,margin:0,border:"none",opacity:0,pointerEvents:"none"},"aria-hidden":!0,tabIndex:-1})}),n.jsx(Yt,{className:"overlay-context-menu-content",style:{zIndex:Ce},align:"start",side:"bottom",sideOffset:0,children:vs(t,r)})]})}const ys="OK",yc="Cancel",jc="Alert",Nc="Confirm",kc="Dialog";function _c({options:t,onOk:e}){return n.jsxs(n.Fragment,{children:[n.jsx(Wn,{children:t.message}),n.jsx(Yn,{children:n.jsx($,{onClick:e,children:t.okLabel??ys})})]})}function Cc({options:t,onOk:e,onCancel:r}){return n.jsxs(n.Fragment,{children:[n.jsx(Wn,{children:t.message}),n.jsxs(Yn,{children:[n.jsx($,{variant:"outline",onClick:r,children:t.cancelLabel??yc}),n.jsx($,{variant:t.destructive?"destructive":"default",onClick:e,children:t.okLabel??ys})]})]})}function Ec(t){return t==="alert"||t==="confirm"?"alertdialog":"dialog"}function Sc(t){switch(t){case"alert":return jc;case"confirm":return Nc;default:return kc}}function Rc(t,e,r,o){switch(t){case"alert":return n.jsx(_c,{options:e,onOk:()=>r(!0)});case"confirm":return n.jsx(Cc,{options:e,onOk:()=>r(!0),onCancel:o});default:return}}function Tc({dialogType:t,options:e,onResolve:r,onDismiss:o}){const s=l.useRef(!1),a=l.useCallback(p=>{s.current||(s.current=!0,r(p))},[r]),i=l.useCallback(()=>{s.current||(s.current=!0,o())},[o]),c=l.useCallback(p=>{p||i()},[i]),w=Ec(t),d=("title"in e&&typeof e.title=="string"?e.title:void 0)||Sc(t);return n.jsx(co,{open:!0,onOpenChange:c,children:n.jsxs(wo,{children:[n.jsx(Hn,{className:"overlay-modal-backdrop tw-bg-black/40",style:{zIndex:xo}}),n.jsxs(Tt.Content,{"data-overlay-modal-dialog":!0,role:w,"aria-modal":"true",className:"pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",style:{zIndex:bo},onKeyDown:p=>{p.key==="Enter"&&t==="alert"&&(p.preventDefault(),a(!0))},children:[n.jsx(Un,{children:n.jsx(Xn,{children:d})}),Rc(t,e,a,i)]})]})})}const Mc=320,Dc=400;function Ye({title:t}){if(t)return n.jsx("div",{className:"tw-mb-2 tw-font-bold",children:t})}function Ic({content:t}){var e;return n.jsxs(n.Fragment,{children:[n.jsx(Ye,{title:(e=t.title)==null?void 0:e.toString()}),n.jsx("p",{className:"tw-m-0",children:t.body})]})}function Oc({content:t}){var e;return n.jsxs(n.Fragment,{children:[n.jsx(Ye,{title:(e=t.title)==null?void 0:e.toString()}),n.jsx("ul",{className:"tw-m-0 tw-pl-5 [&>li]:tw-mb-1",children:t.items.map((r,o)=>n.jsx("li",{children:r},o))})]})}function Ac({content:t}){var e;return n.jsxs(n.Fragment,{children:[n.jsx(Ye,{title:(e=t.title)==null?void 0:e.toString()}),n.jsx("dl",{className:"tw-m-0 [&>div:first-child>dt]:tw-mt-0 [&>div>dd]:tw-mb-1 [&>div>dd]:tw-ml-0 [&>div>dt]:tw-mt-2 [&>div>dt]:tw-font-semibold",children:t.entries.map((r,o)=>n.jsxs("div",{children:[n.jsx("dt",{children:r.term}),n.jsx("dd",{children:r.detail})]},o))})]})}function Lc({run:t}){let e=t.text;return t.bold&&(e=n.jsx("strong",{children:e})),t.italic&&(e=n.jsx("em",{children:e})),t.scriptureRef&&(e=n.jsx("span",{className:"tw-italic",children:e})),e}function Pc({content:t}){var e;return n.jsxs(n.Fragment,{children:[n.jsx(Ye,{title:(e=t.title)==null?void 0:e.toString()}),n.jsx("div",{children:t.body.map((r,o)=>n.jsx(Lc,{run:r},o))})]})}function $c({content:t,onAction:e}){var r;return n.jsxs(n.Fragment,{children:[n.jsx(Ye,{title:(r=t.title)==null?void 0:r.toString()}),n.jsx("p",{className:"tw-m-0",children:t.body}),n.jsx("div",{className:"tw-mt-3 tw-flex tw-justify-end tw-gap-2",children:t.actions.map(o=>n.jsx($,{variant:o.variant??"default",size:"sm",onClick:()=>e(o.id),children:o.label},o.id))})]})}function Fc({content:t,onAction:e}){switch(t.type){case"text":return n.jsx(Ic,{content:t});case"list":return n.jsx(Oc,{content:t});case"description":return n.jsx(Ac,{content:t});case"richText":return n.jsx(Pc,{content:t});case"card":return n.jsx($c,{content:t,onAction:e});default:return}}function Vc({content:t,position:e,anchor:r,side:o="bottom",maxWidth:s=Mc,showArrow:a=!0,onAction:i,onDismiss:c}){const w=l.useCallback(u=>{u||c()},[c]),d=l.useCallback(u=>{u.key==="Escape"&&(u.preventDefault(),c())},[c]),p=l.useCallback(u=>{i&&i(u)},[i]);return n.jsxs(It,{open:!0,onOpenChange:w,children:[n.jsx(mn,{asChild:!0,children:n.jsx("div",{"data-overlay-popover-anchor":!0,style:{position:"fixed",left:e.x,top:e.y,width:(r==null?void 0:r.width)??0,height:(r==null?void 0:r.height)??0,pointerEvents:"none"}})}),n.jsxs(_t,{"data-overlay-popover":!0,className:"tw-overflow-y-auto",side:o,align:"start",sideOffset:a?8:4,style:{zIndex:Ce,maxWidth:s,maxHeight:Dc},onKeyDown:d,onOpenAutoFocus:u=>u.preventDefault(),onCloseAutoFocus:u=>u.preventDefault(),children:[a&&n.jsx(re.Arrow,{className:"tw-fill-popover tw-stroke-border tw-stroke-1"}),n.jsx(Fc,{content:t,onAction:p})]})]})}const zc=500,Bc=400;function Qr({item:t,onSelect:e}){const r=[t.label,t.description,t.badge].filter(Boolean).join(" ");return n.jsxs(Dt,{value:r,disabled:t.disabled,onSelect:()=>e(t.id),className:"tw-flex tw-items-center tw-gap-2",children:[t.icon&&n.jsx("span",{className:"tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center tw-text-muted-foreground",children:t.icon}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-overflow-hidden",children:[n.jsx("span",{className:"tw-truncate",children:t.label}),t.description&&n.jsx("span",{className:"tw-truncate tw-text-xs tw-text-muted-foreground",children:t.description})]}),t.badge&&n.jsx("span",{className:"tw-ml-auto tw-shrink-0 tw-rounded tw-bg-muted tw-px-1.5 tw-py-0.5 tw-text-xs tw-text-muted-foreground",children:t.badge})]})}function Gc({items:t,onSelect:e}){const r=l.useMemo(()=>{const s=new Map;return t.forEach(a=>{const i=a.group??"",c=s.get(i);c?c.push(a):s.set(i,[a])}),s},[t]);return r.size>1||r.size===1&&!r.has("")?n.jsx(n.Fragment,{children:Array.from(r.entries()).map(([s,a])=>n.jsx(Mt,{heading:s||void 0,children:a.map(i=>n.jsx(Qr,{item:i,onSelect:e},i.id))},s))}):n.jsx(Mt,{children:t.map(s=>n.jsx(Qr,{item:s,onSelect:e},s.id))})}function Kc({items:t,position:e,anchor:r,side:o="bottom",placeholder:s="Search...",maxWidth:a=zc,maxHeight:i=Bc,onSelect:c,onDismiss:w}){const d=l.useRef(null);l.useEffect(()=>{var m;(m=d.current)==null||m.focus()},[]);const p=l.useCallback(m=>{m.key==="Escape"&&(m.preventDefault(),w())},[w]),u=n.jsxs(Vt,{"data-overlay-command-palette":!0,className:"tw-rounded-lg tw-border tw-shadow-md",onKeyDown:p,children:[n.jsx(le,{ref:d,placeholder:s}),n.jsxs(zt,{style:{maxHeight:i-44},children:[n.jsx(ve,{children:"No results found"}),n.jsx(Gc,{items:t,onSelect:c})]})]});if(!e)return n.jsx("div",{"data-overlay-command-palette-backdrop":!0,className:"tw-fixed tw-inset-0 tw-flex tw-items-start tw-justify-center tw-pt-[20vh]",style:{zIndex:Ce},onClick:m=>{m.target===m.currentTarget&&w()},children:n.jsx("div",{style:{width:a,maxWidth:a},children:u})});const h=m=>{m||w()};return n.jsxs(It,{open:!0,onOpenChange:h,children:[n.jsx(mn,{asChild:!0,children:n.jsx("div",{"data-overlay-command-palette-anchor":!0,style:{position:"fixed",left:e.x,top:e.y,width:(r==null?void 0:r.width)??0,height:(r==null?void 0:r.height)??0,pointerEvents:"none"}})}),n.jsxs(_t,{"data-overlay-command-palette":!0,className:"tw-p-0",side:o,align:"start",sideOffset:4,style:{zIndex:Ce,width:a,maxWidth:a},onOpenAutoFocus:m=>m.preventDefault(),onCloseAutoFocus:m=>m.preventDefault(),children:[n.jsx(re.Arrow,{className:"tw-fill-popover tw-stroke-border tw-stroke-1"}),u]})]})}const qc="16rem",Hc="3rem",js=l.createContext(void 0);function Xe(){const t=l.useContext(js);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const yr=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,p]=l.useState(t),u=e??d,h=l.useCallback(C=>{const _=typeof C=="function"?C(u):C;r?r(_):p(_)},[r,u]),m=l.useCallback(()=>h(C=>!C),[h]),g=u?"expanded":"collapsed",j=st()==="ltr"?i:i==="primary"?"secondary":"primary",N=l.useMemo(()=>({state:g,open:u,setOpen:h,toggleSidebar:m,side:j}),[g,u,h,m,j]);return n.jsx(js.Provider,{value:N,children:n.jsx(Nt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":qc,"--sidebar-width-icon":Hc,...s},className:f("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});yr.displayName="SidebarProvider";const jr=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const i=Xe();return e==="none"?n.jsx("div",{className:f("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[n.jsx("div",{className:f("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:f("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});jr.displayName="Sidebar";const Ns=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=Xe();return n.jsxs($,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:f("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ns.displayName="SidebarTrigger";const ks=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=Xe();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:f("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});ks.displayName="SidebarRail";const Nr=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:f("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Nr.displayName="SidebarInset";const _s=l.forwardRef(({className:t,...e},r)=>n.jsx(ye,{ref:r,"data-sidebar":"input",className:f("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));_s.displayName="SidebarInput";const Cs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Cs.displayName="SidebarHeader";const Es=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:f("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Es.displayName="SidebarFooter";const Ss=l.forwardRef(({className:t,...e},r)=>n.jsx(ge,{ref:r,"data-sidebar":"separator",className:f("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Ss.displayName="SidebarSeparator";const kr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:f("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));kr.displayName="SidebarContent";const ln=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));ln.displayName="SidebarGroup";const cn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Te.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:f("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});cn.displayName="SidebarGroupLabel";const Rs=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Te.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:f("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Rs.displayName="SidebarGroupAction";const dn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:f("tw-w-full tw-text-sm",t),...e}));dn.displayName="SidebarGroupContent";const _r=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));_r.displayName="SidebarMenu";const Cr=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:f("tw-group/menu-item tw-relative",t),...e}));Cr.displayName="SidebarMenuItem";const Uc=ie.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Er=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=t?Te.Slot:"button",{state:d}=Xe(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:f(Uc({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:p}),n.jsx(kt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});Er.displayName="SidebarMenuButton";const Ts=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?Te.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:f("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Ts.displayName="SidebarMenuAction";const Ms=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:f("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ms.displayName="SidebarMenuBadge";const Ds=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(an,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(an,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});Ds.displayName="SidebarMenuSkeleton";const Is=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:f("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Is.displayName="SidebarMenuSub";const Os=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Os.displayName="SidebarMenuSubItem";const As=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const i=t?Te.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:f("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});As.displayName="SidebarMenuSubButton";function Ls({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((h,m)=>{o(h,m)},[o]),p=l.useCallback(h=>{const m=r.find(g=>g.projectId===h);return m?m.projectName:h},[r]),u=l.useCallback(h=>!s.projectId&&h===s.label,[s]);return n.jsx(jr,{id:t,collapsible:"none",variant:"inset",className:f("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(kr,{children:[n.jsxs(ln,{children:[n.jsx(cn,{className:"tw-text-sm",children:a}),n.jsx(dn,{children:n.jsx(_r,{children:Object.entries(e).map(([h,m])=>n.jsx(Cr,{children:n.jsx(Er,{onClick:()=>d(h),isActive:u(h),children:n.jsx("span",{className:"tw-pl-3",children:m})})},h))})})]}),n.jsxs(ln,{children:[n.jsx(cn,{className:"tw-text-sm",children:i}),n.jsx(dn,{className:"tw-pl-3",children:n.jsx(rn,{buttonVariant:"ghost",buttonClassName:f("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentClassName:"tw-z-[400]",options:r.flatMap(h=>h.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:h=>{const m=p(h);d(m,h)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const Nn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=st();return n.jsxs("div",{id:i,className:f("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:f("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(ye,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:a}),t&&n.jsxs($,{variant:"ghost",size:"icon",className:f("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Nn.displayName="SearchBar";function Yc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Nn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(yr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Ls,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(Nr,{className:"tw-min-w-[215px]",children:o})]})]})}const te="scrBook",Xc="scrRef",me="source",Wc="details",Zc="Scripture Reference",Jc="Scripture Book",Ps="Type",Qc="Details";function td(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:te,header:(t==null?void 0:t.scriptureReferenceColumnName)??Zc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?ot.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===te?y.formatScrRef(s.start):void 0},getGroupingValue:o=>ot.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>y.formatScrRef(o.start),id:Xc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:y.formatScrRef(s.start)},sortingFn:(o,s)=>y.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:me,header:r?(t==null?void 0:t.typeColumnName)??Ps:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Wc,header:(t==null?void 0:t.detailsColumnName)??Qc,cell:o=>o.getValue(),enableGrouping:!1}]}const ed=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||y.compareScrRefs(t.start,t.end)===0?`${y.scrRefToBBBCCCVVV(t.start)}+${e}`:`${y.scrRefToBBBCCCVVV(t.start)}+${e}-${y.scrRefToBBBCCCVVV(t.end)}+${r}`},to=t=>`${ed({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function nd({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[u,h]=l.useState([{id:te,desc:!1}]),[m,g]=l.useState({}),v=l.useMemo(()=>t.flatMap(E=>E.data.map(T=>({...T,source:E.source}))),[t]),b=l.useMemo(()=>td({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{d.includes(me)?h([{id:me,desc:!1},{id:te,desc:!1}]):h([{id:te,desc:!1}])},[d]);const j=ft.useReactTable({data:v,columns:b,state:{grouping:d,sorting:u,rowSelection:m},onGroupingChange:p,onSortingChange:h,onRowSelectionChange:g,getExpandedRowModel:ft.getExpandedRowModel(),getGroupedRowModel:ft.getGroupedRowModel(),getCoreRowModel:ft.getCoreRowModel(),getSortedRowModel:ft.getSortedRowModel(),getRowId:to,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const E=j.getSelectedRowModel().rowsById,T=Object.keys(E);if(T.length===1){const V=v.find(z=>to(z)===T[0])||void 0;V&&c(V)}}},[m,v,c,j]);const N=s??Jc,C=a??Ps,_=[{label:"No Grouping",value:[]},{label:`Group by ${N}`,value:[te]},{label:`Group by ${C}`,value:[me]},{label:`Group by ${N} and ${C}`,value:[te,me]},{label:`Group by ${C} and ${N}`,value:[me,te]}],B=E=>{p(JSON.parse(E))},F=(E,T)=>{!E.getIsGrouped()&&!E.getIsSelected()&&E.getToggleSelectedHandler()(T)},R=(E,T)=>E.getIsGrouped()?"":f("banded-row",T%2===0?"even":"odd"),P=(E,T,V)=>{if(!((E==null?void 0:E.length)===0||T.depth<V.column.getGroupedIndex())){if(T.getIsGrouped())switch(T.depth){case 1:return"tw-ps-4";default:return}switch(T.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(xe,{value:JSON.stringify(d),onValueChange:E=>{B(E)},children:[n.jsx(se,{className:"tw-mb-1 tw-mt-2",children:n.jsx(be,{})}),n.jsx(ae,{position:"item-aligned",children:n.jsx(rs,{children:_.map(E=>n.jsx(jt,{value:JSON.stringify(E.value),children:E.label},E.label))})})]}),n.jsxs(Ke,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(qe,{children:j.getHeaderGroups().map(E=>n.jsx(Ht,{children:E.headers.filter(T=>T.column.columnDef.header).map(T=>n.jsx(Re,{colSpan:T.colSpan,className:"top-0 tw-sticky",children:T.isPlaceholder?void 0:n.jsxs("div",{children:[T.column.getCanGroup()?n.jsx($,{variant:"ghost",title:`Toggle grouping by ${T.column.columnDef.header}`,onClick:T.column.getToggleGroupingHandler(),type:"button",children:T.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",ft.flexRender(T.column.columnDef.header,T.getContext())]})},T.id))},E.id))}),n.jsx(He,{children:j.getRowModel().rows.map((E,T)=>{const V=st();return n.jsx(Ht,{"data-state":E.getIsSelected()?"selected":"",className:f(R(E,T)),onClick:z=>F(E,z),children:E.getVisibleCells().map(z=>{if(!(z.getIsPlaceholder()||z.column.columnDef.enableGrouping&&!z.getIsGrouped()&&(z.column.columnDef.id!==me||!r)))return n.jsx(ne,{className:f(z.column.columnDef.id,"tw-p-[1px]",P(d,E,z)),children:z.getIsGrouped()?n.jsxs($,{variant:"link",onClick:E.getToggleExpandedHandler(),type:"button",children:[E.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!E.getIsExpanded()&&(V==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",ft.flexRender(z.column.columnDef.cell,z.getContext())," (",E.subRows.length,")"]}):ft.flexRender(z.column.columnDef.cell,z.getContext())},z.id)})},E.id)})})]})]})}const Sr=(t,e)=>t.filter(r=>{try{return y.getSectionForBook(r)===e}catch{return!1}}),$s=(t,e,r)=>Sr(t,e).every(o=>r.includes(o));function rd({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=Sr(e,t).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx($,{variant:"outline",size:"sm",onClick:()=>o(t),className:f($s(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:Qa(t,i,c,w,d)})}const eo=5,On=6;function od({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],u=o["%webView_book_selector_more%"],{otLong:h,ntLong:m,dcLong:g,extraLong:v}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[b,j]=l.useState(!1),[N,C]=l.useState(""),_=l.useRef(void 0),B=l.useRef(!1);if(t.length!==ot.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const F=l.useMemo(()=>ot.Canon.allBookIds.filter((A,K)=>t[K]==="1"&&!ot.Canon.isObsolete(ot.Canon.bookIdToNumber(A))),[t]),R=l.useMemo(()=>{if(!N.trim()){const D={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return F.forEach(H=>{const yt=y.getSectionForBook(H);D[yt].push(H)}),D}const A=F.filter(D=>Jn(D,N,s)),K={[y.Section.OT]:[],[y.Section.NT]:[],[y.Section.DC]:[],[y.Section.Extra]:[]};return A.forEach(D=>{const H=y.getSectionForBook(D);K[H].push(D)}),K},[F,N,s]),P=l.useCallback((A,K=!1)=>{if(!K||!_.current){r(e.includes(A)?e.filter(lt=>lt!==A):[...e,A]),_.current=A;return}const D=F.findIndex(lt=>lt===_.current),H=F.findIndex(lt=>lt===A);if(D===-1||H===-1)return;const[yt,Ot]=[Math.min(D,H),Math.max(D,H)],At=F.slice(yt,Ot+1).map(lt=>lt);r(e.includes(A)?e.filter(lt=>!At.includes(lt)):[...new Set([...e,...At])])},[e,r,F]),E=A=>{P(A,B.current),B.current=!1},T=(A,K)=>{A.preventDefault(),P(K,A.shiftKey)},V=l.useCallback(A=>{const K=Sr(F,A).map(D=>D);r($s(F,A,e)?e.filter(D=>!K.includes(D)):[...new Set([...e,...K])])},[e,r,F]),z=()=>{r(F.map(A=>A))},O=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(y.Section).map(A=>n.jsx(rd,{section:A,availableBookIds:F,selectedBookIds:e,onToggle:V,localizedStrings:o},A))}),n.jsxs(It,{open:b,onOpenChange:A=>{j(A),A||C("")},children:[n.jsx(Zt,{asChild:!0,children:n.jsxs($,{variant:"outline",role:"combobox","aria-expanded":b,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:i,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(_t,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Vt,{shouldFilter:!1,onKeyDown:A=>{A.key==="Enter"&&(B.current=A.shiftKey)},children:[n.jsx(le,{placeholder:c,value:N,onValueChange:C}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx($,{variant:"ghost",size:"sm",onClick:z,children:w}),n.jsx($,{variant:"ghost",size:"sm",onClick:O,children:d})]}),n.jsxs(zt,{children:[n.jsx(ve,{children:p}),Object.values(y.Section).map((A,K)=>{const D=R[A];if(D.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Mt,{heading:fo(A,h,m,g,v),children:D.map(H=>n.jsx(go,{bookId:H,isSelected:e.includes(H),onSelect:()=>E(H),onMouseDown:yt=>T(yt,H),section:y.getSectionForBook(H),showCheck:!0,localizedBookNames:s,commandValue:zn(H,s),className:"tw-flex tw-items-center"},H))}),K<Object.values(y.Section).length-1&&n.jsx(uo,{})]},A)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===On?On:eo).map(A=>n.jsx(he,{className:"hover:tw-bg-secondary",variant:"secondary",children:ke(A,s)},A)),e.length>On&&n.jsx(he,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-eo} ${u}`})]})]})}const sd=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),pe=(t,e)=>t[e]??e;function ad({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w}){const d=pe(i,"%webView_scope_selector_selected_text%"),p=pe(i,"%webView_scope_selector_current_verse%"),u=pe(i,"%webView_scope_selector_current_chapter%"),h=pe(i,"%webView_scope_selector_current_book%"),m=pe(i,"%webView_scope_selector_choose_books%"),g=pe(i,"%webView_scope_selector_scope%"),v=pe(i,"%webView_scope_selector_select_books%"),b=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:u,id:"scope-chapter"},{value:"book",label:h,id:"scope-book"},{value:"selectedBooks",label:m,id:"scope-selected"}],j=e?b.filter(N=>e.includes(N.value)):b;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(at,{children:g}),n.jsx(fn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:j.map(({value:N,label:C,id:_})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ze,{className:"tw-me-2",value:N,id:_}),n.jsx(at,{htmlFor:_,children:C})]},_))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(at,{children:v}),n.jsx(od,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const An={[y.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[y.getLocalizeKeyForScrollGroupId(0)]:"A",[y.getLocalizeKeyForScrollGroupId(1)]:"B",[y.getLocalizeKeyForScrollGroupId(2)]:"C",[y.getLocalizeKeyForScrollGroupId(3)]:"D",[y.getLocalizeKeyForScrollGroupId(4)]:"E",[y.getLocalizeKeyForScrollGroupId(5)]:"F",[y.getLocalizeKeyForScrollGroupId(6)]:"G",[y.getLocalizeKeyForScrollGroupId(7)]:"H",[y.getLocalizeKeyForScrollGroupId(8)]:"I",[y.getLocalizeKeyForScrollGroupId(9)]:"J",[y.getLocalizeKeyForScrollGroupId(10)]:"K",[y.getLocalizeKeyForScrollGroupId(11)]:"L",[y.getLocalizeKeyForScrollGroupId(12)]:"M",[y.getLocalizeKeyForScrollGroupId(13)]:"N",[y.getLocalizeKeyForScrollGroupId(14)]:"O",[y.getLocalizeKeyForScrollGroupId(15)]:"P",[y.getLocalizeKeyForScrollGroupId(16)]:"Q",[y.getLocalizeKeyForScrollGroupId(17)]:"R",[y.getLocalizeKeyForScrollGroupId(18)]:"S",[y.getLocalizeKeyForScrollGroupId(19)]:"T",[y.getLocalizeKeyForScrollGroupId(20)]:"U",[y.getLocalizeKeyForScrollGroupId(21)]:"V",[y.getLocalizeKeyForScrollGroupId(22)]:"W",[y.getLocalizeKeyForScrollGroupId(23)]:"X",[y.getLocalizeKeyForScrollGroupId(24)]:"Y",[y.getLocalizeKeyForScrollGroupId(25)]:"Z"};function id({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...An,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in An?An[d]:p]))},w=st();return n.jsxs(xe,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(se,{size:s,className:f("pr-twp tw-w-auto",a),children:n.jsx(be,{placeholder:c[y.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(ae,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:Ie},children:t.map(d=>n.jsx(jt,{value:`${d}`,children:c[y.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function ld({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function cd({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function dd({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(ge,{}):""]})}function Fs(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function wn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:f("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Vs=(t,e,r,o)=>r?Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:"command"in c?n.jsxs(Se,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(wn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(wn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(fr,{children:[n.jsx(bn,{children:c.label}),n.jsx(mr,{children:n.jsx(vn,{children:Vs(t,e,Fs(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(kt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function pn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(Qt,{variant:a,children:[n.jsx(ce,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx($,{variant:i,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Yt,{align:"start",style:{zIndex:Ie},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(ur,{children:n.jsx(Nt,{children:Vs(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(de,{})]},w))})]})}const zs=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function wd({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(zs,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(pn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[o&&n.jsx(pn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function pd({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(zs,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(pn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Rr=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(vt.Root,{orientation:"vertical",ref:r,className:f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Rr.displayName=vt.List.displayName;const Tr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.List,{ref:r,className:f("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Tr.displayName=vt.List.displayName;const Bs=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Trigger,{ref:r,...e,className:f("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),Mr=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Content,{ref:r,className:f("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Mr.displayName=vt.Content.displayName;function ud({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Nn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Rr,{children:[n.jsx(Tr,{children:t.map(c=>n.jsx(Bs,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx(Mr,{value:c.value,children:c.content},c.key))]})]})}function md({...t}){return n.jsx(tt.Menu,{...t})}function fd({...t}){return n.jsx(tt.Sub,{"data-slot":"menubar-sub",...t})}const Gs=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(pr.Provider,{value:s,children:n.jsx(tt.Root,{ref:o,className:f("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Gs.displayName=tt.Root.displayName;const Ks=l.forwardRef(({className:t,...e},r)=>{const o=Bt();return n.jsx(tt.Trigger,{ref:r,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",Jt({variant:o.variant,className:t})),...e})});Ks.displayName=tt.Trigger.displayName;const qs=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=Bt();return n.jsxs(tt.SubTrigger,{ref:s,className:f("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Jt({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});qs.displayName=tt.SubTrigger.displayName;const Hs=l.forwardRef(({className:t,...e},r)=>{const o=Bt();return n.jsx(tt.SubContent,{ref:r,className:f("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});Hs.displayName=tt.SubContent.displayName;const Us=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=Bt();return n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:f("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...s})})});Us.displayName=tt.Content.displayName;const Ys=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=Bt();return n.jsx(tt.Item,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Jt({variant:s.variant,className:t}),t),...r})});Ys.displayName=tt.Item.displayName;const hd=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=Bt();return n.jsxs(tt.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});hd.displayName=tt.CheckboxItem.displayName;const gd=l.forwardRef(({className:t,children:e,...r},o)=>{const s=Bt();return n.jsxs(tt.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Jt({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});gd.displayName=tt.RadioItem.displayName;const xd=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));xd.displayName=tt.Label.displayName;const Xs=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Xs.displayName=tt.Separator.displayName;const Le=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Ws=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=e.filter(d=>d.group===a).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(St,{children:[n.jsx(Rt,{asChild:!0,children:"command"in d?n.jsxs(Ys,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(wn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(wn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(fd,{children:[n.jsx(qs,{children:d.label}),n.jsx(Hs,{children:Ws(t,e,Fs(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(kt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(n.jsx(Xs,{},`separator-${a}`)),w})};function bd({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if(qa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,u)=>{var g,v,b,j;p.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},m={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(u.hotkey){case"alt":Le(a,[h]);break;case"alt+p":(g=a.current)==null||g.focus(),Le(a,[h,m]);break;case"alt+l":(v=i.current)==null||v.focus(),Le(i,[h,m]);break;case"alt+n":(b=c.current)==null||b.focus(),Le(c,[h,m]);break;case"alt+h":(j=w.current)==null||j.focus(),Le(w,[h,m]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(m=>{m.forEach(g=>{if(g.attributeName==="data-state"&&g.target instanceof HTMLElement){const v=g.target.getAttribute("data-state");r(v==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(m=>{p.observe(m,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Gs,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,u])=>typeof p=="boolean"||typeof u=="boolean"?0:p.order-u.order).map(([p,u])=>n.jsxs(md,{children:[n.jsx(Ks,{ref:d(p),children:typeof u=="object"&&"label"in u&&u.label}),n.jsx(Us,{style:{zIndex:Ie},children:n.jsx(Nt,{children:Ws(t.groups,t.items,p,e)})})]},p))})}function vd(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function yd({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:f("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&n.jsx(bd,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const jd=(t,e)=>t[e]??e;function Nd({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=jd(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,u]=l.useState(!1),h=g=>{s&&s(g),o&&o([g,...r.filter(v=>v!==g)]),a&&r.find(v=>v===g)&&a([...r.filter(v=>v!==g)]),u(!1)},m=(g,v)=>{var j,N,C,_,B,F;const b=v!==g?((N=(j=t[g])==null?void 0:j.uiNames)==null?void 0:N[v])??((_=(C=t[g])==null?void 0:C.uiNames)==null?void 0:_.en):void 0;return b?`${(B=t[g])==null?void 0:B.autonym} (${b})`:(F=t[g])==null?void 0:F.autonym};return n.jsxs("div",{id:w,className:f("pr-twp tw-max-w-sm",c),children:[n.jsxs(xe,{name:"uiLanguage",value:e,onValueChange:h,open:p,onOpenChange:g=>u(g),children:[n.jsx(se,{children:n.jsx(be,{})}),n.jsx(ae,{style:{zIndex:Ie},children:Object.keys(t).map(g=>n.jsx(jt,{value:g,children:m(g,e)},g))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(at,{className:"tw-font-normal tw-text-muted-foreground",children:y.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(g=>m(g,e)).join(", "):t.en.autonym})})})]})}function kd({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(at,{children:e(t)}):r?n.jsx(at,{children:r(t)}):n.jsx(at,{children:t})}function _d({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(jn,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(kd,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function Cd({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,dropdownContent:c,additionalSelectedContent:w,accentColor:d}){const p=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:f("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&c&&n.jsxs(Qt,{children:[n.jsx(ce,{className:f(d&&"tw-me-1"),asChild:!0,children:n.jsx($,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Yt,{align:"end",children:c})]})]}),e&&w&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:w})]}),d&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},t)}const Zs=l.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:f("tw-animate-spin",t),...e,ref:r}));Zs.displayName="Spinner";function Ed({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:u,onFocus:h,onBlur:m}){return n.jsxs("div",{className:f("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(at,{htmlFor:t,className:f({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(ye,{id:t,disabled:e,placeholder:i,required:c,className:f(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:u,onFocus:h,onBlur:m}),n.jsx("p",{className:f({"tw-hidden":!s}),children:s})]})}const Sd=ie.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Js=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:f("pr-twp",Sd({variant:e}),t),...r}));Js.displayName="Alert";const Qs=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));Qs.displayName="AlertTitle";const ta=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:f("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));ta.displayName="AlertDescription";const Rd=et.Root,Td=et.Trigger,Md=et.Group,Dd=et.Portal,Id=et.Sub,Od=et.RadioGroup,ea=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(et.SubTrigger,{ref:s,className:f("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ea.displayName=et.SubTrigger.displayName;const na=l.forwardRef(({className:t,...e},r)=>n.jsx(et.SubContent,{ref:r,className:f("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));na.displayName=et.SubContent.displayName;const ra=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Portal,{children:n.jsx(et.Content,{ref:r,className:f("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));ra.displayName=et.Content.displayName;const oa=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Item,{ref:o,className:f("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));oa.displayName=et.Item.displayName;const sa=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(et.CheckboxItem,{ref:s,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));sa.displayName=et.CheckboxItem.displayName;const aa=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(et.RadioItem,{ref:o,className:f("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(et.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));aa.displayName=et.RadioItem.displayName;const ia=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(et.Label,{ref:o,className:f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));ia.displayName=et.Label.displayName;const la=l.forwardRef(({className:t,...e},r)=>n.jsx(et.Separator,{ref:r,className:f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));la.displayName=et.Separator.displayName;function ca({className:t,...e}){return n.jsx("span",{className:f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ca.displayName="ContextMenuShortcut";const da=l.createContext({direction:"bottom"});function wa({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(da.Provider,{value:o,children:n.jsx(Ft.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}wa.displayName="Drawer";const Ad=Ft.Drawer.Trigger,pa=Ft.Drawer.Portal,Ld=Ft.Drawer.Close,Dr=l.forwardRef(({className:t,...e},r)=>n.jsx(Ft.Drawer.Overlay,{ref:r,className:f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Dr.displayName=Ft.Drawer.Overlay.displayName;const ua=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(da),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(pa,{children:[n.jsx(Dr,{}),n.jsxs(Ft.Drawer.Content,{ref:s,className:f("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});ua.displayName="DrawerContent";function ma({className:t,...e}){return n.jsx("div",{className:f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}ma.displayName="DrawerHeader";function fa({className:t,...e}){return n.jsx("div",{className:f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}fa.displayName="DrawerFooter";const ha=l.forwardRef(({className:t,...e},r)=>n.jsx(Ft.Drawer.Title,{ref:r,className:f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));ha.displayName=Ft.Drawer.Title.displayName;const ga=l.forwardRef(({className:t,...e},r)=>n.jsx(Ft.Drawer.Description,{ref:r,className:f("tw-text-sm tw-text-muted-foreground",t),...e}));ga.displayName=Ft.Drawer.Description.displayName;const xa=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Fn.Root,{ref:o,className:f("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Fn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));xa.displayName=Fn.Root.displayName;function Pd({className:t,...e}){return n.jsx(qn.PanelGroup,{className:f("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const $d=qn.Panel;function Fd({withHandle:t,className:e,...r}){return n.jsx(qn.PanelResizeHandle,{className:f("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Vd({...t}){return n.jsx(so.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const ba=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsxs(Pe.Root,{ref:r,className:f("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Pe.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Pe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Pe.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});ba.displayName=Pe.Root.displayName;const va=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(Vn.Root,{className:f("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(Vn.Thumb,{className:f("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});va.displayName=Vn.Root.displayName;const zd=vt.Root,ya=l.forwardRef(({className:t,...e},r)=>{const o=st();return n.jsx(vt.List,{ref:r,className:f("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});ya.displayName=vt.List.displayName;const ja=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Trigger,{ref:r,className:f("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));ja.displayName=vt.Trigger.displayName;const Na=l.forwardRef(({className:t,...e},r)=>n.jsx(vt.Content,{ref:r,className:f("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Na.displayName=vt.Content.displayName;const ka=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:f("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));ka.displayName="Textarea";const Bd=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Gd(t){return{preserveValue:!0,...t}}const _a=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=Gd(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(i(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[t]),[a,c]},Ln=()=>!1,Kd=(t,e)=>{const[r]=_a(l.useCallback(async()=>{if(!t)return Ln;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Ln,{preserveValue:!1});l.useEffect(()=>()=>{r!==Ln&&r()},[r])};function qd(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>so.toast});exports.Alert=Js;exports.AlertDescription=ta;exports.AlertTitle=Qs;exports.Avatar=dr;exports.AvatarFallback=wr;exports.AvatarImage=ns;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=si;exports.BOOK_SELECTOR_STRING_KEYS=li;exports.Badge=he;exports.BookChapterControl=oi;exports.BookSelectionMode=jo;exports.BookSelector=ci;exports.Button=$;exports.COMMENT_EDITOR_STRING_KEYS=jl;exports.COMMENT_LIST_STRING_KEYS=Nl;exports.Card=lr;exports.CardContent=cr;exports.CardDescription=ts;exports.CardFooter=es;exports.CardHeader=Jo;exports.CardTitle=Qo;exports.ChapterRangeSelector=yo;exports.Checkbox=jn;exports.Checklist=_d;exports.ComboBox=rn;exports.Command=Vt;exports.CommandEmpty=ve;exports.CommandGroup=Mt;exports.CommandInput=le;exports.CommandItem=Dt;exports.CommandList=zt;exports.CommentEditor=yl;exports.CommentList=El;exports.ContextMenu=Rd;exports.ContextMenuCheckboxItem=sa;exports.ContextMenuContent=ra;exports.ContextMenuGroup=Md;exports.ContextMenuItem=oa;exports.ContextMenuLabel=ia;exports.ContextMenuPortal=Dd;exports.ContextMenuRadioGroup=Od;exports.ContextMenuRadioItem=aa;exports.ContextMenuSeparator=la;exports.ContextMenuShortcut=ca;exports.ContextMenuSub=Id;exports.ContextMenuSubContent=na;exports.ContextMenuSubTrigger=ea;exports.ContextMenuTrigger=Td;exports.DataTable=cs;exports.Drawer=wa;exports.DrawerClose=Ld;exports.DrawerContent=ua;exports.DrawerDescription=ga;exports.DrawerFooter=fa;exports.DrawerHeader=ma;exports.DrawerOverlay=Dr;exports.DrawerPortal=pa;exports.DrawerTitle=ha;exports.DrawerTrigger=Ad;exports.DropdownMenu=Qt;exports.DropdownMenuCheckboxItem=$t;exports.DropdownMenuContent=Yt;exports.DropdownMenuGroup=ur;exports.DropdownMenuItem=Se;exports.DropdownMenuItemType=ps;exports.DropdownMenuLabel=Oe;exports.DropdownMenuPortal=mr;exports.DropdownMenuRadioGroup=hr;exports.DropdownMenuRadioItem=yn;exports.DropdownMenuSeparator=de;exports.DropdownMenuShortcut=gr;exports.DropdownMenuSub=fr;exports.DropdownMenuSubContent=vn;exports.DropdownMenuSubTrigger=bn;exports.DropdownMenuTrigger=ce;exports.ERROR_DUMP_STRING_KEYS=ds;exports.ERROR_POPOVER_STRING_KEYS=Al;exports.EditorKeyboardShortcuts=ms;exports.ErrorDump=ws;exports.ErrorPopover=Ll;exports.FOOTNOTE_EDITOR_STRING_KEYS=Ql;exports.Filter=zl;exports.FilterDropdown=Pl;exports.Footer=Vl;exports.FootnoteEditor=Jl;exports.FootnoteItem=xs;exports.FootnoteList=nc;exports.INVENTORY_STRING_KEYS=uc;exports.Input=ye;exports.Inventory=hc;exports.Label=at;exports.MARKER_MENU_STRING_KEYS=fs;exports.MarkdownRenderer=Ol;exports.MarkerMenu=hs;exports.MoreInfo=$l;exports.MultiSelectComboBox=us;exports.NavigationContentSearch=ud;exports.OverlayCommandPalette=Kc;exports.OverlayContextMenu=vc;exports.OverlayModalDialog=Tc;exports.OverlayPopover=Vc;exports.Popover=It;exports.PopoverAnchor=mn;exports.PopoverContent=_t;exports.PopoverTrigger=Zt;exports.Progress=xa;exports.RadioGroup=fn;exports.RadioGroupItem=ze;exports.RecentSearches=vo;exports.ResizableHandle=Fd;exports.ResizablePanel=$d;exports.ResizablePanelGroup=Pd;exports.ResultsCard=Cd;exports.SCOPE_SELECTOR_STRING_KEYS=sd;exports.ScopeSelector=ad;exports.ScriptureResultsViewer=nd;exports.ScrollGroupSelector=id;exports.SearchBar=Nn;exports.Select=xe;exports.SelectContent=ae;exports.SelectGroup=rs;exports.SelectItem=jt;exports.SelectLabel=ss;exports.SelectScrollDownButton=br;exports.SelectScrollUpButton=xr;exports.SelectSeparator=as;exports.SelectTrigger=se;exports.SelectValue=be;exports.Separator=ge;exports.SettingsList=ld;exports.SettingsListHeader=dd;exports.SettingsListItem=cd;exports.SettingsSidebar=Ls;exports.SettingsSidebarContentSearch=Yc;exports.Sidebar=jr;exports.SidebarContent=kr;exports.SidebarFooter=Es;exports.SidebarGroup=ln;exports.SidebarGroupAction=Rs;exports.SidebarGroupContent=dn;exports.SidebarGroupLabel=cn;exports.SidebarHeader=Cs;exports.SidebarInput=_s;exports.SidebarInset=Nr;exports.SidebarMenu=_r;exports.SidebarMenuAction=Ts;exports.SidebarMenuBadge=Ms;exports.SidebarMenuButton=Er;exports.SidebarMenuItem=Cr;exports.SidebarMenuSkeleton=Ds;exports.SidebarMenuSub=Is;exports.SidebarMenuSubButton=As;exports.SidebarMenuSubItem=Os;exports.SidebarProvider=yr;exports.SidebarRail=ks;exports.SidebarSeparator=Ss;exports.SidebarTrigger=Ns;exports.Skeleton=an;exports.Slider=ba;exports.Sonner=Vd;exports.Spinner=Zs;exports.Switch=va;exports.TabDropdownMenu=pn;exports.TabFloatingMenu=pd;exports.TabToolbar=wd;exports.Table=Ke;exports.TableBody=He;exports.TableCaption=ls;exports.TableCell=ne;exports.TableFooter=is;exports.TableHead=Re;exports.TableHeader=qe;exports.TableRow=Ht;exports.Tabs=zd;exports.TabsContent=Na;exports.TabsList=ya;exports.TabsTrigger=ja;exports.TextField=Ed;exports.Textarea=ka;exports.ToggleGroup=xn;exports.ToggleGroupItem=_e;exports.Toolbar=yd;exports.Tooltip=St;exports.TooltipContent=kt;exports.TooltipProvider=Nt;exports.TooltipTrigger=Rt;exports.UiLanguageSelector=Nd;exports.VerticalTabs=Rr;exports.VerticalTabsContent=Mr;exports.VerticalTabsList=Tr;exports.VerticalTabsTrigger=Bs;exports.Z_INDEX_ABOVE_DOCK=Ie;exports.Z_INDEX_FOOTNOTE_EDITOR=tr;exports.Z_INDEX_MODAL=bo;exports.Z_INDEX_MODAL_BACKDROP=xo;exports.Z_INDEX_OVERLAY=Ce;exports.badgeVariants=Zo;exports.buttonVariants=Qn;exports.cn=f;exports.getBookIdFromUSFM=pc;exports.getInventoryHeader=Ue;exports.getLinesFromUSFM=dc;exports.getNumberFromUSFM=wc;exports.getStatusForItem=bs;exports.getToolbarOSReservedSpaceClassName=vd;exports.inventoryCountColumn=lc;exports.inventoryItemColumn=ac;exports.inventoryStatusColumn=cc;exports.selectTriggerVariants=os;exports.useEvent=Bd;exports.useEventAsync=Kd;exports.useListbox=Wo;exports.usePromise=_a;exports.useRecentSearches=ti;exports.useSidebar=Xe;exports.useStylesheet=qd;function Hd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Hd(`*, ::before, ::after {
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
.tw-z-\\[400\\] {
  z-index: 400;
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
.tw-bg-black\\/40 {
  background-color: rgb(0 0 0 / 0.4);
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
.tw-fill-popover {
  fill: hsl(var(--popover));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-stroke-border {
  stroke: hsl(var(--border));
}
.tw-stroke-1 {
  stroke-width: 1;
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
.tw-px-1\\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
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
.tw-pt-\\[20vh\\] {
  padding-top: 20vh;
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
.\\[transition-duration\\:0ms\\] {
  transition-duration: 0ms;
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
.\\[\\&\\>div\\:first-child\\>dt\\]\\:tw-mt-0>div:first-child>dt {
  margin-top: 0px;
}
.\\[\\&\\>div\\>dd\\]\\:tw-mb-1>div>dd {
  margin-bottom: 0.25rem;
}
.\\[\\&\\>div\\>dd\\]\\:tw-ml-0>div>dd {
  margin-left: 0px;
}
.\\[\\&\\>div\\>dt\\]\\:tw-mt-2>div>dt {
  margin-top: 0.5rem;
}
.\\[\\&\\>div\\>dt\\]\\:tw-font-semibold>div>dt {
  font-weight: 600;
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
.\\[\\&\\>li\\]\\:tw-mb-1>li {
  margin-bottom: 0.25rem;
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
