"use strict";var Fa=Object.defineProperty;var Va=(t,e,r)=>e in t?Fa(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var gt=(t,e,r)=>Va(t,typeof e!="symbol"?e+"":e,r);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),l=require("react"),Nt=require("cmdk"),k=require("lucide-react"),za=require("clsx"),Ba=require("tailwind-merge"),Ga=require("@radix-ui/react-dialog"),lt=require("@sillsdev/scripture"),j=require("platform-bible-utils"),Pe=require("@radix-ui/react-slot"),se=require("class-variance-authority"),Ka=require("@radix-ui/react-popover"),qa=require("@radix-ui/react-label"),Ua=require("@radix-ui/react-radio-group"),g=require("lexical"),co=require("@radix-ui/react-tooltip"),Bn=require("@lexical/rich-text"),Vr=require("react-dom"),Ha=require("@lexical/table"),Ya=require("@radix-ui/react-toggle-group"),Xa=require("@radix-ui/react-toggle"),wo=require("@lexical/headless"),Wa=require("@radix-ui/react-separator"),Za=require("@radix-ui/react-avatar"),po=require("@radix-ui/react-dropdown-menu"),bt=require("@tanstack/react-table"),Ja=require("@radix-ui/react-select"),Qa=require("markdown-to-jsx"),It=require("@eten-tech-foundation/platform-editor"),ti=require("@radix-ui/react-checkbox"),ei=require("@radix-ui/react-tabs"),ni=require("@radix-ui/react-menubar"),ri=require("react-hotkeys-hook"),oi=require("@radix-ui/react-context-menu"),$t=require("vaul"),si=require("@radix-ui/react-progress"),ai=require("react-resizable-panels"),uo=require("sonner"),ii=require("@radix-ui/react-slider"),li=require("@radix-ui/react-switch");function pt(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const St=pt(Ga),Ie=pt(Ka),mo=pt(qa),Ye=pt(Ua),ve=pt(co),Nn=pt(Ya),fo=pt(Xa),ho=pt(Wa),Le=pt(Za),J=pt(po),st=pt(Ja),Gn=pt(ti),kt=pt(ei),Q=pt(ni),tt=pt(oi),Kn=pt(si),Wn=pt(ai),Ue=pt(ii),qn=pt(li),ci=Ba.extendTailwindMerge({prefix:"tw-"});function h(...t){return ci(za.clsx(t))}const ke=250,Zn=300,go=400,xo=450,bo=500,di="layoutDirection";function ct(){const t=localStorage.getItem(di);return t==="rtl"?t:"ltr"}const vo=St.Root,wi=St.Trigger,yo=St.Portal,pi=St.Close,Jn=l.forwardRef(({className:t,style:e,...r},o)=>n.jsx(St.Overlay,{ref:o,className:h("tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),style:{zIndex:xo,...e},...r}));Jn.displayName=St.Overlay.displayName;const Qn=l.forwardRef(({className:t,children:e,overlayClassName:r,style:o,...s},a)=>{const i=ct();return n.jsxs(yo,{children:[n.jsx(Jn,{className:r}),n.jsxs(St.Content,{ref:a,className:h("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),style:{zIndex:bo,...o},...s,dir:i,children:[e,n.jsxs(St.Close,{className:h("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":i==="ltr"},{"tw-left-4":i==="rtl"}),children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Qn.displayName=St.Content.displayName;function tr({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}tr.displayName="DialogHeader";function jo({className:t,...e}){return n.jsx("div",{className:h("tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",t),...e})}jo.displayName="DialogFooter";const er=l.forwardRef(({className:t,...e},r)=>n.jsx(St.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));er.displayName=St.Title.displayName;const No=l.forwardRef(({className:t,...e},r)=>n.jsx(St.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));No.displayName=St.Description.displayName;const Zt=l.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command,{ref:r,className:h("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Zt.displayName=Nt.Command.displayName;const _e=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:o,children:[n.jsx(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(Nt.Command.Input,{ref:r,className:h("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});_e.displayName=Nt.Command.Input.displayName;const Jt=l.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.List,{ref:r,className:h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Jt.displayName=Nt.Command.List.displayName;const $e=l.forwardRef((t,e)=>n.jsx(Nt.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));$e.displayName=Nt.Command.Empty.displayName;const Lt=l.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Group,{ref:r,className:h("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Lt.displayName=Nt.Command.Group.displayName;const nr=l.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Separator,{ref:r,className:h("tw--mx-1 tw-h-px tw-bg-border",t),...e}));nr.displayName=Nt.Command.Separator.displayName;const Ft=l.forwardRef(({className:t,...e},r)=>n.jsx(Nt.Command.Item,{ref:r,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));Ft.displayName=Nt.Command.Item.displayName;function ko({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ko.displayName="CommandShortcut";const _o=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"Old Testament";case j.Section.NT:return r??"New Testament";case j.Section.DC:return o??"Deuterocanon";case j.Section.Extra:return s??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},ui=(t,e,r,o,s)=>{switch(t){case j.Section.OT:return e??"OT";case j.Section.NT:return r??"NT";case j.Section.DC:return o??"DC";case j.Section.Extra:return s??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Te(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??lt.Canon.bookIdToEnglishName(t)}function rr(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Co=lt.Canon.allBookIds.filter(t=>!lt.Canon.isObsolete(lt.Canon.bookIdToNumber(t))),be=Object.fromEntries(Co.map(t=>[t,lt.Canon.bookIdToEnglishName(t)]));function or(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const s=lt.Canon.bookIdToEnglishName(t),a=r==null?void 0:r.get(t);return!!(j.includes(s.toLowerCase(),o)||j.includes(t.toLowerCase(),o)||(a?j.includes(a.localizedName.toLowerCase(),o)||j.includes(a.localizedId.toLowerCase(),o):!1))}const Eo=l.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:s,className:a,showCheck:i=!1,localizedBookNames:c,commandValue:w},d)=>{const p=l.useRef(!1),m=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},f=b=>{p.current=!0,o?o(b):r==null||r(t)},u=l.useMemo(()=>Te(t,c),[t,c]),x=l.useMemo(()=>rr(t,c),[t,c]);return n.jsx("div",{className:h("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":s===j.Section.OT,"tw-border-s-purple-200":s===j.Section.NT,"tw-border-s-indigo-200":s===j.Section.DC,"tw-border-s-amber-200":s===j.Section.Extra}),children:n.jsxs(Ft,{ref:d,value:w||`${t} ${lt.Canon.bookIdToEnglishName(t)}`,onSelect:m,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${lt.Canon.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:a,children:[i&&n.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:u}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:x})]})})}),sr=se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),z=l.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...s},a)=>{const i=o?Pe.Slot:"button";return n.jsx(i,{className:h(sr({variant:e,size:r,className:t})),ref:a,...s})});z.displayName="Button";const Qt=Ie.Root,ae=Ie.Trigger,So=Ie.Anchor,Vt=l.forwardRef(({className:t,align:e="center",sideOffset:r=4,style:o,...s},a)=>{const i=ct();return n.jsx(Ie.Portal,{children:n.jsx(Ie.Content,{ref:a,align:e,sideOffset:r,className:h("pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),style:{zIndex:ke,...o},...s,dir:i})})});Vt.displayName=Ie.Content.displayName;function Un(t,e,r){return`${t} ${be[t]}${e?` ${rr(t,e)} ${Te(t,e)}`:""}${r?` ${r}`:""}`}function Ro({recentSearches:t,onSearchItemSelect:e,renderItem:r=p=>String(p),getItemKey:o=p=>String(p),ariaLabel:s="Show recent searches",groupHeading:a="Recent",id:i,classNameForItems:c,buttonClassName:w="tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",buttonVariant:d="ghost"}){const[p,m]=l.useState(!1);if(t.length===0)return;const f=u=>{e(u),m(!1)};return n.jsxs(Qt,{open:p,onOpenChange:m,children:[n.jsx(ae,{asChild:!0,children:n.jsx(z,{variant:d,size:"icon",className:w,"aria-label":s,children:n.jsx(k.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Vt,{id:i,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Zt,{children:n.jsx(Jt,{children:n.jsx(Lt,{heading:a,children:t.map(u=>n.jsxs(Ft,{onSelect:()=>f(u),className:h("tw-flex tw-items-center",c),children:[n.jsx(k.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(u)})]},o(u)))})})})})]})}function mi(t,e,r=(s,a)=>s===a,o=15){return s=>{const a=t.filter(c=>!r(c,s)),i=[s,...a.slice(0,o-1)];e(i)}}const Rn={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},fi=[Rn.BOOK_ONLY,Rn.BOOK_CHAPTER,Rn.BOOK_CHAPTER_VERSE];function zr(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function Ut(t){return j.getChaptersForBook(lt.Canon.bookIdToNumber(t))}function hi(t,e,r){if(!t.trim()||e.length===0)return;const o=fi.reduce((s,a)=>{if(s)return s;const i=a.exec(t.trim());if(i){const[c,w=void 0,d=void 0]=i.slice(1);let p;const m=e.filter(f=>or(f,c,r));if(m.length===1&&([p]=m),!p&&w){if(lt.Canon.isBookIdValid(c)){const f=c.toUpperCase();e.includes(f)&&(p=f)}if(!p&&r){const f=Array.from(r.entries()).find(([,u])=>u.localizedId.toLowerCase()===c.toLowerCase());f&&e.includes(f[0])&&([p]=f)}}if(!p&&w){const u=(x=>Object.keys(be).find(b=>be[b].toLowerCase()===x.toLowerCase()))(c);if(u&&e.includes(u)&&(p=u),!p&&r){const x=Array.from(r.entries()).find(([,b])=>b.localizedName.toLowerCase()===c.toLowerCase());x&&e.includes(x[0])&&([p]=x)}}if(p){let f=w?parseInt(w,10):void 0;f&&f>Ut(p)&&(f=Math.max(Ut(p),1));const u=d?parseInt(d,10):void 0;return{book:p,chapterNum:f,verseNum:u}}}},void 0);if(o)return o}function gi(t,e,r,o){const s=l.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const w=e.indexOf(t.book);if(w>0){const d=e[w-1],p=Math.max(Ut(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),a=l.useCallback(()=>{const w=Ut(t.book);if(t.chapterNum<w)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),i=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),c=l.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return l.useMemo(()=>[{onClick:s,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?k.ChevronsLeft:k.ChevronsRight},{onClick:i,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?k.ChevronLeft:k.ChevronRight},{onClick:c,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?k.ChevronRight:k.ChevronLeft},{onClick:a,disabled:e.length===0||(t.chapterNum===Ut(t.book)||Ut(t.book)<=0)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?k.ChevronsRight:k.ChevronsLeft}],[t,e,r,s,i,c,a])}function Br({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:s,className:a}){if(t)return n.jsx(Lt,{children:n.jsx("div",{className:h("tw-grid tw-grid-cols-6 tw-gap-1",a),children:Array.from({length:Ut(t)},(i,c)=>c+1).map(i=>n.jsx(Ft,{value:`${t} ${be[t]||""} ${i}`,onSelect:()=>r(i),ref:o(i),className:h("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&i===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(s==null?void 0:s(i))??!1}),children:i},i))})})}function xi({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:s,localizedStrings:a,recentSearches:i,onAddRecentSearch:c,id:w}){const d=ct(),[p,m]=l.useState(!1),[f,u]=l.useState(""),[x,b]=l.useState(""),[v,E]=l.useState("books"),[y,_]=l.useState(void 0),[N,F]=l.useState(!1),L=l.useRef(void 0),A=l.useRef(void 0),T=l.useRef(void 0),C=l.useRef(void 0),M=l.useRef({}),$=l.useCallback(D=>{e(D),c&&c(D)},[e,c]),V=l.useMemo(()=>o?o():Co,[o]),P=l.useMemo(()=>({[j.Section.OT]:V.filter(q=>lt.Canon.isBookOT(q)),[j.Section.NT]:V.filter(q=>lt.Canon.isBookNT(q)),[j.Section.DC]:V.filter(q=>lt.Canon.isBookDC(q)),[j.Section.Extra]:V.filter(q=>lt.Canon.extraBooks().includes(q))}),[V]),O=l.useMemo(()=>Object.values(P).flat(),[P]),G=l.useMemo(()=>{if(!x.trim())return P;const D={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return[j.Section.OT,j.Section.NT,j.Section.DC,j.Section.Extra].forEach(Y=>{D[Y]=P[Y].filter(X=>or(X,x,s))}),D},[P,x,s]),R=l.useMemo(()=>hi(x,O,s),[x,O,s]),U=l.useCallback(()=>{R&&($({book:R.book,chapterNum:R.chapterNum??1,verseNum:R.verseNum??1}),m(!1),b(""),u(""))},[$,R]),_t=l.useCallback(D=>{if(Ut(D)<=1){$({book:D,chapterNum:1,verseNum:1}),m(!1),b("");return}_(D),E("chapters")},[$]),Ot=l.useCallback(D=>{const q=v==="chapters"?y:R==null?void 0:R.book;q&&($({book:q,chapterNum:D,verseNum:1}),m(!1),E("books"),_(void 0),b(""))},[$,v,y,R]),At=l.useCallback(D=>{$(D),m(!1),b("")},[$]),ut=gi(t,O,d,e),dt=l.useCallback(()=>{E("books"),_(void 0),setTimeout(()=>{A.current&&A.current.focus()},0)},[]),B=l.useCallback(D=>{if(!D&&v==="chapters"){dt();return}m(D),D&&(E("books"),_(void 0),b(""))},[v,dt]),{otLong:nt,ntLong:mt,dcLong:at,extraLong:vt}={otLong:a==null?void 0:a["%scripture_section_ot_long%"],ntLong:a==null?void 0:a["%scripture_section_nt_long%"],dcLong:a==null?void 0:a["%scripture_section_dc_long%"],extraLong:a==null?void 0:a["%scripture_section_extra_long%"]},ee=l.useCallback(D=>_o(D,nt,mt,at,vt),[nt,mt,at,vt]),ft=l.useCallback(D=>R?!!R.chapterNum&&!D.toString().includes(R.chapterNum.toString()):!1,[R]),Mt=l.useMemo(()=>j.formatScrRef(t,s?Te(t.book,s):"English"),[t,s]),me=l.useCallback(D=>q=>{M.current[D]=q},[]),Bt=l.useCallback(D=>{(D.key==="Home"||D.key==="End")&&D.stopPropagation()},[]),ne=l.useCallback(D=>{if(D.ctrlKey)return;const{isLetter:q,isDigit:Y}=zr(D.key);if(v==="chapters"){if(D.key==="Backspace"){D.preventDefault(),D.stopPropagation(),dt();return}if(q||Y){if(D.preventDefault(),D.stopPropagation(),E("books"),_(void 0),Y&&y){const X=be[y];b(`${X} ${D.key}`)}else b(D.key);setTimeout(()=>{A.current&&A.current.focus()},0);return}}if((v==="chapters"||v==="books"&&R)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(D.key)){const X=v==="chapters"?y:R==null?void 0:R.book;if(!X)return;const it=(()=>{if(!f)return 1;const et=f.match(/(\d+)$/);return et?parseInt(et[1],10):0})(),Dt=Ut(X);if(!Dt)return;let I=it;const K=6;switch(D.key){case"ArrowLeft":it!==0&&(I=it>1?it-1:Dt);break;case"ArrowRight":it!==0&&(I=it<Dt?it+1:1);break;case"ArrowUp":I=it===0?Dt:Math.max(1,it-K);break;case"ArrowDown":I=it===0?1:Math.min(Dt,it+K);break;default:return}I!==it&&(D.preventDefault(),D.stopPropagation(),u(Un(X,s,I)),setTimeout(()=>{const et=M.current[I];et&&et.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[v,R,dt,y,f,s]),ze=l.useCallback(D=>{if(D.shiftKey||D.key==="Tab"||D.key===" ")return;const{isLetter:q,isDigit:Y}=zr(D.key);(q||Y)&&(D.preventDefault(),b(X=>X+D.key),A.current.focus(),F(!1))},[]);return l.useLayoutEffect(()=>{const D=setTimeout(()=>{if(p&&v==="books"&&T.current&&C.current){const q=T.current,Y=C.current,X=Y.offsetTop,it=q.clientHeight,Dt=Y.clientHeight,I=X-it/2+Dt/2;q.scrollTo({top:Math.max(0,I),behavior:"smooth"}),u(Un(t.book))}},0);return()=>{clearTimeout(D)}},[p,v,x,R,t.book]),l.useLayoutEffect(()=>{if(v==="chapters"&&y){const D=y===t.book;setTimeout(()=>{if(T.current)if(D){const q=M.current[t.chapterNum];q&&q.scrollIntoView({block:"center",behavior:"smooth"})}else T.current.scrollTo({top:0});L.current&&L.current.focus()},0)}},[v,y,R,t.book,t.chapterNum]),n.jsxs(Qt,{open:p,onOpenChange:B,children:[n.jsx(ae,{asChild:!0,children:n.jsx(z,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:h("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Mt})})}),n.jsx(Vt,{id:w,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Zt,{ref:L,onKeyDown:ne,loop:!0,value:f,onValueChange:u,shouldFilter:!1,children:[v==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(_e,{ref:A,value:x,onValueChange:b,onKeyDown:Bt,onFocus:()=>F(!1),className:i&&i.length>0?"!tw-pr-10":""}),i&&i.length>0&&n.jsx(Ro,{recentSearches:i,onSearchItemSelect:At,renderItem:D=>j.formatScrRef(D,"English"),getItemKey:D=>`${D.book}-${D.chapterNum}-${D.verseNum}`,ariaLabel:a==null?void 0:a["%history_recentSearches_ariaLabel%"],groupHeading:a==null?void 0:a["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:ut.map(({onClick:D,disabled:q,title:Y,icon:X})=>n.jsx(z,{variant:"ghost",size:"sm",onClick:()=>{F(!0),D()},disabled:q,className:"tw-h-10 tw-w-4 tw-p-0",title:Y,onKeyDown:ze,children:n.jsx(X,{})},Y))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:dt,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(k.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(k.ArrowRight,{className:"tw-h-4 tw-w-4"})}),y&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Te(y,s)})]}),!N&&n.jsxs(Jt,{ref:T,children:[v==="books"&&n.jsxs(n.Fragment,{children:[!R&&Object.entries(G).map(([D,q])=>{if(q.length!==0)return n.jsx(Lt,{heading:ee(D),children:q.map(Y=>n.jsx(Eo,{bookId:Y,onSelect:X=>_t(X),section:j.getSectionForBook(Y),commandValue:`${Y} ${be[Y]}`,ref:Y===t.book?C:void 0,localizedBookNames:s},Y))},D)}),R&&n.jsx(Lt,{children:n.jsx(Ft,{value:`${R.book} ${be[R.book]} ${R.chapterNum||""}:${R.verseNum||""})}`,onSelect:U,className:"tw-font-semibold tw-text-primary",children:j.formatScrRef({book:R.book,chapterNum:R.chapterNum??1,verseNum:R.verseNum??1},s?rr(R.book,s):void 0)},"top-match")}),R&&Ut(R.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Te(R.book,s)}),n.jsx(Br,{bookId:R.book,scrRef:t,onChapterSelect:Ot,setChapterRef:me,isChapterDimmed:ft,className:"tw-px-4 tw-pb-4"})]})]}),v==="chapters"&&y&&n.jsx(Br,{bookId:y,scrRef:t,onChapterSelect:Ot,setChapterRef:me,className:"tw-p-4"})]})]})})]})}const bi=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),vi=se.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),wt=l.forwardRef(({className:t,...e},r)=>n.jsx(mo.Root,{ref:r,className:h("pr-twp",vi(),t),...e}));wt.displayName=mo.Root.displayName;const kn=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(Ye.Root,{className:h("pr-twp tw-grid tw-gap-2",t),...e,ref:r,dir:o})});kn.displayName=Ye.Root.displayName;const Xe=l.forwardRef(({className:t,...e},r)=>n.jsx(Ye.Item,{ref:r,className:h("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(Ye.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));Xe.displayName=Ye.Item.displayName;function yi(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function dn({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:s,popoverContentStyle:a,value:i,onChange:c=()=>{},getOptionLabel:w=yi,getButtonLabel:d,icon:p=void 0,buttonPlaceholder:m="",textPlaceholder:f="",commandEmptyMessage:u="No option found",buttonVariant:x="outline",alignDropDown:b="start",isDisabled:v=!1,ariaLabel:E,...y}){const[_,N]=l.useState(!1),F=d??w,L=T=>T.length>0&&typeof T[0]=="object"&&"options"in T[0],A=(T,C)=>{const M=w(T),$=typeof T=="object"&&"secondaryLabel"in T?T.secondaryLabel:void 0,V=`${C??""}${M}${$??""}`;return n.jsxs(Ft,{value:M,onSelect:()=>{c(T),N(!1)},className:"tw-flex tw-items-center",children:[n.jsx(k.Check,{className:h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0",{"tw-opacity-0":!i||w(i)!==M})}),n.jsxs("span",{className:"tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap",children:[M,$&&n.jsxs("span",{className:"tw-text-muted-foreground",children:[" · ",$]})]})]},V)};return n.jsxs(Qt,{open:_,onOpenChange:N,...y,children:[n.jsx(ae,{asChild:!0,children:n.jsxs(z,{variant:x,role:"combobox","aria-expanded":_,"aria-label":E,id:t,className:h("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:v,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden",children:[p&&n.jsx("div",{className:"tw-shrink-0 tw-pe-2",children:p}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"),children:i?F(i):m})]}),n.jsx(k.ChevronDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Vt,{align:b,className:h("tw-w-[200px] tw-p-0",s),style:a,children:n.jsxs(Zt,{children:[n.jsx(_e,{placeholder:f,className:"tw-text-inherit"}),n.jsx($e,{children:u}),n.jsx(Jt,{children:L(e)?e.map(T=>n.jsx(Lt,{heading:T.groupHeading,children:T.options.map(C=>A(C,T.groupHeading))},T.groupHeading)):e.map(T=>A(T))})]})})]})}function To({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:s=!1,chapterCount:a}){const i=l.useMemo(()=>Array.from({length:a},(d,p)=>p+1),[a]),c=d=>{r(d),d>e&&o(d)},w=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(wt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(dn,{isDisabled:s,onChange:c,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(wt,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(dn,{isDisabled:s,onChange:w,buttonClassName:"tw-ms-2 tw-w-20",options:i,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}exports.BookSelectionMode=(t=>(t.CurrentBook="current book",t.ChooseBooks="choose books",t))(exports.BookSelectionMode||{});(t=>{t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books"})(exports.BookSelectionMode||(exports.BookSelectionMode={}));const ji=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Tn=(t,e)=>t[e]??e;function Ni({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:s,endChapter:a,handleSelectEndChapter:i,startChapter:c,handleSelectStartChapter:w,localizedStrings:d}){const p=Tn(d,"%webView_bookSelector_currentBook%"),m=Tn(d,"%webView_bookSelector_choose%"),f=Tn(d,"%webView_bookSelector_chooseBooks%"),[u,x]=l.useState("current book"),b=v=>{x(v),t(v)};return n.jsx(kn,{className:"pr-twp tw-flex",value:u,onValueChange:v=>b(v),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{value:"current book"}),n.jsx(wt,{className:"tw-ms-1",children:p})]}),n.jsx(wt,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(To,{isDisabled:u==="choose books",handleSelectStartChapter:w,handleSelectEndChapter:i,chapterCount:s,startChapter:c,endChapter:a})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{value:"choose books"}),n.jsx(wt,{className:"tw-ms-1",children:f})]}),n.jsx(wt,{className:"tw-flex tw-items-center",children:o.map(v=>lt.Canon.bookIdToEnglishName(v)).join(", ")}),n.jsx(z,{disabled:u==="current book",onClick:()=>r(),children:m})]})]})})}const Mo=l.createContext(null);function ki(t,e){return{getTheme:function(){return e??null}}}function te(){const t=l.useContext(Mo);return t==null&&function(e,...r){const o=new URL("https://lexical.dev/docs/error"),s=new URLSearchParams;s.append("code",e);for(const a of r)s.append("v",a);throw o.search=s.toString(),Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Do=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,_i=Do?l.useLayoutEffect:l.useEffect,on={tag:g.HISTORY_MERGE_TAG};function Ci({initialConfig:t,children:e}){const r=l.useMemo(()=>{const{theme:o,namespace:s,nodes:a,onError:i,editorState:c,html:w}=t,d=ki(null,o),p=g.createEditor({editable:t.editable,html:w,namespace:s,nodes:a,onError:m=>i(m,p),theme:o});return function(m,f){if(f!==null){if(f===void 0)m.update(()=>{const u=g.$getRoot();if(u.isEmpty()){const x=g.$createParagraphNode();u.append(x);const b=Do?document.activeElement:null;(g.$getSelection()!==null||b!==null&&b===m.getRootElement())&&x.select()}},on);else if(f!==null)switch(typeof f){case"string":{const u=m.parseEditorState(f);m.setEditorState(u,on);break}case"object":m.setEditorState(f,on);break;case"function":m.update(()=>{g.$getRoot().isEmpty()&&f(m)},on)}}}(p,c),[p,d]},[]);return _i(()=>{const o=t.editable,[s]=r;s.setEditable(o===void 0||o)},[]),n.jsx(Mo.Provider,{value:r,children:e})}const Ei=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Si({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:r}){const[o]=te();return Ei(()=>{if(r)return o.registerUpdateListener(({editorState:s,dirtyElements:a,dirtyLeaves:i,prevEditorState:c,tags:w})=>{e&&a.size===0&&i.size===0||t&&w.has(g.HISTORY_MERGE_TAG)||c.isEmpty()||r(s,o,w)})},[o,t,e,r]),null}const ar={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:"EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},yt=ve.Provider,Rt=ve.Root,Tt=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx(ve.Trigger,{ref:o,className:e?h(sr({variant:e}),t):t,...r}));Tt.displayName=ve.Trigger.displayName;const jt=l.forwardRef(({className:t,sideOffset:e=4,style:r,...o},s)=>n.jsx(ve.Portal,{children:n.jsx(ve.Content,{ref:s,sideOffset:e,style:{zIndex:ke,...r},className:h("pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o})}));jt.displayName=ve.Content.displayName;const ir=[Bn.HeadingNode,g.ParagraphNode,g.TextNode,Bn.QuoteNode],Ri=l.createContext(null),Mn={didCatch:!1,error:null};class Ti extends l.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Mn}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var r,o,s=arguments.length,a=new Array(s),i=0;i<s;i++)a[i]=arguments[i];(r=(o=this.props).onReset)===null||r===void 0||r.call(o,{args:a,reason:"imperative-api"}),this.setState(Mn)}}componentDidCatch(e,r){var o,s;(o=(s=this.props).onError)===null||o===void 0||o.call(s,e,r)}componentDidUpdate(e,r){const{didCatch:o}=this.state,{resetKeys:s}=this.props;if(o&&r.error!==null&&Mi(e.resetKeys,s)){var a,i;(a=(i=this.props).onReset)===null||a===void 0||a.call(i,{next:s,prev:e.resetKeys,reason:"keys"}),this.setState(Mn)}}render(){const{children:e,fallbackRender:r,FallbackComponent:o,fallback:s}=this.props,{didCatch:a,error:i}=this.state;let c=e;if(a){const w={error:i,resetErrorBoundary:this.resetErrorBoundary};if(typeof r=="function")c=r(w);else if(o)c=l.createElement(o,w);else if(s!==void 0)c=s;else throw i}return l.createElement(Ri.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}function Mi(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((r,o)=>!Object.is(r,e[o]))}function Di({children:t,onError:e}){return n.jsx(Ti,{fallback:n.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Ii=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Oi(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Ai(){return function(t){const[e]=te(),r=l.useMemo(()=>t(e),[e,t]),[o,s]=l.useState(()=>r.initialValueFn()),a=l.useRef(o);return Ii(()=>{const{initialValueFn:i,subscribe:c}=r,w=i();return a.current!==w&&(a.current=w,s(w)),c(d=>{a.current=d,s(d)})},[r,t]),o}(Oi)}function Pi(t,e){const r=t.getRootElement();if(r===null)return[];const o=r.getBoundingClientRect(),s=getComputedStyle(r),a=parseFloat(s.paddingLeft)+parseFloat(s.paddingRight),i=Array.from(e.getClientRects());let c,w=i.length;i.sort((d,p)=>{const m=d.top-p.top;return Math.abs(m)<=3?d.left-p.left:m});for(let d=0;d<w;d++){const p=i[d],m=c&&c.top<=p.top&&c.top+c.height>p.top&&c.left+c.width>p.left,f=p.width+a===o.width;m||f?(i.splice(d--,1),w--):c=p}return i}function Li(t,e,r="self"){const o=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&o!==null){const[s,a]=o,i=t.isBackward(),c=s.getNode(),w=a.getNode(),d=e.is(c),p=e.is(w);if(d||p){const[m,f]=g.$getCharacterOffsets(t),u=c.is(w),x=e.is(i?w:c),b=e.is(i?c:w);let v,E=0;u?(E=m>f?f:m,v=m>f?m:f):x?(E=i?f:m,v=void 0):b&&(E=0,v=i?m:f);const y=e.__text.slice(E,v);y!==e.__text&&(r==="clone"&&(e=g.$cloneWithPropertiesEphemeral(e)),e.__text=y)}}return e}function wn(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Io=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,$i=Io&&"documentMode"in document?document.documentMode:null;!(!Io||!("InputEvent"in window)||$i)&&"getTargetRanges"in new window.InputEvent("input");function qt(t){return`${t}px`}const Fi={attributes:!0,characterData:!0,childList:!0,subtree:!0};function Vi(t,e,r){let o=null,s=null,a=null,i=[];const c=document.createElement("div");function w(){o===null&&wn(182),s===null&&wn(183);const{left:m,top:f}=s.getBoundingClientRect(),u=Pi(t,e);var x,b;c.isConnected||(b=c,(x=s).insertBefore(b,x.firstChild));let v=!1;for(let E=0;E<u.length;E++){const y=u[E],_=i[E]||document.createElement("div"),N=_.style;N.position!=="absolute"&&(N.position="absolute",v=!0);const F=qt(y.left-m);N.left!==F&&(N.left=F,v=!0);const L=qt(y.top-f);N.top!==L&&(_.style.top=L,v=!0);const A=qt(y.width);N.width!==A&&(_.style.width=A,v=!0);const T=qt(y.height);N.height!==T&&(_.style.height=T,v=!0),_.parentNode!==c&&(c.append(_),v=!0),i[E]=_}for(;i.length>u.length;)i.pop();v&&r(i)}function d(){s=null,o=null,a!==null&&a.disconnect(),a=null,c.remove();for(const m of i)m.remove();i=[]}c.style.position="relative";const p=t.registerRootListener(function m(){const f=t.getRootElement();if(f===null)return d();const u=f.parentElement;if(!g.isHTMLElement(u))return d();d(),o=f,s=u,a=new MutationObserver(x=>{const b=t.getRootElement(),v=b&&b.parentElement;if(b!==o||v!==s)return m();for(const E of x)if(!c.contains(E.target))return w()}),a.observe(u,Fi),w()});return()=>{p(),d()}}function Gr(t,e,r){if(t.type!=="text"&&g.$isElementNode(e)){const o=e.getDOMSlot(r);return[o.element,o.getFirstChildOffset()+t.offset]}return[g.getDOMTextNode(r)||r,t.offset]}function zi(t){for(const e of t){const r=e.style;r.background!=="Highlight"&&(r.background="Highlight"),r.color!=="HighlightText"&&(r.color="HighlightText"),r.marginTop!==qt(-1.5)&&(r.marginTop=qt(-1.5)),r.paddingTop!==qt(4)&&(r.paddingTop=qt(4)),r.paddingBottom!==qt(0)&&(r.paddingBottom=qt(0))}}function Bi(t,e=zi){let r=null,o=null,s=null,a=null,i=null,c=null,w=()=>{};function d(p){p.read(()=>{const m=g.$getSelection();if(!g.$isRangeSelection(m))return r=null,s=null,a=null,c=null,w(),void(w=()=>{});const[f,u]=function(T){const C=T.getStartEndPoints();return T.isBackward()?[C[1],C[0]]:C}(m),x=f.getNode(),b=x.getKey(),v=f.offset,E=u.getNode(),y=E.getKey(),_=u.offset,N=t.getElementByKey(b),F=t.getElementByKey(y),L=r===null||N!==o||v!==s||b!==r.getKey(),A=a===null||F!==i||_!==c||y!==a.getKey();if((L||A)&&N!==null&&F!==null){const T=function(C,M,$,V,P,O,G){const R=(C._window?C._window.document:document).createRange();return R.setStart(...Gr(M,$,V)),R.setEnd(...Gr(P,O,G)),R}(t,f,x,N,u,E,F);w(),w=Vi(t,T,e)}r=x,o=N,s=v,a=E,i=F,c=_})}return d(t.getEditorState()),g.mergeRegister(t.registerUpdateListener(({editorState:p})=>d(p)),()=>{w()})}function Gi(t,e){let r=null;const o=()=>{const s=getSelection(),a=s&&s.anchorNode,i=t.getRootElement();a!==null&&i!==null&&i.contains(a)?r!==null&&(r(),r=null):r===null&&(r=Bi(t,e))};return t.registerRootListener(s=>{if(s){const a=s.ownerDocument;return a.addEventListener("selectionchange",o),o(),()=>{r!==null&&r(),a.removeEventListener("selectionchange",o)}}})}function Ki(t){const e=g.$findMatchingParent(t,r=>g.$isElementNode(r)&&!r.isInline());return g.$isElementNode(e)||wn(4,t.__key),e}function qi(t){const e=g.$getSelection()||g.$getPreviousSelection();let r;if(g.$isRangeSelection(e))r=g.$caretFromPoint(e.focus,"next");else{if(e!=null){const i=e.getNodes(),c=i[i.length-1];c&&(r=g.$getSiblingCaret(c,"next"))}r=r||g.$getChildCaret(g.$getRoot(),"previous").getFlipped().insert(g.$createParagraphNode())}const o=Ui(t,r),s=g.$getAdjacentChildCaret(o),a=g.$isChildCaret(s)?g.$normalizeCaret(s):o;return g.$setSelectionFromCaretRange(g.$getCollapsedCaretRange(a)),t.getLatest()}function Ui(t,e,r){let o=g.$getCaretInDirection(e,"next");for(let s=o;s;s=g.$splitAtPointCaretNext(s,r))o=s;return g.$isTextPointCaret(o)&&wn(283),o.insert(t.isInline()?g.$createParagraphNode().append(t):t),g.$getCaretInDirection(g.$getSiblingCaret(t.getLatest(),"next"),e.direction)}function Hi(t){const e=g.$getSelection();if(!g.$isRangeSelection(e))return!1;const r=new Set,o=e.getNodes();for(let s=0;s<o.length;s++){const a=o[s],i=a.getKey();if(r.has(i))continue;const c=g.$findMatchingParent(a,d=>g.$isElementNode(d)&&!d.isInline());if(c===null)continue;const w=c.getKey();c.canIndent()&&!r.has(w)&&(r.add(w),t(c))}return r.size>0}const Yi=Symbol.for("preact-signals");function _n(){if(re>1)return void re--;let t,e=!1;for(!function(){let r=pn;for(pn=void 0;r!==void 0;)r.S.v===r.v&&(r.S.i=r.i),r=r.o}();He!==void 0;){let r=He;for(He=void 0,un++;r!==void 0;){const o=r.u;if(r.u=void 0,r.f&=-3,!(8&r.f)&&Oo(r))try{r.c()}catch(s){e||(t=s,e=!0)}r=o}}if(un=0,re--,e)throw t}function Xi(t){if(re>0)return t();Hn=++Wi,re++;try{return t()}finally{_n()}}let H,He;function Kr(t){const e=H;H=void 0;try{return t()}finally{H=e}}let pn,re=0,un=0,Wi=0,Hn=0,ln=0;function qr(t){if(H===void 0)return;let e=t.n;return e===void 0||e.t!==H?(e={i:0,S:t,p:H.s,n:void 0,t:H,e:void 0,x:void 0,r:e},H.s!==void 0&&(H.s.n=e),H.s=e,t.n=e,32&H.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=H.s,e.n=void 0,H.s.n=e,H.s=e),e):void 0}function xt(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function We(t,e){return new xt(t,e)}function Oo(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Ur(t){for(let e=t.s;e!==void 0;e=e.n){const r=e.S.n;if(r!==void 0&&(e.r=r),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function Ao(t){let e,r=t.s;for(;r!==void 0;){const o=r.p;r.i===-1?(r.S.U(r),o!==void 0&&(o.n=r.n),r.n!==void 0&&(r.n.p=o)):e=r,r.S.n=r.r,r.r!==void 0&&(r.r=void 0),r=o}t.s=e}function ge(t,e){xt.call(this,void 0),this.x=t,this.s=void 0,this.g=ln-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Zi(t,e){return new ge(t,e)}function Po(t){const e=t.m;if(t.m=void 0,typeof e=="function"){re++;const r=H;H=void 0;try{e()}catch(o){throw t.f&=-2,t.f|=8,lr(t),o}finally{H=r,_n()}}}function lr(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Po(t)}function Ji(t){if(H!==this)throw new Error("Out-of-order effect");Ao(this),H=t,this.f&=-2,8&this.f&&lr(this),_n()}function Re(t,e){this.x=t,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=e==null?void 0:e.name}function Xt(t,e){const r=new Re(t,e);try{r.c()}catch(s){throw r.d(),s}const o=r.d.bind(r);return o[Symbol.dispose]=o,o}function Fe(t,e={}){const r={};for(const o in t){const s=e[o],a=We(s===void 0?t[o]:s);r[o]=a}return r}xt.prototype.brand=Yi,xt.prototype.h=function(){return!0},xt.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Kr(()=>{var r;(r=this.W)==null||r.call(this)}))},xt.prototype.U=function(t){if(this.t!==void 0){const e=t.e,r=t.x;e!==void 0&&(e.x=r,t.e=void 0),r!==void 0&&(r.e=e,t.x=void 0),t===this.t&&(this.t=r,r===void 0&&Kr(()=>{var o;(o=this.Z)==null||o.call(this)}))}},xt.prototype.subscribe=function(t){return Xt(()=>{const e=this.value,r=H;H=void 0;try{t(e)}finally{H=r}},{name:"sub"})},xt.prototype.valueOf=function(){return this.value},xt.prototype.toString=function(){return this.value+""},xt.prototype.toJSON=function(){return this.value},xt.prototype.peek=function(){const t=H;H=void 0;try{return this.value}finally{H=t}},Object.defineProperty(xt.prototype,"value",{get(){const t=qr(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(un>100)throw new Error("Cycle detected");(function(e){re!==0&&un===0&&e.l!==Hn&&(e.l=Hn,pn={S:e,v:e.v,i:e.i,o:pn})})(this),this.v=t,this.i++,ln++,re++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{_n()}}}}),ge.prototype=new xt,ge.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ln))return!0;if(this.g=ln,this.f|=1,this.i>0&&!Oo(this))return this.f&=-2,!0;const t=H;try{Ur(this),H=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return H=t,Ao(this),this.f&=-2,!0},ge.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}xt.prototype.S.call(this,t)},ge.prototype.U=function(t){if(this.t!==void 0&&(xt.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},ge.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(ge.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=qr(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Re.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.m=e)}finally{t()}},Re.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Po(this),Ur(this),re++;const t=H;return H=this,Ji.bind(this,t)},Re.prototype.N=function(){2&this.f||(this.f|=2,this.u=He,He=this)},Re.prototype.d=function(){this.f|=8,1&this.f||lr(this)},Re.prototype.dispose=function(){this.d()};g.defineExtension({build:(t,e,r)=>Fe(e),config:g.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,r){const o=r.getOutput();return Xt(()=>o.disabled.value?void 0:t.registerRootListener(s=>{t.focus(()=>{const a=document.activeElement;s===null||a!==null&&s.contains(a)||s.focus({preventScroll:!0})},{defaultSelection:o.defaultSelection.peek()})}))}});function Lo(){const t=g.$getRoot(),e=g.$getSelection(),r=g.$createParagraphNode();t.clear(),t.append(r),e!==null&&r.select(),g.$isRangeSelection(e)&&(e.format=0)}function $o(t,e=Lo){return t.registerCommand(g.CLEAR_EDITOR_COMMAND,r=>(t.update(e),!0),g.COMMAND_PRIORITY_EDITOR)}g.defineExtension({build:(t,e,r)=>Fe(e),config:g.safeCast({$onClear:Lo}),name:"@lexical/extension/ClearEditor",register(t,e,r){const{$onClear:o}=r.getOutput();return Xt(()=>$o(t,o.value))}});function Qi(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}const Dn=g.createState("format",{parse:t=>typeof t=="number"?t:0});class Fo extends g.DecoratorNode{$config(){return this.config("decorator-text",{extends:g.DecoratorNode,stateConfigs:[{flat:!0,stateConfig:Dn}]})}getFormat(){return g.$getState(this,Dn)}getFormatFlags(e,r){return g.toggleTextFormatType(this.getFormat(),e,r)}hasFormat(e){const r=g.TEXT_TYPE_TO_FORMAT[e];return(this.getFormat()&r)!==0}setFormat(e){return g.$setState(this,Dn,e)}toggleFormat(e){const r=this.getFormat(),o=g.toggleTextFormatType(r,e,null);return this.setFormat(o)}isInline(){return!0}createDOM(){return document.createElement("span")}updateDOM(){return!1}}function tl(t){return t instanceof Fo}g.defineExtension({name:"@lexical/extension/DecoratorText",nodes:()=>[Fo],register:(t,e,r)=>t.registerCommand(g.FORMAT_TEXT_COMMAND,o=>{const s=g.$getSelection();if(g.$isNodeSelection(s)||g.$isRangeSelection(s))for(const a of s.getNodes())tl(a)&&a.toggleFormat(o);return!1},g.COMMAND_PRIORITY_LOW)});function Vo(t,e){let r;return We(t(),{unwatched(){r&&(r(),r=void 0)},watched(){this.value=t(),r=e(this)}})}const Yn=g.defineExtension({build:t=>Vo(()=>t.getEditorState(),e=>t.registerUpdateListener(r=>{e.value=r.editorState})),name:"@lexical/extension/EditorState"});function Z(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function zo(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const r=t,o=e;for(const s in o)r[s]=zo(r[s],o[s]);return t}return e}const cr=0,Xn=1,Bo=2,In=3,sn=4,Se=5,On=6,Ke=7;function An(t){return t.id===cr}function Go(t){return t.id===Bo}function el(t){return function(e){return e.id===Xn}(t)||Z(305,String(t.id),String(Xn)),Object.assign(t,{id:Bo})}const nl=new Set;class rl{constructor(e,r){gt(this,"builder");gt(this,"configs");gt(this,"_dependency");gt(this,"_peerNameSet");gt(this,"extension");gt(this,"state");gt(this,"_signal");this.builder=e,this.extension=r,this.configs=new Set,this.state={id:cr}}mergeConfigs(){let e=this.extension.config||{};const r=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):g.shallowMergeConfig;for(const o of this.configs)e=r(e,o);return e}init(e){const r=this.state;Go(r)||Z(306,String(r.id));const o={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},s={...o,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},a=function(c,w,d){return Object.assign(c,{config:w,id:In,registerState:d})}(r,this.mergeConfigs(),o);let i;this.state=a,this.extension.init&&(i=this.extension.init(e,a.config,o)),this.state=function(c,w,d){return Object.assign(c,{id:sn,initResult:w,registerState:d})}(a,i,s)}build(e){const r=this.state;let o;r.id!==sn&&Z(307,String(r.id),String(Se)),this.extension.build&&(o=this.extension.build(e,r.config,r.registerState));const s={...r.registerState,getOutput:()=>o,getSignal:this.getSignal.bind(this)};this.state=function(a,i,c){return Object.assign(a,{id:Se,output:i,registerState:c})}(r,o,s)}register(e,r){this._signal=r;const o=this.state;o.id!==Se&&Z(308,String(o.id),String(Se));const s=this.extension.register&&this.extension.register(e,o.config,o.registerState);return this.state=function(a){return Object.assign(a,{id:On})}(o),()=>{const a=this.state;a.id!==Ke&&Z(309,String(o.id),String(Ke)),this.state=function(i){return Object.assign(i,{id:Se})}(a),s&&s()}}afterRegistration(e){const r=this.state;let o;return r.id!==On&&Z(310,String(r.id),String(On)),this.extension.afterRegistration&&(o=this.extension.afterRegistration(e,r.config,r.registerState)),this.state=function(s){return Object.assign(s,{id:Ke})}(r),o}getSignal(){return this._signal===void 0&&Z(311),this._signal}getInitResult(){this.extension.init===void 0&&Z(312,this.extension.name);const e=this.state;return function(r){return r.id>=sn}(e)||Z(313,String(e.id),String(sn)),e.initResult}getInitPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(r){return r.id>=In}(e)||Z(314,String(e.id),String(In)),{config:e.config}}getPeer(e){const r=this.builder.extensionNameMap.get(e);return r?r.getExtensionDependency():void 0}getInitDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Z(315,this.extension.name,e.name),r.getExtensionInitDependency()}getDependency(e){const r=this.builder.getExtensionRep(e);return r===void 0&&Z(315,this.extension.name,e.name),r.getExtensionDependency()}getState(){const e=this.state;return function(r){return r.id>=Ke}(e)||Z(316,String(e.id),String(Ke)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||nl}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([r])=>r)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(r){return r.id>=Se})(e)||Z(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}}const Hr={tag:g.HISTORY_MERGE_TAG};function ol(){const t=g.$getRoot();t.isEmpty()&&t.append(g.$createParagraphNode())}const sl=g.defineExtension({config:g.safeCast({setOptions:Hr,updateOptions:Hr}),init:({$initialEditorState:t=ol})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:r},o){const s=o.getInitResult();if(!s.initialized){s.initialized=!0;const{$initialEditorState:a}=s;if(g.$isEditorState(a))t.setEditorState(a,r);else if(typeof a=="function")t.update(()=>{a(t)},e);else if(a&&(typeof a=="string"||typeof a=="object")){const i=t.parseEditorState(a);t.setEditorState(i,r)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[g.RootNode,g.TextNode,g.LineBreakNode,g.TabNode,g.ParagraphNode]}),Yr=Symbol.for("@lexical/extension/LexicalBuilder");function Xr(){}function al(t){throw t}function an(t){return Array.isArray(t)?t:[t]}const Pn="0.43.0+prod.esm";class Me{constructor(e){gt(this,"roots");gt(this,"extensionNameMap");gt(this,"outgoingConfigEdges");gt(this,"incomingEdges");gt(this,"conflicts");gt(this,"_sortedExtensionReps");gt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Pn,this.roots=e;for(const r of e)this.addExtension(r)}static fromExtensions(e){const r=[an(sl)];for(const o of e)r.push(an(o));return new Me(r)}static maybeFromEditor(e){const r=e[Yr];return r&&(r.PACKAGE_VERSION!==Pn&&Z(292,r.PACKAGE_VERSION,Pn),r instanceof Me||Z(293)),r}static fromEditor(e){const r=Me.maybeFromEditor(e);return r===void 0&&Z(294),r}constructEditor(){const{$initialEditorState:e,onError:r,...o}=this.buildCreateEditorArgs(),s=Object.assign(g.createEditor({...o,...r?{onError:a=>{r(a,s)}}:{}}),{[Yr]:this});for(const a of this.sortedExtensionReps())a.build(s);return s}buildEditor(){let e=Xr;function r(){try{e()}finally{e=Xr}}const o=Object.assign(this.constructEditor(),{dispose:r,[Symbol.dispose]:r});return e=g.mergeRegister(this.registerEditor(o),()=>o.setRootElement(null)),o}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const r=this.extensionNameMap.get(e.name);if(r)return r.extension!==e&&Z(295,e.name),r}addEdge(e,r,o){const s=this.outgoingConfigEdges.get(e);s?s.set(r,o):this.outgoingConfigEdges.set(e,new Map([[r,o]]));const a=this.incomingEdges.get(r);a?a.add(e):this.incomingEdges.set(r,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&Z(296);const r=an(e),[o]=r;typeof o.name!="string"&&Z(297,typeof o.name);let s=this.extensionNameMap.get(o.name);if(s!==void 0&&s.extension!==o&&Z(298,o.name),!s){s=new rl(this,o),this.extensionNameMap.set(o.name,s);const a=this.conflicts.get(o.name);typeof a=="string"&&Z(299,o.name,a);for(const i of o.conflictsWith||[])this.extensionNameMap.has(i)&&Z(299,o.name,i),this.conflicts.set(i,o.name);for(const i of o.dependencies||[]){const c=an(i);this.addEdge(o.name,c[0].name,c.slice(1)),this.addExtension(c)}for(const[i,c]of o.peerDependencies||[])this.addEdge(o.name,i,c?[c]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],r=(o,s)=>{let a=o.state;if(Go(a))return;const i=o.extension.name;var c;An(a)||Z(300,i,s||"[unknown]"),An(c=a)||Z(304,String(c.id),String(cr)),a=Object.assign(c,{id:Xn}),o.state=a;const w=this.outgoingConfigEdges.get(i);if(w)for(const d of w.keys()){const p=this.extensionNameMap.get(d);p&&r(p,i)}a=el(a),o.state=a,e.push(o)};for(const o of this.extensionNameMap.values())An(o.state)&&r(o);for(const o of e)for(const[s,a]of this.outgoingConfigEdges.get(o.extension.name)||[])if(a.length>0){const i=this.extensionNameMap.get(s);if(i)for(const c of a)i.configs.add(c)}for(const[o,...s]of this.roots)if(s.length>0){const a=this.extensionNameMap.get(o.name);a===void 0&&Z(301,o.name);for(const i of s)a.configs.add(i)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const r=this.sortedExtensionReps(),o=new AbortController,s=[()=>o.abort()],a=o.signal;for(const i of r){const c=i.register(e,a);c&&s.push(c)}for(const i of r){const c=i.afterRegistration(e);c&&s.push(c)}return g.mergeRegister(...s)}buildCreateEditorArgs(){const e={},r=new Set,o=new Map,s=new Map,a={},i={},c=this.sortedExtensionReps();for(const p of c){const{extension:m}=p;if(m.onError!==void 0&&(e.onError=m.onError),m.disableEvents!==void 0&&(e.disableEvents=m.disableEvents),m.parentEditor!==void 0&&(e.parentEditor=m.parentEditor),m.editable!==void 0&&(e.editable=m.editable),m.namespace!==void 0&&(e.namespace=m.namespace),m.$initialEditorState!==void 0&&(e.$initialEditorState=m.$initialEditorState),m.nodes)for(const f of Qi(m)){if(typeof f!="function"){const u=o.get(f.replace);u&&Z(302,m.name,f.replace.name,u.extension.name),o.set(f.replace,p)}r.add(f)}if(m.html){if(m.html.export)for(const[f,u]of m.html.export.entries())s.set(f,u);m.html.import&&Object.assign(a,m.html.import)}m.theme&&zo(i,m.theme)}Object.keys(i).length>0&&(e.theme=i),r.size&&(e.nodes=[...r]);const w=Object.keys(a).length>0,d=s.size>0;(w||d)&&(e.html={},w&&(e.html.import=a),d&&(e.html.export=s));for(const p of c)p.init(e);return e.onError||(e.onError=al),e}}const il=new Set,Wr=g.defineExtension({build(t,e,r){const o=r.getDependency(Yn).output,s=We({watchedNodeKeys:new Map}),a=Vo(()=>{},()=>Xt(()=>{const i=a.peek(),{watchedNodeKeys:c}=s.value;let w,d=!1;o.value.read(()=>{if(g.$getSelection())for(const[p,m]of c.entries()){if(m.size===0){c.delete(p);continue}const f=g.$getNodeByKey(p),u=f&&f.isSelected()||!1;d=d||u!==(!!i&&i.has(p)),u&&(w=w||new Set,w.add(p))}}),!d&&w&&i&&w.size===i.size||(a.value=w)}));return{watchNodeKey:function(i){const c=Zi(()=>(a.value||il).has(i)),{watchedNodeKeys:w}=s.peek();let d=w.get(i);const p=d!==void 0;return d=d||new Set,d.add(c),p||(w.set(i,d),s.value={watchedNodeKeys:w}),c}}},dependencies:[Yn],name:"@lexical/extension/NodeSelection"}),ll=g.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");class Oe extends g.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Oe(e.__key)}static importJSON(e){return dr().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:cl,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const r=document.createElement("hr");return g.addClassNamesToElement(r,e.theme.hr),r}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}}function cl(){return{node:dr()}}function dr(){return g.$create(Oe)}function dl(t){return t instanceof Oe}g.defineExtension({dependencies:[Yn,Wr],name:"@lexical/extension/HorizontalRule",nodes:()=>[Oe],register(t,e,r){const{watchNodeKey:o}=r.getDependency(Wr).output,s=We({nodeSelections:new Map}),a=t._config.theme.hrSelected??"selected";return g.mergeRegister(t.registerCommand(ll,i=>{const c=g.$getSelection();if(!g.$isRangeSelection(c))return!1;if(c.focus.getNode()!==null){const w=dr();qi(w)}return!0},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLICK_COMMAND,i=>{if(g.isDOMNode(i.target)){const c=g.$getNodeFromDOMNode(i.target);if(dl(c))return function(w,d=!1){const p=g.$getSelection(),m=w.isSelected(),f=w.getKey();let u;d&&g.$isNodeSelection(p)?u=p:(u=g.$createNodeSelection(),g.$setSelection(u)),m?u.delete(f):u.add(f)}(c,i.shiftKey),!0}return!1},g.COMMAND_PRIORITY_LOW),t.registerMutationListener(Oe,(i,c)=>{Xi(()=>{let w=!1;const{nodeSelections:d}=s.peek();for(const[p,m]of i.entries())if(m==="destroyed")d.delete(p),w=!0;else{const f=d.get(p),u=t.getElementByKey(p);f?f.domNode.value=u:(w=!0,d.set(p,{domNode:We(u),selectedSignal:o(p)}))}w&&(s.value={nodeSelections:d})})}),Xt(()=>{const i=[];for(const{domNode:c,selectedSignal:w}of s.value.nodeSelections.values())i.push(Xt(()=>{const d=c.value;d&&(w.value?g.addClassNamesToElement(d,a):g.removeClassNamesFromElement(d,a))}));return g.mergeRegister(...i)}))}});g.defineExtension({build:(t,e)=>Fe({inheritEditableFromParent:e.inheritEditableFromParent}),config:g.safeCast({$getParentEditor:function(){const t=g.$getEditor();return Me.fromEditor(t),t},inheritEditableFromParent:!1}),init:(t,e,r)=>{const o=e.$getParentEditor();t.parentEditor=o,t.theme=t.theme||o._config.theme},name:"@lexical/extension/NestedEditor",register:(t,e,r)=>Xt(()=>{const o=t._parentEditor;if(o&&r.getOutput().inheritEditableFromParent.value)return t.setEditable(o.isEditable()),o.registerEditableListener(t.setEditable.bind(t))})});g.defineExtension({build:(t,e,r)=>Fe(e),config:g.safeCast({disabled:!1,onReposition:void 0}),name:"@lexical/utils/SelectionAlwaysOnDisplay",register:(t,e,r)=>{const o=r.getOutput();return Xt(()=>{if(!o.disabled.value)return Gi(t,o.onReposition.value)})}});function Ko(t){return t.canBeEmpty()}function wl(t,e,r=Ko){return g.mergeRegister(t.registerCommand(g.KEY_TAB_COMMAND,o=>{const s=g.$getSelection();if(!g.$isRangeSelection(s))return!1;o.preventDefault();const a=function(i){if(i.getNodes().filter(f=>g.$isBlockElementNode(f)&&f.canIndent()).length>0)return!0;const c=i.anchor,w=i.focus,d=w.isBefore(c)?w:c,p=d.getNode(),m=Ki(p);if(m.canIndent()){const f=m.getKey();let u=g.$createRangeSelection();if(u.anchor.set(f,0,"element"),u.focus.set(f,0,"element"),u=g.$normalizeSelection__EXPERIMENTAL(u),u.anchor.is(d))return!0}return!1}(s)?o.shiftKey?g.OUTDENT_CONTENT_COMMAND:g.INDENT_CONTENT_COMMAND:g.INSERT_TAB_COMMAND;return t.dispatchCommand(a,void 0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INDENT_CONTENT_COMMAND,()=>{const o=typeof e=="number"?e:e?e.peek():null,s=g.$getSelection();if(!g.$isRangeSelection(s))return!1;const a=typeof r=="function"?r:r.peek();return Hi(i=>{if(a(i)){const c=i.getIndent()+1;(!o||c<o)&&i.setIndent(c)}})},g.COMMAND_PRIORITY_CRITICAL))}g.defineExtension({build:(t,e,r)=>Fe(e),config:g.safeCast({$canIndent:Ko,disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,r){const{disabled:o,maxIndent:s,$canIndent:a}=r.getOutput();return Xt(()=>{if(!o.value)return wl(t,s,a)})}});const pl=g.defineExtension({name:"@lexical/react/ReactProvider"});function ul(){return g.$getRoot().getTextContent()}function ml(t,e=!0){if(t)return!1;let r=ul();return e&&(r=r.trim()),r===""}function fl(t){if(!ml(t,!1))return!1;const e=g.$getRoot().getChildren(),r=e.length;if(r>1)return!1;for(let o=0;o<r;o++){const s=e[o];if(g.$isDecoratorNode(s))return!1;if(g.$isElementNode(s)){if(!g.$isParagraphNode(s)||s.__indent!==0)return!1;const a=s.getChildren(),i=a.length;for(let c=0;c<i;c++){const w=a[o];if(!g.$isTextNode(w))return!1}}}return!0}function qo(t){return()=>fl(t)}function Uo(t){const e=window.location.origin,r=o=>{if(o.origin!==e)return;const s=t.getRootElement();if(document.activeElement!==s)return;const a=o.data;if(typeof a=="string"){let i;try{i=JSON.parse(a)}catch{return}if(i&&i.protocol==="nuanria_messaging"&&i.type==="request"){const c=i.payload;if(c&&c.functionId==="makeChanges"){const w=c.args;if(w){const[d,p,m,f,u]=w;t.update(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){const b=x.anchor;let v=b.getNode(),E=0,y=0;if(g.$isTextNode(v)&&d>=0&&p>=0&&(E=d,y=d+p,x.setTextNodeRange(v,E,v,y)),E===y&&m===""||(x.insertRawText(m),v=b.getNode()),g.$isTextNode(v)){E=f,y=f+u;const _=v.getTextContentSize();E=E>_?_:E,y=y>_?_:y,x.setTextNodeRange(v,E,v,y)}o.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",r,!0),()=>{window.removeEventListener("message",r,!0)}}g.defineExtension({build:(t,e,r)=>Fe(e),config:g.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,r)=>Xt(()=>r.getOutput().disabled.value?void 0:Uo(t))});function hl(t,...e){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",t);for(const s of e)o.append("v",s);throw r.search=o.toString(),Error(`Minified Lexical error #${t}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const wr=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function gl({editor:t,ErrorBoundary:e}){return function(r,o){const[s,a]=l.useState(()=>r.getDecorators());return wr(()=>r.registerDecoratorListener(i=>{Vr.flushSync(()=>{a(i)})}),[r]),l.useEffect(()=>{a(r.getDecorators())},[r]),l.useMemo(()=>{const i=[],c=Object.keys(s);for(let w=0;w<c.length;w++){const d=c[w],p=n.jsx(o,{onError:f=>r._onError(f),children:n.jsx(l.Suspense,{fallback:null,children:s[d]})}),m=r.getElementByKey(d);m!==null&&i.push(Vr.createPortal(p,m,d))}return i},[o,s,r])}(t,e)}function xl({editor:t,ErrorBoundary:e}){return function(r){const o=Me.maybeFromEditor(r);if(o&&o.hasExtensionByName(pl.name)){for(const s of["@lexical/plain-text","@lexical/rich-text"])o.hasExtensionByName(s)&&hl(320,s);return!0}return!1}(t)?null:n.jsx(gl,{editor:t,ErrorBoundary:e})}function Zr(t){return t.getEditorState().read(qo(t.isComposing()))}function bl({contentEditable:t,placeholder:e=null,ErrorBoundary:r}){const[o]=te();return function(s){wr(()=>g.mergeRegister(Bn.registerRichText(s),Uo(s)),[s])}(o),n.jsxs(n.Fragment,{children:[t,n.jsx(vl,{content:e}),n.jsx(xl,{editor:o,ErrorBoundary:r})]})}function vl({content:t}){const[e]=te(),r=function(s){const[a,i]=l.useState(()=>Zr(s));return wr(()=>{function c(){const w=Zr(s);i(w)}return c(),g.mergeRegister(s.registerUpdateListener(()=>{c()}),s.registerEditableListener(()=>{c()}))},[s]),a}(e),o=Ai();return r?typeof t=="function"?t(o):t:null}function yl({defaultSelection:t}){const[e]=te();return l.useEffect(()=>{e.focus(()=>{const r=document.activeElement,o=e.getRootElement();o===null||r!==null&&o.contains(r)||o.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const jl=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function Nl({onClear:t}){const[e]=te();return jl(()=>$o(e,t),[e,t]),null}const Ho=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?l.useLayoutEffect:l.useEffect;function kl({editor:t,ariaActiveDescendant:e,ariaAutoComplete:r,ariaControls:o,ariaDescribedBy:s,ariaErrorMessage:a,ariaExpanded:i,ariaInvalid:c,ariaLabel:w,ariaLabelledBy:d,ariaMultiline:p,ariaOwns:m,ariaRequired:f,autoCapitalize:u,className:x,id:b,role:v="textbox",spellCheck:E=!0,style:y,tabIndex:_,"data-testid":N,...F},L){const[A,T]=l.useState(t.isEditable()),C=l.useCallback($=>{$&&$.ownerDocument&&$.ownerDocument.defaultView?t.setRootElement($):t.setRootElement(null)},[t]),M=l.useMemo(()=>function(...$){return V=>{for(const P of $)typeof P=="function"?P(V):P!=null&&(P.current=V)}}(L,C),[C,L]);return Ho(()=>(T(t.isEditable()),t.registerEditableListener($=>{T($)})),[t]),n.jsx("div",{"aria-activedescendant":A?e:void 0,"aria-autocomplete":A?r:"none","aria-controls":A?o:void 0,"aria-describedby":s,...a!=null?{"aria-errormessage":a}:{},"aria-expanded":A&&v==="combobox"?!!i:void 0,...c!=null?{"aria-invalid":c}:{},"aria-label":w,"aria-labelledby":d,"aria-multiline":p,"aria-owns":A?m:void 0,"aria-readonly":!A||void 0,"aria-required":f,autoCapitalize:u,className:x,contentEditable:A,"data-testid":N,id:b,ref:M,role:v,spellCheck:E,style:y,tabIndex:_,...F})}const _l=l.forwardRef(kl);function Jr(t){return t.getEditorState().read(qo(t.isComposing()))}const Cl=l.forwardRef(El);function El(t,e){const{placeholder:r,...o}=t,[s]=te();return n.jsxs(n.Fragment,{children:[n.jsx(_l,{editor:s,...o,ref:e}),r!=null&&n.jsx(Sl,{editor:s,content:r})]})}function Sl({content:t,editor:e}){const r=function(i){const[c,w]=l.useState(()=>Jr(i));return Ho(()=>{function d(){const p=Jr(i);w(p)}return d(),g.mergeRegister(i.registerUpdateListener(()=>{d()}),i.registerEditableListener(()=>{d()}))},[i]),c}(e),[o,s]=l.useState(e.isEditable());if(l.useLayoutEffect(()=>(s(e.isEditable()),e.registerEditableListener(i=>{s(i)})),[e]),!r)return null;let a=null;return typeof t=="function"?a=t(o):t!==null&&(a=t),a===null?null:n.jsx("div",{"aria-hidden":!0,children:a})}function Rl({placeholder:t,className:e,placeholderClassName:r}){return n.jsx(Cl,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:n.jsx("div",{className:r??"tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}const Yo=l.createContext(void 0);function Tl({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s,children:a}){const i=l.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:r,setBlockType:o,showModal:s}),[t,e,r,o,s]);return n.jsx(Yo.Provider,{value:i,children:a})}function Xo(){const t=l.useContext(Yo);if(!t)throw new Error("useToolbarContext must be used within a ToolbarContext provider");return t}function Ml(){const[t,e]=l.useState(void 0),r=l.useCallback(()=>{e(void 0)},[]),o=l.useMemo(()=>{if(t===void 0)return;const{title:a,content:i}=t;return n.jsx(vo,{open:!0,onOpenChange:r,children:n.jsxs(Qn,{children:[n.jsx(tr,{children:n.jsx(er,{children:a})}),i]})})},[t,r]),s=l.useCallback((a,i,c=!1)=>{e({closeOnClickOutside:c,content:i(r),title:a})},[r]);return[o,s]}function Dl({children:t}){const[e]=te(),[r,o]=l.useState(e),[s,a]=l.useState("paragraph"),[i,c]=Ml(),w=()=>{};return l.useEffect(()=>r.registerCommand(g.SELECTION_CHANGE_COMMAND,(d,p)=>(o(p),!1),g.COMMAND_PRIORITY_CRITICAL),[r]),n.jsxs(Tl,{activeEditor:r,$updateToolbar:w,blockType:s,setBlockType:a,showModal:c,children:[i,t({blockType:s})]})}function Il(t){const[e]=te(),{activeEditor:r}=Xo();l.useEffect(()=>r.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const o=g.$getSelection();return o&&t(o),!1},g.COMMAND_PRIORITY_CRITICAL),[e,t]),l.useEffect(()=>{r.getEditorState().read(()=>{const o=g.$getSelection();o&&t(o)})},[r,t])}const Wo=se.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),Ol=l.forwardRef(({className:t,variant:e,size:r,...o},s)=>n.jsx(fo.Root,{ref:s,className:h(Wo({variant:e,size:r,className:t})),...o}));Ol.displayName=fo.Root.displayName;const Zo=l.createContext({size:"default",variant:"default"}),Cn=l.forwardRef(({className:t,variant:e,size:r,children:o,...s},a)=>{const i=ct();return n.jsx(Nn.Root,{ref:a,className:h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...s,dir:i,children:n.jsx(Zo.Provider,{value:{variant:e,size:r},children:o})})});Cn.displayName=Nn.Root.displayName;const De=l.forwardRef(({className:t,children:e,variant:r,size:o,...s},a)=>{const i=l.useContext(Zo);return n.jsx(Nn.Item,{ref:a,className:h(Wo({variant:i.variant||r,size:i.size||o}),t),...s,children:e})});De.displayName=Nn.Item.displayName;const Qr=[{format:"bold",icon:k.BoldIcon,label:"Bold"},{format:"italic",icon:k.ItalicIcon,label:"Italic"}];function Al(){const{activeEditor:t}=Xo(),[e,r]=l.useState([]),o=l.useCallback(s=>{if(g.$isRangeSelection(s)||Ha.$isTableSelection(s)){const a=[];Qr.forEach(({format:i})=>{s.hasFormat(i)&&a.push(i)}),r(i=>i.length!==a.length||!a.every(c=>i.includes(c))?a:i)}},[]);return Il(o),n.jsx(Cn,{type:"multiple",value:e,onValueChange:r,variant:"outline",size:"sm",children:Qr.map(({format:s,icon:a,label:i})=>n.jsx(De,{value:s,"aria-label":i,onClick:()=>{t.dispatchCommand(g.FORMAT_TEXT_COMMAND,s)},children:n.jsx(a,{className:"tw-h-4 tw-w-4"})},s))})}function Pl({onClear:t}){const[e]=te();l.useEffect(()=>{t&&t(()=>{e.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)})},[e,t])}function Ll({placeholder:t="Start typing ...",autoFocus:e=!1,onClear:r}){const[,o]=l.useState(void 0),s=a=>{a!==void 0&&o(a)};return n.jsxs("div",{className:"tw-relative",children:[n.jsx(Dl,{children:()=>n.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:n.jsx(Al,{})})}),n.jsxs("div",{className:"tw-relative",children:[n.jsx(bl,{contentEditable:n.jsx("div",{ref:s,children:n.jsx(Rl,{placeholder:t})}),ErrorBoundary:Di}),e&&n.jsx(yl,{defaultSelection:"rootEnd"}),n.jsx(Pl,{onClear:r}),n.jsx(Nl,{})]})]})}const $l={namespace:"commentEditor",theme:ar,nodes:ir,onError:t=>{console.error(t)}};function mn({editorState:t,editorSerializedState:e,onChange:r,onSerializedChange:o,placeholder:s="Start typing…",autoFocus:a=!1,onClear:i,className:c}){return n.jsx("div",{className:h("pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",c),children:n.jsx(Ci,{initialConfig:{...$l,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:n.jsxs(yt,{children:[n.jsx(Ll,{placeholder:s,autoFocus:a,onClear:i}),n.jsx(Si,{ignoreSelectionChange:!0,onChange:w=>{r==null||r(w),o==null||o(w.toJSON())}})]})})})}function Fl(t,e){const r=g.isDOMDocumentNode(e)?e.body.childNodes:e.childNodes;let o=[];const s=[];for(const a of r)if(!Qo.has(a.nodeName)){const i=ts(a,t,s,!1);i!==null&&(o=o.concat(i))}return function(a){for(const i of a)i.getNextSibling()instanceof g.ArtificialNode__DO_NOT_USE&&i.insertAfter(g.$createLineBreakNode());for(const i of a){const c=i.getChildren();for(const w of c)i.insertBefore(w);i.remove()}}(s),o}function Vl(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const r=document.createElement("div"),o=g.$getRoot().getChildren();for(let s=0;s<o.length;s++)Jo(t,o[s],r,e);return r.innerHTML}function Jo(t,e,r,o=null){let s=o===null||e.isSelected(o);const a=g.$isElementNode(e)&&e.excludeFromCopy("html");let i=e;o!==null&&g.$isTextNode(e)&&(i=Li(o,e,"clone"));const c=g.$isElementNode(i)?i.getChildren():[],w=g.getRegisteredNode(t,i.getType());let d;d=w&&w.exportDOM!==void 0?w.exportDOM(t,i):i.exportDOM(t);const{element:p,after:m}=d;if(!p)return!1;const f=document.createDocumentFragment();for(let u=0;u<c.length;u++){const x=c[u],b=Jo(t,x,f,o);!s&&g.$isElementNode(e)&&b&&e.extractWithChild(x,o,"html")&&(s=!0)}if(s&&!a){if((g.isHTMLElement(p)||g.isDocumentFragment(p))&&p.append(f),r.append(p),m){const u=m.call(i,p);u&&(g.isDocumentFragment(p)?p.replaceChildren(u):p.replaceWith(u))}}else r.append(f);return s}const Qo=new Set(["STYLE","SCRIPT"]);function ts(t,e,r,o,s=new Map,a){let i=[];if(Qo.has(t.nodeName))return i;let c=null;const w=function(x,b){const{nodeName:v}=x,E=b._htmlConversions.get(v.toLowerCase());let y=null;if(E!==void 0)for(const _ of E){const N=_(x);N!==null&&(y===null||(y.priority||0)<=(N.priority||0))&&(y=N)}return y!==null?y.conversion:null}(t,e),d=w?w(t):null;let p=null;if(d!==null){p=d.after;const x=d.node;if(c=Array.isArray(x)?x[x.length-1]:x,c!==null){for(const[,b]of s)if(c=b(c,a),!c)break;c&&i.push(...Array.isArray(x)?x:[c])}d.forChild!=null&&s.set(t.nodeName,d.forChild)}const m=t.childNodes;let f=[];const u=(c==null||!g.$isRootOrShadowRoot(c))&&(c!=null&&g.$isBlockElementNode(c)||o);for(let x=0;x<m.length;x++)f.push(...ts(m[x],e,r,u,new Map(s),c));return p!=null&&(f=p(f)),g.isBlockDomNode(t)&&(f=zl(t,f,u?()=>{const x=new g.ArtificialNode__DO_NOT_USE;return r.push(x),x}:g.$createParagraphNode)),c==null?f.length>0?i=i.concat(f):g.isBlockDomNode(t)&&function(x){return x.nextSibling==null||x.previousSibling==null?!1:g.isInlineDomNode(x.nextSibling)&&g.isInlineDomNode(x.previousSibling)}(t)&&(i=i.concat(g.$createLineBreakNode())):g.$isElementNode(c)&&c.append(...f),i}function zl(t,e,r){const o=t.style.textAlign,s=[];let a=[];for(let i=0;i<e.length;i++){const c=e[i];if(g.$isBlockElementNode(c))o&&!c.getFormat()&&c.setFormat(o),s.push(c);else if(a.push(c),i===e.length-1||i<e.length-1&&g.$isBlockElementNode(e[i+1])){const w=r();w.setFormat(o),w.append(...a),s.push(w),a=[]}}return s}function es(t){const e=t.querySelector('[contenteditable="true"]');if(!e)return!1;e.focus();const r=window.getSelection(),o=document.createRange();return o.selectNodeContents(e),o.collapse(!1),r==null||r.removeAllRanges(),r==null||r.addRange(o),!0}function ns(t){return t?t.some(e=>e&&"text"in e&&e.text.trim().length>0?!0:!e||!("children"in e)?!1:ns(e.children)):!1}function Pt(t){var e;return(e=t==null?void 0:t.root)!=null&&e.children?ns(t.root.children):!1}function Bl(t){if(!t||t.trim()==="")throw new Error("Input HTML is empty");const e=wo.createHeadlessEditor({namespace:"EditorUtils",theme:ar,nodes:ir,onError:o=>{console.error(o)}});let r;if(e.update(()=>{const s=new DOMParser().parseFromString(t,"text/html"),a=Fl(e,s);g.$getRoot().clear(),g.$insertNodes(a)},{discrete:!0}),e.getEditorState().read(()=>{r=e.getEditorState().toJSON()}),!r)throw new Error("Failed to convert HTML to editor state");return r}function fn(t){const e=wo.createHeadlessEditor({namespace:"EditorUtils",theme:ar,nodes:ir,onError:s=>{console.error(s)}}),r=e.parseEditorState(JSON.stringify(t));e.setEditorState(r);let o="";return e.getEditorState().read(()=>{o=Vl(e)}),o=o.replace(/\s+style="[^"]*"/g,"").replace(/\s+class="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g,"<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g,"<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g,"<s>$1</s>").replace(/<br\s*\/?>/gi,"<br/>"),o}function pr(t){return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(t.key)?(t.stopPropagation(),!0):!1}const de=l.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},s)=>n.jsx(ho.Root,{ref:s,decorative:r,orientation:e,className:h("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));de.displayName=ho.Root.displayName;const Gl=se.cva("tw-flex tw-w-fit tw-items-stretch has-[>[data-slot=button-group]]:tw-gap-2 [&>*]:focus-visible:tw-relative [&>*]:focus-visible:tw-z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:tw-rounded-r-md [&>[data-slot=select-trigger]:not([class*=w-])]:tw-w-fit [&>input]:tw-flex-1",{variants:{orientation:{horizontal:"[&>*:not(:first-child)]:tw-rounded-l-none [&>*:not(:first-child)]:tw-border-l-0 [&>*:not(:last-child)]:tw-rounded-r-none",vertical:"tw-flex-col [&>*:not(:first-child)]:tw-rounded-t-none [&>*:not(:first-child)]:tw-border-t-0 [&>*:not(:last-child)]:tw-rounded-b-none"}},defaultVariants:{orientation:"horizontal"}});function rs({className:t,orientation:e,...r}){return n.jsx("div",{role:"group","data-slot":"button-group","data-orientation":e,className:h("pr-twp",Gl({orientation:e}),t),...r})}function os({className:t,orientation:e="vertical",...r}){return n.jsx(de,{"data-slot":"button-group-separator",orientation:e,className:h("tw-!m-0 tw-relative tw-self-stretch tw-bg-input data-[orientation=vertical]:tw-h-auto",t),...r})}const ur=Object.freeze(["%cancelButton_tooltip%","%acceptButton_tooltip%"]),to=(t,e)=>t[e]??e;function mr({onCancelClick:t,onAcceptClick:e,canAccept:r=!0,localizedStrings:o={},className:s="tw-h-6 tw-w-6"}){const a=to(o,"%cancelButton_tooltip%"),i=to(o,"%acceptButton_tooltip%");return n.jsxs(rs,{children:[n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(z,{"aria-label":a,className:s,size:"icon",onClick:t,variant:"secondary",children:n.jsx(k.X,{})})}),n.jsx(jt,{children:n.jsx("p",{children:a})})]})}),n.jsx(os,{}),n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(z,{"aria-label":i,className:s,size:"icon",onClick:e,disabled:!r,children:n.jsx(k.Check,{})})}),n.jsx(jt,{children:n.jsx("p",{children:i})})]})})]})}function cn(t,e){return t===""?e["%comment_assign_unassigned%"]??"Unassigned":t==="Team"?e["%comment_assign_team%"]??"Team":t}function fr(t){const e=/Macintosh/i.test(navigator.userAgent);return t.key==="Enter"&&(e&&t.metaKey||!e&&t.ctrlKey)}const Kl={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Ln(t,e){return t===""?e["%commentEditor_unassigned%"]??"Unassigned":t==="Team"?e["%commentEditor_team%"]??"Team":t}function ql({assignableUsers:t,onSave:e,onClose:r,localizedStrings:o}){const[s,a]=l.useState(Kl),[i,c]=l.useState(void 0),[w,d]=l.useState(!1),p=l.useRef(void 0),m=l.useRef(null);l.useEffect(()=>{let b=!0;const v=m.current;if(!v)return;const E=setTimeout(()=>{b&&es(v)},300);return()=>{b=!1,clearTimeout(E)}},[]);const f=l.useCallback(()=>{if(!Pt(s))return;const b=fn(s);e(b,i)},[s,e,i]),u=o["%commentEditor_placeholder%"]??"Type your comment here...",x=o["%commentEditor_assignTo_label%"]??"Assign to";return n.jsxs("div",{className:"pr-twp tw-grid tw-gap-3",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between",children:[n.jsx("span",{className:"tw-text-sm tw-font-medium",children:x}),n.jsx(mr,{onCancelClick:r,onAcceptClick:f,canAccept:Pt(s),localizedStrings:o})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:n.jsxs(Qt,{open:w,onOpenChange:d,children:[n.jsx(ae,{asChild:!0,children:n.jsxs(z,{variant:"outline",className:"tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",disabled:t.length===0,children:[n.jsx(k.AtSign,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{children:Ln(i!==void 0?i:"",o)})]})}),n.jsx(Vt,{className:"tw-w-auto tw-p-0",align:"start",onKeyDown:b=>{b.key==="Escape"&&(b.stopPropagation(),d(!1))},children:n.jsx(Zt,{children:n.jsx(Jt,{children:t.map(b=>n.jsx(Ft,{onSelect:()=>{c(b===""?void 0:b),d(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:Ln(b,o)})},b||"unassigned"))})})})]})}),n.jsx("div",{ref:m,role:"textbox",tabIndex:-1,className:"tw-outline-none",onKeyDownCapture:b=>{b.key==="Escape"?(b.preventDefault(),b.stopPropagation(),r()):fr(b)&&(b.preventDefault(),b.stopPropagation(),Pt(s)&&f())},onKeyDown:b=>{pr(b),(b.key==="Enter"||b.key===" ")&&b.stopPropagation()},children:n.jsx(mn,{editorSerializedState:s,onSerializedChange:b=>a(b),placeholder:u,onClear:b=>{p.current=b}})})]})}const Ul=Object.freeze(["%commentEditor_placeholder%","%commentEditor_assignTo_label%","%commentEditor_unassigned%","%commentEditor_team%",...ur]),Hl=["%comment_assign_team%","%comment_assign_unassigned%","%comment_assigned_to%","%comment_assigning_to%","%comment_dateAtTime%","%comment_date_today%","%comment_date_yesterday%","%comment_deleteComment%","%comment_editComment%","%comment_replyOrAssign%","%comment_reopenResolved%","%comment_status_resolved%","%comment_status_todo%","%comment_thread_multiple_replies%","%comment_thread_single_reply%"],Yl=["input","select","textarea","button"],Xl=["button","textbox"],ss=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const s=l.useRef(null),[a,i]=l.useState(void 0),[c,w]=l.useState(void 0),d=l.useCallback(u=>{i(u);const x=t.find(v=>v.id===u);x&&(e==null||e(x));const b=document.getElementById(u);b&&(b.scrollIntoView({block:"center"}),b.focus()),s.current&&s.current.setAttribute("aria-activedescendant",u)},[e,t]),p=l.useCallback(u=>{const x=t.find(b=>b.id===u);x&&(w(b=>b===u?void 0:u),r==null||r(x))},[r,t]),m=u=>{if(!u)return!1;const x=u.tagName.toLowerCase();if(u.isContentEditable||Yl.includes(x))return!0;const b=u.getAttribute("role");if(b&&Xl.includes(b))return!0;const v=u.getAttribute("tabindex");return v!==void 0&&v!=="-1"},f=l.useCallback(u=>{var A;const x=u.target,b=T=>T?document.getElementById(T):void 0,v=b(c),E=b(a);if(!!(v&&x&&v.contains(x)&&x!==v)&&m(x)){if(u.key==="Escape"||u.key==="ArrowLeft"&&!x.isContentEditable){if(c){u.preventDefault(),u.stopPropagation();const T=t.find(C=>C.id===c);T&&d(T.id)}return}if(u.key==="ArrowDown"||u.key==="ArrowUp"){if(!v)return;const T=Array.from(v.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(T.length===0)return;const C=T.findIndex($=>$===x);if(C===-1)return;let M;u.key==="ArrowDown"?M=Math.min(C+1,T.length-1):M=Math.max(C-1,0),M!==C&&(u.preventDefault(),u.stopPropagation(),(A=T[M])==null||A.focus());return}return}const N=t.findIndex(T=>T.id===a);let F=N;switch(u.key){case"ArrowDown":F=Math.min(N+1,t.length-1),u.preventDefault();break;case"ArrowUp":F=Math.max(N-1,0),u.preventDefault();break;case"Home":F=0,u.preventDefault();break;case"End":F=t.length-1,u.preventDefault();break;case" ":case"Enter":a&&p(a),u.preventDefault(),u.stopPropagation();return;case"ArrowRight":{const T=E;if(T){const C=T.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),M=T.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),$=C??M;if($){u.preventDefault(),$.focus();return}}break}default:u.key.length===1&&!u.metaKey&&!u.ctrlKey&&!u.altKey&&(m(x)||(o==null||o(u.key),u.preventDefault()));return}const L=t[F];L&&d(L.id)},[t,d,a,c,p,o]);return{listboxRef:s,activeId:a,selectedId:c,handleKeyDown:f,focusOption:d}},as=se.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),ye=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,className:h("pr-twp",as({variant:e}),t),...r}));ye.displayName="Badge";const hr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));hr.displayName="Card";const is=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));is.displayName="CardHeader";const ls=l.forwardRef(({className:t,...e},r)=>n.jsx("h3",{ref:r,className:h("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));ls.displayName="CardTitle";const cs=l.forwardRef(({className:t,...e},r)=>n.jsx("p",{ref:r,className:h("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));cs.displayName="CardDescription";const gr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-p-6 tw-pt-0",t),...e}));gr.displayName="CardContent";const ds=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));ds.displayName="CardFooter";const xr=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));xr.displayName=Le.Root.displayName;const ws=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Image,{ref:r,className:h("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));ws.displayName=Le.Image.displayName;const br=l.forwardRef(({className:t,...e},r)=>n.jsx(Le.Fallback,{ref:r,className:h("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));br.displayName=Le.Fallback.displayName;const vr=l.createContext(void 0);function zt(){const t=l.useContext(vr);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const ie=se.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),we=J.Trigger,yr=J.Group,ps=J.Portal,us=J.Sub,ms=J.RadioGroup;function oe({variant:t="default",...e}){const r=l.useMemo(()=>({variant:t}),[t]);return n.jsx(vr.Provider,{value:r,children:n.jsx(J.Root,{...e})})}const jr=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=zt();return n.jsxs(J.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,ie({variant:a.variant})),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});jr.displayName=J.SubTrigger.displayName;const Nr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=ct();return n.jsx(J.SubContent,{ref:o,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:n.jsx("div",{dir:s,children:e})})});Nr.displayName=J.SubContent.displayName;const Wt=l.forwardRef(({className:t,sideOffset:e=4,children:r,...o},s)=>{const a=ct();return n.jsx(J.Portal,{children:n.jsx(J.Content,{ref:s,sideOffset:e,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:n.jsx("div",{dir:a,children:r})})})});Wt.displayName=J.Content.displayName;const Ze=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=ct(),a=zt();return n.jsx(J.Item,{ref:o,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,ie({variant:a.variant})),...r,dir:s})});Ze.displayName=J.Item.displayName;const Yt=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=ct(),i=zt();return n.jsxs(J.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ie({variant:i.variant})),checked:r,...o,dir:a,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Yt.displayName=J.CheckboxItem.displayName;const kr=l.forwardRef(({className:t,children:e,...r},o)=>{const s=ct(),a=zt();return n.jsxs(J.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,ie({variant:a.variant})),...r,dir:s,children:[n.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:n.jsx(J.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});kr.displayName=J.RadioItem.displayName;const Ve=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(J.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));Ve.displayName=J.Label.displayName;const Ce=l.forwardRef(({className:t,...e},r)=>n.jsx(J.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ce.displayName=J.Separator.displayName;function fs({className:t,...e}){return n.jsx("span",{className:h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}fs.displayName="DropdownMenuShortcut";function eo({comment:t,isReply:e=!1,localizedStrings:r,isThreadExpanded:o=!1,handleUpdateComment:s,handleDeleteComment:a,onEditingChange:i,canEditOrDelete:c=!1}){const[w,d]=l.useState(!1),[p,m]=l.useState(),f=l.useRef(null);l.useEffect(()=>{if(!w)return;let N=!0;const F=f.current;if(!F)return;const L=setTimeout(()=>{N&&es(F)},300);return()=>{N=!1,clearTimeout(L)}},[w]);const u=l.useCallback(N=>{N&&N.stopPropagation(),d(!1),m(void 0),i==null||i(!1)},[i]),x=l.useCallback(async N=>{if(N&&N.stopPropagation(),!p||!s)return;await s(t.id,fn(p))&&(d(!1),m(void 0),i==null||i(!1))},[p,s,t.id,i]),b=l.useMemo(()=>{const N=new Date(t.date),F=j.formatRelativeDate(N,r["%comment_date_today%"],r["%comment_date_yesterday%"]),L=N.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return j.formatReplacementString(r["%comment_dateAtTime%"],{date:F,time:L})},[t.date,r]),v=l.useMemo(()=>t.user,[t.user]),E=l.useMemo(()=>t.user.split(" ").map(N=>N[0]).join("").toUpperCase().slice(0,2),[t.user]),y=l.useMemo(()=>j.sanitizeHtml(t.contents),[t.contents]),_=l.useMemo(()=>{if(o&&c)return n.jsxs(n.Fragment,{children:[n.jsxs(Ze,{onClick:N=>{N.stopPropagation(),d(!0),m(Bl(t.contents)),i==null||i(!0)},children:[n.jsx(k.Pencil,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_editComment%"]]}),n.jsxs(Ze,{onClick:async N=>{N.stopPropagation(),a&&await a(t.id)},children:[n.jsx(k.Trash2,{className:"tw-me-2 tw-h-4 tw-w-4"}),r["%comment_deleteComment%"]]})]})},[c,o,r,t.contents,t.id,a,i]);return n.jsxs("div",{className:h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3",{"tw-text-sm":e}),children:[n.jsx(xr,{className:"tw-h-8 tw-w-8",children:n.jsx(br,{className:"tw-text-xs tw-font-medium",children:E})}),n.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[n.jsx("p",{className:"tw-text-sm tw-font-medium",children:v}),n.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",children:b}),n.jsx("div",{className:"tw-flex-1"}),e&&t.assignedUser!==void 0&&n.jsxs(ye,{variant:"secondary",className:"tw-text-xs tw-font-normal",children:["→ ",cn(t.assignedUser,r)]})]}),w&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-flex tw-flex-col tw-gap-2",ref:f,onKeyDownCapture:N=>{N.key==="Escape"?(N.preventDefault(),N.stopPropagation(),u()):fr(N)&&(N.preventDefault(),N.stopPropagation(),Pt(p)&&x())},onKeyDown:N=>{pr(N),(N.key==="Enter"||N.key===" ")&&N.stopPropagation()},onClick:N=>{N.stopPropagation()},children:[n.jsx(mn,{className:h('[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'),editorSerializedState:p,onSerializedChange:N=>m(N)}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[n.jsx(z,{size:"icon",onClick:u,variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",children:n.jsx(k.X,{})}),n.jsx(z,{size:"icon",onClick:x,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(p),children:n.jsx(k.ArrowUp,{})})]})]}),!w&&n.jsxs(n.Fragment,{children:[t.status==="Resolved"&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_resolved%"]}),t.status==="Todo"&&e&&n.jsx("div",{className:"tw-text-sm tw-italic",children:r["%comment_status_todo%"]}),n.jsx("div",{className:h("tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground","tw-max-w-none","[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground","tw-prose-quoteless",{"tw-line-clamp-3":!o}),dangerouslySetInnerHTML:{__html:y}})]})]}),_&&n.jsxs(oe,{children:[n.jsx(we,{asChild:!0,children:n.jsx(z,{variant:"ghost",size:"icon",children:n.jsx(k.MoreHorizontal,{})})}),n.jsx(Wt,{align:"end",children:_})]})]})}const no={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1,textFormat:0,textStyle:""}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function Wl({classNameForVerseText:t,comments:e,localizedStrings:r,isSelected:o=!1,verseRef:s,assignedUser:a,currentUser:i,handleSelectThread:c,threadId:w,thread:d,threadStatus:p,handleAddCommentToThread:m,handleUpdateComment:f,handleDeleteComment:u,handleReadStatusChange:x,assignableUsers:b,canUserAddCommentToThread:v,canUserAssignThreadCallback:E,canUserResolveThreadCallback:y,canUserEditOrDeleteCommentCallback:_,isRead:N=!1,autoReadDelay:F=5,onVerseRefClick:L}){const[A,T]=l.useState(no),[C,M]=l.useState(void 0),$=o,[V,P]=l.useState(!1),[O,G]=l.useState(!1),[R,U]=l.useState(!1),[_t,Ot]=l.useState(!1),[At,ut]=l.useState(!1),[dt,B]=l.useState(N),[nt,mt]=l.useState(!1),at=l.useRef(void 0),[vt,ee]=l.useState(new Map);l.useEffect(()=>{let S=!0;return(async()=>{const W=y?await y(w):!1;S&&ut(W)})(),()=>{S=!1}},[w,y]),l.useEffect(()=>{let S=!0;if(!o){Ot(!1),ee(new Map);return}return(async()=>{const W=E?await E(w):!1;S&&Ot(W)})(),()=>{S=!1}},[o,w,E]);const ft=l.useMemo(()=>e.filter(S=>!S.deleted),[e]);l.useEffect(()=>{let S=!0;if(!o||!_){ee(new Map);return}return(async()=>{const W=new Map;await Promise.all(ft.map(async Ct=>{const Gt=await _(Ct.id);S&&W.set(Ct.id,Gt)})),S&&ee(W)})(),()=>{S=!1}},[o,ft,_]);const Mt=l.useMemo(()=>ft[0],[ft]),me=l.useRef(null),Bt=l.useRef(void 0),ne=l.useCallback(()=>{var S;(S=Bt.current)==null||S.call(Bt),T(no)},[]),ze=l.useCallback(()=>{const S=!dt;B(S),mt(!S),x==null||x(w,S)},[dt,x,w]);l.useEffect(()=>{P(!1)},[o]),l.useEffect(()=>{if(o&&!dt&&!nt){const S=setTimeout(()=>{B(!0),x==null||x(w,!0)},F*1e3);return at.current=S,()=>clearTimeout(S)}at.current&&(clearTimeout(at.current),at.current=void 0)},[o,dt,nt,F,w,x]);const D=l.useMemo(()=>({singleReply:r["%comment_thread_single_reply%"],multipleReplies:r["%comment_thread_multiple_replies%"]}),[r]),q=l.useMemo(()=>{if(a===void 0)return;if(a==="")return r["%comment_assign_unassigned%"]??"Unassigned";const S=cn(a,r);return j.formatReplacementString(r["%comment_assigned_to%"],{assignedUser:S})},[a,r]),Y=l.useMemo(()=>ft.slice(1),[ft]),X=l.useMemo(()=>Y.length??0,[Y.length]),it=l.useMemo(()=>X>0,[X]),Dt=l.useMemo(()=>V||X<=2?Y:Y.slice(-2),[Y,X,V]),I=l.useMemo(()=>V||X<=2?0:X-2,[X,V]),K=l.useMemo(()=>X===1?D.singleReply:j.formatReplacementString(D.multipleReplies,{count:X}),[X,D]),et=l.useMemo(()=>I===1?D.singleReply:j.formatReplacementString(D.multipleReplies,{count:I}),[I,D]);l.useEffect(()=>{!o&&O&&it&&G(!1)},[o,O,it]);const rt=l.useCallback(async S=>{S&&S.stopPropagation();const ot=Pt(A)?fn(A):void 0;if(C!==void 0){await m({threadId:w,contents:ot,assignedUser:C})&&(M(void 0),ot&&ne());return}ot&&await m({threadId:w,contents:ot})&&ne()},[ne,A,m,C,w]),ht=l.useCallback(async S=>{const ot=Pt(A)?fn(A):void 0,W=await m({...S,contents:ot,assignedUser:C??S.assignedUser});return W&&ot&&ne(),W&&C!==void 0&&M(void 0),W},[ne,A,m,C]);if(Mt)return n.jsx(hr,{role:"option","aria-selected":o,id:w,className:h("tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer hover:tw-shadow-md":!o},{"tw-bg-primary-foreground":!o&&p!=="Resolved"&&dt,"tw-bg-background":o&&p!=="Resolved"&&dt,"tw-bg-muted":p==="Resolved","tw-bg-accent":!dt&&!o&&p!=="Resolved"}),onClick:()=>{c(w)},tabIndex:-1,children:n.jsxs(gr,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[q&&n.jsx(ye,{className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:q}),n.jsx(z,{variant:"ghost",size:"icon",onClick:S=>{S.stopPropagation(),ze()},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":dt?"Mark as unread":"Mark as read",children:dt?n.jsx(k.MailOpen,{}):n.jsx(k.Mail,{})}),At&&p!=="Resolved"&&n.jsx(z,{variant:"ghost",size:"icon",className:h("tw-ms-auto","tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10","tw-opacity-0 group-hover:tw-opacity-100"),onClick:S=>{S.stopPropagation(),ht({threadId:w,status:"Resolved"})},"aria-label":"Resolve thread",children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})]}),n.jsx("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:n.jsxs("p",{ref:me,className:h("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":$},{"tw-whitespace-nowrap":!$}),children:[s&&L?n.jsx(z,{variant:"ghost",size:"sm",className:"tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",onClick:S=>{S.stopPropagation(),L(d)},children:s}):s,n.jsxs("span",{className:t,children:[Mt.contextBefore,n.jsx("span",{className:"tw-font-bold",children:Mt.selectedText}),Mt.contextAfter]})]})}),n.jsx(eo,{comment:Mt,localizedStrings:r,isThreadExpanded:o,threadStatus:p,handleAddCommentToThread:ht,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:G,canEditOrDelete:(!O&&vt.get(Mt.id))??!1,canUserResolveThread:At})]}),n.jsxs(n.Fragment,{children:[it&&!o&&n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(de,{})}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:K})]}),!o&&Pt(A)&&n.jsx(mn,{editorSerializedState:A,onSerializedChange:S=>T(S),placeholder:r["%comment_replyOrAssign%"]}),o&&n.jsxs(n.Fragment,{children:[I>0&&n.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:S=>{S.stopPropagation(),P(!0)},role:"button",tabIndex:0,onKeyDown:S=>{(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),S.stopPropagation(),P(!0))},children:[n.jsx("div",{className:"tw-w-8",children:n.jsx(de,{})}),n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:et}),V?n.jsx(k.ChevronUp,{}):n.jsx(k.ChevronDown,{})]})]}),Dt.map(S=>n.jsx("div",{children:n.jsx(eo,{comment:S,localizedStrings:r,isReply:!0,isThreadExpanded:o,handleUpdateComment:f,handleDeleteComment:u,onEditingChange:G,canEditOrDelete:(!O&&vt.get(S.id))??!1})},S.id)),v!==!1&&(!O||Pt(A))&&n.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:S=>S.stopPropagation(),onKeyDownCapture:S=>{fr(S)&&(S.preventDefault(),S.stopPropagation(),(Pt(A)||C!==void 0)&&rt())},onKeyDown:S=>{pr(S),(S.key==="Enter"||S.key===" ")&&S.stopPropagation()},children:[n.jsx(mn,{editorSerializedState:A,onSerializedChange:S=>T(S),placeholder:p==="Resolved"?r["%comment_reopenResolved%"]:r["%comment_replyOrAssign%"],autoFocus:!0,onClear:S=>{Bt.current=S}}),n.jsxs("div",{className:"tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2",children:[C!==void 0&&n.jsx("span",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:j.formatReplacementString(r["%comment_assigning_to%"]??"Assigning to: {assignedUser}",{assignedUser:cn(C,r)})}),n.jsxs(Qt,{open:R,onOpenChange:U,children:[n.jsx(ae,{asChild:!0,children:n.jsx(z,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!_t||!b||b.length===0||!b.includes(i),"aria-label":"Assign user",children:n.jsx(k.AtSign,{})})}),n.jsx(Vt,{className:"tw-w-auto tw-p-0",align:"end",onKeyDown:S=>{S.key==="Escape"&&(S.stopPropagation(),U(!1))},children:n.jsx(Zt,{children:n.jsx(Jt,{children:b==null?void 0:b.map(S=>n.jsx(Ft,{onSelect:()=>{M(S!==a?S:void 0),U(!1)},className:"tw-flex tw-items-center",children:n.jsx("span",{children:cn(S,r)})},S||"unassigned"))})})})]}),n.jsx(z,{size:"icon",onClick:rt,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Pt(A)&&C===void 0,"aria-label":"Submit comment",children:n.jsx(k.ArrowUp,{})})]})]})]})]})]})})}function Zl({className:t="",classNameForVerseText:e,threads:r,currentUser:o,localizedStrings:s,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,selectedThreadId:x,onSelectedThreadChange:b,onVerseRefClick:v}){const[E,y]=l.useState(new Set),[_,N]=l.useState();l.useEffect(()=>{x&&(y(P=>new Set(P).add(x)),N(x))},[x]);const F=r.filter(P=>P.comments.some(O=>!O.deleted)),L=F.map(P=>({id:P.id})),A=l.useCallback(P=>{y(O=>new Set(O).add(P.id)),N(P.id),b==null||b(P.id)},[b]),T=l.useCallback(P=>{const O=E.has(P);y(G=>{const R=new Set(G);return R.has(P)?R.delete(P):R.add(P),R}),N(P),b==null||b(O?void 0:P)},[E,b]),{listboxRef:C,activeId:M,handleKeyDown:$}=ss({options:L,onOptionSelect:A}),V=l.useCallback(P=>{P.key==="Escape"?(_&&E.has(_)&&(y(O=>{const G=new Set(O);return G.delete(_),G}),N(void 0),b==null||b(void 0)),P.preventDefault(),P.stopPropagation()):$(P)},[_,E,$,b]);return n.jsx("div",{id:"comment-list",role:"listbox",tabIndex:0,ref:C,"aria-activedescendant":M??void 0,"aria-label":"Comments",className:h("tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:V,children:F.map(P=>n.jsx("div",{className:h({"tw-opacity-60":P.status==="Resolved"}),children:n.jsx(Wl,{classNameForVerseText:e,comments:P.comments,localizedStrings:s,verseRef:P.verseRef,handleSelectThread:T,threadId:P.id,thread:P,isRead:P.isRead,isSelected:E.has(P.id),currentUser:o,assignedUser:P.assignedUser,threadStatus:P.status,handleAddCommentToThread:a,handleUpdateComment:i,handleDeleteComment:c,handleReadStatusChange:w,assignableUsers:d,canUserAddCommentToThread:p,canUserAssignThreadCallback:m,canUserResolveThreadCallback:f,canUserEditOrDeleteCommentCallback:u,onVerseRefClick:v})},P.id))})}function Jl({table:t}){return n.jsxs(oe,{children:[n.jsx(po.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(z,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Wt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ve,{children:"Toggle columns"}),n.jsx(Ce,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Yt,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const je=st.Root,hs=st.Group,Ne=st.Value,gs=se.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),pe=l.forwardRef(({className:t,children:e,size:r,...o},s)=>{const a=ct();return n.jsxs(st.Trigger,{className:h(gs({size:r,className:t})),ref:s,...o,dir:a,children:[e,n.jsx(st.Icon,{asChild:!0,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});pe.displayName=st.Trigger.displayName;const _r=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollUpButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronUp,{className:"tw-h-4 tw-w-4"})}));_r.displayName=st.ScrollUpButton.displayName;const Cr=l.forwardRef(({className:t,...e},r)=>n.jsx(st.ScrollDownButton,{ref:r,className:h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(k.ChevronDown,{className:"tw-h-4 tw-w-4"})}));Cr.displayName=st.ScrollDownButton.displayName;const ue=l.forwardRef(({className:t,children:e,position:r="popper",...o},s)=>{const a=ct();return n.jsx(st.Portal,{children:n.jsxs(st.Content,{ref:s,className:h("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(_r,{}),n.jsx(st.Viewport,{className:h("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:n.jsx("div",{dir:a,children:e})}),n.jsx(Cr,{})]})})});ue.displayName=st.Content.displayName;const xs=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Label,{ref:r,className:h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));xs.displayName=st.Label.displayName;const Et=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(st.Item,{ref:o,className:h("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(st.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),n.jsx(st.ItemText,{children:e})]}));Et.displayName=st.Item.displayName;const bs=l.forwardRef(({className:t,...e},r)=>n.jsx(st.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));bs.displayName=st.Separator.displayName;function Ql({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(je,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(pe,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(Ne,{placeholder:t.getState().pagination.pageSize})}),n.jsx(ue,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(Et,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(z,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(z,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const ro=`
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
`;function tc(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Je(t,e){const r=e?`${ro}, ${e}`:ro;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&tc(o))}const Qe=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const s=l.useRef(null);l.useEffect(()=>{typeof o=="function"?o(s.current):o&&"current"in o&&(o.current=s.current)},[o]),l.useEffect(()=>{const i=s.current;if(!i)return;const c=()=>{requestAnimationFrame(()=>{Je(i,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};c();const w=new MutationObserver(()=>{c()});return w.observe(i,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{w.disconnect()}},[]);const a=i=>{const{current:c}=s;if(c){if(i.key==="ArrowDown"){i.preventDefault(),Je(c)[0].focus();return}i.key===" "&&document.activeElement===c&&i.preventDefault()}};return n.jsx("div",{className:h("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:a,ref:s,className:h("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});Qe.displayName="Table";const tn=l.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:h({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...r}));tn.displayName="TableHeader";const en=l.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:h("[&_tr:last-child]:tw-border-0",t),...e}));en.displayName="TableBody";const vs=l.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));vs.displayName="TableFooter";function ec(t){l.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const s=t.current?Je(t.current):[],a=s.indexOf(document.activeElement),i=o.key==="ArrowRight"?a+1:a-1;i>=0&&i<s.length&&s[i].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function nc(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function rc(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const Ht=l.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...s},a)=>{const i=l.useRef(null);l.useEffect(()=>{typeof a=="function"?a(i.current):a&&"current"in a&&(a.current=i.current)},[a]),ec(i);const c=l.useMemo(()=>i.current?Je(i.current):[],[i]),w=l.useCallback(p=>{const{current:m}=i;if(!m||!m.parentElement)return;const f=m.closest("table"),u=f?Je(f).filter(v=>v.tagName==="TR"):[],x=u.indexOf(m),b=c.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),rc(u,x,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),nc(c,b,p.key);else if(p.key==="Escape"){p.preventDefault();const v=m.closest("table");v&&v.focus()}e==null||e(p)},[i,c,e]),d=l.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:i,tabIndex:-1,onKeyDown:w,onFocus:d,className:h("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...s})});Ht.displayName="TableRow";const Ae=l.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:h("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ae.displayName="TableHead";const ce=l.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));ce.displayName="TableCell";const ys=l.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:h("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));ys.displayName="TableCaption";function hn({className:t,...e}){return n.jsx("div",{className:h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function js({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:s=!1,stickyHeader:a=!1,onRowClickHandler:i=()=>{},id:c,isLoading:w=!1,noResultsMessage:d}){var L;const[p,m]=l.useState([]),[f,u]=l.useState([]),[x,b]=l.useState({}),[v,E]=l.useState({}),y=l.useMemo(()=>e??[],[e]),_=bt.useReactTable({data:y,columns:t,getCoreRowModel:bt.getCoreRowModel(),...r&&{getPaginationRowModel:bt.getPaginationRowModel()},onSortingChange:m,getSortedRowModel:bt.getSortedRowModel(),onColumnFiltersChange:u,getFilteredRowModel:bt.getFilteredRowModel(),onColumnVisibilityChange:b,onRowSelectionChange:E,state:{sorting:p,columnFilters:f,columnVisibility:x,rowSelection:v}}),N=_.getVisibleFlatColumns();let F;return w?F=Array.from({length:10}).map((C,M)=>`skeleton-row-${M}`).map(C=>n.jsx(Ht,{className:"hover:tw-bg-transparent",children:n.jsx(ce,{colSpan:N.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(hn,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},C)):((L=_.getRowModel().rows)==null?void 0:L.length)>0?F=_.getRowModel().rows.map(A=>n.jsx(Ht,{onClick:()=>i(A,_),"data-state":A.getIsSelected()&&"selected",children:A.getVisibleCells().map(T=>n.jsx(ce,{children:bt.flexRender(T.column.columnDef.cell,T.getContext())},T.id))},A.id)):F=n.jsx(Ht,{children:n.jsx(ce,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:c,children:[s&&n.jsx(Jl,{table:_}),n.jsxs(Qe,{stickyHeader:a,children:[n.jsx(tn,{stickyHeader:a,children:_.getHeaderGroups().map(A=>n.jsx(Ht,{children:A.headers.map(T=>n.jsx(Ae,{className:"tw-p-0",children:T.isPlaceholder?void 0:bt.flexRender(T.column.columnDef.header,T.getContext())},T.id))},A.id))}),n.jsx(en,{children:F})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(z,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(z,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(Ql,{table:_})]})}function oc({id:t,markdown:e,className:r,anchorTarget:o,truncate:s}){const a=l.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:h("pr-twp tw-prose",{"tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words":s},r),children:n.jsx(Qa,{options:a,children:e})})}const Ns=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),oo=(t,e)=>t[e]??e;function ks({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const s=oo(r,"%webView_error_dump_header%"),a=oo(r,"%webView_error_dump_info_message%");function i(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:s}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:a})]}),n.jsx(z,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>i(),children:n.jsx(k.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const sc=Object.freeze([...Ns,"%webView_error_dump_copied_message%"]);function ac({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:s,id:a}){const[i,c]=l.useState(!1),w=()=>{c(!0),e&&e()},d=p=>{p||c(!1)};return n.jsxs(Qt,{onOpenChange:d,children:[n.jsx(ae,{asChild:!0,children:o}),n.jsxs(Vt,{id:a,className:h("tw-min-w-80 tw-max-w-96",s),children:[i&&r["%webView_error_dump_copied_message%"]&&n.jsx(wt,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(ks,{errorDetails:t,handleCopyNotify:w,localizedStrings:r})]})]})}var _s=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(_s||{});function ic({id:t,label:e,groups:r}){const[o,s]=l.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[a,i]=l.useState({}),c=(d,p)=>{const m=!o[d][p];s(u=>(u[d][p]=m,{...u}));const f=r[d].items[p];f.onUpdate(f.id,m)},w=(d,p)=>{i(f=>(f[d]=p,{...f}));const m=r[d].items.find(f=>f.id===p);m?m.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(oe,{children:[n.jsx(we,{asChild:!0,children:n.jsxs(z,{variant:"default",children:[n.jsx(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Wt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Ve,{children:d.label}),n.jsx(yr,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((m,f)=>n.jsx("div",{children:n.jsx(Yt,{checked:o[p][f],onCheckedChange:()=>c(p,f),children:m.label})},m.id))}):n.jsx(ms,{value:a[p],onValueChange:m=>w(p,m),children:d.items.map(m=>n.jsx("div",{children:n.jsx(kr,{value:m.id,children:m.label})},m.id))})}),n.jsx(Ce,{})]},d.label))})]})})}function lc({id:t,category:e,downloads:r,languages:o,moreInfoUrl:s,handleMoreInfoLinkClick:a,supportUrl:i,handleSupportLinkClick:c}){const w=new j.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,m)=>p+m,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(k.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:w})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(s||i)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[s&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(z,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(k.Link,{className:"tw-h-4 tw-w-4"})]})}),i&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(z,{onClick:()=>c(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(k.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function cc({id:t,versionHistory:e}){const[r,o]=l.useState(!1),s=new Date;function a(c){const w=new Date(c),d=new Date(s.getTime()-w.getTime()),p=d.getUTCFullYear()-1970,m=d.getUTCMonth(),f=d.getUTCDate()-1;let u="";return p>0?u=`${p.toString()} year${p===1?"":"s"} ago`:m>0?u=`${m.toString()} month${m===1?"":"s"} ago`:f===0?u="today":u=`${f.toString()} day${f===1?"":"s"} ago`,u}const i=Object.entries(e).sort((c,w)=>w[0].localeCompare(c[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?i:i.slice(0,5)).map(c=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:c[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",c[0]]}),n.jsx("div",{children:a(c[1].date)})]})]},c[0]))}),i.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function dc({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:s,currentVersion:a}){const i=l.useMemo(()=>j.formatBytes(r),[r]),w=(d=>{const p=new Intl.DisplayNames(j.getCurrentLocale(),{type:"language"});return d.map(m=>p.of(m))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(s).length>0&&n.jsx(cc,{versionHistory:s}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:i})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:a}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:w.join(", ")})]})})]})]})]})})}function Cs({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:s=!1,selectAllText:a="Select All",clearAllText:i="Clear All",commandEmptyMessage:c="No entries found",customSelectedText:w,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:m=!1,sortSelected:f=!1,icon:u=void 0,className:x=void 0,variant:b="ghost",id:v}){const[E,y]=l.useState(!1),_=l.useCallback(M=>{var V;const $=(V=t.find(P=>P.label===M))==null?void 0:V.value;$&&r(e.includes($)?e.filter(P=>P!==$):[...e,$])},[t,e,r]),N=()=>w||o,F=l.useMemo(()=>{if(!f)return t;const M=t.filter(V=>V.starred).sort((V,P)=>V.label.localeCompare(P.label)),$=t.filter(V=>!V.starred).sort((V,P)=>{const O=e.includes(V.value),G=e.includes(P.value);return O&&!G?-1:!O&&G?1:V.label.localeCompare(P.label)});return[...M,...$]},[t,e,f]),L=()=>{r(t.map(M=>M.value))},A=()=>{r([])},T=d??E,C=p??y;return n.jsx("div",{id:v,className:x,children:n.jsxs(Qt,{open:T,onOpenChange:C,children:[n.jsx(ae,{asChild:!0,children:n.jsxs(z,{variant:b,role:"combobox","aria-expanded":T,className:"tw-group tw-w-full tw-justify-between",disabled:m,children:[n.jsxs("div",{className:"tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2",children:[u&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:u})}),n.jsx("span",{className:h("tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"),children:N()})]}),n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Vt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Zt,{children:[n.jsx(_e,{placeholder:`Search ${o.toLowerCase()}...`}),s&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:L,children:a}),n.jsx(z,{variant:"ghost",size:"sm",onClick:A,children:i})]}),n.jsxs(Jt,{children:[n.jsx($e,{children:c}),n.jsx(Lt,{children:F.map(M=>n.jsxs(Ft,{value:M.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(k.Check,{className:h("tw-h-4 tw-w-4",e.includes(M.value)?"tw-opacity-100":"tw-opacity-0")})}),M.starred&&n.jsx(k.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:M.label}),M.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:M.secondaryLabel})]},M.label))})]})]})})]})})}function wc({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d,badgesPlaceholder:p,id:m}){return n.jsxs("div",{id:m,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(Cs,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:s,customSelectedText:a,isDisabled:i,sortSelected:c,icon:w,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var u;return n.jsxs(ye,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(z,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(x=>x!==f)),children:n.jsx(k.X,{className:"tw-h-3 tw-w-3"})}),(u=t.find(x=>x.value===f))==null?void 0:u.label]},f)})}):n.jsx(wt,{children:p})]})}const gn=l.forwardRef(({className:t,...e},r)=>n.jsx("kbd",{ref:r,className:h("pr-twp tw-rounded tw-border tw-border-border tw-bg-muted tw-px-1 tw-py-0.5 tw-font-mono tw-text-xs",t),...e}));gn.displayName="Kbd";const Es=Object.freeze(["%undoButton_tooltip%","%redoButton_tooltip%"]),so=(t,e)=>t[e]??e;function Ss({onUndoClick:t,onRedoClick:e,canUndo:r=!0,canRedo:o=!0,localizedStrings:s={},showKeyboardShortcuts:a=!0,className:i="tw-h-6 tw-w-6",variant:c="ghost"}){const w=l.useMemo(()=>/Macintosh/i.test(navigator.userAgent),[]),d=so(s,"%undoButton_tooltip%"),p=so(s,"%redoButton_tooltip%"),m=c==="secondary"||c==="default";return n.jsxs(rs,{children:[n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(z,{"aria-label":d,className:i,size:"icon",onClick:t,disabled:!r,variant:c,children:n.jsx(k.Undo,{})})}),n.jsx(jt,{children:n.jsxs("p",{children:[d,a&&n.jsxs(n.Fragment,{children:[" ",n.jsx(gn,{children:w?"⌘Z":"Ctrl+Z"})]})]})})]})}),e&&m&&n.jsx(os,{}),e&&n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(z,{"aria-label":p,className:i,size:"icon",onClick:e,disabled:!o,variant:c,children:n.jsx(k.Redo,{})})}),n.jsx(jt,{children:n.jsxs("p",{children:[p,a&&n.jsxs(n.Fragment,{children:[" ",n.jsx(gn,{children:w?"⌘⇧Z":"Ctrl+Y"})]})]})})]})})]})}function Rs({children:t,editorRef:e,canUndo:r=!0,canRedo:o=!0}){const s=l.useRef(null);return l.useEffect(()=>{var w;const a=/Macintosh/i.test(navigator.userAgent),i=((w=s.current)==null?void 0:w.querySelector(".editor-input"))??void 0,c=d=>{var m,f,u,x;if(!i||document.activeElement!==i)return;const p=d.key.toLowerCase();if(a){if(!d.metaKey)return;!d.shiftKey&&p==="z"?(d.preventDefault(),r&&((m=e.current)==null||m.undo())):d.shiftKey&&p==="z"&&(d.preventDefault(),o&&((f=e.current)==null||f.redo()))}else{if(!d.ctrlKey)return;!d.shiftKey&&p==="z"?(d.preventDefault(),r&&((u=e.current)==null||u.undo())):(p==="y"||d.shiftKey&&p==="z")&&(d.preventDefault(),o&&((x=e.current)==null||x.redo()))}};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[o,r,e]),n.jsx("div",{ref:s,children:t})}const Ee=l.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:h("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:o,...r}));Ee.displayName="Input";const pc=(t,e,r)=>t==="generated"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"+"})," ",e["%footnoteEditor_callerDropdown_item_generated%"]]}):t==="hidden"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"-"})," ",e["%footnoteEditor_callerDropdown_item_hidden%"]]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:r})," ",e["%footnoteEditor_callerDropdown_item_custom%"]]});function uc({callerType:t,updateCallerType:e,customCaller:r,updateCustomCaller:o,localizedStrings:s}){const a=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),[w,d]=l.useState(t),[p,m]=l.useState(r),[f,u]=l.useState(!1);l.useEffect(()=>{d(t)},[t]),l.useEffect(()=>{p!==r&&m(r)},[r]);const x=v=>{c.current=!1,u(v),v||(w!=="custom"||p?(e(w),o(p)):(d(t),m(r)))},b=v=>{var E,y,_,N;v.stopPropagation(),document.activeElement===i.current&&v.key==="ArrowDown"||v.key==="ArrowRight"?((E=a.current)==null||E.focus(),c.current=!0):document.activeElement===a.current&&v.key==="ArrowUp"?((y=i.current)==null||y.focus(),c.current=!1):document.activeElement===a.current&&v.key==="ArrowLeft"&&((_=a.current)==null?void 0:_.selectionStart)===0&&((N=i.current)==null||N.focus(),c.current=!1),w==="custom"&&v.key==="Enter"&&(document.activeElement===i.current||document.activeElement===a.current)&&x(!1)};return n.jsxs(oe,{open:f,onOpenChange:x,children:[n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(we,{asChild:!0,children:n.jsx(z,{variant:"outline",className:"tw-h-6",children:pc(t,s,r)})})}),n.jsx(jt,{children:s["%footnoteEditor_callerDropdown_tooltip%"]})]})}),n.jsxs(Wt,{style:{zIndex:Zn},onClick:()=>{c.current&&(c.current=!1)},onKeyDown:b,onMouseMove:()=>{var v;c.current&&((v=a.current)==null||v.focus())},children:[n.jsx(Ve,{children:s["%footnoteEditor_callerDropdown_label%"]}),n.jsx(Ce,{}),n.jsx(Yt,{checked:w==="generated",onCheckedChange:()=>d("generated"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_generated%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:It.GENERATOR_NOTE_CALLER})]})}),n.jsx(Yt,{checked:w==="hidden",onCheckedChange:()=>d("hidden"),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_hidden%"]}),n.jsx("span",{className:"tw-w-10 tw-text-center",children:It.HIDDEN_NOTE_CALLER})]})}),n.jsx(Yt,{ref:i,checked:w==="custom",onCheckedChange:()=>d("custom"),onClick:v=>{var E;v.stopPropagation(),c.current=!0,(E=a.current)==null||E.focus()},onSelect:v=>v.preventDefault(),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-between",children:[n.jsx("span",{children:s["%footnoteEditor_callerDropdown_item_custom%"]}),n.jsx(Ee,{tabIndex:0,onMouseDown:v=>{v.stopPropagation(),d("custom"),c.current=!0},ref:a,className:"tw-h-auto tw-w-10 tw-p-0 tw-text-center",value:p,onKeyDown:v=>{v.key==="Enter"||v.key==="ArrowUp"||v.key==="ArrowDown"||v.key==="ArrowLeft"||v.key==="ArrowRight"||v.stopPropagation()},maxLength:1,onChange:v=>m(v.target.value)})]})})]})]})}const mc=(t,e)=>t==="f"?n.jsxs(n.Fragment,{children:[n.jsx(k.FunctionSquare,{})," ",e["%footnoteEditor_noteType_footnote_label%"]]}):t==="fe"?n.jsxs(n.Fragment,{children:[n.jsx(k.SquareSigma,{})," ",e["%footnoteEditor_noteType_endNote_label%"]]}):n.jsxs(n.Fragment,{children:[n.jsx(k.SquareX,{})," ",e["%footnoteEditor_noteType_crossReference_label%"]]}),fc=(t,e)=>{if(t==="x")return e["%footnoteEditor_noteType_crossReference_label%"];let r=e["%footnoteEditor_noteType_endNote_label%"];return t==="f"&&(r=e["%footnoteEditor_noteType_footnote_label%"]),j.formatReplacementString(e["%footnoteEditor_noteType_tooltip%"]??"",{noteType:r})};function hc({noteType:t,handleNoteTypeChange:e,localizedStrings:r,isTypeSwitchable:o}){return n.jsxs(oe,{children:[n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(co.TooltipTrigger,{asChild:!0,children:n.jsx(we,{asChild:!0,children:n.jsx(z,{variant:"outline",className:"tw-h-6",children:mc(t,r)})})}),n.jsx(jt,{children:n.jsx("p",{children:fc(t,r)})})]})}),n.jsxs(Wt,{style:{zIndex:Zn},children:[n.jsx(Ve,{children:r["%footnoteEditor_noteTypeDropdown_label%"]}),n.jsx(Ce,{}),n.jsxs(Yt,{disabled:t!=="x"&&!o,checked:t==="x",onCheckedChange:()=>e("x"),className:"tw-gap-2",children:[n.jsx(k.SquareX,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_crossReference_label%"]})]}),n.jsxs(Yt,{disabled:t==="x"&&!o,checked:t==="f",onCheckedChange:()=>e("f"),className:"tw-gap-2",children:[n.jsx(k.FunctionSquare,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_footnote_label%"]})]}),n.jsxs(Yt,{disabled:t==="x"&&!o,checked:t==="fe",onCheckedChange:()=>e("fe"),className:"tw-gap-2",children:[n.jsx(k.SquareSigma,{}),n.jsx("span",{children:r["%footnoteEditor_noteType_endNote_label%"]})]})]})]})}const Ts=Object.freeze(["%markerMenu_deprecated_label%","%markerMenu_disallowed_label%","%markerMenu_noResults%","%markerMenu_searchPlaceholder%"]);function gc({icon:t,className:e}){const r=t??k.Ban;return n.jsx(r,{className:e,size:16})}function ao({item:t,localizedStrings:e}){return n.jsxs(Ft,{className:"tw-flex tw-gap-2 hover:tw-bg-accent",disabled:t.isDisallowed||t.isDeprecated,onSelect:t.action,children:[n.jsx("div",{className:"tw-w-8 tw-min-w-8",children:t.marker?n.jsx("span",{className:"tw-text-xs",children:t.marker}):n.jsx("div",{children:n.jsx(gc,{icon:t.icon})})}),n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm",children:t.title}),t.subtitle&&n.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:t.subtitle})]}),(t.isDisallowed||t.isDeprecated)&&n.jsx(ko,{className:"tw-font-sans",children:t.isDisallowed?e["%markerMenu_disallowed_label%"]:e["%markerMenu_deprecated_label%"]})]})}function Ms({localizedStrings:t,markerMenuItems:e,searchRef:r}){const[o,s]=l.useState(""),[a,i]=l.useMemo(()=>{const c=o.trim().toLowerCase();if(!c)return[e,[]];const w=e.filter(p=>{var m;return(m=p.marker)==null?void 0:m.toLowerCase().includes(c)}),d=e.filter(p=>p.title.toLowerCase().includes(c)&&!w.includes(p));return[w,d]},[o,e]);return n.jsxs(Zt,{className:"tw-p-1",shouldFilter:!1,loop:!0,children:[n.jsx(_e,{className:"marker-menu-search",ref:r,value:o,onValueChange:c=>s(c),placeholder:t["%markerMenu_searchPlaceholder%"]}),n.jsxs(Jt,{children:[n.jsx($e,{children:t["%markerMenu_noResults%"]}),n.jsx(Lt,{children:a.map(c=>{var w;return n.jsx(ao,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})}),i.length>0&&n.jsxs(n.Fragment,{children:[a.length>0&&n.jsx(nr,{alwaysRender:!0}),n.jsx(Lt,{children:i.map(c=>{var w;return n.jsx(ao,{item:c,localizedStrings:t},`item-${c.marker??((w=c.icon)==null?void 0:w.displayName)}-${c.title.replaceAll(" ","")}`)})})]})]})]})}function xc(t,e,r,o){if(!o||o==="p")return[];const s=j.usfmMarkers[o];if(!(s!=null&&s.children))return[];const a=[];return Object.entries(s.children).forEach(([,i])=>{a.push(...i.map(c=>({marker:c,title:r[j.usfmMarkers[c].description]??j.usfmMarkers[c].description,action:()=>{var w;(w=t.current)==null||w.insertMarker(c),e()}})))}),a.sort((i,c)=>(i.marker??i.title).localeCompare(c.marker??c.title))}function bc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="ft"&&(e.style="xt"),e.style==="fr"&&(e.style="xo"),e.style==="fq"&&(e.style="xq"))}function vc(t){var r;const e=(r=t.attributes)==null?void 0:r.char;e.style&&(e.style==="xt"&&(e.style="ft"),e.style==="xo"&&(e.style="fr"),e.style==="xq"&&(e.style="fq"))}const yc={type:"USJ",version:"3.1",content:[{type:"para"}]};function jc({classNameForEditor:t,noteOps:e,onChange:r,onClose:o,scrRef:s,noteKey:a,editorOptions:i,defaultMarkerMenuTrigger:c,localizedStrings:w,parentEditorRef:d}){const p=l.useRef(null),m=l.useRef(null),f=l.useRef(null),u=l.useRef(null);l.useLayoutEffect(()=>{if(!u.current)return;const{width:I}=u.current.getBoundingClientRect();I>0&&(u.current.style.width=`${I}px`)},[]);const[x,b]=l.useState("generated"),[v,E]=l.useState("generated"),[y,_]=l.useState("*"),[N,F]=l.useState("*"),[L,A]=l.useState("f"),[T,C]=l.useState(!1),[M,$]=l.useState(!0),[V,P]=l.useState(!1),O=l.useRef(!1),G=l.useRef(""),[R,U]=l.useState(!1),[_t,Ot]=l.useState(),[At,ut]=l.useState(),[dt,B]=l.useState(),[nt,mt]=l.useState(),at=l.useRef(null),vt=l.useMemo(()=>({...i,markerMenuTrigger:c,hasExternalUI:!0,view:{...i.view??It.getDefaultViewOptions(),noteMode:"expanded"}}),[i,c]),ee=l.useMemo(()=>xc(p,()=>U(!1),w,nt),[w,nt]);l.useEffect(()=>{var I;R||(I=p.current)==null||I.focus()},[L,R]),l.useEffect(()=>{var et,rt;let I;O.current=!1,$(!0);const K=e==null?void 0:e.at(0);if(K&&It.isInsertEmbedOpOfType("note",K)){const ht=(et=K.insert.note)==null?void 0:et.caller;let S="custom";ht===It.GENERATOR_NOTE_CALLER?S="generated":ht===It.HIDDEN_NOTE_CALLER?S="hidden":ht&&(_(ht),F(ht)),b(S),E(S),A(((rt=K.insert.note)==null?void 0:rt.style)??"f"),I=setTimeout(()=>{var ot;(ot=p.current)==null||ot.applyUpdate([K])},0)}return()=>{I&&clearTimeout(I)}},[e,a]);const ft=l.useCallback((I,K,et=!1)=>{var ht,S,ot;const rt=(S=(ht=p.current)==null?void 0:ht.getNoteOps(0))==null?void 0:S.at(0);if(rt&&It.isInsertEmbedOpOfType("note",rt)){if(rt.insert.note){let W;I==="custom"?W=K:I==="generated"?W=It.GENERATOR_NOTE_CALLER:W=It.HIDDEN_NOTE_CALLER,rt.insert.note.caller=W}r==null||r([rt]),et&&d&&a&&((ot=d.current)==null||ot.replaceEmbedUpdate(a,[rt]))}},[a,r,d]),Mt=l.useCallback(()=>{ft(x,y,!0),o()},[x,y,o,ft]),me=l.useRef(Mt);l.useLayoutEffect(()=>{me.current=Mt});const Bt=l.useRef({book:s.book,chapterNum:s.chapterNum});l.useLayoutEffect(()=>{(Bt.current.book!==s.book||Bt.current.chapterNum!==s.chapterNum)&&(Bt.current={book:s.book,chapterNum:s.chapterNum},me.current())},[s.book,s.chapterNum]);const ne=()=>{var K;const I=(K=m.current)==null?void 0:K.getElementsByClassName("editor-input")[0];I!=null&&I.textContent&&navigator.clipboard.writeText(I.textContent)},ze=l.useCallback(I=>{b(I),ft(I,y)},[y,ft]),D=l.useCallback(I=>{_(I),ft(x,I)},[x,ft]),q=I=>{var et,rt,ht,S,ot;A(I);const K=(rt=(et=p.current)==null?void 0:et.getNoteOps(0))==null?void 0:rt.at(0);if(K&&It.isInsertEmbedOpOfType("note",K)){K.insert.note&&(K.insert.note.style=I);const W=(S=(ht=K.insert.note)==null?void 0:ht.contents)==null?void 0:S.ops;L!=="x"&&I==="x"?W==null||W.forEach(Ct=>bc(Ct)):L==="x"&&I!=="x"&&(W==null||W.forEach(Ct=>vc(Ct))),(ot=p.current)==null||ot.applyUpdate([K,{delete:1}])}},Y=I=>{mt(I.contextMarker),P(I.canRedo)},X=l.useCallback(I=>{var et,rt,ht,S,ot;const K=(rt=(et=p.current)==null?void 0:et.getNoteOps(0))==null?void 0:rt.at(0);if(K&&It.isInsertEmbedOpOfType("note",K)){I.content.length>1&&setTimeout(()=>{var Gt;(Gt=p.current)==null||Gt.applyUpdate([{retain:2},{delete:1}])},0);const W=(ht=K.insert.note)==null?void 0:ht.style,Ct=(ot=(S=K.insert.note)==null?void 0:S.contents)==null?void 0:ot.ops;if(W||C(!1),C(W==="x"?!!(Ct!=null&&Ct.every(Gt=>{var Be,Ge;if(!((Be=Gt.attributes)!=null&&Be.char))return!0;const fe=((Ge=Gt.attributes)==null?void 0:Ge.char).style;return fe==="xt"||fe==="xo"||fe==="xq"})):!!(Ct!=null&&Ct.every(Gt=>{var Be,Ge;if(!((Be=Gt.attributes)!=null&&Be.char))return!0;const fe=((Ge=Gt.attributes)==null?void 0:Ge.char).style;return fe==="ft"||fe==="fr"||fe==="fq"}))),!O.current){O.current=!0,G.current=JSON.stringify(K),$(!0);return}$(JSON.stringify(K)===G.current),ft(x,y)}else C(!1),$(!0)},[x,y,ft]),it=l.useCallback(()=>{const I=window.getSelection();if(f.current&&ee.length&&I&&I.rangeCount>0){const K=I.getRangeAt(0).getBoundingClientRect(),et=f.current.getBoundingClientRect();Ot(K.left-et.left),ut(K.top-et.top),B(K.height),U(!0)}},[ee,f]);l.useEffect(()=>{const I=()=>{R&&U(!1)};return window.addEventListener("click",I),()=>{window.removeEventListener("click",I)}},[R]),l.useEffect(()=>{var I;R&&((I=at.current)==null||I.focus())},[R]),l.useEffect(()=>{var et;const I=((et=m.current)==null?void 0:et.querySelector(".editor-input"))??void 0,K=rt=>{!R&&I&&document.activeElement===I&&rt.key===c?(rt.preventDefault(),it()):R&&rt.key==="Escape"&&(rt.preventDefault(),U(!1))};return document.addEventListener("keydown",K),()=>{document.removeEventListener("keydown",K)}},[R,it,c]);const Dt=w["%footnoteEditor_copyButton_tooltip%"];return n.jsxs(n.Fragment,{children:[n.jsxs("div",{ref:u,className:"footnote-editor tw-grid tw-gap-[12px]",children:[n.jsxs("div",{className:"tw-flex",children:[n.jsxs("div",{className:"tw-flex tw-gap-4",children:[n.jsx(hc,{isTypeSwitchable:T,noteType:L,handleNoteTypeChange:q,localizedStrings:w}),n.jsx(uc,{callerType:x,updateCallerType:ze,customCaller:y,updateCustomCaller:D,localizedStrings:w})]}),n.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[n.jsx(Ss,{onUndoClick:()=>{var I;return(I=p.current)==null?void 0:I.undo()},onRedoClick:()=>{var I;return(I=p.current)==null?void 0:I.redo()},canUndo:!M,canRedo:V,localizedStrings:w}),n.jsx(mr,{onCancelClick:o,onAcceptClick:Mt,canAccept:!M||v!==x||x==="custom"&&y!==N,localizedStrings:w})]})]}),n.jsxs("div",{ref:m,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[n.jsx("div",{className:t,children:n.jsx(Rs,{editorRef:p,canUndo:!M,canRedo:V,children:n.jsx(It.Editorial,{options:vt,onStateChange:Y,onUsjChange:X,defaultUsj:yc,onScrRefChange:()=>{},scrRef:s,ref:p})})}),n.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsx(z,{"aria-label":Dt,onClick:ne,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.Copy,{})})}),n.jsx(jt,{children:n.jsx("p",{children:Dt})})]})})})]})]}),n.jsx("div",{className:"tw-absolute",ref:f,style:{top:0,left:0,height:0,width:0}}),n.jsxs(Qt,{open:R,children:[n.jsx(So,{className:"tw-absolute",style:{top:At,left:_t,height:dt,width:0,pointerEvents:"none"}}),n.jsx(Vt,{className:"tw-w-[500px] tw-p-0",onClick:I=>{I.preventDefault(),I.stopPropagation()},children:n.jsx(Ms,{markerMenuItems:ee,localizedStrings:w,searchRef:at})})]})]})}const Nc=Object.freeze([...Ts,...Object.entries(j.usfmMarkers).map(([,t])=>t.description).filter(t=>!!t),"%footnoteEditor_callerDropdown_item_custom%","%footnoteEditor_callerDropdown_item_generated%","%footnoteEditor_callerDropdown_item_hidden%","%footnoteEditor_callerDropdown_label%","%footnoteEditor_callerDropdown_tooltip%","%footnoteEditor_cancelButton_tooltip%","%footnoteEditor_copyButton_tooltip%","%footnoteEditor_noteType_crossReference_label%","%footnoteEditor_noteType_endNote_label%","%footnoteEditor_noteType_footnote_label%","%footnoteEditor_noteType_tooltip%","%footnoteEditor_noteTypeDropdown_label%","%footnoteEditor_saveButton_tooltip%",...Es,...ur]);function Ds(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(s=>typeof s=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function kc(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const s=[],a=[];let i=[];return e.forEach(c=>{typeof c!="string"&&c.marker==="fp"?(i.length>0&&a.push(i),i=[c]):i.push(c)}),i.length>0&&a.push(i),a.map((c,w)=>{const d=w===a.length-1;return n.jsxs("p",{children:[Er(t,c,r,!0,s),d&&o]},Ds(t,c))})}function Er(t,e,r=!0,o=!0,s=[]){if(!(!e||e.length===0))return e.map(a=>{if(typeof a=="string"){const i=`${t}-text-${a.slice(0,10)}`;if(o){const c=h(`usfm_${t}`);return n.jsx("span",{className:c,children:a},i)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:a}),n.jsx(k.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},i)}return _c(a,Ds(`${t}\\${a.marker}`,[a]),r,[...s,t??"unknown"])})}function _c(t,e,r,o=[]){const{marker:s}=t;return n.jsxs("span",{children:[s?r&&n.jsx("span",{className:"marker",children:`\\${s} `}):n.jsx(k.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),Er(s,t.content,r,!0,[...o,s??"unknown"])]},e)}function Is({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const s=r?r(t.caller):t.caller,a=s!==t.caller;let i,c=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([i,...c]=t.content);const w=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=s&&n.jsxs("span",{className:h("note-caller tw-inline-block",{formatted:a}),children:[s," "]}),m=i&&n.jsxs(n.Fragment,{children:[Er(t.marker,[i],o,!1)," "]}),f=e==="horizontal"?"horizontal":"vertical",u=o?"marker-visible":"",x=e==="horizontal"?"tw-col-span-1":"tw-col-span-2 tw-col-start-1 tw-row-start-2",b=h(f,u);return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:[w,p]}),n.jsx("div",{className:h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap",b),children:m}),n.jsx("div",{className:h("textual-note-body tw-flex tw-flex-col tw-gap-1",x,b),children:c&&c.length>0&&n.jsx(n.Fragment,{children:kc(t.marker,c,o,d)})})]})}function Cc({className:t,classNameForItems:e,footnotes:r,layout:o="horizontal",listId:s,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:c=!1,formatCaller:w,onFootnoteSelected:d}){const p=w??j.getFormatCallerFunction(r,void 0),m=(y,_)=>{d==null||d(y,_,s)},f=a?r.findIndex(y=>y===a):-1,[u,x]=l.useState(f),b=(y,_,N)=>{if(r.length)switch(y.key){case"Enter":case" ":y.preventDefault(),d==null||d(_,N,s);break}},v=y=>{if(r.length)switch(y.key){case"ArrowDown":y.preventDefault(),x(_=>Math.min(_+1,r.length-1));break;case"ArrowUp":y.preventDefault(),x(_=>Math.max(_-1,0));break}},E=l.useRef([]);return l.useEffect(()=>{var y;u>=0&&u<E.current.length&&((y=E.current[u])==null||y.focus())},[u]),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:u<0?0:-1,className:h("tw-h-full tw-overflow-y-auto",t),onKeyDown:v,children:n.jsx("ul",{className:h("tw-p-0.5 tw-pt-1","tw-grid",o==="horizontal"?"tw-grid-cols-[min-content_min-content_1fr]":"tw-grid-cols-[min-content_1fr]",!c&&"formatted-font"),children:r.map((y,_)=>{const N=y===a,F=`${s}-${_}`;return n.jsxs(n.Fragment,{children:[n.jsx("li",{ref:L=>{E.current[_]=L},role:"option","aria-selected":N,"data-marker":y.marker,"data-state":N?"selected":void 0,tabIndex:_===u?0:-1,className:h("tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",d&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring","tw-grid tw-grid-flow-col tw-grid-cols-subgrid",o==="horizontal"?"tw-col-span-3":"tw-col-span-2 tw-row-span-2",e),onClick:()=>m(y,_),onKeyDown:L=>b(L,y,_),children:n.jsx(Is,{footnote:y,layout:o,formatCaller:()=>p(y.caller,_),showMarkers:i})},F),_<r.length-1&&o==="vertical"&&n.jsx(de,{tabIndex:-1,className:"tw-col-span-2"})]})})})})}function Ec(t){const e=[];let r=0;const o=/\\\\(.+?)\\\\/g;let s;for(;(s=o.exec(t))!==null;)s.index>r&&e.push(t.substring(r,s.index)),e.push(n.jsx("strong",{children:s[1]},s.index)),r=o.lastIndex;return r<t.length&&e.push(t.substring(r)),e.length>0?e:[t]}function Sc({occurrenceData:t,setScriptureReference:e,localizedStrings:r,classNameForText:o}){const s=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=l.useMemo(()=>{const c=[],w=new Set;return t.forEach(d=>{const p=`${d.reference.book}:${d.reference.chapterNum}:${d.reference.verseNum}:${d.text}`;w.has(p)||(w.add(p),c.push(d))}),c},[t]);return n.jsxs(Qe,{stickyHeader:!0,children:[n.jsx(tn,{stickyHeader:!0,children:n.jsxs(Ht,{children:[n.jsx(Ae,{children:s}),n.jsx(Ae,{children:a})]})}),n.jsx(en,{children:i.length>0&&i.map(c=>n.jsxs(Ht,{onClick:()=>{e(c.reference)},children:[n.jsx(ce,{children:j.formatScrRef(c.reference,"English")}),n.jsx(ce,{className:o,children:Ec(c.text)})]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`))})]})}const En=l.forwardRef(({className:t,...e},r)=>n.jsx(Gn.Root,{ref:r,className:h("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(Gn.Indicator,{className:h("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}));En.displayName=Gn.Root.displayName;const Rc=t=>{if(t==="asc")return n.jsx(k.ArrowUpIcon,{className:"tw-h-4 tw-w-4"});if(t==="desc")return n.jsx(k.ArrowDownIcon,{className:"tw-h-4 tw-w-4"})},nn=(t,e,r)=>n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsxs(Tt,{className:h("tw-flex tw-w-full tw-justify-start",r),variant:"ghost",onClick:()=>t.toggleSorting(void 0),children:[n.jsx("span",{className:"tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis",children:e}),Rc(t.getIsSorted())]}),n.jsx(jt,{side:"bottom",children:e})]})}),Tc=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>nn(e,t)}),Mc=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>nn(r,t)}),Dc=t=>({accessorKey:"count",header:({column:e})=>nn(e,t,"tw-justify-end"),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:e.getValue("count")})}),$n=(t,e,r,o,s,a)=>{let i=[...r];t.forEach(w=>{e==="approved"?i.includes(w)||i.push(w):i=i.filter(d=>d!==w)}),o(i);let c=[...s];t.forEach(w=>{e==="unapproved"?c.includes(w)||c.push(w):c=c.filter(d=>d!==w)}),a(c)},Ic=(t,e,r,o,s)=>({accessorKey:"status",header:({column:a})=>nn(a,t,"tw-justify-center"),cell:({row:a})=>{const i=a.getValue("status"),c=a.getValue("item");return n.jsxs(Cn,{value:i,variant:"outline",type:"single",className:"tw-gap-0",children:[n.jsx(De,{onClick:w=>{w.stopPropagation(),$n([c],"approved",e,r,o,s)},value:"approved",className:"tw-rounded-e-none tw-border-e-0",children:n.jsx(k.CircleCheckIcon,{})}),n.jsx(De,{onClick:w=>{w.stopPropagation(),$n([c],"unapproved",e,r,o,s)},value:"unapproved",className:"tw-rounded-none",children:n.jsx(k.CircleXIcon,{})}),n.jsx(De,{onClick:w=>{w.stopPropagation(),$n([c],"unknown",e,r,o,s)},value:"unknown",className:"tw-rounded-s-none tw-border-s-0",children:n.jsx(k.CircleHelpIcon,{})})]})}}),Oc=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ac=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Pc=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Os=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Lc=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),$c=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(s=>e==="approved"&&s.status==="approved"||e==="unapproved"&&s.status==="unapproved"||e==="unknown"&&s.status==="unknown")),r!==""&&(o=o.filter(s=>s.items[0].includes(r))),o},Fc=(t,e,r)=>t.map(o=>{const s=j.isString(o.key)?o.key:o.key[0];return{items:j.isString(o.key)?[o.key]:o.key,count:o.count,status:o.status||Os(s,e,r),occurrences:o.occurrences||[]}}),Kt=(t,e)=>t[e]??e;function Vc({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:s,unapprovedItems:a,scope:i,onScopeChange:c,columns:w,id:d,areInventoryItemsLoading:p=!1,classNameForVerseText:m,onItemSelected:f}){const u=Kt(r,"%webView_inventory_all%"),x=Kt(r,"%webView_inventory_approved%"),b=Kt(r,"%webView_inventory_unapproved%"),v=Kt(r,"%webView_inventory_unknown%"),E=Kt(r,"%webView_inventory_scope_currentBook%"),y=Kt(r,"%webView_inventory_scope_chapter%"),_=Kt(r,"%webView_inventory_scope_verse%"),N=Kt(r,"%webView_inventory_filter_text%"),F=Kt(r,"%webView_inventory_show_additional_items%"),L=Kt(r,"%webView_inventory_no_results%"),[A,T]=l.useState(!1),[C,M]=l.useState("all"),[$,V]=l.useState(""),[P,O]=l.useState([]),G=l.useMemo(()=>{const B=t??[];return B.length===0?[]:Fc(B,s,a)},[t,s,a]),R=l.useMemo(()=>{if(A)return G;const B=[];return G.forEach(nt=>{const mt=nt.items[0],at=B.find(vt=>vt.items[0]===mt);at?(at.count+=nt.count,at.occurrences=at.occurrences.concat(nt.occurrences)):B.push({items:[mt],count:nt.count,occurrences:nt.occurrences,status:nt.status})}),B},[A,G]),U=l.useMemo(()=>R.length===0?[]:$c(R,C,$),[R,C,$]),_t=l.useMemo(()=>{var mt,at;if(!A)return w;const B=(mt=o==null?void 0:o.tableHeaders)==null?void 0:mt.length;if(!B)return w;const nt=[];for(let vt=0;vt<B;vt++)nt.push(Mc(((at=o==null?void 0:o.tableHeaders)==null?void 0:at[vt])||"Additional Item",vt+1));return[...nt,...w]},[o==null?void 0:o.tableHeaders,w,A]);l.useEffect(()=>{U.length===0?O([]):U.length===1&&O(U[0].items)},[U]);const Ot=(B,nt)=>{nt.setRowSelection(()=>{const at={};return at[B.index]=!0,at});const mt=B.original.items;O(mt),f&&mt.length>0&&f(mt[0])},At=B=>{if(B==="book"||B==="chapter"||B==="verse")c(B);else throw new Error(`Invalid scope value: ${B}`)},ut=B=>{if(B==="all"||B==="approved"||B==="unapproved"||B==="unknown")M(B);else throw new Error(`Invalid status filter value: ${B}`)},dt=l.useMemo(()=>{if(R.length===0||P.length===0)return[];const B=R.filter(nt=>j.deepEqual(A?nt.items:[nt.items[0]],P));if(B.length>1)throw new Error("Selected item is not unique");return B.length===0?[]:B[0].occurrences},[P,A,R]);return n.jsx("div",{id:d,className:"pr-twp tw-h-full tw-overflow-auto",children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",style:{contain:"inline-size"},children:[n.jsxs(je,{onValueChange:B=>ut(B),defaultValue:C,children:[n.jsx(pe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ne,{placeholder:"Select filter"})}),n.jsxs(ue,{children:[n.jsx(Et,{value:"all",children:u}),n.jsx(Et,{value:"approved",children:x}),n.jsx(Et,{value:"unapproved",children:b}),n.jsx(Et,{value:"unknown",children:v})]})]}),n.jsxs(je,{onValueChange:B=>At(B),defaultValue:i,children:[n.jsx(pe,{className:"tw-m-1 tw-w-auto tw-flex-1",children:n.jsx(Ne,{placeholder:"Select scope"})}),n.jsxs(ue,{children:[n.jsx(Et,{value:"book",children:E}),n.jsx(Et,{value:"chapter",children:y}),n.jsx(Et,{value:"verse",children:_})]})]}),n.jsx(Ee,{className:"tw-m-1 tw-flex-1 tw-rounded-md tw-border",placeholder:N,value:$,onChange:B=>{V(B.target.value)}}),o&&n.jsx(yt,{children:n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:n.jsxs("div",{className:"tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border",children:[n.jsx(En,{className:"tw-m-1 tw-flex-shrink-0",checked:A,onCheckedChange:B=>{T(B)}}),n.jsx(wt,{className:"tw-m-1 tw-truncate",children:(o==null?void 0:o.checkboxText)??F})]})}),n.jsx(jt,{children:(o==null?void 0:o.checkboxText)??F})]})})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(js,{columns:_t,data:U,onRowClickHandler:Ot,stickyHeader:!0,isLoading:p,noResultsMessage:L})}),dt.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Sc,{classNameForText:m,occurrenceData:dt,setScriptureReference:e,localizedStrings:r})})]})})}const zc="16rem",Bc="3rem",As=l.createContext(void 0);function rn(){const t=l.useContext(As);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const Sr=l.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:s,children:a,side:i="primary",...c},w)=>{const[d,p]=l.useState(t),m=e??d,f=l.useCallback(_=>{const N=typeof _=="function"?_(m):_;r?r(N):p(N)},[r,m]),u=l.useCallback(()=>f(_=>!_),[f]),x=m?"expanded":"collapsed",E=ct()==="ltr"?i:i==="primary"?"secondary":"primary",y=l.useMemo(()=>({state:x,open:m,setOpen:f,toggleSidebar:u,side:E}),[x,m,f,u,E]);return n.jsx(As.Provider,{value:y,children:n.jsx(yt,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":zc,"--sidebar-width-icon":Bc,...s},className:h("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:w,...c,children:a})})})});Sr.displayName="SidebarProvider";const Rr=l.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...s},a)=>{const i=rn();return e==="none"?n.jsx("div",{className:h("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:a,...s,children:o}):n.jsxs("div",{ref:a,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":i.state,"data-collapsible":i.state==="collapsed"?e:"","data-variant":t,"data-side":i.side,children:[n.jsx("div",{className:h("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:h("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",i.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...s,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});Rr.displayName="Sidebar";const Ps=l.forwardRef(({className:t,onClick:e,...r},o)=>{const s=rn();return n.jsxs(z,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:h("tw-h-7 tw-w-7",t),onClick:a=>{e==null||e(a),s.toggleSidebar()},...r,children:[s.side==="primary"?n.jsx(k.PanelLeft,{}):n.jsx(k.PanelRight,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ps.displayName="SidebarTrigger";const Ls=l.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=rn();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:h("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Ls.displayName="SidebarRail";const Tr=l.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:h("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));Tr.displayName="SidebarInset";const $s=l.forwardRef(({className:t,...e},r)=>n.jsx(Ee,{ref:r,"data-sidebar":"input",className:h("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));$s.displayName="SidebarInput";const Fs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Fs.displayName="SidebarHeader";const Vs=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:h("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Vs.displayName="SidebarFooter";const zs=l.forwardRef(({className:t,...e},r)=>n.jsx(de,{ref:r,"data-sidebar":"separator",className:h("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));zs.displayName="SidebarSeparator";const Mr=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:h("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));Mr.displayName="SidebarContent";const xn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));xn.displayName="SidebarGroup";const bn=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Pe.Slot:"div";return n.jsx(s,{ref:o,"data-sidebar":"group-label",className:h("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});bn.displayName="SidebarGroupLabel";const Bs=l.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const s=e?Pe.Slot:"button";return n.jsx(s,{ref:o,"data-sidebar":"group-action",className:h("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Bs.displayName="SidebarGroupAction";const vn=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:h("tw-w-full tw-text-sm",t),...e}));vn.displayName="SidebarGroupContent";const Dr=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));Dr.displayName="SidebarMenu";const Ir=l.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:h("tw-group/menu-item tw-relative",t),...e}));Ir.displayName="SidebarMenuItem";const Gc=se.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Or=l.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:s,className:a,...i},c)=>{const w=t?Pe.Slot:"button",{state:d}=rn(),p=n.jsx(w,{ref:c,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:h(Gc({variant:r,size:o}),a),...i});return s?(typeof s=="string"&&(s={children:s}),n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:p}),n.jsx(jt,{side:"right",align:"center",hidden:d!=="collapsed",...s})]})):p});Or.displayName="SidebarMenuButton";const Gs=l.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},s)=>{const a=e?Pe.Slot:"button";return n.jsx(a,{ref:s,"data-sidebar":"menu-action",className:h("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});Gs.displayName="SidebarMenuAction";const Ks=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:h("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Ks.displayName="SidebarMenuBadge";const qs=l.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const s=l.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(hn,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(hn,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":s}})]})});qs.displayName="SidebarMenuSkeleton";const Us=l.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:h("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Us.displayName="SidebarMenuSub";const Hs=l.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));Hs.displayName="SidebarMenuSubItem";const Ys=l.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...s},a)=>{const i=t?Pe.Slot:"a";return n.jsx(i,{ref:a,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:h("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...s})});Ys.displayName="SidebarMenuSubButton";function Xs({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:s,extensionsSidebarGroupLabel:a,projectsSidebarGroupLabel:i,buttonPlaceholderText:c,className:w}){const d=l.useCallback((f,u)=>{o(f,u)},[o]),p=l.useCallback(f=>{const u=r.find(x=>x.projectId===f);return u?u.projectName:f},[r]),m=l.useCallback(f=>!s.projectId&&f===s.label,[s]);return n.jsx(Rr,{id:t,collapsible:"none",variant:"inset",className:h("tw-w-96 tw-gap-2 tw-overflow-y-auto",w),children:n.jsxs(Mr,{children:[n.jsxs(xn,{children:[n.jsx(bn,{className:"tw-text-sm",children:a}),n.jsx(vn,{children:n.jsx(Dr,{children:Object.entries(e).map(([f,u])=>n.jsx(Ir,{children:n.jsx(Or,{onClick:()=>d(f),isActive:m(f),children:n.jsx("span",{className:"tw-pl-3",children:u})})},f))})})]}),n.jsxs(xn,{children:[n.jsx(bn,{className:"tw-text-sm",children:i}),n.jsx(vn,{className:"tw-pl-3",children:n.jsx(dn,{buttonVariant:"ghost",buttonClassName:h("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":s==null?void 0:s.projectId}),popoverContentStyle:{zIndex:go},options:r.flatMap(f=>f.projectId),getOptionLabel:p,buttonPlaceholder:c,onChange:f=>{const u=p(f);d(u,f)},value:(s==null?void 0:s.projectId)??void 0,icon:n.jsx(k.ScrollText,{})})})]})]})})}const Sn=l.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:s,isDisabled:a=!1,id:i},c)=>{const w=ct();return n.jsxs("div",{id:i,className:h("tw-relative",{"tw-w-full":o},s),children:[n.jsx(k.Search,{className:h("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":w==="rtl"},{"tw-left-3":w==="ltr"})}),n.jsx(Ee,{ref:c,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:a}),t&&n.jsxs(z,{variant:"ghost",size:"icon",className:h("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":w==="rtl"},{"tw-right-0":w==="ltr"}),onClick:()=>{e("")},children:[n.jsx(k.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Sn.displayName="SearchBar";function Kc({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:s,selectedSidebarItem:a,searchValue:i,onSearch:c,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Sn,{className:"tw-w-9/12",value:i,onSearch:c,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(Sr,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Xs,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:s,selectedSidebarItem:a,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(Tr,{className:"tw-min-w-[215px]",children:o})]})]})}const le="scrBook",qc="scrRef",xe="source",Uc="details",Hc="Scripture Reference",Yc="Scripture Book",Ws="Type",Xc="Details";function Wc(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:le,header:(t==null?void 0:t.scriptureReferenceColumnName)??Hc,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?lt.Canon.bookIdToEnglishName(s.start.book):o.row.groupingColumnId===le?j.formatScrRef(s.start):void 0},getGroupingValue:o=>lt.Canon.bookIdToNumber(o.start.book),sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!0},{accessorFn:o=>j.formatScrRef(o.start),id:qc,header:void 0,cell:o=>{const s=o.row.original;return o.row.getIsGrouped()?void 0:j.formatScrRef(s.start)},sortingFn:(o,s)=>j.compareScrRefs(o.original.start,s.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:xe,header:r?(t==null?void 0:t.typeColumnName)??Ws:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,s)=>o.original.source.displayName.localeCompare(s.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Uc,header:(t==null?void 0:t.detailsColumnName)??Xc,cell:o=>o.getValue(),enableGrouping:!1}]}const Zc=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||j.compareScrRefs(t.start,t.end)===0?`${j.scrRefToBBBCCCVVV(t.start)}+${e}`:`${j.scrRefToBBBCCCVVV(t.start)}+${e}-${j.scrRefToBBBCCCVVV(t.end)}+${r}`},io=t=>`${Zc({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Jc({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:s,typeColumnName:a,detailsColumnName:i,onRowSelected:c,id:w}){const[d,p]=l.useState([]),[m,f]=l.useState([{id:le,desc:!1}]),[u,x]=l.useState({}),b=l.useMemo(()=>t.flatMap(C=>C.data.map(M=>({...M,source:C.source}))),[t]),v=l.useMemo(()=>Wc({scriptureReferenceColumnName:o,typeColumnName:a,detailsColumnName:i},r),[o,a,i,r]);l.useEffect(()=>{d.includes(xe)?f([{id:xe,desc:!1},{id:le,desc:!1}]):f([{id:le,desc:!1}])},[d]);const E=bt.useReactTable({data:b,columns:v,state:{grouping:d,sorting:m,rowSelection:u},onGroupingChange:p,onSortingChange:f,onRowSelectionChange:x,getExpandedRowModel:bt.getExpandedRowModel(),getGroupedRowModel:bt.getGroupedRowModel(),getCoreRowModel:bt.getCoreRowModel(),getSortedRowModel:bt.getSortedRowModel(),getRowId:io,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});l.useEffect(()=>{if(c){const C=E.getSelectedRowModel().rowsById,M=Object.keys(C);if(M.length===1){const $=b.find(V=>io(V)===M[0])||void 0;$&&c($)}}},[u,b,c,E]);const y=s??Yc,_=a??Ws,N=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[le]},{label:`Group by ${_}`,value:[xe]},{label:`Group by ${y} and ${_}`,value:[le,xe]},{label:`Group by ${_} and ${y}`,value:[xe,le]}],F=C=>{p(JSON.parse(C))},L=(C,M)=>{!C.getIsGrouped()&&!C.getIsSelected()&&C.getToggleSelectedHandler()(M)},A=(C,M)=>C.getIsGrouped()?"":h("banded-row",M%2===0?"even":"odd"),T=(C,M,$)=>{if(!((C==null?void 0:C.length)===0||M.depth<$.column.getGroupedIndex())){if(M.getIsGrouped())switch(M.depth){case 1:return"tw-ps-4";default:return}switch(M.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:w,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(je,{value:JSON.stringify(d),onValueChange:C=>{F(C)},children:[n.jsx(pe,{className:"tw-mb-1 tw-mt-2",children:n.jsx(Ne,{})}),n.jsx(ue,{position:"item-aligned",children:n.jsx(hs,{children:N.map(C=>n.jsx(Et,{value:JSON.stringify(C.value),children:C.label},C.label))})})]}),n.jsxs(Qe,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(tn,{children:E.getHeaderGroups().map(C=>n.jsx(Ht,{children:C.headers.filter(M=>M.column.columnDef.header).map(M=>n.jsx(Ae,{colSpan:M.colSpan,className:"top-0 tw-sticky",children:M.isPlaceholder?void 0:n.jsxs("div",{children:[M.column.getCanGroup()?n.jsx(z,{variant:"ghost",title:`Toggle grouping by ${M.column.columnDef.header}`,onClick:M.column.getToggleGroupingHandler(),type:"button",children:M.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",bt.flexRender(M.column.columnDef.header,M.getContext())]})},M.id))},C.id))}),n.jsx(en,{children:E.getRowModel().rows.map((C,M)=>{const $=ct();return n.jsx(Ht,{"data-state":C.getIsSelected()?"selected":"",className:h(A(C,M)),onClick:V=>L(C,V),children:C.getVisibleCells().map(V=>{if(!(V.getIsPlaceholder()||V.column.columnDef.enableGrouping&&!V.getIsGrouped()&&(V.column.columnDef.id!==xe||!r)))return n.jsx(ce,{className:h(V.column.columnDef.id,"tw-p-[1px]",T(d,C,V)),children:V.getIsGrouped()?n.jsxs(z,{variant:"link",onClick:C.getToggleExpandedHandler(),type:"button",children:[C.getIsExpanded()&&n.jsx(k.ChevronDown,{}),!C.getIsExpanded()&&($==="ltr"?n.jsx(k.ChevronRight,{}):n.jsx(k.ChevronLeft,{}))," ",bt.flexRender(V.column.columnDef.cell,V.getContext())," (",C.subRows.length,")"]}):bt.flexRender(V.column.columnDef.cell,V.getContext())},V.id)})},C.id)})})]})]})}const Ar=(t,e)=>t.filter(r=>{try{return j.getSectionForBook(r)===e}catch{return!1}}),Zs=(t,e,r)=>Ar(t,e).every(o=>r.includes(o));function Qc({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:s}){const a=Ar(e,t).length===0,i=s["%scripture_section_ot_short%"],c=s["%scripture_section_nt_short%"],w=s["%scripture_section_dc_short%"],d=s["%scripture_section_extra_short%"];return n.jsx(z,{variant:"outline",size:"sm",onClick:()=>o(t),className:h(Zs(e,t,r)&&!a&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:a,children:ui(t,i,c,w,d)})}const lo=5,Fn=6;function td({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:s}){const a=o["%webView_book_selector_books_selected%"],i=o["%webView_book_selector_select_books%"],c=o["%webView_book_selector_search_books%"],w=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],m=o["%webView_book_selector_more%"],{otLong:f,ntLong:u,dcLong:x,extraLong:b}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[v,E]=l.useState(!1),[y,_]=l.useState(""),N=l.useRef(void 0),F=l.useRef(!1);if(t.length!==lt.Canon.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const L=l.useMemo(()=>lt.Canon.allBookIds.filter((O,G)=>t[G]==="1"&&!lt.Canon.isObsolete(lt.Canon.bookIdToNumber(O))),[t]),A=l.useMemo(()=>{if(!y.trim()){const R={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return L.forEach(U=>{const _t=j.getSectionForBook(U);R[_t].push(U)}),R}const O=L.filter(R=>or(R,y,s)),G={[j.Section.OT]:[],[j.Section.NT]:[],[j.Section.DC]:[],[j.Section.Extra]:[]};return O.forEach(R=>{const U=j.getSectionForBook(R);G[U].push(R)}),G},[L,y,s]),T=l.useCallback((O,G=!1)=>{if(!G||!N.current){r(e.includes(O)?e.filter(ut=>ut!==O):[...e,O]),N.current=O;return}const R=L.findIndex(ut=>ut===N.current),U=L.findIndex(ut=>ut===O);if(R===-1||U===-1)return;const[_t,Ot]=[Math.min(R,U),Math.max(R,U)],At=L.slice(_t,Ot+1).map(ut=>ut);r(e.includes(O)?e.filter(ut=>!At.includes(ut)):[...new Set([...e,...At])])},[e,r,L]),C=O=>{T(O,F.current),F.current=!1},M=(O,G)=>{O.preventDefault(),T(G,O.shiftKey)},$=l.useCallback(O=>{const G=Ar(L,O).map(R=>R);r(Zs(L,O,e)?e.filter(R=>!G.includes(R)):[...new Set([...e,...G])])},[e,r,L]),V=()=>{r(L.map(O=>O))},P=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(j.Section).map(O=>n.jsx(Qc,{section:O,availableBookIds:L,selectedBookIds:e,onToggle:$,localizedStrings:o},O))}),n.jsxs(Qt,{open:v,onOpenChange:O=>{E(O),O||_("")},children:[n.jsx(ae,{asChild:!0,children:n.jsxs(z,{variant:"outline",role:"combobox","aria-expanded":v,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${a}: ${e.length}`:i,n.jsx(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Vt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Zt,{shouldFilter:!1,onKeyDown:O=>{O.key==="Enter"&&(F.current=O.shiftKey)},children:[n.jsx(_e,{placeholder:c,value:y,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(z,{variant:"ghost",size:"sm",onClick:V,children:w}),n.jsx(z,{variant:"ghost",size:"sm",onClick:P,children:d})]}),n.jsxs(Jt,{children:[n.jsx($e,{children:p}),Object.values(j.Section).map((O,G)=>{const R=A[O];if(R.length!==0)return n.jsxs(l.Fragment,{children:[n.jsx(Lt,{heading:_o(O,f,u,x,b),children:R.map(U=>n.jsx(Eo,{bookId:U,isSelected:e.includes(U),onSelect:()=>C(U),onMouseDown:_t=>M(_t,U),section:j.getSectionForBook(U),showCheck:!0,localizedBookNames:s,commandValue:Un(U,s),className:"tw-flex tw-items-center"},U))}),G<Object.values(j.Section).length-1&&n.jsx(nr,{})]},O)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Fn?Fn:lo).map(O=>n.jsx(ye,{className:"hover:tw-bg-secondary",variant:"secondary",children:Te(O,s)},O)),e.length>Fn&&n.jsx(ye,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-lo} ${m}`})]})]})}const ed=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),he=(t,e)=>t[e]??e;function nd({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:s,onSelectedBookIdsChange:a,localizedStrings:i,localizedBookNames:c,id:w}){const d=he(i,"%webView_scope_selector_selected_text%"),p=he(i,"%webView_scope_selector_current_verse%"),m=he(i,"%webView_scope_selector_current_chapter%"),f=he(i,"%webView_scope_selector_current_book%"),u=he(i,"%webView_scope_selector_choose_books%"),x=he(i,"%webView_scope_selector_scope%"),b=he(i,"%webView_scope_selector_select_books%"),v=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:m,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:u,id:"scope-selected"}],E=e?v.filter(y=>e.includes(y.value)):v;return n.jsxs("div",{id:w,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(wt,{children:x}),n.jsx(kn,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:E.map(({value:y,label:_,id:N})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(Xe,{className:"tw-me-2",value:y,id:N}),n.jsx(wt,{htmlFor:N,children:_})]},N))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(wt,{children:b}),n.jsx(td,{availableBookInfo:o,selectedBookIds:s,onChangeSelectedBookIds:a,localizedStrings:i,localizedBookNames:c})]})]})}const Vn={[j.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[j.getLocalizeKeyForScrollGroupId(0)]:"A",[j.getLocalizeKeyForScrollGroupId(1)]:"B",[j.getLocalizeKeyForScrollGroupId(2)]:"C",[j.getLocalizeKeyForScrollGroupId(3)]:"D",[j.getLocalizeKeyForScrollGroupId(4)]:"E",[j.getLocalizeKeyForScrollGroupId(5)]:"F",[j.getLocalizeKeyForScrollGroupId(6)]:"G",[j.getLocalizeKeyForScrollGroupId(7)]:"H",[j.getLocalizeKeyForScrollGroupId(8)]:"I",[j.getLocalizeKeyForScrollGroupId(9)]:"J",[j.getLocalizeKeyForScrollGroupId(10)]:"K",[j.getLocalizeKeyForScrollGroupId(11)]:"L",[j.getLocalizeKeyForScrollGroupId(12)]:"M",[j.getLocalizeKeyForScrollGroupId(13)]:"N",[j.getLocalizeKeyForScrollGroupId(14)]:"O",[j.getLocalizeKeyForScrollGroupId(15)]:"P",[j.getLocalizeKeyForScrollGroupId(16)]:"Q",[j.getLocalizeKeyForScrollGroupId(17)]:"R",[j.getLocalizeKeyForScrollGroupId(18)]:"S",[j.getLocalizeKeyForScrollGroupId(19)]:"T",[j.getLocalizeKeyForScrollGroupId(20)]:"U",[j.getLocalizeKeyForScrollGroupId(21)]:"V",[j.getLocalizeKeyForScrollGroupId(22)]:"W",[j.getLocalizeKeyForScrollGroupId(23)]:"X",[j.getLocalizeKeyForScrollGroupId(24)]:"Y",[j.getLocalizeKeyForScrollGroupId(25)]:"Z"};function rd({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:s="sm",className:a,id:i}){const c={...Vn,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in Vn?Vn[d]:p]))},w=ct();return n.jsxs(je,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(pe,{size:s,className:h("pr-twp tw-w-auto",a),children:n.jsx(Ne,{placeholder:c[j.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(ue,{id:i,align:w==="rtl"?"end":"start",style:{zIndex:ke},children:t.map(d=>n.jsx(Et,{value:`${d}`,children:c[j.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function od({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function sd({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:s}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:s}):n.jsx("div",{children:r})]})}function ad({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(de,{}):""]})}function Js(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function yn({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:h("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Qs=(t,e,r,o)=>r?Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order).flatMap(([a])=>e.filter(c=>c.group===a).sort((c,w)=>c.order-w.order).map(c=>n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:"command"in c?n.jsxs(Ze,{onClick:()=>{o(c)},children:[c.iconPathBefore&&n.jsx(yn,{icon:c.iconPathBefore,menuLabel:c.label,leading:!0}),c.label,c.iconPathAfter&&n.jsx(yn,{icon:c.iconPathAfter,menuLabel:c.label})]},`dropdown-menu-item-${c.label}-${c.command}`):n.jsxs(us,{children:[n.jsx(jr,{children:c.label}),n.jsx(ps,{children:n.jsx(Nr,{children:Qs(t,e,Js(t,c.id),o)})})]},`dropdown-menu-sub-${c.label}-${c.id}`)}),c.tooltip&&n.jsx(jt,{children:c.tooltip})]},`tooltip-${c.label}-${"command"in c?c.command:c.id}`))):void 0;function jn({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:s,variant:a,buttonVariant:i="ghost",id:c}){return n.jsxs(oe,{variant:a,children:[n.jsx(we,{"aria-label":r,className:s,asChild:!0,id:c,children:n.jsx(z,{variant:i,size:"icon",children:o??n.jsx(k.MenuIcon,{})})}),n.jsx(Wt,{align:"start",style:{zIndex:ke},children:Object.entries(e.columns).filter(([,w])=>typeof w=="object").sort(([,w],[,d])=>typeof w=="boolean"||typeof d=="boolean"?0:w.order-d.order).map(([w],d,p)=>n.jsxs(l.Fragment,{children:[n.jsx(yr,{children:n.jsx(yt,{children:Qs(e.groups,e.items,w,t)})}),d<p.length-1&&n.jsx(Ce,{})]},w))})]})}const ta=l.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function id({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:s,className:a,startAreaChildren:i,centerAreaChildren:c,endAreaChildren:w,menuButtonIcon:d}){return n.jsxs(ta,{className:`tw-w-full tw-border ${a}`,id:s,children:[r&&n.jsx(jn,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(k.Menu,{}),buttonVariant:"ghost"}),i&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:i}),c&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto",children:c}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip",children:[o&&n.jsx(jn,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(k.EllipsisVertical,{}),className:"tw-h-full"}),w]})]})}function ld({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:s}){return n.jsx(ta,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(jn,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:s,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Pr=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(kt.Root,{orientation:"vertical",ref:r,className:h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Pr.displayName=kt.List.displayName;const Lr=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.List,{ref:r,className:h("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));Lr.displayName=kt.List.displayName;const ea=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Trigger,{ref:r,...e,className:h("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),$r=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Content,{ref:r,className:h("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));$r.displayName=kt.Content.displayName;function cd({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:a,id:i}){return n.jsxs("div",{id:i,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?n.jsx("h1",{children:s}):"",n.jsx(Sn,{className:a,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Pr,{children:[n.jsx(Lr,{children:t.map(c=>n.jsx(ea,{value:c.value,children:c.value},c.key))}),t.map(c=>n.jsx($r,{value:c.value,children:c.content},c.key))]})]})}function dd({...t}){return n.jsx(Q.Menu,{...t})}function wd({...t}){return n.jsx(Q.Sub,{"data-slot":"menubar-sub",...t})}const na=l.forwardRef(({className:t,variant:e="default",...r},o)=>{const s=l.useMemo(()=>({variant:e}),[e]);return n.jsx(vr.Provider,{value:s,children:n.jsx(Q.Root,{ref:o,className:h("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});na.displayName=Q.Root.displayName;const ra=l.forwardRef(({className:t,...e},r)=>{const o=zt();return n.jsx(Q.Trigger,{ref:r,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",ie({variant:o.variant,className:t})),...e})});ra.displayName=Q.Trigger.displayName;const oa=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>{const a=zt();return n.jsxs(Q.SubTrigger,{ref:s,className:h("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",ie({variant:a.variant,className:t}),t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});oa.displayName=Q.SubTrigger.displayName;const sa=l.forwardRef(({className:t,...e},r)=>{const o=zt();return n.jsx(Q.SubContent,{ref:r,className:h("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":o.variant==="muted"},t),...e})});sa.displayName=Q.SubContent.displayName;const aa=l.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...s},a)=>{const i=zt();return n.jsx(Q.Portal,{children:n.jsx(Q.Content,{ref:a,align:e,alignOffset:r,sideOffset:o,className:h("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":i.variant==="muted"},t),...s})})});aa.displayName=Q.Content.displayName;const ia=l.forwardRef(({className:t,inset:e,...r},o)=>{const s=zt();return n.jsx(Q.Item,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",ie({variant:s.variant,className:t}),t),...r})});ia.displayName=Q.Item.displayName;const pd=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>{const a=zt();return n.jsxs(Q.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ie({variant:a.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});pd.displayName=Q.CheckboxItem.displayName;const ud=l.forwardRef(({className:t,children:e,...r},o)=>{const s=zt();return n.jsxs(Q.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",ie({variant:s.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(Q.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});ud.displayName=Q.RadioItem.displayName;const md=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(Q.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));md.displayName=Q.Label.displayName;const la=l.forwardRef(({className:t,...e},r)=>n.jsx(Q.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));la.displayName=Q.Separator.displayName;const qe=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},ca=(t,e,r,o)=>{if(!r)return;const s=Object.entries(t).filter(([a,i])=>"column"in i&&i.column===r||a===r).sort(([,a],[,i])=>a.order-i.order);return s.flatMap(([a],i)=>{const c=e.filter(d=>d.group===a).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Rt,{children:[n.jsx(Tt,{asChild:!0,children:"command"in d?n.jsxs(ia,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(yn,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(yn,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(wd,{children:[n.jsx(oa,{children:d.label}),n.jsx(sa,{children:ca(t,e,Js(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(jt,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),w=[...c];return c.length>0&&i<s.length-1&&w.push(n.jsx(la,{},`separator-${a}`)),w})};function fd({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const s=l.useRef(void 0),a=l.useRef(void 0),i=l.useRef(void 0),c=l.useRef(void 0),w=l.useRef(void 0),d=p=>{switch(p){case"platform.app":return a;case"platform.window":return i;case"platform.layout":return c;case"platform.help":return w;default:return}};if(ri.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,m)=>{var x,b,v,E;p.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},u={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(m.hotkey){case"alt":qe(a,[f]);break;case"alt+p":(x=a.current)==null||x.focus(),qe(a,[f,u]);break;case"alt+l":(b=i.current)==null||b.focus(),qe(i,[f,u]);break;case"alt+n":(v=c.current)==null||v.focus(),qe(c,[f,u]);break;case"alt+h":(E=w.current)==null||E.focus(),qe(w,[f,u]);break}}),l.useEffect(()=>{if(!r||!s.current)return;const p=new MutationObserver(u=>{u.forEach(x=>{if(x.attributeName==="data-state"&&x.target instanceof HTMLElement){const b=x.target.getAttribute("data-state");r(b==="open")}})});return s.current.querySelectorAll("[data-state]").forEach(u=>{p.observe(u,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(na,{ref:s,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,m])=>typeof p=="boolean"||typeof m=="boolean"?0:p.order-m.order).map(([p,m])=>n.jsxs(dd,{children:[n.jsx(ra,{ref:d(p),children:typeof m=="object"&&"label"in m&&m.label}),n.jsx(aa,{style:{zIndex:ke},children:n.jsx(yt,{children:ca(t.groups,t.items,p,e)})})]},p))})}function hd(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function gd({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:s,children:a,appMenuAreaChildren:i,configAreaChildren:c,shouldUseAsAppDragArea:w,menubarVariant:d="default"}){const p=l.useRef(void 0);return n.jsx("div",{className:h("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:s,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:w?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:[i,t&&n.jsx(fd,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:a}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:w?{WebkitAppRegion:"no-drag"}:void 0,children:c})})]})})}const xd=(t,e)=>t[e]??e;function bd({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:s,onFallbackLanguagesChange:a,localizedStrings:i,className:c,id:w}){const d=xd(i,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,m]=l.useState(!1),f=x=>{s&&s(x),o&&o([x,...r.filter(b=>b!==x)]),a&&r.find(b=>b===x)&&a([...r.filter(b=>b!==x)]),m(!1)},u=(x,b)=>{var E,y,_,N,F,L;const v=b!==x?((y=(E=t[x])==null?void 0:E.uiNames)==null?void 0:y[b])??((N=(_=t[x])==null?void 0:_.uiNames)==null?void 0:N.en):void 0;return v?`${(F=t[x])==null?void 0:F.autonym} (${v})`:(L=t[x])==null?void 0:L.autonym};return n.jsxs("div",{id:w,className:h("pr-twp tw-max-w-sm",c),children:[n.jsxs(je,{name:"uiLanguage",value:e,onValueChange:f,open:p,onOpenChange:x=>m(x),children:[n.jsx(pe,{children:n.jsx(Ne,{})}),n.jsx(ue,{style:{zIndex:ke},children:Object.keys(t).map(x=>n.jsx(Et,{value:x,children:u(x,e)},x))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(wt,{className:"tw-font-normal tw-text-muted-foreground",children:j.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(x=>u(x,e)).join(", "):t.en.autonym})})})]})}function vd({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(wt,{children:e(t)}):r?n.jsx(wt,{children:r(t)}):n.jsx(wt,{children:t})}function yd({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:s,createLabel:a,createComplexLabel:i}){return n.jsx("div",{id:t,className:e,children:r.map(c=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(En,{className:"tw-me-2 tw-align-middle",checked:o.includes(c),onCheckedChange:w=>s(c,w)}),n.jsx(vd,{item:c,createLabel:a,createComplexLabel:i})]},c))})}function jd({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:s=!1,className:a,children:i,selectedButtons:c,hoverButtons:w,dropdownContent:d,additionalContent:p,accentColor:m,showDropdownOnHover:f=!1}){const u=x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),r())};return n.jsxs("div",{hidden:s,onClick:r,onKeyDown:u,role:"button",tabIndex:0,"aria-pressed":e,className:h("tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},a),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:i}),e&&c,!e&&w&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:w}),!e&&f&&d&&n.jsx("div",{className:"tw-invisible group-hover:tw-visible",children:n.jsxs(oe,{children:[n.jsx(we,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(z,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(Wt,{align:"end",children:d})]})}),e&&d&&n.jsxs(oe,{children:[n.jsx(we,{className:h(m&&"tw-me-1"),asChild:!0,children:n.jsx(z,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(k.MoreVertical,{})})}),n.jsx(Wt,{align:"end",children:d})]})]}),p&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:p})]}),m&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`})]},t)}const da=l.forwardRef(({className:t,...e},r)=>n.jsx(k.LoaderCircle,{size:35,className:h("tw-animate-spin",t),...e,ref:r}));da.displayName="Spinner";function Nd({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:s,label:a,placeholder:i,isRequired:c=!1,className:w,defaultValue:d,value:p,onChange:m,onFocus:f,onBlur:u}){return n.jsxs("div",{className:h("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(wt,{htmlFor:t,className:h({"tw-text-red-600":r,"tw-hidden":!a}),children:`${a}${c?"*":""}`}),n.jsx(Ee,{id:t,disabled:e,placeholder:i,required:c,className:h(w,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:m,onFocus:f,onBlur:u}),n.jsx("p",{className:h({"tw-hidden":!s}),children:s})]})}const kd=se.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),wa=l.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:h("pr-twp",kd({variant:e}),t),...r}));wa.displayName="Alert";const pa=l.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));pa.displayName="AlertTitle";const ua=l.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:h("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));ua.displayName="AlertDescription";const _d=tt.Root,Cd=tt.Trigger,Ed=tt.Group,Sd=tt.Portal,Rd=tt.Sub,Td=tt.RadioGroup,ma=l.forwardRef(({className:t,inset:e,children:r,...o},s)=>n.jsxs(tt.SubTrigger,{ref:s,className:h("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...o,children:[r,n.jsx(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));ma.displayName=tt.SubTrigger.displayName;const fa=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.SubContent,{ref:r,className:h("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));fa.displayName=tt.SubContent.displayName;const ha=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.Portal,{children:n.jsx(tt.Content,{ref:r,className:h("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));ha.displayName=tt.Content.displayName;const ga=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Item,{ref:o,className:h("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...r}));ga.displayName=tt.Item.displayName;const xa=l.forwardRef(({className:t,children:e,checked:r,...o},s)=>n.jsxs(tt.CheckboxItem,{ref:s,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));xa.displayName=tt.CheckboxItem.displayName;const ba=l.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(tt.RadioItem,{ref:o,className:h("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(tt.ItemIndicator,{children:n.jsx(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));ba.displayName=tt.RadioItem.displayName;const va=l.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(tt.Label,{ref:o,className:h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));va.displayName=tt.Label.displayName;const ya=l.forwardRef(({className:t,...e},r)=>n.jsx(tt.Separator,{ref:r,className:h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));ya.displayName=tt.Separator.displayName;function ja({className:t,...e}){return n.jsx("span",{className:h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}ja.displayName="ContextMenuShortcut";const Na=l.createContext({direction:"bottom"});function ka({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=l.useMemo(()=>({direction:e}),[e]);return n.jsx(Na.Provider,{value:o,children:n.jsx($t.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ka.displayName="Drawer";const Md=$t.Drawer.Trigger,_a=$t.Drawer.Portal,Dd=$t.Drawer.Close,Fr=l.forwardRef(({className:t,...e},r)=>n.jsx($t.Drawer.Overlay,{ref:r,className:h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Fr.displayName=$t.Drawer.Overlay.displayName;const Ca=l.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},s)=>{const{direction:a="bottom"}=l.useContext(Na),i={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(_a,{children:[n.jsx(Fr,{}),n.jsxs($t.Drawer.Content,{ref:s,className:h("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",a==="bottom"||a==="top"?"tw-flex-col":"tw-flex-row",i[a],t),...o,children:[!r&&(a==="bottom"||a==="right")&&n.jsx("div",{className:c[a]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(a==="top"||a==="left")&&n.jsx("div",{className:c[a]})]})]})});Ca.displayName="DrawerContent";function Ea({className:t,...e}){return n.jsx("div",{className:h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Ea.displayName="DrawerHeader";function Sa({className:t,...e}){return n.jsx("div",{className:h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Sa.displayName="DrawerFooter";const Ra=l.forwardRef(({className:t,...e},r)=>n.jsx($t.Drawer.Title,{ref:r,className:h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ra.displayName=$t.Drawer.Title.displayName;const Ta=l.forwardRef(({className:t,...e},r)=>n.jsx($t.Drawer.Description,{ref:r,className:h("tw-text-sm tw-text-muted-foreground",t),...e}));Ta.displayName=$t.Drawer.Description.displayName;const Ma=l.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Kn.Root,{ref:o,className:h("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...r,children:n.jsx(Kn.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Ma.displayName=Kn.Root.displayName;function Id({className:t,...e}){return n.jsx(Wn.PanelGroup,{className:h("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Od=Wn.Panel;function Ad({withHandle:t,className:e,...r}){return n.jsx(Wn.PanelResizeHandle,{className:h("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(k.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function Pd({...t}){return n.jsx(uo.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Da=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsxs(Ue.Root,{ref:r,className:h("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(Ue.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:n.jsx(Ue.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(Ue.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Da.displayName=Ue.Root.displayName;const Ia=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(qn.Root,{className:h("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(qn.Thumb,{className:h("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":o==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Ia.displayName=qn.Root.displayName;const Ld=kt.Root,Oa=l.forwardRef(({className:t,...e},r)=>{const o=ct();return n.jsx(kt.List,{ref:r,className:h("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Oa.displayName=kt.List.displayName;const Aa=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Trigger,{ref:r,className:h("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));Aa.displayName=kt.Trigger.displayName;const Pa=l.forwardRef(({className:t,...e},r)=>n.jsx(kt.Content,{ref:r,className:h("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Pa.displayName=kt.Content.displayName;const La=l.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:h("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));La.displayName="Textarea";const $d=(t,e)=>{l.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Fd(t){return{preserveValue:!0,...t}}const $a=(t,e,r={})=>{const o=l.useRef(e);o.current=e;const s=l.useRef(r);s.current=Fd(s.current);const[a,i]=l.useState(()=>o.current),[c,w]=l.useState(!0);return l.useEffect(()=>{let d=!0;return w(!!t),(async()=>{if(t){const p=await t();d&&(i(()=>p),w(!1))}})(),()=>{d=!1,s.current.preserveValue||i(()=>o.current)}},[t]),[a,c]},zn=()=>!1,Vd=(t,e)=>{const[r]=$a(l.useCallback(async()=>{if(!t)return zn;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),zn,{preserveValue:!1});l.useEffect(()=>()=>{r!==zn&&r()},[r])};function zd(t){l.useEffect(()=>{let e;return t&&(e=document.createElement("style"),e.appendChild(document.createTextNode(t)),document.head.appendChild(e)),()=>{e&&document.head.removeChild(e)}},[t])}Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>uo.toast});exports.Alert=wa;exports.AlertDescription=ua;exports.AlertTitle=pa;exports.Avatar=xr;exports.AvatarFallback=br;exports.AvatarImage=ws;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=bi;exports.BOOK_SELECTOR_STRING_KEYS=ji;exports.Badge=ye;exports.BookChapterControl=xi;exports.BookSelector=Ni;exports.Button=z;exports.CANCEL_ACCEPT_BUTTONS_STRING_KEYS=ur;exports.COMMENT_EDITOR_STRING_KEYS=Ul;exports.COMMENT_LIST_STRING_KEYS=Hl;exports.CancelAcceptButtons=mr;exports.Card=hr;exports.CardContent=gr;exports.CardDescription=cs;exports.CardFooter=ds;exports.CardHeader=is;exports.CardTitle=ls;exports.ChapterRangeSelector=To;exports.Checkbox=En;exports.Checklist=yd;exports.ComboBox=dn;exports.Command=Zt;exports.CommandEmpty=$e;exports.CommandGroup=Lt;exports.CommandInput=_e;exports.CommandItem=Ft;exports.CommandList=Jt;exports.CommentEditor=ql;exports.CommentList=Zl;exports.ContextMenu=_d;exports.ContextMenuCheckboxItem=xa;exports.ContextMenuContent=ha;exports.ContextMenuGroup=Ed;exports.ContextMenuItem=ga;exports.ContextMenuLabel=va;exports.ContextMenuPortal=Sd;exports.ContextMenuRadioGroup=Td;exports.ContextMenuRadioItem=ba;exports.ContextMenuSeparator=ya;exports.ContextMenuShortcut=ja;exports.ContextMenuSub=Rd;exports.ContextMenuSubContent=fa;exports.ContextMenuSubTrigger=ma;exports.ContextMenuTrigger=Cd;exports.DataTable=js;exports.Dialog=vo;exports.DialogClose=pi;exports.DialogContent=Qn;exports.DialogDescription=No;exports.DialogFooter=jo;exports.DialogHeader=tr;exports.DialogOverlay=Jn;exports.DialogPortal=yo;exports.DialogTitle=er;exports.DialogTrigger=wi;exports.Drawer=ka;exports.DrawerClose=Dd;exports.DrawerContent=Ca;exports.DrawerDescription=Ta;exports.DrawerFooter=Sa;exports.DrawerHeader=Ea;exports.DrawerOverlay=Fr;exports.DrawerPortal=_a;exports.DrawerTitle=Ra;exports.DrawerTrigger=Md;exports.DropdownMenu=oe;exports.DropdownMenuCheckboxItem=Yt;exports.DropdownMenuContent=Wt;exports.DropdownMenuGroup=yr;exports.DropdownMenuItem=Ze;exports.DropdownMenuItemType=_s;exports.DropdownMenuLabel=Ve;exports.DropdownMenuPortal=ps;exports.DropdownMenuRadioGroup=ms;exports.DropdownMenuRadioItem=kr;exports.DropdownMenuSeparator=Ce;exports.DropdownMenuShortcut=fs;exports.DropdownMenuSub=us;exports.DropdownMenuSubContent=Nr;exports.DropdownMenuSubTrigger=jr;exports.DropdownMenuTrigger=we;exports.ERROR_DUMP_STRING_KEYS=Ns;exports.ERROR_POPOVER_STRING_KEYS=sc;exports.EditorKeyboardShortcuts=Rs;exports.ErrorDump=ks;exports.ErrorPopover=ac;exports.FOOTNOTE_EDITOR_STRING_KEYS=Nc;exports.Filter=wc;exports.FilterDropdown=ic;exports.Footer=dc;exports.FootnoteEditor=jc;exports.FootnoteItem=Is;exports.FootnoteList=Cc;exports.INVENTORY_STRING_KEYS=Lc;exports.Input=Ee;exports.Inventory=Vc;exports.Kbd=gn;exports.Label=wt;exports.MARKER_MENU_STRING_KEYS=Ts;exports.MarkdownRenderer=oc;exports.MarkerMenu=Ms;exports.MoreInfo=lc;exports.MultiSelectComboBox=Cs;exports.NavigationContentSearch=cd;exports.Popover=Qt;exports.PopoverAnchor=So;exports.PopoverContent=Vt;exports.PopoverTrigger=ae;exports.Progress=Ma;exports.RadioGroup=kn;exports.RadioGroupItem=Xe;exports.RecentSearches=Ro;exports.ResizableHandle=Ad;exports.ResizablePanel=Od;exports.ResizablePanelGroup=Id;exports.ResultsCard=jd;exports.SCOPE_SELECTOR_STRING_KEYS=ed;exports.ScopeSelector=nd;exports.ScriptureResultsViewer=Jc;exports.ScrollGroupSelector=rd;exports.SearchBar=Sn;exports.Select=je;exports.SelectContent=ue;exports.SelectGroup=hs;exports.SelectItem=Et;exports.SelectLabel=xs;exports.SelectScrollDownButton=Cr;exports.SelectScrollUpButton=_r;exports.SelectSeparator=bs;exports.SelectTrigger=pe;exports.SelectValue=Ne;exports.Separator=de;exports.SettingsList=od;exports.SettingsListHeader=ad;exports.SettingsListItem=sd;exports.SettingsSidebar=Xs;exports.SettingsSidebarContentSearch=Kc;exports.Sidebar=Rr;exports.SidebarContent=Mr;exports.SidebarFooter=Vs;exports.SidebarGroup=xn;exports.SidebarGroupAction=Bs;exports.SidebarGroupContent=vn;exports.SidebarGroupLabel=bn;exports.SidebarHeader=Fs;exports.SidebarInput=$s;exports.SidebarInset=Tr;exports.SidebarMenu=Dr;exports.SidebarMenuAction=Gs;exports.SidebarMenuBadge=Ks;exports.SidebarMenuButton=Or;exports.SidebarMenuItem=Ir;exports.SidebarMenuSkeleton=qs;exports.SidebarMenuSub=Us;exports.SidebarMenuSubButton=Ys;exports.SidebarMenuSubItem=Hs;exports.SidebarProvider=Sr;exports.SidebarRail=Ls;exports.SidebarSeparator=zs;exports.SidebarTrigger=Ps;exports.Skeleton=hn;exports.Slider=Da;exports.Sonner=Pd;exports.Spinner=da;exports.Switch=Ia;exports.TabDropdownMenu=jn;exports.TabFloatingMenu=ld;exports.TabToolbar=id;exports.Table=Qe;exports.TableBody=en;exports.TableCaption=ys;exports.TableCell=ce;exports.TableFooter=vs;exports.TableHead=Ae;exports.TableHeader=tn;exports.TableRow=Ht;exports.Tabs=Ld;exports.TabsContent=Pa;exports.TabsList=Oa;exports.TabsTrigger=Aa;exports.TextField=Nd;exports.Textarea=La;exports.ToggleGroup=Cn;exports.ToggleGroupItem=De;exports.Toolbar=gd;exports.Tooltip=Rt;exports.TooltipContent=jt;exports.TooltipProvider=yt;exports.TooltipTrigger=Tt;exports.UNDO_REDO_BUTTONS_STRING_KEYS=Es;exports.UiLanguageSelector=bd;exports.UndoRedoButtons=Ss;exports.VerticalTabs=Pr;exports.VerticalTabsContent=$r;exports.VerticalTabsList=Lr;exports.VerticalTabsTrigger=ea;exports.Z_INDEX_ABOVE_DOCK=ke;exports.Z_INDEX_FOOTNOTE_EDITOR=Zn;exports.Z_INDEX_MODAL=bo;exports.Z_INDEX_MODAL_BACKDROP=xo;exports.Z_INDEX_OVERLAY=go;exports.badgeVariants=as;exports.buttonVariants=sr;exports.cn=h;exports.getBookIdFromUSFM=Pc;exports.getInventoryHeader=nn;exports.getLinesFromUSFM=Oc;exports.getNumberFromUSFM=Ac;exports.getStatusForItem=Os;exports.getToolbarOSReservedSpaceClassName=hd;exports.inventoryCountColumn=Dc;exports.inventoryItemColumn=Tc;exports.inventoryStatusColumn=Ic;exports.selectTriggerVariants=gs;exports.useEvent=$d;exports.useEventAsync=Vd;exports.useListbox=ss;exports.usePromise=$a;exports.useRecentSearches=mi;exports.useSidebar=rn;exports.useStylesheet=zd;function Bd(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),s=document.createElement("style");s.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(s,o):r.appendChild(s)}Bd(`*, ::before, ::after {
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
