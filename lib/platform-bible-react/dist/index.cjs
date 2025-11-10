"use strict";var u0=Object.defineProperty;var d0=(t,e,n)=>e in t?u0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var qt=(t,e,n)=>d0(t,typeof e!="symbol"?e+"":e,n);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react/jsx-runtime"),w=require("react"),en=require("cmdk"),ie=require("lucide-react"),p0=require("clsx"),f0=require("tailwind-merge"),h0=require("@radix-ui/react-dialog"),ne=require("platform-bible-utils"),si=require("@radix-ui/react-slot"),Lr=require("class-variance-authority"),w0=require("@radix-ui/react-popover"),g0=require("@radix-ui/react-label"),m0=require("@radix-ui/react-radio-group"),b0=require("@radix-ui/react-separator"),g=require("lexical"),v0=require("@radix-ui/react-tooltip"),ua=require("@lexical/rich-text"),Xt=require("react-dom"),th=require("@lexical/table"),x0=require("@radix-ui/react-toggle-group"),y0=require("@radix-ui/react-toggle"),_0=require("markdown-to-jsx"),C0=require("@radix-ui/react-avatar"),Vt=require("@tanstack/react-table"),nh=require("@radix-ui/react-dropdown-menu"),E0=require("@radix-ui/react-select"),k0=require("@radix-ui/react-checkbox"),N0=require("@radix-ui/react-tabs"),S0=require("@radix-ui/react-menubar"),T0=require("react-hotkeys-hook"),A0=require("@radix-ui/react-context-menu"),Ln=require("vaul"),D0=require("@radix-ui/react-progress"),M0=require("react-resizable-panels"),rh=require("sonner"),R0=require("@radix-ui/react-slider"),O0=require("@radix-ui/react-switch");function at(t){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const n in t)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:()=>t[n]})}}return e.default=t,Object.freeze(e)}const Po=at(w),Rn=at(h0),Ho=at(w0),oh=at(g0),Bi=at(m0),ih=at(b0),ss=at(v0),j0=at(Xt),Pa=at(x0),sh=at(y0),ai=at(C0),Ye=at(nh),it=at(E0),lc=at(k0),tn=at(N0),We=at(S0),Je=at(A0),cc=at(D0),Jc=at(M0),Oi=at(R0),uc=at(O0),I0=f0.extendTailwindMerge({prefix:"tw-"});function z(...t){return I0(p0.clsx(t))}const L0="layoutDirection";function Et(){const t=localStorage.getItem(L0);return t==="rtl"?t:"ltr"}const $0=Rn.Root,P0=Rn.Portal,ah=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Overlay,{ref:n,className:z("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",t),...e}));ah.displayName=Rn.Overlay.displayName;const lh=w.forwardRef(({className:t,children:e,...n},r)=>{const o=Et();return l.jsxs(P0,{children:[l.jsx(ah,{}),l.jsxs(Rn.Content,{ref:r,className:z("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",t),...n,dir:o,children:[e,l.jsxs(Rn.Close,{className:z("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[l.jsx(ie.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Close"})]})]})]})});lh.displayName=Rn.Content.displayName;function ch({className:t,...e}){return l.jsx("div",{className:z("tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",t),...e})}ch.displayName="DialogHeader";const uh=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Title,{ref:n,className:z("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));uh.displayName=Rn.Title.displayName;const F0=w.forwardRef(({className:t,...e},n)=>l.jsx(Rn.Description,{ref:n,className:z("tw-text-sm tw-text-muted-foreground",t),...e}));F0.displayName=Rn.Description.displayName;const xo=w.forwardRef(({className:t,...e},n)=>l.jsx(en.Command,{ref:n,className:z("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",t),...e}));xo.displayName=en.Command.displayName;const li=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:r,children:[l.jsx(ie.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"}),l.jsx(en.Command.Input,{ref:n,className:z("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e})]})});li.displayName=en.Command.Input.displayName;const yo=w.forwardRef(({className:t,...e},n)=>l.jsx(en.Command.List,{ref:n,className:z("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",t),...e}));yo.displayName=en.Command.List.displayName;const as=w.forwardRef((t,e)=>l.jsx(en.Command.Empty,{ref:e,className:"tw-py-6 tw-text-center tw-text-sm",...t}));as.displayName=en.Command.Empty.displayName;const Tr=w.forwardRef(({className:t,...e},n)=>l.jsx(en.Command.Group,{ref:n,className:z("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",t),...e}));Tr.displayName=en.Command.Group.displayName;const dh=w.forwardRef(({className:t,...e},n)=>l.jsx(en.Command.Separator,{ref:n,className:z("tw--mx-1 tw-h-px tw-bg-border",t),...e}));dh.displayName=en.Command.Separator.displayName;const $r=w.forwardRef(({className:t,...e},n)=>l.jsx(en.Command.Item,{ref:n,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",t),...e}));$r.displayName=en.Command.Item.displayName;var B0=Object.defineProperty,q0=(t,e,n)=>e in t?B0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,Se=(t,e,n)=>q0(t,typeof e!="symbol"?e+"":e,n);const io=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Xc=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ph=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],Cd=X0();function ci(t,e=!0){return e&&(t=t.toUpperCase()),t in Cd?Cd[t]:0}function Qc(t){return ci(t)>0}function U0(t){const e=typeof t=="string"?ci(t):t;return e>=40&&e<=66}function V0(t){return(typeof t=="string"?ci(t):t)<=39}function fh(t){return t<=66}function H0(t){const e=typeof t=="string"?ci(t):t;return gh(e)&&!fh(e)}function*z0(){for(let t=1;t<=io.length;t++)yield t}const G0=1,hh=io.length;function K0(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Zc(t,e="***"){const n=t-1;return n<0||n>=io.length?e:io[n]}function wh(t){return t<=0||t>hh?"******":ph[t-1]}function Y0(t){return wh(ci(t))}function gh(t){const e=typeof t=="number"?Zc(t):t;return Qc(e)&&!Xc.includes(e)}function W0(t){const e=typeof t=="number"?Zc(t):t;return Qc(e)&&Xc.includes(e)}function J0(t){return ph[t-1].includes("*obsolete*")}function X0(){const t={};for(let e=0;e<io.length;e++)t[io[e]]=e+1;return t}const Fe={allBookIds:io,nonCanonicalIds:Xc,bookIdToNumber:ci,isBookIdValid:Qc,isBookNT:U0,isBookOT:V0,isBookOTNT:fh,isBookDC:H0,allBookNumbers:z0,firstBook:G0,lastBook:hh,extraBooks:K0,bookNumberToId:Zc,bookNumberToEnglishName:wh,bookIdToEnglishName:Y0,isCanonical:gh,isExtraMaterial:W0,isObsolete:J0};var Gn=(t=>(t[t.Unknown=0]="Unknown",t[t.Original=1]="Original",t[t.Septuagint=2]="Septuagint",t[t.Vulgate=3]="Vulgate",t[t.English=4]="English",t[t.RussianProtestant=5]="RussianProtestant",t[t.RussianOrthodox=6]="RussianOrthodox",t))(Gn||{});const pn=class{constructor(e){if(Se(this,"name"),Se(this,"fullPath"),Se(this,"isPresent"),Se(this,"hasVerseSegments"),Se(this,"isCustomized"),Se(this,"baseVersification"),Se(this,"scriptureBooks"),Se(this,"_type"),e==null)throw new Error("Argument undefined");typeof e=="string"?(this.name=e,this._type=Gn[e]):(this._type=e,this.name=Gn[e])}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};Se(pn,"Original",new pn(Gn.Original)),Se(pn,"Septuagint",new pn(Gn.Septuagint)),Se(pn,"Vulgate",new pn(Gn.Vulgate)),Se(pn,"English",new pn(Gn.English)),Se(pn,"RussianProtestant",new pn(Gn.RussianProtestant)),Se(pn,"RussianOrthodox",new pn(Gn.RussianOrthodox));let Qr=pn;function Ed(t,e){const n=e[0];for(let r=1;r<e.length;r++)t=t.split(e[r]).join(n);return t.split(n)}var mh=(t=>(t[t.Valid=0]="Valid",t[t.UnknownVersification=1]="UnknownVersification",t[t.OutOfRange=2]="OutOfRange",t[t.VerseOutOfOrder=3]="VerseOutOfOrder",t[t.VerseRepeated=4]="VerseRepeated",t))(mh||{});const Jt=class Re{constructor(e,n,r,o){if(Se(this,"firstChapter"),Se(this,"lastChapter"),Se(this,"lastVerse"),Se(this,"hasSegmentsDefined"),Se(this,"text"),Se(this,"BBBCCCVVVS"),Se(this,"longHashCode"),Se(this,"versification"),Se(this,"rtlMark","‏"),Se(this,"_bookNum",0),Se(this,"_chapterNum",0),Se(this,"_verseNum",0),Se(this,"_verse"),r==null&&o==null)if(e!=null&&typeof e=="string"){const i=e,s=n!=null&&n instanceof Qr?n:void 0;this.setEmpty(s),this.parse(i)}else if(e!=null&&typeof e=="number"){const i=n!=null&&n instanceof Qr?n:void 0;this.setEmpty(i),this._verseNum=e%Re.chapterDigitShifter,this._chapterNum=Math.floor(e%Re.bookDigitShifter/Re.chapterDigitShifter),this._bookNum=Math.floor(e/Re.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Re){const i=e;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(e==null)return;const i=e instanceof Qr?e:Re.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&r!=null)if(typeof e=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(e,n,r);else if(typeof e=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=r,this.versification=o??Re.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=new Re(e),{success:!0,verseRef:n}}catch(r){if(r instanceof Ni)return n=new Re,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(e,n,r){return e%Re.bcvMaxValue*Re.bookDigitShifter+(n>=0?n%Re.bcvMaxValue*Re.chapterDigitShifter:0)+(r>=0?r%Re.bcvMaxValue:0)}static fromJSON(e){const{book:n,chapterNum:r,verseNum:o,verse:i,versificationStr:s}=e,a=i||o.toString();let c;return s&&(c=new Qr(s)),n?new Re(n,r.toString(),a,c):new Re}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<e.length;o++){if(r=e[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-0,n>Re.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Re.verseRangeSeparator)||this._verse.includes(Re.verseSequenceIndicator))}get book(){return Fe.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Fe.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:r}=Re.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=Re.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Fe.lastBook)throw new Ni("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new Qr(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Re.verseRangeSeparators,Re.verseSequenceIndicators)}get BBBCCC(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Re.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const i=e.split("/");if(e=i[0],i.length>1)try{const s=+i[1].trim();this.versification=new Qr(Gn[s])}catch{throw new Ni("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new Ni("Invalid reference : "+e);const r=n[1].split(":"),o=+r[0];if(r.length!==2||Fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!Re.isVerseParseable(r[1]))throw new Ni("Invalid reference : "+e);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new Re(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}toJSON(){let e=this.verse;(e===""||e===this.verseNum.toString())&&(e=void 0);const n={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:e,versificationStr:this.versificationStr};return e||delete n.verse,n}equals(e){return e instanceof Re?e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e.verse===this.verse&&(e.versification==null&&this.versification==null||e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)):!1}allVerses(e=!1,n=Re.verseRangeSeparators,r=Re.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=Ed(this._verse,r);for(const s of i.map(a=>Ed(a,n))){const a=this.clone();a.verse=s[0];const c=a.verseNum;if(o.push(a),s.length>1){const u=this.clone();if(u.verse=s[1],!e)for(let d=c+1;d<u.verseNum;d++){const p=new Re(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(p)}o.push(u)}}return o}validateVerse(e,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,e,n)){const i=o.internalValid;if(i!==0)return i;const s=o.BBBCCCVVV;if(r>s)return 3;if(r===s)return 4;r=s}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Fe.lastBook?2:(Fe.isCanonical(this._bookNum),0)}setEmpty(e=Re.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,r){this.bookNum=Fe.bookIdToNumber(e),this.chapter=n,this.verse=r}};Se(Jt,"defaultVersification",Qr.English),Se(Jt,"verseRangeSeparator","-"),Se(Jt,"verseSequenceIndicator",","),Se(Jt,"verseRangeSeparators",[Jt.verseRangeSeparator]),Se(Jt,"verseSequenceIndicators",[Jt.verseSequenceIndicator]),Se(Jt,"chapterDigitShifter",1e3),Se(Jt,"bookDigitShifter",Jt.chapterDigitShifter*Jt.chapterDigitShifter),Se(Jt,"bcvMaxValue",Jt.chapterDigitShifter-1),Se(Jt,"ValidStatusType",mh);let Ni=class extends Error{};const bh=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"Old Testament";case ne.Section.NT:return n??"New Testament";case ne.Section.DC:return r??"Deuterocanon";case ne.Section.Extra:return o??"Extra Materials";default:throw new Error(`Unknown section: ${t}`)}},Q0=(t,e,n,r,o)=>{switch(t){case ne.Section.OT:return e??"OT";case ne.Section.NT:return n??"NT";case ne.Section.DC:return r??"DC";case ne.Section.Extra:return o??"Extra";default:throw new Error(`Unknown section: ${t}`)}};function Fo(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedName)??Fe.bookIdToEnglishName(t)}function eu(t,e){var r;return((r=e==null?void 0:e.get(t))==null?void 0:r.localizedId)??t.toUpperCase()}const vh=Fe.allBookIds.filter(t=>!Fe.isObsolete(Fe.bookIdToNumber(t))),no=Object.fromEntries(vh.map(t=>[t,Fe.bookIdToEnglishName(t)]));function tu(t,e,n){const r=e.trim().toLowerCase();if(!r)return!1;const o=Fe.bookIdToEnglishName(t),i=n==null?void 0:n.get(t);return!!(ne.includes(o.toLowerCase(),r)||ne.includes(t.toLowerCase(),r)||(i?ne.includes(i.localizedName.toLowerCase(),r)||ne.includes(i.localizedId.toLowerCase(),r):!1))}const xh=w.forwardRef(({bookId:t,isSelected:e,onSelect:n,onMouseDown:r,section:o,className:i,showCheck:s=!1,localizedBookNames:a,commandValue:c},u)=>{const d=w.useRef(!1),p=()=>{d.current||n==null||n(t),setTimeout(()=>{d.current=!1},100)},f=x=>{d.current=!0,r?r(x):n==null||n(t)},h=w.useMemo(()=>Fo(t,a),[t,a]),b=w.useMemo(()=>eu(t,a),[t,a]);return l.jsx("div",{className:z("tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",{"tw-border-s-red-200":o===ne.Section.OT,"tw-border-s-purple-200":o===ne.Section.NT,"tw-border-s-indigo-200":o===ne.Section.DC,"tw-border-s-amber-200":o===ne.Section.Extra}),children:l.jsxs($r,{ref:u,value:c||`${t} ${Fe.bookIdToEnglishName(t)}`,onSelect:p,onMouseDown:f,role:"option","aria-selected":e,"aria-label":`${Fe.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,className:i,children:[s&&l.jsx(ie.Check,{className:z("tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",e?"tw-opacity-100":"tw-opacity-0")}),l.jsx("span",{className:"tw-min-w-0 tw-flex-1",children:h}),l.jsx("span",{className:"tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground",children:b})]})})}),yh=Lr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),ve=w.forwardRef(({className:t,variant:e,size:n,asChild:r=!1,...o},i)=>{const s=r?si.Slot:"button";return l.jsx(s,{className:z(yh({variant:e,size:n,className:t})),ref:i,...o})});ve.displayName="Button";const _o=Ho.Root,Co=Ho.Trigger,Z0=Ho.Anchor,Pr=w.forwardRef(({className:t,align:e="center",sideOffset:n=4,...r},o)=>{const i=Et();return l.jsx(Ho.Portal,{children:l.jsx(Ho.Content,{ref:o,align:e,sideOffset:n,className:z("tw-z-[250]","pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,dir:i})})});Pr.displayName=Ho.Content.displayName;function dc(t,e,n){return`${t} ${no[t]}${e?` ${eu(t,e)} ${Fo(t,e)}`:""}${n?` ${n}`:""}`}function _h({recentSearches:t,onSearchItemSelect:e,renderItem:n=a=>String(a),getItemKey:r=a=>String(a),ariaLabel:o="Show recent searches",groupHeading:i="Recent",id:s}){const[a,c]=w.useState(!1);if(t.length===0)return;const u=d=>{e(d),c(!1)};return l.jsxs(_o,{open:a,onOpenChange:c,children:[l.jsx(Co,{asChild:!0,children:l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2","aria-label":o,children:l.jsx(ie.Clock,{className:"tw-h-4 tw-w-4"})})}),l.jsx(Pr,{id:s,className:"tw-w-[300px] tw-p-0",align:"start",children:l.jsx(xo,{children:l.jsx(yo,{children:l.jsx(Tr,{heading:i,children:t.map(d=>l.jsxs($r,{onSelect:()=>u(d),className:"tw-flex tw-items-center",children:[l.jsx(ie.Clock,{className:"tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50"}),l.jsx("span",{children:n(d)})]},r(d)))})})})})]})}function ev(t,e,n=(o,i)=>o===i,r=15){return o=>{const i=t.filter(a=>!n(a,o)),s=[o,...i.slice(0,r-1)];e(s)}}const Dl={BOOK_ONLY:/^([^:\s]+(?:\s+[^:\s]+)*)$/i,BOOK_CHAPTER:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,BOOK_CHAPTER_VERSE:/^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i},tv=[Dl.BOOK_ONLY,Dl.BOOK_CHAPTER,Dl.BOOK_CHAPTER_VERSE];function kd(t){const e=/^[a-zA-Z]$/.test(t),n=/^[0-9]$/.test(t);return{isLetter:e,isDigit:n}}function Wn(t){return ne.getChaptersForBook(Fe.bookIdToNumber(t))}function nv(t,e,n){if(!t.trim()||e.length===0)return;const r=tv.reduce((o,i)=>{if(o)return o;const s=i.exec(t.trim());if(s){const[a,c=void 0,u=void 0]=s.slice(1);let d;const p=e.filter(f=>tu(f,a,n));if(p.length===1&&([d]=p),!d&&c){if(Fe.isBookIdValid(a)){const f=a.toUpperCase();e.includes(f)&&(d=f)}if(!d&&n){const f=Array.from(n.entries()).find(([,h])=>h.localizedId.toLowerCase()===a.toLowerCase());f&&e.includes(f[0])&&([d]=f)}}if(!d&&c){const h=(b=>Object.keys(no).find(x=>no[x].toLowerCase()===b.toLowerCase()))(a);if(h&&e.includes(h)&&(d=h),!d&&n){const b=Array.from(n.entries()).find(([,x])=>x.localizedName.toLowerCase()===a.toLowerCase());b&&e.includes(b[0])&&([d]=b)}}if(d){let f=c?parseInt(c,10):void 0;f&&f>Wn(d)&&(f=Math.max(Wn(d),1));const h=u?parseInt(u,10):void 0;return{book:d,chapterNum:f,verseNum:h}}}},void 0);if(r)return r}function rv(t,e,n,r){const o=w.useCallback(()=>{if(t.chapterNum>1)r({book:t.book,chapterNum:t.chapterNum-1,verseNum:1});else{const c=e.indexOf(t.book);if(c>0){const u=e[c-1],d=Math.max(Wn(u),1);r({book:u,chapterNum:d,verseNum:1})}}},[t,e,r]),i=w.useCallback(()=>{const c=Wn(t.book);if(t.chapterNum<c)r({book:t.book,chapterNum:t.chapterNum+1,verseNum:1});else{const u=e.indexOf(t.book);if(u<e.length-1){const d=e[u+1];r({book:d,chapterNum:1,verseNum:1})}}},[t,e,r]),s=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum>1?t.verseNum-1:0})},[t,r]),a=w.useCallback(()=>{r({book:t.book,chapterNum:t.chapterNum,verseNum:t.verseNum+1})},[t,r]);return w.useMemo(()=>[{onClick:o,disabled:e.length===0||t.chapterNum===1&&e.indexOf(t.book)===0,title:"Previous chapter",icon:n==="ltr"?ie.ChevronsLeft:ie.ChevronsRight},{onClick:s,disabled:e.length===0||t.verseNum===0,title:"Previous verse",icon:n==="ltr"?ie.ChevronLeft:ie.ChevronRight},{onClick:a,disabled:e.length===0,title:"Next verse",icon:n==="ltr"?ie.ChevronRight:ie.ChevronLeft},{onClick:i,disabled:e.length===0||(t.chapterNum===Wn(t.book)||Wn(t.book)===-1)&&e.indexOf(t.book)===e.length-1,title:"Next chapter",icon:n==="ltr"?ie.ChevronsRight:ie.ChevronsLeft}],[t,e,n,o,s,a,i])}function Nd({bookId:t,scrRef:e,onChapterSelect:n,setChapterRef:r,isChapterDimmed:o,className:i}){if(t)return l.jsx(Tr,{children:l.jsx("div",{className:z("tw-grid tw-grid-cols-6 tw-gap-1",i),children:Array.from({length:Wn(t)},(s,a)=>a+1).map(s=>l.jsx($r,{value:`${t} ${no[t]||""} ${s}`,onSelect:()=>n(s),ref:r(s),className:z("tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",{"tw-bg-primary tw-text-primary-foreground":t===e.book&&s===e.chapterNum},{"tw-bg-muted/50 tw-text-muted-foreground/50":(o==null?void 0:o(s))??!1}),children:s},s))})})}function ov({scrRef:t,handleSubmit:e,className:n,getActiveBookIds:r,localizedBookNames:o,localizedStrings:i,recentSearches:s,onAddRecentSearch:a,id:c}){const u=Et(),[d,p]=w.useState(!1),[f,h]=w.useState(""),[b,x]=w.useState(""),[E,C]=w.useState("books"),[_,D]=w.useState(void 0),[$,H]=w.useState(!1),O=w.useRef(void 0),V=w.useRef(void 0),B=w.useRef(void 0),F=w.useRef(void 0),Y=w.useRef({}),N=w.useCallback(oe=>{e(oe),a&&a(oe)},[e,a]),M=w.useMemo(()=>r?r():vh,[r]),S=w.useMemo(()=>({[ne.Section.OT]:M.filter(me=>Fe.isBookOT(me)),[ne.Section.NT]:M.filter(me=>Fe.isBookNT(me)),[ne.Section.DC]:M.filter(me=>Fe.isBookDC(me)),[ne.Section.Extra]:M.filter(me=>Fe.extraBooks().includes(me))}),[M]),I=w.useMemo(()=>Object.values(S).flat(),[S]),T=w.useMemo(()=>{if(!b.trim())return S;const oe={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return[ne.Section.OT,ne.Section.NT,ne.Section.DC,ne.Section.Extra].forEach(Ne=>{oe[Ne]=S[Ne].filter(Oe=>tu(Oe,b,o))}),oe},[S,b,o]),A=w.useMemo(()=>nv(b,I,o),[b,I,o]),P=w.useCallback(()=>{A&&(N({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1}),p(!1),x(""),h(""))},[N,A]),L=w.useCallback(oe=>{if(Wn(oe)<=1){N({book:oe,chapterNum:1,verseNum:1}),p(!1),x("");return}D(oe),C("chapters")},[N]),J=w.useCallback(oe=>{const me=E==="chapters"?_:A==null?void 0:A.book;me&&(N({book:me,chapterNum:oe,verseNum:1}),p(!1),C("books"),D(void 0),x(""))},[N,E,_,A]),K=w.useCallback(oe=>{N(oe),p(!1),x("")},[N]),W=rv(t,I,u,e),ee=w.useCallback(()=>{C("books"),D(void 0),setTimeout(()=>{V.current&&V.current.focus()},0)},[]),te=w.useCallback(oe=>{if(!oe&&E==="chapters"){ee();return}p(oe),oe&&(C("books"),D(void 0),x(""))},[E,ee]),{otLong:Z,ntLong:X,dcLong:le,extraLong:ce}={otLong:i==null?void 0:i["%scripture_section_ot_long%"],ntLong:i==null?void 0:i["%scripture_section_nt_long%"],dcLong:i==null?void 0:i["%scripture_section_dc_long%"],extraLong:i==null?void 0:i["%scripture_section_extra_long%"]},ue=w.useCallback(oe=>bh(oe,Z,X,le,ce),[Z,X,le,ce]),ge=w.useCallback(oe=>A?!!A.chapterNum&&!oe.toString().includes(A.chapterNum.toString()):!1,[A]),he=w.useMemo(()=>ne.formatScrRef(t,o?Fo(t.book,o):"English"),[t,o]),we=w.useCallback(oe=>me=>{Y.current[oe]=me},[]),se=w.useCallback(oe=>{(oe.key==="Home"||oe.key==="End")&&oe.stopPropagation()},[]),_e=w.useCallback(oe=>{if(oe.ctrlKey)return;const{isLetter:me,isDigit:Ne}=kd(oe.key);if(E==="chapters"){if(oe.key==="Backspace"){oe.preventDefault(),oe.stopPropagation(),ee();return}if(me||Ne){if(oe.preventDefault(),oe.stopPropagation(),C("books"),D(void 0),Ne&&_){const Oe=no[_];x(`${Oe} ${oe.key}`)}else x(oe.key);setTimeout(()=>{V.current&&V.current.focus()},0);return}}if((E==="chapters"||E==="books"&&A)&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(oe.key)){const Oe=E==="chapters"?_:A==null?void 0:A.book;if(!Oe)return;const Be=(()=>{if(!f)return 1;const Ee=f.match(/(\d+)$/);return Ee?parseInt(Ee[1],10):0})(),tt=Wn(Oe);if(!tt)return;let Qe=Be;const st=6;switch(oe.key){case"ArrowLeft":Be!==0&&(Qe=Be>1?Be-1:tt);break;case"ArrowRight":Be!==0&&(Qe=Be<tt?Be+1:1);break;case"ArrowUp":Qe=Be===0?tt:Math.max(1,Be-st);break;case"ArrowDown":Qe=Be===0?1:Math.min(tt,Be+st);break;default:return}Qe!==Be&&(oe.preventDefault(),oe.stopPropagation(),h(dc(Oe,o,Qe)),setTimeout(()=>{const Ee=Y.current[Qe];Ee&&Ee.scrollIntoView({block:"nearest",behavior:"smooth"})},0))}},[E,A,ee,_,f,o]),De=w.useCallback(oe=>{if(oe.shiftKey||oe.key==="Tab"||oe.key===" ")return;const{isLetter:me,isDigit:Ne}=kd(oe.key);(me||Ne)&&(oe.preventDefault(),x(Oe=>Oe+oe.key),V.current.focus(),H(!1))},[]);return w.useLayoutEffect(()=>{const oe=setTimeout(()=>{if(d&&E==="books"&&B.current&&F.current){const me=B.current,Ne=F.current,Oe=Ne.offsetTop,Be=me.clientHeight,tt=Ne.clientHeight,Qe=Oe-Be/2+tt/2;me.scrollTo({top:Math.max(0,Qe),behavior:"smooth"}),h(dc(t.book))}},0);return()=>{clearTimeout(oe)}},[d,E,b,A,t.book]),w.useLayoutEffect(()=>{if(E==="chapters"&&_){const oe=_===t.book;setTimeout(()=>{if(B.current)if(oe){const me=Y.current[t.chapterNum];me&&me.scrollIntoView({block:"center",behavior:"smooth"})}else B.current.scrollTo({top:0});O.current&&O.current.focus()},0)}},[E,_,A,t.book,t.chapterNum]),l.jsxs(_o,{open:d,onOpenChange:te,children:[l.jsx(Co,{asChild:!0,children:l.jsx(ve,{"aria-label":"book-chapter-trigger",variant:"outline",role:"combobox","aria-expanded":d,className:z("tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",n),children:l.jsx("span",{className:"tw-truncate",children:he})})}),l.jsx(Pr,{id:c,forceMount:!0,className:"tw-w-[280px] tw-p-0",align:"center",children:l.jsxs(xo,{ref:O,onKeyDown:_e,loop:!0,value:f,onValueChange:h,shouldFilter:!1,children:[E==="books"?l.jsxs("div",{className:"tw-flex tw-items-end",children:[l.jsxs("div",{className:"tw-relative tw-flex-1",children:[l.jsx(li,{ref:V,value:b,onValueChange:x,onKeyDown:se,onFocus:()=>H(!1),className:s&&s.length>0?"!tw-pr-10":""}),s&&s.length>0&&l.jsx(_h,{recentSearches:s,onSearchItemSelect:K,renderItem:oe=>ne.formatScrRef(oe,"English"),getItemKey:oe=>`${oe.book}-${oe.chapterNum}-${oe.verseNum}`,ariaLabel:i==null?void 0:i["%history_recentSearches_ariaLabel%"],groupHeading:i==null?void 0:i["%history_recent%"]})]}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2",children:W.map(({onClick:oe,disabled:me,title:Ne,icon:Oe})=>l.jsx(ve,{variant:"ghost",size:"sm",onClick:()=>{H(!0),oe()},disabled:me,className:"tw-h-10 tw-w-4 tw-p-0",title:Ne,onKeyDown:De,children:l.jsx(Oe,{})},Ne))})]}):l.jsxs("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:ee,className:"tw-mr-2 tw-h-6 tw-w-6 tw-p-0",tabIndex:-1,children:u==="ltr"?l.jsx(ie.ArrowLeft,{className:"tw-h-4 tw-w-4"}):l.jsx(ie.ArrowRight,{className:"tw-h-4 tw-w-4"})}),_&&l.jsx("span",{tabIndex:-1,className:"tw-text-sm tw-font-medium",children:Fo(_,o)})]}),!$&&l.jsxs(yo,{ref:B,children:[E==="books"&&l.jsxs(l.Fragment,{children:[!A&&Object.entries(T).map(([oe,me])=>{if(me.length!==0)return l.jsx(Tr,{heading:ue(oe),children:me.map(Ne=>l.jsx(xh,{bookId:Ne,onSelect:Oe=>L(Oe),section:ne.getSectionForBook(Ne),commandValue:`${Ne} ${no[Ne]}`,ref:Ne===t.book?F:void 0,localizedBookNames:o},Ne))},oe)}),A&&l.jsx(Tr,{children:l.jsx($r,{value:`${A.book} ${no[A.book]} ${A.chapterNum||""}:${A.verseNum||""})}`,onSelect:P,className:"tw-font-semibold tw-text-primary",children:ne.formatScrRef({book:A.book,chapterNum:A.chapterNum??1,verseNum:A.verseNum??1},o?eu(A.book,o):void 0)},"top-match")}),A&&Wn(A.book)>1&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground",children:Fo(A.book,o)}),l.jsx(Nd,{bookId:A.book,scrRef:t,onChapterSelect:J,setChapterRef:we,isChapterDimmed:ge,className:"tw-px-4 tw-pb-4"})]})]}),E==="chapters"&&_&&l.jsx(Nd,{bookId:_,scrRef:t,onChapterSelect:J,setChapterRef:we,className:"tw-p-4"})]})]})})]})}const iv=Object.freeze(["%scripture_section_ot_long%","%scripture_section_nt_long%","%scripture_section_dc_long%","%scripture_section_extra_long%","%history_recent%","%history_recentSearches_ariaLabel%"]),sv=Lr.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),gt=w.forwardRef(({className:t,...e},n)=>l.jsx(oh.Root,{ref:n,className:z("pr-twp",sv(),t),...e}));gt.displayName=oh.Root.displayName;const Fa=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsx(Bi.Root,{className:z("pr-twp tw-grid tw-gap-2",t),...e,ref:n,dir:r})});Fa.displayName=Bi.Root.displayName;const qi=w.forwardRef(({className:t,...e},n)=>l.jsx(Bi.Item,{ref:n,className:z("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),...e,children:l.jsx(Bi.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:l.jsx(ie.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"})})}));qi.displayName=Bi.Item.displayName;function av(t){return typeof t=="string"?t:typeof t=="number"?t.toString():t.label}function da({id:t,options:e=[],className:n,buttonClassName:r,popoverContentClassName:o,value:i,onChange:s=()=>{},getOptionLabel:a=av,icon:c=void 0,buttonPlaceholder:u="",textPlaceholder:d="",commandEmptyMessage:p="No option found",buttonVariant:f="outline",alignDropDown:h="start",isDisabled:b=!1,...x}){const[E,C]=w.useState(!1);return l.jsxs(_o,{open:E,onOpenChange:C,...x,children:[l.jsx(Co,{asChild:!0,children:l.jsxs(ve,{variant:f,role:"combobox","aria-expanded":E,id:t,className:z("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",r??n),disabled:b,children:[l.jsxs("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[c&&l.jsx("div",{className:"tw-pe-2",children:c}),l.jsx("span",{className:z("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:i?a(i):u})]}),l.jsx(ie.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Pr,{align:h,className:z("tw-w-[200px] tw-p-0",o),children:l.jsxs(xo,{children:[l.jsx(li,{placeholder:d,className:"tw-text-inherit"}),l.jsx(as,{children:p}),l.jsx(yo,{children:e.map(_=>l.jsxs($r,{value:a(_),onSelect:()=>{s(_),C(!1)},children:[l.jsx(ie.Check,{className:z("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!i||a(i)!==a(_)})}),a(_)]},a(_)))})]})})]})}function Ch({startChapter:t,endChapter:e,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o=!1,chapterCount:i}){const s=w.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),a=u=>{n(u),u>e&&r(u)},c=u=>{r(u),u<t&&n(u)};return l.jsxs(l.Fragment,{children:[l.jsx(gt,{htmlFor:"start-chapters-combobox",children:"Chapters"}),l.jsx(da,{isDisabled:o,onChange:a,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:s,getOptionLabel:u=>u.toString(),value:t},"start chapter"),l.jsx(gt,{htmlFor:"end-chapters-combobox",children:"to"}),l.jsx(da,{isDisabled:o,onChange:c,buttonClassName:"tw-ms-2 tw-w-20",options:s,getOptionLabel:u=>u.toString(),value:e},"end chapter")]})}var Eh=(t=>(t.CURRENT_BOOK="current book",t.CHOOSE_BOOKS="choose books",t))(Eh||{});const lv=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Ml=(t,e)=>t[e]??e;function cv({handleBookSelectionModeChange:t,currentBookName:e,onSelectBooks:n,selectedBookIds:r,chapterCount:o,endChapter:i,handleSelectEndChapter:s,startChapter:a,handleSelectStartChapter:c,localizedStrings:u}){const d=Ml(u,"%webView_bookSelector_currentBook%"),p=Ml(u,"%webView_bookSelector_choose%"),f=Ml(u,"%webView_bookSelector_chooseBooks%"),[h,b]=w.useState("current book"),x=E=>{b(E),t(E)};return l.jsx(Fa,{className:"pr-twp tw-flex",value:h,onValueChange:E=>x(E),children:l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(qi,{value:"current book"}),l.jsx(gt,{className:"tw-ms-1",children:d})]}),l.jsx(gt,{className:"tw-flex tw-items-center",children:e}),l.jsx("div",{className:"tw-flex tw-items-center tw-justify-end",children:l.jsx(Ch,{isDisabled:h==="choose books",handleSelectStartChapter:c,handleSelectEndChapter:s,chapterCount:o,startChapter:a,endChapter:i})})]}),l.jsxs("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(qi,{value:"choose books"}),l.jsx(gt,{className:"tw-ms-1",children:f})]}),l.jsx(gt,{className:"tw-flex tw-items-center",children:r.map(E=>Fe.bookIdToEnglishName(E)).join(", ")}),l.jsx(ve,{disabled:h==="current book",onClick:()=>n(),children:p})]})]})})}const uv=["input","select","textarea","button"],dv=["button","textbox"],kh=({options:t,onFocusChange:e,onOptionSelect:n,onCharacterPress:r})=>{const o=w.useRef(null),[i,s]=w.useState(void 0),[a,c]=w.useState(void 0),u=w.useCallback(h=>{s(h);const b=t.find(E=>E.id===h);b&&(e==null||e(b));const x=document.getElementById(h);x&&(x.scrollIntoView({block:"center"}),x.focus()),o.current&&o.current.setAttribute("aria-activedescendant",h)},[e,t]),d=w.useCallback(h=>{const b=t.find(x=>x.id===h);b&&(c(x=>x===h?void 0:h),n==null||n(b))},[n,t]),p=h=>{if(!h)return!1;const b=h.tagName.toLowerCase();if(h.isContentEditable||uv.includes(b))return!0;const x=h.getAttribute("role");if(x&&dv.includes(x))return!0;const E=h.getAttribute("tabindex");return E!==void 0&&E!=="-1"},f=w.useCallback(h=>{var V;const b=h.target,x=B=>B?document.getElementById(B):void 0,E=x(a),C=x(i);if(!!(E&&b&&E.contains(b)&&b!==E)&&p(b)){if(h.key==="Escape"||h.key==="ArrowLeft"&&!b.isContentEditable){if(a){h.preventDefault(),h.stopPropagation();const B=t.find(F=>F.id===a);B&&u(B.id)}return}if(h.key==="ArrowDown"||h.key==="ArrowUp"){if(!E)return;const B=Array.from(E.querySelectorAll('button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));if(B.length===0)return;const F=B.findIndex(N=>N===b);if(F===-1)return;let Y;h.key==="ArrowDown"?Y=Math.min(F+1,B.length-1):Y=Math.max(F-1,0),Y!==F&&(h.preventDefault(),h.stopPropagation(),(V=B[Y])==null||V.focus());return}return}const $=t.findIndex(B=>B.id===i);let H=$;switch(h.key){case"ArrowDown":H=Math.min($+1,t.length-1),h.preventDefault();break;case"ArrowUp":H=Math.max($-1,0),h.preventDefault();break;case"Home":H=0,h.preventDefault();break;case"End":H=t.length-1,h.preventDefault();break;case" ":case"Enter":i&&d(i),h.preventDefault(),h.stopPropagation();return;case"ArrowRight":{const B=C;if(B){const F=B.querySelector('input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'),Y=B.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'),N=F??Y;if(N){h.preventDefault(),N.focus();return}}break}default:h.key.length===1&&!h.metaKey&&!h.ctrlKey&&!h.altKey&&(p(b)||(r==null||r(h.key),h.preventDefault()));return}const O=t[H];O&&u(O.id)},[t,u,i,a,d,r]);return{listboxRef:o,activeId:i,selectedId:a,handleKeyDown:f,focusOption:u}},Ba=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",t),...e}));Ba.displayName="Card";const Nh=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",t),...e}));Nh.displayName="CardHeader";const Sh=w.forwardRef(({className:t,...e},n)=>l.jsx("h3",{ref:n,className:z("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",t),...e,children:e.children}));Sh.displayName="CardTitle";const Th=w.forwardRef(({className:t,...e},n)=>l.jsx("p",{ref:n,className:z("pr-twp tw-text-sm tw-text-muted-foreground",t),...e}));Th.displayName="CardDescription";const nu=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-p-6 tw-pt-0",t),...e}));nu.displayName="CardContent";const Ah=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",t),...e}));Ah.displayName="CardFooter";const zo=w.forwardRef(({className:t,orientation:e="horizontal",decorative:n=!0,...r},o)=>l.jsx(ih.Root,{ref:o,decorative:n,orientation:e,className:z("pr-twp tw-shrink-0 tw-bg-border",e==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",t),...r}));zo.displayName=ih.Root.displayName;const Dh=Lr.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),Go=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,className:z("pr-twp",Dh({variant:e}),t),...n}));Go.displayName="Badge";const Mh=w.createContext(null);function pv(t,e){return{getTheme:function(){return e??null}}}function Fr(){const t=w.useContext(Mh);return t==null&&function(e,...n){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const i of n)o.append("v",i);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}const Rh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,fv=Rh?w.useLayoutEffect:w.useEffect,$s={tag:g.HISTORY_MERGE_TAG};function hv({initialConfig:t,children:e}){const n=w.useMemo(()=>{const{theme:r,namespace:o,nodes:i,onError:s,editorState:a,html:c}=t,u=pv(null,r),d=g.createEditor({editable:t.editable,html:c,namespace:o,nodes:i,onError:p=>s(p,d),theme:r});return function(p,f){if(f!==null){if(f===void 0)p.update(()=>{const h=g.$getRoot();if(h.isEmpty()){const b=g.$createParagraphNode();h.append(b);const x=Rh?document.activeElement:null;(g.$getSelection()!==null||x!==null&&x===p.getRootElement())&&b.select()}},$s);else if(f!==null)switch(typeof f){case"string":{const h=p.parseEditorState(f);p.setEditorState(h,$s);break}case"object":p.setEditorState(f,$s);break;case"function":p.update(()=>{g.$getRoot().isEmpty()&&f(p)},$s)}}}(d,a),[d,u]},[]);return fv(()=>{const r=t.editable,[o]=n;o.setEditable(r===void 0||r)},[]),l.jsx(Mh.Provider,{value:n,children:e})}const wv=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function gv({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=Fr();return wv(()=>{if(n)return r.registerUpdateListener(({editorState:o,dirtyElements:i,dirtyLeaves:s,prevEditorState:a,tags:c})=>{e&&i.size===0&&s.size===0||t&&c.has(g.HISTORY_MERGE_TAG)||a.isEmpty()||n(o,r,c)})},[r,t,e,n]),null}const ru={ltr:"tw-text-left",rtl:"tw-text-right",heading:{h1:"tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",h2:"tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",h3:"tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",h4:"tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",h5:"tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",h6:"tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"},paragraph:"tw-outline-none",quote:"tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",link:"tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",list:{checklist:"tw-relative",listitem:"tw-mx-8",listitemChecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',listitemUnchecked:'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',nested:{listitem:"tw-list-none before:tw-hidden after:tw-hidden"},ol:"tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",olDepth:["tw-list-outside !tw-list-decimal","tw-list-outside !tw-list-[upper-roman]","tw-list-outside !tw-list-[lower-roman]","tw-list-outside !tw-list-[upper-alpha]","tw-list-outside !tw-list-[lower-alpha]"],ul:"tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",ulDepth:["tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc","tw-list-outside !tw-list-disc"]},hashtag:"tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",text:{bold:"tw-font-bold",code:"tw-bg-gray-100 tw-p-1 tw-rounded-md",italic:"tw-italic",strikethrough:"tw-line-through",subscript:"tw-sub",superscript:"tw-sup",underline:"tw-underline",underlineStrikethrough:"tw-underline tw-line-through"},image:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",inlineImage:"tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",keyword:"tw-text-purple-900 tw-font-bold",code:"EditorTheme__code",codeHighlight:{atrule:"EditorTheme__tokenAttr",attr:"EditorTheme__tokenAttr",boolean:"EditorTheme__tokenProperty",builtin:"EditorTheme__tokenSelector",cdata:"EditorTheme__tokenComment",char:"EditorTheme__tokenSelector",class:"EditorTheme__tokenFunction","class-name":"EditorTheme__tokenFunction",comment:"EditorTheme__tokenComment",constant:"EditorTheme__tokenProperty",deleted:"EditorTheme__tokenProperty",doctype:"EditorTheme__tokenComment",entity:"EditorTheme__tokenOperator",function:"EditorTheme__tokenFunction",important:"EditorTheme__tokenVariable",inserted:"EditorTheme__tokenSelector",keyword:"EditorTheme__tokenAttr",namespace:"EditorTheme__tokenVariable",number:"EditorTheme__tokenProperty",operator:"EditorTheme__tokenOperator",prolog:"EditorTheme__tokenComment",property:"EditorTheme__tokenProperty",punctuation:"EditorTheme__tokenPunctuation",regex:"EditorTheme__tokenVariable",selector:"EditorTheme__tokenSelector",string:"EditorTheme__tokenSelector",symbol:"EditorTheme__tokenProperty",tag:"EditorTheme__tokenProperty",url:"EditorTheme__tokenOperator",variable:"EditorTheme__tokenVariable"},characterLimit:"!tw-bg-destructive/50",table:"EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",tableCell:'EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right"',tableCellActionButton:"EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",tableCellActionButtonContainer:"EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",tableCellEditing:"EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",tableCellHeader:"EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",tableCellPrimarySelected:"EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",tableCellResizer:"EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",tableCellSelected:"EditorTheme__tableCellSelected tw-bg-muted",tableCellSortedIndicator:"EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-bsolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",tableResizeRuler:"EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",tableRowStriping:"EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",tableSelected:"EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",tableSelection:"EditorTheme__tableSelection tw-bg-transparent",layoutItem:"tw-border tw-border-dashed tw-px-4 tw-py-2",layoutContainer:"tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",autocomplete:"tw-text-muted-foreground",blockCursor:"",embedBlock:{base:"tw-user-select-none",focus:"tw-ring-2 tw-ring-primary tw-ring-offset-2"},hr:'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',indent:"[--lexical-indent-base-value:40px]",mark:"",markOverlap:""},ls=ss.Provider,qa=ss.Root,Ua=ss.Trigger,cs=w.forwardRef(({className:t,sideOffset:e=4,...n},r)=>l.jsx(ss.Content,{ref:r,sideOffset:e,className:z("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...n}));cs.displayName=ss.Content.displayName;const ou=[ua.HeadingNode,g.ParagraphNode,g.TextNode,ua.QuoteNode],mv=w.createContext(null),Rl={didCatch:!1,error:null};class bv extends w.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Rl}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){const{error:e}=this.state;if(e!==null){for(var n,r,o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];(n=(r=this.props).onReset)===null||n===void 0||n.call(r,{args:i,reason:"imperative-api"}),this.setState(Rl)}}componentDidCatch(e,n){var r,o;(r=(o=this.props).onError)===null||r===void 0||r.call(o,e,n)}componentDidUpdate(e,n){const{didCatch:r}=this.state,{resetKeys:o}=this.props;if(r&&n.error!==null&&vv(e.resetKeys,o)){var i,s;(i=(s=this.props).onReset)===null||i===void 0||i.call(s,{next:o,prev:e.resetKeys,reason:"keys"}),this.setState(Rl)}}render(){const{children:e,fallbackRender:n,FallbackComponent:r,fallback:o}=this.props,{didCatch:i,error:s}=this.state;let a=e;if(i){const c={error:s,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")a=n(c);else if(r)a=w.createElement(r,c);else if(o!==void 0)a=o;else throw s}return w.createElement(mv.Provider,{value:{didCatch:i,error:s,resetErrorBoundary:this.resetErrorBoundary}},a)}}function vv(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return t.length!==e.length||t.some((n,r)=>!Object.is(n,e[r]))}function xv({children:t,onError:e}){return l.jsx(bv,{fallback:l.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const yv=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function _v(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Cv(){return function(t){const[e]=Fr(),n=w.useMemo(()=>t(e),[e,t]),[r,o]=w.useState(()=>n.initialValueFn()),i=w.useRef(r);return yv(()=>{const{initialValueFn:s,subscribe:a}=n,c=s();return i.current!==c&&(i.current=c,o(c)),a(u=>{i.current=u,o(u)})},[n,t]),r}(_v)}function Ev(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const Oh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,kv=Oh&&"documentMode"in document?document.documentMode:null;!(!Oh||!("InputEvent"in window)||kv)&&"getTargetRanges"in new window.InputEvent("input");function jh(...t){const e=[];for(const n of t)if(n&&typeof n=="string")for(const[r]of n.matchAll(/\S+/g))e.push(r);return e}function Ui(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}function Ih(t,...e){const n=jh(...e);n.length>0&&t.classList.add(...n)}function Nv(t,...e){const n=jh(...e);n.length>0&&t.classList.remove(...n)}function Sd(t){const e=g.$findMatchingParent(t,n=>g.$isElementNode(n)&&!n.isInline());return g.$isElementNode(e)||Ev(4,t.__key),e}function Sv(t,e){const n=[];for(let r=0;r<t.length;r++){const o=e(t[r]);o!==null&&n.push(o)}return n}const Tv=Symbol.for("preact-signals");function Va(){if(Nr>1)return void Nr--;let t,e=!1;for(;Pi!==void 0;){let n=Pi;for(Pi=void 0,pc++;n!==void 0;){const r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Lh(n))try{n.c()}catch(o){e||(t=o,e=!0)}n=r}}if(pc=0,Nr--,e)throw t}function Av(t){if(Nr>0)return t();Nr++;try{return t()}finally{Va()}}let Le,Pi;function Td(t){const e=Le;Le=void 0;try{return t()}finally{Le=e}}let Nr=0,pc=0,ta=0;function Ad(t){if(Le===void 0)return;let e=t.n;return e===void 0||e.t!==Le?(e={i:0,S:t,p:Le.s,n:void 0,t:Le,e:void 0,x:void 0,r:e},Le.s!==void 0&&(Le.s.n=e),Le.s=e,t.n=e,32&Le.f&&t.S(e),e):e.i===-1?(e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=Le.s,e.n=void 0,Le.s.n=e,Le.s=e),e):void 0}function Ut(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Vi(t,e){return new Ut(t,e)}function Lh(t){for(let e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function Dd(t){for(let e=t.s;e!==void 0;e=e.n){const n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function $h(t){let e,n=t.s;for(;n!==void 0;){const r=n.p;n.i===-1?(n.S.U(n),r!==void 0&&(r.n=n.n),n.n!==void 0&&(n.n.p=r)):e=n,n.S.n=n.r,n.r!==void 0&&(n.r=void 0),n=r}t.s=e}function Zr(t,e){Ut.call(this,void 0),this.x=t,this.s=void 0,this.g=ta-1,this.f=4,this.W=e==null?void 0:e.watched,this.Z=e==null?void 0:e.unwatched,this.name=e==null?void 0:e.name}function Dv(t,e){return new Zr(t,e)}function Ph(t){const e=t.u;if(t.u=void 0,typeof e=="function"){Nr++;const n=Le;Le=void 0;try{e()}catch(r){throw t.f&=-2,t.f|=8,iu(t),r}finally{Le=n,Va()}}}function iu(t){for(let e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Ph(t)}function Mv(t){if(Le!==this)throw new Error("Out-of-order effect");$h(this),Le=t,this.f&=-2,8&this.f&&iu(this),Va()}function Io(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e==null?void 0:e.name}function Ar(t,e){const n=new Io(t,e);try{n.c()}catch(o){throw n.d(),o}const r=n.d.bind(n);return r[Symbol.dispose]=r,r}function Ha(t,e={}){const n={};for(const r in t){const o=e[r],i=Vi(o===void 0?t[r]:o);n[r]=i}return n}Ut.prototype.brand=Tv,Ut.prototype.h=function(){return!0},Ut.prototype.S=function(t){const e=this.t;e!==t&&t.e===void 0&&(t.x=e,this.t=t,e!==void 0?e.e=t:Td(()=>{var n;(n=this.W)==null||n.call(this)}))},Ut.prototype.U=function(t){if(this.t!==void 0){const e=t.e,n=t.x;e!==void 0&&(e.x=n,t.e=void 0),n!==void 0&&(n.e=e,t.x=void 0),t===this.t&&(this.t=n,n===void 0&&Td(()=>{var r;(r=this.Z)==null||r.call(this)}))}},Ut.prototype.subscribe=function(t){return Ar(()=>{const e=this.value,n=Le;Le=void 0;try{t(e)}finally{Le=n}},{name:"sub"})},Ut.prototype.valueOf=function(){return this.value},Ut.prototype.toString=function(){return this.value+""},Ut.prototype.toJSON=function(){return this.value},Ut.prototype.peek=function(){const t=Le;Le=void 0;try{return this.value}finally{Le=t}},Object.defineProperty(Ut.prototype,"value",{get(){const t=Ad(this);return t!==void 0&&(t.i=this.i),this.v},set(t){if(t!==this.v){if(pc>100)throw new Error("Cycle detected");this.v=t,this.i++,ta++,Nr++;try{for(let e=this.t;e!==void 0;e=e.x)e.t.N()}finally{Va()}}}}),Zr.prototype=new Ut,Zr.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===ta))return!0;if(this.g=ta,this.f|=1,this.i>0&&!Lh(this))return this.f&=-2,!0;const t=Le;try{Dd(this),Le=this;const e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Le=t,$h(this),this.f&=-2,!0},Zr.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(let e=this.s;e!==void 0;e=e.n)e.S.S(e)}Ut.prototype.S.call(this,t)},Zr.prototype.U=function(t){if(this.t!==void 0&&(Ut.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(let e=this.s;e!==void 0;e=e.n)e.S.U(e)}},Zr.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(let t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(Zr.prototype,"value",{get(){if(1&this.f)throw new Error("Cycle detected");const t=Ad(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}}),Io.prototype.c=function(){const t=this.S();try{if(8&this.f||this.x===void 0)return;const e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},Io.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Ph(this),Dd(this),Nr++;const t=Le;return Le=this,Mv.bind(this,t)},Io.prototype.N=function(){2&this.f||(this.f|=2,this.o=Pi,Pi=this)},Io.prototype.d=function(){this.f|=8,1&this.f||iu(this)},Io.prototype.dispose=function(){this.d()};g.defineExtension({build:(t,e,n)=>Ha(e),config:g.safeCast({defaultSelection:"rootEnd",disabled:!1}),name:"@lexical/extension/AutoFocus",register(t,e,n){const r=n.getOutput();return Ar(()=>r.disabled.value?void 0:t.registerRootListener(o=>{t.focus(()=>{const i=document.activeElement;o===null||i!==null&&o.contains(i)||o.focus({preventScroll:!0})},{defaultSelection:r.defaultSelection.peek()})}))}});function Fh(){const t=g.$getRoot(),e=g.$getSelection(),n=g.$createParagraphNode();t.clear(),t.append(n),e!==null&&n.select(),g.$isRangeSelection(e)&&(e.format=0)}function Rv(t,e=Fh){return t.registerCommand(g.CLEAR_EDITOR_COMMAND,n=>(t.update(e),!0),g.COMMAND_PRIORITY_EDITOR)}g.defineExtension({build:(t,e,n)=>Ha(e),config:g.safeCast({$onClear:Fh}),name:"@lexical/extension/ClearEditor",register(t,e,n){const{$onClear:r}=n.getOutput();return Ar(()=>Rv(t,r.value))}});function Ov(t){return(typeof t.nodes=="function"?t.nodes():t.nodes)||[]}function Bh(t,e){let n;return Vi(t(),{unwatched(){n&&(n(),n=void 0)},watched(){this.value=t(),n=e(this)}})}const fc=g.defineExtension({build:t=>Bh(()=>t.getEditorState(),e=>t.registerUpdateListener(n=>{e.value=n.editorState})),name:"@lexical/extension/EditorState"});function qe(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function qh(t,e){if(t&&e&&!Array.isArray(e)&&typeof t=="object"&&typeof e=="object"){const n=t,r=e;for(const o in r)n[o]=qh(n[o],r[o]);return t}return e}const su=0,hc=1,Uh=2,Ol=3,Ps=4,Oo=5,jl=6,Si=7;function Il(t){return t.id===su}function Vh(t){return t.id===Uh}function jv(t){return function(e){return e.id===hc}(t)||qe(305,String(t.id),String(hc)),Object.assign(t,{id:Uh})}const Iv=new Set;let Lv=class{constructor(e,n){qt(this,"builder");qt(this,"configs");qt(this,"_dependency");qt(this,"_peerNameSet");qt(this,"extension");qt(this,"state");qt(this,"_signal");this.builder=e,this.extension=n,this.configs=new Set,this.state={id:su}}mergeConfigs(){let e=this.extension.config||{};const n=this.extension.mergeConfig?this.extension.mergeConfig.bind(this.extension):g.shallowMergeConfig;for(const r of this.configs)e=n(e,r);return e}init(e){const n=this.state;Vh(n)||qe(306,String(n.id));const r={getDependency:this.getInitDependency.bind(this),getDirectDependentNames:this.getDirectDependentNames.bind(this),getPeer:this.getInitPeer.bind(this),getPeerNameSet:this.getPeerNameSet.bind(this)},o={...r,getDependency:this.getDependency.bind(this),getInitResult:this.getInitResult.bind(this),getPeer:this.getPeer.bind(this)},i=function(a,c,u){return Object.assign(a,{config:c,id:Ol,registerState:u})}(n,this.mergeConfigs(),r);let s;this.state=i,this.extension.init&&(s=this.extension.init(e,i.config,r)),this.state=function(a,c,u){return Object.assign(a,{id:Ps,initResult:c,registerState:u})}(i,s,o)}build(e){const n=this.state;let r;n.id!==Ps&&qe(307,String(n.id),String(Oo)),this.extension.build&&(r=this.extension.build(e,n.config,n.registerState));const o={...n.registerState,getOutput:()=>r,getSignal:this.getSignal.bind(this)};this.state=function(i,s,a){return Object.assign(i,{id:Oo,output:s,registerState:a})}(n,r,o)}register(e,n){this._signal=n;const r=this.state;r.id!==Oo&&qe(308,String(r.id),String(Oo));const o=this.extension.register&&this.extension.register(e,r.config,r.registerState);return this.state=function(i){return Object.assign(i,{id:jl})}(r),()=>{const i=this.state;i.id!==Si&&qe(309,String(r.id),String(Si)),this.state=function(s){return Object.assign(s,{id:Oo})}(i),o&&o()}}afterRegistration(e){const n=this.state;let r;return n.id!==jl&&qe(310,String(n.id),String(jl)),this.extension.afterRegistration&&(r=this.extension.afterRegistration(e,n.config,n.registerState)),this.state=function(o){return Object.assign(o,{id:Si})}(n),r}getSignal(){return this._signal===void 0&&qe(311),this._signal}getInitResult(){this.extension.init===void 0&&qe(312,this.extension.name);const e=this.state;return function(n){return n.id>=Ps}(e)||qe(313,String(e.id),String(Ps)),e.initResult}getInitPeer(e){const n=this.builder.extensionNameMap.get(e);return n?n.getExtensionInitDependency():void 0}getExtensionInitDependency(){const e=this.state;return function(n){return n.id>=Ol}(e)||qe(314,String(e.id),String(Ol)),{config:e.config}}getPeer(e){const n=this.builder.extensionNameMap.get(e);return n?n.getExtensionDependency():void 0}getInitDependency(e){const n=this.builder.getExtensionRep(e);return n===void 0&&qe(315,this.extension.name,e.name),n.getExtensionInitDependency()}getDependency(e){const n=this.builder.getExtensionRep(e);return n===void 0&&qe(315,this.extension.name,e.name),n.getExtensionDependency()}getState(){const e=this.state;return function(n){return n.id>=Si}(e)||qe(316,String(e.id),String(Si)),e}getDirectDependentNames(){return this.builder.incomingEdges.get(this.extension.name)||Iv}getPeerNameSet(){let e=this._peerNameSet;return e||(e=new Set((this.extension.peerDependencies||[]).map(([n])=>n)),this._peerNameSet=e),e}getExtensionDependency(){if(!this._dependency){const e=this.state;(function(n){return n.id>=Oo})(e)||qe(317,this.extension.name),this._dependency={config:e.config,init:e.initResult,output:e.output}}return this._dependency}};const Md={tag:g.HISTORY_MERGE_TAG};function $v(){const t=g.$getRoot();t.isEmpty()&&t.append(g.$createParagraphNode())}const Pv=g.defineExtension({config:g.safeCast({setOptions:Md,updateOptions:Md}),init:({$initialEditorState:t=$v})=>({$initialEditorState:t,initialized:!1}),afterRegistration(t,{updateOptions:e,setOptions:n},r){const o=r.getInitResult();if(!o.initialized){o.initialized=!0;const{$initialEditorState:i}=o;if(g.$isEditorState(i))t.setEditorState(i,n);else if(typeof i=="function")t.update(()=>{i(t)},e);else if(i&&(typeof i=="string"||typeof i=="object")){const s=t.parseEditorState(i);t.setEditorState(s,n)}}return()=>{}},name:"@lexical/extension/InitialState",nodes:[g.RootNode,g.TextNode,g.LineBreakNode,g.TabNode,g.ParagraphNode]}),Rd=Symbol.for("@lexical/extension/LexicalBuilder");function Od(){}function Fv(t){throw t}function Fs(t){return Array.isArray(t)?t:[t]}const Ll="0.38.2+prod.esm";let Bv=class na{constructor(e){qt(this,"roots");qt(this,"extensionNameMap");qt(this,"outgoingConfigEdges");qt(this,"incomingEdges");qt(this,"conflicts");qt(this,"_sortedExtensionReps");qt(this,"PACKAGE_VERSION");this.outgoingConfigEdges=new Map,this.incomingEdges=new Map,this.extensionNameMap=new Map,this.conflicts=new Map,this.PACKAGE_VERSION=Ll,this.roots=e;for(const n of e)this.addExtension(n)}static fromExtensions(e){const n=[Fs(Pv)];for(const r of e)n.push(Fs(r));return new na(n)}static maybeFromEditor(e){const n=e[Rd];return n&&(n.PACKAGE_VERSION!==Ll&&qe(292,n.PACKAGE_VERSION,Ll),n instanceof na||qe(293)),n}static fromEditor(e){const n=na.maybeFromEditor(e);return n===void 0&&qe(294),n}constructEditor(){const{$initialEditorState:e,onError:n,...r}=this.buildCreateEditorArgs(),o=Object.assign(g.createEditor({...r,...n?{onError:i=>{n(i,o)}}:{}}),{[Rd]:this});for(const i of this.sortedExtensionReps())i.build(o);return o}buildEditor(){let e=Od;function n(){try{e()}finally{e=Od}}const r=Object.assign(this.constructEditor(),{dispose:n,[Symbol.dispose]:n});return e=Ui(this.registerEditor(r),()=>r.setRootElement(null)),r}hasExtensionByName(e){return this.extensionNameMap.has(e)}getExtensionRep(e){const n=this.extensionNameMap.get(e.name);if(n)return n.extension!==e&&qe(295,e.name),n}addEdge(e,n,r){const o=this.outgoingConfigEdges.get(e);o?o.set(n,r):this.outgoingConfigEdges.set(e,new Map([[n,r]]));const i=this.incomingEdges.get(n);i?i.add(e):this.incomingEdges.set(n,new Set([e]))}addExtension(e){this._sortedExtensionReps!==void 0&&qe(296);const n=Fs(e),[r]=n;typeof r.name!="string"&&qe(297,typeof r.name);let o=this.extensionNameMap.get(r.name);if(o!==void 0&&o.extension!==r&&qe(298,r.name),!o){o=new Lv(this,r),this.extensionNameMap.set(r.name,o);const i=this.conflicts.get(r.name);typeof i=="string"&&qe(299,r.name,i);for(const s of r.conflictsWith||[])this.extensionNameMap.has(s)&&qe(299,r.name,s),this.conflicts.set(s,r.name);for(const s of r.dependencies||[]){const a=Fs(s);this.addEdge(r.name,a[0].name,a.slice(1)),this.addExtension(a)}for(const[s,a]of r.peerDependencies||[])this.addEdge(r.name,s,a?[a]:[])}}sortedExtensionReps(){if(this._sortedExtensionReps)return this._sortedExtensionReps;const e=[],n=(r,o)=>{let i=r.state;if(Vh(i))return;const s=r.extension.name;var a;Il(i)||qe(300,s,o||"[unknown]"),Il(a=i)||qe(304,String(a.id),String(su)),i=Object.assign(a,{id:hc}),r.state=i;const c=this.outgoingConfigEdges.get(s);if(c)for(const u of c.keys()){const d=this.extensionNameMap.get(u);d&&n(d,s)}i=jv(i),r.state=i,e.push(r)};for(const r of this.extensionNameMap.values())Il(r.state)&&n(r);for(const r of e)for(const[o,i]of this.outgoingConfigEdges.get(r.extension.name)||[])if(i.length>0){const s=this.extensionNameMap.get(o);if(s)for(const a of i)s.configs.add(a)}for(const[r,...o]of this.roots)if(o.length>0){const i=this.extensionNameMap.get(r.name);i===void 0&&qe(301,r.name);for(const s of o)i.configs.add(s)}return this._sortedExtensionReps=e,this._sortedExtensionReps}registerEditor(e){const n=this.sortedExtensionReps(),r=new AbortController,o=[()=>r.abort()],i=r.signal;for(const s of n){const a=s.register(e,i);a&&o.push(a)}for(const s of n){const a=s.afterRegistration(e);a&&o.push(a)}return Ui(...o)}buildCreateEditorArgs(){const e={},n=new Set,r=new Map,o=new Map,i={},s={},a=this.sortedExtensionReps();for(const d of a){const{extension:p}=d;if(p.onError!==void 0&&(e.onError=p.onError),p.disableEvents!==void 0&&(e.disableEvents=p.disableEvents),p.parentEditor!==void 0&&(e.parentEditor=p.parentEditor),p.editable!==void 0&&(e.editable=p.editable),p.namespace!==void 0&&(e.namespace=p.namespace),p.$initialEditorState!==void 0&&(e.$initialEditorState=p.$initialEditorState),p.nodes)for(const f of Ov(p)){if(typeof f!="function"){const h=r.get(f.replace);h&&qe(302,p.name,f.replace.name,h.extension.name),r.set(f.replace,d)}n.add(f)}if(p.html){if(p.html.export)for(const[f,h]of p.html.export.entries())o.set(f,h);p.html.import&&Object.assign(i,p.html.import)}p.theme&&qh(s,p.theme)}Object.keys(s).length>0&&(e.theme=s),n.size&&(e.nodes=[...n]);const c=Object.keys(i).length>0,u=o.size>0;(c||u)&&(e.html={},c&&(e.html.import=i),u&&(e.html.export=o));for(const d of a)d.init(e);return e.onError||(e.onError=Fv),e}};const qv=new Set,jd=g.defineExtension({build(t,e,n){const r=n.getDependency(fc).output,o=Vi({watchedNodeKeys:new Map}),i=Bh(()=>{},()=>Ar(()=>{const s=i.peek(),{watchedNodeKeys:a}=o.value;let c,u=!1;r.value.read(()=>{if(g.$getSelection())for(const[d,p]of a.entries()){if(p.size===0){a.delete(d);continue}const f=g.$getNodeByKey(d),h=f&&f.isSelected()||!1;u=u||h!==(!!s&&s.has(d)),h&&(c=c||new Set,c.add(d))}}),!u&&c&&s&&c.size===s.size||(i.value=c)}));return{watchNodeKey:function(s){const a=Dv(()=>(i.value||qv).has(s)),{watchedNodeKeys:c}=o.peek();let u=c.get(s);const d=u!==void 0;return u=u||new Set,u.add(a),d||(c.set(s,u),o.value={watchedNodeKeys:c}),a}}},dependencies:[fc],name:"@lexical/extension/NodeSelection"});g.createCommand("INSERT_HORIZONTAL_RULE_COMMAND");let pa=class Hh extends g.DecoratorNode{static getType(){return"horizontalrule"}static clone(e){return new Hh(e.__key)}static importJSON(e){return zh().updateFromJSON(e)}static importDOM(){return{hr:()=>({conversion:Uv,priority:0})}}exportDOM(){return{element:document.createElement("hr")}}createDOM(e){const n=document.createElement("hr");return Ih(n,e.theme.hr),n}getTextContent(){return`
`}isInline(){return!1}updateDOM(){return!1}};function Uv(){return{node:zh()}}function zh(){return g.$create(pa)}function Vv(t){return t instanceof pa}g.defineExtension({dependencies:[fc,jd],name:"@lexical/extension/HorizontalRule",nodes:[pa],register(t,e,n){const{watchNodeKey:r}=n.getDependency(jd).output,o=Vi({nodeSelections:new Map}),i=t._config.theme.hrSelected??"selected";return Ui(t.registerCommand(g.CLICK_COMMAND,s=>{if(g.isDOMNode(s.target)){const a=g.$getNodeFromDOMNode(s.target);if(Vv(a))return function(c,u=!1){const d=g.$getSelection(),p=c.isSelected(),f=c.getKey();let h;u&&g.$isNodeSelection(d)?h=d:(h=g.$createNodeSelection(),g.$setSelection(h)),p?h.delete(f):h.add(f)}(a,s.shiftKey),!0}return!1},g.COMMAND_PRIORITY_LOW),t.registerMutationListener(pa,(s,a)=>{Av(()=>{let c=!1;const{nodeSelections:u}=o.peek();for(const[d,p]of s.entries())if(p==="destroyed")u.delete(d),c=!0;else{const f=u.get(d),h=t.getElementByKey(d);f?f.domNode.value=h:(c=!0,u.set(d,{domNode:Vi(h),selectedSignal:r(d)}))}c&&(o.value={nodeSelections:u})})}),Ar(()=>{const s=[];for(const{domNode:a,selectedSignal:c}of o.value.nodeSelections.values())s.push(Ar(()=>{const u=a.value;u&&(c.value?Ih(u,i):Nv(u,i))}));return Ui(...s)}))}});function Hv(t,e){return Ui(t.registerCommand(g.KEY_TAB_COMMAND,n=>{const r=g.$getSelection();if(!g.$isRangeSelection(r))return!1;n.preventDefault();const o=function(i){const s=i.getNodes();if(Sv(s,f=>g.$isBlockElementNode(f)&&f.canIndent()?f:null).length>0)return!0;const a=i.anchor,c=i.focus,u=c.isBefore(a)?c:a,d=u.getNode(),p=Sd(d);if(p.canIndent()){const f=p.getKey();let h=g.$createRangeSelection();if(h.anchor.set(f,0,"element"),h.focus.set(f,0,"element"),h=g.$normalizeSelection__EXPERIMENTAL(h),h.anchor.is(u))return!0}return!1}(r)?n.shiftKey?g.OUTDENT_CONTENT_COMMAND:g.INDENT_CONTENT_COMMAND:g.INSERT_TAB_COMMAND;return t.dispatchCommand(o,void 0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INDENT_CONTENT_COMMAND,()=>{const n=typeof e=="number"?e:e?e.peek():null;if(n==null)return!1;const r=g.$getSelection();if(!g.$isRangeSelection(r))return!1;const o=r.getNodes().map(i=>Sd(i).getIndent());return Math.max(...o)+1>=n},g.COMMAND_PRIORITY_CRITICAL))}g.defineExtension({build:(t,e,n)=>Ha(e),config:g.safeCast({disabled:!1,maxIndent:null}),name:"@lexical/extension/TabIndentation",register(t,e,n){const{disabled:r,maxIndent:o}=n.getOutput();return Ar(()=>{if(!r.value)return Hv(t,o)})}});const zv=g.defineExtension({name:"@lexical/react/ReactProvider"});function Gv(){return g.$getRoot().getTextContent()}function Kv(t,e=!0){if(t)return!1;let n=Gv();return e&&(n=n.trim()),n===""}function Yv(t){if(!Kv(t,!1))return!1;const e=g.$getRoot().getChildren(),n=e.length;if(n>1)return!1;for(let r=0;r<n;r++){const o=e[r];if(g.$isDecoratorNode(o))return!1;if(g.$isElementNode(o)){if(!g.$isParagraphNode(o)||o.__indent!==0)return!1;const i=o.getChildren(),s=i.length;for(let a=0;a<s;a++){const c=i[r];if(!g.$isTextNode(c))return!1}}}return!0}function Gh(t){return()=>Yv(t)}const Kh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Wv=Kh&&"documentMode"in document?document.documentMode:null;!(!Kh||!("InputEvent"in window)||Wv)&&"getTargetRanges"in new window.InputEvent("input");function au(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}function Yh(t){const e=window.location.origin,n=r=>{if(r.origin!==e)return;const o=t.getRootElement();if(document.activeElement!==o)return;const i=r.data;if(typeof i=="string"){let s;try{s=JSON.parse(i)}catch{return}if(s&&s.protocol==="nuanria_messaging"&&s.type==="request"){const a=s.payload;if(a&&a.functionId==="makeChanges"){const c=a.args;if(c){const[u,d,p,f,h]=c;t.update(()=>{const b=g.$getSelection();if(g.$isRangeSelection(b)){const x=b.anchor;let E=x.getNode(),C=0,_=0;if(g.$isTextNode(E)&&u>=0&&d>=0&&(C=u,_=u+d,b.setTextNodeRange(E,C,E,_)),C===_&&p===""||(b.insertRawText(p),E=x.getNode()),g.$isTextNode(E)){C=f,_=f+h;const D=E.getTextContentSize();C=C>D?D:C,_=_>D?D:_,b.setTextNodeRange(E,C,E,_)}r.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}g.defineExtension({build:(t,e,n)=>Ha(e),config:g.safeCast({disabled:typeof window>"u"}),name:"@lexical/dragon",register:(t,e,n)=>Ar(()=>n.getOutput().disabled.value?void 0:Yh(t))});function Jv(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}const lu=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function Xv({editor:t,ErrorBoundary:e}){return function(n,r){const[o,i]=w.useState(()=>n.getDecorators());return lu(()=>n.registerDecoratorListener(s=>{Xt.flushSync(()=>{i(s)})}),[n]),w.useEffect(()=>{i(n.getDecorators())},[n]),w.useMemo(()=>{const s=[],a=Object.keys(o);for(let c=0;c<a.length;c++){const u=a[c],d=l.jsx(r,{onError:f=>n._onError(f),children:l.jsx(w.Suspense,{fallback:null,children:o[u]})}),p=n.getElementByKey(u);p!==null&&s.push(Xt.createPortal(d,p,u))}return s},[r,o,n])}(t,e)}function Qv({editor:t,ErrorBoundary:e}){return function(n){const r=Bv.maybeFromEditor(n);if(r&&r.hasExtensionByName(zv.name)){for(const o of["@lexical/plain-text","@lexical/rich-text"])r.hasExtensionByName(o)&&Jv(320,o);return!0}return!1}(t)?null:l.jsx(Xv,{editor:t,ErrorBoundary:e})}function Id(t){return t.getEditorState().read(Gh(t.isComposing()))}function Zv({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=Fr();return function(o){lu(()=>au(ua.registerRichText(o),Yh(o)),[o])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(ex,{content:e}),l.jsx(Qv,{editor:r,ErrorBoundary:n})]})}function ex({content:t}){const[e]=Fr(),n=function(o){const[i,s]=w.useState(()=>Id(o));return lu(()=>{function a(){const c=Id(o);s(c)}return a(),au(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),i}(e),r=Cv();return n?typeof t=="function"?t(r):t:null}function tx({defaultSelection:t}){const[e]=Fr();return w.useEffect(()=>{e.focus(()=>{const n=document.activeElement,r=e.getRootElement();r===null||n!==null&&r.contains(n)||r.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const Wh=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function nx({editor:t,ariaActiveDescendant:e,ariaAutoComplete:n,ariaControls:r,ariaDescribedBy:o,ariaErrorMessage:i,ariaExpanded:s,ariaInvalid:a,ariaLabel:c,ariaLabelledBy:u,ariaMultiline:d,ariaOwns:p,ariaRequired:f,autoCapitalize:h,className:b,id:x,role:E="textbox",spellCheck:C=!0,style:_,tabIndex:D,"data-testid":$,...H},O){const[V,B]=w.useState(t.isEditable()),F=w.useCallback(N=>{N&&N.ownerDocument&&N.ownerDocument.defaultView?t.setRootElement(N):t.setRootElement(null)},[t]),Y=w.useMemo(()=>function(...N){return M=>{for(const S of N)typeof S=="function"?S(M):S!=null&&(S.current=M)}}(O,F),[F,O]);return Wh(()=>(B(t.isEditable()),t.registerEditableListener(N=>{B(N)})),[t]),l.jsx("div",{"aria-activedescendant":V?e:void 0,"aria-autocomplete":V?n:"none","aria-controls":V?r:void 0,"aria-describedby":o,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":V&&E==="combobox"?!!s:void 0,...a!=null?{"aria-invalid":a}:{},"aria-label":c,"aria-labelledby":u,"aria-multiline":d,"aria-owns":V?p:void 0,"aria-readonly":!V||void 0,"aria-required":f,autoCapitalize:h,className:b,contentEditable:V,"data-testid":$,id:x,ref:Y,role:E,spellCheck:C,style:_,tabIndex:D,...H})}const rx=w.forwardRef(nx);function Ld(t){return t.getEditorState().read(Gh(t.isComposing()))}const ox=w.forwardRef(ix);function ix(t,e){const{placeholder:n,...r}=t,[o]=Fr();return l.jsxs(l.Fragment,{children:[l.jsx(rx,{editor:o,...r,ref:e}),n!=null&&l.jsx(sx,{editor:o,content:n})]})}function sx({content:t,editor:e}){const n=function(s){const[a,c]=w.useState(()=>Ld(s));return Wh(()=>{function u(){const d=Ld(s);c(d)}return u(),au(s.registerUpdateListener(()=>{u()}),s.registerEditableListener(()=>{u()}))},[s]),a}(e),[r,o]=w.useState(e.isEditable());if(w.useLayoutEffect(()=>(o(e.isEditable()),e.registerEditableListener(s=>{o(s)})),[e]),!n)return null;let i=null;return typeof t=="function"?i=t(r):t!==null&&(i=t),i===null?null:l.jsx("div",{"aria-hidden":!0,children:i})}function ax({placeholder:t,className:e,placeholderClassName:n}){return l.jsx(ox,{className:e??"ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none","aria-placeholder":t,placeholder:l.jsx("div",{className:n??"tw-pointer-events-none tw-absolute tw-left-0 tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",children:t})})}function lx(){throw new Error("ToolbarContext not initialized")}const Jh=w.createContext({activeEditor:lx(),$updateToolbar:()=>{},blockType:"paragraph",setBlockType:()=>{},showModal:()=>{}});function cx({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o,children:i}){const s=w.useMemo(()=>({activeEditor:t,$updateToolbar:e,blockType:n,setBlockType:r,showModal:o}),[t,e,n,r,o]);return l.jsx(Jh.Provider,{value:s,children:i})}function Xh(){return w.useContext(Jh)}function ux(){const[t,e]=w.useState(void 0),n=w.useCallback(()=>{e(void 0)},[]),r=w.useMemo(()=>{if(t===void 0)return;const{title:i,content:s}=t;return l.jsx($0,{open:!0,onOpenChange:n,children:l.jsxs(lh,{children:[l.jsx(ch,{children:l.jsx(uh,{children:i})}),s]})})},[t,n]),o=w.useCallback((i,s,a=!1)=>{e({closeOnClickOutside:a,content:s(n),title:i})},[n]);return[r,o]}function dx({children:t}){const[e]=Fr(),[n,r]=w.useState(e),[o,i]=w.useState("paragraph"),[s,a]=ux(),c=()=>{};return w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,(u,d)=>(r(d),!1),g.COMMAND_PRIORITY_CRITICAL),[n]),l.jsxs(cx,{activeEditor:n,$updateToolbar:c,blockType:o,setBlockType:i,showModal:a,children:[s,t({blockType:o})]})}function px(t){const[e]=Fr(),{activeEditor:n}=Xh();w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const r=g.$getSelection();return r&&t(r),!1},g.COMMAND_PRIORITY_CRITICAL),[e,t]),w.useEffect(()=>{n.getEditorState().read(()=>{const r=g.$getSelection();r&&t(r)})},[n,t])}const Qh=Lr.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),fx=w.forwardRef(({className:t,variant:e,size:n,...r},o)=>l.jsx(sh.Root,{ref:o,className:z(Qh({variant:e,size:n,className:t})),...r}));fx.displayName=sh.Root.displayName;const Zh=w.createContext({size:"default",variant:"default"}),za=w.forwardRef(({className:t,variant:e,size:n,children:r,...o},i)=>{const s=Et();return l.jsx(Pa.Root,{ref:i,className:z("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",t),...o,dir:s,children:l.jsx(Zh.Provider,{value:{variant:e,size:n},children:r})})});za.displayName=Pa.Root.displayName;const Bo=w.forwardRef(({className:t,children:e,variant:n,size:r,...o},i)=>{const s=w.useContext(Zh);return l.jsx(Pa.Item,{ref:i,className:z(Qh({variant:s.variant||n,size:s.size||r}),t),...o,children:e})});Bo.displayName=Pa.Item.displayName;const $d=[{format:"bold",icon:ie.BoldIcon,label:"Bold"},{format:"italic",icon:ie.ItalicIcon,label:"Italic"},{format:"underline",icon:ie.UnderlineIcon,label:"Underline"},{format:"strikethrough",icon:ie.StrikethroughIcon,label:"Strikethrough"}];function hx(){const{activeEditor:t}=Xh(),[e,n]=w.useState([]),r=w.useCallback(o=>{if(g.$isRangeSelection(o)||th.$isTableSelection(o)){const i=[];$d.forEach(({format:s})=>{o.hasFormat(s)&&i.push(s)}),n(s=>s.length!==i.length||!i.every(a=>s.includes(a))?i:s)}},[]);return px(r),l.jsx(za,{type:"multiple",value:e,onValueChange:n,variant:"outline",size:"sm",children:$d.map(({format:o,icon:i,label:s})=>l.jsx(Bo,{value:o,"aria-label":s,onClick:()=>{t.dispatchCommand(g.FORMAT_TEXT_COMMAND,o)},children:l.jsx(i,{className:"tw-h-4 tw-w-4"})},o))})}function wx({placeholder:t="Start typing ...",autoFocus:e=!1}){const[,n]=w.useState(void 0),r=o=>{o!==void 0&&n(o)};return l.jsxs("div",{className:"tw-relative",children:[l.jsx(dx,{children:()=>l.jsx("div",{className:"tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1",children:l.jsx(hx,{})})}),l.jsxs("div",{className:"tw-relative",children:[l.jsx(Zv,{contentEditable:l.jsx("div",{ref:r,children:l.jsx(ax,{placeholder:t})}),ErrorBoundary:xv}),e&&l.jsx(tx,{defaultSelection:"rootStart"})]})]})}const gx={namespace:"Editor",theme:ru,nodes:ou,onError:t=>{console.error(t)}};function Pd({editorState:t,editorSerializedState:e,onChange:n,onSerializedChange:r,placeholder:o="Start typing ...",autoFocus:i=!1}){return l.jsx("div",{className:"pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",children:l.jsx(hv,{initialConfig:{...gx,...t?{editorState:t}:{},...e?{editorState:JSON.stringify(e)}:{}},children:l.jsxs(ls,{children:[l.jsx(wx,{placeholder:o,autoFocus:i}),l.jsx(gv,{ignoreSelectionChange:!0,onChange:s=>{n==null||n(s),r==null||r(s.toJSON())}})]})})})}function mx(t,e,n="self"){const r=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&r!==null){const[o,i]=r,s=t.isBackward(),a=o.getNode(),c=i.getNode(),u=e.is(a),d=e.is(c);if(u||d){const[p,f]=g.$getCharacterOffsets(t),h=a.is(c),b=e.is(s?c:a),x=e.is(s?a:c);let E,C=0;h?(C=p>f?f:p,E=p>f?p:f):b?(C=s?f:p,E=void 0):x&&(C=0,E=s?p:f);const _=e.__text.slice(C,E);_!==e.__text&&(n==="clone"&&(e=g.$cloneWithPropertiesEphemeral(e)),e.__text=_)}}return e}function bx(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),r=g.$getRoot().getChildren();for(let o=0;o<r.length;o++)ew(t,r[o],n,e);return n.innerHTML}function ew(t,e,n,r=null){let o=r===null||e.isSelected(r);const i=g.$isElementNode(e)&&e.excludeFromCopy("html");let s=e;r!==null&&g.$isTextNode(e)&&(s=mx(r,e,"clone"));const a=g.$isElementNode(s)?s.getChildren():[],c=g.getRegisteredNode(t,s.getType());let u;u=c&&c.exportDOM!==void 0?c.exportDOM(t,s):s.exportDOM(t);const{element:d,after:p}=u;if(!d)return!1;const f=document.createDocumentFragment();for(let h=0;h<a.length;h++){const b=a[h],x=ew(t,b,f,r);!o&&g.$isElementNode(e)&&x&&e.extractWithChild(b,r,"html")&&(o=!0)}if(o&&!i){if((g.isHTMLElement(d)||g.isDocumentFragment(d))&&d.append(f),n.append(d),p){const h=p.call(s,d);h&&(g.isDocumentFragment(d)?d.replaceChildren(h):d.replaceWith(h))}}else n.append(f);return o}function Bs(t){if(!t)return!1;const e=g.createEditor({namespace:"EditorUtils",theme:ru,nodes:ou,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r=!1;return e.getEditorState().read(()=>{r=g.$getRoot().getTextContent().trim().length>0}),r}function vx(t){const e=g.createEditor({namespace:"EditorUtils",theme:ru,nodes:ou,onError:o=>{console.error(o)}}),n=e.parseEditorState(JSON.stringify(t));e.setEditorState(n);let r="";return e.getEditorState().read(()=>{r=bx(e)}),r=r.replace(/\s+class="[^"]*"/g,"").replace(/\s+style="[^"]*"/g,"").replace(/<span>(.*?)<\/span>/g,"$1").replace(/<b><strong>(.*?)<\/strong><\/b>/g,"<b>$1</b>").replace(/<i><em>(.*?)<\/em><\/i>/g,"<i>$1</i>").replace(/<u><span>(.*?)<\/span><\/u>/g,"<u>$1</u>").replace(/<s><span>(.*?)<\/span><\/s>/g,"<s>$1</s>"),r}function xx(t){return t.replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi,"<s>$1</s>").replace(/<color[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/color>/gi,(e,n,r)=>`<span style="color: ${{red:"#ef4444",green:"#22c55e",blue:"#3b82f6"}[n.toLowerCase()]||n}">${r}</span>`).replace(/<language[^>]*>([\s\S]*?)<\/language>/gi,"$1")}function yx(t){const e=t.replace(/[#*_~`[\]()]/g,"").replace(/<[^>]*>/g,"").trim(),n=150;if(e.length<=n)return t;let r=n;return[". ","! ","? ",`
`," "].find(s=>{const a=e.lastIndexOf(s,n);return a>n*.7?(r=a+s.length,!0):!1})||(r=n),`${t.slice(0,r).trim()}...`}function tw({id:t,markdown:e,className:n,anchorTarget:r,truncate:o}){const i=w.useMemo(()=>xx(e),[e]),s=w.useMemo(()=>o?yx(i):i,[i,o]),a=w.useMemo(()=>({overrides:{a:{props:{target:r}}}}),[r]);return l.jsx("div",{id:t,className:z("pr-twp",n),children:l.jsx(_0,{options:a,children:s})})}const cu=w.forwardRef(({className:t,...e},n)=>l.jsx(ai.Root,{ref:n,className:z("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",t),...e}));cu.displayName=ai.Root.displayName;const nw=w.forwardRef(({className:t,...e},n)=>l.jsx(ai.Image,{ref:n,className:z("pr-twp tw-aspect-square tw-h-full tw-w-full",t),...e}));nw.displayName=ai.Image.displayName;const uu=w.forwardRef(({className:t,...e},n)=>l.jsx(ai.Fallback,{ref:n,className:z("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",t),...e}));uu.displayName=ai.Fallback.displayName;function Fd({comment:t,isReply:e=!1,localizedStrings:n,isThreadExpanded:r=!1,handleClickCommentText:o,handleMouseDownCommentText:i}){const s=w.useMemo(()=>{const u=new Date(t.date),d=ne.formatRelativeDate(u,n["%comment_date_today%"],n["%comment_date_yesterday%"]),p=u.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"});return`${d} at ${p}`},[t.date,n]),a=w.useMemo(()=>!e&&t.assignedUser?ne.formatReplacementString(n["%comment_assigned_to%"],{assignedUser:t.assignedUser}):t.user,[e,t.assignedUser,t.user,n]),c=w.useMemo(()=>t.user.split(" ").map(u=>u[0]).join("").toUpperCase().slice(0,2),[t.user]);return l.jsx("div",{className:z("tw-space-y-3",e&&"tw-text-sm"),children:l.jsxs("div",{className:"tw-flex tw-flex-row tw-gap-3",children:[l.jsx(cu,{className:z("tw-h-8 tw-w-8"),children:l.jsx(uu,{className:"tw-text-xs tw-font-medium",children:c})}),l.jsxs("div",{className:"tw-flex tw-flex-1 tw-flex-col tw-gap-2",children:[l.jsxs("div",{className:"tw-flex tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2",children:[l.jsx("p",{className:"tw-text-sm tw-font-medium",onClick:o,onMouseDown:i,children:a}),l.jsx("p",{className:"tw-text-xs tw-font-normal tw-text-muted-foreground",onClick:o,onMouseDown:i,children:s})]}),l.jsx("div",{className:"tw-flex tw-flex-row tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",onClick:o,onMouseDown:i,children:l.jsx(tw,{className:"tw-text-sm tw-font-normal tw-text-primary",markdown:t.contents,truncate:!r})})]})]})})}const Bd={root:{children:[{children:[{detail:0,format:0,mode:"normal",style:"",text:"",type:"text",version:1}],direction:"ltr",format:"",indent:0,type:"paragraph",version:1}],direction:"ltr",format:"",indent:0,type:"root",version:1}};function _x({comments:t,localizedStrings:e,isSelected:n=!1,verseRef:r,assignedUser:o,handleSelectThread:i,threadId:s,threadStatus:a,handleResolveCommentThread:c,handleAddComment:u}){const[d,p]=w.useState(Bd),[f,h]=w.useState(!1),[b,x]=w.useState(!1),[E,C]=w.useState(!1),[_,D]=w.useState(0),$=w.useMemo(()=>t[0],[t]),H=w.useRef(null);w.useEffect(()=>{const L=H.current;if(!L)return;const J=()=>{x(L.scrollWidth>L.clientWidth)};return J(),window.addEventListener("resize",J),()=>window.removeEventListener("resize",J)},[$.verse]),w.useEffect(()=>{C(!1)},[n]);const O=w.useMemo(()=>({singleReply:e["%comment_thread_single_reply%"],multipleReplies:e["%comment_thread_multiple_replies%"]}),[e]),V=w.useMemo(()=>o?ne.formatReplacementString(e["%comment_assigned_to%"],{assignedUser:o}):void 0,[o,e]),B=w.useMemo(()=>t.slice(1),[t]),F=w.useMemo(()=>B.length??0,[B.length]),Y=w.useMemo(()=>F>0,[F]),N=w.useMemo(()=>!n||E||F<=2?B:B.slice(-2),[B,F,n,E]),M=w.useMemo(()=>!n||E||F<=2?0:F-2,[F,n,E]),S=w.useMemo(()=>F===1?O.singleReply:ne.formatReplacementString(O.multipleReplies,{count:F}),[F,O.singleReply,O.multipleReplies]),I=w.useMemo(()=>M===1?O.singleReply:ne.formatReplacementString(O.multipleReplies,{count:M}),[M,O.singleReply,O.multipleReplies]),T=w.useCallback(L=>{if(n){const J=window.getSelection();J&&J.toString().length>0&&L.stopPropagation()}},[n]),A=w.useCallback(L=>{n&&L.stopPropagation()},[n]),P=w.useCallback(()=>{u(s,vx(d))&&(p(Bd),D(J=>J+1))},[d,u,s]);return l.jsx(Ba,{role:"option","aria-selected":n,id:s,className:z("tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",{"tw-cursor-pointer tw-bg-slate-50 hover:tw-shadow-md":!n},{"tw-bg-background":n}),onClick:()=>{i(s)},tabIndex:-1,children:l.jsxs(nu,{className:"tw-flex tw-flex-col tw-gap-2 tw-p-0",children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4",children:[V&&l.jsx(Go,{onClick:T,onMouseDown:A,className:"tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input",children:V}),l.jsxs("div",{className:"tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2",children:[l.jsxs("p",{ref:H,className:z("tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",{"tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words":f},{"tw-whitespace-nowrap":!f}),onClick:T,onMouseDown:A,children:[r," ",$.verse]}),b&&l.jsx(ve,{variant:"ghost",size:"icon",onClick:L=>{L.stopPropagation(),h(!f)},className:"tw-text-muted-foreground tw-transition hover:tw-text-foreground","aria-label":f?"Collapse text":"Expand text",children:f?l.jsx(ie.ChevronUp,{}):l.jsx(ie.ChevronDown,{})})]}),l.jsxs("div",{className:"tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3",children:[l.jsx("div",{className:"tw-flex-1",children:l.jsx(Fd,{comment:$,localizedStrings:e,isThreadExpanded:n,handleClickCommentText:T,handleMouseDownCommentText:A})}),n&&a!=="Resolved"&&l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-shrink-0",onClick:L=>{L.stopPropagation(),c(s)},children:l.jsx(ie.Check,{})})]})]}),l.jsxs(l.Fragment,{children:[Y&&!n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-5",children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(zo,{})}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:S})]}),!n&&Bs(d)&&l.jsx(Pd,{editorSerializedState:d,onSerializedChange:L=>p(L),placeholder:e["%comment_replyOrAssign%"]}),n&&l.jsxs(l.Fragment,{children:[M>0&&l.jsxs("div",{className:"tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",onClick:L=>{L.stopPropagation(),C(!0)},role:"button",tabIndex:0,onKeyDown:L=>{(L.key==="Enter"||L.key===" ")&&(L.preventDefault(),L.stopPropagation(),C(!0))},children:[l.jsx("div",{className:"tw-w-8",children:l.jsx(zo,{})}),l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:I}),E?l.jsx(ie.ChevronUp,{}):l.jsx(ie.ChevronDown,{})]})]}),N.map(L=>l.jsx("div",{children:l.jsx(Fd,{comment:L,localizedStrings:e,isReply:!0,isThreadExpanded:n,handleClickCommentText:T,handleMouseDownCommentText:A})},L.id)),l.jsxs("div",{role:"textbox",tabIndex:-1,className:"tw-w-full tw-space-y-2",onClick:L=>L.stopPropagation(),onKeyDownCapture:L=>{L.key==="Enter"&&L.shiftKey&&(L.preventDefault(),L.stopPropagation(),Bs(d)&&P())},onKeyDown:L=>{(L.key==="Enter"||L.key===" ")&&L.stopPropagation()},children:[l.jsx(Pd,{editorSerializedState:d,onSerializedChange:L=>p(L),placeholder:e["%comment_replyOrAssign%"],autoFocus:!0},_),l.jsxs("div",{className:"tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2",children:[l.jsx(ve,{size:"icon",variant:"outline",className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Bs(d),children:l.jsx(ie.AtSign,{})}),l.jsx(ve,{size:"icon",onClick:P,className:"tw-flex tw-items-center tw-justify-center tw-rounded-md",disabled:!Bs(d),children:l.jsx(ie.ArrowUp,{})})]})]})]})]})]})})}function Cx({className:t="",threads:e,localizedStrings:n,handleAddComment:r,handleResolveCommentThread:o}){const[i,s]=w.useState(),a=e.map(b=>({id:`thread-${b.id}`})),c=w.useCallback(b=>{s(b.id)},[]),u=w.useCallback(b=>{s(b)},[]),{listboxRef:d,activeId:p,handleKeyDown:f}=kh({options:a,onOptionSelect:c}),h=w.useCallback(b=>{b.key==="Escape"?(s(void 0),b.preventDefault(),b.stopPropagation()):f(b)},[f]);return w.useEffect(()=>{if(!i)return;const b=document.getElementById(i);if(!b)return;const x=requestAnimationFrame(()=>{const E=requestAnimationFrame(()=>{const C=b.querySelector('[contenteditable="true"]'),_=b.querySelector("textarea:not([disabled]), select:not([disabled]), button:not([disabled])"),D=C??_;if(D&&(D.focus(),C&&D===C)){const $=window.getSelection(),H=document.createRange();H.selectNodeContents(C),H.collapse(!1),$==null||$.removeAllRanges(),$==null||$.addRange(H)}});return()=>cancelAnimationFrame(E)});return()=>cancelAnimationFrame(x)},[i]),l.jsx("div",{id:"comment-thread-list",role:"listbox",tabIndex:0,ref:d,"aria-activedescendant":p??void 0,"aria-label":"Comments",className:z("tw-flex tw-w-full tw-max-w-screen-md tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),onKeyDown:h,children:e.map(b=>l.jsx("div",{children:l.jsx(_x,{comments:b.comments,localizedStrings:n,verseRef:b.verseRef,handleSelectThread:u,threadId:`thread-${b.id}`,isSelected:i===`thread-${b.id}`,assignedUser:b.assignedUser,threadStatus:b.status,handleAddComment:r,handleResolveCommentThread:o})},`thread-${b.id}`))})}const du=w.createContext(void 0);function $n(){const t=w.useContext(du);if(!t)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return t}const fr=Lr.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Ga=Ye.Trigger,pu=Ye.Group,rw=Ye.Portal,ow=Ye.Sub,iw=Ye.RadioGroup;function us({variant:t="default",...e}){const n=w.useMemo(()=>({variant:t}),[t]);return l.jsx(du.Provider,{value:n,children:l.jsx(Ye.Root,{...e})})}const fu=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const i=$n();return l.jsxs(Ye.SubTrigger,{ref:o,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",e&&"tw-pl-8",t,fr({variant:i.variant})),...r,children:[n,l.jsx(ie.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});fu.displayName=Ye.SubTrigger.displayName;const hu=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.SubContent,{ref:n,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));hu.displayName=Ye.SubContent.displayName;const ui=w.forwardRef(({className:t,sideOffset:e=4,children:n,...r},o)=>{const i=Et();return l.jsx(Ye.Portal,{children:l.jsx(Ye.Content,{ref:o,sideOffset:e,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...r,children:l.jsx("div",{dir:i,children:n})})})});ui.displayName=Ye.Content.displayName;const wu=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=Et(),i=$n();return l.jsx(Ye.Item,{ref:r,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t,fr({variant:i.variant})),...n,dir:o})});wu.displayName=Ye.Item.displayName;const Ka=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const i=$n();return l.jsxs(Ye.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,fr({variant:i.variant})),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(ie.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});Ka.displayName=Ye.CheckboxItem.displayName;const gu=w.forwardRef(({className:t,children:e,...n},r)=>{const o=$n();return l.jsxs(Ye.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t,fr({variant:o.variant})),...n,children:[l.jsx("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:l.jsx(Ye.ItemIndicator,{children:l.jsx(ie.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});gu.displayName=Ye.RadioItem.displayName;const Ya=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Ye.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));Ya.displayName=Ye.Label.displayName;const ds=w.forwardRef(({className:t,...e},n)=>l.jsx(Ye.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));ds.displayName=Ye.Separator.displayName;function sw({className:t,...e}){return l.jsx("span",{className:z("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",t),...e})}sw.displayName="DropdownMenuShortcut";function Ex({table:t}){return l.jsxs(us,{children:[l.jsx(nh.DropdownMenuTrigger,{asChild:!0,children:l.jsxs(ve,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[l.jsx(ie.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"}),"View"]})}),l.jsxs(ui,{align:"end",className:"tw-w-[150px]",children:[l.jsx(Ya,{children:"Toggle columns"}),l.jsx(ds,{}),t.getAllColumns().filter(e=>e.getCanHide()).map(e=>l.jsx(Ka,{className:"tw-capitalize",checked:e.getIsVisible(),onCheckedChange:n=>e.toggleVisibility(!!n),children:e.id},e.id))]})]})}const so=it.Root,aw=it.Group,ao=it.Value,lw=Lr.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),Dr=w.forwardRef(({className:t,children:e,size:n,...r},o)=>{const i=Et();return l.jsxs(it.Trigger,{className:z(lw({size:n,className:t})),ref:o,...r,dir:i,children:[e,l.jsx(it.Icon,{asChild:!0,children:l.jsx(ie.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"})})]})});Dr.displayName=it.Trigger.displayName;const mu=w.forwardRef(({className:t,...e},n)=>l.jsx(it.ScrollUpButton,{ref:n,className:z("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(ie.ChevronUp,{className:"tw-h-4 tw-w-4"})}));mu.displayName=it.ScrollUpButton.displayName;const bu=w.forwardRef(({className:t,...e},n)=>l.jsx(it.ScrollDownButton,{ref:n,className:z("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",t),...e,children:l.jsx(ie.ChevronDown,{className:"tw-h-4 tw-w-4"})}));bu.displayName=it.ScrollDownButton.displayName;const Mr=w.forwardRef(({className:t,children:e,position:n="popper",...r},o)=>{const i=Et();return l.jsx(it.Portal,{children:l.jsxs(it.Content,{ref:o,className:z("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",n==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",t),position:n,...r,children:[l.jsx(mu,{}),l.jsx(it.Viewport,{className:z("tw-p-1",n==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:l.jsx("div",{dir:i,children:e})}),l.jsx(bu,{})]})})});Mr.displayName=it.Content.displayName;const cw=w.forwardRef(({className:t,...e},n)=>l.jsx(it.Label,{ref:n,className:z("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",t),...e}));cw.displayName=it.Label.displayName;const hn=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(it.Item,{ref:r,className:z("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(it.ItemIndicator,{children:l.jsx(ie.Check,{className:"tw-h-4 tw-w-4"})})}),l.jsx(it.ItemText,{children:e})]}));hn.displayName=it.Item.displayName;const uw=w.forwardRef(({className:t,...e},n)=>l.jsx(it.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));uw.displayName=it.Separator.displayName;function kx({table:t}){return l.jsx("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[l.jsxs("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[t.getFilteredSelectedRowModel().rows.length," of"," ",t.getFilteredRowModel().rows.length," row(s) selected"]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsx("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"}),l.jsxs(so,{value:`${t.getState().pagination.pageSize}`,onValueChange:e=>{t.setPageSize(Number(e))},children:[l.jsx(Dr,{className:"tw-h-8 tw-w-[70px]",children:l.jsx(ao,{placeholder:t.getState().pagination.pageSize})}),l.jsx(Mr,{side:"top",children:[10,20,30,40,50].map(e=>l.jsx(hn,{value:`${e}`,children:e},e))})]})]}),l.jsxs("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",t.getState().pagination.pageIndex+1," of ",t.getPageCount()]}),l.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(0),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to first page"}),l.jsx(ie.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to previous page"}),l.jsx(ie.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to next page"}),l.jsx(ie.ChevronRightIcon,{className:"tw-h-4 tw-w-4"})]}),l.jsxs(ve,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>t.setPageIndex(t.getPageCount()-1),disabled:!t.getCanNextPage(),children:[l.jsx("span",{className:"tw-sr-only",children:"Go to last page"}),l.jsx(ie.ArrowRightIcon,{className:"tw-h-4 tw-w-4"})]})]})]})})}const qd=`
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
`;function Nx(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function Hi(t,e){const n=e?`${qd}, ${e}`:qd;return Array.from(t.querySelectorAll(n)).filter(r=>!r.hasAttribute("disabled")&&!r.getAttribute("aria-hidden")&&Nx(r))}const ps=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>{const o=w.useRef(null);w.useEffect(()=>{typeof r=="function"?r(o.current):r&&"current"in r&&(r.current=o.current)},[r]),w.useEffect(()=>{const s=o.current;if(!s)return;const a=()=>{requestAnimationFrame(()=>{Hi(s,'[tabindex]:not([tabindex="-1"])').forEach(d=>{d.setAttribute("tabindex","-1")})})};a();const c=new MutationObserver(()=>{a()});return c.observe(s,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["tabindex"]}),()=>{c.disconnect()}},[]);const i=s=>{const{current:a}=o;if(a){if(s.key==="ArrowDown"){s.preventDefault(),Hi(a)[0].focus();return}s.key===" "&&document.activeElement===a&&s.preventDefault()}};return l.jsx("div",{className:z("pr-twp tw-relative tw-w-full",{"tw-p-1":e}),children:l.jsx("table",{tabIndex:0,onKeyDown:i,ref:o,className:z("tw-w-full tw-caption-bottom tw-text-sm tw-outline-none","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",t),"aria-label":"Table","aria-labelledby":"table-label",...n})})});ps.displayName="Table";const fs=w.forwardRef(({className:t,stickyHeader:e,...n},r)=>l.jsx("thead",{ref:r,className:z({"tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm":e},"[&_tr]:tw-border-b",t),...n}));fs.displayName="TableHeader";const hs=w.forwardRef(({className:t,...e},n)=>l.jsx("tbody",{ref:n,className:z("[&_tr:last-child]:tw-border-0",t),...e}));hs.displayName="TableBody";const dw=w.forwardRef(({className:t,...e},n)=>l.jsx("tfoot",{ref:n,className:z("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",t),...e}));dw.displayName="TableFooter";function Sx(t){w.useEffect(()=>{const e=t.current;if(!e)return;const n=r=>{if(e.contains(document.activeElement)){if(r.key==="ArrowRight"||r.key==="ArrowLeft"){r.preventDefault(),r.stopPropagation();const o=t.current?Hi(t.current):[],i=o.indexOf(document.activeElement),s=r.key==="ArrowRight"?i+1:i-1;s>=0&&s<o.length&&o[s].focus()}r.key==="Escape"&&(r.preventDefault(),e.focus()),(r.key==="ArrowDown"||r.key==="ArrowUp")&&r.preventDefault()}};return e.addEventListener("keydown",n),()=>{e.removeEventListener("keydown",n)}},[t])}function Tx(t,e,n){let r;return n==="ArrowLeft"&&e>0?r=t[e-1]:n==="ArrowRight"&&e<t.length-1&&(r=t[e+1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}function Ax(t,e,n){let r;return n==="ArrowDown"&&e<t.length-1?r=t[e+1]:n==="ArrowUp"&&e>0&&(r=t[e-1]),r?(requestAnimationFrame(()=>r.focus()),!0):!1}const Jn=w.forwardRef(({className:t,onKeyDown:e,onSelect:n,setFocusAlsoRunsSelect:r=!1,...o},i)=>{const s=w.useRef(null);w.useEffect(()=>{typeof i=="function"?i(s.current):i&&"current"in i&&(i.current=s.current)},[i]),Sx(s);const a=w.useMemo(()=>s.current?Hi(s.current):[],[s]),c=w.useCallback(d=>{const{current:p}=s;if(!p||!p.parentElement)return;const f=p.closest("table"),h=f?Hi(f).filter(E=>E.tagName==="TR"):[],b=h.indexOf(p),x=a.indexOf(document.activeElement);if(d.key==="ArrowDown"||d.key==="ArrowUp")d.preventDefault(),Ax(h,b,d.key);else if(d.key==="ArrowLeft"||d.key==="ArrowRight")d.preventDefault(),Tx(a,x,d.key);else if(d.key==="Escape"){d.preventDefault();const E=p.closest("table");E&&E.focus()}e==null||e(d)},[s,a,e]),u=w.useCallback(d=>{r&&(n==null||n(d))},[r,n]);return l.jsx("tr",{ref:s,tabIndex:-1,onKeyDown:c,onFocus:u,className:z("tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50","focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background","data-[state=selected]:tw-bg-muted",t),...o})});Jn.displayName="TableRow";const Ko=w.forwardRef(({className:t,...e},n)=>l.jsx("th",{ref:n,className:z("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",t),...e}));Ko.displayName="TableHead";const Sr=w.forwardRef(({className:t,...e},n)=>l.jsx("td",{ref:n,className:z("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",t),...e}));Sr.displayName="TableCell";const pw=w.forwardRef(({className:t,...e},n)=>l.jsx("caption",{ref:n,className:z("tw-mt-4 tw-text-sm tw-text-muted-foreground",t),...e}));pw.displayName="TableCaption";function fa({className:t,...e}){return l.jsx("div",{className:z("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",t),...e})}function fw({columns:t,data:e,enablePagination:n=!1,showPaginationControls:r=!1,showColumnVisibilityControls:o=!1,stickyHeader:i=!1,onRowClickHandler:s=()=>{},id:a,isLoading:c=!1,noResultsMessage:u}){var O;const[d,p]=w.useState([]),[f,h]=w.useState([]),[b,x]=w.useState({}),[E,C]=w.useState({}),_=w.useMemo(()=>e??[],[e]),D=Vt.useReactTable({data:_,columns:t,getCoreRowModel:Vt.getCoreRowModel(),...n&&{getPaginationRowModel:Vt.getPaginationRowModel()},onSortingChange:p,getSortedRowModel:Vt.getSortedRowModel(),onColumnFiltersChange:h,getFilteredRowModel:Vt.getFilteredRowModel(),onColumnVisibilityChange:x,onRowSelectionChange:C,state:{sorting:d,columnFilters:f,columnVisibility:b,rowSelection:E}}),$=D.getVisibleFlatColumns();let H;return c?H=Array.from({length:10}).map((F,Y)=>`skeleton-row-${Y}`).map(F=>l.jsx(Jn,{children:l.jsx(Sr,{colSpan:$.length??t.length,className:"tw-border-0 tw-p-0",children:l.jsx("div",{className:"tw-w-full tw-py-2",children:l.jsx(fa,{className:"tw-h-14 tw-w-full tw-rounded-md"})})})},F)):((O=D.getRowModel().rows)==null?void 0:O.length)>0?H=D.getRowModel().rows.map(V=>l.jsx(Jn,{onClick:()=>s(V,D),"data-state":V.getIsSelected()&&"selected",children:V.getVisibleCells().map(B=>l.jsx(Sr,{children:Vt.flexRender(B.column.columnDef.cell,B.getContext())},B.id))},V.id)):H=l.jsx(Jn,{children:l.jsx(Sr,{colSpan:t.length,className:"tw-h-24 tw-text-center",children:u})}),l.jsxs("div",{className:"pr-twp",id:a,children:[o&&l.jsx(Ex,{table:D}),l.jsxs(ps,{stickyHeader:i,children:[l.jsx(fs,{stickyHeader:i,children:D.getHeaderGroups().map(V=>l.jsx(Jn,{children:V.headers.map(B=>l.jsx(Ko,{children:B.isPlaceholder?void 0:Vt.flexRender(B.column.columnDef.header,B.getContext())},B.id))},V.id))}),l.jsx(hs,{children:H})]}),n&&l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>D.previousPage(),disabled:!D.getCanPreviousPage(),children:"Previous"}),l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>D.nextPage(),disabled:!D.getCanNextPage(),children:"Next"})]}),n&&r&&l.jsx(kx,{table:D})]})}const hw=Object.freeze(["%webView_error_dump_header%","%webView_error_dump_info_message%"]),Ud=(t,e)=>t[e]??e;function ww({errorDetails:t,handleCopyNotify:e,localizedStrings:n,id:r}){const o=Ud(n,"%webView_error_dump_header%"),i=Ud(n,"%webView_error_dump_info_message%");function s(){navigator.clipboard.writeText(t),e&&e()}return l.jsxs("div",{id:r,className:"tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",children:[l.jsxs("div",{className:"tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch",children:[l.jsxs("div",{className:"tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start",children:[l.jsx("div",{className:"tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose",children:o}),l.jsx("div",{className:"tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground",children:i})]}),l.jsx(ve,{variant:"secondary",size:"icon",className:"size-8",onClick:()=>s(),children:l.jsx(ie.Copy,{})})]}),l.jsx("div",{className:"tw-prose tw-w-full",children:l.jsx("pre",{className:"tw-text-xs",children:t})})]})}const Dx=Object.freeze([...hw,"%webView_error_dump_copied_message%"]);function Mx({errorDetails:t,handleCopyNotify:e,localizedStrings:n,children:r,className:o,id:i}){const[s,a]=w.useState(!1),c=()=>{a(!0),e&&e()},u=d=>{d||a(!1)};return l.jsxs(_o,{onOpenChange:u,children:[l.jsx(Co,{asChild:!0,children:r}),l.jsxs(Pr,{id:i,className:z("tw-min-w-80 tw-max-w-96",o),children:[s&&n["%webView_error_dump_copied_message%"]&&l.jsx(gt,{children:n["%webView_error_dump_copied_message%"]}),l.jsx(ww,{errorDetails:t,handleCopyNotify:c,localizedStrings:n})]})]})}var gw=(t=>(t[t.Check=0]="Check",t[t.Radio=1]="Radio",t))(gw||{});function Rx({id:t,label:e,groups:n}){const[r,o]=w.useState(Object.fromEntries(n.map((u,d)=>u.itemType===0?[d,[]]:void 0).filter(u=>!!u))),[i,s]=w.useState({}),a=(u,d)=>{const p=!r[u][d];o(h=>(h[u][d]=p,{...h}));const f=n[u].items[d];f.onUpdate(f.id,p)},c=(u,d)=>{s(f=>(f[u]=d,{...f}));const p=n[u].items.find(f=>f.id===d);p?p.onUpdate(d):console.error(`Could not find dropdown radio item with id '${d}'!`)};return l.jsx("div",{id:t,children:l.jsxs(us,{children:[l.jsx(Ga,{asChild:!0,children:l.jsxs(ve,{variant:"default",children:[l.jsx(ie.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"}),e,l.jsx(ie.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"})]})}),l.jsx(ui,{children:n.map((u,d)=>l.jsxs("div",{children:[l.jsx(Ya,{children:u.label}),l.jsx(pu,{children:u.itemType===0?l.jsx(l.Fragment,{children:u.items.map((p,f)=>l.jsx("div",{children:l.jsx(Ka,{checked:r[d][f],onCheckedChange:()=>a(d,f),children:p.label})},p.id))}):l.jsx(iw,{value:i[d],onValueChange:p=>c(d,p),children:u.items.map(p=>l.jsx("div",{children:l.jsx(gu,{value:p.id,children:p.label})},p.id))})}),l.jsx(ds,{})]},u.label))})]})})}function Ox({id:t,category:e,downloads:n,languages:r,moreInfoUrl:o,handleMoreInfoLinkClick:i,supportUrl:s,handleSupportLinkClick:a}){const c=new ne.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(n).reduce((d,p)=>d+p,0)),u=()=>{window.scrollTo(0,document.body.scrollHeight)};return l.jsxs("div",{id:t,className:"pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[e&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[l.jsx("div",{className:"tw-flex",children:l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:e})}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsxs("div",{className:"tw-flex tw-gap-1",children:[l.jsx(ie.User,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:c})]}),l.jsx("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"})]}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[l.jsx("div",{className:"tw-flex tw-gap-2",children:r.slice(0,3).map(d=>l.jsx("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:d.toUpperCase()},d))}),r.length>3&&l.jsxs("button",{type:"button",onClick:()=>u(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",r.length-3," more languages"]})]}),(o||s)&&l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[o&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ve,{onClick:()=>i(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Website",l.jsx(ie.Link,{className:"tw-h-4 tw-w-4"})]})}),s&&l.jsx("div",{className:"tw-flex tw-gap-1",children:l.jsxs(ve,{onClick:()=>a(),variant:"link",className:"tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",children:["Support",l.jsx(ie.CircleHelp,{className:"tw-h-4 tw-w-4"})]})})]})]})}function jx({id:t,versionHistory:e}){const[n,r]=w.useState(!1),o=new Date;function i(a){const c=new Date(a),u=new Date(o.getTime()-c.getTime()),d=u.getUTCFullYear()-1970,p=u.getUTCMonth(),f=u.getUTCDate()-1;let h="";return d>0?h=`${d.toString()} year${d===1?"":"s"} ago`:p>0?h=`${p.toString()} month${p===1?"":"s"} ago`:f===0?h="today":h=`${f.toString()} day${f===1?"":"s"} ago`,h}const s=Object.entries(e).sort((a,c)=>c[0].localeCompare(a[0]));return l.jsxs("div",{className:"pr-twp",id:t,children:[l.jsx("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"}),l.jsx("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(n?s:s.slice(0,5)).map(a=>l.jsxs("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[l.jsx("div",{className:"tw-text-foreground",children:l.jsx("li",{className:"tw-prose tw-text-xs",children:l.jsx("span",{children:a[1].description})})}),l.jsxs("div",{className:"tw-justify-end tw-text-right",children:[l.jsxs("div",{children:["Version ",a[0]]}),l.jsx("div",{children:i(a[1].date)})]})]},a[0]))}),s.length>5&&l.jsx("button",{type:"button",onClick:()=>r(!n),className:"tw-text-xs tw-text-foreground tw-underline",children:n?"Show Less Version History":"Show All Version History"})]})}function Ix({id:t,publisherDisplayName:e,fileSize:n,locales:r,versionHistory:o,currentVersion:i}){const s=w.useMemo(()=>ne.formatBytes(n),[n]),c=(u=>{const d=new Intl.DisplayNames(ne.getCurrentLocale(),{type:"language"});return u.map(p=>d.of(p))})(r);return l.jsx("div",{id:t,className:"pr-twp tw-border-t tw-py-2",children:l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[Object.entries(o).length>0&&l.jsx(jx,{versionHistory:o}),l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[l.jsx("h2",{className:"tw-text-md tw-font-semibold",children:"Information"}),l.jsxs("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Publisher"}),l.jsx("span",{className:"tw-font-semibold",children:e}),l.jsx("span",{children:"Size"}),l.jsx("span",{className:"tw-font-semibold",children:s})]}),l.jsx("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:l.jsxs("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[l.jsx("span",{children:"Version"}),l.jsx("span",{className:"tw-font-semibold",children:i}),l.jsx("span",{children:"Languages"}),l.jsx("span",{className:"tw-font-semibold",children:c.join(", ")})]})})]})]})]})})}function mw({entries:t,selected:e,onChange:n,placeholder:r,hasToggleAllFeature:o=!1,selectAllText:i="Select All",clearAllText:s="Clear All",commandEmptyMessage:a="No entries found",customSelectedText:c,isOpen:u=void 0,onOpenChange:d=void 0,isDisabled:p=!1,sortSelected:f=!1,icon:h=void 0,className:b=void 0,variant:x="ghost",id:E}){const[C,_]=w.useState(!1),D=w.useCallback(Y=>{var M;const N=(M=t.find(S=>S.label===Y))==null?void 0:M.value;N&&n(e.includes(N)?e.filter(S=>S!==N):[...e,N])},[t,e,n]),$=()=>c||r,H=w.useMemo(()=>{if(!f)return t;const Y=t.filter(M=>M.starred).sort((M,S)=>M.label.localeCompare(S.label)),N=t.filter(M=>!M.starred).sort((M,S)=>{const I=e.includes(M.value),T=e.includes(S.value);return I&&!T?-1:!I&&T?1:M.label.localeCompare(S.label)});return[...Y,...N]},[t,e,f]),O=()=>{n(t.map(Y=>Y.value))},V=()=>{n([])},B=u??C,F=d??_;return l.jsx("div",{id:E,className:b,children:l.jsxs(_o,{open:B,onOpenChange:F,children:[l.jsx(Co,{asChild:!0,children:l.jsxs(ve,{variant:x,role:"combobox","aria-expanded":B,className:"tw-group tw-w-full tw-justify-between",disabled:p,children:[l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[h&&l.jsx("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:l.jsx("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:h})}),l.jsx("div",{className:"tw-font-normal",children:$()})]}),l.jsx(ie.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Pr,{align:"start",className:"tw-w-full tw-p-0",children:l.jsxs(xo,{children:[l.jsx(li,{placeholder:`Search ${r.toLowerCase()}...`}),o&&l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:O,children:i}),l.jsx(ve,{variant:"ghost",size:"sm",onClick:V,children:s})]}),l.jsxs(yo,{children:[l.jsx(as,{children:a}),l.jsx(Tr,{children:H.map(Y=>l.jsxs($r,{value:Y.label,onSelect:D,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx("div",{className:"w-4",children:l.jsx(ie.Check,{className:z("tw-h-4 tw-w-4",e.includes(Y.value)?"tw-opacity-100":"tw-opacity-0")})}),Y.starred&&l.jsx(ie.Star,{className:"tw-h-4 tw-w-4"}),l.jsx("div",{className:"tw-flex-grow",children:Y.label}),Y.secondaryLabel&&l.jsx("div",{className:"tw-text-end tw-text-muted-foreground",children:Y.secondaryLabel})]},Y.label))})]})]})})]})})}function Lx({entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:i,isDisabled:s,sortSelected:a,icon:c,className:u,badgesPlaceholder:d,id:p}){return l.jsxs("div",{id:p,className:"tw-flex tw-items-center tw-gap-2",children:[l.jsx(mw,{entries:t,selected:e,onChange:n,placeholder:r,commandEmptyMessage:o,customSelectedText:i,isDisabled:s,sortSelected:a,icon:c,className:u}),e.length>0?l.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:e.map(f=>{var h;return l.jsxs(Go,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[l.jsx(ve,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>n(e.filter(b=>b!==f)),children:l.jsx(ie.X,{className:"tw-h-3 tw-w-3"})}),(h=t.find(b=>b.value===f))==null?void 0:h.label]},f)})}):l.jsx(gt,{children:d})]})}var _r=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $x(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ae={},vt={},Vd;function di(){if(Vd)return vt;Vd=1;function t(C,_,D){if(D===void 0&&(D=Array.prototype),C&&typeof D.find=="function")return D.find.call(C,_);for(var $=0;$<C.length;$++)if(n(C,$)){var H=C[$];if(_.call(void 0,H,$,C))return H}}function e(C,_){return _===void 0&&(_=Object),_&&typeof _.getOwnPropertyDescriptors=="function"&&(C=_.create(null,_.getOwnPropertyDescriptors(C))),_&&typeof _.freeze=="function"?_.freeze(C):C}function n(C,_){return Object.prototype.hasOwnProperty.call(C,_)}function r(C,_){if(C===null||typeof C!="object")throw new TypeError("target is not an object");for(var D in _)n(_,D)&&(C[D]=_[D]);return C}var o=e({allowfullscreen:!0,async:!0,autofocus:!0,autoplay:!0,checked:!0,controls:!0,default:!0,defer:!0,disabled:!0,formnovalidate:!0,hidden:!0,ismap:!0,itemscope:!0,loop:!0,multiple:!0,muted:!0,nomodule:!0,novalidate:!0,open:!0,playsinline:!0,readonly:!0,required:!0,reversed:!0,selected:!0});function i(C){return n(o,C.toLowerCase())}var s=e({area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function a(C){return n(s,C.toLowerCase())}var c=e({script:!1,style:!1,textarea:!0,title:!0});function u(C){var _=C.toLowerCase();return n(c,_)&&!c[_]}function d(C){var _=C.toLowerCase();return n(c,_)&&c[_]}function p(C){return C===h.HTML}function f(C){return p(C)||C===h.XML_XHTML_APPLICATION}var h=e({HTML:"text/html",XML_APPLICATION:"application/xml",XML_TEXT:"text/xml",XML_XHTML_APPLICATION:"application/xhtml+xml",XML_SVG_IMAGE:"image/svg+xml"}),b=Object.keys(h).map(function(C){return h[C]});function x(C){return b.indexOf(C)>-1}var E=e({HTML:"http://www.w3.org/1999/xhtml",SVG:"http://www.w3.org/2000/svg",XML:"http://www.w3.org/XML/1998/namespace",XMLNS:"http://www.w3.org/2000/xmlns/"});return vt.assign=r,vt.find=t,vt.freeze=e,vt.HTML_BOOLEAN_ATTRIBUTES=o,vt.HTML_RAW_TEXT_ELEMENTS=c,vt.HTML_VOID_ELEMENTS=s,vt.hasDefaultHTMLNamespace=f,vt.hasOwn=n,vt.isHTMLBooleanAttribute=i,vt.isHTMLRawTextElement=u,vt.isHTMLEscapableRawTextElement=d,vt.isHTMLMimeType=p,vt.isHTMLVoidElement=a,vt.isValidMimeType=x,vt.MIME_TYPE=h,vt.NAMESPACE=E,vt}var jo={},Hd;function Wa(){if(Hd)return jo;Hd=1;var t=di();function e(f,h){f.prototype=Object.create(Error.prototype,{constructor:{value:f},name:{value:f.name,enumerable:!0,writable:h}})}var n=t.freeze({Error:"Error",IndexSizeError:"IndexSizeError",DomstringSizeError:"DomstringSizeError",HierarchyRequestError:"HierarchyRequestError",WrongDocumentError:"WrongDocumentError",InvalidCharacterError:"InvalidCharacterError",NoDataAllowedError:"NoDataAllowedError",NoModificationAllowedError:"NoModificationAllowedError",NotFoundError:"NotFoundError",NotSupportedError:"NotSupportedError",InUseAttributeError:"InUseAttributeError",InvalidStateError:"InvalidStateError",SyntaxError:"SyntaxError",InvalidModificationError:"InvalidModificationError",NamespaceError:"NamespaceError",InvalidAccessError:"InvalidAccessError",ValidationError:"ValidationError",TypeMismatchError:"TypeMismatchError",SecurityError:"SecurityError",NetworkError:"NetworkError",AbortError:"AbortError",URLMismatchError:"URLMismatchError",QuotaExceededError:"QuotaExceededError",TimeoutError:"TimeoutError",InvalidNodeTypeError:"InvalidNodeTypeError",DataCloneError:"DataCloneError",EncodingError:"EncodingError",NotReadableError:"NotReadableError",UnknownError:"UnknownError",ConstraintError:"ConstraintError",DataError:"DataError",TransactionInactiveError:"TransactionInactiveError",ReadOnlyError:"ReadOnlyError",VersionError:"VersionError",OperationError:"OperationError",NotAllowedError:"NotAllowedError",OptOutError:"OptOutError"}),r=Object.keys(n);function o(f){return typeof f=="number"&&f>=1&&f<=25}function i(f){return typeof f=="string"&&f.substring(f.length-n.Error.length)===n.Error}function s(f,h){o(f)?(this.name=r[f],this.message=h||""):(this.message=f,this.name=i(h)?h:n.Error),Error.captureStackTrace&&Error.captureStackTrace(this,s)}e(s,!0),Object.defineProperties(s.prototype,{code:{enumerable:!0,get:function(){var f=r.indexOf(this.name);return o(f)?f:0}}});for(var a={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25},c=Object.entries(a),u=0;u<c.length;u++){var d=c[u][0];s[d]=c[u][1]}function p(f,h){this.message=f,this.locator=h,Error.captureStackTrace&&Error.captureStackTrace(this,p)}return e(p),jo.DOMException=s,jo.DOMExceptionName=n,jo.ExceptionCode=a,jo.ParseError=p,jo}var rt={},ye={},zd;function bw(){if(zd)return ye;zd=1;function t(Pe){try{typeof Pe!="function"&&(Pe=RegExp);var Ze=new Pe("𝌆","u").exec("𝌆");return!!Ze&&Ze[0].length===2}catch{}return!1}var e=t();function n(Pe){if(Pe.source[0]!=="[")throw new Error(Pe+" can not be used with chars");return Pe.source.slice(1,Pe.source.lastIndexOf("]"))}function r(Pe,Ze){if(Pe.source[0]!=="[")throw new Error("/"+Pe.source+"/ can not be used with chars_without");if(!Ze||typeof Ze!="string")throw new Error(JSON.stringify(Ze)+" is not a valid search");if(Pe.source.indexOf(Ze)===-1)throw new Error('"'+Ze+'" is not is /'+Pe.source+"/");if(Ze==="-"&&Pe.source.indexOf(Ze)!==1)throw new Error('"'+Ze+'" is not at the first postion of /'+Pe.source+"/");return new RegExp(Pe.source.replace(Ze,""),e?"u":"")}function o(Pe){var Ze=this;return new RegExp(Array.prototype.slice.call(arguments).map(function(Pt){var Ft=typeof Pt=="string";if(Ft&&Ze===void 0&&Pt==="|")throw new Error("use regg instead of reg to wrap expressions with `|`!");return Ft?Pt:Pt.source}).join(""),e?"mu":"m")}function i(Pe){if(arguments.length===0)throw new Error("no parameters provided");return o.apply(i,["(?:"].concat(Array.prototype.slice.call(arguments),[")"]))}var s="�",a=/[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;e&&(a=o("[",n(a),"\\u{10000}-\\u{10FFFF}","]"));var c=/[\x20\x09\x0D\x0A]/,u=n(c),d=o(c,"+"),p=o(c,"*"),f=/[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;e&&(f=o("[",n(f),"\\u{10000}-\\u{10FFFF}","]"));var h=n(f),b=o("[",h,n(/[-.0-9\xB7]/),n(/[\u0300-\u036F\u203F-\u2040]/),"]"),x=o(f,b,"*"),E=o(b,"+"),C=o("&",x,";"),_=i(/&#[0-9]+;|&#x[0-9a-fA-F]+;/),D=i(C,"|",_),$=o("%",x,";"),H=i(o('"',i(/[^%&"]/,"|",$,"|",D),"*",'"'),"|",o("'",i(/[^%&']/,"|",$,"|",D),"*","'")),O=i('"',i(/[^<&"]/,"|",D),"*",'"',"|","'",i(/[^<&']/,"|",D),"*","'"),V=r(f,":"),B=r(b,":"),F=o(V,B,"*"),Y=o(F,i(":",F),"?"),N=o("^",Y,"$"),M=o("(",Y,")"),S=i(/"[^"]*"|'[^']*'/),I=o(/^<\?/,"(",x,")",i(d,"(",a,"*?)"),"?",/\?>/),T=/[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/,A=i('"',T,'*"',"|","'",r(T,"'"),"*'"),P="<!--",L="-->",J=o(P,i(r(a,"-"),"|",o("-",r(a,"-"))),"*",L),K="#PCDATA",W=i(o(/\(/,p,K,i(p,/\|/,p,Y),"*",p,/\)\*/),"|",o(/\(/,p,K,p,/\)/)),ee=/[?*+]?/,te=o(/\([^>]+\)/,ee),Z=i("EMPTY","|","ANY","|",W,"|",te),X="<!ELEMENT",le=o(X,d,i(Y,"|",$),d,i(Z,"|",$),p,">"),ce=o("NOTATION",d,/\(/,p,x,i(p,/\|/,p,x),"*",p,/\)/),ue=o(/\(/,p,E,i(p,/\|/,p,E),"*",p,/\)/),ge=i(ce,"|",ue),he=i(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/,"|",ge),we=i(/#REQUIRED|#IMPLIED/,"|",i(i("#FIXED",d),"?",O)),se=i(d,x,d,he,d,we),_e="<!ATTLIST",De=o(_e,d,x,se,"*",p,">"),oe="about:legacy-compat",me=i('"'+oe+'"',"|","'"+oe+"'"),Ne="SYSTEM",Oe="PUBLIC",Be=i(i(Ne,d,S),"|",i(Oe,d,A,d,S)),tt=o("^",i(i(Ne,d,"(?<SystemLiteralOnly>",S,")"),"|",i(Oe,d,"(?<PubidLiteral>",A,")",d,"(?<SystemLiteral>",S,")"))),Qe=i(d,"NDATA",d,x),st=i(H,"|",i(Be,Qe,"?")),Ee="<!ENTITY",pt=o(Ee,d,x,d,st,p,">"),ze=i(H,"|",Be),_n=o(Ee,d,"%",d,x,d,ze,p,">"),nn=i(pt,"|",_n),Gt=o(Oe,d,A),rn=o("<!NOTATION",d,x,d,i(Be,"|",Gt),p,">"),fe=o(p,"=",p),$e=/1[.]\d+/,ft=o(d,"version",fe,i("'",$e,"'","|",'"',$e,'"')),bt=/[A-Za-z][-A-Za-z0-9._]*/,on=i(d,"encoding",fe,i('"',bt,'"',"|","'",bt,"'")),sn=i(d,"standalone",fe,i("'",i("yes","|","no"),"'","|",'"',i("yes","|","no"),'"')),Cn=o(/^<\?xml/,ft,on,"?",sn,"?",p,/\?>/),an="<!DOCTYPE",ln="<![CDATA[",kt="]]>",cn=/<!\[CDATA\[/,un=/\]\]>/,Kt=o(a,"*?",un),Fn=o(cn,Kt);return ye.chars=n,ye.chars_without=r,ye.detectUnicodeSupport=t,ye.reg=o,ye.regg=i,ye.ABOUT_LEGACY_COMPAT=oe,ye.ABOUT_LEGACY_COMPAT_SystemLiteral=me,ye.AttlistDecl=De,ye.CDATA_START=ln,ye.CDATA_END=kt,ye.CDSect=Fn,ye.Char=a,ye.Comment=J,ye.COMMENT_START=P,ye.COMMENT_END=L,ye.DOCTYPE_DECL_START=an,ye.elementdecl=le,ye.EntityDecl=nn,ye.EntityValue=H,ye.ExternalID=Be,ye.ExternalID_match=tt,ye.Name=x,ye.NotationDecl=rn,ye.Reference=D,ye.PEReference=$,ye.PI=I,ye.PUBLIC=Oe,ye.PubidLiteral=A,ye.QName=Y,ye.QName_exact=N,ye.QName_group=M,ye.S=d,ye.SChar_s=u,ye.S_OPT=p,ye.SYSTEM=Ne,ye.SystemLiteral=S,ye.UNICODE_REPLACEMENT_CHARACTER=s,ye.UNICODE_SUPPORT=e,ye.XMLDecl=Cn,ye}var Gd;function vw(){if(Gd)return rt;Gd=1;var t=di(),e=t.find,n=t.hasDefaultHTMLNamespace,r=t.hasOwn,o=t.isHTMLMimeType,i=t.isHTMLRawTextElement,s=t.isHTMLVoidElement,a=t.MIME_TYPE,c=t.NAMESPACE,u=Symbol(),d=Wa(),p=d.DOMException,f=d.DOMExceptionName,h=bw();function b(v){if(v!==u)throw new TypeError("Illegal constructor")}function x(v){return v!==""}function E(v){return v?v.split(/[\t\n\f\r ]+/).filter(x):[]}function C(v,y){return r(v,y)||(v[y]=!0),v}function _(v){if(!v)return[];var y=E(v);return Object.keys(y.reduce(C,{}))}function D(v){return function(y){return v&&v.indexOf(y)!==-1}}function $(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in qualified name "'+v+'"')}function H(v,y){$(y),v=v||null;var R=null,G=y;if(y.indexOf(":")>=0){var re=y.split(":");R=re[0],G=re[1]}if(R!==null&&v===null)throw new p(p.NAMESPACE_ERR,"prefix is non-null and namespace is null");if(R==="xml"&&v!==t.NAMESPACE.XML)throw new p(p.NAMESPACE_ERR,'prefix is "xml" and namespace is not the XML namespace');if((R==="xmlns"||y==="xmlns")&&v!==t.NAMESPACE.XMLNS)throw new p(p.NAMESPACE_ERR,'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace');if(v===t.NAMESPACE.XMLNS&&R!=="xmlns"&&y!=="xmlns")throw new p(p.NAMESPACE_ERR,'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"');return[v,R,G]}function O(v,y){for(var R in v)r(v,R)&&(y[R]=v[R])}function V(v,y){var R=v.prototype;if(!(R instanceof y)){let G=function(){};G.prototype=y.prototype,G=new G,O(R,G),v.prototype=R=G}R.constructor!=v&&(typeof v!="function"&&console.error("unknown Class:"+v),R.constructor=v)}var B={},F=B.ELEMENT_NODE=1,Y=B.ATTRIBUTE_NODE=2,N=B.TEXT_NODE=3,M=B.CDATA_SECTION_NODE=4,S=B.ENTITY_REFERENCE_NODE=5,I=B.ENTITY_NODE=6,T=B.PROCESSING_INSTRUCTION_NODE=7,A=B.COMMENT_NODE=8,P=B.DOCUMENT_NODE=9,L=B.DOCUMENT_TYPE_NODE=10,J=B.DOCUMENT_FRAGMENT_NODE=11,K=B.NOTATION_NODE=12,W=t.freeze({DOCUMENT_POSITION_DISCONNECTED:1,DOCUMENT_POSITION_PRECEDING:2,DOCUMENT_POSITION_FOLLOWING:4,DOCUMENT_POSITION_CONTAINS:8,DOCUMENT_POSITION_CONTAINED_BY:16,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32});function ee(v,y){if(y.length<v.length)return ee(y,v);var R=null;for(var G in v){if(v[G]!==y[G])return R;R=v[G]}return R}function te(v){return v.guid||(v.guid=Math.random()),v.guid}function Z(){}Z.prototype={length:0,item:function(v){return v>=0&&v<this.length?this[v]:null},toString:function(v){for(var y=[],R=0;R<this.length;R++)Ft(this[R],y,v);return y.join("")},filter:function(v){return Array.prototype.filter.call(this,v)},indexOf:function(v){return Array.prototype.indexOf.call(this,v)}},Z.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function X(v,y){this._node=v,this._refresh=y,le(this)}function le(v){var y=v._node._inc||v._node.ownerDocument._inc;if(v._inc!==y){var R=v._refresh(v._node);if(gn(v,"length",R.length),!v.$$length||R.length<v.$$length)for(var G=R.length;G in v;G++)r(v,G)&&delete v[G];O(R,v),v._inc=y}}X.prototype.item=function(v){return le(this),this[v]||null},V(X,Z);function ce(){}function ue(v,y){for(var R=0;R<v.length;){if(v[R]===y)return R;R++}}function ge(v,y,R,G){if(G?y[ue(y,G)]=R:(y[y.length]=R,y.length++),v){R.ownerElement=v;var re=v.ownerDocument;re&&(G&&Ne(re,v,G),me(re,v,R))}}function he(v,y,R){var G=ue(y,R);if(G>=0){for(var re=y.length-1;G<=re;)y[G]=y[++G];if(y.length=re,v){var ae=v.ownerDocument;ae&&Ne(ae,v,R),R.ownerElement=null}}}ce.prototype={length:0,item:Z.prototype.item,getNamedItem:function(v){this._ownerElement&&this._ownerElement._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());for(var y=0;y<this.length;){var R=this[y];if(R.nodeName===v)return R;y++}return null},setNamedItem:function(v){var y=v.ownerElement;if(y&&y!==this._ownerElement)throw new p(p.INUSE_ATTRIBUTE_ERR);var R=this.getNamedItemNS(v.namespaceURI,v.localName);return R===v?v:(ge(this._ownerElement,this,v,R),R)},setNamedItemNS:function(v){return this.setNamedItem(v)},removeNamedItem:function(v){var y=this.getNamedItem(v);if(!y)throw new p(p.NOT_FOUND_ERR,v);return he(this._ownerElement,this,y),y},removeNamedItemNS:function(v,y){var R=this.getNamedItemNS(v,y);if(!R)throw new p(p.NOT_FOUND_ERR,v?v+" : "+y:y);return he(this._ownerElement,this,R),R},getNamedItemNS:function(v,y){v||(v=null);for(var R=0;R<this.length;){var G=this[R];if(G.localName===y&&G.namespaceURI===v)return G;R++}return null}},ce.prototype[Symbol.iterator]=function(){var v=this,y=0;return{next:function(){return y<v.length?{value:v[y++],done:!1}:{done:!0}},return:function(){return{done:!0}}}};function we(){}we.prototype={hasFeature:function(v,y){return!0},createDocument:function(v,y,R){var G=a.XML_APPLICATION;v===c.HTML?G=a.XML_XHTML_APPLICATION:v===c.SVG&&(G=a.XML_SVG_IMAGE);var re=new oe(u,{contentType:G});if(re.implementation=this,re.childNodes=new Z,re.doctype=R||null,R&&re.appendChild(R),y){var ae=re.createElementNS(v,y);re.appendChild(ae)}return re},createDocumentType:function(v,y,R,G){$(v);var re=new an(u);return re.name=v,re.nodeName=v,re.publicId=y||"",re.systemId=R||"",re.internalSubset=G||"",re.childNodes=new Z,re},createHTMLDocument:function(v){var y=new oe(u,{contentType:a.HTML});if(y.implementation=this,y.childNodes=new Z,v!==!1){y.doctype=this.createDocumentType("html"),y.doctype.ownerDocument=y,y.appendChild(y.doctype);var R=y.createElement("html");y.appendChild(R);var G=y.createElement("head");if(R.appendChild(G),typeof v=="string"){var re=y.createElement("title");re.appendChild(y.createTextNode(v)),G.appendChild(re)}R.appendChild(y.createElement("body"))}return y}};function se(v){b(v)}se.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,parentNode:null,get parentElement(){return this.parentNode&&this.parentNode.nodeType===this.ELEMENT_NODE?this.parentNode:null},childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,baseURI:"about:blank",get isConnected(){var v=this.getRootNode();return v&&v.nodeType===v.DOCUMENT_NODE},contains:function(v){if(!v)return!1;var y=v;do{if(this===y)return!0;y=v.parentNode}while(y);return!1},getRootNode:function(v){var y=this;do{if(!y.parentNode)return y;y=y.parentNode}while(y)},isEqualNode:function(v){if(!v||this.nodeType!==v.nodeType)return!1;switch(this.nodeType){case this.DOCUMENT_TYPE_NODE:if(this.name!==v.name||this.publicId!==v.publicId||this.systemId!==v.systemId)return!1;break;case this.ELEMENT_NODE:if(this.namespaceURI!==v.namespaceURI||this.prefix!==v.prefix||this.localName!==v.localName||this.attributes.length!==v.attributes.length)return!1;for(var y=0;y<this.attributes.length;y++){var R=this.attributes.item(y);if(!R.isEqualNode(v.getAttributeNodeNS(R.namespaceURI,R.localName)))return!1}break;case this.ATTRIBUTE_NODE:if(this.namespaceURI!==v.namespaceURI||this.localName!==v.localName||this.value!==v.value)return!1;break;case this.PROCESSING_INSTRUCTION_NODE:if(this.target!==v.target||this.data!==v.data)return!1;break;case this.TEXT_NODE:case this.COMMENT_NODE:if(this.data!==v.data)return!1;break}if(this.childNodes.length!==v.childNodes.length)return!1;for(var y=0;y<this.childNodes.length;y++)if(!this.childNodes[y].isEqualNode(v.childNodes[y]))return!1;return!0},isSameNode:function(v){return this===v},insertBefore:function(v,y){return fe(this,v,y)},replaceChild:function(v,y){fe(this,v,y,rn),y&&this.removeChild(y)},removeChild:function(v){return Be(this,v)},appendChild:function(v){return this.insertBefore(v,null)},hasChildNodes:function(){return this.firstChild!=null},cloneNode:function(v){return mr(this.ownerDocument||this,this,v)},normalize:function(){for(var v=this.firstChild;v;){var y=v.nextSibling;y&&y.nodeType==N&&v.nodeType==N?(this.removeChild(y),v.appendData(y.data)):(v.normalize(),v=y)}},isSupported:function(v,y){return this.ownerDocument.implementation.hasFeature(v,y)},lookupPrefix:function(v){for(var y=this;y;){var R=y._nsMap;if(R){for(var G in R)if(r(R,G)&&R[G]===v)return G}y=y.nodeType==Y?y.ownerDocument:y.parentNode}return null},lookupNamespaceURI:function(v){for(var y=this;y;){var R=y._nsMap;if(R&&r(R,v))return R[v];y=y.nodeType==Y?y.ownerDocument:y.parentNode}return null},isDefaultNamespace:function(v){var y=this.lookupPrefix(v);return y==null},compareDocumentPosition:function(v){if(this===v)return 0;var y=v,R=this,G=null,re=null;if(y instanceof ft&&(G=y,y=G.ownerElement),R instanceof ft&&(re=R,R=re.ownerElement,G&&y&&R===y))for(var ae=0,ke;ke=R.attributes[ae];ae++){if(ke===G)return W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+W.DOCUMENT_POSITION_PRECEDING;if(ke===re)return W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+W.DOCUMENT_POSITION_FOLLOWING}if(!y||!R||R.ownerDocument!==y.ownerDocument)return W.DOCUMENT_POSITION_DISCONNECTED+W.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC+(te(R.ownerDocument)>te(y.ownerDocument)?W.DOCUMENT_POSITION_FOLLOWING:W.DOCUMENT_POSITION_PRECEDING);if(re&&y===R)return W.DOCUMENT_POSITION_CONTAINS+W.DOCUMENT_POSITION_PRECEDING;if(G&&y===R)return W.DOCUMENT_POSITION_CONTAINED_BY+W.DOCUMENT_POSITION_FOLLOWING;for(var nt=[],lt=y.parentNode;lt;){if(!re&&lt===R)return W.DOCUMENT_POSITION_CONTAINED_BY+W.DOCUMENT_POSITION_FOLLOWING;nt.push(lt),lt=lt.parentNode}nt.reverse();for(var Nt=[],ht=R.parentNode;ht;){if(!G&&ht===y)return W.DOCUMENT_POSITION_CONTAINS+W.DOCUMENT_POSITION_PRECEDING;Nt.push(ht),ht=ht.parentNode}Nt.reverse();var Xe=ee(nt,Nt);for(var dn in Xe.childNodes){var Rt=Xe.childNodes[dn];if(Rt===R)return W.DOCUMENT_POSITION_FOLLOWING;if(Rt===y)return W.DOCUMENT_POSITION_PRECEDING;if(Nt.indexOf(Rt)>=0)return W.DOCUMENT_POSITION_FOLLOWING;if(nt.indexOf(Rt)>=0)return W.DOCUMENT_POSITION_PRECEDING}return 0}};function _e(v){return v=="<"&&"&lt;"||v==">"&&"&gt;"||v=="&"&&"&amp;"||v=='"'&&"&quot;"||"&#"+v.charCodeAt()+";"}O(B,se),O(B,se.prototype),O(W,se),O(W,se.prototype);function De(v,y){if(y(v))return!0;if(v=v.firstChild)do if(De(v,y))return!0;while(v=v.nextSibling)}function oe(v,y){b(v);var R=y||{};this.ownerDocument=this,this.contentType=R.contentType||a.XML_APPLICATION,this.type=o(this.contentType)?"html":"xml"}function me(v,y,R){v&&v._inc++;var G=R.namespaceURI;G===c.XMLNS&&(y._nsMap[R.prefix?R.localName:""]=R.value)}function Ne(v,y,R,G){v&&v._inc++;var re=R.namespaceURI;re===c.XMLNS&&delete y._nsMap[R.prefix?R.localName:""]}function Oe(v,y,R){if(v&&v._inc){v._inc++;var G=y.childNodes;if(R&&!R.nextSibling)G[G.length++]=R;else{for(var re=y.firstChild,ae=0;re;)G[ae++]=re,re=re.nextSibling;G.length=ae,delete G[G.length]}}}function Be(v,y){if(v!==y.parentNode)throw new p(p.NOT_FOUND_ERR,"child's parent is not parent");var R=y.previousSibling,G=y.nextSibling;return R?R.nextSibling=G:v.firstChild=G,G?G.previousSibling=R:v.lastChild=R,Oe(v.ownerDocument,v),y.parentNode=null,y.previousSibling=null,y.nextSibling=null,y}function tt(v){return v&&(v.nodeType===se.DOCUMENT_NODE||v.nodeType===se.DOCUMENT_FRAGMENT_NODE||v.nodeType===se.ELEMENT_NODE)}function Qe(v){return v&&(v.nodeType===se.CDATA_SECTION_NODE||v.nodeType===se.COMMENT_NODE||v.nodeType===se.DOCUMENT_FRAGMENT_NODE||v.nodeType===se.DOCUMENT_TYPE_NODE||v.nodeType===se.ELEMENT_NODE||v.nodeType===se.PROCESSING_INSTRUCTION_NODE||v.nodeType===se.TEXT_NODE)}function st(v){return v&&v.nodeType===se.DOCUMENT_TYPE_NODE}function Ee(v){return v&&v.nodeType===se.ELEMENT_NODE}function pt(v){return v&&v.nodeType===se.TEXT_NODE}function ze(v,y){var R=v.childNodes||[];if(e(R,Ee)||st(y))return!1;var G=e(R,st);return!(y&&G&&R.indexOf(G)>R.indexOf(y))}function _n(v,y){var R=v.childNodes||[];function G(ae){return Ee(ae)&&ae!==y}if(e(R,G))return!1;var re=e(R,st);return!(y&&re&&R.indexOf(re)>R.indexOf(y))}function nn(v,y,R){if(!tt(v))throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected parent node type "+v.nodeType);if(R&&R.parentNode!==v)throw new p(p.NOT_FOUND_ERR,"child not in parent");if(!Qe(y)||st(y)&&v.nodeType!==se.DOCUMENT_NODE)throw new p(p.HIERARCHY_REQUEST_ERR,"Unexpected node type "+y.nodeType+" for parent node type "+v.nodeType)}function Gt(v,y,R){var G=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===se.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,pt))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!ze(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!ze(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(st(y)){if(e(G,st))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(G,Ee);if(R&&G.indexOf(ke)<G.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element");if(!R&&ke)throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can not be appended since element is present")}}function rn(v,y,R){var G=v.childNodes||[],re=y.childNodes||[];if(y.nodeType===se.DOCUMENT_FRAGMENT_NODE){var ae=re.filter(Ee);if(ae.length>1||e(re,pt))throw new p(p.HIERARCHY_REQUEST_ERR,"More than one element or text in fragment");if(ae.length===1&&!_n(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Element in fragment can not be inserted before doctype")}if(Ee(y)&&!_n(v,R))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one element can be added and only after doctype");if(st(y)){if(e(G,function(lt){return st(lt)&&lt!==R}))throw new p(p.HIERARCHY_REQUEST_ERR,"Only one doctype is allowed");var ke=e(G,Ee);if(R&&G.indexOf(ke)<G.indexOf(R))throw new p(p.HIERARCHY_REQUEST_ERR,"Doctype can only be inserted before an element")}}function fe(v,y,R,G){nn(v,y,R),v.nodeType===se.DOCUMENT_NODE&&(G||Gt)(v,y,R);var re=y.parentNode;if(re&&re.removeChild(y),y.nodeType===J){var ae=y.firstChild;if(ae==null)return y;var ke=y.lastChild}else ae=ke=y;var nt=R?R.previousSibling:v.lastChild;ae.previousSibling=nt,ke.nextSibling=R,nt?nt.nextSibling=ae:v.firstChild=ae,R==null?v.lastChild=ke:R.previousSibling=ke;do ae.parentNode=v;while(ae!==ke&&(ae=ae.nextSibling));return Oe(v.ownerDocument||v,v,y),y.nodeType==J&&(y.firstChild=y.lastChild=null),y}oe.prototype={implementation:null,nodeName:"#document",nodeType:P,doctype:null,documentElement:null,_inc:1,insertBefore:function(v,y){if(v.nodeType===J){for(var R=v.firstChild;R;){var G=R.nextSibling;this.insertBefore(R,y),R=G}return v}return fe(this,v,y),v.ownerDocument=this,this.documentElement===null&&v.nodeType===F&&(this.documentElement=v),v},removeChild:function(v){var y=Be(this,v);return y===this.documentElement&&(this.documentElement=null),y},replaceChild:function(v,y){fe(this,v,y,rn),v.ownerDocument=this,y&&this.removeChild(y),Ee(v)&&(this.documentElement=v)},importNode:function(v,y){return En(this,v,y)},getElementById:function(v){var y=null;return De(this.documentElement,function(R){if(R.nodeType==F&&R.getAttribute("id")==v)return y=R,!0}),y},createElement:function(v){var y=new $e(u);y.ownerDocument=this,this.type==="html"&&(v=v.toLowerCase()),n(this.contentType)&&(y.namespaceURI=c.HTML),y.nodeName=v,y.tagName=v,y.localName=v,y.childNodes=new Z;var R=y.attributes=new ce;return R._ownerElement=y,y},createDocumentFragment:function(){var v=new un(u);return v.ownerDocument=this,v.childNodes=new Z,v},createTextNode:function(v){var y=new on(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createComment:function(v){var y=new sn(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createCDATASection:function(v){var y=new Cn(u);return y.ownerDocument=this,y.childNodes=new Z,y.appendData(v),y},createProcessingInstruction:function(v,y){var R=new Kt(u);return R.ownerDocument=this,R.childNodes=new Z,R.nodeName=R.target=v,R.nodeValue=R.data=y,R},createAttribute:function(v){if(!h.QName_exact.test(v))throw new p(p.INVALID_CHARACTER_ERR,'invalid character in name "'+v+'"');return this.type==="html"&&(v=v.toLowerCase()),this._createAttribute(v)},_createAttribute:function(v){var y=new ft(u);return y.ownerDocument=this,y.childNodes=new Z,y.name=v,y.nodeName=v,y.localName=v,y.specified=!0,y},createEntityReference:function(v){if(!h.Name.test(v))throw new p(p.INVALID_CHARACTER_ERR,'not a valid xml name "'+v+'"');if(this.type==="html")throw new p("document is an html document",f.NotSupportedError);var y=new cn(u);return y.ownerDocument=this,y.childNodes=new Z,y.nodeName=v,y},createElementNS:function(v,y){var R=H(v,y),G=new $e(u),re=G.attributes=new ce;return G.childNodes=new Z,G.ownerDocument=this,G.nodeName=y,G.tagName=y,G.namespaceURI=R[0],G.prefix=R[1],G.localName=R[2],re._ownerElement=G,G},createAttributeNS:function(v,y){var R=H(v,y),G=new ft(u);return G.ownerDocument=this,G.childNodes=new Z,G.nodeName=y,G.name=y,G.specified=!0,G.namespaceURI=R[0],G.prefix=R[1],G.localName=R[2],G}},V(oe,se);function $e(v){b(v),this._nsMap=Object.create(null)}$e.prototype={nodeType:F,attributes:null,getQualifiedName:function(){return this.prefix?this.prefix+":"+this.localName:this.localName},_isInHTMLDocumentAndNamespace:function(){return this.ownerDocument.type==="html"&&this.namespaceURI===c.HTML},hasAttributes:function(){return!!(this.attributes&&this.attributes.length)},hasAttribute:function(v){return!!this.getAttributeNode(v)},getAttribute:function(v){var y=this.getAttributeNode(v);return y?y.value:null},getAttributeNode:function(v){return this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase()),this.attributes.getNamedItem(v)},setAttribute:function(v,y){this._isInHTMLDocumentAndNamespace()&&(v=v.toLowerCase());var R=this.getAttributeNode(v);R?R.value=R.nodeValue=""+y:(R=this.ownerDocument._createAttribute(v),R.value=R.nodeValue=""+y,this.setAttributeNode(R))},removeAttribute:function(v){var y=this.getAttributeNode(v);y&&this.removeAttributeNode(y)},setAttributeNode:function(v){return this.attributes.setNamedItem(v)},setAttributeNodeNS:function(v){return this.attributes.setNamedItemNS(v)},removeAttributeNode:function(v){return this.attributes.removeNamedItem(v.nodeName)},removeAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);R&&this.removeAttributeNode(R)},hasAttributeNS:function(v,y){return this.getAttributeNodeNS(v,y)!=null},getAttributeNS:function(v,y){var R=this.getAttributeNodeNS(v,y);return R?R.value:null},setAttributeNS:function(v,y,R){var G=H(v,y),re=G[2],ae=this.getAttributeNodeNS(v,re);ae?ae.value=ae.nodeValue=""+R:(ae=this.ownerDocument.createAttributeNS(v,y),ae.value=ae.nodeValue=""+R,this.setAttributeNode(ae))},getAttributeNodeNS:function(v,y){return this.attributes.getNamedItemNS(v,y)},getElementsByClassName:function(v){var y=_(v);return new X(this,function(R){var G=[];return y.length>0&&De(R,function(re){if(re!==R&&re.nodeType===F){var ae=re.getAttribute("class");if(ae){var ke=v===ae;if(!ke){var nt=_(ae);ke=y.every(D(nt))}ke&&G.push(re)}}}),G})},getElementsByTagName:function(v){var y=(this.nodeType===P?this:this.ownerDocument).type==="html",R=v.toLowerCase();return new X(this,function(G){var re=[];return De(G,function(ae){if(!(ae===G||ae.nodeType!==F))if(v==="*")re.push(ae);else{var ke=ae.getQualifiedName(),nt=y&&ae.namespaceURI===c.HTML?R:v;ke===nt&&re.push(ae)}}),re})},getElementsByTagNameNS:function(v,y){return new X(this,function(R){var G=[];return De(R,function(re){re!==R&&re.nodeType===F&&(v==="*"||re.namespaceURI===v)&&(y==="*"||re.localName==y)&&G.push(re)}),G})}},oe.prototype.getElementsByClassName=$e.prototype.getElementsByClassName,oe.prototype.getElementsByTagName=$e.prototype.getElementsByTagName,oe.prototype.getElementsByTagNameNS=$e.prototype.getElementsByTagNameNS,V($e,se);function ft(v){b(v),this.namespaceURI=null,this.prefix=null,this.ownerElement=null}ft.prototype.nodeType=Y,V(ft,se);function bt(v){b(v)}bt.prototype={data:"",substringData:function(v,y){return this.data.substring(v,v+y)},appendData:function(v){v=this.data+v,this.nodeValue=this.data=v,this.length=v.length},insertData:function(v,y){this.replaceData(v,0,y)},deleteData:function(v,y){this.replaceData(v,y,"")},replaceData:function(v,y,R){var G=this.data.substring(0,v),re=this.data.substring(v+y);R=G+R+re,this.nodeValue=this.data=R,this.length=R.length}},V(bt,se);function on(v){b(v)}on.prototype={nodeName:"#text",nodeType:N,splitText:function(v){var y=this.data,R=y.substring(v);y=y.substring(0,v),this.data=this.nodeValue=y,this.length=y.length;var G=this.ownerDocument.createTextNode(R);return this.parentNode&&this.parentNode.insertBefore(G,this.nextSibling),G}},V(on,bt);function sn(v){b(v)}sn.prototype={nodeName:"#comment",nodeType:A},V(sn,bt);function Cn(v){b(v)}Cn.prototype={nodeName:"#cdata-section",nodeType:M},V(Cn,on);function an(v){b(v)}an.prototype.nodeType=L,V(an,se);function ln(v){b(v)}ln.prototype.nodeType=K,V(ln,se);function kt(v){b(v)}kt.prototype.nodeType=I,V(kt,se);function cn(v){b(v)}cn.prototype.nodeType=S,V(cn,se);function un(v){b(v)}un.prototype.nodeName="#document-fragment",un.prototype.nodeType=J,V(un,se);function Kt(v){b(v)}Kt.prototype.nodeType=T,V(Kt,bt);function Fn(){}Fn.prototype.serializeToString=function(v,y){return Pe.call(v,y)},se.prototype.toString=Pe;function Pe(v){var y=[],R=this.nodeType===P&&this.documentElement||this,G=R.prefix,re=R.namespaceURI;if(re&&G==null){var G=R.lookupPrefix(re);if(G==null)var ae=[{namespace:re,prefix:null}]}return Ft(this,y,v,ae),y.join("")}function Ze(v,y,R){var G=v.prefix||"",re=v.namespaceURI;if(!re||G==="xml"&&re===c.XML||re===c.XMLNS)return!1;for(var ae=R.length;ae--;){var ke=R[ae];if(ke.prefix===G)return ke.namespace!==re}return!0}function Pt(v,y,R){v.push(" ",y,'="',R.replace(/[<>&"\t\n\r]/g,_e),'"')}function Ft(v,y,R,G){G||(G=[]);var re=v.nodeType===P?v:v.ownerDocument,ae=re.type==="html";if(R)if(v=R(v),v){if(typeof v=="string"){y.push(v);return}}else return;switch(v.nodeType){case F:var ke=v.attributes,nt=ke.length,ut=v.firstChild,lt=v.tagName,Nt=lt;if(!ae&&!v.prefix&&v.namespaceURI){for(var ht,Xe=0;Xe<ke.length;Xe++)if(ke.item(Xe).name==="xmlns"){ht=ke.item(Xe).value;break}if(!ht)for(var dn=G.length-1;dn>=0;dn--){var Rt=G[dn];if(Rt.prefix===""&&Rt.namespace===v.namespaceURI){ht=Rt.namespace;break}}if(ht!==v.namespaceURI)for(var dn=G.length-1;dn>=0;dn--){var Rt=G[dn];if(Rt.namespace===v.namespaceURI){Rt.prefix&&(Nt=Rt.prefix+":"+lt);break}}}y.push("<",Nt);for(var kn=0;kn<nt;kn++){var Yt=ke.item(kn);Yt.prefix=="xmlns"?G.push({prefix:Yt.localName,namespace:Yt.value}):Yt.nodeName=="xmlns"&&G.push({prefix:"",namespace:Yt.value})}for(var kn=0;kn<nt;kn++){var Yt=ke.item(kn);if(Ze(Yt,ae,G)){var Nn=Yt.prefix||"",ct=Yt.namespaceURI;Pt(y,Nn?"xmlns:"+Nn:"xmlns",ct),G.push({prefix:Nn,namespace:ct})}Ft(Yt,y,R,G)}if(lt===Nt&&Ze(v,ae,G)){var Nn=v.prefix||"",ct=v.namespaceURI;Pt(y,Nn?"xmlns:"+Nn:"xmlns",ct),G.push({prefix:Nn,namespace:ct})}var zr=!ut;if(zr&&(ae||v.namespaceURI===c.HTML)&&(zr=s(lt)),zr)y.push("/>");else{if(y.push(">"),ae&&i(lt))for(;ut;)ut.data?y.push(ut.data):Ft(ut,y,R,G.slice()),ut=ut.nextSibling;else for(;ut;)Ft(ut,y,R,G.slice()),ut=ut.nextSibling;y.push("</",Nt,">")}return;case P:case J:for(var ut=v.firstChild;ut;)Ft(ut,y,R,G.slice()),ut=ut.nextSibling;return;case Y:return Pt(y,v.name,v.value);case N:return y.push(v.data.replace(/[<&>]/g,_e));case M:return y.push(h.CDATA_START,v.data,h.CDATA_END);case A:return y.push(h.COMMENT_START,v.data,h.COMMENT_END);case L:var So=v.publicId,Bn=v.systemId;y.push(h.DOCTYPE_DECL_START," ",v.name),So?(y.push(" ",h.PUBLIC," ",So),Bn&&Bn!=="."&&y.push(" ",Bn)):Bn&&Bn!=="."&&y.push(" ",h.SYSTEM," ",Bn),v.internalSubset&&y.push(" [",v.internalSubset,"]"),y.push(">");return;case T:return y.push("<?",v.target," ",v.data,"?>");case S:return y.push("&",v.nodeName,";");default:y.push("??",v.nodeName)}}function En(v,y,R){var G;switch(y.nodeType){case F:G=y.cloneNode(!1),G.ownerDocument=v;case J:break;case Y:R=!0;break}if(G||(G=y.cloneNode(!1)),G.ownerDocument=v,G.parentNode=null,R)for(var re=y.firstChild;re;)G.appendChild(En(v,re,R)),re=re.nextSibling;return G}function mr(v,y,R){var G=new y.constructor(u);for(var re in y)if(r(y,re)){var ae=y[re];typeof ae!="object"&&ae!=G[re]&&(G[re]=ae)}switch(y.childNodes&&(G.childNodes=new Z),G.ownerDocument=v,G.nodeType){case F:var ke=y.attributes,nt=G.attributes=new ce,lt=ke.length;nt._ownerElement=G;for(var Nt=0;Nt<lt;Nt++)G.setAttributeNode(mr(v,ke.item(Nt),!0));break;case Y:R=!0}if(R)for(var ht=y.firstChild;ht;)G.appendChild(mr(v,ht,R)),ht=ht.nextSibling;return G}function gn(v,y,R){v[y]=R}try{if(Object.defineProperty){let v=function(y){switch(y.nodeType){case F:case J:var R=[];for(y=y.firstChild;y;)y.nodeType!==7&&y.nodeType!==8&&R.push(v(y)),y=y.nextSibling;return R.join("");default:return y.nodeValue}};Object.defineProperty(X.prototype,"length",{get:function(){return le(this),this.$$length}}),Object.defineProperty(se.prototype,"textContent",{get:function(){return v(this)},set:function(y){switch(this.nodeType){case F:case J:for(;this.firstChild;)this.removeChild(this.firstChild);(y||String(y))&&this.appendChild(this.ownerDocument.createTextNode(y));break;default:this.data=y,this.value=y,this.nodeValue=y}}}),gn=function(y,R,G){y["$$"+R]=G}}}catch{}return rt._updateLiveList=le,rt.Attr=ft,rt.CDATASection=Cn,rt.CharacterData=bt,rt.Comment=sn,rt.Document=oe,rt.DocumentFragment=un,rt.DocumentType=an,rt.DOMImplementation=we,rt.Element=$e,rt.Entity=kt,rt.EntityReference=cn,rt.LiveNodeList=X,rt.NamedNodeMap=ce,rt.Node=se,rt.NodeList=Z,rt.Notation=ln,rt.Text=on,rt.ProcessingInstruction=Kt,rt.XMLSerializer=Fn,rt}var Wr={},$l={},Kd;function Px(){return Kd||(Kd=1,function(t){var e=di().freeze;t.XML_ENTITIES=e({amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}),t.HTML_ENTITIES=e({Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",AMP:"&",amp:"&",And:"⩓",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",ap:"≈",apacir:"⩯",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",Barwed:"⌆",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",Because:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxDL:"╗",boxDl:"╖",boxdL:"╕",boxdl:"┐",boxDR:"╔",boxDr:"╓",boxdR:"╒",boxdr:"┌",boxH:"═",boxh:"─",boxHD:"╦",boxHd:"╤",boxhD:"╥",boxhd:"┬",boxHU:"╩",boxHu:"╧",boxhU:"╨",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxUL:"╝",boxUl:"╜",boxuL:"╛",boxul:"┘",boxUR:"╚",boxUr:"╙",boxuR:"╘",boxur:"└",boxV:"║",boxv:"│",boxVH:"╬",boxVh:"╫",boxvH:"╪",boxvh:"┼",boxVL:"╣",boxVl:"╢",boxvL:"╡",boxvl:"┤",boxVR:"╠",boxVr:"╟",boxvR:"╞",boxvr:"├",bprime:"‵",Breve:"˘",breve:"˘",brvbar:"¦",Bscr:"ℬ",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",Cap:"⋒",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",CenterDot:"·",centerdot:"·",Cfr:"ℭ",cfr:"𝔠",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",Colon:"∷",colon:":",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",Conint:"∯",conint:"∮",ContourIntegral:"∮",Copf:"ℂ",copf:"𝕔",coprod:"∐",Coproduct:"∐",COPY:"©",copy:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",Cross:"⨯",cross:"✗",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",Cup:"⋓",cup:"∪",cupbrcap:"⩈",CupCap:"≍",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",Dagger:"‡",dagger:"†",daleth:"ℸ",Darr:"↡",dArr:"⇓",darr:"↓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",DD:"ⅅ",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",Diamond:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",Downarrow:"⇓",downarrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",ecir:"≖",Ecirc:"Ê",ecirc:"ê",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",eDot:"≑",edot:"ė",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",Escr:"ℰ",escr:"ℯ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",ExponentialE:"ⅇ",exponentiale:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",ForAll:"∀",forall:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",Fscr:"ℱ",fscr:"𝒻",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",gE:"≧",ge:"≥",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",Gg:"⋙",gg:"≫",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gnE:"≩",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",Gt:"≫",GT:">",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",hArr:"⇔",harr:"↔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",Hfr:"ℌ",hfr:"𝔥",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",Hopf:"ℍ",hopf:"𝕙",horbar:"―",HorizontalLine:"─",Hscr:"ℋ",hscr:"𝒽",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",Ifr:"ℑ",ifr:"𝔦",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Im:"ℑ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",Int:"∬",int:"∫",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",Iscr:"ℐ",iscr:"𝒾",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",Lang:"⟪",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",Larr:"↞",lArr:"⇐",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",lAtail:"⤛",latail:"⤙",late:"⪭",lates:"⪭︀",lBarr:"⤎",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",lE:"≦",le:"≤",LeftAngleBracket:"⟨",LeftArrow:"←",Leftarrow:"⇐",leftarrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",Ll:"⋘",ll:"≪",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lnE:"≨",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftarrow:"⟵",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longleftrightarrow:"⟷",longmapsto:"⟼",LongRightArrow:"⟶",Longrightarrow:"⟹",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",Lscr:"ℒ",lscr:"𝓁",Lsh:"↰",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",Lt:"≪",LT:"<",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",Mscr:"ℳ",mscr:"𝓂",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",ne:"≠",nearhk:"⤤",neArr:"⇗",nearr:"↗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlArr:"⇍",nlarr:"↚",nldr:"‥",nlE:"≦̸",nle:"≰",nLeftarrow:"⇍",nleftarrow:"↚",nLeftrightarrow:"⇎",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",nopf:"𝕟",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nRightarrow:"⇏",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nVDash:"⊯",nVdash:"⊮",nvDash:"⊭",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwArr:"⇖",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",ocir:"⊚",Ocirc:"Ô",ocirc:"ô",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",Or:"⩔",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",Otimes:"⨷",otimes:"⊗",otimesas:"⨶",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",Popf:"ℙ",popf:"𝕡",pound:"£",Pr:"⪻",pr:"≺",prap:"⪷",prcue:"≼",prE:"⪳",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",Prime:"″",prime:"′",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",Qopf:"ℚ",qopf:"𝕢",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",QUOT:'"',quot:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",Rang:"⟫",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",Rarr:"↠",rArr:"⇒",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",rAtail:"⤜",ratail:"⤚",ratio:"∶",rationals:"ℚ",RBarr:"⤐",rBarr:"⤏",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",REG:"®",reg:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",Rfr:"ℜ",rfr:"𝔯",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrow:"→",Rightarrow:"⇒",rightarrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",Ropf:"ℝ",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",Rscr:"ℛ",rscr:"𝓇",Rsh:"↱",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",Sc:"⪼",sc:"≻",scap:"⪸",Scaron:"Š",scaron:"š",sccue:"≽",scE:"⪴",sce:"⪰",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",seArr:"⇘",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",Square:"□",square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",Sub:"⋐",sub:"⊂",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",Subset:"⋐",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",Sum:"∑",sum:"∑",sung:"♪",Sup:"⋑",sup:"⊃",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",Supset:"⋑",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swArr:"⇙",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",Therefore:"∴",therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",Tilde:"∼",tilde:"˜",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",TRADE:"™",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",Uarr:"↟",uArr:"⇑",uarr:"↑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrow:"↑",Uparrow:"⇑",uparrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",Updownarrow:"⇕",updownarrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",upsi:"υ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",vArr:"⇕",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",Vbar:"⫫",vBar:"⫨",vBarv:"⫩",Vcy:"В",vcy:"в",VDash:"⊫",Vdash:"⊩",vDash:"⊨",vdash:"⊢",Vdashl:"⫦",Vee:"⋁",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",Verbar:"‖",verbar:"|",Vert:"‖",vert:"|",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",Wedge:"⋀",wedge:"∧",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",Xi:"Ξ",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",Yuml:"Ÿ",yuml:"ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",Zfr:"ℨ",zfr:"𝔷",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",Zopf:"ℤ",zopf:"𝕫",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}),t.entityMap=t.HTML_ENTITIES}($l)),$l}var Ti={},Yd;function Fx(){if(Yd)return Ti;Yd=1;var t=di(),e=bw(),n=Wa(),r=t.isHTMLEscapableRawTextElement,o=t.isHTMLMimeType,i=t.isHTMLRawTextElement,s=t.hasOwn,a=t.NAMESPACE,c=n.ParseError,u=n.DOMException,d=0,p=1,f=2,h=3,b=4,x=5,E=6,C=7;function _(){}_.prototype={parse:function(T,A,P){var L=this.domBuilder;L.startDocument(),F(A,A=Object.create(null)),$(T,A,P,L,this.errorHandler),L.endDocument()}};var D=/&#?\w+;?/g;function $(T,A,P,L,J){var K=o(L.mimeType);T.indexOf(e.UNICODE_REPLACEMENT_CHARACTER)>=0&&J.warning("Unicode replacement character detected, source encoding issues?");function W(fe){if(fe>65535){fe-=65536;var $e=55296+(fe>>10),ft=56320+(fe&1023);return String.fromCharCode($e,ft)}else return String.fromCharCode(fe)}function ee(fe){var $e=fe[fe.length-1]===";"?fe:fe+";";if(!K&&$e!==fe)return J.error("EntityRef: expecting ;"),fe;var ft=e.Reference.exec($e);if(!ft||ft[0].length!==$e.length)return J.error("entity not matching Reference production: "+fe),fe;var bt=$e.slice(1,-1);return s(P,bt)?P[bt]:bt.charAt(0)==="#"?W(parseInt(bt.substring(1).replace("x","0x"))):(J.error("entity not found:"+fe),fe)}function te(fe){if(fe>we){var $e=T.substring(we,fe).replace(D,ee);ce&&ue(we),L.characters($e,0,fe-we),we=fe}}var Z=0,X=0,le=/\r\n?|\n|$/g,ce=L.locator;function ue(fe,$e){for(;fe>=X&&($e=le.exec(T));)Z=X,X=$e.index+$e[0].length,ce.lineNumber++;ce.columnNumber=fe-Z+1}for(var ge=[{currentNSMap:A}],he=[],we=0;;){try{var se=T.indexOf("<",we);if(se<0){if(!K&&he.length>0)return J.fatalError("unclosed xml tag(s): "+he.join(", "));if(!T.substring(we).match(/^\s*$/)){var _e=L.doc,De=_e.createTextNode(T.substring(we));if(_e.documentElement)return J.error("Extra content at the end of the document");_e.appendChild(De),L.currentElement=De}return}if(se>we){var oe=T.substring(we,se);!K&&he.length===0&&(oe=oe.replace(new RegExp(e.S_OPT.source,"g"),""),oe&&J.error("Unexpected content outside root element: '"+oe+"'")),te(se)}switch(T.charAt(se+1)){case"/":var ze=T.indexOf(">",se+2),me=T.substring(se+2,ze>0?ze:void 0);if(!me)return J.fatalError("end tag name missing");var Ne=ze>0&&e.reg("^",e.QName_group,e.S_OPT,"$").exec(me);if(!Ne)return J.fatalError('end tag name contains invalid characters: "'+me+'"');if(!L.currentElement&&!L.doc.documentElement)return;var Oe=he[he.length-1]||L.currentElement.tagName||L.doc.documentElement.tagName||"";if(Oe!==Ne[1]){var Be=Ne[1].toLowerCase();if(!K||Oe.toLowerCase()!==Be)return J.fatalError('Opening and ending tag mismatch: "'+Oe+'" != "'+me+'"')}var tt=ge.pop();he.pop();var Qe=tt.localNSMap;if(L.endElement(tt.uri,tt.localName,Oe),Qe)for(var st in Qe)s(Qe,st)&&L.endPrefixMapping(st);ze++;break;case"?":ce&&ue(se),ze=S(T,se,L,J);break;case"!":ce&&ue(se),ze=M(T,se,L,J,K);break;default:ce&&ue(se);var Ee=new I,pt=ge[ge.length-1].currentNSMap,ze=O(T,se,Ee,pt,ee,J,K),_n=Ee.length;if(Ee.closed||(K&&t.isHTMLVoidElement(Ee.tagName)?Ee.closed=!0:he.push(Ee.tagName)),ce&&_n){for(var nn=H(ce,{}),Gt=0;Gt<_n;Gt++){var rn=Ee[Gt];ue(rn.offset),rn.locator=H(ce,{})}L.locator=nn,V(Ee,L,pt)&&ge.push(Ee),L.locator=ce}else V(Ee,L,pt)&&ge.push(Ee);K&&!Ee.closed?ze=B(T,ze,Ee.tagName,ee,L):ze++}}catch(fe){if(fe instanceof c)throw fe;if(fe instanceof u)throw new c(fe.name+": "+fe.message,L.locator,fe);J.error("element parse error: "+fe),ze=-1}ze>we?we=ze:te(Math.max(se,we)+1)}}function H(T,A){return A.lineNumber=T.lineNumber,A.columnNumber=T.columnNumber,A}function O(T,A,P,L,J,K,W){function ee(ue,ge,he){if(s(P.attributeNames,ue))return K.fatalError("Attribute "+ue+" redefined");if(!W&&ge.indexOf("<")>=0)return K.fatalError("Unescaped '<' not allowed in attributes values");P.addValue(ue,ge.replace(/[\t\n\r]/g," ").replace(D,J),he)}for(var te,Z,X=++A,le=d;;){var ce=T.charAt(X);switch(ce){case"=":if(le===p)te=T.slice(A,X),le=h;else if(le===f)le=h;else throw new Error("attribute equal must after attrName");break;case"'":case'"':if(le===h||le===p)if(le===p&&(K.warning('attribute value must after "="'),te=T.slice(A,X)),A=X+1,X=T.indexOf(ce,A),X>0)Z=T.slice(A,X),ee(te,Z,A-1),le=x;else throw new Error("attribute value no end '"+ce+"' match");else if(le==b)Z=T.slice(A,X),ee(te,Z,A),K.warning('attribute "'+te+'" missed start quot('+ce+")!!"),A=X+1,le=x;else throw new Error('attribute value must after "="');break;case"/":switch(le){case d:P.setTagName(T.slice(A,X));case x:case E:case C:le=C,P.closed=!0;case b:case p:break;case f:P.closed=!0;break;default:throw new Error("attribute invalid close char('/')")}break;case"":return K.error("unexpected end of input"),le==d&&P.setTagName(T.slice(A,X)),X;case">":switch(le){case d:P.setTagName(T.slice(A,X));case x:case E:case C:break;case b:case p:Z=T.slice(A,X),Z.slice(-1)==="/"&&(P.closed=!0,Z=Z.slice(0,-1));case f:le===f&&(Z=te),le==b?(K.warning('attribute "'+Z+'" missed quot(")!'),ee(te,Z,A)):(W||K.warning('attribute "'+Z+'" missed value!! "'+Z+'" instead!!'),ee(Z,Z,A));break;case h:if(!W)return K.fatalError(`AttValue: ' or " expected`)}return X;case"":ce=" ";default:if(ce<=" ")switch(le){case d:P.setTagName(T.slice(A,X)),le=E;break;case p:te=T.slice(A,X),le=f;break;case b:var Z=T.slice(A,X);K.warning('attribute "'+Z+'" missed quot(")!!'),ee(te,Z,A);case x:le=E;break}else switch(le){case f:W||K.warning('attribute "'+te+'" missed value!! "'+te+'" instead2!!'),ee(te,te,A),A=X,le=p;break;case x:K.warning('attribute space is required"'+te+'"!!');case E:le=p,A=X;break;case h:le=b,A=X;break;case C:throw new Error("elements closed character '/' and '>' must be connected to")}}X++}}function V(T,A,P){for(var L=T.tagName,J=null,le=T.length;le--;){var K=T[le],W=K.qName,ee=K.value,ce=W.indexOf(":");if(ce>0)var te=K.prefix=W.slice(0,ce),Z=W.slice(ce+1),X=te==="xmlns"&&Z;else Z=W,te=null,X=W==="xmlns"&&"";K.localName=Z,X!==!1&&(J==null&&(J=Object.create(null),F(P,P=Object.create(null))),P[X]=J[X]=ee,K.uri=a.XMLNS,A.startPrefixMapping(X,ee))}for(var le=T.length;le--;)K=T[le],K.prefix&&(K.prefix==="xml"&&(K.uri=a.XML),K.prefix!=="xmlns"&&(K.uri=P[K.prefix]));var ce=L.indexOf(":");ce>0?(te=T.prefix=L.slice(0,ce),Z=T.localName=L.slice(ce+1)):(te=null,Z=T.localName=L);var ue=T.uri=P[te||""];if(A.startElement(ue,Z,L,T),T.closed){if(A.endElement(ue,Z,L),J)for(te in J)s(J,te)&&A.endPrefixMapping(te)}else return T.currentNSMap=P,T.localNSMap=J,!0}function B(T,A,P,L,J){var K=r(P);if(K||i(P)){var W=T.indexOf("</"+P+">",A),ee=T.substring(A+1,W);return K&&(ee=ee.replace(D,L)),J.characters(ee,0,ee.length),W}return A+1}function F(T,A){for(var P in T)s(T,P)&&(A[P]=T[P])}function Y(T,A){var P=A;function L(X){return X=X||0,T.charAt(P+X)}function J(X){X=X||1,P+=X}function K(){for(var X=0;P<T.length;){var le=L();if(le!==" "&&le!==`
`&&le!=="	"&&le!=="\r")return X;X++,J()}return-1}function W(){return T.substring(P)}function ee(X){return T.substring(P,P+X.length)===X}function te(X){return T.substring(P,P+X.length).toUpperCase()===X.toUpperCase()}function Z(X){var le=e.reg("^",X),ce=le.exec(W());return ce?(J(ce[0].length),ce[0]):null}return{char:L,getIndex:function(){return P},getMatch:Z,getSource:function(){return T},skip:J,skipBlanks:K,substringFromIndex:W,substringStartsWith:ee,substringStartsWithCaseInsensitive:te}}function N(T,A){function P(ee,te){var Z=e.PI.exec(ee.substringFromIndex());return Z?Z[1].toLowerCase()==="xml"?te.fatalError("xml declaration is only allowed at the start of the document, but found at position "+ee.getIndex()):(ee.skip(Z[0].length),Z[0]):te.fatalError("processing instruction is not well-formed at position "+ee.getIndex())}var L=T.getSource();if(T.char()==="["){T.skip(1);for(var J=T.getIndex();T.getIndex()<L.length;){if(T.skipBlanks(),T.char()==="]"){var K=L.substring(J,T.getIndex());return T.skip(1),K}var W=null;if(T.char()==="<"&&T.char(1)==="!")switch(T.char(2)){case"E":T.char(3)==="L"?W=T.getMatch(e.elementdecl):T.char(3)==="N"&&(W=T.getMatch(e.EntityDecl));break;case"A":W=T.getMatch(e.AttlistDecl);break;case"N":W=T.getMatch(e.NotationDecl);break;case"-":W=T.getMatch(e.Comment);break}else if(T.char()==="<"&&T.char(1)==="?")W=P(T,A);else if(T.char()==="%")W=T.getMatch(e.PEReference);else return A.fatalError("Error detected in Markup declaration");if(!W)return A.fatalError("Error in internal subset at position "+T.getIndex())}return A.fatalError("doctype internal subset is not well-formed, missing ]")}}function M(T,A,P,L,J){var K=Y(T,A);switch(J?K.char(2).toUpperCase():K.char(2)){case"-":var W=K.getMatch(e.Comment);return W?(P.comment(W,e.COMMENT_START.length,W.length-e.COMMENT_START.length-e.COMMENT_END.length),K.getIndex()):L.fatalError("comment is not well-formed at position "+K.getIndex());case"[":var ee=K.getMatch(e.CDSect);return ee?!J&&!P.currentElement?L.fatalError("CDATA outside of element"):(P.startCDATA(),P.characters(ee,e.CDATA_START.length,ee.length-e.CDATA_START.length-e.CDATA_END.length),P.endCDATA(),K.getIndex()):L.fatalError("Invalid CDATA starting at position "+A);case"D":{if(P.doc&&P.doc.documentElement)return L.fatalError("Doctype not allowed inside or after documentElement at position "+K.getIndex());if(J?!K.substringStartsWithCaseInsensitive(e.DOCTYPE_DECL_START):!K.substringStartsWith(e.DOCTYPE_DECL_START))return L.fatalError("Expected "+e.DOCTYPE_DECL_START+" at position "+K.getIndex());if(K.skip(e.DOCTYPE_DECL_START.length),K.skipBlanks()<1)return L.fatalError("Expected whitespace after "+e.DOCTYPE_DECL_START+" at position "+K.getIndex());var te={name:void 0,publicId:void 0,systemId:void 0,internalSubset:void 0};if(te.name=K.getMatch(e.Name),!te.name)return L.fatalError("doctype name missing or contains unexpected characters at position "+K.getIndex());if(J&&te.name.toLowerCase()!=="html"&&L.warning("Unexpected DOCTYPE in HTML document at position "+K.getIndex()),K.skipBlanks(),K.substringStartsWith(e.PUBLIC)||K.substringStartsWith(e.SYSTEM)){var Z=e.ExternalID_match.exec(K.substringFromIndex());if(!Z)return L.fatalError("doctype external id is not well-formed at position "+K.getIndex());Z.groups.SystemLiteralOnly!==void 0?te.systemId=Z.groups.SystemLiteralOnly:(te.systemId=Z.groups.SystemLiteral,te.publicId=Z.groups.PubidLiteral),K.skip(Z[0].length)}else if(J&&K.substringStartsWithCaseInsensitive(e.SYSTEM)){if(K.skip(e.SYSTEM.length),K.skipBlanks()<1)return L.fatalError("Expected whitespace after "+e.SYSTEM+" at position "+K.getIndex());if(te.systemId=K.getMatch(e.ABOUT_LEGACY_COMPAT_SystemLiteral),!te.systemId)return L.fatalError("Expected "+e.ABOUT_LEGACY_COMPAT+" in single or double quotes after "+e.SYSTEM+" at position "+K.getIndex())}return J&&te.systemId&&!e.ABOUT_LEGACY_COMPAT_SystemLiteral.test(te.systemId)&&L.warning("Unexpected doctype.systemId in HTML document at position "+K.getIndex()),J||(K.skipBlanks(),te.internalSubset=N(K,L)),K.skipBlanks(),K.char()!==">"?L.fatalError("doctype not terminated with > at position "+K.getIndex()):(K.skip(1),P.startDTD(te.name,te.publicId,te.systemId,te.internalSubset),P.endDTD(),K.getIndex())}default:return L.fatalError('Not well-formed XML starting with "<!" at position '+A)}}function S(T,A,P,L){var J=T.substring(A).match(e.PI);if(!J)return L.fatalError("Invalid processing instruction starting at position "+A);if(J[1].toLowerCase()==="xml"){if(A>0)return L.fatalError("processing instruction at position "+A+" is an xml declaration which is only at the start of the document");if(!e.XMLDecl.test(T.substring(A)))return L.fatalError("xml declaration is not well-formed")}return P.processingInstruction(J[1],J[2]),A+J[0].length}function I(){this.attributeNames=Object.create(null)}return I.prototype={setTagName:function(T){if(!e.QName_exact.test(T))throw new Error("invalid tagName:"+T);this.tagName=T},addValue:function(T,A,P){if(!e.QName_exact.test(T))throw new Error("invalid attribute:"+T);this.attributeNames[T]=this.length,this[this.length++]={qName:T,value:A,offset:P}},length:0,getLocalName:function(T){return this[T].localName},getLocator:function(T){return this[T].locator},getQName:function(T){return this[T].qName},getURI:function(T){return this[T].uri},getValue:function(T){return this[T].value}},Ti.XMLReader=_,Ti.parseUtils=Y,Ti.parseDoctypeCommentOrCData=M,Ti}var Wd;function Bx(){if(Wd)return Wr;Wd=1;var t=di(),e=vw(),n=Wa(),r=Px(),o=Fx(),i=e.DOMImplementation,s=t.hasDefaultHTMLNamespace,a=t.isHTMLMimeType,c=t.isValidMimeType,u=t.MIME_TYPE,d=t.NAMESPACE,p=n.ParseError,f=o.XMLReader;function h(O){return O.replace(/\r[\n\u0085]/g,`
`).replace(/[\r\u0085\u2028\u2029]/g,`
`)}function b(O){if(O=O||{},O.locator===void 0&&(O.locator=!0),this.assign=O.assign||t.assign,this.domHandler=O.domHandler||x,this.onError=O.onError||O.errorHandler,O.errorHandler&&typeof O.errorHandler!="function")throw new TypeError("errorHandler object is no longer supported, switch to onError!");O.errorHandler&&O.errorHandler("warning","The `errorHandler` option has been deprecated, use `onError` instead!",this),this.normalizeLineEndings=O.normalizeLineEndings||h,this.locator=!!O.locator,this.xmlns=this.assign(Object.create(null),O.xmlns)}b.prototype.parseFromString=function(O,V){if(!c(V))throw new TypeError('DOMParser.parseFromString: the provided mimeType "'+V+'" is not valid.');var B=this.assign(Object.create(null),this.xmlns),F=r.XML_ENTITIES,Y=B[""]||null;s(V)?(F=r.HTML_ENTITIES,Y=d.HTML):V===u.XML_SVG_IMAGE&&(Y=d.SVG),B[""]=Y,B.xml=B.xml||d.XML;var N=new this.domHandler({mimeType:V,defaultNamespace:Y,onError:this.onError}),M=this.locator?{}:void 0;this.locator&&N.setDocumentLocator(M);var S=new f;S.errorHandler=N,S.domBuilder=N;var I=!t.isHTMLMimeType(V);return I&&typeof O!="string"&&S.errorHandler.fatalError("source is not a string"),S.parse(this.normalizeLineEndings(String(O)),B,F),N.doc.documentElement||S.errorHandler.fatalError("missing root element"),N.doc};function x(O){var V=O||{};this.mimeType=V.mimeType||u.XML_APPLICATION,this.defaultNamespace=V.defaultNamespace||null,this.cdata=!1,this.currentElement=void 0,this.doc=void 0,this.locator=void 0,this.onError=V.onError}function E(O,V){V.lineNumber=O.lineNumber,V.columnNumber=O.columnNumber}x.prototype={startDocument:function(){var O=new i;this.doc=a(this.mimeType)?O.createHTMLDocument(!1):O.createDocument(this.defaultNamespace,"")},startElement:function(O,V,B,F){var Y=this.doc,N=Y.createElementNS(O,B||V),M=F.length;D(this,N),this.currentElement=N,this.locator&&E(this.locator,N);for(var S=0;S<M;S++){var O=F.getURI(S),I=F.getValue(S),B=F.getQName(S),T=Y.createAttributeNS(O,B);this.locator&&E(F.getLocator(S),T),T.value=T.nodeValue=I,N.setAttributeNode(T)}},endElement:function(O,V,B){this.currentElement=this.currentElement.parentNode},startPrefixMapping:function(O,V){},endPrefixMapping:function(O){},processingInstruction:function(O,V){var B=this.doc.createProcessingInstruction(O,V);this.locator&&E(this.locator,B),D(this,B)},ignorableWhitespace:function(O,V,B){},characters:function(O,V,B){if(O=_.apply(this,arguments),O){if(this.cdata)var F=this.doc.createCDATASection(O);else var F=this.doc.createTextNode(O);this.currentElement?this.currentElement.appendChild(F):/^\s*$/.test(O)&&this.doc.appendChild(F),this.locator&&E(this.locator,F)}},skippedEntity:function(O){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(O){O&&(O.lineNumber=0),this.locator=O},comment:function(O,V,B){O=_.apply(this,arguments);var F=this.doc.createComment(O);this.locator&&E(this.locator,F),D(this,F)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(O,V,B,F){var Y=this.doc.implementation;if(Y&&Y.createDocumentType){var N=Y.createDocumentType(O,V,B,F);this.locator&&E(this.locator,N),D(this,N),this.doc.doctype=N}},reportError:function(O,V){if(typeof this.onError=="function")try{this.onError(O,V,this)}catch(B){throw new p("Reporting "+O+' "'+V+'" caused '+B,this.locator)}else console.error("[xmldom "+O+"]	"+V,C(this.locator))},warning:function(O){this.reportError("warning",O)},error:function(O){this.reportError("error",O)},fatalError:function(O){throw this.reportError("fatalError",O),new p(O,this.locator)}};function C(O){if(O)return`
@#[line:`+O.lineNumber+",col:"+O.columnNumber+"]"}function _(O,V,B){return typeof O=="string"?O.substr(V,B):O.length>=V+B||V?new java.lang.String(O,V,B)+"":O}"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(O){x.prototype[O]=function(){return null}});function D(O,V){O.currentElement?O.currentElement.appendChild(V):O.doc.appendChild(V)}function $(O){if(O==="error")throw"onErrorStopParsing"}function H(){throw"onWarningStopParsing"}return Wr.__DOMHandler=x,Wr.DOMParser=b,Wr.normalizeLineEndings=h,Wr.onErrorStopParsing=$,Wr.onWarningStopParsing=H,Wr}var Jd;function qx(){if(Jd)return Ae;Jd=1;var t=di();Ae.assign=t.assign,Ae.hasDefaultHTMLNamespace=t.hasDefaultHTMLNamespace,Ae.isHTMLMimeType=t.isHTMLMimeType,Ae.isValidMimeType=t.isValidMimeType,Ae.MIME_TYPE=t.MIME_TYPE,Ae.NAMESPACE=t.NAMESPACE;var e=Wa();Ae.DOMException=e.DOMException,Ae.DOMExceptionName=e.DOMExceptionName,Ae.ExceptionCode=e.ExceptionCode,Ae.ParseError=e.ParseError;var n=vw();Ae.Attr=n.Attr,Ae.CDATASection=n.CDATASection,Ae.CharacterData=n.CharacterData,Ae.Comment=n.Comment,Ae.Document=n.Document,Ae.DocumentFragment=n.DocumentFragment,Ae.DocumentType=n.DocumentType,Ae.DOMImplementation=n.DOMImplementation,Ae.Element=n.Element,Ae.Entity=n.Entity,Ae.EntityReference=n.EntityReference,Ae.LiveNodeList=n.LiveNodeList,Ae.NamedNodeMap=n.NamedNodeMap,Ae.Node=n.Node,Ae.NodeList=n.NodeList,Ae.Notation=n.Notation,Ae.ProcessingInstruction=n.ProcessingInstruction,Ae.Text=n.Text,Ae.XMLSerializer=n.XMLSerializer;var r=Bx();return Ae.DOMParser=r.DOMParser,Ae.normalizeLineEndings=r.normalizeLineEndings,Ae.onErrorStopParsing=r.onErrorStopParsing,Ae.onWarningStopParsing=r.onWarningStopParsing,Ae}qx();const zi="USJ",Gi="3.1",vu=Object.freeze({type:zi,version:Gi,content:[]}),Ux=["type","marker","content","sid","eid","number","code","altnumber","pubnumber","caller","align","category"];function Vx(t){return Hx.includes(t)}const Hx=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","EZA","5EZ","6EZ","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX","XXA","XXB","XXC","XXD","XXE","XXF","XXG"],wc="$",xw=".content[";function zx(t){const e=t.split(xw);if(e.shift()!==wc)throw new Error(`indexesFromJsonPath: jsonPath didn't start with '${wc}'`);return e.map(n=>parseInt(n,10))}function Gx(t){return t.reduce((e,n)=>`${e}${xw}${n}]`,wc)}function Xd(t){let e=t;for(;e!=null;){if(e.nodeType===Node.TEXT_NODE)return e;e=e.firstChild}return null}function Qd(t){const e=t.parentNode;if(e==null)throw new Error("Should never happen");return[e,Array.from(e.childNodes).indexOf(t)]}function Kx(t,e,n,r,o){const i=e.getKey(),s=r.getKey(),a=document.createRange();let c=t.getElementByKey(i),u=t.getElementByKey(s),d=n,p=o;if(g.$isTextNode(e)&&(c=Xd(c)),g.$isTextNode(r)&&(u=Xd(u)),e===void 0||r===void 0||c===null||u===null)return null;c.nodeName==="BR"&&([c,d]=Qd(c)),u.nodeName==="BR"&&([u,p]=Qd(u));const f=c.firstChild;c===u&&f!=null&&f.nodeName==="BR"&&d===0&&p===0&&(p=1);try{a.setStart(c,d),a.setEnd(u,p)}catch{return null}return!a.collapsed||d===p&&i===s||(a.setStart(u,p),a.setEnd(c,d)),a}function Yx(t,e){const n=t.getRootElement();if(n===null)return[];const r=n.getBoundingClientRect(),o=getComputedStyle(n),i=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),s=Array.from(e.getClientRects());let a,c=s.length;s.sort((u,d)=>{const p=u.top-d.top;return Math.abs(p)<=3?u.left-d.left:p});for(let u=0;u<c;u++){const d=s[u],p=a&&a.top<=d.top&&a.top+a.height>d.top&&a.left+a.width>d.left,f=d.width+i===r.width;p||f?(s.splice(u--,1),c--):a=d}return s}function Wx(t,e){const n=t.getStartEndPoints();if(e.isSelected(t)&&!g.$isTokenOrSegmented(e)&&n!==null){const[r,o]=n,i=t.isBackward(),s=r.getNode(),a=o.getNode(),c=e.is(s),u=e.is(a);if(c||u){const[d,p]=g.$getCharacterOffsets(t),f=s.is(a),h=e.is(i?a:s),b=e.is(i?s:a);let x,E=0;f?(E=d>p?p:d,x=d>p?d:p):h?(E=i?p:d,x=void 0):b&&(E=0,x=i?d:p),e.__text=e.__text.slice(E,x)}}return e}function Jx(t,e){const n=t.getFormatType(),r=t.getIndent();n!==e.getFormatType()&&e.setFormat(n),r!==e.getIndent()&&e.setIndent(r)}function Xx(t,e,n=Jx){if(t===null)return;const r=t.getStartEndPoints(),o=new Map;let i=null;if(r){const[s,a]=r;i=g.$createRangeSelection(),i.anchor.set(s.key,s.offset,s.type),i.focus.set(a.key,a.offset,a.type);const c=Pl(s.getNode(),g.INTERNAL_$isBlock),u=Pl(a.getNode(),g.INTERNAL_$isBlock);g.$isElementNode(c)&&o.set(c.getKey(),c),g.$isElementNode(u)&&o.set(u.getKey(),u)}for(const s of t.getNodes())if(g.$isElementNode(s)&&g.INTERNAL_$isBlock(s))o.set(s.getKey(),s);else if(r===null){const a=Pl(s,g.INTERNAL_$isBlock);g.$isElementNode(a)&&o.set(a.getKey(),a)}for(const[s,a]of o){const c=e();n(a,c),a.replace(c,!0),i&&(s===i.anchor.key&&i.anchor.set(c.getKey(),i.anchor.offset,i.anchor.type),s===i.focus.key&&i.focus.set(c.getKey(),i.focus.offset,i.focus.type))}i&&t.is(g.$getSelection())&&g.$setSelection(i)}function yw(t){const e=t.anchor.getNode(),n=g.$isRootNode(e)?e:e.getParentOrThrow(),r=g.$getEditor().getElementByKey(n.getKey());if(r===null)return!1;const o=r.ownerDocument.defaultView;return o===null?!1:o.getComputedStyle(r).writingMode==="vertical-rl"}function Zd(t,e){let n=yw(t)?!e:e;_w(t)&&(n=!n);const r=g.$caretFromPoint(t.focus,n?"previous":"next");if(g.$isExtendableTextPointCaret(r))return!1;for(const o of g.$extendCaretToRange(r)){if(g.$isChildCaret(o))return!o.origin.isInline();if(!g.$isElementNode(o.origin)){if(g.$isDecoratorNode(o.origin))return!0;break}}return!1}function Qx(t,e,n,r){t.modify(e?"extend":"move",n,r)}function _w(t){const e=t.anchor.getNode();return(g.$isRootNode(e)?e:e.getParentOrThrow()).getDirection()==="rtl"}function ep(t,e,n){const r=_w(t);let o;o=yw(t)||r?!n:n,Qx(t,e,o,"character")}function Pl(t,e){let n=t;for(;n!==null&&n.getParent()!==null&&!e(n);)n=n.getParentOrThrow();return e(n)?n:null}const ws=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,Zx=ws&&"documentMode"in document?document.documentMode:null,ey=ws&&/Mac|iPod|iPhone|iPad/.test(navigator.platform),ty=ws&&/^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);!(!ws||!("InputEvent"in window)||Zx)&&"getTargetRanges"in new window.InputEvent("input");function Cw(...t){const e=[];for(const n of t)if(n&&typeof n=="string")for(const[r]of n.matchAll(/\S+/g))e.push(r);return e}function Mt(...t){return()=>{for(let e=t.length-1;e>=0;e--)t[e]();t.length=0}}const ny=ws,gc=ey,ry=ty;function Cr(t,...e){const n=Cw(...e);n.length>0&&t.classList.add(...n)}function mc(t,...e){const n=Cw(...e);n.length>0&&t.classList.remove(...n)}function gs(t,e){return Array.from(oy(t))}function oy(t,e){return iy("next",t)}function iy(t,e,n){const r=g.$getRoot(),o=e||r,i=g.$isElementNode(o)?g.$getChildCaret(o,t):g.$getSiblingCaret(o,t),s=sy(o),a=function(u,d){const p=np(g.$getSiblingCaret(u,d));return p&&p[0]}(o,t);let c=s;return g.makeStepwiseIterator({hasNext:u=>u!==null,initial:i,map:u=>({depth:c,node:u.origin}),step:u=>{if(u.isSameNodeCaret(a))return null;g.$isChildCaret(u)&&c++;const d=np(u);return!d||d[0].isSameNodeCaret(a)?null:(c+=d[1],d[0])}})}function sy(t){let e=-1;for(let n=t;n!==null;n=n.getParent())e++;return e}const Ki=(t,e)=>{let n=t;for(;n!==g.$getRoot()&&n!=null;){if(e(n))return n;n=n.getParent()}return null};function Ew(t,e,n,r){const o=i=>i instanceof e;return t.registerNodeTransform(e,i=>{const s=(a=>{const c=a.getChildren();for(let p=0;p<c.length;p++){const f=c[p];if(o(f))return null}let u=a,d=a;for(;u!==null;)if(d=u,u=u.getParent(),o(u))return{child:d,parent:u};return null})(i);if(s!==null){const{child:a,parent:c}=s;if(a.is(i)){r(c,i);const u=a.getNextSiblings(),d=u.length;if(c.insertAfter(a),d!==0){const p=n(c);a.insertAfter(p);for(let f=0;f<d;f++)p.append(u[f])}c.canBeEmpty()||c.getChildrenSize()!==0||c.remove()}}})}function kw(t,e){return t!==null&&Object.getPrototypeOf(t).constructor.name===e.name}let Fl=!(ry||!ny)&&void 0;function ay(t){let e=1;if(function(){if(Fl===void 0){const n=document.createElement("div");n.style.cssText="position: absolute; opacity: 0; width: 100px; left: -1000px;",document.body.appendChild(n);const r=n.getBoundingClientRect();n.style.setProperty("zoom","2"),Fl=n.getBoundingClientRect().width===r.width,document.body.removeChild(n)}return Fl}())for(;t;)e*=Number(window.getComputedStyle(t).getPropertyValue("zoom")),t=t.parentElement;return e}function tp(t){g.$rewindSiblingCaret(g.$getSiblingCaret(t,"next")).splice(1,t.getChildren())}function np(t,e="root"){let n=0,r=t,o=g.$getAdjacentChildCaret(r);for(;o===null;){if(n--,o=r.getParentCaret(e),!o)return null;r=o,o=g.$getAdjacentChildCaret(r)}return o&&[o,n]}var qs={exports:{}},Bl,rp;function ly(){if(rp)return Bl;rp=1;var t=-1,e=1,n=0;function r(N,M,S,I,T){if(N===M)return N?[[n,N]]:[];if(S!=null){var A=F(N,M,S);if(A)return A}var P=a(N,M),L=N.substring(0,P);N=N.substring(P),M=M.substring(P),P=u(N,M);var J=N.substring(N.length-P);N=N.substring(0,N.length-P),M=M.substring(0,M.length-P);var K=o(N,M);return L&&K.unshift([n,L]),J&&K.push([n,J]),_(K,T),I&&p(K),K}function o(N,M){var S;if(!N)return[[e,M]];if(!M)return[[t,N]];var I=N.length>M.length?N:M,T=N.length>M.length?M:N,A=I.indexOf(T);if(A!==-1)return S=[[e,I.substring(0,A)],[n,T],[e,I.substring(A+T.length)]],N.length>M.length&&(S[0][0]=S[2][0]=t),S;if(T.length===1)return[[t,N],[e,M]];var P=d(N,M);if(P){var L=P[0],J=P[1],K=P[2],W=P[3],ee=P[4],te=r(L,K),Z=r(J,W);return te.concat([[n,ee]],Z)}return i(N,M)}function i(N,M){for(var S=N.length,I=M.length,T=Math.ceil((S+I)/2),A=T,P=2*T,L=new Array(P),J=new Array(P),K=0;K<P;K++)L[K]=-1,J[K]=-1;L[A+1]=0,J[A+1]=0;for(var W=S-I,ee=W%2!==0,te=0,Z=0,X=0,le=0,ce=0;ce<T;ce++){for(var ue=-ce+te;ue<=ce-Z;ue+=2){var ge=A+ue,he;ue===-ce||ue!==ce&&L[ge-1]<L[ge+1]?he=L[ge+1]:he=L[ge-1]+1;for(var we=he-ue;he<S&&we<I&&N.charAt(he)===M.charAt(we);)he++,we++;if(L[ge]=he,he>S)Z+=2;else if(we>I)te+=2;else if(ee){var se=A+W-ue;if(se>=0&&se<P&&J[se]!==-1){var _e=S-J[se];if(he>=_e)return s(N,M,he,we)}}}for(var De=-ce+X;De<=ce-le;De+=2){var se=A+De,_e;De===-ce||De!==ce&&J[se-1]<J[se+1]?_e=J[se+1]:_e=J[se-1]+1;for(var oe=_e-De;_e<S&&oe<I&&N.charAt(S-_e-1)===M.charAt(I-oe-1);)_e++,oe++;if(J[se]=_e,_e>S)le+=2;else if(oe>I)X+=2;else if(!ee){var ge=A+W-De;if(ge>=0&&ge<P&&L[ge]!==-1){var he=L[ge],we=A+he-ge;if(_e=S-_e,he>=_e)return s(N,M,he,we)}}}}return[[t,N],[e,M]]}function s(N,M,S,I){var T=N.substring(0,S),A=M.substring(0,I),P=N.substring(S),L=M.substring(I),J=r(T,A),K=r(P,L);return J.concat(K)}function a(N,M){if(!N||!M||N.charAt(0)!==M.charAt(0))return 0;for(var S=0,I=Math.min(N.length,M.length),T=I,A=0;S<T;)N.substring(A,T)==M.substring(A,T)?(S=T,A=S):I=T,T=Math.floor((I-S)/2+S);return D(N.charCodeAt(T-1))&&T--,T}function c(N,M){var S=N.length,I=M.length;if(S==0||I==0)return 0;S>I?N=N.substring(S-I):S<I&&(M=M.substring(0,S));var T=Math.min(S,I);if(N==M)return T;for(var A=0,P=1;;){var L=N.substring(T-P),J=M.indexOf(L);if(J==-1)return A;P+=J,(J==0||N.substring(T-P)==M.substring(0,P))&&(A=P,P++)}}function u(N,M){if(!N||!M||N.slice(-1)!==M.slice(-1))return 0;for(var S=0,I=Math.min(N.length,M.length),T=I,A=0;S<T;)N.substring(N.length-T,N.length-A)==M.substring(M.length-T,M.length-A)?(S=T,A=S):I=T,T=Math.floor((I-S)/2+S);return $(N.charCodeAt(N.length-T))&&T--,T}function d(N,M){var S=N.length>M.length?N:M,I=N.length>M.length?M:N;if(S.length<4||I.length*2<S.length)return null;function T(Z,X,le){for(var ce=Z.substring(le,le+Math.floor(Z.length/4)),ue=-1,ge="",he,we,se,_e;(ue=X.indexOf(ce,ue+1))!==-1;){var De=a(Z.substring(le),X.substring(ue)),oe=u(Z.substring(0,le),X.substring(0,ue));ge.length<oe+De&&(ge=X.substring(ue-oe,ue)+X.substring(ue,ue+De),he=Z.substring(0,le-oe),we=Z.substring(le+De),se=X.substring(0,ue-oe),_e=X.substring(ue+De))}return ge.length*2>=Z.length?[he,we,se,_e,ge]:null}var A=T(S,I,Math.ceil(S.length/4)),P=T(S,I,Math.ceil(S.length/2)),L;if(!A&&!P)return null;P?A?L=A[4].length>P[4].length?A:P:L=P:L=A;var J,K,W,ee;N.length>M.length?(J=L[0],K=L[1],W=L[2],ee=L[3]):(W=L[0],ee=L[1],J=L[2],K=L[3]);var te=L[4];return[J,K,W,ee,te]}function p(N){for(var M=!1,S=[],I=0,T=null,A=0,P=0,L=0,J=0,K=0;A<N.length;)N[A][0]==n?(S[I++]=A,P=J,L=K,J=0,K=0,T=N[A][1]):(N[A][0]==e?J+=N[A][1].length:K+=N[A][1].length,T&&T.length<=Math.max(P,L)&&T.length<=Math.max(J,K)&&(N.splice(S[I-1],0,[t,T]),N[S[I-1]+1][0]=e,I--,I--,A=I>0?S[I-1]:-1,P=0,L=0,J=0,K=0,T=null,M=!0)),A++;for(M&&_(N),C(N),A=1;A<N.length;){if(N[A-1][0]==t&&N[A][0]==e){var W=N[A-1][1],ee=N[A][1],te=c(W,ee),Z=c(ee,W);te>=Z?(te>=W.length/2||te>=ee.length/2)&&(N.splice(A,0,[n,ee.substring(0,te)]),N[A-1][1]=W.substring(0,W.length-te),N[A+1][1]=ee.substring(te),A++):(Z>=W.length/2||Z>=ee.length/2)&&(N.splice(A,0,[n,W.substring(0,Z)]),N[A-1][0]=e,N[A-1][1]=ee.substring(0,ee.length-Z),N[A+1][0]=t,N[A+1][1]=W.substring(Z),A++),A++}A++}}var f=/[^a-zA-Z0-9]/,h=/\s/,b=/[\r\n]/,x=/\n\r?\n$/,E=/^\r?\n\r?\n/;function C(N){function M(Z,X){if(!Z||!X)return 6;var le=Z.charAt(Z.length-1),ce=X.charAt(0),ue=le.match(f),ge=ce.match(f),he=ue&&le.match(h),we=ge&&ce.match(h),se=he&&le.match(b),_e=we&&ce.match(b),De=se&&Z.match(x),oe=_e&&X.match(E);return De||oe?5:se||_e?4:ue&&!he&&we?3:he||we?2:ue||ge?1:0}for(var S=1;S<N.length-1;){if(N[S-1][0]==n&&N[S+1][0]==n){var I=N[S-1][1],T=N[S][1],A=N[S+1][1],P=u(I,T);if(P){var L=T.substring(T.length-P);I=I.substring(0,I.length-P),T=L+T.substring(0,T.length-P),A=L+A}for(var J=I,K=T,W=A,ee=M(I,T)+M(T,A);T.charAt(0)===A.charAt(0);){I+=T.charAt(0),T=T.substring(1)+A.charAt(0),A=A.substring(1);var te=M(I,T)+M(T,A);te>=ee&&(ee=te,J=I,K=T,W=A)}N[S-1][1]!=J&&(J?N[S-1][1]=J:(N.splice(S-1,1),S--),N[S][1]=K,W?N[S+1][1]=W:(N.splice(S+1,1),S--))}S++}}function _(N,M){N.push([n,""]);for(var S=0,I=0,T=0,A="",P="",L;S<N.length;){if(S<N.length-1&&!N[S][1]){N.splice(S,1);continue}switch(N[S][0]){case e:T++,P+=N[S][1],S++;break;case t:I++,A+=N[S][1],S++;break;case n:var J=S-T-I-1;if(M){if(J>=0&&O(N[J][1])){var K=N[J][1].slice(-1);if(N[J][1]=N[J][1].slice(0,-1),A=K+A,P=K+P,!N[J][1]){N.splice(J,1),S--;var W=J-1;N[W]&&N[W][0]===e&&(T++,P=N[W][1]+P,W--),N[W]&&N[W][0]===t&&(I++,A=N[W][1]+A,W--),J=W}}if(H(N[S][1])){var K=N[S][1].charAt(0);N[S][1]=N[S][1].slice(1),A+=K,P+=K}}if(S<N.length-1&&!N[S][1]){N.splice(S,1);break}if(A.length>0||P.length>0){A.length>0&&P.length>0&&(L=a(P,A),L!==0&&(J>=0?N[J][1]+=P.substring(0,L):(N.splice(0,0,[n,P.substring(0,L)]),S++),P=P.substring(L),A=A.substring(L)),L=u(P,A),L!==0&&(N[S][1]=P.substring(P.length-L)+N[S][1],P=P.substring(0,P.length-L),A=A.substring(0,A.length-L)));var ee=T+I;A.length===0&&P.length===0?(N.splice(S-ee,ee),S=S-ee):A.length===0?(N.splice(S-ee,ee,[e,P]),S=S-ee+1):P.length===0?(N.splice(S-ee,ee,[t,A]),S=S-ee+1):(N.splice(S-ee,ee,[t,A],[e,P]),S=S-ee+2)}S!==0&&N[S-1][0]===n?(N[S-1][1]+=N[S][1],N.splice(S,1)):S++,T=0,I=0,A="",P="";break}}N[N.length-1][1]===""&&N.pop();var te=!1;for(S=1;S<N.length-1;)N[S-1][0]===n&&N[S+1][0]===n&&(N[S][1].substring(N[S][1].length-N[S-1][1].length)===N[S-1][1]?(N[S][1]=N[S-1][1]+N[S][1].substring(0,N[S][1].length-N[S-1][1].length),N[S+1][1]=N[S-1][1]+N[S+1][1],N.splice(S-1,1),te=!0):N[S][1].substring(0,N[S+1][1].length)==N[S+1][1]&&(N[S-1][1]+=N[S+1][1],N[S][1]=N[S][1].substring(N[S+1][1].length)+N[S+1][1],N.splice(S+1,1),te=!0)),S++;te&&_(N,M)}function D(N){return N>=55296&&N<=56319}function $(N){return N>=56320&&N<=57343}function H(N){return $(N.charCodeAt(0))}function O(N){return D(N.charCodeAt(N.length-1))}function V(N){for(var M=[],S=0;S<N.length;S++)N[S][1].length>0&&M.push(N[S]);return M}function B(N,M,S,I){return O(N)||H(I)?null:V([[n,N],[t,M],[e,S],[n,I]])}function F(N,M,S){var I=typeof S=="number"?{index:S,length:0}:S.oldRange,T=typeof S=="number"?null:S.newRange,A=N.length,P=M.length;if(I.length===0&&(T===null||T.length===0)){var L=I.index,J=N.slice(0,L),K=N.slice(L),W=T?T.index:null;e:{var ee=L+P-A;if(W!==null&&W!==ee||ee<0||ee>P)break e;var te=M.slice(0,ee),Z=M.slice(ee);if(Z!==K)break e;var X=Math.min(L,ee),le=J.slice(0,X),ce=te.slice(0,X);if(le!==ce)break e;var ue=J.slice(X),ge=te.slice(X);return B(le,ue,ge,K)}e:{if(W!==null&&W!==L)break e;var he=L,te=M.slice(0,he),Z=M.slice(he);if(te!==J)break e;var we=Math.min(A-he,P-he),se=K.slice(K.length-we),_e=Z.slice(Z.length-we);if(se!==_e)break e;var ue=K.slice(0,K.length-we),ge=Z.slice(0,Z.length-we);return B(J,ue,ge,se)}}if(I.length>0&&T&&T.length===0)e:{var le=N.slice(0,I.index),se=N.slice(I.index+I.length),X=le.length,we=se.length;if(P<X+we)break e;var ce=M.slice(0,X),_e=M.slice(P-we);if(le!==ce||se!==_e)break e;var ue=N.slice(X,A-we),ge=M.slice(X,P-we);return B(le,ue,ge,se)}return null}function Y(N,M,S,I){return r(N,M,S,I,!0)}return Y.INSERT=e,Y.DELETE=t,Y.EQUAL=n,Bl=Y,Bl}var ji={exports:{}};ji.exports;var op;function Nw(){return op||(op=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=9007199254740991,i="[object Arguments]",s="[object Array]",a="[object Boolean]",c="[object Date]",u="[object Error]",d="[object Function]",p="[object GeneratorFunction]",f="[object Map]",h="[object Number]",b="[object Object]",x="[object Promise]",E="[object RegExp]",C="[object Set]",_="[object String]",D="[object Symbol]",$="[object WeakMap]",H="[object ArrayBuffer]",O="[object DataView]",V="[object Float32Array]",B="[object Float64Array]",F="[object Int8Array]",Y="[object Int16Array]",N="[object Int32Array]",M="[object Uint8Array]",S="[object Uint8ClampedArray]",I="[object Uint16Array]",T="[object Uint32Array]",A=/[\\^$.*+?()[\]{}|]/g,P=/\w*$/,L=/^\[object .+?Constructor\]$/,J=/^(?:0|[1-9]\d*)$/,K={};K[i]=K[s]=K[H]=K[O]=K[a]=K[c]=K[V]=K[B]=K[F]=K[Y]=K[N]=K[f]=K[h]=K[b]=K[E]=K[C]=K[_]=K[D]=K[M]=K[S]=K[I]=K[T]=!0,K[u]=K[d]=K[$]=!1;var W=typeof _r=="object"&&_r&&_r.Object===Object&&_r,ee=typeof self=="object"&&self&&self.Object===Object&&self,te=W||ee||Function("return this")(),Z=e&&!e.nodeType&&e,X=Z&&!0&&t&&!t.nodeType&&t,le=X&&X.exports===Z;function ce(m,k){return m.set(k[0],k[1]),m}function ue(m,k){return m.add(k),m}function ge(m,k){for(var j=-1,Q=m?m.length:0;++j<Q&&k(m[j],j,m)!==!1;);return m}function he(m,k){for(var j=-1,Q=k.length,xe=m.length;++j<Q;)m[xe+j]=k[j];return m}function we(m,k,j,Q){for(var xe=-1,pe=m?m.length:0;++xe<pe;)j=k(j,m[xe],xe,m);return j}function se(m,k){for(var j=-1,Q=Array(m);++j<m;)Q[j]=k(j);return Q}function _e(m,k){return m==null?void 0:m[k]}function De(m){var k=!1;if(m!=null&&typeof m.toString!="function")try{k=!!(m+"")}catch{}return k}function oe(m){var k=-1,j=Array(m.size);return m.forEach(function(Q,xe){j[++k]=[xe,Q]}),j}function me(m,k){return function(j){return m(k(j))}}function Ne(m){var k=-1,j=Array(m.size);return m.forEach(function(Q){j[++k]=Q}),j}var Oe=Array.prototype,Be=Function.prototype,tt=Object.prototype,Qe=te["__core-js_shared__"],st=function(){var m=/[^.]+$/.exec(Qe&&Qe.keys&&Qe.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),Ee=Be.toString,pt=tt.hasOwnProperty,ze=tt.toString,_n=RegExp("^"+Ee.call(pt).replace(A,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nn=le?te.Buffer:void 0,Gt=te.Symbol,rn=te.Uint8Array,fe=me(Object.getPrototypeOf,Object),$e=Object.create,ft=tt.propertyIsEnumerable,bt=Oe.splice,on=Object.getOwnPropertySymbols,sn=nn?nn.isBuffer:void 0,Cn=me(Object.keys,Object),an=Sn(te,"DataView"),ln=Sn(te,"Map"),kt=Sn(te,"Promise"),cn=Sn(te,"Set"),un=Sn(te,"WeakMap"),Kt=Sn(Object,"create"),Fn=Bt(an),Pe=Bt(ln),Ze=Bt(kt),Pt=Bt(cn),Ft=Bt(un),En=Gt?Gt.prototype:void 0,mr=En?En.valueOf:void 0;function gn(m){var k=-1,j=m?m.length:0;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function v(){this.__data__=Kt?Kt(null):{}}function y(m){return this.has(m)&&delete this.__data__[m]}function R(m){var k=this.__data__;if(Kt){var j=k[m];return j===r?void 0:j}return pt.call(k,m)?k[m]:void 0}function G(m){var k=this.__data__;return Kt?k[m]!==void 0:pt.call(k,m)}function re(m,k){var j=this.__data__;return j[m]=Kt&&k===void 0?r:k,this}gn.prototype.clear=v,gn.prototype.delete=y,gn.prototype.get=R,gn.prototype.has=G,gn.prototype.set=re;function ae(m){var k=-1,j=m?m.length:0;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=[]}function nt(m){var k=this.__data__,j=Ao(k,m);if(j<0)return!1;var Q=k.length-1;return j==Q?k.pop():bt.call(k,j,1),!0}function lt(m){var k=this.__data__,j=Ao(k,m);return j<0?void 0:k[j][1]}function Nt(m){return Ao(this.__data__,m)>-1}function ht(m,k){var j=this.__data__,Q=Ao(j,m);return Q<0?j.push([m,k]):j[Q][1]=k,this}ae.prototype.clear=ke,ae.prototype.delete=nt,ae.prototype.get=lt,ae.prototype.has=Nt,ae.prototype.set=ht;function Xe(m){var k=-1,j=m?m.length:0;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function dn(){this.__data__={hash:new gn,map:new(ln||ae),string:new gn}}function Rt(m){return Kr(this,m).delete(m)}function kn(m){return Kr(this,m).get(m)}function Yt(m){return Kr(this,m).has(m)}function Nn(m,k){return Kr(this,m).set(m,k),this}Xe.prototype.clear=dn,Xe.prototype.delete=Rt,Xe.prototype.get=kn,Xe.prototype.has=Yt,Xe.prototype.set=Nn;function ct(m){this.__data__=new ae(m)}function zr(){this.__data__=new ae}function ut(m){return this.__data__.delete(m)}function So(m){return this.__data__.get(m)}function Bn(m){return this.__data__.has(m)}function ul(m,k){var j=this.__data__;if(j instanceof ae){var Q=j.__data__;if(!ln||Q.length<n-1)return Q.push([m,k]),this;j=this.__data__=new Xe(Q)}return j.set(m,k),this}ct.prototype.clear=zr,ct.prototype.delete=ut,ct.prototype.get=So,ct.prototype.has=Bn,ct.prototype.set=ul;function To(m,k){var j=Ci(m)||Mo(m)?se(m.length,String):[],Q=j.length,xe=!!Q;for(var pe in m)pt.call(m,pe)&&!(xe&&(pe=="length"||El(pe,Q)))&&j.push(pe);return j}function Ns(m,k,j){var Q=m[k];(!(pt.call(m,k)&&Ms(Q,j))||j===void 0&&!(k in m))&&(m[k]=j)}function Ao(m,k){for(var j=m.length;j--;)if(Ms(m[j][0],k))return j;return-1}function qn(m,k){return m&&_i(k,ki(k),m)}function xi(m,k,j,Q,xe,pe,je){var Me;if(Q&&(Me=pe?Q(m,xe,pe,je):Q(m)),Me!==void 0)return Me;if(!Vn(m))return m;var dt=Ci(m);if(dt){if(Me=_l(m),!k)return vl(m,Me)}else{var Ie=ir(m),Ot=Ie==d||Ie==p;if(Rs(m))return Do(m,k);if(Ie==b||Ie==i||Ot&&!pe){if(De(m))return pe?m:{};if(Me=Un(Ot?{}:m),!k)return xl(m,qn(Me,m))}else{if(!K[Ie])return pe?m:{};Me=Cl(m,Ie,xi,k)}}je||(je=new ct);var Wt=je.get(m);if(Wt)return Wt;if(je.set(m,Me),!dt)var wt=j?yl(m):ki(m);return ge(wt||m,function(jt,St){wt&&(St=jt,jt=m[St]),Ns(Me,St,xi(jt,k,j,Q,St,m,je))}),Me}function dl(m){return Vn(m)?$e(m):{}}function pl(m,k,j){var Q=k(m);return Ci(m)?Q:he(Q,j(m))}function fl(m){return ze.call(m)}function hl(m){if(!Vn(m)||Nl(m))return!1;var k=Ei(m)||De(m)?_n:L;return k.test(Bt(m))}function wl(m){if(!As(m))return Cn(m);var k=[];for(var j in Object(m))pt.call(m,j)&&j!="constructor"&&k.push(j);return k}function Do(m,k){if(k)return m.slice();var j=new m.constructor(m.length);return m.copy(j),j}function yi(m){var k=new m.constructor(m.byteLength);return new rn(k).set(new rn(m)),k}function Gr(m,k){var j=k?yi(m.buffer):m.buffer;return new m.constructor(j,m.byteOffset,m.byteLength)}function Ss(m,k,j){var Q=k?j(oe(m),!0):oe(m);return we(Q,ce,new m.constructor)}function Ts(m){var k=new m.constructor(m.source,P.exec(m));return k.lastIndex=m.lastIndex,k}function gl(m,k,j){var Q=k?j(Ne(m),!0):Ne(m);return we(Q,ue,new m.constructor)}function ml(m){return mr?Object(mr.call(m)):{}}function bl(m,k){var j=k?yi(m.buffer):m.buffer;return new m.constructor(j,m.byteOffset,m.length)}function vl(m,k){var j=-1,Q=m.length;for(k||(k=Array(Q));++j<Q;)k[j]=m[j];return k}function _i(m,k,j,Q){j||(j={});for(var xe=-1,pe=k.length;++xe<pe;){var je=k[xe],Me=void 0;Ns(j,je,Me===void 0?m[je]:Me)}return j}function xl(m,k){return _i(m,or(m),k)}function yl(m){return pl(m,ki,or)}function Kr(m,k){var j=m.__data__;return kl(k)?j[typeof k=="string"?"string":"hash"]:j.map}function Sn(m,k){var j=_e(m,k);return hl(j)?j:void 0}var or=on?me(on,Object):Tl,ir=fl;(an&&ir(new an(new ArrayBuffer(1)))!=O||ln&&ir(new ln)!=f||kt&&ir(kt.resolve())!=x||cn&&ir(new cn)!=C||un&&ir(new un)!=$)&&(ir=function(m){var k=ze.call(m),j=k==b?m.constructor:void 0,Q=j?Bt(j):void 0;if(Q)switch(Q){case Fn:return O;case Pe:return f;case Ze:return x;case Pt:return C;case Ft:return $}return k});function _l(m){var k=m.length,j=m.constructor(k);return k&&typeof m[0]=="string"&&pt.call(m,"index")&&(j.index=m.index,j.input=m.input),j}function Un(m){return typeof m.constructor=="function"&&!As(m)?dl(fe(m)):{}}function Cl(m,k,j,Q){var xe=m.constructor;switch(k){case H:return yi(m);case a:case c:return new xe(+m);case O:return Gr(m,Q);case V:case B:case F:case Y:case N:case M:case S:case I:case T:return bl(m,Q);case f:return Ss(m,Q,j);case h:case _:return new xe(m);case E:return Ts(m);case C:return gl(m,Q,j);case D:return ml(m)}}function El(m,k){return k=k??o,!!k&&(typeof m=="number"||J.test(m))&&m>-1&&m%1==0&&m<k}function kl(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function Nl(m){return!!st&&st in m}function As(m){var k=m&&m.constructor,j=typeof k=="function"&&k.prototype||tt;return m===j}function Bt(m){if(m!=null){try{return Ee.call(m)}catch{}try{return m+""}catch{}}return""}function Ds(m){return xi(m,!0,!0)}function Ms(m,k){return m===k||m!==m&&k!==k}function Mo(m){return Sl(m)&&pt.call(m,"callee")&&(!ft.call(m,"callee")||ze.call(m)==i)}var Ci=Array.isArray;function Ro(m){return m!=null&&Os(m.length)&&!Ei(m)}function Sl(m){return js(m)&&Ro(m)}var Rs=sn||Al;function Ei(m){var k=Vn(m)?ze.call(m):"";return k==d||k==p}function Os(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=o}function Vn(m){var k=typeof m;return!!m&&(k=="object"||k=="function")}function js(m){return!!m&&typeof m=="object"}function ki(m){return Ro(m)?To(m):wl(m)}function Tl(){return[]}function Al(){return!1}t.exports=Ds}(ji,ji.exports)),ji.exports}var Ii={exports:{}};Ii.exports;var ip;function Sw(){return ip||(ip=1,function(t,e){var n=200,r="__lodash_hash_undefined__",o=1,i=2,s=9007199254740991,a="[object Arguments]",c="[object Array]",u="[object AsyncFunction]",d="[object Boolean]",p="[object Date]",f="[object Error]",h="[object Function]",b="[object GeneratorFunction]",x="[object Map]",E="[object Number]",C="[object Null]",_="[object Object]",D="[object Promise]",$="[object Proxy]",H="[object RegExp]",O="[object Set]",V="[object String]",B="[object Symbol]",F="[object Undefined]",Y="[object WeakMap]",N="[object ArrayBuffer]",M="[object DataView]",S="[object Float32Array]",I="[object Float64Array]",T="[object Int8Array]",A="[object Int16Array]",P="[object Int32Array]",L="[object Uint8Array]",J="[object Uint8ClampedArray]",K="[object Uint16Array]",W="[object Uint32Array]",ee=/[\\^$.*+?()[\]{}|]/g,te=/^\[object .+?Constructor\]$/,Z=/^(?:0|[1-9]\d*)$/,X={};X[S]=X[I]=X[T]=X[A]=X[P]=X[L]=X[J]=X[K]=X[W]=!0,X[a]=X[c]=X[N]=X[d]=X[M]=X[p]=X[f]=X[h]=X[x]=X[E]=X[_]=X[H]=X[O]=X[V]=X[Y]=!1;var le=typeof _r=="object"&&_r&&_r.Object===Object&&_r,ce=typeof self=="object"&&self&&self.Object===Object&&self,ue=le||ce||Function("return this")(),ge=e&&!e.nodeType&&e,he=ge&&!0&&t&&!t.nodeType&&t,we=he&&he.exports===ge,se=we&&le.process,_e=function(){try{return se&&se.binding&&se.binding("util")}catch{}}(),De=_e&&_e.isTypedArray;function oe(m,k){for(var j=-1,Q=m==null?0:m.length,xe=0,pe=[];++j<Q;){var je=m[j];k(je,j,m)&&(pe[xe++]=je)}return pe}function me(m,k){for(var j=-1,Q=k.length,xe=m.length;++j<Q;)m[xe+j]=k[j];return m}function Ne(m,k){for(var j=-1,Q=m==null?0:m.length;++j<Q;)if(k(m[j],j,m))return!0;return!1}function Oe(m,k){for(var j=-1,Q=Array(m);++j<m;)Q[j]=k(j);return Q}function Be(m){return function(k){return m(k)}}function tt(m,k){return m.has(k)}function Qe(m,k){return m==null?void 0:m[k]}function st(m){var k=-1,j=Array(m.size);return m.forEach(function(Q,xe){j[++k]=[xe,Q]}),j}function Ee(m,k){return function(j){return m(k(j))}}function pt(m){var k=-1,j=Array(m.size);return m.forEach(function(Q){j[++k]=Q}),j}var ze=Array.prototype,_n=Function.prototype,nn=Object.prototype,Gt=ue["__core-js_shared__"],rn=_n.toString,fe=nn.hasOwnProperty,$e=function(){var m=/[^.]+$/.exec(Gt&&Gt.keys&&Gt.keys.IE_PROTO||"");return m?"Symbol(src)_1."+m:""}(),ft=nn.toString,bt=RegExp("^"+rn.call(fe).replace(ee,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),on=we?ue.Buffer:void 0,sn=ue.Symbol,Cn=ue.Uint8Array,an=nn.propertyIsEnumerable,ln=ze.splice,kt=sn?sn.toStringTag:void 0,cn=Object.getOwnPropertySymbols,un=on?on.isBuffer:void 0,Kt=Ee(Object.keys,Object),Fn=or(ue,"DataView"),Pe=or(ue,"Map"),Ze=or(ue,"Promise"),Pt=or(ue,"Set"),Ft=or(ue,"WeakMap"),En=or(Object,"create"),mr=Bt(Fn),gn=Bt(Pe),v=Bt(Ze),y=Bt(Pt),R=Bt(Ft),G=sn?sn.prototype:void 0,re=G?G.valueOf:void 0;function ae(m){var k=-1,j=m==null?0:m.length;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function ke(){this.__data__=En?En(null):{},this.size=0}function nt(m){var k=this.has(m)&&delete this.__data__[m];return this.size-=k?1:0,k}function lt(m){var k=this.__data__;if(En){var j=k[m];return j===r?void 0:j}return fe.call(k,m)?k[m]:void 0}function Nt(m){var k=this.__data__;return En?k[m]!==void 0:fe.call(k,m)}function ht(m,k){var j=this.__data__;return this.size+=this.has(m)?0:1,j[m]=En&&k===void 0?r:k,this}ae.prototype.clear=ke,ae.prototype.delete=nt,ae.prototype.get=lt,ae.prototype.has=Nt,ae.prototype.set=ht;function Xe(m){var k=-1,j=m==null?0:m.length;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function dn(){this.__data__=[],this.size=0}function Rt(m){var k=this.__data__,j=Do(k,m);if(j<0)return!1;var Q=k.length-1;return j==Q?k.pop():ln.call(k,j,1),--this.size,!0}function kn(m){var k=this.__data__,j=Do(k,m);return j<0?void 0:k[j][1]}function Yt(m){return Do(this.__data__,m)>-1}function Nn(m,k){var j=this.__data__,Q=Do(j,m);return Q<0?(++this.size,j.push([m,k])):j[Q][1]=k,this}Xe.prototype.clear=dn,Xe.prototype.delete=Rt,Xe.prototype.get=kn,Xe.prototype.has=Yt,Xe.prototype.set=Nn;function ct(m){var k=-1,j=m==null?0:m.length;for(this.clear();++k<j;){var Q=m[k];this.set(Q[0],Q[1])}}function zr(){this.size=0,this.__data__={hash:new ae,map:new(Pe||Xe),string:new ae}}function ut(m){var k=Sn(this,m).delete(m);return this.size-=k?1:0,k}function So(m){return Sn(this,m).get(m)}function Bn(m){return Sn(this,m).has(m)}function ul(m,k){var j=Sn(this,m),Q=j.size;return j.set(m,k),this.size+=j.size==Q?0:1,this}ct.prototype.clear=zr,ct.prototype.delete=ut,ct.prototype.get=So,ct.prototype.has=Bn,ct.prototype.set=ul;function To(m){var k=-1,j=m==null?0:m.length;for(this.__data__=new ct;++k<j;)this.add(m[k])}function Ns(m){return this.__data__.set(m,r),this}function Ao(m){return this.__data__.has(m)}To.prototype.add=To.prototype.push=Ns,To.prototype.has=Ao;function qn(m){var k=this.__data__=new Xe(m);this.size=k.size}function xi(){this.__data__=new Xe,this.size=0}function dl(m){var k=this.__data__,j=k.delete(m);return this.size=k.size,j}function pl(m){return this.__data__.get(m)}function fl(m){return this.__data__.has(m)}function hl(m,k){var j=this.__data__;if(j instanceof Xe){var Q=j.__data__;if(!Pe||Q.length<n-1)return Q.push([m,k]),this.size=++j.size,this;j=this.__data__=new ct(Q)}return j.set(m,k),this.size=j.size,this}qn.prototype.clear=xi,qn.prototype.delete=dl,qn.prototype.get=pl,qn.prototype.has=fl,qn.prototype.set=hl;function wl(m,k){var j=Mo(m),Q=!j&&Ms(m),xe=!j&&!Q&&Ro(m),pe=!j&&!Q&&!xe&&js(m),je=j||Q||xe||pe,Me=je?Oe(m.length,String):[],dt=Me.length;for(var Ie in m)fe.call(m,Ie)&&!(je&&(Ie=="length"||xe&&(Ie=="offset"||Ie=="parent")||pe&&(Ie=="buffer"||Ie=="byteLength"||Ie=="byteOffset")||Cl(Ie,dt)))&&Me.push(Ie);return Me}function Do(m,k){for(var j=m.length;j--;)if(Ds(m[j][0],k))return j;return-1}function yi(m,k,j){var Q=k(m);return Mo(m)?Q:me(Q,j(m))}function Gr(m){return m==null?m===void 0?F:C:kt&&kt in Object(m)?ir(m):As(m)}function Ss(m){return Vn(m)&&Gr(m)==a}function Ts(m,k,j,Q,xe){return m===k?!0:m==null||k==null||!Vn(m)&&!Vn(k)?m!==m&&k!==k:gl(m,k,j,Q,Ts,xe)}function gl(m,k,j,Q,xe,pe){var je=Mo(m),Me=Mo(k),dt=je?c:Un(m),Ie=Me?c:Un(k);dt=dt==a?_:dt,Ie=Ie==a?_:Ie;var Ot=dt==_,Wt=Ie==_,wt=dt==Ie;if(wt&&Ro(m)){if(!Ro(k))return!1;je=!0,Ot=!1}if(wt&&!Ot)return pe||(pe=new qn),je||js(m)?_i(m,k,j,Q,xe,pe):xl(m,k,dt,j,Q,xe,pe);if(!(j&o)){var jt=Ot&&fe.call(m,"__wrapped__"),St=Wt&&fe.call(k,"__wrapped__");if(jt||St){var br=jt?m.value():m,sr=St?k.value():k;return pe||(pe=new qn),xe(br,sr,j,Q,pe)}}return wt?(pe||(pe=new qn),yl(m,k,j,Q,xe,pe)):!1}function ml(m){if(!Os(m)||kl(m))return!1;var k=Rs(m)?bt:te;return k.test(Bt(m))}function bl(m){return Vn(m)&&Ei(m.length)&&!!X[Gr(m)]}function vl(m){if(!Nl(m))return Kt(m);var k=[];for(var j in Object(m))fe.call(m,j)&&j!="constructor"&&k.push(j);return k}function _i(m,k,j,Q,xe,pe){var je=j&o,Me=m.length,dt=k.length;if(Me!=dt&&!(je&&dt>Me))return!1;var Ie=pe.get(m);if(Ie&&pe.get(k))return Ie==k;var Ot=-1,Wt=!0,wt=j&i?new To:void 0;for(pe.set(m,k),pe.set(k,m);++Ot<Me;){var jt=m[Ot],St=k[Ot];if(Q)var br=je?Q(St,jt,Ot,k,m,pe):Q(jt,St,Ot,m,k,pe);if(br!==void 0){if(br)continue;Wt=!1;break}if(wt){if(!Ne(k,function(sr,Yr){if(!tt(wt,Yr)&&(jt===sr||xe(jt,sr,j,Q,pe)))return wt.push(Yr)})){Wt=!1;break}}else if(!(jt===St||xe(jt,St,j,Q,pe))){Wt=!1;break}}return pe.delete(m),pe.delete(k),Wt}function xl(m,k,j,Q,xe,pe,je){switch(j){case M:if(m.byteLength!=k.byteLength||m.byteOffset!=k.byteOffset)return!1;m=m.buffer,k=k.buffer;case N:return!(m.byteLength!=k.byteLength||!pe(new Cn(m),new Cn(k)));case d:case p:case E:return Ds(+m,+k);case f:return m.name==k.name&&m.message==k.message;case H:case V:return m==k+"";case x:var Me=st;case O:var dt=Q&o;if(Me||(Me=pt),m.size!=k.size&&!dt)return!1;var Ie=je.get(m);if(Ie)return Ie==k;Q|=i,je.set(m,k);var Ot=_i(Me(m),Me(k),Q,xe,pe,je);return je.delete(m),Ot;case B:if(re)return re.call(m)==re.call(k)}return!1}function yl(m,k,j,Q,xe,pe){var je=j&o,Me=Kr(m),dt=Me.length,Ie=Kr(k),Ot=Ie.length;if(dt!=Ot&&!je)return!1;for(var Wt=dt;Wt--;){var wt=Me[Wt];if(!(je?wt in k:fe.call(k,wt)))return!1}var jt=pe.get(m);if(jt&&pe.get(k))return jt==k;var St=!0;pe.set(m,k),pe.set(k,m);for(var br=je;++Wt<dt;){wt=Me[Wt];var sr=m[wt],Yr=k[wt];if(Q)var _d=je?Q(Yr,sr,wt,k,m,pe):Q(sr,Yr,wt,m,k,pe);if(!(_d===void 0?sr===Yr||xe(sr,Yr,j,Q,pe):_d)){St=!1;break}br||(br=wt=="constructor")}if(St&&!br){var Is=m.constructor,Ls=k.constructor;Is!=Ls&&"constructor"in m&&"constructor"in k&&!(typeof Is=="function"&&Is instanceof Is&&typeof Ls=="function"&&Ls instanceof Ls)&&(St=!1)}return pe.delete(m),pe.delete(k),St}function Kr(m){return yi(m,ki,_l)}function Sn(m,k){var j=m.__data__;return El(k)?j[typeof k=="string"?"string":"hash"]:j.map}function or(m,k){var j=Qe(m,k);return ml(j)?j:void 0}function ir(m){var k=fe.call(m,kt),j=m[kt];try{m[kt]=void 0;var Q=!0}catch{}var xe=ft.call(m);return Q&&(k?m[kt]=j:delete m[kt]),xe}var _l=cn?function(m){return m==null?[]:(m=Object(m),oe(cn(m),function(k){return an.call(m,k)}))}:Tl,Un=Gr;(Fn&&Un(new Fn(new ArrayBuffer(1)))!=M||Pe&&Un(new Pe)!=x||Ze&&Un(Ze.resolve())!=D||Pt&&Un(new Pt)!=O||Ft&&Un(new Ft)!=Y)&&(Un=function(m){var k=Gr(m),j=k==_?m.constructor:void 0,Q=j?Bt(j):"";if(Q)switch(Q){case mr:return M;case gn:return x;case v:return D;case y:return O;case R:return Y}return k});function Cl(m,k){return k=k??s,!!k&&(typeof m=="number"||Z.test(m))&&m>-1&&m%1==0&&m<k}function El(m){var k=typeof m;return k=="string"||k=="number"||k=="symbol"||k=="boolean"?m!=="__proto__":m===null}function kl(m){return!!$e&&$e in m}function Nl(m){var k=m&&m.constructor,j=typeof k=="function"&&k.prototype||nn;return m===j}function As(m){return ft.call(m)}function Bt(m){if(m!=null){try{return rn.call(m)}catch{}try{return m+""}catch{}}return""}function Ds(m,k){return m===k||m!==m&&k!==k}var Ms=Ss(function(){return arguments}())?Ss:function(m){return Vn(m)&&fe.call(m,"callee")&&!an.call(m,"callee")},Mo=Array.isArray;function Ci(m){return m!=null&&Ei(m.length)&&!Rs(m)}var Ro=un||Al;function Sl(m,k){return Ts(m,k)}function Rs(m){if(!Os(m))return!1;var k=Gr(m);return k==h||k==b||k==u||k==$}function Ei(m){return typeof m=="number"&&m>-1&&m%1==0&&m<=s}function Os(m){var k=typeof m;return m!=null&&(k=="object"||k=="function")}function Vn(m){return m!=null&&typeof m=="object"}var js=De?Be(De):bl;function ki(m){return Ci(m)?wl(m):vl(m)}function Tl(){return[]}function Al(){return!1}t.exports=Sl}(Ii,Ii.exports)),Ii.exports}var Us={},sp;function cy(){if(sp)return Us;sp=1,Object.defineProperty(Us,"__esModule",{value:!0});const t=Nw(),e=Sw();var n;return function(r){function o(c={},u={},d=!1){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});let p=t(u);d||(p=Object.keys(p).reduce((f,h)=>(p[h]!=null&&(f[h]=p[h]),f),{}));for(const f in c)c[f]!==void 0&&u[f]===void 0&&(p[f]=c[f]);return Object.keys(p).length>0?p:void 0}r.compose=o;function i(c={},u={}){typeof c!="object"&&(c={}),typeof u!="object"&&(u={});const d=Object.keys(c).concat(Object.keys(u)).reduce((p,f)=>(e(c[f],u[f])||(p[f]=u[f]===void 0?null:u[f]),p),{});return Object.keys(d).length>0?d:void 0}r.diff=i;function s(c={},u={}){c=c||{};const d=Object.keys(u).reduce((p,f)=>(u[f]!==c[f]&&c[f]!==void 0&&(p[f]=u[f]),p),{});return Object.keys(c).reduce((p,f)=>(c[f]!==u[f]&&u[f]===void 0&&(p[f]=null),p),d)}r.invert=s;function a(c,u,d=!1){if(typeof c!="object")return u;if(typeof u!="object")return;if(!d)return u;const p=Object.keys(u).reduce((f,h)=>(c[h]===void 0&&(f[h]=u[h]),f),{});return Object.keys(p).length>0?p:void 0}r.transform=a}(n||(n={})),Us.default=n,Us}var Vs={},ap;function Tw(){if(ap)return Vs;ap=1,Object.defineProperty(Vs,"__esModule",{value:!0});var t;return function(e){function n(r){return typeof r.delete=="number"?r.delete:typeof r.retain=="number"?r.retain:typeof r.retain=="object"&&r.retain!==null?1:typeof r.insert=="string"?r.insert.length:1}e.length=n}(t||(t={})),Vs.default=t,Vs}var Hs={},lp;function uy(){if(lp)return Hs;lp=1,Object.defineProperty(Hs,"__esModule",{value:!0});const t=Tw();class e{constructor(r){this.ops=r,this.index=0,this.offset=0}hasNext(){return this.peekLength()<1/0}next(r){r||(r=1/0);const o=this.ops[this.index];if(o){const i=this.offset,s=t.default.length(o);if(r>=s-i?(r=s-i,this.index+=1,this.offset=0):this.offset+=r,typeof o.delete=="number")return{delete:r};{const a={};return o.attributes&&(a.attributes=o.attributes),typeof o.retain=="number"?a.retain=r:typeof o.retain=="object"&&o.retain!==null?a.retain=o.retain:typeof o.insert=="string"?a.insert=o.insert.substr(i,r):a.insert=o.insert,a}}else return{retain:1/0}}peek(){return this.ops[this.index]}peekLength(){return this.ops[this.index]?t.default.length(this.ops[this.index])-this.offset:1/0}peekType(){const r=this.ops[this.index];return r?typeof r.delete=="number"?"delete":typeof r.retain=="number"||typeof r.retain=="object"&&r.retain!==null?"retain":"insert":"retain"}rest(){if(this.hasNext()){if(this.offset===0)return this.ops.slice(this.index);{const r=this.offset,o=this.index,i=this.next(),s=this.ops.slice(this.index);return this.offset=r,this.index=o,[i].concat(s)}}else return[]}}return Hs.default=e,Hs}var cp;function dy(){return cp||(cp=1,function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.AttributeMap=e.OpIterator=e.Op=void 0;const n=ly(),r=Nw(),o=Sw(),i=cy();e.AttributeMap=i.default;const s=Tw();e.Op=s.default;const a=uy();e.OpIterator=a.default;const c="\0",u=(p,f)=>{if(typeof p!="object"||p===null)throw new Error(`cannot retain a ${typeof p}`);if(typeof f!="object"||f===null)throw new Error(`cannot retain a ${typeof f}`);const h=Object.keys(p)[0];if(!h||h!==Object.keys(f)[0])throw new Error(`embed types not matched: ${h} != ${Object.keys(f)[0]}`);return[h,p[h],f[h]]};class d{constructor(f){Array.isArray(f)?this.ops=f:f!=null&&Array.isArray(f.ops)?this.ops=f.ops:this.ops=[]}static registerEmbed(f,h){this.handlers[f]=h}static unregisterEmbed(f){delete this.handlers[f]}static getHandler(f){const h=this.handlers[f];if(!h)throw new Error(`no handlers for embed type "${f}"`);return h}insert(f,h){const b={};return typeof f=="string"&&f.length===0?this:(b.insert=f,h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b))}delete(f){return f<=0?this:this.push({delete:f})}retain(f,h){if(typeof f=="number"&&f<=0)return this;const b={retain:f};return h!=null&&typeof h=="object"&&Object.keys(h).length>0&&(b.attributes=h),this.push(b)}push(f){let h=this.ops.length,b=this.ops[h-1];if(f=r(f),typeof b=="object"){if(typeof f.delete=="number"&&typeof b.delete=="number")return this.ops[h-1]={delete:b.delete+f.delete},this;if(typeof b.delete=="number"&&f.insert!=null&&(h-=1,b=this.ops[h-1],typeof b!="object"))return this.ops.unshift(f),this;if(o(f.attributes,b.attributes)){if(typeof f.insert=="string"&&typeof b.insert=="string")return this.ops[h-1]={insert:b.insert+f.insert},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this;if(typeof f.retain=="number"&&typeof b.retain=="number")return this.ops[h-1]={retain:b.retain+f.retain},typeof f.attributes=="object"&&(this.ops[h-1].attributes=f.attributes),this}}return h===this.ops.length?this.ops.push(f):this.ops.splice(h,0,f),this}chop(){const f=this.ops[this.ops.length-1];return f&&typeof f.retain=="number"&&!f.attributes&&this.ops.pop(),this}filter(f){return this.ops.filter(f)}forEach(f){this.ops.forEach(f)}map(f){return this.ops.map(f)}partition(f){const h=[],b=[];return this.forEach(x=>{(f(x)?h:b).push(x)}),[h,b]}reduce(f,h){return this.ops.reduce(f,h)}changeLength(){return this.reduce((f,h)=>h.insert?f+s.default.length(h):h.delete?f-h.delete:f,0)}length(){return this.reduce((f,h)=>f+s.default.length(h),0)}slice(f=0,h=1/0){const b=[],x=new a.default(this.ops);let E=0;for(;E<h&&x.hasNext();){let C;E<f?C=x.next(f-E):(C=x.next(h-E),b.push(C)),E+=s.default.length(C)}return new d(b)}compose(f){const h=new a.default(this.ops),b=new a.default(f.ops),x=[],E=b.peek();if(E!=null&&typeof E.retain=="number"&&E.attributes==null){let _=E.retain;for(;h.peekType()==="insert"&&h.peekLength()<=_;)_-=h.peekLength(),x.push(h.next());E.retain-_>0&&b.next(E.retain-_)}const C=new d(x);for(;h.hasNext()||b.hasNext();)if(b.peekType()==="insert")C.push(b.next());else if(h.peekType()==="delete")C.push(h.next());else{const _=Math.min(h.peekLength(),b.peekLength()),D=h.next(_),$=b.next(_);if($.retain){const H={};if(typeof D.retain=="number")H.retain=typeof $.retain=="number"?_:$.retain;else if(typeof $.retain=="number")D.retain==null?H.insert=D.insert:H.retain=D.retain;else{const V=D.retain==null?"insert":"retain",[B,F,Y]=u(D[V],$.retain),N=d.getHandler(B);H[V]={[B]:N.compose(F,Y,V==="retain")}}const O=i.default.compose(D.attributes,$.attributes,typeof D.retain=="number");if(O&&(H.attributes=O),C.push(H),!b.hasNext()&&o(C.ops[C.ops.length-1],H)){const V=new d(h.rest());return C.concat(V).chop()}}else typeof $.delete=="number"&&(typeof D.retain=="number"||typeof D.retain=="object"&&D.retain!==null)&&C.push($)}return C.chop()}concat(f){const h=new d(this.ops.slice());return f.ops.length>0&&(h.push(f.ops[0]),h.ops=h.ops.concat(f.ops.slice(1))),h}diff(f,h){if(this.ops===f.ops)return new d;const b=[this,f].map(D=>D.map($=>{if($.insert!=null)return typeof $.insert=="string"?$.insert:c;const H=D===f?"on":"with";throw new Error("diff() called "+H+" non-document")}).join("")),x=new d,E=n(b[0],b[1],h,!0),C=new a.default(this.ops),_=new a.default(f.ops);return E.forEach(D=>{let $=D[1].length;for(;$>0;){let H=0;switch(D[0]){case n.INSERT:H=Math.min(_.peekLength(),$),x.push(_.next(H));break;case n.DELETE:H=Math.min($,C.peekLength()),C.next(H),x.delete(H);break;case n.EQUAL:H=Math.min(C.peekLength(),_.peekLength(),$);const O=C.next(H),V=_.next(H);o(O.insert,V.insert)?x.retain(H,i.default.diff(O.attributes,V.attributes)):x.push(V).delete(H);break}$-=H}}),x.chop()}eachLine(f,h=`
`){const b=new a.default(this.ops);let x=new d,E=0;for(;b.hasNext();){if(b.peekType()!=="insert")return;const C=b.peek(),_=s.default.length(C)-b.peekLength(),D=typeof C.insert=="string"?C.insert.indexOf(h,_)-_:-1;if(D<0)x.push(b.next());else if(D>0)x.push(b.next(D));else{if(f(x,b.next(1).attributes||{},E)===!1)return;E+=1,x=new d}}x.length()>0&&f(x,{},E)}invert(f){const h=new d;return this.reduce((b,x)=>{if(x.insert)h.delete(s.default.length(x));else{if(typeof x.retain=="number"&&x.attributes==null)return h.retain(x.retain),b+x.retain;if(x.delete||typeof x.retain=="number"){const E=x.delete||x.retain;return f.slice(b,b+E).forEach(_=>{x.delete?h.push(_):x.retain&&x.attributes&&h.retain(s.default.length(_),i.default.invert(x.attributes,_.attributes))}),b+E}else if(typeof x.retain=="object"&&x.retain!==null){const E=f.slice(b,b+1),C=new a.default(E.ops).next(),[_,D,$]=u(x.retain,C.insert),H=d.getHandler(_);return h.retain({[_]:H.invert(D,$)},i.default.invert(x.attributes,C.attributes)),b+1}}return b},0),h.chop()}transform(f,h=!1){if(h=!!h,typeof f=="number")return this.transformPosition(f,h);const b=f,x=new a.default(this.ops),E=new a.default(b.ops),C=new d;for(;x.hasNext()||E.hasNext();)if(x.peekType()==="insert"&&(h||E.peekType()!=="insert"))C.retain(s.default.length(x.next()));else if(E.peekType()==="insert")C.push(E.next());else{const _=Math.min(x.peekLength(),E.peekLength()),D=x.next(_),$=E.next(_);if(D.delete)continue;if($.delete)C.push($);else{const H=D.retain,O=$.retain;let V=typeof O=="object"&&O!==null?O:_;if(typeof H=="object"&&H!==null&&typeof O=="object"&&O!==null){const B=Object.keys(H)[0];if(B===Object.keys(O)[0]){const F=d.getHandler(B);F&&(V={[B]:F.transform(H[B],O[B],h)})}}C.retain(V,i.default.transform(D.attributes,$.attributes,h))}}return C.chop()}transformPosition(f,h=!1){h=!!h;const b=new a.default(this.ops);let x=0;for(;b.hasNext()&&x<=f;){const E=b.peekLength(),C=b.peekType();if(b.next(),C==="delete"){f-=Math.min(E,f-x);continue}else C==="insert"&&(x<f||!h)&&(f+=E);x+=E}return f}}d.Op=s.default,d.OpIterator=a.default,d.AttributeMap=i.default,d.handlers={},e.default=d,t.exports=d,t.exports.default=d}(qs,qs.exports)),qs.exports}var py=dy();const Li=$x(py);var fy=Object.getOwnPropertyNames,hy=Object.getOwnPropertySymbols,wy=Object.prototype.hasOwnProperty;function up(t,e){return function(r,o,i){return t(r,o,i)&&e(r,o,i)}}function zs(t){return function(n,r,o){if(!n||!r||typeof n!="object"||typeof r!="object")return t(n,r,o);var i=o.cache,s=i.get(n),a=i.get(r);if(s&&a)return s===r&&a===n;i.set(n,r),i.set(r,n);var c=t(n,r,o);return i.delete(n),i.delete(r),c}}function dp(t){return fy(t).concat(hy(t))}var gy=Object.hasOwn||function(t,e){return wy.call(t,e)};function Eo(t,e){return t===e||!t&&!e&&t!==t&&e!==e}var my="__v",by="__o",vy="_owner",pp=Object.getOwnPropertyDescriptor,fp=Object.keys;function xy(t,e,n){var r=t.length;if(e.length!==r)return!1;for(;r-- >0;)if(!n.equals(t[r],e[r],r,r,t,e,n))return!1;return!0}function yy(t,e){return Eo(t.getTime(),e.getTime())}function _y(t,e){return t.name===e.name&&t.message===e.message&&t.cause===e.cause&&t.stack===e.stack}function Cy(t,e){return t===e}function hp(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),i=t.entries(),s,a,c=0;(s=i.next())&&!s.done;){for(var u=e.entries(),d=!1,p=0;(a=u.next())&&!a.done;){if(o[p]){p++;continue}var f=s.value,h=a.value;if(n.equals(f[0],h[0],c,p,t,e,n)&&n.equals(f[1],h[1],f[0],h[0],t,e,n)){d=o[p]=!0;break}p++}if(!d)return!1;c++}return!0}var Ey=Eo;function ky(t,e,n){var r=fp(t),o=r.length;if(fp(e).length!==o)return!1;for(;o-- >0;)if(!Aw(t,e,n,r[o]))return!1;return!0}function Ai(t,e,n){var r=dp(t),o=r.length;if(dp(e).length!==o)return!1;for(var i,s,a;o-- >0;)if(i=r[o],!Aw(t,e,n,i)||(s=pp(t,i),a=pp(e,i),(s||a)&&(!s||!a||s.configurable!==a.configurable||s.enumerable!==a.enumerable||s.writable!==a.writable)))return!1;return!0}function Ny(t,e){return Eo(t.valueOf(),e.valueOf())}function Sy(t,e){return t.source===e.source&&t.flags===e.flags}function wp(t,e,n){var r=t.size;if(r!==e.size)return!1;if(!r)return!0;for(var o=new Array(r),i=t.values(),s,a;(s=i.next())&&!s.done;){for(var c=e.values(),u=!1,d=0;(a=c.next())&&!a.done;){if(!o[d]&&n.equals(s.value,a.value,s.value,a.value,t,e,n)){u=o[d]=!0;break}d++}if(!u)return!1}return!0}function Ty(t,e){var n=t.length;if(e.length!==n)return!1;for(;n-- >0;)if(t[n]!==e[n])return!1;return!0}function Ay(t,e){return t.hostname===e.hostname&&t.pathname===e.pathname&&t.protocol===e.protocol&&t.port===e.port&&t.hash===e.hash&&t.username===e.username&&t.password===e.password}function Aw(t,e,n,r){return(r===vy||r===by||r===my)&&(t.$$typeof||e.$$typeof)?!0:gy(e,r)&&n.equals(t[r],e[r],r,r,t,e,n)}var Dy="[object Arguments]",My="[object Boolean]",Ry="[object Date]",Oy="[object Error]",jy="[object Map]",Iy="[object Number]",Ly="[object Object]",$y="[object RegExp]",Py="[object Set]",Fy="[object String]",By="[object URL]",qy=Array.isArray,gp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView?ArrayBuffer.isView:null,mp=Object.assign,Uy=Object.prototype.toString.call.bind(Object.prototype.toString);function Vy(t){var e=t.areArraysEqual,n=t.areDatesEqual,r=t.areErrorsEqual,o=t.areFunctionsEqual,i=t.areMapsEqual,s=t.areNumbersEqual,a=t.areObjectsEqual,c=t.arePrimitiveWrappersEqual,u=t.areRegExpsEqual,d=t.areSetsEqual,p=t.areTypedArraysEqual,f=t.areUrlsEqual;return function(b,x,E){if(b===x)return!0;if(b==null||x==null)return!1;var C=typeof b;if(C!==typeof x)return!1;if(C!=="object")return C==="number"?s(b,x,E):C==="function"?o(b,x,E):!1;var _=b.constructor;if(_!==x.constructor)return!1;if(_===Object)return a(b,x,E);if(qy(b))return e(b,x,E);if(gp!=null&&gp(b))return p(b,x,E);if(_===Date)return n(b,x,E);if(_===RegExp)return u(b,x,E);if(_===Map)return i(b,x,E);if(_===Set)return d(b,x,E);var D=Uy(b);return D===Ry?n(b,x,E):D===$y?u(b,x,E):D===jy?i(b,x,E):D===Py?d(b,x,E):D===Ly?typeof b.then!="function"&&typeof x.then!="function"&&a(b,x,E):D===By?f(b,x,E):D===Oy?r(b,x,E):D===Dy?a(b,x,E):D===My||D===Iy||D===Fy?c(b,x,E):!1}}function Hy(t){var e=t.circular,n=t.createCustomConfig,r=t.strict,o={areArraysEqual:r?Ai:xy,areDatesEqual:yy,areErrorsEqual:_y,areFunctionsEqual:Cy,areMapsEqual:r?up(hp,Ai):hp,areNumbersEqual:Ey,areObjectsEqual:r?Ai:ky,arePrimitiveWrappersEqual:Ny,areRegExpsEqual:Sy,areSetsEqual:r?up(wp,Ai):wp,areTypedArraysEqual:r?Ai:Ty,areUrlsEqual:Ay};if(n&&(o=mp({},o,n(o))),e){var i=zs(o.areArraysEqual),s=zs(o.areMapsEqual),a=zs(o.areObjectsEqual),c=zs(o.areSetsEqual);o=mp({},o,{areArraysEqual:i,areMapsEqual:s,areObjectsEqual:a,areSetsEqual:c})}return o}function zy(t){return function(e,n,r,o,i,s,a){return t(e,n,a)}}function Gy(t){var e=t.circular,n=t.comparator,r=t.createState,o=t.equals,i=t.strict;if(r)return function(c,u){var d=r(),p=d.cache,f=p===void 0?e?new WeakMap:void 0:p,h=d.meta;return n(c,u,{cache:f,equals:o,meta:h,strict:i})};if(e)return function(c,u){return n(c,u,{cache:new WeakMap,equals:o,meta:void 0,strict:i})};var s={cache:void 0,equals:o,meta:void 0,strict:i};return function(c,u){return n(c,u,s)}}var lr=Br();Br({strict:!0});Br({circular:!0});Br({circular:!0,strict:!0});Br({createInternalComparator:function(){return Eo}});Br({strict:!0,createInternalComparator:function(){return Eo}});Br({circular:!0,createInternalComparator:function(){return Eo}});Br({circular:!0,createInternalComparator:function(){return Eo},strict:!0});function Br(t){t===void 0&&(t={});var e=t.circular,n=e===void 0?!1:e,r=t.createInternalComparator,o=t.createState,i=t.strict,s=i===void 0?!1:i,a=Hy(t),c=Vy(a),u=r?r(c):zy(c);return Gy({circular:n,comparator:c,createState:o,equals:u,strict:s})}const Dw=w.createContext(null);function Ky(t,e){return{getTheme:function(){return e??null}}}function Ce(){const t=w.useContext(Dw);return t==null&&function(e,...n){const r=new URL("https://lexical.dev/docs/error"),o=new URLSearchParams;o.append("code",e);for(const i of n)o.append("v",i);throw r.search=o.toString(),Error(`Minified Lexical error #${e}; visit ${r.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}(8),t}function Mw(t,e){if(typeof document>"u"||typeof window>"u"&&global.window===void 0)throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");const n=document.createElement("div"),r=g.$getRoot().getChildren();for(let o=0;o<r.length;o++)Rw(t,r[o],n,e);return n.innerHTML}function Rw(t,e,n,r=null){let o=r===null||e.isSelected(r);const i=g.$isElementNode(e)&&e.excludeFromCopy("html");let s=e;if(r!==null){let h=g.$cloneWithProperties(e);h=g.$isTextNode(h)&&r!==null?Wx(r,h):h,s=h}const a=g.$isElementNode(s)?s.getChildren():[],c=g.getRegisteredNode(t,s.getType());let u;u=c&&c.exportDOM!==void 0?c.exportDOM(t,s):s.exportDOM(t);const{element:d,after:p}=u;if(!d)return!1;const f=document.createDocumentFragment();for(let h=0;h<a.length;h++){const b=a[h],x=Rw(t,b,f,r);!o&&g.$isElementNode(e)&&x&&e.extractWithChild(b,r,"html")&&(o=!0)}if(o&&!i){if((g.isHTMLElement(d)||g.isDocumentFragment(d))&&d.append(f),n.append(d),p){const h=p.call(s,d);h&&(g.isDocumentFragment(d)?d.replaceChildren(h):d.replaceWith(h))}}else n.append(f);return o}const Yy=new Set(["http:","https:","mailto:","sms:","tel:"]);let Ow=class jw extends g.ElementNode{static getType(){return"link"}static clone(e){return new jw(e.__url,{rel:e.__rel,target:e.__target,title:e.__title},e.__key)}constructor(e="",n={},r){super(r);const{target:o=null,rel:i=null,title:s=null}=n;this.__url=e,this.__target=o,this.__rel=i,this.__title=s}createDOM(e){const n=document.createElement("a");return this.updateLinkDOM(null,n,e),Cr(n,e.theme.link),n}updateLinkDOM(e,n,r){if(g.isHTMLAnchorElement(n)){e&&e.__url===this.__url||(n.href=this.sanitizeUrl(this.__url));for(const o of["target","rel","title"]){const i=`__${o}`,s=this[i];e&&e[i]===s||(s?n[o]=s:n.removeAttribute(o))}}}updateDOM(e,n,r){return this.updateLinkDOM(e,n,r),!1}static importDOM(){return{a:e=>({conversion:Wy,priority:1})}}static importJSON(e){return bc().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setURL(e.url).setRel(e.rel||null).setTarget(e.target||null).setTitle(e.title||null)}sanitizeUrl(e){e=bp(e);try{const n=new URL(bp(e));if(!Yy.has(n.protocol))return"about:blank"}catch{return e}return e}exportJSON(){return{...super.exportJSON(),rel:this.getRel(),target:this.getTarget(),title:this.getTitle(),url:this.getURL()}}getURL(){return this.getLatest().__url}setURL(e){const n=this.getWritable();return n.__url=e,n}getTarget(){return this.getLatest().__target}setTarget(e){const n=this.getWritable();return n.__target=e,n}getRel(){return this.getLatest().__rel}setRel(e){const n=this.getWritable();return n.__rel=e,n}getTitle(){return this.getLatest().__title}setTitle(e){const n=this.getWritable();return n.__title=e,n}insertNewAfter(e,n=!0){const r=bc(this.__url,{rel:this.__rel,target:this.__target,title:this.__title});return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n))return!1;const o=n.anchor.getNode(),i=n.focus.getNode();return this.isParentOf(o)&&this.isParentOf(i)&&n.getTextContent().length>0}isEmailURI(){return this.__url.startsWith("mailto:")}isWebSiteURI(){return this.__url.startsWith("https://")||this.__url.startsWith("http://")}};function Wy(t){let e=null;if(g.isHTMLAnchorElement(t)){const n=t.textContent;(n!==null&&n!==""||t.children.length>0)&&(e=bc(t.getAttribute("href")||"",{rel:t.getAttribute("rel"),target:t.getAttribute("target"),title:t.getAttribute("title")}))}return{node:e}}function bc(t="",e){return g.$applyNodeReplacement(new Ow(t,e))}function Jy(t){return t instanceof Ow}g.createCommand("TOGGLE_LINK_COMMAND");const Xy=/^\+?[0-9\s()-]{5,}$/;function bp(t){return t.match(/^[a-z][a-z0-9+.-]*:/i)||t.match(/^[/#.]/)?t:t.includes("@")?`mailto:${t}`:Xy.test(t)?`tel:${t}`:`https://${t}`}const Iw=[];let Lw=class $w extends g.ElementNode{static getType(){return"mark"}static clone(e){return new $w(e.__ids,e.__key)}static importDOM(){return null}static importJSON(e){return vp().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setIDs(e.ids)}exportJSON(){return{...super.exportJSON(),ids:this.getIDs()}}constructor(e=Iw,n){super(n),this.__ids=e}createDOM(e){const n=document.createElement("mark");return Cr(n,e.theme.mark),this.__ids.length>1&&Cr(n,e.theme.markOverlap),n}updateDOM(e,n,r){const o=e.__ids,i=this.__ids,s=o.length,a=i.length,c=r.theme.markOverlap;return s!==a&&(s===1?a===2&&Cr(n,c):a===1&&mc(n,c)),!1}hasID(e){return this.getIDs().includes(e)}getIDs(){return Array.from(this.getLatest().__ids)}setIDs(e){const n=this.getWritable();return n.__ids=e,n}addID(e){const n=this.getWritable();return n.__ids.includes(e)?n:n.setIDs([...n.__ids,e])}deleteID(e){const n=this.getWritable(),r=n.__ids.indexOf(e);if(r===-1)return n;const o=Array.from(n.__ids);return o.splice(r,1),n.setIDs(o)}insertNewAfter(e,n=!0){const r=vp(this.__ids);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,i=n.focus,s=o.getNode(),a=i.getNode(),c=n.isBackward()?o.offset-i.offset:i.offset-o.offset;return this.isParentOf(s)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}};function vp(t=Iw){return g.$applyNodeReplacement(new Lw(t))}function Qy(t){return t instanceof Lw}const Pw=Object.freeze({"	":"\\t","\n":"\\n"}),xp=new RegExp(Object.keys(Pw).join("|"),"g"),Kn=Object.freeze({ancestorHasNextSibling:"|",ancestorIsLastChild:" ",hasNextSibling:"├",isLastChild:"└",selectedChar:"^",selectedLine:">"}),Zy=[t=>t.hasFormat("bold")&&"Bold",t=>t.hasFormat("code")&&"Code",t=>t.hasFormat("italic")&&"Italic",t=>t.hasFormat("strikethrough")&&"Strikethrough",t=>t.hasFormat("subscript")&&"Subscript",t=>t.hasFormat("superscript")&&"Superscript",t=>t.hasFormat("underline")&&"Underline",t=>t.hasFormat("highlight")&&"Highlight"],e2=[t=>t.hasTextFormat("bold")&&"Bold",t=>t.hasTextFormat("code")&&"Code",t=>t.hasTextFormat("italic")&&"Italic",t=>t.hasTextFormat("strikethrough")&&"Strikethrough",t=>t.hasTextFormat("subscript")&&"Subscript",t=>t.hasTextFormat("superscript")&&"Superscript",t=>t.hasTextFormat("underline")&&"Underline",t=>t.hasTextFormat("highlight")&&"Highlight"],t2=[t=>t.isDirectionless()&&"Directionless",t=>t.isUnmergeable()&&"Unmergeable"],n2=[t=>t.isToken()&&"Token",t=>t.isSegmented()&&"Segmented"];function r2(t,e,n,r,o=!1){const i=t.getEditorState(),s=t._config,a=t._compositionKey,c=t._editable;if(n){let f="";return i.read(()=>{f=function(h){const b=document.createElement("div");return b.innerHTML=h.trim(),Bw(b,0).innerHTML}(Mw(t))}),f}let u=` root
`;const d=i.read(()=>{const f=g.$getSelection();return Fw(g.$getRoot(),(h,b)=>{const x=`(${h.getKey()})`,E=h.getType()||"",C=h.isSelected();u+=`${C?Kn.selectedLine:" "} ${b.join(" ")} ${x} ${E} ${function(_,D,$=!1){const H=D?D(_,$):void 0;if(H!==void 0&&H.length>0)return H;if(g.$isTextNode(_)){const O=_.getTextContent(),V=O.length===0?"(empty)":`"${yp(O,$)}"`,B=function(F){return[_p(F),o2(F),i2(F),Cp(F)].filter(Boolean).join(", ")}(_);return[V,B.length!==0?`{ ${B} }`:null].filter(Boolean).join(" ").trim()}if(Jy(_)){const O=_.getURL(),V=O.length===0?"(empty)":`"${yp(O,$)}"`,B=function(F){return[s2(F),a2(F),l2(F),Cp(F)].filter(Boolean).join(", ")}(_);return[V,B.length!==0?`{ ${B} }`:null].filter(Boolean).join(" ").trim()}if(Qy(_))return`ids: [ ${_.getIDs().join(", ")} ]`;if(g.$isParagraphNode(_)){const O=function(B){let F=e2.map(Y=>Y(B)).filter(Boolean).join(", ").toLocaleLowerCase();return F!==""&&(F="format: "+F),F}(_);let V=O!==""?`{ ${O} }`:"";return V+=_.__style?`(${_.__style})`:"",V}return""}(h,r,o)}
`,u+=function({indent:_,isSelected:D,node:$,nodeKeyDisplay:H,selection:O,typeDisplay:V}){if(!g.$isTextNode($)||!g.$isRangeSelection(O)||!D||g.$isElementNode($))return"";const B=O.anchor,F=O.focus;if($.getTextContent()===""||B.getNode()===O.focus.getNode()&&B.offset===F.offset)return"";const[Y,N]=function(L,J){const K=J.getStartEndPoints();if(g.$isNodeSelection(J)||K===null)return[-1,-1];const[W,ee]=K,te=L.getTextContent(),Z=te.length;let X=-1,le=-1;if(W.type==="text"&&ee.type==="text"){const ge=W.getNode(),he=ee.getNode();ge===he&&L===ge&&W.offset!==ee.offset?[X,le]=W.offset<ee.offset?[W.offset,ee.offset]:[ee.offset,W.offset]:[X,le]=L===ge?ge.isBefore(he)?[W.offset,Z]:[0,W.offset]:L===he?he.isBefore(ge)?[ee.offset,Z]:[0,ee.offset]:[0,Z]}const ce=(te.slice(0,X).match(xp)||[]).length,ue=(te.slice(X,le).match(xp)||[]).length;return[X+ce,le+ce+ue]}($,O);if(Y===N)return"";const M=_[_.length-1]===Kn.hasNextSibling?Kn.ancestorHasNextSibling:Kn.ancestorIsLastChild,S=[..._.slice(0,_.length-1),M],I=Array(Y+1).fill(" "),T=Array(N-Y).fill(Kn.selectedChar),A=V.length+2,P=Array(H.length+A).fill(" ");return[Kn.selectedLine,S.join(" "),[...P,...I,...T].join("")].join(" ")+`
`}({indent:b,isSelected:C,node:h,nodeKeyDisplay:x,selection:f,typeDisplay:E})}),f===null?": null":g.$isRangeSelection(f)?function(h){let b="";const x=_p(h);b+=`: range ${x!==""?`{ ${x} }`:""} ${h.style!==""?`{ style: ${h.style} } `:""}`;const E=h.anchor,C=h.focus,_=E.offset,D=C.offset;return b+=`
  ├ anchor { key: ${E.key}, offset: ${_===null?"null":_}, type: ${E.type} }`,b+=`
  └ focus { key: ${C.key}, offset: ${D===null?"null":D}, type: ${C.type} }`,b}(f):th.$isTableSelection(f)?function(h){return`: table
  └ { table: ${h.tableKey}, anchorCell: ${h.anchor.key}, focusCell: ${h.focus.key} }`}(f):function(h){return g.$isNodeSelection(h)?`: node
  └ [${Array.from(h._nodes).join(", ")}]`:""}(f)});if(u+=`
 selection`+d,u+=`

 commands:`,e.length)for(const{index:f,type:h,payload:b}of e)u+=`
  └ ${f}. { type: ${h}, payload: ${b instanceof Event?b.constructor.name:b} }`;else u+=`
  └ None dispatched.`;const{version:p}=t.constructor;return u+=`

 editor${p?` (v${p})`:""}:`,u+=`
  └ namespace ${s.namespace}`,a!==null&&(u+=`
  └ compositionKey ${a}`),u+=`
  └ editable ${String(c)}`,u}function Fw(t,e,n=[]){const r=t.getChildren(),o=r.length;r.forEach((i,s)=>{e(i,n.concat(s===o-1?Kn.isLastChild:Kn.hasNextSibling)),g.$isElementNode(i)&&Fw(i,e,n.concat(s===o-1?Kn.ancestorIsLastChild:Kn.ancestorHasNextSibling))})}function yp(t,e=!1){const n=Object.entries(Pw).reduce((r,[o,i])=>r.replace(new RegExp(o,"g"),String(i)),t);return e?n.replace(/[^\s]/g,"*"):n}function o2(t){let e=t2.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="detail: "+e),e}function i2(t){let e=n2.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="mode: "+e),e}function _p(t){let e=Zy.map(n=>n(t)).filter(Boolean).join(", ").toLocaleLowerCase();return e!==""&&(e="format: "+e),e}function s2(t){let e=t.getTarget();return e!=null&&(e="target: "+e),e}function a2(t){let e=t.getRel();return e!=null&&(e="rel: "+e),e}function l2(t){let e=t.getTitle();return e!=null&&(e="title: "+e),e}function Cp(t){if(!t.__state)return!1;const e=[];for(const[r,o]of t.__state.knownState.entries()){if(r.isEqual(o,r.defaultValue))continue;const i=JSON.stringify(r.unparse(o));e.push(`[${r.key}: ${i}]`)}let n=e.join(",");return n!==""&&(n="state: "+n),n}function Bw(t,e){const n=new Array(1+e++).join("  "),r=new Array(e-1).join("  ");let o;for(let i=0;i<t.children.length;i++)o=document.createTextNode(`
`+n),t.insertBefore(o,t.children[i]),Bw(t.children[i],e),t.lastElementChild===t.children[i]&&(o=document.createTextNode(`
`+r),t.appendChild(o));return t}const c2=w.forwardRef(function({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:o,timeTravelPanelClassName:i,editorState:s,setEditorState:a,setEditorReadOnly:c,generateContent:u,commandsLog:d=[]},p){const[f,h]=w.useState([]),[b,x]=w.useState(""),[E,C]=w.useState(!1),[_,D]=w.useState(!1),$=w.useRef(0),H=w.useRef(null),[O,V]=w.useState(!1),[B,F]=w.useState(!1),[Y,N]=w.useState(!1),M=w.useRef(),S=w.useRef([]),I=w.useRef(0),T=w.useCallback(P=>{const L=++I.current;u(P).then(J=>{L===I.current&&x(J)}).catch(J=>{L===I.current&&x(`Error rendering tree: ${J.message}

Stack:
${J.stack}`)})},[u]);w.useEffect(()=>{if(!(!Y&&s._nodeMap.size>1e3&&(F(!0),!Y))&&(M.current!==s||S.current!==d)){const P=M.current!==s;M.current=s,S.current=d,T(_),!E&&P&&h(L=>[...L,[Date.now(),s]])}},[s,T,_,Y,E,d]);const A=f.length;return w.useEffect(()=>{if(O){let P;const L=()=>{const J=$.current;if(J===A-1)return void V(!1);const K=f[J][0],W=f[J+1][0];P=setTimeout(()=>{$.current++;const ee=$.current,te=H.current;te!==null&&(te.value=String(ee)),a(f[ee][1]),L()},W-K)};return L(),()=>{clearTimeout(P)}}},[f,O,A,a]),l.jsxs("div",{className:o,children:[!Y&&B?l.jsxs("div",{style:{padding:20},children:[l.jsx("span",{style:{marginRight:20},children:"Detected large EditorState, this can impact debugging performance."}),l.jsx("button",{onClick:()=>{N(!0)},style:{background:"transparent",border:"1px solid white",color:"white",cursor:"pointer",padding:5},children:"Show full tree"})]}):null,Y?null:l.jsx("button",{onClick:()=>(T(!_),void D(!_)),className:t,type:"button",children:_?"Tree":"Export DOM"}),!E&&(Y||!B)&&A>2&&l.jsx("button",{onClick:()=>{c(!0),$.current=A-1,C(!0)},className:e,type:"button",children:"Time Travel"}),(Y||!B)&&l.jsx("pre",{ref:p,children:b}),E&&(Y||!B)&&l.jsxs("div",{className:i,children:[l.jsx("button",{className:r,onClick:()=>{$.current===A-1&&($.current=1),V(!O)},type:"button",children:O?"Pause":"Play"}),l.jsx("input",{className:n,ref:H,onChange:P=>{const L=Number(P.target.value),J=f[L];J&&($.current=L,a(J[1]))},type:"range",min:"1",max:A-1}),l.jsx("button",{className:r,onClick:()=>{c(!1);const P=f.length-1,L=f[P];a(L[1]);const J=H.current;J!==null&&(J.value=String(P)),C(!1),V(!1)},type:"button",children:"Exit"})]})]})});function u2(t,e){const n=new Set;let r=0;for(const[o]of t._commands)n.add(t.registerCommand(o,i=>(e(s=>{r+=1;const a=[...s];return a.push({index:r,payload:i,type:o.type?o.type:"UNKNOWN"}),a.length>10&&a.shift(),a}),!1),g.COMMAND_PRIORITY_CRITICAL));return()=>n.forEach(o=>o())}function d2(t){const[e,n]=w.useState([]);return w.useEffect(()=>u2(t,n),[t]),w.useMemo(()=>e,[e])}function p2({treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,timeTravelPanelClassName:o,viewClassName:i,editor:s,customPrintNode:a}){const c=Po.createRef(),[u,d]=w.useState(s.getEditorState()),p=d2(s);return w.useEffect(()=>Mt(s.registerUpdateListener(({editorState:f})=>{d(f)}),s.registerEditableListener(()=>{d(s.getEditorState())})),[s]),w.useEffect(()=>{const f=c.current;if(f!==null)return f.__lexicalEditor=s,()=>{f.__lexicalEditor=null}},[s,c]),l.jsx(c2,{treeTypeButtonClassName:t,timeTravelButtonClassName:e,timeTravelPanelSliderClassName:n,timeTravelPanelButtonClassName:r,viewClassName:i,timeTravelPanelClassName:o,setEditorReadOnly:f=>{const h=s.getRootElement();h!=null&&(h.contentEditable=f?"false":"true")},editorState:u,setEditorState:f=>s.setEditorState(f),generateContent:async function(f){return r2(s,p,f,a)},ref:c,commandsLog:p})}const qw=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,f2=qw?w.useLayoutEffect:w.useEffect,Gs={tag:g.HISTORY_MERGE_TAG};function Uw({initialConfig:t,children:e}){const n=w.useMemo(()=>{const{theme:r,namespace:o,nodes:i,onError:s,editorState:a,html:c}=t,u=Ky(null,r),d=g.createEditor({editable:t.editable,html:c,namespace:o,nodes:i,onError:p=>s(p,d),theme:r});return function(p,f){if(f!==null){if(f===void 0)p.update(()=>{const h=g.$getRoot();if(h.isEmpty()){const b=g.$createParagraphNode();h.append(b);const x=qw?document.activeElement:null;(g.$getSelection()!==null||x!==null&&x===p.getRootElement())&&b.select()}},Gs);else if(f!==null)switch(typeof f){case"string":{const h=p.parseEditorState(f);p.setEditorState(h,Gs);break}case"object":p.setEditorState(f,Gs);break;case"function":p.update(()=>{g.$getRoot().isEmpty()&&f(p)},Gs)}}}(d,a),[d,u]},[]);return f2(()=>{const r=t.editable,[o]=n;o.setEditable(r===void 0||r)},[]),l.jsx(Dw.Provider,{value:n,children:e})}function Vw(){return g.$getRoot().getTextContent()}function Hw(t,e=!0){if(t)return!1;let n=Vw();return e&&(n=n.trim()),n===""}function h2(t){if(!Hw(t,!1))return!1;const e=g.$getRoot().getChildren(),n=e.length;if(n>1)return!1;for(let r=0;r<n;r++){const o=e[r];if(g.$isDecoratorNode(o))return!1;if(g.$isElementNode(o)){if(!g.$isParagraphNode(o)||o.__indent!==0)return!1;const i=o.getChildren(),s=i.length;for(let a=0;a<s;a++){const c=i[r];if(!g.$isTextNode(c))return!1}}}return!0}function xu(t){return()=>h2(t)}const zw=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function w2({editor:t,ariaActiveDescendant:e,ariaAutoComplete:n,ariaControls:r,ariaDescribedBy:o,ariaErrorMessage:i,ariaExpanded:s,ariaInvalid:a,ariaLabel:c,ariaLabelledBy:u,ariaMultiline:d,ariaOwns:p,ariaRequired:f,autoCapitalize:h,className:b,id:x,role:E="textbox",spellCheck:C=!0,style:_,tabIndex:D,"data-testid":$,...H},O){const[V,B]=w.useState(t.isEditable()),F=w.useCallback(N=>{N&&N.ownerDocument&&N.ownerDocument.defaultView?t.setRootElement(N):t.setRootElement(null)},[t]),Y=w.useMemo(()=>function(...N){return M=>{N.forEach(S=>{typeof S=="function"?S(M):S!=null&&(S.current=M)})}}(O,F),[F,O]);return zw(()=>(B(t.isEditable()),t.registerEditableListener(N=>{B(N)})),[t]),l.jsx("div",{"aria-activedescendant":V?e:void 0,"aria-autocomplete":V?n:"none","aria-controls":V?r:void 0,"aria-describedby":o,...i!=null?{"aria-errormessage":i}:{},"aria-expanded":V&&E==="combobox"?!!s:void 0,...a!=null?{"aria-invalid":a}:{},"aria-label":c,"aria-labelledby":u,"aria-multiline":d,"aria-owns":V?p:void 0,"aria-readonly":!V||void 0,"aria-required":f,autoCapitalize:h,className:b,contentEditable:V,"data-testid":$,id:x,ref:Y,role:E,spellCheck:C,style:_,tabIndex:D,...H})}const g2=w.forwardRef(w2);function Ep(t){return t.getEditorState().read(xu(t.isComposing()))}const Gw=w.forwardRef(m2);function m2(t,e){const{placeholder:n,...r}=t,[o]=Ce();return l.jsxs(l.Fragment,{children:[l.jsx(g2,{editor:o,...r,ref:e}),n!=null&&l.jsx(b2,{editor:o,content:n})]})}function b2({content:t,editor:e}){const n=function(s){const[a,c]=w.useState(()=>Ep(s));return zw(()=>{function u(){const d=Ep(s);c(d)}return u(),Mt(s.registerUpdateListener(()=>{u()}),s.registerEditableListener(()=>{u()}))},[s]),a}(e),[r,o]=w.useState(e.isEditable());if(w.useLayoutEffect(()=>(o(e.isEditable()),e.registerEditableListener(s=>{o(s)})),[e]),!n)return null;let i=null;return typeof t=="function"?i=t(r):t!==null&&(i=t),i===null?null:l.jsx("div",{"aria-hidden":!0,children:i})}function Kw({editorRef:t}){const[e]=Ce();return Po.useEffect(()=>{typeof t=="function"?t(e):typeof t=="object"&&(t.current=e)},[e]),null}function vc(t,e){return vc=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},vc(t,e)}var kp={error:null},v2=function(t){var e,n;function r(){for(var i,s=arguments.length,a=new Array(s),c=0;c<s;c++)a[c]=arguments[c];return(i=t.call.apply(t,[this].concat(a))||this).state=kp,i.resetErrorBoundary=function(){for(var u,d=arguments.length,p=new Array(d),f=0;f<d;f++)p[f]=arguments[f];i.props.onReset==null||(u=i.props).onReset.apply(u,p),i.reset()},i}n=t,(e=r).prototype=Object.create(n.prototype),e.prototype.constructor=e,vc(e,n),r.getDerivedStateFromError=function(i){return{error:i}};var o=r.prototype;return o.reset=function(){this.setState(kp)},o.componentDidCatch=function(i,s){var a,c;(a=(c=this.props).onError)==null||a.call(c,i,s)},o.componentDidUpdate=function(i,s){var a,c,u,d,p=this.state.error,f=this.props.resetKeys;p!==null&&s.error!==null&&((u=i.resetKeys)===void 0&&(u=[]),(d=f)===void 0&&(d=[]),u.length!==d.length||u.some(function(h,b){return!Object.is(h,d[b])}))&&((a=(c=this.props).onResetKeysChange)==null||a.call(c,i.resetKeys,f),this.reset())},o.render=function(){var i=this.state.error,s=this.props,a=s.fallbackRender,c=s.FallbackComponent,u=s.fallback;if(i!==null){var d={error:i,resetErrorBoundary:this.resetErrorBoundary};if(Po.isValidElement(u))return u;if(typeof a=="function")return a(d);if(c)return Po.createElement(c,d);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},r}(Po.Component);function Yw({children:t,onError:e}){return l.jsx(v2,{fallback:l.jsx("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"},children:"An error was thrown."}),onError:e,children:t})}const Ks=0,xc=1,yc=2,Tn=0,x2=1,Np=2,y2=3,_2=4;function C2(t,e,n,r,o){if(t===null||n.size===0&&r.size===0&&!o)return Tn;const i=e._selection,s=t._selection;if(o)return x2;if(!(g.$isRangeSelection(i)&&g.$isRangeSelection(s)&&s.isCollapsed()&&i.isCollapsed()))return Tn;const a=function(C,_,D){const $=C._nodeMap,H=[];for(const O of _){const V=$.get(O);V!==void 0&&H.push(V)}for(const[O,V]of D){if(!V)continue;const B=$.get(O);B===void 0||g.$isRootNode(B)||H.push(B)}return H}(e,n,r);if(a.length===0)return Tn;if(a.length>1){const C=e._nodeMap,_=C.get(i.anchor.key),D=C.get(s.anchor.key);return _&&D&&!t._nodeMap.has(_.__key)&&g.$isTextNode(_)&&_.__text.length===1&&i.anchor.offset===1?Np:Tn}const c=a[0],u=t._nodeMap.get(c.__key);if(!g.$isTextNode(u)||!g.$isTextNode(c)||u.__mode!==c.__mode)return Tn;const d=u.__text,p=c.__text;if(d===p)return Tn;const f=i.anchor,h=s.anchor;if(f.key!==h.key||f.type!=="text")return Tn;const b=f.offset,x=h.offset,E=p.length-d.length;return E===1&&x===b-1?Np:E===-1&&x===b+1?y2:E===-1&&x===b?_2:Tn}function E2(t,e){let n=Date.now(),r=Tn;return(o,i,s,a,c,u)=>{const d=Date.now();if(u.has(g.HISTORIC_TAG))return r=Tn,n=d,yc;const p=C2(o,i,a,c,t.isComposing()),f=(()=>{const h=s===null||s.editor===t,b=u.has(g.HISTORY_PUSH_TAG);if(!b&&h&&u.has(g.HISTORY_MERGE_TAG))return Ks;if(o===null)return xc;const x=i._selection;return a.size>0||c.size>0?b===!1&&p!==Tn&&p===r&&d<n+e&&h||a.size===1&&function(E,C,_){const D=C._nodeMap.get(E),$=_._nodeMap.get(E),H=C._selection,O=_._selection;return!(g.$isRangeSelection(H)&&g.$isRangeSelection(O)&&H.anchor.type==="element"&&H.focus.type==="element"&&O.anchor.type==="text"&&O.focus.type==="text"||!g.$isTextNode(D)||!g.$isTextNode($)||D.__parent!==$.__parent)&&JSON.stringify(C.read(()=>D.exportJSON()))===JSON.stringify(_.read(()=>$.exportJSON()))}(Array.from(a)[0],o,i)?Ks:xc:x!==null?Ks:yc})();return n=d,r=p,f}}function Sp(t){t.undoStack=[],t.redoStack=[],t.current=null}function k2(t,e,n){const r=E2(t,n);return Mt(t.registerCommand(g.UNDO_COMMAND,()=>(function(i,s){const a=s.redoStack,c=s.undoStack;if(c.length!==0){const u=s.current,d=c.pop();u!==null&&(a.push(u),i.dispatchCommand(g.CAN_REDO_COMMAND,!0)),c.length===0&&i.dispatchCommand(g.CAN_UNDO_COMMAND,!1),s.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REDO_COMMAND,()=>(function(i,s){const a=s.redoStack,c=s.undoStack;if(a.length!==0){const u=s.current;u!==null&&(c.push(u),i.dispatchCommand(g.CAN_UNDO_COMMAND,!0));const d=a.pop();a.length===0&&i.dispatchCommand(g.CAN_REDO_COMMAND,!1),s.current=d||null,d&&d.editor.setEditorState(d.editorState,{tag:g.HISTORIC_TAG})}}(t,e),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_EDITOR_COMMAND,()=>(Sp(e),!1),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CLEAR_HISTORY_COMMAND,()=>(Sp(e),t.dispatchCommand(g.CAN_REDO_COMMAND,!1),t.dispatchCommand(g.CAN_UNDO_COMMAND,!1),!0),g.COMMAND_PRIORITY_EDITOR),t.registerUpdateListener(({editorState:i,prevEditorState:s,dirtyLeaves:a,dirtyElements:c,tags:u})=>{const d=e.current,p=e.redoStack,f=e.undoStack,h=d===null?null:d.editorState;if(d!==null&&i===h)return;const b=r(s,i,d,a,c,u);if(b===xc)p.length!==0&&(e.redoStack=[],t.dispatchCommand(g.CAN_REDO_COMMAND,!1)),d!==null&&(f.push({...d}),t.dispatchCommand(g.CAN_UNDO_COMMAND,!0));else if(b===yc)return;e.current={editor:t,editorState:i}}))}function N2(){return{current:null,redoStack:[],undoStack:[]}}function Ww({delay:t,externalHistoryState:e}){const[n]=Ce();return function(r,o,i=1e3){const s=w.useMemo(()=>o||N2(),[o]);w.useEffect(()=>k2(r,s,i),[i,r,s])}(n,e,t),null}const S2=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function T2(t){return{initialValueFn:()=>t.isEditable(),subscribe:e=>t.registerEditableListener(e)}}function Jw(){return function(t){const[e]=Ce(),n=w.useMemo(()=>t(e),[e,t]),[r,o]=w.useState(()=>n.initialValueFn()),i=w.useRef(r);return S2(()=>{const{initialValueFn:s,subscribe:a}=n,c=s();return i.current!==c&&(i.current=c,o(c)),a(u=>{i.current=u,o(u)})},[n,t]),r}(T2)}function Xw(t){const e=window.location.origin,n=r=>{if(r.origin!==e)return;const o=t.getRootElement();if(document.activeElement!==o)return;const i=r.data;if(typeof i=="string"){let s;try{s=JSON.parse(i)}catch{return}if(s&&s.protocol==="nuanria_messaging"&&s.type==="request"){const a=s.payload;if(a&&a.functionId==="makeChanges"){const c=a.args;if(c){const[u,d,p,f,h,b]=c;t.update(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){const E=x.anchor;let C=E.getNode(),_=0,D=0;if(g.$isTextNode(C)&&u>=0&&d>=0&&(_=u,D=u+d,x.setTextNodeRange(C,_,C,D)),_===D&&p===""||(x.insertRawText(p),C=E.getNode()),g.$isTextNode(C)){_=f,D=f+h;const $=C.getTextContentSize();_=_>$?$:_,D=D>$?$:D,x.setTextNodeRange(C,_,C,D)}r.stopImmediatePropagation()}})}}}}};return window.addEventListener("message",n,!0),()=>{window.removeEventListener("message",n,!0)}}const _c=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function Tp(t){return t.getEditorState().read(xu(t.isComposing()))}function A2({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=Ce(),o=function(i,s){const[a,c]=w.useState(()=>i.getDecorators());return _c(()=>i.registerDecoratorListener(u=>{Xt.flushSync(()=>{c(u)})}),[i]),w.useEffect(()=>{c(i.getDecorators())},[i]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(s,{onError:x=>i._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=i.getElementByKey(f);b!==null&&u.push(Xt.createPortal(h,b,f))}return u},[s,a,i])}(r,n);return function(i){_c(()=>Mt(ua.registerRichText(i),Xw(i)),[i])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(D2,{content:e}),o]})}function D2({content:t}){const[e]=Ce(),n=function(o){const[i,s]=w.useState(()=>Tp(o));return _c(()=>{function a(){const c=Tp(o);s(c)}return a(),Mt(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),i}(e),r=Jw();return n?typeof t=="function"?t(r):t:null}const ha=Math.min,ro=Math.max,wa=Math.round,Ys=Math.floor,Xn=t=>({x:t,y:t}),M2={left:"right",right:"left",bottom:"top",top:"bottom"},R2={start:"end",end:"start"};function Ap(t,e,n){return ro(t,ha(e,n))}function yu(t,e){return typeof t=="function"?t(e):t}function Yo(t){return t.split("-")[0]}function _u(t){return t.split("-")[1]}function Qw(t){return t==="x"?"y":"x"}function Zw(t){return t==="y"?"height":"width"}const O2=new Set(["top","bottom"]);function to(t){return O2.has(Yo(t))?"y":"x"}function eg(t){return Qw(to(t))}function j2(t,e,n){n===void 0&&(n=!1);const r=_u(t),o=eg(t),i=Zw(o);let s=o==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=ga(s)),[s,ga(s)]}function I2(t){const e=ga(t);return[Cc(t),e,Cc(e)]}function Cc(t){return t.replace(/start|end/g,e=>R2[e])}const Dp=["left","right"],Mp=["right","left"],L2=["top","bottom"],$2=["bottom","top"];function P2(t,e,n){switch(t){case"top":case"bottom":return n?e?Mp:Dp:e?Dp:Mp;case"left":case"right":return e?L2:$2;default:return[]}}function F2(t,e,n,r){const o=_u(t);let i=P2(Yo(t),n==="start",r);return o&&(i=i.map(s=>s+"-"+o),e&&(i=i.concat(i.map(Cc)))),i}function ga(t){return t.replace(/left|right|bottom|top/g,e=>M2[e])}function B2(t){return{top:0,right:0,bottom:0,left:0,...t}}function q2(t){return typeof t!="number"?B2(t):{top:t,right:t,bottom:t,left:t}}function ma(t){const{x:e,y:n,width:r,height:o}=t;return{width:r,height:o,top:n,left:e,right:e+r,bottom:n+o,x:e,y:n}}function Rp(t,e,n){let{reference:r,floating:o}=t;const i=to(e),s=eg(e),a=Zw(s),c=Yo(e),u=i==="y",d=r.x+r.width/2-o.width/2,p=r.y+r.height/2-o.height/2,f=r[a]/2-o[a]/2;let h;switch(c){case"top":h={x:d,y:r.y-o.height};break;case"bottom":h={x:d,y:r.y+r.height};break;case"right":h={x:r.x+r.width,y:p};break;case"left":h={x:r.x-o.width,y:p};break;default:h={x:r.x,y:r.y}}switch(_u(e)){case"start":h[s]-=f*(n&&u?-1:1);break;case"end":h[s]+=f*(n&&u?-1:1);break}return h}const U2=async(t,e,n)=>{const{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:s}=n,a=i.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(e));let u=await s.getElementRects({reference:t,floating:e,strategy:o}),{x:d,y:p}=Rp(u,r,c),f=r,h={},b=0;for(let x=0;x<a.length;x++){const{name:E,fn:C}=a[x],{x:_,y:D,data:$,reset:H}=await C({x:d,y:p,initialPlacement:r,placement:f,strategy:o,middlewareData:h,rects:u,platform:s,elements:{reference:t,floating:e}});d=_??d,p=D??p,h={...h,[E]:{...h[E],...$}},H&&b<=50&&(b++,typeof H=="object"&&(H.placement&&(f=H.placement),H.rects&&(u=H.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:o}):H.rects),{x:d,y:p}=Rp(u,f,c)),x=-1)}return{x:d,y:p,placement:f,strategy:o,middlewareData:h}};async function tg(t,e){var n;e===void 0&&(e={});const{x:r,y:o,platform:i,rects:s,elements:a,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:d="viewport",elementContext:p="floating",altBoundary:f=!1,padding:h=0}=yu(e,t),b=q2(h),E=a[f?p==="floating"?"reference":"floating":p],C=ma(await i.getClippingRect({element:(n=await(i.isElement==null?void 0:i.isElement(E)))==null||n?E:E.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:u,rootBoundary:d,strategy:c})),_=p==="floating"?{x:r,y:o,width:s.floating.width,height:s.floating.height}:s.reference,D=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),$=await(i.isElement==null?void 0:i.isElement(D))?await(i.getScale==null?void 0:i.getScale(D))||{x:1,y:1}:{x:1,y:1},H=ma(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:_,offsetParent:D,strategy:c}):_);return{top:(C.top-H.top+b.top)/$.y,bottom:(H.bottom-C.bottom+b.bottom)/$.y,left:(C.left-H.left+b.left)/$.x,right:(H.right-C.right+b.right)/$.x}}const V2=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,r;const{placement:o,middlewareData:i,rects:s,initialPlacement:a,platform:c,elements:u}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:h="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:x=!0,...E}=yu(t,e);if((n=i.arrow)!=null&&n.alignmentOffset)return{};const C=Yo(o),_=to(a),D=Yo(a)===a,$=await(c.isRTL==null?void 0:c.isRTL(u.floating)),H=f||(D||!x?[ga(a)]:I2(a)),O=b!=="none";!f&&O&&H.push(...F2(a,x,b,$));const V=[a,...H],B=await tg(e,E),F=[];let Y=((r=i.flip)==null?void 0:r.overflows)||[];if(d&&F.push(B[C]),p){const I=j2(o,s,$);F.push(B[I[0]],B[I[1]])}if(Y=[...Y,{placement:o,overflows:F}],!F.every(I=>I<=0)){var N,M;const I=(((N=i.flip)==null?void 0:N.index)||0)+1,T=V[I];if(T&&(!(p==="alignment"?_!==to(T):!1)||Y.every(L=>to(L.placement)===_?L.overflows[0]>0:!0)))return{data:{index:I,overflows:Y},reset:{placement:T}};let A=(M=Y.filter(P=>P.overflows[0]<=0).sort((P,L)=>P.overflows[1]-L.overflows[1])[0])==null?void 0:M.placement;if(!A)switch(h){case"bestFit":{var S;const P=(S=Y.filter(L=>{if(O){const J=to(L.placement);return J===_||J==="y"}return!0}).map(L=>[L.placement,L.overflows.filter(J=>J>0).reduce((J,K)=>J+K,0)]).sort((L,J)=>L[1]-J[1])[0])==null?void 0:S[0];P&&(A=P);break}case"initialPlacement":A=a;break}if(o!==A)return{reset:{placement:A}}}return{}}}},H2=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:o}=e,{mainAxis:i=!0,crossAxis:s=!1,limiter:a={fn:E=>{let{x:C,y:_}=E;return{x:C,y:_}}},...c}=yu(t,e),u={x:n,y:r},d=await tg(e,c),p=to(Yo(o)),f=Qw(p);let h=u[f],b=u[p];if(i){const E=f==="y"?"top":"left",C=f==="y"?"bottom":"right",_=h+d[E],D=h-d[C];h=Ap(_,h,D)}if(s){const E=p==="y"?"top":"left",C=p==="y"?"bottom":"right",_=b+d[E],D=b-d[C];b=Ap(_,b,D)}const x=a.fn({...e,[f]:h,[p]:b});return{...x,data:{x:x.x-n,y:x.y-r,enabled:{[f]:i,[p]:s}}}}}};function Ja(){return typeof window<"u"}function pi(t){return ng(t)?(t.nodeName||"").toLowerCase():"#document"}function wn(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function rr(t){var e;return(e=(ng(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function ng(t){return Ja()?t instanceof Node||t instanceof wn(t).Node:!1}function On(t){return Ja()?t instanceof Element||t instanceof wn(t).Element:!1}function tr(t){return Ja()?t instanceof HTMLElement||t instanceof wn(t).HTMLElement:!1}function Op(t){return!Ja()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof wn(t).ShadowRoot}const z2=new Set(["inline","contents"]);function ms(t){const{overflow:e,overflowX:n,overflowY:r,display:o}=jn(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+n)&&!z2.has(o)}const G2=new Set(["table","td","th"]);function K2(t){return G2.has(pi(t))}const Y2=[":popover-open",":modal"];function Xa(t){return Y2.some(e=>{try{return t.matches(e)}catch{return!1}})}const W2=["transform","translate","scale","rotate","perspective"],J2=["transform","translate","scale","rotate","perspective","filter"],X2=["paint","layout","strict","content"];function Cu(t){const e=Eu(),n=On(t)?jn(t):t;return W2.some(r=>n[r]?n[r]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||J2.some(r=>(n.willChange||"").includes(r))||X2.some(r=>(n.contain||"").includes(r))}function Q2(t){let e=Rr(t);for(;tr(e)&&!Wo(e);){if(Cu(e))return e;if(Xa(e))return null;e=Rr(e)}return null}function Eu(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Z2=new Set(["html","body","#document"]);function Wo(t){return Z2.has(pi(t))}function jn(t){return wn(t).getComputedStyle(t)}function Qa(t){return On(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Rr(t){if(pi(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Op(t)&&t.host||rr(t);return Op(e)?e.host:e}function rg(t){const e=Rr(t);return Wo(e)?t.ownerDocument?t.ownerDocument.body:t.body:tr(e)&&ms(e)?e:rg(e)}function Yi(t,e,n){var r;e===void 0&&(e=[]),n===void 0&&(n=!0);const o=rg(t),i=o===((r=t.ownerDocument)==null?void 0:r.body),s=wn(o);if(i){const a=Ec(s);return e.concat(s,s.visualViewport||[],ms(o)?o:[],a&&n?Yi(a):[])}return e.concat(o,Yi(o,[],n))}function Ec(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function og(t){const e=jn(t);let n=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const o=tr(t),i=o?t.offsetWidth:n,s=o?t.offsetHeight:r,a=wa(n)!==i||wa(r)!==s;return a&&(n=i,r=s),{width:n,height:r,$:a}}function ku(t){return On(t)?t:t.contextElement}function qo(t){const e=ku(t);if(!tr(e))return Xn(1);const n=e.getBoundingClientRect(),{width:r,height:o,$:i}=og(e);let s=(i?wa(n.width):n.width)/r,a=(i?wa(n.height):n.height)/o;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}const e_=Xn(0);function ig(t){const e=wn(t);return!Eu()||!e.visualViewport?e_:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function t_(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==wn(t)?!1:e}function lo(t,e,n,r){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),i=ku(t);let s=Xn(1);e&&(r?On(r)&&(s=qo(r)):s=qo(t));const a=t_(i,n,r)?ig(i):Xn(0);let c=(o.left+a.x)/s.x,u=(o.top+a.y)/s.y,d=o.width/s.x,p=o.height/s.y;if(i){const f=wn(i),h=r&&On(r)?wn(r):r;let b=f,x=Ec(b);for(;x&&r&&h!==b;){const E=qo(x),C=x.getBoundingClientRect(),_=jn(x),D=C.left+(x.clientLeft+parseFloat(_.paddingLeft))*E.x,$=C.top+(x.clientTop+parseFloat(_.paddingTop))*E.y;c*=E.x,u*=E.y,d*=E.x,p*=E.y,c+=D,u+=$,b=wn(x),x=Ec(b)}}return ma({width:d,height:p,x:c,y:u})}function Za(t,e){const n=Qa(t).scrollLeft;return e?e.left+n:lo(rr(t)).left+n}function sg(t,e){const n=t.getBoundingClientRect(),r=n.left+e.scrollLeft-Za(t,n),o=n.top+e.scrollTop;return{x:r,y:o}}function n_(t){let{elements:e,rect:n,offsetParent:r,strategy:o}=t;const i=o==="fixed",s=rr(r),a=e?Xa(e.floating):!1;if(r===s||a&&i)return n;let c={scrollLeft:0,scrollTop:0},u=Xn(1);const d=Xn(0),p=tr(r);if((p||!p&&!i)&&((pi(r)!=="body"||ms(s))&&(c=Qa(r)),tr(r))){const h=lo(r);u=qo(r),d.x=h.x+r.clientLeft,d.y=h.y+r.clientTop}const f=s&&!p&&!i?sg(s,c):Xn(0);return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-c.scrollLeft*u.x+d.x+f.x,y:n.y*u.y-c.scrollTop*u.y+d.y+f.y}}function r_(t){return Array.from(t.getClientRects())}function o_(t){const e=rr(t),n=Qa(t),r=t.ownerDocument.body,o=ro(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),i=ro(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let s=-n.scrollLeft+Za(t);const a=-n.scrollTop;return jn(r).direction==="rtl"&&(s+=ro(e.clientWidth,r.clientWidth)-o),{width:o,height:i,x:s,y:a}}const jp=25;function i_(t,e){const n=wn(t),r=rr(t),o=n.visualViewport;let i=r.clientWidth,s=r.clientHeight,a=0,c=0;if(o){i=o.width,s=o.height;const d=Eu();(!d||d&&e==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}const u=Za(r);if(u<=0){const d=r.ownerDocument,p=d.body,f=getComputedStyle(p),h=d.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,b=Math.abs(r.clientWidth-p.clientWidth-h);b<=jp&&(i-=b)}else u<=jp&&(i+=u);return{width:i,height:s,x:a,y:c}}const s_=new Set(["absolute","fixed"]);function a_(t,e){const n=lo(t,!0,e==="fixed"),r=n.top+t.clientTop,o=n.left+t.clientLeft,i=tr(t)?qo(t):Xn(1),s=t.clientWidth*i.x,a=t.clientHeight*i.y,c=o*i.x,u=r*i.y;return{width:s,height:a,x:c,y:u}}function Ip(t,e,n){let r;if(e==="viewport")r=i_(t,n);else if(e==="document")r=o_(rr(t));else if(On(e))r=a_(e,n);else{const o=ig(t);r={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return ma(r)}function ag(t,e){const n=Rr(t);return n===e||!On(n)||Wo(n)?!1:jn(n).position==="fixed"||ag(n,e)}function l_(t,e){const n=e.get(t);if(n)return n;let r=Yi(t,[],!1).filter(a=>On(a)&&pi(a)!=="body"),o=null;const i=jn(t).position==="fixed";let s=i?Rr(t):t;for(;On(s)&&!Wo(s);){const a=jn(s),c=Cu(s);!c&&a.position==="fixed"&&(o=null),(i?!c&&!o:!c&&a.position==="static"&&!!o&&s_.has(o.position)||ms(s)&&!c&&ag(t,s))?r=r.filter(d=>d!==s):o=a,s=Rr(s)}return e.set(t,r),r}function c_(t){let{element:e,boundary:n,rootBoundary:r,strategy:o}=t;const s=[...n==="clippingAncestors"?Xa(e)?[]:l_(e,this._c):[].concat(n),r],a=s[0],c=s.reduce((u,d)=>{const p=Ip(e,d,o);return u.top=ro(p.top,u.top),u.right=ha(p.right,u.right),u.bottom=ha(p.bottom,u.bottom),u.left=ro(p.left,u.left),u},Ip(e,a,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function u_(t){const{width:e,height:n}=og(t);return{width:e,height:n}}function d_(t,e,n){const r=tr(e),o=rr(e),i=n==="fixed",s=lo(t,!0,i,e);let a={scrollLeft:0,scrollTop:0};const c=Xn(0);function u(){c.x=Za(o)}if(r||!r&&!i)if((pi(e)!=="body"||ms(o))&&(a=Qa(e)),r){const h=lo(e,!0,i,e);c.x=h.x+e.clientLeft,c.y=h.y+e.clientTop}else o&&u();i&&!r&&o&&u();const d=o&&!r&&!i?sg(o,a):Xn(0),p=s.left+a.scrollLeft-c.x-d.x,f=s.top+a.scrollTop-c.y-d.y;return{x:p,y:f,width:s.width,height:s.height}}function ql(t){return jn(t).position==="static"}function Lp(t,e){if(!tr(t)||jn(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return rr(t)===n&&(n=n.ownerDocument.body),n}function lg(t,e){const n=wn(t);if(Xa(t))return n;if(!tr(t)){let o=Rr(t);for(;o&&!Wo(o);){if(On(o)&&!ql(o))return o;o=Rr(o)}return n}let r=Lp(t,e);for(;r&&K2(r)&&ql(r);)r=Lp(r,e);return r&&Wo(r)&&ql(r)&&!Cu(r)?n:r||Q2(t)||n}const p_=async function(t){const e=this.getOffsetParent||lg,n=this.getDimensions,r=await n(t.floating);return{reference:d_(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function f_(t){return jn(t).direction==="rtl"}const h_={convertOffsetParentRelativeRectToViewportRelativeRect:n_,getDocumentElement:rr,getClippingRect:c_,getOffsetParent:lg,getElementRects:p_,getClientRects:r_,getDimensions:u_,getScale:qo,isElement:On,isRTL:f_};function cg(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function w_(t,e){let n=null,r;const o=rr(t);function i(){var a;clearTimeout(r),(a=n)==null||a.disconnect(),n=null}function s(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),i();const u=t.getBoundingClientRect(),{left:d,top:p,width:f,height:h}=u;if(a||e(),!f||!h)return;const b=Ys(p),x=Ys(o.clientWidth-(d+f)),E=Ys(o.clientHeight-(p+h)),C=Ys(d),D={rootMargin:-b+"px "+-x+"px "+-E+"px "+-C+"px",threshold:ro(0,ha(1,c))||1};let $=!0;function H(O){const V=O[0].intersectionRatio;if(V!==c){if(!$)return s();V?s(!1,V):r=setTimeout(()=>{s(!1,1e-7)},1e3)}V===1&&!cg(u,t.getBoundingClientRect())&&s(),$=!1}try{n=new IntersectionObserver(H,{...D,root:o.ownerDocument})}catch{n=new IntersectionObserver(H,D)}n.observe(t)}return s(!0),i}function g_(t,e,n,r){r===void 0&&(r={});const{ancestorScroll:o=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,u=ku(t),d=o||i?[...u?Yi(u):[],...Yi(e)]:[];d.forEach(C=>{o&&C.addEventListener("scroll",n,{passive:!0}),i&&C.addEventListener("resize",n)});const p=u&&a?w_(u,n):null;let f=-1,h=null;s&&(h=new ResizeObserver(C=>{let[_]=C;_&&_.target===u&&h&&(h.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var D;(D=h)==null||D.observe(e)})),n()}),u&&!c&&h.observe(u),h.observe(e));let b,x=c?lo(t):null;c&&E();function E(){const C=lo(t);x&&!cg(x,C)&&n(),x=C,b=requestAnimationFrame(E)}return n(),()=>{var C;d.forEach(_=>{o&&_.removeEventListener("scroll",n),i&&_.removeEventListener("resize",n)}),p==null||p(),(C=h)==null||C.disconnect(),h=null,c&&cancelAnimationFrame(b)}}const m_=H2,b_=V2,v_=(t,e,n)=>{const r=new Map,o={platform:h_,...n},i={...o.platform,_c:r};return U2(t,e,{...o,platform:i})},kc=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,x_=kc?w.useLayoutEffect:w.useEffect;let y_=class{constructor(e){this.key=e,this.ref={current:null},this.setRefElement=this.setRefElement.bind(this)}setRefElement(e){this.ref={current:e}}};const $p=t=>{const e=document.getElementById("typeahead-menu");if(!e)return;const n=e.getBoundingClientRect();n.top+n.height>window.innerHeight&&e.scrollIntoView({block:"center"}),n.top<0&&e.scrollIntoView({block:"center"}),t.scrollIntoView({block:"nearest"})};function Pp(t,e){const n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top>r.top&&n.top<r.bottom}function __(t,e,n,r){const[o]=Ce();w.useEffect(()=>{if(e!=null&&t!=null){const i=o.getRootElement(),s=i!=null?function(p,f){let h=getComputedStyle(p);const b=h.position==="absolute",x=/(auto|scroll)/;if(h.position==="fixed")return document.body;for(let E=p;E=E.parentElement;)if(h=getComputedStyle(E),(!b||h.position!=="static")&&x.test(h.overflow+h.overflowY+h.overflowX))return E;return document.body}(i):document.body;let a=!1,c=Pp(e,s);const u=function(){a||(window.requestAnimationFrame(function(){n(),a=!1}),a=!0);const p=Pp(e,s);p!==c&&(c=p,r!=null&&r(p))},d=new ResizeObserver(n);return window.addEventListener("resize",n),document.addEventListener("scroll",u,{capture:!0,passive:!0}),d.observe(e),()=>{d.unobserve(e),window.removeEventListener("resize",n),document.removeEventListener("scroll",u,!0)}}},[e,o,r,n,t])}const Fp=g.createCommand("SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND");function C_({close:t,editor:e,anchorElementRef:n,resolution:r,options:o,menuRenderFn:i,onSelectOption:s,shouldSplitNodeWithQuery:a=!1,commandPriority:c=g.COMMAND_PRIORITY_LOW,preselectFirstItem:u=!0}){const[d,p]=w.useState(null),f=r.match&&r.match.matchingString;w.useEffect(()=>{u&&p(0)},[f,u]);const h=w.useCallback(x=>{e.update(()=>{const E=r.match!=null&&a?function(C){const _=g.$getSelection();if(!g.$isRangeSelection(_)||!_.isCollapsed())return null;const D=_.anchor;if(D.type!=="text")return null;const $=D.getNode();if(!$.isSimpleText())return null;const H=D.offset,O=$.getTextContent().slice(0,H),V=C.replaceableString.length,B=H-function(Y,N,M){let S=M;for(let I=S;I<=N.length;I++)Y.slice(-I)===N.substring(0,I)&&(S=I);return S}(O,C.matchingString,V);if(B<0)return null;let F;return B===0?[F]=$.splitText(H):[,F]=$.splitText(B,H),F}(r.match):null;s(x,E,t,r.match?r.match.matchingString:"")})},[e,a,r.match,s,t]),b=w.useCallback(x=>{const E=e.getRootElement();E!==null&&(E.setAttribute("aria-activedescendant","typeahead-item-"+x),p(x))},[e]);return w.useEffect(()=>()=>{const x=e.getRootElement();x!==null&&x.removeAttribute("aria-activedescendant")},[e]),x_(()=>{o===null?p(null):d===null&&u&&b(0)},[o,d,b,u]),w.useEffect(()=>Mt(e.registerCommand(Fp,({option:x})=>!(!x.ref||x.ref.current==null)&&($p(x.ref.current),!0),c)),[e,b,c]),w.useEffect(()=>Mt(e.registerCommand(g.KEY_ARROW_DOWN_COMMAND,x=>{const E=x;if(o!==null&&o.length){const C=d===null?0:d!==o.length-1?d+1:0;b(C);const _=o[C];_.ref!=null&&_.ref.current&&e.dispatchCommand(Fp,{index:C,option:_}),E.preventDefault(),E.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ARROW_UP_COMMAND,x=>{const E=x;if(o!==null&&o.length){const C=d===null?o.length-1:d!==0?d-1:o.length-1;b(C);const _=o[C];_.ref!=null&&_.ref.current&&$p(_.ref.current),E.preventDefault(),E.stopImmediatePropagation()}return!0},c),e.registerCommand(g.KEY_ESCAPE_COMMAND,x=>{const E=x;return E.preventDefault(),E.stopImmediatePropagation(),t(),!0},c),e.registerCommand(g.KEY_TAB_COMMAND,x=>{const E=x;return o!==null&&d!==null&&o[d]!=null&&(E.preventDefault(),E.stopImmediatePropagation(),h(o[d]),!0)},c),e.registerCommand(g.KEY_ENTER_COMMAND,x=>o!==null&&d!==null&&o[d]!=null&&(x!==null&&(x.preventDefault(),x.stopImmediatePropagation()),h(o[d]),!0),c)),[h,t,e,o,d,b,c]),i(n,w.useMemo(()=>({options:o,selectOptionAndCleanUp:h,selectedIndex:d,setHighlightedIndex:p}),[h,d,o]),r.match?r.match.matchingString:"")}function Bp(t,e){e!=null&&(t.className=e),t.setAttribute("aria-label","Typeahead menu"),t.setAttribute("role","listbox"),t.style.display="block",t.style.position="absolute"}function E_({options:t,onWillOpen:e,onClose:n,onOpen:r,onSelectOption:o,menuRenderFn:i,anchorClassName:s,commandPriority:a=g.COMMAND_PRIORITY_LOW,parent:c}){const[u]=Ce(),[d,p]=w.useState(null),f=Po.useRef(null),h=function(_,D,$,H=kc?document.body:void 0,O=!0){const[V]=Ce(),B=kc?document.createElement("div"):null,F=w.useRef(B),Y=w.useCallback(()=>{if(F.current===null||H===void 0)return;F.current.style.top=F.current.style.bottom;const M=V.getRootElement(),S=F.current,I=S.firstChild;if(M!==null&&_!==null){const{left:T,top:A,width:P,height:L}=_.getRect(),J=F.current.offsetHeight;if(S.style.top=`${A+J+3+(O?window.pageYOffset:0)}px`,S.style.left=`${T+window.pageXOffset}px`,S.style.height=`${L}px`,S.style.width=`${P}px`,I!==null){I.style.top=`${A}`;const K=I.getBoundingClientRect(),W=K.height,ee=K.width,te=M.getBoundingClientRect();T+ee>te.right&&(S.style.left=`${te.right-ee+window.pageXOffset}px`),(A+W>window.innerHeight||A+W>te.bottom)&&A-te.top>W+L&&(S.style.top=`${A-W-L+(O?window.pageYOffset:0)}px`)}S.isConnected||(Bp(S,$),H.append(S)),S.setAttribute("id","typeahead-menu"),M.setAttribute("aria-controls","typeahead-menu")}},[V,_,O,$,H]);w.useEffect(()=>{const M=V.getRootElement();return _!==null&&Y(),()=>{M!==null&&M.removeAttribute("aria-controls");const S=F.current;S!==null&&S.isConnected&&(S.remove(),S.removeAttribute("id"))}},[V,Y,_]);const N=w.useCallback(M=>{_!==null&&(M||D(null))},[_,D]);return __(_,F.current,Y,N),B!=null&&B===F.current&&(Bp(B,$),H!=null&&H.append(B)),F}(d,p,s,c),b=w.useCallback(()=>{p(null),n!=null&&d!==null&&n()},[n,d]),x=w.useCallback(_=>{p(_),r!=null&&d===null&&r(_)},[r,d]),E=w.useCallback(_=>{_.preventDefault(),e!=null&&e(_);const D=ay(_.target);x({getRect:()=>new DOMRect(_.clientX/D,_.clientY/D,1,1)})},[x,e]),C=w.useCallback(_=>{d!==null&&f.current!=null&&_.target!=null&&g.isDOMNode(_.target)&&!f.current.contains(_.target)&&b()},[b,d]);return w.useEffect(()=>{const _=u.getRootElement();if(_)return _.addEventListener("contextmenu",E),()=>_.removeEventListener("contextmenu",E)},[u,E]),w.useEffect(()=>(document.addEventListener("click",C),()=>document.removeEventListener("click",C)),[u,C]),h.current===null||d===null||u===null?null:l.jsx(C_,{close:b,resolution:d,editor:u,anchorElementRef:h,options:t,menuRenderFn:(_,D)=>i(_,D,{setMenuRef:$=>{f.current=$}}),onSelectOption:o,commandPriority:a})}function k_({defaultSelection:t}){const[e]=Ce();return w.useEffect(()=>{e.focus(()=>{const n=document.activeElement,r=e.getRootElement();r===null||n!==null&&r.contains(n)||r.focus({preventScroll:!0})},{defaultSelection:t})},[t,e]),null}const N_=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function S_({onClear:t}){const[e]=Ce();return N_(()=>e.registerCommand(g.CLEAR_EDITOR_COMMAND,n=>(e.update(()=>{if(t==null){const r=g.$getRoot(),o=g.$getSelection(),i=g.$createParagraphNode();r.clear(),r.append(i),o!==null&&i.select(),g.$isRangeSelection(o)&&(o.format=0)}else t()}),!0),g.COMMAND_PRIORITY_EDITOR),[e,t]),null}const qp=[["Cat","rgb(125, 50, 0)"],["Dog","rgb(100, 0, 0)"],["Rabbit","rgb(150, 0, 0)"],["Frog","rgb(200, 0, 0)"],["Fox","rgb(200, 75, 0)"],["Hedgehog","rgb(0, 75, 0)"],["Pigeon","rgb(0, 125, 0)"],["Squirrel","rgb(75, 100, 0)"],["Bear","rgb(125, 100, 0)"],["Tiger","rgb(0, 0, 150)"],["Leopard","rgb(0, 0, 200)"],["Zebra","rgb(0, 0, 250)"],["Wolf","rgb(0, 100, 150)"],["Owl","rgb(0, 100, 100)"],["Gull","rgb(100, 0, 100)"],["Squid","rgb(150, 0, 150)"]],Up=qp[Math.floor(Math.random()*qp.length)],T_=w.createContext({clientID:0,color:Up[1],isCollabActive:!1,name:Up[0],yjsDocMap:new Map});function ug(t,e){return w.useContext(T_)}const A_=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function D_({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=Ce();return A_(()=>{if(n)return r.registerUpdateListener(({editorState:o,dirtyElements:i,dirtyLeaves:s,prevEditorState:a,tags:c})=>{e&&i.size===0&&s.size===0||t&&c.has(g.HISTORY_MERGE_TAG)||a.isEmpty()||n(o,r,c)})},[r,t,e,n]),null}function M_(t,...e){const n=new URL("https://lexical.dev/docs/error"),r=new URLSearchParams;r.append("code",t);for(const o of e)r.append("v",o);throw n.search=r.toString(),Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`)}function R_(t,e=g.$getSelection()){return e==null&&M_(166),g.$isRangeSelection(e)&&e.isCollapsed()||e.getNodes().length===0?"":Mw(t,e)}function Vp(t,e){const n=t.getData("text/plain")||t.getData("text/uri-list");n!=null&&e.insertRawText(n)}const fi=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0,O_=fi&&"documentMode"in document?document.documentMode:null,j_=!(!fi||!("InputEvent"in window)||O_)&&"getTargetRanges"in new window.InputEvent("input"),I_=fi&&/Version\/[\d.]+.*Safari/.test(navigator.userAgent),Hp=fi&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,L_=fi&&/^(?=.*Chrome).*/i.test(navigator.userAgent),$_=fi&&/AppleWebKit\/[\d.]+/.test(navigator.userAgent)&&!L_;function zp(t,e){e.update(()=>{if(t!==null){const n=kw(t,KeyboardEvent)?null:t.clipboardData,r=g.$getSelection();if(r!==null&&n!=null){t.preventDefault();const o=R_(e);o!==null&&n.setData("text/html",o),n.setData("text/plain",r.getTextContent())}}})}function P_(t){return Mt(t.registerCommand(g.DELETE_CHARACTER_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteCharacter(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_WORD_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteWord(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DELETE_LINE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.deleteLine(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CONTROLLED_TEXT_INSERTION_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(typeof e=="string")n.insertText(e);else{const r=e.dataTransfer;if(r!=null)Vp(r,n);else{const o=e.data;o&&n.insertText(o)}}return!0},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.REMOVE_TEXT_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.removeText(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_LINE_BREAK_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(n.insertLineBreak(e),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.INSERT_PARAGRAPH_COMMAND,()=>{const e=g.$getSelection();return!!g.$isRangeSelection(e)&&(e.insertLineBreak(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_LEFT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!Zd(n,!0)&&(r.preventDefault(),ep(n,o,!0),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ARROW_RIGHT_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;const r=e,o=r.shiftKey;return!!Zd(n,!1)&&(r.preventDefault(),ep(n,o,!1),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_BACKSPACE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(!Hp||navigator.language!=="ko-KR")&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!0))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_DELETE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),t.dispatchCommand(g.DELETE_CHARACTER_COMMAND,!1))},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.KEY_ENTER_COMMAND,e=>{const n=g.$getSelection();if(!g.$isRangeSelection(n))return!1;if(e!==null){if((Hp||I_||$_)&&j_)return!1;e.preventDefault()}return t.dispatchCommand(g.INSERT_LINE_BREAK_COMMAND,!1)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.SELECT_ALL_COMMAND,()=>(g.$selectAll(),!0),g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.COPY_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(zp(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.CUT_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){zp(r,o),o.update(()=>{const i=g.$getSelection();g.$isRangeSelection(i)&&i.removeText()})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.PASTE_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(function(r,o){r.preventDefault(),o.update(()=>{const i=g.$getSelection(),s=kw(r,ClipboardEvent)?r.clipboardData:null;s!=null&&g.$isRangeSelection(i)&&Vp(s,i)},{tag:g.PASTE_TAG})}(e,t),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DROP_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR),t.registerCommand(g.DRAGSTART_COMMAND,e=>{const n=g.$getSelection();return!!g.$isRangeSelection(n)&&(e.preventDefault(),!0)},g.COMMAND_PRIORITY_EDITOR))}const Nc=typeof window<"u"&&window.document!==void 0&&window.document.createElement!==void 0?w.useLayoutEffect:w.useEffect;function Gp(t){return t.getEditorState().read(xu(t.isComposing()))}function F_({contentEditable:t,placeholder:e=null,ErrorBoundary:n}){const[r]=Ce(),o=function(i,s){const[a,c]=w.useState(()=>i.getDecorators());return Nc(()=>i.registerDecoratorListener(u=>{Xt.flushSync(()=>{c(u)})}),[i]),w.useEffect(()=>{c(i.getDecorators())},[i]),w.useMemo(()=>{const u=[],d=Object.keys(a);for(let p=0;p<d.length;p++){const f=d[p],h=l.jsx(s,{onError:x=>i._onError(x),children:l.jsx(w.Suspense,{fallback:null,children:a[f]})}),b=i.getElementByKey(f);b!==null&&u.push(Xt.createPortal(h,b,f))}return u},[s,a,i])}(r,n);return function(i){Nc(()=>Mt(P_(i),Xw(i)),[i])}(r),l.jsxs(l.Fragment,{children:[t,l.jsx(B_,{content:e}),o]})}function B_({content:t}){const[e]=Ce(),n=function(o){const[i,s]=w.useState(()=>Gp(o));return Nc(()=>{function a(){const c=Gp(o);s(c)}return a(),Mt(o.registerUpdateListener(()=>{a()}),o.registerEditableListener(()=>{a()}))},[o]),i}(e),r=Jw();return n?typeof t=="function"?t(r):t:null}const Qn=()=>new Map,Sc=t=>{const e=Qn();return t.forEach((n,r)=>{e.set(r,n)}),e},hi=(t,e,n)=>{let r=t.get(e);return r===void 0&&t.set(e,r=n()),r},q_=(t,e)=>{const n=[];for(const[r,o]of t)n.push(e(o,r));return n},U_=(t,e)=>{for(const[n,r]of t)if(e(r,n))return!0;return!1},Jo=()=>new Set,Ul=t=>t[t.length-1],Xo=Array.from,V_=Array.isArray;class H_{constructor(){this._observers=Qn()}on(e,n){return hi(this._observers,e,Jo).add(n),n}once(e,n){const r=(...o)=>{this.off(e,r),n(...o)};this.on(e,r)}off(e,n){const r=this._observers.get(e);r!==void 0&&(r.delete(n),r.size===0&&this._observers.delete(e))}emit(e,n){return Xo((this._observers.get(e)||Qn()).values()).forEach(r=>r(...n))}destroy(){this._observers=Qn()}}const co=Math.floor,ra=Math.abs,dg=(t,e)=>t<e?t:e,wi=(t,e)=>t>e?t:e,z_=t=>t!==0?t<0:1/t<0,Kp=1,Yp=2,Vl=4,Hl=8,G_=32,pg=64,ba=128,K_=31,Wp=63,Fi=127,Y_=2147483647,W_=Number.isInteger||(t=>typeof t=="number"&&isFinite(t)&&co(t)===t),J_=t=>t.toLowerCase(),X_=/^\s*/g,Q_=t=>t.replace(X_,""),Z_=/([A-Z])/g,Jp=(t,e)=>Q_(t.replace(Z_,n=>`${e}${J_(n)}`)),eC=t=>{const e=unescape(encodeURIComponent(t)),n=e.length,r=new Uint8Array(n);for(let o=0;o<n;o++)r[o]=e.codePointAt(o);return r},Wi=typeof TextEncoder<"u"?new TextEncoder:null,tC=t=>Wi.encode(t),nC=Wi?tC:eC;let zl=typeof TextDecoder>"u"?null:new TextDecoder("utf-8",{fatal:!0,ignoreBOM:!0});zl&&zl.decode(new Uint8Array).length===1&&(zl=null);class bs{constructor(){this.cpos=0,this.cbuf=new Uint8Array(100),this.bufs=[]}}const Nu=()=>new bs,rC=t=>{let e=t.cpos;for(let n=0;n<t.bufs.length;n++)e+=t.bufs[n].length;return e},cr=t=>{const e=new Uint8Array(rC(t));let n=0;for(let r=0;r<t.bufs.length;r++){const o=t.bufs[r];e.set(o,n),n+=o.length}return e.set(new Uint8Array(t.cbuf.buffer,0,t.cpos),n),e},oC=(t,e)=>{const n=t.cbuf.length;n-t.cpos<e&&(t.bufs.push(new Uint8Array(t.cbuf.buffer,0,t.cpos)),t.cbuf=new Uint8Array(wi(n,e)*2),t.cpos=0)},xt=(t,e)=>{const n=t.cbuf.length;t.cpos===n&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(n*2),t.cpos=0),t.cbuf[t.cpos++]=e},Tc=xt,Ue=(t,e)=>{for(;e>Fi;)xt(t,ba|Fi&e),e=co(e/128);xt(t,Fi&e)},Su=(t,e)=>{const n=z_(e);for(n&&(e=-e),xt(t,(e>Wp?ba:0)|(n?pg:0)|Wp&e),e=co(e/64);e>0;)xt(t,(e>Fi?ba:0)|Fi&e),e=co(e/128)},Ac=new Uint8Array(3e4),iC=Ac.length/3,sC=(t,e)=>{if(e.length<iC){const n=Wi.encodeInto(e,Ac).written||0;Ue(t,n);for(let r=0;r<n;r++)xt(t,Ac[r])}else fn(t,nC(e))},aC=(t,e)=>{const n=unescape(encodeURIComponent(e)),r=n.length;Ue(t,r);for(let o=0;o<r;o++)xt(t,n.codePointAt(o))},Uo=Wi&&Wi.encodeInto?sC:aC,Tu=(t,e)=>{const n=t.cbuf.length,r=t.cpos,o=dg(n-r,e.length),i=e.length-o;t.cbuf.set(e.subarray(0,o),r),t.cpos+=o,i>0&&(t.bufs.push(t.cbuf),t.cbuf=new Uint8Array(wi(n*2,i)),t.cbuf.set(e.subarray(o)),t.cpos=i)},fn=(t,e)=>{Ue(t,e.byteLength),Tu(t,e)},Au=(t,e)=>{oC(t,e);const n=new DataView(t.cbuf.buffer,t.cpos,e);return t.cpos+=e,n},lC=(t,e)=>Au(t,4).setFloat32(0,e,!1),cC=(t,e)=>Au(t,8).setFloat64(0,e,!1),uC=(t,e)=>Au(t,8).setBigInt64(0,e,!1),Xp=new DataView(new ArrayBuffer(4)),dC=t=>(Xp.setFloat32(0,t),Xp.getFloat32(0)===t),Ji=(t,e)=>{switch(typeof e){case"string":xt(t,119),Uo(t,e);break;case"number":W_(e)&&ra(e)<=Y_?(xt(t,125),Su(t,e)):dC(e)?(xt(t,124),lC(t,e)):(xt(t,123),cC(t,e));break;case"bigint":xt(t,122),uC(t,e);break;case"object":if(e===null)xt(t,126);else if(V_(e)){xt(t,117),Ue(t,e.length);for(let n=0;n<e.length;n++)Ji(t,e[n])}else if(e instanceof Uint8Array)xt(t,116),fn(t,e);else{xt(t,118);const n=Object.keys(e);Ue(t,n.length);for(let r=0;r<n.length;r++){const o=n[r];Uo(t,o),Ji(t,e[o])}}break;case"boolean":xt(t,e?120:121);break;default:xt(t,127)}};class Qp extends bs{constructor(e){super(),this.w=e,this.s=null,this.count=0}write(e){this.s===e?this.count++:(this.count>0&&Ue(this,this.count-1),this.count=1,this.w(this,e),this.s=e)}}const Zp=t=>{t.count>0&&(Su(t.encoder,t.count===1?t.s:-t.s),t.count>1&&Ue(t.encoder,t.count-2))};class oa{constructor(){this.encoder=new bs,this.s=0,this.count=0}write(e){this.s===e?this.count++:(Zp(this),this.count=1,this.s=e)}toUint8Array(){return Zp(this),cr(this.encoder)}}const ef=t=>{if(t.count>0){const e=t.diff*2+(t.count===1?0:1);Su(t.encoder,e),t.count>1&&Ue(t.encoder,t.count-2)}};class Gl{constructor(){this.encoder=new bs,this.s=0,this.count=0,this.diff=0}write(e){this.diff===e-this.s?(this.s=e,this.count++):(ef(this),this.count=1,this.diff=e-this.s,this.s=e)}toUint8Array(){return ef(this),cr(this.encoder)}}class pC{constructor(){this.sarr=[],this.s="",this.lensE=new oa}write(e){this.s+=e,this.s.length>19&&(this.sarr.push(this.s),this.s=""),this.lensE.write(e.length)}toUint8Array(){const e=new bs;return this.sarr.push(this.s),this.s="",Uo(e,this.sarr.join("")),Tu(e,this.lensE.toUint8Array()),cr(e)}}const Qo=t=>new Error(t),Zn=()=>{throw Qo("Method unimplemented")},uo=()=>{throw Qo("Unexpected case")},fC=crypto.getRandomValues.bind(crypto),fg=()=>fC(new Uint32Array(1))[0],hC="10000000-1000-4000-8000"+-1e11,wC=()=>hC.replace(/[018]/g,t=>(t^fg()&15>>t/4).toString(16)),tf=t=>new Promise(t);Promise.all.bind(Promise);const nf=t=>t===void 0?null:t;class gC{constructor(){this.map=new Map}setItem(e,n){this.map.set(e,n)}getItem(e){return this.map.get(e)}}let hg=new gC,mC=!0;try{typeof localStorage<"u"&&localStorage&&(hg=localStorage,mC=!1)}catch{}const bC=hg,vC=Object.assign,xC=Object.keys,yC=(t,e)=>{for(const n in t)e(t[n],n)},rf=t=>xC(t).length,_C=t=>{for(const e in t)return!1;return!0},CC=(t,e)=>{for(const n in t)if(!e(t[n],n))return!1;return!0},EC=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),kC=(t,e)=>t===e||rf(t)===rf(e)&&CC(t,(n,r)=>(n!==void 0||EC(e,r))&&e[r]===n),NC=Object.freeze,wg=t=>{for(const e in t){const n=t[e];(typeof n=="object"||typeof n=="function")&&wg(t[e])}return NC(t)},Du=(t,e,n=0)=>{try{for(;n<t.length;n++)t[n](...e)}finally{n<t.length&&Du(t,e,n+1)}},SC=(t,e)=>e.includes(t),Xi=typeof process<"u"&&process.release&&/node|io\.js/.test(process.release.name)&&Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]";let Hn;const TC=()=>{if(Hn===void 0)if(Xi){Hn=Qn();const t=process.argv;let e=null;for(let n=0;n<t.length;n++){const r=t[n];r[0]==="-"?(e!==null&&Hn.set(e,""),e=r):e!==null&&(Hn.set(e,r),e=null)}e!==null&&Hn.set(e,"")}else typeof location=="object"?(Hn=Qn(),(location.search||"?").slice(1).split("&").forEach(t=>{if(t.length!==0){const[e,n]=t.split("=");Hn.set(`--${Jp(e,"-")}`,n),Hn.set(`-${Jp(e,"-")}`,n)}})):Hn=Qn();return Hn},Dc=t=>TC().has(t),va=t=>nf(Xi?process.env[t.toUpperCase().replaceAll("-","_")]:bC.getItem(t)),gg=t=>Dc("--"+t)||va(t)!==null;gg("production");const AC=Xi&&SC(process.env.FORCE_COLOR,["true","1","2"]),DC=AC||!Dc("--no-colors")&&!gg("no-color")&&(!Xi||process.stdout.isTTY)&&(!Xi||Dc("--color")||va("COLORTERM")!==null||(va("TERM")||"").includes("color"));class MC{constructor(e,n){this.left=e,this.right=n}}const ar=(t,e)=>new MC(t,e);typeof DOMParser<"u"&&new DOMParser;const RC=t=>q_(t,(e,n)=>`${n}:${e};`).join(""),hr=Symbol,mg=hr(),bg=hr(),OC=hr(),jC=hr(),IC=hr(),vg=hr(),LC=hr(),Mu=hr(),$C=hr(),PC=t=>{var o;t.length===1&&((o=t[0])==null?void 0:o.constructor)===Function&&(t=t[0]());const e=[],n=[];let r=0;for(;r<t.length;r++){const i=t[r];if(i===void 0)break;if(i.constructor===String||i.constructor===Number)e.push(i);else if(i.constructor===Object)break}for(r>0&&n.push(e.join(""));r<t.length;r++){const i=t[r];i instanceof Symbol||n.push(i)}return n},FC={[mg]:ar("font-weight","bold"),[bg]:ar("font-weight","normal"),[OC]:ar("color","blue"),[IC]:ar("color","green"),[jC]:ar("color","grey"),[vg]:ar("color","red"),[LC]:ar("color","purple"),[Mu]:ar("color","orange"),[$C]:ar("color","black")},BC=t=>{var s;t.length===1&&((s=t[0])==null?void 0:s.constructor)===Function&&(t=t[0]());const e=[],n=[],r=Qn();let o=[],i=0;for(;i<t.length;i++){const a=t[i],c=FC[a];if(c!==void 0)r.set(c.left,c.right);else{if(a===void 0)break;if(a.constructor===String||a.constructor===Number){const u=RC(r);i>0||u.length>0?(e.push("%c"+a),n.push(u)):e.push(a)}else break}}for(i>0&&(o=n,o.unshift(e.join("")));i<t.length;i++){const a=t[i];a instanceof Symbol||o.push(a)}return o},xg=DC?BC:PC,qC=(...t)=>{console.log(...xg(t)),yg.forEach(e=>e.print(t))},UC=(...t)=>{console.warn(...xg(t)),t.unshift(Mu),yg.forEach(e=>e.print(t))},yg=Jo(),_g=t=>({[Symbol.iterator](){return this},next:t}),VC=(t,e)=>_g(()=>{let n;do n=t.next();while(!n.done&&!e(n.value));return n}),Kl=(t,e)=>_g(()=>{const{done:n,value:r}=t.next();return{done:n,value:n?void 0:e(r)}});class HC{constructor(e,n){this.clock=e,this.len=n}}class zC{constructor(){this.clients=new Map}}const Cg=(t,e,n)=>e.clients.forEach((r,o)=>{const i=t.doc.store.clients.get(o);if(i!=null){const s=i[i.length-1],a=s.id.clock+s.length;for(let c=0,u=r[c];c<r.length&&u.clock<a;u=r[++c])Dg(t,i,u.clock,u.len,n)}}),GC=(t,e)=>{let n=0,r=t.length-1;for(;n<=r;){const o=co((n+r)/2),i=t[o],s=i.clock;if(s<=e){if(e<s+i.len)return o;n=o+1}else r=o-1}return null},Eg=(t,e)=>{const n=t.clients.get(e.client);return n!==void 0&&GC(n,e.clock)!==null},kg=t=>{t.clients.forEach(e=>{e.sort((o,i)=>o.clock-i.clock);let n,r;for(n=1,r=1;n<e.length;n++){const o=e[r-1],i=e[n];o.clock+o.len>=i.clock?o.len=wi(o.len,i.clock+i.len-o.clock):(r<n&&(e[r]=i),r++)}e.length=r})},Ng=(t,e,n,r)=>{hi(t.clients,e,()=>[]).push(new HC(n,r))},KC=(t,e)=>{Ue(t.restEncoder,e.clients.size),Xo(e.clients.entries()).sort((n,r)=>r[0]-n[0]).forEach(([n,r])=>{t.resetDsCurVal(),Ue(t.restEncoder,n);const o=r.length;Ue(t.restEncoder,o);for(let i=0;i<o;i++){const s=r[i];t.writeDsClock(s.clock),t.writeDsLen(s.len)}})},Sg=fg;class vs extends H_{constructor({guid:e=wC(),collectionid:n=null,gc:r=!0,gcFilter:o=()=>!0,meta:i=null,autoLoad:s=!1,shouldLoad:a=!0}={}){super(),this.gc=r,this.gcFilter=o,this.clientID=Sg(),this.guid=e,this.collectionid=n,this.share=new Map,this.store=new r1,this._transaction=null,this._transactionCleanups=[],this.subdocs=new Set,this._item=null,this.shouldLoad=a,this.autoLoad=s,this.meta=i,this.isLoaded=!1,this.isSynced=!1,this.isDestroyed=!1,this.whenLoaded=tf(u=>{this.on("load",()=>{this.isLoaded=!0,u(this)})});const c=()=>tf(u=>{const d=p=>{(p===void 0||p===!0)&&(this.off("sync",d),u())};this.on("sync",d)});this.on("sync",u=>{u===!1&&this.isSynced&&(this.whenSynced=c()),this.isSynced=u===void 0||u===!0,this.isSynced&&!this.isLoaded&&this.emit("load",[this])}),this.whenSynced=c()}load(){const e=this._item;e!==null&&!this.shouldLoad&&Ge(e.parent.doc,n=>{n.subdocsLoaded.add(this)},null,!0),this.shouldLoad=!0}getSubdocs(){return this.subdocs}getSubdocGuids(){return new Set(Xo(this.subdocs).map(e=>e.guid))}transact(e,n=null){return Ge(this,e,n)}get(e,n=At){const r=hi(this.share,e,()=>{const i=new n;return i._integrate(this,null),i}),o=r.constructor;if(n!==At&&o!==n)if(o===At){const i=new n;i._map=r._map,r._map.forEach(s=>{for(;s!==null;s=s.left)s.parent=i}),i._start=r._start;for(let s=i._start;s!==null;s=s.right)s.parent=i;return i._length=r._length,this.share.set(e,i),i._integrate(this,null),i}else throw new Error(`Type with the name ${e} has already been defined with a different constructor`);return r}getArray(e=""){return this.get(e,oo)}getText(e=""){return this.get(e,_a)}getMap(e=""){return this.get(e,Zo)}getXmlElement(e=""){return this.get(e,es)}getXmlFragment(e=""){return this.get(e,ei)}toJSON(){const e={};return this.share.forEach((n,r)=>{e[r]=n.toJSON()}),e}destroy(){this.isDestroyed=!0,Xo(this.subdocs).forEach(n=>n.destroy());const e=this._item;if(e!==null){this._item=null;const n=e.content;n.doc=new vs({guid:this.guid,...n.opts,shouldLoad:!1}),n.doc._item=e,Ge(e.parent.doc,r=>{const o=n.doc;e.deleted||r.subdocsAdded.add(o),r.subdocsRemoved.add(this)},null,!0)}this.emit("destroyed",[!0]),this.emit("destroy",[this]),super.destroy()}}class YC{constructor(){this.restEncoder=Nu()}toUint8Array(){return cr(this.restEncoder)}resetDsCurVal(){}writeDsClock(e){Ue(this.restEncoder,e)}writeDsLen(e){Ue(this.restEncoder,e)}}class WC extends YC{writeLeftID(e){Ue(this.restEncoder,e.client),Ue(this.restEncoder,e.clock)}writeRightID(e){Ue(this.restEncoder,e.client),Ue(this.restEncoder,e.clock)}writeClient(e){Ue(this.restEncoder,e)}writeInfo(e){Tc(this.restEncoder,e)}writeString(e){Uo(this.restEncoder,e)}writeParentInfo(e){Ue(this.restEncoder,e?1:0)}writeTypeRef(e){Ue(this.restEncoder,e)}writeLen(e){Ue(this.restEncoder,e)}writeAny(e){Ji(this.restEncoder,e)}writeBuf(e){fn(this.restEncoder,e)}writeJSON(e){Uo(this.restEncoder,JSON.stringify(e))}writeKey(e){Uo(this.restEncoder,e)}}class JC{constructor(){this.restEncoder=Nu(),this.dsCurrVal=0}toUint8Array(){return cr(this.restEncoder)}resetDsCurVal(){this.dsCurrVal=0}writeDsClock(e){const n=e-this.dsCurrVal;this.dsCurrVal=e,Ue(this.restEncoder,n)}writeDsLen(e){e===0&&uo(),Ue(this.restEncoder,e-1),this.dsCurrVal+=e}}class XC extends JC{constructor(){super(),this.keyMap=new Map,this.keyClock=0,this.keyClockEncoder=new Gl,this.clientEncoder=new oa,this.leftClockEncoder=new Gl,this.rightClockEncoder=new Gl,this.infoEncoder=new Qp(Tc),this.stringEncoder=new pC,this.parentInfoEncoder=new Qp(Tc),this.typeRefEncoder=new oa,this.lenEncoder=new oa}toUint8Array(){const e=Nu();return Ue(e,0),fn(e,this.keyClockEncoder.toUint8Array()),fn(e,this.clientEncoder.toUint8Array()),fn(e,this.leftClockEncoder.toUint8Array()),fn(e,this.rightClockEncoder.toUint8Array()),fn(e,cr(this.infoEncoder)),fn(e,this.stringEncoder.toUint8Array()),fn(e,cr(this.parentInfoEncoder)),fn(e,this.typeRefEncoder.toUint8Array()),fn(e,this.lenEncoder.toUint8Array()),Tu(e,cr(this.restEncoder)),cr(e)}writeLeftID(e){this.clientEncoder.write(e.client),this.leftClockEncoder.write(e.clock)}writeRightID(e){this.clientEncoder.write(e.client),this.rightClockEncoder.write(e.clock)}writeClient(e){this.clientEncoder.write(e)}writeInfo(e){this.infoEncoder.write(e)}writeString(e){this.stringEncoder.write(e)}writeParentInfo(e){this.parentInfoEncoder.write(e?1:0)}writeTypeRef(e){this.typeRefEncoder.write(e)}writeLen(e){this.lenEncoder.write(e)}writeAny(e){Ji(this.restEncoder,e)}writeBuf(e){fn(this.restEncoder,e)}writeJSON(e){Ji(this.restEncoder,e)}writeKey(e){const n=this.keyMap.get(e);n===void 0?(this.keyClockEncoder.write(this.keyClock++),this.stringEncoder.write(e)):this.keyClockEncoder.write(n)}}const QC=(t,e,n,r)=>{r=wi(r,e[0].id.clock);const o=ur(e,r);Ue(t.restEncoder,e.length-o),t.writeClient(n),Ue(t.restEncoder,r);const i=e[o];i.write(t,r-i.id.clock);for(let s=o+1;s<e.length;s++)e[s].write(t,0)},ZC=(t,e,n)=>{const r=new Map;n.forEach((o,i)=>{Qt(e,i)>o&&r.set(i,o)}),Ru(e).forEach((o,i)=>{n.has(i)||r.set(i,0)}),Ue(t.restEncoder,r.size),Xo(r.entries()).sort((o,i)=>i[0]-o[0]).forEach(([o,i])=>{QC(t,e.clients.get(o),o,i)})},e1=(t,e)=>ZC(t,e.doc.store,e.beforeState);class t1{constructor(){this.l=[]}}const of=()=>new t1,sf=(t,e)=>t.l.push(e),af=(t,e)=>{const n=t.l,r=n.length;t.l=n.filter(o=>e!==o),r===t.l.length&&console.error("[yjs] Tried to remove event handler that doesn't exist.")},Tg=(t,e,n)=>Du(t.l,[e,n]);class ia{constructor(e,n){this.client=e,this.clock=n}}const Ws=(t,e)=>t===e||t!==null&&e!==null&&t.client===e.client&&t.clock===e.clock,ot=(t,e)=>new ia(t,e),n1=t=>{for(const[e,n]of t.doc.share.entries())if(n===t)return e;throw uo()},Lo=(t,e)=>e===void 0?!t.deleted:e.sv.has(t.id.client)&&(e.sv.get(t.id.client)||0)>t.id.clock&&!Eg(e.ds,t.id),Mc=(t,e)=>{const n=hi(t.meta,Mc,Jo),r=t.doc.store;n.has(e)||(e.sv.forEach((o,i)=>{o<Qt(r,i)&&Or(t,ot(i,o))}),Cg(t,e.ds,o=>{}),n.add(e))};class r1{constructor(){this.clients=new Map,this.pendingStructs=null,this.pendingDs=null}}const Ru=t=>{const e=new Map;return t.clients.forEach((n,r)=>{const o=n[n.length-1];e.set(r,o.id.clock+o.length)}),e},Qt=(t,e)=>{const n=t.clients.get(e);if(n===void 0)return 0;const r=n[n.length-1];return r.id.clock+r.length},Ag=(t,e)=>{let n=t.clients.get(e.id.client);if(n===void 0)n=[],t.clients.set(e.id.client,n);else{const r=n[n.length-1];if(r.id.clock+r.length!==e.id.clock)throw uo()}n.push(e)},ur=(t,e)=>{let n=0,r=t.length-1,o=t[r],i=o.id.clock;if(i===e)return r;let s=co(e/(i+o.length-1)*r);for(;n<=r;){if(o=t[s],i=o.id.clock,i<=e){if(e<i+o.length)return s;n=s+1}else r=s-1;s=co((n+r)/2)}throw uo()},o1=(t,e)=>{const n=t.clients.get(e.client);return n[ur(n,e.clock)]},Yl=o1,Rc=(t,e,n)=>{const r=ur(e,n),o=e[r];return o.id.clock<n&&o instanceof It?(e.splice(r+1,0,Wg(t,o,n-o.id.clock)),r+1):r},Or=(t,e)=>{const n=t.doc.store.clients.get(e.client);return n[Rc(t,n,e.clock)]},lf=(t,e,n)=>{const r=e.clients.get(n.client),o=ur(r,n.clock),i=r[o];return n.clock!==i.id.clock+i.length-1&&i.constructor!==yr&&r.splice(o+1,0,Wg(t,i,n.clock-i.id.clock+1)),i},i1=(t,e,n)=>{const r=t.clients.get(e.id.client);r[ur(r,e.id.clock)]=n},Dg=(t,e,n,r,o)=>{if(r===0)return;const i=n+r;let s=Rc(t,e,n),a;do a=e[s++],i<a.id.clock+a.length&&Rc(t,e,i),o(a);while(s<e.length&&e[s].id.clock<i)};class s1{constructor(e,n,r){this.doc=e,this.deleteSet=new zC,this.beforeState=Ru(e.store),this.afterState=new Map,this.changed=new Map,this.changedParentTypes=new Map,this._mergeStructs=[],this.origin=n,this.meta=new Map,this.local=r,this.subdocsAdded=new Set,this.subdocsRemoved=new Set,this.subdocsLoaded=new Set,this._needFormattingCleanup=!1}}const cf=(t,e)=>e.deleteSet.clients.size===0&&!U_(e.afterState,(n,r)=>e.beforeState.get(r)!==n)?!1:(kg(e.deleteSet),e1(t,e),KC(t,e.deleteSet),!0),uf=(t,e,n)=>{const r=e._item;(r===null||r.id.clock<(t.beforeState.get(r.id.client)||0)&&!r.deleted)&&hi(t.changed,e,Jo).add(n)},sa=(t,e)=>{let n=t[e],r=t[e-1],o=e;for(;o>0;n=r,r=t[--o-1]){if(r.deleted===n.deleted&&r.constructor===n.constructor&&r.mergeWith(n)){n instanceof It&&n.parentSub!==null&&n.parent._map.get(n.parentSub)===n&&n.parent._map.set(n.parentSub,r);continue}break}const i=e-o;return i&&t.splice(e+1-i,i),i},a1=(t,e,n)=>{for(const[r,o]of t.clients.entries()){const i=e.clients.get(r);for(let s=o.length-1;s>=0;s--){const a=o[s],c=a.clock+a.len;for(let u=ur(i,a.clock),d=i[u];u<i.length&&d.id.clock<c;d=i[++u]){const p=i[u];if(a.clock+a.len<=p.id.clock)break;p instanceof It&&p.deleted&&!p.keep&&n(p)&&p.gc(e,!1)}}}},l1=(t,e)=>{t.clients.forEach((n,r)=>{const o=e.clients.get(r);for(let i=n.length-1;i>=0;i--){const s=n[i],a=dg(o.length-1,1+ur(o,s.clock+s.len-1));for(let c=a,u=o[c];c>0&&u.id.clock>=s.clock;u=o[c])c-=1+sa(o,c)}})},Mg=(t,e)=>{if(e<t.length){const n=t[e],r=n.doc,o=r.store,i=n.deleteSet,s=n._mergeStructs;try{kg(i),n.afterState=Ru(n.doc.store),r.emit("beforeObserverCalls",[n,r]);const a=[];n.changed.forEach((c,u)=>a.push(()=>{(u._item===null||!u._item.deleted)&&u._callObserver(n,c)})),a.push(()=>{n.changedParentTypes.forEach((c,u)=>{u._dEH.l.length>0&&(u._item===null||!u._item.deleted)&&(c=c.filter(d=>d.target._item===null||!d.target._item.deleted),c.forEach(d=>{d.currentTarget=u,d._path=null}),c.sort((d,p)=>d.path.length-p.path.length),Tg(u._dEH,c,n))})}),a.push(()=>r.emit("afterTransaction",[n,r])),Du(a,[]),n._needFormattingCleanup&&v1(n)}finally{r.gc&&a1(i,o,r.gcFilter),l1(i,o),n.afterState.forEach((d,p)=>{const f=n.beforeState.get(p)||0;if(f!==d){const h=o.clients.get(p),b=wi(ur(h,f),1);for(let x=h.length-1;x>=b;)x-=1+sa(h,x)}});for(let d=s.length-1;d>=0;d--){const{client:p,clock:f}=s[d].id,h=o.clients.get(p),b=ur(h,f);b+1<h.length&&sa(h,b+1)>1||b>0&&sa(h,b)}if(!n.local&&n.afterState.get(r.clientID)!==n.beforeState.get(r.clientID)&&(qC(Mu,mg,"[yjs] ",bg,vg,"Changed the client-id because another client seems to be using it."),r.clientID=Sg()),r.emit("afterTransactionCleanup",[n,r]),r._observers.has("update")){const d=new WC;cf(d,n)&&r.emit("update",[d.toUint8Array(),n.origin,r,n])}if(r._observers.has("updateV2")){const d=new XC;cf(d,n)&&r.emit("updateV2",[d.toUint8Array(),n.origin,r,n])}const{subdocsAdded:a,subdocsLoaded:c,subdocsRemoved:u}=n;(a.size>0||u.size>0||c.size>0)&&(a.forEach(d=>{d.clientID=r.clientID,d.collectionid==null&&(d.collectionid=r.collectionid),r.subdocs.add(d)}),u.forEach(d=>r.subdocs.delete(d)),r.emit("subdocs",[{loaded:c,added:a,removed:u},r,n]),u.forEach(d=>d.destroy())),t.length<=e+1?(r._transactionCleanups=[],r.emit("afterAllTransactions",[r,t])):Mg(t,e+1)}}},Ge=(t,e,n=null,r=!0)=>{const o=t._transactionCleanups;let i=!1,s=null;t._transaction===null&&(i=!0,t._transaction=new s1(t,n,r),o.push(t._transaction),o.length===1&&t.emit("beforeAllTransactions",[t]),t.emit("beforeTransaction",[t._transaction,t]));try{s=e(t._transaction)}finally{if(i){const a=t._transaction===o[0];t._transaction=null,a&&Mg(o,0)}}return s},df="You must not compute changes after the event-handler fired.";class el{constructor(e,n){this.target=e,this.currentTarget=e,this.transaction=n,this._changes=null,this._keys=null,this._delta=null,this._path=null}get path(){return this._path||(this._path=c1(this.currentTarget,this.target))}deletes(e){return Eg(this.transaction.deleteSet,e.id)}get keys(){if(this._keys===null){if(this.transaction.doc._transactionCleanups.length===0)throw Qo(df);const e=new Map,n=this.target;this.transaction.changed.get(n).forEach(o=>{if(o!==null){const i=n._map.get(o);let s,a;if(this.adds(i)){let c=i.left;for(;c!==null&&this.adds(c);)c=c.left;if(this.deletes(i))if(c!==null&&this.deletes(c))s="delete",a=Ul(c.content.getContent());else return;else c!==null&&this.deletes(c)?(s="update",a=Ul(c.content.getContent())):(s="add",a=void 0)}else if(this.deletes(i))s="delete",a=Ul(i.content.getContent());else return;e.set(o,{action:s,oldValue:a})}}),this._keys=e}return this._keys}get delta(){return this.changes.delta}adds(e){return e.id.clock>=(this.transaction.beforeState.get(e.id.client)||0)}get changes(){let e=this._changes;if(e===null){if(this.transaction.doc._transactionCleanups.length===0)throw Qo(df);const n=this.target,r=Jo(),o=Jo(),i=[];if(e={added:r,deleted:o,delta:i,keys:this.keys},this.transaction.changed.get(n).has(null)){let a=null;const c=()=>{a&&i.push(a)};for(let u=n._start;u!==null;u=u.right)u.deleted?this.deletes(u)&&!this.adds(u)&&((a===null||a.delete===void 0)&&(c(),a={delete:0}),a.delete+=u.length,o.add(u)):this.adds(u)?((a===null||a.insert===void 0)&&(c(),a={insert:[]}),a.insert=a.insert.concat(u.content.getContent()),r.add(u)):((a===null||a.retain===void 0)&&(c(),a={retain:0}),a.retain+=u.length);a!==null&&a.retain===void 0&&c()}this._changes=e}return e}}const c1=(t,e)=>{const n=[];for(;e._item!==null&&e!==t;){if(e._item.parentSub!==null)n.unshift(e._item.parentSub);else{let r=0,o=e._item.parent._start;for(;o!==e._item&&o!==null;)!o.deleted&&o.countable&&(r+=o.length),o=o.right;n.unshift(r)}e=e._item.parent}return n},$t=()=>{UC("Invalid access: Add Yjs type to a document before reading data.")},Rg=80;let Ou=0;class u1{constructor(e,n){e.marker=!0,this.p=e,this.index=n,this.timestamp=Ou++}}const d1=t=>{t.timestamp=Ou++},Og=(t,e,n)=>{t.p.marker=!1,t.p=e,e.marker=!0,t.index=n,t.timestamp=Ou++},p1=(t,e,n)=>{if(t.length>=Rg){const r=t.reduce((o,i)=>o.timestamp<i.timestamp?o:i);return Og(r,e,n),r}else{const r=new u1(e,n);return t.push(r),r}},tl=(t,e)=>{if(t._start===null||e===0||t._searchMarker===null)return null;const n=t._searchMarker.length===0?null:t._searchMarker.reduce((i,s)=>ra(e-i.index)<ra(e-s.index)?i:s);let r=t._start,o=0;for(n!==null&&(r=n.p,o=n.index,d1(n));r.right!==null&&o<e;){if(!r.deleted&&r.countable){if(e<o+r.length)break;o+=r.length}r=r.right}for(;r.left!==null&&o>e;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);for(;r.left!==null&&r.left.id.client===r.id.client&&r.left.id.clock+r.left.length===r.id.clock;)r=r.left,!r.deleted&&r.countable&&(o-=r.length);return n!==null&&ra(n.index-o)<r.parent.length/Rg?(Og(n,r,o),n):p1(t._searchMarker,r,o)},Qi=(t,e,n)=>{for(let r=t.length-1;r>=0;r--){const o=t[r];if(n>0){let i=o.p;for(i.marker=!1;i&&(i.deleted||!i.countable);)i=i.left,i&&!i.deleted&&i.countable&&(o.index-=i.length);if(i===null||i.marker===!0){t.splice(r,1);continue}o.p=i,i.marker=!0}(e<o.index||n>0&&e===o.index)&&(o.index=wi(e,o.index+n))}},nl=(t,e,n)=>{const r=t,o=e.changedParentTypes;for(;hi(o,t,()=>[]).push(n),t._item!==null;)t=t._item.parent;Tg(r._eH,n,e)};class At{constructor(){this._item=null,this._map=new Map,this._start=null,this.doc=null,this._length=0,this._eH=of(),this._dEH=of(),this._searchMarker=null}get parent(){return this._item?this._item.parent:null}_integrate(e,n){this.doc=e,this._item=n}_copy(){throw Zn()}clone(){throw Zn()}_write(e){}get _first(){let e=this._start;for(;e!==null&&e.deleted;)e=e.right;return e}_callObserver(e,n){!e.local&&this._searchMarker&&(this._searchMarker.length=0)}observe(e){sf(this._eH,e)}observeDeep(e){sf(this._dEH,e)}unobserve(e){af(this._eH,e)}unobserveDeep(e){af(this._dEH,e)}toJSON(){}}const jg=(t,e,n)=>{t.doc??$t(),e<0&&(e=t._length+e),n<0&&(n=t._length+n);let r=n-e;const o=[];let i=t._start;for(;i!==null&&r>0;){if(i.countable&&!i.deleted){const s=i.content.getContent();if(s.length<=e)e-=s.length;else{for(let a=e;a<s.length&&r>0;a++)o.push(s[a]),r--;e=0}}i=i.right}return o},Ig=t=>{t.doc??$t();const e=[];let n=t._start;for(;n!==null;){if(n.countable&&!n.deleted){const r=n.content.getContent();for(let o=0;o<r.length;o++)e.push(r[o])}n=n.right}return e},Zi=(t,e)=>{let n=0,r=t._start;for(t.doc??$t();r!==null;){if(r.countable&&!r.deleted){const o=r.content.getContent();for(let i=0;i<o.length;i++)e(o[i],n++,t)}r=r.right}},Lg=(t,e)=>{const n=[];return Zi(t,(r,o)=>{n.push(e(r,o,t))}),n},f1=t=>{let e=t._start,n=null,r=0;return{[Symbol.iterator](){return this},next:()=>{if(n===null){for(;e!==null&&e.deleted;)e=e.right;if(e===null)return{done:!0,value:void 0};n=e.content.getContent(),r=0,e=e.right}const o=n[r++];return n.length<=r&&(n=null),{done:!1,value:o}}}},$g=(t,e)=>{t.doc??$t();const n=tl(t,e);let r=t._start;for(n!==null&&(r=n.p,e-=n.index);r!==null;r=r.right)if(!r.deleted&&r.countable){if(e<r.length)return r.content.getContent()[e];e-=r.length}},xa=(t,e,n,r)=>{let o=n;const i=t.doc,s=i.clientID,a=i.store,c=n===null?e._start:n.right;let u=[];const d=()=>{u.length>0&&(o=new It(ot(s,Qt(a,s)),o,o&&o.lastId,c,c&&c.id,e,null,new ti(u)),o.integrate(t,0),u=[])};r.forEach(p=>{if(p===null)u.push(p);else switch(p.constructor){case Number:case Object:case Boolean:case Array:case String:u.push(p);break;default:switch(d(),p.constructor){case Uint8Array:case ArrayBuffer:o=new It(ot(s,Qt(a,s)),o,o&&o.lastId,c,c&&c.id,e,null,new rl(new Uint8Array(p))),o.integrate(t,0);break;case vs:o=new It(ot(s,Qt(a,s)),o,o&&o.lastId,c,c&&c.id,e,null,new ol(p)),o.integrate(t,0);break;default:if(p instanceof At)o=new It(ot(s,Qt(a,s)),o,o&&o.lastId,c,c&&c.id,e,null,new qr(p)),o.integrate(t,0);else throw new Error("Unexpected content type in insert operation")}}}),d()},Pg=()=>Qo("Length exceeded!"),Fg=(t,e,n,r)=>{if(n>e._length)throw Pg();if(n===0)return e._searchMarker&&Qi(e._searchMarker,n,r.length),xa(t,e,null,r);const o=n,i=tl(e,n);let s=e._start;for(i!==null&&(s=i.p,n-=i.index,n===0&&(s=s.prev,n+=s&&s.countable&&!s.deleted?s.length:0));s!==null;s=s.right)if(!s.deleted&&s.countable){if(n<=s.length){n<s.length&&Or(t,ot(s.id.client,s.id.clock+n));break}n-=s.length}return e._searchMarker&&Qi(e._searchMarker,o,r.length),xa(t,e,s,r)},h1=(t,e,n)=>{let o=(e._searchMarker||[]).reduce((i,s)=>s.index>i.index?s:i,{index:0,p:e._start}).p;if(o)for(;o.right;)o=o.right;return xa(t,e,o,n)},Bg=(t,e,n,r)=>{if(r===0)return;const o=n,i=r,s=tl(e,n);let a=e._start;for(s!==null&&(a=s.p,n-=s.index);a!==null&&n>0;a=a.right)!a.deleted&&a.countable&&(n<a.length&&Or(t,ot(a.id.client,a.id.clock+n)),n-=a.length);for(;r>0&&a!==null;)a.deleted||(r<a.length&&Or(t,ot(a.id.client,a.id.clock+r)),a.delete(t),r-=a.length),a=a.right;if(r>0)throw Pg();e._searchMarker&&Qi(e._searchMarker,o,-i+r)},ya=(t,e,n)=>{const r=e._map.get(n);r!==void 0&&r.delete(t)},ju=(t,e,n,r)=>{const o=e._map.get(n)||null,i=t.doc,s=i.clientID;let a;if(r==null)a=new ti([r]);else switch(r.constructor){case Number:case Object:case Boolean:case Array:case String:case Date:case BigInt:a=new ti([r]);break;case Uint8Array:a=new rl(r);break;case vs:a=new ol(r);break;default:if(r instanceof At)a=new qr(r);else throw new Error("Unexpected content type")}new It(ot(s,Qt(i.store,s)),o,o&&o.lastId,null,null,e,n,a).integrate(t,0)},Iu=(t,e)=>{t.doc??$t();const n=t._map.get(e);return n!==void 0&&!n.deleted?n.content.getContent()[n.length-1]:void 0},qg=t=>{const e={};return t.doc??$t(),t._map.forEach((n,r)=>{n.deleted||(e[r]=n.content.getContent()[n.length-1])}),e},Ug=(t,e)=>{t.doc??$t();const n=t._map.get(e);return n!==void 0&&!n.deleted},w1=(t,e)=>{const n={};return t._map.forEach((r,o)=>{let i=r;for(;i!==null&&(!e.sv.has(i.id.client)||i.id.clock>=(e.sv.get(i.id.client)||0));)i=i.left;i!==null&&Lo(i,e)&&(n[o]=i.content.getContent()[i.length-1])}),n},Js=t=>(t.doc??$t(),VC(t._map.entries(),e=>!e[1].deleted));class Vg extends el{}class oo extends At{constructor(){super(),this._prelimContent=[],this._searchMarker=[]}static from(e){const n=new oo;return n.push(e),n}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new oo}clone(){const e=new oo;return e.insert(0,this.toArray().map(n=>n instanceof At?n.clone():n)),e}get length(){return this.doc??$t(),this._length}_callObserver(e,n){super._callObserver(e,n),nl(this,e,new Vg(this,e))}insert(e,n){this.doc!==null?Ge(this.doc,r=>{Fg(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}push(e){this.doc!==null?Ge(this.doc,n=>{h1(n,this,e)}):this._prelimContent.push(...e)}unshift(e){this.insert(0,e)}delete(e,n=1){this.doc!==null?Ge(this.doc,r=>{Bg(r,this,e,n)}):this._prelimContent.splice(e,n)}get(e){return $g(this,e)}toArray(){return Ig(this)}slice(e=0,n=this.length){return jg(this,e,n)}toJSON(){return this.map(e=>e instanceof At?e.toJSON():e)}map(e){return Lg(this,e)}forEach(e){Zi(this,e)}[Symbol.iterator](){return f1(this)}_write(e){e.writeTypeRef(k1)}}class g1 extends el{constructor(e,n,r){super(e,n),this.keysChanged=r}}class Zo extends At{constructor(e){super(),this._prelimContent=null,e===void 0?this._prelimContent=new Map:this._prelimContent=new Map(e)}_integrate(e,n){super._integrate(e,n),this._prelimContent.forEach((r,o)=>{this.set(o,r)}),this._prelimContent=null}_copy(){return new Zo}clone(){const e=new Zo;return this.forEach((n,r)=>{e.set(r,n instanceof At?n.clone():n)}),e}_callObserver(e,n){nl(this,e,new g1(this,e,n))}toJSON(){this.doc??$t();const e={};return this._map.forEach((n,r)=>{if(!n.deleted){const o=n.content.getContent()[n.length-1];e[r]=o instanceof At?o.toJSON():o}}),e}get size(){return[...Js(this)].length}keys(){return Kl(Js(this),e=>e[0])}values(){return Kl(Js(this),e=>e[1].content.getContent()[e[1].length-1])}entries(){return Kl(Js(this),e=>[e[0],e[1].content.getContent()[e[1].length-1]])}forEach(e){this.doc??$t(),this._map.forEach((n,r)=>{n.deleted||e(n.content.getContent()[n.length-1],r,this)})}[Symbol.iterator](){return this.entries()}delete(e){this.doc!==null?Ge(this.doc,n=>{ya(n,this,e)}):this._prelimContent.delete(e)}set(e,n){return this.doc!==null?Ge(this.doc,r=>{ju(r,this,e,n)}):this._prelimContent.set(e,n),n}get(e){return Iu(this,e)}has(e){return Ug(this,e)}clear(){this.doc!==null?Ge(this.doc,e=>{this.forEach(function(n,r,o){ya(e,o,r)})}):this._prelimContent.clear()}_write(e){e.writeTypeRef(N1)}}const Er=(t,e)=>t===e||typeof t=="object"&&typeof e=="object"&&t&&e&&kC(t,e);class Oc{constructor(e,n,r,o){this.left=e,this.right=n,this.index=r,this.currentAttributes=o}forward(){switch(this.right===null&&uo(),this.right.content.constructor){case yt:this.right.deleted||gi(this.currentAttributes,this.right.content);break;default:this.right.deleted||(this.index+=this.right.length);break}this.left=this.right,this.right=this.right.right}}const pf=(t,e,n)=>{for(;e.right!==null&&n>0;){switch(e.right.content.constructor){case yt:e.right.deleted||gi(e.currentAttributes,e.right.content);break;default:e.right.deleted||(n<e.right.length&&Or(t,ot(e.right.id.client,e.right.id.clock+n)),e.index+=e.right.length,n-=e.right.length);break}e.left=e.right,e.right=e.right.right}return e},Xs=(t,e,n,r)=>{const o=new Map,i=r?tl(e,n):null;if(i){const s=new Oc(i.p.left,i.p,i.index,o);return pf(t,s,n-i.index)}else{const s=new Oc(null,e._start,0,o);return pf(t,s,n)}},Hg=(t,e,n,r)=>{for(;n.right!==null&&(n.right.deleted===!0||n.right.content.constructor===yt&&Er(r.get(n.right.content.key),n.right.content.value));)n.right.deleted||r.delete(n.right.content.key),n.forward();const o=t.doc,i=o.clientID;r.forEach((s,a)=>{const c=n.left,u=n.right,d=new It(ot(i,Qt(o.store,i)),c,c&&c.lastId,u,u&&u.id,e,null,new yt(a,s));d.integrate(t,0),n.right=d,n.forward()})},gi=(t,e)=>{const{key:n,value:r}=e;r===null?t.delete(n):t.set(n,r)},zg=(t,e)=>{for(;t.right!==null;){if(!(t.right.deleted||t.right.content.constructor===yt&&Er(e[t.right.content.key]??null,t.right.content.value)))break;t.forward()}},Gg=(t,e,n,r)=>{const o=t.doc,i=o.clientID,s=new Map;for(const a in r){const c=r[a],u=n.currentAttributes.get(a)??null;if(!Er(u,c)){s.set(a,u);const{left:d,right:p}=n;n.right=new It(ot(i,Qt(o.store,i)),d,d&&d.lastId,p,p&&p.id,e,null,new yt(a,c)),n.right.integrate(t,0),n.forward()}}return s},Wl=(t,e,n,r,o)=>{n.currentAttributes.forEach((f,h)=>{o[h]===void 0&&(o[h]=null)});const i=t.doc,s=i.clientID;zg(n,o);const a=Gg(t,e,n,o),c=r.constructor===String?new dr(r):r instanceof At?new qr(r):new mi(r);let{left:u,right:d,index:p}=n;e._searchMarker&&Qi(e._searchMarker,n.index,c.getLength()),d=new It(ot(s,Qt(i.store,s)),u,u&&u.lastId,d,d&&d.id,e,null,c),d.integrate(t,0),n.right=d,n.index=p,n.forward(),Hg(t,e,n,a)},ff=(t,e,n,r,o)=>{const i=t.doc,s=i.clientID;zg(n,o);const a=Gg(t,e,n,o);e:for(;n.right!==null&&(r>0||a.size>0&&(n.right.deleted||n.right.content.constructor===yt));){if(!n.right.deleted)switch(n.right.content.constructor){case yt:{const{key:c,value:u}=n.right.content,d=o[c];if(d!==void 0){if(Er(d,u))a.delete(c);else{if(r===0)break e;a.set(c,u)}n.right.delete(t)}else n.currentAttributes.set(c,u);break}default:r<n.right.length&&Or(t,ot(n.right.id.client,n.right.id.clock+r)),r-=n.right.length;break}n.forward()}if(r>0){let c="";for(;r>0;r--)c+=`
`;n.right=new It(ot(s,Qt(i.store,s)),n.left,n.left&&n.left.lastId,n.right,n.right&&n.right.id,e,null,new dr(c)),n.right.integrate(t,0),n.forward()}Hg(t,e,n,a)},Kg=(t,e,n,r,o)=>{let i=e;const s=Qn();for(;i&&(!i.countable||i.deleted);){if(!i.deleted&&i.content.constructor===yt){const u=i.content;s.set(u.key,u)}i=i.right}let a=0,c=!1;for(;e!==i;){if(n===e&&(c=!0),!e.deleted){const u=e.content;switch(u.constructor){case yt:{const{key:d,value:p}=u,f=r.get(d)??null;(s.get(d)!==u||f===p)&&(e.delete(t),a++,!c&&(o.get(d)??null)===p&&f!==p&&(f===null?o.delete(d):o.set(d,f))),!c&&!e.deleted&&gi(o,u);break}}}e=e.right}return a},m1=(t,e)=>{for(;e&&e.right&&(e.right.deleted||!e.right.countable);)e=e.right;const n=new Set;for(;e&&(e.deleted||!e.countable);){if(!e.deleted&&e.content.constructor===yt){const r=e.content.key;n.has(r)?e.delete(t):n.add(r)}e=e.left}},b1=t=>{let e=0;return Ge(t.doc,n=>{let r=t._start,o=t._start,i=Qn();const s=Sc(i);for(;o;){if(o.deleted===!1)switch(o.content.constructor){case yt:gi(s,o.content);break;default:e+=Kg(n,r,o,i,s),i=Sc(s),r=o;break}o=o.right}}),e},v1=t=>{const e=new Set,n=t.doc;for(const[r,o]of t.afterState.entries()){const i=t.beforeState.get(r)||0;o!==i&&Dg(t,n.store.clients.get(r),i,o,s=>{!s.deleted&&s.content.constructor===yt&&s.constructor!==yr&&e.add(s.parent)})}Ge(n,r=>{Cg(t,t.deleteSet,o=>{if(o instanceof yr||!o.parent._hasFormatting||e.has(o.parent))return;const i=o.parent;o.content.constructor===yt?e.add(i):m1(r,o)});for(const o of e)b1(o)})},hf=(t,e,n)=>{const r=n,o=Sc(e.currentAttributes),i=e.right;for(;n>0&&e.right!==null;){if(e.right.deleted===!1)switch(e.right.content.constructor){case qr:case mi:case dr:n<e.right.length&&Or(t,ot(e.right.id.client,e.right.id.clock+n)),n-=e.right.length,e.right.delete(t);break}e.forward()}i&&Kg(t,i,e.right,o,e.currentAttributes);const s=(e.left||e.right).parent;return s._searchMarker&&Qi(s._searchMarker,e.index,-r+n),e};class x1 extends el{constructor(e,n,r){super(e,n),this.childListChanged=!1,this.keysChanged=new Set,r.forEach(o=>{o===null?this.childListChanged=!0:this.keysChanged.add(o)})}get changes(){if(this._changes===null){const e={keys:this.keys,delta:this.delta,added:new Set,deleted:new Set};this._changes=e}return this._changes}get delta(){if(this._delta===null){const e=this.target.doc,n=[];Ge(e,r=>{const o=new Map,i=new Map;let s=this.target._start,a=null;const c={};let u="",d=0,p=0;const f=()=>{if(a!==null){let h=null;switch(a){case"delete":p>0&&(h={delete:p}),p=0;break;case"insert":(typeof u=="object"||u.length>0)&&(h={insert:u},o.size>0&&(h.attributes={},o.forEach((b,x)=>{b!==null&&(h.attributes[x]=b)}))),u="";break;case"retain":d>0&&(h={retain:d},_C(c)||(h.attributes=vC({},c))),d=0;break}h&&n.push(h),a=null}};for(;s!==null;){switch(s.content.constructor){case qr:case mi:this.adds(s)?this.deletes(s)||(f(),a="insert",u=s.content.getContent()[0],f()):this.deletes(s)?(a!=="delete"&&(f(),a="delete"),p+=1):s.deleted||(a!=="retain"&&(f(),a="retain"),d+=1);break;case dr:this.adds(s)?this.deletes(s)||(a!=="insert"&&(f(),a="insert"),u+=s.content.str):this.deletes(s)?(a!=="delete"&&(f(),a="delete"),p+=s.length):s.deleted||(a!=="retain"&&(f(),a="retain"),d+=s.length);break;case yt:{const{key:h,value:b}=s.content;if(this.adds(s)){if(!this.deletes(s)){const x=o.get(h)??null;Er(x,b)?b!==null&&s.delete(r):(a==="retain"&&f(),Er(b,i.get(h)??null)?delete c[h]:c[h]=b)}}else if(this.deletes(s)){i.set(h,b);const x=o.get(h)??null;Er(x,b)||(a==="retain"&&f(),c[h]=x)}else if(!s.deleted){i.set(h,b);const x=c[h];x!==void 0&&(Er(x,b)?x!==null&&s.delete(r):(a==="retain"&&f(),b===null?delete c[h]:c[h]=b))}s.deleted||(a==="insert"&&f(),gi(o,s.content));break}}s=s.right}for(f();n.length>0;){const h=n[n.length-1];if(h.retain!==void 0&&h.attributes===void 0)n.pop();else break}}),this._delta=n}return this._delta}}class _a extends At{constructor(e){super(),this._pending=e!==void 0?[()=>this.insert(0,e)]:[],this._searchMarker=[],this._hasFormatting=!1}get length(){return this.doc??$t(),this._length}_integrate(e,n){super._integrate(e,n);try{this._pending.forEach(r=>r())}catch(r){console.error(r)}this._pending=null}_copy(){return new _a}clone(){const e=new _a;return e.applyDelta(this.toDelta()),e}_callObserver(e,n){super._callObserver(e,n);const r=new x1(this,e,n);nl(this,e,r),!e.local&&this._hasFormatting&&(e._needFormattingCleanup=!0)}toString(){this.doc??$t();let e="",n=this._start;for(;n!==null;)!n.deleted&&n.countable&&n.content.constructor===dr&&(e+=n.content.str),n=n.right;return e}toJSON(){return this.toString()}applyDelta(e,{sanitize:n=!0}={}){this.doc!==null?Ge(this.doc,r=>{const o=new Oc(null,this._start,0,new Map);for(let i=0;i<e.length;i++){const s=e[i];if(s.insert!==void 0){const a=!n&&typeof s.insert=="string"&&i===e.length-1&&o.right===null&&s.insert.slice(-1)===`
`?s.insert.slice(0,-1):s.insert;(typeof a!="string"||a.length>0)&&Wl(r,this,o,a,s.attributes||{})}else s.retain!==void 0?ff(r,this,o,s.retain,s.attributes||{}):s.delete!==void 0&&hf(r,o,s.delete)}}):this._pending.push(()=>this.applyDelta(e))}toDelta(e,n,r){this.doc??$t();const o=[],i=new Map,s=this.doc;let a="",c=this._start;function u(){if(a.length>0){const p={};let f=!1;i.forEach((b,x)=>{f=!0,p[x]=b});const h={insert:a};f&&(h.attributes=p),o.push(h),a=""}}const d=()=>{for(;c!==null;){if(Lo(c,e)||n!==void 0&&Lo(c,n))switch(c.content.constructor){case dr:{const p=i.get("ychange");e!==void 0&&!Lo(c,e)?(p===void 0||p.user!==c.id.client||p.type!=="removed")&&(u(),i.set("ychange",r?r("removed",c.id):{type:"removed"})):n!==void 0&&!Lo(c,n)?(p===void 0||p.user!==c.id.client||p.type!=="added")&&(u(),i.set("ychange",r?r("added",c.id):{type:"added"})):p!==void 0&&(u(),i.delete("ychange")),a+=c.content.str;break}case qr:case mi:{u();const p={insert:c.content.getContent()[0]};if(i.size>0){const f={};p.attributes=f,i.forEach((h,b)=>{f[b]=h})}o.push(p);break}case yt:Lo(c,e)&&(u(),gi(i,c.content));break}c=c.right}u()};return e||n?Ge(s,p=>{e&&Mc(p,e),n&&Mc(p,n),d()},"cleanup"):d(),o}insert(e,n,r){if(n.length<=0)return;const o=this.doc;o!==null?Ge(o,i=>{const s=Xs(i,this,e,!r);r||(r={},s.currentAttributes.forEach((a,c)=>{r[c]=a})),Wl(i,this,s,n,r)}):this._pending.push(()=>this.insert(e,n,r))}insertEmbed(e,n,r){const o=this.doc;o!==null?Ge(o,i=>{const s=Xs(i,this,e,!r);Wl(i,this,s,n,r||{})}):this._pending.push(()=>this.insertEmbed(e,n,r||{}))}delete(e,n){if(n===0)return;const r=this.doc;r!==null?Ge(r,o=>{hf(o,Xs(o,this,e,!0),n)}):this._pending.push(()=>this.delete(e,n))}format(e,n,r){if(n===0)return;const o=this.doc;o!==null?Ge(o,i=>{const s=Xs(i,this,e,!1);s.right!==null&&ff(i,this,s,n,r)}):this._pending.push(()=>this.format(e,n,r))}removeAttribute(e){this.doc!==null?Ge(this.doc,n=>{ya(n,this,e)}):this._pending.push(()=>this.removeAttribute(e))}setAttribute(e,n){this.doc!==null?Ge(this.doc,r=>{ju(r,this,e,n)}):this._pending.push(()=>this.setAttribute(e,n))}getAttribute(e){return Iu(this,e)}getAttributes(){return qg(this)}_write(e){e.writeTypeRef(S1)}}class Jl{constructor(e,n=()=>!0){this._filter=n,this._root=e,this._currentNode=e._start,this._firstCall=!0,e.doc??$t()}[Symbol.iterator](){return this}next(){let e=this._currentNode,n=e&&e.content&&e.content.type;if(e!==null&&(!this._firstCall||e.deleted||!this._filter(n)))do if(n=e.content.type,!e.deleted&&(n.constructor===es||n.constructor===ei)&&n._start!==null)e=n._start;else for(;e!==null;){const r=e.next;if(r!==null){e=r;break}else e.parent===this._root?e=null:e=e.parent._item}while(e!==null&&(e.deleted||!this._filter(e.content.type)));return this._firstCall=!1,e===null?{value:void 0,done:!0}:(this._currentNode=e,{value:e.content.type,done:!1})}}class ei extends At{constructor(){super(),this._prelimContent=[]}get firstChild(){const e=this._first;return e?e.content.getContent()[0]:null}_integrate(e,n){super._integrate(e,n),this.insert(0,this._prelimContent),this._prelimContent=null}_copy(){return new ei}clone(){const e=new ei;return e.insert(0,this.toArray().map(n=>n instanceof At?n.clone():n)),e}get length(){return this.doc??$t(),this._prelimContent===null?this._length:this._prelimContent.length}createTreeWalker(e){return new Jl(this,e)}querySelector(e){e=e.toUpperCase();const r=new Jl(this,o=>o.nodeName&&o.nodeName.toUpperCase()===e).next();return r.done?null:r.value}querySelectorAll(e){return e=e.toUpperCase(),Xo(new Jl(this,n=>n.nodeName&&n.nodeName.toUpperCase()===e))}_callObserver(e,n){nl(this,e,new y1(this,n,e))}toString(){return Lg(this,e=>e.toString()).join("")}toJSON(){return this.toString()}toDOM(e=document,n={},r){const o=e.createDocumentFragment();return r!==void 0&&r._createAssociation(o,this),Zi(this,i=>{o.insertBefore(i.toDOM(e,n,r),null)}),o}insert(e,n){this.doc!==null?Ge(this.doc,r=>{Fg(r,this,e,n)}):this._prelimContent.splice(e,0,...n)}insertAfter(e,n){if(this.doc!==null)Ge(this.doc,r=>{const o=e&&e instanceof At?e._item:e;xa(r,this,o,n)});else{const r=this._prelimContent,o=e===null?0:r.findIndex(i=>i===e)+1;if(o===0&&e!==null)throw Qo("Reference item not found");r.splice(o,0,...n)}}delete(e,n=1){this.doc!==null?Ge(this.doc,r=>{Bg(r,this,e,n)}):this._prelimContent.splice(e,n)}toArray(){return Ig(this)}push(e){this.insert(this.length,e)}unshift(e){this.insert(0,e)}get(e){return $g(this,e)}slice(e=0,n=this.length){return jg(this,e,n)}forEach(e){Zi(this,e)}_write(e){e.writeTypeRef(A1)}}class es extends ei{constructor(e="UNDEFINED"){super(),this.nodeName=e,this._prelimAttrs=new Map}get nextSibling(){const e=this._item?this._item.next:null;return e?e.content.type:null}get prevSibling(){const e=this._item?this._item.prev:null;return e?e.content.type:null}_integrate(e,n){super._integrate(e,n),this._prelimAttrs.forEach((r,o)=>{this.setAttribute(o,r)}),this._prelimAttrs=null}_copy(){return new es(this.nodeName)}clone(){const e=new es(this.nodeName),n=this.getAttributes();return yC(n,(r,o)=>{typeof r=="string"&&e.setAttribute(o,r)}),e.insert(0,this.toArray().map(r=>r instanceof At?r.clone():r)),e}toString(){const e=this.getAttributes(),n=[],r=[];for(const a in e)r.push(a);r.sort();const o=r.length;for(let a=0;a<o;a++){const c=r[a];n.push(c+'="'+e[c]+'"')}const i=this.nodeName.toLocaleLowerCase(),s=n.length>0?" "+n.join(" "):"";return`<${i}${s}>${super.toString()}</${i}>`}removeAttribute(e){this.doc!==null?Ge(this.doc,n=>{ya(n,this,e)}):this._prelimAttrs.delete(e)}setAttribute(e,n){this.doc!==null?Ge(this.doc,r=>{ju(r,this,e,n)}):this._prelimAttrs.set(e,n)}getAttribute(e){return Iu(this,e)}hasAttribute(e){return Ug(this,e)}getAttributes(e){return e?w1(this,e):qg(this)}toDOM(e=document,n={},r){const o=e.createElement(this.nodeName),i=this.getAttributes();for(const s in i){const a=i[s];typeof a=="string"&&o.setAttribute(s,a)}return Zi(this,s=>{o.appendChild(s.toDOM(e,n,r))}),r!==void 0&&r._createAssociation(o,this),o}_write(e){e.writeTypeRef(T1),e.writeKey(this.nodeName)}}class y1 extends el{constructor(e,n,r){super(e,r),this.childListChanged=!1,this.attributesChanged=new Set,n.forEach(o=>{o===null?this.childListChanged=!0:this.attributesChanged.add(o)})}}class Yg{constructor(e,n){this.id=e,this.length=n}get deleted(){throw Zn()}mergeWith(e){return!1}write(e,n,r){throw Zn()}integrate(e,n){throw Zn()}}const _1=0;class yr extends Yg{get deleted(){return!0}delete(){}mergeWith(e){return this.constructor!==e.constructor?!1:(this.length+=e.length,!0)}integrate(e,n){n>0&&(this.id.clock+=n,this.length-=n),Ag(e.doc.store,this)}write(e,n){e.writeInfo(_1),e.writeLen(this.length-n)}getMissing(e,n){return null}}class rl{constructor(e){this.content=e}getLength(){return 1}getContent(){return[this.content]}isCountable(){return!0}copy(){return new rl(this.content)}splice(e){throw Zn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeBuf(this.content)}getRef(){return 3}}class Ca{constructor(e){this.len=e}getLength(){return this.len}getContent(){return[]}isCountable(){return!1}copy(){return new Ca(this.len)}splice(e){const n=new Ca(this.len-e);return this.len=e,n}mergeWith(e){return this.len+=e.len,!0}integrate(e,n){Ng(e.deleteSet,n.id.client,n.id.clock,this.len),n.markDeleted()}delete(e){}gc(e){}write(e,n){e.writeLen(this.len-n)}getRef(){return 1}}const C1=(t,e)=>new vs({guid:t,...e,shouldLoad:e.shouldLoad||e.autoLoad||!1});class ol{constructor(e){e._item&&console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid."),this.doc=e;const n={};this.opts=n,e.gc||(n.gc=!1),e.autoLoad&&(n.autoLoad=!0),e.meta!==null&&(n.meta=e.meta)}getLength(){return 1}getContent(){return[this.doc]}isCountable(){return!0}copy(){return new ol(C1(this.doc.guid,this.opts))}splice(e){throw Zn()}mergeWith(e){return!1}integrate(e,n){this.doc._item=n,e.subdocsAdded.add(this.doc),this.doc.shouldLoad&&e.subdocsLoaded.add(this.doc)}delete(e){e.subdocsAdded.has(this.doc)?e.subdocsAdded.delete(this.doc):e.subdocsRemoved.add(this.doc)}gc(e){}write(e,n){e.writeString(this.doc.guid),e.writeAny(this.opts)}getRef(){return 9}}class mi{constructor(e){this.embed=e}getLength(){return 1}getContent(){return[this.embed]}isCountable(){return!0}copy(){return new mi(this.embed)}splice(e){throw Zn()}mergeWith(e){return!1}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeJSON(this.embed)}getRef(){return 5}}class yt{constructor(e,n){this.key=e,this.value=n}getLength(){return 1}getContent(){return[]}isCountable(){return!1}copy(){return new yt(this.key,this.value)}splice(e){throw Zn()}mergeWith(e){return!1}integrate(e,n){const r=n.parent;r._searchMarker=null,r._hasFormatting=!0}delete(e){}gc(e){}write(e,n){e.writeKey(this.key),e.writeJSON(this.value)}getRef(){return 6}}const E1=va("node_env")==="development";class ti{constructor(e){this.arr=e,E1&&wg(e)}getLength(){return this.arr.length}getContent(){return this.arr}isCountable(){return!0}copy(){return new ti(this.arr)}splice(e){const n=new ti(this.arr.slice(e));return this.arr=this.arr.slice(0,e),n}mergeWith(e){return this.arr=this.arr.concat(e.arr),!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){const r=this.arr.length;e.writeLen(r-n);for(let o=n;o<r;o++){const i=this.arr[o];e.writeAny(i)}}getRef(){return 8}}class dr{constructor(e){this.str=e}getLength(){return this.str.length}getContent(){return this.str.split("")}isCountable(){return!0}copy(){return new dr(this.str)}splice(e){const n=new dr(this.str.slice(e));this.str=this.str.slice(0,e);const r=this.str.charCodeAt(e-1);return r>=55296&&r<=56319&&(this.str=this.str.slice(0,e-1)+"�",n.str="�"+n.str.slice(1)),n}mergeWith(e){return this.str+=e.str,!0}integrate(e,n){}delete(e){}gc(e){}write(e,n){e.writeString(n===0?this.str:this.str.slice(n))}getRef(){return 4}}const k1=0,N1=1,S1=2,T1=3,A1=4;class qr{constructor(e){this.type=e}getLength(){return 1}getContent(){return[this.type]}isCountable(){return!0}copy(){return new qr(this.type._copy())}splice(e){throw Zn()}mergeWith(e){return!1}integrate(e,n){this.type._integrate(e.doc,n)}delete(e){let n=this.type._start;for(;n!==null;)n.deleted?n.id.clock<(e.beforeState.get(n.id.client)||0)&&e._mergeStructs.push(n):n.delete(e),n=n.right;this.type._map.forEach(r=>{r.deleted?r.id.clock<(e.beforeState.get(r.id.client)||0)&&e._mergeStructs.push(r):r.delete(e)}),e.changed.delete(this.type)}gc(e){let n=this.type._start;for(;n!==null;)n.gc(e,!0),n=n.right;this.type._start=null,this.type._map.forEach(r=>{for(;r!==null;)r.gc(e,!0),r=r.left}),this.type._map=new Map}write(e,n){this.type._write(e)}getRef(){return 7}}const Wg=(t,e,n)=>{const{client:r,clock:o}=e.id,i=new It(ot(r,o+n),e,ot(r,o+n-1),e.right,e.rightOrigin,e.parent,e.parentSub,e.content.splice(n));return e.deleted&&i.markDeleted(),e.keep&&(i.keep=!0),e.redone!==null&&(i.redone=ot(e.redone.client,e.redone.clock+n)),e.right=i,i.right!==null&&(i.right.left=i),t._mergeStructs.push(i),i.parentSub!==null&&i.right===null&&i.parent._map.set(i.parentSub,i),e.length=n,i};class It extends Yg{constructor(e,n,r,o,i,s,a,c){super(e,c.getLength()),this.origin=r,this.left=n,this.right=o,this.rightOrigin=i,this.parent=s,this.parentSub=a,this.redone=null,this.content=c,this.info=this.content.isCountable()?Yp:0}set marker(e){(this.info&Hl)>0!==e&&(this.info^=Hl)}get marker(){return(this.info&Hl)>0}get keep(){return(this.info&Kp)>0}set keep(e){this.keep!==e&&(this.info^=Kp)}get countable(){return(this.info&Yp)>0}get deleted(){return(this.info&Vl)>0}set deleted(e){this.deleted!==e&&(this.info^=Vl)}markDeleted(){this.info|=Vl}getMissing(e,n){if(this.origin&&this.origin.client!==this.id.client&&this.origin.clock>=Qt(n,this.origin.client))return this.origin.client;if(this.rightOrigin&&this.rightOrigin.client!==this.id.client&&this.rightOrigin.clock>=Qt(n,this.rightOrigin.client))return this.rightOrigin.client;if(this.parent&&this.parent.constructor===ia&&this.id.client!==this.parent.client&&this.parent.clock>=Qt(n,this.parent.client))return this.parent.client;if(this.origin&&(this.left=lf(e,n,this.origin),this.origin=this.left.lastId),this.rightOrigin&&(this.right=Or(e,this.rightOrigin),this.rightOrigin=this.right.id),this.left&&this.left.constructor===yr||this.right&&this.right.constructor===yr)this.parent=null;else if(!this.parent)this.left&&this.left.constructor===It?(this.parent=this.left.parent,this.parentSub=this.left.parentSub):this.right&&this.right.constructor===It&&(this.parent=this.right.parent,this.parentSub=this.right.parentSub);else if(this.parent.constructor===ia){const r=Yl(n,this.parent);r.constructor===yr?this.parent=null:this.parent=r.content.type}return null}integrate(e,n){if(n>0&&(this.id.clock+=n,this.left=lf(e,e.doc.store,ot(this.id.client,this.id.clock-1)),this.origin=this.left.lastId,this.content=this.content.splice(n),this.length-=n),this.parent){if(!this.left&&(!this.right||this.right.left!==null)||this.left&&this.left.right!==this.right){let r=this.left,o;if(r!==null)o=r.right;else if(this.parentSub!==null)for(o=this.parent._map.get(this.parentSub)||null;o!==null&&o.left!==null;)o=o.left;else o=this.parent._start;const i=new Set,s=new Set;for(;o!==null&&o!==this.right;){if(s.add(o),i.add(o),Ws(this.origin,o.origin)){if(o.id.client<this.id.client)r=o,i.clear();else if(Ws(this.rightOrigin,o.rightOrigin))break}else if(o.origin!==null&&s.has(Yl(e.doc.store,o.origin)))i.has(Yl(e.doc.store,o.origin))||(r=o,i.clear());else break;o=o.right}this.left=r}if(this.left!==null){const r=this.left.right;this.right=r,this.left.right=this}else{let r;if(this.parentSub!==null)for(r=this.parent._map.get(this.parentSub)||null;r!==null&&r.left!==null;)r=r.left;else r=this.parent._start,this.parent._start=this;this.right=r}this.right!==null?this.right.left=this:this.parentSub!==null&&(this.parent._map.set(this.parentSub,this),this.left!==null&&this.left.delete(e)),this.parentSub===null&&this.countable&&!this.deleted&&(this.parent._length+=this.length),Ag(e.doc.store,this),this.content.integrate(e,this),uf(e,this.parent,this.parentSub),(this.parent._item!==null&&this.parent._item.deleted||this.parentSub!==null&&this.right!==null)&&this.delete(e)}else new yr(this.id,this.length).integrate(e,0)}get next(){let e=this.right;for(;e!==null&&e.deleted;)e=e.right;return e}get prev(){let e=this.left;for(;e!==null&&e.deleted;)e=e.left;return e}get lastId(){return this.length===1?this.id:ot(this.id.client,this.id.clock+this.length-1)}mergeWith(e){if(this.constructor===e.constructor&&Ws(e.origin,this.lastId)&&this.right===e&&Ws(this.rightOrigin,e.rightOrigin)&&this.id.client===e.id.client&&this.id.clock+this.length===e.id.clock&&this.deleted===e.deleted&&this.redone===null&&e.redone===null&&this.content.constructor===e.content.constructor&&this.content.mergeWith(e.content)){const n=this.parent._searchMarker;return n&&n.forEach(r=>{r.p===e&&(r.p=this,!this.deleted&&this.countable&&(r.index-=this.length))}),e.keep&&(this.keep=!0),this.right=e.right,this.right!==null&&(this.right.left=this),this.length+=e.length,!0}return!1}delete(e){if(!this.deleted){const n=this.parent;this.countable&&this.parentSub===null&&(n._length-=this.length),this.markDeleted(),Ng(e.deleteSet,this.id.client,this.id.clock,this.length),uf(e,n,this.parentSub),this.content.delete(e)}}gc(e,n){if(!this.deleted)throw uo();this.content.gc(e),n?i1(e,this,new yr(this.id,this.length)):this.content=new Ca(this.length)}write(e,n){const r=n>0?ot(this.id.client,this.id.clock+n-1):this.origin,o=this.rightOrigin,i=this.parentSub,s=this.content.getRef()&K_|(r===null?0:ba)|(o===null?0:pg)|(i===null?0:G_);if(e.writeInfo(s),r!==null&&e.writeLeftID(r),o!==null&&e.writeRightID(o),r===null&&o===null){const a=this.parent;if(a._item!==void 0){const c=a._item;if(c===null){const u=n1(a);e.writeParentInfo(!0),e.writeString(u)}else e.writeParentInfo(!1),e.writeLeftID(c.id)}else a.constructor===String?(e.writeParentInfo(!0),e.writeString(a)):a.constructor===ia?(e.writeParentInfo(!1),e.writeLeftID(a)):uo();i!==null&&e.writeString(i)}this.content.write(e,n)}}const Jg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:{},Xg="__ $YJS$ __";Jg[Xg]===!0&&console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");Jg[Xg]=!0;g.createCommand("CONNECTED_COMMAND");const D1=g.createCommand("TOGGLE_CONNECT_COMMAND");var M1=Object.defineProperty,R1=(t,e,n)=>e in t?M1(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,de=(t,e,n)=>R1(t,typeof e!="symbol"?e+"":e,n);const Xl=t=>g.$applyNodeReplacement(g.$parseSerializedNode(t)),po=g.createState("cid",{parse:t=>typeof t=="string"?t:void 0}),fo=g.createState("segment",{parse:t=>typeof t=="string"?t:void 0}),jc="unknown",Qg=1;class ko extends g.ElementNode{constructor(e="",n,r,o){super(o),de(this,"__tag"),de(this,"__marker"),de(this,"__unknownAttributes"),this.__tag=e,this.__marker=n,this.__unknownAttributes=r}static getType(){return"unknown"}static clone(e){const{__tag:n,__marker:r,__unknownAttributes:o,__key:i}=e;return new ko(n,r,o,i)}static importDOM(){return{[jc]:e=>j1(e)?{conversion:O1,priority:1}:null}}static importJSON(e){return Zg().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTag(e.tag).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setTag(e){if(this.__tag===e)return this;const n=this.getWritable();return n.__tag=e,n}getTag(){return this.getLatest().__tag}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(jc);return e.style.display="none",e}updateDOM(){return!1}exportDOM(){return{element:null}}exportJSON(){return{...super.exportJSON(),type:this.getType(),tag:this.getTag(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:Qg}}canBeEmpty(){return!0}isInline(){return!0}extractWithChild(){return!1}excludeFromCopy(e){return e!=="clone"}}function O1(t){const e=t.getAttribute("data-tag")??"",n=t.getAttribute("data-marker")??"";return{node:Zg(e,n)}}function Zg(t,e,n){return g.$applyNodeReplacement(new ko(t,e,n))}function j1(t){return(t==null?void 0:t.tagName)===jc}function xs(t){return t instanceof ko}const ts="id",em=1;class xn extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker",ts),de(this,"__code"),de(this,"__unknownAttributes"),this.__code=e,this.__unknownAttributes=n}static getType(){return"book"}static clone(e){const{__code:n,__unknownAttributes:r,__key:o}=e;return new xn(n,r,o)}static importJSON(e){const{code:n}=e;return tm(n).updateFromJSON(e)}static isValidBookCode(e){return Vx(e)}updateFromJSON(e){return super.updateFromJSON(e).setCode(e.code).setUnknownAttributes(e.unknownAttributes)}getMarker(){return this.getLatest().__marker}setCode(e){if(this.__code===e)return this;const n=this.getWritable();return n.__code=e,n}getCode(){return this.getLatest().__code}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e.setAttribute("data-code",this.__code),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),code:this.getCode(),unknownAttributes:this.getUnknownAttributes(),version:em}}}function tm(t,e){return g.$applyNodeReplacement(new xn(t,e))}function er(t){return t instanceof xn}function I1(t){return(t==null?void 0:t.type)===xn.getType()}const Ve=" ",Ic="​",Lu=`${Ve}|`,il="p",ho="+",$u="-",Ea="chapter",Lc="verse",wf="invalid",L1="text-spacing",$1="formatted-font",P1="marker-",Pu="external-usj-mutation",nm="selection-change",$c="cursor-change",Pc="annotation-change",Fc="delta-change",F1=[Pu,nm,$c,Pc,Fc],ka="c",rm=1;class Pn extends g.ElementNode{constructor(e="",n,r,o,i,s){super(s),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=ka,this.__number=e,this.__sid=n,this.__altnumber=r,this.__pubnumber=o,this.__unknownAttributes=i}static getType(){return"chapter"}static clone(e){const{__number:n,__sid:r,__altnumber:o,__pubnumber:i,__unknownAttributes:s,__key:a}=e;return new Pn(n,r,o,i,s,a)}static importJSON(e){return om().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(Ea,`usfm_${this.__marker}`),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:rm}}}function om(t,e,n,r,o){return g.$applyNodeReplacement(new Pn(t,e,n,r,o))}function Fu(t){return t instanceof Pn}function B1(t){return(t==null?void 0:t.type)===Pn.getType()}const im=["fr","fq","fqa","fk","ft","fl","fw","fp","fv","fdc","fm"],sm=["xo","xop","xk","xq","xt","xta","xot","xnt","xdc"],q1=["ca","cp","va","vp","add","bk","dc","em","jmp","k","nd","ord","pn","png","qt","rb","rq","sig","sls","tl","w","wa","wg","wh","wj","bd","it","bdit","no","sc","sup","ior","iqt","qac","qs","litl","lik","liv","liv1","liv2","liv3","liv4","liv5",...im,...sm],am=1;class et extends g.ElementNode{constructor(e="",n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"char"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new et(n,r,o)}static isValidMarker(e){return e!==void 0&&q1.includes(e)}static isValidFootnoteMarker(e){return e!==void 0&&im.includes(e)}static isValidCrossReferenceMarker(e){return e!==void 0&&sm.includes(e)}static importDOM(){return{span:e=>V1(e)?{conversion:U1,priority:1}:null}}static importJSON(e){return Yn().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.setAttribute("title",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:am}}insertNewAfter(e,n){const r=Yn(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}canBeEmpty(){return!1}isInline(){return!0}}function U1(t){const e=t.getAttribute("data-marker")??"f";return{node:Yn(e)}}function Yn(t,e){return g.$applyNodeReplacement(new et(t,e))}function V1(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return et.isValidMarker(e)&&t.classList.contains(et.getType())}function He(t){return t instanceof et}function H1(t){return(t==null?void 0:t.type)===et.getType()}const lm=1,z1="c",cm="span";class wr extends g.DecoratorNode{constructor(e="",n=!1,r,o,i,s,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=z1,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=i,this.__unknownAttributes=s}static getType(){return"immutable-chapter"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:i,__pubnumber:s,__unknownAttributes:a,__key:c}=e;return new wr(n,r,o,i,s,a,c)}static importDOM(){return{span:e=>um(e)?{conversion:G1,priority:1}:null}}static importJSON(e){return Bu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement(cm);return e.setAttribute("data-marker",this.__marker),e.classList.add(Ea,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(Ea,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return this.getShowMarker()?_s(this.getMarker(),this.getNumber()):this.getNumber()}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:lm}}isInline(){return!1}isKeyboardSelectable(){return!1}}function G1(t){const e=t.getAttribute("data-number")??"0";return{node:Bu(e)}}function Bu(t,e,n,r,o,i){return g.$applyNodeReplacement(new wr(t,e,n,r,o,i))}function um(t){return t?t.classList.contains(Ea)&&t.tagName.toLowerCase()===cm:!1}function ys(t){return t instanceof wr}function K1(t){return(t==null?void 0:t.type)===wr.getType()}const dm=1;class jr extends g.ParagraphNode{static getType(){return"implied-para"}static clone(e){return new jr(e.__key)}static importJSON(e){return Dn().updateFromJSON(e)}getMarker(){return il}exportJSON(){return{...super.exportJSON(),type:this.getType(),version:dm}}insertNewAfter(e,n){const r=Dn();return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function Dn(){return g.$applyNodeReplacement(new jr)}function pr(t){return t instanceof jr}function qu(t){return(t==null?void 0:t.type)===jr.getType()}const wo="zmsc-s",Vo="zmsc-e",Y1=[wo,Vo],W1=["ts-s","ts-e","t-s","t-e","ts","qt1-s","qt1-e","qt2-s","qt2-e","qt3-s","qt3-e","qt4-s","qt4-e","qt5-s","qt5-e","qt-s","qt-e",wo,Vo],pm=1;class nr extends g.DecoratorNode{constructor(e="",n,r,o,i){super(i),de(this,"__marker"),de(this,"__sid"),de(this,"__eid"),de(this,"__unknownAttributes"),this.__marker=e,this.__sid=n,this.__eid=r,this.__unknownAttributes=o}static getType(){return"ms"}static clone(e){const{__marker:n,__sid:r,__eid:o,__unknownAttributes:i,__key:s}=e;return new nr(n,r,o,i,s)}static importJSON(e){return fm().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&(W1.includes(e)||e.startsWith("z"))}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setSid(e.sid).setEid(e.eid).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setEid(e){if(this.__eid===e)return this;const n=this.getWritable();return n.__eid=e,n}getEid(){return this.getLatest().__eid}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}updateDOM(){return!1}decorate(){return""}exportJSON(){return{type:this.getType(),marker:this.getMarker(),sid:this.getSid(),eid:this.getEid(),unknownAttributes:this.getUnknownAttributes(),version:pm}}isKeyboardSelectable(){return!1}}function J1(t){return Y1.includes(t)}function fm(t,e,n,r){return g.$applyNodeReplacement(new nr(t,e,n,r))}function sl(t){return t instanceof nr}const Uu="f",X1=[Uu,"fe","ef","efe","x","ex"],hm=1;class _t extends g.ElementNode{constructor(e=Uu,n,r=!0,o,i,s){super(s),de(this,"__marker"),de(this,"__caller"),de(this,"__isCollapsed"),de(this,"__category"),de(this,"__unknownAttributes"),this.__marker=e,this.__caller=n??(e==="x"||e==="ex"?$u:ho),this.__isCollapsed=r,this.__category=o,this.__unknownAttributes=i}static getType(){return"note"}static clone(e){const{__marker:n,__caller:r,__isCollapsed:o,__category:i,__unknownAttributes:s,__key:a}=e;return new _t(n,r,o,i,s,a)}static importDOM(){return{span:e=>Z1(e)?{conversion:Q1,priority:1}:null}}static importJSON(e){return Vu().updateFromJSON(e)}static isValidMarker(e){return e!==void 0&&X1.includes(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setCaller(e.caller).setIsCollapsed(e.isCollapsed).setCategory(e.category).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setIsCollapsed(e){if(this.__isCollapsed===e)return this;const n=this.getWritable();return n.__isCollapsed=e,n}toggleIsCollapsed(){const e=this.getWritable();return e.__isCollapsed=!e.__isCollapsed,e}getIsCollapsed(){return this.getLatest().__isCollapsed}setCategory(e){if(this.__category===e)return this;const n=this.getWritable();return n.__category=e,n}getCategory(){return this.getLatest().__category}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`,this.__isCollapsed?"collapsed":"expanded"),e.setAttribute("data-caller",this.__caller),e}updateDOM(e){return e.__isCollapsed!==this.__isCollapsed}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`,this.getIsCollapsed()?"collapsed":"expanded"),n.setAttribute("data-caller",this.getCaller())),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),caller:this.getCaller(),isCollapsed:this.getIsCollapsed(),category:this.getCategory(),unknownAttributes:this.getUnknownAttributes(),version:hm}}canBeEmpty(){return!1}isInline(){return!0}}function Q1(t){const e=t.getAttribute("data-marker")??"f",n=t.getAttribute("data-caller")??"",r=t.classList.contains("collapsed");return{node:Vu(e,n,r)}}function Vu(t,e,n,r,o){return g.$applyNodeReplacement(new _t(t,e,n,r,o))}function Z1(t){if(!t)return!1;const e=t.getAttribute("data-marker")??"";return _t.isValidMarker(e)&&t.classList.contains(_t.getType())}function Te(t){return t instanceof _t}const eE=["ide","sts","rem","h","toc1","toc2","toc3","toca1","toca2","toca3","imt","imt1","imt2","imt3","imt4","is","is1","is2","ip","ipi","im","imi","ipq","imq","ipr","iq","iq1","iq2","iq3","ili","ili1","ili2","ib","iot","io","io1","io2","io3","io4","iex","imte","imte1","imte2","ie","mt","mt1","mt2","mt3","mt4","mte","mte1","mte2","cl","cd","ms","ms1","ms2","ms3","mr","s","s1","s2","s3","s4","sr","r","d","sp","sd","sd1","sd2","sd3","sd4",il,"m","po","cls","pr","pc","pm","pmo","pmc","pmr","pi","pi1","pi2","pi3","mi","lit","nb","q","q1","q2","q3","q4","qr","qc","qa","qm","qm1","qm2","qm3","qd","b","lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4","pb"],wm=1;class Zt extends g.ParagraphNode{constructor(e=il,n,r){super(r),de(this,"__marker"),de(this,"__unknownAttributes"),this.__marker=e,this.__unknownAttributes=n}static getType(){return"para"}static clone(e){const{__marker:n,__unknownAttributes:r,__key:o}=e;return new Zt(n,r,o)}static isValidMarker(e){return e!==void 0&&eE.includes(e)}static importDOM(){return{p:()=>({conversion:tE,priority:1})}}static importJSON(e){return ns().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("p");return e.setAttribute("data-marker",this.__marker),e.classList.add(this.__type,`usfm_${this.__marker}`),e}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(this.getType(),`usfm_${this.getMarker()}`)),{element:n}}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),unknownAttributes:this.getUnknownAttributes(),version:wm}}insertNewAfter(e,n){const r=ns(this.getMarker());return r.setTextFormat(e.format),r.setTextStyle(e.style),r.setDirection(this.getDirection()),r.setFormat(this.getFormatType()),r.setStyle(this.getTextStyle()),this.insertAfter(r,n),r}}function tE(t){const e=t.getAttribute("data-marker")??void 0,n=ns(e);if(t.style){n.setFormat(t.style.textAlign);const r=parseInt(t.style.textIndent,10)/20;r>0&&n.setIndent(r)}return{node:n}}function ns(t,e){return g.$applyNodeReplacement(new Zt(t,e))}function Lt(t){return t instanceof Zt}function nE(t){return(t==null?void 0:t.type)===Zt.getType()}const Na="v",gm=1;class Ht extends g.TextNode{constructor(e="",n,r,o,i,s,a){super(n??e,a),de(this,"__marker"),de(this,"__number"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=Na,this.__number=e,this.__sid=r,this.__altnumber=o,this.__pubnumber=i,this.__unknownAttributes=s}static getType(){return"verse"}static clone(e){const{__number:n,__text:r,__sid:o,__altnumber:i,__pubnumber:s,__unknownAttributes:a,__key:c}=e;return new Ht(n,r,o,i,s,a,c)}static importJSON(e){return mm().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(Lc,`usfm_${this.__marker}`),n.setAttribute("data-number",this.__number),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),marker:this.getMarker(),number:this.getNumber(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:gm}}}function mm(t,e,n,r,o,i){return g.$applyNodeReplacement(new Ht(t,e,n,r,o,i))}function Hu(t){return t instanceof Ht}function rE(t){return(t==null?void 0:t.type)===Ht.getType()}function oE(t){return B1(t)||K1(t)}function bn(t){return Fu(t)||ys(t)}function iE(t,e){return t.find(n=>bn(n)&&n.getNumber()===e.toString())}function sE(t,e=!1){return t.find((n,r)=>(!e||r>0)&&bn(n))}function zu(t){var e;if(!t)return;if(bn(t))return t;let n=(e=t.getTopLevelElement())==null?void 0:e.getPreviousSibling();for(;n&&!bn(n);)n=n.getPreviousSibling();if(n&&bn(n))return n}function bm(t){let e=t;for(;e!==null;){if(Te(e))return e;e=e.getParent()}}function aE(t){return er(t)||Fu(t)||He(t)||ys(t)||pr(t)||sl(t)||Lt(t)||Te(t)||Hu(t)||xs(t)}function lE(t){var e;if(t.anchor.type==="element"){const r=t.anchor.getNode(),o=t.anchor.offset;if(o<r.getChildrenSize())return r.getChildAtIndex(o)}const n=t.anchor.getNode();return n.getNextSibling()??((e=n.getParent())==null?void 0:e.getNextSibling())??null}function cE(t){var e;const n=t.anchor.offset;if(t.anchor.type==="element"&&n>0)return t.anchor.getNode().getChildAtIndex(n-1);const r=t.anchor.getNode();return r.getPreviousSibling()??((e=r.getParent())==null?void 0:e.getPreviousSibling())??null}function An(t){return Lt(t)||pr(t)}function uE(t,e){let n=t.getParent();for(;n;){if(n.getKey()===e)return!0;n=n.getParent()}return!1}function go(t,e){const n=g.$getState(e,po),r=!!(t.cid&&n),o=!t.cid&&!n;return t.style===e.getMarker()&&(o||r&&t.cid===n)}function dE(t,e){const n=g.$isElementNode(t)?t:t.getParent(),r=g.$isElementNode(e)?e:e.getParent(),o=n&&r?g.$getCommonAncestor(n,r):void 0;return o?o.commonAncestor:void 0}function pE(t){const e=t.getStartEndPoints();if(!e)return;const[n,r]=e,o=t.isBackward()?n:r;t.focus.set(o.key,o.offset,o.type),t.anchor.set(o.key,o.offset,o.type)}function Gu(t){return(t==null?void 0:t.type)===g.TextNode.getType()}function fE(t,e){if(!e)return;const n=t.findIndex(r=>r===e);n&&(t.length=n)}function hE(t,e){if(!e)return t;const n=e.getIndexWithinParent();return t.splice(n+1,t.length-n-1)}function gr(t){return`\\${t}`}function ni(t){return`\\${t}*`}function vm(t,e,n){const r=gr(t);if(e!=null&&e.startsWith(r)){const o=parseInt(e.slice(r.length),10);isNaN(o)||(n=o.toString())}return n}function _s(t,e){let n=gr(t);return e&&(n+=`${Ve}${e}`),n+=" ",n}function xm(t){return Gu(t)?t.text:H1(t)?t.children.map(e=>xm(e)).join(""):""}function wE(t){return t.map(e=>xm(e)).join(" ").trim()}function Ku(t){return Ve+t+" "}function Yu(t){return t.reduce((e,n)=>e+(He(n)?` ${n.getTextContent()}`:""),"").trim()}function Ct(t,e=Ux){const n={...t};return e.forEach(r=>{Reflect.deleteProperty(n,r)}),Object.keys(n).length===0?void 0:n}function gE(t,e){const n=e.getElementByKey(t.getKey());return n?n.tagName.toLowerCase():void 0}function mt(t){return Object.fromEntries(Object.entries(t).filter(([,e])=>e!==void 0))}function ym(t){if(!t)return;const e=t.getNodes();if(e.length>0)return t.isBackward()?e[e.length-1]:e[0]}function Bc(t,e){if(!e)return(t+1).toString();const n=e.split("-");if(n.length===2)return parseInt(n[1])?`${parseInt(n[1])+1}`:`${parseInt(n[0])+1}`;const r=RegExp(/^(\d+)([a-yA-Y]{1,3})$/).exec(e);if(!r)return(parseInt(e)+1).toString();const o=String.fromCharCode(r[2].charCodeAt(0)+1);return`${r[1]}${o}`}function Wu(t,e){if(!e)return!1;const n=e.split("-").map(r=>parseInt(r));if(n.length<1||n.length>2||n[0]>n[1])throw new Error("isVerseInRange: invalid range");return n.length===1?t===n[0]:n.length===2&&isNaN(n[1])?t>=n[0]:(n.length===2&&isNaN(n[0])||t>=n[0])&&t<=n[1]}function mE(t){return!!t&&t.includes("-")}const bE=1;class No extends g.TextNode{constructor(e="",n="opening",r){super(Ql(e,n),r),de(this,"__marker"),de(this,"__markerSyntax"),this.__marker=e,this.__markerSyntax=n}static getType(){return"marker"}static clone(e){return new No(e.__marker,e.__markerSyntax,e.__key)}static importJSON(e){return ri().updateFromJSON(e)}updateFromJSON(e){const{marker:n,markerSyntax:r="opening"}=e;return super.updateFromJSON(e).setMarker(n).setMarkerSyntax(r)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n.__text=Ql(e,n.__markerSyntax),n}getMarker(){return this.getLatest().__marker}setMarkerSyntax(e){if(this.__markerSyntax===e)return this;const n=this.getWritable();return n.__markerSyntax=e,n.__text=Ql(n.__marker,e),n}getMarkerSyntax(){return this.getLatest().__markerSyntax}createDOM(e){const n=super.createDOM(e);return n.setAttribute("data-marker",this.__marker),n.classList.add(this.__markerSyntax),n}exportJSON(){return{...super.exportJSON(),type:this.getType(),text:this.getTextContent(),marker:this.getMarker(),markerSyntax:this.getMarkerSyntax(),version:bE}}}function ri(t,e){return g.$applyNodeReplacement(new No(t,e))}function Cs(t){return t instanceof No}function Ql(t,e){return e==="closing"?ni(t):e==="selfClosing"?ni(""):gr(t)}const kr="internal-comment",vE=[kr],xE={},yE=1;class Tt extends g.ElementNode{constructor(e=xE,n){super(n),de(this,"__typedIDs"),this.__typedIDs=e}static getType(){return"typed-mark"}static clone(e){const n=JSON.parse(JSON.stringify(e.__typedIDs));return new Tt(n,e.__key)}static isReservedType(e){return vE.includes(e)}static importDOM(){return null}static importJSON(e){return rs().updateFromJSON(e)}exportJSON(){return{...super.exportJSON(),type:this.getType(),typedIDs:this.getTypedIDs(),version:yE}}createDOM(e){const n=document.createElement("mark");for(const[r,o]of Object.entries(this.__typedIDs))Cr(n,Qs(e.theme.typedMark,r)),o.length>1&&Cr(n,Qs(e.theme.typedMarkOverlap,r));return n}updateDOM(e,n,r){for(const[o,i]of Object.entries(this.__typedIDs)){const s=e.__typedIDs[o].length,a=i.length,c=Qs(r.theme.typedMark,o),u=Qs(r.theme.typedMarkOverlap,o);s!==a&&(s===0?a===1&&Cr(n,c):a===0&&mc(n,c),s===1?a===2&&Cr(n,u):a===1&&mc(n,u))}return!1}updateFromJSON(e){return super.updateFromJSON(e).setTypedIDs(e.typedIDs)}hasID(e,n){const r=this.getTypedIDs()[e];if(!r)return!1;for(const o of r)if(n===o)return!0;return!1}getTypedIDs(){const e=this.getLatest();return Dt(e)?e.__typedIDs:{}}setTypedIDs(e){const n=this.getWritable();return n.__typedIDs=e,n}addID(e,n){const r=this.getWritable();if(!Dt(r))return;const o=r.__typedIDs[e]??[];r.__typedIDs[e]=o;for(const i of o)if(n===i)return;o.push(n)}deleteID(e,n){const r=this.getWritable();if(!Dt(r))return;const o=r.__typedIDs[e];for(let i=0;i<o.length;i++)if(n===o[i]){o.splice(i,1);return}}hasNoIDsForEveryType(){return Object.values(this.getTypedIDs()).every(e=>e===void 0||e.length===0)}insertNewAfter(e,n=!0){const r=rs(this.__typedIDs);return this.insertAfter(r,n),r}canInsertTextBefore(){return!1}canInsertTextAfter(){return!1}canBeEmpty(){return!1}isInline(){return!0}extractWithChild(e,n,r){if(!g.$isRangeSelection(n)||r==="html")return!1;const o=n.anchor,i=n.focus,s=o.getNode(),a=i.getNode(),c=n.isBackward()?o.offset-i.offset:i.offset-o.offset;return this.isParentOf(s)&&this.isParentOf(a)&&this.getTextContent().length===c}excludeFromCopy(e){return e!=="clone"}}function Qs(t,e){return`${t}-${e}`}function rs(t){return g.$applyNodeReplacement(new Tt(t))}function Dt(t){return t instanceof Tt}function _E(t){return(t==null?void 0:t.type)===Tt.getType()}function _m(t){const e=t.getChildren();let n=null;for(const r of e)n===null?t.insertBefore(r):n.insertAfter(r),n=r;t.remove()}function Cm(t,e,n,r){const o=t.getNodes(),i=t.anchor.offset,s=t.focus.offset,a=o.length,c=t.isBackward(),u=c?s:i,d=c?i:s;let p,f;for(let h=0;h<a;h++){const b=o[h];if(g.$isElementNode(f)&&f.isParentOf(b))continue;const x=h===0,E=h===a-1;let C=null;if(g.$isTextNode(b)){const _=b.getTextContentSize(),D=x?u:0,$=E?d:_;if(D===0&&$===0)continue;const H=b.splitText(D,$);C=H.length>1&&(H.length===3||x&&!E||$===_)?H[1]:H[0]}else{if(Dt(b))continue;g.$isElementNode(b)&&b.isInline()&&(C=b)}if(C!==null){if(C&&C.is(p))continue;const _=C.getParent();(_==null||!_.is(p))&&(f=void 0),p=_,f===void 0&&(f=rs({[e]:[n]}),C.insertBefore(f)),f.append(C)}else p=void 0,f=void 0}e===kr&&g.$isElementNode(f)&&(c?f.selectStart():f.selectEnd())}function CE(t,e,n){let r=t;for(;r!==null;){if(Dt(r))return r.getTypedIDs()[e];if(g.$isTextNode(r)&&n===r.getTextContentSize()){const o=r.getNextSibling();if(Dt(o))return o.getTypedIDs()[e]}r=r.getParent()}}function gf(t){return`external-${t}`}const Em=1;class Ur extends g.DecoratorNode{constructor(e="",n="",r){super(r),de(this,"__textType"),de(this,"__text"),this.__textType=e,this.__text=n}static getType(){return"immutable-typed-text"}static clone(e){const{__textType:n,__text:r,__key:o}=e;return new Ur(n,r,o)}static importDOM(){return{span:e=>kE(e)?{conversion:EE,priority:1}:null}}static importJSON(e){return oi().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setTextType(e.textType).setTextContent(e.text)}setTextType(e){if(this.__textType===e)return this;const n=this.getWritable();return n.__textType=e,n}getTextType(){return this.getLatest().__textType}setTextContent(e){if(this.__text===e)return this;const n=this.getWritable();return n.__text=e,n}getTextContent(){return this.getLatest().__text}createDOM(){const e=document.createElement("span");return e.setAttribute("data-text-type",this.__textType),e.classList.add(this.__textType),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&n.setAttribute("data-text-type",this.getTextType()),{element:n}}decorate(){return this.getTextContent()}exportJSON(){return{type:this.getType(),textType:this.getTextType(),text:this.getTextContent(),version:Em}}isKeyboardSelectable(){return!1}}function EE(t){const e=t.getAttribute("data-text-type")??"",n=t.textContent??"";return{node:oi(e,n)}}function oi(t,e){return g.$applyNodeReplacement(new Ur(t,e))}function kE(t){return(t==null?void 0:t.tagName)==="span"}function Sa(t){return t instanceof Ur}function NE(t){return(t==null?void 0:t.type)===Ur.getType()}const Ta="unmatched",km=1;class Vr extends g.DecoratorNode{constructor(e="",n){super(n),de(this,"__marker"),this.__marker=e}static getType(){return"unmatched"}static clone(e){const{__marker:n,__key:r}=e;return new Vr(n,r)}static importDOM(){return{[Ta]:e=>TE(e)?{conversion:SE,priority:1}:null}}static importJSON(e){return Ju().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}createDOM(){const e=document.createElement(Ta);e.setAttribute("data-marker",this.__marker),e.classList.add(wf);const n=this.__marker.endsWith("*");return e.title=n?"This closing marker has no matching opening marker!":"This opening marker has no matching closing marker!",e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(wf)),{element:n}}decorate(){return`\\${this.getMarker()}${Ic}`}exportJSON(){return{type:this.getType(),marker:this.getMarker(),version:km}}isKeyboardSelectable(){return!1}}function SE(t){const e=t.getAttribute("data-marker")??"";return{node:Ju(e)}}function Ju(t){return g.$applyNodeReplacement(new Vr(t))}function TE(t){return(t==null?void 0:t.tagName)===Ta}function Nm(t){return t instanceof Vr}const AE=[xn,wr,Pn,Ht,et,_t,nr,No,ko,Ur,Vr,Zt,jr,{replace:g.ParagraphNode,with:()=>Dn(),withKlass:jr}];var U;(function(t){t.FileIdentification="FileIdentification",t.Headers="Headers",t.Remarks="Remarks",t.Introduction="Introduction",t.DivisionMarks="DivisionMarks",t.Paragraphs="Paragraphs",t.Poetry="Poetry",t.TitlesHeadings="TitlesHeadings",t.Tables="Tables",t.CenterTables="CenterTables",t.RightTables="RightTables",t.Lists="Lists",t.Footnotes="Footnotes",t.CrossReferences="CrossReferences",t.SpecialText="SpecialText",t.CharacterStyling="CharacterStyling",t.Breaks="Breaks",t.SpecialFeatures="SpecialFeatures",t.PeripheralReferences="PeripheralReferences",t.PeripheralMaterials="PeripheralMaterials",t.Uncategorized="Uncategorized"})(U||(U={}));var q;(function(t){t.Paragraph="Paragraph",t.Character="Character",t.Note="Note",t.Unknown="Unknown"})(q||(q={}));const DE={id:{category:U.FileIdentification,type:q.Paragraph,description:"File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)",hasEndMarker:!1,children:{FileIdentification:["usfm","ide"],Headers:["h","h1","h2","h3","toc1","toc2","toc3"],Remarks:["rem","sts","restore"],Introduction:["imt","imt1","imt2","imt3","imt4","imte","imte1","imte2","is","is1","is2","iot","io","io1","io2","io3","io4","ior","ip","im","ipi","imi","ili","ili1","ili2","ipq","imq","ipr","ib","iq","iq1","iq2","iq3","iex","ie"],DivisionMarks:["c","cl"],TitlesHeadings:["mt","mt1","mt2","mt3","mt4"]}},usfm:{category:U.FileIdentification,type:q.Paragraph,description:"File markup version information",hasEndMarker:!1,children:void 0},ide:{category:U.FileIdentification,type:q.Paragraph,description:"File encoding information",hasEndMarker:!1,children:{Remarks:["rem","sts"]}},h:{category:U.Headers,type:q.Paragraph,description:"Running header text for a book (basic)",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h1:{category:U.Headers,type:q.Paragraph,description:"Running header text",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h2:{category:U.Headers,type:q.Paragraph,description:"Running header text, left side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},h3:{category:U.Headers,type:q.Paragraph,description:"Running header text, right side of page",hasEndMarker:!1,children:{Headers:["toc1","toc2","toc3","toca1","toca2","toca3"]}},toc1:{category:U.Headers,type:q.Paragraph,description:"Long table of contents text",hasEndMarker:!1,children:void 0},toc2:{category:U.Headers,type:q.Paragraph,description:"Short table of contents text",hasEndMarker:!1,children:void 0},toc3:{category:U.Headers,type:q.Paragraph,description:"Book Abbreviation",hasEndMarker:!1,children:void 0},toca1:{category:U.Headers,type:q.Paragraph,description:"Alternative language long table of contents text",hasEndMarker:!1,children:void 0},toca2:{category:U.Headers,type:q.Paragraph,description:"Alternative language short table of contents text",hasEndMarker:!1,children:void 0},toca3:{category:U.Headers,type:q.Paragraph,description:"Alternative language book Abbreviation",hasEndMarker:!1,children:void 0},rem:{category:U.Remarks,type:q.Paragraph,description:"Comments and remarks",hasEndMarker:!1,children:void 0},sts:{category:U.Remarks,type:q.Paragraph,description:"Status of this file",hasEndMarker:!1,children:void 0},restore:{category:U.Remarks,type:q.Paragraph,description:"Project restore information",hasEndMarker:!1,children:void 0},imt:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt1:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt2:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt3:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imt4:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title, level 4 (usually within parenthesis)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte1:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},imte2:{category:U.Introduction,type:q.Paragraph,description:"Introduction major title at introduction end, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"],CharacterStyling:["no"]}},is1:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},is2:{category:U.Introduction,type:q.Paragraph,description:"Introduction section heading, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],SpecialText:["bk"]}},iot:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline title (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},io:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},io1:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 1 (if multiple levels) (basic)",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io2:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 2",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io3:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 3",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},io4:{category:U.Introduction,type:q.Paragraph,description:"Introduction outline text, level 4",hasEndMarker:!1,children:{Introduction:["ior","iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ior:{category:U.Introduction,type:q.Character,description:"Introduction references range for outline entry; for marking references separately",hasEndMarker:!0,children:void 0},ip:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph (basic)",hasEndMarker:!1,children:{Introduction:["iqt"],Footnotes:["f","fe","fm"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},im:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, with no first line indent (may occur after poetry)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipi:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, indented, with first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imi:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph text, indented, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili1:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ili2:{category:U.Introduction,type:q.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipq:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, quote from the body text",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},imq:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, quote from the body text, with no first line indent",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},ipr:{category:U.Introduction,type:q.Paragraph,description:"Introduction prose paragraph, right aligned",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ib:{category:U.Introduction,type:q.Paragraph,description:"Introduction blank line",hasEndMarker:!1,children:{Introduction:["iqt"]}},iq:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 1 (if single level)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},iq1:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 1 (if multiple levels)",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq2:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 2",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iq3:{category:U.Introduction,type:q.Paragraph,description:"Introduction poetry text, level 3",hasEndMarker:!1,children:{Introduction:["iqt"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},iex:{category:U.Introduction,type:q.Paragraph,description:"Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)",hasEndMarker:!1,children:{Introduction:["iqt"],CharacterStyling:["no"]}},iqt:{category:U.Introduction,type:q.Character,description:"For quoted scripture text appearing in the introduction",hasEndMarker:!0,children:void 0},ie:{category:U.Introduction,type:q.Paragraph,description:"Introduction ending marker",hasEndMarker:!1,children:void 0},c:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter number",hasEndMarker:!1,children:{DivisionMarks:["ca","cp","cl","cd"],Paragraphs:["p","m","po","pr","cls","pi","pi1","pi2","pi3","pc","mi","nb"],Poetry:["q","q1","q2","q3","q4","qc","qr","qa","qd","b"],TitlesHeadings:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],Lists:["lh","li","li1","li2","li3","li4","lf","lim","lim1","lim2","lim3","lim4"],Footnotes:["f","fe"],SpecialText:["lit"],Breaks:["pb"]}},ca:{category:U.DivisionMarks,type:q.Character,description:"Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)",hasEndMarker:!0,children:void 0},cp:{category:U.DivisionMarks,type:q.Paragraph,description:"Published chapter number (chapter string that should appear in the published text)",hasEndMarker:!1,children:{Footnotes:["f"]}},cl:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",hasEndMarker:!1,children:void 0},cd:{category:U.DivisionMarks,type:q.Paragraph,description:"Chapter Description (Publishing option D, e.g. in Russian Bibles)",hasEndMarker:!1,children:{DivisionMarks:["vp"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},v:{category:U.DivisionMarks,type:q.Character,description:"A verse number",hasEndMarker:!1,children:void 0},va:{category:U.DivisionMarks,type:q.Character,description:"Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)",hasEndMarker:!0,children:void 0},vp:{category:U.DivisionMarks,type:q.Character,description:"Published verse marker (verse string that should appear in the published text)",hasEndMarker:!0,children:void 0},p:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with first line indent (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},m:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with no first line indent (may occur after poetry) (basic)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},po:{category:U.Paragraphs,type:q.Paragraph,description:"Letter opening",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pr:{category:U.Paragraphs,type:q.Paragraph,description:"Text refrain (paragraph text, right aligned)",hasEndMarker:!1,children:{Paragraphs:["pmo","pm","pmc","pmr"],Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},cls:{category:U.Paragraphs,type:q.Paragraph,description:"Letter Closing",hasEndMarker:!1,children:{SpecialText:["tl","sig","pn","png","addpn","add"]}},pmo:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text opening",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pm:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text paragraph",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmc:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text closing",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pmr:{category:U.Paragraphs,type:q.Paragraph,description:"Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi1:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi2:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 2 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pi3:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, level 3 indent, with first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},pc:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, centered (for Inscription)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},mi:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, indented, with no first line indent; often used for discourse",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},nb:{category:U.Paragraphs,type:q.Paragraph,description:"Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)",hasEndMarker:!1,children:{Poetry:["qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 1 indent (if single level)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q1:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 1 indent (if multiple levels) (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q2:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 2 indent (basic)",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q3:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 3 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},q4:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, level 4 indent",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qc:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, centered",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qr:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, Right Aligned",hasEndMarker:!1,children:{Poetry:["qs","qac","qm","qm1","qm2","qm3"],TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qs:{category:U.Poetry,type:q.Character,description:"Poetry text, Selah",hasEndMarker:!0,children:{Footnotes:["f"],CrossReferences:["x"]}},qa:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, Acrostic marker/heading",hasEndMarker:!1,children:void 0},qac:{category:U.Poetry,type:q.Character,description:"Poetry text, Acrostic markup of the first character of a line of acrostic poetry",hasEndMarker:!0,children:void 0},qm:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 1 indent (if single level)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm1:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 1 indent (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm2:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 2 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qm3:{category:U.Poetry,type:q.Paragraph,description:"Poetry text, embedded, level 3 indent",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},qd:{category:U.Poetry,type:q.Paragraph,description:"A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.",hasEndMarker:!1,children:{TitlesHeadings:["mte1"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},b:{category:U.Poetry,type:q.Paragraph,description:"Poetry text stanza break (e.g. stanza break) (basic)",hasEndMarker:!1,children:void 0},mt:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book (if single level)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt1:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book (if multiple levels) (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title usually occurring before the main title (basic)",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title occurring after the main title",hasEndMarker:!1,children:{Footnotes:["f"],CrossReferences:["x"]}},mt4:{category:U.TitlesHeadings,type:q.Paragraph,description:"A small secondary title sometimes occurring within parentheses",hasEndMarker:!1,children:void 0},mte:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if single level)",hasEndMarker:!1,children:void 0},mte1:{category:U.TitlesHeadings,type:q.Paragraph,description:"The main title of the book repeated at the end of the book, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mte2"]}},mte2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A secondary title occurring before or after the 'ending' main title",hasEndMarker:!1,children:void 0},ms:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms1:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 2",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},ms3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division heading, level 3",hasEndMarker:!1,children:{TitlesHeadings:["mr"],Footnotes:["f","fe"]}},mr:{category:U.TitlesHeadings,type:q.Paragraph,description:"A major section division references range heading (basic)",hasEndMarker:!1,children:void 0},s:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 1 (if single level) (basic)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s1:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 1 (if multiple levels)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s2:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 2 (e.g. Proverbs 22-24)",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s3:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 3 (e.g. Genesis 'The First Day')",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["no","it","bd","bdit","em","sc","sup"]}},s4:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section heading, level 4",hasEndMarker:!1,children:{TitlesHeadings:["sr","r"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sr:{category:U.TitlesHeadings,type:q.Paragraph,description:"A section division references range heading",hasEndMarker:!1,children:void 0},r:{category:U.TitlesHeadings,type:q.Paragraph,description:"Parallel reference(s) (basic)",hasEndMarker:!1,children:void 0},sp:{category:U.TitlesHeadings,type:q.Paragraph,description:"A heading, to identify the speaker (e.g. Job)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},d:{category:U.TitlesHeadings,type:q.Paragraph,description:"A Hebrew text heading, to provide description (e.g. Psalms)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},sd:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if single level)",hasEndMarker:!1,children:void 0},sd1:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 1 (if multiple levels)",hasEndMarker:!1,children:void 0},sd2:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 2",hasEndMarker:!1,children:void 0},sd3:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 3",hasEndMarker:!1,children:void 0},sd4:{category:U.TitlesHeadings,type:q.Paragraph,description:"Vertical space used to divide the text into sections, level 4",hasEndMarker:!1,children:void 0},lh:{category:U.Lists,type:q.Paragraph,description:"List header (introductory remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li1:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li2:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li3:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},li4:{category:U.Lists,type:q.Paragraph,description:"A list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lf:{category:U.Lists,type:q.Paragraph,description:"List footer (concluding remark)",hasEndMarker:!1,children:{Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 1 (if single level)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim1:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 1 (if multiple levels)",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim2:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 2",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim3:{category:U.Lists,type:q.Paragraph,description:"An embedded list item, level 3",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},lim4:{category:U.Lists,type:q.Paragraph,description:"An embedded list entry, level 4",hasEndMarker:!1,children:{Lists:["litl","lik","liv","liv1","liv2","liv3","liv4","liv5"],Footnotes:["f","fe","fm"],CrossReferences:["x","xt","rq"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},litl:{category:U.Lists,type:q.Character,description:"List entry total text",hasEndMarker:!0,children:void 0},lik:{category:U.Lists,type:q.Character,description:"Structured list entry key text",hasEndMarker:!0,children:void 0},liv:{category:U.Lists,type:q.Character,description:"Structured list entry value 1 content (if single value)",hasEndMarker:!0,children:void 0},liv1:{category:U.Lists,type:q.Character,description:"Structured list entry value 1 content (if multiple values)",hasEndMarker:!0,children:void 0},liv2:{category:U.Lists,type:q.Character,description:"Structured list entry value 2 content",hasEndMarker:!0,children:void 0},liv3:{category:U.Lists,type:q.Character,description:"Structured list entry value 3 content",hasEndMarker:!0,children:void 0},liv4:{category:U.Lists,type:q.Character,description:"Structured list entry value 4 content",hasEndMarker:!0,children:void 0},liv5:{category:U.Lists,type:q.Character,description:"Structured list entry value 5 content",hasEndMarker:!0,children:void 0},f:{category:U.Footnotes,type:q.Note,description:"A Footnote text item (basic)",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fe:{category:U.Footnotes,type:q.Note,description:"An Endnote text item",hasEndMarker:!0,children:{Footnotes:["fr","ft","fk","fq","fqa","fl","fw","fp","fv","fdc"],CrossReferences:["xt"],SpecialText:["qt","nd","tl","dc","bk","sig","pn","png","addpn","wj","k","sls","ord","add"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},fr:{category:U.Footnotes,type:q.Character,description:"The origin reference for the footnote (basic)",hasEndMarker:!0,children:void 0},ft:{category:U.Footnotes,type:q.Character,description:"Footnote text, Protocanon (basic)",hasEndMarker:!0,children:void 0},fk:{category:U.Footnotes,type:q.Character,description:"A footnote keyword (basic)",hasEndMarker:!0,children:void 0},fq:{category:U.Footnotes,type:q.Character,description:"A footnote scripture quote or alternate rendering (basic)",hasEndMarker:!0,children:void 0},fqa:{category:U.Footnotes,type:q.Character,description:"A footnote alternate rendering for a portion of scripture text",hasEndMarker:!0,children:void 0},fl:{category:U.Footnotes,type:q.Character,description:"A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",hasEndMarker:!0,children:void 0},fw:{category:U.Footnotes,type:q.Character,description:"A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.",hasEndMarker:!0,children:void 0},fp:{category:U.Footnotes,type:q.Character,description:"A Footnote additional paragraph marker",hasEndMarker:!0,children:void 0},fv:{category:U.Footnotes,type:q.Character,description:"A verse number within the footnote text",hasEndMarker:!0,children:void 0},fdc:{category:U.Footnotes,type:q.Character,description:"Footnote text, applies to Deuterocanon only",hasEndMarker:!0,children:void 0},fm:{category:U.Footnotes,type:q.Character,description:"An additional footnote marker location for a previous footnote",hasEndMarker:!0,children:void 0},x:{category:U.CrossReferences,type:q.Note,description:"A list of cross references (basic)",hasEndMarker:!0,children:{CrossReferences:["xo","xop","xt","xta","xk","xq","xot","xnt","xdc"],CharacterStyling:["it","bd","bdit","em","sc","sup"]}},xo:{category:U.CrossReferences,type:q.Character,description:"The cross reference origin reference (basic)",hasEndMarker:!0,children:void 0},xop:{category:U.CrossReferences,type:q.Character,description:"Published cross reference origin reference (origin reference that should appear in the published text)",hasEndMarker:!0,children:void 0},xt:{category:U.CrossReferences,type:q.Character,description:"The cross reference target reference(s), protocanon only (basic)",hasEndMarker:!0,children:void 0},xta:{category:U.CrossReferences,type:q.Character,description:"Cross reference target references added text",hasEndMarker:!0,children:void 0},xk:{category:U.CrossReferences,type:q.Character,description:"A cross reference keyword",hasEndMarker:!0,children:void 0},xq:{category:U.CrossReferences,type:q.Character,description:"A cross-reference quotation from the scripture text",hasEndMarker:!0,children:void 0},xot:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), Old Testament only",hasEndMarker:!0,children:void 0},xnt:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), New Testament only",hasEndMarker:!0,children:void 0},xdc:{category:U.CrossReferences,type:q.Character,description:"Cross-reference target reference(s), Deuterocanon only",hasEndMarker:!0,children:void 0},rq:{category:U.CrossReferences,type:q.Character,description:"A cross-reference indicating the source text for the preceding quotation.",hasEndMarker:!0,children:void 0},qt:{category:U.SpecialText,type:q.Character,description:"For Old Testament quoted text appearing in the New Testament (basic)",hasEndMarker:!0,children:void 0},nd:{category:U.SpecialText,type:q.Character,description:"For name of deity (basic)",hasEndMarker:!0,children:void 0},tl:{category:U.SpecialText,type:q.Character,description:"For transliterated words",hasEndMarker:!0,children:void 0},dc:{category:U.SpecialText,type:q.Character,description:"Deuterocanonical/LXX additions or insertions in the Protocanonical text",hasEndMarker:!0,children:void 0},bk:{category:U.SpecialText,type:q.Character,description:"For the quoted name of a book",hasEndMarker:!0,children:void 0},sig:{category:U.SpecialText,type:q.Character,description:"For the signature of the author of an Epistle",hasEndMarker:!0,children:void 0},pn:{category:U.SpecialText,type:q.Character,description:"For a proper name",hasEndMarker:!0,children:void 0},png:{category:U.SpecialText,type:q.Character,description:"For a geographic proper name",hasEndMarker:!0,children:void 0},addpn:{category:U.SpecialText,type:q.Character,description:"For chinese words to be dot underline & underline",hasEndMarker:!0,children:void 0},wj:{category:U.SpecialText,type:q.Character,description:"For marking the words of Jesus",hasEndMarker:!0,children:void 0},k:{category:U.SpecialText,type:q.Character,description:"For a keyword",hasEndMarker:!0,children:void 0},sls:{category:U.SpecialText,type:q.Character,description:"To represent where the original text is in a secondary language or from an alternate text source",hasEndMarker:!0,children:void 0},ord:{category:U.SpecialText,type:q.Character,description:"For the text portion of an ordinal number",hasEndMarker:!0,children:void 0},add:{category:U.SpecialText,type:q.Character,description:"For a translational addition to the text",hasEndMarker:!0,children:void 0},lit:{category:U.SpecialText,type:q.Paragraph,description:"For a comment or note inserted for liturgical use",hasEndMarker:!1,children:void 0},no:{category:U.CharacterStyling,type:q.Character,description:"A character style, use normal text",hasEndMarker:!0,children:void 0},it:{category:U.CharacterStyling,type:q.Character,description:"A character style, use italic text",hasEndMarker:!0,children:void 0},bd:{category:U.CharacterStyling,type:q.Character,description:"A character style, use bold text",hasEndMarker:!0,children:void 0},bdit:{category:U.CharacterStyling,type:q.Character,description:"A character style, use bold + italic text",hasEndMarker:!0,children:void 0},em:{category:U.CharacterStyling,type:q.Character,description:"A character style, use emphasized text style",hasEndMarker:!0,children:void 0},sc:{category:U.CharacterStyling,type:q.Character,description:"A character style, for small capitalization text",hasEndMarker:!0,children:void 0},sup:{category:U.CharacterStyling,type:q.Character,description:"A character style, for superscript text. Typically for use in critical edition footnotes.",hasEndMarker:!0,children:void 0},pb:{category:U.Breaks,type:q.Paragraph,description:"Page Break used for new reader portions and children's bibles where content is controlled by the page",hasEndMarker:!1,children:void 0}},Jr={DivisionMarks:{add:["v","c"],remove:[]},Paragraphs:{add:["p"],remove:[]},Poetry:{add:["q","q1","q2","q3","q4","b"],remove:[]},TitlesHeadings:{add:["mte","ms","ms1","ms2","ms3","s","s1","s2","s3","s4","r","sp","d","sd","sd1","sd2","sd3","sd4"],remove:[]}},ME={p:{children:Jr},q:{children:Jr},q1:{children:Jr},q2:{children:Jr},q3:{children:Jr},q4:{children:Jr},b:{children:Jr},qm:{children:{Paragraphs:{add:["p"],remove:[]}}},c:{type:q.Paragraph,children:null},v:{children:null}};function mf(t){const e=DE[t],n=ME[t];if(!e)return;if(!n)return e;let r=e.children?{...e.children}:void 0;if(n.children===null&&(r=void 0),n.children){r=r||{};for(const[o,i]of Object.entries(n.children)){const s=o;if(i===null)Reflect.deleteProperty(r,s);else{let a=r[s]||[];i.remove&&(a=a.filter(c=>!i.remove.includes(c))),i.add&&(a=[...new Set([...a,...i.add])]),a.length>0?r[s]=a:Reflect.deleteProperty(r,s)}}Object.keys(r).length===0&&(r=void 0)}return{...e,...n,children:r}}function bf(t,e,n){const r={type:zi,version:Gi,content:t},o=e.serializeEditorState(r,n);return qu(o.root.children[0])?o.root.children[0].children[0]:o.root.children[0]}function qc(t,e){if(!t||!g.$isTextNode(t))return[void 0,void 0];const n=t.getTextContent();if(e>=0&&e<n.length)return[t,e];let r=t.getNextSibling();if(!r){const i=t.getParent();Dt(i)&&(r=i.getNextSibling())}if(!r||!Dt(r)&&!g.$isTextNode(r))return[void 0,void 0];const o=e-n.length;return r&&g.$isTextNode(r)?qc(r,o):qc(r.getFirstChild()??void 0,o)}function vf(t){const e=zx(t.jsonPath);let n=g.$getRoot();for(const r of e){if(!n||!g.$isElementNode(n))return[void 0,void 0];n=n.getChildAtIndex(r)??void 0}return qc(n,t.offset)}function xf(t){return g.$isElementNode(t)?"element":"text"}function Xu(t){const{start:e}=t;let{end:n}=t;n===void 0&&(n=e);const[r,o]=vf(e),[i,s]=vf(n);if(!r||!i||o===void 0||s===void 0)return;const a=g.$createRangeSelection();return a.anchor=g.$createPoint(r.getKey(),o,xf(r)),a.focus=g.$createPoint(i.getKey(),s,xf(i)),a}function yf(t,e){const n=[];let r=t;for(;r!=null&&r.getParent();){const o=r.getParent();if(o){const i=o==null?void 0:o.getChildren().indexOf(r);i>=0&&n.unshift(i)}r=o}return{jsonPath:Gx(n),offset:e}}function Sm(){const t=g.$getSelection();if(!t||!g.$isRangeSelection(t))return;const e=t.isBackward()?t.focus.getNode():t.anchor.getNode(),n=t.isBackward()?t.focus.offset:t.anchor.offset,r=yf(e,n);if(t.isCollapsed())return{start:r};const o=t.isBackward()?t.anchor.getNode():t.focus.getNode(),i=t.isBackward()?t.anchor.offset:t.focus.offset,s=yf(o,i);return{start:r,end:s}}const Tm="v",Am=1;class zt extends g.DecoratorNode{constructor(e="",n=!1,r,o,i,s,a){super(a),de(this,"__marker"),de(this,"__number"),de(this,"__showMarker"),de(this,"__sid"),de(this,"__altnumber"),de(this,"__pubnumber"),de(this,"__unknownAttributes"),this.__marker=Tm,this.__number=e,this.__showMarker=n,this.__sid=r,this.__altnumber=o,this.__pubnumber=i,this.__unknownAttributes=s}static getType(){return"immutable-verse"}static clone(e){const{__number:n,__showMarker:r,__sid:o,__altnumber:i,__pubnumber:s,__unknownAttributes:a,__key:c}=e;return new zt(n,r,o,i,s,a,c)}static importDOM(){return{span:e=>OE(e)?{conversion:RE,priority:1}:null}}static importJSON(e){return Qu().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setMarker(e.marker).setNumber(e.number).setShowMarker(e.showMarker).setSid(e.sid).setAltnumber(e.altnumber).setPubnumber(e.pubnumber).setUnknownAttributes(e.unknownAttributes)}setMarker(e){if(this.__marker===e)return this;const n=this.getWritable();return n.__marker=e,n}getMarker(){return this.getLatest().__marker}setNumber(e){if(this.__number===e)return this;const n=this.getWritable();return n.__number=e,n}getNumber(){return this.getLatest().__number}setShowMarker(e=!1){if(this.__showMarker===e)return this;const n=this.getWritable();return n.__showMarker=e,n}getShowMarker(){return this.getLatest().__showMarker}setSid(e){if(this.__sid===e)return this;const n=this.getWritable();return n.__sid=e,n}getSid(){return this.getLatest().__sid}setAltnumber(e){if(this.__altnumber===e)return this;const n=this.getWritable();return n.__altnumber=e,n}getAltnumber(){return this.getLatest().__altnumber}setPubnumber(e){if(this.__pubnumber===e)return this;const n=this.getWritable();return n.__pubnumber=e,n}getPubnumber(){return this.getLatest().__pubnumber}setUnknownAttributes(e){const n=this.getWritable();return n.__unknownAttributes=e,n}getUnknownAttributes(){return this.getLatest().__unknownAttributes}createDOM(){const e=document.createElement("span");return e.setAttribute("data-marker",this.__marker),e.classList.add(Lc,`usfm_${this.__marker}`),this.__showMarker&&e.classList.add("marker"),e.setAttribute("data-number",this.__number),e}updateDOM(){return!1}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.setAttribute("data-marker",this.getMarker()),n.classList.add(Lc,`usfm_${this.getMarker()}`),n.setAttribute("data-number",this.getNumber())),{element:n}}decorate(){return l.jsx("span",{children:this.getShowMarker()?_s(this.getMarker(),this.getNumber()):Ic+this.getNumber()+Ic})}exportJSON(){return{type:this.getType(),marker:this.getMarker(),number:this.getNumber(),showMarker:this.getShowMarker(),sid:this.getSid(),altnumber:this.getAltnumber(),pubnumber:this.getPubnumber(),unknownAttributes:this.getUnknownAttributes(),version:Am}}isKeyboardSelectable(){return!1}}function RE(t){const e=t.getAttribute("data-number")??"0";return{node:Qu(e)}}function Qu(t,e,n,r,o,i){return g.$applyNodeReplacement(new zt(t,e,n,r,o,i))}function OE(t){return((t==null?void 0:t.getAttribute("data-marker"))??void 0)===Tm}function bi(t){return t instanceof zt}function jE(t){return(t==null?void 0:t.type)===zt.getType()}function vn(t){return Hu(t)||bi(t)}function IE(t){return rE(t)||jE(t)}function LE(t,e,n,r,o,i,s){if(!_t.isValidMarker(t))throw new Error(`$insertNote: Invalid note marker '${t}'`);const a=n?Xu(n):g.$getSelection();if(!g.$isRangeSelection(a))return;const c=$E(a,t,r,s);if(c===void 0)return;const u=Mm(t,e,c,o,i);return Dm(u,a,o),u}function Dm(t,e,n){const r=(n==null?void 0:n.noteMode)==="collapsed";if(t.setIsCollapsed(r),e.isCollapsed()||pE(e),e.insertNodes([t]),!r){const o=t.getChildren().reverse().find(He);o==null||o.selectEnd()}}function $E(t,e,n,r){const o=[],{chapterNum:i,verseNum:s}=n??{};switch(e){case"f":case"fe":case"ef":case"efe":if(i!==void 0&&s!==void 0&&o.push(Yn("fr").append(g.$createTextNode(`${i}:${s}`))),!t.isCollapsed()){const a=t.getTextContent().trim();if(a.length>0){const c=Yn("fq");c.append(g.$createTextNode(a)),o.push(c)}}o.push(Yn("ft").append(g.$createTextNode("-")));break;case"x":case"ex":i!==void 0&&s!==void 0&&o.push(Yn("xo").append(g.$createTextNode(`${i}:${s}`))),o.push(Yn("xt").append(g.$createTextNode("-")));break;default:r==null||r.warn(`$createNoteChildren: Unsupported note marker '${e}'`);return}return o}function Mm(t,e,n,r,o,i){const s=(r==null?void 0:r.noteMode)!=="expanded",a=Vu(t,e,s);i&&g.$setState(a,fo,()=>i);let c,u;(r==null?void 0:r.markerMode)==="editable"?(c=ri(t),u=ri(t,"closing")):(r==null?void 0:r.markerMode)==="visible"&&(c=oi("marker",gr(t)+Ve),u=oi("marker",ni(t)+Ve));let d;if(c&&a.append(c),(r==null?void 0:r.markerMode)==="editable")e===""?a.append(...n):(d=g.$createTextNode(Ku(a.__caller)),a.append(d,...n));else{const p=()=>g.$createTextNode(Ve),f=n.flatMap(FE(p));if(e==="")a.append(...f);else{const h=Yu(n);let b=()=>{};o!=null&&o.noteCallerOnClick&&(b=o.noteCallerOnClick),d=nd(a.__caller,h,b),a.append(d,p(),...f)}}return u&&a.append(u),a}function _f(t){var e;if(typeof t=="string"){const o=g.$getNodeByKey(t);return Te(o)?o:void 0}const n=gs();if(n.length<=0)return;const r=(e=n.filter(o=>Te(o.node))[t])==null?void 0:e.node;if(Te(r))return r}function PE(t,e){const n=(e==null?void 0:e.noteMode)==="collapsed";if(t.setIsCollapsed(n),n){const r=t.getPreviousSibling();if(bi(r)||!r){const o=t.getParent();if(o){const i=t.getIndexWithinParent();o.select(i,i)}}else r.selectEnd()}else{const r=t.getChildren().reverse().find(He);r==null||r.selectEnd()}}function FE(t){return e=>Sa(e)?[e]:[e,t()]}function BE(t){return t.find(e=>Lt(e))}function qE(t,e){return g.$isElementNode(t)?t.getChildren().find(n=>vn(n)&&Wu(e,n.getNumber())):void 0}function UE(t,e){return e===0?BE(t):t.map(n=>qE(n,e)).filter(n=>n)[0]}function Cf(t){return!t||!g.$isElementNode(t)?void 0:t.getChildren().findLast(e=>vn(e))}function Rm(t){var e,n;if(!t||bn(t))return;if(vn(t))return t;let r=Dt(t.getParent())?(e=t.getParent())==null?void 0:e.getPreviousSibling():t.getPreviousSibling();for(;r&&!vn(r)&&!bn(r);)r=r.getPreviousSibling();if(r&&vn(r))return r;let o=(n=t.getTopLevelElement())==null?void 0:n.getPreviousSibling(),i=Cf(o),s=i;for(;o&&!i&&!bn(o);)i=s,o=o.getPreviousSibling(),s=Cf(o);if(!(!i&&bn(o)))return i}function VE(t){return aE(t)||bi(t)}function Zu(t){if(g.$isTextNode(t)){const e=t.getTextContent();!e.endsWith(" ")&&!e.endsWith(Ve)&&t.setTextContent(`${e} `)}}function Om(t){if(g.$isTextNode(t)){const e=t.getTextContent();e.startsWith(" ")&&t.setTextContent(e.trimStart())}}function ed(t,e){return t.getEditorState().read(()=>!g.$getNodeByKey(e))}const HE=["style"],zE=["style","code"],Aa=["style","cid"],GE=["style","number","sid","altnumber","pubnumber"],KE=["style","number","sid","altnumber","pubnumber"],YE=["style","sid","eid"],WE=["style","caller","category","contents"],JE=["chapter","immutable-chapter","verse","immutable-verse","ms","note","unmatched"],os=`
`;function XE(t,e){const n=g.$getNodeByKey(t);if(!In(n))return;const r=jm(n);return r===void 0?void 0:[{retain:r},...e,{delete:1}]}function jm(t){if(!t)return;const e=gs();let n=0;const r=[];let o,i;const s=t.getKey();let a;for(const c of e){const u=c.node;for(let d=r.length-1;d>=0;d--)if(is(r[d],c)){const p=r[d];if(r.splice(d,1),n+=1,a&&p.getKey()===a.getKey())return n-1}if(o&&is(o,c)&&(o=void 0,i=void 0),o){if(u.getKey()===s)return i;continue}if(u.getKey()===s){if(g.$isTextNode(u)||In(u))return n;yn(u)&&(a=u)}if(yn(u)&&(r.includes(u)||r.push(u)),Te(u)){o=u,i=n,n+=1;continue}n+=Im(u)}if(a)return n}function Ef(t,e){if(t.length<2||!ek(t[0])||!ZE(t[1]))return;const n=t[0].retain;return e.read(()=>{const r=QE(n);return r==null?void 0:r.getKey()})}function QE(t){const e=gs();let n=0;const r=[];let o,i;for(const s of e){const a=s.node;for(let u=r.length-1;u>=0;u--)if(is(r[u],s)){const d=r[u];if(r.splice(u,1),n===t)return d;n+=1}if(o&&is(o,s)&&(o=void 0,i=void 0),o){if(i===t)return o;continue}if(yn(a)&&(r.includes(a)||r.push(a)),Te(a)){if(o=a,i=n,n===t)return a;n+=1;continue}const c=Im(a);if(g.$isTextNode(a)&&c>0&&t>=n&&t<n+c||In(a)&&n===t)return a;n+=c}for(const s of r){if(n===t)return s;n+=1}}function is(t,e){return t?e?!uE(e.node,t.getKey()):!0:!1}function In(t){return bn(t)||vn(t)||sl(t)||Te(t)||Nm(t)}function yn(t){return An(t)||er(t)}function Di(t,e){return e.insert!=null&&typeof e.insert=="object"&&t in e.insert}function ZE(t){if(t.insert==null||typeof t.insert!="object")return!1;const e=Object.keys(t.insert)[0];return t.insert!=null&&typeof t.insert=="object"&&e in t.insert&&JE.includes(e)}function ek(t){return t.retain!=null&&typeof t.retain=="number"}function Im(t){return g.$isTextNode(t)?t.getTextContentSize():In(t)?1:0}function Uc(t,e){const n={insert:t.__text},r=g.$getState(t,fo);if(r&&(n.attributes={segment:r}),e&&e.length>0){let o=e.map(i=>{const s={style:i.__marker},a=g.$getState(i,po);a&&(s.cid=a);const c=i.getUnknownAttributes();return c&&Object.keys(c).length>0&&Object.assign(s,c),s});o.length===1&&(o=o[0]),n.attributes={...n.attributes,char:o}}return n}function kf(t){const e=new Li;return t.isEmpty()||t.read(()=>{const n=g.$getRoot();if(!n||n.isEmpty())return;const r=n.getChildren();if(r.length===1&&pr(r[0])&&(!r[0].getChildren()||r[0].getChildrenSize()===0))return;const o=tk();for(const i of o)e.push(i)}),e}function td(t,e){const n=[],r=gs(t),o=[],i=[],s={children:[],contentsOps:[]};for(let a=0;a<r.length;a++){const c=r[a].node;n.push(...Nf(c,a,r,o,i,s))}for(const a of o)n.push(...Nf(a,r.length,r,o,i,s));return n}function tk(){return td()}function Nf(t,e,n,r,o,i){if(!t)return[];const s=[];return nk(t,s,r),rk(t,s,o,i),ok(t,e,n,o),bn(t)&&s.push(ak(t)),vn(t)&&s.push(ck(t)),sl(t)&&s.push(uk(t)),Nm(t)&&s.push(dk(t)),ik(t,s,i),s}function nk(t,e,n){if(!t.isInline()){const r=n.pop();er(r)?e.push(sk(r)):Lt(r)?e.push(lk(r)):pr(r)&&e.push({insert:os})}yn(t)&&(n.includes(t)||n.push(t))}function rk(t,e,n,r){var o;if(!g.$isTextNode(t))return;const i=t.getParent();if(Te(i)&&i.getFirstChild()===t)return;const s=Uc(t,n);if(r.children.includes(t)){const a=t.getTextContent();if(!a||a===Ve||a.startsWith(Lu))return;(o=r.contentsOps)==null||o.push(s)}else e.push(s)}function ok(t,e,n,r){He(t)&&!r.includes(t)&&r.push(t);const o=n[e+1];for(const i of r.toReversed())is(i,o)&&r.pop()}function ik(t,e,n){var r,o;if(!Te(t))return;gs(t).forEach(s=>n.children.push(s.node));const i=pk(t);n.contentsOps=(o=(r=i.insert.note)==null?void 0:r.contents)==null?void 0:o.ops,e.push(i)}function sk(t){const e={style:ts,code:t.__code};return{insert:os,attributes:{book:e}}}function ak(t){const e={style:ka,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{chapter:e}}}function lk(t){const e={style:t.__marker};return{insert:os,attributes:{para:e}}}function ck(t){const e={style:Na,number:t.__number};return t.__sid&&(e.sid=t.__sid),t.__altnumber&&(e.altnumber=t.__altnumber),t.__pubnumber&&(e.pubnumber=t.__pubnumber),{insert:{verse:e}}}function uk(t){const e={style:t.__marker};return t.__sid&&(e.sid=t.__sid),t.__eid&&(e.eid=t.__eid),{insert:{milestone:e}}}function dk(t){return{insert:{unmatched:{marker:t.__marker}}}}function pk(t){const e={style:t.__marker,caller:t.__caller};t.__category&&(e.category=t.__category),t.getChildrenSize()>1&&(e.contents={ops:[]});const n={insert:{note:e}},r=g.$getState(t,fo);return r&&(n.attributes={segment:r}),n}const Lm=1;class Mn extends g.DecoratorNode{constructor(e=ho,n="",r,o){super(o),de(this,"__caller"),de(this,"__previewText"),de(this,"__onClick"),this.__caller=e,this.__previewText=n,this.__onClick=r??(()=>{})}static getType(){return"immutable-note-caller"}static clone(e){const{__caller:n,__previewText:r,__onClick:o,__key:i}=e;return new Mn(n,r,o,i)}static importDOM(){return{span:e=>hk(e)?{conversion:fk,priority:1}:null}}static importJSON(e){return nd().updateFromJSON(e)}updateFromJSON(e){return super.updateFromJSON(e).setCaller(e.caller).setPreviewText(e.previewText).setOnClick(e.onClick)}setCaller(e){if(this.__caller===e)return this;const n=this.getWritable();return n.__caller=e,n}getCaller(){return this.getLatest().__caller}setPreviewText(e){if(this.__previewText===e)return this;const n=this.getWritable();return n.__previewText=e,n}getPreviewText(){return this.getLatest().__previewText}setOnClick(e){if(this.__onClick===e)return this;const n=this.getWritable();return n.__onClick=e,n}getOnClick(){return this.getLatest().__onClick}createDOM(){const e=document.createElement("span");return e.classList.add(this.__type),e.setAttribute("data-caller",this.__caller),e.setAttribute("data-preview-text",this.__previewText),e}updateDOM(e){return e.__caller!==this.__caller}exportDOM(e){const{element:n}=super.exportDOM(e);return n&&g.isHTMLElement(n)&&(n.classList.add(this.getType()),n.setAttribute("data-caller",this.getCaller()),n.setAttribute("data-preview-text",this.getPreviewText())),{element:n}}decorate(e){const n=this.getParent();if(!n)return null;const r=n.getKey(),o=n.getIsCollapsed(),i=this.__key,s=c=>{var u;return(u=this.__onClick)==null?void 0:u.call(this,c,r,o,()=>wk(e,r),d=>gk(e,r,i,d),()=>mk(e,r))},a=`${this.__caller}_${this.__previewText}}`.replace(/\s+/g,"").substring(0,25);return l.jsx("button",{onClick:s,title:this.__previewText,"data-caller-id":a,children:this.__caller===ho&&o?"":this.__caller})}exportJSON(){return{type:this.getType(),caller:this.getCaller(),previewText:this.getPreviewText(),onClick:this.getOnClick(),version:Lm}}isKeyboardSelectable(){return!1}}function fk(t){const e=t.getAttribute("data-caller")??"",n=t.getAttribute("data-preview-text")??"";return{node:nd(e,n)}}function nd(t,e,n){return g.$applyNodeReplacement(new Mn(t,e,n))}function hk(t){return t?t.classList.contains(Mn.getType()):!1}function Hr(t){return t instanceof Mn}function wk(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Te(n))throw new Error(`getNoteCaller: Note node not found: ${e}`);return n.getCaller()})}function gk(t,e,n,r){t.update(()=>{const o=g.$getNodeByKey(e);if(!Te(o))throw new Error(`setNoteCaller: Note node not found: ${e}`);o.setCaller(r);const i=g.$getNodeByKey(n);if(!Hr(i))throw new Error(`setNoteCaller: Caller node not found: ${n}`);i.setCaller(r)})}function mk(t,e){return t.read(()=>{const n=g.$getNodeByKey(e);if(!Te(n))throw new Error(`getNoteOps: Note node not found: ${e}`);return td(n)})}const bk=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],vk=[Mn,zt,...AE],xk=w.forwardRef((t,e)=>{const{coords:n,children:r,style:o,...i}=t,s=n!==void 0;return l.jsx("div",{ref:e,className:"floating-box","aria-hidden":!s,style:{...o,position:"absolute",zIndex:1e3,top:n==null?void 0:n.y,left:n==null?void 0:n.x,visibility:s?"visible":"hidden",opacity:s?1:0},...i,children:r})});function yk(){const[t,e]=w.useState(void 0),[n,r]=w.useState(),o=w.useRef(null),i=w.useCallback((a,c)=>{o.current&&o.current();const u=a.commonAncestorContainer.nodeType===a.commonAncestorContainer.TEXT_NODE?a:a.commonAncestorContainer;o.current=g_(u,c,()=>{v_(u,c,{placement:"bottom-start",middleware:[m_(),b_()]}).then(d=>{r(d.placement),e(p=>(p==null?void 0:p.x)===d.x&&(p==null?void 0:p.y)===d.y?p:{x:d.x,y:d.y})}).catch(()=>{e(void 0)})})},[]),s=w.useCallback(()=>{o.current&&(e(void 0),o.current(),o.current=null)},[]);return w.useEffect(()=>s,[s]),{coords:t,placement:n,updatePosition:i,cleanup:s}}function _k({isOpen:t,floatingBoxRef:e}){const{coords:n,updatePosition:r,cleanup:o,placement:i}=yk();return w.useEffect(()=>{var s;if(!t||!e.current){o();return}const a=(s=window.getSelection())==null?void 0:s.getRangeAt(0);if(!a){o();return}return r(a,e.current),o},[o,t,e,r]),{coords:n,placement:i}}const Ck=document.body,Ek=w.memo(xk);function kk({isOpen:t=!1,children:e}){const n=w.useRef(null),{coords:r,placement:o}=_k({isOpen:t,floatingBoxRef:n}),i=w.useMemo(()=>r?typeof e=="function"?e:()=>e:()=>null,[e,r]);return Xt.createPortal(l.jsx(Ek,{ref:n,coords:r,style:r?void 0:{display:"none"},children:i({isOpen:t,placement:o})}),Ck)}const $m=w.createContext(void 0);function rd(){const t=w.useContext($m);if(!t)throw new Error("useMenuContext must be used within a MenuProvider");return t}function Nk(t,e){const[n,r]=w.useState(0),[o,i]=w.useState(-1),s=w.useMemo(()=>t??[],[t]),a={menuItems:s,activeIndex:n,selectedIndex:o,onSelectOption:e??(()=>{})},c=w.useCallback(()=>{r(p=>{const f=s.length;return f?(p-1+f)%f:0})},[s.length]),u=w.useCallback(()=>{r(p=>{const f=s.length;return f?(p+1)%f:0})},[s.length]),d=w.useCallback(()=>{const p=s.length;if(n>=0&&n<p){const f=s[n];e==null||e(f),i(n)}},[n,s,e]);return{state:a,moveUp:c,moveDown:u,select:d,setActiveIndex:r,setSelectedIndex:i}}function Sk({children:t,menuItems:e,onSelectOption:n,...r}){const o=Nk(e,n);return l.jsx($m.Provider,{value:o,children:l.jsx("div",{...r,children:t})})}const Pm=w.forwardRef(({index:t,children:e,onMouseEnter:n,onClick:r,...o},i)=>{const{state:{activeIndex:s},setActiveIndex:a,setSelectedIndex:c,select:u}=rd(),d=w.useCallback(f=>{u(),c(-1),r==null||r(f)},[r,u,c]),p=w.useCallback(f=>{a(t),n==null||n(f)},[t,a,n]);return l.jsx("button",{ref:i,role:"menuitem",...o,onClick:d,onMouseEnter:p,"aria-selected":t!==void 0&&s===t?"true":void 0,tabIndex:-1,children:e})});function Tk({children:t,autoIndex:e=!0,...n}){const r=w.useRef(null),{state:{activeIndex:o,menuItems:i}}=rd(),s=w.useMemo(()=>i?typeof t=="function"?t:()=>t:()=>null,[t,i]),a=w.useMemo(()=>{const c=s(i);return e?w.Children.map(c,(u,d)=>w.isValidElement(u)&&u.type===Pm&&u.props.index===void 0?w.cloneElement(u,{index:d}):u):c},[s,e,i]);return w.useEffect(()=>{if(r.current){const c=r.current,u=c.children[o];if(u){const d=c.getBoundingClientRect(),p=u.getBoundingClientRect();p.bottom>d.bottom?c.scrollTop+=p.bottom-d.bottom:p.top<d.top&&(c.scrollTop-=d.top-p.top)}}},[o]),l.jsx("div",{ref:r,role:"menu",...n,children:a})}const Zl={Root:Sk,Options:Tk,Option:Pm},Ak=(t,e,n)=>aa(t,n).toLowerCase().includes(e.toLowerCase()),Sf=t=>Object.keys(t).find(e=>typeof t[e]=="string")||"",aa=(t,e)=>{const n=t[e];return typeof n=="string"?n:String(n)};function Dk(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:i,sortingOptions:s}=t,{caseSensitive:a=!1,priorityOrder:c=["exact","startsWith","contains"]}=s||{},u=a?e:e.toLowerCase();let d,p;o?(p=o,d=n.length>0?Sf(n[0]):""):(d=r||(n.length>0?Sf(n[0]):""),p=(b,x)=>Ak(b,x,d));const f=i||d,h=new Map;return n.filter(b=>{try{return p(b,e)}catch(x){return console.warn("Error filtering item:",b,x),!1}}).sort((b,x)=>{const E=D=>(h.has(D)||h.set(D,aa(D,f).toLowerCase()),h.get(D)??""),C=a?aa(b,f):E(b),_=a?aa(x,f):E(x);for(const D of c)switch(D){case"exact":if(C===u&&_!==u)return-1;if(_===u&&C!==u)return 1;break;case"startsWith":if(C.startsWith(u)&&!_.startsWith(u))return-1;if(_.startsWith(u)&&!C.startsWith(u))return 1;break;case"contains":{const $=C.indexOf(u),H=_.indexOf(u);if($!==-1&&H===-1)return-1;if(H!==-1&&$===-1)return 1;if($!==-1&&H!==-1)return $-H;break}}return C.localeCompare(_)})}function Mk(t){const{query:e,items:n,filterBy:r,filter:o,sortBy:i,sortingOptions:s}=t;return w.useMemo(()=>Dk({query:e,items:n,filterBy:r,filter:o,sortBy:i,sortingOptions:s}),[e,n,r,o,i,s])}function Rk(){const{moveUp:t,moveDown:e,select:n}=rd();return w.useMemo(()=>({moveUp:t,moveDown:e,select:n}),[t,e,n])}const Ok=()=>{const t=Rk(),[e]=Ce();w.useEffect(()=>{const n=r=>{const o={ArrowDown:()=>t==null?void 0:t.moveDown(),ArrowUp:()=>t==null?void 0:t.moveUp(),Enter:()=>t==null?void 0:t.select(),Tab:()=>t==null?void 0:t.select()}[r.key];return o?(o(),r.preventDefault(),r.stopPropagation(),!0):!1};return e.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[e,t])};function jk(){return Ok(),null}function Ik(t){const{options:e,onSelectOption:n,onClose:r,inverse:o,query:i,menuOpenKey:s}=t,[a]=Ce(),c=i!==void 0,[u,d]=w.useState(""),p=c?i??"":u,f=Mk({query:p,items:e,filterBy:"name"}),h=b=>{r==null||r(),n?n(b):b.action(a)};return w.useEffect(()=>a.registerCommand(g.KEY_DOWN_COMMAND,b=>{if(c)return!1;const x={Escape:()=>r==null?void 0:r(),Backspace:()=>{p.length===0?r==null||r():d(E=>E.slice(0,-1))}}[b.key];return x?(b.stopPropagation(),b.preventDefault(),x(),!0):b.key.length===1?(b.stopPropagation(),b.preventDefault(),b.key!==s&&d(E=>E+b.key),!0):!1},g.COMMAND_PRIORITY_HIGH),[a,c,p,s,r]),l.jsxs(Zl.Root,{className:`autocomplete-menu-container ${o?"inverse":""}`,menuItems:f,onSelectOption:b=>h(b),children:[!c&&l.jsx("input",{value:p,type:"text",disabled:!0}),l.jsx(jk,{}),l.jsx(Zl.Options,{className:"autocomplete-menu-options",autoIndex:!1,children:b=>b.map((x,E)=>l.jsxs(Zl.Option,{index:E,children:[l.jsx("span",{className:"label",children:x.label??x.name}),l.jsx("span",{className:"description",children:x.description})]},x.name))})]})}function Lk({trigger:t,items:e}){const[n]=Ce(),[r,o]=w.useState(!1),i=w.useCallback(s=>{s.key==="Escape"&&r?(o(!1),n.focus()):s.key===t&&!r&&(s.preventDefault(),o(!0))},[n,t,r]);return w.useEffect(()=>n.registerRootListener(s=>{if(s)return s.addEventListener("keydown",i),()=>{s.removeEventListener("keydown",i)}}),[n,i]),w.useEffect(()=>n.registerUpdateListener(({prevEditorState:s,editorState:a})=>{const c=s.read(()=>{const u=g.$getSelection();if(g.$isRangeSelection(u))return u});a.read(()=>{const u=g.$getSelection();!g.$isRangeSelection(u)||c!=null&&c.is(u)||o(!1)})}),[n]),e&&l.jsx(kk,{isOpen:r,children:({placement:s})=>l.jsx(Ik,{options:e,onClose:()=>o(!1),inverse:s==="top-start",menuOpenKey:t})})}function $k({scriptureReference:t,contextMarker:e,getMarkerAction:n}){return{markersMenuItems:w.useMemo(()=>{if(!e||!t)return;const r=mf(e);if(r!=null&&r.children)return Object.values(r.children).flatMap(o=>o.map(i=>{const s=mf(i),{action:a}=n(i,s);return{name:i,label:i,description:(s==null?void 0:s.description)??"",action:c=>{a({editor:c,reference:t})}}}))},[e,n,t])}}function la(t,e){return`${t}:${e}`}function Pk(t,e){w.useEffect(()=>{if(!t.hasNodes([Tt]))throw new Error("AnnotationPlugin: TypedMarkNode not registered on editor!");const n=new Map;return Mt(Ew(t,Tt,r=>rs(r.getTypedIDs()),(r,o)=>{for(const[i,s]of Object.entries(r.getTypedIDs()))s.forEach(a=>{o.addID(i,a)})}),t.registerMutationListener(Tt,r=>{t.getEditorState().read(()=>{for(const[o,i]of r){const s=g.$getNodeByKey(o);let a={};i==="destroyed"?a=n.get(o)??{}:Dt(s)&&(a=s.getTypedIDs());for(const[c,u]of Object.entries(a))if(!Tt.isReservedType(c))for(const d of u){let p=e.get(la(c,d));a[c]=u,n.set(o,a),i==="destroyed"?p!==void 0&&(p.delete(o),p.size===0&&e.delete(la(c,d))):(p===void 0&&(p=new Set,e.set(la(c,d),p)),p.has(o)||p.add(o))}}})},{skipInitialization:!0}))},[t,e])}const Fk=w.forwardRef(function({logger:t},e){const[n]=Ce(),r=w.useMemo(()=>new Map,[]);return Pk(n,r),w.useImperativeHandle(e,()=>({addAnnotation(o,i,s){if(Tt.isReservedType(i))throw new Error(`addAnnotation: Can't directly add this reserved annotation type '${i}'. Use the appropriate plugin instead.`);n.update(()=>{const a=Xu(o);if(a===void 0){t==null||t.error("Failed to find start or end node of the annotation.");return}Cm(a,i,s)},{tag:Pc})},removeAnnotation(o,i){if(Tt.isReservedType(o))throw new Error(`removeAnnotation: Can't directly remove this reserved annotation type '${o}'. Use the appropriate plugin instead.`);const s=r.get(la(o,i));s!==void 0&&setTimeout(()=>{n.update(()=>{for(const a of s){const c=g.$getNodeByKey(a);Dt(c)&&(c.deleteID(o,i),c.hasNoIDsForEveryType()&&_m(c))}},{tag:Pc})})}})),null});function Bk({ignoreHistoryMergeTagChange:t=!0,ignoreSelectionChange:e=!1,onChange:n}){const[r]=Ce();return w.useLayoutEffect(()=>{if(n)return r.registerUpdateListener(o=>{const{editorState:i,dirtyElements:s,dirtyLeaves:a,prevEditorState:c,tags:u}=o;if(e&&s.size===0&&a.size===0||t&&u.has(g.HISTORY_MERGE_TAG)||c.isEmpty())return;const d=qk(r,o);d.length!==0&&n(i,r,u,d)})},[r,t,e,n]),null}function qk(t,{dirtyLeaves:e,prevEditorState:n}){let r=new Li;return t.getEditorState().read(()=>{const o=e.values().next().value??"";if(e.size===1&&g.$isTextNode(g.$getNodeByKey(o))){const i=g.$getNodeByKey(o),s=jm(i);if(g.$isTextNode(i)&&s!==void 0){const a=n.read(()=>{const d=g.$getNodeByKey(o);return new Li([g.$isTextNode(d)?Uc(d):{insert:""}])}),c=new Li([Uc(i)]),u=new Li(s>0?[{retain:s}]:[]);r=r.concat(u).concat(a.diff(c))}}else{const i=kf(n),s=kf(t.getEditorState());r=i.diff(s)}}),r.ops}function Uk(t,e,n,r){let o=0;t.forEach(i=>{if("retain"in i)o+=Vk(i,o,e,r);else if("delete"in i){if(typeof i.delete!="number"||i.delete<=0){r==null||r.error(`Invalid delete operation: ${JSON.stringify(i)}`);return}r==null||r.debug(`Delete: ${i.delete}`),zk(o,i.delete,r)}else"insert"in i?typeof i.insert=="string"?(r==null||r.debug(`Insert: '${i.insert}'`),o+=Gk(o,i.insert,i.attributes,e,r)):typeof i.insert=="object"&&i.insert!==null?(r==null||r.debug(`Insert embed: ${JSON.stringify(i.insert)}`),Yk(o,i,e,n,r)?o+=1:r==null||r.error(`Failed to process insert embed operation: ${JSON.stringify(i.insert)} at index ${o}. Document may be inconsistent.`)):r==null||r.error(`Insert of unknown type: ${JSON.stringify(i.insert)}`):r==null||r.error(`Unknown operation: ${JSON.stringify(i)}`)})}function Vk(t,e,n,r){return typeof t.retain!="number"||t.retain<0?(r==null||r.error(`Invalid retain operation: ${JSON.stringify(t)}`),0):(r==null||r.debug(`Retain: ${t.retain}`),t.attributes&&(r==null||r.debug(`Retain attributes: ${JSON.stringify(t.attributes)}`),Hk(e,t.retain,t.attributes,n,r)),t.retain)}function Hk(t,e,n,r,o){o==null||o.debug(`Applying attributes for range [${t}, ${t+e-1}] with attributes: ${JSON.stringify(n)}`);let i=e,s=0,a=-1;const c=g.$getRoot();function u(d){if(i<=0)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t<s+p&&s<t+e){const f=Math.max(0,t-s),h=p-f,b=Math.min(i,h);if(b>0){let x=d;const E=f>0,C=b<p-f;if(E&&C){const[,_]=d.splitText(f);[x]=_.splitText(b)}else E?[,x]=d.splitText(f):C&&([x]=d.splitText(b));if(mo(n)){const _=x.getParent();if(He(_)){const D=n.char;let $;Array.isArray(D)?a>=0&&a<=D.length-1&&($=D[a]):a===0&&($=D);const H=$?go($,_):!1;if(H&&Array.isArray(D)&&D.length>1){const O=g.$createTextNode("");x.replace(O);const V=typeof n.segment=="string"?n.segment:void 0,B=Es(D.slice(1),r,x,V);let F=O;for(const Y of B)F.insertAfter(Y),F=Y;O.remove(),mn(n,x)}else if(H)mn(n,x);else{x.remove();const O=Tf(x,n,r,o);if(O&&O.length>0){let V=_;for(const B of O)V.insertAfter(B),V=B}}}else{const D=g.$createTextNode("");x.replace(D);const $=Tf(x,n,r,o);if($&&$.length>0){let H=D;for(const O of $)H.insertAfter(O),H=O;D.remove()}else D.replace(x)}}else mn(n,x);i-=b}}s+=p}else if(In(d))t<=s&&s<t+e&&i>0&&(Af(d,n),i-=1),s+=1;else if(He(d)){a+=1;let p=!1;if(t<=s&&s<t+e&&i>0)if(mo(n)){const f=n.char;let h;if(Array.isArray(f)?a>=0&&a<=f.length-1&&(h=f[a]):a===0&&(h=f),h){d.setMarker(h.style),typeof h.cid=="string"&&g.$setState(d,po,()=>h.cid);const b=Ct(h,Aa);b&&Object.keys(b).length>0?d.setUnknownAttributes({...d.getUnknownAttributes()??{},...b}):d.setUnknownAttributes(void 0)}}else(n.char===!1||n.char===null||nN(n.char))&&(p=!0);if(i>0){const f=d.getChildren();for(const h of f){if(i<=0)break;if(u(h)&&i<=0)return p&&tp(d),!0}}p&&tp(d),a-=1}else if(yn(d)){const p=d.getChildren();for(const h of p){if(i<=0)break;if(u(h)&&i<=0)return!0}const f=1;if(t<=s&&s<t+i&&i>0){if(!pr(d))Af(d,n);else if(od(n)){const h=Bm(n.para);h&&d.replace(h,!0)}i-=f}s+=f}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(i<=0)break;if(u(f)&&i<=0)return!0}}return i<=0}u(c),i>0&&(o==null||o.warn(`$applyAttributes: Not all characters in the retain operation (length ${e}) could be processed. Remaining: ${i}. targetIndex: ${t}, final currentIndex: ${s}`))}function Tf(t,e,n,r){var o;const i=typeof e.segment=="string"?e.segment:void 0,s=Es(e.char,n,t,i),a=s.find(He);if(!a){r==null||r.error(`Failed to create CharNode for text transformation. Style: ${Array.isArray(e.char)?e.char[0].style:(o=e.char)==null?void 0:o.style}. Falling back to standard text attributes.`),mn(e,t);return}const c={};qm.forEach(p=>{t.hasFormat(p)&&(c[p]="true")});const u={};Object.entries(e).forEach(([p,f])=>{p==="segment"||p==="char"||(typeof f=="string"?u[p]=f:f===!0?u[p]="true":f===!1&&(u[p]="false"))});const d={...a.getUnknownAttributes()??{},...c,...u};return Object.keys(d).length>0&&a.setUnknownAttributes(d),mn(e,t),s}function Af(t,e){for(const n of Object.keys(e)){const r=e[n];if(n==="char"&&He(t)&&mo(e)){const o=r;if(t.setMarker(o.style),typeof o.cid=="string"){const s=o.cid;g.$setState(t,po,()=>s)}const i=Ct(o,Aa);i&&Object.keys(i).length>0&&t.setUnknownAttributes({...t.getUnknownAttributes()??{},...i});continue}typeof r=="string"&&(bn(t)||vn(t)||sl(t)||Te(t)||xs(t)?t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r}):(er(t)||Lt(t)||He(t))&&(n==="style"&&!er(t)?t.setMarker(r):n==="code"&&er(t)?t.setCode(r):t.setUnknownAttributes({...t.getUnknownAttributes()??{},[n]:r})),n==="segment"&&g.$setState(t,fo,()=>r))}}function zk(t,e,n){if(e<=0)return;const r=g.$getRoot();let o=0,i=e;function s(a){if(i<=0)return!0;if(g.$isTextNode(a)){let c=a.getTextContentSize();if(t<o+c&&o<t+i){const u=Math.max(0,t-o),d=c-u,p=Math.min(i,d);p>0&&(a.spliceText(u,p,""),a.getTextContentSize()===0&&a.remove(),n==null||n.debug(`Deleted ${p} length from TextNode (key: ${a.getKey()}) at nodeOffset ${u}. Original targetIndex: ${t}, current currentIndex: ${o}.`),i-=p,c-=p)}o+=c}else if(In(a))t<=o&&o<t+i?(a.remove(),n==null||n.debug(`Deleted embed node (key: ${a.getKey()}) at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${i}.`),i-=1):o+=1;else if(yn(a)){const c=a.getChildren().slice(),u=a.getChildren();for(const d of u){if(i<=0)break;if(s(d)&&i<=0)return!0}if(t<=o&&o<t+i&&yn(a)){i-=1;const d=a.getChildren().length;if(c.length>0&&d===0){const p=a.getParent();((p==null?void 0:p.getChildren())??[]).length>1?(a.remove(),n==null||n.debug(`Removed entire ParaNode that had all its content deleted at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${i}.`)):(a.replace(Dn(),!0),n==null||n.debug(`Replaced last ParaNode with ImpliedParaNode at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${i}.`))}else if(i>0){const p=a.getNextSibling();if(p&&An(p)){let f=o+1;const h=p.getChildren();for(const x of h){if(i<=0)break;const E=o;if(o=f,s(x)){o=E;break}g.$isTextNode(x)?f+=x.getTextContentSize():In(x)&&(f+=1),o=E}const b=p.getChildren();for(const x of b)x.remove(),a.append(x);p.remove(),n==null||n.debug(`Merged next paragraph into current one after deleting symbolic close at currentIndex: ${o}. Original targetIndex: ${t}, remainingToDelete: ${i}.`)}else a.replace(Dn(),!0)}else Lt(a)?a.replace(Dn(),!0):a.remove()}o+=1}else if(g.$isElementNode(a)){const c=a.getChildren();for(const u of c){if(i<=0)break;if(s(u)&&i<=0)return!0}}return i<=0}s(r),i>0&&(n==null||n.warn(`Delete operation could not remove all requested characters. Remaining to delete: ${i}. Original targetIndex: ${t}, OT length: ${e}. Final currentIndex: ${o}`))}function Gk(t,e,n,r,o){if(e===os)return Df(t,n,o);if(e.endsWith(os)&&!od(n)){const i=e.slice(0,-1);let s=0;if(i.length>0){if(mo(n))throw new Error("Text + LF should not have char attributes");s+=Da(t,i,n,o)}return s+=Df(t+s,n,o),s}else return mo(n)?Kk(t,e,n,r,o):Da(t,e,n,o)}function Kk(t,e,n,r,o){o==null||o.debug(`Attempting to insert CharNode with text "${e}" and attributes ${JSON.stringify(n.char)} at index ${t}`);const i=g.$createTextNode(e);mn(n,i);let s;{let h=function(E){if(g.$isTextNode(E)){const C=E.getTextContentSize();if(t>=x&&t<x+C){const _=E.getParent();return He(_)&&(s=_),!0}x+=C}else if(In(E))x+=1;else if(He(E)){const C=E.getChildren();for(const _ of C)if(h(_))return!0}else if(g.$isElementNode(E)){const C=E.getChildren();for(const _ of C)if(h(_))return!0;yn(E)&&(x+=1)}return!1};const b=g.$getRoot();let x=0;h(b)}let a=n.char;if(Array.isArray(a)){if(s){const h=a[0];h&&go(h,s)?(a=a.slice(1),a.length===1&&(a=a[0])):s=void 0}}else s&&(go(a,s)||(s=void 0));const c=typeof n.segment=="string"?n.segment:void 0,u=Es(a,r,i,c,s?[s]:void 0);if(u.length===0)return e.length;const d=u.find(He);if(!d)return o==null||o.error(`CharNode style is missing for text "${e}". Attributes: ${JSON.stringify(n.char)}. Falling back to rich text insertion.`),Da(t,e,void 0,o);const p={};for(const[h,b]of Object.entries(n))h!=="char"&&h!=="segment"&&typeof b=="string"&&(p[h]=b);Object.keys(p).length>0&&d.setUnknownAttributes(p);let f=!0;for(const h of u)if(!Fm(t,h,o)){f=!1;break}return f?e.length:(o==null||o.error(`Failed to insert CharNode with text "${e}" at index ${t}. Falling back to rich text.`),Da(t,e,void 0,o))}function Da(t,e,n,r){if(e.length<=0)return r==null||r.debug("Attempted to insert empty string. No action taken."),0;const o=g.$getRoot();let i=0,s=!1;function a(c){if(s)return!0;if(g.$isTextNode(c)){const u=c.getTextContentSize();if(t>=i&&t<=i+u){const d=t-i,p=g.$createTextNode(e);if(mn(n,p),d===0)c.insertBefore(p);else if(d===u){const f=c.getParent();He(f)&&!mo(n)?f.insertAfter(p):c.insertAfter(p)}else{const[,f]=c.splitText(d);f.insertBefore(p)}return r==null||r.debug(`Inserted text "${e}" in/around TextNode (key: ${c.getKey()}) at nodeOffset ${d}. Original targetIndex: ${t}, currentIndex at node start: ${i}.`),s=!0,!0}i+=u}else if(In(c))i+=1;else if(He(c)){if(!s&&t===i){const d=g.$createTextNode(e);mn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of CharNode ${c.getType()} (key: ${c.getKey()}).`),s=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(s)break}if(!s&&t===i){const d=g.$createTextNode(e);return mn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of CharNode ${c.getType()} (key: ${c.getKey()}).`),s=!0,!0}}else if(yn(c)){if(!s&&t===i){const d=g.$createTextNode(e);mn(n,d);const p=c.getFirstChild();return p?p.insertBefore(d):c.append(d),r==null||r.debug(`Inserted text "${e}" at beginning of container ${c.getType()} (key: ${c.getKey()}).`),s=!0,!0}const u=c.getChildren();for(const d of u){if(a(d))return!0;if(s)break}if(!s&&t===i){const d=g.$createTextNode(e);return mn(n,d),c.append(d),r==null||r.debug(`Appended text "${e}" to end of container ${c.getType()} (key: ${c.getKey()}).`),s=!0,!0}i+=1}else if(g.$isElementNode(c)){const u=c.getChildren();for(const d of u){if(a(d))return!0;if(s)break}}return s}if(a(o),!s&&t===i){r==null||r.debug(`Insertion point matches end of document (targetIndex: ${t}, final currentIndex: ${i}). Appending text to new ParaNode.`);const c=g.$createTextNode(e);mn(n,c);const u=Dn().append(c);o.append(u),s=!0}return s?e.length:(r==null||r.warn(`$insertRichText: Could not find insertion point for text "${e}" at targetIndex ${t}. Final currentIndex: ${i}. Text not inserted.`),0)}function Fm(t,e,n){const r=g.$getRoot();let o=0,i=!1;function s(a){if(i)return!0;if(a===r&&t===0&&!r.getFirstChild())return e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into empty root, wrapped in ImpliedParaNode. targetIndex: ${t}`),r.append(Dn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} directly into empty root. targetIndex: ${t}`),r.append(e)),i=!0,!0;if(!g.$isElementNode(a))return!1;const c=a.getChildren();for(const u of c){if(t===o&&!i){if(a===r&&e.isInline())if(An(u)){n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into existing ${u.getType()} at beginning. targetIndex: ${t}`);const d=u.getFirstChild();d?d.insertBefore(e):u.append(e)}else n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting inline node ${e.getType()} into root before ${u.getType()}, wrapping in ImpliedParaNode. targetIndex: ${t}`),u.insertBefore(Dn().append(e));else u.insertBefore(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) before child ${u.getType()} (key: ${u.getKey()}) in ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, currentIndex: ${o}`);return i=!0,!0}if(g.$isTextNode(u)){const d=u.getTextContentSize();if(!i&&t>o&&t<o+d){const p=t-o,[f]=u.splitText(p);return f.insertAfter(e),n==null||n.debug(`$insertNodeAtCharacterOffset: Inserted node ${e.getType()} (key: ${e.getKey()}) by splitting TextNode (key: ${u.getKey()}) at offset ${p}. targetIndex: ${t}, currentIndex at node start: ${o}`),i=!0,!0}o+=d}else if(In(u))o+=1;else if(He(u)){if(s(u))return!0}else if(yn(u)){const d=u;if(s(d))return!0;const p=o;if(pr(d)&&yn(e)&&t===p&&!i)return n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode (key: ${d.getKey()}) with block node '${e.getType()}' (key: ${e.getKey()}) at OT index ${t}.`),u.replace(e,!0),o=p+1,i=!0,!0;o+=1}else if(g.$isElementNode(u)&&s(u))return!0;if(i)return!0}return g.$isElementNode(a)&&!i&&(t===o||a===r&&t>o)?a===r?(e.isInline()?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending inline node ${e.getType()} to root. Wrapping in new ImpliedParaNode. targetIndex: ${t}, current document OT length: ${o}.`),r.append(Dn().append(e))):(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending block node ${e.getType()} to root. targetIndex: ${t}, current document OT length: ${o}.`),r.append(e)),i=!0,!0):An(a)?pr(a)&&Lt(e)&&t===o?(n==null||n.debug(`$insertNodeAtCharacterOffset: Replacing ImpliedParaNode container (key: ${a.getKey()}) with ParaNode ${e.getType()} (key: ${e.getKey()}) via append logic. targetIndex: ${t}`),a.replace(e,!0),i=!0,!0):e.isInline()||!An(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to existing container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.append(e),i=!0,!0):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after container ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, container end OT index: ${o}.`),a.insertAfter(e),i=!0,!0):(He(a)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting node ${e.getType()} after CharNode (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)):e.isInline()||!An(e)?(n==null||n.debug(`$insertNodeAtCharacterOffset: Appending node ${e.getType()} to generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.append(e)):(n==null||n.debug(`$insertNodeAtCharacterOffset: Inserting block node ${e.getType()} after generic element ${a.getType()} (key: ${a.getKey()}). targetIndex: ${t}, element end OT index: ${o}.`),a.insertAfter(e)),i=!0,!0):i}return s(r),i||n==null||n.warn(`$insertNodeAtCharacterOffset: Could not find insertion point for node ${e.getType()} (key: ${e.getKey()}) at targetIndex ${t}. Final currentIndex: ${o}. Node not inserted.`),i}function Yk(t,e,n,r,o){let i;return Di("chapter",e)?i=Wk(e.insert.chapter,n):Di("verse",e)?i=Jk(e.insert.verse,n):Di("ms",e)?i=Xk(e.insert.ms):Di("unmatched",e)?i=Qk(e.insert.unmatched):Di("note",e)&&(i=Zk(e,n,r,o)),i?Fm(t,i,o):(o==null||o.error(`$insertEmbedAtCurrentIndex: Cannot create LexicalNode for embed object: ${JSON.stringify(e.insert)}`),!1)}function Df(t,e,n){let r;od(e)?r=Bm(e.para):tN(e)&&(r=eN(e.book)),r??(r=Dn());const o=r,i=Lt(o),s=pr(o);let a=0,c=!1;function u(d){if(c)return!0;if(g.$isTextNode(d)){const p=d.getTextContentSize();if(t>=a&&t<=a+p){const f=d.getParent();if(Lt(f)&&(i||s)){n==null||n.debug(`Splitting ParaNode (marker: ${f.getMarker()}) with LF attributes at targetIndex ${t}`);const h=t-a,[b]=h>0?d.splitText(h):[void 0];let x=b==null?void 0:b.getPreviousSibling();for(;x;){const E=x;x=x.getPreviousSibling();const C=o.getFirstChild();C?C.insertBefore(E):o.append(E)}return b&&o.append(b),f.insertBefore(o),c=!0,!0}}a+=p}else if(In(d))a+=1;else if(yn(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}if(t===a){if(pr(d)&&o)return n==null||n.debug(`Replacing ImpliedParaNode (key: ${d.getKey()}) with ParaNode at targetIndex ${t}`),d.replace(o,!0),c=!0,!0;if(Lt(d)&&o){const f=d;return n==null||n.debug(`Creating new block node with LF attributes after existing ParaNode (marker: ${f.getMarker()}) at targetIndex ${t}`),f.insertAfter(o),c=!0,!0}}if(a+=1,t===a&&Lt(d)&&o)return n==null||n.debug(`Creating new block node after existing ParaNode (marker: ${d.getMarker()}) at targetIndex ${t}`),d.insertAfter(o),c=!0,!0}else if(g.$isElementNode(d)){const p=d.getChildren();for(const f of p){if(u(f))return!0;if(c)break}}return c}return u(g.$getRoot()),c||n==null||n.warn(`Could not find location to handle newline with para attributes at targetIndex ${t}. Final currentIndex: ${a}.`),1}function Wk(t,e){if(!t)return;const{number:n,sid:r,altnumber:o,pubnumber:i}=t;if(!n)return;const s=Ct(t,GE);let a;if(e.markerMode==="editable")a=om(n,r,o,i,s);else{const c=e.markerMode==="visible";a=Bu(n,c,r,o,i,s)}return a}function Jk(t,e){if(!t)return;const{style:n,number:r,sid:o,altnumber:i,pubnumber:s}=t;if(!r)return;const a=Ct(t,KE);let c;if(e.markerMode==="editable"){if(!n)return;const u=_s(n,r);c=mm(r,u,o,i,s,a)}else{const u=e.markerMode==="visible";c=Qu(r,u,o,i,s,a)}return c}function Xk(t){if(!t)return;const{style:e,sid:n,eid:r}=t;if(!e)return;const o=Ct(t,YE);return fm(e,n,r,o)}function Qk(t){if(!t)return;const{marker:e}=t;if(e)return Ju(e)}function Zk(t,e,n,r){var o;const i=t.insert;if(!i.note)return;const{style:s,caller:a,category:c,contents:u}=i.note;if(!s||a==null)return;a===""&&(r==null||r.warn("Note has empty caller. Only use for note editing."));const d=Ct(i.note,WE),p=(o=t.attributes)==null?void 0:o.segment;let f;p&&typeof p=="string"&&(f=p);const h=[];for(const b of(u==null?void 0:u.ops)??[])if(typeof b.insert=="string")if(mo(b.attributes)){const x=Es(b.attributes.char,e,g.$createTextNode(b.insert),void 0,h);h.push(...x)}else h.push(g.$createTextNode(b.insert));return Mm(s,a,h,e,n,f).setCategory(c).setUnknownAttributes(d)}function eN(t){const{style:e,code:n}=t;if(!e||e!==ts||!n||!xn.isValidBookCode(n))return;const r=Ct(t,zE);return tm(n,r)}function Bm(t){const{style:e}=t;if(!e)return;const n=Ct(t,HE);return ns(e,n)}function Es(t,e,n,r,o){if(Array.isArray(t)){if(t.length===0)throw new Error("Empty charAttr array");const i=t[0],s=o==null?void 0:o[o.length-1];if(He(s)&&go(i,s))return t.length>1?Es(t.slice(1),e,n).forEach(d=>s.append(d)):n&&s.append(n),[];const a=t.reduceRight((d,p,f)=>{const h=Yn(p.style,Ct(p,Aa));if(typeof p.cid=="string"&&g.$setState(h,po,()=>p.cid),r&&f===t.length-1&&g.$setState(h,fo,()=>r),d)if(He(d)){const b=d.getMarker(),x=[];ec(b,x,e),x.forEach(C=>h.append(C)),h.append(d);const E=[];tc(b,E,e),E.forEach(C=>h.append(C))}else h.append(d);return h},n),c=[],u=t[0];return ec(u.style,c,e),c.push(a),tc(u.style,c,e),c}else{const i=o==null?void 0:o[o.length-1];if(He(i)&&go(t,i))return n&&i.append(n),[];const s=[];ec(t.style,s,e);const a=Yn(t.style,Ct(t,Aa));return typeof t.cid=="string"&&g.$setState(a,po,()=>t.cid),r&&g.$setState(a,fo,()=>r),n&&a.append(n),s.push(a),tc(t.style,s,e),s}}function ec(t,e,n){(n==null?void 0:n.markerMode)==="editable"?e.push(ri(t)):(n==null?void 0:n.markerMode)==="visible"&&e.push(oi("marker",gr(t)))}function tc(t,e,n,r=!1){et.isValidFootnoteMarker(t)||et.isValidCrossReferenceMarker(t)||((n==null?void 0:n.markerMode)==="editable"?r?e.push(ri("","selfClosing")):e.push(ri(t,"closing")):(n==null?void 0:n.markerMode)==="visible"&&e.push(oi("marker",ni(r?"":t))))}function tN(t){return!!t&&!!t.book&&typeof t.book=="object"&&t.book!==null&&"style"in t.book&&typeof t.book.style=="string"&&"code"in t.book&&typeof t.book.code=="string"}function od(t){return!!t&&!!t.para&&typeof t.para=="object"&&t.para!==null&&"style"in t.para&&typeof t.para.style=="string"}function mo(t){return!!t&&!!t.char&&typeof t.char=="object"&&t.char!==null&&(!Array.isArray(t.char)&&"style"in t.char&&typeof t.char.style=="string"||Array.isArray(t.char)&&t.char.length>0&&"style"in t.char[0]&&typeof t.char[0].style=="string")}function nN(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&Object.keys(t).length===0}function mn(t,e){if(t)for(const n of Object.keys(t)){if(n==="segment"&&typeof t[n]=="string"){const r=t[n];g.$setState(e,fo,()=>r);continue}if(rN(n)){const r=!!t[n],o=n,i=e.hasFormat(o);(r&&!i||!r&&i)&&e.toggleFormat(o)}}}const qm=["bold","underline","strikethrough","italic","highlight","code","subscript","superscript","lowercase","uppercase","capitalize"];function rN(t){return qm.includes(t)}function oN({viewOptions:t}){const[e]=Ce();return iN(e,t),null}function iN(t,e){w.useEffect(()=>{if(!t.hasNodes([wr,zt,_t]))throw new Error("ArrowNavigationPlugin: ImmutableChapterNode, ImmutableVerseNode or NoteNode not registered on editor!");const n=r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return!1;const o=g.$getSelection();if(!g.$isRangeSelection(o)||!o.isCollapsed())return!1;const i=t.getRootElement();if(!i)return!1;const s=i.dir||"ltr";let a=!1;return sN(s,r.key)?a=lN(o):aN(s,r.key)&&(a=cN(o,e)),a&&r.preventDefault(),a};return t.registerCommand(g.KEY_DOWN_COMMAND,n,g.COMMAND_PRIORITY_HIGH)},[t,e])}function sN(t,e){return t==="ltr"&&e==="ArrowRight"||t==="rtl"&&e==="ArrowLeft"}function aN(t,e){return t==="ltr"&&e==="ArrowLeft"||t==="rtl"&&e==="ArrowRight"}function lN(t){var e,n,r;const o=t.anchor.getNode(),i=lE(t);if(Te(i)&&!Cs(i.getFirstChild())){if(An(o)){if(t.anchor.offset===o.getChildrenSize())return!1}else if(t.anchor.offset!==o.getTextContentSize())return!1;if(i.getIsCollapsed()){if(i.is((e=i.getParent())==null?void 0:e.getLastChild()))return(r=(n=i.getParent())==null?void 0:n.getNextSibling())==null||r.selectStart(),!0}else return Sa(i.getFirstChild())?i.select(2,2):i.select(1,1),!0}if(An(o)&&Te(i)&&i.getIsCollapsed()){const a=i.getNextSibling();return a?a.selectStart():i.selectEnd(),!0}const s=i==null?void 0:i.getParent();if(Sa(i)&&Te(s)&&i.is(s==null?void 0:s.getLastChild())){const a=s.getNextSibling();return a?a.selectStart():s.selectEnd(),!0}return!1}function cN(t,e){const n=cE(t);if(ys(n)&&!n.getPreviousSibling())return!0;if(t.anchor.offset!==0)return!1;const r=t.anchor.getNode();if(er(r.getParent()))return!0;if(Te(n)&&n.getIsCollapsed()){const i=n.getPreviousSibling();if(!bi(i))return!1;const s=n.getParent();if(!s)return!1;const a=n.getIndexWithinParent();return s.select(a,a),!0}if(An(n)&&(e==null?void 0:e.noteMode)==="collapsed"){const i=n.getLastChild();if(!i)return!1;const s=Ki(i,a=>Te(a));if(Te(s)&&s.getIsCollapsed()){const a=s.getParent();if(!a)return!1;const c=s.getIndexWithinParent();return a.select(c,c),!0}}const o=bm(r);if(!o||o.getIsCollapsed())return!1;if(Hr(n)){const i=o.getParent();if(!i)return!1;const s=o.getIndexWithinParent();return i.select(s,s),!0}return!1}function uN(){const[t]=Ce();return dN(t),null}function dN(t){w.useEffect(()=>{if(!t.hasNodes([et]))throw new Error("CharNodePlugin: CharNode not registered on editor!");return t.registerNodeTransform(et,pN)},[t])}function pN(t){if(!He(t))return;if(t.isEmpty()){t.remove();return}const e=t.getMarker(),n=g.$getState(t,po),r=t.getUnknownAttributes(),o=t.getNextSibling();He(o)&&go({style:e,cid:n},o)&&lr(r,o.getUnknownAttributes())&&(t.append(...o.getChildren()),o.remove());const i=t.getPreviousSibling();He(i)&&go({style:e,cid:n},i)&&lr(r,i.getUnknownAttributes())&&(i.append(...t.getChildren()),t.remove())}function Um(t){return t.replaceAll("	"," ")}const id=t=>{navigator.clipboard.read().then(async e=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const n=new DataTransfer,r=e[0];for(const i of r.types){const s=await(await r.getType(i)).text();n.setData(i,Um(s))}const o=new ClipboardEvent("paste",{clipboardData:n});t.dispatchCommand(g.PASTE_COMMAND,o)})},sd=t=>{navigator.clipboard.read().then(async()=>{if((await navigator.permissions.query({name:"clipboard-read"})).state==="denied"){alert("Not allowed to paste from clipboard.");return}const e=new DataTransfer,n=await navigator.clipboard.readText();e.setData("text/plain",Um(n));const r=new ClipboardEvent("paste",{clipboardData:e});t.dispatchCommand(g.PASTE_COMMAND,r)})};function fN(){const[t]=Ce();return w.useEffect(()=>{const e=n=>{const{key:r,shiftKey:o,metaKey:i,ctrlKey:s,altKey:a}=n;!(gc?i:s)||a||(!o&&r.toLowerCase()==="c"?(n.preventDefault(),t.dispatchCommand(g.COPY_COMMAND,null)):!o&&r.toLowerCase()==="x"?(n.preventDefault(),t.dispatchCommand(g.CUT_COMMAND,null)):r.toLowerCase()==="v"&&(n.preventDefault(),o?sd(t):id(t)))};return t.registerRootListener((n,r)=>{r!==null&&r.removeEventListener("keydown",e),n!==null&&n.addEventListener("keydown",e)})},[t]),null}function hN({logger:t}){const[e]=Ce();return w.useEffect(()=>Mt(e.registerCommand(g.KEY_DOWN_COMMAND,n=>n.key!=="\\"&&n.key!=="/"?!1:(n.preventDefault(),!0),g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.PASTE_COMMAND,n=>{var r;const o=(r=n.clipboardData)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: paste containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL),e.registerCommand(g.DROP_COMMAND,n=>{var r;const o=(r=n.dataTransfer)==null?void 0:r.getData("text/plain");return!o||!o.includes("\\")&&!o.includes("/")?!1:(t==null||t.info("CommandMenuPlugin: drag containing backslash or forward slash ignored."),n.preventDefault(),!0)},g.COMMAND_PRIORITY_NORMAL)),[e,t]),null}function wN({index:t,isSelected:e,onClick:n,onMouseEnter:r,option:o}){let i="item";return e&&(i+=" selected"),o.isDisabled&&(i+=" disabled"),l.jsx("li",{tabIndex:-1,className:i,ref:o.setRefElement,role:"option","aria-selected":e,"aria-disabled":o.isDisabled,id:"typeahead-item-"+t,onMouseEnter:r,onClick:o.isDisabled?void 0:n,children:l.jsx("span",{className:"text",children:o.title})},o.key)}function gN({options:t,selectedItemIndex:e,onOptionClick:n,onOptionMouseEnter:r}){return l.jsx("div",{className:"typeahead-popover",children:l.jsx("ul",{children:t.map((o,i)=>l.jsx(wN,{index:i,isSelected:e===i,onClick:()=>n(o,i),onMouseEnter:()=>r(i),option:o},o.key))})})}class Zs extends y_{constructor(e,n){super(e),de(this,"title"),de(this,"onSelect"),de(this,"isDisabled"),this.title=e,this.onSelect=n.onSelect.bind(this),this.isDisabled=n.isDisabled||!1}}function mN(t,e="editor-input"){return t?t.classList.contains(e):!1}function bN(){const[t]=Ce(),[e,n]=w.useState(()=>!t.isEditable()),r=w.useRef(void 0),o=w.useRef(void 0),i=w.useRef(void 0),s=w.useMemo(()=>[new Zs("Cut",{onSelect:()=>{t.dispatchCommand(g.CUT_COMMAND,null)},isDisabled:e}),new Zs("Copy",{onSelect:()=>{t.dispatchCommand(g.COPY_COMMAND,null)}}),new Zs("Paste",{onSelect:()=>{id(t)},isDisabled:e}),new Zs("Paste as Plain Text",{onSelect:()=>{sd(t)},isDisabled:e})],[t,e]),a=w.useCallback((c,u,d)=>{t.update(()=>{c==null||c.onSelect(u),d()})},[t]);return w.useEffect(()=>{var c;o.current=((c=t.getRootElement())==null?void 0:c.className)??""},[t]),w.useEffect(()=>{const c=()=>{var u;(u=i.current)==null||u.call(i)};return window.addEventListener("scroll",c,!0),()=>{window.removeEventListener("scroll",c,!0)}},[]),w.useEffect(()=>t.registerEditableListener(c=>{n(!c)}),[t]),l.jsx(E_,{options:s,onSelectOption:a,onWillOpen:c=>{r.current=c.target},menuRenderFn:(c,{selectedIndex:u,options:d,selectOptionAndCleanUp:p,setHighlightedIndex:f},{setMenuRef:h})=>(i.current=()=>p(void 0),c.current&&!mN(r.current,o.current)&&!um(r.current)?j0.createPortal(l.jsx("div",{className:"typeahead-popover auto-embed-menu",style:{marginLeft:c.current.style.width,userSelect:"none",width:200},ref:h,children:l.jsx(gN,{options:s,selectedItemIndex:u,onOptionClick:(b,x)=>{b.isDisabled||(f(x),p(b))},onOptionMouseEnter:b=>{f(b)}})}),c.current):null)})}function vN({isEditable:t}){const[e]=Ce();return w.useLayoutEffect(()=>{e.setEditable(t)},[e,t]),null}function xN({scripture:t,nodeOptions:e,editorAdaptor:n,viewOptions:r,logger:o}){const[i]=Ce();return w.useEffect(()=>{var s;(s=n.initialize)==null||s.call(n,e,o)},[n,o,e]),w.useEffect(()=>{var s;(s=n.reset)==null||s.call(n);const a=n.serializeEditorState(t,r);if(a==null){o==null||o.warn("LoadStatePlugin: serializedEditorState was null or undefined. Skipping editor update.");return}try{const c=i.parseEditorState(a);queueMicrotask(()=>{i.update(()=>{i.setEditorState(c),i.dispatchCommand(g.CLEAR_HISTORY_COMMAND,void 0)},{tag:Pu})})}catch{o==null||o.error("LoadStatePlugin: error parsing or setting editor state.")}},[i,n,o,t,r]),null}function yN({expandedNoteKeyRef:t,nodeOptions:e,viewOptions:n,logger:r}){const[o]=Ce();return _N(e,r),CN(o,t,n,r),null}function _N(t,e){const n=w.useRef(void 0),r=t.noteCallers;w.useEffect(()=>{let o=r;(!o||o.length<=0)&&(o=bk),n.current!==o&&(n.current=o,MN("note-callers",o,e))},[e,r])}function CN(t,e,n,r){w.useEffect(()=>{if(!t.hasNodes([et,_t,Mn]))throw new Error("NoteNodePlugin: CharNode, NoteNode or ImmutableNoteCallerNode not registered on editor!");const o=i=>t.update(()=>DN(i));return Mt(t.registerNodeTransform(_t,i=>EN(i,n)),t.registerNodeTransform(et,kN),t.registerNodeTransform(g.TextNode,NN),t.registerNodeTransform(Mn,SN),t.registerMutationListener(Mn,(i,{prevEditorState:s})=>TN(i,s)),t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>AN(t,e,n,r),g.COMMAND_PRIORITY_LOW),t.registerRootListener((i,s)=>{s!==null&&s.removeEventListener("dblclick",o),i!==null&&i.addEventListener("dblclick",o)}))},[t,e,r,n])}function EN(t,e){const n=t.getChildren();if(!n.some(r=>Hr(r))&&(e==null?void 0:e.markerMode)!=="editable"&&t.getCaller()!==""&&t.remove(),n.length>0){const r=n[0];g.$isTextNode(r)&&!Cs(r)&&t.insertBefore(r)}}function kN(t){const e=t.getParentOrThrow(),n=e.getChildren(),r=n.find(s=>Hr(s));if(!He(t)||!Te(e)||!r)return;const o=Yu(n);r.getPreviewText()!==o&&r.setPreviewText(o);const i=t.getNextSibling();g.$isTextNode(i)?i.getTextContent()!==Ve&&i.setTextContent(Ve):t.insertAfter(g.$createTextNode(Ve))}function NN(t){const e=bm(t),n=e==null?void 0:e.getChildren(),r=n==null?void 0:n.find(i=>Hr(i));if(!g.$isTextNode(t)||!Te(e)||!r||!n)return;const o=Yu(n);r.getPreviewText()!==o&&r.setPreviewText(o),!(Cs(t)||!Te(t.getParent()))&&t.getTextContent()!==Ve&&(t.setTextContent(Ve),t.selectEnd())}function SN(t){if(!Hr(t))return;const e=t.getNextSibling();!g.$isTextNode(e)||Cs(e)?t.insertAfter(g.$createTextNode(Ve)):e.getTextContent()!==Ve&&e.setTextContent(Ve)}function TN(t,e){for(const[n,r]of t){if(r!=="destroyed")continue;const o=e.read(()=>{const s=g.$getNodeByKey(n),a=s==null?void 0:s.getParent();return Hr(s)&&Te(a)&&a.getCaller()===ho}),i=document.querySelector(".editor-input");!o||!i||(i.classList.add("reset-counters"),i.offsetHeight,i.classList.remove("reset-counters"))}}function AN(t,e,n,r){var o;if((n==null?void 0:n.noteMode)!=="expandInline")return!1;const i=g.$getSelection();if(!g.$isRangeSelection(i)||!i.isCollapsed())return!1;const s=i.anchor,a=s.getNode();if(e.current){const c=Ki(a,u=>Te(u));if(c)e.current!==c.getKey()&&(e.current=c.getKey());else{const u=g.$getNodeByKey(e.current);u&&!u.getIsCollapsed()&&(r==null||r.debug("Cursor moved away from NoteNode, collapsing it"),Mi(t,e.current,r)),e.current=void 0}}if(s.offset===0){const c=a.getPreviousSibling();if(Te(c)){r==null||r.debug("Cursor is just after a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,Mi(t,u,r)}}if(s.offset===a.getTextContentSize()){const c=a.getNextSibling();if(Te(c)){r==null||r.debug("Cursor is just before a NoteNode");const u=c.getKey();c.getIsCollapsed()?e.current=u:e.current=void 0,Mi(t,u,r)}else if(!c){const u=Ki(a,d=>Te(d));if(u&&u.getIsCollapsed()&&An(u.getParent())&&u.is((o=u.getParent())==null?void 0:o.getLastChild())){r==null||r.debug("Cursor is at end of note at end of para");const d=u.getKey();e.current=d,Mi(t,d,r)}}}if(An(a)){const c=a.getChildAtIndex(s.offset),u=c==null?void 0:c.getPreviousSibling();if(bi(u)&&Te(c)){r==null||r.debug("Cursor is between verse and NoteNode");const d=c.getKey();c.getIsCollapsed()?e.current=d:e.current=void 0,Mi(t,d,r)}}return!1}function Mi(t,e,n){const r=g.$getNodeByKey(e);try{r==null||r.toggleIsCollapsed()}catch(o){if(o instanceof Error&&o.message.includes("read only"))n==null||n.warn("Fallback triggered after stabilization - edge case"),setTimeout(()=>{t.update(()=>{r==null||r.toggleIsCollapsed()})},0);else throw o}}function DN(t){const e=g.$getSelection();if(!g.$isRangeSelection(e))return;const n=e.anchor,r=e.focus,o=n.getNode(),i=r.getNode();if(Te(o)&&g.$isTextNode(i)){t.preventDefault();const s=g.$createRangeSelection();s.anchor.set(i.getKey(),0,"text"),s.focus.set(i.getKey(),r.offset,"text"),g.$setSelection(s)}}function MN(t,e,n){for(const r of document.styleSheets)try{const o=r.cssRules||r.rules;for(const i of o)if(RN(i,t)){const s=e.map(a=>`"${a}"`).join(" ");i.symbols=s;return}}catch{continue}n==null||n.warn(`Editor: counter style "${t}" not found.`)}function RN(t,e){return typeof t=="object"&&t!==null&&"name"in t&&t.name===e&&"symbols"in t&&typeof t.symbols=="string"}function ON({onChange:t}){const[e]=Ce();return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>{const n=e.read(()=>Sm());return t==null||t(n),!1},g.COMMAND_PRIORITY_LOW),[e,t]),null}function jN(){const[t]=Ce();return IN(t),null}function IN(t){w.useEffect(()=>{if(!t.hasNodes([Zt]))throw new Error("ParaNodePlugin: ParaNode not registered on editor!");return t.registerNodeTransform(Zt,e=>LN(e,t))},[t])}function LN(t,e){ed(e,t.getKey())&&Om(t.getFirstChild()),!(!Lt(t)||t.getMarker()!=="b"||t.isEmpty()||!e.getEditorState().read(()=>{const n=g.$getNodeByKey(t.getKey());return Lt(n)&&((n==null?void 0:n.isEmpty())??!1)}))&&t.clear()}function Vm({onStateChange:t}){const[e]=Ce(),[n,r]=w.useState(e),o=w.useRef(!1),i=w.useRef(!1),s=w.useRef(),a=w.useCallback(()=>{const c=g.$getSelection();if(g.$isRangeSelection(c)){const u=c.anchor.getNode();let d=u.getKey()==="root"?u:Ki(u,f=>{const h=f.getParent();return h!==null&&g.$isRootOrShadowRoot(h)});d===null&&(d=u.getTopLevelElementOrThrow());const p=d.getKey();n.getElementByKey(p)!==null&&(Lt(d)||er(d)||ys(d))&&(s.current=d.getMarker(),t==null||t(o.current,i.current,s.current))}},[n,t]);return w.useEffect(()=>e.registerCommand(g.SELECTION_CHANGE_COMMAND,(c,u)=>(a(),r(u),!1),g.COMMAND_PRIORITY_CRITICAL),[e,a]),w.useEffect(()=>Mt(n.registerUpdateListener(({editorState:c})=>{c.read(()=>{a()})}),n.registerCommand(g.CAN_UNDO_COMMAND,c=>(o.current=c,t==null||t(o.current,i.current,s.current),!1),g.COMMAND_PRIORITY_CRITICAL),n.registerCommand(g.CAN_REDO_COMMAND,c=>(i.current=c,t==null||t(o.current,i.current,s.current),!1),g.COMMAND_PRIORITY_CRITICAL)),[a,n,t]),null}function $N({textDirection:t}){const[e]=Ce();return PN(e,t),FN(e),null}function PN(t,e){w.useEffect(()=>{function n(){const r=t.getRootElement();if(!r||e==="auto")return;r.dir=e;const o=t._config.theme.placeholder,i=document.getElementsByClassName(o)[0];i&&(i.dir=e)}return n(),t.registerUpdateListener(({dirtyElements:r})=>{r.size>0&&n()})},[t,e])}function FN(t){w.useEffect(()=>{const e=n=>{if(n.key!=="ArrowLeft"&&n.key!=="ArrowRight")return!1;const r=g.$getSelection();if(!g.$isRangeSelection(r))return!1;const o=r.anchor.getNode(),i=Ki(o,p=>gE(p,t)==="p");if(!i)return!1;const s=t.getElementByKey(i.getKey());if(!s)return!1;const a=s.parentElement,c=s.dir||"ltr",u=((a==null?void 0:a.dir)??"")||"ltr";if(!a||c===u)return!1;const d=a.dir==="rtl"&&n.key==="ArrowLeft"||a.dir==="ltr"&&n.key==="ArrowRight";return r.modify("move",d,"character"),n.preventDefault(),!0};return t.registerCommand(g.KEY_DOWN_COMMAND,e,g.COMMAND_PRIORITY_HIGH)},[t])}function BN(){const[t]=Ce();return qN(t),null}function qN(t){w.useEffect(()=>{if(!t.hasNodes([et,zt,_t,g.TextNode,Ht]))throw new Error("TextSpacingPlugin: CharNode, ImmutableVerseNode, NoteNode, TextNode or VerseNode not registered on editor!");return Mt(t.registerNodeTransform(g.TextNode,UN),t.registerNodeTransform(g.TextNode,e=>VN(e,t)),t.registerNodeTransform(Ht,Mf),t.registerNodeTransform(zt,Mf))},[t])}function UN(t){if(!t.isAttached())return;const e=t.getTextContent(),n=t.getNextSibling(),r=t.getParent();t.getMode()!=="normal"||e.endsWith(" ")&&e.length>1||Te(n)||He(r)||Dt(r)||xs(r)||(e===" "&&!vn(n)?t.setTextContent(""):Zu(t))}function VN(t,e){const n=t.getParent();!xs(n)||!t.isAttached()||ed(e,t.getKey())&&n.insertAfter(t)}function Mf(t){if(!t.isAttached())return;const e=t.getPreviousSibling();e&&!vn(e)&&!g.$isTextNode(e)&&!xs(e)&&t.insertBefore(g.$createTextNode(" "))}function HN({trigger:t,scriptureReference:e,contextMarker:n,getMarkerAction:r}){const{markersMenuItems:o}=$k({scriptureReference:e,contextMarker:n,getMarkerAction:r});return l.jsx(Lk,{trigger:t,items:o})}function zN({trigger:t,scrRef:e,getMarkerAction:n}){const{book:r,chapterNum:o,verseNum:i,verse:s}=e,a=w.useMemo(()=>e,[r,o,i,s]),[c]=Ce(),[u]=GN(c);return KN(c),l.jsx(HN,{trigger:t,scriptureReference:a,contextMarker:u,getMarkerAction:n})}function GN(t){const[e,n]=w.useState();return w.useEffect(()=>t.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(t.read(()=>{const r=g.$getSelection();if(!g.$isRangeSelection(r)){e&&n(void 0);return}const o=g.$getNodeByKey(r.anchor.key),i=g.$getNodeByKey(r.focus.key);if(!o||!i){e&&n(void 0);return}const s=dE(o,i);if(!s||!VE(s)){e&&n(void 0);return}const a=s.getMarker();e!==a&&n(a)}),!1),g.COMMAND_PRIORITY_LOW),[e,t]),[e]}function KN(t){w.useEffect(()=>{if(!t.hasNodes([Ht,zt]))throw new Error("UsjNodesMenuPlugin: VerseNode or ImmutableVerseNode not registered on editor!");const e={},n={};return Mt(t.registerNodeTransform(zt,r=>Rf(r,t,e)),t.registerNodeTransform(Ht,r=>Rf(r,t,e)),t.registerMutationListener(zt,r=>Lf(r,t,e,n)),t.registerMutationListener(Ht,r=>Lf(r,t,e,n)))},[t])}function Rf(t,e,n){g.$hasUpdateTag(Pu)||ed(e,t.getKey())&&JN(t,n)}function Of(t){return RegExp(/(\d+)([a-zA-Z]+)?(-(\d+)([a-zA-Z]+)?)?/).exec(t)}const jf=2,YN=3,If=4,WN=5;function JN(t,e){var n;const r=zu(t),o=r==null?void 0:r.getNumber();if(!o)return;const i=e[o];if(!i)return;let s=parseInt(t.getNumber()),a=((n=Of(t.getNumber()))==null?void 0:n[jf])??"";i.forEach(c=>{const u=g.$getNodeByKey(c);if(!u)return;const d=u.getNumber(),p=parseInt(d),f=Of(d),h=!!(f!=null&&f[YN]),b=h?parseInt(f[If]):p;if(b<s||p>s||b===s&&a)return;const x=(f==null?void 0:f[jf])??"",E=(f==null?void 0:f[WN])??"",C=h?Bc(parseInt(f[If]),void 0):"";let _=`${x}`;_+=h?`-${C}${E}`:"";const D=Bc(p,void 0);u.setNumber(`${D}${_}`),s=parseInt(h?C:D),a=h?E:x})}function Lf(t,e,n,r){e.getEditorState().read(()=>{for(const[o,i]of t){const s=g.$getNodeByKey(o);if(vn(s)){if(i==="created"){const a=zu(s);if(!a)continue;const c=a.getNumber();n[c]||(n[c]=[]),n[c].push(o),r[o]=c}else if(i==="destroyed"){const a=r[o],c=n[a];if(!c)continue;const u=c.findIndex(d=>d===o);if(u===-1)continue;c.splice(u,1),Reflect.deleteProperty(r,o)}}}})}const Hm="formatted",XN="unformatted";let ad;function QN(t){const e=ZN(t);if(!e)throw new Error(`Invalid view mode: ${t}`);ad=e}QN(Hm);const ld=()=>ad;function ZN(t){let e;switch(t){case Hm:e={markerMode:"hidden",noteMode:"collapsed",hasSpacing:!0,isFormattedFont:!0};break;case XN:e={markerMode:"editable",noteMode:"expanded",hasSpacing:!1,isFormattedFont:!1};break}return e}function eS(t){if(t)return t.markerMode==="editable"?Ht:zt}function tS(t){const e=[],n=t??ad;return n&&(e.push(`${P1}${n.markerMode}`),n.hasSpacing&&e.push(L1),n.isFormattedFont&&e.push($1)),e}let Vc;function nS(t){t&&(Vc=t)}function rS(t){return t.isEmpty()?vu:oS(t.toJSON())}function oS(t){if(!t.root||!t.root.children)return;const e=t.root.children;if(e.length===1&&qu(e[0])&&(!e[0].children||e[0].children.length===0))return vu;const n=zm(e),r=vr(n);return r?{type:zi,version:Gi,content:r}:void 0}function iS(t,e){const{type:n,marker:r,unknownAttributes:o}=t;let i;return t.code!==""&&(i=t.code),mt({type:n,marker:r,code:i,...o,content:e})}function sS(t){const{marker:e,number:n,sid:r,altnumber:o,pubnumber:i,unknownAttributes:s}=t;return mt({type:Pn.getType(),marker:e,number:n,sid:r,altnumber:o,pubnumber:i,...s})}function aS(t,e){const{marker:n,sid:r,altnumber:o,pubnumber:i,unknownAttributes:s}=t,a=e&&typeof e[0]=="string"?e[0]:void 0;let{number:c}=t;return c=vm(n,a,c),mt({type:Pn.getType(),marker:n,number:c,sid:r,altnumber:o,pubnumber:i,...s})}function lS(t){const{marker:e,sid:n,altnumber:r,pubnumber:o,unknownAttributes:i}=t,{text:s}=t;let{number:a}=t;return a=vm(e,s,a),mt({type:Ht.getType(),marker:e,number:a,sid:n,altnumber:r,pubnumber:o,...i})}function cS(t,e){const{type:n,marker:r,unknownAttributes:o}=t,i=r===""?void 0:r;return e==null||e.forEach((s,a)=>{typeof s=="string"&&s.startsWith(Ve)&&(e[a]=s.slice(1))}),mt({type:n,marker:i,...o,content:e})}function uS(t,e){const{type:n,marker:r,unknownAttributes:o}=t;return mt({type:n,marker:r,...o,content:e})}function dS(t,e){const{type:n,marker:r,caller:o,category:i,unknownAttributes:s}=t;return mt({type:n,marker:r,caller:o,category:i,...s,content:e})}function $o(t){const{type:e,marker:n,sid:r,eid:o,unknownAttributes:i}=t;return mt({type:e,marker:n===""?void 0:n,sid:r,eid:o,...i})}function pS(t){return t.text}function fS(t,e){const{tag:n,marker:r,unknownAttributes:o}=t;return mt({type:n,marker:r,...o,content:e})}function hS(t){const{marker:e}=t;return{type:Ta,marker:e===""?void 0:e}}function $f(t,e){const n=t[t.length-1];n&&typeof n=="string"?t[t.length-1]=n+e:t.push(e)}function wS(t,e,n,r,o){const i=nr.getType(),s=e.filter(a=>!n.includes(a));if(n.filter(a=>!e.includes(a)).forEach(a=>{const c=$o({type:i,marker:Vo,eid:a});o.push(c)}),s.forEach(a=>{const c=$o({type:i,marker:wo,sid:a});o.push(c)}),e.length===0){const a=$o({type:i,marker:wo});o.push(a)}if(o.push(...t),e.length===0){const a=$o({type:i,marker:Vo});o.push(a)}(!r||!_E(r))&&e.forEach(a=>{const c=$o({type:i,marker:Vo,eid:a});o.push(c)})}function vr(t,e){const n=[];let r,o=[];return t.forEach((i,s)=>{const a=i,c=i,u=i,d=i,p=i,f=i,h=i,b=i;switch(i.type){case xn.getType():n.push(iS(a,vr(a.children)));break;case wr.getType():n.push(sS(i));break;case Pn.getType():n.push(aS(c,vr(c.children)));break;case zt.getType():case Ht.getType():n.push(lS(i));break;case et.getType():n.push(cS(u,vr(u.children)));break;case Zt.getType():n.push(uS(d,vr(d.children)));break;case _t.getType():n.push(dS(p,vr(p.children,p.caller)));break;case Ur.getType():case Mn.getType():case g.LineBreakNode.getType():case No.getType():break;case Tt.getType():if(r=vr(h.children),r){const x=h.typedIDs[kr];if(x)wS(r,x,o,t[s+1],n),o=x;else{const E=r.shift();E&&(typeof E=="string"?$f(n,E):n.push(E)),r.length>0&&n.push(...r)}}break;case nr.getType():n.push($o(i));break;case g.TextNode.getType():f.text&&f.text!==Ve&&!f.text.startsWith(Lu)&&(!e||f.text!==Ku(e))&&$f(n,pS(f));break;case ko.getType():n.push(fS(b,vr(b.children)));break;case Vr.getType():n.push(hS(i));break;default:Vc==null||Vc.error(`Unexpected node type '${i.type}'!`)}}),n&&n.length>0?n:void 0}function zm(t){const e=t.findIndex(n=>qu(n));if(e>=0){const n=t.slice(0,e),r=t[e].children,o=zm(t.slice(e+1));t=[...n,...r,...o]}return t}const nc={initialize:nS,deserializeEditorState:rS},Pf=Gm([]),gS={type:g.LineBreakNode.getType(),version:1};let Ma=[],be,ca,Hc,Ke;function mS(t,e){Ma=[],xS(t),yS(e)}function bS(t=0){}function vS(t,e){be=e??ld();let n;return t?(t.type!==zi&&(Ke==null||Ke.warn(`This USJ type '${t.type}' didn't match the expected type '${zi}'.`)),t.version!==Gi&&(Ke==null||Ke.warn(`This USJ version '${t.version}' didn't match the expected version '${Gi}'.`)),t.content.length>0?n=Gc($i(t.content)):n=[Pf]):n=[Pf],Hc==null||Hc(Ma),{root:{children:n,direction:null,format:"",indent:0,type:"root",version:1}}}function xS(t){t&&(ca=t),t!=null&&t.addMissingComments&&(Hc=t.addMissingComments)}function yS(t){t&&(Ke=t)}function _S(t){return!t||t.length!==1||typeof t[0]!="string"?"":t[0]}function CS(t){let{marker:e}=t;e!==ts&&(Ke==null||Ke.warn(`Unexpected book marker '${e}'!`)),e=e??ts;const{code:n}=t;(!n||!xn.isValidBookCode(n))&&(Ke==null||Ke.warn(`Unexpected book code '${n}'!`));const r=[];((be==null?void 0:be.markerMode)==="editable"||(be==null?void 0:be.markerMode)==="visible")&&r.push(vo("marker",gr(e)+" "+n+Ve));const o=_S(t.content);o&&r.push(bo(o));const i=Ct(t);return mt({type:xn.getType(),marker:e,code:n??"",unknownAttributes:i,children:r,direction:null,format:"",indent:0,version:em})}function ES(t){let{marker:e}=t;e!==ka&&(Ke==null||Ke.warn(`Unexpected chapter marker '${e}'!`)),e=e??ka;const{number:n,sid:r,altnumber:o,pubnumber:i}=t,s=Ct(t);let a;return(be==null?void 0:be.markerMode)==="visible"&&(a=!0),(be==null?void 0:be.markerMode)==="editable"?mt({type:Pn.getType(),marker:e,number:n??"",sid:r,altnumber:o,pubnumber:i,unknownAttributes:s,children:[bo(_s(e,n)??"")],direction:null,format:"",indent:0,version:rm}):mt({type:wr.getType(),marker:e,number:n??"",showMarker:a,sid:r,altnumber:o,pubnumber:i,unknownAttributes:s,version:lm})}function kS(t){let{marker:e}=t;e!==Na&&(Ke==null||Ke.warn(`Unexpected verse marker '${e}'!`)),e=e??Na;const{number:n,sid:r,altnumber:o,pubnumber:i}=t,s=(eS(be)??zt).getType(),a=(be==null?void 0:be.markerMode)==="editable"?gm:Am;let c,u;(be==null?void 0:be.markerMode)==="editable"?c=_s(e,n):(be==null?void 0:be.markerMode)==="visible"&&(u=!0);const d=Ct(t);return mt({type:s,text:c,marker:e,number:n??"",sid:r,altnumber:o,pubnumber:i,showMarker:u,unknownAttributes:d,version:a})}function NS(t,e=[]){let{marker:n}=t;et.isValidMarker(n)||Ke==null||Ke.warn(`Unexpected char marker '${n}'!`),n=n??"",(be==null?void 0:be.markerMode)==="editable"&&e.forEach(o=>{Gu(o)&&(o.text=Ve+o.text)});const r=Ct(t);return mt({type:et.getType(),marker:n,unknownAttributes:r,children:[...e],direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:am})}function Gm(t){return{type:jr.getType(),children:t,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:dm}}function SS(t,e=[]){let{marker:n}=t;Zt.isValidMarker(n)||Ke==null||Ke.warn(`Unexpected para marker '${n}'!`),n=n??il;const r=[];(be==null?void 0:be.markerMode)==="editable"?r.push(ii(n),bo(Ve)):(be==null?void 0:be.markerMode)==="visible"&&r.push(vo("marker",gr(n)+Ve)),r.push(...e);const o=Ct(t);return mt({type:Zt.getType(),marker:n,unknownAttributes:o,children:r,direction:null,format:"",indent:0,textFormat:0,textStyle:"",version:wm})}function TS(t,e){const n=wE(e);let r=()=>{};return ca!=null&&ca.noteCallerOnClick&&(r=ca.noteCallerOnClick),mt({type:Mn.getType(),caller:t,previewText:n,onClick:r,version:Lm})}function AS(t,e){let{marker:n}=t;_t.isValidMarker(n)||Ke==null||Ke.warn(`Unexpected note marker '${n}'!`),n=n??Uu;const{category:r}=t,o=t.caller??"*",i=(be==null?void 0:be.noteMode)!=="expanded",s=Ct(t);let a,c;(be==null?void 0:be.markerMode)==="editable"?(a=ii(n),c=ii(n,"closing")):(be==null?void 0:be.markerMode)==="visible"&&(a=vo("marker",gr(n)+Ve),c=vo("marker",ni(n)+Ve));const u=[];let d;if(a&&u.push(a),(be==null?void 0:be.markerMode)==="editable")d=bo(Ku(o)),u.push(d,...e);else{const p=bo(Ve);d=TS(o,e),u.push(d,p,...e.flatMap(DS(p)))}return c&&u.push(c),mt({type:_t.getType(),marker:n,caller:o,isCollapsed:i,category:r,unknownAttributes:s,children:u,direction:null,format:"",indent:0,version:hm})}function DS(t){return e=>NE(e)?[e]:[e,t]}function MS(t){let{marker:e}=t;(!e||!nr.isValidMarker(e))&&(Ke==null||Ke.warn(`Unexpected milestone marker '${e}'!`)),e=e??"";const{sid:n,eid:r}=t,o=Ct(t);return mt({type:nr.getType(),marker:e,sid:n,eid:r,unknownAttributes:o,version:pm})}function Ff(t,e=[]){return{type:Tt.getType(),typedIDs:{[kr]:e},children:t,direction:null,format:"",indent:0,version:1}}function RS(t,e){const{marker:n}=t,r=t.type,o=Ct(t),i=[...e];return i.forEach(s=>{Gu(s)&&(s.mode="token")}),mt({type:ko.getType(),tag:r,marker:n,unknownAttributes:o,children:i,direction:null,format:"",indent:0,version:Qg})}function OS(t){return{type:Vr.getType(),marker:t,version:km}}function ii(t,e="opening"){return{type:No.getType(),marker:t,markerSyntax:e,text:"",detail:0,format:0,mode:"normal",style:"",version:1}}function bo(t,e="normal"){return{type:g.TextNode.getType(),text:t,detail:0,format:0,mode:e,style:"",version:1}}function vo(t,e){return{type:Ur.getType(),text:e,textType:t,version:Em}}function Bf(t,e){(be==null?void 0:be.markerMode)==="editable"?e.push(ii(t)):(be==null?void 0:be.markerMode)==="visible"&&e.push(vo("marker",gr(t)))}function qf(t,e,n=!1){et.isValidFootnoteMarker(t)||et.isValidCrossReferenceMarker(t)||((be==null?void 0:be.markerMode)==="editable"?n?e.push(ii("","selfClosing")):e.push(ii(t,"closing")):(be==null?void 0:be.markerMode)==="visible"&&e.push(vo("marker",ni(n?"":t))))}function jS(t,e){if(t.type!=="ms")return;const n=[];if(t.sid&&n.push(`sid="${t.sid}"`),t.eid&&n.push(`eid="${t.eid}"`),n.length<=0)return;const r=Lu+n.join(" ");(be==null?void 0:be.markerMode)==="editable"?e.push(bo(r)):(be==null?void 0:be.markerMode)==="visible"&&e.push(vo("attribute",r))}function Uf(t,e){return t.length<=0||e===0?t:t.map(n=>n-e)}function IS(t,e){const n=t.indexOf(e,0);n>-1&&t.splice(n,1)}function Vf(t,e){e.marker===wo&&e.sid!==void 0&&t.push(e.sid),e.marker===Vo&&e.eid!==void 0&&IS(t,e.eid)}function zc(t,e,n=!1,r=[]){if(e.length<=0||e[0]>=t.length)return t;const o=e.shift(),i=e.length>0?e.shift():t.length-1;if(o===void 0||i===void 0||i>=t.length||t.length<=0)return t;const s=t.slice(0,o),a=n?[Ff(s,[...r])]:s,c=t[o];Vf(r,c);const u=zc(t.slice(o+1,i),Uf(e,o+1),c.marker===wo,r),d=Ff(u,[...r]),p=t[i];Vf(r,p);const f=zc(t.slice(i+1),Uf(e,i+1),p.marker===wo,r);return[...a,d,...f]}function $i(t){const e=[],n=[];return t==null||t.forEach(r=>{if(typeof r=="string")r&&n.push(bo(r));else if(!r.type)Ke==null||Ke.error("Marker type is missing!");else switch(r.type){case xn.getType():n.push(CS(r));break;case Pn.getType():n.push(ES(r));break;case Ht.getType():be!=null&&be.hasSpacing||n.push(gS),n.push(kS(r));break;case et.getType():Bf(r.marker??"",n),n.push(NS(r,$i(r.content))),qf(r.marker??"",n);break;case Zt.getType():n.push(SS(r,$i(r.content)));break;case _t.getType():n.push(AS(r,$i(r.content)));break;case nr.getType():J1(r.marker??"")&&(e.push(n.length),r.sid!==void 0&&(Ma==null||Ma.push(r.sid))),n.push(MS(r)),Bf(r.marker??"",n),jS(r,n),qf(r.marker??"",n,!0);break;case Vr.getType():n.push(OS(r.marker??""));break;default:Ke==null||Ke.warn(`Unknown type-marker '${r.type}-${r.marker}'!`),n.push(RS(r,$i(r.content)))}}),zc(n,e)}function Gc(t){const e=t.findIndex(n=>I1(n)||oE(n)||nE(n));if(e>=0){const n=Gc(t.slice(0,e)),r=t[e],o=Gc(t.slice(e+1));return[...n,r,...o]}else if(t.some(n=>"text"in n&&"mode"in n||IE(n)))return[Gm(t)];return t}const Kc={initialize:mS,reset:bS,serializeEditorState:vS},ea=t=>{if(!_t.isValidMarker(t)||!t.includes("f"))throw new Error(`Invalid footnote marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"fr",content:[`${n}:${r}`]}),e.noteText&&o.push({type:"char",marker:"fq",content:[e.noteText]}),o.push({type:"char",marker:"ft",content:["-"]}),[{type:"note",marker:t,caller:ho,content:o}]}}},Hf=t=>{if(!_t.isValidMarker(t)||!t.includes("x"))throw new Error(`Invalid cross-reference marker '${t}'`);return{action:e=>{const{chapterNum:n,verseNum:r}=e.reference,o=[];return n!==void 0&&r!==void 0&&o.push({type:"char",marker:"xo",content:[`${n}:${r}`]}),o.push({type:"char",marker:"xt",content:["-"]}),[{type:"note",marker:t,caller:$u,content:o}]}}},LS={c:{action:t=>{const{chapterNum:e}=t.reference;return[{type:"chapter",marker:"c",number:`${e+1}`}]}},v:{action:t=>{const{verseNum:e,verse:n}=t.reference;return[{type:"verse",marker:"v",number:`${Bc(e,n)}`}]}},f:ea("f"),fe:ea("fe"),ef:ea("ef"),efe:ea("efe"),x:Hf("x"),ex:Hf("ex")};function $S(t,e,n,r,o){const i=PS(t);return{action:s=>{s.editor.update(()=>{var a;const c=g.$getSelection();g.$isRangeSelection(c)&&(s.noteText=c.getTextContent());const u=(a=i==null?void 0:i.action)==null?void 0:a.call(i,s);if(!u)return;const d=bf(u,Kc,r),p=Xl(d);if(g.$isRangeSelection(c)){const f=c.anchor.getNode();if(Te(p))Dm(p,c,r),p.getIsCollapsed()||(e.current=p.getKey());else if(c.getTextContent().length>0)FS(c,()=>Xl(d));else if(g.$isElementNode(p)&&!p.isInline()){const h=c.insertParagraph();if(h){const b=h.getChildren();p.append(...b),h.replace(p),p.selectStart()}}else if(g.$isTextNode(f)&&!Cs(f)&&Te(f.getParent())&&c.isCollapsed()){let h=f.insertAfter(p);if(Sa(p)){const b={...r||ld(),markerMode:"hidden"},x=bf(u,Kc,b),E=Xl(x);h=h.insertAfter(E)}h.insertAfter(g.$createTextNode(Ve))}else{c.insertNodes([p]),HS(p);const h=p.getNextSibling();h?h.selectStart():p.selectStart()}}else c==null||c.insertNodes([p])},o)},label:i==null?void 0:i.label}}function PS(t){let e=LS[t];return e||(Zt.isValidMarker(t)?e={action:()=>[{type:Zt.getType(),marker:t,content:[]}]}:et.isValidMarker(t)&&(e={action:()=>[{type:et.getType(),marker:t,content:["-"]}]})),e}function FS(t,e){const n=t.getNodes(),[r,o]=BS(t);let i;n.forEach((s,a)=>{if(g.$isElementNode(i)&&i.isParentOf(s))return;const c=qS(s,a===0,a===n.length-1,r,o);if(!c){i=void 0;return}i||(i=e(),c.insertBefore(i)),VS(c,i)}),(g.$isTextNode(i)||g.$isElementNode(i))&&i.selectEnd()}function BS(t){const e=t.anchor.offset,n=t.focus.offset;return t.isBackward()?[n,e]:[e,n]}function qS(t,e,n,r,o){if(!(Dt(t)||Te(t)||Te(t.getParent()))){if(g.$isTextNode(t))return US(t,e,n,r,o);if(g.$isElementNode(t)&&t.isInline())return t}}function US(t,e,n,r,o){const i=t.getTextContentSize(),s=e?r:0,a=n?o:i;if(s===0&&a===0)return;const c=t.splitText(s,a);return c.length===1?c[0]:c.length===3||a===i?c[1]:c[0]}function VS(t,e){var n;if(g.$isTextNode(e)){const r=zf(t,e);e.setTextContent(r),t.remove()}else if(g.$isElementNode(e)){const r=e.getChildrenSize();e.append(t);for(let o=0;o<r;o++)(n=e.getFirstChild())==null||n.remove();zf(t,e)}}function zf(t,e){let n=t.getTextContent();if(g.$isTextNode(t)&&e.isInline()&&n.startsWith(" ")){n=n.trimStart(),t.setTextContent(n);const r=e.getPreviousSibling();Zu(r),g.$isTextNode(r)||e.insertBefore(g.$createTextNode(" "))}return n}function HS(t){vn(t)&&(Zu(t.getPreviousSibling()),Om(t.getNextSibling()))}const Km={chapter:"chapter",verse:"verse",char:"char",para:"para",typedMark:"editor-typed-mark",typedMarkOverlap:"editor-typed-markOverlap",mark:"editor-mark",markOverlap:"editor-markOverlap",placeholder:"editor-placeholder",paragraph:"editor-paragraph",quote:"editor-quote",heading:{h1:"editor-heading-h1",h2:"editor-heading-h2",h3:"editor-heading-h3",h4:"editor-heading-h4",h5:"editor-heading-h5"},list:{nested:{listitem:"editor-nested-listitem"},ol:"editor-list-ol",ul:"editor-list-ul",listitem:"editor-listitem"},image:"editor-image",link:"editor-link",text:{bold:"editor-text-bold",italic:"editor-text-italic",overflowed:"editor-text-overflowed",hashtag:"editor-text-hashtag",underline:"editor-text-underline",strikethrough:"editor-text-strikethrough",underlineStrikethrough:"editor-text-underlineStrikethrough"}};function zS({options:t,editedUsjRef:e,usj:n,setUsj:r}){const{view:o,nodes:i}=t||{},{hasSpacing:s,isFormattedFont:a,markerMode:c}=o||{};return w.useEffect(()=>{e.current&&!lr(e.current,n)&&r(e.current)},[e,s,a,c,i,r,n]),null}function GS({scrRef:t,onScrRefChange:e}){const[n]=Ce(),r=w.useRef(!1),o=w.useRef(!1),{book:i,chapterNum:s,verseNum:a}=t;return w.useEffect(()=>n.registerMutationListener(xn,c=>{n.update(()=>{for(const[u,d]of c){const p=g.$getNodeByKey(u);p&&er(p)&&d==="created"&&Gf(s,a,o)}},{tag:$c})},{skipInitialization:!0}),[n,s,a]),w.useEffect(()=>{r.current?r.current=!1:n.update(()=>Gf(s,a,o),{tag:$c})},[n,s,a]),w.useEffect(()=>n.registerCommand(g.SELECTION_CHANGE_COMMAND,()=>(o.current?o.current=!1:KS(i,s,a,e,r),!1),g.COMMAND_PRIORITY_LOW),[n,i,s,a,e]),null}function Gf(t,e,n){var r;const o=ym(g.$getSelection()),i=(r=Rm(o))==null?void 0:r.getNumber();if(mE(i)&&Wu(e,i))return;const s=g.$getRoot().getChildren(),a=iE(s,t),c=hE(s,a),u=sE(c,!!a);if(u&&!a||!a)return;fE(c,u);const d=UE(c,e);if(d){if(Lt(d)){const p=d.getFirstChild();g.$isTextNode(p)?p.select(0,0):d.select(0,0)}else d.selectNext(0,0);n.current=!0}}function KS(t,e,n,r,o){const i=ym(g.$getSelection());if(!i)return;const s=zu(i),a=parseInt((s==null?void 0:s.getNumber())??"1",10),c=Rm(i),u=c==null?void 0:c.getNumber(),d=parseInt(u??"0",10),p=u?Wu(n,u):n===d;if(o.current=!!(s&&a!==e||!p),o.current){const f={book:t,chapterNum:a,verseNum:d};u!=null&&d.toString()!==u&&(f.verse=u),r(f)}}function YS(t){return er(t)?`${t.__code}`:Fu(t)?`${t.__marker} "${t.__number}"`:He(t)?`${t.__marker}`:ys(t)?`${t.__marker} "${t.__number}"`:Hr(t)?`${t.__caller}`:bi(t)?`${t.__marker} "${t.__number}"`:Te(t)?`${t.__marker} "${t.__caller}"`+(t.__isCollapsed?" (collapsed)":" (expanded)"):Lt(t)?`${t.__marker}`:Dt(t)?`ids: [ ${JSON.stringify(t.getTypedIDs())} ]`:Hu(t)?`${t.__marker} "${t.__number}"`:""}function WS(){const[t]=Ce();return l.jsx(p2,{viewClassName:"tree-view-output",treeTypeButtonClassName:"debug-treetype-button",timeTravelPanelClassName:"debug-timetravel-panel",timeTravelButtonClassName:"debug-timetravel-button",timeTravelPanelSliderClassName:"debug-timetravel-panel-slider",timeTravelPanelButtonClassName:"debug-timetravel-panel-button",customPrintNode:YS,editor:t})}const Ym=w.createContext(null),Kf=4;function JS({children:t,className:e,onClick:n,title:r}){const o=w.useRef(null),i=w.useContext(Ym);if(i===null)throw new Error("DropDownItem must be used within a DropDown");const{registerItem:s}=i;return w.useEffect(()=>{o&&o.current&&s(o)},[o,s]),l.jsx("button",{className:e,onClick:n,ref:o,title:r,type:"button",children:t})}function XS({children:t,dropDownRef:e,onClose:n}){const[r,o]=w.useState(),[i,s]=w.useState(),a=w.useCallback(d=>{o(p=>p?[...p,d]:[d])},[o]),c=d=>{if(!r)return;const p=d.key;["Escape","ArrowUp","ArrowDown","Tab"].includes(p)&&d.preventDefault(),p==="Escape"||p==="Tab"?n():p==="ArrowUp"?s(f=>{if(!f)return r[0];const h=r.indexOf(f)-1;return r[h===-1?r.length-1:h]}):p==="ArrowDown"&&s(f=>f?r[r.indexOf(f)+1]:r[0])},u=w.useMemo(()=>({registerItem:a}),[a]);return w.useEffect(()=>{r&&!i&&s(r[0]),i&&i.current&&i.current.focus()},[r,i]),l.jsx(Ym.Provider,{value:u,children:l.jsx("div",{className:"dropdown",ref:e,onKeyDown:c,children:t})})}function QS({disabled:t=!1,buttonLabel:e,buttonAriaLabel:n,buttonClassName:r,buttonIconClassName:o,children:i,stopCloseOnClickSelf:s}){const a=w.useRef(null),c=w.useRef(null),[u,d]=w.useState(!1),p=()=>{d(!1),c&&c.current&&c.current.focus()};return w.useEffect(()=>{const f=c.current,h=a.current;if(u&&f!==null&&h!==null){const{top:b,left:x}=f.getBoundingClientRect();h.style.top=`${b+f.offsetHeight+Kf}px`,h.style.left=`${Math.min(x,window.innerWidth-h.offsetWidth-20)}px`}},[a,c,u]),w.useEffect(()=>{const f=c.current;if(f!==null&&u){const h=b=>{const x=b.target;s&&a.current&&a.current.contains(x)||f.contains(x)||d(!1)};return document.addEventListener("click",h),()=>{document.removeEventListener("click",h)}}return()=>{}},[a,c,u,s]),w.useEffect(()=>{const f=()=>{if(u){const h=c.current,b=a.current;if(h!==null&&b!==null){const{top:x}=h.getBoundingClientRect(),E=x+h.offsetHeight+Kf;E!==b.getBoundingClientRect().top&&(b.style.top=`${E}px`)}}};return document.addEventListener("scroll",f),()=>{document.removeEventListener("scroll",f)}},[c,a,u]),l.jsxs(l.Fragment,{children:[l.jsxs("button",{type:"button",disabled:t,"aria-label":n||e,className:r,onClick:()=>d(!u),ref:c,children:[o&&l.jsx("span",{className:o}),e&&l.jsx("span",{className:"text dropdown-button-text",children:e}),l.jsx("i",{className:"chevron-down"})]}),u&&Xt.createPortal(l.jsx(XS,{dropDownRef:a,onClose:p,children:i}),document.body)]})}const Yc={m:"m - Paragraph - Margin - No First Line Indent",ms:"ms - Heading - Major Section Level 1",nb:"nb - Paragraph - No Break with Previous Paragraph",p:"p - Paragraph - Normal - First Line Indent",pi:"pi - Paragraph - Indented - Level 1 - First Line Indent",q1:"q1 - Poetry - Indent Level 1",q2:"q2 - Poetry - Indent Level 2",r:"r - Heading - Parallel References",s:"s - Heading - Section Level 1"},Wc={...Yc,ide:"ide - File - Encoding",h:"h - File - Header",h1:"h1 - File - Header",h2:"h2 - File - Left Header",h3:"h3 - File - Right Header",toc1:"toc1 - File - Long Table of Contents Text",toc2:"toc2 - File - Short Table of Contents Text",toc3:"toc3 - File - Book Abbreviation",cl:"cl - Chapter - Publishing Label",mt:"mt - Title - Major Title Level 1",mt1:"mt1 - Title - Major Title Level 1",mt2:"mt2 - Title - Major Title Level 2",mt3:"mt3 - Title - Major Title Level 3",mt4:"mt4 - Title - Major Title Level 4",ms1:"ms1 - Heading - Major Section Level 1",ms2:"ms2 - Heading - Major Section Level 2",ms3:"ms3 - Heading - Major Section Level 3",b:"b - Poetry - Stanza Break (Blank Line)"};function ZS({editorRef:t,blockMarker:e,disabled:n=!1}){return l.jsx(QS,{disabled:n,buttonClassName:"toolbar-item block-controls",buttonIconClassName:"icon block-marker "+eT(e),buttonLabel:tT(e),buttonAriaLabel:"Formatting options for block type",children:Object.keys(Yc).map(r=>l.jsxs(JS,{className:"item block-marker "+nT(e===r),onClick:()=>{var o;return(o=t.current)==null?void 0:o.formatPara(r)},children:[l.jsx("i",{className:"icon block-marker "+r}),l.jsx("span",{className:"text usfm_"+r,children:Yc[r]})]},r))})}function eT(t){return t&&t in Wc?t:"ban"}function tT(t){return t&&t in Wc?Wc[t]:"No Style"}function nT(t){return t?"active dropdown-item-active":""}function Yf(){return l.jsx("div",{className:"divider"})}const rT=w.forwardRef(function({editorRef:t,isReadonly:e=!1,onStateChange:n},r){const[o]=Ce(),[i,s]=w.useState(o),[a,c]=w.useState(),[u,d]=w.useState(!1),[p,f]=w.useState(!1),h=w.useCallback((b,x,E)=>{d(b),f(x),c(E),n==null||n(b,x,E)},[n]);return w.useEffect(()=>o.registerCommand(g.SELECTION_CHANGE_COMMAND,(b,x)=>(s(x),!1),g.COMMAND_PRIORITY_CRITICAL),[o]),l.jsxs(l.Fragment,{children:[l.jsx(Vm,{onStateChange:h}),l.jsxs("div",{className:"toolbar",children:[l.jsx("button",{disabled:!u||e,onClick:()=>{i.dispatchCommand(g.UNDO_COMMAND,void 0)},title:gc?"Undo (⌘Z)":"Undo (Ctrl+Z)",type:"button",className:"toolbar-item spaced","aria-label":"Undo",children:l.jsx("i",{className:"format undo"})}),l.jsx("button",{disabled:!p||e,onClick:()=>{i.dispatchCommand(g.REDO_COMMAND,void 0)},title:gc?"Redo (⌘Y)":"Redo (Ctrl+Y)",type:"button",className:"toolbar-item","aria-label":"Redo",children:l.jsx("i",{className:"format redo"})}),l.jsx(Yf,{}),i===o&&l.jsxs(l.Fragment,{children:[l.jsx(ZS,{editorRef:t,blockMarker:a,disabled:e}),l.jsx(Yf,{})]}),l.jsx("div",{ref:r,className:"end-container"})]})]})}),Wf={namespace:"platformEditor",theme:Km,editable:!0,editorState:void 0,onError(t){throw t},nodes:[Tt,...vk]},oT=ld(),iT={},sT={};function aT(){return l.jsx("div",{className:"editor-placeholder",children:"Enter some Scripture..."})}const Wm=w.forwardRef(function({defaultUsj:t,scrRef:e,onScrRefChange:n,onSelectionChange:r,onUsjChange:o,onStateChange:i,options:s,logger:a,children:c},u){const d=w.useRef(null),p=w.useRef(null),f=w.useRef(null),h=w.useRef(t),b=w.useRef(),[x,E]=w.useState(t),[C,_]=w.useState(0),{isReadonly:D=!1,hasExternalUI:$=!1,hasSpellCheck:H=!1,textDirection:O="ltr",markerMenuTrigger:V="\\",view:B=oT,nodes:F=iT,debug:Y=!1}=s??sT;Wf.editable=!D,nc.initialize(a),w.useImperativeHandle(u,()=>({focus(){var M;(M=d.current)==null||M.focus()},undo(){var M;(M=d.current)==null||M.dispatchCommand(g.UNDO_COMMAND,void 0)},redo(){var M;(M=d.current)==null||M.dispatchCommand(g.REDO_COMMAND,void 0)},cut(){var M;(M=d.current)==null||M.dispatchCommand(g.CUT_COMMAND,null)},copy(){var M;(M=d.current)==null||M.dispatchCommand(g.COPY_COMMAND,null)},paste(){d.current&&id(d.current)},pastePlainText(){d.current&&sd(d.current)},getUsj(){return h.current},setUsj(M){if(!lr(h.current,M)){h.current=M;const S=lr(x,M);E(M),S&&_(I=>I+1)}},applyUpdate(M,S="remote"){var I,T;(I=d.current)==null||I.update(()=>{S==="remote"&&g.$addUpdateTag(Fc),Uk(M,B,F,a)},{discrete:!0});const A=(T=d.current)==null?void 0:T.getEditorState();if(!A)return;const P=nc.deserializeEditorState(A);if(P){const L=!lr(h.current,P);if(L&&(h.current=P),L||!lr(x,P)){const J=Ef(M,A);o==null||o(P,M,S,J)}}},replaceEmbedUpdate(M,S){var I;const T=(I=d.current)==null?void 0:I.read(()=>XE(M,S));T&&this.applyUpdate(T)},getSelection(){var M;return(M=d.current)==null?void 0:M.read(Sm)},setSelection(M){var S;(S=d.current)==null||S.update(()=>{const I=Xu(M);I!==void 0&&g.$setSelection(I)},{tag:nm})},addAnnotation(M,S,I){var T;(T=p.current)==null||T.addAnnotation(M,gf(S),I)},removeAnnotation(M,S){var I;(I=p.current)==null||I.removeAnnotation(gf(M),S)},formatPara(M){var S;(S=d.current)==null||S.update(()=>{const I=g.$getSelection();g.$isRangeSelection(I)&&Xx(I,()=>ns(M))})},getElementByKey(M){var S;return(S=d.current)==null?void 0:S.read(()=>{var I;return((I=d.current)==null?void 0:I.getElementByKey(M))??void 0})},insertNote(M,S,I){var T;(T=d.current)==null||T.update(()=>{const A=LE(M,S,I,e,B,F,a);A&&!A.getIsCollapsed()&&(b.current=A.getKey())})},selectNote(M){var S;(S=d.current)==null||S.update(()=>{const I=_f(M);I&&(PE(I,B),I.getIsCollapsed()||(b.current=I.getKey()))})},getNoteOps(M){var S;return(S=d.current)==null?void 0:S.read(()=>{const I=_f(M);if(I)return td(I)})},get toolbarEndRef(){return f}}));const N=w.useCallback((M,S,I,T)=>{if(F1.some(P=>I.has(P)))return;const A=nc.deserializeEditorState(M);if(A){const P=!lr(h.current,A);if(P&&(h.current=A),P||!lr(x,A)){const L=I.has(Fc)?"remote":"local",J=Ef(T,M);o==null||o(A,T,L,J)}}},[x,o]);return l.jsxs(Uw,{initialConfig:Wf,children:[l.jsx(vN,{isEditable:!D}),l.jsxs("div",{className:"editor-container",children:[$?l.jsx(Vm,{onStateChange:i}):l.jsx("div",{className:"editor-toolbar-container"+(D?"-readonly":"-editable"),children:l.jsx(rT,{ref:f,editorRef:u,isReadonly:D,onStateChange:i})}),l.jsxs("div",{className:"editor-inner",children:[l.jsx(Kw,{editorRef:d}),l.jsx(A2,{contentEditable:l.jsx(Gw,{className:`editor-input usfm ${tS(B).join(" ")}`,spellCheck:H}),placeholder:l.jsx(aT,{}),ErrorBoundary:Yw}),l.jsx(Ww,{}),e&&n&&l.jsx(GS,{scrRef:e,onScrRefChange:n}),e&&l.jsx(zN,{trigger:V,scrRef:e,getMarkerAction:(M,S)=>$S(M,b,S,B)}),l.jsx(zS,{options:{view:B,nodes:F},editedUsjRef:h,usj:x,setUsj:E}),l.jsx(xN,{scripture:x,nodeOptions:F,editorAdaptor:Kc,viewOptions:B,logger:a},C),l.jsx(ON,{onChange:r}),l.jsx(Bk,{onChange:N,ignoreSelectionChange:!0,ignoreHistoryMergeTagChange:!0}),l.jsx(Fk,{ref:p,logger:a}),l.jsx(oN,{viewOptions:B}),l.jsx(uN,{}),l.jsx(fN,{}),l.jsx(hN,{logger:a}),l.jsx(bN,{}),l.jsx(yN,{expandedNoteKeyRef:b,nodeOptions:F,viewOptions:B,logger:a}),l.jsx(jN,{}),l.jsx($N,{textDirection:O}),l.jsx(BN,{}),c]}),Y&&l.jsx(WS,{})]})]})}),lT=w.forwardRef(function(t,e){const{children:n,...r}=t;return l.jsx(Wm,{ref:e,...r})});function Jm(){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5)}function Ra(t,e,n,r,o){return{author:e,content:t,deleted:o===void 0?!1:o,id:n===void 0?Jm():n,timeStamp:r===void 0?performance.timeOrigin+performance.now():r,type:"comment"}}function Xm(t,e,n){return{comments:e,id:n===void 0?Jm():n,quote:t,type:"thread"}}function Jf(t){return{comments:Array.from(t.comments),id:t.id,quote:t.quote,type:"thread"}}function cT(t){return{author:t.author,content:"[Deleted Comment]",deleted:!0,id:t.id,timeStamp:t.timeStamp,type:"comment"}}function rc(t){const e=t._changeListeners;for(const n of e)n()}class uT{constructor(e,n){de(this,"_editor"),de(this,"_comments"),de(this,"_changeListeners"),de(this,"_collabProvider"),de(this,"logger"),this._comments=[],this._editor=e,this.logger=n,this._collabProvider=null,this._changeListeners=new Set}isCollaborative(){return this._collabProvider!==null}getComments(){return this._comments}setComments(e){this._comments=e,rc(this)}addComment(e,n,r){const o=Array.from(this._comments),i=this._getCollabComments();if(n!==void 0&&e.type==="comment")for(let s=0;s<o.length;s++){const a=o[s];if(a.type==="thread"&&a.id===n.id){const c=Jf(a);o.splice(s,1,c);const u=r!==void 0?r:c.comments.length;if(this.isCollaborative()&&i!==null){const d=i.get(s).get("comments");this._withRemoteTransaction(()=>{const p=this._createCollabSharedMap(e);d.insert(u,[p])})}c.comments.splice(u,0,e);break}}else{const s=r!==void 0?r:o.length;this.isCollaborative()&&i!==null&&this._withRemoteTransaction(()=>{const a=this._createCollabSharedMap(e);i.insert(s,[a])}),o.splice(s,0,e)}this._comments=o,rc(this)}deleteCommentOrThread(e,n){const r=Array.from(this._comments),o=this._getCollabComments();let i=null;if(n!==void 0)for(let s=0;s<r.length;s++){const a=r[s];if(a.type==="thread"&&a.id===n.id){const c=Jf(a);r.splice(s,1,c);const u=c.comments;if(i=u.indexOf(e),this.isCollaborative()&&o!==null){const d=o.get(s).get("comments"),p=i;this._withRemoteTransaction(()=>{d.delete(p)})}u.splice(i,1);break}}else i=r.indexOf(e),this.isCollaborative()&&o!==null&&this._withRemoteTransaction(()=>{o.delete(i)}),r.splice(i,1);return this._comments=r,rc(this),e.type==="comment"?{index:i,markedComment:cT(e)}:null}registerOnChange(e){const n=this._changeListeners;return n.add(e),()=>{n.delete(e)}}_withRemoteTransaction(e){const n=this._collabProvider;n!==null&&n.doc.transact(e,this)}_withLocalTransaction(e){const n=this._collabProvider;try{this._collabProvider=null,e()}finally{this._collabProvider=n}}_getCollabComments(){const e=this._collabProvider;return e!==null?e.doc.get("comments",oo):null}_createCollabSharedMap(e){const n=new Zo,r=e.type,o=e.id;if(n.set("type",r),n.set("id",o),r==="comment")n.set("author",e.author),n.set("content",e.content),n.set("deleted",e.deleted),n.set("timeStamp",e.timeStamp);else{n.set("quote",e.quote);const i=new oo;e.comments.forEach((s,a)=>{const c=this._createCollabSharedMap(s);i.insert(a,[c])}),n.set("comments",i)}return n}registerCollaboration(e){this._collabProvider=e;const n=this._getCollabComments(),r=()=>{e.connect()},o=()=>{try{e.disconnect()}catch{}},i=this._editor.registerCommand(D1,a=>{var c,u;return r!==void 0&&o!==void 0&&(a?((c=this.logger)==null||c.info("Comments connected!"),r()):((u=this.logger)==null||u.info("Comments disconnected!"),o())),!1},g.COMMAND_PRIORITY_LOW),s=(a,c)=>{if(c.origin!==this){for(const u of a)if(u instanceof Vg){const d=u.target,p=u.delta;let f=0;for(const h of p){const b=h.insert,x=h.retain,E=h.delete,C=d.parent,_=d===n?void 0:C instanceof Zo&&this._comments.find(D=>D.id===C.get("id"));if(Array.isArray(b)){const D=f;b.slice().reverse().forEach($=>{const H=$.get("id"),O=$.get("type")==="thread"?Xm($.get("quote"),$.get("comments").toArray().map(V=>Ra(V.get("content"),V.get("author"),V.get("id"),V.get("timeStamp"),V.get("deleted"))),H):Ra($.get("content"),$.get("author"),H,$.get("timeStamp"),$.get("deleted"));this._withLocalTransaction(()=>{this.addComment(O,_,D)})})}else if(typeof x=="number")f+=x;else if(typeof E=="number")for(let D=0;D<E;D++){const $=_===void 0||_===!1?this._comments[f]:_.comments[f];this._withLocalTransaction(()=>{this.deleteCommentOrThread($,_)}),f++}}}}};return n===null?()=>null:(n.observeDeep(s),r(),()=>{n.unobserveDeep(s),i(),this._collabProvider=null})}}function dT(t){const[e,n]=w.useState(t.getComments());return w.useEffect(()=>t.registerOnChange(()=>{n(t.getComments())}),[t]),e}function pT({onClose:t,children:e,title:n,closeOnClickOutside:r}){const o=w.useRef(null);return w.useEffect(()=>{o.current!==null&&o.current.focus()},[]),w.useEffect(()=>{let i=null;const s=u=>{u.key==="Escape"&&t()},a=u=>{const d=u.target;o.current!==null&&!o.current.contains(d)&&r&&t()},c=o.current;return c!==null&&(i=c.parentElement,i!==null&&i.addEventListener("click",a)),window.addEventListener("keydown",s),()=>{window.removeEventListener("keydown",s),i!==null&&(i==null||i.removeEventListener("click",a))}},[r,t]),l.jsx("div",{className:"Modal__overlay",role:"dialog",children:l.jsxs("div",{className:"Modal__modal",tabIndex:-1,ref:o,children:[l.jsx("h2",{className:"Modal__title",children:n}),l.jsx("button",{className:"Modal__closeButton","aria-label":"Close modal",type:"button",onClick:t,children:"X"}),l.jsx("div",{className:"Modal__content",children:e})]})})}function fT({onClose:t,children:e,title:n,closeOnClickOutside:r=!1}){return Xt.createPortal(l.jsx(pT,{onClose:t,title:n,closeOnClickOutside:r,children:e}),document.body)}function Qm(){const[t,e]=w.useState(null),n=w.useCallback(()=>{e(null)},[]),r=w.useMemo(()=>{if(t===null)return null;const{title:i,content:s,closeOnClickOutside:a}=t;return l.jsx(fT,{onClose:n,title:i,closeOnClickOutside:a,children:s})},[t,n]),o=w.useCallback((i,s,a=!1)=>{e({closeOnClickOutside:a,content:s(n),title:i})},[n]);return[r,o]}const hT={...Km,paragraph:"CommentEditorTheme__paragraph"};function wT(...t){return t.filter(Boolean).join(" ")}function Ir({"data-test-id":t,children:e,className:n,onClick:r,disabled:o,small:i,title:s}){return l.jsx("button",{disabled:o,className:wT("Button__root",o&&"Button__disabled",i&&"Button__small",n),onClick:r,title:s,"aria-label":s,...t&&{"data-test-id":t},children:e})}function gT({className:t}){return l.jsx(Gw,{className:t||"ContentEditable__root"})}function mT({children:t,className:e}){return l.jsx("div",{className:e||"Placeholder__root",children:t})}const Xf=g.createCommand("INSERT_INLINE_COMMAND");function bT({anchorKey:t,editor:e,showComments:n,onAddComment:r}){const o=w.useRef(null),i=w.useCallback(()=>{const s=o.current,a=e.getRootElement(),c=e.getElementByKey(t);if(s!==null&&a!==null&&c!==null){const{right:u}=a.getBoundingClientRect(),{top:d}=c.getBoundingClientRect();s.style.left=`${u-20}px`,s.style.top=`${d-30}px`}},[t,e]);return w.useEffect(()=>(window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i)}),[e,i]),w.useLayoutEffect(()=>{i()},[t,e,n,i]),l.jsx("div",{className:"CommentPlugin_AddCommentBox",ref:o,children:l.jsx("button",{className:"CommentPlugin_AddCommentBox_button",onClick:r,children:l.jsx("i",{className:"icon add-comment"})})})}function vT({onEscape:t}){const[e]=Ce();return w.useEffect(()=>e.registerCommand(g.KEY_ESCAPE_COMMAND,n=>t(n),g.COMMAND_PRIORITY_NORMAL),[e,t]),null}function Zm({className:t,autoFocus:e,onEscape:n,onChange:r,editorRef:o,placeholder:i="Type a comment..."}){return l.jsx(Uw,{initialConfig:{namespace:"Commenting",nodes:[],onError:s=>{throw s},theme:hT},children:l.jsxs("div",{className:"CommentPlugin_CommentInputBox_EditorContainer",children:[l.jsx(F_,{contentEditable:l.jsx(gT,{className:t}),placeholder:l.jsx(mT,{children:i}),ErrorBoundary:Yw}),l.jsx(D_,{onChange:r}),l.jsx(Ww,{}),e!==!1&&l.jsx(k_,{}),l.jsx(vT,{onEscape:n}),l.jsx(S_,{}),o!==void 0&&l.jsx(Kw,{editorRef:o})]})})}function eb(t,e){return w.useCallback((n,r)=>{n.read(()=>{t(Vw()),e(!Hw(r.isComposing(),!0))})},[e,t])}function xT({editor:t,cancelAddComment:e,submitAddComment:n}){const[r,o]=w.useState(""),[i,s]=w.useState(!1),a=w.useRef(null),c=w.useMemo(()=>({container:document.createElement("div"),elements:[]}),[]),u=w.useRef(null),d=nb(),p=w.useCallback(()=>{t.getEditorState().read(()=>{const x=g.$getSelection();if(g.$isRangeSelection(x)){u.current=x.clone();const E=x.anchor,C=x.focus,_=Kx(t,E.getNode(),E.offset,C.getNode(),C.offset),D=a.current;if(_!==null&&D!==null){const{left:$,bottom:H,width:O}=_.getBoundingClientRect(),V=Yx(t,_);let B=V.length===1?$+O/2-125:$-125;B<10&&(B=10),D.style.left=`${B}px`,D.style.top=`${H+20+(window.pageYOffset||document.documentElement.scrollTop)}px`;const F=V.length,{container:Y}=c,N=c.elements,M=N.length;for(let S=0;S<F;S++){const I=V[S];let T=N[S];T===void 0&&(T=document.createElement("span"),N[S]=T,Y.appendChild(T));const A=`position:absolute;top:${I.top+(window.pageYOffset||document.documentElement.scrollTop)}px;left:${I.left}px;height:${I.height}px;width:${I.width}px;background-color:rgba(255, 212, 0, 0.3);pointer-events:none;z-index:5;`;T.style.cssText=A}for(let S=M-1;S>=F;S--){const I=N[S];Y.removeChild(I),N.pop()}}}})},[t,c]);w.useLayoutEffect(()=>{p();const x=c.container,E=document.body;return E!==null?(E.appendChild(x),()=>{E.removeChild(x)}):()=>{}},[c.container,p]),w.useEffect(()=>(window.addEventListener("resize",p),()=>{window.removeEventListener("resize",p)}),[p]);const f=x=>(x.preventDefault(),e(),!0),h=()=>{if(i){let x=t.getEditorState().read(()=>{const E=u.current;return E?E.getTextContent():""});x.length>100&&(x=x.slice(0,99)+"…"),n(Xm(x,[Ra(r,d)]),!0,void 0,u.current),u.current=null}},b=eb(o,s);return l.jsxs("div",{className:"CommentPlugin_CommentInputBox",ref:a,children:[l.jsx(Zm,{className:"CommentPlugin_CommentInputBox_Editor",onEscape:f,onChange:b}),l.jsxs("div",{className:"CommentPlugin_CommentInputBox_Buttons",children:[l.jsx(Ir,{onClick:e,className:"CommentPlugin_CommentInputBox_Button",children:"Cancel"}),l.jsx(Ir,{onClick:h,disabled:!i,className:"CommentPlugin_CommentInputBox_Button primary",children:"Comment"})]})]})}function yT({submitAddComment:t,thread:e,placeholder:n}){const[r,o]=w.useState(""),[i,s]=w.useState(!1),a=w.useRef(null),c=nb(),u=eb(o,s);return l.jsxs(l.Fragment,{children:[l.jsx(Zm,{className:"CommentPlugin_CommentsPanel_Editor",autoFocus:!1,onEscape:()=>!0,onChange:u,editorRef:a,placeholder:n}),l.jsx(Ir,{className:"CommentPlugin_CommentsPanel_SendButton",onClick:()=>{if(i){t(Ra(r,c),!1,e);const d=a.current;d!==null&&d.dispatchCommand(g.CLEAR_EDITOR_COMMAND,void 0)}},disabled:!i,children:l.jsx("i",{className:"send"})})]})}function tb({commentOrThread:t,deleteCommentOrThread:e,onClose:n,thread:r=void 0}){return l.jsxs(l.Fragment,{children:["Are you sure you want to delete this ",t.type,"?",l.jsxs("div",{className:"Modal__content",children:[l.jsx(Ir,{onClick:()=>{e(t,r),n()},children:"Delete"})," ",l.jsx(Ir,{onClick:()=>{n()},children:"Cancel"})]})]})}function Qf({comment:t,deleteComment:e,thread:n,rtf:r}){const o=Math.round((t.timeStamp-(performance.timeOrigin+performance.now()))/1e3),i=Math.round(o/60),[s,a]=Qm();return l.jsxs("li",{className:"CommentPlugin_CommentsPanel_List_Comment",children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Details",children:[l.jsx("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Author",children:t.author}),l.jsxs("span",{className:"CommentPlugin_CommentsPanel_List_Comment_Time",children:["· ",o>-10?"Just now":r.format(i,"minute")]})]}),l.jsx("p",{className:t.deleted?"CommentPlugin_CommentsPanel_DeletedComment":"",children:t.content}),!t.deleted&&l.jsxs(l.Fragment,{children:[l.jsx(Ir,{onClick:()=>{a("Delete Comment",c=>l.jsx(tb,{commentOrThread:t,deleteCommentOrThread:e,thread:n,onClose:c}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),s]})]})}function _T({activeIDs:t,comments:e,deleteCommentOrThread:n,listRef:r,submitAddComment:o,markNodeMap:i}){const[s]=Ce(),[a,c]=w.useState(0),[u,d]=Qm(),p=w.useMemo(()=>new Intl.RelativeTimeFormat("en",{localeMatcher:"best fit",numeric:"auto",style:"short"}),[]);return w.useEffect(()=>{const f=setTimeout(()=>{c(a+1)},1e4);return()=>{clearTimeout(f)}},[a]),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List",ref:r,children:e.map(f=>{const h=f.id;return f.type==="thread"?l.jsxs("li",{onClick:()=>{const b=i.get(h);if(b!==void 0&&(t===null||t.indexOf(h)===-1)){const x=document.activeElement;s.update(()=>{const E=Array.from(b)[0],C=g.$getNodeByKey(E);Dt(C)&&C.selectStart()},{onUpdate(){x!==null&&x.focus()}})}},className:`CommentPlugin_CommentsPanel_List_Thread ${i.has(h)?"interactive":""} ${t.indexOf(h)===-1?"":"active"}`,children:[l.jsxs("div",{className:"CommentPlugin_CommentsPanel_List_Thread_QuoteBox",children:[l.jsxs("blockquote",{className:"CommentPlugin_CommentsPanel_List_Thread_Quote",children:["> ",l.jsx("span",{children:f.quote})]}),l.jsx(Ir,{onClick:()=>{d("Delete Thread",b=>l.jsx(tb,{commentOrThread:f,deleteCommentOrThread:n,onClose:b}))},className:"CommentPlugin_CommentsPanel_List_DeleteButton",children:l.jsx("i",{className:"delete"})}),u]}),l.jsx("ul",{className:"CommentPlugin_CommentsPanel_List_Thread_Comments",children:f.comments.map(b=>l.jsx(Qf,{comment:b,deleteComment:n,thread:f,rtf:p},b.id))}),l.jsx("div",{className:"CommentPlugin_CommentsPanel_List_Thread_Editor",children:l.jsx(yT,{submitAddComment:o,thread:f,placeholder:"Reply to comment..."})})]},h):l.jsx(Qf,{comment:f,deleteComment:n,rtf:p},h)})})}function CT({activeIDs:t,deleteCommentOrThread:e,comments:n,submitAddComment:r,markNodeMap:o}){const i=w.useRef(null),s=n.length===0;return l.jsxs("div",{className:"CommentPlugin_CommentsPanel",children:[l.jsx("h2",{className:"CommentPlugin_CommentsPanel_Heading",children:"Comments"}),s?l.jsx("div",{className:"CommentPlugin_CommentsPanel_Empty",children:"No Comments"}):l.jsx(_T,{activeIDs:t,comments:n,deleteCommentOrThread:e,listRef:i,submitAddComment:r,markNodeMap:o})]})}function nb(){const t=ug(),{yjsDocMap:e,name:n}=t;return e.has("comments")?n:"Scripture User"}function ET({providerFactory:t,setCommentStore:e,onChange:n,showCommentsContainerRef:r,commentContainerRef:o,logger:i}){const s=ug(),[a]=Ce(),c=w.useMemo(()=>{const B=new uT(a,i);return n&&B.registerOnChange(n),e==null||e(B),B},[a,i,n,e]),u=dT(c),d=w.useMemo(()=>new Map,[]),[p,f]=w.useState(),[h,b]=w.useState([]),[x,E]=w.useState(!1),[C,_]=w.useState(!1),{yjsDocMap:D}=s;w.useEffect(()=>{if(t){const B=t("comments",D);return c.registerCollaboration(B)}return()=>{}},[c,t,D]);const $=w.useCallback(()=>{a.update(()=>{const B=g.$getSelection();B!==null&&(B.dirty=!0)}),E(!1)},[a]),H=w.useCallback((B,F)=>{if(B.type==="comment"){const Y=c.deleteCommentOrThread(B,F);if(!Y)return;const{markedComment:N,index:M}=Y;c.addComment(N,F,M)}else{c.deleteCommentOrThread(B);const Y=F!==void 0?F.id:B.id,N=d.get(Y);N!==void 0&&setTimeout(()=>{a.update(()=>{for(const M of N){const S=g.$getNodeByKey(M);Dt(S)&&(S.deleteID(kr,Y),S.hasNoIDsForEveryType()&&_m(S))}})})}},[c,a,d]),O=w.useCallback((B,F,Y,N)=>{c.addComment(B,Y),F&&(a.update(()=>{g.$isRangeSelection(N)&&Cm(N,kr,B.id)}),E(!1))},[c,a]);w.useEffect(()=>{const B=[];for(const F of h){const Y=d.get(F);if(Y!==void 0)for(const N of Y){const M=a.getElementByKey(N);M!==null&&(M.classList.add("selected"),B.push(M),_(!0))}}return()=>{for(const F of B)F.classList.remove("selected")}},[h,a,d]),w.useEffect(()=>{if(!a.hasNodes([Tt]))throw new Error("CommentPlugin: TypedMarkNode not registered on editor!");const B=new Map;return Mt(Ew(a,Tt,F=>rs(F.getTypedIDs()),(F,Y)=>{for(const[N,M]of Object.entries(F.getTypedIDs()))M.forEach(S=>{Y.addID(N,S)})}),a.registerMutationListener(Tt,F=>{a.getEditorState().read(()=>{for(const[Y,N]of F){const M=g.$getNodeByKey(Y);let S=[];N==="destroyed"?S=B.get(Y)??[]:Dt(M)&&(S=M.getTypedIDs()[kr]??[]);for(const I of S){let T=d.get(I);B.set(Y,S),N==="destroyed"?T!==void 0&&(T.delete(Y),T.size===0&&d.delete(I)):(T===void 0&&(T=new Set,d.set(I,T)),T.has(Y)||T.add(Y))}}})},{skipInitialization:!1}),a.registerUpdateListener(({editorState:F,tags:Y})=>{F.read(()=>{const N=g.$getSelection();let M=!1,S=!1;if(g.$isRangeSelection(N)){const I=N.anchor.getNode();if(g.$isTextNode(I)){const T=CE(I,kr,N.anchor.offset)??[];T!==null&&(b(T),M=!0),N.isCollapsed()||(f(I.getKey()),S=!0)}}M||b(I=>I.length===0?I:[]),S||f(null),!Y.has("collaboration")&&g.$isRangeSelection(N)&&E(!1)})}),a.registerCommand(Xf,()=>{const F=window.getSelection();return F!==null&&F.removeAllRanges(),E(!0),!0},g.COMMAND_PRIORITY_EDITOR))},[a,d]);const V=()=>{a.dispatchCommand(Xf,void 0)};return l.jsxs(l.Fragment,{children:[x&&Xt.createPortal(l.jsx(xT,{editor:a,cancelAddComment:$,submitAddComment:O}),document.body),p!=null&&!x&&Xt.createPortal(l.jsx(bT,{anchorKey:p,editor:a,showComments:C,onAddComment:V}),document.body),r!==null&&Xt.createPortal(l.jsx(Ir,{className:`CommentPlugin_ShowCommentsButton ${C?"active":""}`,onClick:()=>_(!C),title:C?"Hide Comments":"Show Comments",children:l.jsx("i",{className:"comments"})}),(r==null?void 0:r.current)??document.body),C&&Xt.createPortal(l.jsx(CT,{comments:u,submitAddComment:O,deleteCommentOrThread:H,activeIDs:h,markNodeMap:d}),(o==null?void 0:o.current)??document.body)]})}function kT(){const t=w.useRef(void 0),e=w.useCallback(n=>{t.current=n},[]);return[t,e]}function NT(t,e){var n,r;const o=((n=e.current)==null?void 0:n.getComments())??[],i=o==null?void 0:o.map(a=>a.id),s=t.map(a=>{const c=i.findIndex(u=>u===a);return c!==void 0&&c>=0?o[c]:{comments:[{author:"unknown",content:"Comment not found",deleted:!1,id:"",timeStamp:0,type:"comment"}],id:a,quote:"",type:"thread"}});o.forEach(a=>{t.includes(a.id)||s.push(a)}),s&&((r=e.current)==null||r.setComments(s))}function ST(t,e){w.useEffect(()=>{var n;t.options??(t.options={}),(n=t.options).nodes??(n.nodes={}),t.options.nodes.addMissingComments=r=>{NT(r,e)}},[e,t])}w.forwardRef(function(t,e){const n=w.useRef(null),r=w.useRef(!0),o=w.useRef(null),[i,s]=w.useState(null),{children:a,onCommentChange:c,onUsjChange:u,showCommentsContainerRef:d,...p}=t,{options:{isReadonly:f}={}}=t,[h,b]=kT();ST(p,h),w.useImperativeHandle(e,()=>({focus(){var C;(C=n.current)==null||C.focus()},undo(){var C;(C=n.current)==null||C.undo()},redo(){var C;(C=n.current)==null||C.redo()},cut(){var C;(C=n.current)==null||C.cut()},copy(){var C;(C=n.current)==null||C.copy()},paste(){var C;(C=n.current)==null||C.paste()},pastePlainText(){var C;(C=n.current)==null||C.pastePlainText()},getUsj(){var C;return(C=n.current)==null?void 0:C.getUsj()},setUsj(C){var _;(_=n.current)==null||_.setUsj(C)},applyUpdate(C,_){var D;(D=n.current)==null||D.applyUpdate(C,_)},replaceEmbedUpdate(C,_){var D;return(D=n.current)==null?void 0:D.replaceEmbedUpdate(C,_)},getSelection(){var C;return(C=n.current)==null?void 0:C.getSelection()},setSelection(C){var _;(_=n.current)==null||_.setSelection(C)},addAnnotation(C,_,D){var $;($=n.current)==null||$.addAnnotation(C,_,D)},removeAnnotation(C,_){var D;(D=n.current)==null||D.removeAnnotation(C,_)},formatPara(C){var _;(_=n.current)==null||_.formatPara(C)},getElementByKey(C){var _;return(_=n.current)==null?void 0:_.getElementByKey(C)},insertNote(C,_,D){var $;($=n.current)==null||$.insertNote(C,_,D)},selectNote(C){var _;(_=n.current)==null||_.selectNote(C)},getNoteOps(C){var _;return(_=n.current)==null?void 0:_.getNoteOps(C)},setComments(C){var _;(_=h.current)==null||_.setComments(C),r.current=!0},get toolbarEndRef(){return i}}));const x=w.useCallback((C,_,D,$)=>{var H;if(!u)return;const O=(H=h.current)==null?void 0:H.getComments();u(C,O,_,D,$)},[h,u]),E=w.useCallback(()=>{var C;if(!c||r.current){r.current=!1;return}const _=(C=h.current)==null?void 0:C.getComments();c(_)},[h,r,c]);return w.useEffect(()=>{var C;return s(((C=n.current)==null?void 0:C.toolbarEndRef)??null),()=>s(null)},[]),l.jsxs(Wm,{ref:n,onUsjChange:x,...p,children:[l.jsx(ET,{setCommentStore:b,onChange:E,showCommentsContainerRef:f?null:d??i,commentContainerRef:o,logger:p.logger}),l.jsx("div",{ref:o,className:"comment-container"})]})});function TT({noteOps:t,onSave:e,onClose:n,scrRef:r,noteKey:o,viewOptions:i}){const s=w.useRef(null),a=w.createRef(),c=w.useMemo(()=>({isReadonly:!1,hasSpellCheck:!1,hasExternalUI:!0,textDirection:"auto",nodes:{noteCallerOnClick:(p,f,h,b,x)=>{h||(b()===ho?x($u):x(ho))}},view:{...i,noteMode:"expanded"}}),[i]);w.useEffect(()=>{var f,h;let p;return t&&!((h=(f=s.current)==null?void 0:f.getUsj())!=null&&h.content)&&(p=setTimeout(()=>{var b,x;(b=s.current)==null||b.setUsj(vu),(x=s.current)==null||x.applyUpdate(t)},0)),()=>{p&&clearTimeout(p)}},[t,o]);const u=()=>{var f;const p=(f=s.current)==null?void 0:f.getNoteOps(0);p&&e(p)},d=()=>{var f;const p=(f=a.current)==null?void 0:f.getElementsByClassName("editor-input")[0];p!=null&&p.textContent&&navigator.clipboard.writeText(p.textContent)};return l.jsxs("div",{className:"footnote-editor tw-grid tw-gap-[12px]",children:[l.jsxs("div",{className:"tw-flex tw-w-full tw-justify-end tw-gap-4",children:[l.jsx(ve,{onClick:n,className:"tw-h-6 tw-w-6",size:"icon",variant:"secondary",children:l.jsx(ie.X,{})}),l.jsx(ve,{onClick:u,className:"tw-h-6 tw-w-6",size:"icon",variant:"default",children:l.jsx(ie.Check,{})})]}),l.jsxs("div",{ref:a,className:"tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",children:[l.jsx(lT,{options:c,onScrRefChange:()=>{},scrRef:r,ref:s}),l.jsx("div",{className:"tw-absolute tw-bottom-0 tw-right-0",children:l.jsx(ve,{onClick:d,className:"tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(ie.Copy,{})})})]})]})}function rb(t,e){if(!e||e.length===0)return t??"empty";const n=e.find(o=>typeof o=="string");if(n)return`key-${t??"unknown"}-${n.slice(0,10)}`;const r=typeof e[0]=="string"?"impossible":e[0].marker??"unknown";return`key-${t??"unknown"}-${r}`}function AT(t,e,n=!0,r=void 0){if(!e||e.length===0)return;const o=[],i=[];let s=[];return e.forEach(a=>{typeof a!="string"&&a.marker==="fp"?(s.length>0&&i.push(s),s=[a]):s.push(a)}),s.length>0&&i.push(s),i.map((a,c)=>{const u=c===i.length-1;return l.jsxs("p",{className:"tw-mb-2",children:[cd(t,a,n,!0,o),u&&r]},rb(t,a))})}function cd(t,e,n=!0,r=!0,o=[]){if(!(!e||e.length===0))return e.map(i=>{if(typeof i=="string"){const s=`${t}-text-${i.slice(0,10)}`;if(r){const a=z(`usfm_${t}`);return l.jsx("span",{className:a,children:i},s)}return l.jsxs("span",{className:"tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",children:[l.jsx(ie.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"}),l.jsx("span",{children:i}),l.jsx(ie.AlertCircle,{className:"tw-h-4 tw-w-4 tw-fill-destructive"})]},s)}return DT(i,rb(`${t}\\${i.marker}`,[i]),n,[...o,t??"unknown"])})}function DT(t,e,n,r=[]){const{marker:o}=t;return l.jsxs("span",{children:[o?n&&l.jsx("span",{className:"marker",children:`\\${o} `}):l.jsx(ie.AlertCircle,{className:"tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4","aria-label":"Missing marker"}),cd(o,t.content,n,!0,[...r,o??"unknown"])]},e)}function ob({footnote:t,layout:e="horizontal",formatCaller:n,showMarkers:r=!0}){const o=n?n(t.caller):t.caller,i=o!==t.caller;let s,a=t.content;Array.isArray(t.content)&&t.content.length>0&&typeof t.content[0]!="string"&&(t.content[0].marker==="fr"||t.content[0].marker==="xo")&&([s,...a]=t.content);const c=r?l.jsx("span",{className:"marker",children:`\\${t.marker} `}):void 0,u=r?l.jsx("span",{className:"marker",children:` \\${t.marker}*`}):void 0,d=l.jsxs(l.Fragment,{children:[o&&l.jsxs("span",{className:z("note-caller",{formatted:i}),children:[o," "]}),s&&l.jsxs(l.Fragment,{children:[cd(t.marker,[s],r,!1)," "]})]}),h=z(e==="horizontal"?"horizontal tw-table-cell":"vertical",r?"marker-visible":"");return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:z("textual-note-header tw-text-nowrap tw-pr-2",h),children:[c,d]}),l.jsx("div",{className:z("textual-note-body tw-pr-0.5",h),children:a&&a.length>0&&l.jsx(l.Fragment,{children:AT(t.marker,a,r,u)})})]})}const MT=["%webView_footnoteList_header%"],RT=(t,e)=>t[e]??e;function OT({className:t,classNameForItems:e,footnotes:n,layout:r="horizontal",listId:o,selectedFootnote:i,showMarkers:s=!0,suppressFormatting:a=!1,formatCaller:c,onFootnoteSelected:u,localizedStrings:d}){const p=d?RT(d,"%webView_footnoteList_header%"):"Footnotes",f=c??ne.getFormatCallerFunction(n,void 0),h=(D,$)=>{u==null||u(D,$,o)},b=i?n.findIndex(D=>D===i):0,[x,E]=w.useState(b),C=D=>{if(n.length)switch(D.key){case"ArrowDown":D.preventDefault(),E($=>Math.min($+1,n.length-1));break;case"ArrowUp":D.preventDefault(),E($=>Math.max($-1,0));break;case"Enter":case" ":D.preventDefault(),u==null||u(n[x],x,o);break}},_=w.useRef([]);return w.useEffect(()=>{var D;x>=0&&x<_.current.length&&((D=_.current[x])==null||D.focus())},[x]),l.jsxs(l.Fragment,{children:[r==="vertical"&&l.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:p}),l.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:z("tw-h-full tw-overflow-y-auto",t),onKeyDown:C,children:l.jsx("div",{className:z("tw-p-0.5 tw-pt-1",r==="horizontal"?"tw-table":"tw-flex tw-flex-col tw-gap-1",!a&&"formatted-font"),children:n.map((D,$)=>{const H=D===i,O=`${o}-${$}`;return l.jsx(Ba,{ref:V=>{_.current[$]=V},role:"option","aria-selected":H,"data-marker":D.marker,"data-state":H?"selected":void 0,tabIndex:-1,className:z("data-[state=selected]:tw-bg-muted",u&&"hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none","focus:tw-outline-none focus-visible:tw-outline-none","focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",r==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm",e),onClick:()=>h(D,$),children:l.jsx(ob,{footnote:D,layout:r,formatCaller:()=>f(D.caller,$),showMarkers:s})},O)})})})]})}function jT({occurrenceData:t,setScriptureReference:e,localizedStrings:n}){const r=n["%webView_inventory_occurrences_table_header_reference%"],o=n["%webView_inventory_occurrences_table_header_occurrence%"],i=w.useMemo(()=>{const s=[];return t.forEach(a=>{s.some(c=>ne.deepEqual(c,a))||s.push(a)}),s},[t]);return l.jsxs(ps,{stickyHeader:!0,children:[l.jsx(fs,{stickyHeader:!0,children:l.jsxs(Jn,{children:[l.jsx(Ko,{children:r}),l.jsx(Ko,{children:o})]})}),l.jsx(hs,{children:i.length>0&&i.map(s=>l.jsxs(Jn,{onClick:()=>{e(s.reference)},children:[l.jsx(Sr,{children:`${Fe.bookIdToEnglishName(s.reference.book)} ${s.reference.chapterNum}:${s.reference.verseNum}`}),l.jsx(Sr,{children:s.text})]},`${s.reference.book} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`))})]})}const al=w.forwardRef(({className:t,...e},n)=>l.jsx(lc.Root,{ref:n,className:z("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",t),...e,children:l.jsx(lc.Indicator,{className:z("tw-flex tw-items-center tw-justify-center tw-text-current"),children:l.jsx(ie.Check,{className:"tw-h-4 tw-w-4"})})}));al.displayName=lc.Root.displayName;const vi=w.forwardRef(({className:t,type:e,...n},r)=>l.jsx("input",{type:e,className:z("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",t),ref:r,...n}));vi.displayName="Input";const ll=t=>t==="asc"?l.jsx(ie.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):t==="desc"?l.jsx(ie.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}):l.jsx(ie.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"}),IT=t=>({accessorKey:"item",accessorFn:e=>e.items[0],header:({column:e})=>l.jsxs(ve,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,ll(e.getIsSorted())]})}),LT=(t,e)=>({accessorKey:`item${e}`,accessorFn:n=>n.items[e],header:({column:n})=>l.jsxs(ve,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[t,ll(n.getIsSorted())]})}),$T=t=>({accessorKey:"count",header:({column:e})=>l.jsx("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:l.jsxs(ve,{variant:"ghost",onClick:()=>e.toggleSorting(void 0),children:[t,ll(e.getIsSorted())]})}),cell:({row:e})=>l.jsx("div",{className:"tw-flex tw-justify-end",children:e.getValue("count")})}),oc=(t,e,n,r,o,i)=>{let s=[...n];t.forEach(c=>{e==="approved"?s.includes(c)||s.push(c):s=s.filter(u=>u!==c)}),r(s);let a=[...o];t.forEach(c=>{e==="unapproved"?a.includes(c)||a.push(c):a=a.filter(u=>u!==c)}),i(a)},PT=(t,e,n,r,o)=>({accessorKey:"status",header:({column:i})=>l.jsx("div",{className:"tw-flex tw-justify-center",children:l.jsxs(ve,{variant:"ghost",onClick:()=>i.toggleSorting(void 0),children:[t,ll(i.getIsSorted())]})}),cell:({row:i})=>{const s=i.getValue("status"),a=i.getValue("item");return l.jsxs(za,{value:s,variant:"outline",type:"single",children:[l.jsx(Bo,{onClick:c=>{c.stopPropagation(),oc([a],"approved",e,n,r,o)},value:"approved",children:l.jsx(ie.CircleCheckIcon,{})}),l.jsx(Bo,{onClick:c=>{c.stopPropagation(),oc([a],"unapproved",e,n,r,o)},value:"unapproved",children:l.jsx(ie.CircleXIcon,{})}),l.jsx(Bo,{onClick:c=>{c.stopPropagation(),oc([a],"unknown",e,n,r,o)},value:"unknown",children:l.jsx(ie.CircleHelpIcon,{})})]})}}),FT=t=>t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),BT=t=>{const e=/^\\[vc]\s+(\d+)/,n=t.match(e);if(n)return+n[1]},qT=t=>{const e=t.match(/^\\id\s+([A-Za-z]+)/);return e?e[1]:""},ib=(t,e,n)=>n.includes(t)?"unapproved":e.includes(t)?"approved":"unknown",UT=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%","%webView_inventory_no_results%"]),VT=(t,e,n)=>{let r=t;return e!=="all"&&(r=r.filter(o=>e==="approved"&&o.status==="approved"||e==="unapproved"&&o.status==="unapproved"||e==="unknown"&&o.status==="unknown")),n!==""&&(r=r.filter(o=>o.items[0].includes(n))),r},HT=(t,e,n)=>{const r=[];return t.forEach(o=>{const i=r.find(s=>ne.deepEqual(s.items,ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(i)i.count+=1,i.occurrences.push({reference:o.verseRef,text:o.verse});else{const s={items:ne.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:ib(ne.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],e,n),occurrences:[{reference:o.verseRef,text:o.verse}]};r.push(s)}}),r},zn=(t,e)=>t[e]??e;function zT({inventoryItems:t,setVerseRef:e,localizedStrings:n,additionalItemsLabels:r,approvedItems:o,unapprovedItems:i,scope:s,onScopeChange:a,columns:c,id:u,areInventoryItemsLoading:d=!1}){const p=zn(n,"%webView_inventory_all%"),f=zn(n,"%webView_inventory_approved%"),h=zn(n,"%webView_inventory_unapproved%"),b=zn(n,"%webView_inventory_unknown%"),x=zn(n,"%webView_inventory_scope_currentBook%"),E=zn(n,"%webView_inventory_scope_chapter%"),C=zn(n,"%webView_inventory_scope_verse%"),_=zn(n,"%webView_inventory_filter_text%"),D=zn(n,"%webView_inventory_show_additional_items%"),$=zn(n,"%webView_inventory_no_results%"),[H,O]=w.useState(!1),[V,B]=w.useState("all"),[F,Y]=w.useState(""),[N,M]=w.useState([]),S=w.useMemo(()=>{const W=t??[];return W.length===0?[]:HT(W,o,i)},[t,o,i]),I=w.useMemo(()=>{if(H)return S;const W=[];return S.forEach(ee=>{const te=ee.items[0],Z=W.find(X=>X.items[0]===te);Z?(Z.count+=ee.count,Z.occurrences=Z.occurrences.concat(ee.occurrences)):W.push({items:[te],count:ee.count,occurrences:ee.occurrences,status:ee.status})}),W},[H,S]),T=w.useMemo(()=>I.length===0?[]:VT(I,V,F),[I,V,F]),A=w.useMemo(()=>{var te,Z;if(!H)return c;const W=(te=r==null?void 0:r.tableHeaders)==null?void 0:te.length;if(!W)return c;const ee=[];for(let X=0;X<W;X++)ee.push(LT(((Z=r==null?void 0:r.tableHeaders)==null?void 0:Z[X])||"Additional Item",X+1));return[...ee,...c]},[r==null?void 0:r.tableHeaders,c,H]);w.useEffect(()=>{T.length===0?M([]):T.length===1&&M(T[0].items)},[T]);const P=(W,ee)=>{ee.setRowSelection(()=>{const te={};return te[W.index]=!0,te}),M(W.original.items)},L=W=>{if(W==="book"||W==="chapter"||W==="verse")a(W);else throw new Error(`Invalid scope value: ${W}`)},J=W=>{if(W==="all"||W==="approved"||W==="unapproved"||W==="unknown")B(W);else throw new Error(`Invalid status filter value: ${W}`)},K=w.useMemo(()=>{if(I.length===0||N.length===0)return[];const W=I.filter(ee=>ne.deepEqual(H?ee.items:[ee.items[0]],N));if(W.length>1)throw new Error("Selected item is not unique");return W.length===0?[]:W[0].occurrences},[N,H,I]);return l.jsxs("div",{id:u,className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[l.jsxs("div",{className:"tw-flex tw-items-stretch",children:[l.jsxs(so,{onValueChange:W=>J(W),defaultValue:V,children:[l.jsx(Dr,{className:"tw-m-1",children:l.jsx(ao,{placeholder:"Select filter"})}),l.jsxs(Mr,{children:[l.jsx(hn,{value:"all",children:p}),l.jsx(hn,{value:"approved",children:f}),l.jsx(hn,{value:"unapproved",children:h}),l.jsx(hn,{value:"unknown",children:b})]})]}),l.jsxs(so,{onValueChange:W=>L(W),defaultValue:s,children:[l.jsx(Dr,{className:"tw-m-1",children:l.jsx(ao,{placeholder:"Select scope"})}),l.jsxs(Mr,{children:[l.jsx(hn,{value:"book",children:x}),l.jsx(hn,{value:"chapter",children:E}),l.jsx(hn,{value:"verse",children:C})]})]}),l.jsx(vi,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:_,value:F,onChange:W=>{Y(W.target.value)}}),r&&l.jsxs("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[l.jsx(al,{className:"tw-m-1",checked:H,onCheckedChange:W=>{O(W)}}),l.jsx(gt,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(r==null?void 0:r.checkboxText)??D})]})]}),l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(fw,{columns:A,data:T,onRowClickHandler:P,stickyHeader:!0,isLoading:d,noResultsMessage:$})}),K.length>0&&l.jsx("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:l.jsx(jT,{occurrenceData:K,setScriptureReference:e,localizedStrings:n})})]})}const GT="16rem",KT="3rem",sb=w.createContext(void 0);function ks(){const t=w.useContext(sb);if(!t)throw new Error("useSidebar must be used within a SidebarProvider.");return t}const ud=w.forwardRef(({defaultOpen:t=!0,open:e,onOpenChange:n,className:r,style:o,children:i,side:s="primary",...a},c)=>{const[u,d]=w.useState(t),p=e??u,f=w.useCallback(D=>{const $=typeof D=="function"?D(p):D;n?n($):d($)},[n,p]),h=w.useCallback(()=>f(D=>!D),[f]),b=p?"expanded":"collapsed",C=Et()==="ltr"?s:s==="primary"?"secondary":"primary",_=w.useMemo(()=>({state:b,open:p,setOpen:f,toggleSidebar:h,side:C}),[b,p,f,h,C]);return l.jsx(sb.Provider,{value:_,children:l.jsx(ls,{delayDuration:0,children:l.jsx("div",{style:{"--sidebar-width":GT,"--sidebar-width-icon":KT,...o},className:z("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",r),ref:c,...a,children:i})})})});ud.displayName="SidebarProvider";const dd=w.forwardRef(({variant:t="sidebar",collapsible:e="offcanvas",className:n,children:r,...o},i)=>{const s=ks();return e==="none"?l.jsx("div",{className:z("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",n),ref:i,...o,children:r}):l.jsxs("div",{ref:i,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":s.state,"data-collapsible":s.state==="collapsed"?e:"","data-variant":t,"data-side":s.side,children:[l.jsx("div",{className:z("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",t==="floating"||t==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")}),l.jsx("div",{className:z("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",s.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",t==="floating"||t==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",n),...o,children:l.jsx("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:r})})]})});dd.displayName="Sidebar";const ab=w.forwardRef(({className:t,onClick:e,...n},r)=>{const o=ks();return l.jsxs(ve,{ref:r,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:z("tw-h-7 tw-w-7",t),onClick:i=>{e==null||e(i),o.toggleSidebar()},...n,children:[o.side==="primary"?l.jsx(ie.PanelLeft,{}):l.jsx(ie.PanelRight,{}),l.jsx("span",{className:"tw-sr-only",children:"Toggle Sidebar"})]})});ab.displayName="SidebarTrigger";const lb=w.forwardRef(({className:t,...e},n)=>{const{toggleSidebar:r}=ks();return l.jsx("button",{type:"button",ref:n,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:r,title:"Toggle Sidebar",className:z("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",t),...e})});lb.displayName="SidebarRail";const pd=w.forwardRef(({className:t,...e},n)=>l.jsx("main",{ref:n,className:z("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",t),...e}));pd.displayName="SidebarInset";const cb=w.forwardRef(({className:t,...e},n)=>l.jsx(vi,{ref:n,"data-sidebar":"input",className:z("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",t),...e}));cb.displayName="SidebarInput";const ub=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"header",className:z("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));ub.displayName="SidebarHeader";const db=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"footer",className:z("tw-flex tw-flex-col tw-gap-2 tw-p-2",t),...e}));db.displayName="SidebarFooter";const pb=w.forwardRef(({className:t,...e},n)=>l.jsx(zo,{ref:n,"data-sidebar":"separator",className:z("tw-mx-2 tw-w-auto tw-bg-sidebar-border",t),...e}));pb.displayName="SidebarSeparator";const fd=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"content",className:z("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",t),...e}));fd.displayName="SidebarContent";const Oa=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group",className:z("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",t),...e}));Oa.displayName="SidebarGroup";const ja=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?si.Slot:"div";return l.jsx(o,{ref:r,"data-sidebar":"group-label",className:z("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",t),...n})});ja.displayName="SidebarGroupLabel";const fb=w.forwardRef(({className:t,asChild:e=!1,...n},r)=>{const o=e?si.Slot:"button";return l.jsx(o,{ref:r,"data-sidebar":"group-action",className:z("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",t),...n})});fb.displayName="SidebarGroupAction";const Ia=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"group-content",className:z("tw-w-full tw-text-sm",t),...e}));Ia.displayName="SidebarGroupContent";const hd=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu",className:z("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",t),...e}));hd.displayName="SidebarMenu";const wd=w.forwardRef(({className:t,...e},n)=>l.jsx("li",{ref:n,"data-sidebar":"menu-item",className:z("tw-group/menu-item tw-relative",t),...e}));wd.displayName="SidebarMenuItem";const YT=Lr.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),gd=w.forwardRef(({asChild:t=!1,isActive:e=!1,variant:n="default",size:r="default",tooltip:o,className:i,...s},a)=>{const c=t?si.Slot:"button",{state:u}=ks(),d=l.jsx(c,{ref:a,"data-sidebar":"menu-button","data-size":r,"data-active":e,className:z(YT({variant:n,size:r}),i),...s});return o?(typeof o=="string"&&(o={children:o}),l.jsxs(qa,{children:[l.jsx(Ua,{asChild:!0,children:d}),l.jsx(cs,{side:"right",align:"center",hidden:u!=="collapsed",...o})]})):d});gd.displayName="SidebarMenuButton";const hb=w.forwardRef(({className:t,asChild:e=!1,showOnHover:n=!1,...r},o)=>{const i=e?si.Slot:"button";return l.jsx(i,{ref:o,"data-sidebar":"menu-action",className:z("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",n&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",t),...r})});hb.displayName="SidebarMenuAction";const wb=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,"data-sidebar":"menu-badge",className:z("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));wb.displayName="SidebarMenuBadge";const gb=w.forwardRef(({className:t,showIcon:e=!1,...n},r)=>{const o=w.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return l.jsxs("div",{ref:r,"data-sidebar":"menu-skeleton",className:z("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",t),...n,children:[e&&l.jsx(fa,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"}),l.jsx(fa,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}})]})});gb.displayName="SidebarMenuSkeleton";const mb=w.forwardRef(({className:t,...e},n)=>l.jsx("ul",{ref:n,"data-sidebar":"menu-sub",className:z("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",t),...e}));mb.displayName="SidebarMenuSub";const bb=w.forwardRef(({...t},e)=>l.jsx("li",{ref:e,...t}));bb.displayName="SidebarMenuSubItem";const vb=w.forwardRef(({asChild:t=!1,size:e="md",isActive:n,className:r,...o},i)=>{const s=t?si.Slot:"a";return l.jsx(s,{ref:i,"data-sidebar":"menu-sub-button","data-size":e,"data-active":n,className:z("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",e==="sm"&&"tw-text-xs",e==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",r),...o})});vb.displayName="SidebarMenuSubButton";function xb({id:t,extensionLabels:e,projectInfo:n,handleSelectSidebarItem:r,selectedSidebarItem:o,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:s,buttonPlaceholderText:a,className:c}){const u=w.useCallback((f,h)=>{r(f,h)},[r]),d=w.useCallback(f=>{const h=n.find(b=>b.projectId===f);return h?h.projectName:f},[n]),p=w.useCallback(f=>!o.projectId&&f===o.label,[o]);return l.jsx(dd,{id:t,collapsible:"none",variant:"inset",className:z("tw-w-96 tw-gap-2 tw-overflow-y-auto",c),children:l.jsxs(fd,{children:[l.jsxs(Oa,{children:[l.jsx(ja,{className:"tw-text-sm",children:i}),l.jsx(Ia,{children:l.jsx(hd,{children:Object.entries(e).map(([f,h])=>l.jsx(wd,{children:l.jsx(gd,{onClick:()=>u(f),isActive:p(f),children:l.jsx("span",{className:"tw-pl-3",children:h})})},f))})})]}),l.jsxs(Oa,{children:[l.jsx(ja,{className:"tw-text-sm",children:s}),l.jsx(Ia,{className:"tw-pl-3",children:l.jsx(da,{buttonVariant:"ghost",buttonClassName:z("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:n.flatMap(f=>f.projectId),getOptionLabel:d,buttonPlaceholder:a,onChange:f=>{const h=d(f);u(h,f)},value:(o==null?void 0:o.projectId)??void 0,icon:l.jsx(ie.ScrollText,{})})})]})]})})}const cl=w.forwardRef(({value:t,onSearch:e,placeholder:n,isFullWidth:r,className:o,isDisabled:i=!1,id:s},a)=>{const c=Et();return l.jsxs("div",{id:s,className:z("tw-relative",{"tw-w-full":r},o),children:[l.jsx(ie.Search,{className:z("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":c==="rtl"},{"tw-left-3":c==="ltr"})}),l.jsx(vi,{ref:a,className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:n,value:t,onChange:u=>e(u.target.value),disabled:i}),t&&l.jsxs(ve,{variant:"ghost",size:"icon",className:z("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":c==="rtl"},{"tw-right-0":c==="ltr"}),onClick:()=>{e("")},children:[l.jsx(ie.X,{className:"tw-h-4 tw-w-4"}),l.jsx("span",{className:"tw-sr-only",children:"Clear"})]})]})});cl.displayName="SearchBar";function WT({id:t,extensionLabels:e,projectInfo:n,children:r,handleSelectSidebarItem:o,selectedSidebarItem:i,searchValue:s,onSearch:a,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}){return l.jsxs("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[l.jsx("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:l.jsx(cl,{className:"tw-w-9/12",value:s,onSearch:a,placeholder:"Search app settings, extension settings, and project settings"})}),l.jsxs(ud,{id:t,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[l.jsx(xb,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:e,projectInfo:n,handleSelectSidebarItem:o,selectedSidebarItem:i,extensionsSidebarGroupLabel:c,projectsSidebarGroupLabel:u,buttonPlaceholderText:d}),l.jsx(pd,{className:"tw-min-w-[215px]",children:r})]})]})}const xr="scrBook",JT="scrRef",eo="source",XT="details",QT="Scripture Reference",ZT="Scripture Book",yb="Type",eA="Details";function tA(t,e){const n=e??!1;return[{accessorFn:r=>`${r.start.book} ${r.start.chapterNum}:${r.start.verseNum}`,id:xr,header:(t==null?void 0:t.scriptureReferenceColumnName)??QT,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?Fe.bookIdToEnglishName(o.start.book):r.row.groupingColumnId===xr?ne.formatScrRef(o.start):void 0},getGroupingValue:r=>Fe.bookIdToNumber(r.start.book),sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!0},{accessorFn:r=>ne.formatScrRef(r.start),id:JT,header:void 0,cell:r=>{const o=r.row.original;return r.row.getIsGrouped()?void 0:ne.formatScrRef(o.start)},sortingFn:(r,o)=>ne.compareScrRefs(r.original.start,o.original.start),enableGrouping:!1},{accessorFn:r=>r.source.displayName,id:eo,header:n?(t==null?void 0:t.typeColumnName)??yb:void 0,cell:r=>n||r.row.getIsGrouped()?r.getValue():void 0,getGroupingValue:r=>r.source.id,sortingFn:(r,o)=>r.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:r=>r.detail,id:XT,header:(t==null?void 0:t.detailsColumnName)??eA,cell:r=>r.getValue(),enableGrouping:!1}]}const nA=t=>{if(!("offset"in t.start))throw new Error("No offset available in range start");if(t.end&&!("offset"in t.end))throw new Error("No offset available in range end");const{offset:e}=t.start;let n=0;return t.end&&({offset:n}=t.end),!t.end||ne.compareScrRefs(t.start,t.end)===0?`${ne.scrRefToBBBCCCVVV(t.start)}+${e}`:`${ne.scrRefToBBBCCCVVV(t.start)}+${e}-${ne.scrRefToBBBCCCVVV(t.end)}+${n}`},Zf=t=>`${nA({start:t.start,end:t.end})} ${t.source.displayName} ${t.detail}`;function rA({sources:t,showColumnHeaders:e=!1,showSourceColumn:n=!1,scriptureReferenceColumnName:r,scriptureBookGroupName:o,typeColumnName:i,detailsColumnName:s,onRowSelected:a,id:c}){const[u,d]=w.useState([]),[p,f]=w.useState([{id:xr,desc:!1}]),[h,b]=w.useState({}),x=w.useMemo(()=>t.flatMap(F=>F.data.map(Y=>({...Y,source:F.source}))),[t]),E=w.useMemo(()=>tA({scriptureReferenceColumnName:r,typeColumnName:i,detailsColumnName:s},n),[r,i,s,n]);w.useEffect(()=>{u.includes(eo)?f([{id:eo,desc:!1},{id:xr,desc:!1}]):f([{id:xr,desc:!1}])},[u]);const C=Vt.useReactTable({data:x,columns:E,state:{grouping:u,sorting:p,rowSelection:h},onGroupingChange:d,onSortingChange:f,onRowSelectionChange:b,getExpandedRowModel:Vt.getExpandedRowModel(),getGroupedRowModel:Vt.getGroupedRowModel(),getCoreRowModel:Vt.getCoreRowModel(),getSortedRowModel:Vt.getSortedRowModel(),getRowId:Zf,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});w.useEffect(()=>{if(a){const F=C.getSelectedRowModel().rowsById,Y=Object.keys(F);if(Y.length===1){const N=x.find(M=>Zf(M)===Y[0])||void 0;N&&a(N)}}},[h,x,a,C]);const _=o??ZT,D=i??yb,$=[{label:"No Grouping",value:[]},{label:`Group by ${_}`,value:[xr]},{label:`Group by ${D}`,value:[eo]},{label:`Group by ${_} and ${D}`,value:[xr,eo]},{label:`Group by ${D} and ${_}`,value:[eo,xr]}],H=F=>{d(JSON.parse(F))},O=(F,Y)=>{!F.getIsGrouped()&&!F.getIsSelected()&&F.getToggleSelectedHandler()(Y)},V=(F,Y)=>F.getIsGrouped()?"":z("banded-row",Y%2===0?"even":"odd"),B=(F,Y,N)=>{if(!((F==null?void 0:F.length)===0||Y.depth<N.column.getGroupedIndex())){if(Y.getIsGrouped())switch(Y.depth){case 1:return"tw-ps-4";default:return}switch(Y.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return l.jsxs("div",{id:c,className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!e&&l.jsxs(so,{value:JSON.stringify(u),onValueChange:F=>{H(F)},children:[l.jsx(Dr,{className:"tw-mb-1 tw-mt-2",children:l.jsx(ao,{})}),l.jsx(Mr,{position:"item-aligned",children:l.jsx(aw,{children:$.map(F=>l.jsx(hn,{value:JSON.stringify(F.value),children:F.label},F.label))})})]}),l.jsxs(ps,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[e&&l.jsx(fs,{children:C.getHeaderGroups().map(F=>l.jsx(Jn,{children:F.headers.filter(Y=>Y.column.columnDef.header).map(Y=>l.jsx(Ko,{colSpan:Y.colSpan,className:"top-0 tw-sticky",children:Y.isPlaceholder?void 0:l.jsxs("div",{children:[Y.column.getCanGroup()?l.jsx(ve,{variant:"ghost",title:`Toggle grouping by ${Y.column.columnDef.header}`,onClick:Y.column.getToggleGroupingHandler(),type:"button",children:Y.column.getIsGrouped()?"🛑":"👊 "}):void 0," ",Vt.flexRender(Y.column.columnDef.header,Y.getContext())]})},Y.id))},F.id))}),l.jsx(hs,{children:C.getRowModel().rows.map((F,Y)=>{const N=Et();return l.jsx(Jn,{"data-state":F.getIsSelected()?"selected":"",className:z(V(F,Y)),onClick:M=>O(F,M),children:F.getVisibleCells().map(M=>{if(!(M.getIsPlaceholder()||M.column.columnDef.enableGrouping&&!M.getIsGrouped()&&(M.column.columnDef.id!==eo||!n)))return l.jsx(Sr,{className:z(M.column.columnDef.id,"tw-p-[1px]",B(u,F,M)),children:M.getIsGrouped()?l.jsxs(ve,{variant:"link",onClick:F.getToggleExpandedHandler(),type:"button",children:[F.getIsExpanded()&&l.jsx(ie.ChevronDown,{}),!F.getIsExpanded()&&(N==="ltr"?l.jsx(ie.ChevronRight,{}):l.jsx(ie.ChevronLeft,{}))," ",Vt.flexRender(M.column.columnDef.cell,M.getContext())," (",F.subRows.length,")"]}):Vt.flexRender(M.column.columnDef.cell,M.getContext())},M.id)})},F.id)})})]})]})}const md=(t,e)=>t.filter(n=>{try{return ne.getSectionForBook(n)===e}catch{return!1}}),_b=(t,e,n)=>md(t,e).every(r=>n.includes(r));function oA({section:t,availableBookIds:e,selectedBookIds:n,onToggle:r,localizedStrings:o}){const i=md(e,t).length===0,s=o["%scripture_section_ot_short%"],a=o["%scripture_section_nt_short%"],c=o["%scripture_section_dc_short%"],u=o["%scripture_section_extra_short%"];return l.jsx(ve,{variant:"outline",size:"sm",onClick:()=>r(t),className:z(_b(e,t,n)&&!i&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:i,children:Q0(t,s,a,c,u)})}const eh=5,ic=6;function iA({availableBookInfo:t,selectedBookIds:e,onChangeSelectedBookIds:n,localizedStrings:r,localizedBookNames:o}){const i=r["%webView_book_selector_books_selected%"],s=r["%webView_book_selector_select_books%"],a=r["%webView_book_selector_search_books%"],c=r["%webView_book_selector_select_all%"],u=r["%webView_book_selector_clear_all%"],d=r["%webView_book_selector_no_book_found%"],p=r["%webView_book_selector_more%"],{otLong:f,ntLong:h,dcLong:b,extraLong:x}={otLong:r==null?void 0:r["%scripture_section_ot_long%"],ntLong:r==null?void 0:r["%scripture_section_nt_long%"],dcLong:r==null?void 0:r["%scripture_section_dc_long%"],extraLong:r==null?void 0:r["%scripture_section_extra_long%"]},[E,C]=w.useState(!1),[_,D]=w.useState(""),$=w.useRef(void 0),H=w.useRef(!1);if(t.length!==Fe.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const O=w.useMemo(()=>Fe.allBookIds.filter((I,T)=>t[T]==="1"&&!Fe.isObsolete(Fe.bookIdToNumber(I))),[t]),V=w.useMemo(()=>{if(!_.trim()){const A={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return O.forEach(P=>{const L=ne.getSectionForBook(P);A[L].push(P)}),A}const I=O.filter(A=>tu(A,_,o)),T={[ne.Section.OT]:[],[ne.Section.NT]:[],[ne.Section.DC]:[],[ne.Section.Extra]:[]};return I.forEach(A=>{const P=ne.getSectionForBook(A);T[P].push(A)}),T},[O,_,o]),B=w.useCallback((I,T=!1)=>{if(!T||!$.current){n(e.includes(I)?e.filter(W=>W!==I):[...e,I]),$.current=I;return}const A=O.findIndex(W=>W===$.current),P=O.findIndex(W=>W===I);if(A===-1||P===-1)return;const[L,J]=[Math.min(A,P),Math.max(A,P)],K=O.slice(L,J+1).map(W=>W);n(e.includes(I)?e.filter(W=>!K.includes(W)):[...new Set([...e,...K])])},[e,n,O]),F=I=>{B(I,H.current),H.current=!1},Y=(I,T)=>{I.preventDefault(),B(T,I.shiftKey)},N=w.useCallback(I=>{const T=md(O,I).map(A=>A);n(_b(O,I,e)?e.filter(A=>!T.includes(A)):[...new Set([...e,...T])])},[e,n,O]),M=()=>{n(O.map(I=>I))},S=()=>{n([])};return l.jsxs("div",{className:"tw-space-y-2",children:[l.jsx("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(ne.Section).map(I=>l.jsx(oA,{section:I,availableBookIds:O,selectedBookIds:e,onToggle:N,localizedStrings:r},I))}),l.jsxs(_o,{open:E,onOpenChange:I=>{C(I),I||D("")},children:[l.jsx(Co,{asChild:!0,children:l.jsxs(ve,{variant:"outline",role:"combobox","aria-expanded":E,className:"tw-max-w-64 tw-justify-between",children:[e.length>0?`${i}: ${e.length}`:s,l.jsx(ie.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"})]})}),l.jsx(Pr,{className:"tw-w-full tw-p-0",align:"start",children:l.jsxs(xo,{shouldFilter:!1,onKeyDown:I=>{I.key==="Enter"&&(H.current=I.shiftKey)},children:[l.jsx(li,{placeholder:a,value:_,onValueChange:D}),l.jsxs("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[l.jsx(ve,{variant:"ghost",size:"sm",onClick:M,children:c}),l.jsx(ve,{variant:"ghost",size:"sm",onClick:S,children:u})]}),l.jsxs(yo,{children:[l.jsx(as,{children:d}),Object.values(ne.Section).map((I,T)=>{const A=V[I];if(A.length!==0)return l.jsxs(w.Fragment,{children:[l.jsx(Tr,{heading:bh(I,f,h,b,x),children:A.map(P=>l.jsx(xh,{bookId:P,isSelected:e.includes(P),onSelect:()=>F(P),onMouseDown:L=>Y(L,P),section:ne.getSectionForBook(P),showCheck:!0,localizedBookNames:o,commandValue:dc(P,o),className:"tw-flex tw-items-center"},P))}),T<Object.values(ne.Section).length-1&&l.jsx(dh,{})]},I)})]})]})})]}),e.length>0&&l.jsxs("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[e.slice(0,e.length===ic?ic:eh).map(I=>l.jsx(Go,{className:"hover:tw-bg-secondary",variant:"secondary",children:Fo(I,o)},I)),e.length>ic&&l.jsx(Go,{className:"hover:tw-bg-secondary",variant:"secondary",children:`+${e.length-eh} ${p}`})]})]})}const sA=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),Xr=(t,e)=>t[e]??e;function aA({scope:t,availableScopes:e,onScopeChange:n,availableBookInfo:r,selectedBookIds:o,onSelectedBookIdsChange:i,localizedStrings:s,localizedBookNames:a,id:c}){const u=Xr(s,"%webView_scope_selector_selected_text%"),d=Xr(s,"%webView_scope_selector_current_verse%"),p=Xr(s,"%webView_scope_selector_current_chapter%"),f=Xr(s,"%webView_scope_selector_current_book%"),h=Xr(s,"%webView_scope_selector_choose_books%"),b=Xr(s,"%webView_scope_selector_scope%"),x=Xr(s,"%webView_scope_selector_select_books%"),E=[{value:"selectedText",label:u,id:"scope-selected-text"},{value:"verse",label:d,id:"scope-verse"},{value:"chapter",label:p,id:"scope-chapter"},{value:"book",label:f,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],C=e?E.filter(_=>e.includes(_.value)):E;return l.jsxs("div",{id:c,className:"tw-grid tw-gap-4",children:[l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(gt,{children:b}),l.jsx(Fa,{value:t,onValueChange:n,className:"tw-flex tw-flex-col tw-space-y-1",children:C.map(({value:_,label:D,id:$})=>l.jsxs("div",{className:"tw-flex tw-items-center",children:[l.jsx(qi,{className:"tw-me-2",value:_,id:$}),l.jsx(gt,{htmlFor:$,children:D})]},$))})]}),t==="selectedBooks"&&l.jsxs("div",{className:"tw-grid tw-gap-2",children:[l.jsx(gt,{children:x}),l.jsx(iA,{availableBookInfo:r,selectedBookIds:o,onChangeSelectedBookIds:i,localizedStrings:s,localizedBookNames:a})]})]})}const sc={[ne.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[ne.getLocalizeKeyForScrollGroupId(0)]:"A",[ne.getLocalizeKeyForScrollGroupId(1)]:"B",[ne.getLocalizeKeyForScrollGroupId(2)]:"C",[ne.getLocalizeKeyForScrollGroupId(3)]:"D",[ne.getLocalizeKeyForScrollGroupId(4)]:"E",[ne.getLocalizeKeyForScrollGroupId(5)]:"F",[ne.getLocalizeKeyForScrollGroupId(6)]:"G",[ne.getLocalizeKeyForScrollGroupId(7)]:"H",[ne.getLocalizeKeyForScrollGroupId(8)]:"I",[ne.getLocalizeKeyForScrollGroupId(9)]:"J",[ne.getLocalizeKeyForScrollGroupId(10)]:"K",[ne.getLocalizeKeyForScrollGroupId(11)]:"L",[ne.getLocalizeKeyForScrollGroupId(12)]:"M",[ne.getLocalizeKeyForScrollGroupId(13)]:"N",[ne.getLocalizeKeyForScrollGroupId(14)]:"O",[ne.getLocalizeKeyForScrollGroupId(15)]:"P",[ne.getLocalizeKeyForScrollGroupId(16)]:"Q",[ne.getLocalizeKeyForScrollGroupId(17)]:"R",[ne.getLocalizeKeyForScrollGroupId(18)]:"S",[ne.getLocalizeKeyForScrollGroupId(19)]:"T",[ne.getLocalizeKeyForScrollGroupId(20)]:"U",[ne.getLocalizeKeyForScrollGroupId(21)]:"V",[ne.getLocalizeKeyForScrollGroupId(22)]:"W",[ne.getLocalizeKeyForScrollGroupId(23)]:"X",[ne.getLocalizeKeyForScrollGroupId(24)]:"Y",[ne.getLocalizeKeyForScrollGroupId(25)]:"Z"};function lA({availableScrollGroupIds:t,scrollGroupId:e,onChangeScrollGroupId:n,localizedStrings:r={},size:o="sm",className:i,id:s}){const a={...sc,...Object.fromEntries(Object.entries(r).map(([u,d])=>[u,u===d&&u in sc?sc[u]:d]))},c=Et();return l.jsxs(so,{value:`${e}`,onValueChange:u=>n(u==="undefined"?void 0:parseInt(u,10)),children:[l.jsx(Dr,{size:o,className:z("pr-twp tw-w-auto",i),children:l.jsx(ao,{placeholder:a[ne.getLocalizeKeyForScrollGroupId(e)]??e})}),l.jsx(Mr,{id:s,align:c==="rtl"?"end":"start",style:{zIndex:250},children:t.map(u=>l.jsx(hn,{value:`${u}`,children:a[ne.getLocalizeKeyForScrollGroupId(u)]},`${u}`))})]})}function cA({children:t}){return l.jsx("div",{className:"pr-twp tw-grid",children:t})}function uA({primary:t,secondary:e,children:n,isLoading:r=!1,loadingMessage:o}){return l.jsxs("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:t}),l.jsx("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:e})]}),r?l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:o}):l.jsx("div",{children:n})]})}function dA({primary:t,secondary:e,includeSeparator:n=!1}){return l.jsxs("div",{className:"tw-space-y-4 tw-py-2",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"tw-text-lg tw-font-medium",children:t}),l.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:e})]}),n?l.jsx(zo,{}):""]})}function Cb(t,e){var n;return(n=Object.entries(t).find(([,r])=>"menuItem"in r&&r.menuItem===e))==null?void 0:n[0]}function La({icon:t,menuLabel:e,leading:n}){return t?l.jsx("img",{className:z("tw-max-h-5 tw-max-w-5",n?"tw-me-2":"tw-ms-2"),src:t,alt:`${n?"Leading":"Trailing"} icon for ${e}`}):void 0}const Eb=(t,e,n,r)=>n?Object.entries(t).filter(([i,s])=>"column"in s&&s.column===n||i===n).sort(([,i],[,s])=>i.order-s.order).flatMap(([i])=>e.filter(a=>a.group===i).sort((a,c)=>a.order-c.order).map(a=>l.jsxs(qa,{children:[l.jsx(Ua,{asChild:!0,children:"command"in a?l.jsxs(wu,{onClick:()=>{r(a)},children:[a.iconPathBefore&&l.jsx(La,{icon:a.iconPathBefore,menuLabel:a.label,leading:!0}),a.label,a.iconPathAfter&&l.jsx(La,{icon:a.iconPathAfter,menuLabel:a.label})]},`dropdown-menu-item-${a.label}-${a.command}`):l.jsxs(ow,{children:[l.jsx(fu,{children:a.label}),l.jsx(rw,{children:l.jsx(hu,{children:Eb(t,e,Cb(t,a.id),r)})})]},`dropdown-menu-sub-${a.label}-${a.id}`)}),a.tooltip&&l.jsx(cs,{children:a.tooltip})]},`tooltip-${a.label}-${"command"in a?a.command:a.id}`))):void 0;function $a({onSelectMenuItem:t,menuData:e,tabLabel:n,icon:r,className:o,variant:i,buttonVariant:s="ghost",id:a}){return l.jsxs(us,{variant:i,children:[l.jsx(Ga,{"aria-label":n,className:o,asChild:!0,id:a,children:l.jsx(ve,{variant:s,size:"icon",children:r??l.jsx(ie.MenuIcon,{})})}),l.jsx(ui,{align:"start",className:"tw-z-[250]",children:Object.entries(e.columns).filter(([,c])=>typeof c=="object").sort(([,c],[,u])=>typeof c=="boolean"||typeof u=="boolean"?0:c.order-u.order).map(([c],u,d)=>l.jsxs(w.Fragment,{children:[l.jsx(pu,{children:l.jsx(ls,{children:Eb(e.groups,e.items,c,t)})}),u<d.length-1&&l.jsx(ds,{})]},c))})]})}const kb=w.forwardRef(({id:t,className:e,children:n},r)=>l.jsx("div",{ref:r,className:`tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,id:t,children:n}));function pA({onSelectProjectMenuItem:t,onSelectViewInfoMenuItem:e,projectMenuData:n,tabViewMenuData:r,id:o,className:i,startAreaChildren:s,centerAreaChildren:a,endAreaChildren:c,menuButtonIcon:u}){return l.jsxs(kb,{className:`tw-w-full tw-border ${i}`,id:o,children:[n&&l.jsx($a,{onSelectMenuItem:t,menuData:n,tabLabel:"Project",icon:u??l.jsx(ie.Menu,{}),buttonVariant:"ghost"}),s&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:s}),a&&l.jsx("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:a}),l.jsxs("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[r&&l.jsx($a,{onSelectMenuItem:e,menuData:r,tabLabel:"View Info",icon:l.jsx(ie.EllipsisVertical,{}),className:"tw-h-full"}),c]})]})}function fA({onSelectProjectMenuItem:t,projectMenuData:e,id:n,className:r,menuButtonIcon:o}){return l.jsx(kb,{className:"tw-pointer-events-none",id:n,children:e&&l.jsx($a,{onSelectMenuItem:t,menuData:e,tabLabel:"Project",icon:o,className:`tw-pointer-events-auto tw-shadow-lg ${r}`,buttonVariant:"outline"})})}const bd=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsx(tn.Root,{orientation:"vertical",ref:n,className:z("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",t),...e,dir:r})});bd.displayName=tn.List.displayName;const vd=w.forwardRef(({className:t,...e},n)=>l.jsx(tn.List,{ref:n,className:z("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e}));vd.displayName=tn.List.displayName;const Nb=w.forwardRef(({className:t,...e},n)=>l.jsx(tn.Trigger,{ref:n,...e,className:z("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t)})),xd=w.forwardRef(({className:t,...e},n)=>l.jsx(tn.Content,{ref:n,className:z("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));xd.displayName=tn.Content.displayName;function hA({tabList:t,searchValue:e,onSearch:n,searchPlaceholder:r,headerTitle:o,searchClassName:i,id:s}){return l.jsxs("div",{id:s,className:"pr-twp",children:[l.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?l.jsx("h1",{children:o}):"",l.jsx(cl,{className:i,value:e,onSearch:n,placeholder:r})]}),l.jsxs(bd,{children:[l.jsx(vd,{children:t.map(a=>l.jsx(Nb,{value:a.value,children:a.value},a.key))}),t.map(a=>l.jsx(xd,{value:a.value,children:a.content},a.key))]})]})}function wA({...t}){return l.jsx(We.Menu,{...t})}function gA({...t}){return l.jsx(We.Sub,{"data-slot":"menubar-sub",...t})}const Sb=w.forwardRef(({className:t,variant:e="default",...n},r)=>{const o=w.useMemo(()=>({variant:e}),[e]);return l.jsx(du.Provider,{value:o,children:l.jsx(We.Root,{ref:r,className:z("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",t),...n})})});Sb.displayName=We.Root.displayName;const Tb=w.forwardRef(({className:t,...e},n)=>{const r=$n();return l.jsx(We.Trigger,{ref:n,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground","pr-twp",fr({variant:r.variant,className:t})),...e})});Tb.displayName=We.Trigger.displayName;const Ab=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>{const i=$n();return l.jsxs(We.SubTrigger,{ref:o,className:z("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",fr({variant:i.variant,className:t}),t),...r,children:[n,l.jsx(ie.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]})});Ab.displayName=We.SubTrigger.displayName;const Db=w.forwardRef(({className:t,...e},n)=>{const r=$n();return l.jsx(We.SubContent,{ref:n,className:z("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":r.variant==="muted"},t),...e})});Db.displayName=We.SubContent.displayName;const Mb=w.forwardRef(({className:t,align:e="start",alignOffset:n=-4,sideOffset:r=8,...o},i)=>{const s=$n();return l.jsx(We.Portal,{children:l.jsx(We.Content,{ref:i,align:e,alignOffset:n,sideOffset:r,className:z("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":s.variant==="muted"},t),...o})})});Mb.displayName=We.Content.displayName;const Rb=w.forwardRef(({className:t,inset:e,...n},r)=>{const o=$n();return l.jsx(We.Item,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",fr({variant:o.variant,className:t}),t),...n})});Rb.displayName=We.Item.displayName;const mA=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>{const i=$n();return l.jsxs(We.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",fr({variant:i.variant,className:t}),t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(We.ItemIndicator,{children:l.jsx(ie.Check,{className:"tw-h-4 tw-w-4"})})}),e]})});mA.displayName=We.CheckboxItem.displayName;const bA=w.forwardRef(({className:t,children:e,...n},r)=>{const o=$n();return l.jsxs(We.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",fr({variant:o.variant,className:t}),t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(We.ItemIndicator,{children:l.jsx(ie.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]})});bA.displayName=We.RadioItem.displayName;const vA=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(We.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",e&&"tw-pl-8",t),...n}));vA.displayName=We.Label.displayName;const Ob=w.forwardRef(({className:t,...e},n)=>l.jsx(We.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",t),...e}));Ob.displayName=We.Separator.displayName;const Ri=(t,e)=>{setTimeout(()=>{e.forEach(n=>{var r;(r=t.current)==null||r.dispatchEvent(new KeyboardEvent("keydown",n))})},0)},jb=(t,e,n,r)=>{if(!n)return;const o=Object.entries(t).filter(([i,s])=>"column"in s&&s.column===n||i===n).sort(([,i],[,s])=>i.order-s.order);return o.flatMap(([i],s)=>{const a=e.filter(u=>u.group===i).sort((u,d)=>u.order-d.order).map(u=>l.jsxs(qa,{children:[l.jsx(Ua,{asChild:!0,children:"command"in u?l.jsxs(Rb,{onClick:()=>{r(u)},children:[u.iconPathBefore&&l.jsx(La,{icon:u.iconPathBefore,menuLabel:u.label,leading:!0}),u.label,u.iconPathAfter&&l.jsx(La,{icon:u.iconPathAfter,menuLabel:u.label})]},`menubar-item-${u.label}-${u.command}`):l.jsxs(gA,{children:[l.jsx(Ab,{children:u.label}),l.jsx(Db,{children:jb(t,e,Cb(t,u.id),r)})]},`menubar-sub-${u.label}-${u.id}`)}),u.tooltip&&l.jsx(cs,{children:u.tooltip})]},`tooltip-${u.label}-${"command"in u?u.command:u.id}`)),c=[...a];return a.length>0&&s<o.length-1&&c.push(l.jsx(Ob,{},`separator-${i}`)),c})};function xA({menuData:t,onSelectMenuItem:e,onOpenChange:n,variant:r}){const o=w.useRef(void 0),i=w.useRef(void 0),s=w.useRef(void 0),a=w.useRef(void 0),c=w.useRef(void 0),u=d=>{switch(d){case"platform.app":return i;case"platform.window":return s;case"platform.layout":return a;case"platform.help":return c;default:return}};if(T0.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(d,p)=>{var b,x,E,C;d.preventDefault();const f={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},h={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(p.hotkey){case"alt":Ri(i,[f]);break;case"alt+p":(b=i.current)==null||b.focus(),Ri(i,[f,h]);break;case"alt+l":(x=s.current)==null||x.focus(),Ri(s,[f,h]);break;case"alt+n":(E=a.current)==null||E.focus(),Ri(a,[f,h]);break;case"alt+h":(C=c.current)==null||C.focus(),Ri(c,[f,h]);break}}),w.useEffect(()=>{if(!n||!o.current)return;const d=new MutationObserver(h=>{h.forEach(b=>{if(b.attributeName==="data-state"&&b.target instanceof HTMLElement){const x=b.target.getAttribute("data-state");n(x==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(h=>{d.observe(h,{attributes:!0})}),()=>d.disconnect()},[n]),!!t)return l.jsx(Sb,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:r,children:Object.entries(t.columns).filter(([,d])=>typeof d=="object").sort(([,d],[,p])=>typeof d=="boolean"||typeof p=="boolean"?0:d.order-p.order).map(([d,p])=>l.jsxs(wA,{children:[l.jsx(Tb,{ref:u(d),children:typeof p=="object"&&"label"in p&&p.label}),l.jsx(Mb,{className:"tw-z-[250]",children:l.jsx(ls,{children:jb(t.groups,t.items,d,e)})})]},d))})}function yA(t){switch(t){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function _A({menuData:t,onOpenChange:e,onSelectMenuItem:n,className:r,id:o,children:i,appMenuAreaChildren:s,configAreaChildren:a,shouldUseAsAppDragArea:c,menubarVariant:u="default"}){const d=w.useRef(void 0);return l.jsx("div",{className:z("tw-border tw-px-4 tw-text-foreground",r),ref:d,style:{position:"relative"},id:o,children:l.jsxs("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:c?{WebkitAppRegion:"drag"}:void 0,children:[l.jsx("div",{className:"tw-flex tw-grow tw-basis-0",children:l.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:[s,t&&l.jsx(xA,{menuData:t,onOpenChange:e,onSelectMenuItem:n,variant:u})]})}),l.jsx("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:i}),l.jsx("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:l.jsx("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:c?{WebkitAppRegion:"no-drag"}:void 0,children:a})})]})})}const CA=(t,e)=>t[e]??e;function EA({knownUiLanguages:t,primaryLanguage:e="en",fallbackLanguages:n=[],onLanguagesChange:r,onPrimaryLanguageChange:o,onFallbackLanguagesChange:i,localizedStrings:s,className:a,id:c}){const u=CA(s,"%settings_uiLanguageSelector_fallbackLanguages%"),[d,p]=w.useState(!1),f=b=>{o&&o(b),r&&r([b,...n.filter(x=>x!==b)]),i&&n.find(x=>x===b)&&i([...n.filter(x=>x!==b)]),p(!1)},h=(b,x)=>{var C,_,D,$,H,O;const E=x!==b?((_=(C=t[b])==null?void 0:C.uiNames)==null?void 0:_[x])??(($=(D=t[b])==null?void 0:D.uiNames)==null?void 0:$.en):void 0;return E?`${(H=t[b])==null?void 0:H.autonym} (${E})`:(O=t[b])==null?void 0:O.autonym};return l.jsxs("div",{id:c,className:z("pr-twp tw-max-w-sm",a),children:[l.jsxs(so,{name:"uiLanguage",value:e,onValueChange:f,open:d,onOpenChange:b=>p(b),children:[l.jsx(Dr,{children:l.jsx(ao,{})}),l.jsx(Mr,{className:"tw-z-[250]",children:Object.keys(t).map(b=>l.jsx(hn,{value:b,children:h(b,e)},b))})]}),e!=="en"&&l.jsx("div",{className:"tw-pt-3",children:l.jsx(gt,{className:"tw-font-normal tw-text-muted-foreground",children:ne.formatReplacementString(u,{fallbackLanguages:(n==null?void 0:n.length)>0?n.map(b=>h(b,e)).join(", "):t.en.autonym})})})]})}function kA({item:t,createLabel:e,createComplexLabel:n}){return e?l.jsx(gt,{children:e(t)}):n?l.jsx(gt,{children:n(t)}):l.jsx(gt,{children:t})}function NA({id:t,className:e,listItems:n,selectedListItems:r,handleSelectListItem:o,createLabel:i,createComplexLabel:s}){return l.jsx("div",{id:t,className:e,children:n.map(a=>l.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[l.jsx(al,{className:"tw-me-2 tw-align-middle",checked:r.includes(a),onCheckedChange:c=>o(a,c)}),l.jsx(kA,{item:a,createLabel:i,createComplexLabel:s})]},a))})}function SA({cardKey:t,isSelected:e,onSelect:n,isDenied:r,isHidden:o=!1,className:i,children:s,dropdownContent:a,additionalSelectedContent:c,accentColor:u}){const d=p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),n())};return l.jsxs("div",{hidden:o,onClick:n,onKeyDown:d,role:"button",tabIndex:0,"aria-pressed":e,className:z("tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",{"tw-opacity-50 hover:tw-opacity-100":r&&!e},{"tw-bg-accent":e},{"tw-bg-transparent":!e},i),children:[l.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-p-4",children:[l.jsxs("div",{className:"tw-flex tw-justify-between tw-overflow-hidden",children:[l.jsx("div",{className:"tw-min-w-0 tw-flex-1",children:s}),e&&a&&l.jsxs(us,{children:[l.jsx(Ga,{className:z(u&&"tw-me-1"),asChild:!0,children:l.jsx(ve,{className:"tw-m-1 tw-h-6 tw-w-6",variant:"ghost",size:"icon",children:l.jsx(ie.MoreHorizontal,{})})}),l.jsx(ui,{align:"end",children:a})]})]}),e&&c&&l.jsx("div",{className:"tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden",children:c})]}),u&&l.jsx("div",{className:`tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${u}`})]},t)}const Ib=w.forwardRef(({className:t,...e},n)=>l.jsx(ie.LoaderCircle,{size:35,className:z("tw-animate-spin",t),...e,ref:n}));Ib.displayName="Spinner";function TA({id:t,isDisabled:e=!1,hasError:n=!1,isFullWidth:r=!1,helperText:o,label:i,placeholder:s,isRequired:a=!1,className:c,defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}){return l.jsxs("div",{className:z("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":r}),children:[l.jsx(gt,{htmlFor:t,className:z({"tw-text-red-600":n,"tw-hidden":!i}),children:`${i}${a?"*":""}`}),l.jsx(vi,{id:t,disabled:e,placeholder:s,required:a,className:z(c,{"tw-border-red-600":n}),defaultValue:u,value:d,onChange:p,onFocus:f,onBlur:h}),l.jsx("p",{className:z({"tw-hidden":!o}),children:o})]})}const AA=Lr.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),Lb=w.forwardRef(({className:t,variant:e,...n},r)=>l.jsx("div",{ref:r,role:"alert",className:z("pr-twp",AA({variant:e}),t),...n}));Lb.displayName="Alert";const $b=w.forwardRef(({className:t,...e},n)=>l.jsxs("h5",{ref:n,className:z("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",t),...e,children:[e.children," "]}));$b.displayName="AlertTitle";const Pb=w.forwardRef(({className:t,...e},n)=>l.jsx("div",{ref:n,className:z("tw-text-sm [&_p]:tw-leading-relaxed",t),...e}));Pb.displayName="AlertDescription";const DA=Je.Root,MA=Je.Trigger,RA=Je.Group,OA=Je.Portal,jA=Je.Sub,IA=Je.RadioGroup,Fb=w.forwardRef(({className:t,inset:e,children:n,...r},o)=>l.jsxs(Je.SubTrigger,{ref:o,className:z("pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",e&&"tw-pl-8",t),...r,children:[n,l.jsx(ie.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"})]}));Fb.displayName=Je.SubTrigger.displayName;const Bb=w.forwardRef(({className:t,...e},n)=>l.jsx(Je.SubContent,{ref:n,className:z("pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e}));Bb.displayName=Je.SubContent.displayName;const qb=w.forwardRef(({className:t,...e},n)=>l.jsx(Je.Portal,{children:l.jsx(Je.Content,{ref:n,className:z("pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",t),...e})}));qb.displayName=Je.Content.displayName;const Ub=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Je.Item,{ref:r,className:z("pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e&&"tw-pl-8",t),...n}));Ub.displayName=Je.Item.displayName;const Vb=w.forwardRef(({className:t,children:e,checked:n,...r},o)=>l.jsxs(Je.CheckboxItem,{ref:o,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),checked:n,...r,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Je.ItemIndicator,{children:l.jsx(ie.Check,{className:"tw-h-4 tw-w-4"})})}),e]}));Vb.displayName=Je.CheckboxItem.displayName;const Hb=w.forwardRef(({className:t,children:e,...n},r)=>l.jsxs(Je.RadioItem,{ref:r,className:z("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",t),...n,children:[l.jsx("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:l.jsx(Je.ItemIndicator,{children:l.jsx(ie.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"})})}),e]}));Hb.displayName=Je.RadioItem.displayName;const zb=w.forwardRef(({className:t,inset:e,...n},r)=>l.jsx(Je.Label,{ref:r,className:z("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",e&&"tw-pl-8",t),...n}));zb.displayName=Je.Label.displayName;const Gb=w.forwardRef(({className:t,...e},n)=>l.jsx(Je.Separator,{ref:n,className:z("tw--mx-1 tw-my-1 tw-h-px tw-bg-border",t),...e}));Gb.displayName=Je.Separator.displayName;function Kb({className:t,...e}){return l.jsx("span",{className:z("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground",t),...e})}Kb.displayName="ContextMenuShortcut";const Yb=w.createContext({direction:"bottom"});function Wb({shouldScaleBackground:t=!0,direction:e="bottom",...n}){const r=w.useMemo(()=>({direction:e}),[e]);return l.jsx(Yb.Provider,{value:r,children:l.jsx(Ln.Drawer.Root,{shouldScaleBackground:t,direction:e,...n})})}Wb.displayName="Drawer";const LA=Ln.Drawer.Trigger,Jb=Ln.Drawer.Portal,$A=Ln.Drawer.Close,yd=w.forwardRef(({className:t,...e},n)=>l.jsx(Ln.Drawer.Overlay,{ref:n,className:z("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",t),...e}));yd.displayName=Ln.Drawer.Overlay.displayName;const Xb=w.forwardRef(({className:t,children:e,hideDrawerHandle:n=!1,...r},o)=>{const{direction:i="bottom"}=w.useContext(Yb),s={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},a={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return l.jsxs(Jb,{children:[l.jsx(yd,{}),l.jsxs(Ln.Drawer.Content,{ref:o,className:z("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",i==="bottom"||i==="top"?"tw-flex-col":"tw-flex-row",s[i],t),...r,children:[!n&&(i==="bottom"||i==="right")&&l.jsx("div",{className:a[i]}),l.jsx("div",{className:"tw-flex tw-flex-col",children:e}),!n&&(i==="top"||i==="left")&&l.jsx("div",{className:a[i]})]})]})});Xb.displayName="DrawerContent";function Qb({className:t,...e}){return l.jsx("div",{className:z("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",t),...e})}Qb.displayName="DrawerHeader";function Zb({className:t,...e}){return l.jsx("div",{className:z("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",t),...e})}Zb.displayName="DrawerFooter";const e0=w.forwardRef(({className:t,...e},n)=>l.jsx(Ln.Drawer.Title,{ref:n,className:z("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",t),...e}));e0.displayName=Ln.Drawer.Title.displayName;const t0=w.forwardRef(({className:t,...e},n)=>l.jsx(Ln.Drawer.Description,{ref:n,className:z("tw-text-sm tw-text-muted-foreground",t),...e}));t0.displayName=Ln.Drawer.Description.displayName;const n0=w.forwardRef(({className:t,value:e,...n},r)=>l.jsx(cc.Root,{ref:r,className:z("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",t),...n,children:l.jsx(cc.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(e||0)}%)`}})}));n0.displayName=cc.Root.displayName;function PA({className:t,...e}){return l.jsx(Jc.PanelGroup,{className:z("tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",t),...e})}const FA=Jc.Panel;function BA({withHandle:t,className:e,...n}){return l.jsx(Jc.PanelResizeHandle,{className:z("tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",e),...n,children:t&&l.jsx("div",{className:"tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border",children:l.jsx(ie.GripVertical,{className:"tw-h-2.5 tw-w-2.5"})})})}function qA({...t}){return l.jsx(rh.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...t})}const r0=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsxs(Oi.Root,{ref:n,className:z("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",t),...e,dir:r,children:[l.jsx(Oi.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:l.jsx(Oi.Range,{className:"tw-absolute tw-h-full tw-bg-primary"})}),l.jsx(Oi.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});r0.displayName=Oi.Root.displayName;const o0=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsx(uc.Root,{className:z("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",t),...e,ref:n,children:l.jsx(uc.Thumb,{className:z("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":r==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":r==="rtl"})})})});o0.displayName=uc.Root.displayName;const UA=tn.Root,i0=w.forwardRef(({className:t,...e},n)=>{const r=Et();return l.jsx(tn.List,{ref:n,className:z("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",t),...e,dir:r})});i0.displayName=tn.List.displayName;const s0=w.forwardRef(({className:t,...e},n)=>l.jsx(tn.Trigger,{ref:n,className:z("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",t),...e}));s0.displayName=tn.Trigger.displayName;const a0=w.forwardRef(({className:t,...e},n)=>l.jsx(tn.Content,{ref:n,className:z("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",t),...e}));a0.displayName=tn.Content.displayName;const l0=w.forwardRef(({className:t,...e},n)=>l.jsx("textarea",{className:z("pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",t),ref:n,...e}));l0.displayName="Textarea";const VA=(t,e)=>{w.useEffect(()=>{if(!t)return()=>{};const n=t(e);return()=>{n()}},[t,e])};function HA(t){return{preserveValue:!0,...t}}const c0=(t,e,n={})=>{const r=w.useRef(e);r.current=e;const o=w.useRef(n);o.current=HA(o.current);const[i,s]=w.useState(()=>r.current),[a,c]=w.useState(!0);return w.useEffect(()=>{let u=!0;return c(!!t),(async()=>{if(t){const d=await t();u&&(s(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>r.current)}},[t]),[i,a]},ac=()=>!1,zA=(t,e)=>{const[n]=c0(w.useCallback(async()=>{if(!t)return ac;const r=await Promise.resolve(t(e));return async()=>r()},[e,t]),ac,{preserveValue:!1});w.useEffect(()=>()=>{n!==ac&&n()},[n])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>rh.toast});exports.Alert=Lb;exports.AlertDescription=Pb;exports.AlertTitle=$b;exports.Avatar=cu;exports.AvatarFallback=uu;exports.AvatarImage=nw;exports.BOOK_CHAPTER_CONTROL_STRING_KEYS=iv;exports.BOOK_SELECTOR_STRING_KEYS=lv;exports.Badge=Go;exports.BookChapterControl=ov;exports.BookSelectionMode=Eh;exports.BookSelector=cv;exports.Button=ve;exports.Card=Ba;exports.CardContent=nu;exports.CardDescription=Th;exports.CardFooter=Ah;exports.CardHeader=Nh;exports.CardTitle=Sh;exports.ChapterRangeSelector=Ch;exports.Checkbox=al;exports.Checklist=NA;exports.ComboBox=da;exports.Command=xo;exports.CommandEmpty=as;exports.CommandGroup=Tr;exports.CommandInput=li;exports.CommandItem=$r;exports.CommandList=yo;exports.CommentList=Cx;exports.ContextMenu=DA;exports.ContextMenuCheckboxItem=Vb;exports.ContextMenuContent=qb;exports.ContextMenuGroup=RA;exports.ContextMenuItem=Ub;exports.ContextMenuLabel=zb;exports.ContextMenuPortal=OA;exports.ContextMenuRadioGroup=IA;exports.ContextMenuRadioItem=Hb;exports.ContextMenuSeparator=Gb;exports.ContextMenuShortcut=Kb;exports.ContextMenuSub=jA;exports.ContextMenuSubContent=Bb;exports.ContextMenuSubTrigger=Fb;exports.ContextMenuTrigger=MA;exports.DataTable=fw;exports.Drawer=Wb;exports.DrawerClose=$A;exports.DrawerContent=Xb;exports.DrawerDescription=t0;exports.DrawerFooter=Zb;exports.DrawerHeader=Qb;exports.DrawerOverlay=yd;exports.DrawerPortal=Jb;exports.DrawerTitle=e0;exports.DrawerTrigger=LA;exports.DropdownMenu=us;exports.DropdownMenuCheckboxItem=Ka;exports.DropdownMenuContent=ui;exports.DropdownMenuGroup=pu;exports.DropdownMenuItem=wu;exports.DropdownMenuItemType=gw;exports.DropdownMenuLabel=Ya;exports.DropdownMenuPortal=rw;exports.DropdownMenuRadioGroup=iw;exports.DropdownMenuRadioItem=gu;exports.DropdownMenuSeparator=ds;exports.DropdownMenuShortcut=sw;exports.DropdownMenuSub=ow;exports.DropdownMenuSubContent=hu;exports.DropdownMenuSubTrigger=fu;exports.DropdownMenuTrigger=Ga;exports.ERROR_DUMP_STRING_KEYS=hw;exports.ERROR_POPOVER_STRING_KEYS=Dx;exports.ErrorDump=ww;exports.ErrorPopover=Mx;exports.FOOTNOTE_LIST_STRING_KEYS=MT;exports.Filter=Lx;exports.FilterDropdown=Rx;exports.Footer=Ix;exports.FootnoteEditor=TT;exports.FootnoteItem=ob;exports.FootnoteList=OT;exports.INVENTORY_STRING_KEYS=UT;exports.Input=vi;exports.Inventory=zT;exports.Label=gt;exports.MarkdownRenderer=tw;exports.MoreInfo=Ox;exports.MultiSelectComboBox=mw;exports.NavigationContentSearch=hA;exports.Popover=_o;exports.PopoverAnchor=Z0;exports.PopoverContent=Pr;exports.PopoverTrigger=Co;exports.Progress=n0;exports.RadioGroup=Fa;exports.RadioGroupItem=qi;exports.RecentSearches=_h;exports.ResizableHandle=BA;exports.ResizablePanel=FA;exports.ResizablePanelGroup=PA;exports.ResultsCard=SA;exports.SCOPE_SELECTOR_STRING_KEYS=sA;exports.ScopeSelector=aA;exports.ScriptureResultsViewer=rA;exports.ScrollGroupSelector=lA;exports.SearchBar=cl;exports.Select=so;exports.SelectContent=Mr;exports.SelectGroup=aw;exports.SelectItem=hn;exports.SelectLabel=cw;exports.SelectScrollDownButton=bu;exports.SelectScrollUpButton=mu;exports.SelectSeparator=uw;exports.SelectTrigger=Dr;exports.SelectValue=ao;exports.Separator=zo;exports.SettingsList=cA;exports.SettingsListHeader=dA;exports.SettingsListItem=uA;exports.SettingsSidebar=xb;exports.SettingsSidebarContentSearch=WT;exports.Sidebar=dd;exports.SidebarContent=fd;exports.SidebarFooter=db;exports.SidebarGroup=Oa;exports.SidebarGroupAction=fb;exports.SidebarGroupContent=Ia;exports.SidebarGroupLabel=ja;exports.SidebarHeader=ub;exports.SidebarInput=cb;exports.SidebarInset=pd;exports.SidebarMenu=hd;exports.SidebarMenuAction=hb;exports.SidebarMenuBadge=wb;exports.SidebarMenuButton=gd;exports.SidebarMenuItem=wd;exports.SidebarMenuSkeleton=gb;exports.SidebarMenuSub=mb;exports.SidebarMenuSubButton=vb;exports.SidebarMenuSubItem=bb;exports.SidebarProvider=ud;exports.SidebarRail=lb;exports.SidebarSeparator=pb;exports.SidebarTrigger=ab;exports.Skeleton=fa;exports.Slider=r0;exports.Sonner=qA;exports.Spinner=Ib;exports.Switch=o0;exports.TabDropdownMenu=$a;exports.TabFloatingMenu=fA;exports.TabToolbar=pA;exports.Table=ps;exports.TableBody=hs;exports.TableCaption=pw;exports.TableCell=Sr;exports.TableFooter=dw;exports.TableHead=Ko;exports.TableHeader=fs;exports.TableRow=Jn;exports.Tabs=UA;exports.TabsContent=a0;exports.TabsList=i0;exports.TabsTrigger=s0;exports.TextField=TA;exports.Textarea=l0;exports.ToggleGroup=za;exports.ToggleGroupItem=Bo;exports.Toolbar=_A;exports.Tooltip=qa;exports.TooltipContent=cs;exports.TooltipProvider=ls;exports.TooltipTrigger=Ua;exports.UiLanguageSelector=EA;exports.VerticalTabs=bd;exports.VerticalTabsContent=xd;exports.VerticalTabsList=vd;exports.VerticalTabsTrigger=Nb;exports.badgeVariants=Dh;exports.buttonVariants=yh;exports.cn=z;exports.getBookIdFromUSFM=qT;exports.getLinesFromUSFM=FT;exports.getNumberFromUSFM=BT;exports.getStatusForItem=ib;exports.getToolbarOSReservedSpaceClassName=yA;exports.inventoryCountColumn=$T;exports.inventoryItemColumn=IT;exports.inventoryStatusColumn=PT;exports.selectTriggerVariants=lw;exports.useEvent=VA;exports.useEventAsync=zA;exports.useListbox=kh;exports.usePromise=c0;exports.useRecentSearches=ev;exports.useSidebar=ks;function GA(t,e="top"){if(!t||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(t)),e==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}GA(`*, ::before, ::after {
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
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
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
.tw-max-w-screen-md {
  max-width: 768px;
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
.tw-bg-slate-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(248 250 252 / var(--tw-bg-opacity, 1));
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
.tw-pr-0\\.5 {
  padding-right: 0.125rem;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
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
