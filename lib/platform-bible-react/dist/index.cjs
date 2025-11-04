"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("react/jsx-runtime"),s=require("react"),at=require("cmdk"),Ho=require("clsx"),Ko=require("tailwind-merge"),qo=require("@radix-ui/react-dialog"),h=require("platform-bible-utils"),S=require("lucide-react"),Ut=require("@radix-ui/react-slot"),Rt=require("class-variance-authority"),Yo=require("@radix-ui/react-popover"),Uo=require("@radix-ui/react-label"),Jo=require("@radix-ui/react-radio-group"),nt=require("@tanstack/react-table"),An=require("@radix-ui/react-dropdown-menu"),Zo=require("@radix-ui/react-select"),Wo=require("markdown-to-jsx"),Qo=require("@radix-ui/react-checkbox"),ta=require("@radix-ui/react-toggle-group"),ea=require("@radix-ui/react-toggle"),na=require("@radix-ui/react-separator"),ra=require("@radix-ui/react-tooltip"),oa=require("@radix-ui/react-tabs"),aa=require("@radix-ui/react-menubar"),sa=require("react-hotkeys-hook"),ia=require("@radix-ui/react-avatar"),wa=require("@radix-ui/react-context-menu"),lt=require("vaul"),la=require("@radix-ui/react-progress"),ca=require("react-resizable-panels"),da=require("next-themes"),zn=require("sonner"),pa=require("@radix-ui/react-slider"),ua=require("@radix-ui/react-switch");function Q(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}return e.default=t,Object.freeze(e)}const ft=Q(qo),Kt=Q(Yo),Bn=Q(Uo),se=Q(Jo),$=Q(An),q=Q(Zo),He=Q(Qo),Se=Q(ta),Gn=Q(ea),Fn=Q(na),qt=Q(ra),st=Q(oa),X=Q(aa),Jt=Q(ia),H=Q(wa),Ke=Q(la),Ue=Q(ca),oe=Q(pa),qe=Q(ua),ma=Ko.extendTailwindMerge({prefix:"tw-"});function c(...t){return ma(Ho.clsx(t))}function yt(t,e){if(t==null)return{};var r={},o=Object.keys(t),a,i;for(i=0;i<o.length;i++)a=o[i],!(e.indexOf(a)>=0)&&(r[a]=t[a]);return r}var ha=["color"],le=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,ha);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),fa=["color"],$n=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,fa);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),ga=["color"],Je=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,ga);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),ba=["color"],xa=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,ba);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),va=["color"],ya=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,va);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),Na=["color"],_e=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,Na);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z",fill:o}))}),ja=["color"],ka=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,ja);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),Ca=["color"],Sa=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,Ca);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))}),_a=["color"],Ra=s.forwardRef(function(t,e){var r=t.color,o=r===void 0?"currentColor":r,a=yt(t,_a);return s.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a,{ref:e}),s.createElement("path",{d:"M8 2H13.5C13.7761 2 14 2.22386 14 2.5V12.5C14 12.7761 13.7761 13 13.5 13H8V2ZM7 2H1.5C1.22386 2 1 2.22386 1 2.5V12.5C1 12.7761 1.22386 13 1.5 13H7V2ZM0 2.5C0 1.67157 0.671573 1 1.5 1H13.5C14.3284 1 15 1.67157 15 2.5V12.5C15 13.3284 14.3284 14 13.5 14H1.5C0.671573 14 0 13.3284 0 12.5V2.5Z",fill:o,fillRule:"evenodd",clipRule:"evenodd"}))});const Ta="layoutDirection";function tt(){const t=localStorage.getItem(Ta);return t==="rtl"?t:"ltr"}const Ma=ft.Portal,Xn=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));Xn.displayName=ft.Overlay.displayName;const Ea=s.forwardRef(({className:t,children:e,...r},o)=>{const a=tt();return n.jsxs(Ma,{children:[n.jsx(Xn,{}),n.jsxs(ft.Content,{ref:o,className:c("pr-twp","tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...r,dir:a,children:[e,n.jsxs(ft.Close,{className:c("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":a==="ltr"},{"tw-left-4":a==="rtl"}),children:[n.jsx(ya,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});Ea.displayName=ft.Content.displayName;const Ia=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));Ia.displayName=ft.Title.displayName;const Da=s.forwardRef(({className:t,...e},r)=>n.jsx(ft.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...e}));Da.displayName=ft.Description.displayName;const Bt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command,{ref:r,className:c("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));Bt.displayName=at.Command.displayName;const Zt=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3","cmdk-input-wrapper":"",dir:o,children:[n.jsx(Sa,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),n.jsx(at.Command.Input,{ref:r,className:c("tw-flex tw-h-10 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});Zt.displayName=at.Command.Input.displayName;const Gt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.List,{ref:r,className:c("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));Gt.displayName=at.Command.List.displayName;const ce=s.forwardRef((t,e)=>n.jsx(at.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));ce.displayName=at.Command.Empty.displayName;const Ct=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Group,{ref:r,className:c("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Ct.displayName=at.Command.Group.displayName;const Hn=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Separator,{ref:r,className:c("tw--mx-1 tw-h-px tw-bg-border",t),...e}));Hn.displayName=at.Command.Separator.displayName;const Tt=s.forwardRef(({className:t,...e},r)=>n.jsx(at.Command.Item,{ref:r,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",t),...e}));Tt.displayName=at.Command.Item.displayName;var Va=Object.defineProperty,Oa=(t,e,r)=>e in t?Va(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,D=(t,e,r)=>Oa(t,typeof e!="symbol"?e+"":e,r);const Pt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Ze=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],Kn=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Mn=Ha();function Wt(t,e=!0){return e&&(t=t.toUpperCase()),t in Mn?Mn[t]:0}function We(t){return Wt(t)>0}function La(t){const e=typeof t=="string"?Wt(t):t;return e>=40&&e<=66}function Pa(t){return(typeof t=="string"?Wt(t):t)<=39}function qn(t){return t<=66}function Aa(t){const e=typeof t=="string"?Wt(t):t;return Jn(e)&&!qn(e)}function*za(){for(let t=1;t<=Pt.length;t++)yield t}const Ba=1,Yn=Pt.length;function Ga(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Qe(t,e="***"){const r=t-1;return r<0||r>=Pt.length?e:Pt[r]}function Un(t){return t<=0||t>Yn?"******":Kn[t-1]}function Fa(t){return Un(Wt(t))}function Jn(t){const e=typeof t=="number"?Qe(t):t;return We(e)&&!Ze.includes(e)}function $a(t){const e=typeof t=="number"?Qe(t):t;return We(e)&&Ze.includes(e)}function Xa(t){return Kn[t-1].includes("*obsolete*")}function Ha(){const t={};for(let e=0;e<Pt.length;e++)t[Pt[e]]=e+1;return t}const A={allBookIds:Pt,nonCanonicalIds:Ze,bookIdToNumber:Wt,isBookIdValid:We,isBookNT:La,isBookOT:Pa,isBookOTNT:qn,isBookDC:Aa,allBookNumbers:za,firstBook:Ba,lastBook:Yn,extraBooks:Ga,bookNumberToId:Qe,bookNumberToEnglishName:Un,bookIdToEnglishName:Fa,isCanonical:Jn,isExtraMaterial:$a,isObsolete:Xa};var ut=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(ut||{});const it=class{constructor(e){if(D(this,"name"),D(this,"fullPath"),D(this,"isPresent"),D(this,"hasVerseSegments"),D(this,"isCustomized"),D(this,"baseVersification"),D(this,"scriptureBooks"),D(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=ut[e]):(this._type=e,this.name=ut[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};D(it,"Original",new it(ut.Original)),D(it,"Septuagint",new it(ut.Septuagint)),D(it,"Vulgate",new it(ut.Vulgate)),D(it,"English",new it(ut.English)),D(it,"RussianProtestant",new it(ut.RussianProtestant)),D(it,"RussianOrthodox",new it(ut.RussianOrthodox));let Vt=it;function En(t,e){const r=e[0];for(let o=1;o<e.length;o++)t=t.split(e[o]).join(r);return t.split(r)}var Zn=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(Zn||{});const ot=class V{constructor(e,r,o,a){if(D(this,"firstChapter"),D(this,"lastChapter"),D(this,"lastVerse"),D(this,"hasSegmentsDefined"),D(this,"text"),D(this,"BBBCCCVVVS"),D(this,"longHashCode"),D(this,"versification"),D(this,"rtlMark","‏"),D(this,"_bookNum",0),D(this,"_chapterNum",0),D(this,"_verseNum",0),D(this,"_verse"),o==null&&a==null)if(e!=null&&typeof e=="string"){const i=e,w=r!=null&&r instanceof Vt?r:void 0;this.setEmpty(w),this.parse(i)}else if(e!=null&&typeof e=="number"){const i=r!=null&&r instanceof Vt?r:void 0;this.setEmpty(i),this._verseNum=e%V.chapterDigitShifter,this._chapterNum=Math.floor(e%V.bookDigitShifter/V.chapterDigitShifter),this._bookNum=Math.floor(e/V.bookDigitShifter)}else if(r==null)if(e!=null&&e instanceof V){const i=e;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(e==null)return;const i=e instanceof Vt?e:V.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&r!=null&&o!=null)if(typeof e=="string"&&typeof r=="string"&&typeof o=="string")this.setEmpty(a),this.updateInternal(e,r,o);else if(typeof e=="number"&&typeof r=="number"&&typeof o=="number")this._bookNum=e,this._chapterNum=r,this._verseNum=o,this.versification=a??V.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let r;try{return r=new V(e),{success:!0,verseRef:r}}catch(o){if(o instanceof ne)return r=new V,{success:!1,verseRef:r};throw o}}static getBBBCCCVVV(e,r,o){return e%V.bcvMaxValue*V.bookDigitShifter+(r>=0?r%V.bcvMaxValue*V.chapterDigitShifter:0)+(o>=0?o%V.bcvMaxValue:0)}static fromJSON(e){const{book:r,chapterNum:o,verseNum:a,verse:i,versificationStr:w}=e,l=i||a.toString();let u;return w&&(u=new Vt(w)),r?new V(r,o.toString(),l,u):new V}static tryGetVerseNum(e){let r;if(!e)return r=-1,{success:!0,vNum:r};r=0;let o;for(let a=0;a<e.length;a++){if(o=e[a],o<"0"||o>"9")return a===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +o-0,r>V.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(V.verseRangeSeparator)||this._verse.includes(V.verseSequenceIndicator))}get book(){return A.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=A.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const r=+e;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:r,vNum:o}=V.tryGetVerseNum(e);this._verse=r?void 0:e.replace(this.rtlMark,""),this._verseNum=o,!(this._verseNum>=0)&&({vNum:this._verseNum}=V.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>A.lastBook)throw new ne("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new Vt(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(V.verseRangeSeparators,V.verseSequenceIndicators)}get BBBCCC(){return V.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return V.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const i=e.split("/");if(e=i[0],i.length>1)try{const w=+i[1].trim();this.versification=new Vt(ut[w])}catch{throw new ne("Invalid reference : "+e)}}const r=e.trim().split(" ");if(r.length!==2)throw new ne("Invalid reference : "+e);const o=r[1].split(":"),a=+o[0];if(o.length!==2||A.bookIdToNumber(r[0])===0||!Number.isInteger(a)||a<0||!V.isVerseParseable(o[1]))throw new ne("Invalid reference : "+e);this.updateInternal(r[0],o[0],o[1])}simplify(){this._verse=void 0}clone(){return new V(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete r.verse,r}equals(e){return e instanceof V?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,r=V.verseRangeSeparators,o=V.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const a=[],i=En(this._verse,o);for(const w of i.map(l=>En(l,r))){const l=this.clone();l.verse=w[0];const u=l.verseNum;if(a.push(l),w.length>1){const d=this.clone();if(d.verse=w[1],!e)for(let p=u+1;p<d.verseNum;p++){const f=new V(this._bookNum,this._chapterNum,p,this.versification);this.isExcluded||a.push(f)}a.push(d)}}return a}validateVerse(e,r){if(!this.verse)return this.internalValid;let o=0;for(const a of this.allVerses(!0,e,r)){const i=a.internalValid;if(i!==0)return i;const w=a.BBBCCCVVV;if(o>w)return 3;if(o===w)return 4;o=w}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>A.lastBook?2:(A.isCanonical(this._bookNum),0)}setEmpty(e=V.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,r,o){this.bookNum=A.bookIdToNumber(e),this.chapter=r,this.verse=o}};D(ot,"defaultVersification",Vt.English),D(ot,"verseRangeSeparator","-"),D(ot,"verseSequenceIndicator",","),D(ot,"verseRangeSeparators",[ot.verseRangeSeparator]),D(ot,"verseSequenceIndicators",[ot.verseSequenceIndicator]),D(ot,"chapterDigitShifter",1e3),D(ot,"bookDigitShifter",ot.chapterDigitShifter*ot.chapterDigitShifter),D(ot,"bcvMaxValue",ot.chapterDigitShifter-1),D(ot,"ValidStatusType",Zn);class ne extends Error{}const Wn=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"Old Testament";case h.Section.NT:return r??"New Testament";case h.Section.DC:return o??"Deuterocanon";case h.Section.Extra:return a??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Ka=(t,e,r,o,a)=>{switch(t){case h.Section.OT:return e??"OT";case h.Section.NT:return r??"NT";case h.Section.DC:return o??"DC";case h.Section.Extra:return a??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Ht(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedName)??A.bookIdToEnglishName(t)}function tn(t,e){var o;return((o=e==null?void 0:e.get(t))==null?void 0:o.localizedId)??t.toUpperCase()}const Qn=A.allBookIds.filter(t=>!A.isObsolete(A.bookIdToNumber(t))),Lt=Object.fromEntries(Qn.map(t=>[t,A.bookIdToEnglishName(t)]));function en(t,e,r){const o=e.trim().toLowerCase();if(!o)return!1;const a=A.bookIdToEnglishName(t),i=r==null?void 0:r.get(t);return!!(h.includes(a.toLowerCase(),o)||h.includes(t.toLowerCase(),o)||(i?h.includes(i.localizedName.toLowerCase(),o)||h.includes(i.localizedId.toLowerCase(),o):!1))}const tr=s.forwardRef(({bookId:t,isSelected:e,onSelect:r,onMouseDown:o,section:a,className:i,showCheck:w=!1,localizedBookNames:l,commandValue:u},d)=>{const p=s.useRef(!1),f=()=>{p.current||r==null||r(t),setTimeout(()=>{p.current=!1},100)},m=y=>{p.current=!0,o?o(y):r==null||r(t)},g=s.useMemo(()=>Ht(t,l),[t,l]),b=s.useMemo(()=>tn(t,l),[t,l]);return n.jsx("div",{className:c("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":a===h.Section.OT,"tw-border-s-purple-200":a===h.Section.NT,"tw-border-s-indigo-200":a===h.Section.DC,"tw-border-s-amber-200":a===h.Section.Extra}),children:n.jsxs(Tt,{ref:d,value:u||`${t} ${A.bookIdToEnglishName(t)}`,onSelect:f,onMouseDown:m,role:"option","aria-selected":e,"aria-label":`${A.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[w&&n.jsx(S.Check,{className:c("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),n.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:g}),n.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),er=Rt.cva(c("pr-twp","tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0"),{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground tw-shadow-sm hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background tw-shadow-sm hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground tw-shadow-sm hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-9 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3 tw-text-xs",lg:"tw-h-10 tw-rounded-md tw-px-8",icon:"tw-h-9 tw-w-9"}},defaultVariants:{variant:"default",size:"default"}}),E=s.forwardRef(({className:t,variant:e,size:r,asChild:o=!1,...a},i)=>{const w=o?Ut.Slot:"button";return n.jsx(w,{className:c(er({variant:e,size:r,className:t})),ref:i,...a})});E.displayName="Button";const Ft=Kt.Root,$t=Kt.Trigger,qa=Kt.Anchor,Mt=s.forwardRef(({className:t,align:e="center",sideOffset:r=4,...o},a)=>{const i=tt();return n.jsx(Kt.Portal,{children:n.jsx(Kt.Content,{ref:a,align:e,sideOffset:r,className:c("pr-twp","tw-z-[250]","tw-w-72 tw-origin-[--radix-popover-content-transform-origin] tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,dir:i})})});Mt.displayName=Kt.Content.displayName;function Ye(t,e,r){return`${t} ${Lt[t]}${e?` ${tn(t,e)} ${Ht(t,e)}`:""}${r?` ${r}`:""}`}function nr({recentSearches:t,onSearchItemSelect:e,renderItem:r=l=>String(l),getItemKey:o=l=>String(l),ariaLabel:a="Show recent searches",groupHeading:i="Recent",id:w}){const[l,u]=s.useState(!1);if(t.length===0)return;const d=p=>{e(p),u(!1)};return n.jsxs(Ft,{open:l,onOpenChange:u,children:[n.jsx($t,{asChild:!0,children:n.jsx(E,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":a,children:n.jsx(S.Clock,{className:"tw-h-4 tw-w-4"})})}),n.jsx(Mt,{id:w,className:"tw-w-[300px] tw-p-0",align:"start",children:n.jsx(Bt,{children:n.jsx(Gt,{children:n.jsx(Ct,{heading:i,children:t.map(p=>n.jsxs(Tt,{onSelect:()=>d(p),className:"tw-flex tw-items-center",children:[n.jsx(S.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),n.jsx("span",{children:r(p)})]},o(p)))})})})})]})}function Ya(t,e,r=(a,i)=>a===i,o=15){return a=>{const i=t.filter(l=>!r(l,a)),w=[a,...i.slice(0,o-1)];e(w)}}const ze={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},Ua=[ze.BOOK_ONLY,ze.BOOK_CHAPTER,ze.BOOK_CHAPTER_VERSE];function In(t){const e=/^[a-zA-Z]$/.test(t),r=/^[0-9]$/.test(t);return{isLetter:e,isDigit:r}}function mt(t){return h.getChaptersForBook(A.bookIdToNumber(t))}function Ja(t,e,r){if(!t.trim()||e.length===0)return;const o=Ua.reduce((a,i)=>{if(a)return a;const w=i.exec(t.trim());if(w){const[l,u=void 0,d=void 0]=w.slice(1);let p;const f=e.filter(m=>en(m,l,r));if(f.length===1&&([p]=f),!p&&u){if(A.isBookIdValid(l)){const m=l.toUpperCase();e.includes(m)&&(p=m)}if(!p&&r){const m=Array.from(r.entries()).find(([,g])=>g.localizedId.toLowerCase()===l.toLowerCase());m&&e.includes(m[0])&&([p]=m)}}if(!p&&u){const g=(b=>Object.keys(Lt).find(y=>Lt[y].toLowerCase()===b.toLowerCase()))(l);if(g&&e.includes(g)&&(p=g),!p&&r){const b=Array.from(r.entries()).find(([,y])=>y.localizedName.toLowerCase()===l.toLowerCase());b&&e.includes(b[0])&&([p]=b)}}if(p){let m=u?parseInt(u,10):void 0;m&&m>mt(p)&&(m=Math.max(mt(p),1));const g=d?parseInt(d,10):void 0;return{book:p,chapterNum:m,verseNum:g}}}},void 0);if(o)return o}function Za(t,e,r,o){const a=s.useCallback(()=>{if(t.chapterNum>1)o({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const u=e.indexOf(t.book);if(u>0){const d=e[u-1],p=Math.max(mt(d),1);o({book:d,chapterNum:p,verseNum:1})}}},[t,e,o]),i=s.useCallback(()=>{const u=mt(t.book);if(t.chapterNum<u)o({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const d=e.indexOf(t.book);if(d<e.length-1){const p=e[d+1];o({book:p,chapterNum:1,verseNum:1})}}},[t,e,o]),w=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,o]),l=s.useCallback(()=>{o({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,o]);return s.useMemo(()=>[{onClick:a,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:r==="ltr"?S.ChevronsLeft:S.ChevronsRight},{onClick:w,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:r==="ltr"?S.ChevronLeft:S.ChevronRight},{onClick:l,disabled:e.length===0,title:"Next verse",icon:r==="ltr"?S.ChevronRight:S.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===mt(t.book)||mt(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:r==="ltr"?S.ChevronsRight:S.ChevronsLeft}],[t,e,r,a,w,l,i])}function Dn({bookId:t,scrRef:e,onChapterSelect:r,setChapterRef:o,isChapterDimmed:a,className:i}){if(t)return n.jsx(Ct,{children:n.jsx("div",{className:c("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:mt(t)},(w,l)=>l+1).map(w=>n.jsx(Tt,{value:`${t} ${Lt[t]||""} ${w}`,onSelect:()=>r(w),ref:o(w),className:c("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&w===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(a==null?void 0:a(w))??!1}),children:w},w))})})}function Wa({scrRef:t,handleSubmit:e,className:r,getActiveBookIds:o,localizedBookNames:a,localizedStrings:i,recentSearches:w,onAddRecentSearch:l,id:u}){const d=tt(),[p,f]=s.useState(!1),[m,g]=s.useState(""),[b,y]=s.useState(""),[N,I]=s.useState("books"),[v,_]=s.useState(void 0),[B,L]=s.useState(!1),O=s.useRef(void 0),G=s.useRef(void 0),F=s.useRef(void 0),k=s.useRef(void 0),C=s.useRef({}),z=s.useCallback(x=>{e(x),l&&l(x)},[e,l]),M=s.useMemo(()=>o?o():Qn,[o]),Y=s.useMemo(()=>({[h.Section.OT]:M.filter(P=>A.isBookOT(P)),[h.Section.NT]:M.filter(P=>A.isBookNT(P)),[h.Section.DC]:M.filter(P=>A.isBookDC(P)),[h.Section.Extra]:M.filter(P=>A.extraBooks().includes(P))}),[M]),R=s.useMemo(()=>Object.values(Y).flat(),[Y]),K=s.useMemo(()=>{if(!b.trim())return Y;const x={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return[h.Section.OT,h.Section.NT,h.Section.DC,h.Section.Extra].forEach(Z=>{x[Z]=Y[Z].filter(et=>en(et,b,a))}),x},[Y,b,a]),j=s.useMemo(()=>Ja(b,R,a),[b,R,a]),U=s.useCallback(()=>{j&&(z({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1}),f(!1),y(""),g(""))},[z,j]),bt=s.useCallback(x=>{if(mt(x)<=1){z({book:x,chapterNum:1,verseNum:1}),f(!1),y("");return}_(x),I("chapters")},[z]),Xt=s.useCallback(x=>{const P=N==="chapters"?v:j==null?void 0:j.book;P&&(z({book:P,chapterNum:x,verseNum:1}),f(!1),I("books"),_(void 0),y(""))},[z,N,v,j]),Et=s.useCallback(x=>{z(x),f(!1),y("")},[z]),T=Za(t,R,d,e),J=s.useCallback(()=>{I("books"),_(void 0),setTimeout(()=>{G.current&&G.current.focus()},0)},[]),ct=s.useCallback(x=>{if(!x&&N==="chapters"){J();return}f(x),x&&(I("books"),_(void 0),y(""))},[N,J]),{otLong:dt,ntLong:xt,dcLong:Sn,extraLong:_n}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},zo=s.useCallback(x=>Wn(x,dt,xt,Sn,_n),[dt,xt,Sn,_n]),Bo=s.useCallback(x=>j?!!j.chapterNum&&!x.toString().includes(j.chapterNum.toString()):!1,[j]),Go=s.useMemo(()=>h.formatScrRef(t,a?Ht(t.book,a):"English"),[t,a]),Rn=s.useCallback(x=>P=>{C.current[x]=P},[]),Fo=s.useCallback(x=>{(x.key==="Home"||x.key==="End")&&x.stopPropagation()},[]),$o=s.useCallback(x=>{if(x.ctrlKey)return;const{isLetter:P,isDigit:Z}=In(x.key);if(N==="chapters"){if(x.key==="Backspace"){x.preventDefault(),x.stopPropagation(),J();return}if(P||Z){if(x.preventDefault(),x.stopPropagation(),I("books"),_(void 0),Z&&v){const et=Lt[v];y(`${et} ${x.key}`)}else y(x.key);setTimeout(()=>{G.current&&G.current.focus()},0);return}}if((N==="chapters"||N==="books"&&j)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(x.key)){const et=N==="chapters"?v:j==null?void 0:j.book;if(!et)return;const rt=(()=>{if(!m)return 1;const ee=m.match(/(\d+)$/);return ee?parseInt(ee[1],10):0})(),It=mt(et);if(!It)return;let vt=rt;const Tn=6;switch(x.key){case"ArrowLeft":rt!==0&&(vt=rt>1?rt-1:It);break;case"ArrowRight":rt!==0&&(vt=rt<It?rt+1:1);break;case"ArrowUp":vt=rt===0?It:Math.max(1,rt-Tn);break;case"ArrowDown":vt=rt===0?1:Math.min(It,rt+Tn);break;default:return}vt!==rt&&(x.preventDefault(),x.stopPropagation(),g(Ye(et,a,vt)),setTimeout(()=>{const ee=C.current[vt];ee&&ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[N,j,J,v,m,a]),Xo=s.useCallback(x=>{if(x.shiftKey||x.key==="Tab"||x.key===" ")return;const{isLetter:P,isDigit:Z}=In(x.key);(P||Z)&&(x.preventDefault(),y(et=>et+x.key),G.current.focus(),L(!1))},[]);return s.useLayoutEffect(()=>{const x=setTimeout(()=>{if(p&&N==="books"&&F.current&&k.current){const P=F.current,Z=k.current,et=Z.offsetTop,rt=P.clientHeight,It=Z.clientHeight,vt=et-rt/2+It/2;P.scrollTo({top:Math.max(0,vt),behavior:"smooth"}),g(Ye(t.book))}},0);return()=>{clearTimeout(x)}},[p,N,b,j,t.book]),s.useLayoutEffect(()=>{if(N==="chapters"&&v){const x=v===t.book;setTimeout(()=>{if(F.current)if(x){const P=C.current[t.chapterNum];P&&P.scrollIntoView({block:"center",behavior:"smooth"})}else F.current.scrollTo({top:0});O.current&&O.current.focus()},0)}},[N,v,j,t.book,t.chapterNum]),n.jsxs(Ft,{open:p,onOpenChange:ct,children:[n.jsx($t,{asChild:!0,children:n.jsx(E,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":p,className:c("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",r),children:n.jsx("span",{className:"tw-truncate",children:Go})})}),n.jsx(Mt,{id:u,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:n.jsxs(Bt,{ref:O,onKeyDown:$o,loop:!0,value:m,onValueChange:g,shouldFilter:!1,children:[N==="books"?n.jsxs("div",{className:"tw-flex tw-items-end",children:[n.jsxs("div",{className:"tw-relative tw-flex-1",children:[n.jsx(Zt,{ref:G,value:b,onValueChange:y,onKeyDown:Fo,onFocus:()=>L(!1),className:w&&w.length>0?"!tw-pr-10":""}),w&&w.length>0&&n.jsx(nr,{recentSearches:w,onSearchItemSelect:Et,renderItem:x=>h.formatScrRef(x,"English"),getItemKey:x=>`${x.book}-${x.chapterNum}-${x.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:T.map(({onClick:x,disabled:P,title:Z,icon:et})=>n.jsx(E,{variant:"ghost",size:"sm",onClick:()=>{L(!0),x()},disabled:P,className:"tw-h-10 tw-w-4 tw-p-0",title:Z,onKeyDown:Xo,children:n.jsx(et,{})},Z))})]}):n.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:J,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:d==="ltr"?n.jsx(S.ArrowLeft,{className:"tw-h-4 tw-w-4"}):n.jsx(S.ArrowRight,{className:"tw-h-4 tw-w-4"})}),v&&n.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Ht(v,a)})]}),!B&&n.jsxs(Gt,{ref:F,children:[N==="books"&&n.jsxs(n.Fragment,{children:[!j&&Object.entries(K).map(([x,P])=>{if(P.length!==0)return n.jsx(Ct,{heading:zo(x),children:P.map(Z=>n.jsx(tr,{bookId:Z,onSelect:et=>bt(et),section:h.getSectionForBook(Z),commandValue:`${Z} ${Lt[Z]}`,ref:Z===t.book?k:void 0,localizedBookNames:a},Z))},x)}),j&&n.jsx(Ct,{children:n.jsx(Tt,{value:`${j.book} ${Lt[j.book]} ${j.chapterNum||""}:${j.verseNum||""})}`,onSelect:U,className:"tw-font-semibold tw-text-primary",children:h.formatScrRef({book:j.book,chapterNum:j.chapterNum??1,verseNum:j.verseNum??1},a?tn(j.book,a):void 0)},"top-match")}),j&&mt(j.book)>1&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Ht(j.book,a)}),n.jsx(Dn,{bookId:j.book,scrRef:t,onChapterSelect:Xt,setChapterRef:Rn,isChapterDimmed:Bo,className:"tw-px-4 tw-pb-4"})]})]}),N==="chapters"&&v&&n.jsx(Dn,{bookId:v,scrRef:t,onChapterSelect:Xt,setChapterRef:Rn,className:"tw-p-4"})]})]})})]})}const Qa=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),ts=Rt.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),W=s.forwardRef(({className:t,...e},r)=>n.jsx(Bn.Root,{ref:r,className:c("pr-twp",ts(),t),...e}));W.displayName=Bn.Root.displayName;const Re=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(se.Root,{className:c("pr-twp","tw-grid tw-gap-2",t),...e,ref:r,dir:o})});Re.displayName=se.Root.displayName;const ie=s.forwardRef(({className:t,...e},r)=>n.jsx(se.Item,{ref:r,className:c("pr-twp","tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-shadow focus:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:n.jsx(se.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:n.jsx(_e,{className:"tw-h-3.5 tw-w-3.5 tw-fill-primary"})})}));ie.displayName=se.Item.displayName;function es(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function be({id:t,options:e=[],className:r,buttonClassName:o,popoverContentClassName:a,value:i,onChange:w=()=>{},getOptionLabel:l=es,icon:u=void 0,buttonPlaceholder:d="",textPlaceholder:p="",commandEmptyMessage:f="No option found",buttonVariant:m="outline",alignDropDown:g="start",isDisabled:b=!1,...y}){const[N,I]=s.useState(!1);return n.jsxs(Ft,{open:N,onOpenChange:I,...y,children:[n.jsx($t,{asChild:!0,children:n.jsxs(E,{variant:m,role:"combobox","aria-expanded":N,id:t,className:c("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",o??r),disabled:b,children:[n.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&n.jsx("div",{className:"tw-pe-2",children:u}),n.jsx("span",{className:c("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?l(i):d})]}),n.jsx(S.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Mt,{align:g,className:c("tw-w-[200px] tw-p-0",a),children:n.jsxs(Bt,{children:[n.jsx(Zt,{placeholder:p,className:"tw-text-inherit"}),n.jsx(ce,{children:f}),n.jsx(Gt,{children:e.map(v=>n.jsxs(Tt,{value:l(v),onSelect:()=>{w(v),I(!1)},children:[n.jsx(S.Check,{className:c("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||l(i)!==l(v)})}),l(v)]},l(v)))})]})})]})}function rr({startChapter:t,endChapter:e,handleSelectStartChapter:r,handleSelectEndChapter:o,isDisabled:a=!1,chapterCount:i}){const w=s.useMemo(()=>Array.from({length:i},(d,p)=>p+1),[i]),l=d=>{r(d),d>e&&o(d)},u=d=>{o(d),d<t&&r(d)};return n.jsxs(n.Fragment,{children:[n.jsx(W,{htmlFor:"start-chapters-combobox",children:"Chapters"}),n.jsx(be,{isDisabled:a,onChange:l,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:t},"start chapter"),n.jsx(W,{htmlFor:"end-chapters-combobox",children:"to"}),n.jsx(be,{isDisabled:a,onChange:u,buttonClassName:"tw-ms-2 tw-w-20",options:w,getOptionLabel:d=>d.toString(),value:e},"end chapter")]})}var or=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(or||{});const ns=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Be=(t,e)=>t[e]??e;function rs({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:r,selectedBookIds:o,chapterCount:a,endChapter:i,handleSelectEndChapter:w,startChapter:l,handleSelectStartChapter:u,localizedStrings:d}){const p=Be(d,"%webView_bookSelector_currentBook%"),f=Be(d,"%webView_bookSelector_choose%"),m=Be(d,"%webView_bookSelector_chooseBooks%"),[g,b]=s.useState("current book"),y=N=>{b(N),t(N)};return n.jsx(Re,{className:"pr-twp tw-flex",value:g,onValueChange:N=>y(N),children:n.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ie,{value:"current book"}),n.jsx(W,{className:"tw-ms-1",children:p})]}),n.jsx(W,{className:"tw-flex tw-items-center",children:e}),n.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:n.jsx(rr,{isDisabled:g==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:w,chapterCount:a,startChapter:l,endChapter:i})})]}),n.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ie,{value:"choose books"}),n.jsx(W,{className:"tw-ms-1",children:m})]}),n.jsx(W,{className:"tw-flex tw-items-center",children:o.map(N=>A.bookIdToEnglishName(N)).join(", ")}),n.jsx(E,{disabled:g==="current book",onClick:()=>r(),children:f})]})]})})}const nn=s.createContext(void 0);function gt(){const t=s.useContext(nn);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const Nt=Rt.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}});function de({variant:t="default",...e}){const r=s.useMemo(()=>({variant:t}),[t]);return n.jsx(nn.Provider,{value:r,children:n.jsx($.Root,{...e})})}const Te=$.Trigger,rn=$.Group,ar=$.Portal,sr=$.Sub,ir=$.RadioGroup,on=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=gt();return n.jsxs($.SubTrigger,{ref:a,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",e&&"tw-ps-8",t,Nt({variant:i.variant})),...o,children:[r,n.jsx(Je,{className:"tw-ms-auto"})," "]})});on.displayName=$.SubTrigger.displayName;const an=s.forwardRef(({className:t,...e},r)=>n.jsx($.SubContent,{ref:r,className:c("tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-dropdown-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));an.displayName=$.SubContent.displayName;const Qt=s.forwardRef(({className:t,sideOffset:e=4,children:r,...o},a)=>{const i=tt();return n.jsx($.Portal,{children:n.jsxs($.Content,{ref:a,sideOffset:e,className:c("pr-twp","tw-z-50 tw-max-h-[var(--radix-dropdown-menu-content-available-height)] tw-min-w-[8rem] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md","tw-origin-[--radix-dropdown-menu-content-transform-origin] data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...o,children:[n.jsx("div",{dir:i,children:r})," "]})})});Qt.displayName=$.Content.displayName;const sn=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=tt(),i=gt();return n.jsx($.Item,{ref:o,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-gap-2 tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",e&&"tw-ps-8",t,Nt({variant:i.variant})),...r,dir:a})});sn.displayName=$.Item.displayName;const Me=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=gt();return n.jsxs($.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50","tw-pe-2 tw-ps-8",t,Nt({variant:i.variant})),checked:r,...o,children:[n.jsx("span",{className:c("tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center","ltr:tw-left-2 rtl:tw-right-2"),children:n.jsx($.ItemIndicator,{children:n.jsx(le,{className:"tw-h-4 tw-w-4"})})}),e]})});Me.displayName=$.CheckboxItem.displayName;const wn=s.forwardRef(({className:t,children:e,...r},o)=>{const a=gt();return n.jsxs($.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50","tw-pe-2 tw-ps-8",t,Nt({variant:a.variant})),...r,children:[n.jsx("span",{className:c("tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center","ltr:tw-left-2 rtl:tw-right-2"),children:n.jsx($.ItemIndicator,{children:n.jsx(_e,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});wn.displayName=$.RadioItem.displayName;const Ee=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx($.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-ps-8",t),...r}));Ee.displayName=$.Label.displayName;const pe=s.forwardRef(({className:t,...e},r)=>n.jsx($.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));pe.displayName=$.Separator.displayName;function wr({className:t,...e}){return n.jsx("span",{className:c("tw-text-xs tw-tracking-widest tw-opacity-60","tw-ms-auto",t),...e})}wr.displayName="DropdownMenuShortcut";function os({table:t}){return n.jsxs(de,{children:[n.jsx(An.DropdownMenuTrigger,{asChild:!0,children:n.jsxs(E,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[n.jsx(S.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),n.jsxs(Qt,{align:"end",className:"tw-w-[150px]",children:[n.jsx(Ee,{children:"Toggle columns"}),n.jsx(pe,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>n.jsx(Me,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:r=>e.toggleVisibility(!!r),children:e.id},e.id))]})]})}const At=q.Root,lr=q.Group,zt=q.Value,cr=Rt.cva("tw-flex tw-h-9 tw-w-full tw-items-center tw-justify-between tw-whitespace-nowrap tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-2 tw-text-sm tw-shadow-sm tw-ring-offset-background data-[placeholder]:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),St=s.forwardRef(({className:t,children:e,size:r,...o},a)=>{const i=tt();return n.jsxs(q.Trigger,{className:c(cr({size:r,className:t})),ref:a,...o,dir:i,children:[e,n.jsx(q.Icon,{asChild:!0,children:n.jsx($n,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});St.displayName=q.Trigger.displayName;const ln=s.forwardRef(({className:t,...e},r)=>n.jsx(q.ScrollUpButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx(xa,{className:"tw-h-4 tw-w-4"})}));ln.displayName=q.ScrollUpButton.displayName;const cn=s.forwardRef(({className:t,...e},r)=>n.jsx(q.ScrollDownButton,{ref:r,className:c("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:n.jsx($n,{className:"tw-h-4 tw-w-4"})}));cn.displayName=q.ScrollDownButton.displayName;const _t=s.forwardRef(({className:t,children:e,position:r="popper",...o},a)=>{const i=tt();return n.jsx(q.Portal,{children:n.jsxs(q.Content,{ref:a,className:c("pr-twp","tw-relative tw-z-50 tw-max-h-[--radix-select-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-select-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:r,...o,children:[n.jsx(ln,{}),n.jsxs(q.Viewport,{className:c("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:[n.jsx("div",{dir:i,children:e})," "]}),n.jsx(cn,{})]})})});_t.displayName=q.Content.displayName;const dr=s.forwardRef(({className:t,...e},r)=>n.jsx(q.Label,{ref:r,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",t),...e}));dr.displayName=q.Label.displayName;const wt=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(q.Item,{ref:o,className:c("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50","tw-pe-8 tw-ps-2",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-end-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(q.ItemIndicator,{children:n.jsx(le,{className:"tw-h-4 tw-w-4"})})}),n.jsx(q.ItemText,{children:e})]}));wt.displayName=q.Item.displayName;const pr=s.forwardRef(({className:t,...e},r)=>n.jsx(q.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));pr.displayName=q.Separator.displayName;function as({table:t}){return n.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[n.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),n.jsxs(At,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[n.jsx(St,{className:"tw-h-8 tw-w-[70px]",children:n.jsx(zt,{placeholder:t.getState().pagination.pageSize})}),n.jsx(_t,{side:"top",children:[10,20,30,40,50].map(e=>n.jsx(wt,{value:`${e}`,children:e},e))})]})]}),n.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),n.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[n.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),n.jsx(S.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),n.jsx(S.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),n.jsx(S.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),n.jsxs(E,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[n.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),n.jsx(S.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const Vn=`
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
`;function ss(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function we(t,e){const r=e?`${Vn}, ${e}`:Vn;return Array.from(t.querySelectorAll(r)).filter(o=>!o.hasAttribute("disabled")&&!o.getAttribute("aria-hidden")&&ss(o))}const ue=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>{const a=s.useRef(null);s.useEffect(()=>{typeof o=="function"?o(a.current):o&&"current"in o&&(o.current=a.current)},[o]),s.useEffect(()=>{const w=a.current;if(!w)return;const l=()=>{requestAnimationFrame(()=>{we(w,'[tabindex]:not([tabindex="-1"])').forEach(p=>{p.setAttribute("tabindex","-1")})})};l();const u=new MutationObserver(()=>{l()});return u.observe(w,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{u.disconnect()}},[]);const i=w=>{const{current:l}=a;if(l){if(w.key==="ArrowDown"){w.preventDefault(),we(l)[0].focus();return}w.key===" "&&document.activeElement===l&&w.preventDefault()}};return n.jsx("div",{className:c("pr-twp","tw-relative tw-w-full tw-overflow-auto",{"tw-p-1":e}),children:n.jsx("table",{tabIndex:0,onKeyDown:i,ref:a,className:c("tw-w-full tw-caption-bottom tw-text-sm","tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...r})})});ue.displayName="Table";const me=s.forwardRef(({className:t,stickyHeader:e,...r},o)=>n.jsx("thead",{ref:o,className:c("[&_tr]:tw-border-b",{"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},t),...r}));me.displayName="TableHeader";const he=s.forwardRef(({className:t,...e},r)=>n.jsx("tbody",{ref:r,className:c("[&_tr:last-child]:tw-border-0",t),...e}));he.displayName="TableBody";const ur=s.forwardRef(({className:t,...e},r)=>n.jsx("tfoot",{ref:r,className:c("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));ur.displayName="TableFooter";function is(t){s.useEffect(()=>{const e=t.current;if(!e)return;const r=o=>{if(e.contains(document.activeElement)){if(o.key==="ArrowRight"||o.key==="ArrowLeft"){o.preventDefault(),o.stopPropagation();const a=t.current?we(t.current):[],i=a.indexOf(document.activeElement),w=o.key==="ArrowRight"?i+1:i-1;w>=0&&w<a.length&&a[w].focus()}o.key==="Escape"&&(o.preventDefault(),e.focus()),(o.key==="ArrowDown"||o.key==="ArrowUp")&&o.preventDefault()}};return e.addEventListener("keydown",r),()=>{e.removeEventListener("keydown",r)}},[t])}function ws(t,e,r){let o;return r==="ArrowLeft"&&e>0?o=t[e-1]:r==="ArrowRight"&&e<t.length-1&&(o=t[e+1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}function ls(t,e,r){let o;return r==="ArrowDown"&&e<t.length-1?o=t[e+1]:r==="ArrowUp"&&e>0&&(o=t[e-1]),o?(requestAnimationFrame(()=>o.focus()),!0):!1}const ht=s.forwardRef(({className:t,onKeyDown:e,onSelect:r,setFocusAlsoRunsSelect:o=!1,...a},i)=>{const w=s.useRef(null);s.useEffect(()=>{typeof i=="function"?i(w.current):i&&"current"in i&&(i.current=w.current)},[i]),is(w);const l=s.useMemo(()=>w.current?we(w.current):[],[w]),u=s.useCallback(p=>{const{current:f}=w;if(!f||!f.parentElement)return;const m=f.closest("table"),g=m?we(m).filter(N=>N.tagName==="TR"):[],b=g.indexOf(f),y=l.indexOf(document.activeElement);if(p.key==="ArrowDown"||p.key==="ArrowUp")p.preventDefault(),ls(g,b,p.key);else if(p.key==="ArrowLeft"||p.key==="ArrowRight")p.preventDefault(),ws(l,y,p.key);else if(p.key==="Escape"){p.preventDefault();const N=f.closest("table");N&&N.focus()}e==null||e(p)},[w,l,e]),d=s.useCallback(p=>{o&&(r==null||r(p))},[o,r]);return n.jsx("tr",{ref:w,tabIndex:-1,onKeyDown:u,onFocus:d,className:c("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted","tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),...a})});ht.displayName="TableRow";const Yt=s.forwardRef(({className:t,...e},r)=>n.jsx("th",{ref:r,className:c("tw-h-10 tw-px-2 tw-text-left tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pr-0 [&>[role=checkbox]]:tw-translate-y-[2px]",t),...e}));Yt.displayName="TableHead";const kt=s.forwardRef(({className:t,...e},r)=>n.jsx("td",{ref:r,className:c("tw-p-2 tw-align-middle [&:has([role=checkbox])]:tw-pr-0 [&>[role=checkbox]]:tw-translate-y-[2px]",t),...e}));kt.displayName="TableCell";const mr=s.forwardRef(({className:t,...e},r)=>n.jsx("caption",{ref:r,className:c("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));mr.displayName="TableCaption";function xe({className:t,...e}){return n.jsx("div",{className:c("pr-twp","tw-animate-pulse tw-rounded-md tw-bg-primary/10",t),...e})}function hr({columns:t,data:e,enablePagination:r=!1,showPaginationControls:o=!1,showColumnVisibilityControls:a=!1,stickyHeader:i=!1,onRowClickHandler:w=()=>{},id:l,isLoading:u=!1,noResultsMessage:d}){var O;const[p,f]=s.useState([]),[m,g]=s.useState([]),[b,y]=s.useState({}),[N,I]=s.useState({}),v=s.useMemo(()=>e??[],[e]),_=nt.useReactTable({data:v,columns:t,getCoreRowModel:nt.getCoreRowModel(),...r&&{getPaginationRowModel:nt.getPaginationRowModel()},onSortingChange:f,getSortedRowModel:nt.getSortedRowModel(),onColumnFiltersChange:g,getFilteredRowModel:nt.getFilteredRowModel(),onColumnVisibilityChange:y,onRowSelectionChange:I,state:{sorting:p,columnFilters:m,columnVisibility:b,rowSelection:N}}),B=_.getVisibleFlatColumns();let L;return u?L=Array.from({length:10}).map((k,C)=>`skeleton-row-${C}`).map(k=>n.jsx(ht,{children:n.jsx(kt,{colSpan:B.length??t.length,className:"tw-border-0 tw-p-0",children:n.jsx("div",{className:"tw-w-full tw-py-2",children:n.jsx(xe,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},k)):((O=_.getRowModel().rows)==null?void 0:O.length)>0?L=_.getRowModel().rows.map(G=>n.jsx(ht,{onClick:()=>w(G,_),"data-state":G.getIsSelected()&&"selected",children:G.getVisibleCells().map(F=>n.jsx(kt,{children:nt.flexRender(F.column.columnDef.cell,F.getContext())},F.id))},G.id)):L=n.jsx(ht,{children:n.jsx(kt,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:d})}),n.jsxs("div",{className:"pr-twp",id:l,children:[a&&n.jsx(os,{table:_}),n.jsxs(ue,{stickyHeader:i,children:[n.jsx(me,{stickyHeader:i,children:_.getHeaderGroups().map(G=>n.jsx(ht,{children:G.headers.map(F=>n.jsx(Yt,{children:F.isPlaceholder?void 0:nt.flexRender(F.column.columnDef.header,F.getContext())},F.id))},G.id))}),n.jsx(he,{children:L})]}),r&&n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[n.jsx(E,{variant:"outline",size:"sm",onClick:()=>_.previousPage(),disabled:!_.getCanPreviousPage(),children:"Previous"}),n.jsx(E,{variant:"outline",size:"sm",onClick:()=>_.nextPage(),disabled:!_.getCanNextPage(),children:"Next"})]}),r&&o&&n.jsx(as,{table:_})]})}function cs({id:t,markdown:e,className:r,anchorTarget:o}){const a=s.useMemo(()=>({overrides:{a:{props:{target:o}}}}),[o]);return n.jsx("div",{id:t,className:c("pr-twp tw-prose",r),children:n.jsx(Wo,{options:a,children:e})})}const fr=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),On=(t,e)=>t[e]??e;function gr({errorDetails:t,handleCopyNotify:e,localizedStrings:r,id:o}){const a=On(r,"%webView_error_dump_header%"),i=On(r,"%webView_error_dump_info_message%");function w(){navigator.clipboard.writeText(t),e&&e()}return n.jsxs("div",{id:o,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[n.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[n.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[n.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:a}),n.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),n.jsx(E,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>w(),children:n.jsx(S.Copy,{})})]}),n.jsx("div",{className:"tw-prose tw-w-full",children:n.jsx("pre",{className:"tw-text-xs",children:t})})]})}const ds=Object.freeze([...fr,"%webView_error_dump_copied_message%"]);function ps({errorDetails:t,handleCopyNotify:e,localizedStrings:r,children:o,className:a,id:i}){const[w,l]=s.useState(!1),u=()=>{l(!0),e&&e()},d=p=>{p||l(!1)};return n.jsxs(Ft,{onOpenChange:d,children:[n.jsx($t,{asChild:!0,children:o}),n.jsxs(Mt,{id:i,className:c("tw-min-w-80 tw-max-w-96",a),children:[w&&r["%webView_error_dump_copied_message%"]&&n.jsx(W,{children:r["%webView_error_dump_copied_message%"]}),n.jsx(gr,{errorDetails:t,handleCopyNotify:u,localizedStrings:r})]})]})}var br=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(br||{});function us({id:t,label:e,groups:r}){const[o,a]=s.useState(Object.fromEntries(r.map((d,p)=>d.itemType===0?[p,[]]:void 0).filter(d=>!!d))),[i,w]=s.useState({}),l=(d,p)=>{const f=!o[d][p];a(g=>(g[d][p]=f,{...g}));const m=r[d].items[p];m.onUpdate(m.id,f)},u=(d,p)=>{w(m=>(m[d]=p,{...m}));const f=r[d].items.find(m=>m.id===p);f?f.onUpdate(p):console.error(`Could not find dropdown radio item with id '${p}'!`)};return n.jsx("div",{id:t,children:n.jsxs(de,{children:[n.jsx(Te,{asChild:!0,children:n.jsxs(E,{variant:"default",children:[n.jsx(S.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,n.jsx(S.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),n.jsx(Qt,{children:r.map((d,p)=>n.jsxs("div",{children:[n.jsx(Ee,{children:d.label}),n.jsx(rn,{children:d.itemType===0?n.jsx(n.Fragment,{children:d.items.map((f,m)=>n.jsx("div",{children:n.jsx(Me,{checked:o[p][m],onCheckedChange:()=>l(p,m),children:f.label})},f.id))}):n.jsx(ir,{value:i[p],onValueChange:f=>u(p,f),children:d.items.map(f=>n.jsx("div",{children:n.jsx(wn,{value:f.id,children:f.label})},f.id))})}),n.jsx(pe,{})]},d.label))})]})})}function ms({id:t,category:e,downloads:r,languages:o,moreInfoUrl:a,handleMoreInfoLinkClick:i,supportUrl:w,handleSupportLinkClick:l}){const u=new h.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((p,f)=>p+f,0)),d=()=>{window.scrollTo(0,document.body.scrollHeight)};return n.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[n.jsx("div",{className:"tw-flex",children:n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsxs("div",{className:"tw-flex tw-gap-1",children:[n.jsx(S.User,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:u})]}),n.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[n.jsx("div",{className:"tw-flex tw-gap-2",children:o.slice(0,3).map(p=>n.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:p.toUpperCase()},p))}),o.length>3&&n.jsxs("button",{type:"button",onClick:()=>d(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",o.length-3," more languages"]})]}),(a||w)&&n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[a&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(E,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",n.jsx(S.Link,{className:"tw-h-4 tw-w-4"})]})}),w&&n.jsx("div",{className:"tw-flex tw-gap-1",children:n.jsxs(E,{onClick:()=>l(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",n.jsx(S.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function hs({id:t,versionHistory:e}){const[r,o]=s.useState(!1),a=new Date;function i(l){const u=new Date(l),d=new Date(a.getTime()-u.getTime()),p=d.getUTCFullYear()-1970,f=d.getUTCMonth(),m=d.getUTCDate()-1;let g="";return p>0?g=`${p.toString()} year${p===1?"":"s"} ago`:f>0?g=`${f.toString()} month${f===1?"":"s"} ago`:m===0?g="today":g=`${m.toString()} day${m===1?"":"s"} ago`,g}const w=Object.entries(e).sort((l,u)=>u[0].localeCompare(l[0]));return n.jsxs("div",{className:"pr-twp",id:t,children:[n.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),n.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?w:w.slice(0,5)).map(l=>n.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[n.jsx("div",{className:"tw-text-foreground",children:n.jsx("li",{className:"tw-prose tw-text-xs",children:n.jsx("span",{children:l[1].description})})}),n.jsxs("div",{className:"tw-justify-end tw-text-right",children:[n.jsxs("div",{children:["Version ",l[0]]}),n.jsx("div",{children:i(l[1].date)})]})]},l[0]))}),w.length>5&&n.jsx("button",{type:"button",onClick:()=>o(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"})]})}function fs({id:t,publisherDisplayName:e,fileSize:r,locales:o,versionHistory:a,currentVersion:i}){const w=s.useMemo(()=>h.formatBytes(r),[r]),u=(d=>{const p=new Intl.DisplayNames(h.getCurrentLocale(),{type:"language"});return d.map(f=>p.of(f))})(o);return n.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(a).length>0&&n.jsx(hs,{versionHistory:a}),n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[n.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),n.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Publisher"}),n.jsx("span",{className:"tw-font-semibold",children:e}),n.jsx("span",{children:"Size"}),n.jsx("span",{className:"tw-font-semibold",children:w})]}),n.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:n.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[n.jsx("span",{children:"Version"}),n.jsx("span",{className:"tw-font-semibold",children:i}),n.jsx("span",{children:"Languages"}),n.jsx("span",{className:"tw-font-semibold",children:u.join(", ")})]})})]})]})]})})}const xr=Rt.cva(c("pr-twp","tw-inline-flex tw-items-center tw-rounded-md tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2"),{variants:{variant:{default:"tw-border-transparent tw-bg-primary tw-text-primary-foreground tw-shadow hover:tw-bg-primary/80",secondary:"tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",destructive:"tw-border-transparent tw-bg-destructive tw-text-destructive-foreground tw-shadow hover:tw-bg-destructive/80",outline:"tw-text-foreground",muted:"tw-border-transparent tw-bg-muted tw-text-muted-foreground tw-shadow hover:tw-bg-muted/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0"}},defaultVariants:{variant:"default"}});function ve({className:t,variant:e,...r}){return n.jsx("div",{className:c("pr-twp",xr({variant:e}),t),...r})}function vr({entries:t,selected:e,onChange:r,placeholder:o,hasToggleAllFeature:a=!1,selectAllText:i="Select All",clearAllText:w="Clear All",commandEmptyMessage:l="No entries found",customSelectedText:u,isOpen:d=void 0,onOpenChange:p=void 0,isDisabled:f=!1,sortSelected:m=!1,icon:g=void 0,className:b=void 0,variant:y="ghost",id:N}){const[I,v]=s.useState(!1),_=s.useCallback(C=>{var M;const z=(M=t.find(Y=>Y.label===C))==null?void 0:M.value;z&&r(e.includes(z)?e.filter(Y=>Y!==z):[...e,z])},[t,e,r]),B=()=>u||o,L=s.useMemo(()=>{if(!m)return t;const C=t.filter(M=>M.starred).sort((M,Y)=>M.label.localeCompare(Y.label)),z=t.filter(M=>!M.starred).sort((M,Y)=>{const R=e.includes(M.value),K=e.includes(Y.value);return R&&!K?-1:!R&&K?1:M.label.localeCompare(Y.label)});return[...C,...z]},[t,e,m]),O=()=>{r(t.map(C=>C.value))},G=()=>{r([])},F=d??I,k=p??v;return n.jsx("div",{id:N,className:b,children:n.jsxs(Ft,{open:F,onOpenChange:k,children:[n.jsx($t,{asChild:!0,children:n.jsxs(E,{variant:y,role:"combobox","aria-expanded":F,className:"tw-group tw-w-full tw-justify-between",disabled:f,children:[n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[g&&n.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:n.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:g})}),n.jsx("div",{className:"tw-font-normal",children:B()})]}),n.jsx(S.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Mt,{align:"start",className:"tw-w-full tw-p-0",children:n.jsxs(Bt,{children:[n.jsx(Zt,{placeholder:`Search ${o.toLowerCase()}...`}),a&&n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:O,children:i}),n.jsx(E,{variant:"ghost",size:"sm",onClick:G,children:w})]}),n.jsxs(Gt,{children:[n.jsx(ce,{children:l}),n.jsx(Ct,{children:L.map(C=>n.jsxs(Tt,{value:C.label,onSelect:_,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx("div",{className:"w-4",children:n.jsx(S.Check,{className:c("tw-h-4 tw-w-4",e.includes(C.value)?"tw-opacity-100":"tw-opacity-0")})}),C.starred&&n.jsx(S.Star,{className:"tw-h-4 tw-w-4"}),n.jsx("div",{className:"tw-flex-grow",children:C.label}),C.secondaryLabel&&n.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:C.secondaryLabel})]},C.label))})]})]})})]})})}function gs({entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:u,className:d,badgesPlaceholder:p,id:f}){return n.jsxs("div",{id:f,className:"tw-flex tw-items-center tw-gap-2",children:[n.jsx(vr,{entries:t,selected:e,onChange:r,placeholder:o,commandEmptyMessage:a,customSelectedText:i,isDisabled:w,sortSelected:l,icon:u,className:d}),e.length>0?n.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(m=>{var g;return n.jsxs(ve,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[n.jsx(E,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>r(e.filter(b=>b!==m)),children:n.jsx(S.X,{className:"tw-h-3 tw-w-3"})}),(g=t.find(b=>b.value===m))==null?void 0:g.label]},m)})}):n.jsx(W,{children:p})]})}function yr(t,e){if(!e||e.length===0)return t??"empty";const r=e.find(a=>typeof a=="string");if(r)return`key-${t??"unknown"}-${r.slice(0,10)}`;const o=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${o}`}function bs(t,e,r=!0,o=void 0){if(!e||e.length===0)return;const a=[],i=[];let w=[];return e.forEach(l=>{typeof l!="string"&&l.marker==="fp"?(w.length>0&&i.push(w),w=[l]):w.push(l)}),w.length>0&&i.push(w),i.map((l,u)=>{const d=u===i.length-1;return n.jsxs("p",{className:"tw-mb-2",children:[dn(t,l,r,!0,a),d&&o]},yr(t,l))})}function dn(t,e,r=!0,o=!0,a=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const w=`${t}-text-${i.slice(0,10)}`;if(o){const l=c(`usfm_${t}`);return n.jsx("span",{className:l,children:i},w)}return n.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[n.jsx(S.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),n.jsx("span",{children:i}),n.jsx(S.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},w)}return xs(i,yr(`${t}\\${i.marker}`,[i]),r,[...a,t??"unknown"])})}function xs(t,e,r,o=[]){const{marker:a}=t;return n.jsxs("span",{children:[a?r&&n.jsx("span",{className:"marker",children:`\\${a} `}):n.jsx(S.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),dn(a,t.content,r,!0,[...o,a??"unknown"])]},e)}function Nr({footnote:t,layout:e="horizontal",formatCaller:r,showMarkers:o=!0}){const a=r?r(t.caller):t.caller,i=a!==t.caller;let w,l=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([w,...l]=t.content);const u=o?n.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,d=o?n.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,p=n.jsxs(n.Fragment,{children:[a&&n.jsxs("span",{className:c("note-caller",{formatted:i}),children:[a," "]}),w&&n.jsxs(n.Fragment,{children:[dn(t.marker,[w],o,!1)," "]})]}),g=c(e==="horizontal"?"horizontal tw-table-cell":"vertical",o?"marker-visible":"");return n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:c("textual-note-header tw-text-nowrap tw-pr-2",g),children:[u,p]}),n.jsx("div",{className:c("textual-note-body",g),children:l&&l.length>0&&n.jsx(n.Fragment,{children:bs(t.marker,l,o,d)})})]})}const pn=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-rounded-xl tw-border tw-bg-card tw-text-card-foreground tw-shadow",t),...e}));pn.displayName="Card";const jr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));jr.displayName="CardHeader";const kr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));kr.displayName="CardTitle";const Cr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-text-sm tw-text-muted-foreground",t),...e}));Cr.displayName="CardDescription";const Sr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-p-6 tw-pt-0",t),...e}));Sr.displayName="CardContent";const _r=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("pr-twp","tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));_r.displayName="CardFooter";const vs=(t,e)=>t[e]??e;function ys({className:t,footnotes:e,layout:r="horizontal",listId:o,selectedFootnote:a,showMarkers:i=!0,suppressFormatting:w=!1,formatCaller:l,onFootnoteSelected:u,localizedStrings:d}){const p=d?vs(d,"%webView_footnoteList_header%"):"Footnotes",f=l??h.getFormatCallerFunction(e,void 0),m=(v,_)=>{u==null||u(v,_,o)},g=a?e.findIndex(v=>v===a):0,[b,y]=s.useState(g),N=v=>{if(e.length)switch(v.key){case"ArrowDown":v.preventDefault(),y(_=>Math.min(_+1,e.length-1));break;case"ArrowUp":v.preventDefault(),y(_=>Math.max(_-1,0));break;case"Enter":case" ":v.preventDefault(),u==null||u(e[b],b,o);break}},I=s.useRef([]);return s.useEffect(()=>{var v;b>=0&&b<I.current.length&&((v=I.current[b])==null||v.focus())},[b]),n.jsxs(n.Fragment,{children:[r==="vertical"&&n.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:p}),n.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:c("tw-h-full tw-overflow-y-auto",t),onKeyDown:N,children:n.jsx("div",{className:c("tw-p-0.5",r==="horizontal"?"tw-table":"tw-flex tw-flex-col tw-gap-1",!w&&"formatted-font"),children:e.map((v,_)=>{const B=v===a,L=`${o}-${_}`;return n.jsx(pn,{ref:O=>{I.current[_]=O},role:"option","aria-selected":B,"data-marker":v.marker,"data-state":B?"selected":void 0,tabIndex:-1,className:c("data-[state=selected]:tw-bg-muted",u&&"tw-cursor-pointer hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-py-0 tw-shadow-none",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm"),onClick:()=>m(v,_),children:n.jsx(Nr,{footnote:v,layout:r,formatCaller:()=>f(v.caller,_),showMarkers:i})},L)})})})]})}function Ns({occurrenceData:t,setScriptureReference:e,localizedStrings:r}){const o=r["%webView_inventory_occurrences_table_header_reference%"],a=r["%webView_inventory_occurrences_table_header_occurrence%"],i=s.useMemo(()=>{const w=[];return t.forEach(l=>{w.some(u=>h.deepEqual(u,l))||w.push(l)}),w},[t]);return n.jsxs(ue,{stickyHeader:!0,children:[n.jsx(me,{stickyHeader:!0,children:n.jsxs(ht,{children:[n.jsx(Yt,{children:o}),n.jsx(Yt,{children:a})]})}),n.jsx(he,{children:i.length>0&&i.map(w=>n.jsxs(ht,{onClick:()=>{e(w.reference)},children:[n.jsx(kt,{children:`${A.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}`}),n.jsx(kt,{children:w.text})]},`${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`))})]})}const Ie=s.forwardRef(({className:t,...e},r)=>n.jsx(He.Root,{ref:r,className:c("pr-twp","tw-peer tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-shadow focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:n.jsx(He.Indicator,{className:c("tw-flex tw-items-center tw-justify-center tw-text-current"),children:n.jsx(le,{className:"tw-h-4 tw-w-4"})})}));Ie.displayName=He.Root.displayName;const te=s.forwardRef(({className:t,type:e,...r},o)=>n.jsx("input",{type:e,className:c("tw-flex tw-h-9 tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-1 tw-text-base tw-shadow-sm tw-transition-colors file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:o,...r}));te.displayName="Input";const Rr=Rt.cva(c("pr-twp","tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0"),{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent tw-shadow-sm hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-9 tw-px-2 tw-min-w-9",sm:"tw-h-8 tw-px-1.5 tw-min-w-8",lg:"tw-h-10 tw-px-2.5 tw-min-w-10"}},defaultVariants:{variant:"default",size:"default"}}),js=s.forwardRef(({className:t,variant:e,size:r,...o},a)=>n.jsx(Gn.Root,{ref:a,className:c(Rr({variant:e,size:r,className:t})),...o}));js.displayName=Gn.Root.displayName;const Tr=s.createContext({size:"default",variant:"default"}),un=s.forwardRef(({className:t,variant:e,size:r,children:o,...a},i)=>{const w=tt();return n.jsx(Se.Root,{ref:i,className:c("pr-twp","tw-flex tw-items-center tw-justify-center tw-gap-1",t),...a,dir:w,children:n.jsx(Tr.Provider,{value:{variant:e,size:r},children:o})})});un.displayName=Se.Root.displayName;const ae=s.forwardRef(({className:t,children:e,variant:r,size:o,...a},i)=>{const w=s.useContext(Tr);return n.jsx(Se.Item,{ref:i,className:c(Rr({variant:w.variant||r,size:w.size||o}),t),...a,children:e})});ae.displayName=Se.Item.displayName;const De=t=>t==="asc"?n.jsx(S.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?n.jsx(S.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):n.jsx(S.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),ks=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>n.jsxs(E,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,De(e.getIsSorted())]})}),Cs=(t,e)=>({accessorKey:`item${e}`,accessorFn:r=>r.items[e],header:({column:r})=>n.jsxs(E,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[t,De(r.getIsSorted())]})}),Ss=t=>({accessorKey:"count",header:({column:e})=>n.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:n.jsxs(E,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,De(e.getIsSorted())]})}),cell:({row:e})=>n.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),Ge=(t,e,r,o,a,i)=>{let w=[...r];t.forEach(u=>{e==="approved"?w.includes(u)||w.push(u):w=w.filter(d=>d!==u)}),o(w);let l=[...a];t.forEach(u=>{e==="unapproved"?l.includes(u)||l.push(u):l=l.filter(d=>d!==u)}),i(l)},_s=(t,e,r,o,a)=>({accessorKey:"status",header:({column:i})=>n.jsx("div",{className:"tw-flex tw-justify-center",children:n.jsxs(E,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,De(i.getIsSorted())]})}),cell:({row:i})=>{const w=i.getValue("status"),l=i.getValue("item");return n.jsxs(un,{value:w,variant:"outline",type:"single",children:[n.jsx(ae,{onClick:u=>{u.stopPropagation(),Ge([l],"approved",e,r,o,a)},value:"approved",children:n.jsx(S.CircleCheckIcon,{})}),n.jsx(ae,{onClick:u=>{u.stopPropagation(),Ge([l],"unapproved",e,r,o,a)},value:"unapproved",children:n.jsx(S.CircleXIcon,{})}),n.jsx(ae,{onClick:u=>{u.stopPropagation(),Ge([l],"unknown",e,r,o,a)},value:"unknown",children:n.jsx(S.CircleHelpIcon,{})})]})}}),Rs=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),Ts=t=>{const e=/^\\[vc]\s+(\d+)/,r=t.match(e);if(r)return+r[1]},Ms=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},Mr=(t,e,r)=>r.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",Es=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),Is=(t,e,r)=>{let o=t;return e!=="all"&&(o=o.filter(a=>e==="approved"&&a.status==="approved"||e==="unapproved"&&a.status==="unapproved"||e==="unknown"&&a.status==="unknown")),r!==""&&(o=o.filter(a=>a.items[0].includes(r))),o},Ds=(t,e,r)=>{const o=[];return t.forEach(a=>{const i=o.find(w=>h.deepEqual(w.items,h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:a.verseRef,text:a.verse});else{const w={items:h.isString(a.inventoryText)?[a.inventoryText]:a.inventoryText,count:1,status:Mr(h.isString(a.inventoryText)?a.inventoryText:a.inventoryText[0],e,r),occurrences:[{reference:a.verseRef,text:a.verse}]};o.push(w)}}),o},pt=(t,e)=>t[e]??e;function Vs({inventoryItems:t,setVerseRef:e,localizedStrings:r,additionalItemsLabels:o,approvedItems:a,unapprovedItems:i,scope:w,onScopeChange:l,columns:u,id:d,areInventoryItemsLoading:p=!1}){const f=pt(r,"%webView_inventory_all%"),m=pt(r,"%webView_inventory_approved%"),g=pt(r,"%webView_inventory_unapproved%"),b=pt(r,"%webView_inventory_unknown%"),y=pt(r,"%webView_inventory_scope_currentBook%"),N=pt(r,"%webView_inventory_scope_chapter%"),I=pt(r,"%webView_inventory_scope_verse%"),v=pt(r,"%webView_inventory_filter_text%"),_=pt(r,"%webView_inventory_show_additional_items%"),B=pt(r,"%webView_inventory_no_results%"),[L,O]=s.useState(!1),[G,F]=s.useState("all"),[k,C]=s.useState(""),[z,M]=s.useState([]),Y=s.useMemo(()=>{const T=t??[];return T.length===0?[]:Ds(T,a,i)},[t,a,i]),R=s.useMemo(()=>{if(L)return Y;const T=[];return Y.forEach(J=>{const ct=J.items[0],dt=T.find(xt=>xt.items[0]===ct);dt?(dt.count+=J.count,dt.occurrences=dt.occurrences.concat(J.occurrences)):T.push({items:[ct],count:J.count,occurrences:J.occurrences,status:J.status})}),T},[L,Y]),K=s.useMemo(()=>R.length===0?[]:Is(R,G,k),[R,G,k]),j=s.useMemo(()=>{var ct,dt;if(!L)return u;const T=(ct=o==null?void 0:o.tableHeaders)==null?void 0:ct.length;if(!T)return u;const J=[];for(let xt=0;xt<T;xt++)J.push(Cs(((dt=o==null?void 0:o.tableHeaders)==null?void 0:dt[xt])||"Additional Item",xt+1));return[...J,...u]},[o==null?void 0:o.tableHeaders,u,L]);s.useEffect(()=>{K.length===0?M([]):K.length===1&&M(K[0].items)},[K]);const U=(T,J)=>{J.setRowSelection(()=>{const ct={};return ct[T.index]=!0,ct}),M(T.original.items)},bt=T=>{if(T==="book"||T==="chapter"||T==="verse")l(T);else throw new Error(`Invalid scope value: ${T}`)},Xt=T=>{if(T==="all"||T==="approved"||T==="unapproved"||T==="unknown")F(T);else throw new Error(`Invalid status filter value: ${T}`)},Et=s.useMemo(()=>{if(R.length===0||z.length===0)return[];const T=R.filter(J=>h.deepEqual(L?J.items:[J.items[0]],z));if(T.length>1)throw new Error("Selected item is not unique");return T.length===0?[]:T[0].occurrences},[z,L,R]);return n.jsxs("div",{id:d,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[n.jsxs("div",{className:"tw-flex tw-items-stretch",children:[n.jsxs(At,{onValueChange:T=>Xt(T),defaultValue:G,children:[n.jsx(St,{className:"tw-m-1",children:n.jsx(zt,{placeholder:"Select filter"})}),n.jsxs(_t,{children:[n.jsx(wt,{value:"all",children:f}),n.jsx(wt,{value:"approved",children:m}),n.jsx(wt,{value:"unapproved",children:g}),n.jsx(wt,{value:"unknown",children:b})]})]}),n.jsxs(At,{onValueChange:T=>bt(T),defaultValue:w,children:[n.jsx(St,{className:"tw-m-1",children:n.jsx(zt,{placeholder:"Select scope"})}),n.jsxs(_t,{children:[n.jsx(wt,{value:"book",children:y}),n.jsx(wt,{value:"chapter",children:N}),n.jsx(wt,{value:"verse",children:I})]})]}),n.jsx(te,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:v,value:k,onChange:T=>{C(T.target.value)}}),o&&n.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[n.jsx(Ie,{className:"tw-m-1",checked:L,onCheckedChange:T=>{O(T)}}),n.jsx(W,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(o==null?void 0:o.checkboxText)??_})]})]}),n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(hr,{columns:j,data:K,onRowClickHandler:U,stickyHeader:!0,isLoading:p,noResultsMessage:B})}),Et.length>0&&n.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:n.jsx(Ns,{occurrenceData:Et,setScriptureReference:e,localizedStrings:r})})]})}const Ve=s.forwardRef(({className:t,orientation:e="horizontal",decorative:r=!0,...o},a)=>n.jsx(Fn.Root,{ref:a,decorative:r,orientation:e,className:c("pr-twp","tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...o}));Ve.displayName=Fn.Root.displayName;const Oe=qt.Provider,Le=qt.Root,Pe=qt.Trigger,fe=s.forwardRef(({className:t,sideOffset:e=4,...r},o)=>n.jsx(qt.Portal,{children:n.jsx(qt.Content,{ref:o,sideOffset:e,className:c("pr-twp","tw-z-50 tw-origin-[--radix-tooltip-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-bg-primary tw-px-3 tw-py-1.5 tw-text-xs tw-text-primary-foreground tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r})}));fe.displayName=qt.Content.displayName;const Os="sidebar_state",Ls=60*60*24*7,Ps="16rem",As="3rem",Er=s.createContext(void 0);function ge(){const t=s.useContext(Er);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const mn=s.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:r,className:o,style:a,children:i,side:w="primary",...l},u)=>{const[d,p]=s.useState(t),f=e??d,m=s.useCallback(_=>{const B=typeof _=="function"?_(f):_;r?r(B):p(B),document.cookie=`${Os}=${B}; path=/; max-age=${Ls}`},[r,f]),g=s.useCallback(()=>m(_=>!_),[m]),b=f?"expanded":"collapsed",I=tt()==="ltr"?w:w==="primary"?"secondary":"primary",v=s.useMemo(()=>({state:b,open:f,setOpen:m,toggleSidebar:g,side:I}),[b,f,m,g,I]);return n.jsx(Er.Provider,{value:v,children:n.jsx(Oe,{delayDuration:0,children:n.jsx("div",{style:{"--sidebar-width":Ps,"--sidebar-width-icon":As,...a},className:c("pr-twp","tw-group/sidebar-wrapper tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",o),ref:u,...l,children:i})})})});mn.displayName="SidebarProvider";const hn=s.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:r,children:o,...a},i)=>{const w=ge();return e==="none"?n.jsx("div",{className:c("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:i,...a,children:o}):n.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":w.state,"data-collapsible":w.state==="collapsed"?e:"","data-variant":t,"data-side":w.side,children:[n.jsx("div",{className:c("tw-relative tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=right]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),n.jsx("div",{className:c("tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex","tw-absolute",w.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...a,children:n.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:o})})]})});hn.displayName="Sidebar";const Ir=s.forwardRef(({className:t,onClick:e,...r},o)=>{const{toggleSidebar:a}=ge();return n.jsxs(E,{ref:o,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:c("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),a()},...r,children:[n.jsx(Ra,{}),n.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});Ir.displayName="SidebarTrigger";const Dr=s.forwardRef(({className:t,...e},r)=>{const{toggleSidebar:o}=ge();return n.jsx("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:o,title:"Toggle Sidebar",className:c("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border sm:tw-flex","group-data-[side=primary]:tw--end-4 group-data-[side=secondary]:tw-left-0","[[data-side=primary]_&]:tw-cursor-w-resize [[data-side=secondary]_&]:tw-cursor-e-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-start-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});Dr.displayName="SidebarRail";const fn=s.forwardRef(({className:t,...e},r)=>n.jsx("main",{ref:r,className:c("tw-relative tw-flex tw-w-full tw-flex-1 tw-flex-col tw-bg-background","md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));fn.displayName="SidebarInset";const Vr=s.forwardRef(({className:t,...e},r)=>n.jsx(te,{ref:r,"data-sidebar":"input",className:c("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));Vr.displayName="SidebarInput";const Or=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"header",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Or.displayName="SidebarHeader";const Lr=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"footer",className:c("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));Lr.displayName="SidebarFooter";const Pr=s.forwardRef(({className:t,...e},r)=>n.jsx(Ve,{ref:r,"data-sidebar":"separator",className:c("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));Pr.displayName="SidebarSeparator";const gn=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"content",className:c("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));gn.displayName="SidebarContent";const ye=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group",className:c("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));ye.displayName="SidebarGroup";const Ne=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Ut.Slot:"div";return n.jsx(a,{ref:o,"data-sidebar":"group-label",className:c("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opacity] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...r})});Ne.displayName="SidebarGroupLabel";const Ar=s.forwardRef(({className:t,asChild:e=!1,...r},o)=>{const a=e?Ut.Slot:"button";return n.jsx(a,{ref:o,"data-sidebar":"group-action",className:c("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...r})});Ar.displayName="SidebarGroupAction";const je=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"group-content",className:c("tw-w-full tw-text-sm",t),...e}));je.displayName="SidebarGroupContent";const bn=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu",className:c("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));bn.displayName="SidebarMenu";const xn=s.forwardRef(({className:t,...e},r)=>n.jsx("li",{ref:r,"data-sidebar":"menu-item",className:c("tw-group/menu-item tw-relative",t),...e}));xn.displayName="SidebarMenuItem";const zs=Rt.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),vn=s.forwardRef(({asChild:t=!1,isActive:e=!1,variant:r="default",size:o="default",tooltip:a,className:i,...w},l)=>{const u=t?Ut.Slot:"button",{state:d}=ge(),p=n.jsx(u,{ref:l,"data-sidebar":"menu-button","data-size":o,"data-active":e,className:c(zs({variant:r,size:o}),i),...w});return a?(typeof a=="string"&&(a={children:a}),n.jsxs(Le,{children:[n.jsx(Pe,{asChild:!0,children:p}),n.jsx(fe,{side:"right",align:"center",hidden:d!=="collapsed",...a})]})):p});vn.displayName="SidebarMenuButton";const zr=s.forwardRef(({className:t,asChild:e=!1,showOnHover:r=!1,...o},a)=>{const i=e?Ut.Slot:"button";return n.jsx(i,{ref:a,"data-sidebar":"menu-action",className:c("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...o})});zr.displayName="SidebarMenuAction";const Br=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,"data-sidebar":"menu-badge",className:c("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Br.displayName="SidebarMenuBadge";const Gr=s.forwardRef(({className:t,showIcon:e=!1,...r},o)=>{const a=s.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return n.jsxs("div",{ref:o,"data-sidebar":"menu-skeleton",className:c("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...r,children:[e&&n.jsx(xe,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),n.jsx(xe,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":a}})]})});Gr.displayName="SidebarMenuSkeleton";const Fr=s.forwardRef(({className:t,...e},r)=>n.jsx("ul",{ref:r,"data-sidebar":"menu-sub",className:c("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));Fr.displayName="SidebarMenuSub";const $r=s.forwardRef(({...t},e)=>n.jsx("li",{ref:e,...t}));$r.displayName="SidebarMenuSubItem";const Xr=s.forwardRef(({asChild:t=!1,size:e="md",isActive:r,className:o,...a},i)=>{const w=t?Ut.Slot:"a";return n.jsx(w,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":r,className:c("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",o),...a})});Xr.displayName="SidebarMenuSubButton";function Hr({id:t,extensionLabels:e,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:a,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:w,buttonPlaceholderText:l,className:u}){const d=s.useCallback((m,g)=>{o(m,g)},[o]),p=s.useCallback(m=>{const g=r.find(b=>b.projectId===m);return g?g.projectName:m},[r]),f=s.useCallback(m=>!a.projectId&&m===a.label,[a]);return n.jsx(hn,{id:t,collapsible:"none",variant:"inset",className:c("tw-w-96 tw-gap-2 tw-overflow-y-auto",u),children:n.jsxs(gn,{children:[n.jsxs(ye,{children:[n.jsx(Ne,{className:"tw-text-sm",children:i}),n.jsx(je,{children:n.jsx(bn,{children:Object.entries(e).map(([m,g])=>n.jsx(xn,{children:n.jsx(vn,{onClick:()=>d(m),isActive:f(m),children:n.jsx("span",{className:"tw-pl-3",children:g})})},m))})})]}),n.jsxs(ye,{children:[n.jsx(Ne,{className:"tw-text-sm",children:w}),n.jsx(je,{className:"tw-pl-3",children:n.jsx(be,{buttonVariant:"ghost",buttonClassName:c("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":a==null?void 0:a.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(m=>m.projectId),getOptionLabel:p,buttonPlaceholder:l,onChange:m=>{const g=p(m);d(g,m)},value:(a==null?void 0:a.projectId)??void 0,icon:n.jsx(S.ScrollText,{})})})]})]})})}const Ae=s.forwardRef(({value:t,onSearch:e,placeholder:r,isFullWidth:o,className:a,isDisabled:i=!1,id:w},l)=>{const u=tt();return n.jsxs("div",{id:w,className:c("tw-relative",{"tw-w-full":o},a),children:[n.jsx(S.Search,{className:c("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":u==="rtl"},{"tw-left-3":u==="ltr"})}),n.jsx(te,{ref:l,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:t,onChange:d=>e(d.target.value),disabled:i}),t&&n.jsxs(E,{variant:"ghost",size:"icon",className:c("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":u==="rtl"},{"tw-right-0":u==="ltr"}),onClick:()=>{e("")},children:[n.jsx(S.X,{className:"tw-h-4 tw-w-4"}),n.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});Ae.displayName="SearchBar";function Bs({id:t,extensionLabels:e,projectInfo:r,children:o,handleSelectSidebarItem:a,selectedSidebarItem:i,searchValue:w,onSearch:l,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}){return n.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[n.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:n.jsx(Ae,{className:"tw-w-9/12",value:w,onSearch:l,placeholder:"Search app settings, extension settings, and project settings"})}),n.jsxs(mn,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[n.jsx(Hr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:i,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:d,buttonPlaceholderText:p}),n.jsx(fn,{className:"tw-min-w-[215px]",children:o})]})]})}const jt="scrBook",Gs="scrRef",Ot="source",Fs="details",$s="Scripture Reference",Xs="Scripture Book",Kr="Type",Hs="Details";function Ks(t,e){const r=e??!1;return[{accessorFn:o=>`${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,id:jt,header:(t==null?void 0:t.scriptureReferenceColumnName)??$s,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?A.bookIdToEnglishName(a.start.book):o.row.groupingColumnId===jt?h.formatScrRef(a.start):void 0},getGroupingValue:o=>A.bookIdToNumber(o.start.book),sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!0},{accessorFn:o=>h.formatScrRef(o.start),id:Gs,header:void 0,cell:o=>{const a=o.row.original;return o.row.getIsGrouped()?void 0:h.formatScrRef(a.start)},sortingFn:(o,a)=>h.compareScrRefs(o.original.start,a.original.start),enableGrouping:!1},{accessorFn:o=>o.source.displayName,id:Ot,header:r?(t==null?void 0:t.typeColumnName)??Kr:void 0,cell:o=>r||o.row.getIsGrouped()?o.getValue():void 0,getGroupingValue:o=>o.source.id,sortingFn:(o,a)=>o.original.source.displayName.localeCompare(a.original.source.displayName),enableGrouping:!0},{accessorFn:o=>o.detail,id:Fs,header:(t==null?void 0:t.detailsColumnName)??Hs,cell:o=>o.getValue(),enableGrouping:!1}]}const qs=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let r=0;return t.end&&({offset:r}=t.end),!t.end||h.compareScrRefs(t.start,t.end)===0?`${h.scrRefToBBBCCCVVV(t.start)}+${e}`:`${h.scrRefToBBBCCCVVV(t.start)}+${e}-${h.scrRefToBBBCCCVVV(t.end)}+${r}`},Ln=t=>`${qs({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function Ys({sources:t,showColumnHeaders:e=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:o,scriptureBookGroupName:a,typeColumnName:i,detailsColumnName:w,onRowSelected:l,id:u}){const[d,p]=s.useState([]),[f,m]=s.useState([{id:jt,desc:!1}]),[g,b]=s.useState({}),y=s.useMemo(()=>t.flatMap(k=>k.data.map(C=>({...C,source:k.source}))),[t]),N=s.useMemo(()=>Ks({scriptureReferenceColumnName:o,typeColumnName:i,detailsColumnName:w},r),[o,i,w,r]);s.useEffect(()=>{d.includes(Ot)?m([{id:Ot,desc:!1},{id:jt,desc:!1}]):m([{id:jt,desc:!1}])},[d]);const I=nt.useReactTable({data:y,columns:N,state:{grouping:d,sorting:f,rowSelection:g},onGroupingChange:p,onSortingChange:m,onRowSelectionChange:b,getExpandedRowModel:nt.getExpandedRowModel(),getGroupedRowModel:nt.getGroupedRowModel(),getCoreRowModel:nt.getCoreRowModel(),getSortedRowModel:nt.getSortedRowModel(),getRowId:Ln,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});s.useEffect(()=>{if(l){const k=I.getSelectedRowModel().rowsById,C=Object.keys(k);if(C.length===1){const z=y.find(M=>Ln(M)===C[0])||void 0;z&&l(z)}}},[g,y,l,I]);const v=a??Xs,_=i??Kr,B=[{label:"No Grouping",value:[]},{label:`Group by ${v}`,value:[jt]},{label:`Group by ${_}`,value:[Ot]},{label:`Group by ${v} and ${_}`,value:[jt,Ot]},{label:`Group by ${_} and ${v}`,value:[Ot,jt]}],L=k=>{p(JSON.parse(k))},O=(k,C)=>{!k.getIsGrouped()&&!k.getIsSelected()&&k.getToggleSelectedHandler()(C)},G=(k,C)=>k.getIsGrouped()?"":c("banded-row",C%2===0?"even":"odd"),F=(k,C,z)=>{if(!((k==null?void 0:k.length)===0||C.depth<z.column.getGroupedIndex())){if(C.getIsGrouped())switch(C.depth){case 1:return"tw-ps-4";default:return}switch(C.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return n.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&n.jsxs(At,{value:JSON.stringify(d),onValueChange:k=>{L(k)},children:[n.jsx(St,{className:"tw-mb-1 tw-mt-2",children:n.jsx(zt,{})}),n.jsx(_t,{position:"item-aligned",children:n.jsx(lr,{children:B.map(k=>n.jsx(wt,{value:JSON.stringify(k.value),children:k.label},k.label))})})]}),n.jsxs(ue,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&n.jsx(me,{children:I.getHeaderGroups().map(k=>n.jsx(ht,{children:k.headers.filter(C=>C.column.columnDef.header).map(C=>n.jsx(Yt,{colSpan:C.colSpan,className:"top-0 tw-sticky",children:C.isPlaceholder?void 0:n.jsxs("div",{children:[C.column.getCanGroup()?n.jsx(E,{variant:"ghost",title:`Toggle grouping by ${C.column.columnDef.header}`,onClick:C.column.getToggleGroupingHandler(),type:"button",children:C.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",nt.flexRender(C.column.columnDef.header,C.getContext())]})},C.id))},k.id))}),n.jsx(he,{children:I.getRowModel().rows.map((k,C)=>{const z=tt();return n.jsx(ht,{"data-state":k.getIsSelected()?"selected":"",className:c(G(k,C)),onClick:M=>O(k,M),children:k.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==Ot||!r)))return n.jsx(kt,{className:c(M.column.columnDef.id,"tw-p-[1px]",F(d,k,M)),children:M.getIsGrouped()?n.jsxs(E,{variant:"link",onClick:k.getToggleExpandedHandler(),type:"button",children:[k.getIsExpanded()&&n.jsx(S.ChevronDown,{}),!k.getIsExpanded()&&(z==="ltr"?n.jsx(S.ChevronRight,{}):n.jsx(S.ChevronLeft,{}))," ",nt.flexRender(M.column.columnDef.cell,M.getContext())," (",k.subRows.length,")"]}):nt.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},k.id)})})]})]})}const yn=(t,e)=>t.filter(r=>{try{return h.getSectionForBook(r)===e}catch{return!1}}),qr=(t,e,r)=>yn(t,e).every(o=>r.includes(o));function Us({section:t,availableBookIds:e,selectedBookIds:r,onToggle:o,localizedStrings:a}){const i=yn(e,t).length===0,w=a["%scripture_section_ot_short%"],l=a["%scripture_section_nt_short%"],u=a["%scripture_section_dc_short%"],d=a["%scripture_section_extra_short%"];return n.jsx(E,{variant:"outline",size:"sm",onClick:()=>o(t),className:c(qr(e,t,r)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Ka(t,w,l,u,d)})}const Pn=5,Fe=6;function Js({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:r,localizedStrings:o,localizedBookNames:a}){const i=o["%webView_book_selector_books_selected%"],w=o["%webView_book_selector_select_books%"],l=o["%webView_book_selector_search_books%"],u=o["%webView_book_selector_select_all%"],d=o["%webView_book_selector_clear_all%"],p=o["%webView_book_selector_no_book_found%"],f=o["%webView_book_selector_more%"],{otLong:m,ntLong:g,dcLong:b,extraLong:y}={otLong:o==null?void 0:o["%scripture_section_ot_long%"],ntLong:o==null?void 0:o["%scripture_section_nt_long%"],dcLong:o==null?void 0:o["%scripture_section_dc_long%"],extraLong:o==null?void 0:o["%scripture_section_extra_long%"]},[N,I]=s.useState(!1),[v,_]=s.useState(""),B=s.useRef(void 0),L=s.useRef(!1);if(t.length!==A.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=s.useMemo(()=>A.allBookIds.filter((R,K)=>t[K]==="1"&&!A.isObsolete(A.bookIdToNumber(R))),[t]),G=s.useMemo(()=>{if(!v.trim()){const j={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return O.forEach(U=>{const bt=h.getSectionForBook(U);j[bt].push(U)}),j}const R=O.filter(j=>en(j,v,a)),K={[h.Section.OT]:[],[h.Section.NT]:[],[h.Section.DC]:[],[h.Section.Extra]:[]};return R.forEach(j=>{const U=h.getSectionForBook(j);K[U].push(j)}),K},[O,v,a]),F=s.useCallback((R,K=!1)=>{if(!K||!B.current){r(e.includes(R)?e.filter(T=>T!==R):[...e,R]),B.current=R;return}const j=O.findIndex(T=>T===B.current),U=O.findIndex(T=>T===R);if(j===-1||U===-1)return;const[bt,Xt]=[Math.min(j,U),Math.max(j,U)],Et=O.slice(bt,Xt+1).map(T=>T);r(e.includes(R)?e.filter(T=>!Et.includes(T)):[...new Set([...e,...Et])])},[e,r,O]),k=R=>{F(R,L.current),L.current=!1},C=(R,K)=>{R.preventDefault(),F(K,R.shiftKey)},z=s.useCallback(R=>{const K=yn(O,R).map(j=>j);r(qr(O,R,e)?e.filter(j=>!K.includes(j)):[...new Set([...e,...K])])},[e,r,O]),M=()=>{r(O.map(R=>R))},Y=()=>{r([])};return n.jsxs("div",{className:"tw-space-y-2",children:[n.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(h.Section).map(R=>n.jsx(Us,{section:R,availableBookIds:O,selectedBookIds:e,onToggle:z,localizedStrings:o},R))}),n.jsxs(Ft,{open:N,onOpenChange:R=>{I(R),R||_("")},children:[n.jsx($t,{asChild:!0,children:n.jsxs(E,{variant:"outline",role:"combobox","aria-expanded":N,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:w,n.jsx(S.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),n.jsx(Mt,{className:"tw-w-full tw-p-0",align:"start",children:n.jsxs(Bt,{shouldFilter:!1,onKeyDown:R=>{R.key==="Enter"&&(L.current=R.shiftKey)},children:[n.jsx(Zt,{placeholder:l,value:v,onValueChange:_}),n.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[n.jsx(E,{variant:"ghost",size:"sm",onClick:M,children:u}),n.jsx(E,{variant:"ghost",size:"sm",onClick:Y,children:d})]}),n.jsxs(Gt,{children:[n.jsx(ce,{children:p}),Object.values(h.Section).map((R,K)=>{const j=G[R];if(j.length!==0)return n.jsxs(s.Fragment,{children:[n.jsx(Ct,{heading:Wn(R,m,g,b,y),children:j.map(U=>n.jsx(tr,{bookId:U,isSelected:e.includes(U),onSelect:()=>k(U),onMouseDown:bt=>C(bt,U),section:h.getSectionForBook(U),showCheck:!0,localizedBookNames:a,commandValue:Ye(U,a),className:"tw-flex tw-items-center"},U))}),K<Object.values(h.Section).length-1&&n.jsx(Hn,{})]},R)})]})]})})]}),e.length>0&&n.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===Fe?Fe:Pn).map(R=>n.jsx(ve,{className:"hover:tw-bg-secondary",variant:"secondary",children:Ht(R,a)},R)),e.length>Fe&&n.jsx(ve,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-Pn} ${f}`})]})]})}const Zs=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Dt=(t,e)=>t[e]??e;function Ws({scope:t,availableScopes:e,onScopeChange:r,availableBookInfo:o,selectedBookIds:a,onSelectedBookIdsChange:i,localizedStrings:w,localizedBookNames:l,id:u}){const d=Dt(w,"%webView_scope_selector_selected_text%"),p=Dt(w,"%webView_scope_selector_current_verse%"),f=Dt(w,"%webView_scope_selector_current_chapter%"),m=Dt(w,"%webView_scope_selector_current_book%"),g=Dt(w,"%webView_scope_selector_choose_books%"),b=Dt(w,"%webView_scope_selector_scope%"),y=Dt(w,"%webView_scope_selector_select_books%"),N=[{value:"selectedText",label:d,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:f,id:"scope-chapter"},{value:"book",label:m,id:"scope-book"},{value:"selectedBooks",label:g,id:"scope-selected"}],I=e?N.filter(v=>e.includes(v.value)):N;return n.jsxs("div",{id:u,className:"tw-grid tw-gap-4",children:[n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(W,{children:b}),n.jsx(Re,{value:t,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:I.map(({value:v,label:_,id:B})=>n.jsxs("div",{className:"tw-flex tw-items-center",children:[n.jsx(ie,{className:"tw-me-2",value:v,id:B}),n.jsx(W,{htmlFor:B,children:_})]},B))})]}),t==="selectedBooks"&&n.jsxs("div",{className:"tw-grid tw-gap-2",children:[n.jsx(W,{children:y}),n.jsx(Js,{availableBookInfo:o,selectedBookIds:a,onChangeSelectedBookIds:i,localizedStrings:w,localizedBookNames:l})]})]})}const $e={[h.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[h.getLocalizeKeyForScrollGroupId(0)]:"A",[h.getLocalizeKeyForScrollGroupId(1)]:"B",[h.getLocalizeKeyForScrollGroupId(2)]:"C",[h.getLocalizeKeyForScrollGroupId(3)]:"D",[h.getLocalizeKeyForScrollGroupId(4)]:"E",[h.getLocalizeKeyForScrollGroupId(5)]:"F",[h.getLocalizeKeyForScrollGroupId(6)]:"G",[h.getLocalizeKeyForScrollGroupId(7)]:"H",[h.getLocalizeKeyForScrollGroupId(8)]:"I",[h.getLocalizeKeyForScrollGroupId(9)]:"J",[h.getLocalizeKeyForScrollGroupId(10)]:"K",[h.getLocalizeKeyForScrollGroupId(11)]:"L",[h.getLocalizeKeyForScrollGroupId(12)]:"M",[h.getLocalizeKeyForScrollGroupId(13)]:"N",[h.getLocalizeKeyForScrollGroupId(14)]:"O",[h.getLocalizeKeyForScrollGroupId(15)]:"P",[h.getLocalizeKeyForScrollGroupId(16)]:"Q",[h.getLocalizeKeyForScrollGroupId(17)]:"R",[h.getLocalizeKeyForScrollGroupId(18)]:"S",[h.getLocalizeKeyForScrollGroupId(19)]:"T",[h.getLocalizeKeyForScrollGroupId(20)]:"U",[h.getLocalizeKeyForScrollGroupId(21)]:"V",[h.getLocalizeKeyForScrollGroupId(22)]:"W",[h.getLocalizeKeyForScrollGroupId(23)]:"X",[h.getLocalizeKeyForScrollGroupId(24)]:"Y",[h.getLocalizeKeyForScrollGroupId(25)]:"Z"};function Qs({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:r,localizedStrings:o={},size:a="sm",className:i,id:w}){const l={...$e,...Object.fromEntries(Object.entries(o).map(([d,p])=>[d,d===p&&d in $e?$e[d]:p]))},u=tt();return n.jsxs(At,{value:`${e}`,onValueChange:d=>r(d==="undefined"?void 0:parseInt(d,10)),children:[n.jsx(St,{size:a,className:c("pr-twp tw-w-auto",i),children:n.jsx(zt,{placeholder:l[h.getLocalizeKeyForScrollGroupId(e)]??e})}),n.jsx(_t,{id:w,align:u==="rtl"?"end":"start",style:{zIndex:250},children:t.map(d=>n.jsx(wt,{value:`${d}`,children:l[h.getLocalizeKeyForScrollGroupId(d)]},`${d}`))})]})}function ti({children:t}){return n.jsx("div",{className:"pr-twp tw-grid",children:t})}function ei({primary:t,secondary:e,children:r,isLoading:o=!1,loadingMessage:a}){return n.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),n.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),o?n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:a}):n.jsx("div",{children:r})]})}function ni({primary:t,secondary:e,includeSeparator:r=!1}){return n.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[n.jsxs("div",{children:[n.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),n.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),r?n.jsx(Ve,{}):""]})}function Yr(t,e){var r;return(r=Object.entries(t).find(([,o])=>"menuItem"in o&&o.menuItem===e))==null?void 0:r[0]}function ke({icon:t,menuLabel:e,leading:r}){return t?n.jsx("img",{className:c("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:t,alt:`${r?"Leading":"Trailing"} icon for ${e}`}):void 0}const Ur=(t,e,r,o)=>r?Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order).flatMap(([i])=>e.filter(l=>l.group===i).sort((l,u)=>l.order-u.order).map(l=>n.jsxs(Le,{children:[n.jsx(Pe,{asChild:!0,children:"command"in l?n.jsxs(sn,{onClick:()=>{o(l)},children:[l.iconPathBefore&&n.jsx(ke,{icon:l.iconPathBefore,menuLabel:l.label,leading:!0}),l.label,l.iconPathAfter&&n.jsx(ke,{icon:l.iconPathAfter,menuLabel:l.label})]},`dropdown-menu-item-${l.label}-${l.command}`):n.jsxs(sr,{children:[n.jsx(on,{children:l.label}),n.jsx(ar,{children:n.jsx(an,{children:Ur(t,e,Yr(t,l.id),o)})})]},`dropdown-menu-sub-${l.label}-${l.id}`)}),l.tooltip&&n.jsx(fe,{children:l.tooltip})]},`tooltip-${l.label}-${"command"in l?l.command:l.id}`))):void 0;function Ce({onSelectMenuItem:t,menuData:e,tabLabel:r,icon:o,className:a,variant:i,buttonVariant:w="ghost",id:l}){return n.jsxs(de,{variant:i,children:[n.jsx(Te,{"aria-label":r,className:a,asChild:!0,id:l,children:n.jsx(E,{variant:w,size:"icon",className:"tw-h-8",children:o??n.jsx(S.MenuIcon,{})})}),n.jsx(Qt,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,u])=>typeof u=="object").sort(([,u],[,d])=>typeof u=="boolean"||typeof d=="boolean"?0:u.order-d.order).map(([u],d,p)=>n.jsxs(s.Fragment,{children:[n.jsx(rn,{children:n.jsx(Oe,{children:Ur(e.groups,e.items,u,t)})}),d<p.length-1&&n.jsx(pe,{})]},u))})]})}const Jr=s.forwardRef(({id:t,className:e,children:r},o)=>n.jsx("div",{ref:o,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-[3.2rem] tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:r}));function ri({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:r,tabViewMenuData:o,id:a,className:i,startAreaChildren:w,centerAreaChildren:l,endAreaChildren:u,menuButtonIcon:d}){return n.jsxs(Jr,{className:`tw-w-full tw-border ${i}`,id:a,children:[n.jsx("div",{className:"tw-h-full tw-p-[1px]",children:r&&n.jsx(Ce,{onSelectMenuItem:t,menuData:r,tabLabel:"Project",icon:d??n.jsx(S.Menu,{}),buttonVariant:"ghost"})}),w&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-p-[1px] tw-@container/tab-toolbar-start",children:w}),l&&n.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-p-[1px] tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:l}),n.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-p-[1px] tw-@container/tab-toolbar-end",children:[o&&n.jsx(Ce,{onSelectMenuItem:e,menuData:o,tabLabel:"View Info",icon:n.jsx(S.EllipsisVertical,{}),className:"tw-h-full"}),u]})]})}function oi({onSelectProjectMenuItem:t,projectMenuData:e,id:r,className:o,menuButtonIcon:a}){return n.jsx(Jr,{className:"tw-pointer-events-none",id:r,children:e&&n.jsx(Ce,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:a,className:`tw-pointer-events-auto tw-shadow-lg ${o}`,buttonVariant:"outline"})})}const Nn=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(st.Root,{orientation:"vertical",ref:r,className:c("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:o})});Nn.displayName=st.List.displayName;const jn=s.forwardRef(({className:t,...e},r)=>n.jsx(st.List,{ref:r,className:c("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));jn.displayName=st.List.displayName;const Zr=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,...e,className:c("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),kn=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:c("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));kn.displayName=st.Content.displayName;function ai({tabList:t,searchValue:e,onSearch:r,searchPlaceholder:o,headerTitle:a,searchClassName:i,id:w}){return n.jsxs("div",{id:w,className:"pr-twp",children:[n.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[a?n.jsx("h1",{children:a}):"",n.jsx(Ae,{className:i,value:e,onSearch:r,placeholder:o})]}),n.jsxs(Nn,{children:[n.jsx(jn,{children:t.map(l=>n.jsx(Zr,{value:l.value,children:l.value},l.key))}),t.map(l=>n.jsx(kn,{value:l.value,children:l.content},l.key))]})]})}function si({...t}){return n.jsx(X.Menu,{...t})}function ii({...t}){return n.jsx(X.Sub,{"data-slot":"menubar-sub",...t})}const Wr=s.forwardRef(({className:t,variant:e="default",...r},o)=>{const a=s.useMemo(()=>({variant:e}),[e]);return n.jsx(nn.Provider,{value:a,children:n.jsx(X.Root,{ref:o,className:c("tw-flex tw-h-9 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...r})})});Wr.displayName=X.Root.displayName;const Qr=s.forwardRef(({className:t,...e},r)=>{const o=gt();return n.jsx(X.Trigger,{ref:r,className:c("pr-twp","tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",Nt({variant:o.variant,className:t})),...e})});Qr.displayName=X.Trigger.displayName;const to=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>{const i=gt();return n.jsxs(X.SubTrigger,{ref:a,className:c("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",Nt({variant:i.variant,className:t}),t),...o,children:[r,n.jsx(Je,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});to.displayName=X.SubTrigger.displayName;const eo=s.forwardRef(({className:t,...e},r)=>n.jsx(X.SubContent,{ref:r,className:c("tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-menubar-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));eo.displayName=X.SubContent.displayName;const no=s.forwardRef(({className:t,align:e="start",alignOffset:r=-4,sideOffset:o=8,...a},i)=>{const w=gt();return n.jsx(X.Portal,{children:n.jsx(X.Content,{ref:i,align:e,alignOffset:r,sideOffset:o,className:c("pr-twp","tw-z-50 tw-min-w-[12rem] tw-origin-[--radix-menubar-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":w.variant==="muted"},t),...a})})});no.displayName=X.Content.displayName;const ro=s.forwardRef(({className:t,inset:e,...r},o)=>{const a=gt();return n.jsx(X.Item,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",Nt({variant:a.variant,className:t}),t),...r})});ro.displayName=X.Item.displayName;const wi=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>{const i=gt();return n.jsxs(X.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Nt({variant:i.variant,className:t}),t),checked:r,...o,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(le,{className:"tw-h-4 tw-w-4"})})}),e]})});wi.displayName=X.CheckboxItem.displayName;const li=s.forwardRef(({className:t,children:e,...r},o)=>{const a=gt();return n.jsxs(X.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Nt({variant:a.variant,className:t}),t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(X.ItemIndicator,{children:n.jsx(_e,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});li.displayName=X.RadioItem.displayName;const ci=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(X.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...r}));ci.displayName=X.Label.displayName;const oo=s.forwardRef(({className:t,...e},r)=>n.jsx(X.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));oo.displayName=X.Separator.displayName;const re=(t,e)=>{setTimeout(()=>{e.forEach(r=>{var o;(o=t.current)==null||o.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},ao=(t,e,r,o)=>{if(!r)return;const a=Object.entries(t).filter(([i,w])=>"column"in w&&w.column===r||i===r).sort(([,i],[,w])=>i.order-w.order);return a.flatMap(([i],w)=>{const l=e.filter(d=>d.group===i).sort((d,p)=>d.order-p.order).map(d=>n.jsxs(Le,{children:[n.jsx(Pe,{asChild:!0,children:"command"in d?n.jsxs(ro,{onClick:()=>{o(d)},children:[d.iconPathBefore&&n.jsx(ke,{icon:d.iconPathBefore,menuLabel:d.label,leading:!0}),d.label,d.iconPathAfter&&n.jsx(ke,{icon:d.iconPathAfter,menuLabel:d.label})]},`menubar-item-${d.label}-${d.command}`):n.jsxs(ii,{children:[n.jsx(to,{children:d.label}),n.jsx(eo,{children:ao(t,e,Yr(t,d.id),o)})]},`menubar-sub-${d.label}-${d.id}`)}),d.tooltip&&n.jsx(fe,{children:d.tooltip})]},`tooltip-${d.label}-${"command"in d?d.command:d.id}`)),u=[...l];return l.length>0&&w<a.length-1&&u.push(n.jsx(oo,{},`separator-${i}`)),u})};function di({menuData:t,onSelectMenuItem:e,onOpenChange:r,variant:o}){const a=s.useRef(void 0),i=s.useRef(void 0),w=s.useRef(void 0),l=s.useRef(void 0),u=s.useRef(void 0),d=p=>{switch(p){case"platform.app":return i;case"platform.window":return w;case"platform.layout":return l;case"platform.help":return u;default:return}};if(sa.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(p,f)=>{var b,y,N,I;p.preventDefault();const m={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},g={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(f.hotkey){case"alt":re(i,[m]);break;case"alt+p":(b=i.current)==null||b.focus(),re(i,[m,g]);break;case"alt+l":(y=w.current)==null||y.focus(),re(w,[m,g]);break;case"alt+n":(N=l.current)==null||N.focus(),re(l,[m,g]);break;case"alt+h":(I=u.current)==null||I.focus(),re(u,[m,g]);break}}),s.useEffect(()=>{if(!r||!a.current)return;const p=new MutationObserver(g=>{g.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const y=b.target.getAttribute("data-state");r(y==="open")}})});return a.current.querySelectorAll("[data-state]").forEach(g=>{p.observe(g,{attributes:!0})}),()=>p.disconnect()},[r]),!!t)return n.jsx(Wr,{ref:a,className:"pr-twp tw-border-0 tw-bg-transparent",variant:o,children:Object.entries(t.columns).filter(([,p])=>typeof p=="object").sort(([,p],[,f])=>typeof p=="boolean"||typeof f=="boolean"?0:p.order-f.order).map(([p,f])=>n.jsxs(si,{children:[n.jsx(Qr,{ref:d(p),children:typeof f=="object"&&"label"in f&&f.label}),n.jsx(no,{className:"tw-z-[250]",children:n.jsx(Oe,{children:ao(t.groups,t.items,p,e)})})]},p))})}function pi(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function ui({menuData:t,onOpenChange:e,onSelectMenuItem:r,className:o,id:a,children:i,appMenuAreaChildren:w,configAreaChildren:l,shouldUseAsAppDragArea:u,menubarVariant:d="default"}){const p=s.useRef(void 0);return n.jsx("div",{className:c("tw-border tw-px-4 tw-text-foreground",o),ref:p,style:{position:"relative"},id:a,children:n.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:u?{WebkitAppRegion:"drag"}:void 0,children:[n.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:n.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:[w,t&&n.jsx(di,{menuData:t,onOpenChange:e,onSelectMenuItem:r,variant:d})]})}),n.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:i}),n.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:n.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:l})})]})})}const mi=(t,e)=>t[e]??e;function hi({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:r=[],onLanguagesChange:o,onPrimaryLanguageChange:a,onFallbackLanguagesChange:i,localizedStrings:w,className:l,id:u}){const d=mi(w,"%settings_uiLanguageSelector_fallbackLanguages%"),[p,f]=s.useState(!1),m=b=>{a&&a(b),o&&o([b,...r.filter(y=>y!==b)]),i&&r.find(y=>y===b)&&i([...r.filter(y=>y!==b)]),f(!1)},g=(b,y)=>{var I,v,_,B,L,O;const N=y!==b?((v=(I=t[b])==null?void 0:I.uiNames)==null?void 0:v[y])??((B=(_=t[b])==null?void 0:_.uiNames)==null?void 0:B.en):void 0;return N?`${(L=t[b])==null?void 0:L.autonym} (${N})`:(O=t[b])==null?void 0:O.autonym};return n.jsxs("div",{id:u,className:c("pr-twp tw-max-w-sm",l),children:[n.jsxs(At,{name:"uiLanguage",value:e,onValueChange:m,open:p,onOpenChange:b=>f(b),children:[n.jsx(St,{children:n.jsx(zt,{})}),n.jsx(_t,{className:"tw-z-[250]",children:Object.keys(t).map(b=>n.jsx(wt,{value:b,children:g(b,e)},b))})]}),e!=="en"&&n.jsx("div",{className:"tw-pt-3",children:n.jsx(W,{className:"tw-font-normal tw-text-muted-foreground",children:h.formatReplacementString(d,{fallbackLanguages:(r==null?void 0:r.length)>0?r.map(b=>g(b,e)).join(", "):t.en.autonym})})})]})}function fi({item:t,createLabel:e,createComplexLabel:r}){return e?n.jsx(W,{children:e(t)}):r?n.jsx(W,{children:r(t)}):n.jsx(W,{children:t})}function gi({id:t,className:e,listItems:r,selectedListItems:o,handleSelectListItem:a,createLabel:i,createComplexLabel:w}){return n.jsx("div",{id:t,className:e,children:r.map(l=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(Ie,{className:"tw-me-2 tw-align-middle",checked:o.includes(l),onCheckedChange:u=>a(l,u)}),n.jsx(fi,{item:l,createLabel:i,createComplexLabel:w})]},l))})}function bi({cardKey:t,isSelected:e,onSelect:r,isDenied:o,isHidden:a=!1,className:i,children:w,dropdownContent:l,additionalSelectedContent:u,accentColor:d}){const p=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),r())};return n.jsxs("div",{hidden:a,onClick:r,onKeyDown:p,role:"button",tabIndex:0,"aria-pressed":e,className:c("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":o&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[n.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[n.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[n.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:w}),e&&l&&n.jsxs(de,{children:[n.jsx(Te,{className:c(d&&"tw-me-1"),asChild:!0,children:n.jsx(E,{className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:n.jsx(S.MoreHorizontal,{})})}),n.jsx(Qt,{align:"end",children:l})]})]}),e&&u&&n.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:u})]}),d&&n.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${d}`})]},t)}const so=s.forwardRef(({className:t,...e},r)=>n.jsx(S.LoaderCircle,{size:35,className:c("tw-animate-spin",t),...e,ref:r}));so.displayName="Spinner";function xi({id:t,isDisabled:e=!1,hasError:r=!1,isFullWidth:o=!1,helperText:a,label:i,placeholder:w,isRequired:l=!1,className:u,defaultValue:d,value:p,onChange:f,onFocus:m,onBlur:g}){return n.jsxs("div",{className:c("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":o}),children:[n.jsx(W,{htmlFor:t,className:c({"tw-text-red-600":r,"tw-hidden":!i}),children:`${i}${l?"*":""}`}),n.jsx(te,{id:t,disabled:e,placeholder:w,required:l,className:c(u,{"tw-border-red-600":r}),defaultValue:d,value:p,onChange:f,onFocus:m,onBlur:g}),n.jsx("p",{className:c({"tw-hidden":!a}),children:a})]})}const vi=Rt.cva(c("tw-relative tw-w-full tw-rounded-lg tw-border tw-px-4 tw-py-3 tw-text-sm [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>svg~*]:tw-pl-7","[&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground"),{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:c("tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive","[&>img]:tw-text-destructive")}},defaultVariants:{variant:"default"}}),io=s.forwardRef(({className:t,variant:e,...r},o)=>n.jsx("div",{ref:o,role:"alert",className:c("pr-twp",vi({variant:e}),t),...r}));io.displayName="Alert";const wo=s.forwardRef(({className:t,...e},r)=>n.jsxs("h5",{ref:r,className:c("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));wo.displayName="AlertTitle";const lo=s.forwardRef(({className:t,...e},r)=>n.jsx("div",{ref:r,className:c("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));lo.displayName="AlertDescription";const co=s.forwardRef(({className:t,...e},r)=>n.jsx(Jt.Root,{ref:r,className:c("pr-twp","tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));co.displayName=Jt.Root.displayName;const po=s.forwardRef(({className:t,...e},r)=>n.jsx(Jt.Image,{ref:r,className:c("pr-twp","tw-aspect-square tw-h-full tw-w-full",t),...e}));po.displayName=Jt.Image.displayName;const uo=s.forwardRef(({className:t,...e},r)=>n.jsx(Jt.Fallback,{ref:r,className:c("pr-twp","tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));uo.displayName=Jt.Fallback.displayName;const yi=H.Root,Ni=H.Trigger,ji=H.Group,ki=H.Portal,Ci=H.Sub,Si=H.RadioGroup,mo=s.forwardRef(({className:t,inset:e,children:r,...o},a)=>n.jsxs(H.SubTrigger,{ref:a,className:c("pr-twp","tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-ps-8",t),...o,children:[r,n.jsx(Je,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));mo.displayName=H.SubTrigger.displayName;const ho=s.forwardRef(({className:t,...e},r)=>n.jsx(H.SubContent,{ref:r,className:c("pr-twp","tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));ho.displayName=H.SubContent.displayName;const fo=s.forwardRef(({className:t,...e},r)=>n.jsx(H.Portal,{children:n.jsx(H.Content,{ref:r,className:c("pr-twp","tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));fo.displayName=H.Content.displayName;const go=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(H.Item,{ref:o,className:c("pr-twp","tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-ps-8",t),...r}));go.displayName=H.Item.displayName;const bo=s.forwardRef(({className:t,children:e,checked:r,...o},a)=>n.jsxs(H.CheckboxItem,{ref:a,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:r,...o,children:[n.jsx("span",{className:c("tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center","tw-start-2"),children:n.jsx(H.ItemIndicator,{children:n.jsx(le,{className:"tw-h-4 tw-w-4"})})}),e]}));bo.displayName=H.CheckboxItem.displayName;const xo=s.forwardRef(({className:t,children:e,...r},o)=>n.jsxs(H.RadioItem,{ref:o,className:c("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...r,children:[n.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:n.jsx(H.ItemIndicator,{children:n.jsx(_e,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));xo.displayName=H.RadioItem.displayName;const vo=s.forwardRef(({className:t,inset:e,...r},o)=>n.jsx(H.Label,{ref:o,className:c("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...r}));vo.displayName=H.Label.displayName;const yo=s.forwardRef(({className:t,...e},r)=>n.jsx(H.Separator,{ref:r,className:c("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));yo.displayName=H.Separator.displayName;function No({className:t,...e}){return n.jsx("span",{className:c("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}No.displayName="ContextMenuShortcut";const jo=s.createContext({direction:"bottom"});function ko({shouldScaleBackground:t=!0,direction:e="bottom",...r}){const o=s.useMemo(()=>({direction:e}),[e]);return n.jsx(jo.Provider,{value:o,children:n.jsx(lt.Drawer.Root,{shouldScaleBackground:t,direction:e,...r})})}ko.displayName="Drawer";const _i=lt.Drawer.Trigger,Co=lt.Drawer.Portal,Ri=lt.Drawer.Close,Cn=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Overlay,{ref:r,className:c("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));Cn.displayName=lt.Drawer.Overlay.displayName;const So=s.forwardRef(({className:t,children:e,hideDrawerHandle:r=!1,...o},a)=>{const{direction:i="bottom"}=s.useContext(jo),w={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-start-0 tw-me-24 tw-rounded-e-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-end-0 tw-ms-24 tw-rounded-s-[10px] tw-w-auto tw-max-w-sm"},l={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-me-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ms-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return n.jsxs(Co,{children:[n.jsx(Cn,{}),n.jsxs(lt.Drawer.Content,{ref:a,className:c("tw-fixed tw-z-50 tw-flex tw-h-auto tw-rounded-t-[10px] tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",w[i],t),...o,children:[!r&&(i==="bottom"||i==="right")&&n.jsx("div",{className:l[i]}),n.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!r&&(i==="top"||i==="left")&&n.jsx("div",{className:l[i]})]})]})});So.displayName="DrawerContent";function _o({className:t,...e}){return n.jsx("div",{className:c("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}_o.displayName="DrawerHeader";function Ro({className:t,...e}){return n.jsx("div",{className:c("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Ro.displayName="DrawerFooter";const To=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Title,{ref:r,className:c("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));To.displayName=lt.Drawer.Title.displayName;const Mo=s.forwardRef(({className:t,...e},r)=>n.jsx(lt.Drawer.Description,{ref:r,className:c("tw-text-sm tw-text-muted-foreground",t),...e}));Mo.displayName=lt.Drawer.Description.displayName;const Eo=s.forwardRef(({className:t,value:e,...r},o)=>n.jsx(Ke.Root,{ref:o,className:c("pr-twp","tw-relative tw-h-2 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-primary/20",t),...r,children:n.jsx(Ke.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));Eo.displayName=Ke.Root.displayName;function Ti({className:t,...e}){return n.jsx(Ue.PanelGroup,{className:c("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const Mi=Ue.Panel;function Ei({withHandle:t,className:e,...r}){return n.jsx(Ue.PanelResizeHandle,{className:c("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...r,children:t&&n.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:n.jsx(ka,{className:"tw-h-2.5 tw-w-2.5"})})})}function Ii({...t}){const{theme:e="system"}=da.useTheme();return n.jsx(zn.Toaster,{theme:e,className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const Io=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsxs(oe.Root,{ref:r,className:c("pr-twp","tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:o,children:[n.jsx(oe.Track,{className:"tw-relative tw-h-1.5 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-primary/20",children:n.jsx(oe.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),n.jsx(oe.Thumb,{className:"tw-block tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary/50 tw-bg-background tw-shadow tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});Io.displayName=oe.Root.displayName;const Do=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(qe.Root,{className:c("pr-twp","tw-peer tw-inline-flex tw-h-5 tw-w-9 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-shadow-sm tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:r,children:n.jsx(qe.Thumb,{className:c("pr-twp","tw-pointer-events-none tw-block tw-h-4 tw-w-4 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-4 data-[state=unchecked]:tw-translate-x-0",{"data-[state=checked]:tw-translate-x-[-16px] data-[state=unchecked]:tw-translate-x-0":o==="rtl"})})})});Do.displayName=qe.Root.displayName;const Di=st.Root,Vo=s.forwardRef(({className:t,...e},r)=>{const o=tt();return n.jsx(st.List,{ref:r,className:c("pr-twp","tw-inline-flex tw-h-9 tw-items-center tw-justify-center tw-rounded-lg tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:o})});Vo.displayName=st.List.displayName;const Oo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Trigger,{ref:r,className:c("pr-twp","tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow",t),...e}));Oo.displayName=st.Trigger.displayName;const Lo=s.forwardRef(({className:t,...e},r)=>n.jsx(st.Content,{ref:r,className:c("pr-twp","tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));Lo.displayName=st.Content.displayName;const Po=s.forwardRef(({className:t,...e},r)=>n.jsx("textarea",{className:c("pr-twp","tw-flex tw-min-h-[60px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-transparent tw-px-3 tw-py-2 tw-text-base tw-shadow-sm placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:r,...e}));Po.displayName="Textarea";const Vi=(t,e)=>{s.useEffect(()=>{if(!t)return()=>{};const r=t(e);return()=>{r()}},[t,e])};function Oi(t){return{preserveValue:!0,...t}}const Ao=(t,e,r={})=>{const o=s.useRef(e);o.current=e;const a=s.useRef(r);a.current=Oi(a.current);const[i,w]=s.useState(()=>o.current),[l,u]=s.useState(!0);return s.useEffect(()=>{let d=!0;return u(!!t),(async()=>{if(t){const p=await t();d&&(w(()=>p),u(!1))}})(),()=>{d=!1,a.current.preserveValue||w(()=>o.current)}},[t]),[i,l]},Xe=()=>!1,Li=(t,e)=>{const[r]=Ao(s.useCallback(async()=>{if(!t)return Xe;const o=await Promise.resolve(t(e));return async()=>o()},[e,t]),Xe,{preserveValue:!1});s.useEffect(()=>()=>{r!==Xe&&r()},[r])},Pi=({options:t,onFocusChange:e,onOptionSelect:r,onCharacterPress:o})=>{const a=s.useRef(null),[i,w]=s.useState(void 0),[l,u]=s.useState(void 0),d=s.useCallback(m=>{w(m);const g=t.find(y=>y.id===m);g&&(e==null||e(g));const b=document.getElementById(m);b&&(b.scrollIntoView({block:"center"}),b.focus()),a.current&&a.current.setAttribute("aria-activedescendant",m)},[e,t]),p=s.useCallback(m=>{const g=t.find(b=>b.id===m);g&&(u(b=>b===m?void 0:m),r==null||r(g))},[r,t]),f=s.useCallback(m=>{const g=t.findIndex(N=>N.id===i);let b=g;switch(m.key){case"ArrowDown":b=Math.min(g+1,t.length-1),m.preventDefault();break;case"ArrowUp":b=Math.max(g-1,0),m.preventDefault();break;case"Home":b=0,m.preventDefault();break;case"End":b=t.length-1,m.preventDefault();break;case" ":case"Enter":i&&p(i),m.preventDefault(),m.stopPropagation();return;default:m.key.length===1&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&(o==null||o(m.key),m.preventDefault());return}const y=t[b];y&&d(y.id)},[t,d,i,p,o]);return{listboxRef:a,activeId:i,selectedId:l,handleKeyDown:f,focusOption:d}};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>zn.toast});exports.Alert=io;exports.AlertDescription=lo;exports.AlertTitle=wo;exports.Avatar=co;exports.AvatarFallback=uo;exports.AvatarImage=po;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=Qa;exports.BOOK_SELECTOR_STRING_KEYS=ns;exports.Badge=ve;exports.BookChapterControl=Wa;exports.BookSelectionMode=or;exports.BookSelector=rs;exports.Button=E;exports.Card=pn;exports.CardContent=Sr;exports.CardDescription=Cr;exports.CardFooter=_r;exports.CardHeader=jr;exports.CardTitle=kr;exports.ChapterRangeSelector=rr;exports.Checkbox=Ie;exports.Checklist=gi;exports.ComboBox=be;exports.Command=Bt;exports.CommandEmpty=ce;exports.CommandGroup=Ct;exports.CommandInput=Zt;exports.CommandItem=Tt;exports.CommandList=Gt;exports.ContextMenu=yi;exports.ContextMenuCheckboxItem=bo;exports.ContextMenuContent=fo;exports.ContextMenuGroup=ji;exports.ContextMenuItem=go;exports.ContextMenuLabel=vo;exports.ContextMenuPortal=ki;exports.ContextMenuRadioGroup=Si;exports.ContextMenuRadioItem=xo;exports.ContextMenuSeparator=yo;exports.ContextMenuShortcut=No;exports.ContextMenuSub=Ci;exports.ContextMenuSubContent=ho;exports.ContextMenuSubTrigger=mo;exports.ContextMenuTrigger=Ni;exports.DataTable=hr;exports.Drawer=ko;exports.DrawerClose=Ri;exports.DrawerContent=So;exports.DrawerDescription=Mo;exports.DrawerFooter=Ro;exports.DrawerHeader=_o;exports.DrawerOverlay=Cn;exports.DrawerPortal=Co;exports.DrawerTitle=To;exports.DrawerTrigger=_i;exports.DropdownMenu=de;exports.DropdownMenuCheckboxItem=Me;exports.DropdownMenuContent=Qt;exports.DropdownMenuGroup=rn;exports.DropdownMenuItem=sn;exports.DropdownMenuItemType=br;exports.DropdownMenuLabel=Ee;exports.DropdownMenuPortal=ar;exports.DropdownMenuRadioGroup=ir;exports.DropdownMenuRadioItem=wn;exports.DropdownMenuSeparator=pe;exports.DropdownMenuShortcut=wr;exports.DropdownMenuSub=sr;exports.DropdownMenuSubContent=an;exports.DropdownMenuSubTrigger=on;exports.DropdownMenuTrigger=Te;exports.ERROR_DUMP_STRING_KEYS=fr;exports.ERROR_POPOVER_STRING_KEYS=ds;exports.ErrorDump=gr;exports.ErrorPopover=ps;exports.Filter=gs;exports.FilterDropdown=us;exports.Footer=fs;exports.FootnoteItem=Nr;exports.FootnoteList=ys;exports.INVENTORY_STRING_KEYS=Es;exports.Input=te;exports.Inventory=Vs;exports.Label=W;exports.MarkdownRenderer=cs;exports.MoreInfo=ms;exports.MultiSelectComboBox=vr;exports.NavigationContentSearch=ai;exports.Popover=Ft;exports.PopoverAnchor=qa;exports.PopoverContent=Mt;exports.PopoverTrigger=$t;exports.Progress=Eo;exports.RadioGroup=Re;exports.RadioGroupItem=ie;exports.RecentSearches=nr;exports.ResizableHandle=Ei;exports.ResizablePanel=Mi;exports.ResizablePanelGroup=Ti;exports.ResultsCard=bi;exports.SCOPE_SELECTOR_STRING_KEYS=Zs;exports.ScopeSelector=Ws;exports.ScriptureResultsViewer=Ys;exports.ScrollGroupSelector=Qs;exports.SearchBar=Ae;exports.Select=At;exports.SelectContent=_t;exports.SelectGroup=lr;exports.SelectItem=wt;exports.SelectLabel=dr;exports.SelectScrollDownButton=cn;exports.SelectScrollUpButton=ln;exports.SelectSeparator=pr;exports.SelectTrigger=St;exports.SelectValue=zt;exports.Separator=Ve;exports.SettingsList=ti;exports.SettingsListHeader=ni;exports.SettingsListItem=ei;exports.SettingsSidebar=Hr;exports.SettingsSidebarContentSearch=Bs;exports.Sidebar=hn;exports.SidebarContent=gn;exports.SidebarFooter=Lr;exports.SidebarGroup=ye;exports.SidebarGroupAction=Ar;exports.SidebarGroupContent=je;exports.SidebarGroupLabel=Ne;exports.SidebarHeader=Or;exports.SidebarInput=Vr;exports.SidebarInset=fn;exports.SidebarMenu=bn;exports.SidebarMenuAction=zr;exports.SidebarMenuBadge=Br;exports.SidebarMenuButton=vn;exports.SidebarMenuItem=xn;exports.SidebarMenuSkeleton=Gr;exports.SidebarMenuSub=Fr;exports.SidebarMenuSubButton=Xr;exports.SidebarMenuSubItem=$r;exports.SidebarProvider=mn;exports.SidebarRail=Dr;exports.SidebarSeparator=Pr;exports.SidebarTrigger=Ir;exports.Skeleton=xe;exports.Slider=Io;exports.Sonner=Ii;exports.Spinner=so;exports.Switch=Do;exports.TabDropdownMenu=Ce;exports.TabFloatingMenu=oi;exports.TabToolbar=ri;exports.Table=ue;exports.TableBody=he;exports.TableCaption=mr;exports.TableCell=kt;exports.TableFooter=ur;exports.TableHead=Yt;exports.TableHeader=me;exports.TableRow=ht;exports.Tabs=Di;exports.TabsContent=Lo;exports.TabsList=Vo;exports.TabsTrigger=Oo;exports.TextField=xi;exports.Textarea=Po;exports.ToggleGroup=un;exports.ToggleGroupItem=ae;exports.Toolbar=ui;exports.Tooltip=Le;exports.TooltipContent=fe;exports.TooltipProvider=Oe;exports.TooltipTrigger=Pe;exports.UiLanguageSelector=hi;exports.VerticalTabs=Nn;exports.VerticalTabsContent=kn;exports.VerticalTabsList=jn;exports.VerticalTabsTrigger=Zr;exports.badgeVariants=xr;exports.buttonVariants=er;exports.cn=c;exports.getBookIdFromUSFM=Ms;exports.getLinesFromUSFM=Rs;exports.getNumberFromUSFM=Ts;exports.getStatusForItem=Mr;exports.getToolbarOSReservedSpaceClassName=pi;exports.inventoryCountColumn=Ss;exports.inventoryItemColumn=ks;exports.inventoryStatusColumn=_s;exports.selectTriggerVariants=cr;exports.useEvent=Vi;exports.useEventAsync=Li;exports.useListbox=Pi;exports.usePromise=Ao;exports.useRecentSearches=Ya;exports.useSidebar=ge;function Ai(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}Ai(`*, ::before, ::after {
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
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
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
  quotes: "0o201C""0o201D""0o2018""0o2019";
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
.tw-bottom-0 {
  bottom: 0px;
}
.tw-end-0 {
  inset-inline-end: 0px;
}
.tw-end-2 {
  inset-inline-end: 0.5rem;
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
.tw-right-2 {
  right: 0.5rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-0 {
  inset-inline-start: 0px;
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
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
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
.tw-me-24 {
  margin-inline-end: 6rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
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
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-24 {
  margin-inline-start: 6rem;
}
.tw-ms-4 {
  margin-inline-start: 1rem;
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
.tw-table {
  display: table;
}
.tw-table-cell {
  display: table-cell;
}
.tw-table-row {
  display: table-row;
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
.tw-h-1\\.5 {
  height: 0.375rem;
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
.tw-h-\\[3\\.2rem\\] {
  height: 3.2rem;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
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
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[--radix-select-content-available-height\\] {
  max-height: var(--radix-select-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-max-h-\\[var\\(--radix-dropdown-menu-content-available-height\\)\\] {
  max-height: var(--radix-dropdown-menu-content-available-height);
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-\\[60px\\] {
  min-height: 60px;
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
.tw-min-w-10 {
  min-width: 2.5rem;
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
.tw-min-w-9 {
  min-width: 2.25rem;
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
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw-origin-\\[--radix-dropdown-menu-content-transform-origin\\] {
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}
.tw-origin-\\[--radix-menubar-content-transform-origin\\] {
  transform-origin: var(--radix-menubar-content-transform-origin);
}
.tw-origin-\\[--radix-popover-content-transform-origin\\] {
  transform-origin: var(--radix-popover-content-transform-origin);
}
.tw-origin-\\[--radix-select-content-transform-origin\\] {
  transform-origin: var(--radix-select-content-transform-origin);
}
.tw-origin-\\[--radix-tooltip-content-transform-origin\\] {
  transform-origin: var(--radix-tooltip-content-transform-origin);
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
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-disc {
  list-style-type: disc;
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
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
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
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
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
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
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
.tw-rounded-e-\\[10px\\] {
  border-start-end-radius: 10px;
  border-end-end-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-s-\\[10px\\] {
  border-start-start-radius: 10px;
  border-end-start-radius: 10px;
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
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-primary\\/50 {
  border-color: hsl(var(--primary) / 0.5);
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
.tw-bg-primary\\/10 {
  background-color: hsl(var(--primary) / 0.1);
}
.tw-bg-primary\\/20 {
  background-color: hsl(var(--primary) / 0.2);
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
.tw-fill-primary {
  fill: hsl(var(--primary));
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
.tw-pl-8 {
  padding-left: 2rem;
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
.tw-pr-8 {
  padding-right: 2rem;
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
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
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
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opacity\\] {
  transition-property: margin,opacity;
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
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
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
.focus\\:tw-ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
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
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
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
.data-\\[state\\=checked\\]\\:tw-translate-x-4[data-state="checked"] {
  --tw-translate-x: 1rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-16px\\][data-state="checked"] {
  --tw-translate-x: -16px;
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
.data-\\[placeholder\\]\\:tw-text-muted-foreground[data-placeholder] {
  color: hsl(var(--muted-foreground));
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
.data-\\[state\\=active\\]\\:tw-shadow[data-state="active"] {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--end-4 {
  inset-inline-end: -1rem;
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
.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-rotate-180 {
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
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-start-full::after {
  content: var(--tw-content);
  inset-inline-start: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
.dark\\:tw-border-destructive:is(.tw-dark *) {
  border-color: hsl(var(--destructive));
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
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}
.\\[\\&\\>\\[role\\=checkbox\\]\\]\\:tw-translate-y-\\[2px\\]>[role=checkbox] {
  --tw-translate-y: 2px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
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
[data-side=primary] .\\[\\[data-side\\=primary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`,"after-all");
//# sourceMappingURL=index.cjs.map
